---
title: RpcTest.ts
nav_order: 321
parent: "effect"
---

## RpcTest.ts overview

In-memory test harness for RPC groups.

`RpcTest` connects a generated client directly to `RpcServer` handlers for
the same `RpcGroup`. It uses the no-serialization path, so requests,
responses, stream chunks, acknowledgements, interrupts, headers, and
middleware metadata travel through the normal client/server machinery without
opening HTTP, socket, worker, or serializer infrastructure.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [makeClient](#makeclient)

---

# constructors

## makeClient

Creates an in-memory RPC client for a group, backed by the group's handlers
from the environment and using the no-serialization test transport.

**Signature**

```ts
declare const makeClient: <Rpcs extends Rpc.Any, const Flatten extends boolean = false>(
  group: RpcGroup.RpcGroup<Rpcs>,
  options?: { readonly flatten?: Flatten | undefined }
) => Effect.Effect<
  Flatten extends true ? RpcClient.RpcClient.Flat<Rpcs> : RpcClient.RpcClient<Rpcs>,
  never,
  Scope.Scope | Rpc.ToHandler<Rpcs> | Rpc.Middleware<Rpcs> | Rpc.MiddlewareClient<Rpcs>
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcTest.ts#L26)

Since v4.0.0
