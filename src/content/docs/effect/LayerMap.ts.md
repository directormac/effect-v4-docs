---
title: LayerMap.ts
nav_order: 54
parent: "effect"
---

## LayerMap.ts overview

Caches scoped services selected by key and built from layers.

A `LayerMap<K, I, E>` turns a key into a cached service `Context<I>` and
exposes that context as either a `Layer` or a scoped effect. Entries can be
invalidated explicitly or released after they sit unused. This is useful for
keyed resource families such as tenant clients, regional connections, or
environment-specific services.

Since v3.14.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [fromRecord](#fromrecord)
  - [make](#make)
- [models](#models)
  - [LayerMap (interface)](#layermap-interface)
- [services](#services)
  - [Service](#service)
  - [TagClass (interface)](#tagclass-interface)
- [utils](#utils)
  - [Service (namespace)](#service-namespace)
    - [Key (type alias)](#key-type-alias)
    - [Layers (type alias)](#layers-type-alias)
    - [Success (type alias)](#success-type-alias)
    - [Error (type alias)](#error-type-alias)
    - [Services (type alias)](#services-type-alias)

---

# constructors

## fromRecord

Creates a `LayerMap` from a record of predefined layers.

**Details**

The record keys become the keys accepted by the returned `LayerMap`, and the
record values are the layers built for those keys.

**Example** (Creating a layer map from a record)

```ts
import { Context, Effect, Layer, LayerMap } from "effect"

// Define service keys
const DevDatabase = Context.Service<{
  readonly query: (sql: string) => Effect.Effect<string>
}>("DevDatabase")

const ProdDatabase = Context.Service<{
  readonly query: (sql: string) => Effect.Effect<string>
}>("ProdDatabase")

// Create predefined layers
const layers = {
  development: Layer.succeed(DevDatabase)({
    query: Effect.fn("DevDatabase.query")((sql) => Effect.succeed(`DEV: ${sql}`))
  }),
  production: Layer.succeed(ProdDatabase)({
    query: Effect.fn("ProdDatabase.query")((sql) => Effect.succeed(`PROD: ${sql}`))
  })
} as const

// Create a LayerMap from the record
const program = Effect.gen(function* () {
  const layerMap = yield* LayerMap.fromRecord(layers, {
    idleTimeToLive: "10 seconds"
  })

  // Get layers by key
  const devLayer = layerMap.get("development")
  const prodLayer = layerMap.get("production")

  console.log("LayerMap created from record")
})
```

**Signature**

```ts
declare const fromRecord: <
  const Layers extends Record<string, Layer.Layer<any, any, any>>,
  const Preload extends boolean = false
>(
  layers: Layers,
  options?:
    | {
        readonly idleTimeToLive?: IdleTimeToLiveInput<keyof Layers> | undefined
        readonly preload?: Preload | undefined
      }
    | undefined
) => Effect.Effect<
  LayerMap<keyof Layers, Layer.Success<Layers[keyof Layers]>, Layer.Error<Layers[keyof Layers]>>,
  Preload extends true ? Layer.Error<Layers[keyof Layers]> : never,
  Scope.Scope | (Layers[keyof Layers] extends Layer.Layer<infer _A, infer _E, infer _R> ? _R : never)
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/LayerMap.ts#L224)

Since v3.14.0

## make

Creates a `LayerMap` that dynamically provides resources based on a key.

**Example** (Creating a layer map)

```ts
import { Context, Effect, Layer, LayerMap } from "effect"

// Define a service key
const DatabaseService = Context.Service<{
  readonly query: (sql: string) => Effect.Effect<string>
}>("Database")

// Create a LayerMap that provides different database configurations
const program = Effect.gen(function* () {
  const layerMap = yield* LayerMap.make(
    (env: string) =>
      Layer.succeed(DatabaseService)({
        query: Effect.fn("DatabaseService.query")((sql) => Effect.succeed(`${env}: ${sql}`))
      }),
    { idleTimeToLive: "5 seconds" }
  )

  // Get a layer for a specific environment
  const devLayer = layerMap.get("development")

  // Use the layer to provide the service
  const result = yield* Effect.provide(
    Effect.gen(function* () {
      const db = yield* DatabaseService
      return yield* db.query("SELECT * FROM users")
    }),
    devLayer
  )

  console.log(result) // "development: SELECT * FROM users"
})
```

**Signature**

```ts
declare const make: <K, L extends Layer.Layer<any, any, any>, PreloadKeys extends Iterable<K> | undefined = undefined>(
  lookup: (key: K) => L,
  options?:
    | { readonly idleTimeToLive?: IdleTimeToLiveInput<K> | undefined; readonly preloadKeys?: PreloadKeys }
    | undefined
) => Effect.Effect<
  LayerMap<K, Layer.Success<L>, Layer.Error<L>>,
  PreloadKeys extends undefined ? never : Layer.Error<L>,
  Scope.Scope | Layer.Services<L>
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/LayerMap.ts#L135)

Since v3.14.0

# models

## LayerMap (interface)

A scoped, keyed map of layer-built service contexts.

**Details**

A `LayerMap` builds resources for a key on demand, exposes them as a `Layer`
or scoped `Context`, and can invalidate cached resources for a key.

**Example** (Managing keyed layers)

```ts
import { Context, Effect, Layer, LayerMap } from "effect"

// Define a service key
const DatabaseService = Context.Service<{
  readonly query: (sql: string) => Effect.Effect<string>
}>("Database")

// Create a LayerMap that provides different database configurations
const createDatabaseLayerMap = LayerMap.make((env: string) =>
  Layer.succeed(DatabaseService)({
    query: Effect.fn("DatabaseService.query")((sql) => Effect.succeed(`${env}: ${sql}`))
  })
)

// Use the LayerMap
const program = Effect.gen(function* () {
  const layerMap = yield* createDatabaseLayerMap

  // Get a layer for a specific environment
  const devLayer = layerMap.get("development")

  // Get context directly
  const context = yield* layerMap.contextEffect("production")

  // Invalidate a cached layer
  yield* layerMap.invalidate("development")
})
```

**Signature**

```ts
export interface LayerMap<in out K, in out I, in out E = never> {
  readonly [TypeId]: typeof TypeId

  /**
   * The internal RcMap that stores the resources.
   */
  readonly rcMap: RcMap.RcMap<K, Context.Context<I>, E>

  /**
   * Retrieves a Layer for the resources associated with the key.
   */
  get(key: K): Layer.Layer<I, E>

  /**
   * Retrieves the context associated with the key.
   */
  contextEffect(key: K): Effect.Effect<Context.Context<I>, E, Scope.Scope>

  /**
   * Invalidates the resource associated with the key.
   */
  invalidate(key: K): Effect.Effect<void>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/LayerMap.ts#L69)

Since v3.14.0

# services

## Service

Create a `LayerMap` service that provides a dynamic set of resources based on
a key.

**Example** (Defining a layer map service)

```ts
import { Console, Context, Effect, Layer, LayerMap } from "effect"

// Define a service key
const Greeter = Context.Service<{
  readonly greet: Effect.Effect<string>
}>("Greeter")

// Create a service that wraps a LayerMap
class GreeterMap extends LayerMap.Service<GreeterMap>()("GreeterMap", {
  // Define the lookup function for the layer map
  lookup: (name: string) =>
    Layer.succeed(Greeter)({
      greet: Effect.succeed(`Hello, ${name}!`)
    }),

  // If a layer is not used for a certain amount of time, it can be removed
  idleTimeToLive: "5 seconds"
}) {}

// Usage
const program = Effect.gen(function* () {
  // Access and use the Greeter service
  const greeter = yield* Greeter
  yield* Console.log(yield* greeter.greet)
})
  .pipe(
    // Use the GreeterMap service to provide a variant of the Greeter service
    Effect.provide(GreeterMap.get("John"))
  )
  .pipe(
    // Provide the GreeterMap layer
    Effect.provide(GreeterMap.layer)
  )
```

**Signature**

```ts
declare const Service: <Self>() => <
  const Id extends string,
  const Options extends
    | NoExcessProperties<
        {
          readonly lookup: (key: any) => Layer.Layer<any, any, any>
          readonly dependencies?: ReadonlyArray<Layer.Layer<any, any, any>> | undefined
          readonly idleTimeToLive?: IdleTimeToLiveInput<any> | undefined
          readonly preloadKeys?:
            | Iterable<Options extends { readonly lookup: (key: infer K) => any } ? K : never>
            | undefined
        },
        Options
      >
    | NoExcessProperties<
        {
          readonly layers: Record<string, Layer.Layer<any, any, any>>
          readonly dependencies?: ReadonlyArray<Layer.Layer<any, any, any>> | undefined
          readonly idleTimeToLive?: IdleTimeToLiveInput<any> | undefined
          readonly preload?: boolean | undefined
        },
        Options
      >
>(
  id: Id,
  options: Options
) => TagClass<
  Self,
  Id,
  Options extends { readonly lookup: (key: infer K) => any }
    ? K
    : Options extends { readonly layers: infer Layers }
      ? keyof Layers
      : never,
  Service.Success<Options>,
  Options extends { readonly preload: true } ? never : Service.Error<Options>,
  Service.Services<Options>,
  Options extends { readonly preload: true }
    ? Service.Error<Options>
    : Options extends { readonly preloadKeys: Iterable<any> }
      ? Service.Error<Options>
      : never,
  Options extends { readonly dependencies: ReadonlyArray<Layer.Layer<any, any, any>> }
    ? Options["dependencies"][number]
    : never
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/LayerMap.ts#L350)

Since v3.14.0

## TagClass (interface)

Service class shape produced by `LayerMap.Service`.

**When to use**

Use as the public type for classes returned by `LayerMap.Service` when an API
needs to accept, return, or alias the generated service class and its static
helpers.

**Details**

It combines a `Context.Service` tag for the `LayerMap` with default layers
and helper accessors for retrieving, using, and invalidating keyed resources.

**See**

- `Service` for creating concrete `LayerMap` service classes

**Signature**

```ts
export interface TagClass<
  in out Self,
  in out Id extends string,
  in out K,
  in out I,
  in out E,
  in out R,
  in out LE,
  in out Deps extends Layer.Layer<any, any, any>
> extends Context.ServiceClass<Self, Id, LayerMap<K, I, E>> {
  /**
   * A default layer for the `LayerMap` service.
   */
  readonly layer: Layer.Layer<
    Self,
    (Deps extends Layer.Layer<infer _A, infer _E, infer _R> ? _E : never) | LE,
    | Exclude<R, Deps extends Layer.Layer<infer _A, infer _E, infer _R> ? _A : never>
    | (Deps extends Layer.Layer<infer _A, infer _E, infer _R> ? _R : never)
  >

  /**
   * A default layer for the `LayerMap` service without the dependencies provided.
   */
  readonly layerNoDeps: Layer.Layer<Self, LE, R>

  /**
   * Retrieves a Layer for the resources associated with the key.
   */
  readonly get: (key: K) => Layer.Layer<I, E, Self>

  /**
   * Retrieves the context associated with the key.
   */
  readonly contextEffect: (key: K) => Effect.Effect<Context.Context<I>, E, Scope.Scope | Self>

  /**
   * Invalidates the resource associated with the key.
   */
  readonly invalidate: (key: K) => Effect.Effect<void, never, Self>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/LayerMap.ts#L266)

Since v3.14.0

# utils

## Service (namespace)

Type helpers for values created with `LayerMap.Service`.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/LayerMap.ts#L423)

Since v3.14.0

### Key (type alias)

Extracts the key type accepted by a `LayerMap.Service` definition.

**Signature**

```ts
type Key<Options> = Options extends { readonly lookup: (key: infer K) => any }
  ? K
  : Options extends { readonly layers: infer Layers }
    ? keyof Layers
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/LayerMap.ts#L430)

Since v3.14.0

### Layers (type alias)

Extracts the layer type produced by a `LayerMap.Service` definition.

**Signature**

```ts
type Layers<Options> = Options extends { readonly lookup: (key: infer _K) => infer Layers }
  ? Layers
  : Options extends { readonly layers: infer Layers }
    ? Layers[keyof Layers]
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/LayerMap.ts#L440)

Since v3.14.0

### Success (type alias)

Extracts the services provided by the layers in a `LayerMap.Service`
definition.

**Signature**

```ts
type Success<Options> = Layers<Options> extends Layer.Layer<infer _A, infer _E, infer _R> ? _A : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/LayerMap.ts#L451)

Since v3.14.0

### Error (type alias)

Extracts the error type of the layers in a `LayerMap.Service` definition.

**Signature**

```ts
type Error<Options> = Layers<Options> extends Layer.Layer<infer _A, infer _E, infer _R> ? _E : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/LayerMap.ts#L459)

Since v3.14.0

### Services (type alias)

Extracts the service requirements of the layers in a `LayerMap.Service`
definition.

**Signature**

```ts
type Services<Options> = Layers<Options> extends Layer.Layer<infer _A, infer _E, infer _R> ? _R : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/LayerMap.ts#L468)

Since v4.0.0
