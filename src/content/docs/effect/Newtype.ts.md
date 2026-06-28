---
title: Newtype.ts
nav_order: 64
parent: "effect"
---

## Newtype.ts overview

Creates compile-time-only wrappers around existing value types.

A newtype lets TypeScript distinguish values with the same runtime shape, such
as two different ids that are both strings. The tag exists only in the type
system, so wrapping does not allocate a runtime object. This module includes
the base `Newtype` interface, wrapping and unwrapping helpers, optics, and
helpers for reusing carrier instances such as `Equivalence`, `Order`,
`Combiner`, and `Reducer`.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [makeCombiner](#makecombiner)
  - [makeEquivalence](#makeequivalence)
  - [makeIso](#makeiso)
  - [makeOrder](#makeorder)
  - [makeReducer](#makereducer)
- [getters](#getters)
  - [value](#value)
- [models](#models)
  - [Newtype (interface)](#newtype-interface)
- [utils](#utils)
  - [Newtype (namespace)](#newtype-namespace)
    - [Any (type alias)](#any-type-alias)
    - [Key (type alias)](#key-type-alias)
    - [Carrier (type alias)](#carrier-type-alias)

---

# constructors

## makeCombiner

Lifts a `Combiner` for the carrier type into a `Combiner` for the newtype.

**When to use**

Use when you need to combine newtype-wrapped values with the carrier's
combining logic, without manually unwrapping.

**Details**

The returned combiner delegates to the provided carrier combiner.

**Example** (Combining newtypes)

```ts
import { Combiner, Newtype } from "effect"

interface Amount extends Newtype.Newtype<"Amount", number> {}

const sum = Combiner.make<number>((a, b) => a + b)
const combiner = Newtype.makeCombiner<Amount>(sum)
const iso = Newtype.makeIso<Amount>()

const total = combiner.combine(iso.set(10), iso.set(20))
Newtype.value(total) // 30
```

**See**

- `makeReducer` — lift a `Reducer` for the carrier

**Signature**

```ts
declare const makeCombiner: <N extends Newtype.Any>(
  combiner: Combiner.Combiner<Newtype.Carrier<N>>
) => Combiner.Combiner<N>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Newtype.ts#L282)

Since v4.0.0

## makeEquivalence

Lifts an `Equivalence` for the carrier type into an `Equivalence` for the
newtype.

**When to use**

Use when you need equality for newtype-wrapped values to behave like
equality for the wrapped carrier value, without manually unwrapping.

**Details**

The returned equivalence delegates to the provided carrier equivalence and
has zero runtime cost beyond the underlying equivalence check.

**Example** (Comparing newtypes)

```ts
import { Equivalence, Newtype } from "effect"

interface Label extends Newtype.Newtype<"Label", string> {}

const eq = Newtype.makeEquivalence<Label>(Equivalence.String)
const iso = Newtype.makeIso<Label>()

eq(iso.set("a"), iso.set("a")) // true
eq(iso.set("a"), iso.set("b")) // false
```

**See**

- `makeOrder` — lift an `Order` for the carrier

**Signature**

```ts
declare const makeEquivalence: <N extends Newtype.Any>(
  equivalence: Equivalence.Equivalence<Newtype.Carrier<N>>
) => Equivalence.Equivalence<N>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Newtype.ts#L214)

Since v4.0.0

## makeIso

Creates an `Optic.Iso` for a newtype, providing both wrapping (`set`) and
unwrapping (`get`).

**When to use**

Use as the primary way to construct and deconstruct newtype values.

**Details**

The returned iso composes with other optics via the standard `Optic` API.
Both directions have zero runtime cost because they are identity casts.

**Example** (Wrapping and unwrapping with an iso)

```ts
import { Newtype } from "effect"

interface Label extends Newtype.Newtype<"Label", string> {}

const labelIso = Newtype.makeIso<Label>()

const label: Label = labelIso.set("world")
const str: string = labelIso.get(label) // "world"
```

**See**

- `value` — unwrap only

**Signature**

```ts
declare const makeIso: <N extends Newtype.Any>() => Optic.Iso<N, Newtype.Carrier<N>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Newtype.ts#L177)

Since v4.0.0

## makeOrder

Lifts an `Order` for the carrier type into an `Order` for the newtype.

**When to use**

Use when you need to sort newtype-wrapped values according to the ordering
of the wrapped carrier value, without manually unwrapping.

**Details**

The returned order delegates to the provided carrier order.

**Example** (Ordering newtypes)

```ts
import { Newtype, Order } from "effect"

interface Score extends Newtype.Newtype<"Score", number> {}

const ord = Newtype.makeOrder<Score>(Order.Number)
const iso = Newtype.makeIso<Score>()

ord(iso.set(1), iso.set(2)) // -1
```

**See**

- `makeEquivalence` — lift an `Equivalence` for the carrier

**Signature**

```ts
declare const makeOrder: <N extends Newtype.Any>(order: Order.Order<Newtype.Carrier<N>>) => Order.Order<N>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Newtype.ts#L248)

Since v4.0.0

## makeReducer

Lifts a `Reducer` for the carrier type into a `Reducer` for the newtype.

**When to use**

Use when you need to reduce a collection of newtype-wrapped values with the
carrier's reducer, without manually unwrapping.

**Details**

The returned reducer delegates to the provided carrier reducer.

**Example** (Reducing newtypes)

```ts
import { Newtype, Reducer } from "effect"

interface Score extends Newtype.Newtype<"Score", number> {}

const sum = Reducer.make<number>((a, b) => a + b, 0)
const reducer = Newtype.makeReducer<Score>(sum)
const iso = Newtype.makeIso<Score>()

const total = reducer.combineAll([iso.set(1), iso.set(2), iso.set(3)])
Newtype.value(total) // 6
```

**See**

- `makeCombiner` — lift a `Combiner` for the carrier

**Signature**

```ts
declare const makeReducer: <N extends Newtype.Any>(reducer: Reducer.Reducer<Newtype.Carrier<N>>) => Reducer.Reducer<N>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Newtype.ts#L318)

Since v4.0.0

# getters

## value

Unwraps a newtype value, returning the underlying carrier value.

**When to use**

Use when you need the carrier value from an existing newtype without
constructing a new newtype value at the same call site.

**Details**

This has zero runtime cost because it is an identity cast.

**Example** (Unwrapping a newtype)

```ts
import { Newtype } from "effect"

interface Label extends Newtype.Newtype<"Label", string> {}

const iso = Newtype.makeIso<Label>()
const label = iso.set("hello")

const raw: string = Newtype.value(label) // "hello"
```

**See**

- `makeIso` — two-way conversion (wrap and unwrap)

**Signature**

```ts
declare const value: <N extends Newtype.Any>(newtype: N) => Newtype.Carrier<N>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Newtype.ts#L144)

Since v4.0.0

# models

## Newtype (interface)

A tagged interface that wraps a carrier type under a unique key, preventing
accidental interchange of structurally identical values.

**When to use**

Use to define a newtype as an `interface` extending
`Newtype<"MyKey", CarrierType>` when structurally identical carrier types
should remain distinct in TypeScript.

**Details**

The tag is compile-time only, so no runtime wrapper is allocated. Use
`makeIso` to create a two-way conversion, or `value` to unwrap.

**Example** (Defining a newtype)

```ts
import { Newtype } from "effect"

interface UserId extends Newtype.Newtype<"UserId", number> {}
interface OrderId extends Newtype.Newtype<"OrderId", number> {}

// UserId and OrderId are not assignable to each other
// even though both wrap `number`.
```

**See**

- `makeIso` — create an iso to wrap and unwrap
- `value` — unwrap a newtype value

**Signature**

```ts
export interface Newtype<in out Key extends string, out Carrier> {
  readonly [TypeId]: {
    readonly key: Key
    readonly carrier: Carrier
  }
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Newtype.ts#L55)

Since v4.0.0

# utils

## Newtype (namespace)

Namespace containing type-level helpers for `Newtype` values, including
constraints and utilities for extracting a newtype's key and carrier type.

**When to use**

Use to access generic constraints and type-level utilities for `Newtype`
values.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Newtype.ts#L73)

Since v4.0.0

### Any (type alias)

A type that matches any `Newtype`, useful as a generic constraint:
`<N extends Newtype.Any>`.

**When to use**

Use as a generic constraint when a type parameter can be any `Newtype`.

**See**

- `Newtype` — the base tagged interface

**Signature**

```ts
type Any = Newtype<any, unknown>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Newtype.ts#L87)

Since v4.0.0

### Key (type alias)

Extracts the key literal type from a newtype.

**When to use**

Use to inspect or constrain a newtype's key in generic code.

**Signature**

```ts
type Key<N> = N extends Newtype<infer Key, unknown> ? Key : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Newtype.ts#L99)

Since v4.0.0

### Carrier (type alias)

Extracts the carrier (underlying) type from a newtype.

**When to use**

Use when you need to refer to the wrapped type in generic utilities.

**Signature**

```ts
type Carrier<N> = N extends Newtype<infer _Key, infer Carrier> ? Carrier : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Newtype.ts#L111)

Since v4.0.0
