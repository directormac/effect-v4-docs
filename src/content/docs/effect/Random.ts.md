---
title: Random.ts
nav_order: 81
parent: "effect"
---

## Random.ts overview

Provides pseudo-random generation through an Effect service.

This module exposes effectful generators for booleans, doubles, safe
integers, bounded numbers, shuffling, and deterministic seeded runs. Because
random generation is a service, tests and applications can replace the
generator used by Effect programs.

Since v4.0.0

---

## Exports Grouped by Category

- [Random Number Generators](#random-number-generators)
  - [Random](#random)
  - [choice](#choice)
  - [next](#next)
  - [nextBetween](#nextbetween)
  - [nextBoolean](#nextboolean)
  - [nextInt](#nextint)
  - [nextIntBetween](#nextintbetween)
  - [shuffle](#shuffle)
- [Seeding](#seeding)
  - [withSeed](#withseed)

---

# Random Number Generators

## Random

Represents a service for generating pseudo-random numbers.

**When to use**

Use to access or provide the random-number generator service used by Effect
programs.

**Gotchas**

The default implementation is based on `Math.random` and is not
cryptographically secure. Replace the service with a cryptographically secure
implementation before using these generators for security-sensitive values.

**Example** (Accessing the random service)

```ts
import { Effect, Random } from "effect"

const program = Effect.gen(function* () {
  const float = yield* Random.next
  const integer = yield* Random.nextInt
  const inRange = yield* Random.nextIntBetween(1, 100)

  console.log("Float:", float)
  console.log("Integer:", integer)
  console.log("In range:", inRange)
})
```

**Signature**

```ts
declare const Random: Context.Reference<{ nextIntUnsafe(): number; nextDoubleUnsafe(): number }>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Random.ts#L53)

Since v2.0.0

## choice

Gets a random element from an iterable.

**When to use**

Use to select one value uniformly from a collection using the active `Random`
service.

**Details**

If the input type is known to be non-empty, the returned effect cannot fail.
Otherwise, empty iterables fail with `Cause.NoSuchElementError`.

**Example** (Choosing a random value)

```ts
import { Effect, Random } from "effect"

const program = Effect.gen(function* () {
  const value = yield* Random.choice(["red", "green", "blue"] as const)
  console.log(value)
})
```

**Signature**

```ts
declare const choice: <Self extends Iterable<unknown>>(
  elements: Self
) => Self extends NonEmptyIterable.NonEmptyIterable<infer A>
  ? Effect.Effect<A>
  : Self extends Arr.NonEmptyReadonlyArray<infer A>
    ? Effect.Effect<A>
    : Self extends Iterable<infer A>
      ? Effect.Effect<A, Cause.NoSuchElementError>
      : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Random.ts#L258)

Since v3.6.0

## next

Generates a random number between 0 (inclusive) and 1 (exclusive).

**When to use**

Use to generate a pseudo-random floating-point number in the standard
`[0, 1)` range.

**Example** (Generating a random number)

```ts
import { Effect, Random } from "effect"

const program = Effect.gen(function* () {
  const randomDouble = yield* Random.next
  console.log("Random double:", randomDouble)
})
```

**Signature**

```ts
declare const next: Effect.Effect<number, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Random.ts#L83)

Since v2.0.0

## nextBetween

Generates a random number between `min` (inclusive) and `max` (exclusive).

**When to use**

Use to generate a pseudo-random floating-point number within a numeric range.

**Example** (Generating a bounded random number)

```ts
import { Effect, Random } from "effect"

const program = Effect.gen(function* () {
  const randomDouble = yield* Random.nextBetween(0, 1)
  console.log("Random double: ", randomDouble)
})
```

**Signature**

```ts
declare const nextBetween: (min: number, max: number) => Effect.Effect<number>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Random.ts#L154)

Since v4.0.0

## nextBoolean

Generates a random boolean value.

**When to use**

Use to make a pseudo-random true-or-false choice.

**Example** (Generating a random boolean)

```ts
import { Effect, Random } from "effect"

const program = Effect.gen(function* () {
  const value = yield* Random.nextBoolean
  console.log("Random boolean:", value)
})
```

**Signature**

```ts
declare const nextBoolean: Effect.Effect<boolean, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Random.ts#L106)

Since v2.0.0

## nextInt

Generates a random integer between `Number.MIN_SAFE_INTEGER` (inclusive)
and `Number.MAX_SAFE_INTEGER` (inclusive).

**When to use**

Use to generate a pseudo-random safe integer across the full safe-integer
range.

**Example** (Generating a random integer)

```ts
import { Effect, Random } from "effect"

const program = Effect.gen(function* () {
  const randomInt = yield* Random.nextInt
  console.log("Random integer:", randomInt)
})
```

**Signature**

```ts
declare const nextInt: Effect.Effect<number, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Random.ts#L131)

Since v2.0.0

## nextIntBetween

Generates a random integer between `min` and `max`.

**When to use**

Use to generate a pseudo-random integer within a rounded numeric range.

**Details**

The lower bound is rounded up with `Math.ceil` and the upper bound is
rounded down with `Math.floor`. By default the range is inclusive; set
`options.halfOpen: true` to exclude the upper bound.

**Example** (Generating a bounded random integer)

```ts
import { Effect, Random } from "effect"

const program = Effect.gen(function* () {
  const diceRoll1 = yield* Random.nextIntBetween(1, 6)
  const diceRoll2 = yield* Random.nextIntBetween(1, 6, {
    halfOpen: true
  })
  const diceRoll3 = yield* Random.nextIntBetween(0, 10)
})
```

**Signature**

```ts
declare const nextIntBetween: (
  min: number,
  max: number,
  options?: { readonly halfOpen?: boolean }
) => Effect.Effect<number>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Random.ts#L187)

Since v2.0.0

## shuffle

Uses the pseudo-random number generator to shuffle the specified iterable.

**When to use**

Use to randomly reorder an iterable using the active `Random` service.

**Example** (Shuffling values)

```ts
import { Effect, Random } from "effect"

const program = Effect.gen(function* () {
  const values = yield* Random.shuffle([1, 2, 3, 4, 5])
  console.log(values)
})
```

**Signature**

```ts
declare const shuffle: <A>(elements: Iterable<A>) => Effect.Effect<Array<A>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Random.ts#L219)

Since v2.0.0

# Seeding

## withSeed

Seeds the pseudo-random number generator with the specified value.

**When to use**

Use to run an effect with a deterministic pseudo-random sequence.

**Details**

Using the same seed produces the same random sequence, which is useful for
tests and reproducible simulations.

**Gotchas**

Use an unpredictable seed when uniqueness or unpredictability matters.

**Example** (Seeding random generation)

```ts
import { Effect, Random } from "effect"

const program = Effect.gen(function* () {
  const value1 = yield* Random.next
  const value2 = yield* Random.next
  console.log(value1, value2)
})

// Same seed produces same sequence
const seeded1 = program.pipe(Random.withSeed("my-seed"))
const seeded2 = program.pipe(Random.withSeed("my-seed"))

// Both will output identical values
Effect.runPromise(seeded1)
Effect.runPromise(seeded2)
```

**Signature**

```ts
declare const withSeed: {
  (seed: string | number): <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<A, E, R>
  <A, E, R>(self: Effect.Effect<A, E, R>, seed: string | number): Effect.Effect<A, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Random.ts#L309)

Since v4.0.0
