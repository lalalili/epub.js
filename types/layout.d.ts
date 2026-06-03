import Contents from "./contents";

export interface LayoutSettings {
  layout?: string;
  spread?: string;
  minSpreadWidth?: number;
  evenSpreads?: boolean;
  flow?: string;
  direction?: string;
}

export interface LayoutProps {
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

export interface LayoutContent {
  fit(width: number, height: number, section?: unknown): void;
  columns(width: number, height: number, columnWidth: number, gap: number, direction?: string): void;
  size(width: number | null, height: number | null): void;
}

export interface LayoutCount {
  spreads: number;
  pages: number;
}

export default class Layout {
  constructor(settings?: LayoutSettings);

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

  flow(flow?: string): string;

  spread(spread?: string, min?: number): boolean;

  calculate(_width: number, _height: number, _gap?: number): void;

  format(contents: Contents | LayoutContent, section?: unknown, axis?: string): unknown;

  count(totalLength: number, pageLength?: number): LayoutCount;

  update(props: Partial<LayoutProps>): void;

  // Event emitters
  emit(type: string, ...args: unknown[]): void;

  off(type: string, listener: (...args: unknown[]) => void): unknown;

  on(type: string, listener: (...args: unknown[]) => void): unknown;

  once(type: string, listener: (...args: unknown[]) => void): unknown;
}
