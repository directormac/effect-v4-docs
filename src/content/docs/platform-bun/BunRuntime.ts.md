---
title: BunRuntime.ts
nav_order: 13
parent: "@effect/platform-bun"
---

## BunRuntime.ts overview

Bun process runner for Effect programs.

This module exports `runMain`, which runs one Effect as the main process
fiber in Bun. It reuses the shared Node runtime runner, including its error
reporting, signal handling, and optional teardown behavior.

Since v4.0.0

---

## Exports Grouped by Category

- [running](#running)
  - [runMain](#runmain)

---

# running

## runMain

Helps you run a main effect with built-in error handling, logging, and signal management.

**When to use**

Use to run a Bun application's main Effect with structured error handling,
log management, interrupt support, or advanced teardown capabilities.

**Details**

This function launches an Effect as the main entry point, setting exit codes
based on success or failure, handling interrupts (e.g., Ctrl+C), and optionally
logging errors. By default, it logs errors and uses a "pretty" format, but both
behaviors can be turned off. You can also provide custom teardown logic to
finalize resources or produce different exit codes.

An optional object that can include:

- `disableErrorReporting`: Turn off automatic error logging.
- `disablePrettyLogger`: Avoid adding the pretty logger.
- `teardown`: Provide custom finalization logic.

**Signature**

```ts
declare const runMain: {
  (options?: {
    readonly disableErrorReporting?: boolean | undefined
    readonly teardown?: Teardown | undefined
  }): <E, A>(effect: Effect<A, E>) => void
  <E, A>(
    effect: Effect<A, E>,
    options?: { readonly disableErrorReporting?: boolean | undefined; readonly teardown?: Teardown | undefined }
  ): void
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-bun/src/BunRuntime.ts#L38)

Since v4.0.0
