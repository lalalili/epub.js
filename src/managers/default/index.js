import EventEmitter from "event-emitter";
import {extend, defer, windowBounds, isNumber} from "../../utils/core";
import scrollType from "../../utils/scrolltype";
import Mapping from "../../mapping";
import Queue from "../../utils/queue";
import Stage from "../helpers/stage";
import Views from "../helpers/views";
import { EVENTS } from "../../utils/constants";

class DefaultViewManager {
	constructor(options) {

		this.name = "default";
		this.optsSettings = options.settings;
		this.View = options.view;
		this.request = options.request;
		this.renditionQueue = options.queue;
		this.q = new Queue(this);

		this.settings = extend(this.settings || {}, {
			infinite: true,
			hidden: false,
			width: undefined,
			height: undefined,
			axis: undefined,
			writingMode: undefined,
			flow: "scrolled",
			ignoreClass: "",
			fullsize: undefined,
			allowScriptedContent: false,
			allowPopups: false
		});

		extend(this.settings, options.settings || {});

		this.viewSettings = {
			ignoreClass: this.settings.ignoreClass,
			axis: this.settings.axis,
			flow: this.settings.flow,
			layout: this.layout,
			method: this.settings.method, // srcdoc, blobUrl, write
			width: 0,
			height: 0,
			forceEvenPages: true,
			allowScriptedContent: this.settings.allowScriptedContent,
			allowPopups: this.settings.allowPopups
		};

		this.rendered = false;
		this._layoutDirty = true;
		this._lastLayoutStageSize = null;

	}

	render(element, size){
		let tag = element.tagName;

		if (typeof this.settings.fullsize === "undefined" &&
				tag && (tag.toLowerCase() == "body" ||
				tag.toLowerCase() == "html")) {
				this.settings.fullsize = true;
		}

		if (this.settings.fullsize) {
			this.settings.overflow = "visible";
			this.overflow = this.settings.overflow;
		}

		this.settings.size = size;

		this.settings.rtlScrollType = scrollType();

		// Save the stage
		this.stage = new Stage({
			width: size.width,
			height: size.height,
			overflow: this.overflow,
			hidden: this.settings.hidden,
			axis: this.settings.axis,
			fullsize: this.settings.fullsize,
			direction: this.settings.direction
		});

		this.stage.attachTo(element);

		// Get this stage container div
		this.container = this.stage.getContainer();

		// Views array methods
		this.views = new Views(this.container);

		// Calculate Stage Size
		this._bounds = this.bounds();
		this._stageSize = this.stage.size();

		// Set the dimensions for views
		this.viewSettings.width = this._stageSize.width;
		this.viewSettings.height = this._stageSize.height;

		// Function to handle a resize event.
		// Will only attach if width and height are both fixed.
		this.stage.onResize(this.onResized.bind(this));

		this.stage.onOrientationChange(this.onOrientationChange.bind(this));

		// Add Event Listeners
		this.addEventListeners();

		// Add Layout method
		// this.applyLayoutMethod();
		if (this.layout) {
			this.updateLayout();
		}

		this.rendered = true;

	}

	addEventListeners(){
		var scroller;

		this._onUnload = function(e){
			this.destroy();
		}.bind(this);

		window.addEventListener("unload", this._onUnload);

		if(!this.settings.fullsize) {
			scroller = this.container;
		} else {
			scroller = window;
		}

		this._onScroll = this.onScroll.bind(this);
		scroller.addEventListener("scroll", this._onScroll);
	}

	removeEventListeners(){
		var scroller;

		if(!this.settings.fullsize) {
			scroller = this.container;
		} else {
			scroller = window;
		}

		scroller.removeEventListener("scroll", this._onScroll);
		this._onScroll = undefined;

		window.removeEventListener("unload", this._onUnload);
		this._onUnload = undefined;
	}

	destroy(){
		clearTimeout(this.orientationTimeout);
		clearTimeout(this.resizeTimeout);
		clearTimeout(this.afterScrolled);

		this.clear();

		this.removeEventListeners();

		this.removeVerticalRlViewportClip();

		this.stage.destroy();

		this.rendered = false;

		/*

			clearTimeout(this.trimTimeout);
			if(this.settings.hidden) {
				this.element.removeChild(this.wrapper);
			} else {
				this.element.removeChild(this.container);
			}
		*/
	}

	onOrientationChange(e) {
		let {orientation} = window;

		if(this.optsSettings.resizeOnOrientationChange) {
			this.resize();
		}

		// Per ampproject:
		// In IOS 10.3, the measured size of an element is incorrect if the
		// element size depends on window size directly and the measurement
		// happens in window.resize event. Adding a timeout for correct
		// measurement. See https://github.com/ampproject/amphtml/issues/8479
		clearTimeout(this.orientationTimeout);
		this.orientationTimeout = setTimeout(function(){
			this.orientationTimeout = undefined;

			if(this.optsSettings.resizeOnOrientationChange) {
				this.resize();
			}

			this.emit(EVENTS.MANAGERS.ORIENTATION_CHANGE, orientation);
		}.bind(this), 500);

	}

	onResized(e) {
		this.resize();
	}

