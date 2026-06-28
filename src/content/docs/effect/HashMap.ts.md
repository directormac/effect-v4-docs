---
title: HashMap.ts
nav_order: 42
parent: "effect"
---

## HashMap.ts overview

Stores key/value entries in an immutable hash map.

A `HashMap<Key, Value>` hashes keys and resolves matches with Effect's
structural equality rules. Lookup, insertion, removal, and transformation
operations return new maps, while temporary mutation helpers support efficient
batch updates. This module also includes constructors, iteration, conversion,
mapping, filtering, and reducing helpers.

Since v2.0.0

---

## Exports Grouped by Category

- [combining](#combining)
  - [union](#union)
- [constructors](#constructors)
  - [empty](#empty)
  - [fromIterable](#fromiterable)
  - [make](#make)
- [elements](#elements)
  - [every](#every)
  - [findFirst](#findfirst)
  - [get](#get)
  - [getHash](#gethash)
  - [has](#has)
  - [hasBy](#hasby)
  - [hasHash](#hashash)
  - [isEmpty](#isempty)
  - [some](#some)
- [filtering](#filtering)
  - [compact](#compact)
  - [filter](#filter)
  - [filterMap](#filtermap)
- [folding](#folding)
  - [reduce](#reduce)
- [getters](#getters)
  - [entries](#entries)
  - [keys](#keys)
  - [size](#size)
  - [toEntries](#toentries)
  - [toValues](#tovalues)
  - [values](#values)
- [mapping](#mapping)
  - [map](#map)
- [models](#models)
  - [HashMap (interface)](#hashmap-interface)
- [mutations](#mutations)
  - [beginMutation](#beginmutation)
  - [endMutation](#endmutation)
  - [mutate](#mutate)
- [refinements](#refinements)
  - [isHashMap](#ishashmap)
- [sequencing](#sequencing)
  - [flatMap](#flatmap)
- [transforming](#transforming)
  - [modify](#modify)
  - [modifyAt](#modifyat)
  - [modifyHash](#modifyhash)
  - [remove](#remove)
  - [removeMany](#removemany)
  - [set](#set)
  - [setMany](#setmany)
- [traversing](#traversing)
  - [forEach](#foreach)
- [unsafe](#unsafe)
  - [getUnsafe](#getunsafe)
- [utils](#utils)
  - [HashMap (namespace)](#hashmap-namespace)
    - [UpdateFn (type alias)](#updatefn-type-alias)
    - [Key (type alias)](#key-type-alias)
    - [Value (type alias)](#value-type-alias)
    - [Entry (type alias)](#entry-type-alias)

---

# combining

## union

Combines two `HashMap`s into one.

**Details**

Entries from `that` are inserted into `self`; when both maps contain an
equal key, the value from `that` replaces the value from `self`.

**Example** (Combining HashMaps)

```ts
import { HashMap } from "effect"

const map1 = HashMap.make(["a", 1], ["b", 2])
const map2 = HashMap.make(["b", 20], ["c", 3])
const union = HashMap.union(map1, map2)

console.log(HashMap.size(union)) // 3
console.log(HashMap.get(union, "b")) // Option.some(20) - map2 wins
```

**Signature**

```ts
declare const union: {
  <K1, V1>(that: HashMap<K1, V1>): <K0, V0>(self: HashMap<K0, V0>) => HashMap<K1 | K0, V1 | V0>
  <K0, V0, K1, V1>(self: HashMap<K0, V0>, that: HashMap<K1, V1>): HashMap<K0 | K1, V0 | V1>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HashMap.ts#L912)

Since v2.0.0

# constructors

## empty

Creates a new empty `HashMap`.

**Example** (Creating an empty HashMap)

```ts
import { HashMap } from "effect"

const map = HashMap.empty<string, number>()
console.log(HashMap.isEmpty(map)) // true
console.log(HashMap.size(map)) // 0
```

**Signature**

```ts
declare const empty: <K = never, V = never>() => HashMap<K, V>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HashMap.ts#L246)

Since v2.0.0

## fromIterable

Creates a new `HashMap` from an iterable collection of key/value pairs.

**Example** (Creating a HashMap from an iterable)

```ts
import { HashMap } from "effect"

const entries = [
  ["a", 1],
  ["b", 2],
  ["c", 3]
] as const
const map = HashMap.fromIterable(entries)
console.log(HashMap.size(map)) // 3
console.log(HashMap.get(map, "a")) // Option.some(1)
```

**Signature**

```ts
declare const fromIterable: <K, V>(entries: Iterable<readonly [K, V]>) => HashMap<K, V>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HashMap.ts#L288)

Since v2.0.0

## make

Constructs a new `HashMap` from an array of key/value pairs.

**Example** (Creating a HashMap from entries)

```ts
import { HashMap } from "effect"

const map = HashMap.make(["a", 1], ["b", 2], ["c", 3])
console.log(HashMap.size(map)) // 3
console.log(HashMap.get(map, "b")) // Option.some(2)
```

**Signature**

```ts
declare const make: <Entries extends ReadonlyArray<readonly [any, any]>>(
  ...entries: Entries
) => HashMap<
  Entries[number] extends readonly [infer K, any] ? K : never,
  Entries[number] extends readonly [any, infer V] ? V : never
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HashMap.ts#L264)

Since v2.0.0

# elements

## every

Checks whether all entries in a hashmap meets a specific condition.

**Example** (Checking all entries)

```ts
import { HashMap } from "effect"

const map = HashMap.make(["a", 1], ["b", 2], ["c", 3])

console.log(HashMap.every(map, (value) => value > 0)) // true
console.log(HashMap.every(map, (value) => value > 1)) // false
```

**Signature**

```ts
declare const every: {
  <K, A>(predicate: (a: NoInfer<A>, k: K) => boolean): (self: HashMap<K, A>) => boolean
  <K, A>(self: HashMap<K, A>, predicate: (a: A, k: K) => boolean): boolean
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HashMap.ts#L1233)

Since v3.14.0

## findFirst

Returns the first element that satisfies the specified
predicate, or `None` if no such element exists.

**Example** (Finding the first matching entry)

```ts
import { HashMap, Option } from "effect"

const map = HashMap.make(["a", 1], ["b", 2], ["c", 3])
const result = HashMap.findFirst(map, (value, key) => key === "b" && value > 1)
console.log(result) // Option.some(["b", 2])
console.log(Option.getOrElse(result, () => ["", 0])) // ["b", 2]
```

**Signature**

```ts
declare const findFirst: {
  <K, A>(predicate: (a: NoInfer<A>, k: K) => boolean): (self: HashMap<K, A>) => Option<[K, A]>
  <K, A>(self: HashMap<K, A>, predicate: (a: A, k: K) => boolean): Option<[K, A]>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HashMap.ts#L1189)

Since v2.0.0

## get

Looks up the value for the specified key in the `HashMap` safely using the
internal hashing function.

**Example** (Looking up values)

```ts
import { HashMap } from "effect"

const map = HashMap.make(["a", 1], ["b", 2])

console.log(HashMap.get(map, "a")) // Option.some(1)
console.log(HashMap.get(map, "c")) // Option.none()

// Using pipe syntax
const value = HashMap.get("b")(map)
console.log(value) // Option.some(2)
```

**Signature**

```ts
declare const get: {
  <K1 extends K, K>(key: K1): <V>(self: HashMap<K, V>) => Option<V>
  <K1 extends K, K, V>(self: HashMap<K, V>, key: K1): Option<V>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HashMap.ts#L332)

Since v2.0.0

## getHash

Looks up the value for the specified key in the `HashMap` safely using a custom hash.

**Example** (Looking up values with a hash)

```ts
import { Hash, HashMap } from "effect"

// Useful when implementing custom equality for complex keys
const userMap = HashMap.make(["user123", { name: "Alice", role: "admin" }], ["user456", { name: "Bob", role: "user" }])

// Use precomputed hash for performance in hot paths
const userId = "user123"
const precomputedHash = Hash.string(userId)

// Lookup with custom hash (e.g., cached hash value)
const user = HashMap.getHash(userMap, userId, precomputedHash)
console.log(user) // Option.some({ name: "Alice", role: "admin" })

// This avoids recomputing the hash when you already have it
const notFound = HashMap.getHash(userMap, "user999", Hash.string("user999"))
console.log(notFound) // Option.none()
```

**Signature**

```ts
declare const getHash: {
  <K1 extends K, K>(key: K1, hash: number): <V>(self: HashMap<K, V>) => Option<V>
  <K1 extends K, K, V>(self: HashMap<K, V>, key: K1, hash: number): Option<V>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HashMap.ts#L367)

Since v2.0.0

## has

Checks whether the specified key has an entry in the `HashMap`.

**Example** (Checking for keys)

```ts
import { HashMap } from "effect"

const map = HashMap.make(["a", 1], ["b", 2])

console.log(HashMap.has(map, "a")) // true
console.log(HashMap.has(map, "c")) // false

// Using pipe syntax
const hasB = HashMap.has("b")(map)
console.log(hasB) // true
```

**Signature**

```ts
declare const has: {
  <K1 extends K, K>(key: K1): <K, V>(self: HashMap<K, V>) => boolean
  <K1 extends K, K, V>(self: HashMap<K, V>, key: K1): boolean
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HashMap.ts#L440)

Since v2.0.0

## hasBy

Checks whether an element matching the given predicate exists in the given `HashMap`.

**Example** (Checking entries by predicate)

```ts
import { HashMap } from "effect"

const hm = HashMap.make([1, "a"])
HashMap.hasBy(hm, (value, key) => value === "a" && key === 1) // -> true
HashMap.hasBy(hm, (value) => value === "b") // -> false
```

**Signature**

```ts
declare const hasBy: {
  <K, V>(predicate: (value: NoInfer<V>, key: NoInfer<K>) => boolean): (self: HashMap<K, V>) => boolean
  <K, V>(self: HashMap<K, V>, predicate: (value: NoInfer<V>, key: NoInfer<K>) => boolean): boolean
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HashMap.ts#L496)

Since v3.16.0

## hasHash

Checks whether the specified key has an entry in the `HashMap` using a custom
hash.

**Example** (Checking keys with a hash)

```ts
import { Hash, HashMap } from "effect"

// Create a map with case-sensitive keys
const userMap = HashMap.make(["Admin", { role: "administrator" }], ["User", { role: "standard" }])

// Check with exact hash
const exactHash = Hash.string("Admin")
console.log(HashMap.hasHash(userMap, "Admin", exactHash)) // true

// A matching hash does not override key equality
console.log(HashMap.hasHash(userMap, "admin", exactHash)) // false

// A different hash also cannot find the existing key
const lowercaseHash = Hash.string("admin")
console.log(HashMap.hasHash(userMap, "Admin", lowercaseHash)) // false
```

**Signature**

```ts
declare const hasHash: {
  <K1 extends K, K>(key: K1, hash: number): <V>(self: HashMap<K, V>) => boolean
  <K1 extends K, K, V>(self: HashMap<K, V>, key: K1, hash: number): boolean
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HashMap.ts#L475)

Since v2.0.0

## isEmpty

Checks whether the `HashMap` contains no entries.

**Example** (Checking for empty HashMaps)

```ts
import { HashMap } from "effect"

const emptyMap = HashMap.empty<string, number>()
const nonEmptyMap = HashMap.make(["a", 1])

console.log(HashMap.isEmpty(emptyMap)) // true
console.log(HashMap.isEmpty(nonEmptyMap)) // false
```

**Signature**

```ts
declare const isEmpty: <K, V>(self: HashMap<K, V>) => boolean
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HashMap.ts#L308)

Since v2.0.0

## some

Checks whether any entry in a hashmap meets a specific condition.

**Example** (Checking for any matching entry)

```ts
import { HashMap } from "effect"

const map = HashMap.make(["a", 1], ["b", 2], ["c", 3])

console.log(HashMap.some(map, (value) => value > 2)) // true
console.log(HashMap.some(map, (value) => value > 5)) // false
```

**Signature**

```ts
declare const some: {
  <K, A>(predicate: (a: NoInfer<A>, k: K) => boolean): (self: HashMap<K, A>) => boolean
  <K, A>(self: HashMap<K, A>, predicate: (a: A, k: K) => boolean): boolean
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HashMap.ts#L1211)

Since v3.13.0

# filtering

## compact

Filters out `None` values from a `HashMap` of `Options`s.

**Example** (Compacting Option values)

```ts
import { HashMap, Option } from "effect"

const map1 = HashMap.make(["a", Option.some(1)], ["b", Option.none()], ["c", Option.some(3)])
const map2 = HashMap.compact(map1)

console.log(HashMap.size(map2)) // 2
console.log(HashMap.get(map2, "a")) // Option.some(1)
console.log(HashMap.has(map2, "b")) // false
```

**Signature**

```ts
declare const compact: <K, A>(self: HashMap<K, Option<A>>) => HashMap<K, A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HashMap.ts#L1141)

Since v2.0.0

## filter

Filters entries out of a `HashMap` using the specified predicate.

**Example** (Filtering entries)

```ts
import { HashMap } from "effect"

const map1 = HashMap.make(["a", 1], ["b", 2], ["c", 3], ["d", 4])
const map2 = HashMap.filter(map1, (value) => value % 2 === 0)

console.log(HashMap.size(map2)) // 2
console.log(HashMap.has(map2, "b")) // true
console.log(HashMap.has(map2, "d")) // true
console.log(HashMap.has(map2, "a")) // false
```

**Signature**

```ts
declare const filter: {
  <K, A>(f: (a: NoInfer<A>, k: K) => boolean): (self: HashMap<K, A>) => HashMap<K, A>
  <K, A>(self: HashMap<K, A>, f: (a: A, k: K) => boolean): HashMap<K, A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HashMap.ts#L1113)

Since v2.0.0

## filterMap

Maps over the entries of the `HashMap` using the specified filter and keeps
only successful results.

**Example** (Filtering and mapping Results)

```ts
import { HashMap, Result } from "effect"

const map1 = HashMap.make(["a", 1], ["b", 2], ["c", 3], ["d", 4])
const map2 = HashMap.filterMap(map1, (value) => (value % 2 === 0 ? Result.succeed(value * 2) : Result.failVoid))

console.log(HashMap.size(map2)) // 2
console.log(HashMap.get(map2, "b")) // Option.some(4)
console.log(HashMap.get(map2, "d")) // Option.some(8)
```

**Signature**

```ts
declare const filterMap: {
  <A, K, B, X>(f: (input: A, key: K) => Result<B, X>): (self: HashMap<K, A>) => HashMap<K, B>
  <K, A, B, X>(self: HashMap<K, A>, f: (input: A, key: K) => Result<B, X>): HashMap<K, B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HashMap.ts#L1166)

Since v2.0.0

# folding

## reduce

Reduces the specified state over the entries of the `HashMap`.

**Example** (Reducing values)

```ts
import { HashMap } from "effect"

const map = HashMap.make(["a", 1], ["b", 2], ["c", 3])
const sum = HashMap.reduce(map, 0, (acc, value) => acc + value)

console.log(sum) // 6
```

**Signature**

```ts
declare const reduce: {
  <Z, V, K>(zero: Z, f: (accumulator: Z, value: V, key: K) => Z): (self: HashMap<K, V>) => Z
  <K, V, Z>(self: HashMap<K, V>, zero: Z, f: (accumulator: Z, value: V, key: K) => Z): Z
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HashMap.ts#L1088)

Since v2.0.0

# getters

## entries

Returns an `IterableIterator` of the entries within the `HashMap`.

**Example** (Iterating entries)

```ts
import { HashMap } from "effect"

// Create a configuration map
const config = HashMap.make(["database.host", "localhost"], ["database.port", "5432"], ["cache.enabled", "true"])

// Sort the derived array for deterministic output
const settings = Array.from(HashMap.entries(config))
  .sort(([left], [right]) => left.localeCompare(right))
  .map(([key, value]) => `Setting ${key} = ${value}`)

console.log(settings)
// ["Setting cache.enabled = true", "Setting database.host = localhost", "Setting database.port = 5432"]

// Convert to array when you need all entries at once
const allEntries = Array.from(HashMap.entries(config))
console.log(allEntries.length) // 3
```

**Signature**

```ts
declare const entries: <K, V>(self: HashMap<K, V>) => IterableIterator<[K, V]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HashMap.ts#L627)

Since v2.0.0

## keys

Returns an `IterableIterator` of the keys within the `HashMap`.

**Example** (Iterating keys)

```ts
import { HashMap } from "effect"

const map = HashMap.make(["a", 1], ["b", 2], ["c", 3])
const keys = Array.from(HashMap.keys(map))
console.log(keys.sort()) // ["a", "b", "c"]
```

**Signature**

```ts
declare const keys: <K, V>(self: HashMap<K, V>) => IterableIterator<K>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HashMap.ts#L544)

Since v2.0.0

## size

Returns the number of entries within the `HashMap`.

**Example** (Getting the size)

```ts
import { HashMap } from "effect"

const emptyMap = HashMap.empty<string, number>()
const map = HashMap.make(["a", 1], ["b", 2], ["c", 3])

console.log(HashMap.size(emptyMap)) // 0
console.log(HashMap.size(map)) // 3
```

**Signature**

```ts
declare const size: <K, V>(self: HashMap<K, V>) => number
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HashMap.ts#L681)

Since v2.0.0

## toEntries

Returns an `Array<[K, V]>` of the entries within the `HashMap`.

**Example** (Converting entries to an array)

```ts
import { HashMap } from "effect"

const gameScores = HashMap.make(["alice", 1250], ["bob", 980], ["charlie", 1100])

// Convert to entries for processing
const scoreEntries = HashMap.toEntries(gameScores)

// Sort by score (descending)
const leaderboard = scoreEntries
  .sort(([, a], [, b]) => b - a)
  .map(([player, score], rank) => `${rank + 1}. ${player}: ${score}`)

console.log(leaderboard)
// ["1. alice: 1250", "2. charlie: 1100", "3. bob: 980"]

// Convert back to HashMap if needed
const sortedMap = HashMap.fromIterable(scoreEntries)
```

**Signature**

```ts
declare const toEntries: <K, V>(self: HashMap<K, V>) => Array<[K, V]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HashMap.ts#L661)

Since v2.0.0

## toValues

Returns an `Array` of the values within the `HashMap`.

**Example** (Converting values to an array)

```ts
import { HashMap } from "effect"

const employees = HashMap.make(
  ["alice", { department: "engineering", salary: 90000 }],
  ["bob", { department: "marketing", salary: 75000 }],
  ["charlie", { department: "engineering", salary: 95000 }]
)

// Extract all employee records
const allEmployees = HashMap.toValues(employees)
console.log(allEmployees.length) // 3

// Calculate total salary
const totalSalary = allEmployees.reduce((sum, emp) => sum + emp.salary, 0)
console.log(totalSalary) // 260000

// Filter by department
const engineers = allEmployees.filter((emp) => emp.department === "engineering")
console.log(engineers.length) // 2
```

**Signature**

```ts
declare const toValues: <K, V>(self: HashMap<K, V>) => Array<V>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HashMap.ts#L594)

Since v3.13.0

## values

Returns an `IterableIterator` of the values within the `HashMap`.

**Example** (Iterating values)

```ts
import { HashMap } from "effect"

const map = HashMap.make(["a", 1], ["b", 2], ["c", 3])
const values = Array.from(HashMap.values(map))
console.log(values.sort()) // [1, 2, 3]
```

**Signature**

```ts
declare const values: <K, V>(self: HashMap<K, V>) => IterableIterator<V>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HashMap.ts#L562)

Since v2.0.0

# mapping

## map

Maps over the entries of the `HashMap` using the specified function.

**Example** (Mapping values)

```ts
import { HashMap } from "effect"

const map1 = HashMap.make(["a", 1], ["b", 2], ["c", 3])
const map2 = HashMap.map(map1, (value, key) => `${key}:${value * 2}`)

console.log(HashMap.get(map2, "a")) // Option.some("a:2")
console.log(HashMap.get(map2, "b")) // Option.some("b:4")
```

**Signature**

```ts
declare const map: {
  <A, V, K>(f: (value: V, key: K) => A): (self: HashMap<K, V>) => HashMap<K, A>
  <K, V, A>(self: HashMap<K, V>, f: (value: V, key: K) => A): HashMap<K, A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HashMap.ts#L1009)

Since v2.0.0

# models

## HashMap (interface)

A HashMap is an immutable key-value data structure that provides efficient lookup,
insertion, and deletion operations. It uses a Hash Array Mapped Trie (HAMT) internally
for structural sharing and optimal performance.

**Example** (Using basic HashMap operations)

```ts
import { HashMap } from "effect"

// Create a HashMap
const map = HashMap.make(["a", 1], ["b", 2], ["c", 3])

// Access values
const valueA = HashMap.get(map, "a") // Option.some(1)
const valueD = HashMap.get(map, "d") // Option.none()

// Check if key exists
console.log(HashMap.has(map, "b")) // true

// Add/update values (returns new HashMap)
const updated = HashMap.set(map, "d", 4)
console.log(HashMap.size(updated)) // 4
```

**Signature**

```ts
export interface HashMap<out Key, out Value> extends Iterable<[Key, Value]>, Equal, Pipeable, Inspectable {
  readonly [TypeId]: typeof TypeId
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HashMap.ts#L51)

Since v2.0.0

# mutations

## beginMutation

Creates a transient mutable `HashMap` for efficient batched updates.

**Details**

Apply updates to the returned map, then call `endMutation` to finish the
mutation window and use the result as an immutable `HashMap`.

**Example** (Beginning batch mutation)

```ts
import { HashMap } from "effect"

const map = HashMap.make(["a", 1])

// Begin mutation for efficient batch operations
const mutable = HashMap.beginMutation(map)

// Multiple operations are now more efficient
HashMap.set(mutable, "b", 2)
HashMap.set(mutable, "c", 3)
HashMap.remove(mutable, "a")

// End mutation to get final immutable result
const result = HashMap.endMutation(mutable)
console.log(HashMap.size(result)) // 2
```

**Signature**

```ts
declare const beginMutation: <K, V>(self: HashMap<K, V>) => HashMap<K, V>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HashMap.ts#L714)

Since v2.0.0

## endMutation

Marks the `HashMap` as immutable, completing the mutation cycle.

**Example** (Ending batch mutation)

```ts
import { HashMap } from "effect"

// Start with an existing map
const original = HashMap.make(["x", 10], ["y", 20])

// Begin mutation for batch operations
const mutable = HashMap.beginMutation(original)

// Perform multiple efficient operations
HashMap.set(mutable, "z", 30)
HashMap.remove(mutable, "x")
HashMap.set(mutable, "w", 40)

// End mutation to get final immutable result
const final = HashMap.endMutation(mutable)

console.log(HashMap.size(final)) // 3
console.log(HashMap.has(final, "x")) // false
console.log(HashMap.get(final, "z")) // Option.some(30)
```

**Signature**

```ts
declare const endMutation: <K, V>(self: HashMap<K, V>) => HashMap<K, V>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HashMap.ts#L746)

Since v2.0.0

## mutate

Runs a batch of updates against a transient mutable copy of the `HashMap`
and returns the finalized immutable result.

**Details**

The callback may call mutation-oriented helpers such as `set` and `remove`
on the transient map.

**Example** (Applying batched mutations)

```ts
import { HashMap } from "effect"

const map1 = HashMap.make(["a", 1])
const map2 = HashMap.mutate(map1, (mutable) => {
  HashMap.set(mutable, "b", 2)
  HashMap.set(mutable, "c", 3)
})
// Returns a new HashMap with mutations applied
```

**Signature**

```ts
declare const mutate: {
  <K, V>(f: (self: HashMap<K, V>) => void): (self: HashMap<K, V>) => HashMap<K, V>
  <K, V>(self: HashMap<K, V>, f: (self: HashMap<K, V>) => void): HashMap<K, V>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HashMap.ts#L773)

Since v2.0.0

# refinements

## isHashMap

Checks whether a value is a HashMap.

**Example** (Checking HashMap values)

```ts
import { HashMap } from "effect"

const map = HashMap.make(["a", 1], ["b", 2])
const notMap = { a: 1 }

console.log(HashMap.isHashMap(map)) // true
console.log(HashMap.isHashMap(notMap)) // false
console.log(HashMap.isHashMap(null)) // false
```

**Signature**

```ts
declare const isHashMap: {
  <K, V>(u: Iterable<readonly [K, V]>): u is HashMap<K, V>
  (u: unknown): u is HashMap<unknown, unknown>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HashMap.ts#L225)

Since v2.0.0

# sequencing

## flatMap

Maps each entry to a `HashMap` and flattens the results.

**Gotchas**

The hash and equality behavior of both maps have to be the same.

**Example** (Flat mapping values)

```ts
import { HashMap } from "effect"

const map1 = HashMap.make(["a", 1], ["b", 2])
const map2 = HashMap.flatMap(map1, (value, key) => HashMap.make([key + "1", value], [key + "2", value * 2]))

console.log(HashMap.size(map2)) // 4
console.log(HashMap.get(map2, "a1")) // Option.some(1)
console.log(HashMap.get(map2, "b2")) // Option.some(4)
```

**Signature**

```ts
declare const flatMap: {
  <A, K, B>(f: (value: A, key: K) => HashMap<K, B>): (self: HashMap<K, A>) => HashMap<K, B>
  <K, A, B>(self: HashMap<K, A>, f: (value: A, key: K) => HashMap<K, B>): HashMap<K, B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HashMap.ts#L1040)

Since v2.0.0

# transforming

## modify

Updates the value of the specified key within the `HashMap` if it exists.

**Example** (Modifying existing values)

```ts
import { HashMap } from "effect"

const map1 = HashMap.make(["a", 1], ["b", 2])
const map2 = HashMap.modify(map1, "a", (value) => value * 3)

console.log(HashMap.get(map2, "a")) // Option.some(3)
console.log(HashMap.get(map2, "b")) // Option.some(2)
```

**Signature**

```ts
declare const modify: {
  <K, V>(key: K, f: (v: V) => V): (self: HashMap<K, V>) => HashMap<K, V>
  <K, V>(self: HashMap<K, V>, key: K, f: (v: V) => V): HashMap<K, V>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HashMap.ts#L883)

Since v2.0.0

## modifyAt

Sets or removes the specified key using an update function.

**Details**

The update function receives `Some(value)` when the key exists or `None`
when it does not. Returning `Some(newValue)` stores the value, and returning
`None` removes the key or leaves it absent.

**Example** (Updating values with Options)

```ts
import { HashMap, Option } from "effect"

const map = HashMap.make(["a", 1], ["b", 2])

// Increment existing value or set to 1 if not present
const updateFn = (option: Option.Option<number>) =>
  Option.isSome(option) ? Option.some(option.value + 1) : Option.some(1)

const updated = HashMap.modifyAt(map, "a", updateFn)
console.log(HashMap.get(updated, "a")) // Option.some(2)
```

**Signature**

```ts
declare const modifyAt: {
  <K, V>(key: K, f: HashMap.UpdateFn<V>): (self: HashMap<K, V>) => HashMap<K, V>
  <K, V>(self: HashMap<K, V>, key: K, f: HashMap.UpdateFn<V>): HashMap<K, V>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HashMap.ts#L805)

Since v2.0.0

## modifyHash

Sets or removes the specified key using a precomputed hash and an update
function.

**Details**

The update function receives `Some(value)` when the key exists or `None`
when it does not. Returning `Some(newValue)` stores the value, and returning
`None` removes the key or leaves it absent.

**Example** (Updating values with a hash)

```ts
import { Hash, HashMap, Option } from "effect"

// Useful when working with precomputed hashes for performance
const counters = HashMap.make(["downloads", 100], ["views", 250])

// Cache hash computation for frequently accessed keys
const metricKey = "downloads"
const cachedHash = Hash.string(metricKey)

// Update function that increments counter or initializes to 1
const incrementCounter = (current: Option.Option<number>) =>
  Option.isSome(current) ? Option.some(current.value + 1) : Option.some(1)

// Use cached hash for efficient updates in loops
const updated = HashMap.modifyHash(counters, metricKey, cachedHash, incrementCounter)
console.log(HashMap.get(updated, "downloads")) // Option.some(101)

// Add new metric with precomputed hash
const newMetric = "clicks"
const clicksHash = Hash.string(newMetric)
const withClicks = HashMap.modifyHash(updated, newMetric, clicksHash, incrementCounter)
console.log(HashMap.get(withClicks, "clicks")) // Option.some(1)
```

**Signature**

```ts
declare const modifyHash: {
  <K, V>(key: K, hash: number, f: HashMap.UpdateFn<V>): (self: HashMap<K, V>) => HashMap<K, V>
  <K, V>(self: HashMap<K, V>, key: K, hash: number, f: HashMap.UpdateFn<V>): HashMap<K, V>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HashMap.ts#L860)

Since v2.0.0

## remove

Removes the entry for the specified key in the `HashMap` using the internal
hashing function.

**Example** (Removing a key)

```ts
import { HashMap } from "effect"

const map1 = HashMap.make(["a", 1], ["b", 2], ["c", 3])
const map2 = HashMap.remove(map1, "b")

console.log(HashMap.size(map2)) // 2
console.log(HashMap.has(map2, "b")) // false
console.log(HashMap.has(map2, "a")) // true
```

**Signature**

```ts
declare const remove: {
  <K>(key: K): <V>(self: HashMap<K, V>) => HashMap<K, V>
  <K, V>(self: HashMap<K, V>, key: K): HashMap<K, V>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HashMap.ts#L937)

Since v2.0.0

## removeMany

Removes all entries in the `HashMap` which have the specified keys.

**Example** (Removing multiple keys)

```ts
import { HashMap } from "effect"

const map1 = HashMap.make(["a", 1], ["b", 2], ["c", 3], ["d", 4])
const map2 = HashMap.removeMany(map1, ["b", "d"])

console.log(HashMap.size(map2)) // 2
console.log(HashMap.has(map2, "a")) // true
console.log(HashMap.has(map2, "c")) // true
```

**Signature**

```ts
declare const removeMany: {
  <K>(keys: Iterable<K>): <V>(self: HashMap<K, V>) => HashMap<K, V>
  <K, V>(self: HashMap<K, V>, keys: Iterable<K>): HashMap<K, V>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HashMap.ts#L961)

Since v2.0.0

## set

Sets the specified key to the specified value using the internal hashing
function.

**Example** (Setting a value)

```ts
import { HashMap } from "effect"

const map1 = HashMap.make(["a", 1])
const map2 = HashMap.set(map1, "b", 2)

console.log(HashMap.size(map2)) // 2
console.log(HashMap.get(map2, "b")) // Option.some(2)

// Original map is unchanged
console.log(HashMap.size(map1)) // 1
```

**Signature**

```ts
declare const set: {
  <K, V>(key: K, value: V): (self: HashMap<K, V>) => HashMap<K, V>
  <K, V>(self: HashMap<K, V>, key: K, value: V): HashMap<K, V>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HashMap.ts#L523)

Since v2.0.0

## setMany

Sets multiple key-value pairs in the `HashMap`.

**Example** (Setting multiple entries)

```ts
import { HashMap } from "effect"

const map1 = HashMap.make(["a", 1], ["b", 2])
const newEntries = [
  ["c", 3],
  ["d", 4],
  ["a", 10]
] as const // "a" will be overwritten
const map2 = HashMap.setMany(map1, newEntries)

console.log(HashMap.size(map2)) // 4
console.log(HashMap.get(map2, "a")) // Option.some(10)
console.log(HashMap.get(map2, "c")) // Option.some(3)
```

**Signature**

```ts
declare const setMany: {
  <K, V>(entries: Iterable<readonly [K, V]>): (self: HashMap<K, V>) => HashMap<K, V>
  <K, V>(self: HashMap<K, V>, entries: Iterable<readonly [K, V]>): HashMap<K, V>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HashMap.ts#L986)

Since v4.0.0

# traversing

## forEach

Applies the specified function to the entries of the `HashMap`.

**Example** (Iterating with side effects)

```ts
import { HashMap } from "effect"

const map = HashMap.make(["a", 1], ["b", 2])
const collected: Array<[string, number]> = []

HashMap.forEach(map, (value, key) => {
  collected.push([key, value])
})

console.log(collected.sort()) // [["a", 1], ["b", 2]]
```

**Signature**

```ts
declare const forEach: {
  <V, K>(f: (value: V, key: K) => void): (self: HashMap<K, V>) => void
  <V, K>(self: HashMap<K, V>, f: (value: V, key: K) => void): void
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HashMap.ts#L1066)

Since v2.0.0

# unsafe

## getUnsafe

Looks up the value for the specified key in the `HashMap` unsafely using the
internal hashing function.

**When to use**

Use when reading from a `HashMap` by a key known to exist, and throwing is an
acceptable programming error for a missing key.

**Gotchas**

This function throws an error if the key is not found. Use `HashMap.get` for
safe access that returns `Option`.

**Example** (Unsafely looking up values)

```ts
import { HashMap, Option } from "effect"

const config = HashMap.make(["api_url", "https://api.example.com"], ["timeout", "5000"], ["retries", "3"])

// Safe: use when you're certain the key exists
const apiUrl = HashMap.getUnsafe(config, "api_url") // "https://api.example.com"
console.log(`Connecting to: ${apiUrl}`)

// Preferred: use get() for uncertain keys
const dbUrl = HashMap.get(config, "db_url") // Option.none()
if (Option.isSome(dbUrl)) {
  console.log(`Database: ${dbUrl.value}`)
}

// This would throw: HashMap.getUnsafe(config, "db_url")
// Error: "HashMap.getUnsafe: key not found"
```

**Signature**

```ts
declare const getUnsafe: {
  <K1 extends K, K>(key: K1): <V>(self: HashMap<K, V>) => V
  <K1 extends K, K, V>(self: HashMap<K, V>, key: K1): V
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HashMap.ts#L414)

Since v4.0.0

# utils

## HashMap (namespace)

The HashMap namespace contains type-level utilities and helper types
for working with HashMap instances.

**Example** (Extracting HashMap types)

```ts
import { HashMap } from "effect"

// Create a concrete HashMap for type extraction
const inventory = HashMap.make(["laptop", { quantity: 5, price: 999 }], ["mouse", { quantity: 20, price: 29 }])

// Extract types for reuse
type ProductId = HashMap.HashMap.Key<typeof inventory> // string
type Product = HashMap.HashMap.Value<typeof inventory> // { quantity: number, price: number }
type InventoryEntry = HashMap.HashMap.Entry<typeof inventory> // [string, Product]

// Use extracted types in functions
const updateInventory = (id: ProductId, product: Product) => HashMap.set(inventory, id, product)

const processEntry = ([id, product]: InventoryEntry) => `${id}: ${product.quantity} @ $${product.price}`

// Example of extracted types in action
const newProduct: Product = { quantity: 10, price: 199 }
const updatedInventory = updateInventory("tablet", newProduct)
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HashMap.ts#L89)

Since v2.0.0

### UpdateFn (type alias)

A function that updates a value based on its current state.
Takes an Option representing the current value and returns an Option
representing the new value.

**Example** (Updating values from Options)

```ts
import { HashMap, Option } from "effect"

const map = HashMap.make(["a", 1], ["b", 2])

// Increment existing value or set to 1 if not present
const updateFn = (option: Option.Option<number>) =>
  Option.isSome(option) ? Option.some(option.value + 1) : Option.some(1)

const updated = HashMap.modifyAt(map, "a", updateFn)
console.log(HashMap.get(updated, "a")) // Option.some(2)
```

**Signature**

```ts
type UpdateFn<V> = (option: Option<V>) => Option<V>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HashMap.ts#L113)

Since v2.0.0

### Key (type alias)

This type-level utility extracts the key type `K` from a `HashMap<K, V>` type.

**Example** (Extracting key types)

```ts
import { HashMap } from "effect"

// Create a HashMap to extract key type from
const userMap = HashMap.make(["alice", { name: "Alice", age: 30 }], ["bob", { name: "Bob", age: 25 }])

// Extract the key type (string)
type UserKey = HashMap.HashMap.Key<typeof userMap>

// Use the extracted type in functions
const getUserById = (id: UserKey) => HashMap.get(userMap, id)
console.log(getUserById("alice")) // Option.some({ name: "Alice", age: 30 })
```

**Signature**

```ts
type Key<T> = [T] extends [HashMap<infer _K, infer _V>] ? _K : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HashMap.ts#L140)

Since v2.0.0

### Value (type alias)

This type-level utility extracts the value type `V` from a `HashMap<K, V>` type.

**Example** (Extracting value types)

```ts
import { HashMap } from "effect"

// Create a HashMap with user data
const userMap = HashMap.make(
  ["alice", { name: "Alice", age: 30, active: true }],
  ["bob", { name: "Bob", age: 25, active: false }]
)

// Extract the value type (User object)
type User = HashMap.HashMap.Value<typeof userMap>

// Use the extracted type for type-safe operations
const processUser = (user: User) => {
  return user.active ? `${user.name} (active)` : `${user.name} (inactive)`
}

const alice = HashMap.get(userMap, "alice")
// alice has type Option<User> thanks to type extraction
```

**Signature**

```ts
type Value<T> = [T] extends [HashMap<infer _K, infer _V>] ? _V : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HashMap.ts#L171)

Since v2.0.0

### Entry (type alias)

This type-level utility extracts the entry type `[K, V]` from a `HashMap<K, V>` type.

**Example** (Extracting entry types)

```ts
import { HashMap } from "effect"

// Create a product catalog HashMap
const catalog = HashMap.make(
  ["laptop", { price: 999, category: "electronics" }],
  ["book", { price: 29, category: "education" }]
)

// Extract the entry type [string, Product]
type CatalogEntry = HashMap.HashMap.Entry<typeof catalog>

// Use the extracted type for processing entries
const processEntry = ([productId, product]: CatalogEntry) => {
  return `${productId}: $${product.price} (${product.category})`
}

// Convert to entries, process, and sort for deterministic output
const descriptions = HashMap.toEntries(catalog).map(processEntry).sort()
console.log(descriptions) // ["book: $29 (education)", "laptop: $999 (electronics)"]
```

**Signature**

```ts
type Entry<T> = [Key<T>, Value<T>]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HashMap.ts#L203)

Since v3.9.0
