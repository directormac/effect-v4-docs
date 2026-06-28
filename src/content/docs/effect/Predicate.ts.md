---
title: Predicate.ts
nav_order: 76
parent: "effect"
---

## Predicate.ts overview

Defines runtime checks for values.

A `Predicate<A>` returns `true` or `false` for an `A`. A
`Refinement<A, B>` is a predicate that also narrows the TypeScript type when
it succeeds. This module includes guards for common JavaScript values,
property and tag checks, tuple and struct checks, boolean combinators, and
helpers for composing predicates and refinements.

Since v2.0.0

---

## Exports Grouped by Category

- [combinators](#combinators)
  - [Struct](#struct)
  - [Tuple](#tuple)
  - [and](#and)
  - [compose](#compose)
  - [eqv](#eqv)
  - [implies](#implies)
  - [mapInput](#mapinput)
  - [nand](#nand)
  - [nor](#nor)
  - [not](#not)
  - [or](#or)
  - [xor](#xor)
- [elements](#elements)
  - [every](#every)
  - [some](#some)
- [guards](#guards)
  - [hasProperty](#hasproperty)
  - [isBigInt](#isbigint)
  - [isBoolean](#isboolean)
  - [isDate](#isdate)
  - [isError](#iserror)
  - [isFunction](#isfunction)
  - [isIterable](#isiterable)
  - [isMap](#ismap)
  - [isNever](#isnever)
  - [isNotNull](#isnotnull)
  - [isNotNullish](#isnotnullish)
  - [isNotUndefined](#isnotundefined)
  - [isNull](#isnull)
  - [isNullish](#isnullish)
  - [isNumber](#isnumber)
  - [isObject](#isobject)
  - [isObjectKeyword](#isobjectkeyword)
  - [isObjectOrArray](#isobjectorarray)
  - [isPromise](#ispromise)
  - [isPromiseLike](#ispromiselike)
  - [isPropertyKey](#ispropertykey)
  - [isReadonlyObject](#isreadonlyobject)
  - [isRegExp](#isregexp)
  - [isSet](#isset)
  - [isString](#isstring)
  - [isSymbol](#issymbol)
  - [isTagged](#istagged)
  - [isTruthy](#istruthy)
  - [isTupleOf](#istupleof)
  - [isTupleOfAtLeast](#istupleofatleast)
  - [isUint8Array](#isuint8array)
  - [isUndefined](#isundefined)
  - [isUnknown](#isunknown)
- [models](#models)
  - [Predicate (interface)](#predicate-interface)
  - [Refinement (interface)](#refinement-interface)
- [type lambdas](#type-lambdas)
  - [PredicateTypeLambda (interface)](#predicatetypelambda-interface)
- [utils](#utils)
  - [Predicate (namespace)](#predicate-namespace)
    - [In (type alias)](#in-type-alias)
    - [Any (type alias)](#any-type-alias)
  - [Refinement (namespace)](#refinement-namespace)
    - [In (type alias)](#in-type-alias-1)
    - [Out (type alias)](#out-type-alias)
    - [Any (type alias)](#any-type-alias-1)

---

# combinators

## Struct

Creates a predicate for objects by applying predicates to named properties.

**When to use**

Use when you want to validate a record shape at runtime by lifting property
predicates into an object predicate.

**Details**

Returns a refinement if any field predicate is a refinement. Only the
specified keys are checked, and extra keys are ignored.

**Example** (Checking structs)

```ts
import { Predicate } from "effect"

const userCheck = Predicate.Struct({
  id: Predicate.isNumber,
  name: Predicate.isString
})

console.log(userCheck({ id: 1, name: "Ada" }))
```

**See**

- `Tuple`
- `hasProperty`

**Signature**

```ts
declare const Struct: <R extends Record<string, Predicate.Any>>(
  fields: R
) => [Extract<R[keyof R], Refinement.Any>] extends [never]
  ? Predicate<{ readonly [K in keyof R]: Predicate.In<R[K]> }>
  : Refinement<
      { readonly [K in keyof R]: R[K] extends Refinement.Any ? Refinement.In<R[K]> : Predicate.In<R[K]> },
      { readonly [K in keyof R]: R[K] extends Refinement.Any ? Refinement.Out<R[K]> : Predicate.In<R[K]> }
    >
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Predicate.ts#L1499)

Since v4.0.0

## Tuple

Creates a predicate for tuples by applying predicates to each element.

**When to use**

Use when you want to validate tuple positions independently by lifting
element predicates into a tuple predicate.

**Details**

Returns a refinement if any element predicate is a refinement. Evaluation
stops at the first failing element.

**Example** (Checking tuples)

```ts
import { Predicate } from "effect"

const tupleCheck = Predicate.Tuple([(n: number) => n > 0, Predicate.isString])

console.log(tupleCheck([1, "ok"]))
```

**See**

- `Struct`
- `isTupleOf`

**Signature**

```ts
declare const Tuple: <const T extends ReadonlyArray<Predicate.Any>>(
  elements: T
) => [Extract<T[number], Refinement.Any>] extends [never]
  ? Predicate<{ readonly [I in keyof T]: Predicate.In<T[I]> }>
  : Refinement<
      { readonly [I in keyof T]: T[I] extends Refinement.Any ? Refinement.In<T[I]> : Predicate.In<T[I]> },
      { readonly [I in keyof T]: T[I] extends Refinement.Any ? Refinement.Out<T[I]> : Predicate.In<T[I]> }
    >
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Predicate.ts#L1450)

Since v4.0.0

## and

Creates a predicate that returns `true` only if both predicates are `true`.

**When to use**

Use when you want to combine `Predicate`s with AND, accepting values that
satisfy multiple conditions, including refinements that narrow to an
intersection.

**Details**

Evaluation short-circuits on the first `false`. For refinements, the output
type is an intersection.

**Example** (Checking both conditions)

```ts
import { Predicate } from "effect"

const hasAAndB = Predicate.and(Predicate.hasProperty("a"), Predicate.hasProperty("b"))

const input: unknown = JSON.parse(`{"a":1,"b":"ok"}`)
if (hasAAndB(input)) {
  // input has both properties at this point
  const a = input.a
  const b = input.b
}
```

**See**

- `or`
- `not`

**Signature**

```ts
declare const and: {
  <A, C extends A>(that: Refinement<A, C>): <B extends A>(self: Refinement<A, B>) => Refinement<A, B & C>
  <A, B extends A, C extends A>(self: Refinement<A, B>, that: Refinement<A, C>): Refinement<A, B & C>
  <A>(that: Predicate<A>): (self: Predicate<A>) => Predicate<A>
  <A>(self: Predicate<A>, that: Predicate<A>): Predicate<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Predicate.ts#L1621)

Since v2.0.0

## compose

Composes two predicates or refinements into one.

**When to use**

Use when you want to compose two `Predicate` checks in sequence, especially
when chaining refinements for progressive narrowing.

**Details**

For refinements, the output type is narrowed by both checks. Evaluation
short-circuits on the first `false`.

**Example** (Composing refinements)

```ts
import { Predicate } from "effect"

const isNumber: Predicate.Refinement<unknown, number> = (u): u is number => typeof u === "number"
const isInteger: Predicate.Refinement<number, number> = (n): n is number => Number.isInteger(n)

const isIntegerNumber = Predicate.compose(isNumber, isInteger)

console.log(isIntegerNumber(1))
```

**See**

- `and`
- `Refinement`

**Signature**

```ts
declare const compose: {
  <A, B extends A, C extends B>(bc: Refinement<B, C>): (ab: Refinement<A, B>) => Refinement<A, C>
  <A, B extends A>(bc: Predicate<NoInfer<B>>): (ab: Refinement<A, B>) => Refinement<A, B>
  <A, B extends A, C extends B>(ab: Refinement<A, B>, bc: Refinement<B, C>): Refinement<A, C>
  <A, B extends A>(ab: Refinement<A, B>, bc: Predicate<NoInfer<B>>): Refinement<A, B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Predicate.ts#L1411)

Since v2.0.0

## eqv

Creates a predicate that returns `true` when both predicates agree.

**When to use**

Use when you want to check equivalence of two `Predicate`s.

**Details**

Returns `true` when both results are equal.

**Example** (Defining equivalence)

```ts
import { Predicate } from "effect"

const isEven = (n: number) => n % 2 === 0
const same = Predicate.eqv(isEven, isEven)

console.log(same(3))
```

**See**

- `xor`

**Signature**

```ts
declare const eqv: {
  <A>(that: Predicate<A>): (self: Predicate<A>) => Predicate<A>
  <A>(self: Predicate<A>, that: Predicate<A>): Predicate<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Predicate.ts#L1687)

Since v2.0.0

## implies

Creates a predicate representing logical implication: if `antecedent`, then `consequent`.

**When to use**

Use when you need to encode logical implication between `Predicate` rules,
where one rule only applies when a precondition holds.

**Details**

Models constraints like "if A then B" and returns `true` when the antecedent
is `false`.

**Example** (Checking implication)

```ts
import { Predicate } from "effect"

const isAdult = (age: number) => age >= 18
const canVote = (age: number) => age >= 18
const implies = Predicate.implies(isAdult, canVote)

console.log(implies(16))
```

**See**

- `and`
- `or`

**Signature**

```ts
declare const implies: {
  <A>(consequent: Predicate<A>): (antecedent: Predicate<A>) => Predicate<A>
  <A>(antecedent: Predicate<A>, consequent: Predicate<A>): Predicate<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Predicate.ts#L1722)

Since v2.0.0

## mapInput

Transforms the input of a predicate using a mapping function.

**When to use**

Use when you have a predicate on `A` and want to check `B` values by mapping
each `B` to an `A`, such as checking lengths or projections.

**Details**

Returns a new predicate that applies `f` before `self`. There is no
additional short-circuiting beyond what `self` does.

**Example** (Checking string length)

```ts
import { Predicate } from "effect"

const isLongerThan2 = Predicate.mapInput((s: string) => s.length)((n: number) => n > 2)

console.log(isLongerThan2("hello"))
```

**See**

- `Predicate`
- `and`
- `not`

**Signature**

```ts
declare const mapInput: {
  <B, A>(f: (b: B) => A): (self: Predicate<A>) => Predicate<B>
  <A, B>(self: Predicate<A>, f: (b: B) => A): Predicate<B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Predicate.ts#L341)

Since v2.0.0

## nand

Creates a predicate that returns `true` unless both predicates are `true`.

**When to use**

Use when you want to combine two `Predicate`s with logical NAND semantics.

**Details**

Returns the negation of `and`.

**Example** (Checking NAND conditions)

```ts
import { Predicate } from "effect"

const notBoth = Predicate.nand(Predicate.isString, Predicate.isNumber)

console.log(notBoth("a"))
```

**See**

- `and`
- `not`

**Signature**

```ts
declare const nand: {
  <A>(that: Predicate<A>): (self: Predicate<A>) => Predicate<A>
  <A>(self: Predicate<A>, that: Predicate<A>): Predicate<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Predicate.ts#L1790)

Since v2.0.0

## nor

Creates a predicate that returns `true` when neither predicate is `true`.

**When to use**

Use when you want to combine two `Predicate`s with logical NOR semantics.

**Details**

Returns the negation of `or`.

**Example** (Checking NOR conditions)

```ts
import { Predicate } from "effect"

const neither = Predicate.nor(Predicate.isString, Predicate.isNumber)

console.log(neither(true))
```

**See**

- `or`
- `not`

**Signature**

```ts
declare const nor: {
  <A>(that: Predicate<A>): (self: Predicate<A>) => Predicate<A>
  <A>(self: Predicate<A>, that: Predicate<A>): Predicate<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Predicate.ts#L1756)

Since v2.0.0

## not

Negates a predicate.

**When to use**

Use when you want the inverse of an existing predicate.

**Details**

Returns a new predicate that flips the boolean result.

**Example** (Negating a predicate)

```ts
import { Predicate } from "effect"

const isNotString = Predicate.not(Predicate.isString)

console.log(isNotString(1))
```

**See**

- `and`
- `or`
- `xor`

**Signature**

```ts
declare const not: <A>(self: Predicate<A>) => Predicate<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Predicate.ts#L1545)

Since v2.0.0

## or

Creates a predicate that returns `true` if either predicate is `true`.

**When to use**

Use when you want to combine `Predicate`s with OR, accepting values that
satisfy at least one condition, including refinements that narrow to a union.

**Details**

Evaluation short-circuits on the first `true`. For refinements, the output
type is a union.

**Example** (Checking either condition)

```ts
import { Predicate } from "effect"

const isStringOrNumber = Predicate.or(Predicate.isString, Predicate.isNumber)

console.log(isStringOrNumber("a"))
```

**See**

- `and`
- `xor`

**Signature**

```ts
declare const or: {
  <A, C extends A>(that: Refinement<A, C>): <B extends A>(self: Refinement<A, B>) => Refinement<A, B | C>
  <A, B extends A, C extends A>(self: Refinement<A, B>, that: Refinement<A, C>): Refinement<A, B | C>
  <A>(that: Predicate<A>): (self: Predicate<A>) => Predicate<A>
  <A>(self: Predicate<A>, that: Predicate<A>): Predicate<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Predicate.ts#L1577)

Since v2.0.0

## xor

Creates a predicate that returns `true` if exactly one predicate is `true`.

**When to use**

Use when you want to combine two `Predicate`s with exclusive-or semantics.

**Details**

Returns `true` when results differ.

**Example** (Checking exclusive-or conditions)

```ts
import { Predicate } from "effect"

const isEven = (n: number) => n % 2 === 0
const isPositive = (n: number) => n > 0
const either = Predicate.xor(isEven, isPositive)

console.log(either(-2))
```

**See**

- `or`
- `and`

**Signature**

```ts
declare const xor: {
  <A>(that: Predicate<A>): (self: Predicate<A>) => Predicate<A>
  <A>(self: Predicate<A>, that: Predicate<A>): Predicate<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Predicate.ts#L1656)

Since v2.0.0

# elements

## every

Creates a predicate that returns `true` if all predicates in the collection return `true`.

**When to use**

Use when you have a dynamic list of predicates to apply.

**Details**

Evaluation short-circuits on the first `false`. The collection is iterated
each time the predicate is called.

**Example** (Checking all predicates)

```ts
import { Predicate } from "effect"

const allChecks = Predicate.every([Predicate.isNumber, (n: number) => n > 0])

console.log(allChecks(2))
```

**See**

- `some`
- `and`

**Signature**

```ts
declare const every: <A>(collection: Iterable<Predicate<A>>) => Predicate<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Predicate.ts#L1825)

Since v2.0.0

## some

Creates a predicate that returns `true` if any predicate in the collection returns `true`.

**When to use**

Use when you have a dynamic list of predicates and only need one to pass.

**Details**

Evaluation short-circuits on the first `true`. The collection is iterated
each time the predicate is called.

**Example** (Checking any predicate)

```ts
import { Predicate } from "effect"

const anyCheck = Predicate.some([Predicate.isString, Predicate.isNumber])

console.log(anyCheck("ok"))
```

**See**

- `every`
- `or`

**Signature**

```ts
declare const some: <A>(collection: Iterable<Predicate<A>>) => Predicate<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Predicate.ts#L1863)

Since v2.0.0

# guards

## hasProperty

Checks whether a value has a given property key.

**When to use**

Use when you need a `Predicate` guard for property access on `unknown`
values with a simple structural object check.

**Details**

Uses the `in` operator and `isObjectKeyword`. This does not check property
value types.

**Example** (Guarding object properties)

```ts
import { Predicate } from "effect"

const hasName = Predicate.hasProperty("name")
const data: unknown = { name: "Ada" }

if (hasName(data)) {
  console.log(data.name)
}
```

**See**

- `isTagged`
- `isObjectKeyword`

**Signature**

```ts
declare const hasProperty: {
  <P extends PropertyKey>(property: P): (self: unknown) => self is { [K in P]: unknown }
  <P extends PropertyKey>(self: unknown, property: P): self is { [K in P]: unknown }
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Predicate.ts#L1131)

Since v2.0.0

## isBigInt

Checks whether a value is a `bigint`.

**When to use**

Use when you need a `Predicate` guard to narrow an `unknown` value to a
bigint.

**Details**

Uses `typeof input === "bigint"`.

**Example** (Guarding bigints)

```ts
import { Predicate } from "effect"

const data: unknown = 1n

if (Predicate.isBigInt(data)) {
  console.log(data + 2n)
}
```

**See**

- `isNumber`

**Signature**

```ts
declare const isBigInt: (input: unknown) => input is bigint
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Predicate.ts#L637)

Since v2.0.0

## isBoolean

Checks whether a value is a `boolean`.

**When to use**

Use when you need a `Predicate` guard to narrow an `unknown` value to a
boolean.

**Details**

Uses `typeof input === "boolean"`.

**Example** (Guarding booleans)

```ts
import { Predicate } from "effect"

const data: unknown = true

if (Predicate.isBoolean(data)) {
  console.log(data ? "yes" : "no")
}
```

**See**

- `isString`
- `isNumber`

**Signature**

```ts
declare const isBoolean: (input: unknown) => input is boolean
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Predicate.ts#L605)

Since v2.0.0

## isDate

Checks whether a value is a `Date`.

**When to use**

Use when you need a `Predicate` runtime guard for dates.

**Details**

Uses `instanceof Date`.

**Example** (Guarding Date values)

```ts
import { Predicate } from "effect"

const data: unknown = new Date()

console.log(Predicate.isDate(data))
```

**See**

- `isRegExp`

**Signature**

```ts
declare const isDate: (input: unknown) => input is Date
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Predicate.ts#L1258)

Since v2.0.0

## isError

Checks whether a value is an `Error`.

**When to use**

Use when you need a `Predicate` guard for errors caught from unknown sources.

**Details**

Uses `instanceof Error`.

**Example** (Guarding errors)

```ts
import { Predicate } from "effect"

const data: unknown = new Error("boom")

console.log(Predicate.isError(data))
```

**See**

- `isUnknown`

**Signature**

```ts
declare const isError: (input: unknown) => input is Error
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Predicate.ts#L1199)

Since v2.0.0

## isFunction

Checks whether a value is a `function`.

**When to use**

Use when you need a `Predicate` guard to narrow an `unknown` value to a
callable function.

**Details**

Uses `typeof input === "function"`.

**Example** (Guarding functions)

```ts
import { Predicate } from "effect"

const data: unknown = () => 1

if (Predicate.isFunction(data)) {
  console.log(data())
}
```

**See**

- `isObjectKeyword`

**Signature**

```ts
declare const isFunction: (input: unknown) => input is Function
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Predicate.ts#L736)

Since v2.0.0

## isIterable

Checks whether a value is iterable.

**When to use**

Use when you need a `Predicate` guard before iterating an unknown value.

**Details**

Accepts strings as iterable and uses `hasProperty` for `Symbol.iterator`.

**Example** (Guarding iterables)

```ts
import { Predicate } from "effect"

const data: unknown = [1, 2, 3]

console.log(Predicate.isIterable(data))
```

**See**

- `isSet`
- `isMap`

**Signature**

```ts
declare const isIterable: (input: unknown) => input is Iterable<unknown>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Predicate.ts#L1288)

Since v2.0.0

## isMap

Checks whether a value is a `Map`.

**When to use**

Use when you need a `Predicate` runtime guard for `Map` values.

**Details**

Uses `instanceof Map`.

**Example** (Guarding a Map)

```ts
import { Predicate } from "effect"

const data: unknown = new Map([["a", 1]])

if (Predicate.isMap(data)) {
  console.log(data.size)
}
```

**See**

- `isSet`
- `isIterable`

**Signature**

```ts
declare const isMap: (input: unknown) => input is Map<unknown, unknown>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Predicate.ts#L505)

Since v2.0.0

## isNever

Type guard that always returns `false`.

**When to use**

Use when you need a `Predicate` that never accepts, e.g. in default branches.

**Example** (Matching no values)

```ts
import { Predicate } from "effect"

console.log(Predicate.isNever("anything"))
```

**See**

- `isUnknown`

**Signature**

```ts
declare const isNever: (_: unknown) => _ is never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Predicate.ts#L949)

Since v2.0.0

## isNotNull

Checks whether a value is not `null`.

**When to use**

Use when you need a `Predicate` refinement that filters out `null` while
preserving other falsy values.

**Details**

Returns a refinement that excludes `null`.

**Example** (Filtering null values)

```ts
import { Predicate } from "effect"

const values = [1, null, 2]
const nonNull = values.filter(Predicate.isNotNull)

console.log(nonNull)
```

**See**

- `isNull`
- `isNotNullish`

**Signature**

```ts
declare const isNotNull: <A>(input: A) => input is Exclude<A, null>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Predicate.ts#L861)

Since v2.0.0

## isNotNullish

Checks whether a value is not `null` and not `undefined`.

**When to use**

Use when you need a `Predicate` refinement that filters out nullish values
but keeps other falsy ones.

**Details**

Uses `input != null`.

**Example** (Filtering non-nullish values)

```ts
import { Predicate } from "effect"

const values = [0, null, "", undefined]
const present = values.filter(Predicate.isNotNullish)

console.log(present)
```

**See**

- `isNullish`
- `isNotNull`
- `isNotUndefined`

**Signature**

```ts
declare const isNotNullish: <A>(input: A) => input is NonNullable<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Predicate.ts#L926)

Since v4.0.0

## isNotUndefined

Checks whether a value is not `undefined`.

**When to use**

Use when you need a `Predicate` refinement that filters out `undefined`
while preserving other falsy values.

**Details**

Returns a refinement that excludes `undefined`.

**Example** (Filtering undefined values)

```ts
import { Predicate } from "effect"

const values = [1, undefined, 2]
const defined = values.filter(Predicate.isNotUndefined)

console.log(defined)
```

**See**

- `isUndefined`
- `isNotNullish`

**Signature**

```ts
declare const isNotUndefined: <A>(input: A) => input is Exclude<A, undefined>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Predicate.ts#L799)

Since v2.0.0

## isNull

Checks whether a value is `null`.

**When to use**

Use when you need a `Predicate` guard for nullable values.

**Details**

Uses `input === null`.

**Example** (Guarding null values)

```ts
import { Predicate } from "effect"

const data: unknown = null

console.log(Predicate.isNull(data))
```

**See**

- `isNotNull`
- `isNullish`

**Signature**

```ts
declare const isNull: (input: unknown) => input is null
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Predicate.ts#L829)

Since v2.0.0

## isNullish

Checks whether a value is `null` or `undefined`.

**When to use**

Use when you need a `Predicate` guard for nullish values.

**Details**

Uses `input === null || input === undefined`.

**Example** (Guarding nullish values)

```ts
import { Predicate } from "effect"

const values = [0, null, "", undefined]
const nullish = values.filter(Predicate.isNullish)

console.log(nullish)
```

**See**

- `isNotNullish`
- `isUndefined`
- `isNull`

**Signature**

```ts
declare const isNullish: <A>(input: A) => input is A & (null | undefined)
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Predicate.ts#L893)

Since v4.0.0

## isNumber

Checks whether a value is a `number`.

**When to use**

Use when you need a `Predicate` guard to narrow an `unknown` value to a
number.

**Details**

Uses `typeof input === "number"` and does not exclude `NaN` or `Infinity`.

**Example** (Guarding numbers)

```ts
import { Predicate } from "effect"

const data: unknown = 42

if (Predicate.isNumber(data)) {
  console.log(data + 1)
}
```

**See**

- `isBigInt`
- `isString`

**Signature**

```ts
declare const isNumber: (input: unknown) => input is number
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Predicate.ts#L572)

Since v2.0.0

## isObject

Checks whether a value is a non-null object value that is not an array.

**When to use**

Use to narrow unknown input to a non-null, non-array object with a
`Predicate` guard.

**Details**

This is a structural runtime check using `typeof input === "object"`, so it
also accepts object instances such as `Date`, `Map`, class instances, and
typed arrays. It excludes `null` and arrays.

**Example** (Guarding objects)

```ts
import { Predicate } from "effect"

console.log(Predicate.isObject({ a: 1 }))
console.log(Predicate.isObject([1, 2]))
```

**See**

- `isObjectOrArray`
- `isReadonlyObject`

**Signature**

```ts
declare const isObject: (input: unknown) => input is { [x: PropertyKey]: unknown }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Predicate.ts#L1033)

Since v2.0.0

## isObjectKeyword

Checks whether a value is an `object` in the JavaScript sense (objects, arrays, functions).

**When to use**

Use when you need a `Predicate` guard that accepts arrays and functions as
well as objects.

**Details**

Returns `true` for arrays and functions, and `false` for `null`.

**Example** (Checking object keywords)

```ts
import { Predicate } from "effect"

console.log(Predicate.isObjectKeyword(() => 1))
console.log(Predicate.isObjectKeyword(null))
```

**See**

- `isObject`
- `isObjectOrArray`

**Signature**

```ts
declare const isObjectKeyword: (input: unknown) => input is object
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Predicate.ts#L1096)

Since v4.0.0

## isObjectOrArray

Checks whether a value is an object or an array (non-null object).

**When to use**

Use when you need a `Predicate` guard that accepts plain objects and arrays,
but not `null`.

**Details**

Uses `typeof input === "object" && input !== null` and includes arrays.

**Example** (Checking objects or arrays)

```ts
import { Predicate } from "effect"

console.log(Predicate.isObjectOrArray([]))
```

**See**

- `isObject`
- `isObjectKeyword`

**Signature**

```ts
declare const isObjectOrArray: (input: unknown) => input is { [x: PropertyKey]: unknown } | Array<unknown>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Predicate.ts#L1001)

Since v4.0.0

## isPromise

Checks whether a value is a `Promise`-like object with `then` and `catch`.

**When to use**

Use when you need a `Predicate` guard for promise instances across realms.

**Details**

Performs a structural check for `then` and `catch` functions.

**Example** (Guarding promises)

```ts
import { Predicate } from "effect"

const data: unknown = Promise.resolve(1)

console.log(Predicate.isPromise(data))
```

**See**

- `isPromiseLike`

**Signature**

```ts
declare const isPromise: (input: unknown) => input is Promise<unknown>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Predicate.ts#L1317)

Since v2.0.0

## isPromiseLike

Checks whether a value is `PromiseLike` (has a `then` method).

**When to use**

Use when you need a `Predicate` guard for promise-like values with a
callable `then` method.

**Details**

Performs a structural check for a callable `then`.

**Example** (Guarding promise-like values)

```ts
import { Predicate } from "effect"

const data: unknown = { then: () => {} }

console.log(Predicate.isPromiseLike(data))
```

**See**

- `isPromise`

**Signature**

```ts
declare const isPromiseLike: (input: unknown) => input is PromiseLike<unknown>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Predicate.ts#L1347)

Since v2.0.0

## isPropertyKey

Checks whether a value is a valid `PropertyKey` (string, number, or symbol).

**When to use**

Use when you need a `Predicate` guard for unknown property keys before
indexing.

**Details**

Uses `isString`, `isNumber`, and `isSymbol`.

**Example** (Guarding property keys)

```ts
import { Predicate } from "effect"

const key: unknown = "name"
const obj: Record<PropertyKey, unknown> = { name: "Ada" }

if (Predicate.isPropertyKey(key) && key in obj) {
  console.log(obj[key])
}
```

**See**

- `isString`
- `isNumber`
- `isSymbol`

**Signature**

```ts
declare const isPropertyKey: (u: unknown) => u is PropertyKey
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Predicate.ts#L704)

Since v4.0.0

## isReadonlyObject

Checks whether a value is a non-null, non-array object and narrows it to a
readonly indexable object type.

**When to use**

Use to narrow unknown input to a readonly view of a non-null, non-array
object with a `Predicate` guard.

**Details**

Readonly-ness is a TypeScript type-level view; it is not observable at
runtime. This delegates to `isObject`, so class instances and built-in object
instances are accepted.

**Example** (Checking readonly objects)

```ts
import { Predicate } from "effect"

const data: unknown = { a: 1 }

console.log(Predicate.isReadonlyObject(data))
```

**See**

- `isObject`

**Signature**

```ts
declare const isReadonlyObject: (input: unknown) => input is { readonly [x: PropertyKey]: unknown }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Predicate.ts#L1066)

Since v4.0.0

## isRegExp

Checks whether a value is a `RegExp`.

**When to use**

Use when you need a `Predicate` runtime guard for regular expressions.

**Details**

Uses `instanceof RegExp`.

**Example** (Guarding RegExp values)

```ts
import { Predicate } from "effect"

const data: unknown = /abc/

console.log(Predicate.isRegExp(data))
```

**See**

- `isDate`

**Signature**

```ts
declare const isRegExp: (input: unknown) => input is RegExp
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Predicate.ts#L1376)

Since v3.9.0

## isSet

Checks whether a value is a `Set`.

**When to use**

Use when you need a `Predicate` runtime guard for `Set` values.

**Details**

Uses `instanceof Set`.

**Example** (Guarding a Set)

```ts
import { Predicate } from "effect"

const data: unknown = new Set([1, 2])

if (Predicate.isSet(data)) {
  console.log(data.size)
}
```

**See**

- `isMap`
- `isIterable`

**Signature**

```ts
declare const isSet: (input: unknown) => input is Set<unknown>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Predicate.ts#L473)

Since v2.0.0

## isString

Checks whether a value is a `string`.

**When to use**

Use when you need a `Predicate` guard to narrow an `unknown` value to a
string.

**Details**

Uses `typeof input === "string"`.

**Example** (Guarding strings)

```ts
import { Predicate } from "effect"

const data: unknown = "hi"

if (Predicate.isString(data)) {
  console.log(data.toUpperCase())
}
```

**See**

- `isNumber`
- `isBoolean`
- `Refinement`

**Signature**

```ts
declare const isString: (input: unknown) => input is string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Predicate.ts#L539)

Since v2.0.0

## isSymbol

Checks whether a value is a `symbol`.

**When to use**

Use when you need a `Predicate` guard to narrow an `unknown` value to a
symbol.

**Details**

Uses `typeof input === "symbol"`.

**Example** (Guarding symbols)

```ts
import { Predicate } from "effect"

const data: unknown = Symbol.for("id")

if (Predicate.isSymbol(data)) {
  console.log(data.description)
}
```

**See**

- `isPropertyKey`

**Signature**

```ts
declare const isSymbol: (input: unknown) => input is symbol
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Predicate.ts#L669)

Since v2.0.0

## isTagged

Checks whether a value has a `_tag` property equal to the given tag.

**When to use**

Use when you model tagged unions with a `_tag` field and want a quick
`Predicate` guard for tagged values.

**Details**

Uses `hasProperty` and strict equality on `_tag`.

**Example** (Guarding tagged values)

```ts
import { Predicate } from "effect"

const isOk = Predicate.isTagged("Ok")

console.log(isOk({ _tag: "Ok", value: 1 }))
```

**See**

- `hasProperty`

**Signature**

```ts
declare const isTagged: {
  <K extends string>(tag: K): (self: unknown) => self is { _tag: K }
  <K extends string>(self: unknown, tag: K): self is { _tag: K }
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Predicate.ts#L1166)

Since v2.0.0

## isTruthy

Checks whether a value is truthy.

**When to use**

Use when you want a predicate that mirrors JavaScript truthiness and filters
out falsy values like `0`, `""`, and `false`.

**Details**

This uses `!!input` and treats `0`, `""`, `false`, `null`, and `undefined`
as false.

**Example** (Filtering truthy values)

```ts
import { Predicate } from "effect"

const values = [0, 1, "", "ok", false]
const truthy = values.filter(Predicate.isTruthy)

console.log(truthy)
```

**See**

- `isNullish`
- `isNotNullish`

**Signature**

```ts
declare const isTruthy: (input: unknown) => boolean
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Predicate.ts#L441)

Since v2.0.0

## isTupleOf

Checks whether a readonly array has exactly `n` elements.

**When to use**

Use when you need a `Predicate` guard for exact tuple length that narrows
`ReadonlyArray<T>` to `TupleOf<N, T>`.

**Details**

This only checks length, not element types, and returns a refinement on the
array type.

**Example** (Checking exact length)

```ts
import { Predicate } from "effect"

const isPair = Predicate.isTupleOf(2)

console.log(isPair([1, 2]))
```

**See**

- `isTupleOfAtLeast`
- `Tuple`

**Signature**

```ts
declare const isTupleOf: {
  <N extends number>(n: N): <T>(self: ReadonlyArray<T>) => self is TupleOf<N, T>
  <T, N extends number>(self: ReadonlyArray<T>, n: N): self is TupleOf<N, T>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Predicate.ts#L374)

Since v3.3.0

## isTupleOfAtLeast

Checks whether a readonly array has at least `n` elements.

**When to use**

Use when you need a `Predicate` guard for tuple-like minimum length that
narrows `ReadonlyArray<T>` to `TupleOfAtLeast<N, T>`.

**Details**

This only checks length, not element types, and returns a refinement on the
array type.

**Example** (Checking minimum length)

```ts
import { Predicate } from "effect"

const hasAtLeast2 = Predicate.isTupleOfAtLeast(2)

console.log(hasAtLeast2([1, 2, 3]))
```

**See**

- `isTupleOf`
- `Tuple`

**Signature**

```ts
declare const isTupleOfAtLeast: {
  <N extends number>(n: N): <T>(self: ReadonlyArray<T>) => self is TupleOfAtLeast<N, T>
  <T, N extends number>(self: ReadonlyArray<T>, n: N): self is TupleOfAtLeast<N, T>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Predicate.ts#L407)

Since v3.3.0

## isUint8Array

Checks whether a value is a `Uint8Array`.

**When to use**

Use when you need a `Predicate` runtime guard for binary data.

**Details**

Uses `instanceof Uint8Array`.

**Example** (Guarding Uint8Array values)

```ts
import { Predicate } from "effect"

const data: unknown = new Uint8Array([1, 2])

console.log(Predicate.isUint8Array(data))
```

**See**

- `isIterable`
- `isSet`

**Signature**

```ts
declare const isUint8Array: (input: unknown) => input is Uint8Array
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Predicate.ts#L1229)

Since v2.0.0

## isUndefined

Checks whether a value is `undefined`.

**When to use**

Use when you need a `Predicate` guard for values that are exactly
`undefined`.

**Details**

Uses `input === undefined`.

**Example** (Guarding undefined values)

```ts
import { Predicate } from "effect"

const data: unknown = undefined

console.log(Predicate.isUndefined(data))
```

**See**

- `isNotUndefined`
- `isNullish`

**Signature**

```ts
declare const isUndefined: (input: unknown) => input is undefined
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Predicate.ts#L767)

Since v2.0.0

## isUnknown

Type guard that always returns `true`.

**When to use**

Use when you need a `Predicate` that always accepts, e.g. as a placeholder.

**Example** (Matching every value)

```ts
import { Predicate } from "effect"

console.log(Predicate.isUnknown(123))
```

**See**

- `isNever`

**Signature**

```ts
declare const isUnknown: (_: unknown) => _ is unknown
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Predicate.ts#L972)

Since v2.0.0

# models

## Predicate (interface)

A function that decides whether a value of type `A` satisfies a condition.

**When to use**

Use when you want a reusable boolean check for `A`, especially when you plan
to combine checks with `and`/`or` or pass a predicate to arrays
and iterables.

**Details**

A predicate returns `true` or `false` and never throws by itself. It does not
narrow types unless you use `Refinement`.

**Example** (Defining a predicate)

```ts
import { Predicate } from "effect"

const isPositive: Predicate.Predicate<number> = (n) => n > 0

console.log(isPositive(1))
```

**See**

- `Refinement`
- `mapInput`
- `and`

**Signature**

```ts
export interface Predicate<in A> {
  (a: A): boolean
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Predicate.ts#L46)

Since v2.0.0

## Refinement (interface)

A predicate that also narrows the input type when it returns `true`.

**When to use**

Use when you want a runtime check that refines `A` to `B` for TypeScript,
especially when composing type guards with `compose` or safely
checking `unknown` values.

**Details**

A refinement returns a type predicate (`a is B`). Use it with `if` or
`filter` to narrow types.

**Example** (Narrowing unknown values)

```ts
import { Predicate } from "effect"

const isString: Predicate.Refinement<unknown, string> = (u): u is string => typeof u === "string"

const data: unknown = "hello"
if (isString(data)) {
  console.log(data.toUpperCase())
}
```

**See**

- `Predicate`
- `compose`
- `isString`

**Signature**

```ts
export interface Refinement<in A, out B extends A> {
  (a: A): a is B
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Predicate.ts#L113)

Since v2.0.0

# type lambdas

## PredicateTypeLambda (interface)

Type-level lambda for higher-kinded usage of `Predicate`.

**When to use**

Use when you are defining APIs that abstract over predicates with HKTs and
need a `TypeLambda` instance for predicate-based type classes.

**Details**

This is type-only, creates no runtime value, and does not affect emitted
JavaScript.

**Example** (Type-level usage)

```ts
import { Predicate } from "effect"

type P = Predicate.Predicate<number>
type TL = Predicate.PredicateTypeLambda
```

**See**

- `Predicate`

**Signature**

```ts
export interface PredicateTypeLambda extends TypeLambda {
  readonly type: Predicate<this["Target"]>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Predicate.ts#L76)

Since v2.0.0

# utils

## Predicate (namespace)

Type-level utilities for working with `Predicate` types.

**When to use**

Use when you need to extract input types from predicate signatures while
writing generic helpers over predicate types.

**Details**

These utilities are type-only, create no runtime values, and the namespace is
erased at runtime.

**Example** (Extracting predicate input)

```ts
import { Predicate } from "effect"

type IsString = Predicate.Predicate<string>
type Input = Predicate.Predicate.In<IsString>
```

**See**

- `Predicate`
- `Refinement`

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Predicate.ts#L143)

Since v3.6.0

### In (type alias)

Extracts the input type `A` from a `Predicate<A>`.

**When to use**

Use when you want to infer the input type from a predicate type while
defining generic utilities over predicates.

**Details**

This is type-only and creates no runtime value. It resolves to `never` if
the type does not match `Predicate`.

**Example** (Inferring the input type)

```ts
import { Predicate } from "effect"

type P = Predicate.Predicate<number>
type Input = Predicate.Predicate.In<P>
```

**See**

- `Predicate.Any`
- `Refinement.In`

**Signature**

```ts
type In<T> = [T] extends [Predicate<infer _A>] ? _A : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Predicate.ts#L171)

Since v3.6.0

### Any (type alias)

A utility type representing any predicate type.

**When to use**

Use when you need a constraint for "any predicate" in generic code.

**Details**

This is type-only and creates no runtime value.

**Example** (Using generic constraints)

```ts
import { Predicate } from "effect"

type AnyPredicate = Predicate.Predicate.Any
```

**See**

- `Predicate.In`

**Signature**

```ts
type Any = Predicate<any>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Predicate.ts#L196)

Since v3.6.0

## Refinement (namespace)

Type-level utilities for working with `Refinement` types.

**When to use**

Use when you need to extract input and output types from refinement
signatures while writing generic helpers over refinements.

**Details**

These utilities are type-only, create no runtime values, and the namespace is
erased at runtime.

**Example** (Extracting refinement types)

```ts
import { Predicate } from "effect"

type IsString = Predicate.Refinement<unknown, string>
type Input = Predicate.Refinement.In<IsString>
type Output = Predicate.Refinement.Out<IsString>
```

**See**

- `Refinement`
- `Predicate`

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Predicate.ts#L226)

Since v3.6.0

### In (type alias)

Extracts the input type `A` from a `Refinement<A, B>`.

**When to use**

Use when you want to infer the input type from a refinement type.

**Details**

This is type-only and creates no runtime value. It resolves to `never` if
the type does not match `Refinement`.

**Example** (Inferring the input type)

```ts
import { Predicate } from "effect"

type R = Predicate.Refinement<unknown, string>
type Input = Predicate.Refinement.In<R>
```

**See**

- `Refinement.Out`
- `Predicate.In`

**Signature**

```ts
type In<T> = [T] extends [Refinement<infer _A, infer _>] ? _A : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Predicate.ts#L254)

Since v3.6.0

### Out (type alias)

Extracts the output type `B` from a `Refinement<A, B>`.

**When to use**

Use when you want to infer the narrowed type from a refinement type.

**Details**

This is type-only and creates no runtime value. It resolves to `never` if
the type does not match `Refinement`.

**Example** (Inferring the output type)

```ts
import { Predicate } from "effect"

type R = Predicate.Refinement<unknown, string>
type Output = Predicate.Refinement.Out<R>
```

**See**

- `Refinement.In`

**Signature**

```ts
type Out<T> = [T] extends [Refinement<infer _, infer _B>] ? _B : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Predicate.ts#L281)

Since v3.6.0

### Any (type alias)

A utility type representing any refinement type.

**When to use**

Use when you need a constraint for "any refinement" in generic code.

**Details**

This is type-only and creates no runtime value.

**Example** (Using generic constraints)

```ts
import { Predicate } from "effect"

type AnyRefinement = Predicate.Refinement.Any
```

**See**

- `Refinement.In`
- `Refinement.Out`

**Signature**

```ts
type Any = Refinement<any, any>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Predicate.ts#L307)

Since v3.6.0
