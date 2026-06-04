export type HookTask = (...args: any[]) => unknown;
export type HookRegistration = HookTask | HookTask[];

export interface HooksObject {
  [key: string]: Hook;
}

export default class Hook {
  constructor(context?: unknown);

  context: unknown;
  hooks: HookTask[];

  register(...items: HookRegistration[]): void;

  deregister(func: HookTask): void;

  trigger(...args: any[]): Promise<unknown[]>;

  list(): HookTask[];

  clear(): HookTask[];
}
