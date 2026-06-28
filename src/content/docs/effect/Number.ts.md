---
title: Number.ts
nav_order: 66
parent: "effect"
---

## Number.ts overview

Works with TypeScript `number` values.

This module exposes the native `Number` constructor together with helpers for
checking, parsing, arithmetic, safe division, comparison, range checks,
clamping, rounding, ordering, equivalence, and numeric aggregation.

Since v2.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [Number](#number)
  - [parse](#parse)
- [guards](#guards)
  - [isNumber](#isnumber)
- [instances](#instances)
  - [Equivalence](#equivalence)
  - [Order](#order)
- [math](#math)
  - [ReducerMax](#reducermax)
  - [ReducerMin](#reducermin)
  - [ReducerMultiply](#reducermultiply)
  - [ReducerSum](#reducersum)
  - [clamp](#clamp)
  - [decrement](#decrement)
  - [divide](#divide)
  - [divideUnsafe](#divideunsafe)
  - [increment](#increment)
  - [max](#max)
  - [min](#min)
  - [multiply](#multiply)
  - [multiplyAll](#multiplyall)
  - [nextPow2](#nextpow2)
  - [remainder](#remainder)
  - [round](#round)
  - [sign](#sign)
  - [subtract](#subtract)
  - [sum](#sum)
  - [sumAll](#sumall)
- [predicates](#predicates)
  - [between](#between)
  - [isGreaterThan](#isgreaterthan)
  - [isGreaterThanOrEqualTo](#isgreaterthanorequalto)
  - [isLessThan](#islessthan)
  - [isLessThanOrEqualTo](#islessthanorequalto)

---

# constructors

## Number

Exposes the global number constructor.

**When to use**

Use to access native JavaScript numeric coercion from the Effect module
namespace.

**Gotchas**

This follows native `Number` coercion rules, including empty strings
becoming `0` and invalid numeric strings becoming `NaN`.

**See**

- `parse` for parsing strings into an `Option`

**Example** (Coercing values to numbers)

```ts
import { Number as N } from "effect"

const num = N.Number("42")
console.log(num) // 42

const float = N.Number("3.14")
console.log(float) // 3.14
```

**Signature**

```ts
declare const Number: NumberConstructor
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Number.ts#L48)

Since v4.0.0

## parse

Parses a `number` from a `string` safely using the `Number()` function.
The following special string values are supported: "NaN", "Infinity", "-Infinity".

**When to use**

Use to parse numeric text without throwing on invalid input.

**Example** (Parsing numbers from strings)

```ts
import { Number } from "effect"

Number.parse("42") // Option.some(42)
Number.parse("3.14") // Option.some(3.14)
Number.parse("NaN") // Option.some(NaN)
Number.parse("Infinity") // Option.some(Infinity)
Number.parse("-Infinity") // Option.some(-Infinity)
Number.parse("not a number") // Option.none()
```

**See**

- `Number` for native constructor coercion

**Signature**

```ts
declare const parse: (s: string) => Option.Option<number>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Number.ts#L720)

Since v2.0.0

# guards

## isNumber

Checks whether a value is a `number`.

**When to use**

Use to validate unknown input and narrow it to `number`.

**Example** (Checking for numbers)

```ts
import { Number } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(Number.isNumber(2), true)
assert.deepStrictEqual(Number.isNumber("2"), false)
```

**Signature**

```ts
declare const isNumber: (input: unknown) => input is number
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Number.ts#L70)

Since v2.0.0

# instances

## Equivalence

Equivalence instance for numbers where `NaN` is considered equal to `NaN`.

**When to use**

Use when checking numeric equality through APIs that accept an equivalence
relation.

**Example** (Comparing numbers for equivalence)

```ts
import { Number } from "effect"

console.log(Number.Equivalence(1, 1)) // true
console.log(Number.Equivalence(1, 2)) // false
console.log(Number.Equivalence(NaN, NaN)) // true
```

**Signature**

```ts
declare const Equivalence: Equ.Equivalence<number>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Number.ts#L300)

Since v2.0.0

## Order

Order instance for `number` values.

**When to use**

Use when you need to sort or compare numbers through APIs that accept an
ordering instance.

**Example** (Comparing numbers)

```ts
import { Number } from "effect"

console.log(Number.Order(1, 2)) // -1
console.log(Number.Order(2, 1)) // 1
console.log(Number.Order(1, 1)) // 0
```

**Signature**

```ts
declare const Order: order.Order<number>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Number.ts#L277)

Since v2.0.0

# math

## ReducerMax

Reducer for reducing `number`s by keeping the maximum value.

**When to use**

Use to keep the largest number through APIs that consume a `Reducer`.

**Details**

The reducer starts from `-Infinity`, so reducing an empty collection returns
`-Infinity`.

**Gotchas**

`NaN` values propagate through `Math.max`.

**See**

- `ReducerMin` for keeping the smallest number
- `max` for comparing two numbers directly

**Signature**

```ts
declare const ReducerMax: Reducer.Reducer<number>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Number.ts#L836)

Since v4.0.0

## ReducerMin

Reducer for reducing `number`s by keeping the minimum value.

**When to use**

Use to keep the smallest number through APIs that consume a `Reducer`.

**Details**

The reducer starts from `Infinity`, so reducing an empty collection returns
`Infinity`.

**Gotchas**

`NaN` values propagate through `Math.min`.

**See**

- `ReducerMax` for keeping the largest number
- `min` for comparing two numbers directly

**Signature**

```ts
declare const ReducerMin: Reducer.Reducer<number>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Number.ts#L860)

Since v4.0.0

## ReducerMultiply

Reducer for combining `number`s using multiplication.

**When to use**

Use to multiply many numbers through APIs that consume a `Reducer`.

**Details**

The reducer starts from `1`, so reducing an empty collection returns `1`.

**Gotchas**

Reducing an iterable short-circuits when it sees `0`, so later elements are
not consumed.

**See**

- `multiplyAll` for multiplying an iterable directly

**Signature**

```ts
declare const ReducerMultiply: Reducer.Reducer<number>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Number.ts#L805)

Since v4.0.0

## ReducerSum

Reducer for combining `number`s using addition.

**When to use**

Use to sum many numbers through APIs that consume a `Reducer`.

**Details**

The reducer starts from `0`, so `combineAll([])` returns `0`.

**See**

- `sumAll` for summing an iterable directly
- `ReducerMultiply` for multiplying number values

**Signature**

```ts
declare const ReducerSum: Reducer.Reducer<number>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Number.ts#L782)

Since v4.0.0

## clamp

Restricts the given `number` to be within the range specified by the `minimum` and `maximum` values.

**When to use**

Use to force a number into an inclusive range.

**Details**

- If the `number` is less than the `minimum` value, the function returns the `minimum` value.
- If the `number` is greater than the `maximum` value, the function returns the `maximum` value.
- Otherwise, it returns the original `number`.

**Example** (Clamping to a range)

```ts
import { Number } from "effect"
import * as assert from "node:assert"

const clamp = Number.clamp({ minimum: 1, maximum: 5 })

assert.equal(clamp(3), 3)
assert.equal(clamp(0), 1)
assert.equal(clamp(6), 5)
```

**See**

- `between` for checking whether a number is already inside a range

**Signature**

```ts
declare const clamp: {
  (options: { minimum: number; maximum: number }): (self: number) => number
  (self: number, options: { minimum: number; maximum: number }): number
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Number.ts#L473)

Since v2.0.0

## decrement

Decrements a number by `1`.

**When to use**

Use to decrement a numeric counter by one.

**Example** (Decrementing a number)

```ts
import { Number } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(Number.decrement(3), 2)
```

**Signature**

```ts
declare const decrement: (n: number) => number
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Number.ts#L254)

Since v2.0.0

## divide

Divides `number`s safely, returning `Option.none()` if the divisor is `0`.

**When to use**

Use to divide numbers while representing division by zero as `Option.none`.

**Example** (Dividing numbers safely)

```ts
import { Number } from "effect"

Number.divide(6, 3) // Option.some(2)
Number.divide(6, 0) // Option.none()
```

**See**

- `divideUnsafe` for division that throws when the divisor is zero
- `remainder` for the numeric remainder operation

**Signature**

```ts
declare const divide: {
  (that: number): (self: number) => Option.Option<number>
  (self: number, that: number): Option.Option<number>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Number.ts#L170)

Since v2.0.0

## divideUnsafe

Divides two `number` values without returning an `Option`.

**When to use**

Use to divide `number` values where the divisor is known to be non-zero and
a plain `number` result is preferred over handling `Option.none`.

**Gotchas**

Throws a `RangeError` if the divisor is `0`.

**Example** (Dividing numbers unsafely)

```ts
import { Number } from "effect"

console.log(Number.divideUnsafe(6, 3)) // 2

// Passing 0 as the divisor throws a RangeError("Division by zero").
```

**See**

- `divide` for division that returns `Option.none` when the divisor is zero

**Signature**

```ts
declare const divideUnsafe: { (that: number): (self: number) => number; (self: number, that: number): number }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Number.ts#L205)

Since v4.0.0

## increment

Returns the result of adding `1` to a given number.

**When to use**

Use to increment a numeric counter by one.

**Example** (Incrementing a number)

```ts
import { Number } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(Number.increment(2), 3)
```

**Signature**

```ts
declare const increment: (n: number) => number
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Number.ts#L233)

Since v2.0.0

## max

Returns the maximum between two `number`s.

**When to use**

Use to select the larger of two numbers.

**Example** (Finding the maximum)

```ts
import { Number } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(Number.max(2, 3), 3)
```

**See**

- `min` for selecting the smaller value

**Signature**

```ts
declare const max: { (that: number): (self: number) => number; (self: number, that: number): number }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Number.ts#L531)

Since v2.0.0

## min

Returns the minimum between two `number`s.

**When to use**

Use to select the smaller of two numbers.

**Example** (Finding the minimum)

```ts
import { Number } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(Number.min(2, 3), 2)
```

**See**

- `max` for selecting the larger value

**Signature**

```ts
declare const min: { (that: number): (self: number) => number; (self: number, that: number): number }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Number.ts#L505)

Since v2.0.0

## multiply

Provides a multiplication operation on `number`s.

**When to use**

Use to multiply two numbers.

**Example** (Multiplying numbers)

```ts
import { Number } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(Number.multiply(2, 3), 6)
```

**See**

- `multiplyAll` for multiplying an iterable of numbers

**Signature**

```ts
declare const multiply: { (that: number): (self: number) => number; (self: number, that: number): number }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Number.ts#L119)

Since v2.0.0

## multiplyAll

Takes an `Iterable` of `number`s and returns their multiplication as a single `number`.

**When to use**

Use to multiply all numbers in an iterable.

**Example** (Multiplying an iterable)

```ts
import { Number } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(Number.multiplyAll([2, 3, 4]), 24)
```

**See**

- `multiply` for multiplying two numbers
- `ReducerMultiply` for multiplying through APIs that consume a `Reducer`

**Signature**

```ts
declare const multiplyAll: (collection: Iterable<number>) => number
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Number.ts#L611)

Since v2.0.0

## nextPow2

Returns the next power of 2 from the given number.

**When to use**

Use to round a number up to the next power of two.

**Example** (Finding the next power of two)

```ts
import { Number } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(Number.nextPow2(5), 8)
assert.deepStrictEqual(Number.nextPow2(17), 32)
```

**Signature**

```ts
declare const nextPow2: (n: number) => number
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Number.ts#L689)

Since v2.0.0

## remainder

Returns the remainder left over when one operand is divided by a second operand, always taking the sign of the dividend.

**When to use**

Use to compute a numeric remainder while preserving decimal precision better
than direct JavaScript `%` for decimal operands.

**Example** (Calculating remainders)

```ts
import { Number } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(Number.remainder(2, 2), 0)
assert.deepStrictEqual(Number.remainder(3, 2), 1)
assert.deepStrictEqual(Number.remainder(-4, 2), -0)
```

**See**

- `divide` for quotient calculation with division-by-zero represented as `Option.none`

**Signature**

```ts
declare const remainder: { (divisor: number): (self: number) => number; (self: number, divisor: number): number }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Number.ts#L646)

Since v2.0.0

## round

Returns the number rounded with the given precision.

**When to use**

Use to round a number to a fixed number of decimal places.

**Example** (Rounding with precision)

```ts
import { Number } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(Number.round(1.1234, 2), 1.12)
assert.deepStrictEqual(Number.round(1.567, 2), 1.57)
```

**Signature**

```ts
declare const round: { (precision: number): (self: number) => number; (self: number, precision: number): number }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Number.ts#L757)

Since v3.8.0

## sign

Determines the sign of a given `number`.

**When to use**

Use to classify a number as negative, zero, or positive.

**Example** (Determining the sign)

```ts
import { Number } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(Number.sign(-5), -1)
assert.deepStrictEqual(Number.sign(0), 0)
assert.deepStrictEqual(Number.sign(5), 1)
```

**Signature**

```ts
declare const sign: (n: number) => Ordering
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Number.ts#L557)

Since v2.0.0

## subtract

Provides a subtraction operation on `number`s.

**When to use**

Use to subtract one number from another.

**Example** (Subtracting numbers)

```ts
import { Number } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(Number.subtract(2, 3), -1)
```

**Signature**

```ts
declare const subtract: { (that: number): (self: number) => number; (self: number, that: number): number }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Number.ts#L143)

Since v2.0.0

## sum

Provides an addition operation on `number`s.

**When to use**

Use to add two numbers.

**Example** (Adding numbers)

```ts
import { Number } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(Number.sum(2, 3), 5)
```

**See**

- `sumAll` for summing an iterable of numbers

**Signature**

```ts
declare const sum: { (that: number): (self: number) => number; (self: number, that: number): number }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Number.ts#L93)

Since v2.0.0

## sumAll

Takes an `Iterable` of `number`s and returns their sum as a single `number`.

**When to use**

Use to sum all numbers in an iterable.

**Example** (Summing an iterable)

```ts
import { Number } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(Number.sumAll([2, 3, 4]), 9)
```

**See**

- `sum` for adding two numbers
- `ReducerSum` for summing through APIs that consume a `Reducer`

**Signature**

```ts
declare const sumAll: (collection: Iterable<number>) => number
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Number.ts#L581)

Since v2.0.0

# predicates

## between

Checks whether a `number` is between a `minimum` and `maximum` value (inclusive).

**When to use**

Use to test whether a number falls inside an inclusive range.

**Example** (Checking inclusive ranges)

```ts
import { Number } from "effect"
import * as assert from "node:assert"

const between = Number.between({ minimum: 0, maximum: 5 })

assert.deepStrictEqual(between(3), true)
assert.deepStrictEqual(between(-1), false)
assert.deepStrictEqual(between(6), false)
```

**See**

- `clamp` for forcing a number into an inclusive range

**Signature**

```ts
declare const between: {
  (options: { minimum: number; maximum: number }): (self: number) => boolean
  (self: number, options: { minimum: number; maximum: number }): boolean
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Number.ts#L431)

Since v2.0.0

## isGreaterThan

Returns `true` if the first argument is greater than the second, otherwise `false`.

**When to use**

Use to test whether one number is strictly greater than another.

**Example** (Checking greater-than comparisons)

```ts
import { Number } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(Number.isGreaterThan(2, 3), false)
assert.deepStrictEqual(Number.isGreaterThan(3, 3), false)
assert.deepStrictEqual(Number.isGreaterThan(4, 3), true)
```

**Signature**

```ts
declare const isGreaterThan: { (that: number): (self: number) => boolean; (self: number, that: number): boolean }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Number.ts#L375)

Since v4.0.0

## isGreaterThanOrEqualTo

Returns a function that checks if a given `number` is greater than or equal to the provided one.

**When to use**

Use to test whether one number is greater than or equal to another.

**Example** (Checking greater-than-or-equal comparisons)

```ts
import { Number } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(Number.isGreaterThanOrEqualTo(2, 3), false)
assert.deepStrictEqual(Number.isGreaterThanOrEqualTo(3, 3), true)
assert.deepStrictEqual(Number.isGreaterThanOrEqualTo(4, 3), true)
```

**Signature**

```ts
declare const isGreaterThanOrEqualTo: {
  (that: number): (self: number) => boolean
  (self: number, that: number): boolean
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Number.ts#L401)

Since v4.0.0

## isLessThan

Returns `true` if the first argument is less than the second, otherwise `false`.

**When to use**

Use to test whether one number is strictly less than another.

**Example** (Checking less-than comparisons)

```ts
import { Number } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(Number.isLessThan(2, 3), true)
assert.deepStrictEqual(Number.isLessThan(3, 3), false)
assert.deepStrictEqual(Number.isLessThan(4, 3), false)
```

**Signature**

```ts
declare const isLessThan: { (that: number): (self: number) => boolean; (self: number, that: number): boolean }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Number.ts#L323)

Since v4.0.0

## isLessThanOrEqualTo

Returns a function that checks if a given `number` is less than or equal to the provided one.

**When to use**

Use to test whether one number is less than or equal to another.

**Example** (Checking less-than-or-equal comparisons)

```ts
import { Number } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(Number.isLessThanOrEqualTo(2, 3), true)
assert.deepStrictEqual(Number.isLessThanOrEqualTo(3, 3), true)
assert.deepStrictEqual(Number.isLessThanOrEqualTo(4, 3), false)
```

**Signature**

```ts
declare const isLessThanOrEqualTo: { (that: number): (self: number) => boolean; (self: number, that: number): boolean }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Number.ts#L349)

Since v4.0.0
