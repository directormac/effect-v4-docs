---
title: Exit.ts
nav_order: 31
parent: "effect"
---

## Exit.ts overview

Represents the result of an Effect computation as a plain value.

An `Exit<A, E>` is either a success with an `A` or a failure with a
`Cause<E>`. The failure cause preserves typed errors, defects, and
interruptions after a workflow has finished. Use this module when completed
Effect results need to be inspected, transformed, filtered, or matched
synchronously as data.

Since v2.0.0

---

## Exports Grouped by Category

- [accessors](#accessors)
  - [findErrorOption](#finderroroption)
  - [getCause](#getcause)
  - [getSuccess](#getsuccess)
- [combinators](#combinators)
  - [asVoid](#asvoid)
  - [asVoidAll](#asvoidall)
  - [map](#map)
  - [mapBoth](#mapboth)
  - [mapError](#maperror)
- [constructors](#constructors)
  - [die](#die)
  - [fail](#fail)
  - [failCause](#failcause)
  - [interrupt](#interrupt)
  - [succeed](#succeed)
  - [void](#void)
- [filtering](#filtering)
  - [filterCause](#filtercause)
  - [filterFailure](#filterfailure)
  - [filterSuccess](#filtersuccess)
  - [filterValue](#filtervalue)
  - [findDefect](#finddefect)
  - [findError](#finderror)
- [guards](#guards)
  - [hasDies](#hasdies)
  - [hasFails](#hasfails)
  - [hasInterrupts](#hasinterrupts)
  - [isExit](#isexit)
  - [isFailure](#isfailure)
  - [isSuccess](#issuccess)
- [models](#models)
  - [Exit (type alias)](#exit-type-alias)
  - [Failure (interface)](#failure-interface)
  - [Success (interface)](#success-interface)
- [pattern matching](#pattern-matching)
  - [match](#match)
- [utils](#utils)
  - [Exit (namespace)](#exit-namespace)
    - [Proto (interface)](#proto-interface)

---

# accessors

## findErrorOption

Returns the first typed error from a failed Exit as an Option.

**When to use**

Use when you need the first typed error from an `Exit` as an `Option`,
ignoring successes and non-typed failures.

**Details**

Returns `Option.some(error)` if the Cause contains a Fail reason. Successes,
defect-only failures, and interrupt-only failures return `Option.none()`.

**Gotchas**

Only finds the first Fail reason. If the Cause has multiple typed errors,
the rest are ignored.

**Example** (Getting the first error)

```ts
import { Exit } from "effect"

console.log(Exit.findErrorOption(Exit.fail("err"))) // { _tag: "Some", value: "err" }
console.log(Exit.findErrorOption(Exit.die(new Error("bug")))) // { _tag: "None" }
console.log(Exit.findErrorOption(Exit.succeed(42))) // { _tag: "None" }
```

**See**

- `findError` for filter-pipeline usage
- `getCause` to get the full Cause as an Option

**Signature**

```ts
declare const findErrorOption: <A, E>(self: Exit<A, E>) => Option<E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Exit.ts#L1085)

Since v4.0.0

## getCause

Returns the Cause of a failed Exit as an Option.

**When to use**

Use when you need the failure `Cause` from an `Exit` as an `Option` instead
of pattern matching.

**Details**

Returns `Option.some(cause)` for a Failure and `Option.none()` for a Success.

**Example** (Getting the failure cause)

```ts
import { Exit } from "effect"

console.log(Exit.getCause(Exit.fail("err"))) // { _tag: "Some", value: ... }
console.log(Exit.getCause(Exit.succeed(42))) // { _tag: "None" }
```

**See**

- `getSuccess` to extract the success value
- `filterCause` for filter-pipeline usage

**Signature**

```ts
declare const getCause: <A, E>(self: Exit<A, E>) => Option<Cause.Cause<E>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Exit.ts#L1049)

Since v4.0.0

## getSuccess

Returns the success value of an Exit as an Option.

**When to use**

Use when you need the success value from an `Exit` as an `Option` instead of
pattern matching.

**Details**

Returns `Option.some(value)` for a Success and `Option.none()` for a Failure.

**Example** (Getting the success value)

```ts
import { Exit } from "effect"

console.log(Exit.getSuccess(Exit.succeed(42))) // { _tag: "Some", value: 42 }
console.log(Exit.getSuccess(Exit.fail("err"))) // { _tag: "None" }
```

**See**

- `getCause` to extract the Cause of a failure
- `filterValue` for filter-pipeline usage

**Signature**

```ts
declare const getSuccess: <A, E>(self: Exit<A, E>) => Option<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Exit.ts#L1020)

Since v4.0.0

# combinators

## asVoid

Discards the success value of an Exit, replacing it with `void`.

**When to use**

Use when you need to discard a successful `Exit` value while preserving
whether the `Exit` succeeded or failed.

**Details**

Failures pass through unchanged.

Allocates a new Exit if successful.

**Example** (Discarding the success value)

```ts
import { Exit } from "effect"

const exit = Exit.succeed(42)
const voided = Exit.asVoid(exit)
console.log(Exit.isSuccess(voided)) // true
```

**See**

- `void` for a pre-allocated void success
- `asVoidAll` to combine multiple exits into a single void Exit

**Signature**

```ts
declare const asVoid: <A, E>(self: Exit<A, E>) => Exit<void, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Exit.ts#L955)

Since v2.0.0

## asVoidAll

Combines multiple Exit values into a single `Exit<void, E>`.

**When to use**

Use to validate that all exits in a collection succeeded

**Details**

If all exits are successful, this returns a void success. If any exit is a
failure, this returns a single failure with all error causes combined.

Iterates over the entire collection. Collects all failure causes, not just
the first.

**Example** (Combining exits)

```ts
import { Exit } from "effect"

const exits = [Exit.succeed(1), Exit.succeed(2), Exit.succeed(3)]
console.log(Exit.isSuccess(Exit.asVoidAll(exits))) // true

const mixed = [Exit.succeed(1), Exit.fail("err"), Exit.succeed(3)]
console.log(Exit.isFailure(Exit.asVoidAll(mixed))) // true
```

**See**

- `asVoid` to discard the value of a single Exit

**Signature**

```ts
declare const asVoidAll: <I extends Iterable<Exit<any, any>>>(
  exits: I
) => Exit<void, I extends Iterable<Exit<infer _A, infer _E>> ? _E : never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Exit.ts#L989)

Since v4.0.0

## map

Transforms the success value of an Exit using the given function.

**When to use**

Use to apply a transformation to the value inside a successful Exit

**Details**

Failures pass through unchanged.

Allocates a new Exit if successful.

**Example** (Mapping over a success)

```ts
import { Exit } from "effect"

const exit = Exit.succeed(21)
const doubled = Exit.map(exit, (x) => x * 2)
console.log(Exit.isSuccess(doubled) && doubled.value) // 42
```

**See**

- `mapError` to transform the error
- `mapBoth` to transform both success and error

**Signature**

```ts
declare const map: {
  <A, B>(f: (a: A) => B): <E>(self: Exit<A, E>) => Exit<B, E>
  <A, E, B>(self: Exit<A, E>, f: (a: A) => B): Exit<B, E>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Exit.ts#L830)

Since v2.0.0

## mapBoth

Transforms both the success value and typed error of an Exit.

**When to use**

Use when you need to remap both channels in one step.

**Details**

`onSuccess` transforms the value if the Exit is a Success. `onFailure`
transforms the typed error if the Exit is a Failure with a Fail reason.
Allocates a new Exit.

**Gotchas**

If the Cause contains only defects or interruptions, the failure passes
through unchanged.

**Example** (Mapping both channels)

```ts
import { Data, Exit } from "effect"

class ExitError extends Data.TaggedError("ExitError")<{ readonly input: string }> {}

const exit = Exit.succeed(42)
const mapped = Exit.mapBoth(exit, {
  onSuccess: (x) => String(x),
  onFailure: (e: string) => new ExitError({ input: e })
})
console.log(Exit.isSuccess(mapped) && mapped.value) // "42"
```

**See**

- `map` to transform only the success value
- `mapError` to transform only the error

**Signature**

```ts
declare const mapBoth: {
  <E, E2, A, A2>(options: {
    readonly onFailure: (e: E) => E2
    readonly onSuccess: (a: A) => A2
  }): (self: Exit<A, E>) => Exit<A2, E2>
  <A, E, E2, A2>(
    self: Exit<A, E>,
    options: { readonly onFailure: (e: E) => E2; readonly onSuccess: (a: A) => A2 }
  ): Exit<A2, E2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Exit.ts#L915)

Since v2.0.0

## mapError

Transforms the typed error of a failed Exit using the given function.

**When to use**

Use to remap typed errors while preserving the Exit structure

**Details**

Successes pass through unchanged.

Allocates a new Exit if the error is transformed.

**Gotchas**

Only transforms typed errors (Fail reasons). If the Cause contains only
defects or interruptions, the failure passes through unchanged.

**Example** (Mapping over an error)

```ts
import { Data, Exit } from "effect"

class ExitError extends Data.TaggedError("ExitError")<{ readonly input: string }> {}

const exit = Exit.fail("bad input")
const mapped = Exit.mapError(exit, (e) => new ExitError({ input: e }))
console.log(Exit.isFailure(mapped)) // true
```

**See**

- `map` to transform the success value
- `mapBoth` to transform both success and error

**Signature**

```ts
declare const mapError: {
  <E, E2>(f: (a: NoInfer<E>) => E2): <A>(self: Exit<A, E>) => Exit<A, E2>
  <A, E, E2>(self: Exit<A, E>, f: (a: NoInfer<E>) => E2): Exit<A, E2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Exit.ts#L871)

Since v2.0.0

# constructors

## die

Creates a failed Exit from a defect (unexpected error).

**When to use**

Use when you need unexpected, unrecoverable errors that should not appear in
the typed error channel.

**Details**

The defect is wrapped in a `Cause.Die` internally.

Returns a `Failure<never>` with `E = never`, since defects do not appear in
the typed error channel.

**Example** (Creating a defect Exit)

```ts
import { Exit } from "effect"

const exit = Exit.die(new Error("Unexpected error"))
console.log(Exit.isFailure(exit)) // true
```

**See**

- `fail` to create a Failure from a typed error
- `hasDies` to check whether an Exit contains defects

**Signature**

```ts
declare const die: (defect: unknown) => Exit<never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Exit.ts#L314)

Since v2.0.0

## fail

Creates a failed Exit from a typed error value.

**When to use**

Use when you need to represent an expected typed failure as an `Exit`.

**Details**

The error is wrapped in a `Cause.Fail` internally.

Returns a `Failure<never, E>`.

**Example** (Creating a failed Exit)

```ts
import { Exit } from "effect"

const exit = Exit.fail("Something went wrong")
console.log(Exit.isFailure(exit)) // true
```

**See**

- `succeed` to create a successful Exit
- `die` to create a Failure from an unexpected defect
- `failCause` to create a Failure from a full Cause

**Signature**

```ts
declare const fail: <E>(e: E) => Exit<never, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Exit.ts#L282)

Since v2.0.0

## failCause

Creates a failed Exit from a Cause.

**When to use**

Use when you already have a `Cause<E>` and want to wrap it in an Exit
for advanced error handling where you need full control over the Cause
structure.

**Details**

Returns a `Failure<never, E>`. If you only have an error value, use
`fail` instead.

**Example** (Creating a failed Exit from a Cause)

```ts
import { Cause, Exit } from "effect"

const cause = Cause.fail("Something went wrong")
const exit = Exit.failCause(cause)
console.log(Exit.isFailure(exit)) // true
```

**See**

- `fail` to create a Failure from a plain error value
- `die` to create a Failure from a defect

**Signature**

```ts
declare const failCause: <E>(cause: Cause.Cause<E>) => Exit<never, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Exit.ts#L251)

Since v2.0.0

## interrupt

Creates a failed Exit representing fiber interruption.

**When to use**

Use to signal that a fiber was interrupted.

**Details**

Optionally pass a fiber ID to identify which fiber was interrupted. Returns
a `Failure<never>` with an `Interrupt` cause.

**Example** (Creating an interruption Exit)

```ts
import { Exit } from "effect"

const exit = Exit.interrupt(123)
console.log(Exit.isFailure(exit)) // true
console.log(Exit.hasInterrupts(exit)) // true
```

**See**

- `hasInterrupts` to check whether an Exit contains interruptions

**Signature**

```ts
declare const interrupt: (fiberId?: number | undefined) => Exit<never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Exit.ts#L343)

Since v2.0.0

## succeed

Creates a successful Exit containing the given value.

**When to use**

Use when you need an Exit that contains a known success value.

**Details**

Returns a `Success<A>` with the provided value. Does not perform any
computation.

**Example** (Creating a successful Exit)

```ts
import { Exit } from "effect"

const exit = Exit.succeed(42)
console.log(Exit.isSuccess(exit)) // true
```

**See**

- `fail` to create a failed Exit
- `void` for a pre-allocated success with no value

**Signature**

```ts
declare const succeed: <A>(a: A) => Exit<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Exit.ts#L219)

Since v2.0.0

## void

Provides a pre-allocated successful Exit with a `void` value.

**When to use**

Use when you need a shared successful `Exit` with no meaningful value.

**Details**

Equivalent to `Exit.succeed(undefined)` but shared as a single instance,
avoiding allocation for a common case.

**Example** (Referencing the void Exit)

```ts
import { Exit } from "effect"

const exit = Exit.void
console.log(Exit.isSuccess(exit)) // true
```

**See**

- `succeed` to create a success with a specific value
- `asVoid` to discard the value of an existing Exit

**Signature**

```ts
declare const void: Exit<void, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Exit.ts#L374)

Since v2.0.0

# filtering

## filterCause

Extracts the Cause from a failed Exit as a Result.

**When to use**

Use when composing Exit checks with `Filter` or other `Result`-based
filtering APIs and you want the raw Cause rather than the Failure wrapper.

**Details**

Returns `Result.succeed(cause)` when the Exit is a Failure, or
`Result.fail(success)` with the original Success otherwise.

**Gotchas**

This is not an `Option` accessor or an Effect failure. A failed extraction is
represented as data in the `Result` failure channel.

**Example** (Filtering for the cause)

```ts
import { Exit, Result } from "effect"

const exit = Exit.fail("err")
const result = Exit.filterCause(exit)

console.log(Result.isSuccess(result)) // true
```

**See**

- `filterFailure` to get the full Failure object
- `getCause` to get the Cause as an Option instead

**Signature**

```ts
declare const filterCause: <A, E>(self: Exit<A, E>) => Result.Result<Cause.Cause<E>, Success<A>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Exit.ts#L673)

Since v4.0.0

## filterFailure

Extracts the Failure variant from an Exit as a Result.

**When to use**

Use when composing Exit checks with `Filter` or other `Result`-based
filtering APIs and you want the full Failure wrapper.

**Details**

Returns `Result.succeed(failure)` when the Exit is a Failure, or
`Result.fail(success)` with the original Success otherwise.

**Gotchas**

This is not an `Option` accessor or an Effect failure. A failed extraction is
represented as data in the `Result` failure channel.

**Example** (Filtering for failure)

```ts
import { Exit, Result } from "effect"

const exit = Exit.fail("err")
const result = Exit.filterFailure(exit)

console.log(Result.isSuccess(result)) // true
```

**See**

- `filterSuccess` for the inverse
- `filterCause` to extract the Cause directly

**Signature**

```ts
declare const filterFailure: <A, E>(self: Exit<A, E>) => Result.Result<Failure<never, E>, Success<A>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Exit.ts#L635)

Since v4.0.0

## filterSuccess

Extracts the Success variant from an Exit as a Result.

**When to use**

Use when composing Exit checks with `Filter` or other `Result`-based
filtering APIs and you want the full Success wrapper.

**Details**

Returns `Result.succeed(success)` when the Exit is a Success, or
`Result.fail(failure)` with the original Failure otherwise.

**Gotchas**

This is not an `Option` accessor or an Effect failure. A failed extraction is
represented as data in the `Result` failure channel.

**Example** (Filtering for success)

```ts
import { Exit, Result } from "effect"

const exit = Exit.succeed(42)
const result = Exit.filterSuccess(exit)

console.log(Result.isSuccess(result)) // true
```

**See**

- `filterFailure` for the inverse
- `filterValue` to extract the raw value instead of the Success object

**Signature**

```ts
declare const filterSuccess: <A, E>(self: Exit<A, E>) => Result.Result<Success<A>, Failure<never, E>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Exit.ts#L558)

Since v4.0.0

## filterValue

Extracts the success value from an Exit as a Result.

**When to use**

Use when composing Exit checks with `Filter` or other `Result`-based
filtering APIs and you want the raw success value rather than the Success
wrapper.

**Details**

Returns `Result.succeed(value)` when the Exit is a Success, or
`Result.fail(failure)` with the original Failure otherwise.

**Gotchas**

This is not an `Option` accessor or an Effect failure. A failed extraction is
represented as data in the `Result` failure channel.

**Example** (Filtering for the value)

```ts
import { Exit, Result } from "effect"

const exit = Exit.succeed(42)
const result = Exit.filterValue(exit)

console.log(Result.isSuccess(result) && result.success) // 42
```

**See**

- `filterSuccess` to get the full Success object
- `getSuccess` to get the value as an Option instead

**Signature**

```ts
declare const filterValue: <A, E>(self: Exit<A, E>) => Result.Result<A, Failure<never, E>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Exit.ts#L598)

Since v4.0.0

## findDefect

Extracts the first defect from a failed Exit as a Result.

**When to use**

Use when you need the first defect from an `Exit` as a `Result` for
`Filter` or other `Result`-based filtering APIs.

**Details**

Returns `Result.succeed(defect)` when the Cause contains a Die reason, or
`Result.fail(exit)` with the original Exit otherwise.

**Gotchas**

Only finds the first Die reason. If the Cause has multiple defects, the rest
are ignored.

**Example** (Finding the first defect)

```ts
import { Exit, Result } from "effect"

const exit = Exit.die("boom")
const result = Exit.findDefect(exit)
console.log(Result.isSuccess(result) && result.success) // "boom"

const typed = Exit.fail("err")
const noDefect = Exit.findDefect(typed)
console.log(Result.isFailure(noDefect)) // true
```

**See**

- `findError` to find typed errors instead
- `hasDies` to check for defects without extracting them

**Signature**

```ts
declare const findDefect: <A, E>(input: Exit<A, E>) => Result.Result<unknown, Exit<A, E>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Exit.ts#L753)

Since v4.0.0

## findError

Extracts the first typed error value from a failed Exit as a Result.

**When to use**

Use when you need the first typed error from an `Exit` as a `Result` for
`Filter` or other `Result`-based filtering APIs.

**Details**

Returns `Result.succeed(error)` when the Cause contains a Fail reason, or
`Result.fail(exit)` with the original Exit otherwise.

**Gotchas**

Only finds the first Fail reason. If the Cause has multiple errors, the rest
are ignored.

**Example** (Finding the first typed error)

```ts
import { Exit, Result } from "effect"

const exit = Exit.fail("not found")
const result = Exit.findError(exit)
console.log(Result.isSuccess(result) && result.success) // "not found"

const defect = Exit.die(new Error("bug"))
const noError = Exit.findError(defect)
console.log(Result.isFailure(noError)) // true
```

**See**

- `findErrorOption` to get the error as an Option instead
- `findDefect` to find defects instead

**Signature**

```ts
declare const findError: <A, E>(input: Exit<A, E>) => Result.Result<E, Exit<A, E>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Exit.ts#L713)

Since v4.0.0

# guards

## hasDies

Checks whether a failed Exit contains defects (Die reasons).

**When to use**

Use to check whether an `Exit` failure cause contains unexpected errors.

**Details**

Returns `false` for successful exits. Only checks for `Die` reasons in the
Cause. A Cause with only `Fail` or `Interrupt` reasons returns `false`.

**Example** (Checking for defects)

```ts
import { Exit } from "effect"

console.log(Exit.hasDies(Exit.die(new Error("bug")))) // true
console.log(Exit.hasDies(Exit.fail("err"))) // false
console.log(Exit.hasDies(Exit.succeed(42))) // false
```

**See**

- `hasFails` to check for typed errors
- `hasInterrupts` to check for interruptions

**Signature**

```ts
declare const hasDies: <A, E>(self: Exit<A, E>) => self is Failure<A, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Exit.ts#L491)

Since v4.0.0

## hasFails

Checks whether a failed Exit contains typed errors (Fail reasons).

**When to use**

Use to distinguish typed failures from defects or interruptions.

**Details**

Returns `false` for successful exits. Only checks for `Fail` reasons in the
Cause. A Cause with only `Die` or `Interrupt` reasons returns `false`.

**Example** (Checking for typed errors)

```ts
import { Exit } from "effect"

console.log(Exit.hasFails(Exit.fail("err"))) // true
console.log(Exit.hasFails(Exit.die(new Error("bug")))) // false
console.log(Exit.hasFails(Exit.succeed(42))) // false
```

**See**

- `hasDies` to check for defects
- `hasInterrupts` to check for interruptions

**Signature**

```ts
declare const hasFails: <A, E>(self: Exit<A, E>) => self is Failure<A, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Exit.ts#L461)

Since v4.0.0

## hasInterrupts

Checks whether a failed Exit contains interruptions (Interrupt reasons).

**When to use**

Use to check whether an `Exit` contains fiber interruption.

**Details**

Returns `false` for successful exits. Only checks for `Interrupt` reasons in
the Cause. A Cause with only `Fail` or `Die` reasons returns `false`.

**Example** (Checking for interruptions)

```ts
import { Exit } from "effect"

console.log(Exit.hasInterrupts(Exit.interrupt(1))) // true
console.log(Exit.hasInterrupts(Exit.fail("err"))) // false
console.log(Exit.hasInterrupts(Exit.succeed(42))) // false
```

**See**

- `hasFails` to check for typed errors
- `hasDies` to check for defects

**Signature**

```ts
declare const hasInterrupts: <A, E>(self: Exit<A, E>) => self is Failure<A, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Exit.ts#L521)

Since v4.0.0

## isExit

Checks whether an unknown value is an Exit.

**When to use**

Use to validate unknown values at system boundaries and narrow them to
`Exit<unknown, unknown>`.

**Details**

Does not inspect the contents of the Exit. Returns `true` for both Success
and Failure exits.

**Example** (Checking if a value is an Exit)

```ts
import { Exit } from "effect"

console.log(Exit.isExit(Exit.succeed(42))) // true
console.log(Exit.isExit(Exit.fail("err"))) // true
console.log(Exit.isExit("not an exit")) // false
```

**See**

- `isSuccess` to check for a successful Exit
- `isFailure` to check for a failed Exit

**Signature**

```ts
declare const isExit: (u: unknown) => u is Exit<unknown, unknown>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Exit.ts#L190)

Since v2.0.0

## isFailure

Checks whether an Exit is a Failure.

**When to use**

Use as a type guard to narrow `Exit<A, E>` to `Failure<A, E>` and access the
`cause` property.

**Example** (Narrowing to failure)

```ts
import { Exit } from "effect"

const exit = Exit.fail("error")

if (Exit.isFailure(exit)) {
  console.log(exit.cause)
}
```

**See**

- `isSuccess` for the opposite check
- `match` for exhaustive pattern matching

**Signature**

```ts
declare const isFailure: <A, E>(self: Exit<A, E>) => self is Failure<A, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Exit.ts#L431)

Since v2.0.0

## isSuccess

Checks whether an Exit is a Success.

**When to use**

Use as a type guard to narrow `Exit<A, E>` to `Success<A, E>` and access the
`value` property.

**Example** (Narrowing to success)

```ts
import { Exit } from "effect"

const exit = Exit.succeed(42)

if (Exit.isSuccess(exit)) {
  console.log(exit.value) // 42
}
```

**See**

- `isFailure` for the opposite check
- `match` for exhaustive pattern matching

**Signature**

```ts
declare const isSuccess: <A, E>(self: Exit<A, E>) => self is Success<A, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Exit.ts#L403)

Since v2.0.0

# models

## Exit (type alias)

Represents the result of an Effect computation.

**When to use**

Use when you need to synchronously inspect whether an Effect computation
succeeded or failed.

**Details**

An `Exit<A, E>` is either `Success<A, E>` containing a value of type `A`, or
`Failure<A, E>` containing a `Cause<E>` describing why the computation
failed.

Since `Exit` is also an `Effect`, you can yield it inside `Effect.gen`.

**Example** (Pattern matching on an Exit)

```ts
import { Exit } from "effect"

const success: Exit.Exit<number> = Exit.succeed(42)
const failure: Exit.Exit<number, string> = Exit.fail("error")

const result = Exit.match(success, {
  onSuccess: (value) => `Got value: ${value}`,
  onFailure: (cause) => `Got error: ${cause}`
})
```

**See**

- `Success` for the success case
- `Failure` for the failure case
- `match` for pattern matching

**Signature**

```ts
type Exit<A, E> = Success<A, E> | Failure<A, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Exit.ts#L59)

Since v2.0.0

## Failure (interface)

A failed Exit containing a Cause.

**When to use**

Use when working with the failed branch of an `Exit` after narrowing with
`isFailure`. Access the cause via the `cause` property after
narrowing.

**Details**

The `Cause<E>` may contain typed errors, defects, or interruptions.

**Example** (Accessing the failure cause)

```ts
import { Exit } from "effect"

const failure = Exit.fail("something went wrong")

if (Exit.isFailure(failure)) {
  console.log(failure._tag) // "Failure"
  console.log(failure.cause) // Cause representing the error
}
```

**See**

- `isFailure` to narrow an Exit to Failure
- `Success` for the success counterpart

**Signature**

```ts
export interface Failure<out A, out E> extends Exit.Proto<A, E> {
  readonly _tag: "Failure"
  readonly cause: Cause.Cause<E>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Exit.ts#L156)

Since v2.0.0

## Success (interface)

A successful Exit containing a value.

**When to use**

Use when working with the successful branch of an `Exit` after narrowing
with `isSuccess`. Access the value via the `value` property after
narrowing.

**Example** (Accessing the success value)

```ts
import { Exit } from "effect"

const success = Exit.succeed(42)

if (Exit.isSuccess(success)) {
  console.log(success._tag) // "Success"
  console.log(success.value) // 42
}
```

**See**

- `isSuccess` to narrow an Exit to Success
- `Failure` for the failure counterpart

**Signature**

```ts
export interface Success<out A, out E = never> extends Exit.Proto<A, E> {
  readonly _tag: "Success"
  readonly value: A
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Exit.ts#L119)

Since v2.0.0

# pattern matching

## match

Pattern matches on an Exit, handling both success and failure cases.

**When to use**

Use when you need exhaustive handling of both `Exit` success and failure
outcomes.

**Details**

Calls `onSuccess` with the value if the Exit is a Success, and calls
`onFailure` with the Cause if the Exit is a Failure.

**Example** (Matching on an Exit)

```ts
import { Exit } from "effect"

const success = Exit.succeed(42)

const result = Exit.match(success, {
  onSuccess: (value) => `Got: ${value}`,
  onFailure: () => "Failed"
})
console.log(result) // "Got: 42"
```

**See**

- `isSuccess` and `isFailure` for simple boolean checks

**Signature**

```ts
declare const match: {
  <A, E, X1, X2>(options: {
    readonly onSuccess: (a: NoInfer<A>) => X1
    readonly onFailure: (cause: Cause.Cause<NoInfer<E>>) => X2
  }): (self: Exit<A, E>) => X1 | X2
  <A, E, X1, X2>(
    self: Exit<A, E>,
    options: { readonly onSuccess: (a: A) => X1; readonly onFailure: (cause: Cause.Cause<E>) => X2 }
  ): X1 | X2
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Exit.ts#L787)

Since v2.0.0

# utils

## Exit (namespace)

Namespace containing helper types shared by `Exit` values.

**When to use**

Use to reference helper types that describe the shared structure of `Exit`
values.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Exit.ts#L71)

Since v2.0.0

### Proto (interface)

Base interface shared by both Success and Failure.

**When to use**

Use to describe the common protocol implemented by every `Exit` value.

**Details**

Every Exit is also an Effect, so you can yield it in `Effect.gen`.

**Signature**

```ts
export interface Proto<out A, out E = never> extends Effect.Effect<A, E> {
  readonly [TypeId]: typeof TypeId
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Exit.ts#L86)

Since v4.0.0
