declare module "lodash/throttle" {
	type ThrottledFunction<T extends (...args: any[]) => any> = T & {
		cancel(): void;
		flush(): ReturnType<T>;
	};

	export default function throttle<T extends (...args: any[]) => any>(
		func: T,
		wait?: number,
		options?: {
			leading?: boolean;
			trailing?: boolean;
		}
	): ThrottledFunction<T>;
}
