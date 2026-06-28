---
title: Semaphore.ts
nav_order: 109
parent: "effect"
---

## Semaphore.ts overview

Limits how many effects can use a shared resource at the same time.

A `Semaphore` owns a number of permits. Work can run only after acquiring the
permits it needs, and those permits are returned when the work finishes. This
module includes constructors, automatic wrappers that acquire and release
permits around an effect, manual permit operations, a non-waiting variant for
work that should only run immediately, and resizing support for an existing
semaphore.

Since v4.0.0

---

## Exports Grouped by Category

- [combinators](#combinators)
  - [release](#release)
  - [releaseAll](#releaseall)
  - [resize](#resize)
  - [take](#take)
  - [withPermit](#withpermit)
  - [withPermits](#withpermits)
  - [withPermitsIfAvailable](#withpermitsifavailable)
- [constructors](#constructors)
  - [make](#make)
  - [makeUnsafe](#makeunsafe)
- [models](#models)
  - [Semaphore (interface)](#semaphore-interface)

---

# combinators

## release

Releases the specified number of permits and returns the resulting available
permits.

**When to use**

Use when you need to return permits acquired with `take` in a lower-level
permit protocol with explicit release control.

**Details**

Running the effect releases the requested permits, wakes waiting acquirers
when permits become available, and returns the current available permit
count.

**Gotchas**

Manual `take` / `release` usage must keep permit counts balanced. Prefer
`withPermit` or `withPermits` when the acquisition can be scoped to one
effect.

**See**

- `take` for manually acquiring permits
- `releaseAll` for returning every currently taken permit
- `withPermits` for automatic acquire and release around an effect

**Signature**

```ts
declare const release: {
  (permits: number): (self: Semaphore) => Effect.Effect<number>
  (self: Semaphore, permits: number): Effect.Effect<number>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Semaphore.ts#L497)

Since v4.0.0

## releaseAll

Releases all permits held by this semaphore and returns the resulting
available permits.

**When to use**

Use to return every currently taken permit to a semaphore at once, typically
during cleanup of manual `take` / `release` protocols.

**See**

- `release` for releasing a known permit count
- `withPermits` for automatic acquire and release around an effect

**Signature**

```ts
declare const releaseAll: (self: Semaphore) => Effect.Effect<number>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Semaphore.ts#L517)

Since v4.0.0

## resize

Sets the total number of permits managed by the semaphore.

**When to use**

Use to change the concurrency limit of an existing semaphore while keeping
current acquisitions in place.

**Details**

Existing acquisitions remain taken after resizing. If the new total is less
than the currently taken permit count, new acquisitions wait until enough
permits are released.

**See**

- `make` for creating a semaphore with an initial permit count
- `release` for returning permits without changing semaphore capacity

**Signature**

```ts
declare const resize: {
  (permits: number): (self: Semaphore) => Effect.Effect<void>
  (self: Semaphore, permits: number): Effect.Effect<void>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Semaphore.ts#L351)

Since v4.0.0

## take

Acquires the specified number of permits and returns the acquired permit
count.

**When to use**

Use when you need manual permit acquisition for a lower-level protocol with
explicit acquisition and release control.

**Details**

The effect waits until enough permits are available.

**See**

- `withPermit` for automatically acquiring and releasing one permit around an effect
- `withPermits` for automatically acquiring and releasing multiple permits around an effect
- `release` for returning manually acquired permits

**Signature**

```ts
declare const take: {
  (permits: number): (self: Semaphore) => Effect.Effect<number>
  (self: Semaphore, permits: number): Effect.Effect<number>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Semaphore.ts#L464)

Since v4.0.0

## withPermit

Runs an effect with a single permit and releases the permit when the effect
completes.

**When to use**

Use to guard an effect with exactly one semaphore permit while automatically
releasing that permit when the effect exits.

**See**

- `withPermits` for acquiring more than one permit
- `withPermitsIfAvailable` for running only when permits are immediately available
- `take` for manually acquiring permits
- `release` for manually returning permits

**Signature**

```ts
declare const withPermit: {
  (self: Semaphore): <A, E, R>(effect: Effect.Effect<A, E, R>) => Effect.Effect<A, E, R>
  <A, E, R>(self: Semaphore, effect: Effect.Effect<A, E, R>): Effect.Effect<A, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Semaphore.ts#L403)

Since v4.0.0

## withPermits

Runs an effect with the given number of permits and releases the permits when
the effect completes.

**When to use**

Use to run an effect while holding a specified number of semaphore permits
for the duration of that effect.

**Details**

The effect waits until enough permits are available. Acquired permits are
released when the wrapped effect exits.

**See**

- `withPermit` for acquiring exactly one permit
- `withPermitsIfAvailable` for running only when permits are immediately available
- `take` for manually acquiring permits
- `release` for manually returning permits

**Signature**

```ts
declare const withPermits: {
  (self: Semaphore, permits: number): <A, E, R>(effect: Effect.Effect<A, E, R>) => Effect.Effect<A, E, R>
  <A, E, R>(self: Semaphore, permits: number, effect: Effect.Effect<A, E, R>): Effect.Effect<A, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Semaphore.ts#L378)

Since v4.0.0

## withPermitsIfAvailable

Runs an effect only if the specified number of permits are immediately
available.

**When to use**

Use when guarded work should run only if the requested permits are
immediately available.

**Details**

When the permits are unavailable, the effect is not run and the result is
`Option.none`. When permits are available, the effect is run, its result is
wrapped in `Option.some`, and the acquired permits are released when the
effect exits.

**See**

- `withPermits` for the variant that waits until permits are available

**Signature**

```ts
declare const withPermitsIfAvailable: {
  (self: Semaphore, permits: number): <A, E, R>(effect: Effect.Effect<A, E, R>) => Effect.Effect<Option.Option<A>, E, R>
  <A, E, R>(self: Semaphore, permits: number, effect: Effect.Effect<A, E, R>): Effect.Effect<Option.Option<A>, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Semaphore.ts#L432)

Since v4.0.0

# constructors

## make

Creates a `Semaphore` initialized with the specified total number of permits.

**When to use**

Use to create a semaphore inside Effect code for bounding concurrency with
automatic or manual permit management.

**Example** (Creating a semaphore)

```ts
import { Effect, Semaphore } from "effect"

const program = Effect.gen(function* () {
  const semaphore = yield* Semaphore.make(2)

  const task = (id: number) =>
    semaphore.withPermits(1)(
      Effect.gen(function* () {
        yield* Effect.log(`Task ${id} acquired permit`)
        yield* Effect.sleep("1 second")
        yield* Effect.log(`Task ${id} releasing permit`)
      })
    )

  // Run 4 tasks, but only 2 can run concurrently
  yield* Effect.all([task(1), task(2), task(3), task(4)])
})
```

**Signature**

```ts
declare const make: (permits: number) => Effect.Effect<Semaphore>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Semaphore.ts#L329)

Since v4.0.0

## makeUnsafe

Creates a `Semaphore` synchronously with the specified total
number of permits.

**When to use**

Use to construct a semaphore synchronously when an immediate value is
required outside an Effect workflow.

**Example** (Creating an unsafe semaphore)

```ts
import { Effect, Semaphore } from "effect"

const semaphore = Semaphore.makeUnsafe(3)

const task = (id: number) =>
  semaphore.withPermits(1)(
    Effect.gen(function* () {
      yield* Effect.log(`Task ${id} started`)
      yield* Effect.sleep("1 second")
      yield* Effect.log(`Task ${id} completed`)
    })
  )

// Only 3 tasks can run concurrently
const program = Effect.all([task(1), task(2), task(3), task(4), task(5)], { concurrency: "unbounded" })
```

**Signature**

```ts
declare const makeUnsafe: (permits: number) => Semaphore
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Semaphore.ts#L190)

Since v4.0.0

# models

## Semaphore (interface)

A counting semaphore that coordinates concurrent access with permits.

**When to use**

Use to coordinate concurrent effects that need bounded access to a shared
resource.

**Details**

Effects can acquire permits, wait until enough permits are available,
release permits, or run with permits that are automatically released when
the effect exits.

**Example** (Controlling concurrent access)

```ts
import { Effect, Semaphore } from "effect"

// Create and use a semaphore for controlling concurrent access
const program = Effect.gen(function* () {
  const semaphore = yield* Semaphore.make(2)

  return yield* semaphore.withPermits(1)(Effect.succeed("Resource accessed"))
})
```

**See**

- `make` for creating a semaphore inside Effect code
- `makeUnsafe` for creating a semaphore synchronously

**Signature**

```ts
export interface Semaphore {
  /**
   * Adjusts the number of permits available in the semaphore.
   *
   * **When to use**
   *
   * Use to change the total permit count of an existing semaphore.
   */
  resize(this: Semaphore, permits: number): Effect.Effect<void>

  /**
   * Runs an effect with the given number of permits and releases the permits
   * when the effect completes.
   *
   * **When to use**
   *
   * Use to run an effect while holding a specified number of semaphore permits.
   *
   * **Details**
   *
   * This function acquires the specified number of permits before executing
   * the provided effect. Once the effect finishes, the permits are released.
   * If insufficient permits are available, the function will wait until they
   * are released by other tasks.
   */
  withPermits(this: Semaphore, permits: number): <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<A, E, R>

  /**
   * Runs an effect with the given number of permits and releases the permits
   * when the effect completes.
   *
   * **When to use**
   *
   * Use to run an effect while holding exactly one semaphore permit.
   *
   * **Details**
   *
   * This function acquires the specified number of permits before executing
   * the provided effect. Once the effect finishes, the permits are released.
   * If insufficient permits are available, the function will wait until they
   * are released by other tasks.
   */
  withPermit<A, E, R>(self: Effect.Effect<A, E, R>): Effect.Effect<A, E, R>

  /**
   * Runs an effect only if the specified number of permits are immediately
   * available.
   *
   * **When to use**
   *
   * Use when guarded work should run only if the requested permits are
   * immediately available.
   *
   * **Details**
   *
   * This function attempts to acquire the specified number of permits. If they
   * are available, it runs the effect and releases the permits after the effect
   * completes. If permits are not available, the effect does not execute, and
   * the result is `Option.none`.
   */
  withPermitsIfAvailable(
    this: Semaphore,
    permits: number
  ): <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<Option.Option<A>, E, R>

  /**
   * Acquires the specified number of permits and returns the resulting
   * available permits, suspending the task if they are not yet available.
   * Concurrent pending `take` calls are processed in a first-in, first-out manner.
   *
   * **When to use**
   *
   * Use to manually acquire permits for lower-level coordination protocols.
   */
  take(this: Semaphore, permits: number): Effect.Effect<number>

  /**
   * Releases the specified number of permits and returns the resulting
   * available permits.
   *
   * **When to use**
   *
   * Use to manually return permits acquired by a lower-level coordination
   * protocol.
   */
  release(this: Semaphore, permits: number): Effect.Effect<number>

  /**
   * Releases all permits held by this semaphore and returns the resulting available permits.
   *
   * **When to use**
   *
   * Use to return every currently taken permit to the semaphore at once.
   */
  readonly releaseAll: Effect.Effect<number>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Semaphore.ts#L55)

Since v4.0.0
