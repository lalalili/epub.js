import assert from 'assert';
import Locations from '../src/locations';
import * as core from '../src/utils/core';

describe('Locations', function() {

	describe('#parse', function() {
		var chapter = require('./fixtures/locations.xhtml').default;

		it('parse locations from a document', function() {			
			var doc = core.parse(chapter, "application/xhtml+xml");
			var contents = doc.documentElement;
			var locations = new Locations();
			var result = locations.parse(contents, "/6/4[chap01ref]", 100);
			assert.equal(result.length, 15);

		});

		it('parse locations from xmldom', function() {
			var doc = core.parse(chapter, "application/xhtml+xml", true);
			var contents = doc.documentElement;

			var locations = new Locations();
			var result = locations.parse(contents, "/6/4[chap01ref]", 100);
			assert.equal(result.length, 15);

		});

		it('creates at least one location for no-readable-text sections', function() {
			var chapterWithoutReadableText = "<?xml version='1.0' encoding='utf-8'?><html xmlns='http://www.w3.org/1999/xhtml'><body>\n<img src='cover.jpg' alt='cover'/>\n</body></html>";
			var doc = core.parse(chapterWithoutReadableText, "application/xhtml+xml");
			var contents = doc.documentElement;

			var locations = new Locations();
			var result = locations.parse(contents, "/6/2[coverref]", 100);
			assert.ok(result.length >= 1);
		});

	});

});
