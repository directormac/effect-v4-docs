---
title: Unify.ts
nav_order: 141
parent: "effect"
---

## Unify.ts overview

Defines Effect's type-level unification protocol.

Unification collapses unions of protocol-enabled values into their public data
types. It is mostly for maintainers of Effect data types and advanced library
authors; application code usually benefits from it through APIs such as
`Effect`, `Option`, `Result`, `Stream`, `Layer`, and `Match`. This module
exports the protocol symbols, the `Unify` type that performs normalization,
and `unify`, an identity function that changes only the inferred type.

Since v2.0.0

---

## Exports Grouped by Category

- [models](#models)
  - [Unify (type alias)](#unify-type-alias)
- [symbols](#symbols)
  - [ignoreSymbol (type alias)](#ignoresymbol-type-alias)
  - [typeSymbol (type alias)](#typesymbol-type-alias)
  - [unifySymbol (type alias)](#unifysymbol-type-alias)
- [utility types](#utility-types)
  - [unify](#unify)

---

# models

## Unify (type alias)

Unifies types that implement the unification protocol.

**When to use**

Use to normalize unions of types that expose Effect's unification protocol.

**Details**

This type performs automatic type unification for types that contain
the unification symbols (`unifySymbol`, `typeSymbol`, `ignoreSymbol`).
It's primarily used internally by the Effect type system to handle
complex type unions and provide better type inference.

**Example** (Unifying protocol types)

```ts
import type { Unify } from "effect"

// Example of types that can be unified
type UnifiableA = {
  value: string
  [Unify.typeSymbol]?: string
  [Unify.unifySymbol]?: { String: () => string }
}

type UnifiableB = {
  value: number
  [Unify.typeSymbol]?: number
  [Unify.unifySymbol]?: { Number: () => number }
}

// Unify automatically handles the union
type Unified = Unify.Unify<UnifiableA | UnifiableB>
// Results in a properly unified type
```

**See**

- `unify` for applying this normalization to a value or function

**Signature**

```ts
type Unify<A> =
  Values<ExtractTypes<FilterIn<A> & { [typeSymbol]: A }>> extends infer Z
    ? Z | FilterInUnmatched<A, Keys<ExtractTypes<FilterIn<A> & { [typeSymbol]: A }>>> | FilterOut<A>
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Unify.ts#L207)

Since v2.0.0

# symbols

## ignoreSymbol (type alias)

The type of the ignoreSymbol.

**When to use**

Use to reference the ignored-property key in type-level protocol
definitions.

**Details**

This type represents the unique symbol used for marking types that should
be ignored during unification operations. It's used in type-level operations
to exclude specific types from the unification process.

**Signature**

```ts
type ignoreSymbol = typeof ignoreSymbol
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Unify.ts#L132)

Since v2.0.0

## typeSymbol (type alias)

The type of the typeSymbol.

**When to use**

Use to reference the type information property key in type-level protocol
definitions.

**Details**

This type represents the unique symbol used for storing type information
in types that support unification. It's used in type-level operations
to access and manipulate type information.

**Signature**

```ts
type typeSymbol = typeof typeSymbol
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Unify.ts#L93)

Since v2.0.0

## unifySymbol (type alias)

The type of the unifySymbol.

**When to use**

Use to reference the unification behavior property key in type-level
protocol definitions.

**Details**

This type represents the unique symbol used for identifying unification
behavior in Effect types. It's typically used in type-level operations
to enable automatic type unification.

**Signature**

```ts
type unifySymbol = typeof unifySymbol
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Unify.ts#L54)

Since v2.0.0

# utility types

## unify

Applies `Unify` to a value or function return type at compile time.

**When to use**

Use to keep a value or function unchanged at runtime while normalizing its
inferred type with Effect's unification protocol.

**Details**

This is an identity function at runtime. For functions, the returned function
has the same runtime behavior while its return type is normalized with the
Effect unification protocol.

**Example** (Unifying values and function results)

```ts
import { Unify } from "effect"

// Unify a simple value
const unifiedValue = Unify.unify("hello")
// Type: string

// Unify a function result
const createUnifiableValue = () => ({
  value: "test",
  [Unify.typeSymbol]: "string" as const,
  [Unify.unifySymbol]: { String: () => "test" as const }
})

const unifiedFunction = Unify.unify(createUnifiableValue)
// The result will be properly unified

// Unify with curried functions
const curriedFunction = (a: string) => (b: number) => ({ result: a + b })
const unifiedCurried = Unify.unify(curriedFunction)
// Type: (a: string) => (b: number) => Unify<{ result: string }>
```

**See**

- `Unify` for the type-level normalization applied by this helper

**Signature**

```ts
declare const unify: {
  <
    Args extends Array<any>,
    Args2 extends Array<any>,
    Args3 extends Array<any>,
    Args4 extends Array<any>,
    Args5 extends Array<any>,
    T
  >(
    x: (...args: Args) => (...args: Args2) => (...args: Args3) => (...args: Args4) => (...args: Args5) => T
  ): (...args: Args) => (...args: Args2) => (...args: Args3) => (...args: Args4) => (...args: Args5) => Unify<T>
  <Args extends Array<any>, Args2 extends Array<any>, Args3 extends Array<any>, Args4 extends Array<any>, T>(
    x: (...args: Args) => (...args: Args2) => (...args: Args3) => (...args: Args4) => T
  ): (...args: Args) => (...args: Args2) => (...args: Args3) => (...args: Args4) => Unify<T>
  <Args extends Array<any>, Args2 extends Array<any>, Args3 extends Array<any>, T>(
    x: (...args: Args) => (...args: Args2) => (...args: Args3) => T
  ): (...args: Args) => (...args: Args2) => (...args: Args3) => Unify<T>
  <Args extends Array<any>, Args2 extends Array<any>, T>(
    x: (...args: Args) => (...args: Args2) => T
  ): (...args: Args) => (...args: Args2) => Unify<T>
  <Args extends Array<any>, T>(x: (...args: Args) => T): (...args: Args) => Unify<T>
  <T>(x: T): Unify<T>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Unify.ts#L274)

Since v2.0.0
