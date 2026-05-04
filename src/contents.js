import EventEmitter from "event-emitter";
import {isNumber, prefixed, borders, defaults} from "./utils/core";
import EpubCFI from "./epubcfi";
import Mapping from "./mapping";
import {replaceLinks} from "./utils/replacements";
import { EPUBJS_VERSION, EVENTS, DOM_EVENTS } from "./utils/constants";

const hasNavigator = typeof (navigator) !== "undefined";

const isChrome = hasNavigator && /Chrome/.test(navigator.userAgent);
const isWebkit = hasNavigator && !isChrome && /AppleWebKit/.test(navigator.userAgent);

const ELEMENT_NODE = 1;
const TEXT_NODE = 3;
const VERTICAL_RL_WIDTH_GUARD = 2;
const VERTICAL_RL_MIN_EDGE_GUARD = 2;

const median = (values) => {
	if (!values.length) return null;
	const sorted = values.slice().sort((a, b) => a - b);
	return sorted[Math.floor(sorted.length / 2)];
};

const calculateVerticalRlPageBoundaryShift = (boundary, lineLefts, lineWidth, linePitch, edgeGuardPx) => {
	if (
		!Number.isFinite(boundary) ||
		!Array.isArray(lineLefts) ||
		!lineLefts.length ||
		!Number.isFinite(linePitch) ||
		linePitch <= 0
	) {
		return 0;
	}

	const guard = Number.isFinite(edgeGuardPx) && edgeGuardPx > 0
		? edgeGuardPx
		: VERTICAL_RL_MIN_EDGE_GUARD;
	const safeLineWidth = Number.isFinite(lineWidth) && lineWidth > 0
		? Math.min(lineWidth, linePitch)
		: Math.min(24, Math.max(1, linePitch * 0.4));
	let shift = 0;

	for (const lineLeft of lineLefts) {
		if (!Number.isFinite(lineLeft)) {
			continue;
		}

		const lineRight = lineLeft + safeLineWidth;
		if (boundary >= lineLeft - guard && boundary <= lineRight + guard) {
			shift = Math.max(shift, boundary - (lineLeft - guard));
		}
	}

	if (!Number.isFinite(shift) || shift <= 0) {
		return 0;
	}

	return Math.min(Math.ceil(shift), Math.max(0, Math.floor(linePitch - guard)));
};

/**
	* Handles DOM manipulation, queries and events for View contents
	* @class
	* @param {document} doc Document
	* @param {element} content Parent Element (typically Body)
	* @param {string} cfiBase Section component of CFIs
	* @param {number} sectionIndex Index in Spine of Conntent's Section
	*/
class Contents {
	constructor(doc, content, cfiBase, sectionIndex) {
		// Blank Cfi for Parsing
		this.epubcfi = new EpubCFI();

		this.document = doc;
		this.documentElement =  this.document.documentElement;
		this.content = content || this.document.body;
		this.window = this.document.defaultView;

		this._size = {
			width: 0,
			height: 0
		};

		this.sectionIndex = sectionIndex || 0;
		this.cfiBase = cfiBase || "";
		this._verticalRlMetricsCache = null;
		this._verticalRlPageMetricsCache = null;

		this.epubReadingSystem("epub.js", EPUBJS_VERSION);
		this.called = 0;
		this.active = true;
		this.listeners();
	}

	/**
		* Get DOM events that are listened for and passed along
		*/
	static get listenedEvents() {
		return DOM_EVENTS;
	}

	/**
		* Get or Set width
		* @param {number} [w]
		* @returns {number} width
		*/
	width(w) {
		// var frame = this.documentElement;
		var frame = this.content;

		if (w && isNumber(w)) {
			w = w + "px";
		}

		if (w) {
			frame.style.width = w;
			// this.content.style.width = w;
		}

		return parseInt(this.window.getComputedStyle(frame)["width"]);


	}

	/**
		* Get or Set height
		* @param {number} [h]
		* @returns {number} height
		*/
	height(h) {
		// var frame = this.documentElement;
		var frame = this.content;

		if (h && isNumber(h)) {
			h = h + "px";
		}

		if (h) {
			frame.style.height = h;
			// this.content.style.height = h;
		}

		return parseInt(this.window.getComputedStyle(frame)["height"]);

	}

	/**
		* Get or Set width of the contents
		* @param {number} [w]
		* @returns {number} width
		*/
	contentWidth(w) {

		var content = this.content || this.document.body;

		if (w && isNumber(w)) {
			w = w + "px";
		}

		if (w) {
			content.style.width = w;
		}

		return parseInt(this.window.getComputedStyle(content)["width"]);


	}

	/**
		* Get or Set height of the contents
		* @param {number} [h]
		* @returns {number} height
		*/
	contentHeight(h) {

		var content = this.content || this.document.body;

		if (h && isNumber(h)) {
			h = h + "px";
		}

		if (h) {
			content.style.height = h;
		}

		return parseInt(this.window.getComputedStyle(content)["height"]);

	}

	/**
		* Get the width of the text using Range
		* @returns {number} width
		*/
	textWidth() {
		let rect;
		let width;
		let range = this.document.createRange();
		let content = this.content || this.document.body;
		let border = borders(content);

		const wm = this.window && this.window.getComputedStyle(content).writingMode;
		if (wm === "vertical-rl") {
			const cacheKey = this.verticalRlMetricsCacheKey();
			if (this._verticalRlMetricsCache && this._verticalRlMetricsCache.key === cacheKey) {
				return this._verticalRlMetricsCache.width;
			}

			const rect = this.measureVerticalRlRect();
			width = rect.rawWidth;
			if (!Number.isFinite(width) || width <= 0) {
				width = Math.max(
					content.scrollWidth || 0,
					this.documentElement ? this.documentElement.scrollWidth || 0 : 0
				);
			}
			if (border && border.width) width += border.width;
			width = Math.ceil(width + VERTICAL_RL_WIDTH_GUARD);
			this._verticalRlMetricsCache = {
				key: cacheKey,
				width
			};
			return width;
		}

		// Select the contents of frame
		range.selectNodeContents(content);

		// get the width of the text content
		rect = range.getBoundingClientRect();
		width = rect.width;

		if (border && border.width) {
			width += border.width;
		}

		return Math.round(width);
	}

