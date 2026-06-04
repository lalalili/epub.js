import { Deferred } from "./core";

type AnimationFrameScheduler = (callback: FrameRequestCallback) => number;

export type QueueTask = (...args: unknown[]) => unknown;

export interface QueuedItem {
  args?: unknown[];
  deferred?: Deferred<unknown>;
  promise: Promise<unknown>;
  task?: QueueTask;
}

export default class Queue {
  constructor(context?: unknown);

  _q: QueuedItem[];
  context: unknown;
  defered: Deferred<unknown>;
  paused: boolean;
  running: boolean | Promise<unknown> | undefined;
  tick: AnimationFrameScheduler;

  enqueue(...items: unknown[]): Promise<unknown>;

  dequeue(): Promise<unknown>;

  dump(): void;

  run(): Promise<unknown>;

  flush(): Promise<unknown> | boolean | undefined;

  clear(): void;

  length(): number;

  pause(): void;

  stop(): void;
}

export const Task: {
  new(task: QueueTask, args?: unknown[], context?: unknown): (...args: unknown[]) => Promise<unknown>;
};
