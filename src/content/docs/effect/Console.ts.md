---
title: Console.ts
nav_order: 15
parent: "effect"
---

## Console.ts overview

Wraps console operations in Effect.

The `Console` service exposes common console methods such as logging,
warnings, errors, groups, counters, tables, and timers. Because console access
goes through a service, programs can use custom console implementations in
tests or other environments. This module also includes scoped helpers that
close console groups or timers automatically.

Since v2.0.0

---

## Exports Grouped by Category

- [accessors](#accessors)
  - [assert](#assert)
  - [clear](#clear)
  - [count](#count)
  - [countReset](#countreset)
  - [debug](#debug)
  - [dir](#dir)
  - [dirxml](#dirxml)
  - [error](#error)
  - [group](#group)
  - [info](#info)
  - [log](#log)
  - [table](#table)
  - [time](#time)
  - [timeLog](#timelog)
  - [trace](#trace)
  - [warn](#warn)
  - [withGroup](#withgroup)
  - [withTime](#withtime)
- [constructors](#constructors)
  - [consoleWith](#consolewith)
- [models](#models)
  - [Console (interface)](#console-interface)
- [references](#references)
  - [Console](#console)

---

# accessors

## assert

Writes the supplied assertion message to the console as an error when `condition` is false; when `condition` is true, no console output is produced.

**Example** (Logging failed assertions)

```ts
import { Console, Effect } from "effect"

const program = Effect.gen(function* () {
  yield* Console.assert(2 + 2 === 4, "Math is working correctly")
  yield* Console.assert(2 + 2 === 5, "This will be logged as an error")
})
```

**Signature**

```ts
declare const assert: (condition: boolean, ...args: ReadonlyArray<any>) => Effect.Effect<void>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Console.ts#L117)

Since v2.0.0

## clear

Runs the current console service's clear operation.

**When to use**

Use to request that the active console implementation clear its visible
output.

**Gotchas**

The clearing behavior depends on the active console implementation and host
environment.

**Example** (Clearing console output)

```ts
import { Console, Effect } from "effect"

const program = Effect.gen(function* () {
  yield* Console.log("This will be cleared")
  yield* Console.clear
  yield* Console.log("This appears after clearing")
})
```

**Signature**

```ts
declare const clear: Effect.Effect<void, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Console.ts#L152)

Since v2.0.0

## count

Logs and increments the counter associated with `label`, using the console's default counter when no label is provided.

**Example** (Counting repeated calls)

```ts
import { Console, Effect } from "effect"

const program = Effect.gen(function* () {
  yield* Console.count("my-counter")
  yield* Console.count("my-counter") // Will show: my-counter: 2
  yield* Console.count() // Default counter
})
```

**Signature**

```ts
declare const count: (label?: string) => Effect.Effect<void>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Console.ts#L176)

Since v2.0.0

## countReset

Resets the counter associated with the specified label back to zero.

**Example** (Resetting a counter)

```ts
import { Console, Effect } from "effect"

const program = Effect.gen(function* () {
  yield* Console.count("my-counter")
  yield* Console.count("my-counter") // Will show: my-counter: 2
  yield* Console.countReset("my-counter")
  yield* Console.count("my-counter") // Will show: my-counter: 1
})
```

**Signature**

```ts
declare const countReset: (label?: string) => Effect.Effect<void>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Console.ts#L202)

Since v2.0.0

## debug

Writes a debug message through the current `Console` service.

**Details**

The arguments are passed to the service's `debug` method when the returned
Effect is executed. Any filtering behavior depends on the active console
implementation.

**Example** (Writing debug messages)

```ts
import { Console, Effect } from "effect"

const program = Effect.gen(function* () {
  yield* Console.debug("Debug info:", { userId: 123, action: "login" })
  yield* Console.debug("Processing step", 1, "of", 5)
})
```

**Signature**

```ts
declare const debug: (...args: ReadonlyArray<any>) => Effect.Effect<void>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Console.ts#L232)

Since v2.0.0

## dir

Displays an interactive list of the properties of the specified object, optionally using console-specific inspection options for debugging complex data structures.

**Example** (Inspecting an object)

```ts
import { Console, Effect } from "effect"

const program = Effect.gen(function* () {
  const obj = { name: "John", age: 30, nested: { city: "New York" } }
  yield* Console.dir(obj)
  yield* Console.dir(obj, { depth: 2, colors: true })
})
```

**Signature**

```ts
declare const dir: (item: any, options?: any) => Effect.Effect<void>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Console.ts#L257)

Since v2.0.0

## dirxml

Displays an interactive tree of descendant XML or HTML elements, which is particularly useful for inspecting DOM elements in browser environments.

**Example** (Inspecting XML-like data)

```ts
import { Console, Effect } from "effect"

const program = Effect.gen(function* () {
  yield* Console.dirxml('<user id="1">Ada</user>')
})

Effect.runSync(program)
// <user id="1">Ada</user>
```

**Signature**

```ts
declare const dirxml: (...args: ReadonlyArray<any>) => Effect.Effect<void>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Console.ts#L283)

Since v2.0.0

## error

Writes an error-level message to the console, typically displayed with error
styling by the active console implementation.

**Example** (Writing error messages)

```ts
import { Console, Effect } from "effect"

const program = Effect.gen(function* () {
  yield* Console.error("Something went wrong!")
  yield* Console.error("Error details:", {
    code: 500,
    message: "Internal Server Error"
  })
})
```

**Signature**

```ts
declare const error: (...args: ReadonlyArray<any>) => Effect.Effect<void>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Console.ts#L311)

Since v2.0.0

## group

Creates a scoped console group, optionally collapsed and labeled, and closes it automatically when the Effect scope is finalized.

**Example** (Grouping scoped output)

```ts
import { Console, Effect } from "effect"

const program = Effect.gen(function* () {
  yield* Effect.scoped(
    Effect.gen(function* () {
      yield* Console.group({ label: "User Processing" })
      yield* Console.log("Loading user data...")
      yield* Console.log("Validating user...")
      yield* Console.log("User processed successfully")
    })
  )
})
```

**Signature**

```ts
declare const group: (
  options?: { label?: string | undefined; collapsed?: boolean | undefined } | undefined
) => Effect.Effect<void, never, Scope>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Console.ts#L341)

Since v2.0.0

## info

Writes an informational message to the console, typically displayed with info
styling by the active console implementation.

**Example** (Writing informational messages)

```ts
import { Console, Effect } from "effect"

const program = Effect.gen(function* () {
  yield* Console.info("Application started successfully")
  yield* Console.info("Server configuration:", {
    port: 3000,
    env: "development"
  })
})
```

**Signature**

```ts
declare const info: (...args: ReadonlyArray<any>) => Effect.Effect<void>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Console.ts#L381)

Since v2.0.0

## log

Logs a general-purpose message to the console.

**Example** (Writing log messages)

```ts
import { Console, Effect } from "effect"

const program = Effect.gen(function* () {
  yield* Console.log("Hello, world!")
  yield* Console.log("User data:", { name: "John", age: 30 })
  yield* Console.log("Processing", 42, "items")
})
```

**Signature**

```ts
declare const log: (...args: ReadonlyArray<any>) => Effect.Effect<void>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Console.ts#L406)

Since v2.0.0

## table

Displays tabular data as a formatted table in the console, optionally limited to selected properties.

**Example** (Displaying tabular data)

```ts
import { Console, Effect } from "effect"

const program = Effect.gen(function* () {
  const users = [
    { name: "John", age: 30, city: "New York" },
    { name: "Jane", age: 25, city: "London" },
    { name: "Bob", age: 35, city: "Paris" }
  ]
  yield* Console.table(users)
  yield* Console.table(users, ["name", "age"]) // Only show specific columns
})
```

**Signature**

```ts
declare const table: (tabularData: any, properties?: ReadonlyArray<string>) => Effect.Effect<void>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Console.ts#L435)

Since v2.0.0

## time

Starts a scoped timer for `label` and automatically ends it when the Effect scope is finalized.

**Example** (Timing scoped work)

```ts
import { Console, Effect } from "effect"

const program = Effect.gen(function* () {
  yield* Effect.scoped(
    Effect.gen(function* () {
      yield* Console.time("operation-timer")
      yield* Effect.sleep("1 second")
      yield* Console.log("Operation completed")
      // Timer ends automatically when scope closes
    })
  )
})
```

**Signature**

```ts
declare const time: (label?: string | undefined) => Effect.Effect<void, never, Scope>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Console.ts#L465)

Since v2.0.0

## timeLog

Logs the elapsed time for an existing timer without stopping it, allowing progress reports for long-running operations.

**Example** (Logging timer progress)

```ts
import { Console, Effect } from "effect"

const program = Effect.gen(function* () {
  yield* Effect.scoped(
    Effect.gen(function* () {
      yield* Console.time("long-operation")
      yield* Effect.sleep("500 millis")
      yield* Console.timeLog("long-operation", "Halfway done")
      yield* Effect.sleep("500 millis")
      // Timer ends when scope closes
    })
  )
})
```

**Signature**

```ts
declare const timeLog: (label?: string, ...args: ReadonlyArray<any>) => Effect.Effect<void>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Console.ts#L502)

Since v2.0.0

## trace

Writes the current stack trace to the console to show how the current point in
the code was reached.

**Example** (Writing stack traces)

```ts
import { Console, Effect } from "effect"

const program = Effect.gen(function* () {
  yield* Console.trace("Debug trace point")
  yield* Console.trace("Function call:", { functionName: "processData" })
})
```

**Signature**

```ts
declare const trace: (...args: ReadonlyArray<any>) => Effect.Effect<void>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Console.ts#L527)

Since v2.0.0

## warn

Writes a warning-level message to the console, typically displayed with
warning styling by the active console implementation.

**Example** (Writing warning messages)

```ts
import { Console, Effect } from "effect"

const program = Effect.gen(function* () {
  yield* Console.warn("This feature is deprecated")
  yield* Console.warn("Performance warning:", {
    slowQuery: "SELECT * FROM large_table"
  })
})
```

**Signature**

```ts
declare const warn: (...args: ReadonlyArray<any>) => Effect.Effect<void>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Console.ts#L554)

Since v2.0.0

## withGroup

Runs an Effect inside an optionally labeled or collapsed console group, starting the group before execution and ending it after the Effect completes.

**Example** (Wrapping an effect in a group)

```ts
import { Console, Effect } from "effect"

const program = Effect.gen(function* () {
  yield* Console.withGroup(
    Effect.gen(function* () {
      yield* Console.log("Step 1: Initialize")
      yield* Console.log("Step 2: Process")
      yield* Console.log("Step 3: Complete")
    }),
    { label: "Processing Steps", collapsed: false }
  )
})
```

**Signature**

```ts
declare const withGroup: ((options?: {
  readonly label?: string | undefined
  readonly collapsed?: boolean | undefined
}) => <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<A, E, R>) &
  (<A, E, R>(
    self: Effect.Effect<A, E, R>,
    options?: { readonly label?: string | undefined; readonly collapsed?: boolean | undefined }
  ) => Effect.Effect<A, E, R>)
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Console.ts#L584)

Since v2.0.0

## withTime

Runs an Effect with a console timer, starting the timer before execution and ending it after the Effect completes.

**Example** (Timing an effect)

```ts
import { Console, Effect } from "effect"

const program = Effect.gen(function* () {
  yield* Console.withTime(
    Effect.gen(function* () {
      yield* Effect.sleep("1 second")
      yield* Console.log("Operation completed")
    }),
    "my-operation"
  )
})
```

**Signature**

```ts
declare const withTime: ((label?: string) => <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<A, E, R>) &
  (<A, E, R>(self: Effect.Effect<A, E, R>, label?: string) => Effect.Effect<A, E, R>)
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Console.ts#L638)

Since v2.0.0

# constructors

## consoleWith

Creates an Effect that provides access to the current console service and lets you perform operations with it within an Effect context.

**Example** (Accessing the current console service)

```ts
import { Console, Effect } from "effect"

const program = Console.consoleWith((console) =>
  Effect.sync(() => {
    console.log("Hello, world!")
    console.error("This is an error message")
  })
)
```

**Signature**

```ts
declare const consoleWith: <A, E, R>(f: (console: Console) => Effect.Effect<A, E, R>) => Effect.Effect<A, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Console.ts#L97)

Since v2.0.0

# models

## Console (interface)

Represents a console interface for logging, debugging, timing, and grouping output.

**Signature**

```ts
export interface Console {
  assert(condition: boolean, ...args: ReadonlyArray<any>): void
  clear(): void
  count(label?: string): void
  countReset(label?: string): void
  debug(...args: ReadonlyArray<any>): void
  dir(item: any, options?: any): void
  dirxml(...args: ReadonlyArray<any>): void
  error(...args: ReadonlyArray<any>): void
  group(...args: ReadonlyArray<any>): void
  groupCollapsed(...args: ReadonlyArray<any>): void
  groupEnd(): void
  info(...args: ReadonlyArray<any>): void
  log(...args: ReadonlyArray<any>): void
  table(tabularData: any, properties?: ReadonlyArray<string>): void
  time(label?: string): void
  timeEnd(label?: string): void
  timeLog(label?: string, ...args: ReadonlyArray<any>): void
  trace(...args: ReadonlyArray<any>): void
  warn(...args: ReadonlyArray<any>): void
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Console.ts#L25)

Since v2.0.0

# references

## Console

Context reference for the current console service in the Effect system, allowing access to the active console implementation from within the Effect context.

**When to use**

Use when you need an effect to run against a provided console implementation,
such as tests or alternate runtimes, rather than the default console.

**Details**

When no override is provided, the reference resolves to `globalThis.console`.

**Example** (Accessing the current console)

```ts
import { Console, Effect } from "effect"

const program = Console.consoleWith((console) =>
  Effect.sync(() => {
    console.log("Hello from current console!")
  })
)
```

**See**

- `consoleWith` for using the current console service inside an effect

**Signature**

```ts
declare const Console: Context.Reference<Console>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Console.ts#L76)

Since v2.0.0
