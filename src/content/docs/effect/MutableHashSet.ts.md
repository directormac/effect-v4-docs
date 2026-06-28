---
title: MutableHashSet.ts
nav_order: 61
parent: "effect"
---

## MutableHashSet.ts overview

Stores unique values in a mutable hash set.

`MutableHashSet` updates the same collection in place and supports fast
membership checks, insertion, removal, clearing, and iteration. It is built
on `MutableHashMap`: each set value is stored as a map key, so uniqueness
follows the same hashing and equality rules as the underlying mutable hash
map.

Since v2.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [empty](#empty)
  - [fromIterable](#fromiterable)
  - [make](#make)
- [elements](#elements)
  - [has](#has)
  - [size](#size)
- [models](#models)
  - [MutableHashSet (interface)](#mutablehashset-interface)
- [mutations](#mutations)
  - [add](#add)
  - [clear](#clear)
  - [remove](#remove)
- [refinements](#refinements)
  - [isMutableHashSet](#ismutablehashset)

---

# constructors

## empty

Creates an empty MutableHashSet.

**When to use**

Use to create a fresh mutable set before adding values over time.

**Details**

Each call returns a new empty set backed by an empty `MutableHashMap`.

**Example** (Creating an empty set)

```ts
import { MutableHashSet } from "effect"

const set = MutableHashSet.empty<string>()

// Add some values
MutableHashSet.add(set, "apple")
MutableHashSet.add(set, "banana")
MutableHashSet.add(set, "apple") // Duplicate, no effect

console.log(MutableHashSet.size(set)) // 2
console.log(Array.from(set)) // ["apple", "banana"]
```

**See**

- `make` for creating a set from explicit values
- `fromIterable` for creating a set from an iterable of values
- `clear` for emptying an existing mutable set

**Signature**

```ts
declare const empty: <K = never>() => MutableHashSet<K>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/MutableHashSet.ts#L156)

Since v2.0.0

## fromIterable

Creates a MutableHashSet from an iterable collection of values.
Duplicates are automatically removed.

**When to use**

Use to build a mutable hash set from any iterable of values.

**Example** (Creating a set from an iterable)

```ts
import { MutableHashSet } from "effect"

const values = ["apple", "banana", "apple", "cherry", "banana"]
const set = MutableHashSet.fromIterable(values)

console.log(MutableHashSet.size(set)) // 3
console.log(Array.from(set)) // ["apple", "banana", "cherry"]

// Works with any iterable
const fromSet = MutableHashSet.fromIterable(new Set([1, 2, 3]))
console.log(MutableHashSet.size(fromSet)) // 3

// From string characters
const fromString = MutableHashSet.fromIterable("hello")
console.log(Array.from(fromString)) // ["h", "e", "l", "o"]
```

**Signature**

```ts
declare const fromIterable: <K = never>(keys: Iterable<K>) => MutableHashSet<K>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/MutableHashSet.ts#L189)

Since v2.0.0

## make

Creates a MutableHashSet from a variable number of values.
Duplicates are automatically removed.

**When to use**

Use to build a mutable hash set from explicit values.

**Example** (Creating a set from values)

```ts
import { MutableHashSet } from "effect"

const set = MutableHashSet.make("apple", "banana", "apple", "cherry")

console.log(MutableHashSet.size(set)) // 3
console.log(Array.from(set)) // ["apple", "banana", "cherry"]

// With numbers
const numbers = MutableHashSet.make(1, 2, 3, 2, 1)
console.log(MutableHashSet.size(numbers)) // 3
console.log(Array.from(numbers)) // [1, 2, 3]

// Mixed types
const mixed = MutableHashSet.make("hello", 42, true, "hello")
console.log(MutableHashSet.size(mixed)) // 3
```

**Signature**

```ts
declare const make: <Keys extends ReadonlyArray<unknown>>(...keys: Keys) => MutableHashSet<Keys[number]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/MutableHashSet.ts#L223)

Since v2.0.0

# elements

## has

Checks whether the MutableHashSet contains the specified value.

**When to use**

Use to test whether a mutable set currently contains a value.

**Details**

Membership follows the same hashing and equality rules as the underlying
`MutableHashMap`.

**Example** (Checking for a value)

```ts
import { MutableHashSet } from "effect"

const set = MutableHashSet.make("apple", "banana", "cherry")

console.log(MutableHashSet.has(set, "apple")) // true
console.log(MutableHashSet.has(set, "grape")) // false

// Pipe-able version
const hasApple = MutableHashSet.has("apple")
console.log(hasApple(set)) // true

// Check after adding
MutableHashSet.add(set, "grape")
console.log(MutableHashSet.has(set, "grape")) // true
```

**See**

- `add` for adding a value to the set
- `remove` for removing a value from the set

**Signature**

```ts
declare const has: { <V>(key: V): (self: MutableHashSet<V>) => boolean; <V>(self: MutableHashSet<V>, key: V): boolean }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/MutableHashSet.ts#L307)

Since v2.0.0

## size

Returns the number of unique values in the MutableHashSet.

**When to use**

Use to read how many unique values are currently stored in the set.

**Example** (Checking set size)

```ts
import { MutableHashSet } from "effect"

const set = MutableHashSet.empty<string>()
console.log(MutableHashSet.size(set)) // 0

MutableHashSet.add(set, "apple")
MutableHashSet.add(set, "banana")
MutableHashSet.add(set, "apple") // Duplicate
console.log(MutableHashSet.size(set)) // 2

MutableHashSet.remove(set, "apple")
console.log(MutableHashSet.size(set)) // 1

MutableHashSet.clear(set)
console.log(MutableHashSet.size(set)) // 0
```

**Signature**

```ts
declare const size: <V>(self: MutableHashSet<V>) => number
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/MutableHashSet.ts#L388)

Since v2.0.0

# models

## MutableHashSet (interface)

A mutable hash set for storing unique values with Effect structural equality
support.

**When to use**

Use to store and mutate a collection of unique values with Effect hashing and
equality semantics.

**Details**

Operations mutate the set in place. Values that implement `Equal` / `Hash`
can be de-duplicated structurally; other values use normal JavaScript
reference or primitive equality.

**Example** (Using a mutable hash set)

```ts
import { MutableHashSet } from "effect"

// Create a mutable hash set
const set: MutableHashSet.MutableHashSet<string> = MutableHashSet.make("apple", "banana")

// Add elements
MutableHashSet.add(set, "cherry")

// Check if elements exist
console.log(MutableHashSet.has(set, "apple")) // true
console.log(MutableHashSet.has(set, "grape")) // false

// Iterate over elements
for (const value of set) {
  console.log(value) // "apple", "banana", "cherry"
}

// Get size
console.log(MutableHashSet.size(set)) // 3
```

**Signature**

```ts
export interface MutableHashSet<out V> extends Iterable<V>, Pipeable, Inspectable {
  readonly [TypeId]: typeof TypeId
  readonly keyMap: MutableHashMap.MutableHashMap<V, boolean>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/MutableHashSet.ts#L67)

Since v2.0.0

# mutations

## add

Adds a value to the MutableHashSet, mutating the set in place.
If the value already exists, the set remains unchanged.

**When to use**

Use to insert a value into a mutable set while keeping uniqueness.

**Example** (Adding values)

```ts
import { MutableHashSet } from "effect"

const set = MutableHashSet.empty<string>()

// Add new values
MutableHashSet.add(set, "apple")
MutableHashSet.add(set, "banana")

console.log(MutableHashSet.size(set)) // 2
console.log(MutableHashSet.has(set, "apple")) // true

// Add duplicate (no effect)
MutableHashSet.add(set, "apple")
console.log(MutableHashSet.size(set)) // 2

// Pipe-able version
const addFruit = MutableHashSet.add("cherry")
addFruit(set)
console.log(MutableHashSet.size(set)) // 3
```

**Signature**

```ts
declare const add: {
  <V>(key: V): (self: MutableHashSet<V>) => MutableHashSet<V>
  <V>(self: MutableHashSet<V>, key: V): MutableHashSet<V>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/MutableHashSet.ts#L262)

Since v2.0.0

## clear

Removes all values from the MutableHashSet, mutating the set in place.
The set becomes empty after this operation.

**When to use**

Use to empty a mutable set while keeping the same set instance.

**Example** (Clearing all values)

```ts
import { MutableHashSet } from "effect"

const set = MutableHashSet.make("apple", "banana", "cherry")

console.log(MutableHashSet.size(set)) // 3

// Clear all values
MutableHashSet.clear(set)

console.log(MutableHashSet.size(set)) // 0
console.log(MutableHashSet.has(set, "apple")) // false
console.log(Array.from(set)) // []

// Can still add new values after clearing
MutableHashSet.add(set, "new")
console.log(MutableHashSet.size(set)) // 1
```

**Signature**

```ts
declare const clear: <V>(self: MutableHashSet<V>) => MutableHashSet<V>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/MutableHashSet.ts#L422)

Since v2.0.0

## remove

Removes the specified value from the MutableHashSet, mutating the set in place.
If the value doesn't exist, the set remains unchanged.

**When to use**

Use to delete a value from a mutable set if it is present.

**Example** (Removing a value)

```ts
import { MutableHashSet } from "effect"

const set = MutableHashSet.make("apple", "banana", "cherry")

console.log(MutableHashSet.size(set)) // 3

// Remove existing value
MutableHashSet.remove(set, "banana")
console.log(MutableHashSet.size(set)) // 2
console.log(MutableHashSet.has(set, "banana")) // false

// Remove non-existent value (no effect)
MutableHashSet.remove(set, "grape")
console.log(MutableHashSet.size(set)) // 2

// Pipe-able version
const removeFruit = MutableHashSet.remove("apple")
removeFruit(set)
console.log(MutableHashSet.size(set)) // 1
```

**Signature**

```ts
declare const remove: {
  <V>(key: V): (self: MutableHashSet<V>) => MutableHashSet<V>
  <V>(self: MutableHashSet<V>, key: V): MutableHashSet<V>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/MutableHashSet.ts#L350)

Since v2.0.0

# refinements

## isMutableHashSet

Checks whether the specified value is a `MutableHashSet`, `false` otherwise.

**When to use**

Use to narrow an unknown value before treating it as a mutable hash set.

**Details**

The check looks for the `MutableHashSet` runtime marker.

**Gotchas**

Native `Set` values do not satisfy this check.

**See**

- `MutableHashSet` for the mutable hash set interface

**Signature**

```ts
declare const isMutableHashSet: <V>(value: unknown) => value is MutableHashSet<V>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/MutableHashSet.ts#L92)

Since v4.0.0
