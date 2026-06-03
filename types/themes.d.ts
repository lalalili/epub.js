import Contents from "./contents";

export type ThemeRules = Record<string, Record<string, string> | string>;

export interface Theme {
  rules?: ThemeRules;
  url?: string;
  serialized?: string;
  injected?: boolean;
}

export interface ThemeOverride {
  value: string;
  priority: boolean;
}

export type InjectedThemes = Array<string> & Record<string, boolean | string | undefined>;

export type ThemeInput = ThemeRules | string;

export interface ThemesContent {
  addClass(name: string): void;
  addStylesheet(url: string): unknown;
  addStylesheetCss(css: string, name: string): unknown;
  addStylesheetRules(rules: ThemeRules, name: string): unknown;
  css(name: string, value?: string, priority?: boolean): unknown;
  removeClass(name: string): void;
}

export interface ThemesRendition {
  getContents(): Array<ThemesContent>;
  hooks: {
    content: {
      register(callback: (contents: ThemesContent) => void): void;
    }
  };
}

export default class Themes {
  constructor(rendition: ThemesRendition);

  rendition?: ThemesRendition;
  _themes?: Record<string, Theme>;
  _overrides?: Record<string, ThemeOverride>;
  _current?: string;
  _injected?: InjectedThemes;

  register(): void;
  register(themeObject: Record<string, ThemeInput>): void;
  register(theme: string): void;
  register(theme: string, url: string): void;
  register(theme: string, themeObject: ThemeRules): void;

  default(theme?: ThemeInput): void;

  registerThemes(themes: Record<string, ThemeInput>): void;

  registerCss(name: string, css: string): void;

  registerUrl(name: string, input: string): void;

  registerRules(name: string, rules: ThemeRules): void;

  select(name: string): void;

  update(name: string): void;

  inject(content: Contents | ThemesContent): void;

  add(name: string, contents: Contents | ThemesContent): void;

  override(name: string, value: string, priority?: boolean): void;

  removeOverride(name: string): void;

  overrides(contents: Contents | ThemesContent): void;

  fontSize(size: string): void;

  font(f: string): void;

  destroy(): void;
}
