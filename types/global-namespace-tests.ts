function testGlobalEpubNamespace() {
  const book = ePub("https://s3.amazonaws.com/moby-dick/moby-dick.epub");
  const optionsBook = ePub({
    requestCredentials: true,
    requestHeaders: {
      Authorization: "Bearer token",
    },
  });

  const version: string = ePub.VERSION;
  const StaticBook = ePub.Book;
  const StaticRendition = ePub.Rendition;
  const StaticContents = ePub.Contents;
  const StaticCFI = ePub.CFI;
  const cfi = new ePub.CFI();
  const uuid: string = ePub.utils.uuid();
  const deferred = new ePub.utils.defer<number>();
  const parsedDocument: Document = ePub.utils.parse("<html><body><p>Text</p></body></html>", "text/html");
  const paragraph = ePub.utils.qs(parsedDocument, "p");
  const paragraphText: string | null | undefined = paragraph?.textContent;

  const constructedBook = new StaticBook("https://s3.amazonaws.com/moby-dick/moby-dick.epub", {});
  const rendition = new StaticRendition(book, {});

  book.open(new Blob(), "binary");
  rendition.attachTo("area");
  rendition.resize("100%", "100%", "epubcfi(/6/2)");

  void optionsBook;
  void version;
  void StaticContents;
  void StaticCFI;
  void cfi;
  void uuid;
  void deferred;
  void paragraphText;
  void constructedBook;
  void rendition;
}

testGlobalEpubNamespace();
