import assert from 'assert';
import PageList from '../src/pagelist';

describe('PageList', function() {
	function parsePageList(markup) {
		var parser = new DOMParser();
		var doc = parser.parseFromString(markup, 'application/xhtml+xml');

		return new PageList(doc);
	}

	it('preserves string page labels from EPUB 3 page-list nav', function() {
		var pageList = parsePageList(`<?xml version="1.0" encoding="UTF-8"?>
			<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">
				<body>
					<nav epub:type="page-list" hidden="">
						<ol>
							<li><a href="Text/intro.xhtml#page-ix">ix</a></li>
							<li><a href="Text/chapter1.xhtml#page-1">1</a></li>
							<li><a href="Text/chapter2.xhtml#page-2">2</a></li>
						</ol>
					</nav>
				</body>
			</html>`);

		assert.deepEqual(pageList.pages, ['ix', '1', '2']);
		assert.equal(pageList.hrefFromPage('ix'), 'Text/intro.xhtml#page-ix');
		assert.equal(pageList.hrefFromPage('1'), 'Text/chapter1.xhtml#page-1');
		assert.equal(pageList.pageFromHref('Text/chapter2.xhtml#page-2'), '2');
	});

	it('preserves string page labels from NCX pageList', function() {
		var parser = new DOMParser();
		var doc = parser.parseFromString(`<?xml version="1.0" encoding="UTF-8"?>
			<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/">
				<pageList>
					<pageTarget id="page-ix" type="front" value="ix">
						<navLabel><text>ix</text></navLabel>
						<content src="Text/intro.xhtml#page-ix"/>
					</pageTarget>
					<pageTarget id="page-1" type="normal" value="1">
						<navLabel><text>1</text></navLabel>
						<content src="Text/chapter1.xhtml#page-1"/>
					</pageTarget>
				</pageList>
			</ncx>`, 'application/xml');
		var pageList = new PageList(doc);

		assert.deepEqual(pageList.pages, ['ix', '1']);
		assert.equal(pageList.hrefFromPage('ix'), 'Text/intro.xhtml#page-ix');
		assert.equal(pageList.pageFromHref('Text/chapter1.xhtml#page-1'), '1');
	});
});
