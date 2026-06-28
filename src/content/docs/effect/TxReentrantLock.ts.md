---
title: TxReentrantLock.ts
nav_order: 135
parent: "effect"
---

## TxReentrantLock.ts overview

Coordinates shared access inside transactions with read and write locks.

A `TxReentrantLock` lets many fibers hold read locks at the same time, or one
fiber hold a write lock for exclusive access. Lock ownership is tracked by
fiber, so a fiber that already holds the lock can acquire it again and later
release each acquisition. Attempts that cannot proceed retry transactionally
until the lock becomes available. This module includes manual, scoped, and
wrapper-style operations for read and write locking.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [make](#make)
- [getters](#getters)
  - [locked](#locked)
  - [readLocked](#readlocked)
  - [readLocks](#readlocks)
  - [writeLocked](#writelocked)
  - [writeLocks](#writelocks)
- [guards](#guards)
  - [isTxReentrantLock](#istxreentrantlock)
- [models](#models)
  - [TxReentrantLock (interface)](#txreentrantlock-interface)
- [mutations](#mutations)
  - [acquireRead](#acquireread)
  - [acquireWrite](#acquirewrite)
  - [readLock](#readlock)
  - [releaseRead](#releaseread)
  - [releaseWrite](#releasewrite)
  - [withLock](#withlock)
  - [withReadLock](#withreadlock)
  - [withWriteLock](#withwritelock)
  - [writeLock](#writelock)

---

# constructors

## make

Creates a new TxReentrantLock.

**Example** (Creating a reentrant lock)

```ts
import { Effect, TxReentrantLock } from "effect"

const program = Effect.gen(function* () {
  const lock = yield* TxReentrantLock.make()
  const isLocked = yield* TxReentrantLock.locked(lock)
  console.log(isLocked) // false
})
```

**Signature**

```ts
declare const make: () => Effect.Effect<TxReentrantLock>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxReentrantLock.ts#L107)

Since v2.0.0

# getters

## locked

Checks whether the lock is held by any fiber (read or write).

**Example** (Checking whether a lock is held)

```ts
import { Effect, TxReentrantLock } from "effect"

const program = Effect.gen(function* () {
  const lock = yield* TxReentrantLock.make()
  const isLocked = yield* TxReentrantLock.locked(lock)
  console.log(isLocked) // false
})
```

**Signature**

```ts
declare const locked: (self: TxReentrantLock) => Effect.Effect<boolean>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxReentrantLock.ts#L579)

Since v2.0.0

## readLocked

Checks whether any fiber holds a read lock.

**Example** (Checking whether a read lock is held)

```ts
import { Effect, TxReentrantLock } from "effect"

const program = Effect.gen(function* () {
  const lock = yield* TxReentrantLock.make()
  const isReadLocked = yield* TxReentrantLock.readLocked(lock)
  console.log(isReadLocked) // false
})
```

**Signature**

```ts
declare const readLocked: (self: TxReentrantLock) => Effect.Effect<boolean>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxReentrantLock.ts#L603)

Since v2.0.0

## readLocks

Returns the total number of read locks held across all fibers.

**Example** (Counting read locks)

```ts
import { Effect, TxReentrantLock } from "effect"

const program = Effect.gen(function* () {
  const lock = yield* TxReentrantLock.make()
  yield* TxReentrantLock.acquireRead(lock)
  const count = yield* TxReentrantLock.readLocks(lock)
  console.log(count) // 1
  yield* TxReentrantLock.releaseRead(lock)
})
```

**Signature**

```ts
declare const readLocks: (self: TxReentrantLock) => Effect.Effect<number>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxReentrantLock.ts#L527)

Since v2.0.0

## writeLocked

Checks whether any fiber holds a write lock.

**Example** (Checking whether a write lock is held)

```ts
import { Effect, TxReentrantLock } from "effect"

const program = Effect.gen(function* () {
  const lock = yield* TxReentrantLock.make()
  const isWriteLocked = yield* TxReentrantLock.writeLocked(lock)
  console.log(isWriteLocked) // false
})
```

**Signature**

```ts
declare const writeLocked: (self: TxReentrantLock) => Effect.Effect<boolean>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxReentrantLock.ts#L627)

Since v2.0.0

## writeLocks

Returns the number of write locks held (0 or the reentrant count).

**Example** (Counting write locks)

```ts
import { Effect, TxReentrantLock } from "effect"

const program = Effect.gen(function* () {
  const lock = yield* TxReentrantLock.make()
  const count = yield* TxReentrantLock.writeLocks(lock)
  console.log(count) // 0
})
```

**Signature**

```ts
declare const writeLocks: (self: TxReentrantLock) => Effect.Effect<number>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxReentrantLock.ts#L555)

Since v2.0.0

# guards

## isTxReentrantLock

Checks whether the given value is a TxReentrantLock.

**Example** (Checking for TxReentrantLock values)

```ts
import { TxReentrantLock } from "effect"

declare const someValue: unknown

if (TxReentrantLock.isTxReentrantLock(someValue)) {
  console.log("This is a TxReentrantLock")
}
```

**Signature**

```ts
declare const isTxReentrantLock: (u: unknown) => u is TxReentrantLock
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxReentrantLock.ts#L655)

Since v4.0.0

# models

## TxReentrantLock (interface)

A TxReentrantLock provides a transactional read/write lock with reentrant semantics.
Multiple readers can hold the lock concurrently, or a single writer can hold exclusive
access. A fiber holding the write lock may acquire additional read/write locks (reentrancy).

**Example** (Using read and write locks)

```ts
import { Effect, TxReentrantLock } from "effect"

const program = Effect.gen(function* () {
  const lock = yield* TxReentrantLock.make()

  // Multiple readers can proceed concurrently
  yield* TxReentrantLock.withReadLock(lock, Effect.succeed("reading"))

  // Writer gets exclusive access
  yield* TxReentrantLock.withWriteLock(lock, Effect.succeed("writing"))
})
```

**Signature**

```ts
export interface TxReentrantLock extends Inspectable, Pipeable {
  readonly [TypeId]: typeof TypeId
  /** @internal */
  readonly stateRef: TxRef.TxRef<LockState>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxReentrantLock.ts#L64)

Since v4.0.0

# mutations

## acquireRead

Acquires a read lock. Blocks if another fiber holds the write lock.
If the current fiber already holds the write lock, the read lock is granted (reentrancy).
Returns the current number of read locks held by this fiber.

**Example** (Acquiring a read lock)

```ts
import { Effect, TxReentrantLock } from "effect"

const program = Effect.gen(function* () {
  const lock = yield* TxReentrantLock.make()
  const count = yield* TxReentrantLock.acquireRead(lock)
  console.log(count) // 1
  yield* TxReentrantLock.releaseRead(lock)
})
```

**Signature**

```ts
declare const acquireRead: (self: TxReentrantLock) => Effect.Effect<number>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxReentrantLock.ts#L141)

Since v2.0.0

## acquireWrite

Acquires the write lock for the current fiber.

**When to use**

Use to enter an exclusive section manually when `withWriteLock` is not the
right shape.

**Details**

Blocks if any other fiber holds a read or write lock. If the current fiber
already holds the write lock, the count is incremented. If the current fiber
holds a read lock, the write lock is granted as an upgrade.

Returns the current number of write locks held by this fiber.

**Example** (Acquiring a write lock)

```ts
import { Effect, TxReentrantLock } from "effect"

const program = Effect.gen(function* () {
  const lock = yield* TxReentrantLock.make()
  const count = yield* TxReentrantLock.acquireWrite(lock)
  console.log(count) // 1
  yield* TxReentrantLock.releaseWrite(lock)
})
```

**Signature**

```ts
declare const acquireWrite: (self: TxReentrantLock) => Effect.Effect<number>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxReentrantLock.ts#L195)

Since v2.0.0

## readLock

Acquires a read lock for the duration of the scope.
The lock is automatically released when the scope closes.

**Example** (Holding a scoped read lock)

```ts
import { Effect, TxReentrantLock } from "effect"

const program = Effect.gen(function* () {
  const lock = yield* TxReentrantLock.make()

  yield* Effect.scoped(
    Effect.gen(function* () {
      yield* TxReentrantLock.readLock(lock)
      // read lock is held for the duration of the scope
    })
  )
  // read lock is released
})
```

**Signature**

```ts
declare const readLock: (self: TxReentrantLock) => Effect.Effect<number, never, Scope.Scope>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxReentrantLock.ts#L349)

Since v2.0.0

## releaseRead

Releases one read lock held by the current fiber.

**When to use**

Use to leave a manually acquired read lock.

**Details**

Returns the remaining number of read locks held by this fiber.

**Example** (Releasing a read lock)

```ts
import { Effect, TxReentrantLock } from "effect"

const program = Effect.gen(function* () {
  const lock = yield* TxReentrantLock.make()
  yield* TxReentrantLock.acquireRead(lock)
  const remaining = yield* TxReentrantLock.releaseRead(lock)
  console.log(remaining) // 0
})
```

**Signature**

```ts
declare const releaseRead: (self: TxReentrantLock) => Effect.Effect<number>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxReentrantLock.ts#L260)

Since v2.0.0

## releaseWrite

Releases one write lock held by the current fiber.

**When to use**

Use to leave a manually acquired write lock.

**Details**

Returns the remaining number of write locks held by this fiber.

**Example** (Releasing a write lock)

```ts
import { Effect, TxReentrantLock } from "effect"

const program = Effect.gen(function* () {
  const lock = yield* TxReentrantLock.make()
  yield* TxReentrantLock.acquireWrite(lock)
  const remaining = yield* TxReentrantLock.releaseWrite(lock)
  console.log(remaining) // 0
})
```

**Signature**

```ts
declare const releaseWrite: (self: TxReentrantLock) => Effect.Effect<number>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxReentrantLock.ts#L306)

Since v2.0.0

## withLock

Runs an effect while holding a write lock.

**When to use**

Use when you need to run an effect with exclusive write access through a
`TxReentrantLock` and prefer the concise lock helper.

**Example** (Running an effect with exclusive access)

```ts
import { Effect, TxReentrantLock } from "effect"

const program = Effect.gen(function* () {
  const lock = yield* TxReentrantLock.make()
  const result = yield* TxReentrantLock.withLock(lock, Effect.succeed("exclusive operation"))
  console.log(result) // "exclusive operation"
})
```

**Signature**

```ts
declare const withLock: {
  <A, E, R>(effect: Effect.Effect<A, E, R>): (self: TxReentrantLock) => Effect.Effect<A, E, R>
  <A, E, R>(self: TxReentrantLock, effect: Effect.Effect<A, E, R>): Effect.Effect<A, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxReentrantLock.ts#L498)

Since v2.0.0

## withReadLock

Runs the provided effect while holding a read lock. The lock is automatically
released after the effect completes, fails, or is interrupted.

**Example** (Running an effect with a read lock)

```ts
import { Effect, TxReentrantLock } from "effect"

const program = Effect.gen(function* () {
  const lock = yield* TxReentrantLock.make()
  const result = yield* TxReentrantLock.withReadLock(lock, Effect.succeed("read data"))
  console.log(result) // "read data"
})
```

**Signature**

```ts
declare const withReadLock: {
  <A, E, R>(effect: Effect.Effect<A, E, R>): (self: TxReentrantLock) => Effect.Effect<A, E, R>
  <A, E, R>(self: TxReentrantLock, effect: Effect.Effect<A, E, R>): Effect.Effect<A, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxReentrantLock.ts#L408)

Since v2.0.0

## withWriteLock

Runs the provided effect while holding a write lock. The lock is automatically
released after the effect completes, fails, or is interrupted.

**Example** (Running an effect with a write lock)

```ts
import { Effect, TxReentrantLock } from "effect"

const program = Effect.gen(function* () {
  const lock = yield* TxReentrantLock.make()
  const result = yield* TxReentrantLock.withWriteLock(lock, Effect.succeed("wrote data"))
  console.log(result) // "wrote data"
})
```

**Signature**

```ts
declare const withWriteLock: {
  <A, E, R>(effect: Effect.Effect<A, E, R>): (self: TxReentrantLock) => Effect.Effect<A, E, R>
  <A, E, R>(self: TxReentrantLock, effect: Effect.Effect<A, E, R>): Effect.Effect<A, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxReentrantLock.ts#L451)

Since v2.0.0

## writeLock

Acquires a write lock for the duration of the scope.
The lock is automatically released when the scope closes.

**Example** (Holding a scoped write lock)

```ts
import { Effect, TxReentrantLock } from "effect"

const program = Effect.gen(function* () {
  const lock = yield* TxReentrantLock.make()

  yield* Effect.scoped(
    Effect.gen(function* () {
      yield* TxReentrantLock.writeLock(lock)
      // write lock is held for the duration of the scope
    })
  )
  // write lock is released
})
```

**Signature**

```ts
declare const writeLock: (self: TxReentrantLock) => Effect.Effect<number, never, Scope.Scope>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TxReentrantLock.ts#L380)

Since v2.0.0