	resize(width, height, epubcfi){
		let stageSize = this.stage.size(width, height);

		// For Safari, wait for orientation to catch up
		// if the window is a square
		this.winBounds = windowBounds();
		if (this.orientationTimeout &&
				this.winBounds.width === this.winBounds.height) {
			// reset the stage size for next resize
			this._stageSize = undefined;
			return;
		}

		if (this._stageSize &&
				this._stageSize.width === stageSize.width &&
				this._stageSize.height === stageSize.height ) {
			// Size is the same, no need to resize
			return;
		}

		this._stageSize = stageSize;

		this._bounds = this.bounds();

		// Clear current views
		this.clear();

		// Update for new views
		this.viewSettings.width = this._stageSize.width;
		this.viewSettings.height = this._stageSize.height;

		this.updateLayout();

		this.emit(EVENTS.MANAGERS.RESIZED, {
			width: this._stageSize.width,
			height: this._stageSize.height
		}, epubcfi);
	}

	createView(section, forceRight) {
		return new this.View(section, extend(this.viewSettings, { forceRight }) );
	}

	handleNextPrePaginated(forceRight, section, action) {
		let next;

		if (this.layout.name === "pre-paginated" && this.layout.divisor > 1) {
			if (forceRight || section.index === 0) {
				// First page (cover) should stand alone for pre-paginated books
				return;
			}
			next = section.next();
			if (next && !next.properties.includes("page-spread-left")) {
				return action.call(this, next);
			}
		}
	}

	display(section, target){

		var displaying = new defer();
		var displayed = displaying.promise;

		// Check if moving to target is needed
		if (target === section.href || isNumber(target)) {
			target = undefined;
		}

		// Check to make sure the section we want isn't already shown
		var visible = this.views.find(section);

		// View is already shown, just move to correct location in view
		if(visible && section && this.layout.name !== "pre-paginated") {
			let offset = visible.offset();

			if (this.settings.direction === "ltr") {
				this.scrollTo(offset.left, offset.top, true);
			} else {
				let width = visible.width();
				this.scrollTo(offset.left + width, offset.top, true);
			}

			if(target) {
				let offset = visible.locationOf(target);
				let width = visible.width();
				this.moveTo(offset, width);
			}

			displaying.resolve();
			return displayed;
		}

		// Hide all current views
		this.clear();

		let forceRight = false;
		if (this.layout.name === "pre-paginated" && this.layout.divisor === 2 && section.properties.includes("page-spread-right")) {
			forceRight = true;
		}

		this.add(section, forceRight)
			.then(function(view){

				// Move to correct place within the section, if needed
				if(target) {
					let offset = view.locationOf(target);
					let width = view.width();
					this.moveTo(offset, width);
				}

			}.bind(this), (err) => {
				displaying.reject(err);
			})
			.then(function(){
				return this.handleNextPrePaginated(forceRight, section, this.add);
			}.bind(this))
			.then(function(){

				this.views.show();
				if (this.isRtlVerticalPaginated() && !target) {
					this.scrollToLogicalPage(0);
				}

				displaying.resolve();

			}.bind(this));
		// .then(function(){
		// 	return this.hooks.display.trigger(view);
		// }.bind(this))
		// .then(function(){
		// 	this.views.show();
		// }.bind(this));
		return displayed;
	}

	afterDisplayed(view){
		this.emit(EVENTS.MANAGERS.ADDED, view);
	}

	afterResized(view){
		this.syncVerticalRlViewportClip();
		this.emit(EVENTS.MANAGERS.RESIZE, view.section);
	}

	moveTo(offset, width){
		var distX = 0,
				distY = 0;

		if(!this.isPaginated) {
			distY = offset.top;
		} else {
			let pageAdvance = this.getPageAdvance() || this.layout.delta || this.layout.width || 1;
			if (this.isRtlVerticalPaginated()) {
				let view = this.views && (this.views.first() || this.views.last());
				let contentWidth = width || (view && view.width ? view.width() : 0) || this.container.scrollWidth || 0;
				let visiblePageWidth = this.layout.pageWidth || this.layout.width || pageAdvance;
				let maxPhysicalStart = Math.max(0, contentWidth - visiblePageWidth);
				let physicalStart = Math.max(0, Math.min(maxPhysicalStart, offset.left || 0));
				let logicalOffset = Math.max(0, maxPhysicalStart - physicalStart);
				let logicalIndex = Math.floor((logicalOffset + 0.5) / pageAdvance);
				this.scrollToLogicalPage(logicalIndex);
				return;
			}
			distX = Math.floor(offset.left / pageAdvance) * pageAdvance;

			if (distX + pageAdvance > this.container.scrollWidth) {
				distX = Math.max(0, this.container.scrollWidth - pageAdvance);
			}

			if (this.settings.axis === "vertical") {
				distY = Math.floor(offset.top / this.layout.height) * this.layout.height;

				if (distY + this.layout.height > this.container.scrollHeight) {
					distY = Math.max(0, this.container.scrollHeight - this.layout.height);
				}
			} else {
				distY = Math.floor(offset.top / pageAdvance) * pageAdvance;

				if (distY + pageAdvance > this.container.scrollHeight) {
					distY = Math.max(0, this.container.scrollHeight - pageAdvance);
				}
			}
		}
		if(this.settings.direction === 'rtl'){
			/***
				the `floor` function above (L343) is on positive values, so we should add one `layout.delta`
				to distX or use `Math.ceil` function, or multiply offset.left by -1
				before `Math.floor`
			*/
			distX = distX + this.getPageAdvance()
			distX = distX - width
		}
		this.scrollTo(distX, distY, true);
	}

