import { extend } from "./core/collections";
import { EVENTS } from "./utils/constants";
import EventEmitter from "event-emitter";

interface LayoutSettings {
	layout?: string;
	spread?: string;
	minSpreadWidth?: number;
	evenSpreads?: boolean;
	flow?: string;
	direction?: string;
}

interface LayoutProps {
	name: string;
	spread: boolean;
	flow: string;
	width: number;
	height: number;
	spreadWidth: number;
	pageWidth?: number;
	delta: number;
	effectivePageAdvance: number;
	viewportPageWidth: number;
	pageBoundaryShift: number;
	edgeGuardPx: number;
	columnWidth: number;
	gap: number;
	divisor: number;
	[key: string]: string | boolean | number | undefined;
}

interface LayoutContent {
	fit(width: number, height: number, section?: unknown): unknown;
	columns(width: number, height: number, columnWidth: number, gap: number, direction?: string): unknown;
	size(width: number | null, height: number | null): unknown;
}

/**
 * Figures out the CSS values to apply for a layout
 * @class
 * @param {object} settings
 * @param {string} [settings.layout='reflowable']
 * @param {string} [settings.spread]
 * @param {number} [settings.minSpreadWidth=800]
 * @param {boolean} [settings.evenSpreads=false]
 */
class Layout {
	settings: LayoutSettings;
	name: string;
	_spread: boolean;
	_minSpreadWidth: number;
	_evenSpreads: boolean;
	_flow: string;
	width: number;
	height: number;
	spreadWidth: number;
	pageWidth: number;
	delta: number;
	effectivePageAdvance: number;
	viewportPageWidth: number;
	pageBoundaryShift: number;
	edgeGuardPx: number;
	columnWidth: number;
	gap: number;
	divisor: number;
	props: LayoutProps;

	constructor(settings: LayoutSettings = {}) {
		this.settings = settings;
		this.name = settings.layout || "reflowable";
		this._spread = (settings.spread === "none") ? false : true;
		this._minSpreadWidth = settings.minSpreadWidth || 800;
		this._evenSpreads = settings.evenSpreads || false;

		if (settings.flow === "scrolled" ||
				settings.flow === "scrolled-continuous" ||
				settings.flow === "scrolled-doc") {
			this._flow = "scrolled";
		} else {
			this._flow = "paginated";
		}


		this.width = 0;
		this.height = 0;
		this.spreadWidth = 0;
		this.pageWidth = 0;
		this.delta = 0;
		this.effectivePageAdvance = 0;
		this.viewportPageWidth = 0;
		this.pageBoundaryShift = 0;
		this.edgeGuardPx = 0;

		this.columnWidth = 0;
		this.gap = 0;
		this.divisor = 1;

		this.props = {
			name: this.name,
			spread: this._spread,
			flow: this._flow,
			width: 0,
			height: 0,
			spreadWidth: 0,
			pageWidth: 0,
			delta: 0,
			effectivePageAdvance: 0,
			viewportPageWidth: 0,
			pageBoundaryShift: 0,
			edgeGuardPx: 0,
			columnWidth: 0,
			gap: 0,
			divisor: 1
		};

	}

	/**
	 * Switch the flow between paginated and scrolled
	 * @param  {string} flow paginated | scrolled
	 * @return {string} simplified flow
	 */
	flow(flow?: string): string {
		if (typeof flow !== "undefined") {
			if (flow === "scrolled" ||
					flow === "scrolled-continuous" ||
					flow === "scrolled-doc") {
				this._flow = "scrolled";
			} else {
				this._flow = "paginated";
			}
			// this.props.flow = this._flow;
			this.update({flow: this._flow});
		}
		return this._flow;
	}

	/**
	 * Switch between using spreads or not, and set the
	 * width at which they switch to single.
	 * @param  {string} spread "none" | "always" | "auto"
	 * @param  {number} min integer in pixels
	 * @return {boolean} spread true | false
	 */
	spread(spread?: string, min?: number): boolean {

		if (spread) {
			this._spread = (spread === "none") ? false : true;
			// this.props.spread = this._spread;
			this.update({spread: this._spread});
		}

		if (typeof min === "number" && min >= 0) {
			this._minSpreadWidth = min;
		}

		return this._spread;
	}

