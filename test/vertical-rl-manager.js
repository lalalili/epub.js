import assert from "assert";
import Contents from "../src/contents";
import DefaultViewManager from "../src/managers/default";
import Rendition from "../src/rendition";
import { replaceLinks } from "../src/utils/replacements";

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

	it("adds a right edge mask for overlap with the previous vertical-rl page", function() {
		let manager = createManagerAtLogicalOffset(0);

		manager.scrollToLogicalPage(1);

		let maskWidths = manager.getVerticalRlEdgeMaskWidths();

		assert.equal(maskWidths.left, 60);
		assert.equal(maskWidths.right, 20);
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
											left: 1297.983,
											right: 1320.71,
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