	/**
		* Get the height of the text using Range
		* @returns {number} height
		*/
	textHeight() {
		let rect;
		let height;
		let range = this.document.createRange();
		let content = this.content || this.document.body;
		const wm = this.window && this.window.getComputedStyle(content).writingMode;

		if (wm === "vertical-rl") {
			const rect = this.measureVerticalRlRect();
			if (Number.isFinite(rect.rawHeight) && rect.rawHeight > 0) {
				return Math.ceil(rect.rawHeight);
			}
			// Fallback: scrollHeight chain
			const de = this.documentElement;
			const h = Math.max(
				(content.scrollHeight || 0),
				(de ? de.scrollHeight : 0)
			);
			if (h > 0) return h;
		}

		range.selectNodeContents(content);
		rect = range.getBoundingClientRect();
		height = rect.bottom;

		return Math.round(height);
	}

	/**
		* Get documentElement scrollWidth
		* @returns {number} width
		*/
	scrollWidth() {
		var width = this.documentElement.scrollWidth;

		return width;
	}

	/**
		* Get documentElement scrollHeight
		* @returns {number} height
		*/
	scrollHeight() {
		var height = this.documentElement.scrollHeight;

		return height;
	}

	verticalRlMetricsCacheKey(visiblePageWidth) {
		const content = this.content || this.document.body;
		const docEl = this.documentElement;
		const bodyStyle = content && this.window ? this.window.getComputedStyle(content) : null;
		const docFonts = this.document && this.document.fonts ? this.document.fonts : null;
		return [
			Number.isFinite(Number(visiblePageWidth)) ? Number(visiblePageWidth) : "",
			docEl ? docEl.clientWidth : 0,
			docEl ? docEl.clientHeight : 0,
			content ? content.clientWidth : 0,
			content ? content.clientHeight : 0,
			content ? content.childElementCount : 0,
			bodyStyle ? bodyStyle.fontSize : "",
			bodyStyle ? bodyStyle.lineHeight : "",
			bodyStyle ? bodyStyle.letterSpacing : "",
			bodyStyle ? bodyStyle.fontFamily : "",
			docFonts ? docFonts.status : ""
		].join(":");
	}

	invalidateVerticalRlMetricsCache() {
		this._verticalRlMetricsCache = null;
		this._verticalRlPageMetricsCache = null;
	}

	/**
		* Set overflow css style of the contents
		* @param {string} [overflow]
		*/
	overflow(overflow) {

		if (overflow) {
			this.documentElement.style.overflow = overflow;
		}

		return this.window.getComputedStyle(this.documentElement)["overflow"];
	}

	/**
		* Set overflowX css style of the documentElement
		* @param {string} [overflow]
		*/
	overflowX(overflow) {

		if (overflow) {
			this.documentElement.style.overflowX = overflow;
		}

		return this.window.getComputedStyle(this.documentElement)["overflowX"];
	}

	/**
		* Set overflowY css style of the documentElement
		* @param {string} [overflow]
		*/
	overflowY(overflow) {

		if (overflow) {
			this.documentElement.style.overflowY = overflow;
		}

		return this.window.getComputedStyle(this.documentElement)["overflowY"];
	}

	/**
		* Set Css styles on the contents element (typically Body)
		* @param {string} property
		* @param {string} value
		* @param {boolean} [priority] set as "important"
		*/
	css(property, value, priority) {
		var content = this.content || this.document.body;

		this.invalidateVerticalRlMetricsCache();

		if (value) {
			content.style.setProperty(property, value, priority ? "important" : "");
		} else {
			content.style.removeProperty(property);
		}

		return this.window.getComputedStyle(content)[property];
	}

	/**
		* Get or Set the viewport element
		* @param {object} [options]
		* @param {string} [options.width]
		* @param {string} [options.height]
		* @param {string} [options.scale]
		* @param {string} [options.minimum]
		* @param {string} [options.maximum]
		* @param {string} [options.scalable]
		*/
	viewport(options) {
		var _width, _height, _scale, _minimum, _maximum, _scalable;
		// var width, height, scale, minimum, maximum, scalable;
		var $viewport = this.document.querySelector("meta[name='viewport']");
		var parsed = {
			"width": undefined,
			"height": undefined,
			"scale": undefined,
			"minimum": undefined,
			"maximum": undefined,
			"scalable": undefined
		};
		var newContent = [];
		var settings = {};

		/*
		* check for the viewport size
		* <meta name="viewport" content="width=1024,height=697" />
		*/
		if($viewport && $viewport.hasAttribute("content")) {
			let content = $viewport.getAttribute("content");
			let _width = content.match(/width\s*=\s*([^,]*)/);
			let _height = content.match(/height\s*=\s*([^,]*)/);
			let _scale = content.match(/initial-scale\s*=\s*([^,]*)/);
			let _minimum = content.match(/minimum-scale\s*=\s*([^,]*)/);
			let _maximum = content.match(/maximum-scale\s*=\s*([^,]*)/);
			let _scalable = content.match(/user-scalable\s*=\s*([^,]*)/);

			if(_width && _width.length && typeof _width[1] !== "undefined"){
				parsed.width = _width[1];
			}
			if(_height && _height.length && typeof _height[1] !== "undefined"){
				parsed.height = _height[1];
			}
			if(_scale && _scale.length && typeof _scale[1] !== "undefined"){
				parsed.scale = _scale[1];
			}
			if(_minimum && _minimum.length && typeof _minimum[1] !== "undefined"){
				parsed.minimum = _minimum[1];
			}
			if(_maximum && _maximum.length && typeof _maximum[1] !== "undefined"){
				parsed.maximum = _maximum[1];
			}
			if(_scalable && _scalable.length && typeof _scalable[1] !== "undefined"){
				parsed.scalable = _scalable[1];
			}
		}

		settings = defaults(options || {}, parsed);

		if (options) {
			if (settings.width) {
				newContent.push("width=" + settings.width);
			}

			if (settings.height) {
				newContent.push("height=" + settings.height);
			}

			if (settings.scale) {
				newContent.push("initial-scale=" + settings.scale);
			}

			if (settings.scalable === "no") {
				newContent.push("minimum-scale=" + settings.scale);
				newContent.push("maximum-scale=" + settings.scale);
				newContent.push("user-scalable=" + settings.scalable);
			} else {

				if (settings.scalable) {
					newContent.push("user-scalable=" + settings.scalable);
				}

				if (settings.minimum) {
					newContent.push("minimum-scale=" + settings.minimum);
				}

				if (settings.maximum) {
					newContent.push("minimum-scale=" + settings.maximum);
				}
			}

			if (!$viewport) {
				$viewport = this.document.createElement("meta");
				$viewport.setAttribute("name", "viewport");
				this.document.querySelector("head").appendChild($viewport);
			}

			$viewport.setAttribute("content", newContent.join(", "));

			this.window.scrollTo(0, 0);
		}


		return settings;
	}

