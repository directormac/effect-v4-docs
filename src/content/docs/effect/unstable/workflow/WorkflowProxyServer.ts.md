---
title: WorkflowProxyServer.ts
nav_order: 353
parent: "effect"
---

## WorkflowProxyServer.ts overview

Server-side layers for workflow proxy APIs.

`layerHttpApi` connects the HTTP API group created by `WorkflowProxy` to the
supplied workflows. `layerRpcHandlers` does the same for the generated RPC
definitions. Both layers route execute, discard, and resume requests to the
matching workflow operation, while the `WorkflowEngine` and workflow handler
services stay on the server side.

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

Creates handlers for a workflow HTTP API group, wiring execute, discard, and
resume endpoints to the supplied workflows.

**Signature**

```ts
declare const layerHttpApi: <
  ApiId extends string,
  Groups extends HttpApiGroup.Any,
  Name extends HttpApiGroup.Name<Groups>,
  const Workflows extends NonEmptyReadonlyArray<Workflow.Any>
>(
  api: HttpApi.HttpApi<ApiId, Groups>,
  name: Name,
  workflows: Workflows
) => Layer.Layer<
  HttpApiGroup.ApiGroup<ApiId, Name>,
  never,
  WorkflowEngine | Workflow.RequirementsHandler<Workflows[number]>
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/WorkflowProxyServer.ts#L30)

Since v4.0.0

## layerRpcHandlers

Creates RPC handlers for the supplied workflows, wiring execute, discard,
and resume RPCs to workflow operations.

**Signature**

```ts
declare const layerRpcHandlers: <
  const Workflows extends NonEmptyReadonlyArray<Workflow.Any>,
  const Prefix extends string = ""
>(
  workflows: Workflows,
  options?: { readonly prefix?: Prefix }
) => Layer.Layer<
  RpcHandlers<Workflows[number], Prefix>,
  never,
  WorkflowEngine | Workflow.RequirementsHandler<Workflows[number]>
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/WorkflowProxyServer.ts#L97)

Since v4.0.0

# services

## RpcHandlers (type alias)

Union of RPC handler services required to serve the generated workflow
execute, discard, and resume RPCs.

**Signature**

```ts
type RpcHandlers<Workflows, Prefix> =
  Workflows extends Workflow.Workflow<infer _Name, infer _Payload, infer _Success, infer _Error>
    ?
        | Rpc.Handler<`${Prefix}${_Name}`>
        | Rpc.Handler<`${Prefix}${_Name}Discard`>
        | Rpc.Handler<`${Prefix}${_Name}Resume`>
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/WorkflowProxyServer.ts#L145)

Since v4.0.0
