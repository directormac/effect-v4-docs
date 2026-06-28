---
title: EntityProxyServer.ts
nav_order: 182
parent: "effect"
---

## EntityProxyServer.ts overview

Serves the proxy APIs generated from clustered entities.

Proxy handlers read the target `entityId`, call the entity client, and
forward the payload to the matching entity RPC method. This module provides
handlers for HTTP API groups created by `EntityProxy.toHttpApiGroup` and RPC
handler services for RPC groups created by `EntityProxy.toRpcGroup`. Both
normal requests and discard requests are forwarded to the underlying entity
client.

Since v4.0.0

---

## Exports Grouped by Category

- [layers](#layers)
  - [layerHttpApi](#layerhttpapi)
  - [layerRpcHandlers](#layerrpchandlers)
- [services](#services)
  - [RpcHandlers (type alias)](#rpchandlers-type-alias)

---

# layers

## layerHttpApi

Creates HTTP API handlers for an entity proxy group.

**Details**

Each generated endpoint reads the `entityId` path parameter and forwards the
request payload to the corresponding entity client method, including discard
endpoints.

**Signature**

```ts
declare const layerHttpApi: <
  ApiId extends string,
  Groups extends HttpApiGroup.Any,
  Name extends HttpApiGroup.Name<Groups>,
  Type extends string,
  Rpcs extends Rpc.Any
>(
  api: HttpApi.HttpApi<ApiId, Groups>,
  name: Name,
  entity: Entity.Entity<Type, Rpcs>
) => Layer.Layer<HttpApiGroup.ApiGroup<ApiId, Name>, never, Sharding | Rpc.ServicesServer<Rpcs>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EntityProxyServer.ts#L35)

Since v4.0.0

## layerRpcHandlers

Creates RPC handlers for the group produced by `EntityProxy.toRpcGroup`.

**Details**

The handlers forward each prefixed proxy RPC to the target entity client using
the `entityId` embedded in the proxy payload.

**Signature**

```ts
declare const layerRpcHandlers: <const Type extends string, Rpcs extends Rpc.Any>(
  entity: Entity.Entity<Type, Rpcs>
) => Layer.Layer<RpcHandlers<Rpcs, Type>, never, Sharding | Rpc.ServicesServer<Rpcs>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EntityProxyServer.ts#L102)

Since v4.0.0

# services

## RpcHandlers (type alias)

Union of RPC handler services required to serve the proxy RPCs for an entity.

**Details**

Includes both the normal prefixed RPC handler and its discard variant.

**Signature**

```ts
type RpcHandlers<Rpcs, Prefix> =
  Rpcs extends Rpc.Rpc<infer _Tag, infer _Payload, infer _Success, infer _Error, infer _Middleware, infer _Requires>
    ? Rpc.Handler<`${Prefix}.${_Tag}`> | Rpc.Handler<`${Prefix}.${_Tag}Discard`>
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EntityProxyServer.ts#L141)

Since v4.0.0
