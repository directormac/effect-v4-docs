---
title: EntityProxy.ts
nav_order: 181
parent: "effect"
---

## EntityProxy.ts overview

Derives RPC and HTTP API surfaces from clustered entities.

The generated APIs let callers use ordinary RPC clients or HTTP routes while
the cluster runtime still locates and delivers messages to the entity
instance identified by `entityId`. Each generated operation keeps the
original payload and success schema, adds cluster client errors, and creates
a discard variant for fire-and-forget delivery.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [toHttpApiGroup](#tohttpapigroup)
  - [toRpcGroup](#torpcgroup)
- [converting](#converting)
  - [ConvertHttpApi (type alias)](#converthttpapi-type-alias)
  - [ConvertRpcs (type alias)](#convertrpcs-type-alias)

---

# constructors

## toHttpApiGroup

Derives an `HttpApiGroup` from an `Entity`.

**Example** (Deriving HTTP API endpoints from an entity)

```ts
import { Layer, Schema } from "effect"
import { ClusterSchema, Entity, EntityProxy, EntityProxyServer } from "effect/unstable/cluster"
import { HttpApi, HttpApiBuilder } from "effect/unstable/httpapi"
import { Rpc } from "effect/unstable/rpc"

export const Counter = Entity.make("Counter", [
  Rpc.make("Increment", {
    payload: { id: Schema.String, amount: Schema.Number },
    primaryKey: ({ id }) => id,
    success: Schema.Number
  })
]).annotateRpcs(ClusterSchema.Persisted, true)

// Use EntityProxy.toHttpApiGroup to create a `HttpApiGroup` from the
// Counter entity
export class MyApi extends HttpApi.make("api").add(EntityProxy.toHttpApiGroup("counter", Counter).prefix("/counter")) {}

// Use EntityProxyServer.layerHttpApi to create a layer that implements
// the handlers for the HttpApiGroup
const ApiLayer = HttpApiBuilder.layer(MyApi).pipe(
  Layer.provide(EntityProxyServer.layerHttpApi(MyApi, "counter", Counter))
)
```

**Signature**

```ts
declare const toHttpApiGroup: <const Name extends string, Type extends string, Rpcs extends Rpc.Any>(
  name: Name,
  entity: Entity.Entity<Type, Rpcs>
) => HttpApiGroup.HttpApiGroup<Name, ConvertHttpApi<Rpcs>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EntityProxy.ts#L183)

Since v4.0.0

## toRpcGroup

Derives an `RpcGroup` from an `Entity`.

**Example** (Deriving RPC endpoints from an entity)

```ts
import { Layer, Schema } from "effect"
import { ClusterSchema, Entity, EntityProxy, EntityProxyServer } from "effect/unstable/cluster"
import { Rpc, RpcServer } from "effect/unstable/rpc"

export const Counter = Entity.make("Counter", [
  Rpc.make("Increment", {
    payload: { id: Schema.String, amount: Schema.Number },
    primaryKey: ({ id }) => id,
    success: Schema.Number
  })
]).annotateRpcs(ClusterSchema.Persisted, true)

// Use EntityProxy.toRpcGroup to create a `RpcGroup` from the Counter entity
export class MyRpcs extends EntityProxy.toRpcGroup(Counter) {}

// Use EntityProxyServer.layerRpcHandlers to create a layer that implements
// the rpc handlers
const RpcServerLayer = RpcServer.layer(MyRpcs).pipe(Layer.provide(EntityProxyServer.layerRpcHandlers(Counter)))
```

**Signature**

```ts
declare const toRpcGroup: <Type extends string, Rpcs extends Rpc.Any>(
  entity: Entity.Entity<Type, Rpcs>
) => RpcGroup.RpcGroup<ConvertRpcs<Rpcs, Type>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EntityProxy.ts#L58)

Since v4.0.0

# converting

## ConvertHttpApi (type alias)

Type-level conversion used by `toHttpApiGroup`.

**Details**

For each entity RPC, this creates a POST endpoint at `/<tag>/:entityId` and a
discard endpoint at `/<tag>/:entityId/discard`, including cluster client
errors.

**Signature**

```ts
type ConvertHttpApi<Rpcs> =
  Rpcs extends Rpc.Rpc<infer _Tag, infer _Payload, infer _Success, infer _Error, infer _Middleware, infer _Requires>
    ?
        | HttpApiEndpoint.HttpApiEndpoint<
            _Tag,
            "POST",
            `/${Lowercase<_Tag>}/:entityId`,
            Schema.Struct<{ entityId: typeof EntityId }>,
            never,
            _Payload,
            never,
            _Success,
            _Error | typeof MailboxFull | typeof AlreadyProcessingMessage | typeof PersistenceError
          >
        | HttpApiEndpoint.HttpApiEndpoint<
            `${_Tag}Discard`,
            "POST",
            `/${Lowercase<_Tag>}/:entityId/discard`,
            Schema.Struct<{ entityId: typeof EntityId }>,
            never,
            _Payload,
            never,
            Schema.Void,
            typeof MailboxFull | typeof AlreadyProcessingMessage | typeof PersistenceError
          >
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EntityProxy.ts#L230)

Since v4.0.0

## ConvertRpcs (type alias)

Type-level conversion used by `toRpcGroup`.

**Details**

For each entity RPC, this creates a prefixed request RPC and a discard RPC
whose payload includes `entityId`, and whose errors include cluster client
errors.

**Signature**

```ts
type ConvertRpcs<Rpcs, Prefix> =
  Rpcs extends Rpc.Rpc<infer _Tag, infer _Payload, infer _Success, infer _Error, infer _Middleware, infer _Requires>
    ?
        | Rpc.Rpc<
            `${Prefix}.${_Tag}`,
            Schema.Struct<{
              entityId: typeof Schema.String
              payload: _Payload
            }>,
            _Success,
            Schema.Codec<
              _Error["Type"] | MailboxFull | AlreadyProcessingMessage | PersistenceError,
              | _Error["Encoded"]
              | (typeof MailboxFull)["Encoded"]
              | (typeof AlreadyProcessingMessage)["Encoded"]
              | (typeof PersistenceError)["Encoded"],
              _Error["DecodingServices"],
              _Error["EncodingServices"]
            >
          >
        | Rpc.Rpc<
            `${Prefix}.${_Tag}Discard`,
            Schema.Struct<{
              entityId: typeof Schema.String
              payload: _Payload
            }>,
            typeof Schema.Void,
            Schema.Union<[typeof MailboxFull, typeof AlreadyProcessingMessage, typeof PersistenceError]>
          >
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EntityProxy.ts#L101)

Since v4.0.0
