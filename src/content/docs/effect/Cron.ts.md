---
title: Cron.ts
nav_order: 17
parent: "effect"
---

## Cron.ts overview

Utilities for recurring calendar schedules written as cron expressions or
explicit field constraints. A `Cron` value stores allowed seconds, minutes,
hours, days of month, months, weekdays, and an optional time zone. The module
can create or parse schedules, compare them, test whether a date matches, and
find previous or next scheduled occurrences.

Since v2.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [make](#make)
  - [parse](#parse)
  - [parseUnsafe](#parseunsafe)
- [getters](#getters)
  - [next](#next)
  - [prev](#prev)
- [guards](#guards)
  - [isCron](#iscron)
  - [isCronParseError](#iscronparseerror)
- [instances](#instances)
  - [Equivalence](#equivalence)
- [models](#models)
  - [Cron (interface)](#cron-interface)
  - [CronParseError (class)](#cronparseerror-class)
    - [[CronParseErrorTypeId] (property)](#cronparseerrortypeid-property)
- [predicates](#predicates)
  - [equals](#equals)
  - [match](#match)
- [sequencing](#sequencing)
  - [sequence](#sequence)

---

# constructors

## make

Creates a Cron instance from time constraints.

**When to use**

Use to build a cron schedule from explicit sets of allowed time-field values.

**Details**

Constructs a cron schedule by specifying which seconds, minutes, hours,
days, months, and weekdays the schedule should match. Empty arrays mean
"match all" for that time unit.

**Example** (Creating schedules from constraints)

```ts
import { Cron } from "effect"

// Every day at midnight
const midnight = Cron.make({
  minutes: [0],
  hours: [0],
  days: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31
  ],
  months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  weekdays: [0, 1, 2, 3, 4, 5, 6]
})

// Every 15 minutes during business hours on weekdays
const businessHours = Cron.make({
  minutes: [0, 15, 30, 45],
  hours: [9, 10, 11, 12, 13, 14, 15, 16, 17],
  days: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31
  ],
  months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  weekdays: [1, 2, 3, 4, 5] // Monday to Friday
})
```

**See**

- `parse` for building a schedule from a cron expression string

**Signature**

```ts
declare const make: (values: {
  readonly seconds?: Iterable<number> | undefined
  readonly minutes: Iterable<number>
  readonly hours: Iterable<number>
  readonly days: Iterable<number>
  readonly months: Iterable<number>
  readonly weekdays: Iterable<number>
  readonly tz?: DateTime.TimeZone | undefined
}) => Cron
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cron.ts#L350)

Since v2.0.0

## parse

Parses a cron expression safely into a `Cron` instance, returning a `Result`
instead of throwing.

**When to use**

Use to parse cron expressions from configuration or user input while handling
invalid input as a `Result`.

**Details**

The expression may contain five fields, where seconds default to `0`, or six
fields including seconds. Fields support `*`, comma-separated values, ranges,
steps, and month or weekday aliases. Invalid expressions fail with
`CronParseError`.

**Example** (Parsing cron expressions)

```ts
import { Cron, Result } from "effect"
import * as assert from "node:assert"

// At 04:00 on every day-of-month from 8 through 14.
assert.deepStrictEqual(
  Cron.parse("0 0 4 8-14 * *"),
  Result.succeed(
    Cron.make({
      seconds: [0],
      minutes: [0],
      hours: [4],
      days: [8, 9, 10, 11, 12, 13, 14],
      months: [],
      weekdays: []
    })
  )
)
```

**See**

- `parseUnsafe` for throwing on invalid cron expressions
- `make` for constructing a schedule from explicit field constraints

**Signature**

```ts
declare const parse: (cron: string, tz?: DateTime.TimeZone | string) => Result.Result<Cron, CronParseError>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cron.ts#L565)

Since v2.0.0

## parseUnsafe

Parses a cron expression into a `Cron` instance, throwing on failure.

**When to use**

Use when you expect the input to be valid and want to avoid handling the
`Result` type.

**Example** (Parsing cron expressions unsafely)

```ts
import { Cron } from "effect"

// At 04:00 on every day-of-month from 8 through 14
const cron = Cron.parseUnsafe("0 0 4 8-14 * *")

// With timezone
const cronWithTz = Cron.parseUnsafe("0 0 9 * * *", "America/New_York")

// This would throw an error
// const invalid = Cron.parseUnsafe("invalid expression")
```

**Signature**

```ts
declare const parseUnsafe: (cron: string, tz?: DateTime.TimeZone | string) => Cron
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cron.ts#L620)

Since v4.0.0

# getters

## next

Returns the next scheduled date/time for the given Cron instance.

**When to use**

Use to find the next occurrence of a cron schedule after a specific date/time
or after the current time.

**Details**

Searches for the next date and time when the cron schedule should trigger,
starting after the specified date/time or after the current time when no
date is provided.

**Example** (Finding the next occurrence)

```ts
import { Cron, Result } from "effect"

const cron = Result.getOrThrow(Cron.parse("0 0 4 8-14 * *"))

// Get next run after a specific date
const after = new Date("2021-01-01T00:00:00Z")
const nextRun = Cron.next(cron, after)
console.log(nextRun) // 2021-01-08T04:00:00.000Z

// Get next run from current time
const nextFromNow = Cron.next(cron)
console.log(nextFromNow) // Next occurrence from now
```

**See**

- `prev` for finding the previous scheduled occurrence
- `sequence` for iterating future scheduled occurrences

**Signature**

```ts
declare const next: (cron: Cron, now?: DateTime.DateTime.Input) => Date
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cron.ts#L736)

Since v2.0.0

## prev

Returns the previous scheduled date/time for the given Cron instance.

**When to use**

Use to find the most recent occurrence of a cron schedule before a specific
date/time or before the current time.

**Details**

When no date/time is provided, the search starts from the current time.

**Gotchas**

The search is strict: if the supplied date/time already matches the schedule,
the result is the earlier occurrence.

**See**

- `next` for finding the next scheduled occurrence

**Signature**

```ts
declare const prev: (cron: Cron, now?: DateTime.DateTime.Input) => Date
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cron.ts#L762)

Since v3.20.0

# guards

## isCron

Checks whether a given value is a Cron instance.

**When to use**

Use to narrow an unknown value before treating it as a `Cron` schedule.

**Details**

This function is a type guard that determines whether the provided
value is a valid Cron instance by checking for the presence of the
Cron type identifier.

**Example** (Checking cron values)

```ts
import { Cron } from "effect"

const cron = Cron.make({
  minutes: [0],
  hours: [9],
  days: [1, 15],
  months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  weekdays: [1, 2, 3, 4, 5]
})

console.log(Cron.isCron(cron)) // true
console.log(Cron.isCron({})) // false
console.log(Cron.isCron("not a cron")) // false
```

**See**

- `make` for constructing a `Cron` value directly
- `parse` for constructing a `Cron` value from a string

**Signature**

```ts
declare const isCron: (u: unknown) => u is Cron
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cron.ts#L242)

Since v2.0.0

## isCronParseError

Checks whether a given value is a CronParseError instance.

**When to use**

Use to narrow an unknown failure before handling it as a cron parse error.

**Details**

This function is a type guard that determines whether the provided
value is a CronParseError by checking for the presence of the
CronParseError type identifier.

**Example** (Checking cron parse errors)

```ts
import { Cron, Result } from "effect"

const result = Cron.parse("invalid cron expression")
if (Result.isFailure(result)) {
  const error = result.failure
  console.log(Cron.isCronParseError(error)) // true
}

console.log(Cron.isCronParseError(new Error("regular error"))) // false
console.log(Cron.isCronParseError("not an error")) // false
```

**See**

- `CronParseError` for the parse error type
- `parse` for producing `CronParseError` values on invalid input

**Signature**

```ts
declare const isCronParseError: (u: unknown) => u is CronParseError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cron.ts#L521)

Since v4.0.0

# instances

## Equivalence

Equivalence instance for comparing the field restrictions of two `Cron`
schedules.

**When to use**

Use to compare cron schedules through APIs that accept an equivalence
relation.

**Details**

This comparison checks seconds, minutes, hours, days, months, and weekdays.
It does not compare the optional timezone.

**Example** (Comparing schedules with equivalence)

```ts
import { Cron } from "effect"

const cron1 = Cron.make({
  minutes: [0, 30],
  hours: [9],
  days: [1, 15],
  months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  weekdays: [1, 2, 3, 4, 5]
})

const cron2 = Cron.make({
  minutes: [30, 0], // Different order
  hours: [9],
  days: [15, 1], // Different order
  months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  weekdays: [1, 2, 3, 4, 5]
})

console.log(Cron.Equivalence(cron1, cron2)) // true
```

**See**

- `equals` for directly comparing two `Cron` values

**Signature**

```ts
declare const Equivalence: Equ.Equivalence<Cron>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cron.ts#L1006)

Since v2.0.0

# models

## Cron (interface)

Represents a cron schedule with time constraints and timezone information.

**When to use**

Use to represent a recurring calendar schedule that can be matched against
dates or used to compute scheduled occurrences.

**Details**

A `Cron` instance defines when a scheduled task should run, supporting
seconds, minutes, hours, days, months, and weekday constraints. It also
supports timezone-aware scheduling.

**Example** (Creating a cron schedule)

```ts
import { Cron } from "effect"

// Create a cron that runs at 9 AM on weekdays
const weekdayMorning = Cron.make({
  minutes: [0],
  hours: [9],
  days: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31
  ],
  months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  weekdays: [1, 2, 3, 4, 5] // Monday to Friday
})

// Check if a date matches the schedule
const matches = Cron.match(weekdayMorning, new Date("2023-06-05T09:00:00"))
console.log(matches) // true if it's 9 AM on a weekday
```

**See**

- `make` for creating a schedule from explicit field constraints
- `parse` for creating a schedule from a cron expression string
- `match` for testing a date against a schedule
- `next` for finding the next scheduled occurrence

**Signature**

```ts
export interface Cron extends Pipeable, Equal.Equal, Inspectable {
  readonly [TypeId]: typeof TypeId
  readonly tz: Option.Option<DateTime.TimeZone>
  readonly seconds: ReadonlySet<number>
  readonly minutes: ReadonlySet<number>
  readonly hours: ReadonlySet<number>
  readonly days: ReadonlySet<number>
  readonly months: ReadonlySet<number>
  readonly weekdays: ReadonlySet<number>
  /** @internal */
  readonly first: {
    readonly second: number
    readonly minute: number
    readonly hour: number
    readonly day: number
    readonly month: number
    readonly weekday: number
  }
  /** @internal */
  readonly last: {
    readonly second: number
    readonly minute: number
    readonly hour: number
    readonly day: number
    readonly month: number
    readonly weekday: number
  }
  /** @internal */
  readonly next: {
    readonly second: ReadonlyArray<number | undefined>
    readonly minute: ReadonlyArray<number | undefined>
    readonly hour: ReadonlyArray<number | undefined>
    readonly day: ReadonlyArray<number | undefined>
    readonly month: ReadonlyArray<number | undefined>
    readonly weekday: ReadonlyArray<number | undefined>
  }
  /** @internal */
  readonly prev: {
    readonly second: ReadonlyArray<number | undefined>
    readonly minute: ReadonlyArray<number | undefined>
    readonly hour: ReadonlyArray<number | undefined>
    readonly day: ReadonlyArray<number | undefined>
    readonly month: ReadonlyArray<number | undefined>
    readonly weekday: ReadonlyArray<number | undefined>
  }
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cron.ts#L103)

Since v2.0.0

## CronParseError (class)

Represents an error that occurs when parsing a cron expression fails.

**When to use**

Use to handle invalid cron expression failures returned by `parse`.

**Details**

This error provides information about what went wrong during parsing,
including the error message and optionally the input that caused the error.

**Example** (Handling cron parse failures)

```ts
import { Cron, Result } from "effect"

const result = Cron.parse("invalid expression")
if (Result.isFailure(result)) {
  const error: Cron.CronParseError = result.failure
  console.log(error.message) // "Invalid number of segments in cron expression"
  console.log(error.input) // "invalid expression"
}
```

**See**

- `parse` for the parser that returns this error in `Result.fail`
- `isCronParseError` for narrowing unknown values to this error type

**Signature**

```ts
declare class CronParseError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cron.ts#L480)

Since v4.0.0

### [CronParseErrorTypeId] (property)

**Signature**

```ts
readonly [CronParseErrorTypeId]: "~effect/time/Cron/CronParseError"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cron.ts#L484)

# predicates

## equals

Checks whether two `Cron` instances have the same field restrictions.

**When to use**

Use to directly compare whether two cron schedules have the same field
restrictions.

**Details**

The comparison checks seconds, minutes, hours, days, months, and weekdays.
It does not compare the optional timezone.

**Example** (Checking schedule equality)

```ts
import { Cron } from "effect"

const cron1 = Cron.make({
  minutes: [0],
  hours: [9],
  days: [1, 15],
  months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  weekdays: [1, 2, 3, 4, 5]
})

const cron2 = Cron.make({
  minutes: [0],
  hours: [9],
  days: [1, 15],
  months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  weekdays: [1, 2, 3, 4, 5]
})

console.log(Cron.equals(cron1, cron2)) // true
console.log(Cron.equals(cron1)(cron2)) // true (curried form)
```

**See**

- `Equivalence` for the reusable equivalence instance

**Signature**

```ts
declare const equals: { (that: Cron): (self: Cron) => boolean; (self: Cron, that: Cron): boolean }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cron.ts#L1062)

Since v2.0.0

## match

Returns `true` when a date/time matches a `Cron` schedule.

**When to use**

Use to test whether a specific date/time satisfies a cron schedule.

**Details**

Seconds, minutes, hours, months, and the optional timezone are checked
directly. For day constraints, an empty `days` or `weekdays` set means that
field matches every value; when both sets are non-empty, a date matches if
either the day-of-month or weekday matches.

**Example** (Matching dates against a schedule)

```ts
import { Cron, Result } from "effect"

const cron = Result.getOrThrow(Cron.parse("0 0 4 8-14 * *"))

// Check if specific dates match
const matches1 = Cron.match(cron, new Date("2021-01-08T04:00:00Z"))
console.log(matches1) // true - 4 AM on the 8th

const matches2 = Cron.match(cron, new Date("2021-01-08T05:00:00Z"))
console.log(matches2) // false - wrong hour

const matches3 = Cron.match(cron, new Date("2021-01-07T04:00:00Z"))
console.log(matches3) // false - wrong day
```

**See**

- `next` for finding the next matching date/time
- `prev` for finding the previous matching date/time

**Signature**

```ts
declare const match: (cron: Cron, date: DateTime.DateTime.Input) => boolean
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cron.ts#L660)

Since v2.0.0

# sequencing

## sequence

Returns an infinite iterator that yields dates matching the Cron schedule.

**When to use**

Use to lazily iterate future occurrences of a cron schedule.

**Details**

The iterator generates an infinite sequence of dates when the cron schedule
should trigger, starting after the specified date/time or after the current
time when no date is provided.

**Example** (Iterating scheduled occurrences)

```ts
import { Cron, Result } from "effect"

const cron = Result.getOrThrow(Cron.parse("0 0 9 * * 1-5")) // 9 AM weekdays

// Get first 5 occurrences
const iterator = Cron.sequence(cron, new Date("2023-01-01"))
const next5 = Array.from({ length: 5 }, () => iterator.next().value)

console.log(next5)
// [Mon Jan 02 2023 09:00:00, Tue Jan 03 2023 09:00:00, ...]
```

**See**

- `next` for computing one next occurrence

**Signature**

```ts
declare const sequence: (cron: Cron, now?: DateTime.DateTime.Input) => IterableIterator<Date>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cron.ts#L957)

Since v2.0.0
