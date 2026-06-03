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
  id: string,
  href: string,
  label?: string,
  title?: string,
  subitems?: Array<NavigationInputItem>,
  children?: Array<NavigationInputItem>,
  parent?: string
}

export default class Navigation {
  constructor(xml?: Document | XMLDocument | Array<NavigationInputItem>);

  toc: Array<NavItem>;
  tocByHref: Record<string, number>;
  tocById: Record<string, number>;
  landmarks: Array<LandmarkItem>;
  landmarksByType: Record<string, number>;
  length: number;

  parse(xml: Document | XMLDocument | Array<NavigationInputItem>): void;

  get(): Array<NavItem>;
  get(target: string) : NavItem | undefined;

  landmark(): Array<LandmarkItem>;
  landmark(type: string) : LandmarkItem | undefined;

  load(json: Array<NavigationInputItem>): Array<NavItem>;

  forEach(fn: (item: NavItem, index: number, array: Array<NavItem>) => void): void;

  private unpack(toc: Array<NavItem>): void;

  private parseNav(navHtml: XMLDocument): Array<NavItem>;

  private navItem(item: Element): NavItem;

  private parseLandmarks(navHtml: XMLDocument): Array<LandmarkItem>;

  private landmarkItem(item: Element): LandmarkItem;

  private parseNcx(navHtml: XMLDocument): Array<NavItem>;

  private ncxItem(item: Element): NavItem;

  private getByIndex(target: string, index: number, navItems: NavItem[]): NavItem;
}
