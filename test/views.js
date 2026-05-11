import assert from "assert";
import Views from "../src/managers/helpers/views";

describe("Views", function() {
	it("destroys undisplayed views when clearing the collection", function() {
		let container = document.createElement("div");
		let element = document.createElement("div");
		let destroyed = false;
		let view = {
			displayed: false,
			element,
			destroy: function() {
				destroyed = true;
			}
		};
		let views = new Views(container);

		views.append(view);
		views.clear();

		assert.equal(destroyed, true);
		assert.equal(views.length, 0);
		assert.equal(container.children.length, 0);
	});
});
