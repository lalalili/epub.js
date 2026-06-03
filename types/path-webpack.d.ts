declare module "path-webpack" {
	type ParsedPath = {
		base: string;
		dir: string;
		ext: string;
		name: string;
		root: string;
	};

	const path: {
		dirname(value: string | null): string;
		isAbsolute(value: string): boolean;
		parse(value: string): ParsedPath;
		relative(from: string, to: string): string;
		resolve(...paths: string[]): string;
	};

	export default path;
}