	add(section, forceRight){
		var view = this.createView(section, forceRight);

		this.views.append(view);

		// view.on(EVENTS.VIEWS.SHOWN, this.afterDisplayed.bind(this));
		view.onDisplayed = this.afterDisplayed.bind(this);
		view.onResize = this.afterResized.bind(this);

		view.on(EVENTS.VIEWS.AXIS, (axis) => {
			this.updateAxis(axis);
		});

		view.on(EVENTS.VIEWS.WRITING_MODE, (mode) => {
			this.updateWritingMode(mode);
		});

		return view.display(this.request);
	}

	append(section, forceRight){
		var view = this.createView(section, forceRight);
		this.views.append(view);

		view.onDisplayed = this.afterDisplayed.bind(this);
		view.onResize = this.afterResized.bind(this);

		view.on(EVENTS.VIEWS.AXIS, (axis) => {
			this.updateAxis(axis);
		});

		view.on(EVENTS.VIEWS.WRITING_MODE, (mode) => {
			this.updateWritingMode(mode);
		});

		return view.display(this.request);
	}

	prepend(section, forceRight){
		var view = this.createView(section, forceRight);

		view.on(EVENTS.VIEWS.RESIZED, (bounds) => {
			this.counter(bounds);
		});

		this.views.prepend(view);

		view.onDisplayed = this.afterDisplayed.bind(this);
		view.onResize = this.afterResized.bind(this);

		view.on(EVENTS.VIEWS.AXIS, (axis) => {
			this.updateAxis(axis);
		});

		view.on(EVENTS.VIEWS.WRITING_MODE, (mode) => {
			this.updateWritingMode(mode);
		});

		return view.display(this.request);
	}

	counter(bounds){
		if(this.settings.axis === "vertical") {
			this.scrollBy(0, bounds.heightDelta, true);
		} else {
			this.scrollBy(bounds.widthDelta, 0, true);
		}

	}

	// resizeView(view) {
	//
	// 	if(this.settings.globalLayoutProperties.layout === "pre-paginated") {
	// 		view.lock("both", this.bounds.width, this.bounds.height);
	// 	} else {
	// 		view.lock("width", this.bounds.width, this.bounds.height);
	// 	}
	//
	// };

	isRtlVerticalPaginated(){
		if (!(this.isPaginated && this.settings.axis === "horizontal" && this.settings.direction === "rtl")) {
			return false;
		}

		let view = this.views && (this.views.first() || this.views.last());
		let contentWritingMode = view && view.contents && view.contents.writingMode ? view.contents.writingMode() : "";
		let writingMode = this.settings.writingMode || contentWritingMode;

		return writingMode === "vertical-rl";
	}

	getPageAdvance(){
		return this.layout && (this.layout.effectivePageAdvance || this.layout.delta || this.layout.pageWidth || this.layout.width);
	}

	getVerticalRlEdgeMaskColor(){
		let view = this.views && (this.views.first() || this.views.last());
		let doc = view && view.contents && view.contents.document;
		let win = view && view.contents && view.contents.window;
		let candidates = [];

		if (doc && win) {
			candidates.push(doc.body, doc.documentElement);
		}
		if (this.container && typeof window !== "undefined") {
			candidates.push(this.container);
		}

		for (const element of candidates) {
			if (!element) {
				continue;
			}

			let style = (element.ownerDocument && element.ownerDocument.defaultView)
				? element.ownerDocument.defaultView.getComputedStyle(element)
				: window.getComputedStyle(element);
			let color = style && style.backgroundColor;

			if (color && color !== "transparent" && color !== "rgba(0, 0, 0, 0)") {
				return color;
			}
		}

		return "rgb(255, 255, 255)";
	}

	getVerticalRlEdgeMaskWidths(){
		let advance = this.getPageAdvance() || 0;
		let visibleWidth = this.container ? this.container.clientWidth || 0 : 0;
		let bleed = visibleWidth - advance;

		if (!this.isRtlVerticalPaginated() || !advance || !visibleWidth || bleed <= 1) {
			return { left: 0, right: 0 };
		}

		let left = Math.ceil(bleed);
		let maxMask = Math.max(0, Math.floor(advance / 4));

		return this.snapVerticalRlEdgeMaskWidths({
			left: Math.min(left, maxMask),
			right: 0
		}, maxMask);
	}

	getVerticalRlEdgeMaskWidth(){
		let widths = this.getVerticalRlEdgeMaskWidths();

		return Math.max(widths.left, widths.right);
	}

