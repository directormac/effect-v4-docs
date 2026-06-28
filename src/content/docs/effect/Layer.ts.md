---
title: Layer.ts
nav_order: 53
parent: "effect"
---

## Layer.ts overview

Builds and wires services for Effect applications.

A `Layer<ROut, E, RIn>` describes how to acquire one or more services, which
services are required to build them, and which errors can occur during
acquisition. Layers can manage scoped resources, memoize shared services,
combine with other layers, provide services to effects or streams, and attach
error handling, tracing, or lifecycle hooks.

Since v2.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [effect](#effect)
  - [effectContext](#effectcontext)
  - [effectDiscard](#effectdiscard)
  - [empty](#empty)
  - [fromBuild](#frombuild)
  - [fromBuildMemo](#frombuildmemo)
  - [succeed](#succeed)
  - [succeedContext](#succeedcontext)
  - [suspend](#suspend)
  - [sync](#sync)
  - [syncContext](#synccontext)
- [converting](#converting)
  - [launch](#launch)
  - [unwrap](#unwrap)
- [destructors](#destructors)
  - [build](#build)
  - [buildWithScope](#buildwithscope)
- [error handling](#error-handling)
  - [catch](#catch)
  - [catchCause](#catchcause)
  - [catchTag](#catchtag)
  - [orDie](#ordie)
- [getters](#getters)
  - [isLayer](#islayer)
- [layers](#layers)
  - [fresh](#fresh)
- [memo map](#memo-map)
  - [buildWithMemoMap](#buildwithmemomap)
  - [forkMemoMap](#forkmemomap)
  - [forkMemoMapUnsafe](#forkmemomapunsafe)
  - [makeMemoMap](#makememomap)
  - [makeMemoMapUnsafe](#makememomapunsafe)
- [models](#models)
  - [CurrentMemoMap (class)](#currentmemomap-class)
  - [Layer (interface)](#layer-interface)
  - [LayerUnify (interface)](#layerunify-interface)
  - [LayerUnifyIgnore (interface)](#layerunifyignore-interface)
  - [MemoMap (interface)](#memomap-interface)
  - [Variance (interface)](#variance-interface)
- [options](#options)
  - [SpanOptions (interface)](#spanoptions-interface)
- [providing services](#providing-services)
  - [provide](#provide)
  - [provideMerge](#providemerge)
  - [updateService](#updateservice)
- [sequencing](#sequencing)
  - [flatMap](#flatmap)
  - [tap](#tap)
  - [tapCause](#tapcause)
  - [tapError](#taperror)
- [testing](#testing)
  - [PartialEffectful (type alias)](#partialeffectful-type-alias)
  - [mock](#mock)
- [tracing](#tracing)
  - [parentSpan](#parentspan)
  - [span](#span)
  - [withParentSpan](#withparentspan)
  - [withSpan](#withspan)
- [utility types](#utility-types)
  - [Any (interface)](#any-interface)
  - [Error (type alias)](#error-type-alias)
  - [Services (type alias)](#services-type-alias)
  - [Success (type alias)](#success-type-alias)
  - [satisfiesErrorType](#satisfieserrortype)
  - [satisfiesServicesType](#satisfiesservicestype)
  - [satisfiesSuccessType](#satisfiessuccesstype)
- [zipping](#zipping)
  - [merge](#merge)
  - [mergeAll](#mergeall)

---

# constructors

## effect

Constructs a layer from an effect that produces a single service.

**When to use**

Use when you need to construct a `Layer`-provided service with an `Effect`,
dependencies, or scoped resource acquisition.

**Details**

This allows you to create a `Layer` from an `Effect` that produces a service.
The `Effect` is executed in the scope of the layer, allowing for proper
resource management.

**Example** (Creating a layer from an effect)

```ts
import { Context, Effect, Layer } from "effect"

class Database extends Context.Service<
  Database,
  {
    readonly query: (sql: string) => Effect.Effect<string>
  }
>()("Database") {}

const layer = Layer.effect(
  Database,
  Effect.sync(() => ({
    query: (sql: string) => Effect.succeed(`Query: ${sql}`)
  }))
)
```

**See**

- `effectContext` for effectfully providing multiple services
- `effectDiscard` for running construction work without providing services

**Signature**

```ts
declare const effect: {
  <I, S>(service: Context.Key<I, S>): <E, R>(effect: Effect<S, E, R>) => Layer<I, E, Exclude<R, Scope.Scope>>
  <I, S, E, R>(service: Context.Key<I, S>, effect: Effect<Types.NoInfer<S>, E, R>): Layer<I, E, Exclude<R, Scope.Scope>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Layer.ts#L974)

Since v2.0.0

## effectContext

Constructs a layer from an effect that produces all services in a `Context`.

**When to use**

Use when you need a `Layer` that effectfully constructs a `Context` with
multiple services.

**Details**

This allows you to create a `Layer` from an effectful computation that
returns multiple services. The `Effect` is executed in the scope of the
layer.

**Example** (Creating a layer from an effectful context)

```ts
import { Context, Effect, Layer } from "effect"

class Database extends Context.Service<Database, { readonly query: (sql: string) => Effect.Effect<string> }>()(
  "Database"
) {}

const layer = Layer.effectContext(
  Effect.succeed(
    Context.make(Database, {
      query: (sql: string) => Effect.succeed(`Query: ${sql}`)
    })
  )
)
```

**See**

- `effect` for effectfully providing a single service

**Signature**

```ts
declare const effectContext: <A, E, R>(effect: Effect<Context.Context<A>, E, R>) => Layer<A, E, Exclude<R, Scope.Scope>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Layer.ts#L1031)

Since v2.0.0

## effectDiscard

Constructs a layer from an effect, discarding its value and providing no
services.

**When to use**

Use when layer construction should run an Effect for its side effects while providing no
services.

**Example** (Running an effect during layer construction)

```ts
import { Effect, Layer } from "effect"

const initLayer = Layer.effectDiscard(
  Effect.sync(() => {
    console.log("Initializing application...")
  })
)
```

**See**

- `empty` for a no-op layer that performs no construction work

**Signature**

```ts
declare const effectDiscard: <X, E, R>(effect: Effect<X, E, R>) => Layer<never, E, Exclude<R, Scope.Scope>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Layer.ts#L1061)

Since v2.0.0

## empty

An empty layer that provides no services, cannot fail, has no requirements,
and performs no construction or finalization work.

**When to use**

Use as the no-op branch when conditionally composing layers.

**Example** (Disabling optional lifecycle work)

```ts
import { Console, Layer } from "effect"

declare const flag: boolean

const StartupLogLive = flag ? Layer.effectDiscard(Console.log("application starting")) : Layer.empty
```

**See**

- `effectDiscard` for running an effect while providing no services

**Signature**

```ts
declare const empty: Layer<never, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Layer.ts#L856)

Since v2.0.0

## fromBuild

Constructs a `Layer` from a function that uses a `MemoMap` and `Scope` to
build the layer.

**Details**

The function receives a `MemoMap` for memoization and a `Scope` for resource management.
A child scope is created, and if the build fails, the child scope is closed.

**Example** (Constructing a layer from a build function)

```ts
import { Context, Effect, Layer } from "effect"

class Database extends Context.Service<
  Database,
  {
    readonly query: (sql: string) => Effect.Effect<string>
  }
>()("Database") {}

const databaseLayer = Layer.fromBuild(() =>
  Effect.sync(() =>
    Context.make(Database, {
      query: (sql: string) => Effect.succeed("result")
    })
  )
)
```

**Signature**

```ts
declare const fromBuild: <ROut, E, RIn>(
  build: (memoMap: MemoMap, scope: Scope.Scope) => Effect<Context.Context<ROut>, E, RIn>
) => Layer<ROut, E, RIn>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Layer.ts#L327)

Since v4.0.0

## fromBuildMemo

Constructs a `Layer` from a function that uses a `MemoMap` and `Scope` to
build the layer, with automatic memoization.

**Details**

This is similar to `fromBuild` but provides automatic memoization of the layer construction.
The layer will be memoized based on the provided `MemoMap`.

**Example** (Memoizing layer construction)

```ts
import { Context, Effect, Layer } from "effect"

class Database extends Context.Service<
  Database,
  {
    readonly query: (sql: string) => Effect.Effect<string>
  }
>()("Database") {}

const databaseLayer = Layer.fromBuildMemo(() =>
  Effect.sync(() =>
    Context.make(Database, {
      query: (sql: string) => Effect.succeed("result")
    })
  )
)
```

**Signature**

```ts
declare const fromBuildMemo: <ROut, E, RIn>(
  build: (memoMap: MemoMap, scope: Scope.Scope) => Effect<Context.Context<ROut>, E, RIn>
) => Layer<ROut, E, RIn>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Layer.ts#L371)

Since v4.0.0

## succeed

Constructs a layer that provides a single service from an already available
value.

**When to use**

Use when you need a `Layer` that provides a service from an already
constructed implementation without effectful acquisition.

**Example** (Creating a layer from a service implementation)

```ts
import { Context, Effect, Layer } from "effect"

class Database extends Context.Service<
  Database,
  {
    readonly query: (sql: string) => Effect.Effect<string>
  }
>()("Database") {}

const DatabaseLive = Layer.succeed(Database, {
  query: Effect.fn("Database.query")((sql: string) => Effect.succeed(`Query result: ${sql}`))
})
```

**See**

- `sync` for constructing layers from lazy values

**Signature**

```ts
declare const succeed: {
  <I, S>(service: Context.Key<I, S>): (resource: S) => Layer<I>
  <I, S>(service: Context.Key<I, S>, resource: Types.NoInfer<S>): Layer<I>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Layer.ts#L775)

Since v2.0.0

## succeedContext

Constructs a layer that provides all services in an already available
`Context`.

**When to use**

Use when you need a `Layer` built from an existing `Context`, including when
you need to provide multiple services at once.

**Details**

This is a more general version of `succeed` that allows you to provide
multiple services at once through a `Context`.

**Example** (Providing multiple services from a context)

```ts
import { Context, Effect, Layer } from "effect"

class Database extends Context.Service<
  Database,
  {
    readonly query: (sql: string) => Effect.Effect<string>
  }
>()("Database") {}

class Logger extends Context.Service<
  Logger,
  {
    readonly log: (msg: string) => Effect.Effect<void>
  }
>()("Logger") {}

const context = Context.make(Database, {
  query: Effect.fn("Database.query")((sql: string) => Effect.succeed("result"))
}).pipe(
  Context.add(Logger, {
    log: (msg: string) => Effect.sync(() => console.log(msg))
  })
)

const layer = Layer.succeedContext(context)
```

**See**

- `succeed` for providing a single service from a value

**Signature**

```ts
declare const succeedContext: <A>(context: Context.Context<A>) => Layer<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Layer.ts#L828)

Since v2.0.0

## suspend

Constructs a layer lazily using the specified factory.

**Details**

The factory is evaluated only when the suspended layer is first built, and
the result is memoized with normal layer sharing semantics.

**Example** (Choosing a layer lazily)

```ts
import { Context, Layer } from "effect"

class Config extends Context.Service<Config, string>()("Config") {}

const useProd = true

const layer = Layer.suspend(() =>
  useProd ? Layer.succeed(Config, "https://api.example.com") : Layer.succeed(Config, "http://localhost:3000")
)
```

**Signature**

```ts
declare const suspend: <A, E, R>(evaluate: LazyArg<Layer<A, E, R>>) => Layer<A, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Layer.ts#L1091)

Since v2.0.0

## sync

Constructs a layer lazily that provides a single service.

**When to use**

Use when you need a `Layer` that provides one service whose value is created
synchronously, but creation should be deferred until the layer is built.

**Details**

This is a lazy version of `succeed` where the service value is computed
synchronously only when the layer is built.

**Example** (Lazily providing a service)

```ts
import { Context, Effect, Layer } from "effect"

class Database extends Context.Service<
  Database,
  {
    readonly query: (sql: string) => Effect.Effect<string>
  }
>()("Database") {}

const layer = Layer.sync(Database, () => ({
  query: (sql: string) => Effect.succeed(`Query: ${sql}`)
}))
```

**See**

- `succeed` for constructing layers from static values

**Signature**

```ts
declare const sync: {
  <I, S>(service: Context.Key<I, S>): (evaluate: LazyArg<S>) => Layer<I>
  <I, S>(service: Context.Key<I, S>, evaluate: LazyArg<Types.NoInfer<S>>): Layer<I>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Layer.ts#L890)

Since v2.0.0

## syncContext

Constructs a layer lazily that provides all services in a `Context`.

**When to use**

Use when you need a `Layer` that creates multiple services synchronously but
defers that work until the layer is built.

**Details**

This is a lazy version of `succeedContext` where the `Context` is computed
synchronously only when the layer is built.

**Example** (Lazily providing a context)

```ts
import { Context, Effect, Layer } from "effect"

class Database extends Context.Service<
  Database,
  {
    readonly query: (sql: string) => Effect.Effect<string>
  }
>()("Database") {}

const layer = Layer.syncContext(() =>
  Context.make(Database, {
    query: (sql: string) => Effect.succeed(`Query: ${sql}`)
  })
)
```

**See**

- `sync` for lazily providing a single service
- `succeedContext` for providing an already available context

**Signature**

```ts
declare const syncContext: <A>(evaluate: LazyArg<Context.Context<A>>) => Layer<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Layer.ts#L935)

Since v2.0.0

# converting

## launch

Builds this layer and keeps it alive until the returned effect is interrupted.

**When to use**

Use when you model your entire application as a layer, such as an HTTP
server.

**Details**

When the returned effect is interrupted, the layer scope is closed and all
finalizers registered during layer acquisition are run.

**Example** (Launching an application layer)

```ts
import { Console, Context, Effect, Layer } from "effect"

class HttpServer extends Context.Service<
  HttpServer,
  {
    readonly start: () => Effect.Effect<string>
    readonly stop: () => Effect.Effect<string>
  }
>()("HttpServer") {}

class Logger extends Context.Service<
  Logger,
  {
    readonly log: (msg: string) => Effect.Effect<void>
  }
>()("Logger") {}

// Server layer that starts an HTTP server
const serverLayer = Layer.effect(
  HttpServer,
  Effect.gen(function* () {
    yield* Console.log("Starting HTTP server...")

    return {
      start: Effect.fn("HttpServer.start")(function* () {
        yield* Console.log("Server listening on port 3000")
        return "Server started"
      }),
      stop: Effect.fn("HttpServer.stop")(function* () {
        yield* Console.log("Server stopped gracefully")
        return "Server stopped"
      })
    }
  })
)

const loggerLayer = Layer.succeed(Logger, {
  log: Effect.fn("Logger.log")((msg: string) => Console.log(`[LOG] ${msg}`))
})

// Application layer combining all services
const appLayer = Layer.mergeAll(serverLayer, loggerLayer)

// Launch the application - runs until interrupted
const application = appLayer.pipe(
  Layer.launch,
  Effect.tapError((error) => Console.log(`Application failed: ${error}`)),
  Effect.tap(() => Console.log("Application completed"))
)

// This will run forever until externally interrupted
// Effect.runFork(application)
```

**Signature**

```ts
declare const launch: <RIn, E, ROut>(self: Layer<ROut, E, RIn>) => Effect<never, E, RIn>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Layer.ts#L2167)

Since v2.0.0

## unwrap

Unwraps a `Layer` from an `Effect`, flattening the nested structure.

**When to use**

Use when you have an `Effect` that produces a `Layer` and you want to
use that layer directly.

**Details**

The resulting Layer will have the combined error and dependency types from
both the outer Effect and the inner Layer.

**Example** (Unwrapping an effectful layer)

```ts
import { Context, Effect, Layer } from "effect"

class Database extends Context.Service<
  Database,
  {
    readonly query: (sql: string) => Effect.Effect<string>
  }
>()("Database") {}

const layerEffect = Effect.succeed(
  Layer.succeed(Database, { query: Effect.fn("Database.query")((sql: string) => Effect.succeed("result")) })
)

const unwrappedLayer = Layer.unwrap(layerEffect)
```

**Signature**

```ts
declare const unwrap: <A, E1, R1, E, R>(
  self: Effect<Layer<A, E1, R1>, E, R>
) => Layer<A, E | E1, R1 | Exclude<R, Scope.Scope>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Layer.ts#L1126)

Since v4.0.0

# destructors

## build

Builds a layer into a scoped value.

**Example** (Building a layer into a context)

```ts
import { Context, Effect, Layer } from "effect"

class Database extends Context.Service<
  Database,
  {
    readonly query: (sql: string) => Effect.Effect<string>
  }
>()("Database") {}

// Build a layer to get its services
const program = Effect.gen(function* () {
  const dbLayer = Layer.succeed(Database, {
    query: Effect.fn("Database.query")((sql: string) => Effect.succeed("result"))
  })

  // Build the layer into Context - automatically manages scope and memoization
  const context = yield* Layer.build(dbLayer)

  // Extract the specific service from the built layer
  const database = Context.get(context, Database)

  return yield* database.query("SELECT * FROM users")
})
```

**Signature**

```ts
declare const build: <RIn, E, ROut>(self: Layer<ROut, E, RIn>) => Effect<Context.Context<ROut>, E, RIn | Scope.Scope>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Layer.ts#L674)

Since v2.0.0

## buildWithScope

Builds a layer using an explicit scope.

**When to use**

Use to control the lifetime of layer resources with a scope supplied by the
caller.

**Details**

Resources created by the layer are released when the supplied scope is
closed, unless a resource extends its own scope.

**Example** (Building a layer with an explicit scope)

```ts
import { Context, Effect, Layer, Scope } from "effect"

class Database extends Context.Service<
  Database,
  {
    readonly query: (sql: string) => Effect.Effect<string>
  }
>()("Database") {}

// Build a layer with explicit scope control
const program = Effect.gen(function* () {
  const scope = yield* Effect.scope

  const dbLayer = Layer.effect(
    Database,
    Effect.gen(function* () {
      console.log("Initializing database...")
      yield* Scope.addFinalizer(
        scope,
        Effect.sync(() => console.log("Database closed"))
      )
      return { query: Effect.fn("Database.query")((sql: string) => Effect.succeed(`Result: ${sql}`)) }
    })
  )

  // Build with specific scope - resources tied to this scope
  const context = yield* Layer.buildWithScope(dbLayer, scope)
  const database = Context.get(context, Database)

  return yield* database.query("SELECT * FROM users")
  // Database will be closed when scope is closed
})
```

**Signature**

```ts
declare const buildWithScope: {
  (scope: Scope.Scope): <RIn, E, ROut>(self: Layer<ROut, E, RIn>) => Effect<Context.Context<ROut>, E, RIn>
  <RIn, E, ROut>(self: Layer<ROut, E, RIn>, scope: Scope.Scope): Effect<Context.Context<ROut>, E, RIn>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Layer.ts#L732)

Since v2.0.0

# error handling

## catch

Recovers from all typed errors by switching to another layer.

**When to use**

Use when every typed `Layer` construction error should use the same
recovery path.

**See**

- `catchTag` for recovering from specific tagged errors
- `catchCause` for recovering with access to the full cause

**Signature**

```ts
declare const catch: { <E, RIn2, E2, ROut2>(onError: (error: E) => Layer<ROut2, E2, RIn2>): <RIn, ROut>(self: Layer<ROut, E, RIn>) => Layer<ROut & ROut2, E2, RIn2 | RIn>; <RIn, E, ROut, RIn2, E2, ROut2>(self: Layer<ROut, E, RIn>, onError: (error: E) => Layer<ROut2, E2, RIn2>): Layer<ROut & ROut2, E2, RIn | RIn2>; }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Layer.ts#L1819)

Since v4.0.0

## catchCause

Recovers from any failure cause by switching to another layer.

**When to use**

Use when you need `Layer` recovery to inspect more than the typed error,
such as defects or interruption information.

**Details**

The handler receives the full `Cause` of the failed layer, including typed
errors, unexpected defects, and interruption information, and returns the
fallback layer to build instead. Finalizers for resources acquired by the
failed layer are still run before the fallback layer is acquired.

**Example** (Recovering from layer failures by cause)

```ts
import { Context, Data, Effect, Layer } from "effect"

class DatabaseError extends Data.TaggedError("DatabaseError")<{
  message: string
}> {}

class Database extends Context.Service<
  Database,
  {
    readonly query: (sql: string) => Effect.Effect<string>
  }
>()("Database") {}

const primaryDatabaseLayer = Layer.effect(
  Database,
  Effect.fail(new DatabaseError({ message: "Primary DB unreachable" }))
)

const databaseWithFallback = primaryDatabaseLayer.pipe(
  Layer.catchCause(() => {
    return Layer.succeed(Database, {
      query: Effect.fn("Database.query")((sql: string) => Effect.succeed(`Memory: ${sql}`))
    })
  })
)

const program = Effect.gen(function* () {
  const database = yield* Database
  const result = yield* database.query("SELECT * FROM users")
  console.log(result)
}).pipe(Effect.provide(databaseWithFallback))

Effect.runPromise(program)
// Memory: SELECT * FROM users
```

**See**

- `catchTag` for recovering from specific tagged errors

**Signature**

```ts
declare const catchCause: {
  <E, RIn2, E2, ROut2>(
    onError: (cause: Cause.Cause<E>) => Layer<ROut2, E2, RIn2>
  ): <RIn, ROut>(self: Layer<ROut, E, RIn>) => Layer<ROut & ROut2, E2, RIn2 | RIn>
  <RIn, E, ROut, RIn2, E2, ROut22>(
    self: Layer<ROut, E, RIn>,
    onError: (cause: Cause.Cause<E>) => Layer<ROut22, E2, RIn2>
  ): Layer<ROut & ROut22, E2, RIn | RIn2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Layer.ts#L1962)

Since v4.0.0

## catchTag

Recovers from specific tagged errors.

**When to use**

Use when only some tagged `Layer` construction errors should be recovered.

**Example** (Recovering from tagged layer errors)

```ts
import { Context, Data, Effect, Layer } from "effect"

class ConfigError extends Data.TaggedError("ConfigError") {}

class Config extends Context.Service<
  Config,
  {
    readonly apiUrl: string
  }
>()("Config") {}

const configLayer = Layer.effect(Config, Effect.fail(new ConfigError()))

const fallbackLayer = Layer.succeed(Config, { apiUrl: "http://localhost" })

const recovered = configLayer.pipe(Layer.catchTag("ConfigError", () => fallbackLayer))
```

**See**

- `catchCause` for recovering with access to the full cause

**Signature**

```ts
declare const catchTag: {
  <const K extends Types.Tags<E> | NonEmptyReadonlyArray<Types.Tags<E>>, E, RIn2, E2, ROut2>(
    k: K,
    f: (
      e: Types.ExtractTag<Types.NoInfer<E>, K extends NonEmptyReadonlyArray<string> ? K[number] : K>
    ) => Layer<ROut2, E2, RIn2>
  ): <RIn, ROut>(
    self: Layer<ROut, E, RIn>
  ) => Layer<
    ROut & ROut2,
    E2 | Types.ExcludeTag<E, K extends NonEmptyReadonlyArray<string> ? K[number] : K>,
    RIn2 | RIn
  >
  <RIn, E, ROut, const K extends Types.Tags<E> | NonEmptyReadonlyArray<Types.Tags<E>>, RIn2, E2, ROut2>(
    self: Layer<ROut, E, RIn>,
    k: K,
    f: (e: Types.ExtractTag<E, K extends NonEmptyReadonlyArray<string> ? K[number] : K>) => Layer<ROut2, E2, RIn2>
  ): Layer<ROut & ROut2, E2 | Types.ExcludeTag<E, K extends NonEmptyReadonlyArray<string> ? K[number] : K>, RIn | RIn2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Layer.ts#L1854)

Since v4.0.0

## orDie

Converts layer construction failures into defects, removing them from the
layer's error type.

**Details**

Use this only when failures should be treated as unrecoverable defects rather
than typed errors that callers can handle.

**Example** (Converting layer failures to defects)

```ts
import { Context, Data, Effect, Layer } from "effect"

class DatabaseError extends Data.TaggedError("DatabaseError")<{
  message: string
}> {}

class Database extends Context.Service<
  Database,
  {
    readonly query: (sql: string) => Effect.Effect<string>
  }
>()("Database") {}

// Layer that can fail during construction
const flakyDatabaseLayer = Layer.effect(
  Database,
  Effect.gen(function* () {
    console.log("connecting")
    return yield* new DatabaseError({ message: "Connection failed" })
  })
)

// Convert failures to fiber death - removes error from type
const reliableDatabaseLayer = flakyDatabaseLayer.pipe(Layer.orDie)

// Now the layer type is Layer<Database, never, never> - no error in type
const program = Effect.gen(function* () {
  const database = yield* Database
  return yield* database.query("SELECT * FROM users")
}).pipe(Effect.provide(reliableDatabaseLayer))

// Running the program prints "connecting", then the DatabaseError is
// converted into a fiber defect instead of remaining a typed error.
```

**Signature**

```ts
declare const orDie: <A, E, R>(self: Layer<A, E, R>) => Layer<A, never, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Layer.ts#L1782)

Since v2.0.0

# getters

## isLayer

Returns `true` if the specified value is a `Layer`, `false` otherwise.

**Example** (Checking whether a value is a layer)

```ts
import { Context, Effect, Layer } from "effect"

class Database extends Context.Service<
  Database,
  {
    readonly query: (sql: string) => Effect.Effect<string>
  }
>()("Database") {}

const dbLayer = Layer.succeed(Database, {
  query: Effect.fn("Database.query")((sql: string) => Effect.succeed("result"))
})
const notALayer = { someProperty: "value" }

console.log(Layer.isLayer(dbLayer)) // true
console.log(Layer.isLayer(notALayer)) // false
```

**Signature**

```ts
declare const isLayer: (u: unknown) => u is Layer<unknown, unknown, unknown>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Layer.ts#L273)

Since v2.0.0

# layers

## fresh

Creates a fresh version of this layer that will not be shared.

**When to use**

Use when you need two parts of an application to receive separate instances
of a resource, such as two independent client sessions.

**Gotchas**

Do not use it just to work around confusing composition. By default, sharing
the same layer value is usually the desired behavior.

**Example** (Creating non-shared layer instances)

```ts
import { Context, Effect, Layer, Ref } from "effect"

class Counter extends Context.Service<
  Counter,
  {
    readonly id: number
  }
>()("Counter") {}

class Left extends Context.Service<
  Left,
  {
    readonly counterId: number
  }
>()("Left") {}

class Right extends Context.Service<
  Right,
  {
    readonly counterId: number
  }
>()("Right") {}

const leftLayer = Layer.effect(
  Left,
  Effect.gen(function* () {
    const counter = yield* Counter
    return { counterId: counter.id }
  })
)

const rightLayer = Layer.effect(
  Right,
  Effect.gen(function* () {
    const counter = yield* Counter
    return { counterId: counter.id }
  })
)

const showIds = Effect.gen(function* () {
  const left = yield* Left
  const right = yield* Right
  console.log(`same Counter: ${left.counterId === right.counterId}`)
})

const program = Effect.gen(function* () {
  const nextId = yield* Ref.make(0)

  const counterLayer = Layer.effect(
    Counter,
    Effect.gen(function* () {
      const id = yield* Ref.updateAndGet(nextId, (n) => n + 1)
      console.log("constructed Counter")
      return { id }
    })
  )

  const shared = Layer.merge(Layer.provide(leftLayer, counterLayer), Layer.provide(rightLayer, counterLayer))

  yield* Effect.provide(showIds, shared)

  const freshCounterLayer = Layer.fresh(counterLayer)
  const fresh = Layer.merge(Layer.provide(leftLayer, freshCounterLayer), Layer.provide(rightLayer, freshCounterLayer))

  yield* Effect.provide(showIds, fresh)
})

Effect.runPromise(program)
// constructed Counter
// same Counter: true
// constructed Counter
// constructed Counter
// same Counter: false
```

**Signature**

```ts
declare const fresh: <A, E, R>(self: Layer<A, E, R>) => Layer<A, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Layer.ts#L2100)

Since v2.0.0

# memo map

## buildWithMemoMap

Builds a layer into an `Effect` value, using the specified `MemoMap` to memoize
the layer construction.

**Example** (Building layers with an explicit memo map)

```ts
import { Context, Effect, Layer } from "effect"

class Database extends Context.Service<
  Database,
  {
    readonly query: (sql: string) => Effect.Effect<string>
  }
>()("Database") {}

class Logger extends Context.Service<
  Logger,
  {
    readonly log: (msg: string) => Effect.Effect<void>
  }
>()("Logger") {}

// Build layers with explicit memoization control
const program = Effect.gen(function* () {
  const memoMap = yield* Layer.makeMemoMap
  const scope = yield* Effect.scope

  // Build database layer with memoization
  const dbLayer = Layer.succeed(Database, {
    query: Effect.fn("Database.query")((sql: string) => Effect.succeed("result"))
  })
  const dbContext = yield* Layer.buildWithMemoMap(dbLayer, memoMap, scope)

  // Build logger layer with same memoization (reuses memo if same layer)
  const loggerLayer = Layer.succeed(Logger, {
    log: Effect.fn("Logger.log")((msg: string) => Effect.sync(() => console.log(msg)))
  })
  const loggerContext = yield* Layer.buildWithMemoMap(loggerLayer, memoMap, scope)

  return {
    database: Context.get(dbContext, Database),
    logger: Context.get(loggerContext, Logger)
  }
})
```

**Signature**

```ts
declare const buildWithMemoMap: {
  (
    memoMap: MemoMap,
    scope: Scope.Scope
  ): <RIn, E, ROut>(self: Layer<ROut, E, RIn>) => Effect<Context.Context<ROut>, E, RIn>
  <RIn, E, ROut>(self: Layer<ROut, E, RIn>, memoMap: MemoMap, scope: Scope.Scope): Effect<Context.Context<ROut>, E, RIn>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Layer.ts#L622)

Since v2.0.0

## forkMemoMap

Constructs a child `MemoMap` effectfully, allowing it to reuse layers already
memoized in the parent while isolating any new layer allocations to the child
map.

**When to use**

Use when a layer build should inherit already memoized layers from an
existing `MemoMap` while keeping newly memoized layers out of the parent map.

**See**

- `makeMemoMap` for creating a root memo map in an `Effect`
- `forkMemoMapUnsafe` for the synchronous constructor variant
- `buildWithMemoMap` for building layers with an explicit memo map

**Signature**

```ts
declare const forkMemoMap: (parent: MemoMap) => Effect<MemoMap>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Layer.ts#L547)

Since v4.0.0

## forkMemoMapUnsafe

Constructs a child `MemoMap` synchronously, allowing it to reuse layers
already memoized in the parent while isolating any new layer allocations to
the child map.

**When to use**

Use to synchronously fork a memo map for manual layer building when child
builds should see parent memoized layers without writing newly built layers
back to the parent.

**See**

- `forkMemoMap` for allocating the child memo map inside `Effect`
- `makeMemoMapUnsafe` for creating a root memo map without a parent

**Signature**

```ts
declare const forkMemoMapUnsafe: (parent: MemoMap) => MemoMap
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Layer.ts#L497)

Since v4.0.0

## makeMemoMap

Constructs a `MemoMap` effectfully so it can be used to build additional layers.

**Example** (Creating a memo map in an effect)

```ts
import { Context, Effect, Layer } from "effect"

class Database extends Context.Service<
  Database,
  {
    readonly query: (sql: string) => Effect.Effect<string>
  }
>()("Database") {}

// Create a memo map safely within an Effect
const program = Effect.gen(function* () {
  const memoMap = yield* Layer.makeMemoMap
  const scope = yield* Effect.scope

  const dbLayer = Layer.succeed(Database, {
    query: Effect.fn("Database.query")((sql: string) => Effect.succeed("result"))
  })
  const context = yield* Layer.buildWithMemoMap(dbLayer, memoMap, scope)

  return Context.get(context, Database)
})
```

**Signature**

```ts
declare const makeMemoMap: Effect<MemoMap, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Layer.ts#L528)

Since v2.0.0

## makeMemoMapUnsafe

Constructs a `MemoMap` synchronously so it can be used to build additional layers.

**Example** (Creating a memo map unsafely)

```ts
import { Context, Effect, Layer } from "effect"

class Database extends Context.Service<
  Database,
  {
    readonly query: (sql: string) => Effect.Effect<string>
  }
>()("Database") {}

// Create a memo map for manual layer building
const program = Effect.gen(function* () {
  const memoMap = Layer.makeMemoMapUnsafe()
  const scope = yield* Effect.scope

  const dbLayer = Layer.succeed(Database, {
    query: Effect.fn("Database.query")((sql: string) => Effect.succeed("result"))
  })
  const context = yield* Layer.buildWithMemoMap(dbLayer, memoMap, scope)

  return Context.get(context, Database)
})
```

**Signature**

```ts
declare const makeMemoMapUnsafe: () => MemoMap
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Layer.ts#L478)

Since v4.0.0

# models

## CurrentMemoMap (class)

Context service for the current `MemoMap` used in layer construction.

**When to use**

Use when building custom layer operations that need to access the current
memoization map from the fiber context.

**Details**

This service wraps a `MemoMap` as a `Context.Service`, making it available
for dependency injection during layer construction.

**See**

- `MemoMap` the memoization map type wrapped by this service

**Signature**

```ts
declare class CurrentMemoMap
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Layer.ts#L567)

Since v3.13.0

## Layer (interface)

A `Layer` describes how to build one or more services for dependency injection.

**When to use**

Use to model construction of application services for dependency injection,
especially when services have dependencies, can fail during construction, or
need scoped setup and release.

**Details**

A `Layer<ROut, E, RIn>` represents `ROut` as the services this layer
provides, `E` as the possible errors during layer construction, and `RIn` as
the services this layer requires as dependencies.

**Signature**

```ts
export interface Layer<in ROut, out E = never, out RIn = never> extends Variance<ROut, E, RIn>, Pipeable {
  /** @internal */
  build(memoMap: MemoMap, scope: Scope.Scope): Effect<Context.Context<ROut>, E, RIn>
  [Unify.typeSymbol]?: unknown
  [Unify.unifySymbol]?: LayerUnify<this>
  [Unify.ignoreSymbol]?: LayerUnifyIgnore
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Layer.ts#L54)

Since v2.0.0

## LayerUnify (interface)

Type-level hook that allows `Layer` values to participate in `Unify`
inference.

**Details**

This is used by Effect's pipe and unification machinery to preserve the
provided services, error, and requirements of a `Layer`.

**Signature**

```ts
export interface LayerUnify<A extends { [Unify.typeSymbol]?: any }> {
  Layer?: () => A[Unify.typeSymbol] extends Layer<any, any, any> | infer _
    ? Layer<
        Success<Extract<A[Unify.typeSymbol], Any>>,
        Error<Extract<A[Unify.typeSymbol], Any>>,
        Services<Extract<A[Unify.typeSymbol], Any>>
      >
    : never
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Layer.ts#L74)

Since v4.0.0

## LayerUnifyIgnore (interface)

Type-level marker used by `Unify` for `Layer` types that should be ignored
during unification.

**Signature**

```ts
export interface LayerUnifyIgnore {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Layer.ts#L90)

Since v4.0.0

## MemoMap (interface)

A `MemoMap` is used to memoize layer construction and ensure sharing of
layers.

**Details**

The `MemoMap` prevents duplicate construction of the same layer instance,
enabling efficient resource sharing across layer dependencies.

**Example** (Sharing layer construction with a memo map)

```ts
import { Context, Effect, Layer } from "effect"

class Database extends Context.Service<
  Database,
  {
    readonly query: (sql: string) => Effect.Effect<string>
  }
>()("Database") {}

// Create a custom MemoMap for manual layer building
const program = Effect.gen(function* () {
  const memoMap = yield* Layer.makeMemoMap
  const scope = yield* Effect.scope

  const dbLayer = Layer.succeed(Database, {
    query: Effect.fn("Database.query")((sql: string) => Effect.succeed("result"))
  })
  const context = yield* Layer.buildWithMemoMap(dbLayer, memoMap, scope)

  return Context.get(context, Database)
})
```

**Signature**

```ts
export interface MemoMap {
  readonly [MemoMapTypeId]: typeof MemoMapTypeId
  readonly get: <RIn, E, ROut>(
    layer: Layer<ROut, E, RIn>,
    scope: Scope.Scope
  ) => Effect<Context.Context<ROut>, E, RIn> | undefined
  readonly getOrElseMemoize: <RIn, E, ROut>(
    layer: Layer<ROut, E, RIn>,
    scope: Scope.Scope,
    build: (memoMap: MemoMap, scope: Scope.Scope) => Effect<Context.Context<ROut>, E, RIn>
  ) => Effect<Context.Context<ROut>, E, RIn>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Layer.ts#L219)

Since v2.0.0

## Variance (interface)

The variance interface for Layer type parameters.

**Signature**

```ts
export interface Variance<in ROut, out E, out RIn> {
  readonly [TypeId]: {
    readonly _ROut: Types.Contravariant<ROut>
    readonly _E: Types.Covariant<E>
    readonly _RIn: Types.Covariant<RIn>
  }
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Layer.ts#L98)

Since v2.0.0

# options

## SpanOptions (interface)

Represents options that can be used to control the behavior of spans created
for layers.

**When to use**

Use to configure tracing metadata, stack trace capture, and `onEnd`
finalization for spans created by `Layer.span` and `Layer.withSpan` during
layer construction.

**Details**

Extends `Tracer.SpanOptions` with `onEnd`, which runs when the layer span
ends as the layer scope closes.

**See**

- `span` for creating a layer span
- `withSpan` for wrapping layer construction in a span

**Signature**

```ts
export interface SpanOptions extends Tracer.SpanOptions {
  /**
   * Runs when the span associated with the layer ends, which happens when the
   * layer scope is closed.
   */
  readonly onEnd?: ((span: Tracer.Span, exit: Exit.Exit<unknown, unknown>) => Effect<void>) | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Layer.ts#L2447)

Since v4.0.0

# providing services

## provide

Feeds the output services of the dependency layer into the requirements of
this layer, returning a layer that only provides the services from this layer.

**When to use**

Use when you need to hide an implementation dependency layer from callers.

**Details**

In `serviceLayer.pipe(Layer.provide(dependencyLayer))`, the dependency layer is
built first and is used to satisfy the requirements of `serviceLayer`.

**Example** (Providing layer dependencies)

```ts
import { Context, Effect, Layer } from "effect"

class Database extends Context.Service<
  Database,
  {
    readonly query: (sql: string) => Effect.Effect<string>
  }
>()("Database") {}

class UserService extends Context.Service<
  UserService,
  {
    readonly getUser: (id: string) => Effect.Effect<{
      id: string
      name: string
    }>
  }
>()("UserService") {}

class Logger extends Context.Service<
  Logger,
  {
    readonly log: (msg: string) => Effect.Effect<void>
  }
>()("Logger") {}

// Create dependency layers
const databaseLayer = Layer.succeed(Database, {
  query: Effect.fn("Database.query")((sql: string) => Effect.succeed(`DB: ${sql}`))
})

const loggerLayer = Layer.succeed(Logger, {
  log: Effect.fn("Logger.log")((msg: string) => Effect.sync(() => console.log(`[LOG] ${msg}`)))
})

// UserService depends on Database and Logger
const userServiceLayer = Layer.effect(
  UserService,
  Effect.gen(function* () {
    const database = yield* Database
    const logger = yield* Logger

    return {
      getUser: Effect.fn("UserService.getUser")(function* (id: string) {
        yield* logger.log(`Looking up user ${id}`)
        const result = yield* database.query(`SELECT * FROM users WHERE id = ${id}`)
        return { id, name: result }
      })
    }
  })
)

// Provide dependencies to UserService layer
const userServiceWithDependencies = userServiceLayer.pipe(Layer.provide(Layer.mergeAll(databaseLayer, loggerLayer)))

// Now UserService layer has no dependencies
const program = Effect.gen(function* () {
  const userService = yield* UserService
  return yield* userService.getUser("123")
}).pipe(Effect.provide(userServiceWithDependencies))
```

**See**

- `provideMerge` for retaining the dependency services

**Signature**

```ts
declare const provide: {
  <RIn, E, ROut>(
    that: Layer<ROut, E, RIn>
  ): <RIn2, E2, ROut2>(self: Layer<ROut2, E2, RIn2>) => Layer<ROut2, E | E2, RIn | Exclude<RIn2, ROut>>
  <const Layers extends [Any, ...Array<Any>]>(
    that: Layers
  ): <A, E, R>(
    self: Layer<A, E, R>
  ) => Layer<A, E | Error<Layers[number]>, Services<Layers[number]> | Exclude<R, Success<Layers[number]>>>
  <RIn2, E2, ROut2, RIn, E, ROut>(
    self: Layer<ROut2, E2, RIn2>,
    that: Layer<ROut, E, RIn>
  ): Layer<ROut2, E | E2, RIn | Exclude<RIn2, ROut>>
  <A, E, R, const Layers extends [Any, ...Array<Any>]>(
    self: Layer<A, E, R>,
    that: Layers
  ): Layer<A, E | Error<Layers[number]>, Services<Layers[number]> | Exclude<R, Success<Layers[number]>>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Layer.ts#L1375)

Since v2.0.0

## provideMerge

Feeds the output services of the dependency layer into the requirements of
this layer, returning a layer that provides both sets of services.

**When to use**

Use when you need to compose `Layer`s while keeping both the constructed
service and the dependency used to build it available.

**Details**

Prefer `provide` when the dependency should stay private.

**Example** (Providing dependencies while retaining services)

```ts
import { Context, Effect, Layer } from "effect"

class Database extends Context.Service<
  Database,
  {
    readonly query: (sql: string) => Effect.Effect<string>
  }
>()("Database") {}

class Logger extends Context.Service<
  Logger,
  {
    readonly log: (msg: string) => Effect.Effect<void>
  }
>()("Logger") {}

class UserService extends Context.Service<
  UserService,
  {
    readonly getUser: (id: string) => Effect.Effect<{
      id: string
      name: string
    }>
  }
>()("UserService") {}

// Create dependency layers
const databaseLayer = Layer.succeed(Database, {
  query: Effect.fn("Database.query")((sql: string) => Effect.succeed(`DB: ${sql}`))
})

const loggerLayer = Layer.succeed(Logger, {
  log: Effect.fn("Logger.log")((msg: string) => Effect.sync(() => console.log(`[LOG] ${msg}`)))
})

// UserService depends on Database and Logger
const userServiceLayer = Layer.effect(
  UserService,
  Effect.gen(function* () {
    const database = yield* Database
    const logger = yield* Logger

    return {
      getUser: Effect.fn("UserService.getUser")(function* (id: string) {
        yield* logger.log(`Looking up user ${id}`)
        const result = yield* database.query(`SELECT * FROM users WHERE id = ${id}`)
        return { id, name: result }
      })
    }
  })
)

// Provide dependencies and merge all services together
const allServicesLayer = userServiceLayer.pipe(Layer.provideMerge(Layer.mergeAll(databaseLayer, loggerLayer)))

// Now the resulting layer provides UserService, Database, AND Logger
const program = Effect.gen(function* () {
  const userService = yield* UserService
  const logger = yield* Logger // Still available!
  const database = yield* Database // Still available!

  const user = yield* userService.getUser("123")
  yield* logger.log(`Found user: ${user.name}`)

  return user
}).pipe(Effect.provide(allServicesLayer))
```

**See**

- `provide` for keeping dependency services private

**Signature**

```ts
declare const provideMerge: {
  <RIn, E, ROut>(
    that: Layer<ROut, E, RIn>
  ): <RIn2, E2, ROut2>(self: Layer<ROut2, E2, RIn2>) => Layer<ROut | ROut2, E | E2, RIn | Exclude<RIn2, ROut>>
  <const Layers extends [Any, ...Array<Any>]>(
    that: Layers
  ): <A, E, R>(
    self: Layer<A, E, R>
  ) => Layer<
    A | Success<Layers[number]>,
    E | Error<Layers[number]>,
    Services<Layers[number]> | Exclude<R, Success<Layers[number]>>
  >
  <RIn2, E2, ROut2, RIn, E, ROut>(
    self: Layer<ROut2, E2, RIn2>,
    that: Layer<ROut, E, RIn>
  ): Layer<ROut | ROut2, E | E2, RIn | Exclude<RIn2, ROut>>
  <A, E, R, const Layers extends [Any, ...Array<Any>]>(
    self: Layer<A, E, R>,
    that: Layers
  ): Layer<
    A | Success<Layers[number]>,
    E | Error<Layers[number]>,
    Services<Layers[number]> | Exclude<R, Success<Layers[number]>>
  >
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Layer.ts#L1490)

Since v2.0.0

## updateService

Updates a service in the context with a new implementation.

**When to use**

Use to adapt or extend a service's behavior during the creation of a
layer.

**Details**

This function modifies the existing implementation of a service in the
context. It retrieves the current service, applies the provided
transformation function `f`, and replaces the old service with the
transformed one.

**Signature**

```ts
declare const updateService: {
  <I, A>(
    service: Context.Key<I, A>,
    f: (a: Types.NoInfer<A>) => A
  ): <A1, E1, R1>(layer: Layer<A1, E1, R1>) => Layer<A1, E1, I | R1>
  <A1, E1, R1, I, A>(
    layer: Layer<A1, E1, R1>,
    service: Context.Key<I, A>,
    f: (a: Types.NoInfer<A>) => A
  ): Layer<A1, E1, I | R1>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Layer.ts#L1999)

Since v3.13.0

# sequencing

## flatMap

Constructs a layer dynamically based on the output of this layer.

**Example** (Creating services from layer output)

```ts
import { Context, Effect, Layer } from "effect"

class Config extends Context.Service<
  Config,
  {
    readonly dbUrl: string
    readonly logLevel: string
  }
>()("Config") {}

class Database extends Context.Service<
  Database,
  {
    readonly query: (sql: string) => Effect.Effect<string>
  }
>()("Database") {}

class Logger extends Context.Service<
  Logger,
  {
    readonly log: (msg: string) => Effect.Effect<void>
  }
>()("Logger") {}

// Base config layer
const configLayer = Layer.succeed(Config, {
  dbUrl: "postgres://localhost:5432/mydb",
  logLevel: "debug"
})

// Dynamically create services based on config
const dynamicServiceLayer = configLayer.pipe(
  Layer.flatMap((context) => {
    const config = Context.get(context, Config)

    // Create database layer based on config
    const dbLayer = Layer.succeed(Database, {
      query: Effect.fn("Database.query")((sql: string) => Effect.succeed(`Querying ${config.dbUrl}: ${sql}`))
    })

    // Create logger layer based on config
    const loggerLayer = Layer.succeed(Logger, {
      log: Effect.fn("Logger.log")((msg: string) =>
        config.logLevel === "debug"
          ? Effect.sync(() => console.log(`[DEBUG] ${msg}`))
          : Effect.sync(() => console.log(msg))
      )
    })

    // Return combined layer
    return Layer.mergeAll(dbLayer, loggerLayer)
  })
)

// Use the dynamic services
const program = Effect.gen(function* () {
  const database = yield* Database
  const logger = yield* Logger

  yield* logger.log("Starting database query")
  const result = yield* database.query("SELECT * FROM users")

  return result
}).pipe(Effect.provide(dynamicServiceLayer))
```

**Signature**

```ts
declare const flatMap: {
  <A, A2, E2, R2>(
    f: (context: Context.Context<A>) => Layer<A2, E2, R2>
  ): <E, R>(self: Layer<A, E, R>) => Layer<A2, E2 | E, R2 | R>
  <A, E, R, A2, E2, R2>(
    self: Layer<A, E, R>,
    f: (context: Context.Context<A>) => Layer<A2, E2, R2>
  ): Layer<A2, E | E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Layer.ts#L1598)

Since v2.0.0

## tap

Performs the specified effect if this layer succeeds.

**When to use**

Use to run an effectful observation after a layer has been built
successfully, such as logging or metrics, without changing the services the
layer provides.

**Details**

The callback receives the services produced by this layer. Its result is
discarded, and the original layer output is preserved.

**See**

- `tapError` for running an effect when layer construction fails with a typed error
- `tapCause` for running an effect when layer construction fails with any cause

**Signature**

```ts
declare const tap: {
  <ROut, XR extends ROut, RIn2, E2, X>(
    f: (context: Context.Context<XR>) => Effect<X, E2, RIn2>
  ): <RIn, E>(self: Layer<ROut, E, RIn>) => Layer<ROut, E | E2, RIn | Exclude<RIn2, Scope.Scope>>
  <RIn, E, ROut, XR extends ROut, RIn2, E2, X>(
    self: Layer<ROut, E, RIn>,
    f: (context: Context.Context<XR>) => Effect<X, E2, RIn2>
  ): Layer<ROut, E | E2, RIn | Exclude<RIn2, Scope.Scope>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Layer.ts#L1637)

Since v2.0.0

## tapCause

Performs the specified effect when this layer fails with any cause.

**When to use**

Use to run diagnostics or reporting when layer construction fails and the
full `Cause` is needed.

**Details**

The callback receives the layer's `Cause`, so it can inspect typed errors,
defects, and interruption information. If the callback succeeds, the layer
fails again with the original cause; if the callback fails, that failure is
added to the layer's error type.

**See**

- `tapError` for observing only typed layer construction errors
- `catchCause` for recovering from a layer construction failure by switching to another layer

**Signature**

```ts
declare const tapCause: {
  <E, XE extends E, RIn2, E2, X>(
    f: (cause: Cause.Cause<XE>) => Effect<X, E2, RIn2>
  ): <RIn, ROut>(self: Layer<ROut, E, RIn>) => Layer<ROut, E | E2, RIn | Exclude<RIn2, Scope.Scope>>
  <RIn, E, XE extends E, ROut, RIn2, E2, X>(
    self: Layer<ROut, E, RIn>,
    f: (cause: Cause.Cause<XE>) => Effect<X, E2, RIn2>
  ): Layer<ROut, E | E2, RIn | Exclude<RIn2, Scope.Scope>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Layer.ts#L1716)

Since v4.0.0

## tapError

Performs the specified effect if this layer fails.

**When to use**

Use to run logging, metrics, or other effects when layer construction fails
while preserving the original typed error.

**Details**

The callback receives the typed error. If the callback succeeds, the layer
still fails with the original error; if the callback fails, that failure is
added to the layer's error type.

**See**

- `tap` for running an effect when layer construction succeeds
- `tapCause` for inspecting the full failure cause, including defects and interruption

**Signature**

```ts
declare const tapError: {
  <E, XE extends E, RIn2, E2, X>(
    f: (e: XE) => Effect<X, E2, RIn2>
  ): <RIn, ROut>(self: Layer<ROut, E, RIn>) => Layer<ROut, E | E2, RIn | Exclude<RIn2, Scope.Scope>>
  <RIn, E, XE extends E, ROut, RIn2, E2, X>(
    self: Layer<ROut, E, RIn>,
    f: (e: XE) => Effect<X, E2, RIn2>
  ): Layer<ROut, E | E2, RIn | Exclude<RIn2, Scope.Scope>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Layer.ts#L1676)

Since v2.0.0

# testing

## PartialEffectful (type alias)

A utility type for creating partial mocks of services in testing.

**When to use**

Use to type partial test service implementations where only exercised
effectful members are stubbed.

**Details**

This type makes `Effect`, `Stream`, and `Channel` values and functions
returning them optional, while keeping non-effectful properties required.
This allows you to provide only the methods you need to test while leaving
others unimplemented.

**See**

- `mock` for creating a mock layer from a partial service implementation

**Signature**

```ts
type PartialEffectful<A> = Types.Simplify<
  {
    [K in keyof A as A[K] extends AnyEffectOrStream ? K : never]?: A[K]
  } & {
    [K in keyof A as A[K] extends AnyEffectOrStream ? never : K]: A[K]
  }
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Layer.ts#L2190)

Since v3.17.0

## mock

Creates a mock layer for testing purposes. You can provide a partial
implementation of the service. Any missing members that are `Effect`s,
`Stream`s, `Channel`s, or functions returning them will fail with an
unimplemented defect when used.

**Details**

Missing members are represented by a value that can be used as an `Effect`,
`Stream`, `Channel`, or as a function returning an `Effect`. This lets the
mock preserve the shape of common service methods while still failing loudly
when an unimplemented member is exercised.

**Example** (Mocking services for tests)

```ts
import { Context, Effect, Layer } from "effect"

class UserService extends Context.Service<
  UserService,
  {
    readonly config: { apiUrl: string }
    readonly getUser: (id: string) => Effect.Effect<{ id: string; name: string }, Error>
    readonly deleteUser: (id: string) => Effect.Effect<void, Error>
    readonly updateUser: (id: string, data: object) => Effect.Effect<{ id: string; name: string }, Error>
  }
>()("UserService") {}

// Create a partial mock - only implement what you need for testing
const testUserLayer = Layer.mock(UserService, {
  config: { apiUrl: "https://test-api.com" }, // Required - non-Effect property
  getUser: (id: string) => Effect.succeed({ id, name: "Test User" }) // Mock implementation
  // deleteUser and updateUser are omitted - will throw UnimplementedError if called
})

// Use in tests
const testProgram = Effect.gen(function* () {
  const userService = yield* UserService

  // This works - we provided an implementation
  const user = yield* userService.getUser("123")
  console.log(user.name) // "Test User"

  // This would throw - we didn't implement deleteUser
  // yield* userService.deleteUser("123") // UnimplementedError
}).pipe(Effect.provide(testUserLayer))
```

**Signature**

```ts
declare const mock: {
  <I, S extends object>(service: Context.Key<I, S>): (implementation: PartialEffectful<S>) => Layer<I>
  <I, S extends object>(service: Context.Key<I, S>, implementation: Types.NoInfer<PartialEffectful<S>>): Layer<I>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Layer.ts#L2262)

Since v3.17.0

# tracing

## parentSpan

Constructs a layer that provides an existing span as the current parent span.

**Details**

The supplied span is made available through `Tracer.ParentSpan` for layers
that are built with this layer. This API does not create, end, or close the
span; the caller remains responsible for the span's lifetime.

**Example** (Referencing an existing parent span)

```ts
import { Console, Context, Effect, Layer, Tracer } from "effect"

class Database extends Context.Service<
  Database,
  {
    readonly query: (sql: string) => Effect.Effect<string>
  }
>()("Database") {}

// Create a layer that uses an existing span as parent
const databaseLayer = Layer.effect(
  Database,
  Effect.gen(function* () {
    yield* Effect.log("Initializing database")

    const parentSpan = yield* Effect.currentParentSpan
    yield* Console.log(parentSpan.spanId) // "42"

    return {
      query: Effect.fn("Database.query")((sql: string) => Effect.succeed(`Result: ${sql}`))
    }
  })
).pipe(
  Layer.provide(
    Layer.parentSpan(
      Tracer.externalSpan({
        spanId: "42",
        traceId: "000"
      })
    )
  )
)
```

**Signature**

```ts
declare const parentSpan: (span: Tracer.AnySpan) => Layer<Tracer.ParentSpan>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Layer.ts#L2564)

Since v2.0.0

## span

Constructs a new `Layer` which creates a span and registers it as the current
parent span.

**Details**

This allows you to create a traced scope for layer construction, making all
operations within the layer constructor part of the same trace span. The span
is automatically ended when the layer's scope is closed. If `onEnd` is
provided, it receives the span and the layer scope's exit value when the span
ends.

**Example** (Tracing layer construction with a span)

```ts
import { Console, Context, Effect, Layer } from "effect"
import type { Tracer } from "effect"

class Database extends Context.Service<
  Database,
  {
    readonly query: (sql: string) => Effect.Effect<string>
  }
>()("Database") {}

// Create a traced layer - all operations performed during construction of
// the `Database` service are part of the "database-init" span
const databaseLayer = Layer.effect(
  Database,
  Effect.gen(function* () {
    // These operations are traced under "database-init" span
    yield* Effect.log("Connecting to database")
    yield* Effect.sleep("100 millis")
    yield* Effect.log("Database connected")

    const parentSpan = yield* Effect.currentParentSpan
    yield* Console.log((parentSpan as Tracer.Span).name) // "database-init"

    return {
      query: Effect.fn("Database.query")((sql: string) => Effect.succeed(`Result: ${sql}`))
    }
  })
).pipe(Layer.provide(Layer.span("database-init")))

// Can also use the `onEnd` callback to execute logic when the span ends
const tracedLayer = Layer.span("service-initialization", {
  attributes: { version: "1.0.0" },
  onEnd: (span, exit) =>
    Effect.sync(() => {
      console.log(`Span ${span.name} ended with:`, exit._tag)
    })
})
```

**Signature**

```ts
declare const span: (name: string, options?: SpanOptions) => Layer<Tracer.ParentSpan>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Layer.ts#L2508)

Since v2.0.0

## withParentSpan

Wraps a layer so spans created during its construction use the supplied span
as their parent.

**Details**

Use this to attach layer construction to an existing trace hierarchy. This API
does not create or end the supplied parent span.

When the supplied span is a native `Span`, layer construction also receives
diagnostic information that helps associate failures with the layer call site.
External spans are only installed as the parent span and do not add this
diagnostic call-site information.

**Example** (Attaching layers to an existing parent span)

```ts
import { Context, Effect, Layer, Tracer } from "effect"

class Database extends Context.Service<
  Database,
  {
    readonly query: (sql: string) => Effect.Effect<string>
  }
>()("Database") {}

class Cache extends Context.Service<
  Cache,
  {
    readonly get: (key: string) => Effect.Effect<string | null>
  }
>()("Cache") {}

// Create layers
const DatabaseLayer = Layer.effect(
  Database,
  Effect.gen(function* () {
    yield* Effect.log("Connecting to database")
    return {
      query: Effect.fn("Database.query")((sql: string) => Effect.succeed(`DB: ${sql}`))
    }
  })
)

const CacheLayer = Layer.effect(
  Cache,
  Effect.gen(function* () {
    yield* Effect.log("Connecting to cache")
    return {
      get: Effect.fn("Cache.get")((key: string) => Effect.succeed(`Cache: ${key}`))
    }
  })
)

// Use with an existing parent span from Effect.withSpan
const program = Effect.withSpan("application-startup")(
  Effect.gen(function* () {
    const parentSpan = yield* Tracer.ParentSpan

    // Both layers will be children of "application-startup" span
    const AppLayer = Layer.mergeAll(DatabaseLayer, CacheLayer).pipe(Layer.withParentSpan(parentSpan))

    const context = yield* Layer.build(AppLayer)
    const database = Context.get(context, Database)
    const cache = Context.get(context, Cache)

    const dbResult = yield* database.query("SELECT * FROM users")
    const cacheResult = yield* cache.get("user:123")

    return { dbResult, cacheResult }
  })
)
```

**Signature**

```ts
declare const withParentSpan: {
  (
    span: Tracer.AnySpan,
    options?: Tracer.TraceOptions
  ): <A, E, R>(self: Layer<A, E, R>) => Layer<A, E, Exclude<R, Tracer.ParentSpan>>
  <A, E, R>(
    self: Layer<A, E, R>,
    span: Tracer.AnySpan,
    options?: Tracer.TraceOptions
  ): Layer<A, E, Exclude<R, Tracer.ParentSpan>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Layer.ts#L2738)

Since v2.0.0

## withSpan

Wraps a `Layer` with a new tracing span, making all operations in the layer
constructor part of the named trace span.

**Details**

This creates a new span for the layer's construction and execution. The span
is automatically ended when the layer's scope is closed. This is useful for
tracking the lifecycle and performance of layer initialization.

**Example** (Wrapping a layer with a span)

```ts
import { Context, Effect, Layer } from "effect"

class Database extends Context.Service<
  Database,
  {
    readonly query: (sql: string) => Effect.Effect<string>
  }
>()("Database") {}

class Logger extends Context.Service<
  Logger,
  {
    readonly log: (msg: string) => Effect.Effect<void>
  }
>()("Logger") {}

// Create layers with tracing
const databaseLayer = Layer.effect(
  Database,
  Effect.gen(function* () {
    yield* Effect.log("Connecting to database")
    yield* Effect.sleep("100 millis")
    return {
      query: Effect.fn("Database.query")((sql: string) => Effect.succeed(`Result: ${sql}`))
    }
  })
).pipe(
  Layer.withSpan("database-initialization", {
    attributes: { dbType: "postgres" }
  })
)

const loggerLayer = Layer.succeed(Logger, {
  log: Effect.fn("Logger.log")((msg: string) => Effect.sync(() => console.log(msg)))
}).pipe(Layer.withSpan("logger-initialization"))

// Combine traced layers
const appLayer = Layer.mergeAll(databaseLayer, loggerLayer).pipe(
  Layer.withSpan("app-initialization", {
    onEnd: (span, exit) =>
      Effect.sync(() => {
        console.log(`Application initialization completed: ${exit._tag}`)
      })
  })
)

const program = Effect.gen(function* () {
  const database = yield* Database
  const logger = yield* Logger

  yield* logger.log("Application ready")
  return yield* database.query("SELECT * FROM users")
}).pipe(Effect.provide(appLayer))
```

**Signature**

```ts
declare const withSpan: {
  (name: string, options?: SpanOptions): <A, E, R>(self: Layer<A, E, R>) => Layer<A, E, Exclude<R, Tracer.ParentSpan>>
  <A, E, R>(self: Layer<A, E, R>, name: string, options?: SpanOptions): Layer<A, E, Exclude<R, Tracer.ParentSpan>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Layer.ts#L2627)

Since v2.0.0

# utility types

## Any (interface)

A type-level constraint for working with any `Layer` type.

**When to use**

Use to constrain generic parameters or layer collections to any `Layer`
value while preserving its provided, error, and required service types for
inference.

**Details**

This interface is used to constrain generic types to `Layer` values without
specifying exact type parameters.

**See**

- `Layer` for the concrete layer interface
- `Services` for extracting required services from a layer type
- `Error` for extracting construction errors from a layer type
- `Success` for extracting provided services from a layer type

**Signature**

```ts
export interface Any {
  readonly [TypeId]: {
    readonly _ROut: any
    readonly _E: any
    readonly _RIn: any
  }
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Layer.ts#L127)

Since v3.9.0

## Error (type alias)

Extracts the error type (`E`) from a `Layer` type.

**When to use**

Use to derive a layer construction error type for helper types, wrappers, or
APIs that preserve a layer failure channel.

**See**

- `Success` for extracting the services provided by the same `Layer`
- `Services` for extracting the dependency requirements of the same `Layer`

**Signature**

```ts
type Error<T> = T extends Layer<infer _ROut, infer _E, infer _RIn> ? _E : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Layer.ts#L165)

Since v2.0.0

## Services (type alias)

Extracts the service requirements (`RIn`) from a `Layer` type.

**When to use**

Use to derive the dependency requirements of a generic or inferred `Layer`
without restating its `RIn` type parameter.

**See**

- `Success` for extracting the services provided by the same `Layer`
- `Error` for extracting the construction failure type from the same `Layer`

**Signature**

```ts
type Services<T> = T extends infer L ? (L extends Layer<infer _ROut, infer _E, infer _RIn> ? _RIn : never) : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Layer.ts#L148)

Since v4.0.0

## Success (type alias)

Extracts the service output type (`ROut`) from a `Layer` type.

**When to use**

Use to derive the services provided by an existing or generic `Layer` without
restating its `ROut` type parameter.

**See**

- `Error` for extracting the layer construction error type instead
- `Services` for extracting the layer input service requirements instead

**Signature**

```ts
type Success<T> = T extends Layer<infer _ROut, infer _E, infer _RIn> ? _ROut : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Layer.ts#L180)

Since v2.0.0

## satisfiesErrorType

Ensures that a layer's error type extends a given type `E`.

**Details**

This function provides compile-time type checking to ensure that the error
type of a layer conforms to a specific type constraint.

**Example** (Constraining layer error types)

```ts
import { Layer } from "effect"

declare const ErrorLayer: Layer.Layer<never, Error, never>
declare const TypeErrorLayer: Layer.Layer<never, TypeError, never>
declare const StringLayer: Layer.Layer<never, string, never>

// Define a constraint that the error type must be an Error
const satisfiesError = Layer.satisfiesErrorType<Error>()

// This works - Layer<never, TypeError, never> extends Layer<never, Error, never>
const validLayer = satisfiesError(TypeErrorLayer)

// This would cause a TypeScript compilation error:
// const invalidLayer = satisfiesError(StringLayer)
//                                     ^^^^^^^^^^^
// Type 'string' is not assignable to type 'Error'
```

**Signature**

```ts
declare const satisfiesErrorType: <E>() => <ROut, E2 extends E, RIn>(
  layer: Layer<ROut, E2, RIn>
) => Layer<ROut, E2, RIn>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Layer.ts#L2385)

Since v4.0.0

## satisfiesServicesType

Ensures that a layer's requirements type extends a given type `R`.

**Details**

This function provides compile-time type checking to ensure that the
requirements type of a layer conforms to a specific type constraint.

**Example** (Constraining layer service requirements)

```ts
import { Layer } from "effect"

declare const FortyTwoLayer: Layer.Layer<never, never, 42>
declare const StringLayer: Layer.Layer<never, never, string>

// Define a constraint that the service requirements must be numbers
const satisfiesNumber = Layer.satisfiesServicesType<number>()

// This works - Layer<never, never, 42> extends Layer<never, never, number>
const validLayer = satisfiesNumber(FortyTwoLayer)

// This would cause a TypeScript compilation error:
// const invalidLayer = satisfiesNumber(StringLayer)
//                                     ^^^^^^^^^^^
// Type 'string' is not assignable to type 'number'
```

**Signature**

```ts
declare const satisfiesServicesType: <RIn>() => <ROut, E, RIn2 extends RIn>(
  layer: Layer<ROut, E, RIn2>
) => Layer<ROut, E, RIn2>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Layer.ts#L2419)

Since v4.0.0

## satisfiesSuccessType

Ensures that a layer's success type extends a given type `ROut`.

**Details**

This function provides compile-time type checking to ensure that the success
value of a layer conforms to a specific type constraint.

**Example** (Constraining layer success types)

```ts
import { Layer } from "effect"

declare const FortyTwoLayer: Layer.Layer<42, never, never>
declare const StringLayer: Layer.Layer<string, never, never>

// Define a constraint that the success type must be a number
const satisfiesNumber = Layer.satisfiesSuccessType<number>()

// This works - Layer<42, never, never> extends Layer<number, never, never>
const validLayer = satisfiesNumber(FortyTwoLayer)

// This would cause a TypeScript compilation error:
// const invalidLayer = satisfiesNumber(StringLayer)
//                                     ^^^^^^^^^^^
// Type 'string' is not assignable to type 'number'
```

**Signature**

```ts
declare const satisfiesSuccessType: <ROut>() => <ROut2 extends ROut, E, RIn>(
  layer: Layer<ROut2, E, RIn>
) => Layer<ROut2, E, RIn>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Layer.ts#L2350)

Since v4.0.0

# zipping

## merge

Merges this layer with another layer concurrently, producing a new layer with
combined input, error, and output types.

**When to use**

Use to combine an existing `Layer` with another `Layer` or an array of
layers while preserving pipeline style.

**Details**

This is a binary version of `mergeAll` that merges exactly two layers or one
layer with an array of layers. The layers are built concurrently and their
outputs are combined.

**Example** (Merging two layers)

```ts
import { Context, Effect, Layer } from "effect"

class Database extends Context.Service<
  Database,
  {
    readonly query: (sql: string) => Effect.Effect<string>
  }
>()("Database") {}

class Logger extends Context.Service<
  Logger,
  {
    readonly log: (msg: string) => Effect.Effect<void>
  }
>()("Logger") {}

const dbLayer = Layer.succeed(Database, {
  query: Effect.fn("Database.query")((sql: string) => Effect.succeed("result"))
})
const loggerLayer = Layer.succeed(Logger, {
  log: Effect.fn("Logger.log")((msg: string) => Effect.sync(() => console.log(msg)))
})

const mergedLayer = Layer.merge(dbLayer, loggerLayer)
```

**See**

- `mergeAll` for merging several layers at once

**Signature**

```ts
declare const merge: {
  <RIn, E, ROut>(
    that: Layer<ROut, E, RIn>
  ): <RIn2, E2, ROut2>(self: Layer<ROut2, E2, RIn2>) => Layer<ROut | ROut2, E | E2, RIn | RIn2>
  <const Layers extends [Any, ...Array<Any>]>(
    that: Layers
  ): <A, E, R>(
    self: Layer<A, E, R>
  ) => Layer<A | Success<Layers[number]>, E | Error<Layers[number]>, Services<Layers[number]> | R>
  <RIn2, E2, ROut2, RIn, E, ROut>(
    self: Layer<ROut2, E2, RIn2>,
    that: Layer<ROut, E, RIn>
  ): Layer<ROut | ROut2, E | E2, RIn | RIn2>
  <A, E, R, const Layers extends [Any, ...Array<Any>]>(
    self: Layer<A, E, R>,
    that: Layers
  ): Layer<A | Success<Layers[number]>, E | Error<Layers[number]>, Services<Layers[number]> | R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Layer.ts#L1245)

Since v2.0.0

## mergeAll

Combines all the provided layers concurrently, creating a new layer with
merged input, error, and output types.

**When to use**

Use when you need to combine multiple independent layers.

**Details**

All layers are built concurrently, and their outputs are merged into a single layer.

If multiple merged layers depend on the same layer value, that dependency is
shared by default. Reuse a named layer value when you want services to share
the same resource, such as one database pool.

**Example** (Merging independent layers)

```ts
import { Context, Effect, Layer } from "effect"

class Database extends Context.Service<
  Database,
  {
    readonly query: (sql: string) => Effect.Effect<string>
  }
>()("Database") {}

class Logger extends Context.Service<
  Logger,
  {
    readonly log: (msg: string) => Effect.Effect<void>
  }
>()("Logger") {}

const dbLayer = Layer.succeed(Database, {
  query: Effect.fn("Database.query")((sql: string) => Effect.succeed("result"))
})
const loggerLayer = Layer.succeed(Logger, {
  log: Effect.fn("Logger.log")((msg: string) => Effect.sync(() => console.log(msg)))
})

const mergedLayer = Layer.mergeAll(dbLayer, loggerLayer)
```

**See**

- `merge` for merging one layer with another layer or array

**Signature**

```ts
declare const mergeAll: <Layers extends [Layer<never, any, any>, ...Array<Layer<never, any, any>>]>(
  ...layers: Layers
) => Layer<Success<Layers[number]>, Error<Layers[number]>, Services<Layers[number]>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Layer.ts#L1194)

Since v2.0.0
