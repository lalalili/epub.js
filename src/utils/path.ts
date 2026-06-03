import path from "path-webpack";

type ParsedPath = {
	base: string;
	dir: string;
	ext: string;
	name: string;
	root: string;
};

type PathWebpack = {
	isAbsolute(value: string): boolean;
	parse(value: string): ParsedPath;
	relative(from: string, to: string): string;
	resolve(...paths: string[]): string;
};

/**
 * Creates a Path object for parsing and manipulation of a path strings
 *
 * Uses a polyfill for Nodejs path: https://nodejs.org/api/path.html
 * @param	{string} pathString	a url string (relative or absolute)
 * @class
 */
class Path {
	path: string;
	directory: string;
	filename: string;
	extension: string;
	splitPathRe: RegExp;

	constructor(pathString: string) {
		var protocol;
		var parsed;

		protocol = pathString.indexOf("://");
		if (protocol > -1) {
			pathString = new URL(pathString).pathname;
		}

		parsed = this.parse(pathString);

		this.path = pathString;

		if (this.isDirectory(pathString)) {
			this.directory = pathString;
		} else {
			this.directory = parsed.dir + "/";
		}

		this.filename = parsed.base;
		this.extension = parsed.ext.slice(1);

	}

	/**
	 * Parse the path: https://nodejs.org/api/path.html#path_path_parse_path
	 * @param	{string} what
	 * @returns {object}
	 */
	parse (what: string): ParsedPath {
		return (path as PathWebpack).parse(what);
	}

	/**
	 * @param	{string} what
	 * @returns {boolean}
	 */
	isAbsolute (what?: string): boolean {
		return (path as PathWebpack).isAbsolute(what || this.path);
	}

	/**
	 * Check if path ends with a directory
	 * @param	{string} what
	 * @returns {boolean}
	 */
	isDirectory (what: string): boolean {
		return (what.charAt(what.length-1) === "/");
	}

	/**
	 * Resolve a path against the directory of the Path
	 *
	 * https://nodejs.org/api/path.html#path_path_resolve_paths
	 * @param	{string} what
	 * @returns {string} resolved
	 */
	resolve (what: string): string {
		return (path as PathWebpack).resolve(this.directory, what);
	}

	/**
	 * Resolve a path relative to the directory of the Path
	 *
	 * https://nodejs.org/api/path.html#path_path_relative_from_to
	 * @param	{string} what
	 * @returns {string} relative
	 */
	relative (what: string): string {
		var isAbsolute = what && (what.indexOf("://") > -1);

		if (isAbsolute) {
			return what;
		}

		return (path as PathWebpack).relative(this.directory, what);
	}

	splitPath(filename: string): string[] {
		return this.splitPathRe.exec(filename).slice(1);
	}

	/**
	 * Return the path string
	 * @returns {string} path
	 */
	toString (): string {
		return this.path;
	}
}

export default Path;
