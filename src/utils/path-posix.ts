export type ParsedPosixPath = {
	base: string;
	dir: string;
	ext: string;
	name: string;
	root: string;
};

function assertPath(value: string): void {
	if (typeof value !== "string") {
		throw new TypeError(`Path must be a string. Received ${String(value)}`);
	}
}

function normalizeSegments(value: string, allowAboveRoot: boolean): string[] {
	const output: string[] = [];

	for (const segment of value.split("/")) {
		if (!segment || segment === ".") {
			continue;
		}

		if (segment === "..") {
			if (output.length > 0 && output[output.length - 1] !== "..") {
				output.pop();
			} else if (allowAboveRoot) {
				output.push(segment);
			}

			continue;
		}

		output.push(segment);
	}

	return output;
}

export function isAbsolutePath(value: string): boolean {
	assertPath(value);

	return value.startsWith("/");
}

export function resolvePath(...values: string[]): string {
	let resolved = "";
	let absolute = false;

	for (let index = values.length - 1; index >= -1 && !absolute; index -= 1) {
		const value = index >= 0 ? values[index] : "/";

		assertPath(value);

		if (!value) {
			continue;
		}

		resolved = `${value}/${resolved}`;
		absolute = value.startsWith("/");
	}

	const normalized = normalizeSegments(resolved, !absolute).join("/");

	if (absolute) {
		return normalized ? `/${normalized}` : "/";
	}

	return normalized || ".";
}

export function relativePath(from: string, to: string): string {
	assertPath(from);
	assertPath(to);

	const fromSegments = normalizeSegments(resolvePath(from), false);
	const toSegments = normalizeSegments(resolvePath(to), false);
	let commonLength = 0;

	while (
		commonLength < fromSegments.length &&
		commonLength < toSegments.length &&
		fromSegments[commonLength] === toSegments[commonLength]
	) {
		commonLength += 1;
	}

	return [
		...Array.from({ length: fromSegments.length - commonLength }, () => ".."),
		...toSegments.slice(commonLength)
	].join("/");
}

export function dirnamePath(value: string | null): string {
	if (value === null) {
		throw new TypeError("Path must be a string. Received null");
	}

	assertPath(value);

	if (!value) {
		return ".";
	}

	const hasRoot = value.startsWith("/");
	const trimmed = value.replace(/\/+$/, "");
	const separatorIndex = trimmed.lastIndexOf("/");

	if (separatorIndex < 0) {
		return ".";
	}

	if (separatorIndex === 0) {
		return "/";
	}

	return trimmed.slice(0, separatorIndex);
}

export function parsePath(value: string): ParsedPosixPath {
	assertPath(value);

	const root = value.startsWith("/") ? "/" : "";
	const trimmed = value.replace(/\/+$/, "");
	const separatorIndex = trimmed.lastIndexOf("/");
	const base = separatorIndex >= 0 ? trimmed.slice(separatorIndex + 1) : trimmed;
	const dir = separatorIndex < 0
		? ""
		: separatorIndex === 0
			? root
			: trimmed.slice(0, separatorIndex);
	const dotIndex = base.lastIndexOf(".");
	const hasExtension = dotIndex > 0;

	return {
		root,
		dir,
		base,
		ext: hasExtension ? base.slice(dotIndex) : "",
		name: hasExtension ? base.slice(0, dotIndex) : base
	};
}
