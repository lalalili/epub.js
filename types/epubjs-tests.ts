import ePub, { Book, Contents, EpubCFI, Layout, Rendition, request } from '../';
import Archive, { ArchiveInput, ArchiveRequestType, ArchiveUrlOptions, ArchiveZip } from './archive';
import type { BookOptions } from './book';
import type { ViewportSettings } from './contents';
import type EpubRoot from './epub';
import Navigation, { LandmarkItem, NavItem, NavigationInputItem } from './navigation';
import Packaging, {
  PackagingJsonManifest,
  PackagingManifestItem,
  PackagingManifestObject,
  PackagingMetadataObject,
  PackagingObject,
  PackagingSpineItem,
  PackagingTocItem,
} from './packaging';
import PageList, { PageListItem, PageValue } from './pagelist';
import type { Location, RenditionOptions } from './rendition';
import Resources, {
  ReplacementMode,
  ResourceArchive,
  ResourceManifest,
  ResourceManifestItem,
  ResourceOptions,
  ResourceRequest,
  ResourceResolver,
  ResourceSettings,
} from './resources';
import Section, { LayoutSettings, SectionHookSet, SectionSearchResult, SpineItem } from './section';
import Spine, { SpineLookup, SpineManifestItem, SpinePackage, SpinePackageItem, SpineResolver } from './spine';
import Store, { StoreData, StoreHeaders, StoreRequest, StoreRequestType, StoreResources, StoreResolver, StoreStorage, StoreUrlOptions } from './store';
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

type SpineAssertions = [
  Assert<IsExact<Spine["spineItems"], Section[] | undefined>>,
  Assert<IsExact<Spine["spineByHref"], SpineLookup | undefined>>,
  Assert<IsExact<Spine["spineById"], SpineLookup | undefined>>,
  Assert<IsExact<Spine["hooks"], SectionHookSet | undefined>>,
  Assert<IsExact<Spine["loaded"], boolean>>,
  Assert<IsExact<Spine["items"], SpinePackageItem[] | undefined>>,
  Assert<IsExact<Spine["manifest"], Record<string, SpineManifestItem> | undefined>>,
  Assert<IsExact<Spine["spineNodeIndex"], number | undefined>>,
  Assert<IsExact<Spine["baseUrl"], string | undefined>>,
  Assert<IsExact<Spine["length"], number | undefined>>,
  Assert<IsExact<Parameters<Spine["unpack"]>, [_package: SpinePackage, resolver: SpineResolver, canonical: SpineResolver]>>,
  Assert<IsExact<ReturnType<Spine["resolveFallbackItem"]>, SpineManifestItem>>,
  Assert<IsExact<ReturnType<Spine["isRenderableType"]>, boolean>>,
  Assert<IsExact<ReturnType<Spine["get"]>, Section | null>>,
  Assert<IsExact<ReturnType<Spine["append"]>, number>>,
  Assert<IsExact<ReturnType<Spine["prepend"]>, number>>,
  Assert<IsExact<ReturnType<Spine["remove"]>, Section[] | undefined>>,
  Assert<IsExact<ReturnType<Spine["each"]>, void>>,
  Assert<IsExact<ReturnType<Spine["first"]>, Section | undefined>>,
  Assert<IsExact<ReturnType<Spine["last"]>, Section | undefined>>,
  Assert<IsExact<ReturnType<Spine["destroy"]>, void>>
];

type ArchiveAssertions = [
  Assert<IsExact<Archive["zip"], ArchiveZip | undefined>>,
  Assert<IsExact<Archive["urlCache"], Record<string, string>>>,
  Assert<IsExact<Parameters<Archive["open"]>, [input: ArchiveInput, isBase64?: boolean | undefined]>>,
  Assert<IsExact<ReturnType<Archive["open"]>, Promise<ArchiveZip>>>,
  Assert<IsExact<Parameters<Archive["openUrl"]>, [zipUrl: string, isBase64?: boolean | undefined]>>,
  Assert<IsExact<ReturnType<Archive["getBlob"]>, Promise<Blob> | undefined>>,
  Assert<IsExact<ReturnType<Archive["getText"]>, Promise<string> | undefined>>,
  Assert<IsExact<ReturnType<Archive["getBase64"]>, Promise<string> | undefined>>,
  Assert<IsExact<ReturnType<Archive["createUrl"]>, Promise<string>>>,
  Assert<IsExact<ReturnType<Archive["revokeUrl"]>, void>>,
  Assert<IsExact<ReturnType<Archive["destroy"]>, void>>
];

