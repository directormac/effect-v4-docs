---
title: Types.ts
nav_order: 139
parent: "effect"
---

## Types.ts overview

Since v2.0.0

---

## Exports Grouped by Category

- [models](#models)
  - [Concurrency (type alias)](#concurrency-type-alias)
  - [Contravariant (type alias)](#contravariant-type-alias)
  - [Covariant (type alias)](#covariant-type-alias)
  - [Equals (type alias)](#equals-type-alias)
  - [EqualsWith (type alias)](#equalswith-type-alias)
  - [Has (type alias)](#has-type-alias)
  - [Invariant (type alias)](#invariant-type-alias)
  - [MergeLeft (type alias)](#mergeleft-type-alias)
  - [MergeRight (type alias)](#mergeright-type-alias)
  - [NoInfer (type alias)](#noinfer-type-alias)
- [tuples](#tuples)
  - [TupleOf (type alias)](#tupleof-type-alias)
  - [TupleOfAtLeast (type alias)](#tupleofatleast-type-alias)
- [types](#types)
  - [DeepMutable (type alias)](#deepmutable-type-alias)
  - [ExcludeReason (type alias)](#excludereason-type-alias)
  - [ExcludeTag (type alias)](#excludetag-type-alias)
  - [ExtractReason (type alias)](#extractreason-type-alias)
  - [ExtractTag (type alias)](#extracttag-type-alias)
  - [IsUnion (type alias)](#isunion-type-alias)
  - [Mutable (type alias)](#mutable-type-alias)
  - [NarrowReason (type alias)](#narrowreason-type-alias)
  - [NoExcessProperties (type alias)](#noexcessproperties-type-alias)
  - [NotFunction (type alias)](#notfunction-type-alias)
  - [OmitReason (type alias)](#omitreason-type-alias)
  - [ReasonOf (type alias)](#reasonof-type-alias)
  - [ReasonTags (type alias)](#reasontags-type-alias)
  - [RequiredKeys (type alias)](#requiredkeys-type-alias)
  - [Simplify (type alias)](#simplify-type-alias)
  - [Tags (type alias)](#tags-type-alias)
  - [UnionToIntersection (type alias)](#uniontointersection-type-alias)
  - [VoidIfEmpty (type alias)](#voidifempty-type-alias)
  - [unassigned (interface)](#unassigned-interface)
  - [unhandled (interface)](#unhandled-interface)
- [utils](#utils)
  - [Contravariant (namespace)](#contravariant-namespace)
    - [Type (type alias)](#type-type-alias)
  - [Covariant (namespace)](#covariant-namespace)
    - [Type (type alias)](#type-type-alias-1)
  - [Invariant (namespace)](#invariant-namespace)
    - [Type (type alias)](#type-type-alias-2)

---

# models

## Concurrency (type alias)

Describes the concurrency level for Effect operations that run multiple
effects.

**When to use**

Use to type options that control how many effects may run at the same time.

**Details**

- `number` — run at most N effects concurrently.
- `"unbounded"` — run all effects concurrently with no limit.
- `"inherit"` — inherit the concurrency from the surrounding context.

**Example** (Setting concurrency values)

```ts
import type { Types } from "effect"

const sequential: Types.Concurrency = 1
const limited: Types.Concurrency = 5
const unbounded: Types.Concurrency = "unbounded"
const inherit: Types.Concurrency = "inherit"
```

**Signature**

```ts
type Concurrency = number | "unbounded" | "inherit"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Types.ts#L440)

Since v2.0.0

## Contravariant (type alias)

Function-type alias encoding contravariant variance for a phantom type
parameter.

**When to use**

Use as a phantom field type to make a type parameter contravariant in input
position.

**Details**

`Contravariant<A>` is assignable to `Contravariant<B>` when `B extends A`,
following the supertype direction.

**Example** (Defining a contravariant phantom type)

```ts
import type { Types } from "effect"

interface Consumer<T> {
  readonly _phantom: Types.Contravariant<T>
  readonly accept: (value: T) => void
}
```

**See**

- `Contravariant.Type`
- `Covariant`
- `Invariant`

**Signature**

```ts
type Contravariant<A> = (_: A) => void
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Types.ts#L714)

Since v2.0.0

## Covariant (type alias)

Function-type alias encoding covariant variance for a phantom type
parameter.

**When to use**

Use as a phantom field type to make a type parameter covariant in output
position.

**Details**

`Covariant<A>` is assignable to `Covariant<B>` when `A extends B`, following
the subtype direction.

**Example** (Defining a covariant phantom type)

```ts
import type { Types } from "effect"

interface Producer<T> {
  readonly _phantom: Types.Covariant<T>
  readonly get: () => T
}
```

**See**

- `Covariant.Type`
- `Contravariant`
- `Invariant`

**Signature**

```ts
type Covariant<A> = (_: never) => A
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Types.ts#L646)

Since v2.0.0

## Equals (type alias)

Determines if two types are exactly equal at the type level.

**When to use**

Use to assert type equality in conditional types or type-level tests.

**Details**

- Uses the `<T>() => T extends X ? 1 : 2` trick for exact equality,
  distinguishing between `any`, `unknown`, `never`, and other types.
- Resolves to `true` if `X` and `Y` are identical, `false` otherwise.

**Example** (Checking type equality)

```ts
import type { Types } from "effect"

type Yes = Types.Equals<{ a: number }, { a: number }> // true
type No = Types.Equals<{ a: number }, { a: string }> // false
type AnyCheck = Types.Equals<any, string> // false
```

**See**

- `EqualsWith`

**Signature**

```ts
type Equals<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Types.ts#L282)

Since v2.0.0

## EqualsWith (type alias)

Determines if two types are equal, returning custom types for each case.

**When to use**

Use when you need a type-level if/else based on type equality.

**Details**

Returns `Y` when `A` and `B` are equal, `N` otherwise.

**Example** (Choosing a conditional type based on equality)

```ts
import type { Types } from "effect"

type R1 = Types.EqualsWith<string, string, "same", "diff"> // "same"
type R2 = Types.EqualsWith<string, number, "same", "diff"> // "diff"
```

**See**

- `Equals`

**Signature**

```ts
type EqualsWith<A, B, Y, N> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? Y : N
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Types.ts#L312)

Since v3.15.0

## Has (type alias)

Checks whether an object type contains any of the specified keys.

**When to use**

Use to branch type-level logic when at least one key from a candidate key set
exists on an object type.

**Details**

Returns `true` if at least one key from `Key` exists in `A`, `false`
otherwise.

**Example** (Checking key presence)

```ts
import type { Types } from "effect"

type Yes = Types.Has<{ a: number; b: string }, "a" | "c"> // true
type No = Types.Has<{ a: number }, "b" | "c"> // false
```

**Signature**

```ts
type Has<A, Key> = (Key extends infer K ? (K extends keyof A ? true : never) : never) extends never ? false : true
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Types.ts#L339)

Since v2.0.0

## Invariant (type alias)

Function-type alias encoding invariant variance for a phantom type
parameter.

**When to use**

Use as a phantom field type to make a type parameter invariant, neither
covariant nor contravariant.

**Details**

A value of type `Invariant<A>` cannot be assigned to `Invariant<B>` unless
`A` and `B` are the same type.

**Example** (Defining an invariant phantom type)

```ts
import type { Types } from "effect"

interface Container<T> {
  readonly _phantom: Types.Invariant<T>
  readonly value: T
}
```

**See**

- `Invariant.Type`
- `Covariant`
- `Contravariant`

**Signature**

```ts
type Invariant<A> = (_: A) => A
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Types.ts#L578)

Since v2.0.0

## MergeLeft (type alias)

Left-biased merge of two object types where keys from `Source` take
precedence over `Target` on conflict.

**When to use**

Use when you want left-biased merging where the first argument wins.

**Details**

Implemented as `MergeRight<Target, Source>`.

**Example** (Merging with left bias)

```ts
import type { Types } from "effect"

type Result = Types.MergeLeft<{ a: number; b: number }, { a: string; c: boolean }>
// { a: number; b: number; c: boolean }
```

**See**

- `MergeRight`
- `Simplify`

**Signature**

```ts
type MergeLeft<Source, Target> = MergeRight<Target, Source>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Types.ts#L373)

Since v2.0.0

## MergeRight (type alias)

Right-biased merge of two object types where keys from `Source` take
precedence over `Target` on conflict.

**When to use**

Use when you want right-biased merging where the second argument wins.

**Details**

The result is automatically simplified via `Simplify`.

**Example** (Right-biased merge)

```ts
import type { Types } from "effect"

type Result = Types.MergeRight<{ a: number; b: number }, { a: string; c: boolean }>
// { a: string; b: number; c: boolean }
```

**See**

- `MergeLeft`
- `Simplify`

**Signature**

```ts
type MergeRight<Target, Source> = Simplify<
  Source & {
    [Key in keyof Target as Key extends keyof Source ? never : Key]: Target[Key]
  }
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Types.ts#L405)

Since v2.0.0

## NoInfer (type alias)

Prevents TypeScript from inferring a type parameter from a specific
position.

**When to use**

Use when a function parameter must match an inferred type without becoming
an inference source.

**Details**

The parameter using `NoInfer` must still match the inferred type.

**Example** (Controlling inference)

```ts
import type { Types } from "effect"

declare function withDefault<T>(value: T, fallback: Types.NoInfer<T>): T

// T is inferred as "a" | "b" from the first argument only
const result = withDefault<"a" | "b">("a", "b")
```

**Signature**

```ts
type NoInfer<A> = [A][A extends any ? 0 : never]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Types.ts#L544)

Since v2.0.0

# tuples

## TupleOf (type alias)

Constructs a tuple type with exactly `N` elements of type `T`.

**When to use**

Use when you need a fixed-length array type, especially instead of manually
writing `[T, T, T, ...]` for longer tuples.

**Details**

- If `N` is a literal number, produces a tuple of that exact length.
- If `N` is the general `number` type (non-literal), degrades to `Array<T>`.
- Negative numbers produce `never`.

**Example** (Checking fixed-length tuples)

```ts
import type { Types } from "effect"

// Exactly 3 numbers
const triple: Types.TupleOf<3, number> = [1, 2, 3]

// @ts-expect-error - too few elements
const tooFew: Types.TupleOf<3, number> = [1, 2]

// @ts-expect-error - too many elements
const tooMany: Types.TupleOf<3, number> = [1, 2, 3, 4]
```

**See**

- `TupleOfAtLeast`

**Signature**

```ts
type TupleOf<N, T> = N extends N ? (number extends N ? Array<T> : TupleOf_<T, N, []>) : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Types.ts#L54)

Since v3.3.0

## TupleOfAtLeast (type alias)

Constructs a tuple type with at least `N` elements of type `T`.

**When to use**

Use when you need a minimum-length array type that still allows additional
elements. This is useful for variadic function signatures that require a
minimum arity.

**Details**

Produces a tuple with `N` fixed positions followed by `...Array<T>`.

**Example** (Checking minimum-length tuples)

```ts
import type { Types } from "effect"

// At least 2 strings
const ok1: Types.TupleOfAtLeast<2, string> = ["a", "b"]
const ok2: Types.TupleOfAtLeast<2, string> = ["a", "b", "c", "d"]

// @ts-expect-error - too few elements
const bad: Types.TupleOfAtLeast<2, string> = ["a"]
```

**See**

- `TupleOf`

**Signature**

```ts
type [...TupleOf<N, T>, ...T[]] = [...TupleOf<N, T>, ...Array<T>]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Types.ts#L87)

Since v3.3.0

# types

## DeepMutable (type alias)

Recursively removes `readonly` from all properties, including nested
objects, arrays, `Map`, and `Set`.

**When to use**

Use when you need a fully mutable version of a deeply readonly type.

**Details**

Recursion stops at primitives (`string`, `number`, `boolean`, `bigint`,
`symbol`) and functions.

**Example** (Converting deeply to mutable types)

```ts
import type { Types } from "effect"

type Deep = Types.DeepMutable<{
  readonly a: string
  readonly b: ReadonlyArray<{ readonly c: number }>
}>
// { a: string; b: Array<{ c: number }> }
```

**See**

- `Mutable`

**Signature**

```ts
type DeepMutable<T> =
  T extends ReadonlyMap<infer K, infer V>
    ? Map<DeepMutable<K>, DeepMutable<V>>
    : T extends ReadonlySet<infer V>
      ? Set<DeepMutable<V>>
      : T extends string | number | boolean | bigint | symbol | Function
        ? T
        : { -readonly [K in keyof T]: DeepMutable<T[K]> }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Types.ts#L512)

Since v3.1.0

## ExcludeReason (type alias)

Excludes a specific reason variant by its `_tag` from an error's `reason`
field.

**When to use**

Use when you need the remaining nested reason union type after removing
variants handled by `_tag`, rather than the enclosing error type.

**Details**

Returns `never` if `E` has no `reason` field.

**Example** (Excluding a reason variant)

```ts
import type { Types } from "effect"

type RateLimitError = { readonly _tag: "RateLimitError"; readonly retryAfter: number }
type QuotaError = { readonly _tag: "QuotaError"; readonly limit: number }
type ApiError = { readonly _tag: "ApiError"; readonly reason: RateLimitError | QuotaError }

type Result = Types.ExcludeReason<ApiError, "RateLimitError">
// { readonly _tag: "QuotaError"; readonly limit: number }
```

**See**

- `ExtractReason`
- `ReasonOf`
- `ReasonTags`

**Signature**

```ts
type ExcludeReason<E, K> = E extends { readonly reason: infer R } ? Exclude<R, { readonly _tag: K }> : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Types.ts#L1107)

Since v4.0.0

## ExcludeTag (type alias)

Excludes members of a tagged union by their `_tag` value.

**When to use**

Use to remove tagged-union members whose `_tag` matches a specific value in
type-level code.

**Details**

Non-tagged members of the union are preserved.

**Example** (Removing a variant)

```ts
import type { Types } from "effect"

type MyError =
  | { readonly _tag: "NotFound"; readonly id: string }
  | { readonly _tag: "Timeout"; readonly ms: number }
  | string

type WithoutTimeout = Types.ExcludeTag<MyError, "Timeout">
// { readonly _tag: "NotFound"; readonly id: string } | string
```

**See**

- `ExtractTag`
- `Tags`

**Signature**

```ts
type ExcludeTag<E, K> = Exclude<E, { readonly _tag: K }>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Types.ts#L154)

Since v2.0.0

## ExtractReason (type alias)

Extracts a specific reason variant by its `_tag` from an error's `reason`
field.

**When to use**

Use when you need the nested reason variant type itself, selected by `_tag`,
rather than the enclosing error type.

**Details**

Returns `never` if `E` has no matching reason variant.

**Example** (Extracting a reason variant)

```ts
import type { Types } from "effect"

type RateLimitError = { readonly _tag: "RateLimitError"; readonly retryAfter: number }
type QuotaError = { readonly _tag: "QuotaError"; readonly limit: number }
type ApiError = { readonly _tag: "ApiError"; readonly reason: RateLimitError | QuotaError }

type Result = Types.ExtractReason<ApiError, "RateLimitError">
// { readonly _tag: "RateLimitError"; readonly retryAfter: number }
```

**See**

- `ExcludeReason`
- `ReasonOf`
- `ReasonTags`

**Signature**

```ts
type ExtractReason<E, K> = E extends { readonly reason: infer R }
  ? R extends { readonly _tag: infer T }
    ? K extends T
      ? R
      : never
    : never
  : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Types.ts#L992)

Since v4.0.0

## ExtractTag (type alias)

Extracts a specific member of a tagged union by its `_tag` value.

**When to use**

Use to select tagged-union members whose `_tag` matches a specific value in
type-level code.

**Details**

Returns `never` if no member matches the tag.

**Example** (Extracting a variant)

```ts
import type { Types } from "effect"

type MyError = { readonly _tag: "NotFound"; readonly id: string } | { readonly _tag: "Timeout"; readonly ms: number }

type TimeoutError = Types.ExtractTag<MyError, "Timeout">
// { readonly _tag: "Timeout"; readonly ms: number }
```

**See**

- `ExcludeTag`
- `Tags`

**Signature**

```ts
type ExtractTag<E, K> = E extends { readonly _tag: infer T } ? (K extends T ? E : never) : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Types.ts#L187)

Since v2.0.0

## IsUnion (type alias)

Checks whether a type `T` is a union type.

**When to use**

Use to branch type-level logic depending on whether a type is a union.

**Details**

- Compares `[T]` against `[UnionToIntersection<T>]`. If they differ, `T`
  must be a union.
- Returns `true` if `T` is a union of two or more members.
- Returns `false` for single types, `never`, or `any`.

**Example** (Detecting union types)

```ts
import type { Types } from "effect"

type Yes = Types.IsUnion<"a" | "b"> // true
type No = Types.IsUnion<string> // false
```

**See**

- `UnionToIntersection`

**Signature**

```ts
type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Types.ts#L888)

Since v4.0.0

## Mutable (type alias)

Removes `readonly` from all properties of `T`. Supports arrays, tuples,
and records.

**When to use**

Use when you need a mutable version of a readonly type.

**Details**

Only affects the top level; nested properties remain readonly.

**Example** (Converting shallowly to mutable types)

```ts
import type { Types } from "effect"

type Obj = Types.Mutable<{
  readonly a: string
  readonly b: ReadonlyArray<number>
}>
// { a: string; b: ReadonlyArray<number> }
//   ^ mutable    ^ still readonly inside

type Arr = Types.Mutable<ReadonlyArray<string>>
// string[]

type Tup = Types.Mutable<readonly [string, number]>
// [string, number]
```

**See**

- `DeepMutable`

**Signature**

```ts
type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Types.ts#L478)

Since v2.0.0

## NarrowReason (type alias)

Narrows a specific reason variant by its `_tag` from an error's `reason`
field.

**When to use**

Use to preserve the original error shape while narrowing its nested reason
field to the matching variant.

**Details**

Returns `never` if `E` has no matching reason variant.

**Example** (Narrowing a reason variant)

```ts
import type { Types } from "effect"

type RateLimitError = { readonly _tag: "RateLimitError"; readonly retryAfter: number }
type QuotaError = { readonly _tag: "QuotaError"; readonly limit: number }
type ApiError = { readonly _tag: "ApiError"; readonly reason: RateLimitError | QuotaError }

type Result = Types.NarrowReason<ApiError, "RateLimitError">
// ApiError & { readonly reason: { readonly _tag: "RateLimitError"; readonly retryAfter: number } }
```

**See**

- `ExcludeReason`
- `ReasonOf`
- `ReasonTags`

**Signature**

```ts
type NarrowReason<E, K> = E extends { readonly reason: infer R }
  ? R extends { readonly _tag: infer T }
    ? K extends T
      ? E & { readonly reason: R }
      : never
    : never
  : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Types.ts#L1030)

Since v4.0.0

## NoExcessProperties (type alias)

Constrains a type to prevent excess properties not present in `T`.

**When to use**

Use to catch accidental extra properties in generic functions at compile time.

**Details**

Extra keys from `U` that are not in `T` are mapped to `never`.

**Example** (Preventing extra properties)

```ts
import type { Types } from "effect"

type Expected = { a: number; b: string }
type Input = { a: number; b: string; c: boolean }

type Result = Types.NoExcessProperties<Expected, Input>
// { a: number; b: string; readonly c: never }
```

**Signature**

```ts
type NoExcessProperties<T, U> = T & Readonly<Record<Exclude<keyof U, keyof T>, never>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Types.ts#L814)

Since v3.9.0

## NotFunction (type alias)

Excludes function types from a union, keeping only non-function members.

**When to use**

Use to filter out callable types from a union.

**Details**

Returns `never` if the entire union consists of function types.

**Example** (Filtering out functions)

```ts
import type { Types } from "effect"

type Result = Types.NotFunction<string | (() => void) | number>
// string | number
```

**Signature**

```ts
type NotFunction<T> = T extends Function ? never : T
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Types.ts#L786)

Since v2.0.0

## OmitReason (type alias)

Narrows an error's `reason` field to exclude a specific reason variant by
its `_tag`.

**When to use**

Use to narrow the error to only the remaining reason variants after
excluding the matched one.

**Details**

Returns `never` if `E` has no `reason` field or no remaining variants.

**Example** (Omitting a reason variant)

```ts
import type { Types } from "effect"

type RateLimitError = { readonly _tag: "RateLimitError"; readonly retryAfter: number }
type QuotaError = { readonly _tag: "QuotaError"; readonly limit: number }
type ApiError = { readonly _tag: "ApiError"; readonly reason: RateLimitError | QuotaError }

type Result = Types.OmitReason<ApiError, "RateLimitError">
// ApiError & { readonly reason: { readonly _tag: "QuotaError"; readonly limit: number } }
```

**See**

- `NarrowReason`
- `ExcludeReason`
- `ReasonOf`
- `ReasonTags`

**Signature**

```ts
type OmitReason<E, K> = E extends { readonly reason: infer R }
  ? R extends { readonly _tag: infer T }
    ? K extends T
      ? never
      : E & { readonly reason: R }
    : never
  : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Types.ts#L1069)

Since v4.0.0

## ReasonOf (type alias)

Extracts the `reason` type from an error that has a `reason` field.

**When to use**

Use when an error type stores nested sub-errors in a `reason` field and you
need that field's full union type as a standalone type.

**Details**

Returns `never` if `E` has no `reason` field.

**Example** (Extracting reason types)

```ts
import type { Types } from "effect"

type RateLimitError = { readonly _tag: "RateLimitError"; readonly retryAfter: number }
type QuotaError = { readonly _tag: "QuotaError"; readonly limit: number }
type ApiError = { readonly _tag: "ApiError"; readonly reason: RateLimitError | QuotaError }

type Reasons = Types.ReasonOf<ApiError>
// RateLimitError | QuotaError
```

**See**

- `ReasonTags`
- `ExtractReason`
- `ExcludeReason`

**Signature**

```ts
type ReasonOf<E> = E extends { readonly reason: infer R } ? R : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Types.ts#L922)

Since v4.0.0

## ReasonTags (type alias)

Extracts the `_tag` values from the `reason` type of an error.

**When to use**

Use to get the discriminant values available inside a nested `reason`
error union.

**Details**

This is shorthand for `Tags<ReasonOf<E>>`. It returns `never` if `E` has no
`reason` field or the reason has no `_tag`.

**Example** (Getting reason tags)

```ts
import type { Types } from "effect"

type RateLimitError = { readonly _tag: "RateLimitError"; readonly retryAfter: number }
type QuotaError = { readonly _tag: "QuotaError"; readonly limit: number }
type ApiError = { readonly _tag: "ApiError"; readonly reason: RateLimitError | QuotaError }

type Result = Types.ReasonTags<ApiError>
// "RateLimitError" | "QuotaError"
```

**See**

- `ReasonOf`
- `ExtractReason`

**Signature**

```ts
type ReasonTags<E> = E extends { readonly reason: { readonly _tag: string } } ? E["reason"]["_tag"] : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Types.ts#L956)

Since v4.0.0

## RequiredKeys (type alias)

Extracts the required keys from a type.

**When to use**

Use to derive the keys whose properties must be present on an object type.

**Signature**

```ts
type RequiredKeys<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? never : K }[keyof T]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Types.ts#L1121)

Since v4.0.0

## Simplify (type alias)

Flattens an intersection type into a single object type for readability.

**When to use**

Use to clean up IDE tooltips that show `A & B & C` instead of a merged
object.

**Details**

Does not change the type semantically, only its display.

**Example** (Simplifying an intersection)

```ts
import type { Types } from "effect"

// Without Simplify: IDE shows { a: number } & { b: string }
// With Simplify: IDE shows { a: number; b: string }
type Clean = Types.Simplify<{ a: number } & { b: string }>
```

**See**

- `MergeLeft`
- `MergeRight`

**Signature**

```ts
type Simplify<A> = {
  [K in keyof A]: A[K]
} extends infer B
  ? B
  : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Types.ts#L250)

Since v2.0.0

## Tags (type alias)

Extracts the `_tag` string literal types from a union.

**When to use**

Use to get all discriminant values from a tagged union type.

**Details**

Members without a `_tag` field are ignored and produce `never`.

**Example** (Extracting tags)

```ts
import type { Types } from "effect"

type MyError =
  | { readonly _tag: "NotFound"; readonly id: string }
  | { readonly _tag: "Timeout"; readonly ms: number }
  | string

type Result = Types.Tags<MyError>
// "NotFound" | "Timeout"
```

**See**

- `ExtractTag`
- `ExcludeTag`

**Signature**

```ts
type Tags<E> = E extends { readonly _tag: string } ? E["_tag"] : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Types.ts#L120)

Since v2.0.0

## UnionToIntersection (type alias)

Transforms a union type into an intersection type.

**When to use**

Use to combine all members of a union into a single type with all their
properties. This is useful in advanced generic code where you need to merge
union variants.

**Details**

- Uses distributive conditional types and contra-variant inference.
- If the union members are incompatible (e.g. `string | number`), the
  result is `never`.

**Example** (Converting a union to an intersection)

```ts
import type { Types } from "effect"

type Union = { a: string } | { b: number }
type Result = Types.UnionToIntersection<Union>
// { a: string } & { b: number }
```

**See**

- `IsUnion`

**Signature**

```ts
type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (x: infer R) => any ? R : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Types.ts#L219)

Since v2.0.0

## VoidIfEmpty (type alias)

Conditional type that returns `void` if `S` is an empty object type,
otherwise returns `S`.

**When to use**

Use to erase an empty object type from an API result or parameter position.

**Signature**

```ts
type VoidIfEmpty<S> = keyof S extends never ? void : S
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Types.ts#L761)

Since v3.19.20

## unassigned (interface)

Branded marker interface representing an unassigned type parameter.

**When to use**

Use when Effect's type-level machinery needs to represent a type parameter
that has not been assigned yet.

**Details**

Used internally by the Effect type system to indicate that a type parameter
has not been assigned a concrete type.

**See**

- `unhandled`

**Signature**

```ts
export interface unassigned {
  readonly _: unique symbol
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Types.ts#L834)

Since v4.0.0

## unhandled (interface)

Branded marker interface representing an unhandled error type.

**When to use**

Use when Effect's type-level machinery needs to represent an error type that
has not been handled yet.

**Details**

Used internally by the Effect type system to indicate that an error type
has not been handled.

**See**

- `unassigned`

**Signature**

```ts
export interface unhandled {
  readonly _: unique symbol
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Types.ts#L856)

Since v4.0.0

# utils

## Contravariant (namespace)

Namespace for `Contravariant`-related utilities.

**When to use**

Use when referring to type-level helpers nested under `Contravariant`.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Types.ts#L725)

Since v3.9.0

### Type (type alias)

Extracts the type parameter `A` from a `Contravariant<A>`.

**When to use**

Use to recover the carried type from a contravariant phantom marker.

**Example** (Extracting the inner type)

```ts
import type { Types } from "effect"

type Inner = Types.Contravariant.Type<Types.Contravariant<string>>
// string
```

**See**

- `Contravariant`

**Signature**

```ts
type Type<A> = A extends Contravariant<infer U> ? U : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Types.ts#L747)

Since v3.9.0

## Covariant (namespace)

Namespace for `Covariant`-related utilities.

**When to use**

Use when referring to type-level helpers nested under `Covariant`.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Types.ts#L657)

Since v3.9.0

### Type (type alias)

Extracts the type parameter `A` from a `Covariant<A>`.

**When to use**

Use to recover the carried type from a covariant phantom marker.

**Example** (Extracting the inner type)

```ts
import type { Types } from "effect"

type Inner = Types.Covariant.Type<Types.Covariant<string>>
// string
```

**See**

- `Covariant`

**Signature**

```ts
type Type<A> = A extends Covariant<infer U> ? U : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Types.ts#L679)

Since v3.9.0

## Invariant (namespace)

Namespace for `Invariant`-related utilities.

**When to use**

Use when referring to type-level helpers nested under `Invariant`.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Types.ts#L589)

Since v3.9.0

### Type (type alias)

Extracts the type parameter `A` from an `Invariant<A>`.

**When to use**

Use to recover the carried type from an invariant phantom marker.

**Example** (Extracting the inner type)

```ts
import type { Types } from "effect"

type Inner = Types.Invariant.Type<Types.Invariant<number>>
// number
```

**See**

- `Invariant`

**Signature**

```ts
type Type<A> = A extends Invariant<infer U> ? U : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Types.ts#L611)

Since v3.9.0