	snapVerticalRlEdgeMaskWidths(widths, maxMask){
		if (!this.container || !widths || maxMask <= 0) {
			return widths;
		}

		let view = this.views && (this.views.first() || this.views.last());
		let iframe = view && view.iframe;
		let doc = view && view.contents && view.contents.document;
		let win = view && view.contents && view.contents.window;
		let body = doc && doc.body;

		if (!iframe || !doc || !win || !body || typeof doc.createTreeWalker !== "function") {
			return widths;
		}

		let containerRect = this.container.getBoundingClientRect();
		let iframeRect = iframe.getBoundingClientRect();
		let rawLeft = containerRect.left - iframeRect.left;
		let rawRight = containerRect.right - iframeRect.left;
		let left = Math.max(0, Number(widths.left) || 0);
		let right = Math.max(0, Number(widths.right) || 0);
		let rects = [];
		let walker = doc.createTreeWalker(body, 4, {
			acceptNode(node) {
				let text = String(node.nodeValue || "").replace(/\s+/g, "");
				if (text.length < 2) {
					return 2;
				}

				let parent = node.parentElement;
				if (!parent) {
					return 2;
				}

				let style = win.getComputedStyle(parent);
				if (style.display === "none" || style.visibility === "hidden") {
					return 2;
				}

				return 1;
			}
		});
		let node;

		while ((node = walker.nextNode()) && rects.length < 1000) {
			let range = doc.createRange();
			range.selectNodeContents(node);

			for (const rect of Array.from(range.getClientRects())) {
				if (rect.width > 0 && rect.height > 0) {
					rects.push(rect);
				}

				if (rects.length >= 1000) {
					break;
				}
			}

			if (range.detach) {
				range.detach();
			}
		}

		const snapLeft = () => {
			let boundary = rawLeft + left;
			let shift = 0;
			for (const rect of rects) {
				if (rect.left < boundary && rect.right > boundary) {
					let expand = Math.ceil(rect.right - boundary + 1);
					let shrink = Math.ceil(boundary - rect.left + 1);
					if (shrink > 0 && left - shrink >= 0 && shrink <= expand) {
						shift = Math.min(shift, -shrink);
					} else {
						shift = Math.max(shift, expand);
					}
				}
			}
			if (shift !== 0) {
				left = Math.max(0, Math.min(maxMask, left + shift));
			}
			return shift;
		};
		const snapRight = () => {
			let boundary = rawRight - right;
			let shift = 0;
			for (const rect of rects) {
				if (rect.left < boundary && rect.right > boundary) {
					shift = Math.max(shift, Math.ceil(boundary - rect.left + 1));
				}
			}
			if (shift > 0) {
				right = Math.min(maxMask, right + shift);
			}
			return shift;
		};

		for (let i = 0; i < 4; i++) {
			let shifted = snapLeft() + snapRight();
			if (!shifted) {
				break;
			}
		}

		return { left, right };
	}

	syncVerticalRlViewportClip(){
		if (!this.container || !this.container.style) {
			return;
		}

		let maskWidths = this.getVerticalRlEdgeMaskWidths();
		if (!maskWidths.left && !maskWidths.right) {
			this.removeVerticalRlViewportClip();
			if (this.container.dataset && this.container.dataset.epubVrlEdgeMask) {
				delete this.container.dataset.epubVrlEdgeMask;
				delete this.container.dataset.epubVrlEdgeMaskLeft;
				delete this.container.dataset.epubVrlEdgeMaskRight;
			}
			return;
		}

		let overlay = this.getVerticalRlViewportClipOverlay();
		if (!overlay) {
			return;
		}

		let parentRect = overlay.parentElement.getBoundingClientRect();
		let containerRect = this.container.getBoundingClientRect();
		let color = this.getVerticalRlEdgeMaskColor();
		overlay.style.left = `${containerRect.left - parentRect.left}px`;
		overlay.style.top = `${containerRect.top - parentRect.top}px`;
		overlay.style.width = `${this.container.clientWidth}px`;
		overlay.style.height = `${this.container.clientHeight}px`;
		overlay.style.boxShadow = `inset ${maskWidths.left}px 0 0 ${color}, inset -${maskWidths.right}px 0 0 ${color}`;
		this.container.dataset.epubVrlEdgeMask = String(Math.max(maskWidths.left, maskWidths.right));
		this.container.dataset.epubVrlEdgeMaskLeft = String(maskWidths.left);
		this.container.dataset.epubVrlEdgeMaskRight = String(maskWidths.right);
	}

	getVerticalRlViewportClipOverlay(){
		let parent = this.container && this.container.parentElement;
		if (!parent || !parent.style) {
			return null;
		}

		if (this._verticalRlViewportClipOverlay && this._verticalRlViewportClipOverlay.parentElement === parent) {
			return this._verticalRlViewportClipOverlay;
		}

		if (this._verticalRlViewportClipOverlay) {
			this._verticalRlViewportClipOverlay.remove();
		}

		let parentStyle = window.getComputedStyle(parent);
		if (parentStyle.position === "static") {
			this._verticalRlPreviousParentPosition = parent.style.position || "";
			parent.style.position = "relative";
		}

		let overlay = document.createElement("div");
		overlay.className = "epub-vrl-edge-mask";
		overlay.setAttribute("aria-hidden", "true");
		overlay.style.position = "absolute";
		overlay.style.pointerEvents = "none";
		overlay.style.zIndex = "2147483647";
		overlay.style.background = "transparent";
		overlay.style.contain = "strict";
		parent.appendChild(overlay);
		this._verticalRlViewportClipOverlay = overlay;

		return overlay;
	}

	removeVerticalRlViewportClip(){
		if (this._verticalRlViewportClipOverlay) {
			this._verticalRlViewportClipOverlay.remove();
			this._verticalRlViewportClipOverlay = undefined;
		}

		let parent = this.container && this.container.parentElement;
		if (parent && this._verticalRlPreviousParentPosition !== undefined) {
			parent.style.position = this._verticalRlPreviousParentPosition;
			this._verticalRlPreviousParentPosition = undefined;
		}
	}

	getPageBoundaryShift(){
		if (!this.isRtlVerticalPaginated() || !this.layout) {
			return 0;
		}

		let shift = Number(this.layout.pageBoundaryShift || 0);
		let advance = this.getPageAdvance() || 0;

		if (!Number.isFinite(shift) || shift <= 0 || !advance) {
			return 0;
		}

		return Math.min(shift, Math.max(0, Math.floor(advance / 3)));
	}