type PackagingAssertions = [
  Assert<IsExact<ConstructorParameters<typeof Packaging>, [packageDocument?: Document | XMLDocument | undefined]>>,
  Assert<IsExact<Packaging["manifest"], PackagingManifestObject | undefined>>,
  Assert<IsExact<Packaging["navPath"], string | false | undefined>>,
  Assert<IsExact<Packaging["ncxPath"], string | false | undefined>>,
  Assert<IsExact<Packaging["coverPath"], string | false | undefined>>,
  Assert<IsExact<Packaging["spineNodeIndex"], number | undefined>>,
  Assert<IsExact<Packaging["spine"], PackagingSpineItem[] | undefined>>,
  Assert<IsExact<Packaging["metadata"], PackagingMetadataObject | undefined>>,
  Assert<IsExact<Packaging["uniqueIdentifier"], string | undefined>>,
  Assert<IsExact<Packaging["toc"], PackagingTocItem[] | undefined>>,
  Assert<IsExact<ReturnType<Packaging["parse"]>, PackagingObject>>,
  Assert<IsExact<Parameters<Packaging["load"]>[0], PackagingJsonManifest>>,
  Assert<IsExact<ReturnType<Packaging["load"]>, PackagingObject>>,
  Assert<IsExact<ReturnType<Packaging["parseMetadata"]>, PackagingMetadataObject>>,
  Assert<IsExact<ReturnType<Packaging["parseManifest"]>, PackagingManifestObject>>,
  Assert<IsExact<ReturnType<Packaging["parseSpine"]>, PackagingSpineItem[]>>,
  Assert<IsExact<ReturnType<Packaging["findUniqueIdentifier"]>, string>>,
  Assert<IsExact<ReturnType<Packaging["findNavPath"]>, string | false>>,
  Assert<IsExact<ReturnType<Packaging["findNcxPath"]>, string | false>>,
  Assert<IsExact<ReturnType<Packaging["findCoverPath"]>, string | false>>,
  Assert<IsExact<ReturnType<Packaging["getElementText"]>, string>>,
  Assert<IsExact<ReturnType<Packaging["getPropertyText"]>, string>>,
  Assert<IsExact<ReturnType<Packaging["destroy"]>, void>>
];

type PageListAssertions = [
  Assert<IsExact<ConstructorParameters<typeof PageList>, [xml?: Document | XMLDocument | undefined]>>,
  Assert<IsExact<PageList["pages"], PageValue[] | undefined>>,
  Assert<IsExact<PageList["locations"], string[] | undefined>>,
  Assert<IsExact<PageList["hrefs"], string[] | undefined>>,
  Assert<IsExact<PageList["hrefByPage"], Record<string, string> | undefined>>,
  Assert<IsExact<PageList["pageByHref"], Record<string, PageValue> | undefined>>,
  Assert<IsExact<PageList["firstPage"], number>>,
  Assert<IsExact<PageList["lastPage"], number>>,
  Assert<IsExact<PageList["totalPages"], number>>,
  Assert<IsExact<PageList["pageList"], PageListItem[] | undefined>>,
  Assert<IsExact<ReturnType<PageList["parse"]>, PageListItem[] | undefined>>,
  Assert<IsExact<ReturnType<PageList["parseNav"]>, PageListItem[]>>,
  Assert<IsExact<ReturnType<PageList["parseNcx"]>, PageListItem[]>>,
  Assert<IsExact<ReturnType<PageList["item"]>, PageListItem>>,
  Assert<IsExact<ReturnType<PageList["ncxItem"]>, PageListItem>>,
  Assert<IsExact<ReturnType<PageList["process"]>, void>>,
  Assert<IsExact<ReturnType<PageList["pageFromCfi"]>, PageValue | -1>>,
  Assert<IsExact<ReturnType<PageList["cfiFromPage"]>, string | -1>>,
  Assert<IsExact<ReturnType<PageList["hrefFromPage"]>, string | undefined>>,
  Assert<IsExact<ReturnType<PageList["pageFromHref"]>, PageValue | undefined>>,
  Assert<IsExact<ReturnType<PageList["pageFromPercentage"]>, number>>,
  Assert<IsExact<ReturnType<PageList["percentageFromPage"]>, number>>,
  Assert<IsExact<ReturnType<PageList["percentageFromCfi"]>, number>>,
  Assert<IsExact<ReturnType<PageList["destroy"]>, void>>
];

