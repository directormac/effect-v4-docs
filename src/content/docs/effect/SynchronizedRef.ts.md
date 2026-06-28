---
title: SynchronizedRef.ts
nav_order: 117
parent: "effect"
---

## SynchronizedRef.ts overview

Stores mutable state whose updates run one at a time.

A `SynchronizedRef<A>` behaves like a `Ref<A>` for reading and simple state
storage, but update and modify operations are serialized so each change sees
a consistent current value. This is especially useful when the next value is
computed by an effect, because the effectful transition is still protected
from concurrent updates. This module includes constructors, reads, writes,
updates, partial updates, and effectful update helpers.

Since v2.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [make](#make)
  - [makeUnsafe](#makeunsafe)
- [getters](#getters)
  - [get](#get)
  - [getUnsafe](#getunsafe)
- [models](#models)
  - [SynchronizedRef (interface)](#synchronizedref-interface)
- [mutations](#mutations)
  - [getAndSet](#getandset)
  - [getAndUpdate](#getandupdate)
  - [getAndUpdateEffect](#getandupdateeffect)
  - [getAndUpdateSome](#getandupdatesome)
  - [getAndUpdateSomeEffect](#getandupdatesomeeffect)
  - [modify](#modify)
  - [modifyEffect](#modifyeffect)
  - [modifySome](#modifysome)
  - [modifySomeEffect](#modifysomeeffect)
  - [set](#set)
  - [setAndGet](#setandget)
  - [update](#update)
  - [updateAndGet](#updateandget)
  - [updateAndGetEffect](#updateandgeteffect)
  - [updateEffect](#updateeffect)
  - [updateSome](#updatesome)
  - [updateSomeAndGet](#updatesomeandget)
  - [updateSomeAndGetEffect](#updatesomeandgeteffect)
  - [updateSomeEffect](#updatesomeeffect)

---

# constructors

## make

Creates a `SynchronizedRef` from an initial value, wrapped in an `Effect`.

**When to use**

Use to create a `SynchronizedRef` inside an Effect program when later updates
may run effects and must be serialized.

**Details**

The returned effect constructs a fresh `SynchronizedRef` by delegating to
`makeUnsafe` when the effect is evaluated.

**See**

- `makeUnsafe` for synchronous construction when the caller controls safe initialization
- `Ref.make` for a plain `Ref` when updates do not need effectful synchronization

**Signature**

```ts
declare const make: <A>(value: A) => Effect.Effect<SynchronizedRef<A>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SynchronizedRef.ts#L91)

Since v2.0.0

## makeUnsafe

Creates a `SynchronizedRef` synchronously from an initial value.

**When to use**

Use when you need synchronous `SynchronizedRef` construction outside an
Effect workflow.

**Signature**

```ts
declare const makeUnsafe: <A>(value: A) => SynchronizedRef<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SynchronizedRef.ts#L65)

Since v4.0.0

# getters

## get

Returns an `Effect` that reads the current value of the `SynchronizedRef`.

**When to use**

Use to read the current value of a `SynchronizedRef` inside an `Effect`
program without changing it.

**See**

- `getUnsafe` for synchronous reads when the caller controls safe access outside `Effect`

**Signature**

```ts
declare const get: <A>(self: SynchronizedRef<A>) => Effect.Effect<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SynchronizedRef.ts#L122)

Since v2.0.0

## getUnsafe

Reads the current value synchronously, bypassing the `Effect` API and the
ref's semaphore.

**When to use**

Use when you need immediate synchronous access to a `SynchronizedRef` value
in low-level code that can safely read outside an `Effect`.

**See**

- `get` for the Effect-wrapped read when composing inside Effect programs

**Signature**

```ts
declare const getUnsafe: <A>(self: SynchronizedRef<A>) => A
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SynchronizedRef.ts#L107)

Since v4.0.0

# models

## SynchronizedRef (interface)

A mutable reference whose update and modify operations are serialized with an
internal semaphore, including effectful transformations.

**When to use**

Use when shared state may be updated by multiple fibers and each update,
including effectful state transitions, must observe one current value and run
one at a time.

**See**

- `Ref.Ref` for a plain `Ref` when updates do not need effectful synchronization

**Signature**

```ts
export interface SynchronizedRef<in out A> extends Ref.Ref<A> {
  readonly [TypeId]: typeof TypeId
  readonly backing: Ref.Ref<A>
  readonly semaphore: Semaphore.Semaphore
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SynchronizedRef.ts#L37)

Since v2.0.0

# mutations

## getAndSet

Sets a new value atomically and returns the previous value, serialized by the
ref's semaphore.

**When to use**

Use to replace a `SynchronizedRef` with a known value when the previous value
is also needed.

**See**

- `set` for setting a value without returning the previous value
- `setAndGet` for setting a value and returning the new value
- `getAndUpdate` for deriving the new value from the current value

**Signature**

```ts
declare const getAndSet: {
  <A>(value: A): (self: SynchronizedRef<A>) => Effect.Effect<A>
  <A>(self: SynchronizedRef<A>, value: A): Effect.Effect<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SynchronizedRef.ts#L140)

Since v2.0.0

## getAndUpdate

Updates the current value atomically with a function and returns the previous
value, serialized by the ref's semaphore.

**When to use**

Use to run a pure `SynchronizedRef` state update when the previous stored
value is also needed.

**See**

- `update` for updating without returning a value
- `updateAndGet` for updating and returning the new value
- `getAndUpdateEffect` for effectful updates that return the previous value

**Signature**

```ts
declare const getAndUpdate: {
  <A>(f: (a: A) => A): (self: SynchronizedRef<A>) => Effect.Effect<A>
  <A>(self: SynchronizedRef<A>, f: (a: A) => A): Effect.Effect<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SynchronizedRef.ts#L165)

Since v2.0.0

## getAndUpdateEffect

Runs an effectful update atomically while holding the ref's semaphore, sets
the new value if the effect succeeds, and returns the previous value.

**When to use**

Use when you need an effectful `SynchronizedRef` state transition to return
the previous stored value.

**See**

- `getAndUpdate` for pure updates that return the previous value
- `updateEffect` for effectful updates without returning a value
- `updateAndGetEffect` for effectful updates that return the new value
- `modifyEffect` for effectful updates with a custom return value
- `getAndUpdateSomeEffect` for conditional effectful updates that return the previous value

**Signature**

```ts
declare const getAndUpdateEffect: {
  <A, R, E>(f: (a: A) => Effect.Effect<A, E, R>): (self: SynchronizedRef<A>) => Effect.Effect<A, E, R>
  <A, R, E>(self: SynchronizedRef<A>, f: (a: A) => Effect.Effect<A, E, R>): Effect.Effect<A, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SynchronizedRef.ts#L192)

Since v2.0.0

## getAndUpdateSome

Applies a partial update atomically and returns the previous value. If the
function returns `Option.some`, the ref is updated; if it returns
`Option.none`, the ref is left unchanged.

**When to use**

Use to return the previous `SynchronizedRef` value while applying a pure
conditional update.

**See**

- `getAndUpdate` for always applying a pure update
- `updateSome` for applying a pure conditional update without returning the previous value

**Signature**

```ts
declare const getAndUpdateSome: {
  <A>(pf: (a: A) => Option.Option<A>): (self: SynchronizedRef<A>) => Effect.Effect<A>
  <A>(self: SynchronizedRef<A>, pf: (a: A) => Option.Option<A>): Effect.Effect<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SynchronizedRef.ts#L223)

Since v2.0.0

## getAndUpdateSomeEffect

Runs an effectful partial update atomically while holding the ref's semaphore
and returns the previous value. `Option.some` updates the ref; `Option.none`
leaves it unchanged.

**When to use**

Use to return the previous `SynchronizedRef` value while running an effectful
conditional update.

**See**

- `getAndUpdateSome` for the pure conditional variant
- `updateSomeEffect` for effectful conditional updates without returning the previous value

**Signature**

```ts
declare const getAndUpdateSomeEffect: {
  <A, R, E>(pf: (a: A) => Effect.Effect<Option.Option<A>, E, R>): (self: SynchronizedRef<A>) => Effect.Effect<A, E, R>
  <A, R, E>(self: SynchronizedRef<A>, pf: (a: A) => Effect.Effect<Option.Option<A>, E, R>): Effect.Effect<A, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SynchronizedRef.ts#L248)

Since v2.0.0

## modify

Computes a return value and a new ref value atomically, stores the new value,
and returns the computed result.

**When to use**

Use to derive a separate result and the next stored `SynchronizedRef` value
from the same current value in one serialized pure update.

**See**

- `modifyEffect` for effectfully deriving both the result and next stored value
- `modifySome` for deriving a result and optionally updating the stored value
- `updateAndGet` for returning the new stored value instead of a separate result

**Signature**

```ts
declare const modify: {
  <A, B>(f: (a: A) => readonly [B, A]): (self: SynchronizedRef<A>) => Effect.Effect<B>
  <A, B>(self: SynchronizedRef<A>, f: (a: A) => readonly [B, A]): Effect.Effect<B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SynchronizedRef.ts#L282)

Since v2.0.0

## modifyEffect

Runs an effectful modification atomically while holding the ref's semaphore,
stores the new value if the effect succeeds, and returns the computed result.

**When to use**

Use to effectfully compute both a separate return value and the next stored
`SynchronizedRef` value in one serialized update.

**See**

- `modify` for the pure variant
- `updateEffect` for effectfully storing a new value without a separate result

**Signature**

```ts
declare const modifyEffect: {
  <A, B, E, R>(f: (a: A) => Effect.Effect<readonly [B, A], E, R>): (self: SynchronizedRef<A>) => Effect.Effect<B, E, R>
  <A, B, E, R>(self: SynchronizedRef<A>, f: (a: A) => Effect.Effect<readonly [B, A], E, R>): Effect.Effect<B, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SynchronizedRef.ts#L306)

Since v2.0.0

## modifySome

Computes a return value and an optional new ref value atomically.
`Option.some` updates the ref; `Option.none` leaves it unchanged.

**When to use**

Use to compute a return value while optionally updating a `SynchronizedRef`
under its semaphore.

**See**

- `modify` for always storing a new value
- `updateSome` for optional updates without a separate return value

**Signature**

```ts
declare const modifySome: {
  <B, A>(pf: (a: A) => readonly [B, Option.Option<A>]): (self: SynchronizedRef<A>) => Effect.Effect<B>
  <A, B>(self: SynchronizedRef<A>, pf: (a: A) => readonly [B, Option.Option<A>]): Effect.Effect<B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SynchronizedRef.ts#L336)

Since v2.0.0

## modifySomeEffect

Runs an effectful modification atomically while holding the ref's semaphore.
The effect computes a return value and an optional new ref value;
`Option.some` updates the ref and `Option.none` leaves it unchanged.

**When to use**

Use to effectfully compute a return value while optionally updating the
stored `SynchronizedRef` value.

**See**

- `modifySome` for the pure variant
- `updateSomeEffect` for effectful optional updates without a separate return value

**Signature**

```ts
declare const modifySomeEffect: {
  <A, B, R, E>(
    fallback: B,
    pf: (a: A) => Effect.Effect<readonly [B, Option.Option<A>], E, R>
  ): (self: SynchronizedRef<A>) => Effect.Effect<B, E, R>
  <A, B, R, E>(
    self: SynchronizedRef<A>,
    pf: (a: A) => Effect.Effect<readonly [B, Option.Option<A>], E, R>
  ): Effect.Effect<B, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SynchronizedRef.ts#L368)

Since v2.0.0

## set

Sets the value of the `SynchronizedRef`, serialized by the ref's semaphore.

**When to use**

Use to replace the current value of a `SynchronizedRef` with a known value
while keeping the write serialized with other synchronized updates.

**See**

- `getAndSet` for replacing the value when the previous value is needed
- `setAndGet` for replacing the value when the new value should be returned
- `update` for deriving the next value from the current value

**Signature**

```ts
declare const set: {
  <A>(value: A): (self: SynchronizedRef<A>) => Effect.Effect<void>
  <A>(self: SynchronizedRef<A>, value: A): Effect.Effect<void>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SynchronizedRef.ts#L410)

Since v2.0.0

## setAndGet

Sets the value of the `SynchronizedRef` and returns the new value.

**When to use**

Use to replace the current `SynchronizedRef` value with a known value and
return that new value.

**See**

- `set` for setting without returning a value
- `getAndSet` for setting while returning the previous value

**Signature**

```ts
declare const setAndGet: {
  <A>(value: A): (self: SynchronizedRef<A>) => Effect.Effect<A>
  <A>(self: SynchronizedRef<A>, value: A): Effect.Effect<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SynchronizedRef.ts#L433)

Since v2.0.0

## update

Updates the value of the `SynchronizedRef` with a function, serialized by the
ref's semaphore.

**When to use**

Use to apply a pure state transition to a `SynchronizedRef` as a serialized
`Effect`.

**See**

- `updateEffect` for effectfully deriving the next value
- `updateAndGet` for returning the new stored value
- `getAndUpdate` for returning the previous stored value

**Signature**

```ts
declare const update: {
  <A>(f: (a: A) => A): (self: SynchronizedRef<A>) => Effect.Effect<void>
  <A>(self: SynchronizedRef<A>, f: (a: A) => A): Effect.Effect<void>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SynchronizedRef.ts#L458)

Since v2.0.0

## updateAndGet

Updates the value of the `SynchronizedRef` with a function and returns the
new value.

**When to use**

Use to apply a pure `SynchronizedRef` state transition and return the new
stored value.

**See**

- `update` for updating without returning the new value
- `getAndUpdate` for updating while returning the previous value

**Signature**

```ts
declare const updateAndGet: {
  <A>(f: (a: A) => A): (self: SynchronizedRef<A>) => Effect.Effect<A>
  <A>(self: SynchronizedRef<A>, f: (a: A) => A): Effect.Effect<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SynchronizedRef.ts#L514)

Since v2.0.0

## updateAndGetEffect

Runs an effectful update while holding the ref's semaphore, stores the new
value if the effect succeeds, and returns that new value.

**When to use**

Use to run an effectful `SynchronizedRef` state transition and return the new
stored value.

**See**

- `updateEffect` for effectful updates without returning the new value
- `updateAndGet` for the pure variant

**Signature**

```ts
declare const updateAndGetEffect: {
  <A, R, E>(f: (a: A) => Effect.Effect<A, E, R>): (self: SynchronizedRef<A>) => Effect.Effect<A, E, R>
  <A, R, E>(self: SynchronizedRef<A>, f: (a: A) => Effect.Effect<A, E, R>): Effect.Effect<A, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SynchronizedRef.ts#L538)

Since v2.0.0

## updateEffect

Runs an effectful update while holding the ref's semaphore and stores the new
value if the effect succeeds.

**When to use**

Use to run an effectful state transition on a `SynchronizedRef` when storing
the new value is the only result you need.

**See**

- `update` for a pure state transition
- `getAndUpdateEffect` for returning the previous stored value
- `updateAndGetEffect` for returning the new stored value
- `modifyEffect` for returning a separate result while storing a new value
- `updateSomeEffect` for effectfully applying only some state transitions

**Signature**

```ts
declare const updateEffect: {
  <A, R, E>(f: (a: A) => Effect.Effect<A, E, R>): (self: SynchronizedRef<A>) => Effect.Effect<void, E, R>
  <A, R, E>(self: SynchronizedRef<A>, f: (a: A) => Effect.Effect<A, E, R>): Effect.Effect<void, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SynchronizedRef.ts#L485)

Since v2.0.0

## updateSome

Applies a partial update to the current value. `Option.some` stores the new
value; `Option.none` leaves the ref unchanged.

**When to use**

Use to apply a pure conditional `SynchronizedRef` update without returning a
value.

**See**

- `update` for always applying a pure update
- `updateSomeAndGet` for returning the resulting current value

**Signature**

```ts
declare const updateSome: {
  <A>(f: (a: A) => Option.Option<A>): (self: SynchronizedRef<A>) => Effect.Effect<void>
  <A>(self: SynchronizedRef<A>, f: (a: A) => Option.Option<A>): Effect.Effect<void>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SynchronizedRef.ts#L568)

Since v2.0.0

## updateSomeAndGet

Applies a partial update and returns the resulting current value.
`Option.some` stores and returns the new value; `Option.none` returns the
unchanged value.

**When to use**

Use to apply a pure conditional `SynchronizedRef` update and return the
resulting current value.

**See**

- `updateSome` for conditional updates without returning a value
- `updateAndGet` for always applying a pure update and returning the new value

**Signature**

```ts
declare const updateSomeAndGet: {
  <A>(pf: (a: A) => Option.Option<A>): (self: SynchronizedRef<A>) => Effect.Effect<A>
  <A>(self: SynchronizedRef<A>, pf: (a: A) => Option.Option<A>): Effect.Effect<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SynchronizedRef.ts#L627)

Since v2.0.0

## updateSomeAndGetEffect

Runs an effectful partial update while holding the ref's semaphore and
returns the resulting current value. `Option.some` stores and returns the new
value; `Option.none` returns the unchanged value.

**When to use**

Use to run an effectful conditional `SynchronizedRef` update and return the
resulting current value.

**See**

- `updateSomeEffect` for effectful conditional updates without returning a value
- `updateAndGetEffect` for effectful updates that always store and return a new value

**Signature**

```ts
declare const updateSomeAndGetEffect: {
  <A, R, E>(pf: (a: A) => Effect.Effect<Option.Option<A>, E, R>): (self: SynchronizedRef<A>) => Effect.Effect<A, E, R>
  <A, R, E>(self: SynchronizedRef<A>, pf: (a: A) => Effect.Effect<Option.Option<A>, E, R>): Effect.Effect<A, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SynchronizedRef.ts#L652)

Since v2.0.0

## updateSomeEffect

Runs an effectful partial update while holding the ref's semaphore.
`Option.some` stores the new value; `Option.none` leaves the ref unchanged.

**When to use**

Use to run an effectful conditional `SynchronizedRef` update without
returning a value.

**See**

- `updateSome` for the pure conditional variant
- `updateEffect` for effectful updates that always store a new value

**Signature**

```ts
declare const updateSomeEffect: {
  <A, R, E>(
    pf: (a: A) => Effect.Effect<Option.Option<A>, E, R>
  ): (self: SynchronizedRef<A>) => Effect.Effect<void, E, R>
  <A, R, E>(self: SynchronizedRef<A>, pf: (a: A) => Effect.Effect<Option.Option<A>, E, R>): Effect.Effect<void, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SynchronizedRef.ts#L592)

Since v2.0.0