	getNormalizedLogicalScrollLeft(){
		if (!this.container) {
			return 0;
		}

		let scrollLeft = this.container.scrollLeft || 0;
		if (this.settings.direction === "rtl") {
			if (this.settings.rtlScrollType === "negative" || scrollLeft < 0) {
				return Math.abs(scrollLeft);
			}

			if (this.settings.rtlScrollType === "default") {
				let maxScroll = Math.max(0, this.container.scrollWidth - this.container.clientWidth);
				return Math.max(0, maxScroll - scrollLeft);
			}
		}

		return Math.max(0, scrollLeft);
	}

	getMaxLogicalScrollLeft(){
		if (!this.container) {
			return 0;
		}

		return Math.max(0, this.container.scrollWidth - this.container.clientWidth);
	}

	getPageSnapTolerance(){
		let advance = this.getPageAdvance() || 0;
		let edgeGuard = this.layout && this.layout.edgeGuardPx ? this.layout.edgeGuardPx : 0;
		let tolerance = Math.max(2, edgeGuard, Math.round(advance * 0.08));

		return advance > 0 ? Math.min(Math.max(2, Math.round(advance / 4)), tolerance) : 2;
	}

	getTotalPagesForCurrentView(){
		let view = this.views && (this.views.first() || this.views.last());
		if (!view) {
			return 1;
		}

		let width = view.width();
		let advance = this.getPageAdvance();
		let pageWidth = this.layout.pageWidth || this.layout.width || advance;

		if (this.layout.effectivePageAdvance && this.layout.effectivePageAdvance !== this.layout.pageWidth) {
			return Math.max(1, Math.ceil(Math.max(0, width - pageWidth) / advance) + 1);
		}

		return this.layout.count(width, advance).pages;
	}

	getCurrentPageIndex(){
		let advance = this.getPageAdvance();
		if (!advance || advance <= 0 || !this.container) {
			return 0;
		}

		let totalPages = this.getTotalPagesForCurrentView();
		let normalized = this.getNormalizedLogicalScrollLeft();
		let maxLogicalScroll = this.getMaxLogicalScrollLeft();
		let snapTolerance = this.getPageSnapTolerance();

		if (this.isRtlVerticalPaginated() && totalPages > 1 && maxLogicalScroll > 0 && normalized >= maxLogicalScroll - snapTolerance) {
			return totalPages - 1;
		}

		let pageIndex = Math.floor((normalized + 0.5) / advance);
		return Math.max(0, Math.min(totalPages - 1, pageIndex));
	}

	scrollToLogicalPage(pageIndex){
		this.syncVerticalRlViewportClip();
		let advance = this.getPageAdvance();
		let totalPages = this.getTotalPagesForCurrentView();
		let targetIndex = Math.max(0, Math.min(totalPages - 1, pageIndex));
		let maxScroll = this.getMaxLogicalScrollLeft();
		let logicalOffset = targetIndex * advance;
		let boundaryShift = this.getPageBoundaryShift();

		if (boundaryShift > 0 && totalPages > 1) {
			logicalOffset += boundaryShift;
		}
		logicalOffset = Math.min(maxScroll, logicalOffset);
		let left = logicalOffset;

		if (this.settings.direction === "rtl") {
			if (this.settings.rtlScrollType === "negative" || this.container.scrollLeft < 0) {
				left = -logicalOffset;
			} else if (this.settings.rtlScrollType === "default") {
				left = Math.max(0, maxScroll - logicalOffset);
			}
		} else {
			left = logicalOffset;
		}

		this.scrollTo(left, 0, true);
		this.syncVerticalRlViewportClip();
	}

	waitForVerticalRlLayoutReady(){
		let view = this.views && (this.views.first() || this.views.last());
		let doc = view && view.contents && view.contents.document;
		let fontsReady = doc && doc.fonts && doc.fonts.ready
			? doc.fonts.ready.catch(function(){})
			: Promise.resolve();
		let nextFrame = () => new Promise((resolve) => {
			if (typeof requestAnimationFrame === "function") {
				requestAnimationFrame(function(){
					requestAnimationFrame(resolve);
				});
			} else {
				setTimeout(resolve, 0);
			}
		});

		return nextFrame().then(function(){
			return fontsReady;
		}).then(nextFrame);
	}

	displaySpineItemAtEnd(section, forceRight){
		return this.prepend(section, forceRight)
			.then(function(){
				var left;
				if (this.layout.name === "pre-paginated" && this.layout.divisor > 1) {
					left = section.prev();
					if (left) {
						return this.prepend(left);
					}
				}
			}.bind(this))
			.then(function(){
				if (this.isRtlVerticalPaginated()) {
					return this.waitForVerticalRlLayoutReady();
				}
			}.bind(this))
			.then(function(){
				if(this.isPaginated && this.settings.axis === "horizontal") {
					let pageAdvance = this.getPageAdvance();
					if (this.isRtlVerticalPaginated()) {
						this.scrollToLogicalPage(this.getTotalPagesForCurrentView() - 1);
					} else if (this.settings.direction === "rtl") {
						if (this.settings.rtlScrollType === "default"){
							this.scrollTo(0, 0, true);
						}
						else{
							this.scrollTo((this.container.scrollWidth * -1) + pageAdvance, 0, true);
						}
					} else {
						this.scrollTo(this.container.scrollWidth - pageAdvance, 0, true);
					}
				}
				this.views.show();
			}.bind(this));
	}

