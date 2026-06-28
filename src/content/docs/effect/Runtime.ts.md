---
title: Runtime.ts
nav_order: 95
parent: "effect"
---

## Runtime.ts overview

Helpers for turning an `Effect` program into a host application's main entry
point. This module is the low-level layer used by platform adapters to run a
main effect, observe its fiber, report unhandled failures, and translate the
resulting `Exit` into an application or process exit code. It provides
`makeRunMain`, the default teardown behavior, and error markers for custom
exit codes and already-reported failures. Application code usually calls the
platform-provided runner instead of using this module directly.

Since v4.0.0

---

## Exports Grouped by Category

- [accessors](#accessors)
  - [getErrorExitCode](#geterrorexitcode)
  - [getErrorReported](#geterrorreported)
- [models](#models)
  - [Teardown (interface)](#teardown-interface)
- [running](#running)
  - [defaultTeardown](#defaultteardown)
  - [makeRunMain](#makerunmain)
- [symbols](#symbols)
  - [errorExitCode](#errorexitcode)
  - [errorExitCode (type alias)](#errorexitcode-type-alias)
  - [errorReported](#errorreported)
  - [errorReported (type alias)](#errorreported-type-alias)

---

# accessors

## getErrorExitCode

Reads the runtime exit-code marker from an unknown error value.

**When to use**

Use to read a custom failure exit code from an unknown error value, falling
back to the default failure code.

**Details**

Returns the numeric `[Runtime.errorExitCode]` property when it is present on
an object. Otherwise returns `1`, the default failure exit code used by
`defaultTeardown`.

**Gotchas**

Non-object values, missing markers, and non-number marker values all return
`1`.

**See**

- `errorExitCode` for the marker read by this function

**Signature**

```ts
declare const getErrorExitCode: (u: unknown) => number
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Runtime.ts#L333)

Since v4.0.0

## getErrorReported

Reads the runtime error-reporting marker from an unknown error value.

**When to use**

Use to read whether an unknown error value should be treated as already
reported by the default main runner.

**Details**

Returns a boolean `[Runtime.errorReported]` property when it is present on an
object. Otherwise returns `true`, so failures are logged by default.

**Gotchas**

Non-object values, missing markers, and non-boolean marker values all return
`true`.

**See**

- `errorReported` for the marker read by this function

**Signature**

```ts
declare const getErrorReported: (u: unknown) => boolean
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Runtime.ts#L424)

Since v4.0.0

# models

## Teardown (interface)

Represents a teardown function that handles program completion and determines the exit code.

**When to use**

Use when integrating `makeRunMain` with a host platform that needs to
translate an Effect `Exit` into a process, worker, or application exit code.

**Details**

A teardown function is called when an Effect program completes, either
successfully or with a failure. It determines the appropriate exit code and
can perform cleanup before invoking the supplied `onExit` callback.

**Example** (Customizing teardown behavior)

```ts
import { Effect, Exit, Runtime } from "effect"

// Custom teardown that logs completion status
const customTeardown: Runtime.Teardown = (exit, onExit) => {
  if (Exit.isSuccess(exit)) {
    console.log("Program completed successfully with value:", exit.value)
    onExit(0)
  } else {
    console.log("Program failed with cause:", exit.cause)
    onExit(1)
  }
}

// Use with makeRunMain
const runMain = Runtime.makeRunMain(({ fiber, teardown }) => {
  fiber.addObserver((exit) => {
    teardown(exit, (code) => {
      console.log(`Exiting with code: ${code}`)
    })
  })
})

const program = Effect.succeed("Hello, World!")
runMain(program, { teardown: customTeardown })
```

**Signature**

```ts
export interface Teardown {
  <E, A>(exit: Exit.Exit<E, A>, onExit: (code: number) => void): void
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Runtime.ts#L64)

Since v4.0.0

# running

## defaultTeardown

The default teardown function that determines exit codes from an Effect exit.

**When to use**

Use as the standard teardown for main programs with conventional process
exit codes and support for `errorExitCode`.

**Details**

This teardown follows these exit-code rules:

- `0` for successful completion.
- `130` for interruption-only failures.
- The squashed error's `errorExitCode` value for other failures when
  present.
- `1` for other failures.

**Gotchas**

The `130` code is used only when the Cause contains interruptions and no
other failure reasons. Mixed causes use the squashed error path instead.

**Example** (Referencing default teardown)

```ts
import { Exit, Runtime } from "effect"

const logExitCode = (exit: Exit.Exit<any, any>) => {
  Runtime.defaultTeardown(exit, (code) => {
    console.log(`Exit code: ${code}`)
  })
}

logExitCode(Exit.succeed(42))
// Output: Exit code: 0

logExitCode(Exit.fail("error"))
// Output: Exit code: 1

logExitCode(Exit.interrupt(123))
// Output: Exit code: 130
```

**See**

- `errorExitCode` for customizing failure exit codes

**Signature**

```ts
declare const defaultTeardown: Teardown
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Runtime.ts#L117)

Since v4.0.0

## makeRunMain

Creates a platform-specific main program runner that handles Effect execution lifecycle.

**When to use**

Use when building a runtime adapter for a host platform.

**Details**

The runner executes Effect programs as main entry points. The provided
function receives a forked fiber and a teardown callback so it can install
platform-specific signal handling, fiber observers, and final exit behavior.

Most applications should use a platform-provided runner, such as
`NodeRuntime.runMain`, rather than constructing one directly.

`disableErrorReporting` disables the automatic log emitted for unreported
non-interruption failures. It does not change exit-code calculation or the
custom teardown callback.

**Gotchas**

The setup function is responsible for observing the fiber and eventually
invoking teardown. `makeRunMain` also tries to keep the host process alive
with a long interval while the main fiber is running; if the host blocks
timers, the runner still starts but cannot use that keep-alive fallback.

**Example** (Creating platform runners)

```ts
import { Effect, Fiber, Runtime } from "effect"

// Create a simple runner for a hypothetical platform
const runMain = Runtime.makeRunMain(({ fiber, teardown }) => {
  // Set up signal handling
  const handleSignal = () => {
    Effect.runSync(Fiber.interrupt(fiber))
  }

  // Add signal listeners (platform-specific)
  // process.on('SIGINT', handleSignal)
  // process.on('SIGTERM', handleSignal)

  // Handle fiber completion
  fiber.addObserver((exit) => {
    teardown(exit, (code) => {
      console.log(`Program finished with exit code: ${code}`)
      // process.exit(code)
    })
  })
})

// Use the runner
const program = Effect.gen(function* () {
  yield* Effect.log("Starting program")
  yield* Effect.sleep(1000)
  yield* Effect.log("Program completed")
  return "success"
})

// Run with default options
runMain(program)

// Run with custom teardown
runMain(program, {
  teardown: (exit, onExit) => {
    console.log("Custom teardown logic")
    Runtime.defaultTeardown(exit, onExit)
  }
})
```

**Signature**

```ts
declare const makeRunMain: (
  f: <E, A>(options: { readonly fiber: Fiber.Fiber<A, E>; readonly teardown: Teardown }) => void
) => {
  (options?: {
    readonly disableErrorReporting?: boolean | undefined
    readonly teardown?: Teardown | undefined
  }): <E, A>(effect: Effect.Effect<A, E>) => void
  <E, A>(
    effect: Effect.Effect<A, E>,
    options?: { readonly disableErrorReporting?: boolean | undefined; readonly teardown?: Teardown | undefined }
  ): void
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Runtime.ts#L201)

Since v4.0.0

# symbols

## errorExitCode

Allows associating an exit code with an error for determining the process
exit code on failure.

**When to use**

Use when error classes should map failures to a specific process exit code
when handled by `defaultTeardown`.

**Details**

Attach this marker as a readonly property on an error object. When the main
program fails, `defaultTeardown` squashes the Cause and reads the marker
from the resulting error value.

**Gotchas**

The marker is read from the squashed failure value. If a Cause contains
multiple failures, the selected squashed error determines the exit code.

**Example** (Setting a process exit code)

```ts
import { Data, Effect, Runtime } from "effect"
import { NodeRuntime } from "@effect/platform-node"

class MyError extends Data.TaggedError("MyError") {
  readonly [Runtime.errorExitCode] = 42
}

// If the program fails with MyError, the process will exit with code 42
NodeRuntime.runMain(Effect.fail(new MyError()))
```

**See**

- `errorReported` for controlling automatic error logging
- `defaultTeardown` for the default failure exit-code rules that read this marker
- `getErrorExitCode` for reading the marker from unknown error values

**Signature**

```ts
declare const errorExitCode: "~effect/Runtime/errorExitCode"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Runtime.ts#L307)

Since v4.0.0

## errorExitCode (type alias)

Type-level key for the `Runtime.errorExitCode` marker.

**When to use**

Use to type properties keyed by `Runtime.errorExitCode` on custom error
values.

**Signature**

```ts
type errorExitCode = "~effect/Runtime/errorExitCode"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Runtime.ts#L264)

Since v4.0.0

## errorReported

Defines the runtime marker that controls default `runMain` error logging for an error.

**When to use**

Use when you need error classes reported by application code to avoid being
logged again by the default main runner.

**Details**

Set `[Runtime.errorReported]` to `false` on an error object to suppress the
runtime log because the error has already been reported. Omitted or
non-boolean values are treated as `true`, so failures are logged by default.

**Gotchas**

This marker controls only automatic error logging. It does not change the
failure Cause or the process exit code.
`makeRunMain` reads the marker from `Cause.squash(cause)`, so for causes
with multiple failures, the squashed error determines whether default logging
is suppressed.

**Example** (Suppressing error reporting)

```ts
import { Data, Effect, Runtime } from "effect"
import { NodeRuntime } from "@effect/platform-node"

class MyError extends Data.TaggedError("MyError") {
  readonly [Runtime.errorReported] = false
}

// If the program fails with MyError, the process will exit with code 1 but
// no error will be logged.
NodeRuntime.runMain(Effect.fail(new MyError()))
```

**See**

- `errorExitCode` for controlling failure exit codes
- `getErrorReported` for reading the marker from unknown error values

**Signature**

```ts
declare const errorReported: "~effect/Runtime/errorReported"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Runtime.ts#L399)

Since v4.0.0

## errorReported (type alias)

Type-level key for the `Runtime.errorReported` marker.

**When to use**

Use to type properties keyed by `Runtime.errorReported` on custom error
values.

**Signature**

```ts
type errorReported = "~effect/Runtime/errorReported"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Runtime.ts#L354)

Since v4.0.0
