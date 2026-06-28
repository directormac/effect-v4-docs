---
title: Order.ts
nav_order: 69
parent: "effect"
---

## Order.ts overview

Defines comparison functions for ordered values.

An `Order<A>` compares two `A` values and returns whether the first is less
than, equal to, or greater than the second. Orders are used for sorting,
choosing minimum or maximum values, checking ranges, and building ordered data
structures. This module includes built-in orders, constructors for custom
orders, tools for reversing and combining comparisons, tuple and struct
helpers, comparison predicates, clamping, and reducer support.

Since v2.0.0

---

## Exports Grouped by Category

- [combinators](#combinators)
  - [Array](#array)
  - [Struct](#struct)
  - [Tuple](#tuple)
  - [flip](#flip)
- [combining](#combining)
  - [combine](#combine)
  - [combineAll](#combineall)
- [comparisons](#comparisons)
  - [clamp](#clamp)
  - [max](#max)
  - [min](#min)
- [constructors](#constructors)
  - [alwaysEqual](#alwaysequal)
  - [make](#make)
  - [makeReducer](#makereducer)
- [instances](#instances)
  - [BigInt](#bigint)
  - [Boolean](#boolean)
  - [Date](#date)
  - [Number](#number)
  - [String](#string)
- [mapping](#mapping)
  - [mapInput](#mapinput)
- [predicates](#predicates)
  - [isBetween](#isbetween)
  - [isGreaterThan](#isgreaterthan)
  - [isGreaterThanOrEqualTo](#isgreaterthanorequalto)
  - [isLessThan](#islessthan)
  - [isLessThanOrEqualTo](#islessthanorequalto)
- [type class](#type-class)
  - [Order (interface)](#order-interface)
- [type lambdas](#type-lambdas)
  - [OrderTypeLambda (interface)](#ordertypelambda-interface)
- [utils](#utils)
  - [Array\_](#array_)

---

# combinators

## Array

Creates an `Order` for arrays by applying the given `Order` to each element, then comparing by length if all elements are equal.

**When to use**

Use when you need lexicographic ordering for arrays of one element type.

**Details**

Compares arrays element-by-element using the provided order and stops at the
first non-zero comparison result. If all elements are equal, shorter arrays
are less than longer arrays. The result is `0` only if arrays have the same
length and all elements are equal.

**Example** (Ordering array elements)

```ts
import { Order } from "effect"

const arrayOrder = Order.Array(Order.Number)

console.log(arrayOrder([1, 2], [1, 3])) // -1
console.log(arrayOrder([1, 2], [1, 2, 3])) // -1 (shorter array is less)
console.log(arrayOrder([1, 2, 3], [1, 2])) // 1 (longer array is greater)
console.log(arrayOrder([1, 2], [1, 2])) // 0
```

**See**

- `Tuple` for type-safe tuple ordering

**Signature**

```ts
declare const Array: <A>(O: Order<A>) => Order<ReadonlyArray<A>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Order.ts#L578)

Since v4.0.0

## Struct

Creates an `Order` for structs by applying the given `Order`s to each property in sequence.

**When to use**

Use when you need multi-field ordering for objects with known properties.

**Details**

Compares structs field-by-field in the key order of the fields object and
stops at the first non-zero comparison result. Field order matters: earlier
fields take precedence. The result is `0` only if all fields are equal.

**Example** (Ordering structs)

```ts
import { Order } from "effect"

const personOrder = Order.Struct({
  name: Order.String,
  age: Order.Number
})

const person1 = { name: "Alice", age: 30 }
const person2 = { name: "Bob", age: 25 }
const person3 = { name: "Alice", age: 25 }

console.log(personOrder(person1, person2)) // -1 (Alice < Bob)
console.log(personOrder(person1, person3)) // 1 (same name, 30 > 25)
console.log(personOrder(person1, person1)) // 0
```

**See**

- `combine` to combine orders manually
- `mapInput` to extract and compare by a single property

**Signature**

```ts
declare const Struct: <const R extends { readonly [x: string]: Order<any> }>(
  fields: R
) => Order<{ [K in keyof R]: [R[K]] extends [Order<infer A>] ? A : never }>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Order.ts#L618)

Since v4.0.0

## Tuple

Creates an `Order` for a tuple type based on orders for each element.

**When to use**

Use when you need fixed-length tuple ordering with per-position orders.

**Details**

Compares tuples element-by-element using the corresponding order and stops at
the first non-zero comparison result. Tuples must have the same length as the
order collection, and the result is `0` only if all elements are equal.

**Example** (Ordering tuples)

```ts
import { Order } from "effect"

const tupleOrder = Order.Tuple([Order.Number, Order.String])

console.log(tupleOrder([1, "a"], [2, "b"])) // -1
console.log(tupleOrder([1, "b"], [1, "a"])) // 1
console.log(tupleOrder([1, "a"], [1, "a"])) // 0
```

**See**

- `Array` to compare arrays with length consideration

**Signature**

```ts
declare const Tuple: <const Elements extends ReadonlyArray<Order<any>>>(
  elements: Elements
) => Order<{ readonly [I in keyof Elements]: [Elements[I]] extends [Order<infer A>] ? A : never }>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Order.ts#L513)

Since v4.0.0

## flip

Creates a new `Order` that reverses the comparison order of the input `Order`.

**When to use**

Use when you need the reverse of an existing order.

**Details**

Returns a new order that swaps the arguments before comparison. If the
original order returns `-1`, the flipped order returns `1`, and vice versa.
Equal comparisons remain `0`.

**Example** (Reversing an Order)

```ts
import { Order } from "effect"

const flip = Order.flip(Order.Number)

console.log(flip(1, 2)) // 1
console.log(flip(2, 1)) // -1
console.log(flip(1, 1)) // 0
```

**See**

- `combine` to combine orders for multi-criteria comparison

**Signature**

```ts
declare const flip: <A>(O: Order<A>) => Order<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Order.ts#L269)

Since v4.0.0

# combining

## combine

Combines two `Order` instances to create a new `Order` that first compares using the first `Order`,
and if the values are equal, then compares using the second `Order`.

**When to use**

Use when you need tie-breaking with exactly two orders.

**Details**

First applies the first order. If the result is non-zero, that result is
returned; otherwise, the second order is applied. The result is the first
non-zero comparison result, or `0` if both orders return `0`.

**Example** (Combining two Orders)

```ts
import { Order } from "effect"

const byAge = Order.mapInput(Order.Number, (person: { name: string; age: number }) => person.age)
const byName = Order.mapInput(Order.String, (person: { name: string; age: number }) => person.name)
const byAgeAndName = Order.combine(byAge, byName)

const person1 = { name: "Alice", age: 30 }
const person2 = { name: "Bob", age: 30 }
const person3 = { name: "Charlie", age: 25 }

console.log(byAgeAndName(person1, person2)) // -1 (Same age, Alice < Bob)
console.log(byAgeAndName(person1, person3)) // 1 (Alice (30) > Charlie (25))
```

**See**

- `combineAll` to combine multiple orders from a collection
- `mapInput` to transform orders to work with different types

**Signature**

```ts
declare const combine: {
  <A>(that: Order<A>): (self: Order<A>) => Order<A>
  <A>(self: Order<A>, that: Order<A>): Order<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Order.ts#L315)

Since v2.0.0

## combineAll

Combines all `Order` instances in the provided collection into a single `Order`.
The resulting `Order` compares using each `Order` in sequence until a non-zero result is found.

**When to use**

Use when you need tie-breaking across a variable number of orders.

**Details**

Applies orders in iteration order and short-circuits on the first non-zero
result. It returns `0` only if all orders return `0`.

**Example** (Combining multiple Orders)

```ts
import { Order } from "effect"

const byAge = Order.mapInput(Order.Number, (person: { name: string; age: number }) => person.age)
const byName = Order.mapInput(Order.String, (person: { name: string; age: number }) => person.name)

const combinedOrder = Order.combineAll([byAge, byName])

const person1 = { name: "Alice", age: 30 }
const person2 = { name: "Bob", age: 30 }

console.log(combinedOrder(person1, person2)) // -1 (Same age, Alice < Bob)
```

**See**

- `combine` to combine two orders
- `makeReducer` to create a reducer for combining orders

**Signature**

```ts
declare const combineAll: <A>(collection: Iterable<Order<A>>) => Order<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Order.ts#L399)

Since v2.0.0

# comparisons

## clamp

Restricts a value between a minimum and a maximum according to the given order.

**When to use**

Use when you need to clamp a value to an inclusive range according to an
`Order`.

**Details**

Returns the value itself when it is between minimum and maximum, inclusive.
Values below the range return minimum, and values above the range return
maximum. The minimum must be less than or equal to the maximum according to
the order.

**Example** (Clamping values)

```ts
import { Order } from "effect"

const clamp = Order.clamp(Order.Number)({ minimum: 1, maximum: 5 })

console.log(clamp(3)) // 3
console.log(clamp(0)) // 1
console.log(clamp(6)) // 5
```

**See**

- `min` for the minimum of two values
- `max` for the maximum of two values
- `isBetween` to check if a value is within a range

**Signature**

```ts
declare const clamp: <A>(O: Order<A>) => {
  (options: { minimum: A; maximum: A }): (self: A) => A
  (self: A, options: { minimum: A; maximum: A }): A
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Order.ts#L873)

Since v2.0.0

## max

Returns the maximum of two values according to the given order. If they are equal, returns the first argument.

**When to use**

Use when you need to select the larger of two values according to an
`Order`.

**Details**

Returns the value that compares as greater than or equal to the other value.
If values are equal, the first argument is returned.

**Example** (Selecting the maximum value)

```ts
import { Order } from "effect"

const maxNumber = Order.max(Order.Number)

console.log(maxNumber(1, 2)) // 2
console.log(maxNumber(2, 1)) // 2
console.log(maxNumber(1, 1)) // 1
```

**See**

- `min` for the minimum of two values
- `clamp` to clamp a value between min and max

**Signature**

```ts
declare const max: <A>(O: Order<A>) => { (that: A): (self: A) => A; (self: A, that: A): A }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Order.ts#L835)

Since v2.0.0

## min

Returns the minimum of two values according to the given order. If they are equal, returns the first argument.

**When to use**

Use when you need to select the smaller of two values according to an
`Order`.

**Details**

Returns the value that compares as less than or equal to the other value. If
values are equal, the first argument is returned.

**Example** (Selecting the minimum value)

```ts
import { Order } from "effect"

const minNumber = Order.min(Order.Number)

console.log(minNumber(1, 2)) // 1
console.log(minNumber(2, 1)) // 1
console.log(minNumber(1, 1)) // 1
```

**See**

- `max` for the maximum of two values
- `clamp` to clamp a value between min and max

**Signature**

```ts
declare const min: <A>(O: Order<A>) => { (that: A): (self: A) => A; (self: A, that: A): A }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Order.ts#L800)

Since v2.0.0

# constructors

## alwaysEqual

Creates an `Order` that considers all values as equal.

**When to use**

Use when you need an order that treats all values as equal.

**Details**

Always returns `0` regardless of input values, making it useful as a neutral
element in order composition.

**Example** (Ordering with an always-equal Order)

```ts
import { Order } from "effect"

const alwaysEqualOrder = Order.alwaysEqual<number>()

console.log(alwaysEqualOrder(1, 2)) // 0
console.log(alwaysEqualOrder(2, 1)) // 0
console.log(alwaysEqualOrder(1, 1)) // 0
```

**See**

- `combine` to combine with other orders

**Signature**

```ts
declare const alwaysEqual: <A>() => Order<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Order.ts#L355)

Since v4.0.0

## make

Creates a new `Order` instance from a comparison function.

**When to use**

Use when you need a sorting rule not covered by the built-in orders or input
mapping helpers, and you can provide a total comparison.

**Details**

Uses reference equality (`===`) as a shortcut: if `self === that`, it returns
`0` without calling the comparison function. The comparison function should
return `-1`, `0`, or `1`, and the returned order satisfies total ordering
laws when the comparison function does.

**Example** (Creating an Order)

```ts
import { Order } from "effect"

const byAge = Order.make<{ name: string; age: number }>((self, that) => {
  if (self.age < that.age) return -1
  if (self.age > that.age) return 1
  return 0
})

console.log(byAge({ name: "Alice", age: 30 }, { name: "Bob", age: 25 })) // 1
console.log(byAge({ name: "Alice", age: 25 }, { name: "Bob", age: 30 })) // -1
```

**See**

- `mapInput` to transform an order by mapping the input type
- `combine` to combine multiple orders

**Signature**

```ts
declare const make: <A>(compare: (self: A, that: A) => -1 | 0 | 1) => Order<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Order.ts#L111)

Since v2.0.0

## makeReducer

Creates a `Reducer` for combining `Order` instances, useful for aggregating orders in collections.

**When to use**

Use when you need a reducer that combines orders.

**Details**

Returns a reducer that combines orders using `combine`, uses `alwaysEqual` as
the identity element for empty collections, and uses `combineAll` for
combining collections of orders. The reducer can be used with fold operations
on collections.

**Example** (Creating a Reducer)

```ts
import { Order } from "effect"

const reducer = Order.makeReducer<number>()
const orders = [Order.Number, Order.flip(Order.Number)]

const combined = reducer.combineAll(orders)
console.log(combined(1, 2)) // -1 (uses first order)
```

**See**

- `combine` to combine two orders
- `combineAll` to combine multiple orders
- `Reducer` for reducing orders as a collection operation

**Signature**

```ts
declare const makeReducer: <A>() => Reducer.Reducer<Order<A>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Order.ts#L976)

Since v4.0.0

# instances

## BigInt

Order instance for bigints that compares them numerically.

**When to use**

Use when you need numeric ordering for `bigint` values.

**Details**

Uses standard numeric comparison for bigint values and handles arbitrarily
large integers.

**Example** (Ordering BigInts)

```ts
import { Order } from "effect"

console.log(Order.BigInt(1n, 2n)) // -1
console.log(Order.BigInt(2n, 1n)) // 1
console.log(Order.BigInt(1n, 1n)) // 0
```

**See**

- `Number` for regular number comparisons
- `mapInput` to compare objects by a bigint property

**Signature**

```ts
declare const BigInt: Order<bigint>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Order.ts#L238)

Since v4.0.0

## Boolean

Order instance for booleans where `false` is considered less than `true`.

**When to use**

Use when you need boolean ordering where `false` comes before `true`.

**Details**

`false` is less than `true`, and equal values return `0`.

**Example** (Ordering booleans)

```ts
import { Order } from "effect"

console.log(Order.Boolean(false, true)) // -1
console.log(Order.Boolean(true, false)) // 1
console.log(Order.Boolean(true, true)) // 0
```

**See**

- `mapInput` to compare objects by a boolean property

**Signature**

```ts
declare const Boolean: Order<boolean>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Order.ts#L209)

Since v4.0.0

## Date

Order instance for `Date` objects that compares them chronologically by their timestamp.

**When to use**

Use when you need chronological ordering for JavaScript date values.

**Details**

Compares dates by their underlying timestamp in milliseconds since the epoch.
Earlier dates are less than later dates. Invalid dates are compared through
their `getTime()` result.

**Example** (Ordering Dates)

```ts
import { Order } from "effect"

const date1 = new Date("2023-01-01")
const date2 = new Date("2023-01-02")

console.log(Order.Date(date1, date2)) // -1
console.log(Order.Date(date2, date1)) // 1
console.log(Order.Date(date1, date1)) // 0
```

**See**

- `mapInput` to compare objects by a date property

**Signature**

```ts
declare const Date: Order<Date>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Order.ts#L482)

Since v2.0.0

## Number

Order instance for numbers that compares them numerically.

**When to use**

Use when you need numeric ordering for numbers.

**Details**

`0` is considered equal to `-0`. All `NaN` values are considered equal to
each other, and any `NaN` is considered less than any non-`NaN` number. All
other values use standard numeric comparison.

**Example** (Ordering numbers)

```ts
import { Order } from "effect"

console.log(Order.Number(1, 1)) // 0
console.log(Order.Number(1, 2)) // -1
console.log(Order.Number(2, 1)) // 1

console.log(Order.Number(0, -0)) // 0
console.log(Order.Number(NaN, 1)) // -1
```

**See**

- `mapInput` to compare objects by a number property
- `BigInt` for bigint comparisons

**Signature**

```ts
declare const Number: Order<number>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Order.ts#L177)

Since v4.0.0

## String

Order instance for strings that compares them lexicographically using JavaScript's `<` operator.

**When to use**

Use when you need lexicographic string ordering.

**Details**

Uses lexicographic dictionary ordering. The empty string is less than any
non-empty string, and comparisons are case-sensitive.

**Example** (Ordering strings)

```ts
import { Order } from "effect"

console.log(Order.String("apple", "banana")) // -1
console.log(Order.String("banana", "apple")) // 1
console.log(Order.String("apple", "apple")) // 0
```

**See**

- `mapInput` to compare objects by a string property
- `Struct` to combine with other orders for struct comparison

**Signature**

```ts
declare const String: Order<string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Order.ts#L144)

Since v4.0.0

# mapping

## mapInput

Transforms an `Order` on type `A` into an `Order` on type `B` by providing a function that
maps values of type `B` to values of type `A`.

**When to use**

Use when you need to adapt an `Order` to compare a larger value by one
derived property.

**Details**

Applies the mapping function to both values before comparison. The mapping
function should be pure and not have side effects so the ordering properties
of the original order are preserved.

**Example** (Mapping Input)

```ts
import { Order } from "effect"

const byLength = Order.mapInput(Order.Number, (s: string) => s.length)

console.log(byLength("a", "bb")) // -1
console.log(byLength("bb", "a")) // 1
console.log(byLength("aa", "bb")) // 0
```

**See**

- `combine` to combine mapped orders for multi-criteria comparison
- `Struct` to create orders for structs with multiple fields

**Signature**

```ts
declare const mapInput: {
  <B, A>(f: (b: B) => A): (self: Order<A>) => Order<B>
  <A, B>(self: Order<A>, f: (b: B) => A): Order<B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Order.ts#L444)

Since v2.0.0

# predicates

## isBetween

Checks whether a value is between a minimum and a maximum (inclusive) according to the given order.

**When to use**

Use when you need range checks that respect domain-specific ordering, such as
dates, versions, or custom priorities, instead of JavaScript numeric
comparison.

**Details**

Returns `true` when the value is greater than or equal to minimum and less
than or equal to maximum. Values outside the range return `false`. Both
bounds are inclusive.

**Example** (Checking ranges)

```ts
import { Order } from "effect"

const betweenNumber = Order.isBetween(Order.Number)

console.log(betweenNumber(5, { minimum: 1, maximum: 10 })) // true
console.log(betweenNumber(1, { minimum: 1, maximum: 10 })) // true
console.log(betweenNumber(10, { minimum: 1, maximum: 10 })) // true
console.log(betweenNumber(0, { minimum: 1, maximum: 10 })) // false
console.log(betweenNumber(11, { minimum: 1, maximum: 10 })) // false
```

**See**

- `clamp` to clamp a value to a range
- `isLessThanOrEqualTo` for less than or equal check
- `isGreaterThanOrEqualTo` for greater than or equal check

**Signature**

```ts
declare const isBetween: <A>(O: Order<A>) => {
  (options: { minimum: A; maximum: A }): (self: A) => boolean
  (self: A, options: { minimum: A; maximum: A }): boolean
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Order.ts#L926)

Since v4.0.0

## isGreaterThan

Checks whether one value is strictly greater than another according to the given order.

**When to use**

Use when you need a boolean greater-than predicate using an `Order`.

**Details**

Returns `true` if the order returns `1`, meaning the first value is greater
than the second. Equal or lesser values return `false`.

**Example** (Checking greater-than comparisons)

```ts
import { Order } from "effect"

const isGreaterThanNumber = Order.isGreaterThan(Order.Number)

console.log(isGreaterThanNumber(2, 1)) // true
console.log(isGreaterThanNumber(1, 2)) // false
console.log(isGreaterThanNumber(1, 1)) // false
```

**See**

- `isGreaterThanOrEqualTo` for non-strict greater than or equal
- `isLessThan` for strict less than

**Signature**

```ts
declare const isGreaterThan: <A>(O: Order<A>) => { (that: A): (self: A) => boolean; (self: A, that: A): boolean }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Order.ts#L696)

Since v4.0.0

## isGreaterThanOrEqualTo

Checks whether one value is greater than or equal to another according to the given order.

**When to use**

Use when you need a boolean greater-than-or-equal predicate using an
`Order`.

**Details**

Returns `true` if the order returns `1` or `0`, and returns `false` only if
the order returns `-1`.

**Example** (Checking greater-than-or-equal comparisons)

```ts
import { Order } from "effect"

const isGreaterThanOrEqualToNumber = Order.isGreaterThanOrEqualTo(Order.Number)

console.log(isGreaterThanOrEqualToNumber(2, 1)) // true
console.log(isGreaterThanOrEqualToNumber(1, 1)) // true
console.log(isGreaterThanOrEqualToNumber(1, 2)) // false
```

**See**

- `isGreaterThan` for strict greater than
- `isLessThanOrEqualTo` for less than or equal

**Signature**

```ts
declare const isGreaterThanOrEqualTo: <A>(O: Order<A>) => {
  (that: A): (self: A) => boolean
  (self: A, that: A): boolean
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Order.ts#L765)

Since v4.0.0

## isLessThan

Checks whether one value is strictly less than another according to the given order.

**When to use**

Use when you need a boolean less-than predicate using an `Order`.

**Details**

Returns `true` if the order returns `-1`, meaning the first value is less
than the second. Equal or greater values return `false`.

**Example** (Checking less-than comparisons)

```ts
import { Order } from "effect"

const isLessThanNumber = Order.isLessThan(Order.Number)

console.log(isLessThanNumber(1, 2)) // true
console.log(isLessThanNumber(2, 1)) // false
console.log(isLessThanNumber(1, 1)) // false
```

**See**

- `isLessThanOrEqualTo` for non-strict less than or equal
- `isGreaterThan` for strict greater than

**Signature**

```ts
declare const isLessThan: <A>(O: Order<A>) => { (that: A): (self: A) => boolean; (self: A, that: A): boolean }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Order.ts#L662)

Since v4.0.0

## isLessThanOrEqualTo

Checks whether one value is less than or equal to another according to the given order.

**When to use**

Use when you need a boolean less-than-or-equal predicate using an `Order`.

**Details**

Returns `true` if the order returns `-1` or `0`, and returns `false` only if
the order returns `1`.

**Example** (Checking less-than-or-equal comparisons)

```ts
import { Order } from "effect"

const isLessThanOrEqualToNumber = Order.isLessThanOrEqualTo(Order.Number)

console.log(isLessThanOrEqualToNumber(1, 2)) // true
console.log(isLessThanOrEqualToNumber(1, 1)) // true
console.log(isLessThanOrEqualToNumber(2, 1)) // false
```

**See**

- `isLessThan` for strict less than
- `isGreaterThan` for strict greater than

**Signature**

```ts
declare const isLessThanOrEqualTo: <A>(O: Order<A>) => { (that: A): (self: A) => boolean; (self: A, that: A): boolean }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Order.ts#L730)

Since v4.0.0

# type class

## Order (interface)

Represents a total ordering for values of type `A`.

**When to use**

Use when you need to define how values of a type are compared.

**Details**

An order returns `-1` when the first value is less than the second, `0` when
the values are equal according to this ordering, and `1` when the first value
is greater than the second. It must satisfy total ordering laws: totality,
antisymmetry, and transitivity.

**Example** (Defining a custom Order)

```ts
import { Order } from "effect"

const byAge: Order.Order<{ name: string; age: number }> = (self, that) => {
  if (self.age < that.age) return -1
  if (self.age > that.age) return 1
  return 0
}

const person1 = { name: "Alice", age: 30 }
const person2 = { name: "Bob", age: 25 }
console.log(byAge(person1, person2)) // 1
```

**See**

- `make` to create an order from a comparison function
- `Ordering` for the result type of comparisons

**Signature**

```ts
export interface Order<in A> {
  (self: A, that: A): Ordering
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Order.ts#L53)

Since v2.0.0

# type lambdas

## OrderTypeLambda (interface)

Type lambda for the `Order` type class, used internally for higher-kinded type operations.

**When to use**

Use when you need to abstract over `Order` in higher-kinded type code.

**Details**

This is type-level only, has no runtime representation, and is used
internally by the Effect type system.

**Signature**

```ts
export interface OrderTypeLambda extends TypeLambda {
  readonly type: Order<this["Target"]>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Order.ts#L72)

Since v2.0.0

# utils

## Array\_

**Signature**

```ts
declare const Array_: <A>(O: Order<A>) => Order<ReadonlyArray<A>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Order.ts#L531)

Since v4.0.0
