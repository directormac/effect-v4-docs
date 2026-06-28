---
title: TxPubSub.ts
nav_order: 133
parent: "effect"
---

## TxPubSub.ts overview

Broadcasts values to subscribers inside Effect transactions.

A `TxPubSub<A>` is a transactional publish/subscribe hub. Each subscriber
owns a `TxQueue`, and each published value is offered to the subscriber
queues that are registered at the time of publication. This module includes
bounded, dropping, sliding, and unbounded hubs, publishing helpers, scoped
subscriptions, shutdown operations, and a guard.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [bounded](#bounded)
  - [dropping](#dropping)
  - [sliding](#sliding)
  - [unbounded](#unbounded)
- [getters](#getters)
  - [capacity](#capacity)
  - [isEmpty](#isempty)
  - [isFull](#isfull)
  - [isShutdown](#isshutdown)
  - [size](#size)
- [guards](#guards)
  - [isTxPubSub](#istxpubsub)
- [models](#models)
  - [TxPubSub (interface)](#txpubsub-interface)
- [mutations](#mutations)
  - [acquireSubscriber](#acquiresubscriber)
  - [awaitShutdown](#awaitshutdown)
  - [publish](#publish)
  - [publishAll](#publishall)
  - [releaseSubscriber](#releasesubscriber)
  - [shutdown](#shutdown)
  - [subscribe](#subscribe)

---

# constructors

## bounded

Creates a bounded TxPubSub with the specified capacity. When a subscriber's
queue is full, the publisher will retry the transaction until space is available.

**Example** (Creating a bounded pub/sub)

```ts
import { Effect, TxPubSub, TxQueue } from "effect"

const program = Effect.gen(function* () {
  const hub = yield* TxPubSub.bounded<number>(16)

  yield* Effect.scoped(
    Effect.gen(function* () {
      const sub = yield* TxPubSub.subscribe(hub)
      yield* TxPubSub.publish(hub, 42)
      const value = yield* TxQueue.take(sub)
      console.log(value) // 42
    })
  )
})
```

**Signature**

```ts
declare const bounded: <A = never>(capacity: number) => Effect.Effect<TxPubSub<A>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxPubSub.ts#L125)

Since v2.0.0

## dropping

Creates a dropping TxPubSub with the specified capacity. When a subscriber's
queue is full, the message is dropped for that subscriber.

**Example** (Creating a dropping pub/sub)

```ts
import { Effect, TxPubSub, TxQueue } from "effect"

const program = Effect.gen(function* () {
  const hub = yield* TxPubSub.dropping<number>(2)

  yield* Effect.scoped(
    Effect.gen(function* () {
      const sub = yield* TxPubSub.subscribe(hub)
      yield* TxPubSub.publish(hub, 1)
      yield* TxPubSub.publish(hub, 2)
      yield* TxPubSub.publish(hub, 3) // dropped
      const v1 = yield* TxQueue.take(sub)
      const v2 = yield* TxQueue.take(sub)
      console.log(v1, v2) // 1 2
    })
  )
})
```

**Signature**

```ts
declare const dropping: <A = never>(capacity: number) => Effect.Effect<TxPubSub<A>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxPubSub.ts#L161)

Since v2.0.0

## sliding

Creates a sliding TxPubSub with the specified capacity. When a subscriber's
queue is full, the oldest message in that subscriber's queue is dropped.

**Example** (Creating a sliding pub/sub)

```ts
import { Effect, TxPubSub, TxQueue } from "effect"

const program = Effect.gen(function* () {
  const hub = yield* TxPubSub.sliding<number>(2)

  yield* Effect.scoped(
    Effect.gen(function* () {
      const sub = yield* TxPubSub.subscribe(hub)
      yield* TxPubSub.publish(hub, 1)
      yield* TxPubSub.publish(hub, 2)
      yield* TxPubSub.publish(hub, 3) // evicts 1
      const v1 = yield* TxQueue.take(sub)
      console.log(v1) // 2
    })
  )
})
```

**Signature**

```ts
declare const sliding: <A = never>(capacity: number) => Effect.Effect<TxPubSub<A>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxPubSub.ts#L196)

Since v2.0.0

## unbounded

Creates an unbounded TxPubSub with unlimited capacity. Messages are always accepted.

**Example** (Creating an unbounded pub/sub)

```ts
import { Effect, TxPubSub, TxQueue } from "effect"

const program = Effect.gen(function* () {
  const hub = yield* TxPubSub.unbounded<string>()

  yield* Effect.scoped(
    Effect.gen(function* () {
      const sub = yield* TxPubSub.subscribe(hub)
      yield* TxPubSub.publish(hub, "msg")
      const msg = yield* TxQueue.take(sub)
      console.log(msg) // "msg"
    })
  )
})
```

**Signature**

```ts
declare const unbounded: <A = never>() => Effect.Effect<TxPubSub<A>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxPubSub.ts#L228)

Since v2.0.0

# getters

## capacity

Returns the capacity of the TxPubSub.

**Example** (Reading pub/sub capacity)

```ts
import { Effect, TxPubSub } from "effect"

const program = Effect.gen(function* () {
  const hub = yield* TxPubSub.bounded<number>(16)
  console.log(TxPubSub.capacity(hub)) // 16
})
```

**Signature**

```ts
declare const capacity: <A>(self: TxPubSub<A>) => number
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxPubSub.ts#L256)

Since v2.0.0

## isEmpty

Checks whether the TxPubSub has no pending messages (all subscriber queues are empty).

**Example** (Checking whether a pub/sub is empty)

```ts
import { Effect, TxPubSub } from "effect"

const program = Effect.gen(function* () {
  const hub = yield* TxPubSub.unbounded<number>()
  const empty = yield* TxPubSub.isEmpty(hub)
  console.log(empty) // true
})
```

**Signature**

```ts
declare const isEmpty: <A>(self: TxPubSub<A>) => Effect.Effect<boolean>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxPubSub.ts#L313)

Since v2.0.0

## isFull

Checks whether any subscriber queue is at capacity.

**Example** (Checking whether a pub/sub is full)

```ts
import { Effect, TxPubSub } from "effect"

const program = Effect.gen(function* () {
  const hub = yield* TxPubSub.bounded<number>(2)
  const full = yield* TxPubSub.isFull(hub)
  console.log(full) // false
})
```

**Signature**

```ts
declare const isFull: <A>(self: TxPubSub<A>) => Effect.Effect<boolean>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxPubSub.ts#L333)

Since v2.0.0

## isShutdown

Checks whether the TxPubSub has been shut down.

**Example** (Checking whether a pub/sub is shut down)

```ts
import { Effect, TxPubSub } from "effect"

const program = Effect.gen(function* () {
  const hub = yield* TxPubSub.unbounded<number>()
  console.log(yield* TxPubSub.isShutdown(hub)) // false
  yield* TxPubSub.shutdown(hub)
  console.log(yield* TxPubSub.isShutdown(hub)) // true
})
```

**Signature**

```ts
declare const isShutdown: <A>(self: TxPubSub<A>) => Effect.Effect<boolean>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxPubSub.ts#L362)

Since v2.0.0

## size

Returns the current number of messages across all subscriber queues (the max).

**Example** (Reading subscriber queue size)

```ts
import { Effect, TxPubSub, TxQueue } from "effect"

const program = Effect.gen(function* () {
  const hub = yield* TxPubSub.unbounded<number>()

  yield* Effect.scoped(
    Effect.gen(function* () {
      const sub = yield* TxPubSub.subscribe(hub)
      yield* TxPubSub.publish(hub, 1)
      yield* TxPubSub.publish(hub, 2)
      const s = yield* TxPubSub.size(hub)
      console.log(s) // 2
    })
  )
})
```

**Signature**

```ts
declare const size: <A>(self: TxPubSub<A>) => Effect.Effect<number>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxPubSub.ts#L284)

Since v2.0.0

# guards

## isTxPubSub

Checks whether the given value is a TxPubSub.

**Example** (Checking for a TxPubSub)

```ts
import { TxPubSub } from "effect"

declare const someValue: unknown

if (TxPubSub.isTxPubSub(someValue)) {
  console.log("This is a TxPubSub")
}
```

**Signature**

```ts
declare const isTxPubSub: (u: unknown) => u is TxPubSub<unknown>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxPubSub.ts#L684)

Since v4.0.0

# models

## TxPubSub (interface)

A TxPubSub represents a transactional publish/subscribe hub that broadcasts messages
to all current subscribers using Software Transactional Memory (STM) semantics.

**Example** (Subscribing to a transactional pub/sub)

```ts
import { Effect, TxPubSub, TxQueue } from "effect"

const program = Effect.gen(function* () {
  const hub = yield* TxPubSub.unbounded<string>()

  yield* Effect.scoped(
    Effect.gen(function* () {
      const sub = yield* TxPubSub.subscribe(hub)
      yield* TxPubSub.publish(hub, "hello")
      const msg = yield* TxQueue.take(sub)
      console.log(msg) // "hello"
    })
  )
})
```

**Signature**

```ts
export interface TxPubSub<in out A> extends Inspectable, Pipeable {
  readonly [TypeId]: typeof TypeId
  /** @internal */
  readonly subscribersRef: TxRef.TxRef<Array<TxQueue.TxQueue<A>>>
  /** @internal */
  readonly shutdownRef: TxRef.TxRef<boolean>
  readonly strategy: "bounded" | "unbounded" | "dropping" | "sliding"
  readonly capacity: number
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxPubSub.ts#L51)

Since v4.0.0

# mutations

## acquireSubscriber

Creates a subscriber queue and registers it with the pub/sub.

**When to use**

Use to create and register a subscriber queue inside a larger transaction
when registration must be atomic with other Tx operations.

**Details**

This is the transactional acquire step of `subscribe`, exposed so that callers can compose it with other Tx operations in a single transaction, such as `TxSubscriptionRef.changes`.

**See**

- `subscribe` for the scoped acquire and release wrapper when no custom transaction composition is needed
- `releaseSubscriber` to remove and shut down a queue returned by `acquireSubscriber`

**Signature**

```ts
declare const acquireSubscriber: <A>(self: TxPubSub<A>) => Effect.Effect<TxQueue.TxQueue<A>, never, Effect.Transaction>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxPubSub.ts#L528)

Since v4.0.0

## awaitShutdown

Waits for the TxPubSub to be shut down.

**Example** (Waiting for shutdown)

```ts
import { Effect, TxPubSub } from "effect"

const program = Effect.gen(function* () {
  const hub = yield* TxPubSub.unbounded<number>()

  const fiber = yield* Effect.forkChild(TxPubSub.awaitShutdown(hub))
  yield* TxPubSub.shutdown(hub)
  yield* fiber.await
})
```

**Signature**

```ts
declare const awaitShutdown: <A>(self: TxPubSub<A>) => Effect.Effect<void>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxPubSub.ts#L655)

Since v2.0.0

## publish

Publishes a message to all current subscribers.

**Details**

Returns `true` if the message was delivered to all subscribers, or `false` if the hub is shut down or the message was dropped for any subscriber. For the bounded strategy, the transaction retries if any subscriber queue is full. For the sliding strategy, full subscriber queues drop their oldest messages. For the dropping strategy, full subscriber queues drop the new message and the operation returns `false`.

**Example** (Publishing a message to subscribers)

```ts
import { Effect, TxPubSub, TxQueue } from "effect"

const program = Effect.gen(function* () {
  const hub = yield* TxPubSub.unbounded<string>()

  // No subscribers - publish is a no-op
  const r1 = yield* TxPubSub.publish(hub, "no one listening")
  console.log(r1) // true

  yield* Effect.scoped(
    Effect.gen(function* () {
      const sub = yield* TxPubSub.subscribe(hub)
      yield* TxPubSub.publish(hub, "hello")
      const msg = yield* TxQueue.take(sub)
      console.log(msg) // "hello"
    })
  )
})
```

**Signature**

```ts
declare const publish: {
  <A>(value: A): (self: TxPubSub<A>) => Effect.Effect<boolean>
  <A>(self: TxPubSub<A>, value: A): Effect.Effect<boolean>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxPubSub.ts#L401)

Since v2.0.0

## publishAll

Publishes all messages from an iterable to all current subscribers.

**Details**

Returns `true` if all messages were delivered to all subscribers.

**Example** (Publishing multiple messages to subscribers)

```ts
import { Effect, TxPubSub, TxQueue } from "effect"

const program = Effect.gen(function* () {
  const hub = yield* TxPubSub.unbounded<number>()

  yield* Effect.scoped(
    Effect.gen(function* () {
      const sub = yield* TxPubSub.subscribe(hub)
      yield* TxPubSub.publishAll(hub, [1, 2, 3])
      const v1 = yield* TxQueue.take(sub)
      const v2 = yield* TxQueue.take(sub)
      const v3 = yield* TxQueue.take(sub)
      console.log(v1, v2, v3) // 1 2 3
    })
  )
})
```

**Signature**

```ts
declare const publishAll: {
  <A>(values: Iterable<A>): (self: TxPubSub<A>) => Effect.Effect<boolean>
  <A>(self: TxPubSub<A>, values: Iterable<A>): Effect.Effect<boolean>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxPubSub.ts#L453)

Since v2.0.0

## releaseSubscriber

Removes a subscriber queue from the pub/sub and shuts it down.

**When to use**

Use to release a manually acquired subscriber queue inside a larger
transaction, removing it from the pub/sub and shutting it down together with
related transactional cleanup.

**Details**

This is the transactional release step of `subscribe`, exposed so that callers can compose it with other Tx operations in a single transaction.

**Gotchas**

The supplied queue is shut down after being removed, so callers should pass a
queue acquired for this pub/sub.

**See**

- `acquireSubscriber` for the matching transactional acquire step
- `subscribe` for the scoped acquire and release wrapper

**Signature**

```ts
declare const releaseSubscriber: {
  <A>(queue: TxQueue.TxQueue<A>): (self: TxPubSub<A>) => Effect.Effect<void, never, Effect.Transaction>
  <A>(self: TxPubSub<A>, queue: TxQueue.TxQueue<A>): Effect.Effect<void, never, Effect.Transaction>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxPubSub.ts#L561)

Since v4.0.0

## shutdown

Shuts down the TxPubSub and all subscriber queues registered at the time of shutdown.

**Details**

After shutdown, `publish` and `publishAll` return `false`, and `awaitShutdown` completes. The operation is idempotent.

**Gotchas**

Subscribers acquired after shutdown are not automatically shut down by this call.

**Example** (Shutting down a pub/sub)

```ts
import { Effect, TxPubSub } from "effect"

const program = Effect.gen(function* () {
  const hub = yield* TxPubSub.unbounded<number>()
  yield* TxPubSub.shutdown(hub)

  const shut = yield* TxPubSub.isShutdown(hub)
  console.log(shut) // true

  const accepted = yield* TxPubSub.publish(hub, 1)
  console.log(accepted) // false
})
```

**Signature**

```ts
declare const shutdown: <A>(self: TxPubSub<A>) => Effect.Effect<void>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxPubSub.ts#L623)

Since v2.0.0

## subscribe

Subscribes to the TxPubSub, returning a scoped `TxQueue` for messages published after subscription.

**Details**

The returned queue uses the hub's capacity strategy: bounded subscriptions backpressure publishers when full, dropping subscriptions may miss new messages when full, and sliding subscriptions may evict older queued messages. The subscription is automatically removed when the scope is closed.

**Example** (Subscribing multiple queues)

```ts
import { Effect, TxPubSub, TxQueue } from "effect"

const program = Effect.gen(function* () {
  const hub = yield* TxPubSub.unbounded<string>()

  yield* Effect.scoped(
    Effect.gen(function* () {
      const sub1 = yield* TxPubSub.subscribe(hub)
      const sub2 = yield* TxPubSub.subscribe(hub)

      yield* TxPubSub.publish(hub, "broadcast")

      const msg1 = yield* TxQueue.take(sub1)
      const msg2 = yield* TxQueue.take(sub2)
      console.log(msg1, msg2) // "broadcast" "broadcast"
    })
  )
})
```

**Signature**

```ts
declare const subscribe: <A>(self: TxPubSub<A>) => Effect.Effect<TxQueue.TxQueue<A>, never, Scope.Scope>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxPubSub.ts#L504)

Since v2.0.0
