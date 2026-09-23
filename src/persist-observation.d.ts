/** Optional diagnostics installed by the consumer; never required for reading. */
declare var __PERSIST_RENDERER_BOUNDARY__: {
  enter?: (name: string) => unknown;
  returned?: (token: unknown) => unknown;
  threw?: (token: unknown) => unknown;
} | undefined;
