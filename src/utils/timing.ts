export type DebouncedFunction<T extends (...args: unknown[]) => unknown> = T & {
	cancel(): void;
	flush(): ReturnType<T>;
};

export type DebounceOptions = {
	leading?: boolean;
	maxWait?: number;
	trailing?: boolean;
};

export function debounce<T extends (...args: unknown[]) => unknown>(
	callback: T,
	wait = 0,
	options: DebounceOptions = {}
): DebouncedFunction<T> {
	const leading = options.leading === true;
	const trailing = options.trailing !== false;
	const maxWait = Number.isFinite(options.maxWait)
		? Math.max(Number(options.maxWait), wait)
		: null;
	let timer: ReturnType<typeof setTimeout> | undefined;
	let maxTimer: ReturnType<typeof setTimeout> | undefined;
	let lastArguments: Parameters<T> | undefined;
	let lastContext: unknown;
	let result: ReturnType<T>;

	const invoke = (): ReturnType<T> => {
		const argumentsToUse = lastArguments;
		const contextToUse = lastContext;

		lastArguments = undefined;
		lastContext = undefined;

		if (argumentsToUse) {
			result = callback.apply(contextToUse, argumentsToUse) as ReturnType<T>;
		}

		return result;
	};

	const clearTimers = (): void => {
		if (timer !== undefined) {
			clearTimeout(timer);
			timer = undefined;
		}

		if (maxTimer !== undefined) {
			clearTimeout(maxTimer);
			maxTimer = undefined;
		}
	};

	const complete = (): ReturnType<T> => {
		const shouldInvoke = trailing && lastArguments !== undefined;

		clearTimers();

		return shouldInvoke ? invoke() : result;
	};

	const debounced = function(this: unknown, ...args: Parameters<T>): ReturnType<T> {
		const shouldInvokeLeading = leading && timer === undefined;

		lastArguments = args;
		lastContext = this;

		if (timer !== undefined) {
			clearTimeout(timer);
		}

		timer = setTimeout(complete, Math.max(0, wait));

		if (maxWait !== null && maxTimer === undefined) {
			maxTimer = setTimeout(complete, Math.max(0, maxWait));
		}

		return shouldInvokeLeading ? invoke() : result;
	} as T;

	const controlled = debounced as DebouncedFunction<T>;

	controlled.cancel = (): void => {
		clearTimers();
		lastArguments = undefined;
		lastContext = undefined;
	};
	controlled.flush = (): ReturnType<T> => (
		timer !== undefined || maxTimer !== undefined ? complete() : result
	);

	return controlled;
}

export type ThrottleOptions = {
	leading?: boolean;
	trailing?: boolean;
};

export function throttle<T extends (...args: unknown[]) => unknown>(
	callback: T,
	wait = 0,
	options: ThrottleOptions = {}
): DebouncedFunction<T> {
	return debounce(callback, wait, {
		leading: options.leading !== false,
		maxWait: wait,
		trailing: options.trailing !== false
	});
}
