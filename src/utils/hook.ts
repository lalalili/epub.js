/**
 * Hooks allow for injecting functions that must all complete in order before finishing
 * They will execute in parallel but all must finish before continuing
 * Functions may return a promise if they are async.
 * @param {any} context scope of this
 * @example this.content = new EPUBJS.Hook(this);
 */
export type HookTask = (...args: any[]) => unknown;
export type HookRegistration = HookTask | HookTask[];
export interface HooksObject {
	[key: string]: Hook;
}

class Hook {
	context: unknown;
	hooks: HookTask[];

	constructor(context?: unknown){
		this.context = context || this;
		this.hooks = [];
	}

	/**
	 * Adds a function to be run before a hook completes
	 * @example this.content.register(function(){...});
	 */
	register(...items: HookRegistration[]): void {
		for(var i = 0; i < arguments.length; ++i) {
			if (typeof arguments[i]  === "function") {
				this.hooks.push(arguments[i] as HookTask);
			} else {
				// unpack array
				for(var j = 0; j < (arguments[i] as HookTask[]).length; ++j) {
					this.hooks.push((arguments[i] as HookTask[])[j]);
				}
			}
		}
	}

	/**
	 * Removes a function
	 * @example this.content.deregister(function(){...});
	 */
	deregister(func: HookTask): void {
		let hook;
		for (let i = 0; i < this.hooks.length; i++) {
			hook = this.hooks[i];
			if (hook === func) {
				this.hooks.splice(i, 1);
				break;
			}
		}
	}

	/**
	 * Triggers a hook to run all functions
	 * @example this.content.trigger(args).then(function(){...});
	 */
	trigger(...items: any[]): Promise<unknown[]> {
		var args = arguments;
		var context = this.context;
		var promises: Promise<unknown>[] = [];

		this.hooks.forEach(function(task) {
			var executing: unknown;
			try {
				executing = task.apply(context, args);
			} catch (err) {
				console.log(err);
			}

			if(executing && typeof (executing as PromiseLike<unknown>)["then"] === "function") {
				// Task is a function that returns a promise
				promises.push(executing as Promise<unknown>);
			}
			// Otherwise Task resolves immediately, continue
		});


		return Promise.all(promises);
	}

	// Adds a function to be run before a hook completes
	list(): HookTask[] {
		return this.hooks;
	}

	clear(): HookTask[] {
		return this.hooks = [];
	}
}
export default Hook;
