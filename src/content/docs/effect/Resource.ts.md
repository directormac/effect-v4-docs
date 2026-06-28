---
title: Resource.ts
nav_order: 93
parent: "effect"
---

## Resource.ts overview

Stores refreshable scoped values.

A `Resource<A, E>` keeps the latest successful or failed acquisition result.
It can be read repeatedly, refreshed manually, or refreshed automatically on a
schedule. Resource acquisition runs in a scope, so replacements and final
cleanup release the resources owned by previous values.

Since v2.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [auto](#auto)
  - [manual](#manual)
- [getters](#getters)
  - [get](#get)
- [guards](#guards)
  - [isResource](#isresource)
- [models](#models)
  - [Resource (interface)](#resource-interface)
- [resource management](#resource-management)
  - [refresh](#refresh)

---

# constructors

## auto

Creates a `Resource` that refreshes automatically according to the supplied
schedule.

**When to use**

Use when a resource should refresh in the background according to a schedule
for the lifetime of its scope.

**See**

- `manual` for caller-controlled refresh timing
- `refresh` to trigger a refresh explicitly

**Signature**

```ts
declare const auto: <A, E, R, Out, E2, R2>(
  acquire: Effect.Effect<A, E, R>,
  policy: Schedule.Schedule<Out, unknown, E2, R2>
) => Effect.Effect<Resource<A, E>, never, R | R2 | Scope.Scope>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Resource.ts#L128)

Since v2.0.0

## manual

Creates a `Resource` that must be refreshed manually.

**When to use**

Use when you need manual control over resource refresh timing rather than an
automatic schedule.

**See**

- `auto` for schedule-driven automatic refreshes
- `refresh` to manually trigger a resource refresh

**Signature**

```ts
declare const manual: <A, E, R>(
  acquire: Effect.Effect<A, E, R>
) => Effect.Effect<Resource<A, E>, never, Scope.Scope | R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Resource.ts#L99)

Since v2.0.0

# getters

## get

Retrieves the current value stored in this resource.

**When to use**

Use to read the value currently cached by a `Resource`.

**Gotchas**

If the resource currently stores a failed acquisition result, the returned
effect fails with the stored error.

**See**

- `refresh` to re-run acquisition and update the stored value before a later read

**Signature**

```ts
declare const get: <A, E>(self: Resource<A, E>) => Effect.Effect<A, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Resource.ts#L154)

Since v2.0.0

# guards

## isResource

Returns `true` if the specified value is a `Resource`.

**When to use**

Use to validate unknown values at runtime boundaries before treating them as
`Resource` values.

**Details**

This predicate narrows the input to `Resource<unknown, unknown>`.

**Signature**

```ts
declare const isResource: (u: unknown) => u is Resource<unknown, unknown>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Resource.ts#L62)

Since v4.0.0

# models

## Resource (interface)

A `Resource` is a value loaded into memory that can be refreshed manually or
automatically according to a schedule.

**When to use**

Use to model a scoped value whose latest acquisition result is kept available
for repeated reads and can be refreshed manually or on a schedule.

**See**

- `manual` for creating a resource refreshed by the caller
- `auto` for creating a resource refreshed according to a schedule
- `get` for reading the currently stored acquisition result
- `refresh` for forcing a new acquisition

**Signature**

```ts
export interface Resource<in out A, in out E = never> extends Pipeable {
  readonly [TypeId]: typeof TypeId
  readonly scopedRef: ScopedRef.ScopedRef<Exit.Exit<A, E>>
  readonly acquire: Effect.Effect<A, E>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Resource.ts#L41)

Since v2.0.0

# resource management

## refresh

Re-runs this resource's acquisition effect and updates the current value.

**When to use**

Use to force an existing `Resource` to reacquire its value at a
caller-controlled point.

**Details**

When acquisition succeeds, refreshing replaces the value stored in the
resource's scoped reference and releases resources associated with the
previous value.

**Gotchas**

If acquisition fails, the returned effect fails and the previously stored
result is left as what `get` reads.

**See**

- `get` for reading the current stored value
- `manual` for resources refreshed only by caller action
- `auto` for schedule-driven automatic refreshes

**Signature**

```ts
declare const refresh: <A, E>(self: Resource<A, E>) => Effect.Effect<void, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Resource.ts#L183)

Since v2.0.0
