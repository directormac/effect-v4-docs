---
title: TxChunk.ts
nav_order: 128
parent: "effect"
---

## TxChunk.ts overview

Stores a `Chunk` inside transactional state.

A `TxChunk<A>` keeps its current `Chunk<A>` in a `TxRef`, so reads and
updates can be committed atomically with other transactional operations. This
module offers a transactional version of common chunk workflows, including
creating collections, reading or replacing the current chunk, adding or
removing values, checking size, slicing, mapping, filtering, and combining
chunks.

Since v4.0.0

---

## Exports Grouped by Category

- [combinators](#combinators)
  - [append](#append)
  - [appendAll](#appendall)
  - [concat](#concat)
  - [drop](#drop)
  - [filter](#filter)
  - [get](#get)
  - [isEmpty](#isempty)
  - [isNonEmpty](#isnonempty)
  - [map](#map)
  - [modify](#modify)
  - [prepend](#prepend)
  - [prependAll](#prependall)
  - [set](#set)
  - [size](#size)
  - [slice](#slice)
  - [take](#take)
  - [update](#update)
- [constructors](#constructors)
  - [empty](#empty)
  - [fromIterable](#fromiterable)
  - [make](#make)
  - [makeUnsafe](#makeunsafe)
- [models](#models)
  - [TxChunk (interface)](#txchunk-interface)

---

# combinators

## append

Appends an element to the end of the `TxChunk`.

**Details**

This function mutates the original TxChunk by adding the element to the end. It does not return a
new TxChunk reference.

**Example** (Appending an element)

```ts
import { Chunk, Effect, TxChunk } from "effect"

const program = Effect.gen(function* () {
  const txChunk = yield* TxChunk.fromIterable([1, 2, 3])

  // Add element to the end atomically
  yield* TxChunk.append(txChunk, 4)

  const result = yield* TxChunk.get(txChunk)
  console.log(Chunk.toReadonlyArray(result)) // [1, 2, 3, 4]
})
```

**Signature**

```ts
declare const append: {
  <A>(element: A): (self: TxChunk<A>) => Effect.Effect<void>
  <A>(self: TxChunk<A>, element: A): Effect.Effect<void>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxChunk.ts#L401)

Since v4.0.0

## appendAll

Concatenates another chunk to the end of the `TxChunk`.

**Details**

This function mutates the original TxChunk by appending all elements from the other chunk. It does
not return a new TxChunk reference.

**Example** (Appending another chunk)

```ts
import { Chunk, Effect, TxChunk } from "effect"

const program = Effect.gen(function* () {
  const txChunk = yield* TxChunk.fromIterable([1, 2, 3])
  const otherChunk = Chunk.fromIterable([4, 5, 6])

  // Append all elements from another chunk atomically
  yield* TxChunk.appendAll(txChunk, otherChunk)

  const result = yield* TxChunk.get(txChunk)
  console.log(Chunk.toReadonlyArray(result)) // [1, 2, 3, 4, 5, 6]
})
```

**Signature**

```ts
declare const appendAll: {
  <A>(other: Chunk.Chunk<A>): (self: TxChunk<A>) => Effect.Effect<void>
  <A>(self: TxChunk<A>, other: Chunk.Chunk<A>): Effect.Effect<void>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxChunk.ts#L734)

Since v4.0.0

## concat

Concatenates another `TxChunk` to the end of this `TxChunk`.

**Details**

This function mutates the original TxChunk by appending all elements from the other TxChunk. It
does not return a new TxChunk reference.

**Example** (Concatenating TxChunks)

```ts
import { Chunk, Effect, TxChunk } from "effect"

const program = Effect.gen(function* () {
  const txChunk1 = yield* TxChunk.fromIterable([1, 2, 3])
  const txChunk2 = yield* TxChunk.fromIterable([4, 5, 6])

  // Concatenate atomically within a transaction
  yield* TxChunk.concat(txChunk1, txChunk2)

  const result = yield* TxChunk.get(txChunk1)
  console.log(Chunk.toReadonlyArray(result)) // [1, 2, 3, 4, 5, 6]

  // Original txChunk2 is unchanged
  const original = yield* TxChunk.get(txChunk2)
  console.log(Chunk.toReadonlyArray(original)) // [4, 5, 6]
})
```

**Signature**

```ts
declare const concat: {
  <A>(other: TxChunk<A>): (self: TxChunk<A>) => Effect.Effect<void>
  <A>(self: TxChunk<A>, other: TxChunk<A>): Effect.Effect<void>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxChunk.ts#L812)

Since v4.0.0

## drop

Drops the first `n` elements from the `TxChunk`.

**Details**

This function mutates the original TxChunk by removing the first n elements. It does not return a
new TxChunk reference.

**Example** (Dropping leading elements)

```ts
import { Chunk, Effect, TxChunk } from "effect"

const program = Effect.gen(function* () {
  const txChunk = yield* TxChunk.fromIterable([1, 2, 3, 4, 5])

  // Drop the first 2 elements - automatically transactional
  yield* TxChunk.drop(txChunk, 2)

  const result = yield* TxChunk.get(txChunk)
  console.log(Chunk.toReadonlyArray(result)) // [3, 4, 5]
})
```

**Signature**

```ts
declare const drop: {
  (n: number): <A>(self: TxChunk<A>) => Effect.Effect<void>
  <A>(self: TxChunk<A>, n: number): Effect.Effect<void>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxChunk.ts#L588)

Since v4.0.0

## filter

Filters the `TxChunk` keeping only elements that satisfy the predicate.

**Details**

This function mutates the original TxChunk by removing elements that don't match the predicate. It
does not return a new TxChunk reference.

**Example** (Filtering elements)

```ts
import { Chunk, Effect, TxChunk } from "effect"

const program = Effect.gen(function* () {
  const txChunk = yield* TxChunk.fromIterable([1, 2, 3, 4, 5, 6])

  // Keep only even numbers atomically
  yield* TxChunk.filter(txChunk, (n) => n % 2 === 0)

  const result = yield* TxChunk.get(txChunk)
  console.log(Chunk.toReadonlyArray(result)) // [2, 4, 6]
})
```

**Signature**

```ts
declare const filter: {
  <A, B extends A>(refinement: (a: A) => a is B): (self: TxChunk<A>) => Effect.Effect<void>
  <A>(predicate: (a: A) => boolean): (self: TxChunk<A>) => Effect.Effect<void>
  <A, B extends A>(self: TxChunk<A>, refinement: (a: A) => a is B): Effect.Effect<void>
  <A>(self: TxChunk<A>, predicate: (a: A) => boolean): Effect.Effect<void>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxChunk.ts#L695)

Since v4.0.0

## get

Reads the current chunk from the `TxChunk`.

**Example** (Reading the current chunk)

```ts
import { Chunk, Effect, TxChunk } from "effect"

const program = Effect.gen(function* () {
  const txChunk = yield* TxChunk.fromIterable([1, 2, 3])

  // Read the current value within a transaction
  const chunk = yield* TxChunk.get(txChunk)
  console.log(Chunk.toReadonlyArray(chunk)) // [1, 2, 3]

  // The value is tracked for conflict detection
  const size = Chunk.size(chunk)
  console.log(size) // 3
})
```

**Signature**

```ts
declare const get: <A>(self: TxChunk<A>) => Effect.Effect<Chunk.Chunk<A>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxChunk.ts#L336)

Since v4.0.0

## isEmpty

Checks whether the `TxChunk` is empty.

**Example** (Checking for an empty chunk)

```ts
import { Effect, TxChunk } from "effect"

const program = Effect.gen(function* () {
  const emptyChunk = yield* TxChunk.empty<number>()
  const nonEmptyChunk = yield* TxChunk.fromIterable([1, 2, 3])

  // Check if chunks are empty - automatically transactional
  const isEmpty1 = yield* TxChunk.isEmpty(emptyChunk)
  const isEmpty2 = yield* TxChunk.isEmpty(nonEmptyChunk)

  console.log(isEmpty1) // true
  console.log(isEmpty2) // false
})
```

**Signature**

```ts
declare const isEmpty: <A>(self: TxChunk<A>) => Effect.Effect<boolean>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxChunk.ts#L496)

Since v4.0.0

## isNonEmpty

Checks whether the `TxChunk` is non-empty.

**Example** (Checking for a non-empty chunk)

```ts
import { Effect, TxChunk } from "effect"

const program = Effect.gen(function* () {
  const emptyChunk = yield* TxChunk.empty<number>()
  const nonEmptyChunk = yield* TxChunk.fromIterable([1, 2, 3])

  // Check if chunks are non-empty - automatically transactional
  const isNonEmpty1 = yield* TxChunk.isNonEmpty(emptyChunk)
  const isNonEmpty2 = yield* TxChunk.isNonEmpty(nonEmptyChunk)

  console.log(isNonEmpty1) // false
  console.log(isNonEmpty2) // true
})
```

**Signature**

```ts
declare const isNonEmpty: <A>(self: TxChunk<A>) => Effect.Effect<boolean>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxChunk.ts#L523)

Since v4.0.0

## map

Maps each element of the `TxChunk` using a function that returns the same
element type.

**Details**

This function mutates the original `TxChunk` by transforming each element in place. It does not
return a new `TxChunk` reference.

**Example** (Mapping elements)

```ts
import { Chunk, Effect, TxChunk } from "effect"

const program = Effect.gen(function* () {
  const txChunk = yield* TxChunk.fromIterable([1, 2, 3, 4])

  // Transform each element atomically (must maintain same type)
  yield* TxChunk.map(txChunk, (n) => n * 2)

  const result = yield* TxChunk.get(txChunk)
  console.log(Chunk.toReadonlyArray(result)) // [2, 4, 6, 8]
})
```

**Signature**

```ts
declare const map: {
  <A>(f: (a: NoInfer<A>) => A): (self: TxChunk<A>) => Effect.Effect<void>
  <A>(self: TxChunk<A>, f: (a: A) => A): Effect.Effect<void>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxChunk.ts#L660)

Since v4.0.0

## modify

Modifies the value of the `TxChunk` using the provided function.

**Details**

This function mutates the original TxChunk by updating its internal state. It does not return a
new TxChunk reference.

**Example** (Modifying while returning a value)

```ts
import { Chunk, Effect, TxChunk } from "effect"

const program = Effect.gen(function* () {
  const txChunk = yield* TxChunk.fromIterable([1, 2, 3])

  // Modify and return both old size and new chunk
  const oldSize = yield* TxChunk.modify(txChunk, (chunk) => [
    Chunk.size(chunk), // return value (old size)
    Chunk.append(chunk, 4) // new value
  ])

  console.log(oldSize) // 3

  const newChunk = yield* TxChunk.get(txChunk)
  console.log(Chunk.toReadonlyArray(newChunk)) // [1, 2, 3, 4]
})
```

**Signature**

```ts
declare const modify: {
  <A, R>(
    f: (current: Chunk.Chunk<NoInfer<A>>) => [returnValue: R, newValue: Chunk.Chunk<A>]
  ): (self: TxChunk<A>) => Effect.Effect<R>
  <A, R>(self: TxChunk<A>, f: (current: Chunk.Chunk<A>) => [returnValue: R, newValue: Chunk.Chunk<A>]): Effect.Effect<R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxChunk.ts#L258)

Since v4.0.0

## prepend

Prepends an element to the beginning of the `TxChunk`.

**Details**

This function mutates the original TxChunk by adding the element to the beginning. It does not
return a new TxChunk reference.

**Example** (Prepending an element)

```ts
import { Chunk, Effect, TxChunk } from "effect"

const program = Effect.gen(function* () {
  const txChunk = yield* TxChunk.fromIterable([2, 3, 4])

  // Add element to the beginning atomically
  yield* TxChunk.prepend(txChunk, 1)

  const result = yield* TxChunk.get(txChunk)
  console.log(Chunk.toReadonlyArray(result)) // [1, 2, 3, 4]
})
```

**Signature**

```ts
declare const prepend: {
  <A>(element: A): (self: TxChunk<A>) => Effect.Effect<void>
  <A>(self: TxChunk<A>, element: A): Effect.Effect<void>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxChunk.ts#L436)

Since v4.0.0

## prependAll

Concatenates another chunk to the beginning of the `TxChunk`.

**Details**

This function mutates the original TxChunk by prepending all elements from the other chunk. It
does not return a new TxChunk reference.

**Example** (Prepending another chunk)

```ts
import { Chunk, Effect, TxChunk } from "effect"

const program = Effect.gen(function* () {
  const txChunk = yield* TxChunk.fromIterable([4, 5, 6])
  const otherChunk = Chunk.fromIterable([1, 2, 3])

  // Prepend all elements from another chunk atomically
  yield* TxChunk.prependAll(txChunk, otherChunk)

  const result = yield* TxChunk.get(txChunk)
  console.log(Chunk.toReadonlyArray(result)) // [1, 2, 3, 4, 5, 6]
})
```

**Signature**

```ts
declare const prependAll: {
  <A>(other: Chunk.Chunk<A>): (self: TxChunk<A>) => Effect.Effect<void>
  <A>(self: TxChunk<A>, other: Chunk.Chunk<A>): Effect.Effect<void>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxChunk.ts#L771)

Since v4.0.0

## set

Sets the value of the `TxChunk`.

**Details**

This function mutates the original TxChunk by replacing its internal state with the provided
chunk. It does not return a new TxChunk reference.

**Example** (Replacing the stored chunk)

```ts
import { Chunk, Effect, TxChunk } from "effect"

const program = Effect.gen(function* () {
  const txChunk = yield* TxChunk.fromIterable([1, 2, 3])

  // Replace the entire chunk content
  const newChunk = Chunk.fromIterable([10, 20, 30, 40])
  yield* TxChunk.set(txChunk, newChunk)

  const result = yield* TxChunk.get(txChunk)
  console.log(Chunk.toReadonlyArray(result)) // [10, 20, 30, 40]
})
```

**Signature**

```ts
declare const set: {
  <A>(chunk: Chunk.Chunk<A>): (self: TxChunk<A>) => Effect.Effect<void>
  <A>(self: TxChunk<A>, chunk: Chunk.Chunk<A>): Effect.Effect<void>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxChunk.ts#L366)

Since v4.0.0

## size

Gets the size of the `TxChunk`.

**Example** (Getting the size)

```ts
import { Effect, TxChunk } from "effect"

const program = Effect.gen(function* () {
  const txChunk = yield* TxChunk.fromIterable([1, 2, 3, 4, 5])

  // Get the current size - automatically transactional
  const currentSize = yield* TxChunk.size(txChunk)
  console.log(currentSize) // 5

  // Size is tracked for conflict detection
  yield* TxChunk.append(txChunk, 6)
  const newSize = yield* TxChunk.size(txChunk)
  console.log(newSize) // 6
})
```

**Signature**

```ts
declare const size: <A>(self: TxChunk<A>) => Effect.Effect<number>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxChunk.ts#L469)

Since v4.0.0

## slice

Takes a slice of the `TxChunk` from `start` to `end` (exclusive).

**Details**

This function mutates the original TxChunk by keeping only the elements in the specified range. It
does not return a new TxChunk reference.

**Example** (Taking a slice)

```ts
import { Chunk, Effect, TxChunk } from "effect"

const program = Effect.gen(function* () {
  const txChunk = yield* TxChunk.fromIterable([1, 2, 3, 4, 5, 6, 7])

  // Take elements from index 2 to 5 (exclusive) - automatically transactional
  yield* TxChunk.slice(txChunk, 2, 5)

  const result = yield* TxChunk.get(txChunk)
  console.log(Chunk.toReadonlyArray(result)) // [3, 4, 5]
})
```

**Signature**

```ts
declare const slice: {
  (start: number, end: number): <A>(self: TxChunk<A>) => Effect.Effect<void>
  <A>(self: TxChunk<A>, start: number, end: number): Effect.Effect<void>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxChunk.ts#L623)

Since v4.0.0

## take

Takes the first `n` elements from the `TxChunk`.

**Details**

This function mutates the original TxChunk by keeping only the first n elements. It does not
return a new TxChunk reference.

**Example** (Taking leading elements)

```ts
import { Chunk, Effect, TxChunk } from "effect"

const program = Effect.gen(function* () {
  const txChunk = yield* TxChunk.fromIterable([1, 2, 3, 4, 5])

  // Take only the first 3 elements - automatically transactional
  yield* TxChunk.take(txChunk, 3)

  const result = yield* TxChunk.get(txChunk)
  console.log(Chunk.toReadonlyArray(result)) // [1, 2, 3]
})
```

**Signature**

```ts
declare const take: {
  (n: number): <A>(self: TxChunk<A>) => Effect.Effect<void>
  <A>(self: TxChunk<A>, n: number): Effect.Effect<void>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxChunk.ts#L553)

Since v4.0.0

## update

Updates the value of the `TxChunk` using the provided function.

**Details**

This function mutates the original TxChunk by updating its internal state. It does not return a
new TxChunk reference.

**Example** (Updating the stored chunk)

```ts
import { Chunk, Effect, TxChunk } from "effect"

const program = Effect.gen(function* () {
  const txChunk = yield* TxChunk.fromIterable([1, 2, 3])

  // Update the chunk by reversing it atomically
  yield* TxChunk.update(txChunk, (chunk) => Chunk.reverse(chunk))

  const result = yield* TxChunk.get(txChunk)
  console.log(Chunk.toReadonlyArray(result)) // [3, 2, 1]
})
```

**Signature**

```ts
declare const update: {
  <A>(f: (current: Chunk.Chunk<NoInfer<A>>) => Chunk.Chunk<A>): (self: TxChunk<A>) => Effect.Effect<void>
  <A>(self: TxChunk<A>, f: (current: Chunk.Chunk<A>) => Chunk.Chunk<A>): Effect.Effect<void>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxChunk.ts#L301)

Since v4.0.0

# constructors

## empty

Creates a new empty `TxChunk`.

**Details**

This function returns a new TxChunk reference that is initially empty. No existing TxChunk
instances are modified.

**Example** (Creating an empty TxChunk)

```ts
import { Effect, TxChunk } from "effect"

const program = Effect.gen(function* () {
  // Create an empty TxChunk
  const txChunk = yield* TxChunk.empty<number>()

  // Check if it's empty - automatically transactional
  const isEmpty = yield* TxChunk.isEmpty(txChunk)
  console.log(isEmpty) // true

  // Add elements - automatically transactional
  yield* TxChunk.append(txChunk, 42)

  const isStillEmpty = yield* TxChunk.isEmpty(txChunk)
  console.log(isStillEmpty) // false
})
```

**Signature**

```ts
declare const empty: <A = never>() => Effect.Effect<TxChunk<A>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxChunk.ts#L155)

Since v4.0.0

## fromIterable

Creates a new `TxChunk` from an iterable.

**Details**

This function returns a new TxChunk reference containing elements from the provided iterable. No
existing TxChunk instances are modified.

**Example** (Creating from an iterable)

```ts
import { Chunk, Effect, TxChunk } from "effect"

const program = Effect.gen(function* () {
  // Create TxChunk from array
  const txChunk = yield* TxChunk.fromIterable([1, 2, 3, 4, 5])

  // Read the contents - automatically transactional
  const chunk = yield* TxChunk.get(txChunk)
  console.log(Chunk.toReadonlyArray(chunk)) // [1, 2, 3, 4, 5]

  // Multi-step atomic modification - use explicit transaction
  yield* Effect.tx(
    Effect.gen(function* () {
      yield* TxChunk.append(txChunk, 6)
      yield* TxChunk.prepend(txChunk, 0)
    })
  )

  const updated = yield* TxChunk.get(txChunk)
  console.log(Chunk.toReadonlyArray(updated)) // [0, 1, 2, 3, 4, 5, 6]
})
```

**Signature**

```ts
declare const fromIterable: <A>(iterable: Iterable<A>) => Effect.Effect<TxChunk<A>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxChunk.ts#L195)

Since v4.0.0

## make

Creates a new `TxChunk` with the specified initial chunk.

**Details**

This function returns a new TxChunk reference containing the provided initial chunk. No existing
TxChunk instances are modified.

**Example** (Creating a TxChunk from a chunk)

```ts
import { Chunk, Effect, TxChunk } from "effect"

const program = Effect.gen(function* () {
  // Create a TxChunk with initial values
  const initialChunk = Chunk.fromIterable([1, 2, 3])
  const txChunk = yield* TxChunk.make(initialChunk)

  // Read the value - automatically transactional
  const result = yield* TxChunk.get(txChunk)
  console.log(Chunk.toReadonlyArray(result)) // [1, 2, 3]
})
```

**Signature**

```ts
declare const make: <A>(initial: Chunk.Chunk<A>) => Effect.Effect<TxChunk<A>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxChunk.ts#L120)

Since v4.0.0

## makeUnsafe

Creates a new `TxChunk` with the specified TxRef.

**Details**

This function returns a new TxChunk reference wrapping the provided TxRef. No existing TxChunk
instances are modified.

**Example** (Wrapping an existing TxRef)

```ts
import { Chunk, TxChunk, TxRef } from "effect"

// Create a TxChunk from an existing TxRef (advanced usage)
const ref = TxRef.makeUnsafe(Chunk.fromIterable([1, 2, 3]))
const txChunk = TxChunk.makeUnsafe(ref)
```

**Signature**

```ts
declare const makeUnsafe: <A>(ref: TxRef.TxRef<Chunk.Chunk<A>>) => TxChunk<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxChunk.ts#L219)

Since v4.0.0

# models

## TxChunk (interface)

TxChunk is a transactional chunk data structure that provides Software Transactional Memory (STM)
semantics for chunk operations.

**Details**

Accessed values are tracked by the transaction in order to detect conflicts and to track changes.
A transaction will retry whenever a conflict is detected or whenever the transaction explicitly
calls `Effect.txRetry` and any of the accessed TxChunk values change.

**Example** (Using a transactional chunk)

```ts
import { Chunk, Effect, TxChunk } from "effect"

const program = Effect.gen(function* () {
  // Create a transactional chunk
  const txChunk: TxChunk.TxChunk<number> = yield* TxChunk.fromIterable([1, 2, 3])

  // Single operations - no explicit transaction needed
  yield* TxChunk.append(txChunk, 4)
  const result = yield* TxChunk.get(txChunk)
  console.log(Chunk.toReadonlyArray(result)) // [1, 2, 3, 4]

  // Multi-step atomic operation - use explicit transaction
  yield* Effect.tx(
    Effect.gen(function* () {
      yield* TxChunk.prepend(txChunk, 0)
      yield* TxChunk.append(txChunk, 5)
    })
  )

  const finalResult = yield* TxChunk.get(txChunk)
  console.log(Chunk.toReadonlyArray(finalResult)) // [0, 1, 2, 3, 4, 5]
})
```

**Signature**

```ts
export interface TxChunk<in out A> extends Inspectable, Pipeable {
  readonly [TypeId]: typeof TypeId
  readonly ref: TxRef.TxRef<Chunk.Chunk<A>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxChunk.ts#L70)

Since v4.0.0