	/**
	 * Calculate the dimensions of the pagination
	 * @param  {number} _width  width of the rendering
	 * @param  {number} _height height of the rendering
	 * @param  {number} _gap    width of the gap between columns
	 */
	calculate(_width: number, _height: number, _gap?: number): void {

		var divisor = 1;
		var gap = _gap || 0;

		//-- Check the width and create even width columns
		// var fullWidth = Math.floor(_width);
		var width = _width;
		var height = _height;

		var section = Math.floor(width / 12);

		var columnWidth;
		var spreadWidth;
		var pageWidth;
		var delta;

		if (this._spread && width >= this._minSpreadWidth) {
			divisor = 2;
		} else {
			divisor = 1;
		}

		if (this.name === "reflowable" && this._flow === "paginated" && !(_gap >= 0)) {
			gap = ((section % 2 === 0) ? section : section - 1);
		}

		if (this.name === "pre-paginated" ) {
			gap = 0;
		}

		//-- Double Page
		if(divisor > 1) {
			// width = width - gap;
			// columnWidth = (width - gap) / divisor;
			// gap = gap / divisor;
			columnWidth = (width / divisor) - gap;
			pageWidth = columnWidth + gap;
		} else {
			columnWidth = width;
			pageWidth = width;
		}

		if (this.name === "pre-paginated" && divisor > 1) {
			width = columnWidth;
		}

		spreadWidth = (columnWidth * divisor) + gap;

		delta = width;

		this.width = width;
		this.height = height;
		this.spreadWidth = spreadWidth;
		this.pageWidth = pageWidth;
		this.delta = delta;
		this.effectivePageAdvance = delta;
		this.viewportPageWidth = width;
		this.pageBoundaryShift = 0;

		this.columnWidth = columnWidth;
		this.gap = gap;
		this.divisor = divisor;

		// this.props.width = width;
		// this.props.height = _height;
		// this.props.spreadWidth = spreadWidth;
		// this.props.pageWidth = pageWidth;
		// this.props.delta = delta;
		//
		// this.props.columnWidth = colWidth;
		// this.props.gap = gap;
		// this.props.divisor = divisor;

		this.update({
			width,
			height,
			spreadWidth,
			pageWidth,
			delta,
			effectivePageAdvance: this.effectivePageAdvance,
			viewportPageWidth: this.viewportPageWidth,
			pageBoundaryShift: this.pageBoundaryShift,
			columnWidth,
			gap,
			divisor
		});

	}

	/**
	 * Apply Css to a Document
	 * @param  {Contents} contents
	 * @return {Promise}
	 */
	format(contents: LayoutContent, section?: unknown, axis?: string): unknown {
		var formating;

		if (this.name === "pre-paginated") {
			formating = contents.fit(this.columnWidth, this.height, section);
		} else if (this._flow === "paginated") {
			formating = contents.columns(this.width, this.height, this.columnWidth, this.gap, this.settings.direction);
		} else if (axis && axis === "horizontal") {
			formating = contents.size(null, this.height);
		} else {
			formating = contents.size(this.width, null);				
		}

		return formating; // might be a promise in some View Managers
	}

	/**
	 * Count number of pages
	 * @param  {number} totalLength
	 * @param  {number} pageLength
	 * @return {{spreads: Number, pages: Number}}
	 */
	count(totalLength: number, pageLength?: number): { spreads: number; pages: number } {

		let spreads, pages;
		let visiblePageWidth = this.viewportPageWidth || this.pageWidth || this.width || pageLength;
		let effectivePageAdvance = this.effectivePageAdvance || this.delta || pageLength;

		if (this.name === "pre-paginated") {
			spreads = 1;
			pages = 1;
		} else if (this._flow === "paginated") {
			pageLength = pageLength || effectivePageAdvance;
			if (
				effectivePageAdvance &&
				visiblePageWidth &&
				visiblePageWidth > effectivePageAdvance
			) {
				pages = Math.ceil(Math.max(0, totalLength - visiblePageWidth) / effectivePageAdvance) + 1;
				spreads = Math.ceil(pages / this.divisor);
			} else {
				spreads = Math.ceil( totalLength / pageLength);
				pages = spreads * this.divisor;
			}
		} else { // scrolled
			pageLength = pageLength || this.height;
			spreads = Math.ceil( totalLength / pageLength);
			pages = spreads;
		}

		return {
			spreads,
			pages
		};

	}

	/**
	 * Update props that have changed
	 * @private
	 * @param  {object} props
	 */
	update(props: Partial<LayoutProps>): void {
		// Remove props that haven't changed
		Object.keys(props).forEach((propName) => {
			if (this.props[propName] === props[propName]) {
				delete props[propName as keyof LayoutProps];
			}
		});

		if(Object.keys(props).length > 0) {
			let newProps = extend(this.props, props);
			this.emit(EVENTS.LAYOUT.UPDATED, newProps, props);
		}
	}
}

interface Layout {
	emit(type: string, ...args: unknown[]): void;
	on(type: string, listener: (...args: unknown[]) => void): unknown;
	off(type: string, listener: (...args: unknown[]) => void): unknown;
	once(type: string, listener: (...args: unknown[]) => void): unknown;
}

EventEmitter(Layout.prototype);

export default Layout;