	/**
	 * Event emitter for when the contents has expanded
	 * @private
	 */
	expand() {
		this.emit(EVENTS.CONTENTS.EXPAND);
	}

	/**
	 * Add DOM listeners
	 * @private
	 */
	listeners() {
		this.imageLoadListeners();

		this.mediaQueryListeners();

		// this.fontLoadListeners();

		this.addEventListeners();

		this.addSelectionListeners();

		// this.transitionListeners();

		if (typeof ResizeObserver === "undefined") {
			this.resizeListeners();
			this.visibilityListeners();
		} else {
			this.resizeObservers();
		}

		// this.mutationObservers();

		this.linksHandler();
	}

	/**
	 * Remove DOM listeners
	 * @private
	 */
	removeListeners() {

		this.removeEventListeners();

		this.removeSelectionListeners();

		if (this.observer) {
			this.observer.disconnect();
		}

		clearTimeout(this.expanding);
	}

	/**
	 * Check if size of contents has changed and
	 * emit 'resize' event if it has.
	 * @private
	 */
	resizeCheck() {
		// P-AITEHUB-0008: Guard against null document (contents destroyed before rAF fires)
		if (!this.document) return;
		this.invalidateVerticalRlMetricsCache();
		let width = this.textWidth();
		let height = this.textHeight();

		if (width != this._size.width || height != this._size.height) {

			this._size = {
				width: width,
				height: height
			};

			this.onResize && this.onResize(this._size);
			this.emit(EVENTS.CONTENTS.RESIZE, this._size);
		}
	}

	/**
	 * Poll for resize detection
	 * @private
	 */
	resizeListeners() {
		var width, height;
		// Test size again
		clearTimeout(this.expanding);
		requestAnimationFrame(this.resizeCheck.bind(this));
		this.expanding = setTimeout(this.resizeListeners.bind(this), 350);
	}

	/**
	 * Listen for visibility of tab to change
	 * @private
	 */
	visibilityListeners() {
		document.addEventListener("visibilitychange", () => {
			if (document.visibilityState === "visible" && this.active === false) {
				this.active = true;
				this.resizeListeners();
			} else {
				this.active = false;
				clearTimeout(this.expanding);
			}
		});
	}

	/**
	 * Use css transitions to detect resize
	 * @private
	 */
	transitionListeners() {
		let body = this.content;

		body.style['transitionProperty'] = "font, font-size, font-size-adjust, font-stretch, font-variation-settings, font-weight, width, height";
		body.style['transitionDuration'] = "0.001ms";
		body.style['transitionTimingFunction'] = "linear";
		body.style['transitionDelay'] = "0";

		this._resizeCheck = this.resizeCheck.bind(this);
		this.document.addEventListener('transitionend', this._resizeCheck);
	}

	/**
	 * Listen for media query changes and emit 'expand' event
	 * Adapted from: https://github.com/tylergaw/media-query-events/blob/master/js/mq-events.js
	 * @private
	 */
	mediaQueryListeners() {
		var sheets = this.document.styleSheets;
		var mediaChangeHandler = function(m){
			if(m.matches && !this._expanding) {
				setTimeout(this.expand.bind(this), 1);
			}
		}.bind(this);

		for (var i = 0; i < sheets.length; i += 1) {
			var rules;
			// Firefox errors if we access cssRules cross-domain
			try {
				rules = sheets[i].cssRules;
			} catch (e) {
				return;
			}
			if(!rules) return; // Stylesheets changed
			for (var j = 0; j < rules.length; j += 1) {
				//if (rules[j].constructor === CSSMediaRule) {
				if(rules[j].media){
					var mql = this.window.matchMedia(rules[j].media.mediaText);
					mql.addListener(mediaChangeHandler);
					//mql.onchange = mediaChangeHandler;
				}
			}
		}
	}

	/**
	 * Use ResizeObserver to listen for changes in the DOM and check for resize
	 * @private
	 */
	resizeObservers() {
		// create an observer instance
		this.observer = new ResizeObserver((e) => {
			requestAnimationFrame(this.resizeCheck.bind(this));
		});

		// pass in the target node
		this.observer.observe(this.document.documentElement);
	}

	/**
	 * Use MutationObserver to listen for changes in the DOM and check for resize
	 * @private
	 */
	mutationObservers() {
		// create an observer instance
		this.observer = new MutationObserver((mutations) => {
			this.resizeCheck();
		});

		// configuration of the observer:
		let config = { attributes: true, childList: true, characterData: true, subtree: true };

		// pass in the target node, as well as the observer options
		this.observer.observe(this.document, config);
	}

	/**
	 * Test if images are loaded or add listener for when they load
	 * @private
	 */
	imageLoadListeners() {
		var images = this.document.querySelectorAll("img");
		var img;
		for (var i = 0; i < images.length; i++) {
			img = images[i];

			if (typeof img.naturalWidth !== "undefined" &&
					img.naturalWidth === 0) {
				img.onload = this.expand.bind(this);
			}
		}
	}

	/**
	 * Listen for font load and check for resize when loaded
	 * @private
	 */
	fontLoadListeners() {
		if (!this.document || !this.document.fonts) {
			return;
		}

		this.document.fonts.ready.then(function () {
			this.resizeCheck();
		}.bind(this));

	}

