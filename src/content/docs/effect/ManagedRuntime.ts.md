---
title: ManagedRuntime.ts
nav_order: 57
parent: "effect"
---

## ManagedRuntime.ts overview

Runs many effects against services built once from a `Layer`.

A `ManagedRuntime` builds the services from a layer, keeps those services
available for repeated effect runs, and releases acquired resources when it
is disposed. This module includes the runtime type, a constructor, a guard,
and runners for connecting Effect programs to JavaScript entry points such as
promises, callbacks, and synchronous code.

Since v2.0.0

---

## Exports Grouped by Category

- [guards](#guards)
  - [isManagedRuntime](#ismanagedruntime)
- [models](#models)
  - [ManagedRuntime (interface)](#managedruntime-interface)
- [runtime class](#runtime-class)
  - [make](#make)
- [utils](#utils)
  - [ManagedRuntime (namespace)](#managedruntime-namespace)
    - [Services (type alias)](#services-type-alias)
    - [Error (type alias)](#error-type-alias)

---

# guards

## isManagedRuntime

Checks whether the provided argument is a `ManagedRuntime`.

**When to use**

Use to narrow an unknown value before treating it as a `ManagedRuntime`.

**Details**

The guard checks the internal `ManagedRuntime` marker property. It does not
build the layer or inspect the runtime's services.

**Gotchas**

Disposed runtimes still carry the marker, so this guard does not prove the
runtime is still usable.

**See**

- `make` for creating managed runtimes this guard recognizes

**Signature**

```ts
declare const isManagedRuntime: (input: unknown) => input is ManagedRuntime<unknown, unknown>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ManagedRuntime.ts#L45)

Since v3.9.0

# models

## ManagedRuntime (interface)

A runtime built from a layer that can execute effects requiring that layer's
services.

**When to use**

Use as the reusable runtime value returned by `make` when application entry
points or integration code need to run many effects against the same
layer-built services.

**Details**

The runtime builds and caches its service context and owns the scope for
resources acquired by the layer.

**Gotchas**

Dispose the runtime with `dispose` or `disposeEffect` when it is no longer
needed.

**See**

- `make` for constructing a managed runtime from a layer
- `Layer.build` for lower-level scoped layer construction

**Signature**

```ts
export interface ManagedRuntime<in R, out ER> {
  readonly [TypeId]: typeof TypeId
  readonly memoMap: Layer.MemoMap
  readonly contextEffect: Effect.Effect<Context.Context<R>, ER>
  readonly context: () => Promise<Context.Context<R>>

  // internal
  readonly scope: Scope.Closeable
  // internal
  cachedContext: Context.Context<R> | undefined

  /**
   * Executes the effect using the provided Scheduler or using the global
   * Scheduler if not provided
   *
   * **When to use**
   *
   * Use to fork an effect against this runtime's services and get the running
   * fiber.
   */
  readonly runFork: <A, E>(self: Effect.Effect<A, E, R>, options?: Effect.RunOptions) => Fiber.Fiber<A, E | ER>

  /**
   * Executes the effect synchronously returning the exit.
   *
   * **When to use**
   *
   * Use when invoking this effectful method at the edges of your
   * program.
   */
  readonly runSyncExit: <A, E>(effect: Effect.Effect<A, E, R>) => Exit.Exit<A, ER | E>

  /**
   * Executes the effect synchronously throwing in case of errors or async boundaries.
   *
   * **When to use**
   *
   * Use when invoking this effectful method at the edges of your
   * program.
   */
  readonly runSync: <A, E>(effect: Effect.Effect<A, E, R>) => A

  /**
   * Executes the effect asynchronously, eventually passing the exit value to
   * the specified callback.
   *
   * **When to use**
   *
   * Use when invoking this effectful method at the edges of your
   * program.
   */
  readonly runCallback: <A, E>(
    effect: Effect.Effect<A, E, R>,
    options?:
      | (Effect.RunOptions & {
          readonly onExit: (exit: Exit.Exit<A, E | ER>) => void
        })
      | undefined
  ) => (interruptor?: number | undefined) => void

  /**
   * Runs the `Effect`, returning a JavaScript `Promise` that will be resolved
   * with the value of the effect once the effect has been executed, or will be
   * rejected with the first error or exception throw by the effect.
   *
   * **When to use**
   *
   * Use when invoking this effectful method at the edges of your
   * program.
   */
  readonly runPromise: <A, E>(effect: Effect.Effect<A, E, R>, options?: Effect.RunOptions) => Promise<A>

  /**
   * Runs the `Effect`, returning a JavaScript `Promise` that will be resolved
   * with the `Exit` state of the effect once the effect has been executed.
   *
   * **When to use**
   *
   * Use when invoking this effectful method at the edges of your
   * program.
   */
  readonly runPromiseExit: <A, E>(
    effect: Effect.Effect<A, E, R>,
    options?: Effect.RunOptions
  ) => Promise<Exit.Exit<A, ER | E>>

  /**
   * Dispose of the resources associated with the runtime.
   *
   * **When to use**
   *
   * Use to release this runtime's layer resources from Promise-based code.
   */
  readonly dispose: () => Promise<void>

  /**
   * Dispose of the resources associated with the runtime.
   *
   * **When to use**
   *
   * Use to release this runtime's layer resources from an `Effect` workflow.
   */
  readonly disposeEffect: Effect.Effect<void, never, never>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ManagedRuntime.ts#L112)

Since v2.0.0

# runtime class

## make

Creates a `ManagedRuntime` from a layer.

**When to use**

Use to create a reusable runtime from a `Layer` for application entry points
or integration code that runs many effects without rebuilding services.

**Details**

The layer is built lazily on first use and its context is cached for
subsequent runs. Resources acquired by the layer are owned by the runtime and
are released when `dispose` or `disposeEffect` is run. `options.memoMap` can
be used to share layer memoization with other layer builds.

**Gotchas**

Dispose the runtime when it is no longer needed. A runtime cannot be reused
after disposal.

**Example** (Creating a managed runtime)

```ts
import { Context, Effect, Layer, ManagedRuntime } from "effect"

class Notifications extends Context.Service<
  Notifications,
  {
    readonly notify: (message: string) => Effect.Effect<void>
  }
>()("Notifications") {
  static readonly layer = Layer.succeed(this)({
    notify: Effect.fn("Notifications.notify")((message) => Effect.sync(() => console.log(message)))
  })
}

const runtime = ManagedRuntime.make(Notifications.layer)

const program = Effect.flatMap(Notifications, (_) => _.notify("Hello, world!")).pipe(
  Effect.ensuring(runtime.disposeEffect)
)

runtime.runPromise(program)
// Hello, world!
```

**See**

- `ManagedRuntime` for the returned runtime interface
- `Layer.MemoMap` for shared layer memoization
- `Layer.build` for lower-level scoped layer construction

**Signature**

```ts
declare const make: <R, ER>(
  layer: Layer.Layer<R, ER, never>,
  options?: { readonly memoMap?: Layer.MemoMap | undefined } | undefined
) => ManagedRuntime<R, ER>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ManagedRuntime.ts#L273)

Since v2.0.0

# utils

## ManagedRuntime (namespace)

Type helpers associated with `ManagedRuntime`.

**When to use**

Use to reference type-level helpers for extracting managed runtime services
and layer errors.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ManagedRuntime.ts#L58)

Since v3.4.0

### Services (type alias)

Extracts the services available from a `ManagedRuntime`.

**When to use**

Use to derive the service requirements provided by an existing
`ManagedRuntime` type.

**Signature**

```ts
type Services<T> = [T] extends [ManagedRuntime<infer R, infer _E>] ? R : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ManagedRuntime.ts#L70)

Since v3.4.0

### Error (type alias)

Extracts the layer construction error type of a `ManagedRuntime`.

**When to use**

Use to derive the layer construction error type from an existing
`ManagedRuntime` type.

**Signature**

```ts
type Error<T> = [T] extends [ManagedRuntime<infer _R, infer E>] ? E : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ManagedRuntime.ts#L83)

Since v3.4.0
