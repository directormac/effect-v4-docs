---
title: Duration.ts
nav_order: 23
parent: "effect"
---

## Duration.ts overview

Represents immutable spans of time.

A `Duration` can be finite, positive infinity, or negative infinity. It is
the standard representation for delays, timeouts, intervals, and
time-to-live values across Effect APIs. This module includes constructors
from common input shapes, unit conversions, comparisons, arithmetic,
formatting, and reusable reducer or combiner helpers.

Since v2.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [days](#days)
  - [fromInput](#frominput)
  - [fromInputUnsafe](#frominputunsafe)
  - [hours](#hours)
  - [infinity](#infinity)
  - [micros](#micros)
  - [millis](#millis)
  - [minutes](#minutes)
  - [nanos](#nanos)
  - [negativeInfinity](#negativeinfinity)
  - [seconds](#seconds)
  - [weeks](#weeks)
  - [zero](#zero)
- [converting](#converting)
  - [format](#format)
  - [parts](#parts)
- [getters](#getters)
  - [toDays](#todays)
  - [toHours](#tohours)
  - [toHrTime](#tohrtime)
  - [toMillis](#tomillis)
  - [toMinutes](#tominutes)
  - [toNanos](#tonanos)
  - [toNanosUnsafe](#tonanosunsafe)
  - [toSeconds](#toseconds)
  - [toWeeks](#toweeks)
- [guards](#guards)
  - [isDuration](#isduration)
  - [isFinite](#isfinite)
  - [isNegative](#isnegative)
  - [isPositive](#ispositive)
  - [isZero](#iszero)
- [instances](#instances)
  - [Equivalence](#equivalence)
  - [Order](#order)
- [math](#math)
  - [CombinerMax](#combinermax)
  - [CombinerMin](#combinermin)
  - [ReducerSum](#reducersum)
  - [abs](#abs)
  - [divide](#divide)
  - [divideUnsafe](#divideunsafe)
  - [negate](#negate)
  - [subtract](#subtract)
  - [sum](#sum)
  - [times](#times)
- [models](#models)
  - [Duration (interface)](#duration-interface)
  - [DurationObject (interface)](#durationobject-interface)
  - [DurationValue (type alias)](#durationvalue-type-alias)
  - [Input (type alias)](#input-type-alias)
  - [Unit (type alias)](#unit-type-alias)
- [ordering](#ordering)
  - [clamp](#clamp)
  - [max](#max)
  - [min](#min)
- [pattern matching](#pattern-matching)
  - [match](#match)
  - [matchPair](#matchpair)
- [predicates](#predicates)
  - [between](#between)
  - [equals](#equals)
  - [isGreaterThan](#isgreaterthan)
  - [isGreaterThanOrEqualTo](#isgreaterthanorequalto)
  - [isLessThan](#islessthan)
  - [isLessThanOrEqualTo](#islessthanorequalto)

---

# constructors

## days

Creates a Duration from days.

**Example** (Creating durations from days)

```ts
import { Duration } from "effect"

const duration = Duration.days(1)
console.log(Duration.toMillis(duration)) // 86400000
```

**Signature**

```ts
declare const days: (days: number) => Duration
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Duration.ts#L738)

Since v2.0.0

## fromInput

Decodes a `Input` value into a `Duration` safely, returning
`Option.none()` if decoding fails.

**Example** (Safely decoding duration inputs)

```ts
import { Duration, Option } from "effect"

Duration.fromInput(1000).pipe(Option.map(Duration.toSeconds)) // Some(1)

Duration.fromInput("invalid" as any) // None
```

**Signature**

```ts
declare const fromInput: (u: Input) => Option.Option<Duration>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Duration.ts#L330)

Since v4.0.0

## fromInputUnsafe

Decodes a `Duration.Input` into a `Duration`.

**When to use**

Use when the input has already been validated or comes from a trusted source
and throwing is acceptable for invalid duration syntax.

**Gotchas**

If the input is not a valid `Duration.Input`, it throws an error.

**Example** (Decoding duration inputs)

```ts
import { Duration } from "effect"

const duration1 = Duration.fromInputUnsafe(1000) // 1000 milliseconds
const duration2 = Duration.fromInputUnsafe("5 seconds")
const duration3 = Duration.fromInputUnsafe("Infinity")
const duration4 = Duration.fromInputUnsafe([2, 500_000_000]) // 2 seconds and 500ms
```

**Signature**

```ts
declare const fromInputUnsafe: (input: Input) => Duration
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Duration.ts#L228)

Since v4.0.0

## hours

Creates a Duration from hours.

**Example** (Creating durations from hours)

```ts
import { Duration } from "effect"

const duration = Duration.hours(2)
console.log(Duration.toMillis(duration)) // 7200000
```

**Signature**

```ts
declare const hours: (hours: number) => Duration
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Duration.ts#L721)

Since v2.0.0

## infinity

A Duration representing infinite time.

**Example** (Referencing infinite duration)

```ts
import { Duration } from "effect"

console.log(Duration.toMillis(Duration.infinity)) // Infinity
```

**Signature**

```ts
declare const infinity: Duration
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Duration.ts#L603)

Since v2.0.0

## micros

Creates a Duration from microseconds.

**Example** (Creating durations from microseconds)

```ts
import { Duration } from "effect"

const duration = Duration.micros(BigInt(500_000))
console.log(Duration.toMillis(duration)) // 500
```

**Signature**

```ts
declare const micros: (micros: bigint) => Duration
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Duration.ts#L653)

Since v2.0.0

## millis

Creates a Duration from milliseconds.

**Example** (Creating durations from milliseconds)

```ts
import { Duration } from "effect"

const duration = Duration.millis(1000)
console.log(Duration.toMillis(duration)) // 1000
```

**Signature**

```ts
declare const millis: (millis: number) => Duration
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Duration.ts#L670)

Since v2.0.0

## minutes

Creates a Duration from minutes.

**Example** (Creating durations from minutes)

```ts
import { Duration } from "effect"

const duration = Duration.minutes(5)
console.log(Duration.toMillis(duration)) // 300000
```

**Signature**

```ts
declare const minutes: (minutes: number) => Duration
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Duration.ts#L704)

Since v2.0.0

## nanos

Creates a Duration from nanoseconds.

**Example** (Creating durations from nanoseconds)

```ts
import { Duration } from "effect"

const duration = Duration.nanos(BigInt(500_000_000))
console.log(Duration.toMillis(duration)) // 500
```

**Signature**

```ts
declare const nanos: (nanos: bigint) => Duration
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Duration.ts#L636)

Since v2.0.0

## negativeInfinity

A Duration representing negative infinite time.

**Example** (Referencing negative infinite duration)

```ts
import { Duration } from "effect"

console.log(Duration.toMillis(Duration.negativeInfinity)) // -Infinity
```

**Signature**

```ts
declare const negativeInfinity: Duration
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Duration.ts#L619)

Since v4.0.0

## seconds

Creates a Duration from seconds.

**Example** (Creating durations from seconds)

```ts
import { Duration } from "effect"

const duration = Duration.seconds(30)
console.log(Duration.toMillis(duration)) // 30000
```

**Signature**

```ts
declare const seconds: (seconds: number) => Duration
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Duration.ts#L687)

Since v2.0.0

## weeks

Creates a Duration from weeks.

**Example** (Creating durations from weeks)

```ts
import { Duration } from "effect"

const duration = Duration.weeks(1)
console.log(Duration.toMillis(duration)) // 604800000
```

**Signature**

```ts
declare const weeks: (weeks: number) => Duration
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Duration.ts#L755)

Since v2.0.0

## zero

A Duration representing zero time.

**Example** (Referencing the zero duration)

```ts
import { Duration } from "effect"

console.log(Duration.toMillis(Duration.zero)) // 0
```

**Signature**

```ts
declare const zero: Duration
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Duration.ts#L587)

Since v2.0.0

# converting

## format

Converts a `Duration` to a human readable string.

**Example** (Formatting durations)

```ts
import { Duration } from "effect"

Duration.format(Duration.millis(1000)) // "1s"
Duration.format(Duration.millis(1001)) // "1s 1ms"
```

**Signature**

```ts
declare const format: (self: Duration) => string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Duration.ts#L1735)

Since v2.0.0

## parts

Decomposes a `Duration` into normalized signed components.

**Details**

Finite durations are returned as `{ days, hours, minutes, seconds, millis,
nanos }`. Infinite durations return every component as `Infinity` or
`-Infinity`.

**Example** (Decomposing durations into parts)

```ts
import { Duration } from "effect"

// Create a complex duration by adding multiple parts
const duration = Duration.sum(
  Duration.sum(
    Duration.sum(Duration.days(1), Duration.hours(2)),
    Duration.sum(Duration.minutes(30), Duration.seconds(45))
  ),
  Duration.millis(123)
)
const components = Duration.parts(duration)
console.log(components)
// {
//   days: 1,
//   hours: 2,
//   minutes: 30,
//   seconds: 45,
//   millis: 123,
//   nanos: 0
// }

const complex = Duration.sum(Duration.hours(25), Duration.minutes(90))
const complexParts = Duration.parts(complex)
console.log(complexParts)
// {
//   days: 1,
//   hours: 2,
//   minutes: 30,
//   seconds: 0,
//   millis: 0,
//   nanos: 0
// }
```

**Signature**

```ts
declare const parts: (self: Duration) => {
  days: number
  hours: number
  minutes: number
  seconds: number
  millis: number
  nanos: number
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Duration.ts#L1671)

Since v3.8.0

# getters

## toDays

Converts a Duration to days.

**Example** (Converting durations to days)

```ts
import { Duration } from "effect"

console.log(Duration.toDays(Duration.hours(48))) // 2
console.log(Duration.toDays(Duration.weeks(1))) // 7
```

**Signature**

```ts
declare const toDays: (self: Input) => number
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Duration.ts#L864)

Since v3.8.0

## toHours

Converts a Duration to hours.

**Example** (Converting durations to hours)

```ts
import { Duration } from "effect"

console.log(Duration.toHours(Duration.minutes(120))) // 2
console.log(Duration.toHours(Duration.days(1))) // 24
```

**Signature**

```ts
declare const toHours: (self: Input) => number
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Duration.ts#L841)

Since v3.8.0

## toHrTime

Converts a Duration to high-resolution time format [seconds, nanoseconds].

**Example** (Converting durations to high-resolution time)

```ts
import { Duration } from "effect"

const duration = Duration.millis(1500)
const hrtime = Duration.toHrTime(duration)
console.log(hrtime) // [1, 500000000]
```

**Signature**

```ts
declare const toHrTime: (input: Input) => [seconds: number, nanos: number]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Duration.ts#L980)

Since v2.0.0

## toMillis

Converts a Duration to milliseconds.

**Example** (Converting durations to milliseconds)

```ts
import { Duration } from "effect"

console.log(Duration.toMillis(Duration.seconds(5))) // 5000
console.log(Duration.toMillis(Duration.minutes(2))) // 120000
```

**Signature**

```ts
declare const toMillis: (self: Input) => number
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Duration.ts#L772)

Since v2.0.0

## toMinutes

Converts a Duration to minutes.

**Example** (Converting durations to minutes)

```ts
import { Duration } from "effect"

console.log(Duration.toMinutes(Duration.seconds(120))) // 2
console.log(Duration.toMinutes(Duration.hours(1))) // 60
```

**Signature**

```ts
declare const toMinutes: (self: Input) => number
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Duration.ts#L818)

Since v3.8.0

## toNanos

Gets the duration in nanoseconds safely as an `Option<bigint>`.

**Details**

If the duration is infinite, returns `Option.none()`.

**Example** (Safely reading nanoseconds)

```ts
import { Duration, Option } from "effect"

Duration.toNanos(Duration.seconds(1)) // Some(1000000000n)

Duration.toNanos(Duration.infinity) // None
Option.getOrUndefined(Duration.toNanos(Duration.infinity)) // undefined
```

**Signature**

```ts
declare const toNanos: (self: Input) => Option.Option<bigint>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Duration.ts#L962)

Since v2.0.0

## toNanosUnsafe

Gets the duration in nanoseconds as a bigint.

**When to use**

Use when the duration is known to be finite and you need the nanosecond value
as a `bigint`.

**Details**

Millisecond-backed fractional durations are rounded to the nearest
nanosecond, with ties away from zero.

**Gotchas**

If the duration is infinite, it throws an error.

**Example** (Reading nanoseconds unsafely)

```ts
import { Duration } from "effect"

const duration = Duration.seconds(2)
const nanos = Duration.toNanosUnsafe(duration)
console.log(nanos) // 2000000000n

// Duration.toNanosUnsafe(Duration.infinity)
// throws Error: "Cannot convert infinite duration to nanos"
```

**Signature**

```ts
declare const toNanosUnsafe: (input: Input) => bigint
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Duration.ts#L928)

Since v4.0.0

## toSeconds

Converts a Duration to seconds.

**Example** (Converting durations to seconds)

```ts
import { Duration } from "effect"

console.log(Duration.toSeconds(Duration.millis(5000))) // 5
console.log(Duration.toSeconds(Duration.minutes(2))) // 120
```

**Signature**

```ts
declare const toSeconds: (self: Input) => number
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Duration.ts#L795)

Since v2.0.0

## toWeeks

Converts a Duration to weeks.

**Example** (Converting durations to weeks)

```ts
import { Duration } from "effect"

console.log(Duration.toWeeks(Duration.days(14))) // 2
console.log(Duration.toWeeks(Duration.days(7))) // 1
```

**Signature**

```ts
declare const toWeeks: (self: Input) => number
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Duration.ts#L887)

Since v3.8.0

# guards

## isDuration

Checks whether a value is a Duration.

**Example** (Checking for durations)

```ts
import { Duration } from "effect"

console.log(Duration.isDuration(Duration.seconds(1))) // true
console.log(Duration.isDuration(1000)) // false
```

**Signature**

```ts
declare const isDuration: (u: unknown) => u is Duration
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Duration.ts#L413)

Since v2.0.0

## isFinite

Checks whether a Duration is finite (not infinite).

**Example** (Checking finite durations)

```ts
import { Duration } from "effect"

console.log(Duration.isFinite(Duration.seconds(5))) // true
console.log(Duration.isFinite(Duration.infinity)) // false
```

**Signature**

```ts
declare const isFinite: (self: Duration) => boolean
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Duration.ts#L430)

Since v2.0.0

## isNegative

Returns `true` if the duration is negative (strictly less than zero).

**Example** (Checking for negative durations)

```ts
import { Duration } from "effect"

console.log(Duration.isNegative(Duration.seconds(-5))) // true
console.log(Duration.isNegative(Duration.zero)) // false
console.log(Duration.isNegative(Duration.negativeInfinity)) // true
```

**Signature**

```ts
declare const isNegative: (self: Duration) => boolean
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Duration.ts#L476)

Since v4.0.0

## isPositive

Returns `true` if the duration is positive (strictly greater than zero).

**Example** (Checking for positive durations)

```ts
import { Duration } from "effect"

console.log(Duration.isPositive(Duration.seconds(5))) // true
console.log(Duration.isPositive(Duration.zero)) // false
console.log(Duration.isPositive(Duration.infinity)) // true
```

**Signature**

```ts
declare const isPositive: (self: Duration) => boolean
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Duration.ts#L505)

Since v4.0.0

## isZero

Checks whether a Duration is zero.

**Example** (Checking for zero durations)

```ts
import { Duration } from "effect"

console.log(Duration.isZero(Duration.zero)) // true
console.log(Duration.isZero(Duration.seconds(1))) // false
```

**Signature**

```ts
declare const isZero: (self: Duration) => boolean
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Duration.ts#L448)

Since v3.5.0

# instances

## Equivalence

Provides an `Equivalence` instance for comparing `Duration` values.

**Example** (Comparing durations for equivalence)

```ts
import { Duration } from "effect"

const isEqual = Duration.Equivalence(Duration.seconds(5), Duration.millis(5000))
console.log(isEqual) // true
```

**Signature**

```ts
declare const Equivalence: Equ.Equivalence<Duration>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Duration.ts#L1213)

Since v2.0.0

## Order

Provides an `Order` instance for comparing `Duration` values.

**Details**

`NegativeInfinity` < any finite value < `Infinity`.

**Example** (Sorting durations)

```ts
import { Duration } from "effect"

const durations = [Duration.seconds(3), Duration.seconds(1), Duration.seconds(2)]
const sorted = durations.sort((a, b) => Duration.Order(a, b))
console.log(sorted.map(Duration.toSeconds)) // [1, 2, 3]
```

**Signature**

```ts
declare const Order: order.Order<Duration>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Duration.ts#L1141)

Since v2.0.0

# math

## CombinerMax

Combiner that returns the maximum `Duration`.

**When to use**

Use to keep the longest `Duration` when an API consumes a `Combiner`.

**See**

- `CombinerMin` for keeping the shortest `Duration`
- `max` for comparing two `Duration` values directly

**Signature**

```ts
declare const CombinerMax: Combiner.Combiner<Duration>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Duration.ts#L1812)

Since v4.0.0

## CombinerMin

Combiner that returns the minimum `Duration`.

**When to use**

Use to keep the shortest `Duration` through APIs that consume a `Combiner`.

**See**

- `CombinerMax` for keeping the longest `Duration`
- `min` for comparing two `Duration` values directly

**Signature**

```ts
declare const CombinerMin: Combiner.Combiner<Duration>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Duration.ts#L1827)

Since v4.0.0

## ReducerSum

Reducer for summing `Duration`s.

**When to use**

Use to sum many `Duration` values through APIs that consume a `Reducer`.

**Details**

`ReducerSum` uses `sum` and starts from `zero`, so `combineAll([])` returns
`zero`.

**See**

- `sum` for adding two duration values directly
- `CombinerMax` for keeping the longest duration instead of summing
- `CombinerMin` for keeping the shortest duration instead of summing

**Signature**

```ts
declare const ReducerSum: Reducer.Reducer<Duration>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Duration.ts#L1797)

Since v4.0.0

## abs

Returns the absolute value of the duration.

**Example** (Taking absolute duration values)

```ts
import { Duration } from "effect"

Duration.toMillis(Duration.abs(Duration.seconds(-5))) // 5000
Duration.abs(Duration.negativeInfinity) === Duration.infinity // true
```

**Signature**

```ts
declare const abs: (self: Duration) => Duration
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Duration.ts#L533)

Since v4.0.0

## divide

Divides a `Duration` by a finite, non-zero number safely.

**Details**

Returns `Option.none()` for zero, negative zero, or non-finite divisors. For
nanosecond-backed durations, also returns `Option.none()` when the divisor
cannot be converted to a `bigint`, such as a fractional divisor.

**Example** (Safely dividing durations)

```ts
import { Duration, Option } from "effect"

const d = Duration.divide(Duration.seconds(10), 2)
console.log(Option.map(d, Duration.toSeconds)) // Some(5)

Duration.divide(Duration.seconds(10), 0) // None
```

**Signature**

```ts
declare const divide: {
  (by: number): (self: Duration) => Option.Option<Duration>
  (self: Duration, by: number): Option.Option<Duration>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Duration.ts#L1306)

Since v2.4.19

## divideUnsafe

Divides a `Duration` by a number using fallback rules instead of returning
an `Option`.

**When to use**

Use when dividing a `Duration` should return `Duration.zero` or signed
infinity for invalid cases instead of forcing callers to handle `Option.none`.

**Details**

Non-finite divisors return `Duration.zero`. Division by positive or negative
zero can produce signed infinity for non-zero finite durations, while zero
or infinite durations divided by zero produce `Duration.zero`.
Nanosecond-backed durations return `Duration.zero` when the divisor cannot
be converted to a `bigint`.

**Example** (Dividing durations unsafely)

```ts
import { Duration } from "effect"

const half = Duration.divideUnsafe(Duration.seconds(10), 2)
console.log(Duration.toSeconds(half)) // 5

const infinite = Duration.divideUnsafe(Duration.seconds(10), 0)
console.log(Duration.toMillis(infinite)) // Infinity
```

**Signature**

```ts
declare const divideUnsafe: { (by: number): (self: Duration) => Duration; (self: Duration, by: number): Duration }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Duration.ts#L1361)

Since v4.0.0

## negate

Returns the negated duration.

**Example** (Negating durations)

```ts
import { Duration } from "effect"

Duration.toMillis(Duration.negate(Duration.seconds(5))) // -5000
Duration.negate(Duration.infinity) === Duration.negativeInfinity // true
```

**Signature**

```ts
declare const negate: (self: Duration) => Duration
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Duration.ts#L560)

Since v4.0.0

## subtract

Subtracts one Duration from another. The result can be negative.

**Details**

Infinity subtraction follows signed-infinity arithmetic. Subtracting the
same infinity from itself returns zero. Positive infinity minus negative
infinity or any finite duration remains positive infinity. Negative infinity
minus positive infinity or any finite duration remains negative infinity.
Finite durations minus positive infinity produce negative infinity, and
finite durations minus negative infinity produce positive infinity.

**Example** (Subtracting durations)

```ts
import { Duration } from "effect"

const result = Duration.subtract(Duration.seconds(10), Duration.seconds(3))
console.log(Duration.toSeconds(result)) // 7
```

**Signature**

```ts
declare const subtract: { (that: Duration): (self: Duration) => Duration; (self: Duration, that: Duration): Duration }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Duration.ts#L1450)

Since v2.0.0

## sum

Adds two Durations together.

**Details**

Infinity addition follows these rules:

- infinity + infinity = infinity
- infinity + negativeInfinity = zero
- infinity + finite = infinity
- negativeInfinity + negativeInfinity = negativeInfinity
- negativeInfinity + finite = negativeInfinity

**Example** (Adding durations)

```ts
import { Duration } from "effect"

const total = Duration.sum(Duration.seconds(5), Duration.seconds(3))
console.log(Duration.toSeconds(total)) // 8
```

**Signature**

```ts
declare const sum: { (that: Duration): (self: Duration) => Duration; (self: Duration, that: Duration): Duration }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Duration.ts#L1494)

Since v2.0.0

## times

Returns a `Duration` multiplied by a number.

**Details**

For nanosecond-backed durations, the multiplier must be convertible to a
`bigint`; fractional or non-finite multipliers can throw. Infinite
durations return positive infinity, negative infinity, or zero depending on
the multiplier sign.

**Example** (Multiplying durations)

```ts
import { Duration } from "effect"

const doubled = Duration.times(Duration.seconds(5), 2)
console.log(Duration.toSeconds(doubled)) // 10
```

**Signature**

```ts
declare const times: { (times: number): (self: Duration) => Duration; (self: Duration, times: number): Duration }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Duration.ts#L1412)

Since v2.0.0

# models

## Duration (interface)

Represents a span of time with high precision, supporting operations from
nanoseconds to weeks.

**When to use**

Use to model elapsed time, delays, timeouts, schedule intervals, and cache
TTLs as immutable duration values.

**See**

- `Input` for values accepted by APIs that decode duration-like
  inputs
- `DurationValue` for the tagged representation exposed by the
  `value` field

**Signature**

```ts
export interface Duration extends Equal.Equal, Pipeable, Inspectable.Inspectable {
  readonly [TypeId]: typeof TypeId
  readonly value: DurationValue
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Duration.ts#L70)

Since v2.0.0

## DurationObject (interface)

An object with optional duration components that can be combined to create
a Duration. All fields are optional and additive.

**Details**

Compatible with Temporal.Duration-like objects.

**Example** (Combining duration object fields)

```ts
import { Duration } from "effect"

Duration.fromInputUnsafe({ seconds: 30 })
Duration.fromInputUnsafe({ days: 1 })
Duration.fromInputUnsafe({ seconds: 1, nanoseconds: 500 })
```

**Signature**

```ts
export interface DurationObject {
  readonly weeks?: number | undefined
  readonly days?: number | undefined
  readonly hours?: number | undefined
  readonly minutes?: number | undefined
  readonly seconds?: number | undefined
  readonly milliseconds?: number | undefined
  readonly microseconds?: number | undefined
  readonly nanoseconds?: number | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Duration.ts#L189)

Since v4.0.0

## DurationValue (type alias)

Tagged representation of a `Duration` value.

**When to use**

Use when modeling or inspecting the exact tagged representation stored in a
`Duration`, including finite millisecond or nanosecond values and infinite
sentinels.

**Details**

A duration is represented as milliseconds, nanoseconds, positive infinity,
or negative infinity.

**See**

- `Duration` for the public type whose `value` field contains this
  representation
- `match` for pattern matching without reading `value` directly

**Signature**

```ts
type DurationValue =
  | { _tag: "Millis"; millis: number }
  | { _tag: "Nanos"; nanos: bigint }
  | { _tag: "Infinity" }
  | { _tag: "NegativeInfinity" }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Duration.ts#L96)

Since v2.0.0

## Input (type alias)

Valid input types that can be converted to a Duration.

**When to use**

Use when an API should accept any value that Effect can convert into a
`Duration`, including existing durations, millisecond numbers, nanosecond
bigints, high-resolution tuples, duration strings, infinity strings, or
duration objects.

**Details**

String inputs accept values like `"10 seconds"`, `"500 millis"`,
`"Infinity"`, and `"-Infinity"`. Finite fractional values that are
normalized to nanoseconds are rounded to the nearest nanosecond, with ties
away from zero.

**See**

- `fromInput` for safe conversion to `Option`
- `fromInputUnsafe` for throwing conversion
- `DurationObject` for object-shaped duration input
- `Unit` for supported string units

**Signature**

```ts
type Input =
  | Duration
  | number // millis
  | bigint // nanos
  | readonly [seconds: number, nanos: number]
  | `${number} ${Unit}`
  | "Infinity"
  | "-Infinity"
  | DurationObject
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Duration.ts#L158)

Since v4.0.0

## Unit (type alias)

Valid time units that can be used in duration string representations.

**When to use**

Use when typing the unit portion of duration string inputs accepted by
`Duration.Input`.

**See**

- `Input` for the full duration input union

**Signature**

```ts
type Unit =
  | "nano"
  | "nanos"
  | "micro"
  | "micros"
  | "milli"
  | "millis"
  | "second"
  | "seconds"
  | "minute"
  | "minutes"
  | "hour"
  | "hours"
  | "day"
  | "days"
  | "week"
  | "weeks"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Duration.ts#L115)

Since v2.0.0

# ordering

## clamp

Returns a `Duration` constrained between a minimum and maximum value.

**Example** (Clamping durations to a range)

```ts
import { Duration } from "effect"

const clamped = Duration.clamp(Duration.seconds(10), {
  minimum: Duration.seconds(2),
  maximum: Duration.seconds(5)
})
console.log(Duration.toSeconds(clamped)) // 5
```

**Signature**

```ts
declare const clamp: {
  (options: { minimum: Duration; maximum: Duration }): (self: Duration) => Duration
  (self: Duration, options: { minimum: Duration; maximum: Duration }): Duration
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Duration.ts#L1278)

Since v2.0.0

## max

Returns the larger of two Durations.

**Example** (Selecting the longer duration)

```ts
import { Duration } from "effect"

const longer = Duration.max(Duration.seconds(5), Duration.seconds(3))
console.log(Duration.toSeconds(longer)) // 5
```

**Signature**

```ts
declare const max: { (that: Duration): (self: Duration) => Duration; (self: Duration, that: Duration): Duration }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Duration.ts#L1255)

Since v2.0.0

## min

Returns the smaller of two Durations.

**Example** (Selecting the shorter duration)

```ts
import { Duration } from "effect"

const shorter = Duration.min(Duration.seconds(5), Duration.seconds(3))
console.log(Duration.toSeconds(shorter)) // 3
```

**Signature**

```ts
declare const min: { (that: Duration): (self: Duration) => Duration; (self: Duration, that: Duration): Duration }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Duration.ts#L1235)

Since v2.0.0

# pattern matching

## match

Pattern matches on the representation of a `Duration`.

**Details**

Provide handlers for millisecond-backed values, nanosecond-backed values,
and positive infinity. Use `onNegativeInfinity` to handle negative infinity
separately; otherwise negative infinity is handled by `onInfinity`.

**Example** (Pattern matching on duration representations)

```ts
import { Duration } from "effect"

const result = Duration.match(Duration.seconds(5), {
  onMillis: (millis) => `${millis} milliseconds`,
  onNanos: (nanos) => `${nanos} nanoseconds`,
  onInfinity: () => "infinite"
})
console.log(result) // "5000 milliseconds"
```

**Signature**

```ts
declare const match: {
  <A, B, C, D = C>(options: {
    readonly onMillis: (millis: number) => A
    readonly onNanos: (nanos: bigint) => B
    readonly onInfinity: () => C
    readonly onNegativeInfinity?: () => D
  }): (self: Duration) => A | B | C | D
  <A, B, C, D = C>(
    self: Duration,
    options: {
      readonly onMillis: (millis: number) => A
      readonly onNanos: (nanos: bigint) => B
      readonly onInfinity: () => C
      readonly onNegativeInfinity?: () => D
    }
  ): A | B | C | D
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Duration.ts#L1019)

Since v2.0.0

## matchPair

Pattern matches on two `Duration`s, providing handlers that receive both values.

**Example** (Pattern matching on duration pairs)

```ts
import { Duration } from "effect"

const sum = Duration.matchPair(Duration.seconds(3), Duration.seconds(2), {
  onMillis: (a, b) => a + b,
  onNanos: (a, b) => Number(a + b),
  onInfinity: () => Infinity
})
console.log(sum) // 5000
```

**Signature**

```ts
declare const matchPair: {
  <A, B, C>(
    that: Duration,
    options: {
      readonly onMillis: (self: number, that: number) => A
      readonly onNanos: (self: bigint, that: bigint) => B
      readonly onInfinity: (self: Duration, that: Duration) => C
    }
  ): (self: Duration) => A | B | C
  <A, B, C>(
    self: Duration,
    that: Duration,
    options: {
      readonly onMillis: (self: number, that: number) => A
      readonly onNanos: (self: bigint, that: bigint) => B
      readonly onInfinity: (self: Duration, that: Duration) => C
    }
  ): A | B | C
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Duration.ts#L1077)

Since v4.0.0

# predicates

## between

Returns `true` if a `Duration` is greater than or equal to `minimum` and
less than or equal to `maximum`, according to `Duration.Order`.

**When to use**

Use to test whether a duration is inside an inclusive range.

**Details**

Both bounds are inclusive and compared with `Duration.Order`.

**Gotchas**

The bounds are not normalized. If `minimum` is greater than `maximum`, the
predicate returns `false` for every duration.

**Example** (Checking duration ranges)

```ts
import { Duration } from "effect"

const isInRange = Duration.between(Duration.seconds(3), {
  minimum: Duration.seconds(2),
  maximum: Duration.seconds(5)
})
console.log(isInRange) // true
```

**See**

- `clamp` for constraining a duration to a range
- `isGreaterThanOrEqualTo` for checking only the lower bound
- `isLessThanOrEqualTo` for checking only the upper bound

**Signature**

```ts
declare const between: {
  (options: { minimum: Duration; maximum: Duration }): (self: Duration) => boolean
  (self: Duration, options: { minimum: Duration; maximum: Duration }): boolean
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Duration.ts#L1193)

Since v2.0.0

## equals

Checks whether two Durations are equal.

**Example** (Checking duration equality)

```ts
import { Duration } from "effect"

const isEqual = Duration.equals(Duration.seconds(5), Duration.millis(5000))
console.log(isEqual) // true
```

**Signature**

```ts
declare const equals: { (that: Duration): (self: Duration) => boolean; (self: Duration, that: Duration): boolean }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Duration.ts#L1617)

Since v2.0.0

## isGreaterThan

Checks whether the first Duration is greater than the second.

**Example** (Comparing durations with greater than)

```ts
import { Duration } from "effect"

const isGreater = Duration.isGreaterThan(Duration.seconds(5), Duration.seconds(3))
console.log(isGreater) // true
```

**Signature**

```ts
declare const isGreaterThan: {
  (that: Duration): (self: Duration) => boolean
  (self: Duration, that: Duration): boolean
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Duration.ts#L1574)

Since v4.0.0

## isGreaterThanOrEqualTo

Checks whether the first Duration is greater than or equal to the second.

**Example** (Comparing durations with greater than or equal)

```ts
import { Duration } from "effect"

const isGreaterOrEqual = Duration.isGreaterThanOrEqualTo(Duration.seconds(5), Duration.seconds(5))
console.log(isGreaterOrEqual) // true
```

**Signature**

```ts
declare const isGreaterThanOrEqualTo: {
  (that: Duration): (self: Duration) => boolean
  (self: Duration, that: Duration): boolean
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Duration.ts#L1597)

Since v4.0.0

## isLessThan

Checks whether the first Duration is less than the second.

**Example** (Comparing durations with less than)

```ts
import { Duration } from "effect"

const isLess = Duration.isLessThan(Duration.seconds(3), Duration.seconds(5))
console.log(isLess) // true
```

**Signature**

```ts
declare const isLessThan: { (that: Duration): (self: Duration) => boolean; (self: Duration, that: Duration): boolean }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Duration.ts#L1531)

Since v4.0.0

## isLessThanOrEqualTo

Checks whether the first Duration is less than or equal to the second.

**Example** (Comparing durations with less than or equal)

```ts
import { Duration } from "effect"

const isLessOrEqual = Duration.isLessThanOrEqualTo(Duration.seconds(5), Duration.seconds(5))
console.log(isLessOrEqual) // true
```

**Signature**

```ts
declare const isLessThanOrEqualTo: {
  (that: Duration): (self: Duration) => boolean
  (self: Duration, that: Duration): boolean
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Duration.ts#L1554)

Since v4.0.0
