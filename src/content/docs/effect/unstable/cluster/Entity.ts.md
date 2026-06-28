---
title: Entity.ts
nav_order: 178
parent: "effect"
---

## Entity.ts overview

Defines addressable entity types for Effect Cluster.

An entity gives a stable name and RPC protocol to a group of values that are
addressed by id. The cluster uses that information to choose a shard and
route each request to the runner responsible for that id. This module
includes constructors for entity definitions, helpers for creating sharded
clients, layer builders for registering handlers, and services that expose
the current entity address while a request is being handled.

Since v4.0.0

---

## Exports Grouped by Category

- [Keep alive](#keep-alive)
  - [KeepAliveLatch (class)](#keepalivelatch-class)
  - [KeepAliveRpc](#keepaliverpc)
  - [keepAlive](#keepalive)
- [Replier](#replier)
  - [Replier (interface)](#replier-interface)
- [constructors](#constructors)
  - [fromRpcGroup](#fromrpcgroup)
  - [make](#make)
- [context](#context)
  - [CurrentAddress (class)](#currentaddress-class)
  - [CurrentRunnerAddress (class)](#currentrunneraddress-class)
- [models](#models)
  - [Any (type alias)](#any-type-alias)
  - [Entity (interface)](#entity-interface)
  - [HandlersFrom (type alias)](#handlersfrom-type-alias)
- [refinements](#refinements)
  - [isEntity](#isentity)
- [request](#request)
  - [Request (class)](#request-class)
- [testing](#testing)
  - [makeTestClient](#maketestclient)
- [utils](#utils)
  - [Replier (namespace)](#replier-namespace)
    - [Success (type alias)](#success-type-alias)

---

# Keep alive

## KeepAliveLatch (class)

Service tag for the latch that coordinates entity keep-alive state.

**Details**

`keepAlive` closes the latch when keep-alive is active and opens it again when
the resource no longer needs to keep the entity alive.

**Signature**

```ts
declare class KeepAliveLatch
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Entity.ts#L777)

Since v4.0.0

## KeepAliveRpc

RPC used internally to keep an entity active while a resource is held.

**Details**

The RPC is marked as persisted and uninterruptible so the keep-alive signal
survives normal entity restarts.

**Signature**

```ts
declare const KeepAliveRpc: Rpc.Rpc<"Cluster/Entity/keepAlive", Void, Void, Never, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Entity.ts#L762)

Since v4.0.0

## keepAlive

Enables or disables keep-alive for the current entity.

**Details**

When enabled it sends the internal keep-alive RPC for the current address; when
disabled it releases the keep-alive latch if one is present.

**Signature**

```ts
declare const keepAlive: (enabled: boolean) => Effect.Effect<void, never, Sharding | CurrentAddress>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Entity.ts#L706)

Since v4.0.0

# Replier

## Replier (interface)

Reply API passed to queue-based entity handlers.

**When to use**

Use when you use it to complete an entity request by succeeding, failing, failing with a
cause, or supplying an explicit `Exit`.

**Signature**

```ts
export interface Replier<Rpcs extends Rpc.Any> {
  readonly succeed: <R extends Rpcs>(request: Envelope.Request<R>, value: Replier.Success<R>) => Effect.Effect<void>

  readonly fail: <R extends Rpcs>(request: Envelope.Request<R>, error: Rpc.Error<R>) => Effect.Effect<void>

  readonly failCause: <R extends Rpcs>(
    request: Envelope.Request<R>,
    cause: Cause.Cause<Rpc.Error<R>>
  ) => Effect.Effect<void>

  readonly complete: <R extends Rpcs>(
    request: Envelope.Request<R>,
    exit: Exit.Exit<Replier.Success<R>, Rpc.Error<R>>
  ) => Effect.Effect<void>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Entity.ts#L502)

Since v4.0.0

# constructors

## fromRpcGroup

Creates a new `Entity` of the specified `type` which will accept messages
that adhere to the provided `RpcGroup`.

**Signature**

```ts
declare const fromRpcGroup: <const Type extends string, Rpcs extends Rpc.Any>(
  type: Type,
  protocol: RpcGroup.RpcGroup<Rpcs>
) => Entity<Type, Rpcs>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Entity.ts#L405)

Since v4.0.0

## make

Creates a new `Entity` of the specified `type` which will accept messages
that adhere to the provided schemas.

**When to use**

Use to define a cluster entity from individual `Rpc` definitions, giving the
cluster runtime a typed protocol for handlers and per-entity clients.

**Details**

The `type` argument is stored as the entity `EntityType`, and the RPC array
is grouped into the entity's `protocol`.

**Gotchas**

RPC tags should be unique within the array. If multiple definitions use the
same tag, the resulting protocol keeps the later definition for that tag.

**See**

- `fromRpcGroup` for creating an entity from an existing `RpcGroup`

**Signature**

```ts
declare const make: <const Type extends string, Rpcs extends ReadonlyArray<Rpc.Any>>(
  type: Type,
  protocol: Rpcs
) => Entity<Type, Rpcs[number]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Entity.ts#L447)

Since v4.0.0

# context

## CurrentAddress (class)

Service tag for the entity address currently being processed.

**When to use**

Use to read the current entity identity and shard address from entity
handlers and keep-alive logic.

**Signature**

```ts
declare class CurrentAddress
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Entity.ts#L470)

Since v4.0.0

## CurrentRunnerAddress (class)

Service tag for the runner address currently registering entity handlers.

**When to use**

Use to read the runner address associated with the current entity handler
registration.

**Signature**

```ts
declare class CurrentRunnerAddress
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Entity.ts#L486)

Since v4.0.0

# models

## Any (type alias)

Type alias for any cluster `Entity`, regardless of entity type or RPC
protocol.

**Signature**

```ts
type Any = Entity<string, Rpc.Any>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Entity.ts#L208)

Since v4.0.0

## Entity (interface)

Represents a cluster entity type and the RPC protocol it can handle.

**Details**

An entity defines how ids map to shard groups, exposes a sharded client, and
can be registered as a layer using RPC handlers or a mailbox queue.

**Signature**

```ts
export interface Entity<in out Type extends string, in out Rpcs extends Rpc.Any> extends Equal.Equal {
  readonly [TypeId]: typeof TypeId
  /**
   * The name of the entity type.
   */
  readonly type: EntityType

  /**
   * A RpcGroup definition for messages which represents the messaging protocol
   * that the entity is capable of processing.
   */
  readonly protocol: RpcGroup.RpcGroup<Rpcs>

  /**
   * Get the shard group for the given EntityId.
   */
  getShardGroup(entityId: EntityId): string

  /**
   * Get the ShardId for the given EntityId.
   */
  getShardId(entityId: EntityId): Effect.Effect<ShardId.ShardId, never, Sharding>

  /**
   * Annotate the entity with a value.
   */
  annotate<I, S>(key: Context.Key<I, S>, value: S): Entity<Type, Rpcs>

  /**
   * Annotate the Rpc's above this point with a value.
   */
  annotateRpcs<I, S>(key: Context.Key<I, S>, value: S): Entity<Type, Rpcs>

  /**
   * Annotate the entity with the given annotations.
   */
  annotateMerge<S>(annotation: Context.Context<S>): Entity<Type, Rpcs>

  /**
   * Annotate the Rpc's above this point with a context object.
   */
  annotateRpcsMerge<S>(context: Context.Context<S>): Entity<Type, Rpcs>

  /**
   * Create a client for this entity.
   */
  readonly client: Effect.Effect<
    (entityId: string) => RpcClient.RpcClient.From<Rpcs, MailboxFull | AlreadyProcessingMessage | PersistenceError>,
    never,
    Sharding
  >

  /**
   * Create a Layer from an Entity.
   *
   * **Details**
   *
   * It will register the entity with the Sharding service.
   */
  toLayer<Handlers extends HandlersFrom<Rpcs>, RX = never>(
    build: Handlers | Effect.Effect<Handlers, never, RX>,
    options?: {
      readonly maxIdleTime?: Duration.Input | undefined
      readonly concurrency?: number | "unbounded" | undefined
      readonly mailboxCapacity?: number | "unbounded" | undefined
      readonly disableFatalDefects?: boolean | undefined
      readonly defectRetryPolicy?: Schedule.Schedule<any, unknown> | undefined
      readonly spanAttributes?: Record<string, string> | undefined
    }
  ): Layer.Layer<
    never,
    never,
    | Exclude<RX, Scope | CurrentAddress | CurrentRunnerAddress>
    | RpcGroup.HandlersServices<Rpcs, Handlers>
    | Rpc.ServicesClient<Rpcs>
    | Rpc.ServicesServer<Rpcs>
    | Rpc.Middleware<Rpcs>
    | Sharding
  >

  of<Handlers extends HandlersFrom<Rpcs>>(handlers: Handlers): Handlers

  /**
   * Create a Layer from an Entity.
   *
   * **Details**
   *
   * It will register the entity with the Sharding service.
   */
  toLayerQueue<R, RX = never>(
    build:
      | ((queue: Queue.Dequeue<Envelope.Request<Rpcs>>, replier: Replier<Rpcs>) => Effect.Effect<never, never, R>)
      | Effect.Effect<
          (queue: Queue.Dequeue<Envelope.Request<Rpcs>>, replier: Replier<Rpcs>) => Effect.Effect<never, never, R>,
          never,
          RX
        >,
    options?: {
      readonly maxIdleTime?: Duration.Input | undefined
      readonly mailboxCapacity?: number | "unbounded" | undefined
      readonly disableFatalDefects?: boolean | undefined
      readonly defectRetryPolicy?: Schedule.Schedule<any, unknown> | undefined
      readonly spanAttributes?: Record<string, string> | undefined
    }
  ): Layer.Layer<
    never,
    never,
    | Exclude<RX, Scope | CurrentAddress | CurrentRunnerAddress>
    | R
    | Rpc.ServicesClient<Rpcs>
    | Rpc.ServicesServer<Rpcs>
    | Rpc.Middleware<Rpcs>
    | Sharding
  >
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Entity.ts#L66)

Since v4.0.0

## HandlersFrom (type alias)

Maps each RPC in an entity protocol to the handler function expected by
`Entity.toLayer`.

**Details**

Each handler receives the entity request envelope for that RPC and returns the
RPC result or a supported RPC wrapper.

**Signature**

```ts
type HandlersFrom<Rpc> = {
  readonly [Current in Rpc as Current["_tag"]]: (
    envelope: Request<Current>
  ) => Rpc.WrapperOr<Rpc.ResultFrom<Current, any>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Entity.ts#L222)

Since v4.0.0

# refinements

## isEntity

Returns `true` when the supplied value is a cluster `Entity`.

**Details**

The check is based on the internal entity type identifier.

**Signature**

```ts
declare const isEntity: (u: unknown) => u is Any
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Entity.ts#L238)

Since v4.0.0

# request

## Request (class)

Represents an entity request envelope delivered to entity handlers.

**Details**

It includes the underlying request envelope plus the last stream reply chunk
that was sent, allowing handlers to resume chunk sequencing after a restart.

**Signature**

```ts
declare class Request<Rpc>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Entity.ts#L557)

Since v4.0.0

# testing

## makeTestClient

Builds an in-memory test client for an entity layer.

**Details**

The returned function creates a no-serialization RPC client for each entity ID,
using a test sharding service instead of the cluster transport.

**Signature**

```ts
declare const makeTestClient: <Type extends string, Rpcs extends Rpc.Any, LA, LE, LR>(
  entity: Entity<Type, Rpcs>,
  layer: Layer.Layer<LA, LE, LR>
) => Effect.Effect<
  (entityId: string) => Effect.Effect<RpcClient.RpcClient<Rpcs>>,
  LE,
  Scope | ShardingConfig | Exclude<LR, Sharding> | Rpc.MiddlewareClient<Rpcs>
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Entity.ts#L597)

Since v4.0.0

# utils

## Replier (namespace)

Helper types used by the `Replier` API.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Entity.ts#L529)

Since v4.0.0

### Success (type alias)

Success value accepted by a `Replier` for a single RPC.

**Details**

For streaming RPCs this may be either a stream of success chunks or a dequeue
of success chunks. For non-streaming RPCs it is the RPC success value.

**Signature**

```ts
type Success<R> =
  Rpc.Success<R> extends Stream.Stream<infer _A, infer _E, infer _R>
    ? Stream.Stream<_A, _E | Rpc.Error<R>, _R> | Queue.Dequeue<_A, _E | Rpc.Error<R> | Cause.Done>
    : Rpc.Success<R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Entity.ts#L541)

Since v4.0.0
