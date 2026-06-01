import assert from 'assert';
import EpubCFI from '../src/epubcfi.js';
// var fs = require('fs');
if (typeof DOMParser === "undefined") {
	global.DOMParser = require('@xmldom/xmldom').DOMParser;
}

describe('EpubCFI', function() {
	describe('#toRange()', function() {
		var base = "/6/4[chap01ref]";
		// var contents = fs.readFileSync(__dirname + '/fixtures/chapter1-highlights.xhtml', 'utf8');
		var contents = require('./fixtures/chapter1-highlights.xhtml').default;

		var doc = new DOMParser().parseFromString(contents, "application/xhtml+xml");

		// var serializer = new XMLSerializer();
		// console.log(serializer.serializeToString(doc));

		it('get a range from a cfi', function() {
			var t1 = doc.getElementById('c001p0004').childNodes[0];
			var t2 = doc.getElementById('c001p0007').childNodes[0];
			var ogRange = doc.createRange();
			var cfi;
			var newRange;

			ogRange.setStart(t1, 6);

			cfi = new EpubCFI(ogRange, base);

			// Check it was parse correctly
			assert.equal( cfi.toString(), "epubcfi(/6/4[chap01ref]!/4/2/10/2[c001p0004]/1:6)" );

			// Check the range
			newRange = cfi.toRange(doc);

			assert.equal( newRange.startContainer, t1);
			assert.equal( newRange.startOffset, 6);
			assert.equal( newRange.collapsed, true);

		});

		it('get a range from a cfi with a range', function() {
			var t1 = doc.getElementById('c001p0004').childNodes[0];
			var t2 = doc.getElementById('c001p0007').childNodes[0];
			var ogRange = doc.createRange();
			var cfi;
			var newRange;

			ogRange.setStart(t1, 6);
			ogRange.setEnd(t2, 27);

			cfi = new EpubCFI(ogRange, base);

			// Check it was parse correctly
			assert.equal( cfi.toString(), "epubcfi(/6/4[chap01ref]!/4/2,/10/2[c001p0004]/1:6,/16/2[c001p0007]/1:27)" );

			// Check the range
			newRange = cfi.toRange(doc);

			assert.equal( newRange.startContainer, t1);
			assert.equal( newRange.startOffset, 6);

			assert.equal( newRange.endContainer, t2);
			assert.equal( newRange.endOffset, 27);

			assert.equal( newRange.collapsed, false);

		});

		it('get a cfi from a range inside a highlight', function() {
			var t1 = doc.getElementById('highlight-1').childNodes[0];
			var ogRange = doc.createRange();
			var cfi;
			var newRange;

			ogRange.setStart(t1, 6);

			cfi = new EpubCFI(ogRange, base, 'annotator-hl');

			assert.equal( cfi.toString(), "epubcfi(/6/4[chap01ref]!/4/2/32/2[c001p0017]/1:43)" );

			// Check the range
			newRange = cfi.toRange(doc, 'annotator-hl');

			assert.ok(newRange.startContainer);

			assert.equal( newRange.startContainer, t1);
			assert.equal( newRange.startOffset, 6);

		});

		it('get a cfi from a range inside a highlight range', function() {
			var t1 = doc.getElementById('highlight-2').childNodes[0];
			var t2 = doc.getElementById('c001s0001').childNodes[1];
			var ogRange = doc.createRange();
			var cfi;
			var newRange;

			ogRange.setStart(t1, 5);
			ogRange.setEnd(t2, 25);

			cfi = new EpubCFI(ogRange, base, 'annotator-hl');

			assert.equal( cfi.toString(), "epubcfi(/6/4[chap01ref]!/4/2/4/2[c001s0001],/1:5,/1:41)" );

			// Check the range
			newRange = cfi.toRange(doc, 'annotator-hl');

			assert.strictEqual( newRange.startContainer.textContent, t1.textContent);
			// assert.strictEqual( newRange.startContainer, t1);
			// assert.equal( newRange.startOffset, 5);

		});

		it('clamps out-of-range offsets from stored cfi to a safe range', function() {
			var cfi = new EpubCFI("epubcfi(/6/4[chap01ref]!/4/2/10/2[c001p0004]/1:9999)");
			var newRange = cfi.toRange(doc);

			assert.ok(newRange);
			assert.ok(newRange.startContainer);
			assert.ok(newRange.startOffset >= 0);
			assert.ok(newRange.startOffset <= newRange.startContainer.textContent.length);
		});

	});

});
