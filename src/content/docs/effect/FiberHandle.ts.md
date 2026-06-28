---
title: FiberHandle.ts
nav_order: 33
parent: "effect"
---

## FiberHandle.ts overview

Manages at most one fiber inside a scope.

A `FiberHandle<A, E>` can hold one `Fiber<A, E>`. Installing a new fiber
interrupts the previous one unless the operation is configured with
`onlyIfMissing`, and closing the owning scope interrupts the current fiber.
This module includes constructors for handles and scoped runtimes, helpers
for setting, reading, clearing, and running fibers, and operations for joining
the current fiber or waiting until the handle is empty.

Since v2.0.0

---

## Exports Grouped by Category

- [combinators](#combinators)
  - [awaitEmpty](#awaitempty)
  - [clear](#clear)
  - [get](#get)
  - [getUnsafe](#getunsafe)
  - [join](#join)
  - [run](#run)
  - [runtime](#runtime)
  - [runtimePromise](#runtimepromise)
  - [set](#set)
  - [setUnsafe](#setunsafe)
- [constructors](#constructors)
  - [make](#make)
  - [makeRuntime](#makeruntime)
  - [makeRuntimePromise](#makeruntimepromise)
- [models](#models)
  - [FiberHandle (interface)](#fiberhandle-interface)
- [refinements](#refinements)
  - [isFiberHandle](#isfiberhandle)

---

# combinators

## awaitEmpty

Waits for the fiber in the FiberHandle to complete.

**Example** (Waiting for a fiber to complete)

```ts
import { Effect, FiberHandle } from "effect"

Effect.gen(function* () {
  const handle = yield* FiberHandle.make()

  // Start a long-running effect
  yield* FiberHandle.run(handle, Effect.sleep(1000))

  // Wait for the fiber to complete
  yield* FiberHandle.awaitEmpty(handle)

  console.log("Fiber completed")
})
```

**Signature**

```ts
declare const awaitEmpty: <A, E>(self: FiberHandle<A, E>) => Effect.Effect<void, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FiberHandle.ts#L809)

Since v3.13.0

## clear

Interrupts the fiber currently stored in the `FiberHandle`, if any, and
leaves the handle empty.

**Example** (Clearing a fiber handle)

```ts
import { Effect, FiberHandle } from "effect"

Effect.gen(function* () {
  const handle = yield* FiberHandle.make()

  // Add a fiber
  yield* FiberHandle.run(handle, Effect.never)

  // Clear the handle, interrupting the fiber
  yield* FiberHandle.clear(handle)

  // The handle is now empty
  const fiber = FiberHandle.getUnsafe(handle)
  console.log(fiber) // Option.none()
})
```

**Signature**

```ts
declare const clear: <A, E>(self: FiberHandle<A, E>) => Effect.Effect<void>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FiberHandle.ts#L499)

Since v2.0.0

## get

Retrieves the fiber from the FiberHandle effectfully.

**Example** (Reading the current fiber)

```ts
import { Effect, Fiber, FiberHandle } from "effect"

Effect.gen(function* () {
  const handle = yield* FiberHandle.make()

  // Add a fiber
  yield* FiberHandle.run(handle, Effect.succeed("hello"))

  // Get the current fiber if present
  const fiber = yield* FiberHandle.get(handle)
  if (fiber._tag === "Some") {
    const result = yield* Fiber.await(fiber.value)
    console.log(result) // "hello"
  }
})
```

**Signature**

```ts
declare const get: <A, E>(self: FiberHandle<A, E>) => Effect.Effect<Option.Option<Fiber.Fiber<A, E>>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FiberHandle.ts#L468)

Since v2.0.0

## getUnsafe

Retrieves the fiber from the FiberHandle synchronously.

**When to use**

Use when synchronous inspection of the current fiber is needed and an
`Option` result is enough outside the Effect workflow.

**Example** (Reading the current fiber unsafely)

```ts
import { Effect, FiberHandle } from "effect"

Effect.gen(function* () {
  const handle = yield* FiberHandle.make()

  // No fiber initially
  const emptyFiber = FiberHandle.getUnsafe(handle)
  console.log(emptyFiber._tag === "None") // true

  // Add a fiber
  yield* FiberHandle.run(handle, Effect.succeed("hello"))
  const fiber = FiberHandle.getUnsafe(handle)
  console.log(fiber._tag === "Some") // true
})
```

**Signature**

```ts
declare const getUnsafe: <A, E>(self: FiberHandle<A, E>) => Option.Option<Fiber.Fiber<A, E>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FiberHandle.ts#L438)

Since v4.0.0

## join

Waits for the `FiberHandle` to fail or close.

**Details**

The returned Effect fails with the first managed fiber failure that is not
ignored by the handle's interruption rules. Normal successful completion of
a managed fiber only removes it from the handle; use `awaitEmpty` to wait
for the current fiber to finish.

**Example** (Propagating fiber failures)

```ts
import { Effect, FiberHandle } from "effect"

Effect.gen(function* () {
  const handle = yield* FiberHandle.make()
  yield* FiberHandle.set(handle, Effect.runFork(Effect.fail("error")))

  // parent fiber will fail with "error"
  yield* FiberHandle.join(handle)
})
```

**Signature**

```ts
declare const join: <A, E>(self: FiberHandle<A, E>) => Effect.Effect<void, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FiberHandle.ts#L782)

Since v2.0.0

## run

Forks an Effect and stores the resulting fiber in the `FiberHandle`.

**Details**

The handle manages only one fiber: running a new effect interrupts the
previous fiber unless `onlyIfMissing` is set. When the managed fiber
completes, it is removed from the handle.

**Example** (Running an effect in a fiber handle)

```ts
import { Effect, Fiber, FiberHandle } from "effect"

Effect.gen(function* () {
  const handle = yield* FiberHandle.make()

  // Run an effect and get the fiber
  const fiber = yield* FiberHandle.run(handle, Effect.succeed("hello"))
  const result = yield* Fiber.await(fiber)
  console.log(result) // "hello"

  // Running another effect will interrupt the previous one
  const fiber2 = yield* FiberHandle.run(handle, Effect.succeed("world"))
  const result2 = yield* Fiber.await(fiber2)
  console.log(result2) // "world"
})
```

**Signature**

```ts
declare const run: {
  <A, E>(
    self: FiberHandle<A, E>,
    options?: {
      readonly onlyIfMissing?: boolean
      readonly propagateInterruption?: boolean | undefined
      readonly startImmediately?: boolean | undefined
    }
  ): <R, XE extends E, XA extends A>(effect: Effect.Effect<XA, XE, R>) => Effect.Effect<Fiber.Fiber<XA, XE>, never, R>
  <A, E, R, XE extends E, XA extends A>(
    self: FiberHandle<A, E>,
    effect: Effect.Effect<XA, XE, R>,
    options?: {
      readonly onlyIfMissing?: boolean
      readonly propagateInterruption?: boolean | undefined
      readonly startImmediately?: boolean | undefined
    }
  ): Effect.Effect<Fiber.Fiber<XA, XE>, never, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FiberHandle.ts#L556)

Since v2.0.0

## runtime

Captures the current runtime and returns a function for forking effects into
an existing `FiberHandle`.

**Details**

Each call returns the forked fiber, stores it in the handle, and interrupts
the previous fiber unless `onlyIfMissing` is set.

**Example** (Capturing a runtime for fiber handles)

```ts
import { Context, Effect, FiberHandle } from "effect"

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
  const handle = yield* FiberHandle.make()
  const run = yield* FiberHandle.runtime(handle)<Users>()

  // run an effect and set the fiber in the handle
  run(Effect.andThen(Users, (_) => _.getAll))

  // this will interrupt the previous fiber
  run(Effect.andThen(Users, (_) => _.getAll))
}).pipe(
  Effect.scoped // The fiber will be interrupted when the scope is closed
)
```

**Signature**

```ts
declare const runtime: <A, E>(
  self: FiberHandle<A, E>
) => <R = never>() => Effect.Effect<
  <XE extends E, XA extends A>(
    effect: Effect.Effect<XA, XE, R>,
    options?:
      | {
          readonly signal?: AbortSignal | undefined
          readonly scheduler?: Scheduler | undefined
          readonly onlyIfMissing?: boolean | undefined
          readonly propagateInterruption?: boolean | undefined
        }
      | undefined
  ) => Fiber.Fiber<XA, XE>,
  never,
  R
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FiberHandle.ts#L641)

Since v2.0.0

## runtimePromise

Captures the current runtime and returns a function for running effects in
an existing `FiberHandle` as Promises.

**Details**

Each call stores the forked fiber in the handle and interrupts the previous
fiber unless `onlyIfMissing` is set. The Promise resolves with the effect's
success value or rejects with the squashed failure cause.

**Example** (Capturing a runtime for promises)

```ts
import { Effect, FiberHandle } from "effect"

Effect.gen(function* () {
  const handle = yield* FiberHandle.make()
  const runPromise = yield* FiberHandle.runtimePromise(handle)<never>()

  // Run an effect and get a promise
  const promise = runPromise(Effect.succeed("hello"))
  const result = yield* Effect.promise(() => promise)
  console.log(result) // "hello"
})
```

**Signature**

```ts
declare const runtimePromise: <A, E>(
  self: FiberHandle<A, E>
) => <R = never>() => Effect.Effect<
  <XE extends E, XA extends A>(
    effect: Effect.Effect<XA, XE, R>,
    options?:
      | {
          readonly signal?: AbortSignal | undefined
          readonly scheduler?: Scheduler | undefined
          readonly onlyIfMissing?: boolean | undefined
          readonly propagateInterruption?: boolean | undefined
        }
      | undefined
  ) => Promise<XA>,
  never,
  R
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FiberHandle.ts#L714)

Since v3.13.0

## set

Sets the fiber in the `FiberHandle`.

**Details**

When the fiber completes, it will be removed from the `FiberHandle`. If a
fiber already exists in the `FiberHandle`, it will be interrupted unless
`options.onlyIfMissing` is set.

**Example** (Setting a fiber safely)

```ts
import { Effect, Fiber, FiberHandle } from "effect"

Effect.gen(function* () {
  const handle = yield* FiberHandle.make()
  const fiber = Effect.runFork(Effect.succeed("hello"))

  // Set the fiber safely
  yield* FiberHandle.set(handle, fiber)

  // The fiber is now managed by the handle
  const result = yield* Fiber.await(fiber)
  console.log(result) // "hello"
})
```

**Signature**

```ts
declare const set: {
  <A, E, XE extends E, XA extends A>(
    fiber: Fiber.Fiber<XA, XE>,
    options?: { readonly onlyIfMissing?: boolean; readonly propagateInterruption?: boolean | undefined }
  ): (self: FiberHandle<A, E>) => Effect.Effect<void>
  <A, E, XE extends E, XA extends A>(
    self: FiberHandle<A, E>,
    fiber: Fiber.Fiber<XA, XE>,
    options?: { readonly onlyIfMissing?: boolean; readonly propagateInterruption?: boolean | undefined }
  ): Effect.Effect<void>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FiberHandle.ts#L377)

Since v2.0.0

## setUnsafe

Sets the fiber in a FiberHandle. When the fiber completes, it will be removed from the FiberHandle.
If a fiber is already running, it will be interrupted unless `options.onlyIfMissing` is set.

**When to use**

Use when an existing forked fiber must be installed synchronously into a
handle and immediate interruption of replaced or closed fibers is acceptable.

**Example** (Setting a fiber unsafely)

```ts
import { Effect, Fiber, FiberHandle } from "effect"

Effect.gen(function* () {
  const handle = yield* FiberHandle.make()
  const fiber = Effect.runFork(Effect.succeed("hello"))

  // Set the fiber directly (unsafe)
  FiberHandle.setUnsafe(handle, fiber)

  // The fiber is now managed by the handle
  const result = yield* Fiber.await(fiber)
  console.log(result) // "hello"
})
```

**Signature**

```ts
declare const setUnsafe: {
  <A, E, XE extends E, XA extends A>(
    fiber: Fiber.Fiber<XA, XE>,
    options?: { readonly onlyIfMissing?: boolean | undefined; readonly propagateInterruption?: boolean | undefined }
  ): (self: FiberHandle<A, E>) => void
  <A, E, XE extends E, XA extends A>(
    self: FiberHandle<A, E>,
    fiber: Fiber.Fiber<XA, XE>,
    options?: { readonly onlyIfMissing?: boolean | undefined; readonly propagateInterruption?: boolean | undefined }
  ): void
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FiberHandle.ts#L291)

Since v4.0.0

# constructors

## make

Creates a scoped `FiberHandle` that can store a single fiber.

**Details**

When the associated `Scope` is closed, the contained fiber will be
interrupted. You can add a fiber to the handle using `FiberHandle.run`, and
the fiber will be automatically removed from the `FiberHandle` when it
completes.

**Example** (Creating a scoped fiber handle)

```ts
import { Effect, FiberHandle } from "effect"

Effect.gen(function* () {
  const handle = yield* FiberHandle.make()

  // run some effects
  yield* FiberHandle.run(handle, Effect.never)
  // this will interrupt the previous fiber
  yield* FiberHandle.run(handle, Effect.never)

  yield* Effect.sleep(1000)
}).pipe(
  Effect.scoped // The fiber will be interrupted when the scope is closed
)
```

**Signature**

```ts
declare const make: <A = unknown, E = unknown>() => Effect.Effect<FiberHandle<A, E>, never, Scope.Scope>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FiberHandle.ts#L138)

Since v2.0.0

## makeRuntime

Creates a scoped run function that forks effects into a new `FiberHandle`.

**Details**

Each call returns the forked fiber, stores it in the handle, and interrupts
the previous fiber unless `onlyIfMissing` is set. The managed fiber is
interrupted when the handle's scope closes.

**Example** (Running effects with a fiber handle)

```ts
import { Effect, Fiber, FiberHandle } from "effect"

Effect.gen(function* () {
  const run = yield* FiberHandle.makeRuntime<never>()

  // Run effects and get fibers back
  const fiberA = run(Effect.succeed("first"))
  const fiberB = run(Effect.succeed("second"))

  // The second fiber will interrupt the first
  const resultA = yield* Fiber.await(fiberA)
  const resultB = yield* Fiber.await(fiberB)
}).pipe(Effect.scoped)
```

**Signature**

```ts
declare const makeRuntime: <R, E = unknown, A = unknown>() => Effect.Effect<
  <XE extends E, XA extends A>(
    effect: Effect.Effect<XA, XE, R>,
    options?:
      | {
          readonly signal?: AbortSignal | undefined
          readonly scheduler?: Scheduler | undefined
          readonly onlyIfMissing?: boolean | undefined
          readonly propagateInterruption?: boolean | undefined
        }
      | undefined
  ) => Fiber.Fiber<XA, XE>,
  never,
  Scope.Scope | R
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FiberHandle.ts#L184)

Since v2.0.0

## makeRuntimePromise

Creates a scoped run function that forks effects into a new `FiberHandle`
and returns a `Promise` for each effect result.

**When to use**

Use when integrating a scoped `FiberHandle` runner with Promise-based APIs
and Promise rejection from squashed failures is the desired boundary.

**Details**

Each call stores the fiber in the handle and interrupts the previous fiber
unless `onlyIfMissing` is set. The returned Promise resolves with the
effect's success value or rejects with the squashed failure cause.

**Example** (Running effects as promises)

```ts
import { Effect, FiberHandle } from "effect"

Effect.gen(function* () {
  const run = yield* FiberHandle.makeRuntimePromise()

  // Run effects and get promises back
  const promise = run(Effect.succeed("hello"))
  const result = yield* Effect.promise(() => promise)
  console.log(result) // "hello"
}).pipe(Effect.scoped)
```

**Signature**

```ts
declare const makeRuntimePromise: <R = never, A = unknown, E = unknown>() => Effect.Effect<
  <XE extends E, XA extends A>(
    effect: Effect.Effect<XA, XE, R>,
    options?:
      | {
          readonly signal?: AbortSignal | undefined
          readonly scheduler?: Scheduler | undefined
          readonly onlyIfMissing?: boolean | undefined
          readonly propagateInterruption?: boolean | undefined
        }
      | undefined
  ) => Promise<XA>,
  never,
  Scope.Scope | R
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FiberHandle.ts#L237)

Since v3.13.0

# models

## FiberHandle (interface)

Scoped handle that manages at most one fiber, interrupts the current fiber
when the handle's scope closes, and removes managed fibers from the handle
when they complete.

**Example** (Managing a single fiber)

```ts
import { Effect, Fiber, FiberHandle } from "effect"

Effect.gen(function* () {
  // Create a FiberHandle that can hold fibers producing strings
  const handle = yield* FiberHandle.make<string, never>()

  // The handle can store and manage a single fiber
  const fiber = yield* FiberHandle.run(handle, Effect.succeed("hello"))
  const result = yield* Fiber.await(fiber)
  console.log(result) // "hello"
})
```

**Signature**

```ts
export interface FiberHandle<out A = unknown, out E = unknown> extends Pipeable, Inspectable.Inspectable {
  readonly [TypeId]: typeof TypeId
  readonly deferred: Deferred.Deferred<void, unknown>
  state:
    | {
        readonly _tag: "Open"
        fiber: Fiber.Fiber<A, E> | undefined
      }
    | {
        readonly _tag: "Closed"
      }
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FiberHandle.ts#L55)

Since v2.0.0

# refinements

## isFiberHandle

Returns `true` if a value is a `FiberHandle` by checking for the
`FiberHandle` runtime marker.

**Example** (Checking fiber handles)

```ts
import { Effect, FiberHandle } from "effect"

Effect.gen(function* () {
  const handle = yield* FiberHandle.make()

  console.log(FiberHandle.isFiberHandle(handle)) // true
  console.log(FiberHandle.isFiberHandle("not a handle")) // false
})
```

**Signature**

```ts
declare const isFiberHandle: (u: unknown) => u is FiberHandle
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FiberHandle.ts#L86)

Since v2.0.0