	next(){
		var next;
		var left;

		let dir = this.settings.direction;

		if(!this.views.length) return;

		if (this.isRtlVerticalPaginated()) {
			let pageIndex = this.getCurrentPageIndex();
			let totalPages = this.getTotalPagesForCurrentView();

			if (pageIndex < totalPages - 1) {
				this.scrollToLogicalPage(pageIndex + 1);
				return;
			} else {
				next = this.views.last().section.next();
			}
		}

		if(!next && this.isPaginated && this.settings.axis === "horizontal" && (!dir || dir === "ltr")) {
			let pageAdvance = this.getPageAdvance();

			this.scrollLeft = this.container.scrollLeft;

			left = this.container.scrollLeft + this.container.offsetWidth + pageAdvance;

			if(left <= this.container.scrollWidth) {
				this.scrollBy(pageAdvance, 0, true);
			} else {
				next = this.views.last().section.next();
			}
		} else if (!next && this.isPaginated && this.settings.axis === "horizontal" && dir === "rtl") {
			let pageAdvance = this.getPageAdvance();

			this.scrollLeft = this.container.scrollLeft;

			if (this.settings.rtlScrollType === "default"){
				left = this.container.scrollLeft;

				if (left > 0) {
					this.scrollBy(pageAdvance, 0, true);
				} else {
					next = this.views.last().section.next();
				}
			} else {
				left = this.container.scrollLeft + ( pageAdvance * -1 );

				if (left > this.container.scrollWidth * -1){
					this.scrollBy(pageAdvance, 0, true);
				} else {
					next = this.views.last().section.next();
				}
			}

		} else if (!next && this.isPaginated && this.settings.axis === "vertical") {

			this.scrollTop = this.container.scrollTop;

			let top  = this.container.scrollTop + this.container.offsetHeight;

			if(top < this.container.scrollHeight) {
				this.scrollBy(0, this.layout.height, true);
			} else {
				next = this.views.last().section.next();
			}

		} else if (!next) {
			next = this.views.last().section.next();
		}

		if(next) {
			this.clear();
			// The new section may have a different writing-mode from the old section. Thus, we need to update layout.
			this.updateLayout();

			let forceRight = false;
			if (this.layout.name === "pre-paginated" && this.layout.divisor === 2 && next.properties.includes("page-spread-right")) {
				forceRight = true;
			}

			return this.append(next, forceRight)
				.then(function(){
					return this.handleNextPrePaginated(forceRight, next, this.append);
				}.bind(this), (err) => {
					return err;
				})
				.then(function(){

					// Reset position to start for scrolled-doc vertical-rl in default mode
					if (!this.isPaginated &&
						this.settings.axis === "horizontal" &&
						this.settings.direction === "rtl" &&
						this.settings.rtlScrollType === "default") {
						
						this.scrollTo(this.container.scrollWidth, 0, true);
					}
					this.views.show();
				}.bind(this));
		}


	}

	prev(){
		var prev;
		var left;
		let dir = this.settings.direction;

		if(!this.views.length) return;

		if (this.isRtlVerticalPaginated()) {
			let pageIndex = this.getCurrentPageIndex();

			if (pageIndex > 0) {
				this.scrollToLogicalPage(pageIndex - 1);
				return;
			} else {
				prev = this.views.first().section.prev();
			}
		}

		if(!prev && this.isPaginated && this.settings.axis === "horizontal" && (!dir || dir === "ltr")) {
			let pageAdvance = this.getPageAdvance();

			this.scrollLeft = this.container.scrollLeft;

			left = this.container.scrollLeft;

			if(left > 0) {
				this.scrollBy(-pageAdvance, 0, true);
			} else {
				prev = this.views.first().section.prev();
			}

		} else if (!prev && this.isPaginated && this.settings.axis === "horizontal" && dir === "rtl") {
			let pageAdvance = this.getPageAdvance();

			this.scrollLeft = this.container.scrollLeft;

			if (this.settings.rtlScrollType === "default"){
				left = this.container.scrollLeft + this.container.offsetWidth;

				if (left < this.container.scrollWidth) {
					this.scrollBy(-pageAdvance, 0, true);
				} else {
					prev = this.views.first().section.prev();
				}
			}
			else{
				left = this.container.scrollLeft;

				if (left < 0) {
					this.scrollBy(-pageAdvance, 0, true);
				} else {
					prev = this.views.first().section.prev();
				}
			}

		} else if (!prev && this.isPaginated && this.settings.axis === "vertical") {

			this.scrollTop = this.container.scrollTop;

			let top = this.container.scrollTop;

			if(top > 0) {
				this.scrollBy(0, -(this.layout.height), true);
			} else {
				prev = this.views.first().section.prev();
			}

		} else if (!prev) {

			prev = this.views.first().section.prev();

		}

		if(prev) {
			this.clear();
			// The new section may have a different writing-mode from the old section. Thus, we need to update layout.
			this.updateLayout();

			let forceRight = false;
			if (this.layout.name === "pre-paginated" && this.layout.divisor === 2 && typeof prev.prev() !== "object") {
				forceRight = true;
			}

			return this.displaySpineItemAtEnd(prev, forceRight)
				.catch((err) => {
					return err;
				});
		}
	}

	current(){
		var visible = this.visible();
		if(visible.length){
			// Current is the last visible view
			return visible[visible.length-1];
		}
		return null;
	}

	clear () {

		// this.q.clear();

		if (this.views) {
			this.views.hide();
			this.scrollTo(0,0, true);
			this.views.clear();
		}
	}

	currentLocation(){
		if (this.shouldUpdateLayoutForLocation()) {
			this.updateLayout();
		}
		if (this.isPaginated && this.settings.axis === "horizontal") {
			this.location = this.paginatedLocation();
		} else {
			this.location = this.scrolledLocation();
		}
		return this.location;
	}

