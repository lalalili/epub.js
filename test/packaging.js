import assert from 'assert';
import Packaging from '../src/packaging';

describe('Packaging', function() {
	function parsePackage(markup) {
		var parser = new DOMParser();
		var doc = parser.parseFromString(markup, 'application/xml');

		return new Packaging(doc).parse(doc);
	}

	it('should preserve manifest fallback and media overlay idrefs', function() {
		var parsed = parsePackage(`<?xml version="1.0" encoding="UTF-8"?>
			<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="bookid">
				<metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
					<dc:identifier id="bookid">fallback-test</dc:identifier>
					<dc:title>Fallback Test</dc:title>
					<dc:language>en</dc:language>
				</metadata>
				<manifest>
					<item id="video" href="video.webm" media-type="video/webm" fallback="video-fallback" properties="remote-resources scripted" />
					<item id="video-fallback" href="fallback.xhtml" media-type="application/xhtml+xml" media-overlay="mo1" />
					<item id="mo1" href="overlay.smil" media-type="application/smil+xml" />
				</manifest>
				<spine>
					<itemref idref="video-fallback" />
				</spine>
			</package>`);

		assert.equal(parsed.manifest.video.fallback, 'video-fallback');
		assert.deepEqual(parsed.manifest.video.properties, ['remote-resources', 'scripted']);
		assert.equal(parsed.manifest['video-fallback'].overlay, 'mo1');
		assert.equal(parsed.manifest['video-fallback'].mediaOverlay, 'mo1');
	});
});
