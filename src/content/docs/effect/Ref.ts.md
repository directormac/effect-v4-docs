---
title: Ref.ts
nav_order: 88
parent: "effect"
---

## Ref.ts overview

Stores fiber-safe mutable state inside Effect programs.

A `Ref<A>` holds one value and exposes reads, writes, and atomic
transformations as effects, so state changes compose with Effect's
concurrency model. This module includes constructors, safe and unsafe reads,
set and get-and-set helpers, update and modify helpers, and conditional
update variants that leave the value unchanged when an `Option.none` result
is returned.

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
  - [Ref (interface)](#ref-interface)
- [mutations](#mutations)
  - [getAndSet](#getandset)
  - [getAndUpdate](#getandupdate)
  - [getAndUpdateSome](#getandupdatesome)
  - [setAndGet](#setandget)
  - [updateAndGet](#updateandget)
  - [updateSomeAndGet](#updatesomeandget)
- [setters](#setters)
  - [modify](#modify)
  - [modifySome](#modifysome)
  - [set](#set)
  - [update](#update)
  - [updateSome](#updatesome)
- [utils](#utils)
  - [Ref (namespace)](#ref-namespace)
    - [Variance (interface)](#variance-interface)

---

# constructors

## make

Creates a new Ref with the specified initial value.

**When to use**

Use to create a `Ref` for shared mutable state inside an Effect program.

**Example** (Creating a ref)

```ts
import { Effect, Ref } from "effect"

const program = Effect.gen(function* () {
  const ref = yield* Ref.make(42)
  const value = yield* Ref.get(ref)
  console.log(value) // 42
})
```

**See**

- `makeUnsafe` for synchronous construction outside Effect code

**Signature**

```ts
declare const make: <A>(value: A) => Effect.Effect<Ref<A>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Ref.ts#L186)

Since v2.0.0

## makeUnsafe

Creates a new Ref with the specified initial value (unsafe version).

**When to use**

Use when you need immediate synchronous construction and can guarantee
that creating the `Ref` outside of `Effect` is safe.

**Gotchas**

Prefer `Ref.make` for Effect-wrapped creation in Effect programs.

**Example** (Creating a ref unsafely)

```ts
import { Ref } from "effect"

// Create a ref directly without Effect
const counter = Ref.makeUnsafe(0)

// Get the current value
const value = Ref.getUnsafe(counter)
console.log(value) // 0

// Note: This is unsafe and should be used carefully
// Prefer Ref.make for Effect-wrapped creation
```

**Signature**

```ts
declare const makeUnsafe: <A>(value: A) => Ref<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Ref.ts#L156)

Since v4.0.0

# getters

## get

Gets the current value of the Ref.

**When to use**

Use to read the current `Ref` value without changing it.

**Example** (Getting the current value)

```ts
import { Effect, Ref } from "effect"

const program = Effect.gen(function* () {
  const ref = yield* Ref.make(42)
  const value = yield* Ref.get(ref)
  console.log(value) // 42
})
```

**See**

- `set` for replacing the current value

**Signature**

```ts
declare const get: <A>(self: Ref<A>) => Effect.Effect<A, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Ref.ts#L212)

Since v2.0.0

## getUnsafe

Gets the current value of the Ref synchronously (unsafe version).

**When to use**

Use when you need immediate synchronous access and can guarantee that
reading the `Ref` outside of `Effect` is safe.

**Gotchas**

Prefer `Ref.get` for Effect-wrapped access in Effect programs.

**Example** (Reading a ref unsafely)

```ts
import { Ref } from "effect"

// Create a ref directly
const counter = Ref.makeUnsafe(42)

// Get the value synchronously
const value = Ref.getUnsafe(counter)
console.log(value) // 42

// Note: This is unsafe and should be used carefully
// Prefer Ref.get for Effect-wrapped access
```

**Signature**

```ts
declare const getUnsafe: <A>(self: Ref<A>) => A
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Ref.ts#L801)

Since v4.0.0

# models

## Ref (interface)

A mutable reference that provides atomic read, write, and update operations.

**When to use**

Use to keep shared mutable state that is read and updated inside Effect
programs.

**Details**

A `Ref` is a thread-safe mutable reference type for shared state. It supports
simple read and write operations as well as atomic transformations.

**Example** (Reading and updating a ref)

```ts
import { Effect, Ref } from "effect"

const program = Effect.gen(function* () {
  // Create a ref with initial value
  const counter = yield* Ref.make(0)

  // Read the current value
  const value = yield* Ref.get(counter)
  console.log(value) // 0

  // Update the value atomically
  yield* Ref.update(counter, (n) => n + 1)

  // Read the updated value
  const newValue = yield* Ref.get(counter)
  console.log(newValue) // 1
})
```

**See**

- `make` for creating a `Ref`
- `get` for reading the current value
- `set` for replacing the current value

**Signature**

```ts
export interface Ref<in out A> extends Ref.Variance<A>, Pipeable {
  readonly ref: MutableRef.MutableRef<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Ref.ts#L65)

Since v2.0.0

# mutations

## getAndSet

Gets the current value of the Ref, sets it to the specified value, and returns the previous value atomically.

**When to use**

Use to replace a plain `Ref` value while returning the previous value.

**Example** (Replacing a value atomically)

```ts
import { Effect, Ref } from "effect"

const program = Effect.gen(function* () {
  const ref = yield* Ref.make("initial")

  // Get current value and set new value atomically
  const previous = yield* Ref.getAndSet(ref, "updated")
  console.log(previous) // "initial"

  const current = yield* Ref.get(ref)
  console.log(current) // "updated"
})
```

**See**

- `set` for setting without returning the previous value
- `getAndUpdate` for deriving the new value from the previous value

**Signature**

```ts
declare const getAndSet: (<A>(value: A) => (self: Ref<A>) => Effect.Effect<A>) &
  (<A>(self: Ref<A>, value: A) => Effect.Effect<A>)
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Ref.ts#L283)

Since v2.0.0

## getAndUpdate

Gets the current value of the Ref, updates it with the given function, and returns the previous value atomically.

**When to use**

Use to derive a new `Ref` value while returning the previous value.

**Example** (Updating and returning the previous value)

```ts
import { Effect, Ref } from "effect"

const program = Effect.gen(function* () {
  const counter = yield* Ref.make(10)

  // Get current value and update it atomically
  const previous = yield* Ref.getAndUpdate(counter, (n) => n * 2)
  console.log(previous) // 10

  const current = yield* Ref.get(counter)
  console.log(current) // 20
})
```

**See**

- `update` for updating without returning the previous value
- `updateAndGet` for returning the new value instead

**Signature**

```ts
declare const getAndUpdate: (<A>(f: (a: A) => A) => (self: Ref<A>) => Effect.Effect<A>) &
  (<A>(self: Ref<A>, f: (a: A) => A) => Effect.Effect<A>)
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Ref.ts#L323)

Since v2.0.0

## getAndUpdateSome

Gets the current value of the Ref and updates it atomically with the given partial function.

**When to use**

Use to return the previous `Ref` value while applying a conditional update.

**Details**

If the partial function returns `Option.some`, the Ref is updated with the
new value. If it returns `Option.none`, the Ref is left unchanged. The effect
always returns the value that was in the Ref before the attempted update.

**Example** (Conditionally updating and returning the previous value)

```ts
import { Effect, Option, Ref } from "effect"

const program = Effect.gen(function* () {
  const counter = yield* Ref.make(5)

  // Only update if value is greater than 3
  const previous1 = yield* Ref.getAndUpdateSome(counter, (n) => (n > 3 ? Option.some(n * 2) : Option.none()))
  console.log(previous1) // 5

  const current1 = yield* Ref.get(counter)
  console.log(current1) // 10

  // Try to update again (won't update since 10 > 3 is true but let's say condition is n < 3)
  const previous2 = yield* Ref.getAndUpdateSome(counter, (n) => (n < 3 ? Option.some(n * 2) : Option.none()))
  console.log(previous2) // 10

  const current2 = yield* Ref.get(counter)
  console.log(current2) // 10 (unchanged)
})
```

**See**

- `getAndUpdate` for always applying an update
- `updateSome` for conditional updates without returning the previous value

**Signature**

```ts
declare const getAndUpdateSome: (<A>(pf: (a: A) => Option.Option<A>) => (self: Ref<A>) => Effect.Effect<A>) &
  (<A>(self: Ref<A>, pf: (a: A) => Option.Option<A>) => Effect.Effect<A>)
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Ref.ts#L382)

Since v2.0.0

## setAndGet

Sets the value of the Ref atomically to the specified value and returns the new value.

**When to use**

Use when you want to set a `Ref` value and immediately get it back in one
atomic operation.

**Example** (Setting and returning the new value)

```ts
import { Effect, Ref } from "effect"

const program = Effect.gen(function* () {
  const ref = yield* Ref.make(10)

  // Set new value and get it back in one operation
  const newValue = yield* Ref.setAndGet(ref, 42)
  console.log(newValue) // 42

  // Verify the ref contains the new value
  const current = yield* Ref.get(ref)
  console.log(current) // 42
})

// Useful for sequential operations
const program2 = Effect.gen(function* () {
  const counter = yield* Ref.make(0)

  const newValue = yield* Ref.setAndGet(counter, 20)
  console.log(newValue) // 20
})
```

**Signature**

```ts
declare const setAndGet: (<A>(value: A) => (self: Ref<A>) => Effect.Effect<A>) &
  (<A>(self: Ref<A>, value: A) => Effect.Effect<A>)
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Ref.ts#L432)

Since v2.0.0

## updateAndGet

Updates the value of the Ref atomically using the given function and returns the new value.

**When to use**

Use to apply a `Ref` state transition and return the new stored value.

**Example** (Updating and returning the new value)

```ts
import { Effect, Ref } from "effect"

const program = Effect.gen(function* () {
  const counter = yield* Ref.make(5)

  // Update and get the new value in one operation
  const newValue = yield* Ref.updateAndGet(counter, (n) => n * 3)
  console.log(newValue) // 15

  // Verify the ref contains the new value
  const current = yield* Ref.get(counter)
  console.log(current) // 15
})
```

**See**

- `update` for updating without returning the new value
- `getAndUpdate` for returning the previous value instead

**Signature**

```ts
declare const updateAndGet: (<A>(f: (a: A) => A) => (self: Ref<A>) => Effect.Effect<A>) &
  (<A>(self: Ref<A>, f: (a: A) => A) => Effect.Effect<A>)
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Ref.ts#L651)

Since v2.0.0

## updateSomeAndGet

Updates the value of the Ref atomically using the given partial function and returns the current value.

**When to use**

Use to apply a conditional `Ref` update and return the resulting current
value.

**Details**

If the partial function returns `Option.some`, the Ref is updated with the
new value. If it returns `Option.none`, the Ref is left unchanged. The effect
returns the current value of the Ref after the potential update.

**Example** (Conditionally updating and returning the current value)

```ts
import { Effect, Option, Ref } from "effect"

const program = Effect.gen(function* () {
  const counter = yield* Ref.make(10)

  // Only update if value is greater than 5
  const result1 = yield* Ref.updateSomeAndGet(counter, (n) => (n > 5 ? Option.some(n / 2) : Option.none()))
  console.log(result1) // 5 (updated and returned)

  // Try to update again with same condition
  const result2 = yield* Ref.updateSomeAndGet(counter, (n) => (n > 5 ? Option.some(n / 2) : Option.none()))
  console.log(result2) // 5 (unchanged because 5 is not > 5)
})
```

**See**

- `updateSome` for conditional updates without returning a value
- `updateAndGet` for always updating and returning the new value

**Signature**

```ts
declare const updateSomeAndGet: (<A>(pf: (a: A) => Option.Option<A>) => (self: Ref<A>) => Effect.Effect<A>) &
  (<A>(self: Ref<A>, pf: (a: A) => Option.Option<A>) => Effect.Effect<A>)
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Ref.ts#L758)

Since v2.0.0

# setters

## modify

Modifies the value of the Ref atomically using the given function.

**When to use**

Use to compute both a separate return value and the next stored `Ref` value
in one atomic update.

**Details**

The function receives the current value and returns a tuple of
`[result, newValue]`. The Ref is updated with `newValue`, and `result` is
returned by the effect.

**Example** (Modifying a value atomically)

```ts
import { Effect, Ref } from "effect"

const program = Effect.gen(function* () {
  const counter = yield* Ref.make(10)

  // Modify the ref and return some computation result
  const result = yield* Ref.modify(counter, (n) => [
    `Previous value was ${n}`, // Return value
    n * 2 // New ref value
  ])

  console.log(result) // "Previous value was 10"

  const current = yield* Ref.get(counter)
  console.log(current) // 20
})

// Example with more complex computation
const program2 = Effect.gen(function* () {
  const state = yield* Ref.make({ count: 0, total: 0 })

  const incremented = yield* Ref.modify(state, (s) => [
    s.count, // Return previous count
    { count: s.count + 1, total: s.total + s.count + 1 } // New state
  ])

  console.log(incremented) // 0
})
```

**See**

- `updateAndGet` for returning the new stored value
- `modifySome` for optionally updating while returning a separate result

**Signature**

```ts
declare const modify: (<A, B>(f: (a: A) => readonly [B, A]) => (self: Ref<A>) => Effect.Effect<B>) &
  (<A, B>(self: Ref<A>, f: (a: A) => readonly [B, A]) => Effect.Effect<B>)
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Ref.ts#L490)

Since v2.0.0

## modifySome

Computes a result atomically and optionally updates the value of the `Ref`.

**When to use**

Use to compute a return value while optionally updating a plain `Ref`.

**Details**

The callback receives the current value and returns `[result, nextValue]`,
where `nextValue` is an `Option`. If `nextValue` is `Option.some(value)`,
the `Ref` is updated to `value`; if it is `Option.none()`, the `Ref` is left
unchanged. The returned effect always succeeds with `result`.

**Example** (Conditionally modifying a value)

```ts
import { Effect, Option, Ref } from "effect"

const program = Effect.gen(function* () {
  const counter = yield* Ref.make(5)

  // Only modify if value is greater than 3
  const result1 = yield* Ref.modifySome(counter, (n) =>
    n > 3 ? [`incremented ${n}`, Option.some(n + 10)] : ["no change", Option.none()]
  )

  console.log(result1) // "incremented 5"

  const current1 = yield* Ref.get(counter)
  console.log(current1) // 15

  // Try to modify with a condition that fails
  const result2 = yield* Ref.modifySome(counter, (n) =>
    n < 10 ? [`decremented ${n}`, Option.some(n - 5)] : ["no change", Option.none()]
  )

  console.log(result2) // "no change"

  const current2 = yield* Ref.get(counter)
  console.log(current2) // 15 (unchanged)
})
```

**See**

- `modify` for always storing a new value
- `updateSome` for optional updates without a separate return value

**Signature**

```ts
declare const modifySome: {
  <B, A>(pf: (a: A) => readonly [B, Option.Option<A>]): (self: Ref<A>) => Effect.Effect<B>
  <A, B>(self: Ref<A>, pf: (a: A) => readonly [B, Option.Option<A>]): Effect.Effect<B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Ref.ts#L558)

Since v2.0.0

## set

Sets the value of the Ref to the specified value.

**When to use**

Use to replace the current `Ref` value with a known value.

**Example** (Setting a value)

```ts
import { Effect, Ref } from "effect"

const program = Effect.gen(function* () {
  const ref = yield* Ref.make(0)
  yield* Ref.set(ref, 42)
  const value = yield* Ref.get(ref)
  console.log(value) // 42
})

// Using multiple operations
const program2 = Effect.gen(function* () {
  const ref = yield* Ref.make(0)
  yield* Ref.set(ref, 100)
  const value = yield* Ref.get(ref)
  console.log(value) // 100
})
```

**See**

- `getAndSet` for setting while returning the previous value
- `setAndGet` for setting while returning the new value

**Signature**

```ts
declare const set: (<A>(value: A) => (self: Ref<A>) => Effect.Effect<void>) &
  (<A>(self: Ref<A>, value: A) => Effect.Effect<void>)
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Ref.ts#L248)

Since v2.0.0

## update

Updates the value of the Ref atomically using the given function.

**When to use**

Use to apply a `Ref` state transition without returning a value.

**Example** (Updating a value)

```ts
import { Effect, Ref } from "effect"

const program = Effect.gen(function* () {
  const counter = yield* Ref.make(5)

  // Update the value
  yield* Ref.update(counter, (n) => n * 2)

  const value = yield* Ref.get(counter)
  console.log(value) // 10
})

// Using multiple operations
const program2 = Effect.gen(function* () {
  const counter = yield* Ref.make(5)
  yield* Ref.update(counter, (n: number) => n + 10)
  const value = yield* Ref.get(counter)
  console.log(value) // 15
})
```

**See**

- `updateAndGet` for returning the new value
- `getAndUpdate` for returning the previous value

**Signature**

```ts
declare const update: (<A>(f: (a: A) => A) => (self: Ref<A>) => Effect.Effect<void>) &
  (<A>(self: Ref<A>, f: (a: A) => A) => Effect.Effect<void>)
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Ref.ts#L612)

Since v2.0.0

## updateSome

Updates the value of the Ref atomically using the given partial function.

**When to use**

Use to apply a conditional `Ref` update without returning a value.

**Details**

If the partial function returns `Option.some`, the Ref is updated with the
new value. If it returns `Option.none`, the Ref is left unchanged.

**Example** (Conditionally updating a value)

```ts
import { Effect, Option, Ref } from "effect"

const program = Effect.gen(function* () {
  const counter = yield* Ref.make(5)

  // Only update if value is even
  yield* Ref.updateSome(counter, (n) => (n % 2 === 0 ? Option.some(n * 2) : Option.none()))

  let current = yield* Ref.get(counter)
  console.log(current) // 5 (unchanged because 5 is odd)

  // Set to even number and try again
  yield* Ref.set(counter, 6)
  yield* Ref.updateSome(counter, (n) => (n % 2 === 0 ? Option.some(n * 2) : Option.none()))

  current = yield* Ref.get(counter)
  console.log(current) // 12 (updated because 6 is even)
})
```

**See**

- `update` for always applying an update
- `updateSomeAndGet` for returning the resulting current value

**Signature**

```ts
declare const updateSome: (<A>(f: (a: A) => Option.Option<A>) => (self: Ref<A>) => Effect.Effect<void>) &
  (<A>(self: Ref<A>, f: (a: A) => Option.Option<A>) => Effect.Effect<void>)
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Ref.ts#L703)

Since v2.0.0

# utils

## Ref (namespace)

The Ref namespace containing type definitions and utilities.

**When to use**

Use when referring to type members nested under the `Ref` namespace.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Ref.ts#L78)

Since v2.0.0

### Variance (interface)

Variance interface for Ref types, defining the type parameter constraints.

**When to use**

Use when working with the type-level variance marker carried by `Ref`.

**Example** (Using invariant refs)

```ts
import { Effect, Ref } from "effect"

// This interface defines the invariant nature of Ref's type parameter
// A Ref<A> is both a producer and consumer of A
const program = Effect.gen(function* () {
  const ref = yield* Ref.make(42)

  // Ref is invariant - it can both produce and consume numbers
  const value = yield* Ref.get(ref) // produces number
  yield* Ref.set(ref, value + 1) // consumes number
})
```

**Signature**

```ts
export interface Variance<in out A> {
  readonly [TypeId]: {
    readonly _A: Invariant<A>
  }
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Ref.ts#L105)

Since v2.0.0