type ResourcesAssertions = [
  Assert<IsExact<ConstructorParameters<typeof Resources>, [manifest: ResourceManifest | PackagingManifestObject, options?: ResourceOptions | undefined]>>,
  Assert<IsExact<Resources["settings"], ResourceSettings | undefined>>,
  Assert<IsExact<Resources["manifest"], ResourceManifest | undefined>>,
  Assert<IsExact<Resources["resources"], ResourceManifestItem[] | undefined>>,
  Assert<IsExact<Resources["replacementUrls"], string[] | undefined>>,
  Assert<IsExact<Resources["html"], ResourceManifestItem[] | undefined>>,
  Assert<IsExact<Resources["assets"], ResourceManifestItem[] | undefined>>,
  Assert<IsExact<Resources["css"], ResourceManifestItem[] | undefined>>,
  Assert<IsExact<Resources["urls"], string[] | undefined>>,
  Assert<IsExact<Resources["cssUrls"], string[] | undefined>>,
  Assert<IsExact<ReturnType<Resources["process"]>, void>>,
  Assert<IsExact<ReturnType<Resources["split"]>, void>>,
  Assert<IsExact<ReturnType<Resources["splitUrls"]>, void>>,
  Assert<IsExact<ReturnType<Resources["createUrl"]>, Promise<string>>>,
  Assert<IsExact<ReturnType<Resources["replacements"]>, Promise<Array<string | null>>>>,
  Assert<IsExact<ReturnType<Resources["replaceCss"]>, Promise<void[]>>>,
  Assert<IsExact<ReturnType<Resources["createCssFile"]>, Promise<string | undefined>>>,
  Assert<IsExact<ReturnType<Resources["relativeTo"]>, string[]>>,
  Assert<IsExact<ReturnType<Resources["get"]>, Promise<string> | undefined>>,
  Assert<IsExact<ReturnType<Resources["substitute"]>, string>>,
  Assert<IsExact<ReturnType<Resources["destroy"]>, void>>
];

