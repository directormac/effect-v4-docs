---
title: Tuple.ts
nav_order: 127
parent: "effect"
---

## Tuple.ts overview

Works with fixed-length arrays, also called tuples.

The runtime helpers in this module create new tuples instead of mutating
their inputs, and the types preserve element positions where possible. The
helpers cover tuple construction, indexed access, selecting or removing
positions, appending values, transforming elements, renaming indices, mapping
typed positions, and deriving comparison or combination helpers for tuple
shapes.

Since v2.0.0

---

## Exports Grouped by Category

- [Index utilities](#index-utilities)
  - [renameIndices](#renameindices)
- [combining](#combining)
  - [appendElement](#appendelement)
  - [appendElements](#appendelements)
  - [makeCombiner](#makecombiner)
- [constructors](#constructors)
  - [make](#make)
- [filtering](#filtering)
  - [omit](#omit)
  - [pick](#pick)
- [folding](#folding)
  - [makeReducer](#makereducer)
- [getters](#getters)
  - [get](#get)
- [guards](#guards)
  - [isTupleOf](#istupleof)
  - [isTupleOfAtLeast](#istupleofatleast)
- [instances](#instances)
  - [makeEquivalence](#makeequivalence)
- [mapping](#mapping)
  - [evolve](#evolve)
  - [map](#map)
  - [mapOmit](#mapomit)
  - [mapPick](#mappick)
- [ordering](#ordering)
  - [makeOrder](#makeorder)

---

# Index utilities

## renameIndices

Renames tuple indices by providing an array of stringified source
indices. Each position in the array specifies which index to read from
(e.g., `["2", "1", "0"]` reverses a 3-element tuple).

**When to use**

Use to reorder tuple elements while preserving index-specific types.

**Details**

The mapping returns a tuple in the requested index order.

**Gotchas**

The mapping uses stringified source indices, not arbitrary names.

**Example** (Swapping elements)

```ts
import { pipe, Tuple } from "effect"

const result = pipe(Tuple.make("a", "b", "c"), Tuple.renameIndices(["2", "1", "0"]))
console.log(result) // ["c", "b", "a"]
```

**See**

- `evolve` – transform element values instead of positions

**Signature**

```ts
declare const renameIndices: {
  <const T extends ReadonlyArray<unknown>, const M extends { readonly [I in keyof T]?: `${keyof T & string}` }>(
    mapping: M
  ): (self: T) => { [I in keyof T]: I extends keyof M ? (M[I] extends keyof T ? T[M[I]] : T[I]) : T[I] }
  <const T extends ReadonlyArray<unknown>, const M extends { readonly [I in keyof T]?: `${keyof T & string}` }>(
    self: T,
    mapping: M
  ): { [I in keyof T]: I extends keyof M ? (M[I] extends keyof T ? T[M[I]] : T[I]) : T[I] }
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tuple.ts#L334)

Since v4.0.0

# combining

## appendElement

Appends a single element to the end of a tuple.

**When to use**

Use when you need the appended value to remain part of the tuple's type-level
shape and preserve literal element positions.

**Details**

The result type is `[...T, E]`, preserving all existing element types.

**Example** (Appending an element)

```ts
import { pipe, Tuple } from "effect"

const result = pipe(Tuple.make(1, 2), Tuple.appendElement("end"))
console.log(result) // [1, 2, "end"]
```

**See**

- `appendElements` – append multiple elements (another tuple)

**Signature**

```ts
declare const appendElement: {
  <const E>(element: E): <const T extends ReadonlyArray<unknown>>(self: T) => [...T, E]
  <const T extends ReadonlyArray<unknown>, const E>(self: T, element: E): [...T, E]
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tuple.ts#L210)

Since v2.0.0

## appendElements

Concatenates two tuples into a single tuple.

**When to use**

Use to append all elements from one tuple to another tuple.

**Details**

The result type is `[...T1, ...T2]`, preserving all element types from both
tuples. Neither input tuple is mutated; a fresh tuple is returned.

**Example** (Concatenating tuples)

```ts
import { pipe, Tuple } from "effect"

const result = pipe(Tuple.make(1, 2), Tuple.appendElements(["a", "b"] as const))
console.log(result) // [1, 2, "a", "b"]
```

**See**

- `appendElement` – append a single element

**Signature**

```ts
declare const appendElements: {
  <const T2 extends ReadonlyArray<unknown>>(
    that: T2
  ): <const T1 extends ReadonlyArray<unknown>>(self: T1) => [...T1, ...T2]
  <const T1 extends ReadonlyArray<unknown>, const T2 extends ReadonlyArray<unknown>>(self: T1, that: T2): [...T1, ...T2]
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tuple.ts#L240)

Since v4.0.0

## makeCombiner

Creates a `Combiner` for a tuple shape by providing a `Combiner` for each
position. When two tuples are combined, each element is merged using its
corresponding combiner.

**When to use**

Use when you need to merge two same-shape tuples by combining each position
independently, such as summing counters or concatenating strings.

**Example** (Combining tuple elements)

```ts
import { Number, String, Tuple } from "effect"

const C = Tuple.makeCombiner<readonly [number, string]>([Number.ReducerSum, String.ReducerConcat])

const result = C.combine([1, "hello"], [2, " world"])
console.log(result) // [3, "hello world"]
```

**See**

- `makeReducer` – like `makeCombiner` but with an initial value

**Signature**

```ts
declare const makeCombiner: <A extends ReadonlyArray<unknown>>(combiners: {
  readonly [K in keyof A]: Combiner.Combiner<A[K]>
}) => Combiner.Combiner<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tuple.ts#L683)

Since v4.0.0

# constructors

## make

Creates a tuple from the provided arguments.

**When to use**

Use when you need a properly typed tuple without writing `[a, b, c] as const`
or another manual cast.

**Details**

The returned value has the exact tuple type, with each element's literal type
preserved.

**Example** (Creating a tuple)

```ts
import { Tuple } from "effect"

const point = Tuple.make(10, 20, "red")
console.log(point) // [10, 20, "red"]
```

**See**

- `get` – access a single element by index
- `appendElement` – append an element to a tuple

**Signature**

```ts
declare const make: <Elements extends ReadonlyArray<unknown>>(...elements: Elements) => Elements
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tuple.ts#L47)

Since v2.0.0

# filtering

## omit

Creates a new tuple with the elements at the specified indices removed.

**When to use**

Use to drop elements from a tuple by position.

**Details**

Elements not at the specified indices are kept in their original order.

**Example** (Removing elements by index)

```ts
import { Tuple } from "effect"

const result = Tuple.omit(["a", "b", "c", "d"], [1, 3])
console.log(result) // ["a", "c"]
```

**See**

- `pick` – the inverse (keep only specified indices)

**Signature**

```ts
declare const omit: {
  <const T extends ReadonlyArray<unknown>, const I extends ReadonlyArray<Indices<T>>>(
    indices: I
  ): (self: T) => OmitTuple<T, I[number]>
  <const T extends ReadonlyArray<unknown>, const I extends ReadonlyArray<Indices<T>>>(
    self: T,
    indices: I
  ): OmitTuple<T, I[number]>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tuple.ts#L166)

Since v4.0.0

## pick

Creates a new tuple containing only the elements at the specified indices.

**When to use**

Use to select a subset of elements from a tuple by position.

**Details**

The result order matches the order of the provided indices.

**Example** (Selecting elements by index)

```ts
import { Tuple } from "effect"

const result = Tuple.pick(["a", "b", "c", "d"], [0, 2, 3])
console.log(result) // ["a", "c", "d"]
```

**See**

- `omit` – the inverse (exclude indices instead)
- `get` – extract a single element

**Signature**

```ts
declare const pick: {
  <const T extends ReadonlyArray<unknown>, const I extends ReadonlyArray<Indices<T>>>(
    indices: I
  ): (self: T) => PickTuple<T, I[number]>
  <const T extends ReadonlyArray<unknown>, const I extends ReadonlyArray<Indices<T>>>(
    self: T,
    indices: I
  ): PickTuple<T, I[number]>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tuple.ts#L122)

Since v4.0.0

# folding

## makeReducer

Creates a `Reducer` for a tuple shape by providing a `Reducer` for each
position. The initial value is derived from each position's
`Reducer.initialValue`. When reducing a collection of tuples, each element
is combined independently.

**When to use**

Use when you need to fold same-shape tuples by accumulating each position
independently into one summary tuple.

**Example** (Reducing a collection of tuples)

```ts
import { Number, String, Tuple } from "effect"

const R = Tuple.makeReducer<readonly [number, string]>([Number.ReducerSum, String.ReducerConcat])

const result = R.combineAll([
  [1, "a"],
  [2, "b"],
  [3, "c"]
])
console.log(result) // [6, "abc"]
```

**See**

- `makeCombiner` – like `makeReducer` but without an initial value

**Signature**

```ts
declare const makeReducer: <A extends ReadonlyArray<unknown>>(reducers: {
  readonly [K in keyof A]: Reducer.Reducer<A[K]>
}) => Reducer.Reducer<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tuple.ts#L728)

Since v4.0.0

# getters

## get

Retrieves the element at the specified index from a tuple.

**When to use**

Use when a single tuple element should be extracted in a pipeline.

**Details**

The index is constrained to valid tuple positions at the type level.

**Example** (Extracting an element by index)

```ts
import { pipe, Tuple } from "effect"

const last = pipe(Tuple.make(1, true, "hello"), Tuple.get(2))
console.log(last) // "hello"
```

**See**

- `make` – create a tuple
- `pick` – extract multiple elements into a new tuple

**Signature**

```ts
declare const get: {
  <const T extends ReadonlyArray<unknown>, I extends Indices<T> & keyof T>(index: I): (self: T) => T[I]
  <const T extends ReadonlyArray<unknown>, I extends Indices<T> & keyof T>(self: T, index: I): T[I]
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tuple.ts#L76)

Since v4.0.0

# guards

## isTupleOf

Checks whether an array has exactly `N` elements, narrowing the type to a
fixed-length tuple.

**When to use**

Use to guard that an array has exactly the tuple length expected at
runtime.

**Details**

This is a re-export of `Predicate.isTupleOf`. It narrows the type to
`TupleOf<N, T>` in the truthy branch.

**Gotchas**

This only checks `.length`; it does not validate element types.

**Example** (Checking exact length)

```ts
import { Tuple } from "effect"

const arr: Array<number> = [1, 2, 3]
if (Tuple.isTupleOf(arr, 3)) {
  console.log(arr)
  // ^? [number, number, number]
}
```

**See**

- `isTupleOfAtLeast` – check for a minimum length

**Signature**

```ts
declare const isTupleOf: {
  <N extends number>(n: N): <T>(self: ReadonlyArray<T>) => self is TupleOf<N, T>
  <T, N extends number>(self: ReadonlyArray<T>, n: N): self is TupleOf<N, T>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tuple.ts#L617)

Since v3.3.0

## isTupleOfAtLeast

Checks whether an array has at least `N` elements, narrowing the type to a
tuple with a minimum length.

**When to use**

Use to guard that an array has at least the tuple length expected at
runtime.

**Details**

This is a re-export of `Predicate.isTupleOfAtLeast`. It narrows the type to
`TupleOfAtLeast<N, T>` in the truthy branch.

**Gotchas**

This only checks `.length`; it does not validate element types.

**Example** (Checking minimum length)

```ts
import { Tuple } from "effect"

const arr: Array<number> = [1, 2, 3, 4]
if (Tuple.isTupleOfAtLeast(arr, 3)) {
  console.log(arr)
  // ^? [number, number, number, ...number[]]
}
```

**See**

- `isTupleOf` – check for an exact length

**Signature**

```ts
declare const isTupleOfAtLeast: {
  <N extends number>(n: N): <T>(self: ReadonlyArray<T>) => self is TupleOfAtLeast<N, T>
  <T, N extends number>(self: ReadonlyArray<T>, n: N): self is TupleOfAtLeast<N, T>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tuple.ts#L652)

Since v3.3.0

# instances

## makeEquivalence

Creates an `Equivalence` for tuples by comparing corresponding elements
using the provided per-position `Equivalence`s. Two tuples are equivalent
when all their corresponding elements are equivalent.

**When to use**

Use when you need an `Equivalence` to compare tuples element-by-element.

**Details**

This is an alias of `Equivalence.Tuple`.

**Example** (Comparing tuples for equivalence)

```ts
import { Equivalence, Tuple } from "effect"

const eq = Tuple.makeEquivalence([Equivalence.strictEqual<string>(), Equivalence.strictEqual<number>()])

console.log(eq(["Alice", 30], ["Alice", 30])) // true
console.log(eq(["Alice", 30], ["Bob", 30])) // false
```

**See**

- `makeOrder` – create an `Order` for tuples

**Signature**

```ts
declare const makeEquivalence: <const Elements extends ReadonlyArray<Equivalence.Equivalence<any>>>(
  elements: Elements
) => Equivalence.Equivalence<{
  readonly [I in keyof Elements]: [Elements[I]] extends [Equivalence.Equivalence<infer A>] ? A : never
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tuple.ts#L549)

Since v4.0.0

# mapping

## evolve

Transforms elements of a tuple by providing an array of transform functions.
Each function applies to the element at the same position. Positions beyond
the array's length are copied unchanged.

**When to use**

Use when you want to update the first N elements while keeping the rest.

**Details**

Each transform function receives the current value and can return a different
type.

**Example** (Transforming selected elements)

```ts
import { pipe, Tuple } from "effect"

const result = pipe(Tuple.make("hello", 42, true), Tuple.evolve([(s) => s.toUpperCase(), (n) => n * 2]))
console.log(result) // ["HELLO", 84, true]
```

**See**

- `map` – apply the same transformation to all elements
- `renameIndices` – swap element positions

**Signature**

```ts
declare const evolve: {
  <const T extends ReadonlyArray<unknown>, const E extends Evolver<T>>(evolver: E): (self: T) => Evolved<T, E>
  <const T extends ReadonlyArray<unknown>, const E extends Evolver<T>>(self: T, evolver: E): Evolved<T, E>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tuple.ts#L291)

Since v4.0.0

## map

Applies a `Struct.Lambda` transformation to every element in a tuple.

**When to use**

Use when you want to apply the same transformation to every tuple element.

**Details**

The lambda lets the compiler track the output type for each element.

**Gotchas**

The lambda must be created with `Struct.lambda`; a plain function will not
type-check.

**Example** (Wrapping every element in an array)

```ts
import { pipe, Struct, Tuple } from "effect"

interface AsArray extends Struct.Lambda {
  <A>(self: A): Array<A>
  readonly "~lambda.out": Array<this["~lambda.in"]>
}

const asArray = Struct.lambda<AsArray>((a) => [a])
const result = pipe(Tuple.make(1, "hello", true), Tuple.map(asArray))
console.log(result) // [[1], ["hello"], [true]]
```

**See**

- `mapPick` – apply a lambda only to selected indices
- `mapOmit` – apply a lambda to all indices except selected ones
- `evolve` – apply different functions to different indices

**Signature**

```ts
declare const map: {
  <L extends Lambda>(lambda: L): <const T extends ReadonlyArray<unknown>>(self: T) => { [K in keyof T]: Apply<L, T[K]> }
  <const T extends ReadonlyArray<unknown>, L extends Lambda>(self: T, lambda: L): { [K in keyof T]: Apply<L, T[K]> }
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tuple.ts#L389)

Since v3.9.0

## mapOmit

Applies a `Struct.Lambda` transformation to all elements except those at the
specified indices; the excluded elements are copied unchanged.

**When to use**

Use when most elements should be transformed but a few should be
preserved.

**Example** (Wrapping all elements except one in arrays)

```ts
import { pipe, Struct, Tuple } from "effect"

interface AsArray extends Struct.Lambda {
  <A>(self: A): Array<A>
  readonly "~lambda.out": Array<this["~lambda.in"]>
}

const asArray = Struct.lambda<AsArray>((a) => [a])
const result = pipe(Tuple.make(1, "hello", true), Tuple.mapOmit([1], asArray))
console.log(result) // [[1], "hello", [true]]
```

**See**

- `map` – apply a lambda to all elements
- `mapPick` – apply a lambda only to selected indices

**Signature**

```ts
declare const mapOmit: {
  <const T extends ReadonlyArray<unknown>, const I extends ReadonlyArray<Indices<T>>, L extends Lambda>(
    indices: I,
    lambda: L
  ): (self: T) => { [K in keyof T]: K extends `${I[number]}` ? T[K] : Apply<L, T[K]> }
  <const T extends ReadonlyArray<unknown>, const I extends ReadonlyArray<Indices<T>>, L extends Lambda>(
    self: T,
    indices: I,
    lambda: L
  ): { [K in keyof T]: K extends `${I[number]}` ? T[K] : Apply<L, T[K]> }
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tuple.ts#L494)

Since v4.0.0

## mapPick

Applies a `Struct.Lambda` transformation only to the elements at the
specified indices; all other elements are copied unchanged.

**When to use**

Use when you want to apply the same transformation to a subset of
positions.

**Example** (Wrapping only selected elements in arrays)

```ts
import { pipe, Struct, Tuple } from "effect"

interface AsArray extends Struct.Lambda {
  <A>(self: A): Array<A>
  readonly "~lambda.out": Array<this["~lambda.in"]>
}

const asArray = Struct.lambda<AsArray>((a) => [a])
const result = pipe(Tuple.make(1, "hello", true), Tuple.mapPick([0, 2], asArray))
console.log(result) // [[1], "hello", [true]]
```

**See**

- `map` – apply a lambda to all elements
- `mapOmit` – apply a lambda to all elements except selected ones

**Signature**

```ts
declare const mapPick: {
  <const T extends ReadonlyArray<unknown>, const I extends ReadonlyArray<Indices<T>>, L extends Lambda>(
    indices: I,
    lambda: L
  ): (self: T) => { [K in keyof T]: K extends `${I[number]}` ? Apply<L, T[K]> : T[K] }
  <const T extends ReadonlyArray<unknown>, const I extends ReadonlyArray<Indices<T>>, L extends Lambda>(
    self: T,
    indices: I,
    lambda: L
  ): { [K in keyof T]: K extends `${I[number]}` ? Apply<L, T[K]> : T[K] }
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tuple.ts#L438)

Since v4.0.0

# ordering

## makeOrder

Creates an `Order` for tuples by comparing corresponding elements using the
provided per-position `Order`s. Elements are compared left-to-right; the
first non-zero comparison determines the result.

**When to use**

Use when you need to sort fixed-position arrays lexicographically, with each
position using its own ordering rule.

**Details**

This is an alias of `Order.Tuple`.

**Example** (Ordering tuples)

```ts
import { Number, String, Tuple } from "effect"

const ord = Tuple.makeOrder([String.Order, Number.Order])

console.log(ord(["Alice", 30], ["Bob", 25])) // -1
console.log(ord(["Alice", 30], ["Alice", 30])) // 0
```

**See**

- `makeEquivalence` – create an `Equivalence` for tuples

**Signature**

```ts
declare const makeOrder: <const Elements extends ReadonlyArray<order.Order<any>>>(
  elements: Elements
) => order.Order<{ readonly [I in keyof Elements]: [Elements[I]] extends [order.Order<infer A>] ? A : never }>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tuple.ts#L580)

Since v4.0.0
