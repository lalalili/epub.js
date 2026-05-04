import assert from "assert";
import Contents from "../src/contents";
import DefaultViewManager from "../src/managers/default";

describe("Vertical RL manager pagination", function() {
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

	it("pulls interior vertical-rl pages back from a detected right edge boundary", function() {
		let manager = createManagerAtLogicalOffset(0);

		manager.scrollToLogicalPage(1);

		assert.equal(manager.container.scrollLeft, -220);
		assert.equal(manager.getCurrentPageIndex(), 1);
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

	it("moves a vertical-rl page boundary past the clipped line box", function() {
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

		assert.equal(metrics.effectivePageAdvance, 288);
		assert.equal(metrics.pageBoundaryShift, 20);
		assert.ok(metrics.effectivePageAdvance < metrics.pageWidth);
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

		assert.equal(metrics.effectivePageAdvance, 1044);
		assert.equal(metrics.totalPages, 3);
		assert.equal(metrics.verticalFragmentPages, 3);
		assert.ok(metrics.snappedContentWidth > metrics.pageWidth);
	});
});
