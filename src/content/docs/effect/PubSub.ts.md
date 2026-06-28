---
title: PubSub.ts
nav_order: 78
parent: "effect"
---

## PubSub.ts overview

Broadcasts values from publishers to many subscribers.

Publishers add messages with `publish` or `publishAll`, and each active
`Subscription` receives its own copy of every accepted message. Unlike a
queue, subscribers do not compete for messages. This module includes bounded,
dropping, sliding, and unbounded hubs, optional replay buffers for late
subscribers, message-taking helpers, capacity and shutdown operations, and
low-level types for custom hub strategies.

Since v2.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [bounded](#bounded)
  - [dropping](#dropping)
  - [make](#make)
  - [makeAtomicBounded](#makeatomicbounded)
  - [makeAtomicUnbounded](#makeatomicunbounded)
  - [sliding](#sliding)
  - [unbounded](#unbounded)
- [getters](#getters)
  - [capacity](#capacity)
  - [remaining](#remaining)
  - [remainingUnsafe](#remainingunsafe)
  - [size](#size)
  - [sizeUnsafe](#sizeunsafe)
- [lifecycle](#lifecycle)
  - [awaitShutdown](#awaitshutdown)
  - [shutdown](#shutdown)
- [models](#models)
  - [BackPressureStrategy (class)](#backpressurestrategy-class)
    - [handleSurplus (method)](#handlesurplus-method)
    - [onPubSubEmptySpaceUnsafe (method)](#onpubsubemptyspaceunsafe-method)
    - [completePollersUnsafe (method)](#completepollersunsafe-method)
    - [completeSubscribersUnsafe (method)](#completesubscribersunsafe-method)
    - [offerUnsafe (method)](#offerunsafe-method)
    - [removeUnsafe (method)](#removeunsafe-method)
    - [publishers (property)](#publishers-property)
  - [DroppingStrategy (class)](#droppingstrategy-class)
    - [handleSurplus (method)](#handlesurplus-method-1)
    - [onPubSubEmptySpaceUnsafe (method)](#onpubsubemptyspaceunsafe-method-1)
    - [completePollersUnsafe (method)](#completepollersunsafe-method-1)
    - [completeSubscribersUnsafe (method)](#completesubscribersunsafe-method-1)
  - [PubSub (interface)](#pubsub-interface)
  - [SlidingStrategy (class)](#slidingstrategy-class)
    - [handleSurplus (method)](#handlesurplus-method-2)
    - [onPubSubEmptySpaceUnsafe (method)](#onpubsubemptyspaceunsafe-method-2)
    - [completePollersUnsafe (method)](#completepollersunsafe-method-2)
    - [completeSubscribersUnsafe (method)](#completesubscribersunsafe-method-2)
    - [slidingPublishUnsafe (method)](#slidingpublishunsafe-method)
  - [Subscription (interface)](#subscription-interface)
- [predicates](#predicates)
  - [isEmpty](#isempty)
  - [isFull](#isfull)
  - [isShutdown](#isshutdown)
  - [isShutdownUnsafe](#isshutdownunsafe)
- [publishing](#publishing)
  - [publish](#publish)
  - [publishAll](#publishall)
  - [publishUnsafe](#publishunsafe)
- [subscriptions](#subscriptions)
  - [subscribe](#subscribe)
  - [take](#take)
  - [takeAll](#takeall)
  - [takeBetween](#takebetween)
  - [takeUpTo](#takeupto)
- [utils](#utils)
  - [PubSub (namespace)](#pubsub-namespace)
    - [Atomic (interface)](#atomic-interface)
    - [BackingSubscription (interface)](#backingsubscription-interface)
    - [ReplayWindow (interface)](#replaywindow-interface)
    - [Strategy (interface)](#strategy-interface)
    - [Subscribers (type alias)](#subscribers-type-alias)

---

# constructors

## bounded

Creates a bounded `PubSub` that applies backpressure when it reaches
capacity.

**Details**

Published messages are retained until all current subscribers have taken
them. When the capacity is full, publishers suspend until space is available.
Pass an options object to configure both `capacity` and an optional replay
buffer for late subscribers.

**Example** (Creating a bounded PubSub)

```ts
import { Effect, PubSub } from "effect"

const program = Effect.gen(function* () {
  // Create bounded PubSub with capacity 100
  const pubsub = yield* PubSub.bounded<string>(100)

  // Create with replay buffer for late subscribers
  const pubsubWithReplay = yield* PubSub.bounded<string>({
    capacity: 100,
    replay: 10 // Last 10 messages replayed to new subscribers
  })
})
```

**Signature**

```ts
declare const bounded: <A>(
  capacity: number | { readonly capacity: number; readonly replay?: number | undefined }
) => Effect.Effect<PubSub<A>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PubSub.ts#L322)

Since v2.0.0

## dropping

Creates a bounded `PubSub` with the dropping strategy. The `PubSub` will drop new
messages if the `PubSub` is at capacity.

**Details**

For best performance use capacities that are powers of two.

**Example** (Dropping messages when full)

```ts
import { Effect, PubSub } from "effect"

const program = Effect.gen(function* () {
  // Create dropping PubSub that drops new messages when full
  const pubsub = yield* PubSub.dropping<string>(3)

  // With replay buffer for late subscribers
  const pubsubWithReplay = yield* PubSub.dropping<string>({
    capacity: 3,
    replay: 5
  })

  yield* Effect.scoped(
    Effect.gen(function* () {
      const subscription = yield* PubSub.subscribe(pubsub)

      // Fill the PubSub and see dropping behavior
      yield* PubSub.publish(pubsub, "msg1") // succeeds
      yield* PubSub.publish(pubsub, "msg2") // succeeds
      yield* PubSub.publish(pubsub, "msg3") // succeeds
      const dropped = yield* PubSub.publish(pubsub, "msg4") // returns false (dropped)
      console.log("Message dropped:", !dropped) // true

      const messages = yield* PubSub.takeAll(subscription)
      console.log(messages) // ["msg1", "msg2", "msg3"]
    })
  )
})
```

**Signature**

```ts
declare const dropping: <A>(
  capacity: number | { readonly capacity: number; readonly replay?: number | undefined }
) => Effect.Effect<PubSub<A>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PubSub.ts#L375)

Since v2.0.0

## make

Creates a PubSub with a custom atomic implementation and strategy.

**Example** (Creating a PubSub with a custom strategy)

```ts
import { Effect, PubSub } from "effect"

const program = Effect.gen(function* () {
  // Create custom PubSub with specific atomic implementation and strategy
  const pubsub = yield* PubSub.make<string>({
    atomicPubSub: () => PubSub.makeAtomicBounded(100),
    strategy: () => new PubSub.BackPressureStrategy()
  })

  // Use the created PubSub
  yield* PubSub.publish(pubsub, "Hello")
})
```

**Signature**

```ts
declare const make: <A>(options: {
  readonly atomicPubSub: LazyArg<PubSub.Atomic<A>>
  readonly strategy: LazyArg<PubSub.Strategy<A>>
}) => Effect.Effect<PubSub<A>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PubSub.ts#L274)

Since v4.0.0

## makeAtomicBounded

Creates a bounded atomic PubSub implementation with optional replay buffer.

**When to use**

Use to provide bounded message storage when building a custom `PubSub` with
`make` and an explicit delivery strategy.

**Details**

Pass either a capacity number or an options object with `capacity` and
optional `replay`. A positive `replay` value enables a replay buffer for late
subscribers, and fractional replay sizes are rounded up.

**Gotchas**

The capacity must be greater than zero; invalid capacities throw
synchronously before an atomic implementation is created.

**See**

- `make` for constructing a `PubSub` from an atomic implementation and delivery strategy
- `makeAtomicUnbounded` for an atomic implementation without a bounded capacity
- `bounded` for the higher-level backpressure constructor
- `dropping` for the higher-level dropping constructor
- `sliding` for the higher-level sliding constructor

**Signature**

```ts
declare const makeAtomicBounded: <A>(
  capacity: number | { readonly capacity: number; readonly replay?: number | undefined }
) => PubSub.Atomic<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PubSub.ts#L508)

Since v4.0.0

## makeAtomicUnbounded

Creates an unbounded atomic PubSub implementation with optional replay buffer.

**When to use**

Use to create the low-level storage layer for a custom `PubSub` whose active
subscribers may retain an unbounded number of pending messages.

**Gotchas**

Messages published while subscribers are active can be retained without a
capacity limit until those subscribers take them or unsubscribe.

**See**

- `makeAtomicBounded` for a bounded atomic implementation that enforces capacity
- `make` for wrapping an atomic implementation with a delivery strategy
- `unbounded` for the high-level effectful constructor for unbounded `PubSub` values

**Signature**

```ts
declare const makeAtomicUnbounded: <A>(options?: { readonly replay?: number | undefined }) => PubSub.Atomic<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PubSub.ts#L546)

Since v4.0.0

## sliding

Creates a bounded `PubSub` with the sliding strategy. The `PubSub` will add new
messages and drop old messages if the `PubSub` is at capacity.

**Details**

For best performance use capacities that are powers of two.

**Example** (Sliding old messages when full)

```ts
import { Effect, PubSub } from "effect"

const program = Effect.gen(function* () {
  // Create sliding PubSub that evicts old messages when full
  const pubsub = yield* PubSub.sliding<string>(3)

  // With replay buffer
  const pubsubWithReplay = yield* PubSub.sliding<string>({
    capacity: 3,
    replay: 2
  })

  yield* Effect.scoped(
    Effect.gen(function* () {
      const subscription = yield* PubSub.subscribe(pubsub)

      // Fill and overflow the PubSub
      yield* PubSub.publish(pubsub, "msg1")
      yield* PubSub.publish(pubsub, "msg2")
      yield* PubSub.publish(pubsub, "msg3")
      yield* PubSub.publish(pubsub, "msg4") // "msg1" is evicted

      const messages = yield* PubSub.takeAll(subscription)
      console.log(messages) // ["msg2", "msg3", "msg4"]
    })
  )
})
```

**Signature**

```ts
declare const sliding: <A>(
  capacity: number | { readonly capacity: number; readonly replay?: number | undefined }
) => Effect.Effect<PubSub<A>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PubSub.ts#L427)

Since v2.0.0

## unbounded

Creates an unbounded `PubSub`.

**Example** (Creating an unbounded PubSub)

```ts
import { Effect, PubSub } from "effect"

const program = Effect.gen(function* () {
  // Create unbounded PubSub
  const pubsub = yield* PubSub.unbounded<string>()

  // With replay buffer for late subscribers
  const pubsubWithReplay = yield* PubSub.unbounded<string>({
    replay: 10
  })

  yield* Effect.scoped(
    Effect.gen(function* () {
      const subscription = yield* PubSub.subscribe(pubsub)

      // Can publish unlimited messages
      for (let i = 0; i < 3; i++) {
        yield* PubSub.publish(pubsub, `message-${i}`)
      }

      const message = yield* PubSub.take(subscription)
      console.log("First message:", message) // "message-0"
    })
  )
})
```

**Signature**

```ts
declare const unbounded: <A>(options?: { readonly replay?: number | undefined }) => Effect.Effect<PubSub<A>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PubSub.ts#L472)

Since v2.0.0

# getters

## capacity

Returns the number of elements the queue can hold.

**Example** (Getting PubSub capacity)

```ts
import { Effect, PubSub } from "effect"

const program = Effect.gen(function* () {
  const pubsub = yield* PubSub.bounded<string>(100)
  const cap = PubSub.capacity(pubsub)
  console.log("PubSub capacity:", cap) // 100

  const unboundedPubsub = yield* PubSub.unbounded<string>()
  const unboundedCap = PubSub.capacity(unboundedPubsub)
  console.log("Unbounded capacity:", unboundedCap) // Number.MAX_SAFE_INTEGER
})
```

**Signature**

```ts
declare const capacity: <A>(self: PubSub<A>) => number
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PubSub.ts#L572)

Since v2.0.0

## remaining

Returns the number of messages currently available in the subscription as an
`Effect`.

**When to use**

Use when checking a subscription from effectful code and shutdown should
interrupt the effect.

**Details**

The count includes replay-buffered messages. If the subscription has been
shut down, the effect interrupts.

**Example** (Checking remaining messages)

```ts
import { Effect, PubSub } from "effect"

const program = Effect.gen(function* () {
  const pubsub = yield* PubSub.bounded<string>(10)

  yield* Effect.scoped(
    Effect.gen(function* () {
      const subscription = yield* PubSub.subscribe(pubsub)

      // Publish some messages
      yield* PubSub.publishAll(pubsub, ["msg1", "msg2", "msg3"])

      // Check how many messages are available
      const count = yield* PubSub.remaining(subscription)
      console.log("Messages available:", count) // 3

      // Take one message
      yield* PubSub.take(subscription)

      const remaining = yield* PubSub.remaining(subscription)
      console.log("Messages remaining:", remaining) // 2
    })
  )
})
```

**See**

- `remainingUnsafe` for a synchronous check that reports shutdown as `Option.none()`

**Signature**

```ts
declare const remaining: <A>(self: Subscription<A>) => Effect.Effect<number>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PubSub.ts#L1428)

Since v4.0.0

## remainingUnsafe

Synchronously returns the number of messages currently available in the
subscription, or `Option.none()` when it is shut down.

**When to use**

Use when you need synchronous polling outside a managed workflow and want
shutdown observed as data instead of interruption.

**Example** (Checking remaining messages synchronously)

```ts
import { PubSub } from "effect"

declare const subscription: PubSub.Subscription<string>

// Unsafe synchronous check for remaining messages
const remainingOption = PubSub.remainingUnsafe(subscription)
if (remainingOption._tag === "Some") {
  console.log("Messages available:", remainingOption.value)
} else {
  console.log("Subscription is shutdown")
}

// Useful for polling or batching scenarios
if (remainingOption._tag === "Some" && remainingOption.value > 10) {
  // Process messages in batch
}
```

**See**

- `remaining` for the effectful variant that interrupts on shutdown

**Signature**

```ts
declare const remainingUnsafe: <A>(self: Subscription<A>) => Option.Option<number>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PubSub.ts#L1470)

Since v4.0.0

## size

Returns the current number of messages retained by the `PubSub` for active
subscribers.

**Details**

If the `PubSub` has been shut down, the returned effect succeeds with `0`.
The size is not a count of waiting subscribers or suspended publishers.

**Example** (Getting PubSub size)

```ts
import { Effect, PubSub } from "effect"

const program = Effect.gen(function* () {
  const pubsub = yield* PubSub.bounded<string>(10)

  // Initially empty
  const initialSize = yield* PubSub.size(pubsub)
  console.log("Initial size:", initialSize) // 0

  yield* Effect.scoped(
    Effect.gen(function* () {
      const subscription = yield* PubSub.subscribe(pubsub)

      // Publish some messages for the active subscription
      yield* PubSub.publish(pubsub, "msg1")
      yield* PubSub.publish(pubsub, "msg2")

      const afterPublish = yield* PubSub.size(pubsub)
      console.log("After publishing:", afterPublish) // 2

      yield* PubSub.takeAll(subscription)
    })
  )
})
```

**Signature**

```ts
declare const size: <A>(self: PubSub<A>) => Effect.Effect<number>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PubSub.ts#L613)

Since v2.0.0

## sizeUnsafe

Returns the current number of messages retained by the `PubSub` for active
subscribers synchronously.

**When to use**

Use when an immediate `PubSub` size snapshot is needed outside effectful code
and concurrent changes between the check and later use are acceptable.

**Details**

Returns `0` after shutdown. Because this is an unsafe synchronous snapshot,
prefer `size` in effectful code.

**Example** (Reading size synchronously)

```ts
import { PubSub } from "effect"

// Unsafe synchronous size check
declare const pubsub: PubSub.PubSub<string>

const size = PubSub.sizeUnsafe(pubsub)
console.log("Current size:", size)
```

**Signature**

```ts
declare const sizeUnsafe: <A>(self: PubSub<A>) => number
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PubSub.ts#L643)

Since v4.0.0

# lifecycle

## awaitShutdown

Waits until the queue is shutdown. The `Effect` returned by this method will
not resume until the queue has been shutdown. If the queue is already
shutdown, the `Effect` will resume right away.

**Example** (Waiting for shutdown)

```ts
import { Effect, Fiber, PubSub } from "effect"

const program = Effect.gen(function* () {
  const pubsub = yield* PubSub.bounded<string>(10)

  // Start a fiber that waits for shutdown
  const waiterFiber = yield* Effect.forkChild(
    Effect.gen(function* () {
      yield* PubSub.awaitShutdown(pubsub)
      console.log("PubSub has been shutdown!")
    })
  )

  // Do some work...
  yield* Effect.sleep("100 millis")

  // Shutdown the PubSub
  yield* PubSub.shutdown(pubsub)

  // The waiter will now complete
  yield* Fiber.join(waiterFiber)
})
```

**Signature**

```ts
declare const awaitShutdown: <A>(self: PubSub<A>) => Effect.Effect<void>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PubSub.ts#L861)

Since v2.0.0

## shutdown

Shuts down the `PubSub`, interrupting suspended publishers and subscribers
and finalizing active subscriptions.

**Details**

After shutdown, `publish` and `publishAll` succeed with `false`,
`publishUnsafe` returns `false`, and subscription operations such as `take`
interrupt.

**Example** (Shutting down a PubSub)

```ts
import { Effect, PubSub } from "effect"

const program = Effect.gen(function* () {
  const pubsub = yield* PubSub.bounded<string>(1)

  // Shutdown the PubSub
  yield* PubSub.shutdown(pubsub)

  const isShutdown = yield* PubSub.isShutdown(pubsub)
  console.log("Is shutdown:", isShutdown) // true

  // Publishing after shutdown returns false
  const published = yield* PubSub.publish(pubsub, "msg1")
  console.log("Published after shutdown:", published) // false
})
```

**Signature**

```ts
declare const shutdown: <A>(self: PubSub<A>) => Effect.Effect<void>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PubSub.ts#L757)

Since v2.0.0

# models

## BackPressureStrategy (class)

Represents the back-pressure strategy for bounded `PubSub` values.

**When to use**

Use to preserve every message for current subscribers when a bounded custom
`PubSub` should make publishers wait for capacity instead of dropping or
evicting messages.

**Details**

Publishers wait when the `PubSub` is at capacity, so all current subscribers
can receive every published message.

**Gotchas**

A slow subscriber can slow down publishers and other subscribers.

**See**

- `bounded` for creating bounded PubSubs with back pressure by default
- `DroppingStrategy` for dropping new messages when capacity is full
- `SlidingStrategy` for evicting old messages when capacity is full

**Signature**

```ts
declare class BackPressureStrategy<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PubSub.ts#L2373)

Since v4.0.0

### handleSurplus (method)

**Signature**

```ts
declare const handleSurplus: (
  pubsub: PubSub.Atomic<A>,
  subscribers: PubSub.Subscribers<A>,
  elements: Iterable<A>,
  isShutdown: MutableRef.MutableRef<boolean>
) => Effect.Effect<boolean>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PubSub.ts#L2388)

### onPubSubEmptySpaceUnsafe (method)

**Signature**

```ts
declare const onPubSubEmptySpaceUnsafe: (pubsub: PubSub.Atomic<A>, subscribers: PubSub.Subscribers<A>) => void
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PubSub.ts#L2408)

### completePollersUnsafe (method)

**Signature**

```ts
declare const completePollersUnsafe: (
  pubsub: PubSub.Atomic<A>,
  subscribers: PubSub.Subscribers<A>,
  subscription: PubSub.BackingSubscription<A>,
  pollers: MutableList.MutableList<Deferred.Deferred<A>>
) => void
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PubSub.ts#L2430)

### completeSubscribersUnsafe (method)

**Signature**

```ts
declare const completeSubscribersUnsafe: (pubsub: PubSub.Atomic<A>, subscribers: PubSub.Subscribers<A>) => void
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PubSub.ts#L2439)

### offerUnsafe (method)

**Signature**

```ts
declare const offerUnsafe: (elements: Iterable<A>, deferred: Deferred.Deferred<boolean>) => void
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PubSub.ts#L2443)

### removeUnsafe (method)

**Signature**

```ts
declare const removeUnsafe: (deferred: Deferred.Deferred<boolean>) => void
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PubSub.ts#L2460)

### publishers (property)

**Signature**

```ts
publishers: MutableList.MutableList<readonly [A, Deferred.Deferred<boolean, never>, boolean]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PubSub.ts#L2374)

## DroppingStrategy (class)

Represents the dropping strategy for bounded `PubSub` values.

**When to use**

Use to keep publishers fast by dropping new messages when the `PubSub` is at
capacity.

**Details**

A publish that arrives while the `PubSub` is full is dropped instead of
waiting for capacity.

**Gotchas**

Subscribers may miss messages published while they are subscribed.

**Example** (Applying a dropping strategy)

```ts
import { Effect, PubSub } from "effect"

const program = Effect.gen(function* () {
  // Create PubSub with dropping strategy
  const pubsub = yield* PubSub.dropping<string>(2)

  // Or explicitly create with dropping strategy
  const customPubsub = yield* PubSub.make<string>({
    atomicPubSub: () => PubSub.makeAtomicBounded(2),
    strategy: () => new PubSub.DroppingStrategy()
  })

  yield* Effect.scoped(
    Effect.gen(function* () {
      const subscription = yield* PubSub.subscribe(pubsub)

      // Fill the PubSub
      const pub1 = yield* PubSub.publish(pubsub, "msg1") // true
      const pub2 = yield* PubSub.publish(pubsub, "msg2") // true
      const pub3 = yield* PubSub.publish(pubsub, "msg3") // false (dropped)

      console.log("Publication results:", [pub1, pub2, pub3]) // [true, true, false]

      // Subscribers will only see the first two messages
      const messages = yield* PubSub.takeAll(subscription)
      console.log("Received messages:", messages) // ["msg1", "msg2"]
    })
  )
})
```

**Signature**

```ts
declare class DroppingStrategy<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PubSub.ts#L2517)

Since v4.0.0

### handleSurplus (method)

**Signature**

```ts
declare const handleSurplus: (
  _pubsub: PubSub.Atomic<A>,
  _subscribers: PubSub.Subscribers<A>,
  _elements: Iterable<A>,
  _isShutdown: MutableRef.MutableRef<boolean>
) => Effect.Effect<boolean>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PubSub.ts#L2522)

### onPubSubEmptySpaceUnsafe (method)

**Signature**

```ts
declare const onPubSubEmptySpaceUnsafe: (_pubsub: PubSub.Atomic<A>, _subscribers: PubSub.Subscribers<A>) => void
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PubSub.ts#L2531)

### completePollersUnsafe (method)

**Signature**

```ts
declare const completePollersUnsafe: (
  pubsub: PubSub.Atomic<A>,
  subscribers: PubSub.Subscribers<A>,
  subscription: PubSub.BackingSubscription<A>,
  pollers: MutableList.MutableList<Deferred.Deferred<A>>
) => void
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PubSub.ts#L2538)

### completeSubscribersUnsafe (method)

**Signature**

```ts
declare const completeSubscribersUnsafe: (pubsub: PubSub.Atomic<A>, subscribers: PubSub.Subscribers<A>) => void
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PubSub.ts#L2547)

## PubSub (interface)

A `PubSub<A>` is an asynchronous message hub into which publishers can publish
messages of type `A` and subscribers can subscribe to take messages of type
`A`.

**Example** (Publishing and subscribing to messages)

```ts
import { Effect, PubSub } from "effect"

const program = Effect.gen(function* () {
  // Create a bounded PubSub with capacity 10
  const pubsub = yield* PubSub.bounded<string>(10)

  // Subscribe and consume messages
  yield* Effect.scoped(
    Effect.gen(function* () {
      const subscription = yield* PubSub.subscribe(pubsub)

      // Publish messages
      yield* PubSub.publish(pubsub, "Hello")
      yield* PubSub.publish(pubsub, "World")

      const message1 = yield* PubSub.take(subscription)
      const message2 = yield* PubSub.take(subscription)
      console.log(message1, message2) // "Hello", "World"
    })
  )
})
```

**Signature**

```ts
export interface PubSub<in out A> extends Pipeable {
  readonly [TypeId]: {
    readonly _A: Invariant<A>
  }
  readonly pubsub: PubSub.Atomic<A>
  readonly subscribers: PubSub.Subscribers<A>
  readonly scope: Scope.Closeable
  readonly shutdownHook: Latch.Latch
  readonly shutdownFlag: MutableRef.MutableRef<boolean>
  readonly strategy: PubSub.Strategy<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PubSub.ts#L63)

Since v2.0.0

## SlidingStrategy (class)

Represents the sliding strategy for bounded `PubSub` values.

**When to use**

Use to keep the most recent messages when the `PubSub` is at capacity.

**Details**

New messages are accepted by evicting older messages from the bounded
`PubSub`.

**Gotchas**

Slow subscribers may miss older messages that are evicted before they are
consumed.

**Example** (Applying a sliding strategy)

```ts
import { Effect, PubSub } from "effect"

const program = Effect.gen(function* () {
  // Create PubSub with sliding strategy
  const pubsub = yield* PubSub.sliding<string>(2)

  // Or explicitly create with sliding strategy
  const customPubsub = yield* PubSub.make<string>({
    atomicPubSub: () => PubSub.makeAtomicBounded(2),
    strategy: () => new PubSub.SlidingStrategy()
  })

  yield* Effect.scoped(
    Effect.gen(function* () {
      const subscription = yield* PubSub.subscribe(pubsub)

      // Publish messages that exceed capacity
      yield* PubSub.publish(pubsub, "msg1") // stored
      yield* PubSub.publish(pubsub, "msg2") // stored
      yield* PubSub.publish(pubsub, "msg3") // "msg1" evicted, "msg3" stored
      yield* PubSub.publish(pubsub, "msg4") // "msg2" evicted, "msg4" stored

      // Subscribers will see the most recent messages
      const messages = yield* PubSub.takeAll(subscription)
      console.log("Recent messages:", messages) // ["msg3", "msg4"]
    })
  )
})
```

**Signature**

```ts
declare class SlidingStrategy<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PubSub.ts#L2603)

Since v4.0.0

### handleSurplus (method)

**Signature**

```ts
declare const handleSurplus: (
  pubsub: PubSub.Atomic<A>,
  subscribers: PubSub.Subscribers<A>,
  elements: Iterable<A>,
  _isShutdown: MutableRef.MutableRef<boolean>
) => Effect.Effect<boolean>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PubSub.ts#L2608)

### onPubSubEmptySpaceUnsafe (method)

**Signature**

```ts
declare const onPubSubEmptySpaceUnsafe: (_pubsub: PubSub.Atomic<A>, _subscribers: PubSub.Subscribers<A>) => void
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PubSub.ts#L2621)

### completePollersUnsafe (method)

**Signature**

```ts
declare const completePollersUnsafe: (
  pubsub: PubSub.Atomic<A>,
  subscribers: PubSub.Subscribers<A>,
  subscription: PubSub.BackingSubscription<A>,
  pollers: MutableList.MutableList<Deferred.Deferred<A>>
) => void
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PubSub.ts#L2628)

### completeSubscribersUnsafe (method)

**Signature**

```ts
declare const completeSubscribersUnsafe: (pubsub: PubSub.Atomic<A>, subscribers: PubSub.Subscribers<A>) => void
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PubSub.ts#L2637)

### slidingPublishUnsafe (method)

**Signature**

```ts
declare const slidingPublishUnsafe: (pubsub: PubSub.Atomic<A>, elements: Iterable<A>) => void
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PubSub.ts#L2641)

## Subscription (interface)

A subscription represents a consumer's connection to a PubSub, allowing them to take messages.

**Example** (Taking messages from a subscription)

```ts
import { Effect, PubSub } from "effect"

const program = Effect.gen(function* () {
  const pubsub = yield* PubSub.bounded<string>(10)

  // Subscribe within a scope for automatic cleanup
  yield* Effect.scoped(
    Effect.gen(function* () {
      const subscription: PubSub.Subscription<string> = yield* PubSub.subscribe(pubsub)

      yield* PubSub.publishAll(pubsub, ["msg1", "msg2", "msg3"])

      // Take individual messages
      const message = yield* PubSub.take(subscription)
      console.log(message) // "msg1"

      // Take multiple messages
      const messages = yield* PubSub.takeUpTo(subscription, 1)
      console.log(messages) // ["msg2"]
      const allMessages = yield* PubSub.takeAll(subscription)
      console.log(allMessages) // ["msg3"]
    })
  )
})
```

**Signature**

```ts
export interface Subscription<out A> extends Pipeable {
  readonly [SubscriptionTypeId]: {
    readonly _A: Covariant<A>
  }
  readonly pubsub: PubSub.Atomic<any>
  readonly subscribers: PubSub.Subscribers<any>
  readonly subscription: PubSub.BackingSubscription<A>
  readonly pollers: MutableList.MutableList<Deferred.Deferred<any>>
  readonly shutdownHook: Latch.Latch
  readonly shutdownFlag: MutableRef.MutableRef<boolean>
  readonly strategy: PubSub.Strategy<any>
  readonly replayWindow: PubSub.ReplayWindow<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PubSub.ts#L237)

Since v4.0.0

# predicates

## isEmpty

Returns `true` if the `Pubsub` contains zero elements, `false` otherwise.

**Example** (Checking whether a PubSub is empty)

```ts
import { Effect, PubSub } from "effect"

const program = Effect.gen(function* () {
  const pubsub = yield* PubSub.bounded<string>(10)

  // Initially empty
  const initiallyEmpty = yield* PubSub.isEmpty(pubsub)
  console.log("Initially empty:", initiallyEmpty) // true

  yield* Effect.scoped(
    Effect.gen(function* () {
      const subscription = yield* PubSub.subscribe(pubsub)

      // Publish a message for the active subscription
      yield* PubSub.publish(pubsub, "Hello")

      const nowEmpty = yield* PubSub.isEmpty(pubsub)
      console.log("Now empty:", nowEmpty) // false

      yield* PubSub.take(subscription)
    })
  )
})
```

**Signature**

```ts
declare const isEmpty: <A>(self: PubSub<A>) => Effect.Effect<boolean>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PubSub.ts#L722)

Since v2.0.0

## isFull

Returns `true` when the `PubSub` has reached its configured capacity.

**Details**

For unbounded PubSubs this is normally `false`.

**Example** (Checking whether a PubSub is full)

```ts
import { Effect, PubSub } from "effect"

const program = Effect.gen(function* () {
  const pubsub = yield* PubSub.bounded<string>(2)

  // Initially not full
  const initiallyFull = yield* PubSub.isFull(pubsub)
  console.log("Initially full:", initiallyFull) // false

  yield* Effect.scoped(
    Effect.gen(function* () {
      const subscription = yield* PubSub.subscribe(pubsub)

      // Fill the PubSub for the active subscription
      yield* PubSub.publish(pubsub, "msg1")
      yield* PubSub.publish(pubsub, "msg2")

      const nowFull = yield* PubSub.isFull(pubsub)
      console.log("Now full:", nowFull) // true

      yield* PubSub.takeAll(subscription)
    })
  )
})
```

**Signature**

```ts
declare const isFull: <A>(self: PubSub<A>) => Effect.Effect<boolean>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PubSub.ts#L687)

Since v2.0.0

## isShutdown

Checks effectfully whether `shutdown` has been called, returning `true`
after shutdown and `false` otherwise.

**Example** (Checking whether a PubSub is shut down)

```ts
import { Effect, PubSub } from "effect"

const program = Effect.gen(function* () {
  const pubsub = yield* PubSub.bounded<string>(10)

  // Initially not shutdown
  const initiallyShutdown = yield* PubSub.isShutdown(pubsub)
  console.log("Initially shutdown:", initiallyShutdown) // false

  // Shutdown the PubSub
  yield* PubSub.shutdown(pubsub)

  const nowShutdown = yield* PubSub.isShutdown(pubsub)
  console.log("Now shutdown:", nowShutdown) // true
})
```

**Signature**

```ts
declare const isShutdown: <A>(self: PubSub<A>) => Effect.Effect<boolean>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PubSub.ts#L794)

Since v2.0.0

## isShutdownUnsafe

Checks synchronously whether `shutdown` has been called, returning `true`
after shutdown and `false` otherwise.

**When to use**

Use when an immediate `PubSub` shutdown-state snapshot is needed outside
effectful code and racing shutdown changes are acceptable.

**Example** (Checking shutdown synchronously)

```ts
import { PubSub } from "effect"

declare const pubsub: PubSub.PubSub<string>

// Unsafe synchronous shutdown check
const isDown = PubSub.isShutdownUnsafe(pubsub)
if (isDown) {
  console.log("PubSub is shutdown, cannot publish")
} else {
  console.log("PubSub is active")
}
```

**Signature**

```ts
declare const isShutdownUnsafe: <A>(self: PubSub<A>) => boolean
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PubSub.ts#L824)

Since v4.0.0

# publishing

## publish

Publishes a message to the `PubSub` as an `Effect`, returning whether the
message was accepted.

**When to use**

Use when you need to publish from effectful code and let the configured
PubSub strategy handle surplus messages.

**Details**

The effect succeeds with `false` if the `PubSub` is shut down. If the message
cannot be accepted immediately, the configured strategy decides how surplus
messages are handled.

**Example** (Publishing a message)

```ts
import { Effect, PubSub } from "effect"

const program = Effect.gen(function* () {
  const pubsub = yield* PubSub.bounded<string>(10)

  // Publish a message
  const published = yield* PubSub.publish(pubsub, "Hello World")
  console.log("Message published:", published) // true

  yield* Effect.scoped(
    Effect.gen(function* () {
      const subscription = yield* PubSub.subscribe(pubsub)

      yield* PubSub.publish(pubsub, "Hello")
      const message = yield* PubSub.take(subscription)
      console.log("Received:", message) // "Hello"
    })
  )
})
```

**See**

- `publishUnsafe` for a synchronous non-blocking attempt that does not run effectful surplus handling

**Signature**

```ts
declare const publish: {
  <A>(value: A): (self: PubSub<A>) => Effect.Effect<boolean>
  <A>(self: PubSub<A>, value: A): Effect.Effect<boolean>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PubSub.ts#L905)

Since v2.0.0

## publishAll

Publishes all of the specified messages to the `PubSub`, returning whether they
were published to the `PubSub`.

**Example** (Publishing multiple messages)

```ts
import { Effect, Fiber, PubSub } from "effect"

const program = Effect.gen(function* () {
  const pubsub = yield* PubSub.bounded<string>(10)

  // Publish multiple messages at once
  const messages = ["Hello", "World", "from", "Effect"]
  const allPublished = yield* PubSub.publishAll(pubsub, messages)
  console.log("All messages published:", allPublished) // true

  // With a smaller capacity and an active subscription
  const smallPubsub = yield* PubSub.bounded<string>(2)
  const manyMessages = ["msg1", "msg2", "msg3", "msg4"]

  yield* Effect.scoped(
    Effect.gen(function* () {
      const subscription = yield* PubSub.subscribe(smallPubsub)

      // Will suspend until space becomes available for all messages
      const fiber = yield* Effect.forkChild(PubSub.publishAll(smallPubsub, manyMessages))

      const firstBatch = yield* PubSub.takeBetween(subscription, 2, 2)
      console.log("First batch:", firstBatch) // ["msg1", "msg2"]

      const result = yield* Fiber.join(fiber)
      console.log("All messages eventually published:", result) // true

      const secondBatch = yield* PubSub.takeAll(subscription)
      console.log("Second batch:", secondBatch) // ["msg3", "msg4"]
    })
  )
})
```

**Signature**

```ts
declare const publishAll: {
  <A>(elements: Iterable<A>): (self: PubSub<A>) => Effect.Effect<boolean>
  <A>(self: PubSub<A>, elements: Iterable<A>): Effect.Effect<boolean>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PubSub.ts#L1023)

Since v2.0.0

## publishUnsafe

Attempts to publish a message synchronously without applying the PubSub
strategy's effectful surplus handling.

**When to use**

Use when you need a non-blocking synchronous publish attempt where `false`
is an acceptable result when the message cannot be accepted immediately.

**Details**

Returns `false` if the `PubSub` is shut down or the message cannot be
accepted immediately, for example when a bounded PubSub is full. Prefer
`publish` when backpressure or sliding behavior should be honored.

**Example** (Publishing without suspending)

```ts
import { PubSub } from "effect"

declare const pubsub: PubSub.PubSub<string>

// Unsafe synchronous publish (non-blocking)
const published = PubSub.publishUnsafe(pubsub, "Hello")
if (published) {
  console.log("Message published successfully")
} else {
  console.log("Message dropped (PubSub full or shutdown)")
}

// Useful for scenarios where you don't want to suspend
const messages = ["msg1", "msg2", "msg3"]
const publishedCount = messages.filter((msg) => PubSub.publishUnsafe(pubsub, msg)).length
console.log(`Published ${publishedCount} out of ${messages.length} messages`)
```

**See**

- `publish` for effectful publishing that honors the configured surplus strategy

**Signature**

```ts
declare const publishUnsafe: { <A>(value: A): (self: PubSub<A>) => boolean; <A>(self: PubSub<A>, value: A): boolean }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PubSub.ts#L969)

Since v4.0.0

# subscriptions

## subscribe

Subscribes to receive messages from the `PubSub`. The resulting subscription can
be evaluated multiple times within the scope to take a message from the `PubSub`
each time.

**Example** (Subscribing to messages)

```ts
import { Effect, PubSub } from "effect"

const program = Effect.gen(function* () {
  const pubsub = yield* PubSub.bounded<string>(10)

  // Subscribe within a scope for automatic cleanup
  yield* Effect.scoped(
    Effect.gen(function* () {
      const subscription = yield* PubSub.subscribe(pubsub)

      // Publish some messages
      yield* PubSub.publish(pubsub, "Hello")
      yield* PubSub.publish(pubsub, "World")

      // Take messages one by one
      const msg1 = yield* PubSub.take(subscription)
      const msg2 = yield* PubSub.take(subscription)
      console.log(msg1, msg2) // "Hello", "World"

      // Subscription is automatically cleaned up when scope exits
    })
  )

  yield* Effect.scoped(
    Effect.gen(function* () {
      const sub1 = yield* PubSub.subscribe(pubsub)
      const sub2 = yield* PubSub.subscribe(pubsub)

      // Multiple subscribers can receive the same messages
      yield* PubSub.publish(pubsub, "Broadcast")

      const [msg1, msg2] = yield* Effect.all([PubSub.take(sub1), PubSub.take(sub2)])
      console.log("Both received:", msg1, msg2) // "Broadcast", "Broadcast"
    })
  )
})
```

**Signature**

```ts
declare const subscribe: <A>(self: PubSub<A>) => Effect.Effect<Subscription<A>, never, Scope.Scope>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PubSub.ts#L1092)

Since v2.0.0

## take

Takes a single message from the subscription. If no messages are available,
this will suspend until a message becomes available.

**Example** (Taking a message)

```ts
import { Effect, Fiber, PubSub } from "effect"

const program = Effect.gen(function* () {
  const pubsub = yield* PubSub.bounded<string>(10)

  yield* Effect.scoped(
    Effect.gen(function* () {
      const subscription = yield* PubSub.subscribe(pubsub)

      // Start a fiber to take a message (will suspend)
      const takeFiber = yield* Effect.forkChild(PubSub.take(subscription))

      // Publish a message
      yield* PubSub.publish(pubsub, "Hello")

      // The take will now complete
      const message = yield* Fiber.join(takeFiber)
      console.log("Received:", message) // "Hello"
    })
  )
})
```

**Signature**

```ts
declare const take: <A>(self: Subscription<A>) => Effect.Effect<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PubSub.ts#L1160)

Since v4.0.0

## takeAll

Takes all available messages from the subscription, suspending if no items
are available.

**Example** (Taking all available messages)

```ts
import { Effect, PubSub } from "effect"

const program = Effect.gen(function* () {
  const pubsub = yield* PubSub.bounded<string>(10)

  yield* Effect.scoped(
    Effect.gen(function* () {
      const subscription = yield* PubSub.subscribe(pubsub)

      // Publish multiple messages
      yield* PubSub.publishAll(pubsub, ["msg1", "msg2", "msg3"])

      // Take all available messages at once
      const allMessages = yield* PubSub.takeAll(subscription)
      console.log("All messages:", allMessages) // ["msg1", "msg2", "msg3"]
    })
  )
})
```

**Signature**

```ts
declare const takeAll: <A>(self: Subscription<A>) => Effect.Effect<Arr.NonEmptyArray<A>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PubSub.ts#L1208)

Since v4.0.0

## takeBetween

Takes between the specified minimum and maximum number of messages from the subscription.
Will suspend if the minimum number is not immediately available.

**Example** (Taking between a minimum and maximum)

```ts
import { Effect, Fiber, PubSub } from "effect"

const program = Effect.gen(function* () {
  const pubsub = yield* PubSub.bounded<string>(10)

  yield* Effect.scoped(
    Effect.gen(function* () {
      const subscription = yield* PubSub.subscribe(pubsub)

      // Start taking between 2 and 5 messages (will suspend)
      const takeFiber = yield* Effect.forkChild(PubSub.takeBetween(subscription, 2, 5))

      // Publish 3 messages
      yield* PubSub.publishAll(pubsub, ["msg1", "msg2", "msg3"])

      // Now the take will complete with 3 messages
      const messages = yield* Fiber.join(takeFiber)
      console.log("Between 2-5:", messages) // ["msg1", "msg2", "msg3"]
    })
  )
})
```

**Signature**

```ts
declare const takeBetween: {
  (min: number, max: number): <A>(self: Subscription<A>) => Effect.Effect<Array<A>>
  <A>(self: Subscription<A>, min: number, max: number): Effect.Effect<Array<A>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PubSub.ts#L1340)

Since v4.0.0

## takeUpTo

Takes up to the specified number of messages from the subscription without suspending.

**Example** (Taking up to a maximum number of messages)

```ts
import { Effect, PubSub } from "effect"

const program = Effect.gen(function* () {
  const pubsub = yield* PubSub.bounded<string>(10)

  yield* Effect.scoped(
    Effect.gen(function* () {
      const subscription = yield* PubSub.subscribe(pubsub)

      // Publish multiple messages
      yield* PubSub.publishAll(pubsub, ["msg1", "msg2", "msg3", "msg4", "msg5"])

      // Take up to 3 messages
      const upTo3 = yield* PubSub.takeUpTo(subscription, 3)
      console.log("Up to 3:", upTo3) // ["msg1", "msg2", "msg3"]

      // Take up to 5 more (only 2 remaining)
      const upTo5 = yield* PubSub.takeUpTo(subscription, 5)
      console.log("Up to 5:", upTo5) // ["msg4", "msg5"]

      // No more messages available
      const noMore = yield* PubSub.takeUpTo(subscription, 10)
      console.log("No more:", noMore) // []
    })
  )
})
```

**Signature**

```ts
declare const takeUpTo: {
  (max: number): <A>(self: Subscription<A>) => Effect.Effect<Array<A>>
  <A>(self: Subscription<A>, max: number): Effect.Effect<Array<A>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PubSub.ts#L1287)

Since v4.0.0

# utils

## PubSub (namespace)

Companion namespace containing the low-level building blocks used by
`PubSub`, including atomic implementations, backing subscriptions, replay
windows, and delivery strategies.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PubSub.ts#L82)

Since v2.0.0

### Atomic (interface)

Low-level atomic PubSub interface that handles the core message storage and retrieval.

**Signature**

```ts
export interface Atomic<in out A> {
  readonly capacity: number
  isEmpty(): boolean
  isFull(): boolean
  size(): number
  publish(value: A): boolean
  publishAll(elements: Iterable<A>): Array<A>
  slide(): void
  subscribe(): BackingSubscription<A>
  replayWindow(): ReplayWindow<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PubSub.ts#L89)

Since v4.0.0

### BackingSubscription (interface)

Low-level subscription interface that handles message polling for individual subscribers.

**Signature**

```ts
export interface BackingSubscription<out A> {
  isEmpty(): boolean
  size(): number
  poll(): A | MutableList.Empty
  pollUpTo(n: number): Array<A>
  unsubscribe(): void
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PubSub.ts#L107)

Since v4.0.0

### ReplayWindow (interface)

Interface for accessing replay buffer contents for late subscribers.

**Signature**

```ts
export interface ReplayWindow<A> {
  take(): A | undefined
  takeN(n: number): Array<A>
  takeAll(): Array<A>
  readonly remaining: number
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PubSub.ts#L138)

Since v4.0.0

### Strategy (interface)

Strategy interface defining how PubSub handles backpressure and message distribution.

**Signature**

```ts
export interface Strategy<in out A> {
  /**
   * Describes any finalization logic associated with this strategy.
   */
  readonly shutdown: Effect.Effect<void>

  /**
   * Describes how publishers should signal to subscribers that they are
   * waiting for space to become available in the `PubSub`.
   */
  handleSurplus(
    pubsub: Atomic<A>,
    subscribers: Subscribers<A>,
    elements: Iterable<A>,
    isShutdown: MutableRef.MutableRef<boolean>
  ): Effect.Effect<boolean>

  /**
   * Describes how subscribers should signal to publishers waiting for space
   * to become available in the `PubSub` that space may be available.
   */
  onPubSubEmptySpaceUnsafe(pubsub: Atomic<A>, subscribers: Subscribers<A>): void

  /**
   * Describes how subscribers waiting for additional values from the `PubSub`
   * should take those values and signal to publishers that they are no
   * longer waiting for additional values.
   */
  completePollersUnsafe(
    pubsub: Atomic<A>,
    subscribers: Subscribers<A>,
    subscription: BackingSubscription<A>,
    pollers: MutableList.MutableList<Deferred.Deferred<A>>
  ): void

  /**
   * Describes how publishers should signal to subscribers waiting for
   * additional values from the `PubSub` that new values are available.
   */
  completeSubscribersUnsafe(pubsub: Atomic<A>, subscribers: Subscribers<A>): void
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PubSub.ts#L151)

Since v4.0.0

### Subscribers (type alias)

Tracks the pollers currently waiting on each backing subscription.

**Details**

This type is part of the low-level `PubSub.Strategy` contract. Most
application code should use `subscribe`, `take`, and the other `PubSub`
operations instead of manipulating subscriber maps directly.

**Signature**

```ts
type Subscribers<A> = Map<BackingSubscription<A>, Set<MutableList.MutableList<Deferred.Deferred<A>>>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PubSub.ts#L127)

Since v4.0.0
