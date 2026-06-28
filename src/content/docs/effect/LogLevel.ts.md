---
title: LogLevel.ts
nav_order: 56
parent: "effect"
---

## LogLevel.ts overview

Log-level types and helpers used by Effect logging. The module defines all
accepted log levels, the concrete emitted severities, the ordered level list,
equality and ordering instances, threshold comparison helpers, and an effect
for checking whether a level is enabled by the current logging settings.

Since v2.0.0

---

## Exports Grouped by Category

- [filtering](#filtering)
  - [isEnabled](#isenabled)
- [instances](#instances)
  - [Equivalence](#equivalence)
- [models](#models)
  - [LogLevel (type alias)](#loglevel-type-alias)
  - [Severity (type alias)](#severity-type-alias)
  - [values](#values)
- [ordering](#ordering)
  - [Order](#order)
  - [getOrdinal](#getordinal)
  - [isGreaterThan](#isgreaterthan)
  - [isGreaterThanOrEqualTo](#isgreaterthanorequalto)
  - [isLessThan](#islessthan)
  - [isLessThanOrEqualTo](#islessthanorequalto)

---

# filtering

## isEnabled

Checks whether a given log level is enabled for the current fiber.

**When to use**

Use to check whether a log level would be emitted under the current fiber's
minimum log level.

**Details**

A log level is enabled when it is greater than or equal to
`References.MinimumLogLevel`.

**Example** (Checking current fiber log level)

```ts
import { Effect, LogLevel, References } from "effect"

const program = Effect.gen(function* () {
  const debugEnabled = yield* LogLevel.isEnabled("Debug")
  const errorEnabled = yield* LogLevel.isEnabled("Error")

  console.log({ debugEnabled, errorEnabled })
})

const warnOnly = program.pipe(Effect.provideService(References.MinimumLogLevel, "Warn"))
```

**Signature**

```ts
declare const isEnabled: (self: LogLevel) => Effect.Effect<boolean>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/LogLevel.ts#L411)

Since v4.0.0

# instances

## Equivalence

Equivalence instance for log levels using strict equality (`===`).

**When to use**

Use to compare two `LogLevel` values when only the exact same level should
match.

**Details**

Each log level string, including `All` and `None`, only matches itself.

**Example** (Comparing log levels)

```ts
import { LogLevel } from "effect"

console.log(LogLevel.Equivalence("Error", "Error")) // true
console.log(LogLevel.Equivalence("Error", "Info")) // false
```

**See**

- `Order` for severity ordering rather than exact level equality
- `isGreaterThanOrEqualTo` for minimum-threshold checks

**Signature**

```ts
declare const Equivalence: Equ.Equivalence<LogLevel>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/LogLevel.ts#L164)

Since v4.0.0

# models

## LogLevel (type alias)

Represents every level used by Effect logging, including concrete message
severities and the `All` and `None` sentinel levels.

**When to use**

Use to type values that may be either concrete log message severities or
logging configuration sentinels.

**Details**

The levels are ordered from most severe to least severe:

- `All` - Special level that allows all messages
- `Fatal` - System is unusable, immediate attention required
- `Error` - Error conditions that should be investigated
- `Warn` - Warning conditions that may indicate problems
- `Info` - Informational messages about normal operation
- `Debug` - Debug information useful during development
- `Trace` - Very detailed trace information
- `None` - Special level that suppresses all messages

**Example** (Using log levels)

```ts
import { Effect } from "effect"

// Using log levels with Effect logging
const program = Effect.gen(function* () {
  yield* Effect.logFatal("System failure")
  yield* Effect.logError("Database error")
  yield* Effect.logWarning("High memory usage")
  yield* Effect.logInfo("User logged in")
  yield* Effect.logDebug("Processing request")
  yield* Effect.logTrace("Variable state")
})

// Type-safe log level variables
const errorLevel = "Error" // LogLevel
const debugLevel = "Debug" // LogLevel
```

**Signature**

```ts
type LogLevel = "All" | "Fatal" | "Error" | "Warn" | "Info" | "Debug" | "Trace" | "None"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/LogLevel.ts#L60)

Since v2.0.0

## Severity (type alias)

Log levels that represent actual message severities, excluding the `All` and
`None` sentinel levels.

**When to use**

Use when typing emitted log message severities, such as explicit log calls,
current log level references, or error-report severity annotations, where
`All` and `None` are not valid values.

**See**

- `LogLevel` for the wider log-level type that also accepts the
  `All` and `None` sentinel levels
- `values` for the runtime list of all accepted `LogLevel` values,
  including sentinels

**Signature**

```ts
type Severity = "Fatal" | "Error" | "Warn" | "Info" | "Debug" | "Trace"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/LogLevel.ts#L80)

Since v4.0.0

## values

Returns all `LogLevel` values in order from `All` through the concrete severities to
`None`.

**When to use**

Use to enumerate or validate all accepted `LogLevel` string values, including
the `All` and `None` sentinel levels.

**Details**

The array order matches the module severity order: `All`, concrete
severities from `Fatal` to `Trace`, then `None`.

**Gotchas**

This list includes `All` and `None`, so it is not limited to concrete emitted
severities.

**See**

- `Severity` for the concrete message severity type that excludes `All` and `None`
- `Order` for comparing these levels by severity order

**Signature**

```ts
declare const values: ReadonlyArray<LogLevel>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/LogLevel.ts#L107)

Since v4.0.0

# ordering

## Order

Order instance for `LogLevel` that defines the severity ordering.

**When to use**

Use to sort or compare log levels according to Effect's severity order.

**Details**

This order treats "All" as the least restrictive level and "None" as the most restrictive,
with Fatal being the most severe actual log level.

**Example** (Ordering log levels)

```ts
import { LogLevel } from "effect"

// Compare log levels using Order
console.log(LogLevel.Order("Error", "Info")) // 1 (Error > Info)
console.log(LogLevel.Order("Debug", "Error")) // -1 (Debug < Error)
console.log(LogLevel.Order("Info", "Info")) // 0 (Info == Info)
```

**Signature**

```ts
declare const Order: Ord.Order<LogLevel>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/LogLevel.ts#L135)

Since v2.0.0

## getOrdinal

Returns the ordinal value of the log level.

**When to use**

Use to project a `LogLevel` into the numeric sort key used by
`LogLevel.Order` when custom ordering code or an integration needs a number
instead of an `Order` comparison.

**Details**

The mapping is `All` to `Number.MIN_SAFE_INTEGER`, `Trace` to `0`, `Debug` to
`10000`, `Info` to `20000`, `Warn` to `30000`, `Error` to `40000`, `Fatal` to
`50000`, and `None` to `Number.MAX_SAFE_INTEGER`.

**Gotchas**

These ordinals are internal sort keys; do not treat them as external severity
numbers.

**See**

- `Order` for comparing log levels without exposing numeric keys
- `isGreaterThanOrEqualTo` for minimum-threshold filtering

**Signature**

```ts
declare const getOrdinal: (self: LogLevel) => number
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/LogLevel.ts#L192)

Since v4.0.0

## isGreaterThan

Determines if the first log level is more severe than the second.

**When to use**

Use to check whether one log level is strictly more severe than another.

**Details**

Returns `true` if `self` represents a more severe level than `that`.

**Example** (Checking higher severity)

```ts
import { LogLevel } from "effect"

// Check if Error is more severe than Info
console.log(LogLevel.isGreaterThan("Error", "Info")) // true
console.log(LogLevel.isGreaterThan("Debug", "Error")) // false

// Use with filtering
const isFatal = LogLevel.isGreaterThan("Fatal", "Warn")
const isError = LogLevel.isGreaterThan("Error", "Warn")
const isDebug = LogLevel.isGreaterThan("Debug", "Warn")
console.log(isFatal) // true
console.log(isError) // true
console.log(isDebug) // false

// Curried usage
const isMoreSevereThanInfo = LogLevel.isGreaterThan("Info")
console.log(isMoreSevereThanInfo("Error")) // true
console.log(isMoreSevereThanInfo("Debug")) // false
```

**Signature**

```ts
declare const isGreaterThan: {
  (that: LogLevel): (self: LogLevel) => boolean
  (self: LogLevel, that: LogLevel): boolean
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/LogLevel.ts#L231)

Since v4.0.0

## isGreaterThanOrEqualTo

Determines if the first log level is more severe than or equal to the second.

**When to use**

Use to implement minimum log-level filtering by checking whether a message
level meets a threshold.

**Details**

Returns `true` if `self` represents a level that is more severe than or equal to `that`.

**Example** (Filtering by minimum log level)

```ts
import { Logger, LogLevel } from "effect"

// Check if level meets minimum threshold
console.log(LogLevel.isGreaterThanOrEqualTo("Error", "Error")) // true
console.log(LogLevel.isGreaterThanOrEqualTo("Error", "Info")) // true
console.log(LogLevel.isGreaterThanOrEqualTo("Debug", "Info")) // false

// Create a logger that only logs Info and above
const infoLogger = Logger.make((options) => {
  if (LogLevel.isGreaterThanOrEqualTo(options.logLevel, "Info")) {
    console.log(`[${options.logLevel}] ${options.message}`)
  }
})

// Production logger - only Error and Fatal
const productionLogger = Logger.make((options) => {
  if (LogLevel.isGreaterThanOrEqualTo(options.logLevel, "Error")) {
    console.error(`${options.date.toISOString()} [${options.logLevel}] ${options.message}`)
  }
})

// Curried usage for filtering
const isInfoOrAbove = LogLevel.isGreaterThanOrEqualTo("Info")
const shouldLog = isInfoOrAbove("Error") // true
```

**Signature**

```ts
declare const isGreaterThanOrEqualTo: {
  (that: LogLevel): (self: LogLevel) => boolean
  (self: LogLevel, that: LogLevel): boolean
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/LogLevel.ts#L282)

Since v4.0.0

## isLessThan

Determines if the first log level is less severe than the second.

**When to use**

Use to check whether one log level is strictly less severe than another.

**Details**

Returns `true` if `self` represents a less severe level than `that`.

**Example** (Checking lower severity)

```ts
import { LogLevel } from "effect"

// Check if Debug is less severe than Info
console.log(LogLevel.isLessThan("Debug", "Info")) // true
console.log(LogLevel.isLessThan("Error", "Info")) // false

// Filter out verbose logs
const isFatalVerbose = LogLevel.isLessThan("Fatal", "Info")
const isErrorVerbose = LogLevel.isLessThan("Error", "Info")
const isTraceVerbose = LogLevel.isLessThan("Trace", "Info")
console.log(isFatalVerbose) // false (Fatal is not verbose)
console.log(isErrorVerbose) // false (Error is not verbose)
console.log(isTraceVerbose) // true (Trace is verbose)

// Curried usage
const isLessSevereThanError = LogLevel.isLessThan("Error")
console.log(isLessSevereThanError("Info")) // true
console.log(isLessSevereThanError("Fatal")) // false
```

**Signature**

```ts
declare const isLessThan: { (that: LogLevel): (self: LogLevel) => boolean; (self: LogLevel, that: LogLevel): boolean }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/LogLevel.ts#L324)

Since v4.0.0

## isLessThanOrEqualTo

Determines if the first log level is less severe than or equal to the second.

**When to use**

Use to implement maximum log-level filtering by checking whether a level is
at or below a threshold.

**Details**

Returns `true` if `self` represents a level that is less severe than or equal to `that`.

**Example** (Filtering by maximum log level)

```ts
import { Logger, LogLevel } from "effect"

// Check if level is at or below threshold
console.log(LogLevel.isLessThanOrEqualTo("Info", "Info")) // true
console.log(LogLevel.isLessThanOrEqualTo("Debug", "Info")) // true
console.log(LogLevel.isLessThanOrEqualTo("Error", "Info")) // false

// Create a logger that suppresses verbose logs
const quietLogger = Logger.make((options) => {
  if (LogLevel.isLessThanOrEqualTo(options.logLevel, "Info")) {
    console.log(`[${options.logLevel}] ${options.message}`)
  }
})

// Development logger - suppress trace logs
const devLogger = Logger.make((options) => {
  if (LogLevel.isLessThanOrEqualTo(options.logLevel, "Debug")) {
    console.log(`[${options.logLevel}] ${options.message}`)
  }
})

// Curried usage for filtering
const isInfoOrBelow = LogLevel.isLessThanOrEqualTo("Info")
const shouldLog = isInfoOrBelow("Debug") // true
```

**Signature**

```ts
declare const isLessThanOrEqualTo: {
  (that: LogLevel): (self: LogLevel) => boolean
  (self: LogLevel, that: LogLevel): boolean
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/LogLevel.ts#L373)

Since v4.0.0
