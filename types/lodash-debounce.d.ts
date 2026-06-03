declare module "lodash/debounce" {
	type DebouncedFunction<T extends (...args: any[]) => any> = T & {
		cancel(): void;
		flush(): ReturnType<T>;
	};

	export default function debounce<T extends (...args: any[]) => any>(
		func: T,
		wait?: number,
		options?: {
			leading?: boolean;
			maxWait?: number;
			trailing?: boolean;
		}
	): DebouncedFunction<T>;
}