	/**
	 * Get the documentElement
	 * @returns {element} documentElement
	 */
	root() {
		if(!this.document) return null;
		return this.document.documentElement;
	}

	/**
	 * Get the location offset of a EpubCFI or an #id
	 * @param {string | EpubCFI} target
	 * @param {string} [ignoreClass] for the cfi
	 * @returns { {left: Number, top: Number }
	 */
	locationOf(target, ignoreClass) {
		var position;
		var targetPos = {"left": 0, "top": 0};

		if(!this.document) return targetPos;

		if(this.epubcfi.isCfiString(target)) {
			let range = new EpubCFI(target).toRange(this.document, ignoreClass);

			if(range) {
				try {
					if (!range.endContainer ||
						(range.startContainer == range.endContainer
						&& range.startOffset == range.endOffset)) {
						// If the end for the range is not set, it results in collapsed becoming
						// true. This in turn leads to inconsistent behaviour when calling
						// getBoundingRect. Wrong bounds lead to the wrong page being displayed.
						// https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/15684911/
						let pos = range.startContainer.textContent.indexOf(" ", range.startOffset);
						if (pos == -1) {
							pos = range.startContainer.textContent.length;
						}
						range.setEnd(range.startContainer, pos);
					}
				} catch (e) {
					console.error("setting end offset to start container length failed", e);
				}

				if (range.startContainer.nodeType === Node.ELEMENT_NODE) {
					position = range.startContainer.getBoundingClientRect();
					targetPos.left = position.left;
					targetPos.top = position.top;
				} else {
					// Webkit does not handle collapsed range bounds correctly
					// https://bugs.webkit.org/show_bug.cgi?id=138949

					// Construct a new non-collapsed range
					if (isWebkit) {
						let container = range.startContainer;
						let newRange = new Range();
						try {
							if (container.nodeType === ELEMENT_NODE) {
								position = container.getBoundingClientRect();
							} else if (range.startOffset + 2 < container.length) {
								newRange.setStart(container, range.startOffset);
								newRange.setEnd(container, range.startOffset + 2);
								position = newRange.getBoundingClientRect();
							} else if (range.startOffset - 2 > 0) {
								newRange.setStart(container, range.startOffset - 2);
								newRange.setEnd(container, range.startOffset);
								position = newRange.getBoundingClientRect();
							} else { // empty, return the parent element
								position = container.parentNode.getBoundingClientRect();
							}
						} catch (e) {
							console.error(e, e.stack);
						}
					} else {
						position = range.getBoundingClientRect();
					}
				}
			}

		} else if(typeof target === "string" &&
			target.indexOf("#") > -1) {

			let id = target.substring(target.indexOf("#")+1);
			let el = this.document.getElementById(id);
			if(el) {
				if (isWebkit) {
					// Webkit reports incorrect bounding rects in Columns
					let newRange = new Range();
					newRange.selectNode(el);
					position = newRange.getBoundingClientRect();
				} else {
					position = el.getBoundingClientRect();
				}
			}
		}

		if (position) {
			targetPos.left = position.left;
			targetPos.top = position.top;
		}

		return targetPos;
	}

	/**
	 * Append a stylesheet link to the document head
	 * @param {string} src url
	 */
	addStylesheet(src) {
		return new Promise(function(resolve, reject){
			var $stylesheet;
			var ready = false;

			if(!this.document) {
				resolve(false);
				return;
			}

			// Check if link already exists
			$stylesheet = this.document.querySelector("link[href='"+src+"']");
			if ($stylesheet) {
				resolve(true);
				return; // already present
			}

			$stylesheet = this.document.createElement("link");
			$stylesheet.type = "text/css";
			$stylesheet.rel = "stylesheet";
			$stylesheet.href = src;
			$stylesheet.onload = $stylesheet.onreadystatechange = function() {
				if ( !ready && (!this.readyState || this.readyState == "complete") ) {
					ready = true;
					// Let apply
					setTimeout(() => {
						resolve(true);
					}, 1);
				}
			};

			this.document.head.appendChild($stylesheet);

		}.bind(this));
	}

	_getStylesheetNode(key) {
		var styleEl;
		key = "epubjs-inserted-css-" + (key || '');

		if(!this.document) return false;

		// Check if link already exists
		styleEl = this.document.getElementById(key);
		if (!styleEl) {
			styleEl = this.document.createElement("style");
			styleEl.id = key;
			// Append style element to head
			this.document.head.appendChild(styleEl);
		}
		return styleEl;
	}

	/**
	 * Append stylesheet css
	 * @param {string} serializedCss
	 * @param {string} key If the key is the same, the CSS will be replaced instead of inserted
	 */
	addStylesheetCss(serializedCss, key) {
		if(!this.document || !serializedCss) return false;

		this.invalidateVerticalRlMetricsCache();

		var styleEl;
		styleEl = this._getStylesheetNode(key);
		styleEl.innerHTML = serializedCss;

		return true;
	}

	/**
	 * Append stylesheet rules to a generate stylesheet
	 * Array: https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/insertRule
	 * Object: https://github.com/desirable-objects/json-to-css
	 * @param {array | object} rules
	 * @param {string} key If the key is the same, the CSS will be replaced instead of inserted
	 */
	addStylesheetRules(rules, key) {
		var styleSheet;

		if(!this.document || !rules || rules.length === 0) return;

		this.invalidateVerticalRlMetricsCache();

		// Grab style sheet
		styleSheet = this._getStylesheetNode(key).sheet;

		if (Object.prototype.toString.call(rules) === "[object Array]") {
			for (var i = 0, rl = rules.length; i < rl; i++) {
				var j = 1, rule = rules[i], selector = rules[i][0], propStr = "";
				// If the second argument of a rule is an array of arrays, correct our variables.
				if (Object.prototype.toString.call(rule[1][0]) === "[object Array]") {
					rule = rule[1];
					j = 0;
				}

				for (var pl = rule.length; j < pl; j++) {
					var prop = rule[j];
					propStr += prop[0] + ":" + prop[1] + (prop[2] ? " !important" : "") + ";\n";
				}

				// Insert CSS Rule
				styleSheet.insertRule(selector + "{" + propStr + "}", styleSheet.cssRules.length);
			}
		} else {
			const selectors = Object.keys(rules);
			selectors.forEach((selector) => {
				const definition = rules[selector];
				if (Array.isArray(definition)) {
					definition.forEach((item) => {
						const _rules = Object.keys(item);
						const result = _rules.map((rule) => {
							return `${rule}:${item[rule]}`;
						}).join(';');
						styleSheet.insertRule(`${selector}{${result}}`, styleSheet.cssRules.length);
					});
				} else {
					const _rules = Object.keys(definition);
					const result = _rules.map((rule) => {
						return `${rule}:${definition[rule]}`;
					}).join(';');
					styleSheet.insertRule(`${selector}{${result}}`, styleSheet.cssRules.length);
				}
			});
		}
	}

