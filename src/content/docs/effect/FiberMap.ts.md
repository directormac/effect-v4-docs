---
title: FiberMap.ts
nav_order: 34
parent: "effect"
---

## FiberMap.ts overview

Manages fibers by key inside a scope.

A `FiberMap<K, A, E>` owns a map of running fibers, interrupts them when its
scope closes, and automatically removes each entry when the corresponding
fiber completes. Use it when a program needs to start, replace, join, or
interrupt background work by a stable key while keeping all fibers tied to
one scope.

Since v2.0.0

---

## Exports Grouped by Category

- [combinators](#combinators)
  - [awaitEmpty](#awaitempty)
  - [clear](#clear)
  - [get](#get)
  - [getUnsafe](#getunsafe)
  - [has](#has)
  - [hasUnsafe](#hasunsafe)
  - [join](#join)
  - [remove](#remove)
  - [run](#run)
  - [runtime](#runtime)
  - [runtimePromise](#runtimepromise)
  - [set](#set)
  - [setUnsafe](#setunsafe)
  - [size](#size)
- [constructors](#constructors)
  - [make](#make)
  - [makeRuntime](#makeruntime)
  - [makeRuntimePromise](#makeruntimepromise)
- [models](#models)
  - [FiberMap (interface)](#fibermap-interface)
- [refinements](#refinements)
  - [isFiberMap](#isfibermap)

---

# combinators

## awaitEmpty

Waits for the FiberMap to be empty.
This will wait for all currently running fibers to complete.

**Example** (Waiting for an empty map)

```ts
import { Effect, FiberMap } from "effect"

const program = Effect.gen(function* () {
  const map = yield* FiberMap.make<string>()

  // Add some fibers that will complete after a delay
  yield* FiberMap.run(map, "task1", Effect.sleep(1000))
  yield* FiberMap.run(map, "task2", Effect.sleep(2000))

  console.log("Waiting for all fibers to complete...")

  // Wait for the map to be empty
  yield* FiberMap.awaitEmpty(map)

  console.log("All fibers completed!")
  console.log(yield* FiberMap.size(map)) // 0
})
```

**Signature**

```ts
declare const awaitEmpty: <K, A, E>(self: FiberMap<K, A, E>) => Effect.Effect<void, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FiberMap.ts#L1025)

Since v3.13.0

## clear

Removes all fibers from the FiberMap, interrupting them.

**Example** (Clearing all fibers)

```ts
import { Effect, FiberMap } from "effect"

const program = Effect.gen(function* () {
  const map = yield* FiberMap.make<string>()

  // Add some fibers to the map
  yield* FiberMap.run(map, "task1", Effect.never)
  yield* FiberMap.run(map, "task2", Effect.never)
  yield* FiberMap.run(map, "task3", Effect.never)

  console.log(yield* FiberMap.size(map)) // 3

  // Clear all fibers (this will interrupt all of them)
  yield* FiberMap.clear(map)

  console.log(yield* FiberMap.size(map)) // 0
})
```

**Signature**

```ts
declare const clear: <K, A, E>(self: FiberMap<K, A, E>) => Effect.Effect<void>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FiberMap.ts#L688)

Since v2.0.0

## get

Retrieves a fiber from the FiberMap effectfully.

**Details**

Returns an `Option` wrapped in `Effect`.

**Example** (Retrieving a fiber)

```ts
import { Deferred, Effect, Fiber, FiberMap } from "effect"

const program = Effect.gen(function* () {
  const map = yield* FiberMap.make<string>()
  const deferred = yield* Deferred.make<string>()

  // Add a fiber to the map
  const fiber = yield* Effect.forkChild(Deferred.await(deferred))
  yield* FiberMap.set(map, "greeting", fiber)

  // Retrieve the fiber with error handling
  const retrieved = yield* FiberMap.get(map, "greeting")
  if (retrieved._tag === "Some") {
    yield* Deferred.succeed(deferred, "Hello")

    const result = yield* Fiber.join(retrieved.value)
    console.log(result) // "Hello"
  }
})
```

**Signature**

```ts
declare const get: {
  <K>(key: K): <A, E>(self: FiberMap<K, A, E>) => Effect.Effect<Option.Option<Fiber.Fiber<A, E>>>
  <K, A, E>(self: FiberMap<K, A, E>, key: K): Effect.Effect<Option.Option<Fiber.Fiber<A, E>>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FiberMap.ts#L534)

Since v2.0.0

## getUnsafe

Retrieves a fiber from the FiberMap synchronously.

**When to use**

Use when synchronous keyed lookup of a fiber in a `FiberMap` is needed and an
`Option` result is enough outside the Effect workflow.

**Example** (Retrieving a fiber unsafely)

```ts
import { Deferred, Effect, Fiber, FiberMap } from "effect"

const program = Effect.gen(function* () {
  const map = yield* FiberMap.make<string>()
  const deferred = yield* Deferred.make<string>()

  // Add a fiber to the map
  const fiber = yield* Effect.forkChild(Deferred.await(deferred))
  FiberMap.setUnsafe(map, "greeting", fiber)

  // Retrieve the fiber
  const retrieved = FiberMap.getUnsafe(map, "greeting")
  if (retrieved._tag === "Some") {
    yield* Deferred.succeed(deferred, "Hello")

    const result = yield* Fiber.join(retrieved.value)
    console.log(result) // "Hello"
  }
})
```

**Signature**

```ts
declare const getUnsafe: {
  <K>(key: K): <A, E>(self: FiberMap<K, A, E>) => Option.Option<Fiber.Fiber<A, E>>
  <K, A, E>(self: FiberMap<K, A, E>, key: K): Option.Option<Fiber.Fiber<A, E>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FiberMap.ts#L490)

Since v4.0.0

## has

Checks whether a key exists in the FiberMap.
This is the Effect-wrapped version of `hasUnsafe`.

**Example** (Checking if a key exists)

```ts
import { Effect, FiberMap } from "effect"

const program = Effect.gen(function* () {
  const map = yield* FiberMap.make<string>()

  // Add a fiber to the map
  yield* FiberMap.run(map, "task1", Effect.never)

  // Check if keys exist using Effect
  const exists1 = yield* FiberMap.has(map, "task1")
  const exists2 = yield* FiberMap.has(map, "task2")

  console.log(exists1) // true
  console.log(exists2) // false
})
```

**Signature**

```ts
declare const has: {
  <K>(key: K): <A, E>(self: FiberMap<K, A, E>) => Effect.Effect<boolean>
  <K, A, E>(self: FiberMap<K, A, E>, key: K): Effect.Effect<boolean>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FiberMap.ts#L602)

Since v2.0.0

## hasUnsafe

Checks whether a key exists in the FiberMap.

**Example** (Checking if a key exists unsafely)

```ts
import { Effect, FiberMap } from "effect"

const program = Effect.gen(function* () {
  const map = yield* FiberMap.make<string>()

  // Add a fiber to the map
  yield* FiberMap.run(map, "task1", Effect.never)

  // Check if keys exist
  console.log(FiberMap.hasUnsafe(map, "task1")) // true
  console.log(FiberMap.hasUnsafe(map, "task2")) // false
})
```

**Signature**

```ts
declare const hasUnsafe: {
  <K>(key: K): <A, E>(self: FiberMap<K, A, E>) => boolean
  <K, A, E>(self: FiberMap<K, A, E>, key: K): boolean
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FiberMap.ts#L566)

Since v4.0.0

## join

Waits for the `FiberMap` to fail or close.

**Details**

The returned Effect fails with the first managed fiber failure that is not
ignored by the map's interruption rules. Normal successful completion
removes fibers from the map; use `awaitEmpty` to wait until the map has no
fibers.

**Example** (Joining failing fibers)

```ts
import { Effect, FiberMap } from "effect"

Effect.gen(function* () {
  const map = yield* FiberMap.make()
  yield* FiberMap.set(map, "a", Effect.runFork(Effect.fail("error")))

  // parent fiber will fail with "error"
  yield* FiberMap.join(map)
})
```

**Signature**

```ts
declare const join: <K, A, E>(self: FiberMap<K, A, E>) => Effect.Effect<void, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FiberMap.ts#L993)

Since v2.0.0

## remove

Removes a fiber from the FiberMap, interrupting it if it exists.

**Example** (Removing a fiber)

```ts
import { Effect, FiberMap } from "effect"

const program = Effect.gen(function* () {
  const map = yield* FiberMap.make<string>()

  // Add some fibers to the map
  yield* FiberMap.run(map, "task1", Effect.never)
  yield* FiberMap.run(map, "task2", Effect.never)

  console.log(yield* FiberMap.size(map)) // 2

  // Remove a specific fiber (this will interrupt it)
  yield* FiberMap.remove(map, "task1")

  console.log(yield* FiberMap.size(map)) // 1
})
```

**Signature**

```ts
declare const remove: {
  <K>(key: K): <A, E>(self: FiberMap<K, A, E>) => Effect.Effect<void>
  <K, A, E>(self: FiberMap<K, A, E>, key: K): Effect.Effect<void>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FiberMap.ts#L637)

Since v2.0.0

## run

Forks an Effect and stores the resulting fiber in the `FiberMap` under a key.

**Details**

When the fiber completes, it is removed from the map. If the key already has
a fiber, the previous fiber is interrupted unless `onlyIfMissing` is set.

**Example** (Forking effects into a map)

```ts
import { Effect, Fiber, FiberMap } from "effect"

const program = Effect.gen(function* () {
  const map = yield* FiberMap.make<string>()

  // Run effects and add the fibers to the map
  const fiber1 = yield* FiberMap.run(map, "task1", Effect.succeed("Hello"))
  const fiber2 = yield* FiberMap.run(map, "task2", Effect.succeed("World"))

  // Join the fibers to get their successful values
  const result1 = yield* Fiber.join(fiber1)
  const result2 = yield* Fiber.join(fiber2)

  console.log(result1, result2) // "Hello", "World"
  console.log(yield* FiberMap.size(map)) // 0 (fibers are removed after completion)
})
```

**Signature**

```ts
declare const run: {
  <K, A, E>(
    self: FiberMap<K, A, E>,
    key: K,
    options?:
      | {
          readonly onlyIfMissing?: boolean | undefined
          readonly propagateInterruption?: boolean | undefined
          readonly startImmediately?: boolean | undefined
        }
      | undefined
  ): <R, XE extends E, XA extends A>(effect: Effect.Effect<XA, XE, R>) => Effect.Effect<Fiber.Fiber<XA, XE>, never, R>
  <K, A, E, R, XE extends E, XA extends A>(
    self: FiberMap<K, A, E>,
    key: K,
    effect: Effect.Effect<XA, XE, R>,
    options?:
      | {
          readonly onlyIfMissing?: boolean | undefined
          readonly propagateInterruption?: boolean | undefined
          readonly startImmediately?: boolean | undefined
        }
      | undefined
  ): Effect.Effect<Fiber.Fiber<XA, XE>, never, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FiberMap.ts#L738)

Since v2.0.0

## runtime

Captures the current runtime and returns a function for forking effects into
an existing `FiberMap`.

**Details**

Each call stores the forked fiber under the supplied key. If that key already
has a fiber, the previous fiber is interrupted unless `onlyIfMissing` is set.

**Example** (Capturing a runtime)

```ts
import { Context, Effect, FiberMap } from "effect"

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
  const map = yield* FiberMap.make<string>()
  const run = yield* FiberMap.runtime(map)<Users>()

  // run some effects and add the fibers to the map
  run(
    "effect-a",
    Effect.andThen(Users, (_) => _.getAll)
  )
  run(
    "effect-b",
    Effect.andThen(Users, (_) => _.getAll)
  )
}).pipe(
  Effect.scoped // The fibers will be interrupted when the scope is closed
)
```

**Signature**

```ts
declare const runtime: <K, A, E>(
  self: FiberMap<K, A, E>
) => <R = never>() => Effect.Effect<
  <XE extends E, XA extends A>(
    key: K,
    effect: Effect.Effect<XA, XE, R>,
    options?:
      | (Effect.RunOptions & {
          readonly onlyIfMissing?: boolean | undefined
          readonly propagateInterruption?: boolean | undefined
        })
      | undefined
  ) => Fiber.Fiber<XA, XE>,
  never,
  R
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FiberMap.ts#L826)

Since v2.0.0

## runtimePromise

Captures the current runtime and returns a function for running effects in
an existing `FiberMap` as Promises.

**Details**

Each call stores the forked fiber under the supplied key, interrupting any
previous fiber for that key unless `onlyIfMissing` is set. The Promise
resolves with the effect's success value or rejects with the squashed failure
cause.

**Example** (Running effects as promises)

```ts
import { Effect, FiberMap } from "effect"

const program = Effect.gen(function* () {
  const map = yield* FiberMap.make<string>()
  const runPromise = yield* FiberMap.runtimePromise(map)<never>()

  // Create promises that will be backed by fibers in the map
  const promise1 = runPromise("task1", Effect.succeed("Hello"))
  const promise2 = runPromise("task2", Effect.succeed("World"))

  // Convert promises back to Effects and await
  const result1 = yield* Effect.promise(() => promise1)
  const result2 = yield* Effect.promise(() => promise2)

  console.log(result1, result2) // "Hello", "World"
})
```

**Signature**

```ts
declare const runtimePromise: <K, A, E>(
  self: FiberMap<K, A, E>
) => <R = never>() => Effect.Effect<
  <XE extends E, XA extends A>(
    key: K,
    effect: Effect.Effect<XA, XE, R>,
    options?:
      | (Effect.RunOptions & {
          readonly onlyIfMissing?: boolean | undefined
          readonly propagateInterruption?: boolean | undefined
        })
      | undefined
  ) => Promise<XA>,
  never,
  R
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FiberMap.ts#L903)

Since v3.13.0

## set

Adds a fiber to the `FiberMap` under a key.

**Details**

When the fiber completes, it is removed from the map. If the key already has
a fiber, that previous fiber is interrupted unless `onlyIfMissing` is set;
in that case the new fiber is interrupted and the existing entry is kept.

This is the Effect-wrapped version of `setUnsafe`.

**Example** (Adding a fiber)

```ts
import { Deferred, Effect, Fiber, FiberMap } from "effect"

const program = Effect.gen(function* () {
  const map = yield* FiberMap.make<string>()
  const deferred = yield* Deferred.make<string>()

  // Create a fiber and add it to the map using Effect
  const fiber = yield* Effect.forkChild(Deferred.await(deferred))
  yield* FiberMap.set(map, "greeting", fiber)

  yield* Deferred.succeed(deferred, "Hello")

  // Join the fiber to get its successful value
  const result = yield* Fiber.join(fiber)
  console.log(result) // "Hello"
})
```

**Signature**

```ts
declare const set: {
  <K, A, E, XE extends E, XA extends A>(
    key: K,
    fiber: Fiber.Fiber<XA, XE>,
    options?:
      | { readonly onlyIfMissing?: boolean | undefined; readonly propagateInterruption?: boolean | undefined }
      | undefined
  ): (self: FiberMap<K, A, E>) => Effect.Effect<void>
  <K, A, E, XE extends E, XA extends A>(
    self: FiberMap<K, A, E>,
    key: K,
    fiber: Fiber.Fiber<XA, XE>,
    options?:
      | { readonly onlyIfMissing?: boolean | undefined; readonly propagateInterruption?: boolean | undefined }
      | undefined
  ): Effect.Effect<void>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FiberMap.ts#L427)

Since v2.0.0

## setUnsafe

Adds a fiber to the `FiberMap` under a key using a synchronous, unsafe
mutation.

**When to use**

Use when an existing forked fiber must be installed under a key immediately
and synchronous interruption of the replaced fiber is acceptable.

**Details**

When the fiber completes, it is removed from the map. If the key already has
a fiber, that previous fiber is interrupted unless `onlyIfMissing` is set;
in that case the new fiber is interrupted and the existing entry is kept.

**Example** (Adding a fiber unsafely)

```ts
import { Deferred, Effect, Fiber, FiberMap } from "effect"

const program = Effect.gen(function* () {
  const map = yield* FiberMap.make<string>()
  const deferred = yield* Deferred.make<string>()

  // Create a fiber and add it to the map
  const fiber = yield* Effect.forkChild(Deferred.await(deferred))
  FiberMap.setUnsafe(map, "greeting", fiber)

  yield* Deferred.succeed(deferred, "Hello")

  // Join the fiber to get its successful value
  const result = yield* Fiber.join(fiber)
  console.log(result) // "Hello"
})
```

**Signature**

```ts
declare const setUnsafe: {
  <K, A, E, XE extends E, XA extends A>(
    key: K,
    fiber: Fiber.Fiber<XA, XE>,
    options?:
      | { readonly onlyIfMissing?: boolean | undefined; readonly propagateInterruption?: boolean | undefined }
      | undefined
  ): (self: FiberMap<K, A, E>) => void
  <K, A, E, XE extends E, XA extends A>(
    self: FiberMap<K, A, E>,
    key: K,
    fiber: Fiber.Fiber<XA, XE>,
    options?:
      | { readonly onlyIfMissing?: boolean | undefined; readonly propagateInterruption?: boolean | undefined }
      | undefined
  ): void
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FiberMap.ts#L327)

Since v4.0.0

## size

Gets the number of fibers currently in the FiberMap.

**Example** (Checking the map size)

```ts
import { Effect, FiberMap } from "effect"

const program = Effect.gen(function* () {
  const map = yield* FiberMap.make<string>()

  console.log(yield* FiberMap.size(map)) // 0

  // Add some fibers
  yield* FiberMap.run(map, "task1", Effect.never)
  yield* FiberMap.run(map, "task2", Effect.never)

  console.log(yield* FiberMap.size(map)) // 2
})
```

**Signature**

```ts
declare const size: <K, A, E>(self: FiberMap<K, A, E>) => Effect.Effect<number>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FiberMap.ts#L963)

Since v2.0.0

# constructors

## make

Creates a scoped `FiberMap` for storing fibers by key.

**Details**

When the associated Scope is closed, all fibers in the map will be
interrupted. You can add fibers to the map using `FiberMap.set` or
`FiberMap.run`, and the fibers will be automatically removed from the
`FiberMap` when they complete.

**Example** (Creating a scoped FiberMap)

```ts
import { Effect, FiberMap } from "effect"

Effect.gen(function* () {
  const map = yield* FiberMap.make<string>()

  // run some effects and add the fibers to the map
  yield* FiberMap.run(map, "fiber a", Effect.never)
  yield* FiberMap.run(map, "fiber b", Effect.never)

  yield* Effect.sleep(1000)
}).pipe(
  Effect.scoped // The fibers will be interrupted when the scope is closed
)
```

**Signature**

```ts
declare const make: <K, A = unknown, E = unknown>() => Effect.Effect<FiberMap<K, A, E>, never, Scope.Scope>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FiberMap.ts#L155)

Since v2.0.0

## makeRuntime

Creates a scoped run function that forks effects into a new `FiberMap`.

**Details**

Each call stores the forked fiber under the supplied key and returns that
fiber. If the key already has a fiber, the previous fiber is interrupted
unless `onlyIfMissing` is set. All managed fibers are interrupted when the
map's scope closes.

**Example** (Creating a scoped runtime)

```ts
import { Effect, Fiber, FiberMap } from "effect"

const program = Effect.gen(function* () {
  const run = yield* FiberMap.makeRuntime<never, string>()

  // Run effects and get back fibers
  const fiber1 = run("task1", Effect.succeed("Hello"))
  const fiber2 = run("task2", Effect.succeed("World"))

  // Join the fibers to get their successful values
  const result1 = yield* Fiber.join(fiber1)
  const result2 = yield* Fiber.join(fiber2)

  console.log(result1, result2) // "Hello", "World"
})
```

**Signature**

```ts
declare const makeRuntime: <R, K, E = unknown, A = unknown>() => Effect.Effect<
  <XE extends E, XA extends A>(
    key: K,
    effect: Effect.Effect<XA, XE, R>,
    options?: (Effect.RunOptions & { readonly onlyIfMissing?: boolean | undefined }) | undefined
  ) => Fiber.Fiber<XA, XE>,
  never,
  Scope.Scope | R
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FiberMap.ts#L207)

Since v2.0.0

## makeRuntimePromise

Creates a scoped run function that forks effects into a new `FiberMap` and
returns a `Promise` for each effect result.

**When to use**

Use when keyed fibers must be managed in a scoped map while exposing their
results through Promise-based APIs.

**Details**

Each call stores the fiber under the supplied key, interrupting any previous
fiber for that key unless `onlyIfMissing` is set. The returned Promise
resolves with the effect's success value or rejects with the squashed failure
cause.

**Example** (Creating a promise runtime)

```ts
import { Effect, FiberMap } from "effect"

const program = Effect.gen(function* () {
  const run = yield* FiberMap.makeRuntimePromise<never, string>()

  // Run effects and get back promises
  const promise1 = run("task1", Effect.succeed("Hello"))
  const promise2 = run("task2", Effect.succeed("World"))

  // Convert to Effect and await
  const result1 = yield* Effect.promise(() => promise1)
  const result2 = yield* Effect.promise(() => promise2)

  console.log(result1, result2) // "Hello", "World"
})
```

**Signature**

```ts
declare const makeRuntimePromise: <R, K, A = unknown, E = unknown>() => Effect.Effect<
  <XE extends E, XA extends A>(
    key: K,
    effect: Effect.Effect<XA, XE, R>,
    options?: (Effect.RunOptions & { readonly onlyIfMissing?: boolean | undefined }) | undefined
  ) => Promise<XA>,
  never,
  Scope.Scope | R
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FiberMap.ts#L264)

Since v3.13.0

# models

## FiberMap (interface)

A FiberMap is a collection of fibers, indexed by a key. When the associated
Scope is closed, all fibers in the map will be interrupted. Fibers are
automatically removed from the map when they complete.

**Example** (Managing fibers in a map)

```ts
import { Effect, FiberMap } from "effect"

// Create a FiberMap with string keys
const program = Effect.gen(function* () {
  const map = yield* FiberMap.make<string>()

  // Add some fibers to the map
  yield* FiberMap.run(map, "task1", Effect.never)
  yield* FiberMap.run(map, "task2", Effect.never)

  // Get the size of the map
  const size = yield* FiberMap.size(map)
  console.log(size) // 2
})
```

**Signature**

```ts
export interface FiberMap<in out K, out A = unknown, out E = unknown>
  extends Pipeable, Inspectable.Inspectable, Iterable<[K, Fiber.Fiber<A, E>]> {
  readonly [TypeId]: typeof TypeId
  readonly deferred: Deferred.Deferred<void, unknown>
  state:
    | {
        readonly _tag: "Open"
        readonly backing: MutableHashMap.MutableHashMap<K, Fiber.Fiber<A, E>>
      }
    | {
        readonly _tag: "Closed"
      }
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FiberMap.ts#L58)

Since v2.0.0

# refinements

## isFiberMap

Returns `true` if a value is a `FiberMap`.

**Details**

This is a type guard that checks for the `FiberMap` runtime marker.

**Example** (Checking if a value is a FiberMap)

```ts
import { Effect, FiberMap } from "effect"

const program = Effect.gen(function* () {
  const map = yield* FiberMap.make<string>()

  console.log(FiberMap.isFiberMap(map)) // true
  console.log(FiberMap.isFiberMap({})) // false
  console.log(FiberMap.isFiberMap(null)) // false
})
```

**Signature**

```ts
declare const isFiberMap: (u: unknown) => u is FiberMap<unknown>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FiberMap.ts#L95)

Since v2.0.0
