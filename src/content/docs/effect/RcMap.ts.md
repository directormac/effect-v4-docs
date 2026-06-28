---
title: RcMap.ts
nav_order: 82
parent: "effect"
---

## RcMap.ts overview

Shares scoped resources by key and releases them when no one is using them.

An `RcMap` runs a lookup effect the first time a key is requested, shares the
in-progress or acquired resource with other callers for the same key, and
tracks each caller through its current `Scope`. When the last scope for a key
closes, the resource can be released, kept alive for an idle time, or removed
by capacity limits or explicit invalidation. It is meant for resource
lifecycles such as clients, sessions, and connections, not as a general
mutable cache.

Since v3.5.0

---

## Exports Grouped by Category

- [combinators](#combinators)
  - [get](#get)
  - [has](#has)
  - [invalidate](#invalidate)
  - [keys](#keys)
  - [touch](#touch)
- [models](#models)
  - [RcMap (interface)](#rcmap-interface)
  - [State (type alias)](#state-type-alias)
  - [make](#make)
- [utils](#utils)
  - [State (namespace)](#state-namespace)
    - [Open (interface)](#open-interface)
    - [Closed (interface)](#closed-interface)
    - [Entry (interface)](#entry-interface)

---

# combinators

## get

Gets the resource for a key, acquiring it with the map's lookup function when
the key is not already cached.

**When to use**

Use to acquire or retain the resource for a key within the current scope.

**Details**

The resource's reference count is incremented for the current `Scope`, and a
release finalizer is added to that scope. When the current scope closes, the
reference is released; the resource is closed when the last reference is
released, subject to the map's idle time-to-live setting.

**Example** (Acquiring a resource)

```ts
import { Effect, RcMap } from "effect"

Effect.gen(function* () {
  const map = yield* RcMap.make({
    lookup: (key: string) =>
      Effect.acquireRelease(Effect.succeed(`Resource: ${key}`), () => Effect.log(`Released ${key}`))
  })

  // Get a resource - it will be acquired on first access
  const resource = yield* RcMap.get(map, "database")
  console.log(resource) // "Resource: database"
}).pipe(Effect.scoped)
```

**See**

- `make` for creating the reference-counted map
- `invalidate` for removing a resource by key

**Signature**

```ts
declare const get: {
  <K>(key: K): <A, E>(self: RcMap<K, A, E>) => Effect.Effect<A, E, Scope.Scope>
  <K, A, E>(self: RcMap<K, A, E>, key: K): Effect.Effect<A, E, Scope.Scope>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RcMap.ts#L326)

Since v3.5.0

## has

Returns whether the `RcMap` currently contains an entry for the specified
key.

**When to use**

Use to check whether a key is already present in an `RcMap` without running
the lookup function or acquiring a missing resource.

**Details**

This operation only checks the current map state.

**Gotchas**

Closed maps return `false`, so `false` does not distinguish a missing key
from a closed map.

**See**

- `get` for acquiring or retaining the resource for a key
- `keys` for enumerating all currently stored keys

**Signature**

```ts
declare const has: {
  <K>(key: K): <A, E>(self: RcMap<K, A, E>) => Effect.Effect<boolean>
  <K, A, E>(self: RcMap<K, A, E>, key: K): Effect.Effect<boolean>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RcMap.ts#L541)

Since v3.17.7

## invalidate

Invalidates and removes a specific key from the RcMap. If the resource is not
currently in use (reference count is 0), it will be immediately released.

**When to use**

Use to remove a resource by key so the next access performs a fresh lookup.

**Example** (Invalidating a resource)

```ts
import { Effect, RcMap } from "effect"

Effect.gen(function* () {
  const map = yield* RcMap.make({
    lookup: (key: string) =>
      Effect.acquireRelease(Effect.succeed(`Resource: ${key}`), () => Effect.log(`Released ${key}`))
  })

  // Get a resource
  yield* RcMap.get(map, "cache")

  // Invalidate the resource - it will be removed from the map
  // and released if no longer in use
  yield* RcMap.invalidate(map, "cache")

  // Next access will create a new resource
  yield* RcMap.get(map, "cache")
}).pipe(Effect.scoped)
```

**See**

- `get` for acquiring or retaining the resource for a key
- `touch` for extending the idle lifetime without removing the entry

**Signature**

```ts
declare const invalidate: {
  <K>(key: K): <A, E>(self: RcMap<K, A, E>) => Effect.Effect<void>
  <K, A, E>(self: RcMap<K, A, E>, key: K): Effect.Effect<void>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RcMap.ts#L500)

Since v3.13.0

## keys

Returns an iterable of all keys currently stored in the `RcMap`.

**When to use**

Use to inspect which keys currently have stored resources in an `RcMap`.

**Details**

If the `RcMap` has been closed, the effect is interrupted.

**Example** (Listing keys)

```ts
import { Effect, RcMap } from "effect"

Effect.gen(function* () {
  const map = yield* RcMap.make({
    lookup: (key: string) => Effect.succeed(`value-${key}`)
  })

  // Add some resources to the map
  yield* RcMap.get(map, "foo")
  yield* RcMap.get(map, "bar")
  yield* RcMap.get(map, "baz")

  // Get all keys currently in the map
  const allKeys = yield* RcMap.keys(map)
  console.log(allKeys) // ["foo", "bar", "baz"]
}).pipe(Effect.scoped)
```

**See**

- `has` for checking one key without enumerating all keys

**Signature**

```ts
declare const keys: <K, A, E>(self: RcMap<K, A, E>) => Effect.Effect<Iterable<K>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RcMap.ts#L454)

Since v3.8.0

## touch

Extends the idle time for a resource in the RcMap. If the RcMap has an
`idleTimeToLive` configured, calling `touch` will reset the expiration
timer for the specified key.

**When to use**

Use to keep an idle resource alive longer without acquiring a new reference.

**Example** (Extending resource idle time)

```ts
import { Effect, RcMap } from "effect"

Effect.gen(function* () {
  const map = yield* RcMap.make({
    lookup: (key: string) =>
      Effect.acquireRelease(Effect.succeed(`Resource: ${key}`), () => Effect.log(`Released ${key}`)),
    idleTimeToLive: "10 seconds"
  })

  // Get a resource
  yield* RcMap.get(map, "session")

  // Touch the resource to extend its idle time
  // This resets the 10-second expiration timer
  yield* RcMap.touch(map, "session")

  // The resource will now live for another 10 seconds
  // from the time it was touched
}).pipe(Effect.scoped)
```

**See**

- `invalidate` for removing the resource instead of extending it

**Signature**

```ts
declare const touch: {
  <K>(key: K): <A, E>(self: RcMap<K, A, E>) => Effect.Effect<void>
  <K, A, E>(self: RcMap<K, A, E>, key: K): Effect.Effect<void>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RcMap.ts#L594)

Since v3.13.0

# models

## RcMap (interface)

An `RcMap` is a reference-counted map data structure that manages the lifecycle
of resources indexed by keys. Resources are lazily acquired and automatically
released when no longer in use.

**When to use**

Use to share scoped resources by key while automatically releasing them after
their last active reference is gone.

**Example** (Inspecting a reference-counted map)

```ts
import { Effect, RcMap } from "effect"

Effect.gen(function* () {
  // Create an RcMap that manages database connections
  const dbConnectionMap = yield* RcMap.make({
    lookup: (dbName: string) =>
      Effect.acquireRelease(Effect.succeed(`Connection to ${dbName}`), (conn) => Effect.log(`Closing ${conn}`)),
    capacity: 10,
    idleTimeToLive: "5 minutes"
  })

  // The RcMap interface provides access to:
  // - lookup: Function to acquire resources
  // - capacity: Maximum number of resources
  // - idleTimeToLive: Time before idle resources are released
  // - state: Current state of the map

  console.log(`Capacity: ${dbConnectionMap.capacity}`)
}).pipe(Effect.scoped)
```

**See**

- `make` for creating an `RcMap`
- `get` for acquiring or retaining a resource by key

**Signature**

```ts
export interface RcMap<in out K, in out A, in out E = never> extends Pipeable {
  readonly [TypeId]: typeof TypeId
  readonly lookup: (key: K) => Effect.Effect<A, E, Scope.Scope>
  readonly context: Context.Context<never>
  readonly scope: Scope.Scope
  readonly idleTimeToLive: (key: K) => Duration.Duration
  readonly capacity: number
  state: State<K, A, E>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RcMap.ts#L73)

Since v3.5.0

## State (type alias)

Represents the internal state of an RcMap, which can be either Open (active)
or Closed (shutdown and no longer accepting operations).

**When to use**

Use when typing code that inspects an `RcMap`'s `state` field and narrows
between open and closed lifecycle states.

**See**

- `RcMap` for the map value that exposes this state
- `State.Open` for the active state with entries
- `State.Closed` for the shutdown state

**Signature**

```ts
type State<K, A, E> = State.Open<K, A, E> | State.Closed
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RcMap.ts#L99)

Since v4.0.0

## make

Creates an `RcMap` that can contain multiple reference counted resources that can be indexed
by a key. The resources are lazily acquired on the first call to `get` and
released when the last reference is released.

**When to use**

Use to create a scoped reference-counted map for resources that should be
acquired once per key and shared while in use.

**Details**

Complex keys can extend `Equal` and `Hash` to allow lookups by value.

- `capacity`: The maximum number of resources that can be held in the map.
- `idleTimeToLive`: When the reference count reaches zero, the resource will be released after this duration.

**Example** (Creating a reference-counted map)

```ts
import { Effect, RcMap } from "effect"

Effect.gen(function* () {
  const map = yield* RcMap.make({
    lookup: (key: string) =>
      Effect.acquireRelease(Effect.succeed(`acquired ${key}`), () => Effect.log(`releasing ${key}`))
  })

  // Get "foo" from the map twice, which will only acquire it once.
  // It will then be released once the scope closes.
  yield* RcMap.get(map, "foo").pipe(Effect.andThen(RcMap.get(map, "foo")), Effect.scoped)
})
```

**See**

- `get` for acquiring or retaining a resource by key
- `invalidate` for removing a resource from the map

**Signature**

```ts
declare const make: {
  <K, A, E, R>(options: {
    readonly lookup: (key: K) => Effect.Effect<A, E, R>
    readonly idleTimeToLive?: Duration.Input | ((key: K) => Duration.Input) | undefined
    readonly capacity?: undefined
  }): Effect.Effect<RcMap<K, A, E>, never, Scope.Scope | R>
  <K, A, E, R>(options: {
    readonly lookup: (key: K) => Effect.Effect<A, E, R>
    readonly idleTimeToLive?: Duration.Input | ((key: K) => Duration.Input) | undefined
    readonly capacity: number
  }): Effect.Effect<RcMap<K, A, E | Cause.ExceededCapacityError>, never, Scope.Scope | R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RcMap.ts#L235)

Since v3.5.0

# utils

## State (namespace)

Namespace containing the internal state types for RcMap.

**When to use**

Use when referring to the concrete open, closed, and entry state shapes used
by `RcMap`.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RcMap.ts#L111)

Since v4.0.0

### Open (interface)

Represents the open/active state of an RcMap, containing the actual
resource map that stores entries.

**When to use**

Use when handling an `RcMap` that can still accept operations and contains
stored entries.

**Signature**

```ts
export interface Open<K, A, E> {
  readonly _tag: "Open"
  readonly map: MutableHashMap.MutableHashMap<K, Entry<A, E>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RcMap.ts#L124)

Since v4.0.0

### Closed (interface)

Represents the closed state of an RcMap, indicating that the map has been
shut down and will no longer accept new operations.

**When to use**

Use when handling an `RcMap` after its owning scope has closed.

**Signature**

```ts
export interface Closed {
  readonly _tag: "Closed"
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RcMap.ts#L140)

Since v4.0.0

### Entry (interface)

Represents an individual entry in the RcMap, containing the resource's
metadata including reference count, expiration time, and lifecycle management.

**When to use**

Use when inspecting the stored resource, reference count, and idle lifecycle
metadata for a single key.

**Signature**

```ts
export interface Entry<A, E> {
  readonly deferred: Deferred.Deferred<A, E>
  readonly scope: Scope.Closeable
  readonly finalizer: Effect.Effect<void>
  readonly idleTimeToLive: Duration.Duration
  fiber: Fiber.Fiber<void> | undefined
  expiresAt: number
  refCount: number
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RcMap.ts#L156)

Since v4.0.0
