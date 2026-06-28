---
title: TxPriorityQueue.ts
nav_order: 132
parent: "effect"
---

## TxPriorityQueue.ts overview

Transactional priority queues whose state is stored in a `TxRef`. Elements
are kept in the order defined by the `Order` supplied at construction time,
and dequeue operations return the first element according to that ordering.

Use `TxPriorityQueue` when multiple fibers coordinate through a shared queue
and queue operations need to compose with other transactional state changes.
The retrying `peek` and `take` operations wait transactionally when the queue
is empty, so they can be combined with other transactional reads and writes in
one atomic workflow.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [empty](#empty)
  - [fromIterable](#fromiterable)
  - [make](#make)
- [converting](#converting)
  - [toArray](#toarray)
- [filtering](#filtering)
  - [removeIf](#removeif)
  - [retainIf](#retainif)
- [getters](#getters)
  - [isEmpty](#isempty)
  - [isNonEmpty](#isnonempty)
  - [peek](#peek)
  - [peekOption](#peekoption)
  - [size](#size)
- [guards](#guards)
  - [isTxPriorityQueue](#istxpriorityqueue)
- [models](#models)
  - [TxPriorityQueue (interface)](#txpriorityqueue-interface)
- [mutations](#mutations)
  - [offer](#offer)
  - [offerAll](#offerall)
  - [take](#take)
  - [takeAll](#takeall)
  - [takeOption](#takeoption)
  - [takeUpTo](#takeupto)

---

# constructors

## empty

Creates an empty `TxPriorityQueue` with the given ordering.

**Example** (Creating an empty priority queue)

```ts
import { Effect, Order, TxPriorityQueue } from "effect"

const program = Effect.gen(function* () {
  const pq = yield* TxPriorityQueue.empty<number>(Order.Number)
  const empty = yield* TxPriorityQueue.isEmpty(pq)
  console.log(empty) // true
})
```

**Signature**

```ts
declare const empty: <A>(order: Order<A>) => Effect.Effect<TxPriorityQueue<A>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxPriorityQueue.ts#L123)

Since v2.0.0

## fromIterable

Creates a `TxPriorityQueue` from an iterable of elements.

**Example** (Creating a priority queue from an iterable)

```ts
import { Effect, Order, TxPriorityQueue } from "effect"

const program = Effect.gen(function* () {
  const pq = yield* TxPriorityQueue.fromIterable(Order.Number, [3, 1, 2])
  const first = yield* TxPriorityQueue.take(pq)
  console.log(first) // 1
})
```

**Signature**

```ts
declare const fromIterable: {
  <A>(order: Order<A>): (iterable: Iterable<A>) => Effect.Effect<TxPriorityQueue<A>>
  <A>(order: Order<A>, iterable: Iterable<A>): Effect.Effect<TxPriorityQueue<A>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxPriorityQueue.ts#L144)

Since v2.0.0

## make

Creates a `TxPriorityQueue` from variadic elements.

**Example** (Creating a priority queue from variadic values)

```ts
import { Effect, Order, TxPriorityQueue } from "effect"

const program = Effect.gen(function* () {
  const pq = yield* TxPriorityQueue.make(Order.Number)(3, 1, 2)
  const first = yield* TxPriorityQueue.take(pq)
  console.log(first) // 1
})
```

**Signature**

```ts
declare const make: <A>(order: Order<A>) => (...elements: Array<A>) => Effect.Effect<TxPriorityQueue<A>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxPriorityQueue.ts#L176)

Since v2.0.0

# converting

## toArray

Returns all elements in priority order without removing them.

**Example** (Reading values in priority order)

```ts
import { Effect, Order, TxPriorityQueue } from "effect"

const program = Effect.gen(function* () {
  const pq = yield* TxPriorityQueue.fromIterable(Order.Number, [3, 1, 2])
  const all = yield* TxPriorityQueue.toArray(pq)
  console.log(all) // [1, 2, 3]
})
```

**Signature**

```ts
declare const toArray: <A>(self: TxPriorityQueue<A>) => Effect.Effect<Array<A>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxPriorityQueue.ts#L546)

Since v2.0.0

# filtering

## removeIf

Removes elements matching the predicate.

**Example** (Removing matching values)

```ts
import { Effect, Order, TxPriorityQueue } from "effect"

const program = Effect.gen(function* () {
  const pq = yield* TxPriorityQueue.fromIterable(Order.Number, [1, 2, 3, 4, 5])
  yield* TxPriorityQueue.removeIf(pq, (n) => n % 2 === 0)
  const all = yield* TxPriorityQueue.takeAll(pq)
  console.log(all) // [1, 3, 5]
})
```

**Signature**

```ts
declare const removeIf: {
  <A>(predicate: Predicate<A>): (self: TxPriorityQueue<A>) => Effect.Effect<void>
  <A>(self: TxPriorityQueue<A>, predicate: Predicate<A>): Effect.Effect<void>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxPriorityQueue.ts#L491)

Since v2.0.0

## retainIf

Keeps only elements matching the predicate.

**Example** (Retaining matching values)

```ts
import { Effect, Order, TxPriorityQueue } from "effect"

const program = Effect.gen(function* () {
  const pq = yield* TxPriorityQueue.fromIterable(Order.Number, [1, 2, 3, 4, 5])
  yield* TxPriorityQueue.retainIf(pq, (n) => n % 2 === 0)
  const all = yield* TxPriorityQueue.takeAll(pq)
  console.log(all) // [2, 4]
})
```

**Signature**

```ts
declare const retainIf: {
  <A>(predicate: Predicate<A>): (self: TxPriorityQueue<A>) => Effect.Effect<void>
  <A>(self: TxPriorityQueue<A>, predicate: Predicate<A>): Effect.Effect<void>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxPriorityQueue.ts#L519)

Since v2.0.0

# getters

## isEmpty

Returns `true` if the queue is empty.

**Example** (Checking whether a queue is empty)

```ts
import { Effect, Order, TxPriorityQueue } from "effect"

const program = Effect.gen(function* () {
  const pq = yield* TxPriorityQueue.empty<number>(Order.Number)
  const empty = yield* TxPriorityQueue.isEmpty(pq)
  console.log(empty) // true
})
```

**Signature**

```ts
declare const isEmpty: <A>(self: TxPriorityQueue<A>) => Effect.Effect<boolean>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxPriorityQueue.ts#L217)

Since v2.0.0

## isNonEmpty

Returns `true` if the queue has at least one element.

**Example** (Checking whether a queue has elements)

```ts
import { Effect, Order, TxPriorityQueue } from "effect"

const program = Effect.gen(function* () {
  const pq = yield* TxPriorityQueue.fromIterable(Order.Number, [1])
  const nonEmpty = yield* TxPriorityQueue.isNonEmpty(pq)
  console.log(nonEmpty) // true
})
```

**Signature**

```ts
declare const isNonEmpty: <A>(self: TxPriorityQueue<A>) => Effect.Effect<boolean>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxPriorityQueue.ts#L237)

Since v2.0.0

## peek

Observes the smallest element without removing it.

**When to use**

Use to inspect the next prioritized value and retry transactionally while
the queue is empty.

**Example** (Peeking at the next value)

```ts
import { Effect, Order, TxPriorityQueue } from "effect"

const program = Effect.gen(function* () {
  const pq = yield* TxPriorityQueue.fromIterable(Order.Number, [3, 1, 2])
  const top = yield* TxPriorityQueue.peek(pq)
  console.log(top) // 1
})
```

**Signature**

```ts
declare const peek: <A>(self: TxPriorityQueue<A>) => Effect.Effect<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxPriorityQueue.ts#L262)

Since v2.0.0

## peekOption

Observes the smallest element without removing it, returning `None` when the
queue is empty.

**When to use**

Use to inspect the next prioritized value without retrying on an empty queue.

**Example** (Peeking without retrying)

```ts
import { Effect, Option, Order, TxPriorityQueue } from "effect"

const program = Effect.gen(function* () {
  const pq = yield* TxPriorityQueue.empty<number>(Order.Number)
  const result = yield* TxPriorityQueue.peekOption(pq)
  console.log(Option.isNone(result)) // true
})
```

**Signature**

```ts
declare const peekOption: <A>(self: TxPriorityQueue<A>) => Effect.Effect<Option<A>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxPriorityQueue.ts#L295)

Since v2.0.0

## size

Returns the number of elements in the queue.

**Example** (Getting the queue size)

```ts
import { Effect, Order, TxPriorityQueue } from "effect"

const program = Effect.gen(function* () {
  const pq = yield* TxPriorityQueue.fromIterable(Order.Number, [1, 2, 3])
  const s = yield* TxPriorityQueue.size(pq)
  console.log(s) // 3
})
```

**Signature**

```ts
declare const size: <A>(self: TxPriorityQueue<A>) => Effect.Effect<number>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxPriorityQueue.ts#L197)

Since v2.0.0

# guards

## isTxPriorityQueue

Determines if the provided value is a `TxPriorityQueue`.

**Example** (Checking for a TxPriorityQueue)

```ts
import { Effect, Order, TxPriorityQueue } from "effect"

const program = Effect.gen(function* () {
  const pq = yield* TxPriorityQueue.empty<number>(Order.Number)
  console.log(TxPriorityQueue.isTxPriorityQueue(pq)) // true
  console.log(TxPriorityQueue.isTxPriorityQueue("nope")) // false
})
```

**Signature**

```ts
declare const isTxPriorityQueue: (u: unknown) => u is TxPriorityQueue<unknown>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxPriorityQueue.ts#L567)

Since v4.0.0

# models

## TxPriorityQueue (interface)

A transactional priority queue backed by a sorted `Chunk`.

**Details**

Elements are stored in ascending order according to the `Order` provided at
construction time. `take` returns the smallest element, `peek` observes it
without removing.

**Example** (Dequeuing values by priority)

```ts
import { Effect, Order, TxPriorityQueue } from "effect"

const program = Effect.gen(function* () {
  const pq = yield* TxPriorityQueue.empty<number>(Order.Number)
  yield* TxPriorityQueue.offer(pq, 3)
  yield* TxPriorityQueue.offer(pq, 1)
  yield* TxPriorityQueue.offer(pq, 2)
  const first = yield* TxPriorityQueue.take(pq)
  console.log(first) // 1
})
```

**Signature**

```ts
export interface TxPriorityQueue<in out A> extends Inspectable, Pipeable {
  readonly [TypeId]: typeof TypeId
  readonly ref: TxRef.TxRef<Chunk<A>>
  readonly ord: Order<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxPriorityQueue.ts#L58)

Since v4.0.0

# mutations

## offer

Inserts an element into the queue in sorted position.

**Example** (Offering a value)

```ts
import { Effect, Order, TxPriorityQueue } from "effect"

const program = Effect.gen(function* () {
  const pq = yield* TxPriorityQueue.empty<number>(Order.Number)
  yield* TxPriorityQueue.offer(pq, 2)
  yield* TxPriorityQueue.offer(pq, 1)
  const first = yield* TxPriorityQueue.take(pq)
  console.log(first) // 1
})
```

**Signature**

```ts
declare const offer: {
  <A>(value: A): (self: TxPriorityQueue<A>) => Effect.Effect<void>
  <A>(self: TxPriorityQueue<A>, value: A): Effect.Effect<void>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxPriorityQueue.ts#L318)

Since v2.0.0

## offerAll

Inserts all elements from an iterable into the queue.

**Example** (Offering multiple values)

```ts
import { Effect, Order, TxPriorityQueue } from "effect"

const program = Effect.gen(function* () {
  const pq = yield* TxPriorityQueue.empty<number>(Order.Number)
  yield* TxPriorityQueue.offerAll(pq, [3, 1, 2])
  const first = yield* TxPriorityQueue.take(pq)
  console.log(first) // 1
})
```

**Signature**

```ts
declare const offerAll: {
  <A>(values: Iterable<A>): (self: TxPriorityQueue<A>) => Effect.Effect<void>
  <A>(self: TxPriorityQueue<A>, values: Iterable<A>): Effect.Effect<void>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxPriorityQueue.ts#L346)

Since v2.0.0

## take

Takes the smallest element from the queue. Retries if the queue is empty.

**Example** (Taking the next value)

```ts
import { Effect, Order, TxPriorityQueue } from "effect"

const program = Effect.gen(function* () {
  const pq = yield* TxPriorityQueue.fromIterable(Order.Number, [3, 1, 2])
  const first = yield* TxPriorityQueue.take(pq)
  console.log(first) // 1
})
```

**Signature**

```ts
declare const take: <A>(self: TxPriorityQueue<A>) => Effect.Effect<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxPriorityQueue.ts#L376)

Since v2.0.0

## takeAll

Takes all elements from the queue, returning them in priority order.

**Example** (Taking all values in priority order)

```ts
import { Effect, Order, TxPriorityQueue } from "effect"

const program = Effect.gen(function* () {
  const pq = yield* TxPriorityQueue.fromIterable(Order.Number, [3, 1, 2])
  const all = yield* TxPriorityQueue.takeAll(pq)
  console.log(all) // [1, 2, 3]
})
```

**Signature**

```ts
declare const takeAll: <A>(self: TxPriorityQueue<A>) => Effect.Effect<Array<A>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxPriorityQueue.ts#L405)

Since v2.0.0

## takeOption

Tries to take the smallest element. Returns `None` if the queue is empty.

**Example** (Taking without retrying)

```ts
import { Effect, Option, Order, TxPriorityQueue } from "effect"

const program = Effect.gen(function* () {
  const pq = yield* TxPriorityQueue.empty<number>(Order.Number)
  const result = yield* TxPriorityQueue.takeOption(pq)
  console.log(Option.isNone(result)) // true
})
```

**Signature**

```ts
declare const takeOption: <A>(self: TxPriorityQueue<A>) => Effect.Effect<Option<A>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxPriorityQueue.ts#L429)

Since v2.0.0

## takeUpTo

Takes up to `n` elements from the queue in priority order.

**Example** (Taking up to a limit)

```ts
import { Effect, Order, TxPriorityQueue } from "effect"

const program = Effect.gen(function* () {
  const pq = yield* TxPriorityQueue.fromIterable(Order.Number, [5, 3, 1, 4, 2])
  const top2 = yield* TxPriorityQueue.takeUpTo(pq, 2)
  console.log(top2) // [1, 2]
})
```

**Signature**

```ts
declare const takeUpTo: {
  (n: number): <A>(self: TxPriorityQueue<A>) => Effect.Effect<Array<A>>
  <A>(self: TxPriorityQueue<A>, n: number): Effect.Effect<Array<A>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxPriorityQueue.ts#L456)

Since v2.0.0
