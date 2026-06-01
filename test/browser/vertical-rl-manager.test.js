import { describe, expect, it } from "vitest";
import Contents from "../../src/contents";
import DefaultViewManager from "../../src/managers/default";
import IframeView from "../../src/managers/views/iframe";
import Rendition from "../../src/rendition";
import { replaceLinks } from "../../src/utils/replacements";

const assert = {
	deepEqual(actual, expected, message) {
		expect(actual, message).toEqual(expected);
	},
	equal(actual, expected, message) {
		expect(actual == expected, message).toBe(true);
	},
	notEqual(actual, expected, message) {
		expect(actual != expected, message).toBe(true);
	},
	ok(actual, message) {
		expect(actual, message).toBeTruthy();
	}
};

describe("Vertical RL manager pagination", function() {
	function createHorizontalManager({ contentWidth, iframeWidth, scrollLeft = 0, nextSection = null }) {
		let manager = Object.create(DefaultViewManager.prototype);
		let container = {
			clientWidth: 1062,
			offsetWidth: 1062,
			scrollWidth: iframeWidth,
			scrollLeft
		};
		let view = {
			_contentWidth: contentWidth,
			width: function() {
				return iframeWidth;
			},
			section: {
				next: function() {
					return nextSection;
				},
				prev: function() {
					return null;
				}
			},
			contents: {
				writingMode: function() {
					return "horizontal-tb";
				}
			}
		};

		manager.container = container;
		manager.isPaginated = true;
		manager.settings = {
			axis: "horizontal",
			direction: "ltr"
		};
		manager.layout = {
			name: "reflowable",
			pageWidth: 1062,
			width: 1062,
			effectivePageAdvance: 1062,
			delta: 1062,
			count: function(totalLength, pageLength) {
				let pages = Math.max(1, Math.ceil(totalLength / pageLength));
				return { pages, spreads: pages };
			}
		};
		manager.views = {
			length: 1,
			first: function() {
				return view;
			},
			last: function() {
				return view;
			},
			show: function() {}
		};
		manager.scrollTo = function(left) {
			container.scrollLeft = left;
		};
		manager.scrollBy = function() {
			throw new Error("scrollBy should not be used for horizontal paginated navigation");
		};

		return manager;
	}

	it("does not count force-even blank spread pages as navigable horizontal content", function() {
		let manager = createHorizontalManager({
			contentWidth: 1062,
			iframeWidth: 2124
		});

		assert.equal(manager.getTotalPagesForCurrentView(), 1);
		assert.equal(manager.getCurrentPageIndex(), 0);
	});

	it("counts viewport-filling single media pages as one navigable page", function() {
		let manager = createHorizontalManager({
			contentWidth: 1296,
			iframeWidth: 1296
		});
		let view = manager.views.first();
		view._viewportFillingSingleMediaPage = true;
		manager.layout.pageWidth = 1295.9942626953125;
		manager.layout.effectivePageAdvance = 1295.9942626953125;
		manager.layout.delta = 1295.9942626953125;

		assert.equal(manager.getTotalPagesForCurrentView(), 1);
		assert.equal(manager.getCurrentPageIndex(), 0);
	});

	it("does not add a phantom page for fractional page advance on snapped content width", function() {
		let manager = createHorizontalManager({
			contentWidth: 2592,
			iframeWidth: 2592
		});
		manager.layout.pageWidth = 1295.9942626953125;
		manager.layout.effectivePageAdvance = 1295.9942626953125;
		manager.layout.delta = 1295.9942626953125;

		assert.equal(manager.getTotalPagesForCurrentView(), 2);
	});

	it("does not add a phantom page for content width snapped before a vertical-rl text boundary", function() {
		let manager = createHorizontalManager({
			contentWidth: 2574,
			iframeWidth: 2574
		});
		manager.settings.direction = "rtl";
		manager.settings.rtlScrollType = "negative";
		manager.settings.writingMode = "vertical-rl";
		manager.isRtlVerticalPaginated = function() {
			return true;
		};
		manager.layout.pageWidth = 1296;
		manager.layout.width = 1296;
		manager.layout.effectivePageAdvance = 1296;
		manager.layout.delta = 1296;

		assert.equal(manager.getTotalPagesForCurrentView(), 2);
	});

	it("rounds near-snapped horizontal scroll offsets to the intended page index", function() {
		let manager = createHorizontalManager({
			contentWidth: 3186,
			iframeWidth: 3186,
			scrollLeft: 1060.9
		});

		assert.equal(manager.getTotalPagesForCurrentView(), 3);
		assert.equal(manager.getCurrentPageIndex(), 1);
	});

	it("moves to the next spine item instead of scrolling into a force-even blank page", async function() {
		let appended = false;
		let manager = createHorizontalManager({
			contentWidth: 1062,
			iframeWidth: 2124,
			nextSection: {
				properties: []
			}
		});

		manager.clear = function() {};
		manager.updateLayout = function() {};
		manager.append = function() {
			appended = true;
			return Promise.resolve();
		};
		manager.handleNextPrePaginated = function() {
			return Promise.resolve();
		};

		await manager.next();

		assert.equal(manager.container.scrollLeft, 0);
		assert.equal(appended, true);
	});

	it("moves to the next spine item from a viewport-filling single media page", async function() {
		let appended = false;
		let manager = createHorizontalManager({
			contentWidth: 1296,
			iframeWidth: 1296,
			nextSection: {
				properties: []
			}
		});
		let view = manager.views.first();
		view._viewportFillingSingleMediaPage = true;
		manager.layout.pageWidth = 1295.9942626953125;
		manager.layout.effectivePageAdvance = 1295.9942626953125;
		manager.layout.delta = 1295.9942626953125;
		manager.clear = function() {};
		manager.updateLayout = function() {};
		manager.append = function() {
			appended = true;
			return Promise.resolve();
		};
		manager.handleNextPrePaginated = function() {
			return Promise.resolve();
		};

		await manager.next();

		assert.equal(manager.container.scrollLeft, 0);
		assert.equal(appended, true);
	});

	it("treats sub-pixel vertical scroll bottom offsets as the end of the section", async function() {
		let appended = false;
		let scrolled = false;
		let manager = Object.create(DefaultViewManager.prototype);
		let nextSection = { properties: [] };

		manager.container = {
			scrollTop: 99.6,
			offsetHeight: 100,
			clientHeight: 100,
			scrollHeight: 200
		};
		manager.isPaginated = true;
		manager.settings = {
			axis: "vertical",
			direction: "ltr"
		};
		manager.layout = {
			height: 100,
			name: "reflowable"
		};
		manager.views = {
			length: 1,
			last: function() {
				return {
					section: {
						next: function() {
							return nextSection;
						}
					}
				};
			},
			show: function() {}
		};
		manager.clear = function() {};
		manager.updateLayout = function() {};
		manager.handleNextPrePaginated = function() {
			return Promise.resolve();
		};
		manager.append = function(section) {
			appended = section === nextSection;
			return Promise.resolve();
		};
		manager.scrollBy = function() {
			scrolled = true;
		};

		await manager.next();

		assert.equal(scrolled, false);
		assert.equal(appended, true);
	});

	it("keeps the initial display target available for resize before first location", function() {
		let manager = Object.create(DefaultViewManager.prototype);
		let emittedCfi;

		manager.target = "chapter.xhtml#frag";
		manager.stage = {
			size: function() {
				return {
					width: 320,
					height: 480
				};
			}
		};
		manager._stageSize = {
			width: 300,
			height: 480
		};
		manager.viewSettings = {};
		manager.bounds = function() {
			return {};
		};
		manager.clear = function() {};
		manager.updateLayout = function() {};
		manager.emit = function(eventName, size, epubcfi) {
			emittedCfi = epubcfi;
		};

		manager.resize();

		assert.equal(emittedCfi, "chapter.xhtml#frag");
	});

	it("redisplays resize target even before rendition has a current location", function() {
		let rendition = Object.create(Rendition.prototype);
		let displayedTarget;

		rendition.emit = function() {};
		rendition.display = function(target) {
			displayedTarget = target;
		};

		rendition.onResized({
			width: 320,
			height: 480
		}, "chapter.xhtml#frag");

		assert.equal(displayedTarget, "chapter.xhtml#frag");
	});

	function createManagerAtLogicalOffset(logicalOffset) {
		let manager = Object.create(DefaultViewManager.prototype);
		let container = {
			clientWidth: 300,
			scrollWidth: 745,
			scrollLeft: -logicalOffset
		};

		manager.container = container;
		manager.isPaginated = true;
		manager.settings = {
			axis: "horizontal",
			direction: "rtl",
			rtlScrollType: "negative",
			writingMode: "vertical-rl"
		};
		manager.layout = {
			effectivePageAdvance: 240,
			delta: 240,
			pageWidth: 300,
			width: 300,
			edgeGuardPx: 4,
			pageBoundaryShift: 20
		};
		manager.views = {
			first: function() {
				return {
					width: function() {
						return 780;
					},
					contents: {
						writingMode: function() {
							return "vertical-rl";
						}
					}
				};
			},
			last: function() {
				return this.first();
			}
		};
		manager.scrollTo = function(left) {
			container.scrollLeft = left;
		};

		return manager;
	}

	it("treats a max-scroll-clamped offset as the last visual page", function() {
		let manager = createManagerAtLogicalOffset(445);

		assert.equal(manager.getTotalPagesForCurrentView(), 3);
		assert.equal(manager.getCurrentPageIndex(), 2);
	});

	it("clamps scrollToLogicalPage to max scroll without losing the last page index", function() {
		let manager = createManagerAtLogicalOffset(0);

		manager.scrollToLogicalPage(2);

		assert.equal(manager.container.scrollLeft, -445);
		assert.equal(manager.getCurrentPageIndex(), 2);
	});

	it("keeps the first vertical-rl page at the chapter start", function() {
		let manager = createManagerAtLogicalOffset(0);

		manager.scrollToLogicalPage(0);

		assert.equal(manager.container.scrollLeft, 0);
		assert.equal(manager.getCurrentPageIndex(), 0);
	});

	it("keeps same-document hash links scoped to the current section href", function() {
		let content = document.createElement("div");
		let link = document.createElement("a");
		let clickedHref;

		link.setAttribute("href", "#footnote-1");
		content.appendChild(link);

		replaceLinks(content, function(href) {
			clickedHref = href;
		}, "OEBPS/Text/Section0005.xhtml");

		link.onclick();

		assert.equal(clickedHref, "OEBPS/Text/Section0005.xhtml#footnote-1");
	});

	it("keeps spine-relative hash targets from being normalized twice", function() {
		let rendition = Object.create(Rendition.prototype);

		rendition.book = {
			path: {
				relative: function(href) {
					return "relative:" + href;
				}
			}
		};

		assert.equal(
			rendition.resolveLinkHref("OEBPS/Text/Section0005.xhtml#footnote-1"),
			"OEBPS/Text/Section0005.xhtml#footnote-1"
		);
		assert.equal(
			rendition.resolveLinkHref("#footnote-1", { sectionHref: "OEBPS/Text/Section0005.xhtml" }),
			"OEBPS/Text/Section0005.xhtml#footnote-1"
		);
		assert.equal(
			rendition.resolveLinkHref("/epub-reader/manifest/book/OEBPS/Text/Section0005.xhtml#footnote-1"),
			"relative:/epub-reader/manifest/book/OEBPS/Text/Section0005.xhtml#footnote-1"
		);
	});

	it("falls back to a measurable element for empty hash targets", function() {
		let contents = Object.create(Contents.prototype);
		let body = document.createElement("div");
		let anchor = document.createElement("a");
		let parent = document.createElement("aside");

		anchor.id = "footnote-1";
		parent.appendChild(anchor);
		body.appendChild(parent);

		anchor.getBoundingClientRect = function() {
			return {
				left: 0,
				top: 0,
				width: 0,
				height: 0
			};
		};
		parent.getBoundingClientRect = function() {
			return {
				left: 240,
				top: 12,
				width: 80,
				height: 24
			};
		};

		contents.document = {
			body: body,
			getElementById: function(id) {
				return id === "footnote-1" ? anchor : null;
			}
		};
		contents.epubcfi = {
			isCfiString: function() {
				return false;
			}
		};

		let offset = contents.locationOf("OEBPS/Text/Section0005.xhtml#footnote-1");

		assert.equal(offset.left, 240);
		assert.equal(offset.top, 12);
	});

	it("pulls interior vertical-rl pages back from a detected right edge boundary", function() {
		let manager = createManagerAtLogicalOffset(0);

		manager.scrollToLogicalPage(1);

		assert.equal(manager.container.scrollLeft, -220);
		assert.equal(manager.getCurrentPageIndex(), 1);
	});

	it("can ignore a cached vertical-rl page offset when annotation jumps need boundary snapping", function() {
		let manager = Object.create(DefaultViewManager.prototype);
		let pageAdvance = 1295.9942626953125;
		let contentWidth = 15532;
		let targetPage = 2;
		let cachedOffset = 2591.818115234375;
		let snappedOffset = 2565.45458984375;
		let snapCalls = 0;
		let view = {
			width: function() {
				return contentWidth;
			},
			contents: {
				writingMode: function() {
					return "vertical-rl";
				}
			}
		};

		manager.container = {
			clientWidth: 1296,
			scrollWidth: contentWidth,
			scrollLeft: 0,
			scrollTop: 0
		};
		manager.layout = {
			effectivePageAdvance: pageAdvance,
			delta: pageAdvance,
			pageWidth: pageAdvance,
			width: pageAdvance,
			pageBoundaryShift: 0,
			edgeGuardPx: 0
		};
		manager.settings = {
			axis: "horizontal",
			direction: "rtl",
			rtlScrollType: "negative",
			writingMode: "vertical-rl"
		};
		manager.isPaginated = true;
		manager.views = {
			first: function() {
				return view;
			},
			last: function() {
				return view;
			}
		};
		manager.syncVerticalRlViewportClip = function() {};
		manager.queueVerticalRlBoundarySnapRetry = function() {};
		manager.snapVerticalRlLogicalOffsetToTextBoundary = function(logicalOffset) {
			snapCalls += 1;
			assert.equal(Math.round(logicalOffset), Math.round(targetPage * pageAdvance));
			return snappedOffset;
		};
		manager.scrollTo = function(left) {
			this.container.scrollLeft = left;
		};

		let totalPages = manager.getTotalPagesForCurrentView();
		let maxScroll = manager.getMaxLogicalScrollLeft();
		let cacheKey = manager.getVerticalRlLogicalPageOffsetCacheKey(totalPages, maxScroll);
		manager.cacheVerticalRlLogicalPageOffset(targetPage, cachedOffset, cacheKey);

		manager.scrollToLogicalPage(targetPage);

		assert.equal(manager.container.scrollLeft, -cachedOffset);
		assert.equal(snapCalls, 0);

		manager.scrollToLogicalPage(targetPage, { ignoreCachedLogicalOffset: true });

		assert.equal(manager.container.scrollLeft, -snappedOffset);
		assert.equal(snapCalls, 1);
	});

	it("moves to the vertical-rl logical page that contains an anchor target", function() {
		let manager = createManagerAtLogicalOffset(0);

		manager.moveTo({
			left: 610,
			top: 0
		}, 780);

		assert.equal(manager.getCurrentPageIndex(), 0);

		manager.moveTo({
			left: 300,
			top: 0
		}, 780);

		assert.equal(manager.getCurrentPageIndex(), 1);

		manager.moveTo({
			left: 20,
			top: 0
		}, 780);

		assert.equal(manager.getCurrentPageIndex(), 2);
	});

	it("prefers the strict vertical-rl page that contains a hash anchor before snap tolerance", function() {
		let manager = createManagerAtLogicalOffset(0);

		assert.equal(manager.getVerticalRlPageIndexForOffset({
			left: 455,
			top: 0
		}, 780), 1);
	});

	it("uses the scrollable width when vertical-rl anchor offsets exceed the view width", function() {
		let manager = createManagerAtLogicalOffset(0);

		manager.container.clientWidth = 1062;
		manager.container.scrollWidth = 19854;
		manager.layout.effectivePageAdvance = 1044;
		manager.layout.delta = 1044;
		manager.layout.pageWidth = 1062;
		manager.layout.width = 1062;
		manager.layout.pageBoundaryShift = 15;
		manager.views.first = function() {
			return {
				width: function() {
					return 19053;
				},
				contents: {
					writingMode: function() {
						return "vertical-rl";
					}
				}
			};
		};

		manager.moveTo({
			left: 18487,
			top: 0
		}, 19053);

		assert.equal(manager.getCurrentPageIndex(), 1);
	});

	it("uses the actual logical page step when a boundary shift changes the next offset", function() {
		let manager = createManagerAtLogicalOffset(0);

		assert.equal(manager.getLogicalPageStepToNextPage(), 220);

		manager.scrollToLogicalPage(1);

		assert.equal(manager.getLogicalPageStepToNextPage(), 225);
	});

	it("preserves half of the structural vertical-rl glyph guard when text snapping moves forward", function() {
		let manager = Object.create(DefaultViewManager.prototype);
		let textNode = {
			nodeValue: "把半杯剁碎的大葱與半杯紫蘇葉放入一個大碗中。",
			parentElement: {}
		};
		let yielded = false;

		manager.container = {
			clientWidth: 1320,
			scrollWidth: 18144,
			scrollLeft: -9060
		};
		manager.layout = {
			effectivePageAdvance: 1296,
			delta: 1296,
			pageWidth: 1320,
			width: 1320,
			pageBoundaryShift: 12,
			edgeGuardPx: 12,
			count: function(totalLength, pageLength) {
				let pages = Math.max(1, Math.ceil(totalLength / pageLength));
				return { pages, spreads: pages };
			}
		};
		manager.settings = {
			axis: "horizontal",
			direction: "rtl",
			rtlScrollType: "negative",
			writingMode: "vertical-rl"
		};
		manager.isPaginated = true;
		manager.views = {
			first: function() {
				return {
					width: function() {
						return 18144;
					},
					iframe: {
						getBoundingClientRect: function() {
							return {
								left: 0
							};
						}
					},
					contents: {
						writingMode: function() {
							return "vertical-rl";
						},
						window: {
							getComputedStyle: function() {
								return {
									display: "block",
									visibility: "visible"
								};
							}
						},
						document: {
							body: {},
							createTreeWalker: function() {
								return {
									nextNode: function() {
										if (yielded) {
											return null;
										}
										yielded = true;
										return textNode;
									}
								};
							},
							createRange: function() {
								return {
									selectNodeContents: function() {},
									getClientRects: function() {
										return [{
											left: 7763,
											right: 7780,
											width: 17,
											height: 680
										}];
									},
									detach: function() {}
								};
							}
						}
					}
				};
			},
			last: function() {
				return this.first();
			}
		};

		let baseLogicalOffset = manager.getLogicalOffsetForPageIndex(7, 14, 16824);
		let logicalOffset = manager.snapVerticalRlLogicalOffsetToTextBoundary(baseLogicalOffset, 16824);

		assert.equal(baseLogicalOffset, 9060);
		assert.equal(logicalOffset, 9066);
	});

	it("snaps vertical-rl logical offsets out of right boundary text boxes", function() {
		let manager = Object.create(DefaultViewManager.prototype);
		let textNode = {
			nodeValue: "把麵糊舀在水果上面，放入烤箱中，以三百度烤大約三十分鐘。",
			parentElement: {}
		};
		let yielded = false;

		manager.container = {
			clientWidth: 1320,
			scrollWidth: 18168,
			scrollLeft: -7758.1818
		};
		manager.layout = {
			effectivePageAdvance: 1296,
			delta: 1296,
			pageWidth: 1320,
			width: 1320,
			pageBoundaryShift: 18,
			edgeGuardPx: 4,
			count: function(totalLength, pageLength) {
				let pages = Math.max(1, Math.ceil(totalLength / pageLength));
				return { pages, spreads: pages };
			}
		};
		manager.settings = {
			axis: "horizontal",
			direction: "rtl",
			rtlScrollType: "negative",
			writingMode: "vertical-rl"
		};
		manager.isPaginated = true;
		manager.views = {
			first: function() {
				return {
					width: function() {
						return 18168;
					},
					iframe: {
						getBoundingClientRect: function() {
							return {
								left: 0
							};
						}
					},
					contents: {
						writingMode: function() {
							return "vertical-rl";
						},
						window: {
							getComputedStyle: function() {
								return {
									display: "block",
									visibility: "visible"
								};
							}
						},
						document: {
							body: {},
							createTreeWalker: function() {
								return {
									nextNode: function() {
										if (yielded) {
											return null;
										}
										yielded = true;
										return textNode;
									}
								};
							},
							createRange: function() {
								return {
									selectNodeContents: function() {},
									getClientRects: function() {
										return [{
											left: 10399.3174,
											right: 10422.0447,
											width: 22.7273,
											height: 680
										}];
									},
									detach: function() {}
								};
							}
						}
					}
				};
			},
			last: function() {
				return this.first();
			}
		};

		let baseLogicalOffset = manager.getLogicalOffsetForPageIndex(6, 14, 16848);
		let logicalOffset = manager.snapVerticalRlLogicalOffsetToTextBoundary(baseLogicalOffset, 16848);
		let rawRight = 18168 - logicalOffset;

		assert.ok(logicalOffset > baseLogicalOffset);
		assert.ok(rawRight <= 10399.3174 - 4);
	});

	it("snaps vertical-rl page boundaries out of overlapping line box clusters", function() {
		let manager = Object.create(DefaultViewManager.prototype);
		let textNodes = [
			{
				nodeValue: "把兩顆蛋和四分之一茶匙的鹽加入一杯水和一又四分之一杯麵粉中。",
				parentElement: {}
			},
			{
				nodeValue: "譯註：一種可透過更換刀具而將食物切片、剁碎、打漿或研磨的器具。",
				parentElement: {}
			},
			{
				nodeValue: "把鼠尾草浸入麵糊中，然後把麵糊連鼠尾草一起倒至熱油中。",
				parentElement: {}
			}
		];
		let rectsByText = new Map([
			[textNodes[0], { left: 6609.9287, right: 6632.6563, width: 22.7276, height: 680 }],
			[textNodes[1], { left: 6592.6277, right: 6615.3550, width: 22.7273, height: 680 }],
			[textNodes[2], { left: 5290.1274, right: 5312.8550, width: 22.7276, height: 680 }]
		]);
		let index = 0;
		let currentNode = null;

		manager.container = {
			clientWidth: 1320,
			scrollWidth: 18480,
			scrollLeft: -11861.8184
		};
		manager.layout = {
			effectivePageAdvance: 1320,
			delta: 1320,
			pageWidth: 1320,
			width: 1320,
			pageBoundaryShift: 0,
			edgeGuardPx: 0,
			count: function(totalLength, pageLength) {
				let pages = Math.max(1, Math.ceil(totalLength / pageLength));
				return { pages, spreads: pages };
			}
		};
		manager.settings = {
			axis: "horizontal",
			direction: "rtl",
			rtlScrollType: "negative",
			writingMode: "vertical-rl"
		};
		manager.isPaginated = true;
		manager.views = {
			first: function() {
				return {
					width: function() {
						return 18480;
					},
					iframe: {
						getBoundingClientRect: function() {
							return { left: 0 };
						}
					},
					contents: {
						writingMode: function() {
							return "vertical-rl";
						},
						window: {
							getComputedStyle: function() {
								return {
									display: "block",
									visibility: "visible"
								};
							}
						},
						document: {
							body: {},
							createTreeWalker: function() {
								index = 0;
								return {
									nextNode: function() {
										currentNode = textNodes[index] || null;
										index += 1;
										return currentNode;
									}
								};
							},
							createRange: function() {
								return {
									selectNodeContents: function(node) {
										currentNode = node;
									},
									getClientRects: function() {
										return [rectsByText.get(currentNode)];
									},
									detach: function() {}
								};
							}
						}
					}
				};
			},
			last: function() {
				return this.first();
			}
		};

		let baseLogicalOffset = 11861.8184;
		let logicalOffset = manager.snapVerticalRlLogicalOffsetToTextBoundary(baseLogicalOffset, 17160);
		let rawRight = 18480 - logicalOffset;
		let rawLeft = rawRight - 1320;

		assert.ok(logicalOffset < baseLogicalOffset);
		assert.ok(rawRight >= 6632.6563 + 1);
		assert.ok(rawLeft >= 5312.8550 + 1);
	});

	it("uses the visual content width when vertical-rl text rects are reported in viewport coordinates", function() {
		let manager = Object.create(DefaultViewManager.prototype);
		let textNode = {
			nodeValue: "我第一次做摺合式的饀餅，是從寶拉．沃爾霍特的書上學來的。",
			parentElement: {}
		};
		let yielded = false;

		manager.container = {
			clientWidth: 1296,
			scrollWidth: 16848,
			scrollLeft: -2592
		};
		manager.layout = {
			effectivePageAdvance: 1296,
			delta: 1296,
			pageWidth: 1296,
			width: 1296,
			pageBoundaryShift: 0,
			edgeGuardPx: 0
		};
		manager.settings = {
			axis: "horizontal",
			direction: "rtl",
			rtlScrollType: "negative",
			writingMode: "vertical-rl"
		};
		manager.isPaginated = true;
		manager.views = {
			first: function() {
				return {
					_contentWidth: 16743,
					width: function() {
						return 16848;
					},
					iframe: {
						getBoundingClientRect: function() {
							return {
								left: -12808
							};
						}
					},
					contents: {
						writingMode: function() {
							return "vertical-rl";
						},
						window: {
							getComputedStyle: function() {
								return {
									display: "block",
									visibility: "visible"
								};
							}
						},
						document: {
							body: {
								scrollWidth: 16743
							},
							createTreeWalker: function() {
								yielded = false;
								return {
									nextNode: function() {
										if (yielded) {
											return null;
										}
										yielded = true;
										return textNode;
									}
								};
							},
							createRange: function() {
								return {
									selectNodeContents: function() {},
									getClientRects: function() {
										return [{
											left: 1431.71875,
											right: 1453.71875,
											width: 22,
											height: 808
										}];
									},
									detach: function() {}
								};
							}
						}
					}
				};
			},
			last: function() {
				return this.first();
			}
		};

		let baseLogicalOffset = 2592;
		let logicalOffset = manager.snapVerticalRlLogicalOffsetToTextBoundary(baseLogicalOffset, 15552);
		let rawRight = 16848 - logicalOffset;

		assert.equal(manager.getVerticalRlVisualContentWidth(manager.views.first()), 16848);
		assert.notEqual(logicalOffset, baseLogicalOffset);
		assert.ok(rawRight >= 14261.71875 + 1 || rawRight <= 14239.71875 - 1);
	});

	it("snaps vertical-rl text boundaries using left-origin viewport coordinates", function() {
		let manager = Object.create(DefaultViewManager.prototype);
		let textNodes = [{
			nodeValue: "滴少許橄欖油在雞塊上面。蓋上蓋子，以三百度烤大約四十五分鐘。",
			parentElement: {}
		}, {
			nodeValue: "•",
			parentElement: {}
		}];
		let index = 0;
		let currentNode = null;

		manager.container = {
			clientWidth: 1296,
			scrollWidth: 16848,
			scrollLeft: -10368
		};
		manager.layout = {
			effectivePageAdvance: 1296,
			delta: 1296,
			pageWidth: 1296,
			width: 1296,
			pageBoundaryShift: 0,
			edgeGuardPx: 0
		};
		manager.settings = {
			axis: "horizontal",
			direction: "rtl",
			rtlScrollType: "negative",
			writingMode: "vertical-rl"
		};
		manager.isPaginated = true;
		manager.views = {
			first: function() {
				return {
					_contentWidth: 16746,
					width: function() {
						return 16848;
					},
					iframe: {
						getBoundingClientRect: function() {
							return {
								left: -10368
							};
						}
					},
					contents: {
						writingMode: function() {
							return "vertical-rl";
						},
						window: {
							getComputedStyle: function() {
								return {
									display: "block",
									visibility: "visible"
								};
							}
						},
						document: {
							body: {
								scrollWidth: 16746
							},
							createTreeWalker: function() {
								index = 0;
								return {
									nextNode: function() {
										currentNode = textNodes[index] || null;
										index += 1;
										return currentNode;
									}
								};
							},
							createRange: function() {
								return {
									selectNodeContents: function(node) {
										currentNode = node;
									},
									getClientRects: function() {
										return [{
											left: 11643.03125,
											right: 11665.03125,
											width: 22,
											height: 808
										}];
									},
									detach: function() {}
								};
							}
						}
					}
				};
			},
			last: function() {
				return this.first();
			}
		};

		let snapped = manager.snapVerticalRlLogicalOffsetToTextBoundary(10368, 15552);

		assert.ok(snapped > 10368);
		assert.ok(snapped + 1296 >= 11665.03125 + 1);
	});

	it("prefers right-origin boundary snapping when left-origin decoys also cross", function() {
		let manager = Object.create(DefaultViewManager.prototype);
		let textNodes = [{
			nodeValue: "那是一個午後，一場雷暴雨剛走，天光轉為耀眼的金黃色。",
			parentElement: {}
		}, {
			nodeValue: "我從一本本的歷史書得知，圖倫所在的這個區是分水嶺。",
			parentElement: {}
		}, {
			nodeValue: "三位波蘭工人寄住在當地一家教堂後頭的房間。",
			parentElement: {}
		}, {
			nodeValue: "史達尼斯洛奧四十歲。在他們為我們工作的幾星期裡。",
			parentElement: {}
		}];
		let rectsByText = new Map([
			[textNodes[0], { left: 14221.548, right: 14244.275, width: 22.727, height: 740 }],
			[textNodes[1], { left: 15509.36, right: 15532.088, width: 22.728, height: 692 }],
			[textNodes[2], { left: 6459.531, right: 6482.258, width: 22.727, height: 740 }],
			[textNodes[3], { left: 6459.531, right: 6482.258, width: 22.727, height: 740 }]
		]);
		let index = 0;
		let currentNode = null;
		let pageWidth = 1295.9942626953125;
		let contentWidth = 20717;
		let baseLogicalOffset = pageWidth * 4;

		manager.container = {
			clientWidth: 1296,
			scrollWidth: contentWidth,
			scrollLeft: -baseLogicalOffset
		};
		manager.layout = {
			effectivePageAdvance: pageWidth,
			delta: pageWidth,
			pageWidth,
			width: 1296,
			pageBoundaryShift: 0,
			edgeGuardPx: 0
		};
		manager.settings = {
			axis: "horizontal",
			direction: "rtl",
			rtlScrollType: "negative",
			writingMode: "vertical-rl"
		};
		manager.isPaginated = true;
		manager.views = {
			first: function() {
				return {
					width: function() {
						return contentWidth;
					},
					iframe: {
						getBoundingClientRect: function() {
							return {
								left: 0
							};
						}
					},
					contents: {
						writingMode: function() {
							return "vertical-rl";
						},
						window: {
							getComputedStyle: function() {
								return {
									display: "block",
									visibility: "visible"
								};
							}
						},
						document: {
							body: {
								scrollWidth: 19738
							},
							createTreeWalker: function() {
								index = 0;
								return {
									nextNode: function() {
										currentNode = textNodes[index] || null;
										index += 1;
										return currentNode;
									}
								};
							},
							createRange: function() {
								return {
									selectNodeContents: function(node) {
										currentNode = node;
									},
									getClientRects: function() {
										return [rectsByText.get(currentNode)];
									},
									detach: function() {}
								};
							}
						}
					}
				};
			},
			last: function() {
				return this.first();
			}
		};

		let snapped = manager.snapVerticalRlLogicalOffsetToTextBoundary(baseLogicalOffset, 19421);
		let rawRight = contentWidth - snapped;
		let rawLeft = rawRight - pageWidth;
		let actualRightOriginCrossings = [textNodes[0], textNodes[1]]
			.map((node) => rectsByText.get(node))
			.filter((rect) => (
				(rect.left < rawLeft && rect.right > rawLeft) ||
				(rect.left < rawRight && rect.right > rawRight)
			));

		assert.ok(snapped < baseLogicalOffset);
		assert.equal(actualRightOriginCrossings.length, 0);
	});

	it("keeps a sequential next page from re-showing the previous page left edge", function() {
		let manager = Object.create(DefaultViewManager.prototype);
		let textNodes = [{
			nodeValue: "他是位老人，外套披在肩上，步伐很慢，一副若有所思的樣子。",
			parentElement: {}
		}, {
			nodeValue: "我家會有一個神龕這件事情，讓我覺得不可思議。",
			parentElement: {}
		}, {
			nodeValue: "從我現在的位置，我看不見也聽不著山谷下方農場裡的噪動。",
			parentElement: {}
		}];
		let rectsByText = new Map([
			[textNodes[0], { left: 19416.36328125, right: 19439.08984375, width: 22.7265625, height: 740 }],
			[textNodes[1], { left: 18104.984375, right: 18127.712890625, width: 22.728515625, height: 740 }],
			[textNodes[2], { left: 18160.978515625, right: 18183.70703125, width: 22.728515625, height: 740 }]
		]);
		let index = 0;
		let currentNode = null;
		let pageWidth = 1295.9942626953125;
		let contentWidth = 20717;
		let baseLogicalOffset = pageWidth;
		let previousPageLeftBoundary = 19413.727272987366;

		manager.container = {
			clientWidth: 1296,
			scrollWidth: contentWidth,
			scrollLeft: -baseLogicalOffset
		};
		manager.layout = {
			effectivePageAdvance: pageWidth,
			delta: pageWidth,
			pageWidth,
			width: 1296,
			pageBoundaryShift: 0,
			edgeGuardPx: 0
		};
		manager.settings = {
			axis: "horizontal",
			direction: "rtl",
			rtlScrollType: "negative",
			writingMode: "vertical-rl"
		};
		manager.isPaginated = true;
		manager.views = {
			first: function() {
				return {
					width: function() {
						return contentWidth;
					},
					iframe: {
						getBoundingClientRect: function() {
							return {
								left: 0
							};
						}
					},
					contents: {
						writingMode: function() {
							return "vertical-rl";
						},
						window: {
							getComputedStyle: function() {
								return {
									display: "block",
									visibility: "visible"
								};
							}
						},
						document: {
							body: {
								scrollWidth: 19738
							},
							createTreeWalker: function() {
								index = 0;
								return {
									nextNode: function() {
										currentNode = textNodes[index] || null;
										index += 1;
										return currentNode;
									}
								};
							},
							createRange: function() {
								return {
									selectNodeContents: function(node) {
										currentNode = node;
									},
									getClientRects: function() {
										return [rectsByText.get(currentNode)];
									},
									detach: function() {}
								};
							}
						}
					}
				};
			},
			last: function() {
				return this.first();
			}
		};

		let snapped = manager.snapVerticalRlLogicalOffsetToTextBoundary(baseLogicalOffset, 19421, {
			maxRightBoundary: previousPageLeftBoundary
		});
		let rawRight = contentWidth - snapped;
		let rawLeft = rawRight - pageWidth;
		let duplicatedPreviousLine = rectsByText.get(textNodes[0]);
		let crossings = Array.from(rectsByText.values()).filter((rect) => (
			(rect.left < rawLeft && rect.right > rawLeft) ||
			(rect.left < rawRight && rect.right > rawRight)
		));

		assert.ok(rawRight <= previousPageLeftBoundary + 1);
		assert.ok(duplicatedPreviousLine.left >= rawRight);
		assert.equal(crossings.length, 0);
	});

	it("left-masks a sequential page edge that the next page must own", function() {
		let manager = Object.create(DefaultViewManager.prototype);
		let contentWidth = 20716.98828125;
		let pageWidth = 1295.9942626953125;
		let rawLeft = 18117.356521606445;
		let rawRight = rawLeft + pageWidth;
		let currentOffset = contentWidth - rawRight;
		let textNodes = [{
			nodeValue: "我家會有一個神龕這件事情，讓我覺得不可思議，但更不可思議的是，我竟會成為一場獻花禮的參與者之一。",
			parentElement: {}
		}, {
			nodeValue: "從我現在的位置，我看不見也聽不著山谷下方農場裡的噪動或喧囂。",
			parentElement: {}
		}];
		let rectsByText = new Map([
			[textNodes[0], { left: 18104.984375, right: 18127.712890625, top: 40, bottom: 740, width: 22.728515625, height: 700 }],
			[textNodes[1], { left: 18160.978515625, right: 18183.70703125, top: 0, bottom: 320, width: 22.728515625, height: 320 }]
		]);
		let currentNode = null;

		manager.container = {
			clientWidth: pageWidth,
			scrollWidth: contentWidth,
			scrollLeft: -currentOffset,
			getBoundingClientRect: function() {
				return {
					left: rawLeft,
					right: rawRight,
					width: pageWidth
				};
			}
		};
		manager.layout = {
			effectivePageAdvance: pageWidth,
			delta: pageWidth,
			pageWidth,
			width: pageWidth,
			edgeGuardPx: 4,
			pageBoundaryShift: 28
		};
		manager.settings = {
			axis: "horizontal",
			direction: "rtl",
			rtlScrollType: "negative",
			writingMode: "vertical-rl"
		};
		manager.isPaginated = true;
		manager.views = {
			first: function() {
				return {
					_contentWidth: contentWidth,
					width: function() {
						return contentWidth;
					},
					iframe: {
						getBoundingClientRect: function() {
							return {
								left: 0
							};
						}
					},
					contents: {
						writingMode: function() {
							return "vertical-rl";
						},
						window: {
							getComputedStyle: function() {
								return {
									display: "block",
									visibility: "visible"
								};
							}
						},
						document: {
							body: {},
							createTreeWalker: function() {
								let index = 0;
								return {
									nextNode: function() {
										currentNode = textNodes[index++] || null;
										return currentNode;
									}
								};
							},
							createRange: function() {
								return {
									selectNodeContents: function() {},
									getClientRects: function() {
										return [rectsByText.get(currentNode)];
									},
									detach: function() {}
								};
							}
						}
					}
				};
			},
			last: function() {
				return this.first();
			}
		};
		manager._verticalRlSequentialBoundaryConstraint = {
			pageIndex: 1,
			maxRightBoundary: rectsByText.get(textNodes[0]).right
		};
		manager.getCurrentPageIndex = function() {
			return 1;
		};
		manager.getTotalPagesForCurrentView = function() {
			return 16;
		};
		manager.getMaxLogicalScrollLeft = function() {
			return contentWidth - pageWidth;
		};
		manager.getLogicalOffsetForPageIndex = function(pageIndex) {
			return pageIndex === 1 ? currentOffset : currentOffset - pageWidth;
		};
		manager.getNormalizedLogicalScrollLeft = function() {
			return currentOffset;
		};

		let maskWidths = manager.getVerticalRlCleanPageEdgeMaskWidths(pageWidth);

		assert.ok(maskWidths.left >= 12, JSON.stringify(maskWidths));
		assert.equal(maskWidths.right, 0);
	});

	it("prefers the previous effective boundary when advancing from a masked clean page", function() {
		let manager = Object.create(DefaultViewManager.prototype);
		let contentWidth = 10343.991409301758;
		let pageWidth = 1295.9942626953125;
		let pageAdvance = 1320;
		let previousEffectiveLeft = 9058.997146606445;
		let expectedOffset = contentWidth - previousEffectiveLeft;
		let currentNode = null;

		manager.container = {
			clientWidth: pageWidth,
			scrollWidth: contentWidth,
			scrollLeft: 0,
			scrollTop: 0,
			getBoundingClientRect: function() {
				return {
					left: 0,
					right: pageWidth,
					width: pageWidth
				};
			}
		};
		manager.layout = {
			effectivePageAdvance: pageAdvance,
			delta: pageAdvance,
			pageWidth,
			width: pageWidth,
			edgeGuardPx: 4,
			pageBoundaryShift: 0
		};
		manager.settings = {
			axis: "horizontal",
			direction: "rtl",
			rtlScrollType: "negative",
			writingMode: "vertical-rl"
		};
		manager.isPaginated = true;
		manager.views = {
			first: function() {
				return {
					_contentWidth: contentWidth,
					width: function() {
						return contentWidth;
					},
					iframe: {
						getBoundingClientRect: function() {
							return {
								left: 0
							};
						}
					},
					contents: {
						writingMode: function() {
							return "vertical-rl";
						},
						window: {
							getComputedStyle: function() {
								return {
									display: "block",
									visibility: "visible"
								};
							}
						},
						document: {
							body: {},
							createTreeWalker: function() {
								return {
									nextNode: function() {
										currentNode = null;
										return currentNode;
									}
								};
							},
							createRange: function() {
								return {
									selectNodeContents: function() {},
									getClientRects: function() {
										return [];
									},
									detach: function() {}
								};
							}
						}
					}
				};
			},
			last: function() {
				return this.first();
			}
		};
		manager.syncVerticalRlViewportClip = function() {};
		manager.getCurrentPageIndex = function() {
			return 0;
		};
		manager.getTotalPagesForCurrentView = function() {
			return 8;
		};
		manager.getMaxLogicalScrollLeft = function() {
			return contentWidth - pageWidth;
		};
		manager.getNormalizedLogicalScrollLeft = function() {
			return 0;
		};
		manager.getVerticalRlEdgeMaskWidths = function() {
			return {
				left: previousEffectiveLeft - (contentWidth - pageWidth),
				right: 0
			};
		};

		manager.scrollToLogicalPage(1);

		assert.ok(manager._verticalRlSequentialBoundaryConstraint);
		assert.equal(
			manager._verticalRlSequentialBoundaryConstraint.preferredRightBoundary,
			previousEffectiveLeft
		);
		assert.ok(Math.abs(manager.container.scrollLeft + expectedOffset) <= 0.01, manager.container.scrollLeft);
	});

	it("uses the rendered clean-page mask when computed mask is intentionally zero on the first page", function() {
		let manager = Object.create(DefaultViewManager.prototype);
		let contentWidth = 10343.991409301758;
		let pageWidth = 1295.9942626953125;
		let renderedLeftMask = 11;
		let previousEffectiveLeft = contentWidth - pageWidth + renderedLeftMask;
		let expectedOffset = contentWidth - previousEffectiveLeft;
		let currentNode = null;

		manager.container = {
			clientWidth: pageWidth,
			scrollWidth: contentWidth,
			scrollLeft: 0,
			scrollTop: 0,
			dataset: {
				epubVrlEdgeMask: String(renderedLeftMask),
				epubVrlEdgeMaskLeft: String(renderedLeftMask),
				epubVrlEdgeMaskRight: "0"
			},
			getBoundingClientRect: function() {
				return {
					left: 0,
					right: pageWidth,
					width: pageWidth
				};
			}
		};
		manager.layout = {
			effectivePageAdvance: pageWidth,
			delta: pageWidth,
			pageWidth,
			width: pageWidth,
			edgeGuardPx: 4,
			pageBoundaryShift: 0
		};
		manager.settings = {
			axis: "horizontal",
			direction: "rtl",
			rtlScrollType: "negative",
			writingMode: "vertical-rl"
		};
		manager.isPaginated = true;
		manager.views = {
			first: function() {
				return {
					_contentWidth: contentWidth,
					width: function() {
						return contentWidth;
					},
					iframe: {
						getBoundingClientRect: function() {
							return {
								left: 0
							};
						}
					},
					contents: {
						writingMode: function() {
							return "vertical-rl";
						},
						window: {
							getComputedStyle: function() {
								return {
									display: "block",
									visibility: "visible"
								};
							}
						},
						document: {
							body: {},
							createTreeWalker: function() {
								return {
									nextNode: function() {
										currentNode = null;
										return currentNode;
									}
								};
							},
							createRange: function() {
								return {
									selectNodeContents: function() {},
									getClientRects: function() {
										return [];
									},
									detach: function() {}
								};
							}
						}
					}
				};
			},
			last: function() {
				return this.first();
			}
		};
		manager.syncVerticalRlViewportClip = function() {};
		manager.getCurrentPageIndex = function() {
			return 0;
		};
		manager.getTotalPagesForCurrentView = function() {
			return 8;
		};
		manager.getMaxLogicalScrollLeft = function() {
			return contentWidth - pageWidth;
		};
		manager.getNormalizedLogicalScrollLeft = function() {
			return 0;
		};
		manager.getVerticalRlEdgeMaskWidths = function() {
			return {
				left: 0,
				right: 0
			};
		};

		manager.scrollToLogicalPage(1);

		assert.ok(manager._verticalRlSequentialBoundaryConstraint);
		assert.equal(
			manager._verticalRlSequentialBoundaryConstraint.preferredRightBoundary,
			previousEffectiveLeft
		);
		assert.ok(Math.abs(manager.container.scrollLeft + expectedOffset) <= 0.01, manager.container.scrollLeft);
	});

	it("passes the current effective left boundary when advancing to the next vertical-rl page", function() {
		let manager = Object.create(DefaultViewManager.prototype);
		let capturedPageIndex = null;
		let capturedOptions = null;

		manager.views = {
			length: 1,
			last: function() {
				return {
					section: {
						next: function() {
							return null;
						}
					}
				};
			}
		};
		manager.isRtlVerticalPaginated = function() {
			return true;
		};
		manager.settings = {
			direction: "rtl"
		};
		manager.getCurrentPageIndex = function() {
			return 1;
		};
		manager.getTotalPagesForCurrentView = function() {
			return 8;
		};
		manager.getVerticalRlCurrentEffectiveLeftBoundary = function() {
			return 7767.45458984375;
		};
		manager.scrollToLogicalPage = function(pageIndex, options) {
			capturedPageIndex = pageIndex;
			capturedOptions = options;
		};

		manager.next();

		assert.equal(capturedPageIndex, 2);
		assert.equal(capturedOptions.sequentialRightBoundary, 7767.45458984375);
	});

	it("uses the page advance for the penultimate vertical-rl step when the final page clamps to max scroll", function() {
		let manager = Object.create(DefaultViewManager.prototype);

		manager.container = {};
		manager.getPageAdvance = function() {
			return 1274.54541015625;
		};
		manager.getTotalPagesForCurrentView = function() {
			return 14;
		};
		manager.getCurrentPageIndex = function() {
			return 12;
		};
		manager.getMaxLogicalScrollLeft = function() {
			return 16842.7265625;
		};
		manager.getLogicalOffsetForPageIndex = function(pageIndex) {
			return pageIndex === 13 ? 16842.7265625 : 15526.36328125;
		};
		manager.isRtlVerticalPaginated = function() {
			return true;
		};
		manager.hasVerticalRlStructuralPageGutter = function() {
			return true;
		};

		assert.equal(manager.getLogicalPageStepToNextPage(), 1274.54541015625);
	});

	it("applies a sequential vertical-rl boundary when advancing to the final page", function() {
		let manager = Object.create(DefaultViewManager.prototype);
		let contentWidth = 18139;
		let visibleWidth = 1296;
		let maxScroll = contentWidth - visibleWidth;
		let capturedLeft = null;

		manager.container = {
			clientWidth: visibleWidth,
			scrollWidth: contentWidth,
			scrollLeft: -15526.36328125
		};
		manager.layout = {
			effectivePageAdvance: 1274.54541015625,
			delta: 1274.54541015625,
			pageWidth: visibleWidth,
			width: visibleWidth,
			edgeGuardPx: 0,
			pageBoundaryShift: 0
		};
		manager.settings = {
			axis: "horizontal",
			direction: "rtl",
			rtlScrollType: "negative",
			writingMode: "vertical-rl"
		};
		manager.isPaginated = true;
		manager.views = {
			first: function() {
				return {
					_contentWidth: contentWidth,
					width: function() {
						return contentWidth;
					},
					iframe: null,
					contents: null
				};
			},
			last: function() {
				return this.first();
			}
		};
		manager.syncVerticalRlViewportClip = function() {};
		manager.queueVerticalRlBoundarySnapRetry = function() {};
		manager.scrollTo = function(left) {
			capturedLeft = left;
			this.container.scrollLeft = left;
		};

		manager.scrollToLogicalPage(13, {
			sequentialRightBoundary: 1331
		});

		assert.equal(maxScroll, 16843);
		assert.equal(capturedLeft, -(contentWidth - 1331));
	});

	it("reuses cached vertical-rl logical page offsets when returning from the final page", function() {
		let manager = Object.create(DefaultViewManager.prototype);
		let contentWidth = 18139;
		let visibleWidth = 1296;
		let maxScroll = contentWidth - visibleWidth;
		let capturedLeft = null;
		let snapCalls = 0;

		manager.container = {
			clientWidth: visibleWidth,
			scrollWidth: contentWidth,
			scrollLeft: -14245.4541015625
		};
		manager.layout = {
			effectivePageAdvance: 1296,
			delta: 1296,
			pageWidth: visibleWidth,
			width: visibleWidth,
			edgeGuardPx: 0,
			pageBoundaryShift: 0
		};
		manager.settings = {
			axis: "horizontal",
			direction: "rtl",
			rtlScrollType: "negative",
			writingMode: "vertical-rl"
		};
		manager.isPaginated = true;
		manager.views = {
			first: function() {
				return {
					_contentWidth: contentWidth,
					width: function() {
						return contentWidth;
					},
					iframe: null,
					contents: null
				};
			},
			last: function() {
				return this.first();
			}
		};
		manager.syncVerticalRlViewportClip = function() {};
		manager.queueVerticalRlBoundarySnapRetry = function() {};
		manager.scrollTo = function(left) {
			capturedLeft = left;
			this.container.scrollLeft = left;
		};
		manager.snapVerticalRlLogicalOffsetToTextBoundary = function(logicalOffset) {
			snapCalls += 1;
			if (logicalOffset === maxScroll) {
				return contentWidth - 1318.9914093017578;
			}

			return 15527.2724609375;
		};

		manager.scrollToLogicalPage(12);
		assert.equal(capturedLeft, -15527.2724609375);

		manager.scrollToLogicalPage(13, {
			sequentialRightBoundary: 1318.9914093017578
		});
		assert.equal(capturedLeft, -(contentWidth - 1318.9914093017578));

		manager.snapVerticalRlLogicalOffsetToTextBoundary = function() {
			throw new Error("cached page 13 offset should be reused");
		};
		manager.scrollToLogicalPage(12);

		assert.equal(capturedLeft, -15527.2724609375);
		assert.equal(snapCalls, 2);
	});

	it("keeps delayed vertical-rl boundary retries on the cached logical page offset", async function() {
		let manager = Object.create(DefaultViewManager.prototype);
		let contentWidth = 18139;
		let visibleWidth = 1296;
		let maxScroll = contentWidth - visibleWidth;
		let cachedOffset = 15527.2724609375;
		let capturedLeft = null;

		manager.container = {
			clientWidth: visibleWidth,
			scrollWidth: contentWidth,
			scrollLeft: -cachedOffset,
			scrollTop: 0
		};
		manager.layout = {
			effectivePageAdvance: 1296,
			delta: 1296,
			pageWidth: visibleWidth,
			width: visibleWidth,
			edgeGuardPx: 0,
			pageBoundaryShift: 0
		};
		manager.settings = {
			axis: "horizontal",
			direction: "rtl",
			rtlScrollType: "negative",
			writingMode: "vertical-rl",
			verticalRlBoundarySnapRetryDelays: []
		};
		manager.isPaginated = true;
		manager.views = {
			first: function() {
				return {
					_contentWidth: contentWidth,
					width: function() {
						return contentWidth;
					},
					iframe: null,
					contents: null
				};
			},
			last: function() {
				return this.first();
			}
		};
		manager.syncVerticalRlViewportClip = function() {};
		manager.waitForVerticalRlLayoutReady = function() {
			return Promise.resolve();
		};
		manager.getTotalPagesForCurrentView = function() {
			return 14;
		};
		manager.getMaxLogicalScrollLeft = function() {
			return maxScroll;
		};
		manager.getCurrentPageIndex = function() {
			return 12;
		};
		manager.snapVerticalRlLogicalOffsetToTextBoundary = function() {
			throw new Error("cached page offset should not be re-snapped by delayed retries");
		};
		manager.snapVerticalRlLogicalOffsetFromEdgeMask = function() {
			throw new Error("cached page offset should not be moved by edge mask retries");
		};
		manager.scrollTo = function(left) {
			capturedLeft = left;
			this.container.scrollLeft = left;
		};

		let cacheKey = manager.getVerticalRlLogicalPageOffsetCacheKey(14, maxScroll);
		manager.cacheVerticalRlLogicalPageOffset(12, cachedOffset, cacheKey);
		manager.queueVerticalRlBoundarySnapRetry(12);
		await Promise.resolve();

		assert.equal(manager.container.scrollLeft, -cachedOffset);
		assert.equal(capturedLeft, null);
	});

	it("does not snap a preferred sequential boundary past the previous effective page edge", function() {
		let manager = Object.create(DefaultViewManager.prototype);
		let contentWidth = 10344;
		let pageWidth = 1296;
		let preferredRightBoundary = 7769.45458984375;
		let logicalOffset = contentWidth - preferredRightBoundary;
		let textNode = {
			nodeValue: "這一行跨過上一頁的有效左界線，下一頁不應再被往內推。",
			parentElement: {}
		};
		let currentNode = null;

		manager.container = {
			clientWidth: pageWidth,
			scrollWidth: contentWidth,
			scrollLeft: -logicalOffset
		};
		manager.layout = {
			effectivePageAdvance: pageWidth,
			delta: pageWidth,
			pageWidth,
			width: pageWidth,
			edgeGuardPx: 4,
			pageBoundaryShift: 0
		};
		manager.settings = {
			axis: "horizontal",
			direction: "rtl",
			rtlScrollType: "negative",
			writingMode: "vertical-rl"
		};
		manager.isPaginated = true;
		manager.views = {
			first: function() {
				return {
					_contentWidth: contentWidth,
					width: function() {
						return contentWidth;
					},
					iframe: {
						getBoundingClientRect: function() {
							return {
								left: 0
							};
						}
					},
					contents: {
						writingMode: function() {
							return "vertical-rl";
						},
						window: {
							getComputedStyle: function() {
								return {
									display: "block",
									visibility: "visible"
								};
							}
						},
						document: {
							body: {},
							createTreeWalker: function() {
								let used = false;
								return {
									nextNode: function() {
										if (used) {
											return null;
										}
										used = true;
										currentNode = textNode;
										return currentNode;
									}
								};
							},
							createRange: function() {
								return {
									selectNodeContents: function(node) {
										currentNode = node;
									},
									getClientRects: function() {
										return [{
											left: preferredRightBoundary - 10.5,
											right: preferredRightBoundary + 12.5,
											top: 40,
											bottom: 740,
											width: 23,
											height: 700
										}];
									},
									detach: function() {}
								};
							}
						}
					}
				};
			},
			last: function() {
				return this.first();
			}
		};

		let snapped = manager.snapVerticalRlLogicalOffsetToTextBoundary(logicalOffset, contentWidth - pageWidth, {
			maxRightBoundary: preferredRightBoundary,
			preferredRightBoundary
		});
		let rawRight = contentWidth - snapped;

		assert.ok(Math.abs(rawRight - preferredRightBoundary) <= 1, rawRight);
	});

	it("does not cache a no-op vertical-rl boundary snap before text rects are ready", function() {
		let manager = Object.create(DefaultViewManager.prototype);
		let textNode = {
			nodeValue: "把麵糊舀在水果上面，放入烤箱中，以三百度烤大約三十分鐘。",
			parentElement: {}
		};
		let phase = "not-ready";
		let yielded = false;

		manager.container = {
			clientWidth: 1320,
			scrollWidth: 18168,
			scrollLeft: -7758.1818
		};
		manager.layout = {
			effectivePageAdvance: 1296,
			delta: 1296,
			pageWidth: 1320,
			width: 1320,
			pageBoundaryShift: 18,
			edgeGuardPx: 4,
			count: function(totalLength, pageLength) {
				let pages = Math.max(1, Math.ceil(totalLength / pageLength));
				return { pages, spreads: pages };
			}
		};
		manager.settings = {
			axis: "horizontal",
			direction: "rtl",
			rtlScrollType: "negative",
			writingMode: "vertical-rl"
		};
		manager.isPaginated = true;
		manager.views = {
			first: function() {
				return {
					width: function() {
						return 18168;
					},
					iframe: {
						getBoundingClientRect: function() {
							return {
								left: 0
							};
						}
					},
					contents: {
						writingMode: function() {
							return "vertical-rl";
						},
						window: {
							getComputedStyle: function() {
								return {
									display: "block",
									visibility: "visible"
								};
							}
						},
						document: {
							body: {},
							createTreeWalker: function() {
								yielded = false;
								return {
									nextNode: function() {
										if (yielded) {
											return null;
										}
										yielded = true;
										return textNode;
									}
								};
							},
							createRange: function() {
								return {
									selectNodeContents: function() {},
									getClientRects: function() {
										if (phase === "not-ready") {
											return [{
												left: 10363.3231,
												right: 10386.0504,
												width: 22.7273,
												height: 680
											}];
										}

										return [{
											left: 10399.3174,
											right: 10422.0447,
											width: 22.7273,
											height: 680
										}];
									},
									detach: function() {}
								};
							}
						}
					}
				};
			},
			last: function() {
				return this.first();
			}
		};

		let baseLogicalOffset = manager.getLogicalOffsetForPageIndex(6, 14, 16848);
		let firstLogicalOffset = manager.snapVerticalRlLogicalOffsetToTextBoundary(baseLogicalOffset, 16848);

		phase = "ready";
		let secondLogicalOffset = manager.snapVerticalRlLogicalOffsetToTextBoundary(baseLogicalOffset, 16848);

		assert.equal(firstLogicalOffset, baseLogicalOffset);
		assert.ok(secondLogicalOffset > baseLogicalOffset);
	});

	it("retries vertical-rl boundary snapping after deferred layout readiness", async function() {
		let manager = Object.create(DefaultViewManager.prototype);
		let snapCalls = 0;

		manager.container = {
			clientWidth: 1320,
			scrollWidth: 18168,
			scrollLeft: -7758.1818
		};
		manager.layout = {
			effectivePageAdvance: 1296,
			delta: 1296,
			pageWidth: 1320,
			width: 1320,
			pageBoundaryShift: 18
		};
		manager.settings = {
			axis: "horizontal",
			direction: "rtl",
			rtlScrollType: "negative",
			writingMode: "vertical-rl"
		};
		manager.isPaginated = true;
		manager.isRtlVerticalPaginated = function() {
			return true;
		};
		manager.getTotalPagesForCurrentView = function() {
			return 14;
		};
		manager.getMaxLogicalScrollLeft = function() {
			return 16848;
		};
		manager.syncVerticalRlViewportClip = function() {};
		manager.waitForVerticalRlLayoutReady = function() {
			return Promise.resolve();
		};
		manager.snapVerticalRlLogicalOffsetToTextBoundary = function(logicalOffset) {
			snapCalls += 1;
			return snapCalls === 1 ? logicalOffset : logicalOffset + 15;
		};
		manager.scrollTo = function(left) {
			this.container.scrollLeft = left;
		};

		manager.scrollToLogicalPage(6);
		assert.equal(manager.container.scrollLeft, -7758);

		await Promise.resolve();

		assert.equal(Math.round(manager.container.scrollLeft), -7773);
		assert.equal(snapCalls, 2);
	});

	it("cancels stale vertical-rl boundary retries when navigating to the final page", async function() {
		let manager = Object.create(DefaultViewManager.prototype);
		let pageWidth = 1296;
		let contentWidth = 18139;
		let maxScroll = contentWidth - pageWidth;
		let stalePage13Offset = 15548.181640625;

		manager.container = {
			clientWidth: pageWidth,
			scrollWidth: contentWidth,
			scrollLeft: -15526.36328125,
			scrollTop: 0
		};
		manager.layout = {
			effectivePageAdvance: pageWidth,
			delta: pageWidth,
			pageWidth,
			width: pageWidth,
			pageBoundaryShift: 0
		};
		manager.settings = {
			axis: "horizontal",
			direction: "rtl",
			rtlScrollType: "negative",
			writingMode: "vertical-rl"
		};
		manager.isPaginated = true;
		manager.isRtlVerticalPaginated = function() {
			return true;
		};
		manager.getTotalPagesForCurrentView = function() {
			return 14;
		};
		manager.getMaxLogicalScrollLeft = function() {
			return maxScroll;
		};
		manager.syncVerticalRlViewportClip = function() {};
		manager.waitForVerticalRlLayoutReady = function() {
			return Promise.resolve();
		};
		manager.snapVerticalRlLogicalOffsetToTextBoundary = function(logicalOffset) {
			return Math.abs(logicalOffset - (12 * pageWidth)) <= pageWidth
				? stalePage13Offset
				: logicalOffset;
		};

		manager.queueVerticalRlBoundarySnapRetry(12);
		manager.scrollToLogicalPage(13);
		await Promise.resolve();

		assert.equal(Math.round(manager.container.scrollLeft), -Math.round(maxScroll));
	});

	it("keeps retrying vertical-rl boundary snapping until late text rects are measurable", async function() {
		let manager = Object.create(DefaultViewManager.prototype);
		let snapCalls = 0;

		manager.container = {
			clientWidth: 1320,
			scrollWidth: 18168,
			scrollLeft: -7758.1818
		};
		manager.layout = {
			effectivePageAdvance: 1296,
			delta: 1296,
			pageWidth: 1320,
			width: 1320,
			pageBoundaryShift: 18
		};
		manager.settings = {
			axis: "horizontal",
			direction: "rtl",
			rtlScrollType: "negative",
			writingMode: "vertical-rl",
			verticalRlBoundarySnapRetryDelays: [0, 0]
		};
		manager.isPaginated = true;
		manager.isRtlVerticalPaginated = function() {
			return true;
		};
		manager.getTotalPagesForCurrentView = function() {
			return 14;
		};
		manager.getMaxLogicalScrollLeft = function() {
			return 16848;
		};
		manager.syncVerticalRlViewportClip = function() {};
		manager.waitForVerticalRlLayoutReady = function() {
			return Promise.resolve();
		};
		manager.snapVerticalRlLogicalOffsetToTextBoundary = function(logicalOffset) {
			snapCalls += 1;
			return snapCalls < 4 ? logicalOffset : logicalOffset + 15;
		};
		manager.scrollTo = function(left) {
			this.container.scrollLeft = left;
		};

		manager.scrollToLogicalPage(6);
		await new Promise(function(resolve) {
			setTimeout(resolve, 10);
		});

		assert.equal(Math.round(manager.container.scrollLeft), -7773);
		assert.equal(snapCalls, 4);
	});

	it("uses the right edge mask as a provisional snap while text rects are late", async function() {
		let manager = Object.create(DefaultViewManager.prototype);

		manager.container = {
			clientWidth: 1320,
			scrollWidth: 18168,
			scrollLeft: -7758.1818
		};
		manager.layout = {
			effectivePageAdvance: 1296,
			delta: 1296,
			pageWidth: 1320,
			width: 1320,
			pageBoundaryShift: 18,
			edgeGuardPx: 4
		};
		manager.settings = {
			axis: "horizontal",
			direction: "rtl",
			rtlScrollType: "negative",
			writingMode: "vertical-rl"
		};
		manager.isPaginated = true;
		manager.isRtlVerticalPaginated = function() {
			return true;
		};
		manager.getTotalPagesForCurrentView = function() {
			return 14;
		};
		manager.getMaxLogicalScrollLeft = function() {
			return 16848;
		};
		manager.getVerticalRlEdgeMaskWidths = function() {
			return {
				left: 24,
				right: 17
			};
		};
		manager.syncVerticalRlViewportClip = function() {};
		manager.waitForVerticalRlLayoutReady = function() {
			return Promise.resolve();
		};
		manager.snapVerticalRlLogicalOffsetToTextBoundary = function(logicalOffset) {
			return logicalOffset;
		};
		manager.scrollTo = function(left) {
			this.container.scrollLeft = left;
		};

		manager.scrollToLogicalPage(6);
		await Promise.resolve();

		assert.equal(Math.round(manager.container.scrollLeft), -7773);
	});

	it("queues vertical-rl boundary snapping after direct restored scroll offsets", async function() {
		let manager = Object.create(DefaultViewManager.prototype);

		manager.container = {
			clientWidth: 1320,
			scrollWidth: 18168,
			scrollLeft: 0,
			scrollTop: 0
		};
		manager.layout = {
			effectivePageAdvance: 1296,
			delta: 1296,
			pageWidth: 1320,
			width: 1320,
			pageBoundaryShift: 18,
			edgeGuardPx: 4
		};
		manager.settings = {
			axis: "horizontal",
			direction: "rtl",
			rtlScrollType: "negative",
			writingMode: "vertical-rl"
		};
		manager.isPaginated = true;
		manager.isRtlVerticalPaginated = function() {
			return true;
		};
		manager.getTotalPagesForCurrentView = function() {
			return 14;
		};
		manager.getMaxLogicalScrollLeft = function() {
			return 16848;
		};
		manager.getCurrentPageIndex = function() {
			return 6;
		};
		manager.getVerticalRlEdgeMaskWidths = function() {
			return {
				left: 24,
				right: 17
			};
		};
		manager.syncVerticalRlViewportClip = function() {};
		manager.waitForVerticalRlLayoutReady = function() {
			return Promise.resolve();
		};
		manager.snapVerticalRlLogicalOffsetToTextBoundary = function(logicalOffset) {
			return logicalOffset;
		};

		manager.scrollTo(-7758.1818, 0, true);
		await new Promise(function(resolve) {
			setTimeout(resolve, 10);
		});

		assert.equal(Math.round(manager.container.scrollLeft), -7773);
	});

	it("snaps restored vertical-rl current offsets back to the active page grid when boundaries are clean", async function() {
		let manager = Object.create(DefaultViewManager.prototype);

		manager.container = {
			clientWidth: 1320,
			scrollWidth: 18144,
			scrollLeft: -10345.4541,
			scrollTop: 0
		};
		manager.layout = {
			effectivePageAdvance: 1296,
			delta: 1296,
			pageWidth: 1320,
			width: 1320,
			pageBoundaryShift: 0,
			edgeGuardPx: 0
		};
		manager.settings = {
			axis: "horizontal",
			direction: "rtl",
			rtlScrollType: "negative",
			writingMode: "vertical-rl"
		};
		manager.isPaginated = true;
		manager.isRtlVerticalPaginated = function() {
			return true;
		};
		manager.getTotalPagesForCurrentView = function() {
			return 14;
		};
		manager.getMaxLogicalScrollLeft = function() {
			return 16824;
		};
		manager.getCurrentPageIndex = function() {
			return 8;
		};
		manager.syncVerticalRlViewportClip = function() {};
		manager.waitForVerticalRlLayoutReady = function() {
			return Promise.resolve();
		};
		manager.snapVerticalRlLogicalOffsetToTextBoundary = function(logicalOffset) {
			return logicalOffset;
		};
		manager.snapVerticalRlLogicalOffsetFromEdgeMask = function(logicalOffset) {
			return logicalOffset;
		};
		manager.scrollTo = function(left) {
			this.container.scrollLeft = left;
		};

		manager.queueVerticalRlBoundarySnapRetry(8, {
			useCurrentOffset: true
		});
		await Promise.resolve();

		assert.equal(manager.container.scrollLeft, -10368);
	});

	it("rechecks text boundaries after snapping restored vertical-rl current offsets to the page grid", async function() {
		let manager = Object.create(DefaultViewManager.prototype);

		manager.container = {
			clientWidth: 1296,
			scrollWidth: 16848,
			scrollLeft: -2588,
			scrollTop: 0
		};
		manager.layout = {
			effectivePageAdvance: 1296,
			delta: 1296,
			pageWidth: 1296,
			width: 1296,
			pageBoundaryShift: 0,
			edgeGuardPx: 0
		};
		manager.settings = {
			axis: "horizontal",
			direction: "rtl",
			rtlScrollType: "negative",
			writingMode: "vertical-rl"
		};
		manager.isPaginated = true;
		manager.isRtlVerticalPaginated = function() {
			return true;
		};
		manager.getTotalPagesForCurrentView = function() {
			return 13;
		};
		manager.getMaxLogicalScrollLeft = function() {
			return 15552;
		};
		manager.getCurrentPageIndex = function() {
			return 2;
		};
		manager.syncVerticalRlViewportClip = function() {};
		manager.waitForVerticalRlLayoutReady = function() {
			return Promise.resolve();
		};
		manager.snapVerticalRlLogicalOffsetToTextBoundary = function(logicalOffset) {
			assert.equal(logicalOffset, 2592);
			return 2586;
		};
		manager.snapVerticalRlLogicalOffsetFromEdgeMask = function(logicalOffset) {
			return logicalOffset;
		};
		manager.scrollTo = function(left) {
			this.container.scrollLeft = left;
		};

		manager.queueVerticalRlBoundarySnapRetry(2, {
			useCurrentOffset: true
		});
		await Promise.resolve();

		assert.equal(manager.container.scrollLeft, -2586);
	});

	it("does not move structural gutter pages off the vertical-rl page grid for raw-left line boxes", function() {
		let manager = Object.create(DefaultViewManager.prototype);
		let textNode = {
			nodeValue: "做得好的話，這道菜會非常、非常美味",
			parentElement: {}
		};
		let yielded = false;

		manager.container = {
			clientWidth: 1320,
			scrollWidth: 18144,
			scrollLeft: -10368,
			scrollTop: 0,
			getBoundingClientRect: function() {
				return {
					left: 0,
					right: 1320
				};
			}
		};
		manager.layout = {
			effectivePageAdvance: 1296,
			delta: 1296,
			pageWidth: 1320,
			width: 1320,
			pageBoundaryShift: 0,
			edgeGuardPx: 0
		};
		manager.settings = {
			axis: "horizontal",
			direction: "rtl",
			rtlScrollType: "negative",
			writingMode: "vertical-rl"
		};
		manager.isPaginated = true;
		manager.isRtlVerticalPaginated = function() {
			return true;
		};
		manager.getVerticalRlEdgeMaskWidths = function() {
			return {
				left: 24,
				right: 0
			};
		};
		manager.views = {
			first: function() {
				return {
					width: function() {
						return 18144;
					},
					iframe: {
						getBoundingClientRect: function() {
							return {
								left: 0
							};
						}
					},
					contents: {
						writingMode: function() {
							return "vertical-rl";
						},
						window: {
							getComputedStyle: function() {
								return {
									display: "block",
									visibility: "visible"
								};
							}
						},
						document: {
							body: {},
							createTreeWalker: function() {
								yielded = false;
								return {
									nextNode: function() {
										if (yielded) {
											return null;
										}
										yielded = true;
										return textNode;
									}
								};
							},
							createRange: function() {
								return {
									selectNodeContents: function() {},
									getClientRects: function() {
										return [{
											left: 6448,
											right: 6472,
											width: 24,
											height: 740
										}];
									},
									detach: function() {}
								};
							}
						}
					}
				};
			},
			last: function() {
				return this.first();
			}
		};

		let snapped = manager.snapVerticalRlLogicalOffsetToTextBoundary(10368, 16824);

		assert.equal(snapped, 10368);
	});

	it("uses the target structural gutter mask when snapping a vertical-rl logical page", function() {
		let manager = Object.create(DefaultViewManager.prototype);
		let textNode = {
			nodeValue: "做得好的話，這道菜會非常、非常美味",
			parentElement: {}
		};
		let yielded = false;

		manager.container = {
			clientWidth: 1320,
			scrollWidth: 18144,
			scrollLeft: -9072,
			scrollTop: 0,
			getBoundingClientRect: function() {
				return {
					left: 0,
					right: 1320
				};
			}
		};
		manager.layout = {
			effectivePageAdvance: 1296,
			delta: 1296,
			pageWidth: 1320,
			width: 1320,
			pageBoundaryShift: 0,
			edgeGuardPx: 0
		};
		manager.settings = {
			axis: "horizontal",
			direction: "rtl",
			rtlScrollType: "negative",
			writingMode: "vertical-rl"
		};
		manager.isPaginated = true;
		manager.isRtlVerticalPaginated = function() {
			return true;
		};
		manager.getVerticalRlEdgeMaskWidths = function() {
			return {
				left: 24,
				right: 0
			};
		};
		manager.views = {
			first: function() {
				return {
					width: function() {
						return 18144;
					},
					iframe: {
						getBoundingClientRect: function() {
							return {
								left: 0
							};
						}
					},
					contents: {
						writingMode: function() {
							return "vertical-rl";
						},
						window: {
							getComputedStyle: function() {
								return {
									display: "block",
									visibility: "visible"
								};
							}
						},
						document: {
							body: {},
							createTreeWalker: function() {
								yielded = false;
								return {
									nextNode: function() {
										if (yielded) {
											return null;
										}
										yielded = true;
										return textNode;
									}
								};
							},
							createRange: function() {
								return {
									selectNodeContents: function() {},
									getClientRects: function() {
										return [{
											left: 6477.5425,
											right: 6500.2695,
											width: 22.727,
											height: 460
										}];
									},
									detach: function() {}
								};
							}
						}
					}
				};
			},
			last: function() {
				return this.first();
			}
		};

		let snapped = manager.snapVerticalRlLogicalOffsetToTextBoundary(10368, 16824);

		assert.equal(snapped, 10368);
	});

	it("queues current-offset grid snapping after vertical-rl views are displayed", function() {
		let manager = Object.create(DefaultViewManager.prototype);
		let queued = false;
		let emitted = false;

		manager.isRtlVerticalPaginated = function() {
			return true;
		};
		manager.queueVerticalRlBoundarySnapRetryForCurrentOffset = function() {
			queued = true;
		};
		manager.emit = function() {
			emitted = true;
		};

		manager.afterDisplayed({});

		assert.equal(queued, true);
		assert.equal(emitted, true);
	});

	it("queues vertical-rl boundary snapping after external scroll events", async function() {
		let manager = Object.create(DefaultViewManager.prototype);

		manager.container = {
			clientWidth: 1320,
			scrollWidth: 18168,
			scrollLeft: -7758.1818,
			scrollTop: 0
		};
		manager.layout = {
			effectivePageAdvance: 1296,
			delta: 1296,
			pageWidth: 1320,
			width: 1320,
			pageBoundaryShift: 18,
			edgeGuardPx: 4
		};
		manager.settings = {
			axis: "horizontal",
			direction: "rtl",
			rtlScrollType: "negative",
			writingMode: "vertical-rl"
		};
		manager.isPaginated = true;
		manager.isRtlVerticalPaginated = function() {
			return true;
		};
		manager.getTotalPagesForCurrentView = function() {
			return 14;
		};
		manager.getMaxLogicalScrollLeft = function() {
			return 16848;
		};
		manager.getCurrentPageIndex = function() {
			return 6;
		};
		manager.getVerticalRlEdgeMaskWidths = function() {
			return {
				left: 24,
				right: 17
			};
		};
		manager.emit = function() {};
		manager.syncVerticalRlViewportClip = function() {};
		manager.waitForVerticalRlLayoutReady = function() {
			return Promise.resolve();
		};
		manager.snapVerticalRlLogicalOffsetToTextBoundary = function(logicalOffset) {
			return logicalOffset;
		};
		manager.scrollTo = function(left) {
			this.container.scrollLeft = left;
		};

		manager.onScroll();
		await new Promise(function(resolve) {
			setTimeout(resolve, 10);
		});

		assert.equal(Math.round(manager.container.scrollLeft), -7773);
	});

	it("does not queue current-offset snapping for silent vertical-rl programmatic scrolls", function() {
		let manager = Object.create(DefaultViewManager.prototype);
		let queued = false;

		manager.container = {
			scrollLeft: -2580,
			scrollTop: 0
		};
		manager.settings = {
			fullsize: false
		};
		manager.ignore = true;
		manager.isRtlVerticalPaginated = function() {
			return true;
		};
		manager.queueVerticalRlBoundarySnapRetryForCurrentOffset = function() {
			queued = true;
		};

		manager.onScroll();

		assert.equal(manager.ignore, false);
		assert.equal(queued, false);
	});

	it("snaps direct restored offsets when iframe content rects are already logical coordinates", async function() {
		let manager = Object.create(DefaultViewManager.prototype);
		let textNode = {
			nodeValue: "買得到的話，新鮮的牛肝菌猶如一頓盛宴。抹上橄欖油。",
			parentElement: {}
		};
		let yielded = false;

		manager.container = {
			clientWidth: 1320,
			scrollWidth: 18168,
			scrollLeft: -9069.0908,
			scrollTop: 0
		};
		manager.layout = {
			effectivePageAdvance: 1296,
			delta: 1296,
			pageWidth: 1320,
			width: 1320,
			pageBoundaryShift: 18,
			edgeGuardPx: 4
		};
		manager.settings = {
			axis: "horizontal",
			direction: "rtl",
			rtlScrollType: "negative",
			writingMode: "vertical-rl"
		};
		manager.isPaginated = true;
		manager.getTotalPagesForCurrentView = function() {
			return 14;
		};
		manager.getMaxLogicalScrollLeft = function() {
			return 16848;
		};
		manager.syncVerticalRlViewportClip = function() {};
		manager.waitForVerticalRlLayoutReady = function() {
			return Promise.resolve();
		};
		manager.views = {
			first: function() {
				return {
					width: function() {
						return 18168;
					},
					iframe: {
						getBoundingClientRect: function() {
							return {
								left: -7565.7241
							};
						}
					},
					contents: {
						writingMode: function() {
							return "vertical-rl";
						},
						window: {
							getComputedStyle: function() {
								return {
									display: "block",
									visibility: "visible"
								};
							}
						},
						document: {
							body: {},
							createTreeWalker: function() {
								yielded = false;
								return {
									nextNode: function() {
										if (yielded) {
											return null;
										}
										yielded = true;
										return textNode;
									}
								};
							},
							createRange: function() {
								return {
									selectNodeContents: function() {},
									getClientRects: function() {
										return [{
											left: 9078.7109,
											right: 9101.4385,
											width: 22.7276,
											height: 740
										}];
									},
									detach: function() {}
								};
							}
						}
					}
				};
			},
			last: function() {
				return this.first();
			}
		};

		manager.scrollTo(-9069.0908, 0, true);
		await new Promise(function(resolve) {
			setTimeout(resolve, 10);
		});

		let rawRight = 18168 - Math.abs(manager.container.scrollLeft);

		assert.equal(Math.round(manager.container.scrollLeft), -9062);
		assert.ok(rawRight >= 9101.4385 + 4);
	});

	it("does not wait indefinitely for vertical-rl font readiness before boundary snapping", async function() {
		let manager = Object.create(DefaultViewManager.prototype);
		let originalRequestAnimationFrame = globalThis.requestAnimationFrame;
		let resolved = false;

		manager.settings = {
			verticalRlFontReadyTimeout: 5
		};
		manager.views = {
			first: function() {
				return {
					contents: {
						document: {
							fonts: {
								ready: new Promise(function(){})
							}
						}
					}
				};
			},
			last: function() {
				return this.first();
			}
		};

		globalThis.requestAnimationFrame = function(callback) {
			return setTimeout(callback, 0);
		};

		try {
			await manager.waitForVerticalRlLayoutReady().then(function() {
				resolved = true;
			});
		} finally {
			globalThis.requestAnimationFrame = originalRequestAnimationFrame;
		}

		assert.equal(resolved, true);
	});

	it("adds a right edge mask for overlap with the previous vertical-rl page", function() {
		let manager = createManagerAtLogicalOffset(0);

		manager.scrollToLogicalPage(1);

		let maskWidths = manager.getVerticalRlEdgeMaskWidths();

		assert.equal(maskWidths.left, 60);
		assert.equal(maskWidths.right, 20);
	});

	it("keeps a structural left gutter mask when active vertical-rl page width is narrower than the viewport", function() {
		let manager = Object.create(DefaultViewManager.prototype);

		manager.container = {
			clientWidth: 1320,
			scrollWidth: 18144,
			scrollLeft: -10368
		};
		manager.layout = {
			pageWidth: 1320,
			width: 1320,
			effectivePageAdvance: 1296,
			delta: 1296,
			pageBoundaryShift: 0
		};
		manager.settings = {
			axis: "horizontal",
			direction: "rtl",
			rtlScrollType: "negative",
			writingMode: "vertical-rl"
		};
		manager.isPaginated = true;
		manager.isRtlVerticalPaginated = function() {
			return true;
		};

		let maskWidths = manager.getVerticalRlEdgeMaskWidths();

		assert.deepEqual(maskWidths, {
			left: 24,
			right: 0
		});
	});

	it("shrinks a structural left gutter mask before it covers current vertical-rl text", function() {
		let manager = Object.create(DefaultViewManager.prototype);
		let textNode = {
			nodeValue: "做得好的話，這道菜會非常、非常美味",
			parentElement: {}
		};
		let yielded = false;

		manager.container = {
			clientWidth: 1320,
			scrollWidth: 18144,
			scrollLeft: -7917.2724609375,
			getBoundingClientRect: function() {
				return {
					left: 0,
					right: 1320,
					width: 1320,
					height: 761
				};
			}
		};
		manager.layout = {
			pageWidth: 1296,
			width: 1320,
			effectivePageAdvance: 1296,
			delta: 1296,
			pageBoundaryShift: 0
		};
		manager.settings = {
			axis: "horizontal",
			direction: "rtl",
			rtlScrollType: "negative",
			writingMode: "vertical-rl"
		};
		manager.isPaginated = true;
		manager.isRtlVerticalPaginated = function() {
			return true;
		};
		manager.getTotalPagesForCurrentView = function() {
			return 14;
		};
		manager.getCurrentPageIndex = function() {
			return 6;
		};
		manager.getMaxLogicalScrollLeft = function() {
			return 16824;
		};
		manager.getLogicalOffsetForPageIndex = function(pageIndex) {
			return pageIndex * 1296;
		};
		manager.views = {
			first: function() {
				return {
					iframe: {
						getBoundingClientRect: function() {
							return {
								left: -6455.80924987793,
								right: 11688.181,
								width: 18144
							};
						}
					},
					contents: {
						window: {
							getComputedStyle: function() {
								return {
									display: "block",
									visibility: "visible"
								};
							}
						},
						document: {
							body: {},
							createTreeWalker: function() {
								return {
									nextNode: function() {
										if (yielded) {
											return null;
										}
										yielded = true;
										return textNode;
									}
								};
							},
							createRange: function() {
								return {
									selectNodeContents: function() {},
									getClientRects: function() {
										return [{
											left: 6477.54248046875,
											right: 6500.26953125,
											width: 22.72705078125,
											height: 460
										}];
									},
									detach: function() {}
								};
							}
						}
					}
				};
			},
			last: function() {
				return this.first();
			}
		};

		let maskWidths = manager.getVerticalRlEdgeMaskWidths();

		assert.equal(maskWidths.left, 20);
		assert.equal(maskWidths.right, 0);
	});

	it("uses direct logical rect coordinates for left edge masks when the iframe is shifted", function() {
		let manager = Object.create(DefaultViewManager.prototype);
		let textNode = {
			nodeValue: "的臥室純淨得像間方濟會教士的隱修室。我認為它是世界上最完美的房間。",
			parentElement: {}
		};
		let yielded = false;

		manager.container = {
			getBoundingClientRect: function() {
				return {
					left: 225,
					right: 1521,
					width: 1296,
					height: 761
				};
			}
		};
		manager.layout = {
			edgeGuardPx: 0
		};
		manager.views = {
			first: function() {
				return {
					iframe: {
						getBoundingClientRect: function() {
							return {
								left: -1090.7243194580078,
								right: 17048.265914916992,
								width: 18139
							};
						}
					},
					contents: {
						window: {
							getComputedStyle: function() {
								return {
									display: "block",
									visibility: "visible"
								};
							}
						},
						document: {
							body: {},
							createTreeWalker: function() {
								return {
									nextNode: function() {
										if (yielded) {
											return null;
										}
										yielded = true;
										return textNode;
									}
								};
							},
							createRange: function() {
								return {
									selectNodeContents: function() {},
									getClientRects: function() {
										return [{
											left: 1307.7840576171875,
											right: 1330.5113525390625,
											width: 22.727294921875,
											height: 660
										}];
									},
									detach: function() {}
								};
							}
						}
					}
				};
			},
			last: function() {
				return this.first();
			}
		};

		let maskWidths = manager.snapVerticalRlEdgeMaskWidths({
			left: 0,
			right: 0
		}, 323, {
			nextPageStep: 1296,
			previousPageStep: 1296,
			rightMaxMask: 323,
			allowRawLeftMask: true,
			forceRawLeftMask: true
		});

		assert.equal(maskWidths.left, 16);
		assert.equal(maskWidths.right, 0);
	});

	it("does not right-mask content that was hidden by the previous page left edge mask", function() {
		let manager = createManagerAtLogicalOffset(0);

		manager.layout.effectivePageAdvance = 260;
		manager.layout.delta = 260;
		manager.layout.pageBoundaryShift = 0;
		manager.views.first = function() {
			return {
				width: function() {
					return 820;
				},
				contents: {
					writingMode: function() {
						return "vertical-rl";
					}
				}
			};
		};
		manager.scrollToLogicalPage(1);

		let maskWidths = manager.getVerticalRlEdgeMaskWidths();

		assert.equal(maskWidths.left, 40);
		assert.equal(maskWidths.right, 0);
	});

	it("adds a clean-page right mask when the final vertical-rl page duplicates a boundary line", function() {
		let manager = Object.create(DefaultViewManager.prototype);
		let textNode = {
			nodeValue: "在社交媒體與短影音盛行的時代，人們容易習慣快速、碎片化的資訊",
			parentElement: {}
		};
		let yielded = false;

		manager.container = {
			clientWidth: 1296,
			scrollWidth: 2574,
			scrollLeft: -1278,
			getBoundingClientRect: function() {
				return {
					left: 225,
					right: 1521,
					width: 1296,
					height: 761
				};
			}
		};
		manager.layout = {
			name: "reflowable",
			pageWidth: 1296,
			width: 1296,
			effectivePageAdvance: 1296,
			delta: 1296,
			pageBoundaryShift: 0,
			edgeGuardPx: 0
		};
		manager.settings = {
			axis: "horizontal",
			direction: "rtl",
			rtlScrollType: "negative",
			writingMode: "vertical-rl"
		};
		manager.isPaginated = true;
		manager.isRtlVerticalPaginated = function() {
			return true;
		};
		manager.views = {
			first: function() {
				return {
					width: function() {
						return 2574;
					},
					_contentWidth: 2574,
					iframe: {
						getBoundingClientRect: function() {
							return {
								left: 225,
								right: 2799,
								width: 2574
							};
						}
					},
					contents: {
						window: {
							getComputedStyle: function() {
								return {
									display: "block",
									visibility: "visible"
								};
							}
						},
						document: {
							body: {},
							createTreeWalker: function() {
								return {
									nextNode: function() {
										if (yielded) {
											return null;
										}
										yielded = true;
										return textNode;
									}
								};
							},
							createRange: function() {
								return {
									selectNodeContents: function() {},
									getClientRects: function() {
										return [{
											left: 1279.9005126953125,
											right: 1302.6278076171875,
											width: 22.727294921875,
											height: 740
										}];
									},
									detach: function() {}
								};
							}
						}
					}
				};
			},
			last: function() {
				return this.first();
			}
		};

		let maskWidths = manager.getVerticalRlEdgeMaskWidths();

		assert.equal(maskWidths.left, 0);
		assert.equal(maskWidths.right, 18);
	});

	it("does not clean-page right-mask a boundary line that the previous page barely exposes", function() {
		let manager = Object.create(DefaultViewManager.prototype);
		let textNode = {
			nodeValue: "我家會有一個神龕這件事情，讓我覺得不可思議，但更不可思議",
			parentElement: {}
		};
		let yielded = false;
		let rawLeft = 23328.067459106445;
		let rawRight = 24624.061721801758;
		let previousPageStep = 1295.9942626953125;

		manager.container = {
			getBoundingClientRect: function() {
				return {
					left: rawLeft,
					right: rawRight,
					width: rawRight - rawLeft,
					height: 761
				};
			}
		};
		manager.layout = {
			edgeGuardPx: 0
		};
		manager.views = {
			first: function() {
				return {
					iframe: {
						getBoundingClientRect: function() {
							return {
								left: 0,
								right: 27215.87890625,
								width: 27215.87890625
							};
						}
					},
					contents: {
						window: {
							getComputedStyle: function() {
								return {
									display: "block",
									visibility: "visible"
								};
							}
						},
						document: {
							body: {},
							createTreeWalker: function() {
								return {
									nextNode: function() {
										if (yielded) {
											return null;
										}
										yielded = true;
										return textNode;
									}
								};
							},
							createRange: function() {
								return {
									selectNodeContents: function() {},
									getClientRects: function() {
										return [{
											left: 24603.166015625,
											right: 24625.89453125,
											width: 22.728515625,
											height: 700
										}];
									},
									detach: function() {}
								};
							}
						}
					}
				};
			},
			last: function() {
				return this.first();
			}
		};

		let maskWidths = manager.snapVerticalRlEdgeMaskWidths({
			left: 0,
			right: 0
		}, 323, {
			rawLeft,
			rawRight,
			previousPageStep,
			nextPageStep: previousPageStep,
			rightMaxMask: 323,
			allowRawRightMask: true
		});

		assert.equal(maskWidths.left, 0);
		assert.equal(maskWidths.right, 0);
	});

	it("does not add a right edge mask on the first vertical-rl page", function() {
		let manager = createManagerAtLogicalOffset(0);

		assert.equal(manager.getVerticalRlEdgeMaskWidths().right, 0);
	});

	it("covers sub-pixel vertical-rl viewport edges with the mask overlay", function() {
		let manager = Object.create(DefaultViewManager.prototype);
		let parent = document.createElement("div");
		let container = document.createElement("div");

		parent.appendChild(container);
		document.body.appendChild(parent);

		parent.getBoundingClientRect = function() {
			return {
				left: 341.9602,
				top: 67.9971,
				width: 1062.4431,
				height: 708.7358
			};
		};
		container.getBoundingClientRect = function() {
			return {
				left: 341.9602,
				top: 67.9971,
				width: 1062.4431,
				height: 708.7358
			};
		};
		manager.container = container;
		manager.getVerticalRlEdgeMaskWidths = function() {
			return {
				left: 16,
				right: 14
			};
		};
		manager.getVerticalRlEdgeMaskColor = function() {
			return "rgb(255, 255, 255)";
		};

		manager.syncVerticalRlViewportClip();

		let overlay = parent.querySelector(".epub-vrl-edge-mask");
		assert.equal(overlay.style.width, "1064px");
		assert.equal(overlay.style.height, "710px");
		assert.equal(container.dataset.epubVrlEdgeMaskRight, "14");

		parent.remove();
	});

	it("caps right edge snapping to the previous visible page overlap", function() {
		let manager = Object.create(DefaultViewManager.prototype);
		let textNode = {
			nodeValue: "議題、學術研究與發現，不會給出簡單的答案",
			parentElement: {}
		};
		let yielded = false;

		manager.container = {
			getBoundingClientRect: function() {
				return {
					left: 342,
					right: 1404
				};
			}
		};
		manager.views = {
			first: function() {
				return {
					iframe: {
						getBoundingClientRect: function() {
							return {
								left: 0
							};
						}
					},
					contents: {
						window: {
							getComputedStyle: function() {
								return {
									display: "block",
									visibility: "visible"
								};
							}
						},
						document: {
							body: {},
							createTreeWalker: function() {
								return {
									nextNode: function() {
										if (yielded) {
											return null;
										}
										yielded = true;
										return textNode;
									}
								};
							},
							createRange: function() {
								return {
									selectNodeContents: function() {},
									getClientRects: function() {
										return [{
											left: 1378,
											right: 1422,
											width: 44,
											height: 680
										}];
									},
									detach: function() {}
								};
							}
						}
					}
				};
			},
			last: function() {
				return this.first();
			}
		};

		let maskWidths = manager.snapVerticalRlEdgeMaskWidths({
			left: 18,
			right: 2
		}, 120, {
			rightMaxMask: 2
		});

		assert.equal(maskWidths.left, 18);
		assert.equal(maskWidths.right, 2);
	});

	it("uses the snapped previous page left mask when calculating current right overlap", function() {
		let manager = Object.create(DefaultViewManager.prototype);
		let textNode = {
			nodeValue: "議題、學術研究與發現，不會給出簡單的答案",
			parentElement: {}
		};
		let yielded = false;

		manager.container = {
			clientWidth: 1062,
			getBoundingClientRect: function() {
				return {
					left: 342,
					right: 1404
				};
			}
		};
		manager.layout = {
			edgeGuardPx: 2
		};
		manager.views = {
			first: function() {
				return {
					iframe: {
						getBoundingClientRect: function() {
							return {
								left: -726
							};
						}
					},
					contents: {
						window: {
							getComputedStyle: function() {
								return {
									display: "block",
									visibility: "visible"
								};
							}
						},
						document: {
							body: {},
							createTreeWalker: function() {
								return {
									nextNode: function() {
										if (yielded) {
											return null;
										}
										yielded = true;
										return textNode;
									}
								};
							},
							createRange: function() {
								return {
									selectNodeContents: function() {},
									getClientRects: function() {
										return [{
											left: 2106.3,
											right: 2126.3,
											width: 20,
											height: 680
										}];
									},
									detach: function() {}
								};
							}
						}
					}
				};
			},
			last: function() {
				return this.first();
			}
		};
		manager.isRtlVerticalPaginated = function() {
			return true;
		};
		manager.getPageAdvance = function() {
			return 1044;
		};
		manager.getTotalPagesForCurrentView = function() {
			return 3;
		};
		manager.getCurrentPageIndex = function() {
			return 1;
		};
		manager.getMaxLogicalScrollLeft = function() {
			return 2040;
		};
		manager.getLogicalOffsetForPageIndex = function(pageIndex) {
			return pageIndex * 1020;
		};
		manager.getLogicalPageStepToNextPage = function() {
			return 1020;
		};

		let maskWidths = manager.getVerticalRlEdgeMaskWidths();

		assert.equal(maskWidths.left, 18);
		assert.equal(maskWidths.right, 2);
	});

	it("does not hide a previous-page clipped line again at the current right edge", function() {
		let manager = Object.create(DefaultViewManager.prototype);
		let textNode = {
			nodeValue: "樣。難怪義大利人喜歡用水果來配甜點。即使是凝膠冰糕（Gelato）──過去對義大利",
			parentElement: {}
		};
		let yielded = false;

		manager.container = {
			clientWidth: 1320,
			getBoundingClientRect: function() {
				return {
					left: 213.1818,
					right: 1533.1818
				};
			}
		};
		manager.layout = {
			effectivePageAdvance: 1296,
			delta: 1296,
			pageWidth: 1320,
			pageBoundaryShift: 6,
			edgeGuardPx: 4
		};
		manager.views = {
			first: function() {
				return {
					iframe: {
						getBoundingClientRect: function() {
							return {
								left: -6272.4429
							};
						}
					},
					contents: {
						window: {
							getComputedStyle: function() {
								return {
									display: "block",
									visibility: "visible"
								};
							}
						},
						document: {
							body: {},
							createTreeWalker: function() {
								return {
									nextNode: function() {
										if (yielded) {
											return null;
										}
										yielded = true;
										return textNode;
									}
								};
							},
							createRange: function() {
								return {
									selectNodeContents: function() {},
									getClientRects: function() {
										return [{
											left: 7783.0962,
											right: 7805.8237,
											width: 22.73,
											height: 693.31
										}];
									},
									detach: function() {}
								};
							}
						}
					}
				};
			},
			last: function() {
				return this.first();
			}
		};
		manager.isRtlVerticalPaginated = function() {
			return true;
		};
		manager.getPageAdvance = function() {
			return 1296;
		};
		manager.getTotalPagesForCurrentView = function() {
			return 8;
		};
		manager.getCurrentPageIndex = function() {
			return 2;
		};
		manager.getMaxLogicalScrollLeft = function() {
			return 9072;
		};
		manager.getLogicalOffsetForPageIndex = function(pageIndex) {
			if (pageIndex <= 0) {
				return 0;
			}
			if (pageIndex === 1) {
				return 1290;
			}
			if (pageIndex === 2) {
				return 2586.3635;
			}

			return pageIndex * 1296 - 6;
		};
		manager.getLogicalPageStepToNextPage = function() {
			return 1296;
		};

		let maskWidths = manager.getVerticalRlEdgeMaskWidths();

		assert.equal(maskWidths.left, 24);
		assert.equal(maskWidths.right, 0);
	});

		it("shrinks the right vertical-rl edge mask when the previous raw left edge already clipped the line", function() {
			let manager = Object.create(DefaultViewManager.prototype);
			let textNode = {
				nodeValue: "編按：香醋（Aceto balsamico），是一種義大利調味品，又名義大利黑醋或巴薩米克醋。",
			parentElement: {}
		};
		let yielded = false;

		manager.container = {
			getBoundingClientRect: function() {
				return {
					left: 213.1818,
					right: 1533.1818
				};
			}
		};
		manager.layout = {
			edgeGuardPx: 4
		};
		manager.views = {
			first: function() {
				return {
					iframe: {
						getBoundingClientRect: function() {
							return {
								left: 212.4574
							};
						}
					},
					contents: {
						window: {
							getComputedStyle: function() {
								return {
									display: "block",
									visibility: "visible"
								};
							}
						},
						document: {
							body: {},
							createTreeWalker: function() {
								return {
									nextNode: function() {
										if (yielded) {
											return null;
										}
										yielded = true;
										return textNode;
									}
								};
							},
							createRange: function() {
								return {
									selectNodeContents: function() {},
									getClientRects: function() {
										return [{
											left: 1298.708,
											right: 1321.435,
											width: 22.727,
											height: 696.747
										}];
									},
									detach: function() {}
								};
							}
						}
					}
				};
			},
			last: function() {
				return this.first();
			}
		};
		manager.getLogicalPageStepToNextPage = function() {
			return 0;
		};

		let maskWidths = manager.snapVerticalRlEdgeMaskWidths({
			left: 24,
			right: 6
		}, 120, {
			previousPageStep: 1313.636,
			rightMaxMask: 6
		});

			assert.equal(maskWidths.left, 24);
			assert.equal(maskWidths.right, 0);
		});

		it("expands the left vertical-rl edge mask when the mask boundary would slice a visible line", function() {
			let manager = Object.create(DefaultViewManager.prototype);
			let textNode = {
				nodeValue: "燙的。最適合用來炸櫛瓜花的油是花生油或葵花油。",
				parentElement: {}
			};
			let yielded = false;

			manager.container = {
				getBoundingClientRect: function() {
					return {
						left: 213.1818,
						right: 1533.1818
					};
				}
			};
			manager.layout = {
				edgeGuardPx: 4
			};
			manager.views = {
				first: function() {
					return {
						iframe: {
							getBoundingClientRect: function() {
								return {
									left: -6284.8149
								};
							}
						},
						contents: {
							window: {
								getComputedStyle: function() {
									return {
										display: "block",
										visibility: "visible"
									};
								}
							},
							document: {
								body: {},
								createTreeWalker: function() {
									return {
										nextNode: function() {
											if (yielded) {
												return null;
											}
											yielded = true;
											return textNode;
										}
									};
								},
								createRange: function() {
									return {
										selectNodeContents: function() {},
										getClientRects: function() {
											return [{
												left: 6502.088,
												right: 6524.815,
												width: 22.727,
												height: 460
											}];
										},
										detach: function() {}
									};
								}
							}
						}
					};
				},
				last: function() {
					return this.first();
				}
			};
			manager.getLogicalPageStepToNextPage = function() {
				return 1296.363;
			};

			let maskWidths = manager.snapVerticalRlEdgeMaskWidths({
				left: 24,
				right: 0
			}, 120, {
				rightMaxMask: 0
			});

			assert.equal(maskWidths.left, 28);
			assert.equal(maskWidths.right, 0);
		});

		it("adds a small right vertical-rl paint guard for a line starting just outside the raw viewport", function() {
			let manager = Object.create(DefaultViewManager.prototype);
			let textNode = {
				nodeValue: "買得到的話，新鮮的牛肝菌猶如一頓盛宴。",
				parentElement: {}
			};
			let yielded = false;

			manager.container = {
				getBoundingClientRect: function() {
					return {
						left: 213.1818,
						right: 1533.1818
					};
				}
			};
			manager.layout = {
				edgeGuardPx: 4
			};
			manager.views = {
				first: function() {
					return {
						iframe: {
							getBoundingClientRect: function() {
								return {
									left: -7581.1787
								};
							}
						},
						contents: {
							window: {
								getComputedStyle: function() {
									return {
										display: "block",
										visibility: "visible"
									};
								}
							},
							document: {
								body: {},
								createTreeWalker: function() {
									return {
										nextNode: function() {
											if (yielded) {
												return null;
											}
											yielded = true;
											return textNode;
										}
									};
								},
								createRange: function() {
									return {
										selectNodeContents: function() {},
										getClientRects: function() {
											return [{
												left: 9114.701,
												right: 9137.429,
												width: 22.728,
												height: 700
											}];
										},
										detach: function() {}
									};
								}
							}
						}
					};
				},
				last: function() {
					return this.first();
				}
			};
			manager.getLogicalPageStepToNextPage = function() {
				return 1296.363;
			};

			let maskWidths = manager.snapVerticalRlEdgeMaskWidths({
				left: 24,
				right: 0
			}, 120, {
				rightMaxMask: 0
			});

		assert.equal(maskWidths.left, 24);
		assert.equal(maskWidths.right, 4);
	});

	it("covers the visible part of a right vertical-rl line clipped by the raw viewport", function() {
		let manager = Object.create(DefaultViewManager.prototype);
		let textNode = {
			nodeValue: "把麵糊舀在水果上面，放入烤箱中，以三百度烤大約三十分鐘。",
			parentElement: {}
		};
		let yielded = false;

		manager.container = {
			getBoundingClientRect: function() {
				return {
					left: 213.1818,
					right: 1533.1818
				};
			}
		};
		manager.layout = {
			edgeGuardPx: 0
		};
		manager.views = {
			first: function() {
				return {
					iframe: {
						getBoundingClientRect: function() {
							return {
								left: -7581.1787
							};
						}
					},
					contents: {
						window: {
							getComputedStyle: function() {
								return {
									display: "block",
									visibility: "visible"
								};
							}
						},
						document: {
							body: {},
							createTreeWalker: function() {
								return {
									nextNode: function() {
										if (yielded) {
											return null;
										}
										yielded = true;
										return textNode;
									}
								};
							},
							createRange: function() {
								return {
									selectNodeContents: function() {},
									getClientRects: function() {
										return [{
											left: 1522.6846,
											right: 1545.4119,
											width: 22.727,
											height: 700
										}];
									},
									detach: function() {}
								};
							}
						}
					}
				};
			},
			last: function() {
				return this.first();
			}
		};
		manager.getLogicalPageStepToNextPage = function() {
			return 1296.363;
		};

		let maskWidths = manager.snapVerticalRlEdgeMaskWidths({
			left: 24,
			right: 4
		}, 120, {
			previousPageStep: 1296.363,
			rightMaxMask: 4
		});

		assert.equal(maskWidths.left, 24);
		assert.equal(maskWidths.right, 12);
	});

	it("expands the right vertical-rl edge mask from zero for a runtime viewport-coordinate straddler", function() {
		let manager = Object.create(DefaultViewManager.prototype);
		let textNode = {
			nodeValue: "把麵糊舀在水果上面，放入烤箱中，以三百度烤大約三十分鐘。",
			parentElement: {}
		};
		let yielded = false;

		manager.container = {
			getBoundingClientRect: function() {
				return {
					left: 213.1818,
					right: 1533.1818
				};
			}
		};
		manager.layout = {
			edgeGuardPx: 4
		};
		manager.views = {
			first: function() {
				return {
					iframe: {
						getBoundingClientRect: function() {
							return {
								left: -8876.6328
							};
						}
					},
					contents: {
						window: {
							getComputedStyle: function() {
								return {
									display: "block",
									visibility: "visible"
								};
							}
						},
						document: {
							body: {},
							createTreeWalker: function() {
								return {
									nextNode: function() {
										if (yielded) {
											return null;
										}
										yielded = true;
										return textNode;
									}
								};
							},
							createRange: function() {
								return {
									selectNodeContents: function() {},
									getClientRects: function() {
										return [{
											left: 1522.6846,
											right: 1545.4119,
											width: 22.7273,
											height: 680
										}, {
											left: 1486.6903,
											right: 1509.4176,
											width: 22.7273,
											height: 60
										}];
									},
									detach: function() {}
								};
							}
						}
					}
				};
			},
			last: function() {
				return this.first();
			}
		};
		manager.getLogicalPageStepToNextPage = function() {
			return 1296;
		};

		let maskWidths = manager.snapVerticalRlEdgeMaskWidths({
			left: 24,
			right: 0
		}, 324, {
			previousPageStep: 1296,
			rightMaxMask: 0
		});

		assert.equal(maskWidths.left, 24);
		assert.equal(maskWidths.right, 12);
	});

	it("keeps the right vertical-rl edge mask when a previous-page line also crosses the boundary", function() {
		let manager = Object.create(DefaultViewManager.prototype);
		let previousLineNode = {
			nodeValue: "把兩塊沾有橄欖油的雞胸肉整塊放入用油抹過的煎鍋中。",
			parentElement: {}
		};
		let straddlingNode = {
			nodeValue: "把麵糊舀在水果上面，放入烤箱中，以三百度烤大約三十分鐘。",
			parentElement: {}
		};
		let nodes = [previousLineNode, straddlingNode];

		manager.container = {
			getBoundingClientRect: function() {
				return {
					left: 213.1818,
					right: 1533.1818
				};
			}
		};
		manager.layout = {
			edgeGuardPx: 4
		};
		manager.views = {
			first: function() {
				return {
					iframe: {
						getBoundingClientRect: function() {
							return {
								left: -10172.9971
							};
						}
					},
					contents: {
						window: {
							getComputedStyle: function() {
								return {
									display: "block",
									visibility: "visible"
								};
							}
						},
						document: {
							body: {},
							createTreeWalker: function() {
								return {
									nextNode: function() {
										return nodes.shift() || null;
									}
								};
							},
							createRange: function() {
								let selectedNode;
								return {
									selectNodeContents: function(node) {
										selectedNode = node;
									},
									getClientRects: function() {
										if (selectedNode === previousLineNode) {
											return [{
												left: 1502.3289,
												right: 1525.0569,
												width: 22.728,
												height: 680
											}];
										}

										return [{
											left: 1522.6846,
											right: 1545.4119,
											width: 22.7273,
											height: 680
										}, {
											left: 1486.6903,
											right: 1509.4176,
											width: 22.7273,
											height: 60
										}];
									},
									detach: function() {}
								};
							}
						}
					}
				};
			},
			last: function() {
				return this.first();
			}
		};
		manager.getLogicalPageStepToNextPage = function() {
			return 1296;
		};

		let maskWidths = manager.snapVerticalRlEdgeMaskWidths({
			left: 7,
			right: 0
		}, 324, {
			previousPageStep: 1296,
			rightMaxMask: 0
		});

		assert.equal(maskWidths.left, 7);
		assert.equal(maskWidths.right, 12);
	});

	it("keeps the required right vertical-rl edge mask from the full width calculation", function() {
		let manager = Object.create(DefaultViewManager.prototype);
		let previousLineNode = {
			nodeValue: "把麵糊舀在水果上面，放入烤箱中，以三百度烤大約三十分鐘。",
			parentElement: {}
		};
		let straddlingNode = {
			nodeValue: "把麵糊舀在水果上面，放入烤箱中，以三百度烤大約三十分鐘。",
			parentElement: {}
		};

		manager.container = {
			clientWidth: 1320,
			scrollWidth: 18168,
			scrollLeft: -6461.8179,
			getBoundingClientRect: function() {
				return {
					left: 213.1818,
					right: 1533.1818
				};
			}
		};
		manager.layout = {
			effectivePageAdvance: 1296,
			delta: 1296,
			pageWidth: 1320,
			width: 1320,
			pageBoundaryShift: 18,
			edgeGuardPx: 4,
			count: function(totalLength, pageLength) {
				let pages = Math.max(1, Math.ceil(totalLength / pageLength));
				return { pages, spreads: pages };
			}
		};
		manager.settings = {
			axis: "horizontal",
			direction: "rtl",
			rtlScrollType: "negative",
			writingMode: "vertical-rl"
		};
		manager.views = {
			first: function() {
				return {
					width: function() {
						return 18168;
					},
					iframe: {
						getBoundingClientRect: function() {
							return {
								left: -10172.9971
							};
						}
					},
					contents: {
						writingMode: function() {
							return "vertical-rl";
						},
						window: {
							getComputedStyle: function() {
								return {
									display: "block",
									visibility: "visible"
								};
							}
						},
						document: {
							body: {},
							createTreeWalker: function() {
								let nodes = [straddlingNode, previousLineNode];
								return {
									nextNode: function() {
										return nodes.shift() || null;
									}
								};
							},
							createRange: function() {
								let selectedNode;
								return {
									selectNodeContents: function(node) {
										selectedNode = node;
									},
									getClientRects: function() {
										if (selectedNode === previousLineNode) {
											return [{
												left: 1486.6903,
												right: 1509.4176,
												width: 22.7273,
												height: 60
											}];
										}

										return [{
											left: 1522.6846,
											right: 1545.4119,
											width: 22.7273,
											height: 680
										}];
									},
									detach: function() {}
								};
							}
						}
					}
				};
			},
			last: function() {
				return this.first();
			}
		};
		manager.isPaginated = true;

		let maskWidths = manager.getVerticalRlEdgeMaskWidths();

		assert.equal(maskWidths.left, 24);
		assert.equal(maskWidths.right, 12);
	});

	it("does not expand the right vertical-rl edge mask into a raw viewport boundary line box", function() {
		let manager = Object.create(DefaultViewManager.prototype);
		let textNode = {
			nodeValue: "編按：香醋（Aceto balsamico），是一種義大利調味品，又名義大利黑醋或巴薩米克醋。",
			parentElement: {}
		};
		let yielded = false;

		manager.container = {
			getBoundingClientRect: function() {
				return {
					left: 213.1818,
					right: 1533.1818
				};
			}
		};
		manager.layout = {
			edgeGuardPx: 4
		};
		manager.views = {
			first: function() {
				return {
					iframe: {
						getBoundingClientRect: function() {
							return {
								left: 212.4574
							};
						}
					},
					contents: {
						window: {
							getComputedStyle: function() {
								return {
									display: "block",
									visibility: "visible"
								};
							}
						},
						document: {
							body: {},
							createTreeWalker: function() {
								return {
									nextNode: function() {
										if (yielded) {
											return null;
										}
										yielded = true;
										return textNode;
									}
								};
							},
							createRange: function() {
								return {
									selectNodeContents: function() {},
									getClientRects: function() {
										return [{
											left: 1298.708,
											right: 1321.435,
											width: 22.727,
											height: 696.747
										}];
									},
									detach: function() {}
								};
							}
						}
					}
				};
			},
			last: function() {
				return this.first();
			}
		};
		manager.getLogicalPageStepToNextPage = function() {
			return 0;
		};

		let maskWidths = manager.snapVerticalRlEdgeMaskWidths({
			left: 24,
			right: 0
		}, 120, {
			rightMaxMask: 6
		});

		assert.equal(maskWidths.left, 24);
		assert.equal(maskWidths.right, 0);
	});

	it("shrinks the right vertical-rl edge mask when it would consume the visible boundary sliver", function() {
		let manager = Object.create(DefaultViewManager.prototype);
		let textNode = {
			nodeValue: "做得好的話，這道菜會非常、非常美味；但做得不好的話（把櫛瓜花炸軟掉的話），它就會超級難吃。",
			parentElement: {}
		};
		let yielded = false;

		manager.container = {
			getBoundingClientRect: function() {
				return {
					left: 213.1818,
					right: 1533.1818
				};
			}
		};
		manager.layout = {
			edgeGuardPx: 4
		};
		manager.views = {
			first: function() {
				return {
					iframe: {
						getBoundingClientRect: function() {
							return {
								left: -4988.4517
							};
						}
					},
					contents: {
						window: {
							getComputedStyle: function() {
								return {
									display: "block",
									visibility: "visible"
								};
							}
						},
						document: {
							body: {},
							createTreeWalker: function() {
								return {
									nextNode: function() {
										if (yielded) {
											return null;
										}
										yielded = true;
										return textNode;
									}
								};
							},
							createRange: function() {
								return {
									selectNodeContents: function() {},
									getClientRects: function() {
										return [{
											left: 6502.088,
											right: 6524.815,
											width: 22.727,
											height: 680
										}];
									},
									detach: function() {}
								};
							}
						}
					}
				};
			},
			last: function() {
				return this.first();
			}
		};
		manager.getLogicalPageStepToNextPage = function() {
			return 0;
		};

		let maskWidths = manager.snapVerticalRlEdgeMaskWidths({
			left: 15,
			right: 21
		}, 120, {
			rightMaxMask: 21
		});

		assert.equal(maskWidths.left, 15);
		assert.equal(maskWidths.right, 0);
	});

	it("does not re-expand the right vertical-rl edge mask after shrinking a visible boundary sliver", function() {
		let manager = Object.create(DefaultViewManager.prototype);
		let textNode = {
			nodeValue: "雖然鼠尾草常常會帶有綠色的粉塵，讓人打噴嚏，但新鮮的鼠尾草所散發的強烈香味，卻能讓人食指大動。",
			parentElement: {}
		};
		let yielded = false;

		manager.container = {
			getBoundingClientRect: function() {
				return {
					left: 213.1818,
					right: 1533.1818
				};
			}
		};
		manager.layout = {
			edgeGuardPx: 4
		};
		manager.views = {
			first: function() {
				return {
					iframe: {
						getBoundingClientRect: function() {
							return {
								left: -3692.9971
							};
						}
					},
					contents: {
						window: {
							getComputedStyle: function() {
								return {
									display: "block",
									visibility: "visible"
								};
							}
						},
						document: {
							body: {},
							createTreeWalker: function() {
								return {
									nextNode: function() {
										if (yielded) {
											return null;
										}
										yielded = true;
										return textNode;
									}
								};
							},
							createRange: function() {
								return {
									selectNodeContents: function() {},
									getClientRects: function() {
										return [{
											left: 5218.2813,
											right: 5241.0083,
											width: 22.727,
											height: 680
										}];
									},
									detach: function() {}
								};
							}
						}
					}
				};
			},
			last: function() {
				return this.first();
			}
		};
		manager.getLogicalPageStepToNextPage = function() {
			return 0;
		};

		let maskWidths = manager.snapVerticalRlEdgeMaskWidths({
			left: 24,
			right: 9
		}, 120, {
			rightMaxMask: 9
		});

		assert.equal(maskWidths.left, 24);
		assert.equal(maskWidths.right, 0);
	});

	it("shrinks the left vertical-rl edge mask to preserve a full line box", function() {
		let manager = Object.create(DefaultViewManager.prototype);
		let textNode = {
			nodeValue: "義大利是我心靈的磁場指針",
			parentElement: {}
		};
		let yielded = false;

		manager.container = {
			getBoundingClientRect: function() {
				return {
					left: 100,
					right: 1162
				};
			}
		};
		manager.views = {
			first: function() {
				return {
					iframe: {
						getBoundingClientRect: function() {
							return {
								left: 0
							};
						}
					},
					contents: {
						window: {
							getComputedStyle: function() {
								return {
									display: "block",
									visibility: "visible"
								};
							}
						},
						document: {
							body: {},
							createTreeWalker: function() {
								return {
									nextNode: function() {
										if (yielded) {
											return null;
										}
										yielded = true;
										return textNode;
									}
								};
							},
							createRange: function() {
								return {
									selectNodeContents: function() {},
									getClientRects: function() {
										return [{
											left: 102,
											right: 122,
											width: 20,
											height: 600
										}];
									},
									detach: function() {}
								};
							}
						}
					}
				};
			},
			last: function() {
				return this.first();
			}
		};

		let maskWidths = manager.snapVerticalRlEdgeMaskWidths({
			left: 18,
			right: 0
		}, 120);

		assert.equal(maskWidths.left, 1);
		assert.equal(maskWidths.right, 0);
	});

	it("shrinks a left mask that fully hides a vertical-rl line box", function() {
		let manager = Object.create(DefaultViewManager.prototype);
		let textNode = {
			nodeValue: "櫥裡，把我的藏書擺放在面向山谷的一扇窗戶下方",
			parentElement: {}
		};
		let yielded = false;

		manager.container = {
			getBoundingClientRect: function() {
				return {
					left: 100,
					right: 1162
				};
			}
		};
		manager.views = {
			first: function() {
				return {
					iframe: {
						getBoundingClientRect: function() {
							return {
								left: 0
							};
						}
					},
					contents: {
						window: {
							getComputedStyle: function() {
								return {
									display: "block",
									visibility: "visible"
								};
							}
						},
						document: {
							body: {},
							createTreeWalker: function() {
								return {
									nextNode: function() {
										if (yielded) {
											return null;
										}
										yielded = true;
										return textNode;
									}
								};
							},
							createRange: function() {
								return {
									selectNodeContents: function() {},
									getClientRects: function() {
										return [{
											left: 101,
											right: 121,
											width: 20,
											height: 680
										}];
									},
									detach: function() {}
								};
							}
						}
					}
				};
			},
			last: function() {
				return this.first();
			}
		};

		let maskWidths = manager.snapVerticalRlEdgeMaskWidths({
			left: 22,
			right: 0
		}, 120);

		assert.equal(maskWidths.left, 0);
		assert.equal(maskWidths.right, 0);
	});

	it("shrinks a left mask for a line box that straddles the raw left edge", function() {
		let manager = Object.create(DefaultViewManager.prototype);
		let textNode = {
			nodeValue: "那樣，我的姊妹、朋友、家人來看我",
			parentElement: {}
		};
		let yielded = false;

		manager.container = {
			getBoundingClientRect: function() {
				return {
					left: 342,
					right: 1404
				};
			}
		};
		manager.layout = {
			effectivePageAdvance: 1044
		};
		manager.views = {
			first: function() {
				return {
					iframe: {
						getBoundingClientRect: function() {
							return {
								left: 0
							};
						}
					},
					contents: {
						window: {
							getComputedStyle: function() {
								return {
									display: "block",
									visibility: "visible"
								};
							}
						},
						document: {
							body: {},
							createTreeWalker: function() {
								return {
									nextNode: function() {
										if (yielded) {
											return null;
										}
										yielded = true;
										return textNode;
									}
								};
							},
							createRange: function() {
								return {
									selectNodeContents: function() {},
									getClientRects: function() {
										return [{
											left: 340.8,
											right: 360.8,
											width: 20,
											height: 680
										}];
									},
									detach: function() {}
								};
							}
						}
					}
				};
			},
			last: function() {
				return this.first();
			}
		};

		let maskWidths = manager.snapVerticalRlEdgeMaskWidths({
			left: 20,
			right: 0
		}, 120);

		assert.equal(maskWidths.left, 0);
		assert.equal(maskWidths.right, 0);
	});

	it("keeps a left mask when the straddling line is visible on the next page", function() {
		let manager = Object.create(DefaultViewManager.prototype);
		let textNode = {
			nodeValue: "「這是很普通的事情，」他說",
			parentElement: {}
		};
		let yielded = false;

		manager.container = {
			getBoundingClientRect: function() {
				return {
					left: 342,
					right: 1404
				};
			}
		};
		manager.layout = {
			effectivePageAdvance: 1000
		};
		manager.views = {
			first: function() {
				return {
					iframe: {
						getBoundingClientRect: function() {
							return {
								left: 0
							};
						}
					},
					contents: {
						window: {
							getComputedStyle: function() {
								return {
									display: "block",
									visibility: "visible"
								};
							}
						},
						document: {
							body: {},
							createTreeWalker: function() {
								return {
									nextNode: function() {
										if (yielded) {
											return null;
										}
										yielded = true;
										return textNode;
									}
								};
							},
							createRange: function() {
								return {
									selectNodeContents: function() {},
									getClientRects: function() {
										return [{
											left: 340.8,
											right: 360.8,
											width: 20,
											height: 680
										}];
									},
									detach: function() {}
								};
							}
						}
					}
				};
			},
			last: function() {
				return this.first();
			}
		};

		let maskWidths = manager.snapVerticalRlEdgeMaskWidths({
			left: 20,
			right: 0
		}, 120);

		assert.equal(maskWidths.left, 20);
		assert.equal(maskWidths.right, 0);
	});

	it("expands a rendered left mask to cover the full visible vertical line", function() {
		let manager = Object.create(DefaultViewManager.prototype);
		let textNode = {
			nodeValue: "經過一番清洗以後，空蕩蕩的房子變得寬敞而爽淨",
			parentElement: {}
		};
		let yielded = false;

		manager.container = {
			getBoundingClientRect: function() {
				return {
					left: 225.1846,
					right: 1521.1789
				};
			}
		};
		manager.getPageAdvance = function() {
			return 1296;
		};
		manager.views = {
			first: function() {
				return {
					iframe: {
						getBoundingClientRect: function() {
							return {
								left: 0
							};
						}
					},
					contents: {
						window: {
							getComputedStyle: function() {
								return {
									display: "block",
									visibility: "visible"
								};
							}
						},
						document: {
							body: {},
							createTreeWalker: function() {
								return {
									nextNode: function() {
										if (yielded) {
											return null;
										}
										yielded = true;
										return textNode;
									}
								};
							},
							createRange: function() {
								return {
									selectNodeContents: function() {},
									getClientRects: function() {
										return [{
											left: 225.1709,
											right: 247.8975,
											width: 22.7266,
											height: 740
										}];
									},
									detach: function() {}
								};
							}
						}
					}
				};
			},
			last: function() {
				return this.first();
			}
		};

		let maskWidths = manager.expandVerticalRlLeftMaskToVisibleLine({
			left: 11,
			right: 0
		});

		assert.equal(maskWidths.left, 24);
		assert.equal(maskWidths.right, 0);
	});

	it("expands a left mask for a near-boundary line visible on the next page", function() {
		let manager = Object.create(DefaultViewManager.prototype);
		let textNode = {
			nodeValue: "議題、學術研究與發現，不會給出簡單的答案",
			parentElement: {}
		};
		let yielded = false;

		manager.container = {
			getBoundingClientRect: function() {
				return {
					left: 341.9602,
					right: 1404.4033
				};
			}
		};
		manager.layout = {
			edgeGuardPx: 2
		};
		manager.getLogicalPageStepToNextPage = function() {
			return 1020;
		};
		manager.views = {
			first: function() {
				return {
					iframe: {
						getBoundingClientRect: function() {
							return {
								left: 0
							};
						}
					},
					contents: {
						window: {
							getComputedStyle: function() {
								return {
									display: "block",
									visibility: "visible"
								};
							}
						},
						document: {
							body: {},
							createTreeWalker: function() {
								return {
									nextNode: function() {
										if (yielded) {
											return null;
										}
										yielded = true;
										return textNode;
									}
								};
							},
							createRange: function() {
								return {
									selectNodeContents: function() {},
									getClientRects: function() {
										return [{
											left: 360.2699,
											right: 380.2699,
											width: 20,
											height: 680
										}];
									},
									detach: function() {}
								};
							}
						}
					}
				};
			},
			last: function() {
				return this.first();
			}
		};

		let maskWidths = manager.snapVerticalRlEdgeMaskWidths({
			left: 18,
			right: 0
		}, 120);

		assert.equal(maskWidths.left, 40);
		assert.equal(maskWidths.right, 0);
	});

	it("keeps a penultimate-page left mask when the final vertical-rl page will own the raw edge line", function() {
		let manager = Object.create(DefaultViewManager.prototype);
		let textNode = {
			nodeValue: "世界上最完美的房間。",
			parentElement: {}
		};
		let yielded = false;

		manager.container = {
			getBoundingClientRect: function() {
				return {
					left: 225.1846466064453,
					right: 1521.1789093017578
				};
			}
		};
		manager.layout = {
			edgeGuardPx: 0
		};
		manager.views = {
			first: function() {
				return {
					iframe: {
						getBoundingClientRect: function() {
							return {
								left: -1091.4488525390625
							};
						}
					},
					contents: {
						window: {
							getComputedStyle: function() {
								return {
									display: "block",
									visibility: "visible"
								};
							}
						},
						document: {
							body: {},
							createTreeWalker: function() {
								return {
									nextNode: function() {
										if (yielded) {
											return null;
										}
										yielded = true;
										return textNode;
									}
								};
							},
							createRange: function() {
								return {
									selectNodeContents: function() {},
									getClientRects: function() {
										return [{
											left: 216.335205078125,
											right: 239.0625,
											width: 22.727294921875,
											height: 680
										}];
									},
									detach: function() {}
								};
							}
						}
					}
				};
			},
			last: function() {
				return this.first();
			}
		};

		let maskWidths = manager.snapVerticalRlEdgeMaskWidths({
			left: 0,
			right: 0
		}, 324, {
			nextPageStep: 1316.36328125,
			allowRawLeftMask: true
		});

		assert.equal(maskWidths.left, 15);
		assert.equal(maskWidths.right, 0);
	});

	it("propagates the vertical-rl active page width from content metrics to the layout", function() {
		let view = Object.create(IframeView.prototype);
		let updatedProps = null;
		let reframed = null;

		view.lockedWidth = 1320;
		view.lockedHeight = 761;
		view._expanding = false;
		view._needsReframe = true;
		view.iframe = {};
		view.settings = {
			axis: "horizontal",
			flow: "paginated",
			forceEvenPages: false
		};
		view.section = {
			href: "OEBPS/Text/Section0011.xhtml"
		};
		view.layout = {
			pageWidth: 1296,
			viewportPageWidth: 1320,
			effectivePageAdvance: 1296,
			delta: 1296,
			pageBoundaryShift: 0,
			edgeGuardPx: 0,
			update: function(props) {
				updatedProps = props;
			}
		};
		view.contents = {
			textWidth: function() {
				return 17172;
			},
			writingMode: function() {
				return "vertical-rl";
			},
			verticalRlPageMetrics: function(pageWidth, pageHeight) {
				assert.equal(pageWidth, 1320);
				assert.equal(pageHeight, 761);

				return {
					rawWidth: 17172,
					snappedContentWidth: 18480,
					pageWidth: 1320,
					viewportPageWidth: 1320,
					effectivePageAdvance: 1320,
					pageBoundaryShift: 0,
					edgeGuardPx: 0,
					totalPages: 14
				};
			}
		};
		view.reframe = function(width, height) {
			reframed = { width, height };
		};

		view.expand();

		assert.equal(view.layout.viewportPageWidth, 1320);
		assert.equal(view.layout.edgeGuardPx, 0);
		assert.deepEqual(updatedProps, {
			pageWidth: 1320,
			viewportPageWidth: 1320,
			delta: 1320,
			effectivePageAdvance: 1320,
			pageBoundaryShift: 0,
			edgeGuardPx: 0
		});
		assert.deepEqual(reframed, {
			width: 18480,
			height: 761
		});
	});

	it("keeps vertical-rl page advance equal to the visible page width", function() {
		let contents = Object.create(Contents.prototype);
		contents._verticalRlPageMetricsCache = null;
		contents.content = {
			clientWidth: 300,
			clientHeight: 700,
			childElementCount: 1,
			scrollWidth: 700,
			scrollHeight: 700
		};
		contents.documentElement = {
			clientWidth: 300,
			clientHeight: 700,
			scrollWidth: 700,
			scrollHeight: 700
		};
		contents.document = {
			body: contents.content,
			fonts: null
		};
		contents.window = {
			getComputedStyle: function() {
				return {
					fontSize: "20px",
					lineHeight: "36px",
					letterSpacing: "0px",
					fontFamily: "serif"
				};
			}
		};
		contents.measureVerticalRlRect = function() {
			return {
				rawWidth: 700,
				rawHeight: 700
			};
		};
		contents.estimateVerticalRlLineMetrics = function() {
			return {
				linePitch: 36,
				lineWidth: 20,
				lineLefts: [584, 620],
				sampleCount: 8,
				gapMad: 0,
				stable: true
			};
		};

		let metrics = contents.verticalRlPageMetrics(300);

		assert.equal(metrics.effectivePageAdvance, 300);
		assert.equal(metrics.pageWidth, 300);
		assert.equal(metrics.pageBoundaryShift, 0);
		assert.equal(metrics.edgeGuardPx, 0);
		assert.equal(metrics.snappedContentWidth, 900);
	});

	it("snaps vertical-rl content width to an integer visible page width", function() {
		let contents = Object.create(Contents.prototype);
		contents._verticalRlPageMetricsCache = null;
		contents.content = {
			clientWidth: 1320,
			clientHeight: 761,
			childElementCount: 1,
			scrollWidth: 3912,
			scrollHeight: 761
		};
		contents.documentElement = {
			clientWidth: 1320,
			clientHeight: 761,
			scrollWidth: 3912,
			scrollHeight: 761
		};
		contents.document = {
			body: contents.content,
			fonts: null
		};
		contents.window = {
			getComputedStyle: function() {
				return {
					fontSize: "20px",
					lineHeight: "36px",
					letterSpacing: "0px",
					fontFamily: "serif"
				};
			}
		};
		contents.measureVerticalRlRect = function() {
			return {
				rawWidth: 3912,
				rawHeight: 761
			};
		};
		contents.estimateVerticalRlLineMetrics = function() {
			return {
				linePitch: 36,
				lineWidth: 20,
				lineLefts: [1248, 1284],
				sampleCount: 8,
				gapMad: 0,
				stable: true
			};
		};

		let metrics = contents.verticalRlPageMetrics(1320);

		assert.equal(metrics.effectivePageAdvance, 1320);
		assert.equal(metrics.pageWidth, 1320);
		assert.equal(metrics.pageBoundaryShift, 0);
		assert.equal(metrics.edgeGuardPx, 0);
		assert.equal(metrics.snappedContentWidth, 3960);
	});

	it("snaps vertical-rl content width before a shared text boundary", function() {
		let contents = Object.create(Contents.prototype);
		contents._verticalRlPageMetricsCache = null;
		contents.content = {
			clientWidth: 1296,
			clientHeight: 761,
			childElementCount: 1,
			scrollWidth: 2321,
			scrollHeight: 761
		};
		contents.documentElement = {
			clientWidth: 1296,
			clientHeight: 761,
			scrollWidth: 2321,
			scrollHeight: 761
		};
		contents.document = {
			body: contents.content,
			fonts: null
		};
		contents.window = {
			getComputedStyle: function() {
				return {
					fontSize: "20px",
					lineHeight: "36px",
					letterSpacing: "0px",
					fontFamily: "serif"
				};
			}
		};
		contents.measureVerticalRlRect = function() {
			return {
				rawWidth: 2323,
				rawHeight: 761
			};
		};
		contents.estimateVerticalRlLineMetrics = function() {
			return {
				linePitch: 36,
				lineWidth: 22.727294921875,
				lineLefts: [1208, 1244, 1279.9005126953125, 1316, 1352],
				lineBoxes: [{
					left: 1279.9005126953125,
					right: 1302.6278076171875,
					width: 22.727294921875
				}],
				sampleCount: 8,
				gapMad: 0,
				stable: true
			};
		};

		let metrics = contents.verticalRlPageMetrics(1296);

		assert.equal(metrics.effectivePageAdvance, 1296);
		assert.equal(metrics.pageWidth, 1296);
		assert.equal(metrics.totalPages, 2);
		assert.equal(metrics.snappedContentWidth, 2574);
	});

	it("uses body scroll width when an inflated vertical-rl range rect would block boundary snapping", function() {
		let contents = Object.create(Contents.prototype);
		contents._verticalRlPageMetricsCache = null;
		contents.content = {
			clientWidth: 1296,
			clientHeight: 761,
			childElementCount: 1,
			scrollWidth: 2319,
			scrollHeight: 761
		};
		contents.documentElement = {
			clientWidth: 1296,
			clientHeight: 761,
			scrollWidth: 2592,
			scrollHeight: 761
		};
		contents.document = {
			body: contents.content,
			fonts: null
		};
		contents.window = {
			getComputedStyle: function() {
				return {
					fontSize: "20px",
					lineHeight: "36px",
					letterSpacing: "0px",
					fontFamily: "serif"
				};
			}
		};
		contents.measureVerticalRlRect = function() {
			return {
				left: 0,
				right: 2592,
				rawWidth: 2592,
				rawHeight: 761
			};
		};
		contents.estimateVerticalRlLineMetrics = function() {
			return {
				linePitch: 36,
				lineWidth: 22.727294921875,
				lineLefts: [1208, 1244, 1279.9005126953125, 1316, 1352],
				lineBoxes: [{
					left: 1279.9005126953125,
					right: 1302.6278076171875,
					width: 22.727294921875
				}],
				sampleCount: 8,
				gapMad: 0,
				stable: true
			};
		};

		let metrics = contents.verticalRlPageMetrics(1296);

		assert.equal(metrics.rawWidth, 2321);
		assert.equal(metrics.totalPages, 2);
		assert.equal(metrics.snappedContentWidth, 2574);
	});

	it("ignores far-right html canvas offsets when the vertical-rl body is only two pages", function() {
		let contents = Object.create(Contents.prototype);
		contents._verticalRlPageMetricsCache = null;
		contents.content = {
			clientWidth: 2319,
			offsetWidth: 2319,
			clientHeight: 761,
			childElementCount: 1,
			scrollWidth: 2319,
			scrollHeight: 761
		};
		contents.documentElement = {
			clientWidth: 77743,
			clientHeight: 761,
			scrollWidth: 77743,
			scrollHeight: 761
		};
		contents.document = {
			body: contents.content,
			fonts: null
		};
		contents.window = {
			getComputedStyle: function() {
				return {
					fontSize: "20px",
					lineHeight: "36px",
					letterSpacing: "0px",
					fontFamily: "serif"
				};
			}
		};
		contents.measureVerticalRlRect = function() {
			return {
				left: 75424.046875,
				right: 77742.7265625,
				rawWidth: 77742.7265625,
				rawHeight: 761
			};
		};
		contents.estimateVerticalRlLineMetrics = function() {
			return {
				linePitch: 36,
				lineWidth: 22.734375,
				lineLefts: [75430.9453125, 75466.9375, 75502.9296875],
				lineBoxes: [{
					left: 77691.8125,
					right: 77730.90625,
					width: 39.09375
				}, {
					left: 77630.6328125,
					right: 77653.3671875,
					width: 22.734375
				}, {
					left: 77518.6484375,
					right: 77541.375,
					width: 22.7265625
				}],
				sampleCount: 8,
				gapMad: 0,
				stable: true
			};
		};

		let metrics = contents.verticalRlPageMetrics(1296, 761);

		assert.equal(metrics.rawWidth, 2321);
		assert.equal(metrics.totalPages, 2);
		assert.equal(metrics.snappedContentWidth, 2592);
	});

	it("measures positive-offset vertical-rl text to its right edge", function() {
		let contents = Object.create(Contents.prototype);
		contents.content = {};
		contents.document = {
			body: contents.content,
			createRange: function() {
				return {
					selectNodeContents: function() {},
					getBoundingClientRect: function() {
						return {
							left: 7457.008,
							right: 27195.008,
							top: 0,
							bottom: 761,
							width: 19738,
							height: 761
						};
					}
				};
			}
		};

		let rect = contents.measureVerticalRlRect();

		assert.equal(rect.rawWidth, 27195.008);
	});

	it("allows Section0006 frame overhang to snap boundaries between text columns", function() {
		let contents = Object.create(Contents.prototype);
		contents._verticalRlPageMetricsCache = null;
		const pageWidth = 1295.9942626953125;
		contents.content = {
			clientWidth: 27216,
			clientHeight: 761,
			childElementCount: 1,
			scrollWidth: 19738,
			scrollHeight: 761
		};
		contents.documentElement = {
			clientWidth: 27216,
			clientHeight: 761,
			scrollWidth: 27215,
			scrollHeight: 761
		};
		contents.document = {
			body: contents.content,
			fonts: null
		};
		contents.window = {
			getComputedStyle: function() {
				return {
					fontSize: "20px",
					lineHeight: "36px",
					letterSpacing: "0px",
					fontFamily: "serif"
				};
			}
		};
		contents.measureVerticalRlRect = function() {
			return {
				left: 7457,
				right: 27195,
				rawWidth: 27195,
				rawHeight: 761
			};
		};
		contents.estimateVerticalRlLineMetrics = function() {
			return {
				linePitch: 36,
				lineWidth: 22.728515625,
				lineLefts: [],
				lineBoxes: [{
					left: 27166.36328125,
					right: 27189.08984375,
					width: 22.7265625
				}, {
					left: 24603.166015625,
					right: 24625.89453125,
					width: 22.728515625
				}, {
					left: 23311.34765625,
					right: 23334.076171875,
					width: 22.728515625
				}],
				sampleCount: 512,
				gapMad: 0,
				stable: true
			};
		};

		let metrics = contents.verticalRlPageMetrics(pageWidth, 761);

		assert.equal(metrics.totalPages, 21);
		assert.equal(metrics.snappedContentWidth, 27194);
	});

	it("keeps the lower boundary-snapped vertical-rl width across iframe reframe drift", function() {
		let contents = Object.create(Contents.prototype);
		let pass = 0;
		const pageWidth = 1295.9942626953125;
		const fullWidth = pageWidth * 14;
		const sharedBoundary = fullWidth - pageWidth;
		contents._verticalRlPageMetricsCache = null;
		contents._verticalRlStableSnappedContentWidth = null;
		contents.content = {
			clientWidth: 18144,
			clientHeight: 761,
			childElementCount: 1,
			scrollWidth: 18014,
			scrollHeight: 761
		};
		contents.documentElement = {
			clientWidth: 18144,
			clientHeight: 761,
			scrollWidth: 18144,
			scrollHeight: 761
		};
		contents.document = {
			body: contents.content,
			fonts: null
		};
		contents.window = {
			getComputedStyle: function() {
				return {
					fontSize: "20px",
					lineHeight: "36px",
					letterSpacing: "0px",
					fontFamily: "serif"
				};
			}
		};
		contents.measureVerticalRlRect = function() {
			return {
				rawWidth: 18014,
				rawHeight: 761
			};
		};
		contents.estimateVerticalRlLineMetrics = function() {
			pass += 1;
			return {
				linePitch: 36,
				lineWidth: 22.727294921875,
				lineLefts: [],
				lineBoxes: pass === 2 ? [{
					left: sharedBoundary - 6.5,
					right: sharedBoundary + 16.227294921875,
					width: 22.727294921875
				}] : [],
				sampleCount: 8,
				gapMad: 0,
				stable: true
			};
		};

		let metrics = contents.verticalRlPageMetrics(pageWidth, 761);
		assert.equal(Math.round(metrics.snappedContentWidth), 18144);

		contents.content.clientWidth = 18136;
		contents.documentElement.clientWidth = 18136;
		metrics = contents.verticalRlPageMetrics(pageWidth, 761);
		assert.equal(metrics.snappedContentWidth, 18136);

		contents.content.clientWidth = 18144;
		contents.documentElement.clientWidth = 18144;
		metrics = contents.verticalRlPageMetrics(pageWidth, 761);
		assert.equal(metrics.snappedContentWidth, 18136);
	});

	it("materializes pages when vertical-rl content overflows along the block axis", function() {
		let contents = Object.create(Contents.prototype);
		contents._verticalRlPageMetricsCache = null;
		contents.content = {
			clientWidth: 1062,
			clientHeight: 709,
			childElementCount: 1,
			scrollWidth: 1062,
			scrollHeight: 2203
		};
		contents.documentElement = {
			clientWidth: 1062,
			clientHeight: 709,
			scrollWidth: 1062,
			scrollHeight: 2203
		};
		contents.document = {
			body: contents.content,
			fonts: null
		};
		contents.window = {
			getComputedStyle: function() {
				return {
					fontSize: "20px",
					lineHeight: "36px",
					letterSpacing: "0px",
					fontFamily: "serif",
					columnGap: "88px"
				};
			}
		};
		contents.measureVerticalRlRect = function() {
			return {
				rawWidth: 974,
				rawHeight: 2183
			};
		};
		contents.estimateVerticalRlLineMetrics = function() {
			return {
				linePitch: 36,
				lineWidth: 20,
				lineLefts: [],
				sampleCount: 8,
				gapMad: 0,
				stable: true
			};
		};

		let metrics = contents.verticalRlPageMetrics(1062, 709);

		assert.equal(metrics.effectivePageAdvance, 1062);
		assert.equal(metrics.pageWidth, 1062);
		assert.equal(metrics.totalPages, 3);
		assert.equal(metrics.verticalFragmentPages, 3);
		assert.ok(metrics.snappedContentWidth > metrics.pageWidth);
	});

	it("treats an svg title page with a hidden heading as a single media page", function() {
		let contents = Object.create(Contents.prototype);
		let hiddenHeading = {
			nodeType: 1,
			hidden: false,
			childNodes: [{
				nodeType: 3,
				nodeValue: "第二章　兩頭牛，犁兩天的土地　A HOUSE AND THE LAND IT TAKES TWO OXEN TWO DAYS TO PLOW"
			}]
		};
		let svg = {
			nodeType: 1,
			tagName: "svg",
			hidden: false,
			closest: function() {
				return null;
			},
			getAttribute: function(name) {
				return name === "viewBox" ? "0 0 1500 1941" : null;
			},
			querySelector: function(selector) {
				return selector === "image" ? {} : null;
			},
			getBoundingClientRect: function() {
				return {
					width: 1296,
					height: 761
				};
			}
		};
		let content = {
			nodeType: 1,
			hidden: false,
			scrollWidth: 1296,
			childNodes: [hiddenHeading, svg],
			querySelectorAll: function(selector) {
				return selector === "img, svg, image, video, canvas" ? [svg] : [];
			},
			getAttribute: function() {
				return null;
			}
		};
		contents.content = content;
		contents.document = {
			body: content
		};
		contents.window = {
			getComputedStyle: function(node) {
				if (node === hiddenHeading) {
					return {
						display: "none",
						visibility: "visible"
					};
				}
				if (node === svg) {
					return {
						display: "block",
						visibility: "visible",
						objectFit: "",
						position: "absolute"
					};
				}
				return {
					display: "block",
					visibility: "visible"
				};
			}
		};

		assert.equal(contents.isViewportFillingSingleMediaPage(1296), true);
	});

	it("does not let an inflated svg title-page canvas become vertical-rl page count", function() {
		let contents = Object.create(Contents.prototype);
		contents._verticalRlPageMetricsCache = null;
		let hiddenHeading = {
			nodeType: 1,
			hidden: false,
			childNodes: [{
				nodeType: 3,
				nodeValue: "第二章　兩頭牛，犁兩天的土地　A HOUSE AND THE LAND IT TAKES TWO OXEN TWO DAYS TO PLOW"
			}]
		};
		let svg = {
			nodeType: 1,
			tagName: "svg",
			hidden: false,
			closest: function() {
				return null;
			},
			getAttribute: function(name) {
				return name === "viewBox" ? "0 0 1500 1941" : null;
			},
			querySelector: function(selector) {
				return selector === "image" ? {} : null;
			},
			getBoundingClientRect: function() {
				return {
					width: 2880995,
					height: 761
				};
			}
		};
		let content = {
			nodeType: 1,
			hidden: false,
			scrollWidth: 2880995,
			scrollHeight: 761,
			childNodes: [hiddenHeading, svg],
			querySelectorAll: function(selector) {
				return selector === "img, svg, image, video, canvas" ? [svg] : [];
			},
			getAttribute: function() {
				return null;
			}
		};
		contents.content = content;
		contents.documentElement = {
			scrollWidth: 2880995,
			scrollHeight: 761
		};
		contents.document = {
			body: content
		};
		contents.window = {
			getComputedStyle: function(node) {
				if (node === hiddenHeading) {
					return {
						display: "none",
						visibility: "visible"
					};
				}
				if (node === svg) {
					return {
						display: "block",
						visibility: "visible",
						objectFit: "",
						position: "absolute"
					};
				}
				return {
					display: "block",
					visibility: "visible",
					columnGap: "normal"
				};
			}
		};
		contents.measureVerticalRlRect = function() {
			return {
				rawWidth: 2880995,
				rawHeight: 761
			};
		};

		let metrics = contents.verticalRlPageMetrics(1296, 761);

		assert.equal(metrics.totalPages, 1);
		assert.equal(metrics.snappedContentWidth, 1296);
		assert.equal(metrics.rawWidth, 1296);
	});
});
