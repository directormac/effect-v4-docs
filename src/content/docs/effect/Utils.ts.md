---
title: Utils.ts
nav_order: 354
parent: "effect"
---

## Utils.ts overview

Internal and advanced utilities used by Effect's generator-based syntax and
higher-kinded type support. This is not a general-purpose utility module for
application code.

`SingleShotGen` makes an Effect-style value work with `yield*` inside
generator helpers. `Variance` and `Gen` provide the type-level signatures
used by modules such as `Effect`, `Option`, and `Result` to type their
`gen` APIs.

Since v2.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [SingleShotGen (class)](#singleshotgen-class)
    - [next (method)](#next-method)
    - [[Symbol.iterator] (method)](#symboliterator-method)
    - [self (property)](#self-property)
- [models](#models)
  - [Gen (type alias)](#gen-type-alias)
  - [Variance (interface)](#variance-interface)

---

# constructors

## SingleShotGen (class)

Yields its wrapped value exactly once through an `IterableIterator`.

**When to use**

Use to implement `[Symbol.iterator]()` on Effect-like types so they can be
`yield*`-ed inside generator functions, such as `Effect.gen` and
`Option.gen`.

**Details**

The first call to `next()` returns `{ value: self, done: false }`. Every
subsequent call returns `{ value: a, done: true }` where `a` is the argument
passed to `next()`. `[Symbol.iterator]()` returns a **new** `SingleShotGen`
wrapping the same value, so the outer type can be iterated multiple times.

**Example** (Yielding a wrapped value in a generator)

```ts
import { Utils } from "effect"

const gen = new Utils.SingleShotGen<string, number>("hello")

// First call yields the wrapped value
console.log(gen.next(0))
// { value: "hello", done: false }

// Second call signals completion with the provided value
console.log(gen.next(42))
// { value: 42, done: true }
```

**See**

- `Gen` for the type-level signature that relies on `SingleShotGen`

**Signature**

```ts
declare class SingleShotGen<T, A> {
  constructor(self: T)
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Utils.ts#L52)

Since v2.0.0

### next (method)

Yields the stored value once, then completes with the value sent back in.

**When to use**

Use to advance a `SingleShotGen` through its single yield and completion
step.

**Signature**

```ts
declare const next: (a: A) => IteratorResult<T, A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Utils.ts#L70)

Since v2.0.0

### [Symbol.iterator] (method)

Creates a fresh single-shot iterator over the stored value.

**When to use**

Use to iterate the wrapped value again without reusing the consumed
iterator state.

**Signature**

```ts
declare const [Symbol.iterator]: () => IterableIterator<T, A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Utils.ts#L93)

Since v2.0.0

### self (property)

**Signature**

```ts
readonly self: T
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Utils.ts#L54)

# models

## Gen (type alias)

Type-level signature for generator-based monadic composition over any
`TypeLambda`.

**When to use**

Use to type the `gen` function of a module that supports generator syntax,
such as `Option.gen`, `Result.gen`, and `Effect.gen`.

**Details**

This is a pure type alias with no runtime behavior. It infers `R`, `O`, and
`E` from the yielded values via `Variance` or `Kind` constraints. The
generator's return type `A` becomes the output's `A` parameter.

**Example** (Typing a gen function for Option)

```ts
import type { Option, Utils } from "effect"

declare const gen: Utils.Gen<Option.OptionTypeLambda>
```

**See**

- `Variance` for encoding the variance used for inference
- `SingleShotGen` for the iterator protocol that makes yielding work

**Signature**

```ts
type Gen<F> = <Self, K extends Variance<F, any, any, any> | Kind<F, any, any, any, any>, A>(
  ...args: [self: Self, body: (this: Self) => Generator<K, A, never>] | [body: () => Generator<K, A, never>]
) => Kind<
  F,
  [K] extends [Variance<F, infer R, any, any>] ? R : [K] extends [Kind<F, infer R, any, any, any>] ? R : never,
  [K] extends [Variance<F, any, infer O, any>] ? O : [K] extends [Kind<F, any, infer O, any, any>] ? O : never,
  [K] extends [Variance<F, any, any, infer E>] ? E : [K] extends [Kind<F, any, any, infer E, any>] ? E : never,
  A
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Utils.ts#L166)

Since v2.0.0

## Variance (interface)

Type-level marker encoding the variance of a `TypeLambda`'s type
parameters.

**When to use**

Use to define variance constraints for a higher-kinded type so that
`Gen` can correctly infer `R`, `O`, and `E` from yielded values.

**Details**

`F` is invariant and must match exactly. `R` is contravariant in the input
or environment position. `O` and `E` are covariant in the output and error
positions. This is a pure type-level construct with no runtime
representation.

**Example** (Declaring variance for a TypeLambda)

```ts
import type { Option, Utils } from "effect"

declare const variance: Utils.Variance<Option.OptionTypeLambda, never, never, never>
```

**See**

- `Gen` for the type-level signature that uses `Variance`

**Signature**

```ts
export interface Variance<in out F extends TypeLambda, in R, out O, out E> {
  readonly _F: Types.Invariant<F>
  readonly _R: Types.Contravariant<R>
  readonly _O: Types.Covariant<O>
  readonly _E: Types.Covariant<E>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Utils.ts#L131)

Since v2.0.0
