import ePub, { Book, Contents, EpubCFI, Rendition, request } from '../';

function testEpub() {
  const epub = ePub("https://s3.amazonaws.com/moby-dick/moby-dick.epub");

  const book = new Book("https://s3.amazonaws.com/moby-dick/moby-dick.epub", {});

  const rendition = new Rendition(book, {});

  request("https://s3.amazonaws.com/moby-dick/moby-dick.epub", "binary");

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

  void version;
  void rendition;
  void StaticContents;
  void cfi;
  void uuid;
}

testEpub();
