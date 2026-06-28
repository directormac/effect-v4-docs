---
title: AsyncResult.ts
nav_order: 302
parent: "effect"
---

## AsyncResult.ts overview

Represents observable state for asynchronous values.

`AsyncResult<A, E>` records whether asynchronous work has no value yet,
succeeded with an `A`, or failed with an `E`. Every state also carries a
`waiting` flag, so callers can keep showing the current value while newer
work is loading, refreshing, retrying, or recovering. This module includes
constructors, checks, accessors, mapping and matching helpers, ways to combine
several results, and schemas for encoding or decoding results.

Since v4.0.0

---

## Exports Grouped by Category

- [accessors](#accessors)
  - [cause](#cause)
  - [error](#error)
  - [getOrElse](#getorelse)
  - [getOrThrow](#getorthrow)
  - [value](#value)
- [combinators](#combinators)
  - [all](#all)
  - [flatMap](#flatmap)
  - [map](#map)
  - [match](#match)
  - [matchWithError](#matchwitherror)
  - [matchWithWaiting](#matchwithwaiting)
  - [replacePrevious](#replaceprevious)
  - [toExit](#toexit)
  - [touch](#touch)
- [constructors](#constructors)
  - [builder](#builder)
  - [fail](#fail)
  - [failWithPrevious](#failwithprevious)
  - [failure](#failure)
  - [failureWithPrevious](#failurewithprevious)
  - [fromExit](#fromexit)
  - [fromExitWithPrevious](#fromexitwithprevious)
  - [initial](#initial)
  - [success](#success)
  - [waiting](#waiting)
  - [waitingFrom](#waitingfrom)
- [guards](#guards)
  - [isAsyncResult](#isasyncresult)
- [models](#models)
  - [AsyncResult (type alias)](#asyncresult-type-alias)
  - [Builder (type alias)](#builder-type-alias)
  - [Defect (interface)](#defect-interface)
  - [Failure (interface)](#failure-interface)
  - [Initial (interface)](#initial-interface)
  - [Interrupt (interface)](#interrupt-interface)
  - [Success (interface)](#success-interface)
- [refinements](#refinements)
  - [isFailure](#isfailure)
  - [isInitial](#isinitial)
  - [isInterrupted](#isinterrupted)
  - [isNotInitial](#isnotinitial)
  - [isSuccess](#issuccess)
  - [isWaiting](#iswaiting)
- [schemas](#schemas)
  - [Schema](#schema)
  - [Schema (interface)](#schema-interface)
- [type IDs](#type-ids)
  - [TypeId](#typeid)
  - [TypeId (type alias)](#typeid-type-alias)
- [utility types](#utility-types)
  - [With (type alias)](#with-type-alias)
- [utils](#utils)
  - [AsyncResult (namespace)](#asyncresult-namespace)
    - [Proto (interface)](#proto-interface)
    - [Success (type alias)](#success-type-alias)
    - [Failure (type alias)](#failure-type-alias)

---

# accessors

## cause

Returns the failure cause when the result is a `Failure`, otherwise `None`.

**Signature**

```ts
declare const cause: <A, E>(self: AsyncResult<A, E>) => Option.Option<Cause.Cause<E>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AsyncResult.ts#L450)

Since v4.0.0

## error

Returns the first typed error from a failure cause, or `None` for successes, initial results, defects, and interrupt-only causes.

**Signature**

```ts
declare const error: <A, E>(self: AsyncResult<A, E>) => Option.Option<E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AsyncResult.ts#L459)

Since v4.0.0

## getOrElse

Returns the available value from `value`, or evaluates the fallback when no current or previous success exists.

**Signature**

```ts
declare const getOrElse: {
  <B>(orElse: LazyArg<B>): <A, E>(self: AsyncResult<A, E>) => A | B
  <A, E, B>(self: AsyncResult<A, E>, orElse: LazyArg<B>): A | B
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AsyncResult.ts#L430)

Since v4.0.0

## getOrThrow

Returns the available value from `value`, or throws `NoSuchElementError` when no current or previous success exists.

**Signature**

```ts
declare const getOrThrow: <A, E>(self: AsyncResult<A, E>) => A
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AsyncResult.ts#L441)

Since v4.0.0

## value

Returns the current success value, or the previous success value stored in a failure, as an `Option`.

**Signature**

```ts
declare const value: <A, E>(self: AsyncResult<A, E>) => Option.Option<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AsyncResult.ts#L415)

Since v4.0.0

# combinators

## all

Combines an iterable or record of `AsyncResult` and plain values into one `AsyncResult`, returning the first non-success result or a success of the collected values marked waiting when any input success is waiting.

**Signature**

```ts
declare const all: <const Arg extends Iterable<any> | Record<string, any>>(
  results: Arg
) => AsyncResult<
  [Arg] extends [ReadonlyArray<any>]
    ? { -readonly [K in keyof Arg]: [Arg[K]] extends [AsyncResult<infer _A, infer _E>] ? _A : Arg[K] }
    : [Arg] extends [Iterable<infer _A>]
      ? _A extends AsyncResult<infer _AA, infer _E>
        ? _AA
        : _A
      : [Arg] extends [Record<string, any>]
        ? { -readonly [K in keyof Arg]: [Arg[K]] extends [AsyncResult<infer _A, infer _E>] ? _A : Arg[K] }
        : never,
  [Arg] extends [ReadonlyArray<any>]
    ? AsyncResult.Failure<Arg[number]>
    : [Arg] extends [Iterable<infer _A>]
      ? AsyncResult.Failure<_A>
      : [Arg] extends [Record<string, any>]
        ? AsyncResult.Failure<Arg[keyof Arg]>
        : never
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AsyncResult.ts#L672)

Since v4.0.0

## flatMap

Maps the success value of an `AsyncResult` and flattens the result.

**When to use**

Use to sequence computations that may return another `AsyncResult` while
preserving initial and failure states.

**Details**

Initial results are left unchanged. Failures preserve their cause and remap
the stored previous success when the mapping function returns a success.

**Signature**

```ts
declare const flatMap: {
  <A, E, B, E2>(
    f: (a: A, prev: Success<A, E>) => AsyncResult<A, E2>
  ): (self: AsyncResult<A, E>) => AsyncResult<B, E | E2>
  <E, A, B, E2>(self: AsyncResult<A, E>, f: (a: A, prev: Success<A, E>) => AsyncResult<B, E2>): AsyncResult<B, E | E2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AsyncResult.ts#L523)

Since v4.0.0

## map

Maps the success value of an `AsyncResult`, also mapping any previous success stored in a failure while leaving initial results unchanged.

**Signature**

```ts
declare const map: {
  <A, B>(f: (a: A) => B): <E>(self: AsyncResult<A, E>) => AsyncResult<B, E>
  <E, A, B>(self: AsyncResult<A, E>, f: (a: A) => B): AsyncResult<B, E>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AsyncResult.ts#L490)

Since v4.0.0

## match

Pattern matches an `AsyncResult` by calling the handler for `Initial`, `Failure`, or `Success`.

**Signature**

```ts
declare const match: {
  <A, E, X, Y, Z>(options: {
    readonly onInitial: (_: Initial<A, E>) => X
    readonly onFailure: (_: Failure<A, E>) => Y
    readonly onSuccess: (_: Success<A, E>) => Z
  }): (self: AsyncResult<A, E>) => X | Y | Z
  <A, E, X, Y, Z>(
    self: AsyncResult<A, E>,
    options: {
      readonly onInitial: (_: Initial<A, E>) => X
      readonly onFailure: (_: Failure<A, E>) => Y
      readonly onSuccess: (_: Success<A, E>) => Z
    }
  ): X | Y | Z
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AsyncResult.ts#L557)

Since v4.0.0

## matchWithError

Pattern matches a result, handling successes and initials directly while splitting failures into typed errors or squashed non-error causes passed to `onDefect`.

**Signature**

```ts
declare const matchWithError: {
  <A, E, W, X, Y, Z>(options: {
    readonly onInitial: (_: Initial<A, E>) => W
    readonly onError: (error: E, _: Failure<A, E>) => X
    readonly onDefect: (defect: unknown, _: Failure<A, E>) => Y
    readonly onSuccess: (_: Success<A, E>) => Z
  }): (self: AsyncResult<A, E>) => W | X | Y | Z
  <A, E, W, X, Y, Z>(
    self: AsyncResult<A, E>,
    options: {
      readonly onInitial: (_: Initial<A, E>) => W
      readonly onError: (error: E, _: Failure<A, E>) => X
      readonly onDefect: (defect: unknown, _: Failure<A, E>) => Y
      readonly onSuccess: (_: Success<A, E>) => Z
    }
  ): W | X | Y | Z
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AsyncResult.ts#L589)

Since v4.0.0

## matchWithWaiting

Pattern matches a result by calling `onWaiting` for waiting or initial states, otherwise handling successes and splitting failures into typed errors or squashed non-error causes.

**Signature**

```ts
declare const matchWithWaiting: {
  <A, E, W, X, Y, Z>(options: {
    readonly onWaiting: (_: AsyncResult<A, E>) => W
    readonly onError: (error: E, _: Failure<A, E>) => X
    readonly onDefect: (defect: unknown, _: Failure<A, E>) => Y
    readonly onSuccess: (_: Success<A, E>) => Z
  }): (self: AsyncResult<A, E>) => W | X | Y | Z
  <A, E, W, X, Y, Z>(
    self: AsyncResult<A, E>,
    options: {
      readonly onWaiting: (_: AsyncResult<A, E>) => W
      readonly onError: (error: E, _: Failure<A, E>) => X
      readonly onDefect: (defect: unknown, _: Failure<A, E>) => Y
      readonly onSuccess: (_: Success<A, E>) => Z
    }
  ): W | X | Y | Z
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AsyncResult.ts#L629)

Since v4.0.0

## replacePrevious

Replaces a `Failure` value's stored previous success with the latest success
found in another result.

**Signature**

```ts
declare const replacePrevious: <R extends AsyncResult<any, any>, XE, A>(
  self: R,
  previous: Option.Option<AsyncResult<A, XE>>
) => With<R, A, AsyncResult.Failure<R>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AsyncResult.ts#L399)

Since v4.0.0

## toExit

Converts a result to an `Exit`, succeeding with a success value, failing with a failure cause, or failing with `NoSuchElementError` for `Initial`.

**Signature**

```ts
declare const toExit: <A, E>(self: AsyncResult<A, E>) => Exit.Exit<A, E | Cause.NoSuchElementError>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AsyncResult.ts#L468)

Since v4.0.0

## touch

Refreshes the timestamp of a `Success` result while preserving its value and waiting flag; non-success results are returned unchanged.

**Signature**

```ts
declare const touch: <A extends AsyncResult<any, any>>(result: A) => A
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AsyncResult.ts#L385)

Since v4.0.0

# constructors

## builder

Creates a typed builder for rendering an `AsyncResult` by handling waiting, initial, success, error, defect, interrupt, and failure cases.

**Signature**

```ts
declare const builder: <A extends AsyncResult<any, any>>(
  self: A
) => Builder<
  never,
  A extends Success<infer _A, infer _E> ? _A : never,
  A extends Failure<infer _A, infer _E> ? _E : never,
  A extends Initial<infer _A, infer _E> ? true : never,
  A extends Failure<infer _A, infer _E> ? Defect | Interrupt : never
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AsyncResult.ts#L716)

Since v4.0.0

## fail

Creates a `Failure` result from a typed error, wrapping it in `Cause.fail`.

**Signature**

```ts
declare const fail: <E, A = never>(
  error: E,
  options?: {
    readonly previousSuccess?: Option.Option<Success<A, E>> | undefined
    readonly waiting?: boolean | undefined
  }
) => Failure<A, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AsyncResult.ts#L340)

Since v4.0.0

## failWithPrevious

Creates a `Failure` result from a typed error while carrying forward the latest success stored in a previous result.

**Signature**

```ts
declare const failWithPrevious: <A, E>(
  error: E,
  options: { readonly previous: Option.Option<AsyncResult<A, E>>; readonly waiting?: boolean | undefined }
) => Failure<A, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AsyncResult.ts#L351)

Since v4.0.0

## failure

Creates a `Failure` result from a `Cause`, optionally preserving a previous success and marking the result as waiting.

**Signature**

```ts
declare const failure: <A, E = never>(
  cause: Cause.Cause<E>,
  options?: {
    readonly previousSuccess?: Option.Option<Success<A, E>> | undefined
    readonly waiting?: boolean | undefined
  }
) => Failure<A, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AsyncResult.ts#L296)

Since v4.0.0

## failureWithPrevious

Creates a `Failure` result from a `Cause`, carrying forward the latest success stored in a previous result.

**Signature**

```ts
declare const failureWithPrevious: <A, E>(
  cause: Cause.Cause<E>,
  options: { readonly previous: Option.Option<AsyncResult<A, E>>; readonly waiting?: boolean | undefined }
) => Failure<A, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AsyncResult.ts#L317)

Since v4.0.0

## fromExit

Converts an `Exit` into a `Success` when it succeeds or a `Failure` carrying the exit cause when it fails.

**Signature**

```ts
declare const fromExit: <A, E>(exit: Exit.Exit<A, E>) => Success<A, E> | Failure<A, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AsyncResult.ts#L165)

Since v4.0.0

## fromExitWithPrevious

Converts an `Exit` to a result, preserving the latest previous success when the exit is a failure.

**Signature**

```ts
declare const fromExitWithPrevious: <A, E>(
  exit: Exit.Exit<A, E>,
  previous: Option.Option<AsyncResult<A, E>>
) => Success<A, E> | Failure<A, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AsyncResult.ts#L174)

Since v4.0.0

## initial

Creates an `Initial` result, optionally marking it as waiting.

**Signature**

```ts
declare const initial: <A = never, E = never>(waiting?: boolean) => Initial<A, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AsyncResult.ts#L216)

Since v4.0.0

## success

Creates a `Success` result with a value and optional `waiting` flag or timestamp override.

**Signature**

```ts
declare const success: <A, E = never>(
  value: A,
  options?: { readonly waiting?: boolean | undefined; readonly timestamp?: number | undefined }
) => Success<A, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AsyncResult.ts#L249)

Since v4.0.0

## waiting

Marks an `AsyncResult` as waiting, optionally touching the timestamp when the result is a `Success`.

**Signature**

```ts
declare const waiting: <R extends AsyncResult<any, any>>(
  self: R,
  options?: { readonly touch?: boolean | undefined }
) => R
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AsyncResult.ts#L365)

Since v4.0.0

## waitingFrom

Creates a waiting result from an optional previous result, using `Initial(true)` when no previous result exists.

**Signature**

```ts
declare const waitingFrom: <A, E>(previous: Option.Option<AsyncResult<A, E>>) => AsyncResult<A, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AsyncResult.ts#L186)

Since v4.0.0

# guards

## isAsyncResult

Returns `true` when a value is an `AsyncResult`.

**Signature**

```ts
declare const isAsyncResult: (u: unknown) => u is AsyncResult<unknown, unknown>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AsyncResult.ts#L61)

Since v4.0.0

# models

## AsyncResult (type alias)

Represents the state of an asynchronous value as `Initial`, `Success`, or `Failure`, with a `waiting` flag for in-flight refreshes.

**Signature**

```ts
type AsyncResult<A, E> = Initial<A, E> | Success<A, E> | Failure<A, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AsyncResult.ts#L53)

Since v4.0.0

## Builder (type alias)

Fluent renderer for `AsyncResult` values that tracks unhandled cases at the type level and exposes `exhaustive` only after all possible cases are handled.

**Signature**

```ts
type Builder<Out, A, E, I, F> = Pipeable & {
  onWaiting<B>(f: (result: AsyncResult<A, E>) => B): Builder<Out | B, A, E, I, F>
  orElse<B>(orElse: LazyArg<B>): Out | B
  orNull(): Out | null
  render(): [A | I] extends [never] ? Out : Out | null
} & ([A | E | I | F] extends [never]
    ? {
        exhaustive(): Out
      }
    : unknown) &
  ([I] extends [never]
    ? unknown
    : {
        onInitial<B>(f: (result: Initial<A, E>) => B): Builder<Out | B, A, E, never, F>
        onInitialOrWaiting<B>(f: (result: AsyncResult<A, E>) => B): Builder<Out | B, A, E, never, F>
      }) &
  ([A] extends [never]
    ? unknown
    : {
        onSuccess<B>(f: (value: A, result: Success<A, E>) => B): Builder<Out | B, never, E, I, F>
      }) &
  ([E] extends [never]
    ? unknown
    : {
        onError<B>(f: (error: E, result: Failure<A, E>) => B): Builder<Out | B, A, never, I, F>

        onErrorIf<B extends E, C>(
          refinement: Refinement<E, B>,
          f: (error: B, result: Failure<A, E>) => C
        ): Builder<Out | C, A, Types.EqualsWith<E, B, E, Exclude<E, B>>, I, F>
        onErrorIf<C>(predicate: Predicate<E>, f: (error: E, result: Failure<A, E>) => C): Builder<Out | C, A, E, I, F>

        onErrorTag<const Tags extends ReadonlyArray<Types.Tags<E>>, B>(
          tags: Tags,
          f: (error: Types.ExtractTag<E, Tags[number]>, result: Failure<A, E>) => B
        ): Builder<Out | B, A, Types.ExcludeTag<E, Tags[number]>, I, F>
        onErrorTag<const Tag extends Types.Tags<E>, B>(
          tag: Tag,
          f: (error: Types.ExtractTag<E, Tag>, result: Failure<A, E>) => B
        ): Builder<Out | B, A, Types.ExcludeTag<E, Tag>, I, F>
      }) &
  ([E | F] extends [never]
    ? unknown
    : {
        onFailure<B>(f: (cause: Cause.Cause<E>, result: Failure<A, E>) => B): Builder<Out | B, A, never, I, never>
      }) &
  (Interrupt extends F
    ? {
        onInterrupt<B>(
          f: (interruptors: ReadonlySet<number>, result: Failure<A, E>) => B
        ): Builder<Out | B, A, E, I, Exclude<F, Interrupt>>
      }
    : unknown) &
  (Defect extends F
    ? {
        onDefect<B>(f: (defect: unknown, result: Failure<A, E>) => B): Builder<Out | B, A, E, I, Exclude<F, Defect>>
      }
    : unknown)
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AsyncResult.ts#L750)

Since v4.0.0

## Defect (interface)

Type marker used by `Builder` to track whether defect failures still need to be handled.

**Signature**

```ts
export interface Defect {
  readonly _: unique symbol
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AsyncResult.ts#L730)

Since v4.0.0

## Failure (interface)

Failed `AsyncResult` containing a failure cause and the latest previous success when one is available.

**Signature**

```ts
export interface Failure<A, E = never> extends AsyncResult.Proto<A, E> {
  readonly _tag: "Failure"
  readonly cause: Cause.Cause<E>
  readonly previousSuccess: Option.Option<Success<A, E>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AsyncResult.ts#L267)

Since v4.0.0

## Initial (interface)

Initial `AsyncResult` state before a success value or failure cause is available.

**Signature**

```ts
export interface Initial<A, E = never> extends AsyncResult.Proto<A, E> {
  readonly _tag: "Initial"
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AsyncResult.ts#L155)

Since v4.0.0

## Interrupt (interface)

Type marker used by `Builder` to track whether interrupt failures still need to be handled.

**Signature**

```ts
export interface Interrupt {
  readonly _: unique symbol
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AsyncResult.ts#L740)

Since v4.0.0

## Success (interface)

Successful `AsyncResult` containing the current value, its timestamp, and the shared waiting flag.

**Signature**

```ts
export interface Success<A, E = never> extends AsyncResult.Proto<A, E> {
  readonly _tag: "Success"
  readonly value: A
  readonly timestamp: number
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AsyncResult.ts#L229)

Since v4.0.0

# refinements

## isFailure

Returns `true` when an `AsyncResult` is a `Failure`.

**Signature**

```ts
declare const isFailure: <A, E>(result: AsyncResult<A, E>) => result is Failure<A, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AsyncResult.ts#L279)

Since v4.0.0

## isInitial

Returns `true` when an `AsyncResult` is in the `Initial` state.

**Signature**

```ts
declare const isInitial: <A, E>(result: AsyncResult<A, E>) => result is Initial<A, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AsyncResult.ts#L199)

Since v4.0.0

## isInterrupted

Returns `true` when an `AsyncResult` is a `Failure` whose cause contains only interruptions.

**Signature**

```ts
declare const isInterrupted: <A, E>(result: AsyncResult<A, E>) => result is Failure<A, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AsyncResult.ts#L287)

Since v4.0.0

## isNotInitial

Returns `true` when an `AsyncResult` is either `Success` or `Failure`.

**Signature**

```ts
declare const isNotInitial: <A, E>(result: AsyncResult<A, E>) => result is Success<A, E> | Failure<A, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AsyncResult.ts#L207)

Since v4.0.0

## isSuccess

Returns `true` when an `AsyncResult` is a `Success`.

**Signature**

```ts
declare const isSuccess: <A, E>(result: AsyncResult<A, E>) => result is Success<A, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AsyncResult.ts#L241)

Since v4.0.0

## isWaiting

Returns whether an `AsyncResult` is currently waiting for an asynchronous computation or refresh to finish.

**Signature**

```ts
declare const isWaiting: <A, E>(result: AsyncResult<A, E>) => boolean
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AsyncResult.ts#L147)

Since v4.0.0

# schemas

## Schema

Creates a schema for `AsyncResult` values using optional schemas for success values and failure errors.

**Signature**

```ts
declare const Schema: <
  A extends Schema_.Constraint = Schema_.Never,
  E extends Schema_.Constraint = Schema_.Never
>(options: {
  readonly success?: A | undefined
  readonly error?: E | undefined
}) => Schema<A, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AsyncResult.ts#L945)

Since v4.0.0

## Schema (interface)

Schema interface for `AsyncResult` values, retaining the schemas used for success values and failure errors.

**Signature**

```ts
export interface Schema<
  Success extends Schema_.Constraint,
  Error extends Schema_.Constraint
> extends Schema_.declareConstructor<
  AsyncResult<Success["Type"], Error["Type"]>,
  AsyncResult<Success["Encoded"], Error["Encoded"]>,
  readonly [Success, Schema_.Cause<Error, Schema_.Defect>]
> {
  readonly success: Success
  readonly error: Error
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AsyncResult.ts#L925)

Since v4.0.0

# type IDs

## TypeId

Runtime identifier attached to `AsyncResult` values and used by `isAsyncResult`.

**Signature**

```ts
declare const TypeId: "~effect/reactivity/AsyncResult"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AsyncResult.ts#L45)

Since v4.0.0

## TypeId (type alias)

Type-level identifier used to recognize `AsyncResult` values.

**Signature**

```ts
type TypeId = "~effect/reactivity/AsyncResult"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AsyncResult.ts#L37)

Since v4.0.0

# utility types

## With (type alias)

Rebuilds an `AsyncResult` with new success and failure types while preserving the variant of another result.

**Signature**

```ts
type With<R, A, E> =
  R extends Initial<infer _A, infer _E>
    ? Initial<A, E>
    : R extends Success<infer _A, infer _E>
      ? Success<A, E>
      : R extends Failure<infer _A, infer _E>
        ? Failure<A, E>
        : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AsyncResult.ts#L106)

Since v4.0.0

# utils

## AsyncResult (namespace)

Namespace containing type-level helpers and the shared prototype shape for `AsyncResult` values.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AsyncResult.ts#L68)

Since v4.0.0

### Proto (interface)

Common prototype fields implemented by every `AsyncResult` variant, including pipeability, the type marker, phantom type members, and the `waiting` flag.

**Signature**

```ts
export interface Proto<A, E> extends Pipeable {
  readonly [TypeId]: {
    readonly E: (_: never) => E
    readonly A: (_: never) => A
  }
  readonly waiting: boolean
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AsyncResult.ts#L75)

Since v4.0.0

### Success (type alias)

Extracts the success value type from an `AsyncResult`.

**Signature**

```ts
type Success<R> = R extends AsyncResult<infer A, infer _> ? A : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AsyncResult.ts#L89)

Since v4.0.0

### Failure (type alias)

Extracts the failure error type from an `AsyncResult`.

**Signature**

```ts
type Failure<R> = R extends AsyncResult<infer _, infer E> ? E : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AsyncResult.ts#L97)

Since v4.0.0