	/**
	 * Append a script tag to the document head
	 * @param {string} src url
	 * @returns {Promise} loaded
	 */
	addScript(src) {

		return new Promise(function(resolve, reject){
			var $script;
			var ready = false;

			if(!this.document) {
				resolve(false);
				return;
			}

			$script = this.document.createElement("script");
			$script.type = "text/javascript";
			$script.async = true;
			$script.src = src;
			$script.onload = $script.onreadystatechange = function() {
				if ( !ready && (!this.readyState || this.readyState == "complete") ) {
					ready = true;
					setTimeout(function(){
						resolve(true);
					}, 1);
				}
			};

			this.document.head.appendChild($script);

		}.bind(this));
	}

	/**
	 * Add a class to the contents container
	 * @param {string} className
	 */
	addClass(className) {
		var content;

		if(!this.document) return;

		content = this.content || this.document.body;

		if (content) {
			content.classList.add(className);
		}

	}

	/**
	 * Remove a class from the contents container
	 * @param {string} removeClass
	 */
	removeClass(className) {
		var content;

		if(!this.document) return;

		content = this.content || this.document.body;

		if (content) {
			content.classList.remove(className);
		}

	}

	/**
	 * Add DOM event listeners
	 * @private
	 */
	addEventListeners(){
		if(!this.document) {
			return;
		}

		this._triggerEvent = this.triggerEvent.bind(this);

		DOM_EVENTS.forEach(function(eventName){
			this.document.addEventListener(eventName, this._triggerEvent, { passive: true });
		}, this);

	}

	/**
	 * Remove DOM event listeners
	 * @private
	 */
	removeEventListeners(){
		if(!this.document) {
			return;
		}
		DOM_EVENTS.forEach(function(eventName){
			this.document.removeEventListener(eventName, this._triggerEvent, { passive: true });
		}, this);
		this._triggerEvent = undefined;
	}

	/**
	 * Emit passed browser events
	 * @private
	 */
	triggerEvent(e){
		this.emit(e.type, e);
	}

	/**
	 * Add listener for text selection
	 * @private
	 */
	addSelectionListeners(){
		if(!this.document) {
			return;
		}
		this._onSelectionChange = this.onSelectionChange.bind(this);
		this.document.addEventListener("selectionchange", this._onSelectionChange, { passive: true });
	}

	/**
	 * Remove listener for text selection
	 * @private
	 */
	removeSelectionListeners(){
		if(!this.document) {
			return;
		}
		this.document.removeEventListener("selectionchange", this._onSelectionChange, { passive: true });
		this._onSelectionChange = undefined;
	}

	/**
	 * Handle getting text on selection
	 * @private
	 */
	onSelectionChange(e){
		if (this.selectionEndTimeout) {
			clearTimeout(this.selectionEndTimeout);
		}
		this.selectionEndTimeout = setTimeout(function() {
			var selection = this.window.getSelection();
			this.triggerSelectedEvent(selection);
		}.bind(this), 250);
	}

	/**
	 * Emit event on text selection
	 * @private
	 */
	triggerSelectedEvent(selection){
		var range, cfirange;

		if (selection && selection.rangeCount > 0) {
			range = selection.getRangeAt(0);
			if(!range.collapsed) {
				// cfirange = this.section.cfiFromRange(range);
				cfirange = new EpubCFI(range, this.cfiBase).toString();
				this.emit(EVENTS.CONTENTS.SELECTED, cfirange);
				this.emit(EVENTS.CONTENTS.SELECTED_RANGE, range);
			}
		}
	}

	/**
	 * Get a Dom Range from EpubCFI
	 * @param {EpubCFI} _cfi
	 * @param {string} [ignoreClass]
	 * @returns {Range} range
	 */
	range(_cfi, ignoreClass){
		var cfi = new EpubCFI(_cfi);
		return cfi.toRange(this.document, ignoreClass);
	}

	/**
	 * Get an EpubCFI from a Dom Range
	 * @param {Range} range
	 * @param {string} [ignoreClass]
	 * @returns {EpubCFI} cfi
	 */
	cfiFromRange(range, ignoreClass){
		return new EpubCFI(range, this.cfiBase, ignoreClass).toString();
	}

	/**
	 * Get an EpubCFI from a Dom node
	 * @param {node} node
	 * @param {string} [ignoreClass]
	 * @returns {EpubCFI} cfi
	 */
	cfiFromNode(node, ignoreClass){
		return new EpubCFI(node, this.cfiBase, ignoreClass).toString();
	}

	// TODO: find where this is used - remove?
	map(layout){
		var map = new Mapping(layout);
		return map.section();
	}

	/**
	 * Size the contents to a given width and height
	 * @param {number} [width]
	 * @param {number} [height]
	 */
	size(width, height){
		var viewport = { scale: 1.0, scalable: "no" };

		this.layoutStyle("scrolling");

		if (width >= 0) {
			this.width(width);
			viewport.width = width;
			this.css("padding", "0 "+(width/12)+"px");
		}

		if (height >= 0) {
			this.height(height);
			viewport.height = height;
		}

		this.css("margin", "0");
		this.css("box-sizing", "border-box");


		this.viewport(viewport);
	}

