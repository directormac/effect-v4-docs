---
title: Struct.ts
nav_order: 114
parent: "effect"
---

## Struct.ts overview

Works with plain TypeScript objects, also called structs.

The runtime helpers in this module create new objects instead of mutating
their inputs. They cover common object workflows such as reading properties,
listing typed keys, picking or omitting fields, assigning and renaming keys,
transforming values, deriving comparison helpers, and creating records from a
list of keys. The module also includes type-level helpers for simplifying and
merging object shapes.

Since v2.0.0

---

## Exports Grouped by Category

- [Key utilities](#key-utilities)
  - [evolveKeys](#evolvekeys)
  - [keys](#keys)
  - [renameKeys](#renamekeys)
- [Lambda](#lambda)
  - [Apply (type alias)](#apply-type-alias)
  - [Lambda (interface)](#lambda-interface)
  - [lambda](#lambda-1)
- [combining](#combining)
  - [assign](#assign)
  - [makeCombiner](#makecombiner)
- [constructors](#constructors)
  - [Record](#record)
- [filtering](#filtering)
  - [omit](#omit)
  - [pick](#pick)
- [folding](#folding)
  - [makeReducer](#makereducer)
- [getters](#getters)
  - [get](#get)
- [instances](#instances)
  - [makeEquivalence](#makeequivalence)
- [mapping](#mapping)
  - [map](#map)
  - [mapOmit](#mapomit)
  - [mapPick](#mappick)
- [ordering](#ordering)
  - [makeOrder](#makeorder)
- [transforming](#transforming)
  - [evolve](#evolve)
  - [evolveEntries](#evolveentries)
- [utility types](#utility-types)
  - [Assign (type alias)](#assign-type-alias)
  - [Mutable (type alias)](#mutable-type-alias)
  - [Simplify (type alias)](#simplify-type-alias)

---

# Key utilities

## evolveKeys

Transforms keys of a struct selectively using per-key functions. Keys without
a corresponding function are copied unchanged.

**When to use**

Use when you need computed key names, such as uppercasing or prefixing.

**Details**

Each transform function receives the key name and must return a new
`PropertyKey`.

**Example** (Renaming keys with functions)

```ts
import { pipe, Struct } from "effect"

const result = pipe(
  { name: "Alice", age: 30 },
  Struct.evolveKeys({
    name: (k) => k.toUpperCase()
  })
)
console.log(result) // { NAME: "Alice", age: 30 }
```

**See**

- `renameKeys` – rename keys with a static mapping
- `evolve` – transform values instead of keys
- `evolveEntries` – transform both keys and values

**Signature**

```ts
declare const evolveKeys: {
  <S extends object, E extends KeyEvolver<S>>(e: E): (self: S) => KeyEvolved<S, E>
  <S extends object, E extends KeyEvolver<S>>(self: S, e: E): KeyEvolved<S, E>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Struct.ts#L373)

Since v4.0.0

## keys

Returns the string keys of a struct as a properly typed `Array<keyof S & string>`.

**When to use**

Use when you want a typed replacement for `Object.keys` that narrows the result
to the known string keys of the struct.

**Gotchas**

Symbol keys are excluded; only string keys are returned.

**Example** (Reading typed keys)

```ts
import { Struct } from "effect"

const user = { name: "Alice", age: 30, [Symbol.for("id")]: 1 }

const k: Array<"name" | "age"> = Struct.keys(user)
console.log(k) // ["name", "age"]
```

**See**

- `get` – access a single key's value
- `pick` – select a subset of keys into a new struct

**Signature**

```ts
declare const keys: <S extends object>(self: S) => Array<keyof S & string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Struct.ts#L168)

Since v3.6.0

## renameKeys

Renames keys in a struct using a static `{ oldKey: newKey }` mapping. Keys
not mentioned in the mapping are copied unchanged.

**When to use**

Use when you need simple, declarative key renaming without custom logic.

**Details**

For computed key names, use `evolveKeys` instead.

**Example** (Renaming keys)

```ts
import { pipe, Struct } from "effect"

const result = pipe(
  { firstName: "Alice", lastName: "Smith", age: 30 },
  Struct.renameKeys({ firstName: "first", lastName: "last" })
)
console.log(result) // { first: "Alice", last: "Smith", age: 30 }
```

**See**

- `evolveKeys` – rename keys using functions
- `evolveEntries` – rename keys and transform values

**Signature**

```ts
declare const renameKeys: {
  <S extends object, const M extends { readonly [K in keyof S]?: PropertyKey }>(
    mapping: M
  ): (self: S) => { [K in keyof S as K extends keyof M ? (M[K] extends PropertyKey ? M[K] : K) : K]: S[K] }
  <S extends object, const M extends { readonly [K in keyof S]?: PropertyKey }>(
    self: S,
    mapping: M
  ): { [K in keyof S as K extends keyof M ? (M[K] extends PropertyKey ? M[K] : K) : K]: S[K] }
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Struct.ts#L467)

Since v4.0.0

# Lambda

## Apply (type alias)

Applies a `Lambda` type-level function to a value type `V`, producing
the output type.

**When to use**

Use when you need to compute what type a Lambda would produce for a
given input.

**Details**

This works by intersecting the Lambda with `{ "~lambda.in": V }` and reading
`"~lambda.out"`.

**Example** (Computing the output type of a lambda)

```ts
import type { Struct } from "effect"

interface ToString extends Struct.Lambda {
  readonly "~lambda.out": string
}

// Result is `string`
type Result = Struct.Apply<ToString, number>
```

**See**

- `Lambda` – the base interface

**Signature**

```ts
type Apply<L, V> = (L & { readonly "~lambda.in": V })["~lambda.out"]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Struct.ts#L619)

Since v4.0.0

## Lambda (interface)

Interface for type-level functions used by `map`, `mapPick`, and
`mapOmit`.

**When to use**

Use when defining a typed function for `map`, `mapPick`, or
`mapOmit`.

**Details**

Extend this interface with concrete `~lambda.in` and `~lambda.out` types to
describe how a function transforms values at the type level. At runtime,
create lambda values with `lambda`.

**Example** (Defining a lambda type)

```ts
import type { Struct } from "effect"

interface ToString extends Struct.Lambda {
  readonly "~lambda.out": string
}
```

**See**

- `Apply` – apply a Lambda to a concrete type
- `lambda` – create a runtime lambda value
- `map` – use a lambda to transform all struct values

**Signature**

```ts
export interface Lambda {
  readonly "~lambda.in": unknown
  readonly "~lambda.out": unknown
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Struct.ts#L583)

Since v4.0.0

## lambda

Wraps a plain function as a `Lambda` value so it can be used with
`map`, `mapPick`, and `mapOmit`.

**When to use**

Use to create a typed lambda for struct mapping APIs that need type-level
input and output tracking.

**Details**

The type parameter `L` encodes both the input and output types at the type
level, allowing the compiler to track how struct value types change. At
runtime, the returned value is the same function; `lambda` only adjusts the
type.

**Example** (Wrapping values in arrays)

```ts
import { pipe, Struct } from "effect"

interface AsArray extends Struct.Lambda {
  <A>(self: A): Array<A>
  readonly "~lambda.out": Array<this["~lambda.in"]>
}

const asArray = Struct.lambda<AsArray>((a) => [a])
const result = pipe({ x: 1, y: "hello" }, Struct.map(asArray))
console.log(result) // { x: [1], y: ["hello"] }
```

**See**

- `Lambda` – the type-level interface
- `map` – apply a lambda to all struct values

**Signature**

```ts
declare const lambda: <L extends (a: any) => any>(f: (a: Parameters<L>[0]) => ReturnType<L>) => L
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Struct.ts#L657)

Since v4.0.0

# combining

## assign

Merges two structs into a new struct. When both structs share a key, the
value from `that` (the second struct) wins.

**When to use**

Use when you want `{ ...self, ...that }` with proper types.

**Details**

The result type is `Simplify<Assign<S, O>>`.

**Example** (Merging structs with overlapping keys)

```ts
import { pipe, Struct } from "effect"

const defaults = { theme: "light", lang: "en" }
const overrides = { theme: "dark", fontSize: 14 }
const config = pipe(defaults, Struct.assign(overrides))
console.log(config) // { theme: "dark", lang: "en", fontSize: 14 }
```

**See**

- `Assign` – the type-level equivalent
- `evolve` – transform individual values instead of replacing them

**Signature**

```ts
declare const assign: {
  <O extends object>(that: O): <S extends object>(self: S) => Assign<S, O>
  <O extends object, S extends object>(self: S, that: O): Assign<S, O>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Struct.ts#L274)

Since v4.0.0

## makeCombiner

Creates a `Combiner` for a struct shape by providing a `Combiner` for each
property. When two structs are combined, each property is merged using its
corresponding combiner.

**When to use**

Use when you need to merge two same-shape records by combining each property
independently, such as summing counters or concatenating strings.

**Details**

Pass `omitKeyWhen` to drop properties whose merged value matches a predicate,
such as omitting zero counters.

**Example** (Combining struct properties)

```ts
import { Number, String, Struct } from "effect"

const C = Struct.makeCombiner<{ readonly n: number; readonly s: string }>({
  n: Number.ReducerSum,
  s: String.ReducerConcat
})

const result = C.combine({ n: 1, s: "hello" }, { n: 2, s: " world" })
console.log(result) // { n: 3, s: "hello world" }
```

**See**

- `makeReducer` – like `makeCombiner` but with an initial value

**Signature**

```ts
declare const makeCombiner: <A>(
  combiners: { readonly [K in keyof A]: Combiner.Combiner<A[K]> },
  options?: { readonly omitKeyWhen?: ((a: A[keyof A]) => boolean) | undefined }
) => Combiner.Combiner<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Struct.ts#L878)

Since v4.0.0

# constructors

## Record

Creates a record with the given keys and value.

**When to use**

Use to build an object where each provided key receives the same value.

**Example** (Creating a record)

```ts
import { Struct } from "effect"

const record = Struct.Record(["a", "b"], "value")
console.log(record) // { a: "value", b: "value" }
```

**Signature**

```ts
declare const Record: <const Keys extends ReadonlyArray<string | symbol>, Value>(
  keys: Keys,
  value: Value
) => Record<Keys[number], Value>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Struct.ts#L970)

Since v4.0.0

# filtering

## omit

Creates a new struct with the specified keys removed.

**When to use**

Use to exclude sensitive or irrelevant fields from a struct.

**Gotchas**

Keys not present in the struct are silently ignored.

**Example** (Removing a property)

```ts
import { pipe, Struct } from "effect"

const user = { name: "Alice", age: 30, password: "secret" }
const safe = pipe(user, Struct.omit(["password"]))
console.log(safe) // { name: "Alice", age: 30 }
```

**See**

- `pick` – the inverse (keep only specified keys)

**Signature**

```ts
declare const omit: {
  <S extends object, const Keys extends ReadonlyArray<keyof S>>(
    keys: Keys
  ): (self: S) => Simplify<Omit<S, Keys[number]>>
  <S extends object, const Keys extends ReadonlyArray<keyof S>>(self: S, keys: Keys): Simplify<Omit<S, Keys[number]>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Struct.ts#L234)

Since v2.0.0

## pick

Creates a new struct containing only the specified keys.

**When to use**

Use to narrow a struct down to a subset of its properties.

**Gotchas**

Keys not present in the struct are silently ignored.

**Example** (Selecting specific properties)

```ts
import { pipe, Struct } from "effect"

const user = { name: "Alice", age: 30, admin: true }
const nameAndAge = pipe(user, Struct.pick(["name", "age"]))
console.log(nameAndAge) // { name: "Alice", age: 30 }
```

**See**

- `omit` – the inverse (exclude keys instead)
- `get` – extract a single value

**Signature**

```ts
declare const pick: {
  <S extends object, const Keys extends ReadonlyArray<keyof S>>(
    keys: Keys
  ): (self: S) => Simplify<Pick<S, Keys[number]>>
  <S extends object, const Keys extends ReadonlyArray<keyof S>>(self: S, keys: Keys): Simplify<Pick<S, Keys[number]>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Struct.ts#L197)

Since v2.0.0

# folding

## makeReducer

Creates a `Reducer` for a struct shape by providing a `Reducer` for each
property. The initial value is derived from each property's
`Reducer.initialValue`. When reducing a collection of structs, each property
is combined independently.

**When to use**

Use when you need to fold same-shape records by accumulating each property
independently into one summary record.

**Details**

Pass `omitKeyWhen` to drop properties whose reduced value matches a
predicate.

**Example** (Reducing a collection of structs)

```ts
import { Number, String, Struct } from "effect"

const R = Struct.makeReducer<{ readonly n: number; readonly s: string }>({
  n: Number.ReducerSum,
  s: String.ReducerConcat
})

const result = R.combineAll([
  { n: 1, s: "a" },
  { n: 2, s: "b" },
  { n: 3, s: "c" }
])
console.log(result) // { n: 6, s: "abc" }
```

**See**

- `makeCombiner` – like `makeReducer` but without an initial value

**Signature**

```ts
declare const makeReducer: <A>(
  reducers: { readonly [K in keyof A]: Reducer.Reducer<A[K]> },
  options?: { readonly omitKeyWhen?: ((a: A[keyof A]) => boolean) | undefined }
) => Reducer.Reducer<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Struct.ts#L935)

Since v4.0.0

# getters

## get

Retrieves the value at `key` from a struct.

**When to use**

Use to extract a single property from a struct in a pipeline.

**Details**

The return type is narrowed to `S[K]`.

**Example** (Extracting a property in a pipeline)

```ts
import { pipe, Struct } from "effect"

const name = pipe({ name: "Alice", age: 30 }, Struct.get("name"))
console.log(name) // "Alice"
```

**See**

- `keys` – list all string keys of a struct
- `pick` – extract multiple properties into a new struct

**Signature**

```ts
declare const get: {
  <S extends object, const K extends keyof S>(key: K): (self: S) => S[K]
  <S extends object, const K extends keyof S>(self: S, key: K): S[K]
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Struct.ts#L135)

Since v2.0.0

# instances

## makeEquivalence

Creates an `Equivalence` for a struct by providing an `Equivalence` for each
property. Two structs are equivalent when all their corresponding properties
are equivalent.

**When to use**

Use when you need equality for a record-like object to be decided field by
field, with a custom equality rule for each property.

**Details**

This is an alias of `Equivalence.Struct`. Each property's equivalence is
checked independently; all must return `true` for the overall result to be
`true`.

**Example** (Comparing structs for equivalence)

```ts
import { Equivalence, Struct } from "effect"

const PersonEquivalence = Struct.makeEquivalence({
  name: Equivalence.strictEqual<string>(),
  age: Equivalence.strictEqual<number>()
})

console.log(PersonEquivalence({ name: "Alice", age: 30 }, { name: "Alice", age: 30 }))
// true
console.log(PersonEquivalence({ name: "Alice", age: 30 }, { name: "Bob", age: 30 }))
// false
```

**See**

- `makeOrder` – create an `Order` for structs

**Signature**

```ts
declare const makeEquivalence: <R extends Record<string, Equivalence.Equivalence<any>>>(
  fields: R
) => Equivalence.Equivalence<{ readonly [K in keyof R]: [R[K]] extends [Equivalence.Equivalence<infer A>] ? A : never }>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Struct.ts#L515)

Since v4.0.0

# mapping

## map

Applies a `Lambda` transformation to every value in a struct.

**When to use**

Use when you want to apply the same function to every value in a struct.

**Details**

The lambda must be created with `lambda` so the compiler can track the
output types.

**Example** (Wrapping every value in an array)

```ts
import { pipe, Struct } from "effect"

interface AsArray extends Struct.Lambda {
  <A>(self: A): Array<A>
  readonly "~lambda.out": Array<this["~lambda.in"]>
}

const asArray = Struct.lambda<AsArray>((a) => [a])
const result = pipe({ width: 10, height: 20 }, Struct.map(asArray))
console.log(result) // { width: [10], height: [20] }
```

**See**

- `mapPick` – apply a lambda only to selected keys
- `mapOmit` – apply a lambda to all keys except selected ones
- `evolve` – apply different functions to different keys

**Signature**

```ts
declare const map: {
  <L extends Lambda>(lambda: L): <S extends object>(self: S) => { [K in keyof S]: Apply<L, S[K]> }
  <S extends object, L extends Lambda>(self: S, lambda: L): { [K in keyof S]: Apply<L, S[K]> }
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Struct.ts#L694)

Since v4.0.0

## mapOmit

Applies a `Lambda` transformation to all keys except the specified
ones; the excluded keys are copied unchanged.

**When to use**

Use when most keys should be transformed but a few should be preserved.

**Example** (Wrapping all values except one in arrays)

```ts
import { pipe, Struct } from "effect"

interface AsArray extends Struct.Lambda {
  <A>(self: A): Array<A>
  readonly "~lambda.out": Array<this["~lambda.in"]>
}

const asArray = Struct.lambda<AsArray>((a) => [a])
const result = pipe({ x: 1, y: 2, z: 3 }, Struct.mapOmit(["y"], asArray))
console.log(result) // { x: [1], y: 2, z: [3] }
```

**See**

- `map` – apply a lambda to all keys
- `mapPick` – apply a lambda only to selected keys

**Signature**

```ts
declare const mapOmit: {
  <S extends object, const Keys extends ReadonlyArray<keyof S>, L extends Lambda>(
    keys: Keys,
    lambda: L
  ): (self: S) => { [K in keyof S]: K extends Keys[number] ? S[K] : Apply<L, S[K]> }
  <S extends object, const Keys extends ReadonlyArray<keyof S>, L extends Lambda>(
    self: S,
    keys: Keys,
    lambda: L
  ): { [K in keyof S]: K extends Keys[number] ? S[K] : Apply<L, S[K]> }
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Struct.ts#L794)

Since v4.0.0

## mapPick

Applies a `Lambda` transformation only to the specified keys; all
other keys are copied unchanged.

**When to use**

Use when you want to apply the same transformation to a subset of properties.

**Example** (Wrapping only selected values in arrays)

```ts
import { pipe, Struct } from "effect"

interface AsArray extends Struct.Lambda {
  <A>(self: A): Array<A>
  readonly "~lambda.out": Array<this["~lambda.in"]>
}

const asArray = Struct.lambda<AsArray>((a) => [a])
const result = pipe({ x: 1, y: 2, z: 3 }, Struct.mapPick(["x", "z"], asArray))
console.log(result) // { x: [1], y: 2, z: [3] }
```

**See**

- `map` – apply a lambda to all keys
- `mapOmit` – apply a lambda to all keys except selected ones

**Signature**

```ts
declare const mapPick: {
  <S extends object, const Keys extends ReadonlyArray<keyof S>, L extends Lambda>(
    keys: Keys,
    lambda: L
  ): (self: S) => { [K in keyof S]: K extends Keys[number] ? Apply<L, S[K]> : S[K] }
  <S extends object, const Keys extends ReadonlyArray<keyof S>, L extends Lambda>(
    self: S,
    keys: Keys,
    lambda: L
  ): { [K in keyof S]: K extends Keys[number] ? Apply<L, S[K]> : S[K] }
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Struct.ts#L740)

Since v4.0.0

# ordering

## makeOrder

Creates an `Order` for a struct by providing an `Order` for each property.
Properties are compared in the order they appear in the fields object; the
first non-zero comparison determines the result.

**When to use**

Use when you need to sort record-like objects lexicographically by several
fields, with each field using its own ordering rule.

**Details**

This is an alias of `Order.Struct`. The order of keys in the `fields` object
determines comparison priority.

**Example** (Ordering structs by name then age)

```ts
import { Number, String, Struct } from "effect"

const PersonOrder = Struct.makeOrder({
  name: String.Order,
  age: Number.Order
})

console.log(PersonOrder({ name: "Alice", age: 30 }, { name: "Bob", age: 25 }))
// -1 (Alice comes before Bob)
```

**See**

- `makeEquivalence` – create an `Equivalence` for structs

**Signature**

```ts
declare const makeOrder: <const R extends { readonly [x: string]: order.Order<any> }>(
  fields: R
) => order.Order<{ [K in keyof R]: [R[K]] extends [order.Order<infer A>] ? A : never }>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Struct.ts#L550)

Since v4.0.0

# transforming

## evolve

Transforms values of a struct selectively using per-key functions. Keys
without a corresponding function are copied unchanged.

**When to use**

Use when you want to update specific fields while keeping the rest intact.

**Details**

Each transform function receives the current value and returns the new value;
the return type can differ from the input type.

**Example** (Transforming selected values)

```ts
import { pipe, Struct } from "effect"

const result = pipe(
  { name: "alice", age: 30, active: true },
  Struct.evolve({
    name: (s) => s.toUpperCase(),
    age: (n) => n + 1
  })
)
console.log(result) // { name: "ALICE", age: 31, active: true }
```

**See**

- `evolveKeys` – transform keys instead of values
- `evolveEntries` – transform both keys and values
- `map` – apply the same transformation to all values

**Signature**

```ts
declare const evolve: {
  <S extends object, E extends Evolver<S>>(e: E): (self: S) => Evolved<S, E>
  <S extends object, E extends Evolver<S>>(self: S, e: E): Evolved<S, E>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Struct.ts#L324)

Since v2.0.0

## evolveEntries

Transforms both keys and values of a struct selectively. Each per-key
function receives `(key, value)` and must return a `[newKey, newValue]`
tuple. Keys without a corresponding function are copied unchanged.

**When to use**

Use when you need to rename a key and change its value in one step.

**Details**

The return type is fully tracked at the type level.

**Example** (Transforming keys and values together)

```ts
import { pipe, Struct } from "effect"

const result = pipe(
  { amount: 100, label: "total" },
  Struct.evolveEntries({
    amount: (k, v) => [`${k}Cents`, v * 100],
    label: (k, v) => [k, v.toUpperCase()]
  })
)
console.log(result) // { amountCents: 10000, label: "TOTAL" }
```

**See**

- `evolve` – transform values only
- `evolveKeys` – transform keys only

**Signature**

```ts
declare const evolveEntries: {
  <S extends object, E extends EntryEvolver<S>>(e: E): (self: S) => EntryEvolved<S, E>
  <S extends object, E extends EntryEvolver<S>>(self: S, e: E): EntryEvolved<S, E>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Struct.ts#L428)

Since v4.0.0

# utility types

## Assign (type alias)

Merges two object types with properties from `U` taking precedence over `T`
on overlapping keys (like `Object.assign` at the type level).

**When to use**

Use when you need the type-level equivalent of `{ ...T, ...U }`.

**Details**

When no keys overlap, this returns a simple intersection for efficiency.
When keys overlap, the type from `U` wins.

**Example** (Merging two types with overlapping keys)

```ts
import type { Struct } from "effect"

type A = { a: string; b: number }
type B = { b: boolean; c: string }
type Merged = Struct.Assign<A, B>
// { a: string; b: boolean; c: string }
```

**See**

- `assign` – the runtime equivalent
- `Simplify` – flatten the resulting intersection

**Signature**

```ts
type { [K in keyof (keyof T & keyof U extends never ? T & U : Omit<T, keyof T & keyof U> & U)]: (keyof T & keyof U extends never ? T & U : Omit<T, keyof T & keyof U> & U)[K]; } = Simplify<keyof T & keyof U extends never ? T & U : Omit<T, keyof T & keyof U> & U>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Struct.ts#L108)

Since v4.0.0

## Mutable (type alias)

Removes `readonly` modifiers from all properties of an object type.

**When to use**

Use when you need a mutable version of a readonly interface.

**Details**

This helper is purely cosmetic at the type level and has no runtime effect.
It also flattens intersections like `Simplify`.

**Example** (Making a readonly type mutable)

```ts
import type { Struct } from "effect"

type ReadOnly = { readonly a: string; readonly b: number }
type Writable = Struct.Mutable<ReadOnly>
// { a: string; b: number }
```

**See**

- `Simplify` – flattens intersections without removing `readonly`

**Signature**

```ts
type { -readonly [K in keyof T]: T[K]; } = { -readonly [K in keyof T]: T[K] } & {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Struct.ts#L77)

Since v4.0.0

## Simplify (type alias)

Flattens intersection types into a single object type for readability.

**When to use**

Use when hovering over a type shows `A & B & C` instead of the merged shape.

**Details**

This helper is purely cosmetic at the type level and has no runtime effect.
It preserves `readonly` modifiers; use `Mutable` to strip them.

**Example** (Flattening an intersection)

```ts
import type { Struct } from "effect"

type Original = { a: string } & { b: number }

// Without Simplify, the type displays as `{ a: string } & { b: number }`
type Simplified = Struct.Simplify<Original>
// { a: string; b: number }
```

**See**

- `Mutable` – also flattens but removes `readonly`
- `Assign` – merges two types with right-side precedence

**Signature**

```ts
type { [K in keyof T]: T[K]; } = { [K in keyof T]: T[K] } & {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Struct.ts#L49)

Since v4.0.0
