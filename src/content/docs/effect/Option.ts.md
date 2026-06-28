---
title: Option.ts
nav_order: 68
parent: "effect"
---

## Option.ts overview

Models a value that may be present or absent.

An `Option<A>` is `Some<A>` when a value is available and `None` when it is
not. This lets code handle missing values explicitly instead of relying on
`null` or `undefined`. The module includes helpers for creating, checking,
transforming, combining, and extracting optional values, plus conversions to
and from common nullable or result-like shapes. It also includes `Option.gen`
for writing small generator-based computations that stop at the first `None`.

Since v2.0.0

---

## Exports Grouped by Category

- [Combiner](#combiner)
  - [makeCombinerFailFast](#makecombinerfailfast)
- [Reducer](#reducer)
  - [makeReducer](#makereducer)
  - [makeReducerFailFast](#makereducerfailfast)
- [combining](#combining)
  - [all](#all)
  - [product](#product)
  - [productMany](#productmany)
- [constructors](#constructors)
  - [fromIterable](#fromiterable)
  - [none](#none)
  - [some](#some)
  - [void](#void)
- [converting](#converting)
  - [fromNullOr](#fromnullor)
  - [fromNullishOr](#fromnullishor)
  - [fromUndefinedOr](#fromundefinedor)
  - [getFailure](#getfailure)
  - [getOrThrow](#getorthrow)
  - [getOrThrowWith](#getorthrowwith)
  - [getSuccess](#getsuccess)
  - [liftNullishOr](#liftnullishor)
  - [liftThrowable](#liftthrowable)
  - [toArray](#toarray)
  - [toRefinement](#torefinement)
- [do notation](#do-notation)
  - [Do](#do)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [let](#let)
- [elements](#elements)
  - [contains](#contains)
  - [containsWith](#containswith)
  - [exists](#exists)
- [error handling](#error-handling)
  - [firstSomeOf](#firstsomeof)
  - [orElse](#orelse)
  - [orElseResult](#orelseresult)
  - [orElseSome](#orelsesome)
- [filtering](#filtering)
  - [filter](#filter)
  - [filterMap](#filtermap)
  - [partitionMap](#partitionmap)
- [generators](#generators)
  - [OptionIterator (interface)](#optioniterator-interface)
  - [gen](#gen)
- [getters](#getters)
  - [getOrElse](#getorelse)
  - [getOrNull](#getornull)
  - [getOrUndefined](#getorundefined)
- [guards](#guards)
  - [isNone](#isnone)
  - [isOption](#isoption)
  - [isSome](#issome)
- [instances](#instances)
  - [makeEquivalence](#makeequivalence)
- [lifting](#lifting)
  - [lift2](#lift2)
  - [liftPredicate](#liftpredicate)
- [mapping](#mapping)
  - [as](#as)
  - [asVoid](#asvoid)
  - [map](#map)
- [models](#models)
  - [None (interface)](#none-interface)
  - [Option (type alias)](#option-type-alias)
  - [OptionUnify (interface)](#optionunify-interface)
  - [OptionUnifyIgnore (interface)](#optionunifyignore-interface)
  - [Some (interface)](#some-interface)
- [pattern matching](#pattern-matching)
  - [match](#match)
- [reducing](#reducing)
  - [reduceCompact](#reducecompact)
- [sequencing](#sequencing)
  - [andThen](#andthen)
  - [composeK](#composek)
  - [flatMap](#flatmap)
  - [flatMapNullishOr](#flatmapnullishor)
  - [flatten](#flatten)
  - [tap](#tap)
- [sorting](#sorting)
  - [makeOrder](#makeorder)
- [type lambdas](#type-lambdas)
  - [OptionTypeLambda (interface)](#optiontypelambda-interface)
- [utils](#utils)
  - [Option (namespace)](#option-namespace)
    - [Value (type alias)](#value-type-alias)
- [zipping](#zipping)
  - [zipLeft](#zipleft)
  - [zipRight](#zipright)
  - [zipWith](#zipwith)

---

# Combiner

## makeCombinerFailFast

Creates a `Combiner` for `Option<A>` with fail-fast semantics: returns `None`
if either operand is `None`.

**When to use**

Use when you need an `Option` combiner that returns `None` unless both
operands are `Some`.

**Details**

- `None` + anything → `None`
- anything + `None` → `None`
- `Some(a)` + `Some(b)` → `Some(combine(a, b))`

**Example** (Fail-fast combining)

```ts
import { Number, Option } from "effect"

const combiner = Option.makeCombinerFailFast(Number.ReducerSum)
console.log(combiner.combine(Option.some(1), Option.some(2)))
// Output: { _id: 'Option', _tag: 'Some', value: 3 }

console.log(combiner.combine(Option.some(1), Option.none()))
// Output: { _id: 'Option', _tag: 'None' }
```

**See**

- `makeReducerFailFast` to get a full `Reducer`

**Signature**

```ts
declare const makeCombinerFailFast: <A>(combiner: Combiner.Combiner<A>) => Combiner.Combiner<Option<A>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L2612)

Since v4.0.0

# Reducer

## makeReducer

Creates a `Reducer` for `Option<A>` that prioritizes the first non-`None`
value and combines values when both are `Some`.

**When to use**

Use to build an `Option` reducer that falls back to the first available value
when either side may be absent.

**Details**

- `None` + `None` → `None`
- `Some(a)` + `None` → `Some(a)`
- `None` + `Some(b)` → `Some(b)`
- `Some(a)` + `Some(b)` → `Some(combine(a, b))`
- Initial value is `None`

**Example** (Reducing with first-wins semantics)

```ts
import { Number, Option } from "effect"

const reducer = Option.makeReducer(Number.ReducerSum)
console.log(reducer.combineAll([Option.some(1), Option.none(), Option.some(2)]))
// Output: { _id: 'Option', _tag: 'Some', value: 3 }
```

**See**

- `makeReducerFailFast` for fail-fast semantics

**Signature**

```ts
declare const makeReducer: <A>(combiner: Combiner.Combiner<A>) => Reducer.Reducer<Option<A>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L2571)

Since v4.0.0

## makeReducerFailFast

Creates a `Reducer` for `Option<A>` by lifting an existing `Reducer` with
fail-fast semantics.

**When to use**

Use when you need to reduce `Option` values with fail-fast semantics, where
any `None` aborts the entire result instead of being skipped.

**Details**

- Initial value is `Some(reducer.initialValue)`
- Combines only when both operands are `Some`
- Any `None` causes the result to become `None` immediately

**Example** (Fail-fast reducing)

```ts
import { Number, Option } from "effect"

const reducer = Option.makeReducerFailFast(Number.ReducerSum)
console.log(reducer.combineAll([Option.some(1), Option.some(2)]))
// Output: { _id: 'Option', _tag: 'Some', value: 3 }

console.log(reducer.combineAll([Option.some(1), Option.none()]))
// Output: { _id: 'Option', _tag: 'None' }
```

**See**

- `makeCombinerFailFast` for just the combiner
- `makeReducer` for non-fail-fast semantics

**Signature**

```ts
declare const makeReducerFailFast: <A>(reducer: Reducer.Reducer<A>) => Reducer.Reducer<Option<A>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L2653)

Since v4.0.0

# combining

## all

Combines a structure of `Option`s (tuple, struct, or iterable) into a single
`Option` containing the unwrapped structure.

**When to use**

Use when you need to combine multiple `Option` values into one while
preserving the input shape, with any `None` making the result `None`.

**Details**

- Tuple input → `Option` of a tuple with the same length
- Struct input → `Option` of a struct with the same keys
- Iterable input → `Option` of an `Array`
- Any `None` in the input → entire result is `None`

**Example** (Combining a tuple and a struct)

```ts
import { Option } from "effect"

const maybeName: Option.Option<string> = Option.some("John")
const maybeAge: Option.Option<number> = Option.some(25)

//      ┌─── Option<[string, number]>
//      ▼
const tuple = Option.all([maybeName, maybeAge])
console.log(tuple)
// Output:
// { _id: 'Option', _tag: 'Some', value: [ 'John', 25 ] }

//      ┌─── Option<{ name: string; age: number; }>
//      ▼
const struct = Option.all({ name: maybeName, age: maybeAge })
console.log(struct)
// Output:
// { _id: 'Option', _tag: 'Some', value: { name: 'John', age: 25 } }
```

**See**

- `product` for combining exactly two
- `productMany` for a homogeneous collection

**Signature**

```ts
declare const all: <const I extends Iterable<Option<any>> | Record<string, Option<any>>>(
  input: I
) => [I] extends [ReadonlyArray<Option<any>>]
  ? Option<{ -readonly [K in keyof I]: [I[K]] extends [Option<infer A>] ? A : never }>
  : [I] extends [Iterable<Option<infer A>>]
    ? Option<Array<A>>
    : Option<{ -readonly [K in keyof I]: [I[K]] extends [Option<infer A>] ? A : never }>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L1735)

Since v2.0.0

## product

Combines two `Option`s into a `Some` containing a tuple `[A, B]` if both
are `Some`.

**When to use**

Use when you need to require two `Option` values to both be `Some` and keep
both values as a tuple.

**Details**

- Both `Some` → `Some([a, b])`
- Either `None` → `None`

**Example** (Pairing two Options)

```ts
import { Option } from "effect"

console.log(Option.product(Option.some("hello"), Option.some(42)))
// Output: { _id: 'Option', _tag: 'Some', value: ['hello', 42] }

console.log(Option.product(Option.none(), Option.some(42)))
// Output: { _id: 'Option', _tag: 'None' }
```

**See**

- `zipWith` to combine with a function instead of a tuple
- `all` to combine many `Option`s

**Signature**

```ts
declare const product: <A, B>(self: Option<A>, that: Option<B>) => Option<[A, B]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L1634)

Since v2.0.0

## productMany

Combines a primary `Option` with an iterable of `Option`s into a tuple if
all are `Some`.

**When to use**

Use when you need several `Option` values of the same type to all be `Some`
and return them as a non-empty tuple.

**Details**

- All `Some` → `Some([self.value, ...rest])`
- Any `None` → `None`

**Example** (Combining many Options)

```ts
import { Option } from "effect"

const first = Option.some(1)
const rest = [Option.some(2), Option.some(3)]

console.log(Option.productMany(first, rest))
// Output: { _id: 'Option', _tag: 'Some', value: [1, 2, 3] }

console.log(Option.productMany(first, [Option.some(2), Option.none()]))
// Output: { _id: 'Option', _tag: 'None' }
```

**See**

- `product` for combining exactly two
- `all` for tuples, structs, and iterables

**Signature**

```ts
declare const productMany: <A>(self: Option<A>, collection: Iterable<Option<A>>) => Option<[A, ...Array<A>]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L1672)

Since v2.0.0

# constructors

## fromIterable

Wraps the first element of an `Iterable` in a `Some`, or returns `None` if
the iterable is empty.

**When to use**

Use when you need to safely extract the head of a collection, including
generators or lazy iterables.

**Details**

- Only consumes the first element; does not iterate the rest
- Returns `None` for empty iterables

**Example** (Getting the first element)

```ts
import { Option } from "effect"

console.log(Option.fromIterable([1, 2, 3]))
// Output: { _id: 'Option', _tag: 'Some', value: 1 }

console.log(Option.fromIterable([]))
// Output: { _id: 'Option', _tag: 'None' }
```

**See**

- `toArray` for the inverse direction

**Signature**

```ts
declare const fromIterable: <A>(collection: Iterable<A>) => Option<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L513)

Since v2.0.0

## none

Creates an `Option` representing the absence of a value.

**When to use**

Use to represent a missing or uninitialized value, such as returning "no
result" from a function.

**Details**

- Returns `Option<never>`, which is a subtype of `Option<A>` for any `A`
- Always returns the same singleton instance

**Example** (Creating an empty Option)

```ts
import { Option } from "effect"

//      ┌─── Option<never>
//      ▼
const noValue = Option.none()

console.log(noValue)
// Output: { _id: 'Option', _tag: 'None' }
```

**See**

- `some` for the opposite operation.

**Signature**

```ts
declare const none: <A = never>() => Option<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L259)

Since v2.0.0

## some

Wraps the given value into an `Option` to represent its presence.

**When to use**

Use to wrap a known present value as `Option`

- Returning a successful result from a partial function

**Details**

- Always returns `Some<A>`
- Does not filter `null` or `undefined`; use `fromNullishOr` for that

**Example** (Wrapping a value)

```ts
import { Option } from "effect"

//      ┌─── Option<number>
//      ▼
const value = Option.some(1)

console.log(value)
// Output: { _id: 'Option', _tag: 'Some', value: 1 }
```

**See**

- `none` for the opposite operation.

**Signature**

```ts
declare const some: <A>(value: A) => Option<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L292)

Since v2.0.0

## void

Provides a pre-built `Some(undefined)` constant.

**When to use**

Use to return a "success with no meaningful value" from an `Option`-returning function

**Example** (Referencing Option.void)

```ts
import { Option } from "effect"

console.log(Option.void)
// Output: { _id: 'Option', _tag: 'Some', value: undefined }
```

**See**

- `asVoid` to convert an existing `Option` to `Option<void>`

**Signature**

```ts
declare const void: Option<void>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L1249)

Since v2.0.0

# converting

## fromNullOr

Converts a possibly `null` value into an `Option`, leaving `undefined`
as a valid `Some`.

**When to use**

Use when you want to treat only `null` as absent while preserving
`undefined` as a meaningful value.

**Details**

- `null` → `None`
- Any other value (including `undefined`) → `Some`

**Example** (Converting possibly null values to an Option)

```ts
import { Option } from "effect"

console.log(Option.fromNullOr(null))
// Output: { _id: 'Option', _tag: 'None' }

console.log(Option.fromNullOr(undefined))
// Output: { _id: 'Option', _tag: 'Some', value: undefined }

console.log(Option.fromNullOr(42))
// Output: { _id: 'Option', _tag: 'Some', value: 42 }
```

**See**

- `fromNullishOr` to treat both `null` and `undefined` as absent
- `fromUndefinedOr` to only treat `undefined` as absent

**Signature**

```ts
declare const fromNullOr: <A>(a: A) => Option<Exclude<A, null>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L899)

Since v4.0.0

## fromNullishOr

Converts a nullable value (`null` or `undefined`) into an `Option`.

**When to use**

Use when you need JavaScript nullish values to become absence at an API
boundary while all other values, including falsy ones, remain present.

**Details**

- `null` or `undefined` → `None`
- Any other value → `Some` (typed as `NonNullable<A>`)

**Example** (Converting nullable values to an Option)

```ts
import { Option } from "effect"

console.log(Option.fromNullishOr(undefined))
// Output: { _id: 'Option', _tag: 'None' }

console.log(Option.fromNullishOr(null))
// Output: { _id: 'Option', _tag: 'None' }

console.log(Option.fromNullishOr(1))
// Output: { _id: 'Option', _tag: 'Some', value: 1 }
```

**See**

- `fromNullOr` to only treat `null` as absent
- `fromUndefinedOr` to only treat `undefined` as absent
- `liftNullishOr` to lift a nullable-returning function

**Signature**

```ts
declare const fromNullishOr: <A>(a: A) => Option<NonNullable<A>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L821)

Since v4.0.0

## fromUndefinedOr

Converts a possibly `undefined` value into an `Option`, leaving `null`
as a valid `Some`.

**When to use**

Use when you want to treat only `undefined` as absent while preserving `null`
as a meaningful value.

**Details**

- `undefined` → `None`
- Any other value (including `null`) → `Some`

**Example** (Converting possibly undefined values to an Option)

```ts
import { Option } from "effect"

console.log(Option.fromUndefinedOr(undefined))
// Output: { _id: 'Option', _tag: 'None' }

console.log(Option.fromUndefinedOr(null))
// Output: { _id: 'Option', _tag: 'Some', value: null }

console.log(Option.fromUndefinedOr(42))
// Output: { _id: 'Option', _tag: 'Some', value: 42 }
```

**See**

- `fromNullishOr` to treat both `null` and `undefined` as absent
- `fromNullOr` to only treat `null` as absent

**Signature**

```ts
declare const fromUndefinedOr: <A>(a: A) => Option<Exclude<A, undefined>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L860)

Since v4.0.0

## getFailure

Converts a `Result` into an `Option`, keeping only the failure value.

**When to use**

Use when you need to discard a `Result` success and keep only the failure
value as an `Option`.

**Details**

- `Failure` becomes `Some` with the failure value
- `Success` becomes `None` and the success value is discarded

**Example** (Extracting the failure side)

```ts
import { Option, Result } from "effect"

console.log(Option.getFailure(Result.succeed("ok")))
// Output: { _id: 'Option', _tag: 'None' }

console.log(Option.getFailure(Result.fail("err")))
// Output: { _id: 'Option', _tag: 'Some', value: 'err' }
```

**See**

- `getSuccess` for the opposite operation.

**Signature**

```ts
declare const getFailure: <A, E>(self: Result<A, E>) => Option<E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L582)

Since v4.0.0

## getOrThrow

Extracts the value from a `Some`, or throws a default `Error` for `None`.

**When to use**

Use when you need quick fail-fast unwrapping of an `Option` and a generic
error is acceptable.

**Details**

- `Some` → returns the inner value
- `None` → throws `new Error("getOrThrow called on a None")`

**Example** (Throwing a default error)

```ts
import { Option } from "effect"

console.log(Option.getOrThrow(Option.some(1)))
// Output: 1

Option.getOrThrow(Option.none())
// throws Error: getOrThrow called on a None
```

**See**

- `getOrThrowWith` for a custom error
- `getOrElse` for a non-throwing alternative

**Signature**

```ts
declare const getOrThrow: <A>(self: Option<A>) => A
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L1125)

Since v2.0.0

## getOrThrowWith

Extracts the value from a `Some`, or throws a custom error for `None`.

**When to use**

Use when you need fail-fast unwrapping of an `Option` for unexpected absence
and want to provide a descriptive debugging error.

**Details**

- `Some` → returns the inner value
- `None` → throws the value returned by `onNone()`

**Example** (Throwing a custom error)

```ts
import { Option } from "effect"

console.log(Option.getOrThrowWith(Option.some(1), () => new Error("missing")))
// Output: 1

Option.getOrThrowWith(Option.none(), () => new Error("missing"))
// throws Error: missing
```

**See**

- `getOrThrow` for a version with a default error
- `getOrElse` for a non-throwing alternative

**Signature**

```ts
declare const getOrThrowWith: {
  (onNone: () => unknown): <A>(self: Option<A>) => A
  <A>(self: Option<A>, onNone: () => unknown): A
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L1084)

Since v2.0.0

## getSuccess

Converts a `Result` into an `Option`, keeping only the success value.

**When to use**

Use when you need to discard a `Result` failure and keep only the success
value as an `Option`.

**Details**

- `Success` becomes `Some` with the success value
- `Failure` becomes `None` and the failure value is discarded

**Example** (Extracting the success side)

```ts
import { Option, Result } from "effect"

console.log(Option.getSuccess(Result.succeed("ok")))
// Output: { _id: 'Option', _tag: 'Some', value: 'ok' }

console.log(Option.getSuccess(Result.fail("err")))
// Output: { _id: 'Option', _tag: 'None' }
```

**See**

- `getFailure` for the opposite operation.

**Signature**

```ts
declare const getSuccess: <A, E>(self: Result<A, E>) => Option<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L550)

Since v4.0.0

## liftNullishOr

Lifts a function that may return `null` or `undefined` into one that returns
an `Option`.

**When to use**

Use to wrap existing nullable-returning functions for use in `Option` pipelines

**Details**

- Calls the original function with the given arguments
- Wraps the result via `fromNullishOr`

**Example** (Lifting a parser)

```ts
import { Option } from "effect"

const parse = (s: string): number | undefined => {
  const n = parseFloat(s)
  return isNaN(n) ? undefined : n
}

const parseOption = Option.liftNullishOr(parse)

console.log(parseOption("1"))
// Output: { _id: 'Option', _tag: 'Some', value: 1 }

console.log(parseOption("not a number"))
// Output: { _id: 'Option', _tag: 'None' }
```

**See**

- `fromNullishOr` for converting a single value
- `liftThrowable` for functions that throw instead

**Signature**

```ts
declare const liftNullishOr: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B
) => (...a: A) => Option<NonNullable<B>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L941)

Since v4.0.0

## liftThrowable

Lifts a function that may throw into one that returns an `Option`.

**When to use**

Use to wrap exception-throwing APIs (e.g. `JSON.parse`) for safe usage

**Details**

- If the function returns normally → `Some` with the result
- If the function throws → `None` (exception is swallowed)

**Example** (Lifting JSON.parse)

```ts
import { Option } from "effect"

const parse = Option.liftThrowable(JSON.parse)

console.log(parse("1"))
// Output: { _id: 'Option', _tag: 'Some', value: 1 }

console.log(parse(""))
// Output: { _id: 'Option', _tag: 'None' }
```

**See**

- `liftNullishOr` for nullable-returning functions

**Signature**

```ts
declare const liftThrowable: <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => B) => (...a: A) => Option<B>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L1042)

Since v2.0.0

## toArray

Converts an `Option` into an `Array`.

**When to use**

Use when you need to pass an `Option` to array-based APIs or spread optional
values into collections.

**Details**

- `Some` → single-element array `[value]`
- `None` → empty array `[]`

**Example** (Converting to an array)

```ts
import { Option } from "effect"

console.log(Option.toArray(Option.some(1)))
// Output: [1]

console.log(Option.toArray(Option.none()))
// Output: []
```

**See**

- `fromIterable` for the inverse direction

**Signature**

```ts
declare const toArray: <A>(self: Option<A>) => Array<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L1884)

Since v2.0.0

## toRefinement

Converts an `Option`-returning function into a type guard (refinement).

**When to use**

Use when you need to turn an `Option`-returning parser into a type-narrowing
predicate, such as for `Array.prototype.filter`.

**Details**

- Returns `true` when the original function returns `Some`
- Returns `false` when the original function returns `None`
- Narrows the input type to `B` on success

**Example** (Converting a parser to a type guard)

```ts
import { Option } from "effect"

type MyData = string | number

const parseString = (data: MyData): Option.Option<string> =>
  typeof data === "string" ? Option.some(data) : Option.none()

//      ┌─── (a: MyData) => a is string
//      ▼
const isString = Option.toRefinement(parseString)

console.log(isString("a"))
// Output: true

console.log(isString(1))
// Output: false
```

**See**

- `liftPredicate` for the reverse direction

**Signature**

```ts
declare const toRefinement: <A, B extends A>(f: (a: A) => Option<B>) => (a: A) => a is B
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L480)

Since v2.0.0

# do notation

## Do

Provides an `Option` containing an empty record `{}`, used as the starting point for
do notation chains.

**When to use**

Use when you need to start an `Option` do notation pipeline before adding
bindings.

**Example** (Building Option pipelines with do notation)

```ts
import { Option, pipe } from "effect"
import * as assert from "node:assert"

const result = pipe(
  Option.Do,
  Option.bind("x", () => Option.some(2)),
  Option.bind("y", () => Option.some(3)),
  Option.let("sum", ({ x, y }) => x + y),
  Option.filter(({ x, y }) => x * y > 5)
)
assert.deepStrictEqual(result, Option.some({ x: 2, y: 3, sum: 5 }))
```

**See**

- `bind` to add `Option` values
- `let` to add plain values
- `bindTo` to start by naming an existing `Option`

**Signature**

```ts
declare const Do: Option<{}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L2484)

Since v2.0.0

## bind

Adds an `Option` value to the do notation record under a given name. If the
`Option` is `None`, the whole pipeline short-circuits to `None`.

**When to use**

Use when you need to sequence `Option` computations in do notation.

**Example** (Binding Option values)

```ts
import { Option, pipe } from "effect"
import * as assert from "node:assert"

const result = pipe(
  Option.Do,
  Option.bind("x", () => Option.some(2)),
  Option.bind("y", () => Option.some(3)),
  Option.let("sum", ({ x, y }) => x + y),
  Option.filter(({ x, y }) => x * y > 5)
)
assert.deepStrictEqual(result, Option.some({ x: 2, y: 3, sum: 5 }))
```

**See**

- `Do` for starting the chain
- `let` to add plain values
- `bindTo` to start by naming an existing `Option`

**Signature**

```ts
declare const bind: {
  <N extends string, A extends object, B>(
    name: Exclude<N, keyof A>,
    f: (a: NoInfer<A>) => Option<B>
  ): (self: Option<A>) => Option<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
  <A extends object, N extends string, B>(
    self: Option<A>,
    name: Exclude<N, keyof A>,
    f: (a: NoInfer<A>) => Option<B>
  ): Option<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L2440)

Since v2.0.0

## bindTo

Gives a name to the value of an `Option`, creating a single-key record
inside `Some`. Starting point for the do notation pipeline.

**When to use**

Use when you need to start an `Option` do notation chain by naming the first
value.

**Example** (Starting do notation)

```ts
import { Option, pipe } from "effect"
import * as assert from "node:assert"

const result = pipe(
  Option.some(2),
  Option.bindTo("x"),
  Option.bind("y", () => Option.some(3)),
  Option.let("sum", ({ x, y }) => x + y)
)
assert.deepStrictEqual(result, Option.some({ x: 2, y: 3, sum: 5 }))
```

**See**

- `Do` for starting with an empty record
- `bind` to add `Option` values
- `let` to add plain values

**Signature**

```ts
declare const bindTo: {
  <N extends string>(name: N): <A>(self: Option<A>) => Option<{ [K in N]: A }>
  <A, N extends string>(self: Option<A>, name: N): Option<{ [K in N]: A }>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L2358)

Since v2.0.0

## let

Adds a computed plain value to the do notation record.

**When to use**

Use when you need to bind a derived non-`Option` value in an `Option` do
notation pipeline.

**Example** (Adding a computed value)

```ts
import { Option, pipe } from "effect"
import * as assert from "node:assert"

const result = pipe(
  Option.Do,
  Option.bind("x", () => Option.some(2)),
  Option.bind("y", () => Option.some(3)),
  Option.let("sum", ({ x, y }) => x + y)
)
assert.deepStrictEqual(result, Option.some({ x: 2, y: 3, sum: 5 }))
```

**See**

- `Do` for starting the chain
- `bind` to add `Option` values
- `bindTo` to start by naming an existing `Option`

**Signature**

```ts
declare const let: {
  <N extends string, A extends object, B>(
    name: Exclude<N, keyof A>,
    f: (a: NoInfer<A>) => B
  ): (self: Option<A>) => Option<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
  <A extends object, N extends string, B>(
    self: Option<A>,
    name: Exclude<N, keyof A>,
    f: (a: NoInfer<A>) => B
  ): Option<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L2406)

Since v2.0.0

# elements

## contains

Checks whether an `Option` contains a value equal to the given one, using default
structural equality.

**When to use**

Use when you need a quick membership test for an `Option` value using
standard equality.

**Details**

- `Some` where `Equal.equals(value, a)` is `true` → `true`
- `Some` where not equal, or `None` → `false`

**Example** (Checking containment)

```ts
import { Option } from "effect"

console.log(Option.some(2).pipe(Option.contains(2)))
// Output: true

console.log(Option.some(1).pipe(Option.contains(2)))
// Output: false

console.log(Option.none().pipe(Option.contains(2)))
// Output: false
```

**See**

- `containsWith` for custom equality
- `exists` to test with a predicate

**Signature**

```ts
declare const contains: { <A>(a: A): (self: Option<A>) => boolean; <A>(self: Option<A>, a: A): boolean }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L2270)

Since v2.0.0

## containsWith

Checks whether an `Option` contains a value equivalent to the given one, using a
custom `Equivalence`.

**When to use**

Use when you need to test whether an `Option` contains a value using a
custom equality check.

**Details**

- `Some` where `isEquivalent(value, a)` is `true` → `true`
- `Some` where not equivalent, or `None` → `false`

**Example** (Checking with custom equivalence)

```ts
import { Equivalence, Option } from "effect"

const check = Option.containsWith(Equivalence.strictEqual<number>())

console.log(Option.some(2).pipe(check(2)))
// Output: true

console.log(Option.some(1).pipe(check(2)))
// Output: false

console.log(Option.none().pipe(check(2)))
// Output: false
```

**See**

- `contains` for a version using default equality

**Signature**

```ts
declare const containsWith: <A>(isEquivalent: (self: A, that: A) => boolean) => {
  (a: A): (self: Option<A>) => boolean
  (self: Option<A>, a: A): boolean
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L2230)

Since v2.0.0

## exists

Checks whether the value in a `Some` satisfies a predicate or refinement.

**When to use**

Use to check a condition on an optional value without unwrapping

**Details**

- `None` → `false`
- `Some` where `predicate(value)` is `true` → `true`
- `Some` where `predicate(value)` is `false` → `false`
- With a refinement, narrows the `Option` type on `true`

**Example** (Testing a condition)

```ts
import { Option } from "effect"

const isEven = (n: number) => n % 2 === 0

console.log(Option.some(2).pipe(Option.exists(isEven)))
// Output: true

console.log(Option.some(1).pipe(Option.exists(isEven)))
// Output: false

console.log(Option.none().pipe(Option.exists(isEven)))
// Output: false
```

**See**

- `filter` to keep or discard based on a predicate
- `contains` to test for a specific value

**Signature**

```ts
declare const exists: {
  <A, B extends A>(refinement: Refinement<NoInfer<A>, B>): (self: Option<A>) => self is Option<B>
  <A>(predicate: Predicate<NoInfer<A>>): (self: Option<A>) => boolean
  <A, B extends A>(self: Option<A>, refinement: Refinement<A, B>): self is Option<B>
  <A>(self: Option<A>, predicate: Predicate<A>): boolean
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L2312)

Since v2.0.0

# error handling

## firstSomeOf

Returns the first `Some` found in an iterable of `Option`s, or `None` if
all are `None`.

**When to use**

Use when you need the first available `Some` value from a priority list.

**Details**

- Short-circuits on the first `Some`
- Returns `None` only when every element is `None`

**Example** (Finding the first Some)

```ts
import { Option } from "effect"

console.log(Option.firstSomeOf([Option.none(), Option.some(1), Option.some(2)]))
// Output: { _id: 'Option', _tag: 'Some', value: 1 }
```

**See**

- `orElse` for a two-option fallback

**Signature**

```ts
declare const firstSomeOf: <T, C extends Iterable<Option<T>> = Iterable<Option<T>>>(
  collection: C
) => [C] extends [Iterable<Option<infer A>>] ? Option<A> : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L774)

Since v2.0.0

## orElse

Returns the fallback `Option` if `self` is `None`; otherwise returns `self`.

**When to use**

Use when you need a lazy fallback `Option`, such as when building priority
chains of optional values.

**Details**

- `Some` → returns `self` unchanged
- `None` → evaluates and returns `that()`
- `that` is lazily evaluated

**Example** (Providing a fallback Option)

```ts
import { Option } from "effect"

console.log(Option.none().pipe(Option.orElse(() => Option.some("b"))))
// Output: { _id: 'Option', _tag: 'Some', value: 'b' }

console.log(Option.some("a").pipe(Option.orElse(() => Option.some("b"))))
// Output: { _id: 'Option', _tag: 'Some', value: 'a' }
```

**See**

- `orElseSome` to wrap the fallback value in `Some` automatically
- `firstSomeOf` to pick the first `Some` from a collection

**Signature**

```ts
declare const orElse: {
  <B>(that: LazyArg<Option<B>>): <A>(self: Option<A>) => Option<B | A>
  <A, B>(self: Option<A>, that: LazyArg<Option<B>>): Option<A | B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L657)

Since v2.0.0

## orElseResult

Returns the first available value and marks whether it came from the fallback.

**When to use**

Use when you need to know whether a present value came from the primary or
fallback `Option`.

**Details**

- `self` is `Some` → `Some(Result.fail(value))` (value from primary)
- `self` is `None`, `that()` is `Some` → `Some(Result.succeed(value))` (value from fallback)
- Both `None` → `None`

**Example** (Tracking value source)

```ts
import { Option } from "effect"

console.log(Option.orElseResult(Option.some("primary"), () => Option.some("fallback")))
// Output: { _id: 'Option', _tag: 'Some', value: { _tag: 'Failure', value: 'primary' } }

console.log(Option.orElseResult(Option.none(), () => Option.some("fallback")))
// Output: { _id: 'Option', _tag: 'Some', value: { _tag: 'Success', value: 'fallback' } }
```

**See**

- `orElse` for the simpler variant without source tracking

**Signature**

```ts
declare const orElseResult: {
  <B>(that: LazyArg<Option<B>>): <A>(self: Option<A>) => Option<Result<B, A>>
  <A, B>(self: Option<A>, that: LazyArg<Option<B>>): Option<Result<B, A>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L734)

Since v4.0.0

## orElseSome

Returns `Some` of the fallback value if `self` is `None`; otherwise returns
`self`.

**When to use**

Use when providing a default plain value (not an `Option`) as fallback

**Details**

- `Some` → returns `self` unchanged
- `None` → calls `onNone()`, wraps result in `Some`, and returns it

**Example** (Providing a fallback value)

```ts
import { Option } from "effect"

console.log(Option.none().pipe(Option.orElseSome(() => "b")))
// Output: { _id: 'Option', _tag: 'Some', value: 'b' }

console.log(Option.some("a").pipe(Option.orElseSome(() => "b")))
// Output: { _id: 'Option', _tag: 'Some', value: 'a' }
```

**See**

- `orElse` when the fallback is itself an `Option`

**Signature**

```ts
declare const orElseSome: {
  <B>(onNone: LazyArg<B>): <A>(self: Option<A>) => Option<B | A>
  <A, B>(self: Option<A>, onNone: LazyArg<B>): Option<A | B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L695)

Since v2.0.0

# filtering

## filter

Filters an `Option` using a predicate. Returns `None` if the predicate is
not satisfied or the input is `None`.

**When to use**

Use when you need to discard an `Option`'s present value when it does not
meet a condition, while narrowing the type via a refinement predicate.

**Details**

- `None` → `None`
- `Some` where `predicate(value)` is `true` → `Some(value)`
- `Some` where `predicate(value)` is `false` → `None`
- Supports refinements for type narrowing

**Example** (Filtering with a predicate)

```ts
import { Option } from "effect"

const removeEmpty = (input: Option.Option<string>) => Option.filter(input, (value) => value !== "")

console.log(removeEmpty(Option.some("hello")))
// Output: { _id: 'Option', _tag: 'Some', value: 'hello' }

console.log(removeEmpty(Option.some("")))
// Output: { _id: 'Option', _tag: 'None' }

console.log(removeEmpty(Option.none()))
// Output: { _id: 'Option', _tag: 'None' }
```

**See**

- `filterMap` to transform and filter simultaneously
- `exists` to test without filtering

**Signature**

```ts
declare const filter: {
  <A, B extends A>(refinement: Refinement<A, B>): (self: Option<A>) => Option<B>
  <A>(predicate: Predicate<A>): <B extends A>(self: Option<B>) => Option<B>
  <A, B extends A>(self: Option<A>, refinement: Refinement<A, B>): Option<B>
  <A>(self: Option<A>, predicate: Predicate<A>): Option<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L2020)

Since v2.0.0

## filterMap

Transforms and filters an `Option` using a `Filter` callback.

**When to use**

Use to transform an `Option`'s present value and discard it when the `Filter`
fails.

**Details**

The callback returns a `Result`: `Result.succeed` keeps and transforms the
value, while `Result.fail` discards it.

**Example** (Filtering and transforming)

```ts
import { Option, Result } from "effect"

console.log(Option.filterMap(Option.some(2), (n) => (n % 2 === 0 ? Result.succeed(`Even: ${n}`) : Result.failVoid)))
// Output: { _id: 'Option', _tag: 'Some', value: 'Even: 2' }
```

**See**

- `filter` for predicate-based filtering

**Signature**

```ts
declare const filterMap: {
  <A, B, X>(f: Filter.Filter<A, B, X>): (self: Option<A>) => Option<B>
  <A, B, X>(self: Option<A>, f: Filter.Filter<A, B, X>): Option<B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L1969)

Since v2.0.0

## partitionMap

Splits an `Option` into two `Option`s using a function that returns a `Result`.

**When to use**

Use when you need to split an optional value into "left" and "right"
channels using a `Result`-returning function.

**Details**

- `None` → `[None, None]`
- `Some` where `f` returns `Err` → `[Some(error), None]`
- `Some` where `f` returns `Ok` → `[None, Some(value)]`

**Example** (Partitioning by Result)

```ts
import { Option, Result } from "effect"

const parseNumber = (s: string): Result.Result<number, string> => {
  const n = Number(s)
  return isNaN(n) ? Result.fail("Not a number") : Result.succeed(n)
}

console.log(Option.partitionMap(Option.some("42"), parseNumber))
// Output: [{ _id: 'Option', _tag: 'None' }, { _id: 'Option', _tag: 'Some', value: 42 }]

console.log(Option.partitionMap(Option.some("abc"), parseNumber))
// Output: [{ _id: 'Option', _tag: 'Some', value: 'Not a number' }, { _id: 'Option', _tag: 'None' }]

console.log(Option.partitionMap(Option.none(), parseNumber))
// Output: [{ _id: 'Option', _tag: 'None' }, { _id: 'Option', _tag: 'None' }]
```

**See**

- `filter` for simple predicate-based filtering

**Signature**

```ts
declare const partitionMap: {
  <A, B, C>(f: (a: A) => Result<C, B>): (self: Option<A>) => [left: Option<B>, right: Option<C>]
  <A, B, C>(self: Option<A>, f: (a: A) => Result<C, B>): [left: Option<B>, right: Option<C>]
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L1925)

Since v2.0.0

# generators

## OptionIterator (interface)

Iterator protocol used to yield an `Option` inside `gen`, returning the
contained value type back to the generator.

**When to use**

Use when defining or typing `[Symbol.iterator]()` for `Option` values so
`yield*` can pass the contained value type back into `Option.gen`.

**See**

- `gen` for writing generator-based `Option` code that consumes this iterator protocol

**Signature**

```ts
export interface OptionIterator<T extends Option<any>> {
  next(...args: ReadonlyArray<any>): IteratorResult<T, Option.Value<T>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L101)

Since v4.0.0

## gen

Provides generator-based syntax for `Option`, similar to `async`/`await` but for
optional values. Yielding a `None` short-circuits the generator to `None`.

**When to use**

Use when you need generator syntax for a sequence of `Option` steps that
should short-circuit on `None`.

**Details**

- Each `yield*` unwraps a `Some` value or short-circuits to `None`
- The return value is wrapped in `Some`
- No `Effect` runtime is needed

**Example** (Sequencing Option computations with generator syntax)

```ts
import { Option } from "effect"

const maybeName: Option.Option<string> = Option.some("John")
const maybeAge: Option.Option<number> = Option.some(25)

const person = Option.gen(function* () {
  const name = (yield* maybeName).toUpperCase()
  const age = yield* maybeAge
  return { name, age }
})

console.log(person)
// Output:
// { _id: 'Option', _tag: 'Some', value: { name: 'JOHN', age: 25 } }
```

**See**

- `Do` / `bind` for the do notation alternative

**Signature**

```ts
declare const gen: Gen.Gen<OptionTypeLambda>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L2525)

Since v2.0.0

# getters

## getOrElse

Extracts the value from a `Some`, or evaluates a fallback thunk on `None`.

**When to use**

Use when providing a default value for an absent `Option`

- Unwrapping with lazy evaluation of the fallback

**Details**

- `Some` → returns the inner value
- `None` → calls `onNone()` and returns its result
- `onNone` is only called when needed (lazy)

**Example** (Unwrapping with a fallback)

```ts
import { Option } from "effect"

console.log(Option.some(1).pipe(Option.getOrElse(() => 0)))
// Output: 1

console.log(Option.none().pipe(Option.getOrElse(() => 0)))
// Output: 0
```

**See**

- `getOrNull` to fall back to `null`
- `getOrUndefined` to fall back to `undefined`
- `getOrThrow` to throw on `None`

**Signature**

```ts
declare const getOrElse: {
  <B>(onNone: LazyArg<B>): <A>(self: Option<A>) => B | A
  <A, B>(self: Option<A>, onNone: LazyArg<B>): A | B
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L617)

Since v2.0.0

## getOrNull

Extracts the value from a `Some`, or returns `null` for `None`.

**When to use**

Use when you need to pass absent `Option` values to APIs that expect `null`.

**Details**

- `Some` → the inner value
- `None` → `null`

**Example** (Unwrapping to null)

```ts
import { Option } from "effect"

console.log(Option.getOrNull(Option.some(1)))
// Output: 1

console.log(Option.getOrNull(Option.none()))
// Output: null
```

**See**

- `getOrUndefined` to return `undefined` instead
- `getOrElse` for a custom fallback

**Signature**

```ts
declare const getOrNull: <A>(self: Option<A>) => A | null
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L976)

Since v2.0.0

## getOrUndefined

Extracts the value from a `Some`, or returns `undefined` for `None`.

**When to use**

Use when you need to pass absent `Option` values to APIs that expect
`undefined`.

**Details**

- `Some` → the inner value
- `None` → `undefined`

**Example** (Unwrapping to undefined)

```ts
import { Option } from "effect"

console.log(Option.getOrUndefined(Option.some(1)))
// Output: 1

console.log(Option.getOrUndefined(Option.none()))
// Output: undefined
```

**See**

- `getOrNull` to return `null` instead
- `getOrElse` for a custom fallback

**Signature**

```ts
declare const getOrUndefined: <A>(self: Option<A>) => A | undefined
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L1009)

Since v2.0.0

# guards

## isNone

Checks whether an `Option` is `None` (absent).

**When to use**

Use when you need to branch on an absent `Option` before accessing `.value`.

**Details**

- Acts as a type guard, narrowing to `None<A>`

**Example** (Checking for None)

```ts
import { Option } from "effect"

console.log(Option.isNone(Option.some(1)))
// Output: false

console.log(Option.isNone(Option.none()))
// Output: true
```

**See**

- `isSome` for the opposite check.

**Signature**

```ts
declare const isNone: <A>(self: Option<A>) => self is None<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L358)

Since v2.0.0

## isOption

Determines whether the given value is an `Option`.

**When to use**

Use to validate unknown values at runtime boundaries, such as type-narrowing
in union types.

**Details**

- Returns `true` for both `Some` and `None` instances
- Acts as a type guard, narrowing the input to `Option<unknown>`

**Example** (Checking if a value is an Option)

```ts
import { Option } from "effect"

console.log(Option.isOption(Option.some(1)))
// Output: true

console.log(Option.isOption(Option.none()))
// Output: true

console.log(Option.isOption({}))
// Output: false
```

**See**

- `isNone` to check for `None` specifically
- `isSome` to check for `Some` specifically

**Signature**

```ts
declare const isOption: (input: unknown) => input is Option<unknown>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L328)

Since v2.0.0

## isSome

Checks whether an `Option` contains a value (`Some`).

**When to use**

Use when you need to branch on a present `Option` before accessing `.value`.

**Details**

- Acts as a type guard, narrowing to `Some<A>`

**Example** (Checking for Some)

```ts
import { Option } from "effect"

console.log(Option.isSome(Option.some(1)))
// Output: true

console.log(Option.isSome(Option.none()))
// Output: false
```

**See**

- `isNone` for the opposite check.

**Signature**

```ts
declare const isSome: <A>(self: Option<A>) => self is Some<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L388)

Since v2.0.0

# instances

## makeEquivalence

Creates an `Equivalence` for `Option<A>` from an `Equivalence` for `A`.

**When to use**

Use when you need equality to treat two `None` values as equal and compare
two `Some` values with a supplied equality rule.

**Details**

- `None` vs `None` → `true`
- `Some` vs `None` (or vice versa) → `false`
- `Some(a)` vs `Some(b)` → delegates to the provided `Equivalence`

**Example** (Comparing Options)

```ts
import { Equivalence, Option } from "effect"

const eq = Option.makeEquivalence(Equivalence.strictEqual<number>())

console.log(eq(Option.some(1), Option.some(1)))
// Output: true

console.log(eq(Option.some(1), Option.some(2)))
// Output: false

console.log(eq(Option.none(), Option.none()))
// Output: true
```

**Signature**

```ts
declare const makeEquivalence: <A>(isEquivalent: Equivalence.Equivalence<A>) => Equivalence.Equivalence<Option<A>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L2065)

Since v4.0.0

# lifting

## lift2

Lifts a binary function to operate on two `Option` values.

**When to use**

Use when you need to reuse an existing binary function with two `Option`
values.

**Details**

- Both `Some` → applies `f` and wraps in `Some`
- Either `None` → `None`

**Example** (Lifting addition)

```ts
import { Option } from "effect"

const addOptions = Option.lift2((a: number, b: number) => a + b)

console.log(addOptions(Option.some(2), Option.some(3)))
// Output: { _id: 'Option', _tag: 'Some', value: 5 }

console.log(addOptions(Option.some(2), Option.none()))
// Output: { _id: 'Option', _tag: 'None' }
```

**See**

- `zipWith` for a non-lifted variant

**Signature**

```ts
declare const lift2: <A, B, C>(
  f: (a: A, b: B) => C
) => { (that: Option<B>): (self: Option<A>) => Option<C>; (self: Option<A>, that: Option<B>): Option<C> }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L2138)

Since v2.0.0

## liftPredicate

Lifts a `Predicate` or `Refinement` into the `Option` context: returns
`Some(value)` when the predicate holds, `None` otherwise.

**When to use**

Use to convert a boolean check into an `Option`-returning function

- Validating input and wrapping it in `Option`

**Details**

- `predicate(value)` is `true` → `Some(value)`
- `predicate(value)` is `false` → `None`
- Supports refinements for type narrowing

**Example** (Validating positive numbers)

```ts
import { Option } from "effect"

const parsePositive = Option.liftPredicate((n: number) => n > 0)

console.log(parsePositive(1))
// Output: { _id: 'Option', _tag: 'Some', value: 1 }

console.log(parsePositive(-1))
// Output: { _id: 'Option', _tag: 'None' }
```

**See**

- `filter` to apply a predicate to an existing `Option`
- `toRefinement` for the inverse direction

**Signature**

```ts
declare const liftPredicate: {
  <A, B extends A>(refinement: Refinement<A, B>): (a: A) => Option<B>
  <B extends A, A = B>(predicate: Predicate<A>): (b: B) => Option<B>
  <A, B extends A>(self: A, refinement: Refinement<A, B>): Option<B>
  <B extends A, A = B>(self: B, predicate: Predicate<A>): Option<B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L2178)

Since v2.0.0

# mapping

## as

Replaces the value inside a `Some` with a constant, leaving `None` unchanged.

**When to use**

Use when you need to replace a present `Option` value while preserving
whether it was `Some` or `None`.

**Example** (Replacing a value)

```ts
import { Option } from "effect"

console.log(Option.as(Option.some(42), "new value"))
// Output: { _id: 'Option', _tag: 'Some', value: 'new value' }

console.log(Option.as(Option.none(), "new value"))
// Output: { _id: 'Option', _tag: 'None' }
```

**See**

- `asVoid` to replace with `undefined`
- `map` for a general transformation

**Signature**

```ts
declare const as: { <B>(b: B): <X>(self: Option<X>) => Option<B>; <X, B>(self: Option<X>, b: B): Option<B> }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L1193)

Since v2.0.0

## asVoid

Replaces the value inside a `Some` with `void` (`undefined`), leaving `None`
unchanged.

**When to use**

Use when you need to discard a present `Option` value while preserving
whether it was `Some` or `None`.

**Example** (Voiding the value)

```ts
import { Option } from "effect"

console.log(Option.asVoid(Option.some(42)))
// Output: { _id: 'Option', _tag: 'Some', value: undefined }

console.log(Option.asVoid(Option.none()))
// Output: { _id: 'Option', _tag: 'None' }
```

**See**

- `as` to replace with a specific constant

**Signature**

```ts
declare const asVoid: <_>(self: Option<_>) => Option<void>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L1224)

Since v2.0.0

## map

Transforms the value inside a `Some` using the provided function, leaving
`None` unchanged.

**When to use**

Use to apply a pure transformation to an `Option`'s present value, especially
when chaining transformations in a pipeline.

**Details**

- `Some` → applies `f` and wraps the result in a new `Some`
- `None` → returns `None` unchanged

**Example** (Mapping over an Option)

```ts
import { Option } from "effect"

console.log(Option.map(Option.some(2), (n) => n * 2))
// Output: { _id: 'Option', _tag: 'Some', value: 4 }

console.log(Option.map(Option.none(), (n: number) => n * 2))
// Output: { _id: 'Option', _tag: 'None' }
```

**See**

- `flatMap` when `f` returns an `Option`
- `as` to replace the value with a constant

**Signature**

```ts
declare const map: {
  <A, B>(f: (a: A) => B): (self: Option<A>) => Option<B>
  <A, B>(self: Option<A>, f: (a: A) => B): Option<B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L1159)

Since v2.0.0

# models

## None (interface)

Represents the absence of a value within an `Option`.

**When to use**

Use as a type guard target when narrowing via `isNone`

**Details**

- `_tag` is always `"None"`
- Implements `Pipeable`, `Inspectable`, and structural equality

**See**

- `isNone` to check if an `Option` is `None`
- `none` to construct a `None`

**Signature**

```ts
export interface None<out A> extends Pipeable, Inspectable {
  readonly _tag: "None"
  readonly _op: "None"
  readonly valueOrUndefined: undefined
  readonly [TypeId]: {
    readonly _A: Covariant<A>
  }
  [Symbol.iterator](): OptionIterator<Option<A>>
  [Unify.typeSymbol]?: unknown
  [Unify.unifySymbol]?: OptionUnify<this>
  [Unify.ignoreSymbol]?: OptionUnifyIgnore
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L74)

Since v2.0.0

## Option (type alias)

The `Option` data type represents optional values. An `Option<A>` is either
`Some<A>`, containing a value of type `A`, or `None`, representing absence.

**When to use**

Use to represent initial values that may not yet exist

- Returning from partial functions (not defined for all inputs)
- Managing optional fields in data structures

**See**

- `some` for creating a `Some`
- `none` for creating a `None`
- `match` for pattern matching

**Signature**

```ts
type Option<A> = None<A> | Some<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L54)

Since v2.0.0

## OptionUnify (interface)

Type-level unification support for `Option` values.

**When to use**

Use when extending Effect's type-level unification support for `Option`.

**Details**

This is used by Effect's `Unify` machinery to preserve the contained value
type when generic code returns or combines `Option` values. Users normally
do not need to reference this interface directly.

**Signature**

```ts
export interface OptionUnify<A extends { [Unify.typeSymbol]?: any }> {
  Option?: () => A[Unify.typeSymbol] extends Option<infer A0> | infer _ ? Option<A0> : never
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L157)

Since v2.0.0

## OptionUnifyIgnore (interface)

Marker interface used by Effect's `Unify` machinery for `Option` values.

**When to use**

Use when marking generic code so `Option` unification should be ignored.

**Details**

This supports type-level unification behavior for `Option`. Users normally
do not need to reference this interface directly.

**Signature**

```ts
export interface OptionUnifyIgnore {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L211)

Since v2.0.0

## Some (interface)

Represents the presence of a value within an `Option`.

**When to use**

Use as a type guard target when narrowing via `isSome`

- Access the inner value via `.value`

**Details**

- `_tag` is always `"Some"`
- `.value` holds the contained value of type `A`
- Implements `Pipeable`, `Inspectable`, and structural equality

**See**

- `isSome` to check if an `Option` is `Some`
- `some` to construct a `Some`

**Signature**

```ts
export interface Some<out A> extends Pipeable, Inspectable {
  readonly _tag: "Some"
  readonly _op: "Some"
  readonly value: A
  readonly valueOrUndefined: A
  readonly [TypeId]: {
    readonly _A: Covariant<A>
  }
  [Symbol.iterator](): OptionIterator<Option<A>>
  [Unify.typeSymbol]?: unknown
  [Unify.unifySymbol]?: OptionUnify<this>
  [Unify.ignoreSymbol]?: OptionUnifyIgnore
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L127)

Since v2.0.0

# pattern matching

## match

Pattern-matches on an `Option`, handling both `None` and `Some` cases.

**When to use**

Use when you need to handle both `Some` and `None` in one expression and
transform an `Option` into a plain value.

**Details**

- If `None`, calls `onNone` and returns its result
- If `Some`, calls `onSome` with the value and returns its result
- Supports the `dual` API (data-last and data-first)

**Example** (Matching on an Option)

```ts
import { Option } from "effect"

const message = Option.match(Option.some(1), {
  onNone: () => "Option is empty",
  onSome: (value) => `Option has a value: ${value}`
})

console.log(message)
// Output: "Option has a value: 1"
```

**See**

- `getOrElse` for unwrapping with a default

**Signature**

```ts
declare const match: {
  <B, A, C = B>(options: { readonly onNone: LazyArg<B>; readonly onSome: (a: A) => C }): (self: Option<A>) => B | C
  <A, B, C = B>(self: Option<A>, options: { readonly onNone: LazyArg<B>; readonly onSome: (a: A) => C }): B | C
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L423)

Since v2.0.0

# reducing

## reduceCompact

Reduces an iterable of `Option`s to a single value, skipping `None` entries.

**When to use**

Use when you need to aggregate values from a collection where some may be
absent.

**Details**

- Iterates through the collection, applying `f` only to `Some` values
- `None` values are skipped entirely
- Returns the accumulated result

**Example** (Summing present values)

```ts
import { Option, pipe } from "effect"

const items = [Option.some(1), Option.none(), Option.some(2), Option.none()]

console.log(
  pipe(
    items,
    Option.reduceCompact(0, (b, a) => b + a)
  )
)
// Output: 3
```

**Signature**

```ts
declare const reduceCompact: {
  <B, A>(b: B, f: (b: B, a: A) => B): (self: Iterable<Option<A>>) => B
  <A, B>(self: Iterable<Option<A>>, b: B, f: (b: B, a: A) => B): B
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L1838)

Since v2.0.0

# sequencing

## andThen

Chains a second computation onto an `Option`. The second value can be a
plain value, an `Option`, or a function returning either.

**When to use**

Use when you need to chain an `Option` with a next step that may be another
`Option`, a plain value, or a function.

**Details**

- If `self` is `None`, returns `None` immediately
- If `f` is a function, calls it with the `Some` value
- If `f` returns an `Option`, returns it as-is; if a plain value, wraps in `Some`
- If `f` is not a function, uses it directly (same wrapping rules)

**Example** (Chaining with andThen)

```ts
import { Option } from "effect"

// Chain with a function returning Option
console.log(Option.andThen(Option.some(5), (x) => Option.some(x * 2)))
// Output: { _id: 'Option', _tag: 'Some', value: 10 }

// Chain with a static value
console.log(Option.andThen(Option.some(5), "hello"))
// Output: { _id: 'Option', _tag: 'Some', value: "hello" }

// Chain with None - skips
console.log(Option.andThen(Option.none(), (x) => Option.some(x * 2)))
// Output: { _id: 'Option', _tag: 'None' }
```

**See**

- `flatMap` for the standard monadic bind
- `map` when you always return a plain value

**Signature**

```ts
declare const andThen: {
  <A, B>(f: (a: A) => Option<B>): (self: Option<A>) => Option<B>
  <B>(f: Option<B>): <A>(self: Option<A>) => Option<B>
  <A, B>(f: (a: A) => B): (self: Option<A>) => Option<B>
  <B>(f: NotFunction<B>): <A>(self: Option<A>) => Option<B>
  <A, B>(self: Option<A>, f: (a: A) => Option<B>): Option<B>
  <A, B>(self: Option<A>, f: Option<B>): Option<B>
  <A, B>(self: Option<A>, f: (a: A) => B): Option<B>
  <A, B>(self: Option<A>, f: NotFunction<B>): Option<B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L1345)

Since v2.0.0

## composeK

Composes two `Option`-returning functions into a single function that chains
them together.

**When to use**

Use when you need to compose two functions that each return an `Option`, so
`None` short-circuits without calling the next function.

**Details**

- Calls `afb(a)`, then if `Some`, calls `bfc` with its value
- Short-circuits to `None` if either function returns `None`

**Example** (Composing parsers)

```ts
import { Option } from "effect"

const parse = (s: string): Option.Option<number> => (isNaN(Number(s)) ? Option.none() : Option.some(Number(s)))

const double = (n: number): Option.Option<number> => (n > 0 ? Option.some(n * 2) : Option.none())

const parseAndDouble = Option.composeK(parse, double)

console.log(parseAndDouble("42"))
// Output: { _id: 'Option', _tag: 'Some', value: 84 }

console.log(parseAndDouble("not a number"))
// Output: { _id: 'Option', _tag: 'None' }
```

**See**

- `flatMap` for single-step chaining

**Signature**

```ts
declare const composeK: {
  <B, C>(bfc: (b: B) => Option<C>): <A>(afb: (a: A) => Option<B>) => (a: A) => Option<C>
  <A, B, C>(afb: (a: A) => Option<B>, bfc: (b: B) => Option<C>): (a: A) => Option<C>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L1556)

Since v2.0.0

## flatMap

Applies a function that returns an `Option` to the value of a `Some`,
flattening the result. Returns `None` if the input is `None`.

**When to use**

Use when you need to chain dependent `Option` computations where each step
may return `None`.

**Details**

- `Some` → applies `f` to the value and returns its `Option` result
- `None` → returns `None` without calling `f`
- Equivalent to `map` followed by `flatten`

**Example** (Chaining optional lookups)

```ts
import { Option } from "effect"

interface User {
  readonly name: string
  readonly address: Option.Option<{ readonly street: Option.Option<string> }>
}

const user: User = {
  name: "John",
  address: Option.some({ street: Option.some("123 Main St") })
}

const street = user.address.pipe(Option.flatMap((addr) => addr.street))

console.log(street)
// Output: { _id: 'Option', _tag: 'Some', value: '123 Main St' }
```

**See**

- `map` when `f` returns a plain value
- `andThen` for a more flexible variant
- `flatten` to unwrap a nested `Option<Option<A>>`

**Signature**

```ts
declare const flatMap: {
  <A, B>(f: (a: A) => Option<B>): (self: Option<A>) => Option<B>
  <A, B>(self: Option<A>, f: (a: A) => Option<B>): Option<B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L1297)

Since v2.0.0

## flatMapNullishOr

Combines `flatMap` with `fromNullishOr`: applies a function that
may return `null`/`undefined` to the value of a `Some`.

**When to use**

Use when you need to chain optional computations that use `null` or
`undefined` instead of `Option`, such as nested property access.

**Details**

- `None` → `None`
- `Some` → applies `f`, then wraps via `fromNullishOr`

**Example** (Navigating optional properties)

```ts
import { Option } from "effect"

interface Employee {
  company?: { address?: { street?: { name?: string } } }
}

const emp: Employee = {
  company: { address: { street: { name: "high street" } } }
}

console.log(Option.some(emp).pipe(Option.flatMapNullishOr((e) => e.company?.address?.street?.name)))
// Output: { _id: 'Option', _tag: 'Some', value: 'high street' }
```

**See**

- `flatMap` when the function already returns `Option`
- `fromNullishOr` for single-value conversion

**Signature**

```ts
declare const flatMapNullishOr: {
  <A, B>(f: (a: A) => B): (self: Option<A>) => Option<NonNullable<B>>
  <A, B>(self: Option<A>, f: (a: A) => B): Option<NonNullable<B>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L1404)

Since v4.0.0

## flatten

Flattens a nested `Option<Option<A>>` into `Option<A>`.

**When to use**

Use when you need to remove one layer of nested `Option`.

**Details**

- `Some(Some(value))` → `Some(value)`
- `Some(None)` → `None`
- `None` → `None`

**Example** (Flattening nested Options)

```ts
import { Option } from "effect"

console.log(Option.flatten(Option.some(Option.some("value"))))
// Output: { _id: 'Option', _tag: 'Some', value: 'value' }

console.log(Option.flatten(Option.some(Option.none())))
// Output: { _id: 'Option', _tag: 'None' }
```

**See**

- `flatMap` which is `map` + `flatten`

**Signature**

```ts
declare const flatten: <A>(self: Option<Option<A>>) => Option<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L1443)

Since v2.0.0

## tap

Runs a side-effecting `Option`-returning function on the value of a `Some`,
returning the original `Option` if the function returns `Some`, or `None`
if it returns `None`.

**When to use**

Use to validate an `Option`'s present value without transforming it, such as
adding a side-condition check in a pipeline.

**Details**

- `None` → `None`
- `Some` → calls `f(value)`; if result is `Some`, returns original `self`; if `None`, returns `None`

**Example** (Validating without transforming)

```ts
import { Option } from "effect"

const getInteger = (n: number) => (Number.isInteger(n) ? Option.some(n) : Option.none())

console.log(Option.tap(Option.some(1), getInteger))
// Output: { _id: 'Option', _tag: 'Some', value: 1 }

console.log(Option.tap(Option.some(1.14), getInteger))
// Output: { _id: 'Option', _tag: 'None' }
```

**See**

- `flatMap` when you want to transform the value
- `filter` for predicate-based filtering

**Signature**

```ts
declare const tap: {
  <A, X>(f: (a: A) => Option<X>): (self: Option<A>) => Option<A>
  <A, X>(self: Option<A>, f: (a: A) => Option<X>): Option<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L1597)

Since v2.0.0

# sorting

## makeOrder

Creates an `Order` for `Option<A>` from an `Order` for `A`.

**When to use**

Use when you need to sort `Some` and `None` values, with `None` ordered
before present values and present values compared by a supplied ordering
rule.

**Details**

- `None` is considered less than any `Some`
- Two `Some` values are compared using the provided `Order`
- Two `None` values are equal (returns `0`)

**Example** (Ordering Options)

```ts
import { Number as N, Option } from "effect"

const ord = Option.makeOrder(N.Order)

console.log(ord(Option.none(), Option.some(1)))
// Output: -1

console.log(ord(Option.some(1), Option.none()))
// Output: 1

console.log(ord(Option.some(1), Option.some(2)))
// Output: -1
```

**Signature**

```ts
declare const makeOrder: <A>(O: Order<A>) => Order<Option<A>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L2103)

Since v4.0.0

# type lambdas

## OptionTypeLambda (interface)

Type lambda interface for higher-kinded type encodings with `Option`.

**When to use**

Use when defining higher-kinded abstractions that must accept optional-value
types as one of their type-lambda inputs.

**Signature**

```ts
export interface OptionTypeLambda extends TypeLambda {
  readonly type: Option<this["Target"]>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L224)

Since v2.0.0

# utils

## Option (namespace)

Namespace containing utility types for `Option`.

**When to use**

Use to access type-level helpers associated with `Option`.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L170)

Since v2.0.0

### Value (type alias)

Extracts the type of the value contained in an `Option`.

**When to use**

Use to infer the inner value type from an existing `Option` type.

**Example** (Extracting the value type)

```ts
import type { Option } from "effect"

declare const myOption: Option.Option<string>

//      ┌─── string
//      ▼
type MyType = Option.Option.Value<typeof myOption>
```

**Signature**

```ts
type Value<T> = [T] extends [Option<infer _A>] ? _A : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L193)

Since v2.0.0

# zipping

## zipLeft

Sequences two `Option`s, keeping the value from the first if both are `Some`.

**When to use**

Use when you need two `Option` values to both be `Some`, then keep only the
first value.

**Details**

- Both `Some` → returns `self`
- Either `None` → returns `None`

**Example** (Keeping the first value)

```ts
import { Option } from "effect"

console.log(Option.zipLeft(Option.some("hello"), Option.some(1)))
// Output: { _id: 'Option', _tag: 'Some', value: 'hello' }

console.log(Option.zipLeft(Option.some("hello"), Option.none()))
// Output: { _id: 'Option', _tag: 'None' }
```

**See**

- `zipRight` to keep the second value instead
- `zipWith` to combine both values

**Signature**

```ts
declare const zipLeft: {
  <_>(that: Option<_>): <A>(self: Option<A>) => Option<A>
  <A, X>(self: Option<A>, that: Option<X>): Option<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L1512)

Since v2.0.0

## zipRight

Sequences two `Option`s, keeping the value from the second if both are `Some`.

**When to use**

Use when you need two `Option` values to both be `Some`, then keep only the
second value.

**Details**

- Both `Some` → returns `that`
- Either `None` → returns `None`

**Example** (Keeping the second value)

```ts
import { Option } from "effect"

console.log(Option.zipRight(Option.some(1), Option.some("hello")))
// Output: { _id: 'Option', _tag: 'Some', value: 'hello' }

console.log(Option.zipRight(Option.none(), Option.some("hello")))
// Output: { _id: 'Option', _tag: 'None' }
```

**See**

- `zipLeft` to keep the first value instead
- `zipWith` to combine both values

**Signature**

```ts
declare const zipRight: {
  <B>(that: Option<B>): <_>(self: Option<_>) => Option<B>
  <X, B>(self: Option<X>, that: Option<B>): Option<B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L1476)

Since v2.0.0

## zipWith

Combines two `Option`s using a provided function.

**When to use**

Use when you need to combine two present `Option` values into a computed
result.

**Details**

- Both `Some` → applies `f(a, b)` and wraps in `Some`
- Either `None` → `None`

**Example** (Combining with a function)

```ts
import { Option } from "effect"

const person = Option.zipWith(Option.some("John"), Option.some(25), (name, age) => ({ name: name.toUpperCase(), age }))

console.log(person)
// Output:
// { _id: 'Option', _tag: 'Some', value: { name: 'JOHN', age: 25 } }
```

**See**

- `product` to combine into a tuple instead
- `lift2` to lift a binary function

**Signature**

```ts
declare const zipWith: {
  <B, A, C>(that: Option<B>, f: (a: A, b: B) => C): (self: Option<A>) => Option<C>
  <A, B, C>(self: Option<A>, that: Option<B>, f: (a: A, b: B) => C): Option<C>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Option.ts#L1801)

Since v2.0.0
