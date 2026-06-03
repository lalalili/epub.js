import Path from "./path";

export type UrlBase = string | false | undefined;

export default class Url {
  constructor(urlString: string, baseString?: UrlBase);

  Path: Path;
  Url?: URL;
  base: UrlBase;
  directory: string;
  extension: string;
  filename: string;
  hash: string;
  href: string;
  origin: string;
  protocol: string;
  search: string;

  path(): Path;

  resolve(what: string): string;

  relative(what: string): string;

  toString(): string;
}
