---
title: Function.ts
nav_order: 39
parent: "effect"
---

## Function.ts overview

Provides small helpers for defining and reusing TypeScript functions.

The main helpers are `pipe` and `flow` for left-to-right composition and
`dual` for APIs that support both direct and pipe-friendly call styles. The
module also contains small identity, constant, tuple, type-level, and
memoization helpers used across the library.

Since v2.0.0

---

## Exports Grouped by Category

- [caching](#caching)
  - [memoize](#memoize)
- [combinators](#combinators)
  - [SK](#sk)
  - [apply](#apply)
  - [compose](#compose)
  - [dual](#dual)
  - [flip](#flip)
  - [flow](#flow)
  - [identity](#identity)
  - [pipe](#pipe)
  - [tupled](#tupled)
  - [untupled](#untupled)
- [constants](#constants)
  - [constFalse](#constfalse)
  - [constNull](#constnull)
  - [constTrue](#consttrue)
  - [constUndefined](#constundefined)
  - [constVoid](#constvoid)
- [constructors](#constructors)
  - [constant](#constant)
- [models](#models)
  - [FunctionN (type alias)](#functionn-type-alias)
  - [LazyArg (type alias)](#lazyarg-type-alias)
- [type lambdas](#type-lambdas)
  - [FunctionTypeLambda (interface)](#functiontypelambda-interface)
- [utility types](#utility-types)
  - [absurd](#absurd)
  - [cast](#cast)
  - [hole](#hole)
  - [satisfies](#satisfies)

---

# caching

## memoize

Creates a memoized function whose input is an object, caching results by
object identity.

**When to use**

Use to reuse the result of a synchronous computation whose output is stable
for a given object reference.

**Details**

Each memoized wrapper owns a private `WeakMap` keyed by object identity.
Cached `undefined` results are still returned because the cache is checked
with `WeakMap.has`.

**Gotchas**

Structurally equal objects do not share cache entries. If the same object is
mutated after its first call, later calls still return the cached result for
that reference.

**Signature**

```ts
declare const memoize: <A extends object, O>(f: (a: A) => O) => (ast: A) => O
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Function.ts#L1405)

Since v4.0.0

# combinators

## SK

Returns the second argument and discards the first. The SK combinator is
a fundamental combinator in the lambda calculus and the SKI combinator
calculus.

**When to use**

Use to discard the first argument and return the second argument.

**Example** (Discarding the first argument)

```ts
import { Function } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(Function.SK(0, "hello"), "hello")
```

**Signature**

```ts
declare const SK: <A, B>(_: A, b: B) => B
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Function.ts#L1379)

Since v2.0.0

## apply

Applies a function to a given value.

**When to use**

Use to pass a fixed value into a unary function, especially when the function
is the value flowing through `pipe`.

**Details**

`apply(a)(f)` is equivalent to `f(a)`.

**Example** (Applying an argument to a function)

```ts
import { Function, pipe, String } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(pipe(String.length, Function.apply("hello")), 5)
```

**See**

- `pipe` for building left-to-right pipelines

**Signature**

```ts
declare const apply: <A>(a: A) => <B>(self: (a: A) => B) => B
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Function.ts#L184)

Since v2.0.0

## compose

Composes two functions, `ab` and `bc` into a single function that takes in an argument `a` of type `A` and returns a result of type `C`.
The result is obtained by first applying the `ab` function to `a` and then applying the `bc` function to the result of `ab`.

**When to use**

Use to compose exactly two unary functions into a reusable unary function.

**Example** (Composing two functions)

```ts
import { Function } from "effect"
import * as assert from "node:assert"

const increment = (n: number) => n + 1
const square = (n: number) => n * n

assert.strictEqual(Function.compose(increment, square)(2), 9)
```

**See**

- `flow` for composing a left-to-right sequence of functions
- `pipe` for applying a value through a left-to-right sequence immediately

**Signature**

```ts
declare const compose: {
  <B, C>(bc: (b: B) => C): <A>(self: (a: A) => B) => (a: A) => C
  <A, B, C>(self: (a: A) => B, bc: (b: B) => C): (a: A) => C
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Function.ts#L486)

Since v2.0.0

## dual

Creates a function that can be called in data-first style or data-last
(`pipe`-friendly) style.

**When to use**

Use to expose one implementation through both direct and `pipe`-friendly
call styles.

**Details**

Pass either the arity of the uncurried function or a predicate that decides
whether the current call is data-first. Arity is the common case. Use a
predicate when optional arguments make arity ambiguous.

**Example** (Selecting data-first or data-last style by arity)

```ts
import { Function, pipe } from "effect"

const sum = Function.dual<(that: number) => (self: number) => number, (self: number, that: number) => number>(
  2,
  (self, that) => self + that
)

console.log(sum(2, 3)) // 5
console.log(pipe(2, sum(3))) // 5
```

**Example** (Defining overloads with call signatures)

```ts
import { Function, pipe } from "effect"

const sum: {
  (that: number): (self: number) => number
  (self: number, that: number): number
} = Function.dual(2, (self: number, that: number): number => self + that)

console.log(sum(2, 3)) // 5
console.log(pipe(2, sum(3))) // 5
```

**Example** (Selecting data-first or data-last style with a predicate)

```ts
import { Function, pipe } from "effect"

const sum = Function.dual<(that: number) => (self: number) => number, (self: number, that: number) => number>(
  (args) => args.length === 2,
  (self, that) => self + that
)

console.log(sum(2, 3)) // 5
console.log(pipe(2, sum(3))) // 5
```

**Signature**

```ts
declare const dual: {
  <DataLast extends (...args: Array<any>) => any, DataFirst extends (...args: Array<any>) => any>(
    arity: Parameters<DataFirst>["length"],
    body: DataFirst
  ): DataLast & DataFirst
  <DataLast extends (...args: Array<any>) => any, DataFirst extends (...args: Array<any>) => any>(
    isDataFirst: (args: IArguments) => boolean,
    body: DataFirst
  ): DataLast & DataFirst
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Function.ts#L102)

Since v2.0.0

## flip

Reverses the order of arguments for a curried function.

**When to use**

Use to adapt a curried function when its argument groups need to be supplied
in the opposite order.

**Example** (Flipping curried arguments)

```ts
import { Function } from "effect"
import * as assert from "node:assert"

const f = (a: number) => (b: string) => a - b.length

assert.deepStrictEqual(Function.flip(f)("aaa")(2), -1)
```

**Signature**

```ts
declare const flip: <A extends Array<unknown>, B extends Array<unknown>, C>(
  f: (...a: A) => (...b: B) => C
) => (...b: B) => (...a: A) => C
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Function.ts#L454)

Since v2.0.0

## flow

Performs left-to-right function composition.

**When to use**

Use to build a reusable function from a left-to-right sequence of
transformations.

**Details**

The first function may have any arity. Every following function must be
unary.

**Example** (Composing functions left to right)

```ts
import { flow } from "effect"
import * as assert from "node:assert"

const len = (s: string): number => s.length
const double = (n: number): number => n * 2

const f = flow(len, double)

assert.strictEqual(f("aaa"), 6)
```

**See**

- `pipe` for applying a value through a left-to-right sequence immediately
- `compose` for composing exactly two functions

**Signature**

```ts
declare const flow: {
  <A extends ReadonlyArray<unknown>, B = never>(ab: (...a: A) => B): (...a: A) => B
  <A extends ReadonlyArray<unknown>, B = never, C = never>(ab: (...a: A) => B, bc: (b: B) => C): (...a: A) => C
  <A extends ReadonlyArray<unknown>, B = never, C = never, D = never>(
    ab: (...a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D
  ): (...a: A) => D
  <A extends ReadonlyArray<unknown>, B = never, C = never, D = never, E = never>(
    ab: (...a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E
  ): (...a: A) => E
  <A extends ReadonlyArray<unknown>, B = never, C = never, D = never, E = never, F = never>(
    ab: (...a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F
  ): (...a: A) => F
  <A extends ReadonlyArray<unknown>, B = never, C = never, D = never, E = never, F = never, G = never>(
    ab: (...a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G
  ): (...a: A) => G
  <A extends ReadonlyArray<unknown>, B = never, C = never, D = never, E = never, F = never, G = never, H = never>(
    ab: (...a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H
  ): (...a: A) => H
  <
    A extends ReadonlyArray<unknown>,
    B = never,
    C = never,
    D = never,
    E = never,
    F = never,
    G = never,
    H = never,
    I = never
  >(
    ab: (...a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I
  ): (...a: A) => I
  <
    A extends ReadonlyArray<unknown>,
    B = never,
    C = never,
    D = never,
    E = never,
    F = never,
    G = never,
    H = never,
    I = never,
    J = never
  >(
    ab: (...a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I,
    ij: (i: I) => J
  ): (...a: A) => J
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Function.ts#L1277)

Since v2.0.0

## identity

Returns its input argument unchanged.

**When to use**

Use to return a value unchanged where a function is required.

**Example** (Returning the same value)

```ts
import { identity } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(identity(5), 5)
```

**Signature**

```ts
declare const identity: <A>(a: A) => A
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Function.ts#L248)

Since v2.0.0

## pipe

Pipes the value of an expression through a left-to-right sequence of
functions.

**When to use**

Use when you need to compose data-last functions into readable
transformation pipelines instead of method-style chains.

**Details**

Takes an initial value, passes it to the first function, then passes each
result to the next function in order. The final function result is returned.

**Gotchas**

Each function passed after the initial value must accept a single argument,
because `pipe` calls each step with only the previous result.

**Example** (Piping values through functions)

In this example, `1` is passed to the first function, and each result becomes
the input for the next function.

```ts
import { pipe } from "effect"

const result = pipe(
  1,
  (n) => n + 1,
  (n) => n * 2,
  (n) => `result: ${n}`
)

console.log(result) // "result: 4"
```

**Example** (Chaining methods before conversion)

```ts
const numbers = [1, 2, 3, 4]
const double = (n: number) => n * 2
const greaterThanFour = (n: number) => n > 4

const result = numbers.map(double).filter(greaterThanFour)

console.log(result) // [6, 8]
```

**Example** (Rewriting method chains with pipe)

The same transformation can be written with data-last functions.

```ts
import { Array, pipe } from "effect"

const numbers = [1, 2, 3, 4]
const double = (n: number) => n * 2
const greaterThanFour = (n: number) => n > 4

const result = pipe(numbers, Array.map(double), Array.filter(greaterThanFour))

console.log(result) // [6, 8]
```

**Example** (Chaining arithmetic operations)

```ts
import { pipe } from "effect"

// Define simple arithmetic operations
const increment = (x: number) => x + 1
const double = (x: number) => x * 2
const subtractTen = (x: number) => x - 10

// Sequentially apply these operations using `pipe`
const result = pipe(5, increment, double, subtractTen)

console.log(result)
// Output: 2
```

**Example** (Building a simple transformation pipeline)

```ts
import { pipe } from "effect"

// Simple transformation pipeline
const result = pipe(
  5,
  (x) => x * 2, // 10
  (x) => x + 1, // 11
  (x) => x.toString() // "11"
)

console.log(result) // "11"
```

**Signature**

```ts
declare const pipe: {
  <A>(a: A): A
  <A, B = never>(a: A, ab: (a: A) => B): B
  <A, B = never, C = never>(a: A, ab: (a: A) => B, bc: (b: B) => C): C
  <A, B = never, C = never, D = never>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D): D
  <A, B = never, C = never, D = never, E = never>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E
  ): E
  <A, B = never, C = never, D = never, E = never, F = never>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F
  ): F
  <A, B = never, C = never, D = never, E = never, F = never, G = never>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G
  ): G
  <A, B = never, C = never, D = never, E = never, F = never, G = never, H = never>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H
  ): H
  <A, B = never, C = never, D = never, E = never, F = never, G = never, H = never, I = never>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I
  ): I
  <A, B = never, C = never, D = never, E = never, F = never, G = never, H = never, I = never, J = never>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I,
    ij: (i: I) => J
  ): J
  <A, B = never, C = never, D = never, E = never, F = never, G = never, H = never, I = never, J = never, K = never>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I,
    ij: (i: I) => J,
    jk: (j: J) => K
  ): K
  <
    A,
    B = never,
    C = never,
    D = never,
    E = never,
    F = never,
    G = never,
    H = never,
    I = never,
    J = never,
    K = never,
    L = never
  >(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I,
    ij: (i: I) => J,
    jk: (j: J) => K,
    kl: (k: K) => L
  ): L
  <
    A,
    B = never,
    C = never,
    D = never,
    E = never,
    F = never,
    G = never,
    H = never,
    I = never,
    J = never,
    K = never,
    L = never,
    M = never
  >(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I,
    ij: (i: I) => J,
    jk: (j: J) => K,
    kl: (k: K) => L,
    lm: (l: L) => M
  ): M
  <
    A,
    B = never,
    C = never,
    D = never,
    E = never,
    F = never,
    G = never,
    H = never,
    I = never,
    J = never,
    K = never,
    L = never,
    M = never,
    N = never
  >(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I,
    ij: (i: I) => J,
    jk: (j: J) => K,
    kl: (k: K) => L,
    lm: (l: L) => M,
    mn: (m: M) => N
  ): N
  <
    A,
    B = never,
    C = never,
    D = never,
    E = never,
    F = never,
    G = never,
    H = never,
    I = never,
    J = never,
    K = never,
    L = never,
    M = never,
    N = never,
    O = never
  >(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I,
    ij: (i: I) => J,
    jk: (j: J) => K,
    kl: (k: K) => L,
    lm: (l: L) => M,
    mn: (m: M) => N,
    no: (n: N) => O
  ): O
  <
    A,
    B = never,
    C = never,
    D = never,
    E = never,
    F = never,
    G = never,
    H = never,
    I = never,
    J = never,
    K = never,
    L = never,
    M = never,
    N = never,
    O = never,
    P = never
  >(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I,
    ij: (i: I) => J,
    jk: (j: J) => K,
    kl: (k: K) => L,
    lm: (l: L) => M,
    mn: (m: M) => N,
    no: (n: N) => O,
    op: (o: O) => P
  ): P
  <
    A,
    B = never,
    C = never,
    D = never,
    E = never,
    F = never,
    G = never,
    H = never,
    I = never,
    J = never,
    K = never,
    L = never,
    M = never,
    N = never,
    O = never,
    P = never,
    Q = never
  >(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I,
    ij: (i: I) => J,
    jk: (j: J) => K,
    kl: (k: K) => L,
    lm: (l: L) => M,
    mn: (m: M) => N,
    no: (n: N) => O,
    op: (o: O) => P,
    pq: (p: P) => Q
  ): Q
  <
    A,
    B = never,
    C = never,
    D = never,
    E = never,
    F = never,
    G = never,
    H = never,
    I = never,
    J = never,
    K = never,
    L = never,
    M = never,
    N = never,
    O = never,
    P = never,
    Q = never,
    R = never
  >(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I,
    ij: (i: I) => J,
    jk: (j: J) => K,
    kl: (k: K) => L,
    lm: (l: L) => M,
    mn: (m: M) => N,
    no: (n: N) => O,
    op: (o: O) => P,
    pq: (p: P) => Q,
    qr: (q: Q) => R
  ): R
  <
    A,
    B = never,
    C = never,
    D = never,
    E = never,
    F = never,
    G = never,
    H = never,
    I = never,
    J = never,
    K = never,
    L = never,
    M = never,
    N = never,
    O = never,
    P = never,
    Q = never,
    R = never,
    S = never
  >(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I,
    ij: (i: I) => J,
    jk: (j: J) => K,
    kl: (k: K) => L,
    lm: (l: L) => M,
    mn: (m: M) => N,
    no: (n: N) => O,
    op: (o: O) => P,
    pq: (p: P) => Q,
    qr: (q: Q) => R,
    rs: (r: R) => S
  ): S
  <
    A,
    B = never,
    C = never,
    D = never,
    E = never,
    F = never,
    G = never,
    H = never,
    I = never,
    J = never,
    K = never,
    L = never,
    M = never,
    N = never,
    O = never,
    P = never,
    Q = never,
    R = never,
    S = never,
    T = never
  >(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I,
    ij: (i: I) => J,
    jk: (j: J) => K,
    kl: (k: K) => L,
    lm: (l: L) => M,
    mn: (m: M) => N,
    no: (n: N) => O,
    op: (o: O) => P,
    pq: (p: P) => Q,
    qr: (q: Q) => R,
    rs: (r: R) => S,
    st: (s: S) => T
  ): T
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Function.ts#L1125)

Since v2.0.0

## tupled

Creates a tupled version of this function: instead of `n` arguments, it accepts a single tuple argument.

**When to use**

Use to adapt a multi-argument function so it accepts one tuple argument.

**Example** (Converting arguments to a tuple)

```ts
import { Function } from "effect"
import * as assert from "node:assert"

const sumTupled = Function.tupled((x: number, y: number): number => x + y)

assert.deepStrictEqual(sumTupled([1, 2]), 3)
```

**See**

- `untupled` for adapting a tuple-argument function back to multiple arguments

**Signature**

```ts
declare const tupled: <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => B) => (a: A) => B
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Function.ts#L545)

Since v2.0.0

## untupled

Converts a tupled function back to an uncurried function.

**When to use**

Use to adapt a tuple-argument function so it accepts multiple arguments.

**Example** (Converting a tuple to arguments)

```ts
import { Function } from "effect"
import * as assert from "node:assert"

const getFirst = Function.untupled(<A, B>(tuple: [A, B]): A => tuple[0])

assert.deepStrictEqual(getFirst(1, 2), 1)
```

**See**

- `tupled` for adapting a multi-argument function to one tuple argument

**Signature**

```ts
declare const untupled: <A extends ReadonlyArray<unknown>, B>(f: (a: A) => B) => (...a: A) => B
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Function.ts#L570)

Since v2.0.0

# constants

## constFalse

Returns `false` when called.

**When to use**

Use when you need a thunk that returns `false` on every invocation.

**Example** (Returning false from a thunk)

```ts
import { Function } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(Function.constFalse(), false)
```

**Signature**

```ts
declare const constFalse: LazyArg<boolean>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Function.ts#L366)

Since v2.0.0

## constNull

Returns `null` when called.

**When to use**

Use when you need a thunk that returns `null` on every invocation.

**Example** (Returning null from a thunk)

```ts
import { Function } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(Function.constNull(), null)
```

**Signature**

```ts
declare const constNull: LazyArg<null>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Function.ts#L387)

Since v2.0.0

## constTrue

Returns `true` when called.

**When to use**

Use when you need a thunk that returns `true` on every invocation.

**Example** (Returning true from a thunk)

```ts
import { Function } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(Function.constTrue(), true)
```

**Signature**

```ts
declare const constTrue: LazyArg<boolean>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Function.ts#L345)

Since v2.0.0

## constUndefined

Returns `undefined` when called.

**When to use**

Use when you need a thunk that returns `undefined` on every invocation.

**Example** (Returning undefined from a thunk)

```ts
import { Function } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(Function.constUndefined(), undefined)
```

**Signature**

```ts
declare const constUndefined: LazyArg<undefined>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Function.ts#L408)

Since v2.0.0

## constVoid

Returns no meaningful value when called.

**When to use**

Use when you need a thunk that is called only for its effect and has no
meaningful return value.

**Example** (Returning void from a thunk)

```ts
import { Function } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(Function.constVoid(), undefined)
```

**Signature**

```ts
declare const constVoid: LazyArg<void>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Function.ts#L430)

Since v2.0.0

# constructors

## constant

Creates a zero-argument function that always returns the provided value.

**When to use**

Use when you need a thunk or callback that returns the same value on every
invocation.

**Example** (Creating a constant thunk)

```ts
import { Function } from "effect"
import * as assert from "node:assert"

const constNull = Function.constant(null)

assert.deepStrictEqual(constNull(), null)
assert.deepStrictEqual(constNull(), null)
```

**Signature**

```ts
declare const constant: <A>(value: A) => LazyArg<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Function.ts#L324)

Since v2.0.0

# models

## FunctionN (type alias)

Represents a function with multiple arguments.

**When to use**

Use to describe a function whose argument list is represented as a tuple
type.

**Example** (Typing a variadic function)

```ts
import type { Function } from "effect"
import * as assert from "node:assert"

const sum: Function.FunctionN<[number, number], number> = (a, b) => a + b
assert.deepStrictEqual(sum(2, 3), 5)
```

**Signature**

```ts
type FunctionN<A, B> = (...args: A) => B
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Function.ts#L227)

Since v2.0.0

## LazyArg (type alias)

A zero-argument function that produces a value when invoked.

**When to use**

Use to type a lazy value provider that should not run until called.

**Example** (Creating a lazy argument)

```ts
import { Function } from "effect"

const constNull: Function.LazyArg<null> = Function.constant(null)
```

**Signature**

```ts
type LazyArg<A> = () => A
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Function.ts#L204)

Since v2.0.0

# type lambdas

## FunctionTypeLambda (interface)

Type lambda for function types, used for higher-kinded type operations.

**When to use**

Use when defining higher-kinded abstractions that must accept function types
as one of their type-lambda inputs.

**Example** (Creating a function type with a type lambda)

```ts
import type { Function, HKT } from "effect"

// Create a function type using the type lambda
type StringToNumber = HKT.Kind<Function.FunctionTypeLambda, string, never, never, number>
// Equivalent to: (a: string) => number
```

**Signature**

```ts
export interface FunctionTypeLambda extends TypeLambda {
  readonly type: (a: this["In"]) => this["Target"]
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Function.ts#L35)

Since v2.0.0

# utility types

## absurd

Marks an impossible branch by accepting a `never` value and returning any
type.

**When to use**

Use when you need a return value in a branch that exhaustive checks prove
cannot be reached.

**Gotchas**

Calling `absurd` throws, because a value of type `never` should be
impossible at runtime.

**Example** (Handling impossible values)

```ts
import { absurd } from "effect"

const handleNever = (value: never) => {
  return absurd(value) // This will throw an error if called
}
```

**Signature**

```ts
declare const absurd: <A>(_: never) => A
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Function.ts#L518)

Since v2.0.0

## cast

Returns the input value with a different static type.

**When to use**

Use when you need an explicit type-level cast and accept that the value is
returned unchanged at runtime.

**Gotchas**

This is a type-level cast only; it performs no runtime validation or
conversion.

**See**

- `satisfies` for checking assignability without changing the resulting type

**Signature**

```ts
declare const cast: <A, B>(a: A) => B
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Function.ts#L299)

Since v4.0.0

## hole

Creates a compile-time placeholder for a value of any type.

**When to use**

Use as a temporary typed placeholder while developing incomplete code.

**Gotchas**

`hole` is intended for temporary development use. If the placeholder is
evaluated at runtime, it throws.

**Example** (Creating a development placeholder)

```ts
import { hole } from "effect"

// Intentionally not called: `hole` throws if the placeholder is evaluated.
const buildUser = (id: number): { readonly id: number; readonly name: string } => ({
  id,
  name: hole<string>()
})

console.log(typeof buildUser) // "function"
```

**Signature**

```ts
declare const hole: <T>() => T
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Function.ts#L1356)

Since v2.0.0

## satisfies

Ensures that the type of an expression matches some type,
without changing the resulting type of that expression.

**When to use**

Use to check assignability while preserving the expression's precise inferred
type.

**Example** (Checking an expression against a type)

```ts
import { Function } from "effect"
import * as assert from "node:assert"

const test1 = Function.satisfies<number>()(5 as const)
// ^? const test: 5
// @ts-expect-error
const test2 = Function.satisfies<string>()(5)
// ^? Argument of type 'number' is not assignable to parameter of type 'string'

assert.deepStrictEqual(Function.satisfies<number>()(5), 5)
```

**See**

- `cast` for changing only the static TypeScript type

**Signature**

```ts
declare const satisfies: <A>() => <B extends A>(b: B) => B
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Function.ts#L279)

Since v2.0.0
