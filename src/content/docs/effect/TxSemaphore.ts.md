---
title: TxSemaphore.ts
nav_order: 137
parent: "effect"
---

## TxSemaphore.ts overview

Coordinates access to limited resources inside transactions.

A `TxSemaphore` has a fixed capacity and stores its available permit count in
a `TxRef`. Acquiring or releasing permits can therefore commit atomically
with other transactional state changes. This module includes operations for
creating semaphores, checking capacity and availability, acquiring or
releasing permits, and running effects while permits are held.

Since v4.0.0

---

## Exports Grouped by Category

- [combinators](#combinators)
  - [acquire](#acquire)
  - [acquireN](#acquiren)
  - [available](#available)
  - [capacity](#capacity)
  - [release](#release)
  - [releaseN](#releasen)
  - [tryAcquire](#tryacquire)
  - [tryAcquireN](#tryacquiren)
  - [withPermit](#withpermit)
  - [withPermitScoped](#withpermitscoped)
  - [withPermits](#withpermits)
- [constructors](#constructors)
  - [make](#make)
- [guards](#guards)
  - [isTxSemaphore](#istxsemaphore)
- [models](#models)
  - [TxSemaphore (interface)](#txsemaphore-interface)

---

# combinators

## acquire

Acquires a single permit from the semaphore. If no permits are available,
the effect will block until one becomes available.

**When to use**

Use to manually acquire one permit transactionally, waiting until one is
available.

**Example** (Acquiring a permit)

```ts
import { Console, Effect, TxSemaphore } from "effect"

const program = Effect.gen(function* () {
  const semaphore = yield* TxSemaphore.make(2)

  yield* Console.log("Acquiring first permit...")
  yield* TxSemaphore.acquire(semaphore)
  yield* Console.log("First permit acquired")

  yield* Console.log("Acquiring second permit...")
  yield* TxSemaphore.acquire(semaphore)
  yield* Console.log("Second permit acquired")

  const available = yield* TxSemaphore.available(semaphore)
  yield* Console.log(`Available permits: ${available}`) // 0
})
```

**See**

- `tryAcquire` for a non-blocking single-permit attempt
- `release` for returning one permit
- `withPermit` for automatic acquire and release around an effect

**Signature**

```ts
declare const acquire: (self: TxSemaphore) => Effect.Effect<void>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxSemaphore.ts#L241)

Since v2.0.0

## acquireN

Acquires the specified number of permits from the semaphore.

**When to use**

Use to manually acquire multiple permits transactionally, waiting until all
requested permits are available.

**Details**

If fewer than `n` permits are available, the transaction retries until enough
permits are released.

**Gotchas**

Passing a non-positive `n` dies with a defect. Passing a value greater than
the semaphore capacity can wait forever because the capacity is fixed.

**Example** (Acquiring multiple permits)

```ts
import { Console, Effect, TxSemaphore } from "effect"

const program = Effect.gen(function* () {
  const semaphore = yield* TxSemaphore.make(5)

  yield* Console.log("Acquiring 3 permits...")
  yield* TxSemaphore.acquireN(semaphore, 3)
  yield* Console.log("3 permits acquired")

  const available = yield* TxSemaphore.available(semaphore)
  yield* Console.log(`Available permits: ${available}`) // 2
})
```

**See**

- `tryAcquireN` for a non-blocking multi-permit attempt
- `releaseN` for returning multiple permits
- `withPermits` for automatic acquire and release around an effect

**Signature**

```ts
declare const acquireN: (self: TxSemaphore, n: number) => Effect.Effect<void>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxSemaphore.ts#L292)

Since v2.0.0

## available

Gets the current number of available permits in the semaphore.

**When to use**

Use to inspect how many permits are currently available.

**Example** (Checking available permits)

```ts
import { Console, Effect, TxSemaphore } from "effect"

const program = Effect.gen(function* () {
  const semaphore = yield* TxSemaphore.make(5)

  // Check available permits before acquiring
  const before = yield* TxSemaphore.available(semaphore)
  yield* Console.log(`Available permits: ${before}`) // 5

  // Acquire some permits
  yield* TxSemaphore.acquire(semaphore)
  yield* TxSemaphore.acquire(semaphore)

  // Check available permits after acquiring
  const after = yield* TxSemaphore.available(semaphore)
  yield* Console.log(`Available permits: ${after}`) // 3
})
```

**See**

- `capacity` for reading the fixed total permit count

**Signature**

```ts
declare const available: (self: TxSemaphore) => Effect.Effect<number>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxSemaphore.ts#L170)

Since v2.0.0

## capacity

Gets the maximum capacity (total permits) of the semaphore.

**When to use**

Use to inspect the fixed total number of permits managed by the semaphore.

**Example** (Checking semaphore capacity)

```ts
import { Console, Effect, TxSemaphore } from "effect"

const program = Effect.gen(function* () {
  const semaphore = yield* TxSemaphore.make(10)

  const capacity = yield* TxSemaphore.capacity(semaphore)
  yield* Console.log(`Semaphore capacity: ${capacity}`) // 10

  // Capacity remains constant regardless of current permits
  yield* TxSemaphore.acquire(semaphore)
  const stillSame = yield* TxSemaphore.capacity(semaphore)
  yield* Console.log(`Capacity after acquire: ${stillSame}`) // 10
})
```

**See**

- `available` for reading the current available permit count

**Signature**

```ts
declare const capacity: (self: TxSemaphore) => Effect.Effect<number>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxSemaphore.ts#L202)

Since v4.0.0

## release

Releases one permit back to the semaphore, making it available for
acquisition.

**When to use**

Use to manually return one permit after a transactional acquire.

**Details**

If the semaphore is already at capacity, this operation leaves the permit
count unchanged.

**Example** (Releasing a permit)

```ts
import { Console, Effect, TxSemaphore } from "effect"

const program = Effect.gen(function* () {
  const semaphore = yield* TxSemaphore.make(2)

  // Acquire a permit
  yield* TxSemaphore.acquire(semaphore)
  let available = yield* TxSemaphore.available(semaphore)
  yield* Console.log(`After acquire: ${available}`) // 1

  // Release the permit
  yield* TxSemaphore.release(semaphore)
  available = yield* TxSemaphore.available(semaphore)
  yield* Console.log(`After release: ${available}`) // 2
})
```

**See**

- `acquire` for manually acquiring one permit
- `releaseN` for returning multiple permits

**Signature**

```ts
declare const release: (self: TxSemaphore) => Effect.Effect<void>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxSemaphore.ts#L431)

Since v2.0.0

## releaseN

Releases the specified number of permits back to the semaphore.

**When to use**

Use to manually return multiple permits after a transactional acquire.

**Details**

The available permit count is capped at the semaphore capacity.

**Gotchas**

Passing a non-positive `n` dies with a defect.

**Example** (Releasing multiple permits)

```ts
import { Console, Effect, TxSemaphore } from "effect"

const program = Effect.gen(function* () {
  const semaphore = yield* TxSemaphore.make(5)

  // Acquire 3 permits
  yield* TxSemaphore.acquireN(semaphore, 3)
  let available = yield* TxSemaphore.available(semaphore)
  yield* Console.log(`After acquire: ${available}`) // 2

  // Release 2 permits
  yield* TxSemaphore.releaseN(semaphore, 2)
  available = yield* TxSemaphore.available(semaphore)
  yield* Console.log(`After release: ${available}`) // 4
})
```

**See**

- `acquireN` for manually acquiring multiple permits
- `release` for returning one permit

**Signature**

```ts
declare const releaseN: (self: TxSemaphore, n: number) => Effect.Effect<void>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxSemaphore.ts#L475)

Since v2.0.0

## tryAcquire

Tries to acquire a single permit from the semaphore without blocking,
returning `true` if successful or `false` if no permits are available.

**When to use**

Use to attempt a single-permit acquisition without retrying when no permit is
available.

**Example** (Trying to acquire a permit)

```ts
import { Console, Effect, TxSemaphore } from "effect"

const program = Effect.gen(function* () {
  const semaphore = yield* TxSemaphore.make(1)

  // First try should succeed
  const first = yield* TxSemaphore.tryAcquire(semaphore)
  yield* Console.log(`First try: ${first}`) // true

  // Second try should fail (no permits left)
  const second = yield* TxSemaphore.tryAcquire(semaphore)
  yield* Console.log(`Second try: ${second}`) // false
})
```

**See**

- `acquire` for waiting until one permit is available
- `tryAcquireN` for attempting to acquire multiple permits without blocking

**Signature**

```ts
declare const tryAcquire: (self: TxSemaphore) => Effect.Effect<boolean>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxSemaphore.ts#L338)

Since v4.0.0

## tryAcquireN

Tries to acquire the specified number of permits from the semaphore without
blocking, returning `true` if successful or `false` if not enough permits are
available.

**When to use**

Use to attempt a multi-permit acquisition without retrying when not enough
permits are available.

**Example** (Trying to acquire multiple permits)

```ts
import { Console, Effect, TxSemaphore } from "effect"

const program = Effect.gen(function* () {
  const semaphore = yield* TxSemaphore.make(3)

  // Try to acquire 2 permits (should succeed)
  const first = yield* TxSemaphore.tryAcquireN(semaphore, 2)
  yield* Console.log(`First try (2 permits): ${first}`) // true

  // Try to acquire 2 more permits (should fail, only 1 left)
  const second = yield* TxSemaphore.tryAcquireN(semaphore, 2)
  yield* Console.log(`Second try (2 permits): ${second}`) // false
})
```

**See**

- `acquireN` for waiting until all requested permits are available
- `tryAcquire` for attempting to acquire one permit without blocking

**Signature**

```ts
declare const tryAcquireN: (self: TxSemaphore, n: number) => Effect.Effect<boolean>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxSemaphore.ts#L380)

Since v4.0.0

## withPermit

Executes an effect with a single permit from the semaphore. The permit is
automatically acquired before execution and released afterwards, even if the
effect fails or is interrupted.

**When to use**

Use to run an effect while automatically acquiring and releasing one
transactional permit.

**Details**

The permit acquisition and release operations use atomic semantics to ensure
proper resource management with Effect's scoped operations.

**Example** (Running an effect with a permit)

```ts
import { Console, Effect, TxSemaphore } from "effect"

const program = Effect.gen(function* () {
  const semaphore = yield* TxSemaphore.make(2)

  // Execute database operation with automatic permit management
  const result = yield* TxSemaphore.withPermit(
    semaphore,
    Effect.gen(function* () {
      yield* Console.log("Permit acquired, accessing database...")
      yield* Effect.sleep("100 millis") // Simulate database work
      yield* Console.log("Database operation complete")
      return "query result"
    })
  )

  yield* Console.log(`Result: ${result}`)
  // Permit is automatically released here
})
```

**See**

- `withPermits` for automatically acquiring and releasing multiple permits
- `withPermitScoped` for acquiring one permit for the current scope
- `acquire` for manual single-permit acquisition

**Signature**

```ts
declare const withPermit: {
  (self: TxSemaphore): <A, E, R>(effect: Effect.Effect<A, E, R>) => Effect.Effect<A, E, R>
  <A, E, R>(self: TxSemaphore, effect: Effect.Effect<A, E, R>): Effect.Effect<A, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxSemaphore.ts#L531)

Since v2.0.0

## withPermitScoped

Acquires a single permit from the semaphore in a scoped manner. The permit
will be automatically released when the scope is closed, even if effects
within the scope fail or are interrupted.

**When to use**

Use to acquire one transactional permit for the lifetime of the current
scope.

**Details**

The permit acquisition and release operations use atomic semantics to ensure
proper resource management with Effect's scoped operations.

**Example** (Acquiring a scoped permit)

```ts
import { Console, Effect, TxSemaphore } from "effect"

const program = Effect.gen(function* () {
  const semaphore = yield* TxSemaphore.make(3)

  yield* Effect.scoped(
    Effect.gen(function* () {
      // Acquire permit for the duration of this scope
      yield* TxSemaphore.withPermitScoped(semaphore)
      yield* Console.log("Permit acquired for scope")

      // Do work within the scope
      yield* Effect.sleep("500 millis")
      yield* Console.log("Work completed")

      // Permit will be automatically released when scope closes
    })
  )

  yield* Console.log("Scope closed, permit released")
})
```

**See**

- `withPermit` for acquiring one permit around a single effect
- `acquire` for manual single-permit acquisition

**Signature**

```ts
declare const withPermitScoped: (self: TxSemaphore) => Effect.Effect<void, never, Scope.Scope>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxSemaphore.ts#L669)

Since v2.0.0

## withPermits

Runs an effect while holding the specified number of permits from the
semaphore.

**When to use**

Use to run an effect while automatically acquiring and releasing multiple
transactional permits.

**Details**

The permits are acquired before the effect starts and released after it
completes, fails, or is interrupted.

**Gotchas**

Passing a non-positive `n` dies with a defect. Passing a value greater than
the semaphore capacity can wait forever.

**Example** (Running an effect with multiple permits)

```ts
import { Console, Effect, TxSemaphore } from "effect"

const program = Effect.gen(function* () {
  const semaphore = yield* TxSemaphore.make(5)

  // Execute batch operation with 3 permits
  const results = yield* TxSemaphore.withPermits(
    semaphore,
    3,
    Effect.gen(function* () {
      yield* Console.log("3 permits acquired, processing batch...")
      yield* Effect.sleep("200 millis") // Simulate batch processing
      return ["result1", "result2", "result3"]
    })
  )

  yield* Console.log(`Batch results: ${results.join(", ")}`)
  // All 3 permits are automatically released here
})
```

**See**

- `withPermit` for automatically acquiring and releasing one permit
- `acquireN` for manual multi-permit acquisition

**Signature**

```ts
declare const withPermits: {
  (self: TxSemaphore, n: number): <A, E, R>(effect: Effect.Effect<A, E, R>) => Effect.Effect<A, E, R>
  <A, E, R>(self: TxSemaphore, n: number, effect: Effect.Effect<A, E, R>): Effect.Effect<A, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxSemaphore.ts#L601)

Since v2.0.0

# constructors

## make

Creates a new TxSemaphore with the specified number of permits.

**When to use**

Use to create a transactional semaphore with a fixed permit capacity.

**Example** (Creating a semaphore)

```ts
import { Console, Effect, TxSemaphore } from "effect"

// Create a semaphore for managing concurrent access to a resource pool
const program = Effect.gen(function* () {
  // Create a semaphore with 3 permits for a connection pool
  const connectionSemaphore = yield* TxSemaphore.make(3)

  // Check initial state
  const available = yield* TxSemaphore.available(connectionSemaphore)
  const capacity = yield* TxSemaphore.capacity(connectionSemaphore)

  yield* Console.log(`Created semaphore with ${capacity} permits, ${available} available`)
  // Output: "Created semaphore with 3 permits, 3 available"
})
```

**See**

- `available` for reading the current available permit count
- `capacity` for reading the fixed total permit count

**Signature**

```ts
declare const make: (permits: number) => Effect.Effect<TxSemaphore>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxSemaphore.ts#L126)

Since v2.0.0

# guards

## isTxSemaphore

Determines if the provided value is a TxSemaphore.

**When to use**

Use to narrow an unknown value before treating it as a `TxSemaphore`.

**Example** (Checking semaphore values)

```ts
import { Effect, TxSemaphore } from "effect"

const program = Effect.gen(function* () {
  const semaphore = yield* TxSemaphore.make(5)
  const notSemaphore = { some: "object" }

  console.log(TxSemaphore.isTxSemaphore(semaphore)) // true
  console.log(TxSemaphore.isTxSemaphore(notSemaphore)) // false

  // Useful for runtime type checking in generic functions
  if (TxSemaphore.isTxSemaphore(semaphore)) {
    const available = yield* TxSemaphore.available(semaphore)
    console.log(`Available permits: ${available}`)
  }
})
```

**See**

- `make` for creating a `TxSemaphore`

**Signature**

```ts
declare const isTxSemaphore: (u: unknown) => u is TxSemaphore
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxSemaphore.ts#L707)

Since v4.0.0

# models

## TxSemaphore (interface)

A transactional semaphore that manages permits using Software Transactional
Memory (STM) semantics, providing atomic permit acquisition and release
operations within Effect transactions for concurrency control over limited
resources.

**When to use**

Use to coordinate permit accounting atomically with other transactional
state changes.

**Example** (Managing permits transactionally)

```ts
import { Effect, TxSemaphore } from "effect"

// Create a semaphore with 3 permits for managing concurrent database connections
const program = Effect.gen(function* () {
  const dbSemaphore = yield* TxSemaphore.make(3)

  // Acquire a permit before accessing the database
  yield* TxSemaphore.acquire(dbSemaphore)
  console.log("Database connection acquired")

  // Perform database operations...

  // Release the permit when done
  yield* TxSemaphore.release(dbSemaphore)
  console.log("Database connection released")
})
```

**See**

- `make` for creating a transactional semaphore
- `withPermit` for automatically acquiring and releasing one permit
- `acquire` for manually acquiring one permit transactionally

**Signature**

```ts
export interface TxSemaphore extends Inspectable, Pipeable {
  readonly [TypeId]: typeof TypeId
  readonly permitsRef: TxRef.TxRef<number>
  readonly capacity: number
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxSemaphore.ts#L63)

Since v4.0.0