	/**
	 * Apply columns to the contents for pagination
	 * @param {number} width
	 * @param {number} height
	 * @param {number} columnWidth
	 * @param {number} gap
	 */
	columns(width, height, columnWidth, gap, dir){
		this.invalidateVerticalRlMetricsCache();

		let COLUMN_AXIS = prefixed("column-axis");
		let COLUMN_GAP = prefixed("column-gap");
		let COLUMN_WIDTH = prefixed("column-width");
		let COLUMN_FILL = prefixed("column-fill");

		let writingMode = this.writingMode();
		let axis = (writingMode.indexOf("vertical") === 0) ? "vertical" : "horizontal";

		this.layoutStyle("paginated");

		if (dir === "rtl" && axis === "horizontal") {
			this.direction(dir);
		}

		if (writingMode !== "vertical-rl") {
			this.width(width);
		}
		this.height(height);

		// Deal with Mobile trying to scale to viewport
		this.viewport({ width: width, height: height, scale: 1.0, scalable: "no" });

		if (writingMode === "vertical-rl") {
			// vertical-rl paginated content uses horizontal RTL paging.
			//
			// Books with writing-mode:vertical-rl lay out columns of vertical text
			// extending in the block direction (physical x, right-to-left). The full
			// content is wider than one page; epub.js RTL-scrolls the iframe one
			// pageWidth at a time.
			//
			// Architecture:
			//   html = clip layer   (overflow:hidden — clips to the page viewport)
			//   body = canvas       (overflow:visible, height = pageHeight, width
			//                        unconstrained so the book CSS x-layout is preserved)
			//
			// textWidth() uses Range.getBoundingClientRect() on body contents to measure
			// the true physical x-span (right-to-left, so rect.right is the rightmost
			// column, rect.left may be negative for columns beyond the iframe left edge).
			// expand() snaps to pageWidth multiples and reframes the iframe width.
			// layout.delta = pageWidth so next/prev advances one page.

			// outer clip layer
			if (this.documentElement) {
				this.documentElement.style.setProperty("overflow", "hidden", "important");
				this.documentElement.style.setProperty("margin", "0", "");
				this.documentElement.style.setProperty("padding", "0", "");
			}

			// canvas layer — fixed height (= one page), unconstrained width
			const body = this.content || this.document.body;
			body.style.margin    = "0";
			body.style.padding   = "0";
			body.style.width     = "";          // let book CSS determine x-extent
			body.style.height    = height + "px";
			body.style.overflow  = "visible";
			body.style.maxWidth  = "none";
			body.style.minWidth  = "";
			body.style.boxSizing = "border-box";
			// clear any residual multicol properties
			body.style.removeProperty(COLUMN_WIDTH);
			body.style.removeProperty(COLUMN_GAP);
			body.style.removeProperty(COLUMN_FILL);
			body.style.removeProperty(COLUMN_AXIS);
		} else {
			this.css("overflow-y", "hidden");
			this.css("margin", "0", true);

			if (axis === "vertical") {
				this.css("padding-top", (gap / 2) + "px", true);
				this.css("padding-bottom", (gap / 2) + "px", true);
				this.css("padding-left", "20px");
				this.css("padding-right", "20px");
				this.css(COLUMN_AXIS, "vertical");
			} else {
				this.css("padding-top", "20px");
				this.css("padding-bottom", "20px");
				this.css("padding-left", (gap / 2) + "px", true);
				this.css("padding-right", (gap / 2) + "px", true);
				this.css(COLUMN_AXIS, "horizontal");
			}

			this.css("box-sizing", "border-box");
			this.css("max-width", "inherit");
			this.css(COLUMN_FILL, "auto");
			this.css(COLUMN_GAP, gap + "px");
			this.css(COLUMN_WIDTH, columnWidth + "px");
		}

		// Fix glyph clipping in WebKit
		// https://github.com/futurepress/epub.js/issues/983
		this.css("-webkit-line-box-contain", "block glyphs replaced");

	}

	measureVerticalRlRect() {
		const content = this.content || this.document.body;
		if (!content || !this.document) {
			return {
				left: 0,
				right: 0,
				top: 0,
				bottom: 0,
				rawWidth: 0,
				rawHeight: 0
			};
		}

		try {
			const range = this.document.createRange();
			range.selectNodeContents(content);
			const rect = range.getBoundingClientRect();
			return {
				left: rect.left,
				right: rect.right,
				top: rect.top,
				bottom: rect.bottom,
				rawWidth: rect.width,
				rawHeight: Math.max(rect.height || 0, rect.bottom - Math.min(rect.top, 0))
			};
		} catch(e) {
			return {
				left: 0,
				right: 0,
				top: 0,
				bottom: 0,
				rawWidth: 0,
				rawHeight: 0
			};
		}
	}

	detectFixedColumnPitch(visiblePageWidth) {
		const content = this.content || this.document.body;
		if (!content || !this.document || !this.window) {
			return null;
		}

		let rects = [];
		try {
			const range = this.document.createRange();
			range.selectNodeContents(content);
			rects = Array.from(range.getClientRects ? range.getClientRects() : []);
		} catch(e) {
			rects = [];
		}

		const safePageWidth = Number(visiblePageWidth);
		const maxGap = Number.isFinite(safePageWidth) && safePageWidth > 0
			? safePageWidth * 0.75
			: 140;
		const xs = [];
		const widths = [];

		for (const rect of rects) {
			if (rect.width > 0 && rect.height > 0) {
				xs.push(Math.round(rect.left * 2) / 2);
				widths.push(rect.width);
			}
		}

		const uniqueXs = Array.from(new Set(xs))
			.sort((a, b) => a - b);
		const gaps = [];
		for (let i = 1; i < uniqueXs.length; i += 1) {
			const gap = Math.abs(uniqueXs[i] - uniqueXs[i - 1]);
			if (gap > 2 && gap < maxGap) {
				gaps.push(gap);
			}
		}

		const linePitch = median(gaps);
		const lineWidth = median(widths.filter((width) => width >= 4 && width <= 80));
		const gapMad = Number.isFinite(linePitch)
			? median(gaps.map((gap) => Math.abs(gap - linePitch)))
			: null;
		const stable = Boolean(
			gaps.length >= 4 &&
			Number.isFinite(linePitch) &&
			Number.isFinite(gapMad) &&
			gapMad <= Math.max(3, linePitch * 0.08)
		);

		if (!Number.isFinite(linePitch) || !stable) {
			return null;
		}

		return {
			linePitch,
			lineWidth,
			lineLefts: uniqueXs,
			sampleCount: gaps.length,
			gapMad,
			stable
		};
	}

