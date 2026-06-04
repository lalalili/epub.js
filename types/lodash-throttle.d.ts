declare module "lodash/throttle" {
	type ThrottledFunction<T extends (...args: unknown[]) => unknown> = T & {
		cancel(): void;
		flush(): ReturnType<T>;
	};

	export default function throttle<T extends (...args: unknown[]) => unknown>(
		func: T,
		wait?: number,
		options?: {
			leading?: boolean;
			trailing?: boolean;
		}
	): ThrottledFunction<T>;
}
