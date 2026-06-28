---
title: Result.ts
nav_order: 94
parent: "effect"
---

## Result.ts overview

Models a value that has already succeeded or failed.

A `Result<A, E>` is `Success<A, E>` when a value is available and
`Failure<A, E>` when an error is available. It is plain data, so inspecting
or transforming it does not run side effects. This module includes helpers
for creating, checking, mapping, combining, and extracting results, plus
conversions to and from `Option` and nullable values.

Since v4.0.0

---

## Exports Grouped by Category

- [Transposing](#transposing)
  - [transposeMapOption](#transposemapoption)
  - [transposeOption](#transposeoption)
- [constructors](#constructors)
  - [fail](#fail)
  - [failVoid](#failvoid)
  - [fromNullishOr](#fromnullishor)
  - [fromOption](#fromoption)
  - [liftPredicate](#liftpredicate)
  - [succeed](#succeed)
  - [succeedNone](#succeednone)
  - [succeedSome](#succeedsome)
  - [try](#try)
  - [void](#void)
- [do notation](#do-notation)
  - [Do](#do)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [let](#let)
- [error handling](#error-handling)
  - [orElse](#orelse)
- [filtering](#filtering)
  - [filterOrFail](#filterorfail)
- [generators](#generators)
  - [ResultIterator (interface)](#resultiterator-interface)
  - [gen](#gen)
- [getters](#getters)
  - [getFailure](#getfailure)
  - [getOrElse](#getorelse)
  - [getOrNull](#getornull)
  - [getOrThrow](#getorthrow)
  - [getOrThrowWith](#getorthrowwith)
  - [getOrUndefined](#getorundefined)
  - [getSuccess](#getsuccess)
  - [merge](#merge)
- [guards](#guards)
  - [isFailure](#isfailure)
  - [isResult](#isresult)
  - [isSuccess](#issuccess)
- [instances](#instances)
  - [makeEquivalence](#makeequivalence)
- [mapping](#mapping)
  - [map](#map)
  - [mapBoth](#mapboth)
  - [mapError](#maperror)
  - [tap](#tap)
- [models](#models)
  - [Failure (interface)](#failure-interface)
  - [Result (type alias)](#result-type-alias)
  - [ResultUnify (interface)](#resultunify-interface)
  - [ResultUnifyIgnore (interface)](#resultunifyignore-interface)
  - [Success (interface)](#success-interface)
- [pattern matching](#pattern-matching)
  - [match](#match)
- [sequencing](#sequencing)
  - [all](#all)
  - [andThen](#andthen)
  - [flatMap](#flatmap)
- [transforming](#transforming)
  - [flip](#flip)
- [type lambdas](#type-lambdas)
  - [ResultTypeLambda (interface)](#resulttypelambda-interface)
- [utils](#utils)
  - [Result (namespace)](#result-namespace)
    - [Failure (type alias)](#failure-type-alias)
    - [Success (type alias)](#success-type-alias)

---

# Transposing

## transposeMapOption

Maps an `Option` value with a `Result`-producing function, then transposes
the structure from `Option<Result<B, E>>` to `Result<Option<B>, E>`.

**When to use**

Use when an optional value should be validated only when present, preserving
absence as a successful `None`.

**Details**

- `None` becomes `Success(None)` (the function is never called)
- `Some(a)` where `f(a)` is `Success(b)` becomes `Success(Some(b))`
- `Some(a)` where `f(a)` is `Failure(e)` becomes `Failure(e)`

**Example** (Mapping and transposing in one step)

```ts
import { Option, Result } from "effect"

const parse = (s: string) => (isNaN(Number(s)) ? Result.fail("not a number" as const) : Result.succeed(Number(s)))

console.log(Result.transposeMapOption(Option.some("42"), parse))
// Output: { _tag: "Success", success: { _tag: "Some", value: 42 }, ... }

console.log(Result.transposeMapOption(Option.none(), parse))
// Output: { _tag: "Success", success: { _tag: "None" }, ... }
```

**See**

- `transposeOption` when the Option already contains a Result

**Signature**

```ts
declare const transposeMapOption: (<A, B, E = never>(
  f: (self: A) => Result<B, E>
) => (self: Option<A>) => Result<Option<B>, E>) &
  (<A, B, E = never>(self: Option<A>, f: (self: A) => Result<B, E>) => Result<Option<B>, E>)
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Result.ts#L1832)

Since v3.15.0

## transposeOption

Transforms `Option<Result<A, E>>` into `Result<Option<A>, E>`.

**When to use**

Use when optional absence should be treated as a successful `None`, while an
inner `Result` failure should still fail the whole result.

**Details**

- `None` becomes `Success(None)`
- `Some(Success(a))` becomes `Success(Some(a))`
- `Some(Failure(e))` becomes `Failure(e)`

**Example** (Transposing an Option of a Result)

```ts
import { Option, Result } from "effect"

const some = Option.some(Result.succeed(42))
console.log(Result.transposeOption(some))
// Output: { _tag: "Success", success: { _tag: "Some", value: 42 }, ... }

const none = Option.none<Result.Result<number, string>>()
console.log(Result.transposeOption(none))
// Output: { _tag: "Success", success: { _tag: "None" }, ... }
```

**See**

- `transposeMapOption` to map and transpose in one step

**Signature**

```ts
declare const transposeOption: <A = never, E = never>(self: Option<Result<A, E>>) => Result<Option<A>, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Result.ts#L1789)

Since v3.14.0

# constructors

## fail

Creates a `Result` holding a `Failure` value.

**When to use**

Use to represent a failed `Result` with a typed failure value.

**Details**

- The success type `A` defaults to `never`

**Example** (Creating a failure)

```ts
import { Result } from "effect"

const result = Result.fail("Something went wrong")

console.log(Result.isFailure(result))
// Output: true
```

**See**

- `succeed` to create a Success
- `mapError` to transform the error

**Signature**

```ts
declare const fail: <E>(left: E) => Result<never, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Result.ts#L314)

Since v4.0.0

## failVoid

Provides a pre-built failed `Result` whose failure value is `undefined`.

**When to use**

Use when you need a failed `Result` value that acts only as a control signal
without failure data.

**Details**

This is equivalent to `Result.fail(undefined)` with type
`Result<never, void>`, but reuses a shared `Failure` wrapper instead of
allocating one each time.

**Example** (Failing without a payload)

```ts
import { Result } from "effect"

const result = Result.failVoid

console.log(Result.isFailure(result))
// Output: true
```

**See**

- `fail` to create a Failure with a specific value

**Signature**

```ts
declare const failVoid: Result<never, void>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Result.ts#L380)

Since v4.0.0

## fromNullishOr

Converts a possibly `null` or `undefined` value into a `Result`.

**When to use**

Use when you need `null` or `undefined` input to become a `Failure` while
present values remain available as `Success`.

**Details**

- Non-nullish values become `Success<NonNullable<A>>`
- `null` or `undefined` becomes `Failure<E>` using the provided function
- Supports both data-first and data-last (piped) usage
- The `onNullish` callback receives the original value

**Example** (Handling nullable values)

```ts
import { Result } from "effect"

console.log(Result.fromNullishOr(1, () => "fallback"))
// Output: { _tag: "Success", success: 1, ... }

console.log(Result.fromNullishOr(null, () => "fallback"))
// Output: { _tag: "Failure", failure: "fallback", ... }
```

**See**

- `fromOption` to convert from an Option
- `succeed` / `fail` for direct construction

**Signature**

```ts
declare const fromNullishOr: {
  <A, E>(onNullish: (a: A) => E): (self: A) => Result<NonNullable<A>, E>
  <A, E>(self: A, onNullish: (a: A) => E): Result<NonNullable<A>, E>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Result.ts#L415)

Since v4.0.0

## fromOption

Converts an `Option<A>` into a `Result<A, E>`.

**When to use**

Use when an existing `Option` should become a `Result`, preserving `Some` as
success and turning `None` into a caller-provided failure.

**Details**

- `Some<A>` becomes `Success<A>`
- `None` becomes `Failure<E>` using the provided function
- Supports both data-first and data-last (piped) usage

**Example** (Converting an Option to a Result)

```ts
import { Option, Result } from "effect"

const some = Result.fromOption(Option.some(1), () => "missing")
console.log(some)
// Output: { _tag: "Success", success: 1, ... }

const none = Result.fromOption(Option.none(), () => "missing")
console.log(none)
// Output: { _tag: "Failure", failure: "missing", ... }
```

**See**

- `getSuccess` to extract the success value as an Option
- `getFailure` to extract the failure value as an Option
- `fromNullishOr` to build a Result from nullable values

**Signature**

```ts
declare const fromOption: {
  <E>(onNone: () => E): <A>(self: Option<A>) => Result<A, E>
  <A, E>(self: Option<A>, onNone: () => E): Result<A, E>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Result.ts#L459)

Since v2.0.0

## liftPredicate

Lifts a value into a `Result` based on a predicate or refinement.

**When to use**

Use to construct a `Result` from a raw value guarded by a predicate or
refinement.

**Details**

- If the predicate returns `true`, the value becomes `Success<A>`
- If the predicate returns `false`, `orFailWith` produces the error for `Failure<E>`
- Also accepts a `Refinement` to narrow the success type
- Supports both data-first and data-last (piped) usage

**Example** (Validating a number)

```ts
import { pipe, Result } from "effect"

const ensurePositive = pipe(
  5,
  Result.liftPredicate(
    (n: number) => n > 0,
    (n) => `${n} is not positive`
  )
)
console.log(ensurePositive)
// Output: { _tag: "Success", success: 5, ... }
```

**See**

- `filterOrFail` to validate a value that is already in a `Result`
- `fromNullishOr` for nullable-based construction

**Signature**

```ts
declare const liftPredicate: {
  <A, B extends A, E>(refinement: Refinement<A, B>, orFailWith: (a: A) => E): (a: A) => Result<B, E>
  <B extends A, E, A = B>(predicate: Predicate<A>, orFailWith: (a: A) => E): (a: B) => Result<B, E>
  <A, E, B extends A>(self: A, refinement: Refinement<A, B>, orFailWith: (a: A) => E): Result<B, E>
  <B extends A, E, A = B>(self: B, predicate: Predicate<A>, orFailWith: (a: A) => E): Result<B, E>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Result.ts#L959)

Since v3.4.0

## succeed

Creates a `Result` holding a `Success` value.

**Details**

- Use when you have a value and want to lift it into the `Result` type
- The error type `E` defaults to `never`

**Example** (Wrapping a value)

```ts
import { Result } from "effect"

const result = Result.succeed(42)

console.log(Result.isSuccess(result))
// Output: true
```

**See**

- `fail` to create a Failure
- `void` for a pre-built `Success<void>`

**Signature**

```ts
declare const succeed: <A>(right: A) => Result<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Result.ts#L284)

Since v4.0.0

## succeedNone

Provides a pre-built `Result<Option<never>>` that succeeds with `None`.

**When to use**

Use when an optional success should be absent, such as the `None` branch of
`transposeOption` or `transposeMapOption`.

**Details**

This is equivalent to `Result.succeed(Option.none())`, but reuses a shared
`Success` wrapper instead of allocating one each time.

**Example** (Succeeding with None)

```ts
import { Result } from "effect"

console.log(Result.isSuccess(Result.succeedNone))
// Output: true
```

**See**

- `succeedSome` for the `Some` counterpart
- `transposeOption` to transpose an Option that already contains a Result
- `transposeMapOption` to map and transpose an Option in one step

**Signature**

```ts
declare const succeedNone: Result<Option<never>, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Result.ts#L1871)

Since v4.0.0

## succeedSome

Creates a `Result<Option<A>>` that succeeds with `Some(a)`.

**Details**

- Equivalent to `Result.succeed(Option.some(a))`
- Useful with `transposeOption` patterns

**Example** (Wrapping a value in Some inside a Result)

```ts
import { Result } from "effect"

const result = Result.succeedSome(42)
console.log(result)
// Output: { _tag: "Success", success: { _tag: "Some", value: 42 }, ... }
```

**See**

- `succeedNone` for the `None` counterpart

**Signature**

```ts
declare const succeedSome: <A, E = never>(a: A) => Result<Option<A>, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Result.ts#L1896)

Since v4.0.0

## try

Wraps a synchronous computation that may throw into a `Result` safely.

**Details**

- If the function returns normally, the result is `Success<A>`
- If the function throws, the exception is caught and becomes `Failure<E>`
- With a single function argument, the error type is `unknown`
- With `{ try, catch }` options, the `catch` function maps the thrown value to `E`

**Example** (Catching JSON parse errors)

```ts
import { Result } from "effect"

const ok = Result.try(() => JSON.parse('{"name": "Alice"}'))
console.log(ok)
// Output: { _tag: "Success", success: { name: "Alice" }, ... }

const err = Result.try({
  try: () => JSON.parse("not json"),
  catch: (e) => `Parse failed: ${e}`
})
console.log(Result.isFailure(err))
// Output: true
```

**See**

- `succeed` / `fail` for direct construction
- `fromNullishOr` for nullable values

**Signature**

```ts
declare const try: { <A, E>(options: { readonly try: LazyArg<A>; readonly catch: (error: unknown) => E; }): Result<A, E>; <A>(evaluate: LazyArg<A>): Result<A, unknown>; }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Result.ts#L527)

Since v2.0.0

## void

Provides a pre-built successful `Result` that carries `undefined`.

**When to use**

Use when you need a successful `Result` value that signals completion
without carrying meaningful data.

**Details**

This is equivalent to `Result.succeed(undefined)`, but reuses a shared
`Success` wrapper instead of allocating one each time.

**Example** (Referencing void results)

```ts
import { Result } from "effect"

const result: Result.Result<void> = Result.void

console.log(Result.isSuccess(result))
// Output: true
```

**See**

- `succeed` to create a Success with a specific value

**Signature**

```ts
declare const void: Result<void, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Result.ts#L347)

Since v3.13.0

# do notation

## Do

Provides the starting point for the "do notation" simulation with `Result`.

**When to use**

Use to start a `Result` do-notation pipeline from an empty successful record
before adding named fields from `Result`-producing computations and pure
computed values.

**Details**

Creates a `Result<{}>` (success with an empty object). Use with
`bind` to add `Result`-producing fields and `let`
to add pure computed fields.

**Example** (Building an object step by step)

```ts
import { pipe, Result } from "effect"

const result = pipe(
  Result.Do,
  Result.bind("x", () => Result.succeed(2)),
  Result.bind("y", () => Result.succeed(3)),
  Result.let("sum", ({ x, y }) => x + y)
)
console.log(result)
// Output: { _tag: "Success", success: { x: 2, y: 3, sum: 5 }, ... }
```

**See**

- `bind` to add Result-producing fields
- `let` to add pure computed fields
- `gen` for an alternative generator-based syntax
- `bindTo` for starting a do-notation chain from an existing Result

**Signature**

```ts
declare const Do: Result<{}, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Result.ts#L1616)

Since v2.0.0

## bind

Adds a named field to the do-notation accumulator by running a `Result`-producing
function that receives the current accumulated object.

**When to use**

Use when you need to add a `Result`-producing step to a `Result`
do-notation pipeline and store its successful value under a named field in
the accumulated object.

**Details**

- Short-circuits on the first `Failure`
- The field name must not collide with existing keys
- Use `let` for pure (non-Result) computed fields

**Example** (Binding Result values)

```ts
import { pipe, Result } from "effect"

const result = pipe(
  Result.Do,
  Result.bind("x", () => Result.succeed(2)),
  Result.bind("y", ({ x }) => Result.succeed(x + 3))
)
console.log(result)
// Output: { _tag: "Success", success: { x: 2, y: 5 }, ... }
```

**See**

- `Do` to start the do-notation chain
- `let` for pure computed fields
- `bindTo` to wrap an initial Result into a named field

**Signature**

```ts
declare const bind: {
  <N extends string, A extends object, B, L2>(
    name: Exclude<N, keyof A>,
    f: (a: NoInfer<A>) => Result<B, L2>
  ): <L1>(self: Result<A, L1>) => Result<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }, L1 | L2>
  <A extends object, L1, N extends string, B, L2>(
    self: Result<A, L1>,
    name: Exclude<N, keyof A>,
    f: (a: NoInfer<A>) => Result<B, L2>
  ): Result<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }, L1 | L2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Result.ts#L1655)

Since v2.0.0

## bindTo

Wraps the success value of a `Result` into a named field, producing a
`Result<Record<N, A>>`.

**When to use**

Use to name the success value of an existing `Result` before continuing a
do-notation pipeline.

**Details**

This is typically used to start a do-notation chain from an existing
`Result`.

**Example** (Wrapping a value into a named field)

```ts
import { pipe, Result } from "effect"

const result = pipe(Result.succeed(42), Result.bindTo("answer"))
console.log(result)
// Output: { _tag: "Success", success: { answer: 42 }, ... }
```

**See**

- `Do` to start from an empty object
- `bind` to add more fields

**Signature**

```ts
declare const bindTo: {
  <N extends string>(name: N): <R, L>(self: Result<R, L>) => Result<Record<N, R>, L>
  <R, L, N extends string>(self: Result<R, L>, name: N): Result<Record<N, R>, L>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Result.ts#L1700)

Since v2.0.0

## let

Adds a named field to the do-notation accumulator by computing a pure
(non-Result) value from the current accumulated object.

**When to use**

Use when you need to add a derived field that cannot fail inside a
do-notation pipeline.

**Details**

- Use `bind` when the computation returns a `Result`
- The field name must not collide with existing keys

**Example** (Adding a computed field)

```ts
import { pipe, Result } from "effect"

const result = pipe(
  Result.Do,
  Result.bind("x", () => Result.succeed(2)),
  Result.bind("y", () => Result.succeed(3)),
  Result.let("sum", ({ x, y }) => x + y)
)
console.log(result)
// Output: { _tag: "Success", success: { x: 2, y: 3, sum: 5 }, ... }
```

**See**

- `Do` to start the do-notation chain
- `bind` for Result-producing fields

**Signature**

```ts
declare const let: {
  <N extends string, R extends object, B>(
    name: Exclude<N, keyof R>,
    f: (r: NoInfer<R>) => B
  ): <L>(self: Result<R, L>) => Result<{ [K in N | keyof R]: K extends keyof R ? R[K] : B }, L>
  <R extends object, L, N extends string, B>(
    self: Result<R, L>,
    name: Exclude<N, keyof R>,
    f: (r: NoInfer<R>) => B
  ): Result<{ [K in N | keyof R]: K extends keyof R ? R[K] : B }, L>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Result.ts#L1753)

Since v2.0.0

# error handling

## orElse

Returns the original `Result` if it is a `Success`, otherwise applies
`that` to the error and returns the resulting `Result`.

**When to use**

Use when a failure should recover into another `Result` while keeping
successes unchanged.

**Details**

- `Success<A>` is returned unchanged
- `Failure<E>` calls `that(e)` to produce a new `Result`

**Example** (Recovering from a failure)

```ts
import { pipe, Result } from "effect"

const result = pipe(
  Result.fail("primary failed"),
  Result.orElse(() => Result.succeed(99))
)
console.log(result)
// Output: { _tag: "Success", success: 99, ... }
```

**See**

- `getOrElse` to unwrap with a fallback value (not a Result)
- `mapError` to transform the error without recovering

**Signature**

```ts
declare const orElse: {
  <E, A2, E2>(that: (err: E) => Result<A2, E2>): <A>(self: Result<A, E>) => Result<A | A2, E2>
  <A, E, A2, E2>(self: Result<A, E>, that: (err: E) => Result<A2, E2>): Result<A | A2, E2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Result.ts#L1292)

Since v2.0.0

# filtering

## filterOrFail

Validates the success value of a `Result` using a predicate, failing with a
custom error if the predicate returns `false`.

**When to use**

Use to validate an already-successful `Result` value with a predicate or
refinement.

**Details**

- If the result is already a `Failure`, it is returned as-is
- If the predicate passes, the `Success` is returned unchanged
- If the predicate fails, `orFailWith` produces the error for a new `Failure`
- Also accepts a `Refinement` to narrow the success type
- The error type of the output is the union of both error types

**Example** (Filtering a success value)

```ts
import { pipe, Result } from "effect"

const result = pipe(
  Result.succeed(0),
  Result.filterOrFail(
    (n) => n > 0,
    (n) => `${n} is not positive`
  )
)
console.log(result)
// Output: { _tag: "Failure", failure: "0 is not positive", ... }
```

**See**

- `liftPredicate` to create a `Result` from a raw value with a predicate
- `flatMap` for general conditional chaining

**Signature**

```ts
declare const filterOrFail: {
  <A, B extends A, E2>(
    refinement: Refinement<NoInfer<A>, B>,
    orFailWith: (value: NoInfer<A>) => E2
  ): <E>(self: Result<A, E>) => Result<B, E2 | E>
  <A, E2>(
    predicate: Predicate<NoInfer<A>>,
    orFailWith: (value: NoInfer<A>) => E2
  ): <E>(self: Result<A, E>) => Result<A, E2 | E>
  <A, E, B extends A, E2>(
    self: Result<A, E>,
    refinement: Refinement<A, B>,
    orFailWith: (value: A) => E2
  ): Result<B, E | E2>
  <A, E, E2>(self: Result<A, E>, predicate: Predicate<A>, orFailWith: (value: A) => E2): Result<A, E | E2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Result.ts#L1020)

Since v4.0.0

# generators

## ResultIterator (interface)

Iterator protocol used to yield a `Result` inside `gen`, returning the
success value type back to the generator.

**When to use**

Use when defining or typing `[Symbol.iterator]()` for `Result` values so
`yield*` can pass the success value type back into `Result.gen`.

**See**

- `gen` for writing generator-based `Result` code that consumes this iterator protocol

**Signature**

```ts
export interface ResultIterator<T extends Result<any, any>> {
  next(...args: ReadonlyArray<any>): IteratorResult<T, Result.Success<T>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Result.ts#L129)

Since v4.0.0

## gen

Provides generator-based syntax for composing `Result` values sequentially.

**When to use**

Use when you need generator syntax to compose sequential `Result`
computations instead of nested `flatMap` calls.

**Details**

- Use `yield*` to unwrap a `Result` inside the generator; if any yielded
  `Result` is a `Failure`, the generator short-circuits and returns that failure
- The return value of the generator is wrapped in `Success`
- Evaluated eagerly and synchronously (unlike `Effect.gen`)

**Example** (Composing multiple Results)

```ts
import { Result } from "effect"

const result = Result.gen(function* () {
  const a = yield* Result.succeed(1)
  const b = yield* Result.succeed(2)
  return a + b
})

console.log(result)
// Output: { _tag: "Success", success: 3, ... }
```

**See**

- `flatMap` for point-free sequential composition
- `all` to collect multiple independent Results

**Signature**

```ts
declare const gen: Gen.Gen<ResultTypeLambda>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Result.ts#L1560)

Since v2.0.0

# getters

## getFailure

Extracts the failure value as an `Option`, discarding the success.

**When to use**

Use when you need to extract the failure value from a `Result` as an
`Option` and discard successful values.

**Details**

- `Failure<E>` becomes `Some<E>`
- `Success<A>` becomes `None`

**Example** (Extracting the failure as an Option)

```ts
import { Option, Result } from "effect"

console.log(Result.getFailure(Result.succeed("ok")))
// Output: { _tag: "None" }

console.log(Result.getFailure(Result.fail("err")))
// Output: { _tag: "Some", value: "err" }
```

**See**

- `getSuccess` to extract the success instead
- `fromOption` for the reverse conversion

**Signature**

```ts
declare const getFailure: <A, E>(self: Result<A, E>) => Option<E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Result.ts#L691)

Since v4.0.0

## getOrElse

Extracts the success value, or computes a fallback from the error.

**When to use**

Use when you need the success value from a `Result`, with a fallback computed
from the failure value.

**Details**

- `Success<A>` returns the inner value
- `Failure<E>` applies `onFailure` to the error and returns the result
- The return type is `A | A2` (union of both branches)

**Example** (Providing a fallback)

```ts
import { Result } from "effect"

console.log(Result.getOrElse(Result.succeed(1), () => 0))
// Output: 1

console.log(Result.getOrElse(Result.fail("err"), () => 0))
// Output: 0
```

**See**

- `getOrNull` / `getOrUndefined` for simpler fallbacks
- `getOrThrow` to throw on failure
- `match` to map both branches
- `orElse` to recover with another Result instead of unwrapping

**Signature**

```ts
declare const getOrElse: {
  <E, A2>(onFailure: (err: E) => A2): <A>(self: Result<A, E>) => A2 | A
  <A, E, A2>(self: Result<A, E>, onFailure: (err: E) => A2): A | A2
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Result.ts#L1105)

Since v2.0.0

## getOrNull

Extracts the success value, or returns `null` on failure.

**When to use**

Use when you need to pass failed `Result` values to APIs that represent
absence as `null`.

**Details**

- `Success<A>` returns `A`
- `Failure<E>` returns `null`

**Example** (Unwrapping to nullable)

```ts
import { Result } from "effect"

console.log(Result.getOrNull(Result.succeed(1)))
// Output: 1

console.log(Result.getOrNull(Result.fail("err")))
// Output: null
```

**See**

- `getOrUndefined` to return `undefined` instead
- `getOrElse` for a custom fallback

**Signature**

```ts
declare const getOrNull: <A, E>(self: Result<A, E>) => A | null
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Result.ts#L1145)

Since v2.0.0

## getOrThrow

Extracts the success value or throws the raw failure value `E`.

**When to use**

Use when unchecked boundaries should turn failures into thrown exceptions.

**Details**

- `Success<A>` returns `A`
- `Failure<E>` throws `E` directly
- Use `getOrThrowWith` for a custom error object

**Example** (Unwrapping or throwing)

```ts
import { Result } from "effect"

console.log(Result.getOrThrow(Result.succeed(1)))
// Output: 1

// This would throw the string "error":
// Result.getOrThrow(Result.fail("error"))
```

**See**

- `getOrThrowWith` for custom error mapping
- `getOrElse` for a non-throwing alternative

**Signature**

```ts
declare const getOrThrow: <A, E>(self: Result<A, E>) => A
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Result.ts#L1257)

Since v2.0.0

## getOrThrowWith

Extracts the success value or throws a custom error derived from the failure.

**When to use**

Use when converting a `Result` into a thrown exception with a custom error
message or error type.

**Details**

- `Success<A>` returns `A`
- `Failure<E>` throws the value returned by `onFailure(e)`

**Example** (Throwing a custom error)

```ts
import { Result } from "effect"

console.log(Result.getOrThrowWith(Result.succeed(1), () => new Error("fail")))
// Output: 1

// This would throw: new Error("Unexpected: oops")
// Result.getOrThrowWith(
//   Result.fail("oops"),
//   (err) => new Error(`Unexpected: ${err}`)
// )
```

**See**

- `getOrThrow` to throw the raw failure value
- `getOrElse` for a non-throwing alternative

**Signature**

```ts
declare const getOrThrowWith: {
  <E>(onFailure: (err: E) => unknown): <A>(self: Result<A, E>) => A
  <A, E>(self: Result<A, E>, onFailure: (err: E) => unknown): A
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Result.ts#L1216)

Since v2.0.0

## getOrUndefined

Extracts the success value, or returns `undefined` on failure.

**When to use**

Use when you need to pass failed `Result` values to APIs that represent
absence as `undefined`.

**Details**

- `Success<A>` returns `A`
- `Failure<E>` returns `undefined`

**Example** (Unwrapping to optional)

```ts
import { Result } from "effect"

console.log(Result.getOrUndefined(Result.succeed(1)))
// Output: 1

console.log(Result.getOrUndefined(Result.fail("err")))
// Output: undefined
```

**See**

- `getOrNull` to return `null` instead
- `getOrElse` for a custom fallback

**Signature**

```ts
declare const getOrUndefined: <A, E>(self: Result<A, E>) => A | undefined
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Result.ts#L1178)

Since v2.0.0

## getSuccess

Extracts the success value as an `Option`, discarding the failure.

**When to use**

Use when you need to extract the success value from a `Result` as an
`Option` and discard failure information.

**Details**

- `Success<A>` becomes `Some<A>`
- `Failure<E>` becomes `None`

**Example** (Extracting the success as an Option)

```ts
import { Option, Result } from "effect"

console.log(Result.getSuccess(Result.succeed("ok")))
// Output: { _tag: "Some", value: "ok" }

console.log(Result.getSuccess(Result.fail("err")))
// Output: { _tag: "None" }
```

**See**

- `getFailure` to extract the error instead
- `fromOption` for the reverse conversion

**Signature**

```ts
declare const getSuccess: <A, E>(self: Result<A, E>) => Option<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Result.ts#L658)

Since v4.0.0

## merge

Unwraps a `Result` into `A | E` by returning the inner value regardless
of whether it is a success or failure.

**Details**

- `Success<A>` returns `A`
- `Failure<E>` returns `E`
- Useful when both channels share a compatible type

**Example** (Extracting the inner value)

```ts
import { Result } from "effect"

console.log(Result.merge(Result.succeed(42)))
// Output: 42

console.log(Result.merge(Result.fail("error")))
// Output: "error"
```

**See**

- `match` to map each branch to a common type
- `getOrElse` to provide a fallback for failures

**Signature**

```ts
declare const merge: <A, E>(self: Result<A, E>) => E | A
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Result.ts#L1069)

Since v2.0.0

# guards

## isFailure

Checks whether a `Result` is a `Failure`.

**When to use**

Use to narrow a known `Result` to the `Failure` variant.

**Details**

- Acts as a TypeScript type guard, narrowing to `Failure<A, E>`
- After narrowing, you can access `.failure` to read the error value

**Example** (Narrowing to failure)

```ts
import { Result } from "effect"

const result = Result.fail("oops")

if (Result.isFailure(result)) {
  console.log(result.failure)
  // Output: "oops"
}
```

**See**

- `isSuccess` for the opposite check
- `isResult` to check if a value is any Result

**Signature**

```ts
declare const isFailure: <A, E>(self: Result<A, E>) => self is Failure<A, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Result.ts#L592)

Since v4.0.0

## isResult

Checks whether a value is a `Result` (either `Success` or `Failure`).

**When to use**

Use to validate unknown input before operating on it as a `Result`.

**Details**

- Returns `true` for both `Success` and `Failure` variants
- Acts as a TypeScript type guard, narrowing to `Result<unknown, unknown>`

**Example** (Checking if a value is a Result)

```ts
import { Result } from "effect"

console.log(Result.isResult(Result.succeed(1)))
// Output: true

console.log(Result.isResult({ value: 1 }))
// Output: false
```

**See**

- `isSuccess` / `isFailure` to narrow to a specific variant

**Signature**

```ts
declare const isResult: (input: unknown) => input is Result<unknown, unknown>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Result.ts#L559)

Since v4.0.0

## isSuccess

Checks whether a `Result` is a `Success`.

**When to use**

Use to narrow a known `Result` to the `Success` variant.

**Details**

- Acts as a TypeScript type guard, narrowing to `Success<A, E>`
- After narrowing, you can access `.success` to read the value

**Example** (Narrowing to success)

```ts
import { Result } from "effect"

const result = Result.succeed(42)

if (Result.isSuccess(result)) {
  console.log(result.success)
  // Output: 42
}
```

**See**

- `isFailure` for the opposite check
- `isResult` to check if a value is any Result

**Signature**

```ts
declare const isSuccess: <A, E>(self: Result<A, E>) => self is Success<A, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Result.ts#L625)

Since v4.0.0

# instances

## makeEquivalence

Creates an `Equivalence` for comparing two `Result` values.

**Details**

- Two `Success` values are equal when the `success` equivalence says so
- Two `Failure` values are equal when the `failure` equivalence says so
- A `Success` and a `Failure` are never equal

**Example** (Comparing Results for equality)

```ts
import { Equivalence, Result } from "effect"

const eq = Result.makeEquivalence(Equivalence.strictEqual<number>(), Equivalence.strictEqual<string>())

console.log(eq(Result.succeed(1), Result.succeed(1)))
// Output: true

console.log(eq(Result.succeed(1), Result.fail("x")))
// Output: false
```

**Signature**

```ts
declare const makeEquivalence: <A, E>(
  success: Equivalence.Equivalence<A>,
  failure: Equivalence.Equivalence<E>
) => Equivalence.Equivalence<Result<A, E>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Result.ts#L722)

Since v4.0.0

# mapping

## map

Transforms the success channel of a `Result`, leaving the failure channel unchanged.

**When to use**

Use to apply a transformation to the success value of a `Result` while
preserving any existing failure.

**Details**

- If the result is a `Success`, applies `f` to the value and returns a new `Success`
- If the result is a `Failure`, returns it as-is
- Use `flatMap` if `f` returns a `Result` (to avoid nested Results)

**Example** (Doubling the success value)

```ts
import { pipe, Result } from "effect"

const result = pipe(
  Result.succeed(3),
  Result.map((n) => n * 2)
)
console.log(result)
// Output: { _tag: "Success", success: 6, ... }
```

**See**

- `mapError` to transform only the error value
- `mapBoth` to transform both channels
- `flatMap` when `f` returns a `Result`

**Signature**

```ts
declare const map: {
  <A, A2>(f: (ok: A) => A2): <E>(self: Result<A, E>) => Result<A2, E>
  <A, E, A2>(self: Result<A, E>, f: (ok: A) => A2): Result<A2, E>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Result.ts#L859)

Since v2.0.0

## mapBoth

Transforms both the success and failure channels of a `Result`.

**When to use**

Use to transform both success and failure values without changing whether the
result succeeds or fails.

**Details**

- Applies `onSuccess` if the result is a `Success`
- Applies `onFailure` if the result is a `Failure`

**Example** (Mapping both channels)

```ts
import { pipe, Result } from "effect"

const result = pipe(
  Result.succeed(1),
  Result.mapBoth({
    onSuccess: (n) => n + 1,
    onFailure: (e) => `Error: ${e}`
  })
)
console.log(result)
// Output: { _tag: "Success", success: 2, ... }
```

**See**

- `map` to transform only the success value
- `mapError` to transform only the error value
- `match` to fold into a single value

**Signature**

```ts
declare const mapBoth: {
  <E, E2, A, A2>(options: {
    readonly onFailure: (left: E) => E2
    readonly onSuccess: (right: A) => A2
  }): (self: Result<A, E>) => Result<A2, E2>
  <E, A, E2, A2>(
    self: Result<A, E>,
    options: { readonly onFailure: (left: E) => E2; readonly onSuccess: (right: A) => A2 }
  ): Result<A2, E2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Result.ts#L768)

Since v2.0.0

## mapError

Transforms the failure channel of a `Result`, leaving the success channel unchanged.

**When to use**

Use to transform only the failure channel while preserving success values.

**Details**

- If the result is a `Failure`, applies `f` to the error and returns a new `Failure`
- If the result is a `Success`, returns it as-is

**Example** (Adding context to an error)

```ts
import { pipe, Result } from "effect"

const result = pipe(
  Result.fail("not found"),
  Result.mapError((e) => `Error: ${e}`)
)
console.log(result)
// Output: { _tag: "Failure", failure: "Error: not found", ... }
```

**See**

- `map` to transform only the success value
- `mapBoth` to transform both channels

**Signature**

```ts
declare const mapError: {
  <E, E2>(f: (err: E) => E2): <A>(self: Result<A, E>) => Result<A, E2>
  <A, E, E2>(self: Result<A, E>, f: (err: E) => E2): Result<A, E2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Result.ts#L816)

Since v4.0.0

## tap

Runs a side-effect on the success value without altering the `Result`.

**Details**

- If the result is a `Success`, calls `f` with the value (return value is ignored)
- If the result is a `Failure`, `f` is not called
- Returns the original `Result` unchanged (same reference)
- Useful for logging, debugging, or performing mutations outside the Result chain

**Example** (Logging a success value)

```ts
import { pipe, Result } from "effect"

const result = pipe(
  Result.succeed(42),
  Result.tap((n) => console.log("Got:", n))
)
// Output: "Got: 42"

console.log(Result.isSuccess(result))
// Output: true
```

**See**

- `map` to transform the success value

**Signature**

```ts
declare const tap: {
  <A>(f: (a: A) => void): <E>(self: Result<A, E>) => Result<A, E>
  <A, E>(self: Result<A, E>, f: (a: A) => void): Result<A, E>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Result.ts#L1928)

Since v4.0.0

# models

## Failure (interface)

The failure variant of `Result`. Wraps an error of type `E`.

**Details**

- Access the error via the `.failure` property
- Use `isFailure` to narrow a `Result` to `Failure`
- Create with `fail`

**Example** (Accessing the failure value)

```ts
import { Result } from "effect"

const failure = Result.fail("Network error")

if (Result.isFailure(failure)) {
  console.log(failure.failure)
  // Output: "Network error"
}
```

**See**

- `fail` to create a Failure
- `isFailure` to narrow the type
- `Success` for the other variant

**Signature**

```ts
export interface Failure<out A, out E> extends Pipeable, Inspectable {
  readonly _tag: "Failure"
  readonly _op: "Failure"
  readonly failure: E
  readonly [TypeId]: {
    readonly _A: Covariant<E>
    readonly _E: Covariant<A>
  }
  [Symbol.iterator](): ResultIterator<Result<A, E>>
  [Unify.typeSymbol]?: unknown
  [Unify.unifySymbol]?: ResultUnify<this>
  [Unify.ignoreSymbol]?: ResultUnifyIgnore
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Result.ts#L101)

Since v4.0.0

## Result (type alias)

A value that is either `Success<A, E>` or `Failure<A, E>`.

**When to use**

Use when both success and failure should remain available as data and
`Option` would lose failure information.

**Details**

- Use `succeed` / `fail` to construct
- Use `match` to fold both branches
- Use `isSuccess` / `isFailure` to narrow the type

`E` defaults to `never`, so `Result<number>` means a result that cannot fail.

**Example** (Creating and matching a Result)

```ts
import { Result } from "effect"

const success = Result.succeed(42)
const failure = Result.fail("something went wrong")

const message = Result.match(success, {
  onSuccess: (value) => `Success: ${value}`,
  onFailure: (error) => `Error: ${error}`
})
console.log(message)
// Output: "Success: 42"
```

**See**

- `succeed` / `fail` to create values
- `match` to fold both branches
- `isSuccess` / `isFailure` for type guards

**Signature**

```ts
type Result<A, E> = Success<A, E> | Failure<A, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Result.ts#L70)

Since v4.0.0

## ResultUnify (interface)

Type-level utility for unifying `Result` types in generic contexts.

**Details**

This is an internal interface used by the Effect type system. You typically
do not need to reference it directly.

**Signature**

```ts
export interface ResultUnify<T extends { [Unify.typeSymbol]?: any }> {
  Result?: () => T[Unify.typeSymbol] extends Result<infer A, infer E> | infer _ ? Result<A, E> : never
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Result.ts#L189)

Since v4.0.0

## ResultUnifyIgnore (interface)

Marker interface for ignoring unification in `Result` types.

**Details**

This is an internal interface used by the Effect type system. You typically
do not need to reference it directly.

**Signature**

```ts
export interface ResultUnifyIgnore {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Result.ts#L204)

Since v4.0.0

## Success (interface)

The success variant of `Result`. Wraps a value of type `A`.

**Details**

- Access the value via the `.success` property
- Use `isSuccess` to narrow a `Result` to `Success`
- Create with `succeed`

**Example** (Accessing the success value)

```ts
import { Result } from "effect"

const success = Result.succeed(42)

if (Result.isSuccess(success)) {
  console.log(success.success)
  // Output: 42
}
```

**See**

- `succeed` to create a Success
- `isSuccess` to narrow the type
- `Failure` for the other variant

**Signature**

```ts
export interface Success<out A, out E> extends Pipeable, Inspectable {
  readonly _tag: "Success"
  readonly _op: "Success"
  readonly success: A
  readonly [TypeId]: {
    readonly _A: Covariant<E>
    readonly _E: Covariant<A>
  }
  [Symbol.iterator](): ResultIterator<Result<A, E>>
  [Unify.typeSymbol]?: unknown
  [Unify.unifySymbol]?: ResultUnify<this>
  [Unify.ignoreSymbol]?: ResultUnifyIgnore
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Result.ts#L164)

Since v4.0.0

# pattern matching

## match

Folds a `Result` into a single value by applying one of two functions.

**When to use**

Use when a `Result`'s success and failure branches should be collapsed into
one plain output type.

**Details**

- Applies `onSuccess` if the result is a `Success`
- Applies `onFailure` if the result is a `Failure`
- Both branches must return the same type (or a common supertype)

**Example** (Folding to a string)

```ts
import { pipe, Result } from "effect"

const format = Result.match({
  onSuccess: (n: number) => `Got ${n}`,
  onFailure: (e: string) => `Err: ${e}`
})

console.log(format(Result.succeed(42)))
// Output: "Got 42"

console.log(format(Result.fail("timeout")))
// Output: "Err: timeout"
```

**See**

- `merge` to extract `A | E` without mapping
- `getOrElse` to unwrap only the success with a fallback

**Signature**

```ts
declare const match: {
  <E, B, A, C = B>(options: {
    readonly onFailure: (error: E) => B
    readonly onSuccess: (ok: A) => C
  }): (self: Result<A, E>) => B | C
  <A, E, B, C = B>(
    self: Result<A, E>,
    options: { readonly onFailure: (error: E) => B; readonly onSuccess: (ok: A) => C }
  ): B | C
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Result.ts#L905)

Since v2.0.0

# sequencing

## all

Collects a structure of `Result`s into a single `Result` of collected values.

**When to use**

Use to collect independent `Result` values into one `Result` while preserving
the original structure.

**Details**

Accepts:

- A tuple/array: returns `Result` with a tuple/array of success values
- A struct (record): returns `Result` with a struct of success values
- An iterable: returns `Result` with an array of success values

Short-circuits on the first `Failure` encountered; later elements are not inspected.

**Example** (Collecting a tuple and a struct)

```ts
import { Result } from "effect"

// Tuple
const tuple = Result.all([Result.succeed(1), Result.succeed("two")])
console.log(tuple)
// Output: { _tag: "Success", success: [1, "two"], ... }

// Struct
const struct = Result.all({ x: Result.succeed(1), y: Result.fail("err") })
console.log(struct)
// Output: { _tag: "Failure", failure: "err", ... }
```

**See**

- `flatMap` for chaining two Results sequentially
- `gen` for generator-based composition of multiple Results

**Signature**

```ts
declare const all: <const I extends Iterable<Result<any, any>> | Record<string, Result<any, any>>>(
  input: I
) => [I] extends [ReadonlyArray<Result<any, any>>]
  ? Result<
      { -readonly [K in keyof I]: [I[K]] extends [Result<infer R, any>] ? R : never },
      I[number] extends never ? never : [I[number]] extends [Result<any, infer L>] ? L : never
    >
  : [I] extends [Iterable<Result<infer R, infer L>>]
    ? Result<Array<R>, L>
    : Result<
        { -readonly [K in keyof I]: [I[K]] extends [Result<infer R, any>] ? R : never },
        I[keyof I] extends never ? never : [I[keyof I]] extends [Result<any, infer L>] ? L : never
      >
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Result.ts#L1454)

Since v2.0.0

## andThen

Provides a flexible variant of `flatMap` that accepts multiple input shapes.

**When to use**

Use to sequence a next step that may be a `Result`, a function, or a plain
value.

**Details**

The second argument can be:

- A function `(a: A) => Result<A2, E2>` (same as `flatMap`)
- A function `(a: A) => A2` (auto-wrapped in `succeed`)
- A `Result<A2, E2>` value (ignores the success of `self`)
- A plain value `A2` (auto-wrapped in `succeed`, ignores `self`)

If `self` is a `Failure`, the second argument is never evaluated.

**Example** (Chaining Result values with different argument types)

```ts
import { pipe, Result } from "effect"

// With a function returning a Result
const a = pipe(
  Result.succeed(1),
  Result.andThen((n) => Result.succeed(n + 1))
)

// With a plain mapping function
const b = pipe(
  Result.succeed(1),
  Result.andThen((n) => n + 1)
)

// With a constant value
const c = pipe(Result.succeed(1), Result.andThen("done"))

console.log(a, b, c)
```

**See**

- `flatMap` for the stricter variant (function returning Result only)
- `map` when you always return a plain value

**Signature**

```ts
declare const andThen: {
  <A, A2, E2>(f: (a: A) => Result<A2, E2>): <E>(self: Result<A, E>) => Result<A2, E | E2>
  <A2, E2>(f: Result<A2, E2>): <A, E>(self: Result<A, E>) => Result<A2, E | E2>
  <A, A2>(f: (a: A) => A2): <E>(self: Result<A, E>) => Result<A2, E>
  <A2>(right: NotFunction<A2>): <A, E>(self: Result<A, E>) => Result<A2, E>
  <A, E, A2, E2>(self: Result<A, E>, f: (a: A) => Result<A2, E2>): Result<A2, E | E2>
  <A, E, A2, E2>(self: Result<A, E>, f: Result<A2, E2>): Result<A2, E | E2>
  <A, E, A2>(self: Result<A, E>, f: (a: A) => A2): Result<A2, E>
  <A, E, A2>(self: Result<A, E>, f: NotFunction<A2>): Result<A2, E>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Result.ts#L1393)

Since v2.0.0

## flatMap

Chains a function that returns a `Result` onto a successful value.

**When to use**

Use to sequence `Result`-returning computations that should short-circuit on
failure.

**Details**

- If `self` is a `Success`, applies `f` to the value and returns the resulting `Result`
- If `self` is a `Failure`, short-circuits and returns it unchanged
- The error types are merged into a union (`E | E2`)
- This is the monadic `bind` / `>>=` for `Result`

**Example** (Validating sequentially)

```ts
import { pipe, Result } from "effect"

const result = pipe(
  Result.succeed(5),
  Result.flatMap((n) => (n > 0 ? Result.succeed(n * 2) : Result.fail("not positive")))
)
console.log(result)
// Output: { _tag: "Success", success: 10, ... }
```

**See**

- `andThen` for a more flexible variant that also accepts plain values
- `map` when `f` does not return a `Result`

**Signature**

```ts
declare const flatMap: {
  <A, A2, E2>(f: (a: A) => Result<A2, E2>): <E>(self: Result<A, E>) => Result<A2, E | E2>
  <A, E, A2, E2>(self: Result<A, E>, f: (a: A) => Result<A2, E2>): Result<A2, E | E2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Result.ts#L1337)

Since v2.0.0

# transforming

## flip

Swaps the success and failure channels of a `Result`.

**When to use**

Use to swap channels when failure-focused operations are easier through
success-oriented combinators.

**Details**

- `Success<A>` becomes `Failure<A>` (i.e., `Result<E, A>`)
- `Failure<E>` becomes `Success<E>` (i.e., `Result<E, A>`)
- Useful when you want to apply success-oriented operations (like `map`)
  to the error channel, then flip back

**Example** (Swapping channels)

```ts
import { Result } from "effect"

console.log(Result.flip(Result.succeed(42)))
// Output: { _tag: "Failure", failure: 42, ... }

console.log(Result.flip(Result.fail("error")))
// Output: { _tag: "Success", success: "error", ... }
```

**See**

- `mapError` to transform the error without swapping

**Signature**

```ts
declare const flip: <A, E>(self: Result<A, E>) => Result<E, A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Result.ts#L1521)

Since v2.0.0

# type lambdas

## ResultTypeLambda (interface)

Higher-kinded type representation for `Result`.

**Details**

Used internally to integrate `Result` with generic type-class utilities
(e.g., `map`, `flatMap` abstractions). You typically do not need to
reference this directly.

**Signature**

```ts
export interface ResultTypeLambda extends TypeLambda {
  readonly type: Result<this["Target"], this["Out1"]>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Result.ts#L218)

Since v4.0.0

# utils

## Result (namespace)

Namespace containing type-level utilities for extracting the inner types
of a `Result`.

**Example** (Extracting inner types)

```ts
import type { Result } from "effect"

type R = Result.Result<number, string>

// number
type A = Result.Result.Success<R>

// string
type E = Result.Result.Failure<R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Result.ts#L242)

Since v4.0.0

### Failure (type alias)

Extracts the failure type `E` from `Result<A, E>`.

**Signature**

```ts
type Failure<T> = [T] extends [Result<infer _A, infer _E>] ? _E : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Result.ts#L249)

Since v4.0.0

### Success (type alias)

Extracts the success type `A` from `Result<A, E>`.

**Signature**

```ts
type Success<T> = [T] extends [Result<infer _A, infer _E>] ? _A : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Result.ts#L256)

Since v4.0.0