	scrolledLocation() {
		let visible = this.visible();
		let container = this.container.getBoundingClientRect();
		let pageHeight = (container.height < window.innerHeight) ? container.height : window.innerHeight;
		let pageWidth = (container.width < window.innerWidth) ? container.width : window.innerWidth;
		let vertical = (this.settings.axis === "vertical");
		let rtl =  (this.settings.direction === "rtl");
		
		let offset = 0;
		let used = 0;

		if(this.settings.fullsize) {
			offset = vertical ? window.scrollY : window.scrollX;
		}

		let sections = visible.map((view) => {
			let {index, href} = view.section;
			let position = view.position();
			let width = view.width();
			let height = view.height();

			let startPos;
			let endPos;
			let stopPos;
			let totalPages;

			if (vertical) {
				startPos = offset + container.top - position.top + used;
				endPos = startPos + pageHeight - used;
				totalPages = this.layout.count(height, pageHeight).pages;
				stopPos = pageHeight;
			} else {
				startPos = offset + container.left - position.left + used;
				endPos = startPos + pageWidth - used;
				totalPages = this.layout.count(width, pageWidth).pages;
				stopPos = pageWidth;
			}

			let currPage = Math.ceil(startPos / stopPos);
			let pages = [];
			let endPage = Math.ceil(endPos / stopPos);

			// Reverse page counts for horizontal rtl
			if (this.settings.direction === "rtl" && !vertical) {
				let tempStartPage = currPage;
				currPage = totalPages - endPage;
				endPage = totalPages - tempStartPage;
			}

			pages = [];
			for (var i = currPage; i <= endPage; i++) {
				let pg = i + 1;
				pages.push(pg);
			}

			let mapping = this.mapping.page(view.contents, view.section.cfiBase, startPos, endPos);

			return {
				index,
				href,
				pages,
				totalPages,
				mapping
			};
		});

		return sections;
	}

	paginatedLocation(){
		let visible = this.visible();
		let container = this.container.getBoundingClientRect();
		let isRtlVerticalPaginated = this.isRtlVerticalPaginated();

		let left = 0;
		let used = 0;

		if(this.settings.fullsize) {
			left = window.scrollX;
		}

		let sections = visible.map((view) => {
			let {index, href} = view.section;
			let offset;
			let position = view.position();
			let width = view.width();

			// Find mapping
			let start;
			let end;
			let pageWidth;

			if (this.settings.direction === "rtl") {
				offset = container.right - left;
				pageWidth = Math.min(Math.abs(offset - position.left), this.layout.width) - used;
				end = position.width - (position.right - offset) - used;
				start = end - pageWidth;
			} else {
				offset = container.left + left;
				pageWidth = Math.min(position.right - offset, this.layout.width) - used;
				start = offset - position.left + used;
				end = start + pageWidth;
			}

			used += pageWidth;

			let mapping = this.mapping.page(view.contents, view.section.cfiBase, start, end);

			let pageAdvance = this.getPageAdvance();
			let totalPages = this.layout.count(width, pageAdvance).pages;
			let startPage = Math.floor(start / pageAdvance);
			let pages = [];
			let endPage = Math.floor(end / pageAdvance);

			if (isRtlVerticalPaginated) {
				let currentPageIndex = this.getCurrentPageIndex();
				let visiblePageWidth = this.layout.pageWidth || this.layout.width || pageAdvance;
				let contentWidth = width;
				let maxPhysicalStart = Math.max(0, contentWidth - visiblePageWidth);
				let physicalStart = Math.max(
					0,
					Math.min(maxPhysicalStart, maxPhysicalStart - (currentPageIndex * pageAdvance))
				);
				let physicalEnd = Math.min(contentWidth, physicalStart + visiblePageWidth);
				totalPages = this.getTotalPagesForCurrentView();
				pages = [currentPageIndex + 1];
				start = physicalStart;
				end = physicalEnd;
				mapping = this.mapping.page(view.contents, view.section.cfiBase, physicalStart, physicalEnd);

				return {
					index,
					href,
					pages,
					totalPages,
					mapping
				};
			}
			
			// start page should not be negative
			if (startPage < 0) {
				startPage = 0;
				endPage = endPage + 1;
			}

			// Reverse page counts for rtl
			if (this.settings.direction === "rtl") {
				let tempStartPage = startPage;
				startPage = totalPages - endPage;
				endPage = totalPages - tempStartPage;
			}


			for (var i = startPage + 1; i <= endPage; i++) {
				let pg = i;
				pages.push(pg);
			}

			return {
				index,
				href,
				pages,
				totalPages,
				mapping
			};
		});

		return sections;
	}

	isVisible(view, offsetPrev, offsetNext, _container){
		var position = view.position();
		var container = _container || this.bounds();

		if(this.settings.axis === "horizontal" &&
			position.right > container.left - offsetPrev &&
			position.left < container.right + offsetNext) {

			return true;

		} else if(this.settings.axis === "vertical" &&
			position.bottom > container.top - offsetPrev &&
			position.top < container.bottom + offsetNext) {

			return true;
		}

		return false;

	}

	visible(){
		var container = this.bounds();
		var views = this.views.displayed();
		var viewsLength = views.length;
		var visible = [];
		var isVisible;
		var view;

		for (var i = 0; i < viewsLength; i++) {
			view = views[i];
			isVisible = this.isVisible(view, 0, 0, container);

			if(isVisible === true) {
				visible.push(view);
			}

		}
		return visible;
	}

