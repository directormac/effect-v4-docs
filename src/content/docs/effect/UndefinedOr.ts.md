---
title: UndefinedOr.ts
nav_order: 140
parent: "effect"
---

## UndefinedOr.ts overview

Works with values that may be `undefined`.

Use this module for plain TypeScript values of type `A | undefined` when
`undefined` is the only absence marker. It is a small alternative to wrapping
values in `Option` when your data already uses `undefined` to mean "no
value". The module includes helpers for mapping defined values, matching both
cases, throwing when a value is missing, adapting throwing functions, and
building reducers or combiners.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [makeCombinerFailFast](#makecombinerfailfast)
  - [makeReducer](#makereducer)
  - [makeReducerFailFast](#makereducerfailfast)
- [converting](#converting)
  - [liftThrowable](#liftthrowable)
- [getters](#getters)
  - [getOrThrow](#getorthrow)
  - [getOrThrowWith](#getorthrowwith)
- [mapping](#mapping)
  - [map](#map)
- [pattern matching](#pattern-matching)
  - [match](#match)

---

# constructors

## makeCombinerFailFast

Creates a `Combiner` for `A | undefined` that combines values only when both
operands are defined.

**When to use**

Use to lift a `Combiner` so any `undefined` operand makes the combined result
`undefined`.

**Details**

- `undefined` combined with any value returns `undefined`
- Any value combined with `undefined` returns `undefined`
- `a` combined with `b` returns `combiner.combine(a, b)`

**See**

- `makeReducerFailFast` if you have a `Reducer` and want to lift it
  to `UndefinedOr` values.

**Signature**

```ts
declare const makeCombinerFailFast: <A>(combiner: Combiner.Combiner<A>) => Combiner.Combiner<A | undefined>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/UndefinedOr.ts#L200)

Since v4.0.0

## makeReducer

Creates a `Reducer` for `UndefinedOr<A>` that prioritizes the first non-`undefined`
value and combines values when both operands are present.

**When to use**

Use when you need to reduce values that may be `undefined`, keeping the
first defined value as a fallback and combining only when both operands are
defined.

**Details**

Combining `undefined` with `undefined` returns `undefined`. Combining a
defined value with `undefined` keeps the defined value, so the first defined
value wins when only one side is present. When both values are defined, they
are combined with `combiner.combine`. The reducer's initial value is
`undefined`.

**Signature**

```ts
declare const makeReducer: <A>(combiner: Combiner.Combiner<A>) => Reducer.Reducer<A | undefined>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/UndefinedOr.ts#L171)

Since v4.0.0

## makeReducerFailFast

Creates a `Reducer` for `A | undefined` by wrapping an existing reducer with
fail-fast semantics.

**When to use**

Use to wrap an existing `Reducer` so any `undefined` value aborts the entire
reduction result.

**Details**

- Initial value is the wrapped reducer's `initialValue`
- Combining two defined values delegates to the wrapped reducer
- If the accumulator or next value is `undefined`, the reduction returns `undefined`

**See**

- `makeCombinerFailFast` if you only have a `Combiner` and want to
  lift it to `UndefinedOr` values.

**Signature**

```ts
declare const makeReducerFailFast: <A>(reducer: Reducer.Reducer<A>) => Reducer.Reducer<A | undefined>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/UndefinedOr.ts#L228)

Since v4.0.0

# converting

## liftThrowable

Converts a throwing function into one that returns successful results
unchanged and returns `undefined` when the function throws.

**When to use**

Use to adapt exception-throwing functions when `undefined` is the absence
value you want to return for failures.

**Gotchas**

Thrown values are discarded. If the wrapped function can successfully return
`undefined`, that success is indistinguishable from a thrown failure.

**Signature**

```ts
declare const liftThrowable: <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => B) => (...a: A) => B | undefined
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/UndefinedOr.ts#L139)

Since v4.0.0

# getters

## getOrThrow

Returns the defined value, or throws a default `Error` when the input is
`undefined`.

**When to use**

Use when you need to unwrap a value that should already be defined and a
generic missing-value `Error` is acceptable.

**Details**

Defined inputs are returned unchanged. `undefined` throws
`new Error("getOrThrow called on a undefined")`.

**See**

- `getOrThrowWith` for the sibling that lets callers choose the thrown value
- `match` for handling defined and undefined cases without throwing

**Signature**

```ts
declare const getOrThrow: <A>(self: A | undefined) => A
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/UndefinedOr.ts#L118)

Since v4.0.0

## getOrThrowWith

Returns the defined value, or throws the value produced by `onUndefined`
when the input is `undefined`.

**When to use**

Use when you need fail-fast unwrapping of an `A | undefined` value and want
to provide the thrown error for the undefined case.

**Details**

Defined values are returned unchanged. When the input is `undefined`,
`onUndefined` is called and its result is thrown.

**See**

- `getOrThrow` for the default-error sibling
- `match` for handling defined and undefined cases without throwing

**Signature**

```ts
declare const getOrThrowWith: {
  (onUndefined: () => unknown): <A>(self: A | undefined) => A
  <A>(self: A | undefined, onUndefined: () => unknown): A
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/UndefinedOr.ts#L88)

Since v4.0.0

# mapping

## map

Maps a defined value with `f`, or returns `undefined` unchanged.

**When to use**

Use to apply a pure transformation to an `A | undefined` value while
preserving `undefined` as absence.

**See**

- `match` when you need to handle the `undefined` case explicitly

**Signature**

```ts
declare const map: {
  <A, B>(f: (a: A) => B): (self: A | undefined) => B | undefined
  <A, B>(self: A | undefined, f: (a: A) => B): B | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/UndefinedOr.ts#L31)

Since v4.0.0

# pattern matching

## match

Pattern matches on an `A | undefined` value, running `onDefined` when the
value is present or evaluating `onUndefined` when the value is `undefined`.

**When to use**

Use when you need to turn an `A | undefined` into a non-optional result by
handling both the defined and undefined branches in one expression.

**See**

- `map` for transforming defined values while preserving `undefined`
- `getOrThrowWith` for throwing when the value is `undefined` instead of returning a fallback branch

**Signature**

```ts
declare const match: {
  <B, A, C = B>(options: {
    readonly onUndefined: LazyArg<B>
    readonly onDefined: (a: A) => C
  }): (self: A | undefined) => B | C
  <A, B, C = B>(
    self: A | undefined,
    options: { readonly onUndefined: LazyArg<B>; readonly onDefined: (a: A) => C }
  ): B | C
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/UndefinedOr.ts#L51)

Since v4.0.0
