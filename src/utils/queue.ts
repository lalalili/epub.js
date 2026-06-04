import { defer, type Deferred as CoreDeferred } from "../core/async";
import { requestAnimationFrame } from "../platform/browser";

type AnimationFrameScheduler = (callback: FrameRequestCallback) => number;

const Defer = defer as unknown as {
	new<T = unknown>(): CoreDeferred<T>;
};

export type QueueTask = (...args: unknown[]) => unknown;

export type QueuedItem = {
	args?: unknown[];
	deferred?: CoreDeferred<unknown>;
	promise: Promise<unknown>;
	task?: QueueTask;
};

/**
 * Queue for handling tasks one at a time
 * @class
 * @param {scope} context what this will resolve to in the tasks
 */
class Queue {
	_q: QueuedItem[];
	context: unknown;
	defered: CoreDeferred<unknown>;
	paused: boolean;
	running: boolean | Promise<unknown> | undefined;
	tick: AnimationFrameScheduler;

	constructor(context?: unknown){
		this._q = [];
		this.context = context;
		this.tick = requestAnimationFrame as AnimationFrameScheduler;
		this.running = false;
		this.paused = false;
	}

	/**
	 * Add an item to the queue
	 * @return {Promise}
	 */
	enqueue(...items: unknown[]): Promise<unknown> {
		var deferred, promise;
		var queued: QueuedItem;
		var task = items.shift();
		var args = items;

		// Handle single args without context
		// if(args && !Array.isArray(args)) {
		//   args = [args];
		// }
		if(!task) {
			throw new Error("No Task Provided");
		}

		if(typeof task === "function"){

			deferred = new Defer();
			promise = deferred.promise;

			queued = {
				"task" : task as QueueTask,
				"args"     : args,
				//"context"  : context,
				"deferred" : deferred,
				"promise" : promise
			};

		} else {
			// Task is a promise
			queued = {
				"promise" : task as Promise<unknown>
			};

		}

		this._q.push(queued);

		// Wait to start queue flush
		if (this.paused == false && !this.running) {
			// setTimeout(this.flush.bind(this), 0);
			// this.tick.call(window, this.run.bind(this));
			this.run();
		}

		return queued.promise;
	}

	/**
	 * Run one item
	 * @return {Promise}
	 */
	dequeue(): Promise<unknown> {
		var inwait: QueuedItem | undefined, task, result: unknown;

		if(this._q.length && !this.paused) {
			inwait = this._q.shift();
			task = inwait?.task;
			if(task){
				// console.log(task)

				result = task.apply(this.context, inwait.args);

				if(result && typeof (result as PromiseLike<unknown>)["then"] === "function") {
					// Task is a function that returns a promise
					return (result as Promise<unknown>).then(function(){
						inwait.deferred?.resolve?.apply(this.context, arguments);
					}.bind(this), function() {
						inwait.deferred?.reject?.apply(this.context, arguments);
					}.bind(this));
				} else {
					// Task resolves immediately
					inwait.deferred?.resolve?.call(this.context, result);
					return inwait.promise;
				}



			} else if(inwait.promise) {
				// Task is a promise
				return inwait.promise;
			}

		} else {
			const completed = new Defer();
			completed.resolve?.(undefined);
			return completed.promise;
		}

	}

	// Run All Immediately
	dump(): void {
		while(this._q.length) {
			this.dequeue();
		}
	}

	/**
	 * Run all tasks sequentially, at convince
	 * @return {Promise}
	 */
	run(): Promise<unknown> {

		if(!this.running){
			this.running = true;
			this.defered = new Defer();
		}

		this.tick.call(window, () => {

			if(this._q.length) {

				this.dequeue()
					.then(function(){
						this.run();
					}.bind(this));

			} else {
				this.defered.resolve?.(undefined);
				this.running = undefined;
			}

		});

		// Unpause
		if(this.paused == true) {
			this.paused = false;
		}

		return this.defered.promise;
	}

	/**
	 * Flush all, as quickly as possible
	 * @return {Promise}
	 */
	flush(): Promise<unknown> | boolean | undefined {

		if(this.running){
			return this.running;
		}

		if(this._q.length) {
			this.running = this.dequeue()
				.then(function(){
					this.running = undefined;
					return this.flush();
				}.bind(this));

			return this.running;
		}

	}

	/**
	 * Clear all items in wait
	 */
	clear(): void {
		this._q = [];
	}

	/**
	 * Get the number of tasks in the queue
	 * @return {number} tasks
	 */
	length(): number {
		return this._q.length;
	}

	/**
	 * Pause a running queue
	 */
	pause(): void {
		this.paused = true;
	}

	/**
	 * End the queue
	 */
	stop(): void {
		this._q = [];
		this.running = false;
		this.paused = true;
	}
}


/**
 * Create a new task from a callback
 * @class
 * @private
 * @param {function} task
 * @param {array} args
 * @param {scope} context
 * @return {function} task
 */
class Task {
	constructor(task: Function, args?: any[], context?: any){

		return function(){
			var toApply: any[] = Array.prototype.slice.call(arguments || []);

			return new Promise( (resolve, reject) => {
				var callback = function(value: any, err: any){
					if (!value && err) {
						reject(err);
					} else {
						resolve(value);
					}
				};
				// Add the callback to the arguments list
				toApply.push(callback);

				// Apply all arguments to the functions
				task.apply(context || this, toApply);

			});

		};

	}
}


export default Queue;
export { Task };
