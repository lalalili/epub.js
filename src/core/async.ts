export interface Deferred<T = unknown> {
	resolve: ((value: T | PromiseLike<T>) => void) | null;
	reject: ((reason?: unknown) => void) | null;
	id: string;
	promise: Promise<T>;
}

/**
 * Generates a UUID.
 * Based on: http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
 * @returns {string} UUID string.
 */
export function uuid(): string {
	var d = new Date().getTime();
	var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
		var r = (d + Math.random() * 16) % 16 | 0;
		d = Math.floor(d / 16);
		return (c == "x" ? r : (r & 0x7 | 0x8)).toString(16);
	});
	return uuid;
}

/**
 * Creates a new pending promise and provides methods to resolve or reject it.
 * @constructor
 */
export function defer<T = unknown>(this: Deferred<T>): void {
	this.resolve = null;
	this.reject = null;
	this.id = uuid();

	this.promise = new Promise<T>((resolve, reject) => {
		this.resolve = resolve;
		this.reject = reject;
	});
	Object.freeze(this);
}
