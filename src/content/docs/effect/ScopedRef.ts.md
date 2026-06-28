---
title: ScopedRef.ts
nav_order: 108
parent: "effect"
---

## ScopedRef.ts overview

Stores a current value together with the scope that owns it.

A `ScopedRef<A>` is useful for resource-backed values such as clients,
connections, subscriptions, or handles. Replacing the value acquires the
replacement in a new scope and releases the resources owned by the previous
value. Reads can be effectful or synchronous, and updates are synchronized so
only one replacement happens at a time.

Since v2.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [fromAcquire](#fromacquire)
  - [make](#make)
- [getters](#getters)
  - [get](#get)
  - [getUnsafe](#getunsafe)
- [models](#models)
  - [ScopedRef (interface)](#scopedref-interface)
- [setters](#setters)
  - [set](#set)

---

# constructors

## fromAcquire

Creates a new `ScopedRef` from an effect that acquires the initial value.

**When to use**

Use when creating a `ScopedRef` whose initial value requires acquiring
resources that must be released.

**See**

- `make` for creating a `ScopedRef` from a value that does not require resource acquisition

**Signature**

```ts
declare const fromAcquire: <A, E, R>(acquire: Effect.Effect<A, E, R>) => Effect.Effect<ScopedRef<A>, E, Scope.Scope | R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ScopedRef.ts#L75)

Since v2.0.0

## make

Creates a new `ScopedRef` from the specified value.

**When to use**

Use to create a `ScopedRef` when the initial value is already available or
can be produced without acquiring resources.

**Details**

The `evaluate` function runs when the returned effect runs. The returned
effect requires a `Scope`, and the reference closes the currently stored
value's scope when that outer scope closes.

**Gotchas**

Do not use `make` for an initial value whose creation acquires resources; use
`fromAcquire` so acquisition and finalization are tracked.

**See**

- `fromAcquire` for creating a `ScopedRef` from an effect that acquires the initial value
- `set` for replacing the current value with a newly acquired value

**Signature**

```ts
declare const make: <A>(evaluate: LazyArg<A>) => Effect.Effect<ScopedRef<A>, never, Scope.Scope>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ScopedRef.ts#L145)

Since v2.0.0

# getters

## get

Retrieves the current value of the scoped reference effectfully.

**When to use**

Use to read the value currently stored in a `ScopedRef` inside an `Effect`
workflow.

**See**

- `getUnsafe` for reading the current value synchronously when an unsafe read is acceptable

**Signature**

```ts
declare const get: <A>(self: ScopedRef<A>) => Effect.Effect<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ScopedRef.ts#L118)

Since v2.0.0

## getUnsafe

Retrieves the current value of the scoped reference synchronously.

**When to use**

Use when you need immediate synchronous access to the current `ScopedRef`
value and can guarantee that reading outside the `Effect` API is safe.

**See**

- `get` for Effect-wrapped access in Effect programs

**Signature**

```ts
declare const getUnsafe: <A>(self: ScopedRef<A>) => A
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ScopedRef.ts#L103)

Since v4.0.0

# models

## ScopedRef (interface)

A `ScopedRef` is a reference whose value is associated with resources,
which must be released properly. You can both get the current value of any
`ScopedRef`, as well as set it to a new value (which may require new
resources). The reference itself takes care of properly releasing resources
for the old value whenever a new value is obtained.

**When to use**

Use when an application needs to keep a current resource-backed value and
later replace it with another acquired value while ensuring the previous
value is released.

**Signature**

```ts
export interface ScopedRef<in out A> extends Pipeable {
  readonly [TypeId]: typeof TypeId
  readonly backing: Synchronized.SynchronizedRef<readonly [Scope.Closeable, A]>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ScopedRef.ts#L38)

Since v2.0.0

# setters

## set

Sets the value of this reference to a newly acquired scoped value, releasing
any resources associated with the old value.

**When to use**

Use to replace the current value of an existing `ScopedRef` with a newly
acquired scoped value while releasing resources for the previous value.

**Details**

This method will not return until either the reference is successfully
changed to the new value, with old resources released, or until the attempt
to acquire a new value fails.

**Signature**

```ts
declare const set: {
  <A, R, E>(acquire: Effect.Effect<A, E, R>): (self: ScopedRef<A>) => Effect.Effect<void, E, Exclude<R, Scope.Scope>>
  <A, R, E>(self: ScopedRef<A>, acquire: Effect.Effect<A, E, R>): Effect.Effect<void, E, Exclude<R, Scope.Scope>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ScopedRef.ts#L171)

Since v2.0.0