type StoreAssertions = [
  Assert<IsExact<ConstructorParameters<typeof Store>, [name: string, requester?: StoreRequest | undefined, resolver?: StoreResolver | undefined]>>,
  Assert<IsExact<Store["urlCache"], Record<string, string>>>,
  Assert<IsExact<Store["storage"], StoreStorage | undefined>>,
  Assert<IsExact<Store["name"], string>>,
  Assert<IsExact<Store["requester"], StoreRequest>>,
  Assert<IsExact<Store["resolver"], StoreResolver | undefined>>,
  Assert<IsExact<Store["online"], boolean>>,
  Assert<IsExact<Store["_status"], ((event?: Event) => void) | undefined>>,
  Assert<IsExact<Parameters<Store["add"]>, [resources: StoreResources, force?: boolean | undefined]>>,
  Assert<IsExact<ReturnType<Store["add"]>, Promise<StoreData[]>>>,
  Assert<IsExact<ReturnType<Store["put"]>, Promise<StoreData>>>,
  Assert<IsExact<ReturnType<Store["getBlob"]>, Promise<Blob | undefined>>>,
  Assert<IsExact<ReturnType<Store["getText"]>, Promise<string | ArrayBuffer | null | undefined>>>,
  Assert<IsExact<ReturnType<Store["getBase64"]>, Promise<string | ArrayBuffer | null | undefined>>>,
  Assert<IsExact<ReturnType<Store["createUrl"]>, Promise<string>>>,
  Assert<IsExact<ReturnType<Store["revokeUrl"]>, void>>,
  Assert<IsExact<ReturnType<Store["checkRequirements"]>, void>>,
  Assert<IsExact<ReturnType<Store["addListeners"]>, void>>,
  Assert<IsExact<ReturnType<Store["removeListeners"]>, void>>,
  Assert<IsExact<ReturnType<Store["status"]>, void>>,
  Assert<IsExact<ReturnType<Store["destroy"]>, void>>
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
  const spinePackage: SpinePackage = {
    spine: [{
      id: "chapter-one",
      idref: "chapter-one",
      linear: "yes",
      properties: [],
      index: 0,
      cfiBase: "",
    }],
    manifest: {
      "chapter-one": {
        href: "Text/chapter1.xhtml",
        type: "application/xhtml+xml",
        properties: [],
      },
    },
    spineNodeIndex: 0,
    baseUrl: "https://example.com/",
  };
  const spineResolver: SpineResolver = (href: string) => href;
  const spine = new Spine();
  spine.unpack(spinePackage, spineResolver, spineResolver);
  const spineSection: Section | null = spine.get("Text/chapter1.xhtml");
  const firstSpineSection: Section | undefined = spine.first();
  const lastSpineSection: Section | undefined = spine.last();
  const removedSpineSections: Section[] | undefined = spineSection ? spine.remove(spineSection) : undefined;
  const archive = new Archive();
  const archiveInput: ArchiveInput = new ArrayBuffer(0);
  const archiveRequestType: ArchiveRequestType = "xhtml";
  const archiveUrlOptions: ArchiveUrlOptions = { base64: true };
  const openedArchive: Promise<ArchiveZip> = archive.open(archiveInput);
  const openedArchiveUrl: Promise<ArchiveZip> = archive.openUrl("https://example.com/book.epub");
  const archiveBlob: Promise<Blob> = archive.request("/OPS/images/cover.jpg", "blob");
  const archiveJson: Promise<JsonValue> = archive.request("/OPS/package.json", "json");
  const archiveDocument: Promise<Document | XMLDocument> = archive.request("/OPS/package.opf", "opf");
  const archiveFallback: Promise<RequestResponse> = archive.request("/OPS/chapter.xhtml", archiveRequestType);
  const archiveBlobEntry: Promise<Blob> | undefined = archive.getBlob("/OPS/images/cover.jpg");
  const archiveTextEntry: Promise<string> | undefined = archive.getText("/OPS/chapter.xhtml");
  const archiveBase64Entry: Promise<string> | undefined = archive.getBase64("/OPS/images/cover.jpg");
  const archiveObjectUrl: Promise<string> = archive.createUrl("/OPS/images/cover.jpg");
  const archiveBase64Url: Promise<string> = archive.createUrl("/OPS/images/cover.jpg", archiveUrlOptions);
  const archiveParsedJson: JsonValue = archive.handleResponse("{\"ok\":true}", "json");
  const archiveParsedDocument: Document | XMLDocument = archive.handleResponse("<html></html>", "xhtml");
  const packagingJson: PackagingJsonManifest = {
    metadata: { title: "JSON Manifest" },
    readingOrder: [{ href: "Text/chapter1.xhtml" }],
    resources: [{ href: "cover.jpg", rel: ["cover"] }],
    toc: [{ href: "Text/chapter1.xhtml", title: "Chapter 1" }],
  };
  const packaging = new Packaging();
  const parsedPackaging: PackagingObject = packaging.parse(parsedDocument);
  const loadedPackaging: PackagingObject = packaging.load(packagingJson);
  const packagingManifestItem: PackagingManifestItem | undefined = loadedPackaging.manifest[0];
  const packagingMetadataTitle: string | undefined = loadedPackaging.metadata.title;
  const packagingTocItem: PackagingTocItem | undefined = loadedPackaging.toc?.[0];
  const pageListItems: PageListItem[] = [{
    page: "1",
    href: "Text/chapter.xhtml#page-1",
    cfi: "epubcfi(/6/2[chap]!/4/2/2)",
    packageUrl: "package.opf",
  }];
  const pageList = new PageList();
  const parsedPageList: PageListItem[] | undefined = pageList.parse(parsedDocument);
  const loadedPageList: void = pageList.process(pageListItems);
  const pageFromCfi: PageValue | -1 = pageList.pageFromCfi("epubcfi(/6/2[chap]!/4/2/2)");
  const cfiFromPage: string | -1 = pageList.cfiFromPage("1");
  const hrefFromPage: string | undefined = pageList.hrefFromPage("1");
  const pageFromHref: PageValue | undefined = pageList.pageFromHref("Text/chapter.xhtml#page-1");
  const pageFromPercentage: number = pageList.pageFromPercentage(0.5);
  const percentageFromPage: number = pageList.percentageFromPage(1);
  const percentageFromCfi: number = pageList.percentageFromCfi("epubcfi(/6/2[chap]!/4/2/2)");
  const resourceManifest: ResourceManifest = {
    chapter: {
      href: "Text/chapter.xhtml",
      type: "application/xhtml+xml",
    },
    style: {
      href: "Styles/main.css",
      type: "text/css",
    },
    cover: {
      href: "Images/cover.jpg",
      type: "image/jpeg",
    },
  };
  const resourceResolver: ResourceResolver = (href: string) => `/OPS/${href}`;
  const resourceRequest: ResourceRequest = (url: string, type: "blob" | "text") => (
    type === "blob"
      ? Promise.resolve(new Blob([url]))
      : Promise.resolve("body { background: url(../Images/cover.jpg); }")
  );
  const resourceArchive: ResourceArchive = {
    createUrl: (url: string) => Promise.resolve(url),
    getText: () => Promise.resolve("body {}"),
  };
  const replacementMode: ReplacementMode = "base64";
  const resourceOptions: ResourceOptions = {
    replacements: replacementMode,
    archive: resourceArchive,
    resolver: resourceResolver,
    request: resourceRequest,
  };
  const resources = new Resources(resourceManifest, resourceOptions);
  const resourceUrl: Promise<string> = resources.createUrl("/OPS/Images/cover.jpg");
  const resourceReplacements: Promise<Array<string | null>> = resources.replacements();
  const resourceCssReplacements: Promise<void[]> = resources.replaceCss();
  const resourceCssFile: Promise<string | undefined> = resources.createCssFile("Styles/main.css");
  const relativeResourceUrls: string[] = resources.relativeTo("/OPS/Text/chapter.xhtml");
  const resourceReplacement: Promise<string> | undefined = resources.get("Images/cover.jpg");
  const substitutedResourceContent: string = resources.substitute("url(../Images/cover.jpg)", "/OPS/Text/chapter.xhtml");
  const storeHeaders: StoreHeaders = { Accept: "application/json" };
  const storeRequestType: StoreRequestType = "json";
  const storeResolver: StoreResolver = (href: string) => `/OPS/${href}`;
  const storeRequest: StoreRequest = (url: string, type?: StoreRequestType) => (
    type === "json"
      ? Promise.resolve({ ok: true })
      : Promise.resolve(new ArrayBuffer(0))
  );
  const storeUrlOptions: StoreUrlOptions = { base64: true };
  const storeResources: StoreResources = {
    resources: [{ href: "Text/chapter.xhtml" }],
  };
  const store = new Store("epubjs-type-store", storeRequest, storeResolver);
  const storedResources: Promise<StoreData[]> = store.add(storeResources);
  const storedData: Promise<StoreData> = store.put("/OPS/data.json", true, storeHeaders);
  const storedRequest: Promise<JsonValue> = store.request("/OPS/data.json", "json", true, storeHeaders);
  const storedFallbackRequest: Promise<RequestResponse> = store.request("/OPS/data.json", storeRequestType, true, storeHeaders);
  const storedRetrieve: Promise<Document | XMLDocument> = store.retrieve("/OPS/package.opf", "opf");
  const storedBlob: Promise<Blob | undefined> = store.getBlob("/OPS/images/cover.jpg");
  const storedText: Promise<string | ArrayBuffer | null | undefined> = store.getText("/OPS/chapter.xhtml");
  const storedBase64: Promise<string | ArrayBuffer | null | undefined> = store.getBase64("/OPS/images/cover.jpg");
  const storedUrl: Promise<string> = store.createUrl("/OPS/images/cover.jpg");
  const storedBase64Url: Promise<string> = store.createUrl("/OPS/images/cover.jpg", storeUrlOptions);
  const storedParsedJson: JsonValue = store.handleResponse("{\"ok\":true}", "json");
  const storedParsedDocument: Document | XMLDocument = store.handleResponse("<html></html>", "xhtml");

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
  void spineSection;
  void firstSpineSection;
  void lastSpineSection;
  void removedSpineSections;
  void openedArchive;
  void openedArchiveUrl;
  void archiveBlob;
  void archiveJson;
  void archiveDocument;
  void archiveFallback;
  void archiveBlobEntry;
  void archiveTextEntry;
  void archiveBase64Entry;
  void archiveObjectUrl;
  void archiveBase64Url;
  void archiveParsedJson;
  void archiveParsedDocument;
  void parsedPackaging;
  void packagingManifestItem;
  void packagingMetadataTitle;
  void packagingTocItem;
  void parsedPageList;
  void loadedPageList;
  void pageFromCfi;
  void cfiFromPage;
  void hrefFromPage;
  void pageFromHref;
  void pageFromPercentage;
  void percentageFromPage;
  void percentageFromCfi;
  void resourceUrl;
  void resourceReplacements;
  void resourceCssReplacements;
  void resourceCssFile;
  void relativeResourceUrls;
  void resourceReplacement;
  void substitutedResourceContent;
  void storedResources;
  void storedData;
  void storedRequest;
  void storedFallbackRequest;
  void storedRetrieve;
  void storedBlob;
  void storedText;
  void storedBase64;
  void storedUrl;
  void storedBase64Url;
  void storedParsedJson;
  void storedParsedDocument;
  void location;
}

type _PublicRootAssertions = PublicRootAssertions;
type _CoreClassAssertions = CoreClassAssertions;
type _NavigationAssertions = NavigationAssertions;
type _SectionAssertions = SectionAssertions;
type _SpineAssertions = SpineAssertions;
type _ArchiveAssertions = ArchiveAssertions;
type _PackagingAssertions = PackagingAssertions;
type _PageListAssertions = PageListAssertions;
type _ResourcesAssertions = ResourcesAssertions;
type _StoreAssertions = StoreAssertions;

testEpub();
