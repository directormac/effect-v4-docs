---
title: ScopedCache.ts
nav_order: 107
parent: "effect"
---

## ScopedCache.ts overview

Caches values that need scoped resource management.

Each cached entry owns its own `Scope`, so resources opened while creating a
value stay alive while that entry is cached and are released when the entry is
removed. A `ScopedCache` also belongs to an outer scope, which closes all
remaining entries when the cache is closed. Lookups for the same missing key
share one in-progress effect, and entries can expire, be refreshed, be
invalidated, or be evicted by capacity limits.

Since v4.0.0

---

## Exports Grouped by Category

- [combinators](#combinators)
  - [entries](#entries)
  - [get](#get)
  - [getOption](#getoption)
  - [getSuccess](#getsuccess)
  - [has](#has)
  - [invalidate](#invalidate)
  - [invalidateAll](#invalidateall)
  - [invalidateWhen](#invalidatewhen)
  - [keys](#keys)
  - [refresh](#refresh)
  - [set](#set)
  - [size](#size)
  - [values](#values)
- [constructors](#constructors)
  - [make](#make)
  - [makeWith](#makewith)
- [models](#models)
  - [Entry (interface)](#entry-interface)
  - [ScopedCache (interface)](#scopedcache-interface)
  - [State (type alias)](#state-type-alias)

---

# combinators

## entries

Retrieves all key-value pairs from the cache as an array. This function
only returns entries with successfully resolved values, filtering out any
failed lookups or expired entries.

**When to use**

Use to inspect the currently successful cached key-value pairs without
running cache lookups.

**Gotchas**

Expired entries are removed and their scopes are closed while filtering.

**See**

- `keys` for retrieving only cached keys
- `values` for retrieving only cached values

**Signature**

```ts
declare const entries: <Key, A, E, R>(self: ScopedCache<Key, A, E, R>) => Effect.Effect<Array<[Key, A]>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ScopedCache.ts#L799)

Since v4.0.0

## get

Gets the value for a key, running the cache lookup when no unexpired entry is
present.

**When to use**

Use to retrieve a scoped cached value by key when a missing or expired entry
should run the cache lookup and share the in-flight lookup with concurrent
callers.

**Details**

Concurrent `get` calls for the same key share the same in-flight lookup.
Successful and failed lookup exits are cached according to the configured
TTL. If the cache is closed, the effect is interrupted.

**See**

- `getOption` for reading only when an unexpired entry is already cached
- `getSuccess` for inspecting an already-completed successful entry
- `refresh` for forcing a new lookup

**Signature**

```ts
declare const get: {
  <Key, A>(key: Key): <E, R>(self: ScopedCache<Key, A, E, R>) => Effect.Effect<A, E, R>
  <Key, A, E, R>(self: ScopedCache<Key, A, E, R>, key: Key): Effect.Effect<A, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ScopedCache.ts#L254)

Since v4.0.0

## getOption

Reads an existing unexpired cache entry without running the lookup function.

**When to use**

Use to read a scoped value only when it is already cached, without starting
the lookup for missing or expired keys.

**Details**

Returns `Option.none` when the key is absent or expired. If an entry exists,
the effect waits for its cached result and returns `Option.some(value)` on
success, or fails with the cached lookup error.

**See**

- `get` for running the lookup on missing or expired keys
- `getSuccess` for inspecting only already-completed successful entries

**Signature**

```ts
declare const getOption: {
  <Key, A>(key: Key): <E, R>(self: ScopedCache<Key, A, E, R>) => Effect.Effect<Option.Option<A>, E>
  <Key, A, E, R>(self: ScopedCache<Key, A, E, R>, key: Key): Effect.Effect<Option.Option<A>, E>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ScopedCache.ts#L343)

Since v4.0.0

## getSuccess

Retrieves the value associated with the specified key from the cache, only if
it contains a resolved successful value.

**When to use**

Use to inspect an already-completed successful scoped cache entry without
running or awaiting the lookup effect.

**Details**

Returns `Option.some` for a resolved successful entry. Returns `Option.none`
for missing, expired, failed, or still-pending entries.

**See**

- `get` for awaiting or starting the lookup effect
- `getOption` for awaiting an already-cached entry without starting a lookup

**Signature**

```ts
declare const getSuccess: {
  <Key, A, R>(key: Key): <E>(self: ScopedCache<Key, A, E, R>) => Effect.Effect<Option.Option<A>>
  <Key, A, E, R>(self: ScopedCache<Key, A, E, R>, key: Key): Effect.Effect<Option.Option<A>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ScopedCache.ts#L405)

Since v4.0.0

## has

Checks whether the cache contains an entry for the specified key.

**When to use**

Use to test whether an unexpired entry exists for a key without running the
cache lookup.

**Details**

This does not start lookups and does not refresh access order. Expired
entries are treated as absent and their scopes are closed while checking. If
the cache is closed, the effect is interrupted.

**See**

- `getOption` for reading an existing cached entry
- `get` for running the lookup on missing or expired keys

**Signature**

```ts
declare const has: {
  <Key, A>(key: Key): <E, R>(self: ScopedCache<Key, A, E, R>) => Effect.Effect<boolean>
  <Key, A, E, R>(self: ScopedCache<Key, A, E, R>, key: Key): Effect.Effect<boolean>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ScopedCache.ts#L499)

Since v4.0.0

## invalidate

Removes the entry associated with a key and closes its entry scope.

**When to use**

Use to remove a single key from a scoped cache and release any resources owned
by that entry before a later lookup computes it again.

**Details**

If the key is absent, this is a no-op.

**Gotchas**

If the cache is closed, the effect is interrupted.

**See**

- `refresh` for replacing a key by running a new lookup immediately
- `invalidateWhen` for invalidating only when a cached value matches a predicate
- `invalidateAll` for removing every cached entry

**Signature**

```ts
declare const invalidate: {
  <Key, A>(key: Key): <E, R>(self: ScopedCache<Key, A, E, R>) => Effect.Effect<void>
  <Key, A, E, R>(self: ScopedCache<Key, A, E, R>, key: Key): Effect.Effect<void>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ScopedCache.ts#L533)

Since v4.0.0

## invalidateAll

Removes every entry from the cache and closes each entry scope.

**When to use**

Use to clear a scoped cache and release resources owned by all cached entries.

**Details**

If the cache is closed, the effect is interrupted.

**See**

- `invalidate` for removing one cached entry

**Signature**

```ts
declare const invalidateAll: <Key, A, E, R>(self: ScopedCache<Key, A, E, R>) => Effect.Effect<void>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ScopedCache.ts#L683)

Since v4.0.0

## invalidateWhen

Invalidates the entry associated with the specified key in the cache when the
predicate returns true for the cached value.

**When to use**

Use to remove an already-cached scoped value only when the successful cached
value satisfies a predicate.

**Details**

Returns `true` only when a successful cached value matches and is removed. It
returns `false` for absent, expired, failed, or non-matching entries.

**Gotchas**

A matching invalidation closes the entry scope and releases its resources.

**See**

- `invalidate` for unconditional removal by key

**Signature**

```ts
declare const invalidateWhen: {
  <Key, A>(key: Key, f: Predicate.Predicate<A>): <E, R>(self: ScopedCache<Key, A, E, R>) => Effect.Effect<boolean>
  <Key, A, E, R>(self: ScopedCache<Key, A, E, R>, key: Key, f: Predicate.Predicate<A>): Effect.Effect<boolean>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ScopedCache.ts#L574)

Since v4.0.0

## keys

Retrieves all active keys from the cache, automatically filtering out expired entries.

**When to use**

Use to inspect currently cached unexpired keys without running cache lookups.

**Gotchas**

Expired entries are removed and their scopes are closed while filtering.

**See**

- `entries` for retrieving successful cached key-value pairs
- `values` for retrieving only successfully cached values

**Signature**

```ts
declare const keys: <Key, A, E, R>(self: ScopedCache<Key, A, E, R>) => Effect.Effect<Array<Key>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ScopedCache.ts#L739)

Since v4.0.0

## refresh

Forces a refresh of the value associated with the specified key in the cache.

**When to use**

Use to recompute a scoped cache entry immediately, even when an unexpired
value is already cached.

**Details**

It will always invoke the lookup function to construct a new value,
overwriting any existing value for that key.

**See**

- `get` for reusing an unexpired entry before running the lookup
- `invalidate` for removing an entry without recomputing it

**Signature**

```ts
declare const refresh: {
  <Key, A>(key: Key): <E, R>(self: ScopedCache<Key, A, E, R>) => Effect.Effect<A, E, R>
  <Key, A, E, R>(self: ScopedCache<Key, A, E, R>, key: Key): Effect.Effect<A, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ScopedCache.ts#L622)

Since v4.0.0

## set

Sets a successful value for a key without running the lookup function.

**When to use**

Use to seed or overwrite a scoped cache entry with an already available
successful value.

**Details**

This replaces and closes any existing entry scope for the key, applies the
cache's TTL using a successful exit for the value, and may evict older
entries if the cache capacity is exceeded.

**See**

- `get` for reading or computing a cached value
- `refresh` for replacing an entry by running the lookup function

**Signature**

```ts
declare const set: {
  <Key, A>(key: Key, value: A): <E, R>(self: ScopedCache<Key, A, E, R>) => Effect.Effect<void>
  <Key, A, E, R>(self: ScopedCache<Key, A, E, R>, key: Key, value: A): Effect.Effect<void>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ScopedCache.ts#L447)

Since v4.0.0

## size

Retrieves the approximate number of entries in the cache.

**When to use**

Use to inspect how many entries are currently stored in the scoped cache.

**Gotchas**

Note that expired entries are counted until they are accessed and removed.
The size reflects the current number of entries stored, not the number
of valid entries.

**Signature**

```ts
declare const size: <Key, A, E, R>(self: ScopedCache<Key, A, E, R>) => Effect.Effect<number>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ScopedCache.ts#L719)

Since v4.0.0

## values

Retrieves all successfully cached values from the cache, excluding failed
lookups and expired entries.

**When to use**

Use to inspect currently successful cached values without running cache
lookups.

**Gotchas**

Expired entries are removed and their scopes are closed while filtering.

**See**

- `entries` for retrieving successful cached key-value pairs
- `keys` for retrieving only cached keys

**Signature**

```ts
declare const values: <Key, A, E, R>(self: ScopedCache<Key, A, E, R>) => Effect.Effect<Array<A>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ScopedCache.ts#L776)

Since v4.0.0

# constructors

## make

Creates a `ScopedCache` with a fixed time-to-live for every lookup result.

**When to use**

Use to create a scoped cache when every cached lookup result should share the
same lifetime.

**Details**

This is the constant-TTL variant of `makeWith`: values are acquired by the
lookup effect in per-entry scopes, capacity can evict older entries, and
entry scopes are closed when entries expire, are invalidated, are evicted, or
when the cache's owning scope closes.

**See**

- `makeWith` for computing time-to-live from each lookup result and key

**Signature**

```ts
declare const make: <Key, A, E = never, R = never, ServiceMode extends "lookup" | "construction" = never>(options: {
  readonly lookup: (key: Key) => Effect.Effect<A, E, R | Scope.Scope>
  readonly capacity: number
  readonly timeToLive?: Duration.Input | undefined
  readonly requireServicesAt?: ServiceMode | undefined
}) => Effect.Effect<
  ScopedCache<Key, A, E, "lookup" extends ServiceMode ? Exclude<R, Scope.Scope> : never>,
  never,
  ("lookup" extends ServiceMode ? never : R) | Scope.Scope
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ScopedCache.ts#L194)

Since v2.0.0

## makeWith

Creates a `ScopedCache` from a lookup function, maximum capacity, and a
time-to-live function computed from each lookup exit and key.

**When to use**

Use when you need a scoped cache whose entry lifetime depends on each lookup
result or key.

**Details**

The cache must be constructed in a `Scope`. Each lookup runs in its own entry
scope, and that scope is closed when the entry expires, is invalidated, is
evicted by capacity, or when the cache's owning scope closes.
`requireServicesAt` controls whether lookup services are captured at
construction time or required when lookup operations run.

**See**

- `make` for creating a scoped cache with one fixed time-to-live

**Signature**

```ts
declare const makeWith: <Key, A, E = never, R = never, ServiceMode extends "lookup" | "construction" = never>(options: {
  readonly lookup: (key: Key) => Effect.Effect<A, E, R | Scope.Scope>
  readonly capacity: number
  readonly timeToLive?: ((exit: Exit.Exit<A, E>, key: Key) => Duration.Input) | undefined
  readonly requireServicesAt?: ServiceMode | undefined
}) => Effect.Effect<
  ScopedCache<Key, A, E, "lookup" extends ServiceMode ? Exclude<R, Scope.Scope> : never>,
  never,
  ("lookup" extends ServiceMode ? never : R) | Scope.Scope
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ScopedCache.ts#L132)

Since v2.0.0

# models

## Entry (interface)

A single scoped cache entry.

**When to use**

Use when inspecting the open state of a `ScopedCache` and you need the stored
deferred result, entry scope, or expiration timestamp for a key.

**Details**

The entry contains the deferred lookup result shared by readers, the scope
that owns resources acquired while computing the value, and an optional
expiration time in milliseconds. Removing the entry closes its scope.

**See**

- `State` for the open/closed cache state that stores entries by key

**Signature**

```ts
export interface Entry<A, E> {
  expiresAt: number | undefined
  readonly deferred: Deferred.Deferred<A, E>
  readonly scope: Scope.Closeable
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ScopedCache.ts#L104)

Since v4.0.0

## ScopedCache (interface)

A scoped cache whose values are acquired by a lookup effect and stored in
per-entry scopes.

**When to use**

Use to cache values that acquire scoped resources and must release those
resources when entries expire, are evicted, or are invalidated.

**Details**

Concurrent requests for the same key share the same in-flight lookup.
Entries can expire based on the lookup exit, are evicted when capacity is
exceeded, and release their entry scopes when invalidated, evicted, expired,
or when the cache's owning scope closes.

**See**

- `make` for creating a scoped cache with a fixed time-to-live
- `makeWith` for creating a scoped cache with dynamic time-to-live

**Signature**

```ts
export interface ScopedCache<in out Key, in out A, in out E = never, out R = never> extends Pipeable {
  readonly [TypeId]: typeof TypeId
  state: State<Key, A, E>
  readonly capacity: number
  readonly lookup: (key: Key) => Effect.Effect<A, E, R | Scope.Scope>
  readonly timeToLive: (exit: Exit.Exit<A, E>, key: Key) => Duration.Duration
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ScopedCache.ts#L54)

Since v2.0.0

## State (type alias)

Represents whether a `ScopedCache` is open or closed.

**When to use**

Use when inspecting the low-level lifecycle state of a scoped cache.

**Details**

`Open` stores cached entries in access order for reuse and eviction.
`Closed` means the owning scope has closed and the cache can no longer
perform lookup operations.

**Signature**

```ts
type State<K, A, E> =
  | {
      readonly _tag: "Open"
      readonly map: MutableHashMap.MutableHashMap<K, Entry<A, E>>
    }
  | {
      readonly _tag: "Closed"
    }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ScopedCache.ts#L78)

Since v4.0.0
