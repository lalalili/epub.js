import assert from 'assert';
import Packaging from '../src/packaging';
import Spine from '../src/spine';

describe('Spine', function() {
	function unpackPackage(markup) {
		var parser = new DOMParser();
		var doc = parser.parseFromString(markup, 'application/xml');
		var packaging = new Packaging(doc).parse(doc);
		var spine = new Spine();

		spine.unpack(
			packaging,
			function(href) {
				return 'resolved:' + href;
			},
			function(href) {
				return 'canonical:' + href;
			}
		);

		return spine;
	}

	it('uses a renderable manifest fallback for foreign spine items', function() {
		var spine = unpackPackage(`<?xml version="1.0" encoding="UTF-8"?>
			<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="bookid">
				<metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
					<dc:identifier id="bookid">spine-fallback-test</dc:identifier>
					<dc:title>Spine Fallback Test</dc:title>
					<dc:language>en</dc:language>
				</metadata>
				<manifest>
					<item id="video" href="video.webm" media-type="video/webm" fallback="video-fallback" properties="remote-resources" />
					<item id="video-fallback" href="fallback.xhtml" media-type="application/xhtml+xml" properties="scripted" />
				</manifest>
				<spine>
					<itemref idref="video" />
				</spine>
			</package>`);
		var section = spine.get(0);

		assert.equal(section.href, 'fallback.xhtml');
		assert.equal(section.url, 'resolved:fallback.xhtml');
		assert.equal(section.canonical, 'canonical:fallback.xhtml');
		assert.equal(section.originalHref, 'video.webm');
		assert.equal(section.mediaType, 'application/xhtml+xml');
		assert.equal(section.originalMediaType, 'video/webm');
		assert.deepEqual(section.fallbackChain, ['video-fallback']);
		assert.deepEqual(section.properties, ['remote-resources', 'scripted']);
	});
});
