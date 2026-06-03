import ePub, { Book, Contents, EpubCFI, Layout, Rendition, request } from '../';
import type { BookOptions } from './book';
import type { ViewportSettings } from './contents';
import type EpubRoot from './epub';
import type { Location, RenditionOptions } from './rendition';
import { JsonValue, RequestHeaders, RequestMethod, RequestResponse } from './utils/request';

type Assert<T extends true> = T;
type IsExact<T, U> =
  (<G>() => G extends T ? 1 : 2) extends
  (<G>() => G extends U ? 1 : 2)
    ? true
    : false;

type PublicRootAssertions = [
  Assert<IsExact<typeof ePub, typeof EpubRoot>>,
  Assert<IsExact<typeof ePub.Book, typeof Book>>,
  Assert<IsExact<typeof ePub.Rendition, typeof Rendition>>,
  Assert<IsExact<typeof ePub.Contents, typeof Contents>>,
  Assert<IsExact<typeof ePub.CFI, typeof EpubCFI>>,
  Assert<IsExact<typeof request, RequestMethod>>,
  Assert<IsExact<ReturnType<typeof ePub.utils.uuid>, string>>,
  Assert<IsExact<InstanceType<typeof ePub.utils.defer<string>>["promise"], Promise<string>>>
];

type CoreClassAssertions = [
  Assert<IsExact<Book["settings"], BookOptions>>,
  Assert<IsExact<Book["request"], RequestMethod>>,
  Assert<IsExact<ReturnType<Book["coverUrl"]>, Promise<string | null>>>,
  Assert<IsExact<ReturnType<Book["determineType"]>, string | undefined>>,
  Assert<IsExact<ReturnType<Book["load"]>, Promise<RequestResponse>>>,
  Assert<IsExact<ReturnType<Book["open"]>, Promise<Book>>>,
  Assert<IsExact<ReturnType<Book["openEpub"]>, Promise<Book>>>,
  Assert<IsExact<ReturnType<Book["renderTo"]>, Rendition>>,
  Assert<IsExact<ReturnType<Book["resolve"]>, string>>,
  Assert<IsExact<ReturnType<Book["setRequestHeaders"]>, void>>,
  Assert<IsExact<Rendition["settings"], RenditionOptions>>,
  Assert<IsExact<Rendition["book"], Book>>,
  Assert<IsExact<Rendition["started"], Promise<void>>>,
  Assert<IsExact<ReturnType<Rendition["attachTo"]>, Promise<void>>>,
  Assert<IsExact<ReturnType<Rendition["currentLocation"]>, Location | Promise<Location> | undefined>>,
  Assert<IsExact<ReturnType<Rendition["display"]>, Promise<void>>>,
  Assert<IsExact<ReturnType<Rendition["getContents"]>, Contents[]>>,
  Assert<IsExact<ReturnType<Rendition["getRange"]>, Range | undefined>>,
  Assert<IsExact<ReturnType<Rendition["resize"]>, void>>,
  Assert<IsExact<Contents["document"], Document>>,
  Assert<IsExact<Contents["window"], Window>>,
  Assert<IsExact<ReturnType<Contents["addScript"]>, Promise<boolean>>>,
  Assert<IsExact<ReturnType<Contents["addStylesheet"]>, Promise<boolean>>>,
  Assert<IsExact<ReturnType<Contents["addStylesheetCss"]>, boolean>>,
  Assert<IsExact<ReturnType<Contents["contentWidth"]>, number>>,
  Assert<IsExact<ReturnType<Contents["css"]>, string>>,
  Assert<IsExact<ReturnType<Contents["locationOf"]>, { top: number, left: number }>>,
  Assert<IsExact<ReturnType<Contents["measureVerticalRlRect"]>, {
    left: number,
    right: number,
    top: number,
    bottom: number,
    rawWidth: number,
    rawHeight: number
  }>>,
  Assert<IsExact<ReturnType<Contents["viewport"]>, ViewportSettings>>,
  Assert<IsExact<ReturnType<Contents["writingMode"]>, string>>
];

function testEpub() {
  const epub = ePub("https://s3.amazonaws.com/moby-dick/moby-dick.epub");

  const headers: RequestHeaders = { Authorization: "Bearer token" };
  const book = new Book("https://s3.amazonaws.com/moby-dick/moby-dick.epub", {
    requestCredentials: true,
    requestHeaders: headers,
    requestMethod: request,
  });
  const rootBook = ePub({
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
  const layout = new Layout({
    layout: "reflowable",
    spread: "auto",
    minSpreadWidth: 800,
    evenSpreads: false,
  });
  const uuid: string = ePub.utils.uuid();
  const deferred = new ePub.utils.defer<string>();
  const parsedDocument: Document = ePub.utils.parse("<html><body><p>Text</p></body></html>", "text/html");
  const paragraph = ePub.utils.qs(parsedDocument, "p");
  const paragraphText: string | null | undefined = paragraph?.textContent;

  new StaticBook("https://s3.amazonaws.com/moby-dick/moby-dick.epub", {});
  new StaticRendition(epub, {});
  new StaticCFI();

  const epubAsBook: Book = epub;
  const rootBookAsBook: Book = rootBook;
  const requestMethod: RequestMethod = request;

  book.open(new Blob(), "binary");
  book.openEpub(new ArrayBuffer(0));
  book.load("OPS/package.opf");
  rendition.attachTo("area");
  rendition.resize("100%", "100%", "epubcfi(/6/2)");
  const location = rendition.currentLocation();

  void version;
  void rendition;
  void epubAsBook;
  void rootBookAsBook;
  void blobBook;
  void requestMethod;
  void binaryRequest;
  void blobRequest;
  void jsonRequest;
  void xmlRequest;
  void fallbackRequest;
  void StaticContents;
  void cfi;
  void layout;
  void uuid;
  void deferred;
  void paragraphText;
  void location;
}

type _PublicRootAssertions = PublicRootAssertions;
type _CoreClassAssertions = CoreClassAssertions;

testEpub();
