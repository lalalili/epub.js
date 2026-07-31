import { afterEach, describe, expect, it } from "vitest";
import ePub from "../../src/epub";
import EpubCFI from "../../src/epubcfi";
import { fixtureUrl } from "./helpers/fixtures";

describe("rendition resize CFI ownership characterization", () => {
	const fixtures = [];

	afterEach(() => {
		fixtures.splice(0).forEach(({ book, host }) => {
			book.destroy();
			host.remove();
		});
	});

	function nextFrames(count = 2) {
		return new Promise((resolve) => {
			const advance = () => {
				if (count <= 0) {
					resolve();
					return;
				}
				count -= 1;
				requestAnimationFrame(advance);
			};
			advance();
		});
	}

	function waitForDisplayed(rendition) {
		return new Promise((resolve, reject) => {
			const timeout = setTimeout(() => {
				rendition.off("displayed", handleDisplayed);
				reject(new Error("Timed out waiting for rendition display after resize"));
			}, 5000);
			const handleDisplayed = (section) => {
				clearTimeout(timeout);
				rendition.off("displayed", handleDisplayed);
				resolve(section);
			};
			rendition.on("displayed", handleDisplayed);
		});
	}

	function findPreciseTarget(view) {
		const walker = view.contents.document.createTreeWalker(
			view.contents.document.body,
			NodeFilter.SHOW_TEXT
		);
		const nodes = [];

		while (walker.nextNode()) {
			if (walker.currentNode.textContent.trim().length >= 20) {
				nodes.push(walker.currentNode);
			}
		}

		const node = nodes[Math.floor(nodes.length * 0.72)];
		const offset = Math.floor(node.textContent.length * 0.55);
		const range = view.contents.document.createRange();
		range.setStart(node, offset);
		range.collapse(true);

		return {
			cfi: new EpubCFI(range, view.section.cfiBase).toString(),
			node,
			offset,
			text: node.textContent.slice(Math.max(0, offset - 12), offset + 12)
		};
	}

	function round(value) {
		return Math.round(Number(value) * 100) / 100;
	}

	function snapshot(rendition, cfi) {
		const manager = rendition.manager;
		const view = manager.views.first();
		const range = new EpubCFI(cfi).toRange(view.contents.document);
		const rangeRect = range.getBoundingClientRect();
		const targetOffset = view.locationOf(cfi);
		const pageAdvance = manager.getPageAdvance();
		const pageStart = Math.floor(targetOffset.left / pageAdvance) * pageAdvance;
		const scrollLeft = manager.container.scrollLeft;
		const maxPhysicalStart = Math.max(
			0,
			manager.container.scrollWidth - manager.container.clientWidth
		);
		const physicalStart = (
			manager.settings.direction === "rtl" && scrollLeft < 0
				? maxPhysicalStart + scrollLeft
				: scrollLeft
		);
		const viewportEnd = physicalStart + manager.container.clientWidth;

		return {
			location: {
				href: rendition.location?.start?.href ?? null,
				cfi: rendition.location?.start?.cfi ?? null
			},
			range: {
				text: range.toString(),
				startOffset: range.startOffset,
				left: round(rangeRect.left),
				right: round(rangeRect.right)
			},
			target: {
				left: round(targetOffset.left),
				top: round(targetOffset.top),
				pageStart: round(pageStart),
				pageIndex: Math.floor(targetOffset.left / pageAdvance)
			},
			container: {
				clientWidth: manager.container.clientWidth,
				clientHeight: manager.container.clientHeight,
				scrollLeft: round(scrollLeft),
				scrollWidth: manager.container.scrollWidth,
				physicalStart: round(physicalStart),
				viewportEnd: round(viewportEnd),
				pageAdvance: round(pageAdvance)
			},
			ownsTargetPage:
				physicalStart <= pageStart
				&& pageStart < viewportEnd
		};
	}

	it("keeps a precise CFI fragment owned after a horizontal RTL portrait-to-landscape reflow", async () => {
		const host = document.createElement("div");
		document.body.appendChild(host);
		const book = ePub(fixtureUrl("alice.epub"));
		fixtures.push({ book, host });

		await book.ready;
		book.package.metadata.direction = "rtl";
		const rendition = book.renderTo(host, {
			width: 393,
			height: 600,
			spread: "none",
			flow: "paginated",
			resizeSettleTrace: true
		});
		await rendition.display(3);
		await nextFrames();

		const initialView = rendition.manager.views.first();
		const target = findPreciseTarget(initialView);
		const roundTripRange = new EpubCFI(target.cfi).toRange(initialView.contents.document);

		expect(roundTripRange.startContainer).toBe(target.node);
		expect(roundTripRange.startOffset).toBe(target.offset);

		await rendition.display(target.cfi);
		await nextFrames();
		const portrait = snapshot(rendition, target.cfi);
		rendition.debugResizeSettleTrace({ clear: true });

		const displayed = waitForDisplayed(rendition);
		rendition.resize(802, 345, target.cfi);
		await displayed;
		await nextFrames(4);
		const landscape = snapshot(rendition, target.cfi);
		const resizeTrace = rendition.debugResizeSettleTrace();
		console.info("rendition-resize-cfi-ownership", JSON.stringify({
			target: {
				cfi: target.cfi,
				text: target.text
			},
			portrait,
			landscape,
			resizeTrace
		}));

		expect({
			target: {
				cfi: target.cfi,
				text: target.text
			},
			portrait,
			landscape
		}).toMatchObject({
			portrait: {
				ownsTargetPage: true
			},
			landscape: {
				ownsTargetPage: true
			}
		});
		expect(resizeTrace.map((entry) => entry.event)).toEqual(expect.arrayContaining([
			"resize:capture",
			"resize:layout-updated",
			"rendition:resize-resolved",
			"display:start",
			"display:target-mapped",
			"display:scroll-target",
			"scroll:applied",
			"location:mapped"
		]));
		const targetMapped = resizeTrace.find((entry) => entry.event === "display:target-mapped");
		const scrollTarget = resizeTrace.find((entry) => entry.event === "display:scroll-target");
		expect(targetMapped).toMatchObject({
			generation: 1,
			detail: {
				target: target.cfi,
				range: {
					startOffset: target.offset,
					collapsed: true
				}
			}
		});
		expect(JSON.parse(targetMapped.detailJson)).toMatchObject({
			target: target.cfi,
			range: {
				startOffset: target.offset,
				collapsed: true
			}
		});
		expect(scrollTarget).toMatchObject({
			generation: 1,
			detail: {
				offset: targetMapped.detail.offset
			}
		});
	});

	it("characterizes resize preferring stale rendition location over the current manager page", async () => {
		const host = document.createElement("div");
		document.body.appendChild(host);
		const book = ePub(fixtureUrl("alice.epub"));
		fixtures.push({ book, host });

		await book.ready;
		book.package.metadata.direction = "rtl";
		const rendition = book.renderTo(host, {
			width: 393,
			height: 600,
			spread: "none",
			flow: "paginated",
			resizeSettleTrace: true
		});
		await rendition.display(3);
		await nextFrames();

		const manager = rendition.manager;
		const staleLocation = rendition.currentLocation();
		rendition.location = staleLocation;
		const staleCfi = rendition.location.start.cfi;
		manager.scrollToLogicalPage(3);
		await nextFrames();
		const managerLocation = rendition.currentLocation();
		const freshCfi = managerLocation.start.cfi;
		rendition.location = staleLocation;
		const beforeResize = snapshot(rendition, freshCfi);

		expect(manager.getCurrentPageIndex()).toBe(3);
		expect(freshCfi).not.toBe(staleCfi);
		expect(rendition.location.start.cfi).toBe(staleCfi);
		expect(beforeResize.ownsTargetPage).toBe(true);

		rendition.debugResizeSettleTrace({ clear: true });
		const displayed = waitForDisplayed(rendition);
		rendition.resize(802, 345);
		await displayed;
		await nextFrames(4);

		const afterResize = snapshot(rendition, freshCfi);
		const resizeTrace = rendition.debugResizeSettleTrace();
		const resolved = resizeTrace.find((entry) => entry.event === "rendition:resize-resolved");
		const displayStart = resizeTrace.find((entry) => entry.event === "display:start");

		expect(resolved).toMatchObject({
			detail: {
				inputCfi: null,
				locationCfi: staleCfi,
				resolvedCfi: staleCfi
			}
		});
		expect(displayStart).toMatchObject({
			detail: {
				target: staleCfi
			}
		});
		expect(afterResize.ownsTargetPage).toBe(false);
	});

	it("characterizes manager target as display-transaction state instead of settled visual ownership", async () => {
		const host = document.createElement("div");
		document.body.appendChild(host);
		const book = ePub(fixtureUrl("alice.epub"));
		fixtures.push({ book, host });

		await book.ready;
		book.package.metadata.direction = "rtl";
		const rendition = book.renderTo(host, {
			width: 393,
			height: 600,
			spread: "none",
			flow: "paginated",
			resizeSettleTrace: true
		});
		await rendition.display(3);
		await nextFrames();

		const manager = rendition.manager;
		const target = findPreciseTarget(manager.views.first());
		rendition.debugResizeSettleTrace({ clear: true });
		await rendition.display(target.cfi);
		await nextFrames(4);

		const displayTrace = rendition.debugResizeSettleTrace();
		const displayStart = displayTrace.find((entry) => entry.event === "display:start");
		const settledTarget = manager.target ?? null;
		const settledLocation = rendition.currentLocation();

		expect(displayStart).toMatchObject({
			detail: {
				target: target.cfi
			}
		});
		expect(settledTarget).toBeNull();
		expect(settledLocation.start.cfi).toBeTruthy();

		rendition.debugResizeSettleTrace({ clear: true });
		const displayed = waitForDisplayed(rendition);
		rendition.resize(802, 345);
		await displayed;
		await nextFrames(4);

		const resizeCapture = rendition.debugResizeSettleTrace()
			.find((entry) => entry.event === "resize:capture");
		expect(resizeCapture).toMatchObject({
			detail: {
				input: {
					epubcfi: null,
					managerTarget: null
				}
			}
		});
	});

	it("characterizes a center-point visible fragment as an explicit resize target", async () => {
		const host = document.createElement("div");
		document.body.appendChild(host);
		const book = ePub(fixtureUrl("alice.epub"));
		fixtures.push({ book, host });

		await book.ready;
		book.package.metadata.direction = "rtl";
		const rendition = book.renderTo(host, {
			width: 393,
			height: 600,
			spread: "none",
			flow: "paginated",
			resizeSettleTrace: true
		});
		await rendition.display(3);
		await nextFrames();

		const manager = rendition.manager;
		manager.scrollToLogicalPage(3);
		await nextFrames(4);
		const view = manager.views.first();
		const maxPhysicalStart = Math.max(
			0,
			manager.container.scrollWidth - manager.container.clientWidth
		);
		const physicalStart = maxPhysicalStart + manager.container.scrollLeft;
		const viewportEnd = physicalStart + manager.container.clientWidth;
		const center = physicalStart + (manager.container.clientWidth / 2);
		const centerMapping = manager.mapping.page(
			view.contents,
			view.section.cfiBase,
			center - 1,
			center + 1
		);
		const position = view.contents.document.caretPositionFromPoint(
			center,
			manager.container.clientHeight / 2
		);
		const range = view.contents.document.createRange();
		range.setStart(position.offsetNode, position.offset);
		range.collapse(true);
		const pointCfi = view.contents.cfiFromRange(range);
		const portrait = snapshot(rendition, pointCfi);

		expect(portrait.target.left).toBeGreaterThanOrEqual(physicalStart);
		expect(portrait.target.left).toBeLessThan(viewportEnd);
		expect(portrait.ownsTargetPage).toBe(true);

		const automaticResizeDisplayed = waitForDisplayed(rendition);
		rendition.resize(802, 345);
		await automaticResizeDisplayed;
		await nextFrames(4);
		rendition.debugResizeSettleTrace({ clear: true });

		const explicitHandoffDisplayed = waitForDisplayed(rendition);
		rendition.resize(802, 345, pointCfi);
		await explicitHandoffDisplayed;
		await nextFrames(4);
		const landscape = snapshot(rendition, pointCfi);
		const resizeTrace = rendition.debugResizeSettleTrace();

		console.info("visible-fragment-resize-ownership", JSON.stringify({
			pointCfi,
			mappedCenterCfi: centerMapping.start,
			physicalStart,
			viewportEnd,
			portrait,
			landscape,
			resizeTrace
		}));
		expect(resizeTrace.find((entry) => entry.event === "resize:location-handoff")).toMatchObject({
			detail: {
				epubcfi: pointCfi
			}
		});
		expect(resizeTrace.find((entry) => entry.event === "rendition:resize-resolved")).toMatchObject({
			detail: {
				inputCfi: pointCfi,
				resolvedCfi: pointCfi
			}
		});
		expect(landscape.ownsTargetPage).toBe(true);
		expect(landscape.range.startOffset).toBe(portrait.range.startOffset);
	});

});
