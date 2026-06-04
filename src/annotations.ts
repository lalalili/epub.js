import EventEmitter from "event-emitter";
import EpubCFI from "./epubcfi";
import { EVENTS } from "./utils/constants";

export type AnnotationType = "highlight" | "underline" | "mark" | string;

export type AnnotationCallback = (...args: any[]) => void;

export type AnnotationData = Record<string, unknown>;

export type AnnotationStyles = Record<string, string>;

export type AnnotationMap = Record<string, Annotation>;

export type SectionAnnotationMap = Record<number, string[]>;

export interface AnnotationsRendition {
	hooks: {
		render: {
			register(callback: (view: AnnotationView) => void): void;
		};
		unloaded: {
			register(callback: (view: AnnotationView) => void): void;
		};
	};
	views(): AnnotationView[];
}

export interface AnnotationView {
	index: number;
	highlight(cfiRange: string, data?: AnnotationData, cb?: AnnotationCallback, className?: string, styles?: AnnotationStyles): unknown;
	mark(cfiRange: string, data?: AnnotationData, cb?: AnnotationCallback): unknown;
	underline(cfiRange: string, data?: AnnotationData, cb?: AnnotationCallback, className?: string, styles?: AnnotationStyles): unknown;
	unhighlight(cfiRange: string): unknown;
	unmark(cfiRange: string): unknown;
	ununderline(cfiRange: string): unknown;
}

export interface AnnotationOptions {
	type: AnnotationType;
	cfiRange: string;
	data?: AnnotationData;
	sectionIndex: number;
	cb?: AnnotationCallback;
	className?: string;
	styles?: AnnotationStyles;
}

/**
	* Handles managing adding & removing Annotations
	* @param {Rendition} rendition
	* @class
	*/
class Annotations {
	rendition: AnnotationsRendition;
	highlights: Annotation[];
	underlines: Annotation[];
	marks: Annotation[];
	_annotations: AnnotationMap;
	_annotationsBySectionIndex: SectionAnnotationMap;

	constructor (rendition: AnnotationsRendition) {
		this.rendition = rendition;
		this.highlights = [];
		this.underlines = [];
		this.marks = [];
		this._annotations = {};
		this._annotationsBySectionIndex = {};

		this.rendition.hooks.render.register(this.inject.bind(this));
		this.rendition.hooks.unloaded.register(this.clear.bind(this));
	}

	/**
	 * Add an annotation to store
	 * @param {string} type Type of annotation to add: "highlight", "underline", "mark"
	 * @param {EpubCFI} cfiRange EpubCFI range to attach annotation to
	 * @param {object} data Data to assign to annotation
	 * @param {function} [cb] Callback after annotation is added
	 * @param {string} className CSS class to assign to annotation
	 * @param {object} styles CSS styles to assign to annotation
	 * @returns {Annotation} annotation
	 */
	add (type: AnnotationType, cfiRange: string, data?: AnnotationData, cb?: AnnotationCallback, className?: string, styles?: AnnotationStyles): Annotation {
		let hash = encodeURI(cfiRange + type);
		let cfi = new EpubCFI(cfiRange);
		let sectionIndex = cfi.spinePos;
		let annotation = new Annotation({
			type,
			cfiRange,
			data,
			sectionIndex,
			cb,
			className,
			styles
		});

		this._annotations[hash] = annotation;

		if (sectionIndex in this._annotationsBySectionIndex) {
			this._annotationsBySectionIndex[sectionIndex].push(hash);
		} else {
			this._annotationsBySectionIndex[sectionIndex] = [hash];
		}

		let views = this.rendition.views();

		views.forEach( (view) => {
			if (annotation.sectionIndex === view.index) {
				annotation.attach(view);
			}
		});

		return annotation;
	}

	/**
	 * Remove an annotation from store
	 * @param {EpubCFI} cfiRange EpubCFI range the annotation is attached to
	 * @param {string} type Type of annotation to add: "highlight", "underline", "mark"
	 */
	remove (cfiRange: string, type: AnnotationType): void {
		let hash = encodeURI(cfiRange + type);

		if (hash in this._annotations) {
			let annotation = this._annotations[hash];

			if (type && annotation.type !== type) {
				return;
			}

			let views = this.rendition.views();
			views.forEach( (view) => {
				this._removeFromAnnotationBySectionIndex(annotation.sectionIndex, hash);
				if (annotation.sectionIndex === view.index) {
					annotation.detach(view);
				}
			});

			delete this._annotations[hash];
		}
	}

	/**
	 * Remove an annotations by Section Index
	 * @private
	 */
	_removeFromAnnotationBySectionIndex (sectionIndex: number, hash: string): void {
		this._annotationsBySectionIndex[sectionIndex] = this._annotationsAt(sectionIndex).filter(h => h !== hash);
	}

	/**
	 * Get annotations by Section Index
	 * @private
	 */
	_annotationsAt (index: number): string[] {
		return this._annotationsBySectionIndex[index];
	}


	/**
	 * Add a highlight to the store
	 * @param {EpubCFI} cfiRange EpubCFI range to attach annotation to
	 * @param {object} data Data to assign to annotation
	 * @param {function} cb Callback after annotation is clicked
	 * @param {string} className CSS class to assign to annotation
	 * @param {object} styles CSS styles to assign to annotation
	 */
	highlight (cfiRange: string, data?: AnnotationData, cb?: AnnotationCallback, className?: string, styles?: AnnotationStyles): Annotation {
		return this.add("highlight", cfiRange, data, cb, className, styles);
	}

