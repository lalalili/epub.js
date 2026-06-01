import BookClass, { BookOptions } from "./book";
import ContentsClass from "./contents";
import EpubCFIClass from "./epubcfi";
import RenditionClass from "./rendition";
import * as coreUtils from "./utils/core";

export default Epub;

declare function Epub(urlOrData: string | ArrayBuffer | Blob, options?: BookOptions) : BookClass;
declare function Epub(options?: BookOptions) : BookClass;

declare namespace Epub {
  const VERSION: string;
  const Book: typeof BookClass;
  const Rendition: typeof RenditionClass;
  const Contents: typeof ContentsClass;
  const CFI: typeof EpubCFIClass;
  const utils: typeof coreUtils;
}
