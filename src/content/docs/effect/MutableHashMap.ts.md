---
title: MutableHashMap.ts
nav_order: 60
parent: "effect"
---

## MutableHashMap.ts overview

Stores key/value entries in a mutable hash map.

`MutableHashMap` updates the same collection in place and supports fast
lookup, insertion, removal, clearing, and iteration. It combines a native
`Map` for ordinary JavaScript keys with hash buckets for keys that implement
Effect `Equal` and `Hash`, so callers can mix reference-based and structural
lookup in the same collection.

Since v2.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [empty](#empty)
  - [fromIterable](#fromiterable)
  - [make](#make)
- [elements](#elements)
  - [get](#get)
  - [has](#has)
  - [keys](#keys)
  - [size](#size)
  - [values](#values)
- [models](#models)
  - [MutableHashMap (interface)](#mutablehashmap-interface)
- [mutations](#mutations)
  - [clear](#clear)
  - [modify](#modify)
  - [modifyAt](#modifyat)
  - [remove](#remove)
  - [set](#set)
- [predicates](#predicates)
  - [isEmpty](#isempty)
- [refinements](#refinements)
  - [isMutableHashMap](#ismutablehashmap)
- [traversing](#traversing)
  - [forEach](#foreach)

---

# constructors

## empty

Creates an empty MutableHashMap.

**When to use**

Use to create a fresh mutable map before adding entries over time.

**Details**

Each call returns a new empty map instance.

**Example** (Creating an empty map)

```ts
import { MutableHashMap } from "effect"

const map = MutableHashMap.empty<string, number>()

// Add some entries
MutableHashMap.set(map, "key1", 42)
MutableHashMap.set(map, "key2", 100)

console.log(MutableHashMap.size(map)) // 2
```

**See**

- `make` for creating a map from explicit entries
- `fromIterable` for creating a map from an iterable of entries

**Signature**

```ts
declare const empty: <K, V>() => MutableHashMap<K, V>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/MutableHashMap.ts#L154)

Since v2.0.0

## fromIterable

Creates a MutableHashMap from an iterable collection of key-value pairs.

**When to use**

Use to create a mutable hash map from an existing iterable of entries.

**Example** (Creating a map from an iterable)

```ts
import { MutableHashMap } from "effect"

const entries = [
  ["apple", 1],
  ["banana", 2],
  ["cherry", 3]
] as const

const map = MutableHashMap.fromIterable(entries)

console.log(MutableHashMap.get(map, "banana")) // Some(2)
console.log(MutableHashMap.size(map)) // 3

// Works with any iterable
const fromMap = MutableHashMap.fromIterable(
  new Map([
    ["x", 10],
    ["y", 20]
  ])
)
console.log(MutableHashMap.get(fromMap, "x")) // Some(10)
```

**See**

- `make` for creating a map from explicit entries
- `empty` for creating an empty map

**Signature**

```ts
declare const fromIterable: <K, V>(entries: Iterable<readonly [K, V]>) => MutableHashMap<K, V>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/MutableHashMap.ts#L230)

Since v2.0.0

## make

Creates a MutableHashMap from a variable number of key-value pairs.

**When to use**

Use to create a mutable hash map from explicit entries known at the call site.

**Example** (Creating a map from entries)

```ts
import { MutableHashMap } from "effect"

const map = MutableHashMap.make(["key1", 42], ["key2", 100], ["key3", 200])

console.log(MutableHashMap.get(map, "key1")) // Some(42)
console.log(MutableHashMap.size(map)) // 3
```

**See**

- `empty` for creating an empty map
- `fromIterable` for creating a map from an iterable of entries

**Signature**

```ts
declare const make: <Entries extends Array<readonly [any, any]>>(
  ...entries: Entries
) => MutableHashMap<
  Entries[number] extends readonly [infer K, any] ? K : never,
  Entries[number] extends readonly [any, infer V] ? V : never
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/MutableHashMap.ts#L189)

Since v2.0.0

# elements

## get

Looks up a key in the `MutableHashMap` safely.

**When to use**

Use to safely read a `MutableHashMap` value for a key as an `Option`.

**Details**

Returns `Some(value)` when an equal key is present and `None` when the key is
absent.

**Example** (Getting a value)

```ts
import { MutableHashMap } from "effect"

const map = MutableHashMap.make(["key1", 42], ["key2", 100])

console.log(MutableHashMap.get(map, "key1")) // Some(42)
console.log(MutableHashMap.get(map, "key3")) // None

// Pipe-able version
const getValue = MutableHashMap.get("key1")
console.log(getValue(map)) // Some(42)
```

**See**

- `has` for checking only whether a key is present
- `set` for inserting or replacing a value by key

**Signature**

```ts
declare const get: {
  <K>(key: K): <V>(self: MutableHashMap<K, V>) => Option.Option<V>
  <K, V>(self: MutableHashMap<K, V>, key: K): Option.Option<V>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/MutableHashMap.ts#L271)

Since v2.0.0

## has

Checks whether the MutableHashMap contains the specified key.

**When to use**

Use to test whether a key is present in a `MutableHashMap` without reading
its value.

**Example** (Checking for a key)

```ts
import { MutableHashMap } from "effect"

const map = MutableHashMap.make(["key1", 42], ["key2", 100])

console.log(MutableHashMap.has(map, "key1")) // true
console.log(MutableHashMap.has(map, "key3")) // false

// Pipe-able version
const hasKey = MutableHashMap.has("key1")
console.log(hasKey(map)) // true
```

**See**

- `get` for reading the value as an `Option`

**Signature**

```ts
declare const has: {
  <K>(key: K): <V>(self: MutableHashMap<K, V>) => boolean
  <K, V>(self: MutableHashMap<K, V>, key: K): boolean
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/MutableHashMap.ts#L411)

Since v2.0.0

## keys

Returns an iterable over the keys in the `MutableHashMap`.

**When to use**

Use to iterate over the keys currently stored in a mutable hash map.

**Example** (Reading keys)

```ts
import { MutableHashMap } from "effect"

const map = MutableHashMap.make(["apple", 1], ["banana", 2], ["cherry", 3])

const allKeys = Array.from(MutableHashMap.keys(map))
console.log(allKeys) // ["apple", "banana", "cherry"]

// Useful for iteration or validation
const hasRequiredKeys = allKeys.includes("apple") && allKeys.includes("banana")
```

**See**

- `values` for iterating over stored values
- `has` for checking one key without iterating

**Signature**

```ts
declare const keys: <K, V>(self: MutableHashMap<K, V>) => Iterable<K>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/MutableHashMap.ts#L329)

Since v3.8.0

## size

Returns the number of key-value pairs in the MutableHashMap.

**When to use**

Use to read how many entries are currently stored in the mutable hash map.

**Example** (Checking map size)

```ts
import { MutableHashMap } from "effect"

const map = MutableHashMap.empty<string, number>()
console.log(MutableHashMap.size(map)) // 0

MutableHashMap.set(map, "key1", 42)
MutableHashMap.set(map, "key2", 100)
console.log(MutableHashMap.size(map)) // 2

MutableHashMap.remove(map, "key1")
console.log(MutableHashMap.size(map)) // 1

MutableHashMap.clear(map)
console.log(MutableHashMap.size(map)) // 0
```

**See**

- `isEmpty` for checking whether the map has no entries

**Signature**

```ts
declare const size: <K, V>(self: MutableHashMap<K, V>) => number
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/MutableHashMap.ts#L805)

Since v2.0.0

## values

Returns an iterable over the values in the `MutableHashMap`.

**When to use**

Use to iterate over the values currently stored in a mutable hash map.

**Example** (Reading values)

```ts
import { MutableHashMap } from "effect"

const map = MutableHashMap.make(["apple", 1], ["banana", 2], ["cherry", 3])

const allValues = Array.from(MutableHashMap.values(map))
console.log(allValues) // [1, 2, 3]

// Useful for calculations
const total = allValues.reduce((sum, value) => sum + value, 0)
console.log(total) // 6

// Filter values
const largeValues = allValues.filter((value) => value > 1)
console.log(largeValues) // [2, 3]
```

**See**

- `keys` for iterating over stored keys

**Signature**

```ts
declare const values: <K, V>(self: MutableHashMap<K, V>) => Iterable<V>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/MutableHashMap.ts#L366)

Since v3.8.0

# models

## MutableHashMap (interface)

A mutable hash map that stores key-value pairs and supports both referential
and Effect structural equality.

**When to use**

Use as a mutable key-value map when in-place updates are acceptable and keys
may rely on Effect structural equality.

**Details**

Operations mutate the map in place. Keys that implement `Equal` / `Hash` can
be looked up structurally; other keys use normal JavaScript reference or
primitive equality.

**Example** (Using a mutable hash map)

```ts
import { MutableHashMap } from "effect"

// Create a mutable hash map with string keys and number values
const map: MutableHashMap.MutableHashMap<string, number> = MutableHashMap.empty()

// Add some data
MutableHashMap.set(map, "count", 42)
MutableHashMap.set(map, "total", 100)

// Use as iterable
for (const [key, value] of map) {
  console.log(`${key}: ${value}`)
}
// Output:
// count: 42
// total: 100

// Convert to array
const entries = Array.from(map)
console.log(entries) // [["count", 42], ["total", 100]]
```

**See**

- `empty` for creating an empty mutable hash map
- `get` for reading values by key
- `set` for mutating entries by key

**Signature**

```ts
export interface MutableHashMap<out K, out V> extends Iterable<[K, V]>, Pipeable, Inspectable {
  readonly [TypeId]: typeof TypeId
  readonly backing: Map<K, V>
  readonly buckets: Map<number, NonEmptyArray<K>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/MutableHashMap.ts#L73)

Since v2.0.0

# mutations

## clear

Removes all key-value pairs from the MutableHashMap, mutating the map in place.
The map becomes empty after this operation.

**When to use**

Use to empty a mutable hash map while keeping the same map instance.

**Example** (Clearing all entries)

```ts
import { MutableHashMap } from "effect"

const map = MutableHashMap.make(["key1", 42], ["key2", 100], ["key3", 200])

console.log(MutableHashMap.size(map)) // 3

// Clear all entries
MutableHashMap.clear(map)

console.log(MutableHashMap.size(map)) // 0
console.log(MutableHashMap.has(map, "key1")) // false

// Can still add new entries after clearing
MutableHashMap.set(map, "new", 999)
console.log(MutableHashMap.size(map)) // 1
```

**See**

- `remove` for deleting one key
- `empty` for creating a fresh empty map

**Signature**

```ts
declare const clear: <K, V>(self: MutableHashMap<K, V>) => MutableHashMap<K, V>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/MutableHashMap.ts#L768)

Since v2.0.0

## modify

Updates the value of the specified key within the MutableHashMap if it exists.
If the key doesn't exist, the map remains unchanged.

**When to use**

Use to transform an existing `MutableHashMap` value in place without
inserting missing keys.

**Example** (Modifying existing values)

```ts
import { MutableHashMap } from "effect"

const map = MutableHashMap.make(["count", 5], ["total", 100])

// Increment existing value
MutableHashMap.modify(map, "count", (n) => n + 1)
console.log(MutableHashMap.get(map, "count")) // Some(6)

// Double existing value
MutableHashMap.modify(map, "total", (n) => n * 2)
console.log(MutableHashMap.get(map, "total")) // Some(200)

// Try to modify non-existent key (no effect)
MutableHashMap.modify(map, "missing", (n) => n + 1)
console.log(MutableHashMap.has(map, "missing")) // false

// Pipe-able version
const increment = MutableHashMap.modify("count", (n: number) => n + 1)
increment(map)
```

**See**

- `set` for inserting or replacing a value directly
- `modifyAt` for handling both missing and existing keys

**Signature**

```ts
declare const modify: {
  <K, V>(key: K, f: (v: V) => V): (self: MutableHashMap<K, V>) => MutableHashMap<K, V>
  <K, V>(self: MutableHashMap<K, V>, key: K, f: (v: V) => V): MutableHashMap<K, V>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/MutableHashMap.ts#L544)

Since v2.0.0

## modifyAt

Updates or removes the specified key using a function from the current
optional value to the next optional value.

**When to use**

Use to decide whether to insert, update, or remove a key based on its current
optional value.

**Example** (Updating or removing a key)

```ts
import { MutableHashMap, Option } from "effect"

const map = MutableHashMap.make(["count", 5])

// Update existing key
MutableHashMap.modifyAt(map, "count", (option) => Option.map(option, (n) => n * 2))
console.log(MutableHashMap.get(map, "count")) // Some(10)

// Add new key
MutableHashMap.modifyAt(map, "new", (option) => (Option.isNone(option) ? Option.some(42) : option))
console.log(MutableHashMap.get(map, "new")) // Some(42)

// Remove key by returning None
MutableHashMap.modifyAt(map, "count", () => Option.none())
console.log(MutableHashMap.has(map, "count")) // false

// Conditional update
MutableHashMap.modifyAt(
  map,
  "new",
  (option) => Option.filter(option, (n) => n > 50) // Remove if <= 50
)
console.log(MutableHashMap.has(map, "new")) // false (42 <= 50)
```

**See**

- `modify` for updating only when the key already exists
- `set` for inserting or replacing directly
- `remove` for deleting directly

**Signature**

```ts
declare const modifyAt: {
  <K, V>(key: K, f: (value: Option.Option<V>) => Option.Option<V>): (self: MutableHashMap<K, V>) => MutableHashMap<K, V>
  <K, V>(self: MutableHashMap<K, V>, key: K, f: (value: Option.Option<V>) => Option.Option<V>): MutableHashMap<K, V>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/MutableHashMap.ts#L630)

Since v2.0.0

## remove

Removes the specified key from the MutableHashMap, mutating the map in place.
If the key doesn't exist, the map remains unchanged.

**When to use**

Use to delete one key from a mutable hash map in place.

**Example** (Removing a key)

```ts
import { MutableHashMap } from "effect"

const map = MutableHashMap.make(["key1", 42], ["key2", 100], ["key3", 200])

console.log(MutableHashMap.size(map)) // 3

// Remove existing key
MutableHashMap.remove(map, "key2")
console.log(MutableHashMap.size(map)) // 2
console.log(MutableHashMap.has(map, "key2")) // false

// Remove non-existent key (no effect)
MutableHashMap.remove(map, "nonexistent")
console.log(MutableHashMap.size(map)) // 2

// Pipe-able version
const removeKey = MutableHashMap.remove("key1")
removeKey(map)
console.log(MutableHashMap.size(map)) // 1
```

**See**

- `clear` for removing all entries
- `modifyAt` for conditionally removing based on the current value

**Signature**

```ts
declare const remove: {
  <K>(key: K): <V>(self: MutableHashMap<K, V>) => MutableHashMap<K, V>
  <K, V>(self: MutableHashMap<K, V>, key: K): MutableHashMap<K, V>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/MutableHashMap.ts#L698)

Since v2.0.0

## set

Sets a key-value pair in the MutableHashMap, mutating the map in place.
If the key already exists, its value is updated.

**When to use**

Use to insert a new `MutableHashMap` entry or replace an existing entry in
place.

**Example** (Setting key-value pairs)

```ts
import { MutableHashMap } from "effect"

const map = MutableHashMap.empty<string, number>()

// Add new entries
MutableHashMap.set(map, "key1", 42)
MutableHashMap.set(map, "key2", 100)

console.log(MutableHashMap.get(map, "key1")) // Some(42)
console.log(MutableHashMap.size(map)) // 2

// Update existing entry
MutableHashMap.set(map, "key1", 999)
console.log(MutableHashMap.get(map, "key1")) // Some(999)

// Pipe-able version
const setKey = MutableHashMap.set("key3", 300)
setKey(map)
console.log(MutableHashMap.size(map)) // 3
```

**See**

- `modify` for updating an existing value with a function
- `modifyAt` for setting or removing based on the current optional value
- `remove` for deleting an entry by key

**Signature**

```ts
declare const set: {
  <K, V>(key: K, value: V): (self: MutableHashMap<K, V>) => MutableHashMap<K, V>
  <K, V>(self: MutableHashMap<K, V>, key: K, value: V): MutableHashMap<K, V>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/MutableHashMap.ts#L459)

Since v2.0.0

# predicates

## isEmpty

Returns `true` when the `MutableHashMap` contains no key-value pairs.

**When to use**

Use to branch on whether a mutable map currently has any entries.

**See**

- `size` for reading the exact number of entries

**Signature**

```ts
declare const isEmpty: <K, V>(self: MutableHashMap<K, V>) => boolean
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/MutableHashMap.ts#L819)

Since v2.0.0

# refinements

## isMutableHashMap

Checks whether the specified value is a `MutableHashMap`, `false` otherwise.

**When to use**

Use to narrow an unknown value before treating it as a mutable hash map.

**Details**

The check looks for the `MutableHashMap` runtime marker.

**Gotchas**

The check does not validate the key or value types carried by the map.

**See**

- `MutableHashMap` for the mutable hash map interface

**Signature**

```ts
declare const isMutableHashMap: <K, V>(value: unknown) => value is MutableHashMap<K, V>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/MutableHashMap.ts#L99)

Since v4.0.0

# traversing

## forEach

Runs a callback for each key-value pair in the `MutableHashMap`.

**When to use**

Use to run a synchronous side-effecting callback for every key-value pair in
an existing mutable map.

**Details**

Iteration follows the backing map's order. The callback receives the value
first and the key second, matching `Map.prototype.forEach`.

**See**

- `keys` for iterating only keys
- `values` for iterating only values

**Signature**

```ts
declare const forEach: {
  <K, V>(f: (value: V, key: K) => void): (self: MutableHashMap<K, V>) => void
  <K, V>(self: MutableHashMap<K, V>, f: (value: V, key: K) => void): void
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/MutableHashMap.ts#L840)

Since v2.0.0
