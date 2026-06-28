---
title: Pull.ts
nav_order: 79
parent: "effect"
---

## Pull.ts overview

Models one low-level pull step for stream-like consumers.

A `Pull<A, E, Done, R>` is an `Effect` that can produce one `A`, fail with an
ordinary error `E`, or signal end-of-input with `Cause.Done<Done>`. The
separate done signal lets low-level consumers distinguish normal completion
from failure. This module includes type extractors and helpers for detecting,
filtering, catching, converting, and matching done signals separately from
ordinary failures.

Since v4.0.0

---

## Exports Grouped by Category

- [Done](#done)
  - [catchDone](#catchdone)
  - [doneExitFromCause](#doneexitfromcause)
  - [filterDone](#filterdone)
  - [filterDoneLeftover](#filterdoneleftover)
  - [filterDoneVoid](#filterdonevoid)
  - [filterNoDone](#filternodone)
  - [isDoneCause](#isdonecause)
  - [isDoneFailure](#isdonefailure)
- [models](#models)
  - [Pull (interface)](#pull-interface)
- [pattern matching](#pattern-matching)
  - [matchEffect](#matcheffect)
- [type extractors](#type-extractors)
  - [Error (type alias)](#error-type-alias)
  - [ExcludeDone (type alias)](#excludedone-type-alias)
  - [Leftover (type alias)](#leftover-type-alias)
  - [Services (type alias)](#services-type-alias)
  - [Success (type alias)](#success-type-alias)

---

# Done

## catchDone

Handles `Cause.Done` failures in an effect while leaving ordinary failures
in the error channel.

**When to use**

Use to recover from a `Cause.Done` completion signal in an effect, such as
turning a pull leftover value into a successful recovery effect while
preserving ordinary failures.

**Details**

The handler receives the done leftover value and may recover with a new
effect. Non-done errors are preserved.

**See**

- `matchEffect` for handling success, ordinary failure, and done outcomes explicitly
- `filterDoneLeftover` for extracting a done leftover from an existing `Cause`

**Signature**

```ts
declare const catchDone: {
  <E, A2, E2, R2>(
    f: (leftover: Cause.Done.Extract<E>) => Effect<A2, E2, R2>
  ): <A, R>(self: Effect<A, E, R>) => Effect<A | A2, ExcludeDone<E> | E2, R | R2>
  <A, R, E, A2, E2, R2>(
    self: Effect<A, E, R>,
    f: (leftover: Cause.Done.Extract<E>) => Effect<A2, E2, R2>
  ): Effect<A | A2, ExcludeDone<E> | E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Pull.ts#L157)

Since v4.0.0

## doneExitFromCause

Converts a `Cause` into an `Exit`, treating `Cause.Done` as successful
completion.

**When to use**

Use to produce an `Exit` for finalizing a low-level pull workflow when a
`Cause.Done` signal should be treated as success and any remaining cause
should fail.

**Details**

If the cause contains a done value, that leftover becomes the successful
value. Otherwise the non-done cause becomes the failure cause.

**See**

- `filterDone` for extracting the done signal without converting the cause to an `Exit`
- `matchEffect` for handling `Pull` success, failure, and done outcomes directly

**Signature**

```ts
declare const doneExitFromCause: <E>(cause: Cause.Cause<E>) => Exit.Exit<Cause.Done.Extract<E>, ExcludeDone<E>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Pull.ts#L325)

Since v4.0.0

## filterDone

Finds a `Cause.Done` failure in a `Cause`.

**When to use**

Use to separate `Cause.Done` completion from ordinary causes while preserving
the typed done value.

**Details**

Returns a successful `Result` with the `Cause.Done` value when one is
present, otherwise returns a failed `Result` containing the non-done cause.

**Signature**

```ts
declare const filterDone: <E>(input: Cause.Cause<E>) => Result.Result<Cause.Done.Only<E>, Cause.Cause<ExcludeDone<E>>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Pull.ts#L223)

Since v4.0.0

## filterDoneLeftover

Filters a Cause to extract the leftover value from done errors.

**When to use**

Use to extract only the leftover value carried by a `Cause.Done` completion
signal.

**Signature**

```ts
declare const filterDoneLeftover: <E>(
  cause: Cause.Cause<E>
) => Result.Result<Cause.Done.Extract<E>, Cause.Cause<ExcludeDone<E>>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Pull.ts#L297)

Since v4.0.0

## filterDoneVoid

Finds a `Cause.Done` failure in a cause whose done value is not used.

**When to use**

Use to detect `Cause.Done` completion in a `Cause` when the completion value
is not part of the downstream logic.

**Details**

Returns a successful `Result` with the done marker when present, otherwise
returns a failed `Result` with the non-done cause.

**See**

- `filterDone` for preserving the typed `Cause.Done` value when the done payload matters
- `filterDoneLeftover` for extracting only the done leftover value
- `filterNoDone` for the inverse filter that succeeds only when no done failure is present

**Signature**

```ts
declare const filterDoneVoid: <E extends Cause.Done>(
  input: Cause.Cause<E>
) => Result.Result<Cause.Done, Cause.Cause<Exclude<E, Cause.Done>>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Pull.ts#L251)

Since v4.0.0

## filterNoDone

Keeps a `Cause` only when it contains no `Cause.Done` failures.

**When to use**

Use to select ordinary failure causes for handling while leaving `Cause.Done`
completion causes outside that handler.

**Details**

Returns a successful `Result` with the cause when every failure is non-done;
otherwise returns a failed `Result` with the original cause.

**See**

- `filterDone` for the inverse typed done filter
- `filterDoneVoid` for done detection when the payload is not needed

**Signature**

```ts
declare const filterNoDone: <E>(input: Cause.Cause<E>) => Result.Result<Cause.Cause<ExcludeDone<E>>, Cause.Cause<E>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Pull.ts#L277)

Since v4.0.0

## isDoneCause

Checks whether a Cause contains any done errors.

**When to use**

Use when you need to test whether a pull failure cause represents normal
completion and only need a boolean result.

**See**

- `isDoneFailure` for checking a single `Cause.Reason`
- `filterDone` for extracting the `Cause.Done` value from a `Cause`
- `filterNoDone` for selecting causes with no done failures

**Signature**

```ts
declare const isDoneCause: <E>(cause: Cause.Cause<E>) => boolean
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Pull.ts#L186)

Since v4.0.0

## isDoneFailure

Checks whether a `Cause.Reason` is a `Fail` reason whose error is a
`Cause.Done` signal.

**When to use**

Use when you need to identify done completion reasons while traversing
`cause.reasons`, before handling ordinary failures.

**See**

- `isDoneCause` for checking an entire `Cause` for any done reason
- `filterDone` for extracting the `Cause.Done` value from a `Cause`

**Signature**

```ts
declare const isDoneFailure: <E>(failure: Cause.Reason<E>) => failure is Cause.Fail<E & Cause.Done<any>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Pull.ts#L203)

Since v4.0.0

# models

## Pull (interface)

An effectful pull step that either produces a value, fails with `E`, or
signals completion with `Cause.Done<Done>`.

**When to use**

Use to model one low-level pull step when a consumer repeatedly evaluates an
effect that may emit a value, fail normally, or signal normal completion
through `Cause.Done`.

**Details**

`Pull` represents completion in the error channel so low-level stream
consumers can distinguish ordinary failures from end-of-input and carry a
leftover value when needed.

**Signature**

```ts
export interface Pull<out A, out E = never, out Done = void, out R = never> extends Effect<
  A,
  E | Cause.Done<Done>,
  R
> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Pull.ts#L40)

Since v4.0.0

# pattern matching

## matchEffect

Pattern matches on a Pull, handling success, failure, and done cases.

**When to use**

Use to handle all three `Pull` outcomes with effectful handlers.

**Example** (Matching Pull outcomes)

```ts
import { Cause, Effect, Pull } from "effect"

const pull = Cause.done("stream ended")

const result = Pull.matchEffect(pull, {
  onSuccess: (value) => Effect.succeed(`Got value: ${value}`),
  onFailure: (cause) => Effect.succeed(`Got error: ${cause}`),
  onDone: (leftover) => Effect.succeed(`Stream halted with: ${leftover}`)
})
```

**Signature**

```ts
declare const matchEffect: {
  <A, E, L, AS, ES, RS, AF, EF, RF, AH, EH, RH>(options: {
    readonly onSuccess: (value: A) => Effect<AS, ES, RS>
    readonly onFailure: (failure: Cause.Cause<E>) => Effect<AF, EF, RF>
    readonly onDone: (leftover: L) => Effect<AH, EH, RH>
  }): <R>(self: Pull<A, E, L, R>) => Effect<AS | AF | AH, ES | EF | EH, R | RS | RF | RH>
  <A, E, L, R, AS, ES, RS, AF, EF, RF, AH, EH, RH>(
    self: Pull<A, E, L, R>,
    options: {
      readonly onSuccess: (value: A) => Effect<AS, ES, RS>
      readonly onFailure: (failure: Cause.Cause<E>) => Effect<AF, EF, RF>
      readonly onDone: (leftover: L) => Effect<AH, EH, RH>
    }
  ): Effect<AS | AF | AH, ES | EF | EH, R | RS | RF | RH>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Pull.ts#L354)

Since v4.0.0

# type extractors

## Error (type alias)

Extracts the error type from a Pull type, excluding Done errors.

**When to use**

Use to derive only the ordinary failure type from a `Pull` when declaring
wrappers or APIs that handle completion separately.

**See**

- `Success` for extracting the pulled value type instead
- `Leftover` for extracting the completion leftover type
- `Services` for extracting the required services type instead
- `ExcludeDone` for excluding `Cause.Done` from an error union

**Signature**

```ts
type Error<P> = P extends Effect<infer _A, infer _E, infer _R> ? (_E extends Cause.Done<infer _L> ? never : _E) : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Pull.ts#L77)

Since v4.0.0

## ExcludeDone (type alias)

Excludes `Cause.Done` completion signals from an error type union.

**When to use**

Use to describe the ordinary error type that remains after `Cause.Done`
completion signals have been handled or filtered out of an error union.

**See**

- `Error` for extracting ordinary failures from a `Pull`
- `Leftover` for extracting the completion leftover type

**Signature**

```ts
type ExcludeDone<E> = Exclude<E, Cause.Done<any>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Pull.ts#L130)

Since v4.0.0

## Leftover (type alias)

Extracts the leftover type from a Pull type.

**When to use**

Use to derive the completion leftover type from an existing `Pull` when
declaring reusable type aliases or helper signatures that preserve a pull's
done value.

**See**

- `Success` for extracting the pulled value type instead
- `Error` for extracting the ordinary failure type, excluding `Cause.Done`
- `Services` for extracting the required services type instead

**Signature**

```ts
type Leftover<P> =
  P extends Effect<infer _A, infer _E, infer _R> ? (_E extends Cause.Done<infer _L> ? _L : never) : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Pull.ts#L96)

Since v4.0.0

## Services (type alias)

Extracts the service requirements (context) type from a Pull type.

**When to use**

Use to derive the context requirements of a generic or inferred `Pull`
without restating its `R` type parameter.

**See**

- `Success` for extracting the pulled value type instead
- `Error` for extracting the ordinary failure type
- `Leftover` for extracting the completion leftover type

**Signature**

```ts
type Services<P> = P extends Effect<infer _A, infer _E, infer _R> ? _R : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Pull.ts#L114)

Since v4.0.0

## Success (type alias)

Extracts the success type from a Pull type.

**When to use**

Use to derive the value produced by an existing `Pull` when declaring
reusable type aliases, low-level stream helpers, or function signatures.

**See**

- `Error` for extracting the ordinary failure type
- `Leftover` for extracting the completion leftover type
- `Services` for extracting the required services type instead

**Signature**

```ts
type Success<P> = P extends Effect<infer _A, infer _E, infer _R> ? _A : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Pull.ts#L59)

Since v4.0.0
