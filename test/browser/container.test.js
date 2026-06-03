import { describe, expect, it } from "vitest";
import Container from "../../src/container";

describe("browser container parser", () => {
	function parse(markup) {
		return new DOMParser().parseFromString(markup, "application/xml");
	}

	it("parses the package path and directory", () => {
		var container = new Container(parse(`
			<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
				<rootfiles>
					<rootfile full-path="OPS/package.opf" media-type="application/oebps-package+xml"/>
				</rootfiles>
			</container>
		`));

		expect(container.packagePath).toBe("OPS/package.opf");
		expect(container.directory).toBe("OPS");
	});

	it("throws when no container document is provided", () => {
		var container = new Container();

		expect(function() {
			container.parse();
		}).toThrow("Container File Not Found");
	});

	it("throws when the rootfile is missing", () => {
		var container = new Container();

		expect(function() {
			container.parse(parse("<container><rootfiles></rootfiles></container>"));
		}).toThrow("No RootFile Found");
	});

	it("clears parsed values on destroy", () => {
		var container = new Container(parse(`
			<container>
				<rootfile full-path="OPS/package.opf"/>
			</container>
		`));

		container.destroy();

		expect(container.packagePath).toBeUndefined();
		expect(container.directory).toBeUndefined();
		expect(container.encoding).toBeUndefined();
	});
});