	/**
	 * Add a underline to the store
	 * @param {EpubCFI} cfiRange EpubCFI range to attach annotation to
	 * @param {object} data Data to assign to annotation
	 * @param {function} cb Callback after annotation is clicked
	 * @param {string} className CSS class to assign to annotation
	 * @param {object} styles CSS styles to assign to annotation
	 */
	underline (cfiRange: string, data?: AnnotationData, cb?: AnnotationCallback, className?: string, styles?: AnnotationStyles): Annotation {
		return this.add("underline", cfiRange, data, cb, className, styles);
	}

	/**
	 * Add a mark to the store
	 * @param {EpubCFI} cfiRange EpubCFI range to attach annotation to
	 * @param {object} data Data to assign to annotation
	 * @param {function} cb Callback after annotation is clicked
	 */
	mark (cfiRange: string, data?: AnnotationData, cb?: AnnotationCallback): Annotation {
		return this.add("mark", cfiRange, data, cb);
	}

	/**
	 * iterate over annotations in the store
	 */
	each (...args: any[]): any {
		return (this._annotations as any).forEach.apply(this._annotations, args);
	}

	/**
	 * Hook for injecting annotation into a view
	 * @param {View} view
	 * @private
	 */
	inject (view: AnnotationView): void {
		let sectionIndex = view.index;
		if (sectionIndex in this._annotationsBySectionIndex) {
			let annotations = this._annotationsBySectionIndex[sectionIndex];
			annotations.forEach((hash) => {
				let annotation = this._annotations[hash];
				annotation.attach(view);
			});
		}
	}

	/**
	 * Hook for removing annotation from a view
	 * @param {View} view
	 * @private
	 */
	clear (view: AnnotationView): void {
		let sectionIndex = view.index;
		if (sectionIndex in this._annotationsBySectionIndex) {
			let annotations = this._annotationsBySectionIndex[sectionIndex];
			annotations.forEach((hash) => {
				let annotation = this._annotations[hash];
				annotation.detach(view);
			});
		}
	}

	/**
	 * [Not Implemented] Show annotations
	 * @TODO: needs implementation in View
	 */
	show (): void {

	}

	/**
	 * [Not Implemented] Hide annotations
	 * @TODO: needs implementation in View
	 */
	hide (): void {

	}

}

/**
 * Annotation object
 * @class
 * @param {object} options
 * @param {string} options.type Type of annotation to add: "highlight", "underline", "mark"
 * @param {EpubCFI} options.cfiRange EpubCFI range to attach annotation to
 * @param {object} options.data Data to assign to annotation
 * @param {int} options.sectionIndex Index in the Spine of the Section annotation belongs to
 * @param {function} [options.cb] Callback after annotation is clicked
 * @param {string} className CSS class to assign to annotation
 * @param {object} styles CSS styles to assign to annotation
 * @returns {Annotation} annotation
 */
export class Annotation {
	type: AnnotationType;
	cfiRange: string;
	data: AnnotationData | undefined;
	sectionIndex: number;
	mark: unknown;
	cb: AnnotationCallback | undefined;
	className: string | undefined;
	styles: AnnotationStyles | undefined;

	constructor ({
		type,
		cfiRange,
		data,
		sectionIndex,
		cb,
		className,
		styles
	}: AnnotationOptions) {
		this.type = type;
		this.cfiRange = cfiRange;
		this.data = data;
		this.sectionIndex = sectionIndex;
		this.mark = undefined;
		this.cb = cb;
		this.className = className;
		this.styles = styles;
	}

	/**
	 * Update stored data
	 * @param {object} data
	 */
	update (data: AnnotationData): void {
		this.data = data;
	}

	/**
	 * Add to a view
	 * @param {View} view
	 */
	attach (view: AnnotationView): unknown {
		let {cfiRange, data, type, cb, className, styles} = this;
		let result: unknown;

		if (type === "highlight") {
			result = view.highlight(cfiRange, data, cb, className, styles);
		} else if (type === "underline") {
			result = view.underline(cfiRange, data, cb, className, styles);
		} else if (type === "mark") {
			result = view.mark(cfiRange, data, cb);
		}

		this.mark = result;
		this.emit(EVENTS.ANNOTATION.ATTACH, result);
		return result;
	}

	/**
	 * Remove from a view
	 * @param {View} view
	 */
	detach (view?: AnnotationView): unknown {
		let {cfiRange, type} = this;
		let result: unknown;

		if (view) {
			if (type === "highlight") {
				result = view.unhighlight(cfiRange);
			} else if (type === "underline") {
				result = view.ununderline(cfiRange);
			} else if (type === "mark") {
				result = view.unmark(cfiRange);
			}
		}

		this.mark = undefined;
		this.emit(EVENTS.ANNOTATION.DETACH, result);
		return result;
	}

	/**
	 * [Not Implemented] Get text of an annotation
	 * @TODO: needs implementation in contents
	 */
	text (): void {

	}

}

export interface Annotation {
	emit(type: string, ...args: any[]): void;
	on(type: string, listener: (...args: any[]) => void): unknown;
	off(type: string, listener: (...args: any[]) => void): unknown;
	once(type: string, listener: (...args: any[]) => void): unknown;
}

EventEmitter(Annotation.prototype);


export default Annotations
