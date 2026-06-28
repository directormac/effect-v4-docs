---
title: NodeRuntime.ts
nav_order: 7
parent: "@effect/platform-node-shared"
---

## NodeRuntime.ts overview

Node-compatible process runner for Effect programs.

This module provides the shared `runMain` implementation used by
Node-compatible platform packages. It runs one Effect as the main process
fiber, interrupts that fiber on `SIGINT` or `SIGTERM`, and delegates final
exit-code handling to the configured teardown.

Since v4.0.0

---

## Exports Grouped by Category

- [running](#running)
  - [runMain](#runmain)

---

# running

## runMain

Runs an Effect as the Node process main program, interrupting the fiber on
`SIGINT` or `SIGTERM` and invoking the configured teardown to determine the
process exit code.

**Signature**

```ts
declare const runMain: {
  (options?: {
    readonly disableErrorReporting?: boolean | undefined
    readonly teardown?: Runtime.Teardown | undefined
  }): <E, A>(effect: Effect<A, E>) => void
  <E, A>(
    effect: Effect<A, E>,
    options?: { readonly disableErrorReporting?: boolean | undefined; readonly teardown?: Runtime.Teardown | undefined }
  ): void
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeRuntime.ts#L22)

Since v4.0.0
