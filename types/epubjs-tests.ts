import ePub, { Book, Contents, EpubCFI, Rendition, request } from '../';
import { JsonValue, RequestHeaders, RequestResponse } from './utils/request';

function testEpub() {
  const epub = ePub("https://s3.amazonaws.com/moby-dick/moby-dick.epub");

  const headers: RequestHeaders = { Authorization: "Bearer token" };
  const book = new Book("https://s3.amazonaws.com/moby-dick/moby-dick.epub", {
    requestCredentials: true,
    requestHeaders: headers,
    requestMethod: request,
  });
  const blobBook = new Book(new Blob(), {});

  const rendition = new Rendition(book, {});

  const binaryRequest: Promise<ArrayBuffer> = request("https://s3.amazonaws.com/moby-dick/moby-dick.epub", "binary", true, headers);
  const blobRequest: Promise<Blob> = request("https://s3.amazonaws.com/moby-dick/moby-dick.epub", "blob");
  const jsonRequest: Promise<JsonValue> = request("https://example.com/package.json", "json");
  const xmlRequest: Promise<Document | XMLDocument> = request("https://example.com/package.opf", "opf");
  const fallbackRequest: Promise<RequestResponse> = request("https://example.com/content.txt", null);

  const version: string = ePub.VERSION;
  const StaticBook: typeof Book = ePub.Book;
  const StaticRendition: typeof Rendition = ePub.Rendition;
  const StaticContents: typeof Contents = ePub.Contents;
  const StaticCFI: typeof EpubCFI = ePub.CFI;
  const cfi = new ePub.CFI();
  const uuid: string = ePub.utils.uuid();

  new StaticBook("https://s3.amazonaws.com/moby-dick/moby-dick.epub", {});
  new StaticRendition(epub, {});
  new StaticCFI();

  book.open(new Blob(), "binary");
  book.openEpub(new ArrayBuffer(0));
  book.load("OPS/package.opf");
  rendition.attachTo("area");
  rendition.resize("100%", "100%", "epubcfi(/6/2)");
  const location = rendition.currentLocation();

  void version;
  void rendition;
  void blobBook;
  void binaryRequest;
  void blobRequest;
  void jsonRequest;
  void xmlRequest;
  void fallbackRequest;
  void StaticContents;
  void cfi;
  void uuid;
  void location;
}

testEpub();
