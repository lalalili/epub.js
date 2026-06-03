import Spine from "./spine";
import Section from "./section";
import EpubCFI from "./epubcfi";

export default class Locations {
  constructor(spine?: Spine, request?: Function, pause?: number);

  generate(chars?: number): Promise<Array<string>>;

  process(section: Section): Promise<Array<string>>;

  generateForSection(section?: Section, chars?: number): Promise<Array<string>>;

  locationFromCfi(cfi: string | EpubCFI): number;

  percentageFromCfi(cfi: string | EpubCFI): number | null;

  percentageFromLocation(loc: number): number;

  cfiFromLocation(loc: number | string): string | number;

  cfiFromPercentage(percentage: number): string | number;

  load(locations: string | Array<string>): Array<string>;

  save(): string;

  getCurrent(): number | undefined;

  currentLocation: number | string | undefined;

  length(): number;

  destroy(): void;

  private createRange(): {
    startContainer?: Node,
    startOffset?: number,
    endContainer?: Node,
    endOffset?: number
  };

  private parse(contents: Element, cfiBase: string, chars?: number) : Array<string>;
}
