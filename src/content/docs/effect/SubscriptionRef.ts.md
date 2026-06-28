---
title: SubscriptionRef.ts
nav_order: 115
parent: "effect"
---

## SubscriptionRef.ts overview

Stores mutable state and publishes changes as a stream.

A `SubscriptionRef<A>` stores the latest value, publishes the initial value,
and publishes every committed update so subscribers can observe state over
time. Updates are serialized so only one change is applied at a time. This
module includes constructors, current-value reads, the `changes` stream,
writes, updates, partial updates, and effectful update helpers.

Since v2.0.0

---

## Exports Grouped by Category

- [changes](#changes)
  - [changes](#changes-1)
- [constructors](#constructors)
  - [make](#make)
- [getters](#getters)
  - [get](#get)
  - [getAndSet](#getandset)
  - [getAndUpdate](#getandupdate)
  - [getAndUpdateEffect](#getandupdateeffect)
  - [getAndUpdateSome](#getandupdatesome)
  - [getAndUpdateSomeEffect](#getandupdatesomeeffect)
  - [getUnsafe](#getunsafe)
- [guards](#guards)
  - [isSubscriptionRef](#issubscriptionref)
- [models](#models)
  - [SubscriptionRef (interface)](#subscriptionref-interface)
- [modifications](#modifications)
  - [modify](#modify)
  - [modifyEffect](#modifyeffect)
  - [modifySome](#modifysome)
  - [modifySomeEffect](#modifysomeeffect)
- [setters](#setters)
  - [set](#set)
  - [setAndGet](#setandget)
- [updating](#updating)
  - [update](#update)
  - [updateAndGet](#updateandget)
  - [updateAndGetEffect](#updateandgeteffect)
  - [updateEffect](#updateeffect)
  - [updateSome](#updatesome)
  - [updateSomeAndGet](#updatesomeandget)
  - [updateSomeAndGetEffect](#updatesomeandgeteffect)
  - [updateSomeEffect](#updatesomeeffect)
- [utils](#utils)
  - [SubscriptionRef (namespace)](#subscriptionref-namespace)
    - [Variance (interface)](#variance-interface)

---

# changes

## changes

Creates a stream that emits the current value and all subsequent changes to
the `SubscriptionRef`.

**Details**

The stream will first emit the current value, then emit all future changes
as they occur.

**Example** (Streaming changes)

```ts
import { Deferred, Effect, Fiber, Stream, SubscriptionRef } from "effect"

const program = Effect.gen(function* () {
  const ref = yield* SubscriptionRef.make(0)
  const ready = yield* Deferred.make<void>()

  const fiber = yield* SubscriptionRef.changes(ref).pipe(
    Stream.tap(() => Deferred.succeed(ready, void 0)),
    Stream.take(3),
    Stream.runCollect,
    Effect.forkChild
  )

  yield* Deferred.await(ready)
  yield* SubscriptionRef.set(ref, 1)
  yield* SubscriptionRef.set(ref, 2)

  const values = yield* Fiber.join(fiber)
  console.log(values) // [ 0, 1, 2 ]
})

Effect.runPromise(program)
```

**Signature**

```ts
declare const changes: <A>(self: SubscriptionRef<A>) => Stream.Stream<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SubscriptionRef.ts#L160)

Since v4.0.0

# constructors

## make

Constructs a new `SubscriptionRef` from an initial value.

**When to use**

Use to create a `SubscriptionRef` when consumers need to read the latest
value and subscribe to every update.

**Details**

The initial value is published during construction, so `changes` starts new
subscribers with that value before future updates.

**See**

- `changes` for streaming the current value and subsequent updates
- `set` for replacing the value and notifying subscribers

**Signature**

```ts
declare const make: <A>(value: A) => Effect.Effect<SubscriptionRef<A>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SubscriptionRef.ts#L111)

Since v2.0.0

# getters

## get

Retrieves the current value of the `SubscriptionRef`.

**Example** (Reading the current value)

```ts
import { Effect, SubscriptionRef } from "effect"

const program = Effect.gen(function* () {
  const ref = yield* SubscriptionRef.make(42)

  const value = yield* SubscriptionRef.get(ref)
  console.log(value)
})
```

**Signature**

```ts
declare const get: <A>(self: SubscriptionRef<A>) => Effect.Effect<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SubscriptionRef.ts#L213)

Since v2.0.0

## getAndSet

Retrieves the current value and sets a new value atomically, notifying
subscribers of the change.

**Example** (Getting and setting a value)

```ts
import { Effect, SubscriptionRef } from "effect"

const program = Effect.gen(function* () {
  const ref = yield* SubscriptionRef.make(10)

  const oldValue = yield* SubscriptionRef.getAndSet(ref, 20)
  console.log("Old value:", oldValue)

  const newValue = yield* SubscriptionRef.get(ref)
  console.log("New value:", newValue)
})
```

**Signature**

```ts
declare const getAndSet: {
  <A>(value: A): (self: SubscriptionRef<A>) => Effect.Effect<A>
  <A>(self: SubscriptionRef<A>, value: A): Effect.Effect<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SubscriptionRef.ts#L238)

Since v2.0.0

## getAndUpdate

Retrieves the current value and updates it atomically with the result of
applying a function, notifying subscribers of the change.

**Example** (Getting and updating a value)

```ts
import { Effect, SubscriptionRef } from "effect"

const program = Effect.gen(function* () {
  const ref = yield* SubscriptionRef.make(10)

  const oldValue = yield* SubscriptionRef.getAndUpdate(ref, (n) => n * 2)
  console.log("Old value:", oldValue)

  const newValue = yield* SubscriptionRef.get(ref)
  console.log("New value:", newValue)
})
```

**Signature**

```ts
declare const getAndUpdate: {
  <A>(update: (a: A) => A): (self: SubscriptionRef<A>) => Effect.Effect<A>
  <A>(self: SubscriptionRef<A>, update: (a: A) => A): Effect.Effect<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SubscriptionRef.ts#L276)

Since v2.0.0

## getAndUpdateEffect

Retrieves the current value and updates it atomically with the result of
applying an effectful function, notifying subscribers of the change.

**Example** (Getting and updating with an effect)

```ts
import { Effect, SubscriptionRef } from "effect"

const program = Effect.gen(function* () {
  const ref = yield* SubscriptionRef.make(10)

  const oldValue = yield* SubscriptionRef.getAndUpdateEffect(ref, (n) => Effect.succeed(n + 5))
  console.log("Old value:", oldValue)

  const newValue = yield* SubscriptionRef.get(ref)
  console.log("New value:", newValue)
})
```

**Signature**

```ts
declare const getAndUpdateEffect: {
  <A, E, R>(update: (a: A) => Effect.Effect<A, E, R>): (self: SubscriptionRef<A>) => Effect.Effect<A, E, R>
  <A, E, R>(self: SubscriptionRef<A>, update: (a: A) => Effect.Effect<A, E, R>): Effect.Effect<A, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SubscriptionRef.ts#L313)

Since v2.0.0

## getAndUpdateSome

Retrieves the current value and optionally updates the reference.

**When to use**

Use to read the old `SubscriptionRef` value while applying a synchronous
update only when a new value is available.

**Details**

If the function returns `Option.some`, the new value is set and published. If
it returns `Option.none`, the reference is left unchanged and no update is
published.

**Example** (Getting and conditionally updating a value)

```ts
import { Effect, Option, SubscriptionRef } from "effect"

const program = Effect.gen(function* () {
  const ref = yield* SubscriptionRef.make(10)

  const oldValue = yield* SubscriptionRef.getAndUpdateSome(ref, (n) => (n > 5 ? Option.some(n * 2) : Option.none()))
  console.log("Old value:", oldValue)

  const newValue = yield* SubscriptionRef.get(ref)
  console.log("New value:", newValue)
})
```

**Signature**

```ts
declare const getAndUpdateSome: {
  <A>(update: (a: A) => Option.Option<A>): (self: SubscriptionRef<A>) => Effect.Effect<A>
  <A>(self: SubscriptionRef<A>, update: (a: A) => Option.Option<A>): Effect.Effect<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SubscriptionRef.ts#L364)

Since v2.0.0

## getAndUpdateSomeEffect

Retrieves the current value and optionally updates the reference effectfully.

**When to use**

Use to read the old `SubscriptionRef` value while applying an effectful
update only when a new value is available.

**Details**

If the effect succeeds with `Option.some`, the new value is set and
published. If it succeeds with `Option.none`, the reference is left unchanged
and no update is published.

**Example** (Getting and conditionally updating with an effect)

```ts
import { Effect, Option, SubscriptionRef } from "effect"

const program = Effect.gen(function* () {
  const ref = yield* SubscriptionRef.make(10)

  const oldValue = yield* SubscriptionRef.getAndUpdateSomeEffect(ref, (n) =>
    Effect.succeed(n > 5 ? Option.some(n + 3) : Option.none())
  )
  console.log("Old value:", oldValue)

  const newValue = yield* SubscriptionRef.get(ref)
  console.log("New value:", newValue)
})
```

**Signature**

```ts
declare const getAndUpdateSomeEffect: {
  <A, R, E>(
    update: (a: A) => Effect.Effect<Option.Option<A>, E, R>
  ): (self: SubscriptionRef<A>) => Effect.Effect<A, E, R>
  <A, R, E>(self: SubscriptionRef<A>, update: (a: A) => Effect.Effect<Option.Option<A>, E, R>): Effect.Effect<A, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SubscriptionRef.ts#L417)

Since v2.0.0

## getUnsafe

Retrieves the current value of the `SubscriptionRef` unsafely.

**When to use**

Use when you are in synchronous internals or test setup where concurrent
updates are controlled.

**Gotchas**

This function directly accesses the underlying reference without any
synchronization. It should only be used when you are certain there are no
concurrent modifications.

**Example** (Reading the current value unsafely)

```ts
import { Effect, SubscriptionRef } from "effect"

const program = Effect.gen(function* () {
  const ref = yield* SubscriptionRef.make(42)

  const value = SubscriptionRef.getUnsafe(ref)
  console.log(value)
})
```

**Signature**

```ts
declare const getUnsafe: <A>(self: SubscriptionRef<A>) => A
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SubscriptionRef.ts#L192)

Since v4.0.0

# guards

## isSubscriptionRef

Returns `true` if the provided value is a `SubscriptionRef`.

**When to use**

Use to narrow an unknown value before calling `SubscriptionRef` operations
that require a subscription reference.

**Signature**

```ts
declare const isSubscriptionRef: (u: unknown) => u is SubscriptionRef<unknown>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SubscriptionRef.ts#L54)

Since v4.0.0

# models

## SubscriptionRef (interface)

A mutable reference whose updates are serialized and published to
subscribers.

**When to use**

Use to observe the current value and subsequent updates as a
stream.

**Signature**

```ts
export interface SubscriptionRef<in out A> extends SubscriptionRef.Variance<A>, Pipeable {
  value: A
  readonly semaphore: Semaphore.Semaphore
  readonly pubsub: PubSub.PubSub<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SubscriptionRef.ts#L37)

Since v2.0.0

# modifications

## modify

Modifies the `SubscriptionRef` atomically with a function that computes a
return value and a new value, notifying subscribers of the change.

**Example** (Modifying a value)

```ts
import { Effect, SubscriptionRef } from "effect"

const program = Effect.gen(function* () {
  const ref = yield* SubscriptionRef.make(10)

  const result = yield* SubscriptionRef.modify(ref, (n) => [`Old value was ${n}`, n * 2])
  console.log(result)

  const newValue = yield* SubscriptionRef.get(ref)
  console.log("New value:", newValue)
})
```

**Signature**

```ts
declare const modify: {
  <A, B>(modify: (a: A) => readonly [B, A]): (self: SubscriptionRef<A>) => Effect.Effect<B>
  <A, B>(self: SubscriptionRef<A>, f: (a: A) => readonly [B, A]): Effect.Effect<B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SubscriptionRef.ts#L464)

Since v2.0.0

## modifyEffect

Modifies the `SubscriptionRef` atomically with an effectful function that
computes a return value and a new value, notifying subscribers of the
change.

**Example** (Modifying with an effect)

```ts
import { Effect, SubscriptionRef } from "effect"

const program = Effect.gen(function* () {
  const ref = yield* SubscriptionRef.make(10)

  const result = yield* SubscriptionRef.modifyEffect(ref, (n) => Effect.succeed([`Doubled from ${n}`, n * 2] as const))
  console.log(result)

  const newValue = yield* SubscriptionRef.get(ref)
  console.log("New value:", newValue)
})
```

**Signature**

```ts
declare const modifyEffect: {
  <B, A, E, R>(
    modify: (a: A) => Effect.Effect<readonly [B, A], E, R>
  ): (self: SubscriptionRef<A>) => Effect.Effect<B, E, R>
  <A, B, E, R>(self: SubscriptionRef<A>, modify: (a: A) => Effect.Effect<readonly [B, A], E, R>): Effect.Effect<B, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SubscriptionRef.ts#L504)

Since v2.0.0

## modifySome

Computes a return value and optionally updates the reference.

**When to use**

Use to return a separate result while synchronously deciding whether to
publish a new `SubscriptionRef` value.

**Details**

If the function returns `Option.some` for the new value, the value is set and
published. If it returns `Option.none`, the reference is left unchanged and
no update is published.

**Example** (Conditionally modifying a value)

```ts
import { Effect, Option, SubscriptionRef } from "effect"

const program = Effect.gen(function* () {
  const ref = yield* SubscriptionRef.make(10)

  const result = yield* SubscriptionRef.modifySome(ref, (n) =>
    n > 5 ? ["Updated", Option.some(n * 2)] : ["Not updated", Option.none()]
  )
  console.log(result)

  const newValue = yield* SubscriptionRef.get(ref)
  console.log("New value:", newValue)
})
```

**Signature**

```ts
declare const modifySome: {
  <B, A>(modify: (a: A) => readonly [B, Option.Option<A>]): (self: SubscriptionRef<A>) => Effect.Effect<B>
  <A, B>(self: SubscriptionRef<A>, modify: (a: A) => readonly [B, Option.Option<A>]): Effect.Effect<B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SubscriptionRef.ts#L560)

Since v2.0.0

## modifySomeEffect

Computes a return value and optionally updates the reference effectfully.

**When to use**

Use to return a separate result while effectfully deciding whether to publish
a new `SubscriptionRef` value.

**Details**

If the effect succeeds with `Option.some`, the new value is set and
published. If it succeeds with `Option.none`, the reference is left unchanged
and no update is published.

**Example** (Conditionally modifying with an effect)

```ts
import { Effect, Option, SubscriptionRef } from "effect"

const program = Effect.gen(function* () {
  const ref = yield* SubscriptionRef.make(10)

  const result = yield* SubscriptionRef.modifySomeEffect(ref, (n) =>
    Effect.succeed(n > 5 ? (["Updated", Option.some(n + 5)] as const) : (["Not updated", Option.none()] as const))
  )
  console.log(result)

  const newValue = yield* SubscriptionRef.get(ref)
  console.log("New value:", newValue)
})
```

**Signature**

```ts
declare const modifySomeEffect: {
  <A, B, R, E>(
    modify: (a: A) => Effect.Effect<readonly [B, Option.Option<A>], E, R>
  ): (self: SubscriptionRef<A>) => Effect.Effect<B, E, R>
  <A, B, R, E>(
    self: SubscriptionRef<A>,
    modify: (a: A) => Effect.Effect<readonly [B, Option.Option<A>], E, R>
  ): Effect.Effect<B, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SubscriptionRef.ts#L620)

Since v2.0.0

# setters

## set

Sets the value of the `SubscriptionRef`, notifying all subscribers of the
change.

**Example** (Setting a value)

```ts
import { Effect, SubscriptionRef } from "effect"

const program = Effect.gen(function* () {
  const ref = yield* SubscriptionRef.make(0)

  yield* SubscriptionRef.set(ref, 42)

  const value = yield* SubscriptionRef.get(ref)
  console.log(value)
})
```

**Signature**

```ts
declare const set: {
  <A>(value: A): (self: SubscriptionRef<A>) => Effect.Effect<void>
  <A>(self: SubscriptionRef<A>, value: A): Effect.Effect<void>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SubscriptionRef.ts#L662)

Since v2.0.0

## setAndGet

Sets the value of the `SubscriptionRef` and returns the new value,
notifying all subscribers of the change.

**Example** (Setting and reading the new value)

```ts
import { Effect, SubscriptionRef } from "effect"

const program = Effect.gen(function* () {
  const ref = yield* SubscriptionRef.make(0)

  const newValue = yield* SubscriptionRef.setAndGet(ref, 42)
  console.log("New value:", newValue)
})
```

**Signature**

```ts
declare const setAndGet: {
  <A>(value: A): (self: SubscriptionRef<A>) => Effect.Effect<A>
  <A>(self: SubscriptionRef<A>, value: A): Effect.Effect<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SubscriptionRef.ts#L690)

Since v2.0.0

# updating

## update

Updates the value of the `SubscriptionRef` with the result of applying a
function, notifying subscribers of the change.

**Example** (Updating a value)

```ts
import { Effect, SubscriptionRef } from "effect"

const program = Effect.gen(function* () {
  const ref = yield* SubscriptionRef.make(10)

  yield* SubscriptionRef.update(ref, (n) => n * 2)

  const value = yield* SubscriptionRef.get(ref)
  console.log(value)
})
```

**Signature**

```ts
declare const update: {
  <A>(update: (a: A) => A): (self: SubscriptionRef<A>) => Effect.Effect<void>
  <A>(self: SubscriptionRef<A>, update: (a: A) => A): Effect.Effect<void>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SubscriptionRef.ts#L721)

Since v2.0.0

## updateAndGet

Updates the value of the `SubscriptionRef` with the result of applying a
function and returns the new value, notifying subscribers of the change.

**Example** (Updating and reading the new value)

```ts
import { Effect, SubscriptionRef } from "effect"

const program = Effect.gen(function* () {
  const ref = yield* SubscriptionRef.make(10)

  const newValue = yield* SubscriptionRef.updateAndGet(ref, (n) => n * 2)
  console.log("New value:", newValue)
})
```

**Signature**

```ts
declare const updateAndGet: {
  <A>(update: (a: A) => A): (self: SubscriptionRef<A>) => Effect.Effect<A>
  <A>(self: SubscriptionRef<A>, update: (a: A) => A): Effect.Effect<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SubscriptionRef.ts#L783)

Since v2.0.0

## updateAndGetEffect

Updates the value of the `SubscriptionRef` with the result of applying an
effectful function and returns the new value, notifying subscribers of the
change.

**Example** (Updating with an effect and reading the new value)

```ts
import { Effect, SubscriptionRef } from "effect"

const program = Effect.gen(function* () {
  const ref = yield* SubscriptionRef.make(10)

  const newValue = yield* SubscriptionRef.updateAndGetEffect(ref, (n) => Effect.succeed(n + 5))
  console.log("New value:", newValue)
})
```

**Signature**

```ts
declare const updateAndGetEffect: {
  <A, E, R>(update: (a: A) => Effect.Effect<A, E, R>): (self: SubscriptionRef<A>) => Effect.Effect<A, E, R>
  <A, E, R>(self: SubscriptionRef<A>, update: (a: A) => Effect.Effect<A, E, R>): Effect.Effect<A, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SubscriptionRef.ts#L817)

Since v2.0.0

## updateEffect

Updates the value of the `SubscriptionRef` with the result of applying an
effectful function, notifying subscribers of the change.

**Example** (Updating with an effect)

```ts
import { Effect, SubscriptionRef } from "effect"

const program = Effect.gen(function* () {
  const ref = yield* SubscriptionRef.make(10)

  yield* SubscriptionRef.updateEffect(ref, (n) => Effect.succeed(n + 5))

  const value = yield* SubscriptionRef.get(ref)
  console.log(value)
})
```

**Signature**

```ts
declare const updateEffect: {
  <A, E, R>(update: (a: A) => Effect.Effect<A, E, R>): (self: SubscriptionRef<A>) => Effect.Effect<void, E, R>
  <A, E, R>(self: SubscriptionRef<A>, update: (a: A) => Effect.Effect<A, E, R>): Effect.Effect<void, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SubscriptionRef.ts#L752)

Since v2.0.0

## updateSome

Applies an update function to the current value. If it returns
`Option.some`, sets and publishes that value; if it returns `Option.none`,
leaves the reference unchanged and does not publish.

**Example** (Conditionally updating a value)

```ts
import { Effect, Option, SubscriptionRef } from "effect"

const program = Effect.gen(function* () {
  const ref = yield* SubscriptionRef.make(10)

  yield* SubscriptionRef.updateSome(ref, (n) => (n > 5 ? Option.some(n * 2) : Option.none()))

  const value = yield* SubscriptionRef.get(ref)
  console.log(value)
})
```

**Signature**

```ts
declare const updateSome: {
  <A>(update: (a: A) => Option.Option<A>): (self: SubscriptionRef<A>) => Effect.Effect<void>
  <A>(self: SubscriptionRef<A>, update: (a: A) => Option.Option<A>): Effect.Effect<void>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SubscriptionRef.ts#L857)

Since v2.0.0

## updateSomeAndGet

Applies an optional update and returns the current value afterward.

**When to use**

Use to conditionally update a `SubscriptionRef` and read the value that is
current after the update decision.

**Details**

If the function returns `Option.some`, the new value is set, published, and
returned. If it returns `Option.none`, the unchanged current value is
returned without publishing.

**Example** (Conditionally updating and reading the new value)

```ts
import { Effect, Option, SubscriptionRef } from "effect"

const program = Effect.gen(function* () {
  const ref = yield* SubscriptionRef.make(10)

  const newValue = yield* SubscriptionRef.updateSomeAndGet(ref, (n) => (n > 5 ? Option.some(n * 2) : Option.none()))
  console.log("New value:", newValue)
})
```

**Signature**

```ts
declare const updateSomeAndGet: {
  <A>(update: (a: A) => Option.Option<A>): (self: SubscriptionRef<A>) => Effect.Effect<A>
  <A>(self: SubscriptionRef<A>, update: (a: A) => Option.Option<A>): Effect.Effect<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SubscriptionRef.ts#L957)

Since v2.0.0

## updateSomeAndGetEffect

Applies an effectful optional update and returns the current value afterward.

**When to use**

Use to conditionally update a `SubscriptionRef` effectfully and read the
value that is current after the update decision.

**Details**

If the effect succeeds with `Option.some`, the new value is set, published,
and returned. If it succeeds with `Option.none`, the unchanged current value
is returned without publishing.

**Example** (Conditionally updating with an effect and reading the new value)

```ts
import { Effect, Option, SubscriptionRef } from "effect"

const program = Effect.gen(function* () {
  const ref = yield* SubscriptionRef.make(10)

  const newValue = yield* SubscriptionRef.updateSomeAndGetEffect(ref, (n) =>
    Effect.succeed(n > 5 ? Option.some(n + 3) : Option.none())
  )
  console.log("New value:", newValue)
})
```

**Signature**

```ts
declare const updateSomeAndGetEffect: {
  <A, E, R>(
    update: (a: A) => Effect.Effect<Option.Option<A>, E, R>
  ): (self: SubscriptionRef<A>) => Effect.Effect<A, E, R>
  <A, E, R>(self: SubscriptionRef<A>, update: (a: A) => Effect.Effect<Option.Option<A>, E, R>): Effect.Effect<A, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SubscriptionRef.ts#L1005)

Since v2.0.0

## updateSomeEffect

Applies an effectful update only when it produces a new value.

**When to use**

Use to conditionally update a `SubscriptionRef` with an effectful function
while discarding the resulting value.

**Details**

If the effect succeeds with `Option.some`, the new value is set and
published. If it succeeds with `Option.none`, the reference is left unchanged
and no update is published.

**Example** (Conditionally updating with an effect)

```ts
import { Effect, Option, SubscriptionRef } from "effect"

const program = Effect.gen(function* () {
  const ref = yield* SubscriptionRef.make(10)

  yield* SubscriptionRef.updateSomeEffect(ref, (n) => Effect.succeed(n > 5 ? Option.some(n + 3) : Option.none()))

  const value = yield* SubscriptionRef.get(ref)
  console.log(value)
})
```

**Signature**

```ts
declare const updateSomeEffect: {
  <A, E, R>(
    update: (a: A) => Effect.Effect<Option.Option<A>, E, R>
  ): (self: SubscriptionRef<A>) => Effect.Effect<void, E, R>
  <A, E, R>(
    self: SubscriptionRef<A>,
    update: (a: A) => Effect.Effect<Option.Option<A>, E, R>
  ): Effect.Effect<void, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SubscriptionRef.ts#L905)

Since v2.0.0

# utils

## SubscriptionRef (namespace)

The `SubscriptionRef` namespace containing type definitions associated with
subscription references.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SubscriptionRef.ts#L64)

Since v2.0.0

### Variance (interface)

Type-level variance marker for the value type carried by a
`SubscriptionRef`.

**Signature**

```ts
export interface Variance<in out A> {
  readonly [TypeId]: {
    readonly _A: Invariant<A>
  }
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SubscriptionRef.ts#L72)

Since v2.0.0