	estimateVerticalRlLineMetrics(visiblePageWidth) {
		return this.detectFixedColumnPitch(visiblePageWidth) || {
			linePitch: null,
			lineWidth: null,
			lineLefts: [],
			sampleCount: 0,
			gapMad: null,
			stable: false
		};
	}

	verticalRlPageMetrics(pageWidth) {
		const safePageWidth = Number(pageWidth);
		const cacheKey = this.verticalRlMetricsCacheKey(safePageWidth);
		if (this._verticalRlPageMetricsCache && this._verticalRlPageMetricsCache.key === cacheKey) {
			return this._verticalRlPageMetricsCache.metrics;
		}

		const rect = this.measureVerticalRlRect();
		let rawWidth = rect.rawWidth;
		let rawHeight = rect.rawHeight;
		const content = this.content || this.document.body;
		if (!Number.isFinite(rawWidth) || rawWidth <= 0) {
			rawWidth = Math.max(
				content ? content.scrollWidth || 0 : 0,
				this.documentElement ? this.documentElement.scrollWidth || 0 : 0
			);
		}
		if (!Number.isFinite(rawHeight) || rawHeight <= 0) {
			rawHeight = Math.max(
				content ? content.scrollHeight || 0 : 0,
				this.documentElement ? this.documentElement.scrollHeight || 0 : 0
			);
		}
		rawWidth = Math.ceil(rawWidth + VERTICAL_RL_WIDTH_GUARD);
		rawHeight = Math.ceil(rawHeight);

		const metrics = this.estimateVerticalRlLineMetrics(safePageWidth);
		const linePitch = Number(metrics.linePitch);
		const edgeGuardPx = Number.isFinite(linePitch) && linePitch > 0
			? Math.max(VERTICAL_RL_MIN_EDGE_GUARD, Math.round(linePitch * 0.12))
			: 0;
		let effectivePageAdvance = Number.isFinite(safePageWidth) && safePageWidth > 0 ? safePageWidth : null;

		if (
			Number.isFinite(safePageWidth) &&
			safePageWidth > 0 &&
			Number.isFinite(linePitch) &&
			linePitch > 0
		) {
			const usableWidth = Math.max(1, safePageWidth - edgeGuardPx);
			effectivePageAdvance = Math.max(linePitch, Math.floor(usableWidth / linePitch) * linePitch);
		}

		const pageLength = effectivePageAdvance || safePageWidth || 1;
		const totalPages = Math.max(1, Math.ceil(Math.max(0, rawWidth - (safePageWidth || pageLength)) / pageLength) + 1);
		const snappedContentWidth = ((totalPages - 1) * pageLength) + (safePageWidth || pageLength);
		const firstInteriorBoundary = totalPages > 1
			? snappedContentWidth - (safePageWidth || pageLength) - pageLength
			: null;
		const pageBoundaryShift = calculateVerticalRlPageBoundaryShift(
			firstInteriorBoundary,
			metrics.lineLefts,
			metrics.lineWidth,
			metrics.linePitch,
			edgeGuardPx
		);
		const result = {
			rawWidth,
			rawPaintWidth: rawWidth,
			rawHeight,
			pageWidth: safePageWidth,
			effectivePageAdvance,
			linePitch: metrics.linePitch,
			lineWidth: metrics.lineWidth,
			edgeGuardPx,
			edgeGuard: edgeGuardPx,
			pageBoundaryShift,
			sampleCount: metrics.sampleCount,
			gapMad: metrics.gapMad,
			stable: metrics.stable,
			totalPages,
			snappedContentWidth
		};
		this._verticalRlPageMetricsCache = {
			key: cacheKey,
			metrics: result
		};
		return result;
	}

	debugVerticalRlMetrics(pageWidth) {
		const content = this.content || this.document.body;
		const htmlStyle = this.documentElement ? this.window.getComputedStyle(this.documentElement) : null;
		const bodyStyle = content ? this.window.getComputedStyle(content) : null;
		let rangeRect = null;

		try {
			const range = this.document.createRange();
			range.selectNodeContents(content);
			rangeRect = range.getBoundingClientRect();
		} catch(e) {
			rangeRect = null;
		}

		const bodyRect = content && content.getBoundingClientRect ? content.getBoundingClientRect() : null;
		const pageMetrics = this.verticalRlPageMetrics(pageWidth);
		const rawContentWidth = pageMetrics.rawWidth;
		const snappedContentWidth = pageMetrics.snappedContentWidth;
		const totalPages = pageMetrics.totalPages;

		const result = {
			userAgent: this.window.navigator.userAgent,
			htmlWritingMode: htmlStyle ? htmlStyle.writingMode : null,
			bodyWritingMode: bodyStyle ? bodyStyle.writingMode : null,
			htmlDirection: htmlStyle ? htmlStyle.direction : null,
			bodyDirection: bodyStyle ? bodyStyle.direction : null,
			htmlOverflow: htmlStyle ? htmlStyle.overflow : null,
			bodyOverflow: bodyStyle ? bodyStyle.overflow : null,
			bodyRectLeft: bodyRect ? bodyRect.left : null,
			bodyRectRight: bodyRect ? bodyRect.right : null,
			bodyRectWidth: bodyRect ? bodyRect.width : null,
			rangeRectLeft: rangeRect ? rangeRect.left : null,
			rangeRectRight: rangeRect ? rangeRect.right : null,
			rangeRectWidth: rangeRect ? rangeRect.width : null,
			rawContentWidth,
			rawContentHeight: pageMetrics.rawHeight,
			snappedContentWidth,
			pageWidth: pageMetrics.pageWidth,
			effectivePageAdvance: pageMetrics.effectivePageAdvance,
			linePitch: pageMetrics.linePitch,
			lineWidth: pageMetrics.lineWidth,
			edgeGuardPx: pageMetrics.edgeGuardPx,
			sampleCount: pageMetrics.sampleCount,
			gapMad: pageMetrics.gapMad,
			stable: pageMetrics.stable,
			totalPages
		};

		if (this.window.console && this.window.console.debug) {
			this.window.console.debug("[epubjs:vertical-rl]", result);
		}

		return result;
	}

