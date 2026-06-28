---
title: Equal.ts
nav_order: 27
parent: "effect"
---

## Equal.ts overview

Compares values with Effect's structural equality rules.

`equals` compares primitives, arrays, plain objects, maps, sets, dates,
regular expressions, and values that implement the `Equal` interface. This
module also defines the equality symbol, guards, adapters, map and set
comparison builders, and helpers for marking objects that should compare only
by reference.

Since v2.0.0

---

## Exports Grouped by Category

- [equality](#equality)
  - [byReference](#byreference)
  - [equals](#equals)
- [guards](#guards)
  - [isEqual](#isequal)
- [instances](#instances)
  - [asEquivalence](#asequivalence)
- [models](#models)
  - [Equal (interface)](#equal-interface)
- [symbols](#symbols)
  - [symbol](#symbol)
- [unsafe](#unsafe)
  - [byReferenceUnsafe](#byreferenceunsafe)

---

# equality

## byReference

Creates a proxy that uses reference equality instead of structural equality.

**When to use**

Use when you need to compare a plain object or array by identity without
mutating the original value.

**Details**

- Returns a `Proxy` wrapping `obj`. The proxy reads through to the
  original, so property access is unchanged.
- The proxy is registered in an internal WeakSet; `equals` returns
  `false` for any pair where at least one operand is in that set (unless
  they are the same reference).
- Each call creates a **new** proxy, so `byReference(x) !== byReference(x)`.
- Does **not** mutate the original object (unlike `byReferenceUnsafe`).

**Example** (Opting out of structural equality)

```ts
import { Equal } from "effect"

const a = { x: 1 }
const b = { x: 1 }

console.log(Equal.equals(a, b)) // true  (structural)

const aRef = Equal.byReference(a)
console.log(Equal.equals(aRef, b)) // false (reference)
console.log(Equal.equals(aRef, aRef)) // true  (same reference)
console.log(aRef.x) // 1     (proxy reads through)
```

**See**

- `byReferenceUnsafe` — same effect without a proxy (mutates the
  original)
- `equals` — the comparison function affected by this opt-out

**Signature**

```ts
declare const byReference: <T extends object>(obj: T) => T
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Equal.ts#L504)

Since v4.0.0

## equals

Checks whether two values are deeply structurally equal.

**When to use**

Use when you need Effect's default structural equality check.

**Details**

Returns a `boolean` and never throws. Primitives are compared by value, and
`NaN` equals `NaN`. Objects implementing `Equal` delegate to their
`[Equal.symbol]` method; if only one operand implements `Equal`, the result
is `false`.

Dates compare by ISO string, RegExps compare by string representation,
arrays compare element-by-element, Maps and Sets compare entries
order-independently, and plain objects compare enumerable keys recursively.
Functions without an `Equal` implementation compare by reference. Circular
references are handled when both structures are circular at the same depth.

Hash values are checked first as a fast-path rejection. The function also
supports dual data-last usage: call it with one argument to get a curried
predicate.

**Gotchas**

- Results are cached per object pair in a WeakMap. **Objects must not be
  mutated after their first comparison.**
- Map and Set comparisons are O(n²) in size.

**Example** (Comparing values)

```ts
import { Equal } from "effect"

// Primitives
console.log(Equal.equals(1, 1)) // true
console.log(Equal.equals(NaN, NaN)) // true
console.log(Equal.equals("a", "b")) // false

// Objects and arrays
console.log(Equal.equals({ a: 1, b: 2 }, { a: 1, b: 2 })) // true
console.log(Equal.equals([1, [2, 3]], [1, [2, 3]])) // true

// Dates
console.log(Equal.equals(new Date("2024-01-01"), new Date("2024-01-01"))) // true

// Maps (order-independent)
const m1 = new Map([
  ["a", 1],
  ["b", 2]
])
const m2 = new Map([
  ["b", 2],
  ["a", 1]
])
console.log(Equal.equals(m1, m2)) // true

// Curried form
const is5 = Equal.equals(5)
console.log(is5(5)) // true
console.log(is5(3)) // false
```

**See**

- `Equal` — the interface for custom equality
- `isEqual` — check whether a value implements `Equal`
- `asEquivalence` — wrap `equals` as an `Equivalence`

**Signature**

```ts
declare const equals: { <B>(that: B): <A>(self: A) => boolean; <A, B>(self: A, that: B): boolean }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Equal.ts#L176)

Since v2.0.0

# guards

## isEqual

Checks whether a value implements the `Equal` interface.

**When to use**

Use when you need generic utility code to distinguish `Equal` implementors
from plain values before calling `[Equal.symbol]` directly.

**Details**

- Pure function, no side effects.
- Returns `true` if and only if `u` has a property keyed by
  `symbol`.
- Acts as a TypeScript type guard, narrowing the input to `Equal`.

**Example** (Checking Equal values)

```ts
import { Equal, Hash } from "effect"

class Token implements Equal.Equal {
  constructor(readonly value: string) {}
  [Equal.symbol](that: Equal.Equal): boolean {
    return that instanceof Token && this.value === that.value
  }
  [Hash.symbol](): number {
    return Hash.string(this.value)
  }
}

console.log(Equal.isEqual(new Token("abc"))) // true
console.log(Equal.isEqual({ x: 1 })) // false
console.log(Equal.isEqual(42)) // false
```

**See**

- `Equal` — the interface being checked
- `symbol` — the property key that signals `Equal` support

**Signature**

```ts
declare const isEqual: (u: unknown) => u is Equal
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Equal.ts#L432)

Since v2.0.0

# instances

## asEquivalence

Wraps `equals` as an `Equivalence<A>`.

**When to use**

Use when you want to pass `Equal.equals` to APIs that require an
`Equivalence`.

**Details**

- Returns a function `(a: A, b: A) => boolean` that delegates to
  `equals`.
- Pure; allocates a thin wrapper on each call.

**Example** (Deduplicating with Equal semantics)

```ts
import { Array, Equal } from "effect"

const eq = Equal.asEquivalence<number>()
const result = Array.dedupeWith([1, 2, 2, 3, 1], eq)
console.log(result) // [1, 2, 3]
```

**See**

- `equals` — the underlying comparison function

**Signature**

```ts
declare const asEquivalence: <A>() => Equivalence<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Equal.ts#L462)

Since v4.0.0

# models

## Equal (interface)

The interface for types that define their own equality logic.

**When to use**

Use when you need value-based equality for a class (e.g. domain IDs,
coordinates, money values).

- When your type will be stored in `HashMap` or `HashSet`.
- When the default structural comparison is too broad or too narrow for
  your type.

**Details**

Any object that implements both `[Equal.symbol]` (equality) and
`[Hash.symbol]` (hashing) is recognized by `equals` and by hash-based
collections such as `HashMap` and `HashSet`.

- Extends `Hash.Hash`, so implementors **must** also provide `[Hash.symbol]`.
- The hash contract: if `a[Equal.symbol](b)` returns `true`, then
  `Hash.hash(a)` must equal `Hash.hash(b)`.
- `equals` delegates to this method when both operands implement it.
  If only one operand implements `Equal`, they are considered unequal.

**Example** (Comparing coordinates by value)

```ts
import { Equal, Hash } from "effect"

class Coordinate implements Equal.Equal {
  constructor(
    readonly x: number,
    readonly y: number
  ) {}

  [Equal.symbol](that: Equal.Equal): boolean {
    return that instanceof Coordinate && this.x === that.x && this.y === that.y
  }

  [Hash.symbol](): number {
    return Hash.string(`${this.x},${this.y}`)
  }
}

console.log(Equal.equals(new Coordinate(1, 2), new Coordinate(1, 2))) // true
console.log(Equal.equals(new Coordinate(1, 2), new Coordinate(3, 4))) // false
```

**See**

- `symbol` — the property key used by the equality method
- `equals` — the main comparison function
- `isEqual` — type guard for `Equal` implementors

**Signature**

```ts
export interface Equal extends Hash.Hash {
  [symbol](that: Equal): boolean
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Equal.ts#L106)

Since v2.0.0

# symbols

## symbol

Defines the unique string identifier for the `Equal` interface.

**When to use**

Use when you implement custom equality and need the computed property key for
the equality method.

**Details**

This is a pure constant with no allocation or side effects.

**Example** (Implementing Equal on a class)

```ts
import { Equal, Hash } from "effect"

class UserId implements Equal.Equal {
  constructor(readonly id: string) {}

  [Equal.symbol](that: Equal.Equal): boolean {
    return that instanceof UserId && this.id === that.id
  }

  [Hash.symbol](): number {
    return Hash.string(this.id)
  }
}
```

**See**

- `Equal` — the interface that uses this symbol
- `isEqual` — type guard for `Equal` implementors

**Signature**

```ts
declare const symbol: "~effect/interfaces/Equal"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Equal.ts#L52)

Since v2.0.0

# unsafe

## byReferenceUnsafe

Marks an object permanently to use reference equality, without creating a proxy.

**When to use**

Use when you need reference equality without proxy allocation and accept
permanently marking the original object for reference-only equality.

**Details**

- Adds `obj` to an internal WeakSet. From that point on, `equals`
  treats it as reference-only.
- Returns the **same** object (not a copy or proxy), so
  `byReferenceUnsafe(x) === x`.
- Does **not** affect the object's prototype, properties, or behavior
  beyond equality checks.

**Gotchas**

The marking is irreversible for the lifetime of the object.

**Example** (Marking an object for reference equality)

```ts
import { Equal } from "effect"

const obj1 = { a: 1, b: 2 }
const obj2 = { a: 1, b: 2 }

Equal.byReferenceUnsafe(obj1)

console.log(Equal.equals(obj1, obj2)) // false (reference)
console.log(Equal.equals(obj1, obj1)) // true  (same reference)
console.log(obj1 === Equal.byReferenceUnsafe(obj1)) // true (same object)
```

**See**

- `byReference` — safer alternative that creates a proxy
- `equals` — the comparison function affected by this opt-out

**Signature**

```ts
declare const byReferenceUnsafe: <T extends object>(obj: T) => T
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Equal.ts#L547)

Since v4.0.0
