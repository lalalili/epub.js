export default class DisplayOptions {
  constructor(displayOptionsDocument?: Document);

  interactive?: string;
  fixedLayout?: string;
  openToSpread?: string;
  orientationLock?: string;

  parse(displayOptionsDocument?: Document): this;

  destroy(): void;
}
