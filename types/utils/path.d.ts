export interface ParsedPath {
  base: string;
  dir: string;
  ext: string;
  name: string;
  root: string;
}

export default class Path {
  constructor(pathString: string);

  path: string;
  directory: string;
  filename: string;
  extension: string;
  splitPathRe: RegExp;

  parse(what: string): ParsedPath;

  isAbsolute(what?: string): boolean;

  isDirectory(what: string): boolean;

  resolve(what: string): string;

  relative(what: string): string;

  splitPath(filename: string): string[];

  toString(): string;
}
