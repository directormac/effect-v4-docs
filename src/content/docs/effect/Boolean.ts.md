---
title: Boolean.ts
nav_order: 4
parent: "effect"
---

## Boolean.ts overview

Works with TypeScript `boolean` values.

This module exposes the native `Boolean` constructor together with helpers
for checking values, choosing between lazy branches, combining booleans with
logical operations, checking collections with `every` or `some`, ordering
booleans, and reducing boolean values.

Since v2.0.0

---

## Exports Grouped by Category

- [combinators](#combinators)
  - [and](#and)
  - [eqv](#eqv)
  - [implies](#implies)
  - [nand](#nand)
  - [nor](#nor)
  - [not](#not)
  - [or](#or)
  - [xor](#xor)
- [constructors](#constructors)
  - [Boolean](#boolean)
- [guards](#guards)
  - [isBoolean](#isboolean)
- [instances](#instances)
  - [Equivalence](#equivalence)
  - [Order](#order)
- [math](#math)
  - [ReducerAnd](#reducerand)
  - [ReducerOr](#reduceror)
- [pattern matching](#pattern-matching)
  - [match](#match)
- [predicates](#predicates)
  - [every](#every)
  - [some](#some)

---

# combinators

## and

Combines two booleans using logical AND: `self && that`.

**When to use**

Use to require both boolean operands to be `true`.

**Details**

Supports both data-first and data-last forms.

**Example** (Combining booleans with AND)

```ts
import { Boolean } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(Boolean.and(true, true), true)
assert.deepStrictEqual(Boolean.and(true, false), false)
assert.deepStrictEqual(Boolean.and(false, true), false)
assert.deepStrictEqual(Boolean.and(false, false), false)
```

**Signature**

```ts
declare const and: { (that: boolean): (self: boolean) => boolean; (self: boolean, that: boolean): boolean }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Boolean.ts#L207)

Since v2.0.0

## eqv

Combines two booleans using EQV (aka XNOR): `!xor(self, that)`.

**When to use**

Use to accept when both boolean operands have the same truth value.

**Example** (Checking boolean equivalence)

```ts
import { Boolean } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(Boolean.eqv(true, true), true)
assert.deepStrictEqual(Boolean.eqv(true, false), false)
assert.deepStrictEqual(Boolean.eqv(false, true), false)
assert.deepStrictEqual(Boolean.eqv(false, false), true)
```

**Signature**

```ts
declare const eqv: { (that: boolean): (self: boolean) => boolean; (self: boolean, that: boolean): boolean }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Boolean.ts#L342)

Since v2.0.0

## implies

Combines two booleans using an implication: `(!self || that)`.

**When to use**

Use to model logical implication between a condition and a consequence.

**Example** (Checking boolean implication)

```ts
import { Boolean } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(Boolean.implies(true, true), true)
assert.deepStrictEqual(Boolean.implies(true, false), false)
assert.deepStrictEqual(Boolean.implies(false, true), true)
assert.deepStrictEqual(Boolean.implies(false, false), true)
```

**Signature**

```ts
declare const implies: { (that: boolean): (self: boolean) => boolean; (self: boolean, that: boolean): boolean }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Boolean.ts#L369)

Since v2.0.0

## nand

Combines two booleans using NAND: `!(self && that)`.

**When to use**

Use to negate a logical AND result.

**Example** (Combining booleans with NAND)

```ts
import { Boolean } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(Boolean.nand(true, true), false)
assert.deepStrictEqual(Boolean.nand(true, false), true)
assert.deepStrictEqual(Boolean.nand(false, true), true)
assert.deepStrictEqual(Boolean.nand(false, false), true)
```

**Signature**

```ts
declare const nand: { (that: boolean): (self: boolean) => boolean; (self: boolean, that: boolean): boolean }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Boolean.ts#L234)

Since v2.0.0

## nor

Combines two booleans using NOR: `!(self || that)`.

**When to use**

Use to accept only when both boolean operands are `false`.

**Example** (Combining booleans with NOR)

```ts
import { Boolean } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(Boolean.nor(true, true), false)
assert.deepStrictEqual(Boolean.nor(true, false), false)
assert.deepStrictEqual(Boolean.nor(false, true), false)
assert.deepStrictEqual(Boolean.nor(false, false), true)
```

**Signature**

```ts
declare const nor: { (that: boolean): (self: boolean) => boolean; (self: boolean, that: boolean): boolean }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Boolean.ts#L288)

Since v2.0.0

## not

Negates the given boolean: `!self`

**When to use**

Use to invert a boolean value.

**Example** (Negating booleans)

```ts
import { Boolean } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(Boolean.not(true), false)
assert.deepStrictEqual(Boolean.not(false), true)
```

**Signature**

```ts
declare const not: (self: boolean) => boolean
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Boolean.ts#L179)

Since v2.0.0

## or

Combines two booleans using OR: `self || that`.

**When to use**

Use to accept when either boolean operand is `true`.

**Example** (Combining booleans with OR)

```ts
import { Boolean } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(Boolean.or(true, true), true)
assert.deepStrictEqual(Boolean.or(true, false), true)
assert.deepStrictEqual(Boolean.or(false, true), true)
assert.deepStrictEqual(Boolean.or(false, false), false)
```

**Signature**

```ts
declare const or: { (that: boolean): (self: boolean) => boolean; (self: boolean, that: boolean): boolean }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Boolean.ts#L261)

Since v2.0.0

## xor

Combines two booleans using XOR: `(!self && that) || (self && !that)`.

**When to use**

Use to accept when exactly one boolean operand is `true`.

**Example** (Combining booleans with XOR)

```ts
import { Boolean } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(Boolean.xor(true, true), false)
assert.deepStrictEqual(Boolean.xor(true, false), true)
assert.deepStrictEqual(Boolean.xor(false, true), true)
assert.deepStrictEqual(Boolean.xor(false, false), false)
```

**Signature**

```ts
declare const xor: { (that: boolean): (self: boolean) => boolean; (self: boolean, that: boolean): boolean }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Boolean.ts#L315)

Since v2.0.0

# constructors

## Boolean

Exposes the global boolean constructor for JavaScript truthiness
coercion.

**When to use**

Use to access native JavaScript truthiness coercion from the Effect module
namespace.

**Gotchas**

This follows native truthiness rules. For example, non-empty strings such as
`"false"` coerce to `true`.

**Example** (Coercing values to booleans)

```ts
import { Boolean } from "effect"

const bool = Boolean.Boolean(1)
console.log(bool) // true

const fromString = Boolean.Boolean("false")
console.log(fromString) // true (non-empty string)

const fromZero = Boolean.Boolean(0)
console.log(fromZero) // false
```

**Signature**

```ts
declare const Boolean: BooleanConstructor
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Boolean.ts#L50)

Since v4.0.0

# guards

## isBoolean

Checks whether a value is a `boolean`.

**When to use**

Use to validate unknown input and narrow it to `boolean`.

**Example** (Checking for booleans)

```ts
import { Boolean } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(Boolean.isBoolean(true), true)
assert.deepStrictEqual(Boolean.isBoolean("true"), false)
```

**Signature**

```ts
declare const isBoolean: (input: unknown) => input is boolean
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Boolean.ts#L72)

Since v2.0.0

# instances

## Equivalence

Equivalence instance for booleans using strict equality (`===`).

**When to use**

Use when checking boolean equality through APIs that accept an equivalence
relation.

**Example** (Comparing booleans for equivalence)

```ts
import { Boolean } from "effect"

console.log(Boolean.Equivalence(true, true)) // true
console.log(Boolean.Equivalence(true, false)) // false
```

**Signature**

```ts
declare const Equivalence: Equ.Equivalence<boolean>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Boolean.ts#L157)

Since v2.0.0

## Order

Provides an `Order` instance for `boolean` that allows comparing and sorting boolean values.
In this ordering, `false` is considered less than `true`.

**When to use**

Use when you need to sort or compare boolean values through APIs that accept
an ordering instance where `false` comes before `true`.

**Example** (Comparing booleans)

```ts
import { Boolean } from "effect"

console.log(Boolean.Order(false, true)) // -1 (false < true)
console.log(Boolean.Order(true, false)) // 1 (true > false)
console.log(Boolean.Order(true, true)) // 0 (true === true)
```

**Signature**

```ts
declare const Order: order.Order<boolean>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Boolean.ts#L135)

Since v2.0.0

# math

## ReducerAnd

Reducer for combining `boolean`s using AND.

**When to use**

Use to require every accumulated boolean to be `true` through APIs that
consume a `Reducer`.

**Details**

The `initialValue` is `true`, so `combineAll([])` returns `true`.

**Gotchas**

`combineAll` uses the default left-to-right `Reducer.make` fold and does not
short-circuit on `false`.

**See**

- `ReducerOr` for reducing with OR semantics
- `every` for checking an iterable directly

**Signature**

```ts
declare const ReducerAnd: Reducer.Reducer<boolean>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Boolean.ts#L461)

Since v4.0.0

## ReducerOr

Reducer for combining `boolean`s using OR.

**When to use**

Use to reduce boolean values where the result should be `true` if any
combined value is `true`.

**Details**

The `initialValue` is `false`.

**See**

- `ReducerAnd` for reducing with AND semantics
- `some` for checking an iterable directly

**Signature**

```ts
declare const ReducerOr: Reducer.Reducer<boolean>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Boolean.ts#L481)

Since v4.0.0

# pattern matching

## match

Chooses between two lazy branches based on a boolean value.

**When to use**

Use to choose between two lazy branches based on a boolean value.

**Example** (Pattern matching on booleans)

```ts
import { Boolean } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(
  Boolean.match(true, {
    onFalse: () => "It's false!",
    onTrue: () => "It's true!"
  }),
  "It's true!"
)
```

**Signature**

```ts
declare const match: {
  <A, B = A>(options: { readonly onFalse: LazyArg<A>; readonly onTrue: LazyArg<B> }): (value: boolean) => A | B
  <A, B>(value: boolean, options: { readonly onFalse: LazyArg<A>; readonly onTrue: LazyArg<B> }): A | B
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Boolean.ts#L99)

Since v2.0.0

# predicates

## every

Checks whether every boolean in a collection is `true`.

**When to use**

Use to check that every boolean in an iterable is `true`.

**Example** (Checking every boolean)

```ts
import { Boolean } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(Boolean.every([true, true, true]), true)
assert.deepStrictEqual(Boolean.every([true, false, true]), false)
```

**See**

- `some` for checking whether at least one value is `true`
- `ReducerAnd` for reducing booleans with AND through a `Reducer`

**Signature**

```ts
declare const every: (collection: Iterable<boolean>) => boolean
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Boolean.ts#L397)

Since v2.0.0

## some

Checks whether at least one boolean in a collection is `true`.

**When to use**

Use to check that at least one boolean in an iterable is `true`.

**Example** (Checking some booleans)

```ts
import { Boolean } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(Boolean.some([true, false, true]), true)
assert.deepStrictEqual(Boolean.some([false, false, false]), false)
```

**See**

- `every` for checking whether all values are `true`
- `ReducerOr` for reducing booleans with OR through a `Reducer`

**Signature**

```ts
declare const some: (collection: Iterable<boolean>) => boolean
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Boolean.ts#L429)

Since v2.0.0
