---
title: Latch.ts
nav_order: 52
parent: "effect"
---

## Latch.ts overview

Reusable synchronization primitives for coordinating fibers. A `Latch` is
either open or closed: when it is closed, `await` and `whenOpen` suspend
until the latch opens or the current waiters are released. The module
includes effectful and synchronous constructors plus helpers to open, release,
close, wait, and gate effects behind the latch.

Since v4.0.0

---

## Exports Grouped by Category

- [combinators](#combinators)
  - [close](#close)
  - [open](#open)
  - [release](#release)
  - [whenOpen](#whenopen)
- [constructors](#constructors)
  - [make](#make)
  - [makeUnsafe](#makeunsafe)
- [getters](#getters)
  - [await](#await)
  - [isOpen](#isopen)
- [models](#models)
  - [Latch (interface)](#latch-interface)
- [unsafe](#unsafe)
  - [closeUnsafe](#closeunsafe)
  - [openUnsafe](#openunsafe)

---

# combinators

## close

Closes the latch so future `await` and `whenOpen` calls suspend.

**When to use**

Use to re-enable waiting on a latch after it was opened, so later `await`
and `whenOpen` calls suspend again.

**Details**

The returned effect succeeds with `true` when this call changed the latch
from open to closed, or `false` if it was already closed.

**See**

- `closeUnsafe` for a synchronous variant
- `open` for opening the latch for current and future waiters

**Signature**

```ts
declare const close: (self: Latch) => Effect.Effect<boolean>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Latch.ts#L324)

Since v4.0.0

## open

Opens the latch and releases fibers waiting on it.

**When to use**

Use to open a latch and release all fibers that are waiting on it.

**Details**

The returned effect succeeds with `true` when this call changed the latch
from closed to open, or `false` if it was already open.

**See**

- `openUnsafe` for a synchronous variant
- `release` to release waiting fibers without opening the latch

**Signature**

```ts
declare const open: (self: Latch) => Effect.Effect<boolean>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Latch.ts#L228)

Since v4.0.0

## release

Releases the fibers currently waiting on a closed latch without opening it.

**When to use**

Use to let the fibers currently waiting on a latch proceed while keeping the
latch closed for future waiters.

**Details**

The returned effect succeeds with `true` when release was requested while
the latch was closed, or `false` if the latch was already open. Future
waiters still suspend until the latch is opened or released again.

**See**

- `open` for opening the latch for current and future waiters

**Signature**

```ts
declare const release: (self: Latch) => Effect.Effect<boolean>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Latch.ts#L272)

Since v4.0.0

## whenOpen

Waits on the latch, then runs the provided effect.

**When to use**

Use to gate another effect so it starts only after the latch is opened or
the current waiters are released.

**Details**

If the latch is open, the effect runs immediately. If it is closed, the
returned effect suspends until the latch is opened or the current waiters are
released. The provided effect's success, failure, and requirements are
preserved.

**See**

- `await` for waiting without running another effect
- `open` for opening the latch for current and future waiters
- `release` for resuming current waiters without opening the latch

**Signature**

```ts
declare const whenOpen: {
  (self: Latch): <A, E, R>(effect: Effect.Effect<A, E, R>) => Effect.Effect<A, E, R>
  <A, E, R>(self: Latch, effect: Effect.Effect<A, E, R>): Effect.Effect<A, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Latch.ts#L372)

Since v4.0.0

# constructors

## make

Creates a `Latch` inside `Effect`.

**When to use**

Use to create a latch for coordinating fibers inside Effect code.

**Details**

The latch starts closed by default; pass `true` to create it open.

**Example** (Creating a latch)

```ts
import { Effect, Latch } from "effect"

const program = Effect.gen(function* () {
  const latch = yield* Latch.make(false)

  const waiter = Effect.gen(function* () {
    yield* Effect.log("Waiting for latch to open...")
    yield* latch.await
    yield* Effect.log("Latch opened! Continuing...")
  })

  const opener = Effect.gen(function* () {
    yield* Effect.sleep("2 seconds")
    yield* Effect.log("Opening latch...")
    yield* latch.open
  })

  yield* Effect.all([waiter, opener])
})
```

**See**

- `makeUnsafe` for synchronous allocation outside Effect code

**Signature**

```ts
declare const make: (open?: boolean | undefined) => Effect.Effect<Latch>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Latch.ts#L208)

Since v4.0.0

## makeUnsafe

Creates a `Latch` synchronously, outside of `Effect`.

**When to use**

Use when you need to allocate a `Latch` synchronously outside an Effect
workflow.

**Details**

The latch starts closed by default; pass `true` to create it open.

**Example** (Creating a latch unsafely)

```ts
import { Effect, Latch } from "effect"

const latch = Latch.makeUnsafe(false)

const waiter = Effect.gen(function* () {
  yield* Effect.log("Waiting for latch to open...")
  yield* latch.await
  yield* Effect.log("Latch opened! Continuing...")
})

const opener = Effect.gen(function* () {
  yield* Effect.sleep("2 seconds")
  yield* Effect.log("Opening latch...")
  yield* latch.open
})

const program = Effect.all([waiter, opener])
```

**See**

- `make` for creating a latch inside Effect code

**Signature**

```ts
declare const makeUnsafe: (open?: boolean | undefined) => Latch
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Latch.ts#L166)

Since v4.0.0

# getters

## await

Waits for the latch to be opened.

**When to use**

Use to suspend the current fiber until the latch is opened or the current
set of waiters is released.

**Details**

Awaiting an already open latch completes immediately. Awaiting a closed
latch suspends until `open` or `release` resumes the waiters.

**Gotchas**

`release` can resume current waiters without opening the latch, so later
waiters may still suspend.

**See**

- `open` for opening the latch for current and future waiters
- `release` for resuming current waiters without opening the latch
- `whenOpen` for waiting before running another effect

**Signature**

```ts
declare const await: (self: Latch) => Effect.Effect<void>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Latch.ts#L302)

Since v4.0.0

## isOpen

Checks whether the latch is currently open or closed.

**When to use**

Use to check the state of the latch without suspending or changing its state.

**Signature**

```ts
declare const isOpen: (self: Latch) => boolean
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Latch.ts#L394)

Since v4.0.0

# models

## Latch (interface)

A reusable coordination primitive that lets fibers wait until they are
released by the latch.

**When to use**

Use to coordinate fibers that must wait for an explicit open or release
signal before continuing.

**Details**

A closed latch causes `await` and `whenOpen` to suspend. `open` opens the
latch and releases current and future waiters, `release` releases only
current waiters without opening it, and `close` makes future waiters suspend
again.

**Example** (Coordinating fibers with a latch)

```ts
import { Effect, Latch } from "effect"

// Create and use a latch for coordination between fibers
const program = Effect.gen(function* () {
  const latch = yield* Latch.make()

  // Wait for the latch to be opened
  yield* latch.await

  return "Latch was opened!"
})
```

**See**

- `make` for creating a latch inside Effect code
- `open` for releasing current and future waiters
- `release` for releasing only the current waiters

**Signature**

```ts
export interface Latch {
  /**
   * Opens the latch, releasing all fibers waiting on it.
   *
   * **When to use**
   *
   * Use to let current and future waiters continue.
   */
  readonly open: Effect.Effect<boolean>

  /**
   * Opens the latch synchronously, releasing all fibers waiting on it.
   *
   * **When to use**
   *
   * Use when synchronous code must open the latch immediately.
   */
  openUnsafe(this: Latch): boolean

  /**
   * Releases all fibers currently waiting on the latch without opening it.
   *
   * **When to use**
   *
   * Use to let current waiters continue while future waiters still suspend.
   */
  readonly release: Effect.Effect<boolean>

  /**
   * Waits for the latch to be opened or released.
   *
   * **When to use**
   *
   * Use to suspend until the latch allows the current fiber to continue.
   */
  readonly await: Effect.Effect<void>

  /**
   * Closes the latch so future waiters suspend again.
   *
   * **When to use**
   *
   * Use to re-enable waiting after a latch has been opened.
   */
  readonly close: Effect.Effect<boolean>

  /**
   * Closes the latch synchronously so future waiters suspend again.
   *
   * **When to use**
   *
   * Use when synchronous code must close the latch immediately.
   */
  closeUnsafe(this: Latch): boolean

  /**
   * Runs the given effect only after the latch allows waiting fibers to
   * continue.
   *
   * **When to use**
   *
   * Use to gate an effect behind the latch signal.
   */
  whenOpen<A, E, R>(self: Effect.Effect<A, E, R>): Effect.Effect<A, E, R>

  /**
   * Checks whether the latch is currently open or closed.
   *
   * **When to use**
   *
   * Use to check the state of the latch without suspending or changing its state.
   */
  isOpen(this: Latch): boolean
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Latch.ts#L52)

Since v4.0.0

# unsafe

## closeUnsafe

Closes the latch synchronously so future `await` and `whenOpen` calls
suspend.

**When to use**

Use to close a latch synchronously when the state change must happen outside
an `Effect`.

**Details**

Returns `true` when this call changed the latch from open to closed, or
`false` if it was already closed. This unsafe variant performs the state
change immediately instead of returning an `Effect`.

**See**

- `close` for the effectful variant
- `openUnsafe` to synchronously open the latch and release waiting
  fibers

**Signature**

```ts
declare const closeUnsafe: (self: Latch) => boolean
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Latch.ts#L348)

Since v4.0.0

## openUnsafe

Opens the latch synchronously and releases fibers waiting on it.

**When to use**

Use when you need synchronous code to open a latch immediately and release
the fibers waiting on it.

**Details**

Returns `true` when this call changed the latch from closed to open, or
`false` if it was already open. This unsafe variant performs the state
change immediately instead of returning an `Effect`.

**See**

- `open` for the effectful variant
- `release` to release waiting fibers without opening the latch
- `closeUnsafe` for the synchronous inverse operation

**Signature**

```ts
declare const openUnsafe: (self: Latch) => boolean
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Latch.ts#L251)

Since v4.0.0
