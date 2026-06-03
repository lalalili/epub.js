import { Deferred } from "./core";

export type QueueTask = (...args: any[]) => any;

export interface QueuedItem {
  args?: any[];
  deferred?: Deferred<any>;
  promise: Promise<any>;
  task?: QueueTask;
}

export default class Queue {
  constructor(context?: any);

  _q: QueuedItem[];
  context: any;
  defered: Deferred<any>;
  paused: boolean;
  running: boolean | Promise<any> | undefined;
  tick: any;

  enqueue(...items: any[]): Promise<any>;

  dequeue(): Promise<any>;

  dump(): void;

  run(): Promise<any>;

  flush(): Promise<any> | boolean | undefined;

  clear(): void;

  length(): number;

  pause(): void;

  stop(): void;
}

export const Task: {
  new(task: Function, args?: any[], context?: any): (...args: any[]) => Promise<any>;
};
