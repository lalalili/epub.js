import Section from "../section";
import Layout from "../layout";
import Contents from "../contents";
import View, { ViewSettings } from "./view";
import { EpubCFIPair } from "../mapping";

export interface ViewLocation {
  index: number,
  href: string,
  pages: number[],
  totalPages: number,
  mapping: EpubCFIPair
}

export interface ManagerOptions extends ViewSettings {
  infinite?: boolean,
  overflow?: string,
  [key: string]: unknown
}

export default class Manager {
  constructor(options: object);

  render(element: Element, size?: { width: Number, height: Number }): void;

  resize(width: Number, height: Number): void;

  onOrientationChange(e: Event): void;

  private createView(section: Section): View;

  display(section: Section, target: string | number): Promise<void>;

  private afterDisplayed(view: View): void;

  private afterResized(view: View): void;

  private moveTo(offset: {top: Number, left: Number}): void;

  private append(section: Section): Promise<void>;

  private prepend(section: Section): Promise<void>;

  next(): Promise<void>;

  prev(): Promise<void>;

  current(): View;

  clear(): void;

  currentLocation(): ViewLocation[];

  visible(): View[];

  private scrollBy(x: number, y: number, silent: boolean): void;

  private scrollTo(x: number, y: number, silent: boolean): void;

  private onScroll(): void;

  bounds(): object;

  applyLayout(layout: Layout): void;

  updateLayout(): void;

  setLayout(layout: Layout): void;

  updateAxis(axis: string, forceUpdate: boolean): void;

  updateFlow(flow: string): void;

  getContents(): Contents[];

  direction(dir: string): void;

  isRendered(): boolean;

  destroy(): void;

  // Event emitters
  emit(type: string, ...args: unknown[]): void;

  off(type: string, listener: (...args: unknown[]) => void): unknown;

  on(type: string, listener: (...args: unknown[]) => void): unknown;

  once(type: string, listener: (...args: unknown[]) => void): unknown;
}
