export interface NavItem {
  id: string,
  href: string,
  label: string,
  subitems: Array<NavItem>,
  parent?: string,
  title?: string,
  children?: Array<NavigationInputItem>
}

export interface LandmarkItem {
  href: string,
  label: string,
  type?: string
}

export interface NavigationInputItem {
  id?: string,
  href?: string,
  label?: string,
  title?: string,
  subitems?: Array<NavigationInputItem>,
  children?: Array<NavigationInputItem>,
  parent?: string
}

export type NavigationDocument = Document | XMLDocument;
export type NavigationInput = NavigationDocument | Array<NavigationInputItem>;

export default class Navigation {
  constructor(xml?: NavigationInput);

  toc: Array<NavItem>;
  tocByHref: Record<string, number>;
  tocById: Record<string, number>;
  landmarks: Array<LandmarkItem>;
  landmarksByType: Record<string, number>;
  length: number;

  parse(xml: NavigationInput): void;

  get(): Array<NavItem>;
  get(target: string) : NavItem | undefined;

  landmark(): Array<LandmarkItem>;
  landmark(type: string) : LandmarkItem | undefined;

  load(json: Array<NavigationInputItem>): Array<NavItem>;

  forEach(fn: (item: NavItem, index: number, array: Array<NavItem>) => void): void;

  unpack(toc: Array<NavItem>): void;

  parseNav(navHtml: NavigationDocument): Array<NavItem>;

  parseNavList(navListHtml?: Element, parent?: string): Array<NavItem>;

  navItem(item: Element, parent?: string): NavItem | undefined;

  parseLandmarks(navHtml: NavigationDocument): Array<LandmarkItem>;

  landmarkItem(item: Element): LandmarkItem | undefined;

  parseNcx(navHtml: NavigationDocument): Array<NavItem>;

  ncxItem(item: Element): NavItem;

  getByIndex(target: string, index: number | undefined, navItems: NavItem[]): NavItem | undefined;
}
