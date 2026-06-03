declare module "jszip/dist/jszip" {
	type ZipEntry = {
		name: string;
		async(type: "uint8array"): Promise<Uint8Array>;
		async(type: "string"): Promise<string>;
		async(type: "base64"): Promise<string>;
	};

	export default class JSZip {
		loadAsync(input: ArrayBuffer | Uint8Array | string, options?: { base64?: boolean }): Promise<any>;
		file(path: string): ZipEntry | null;
	}
}
