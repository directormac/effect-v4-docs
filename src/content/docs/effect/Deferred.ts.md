---
title: Deferred.ts
nav_order: 21
parent: "effect"
---

## Deferred.ts overview

One-time coordination cells for Effect programs. A `Deferred<A, E>` starts
empty, can be completed exactly once with a success, failure, defect, or
interruption, and lets any number of fibers wait for that result. Awaiting a
`Deferred` suspends the fiber instead of blocking an operating-system thread,
and every waiter observes the same completion.

Since v2.0.0

---

## Exports Grouped by Category

- [Synchronization Utilities](#synchronization-utilities)
  - [into](#into)
- [completion](#completion)
  - [complete](#complete)
  - [completeWith](#completewith)
  - [die](#die)
  - [dieSync](#diesync)
  - [done](#done)
  - [fail](#fail)
  - [failCause](#failcause)
  - [failCauseSync](#failcausesync)
  - [failSync](#failsync)
  - [interrupt](#interrupt)
  - [interruptWith](#interruptwith)
  - [succeed](#succeed)
  - [sync](#sync)
- [constructors](#constructors)
  - [make](#make)
- [getters](#getters)
  - [await](#await)
  - [isDone](#isdone)
  - [isDoneUnsafe](#isdoneunsafe)
  - [poll](#poll)
- [guards](#guards)
  - [isDeferred](#isdeferred)
- [models](#models)
  - [Deferred (interface)](#deferred-interface)
- [unsafe](#unsafe)
  - [doneUnsafe](#doneunsafe)
  - [makeUnsafe](#makeunsafe)
- [utils](#utils)
  - [Deferred (namespace)](#deferred-namespace)
    - [Variance (interface)](#variance-interface)

---

# Synchronization Utilities

## into

Runs an `Effect` and attempts to complete a `Deferred` with the effect's
result.

**When to use**

Use to pipe an effect result into a `Deferred` while preserving success,
failure, defects, and interruption.

**Details**

If the effect succeeds, fails, dies, or is interrupted, that result is used
as the attempted completion. The returned effect cannot fail; it succeeds
with `true` if it completed the `Deferred`, or `false` if the `Deferred` was
already completed.

**Example** (Completing a Deferred from an effect result)

```ts
import { Deferred, Effect } from "effect"

// Define an effect that succeeds
const successEffect = Effect.succeed(42)

const program = Effect.gen(function* () {
  // Create a deferred
  const deferred = yield* Deferred.make<number, string>()

  // Complete the deferred using the successEffect
  const isCompleted = yield* Deferred.into(successEffect, deferred)

  // Access the value of the deferred
  const value = yield* Deferred.await(deferred)
  console.log(value)

  return isCompleted
})

Effect.runPromise(program).then(console.log)
// Output:
// 42
// true
```

**Signature**

```ts
declare const into: {
  <A, E>(deferred: Deferred<A, E>): <R>(self: Effect<A, E, R>) => Effect<boolean, never, R>
  <A, E, R>(self: Effect<A, E, R>, deferred: Deferred<A, E>): Effect<boolean, never, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Deferred.ts#L905)

Since v4.0.0

# completion

## complete

Runs the supplied `Effect` and attempts to complete the `Deferred` with its
memoized result.

**When to use**

Use when completing a `Deferred` should run an effect once and share its
result with all awaiters.

**Details**

The returned effect succeeds with `true` when this call completed the
`Deferred`, or `false` if it was already completed.

**Example** (Completing a Deferred from an effect)

```ts
import { Deferred, Effect } from "effect"

const program = Effect.gen(function* () {
  const deferred = yield* Deferred.make<number>()
  const completed = yield* Deferred.complete(deferred, Effect.succeed(42))
  console.log(completed) // true

  const value = yield* Deferred.await(deferred)
  console.log(value) // 42
})
```

**See**

- `completeWith` for storing an effect directly without memoizing its result

**Signature**

```ts
declare const complete: {
  <A, E, R>(effect: Effect<A, E, R>): (self: Deferred<A, E>) => Effect<boolean, never, R>
  <A, E, R>(self: Deferred<A, E>, effect: Effect<A, E, R>): Effect<boolean, never, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Deferred.ts#L267)

Since v2.0.0

## completeWith

Attempts to complete the `Deferred` with the specified effect directly.

**When to use**

Use to store an already environment-free effect as the completion without
running it during completion.

**Details**

The returned effect succeeds with `true` when this call completed the
`Deferred`, or `false` if it was already completed.

**Gotchas**

The supplied effect is not memoized by `completeWith`; each awaiter may run
the stored effect independently.

**Example** (Completing a Deferred with an effect)

```ts
import { Deferred, Effect } from "effect"

const program = Effect.gen(function* () {
  const deferred = yield* Deferred.make<number>()
  const completed = yield* Deferred.completeWith(deferred, Effect.succeed(42))
  console.log(completed) // true

  const value = yield* Deferred.await(deferred)
  console.log(value) // 42
})
```

**See**

- `complete` for running an effect once and sharing its result
- `done` for completing from an already computed `Exit`

**Signature**

```ts
declare const completeWith: {
  <A, E>(effect: Effect<A, E>): (self: Deferred<A, E>) => Effect<boolean>
  <A, E>(self: Deferred<A, E>, effect: Effect<A, E>): Effect<boolean>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Deferred.ts#L315)

Since v2.0.0

## die

Attempts to complete the `Deferred` with a defect.

**When to use**

Use to complete a `Deferred` with an unexpected defect.

**Details**

Fibers waiting on the `Deferred` die with that defect only if this call
completes it. The returned effect succeeds with `true` when this call
completed the `Deferred`, or `false` if it was already completed.

**Example** (Killing a Deferred with a defect)

```ts
import { Deferred, Effect } from "effect"

const program = Effect.gen(function* () {
  const deferred = yield* Deferred.make<number>()
  const success = yield* Deferred.die(deferred, new Error("Something went wrong"))
  console.log(success) // true
})
```

**Signature**

```ts
declare const die: {
  (defect: unknown): <A, E>(self: Deferred<A, E>) => Effect<boolean>
  <A, E>(self: Deferred<A, E>, defect: unknown): Effect<boolean>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Deferred.ts#L548)

Since v2.0.0

## dieSync

Computes a defect when the returned effect is run, then attempts to complete
the `Deferred` with that defect.

**When to use**

Use to lazily compute an unexpected defect when the completion effect runs.

**Details**

Fibers waiting on the `Deferred` die with the computed defect only if this
call completes it. The returned effect succeeds with `true` when this call
completed the `Deferred`, or `false` if it was already completed.

**Example** (Killing a Deferred with a lazy defect)

```ts
import { Deferred, Effect } from "effect"

const program = Effect.gen(function* () {
  const deferred = yield* Deferred.make<number>()
  const success = yield* Deferred.dieSync(deferred, () => new Error("Lazy error"))
  console.log(success) // true
})
```

**Signature**

```ts
declare const dieSync: {
  (evaluate: LazyArg<unknown>): <A, E>(self: Deferred<A, E>) => Effect<boolean>
  <A, E>(self: Deferred<A, E>, evaluate: LazyArg<unknown>): Effect<boolean>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Deferred.ts#L585)

Since v2.0.0

## done

Completes the `Deferred` with the specified `Exit` value, which will be
propagated to all fibers waiting on the value of the `Deferred`.

**When to use**

Use to complete a `Deferred` from an already computed `Exit`.

**Details**

The returned effect succeeds with `true` when this call completed the
`Deferred`, or `false` if it was already completed.

**Example** (Completing a Deferred with an Exit)

```ts
import { Deferred, Effect, Exit } from "effect"

const program = Effect.gen(function* () {
  const deferred = yield* Deferred.make<number>()
  yield* Deferred.done(deferred, Exit.succeed(42))

  const value = yield* Deferred.await(deferred)
  console.log(value) // 42
})
```

**See**

- `complete` for completing from an effect and memoizing its result
- `completeWith` for storing an effect directly
- `succeed` for completing with a success value
- `failCause` for completing with a failure cause

**Signature**

```ts
declare const done: {
  <A, E>(exit: Exit.Exit<A, E>): (self: Deferred<A, E>) => Effect<boolean>
  <A, E>(self: Deferred<A, E>, exit: Exit.Exit<A, E>): Effect<boolean>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Deferred.ts#L359)

Since v2.0.0

## fail

Attempts to complete the `Deferred` with the specified error.

**When to use**

Use to complete a `Deferred` with a typed failure value.

**Details**

Fibers waiting on the `Deferred` fail with that error only if this call
completes it. The returned effect succeeds with `true` when this call
completed the `Deferred`, or `false` if it was already completed.

**Example** (Failing a Deferred with an error)

```ts
import { Deferred, Effect } from "effect"

const program = Effect.gen(function* () {
  const deferred = yield* Deferred.make<number, string>()
  const success = yield* Deferred.fail(deferred, "Operation failed")
  console.log(success) // true
})
```

**Signature**

```ts
declare const fail: {
  <E>(error: E): <A>(self: Deferred<A, E>) => Effect<boolean>
  <A, E>(self: Deferred<A, E>, error: E): Effect<boolean>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Deferred.ts#L392)

Since v2.0.0

## failCause

Attempts to complete the `Deferred` with the specified `Cause`.

**When to use**

Use to complete a `Deferred` with a full failure cause.

**Details**

Fibers waiting on the `Deferred` observe that cause only if this call
completes it. The returned effect succeeds with `true` when this call
completed the `Deferred`, or `false` if it was already completed.

**Example** (Failing a Deferred with a Cause)

```ts
import { Cause, Deferred, Effect } from "effect"

const program = Effect.gen(function* () {
  const deferred = yield* Deferred.make<number, string>()
  const success = yield* Deferred.failCause(deferred, Cause.fail("Operation failed"))
  console.log(success) // true
})
```

**Signature**

```ts
declare const failCause: {
  <E>(cause: Cause.Cause<E>): <A>(self: Deferred<A, E>) => Effect<boolean>
  <A, E>(self: Deferred<A, E>, cause: Cause.Cause<E>): Effect<boolean>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Deferred.ts#L467)

Since v2.0.0

## failCauseSync

Computes a `Cause` when the returned effect is run, then attempts to
complete the `Deferred` with that cause.

**When to use**

Use to lazily compute a full failure cause when the `Deferred` completion
effect runs.

**Details**

Fibers waiting on the `Deferred` observe the computed cause only if this
call completes it. The returned effect succeeds with `true` when this call
completed the `Deferred`, or `false` if it was already completed.

**Example** (Failing a Deferred with a lazy Cause)

```ts
import { Cause, Deferred, Effect } from "effect"

const program = Effect.gen(function* () {
  const deferred = yield* Deferred.make<number, string>()
  const success = yield* Deferred.failCauseSync(deferred, () => Cause.fail("Lazy error"))
  console.log(success) // true
})
```

**Signature**

```ts
declare const failCauseSync: {
  <E>(evaluate: LazyArg<Cause.Cause<E>>): <A>(self: Deferred<A, E>) => Effect<boolean>
  <A, E>(self: Deferred<A, E>, evaluate: LazyArg<Cause.Cause<E>>): Effect<boolean>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Deferred.ts#L508)

Since v2.0.0

## failSync

Computes an error when the returned effect is run, then attempts to complete
the `Deferred` with that error.

**When to use**

Use to lazily compute a typed failure value when the `Deferred` completion
effect runs.

**Details**

Fibers waiting on the `Deferred` fail with the computed error only if this
call completes it. The returned effect succeeds with `true` when this call
completed the `Deferred`, or `false` if it was already completed.

**Example** (Failing a Deferred with a lazy error)

```ts
import { Deferred, Effect } from "effect"

const program = Effect.gen(function* () {
  const deferred = yield* Deferred.make<number, string>()
  const success = yield* Deferred.failSync(deferred, () => "Lazy error")
  console.log(success) // true
})
```

**Signature**

```ts
declare const failSync: {
  <E>(evaluate: LazyArg<E>): <A>(self: Deferred<A, E>) => Effect<boolean>
  <A, E>(self: Deferred<A, E>, evaluate: LazyArg<E>): Effect<boolean>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Deferred.ts#L427)

Since v2.0.0

## interrupt

Attempts to complete the `Deferred` with interruption by the current fiber.

**When to use**

Use to complete a `Deferred` as interrupted by the current fiber.

**Details**

Fibers waiting on the `Deferred` are interrupted with the current fiber id
only if this call completes it. The returned effect succeeds with `true`
when this call completed the `Deferred`, or `false` if it was already
completed.

**Example** (Interrupting a Deferred)

```ts
import { Deferred, Effect } from "effect"

const program = Effect.gen(function* () {
  const deferred = yield* Deferred.make<number>()
  const success = yield* Deferred.interrupt(deferred)
  console.log(success) // true
})
```

**Signature**

```ts
declare const interrupt: <A, E>(self: Deferred<A, E>) => Effect<boolean>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Deferred.ts#L623)

Since v2.0.0

## interruptWith

Attempts to complete the `Deferred` with interruption by the specified
`FiberId`.

**When to use**

Use to complete a `Deferred` as interrupted by a specific fiber id.

**Details**

Fibers waiting on the `Deferred` are interrupted with that fiber id only if
this call completes it. The returned effect succeeds with `true` when this
call completed the `Deferred`, or `false` if it was already completed.

**Example** (Interrupting a Deferred with a fiber id)

```ts
import { Deferred, Effect } from "effect"

const program = Effect.gen(function* () {
  const deferred = yield* Deferred.make<number>()
  const success = yield* Deferred.interruptWith(deferred, 42)
  console.log(success) // true
})
```

**Signature**

```ts
declare const interruptWith: {
  (fiberId: number): <A, E>(self: Deferred<A, E>) => Effect<boolean>
  <A, E>(self: Deferred<A, E>, fiberId: number): Effect<boolean>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Deferred.ts#L655)

Since v2.0.0

## succeed

Attempts to complete the `Deferred` with the specified value.

**When to use**

Use to complete a `Deferred` with a successful value.

**Details**

Fibers waiting on the `Deferred` receive the value only if this call
completes it. The returned effect succeeds with `true` when this call
completed the `Deferred`, or `false` if it was already completed.

**Example** (Completing a Deferred with a value)

```ts
import { Deferred, Effect } from "effect"

const program = Effect.gen(function* () {
  const deferred = yield* Deferred.make<number>()
  yield* Deferred.succeed(deferred, 42)

  const value = yield* Deferred.await(deferred)
  console.log(value) // 42
})
```

**Signature**

```ts
declare const succeed: {
  <A>(value: A): <E>(self: Deferred<A, E>) => Effect<boolean>
  <A, E>(self: Deferred<A, E>, value: A): Effect<boolean>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Deferred.ts#L772)

Since v2.0.0

## sync

Computes a value when the returned effect is run, then attempts to complete
the `Deferred` with that value.

**When to use**

Use to lazily compute a successful value when the `Deferred` completion
effect runs.

**Details**

Fibers waiting on the `Deferred` receive the computed value only if this call
completes it. The returned effect succeeds with `true` when this call
completed the `Deferred`, or `false` if it was already completed.

**Example** (Completing a Deferred with a lazy value)

```ts
import { Deferred, Effect } from "effect"

const program = Effect.gen(function* () {
  const deferred = yield* Deferred.make<number>()
  yield* Deferred.sync(deferred, () => 42)

  const value = yield* Deferred.await(deferred)
  console.log(value) // 42
})
```

**Signature**

```ts
declare const sync: {
  <A>(evaluate: LazyArg<A>): <E>(self: Deferred<A, E>) => Effect<boolean>
  <A, E>(self: Deferred<A, E>, evaluate: LazyArg<A>): Effect<boolean>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Deferred.ts#L809)

Since v2.0.0

# constructors

## make

Creates a new `Deferred`.

**When to use**

Use to allocate an empty `Deferred` inside an `Effect` workflow.

**Example** (Creating a Deferred)

```ts
import { Deferred, Effect } from "effect"

const program = Effect.gen(function* () {
  const deferred = yield* Deferred.make<number>()
  yield* Deferred.succeed(deferred, 42)
  const value = yield* Deferred.await(deferred)
  console.log(value) // 42
})
```

**Signature**

```ts
declare const make: <A, E = never>() => Effect<Deferred<A, E>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Deferred.ts#L183)

Since v2.0.0

# getters

## await

Retrieves the value of the `Deferred`, suspending the fiber running the
workflow until the result is available.

**When to use**

Use to wait for a `Deferred` to be completed and resume with its success,
failure, defect, or interruption.

**Details**

Awaiters observe the completion effect stored in the `Deferred`.

**Example** (Awaiting a Deferred value)

```ts
import { Deferred, Effect } from "effect"

const program = Effect.gen(function* () {
  const deferred = yield* Deferred.make<number>()
  yield* Deferred.succeed(deferred, 42)

  const value = yield* Deferred.await(deferred)
  console.log(value) // 42
})
```

**See**

- `complete` for completing from an effect and memoizing its result
- `completeWith` for completing with an effect directly

**Signature**

```ts
declare const await: <A, E>(self: Deferred<A, E>) => Effect<A, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Deferred.ts#L230)

Since v2.0.0

## isDone

Returns `true` if this `Deferred` has already been completed with a value or
an error, `false` otherwise.

**When to use**

Use to check completion status inside an `Effect` workflow.

**Example** (Checking Deferred completion)

```ts
import { Deferred, Effect } from "effect"

const program = Effect.gen(function* () {
  const deferred = yield* Deferred.make<number>()
  const beforeCompletion = yield* Deferred.isDone(deferred)
  console.log(beforeCompletion) // false

  yield* Deferred.succeed(deferred, 42)
  const afterCompletion = yield* Deferred.isDone(deferred)
  console.log(afterCompletion) // true
})
```

**Signature**

```ts
declare const isDone: <A, E>(self: Deferred<A, E>) => Effect<boolean>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Deferred.ts#L691)

Since v2.0.0

## isDoneUnsafe

Returns whether this `Deferred` has already been completed synchronously.

**When to use**

Use to check `Deferred` completion synchronously in code that cannot return
an `Effect`, such as low-level integration code.

**See**

- `isDone` for checking completion inside `Effect`
- `poll` for reading the completed effect when available

**Signature**

```ts
declare const isDoneUnsafe: <A, E>(self: Deferred<A, E>) => boolean
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Deferred.ts#L707)

Since v4.0.0

## poll

Returns the current completion effect as an `Option`. This returns
`Option.some(effect)` when the `Deferred` is completed, `Option.none()`
otherwise.

**When to use**

Use to inspect whether a `Deferred` is already completed and retrieve its
stored completion effect when available.

**Example** (Polling Deferred completion)

```ts
import { Deferred, Effect } from "effect"

const program = Effect.gen(function* () {
  const deferred = yield* Deferred.make<number>()
  const beforeCompletion = yield* Deferred.poll(deferred)
  console.log(beforeCompletion._tag === "None") // true

  yield* Deferred.succeed(deferred, 42)
  const afterCompletion = yield* Deferred.poll(deferred)
  console.log(afterCompletion._tag === "Some") // true
})
```

**Signature**

```ts
declare const poll: <A, E>(self: Deferred<A, E>) => Effect<Option.Option<Effect<A, E>>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Deferred.ts#L738)

Since v2.0.0

# guards

## isDeferred

Checks whether a value is a `Deferred`.

**When to use**

Use to validate unknown values at runtime boundaries before treating them as
`Deferred` values.

**Signature**

```ts
declare const isDeferred: <A, E>(u: unknown) => u is Deferred<A, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Deferred.ts#L87)

Since v4.0.0

# models

## Deferred (interface)

A `Deferred` represents an asynchronous variable that can be set exactly
once, with the ability for an arbitrary number of fibers to suspend (by
calling `Deferred.await`) and automatically resume when the variable is set.

**When to use**

Use to coordinate multiple fibers around a value or failure that will be
supplied exactly once.

**Example** (Creating a Deferred for inter-fiber communication)

```ts
import { Deferred, Effect, Fiber } from "effect"

// Create and use a Deferred for inter-fiber communication
const program = Effect.gen(function* () {
  // Create a Deferred that will hold a string value
  const deferred: Deferred.Deferred<string> = yield* Deferred.make<string>()

  // Fork a fiber that will set the deferred value
  const producer = yield* Effect.forkChild(
    Effect.gen(function* () {
      yield* Effect.sleep("100 millis")
      yield* Deferred.succeed(deferred, "Hello, World!")
    })
  )

  // Fork a fiber that will await the deferred value
  const consumer = yield* Effect.forkChild(
    Effect.gen(function* () {
      const value = yield* Deferred.await(deferred)
      console.log("Received:", value)
      return value
    })
  )

  // Wait for both fibers to complete
  yield* Fiber.join(producer)
  const result = yield* Fiber.join(consumer)
  return result
})
```

**Signature**

```ts
export interface Deferred<in out A, in out E = never> extends Deferred.Variance<A, E>, Pipeable {
  effect?: Effect<A, E>
  resumes?: Array<(effect: Effect<A, E>) => void> | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Deferred.ts#L71)

Since v2.0.0

# unsafe

## doneUnsafe

Attempts to complete the `Deferred` synchronously with the specified
completion effect.

**When to use**

Use to complete a `Deferred` synchronously in low-level code that already has
the completion effect.

**Details**

This mutates the `Deferred` directly and should be reserved for low-level
code; prefer the effectful completion APIs when possible. Returns `true` if
this call completed the `Deferred`, or `false` if it was already completed.

**Example** (Completing a Deferred unsafely)

```ts
import { Deferred, Effect } from "effect"

const deferred = Deferred.makeUnsafe<number>()
const success = Deferred.doneUnsafe(deferred, Effect.succeed(42))
console.log(success) // true
```

**Signature**

```ts
declare const doneUnsafe: <A, E>(self: Deferred<A, E>, effect: Effect<A, E>) => boolean
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Deferred.ts#L846)

Since v4.0.0

## makeUnsafe

Creates an empty `Deferred` synchronously outside the `Effect` runtime.

**When to use**

Use to allocate a `Deferred` synchronously when direct allocation outside
`Effect` is required.

**Example** (Creating a Deferred unsafely)

```ts
import { Deferred } from "effect"

const deferred = Deferred.makeUnsafe<number>()
console.log(deferred)
```

**Signature**

```ts
declare const makeUnsafe: <A, E = never>() => Deferred<A, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Deferred.ts#L153)

Since v4.0.0

# utils

## Deferred (namespace)

Companion namespace containing type-level metadata for `Deferred`.

**When to use**

Use to reference type-level metadata associated with `Deferred`.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Deferred.ts#L98)

Since v2.0.0

### Variance (interface)

Type-level variance marker for the value and error channels of `Deferred`.

**When to use**

Use to carry the value and error type parameters for `Deferred` in Effect's
type machinery.

**Details**

This interface is part of the public type structure and is not intended to
be constructed directly.

**Signature**

```ts
export interface Variance<in out A, in out E> {
  readonly [TypeId]: {
    readonly _A: Types.Invariant<A>
    readonly _E: Types.Invariant<E>
  }
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Deferred.ts#L115)

Since v2.0.0
