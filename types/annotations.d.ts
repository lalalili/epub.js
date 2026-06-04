export type AnnotationType = "highlight" | "underline" | "mark" | string;

export type AnnotationCallback = (...args: unknown[]) => void;

export type AnnotationData = Record<string, unknown>;

export type AnnotationStyles = Record<string, string>;

export type AnnotationMap = Record<string, Annotation>;

export type SectionAnnotationMap = Record<number, string[]>;

export interface AnnotationView {
  index: number;
  highlight(cfiRange: string, data?: AnnotationData, cb?: AnnotationCallback, className?: string, styles?: AnnotationStyles): unknown;
  mark(cfiRange: string, data?: AnnotationData, cb?: AnnotationCallback): unknown;
  underline(cfiRange: string, data?: AnnotationData, cb?: AnnotationCallback, className?: string, styles?: AnnotationStyles): unknown;
  unhighlight(cfiRange: string): unknown;
  unmark(cfiRange: string): unknown;
  ununderline(cfiRange: string): unknown;
}

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

export interface AnnotationOptions {
  type: AnnotationType;
  cfiRange: string;
  data?: AnnotationData;
  sectionIndex: number;
  cb?: AnnotationCallback;
  className?: string;
  styles?: AnnotationStyles;
}

export default class Annotations {
  constructor(rendition: AnnotationsRendition);

  rendition: AnnotationsRendition;
  highlights: Annotation[];
  underlines: Annotation[];
  marks: Annotation[];
  _annotations: AnnotationMap;
  _annotationsBySectionIndex: SectionAnnotationMap;

  add(type: AnnotationType, cfiRange: string, data?: AnnotationData, cb?: AnnotationCallback, className?: string, styles?: AnnotationStyles): Annotation;

  remove(cfiRange: string, type: AnnotationType): void;

  _removeFromAnnotationBySectionIndex(sectionIndex: number, hash: string): void;

  _annotationsAt(index: number): string[];

  highlight(cfiRange: string, data?: AnnotationData, cb?: AnnotationCallback, className?: string, styles?: AnnotationStyles): Annotation;

  underline(cfiRange: string, data?: AnnotationData, cb?: AnnotationCallback, className?: string, styles?: AnnotationStyles): Annotation;

  mark(cfiRange: string, data?: AnnotationData, cb?: AnnotationCallback): Annotation;

  each(...args: unknown[]): void;

  inject(view: AnnotationView): void;

  clear(view: AnnotationView): void;

  show(): void;

  hide(): void;
}

export class Annotation {
  constructor(options: AnnotationOptions);

  type: AnnotationType;
  cfiRange: string;
  data: AnnotationData | undefined;
  sectionIndex: number;
  mark: unknown;
  cb: AnnotationCallback | undefined;
  className: string | undefined;
  styles: AnnotationStyles | undefined;

  update(data: AnnotationData): void;

  attach(view: AnnotationView): unknown;

  detach(view?: AnnotationView): unknown;

  text(): void;

  emit(type: string, ...args: unknown[]): void;

  off(type: string, listener: (...args: unknown[]) => void): unknown;

  on(type: string, listener: (...args: unknown[]) => void): unknown;

  once(type: string, listener: (...args: unknown[]) => void): unknown;
}
