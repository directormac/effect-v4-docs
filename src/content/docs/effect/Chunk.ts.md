---
title: Chunk.ts
nav_order: 10
parent: "effect"
---

## Chunk.ts overview

Stores many values in an immutable ordered collection.

A `Chunk<A>` is useful when you need to build or transform collections
without changing the original collection. It is designed for efficient
append, prepend, and concatenation. This module includes helpers for
creating, reading, slicing, mapping, filtering, sorting, zipping, combining,
and converting chunks to and from arrays and iterables.

Since v2.0.0

---

## Exports Grouped by Category

- [combinators](#combinators)
  - [forEach](#foreach)
- [combining](#combining)
  - [append](#append)
  - [appendAll](#appendall)
  - [prepend](#prepend)
  - [prependAll](#prependall)
- [constructors](#constructors)
  - [empty](#empty)
  - [fromIterable](#fromiterable)
  - [isChunk](#ischunk)
  - [make](#make)
  - [makeBy](#makeby)
  - [of](#of)
  - [range](#range)
- [converting](#converting)
  - [toArray](#toarray)
  - [toReadonlyArray](#toreadonlyarray)
- [elements](#elements)
  - [chunksOf](#chunksof)
  - [contains](#contains)
  - [containsWith](#containswith)
  - [dedupe](#dedupe)
  - [drop](#drop)
  - [dropRight](#dropright)
  - [dropWhile](#dropwhile)
  - [every](#every)
  - [findFirst](#findfirst)
  - [findFirstIndex](#findfirstindex)
  - [findLast](#findlast)
  - [findLastIndex](#findlastindex)
  - [get](#get)
  - [head](#head)
  - [headNonEmpty](#headnonempty)
  - [intersection](#intersection)
  - [isEmpty](#isempty)
  - [isNonEmpty](#isnonempty)
  - [last](#last)
  - [lastNonEmpty](#lastnonempty)
  - [modify](#modify)
  - [remove](#remove)
  - [replace](#replace)
  - [reverse](#reverse)
  - [size](#size)
  - [some](#some)
  - [tail](#tail)
  - [tailNonEmpty](#tailnonempty)
  - [take](#take)
  - [takeRight](#takeright)
  - [takeWhile](#takewhile)
  - [union](#union)
  - [unzip](#unzip)
- [filtering](#filtering)
  - [compact](#compact)
  - [dedupeAdjacent](#dedupeadjacent)
  - [difference](#difference)
  - [differenceWith](#differencewith)
  - [filter](#filter)
  - [filterMap](#filtermap)
  - [filterMapWhile](#filtermapwhile)
  - [partition](#partition)
  - [separate](#separate)
- [folding](#folding)
  - [join](#join)
  - [mapAccum](#mapaccum)
  - [reduce](#reduce)
  - [reduceRight](#reduceright)
- [instances](#instances)
  - [makeEquivalence](#makeequivalence)
- [mapping](#mapping)
  - [map](#map)
- [models](#models)
  - [Chunk (interface)](#chunk-interface)
  - [NonEmptyChunk (interface)](#nonemptychunk-interface)
- [sequencing](#sequencing)
  - [flatMap](#flatmap)
  - [flatten](#flatten)
- [sorting](#sorting)
  - [sort](#sort)
  - [sortWith](#sortwith)
- [splitting](#splitting)
  - [split](#split)
  - [splitAt](#splitat)
  - [splitNonEmptyAt](#splitnonemptyat)
  - [splitWhere](#splitwhere)
- [type lambdas](#type-lambdas)
  - [ChunkTypeLambda (interface)](#chunktypelambda-interface)
- [unsafe](#unsafe)
  - [fromArrayUnsafe](#fromarrayunsafe)
  - [fromNonEmptyArrayUnsafe](#fromnonemptyarrayunsafe)
  - [getUnsafe](#getunsafe)
  - [headUnsafe](#headunsafe)
  - [lastUnsafe](#lastunsafe)
- [utils](#utils)
  - [Chunk (namespace)](#chunk-namespace)
    - [Infer (type alias)](#infer-type-alias)
    - [With (type alias)](#with-type-alias)
    - [OrNonEmpty (type alias)](#ornonempty-type-alias)
    - [AndNonEmpty (type alias)](#andnonempty-type-alias)
    - [Flatten (type alias)](#flatten-type-alias)
- [zipping](#zipping)
  - [zip](#zip)
  - [zipWith](#zipwith)

---

# combinators

## forEach

Iterates over each element of a `Chunk` and applies a function to it.

**Details**

This function processes every element of the given `Chunk`, calling the
provided function `f` on each element. It does not return a new value;
instead, it is primarily used for side effects, such as logging or
accumulating data in an external variable.

**Example** (Iterating over chunk values)

```ts
import { Chunk } from "effect"

const chunk = Chunk.make(1, 2, 3, 4)

// Log each element
Chunk.forEach(chunk, (n) => console.log(`Value: ${n}`))
// Output:
// Value: 1
// Value: 2
// Value: 3
// Value: 4

// With index parameter
Chunk.forEach(chunk, (n, i) => console.log(`Index ${i}: ${n}`))
// Output:
// Index 0: 1
// Index 1: 2
// Index 2: 3
// Index 3: 4
```

**Signature**

```ts
declare const forEach: {
  <A, B>(f: (a: A, index: number) => B): (self: Chunk<A>) => void
  <A, B>(self: Chunk<A>, f: (a: A, index: number) => B): void
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L1223)

Since v2.0.0

# combining

## append

Appends the specified element to the end of the `Chunk`.

**When to use**

Use to add one element after the existing chunk elements and return a
`NonEmptyChunk`.

**Example** (Appending an element)

```ts
import { Chunk } from "effect"

const chunk = Chunk.make(1, 2, 3)
const newChunk = Chunk.append(chunk, 4)
console.log(Chunk.toArray(newChunk)) // [1, 2, 3, 4]

// Appending to empty chunk
const emptyChunk = Chunk.empty<number>()
const singleElement = Chunk.append(emptyChunk, 42)
console.log(Chunk.toArray(singleElement)) // [42]
```

**See**

- `prepend` for adding one element before the existing elements
- `appendAll` for appending all elements from another chunk

**Signature**

```ts
declare const append: {
  <A2>(a: A2): <A>(self: Chunk<A>) => NonEmptyChunk<A2 | A>
  <A, A2>(self: Chunk<A>, a: A2): NonEmptyChunk<A | A2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L695)

Since v2.0.0

## appendAll

Concatenates two chunks, combining their elements.
If either chunk is non-empty, the result is also a non-empty chunk.

**When to use**

Use to concatenate two chunks when the second chunk's elements should come
after the first.

**Example** (Appending all elements)

```ts
import { Chunk } from "effect"

const result = Chunk.make(1, 2).pipe(Chunk.appendAll(Chunk.make("a", "b")), Chunk.toArray)

console.log(result)
// [ 1, 2, "a", "b" ]
```

**See**

- `prependAll` for concatenating chunks in the opposite order
- `append` for adding a single element to the end

**Signature**

```ts
declare const appendAll: {
  <S extends Chunk<any>, T extends Chunk<any>>(
    that: T
  ): (self: S) => Chunk.OrNonEmpty<S, T, Chunk.Infer<S> | Chunk.Infer<T>>
  <A, B>(self: Chunk<A>, that: NonEmptyChunk<B>): NonEmptyChunk<A | B>
  <A, B>(self: NonEmptyChunk<A>, that: Chunk<B>): NonEmptyChunk<A | B>
  <A, B>(self: Chunk<A>, that: Chunk<B>): Chunk<A | B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L948)

Since v2.0.0

## prepend

Prepends an element to the front of a `Chunk`, creating a new `NonEmptyChunk`.

**Example** (Prepending an element)

```ts
import { Chunk } from "effect"

const chunk = Chunk.make(2, 3, 4)
const newChunk = Chunk.prepend(chunk, 1)
console.log(Chunk.toArray(newChunk)) // [1, 2, 3, 4]

// Prepending to empty chunk
const emptyChunk = Chunk.empty<string>()
const singleElement = Chunk.prepend(emptyChunk, "first")
console.log(Chunk.toArray(singleElement)) // ["first"]
```

**Signature**

```ts
declare const prepend: {
  <B>(elem: B): <A>(self: Chunk<A>) => NonEmptyChunk<B | A>
  <A, B>(self: Chunk<A>, elem: B): NonEmptyChunk<A | B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L721)

Since v2.0.0

## prependAll

Prepends the specified prefix chunk to the beginning of the specified chunk.
If either chunk is non-empty, the result is also a non-empty chunk.

**Example** (Prepending all elements)

```ts
import { Chunk } from "effect"

const result = Chunk.make(1, 2).pipe(Chunk.prependAll(Chunk.make("a", "b")), Chunk.toArray)

console.log(result)
// [ "a", "b", 1, 2 ]
```

**Signature**

```ts
declare const prependAll: {
  <S extends Chunk<any>, T extends Chunk<any>>(
    that: T
  ): (self: S) => Chunk.OrNonEmpty<S, T, Chunk.Infer<S> | Chunk.Infer<T>>
  <A, B>(self: Chunk<A>, that: NonEmptyChunk<B>): NonEmptyChunk<A | B>
  <A, B>(self: NonEmptyChunk<A>, that: Chunk<B>): NonEmptyChunk<A | B>
  <A, B>(self: Chunk<A>, that: Chunk<B>): Chunk<A | B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L910)

Since v2.0.0

# constructors

## empty

Creates an empty `Chunk`.

**Example** (Creating an empty chunk)

```ts
import { Chunk } from "effect"

const emptyChunk = Chunk.empty()
console.log(Chunk.size(emptyChunk)) // 0
```

**Signature**

```ts
declare const empty: <A = never>() => Chunk<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L301)

Since v2.0.0

## fromIterable

Creates a new `Chunk` from an iterable collection of values.

**Example** (Creating chunks from iterables)

```ts
import { Chunk } from "effect"

const chunk = Chunk.fromIterable([1, 2, 3])
console.log(Chunk.toArray(chunk)) // [1, 2, 3]
```

**Signature**

```ts
declare const fromIterable: <A>(self: Iterable<A>) => Chunk<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L353)

Since v2.0.0

## isChunk

Checks whether `u` is a `Chunk<unknown>`

**Example** (Checking for chunks)

```ts
import { Chunk } from "effect"

const chunk = Chunk.make(1, 2, 3)
const array = [1, 2, 3]

console.log(Chunk.isChunk(chunk)) // true
console.log(Chunk.isChunk(array)) // false
console.log(Chunk.isChunk("string")) // false
```

**Signature**

```ts
declare const isChunk: { <A>(u: Iterable<A>): u is Chunk<A>; (u: unknown): u is Chunk<unknown> }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L279)

Since v2.0.0

## make

Builds a `NonEmptyChunk` from an non-empty collection of elements.

**Example** (Creating a non-empty chunk)

```ts
import { Chunk } from "effect"

const chunk = Chunk.make(1, 2, 3, 4)
console.log(Chunk.toArray(chunk)) // [1, 2, 3, 4]
```

**Signature**

```ts
declare const make: <As extends readonly [any, ...Array<any>]>(...as: As) => NonEmptyChunk<As[number]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L318)

Since v2.0.0

## makeBy

Returns a non-empty `Chunk` of length `n` with element `i` initialized by `f(i)`.

**Details**

`n` is normalized to an integer greater than or equal to `1`.

**Example** (Generating chunks from indices)

```ts
import { Chunk } from "effect"

const chunk = Chunk.makeBy(5, (i) => i * 2)
console.log(Chunk.toArray(chunk)) // [0, 2, 4, 6, 8]
```

**Signature**

```ts
declare const makeBy: {
  <A>(f: (i: number) => A): (n: number) => NonEmptyChunk<A>
  <A>(n: number, f: (i: number) => A): NonEmptyChunk<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L2500)

Since v2.0.0

## of

Builds a `NonEmptyChunk` from a single element.

**Example** (Creating a single-element chunk)

```ts
import { Chunk } from "effect"

const chunk = Chunk.of("hello")
console.log(Chunk.toArray(chunk)) // ["hello"]
```

**Signature**

```ts
declare const of: <A>(a: A) => NonEmptyChunk<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L336)

Since v2.0.0

## range

Creates a non-empty `Chunk` of consecutive integers from `start` through
`end`, inclusive.

**Details**

If `start` is greater than `end`, returns a single-element chunk containing
`start`.

**Example** (Creating a range)

```ts
import { Chunk } from "effect"

const chunk = Chunk.range(1, 5)
console.log(Chunk.toArray(chunk)) // [1, 2, 3, 4, 5]
```

**Signature**

```ts
declare const range: (start: number, end: number) => NonEmptyChunk<number>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L2526)

Since v2.0.0

# converting

## toArray

Converts a `Chunk` into an `Array`. If the provided `Chunk` is non-empty
(`NonEmptyChunk`), the function will return a `NonEmptyArray`, ensuring the
non-empty property is preserved.

**Example** (Converting chunks to mutable arrays)

```ts
import { Chunk } from "effect"

const chunk = Chunk.make(1, 2, 3)
const array = Chunk.toArray(chunk)
console.log(array) // [1, 2, 3]
console.log(Array.isArray(array)) // true

// With empty chunk
const emptyChunk = Chunk.empty<number>()
console.log(Chunk.toArray(emptyChunk)) // []
```

**Signature**

```ts
declare const toArray: <S extends Chunk<any>>(
  self: S
) => S extends NonEmptyChunk<any> ? RA.NonEmptyArray<Chunk.Infer<S>> : Array<Chunk.Infer<S>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L409)

Since v2.0.0

## toReadonlyArray

Converts a `Chunk` into a `ReadonlyArray`. If the provided `Chunk` is
non-empty (`NonEmptyChunk`), the function will return a
`NonEmptyReadonlyArray`, ensuring the non-empty property is preserved.

**Example** (Converting chunks to readonly arrays)

```ts
import { Chunk } from "effect"

const chunk = Chunk.make(1, 2, 3)
const readonlyArray = Chunk.toReadonlyArray(chunk)
console.log(readonlyArray) // [1, 2, 3]

// The result is read-only, modifications would cause TypeScript errors
// readonlyArray[0] = 10 // TypeScript error

// With empty chunk
const emptyChunk = Chunk.empty<number>()
console.log(Chunk.toReadonlyArray(emptyChunk)) // []
```

**Signature**

```ts
declare const toReadonlyArray: <S extends Chunk<any>>(
  self: S
) => S extends NonEmptyChunk<any> ? RA.NonEmptyReadonlyArray<Chunk.Infer<S>> : ReadonlyArray<Chunk.Infer<S>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L461)

Since v2.0.0

# elements

## chunksOf

Groups elements in chunks of up to `n` elements.

**When to use**

Use to divide a chunk into ordered, non-overlapping chunks with at most `n`
elements each.

**Details**

The final chunk may contain fewer than `n` elements. Empty input produces an
empty chunk of chunks.

**Gotchas**

Values of `n` less than or equal to zero produce singleton chunks.

**Example** (Splitting into fixed-size chunks)

```ts
import { Chunk } from "effect"

const chunk = Chunk.make(1, 2, 3, 4, 5, 6, 7, 8, 9)
const chunked = Chunk.chunksOf(chunk, 3)

console.log(Chunk.toArray(chunked).map(Chunk.toArray))
// [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

// When length is not evenly divisible
const chunk2 = Chunk.make(1, 2, 3, 4, 5)
const chunked2 = Chunk.chunksOf(chunk2, 2)
console.log(Chunk.toArray(chunked2).map(Chunk.toArray))
// [[1, 2], [3, 4], [5]]
```

**See**

- `split` for splitting into a target number of chunks instead of a fixed chunk size

**Signature**

```ts
declare const chunksOf: {
  (n: number): <A>(self: Chunk<A>) => Chunk<Chunk<A>>
  <A>(self: Chunk<A>, n: number): Chunk<Chunk<A>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L1298)

Since v2.0.0

## contains

Returns a function that checks if a `Chunk` contains a given value using the default `Equivalence`.

**Example** (Checking membership)

```ts
import { Chunk } from "effect"

const chunk = Chunk.make(1, 2, 3, 4, 5)
console.log(Chunk.contains(chunk, 3)) // true
console.log(Chunk.contains(chunk, 6)) // false

// Works with strings
const words = Chunk.make("apple", "banana", "cherry")
console.log(Chunk.contains(words, "banana")) // true
console.log(Chunk.contains(words, "grape")) // false

// Empty chunk
const empty = Chunk.empty<number>()
console.log(Chunk.contains(empty, 1)) // false
```

**Signature**

```ts
declare const contains: { <A>(a: A): (self: Chunk<A>) => boolean; <A>(self: Chunk<A>, a: A): boolean }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L2558)

Since v2.0.0

## containsWith

Returns a function that checks if a `Chunk` contains a given value using a provided `isEquivalent` function.

**Example** (Checking membership with custom equivalence)

```ts
import { Chunk } from "effect"

const chunk = Chunk.make({ id: 1, name: "Alice" }, { id: 2, name: "Bob" })

// Custom equivalence by id
const containsById = Chunk.containsWith<{ id: number; name: string }>((a, b) => a.id === b.id)
console.log(containsById(chunk, { id: 1, name: "Different" })) // true
console.log(containsById(chunk, { id: 3, name: "Charlie" })) // false

// Case-insensitive string comparison
const words = Chunk.make("Apple", "Banana", "Cherry")
const containsCaseInsensitive = Chunk.containsWith<string>((a, b) => a.toLowerCase() === b.toLowerCase())
console.log(containsCaseInsensitive(words, "apple")) // true
console.log(containsCaseInsensitive(words, "grape")) // false
```

**Signature**

```ts
declare const containsWith: <A>(isEquivalent: (self: A, that: A) => boolean) => {
  (a: A): (self: Chunk<A>) => boolean
  (self: Chunk<A>, a: A): boolean
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L2592)

Since v2.0.0

## dedupe

Removes duplicate elements from a `Chunk`, preserving the first occurrence
of each value.

**Example** (Removing duplicate values)

```ts
import { Chunk } from "effect"

const chunk = Chunk.make(1, 2, 2, 3, 1, 4, 3)
const result = Chunk.dedupe(chunk)
console.log(Chunk.toArray(result)) // [1, 2, 3, 4]

// Empty chunk
const empty = Chunk.empty<number>()
const emptyDeduped = Chunk.dedupe(empty)
console.log(Chunk.toArray(emptyDeduped)) // []

// No duplicates
const unique = Chunk.make(1, 2, 3)
const uniqueDeduped = Chunk.dedupe(unique)
console.log(Chunk.toArray(uniqueDeduped)) // [1, 2, 3]
```

**Signature**

```ts
declare const dedupe: <A>(self: Chunk<A>) => Chunk<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L2261)

Since v2.0.0

## drop

Drops the first up to `n` elements from the chunk.

**Example** (Dropping elements from the start)

```ts
import { Chunk } from "effect"

const chunk = Chunk.make(1, 2, 3, 4, 5)
const result = Chunk.drop(chunk, 2)
console.log(Chunk.toArray(result)) // [3, 4, 5]
```

**Signature**

```ts
declare const drop: { (n: number): <A>(self: Chunk<A>) => Chunk<A>; <A>(self: Chunk<A>, n: number): Chunk<A> }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L799)

Since v2.0.0

## dropRight

Drops the last `n` elements.

**Example** (Dropping elements from the end)

```ts
import { Chunk } from "effect"

const chunk = Chunk.make(1, 2, 3, 4, 5)
const result = Chunk.dropRight(chunk, 2)
console.log(Chunk.toArray(result)) // [1, 2, 3]
```

**Signature**

```ts
declare const dropRight: { (n: number): <A>(self: Chunk<A>) => Chunk<A>; <A>(self: Chunk<A>, n: number): Chunk<A> }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L855)

Since v2.0.0

## dropWhile

Drops all elements so long as the predicate returns true.

**Example** (Dropping elements while a predicate matches)

```ts
import { Chunk } from "effect"

const chunk = Chunk.make(1, 2, 3, 4, 5)
const result = Chunk.dropWhile(chunk, (n) => n < 3)
console.log(Chunk.toArray(result)) // [3, 4, 5]
```

**Signature**

```ts
declare const dropWhile: {
  <A>(predicate: Predicate<NoInfer<A>>): (self: Chunk<A>) => Chunk<A>
  <A>(self: Chunk<A>, predicate: Predicate<A>): Chunk<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L876)

Since v2.0.0

## every

Checks whether a predicate holds true for every `Chunk` element.

**Example** (Checking every element)

```ts
import { Chunk } from "effect"

const allPositive = Chunk.make(1, 2, 3, 4, 5)
console.log(Chunk.every(allPositive, (n) => n > 0)) // true
console.log(Chunk.every(allPositive, (n) => n > 3)) // false

// Empty chunk returns true
const empty = Chunk.empty<number>()
console.log(Chunk.every(empty, (n) => n > 0)) // true

// Type refinement
const mixed = Chunk.make(1, 2, 3)
if (Chunk.every(mixed, (x): x is number => typeof x === "number")) {
  // mixed is now typed as Chunk<number>
  console.log("All elements are numbers")
}
```

**Signature**

```ts
declare const every: {
  <A, B extends A>(refinement: Refinement<NoInfer<A>, B>): (self: Chunk<A>) => self is Chunk<B>
  <A>(predicate: Predicate<A>): (self: Chunk<A>) => boolean
  <A, B extends A>(self: Chunk<A>, refinement: Refinement<A, B>): self is Chunk<B>
  <A>(self: Chunk<A>, predicate: Predicate<A>): boolean
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L2759)

Since v2.0.0

## findFirst

Returns the first element that satisfies the specified
predicate, or `None` if no such element exists.

**Example** (Finding the first matching element)

```ts
import { Chunk, Option } from "effect"

const chunk = Chunk.make(1, 2, 3, 4, 5)
const result = Chunk.findFirst(chunk, (n) => n > 3)
console.log(Option.isSome(result)) // true
console.log(Option.getOrElse(result, () => 0)) // 4

// No match found
const notFound = Chunk.findFirst(chunk, (n) => n > 10)
console.log(Option.isNone(notFound)) // true

// With type refinement
const mixed = Chunk.make(1, "hello", 2, "world", 3)
const firstString = Chunk.findFirst(mixed, (x): x is string => typeof x === "string")
console.log(Option.getOrElse(firstString, () => "")) // "hello"
```

**Signature**

```ts
declare const findFirst: {
  <A, B extends A>(refinement: Refinement<NoInfer<A>, B>): (self: Chunk<A>) => Option<B>
  <A>(predicate: Predicate<NoInfer<A>>): (self: Chunk<A>) => Option<A>
  <A, B extends A>(self: Chunk<A>, refinement: Refinement<A, B>): Option<B>
  <A>(self: Chunk<A>, predicate: Predicate<A>): Option<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L2629)

Since v2.0.0

## findFirstIndex

Returns the first index for which a predicate holds.

**Example** (Finding the first matching index)

```ts
import { Chunk } from "effect"

const chunk = Chunk.make(1, 2, 3, 4, 5)
const result = Chunk.findFirstIndex(chunk, (n) => n > 3)
console.log(result) // Option.some(3)

// No match found
const notFound = Chunk.findFirstIndex(chunk, (n) => n > 10)
console.log(notFound) // Option.none()

// Find first even number
const firstEven = Chunk.findFirstIndex(chunk, (n) => n % 2 === 0)
console.log(firstEven) // Option.some(1)
```

**Signature**

```ts
declare const findFirstIndex: {
  <A>(predicate: Predicate<A>): (self: Chunk<A>) => O.Option<number>
  <A>(self: Chunk<A>, predicate: Predicate<A>): O.Option<number>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L2660)

Since v2.0.0

## findLast

Finds the last element for which a predicate holds.

**Example** (Finding the last matching element)

```ts
import { Chunk, Option } from "effect"

const chunk = Chunk.make(1, 2, 3, 4, 5)
const result = Chunk.findLast(chunk, (n) => n < 4)
console.log(Option.isSome(result)) // true
console.log(Option.getOrElse(result, () => 0)) // 3

// No match found
const notFound = Chunk.findLast(chunk, (n) => n > 10)
console.log(Option.isNone(notFound)) // true

// Find last even number
const lastEven = Chunk.findLast(chunk, (n) => n % 2 === 0)
console.log(Option.getOrElse(lastEven, () => 0)) // 4
```

**Signature**

```ts
declare const findLast: {
  <A, B extends A>(refinement: Refinement<NoInfer<A>, B>): (self: Chunk<A>) => Option<B>
  <A>(predicate: Predicate<NoInfer<A>>): (self: Chunk<A>) => Option<A>
  <A, B extends A>(self: Chunk<A>, refinement: Refinement<A, B>): Option<B>
  <A>(self: Chunk<A>, predicate: Predicate<A>): Option<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L2693)

Since v2.0.0

## findLastIndex

Returns the last index for which a predicate holds.

**Example** (Finding the last matching index)

```ts
import { Chunk } from "effect"

const chunk = Chunk.make(1, 2, 3, 4, 5)
const result = Chunk.findLastIndex(chunk, (n) => n < 4)
console.log(result) // Option.some(2)

// No match found
const notFound = Chunk.findLastIndex(chunk, (n) => n > 10)
console.log(notFound) // Option.none()

// Find last even number index
const lastEven = Chunk.findLastIndex(chunk, (n) => n % 2 === 0)
console.log(lastEven) // Option.some(3)
```

**Signature**

```ts
declare const findLastIndex: {
  <A>(predicate: Predicate<A>): (self: Chunk<A>) => O.Option<number>
  <A>(self: Chunk<A>, predicate: Predicate<A>): O.Option<number>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L2724)

Since v2.0.0

## get

Gets the value at an index in a `Chunk` safely, returning `None` when the index is
out of bounds.

**Example** (Accessing elements safely)

```ts
import { Chunk } from "effect"

const chunk = Chunk.make("a", "b", "c", "d")

console.log(Chunk.get(chunk, 1)) // Option.some("b")
console.log(Chunk.get(chunk, 10)) // Option.none()
console.log(Chunk.get(chunk, -1)) // Option.none()

// Using pipe syntax
const result = chunk.pipe(Chunk.get(2))
console.log(result) // Option.some("c")
```

**Signature**

```ts
declare const get: { (index: number): <A>(self: Chunk<A>) => Option<A>; <A>(self: Chunk<A>, index: number): Option<A> }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L533)

Since v2.0.0

## head

Returns the first element of this chunk safely if it exists.

**Example** (Getting the first element)

```ts
import { Chunk } from "effect"

console.log(Chunk.head(Chunk.empty())) // { _tag: "None" }
console.log(Chunk.head(Chunk.make(1, 2, 3))) // { _tag: "Some", value: 1 }
```

**Signature**

```ts
declare const head: <A>(self: Chunk<A>) => Option<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L1406)

Since v2.0.0

## headNonEmpty

Returns the first element of this non empty chunk.

**Example** (Getting the first element of a non-empty chunk)

```ts
import { Chunk } from "effect"

const nonEmptyChunk = Chunk.make(1, 2, 3, 4)
console.log(Chunk.headNonEmpty(nonEmptyChunk)) // 1

const singleElement = Chunk.make("hello")
console.log(Chunk.headNonEmpty(singleElement)) // "hello"

// Type safety: this function only accepts NonEmptyChunk
// Chunk.headNonEmpty(Chunk.empty()) // TypeScript error
```

**Signature**

```ts
declare const headNonEmpty: <A>(self: NonEmptyChunk<A>) => A
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L1461)

Since v2.0.0

## intersection

Creates a `Chunk` of values that are included in both chunks.

**Details**

The order and references of result values are determined by the first chunk.

**Example** (Intersecting chunks)

```ts
import { Chunk } from "effect"

const chunk1 = Chunk.make(1, 2, 3, 4)
const chunk2 = Chunk.make(3, 4, 5, 6)
const result = Chunk.intersection(chunk1, chunk2)
console.log(Chunk.toArray(result)) // [3, 4]

// With strings
const words1 = Chunk.make("hello", "world", "foo")
const words2 = Chunk.make("world", "bar", "foo")
console.log(Chunk.toArray(Chunk.intersection(words1, words2))) // ["world", "foo"]

// No intersection
const chunk3 = Chunk.make(1, 2)
const chunk4 = Chunk.make(3, 4)
console.log(Chunk.toArray(Chunk.intersection(chunk3, chunk4))) // []
```

**Signature**

```ts
declare const intersection: {
  <A>(that: Chunk<A>): <B>(self: Chunk<B>) => Chunk<A & B>
  <A, B>(self: Chunk<A>, that: Chunk<B>): Chunk<A & B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L1348)

Since v2.0.0

## isEmpty

Determines if the chunk is empty.

**Example** (Checking for empty chunks)

```ts
import { Chunk } from "effect"

console.log(Chunk.isEmpty(Chunk.empty())) // true
console.log(Chunk.isEmpty(Chunk.make(1, 2, 3))) // false
```

**Signature**

```ts
declare const isEmpty: <A>(self: Chunk<A>) => boolean
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L1372)

Since v2.0.0

## isNonEmpty

Determines if the chunk is not empty.

**Example** (Checking for non-empty chunks)

```ts
import { Chunk } from "effect"

console.log(Chunk.isNonEmpty(Chunk.empty())) // false
console.log(Chunk.isNonEmpty(Chunk.make(1, 2, 3))) // true
```

**Signature**

```ts
declare const isNonEmpty: <A>(self: Chunk<A>) => self is NonEmptyChunk<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L1389)

Since v2.0.0

## last

Returns the last element of this chunk safely if it exists.

**Example** (Getting the last element)

```ts
import { Chunk } from "effect"

console.log(Chunk.last(Chunk.empty())) // { _tag: "None" }
console.log(Chunk.last(Chunk.make(1, 2, 3))) // { _tag: "Some", value: 3 }
```

**Signature**

```ts
declare const last: <A>(self: Chunk<A>) => Option<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L1478)

Since v2.0.0

## lastNonEmpty

Returns the last element of this non empty chunk.

**Example** (Getting the last element of a non-empty chunk)

```ts
import { Chunk } from "effect"

const nonEmptyChunk = Chunk.make(1, 2, 3, 4)
console.log(Chunk.lastNonEmpty(nonEmptyChunk)) // 4

const singleElement = Chunk.make("hello")
console.log(Chunk.lastNonEmpty(singleElement)) // "hello"

// Type safety: this function only accepts NonEmptyChunk
// Chunk.lastNonEmpty(Chunk.empty()) // TypeScript error
```

**Signature**

```ts
declare const lastNonEmpty: <A>(self: NonEmptyChunk<A>) => A
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L1533)

Since v3.4.0

## modify

Applies a function to the element at the specified index safely, creating a new `Chunk`,
or returns `None` if the index is out of bounds.

**Example** (Modifying an element)

```ts
import { Chunk } from "effect"

const chunk = Chunk.make(1, 2, 3, 4)
const result = Chunk.modify(chunk, 1, (n) => n * 10)
console.log(result) // Option.some(Chunk.make(1, 20, 3, 4))

// Index out of bounds returns None
const outOfBounds = chunk.pipe(Chunk.modify(10, (n) => n * 10))
console.log(outOfBounds) // Option.none()

// Negative index returns None
const negative = chunk.pipe(Chunk.modify(-1, (n) => n * 10))
console.log(negative) // Option.none()
```

**Signature**

```ts
declare const modify: {
  <A, B>(i: number, f: (a: A) => B): (self: Chunk<A>) => O.Option<Chunk<A | B>>
  <A, B>(self: Chunk<A>, i: number, f: (a: A) => B): O.Option<Chunk<A | B>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L2442)

Since v2.0.0

## remove

Deletes the element at the specified index, creating a new `Chunk`.

**Example** (Removing an element)

```ts
import { Chunk } from "effect"

const chunk = Chunk.make("a", "b", "c", "d")
const result = Chunk.remove(chunk, 1)
console.log(Chunk.toArray(result)) // ["a", "c", "d"]

// Remove first element
const removeFirst = Chunk.remove(chunk, 0)
console.log(Chunk.toArray(removeFirst)) // ["b", "c", "d"]

// Index out of bounds returns same chunk
const outOfBounds = Chunk.remove(chunk, 10)
console.log(Chunk.toArray(outOfBounds)) // ["a", "b", "c", "d"]
```

**Signature**

```ts
declare const remove: { (i: number): <A>(self: Chunk<A>) => Chunk<A>; <A>(self: Chunk<A>, i: number): Chunk<A> }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L2409)

Since v2.0.0

## replace

Changes the element at the specified index safely, creating a new `Chunk`,
or returns `None` if the index is out of bounds.

**Example** (Replacing an element)

```ts
import { Chunk } from "effect"

const chunk = Chunk.make("a", "b", "c", "d")
const result = Chunk.replace(chunk, 1, "X")
console.log(result) // Option.some(Chunk.make("a", "X", "c", "d"))

// Index out of bounds returns None
const outOfBounds = chunk.pipe(Chunk.replace(10, "Y"))
console.log(outOfBounds) // Option.none()

// Negative index returns None
const negative = chunk.pipe(Chunk.replace(-1, "Z"))
console.log(negative) // Option.none()
```

**Signature**

```ts
declare const replace: {
  <B>(i: number, b: B): <A>(self: Chunk<A>) => O.Option<Chunk<B | A>>
  <A, B>(self: Chunk<A>, i: number, b: B): O.Option<Chunk<B | A>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L2476)

Since v2.0.0

## reverse

Reverses the order of elements in a `Chunk`.

**When to use**

Use to read or process chunk elements in reverse order.

**Details**

If the input chunk is a `NonEmptyChunk`, the reversed chunk is also a
`NonEmptyChunk`.

**Example** (Reversing chunks)

```ts
import { Chunk } from "effect"

const chunk = Chunk.make(1, 2, 3)
const result = Chunk.reverse(chunk)

console.log(Chunk.toArray(result)) // [3, 2, 1]
```

**Signature**

```ts
declare const reverse: <S extends Chunk<any>>(self: S) => Chunk.With<S, Chunk.Infer<S>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L508)

Since v2.0.0

## size

Retrieves the size of the chunk.

**Example** (Getting chunk size)

```ts
import { Chunk } from "effect"

const chunk = Chunk.make(1, 2, 3)
console.log(Chunk.size(chunk)) // 3
```

**Signature**

```ts
declare const size: <A>(self: Chunk<A>) => number
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L1853)

Since v2.0.0

## some

Checks whether a predicate holds true for some `Chunk` element.

**Example** (Checking for some matching element)

```ts
import { Chunk } from "effect"

const chunk = Chunk.make(1, 2, 3, 4, 5)
console.log(Chunk.some(chunk, (n) => n > 4)) // true
console.log(Chunk.some(chunk, (n) => n > 10)) // false

// Empty chunk returns false
const empty = Chunk.empty<number>()
console.log(Chunk.some(empty, (n) => n > 0)) // false

// Check for specific value
const words = Chunk.make("apple", "banana", "cherry")
console.log(Chunk.some(words, (word) => word.includes("ban"))) // true
```

**Signature**

```ts
declare const some: {
  <A>(predicate: Predicate<NoInfer<A>>): (self: Chunk<A>) => self is NonEmptyChunk<A>
  <A>(self: Chunk<A>, predicate: Predicate<A>): self is NonEmptyChunk<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L2794)

Since v2.0.0

## tail

Returns every element after the first safely, or `None` when the chunk is empty.

**Example** (Getting the tail safely)

```ts
import { Chunk } from "effect"

const chunk = Chunk.make(1, 2, 3, 4)
console.log(Chunk.tail(chunk)) // Option.some(Chunk.make(2, 3, 4))

const singleElement = Chunk.make(1)
console.log(Chunk.tail(singleElement)) // Option.some(Chunk.empty())

const empty = Chunk.empty<number>()
console.log(Chunk.tail(empty)) // Option.none()
```

**Signature**

```ts
declare const tail: <A>(self: Chunk<A>) => O.Option<Chunk<A>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L2105)

Since v2.0.0

## tailNonEmpty

Returns every element after the first from a non-empty chunk.

**Example** (Getting the tail of a non-empty chunk)

```ts
import { Chunk } from "effect"

const nonEmptyChunk = Chunk.make(1, 2, 3, 4)
const result = Chunk.tailNonEmpty(nonEmptyChunk)
console.log(Chunk.toArray(result)) // [2, 3, 4]

const singleElement = Chunk.make(1)
const resultSingle = Chunk.tailNonEmpty(singleElement)
console.log(Chunk.toArray(resultSingle)) // []

// Type safety: this function only accepts NonEmptyChunk
// Chunk.tailNonEmpty(Chunk.empty()) // TypeScript error
```

**Signature**

```ts
declare const tailNonEmpty: <A>(self: NonEmptyChunk<A>) => Chunk<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L2130)

Since v2.0.0

## take

Takes the first up to `n` elements from the chunk.

**Example** (Taking elements from the start)

```ts
import { Chunk } from "effect"

const chunk = Chunk.make(1, 2, 3, 4, 5)
const result = Chunk.take(chunk, 3)
console.log(Chunk.toArray(result)) // [1, 2, 3]
```

**Signature**

```ts
declare const take: { (n: number): <A>(self: Chunk<A>) => Chunk<A>; <A>(self: Chunk<A>, n: number): Chunk<A> }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L742)

Since v2.0.0

## takeRight

Takes the last `n` elements.

**Example** (Taking elements from the end)

```ts
import { Chunk } from "effect"

const chunk = Chunk.make(1, 2, 3, 4, 5, 6)
const lastThree = Chunk.takeRight(chunk, 3)
console.log(Chunk.toArray(lastThree)) // [4, 5, 6]

// Take more than available
const all = Chunk.takeRight(chunk, 10)
console.log(Chunk.toArray(all)) // [1, 2, 3, 4, 5, 6]

// Take zero
const none = Chunk.takeRight(chunk, 0)
console.log(Chunk.toArray(none)) // []
```

**Signature**

```ts
declare const takeRight: { (n: number): <A>(self: Chunk<A>) => Chunk<A>; <A>(self: Chunk<A>, n: number): Chunk<A> }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L2156)

Since v2.0.0

## takeWhile

Takes all elements so long as the predicate returns true.

**Example** (Taking elements while a predicate matches)

```ts
import { Chunk } from "effect"

const chunk = Chunk.make(1, 2, 3, 4, 3, 2, 1)
const result = Chunk.takeWhile(chunk, (n) => n < 4)
console.log(Chunk.toArray(result)) // [1, 2, 3]

// Empty if first element doesn't match
const none = Chunk.takeWhile(chunk, (n) => n > 5)
console.log(Chunk.toArray(none)) // []

// Takes all if all match
const small = Chunk.make(1, 2, 3)
const all = Chunk.takeWhile(small, (n) => n < 10)
console.log(Chunk.toArray(all)) // [1, 2, 3]
```

**Signature**

```ts
declare const takeWhile: {
  <A, B extends A>(refinement: Refinement<NoInfer<A>, B>): (self: Chunk<A>) => Chunk<B>
  <A>(predicate: Predicate<NoInfer<A>>): (self: Chunk<A>) => Chunk<A>
  <A, B extends A>(self: Chunk<A>, refinement: Refinement<A, B>): Chunk<B>
  <A>(self: Chunk<A>, predicate: Predicate<A>): Chunk<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L2186)

Since v2.0.0

## union

Creates a Chunks of unique values, in order, from all given Chunks.

**Example** (Unioning chunks)

```ts
import { Chunk } from "effect"

const chunk1 = Chunk.make(1, 2, 3)
const chunk2 = Chunk.make(3, 4, 5)
const result = Chunk.union(chunk1, chunk2)
console.log(Chunk.toArray(result)) // [1, 2, 3, 4, 5]

// Handles duplicates within the same chunk
const withDupes1 = Chunk.make(1, 1, 2)
const withDupes2 = Chunk.make(2, 3, 3)
const unified = Chunk.union(withDupes1, withDupes2)
console.log(Chunk.toArray(unified)) // [1, 2, 3]
```

**Signature**

```ts
declare const union: {
  <A>(that: Chunk<A>): <B>(self: Chunk<B>) => Chunk<A | B>
  <A, B>(self: Chunk<A>, that: Chunk<B>): Chunk<A | B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L2226)

Since v2.0.0

## unzip

Takes a `Chunk` of pairs and returns two corresponding `Chunk`s.

**Details**

This function is the reverse of `zip`.

**Example** (Unzipping pairs)

```ts
import { Chunk } from "effect"

const pairs = Chunk.make([1, "a"] as const, [2, "b"] as const, [3, "c"] as const)
const [numbers, letters] = Chunk.unzip(pairs)
console.log(Chunk.toArray(numbers)) // [1, 2, 3]
console.log(Chunk.toArray(letters)) // ["a", "b", "c"]

// Empty chunk
const empty = Chunk.empty<[number, string]>()
const [emptyNums, emptyStrs] = Chunk.unzip(empty)
console.log(Chunk.toArray(emptyNums)) // []
console.log(Chunk.toArray(emptyStrs)) // []
```

**Signature**

```ts
declare const unzip: <A, B>(self: Chunk<readonly [A, B]>) => [Chunk<A>, Chunk<B>]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L2317)

Since v2.0.0

# filtering

## compact

Filters out optional values

**Example** (Compacting optional values)

```ts
import { Chunk, Option } from "effect"

const chunk = Chunk.make(Option.some(1), Option.none(), Option.some(3))
const result = Chunk.compact(chunk)
console.log(Chunk.toArray(result)) // [1, 3]
```

**Signature**

```ts
declare const compact: <A>(self: Chunk<Option<A>>) => Chunk<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L1130)

Since v2.0.0

## dedupeAdjacent

Deduplicates adjacent elements that are identical.

**Example** (Removing adjacent duplicates)

```ts
import { Chunk } from "effect"

const chunk = Chunk.make(1, 1, 2, 2, 2, 3, 1, 1)
const result = Chunk.dedupeAdjacent(chunk)
console.log(Chunk.toArray(result)) // [1, 2, 3, 1]

// Only removes adjacent duplicates, not all duplicates
const mixed = Chunk.make("a", "a", "b", "a", "a")
const mixedResult = Chunk.dedupeAdjacent(mixed)
console.log(Chunk.toArray(mixedResult)) // ["a", "b", "a"]
```

**Signature**

```ts
declare const dedupeAdjacent: <A>(self: Chunk<A>) => Chunk<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L2284)

Since v2.0.0

## difference

Creates a `Chunk` of values not included in the other given `Chunk`.
The order and references of result values are determined by the first `Chunk`.

**Example** (Computing chunk difference)

```ts
import { Chunk } from "effect"

const chunk1 = Chunk.make(1, 2, 3, 4, 5)
const chunk2 = Chunk.make(3, 4, 6, 7)
const result = Chunk.difference(chunk1, chunk2)
console.log(Chunk.toArray(result)) // [1, 2, 5]

// String difference
const words1 = Chunk.make("apple", "banana", "cherry")
const words2 = Chunk.make("banana", "grape")
const wordDiff = Chunk.difference(words1, words2)
console.log(Chunk.toArray(wordDiff)) // ["apple", "cherry"]

// Empty second chunk returns original
const empty = Chunk.empty<number>()
const unchanged = Chunk.difference(chunk1, empty)
console.log(Chunk.toArray(unchanged)) // [1, 2, 3, 4, 5]
```

**Signature**

```ts
declare const difference: {
  <A>(that: Chunk<A>): (self: Chunk<A>) => Chunk<A>
  <A>(self: Chunk<A>, that: Chunk<A>): Chunk<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L2970)

Since v3.2.0

## differenceWith

Creates a `Chunk` of values not included in the other given `Chunk` using the provided `isEquivalent` function.
The order and references of result values are determined by the first `Chunk`.

**Example** (Computing difference with custom equivalence)

```ts
import { Chunk } from "effect"

const chunk1 = Chunk.make({ id: 1, name: "Alice" }, { id: 2, name: "Bob" })
const chunk2 = Chunk.make({ id: 1, name: "Alice" }, { id: 3, name: "Charlie" })

// Custom equivalence by id
const byId = Chunk.differenceWith<{ id: number; name: string }>((a, b) => a.id === b.id)
const result = byId(chunk1, chunk2)
console.log(Chunk.toArray(result)) // [{ id: 2, name: "Bob" }]

// String comparison case-insensitive
const words1 = Chunk.make("Apple", "Banana", "Cherry")
const words2 = Chunk.make("apple", "grape")
const caseInsensitive = Chunk.differenceWith<string>((a, b) => a.toLowerCase() === b.toLowerCase())
const wordDiff = caseInsensitive(words1, words2)
console.log(Chunk.toArray(wordDiff)) // ["Banana", "Cherry"]
```

**Signature**

```ts
declare const differenceWith: <A>(isEquivalent: (self: A, that: A) => boolean) => {
  (that: Chunk<A>): (self: Chunk<A>) => Chunk<A>
  (self: Chunk<A>, that: Chunk<A>): Chunk<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L2931)

Since v3.2.0

## filter

Returns a filtered subset of the elements.

**Example** (Filtering values)

```ts
import { Chunk } from "effect"

const chunk = Chunk.make(1, 2, 3, 4, 5, 6)
const evenNumbers = Chunk.filter(chunk, (n) => n % 2 === 0)
console.log(Chunk.toArray(evenNumbers)) // [2, 4, 6]

// With refinement
const mixed = Chunk.make("hello", 42, "world", 100)
const numbers = Chunk.filter(mixed, (x): x is number => typeof x === "number")
console.log(Chunk.toArray(numbers)) // [42, 100]
```

**Signature**

```ts
declare const filter: {
  <A, B extends A>(refinement: Refinement<NoInfer<A>, B>): (self: Chunk<A>) => Chunk<B>
  <A>(predicate: Predicate<NoInfer<A>>): (self: Chunk<A>) => Chunk<A>
  <A, B extends A>(self: Chunk<A>, refinement: Refinement<A, B>): Chunk<B>
  <A>(self: Chunk<A>, predicate: Predicate<A>): Chunk<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L1061)

Since v2.0.0

## filterMap

Returns a filtered and mapped subset of the elements.

**Example** (Filtering and mapping values)

```ts
import { Chunk, Result } from "effect"

const chunk = Chunk.make("1", "2", "hello", "3", "world")
const numbers = Chunk.filterMap(chunk, (str) => {
  const num = parseInt(str)
  return isNaN(num) ? Result.failVoid : Result.succeed(num)
})
console.log(Chunk.toArray(numbers)) // [1, 2, 3]

// With index parameter
const evenIndexNumbers = Chunk.filterMap(chunk, (str, i) => {
  const num = parseInt(str)
  return isNaN(num) || i % 2 !== 0 ? Result.failVoid : Result.succeed(num)
})
console.log(Chunk.toArray(evenIndexNumbers)) // [1]
```

**Signature**

```ts
declare const filterMap: {
  <A, B, X>(f: (input: A, i: number) => Result<B, X>): (self: Chunk<A>) => Chunk<B>
  <A, B, X>(self: Chunk<A>, f: (input: A, i: number) => Result<B, X>): Chunk<B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L1022)

Since v2.0.0

## filterMapWhile

Transforms all elements of the chunk for as long as the specified function succeeds.

**Example** (Filtering and mapping while values match)

```ts
import { Chunk, Result } from "effect"

const chunk = Chunk.make("1", "2", "hello", "3", "4")
const result = Chunk.filterMapWhile(chunk, (s) => {
  const num = parseInt(s)
  return isNaN(num) ? Result.failVoid : Result.succeed(num)
})
console.log(Chunk.toArray(result)) // [1, 2]
// Stops at "hello" and doesn't process "3", "4"

// Compare with regular filterMap
const allNumbers = Chunk.filterMap(chunk, (s) => {
  const num = parseInt(s)
  return isNaN(num) ? Result.failVoid : Result.succeed(num)
})
console.log(Chunk.toArray(allNumbers)) // [1, 2, 3, 4]
```

**Signature**

```ts
declare const filterMapWhile: {
  <A, B, X>(f: Filter.Filter<A, B, X>): (self: Chunk<A>) => Chunk<B>
  <A, B, X>(self: Chunk<A>, f: Filter.Filter<A, B, X>): Chunk<B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L1098)

Since v2.0.0

## partition

Splits a chunk using a `Filter` into failures and successes.

**Details**

Returns `[excluded, satisfying]`. The filter receives `(element, index)`.

**Example** (Partitioning with a Result)

```ts
import { Chunk, Result } from "effect"

const [excluded, satisfying] = Chunk.partition(Chunk.make(1, -2, 3), (n, i) =>
  n > 0 ? Result.succeed(n + i) : Result.fail(`negative:${n}`)
)

console.log(Chunk.toArray(excluded)) // ["negative:-2"]
console.log(Chunk.toArray(satisfying)) // [1, 5]
```

**Signature**

```ts
declare const partition: {
  <A, Pass, Fail>(
    f: (input: NoInfer<A>, i: number) => Result<Pass, Fail>
  ): (self: Chunk<A>) => [excluded: Chunk<Fail>, satisfying: Chunk<Pass>]
  <A, Pass, Fail>(
    self: Chunk<A>,
    f: (input: A, i: number) => Result<Pass, Fail>
  ): [excluded: Chunk<Fail>, satisfying: Chunk<Pass>]
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L1777)

Since v2.0.0

## separate

Separates a chunk of `Result` values into a chunk of failures and a chunk of
successes.

**Details**

The returned tuple is `[failures, successes]`, preserving the original order
within each side.

**Example** (Separating failures and successes)

```ts
import { Chunk, Result } from "effect"

const chunk = Chunk.make(
  Result.succeed(1),
  Result.fail("error1"),
  Result.succeed(2),
  Result.fail("error2"),
  Result.succeed(3)
)

const [errors, values] = Chunk.separate(chunk)
console.log(Chunk.toArray(errors)) // ["error1", "error2"]
console.log(Chunk.toArray(values)) // [1, 2, 3]

// All successes
const allSuccesses = Chunk.make(Result.succeed(1), Result.succeed(2))
const [noErrors, allValues] = Chunk.separate(allSuccesses)
console.log(Chunk.toArray(noErrors)) // []
console.log(Chunk.toArray(allValues)) // [1, 2]
```

**Signature**

```ts
declare const separate: <A, B>(self: Chunk<Result<B, A>>) => [Chunk<A>, Chunk<B>]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L1832)

Since v2.0.0

# folding

## join

Joins the elements together with "sep" in the middle.

**Example** (Joining chunks into a string)

```ts
import { Chunk } from "effect"

const chunk = Chunk.make("apple", "banana", "cherry")
const result = Chunk.join(chunk, ", ")
console.log(result) // "apple, banana, cherry"

// With different separator
const withPipe = Chunk.join(chunk, " | ")
console.log(withPipe) // "apple | banana | cherry"

// Empty chunk
const empty = Chunk.empty<string>()
console.log(Chunk.join(empty, ", ")) // ""

// Single element
const single = Chunk.make("hello")
console.log(Chunk.join(single, ", ")) // "hello"
```

**Signature**

```ts
declare const join: { (sep: string): (self: Chunk<string>) => string; (self: Chunk<string>, sep: string): string }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L2830)

Since v2.0.0

## mapAccum

Maps over the chunk statefully, producing new elements of type `B`.

**Example** (Mapping with accumulated state)

```ts
import { Chunk } from "effect"

const chunk = Chunk.make(1, 2, 3, 4, 5)
const [finalState, mapped] = Chunk.mapAccum(chunk, 0, (state, current) => [
  state + current, // accumulate sum
  state + current // output running sum
])

console.log(finalState) // 15 (final accumulated sum)
console.log(Chunk.toArray(mapped)) // [1, 3, 6, 10, 15] (running sums)

// Building a string with indices
const words = Chunk.make("hello", "world", "effect")
const [count, indexed] = Chunk.mapAccum(words, 0, (index, word) => [index + 1, `${index}: ${word}`])
console.log(count) // 3
console.log(Chunk.toArray(indexed)) // ["0: hello", "1: world", "2: effect"]
```

**Signature**

```ts
declare const mapAccum: {
  <S, A, B>(s: S, f: (s: S, a: A) => readonly [S, B]): (self: Chunk<A>) => [S, Chunk<B>]
  <S, A, B>(self: Chunk<A>, s: S, f: (s: S, a: A) => readonly [S, B]): [S, Chunk<B>]
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L1746)

Since v2.0.0

## reduce

Reduces the elements of a chunk from left to right.

**Example** (Reducing from the left)

```ts
import { Chunk } from "effect"

const chunk = Chunk.make(1, 2, 3, 4, 5)
const sum = Chunk.reduce(chunk, 0, (acc, n) => acc + n)
console.log(sum) // 15

// String concatenation with index
const words = Chunk.make("a", "b", "c")
const result = Chunk.reduce(words, "", (acc, word, i) => acc + `${i}:${word} `)
console.log(result) // "0:a 1:b 2:c "

// Find maximum
const max = Chunk.reduce(chunk, -Infinity, (acc, n) => Math.max(acc, n))
console.log(max) // 5
```

**Signature**

```ts
declare const reduce: {
  <B, A>(b: B, f: (b: B, a: A, i: number) => B): (self: Chunk<A>) => B
  <A, B>(self: Chunk<A>, b: B, f: (b: B, a: A, i: number) => B): B
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L2860)

Since v2.0.0

## reduceRight

Reduces the elements of a chunk from right to left.

**Example** (Reducing from the right)

```ts
import { Chunk } from "effect"

const chunk = Chunk.make(1, 2, 3, 4)
const result = Chunk.reduceRight(chunk, 0, (acc, n) => acc + n)
console.log(result) // 10

// String building (right to left)
const words = Chunk.make("a", "b", "c")
const reversed = Chunk.reduceRight(words, "", (acc, word, i) => acc + `${i}:${word} `)
console.log(reversed) // "2:c 1:b 0:a "

// Subtract from right to left
const subtraction = Chunk.reduceRight(chunk, 0, (acc, n) => n - acc)
console.log(subtraction) // -2 (4 - (3 - (2 - (1 - 0))))
```

**Signature**

```ts
declare const reduceRight: {
  <B, A>(b: B, f: (b: B, a: A, i: number) => B): (self: Chunk<A>) => B
  <A, B>(self: Chunk<A>, b: B, f: (b: B, a: A, i: number) => B): B
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L2894)

Since v2.0.0

# instances

## makeEquivalence

Creates an `Equivalence` for chunks that compares chunk lengths and then
compares corresponding elements with the provided element equivalence.

**Example** (Comparing chunks for equivalence)

```ts
import { Chunk, Equivalence } from "effect"

const chunk1 = Chunk.make(1, 2, 3)
const chunk2 = Chunk.make(1, 2, 3)
const chunk3 = Chunk.make(1, 2, 4)

const eq = Chunk.makeEquivalence(Equivalence.strictEqual<number>())
console.log(eq(chunk1, chunk2)) // true
console.log(eq(chunk1, chunk3)) // false
```

**Signature**

```ts
declare const makeEquivalence: <A>(isEquivalent: Equivalence.Equivalence<A>) => Equivalence.Equivalence<Chunk<A>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L170)

Since v4.0.0

# mapping

## map

Transforms the elements of a chunk using the specified mapping function.
If the input chunk is non-empty, the resulting chunk will also be non-empty.

**Example** (Mapping values)

```ts
import { Chunk } from "effect"

const result = Chunk.map(Chunk.make(1, 2), (n) => n + 1)

console.log(Chunk.toArray(result)) // [2, 3]
```

**Signature**

```ts
declare const map: {
  <S extends Chunk<any>, B>(f: (a: Chunk.Infer<S>, i: number) => B): (self: S) => Chunk.With<S, B>
  <A, B>(self: NonEmptyChunk<A>, f: (a: A, i: number) => B): NonEmptyChunk<B>
  <A, B>(self: Chunk<A>, f: (a: A, i: number) => B): Chunk<B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L1707)

Since v2.0.0

# models

## Chunk (interface)

A Chunk is an immutable, ordered collection optimized for efficient concatenation and access patterns.

**Example** (Inspecting chunk values)

```ts
import { Chunk } from "effect"

const chunk: Chunk.Chunk<number> = Chunk.make(1, 2, 3)
console.log(chunk.length) // 3
console.log(Chunk.toArray(chunk)) // [1, 2, 3]
```

**Signature**

```ts
export interface Chunk<out A> extends Iterable<A>, Equal.Equal, Pipeable, Inspectable {
  readonly [TypeId]: {
    readonly _A: Covariant<A>
  }
  readonly length: number
  right: Chunk<A>
  left: Chunk<A>
  backing: Backing<A>
  depth: number
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L51)

Since v2.0.0

## NonEmptyChunk (interface)

A non-empty Chunk guaranteed to contain at least one element.

**Example** (Working with non-empty chunks)

```ts
import { Chunk } from "effect"

const nonEmptyChunk: Chunk.NonEmptyChunk<number> = Chunk.make(1, 2, 3)
console.log(Chunk.headNonEmpty(nonEmptyChunk)) // 1
console.log(Chunk.lastNonEmpty(nonEmptyChunk)) // 3
```

**Signature**

```ts
export interface NonEmptyChunk<out A> extends Chunk<A>, NonEmptyIterable<A> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L78)

Since v2.0.0

# sequencing

## flatMap

Applies a function to each element in a chunk and returns a new chunk containing the concatenated mapped elements.

**Example** (Flat mapping chunks)

```ts
import { Chunk } from "effect"

const chunk = Chunk.make(1, 2, 3)
const duplicated = Chunk.flatMap(chunk, (n) => Chunk.make(n, n))
console.log(Chunk.toArray(duplicated)) // [1, 1, 2, 2, 3, 3]

// Flattening nested arrays
const words = Chunk.make("hello", "world")
const letters = Chunk.flatMap(words, (word) => Chunk.fromIterable(word.split("")))
console.log(Chunk.toArray(letters)) // ["h", "e", "l", "l", "o", "w", "o", "r", "l", "d"]

// With index parameter
const indexed = Chunk.flatMap(chunk, (n, i) => Chunk.make(n + i))
console.log(Chunk.toArray(indexed)) // [1, 3, 5]
```

**Signature**

```ts
declare const flatMap: {
  <S extends Chunk<any>, T extends Chunk<any>>(
    f: (a: Chunk.Infer<S>, i: number) => T
  ): (self: S) => Chunk.AndNonEmpty<S, T, Chunk.Infer<T>>
  <A, B>(self: NonEmptyChunk<A>, f: (a: A, i: number) => NonEmptyChunk<B>): NonEmptyChunk<B>
  <A, B>(self: Chunk<A>, f: (a: A, i: number) => Chunk<B>): Chunk<B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L1168)

Since v2.0.0

## flatten

Flattens a chunk of chunks into a single chunk by concatenating all chunks.

**Example** (Flattening nested chunks)

```ts
import { Chunk } from "effect"

const nested = Chunk.make(Chunk.make(1, 2), Chunk.make(3, 4, 5), Chunk.make(6))
const flattened = Chunk.flatten(nested)
console.log(Chunk.toArray(flattened)) // [1, 2, 3, 4, 5, 6]

// With empty chunks
const withEmpty = Chunk.make(Chunk.make(1, 2), Chunk.empty<number>(), Chunk.make(3, 4))
console.log(Chunk.toArray(Chunk.flatten(withEmpty))) // [1, 2, 3, 4]
```

**Signature**

```ts
declare const flatten: <S extends Chunk<Chunk<any>>>(self: S) => Chunk.Flatten<S>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L1256)

Since v2.0.0

# sorting

## sort

Sorts the elements of a `Chunk` in increasing order, creating a new `Chunk`.

**Example** (Sorting chunks)

```ts
import { Chunk, Order } from "effect"

const numbers = Chunk.make(3, 1, 4, 1, 5, 9, 2, 6)
const sorted = Chunk.sort(numbers, Order.Number)
console.log(Chunk.toArray(sorted)) // [1, 1, 2, 3, 4, 5, 6, 9]

// Reverse order
const reverseSorted = Chunk.sort(numbers, Order.flip(Order.Number))
console.log(Chunk.toArray(reverseSorted)) // [9, 6, 5, 4, 3, 2, 1, 1]

// String sorting
const words = Chunk.make("banana", "apple", "cherry")
const sortedWords = Chunk.sort(words, Order.String)
console.log(Chunk.toArray(sortedWords)) // ["apple", "banana", "cherry"]
```

**Signature**

```ts
declare const sort: {
  <B>(O: Order.Order<B>): <A extends B>(self: Chunk<A>) => Chunk<A>
  <A extends B, B>(self: Chunk<A>, O: Order.Order<B>): Chunk<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L1880)

Since v2.0.0

## sortWith

Sorts the elements of a `Chunk` based on a projection function.

**Example** (Sorting chunks by a derived value)

```ts
import { Chunk, Order } from "effect"

const people = Chunk.make({ name: "Alice", age: 30 }, { name: "Bob", age: 25 }, { name: "Charlie", age: 35 })

// Sort by age
const byAge = Chunk.sortWith(people, (person) => person.age, Order.Number)
console.log(Chunk.toArray(byAge))
// [{ name: "Bob", age: 25 }, { name: "Alice", age: 30 }, { name: "Charlie", age: 35 }]

// Sort by name
const byName = Chunk.sortWith(people, (person) => person.name, Order.String)
console.log(Chunk.toArray(byName))
// [{ name: "Alice", age: 30 }, { name: "Bob", age: 25 }, { name: "Charlie", age: 35 }]

// Sort by string length
const words = Chunk.make("a", "abc", "ab")
const byLength = Chunk.sortWith(words, (word) => word.length, Order.Number)
console.log(Chunk.toArray(byLength)) // ["a", "ab", "abc"]
```

**Signature**

```ts
declare const sortWith: {
  <A, B>(f: (a: A) => B, order: Order.Order<B>): (self: Chunk<A>) => Chunk<A>
  <A, B>(self: Chunk<A>, f: (a: A) => B, order: Order.Order<B>): Chunk<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L1921)

Since v2.0.0

# splitting

## split

Splits a chunk into up to `n` chunks, distributing elements in order.

**Details**

The chunk size is derived from the input length and `n`; the final chunk may
contain fewer elements than the others.

**Example** (Splitting chunks into groups)

```ts
import { Chunk } from "effect"

const chunk = Chunk.make(1, 2, 3, 4, 5, 6, 7, 8, 9)
const chunks = Chunk.split(chunk, 3)
console.log(Chunk.toArray(chunks).map(Chunk.toArray))
// [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

// Uneven split
const chunk2 = Chunk.make(1, 2, 3, 4, 5, 6, 7, 8)
const chunks2 = Chunk.split(chunk2, 3)
console.log(Chunk.toArray(chunks2).map(Chunk.toArray))
// [[1, 2, 3], [4, 5, 6], [7, 8]]

// Split into 1 chunk
const chunks3 = Chunk.split(chunk, 1)
console.log(Chunk.toArray(chunks3).map(Chunk.toArray))
// [[1, 2, 3, 4, 5, 6, 7, 8, 9]]
```

**Signature**

```ts
declare const split: {
  (n: number): <A>(self: Chunk<A>) => Chunk<Chunk<A>>
  <A>(self: Chunk<A>, n: number): Chunk<Chunk<A>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L2036)

Since v2.0.0

## splitAt

Returns two splits of this chunk at the specified index.

**Example** (Splitting at an index)

```ts
import { Chunk } from "effect"

const chunk = Chunk.make(1, 2, 3, 4, 5, 6)
const [before, after] = Chunk.splitAt(chunk, 3)
console.log(Chunk.toArray(before)) // [1, 2, 3]
console.log(Chunk.toArray(after)) // [4, 5, 6]

// Split at index 0
const [empty, all] = Chunk.splitAt(chunk, 0)
console.log(Chunk.toArray(empty)) // []
console.log(Chunk.toArray(all)) // [1, 2, 3, 4, 5, 6]

// Split beyond length
const [allElements, empty2] = Chunk.splitAt(chunk, 10)
console.log(Chunk.toArray(allElements)) // [1, 2, 3, 4, 5, 6]
console.log(Chunk.toArray(empty2)) // []
```

**Signature**

```ts
declare const splitAt: {
  (n: number): <A>(self: Chunk<A>) => [beforeIndex: Chunk<A>, fromIndex: Chunk<A>]
  <A>(self: Chunk<A>, n: number): [beforeIndex: Chunk<A>, fromIndex: Chunk<A>]
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L1956)

Since v2.0.0

## splitNonEmptyAt

Splits a `NonEmptyChunk` at `n`, returning a non-empty prefix and the
remaining suffix.

**Details**

`n` is floored and normalized to at least `1`. If `n` is greater than or
equal to the chunk length, the first result is the original chunk and the
second result is empty.

**Example** (Splitting non-empty chunks at an index)

```ts
import { Chunk } from "effect"

const nonEmptyChunk = Chunk.make(1, 2, 3, 4, 5, 6)
const [before, after] = Chunk.splitNonEmptyAt(nonEmptyChunk, 3)
console.log(Chunk.toArray(before)) // [1, 2, 3]
console.log(Chunk.toArray(after)) // [4, 5, 6]

// Split at 1 (minimum)
const [first, rest] = Chunk.splitNonEmptyAt(nonEmptyChunk, 1)
console.log(Chunk.toArray(first)) // [1]
console.log(Chunk.toArray(rest)) // [2, 3, 4, 5, 6]

// The first part is guaranteed to be NonEmptyChunk
// while the second part may be empty
```

**Signature**

```ts
declare const splitNonEmptyAt: {
  (n: number): <A>(self: NonEmptyChunk<A>) => [beforeIndex: NonEmptyChunk<A>, fromIndex: Chunk<A>]
  <A>(self: NonEmptyChunk<A>, n: number): [beforeIndex: NonEmptyChunk<A>, fromIndex: Chunk<A>]
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L1993)

Since v2.0.0

## splitWhere

Splits this chunk on the first element that matches this predicate.
Returns a tuple containing two chunks: the first one is before the match, and the second one is from the match onward.

**Example** (Splitting at a matching element)

```ts
import { Chunk } from "effect"

const chunk = Chunk.make(1, 2, 3, 4, 5, 6)
const [before, fromMatch] = Chunk.splitWhere(chunk, (n) => n > 3)
console.log(Chunk.toArray(before)) // [1, 2, 3]
console.log(Chunk.toArray(fromMatch)) // [4, 5, 6]

// No match found
const [all, empty] = Chunk.splitWhere(chunk, (n) => n > 10)
console.log(Chunk.toArray(all)) // [1, 2, 3, 4, 5, 6]
console.log(Chunk.toArray(empty)) // []

// Match on first element
const [emptyBefore, allFromFirst] = Chunk.splitWhere(chunk, (n) => n === 1)
console.log(Chunk.toArray(emptyBefore)) // []
console.log(Chunk.toArray(allFromFirst)) // [1, 2, 3, 4, 5, 6]
```

**Signature**

```ts
declare const splitWhere: {
  <A>(predicate: Predicate<NoInfer<A>>): (self: Chunk<A>) => [beforeMatch: Chunk<A>, fromMatch: Chunk<A>]
  <A>(self: Chunk<A>, predicate: Predicate<A>): [beforeMatch: Chunk<A>, fromMatch: Chunk<A>]
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L2069)

Since v2.0.0

# type lambdas

## ChunkTypeLambda (interface)

Type lambda for Chunk, used for higher-kinded type operations.

**Example** (Applying the Chunk type lambda)

```ts
import type { Chunk, HKT } from "effect"

// Create a Chunk type using the type lambda
type NumberChunk = HKT.Kind<Chunk.ChunkTypeLambda, never, never, never, number>
// Equivalent to: Chunk<number>
```

**Signature**

```ts
export interface ChunkTypeLambda extends TypeLambda {
  readonly type: Chunk<this["Target"]>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L96)

Since v2.0.0

# unsafe

## fromArrayUnsafe

Wraps an array into a chunk without copying.

**When to use**

Use when the input array can be shared with the resulting `Chunk` and avoiding
a copy matters.

**Gotchas**

Mutating the source array after wrapping can mutate the resulting `Chunk`.

**Example** (Creating chunks without copying arrays)

```ts
import { Chunk } from "effect"

const array = [1, 2, 3, 4, 5]
const chunk = Chunk.fromArrayUnsafe(array)
console.log(Chunk.toArray(chunk)) // [1, 2, 3, 4, 5]

// Warning: Since this doesn't copy the array, mutations affect the chunk
array[0] = 999
console.log(Chunk.toArray(chunk)) // [999, 2, 3, 4, 5]
```

**Signature**

```ts
declare const fromArrayUnsafe: <A>(self: ReadonlyArray<A>) => Chunk<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L571)

Since v4.0.0

## fromNonEmptyArrayUnsafe

Wraps a non-empty array into a non-empty chunk without copying.

**When to use**

Use when the input array is already known to be non-empty, can be shared with
the resulting `Chunk`, and avoiding a copy matters.

**Gotchas**

Mutating the source array after wrapping can mutate the resulting `Chunk`.

**Example** (Creating non-empty chunks without copying arrays)

```ts
import { Array, Chunk } from "effect"

const nonEmptyArray = Array.make(1, 2, 3, 4, 5)
const chunk = Chunk.fromNonEmptyArrayUnsafe(nonEmptyArray)
console.log(Chunk.toArray(chunk)) // [1, 2, 3, 4, 5]

// The result is guaranteed to be non-empty
console.log(Chunk.isNonEmpty(chunk)) // true
```

**Signature**

```ts
declare const fromNonEmptyArrayUnsafe: <A>(self: NonEmptyReadonlyArray<A>) => NonEmptyChunk<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L602)

Since v4.0.0

## getUnsafe

Gets an element at the specified index without returning an `Option`.

**When to use**

Use when reading from a `Chunk` at an index known to be in bounds and direct
element access is preferred over handling `Option.none`.

**Gotchas**

Throws if the index is out of bounds.

**Example** (Accessing elements unsafely)

```ts
import { Chunk, Option } from "effect"

const chunk = Chunk.make("a", "b", "c", "d")

console.log(Chunk.getUnsafe(chunk, 1)) // "b"
console.log(Chunk.getUnsafe(chunk, 3)) // "d"

// Use Chunk.get when the index may be out of bounds
console.log(Option.isNone(Chunk.get(chunk, 10))) // true
```

**Signature**

```ts
declare const getUnsafe: { (index: number): <A>(self: Chunk<A>) => A; <A>(self: Chunk<A>, index: number): A }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L634)

Since v4.0.0

## headUnsafe

Returns the first element of this chunk.

**When to use**

Use when you know the chunk is non-empty and need the first element directly
without handling `Option.none`.

**Gotchas**

Throws an error if the chunk is empty.

**Example** (Getting the first element unsafely)

```ts
import { Chunk, Option } from "effect"

const chunk = Chunk.make(1, 2, 3, 4)
console.log(Chunk.headUnsafe(chunk)) // 1

const singleElement = Chunk.make("hello")
console.log(Chunk.headUnsafe(singleElement)) // "hello"

// Use Chunk.head when the chunk may be empty
console.log(Option.isNone(Chunk.head(Chunk.empty()))) // true
```

**Signature**

```ts
declare const headUnsafe: <A>(self: Chunk<A>) => A
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L1438)

Since v4.0.0

## lastUnsafe

Returns the last element of this chunk.

**When to use**

Use when you know the chunk is non-empty and need the last element directly
without handling `Option.none`.

**Gotchas**

Throws an error if the chunk is empty.

**Example** (Getting the last element unsafely)

```ts
import { Chunk, Option } from "effect"

const chunk = Chunk.make(1, 2, 3, 4)
console.log(Chunk.lastUnsafe(chunk)) // 4

const singleElement = Chunk.make("hello")
console.log(Chunk.lastUnsafe(singleElement)) // "hello"

// Use Chunk.last when the chunk may be empty
console.log(Option.isNone(Chunk.last(Chunk.empty()))) // true
```

**Signature**

```ts
declare const lastUnsafe: <A>(self: Chunk<A>) => A
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L1510)

Since v4.0.0

# utils

## Chunk (namespace)

A namespace containing utility types for Chunk operations.

**Example** (Working with Chunk utility types)

```ts
import type { Chunk } from "effect"

// Extract the element type from a Chunk
declare const chunk: Chunk.Chunk<string>
type ElementType = Chunk.Chunk.Infer<typeof chunk> // string

// Create a preserving non-emptiness
declare const nonEmptyChunk: Chunk.NonEmptyChunk<number>
type WithString = Chunk.Chunk.With<typeof nonEmptyChunk, string> // Chunk.NonEmptyChunk<string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L1554)

Since v2.0.0

### Infer (type alias)

Infers the element type of a Chunk.

**Example** (Inferring element types)

```ts
import type { Chunk } from "effect"

declare const numberChunk: Chunk.Chunk<number>
declare const stringChunk: Chunk.Chunk<string>

type NumberType = Chunk.Chunk.Infer<typeof numberChunk> // number
type StringType = Chunk.Chunk.Infer<typeof stringChunk> // string
```

**Signature**

```ts
type Infer<S> = S extends Chunk<infer A> ? A : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L1573)

Since v2.0.0

### With (type alias)

Constructs a Chunk type preserving non-emptiness.

**Example** (Preserving non-emptiness)

```ts
import type { Chunk } from "effect"

declare const regularChunk: Chunk.Chunk<number>
declare const nonEmptyChunk: Chunk.NonEmptyChunk<number>

type WithString1 = Chunk.Chunk.With<typeof regularChunk, string> // Chunk.Chunk<string>
type WithString2 = Chunk.Chunk.With<typeof nonEmptyChunk, string> // Chunk.NonEmptyChunk<string>
```

**Signature**

```ts
type With<S, A> = S extends NonEmptyChunk<any> ? NonEmptyChunk<A> : Chunk<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L1593)

Since v2.0.0

### OrNonEmpty (type alias)

Creates a non-empty Chunk if either input is non-empty.

**Example** (Preserving non-emptiness from either input)

```ts
import type { Chunk } from "effect"

declare const emptyChunk: Chunk.Chunk<number>
declare const nonEmptyChunk: Chunk.NonEmptyChunk<number>

type Result1 = Chunk.Chunk.OrNonEmpty<typeof emptyChunk, typeof emptyChunk, string> // Chunk.Chunk<string>
type Result2 = Chunk.Chunk.OrNonEmpty<typeof emptyChunk, typeof nonEmptyChunk, string> // Chunk.NonEmptyChunk<string>
type Result3 = Chunk.Chunk.OrNonEmpty<typeof nonEmptyChunk, typeof emptyChunk, string> // Chunk.NonEmptyChunk<string>
```

**Signature**

```ts
type OrNonEmpty<S, T, A> =
  S extends NonEmptyChunk<any> ? NonEmptyChunk<A> : T extends NonEmptyChunk<any> ? NonEmptyChunk<A> : Chunk<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L1626)

Since v2.0.0

### AndNonEmpty (type alias)

Creates a non-empty Chunk only if both inputs are non-empty.

**Example** (Requiring non-emptiness from both inputs)

```ts
import type { Chunk } from "effect"

declare const emptyChunk: Chunk.Chunk<number>
declare const nonEmptyChunk: Chunk.NonEmptyChunk<number>

type Result1 = Chunk.Chunk.AndNonEmpty<typeof emptyChunk, typeof emptyChunk, string> // Chunk.Chunk<string>
type Result2 = Chunk.Chunk.AndNonEmpty<typeof emptyChunk, typeof nonEmptyChunk, string> // Chunk.Chunk<string>
type Result3 = Chunk.Chunk.AndNonEmpty<typeof nonEmptyChunk, typeof nonEmptyChunk, string> // Chunk.NonEmptyChunk<string>
```

**Signature**

```ts
type AndNonEmpty<S, T, A> =
  S extends NonEmptyChunk<any> ? (T extends NonEmptyChunk<any> ? NonEmptyChunk<A> : Chunk<A>) : Chunk<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L1662)

Since v2.0.0

### Flatten (type alias)

Flattens a nested Chunk type.

**Example** (Flattening nested chunk types)

```ts
import type { Chunk } from "effect"

declare const nestedChunk: Chunk.Chunk<Chunk.Chunk<number>>
declare const nestedNonEmpty: Chunk.NonEmptyChunk<Chunk.NonEmptyChunk<string>>

type Flattened1 = Chunk.Chunk.Flatten<typeof nestedChunk> // Chunk.Chunk<number>
type Flattened2 = Chunk.Chunk.Flatten<typeof nestedNonEmpty> // Chunk.NonEmptyChunk<string>
```

**Signature**

```ts
type Flatten<T> =
  T extends NonEmptyChunk<NonEmptyChunk<infer A>>
    ? NonEmptyChunk<A>
    : T extends Chunk<Chunk<infer A>>
      ? Chunk<A>
      : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L1685)

Since v2.0.0

# zipping

## zip

Zips this chunk pointwise with the specified chunk.

**Example** (Zipping chunks)

```ts
import { Chunk } from "effect"

const numbers = Chunk.make(1, 2, 3)
const letters = Chunk.make("a", "b", "c")
const result = Chunk.zip(numbers, letters)
console.log(Chunk.toArray(result)) // [[1, "a"], [2, "b"], [3, "c"]]

// Different lengths - takes minimum length
const short = Chunk.make(1, 2)
const long = Chunk.make("a", "b", "c", "d")
const zipped = Chunk.zip(short, long)
console.log(Chunk.toArray(zipped)) // [[1, "a"], [2, "b"]]
```

**Signature**

```ts
declare const zip: {
  <B>(that: Chunk<B>): <A>(self: Chunk<A>) => Chunk<[A, B]>
  <A, B>(self: Chunk<A>, that: Chunk<B>): Chunk<[A, B]>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L2377)

Since v2.0.0

## zipWith

Zips this chunk pointwise with the specified chunk using the specified combiner.

**Example** (Zipping chunks with a function)

```ts
import { Chunk } from "effect"

const numbers = Chunk.make(1, 2, 3)
const letters = Chunk.make("a", "b", "c")
const result = Chunk.zipWith(numbers, letters, (n, l) => `${n}-${l}`)
console.log(Chunk.toArray(result)) // ["1-a", "2-b", "3-c"]

// Different lengths - takes minimum
const short = Chunk.make(1, 2)
const long = Chunk.make("a", "b", "c", "d")
const mixed = Chunk.zipWith(short, long, (n, l) => [n, l])
console.log(Chunk.toArray(mixed)) // [[1, "a"], [2, "b"]]
```

**Signature**

```ts
declare const zipWith: {
  <A, B, C>(that: Chunk<B>, f: (a: A, b: B) => C): (self: Chunk<A>) => Chunk<C>
  <A, B, C>(self: Chunk<A>, that: Chunk<B>, f: (a: A, b: B) => C): Chunk<C>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chunk.ts#L2345)

Since v2.0.0