	scrollBy(x, y, silent){
		let dir = this.settings.direction === "rtl" ? -1 : 1;

		if(silent) {
			this.ignore = true;
		}

		if(!this.settings.fullsize) {
			if(x) this.container.scrollLeft += x * dir;
			if(y) this.container.scrollTop += y;
		} else {
			window.scrollBy(x * dir, y * dir);
		}
		this.scrolled = true;
	}

	scrollTo(x, y, silent){
		if(silent) {
			this.ignore = true;
		}

		if(!this.settings.fullsize) {
			this.container.scrollLeft = x;
			this.container.scrollTop = y;
		} else {
			window.scrollTo(x,y);
		}
		this.scrolled = true;
	}

	onScroll(){
		let scrollTop;
		let scrollLeft;

		if(!this.settings.fullsize) {
			scrollTop = this.container.scrollTop;
			scrollLeft = this.container.scrollLeft;
		} else {
			scrollTop = window.scrollY;
			scrollLeft = window.scrollX;
		}

		this.scrollTop = scrollTop;
		this.scrollLeft = scrollLeft;

		if(!this.ignore) {
			this.emit(EVENTS.MANAGERS.SCROLL, {
				top: scrollTop,
				left: scrollLeft
			});

			clearTimeout(this.afterScrolled);
			this.afterScrolled = setTimeout(function () {
				this.emit(EVENTS.MANAGERS.SCROLLED, {
					top: this.scrollTop,
					left: this.scrollLeft
				});
			}.bind(this), 20);



		} else {
			this.ignore = false;
		}

	}

	bounds() {
		var bounds;

		bounds = this.stage.bounds();

		return bounds;
	}

	applyLayout(layout) {

		this.layout = layout;
		this._layoutDirty = true;
		this.updateLayout();
		if (this.views && this.views.length > 0 && this.layout.name === "pre-paginated") {
			this.display(this.views.first().section);
		}
		 // this.manager.layout(this.layout.format);
	}

	shouldUpdateLayoutForLocation() {
		if (!this.stage || !this.layout) {
			return false;
		}

		if (this._layoutDirty || !this._lastLayoutStageSize) {
			return true;
		}

		let stageSize = this.stage.size();
		return (
			stageSize.width !== this._lastLayoutStageSize.width ||
			stageSize.height !== this._lastLayoutStageSize.height
		);
	}

	updateLayout() {

		if (!this.stage) {
			return;
		}

		this._stageSize = this.stage.size();
		this._lastLayoutStageSize = {
			width: this._stageSize.width,
			height: this._stageSize.height
		};
		this._layoutDirty = false;

		if(!this.isPaginated) {
			this.layout.calculate(this._stageSize.width, this._stageSize.height);
		} else {
			this.layout.calculate(
				this._stageSize.width,
				this._stageSize.height,
				this.settings.gap
			);

			// Set the look ahead offset for what is visible
			this.settings.offset = this.getPageAdvance() / this.layout.divisor;

			// this.stage.addStyleRules("iframe", [{"margin-right" : this.layout.gap + "px"}]);

		}

		// Set the dimensions for views
		this.viewSettings.width = this.layout.width;
		this.viewSettings.height = this.layout.height;

		this.setLayout(this.layout);
		this.syncVerticalRlViewportClip();
	}

	setLayout(layout){

		this.viewSettings.layout = layout;

		this.mapping = new Mapping(layout.props, this.settings.direction, this.settings.axis);

		if(this.views) {

			this.views.forEach(function(view){
				if (view) {
					view.setLayout(layout);
				}
			});

		}

	}

	updateWritingMode(mode) {
		this.writingMode = mode;
	}

	updateAxis(axis, forceUpdate){

		if (!forceUpdate && axis === this.settings.axis) {
			return;
		}

		this.settings.axis = axis;
		this._layoutDirty = true;

		this.stage && this.stage.axis(axis);

		this.viewSettings.axis = axis;

		if (this.mapping) {
			this.mapping = new Mapping(this.layout.props, this.settings.direction, this.settings.axis);
		}

		if (this.layout) {
			if (axis === "vertical") {
				this.layout.spread("none");
			} else {
				this.layout.spread(this.layout.settings.spread);
			}
		}
	}

	updateFlow(flow, defaultScrolledOverflow="auto"){
		let isPaginated = (flow === "paginated" || flow === "auto");

		this.isPaginated = isPaginated;
		this._layoutDirty = true;

		if (flow === "scrolled-doc" ||
				flow === "scrolled-continuous" ||
				flow === "scrolled") {
			this.updateAxis("vertical");
		} else {
			this.updateAxis("horizontal");
		}

		this.viewSettings.flow = flow;

		if (!this.settings.overflow) {
			this.overflow = isPaginated ? "hidden" : defaultScrolledOverflow;
		} else {
			this.overflow = this.settings.overflow;
		}

		this.stage && this.stage.overflow(this.overflow);

		this.updateLayout();

	}

	getContents(){
		var contents = [];
		if (!this.views) {
			return contents;
		}
		this.views.forEach(function(view){
			const viewContents = view && view.contents;
			if (viewContents) {
				contents.push(viewContents);
			}
		});
		return contents;
	}

	direction(dir="ltr") {
		this.settings.direction = dir;

		this.stage && this.stage.direction(dir);

		this.viewSettings.direction = dir;

		this.updateLayout();
	}

	isRendered() {
		return this.rendered;
	}
}

//-- Enable binding events to Manager
EventEmitter(DefaultViewManager.prototype);

export default DefaultViewManager;