	/**
	 * Scale contents from center
	 * @param {number} scale
	 * @param {number} offsetX
	 * @param {number} offsetY
	 */
	scaler(scale, offsetX, offsetY){
		var scaleStr = "scale(" + scale + ")";
		var translateStr = "";
		// this.css("position", "absolute"));
		this.css("transform-origin", "top left");

		if (offsetX >= 0 || offsetY >= 0) {
			translateStr = " translate(" + (offsetX || 0 )+ "px, " + (offsetY || 0 )+ "px )";
		}

		this.css("transform", scaleStr + translateStr);
	}

	/**
	 * Fit contents into a fixed width and height
	 * @param {number} width
	 * @param {number} height
	 */
	fit(width, height, section){
		var viewport = this.viewport();
		var viewportWidth = parseInt(viewport.width);
		var viewportHeight = parseInt(viewport.height);
		var widthScale = width / viewportWidth;
		var heightScale = height / viewportHeight;
		var scale = widthScale < heightScale ? widthScale : heightScale;

		// the translate does not work as intended, elements can end up unaligned
		// var offsetY = (height - (viewportHeight * scale)) / 2;
		// var offsetX = 0;
		// if (this.sectionIndex % 2 === 1) {
		// 	offsetX = width - (viewportWidth * scale);
		// }

		this.layoutStyle("paginated");

		// scale needs width and height to be set
		this.width(viewportWidth);
		this.height(viewportHeight);
		this.overflow("hidden");

		// Scale to the correct size
		this.scaler(scale, 0, 0);
		// this.scaler(scale, offsetX > 0 ? offsetX : 0, offsetY);

		// background images are not scaled by transform
		this.css("background-size", viewportWidth * scale + "px " + viewportHeight * scale + "px");

		this.css("background-color", "transparent");
		if (section && section.properties.includes("page-spread-left")) {
			// set margin since scale is weird
			var marginLeft = width - (viewportWidth * scale);
			this.css("margin-left", marginLeft + "px");
		}
	}

	/**
	 * Set the direction of the text
	 * @param {string} [dir="ltr"] "rtl" | "ltr"
	 */
	direction(dir) {
		if (this.documentElement) {
			this.documentElement.style["direction"] = dir;
		}
	}

	mapPage(cfiBase, layout, start, end, dev) {
		var mapping = new Mapping(layout, dev);

		return mapping.page(this, cfiBase, start, end);
	}

	/**
	 * Emit event when link in content is clicked
	 * @private
	 */
	linksHandler() {
		replaceLinks(this.content, (href) => {
			this.emit(EVENTS.CONTENTS.LINK_CLICKED, href);
		});
	}

	/**
	 * Set the writingMode of the text
	 * @param {string} [mode="horizontal-tb"] "horizontal-tb" | "vertical-rl" | "vertical-lr"
	 */
	writingMode(mode) {
		let WRITING_MODE = prefixed("writing-mode");

		if (mode && this.documentElement) {
			this.documentElement.style[WRITING_MODE] = mode;
		}

		// Read writing-mode from the body element's own stylesheet rules rather than
		// computed style, because a shim may set html { writing-mode: horizontal-tb !important }
		// for geometry correctness — which cascades down and masks a vertical-rl body.
		// We scan the document's stylesheets for any rule that targets body (or *) and
		// sets writing-mode, falling back to documentElement computed style.
		const bodyEl = this.document && this.document.body;
		if (bodyEl) {
			// Check body inline style first
			const inlineWM = bodyEl.style && bodyEl.style.getPropertyValue(WRITING_MODE);
			if (inlineWM && inlineWM !== "horizontal-tb") {
				return inlineWM;
			}
			// Scan stylesheets for body/html/universal writing-mode rules
			try {
				const sheets = Array.from(this.document.styleSheets || []);
				for (const sheet of sheets) {
					let rules;
					try { rules = Array.from(sheet.cssRules || []); } catch(e) { continue; }
					for (const rule of rules) {
						if (rule.style && rule.selectorText) {
							const sel = rule.selectorText.toLowerCase();
							if (sel === "body" || sel === "html, body" || sel === "body, html") {
								const wm = rule.style.getPropertyValue(WRITING_MODE);
								if (wm && wm !== "horizontal-tb") return wm;
							}
						}
					}
				}
			} catch(e) { /* ignore */ }
		}

		// Fallback: prefer body computed style over documentElement, because a shim
		// may set html { writing-mode: horizontal-tb !important } which would mask
		// a vertical-rl body when reading documentElement computed style.
		if (bodyEl) {
			const bodyComputedWM = this.window.getComputedStyle(bodyEl)[WRITING_MODE];
			if (bodyComputedWM && bodyComputedWM !== "horizontal-tb") {
				return bodyComputedWM;
			}
		}
		return this.window.getComputedStyle(this.documentElement)[WRITING_MODE] || '';
	}

	/**
	 * Set the layoutStyle of the content
	 * @param {string} [style="paginated"] "scrolling" | "paginated"
	 * @private
	 */
	layoutStyle(style) {

		if (style) {
			this._layoutStyle = style;
			navigator.epubReadingSystem.layoutStyle = this._layoutStyle;
		}

		return this._layoutStyle || "paginated";
	}

	/**
	 * Add the epubReadingSystem object to the navigator
	 * @param {string} name
	 * @param {string} version
	 * @private
	 */
	epubReadingSystem(name, version) {
		navigator.epubReadingSystem = {
			name: name,
			version: version,
			layoutStyle: this.layoutStyle(),
			hasFeature: function (feature) {
				switch (feature) {
					case "dom-manipulation":
						return true;
					case "layout-changes":
						return true;
					case "touch-events":
						return true;
					case "mouse-events":
						return true;
					case "keyboard-events":
						return true;
					case "spine-scripting":
						return false;
					default:
						return false;
				}
			}
		};
		return navigator.epubReadingSystem;
	}

	destroy() {
		// this.document.removeEventListener('transitionend', this._resizeCheck);

		this.removeListeners();

	}
}

EventEmitter(Contents.prototype);

export default Contents;
