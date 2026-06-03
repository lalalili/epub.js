import ePub, { Book, Contents, EpubCFI, Layout, Rendition, request } from '../';
import type { BookOptions } from './book';
import type { ViewportSettings } from './contents';
import type EpubRoot from './epub';
import Navigation, { LandmarkItem, NavItem, NavigationInputItem } from './navigation';
import type { Location, RenditionOptions } from './rendition';
import Section, { LayoutSettings, SectionHookSet, SectionSearchResult, SpineItem } from './section';
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

type NavigationAssertions = [
  Assert<IsExact<Navigation["toc"], NavItem[]>>,
  Assert<IsExact<Navigation["tocByHref"], Record<string, number>>>,
  Assert<IsExact<Navigation["tocById"], Record<string, number>>>,
  Assert<IsExact<Navigation["landmarks"], LandmarkItem[]>>,
  Assert<IsExact<Navigation["landmarksByType"], Record<string, number>>>,
  Assert<IsExact<Navigation["length"], number>>,
  Assert<IsExact<Parameters<Navigation["parse"]>[0], Document | XMLDocument | NavigationInputItem[]>>,
  Assert<IsExact<Parameters<Navigation["load"]>[0], NavigationInputItem[]>>,
  Assert<IsExact<ReturnType<Navigation["load"]>, NavItem[]>>,
  Assert<IsExact<ReturnType<Navigation["forEach"]>, void>>
];

type SectionAssertions = [
  Assert<IsExact<ConstructorParameters<typeof Section>, [item: SpineItem, hooks?: SectionHookSet | undefined]>>,
  Assert<IsExact<Section["idref"], string | undefined>>,
  Assert<IsExact<Section["linear"], boolean | undefined>>,
  Assert<IsExact<Section["properties"], string[] | undefined>>,
  Assert<IsExact<Section["document"], Document | undefined>>,
  Assert<IsExact<Section["contents"], Element | undefined>>,
  Assert<IsExact<Section["output"], string | undefined>>,
  Assert<IsExact<Section["hooks"], SectionHookSet | undefined>>,
  Assert<IsExact<ReturnType<Section["load"]>, Promise<Element>>>,
  Assert<IsExact<ReturnType<Section["render"]>, Promise<string>>>,
  Assert<IsExact<ReturnType<Section["find"]>, SectionSearchResult[]>>,
  Assert<IsExact<ReturnType<Section["search"]>, SectionSearchResult[]>>,
  Assert<IsExact<ReturnType<Section["reconcileLayoutSettings"]>, LayoutSettings>>,
  Assert<IsExact<ReturnType<Section["unload"]>, void>>,
  Assert<IsExact<ReturnType<Section["destroy"]>, void>>
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
  const legacyNavItems: NavigationInputItem[] = [{
    id: "chapter-one",
    href: "Text/chapter1.xhtml",
    title: "Chapter 1",
    children: [{
      id: "chapter-one-part-one",
      href: "Text/chapter1.xhtml#part-1",
      title: "Part 1",
    }],
  }];
  const emptyNavigation = new Navigation();
  const documentNavigation = new Navigation(parsedDocument);
  const legacyNavigation = new Navigation(legacyNavItems);
  const navigationToc: NavItem[] = legacyNavigation.get();
  const navigationItem: NavItem | undefined = legacyNavigation.get("chapter-one");
  const navigationLandmarks: LandmarkItem[] = legacyNavigation.landmark();
  const navigationLandmark: LandmarkItem | undefined = legacyNavigation.landmark("cover");
  const loadedNavigationItems: NavItem[] = legacyNavigation.load(legacyNavItems);
  const spineItem: SpineItem = {
    idref: "chapter-one",
    linear: "yes",
    properties: ["rendition:layout-pre-paginated"],
    index: 0,
    href: "Text/chapter1.xhtml",
    url: "https://example.com/Text/chapter1.xhtml",
    canonical: "Text/chapter1.xhtml",
    cfiBase: "/6/2",
  };
  const section = new Section(spineItem);
  const sectionLoad: Promise<Element> = section.load(() => Promise.resolve(parsedDocument));
  const sectionRender: Promise<string> = section.render(() => Promise.resolve(parsedDocument));
  const sectionFind: SectionSearchResult[] = section.find("Text");
  const sectionSearch: SectionSearchResult[] = section.search("Text");
  const sectionLayout: LayoutSettings = section.reconcileLayoutSettings({
    layout: "reflowable",
    spread: "auto",
    orientation: "auto",
  });

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
  void emptyNavigation;
  void documentNavigation;
  void navigationToc;
  void navigationItem;
  void navigationLandmarks;
  void navigationLandmark;
  void loadedNavigationItems;
  void sectionLoad;
  void sectionRender;
  void sectionFind;
  void sectionSearch;
  void sectionLayout;
  void location;
}

type _PublicRootAssertions = PublicRootAssertions;
type _CoreClassAssertions = CoreClassAssertions;
type _NavigationAssertions = NavigationAssertions;
type _SectionAssertions = SectionAssertions;

testEpub();
