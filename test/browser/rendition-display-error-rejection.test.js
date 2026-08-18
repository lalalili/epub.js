import { describe, expect, it } from "vitest";
import Rendition from "../../src/rendition";

/**
 * `_display` used to swallow manager failures: it emitted `displayError` but
 * never settled the deferred it returned, so `display()` hung forever.
 *
 * That turned any exception thrown inside the manager's display chain into a
 * permanently stalled page-turn transaction on the consumer side — observed as
 * `pageTurnInFlight` never clearing and the reader locator freezing, with
 * nothing in the trace pointing at the swallowed exception.
 */
describe("Rendition display error propagation", () => {
	function createRendition({ managerError }) {
		const rendition = Object.create(Rendition.prototype);

		rendition.book = {
			locations: { length: () => 0 },
			spine: { get: () => ({ href: "chapter.xhtml", index: 1 }) }
		};
		rendition.manager = {
			display: () => Promise.reject(managerError)
		};
		rendition.emitted = [];
		rendition.emit = function (name, payload) {
			this.emitted.push([name, payload]);
		};
		rendition.reportLocation = () => {};

		return rendition;
	}

	it("rejects the returned promise when the manager fails", async () => {
		const managerError = new RangeError("Maximum call stack size exceeded");
		const rendition = createRendition({ managerError });

		await expect(rendition._display("chapter.xhtml")).rejects.toBe(managerError);
	});

	it("still emits displayError so existing listeners keep working", async () => {
		const managerError = new Error("boom");
		const rendition = createRendition({ managerError });

		await rendition._display("chapter.xhtml").catch(() => {});

		expect(rendition.emitted).toContainEqual(["displayerror", managerError]);
	});

	it("clears the in-flight displaying deferred on failure", async () => {
		const rendition = createRendition({ managerError: new Error("boom") });

		await rendition._display("chapter.xhtml").catch(() => {});

		expect(rendition.displaying).toBeUndefined();
	});
});
