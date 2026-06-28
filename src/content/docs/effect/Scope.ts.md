---
title: Scope.ts
nav_order: 106
parent: "effect"
---

## Scope.ts overview

Controls how long resources stay open.

A scope is a lifetime boundary. Code can register cleanup effects on it, and
closing the scope runs those cleanups with the `Exit` value that ended the
work. Most application code uses higher-level APIs such as `Effect.scoped`
and `Layer`, while this module is useful when code needs to create, provide,
fork, close, or inspect scopes directly.

Since v2.0.0

---

## Exports Grouped by Category

- [combinators](#combinators)
  - [addFinalizer](#addfinalizer)
  - [addFinalizerExit](#addfinalizerexit)
  - [close](#close)
  - [fork](#fork)
  - [forkUnsafe](#forkunsafe)
  - [provide](#provide)
  - [use](#use)
- [constructors](#constructors)
  - [make](#make)
  - [makeUnsafe](#makeunsafe)
- [models](#models)
  - [Closeable (interface)](#closeable-interface)
  - [Scope (interface)](#scope-interface)
- [services](#services)
  - [Scope](#scope)
- [unsafe](#unsafe)
  - [closeUnsafe](#closeunsafe)
- [utils](#utils)
  - [State (namespace)](#state-namespace)
    - [Empty (type alias)](#empty-type-alias)
    - [Open (type alias)](#open-type-alias)
    - [Closed (type alias)](#closed-type-alias)

---

# combinators

## addFinalizer

Registers a finalizer effect on a scope.

**Details**

If the scope is open, the finalizer runs when the scope closes, regardless of
whether the scope closes successfully or with an error. If the scope is
already closed, the finalizer runs immediately.

**Example** (Adding finalizers)

```ts
import { Console, Effect, Exit, Scope } from "effect"

const program = Effect.gen(function* () {
  const scope = yield* Scope.make()

  // Add simple finalizers
  yield* Scope.addFinalizer(scope, Console.log("Cleanup task 1"))
  yield* Scope.addFinalizer(scope, Console.log("Cleanup task 2"))
  yield* Scope.addFinalizer(scope, Effect.log("Cleanup task 3"))

  // Do some work
  yield* Console.log("Doing work...")

  // Close the scope
  yield* Scope.close(scope, Exit.void)
})
```

**Signature**

```ts
declare const addFinalizer: (scope: Scope, finalizer: Effect<unknown>) => Effect<void>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Scope.ts#L402)

Since v2.0.0

## addFinalizerExit

Registers an exit-aware finalizer on a scope.

**When to use**

Use when cleanup needs to know whether the scope closed with success,
failure, or interruption.

**Details**

If the scope is open, the finalizer runs when the scope closes and receives
the scope's exit value. If the scope is already closed, the finalizer runs
immediately with the stored exit value.

**Example** (Adding an exit-aware finalizer)

```ts
import { Console, Effect, Exit, Scope } from "effect"

const withResource = Effect.gen(function* () {
  const scope = yield* Scope.make()

  // Add a finalizer for cleanup
  yield* Scope.addFinalizerExit(scope, (exit) =>
    Console.log(`Cleaning up resource. Exit: ${Exit.isSuccess(exit) ? "Success" : "Failure"}`)
  )

  // Use the resource
  yield* Console.log("Using resource")

  // Close the scope
  yield* Scope.close(scope, Exit.void)
})
```

**Signature**

```ts
declare const addFinalizerExit: (scope: Scope, finalizer: (exit: Exit<any, any>) => Effect<unknown>) => Effect<void>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Scope.ts#L366)

Since v2.0.0

## close

Closes a scope and runs its registered finalizers.

**When to use**

Use to close a scope manually with a specific exit value.

**Details**

Finalizers run in the scope's configured order and receive the supplied
`Exit`.

**Example** (Running scope finalizers)

```ts
import { Console, Effect, Exit, Scope } from "effect"

const resourceManagement = Effect.gen(function* () {
  const scope = yield* Scope.make("sequential")

  // Add multiple finalizers
  yield* Scope.addFinalizer(scope, Console.log("Close database connection"))
  yield* Scope.addFinalizer(scope, Console.log("Close file handle"))
  yield* Scope.addFinalizer(scope, Console.log("Release memory"))

  // Do some work...
  yield* Console.log("Performing operations...")

  // Close scope - finalizers run in reverse order of registration
  yield* Scope.close(scope, Exit.succeed("Success!"))
  // Output: "Release memory", "Close file handle", "Close database connection"
})
```

**Signature**

```ts
declare const close: <A, E>(self: Scope, exit: Exit<A, E>) => Effect<void>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Scope.ts#L520)

Since v2.0.0

## fork

Creates a closeable child scope registered with a parent scope.

**Details**

Closing the parent closes the child with the same exit value, and closing the
child detaches it from the parent. The optional finalizer strategy configures
the child scope and defaults to `"sequential"` when omitted.

**Example** (Creating a child scope)

```ts
import { Console, Effect, Exit, Scope } from "effect"

const nestedScopes = Effect.gen(function* () {
  const parentScope = yield* Scope.make("sequential")

  // Add finalizer to parent
  yield* Scope.addFinalizer(parentScope, Console.log("Parent cleanup"))

  // Create child scope
  const childScope = yield* Scope.fork(parentScope, "parallel")

  // Add finalizer to child
  yield* Scope.addFinalizer(childScope, Console.log("Child cleanup"))

  // Close child first, then parent
  yield* Scope.close(childScope, Exit.void)
  yield* Scope.close(parentScope, Exit.void)
})
```

**Signature**

```ts
declare const fork: (scope: Scope, finalizerStrategy?: "sequential" | "parallel") => Effect<Closeable>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Scope.ts#L439)

Since v2.0.0

## forkUnsafe

Creates a closeable child scope synchronously and registers it with a parent scope.

**When to use**

Use when a child scope must be created synchronously and the caller controls
both parent and child scope lifetimes.

**Details**

Closing the parent closes the child with the same exit value, and closing the
child detaches it from the parent. The optional finalizer strategy configures
the child scope and defaults to `"sequential"` when omitted.

**Example** (Creating a child scope synchronously)

```ts
import { Console, Effect, Exit, Scope } from "effect"

const program = Effect.gen(function* () {
  const parentScope = Scope.makeUnsafe("sequential")
  const childScope = Scope.forkUnsafe(parentScope, "parallel")

  // Add finalizers to both scopes
  yield* Scope.addFinalizer(parentScope, Console.log("Parent cleanup"))
  yield* Scope.addFinalizer(childScope, Console.log("Child cleanup"))

  // Close child first, then parent
  yield* Scope.close(childScope, Exit.void)
  yield* Scope.close(parentScope, Exit.void)
})
```

**Signature**

```ts
declare const forkUnsafe: (scope: Scope, finalizerStrategy?: "sequential" | "parallel") => Closeable
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Scope.ts#L480)

Since v4.0.0

## provide

Provides a concrete `Scope` to an effect.

**When to use**

Use to run an effect that requires `Scope` with a scope managed by the
caller.

**Details**

Providing the scope removes the `Scope` requirement from the effect context.

**Example** (Providing a scope)

```ts
import { Console, Effect, Scope } from "effect"

// An effect that requires a Scope
const program = Effect.gen(function* () {
  const scope = yield* Scope.Scope
  yield* Scope.addFinalizer(scope, Console.log("Cleanup"))
  yield* Console.log("Working...")
})

// Provide a scope to the program
const withScope = Effect.gen(function* () {
  const scope = yield* Scope.make()
  yield* Scope.provide(scope)(program)
})
```

**Signature**

```ts
declare const provide: {
  (value: Scope): <A, E, R>(self: Effect<A, E, R>) => Effect<A, E, Exclude<R, Scope>>
  <A, E, R>(self: Effect<A, E, R>, value: Scope): Effect<A, E, Exclude<R, Scope>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Scope.ts#L317)

Since v4.0.0

## use

Runs an effect with the provided closeable scope in its context and closes
that scope when the effect exits.

**When to use**

Use when you already have a `Closeable` scope and want to run an effect that
requires `Scope` while automatically closing that scope when the effect exits.

**Details**

The scope is closed with the same exit value as the effect, so registered
finalizers can observe whether the effect succeeded, failed, or was
interrupted.

**See**

- `provide` for providing a scope without closing it automatically
- `Effect.scoped` for creating and closing a fresh scope around a workflow

**Signature**

```ts
declare const use: {
  (scope: Closeable): <A, E, R>(self: Effect<A, E, R>) => Effect<A, E, Exclude<R, Scope>>
  <A, E, R>(self: Effect<A, E, R>, scope: Closeable): Effect<A, E, Exclude<R, Scope>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Scope.ts#L569)

Since v2.0.0

# constructors

## make

Creates a new `Scope` with the specified finalizer strategy.

**Example** (Creating a scope)

```ts
import { Console, Effect, Exit, Scope } from "effect"

const program = Effect.gen(function* () {
  // Create a scope with sequential cleanup
  const scope = yield* Scope.make("sequential")

  // Add finalizers
  yield* Scope.addFinalizer(scope, Console.log("Cleanup 1"))
  yield* Scope.addFinalizer(scope, Console.log("Cleanup 2"))

  // Close the scope (finalizers run in reverse order)
  yield* Scope.close(scope, Exit.void)
  // Output: "Cleanup 2", then "Cleanup 1"
})
```

**Signature**

```ts
declare const make: (finalizerStrategy?: "sequential" | "parallel") => Effect<Closeable>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Scope.ts#L251)

Since v2.0.0

## makeUnsafe

Creates a new `Scope` synchronously without wrapping it in an `Effect`.
This is useful when you need a scope immediately but should be used with caution
as it doesn't provide the same safety guarantees as the `Effect`-wrapped version.

**When to use**

Use when a scope must be allocated synchronously and the caller will close it
manually.

**Example** (Creating a scope synchronously)

```ts
import { Console, Effect, Exit, Scope } from "effect"

// Create a scope immediately
const scope = Scope.makeUnsafe("sequential")

// Use it in an Effect program
const program = Effect.gen(function* () {
  yield* Scope.addFinalizer(scope, Console.log("Cleanup"))
  yield* Scope.close(scope, Exit.void)
})
```

**Signature**

```ts
declare const makeUnsafe: (finalizerStrategy?: "sequential" | "parallel") => Closeable
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Scope.ts#L281)

Since v4.0.0

# models

## Closeable (interface)

A `Closeable` scope extends the base `Scope` interface with the ability
to be closed, executing all registered finalizers.

**Example** (Closing a scope)

```ts
import { Console, Effect, Exit, Scope } from "effect"

const program = Effect.gen(function* () {
  const scope = yield* Scope.make()

  // Add a finalizer
  yield* Scope.addFinalizer(scope, Console.log("Cleanup!"))

  // Scope can be closed
  yield* Scope.close(scope, Exit.void)
})
```

**Signature**

```ts
export interface Closeable extends Scope {
  readonly [CloseableTypeId]: typeof CloseableTypeId
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Scope.ts#L75)

Since v2.0.0

## Scope (interface)

A `Scope` represents a context where resources can be acquired and
automatically cleaned up when the scope is closed. Scopes can use
either sequential or parallel finalization strategies.

**Example** (Managing scoped resources)

```ts
import { Effect, Exit, Scope } from "effect"

const program = Effect.gen(function* () {
  const scope = yield* Scope.make("sequential")

  // Scope has a strategy and state
  console.log(scope.strategy) // "sequential"
  console.log(scope.state._tag) // "Open"

  // Close the scope
  yield* Scope.close(scope, Exit.void)
  console.log(scope.state._tag) // "Closed"
})
```

**Signature**

```ts
export interface Scope {
  readonly [TypeId]: typeof TypeId
  readonly strategy: "sequential" | "parallel"
  state: State.Open | State.Closed | State.Empty
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Scope.ts#L47)

Since v2.0.0

# services

## Scope

Service tag for the active resource lifetime.

**When to use**

Use to access the active lifetime when registering finalizers or sharing
resources with the surrounding scope.

**Example** (Accessing the scope service)

```ts
import { Effect, Scope } from "effect"

const program = Effect.gen(function* () {
  // Access the scope from the context
  const scope = yield* Scope.Scope

  // Use the scope for resource management
  yield* Scope.addFinalizer(scope, Effect.log("Cleanup"))
})

// Provide a scope to the program
const scoped = Effect.scoped(program)
```

**Signature**

```ts
declare const Scope: Context.Service<Scope, Scope>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Scope.ts#L224)

Since v2.0.0

# unsafe

## closeUnsafe

Closes a scope unsafely with the provided exit value.

**When to use**

Use when implementing lower-level scope machinery that must transition a
scope to `Closed` immediately and can run the returned finalizer effect when
one is produced.

**Details**

Returns an effect that runs registered finalizers, or `undefined` when the
scope was already closed or no finalizers need to run.

**Gotchas**

Ignoring the returned effect skips registered finalizers.

**See**

- `close` for the usual effectful close operation that always returns an `Effect`

**Signature**

```ts
declare const closeUnsafe: <A, E>(self: Scope, exit_: Exit<A, E>) => Effect<void, never, never> | undefined
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Scope.ts#L545)

Since v4.0.0

# utils

## State (namespace)

The `State` namespace contains the concrete states of a scope: `Empty`
before any finalizers are registered, `Open` with registered finalizers, and
`Closed` with the exit value used to close the scope.

**Example** (Checking scope states)

```ts
import { Effect, Exit, Scope } from "effect"

// Example of checking scope states
const program = Effect.gen(function* () {
  const scope = yield* Scope.make()

  // When open, the scope accepts finalizers
  if (scope.state._tag === "Open") {
    console.log("Scope is open")
  }

  yield* Scope.close(scope, Exit.void)

  // When closed, the scope no longer accepts finalizers
  if (scope.state._tag === "Closed") {
    console.log("Scope is closed")
  }
})
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Scope.ts#L109)

Since v4.0.0

### Empty (type alias)

Represents an open scope with no registered finalizers yet.

**Details**

Adding the first finalizer transitions the scope to `Open`; closing an
empty scope transitions directly to `Closed` without producing a finalizer
effect.

**Example** (Inspecting an empty scope state)

```ts
import { Scope } from "effect"

const scope = Scope.makeUnsafe()

// When scope is open, you can check its state
if (scope.state._tag === "Open") {
  console.log("Scope is open and accepting finalizers")
  console.log(scope.state.finalizers.size) // Number of registered finalizers
}
```

**Signature**

```ts
type Empty = {
  readonly _tag: "Empty"
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Scope.ts#L136)

Since v4.0.0

### Open (type alias)

Represents an open scope state where finalizers can be added and
the scope is still accepting new resources.

**Example** (Inspecting an open scope state)

```ts
import { Scope } from "effect"

const scope = Scope.makeUnsafe()

// When scope is open, you can check its state
if (scope.state._tag === "Open") {
  console.log("Scope is open and accepting finalizers")
  console.log(scope.state.finalizers.size) // Number of registered finalizers
}
```

**Signature**

```ts
type Open = {
  readonly _tag: "Open"
  readonly finalizers: Map<{}, (exit: Exit<any, any>) => Effect<void>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Scope.ts#L160)

Since v4.0.0

### Closed (type alias)

Represents a closed scope state where finalizers have been executed
and the scope is no longer accepting new resources.

**Example** (Inspecting a closed scope state)

```ts
import { Effect, Exit, Scope } from "effect"

const program = Effect.gen(function* () {
  const scope = yield* Scope.make()

  // Close the scope
  yield* Scope.close(scope, Exit.succeed("Done"))

  // Check if scope is closed
  if (scope.state._tag === "Closed") {
    console.log("Scope is closed")
    console.log(scope.state.exit) // The exit value used to close the scope
  }
})
```

**Signature**

```ts
type Closed = {
  readonly _tag: "Closed"
  readonly exit: Exit<any, any>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Scope.ts#L190)

Since v4.0.0
