---
title: WorkflowProxy.ts
nav_order: 352
parent: "effect"
---

## WorkflowProxy.ts overview

RPC and HTTP API definitions for workflows.

Given one or more `Workflow` values, `toRpcGroup` creates the RPC definitions
for clients and servers, while `toHttpApiGroup` creates HTTP POST endpoints
that can be mounted in an API. Each workflow gets execute, discard, and
resume operations, so callers can start a workflow or resume a suspended run
by `executionId` without importing the workflow handler directly.

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

Derives an `HttpApiGroup` from a list of workflows.

**Example** (Deriving HTTP API endpoints from workflows)

```ts
import { Layer, Schema } from "effect"
import { HttpApi, HttpApiBuilder } from "effect/unstable/httpapi"
import { Workflow, WorkflowProxy, WorkflowProxyServer } from "effect/unstable/workflow"

const EmailWorkflow = Workflow.make("EmailWorkflow", {
  payload: {
    id: Schema.String,
    to: Schema.String
  },
  idempotencyKey: ({ id }) => id
})

const myWorkflows = [EmailWorkflow] as const

// Use WorkflowProxy.toHttpApiGroup to create a `HttpApiGroup` from the
// workflows
class MyApi extends HttpApi.make("api").add(WorkflowProxy.toHttpApiGroup("workflows", myWorkflows)) {}

// Use WorkflowProxyServer.layerHttpApi to create a layer that implements the
// workflows HttpApiGroup
const ApiLayer = HttpApiBuilder.layer(MyApi).pipe(
  Layer.provide(WorkflowProxyServer.layerHttpApi(MyApi, "workflows", myWorkflows))
)
```

**Signature**

```ts
declare const toHttpApiGroup: <const Name extends string, const Workflows extends NonEmptyReadonlyArray<Workflow.Any>>(
  name: Name,
  workflows: Workflows
) => HttpApiGroup.HttpApiGroup<Name, ConvertHttpApi<Workflows[number]>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/WorkflowProxy.ts#L139)

Since v4.0.0

## toRpcGroup

Derives an `RpcGroup` from a list of workflows.

**Example** (Deriving RPC endpoints from workflows)

```ts
import { Layer, Schema } from "effect"
import { RpcServer } from "effect/unstable/rpc"
import { Workflow, WorkflowProxy, WorkflowProxyServer } from "effect/unstable/workflow"

const EmailWorkflow = Workflow.make("EmailWorkflow", {
  payload: {
    id: Schema.String,
    to: Schema.String
  },
  idempotencyKey: ({ id }) => id
})

const myWorkflows = [EmailWorkflow] as const

// Use WorkflowProxy.toRpcGroup to create a `RpcGroup` from the
// workflows
class MyRpcs extends WorkflowProxy.toRpcGroup(myWorkflows) {}

// Use WorkflowProxyServer.layerRpcHandlers to create a layer that implements
// the rpc handlers
const ApiLayer = RpcServer.layer(MyRpcs).pipe(Layer.provide(WorkflowProxyServer.layerRpcHandlers(myWorkflows)))
```

**Signature**

```ts
declare const toRpcGroup: <
  const Workflows extends NonEmptyReadonlyArray<Workflow.Any>,
  const Prefix extends string = ""
>(
  workflows: Workflows,
  options?: { readonly prefix?: Prefix | undefined }
) => RpcGroup.RpcGroup<ConvertRpcs<Workflows[number], Prefix>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/WorkflowProxy.ts#L54)

Since v4.0.0

# converting

## ConvertHttpApi (type alias)

Maps each workflow to the HTTP API endpoints generated for execute,
discard, and resume operations.

**Signature**

```ts
type ConvertHttpApi<Workflows> =
  Workflows extends Workflow.Workflow<infer _Name, infer _Payload, infer _Success, infer _Error>
    ?
        | HttpApiEndpoint.HttpApiEndpoint<
            _Name,
            "POST",
            `/${Lowercase<_Name>}`,
            never,
            never,
            _Payload,
            never,
            _Success,
            _Error
          >
        | HttpApiEndpoint.HttpApiEndpoint<
            `${_Name}Discard`,
            "POST",
            `/${Lowercase<_Name>}/discard`,
            never,
            never,
            _Payload
          >
        | HttpApiEndpoint.HttpApiEndpoint<
            `${_Name}Resume`,
            "POST",
            `/${Lowercase<_Name>}/resume`,
            never,
            never,
            typeof ResumePayload
          >
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/WorkflowProxy.ts#L177)

Since v4.0.0

## ConvertRpcs (type alias)

Maps each workflow to the RPC definitions generated for execute, discard,
and resume operations.

**Signature**

```ts
type ConvertRpcs<Workflows, Prefix> =
  Workflows extends Workflow.Workflow<infer _Name, infer _Payload, infer _Success, infer _Error>
    ?
        | Rpc.Rpc<`${Prefix}${_Name}`, _Payload, _Success, _Error>
        | Rpc.Rpc<`${Prefix}${_Name}Discard`, _Payload>
        | Rpc.Rpc<`${Prefix}${_Name}Resume`, typeof ResumePayload>
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/WorkflowProxy.ts#L90)

Since v4.0.0
