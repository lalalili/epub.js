import path from "path-webpack";
import { qs } from "./platform/dom";

export type ContainerDocument = XMLDocument & {
	xmlEncoding?: string | null;
};

type PathWebpack = {
	dirname(value: string | null): string;
};

/**
 * Handles Parsing and Accessing an Epub Container
 * @class
 * @param {document} [containerDocument] xml document
 */
class Container {
	packagePath: string | undefined | null;
	directory: string | undefined;
	encoding: string | undefined | null;

	constructor(containerDocument?: ContainerDocument) {
		this.packagePath = "";
		this.directory = "";
		this.encoding = "";

		if (containerDocument) {
			this.parse(containerDocument);
		}
	}

	/**
	 * Parse the Container XML
	 * @param  {document} containerDocument
	 */
	parse(containerDocument?: ContainerDocument): void {
		//-- <rootfile full-path="OPS/package.opf" media-type="application/oebps-package+xml"/>
		var rootfile;

		if(!containerDocument) {
			throw new Error("Container File Not Found");
		}

		rootfile = qs(containerDocument, "rootfile");

		if(!rootfile) {
			throw new Error("No RootFile Found");
		}

		this.packagePath = rootfile.getAttribute("full-path");
		this.directory = (path as PathWebpack).dirname(this.packagePath);
		this.encoding = containerDocument.xmlEncoding;
	}

	destroy(): void {
		this.packagePath = undefined;
		this.directory = undefined;
		this.encoding = undefined;
	}
}

export default Container;
