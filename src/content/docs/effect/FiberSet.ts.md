---
title: FiberSet.ts
nav_order: 35
parent: "effect"
---

## FiberSet.ts overview

Manages many fibers together inside one scope.

A `FiberSet<A, E>` tracks running fibers, removes each fiber when it
completes, and interrupts all still-running fibers when the owning scope
closes. This module includes scoped runtime constructors plus helpers for
adding, clearing, running, counting, joining, and waiting for managed fibers.

Since v2.0.0

---

## Exports Grouped by Category

- [combinators](#combinators)
  - [add](#add)
  - [addUnsafe](#addunsafe)
  - [awaitEmpty](#awaitempty)
  - [clear](#clear)
  - [join](#join)
  - [run](#run)
  - [runtime](#runtime)
  - [runtimePromise](#runtimepromise)
  - [size](#size)
- [constructors](#constructors)
  - [make](#make)
  - [makeRuntime](#makeruntime)
  - [makeRuntimePromise](#makeruntimepromise)
- [models](#models)
  - [FiberSet (interface)](#fiberset-interface)
- [refinements](#refinements)
  - [isFiberSet](#isfiberset)

---

# combinators

## add

Adds a fiber to the FiberSet. When the fiber completes, it will be removed.

**Example** (Adding a fiber)

```ts
import { Effect, FiberSet } from "effect"

const program = Effect.gen(function* () {
  const set = yield* FiberSet.make()
  const fiber = yield* Effect.forkChild(Effect.succeed("hello"))

  // Add the fiber to the set
  yield* FiberSet.add(set, fiber)

  // The fiber is now managed by the set
  console.log(yield* FiberSet.size(set)) // 1
})
```

**Signature**

```ts
declare const add: {
  <A, E, XE extends E, XA extends A>(
    fiber: Fiber.Fiber<XA, XE>,
    options?: { readonly propagateInterruption?: boolean | undefined } | undefined
  ): (self: FiberSet<A, E>) => Effect.Effect<void>
  <A, E, XE extends E, XA extends A>(
    self: FiberSet<A, E>,
    fiber: Fiber.Fiber<XA, XE>,
    options?: { readonly propagateInterruption?: boolean | undefined } | undefined
  ): Effect.Effect<void>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FiberSet.ts#L362)

Since v2.0.0

## addUnsafe

Adds an existing fiber to the `FiberSet` using a synchronous, unsafe
mutation.

**When to use**

Use when an already forked fiber must be registered immediately and
synchronous interruption on a closed set is acceptable.

**Details**

When the fiber completes, it is removed from the set. If the set is already
closed, the supplied fiber is interrupted immediately. Non-interruption
failures are recorded for `FiberSet.join`.

**Example** (Adding a fiber unsafely)

```ts
import { Effect, FiberSet } from "effect"

const program = Effect.gen(function* () {
  const set = yield* FiberSet.make()
  const fiber = yield* Effect.forkChild(Effect.succeed("hello"))

  // Unsafe add - doesn't return an Effect
  FiberSet.addUnsafe(set, fiber)

  // The fiber is now managed by the set
  console.log(yield* FiberSet.size(set)) // 1
})
```

**Signature**

```ts
declare const addUnsafe: {
  <A, E, XE extends E, XA extends A>(
    fiber: Fiber.Fiber<XA, XE>,
    options?: { readonly propagateInterruption?: boolean | undefined } | undefined
  ): (self: FiberSet<A, E>) => void
  <A, E, XE extends E, XA extends A>(
    self: FiberSet<A, E>,
    fiber: Fiber.Fiber<XA, XE>,
    options?: { readonly propagateInterruption?: boolean | undefined } | undefined
  ): void
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FiberSet.ts#L293)

Since v4.0.0

## awaitEmpty

Waits until the fiber set is empty.

**Example** (Waiting for an empty set)

```ts
import { Effect, FiberSet } from "effect"

const program = Effect.gen(function* () {
  const set = yield* FiberSet.make()

  // Add some fibers that will complete
  yield* FiberSet.run(set, Effect.sleep(100))
  yield* FiberSet.run(set, Effect.sleep(200))

  // Wait for all fibers to complete
  yield* FiberSet.awaitEmpty(set)

  console.log(yield* FiberSet.size(set)) // 0
})
```

**Signature**

```ts
declare const awaitEmpty: <A, E>(self: FiberSet<A, E>) => Effect.Effect<void>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FiberSet.ts#L708)

Since v3.13.0

## clear

Interrupts all fibers in the `FiberSet` and clears the set.

**Example** (Clearing all fibers)

```ts
import { Effect, FiberSet } from "effect"

const program = Effect.gen(function* () {
  const set = yield* FiberSet.make()

  // Add some fibers
  yield* FiberSet.run(set, Effect.never)
  yield* FiberSet.run(set, Effect.never)

  console.log(yield* FiberSet.size(set)) // 2

  // Clear all fibers
  yield* FiberSet.clear(set)

  console.log(yield* FiberSet.size(set)) // 0
})
```

**Signature**

```ts
declare const clear: <A, E>(self: FiberSet<A, E>) => Effect.Effect<void>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FiberSet.ts#L414)

Since v2.0.0

## join

Joins all fibers in the FiberSet. If any fiber in the set terminates with a failure,
the returned Effect will terminate with the first failure that occurred.

**Example** (Joining failing fibers)

```ts
import { Effect, FiberSet } from "effect"

Effect.gen(function* () {
  const set = yield* FiberSet.make()
  yield* FiberSet.add(set, Effect.runFork(Effect.fail("error")))

  // parent fiber will fail with "error"
  yield* FiberSet.join(set)
})
```

**Signature**

```ts
declare const join: <A, E>(self: FiberSet<A, E>) => Effect.Effect<void, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FiberSet.ts#L680)

Since v2.0.0

## run

Forks an Effect and add the forked fiber to the FiberSet.
When the fiber completes, it will be removed from the FiberSet.

**Example** (Forking effects into a set)

```ts
import { Effect, Fiber, FiberSet } from "effect"

const program = Effect.gen(function* () {
  const set = yield* FiberSet.make()

  // Fork and add to set
  const fiber1 = yield* FiberSet.run(set, Effect.succeed("hello"))
  const fiber2 = yield* FiberSet.run(set, Effect.succeed("world"))

  // Get results
  const result1 = yield* Fiber.await(fiber1)
  const result2 = yield* Fiber.await(fiber2)

  console.log(result1, result2) // "hello" "world"
})
```

**Signature**

```ts
declare const run: {
  <A, E>(
    self: FiberSet<A, E>,
    options?:
      | { readonly propagateInterruption?: boolean | undefined; readonly startImmediately?: boolean | undefined }
      | undefined
  ): <R, XE extends E, XA extends A>(effect: Effect.Effect<XA, XE, R>) => Effect.Effect<Fiber.Fiber<XA, XE>, never, R>
  <A, E, R, XE extends E, XA extends A>(
    self: FiberSet<A, E>,
    effect: Effect.Effect<XA, XE, R>,
    options?:
      | { readonly propagateInterruption?: boolean | undefined; readonly startImmediately?: boolean | undefined }
      | undefined
  ): Effect.Effect<Fiber.Fiber<XA, XE>, never, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FiberSet.ts#L459)

Since v2.0.0

## runtime

Captures a `Runtime` and uses it to fork effects into the `FiberSet`.

**Example** (Capturing a runtime)

```ts
import { Context, Effect, FiberSet } from "effect"

interface Users {
  readonly _: unique symbol
}
const Users = Context.Service<
  Users,
  {
    getAll: Effect.Effect<Array<unknown>>
  }
>("Users")

Effect.gen(function* () {
  const set = yield* FiberSet.make()
  const run = yield* FiberSet.runtime(set)<Users>()

  // run some effects and add the fibers to the set
  run(Effect.andThen(Users, (_) => _.getAll))
}).pipe(
  Effect.scoped // The fibers will be interrupted when the scope is closed
)
```

**Signature**

```ts
declare const runtime: <A, E>(
  self: FiberSet<A, E>
) => <R = never>() => Effect.Effect<
  <XE extends E, XA extends A>(
    effect: Effect.Effect<XA, XE, R>,
    options?: (Effect.RunOptions & { readonly propagateInterruption?: boolean | undefined }) | undefined
  ) => Fiber.Fiber<XA, XE>,
  never,
  R
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FiberSet.ts#L531)

Since v2.0.0

## runtimePromise

Captures a `Runtime` and returns a Promise-based runner that forks effects
into the `FiberSet`.

**When to use**

Use when you need to bridge effects to `Promise` values while still tracking
their fibers in a `FiberSet`.

**Details**

The returned run function returns a `Promise` for each effect result.

**Example** (Running effects as promises)

```ts
import { Effect, FiberSet } from "effect"

const program = Effect.gen(function* () {
  const set = yield* FiberSet.make()
  const runPromise = yield* FiberSet.runtimePromise(set)()

  // Run effects as promises
  const promise1 = runPromise(Effect.succeed("hello"))
  const promise2 = runPromise(Effect.succeed("world"))

  const result1 = yield* Effect.promise(() => promise1)
  const result2 = yield* Effect.promise(() => promise2)

  console.log(result1, result2) // "hello" "world"
})
```

**See**

- `runtime` for a runner that returns the forked `Fiber`

**Signature**

```ts
declare const runtimePromise: <A, E>(
  self: FiberSet<A, E>
) => <R = never>() => Effect.Effect<
  <XE extends E, XA extends A>(
    effect: Effect.Effect<XA, XE, R>,
    options?: (Effect.RunOptions & { readonly propagateInterruption?: boolean | undefined }) | undefined
  ) => Promise<XA>,
  never,
  R
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FiberSet.ts#L601)

Since v3.13.0

## size

Gets the number of fibers currently in the FiberSet.

**Example** (Checking the set size)

```ts
import { Effect, FiberSet } from "effect"

const program = Effect.gen(function* () {
  const set = yield* FiberSet.make()

  console.log(yield* FiberSet.size(set)) // 0

  // Add some fibers
  yield* FiberSet.run(set, Effect.never)
  yield* FiberSet.run(set, Effect.never)

  console.log(yield* FiberSet.size(set)) // 2
})
```

**Signature**

```ts
declare const size: <A, E>(self: FiberSet<A, E>) => Effect.Effect<number>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FiberSet.ts#L656)

Since v2.0.0

# constructors

## make

Creates a scoped `FiberSet` for storing fibers.

**Details**

When the associated Scope is closed, all fibers in the set will be
interrupted. You can add fibers to the set using `FiberSet.add` or
`FiberSet.run`, and the fibers will be automatically removed from the
FiberSet when they complete.

**Example** (Creating a scoped FiberSet)

```ts
import { Effect, FiberSet } from "effect"

Effect.gen(function* () {
  const set = yield* FiberSet.make()

  // run some effects and add the fibers to the set
  yield* FiberSet.run(set, Effect.never)
  yield* FiberSet.run(set, Effect.never)

  yield* Effect.sleep(1000)
}).pipe(
  Effect.scoped // The fibers will be interrupted when the scope is closed
)
```

**Signature**

```ts
declare const make: <A = unknown, E = unknown>() => Effect.Effect<FiberSet<A, E>, never, Scope.Scope>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FiberSet.ts#L144)

Since v2.0.0

## makeRuntime

Creates a scoped run function that forks effects into a new `FiberSet`.

**Details**

Each call returns the forked fiber and adds it to the set. Managed fibers are
removed when they complete and are interrupted when the set's scope closes.

**Example** (Creating a scoped runtime)

```ts
import { Effect, Fiber, FiberSet } from "effect"

const program = Effect.gen(function* () {
  const runFork = yield* FiberSet.makeRuntime()

  // Fork effects using the runtime
  const fiber1 = runFork(Effect.succeed("hello"))
  const fiber2 = runFork(Effect.succeed("world"))

  const result1 = yield* Fiber.await(fiber1)
  const result2 = yield* Fiber.await(fiber2)

  console.log(result1, result2) // "hello" "world"
})
```

**Signature**

```ts
declare const makeRuntime: <R = never, A = unknown, E = unknown>() => Effect.Effect<
  <XE extends E, XA extends A>(
    effect: Effect.Effect<XA, XE, R>,
    options?: (Effect.RunOptions & { readonly propagateInterruption?: boolean | undefined }) | undefined
  ) => Fiber.Fiber<XA, XE>,
  never,
  Scope.Scope | R
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FiberSet.ts#L189)

Since v2.0.0

## makeRuntimePromise

Creates a scoped run function that forks effects into a new `FiberSet` and
returns a `Promise` for each effect result.

**When to use**

Use when many scoped fibers should be tracked as a set while exposing each
result through Promise-based APIs.

**Details**

Managed fibers are removed when they complete and are interrupted when the
set's scope closes. Each Promise resolves with the effect's success value or
rejects with the squashed failure cause.

**Example** (Creating a promise runtime)

```ts
import { Effect, FiberSet } from "effect"

const program = Effect.gen(function* () {
  const runPromise = yield* FiberSet.makeRuntimePromise()

  // Run effects as promises
  const promise1 = runPromise(Effect.succeed("hello"))
  const promise2 = runPromise(Effect.succeed("world"))

  const result1 = yield* Effect.promise(() => promise1)
  const result2 = yield* Effect.promise(() => promise2)

  console.log(result1, result2) // "hello" "world"
})
```

**Signature**

```ts
declare const makeRuntimePromise: <R = never, A = unknown, E = unknown>() => Effect.Effect<
  <XE extends E, XA extends A>(
    effect: Effect.Effect<XA, XE, R>,
    options?: (Effect.RunOptions & { readonly propagateInterruption?: boolean | undefined }) | undefined
  ) => Promise<XA>,
  never,
  R | Scope.Scope
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FiberSet.ts#L239)

Since v3.13.0

# models

## FiberSet (interface)

A FiberSet is a collection of fibers that can be managed together.
When the associated Scope is closed, all fibers in the set will be interrupted.

**Example** (Managing fibers in a set)

```ts
import { Effect, FiberSet } from "effect"

const program = Effect.gen(function* () {
  const set = yield* FiberSet.make<string, string>()

  // Add fibers to the set
  yield* FiberSet.run(set, Effect.succeed("hello"))
  yield* FiberSet.run(set, Effect.succeed("world"))

  // Wait for all fibers to complete
  yield* FiberSet.awaitEmpty(set)
})
```

**Signature**

```ts
export interface FiberSet<out A = unknown, out E = unknown>
  extends Pipeable, Inspectable.Inspectable, Iterable<Fiber.Fiber<A, E>> {
  readonly [TypeId]: typeof TypeId
  readonly deferred: Deferred.Deferred<void, unknown>
  state:
    | {
        readonly _tag: "Open"
        readonly backing: Set<Fiber.Fiber<A, E>>
      }
    | {
        readonly _tag: "Closed"
      }
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FiberSet.ts#L52)

Since v2.0.0

# refinements

## isFiberSet

Checks whether a value is a FiberSet.

**Example** (Checking if a value is a FiberSet)

```ts
import { Effect, FiberSet } from "effect"

Effect.gen(function* () {
  const set = yield* FiberSet.make()

  console.log(FiberSet.isFiberSet(set)) // true
  console.log(FiberSet.isFiberSet({})) // false
})
```

**Signature**

```ts
declare const isFiberSet: (u: unknown) => u is FiberSet<unknown, unknown>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FiberSet.ts#L84)

Since v2.0.0
