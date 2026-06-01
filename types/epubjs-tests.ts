import ePub, { Book, Rendition, request } from '../';

function testEpub() {
  const epub = ePub("https://s3.amazonaws.com/moby-dick/moby-dick.epub");

  const book = new Book("https://s3.amazonaws.com/moby-dick/moby-dick.epub", {});

  const rendition = new Rendition(book, {});

  request("https://s3.amazonaws.com/moby-dick/moby-dick.epub", "binary");
}

testEpub();
