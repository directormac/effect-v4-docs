---
title: TxSubscriptionRef.ts
nav_order: 138
parent: "effect"
---

## TxSubscriptionRef.ts overview

Stores transactional state and publishes committed changes.

A `TxSubscriptionRef<A>` combines a `TxRef<A>` for the current value with a
transactional pub/sub channel for updates. Subscribers first receive the
current value and then every later value that is published by committed
updates. This module includes constructors, reads, writes, update and modify
helpers, transactional-queue subscriptions, stream subscriptions, and a guard.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [make](#make)
- [getters](#getters)
  - [get](#get)
- [guards](#guards)
  - [isTxSubscriptionRef](#istxsubscriptionref)
- [models](#models)
  - [TxSubscriptionRef (interface)](#txsubscriptionref-interface)
- [mutations](#mutations)
  - [getAndSet](#getandset)
  - [getAndUpdate](#getandupdate)
  - [modify](#modify)
  - [set](#set)
  - [update](#update)
  - [updateAndGet](#updateandget)
- [subscriptions](#subscriptions)
  - [changes](#changes)
  - [changesStream](#changesstream)

---

# constructors

## make

Creates a new TxSubscriptionRef with the specified initial value.

**When to use**

Use to create a `TxSubscriptionRef` that publishes every committed update to
subscribers.

**Example** (Creating a transactional subscription reference)

```ts
import { Effect, TxSubscriptionRef } from "effect"

const program = Effect.gen(function* () {
  const ref = yield* TxSubscriptionRef.make(42)
  const value = yield* TxSubscriptionRef.get(ref)
  console.log(value) // 42
})
```

**See**

- `changes` for subscribing to the created reference

**Signature**

```ts
declare const make: <A>(value: A) => Effect.Effect<TxSubscriptionRef<A>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxSubscriptionRef.ts#L118)

Since v3.10.0

# getters

## get

Reads the current value of the TxSubscriptionRef.

**When to use**

Use to read the current `TxSubscriptionRef` value without subscribing to
future changes.

**Example** (Reading the current value)

```ts
import { Effect, TxSubscriptionRef } from "effect"

const program = Effect.gen(function* () {
  const ref = yield* TxSubscriptionRef.make("hello")
  const value = yield* TxSubscriptionRef.get(ref)
  console.log(value) // "hello"
})
```

**See**

- `changes` for reading the current value and subsequent updates

**Signature**

```ts
declare const get: <A>(self: TxSubscriptionRef<A>) => Effect.Effect<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxSubscriptionRef.ts#L158)

Since v3.10.0

# guards

## isTxSubscriptionRef

Checks whether the given value is a TxSubscriptionRef.

**When to use**

Use to narrow an unknown value before treating it as a `TxSubscriptionRef`.

**Example** (Checking transactional subscription references)

```ts
import { TxSubscriptionRef } from "effect"

declare const someValue: unknown

if (TxSubscriptionRef.isTxSubscriptionRef(someValue)) {
  console.log("This is a TxSubscriptionRef")
}
```

**See**

- `make` for creating a `TxSubscriptionRef`

**Signature**

```ts
declare const isTxSubscriptionRef: (u: unknown) => u is TxSubscriptionRef<unknown>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxSubscriptionRef.ts#L518)

Since v4.0.0

# models

## TxSubscriptionRef (interface)

A TxSubscriptionRef is a transactional reference that allows subscribing to all
committed changes. Subscribers receive the current value followed by every subsequent
update via a transactional dequeue.

**When to use**

Use to store transactional state whose committed changes must be observable by
subscribers.

**Example** (Subscribing to transactional changes)

```ts
import { Effect, TxQueue, TxSubscriptionRef } from "effect"

const program = Effect.gen(function* () {
  const ref = yield* TxSubscriptionRef.make(0)

  yield* Effect.scoped(
    Effect.gen(function* () {
      const sub = yield* TxSubscriptionRef.changes(ref)
      const initial = yield* TxQueue.take(sub)
      console.log(initial) // 0

      yield* TxSubscriptionRef.set(ref, 1)
      const next = yield* TxQueue.take(sub)
      console.log(next) // 1
    })
  )
})
```

**See**

- `make` for creating a transactional subscription reference
- `changes` for subscribing through a transactional queue
- `changesStream` for subscribing through a `Stream`

**Signature**

```ts
export interface TxSubscriptionRef<in out A> extends Inspectable, Pipeable {
  readonly [TypeId]: typeof TypeId
  /** @internal */
  readonly ref: TxRef.TxRef<A>
  /** @internal */
  readonly pubsub: TxPubSub.TxPubSub<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxSubscriptionRef.ts#L66)

Since v4.0.0

# mutations

## getAndSet

Gets the current value and sets a new value atomically. Publishes the new value
to all subscribers.

**When to use**

Use to replace a `TxSubscriptionRef` value while returning the previous value
and publishing the update to subscribers.

**Example** (Getting and setting atomically)

```ts
import { Effect, TxSubscriptionRef } from "effect"

const program = Effect.gen(function* () {
  const ref = yield* TxSubscriptionRef.make("a")
  const old = yield* TxSubscriptionRef.getAndSet(ref, "b")
  console.log(old) // "a"
  console.log(yield* TxSubscriptionRef.get(ref)) // "b"
})
```

**See**

- `set` for setting without returning the previous value
- `getAndUpdate` for deriving the new value from the previous value

**Signature**

```ts
declare const getAndSet: {
  <A>(value: A): (self: TxSubscriptionRef<A>) => Effect.Effect<A>
  <A>(self: TxSubscriptionRef<A>, value: A): Effect.Effect<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxSubscriptionRef.ts#L313)

Since v3.10.0

## getAndUpdate

Gets the current value and updates it using a function atomically. Publishes
the new value to all subscribers.

**When to use**

Use to derive and publish a new `TxSubscriptionRef` value while returning the
previous value.

**Example** (Getting and updating atomically)

```ts
import { Effect, TxSubscriptionRef } from "effect"

const program = Effect.gen(function* () {
  const ref = yield* TxSubscriptionRef.make(1)
  const old = yield* TxSubscriptionRef.getAndUpdate(ref, (n) => n + 10)
  console.log(old) // 1
  console.log(yield* TxSubscriptionRef.get(ref)) // 11
})
```

**See**

- `update` for updating without returning the previous value
- `updateAndGet` for returning the new value instead

**Signature**

```ts
declare const getAndUpdate: {
  <A>(f: (current: A) => A): (self: TxSubscriptionRef<A>) => Effect.Effect<A>
  <A>(self: TxSubscriptionRef<A>, f: (current: A) => A): Effect.Effect<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxSubscriptionRef.ts#L349)

Since v3.10.0

## modify

Modifies the value of the TxSubscriptionRef using a function that returns both a
result and the new value. The new value is published to all subscribers atomically.

**When to use**

Use to compute a separate return value and next `TxSubscriptionRef` state in
one transactional update.

**Example** (Modifying and returning a value)

```ts
import { Effect, TxSubscriptionRef } from "effect"

const program = Effect.gen(function* () {
  const ref = yield* TxSubscriptionRef.make(10)
  const result = yield* TxSubscriptionRef.modify(ref, (n) => [`was ${n}`, n + 1])
  console.log(result) // "was 10"
  console.log(yield* TxSubscriptionRef.get(ref)) // 11
})
```

**See**

- `update` for deriving the next value without a separate return value
- `set` for replacing the value directly

**Signature**

```ts
declare const modify: {
  <A, B>(f: (current: A) => [returnValue: B, newValue: A]): (self: TxSubscriptionRef<A>) => Effect.Effect<B>
  <A, B>(self: TxSubscriptionRef<A>, f: (current: A) => [returnValue: B, newValue: A]): Effect.Effect<B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxSubscriptionRef.ts#L192)

Since v3.10.0

## set

Sets the value of the TxSubscriptionRef and publishes the new value to all subscribers.

**When to use**

Use to replace the current `TxSubscriptionRef` value with a known value and
publish it.

**Example** (Setting a new value)

```ts
import { Effect, TxSubscriptionRef } from "effect"

const program = Effect.gen(function* () {
  const ref = yield* TxSubscriptionRef.make(0)
  yield* TxSubscriptionRef.set(ref, 42)
  console.log(yield* TxSubscriptionRef.get(ref)) // 42
})
```

**See**

- `update` for deriving the new value from the current value
- `getAndSet` for setting while returning the previous value

**Signature**

```ts
declare const set: {
  <A>(value: A): (self: TxSubscriptionRef<A>) => Effect.Effect<void>
  <A>(self: TxSubscriptionRef<A>, value: A): Effect.Effect<void>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxSubscriptionRef.ts#L241)

Since v3.10.0

## update

Updates the value of the TxSubscriptionRef using a function and publishes the new
value to all subscribers.

**When to use**

Use to derive the next `TxSubscriptionRef` value from the current value and
publish it.

**Example** (Updating a value)

```ts
import { Effect, TxSubscriptionRef } from "effect"

const program = Effect.gen(function* () {
  const ref = yield* TxSubscriptionRef.make(5)
  yield* TxSubscriptionRef.update(ref, (n) => n * 2)
  console.log(yield* TxSubscriptionRef.get(ref)) // 10
})
```

**See**

- `set` for replacing the value directly
- `updateAndGet` for returning the new value after the update

**Signature**

```ts
declare const update: {
  <A>(f: (current: A) => A): (self: TxSubscriptionRef<A>) => Effect.Effect<void>
  <A>(self: TxSubscriptionRef<A>, f: (current: A) => A): Effect.Effect<void>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxSubscriptionRef.ts#L276)

Since v3.10.0

## updateAndGet

Updates the value using a function and returns the new value. Publishes the
new value to all subscribers.

**When to use**

Use to derive and publish a new `TxSubscriptionRef` value while returning
that new value.

**Example** (Updating and reading atomically)

```ts
import { Effect, TxSubscriptionRef } from "effect"

const program = Effect.gen(function* () {
  const ref = yield* TxSubscriptionRef.make(3)
  const result = yield* TxSubscriptionRef.updateAndGet(ref, (n) => n * 3)
  console.log(result) // 9
})
```

**See**

- `update` for updating without returning the new value
- `getAndUpdate` for returning the previous value instead

**Signature**

```ts
declare const updateAndGet: {
  <A>(f: (current: A) => A): (self: TxSubscriptionRef<A>) => Effect.Effect<A>
  <A>(self: TxSubscriptionRef<A>, f: (current: A) => A): Effect.Effect<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxSubscriptionRef.ts#L385)

Since v3.10.0

# subscriptions

## changes

Subscribes to all changes of the TxSubscriptionRef. Returns a scoped TxDequeue
that first yields the current value, then every subsequent update.

**When to use**

Use to subscribe to `TxSubscriptionRef` committed changes through a scoped
transactional queue.

**Example** (Subscribing to changes)

```ts
import { Effect, TxQueue, TxSubscriptionRef } from "effect"

const program = Effect.gen(function* () {
  const ref = yield* TxSubscriptionRef.make(0)

  yield* Effect.scoped(
    Effect.gen(function* () {
      const sub = yield* TxSubscriptionRef.changes(ref)
      const initial = yield* TxQueue.take(sub)
      console.log(initial) // 0

      yield* TxSubscriptionRef.set(ref, 1)
      const next = yield* TxQueue.take(sub)
      console.log(next) // 1
    })
  )
})
```

**See**

- `changesStream` for subscribing through a `Stream`

**Signature**

```ts
declare const changes: <A>(self: TxSubscriptionRef<A>) => Effect.Effect<TxQueue.TxQueue<A>, never, Scope.Scope>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxSubscriptionRef.ts#L437)

Since v3.10.0

## changesStream

Returns a Stream of all changes to the TxSubscriptionRef, starting with the
current value followed by every subsequent update.

**When to use**

Use to consume `TxSubscriptionRef` committed changes as a `Stream`.

**Example** (Streaming changes)

```ts
import { Effect, Stream, TxSubscriptionRef } from "effect"

const program = Effect.gen(function* () {
  const ref = yield* TxSubscriptionRef.make(0)
  yield* TxSubscriptionRef.set(ref, 1)
  yield* TxSubscriptionRef.set(ref, 2)

  const values = yield* Stream.runCollect(TxSubscriptionRef.changesStream(ref).pipe(Stream.take(1)))
  console.log(values) // [2]
})
```

**See**

- `changes` for subscribing through a transactional queue

**Signature**

```ts
declare const changesStream: <A>(self: TxSubscriptionRef<A>) => Stream.Stream<A, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxSubscriptionRef.ts#L482)

Since v3.10.0
