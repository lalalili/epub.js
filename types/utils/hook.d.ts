export type HookTask = (...args: any[]) => any;
export type HookRegistration = HookTask | HookTask[];

export interface HooksObject {
  [key: string]: Hook;
}

export default class Hook {
  constructor(context?: any);

  context: any;
  hooks: HookTask[];

  register(...items: HookRegistration[]): void;

  deregister(func: HookTask): void;

  trigger(...args: any[]): Promise<any[]>;

  list(): HookTask[];

  clear(): HookTask[];
}
