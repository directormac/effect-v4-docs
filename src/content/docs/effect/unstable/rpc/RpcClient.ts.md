---
title: RpcClient.ts
nav_order: 313
parent: "effect"
---

## RpcClient.ts overview

Runs typed RPC calls from the client side.

This module turns RPC definitions from an `RpcGroup` into callable client
methods. Each call encodes its payload, sends a message through the active
`Protocol`, decodes exits or stream chunks from the server, and routes the
response back to the waiting `Effect`, `Stream`, or queue. It also defines
the protocol service and includes protocol layers for HTTP, sockets, and
workers.

Since v4.0.0

---

## Exports Grouped by Category

- [client](#client)
  - [FromGroup (type alias)](#fromgroup-type-alias)
  - [RpcClient (type alias)](#rpcclient-type-alias)
  - [make](#make)
  - [makeNoSerialization](#makenoserialization)
- [connection hooks](#connection-hooks)
  - [ConnectionHooks (class)](#connectionhooks-class)
- [headers](#headers)
  - [CurrentHeaders](#currentheaders)
  - [withHeaders](#withheaders)
- [protocols](#protocols)
  - [Protocol (class)](#protocol-class)
  - [layerProtocolHttp](#layerprotocolhttp)
  - [layerProtocolSocket](#layerprotocolsocket)
  - [layerProtocolWorker](#layerprotocolworker)
  - [makeProtocolHttp](#makeprotocolhttp)
  - [makeProtocolSocket](#makeprotocolsocket)
  - [makeProtocolWorker](#makeprotocolworker)
- [utils](#utils)
  - [RpcClient (namespace)](#rpcclient-namespace)
    - [From (type alias)](#from-type-alias)
    - [Flat (type alias)](#flat-type-alias)

---

# client

## FromGroup (type alias)

Derives the object-shaped RPC client type for all RPCs contained in an
`RpcGroup`.

**Signature**

```ts
type { [K in keyof RpcClient.From<RpcGroup.Rpcs<Group>, E>]: RpcClient.From<RpcGroup.Rpcs<Group>, E>[K]; } = RpcClient<RpcGroup.Rpcs<Group>, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcClient.ts#L205)

Since v4.0.0

## RpcClient (type alias)

The object-shaped client generated from a union of RPC definitions, with one
method per RPC tag.

**Signature**

```ts
type { [K in keyof RpcClient.From<Rpcs, E>]: RpcClient.From<Rpcs, E>[K]; } = Struct.Simplify<RpcClient.From<Rpcs, E>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcClient.ts#L60)

Since v4.0.0

## make

Creates a schema-aware RPC client for a group using the current client
`Protocol`, encoding requests and decoding server responses.

**Signature**

```ts
declare const make: <Rpcs extends Rpc.Any, const Flatten extends boolean = false>(
  group: RpcGroup.RpcGroup<Rpcs>,
  options?:
    | {
        readonly spanPrefix?: string | undefined
        readonly spanAttributes?: Record<string, unknown> | undefined
        readonly generateRequestId?: (() => RequestId) | undefined
        readonly disableTracing?: boolean | undefined
        readonly flatten?: Flatten | undefined
      }
    | undefined
) => Effect.Effect<
  Flatten extends true ? RpcClient.Flat<Rpcs, RpcClientError> : RpcClient<Rpcs, RpcClientError>,
  never,
  Protocol | Rpc.MiddlewareClient<Rpcs> | Scope.Scope
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcClient.ts#L627)

Since v4.0.0

## makeNoSerialization

Creates an RPC client for an already-decoded message channel, returning the
client API together with a `write` function for delivering server messages
back to the client.

**Signature**

```ts
declare const makeNoSerialization: <Rpcs extends Rpc.Any, E, const Flatten extends boolean = false>(
  group: RpcGroup.RpcGroup<Rpcs>,
  options: {
    readonly onFromClient: (options: {
      readonly message: FromClient<Rpcs>
      readonly context: Context.Context<never>
      readonly discard: boolean
    }) => Effect.Effect<void, E>
    readonly supportsAck?: boolean | undefined
    readonly spanPrefix?: string | undefined
    readonly spanAttributes?: Record<string, unknown> | undefined
    readonly generateRequestId?: (() => RequestId) | undefined
    readonly disableTracing?: boolean | undefined
    readonly flatten?: Flatten | undefined
  }
) => Effect.Effect<
  {
    readonly client: Flatten extends true ? RpcClient.Flat<Rpcs, E> : RpcClient<Rpcs, E>
    readonly write: (message: FromServer<Rpcs>) => Effect.Effect<void>
  },
  never,
  Scope.Scope | Rpc.MiddlewareClient<Rpcs>
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcClient.ts#L217)

Since v4.0.0

# connection hooks

## ConnectionHooks (class)

Represents optional client protocol hooks that run when a transport connects
and disconnects.

**When to use**

Use to run setup or cleanup effects when an RPC client transport opens or
closes.

**Signature**

```ts
declare class ConnectionHooks
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcClient.ts#L1385)

Since v4.0.0

# headers

## CurrentHeaders

Fiber reference containing headers that are merged into outgoing RPC
client requests.

**When to use**

Use to set request headers that should be automatically merged into outgoing
RPC client messages.

**Signature**

```ts
declare const CurrentHeaders: Context.Reference<Headers.Headers>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcClient.ts#L812)

Since v4.0.0

## withHeaders

Runs an effect with additional RPC client headers, merging them with the
current `CurrentHeaders` value for outgoing requests.

**Signature**

```ts
declare const withHeaders: {
  (headers: Headers.Input): <A, E, R>(effect: Effect.Effect<A, E, R>) => Effect.Effect<A, E, R>
  <A, E, R>(effect: Effect.Effect<A, E, R>, headers: Headers.Input): Effect.Effect<A, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcClient.ts#L823)

Since v4.0.0

# protocols

## Protocol (class)

Defines the service interface for an RPC client transport, responsible for running the
receive loop and sending encoded client messages.

**When to use**

Use to provide the transport boundary for RPC clients over HTTP, WebSocket,
workers, sockets, or custom protocols.

**Signature**

```ts
declare class Protocol
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcClient.ts#L844)

Since v4.0.0

## layerProtocolHttp

Provides a client `Protocol` backed by `HttpClient`, targeting the configured
URL and optionally transforming the client before use.

**Signature**

```ts
declare const layerProtocolHttp: (options: {
  readonly url: string
  readonly transformClient?: <E, R>(client: HttpClient.HttpClient.With<E, R>) => HttpClient.HttpClient.With<E, R>
}) => Layer.Layer<Protocol, never, RpcSerialization.RpcSerialization | HttpClient.HttpClient>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcClient.ts#L985)

Since v4.0.0

## layerProtocolSocket

Provides a client `Protocol` backed by the current `Socket` and
`RpcSerialization` services.

**Signature**

```ts
declare const layerProtocolSocket: (options?: {
  readonly retryTransientErrors?: boolean | undefined
}) => Layer.Layer<Protocol, never, Socket.Socket | RpcSerialization.RpcSerialization>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcClient.ts#L1174)

Since v4.0.0

## layerProtocolWorker

Provides a client `Protocol` backed by a worker pool using the current worker
platform and spawner services.

**Signature**

```ts
declare const layerProtocolWorker: (
  options:
    | {
        readonly size: number
        readonly concurrency?: number | undefined
        readonly targetUtilization?: number | undefined
      }
    | {
        readonly minSize: number
        readonly maxSize: number
        readonly concurrency?: number | undefined
        readonly targetUtilization?: number | undefined
        readonly timeToLive: Duration.Input
      }
) => Layer.Layer<Protocol, WorkerError, Worker.WorkerPlatform | Worker.Spawner>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcClient.ts#L1355)

Since v4.0.0

## makeProtocolHttp

Creates a client `Protocol` that sends each RPC request through the supplied
`HttpClient` and decodes responses with the current `RpcSerialization`.

**Signature**

```ts
declare const makeProtocolHttp: (
  client: HttpClient.HttpClient
) => Effect.Effect<Protocol["Service"], never, RpcSerialization.RpcSerialization>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcClient.ts#L872)

Since v4.0.0

## makeProtocolSocket

Creates a client `Protocol` over the current `Socket`, using the current
`RpcSerialization`, connection hooks, ping timeouts, and the configured retry
policy.

**Signature**

```ts
declare const makeProtocolSocket: (options?: {
  readonly retryTransientErrors?: boolean | undefined
  readonly retryPolicy?: Schedule.Schedule<any, Socket.SocketError> | undefined
}) => Effect.Effect<Protocol["Service"], never, Scope.Scope | RpcSerialization.RpcSerialization | Socket.Socket>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcClient.ts#L1007)

Since v4.0.0

## makeProtocolWorker

Creates a client `Protocol` backed by a pool of workers, routing RPC requests
to workers and supporting transferable values when the platform does.

**Signature**

```ts
declare const makeProtocolWorker: (
  options:
    | {
        readonly size: number
        readonly concurrency?: number | undefined
        readonly targetUtilization?: number | undefined
      }
    | {
        readonly minSize: number
        readonly maxSize: number
        readonly concurrency?: number | undefined
        readonly targetUtilization?: number | undefined
        readonly timeToLive: Duration.Input
      }
) => Effect.Effect<Protocol["Service"], WorkerError, Scope.Scope | Worker.WorkerPlatform | Worker.Spawner>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcClient.ts#L1189)

Since v4.0.0

# utils

## RpcClient (namespace)

Type-level helpers for deriving RPC client call signatures from RPC
definitions.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcClient.ts#L68)

Since v4.0.0

### From (type alias)

Builds an object client type from an RPC union, mapping each RPC tag to a
method that accepts the RPC payload and returns either an `Effect` or
`Stream` based on the RPC success schema.

**Signature**

```ts
type From<Rpcs, E> = {
  readonly [Current in Rpcs as Current["_tag"]]: <const AsQueue extends boolean = false, const Discard = false>(
    input: Rpc.PayloadConstructor<Current>,
    options?: Rpc.Success<Current> extends Stream.Stream<infer _A, infer _E, infer _R>
      ? {
          readonly asQueue?: AsQueue | undefined
          readonly streamBufferSize?: number | undefined
          readonly headers?: Headers.Input | undefined
          readonly context?: Context.Context<never> | undefined
        }
      : {
          readonly headers?: Headers.Input | undefined
          readonly context?: Context.Context<never> | undefined
          readonly discard?: Discard | undefined
        }
  ) => Current extends Rpc.Rpc<
    infer _Tag,
    infer _Payload,
    infer _Success,
    infer _Error,
    infer _Middleware,
    infer _Requires
  >
    ? [_Success] extends [RpcSchema.Stream<infer _A, infer _E>]
      ? AsQueue extends true
        ? Effect.Effect<
            Queue.Dequeue<
              _A["Type"],
              _E["Type"] | _Error["Type"] | E | _Middleware["error"]["Type"] | _Middleware["~ClientError"] | Cause.Done
            >,
            never,
            | Scope.Scope
            | _Payload["EncodingServices"]
            | _Success["DecodingServices"]
            | _Error["DecodingServices"]
            | _Middleware["error"]["DecodingServices"]
          >
        : Stream.Stream<
            _A["Type"],
            _E["Type"] | _Error["Type"] | E | _Middleware["error"]["Type"] | _Middleware["~ClientError"],
            | _Payload["EncodingServices"]
            | _Success["DecodingServices"]
            | _Error["DecodingServices"]
            | _Middleware["error"]["DecodingServices"]
          >
      : Effect.Effect<
          Discard extends true ? void : _Success["Type"],
          | (Discard extends true ? never : _Error["Type"])
          | E
          | _Middleware["error"]["Type"]
          | _Middleware["~ClientError"],
          | _Payload["EncodingServices"]
          | _Success["DecodingServices"]
          | _Error["DecodingServices"]
          | _Middleware["error"]["DecodingServices"]
        >
    : never
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcClient.ts#L77)

Since v4.0.0

### Flat (type alias)

Builds a flattened RPC client function that accepts an RPC tag and payload,
returning the corresponding `Effect` or `Stream` for that RPC.

**Signature**

```ts
type Flat<Rpcs, E> = <const Tag extends Rpcs["_tag"], const AsQueue extends boolean = false, const Discard = false>(
  tag: Tag,
  payload: Rpc.PayloadConstructor<Rpc.ExtractTag<Rpcs, Tag>>,
  options?: Rpc.Success<Rpc.ExtractTag<Rpcs, Tag>> extends Stream.Stream<infer _A, infer _E, infer _R>
    ? {
        readonly asQueue?: AsQueue | undefined
        readonly streamBufferSize?: number | undefined
        readonly headers?: Headers.Input | undefined
        readonly context?: Context.Context<never> | undefined
      }
    : {
        readonly headers?: Headers.Input | undefined
        readonly context?: Context.Context<never> | undefined
        readonly discard?: Discard | undefined
      }
) => Rpc.ExtractTag<Rpcs, Tag> extends Rpc.Rpc<
  infer _Tag,
  infer _Payload,
  infer _Success,
  infer _Error,
  infer _Middleware,
  infer _Requires
>
  ? [_Success] extends [RpcSchema.Stream<infer _A, infer _E>]
    ? AsQueue extends true
      ? Effect.Effect<
          Queue.Dequeue<
            _A["Type"],
            _E["Type"] | _Error["Type"] | E | _Middleware["error"]["Type"] | _Middleware["~ClientError"]
          >,
          never,
          | Scope.Scope
          | _Payload["EncodingServices"]
          | _Success["DecodingServices"]
          | _Error["DecodingServices"]
          | _Middleware["error"]["DecodingServices"]
        >
      : Stream.Stream<
          _A["Type"],
          _E["Type"] | _Error["Type"] | E | _Middleware["error"]["Type"] | _Middleware["~ClientError"],
          | _Payload["EncodingServices"]
          | _Success["DecodingServices"]
          | _Error["DecodingServices"]
          | _Middleware["error"]["DecodingServices"]
        >
    : Effect.Effect<
        Discard extends true ? void : _Success["Type"],
        | (Discard extends true ? never : _Error["Type"])
        | E
        | _Middleware["error"]["Type"]
        | _Middleware["~ClientError"],
        | _Payload["EncodingServices"]
        | _Success["DecodingServices"]
        | _Error["DecodingServices"]
        | _Middleware["error"]["DecodingServices"]
      >
  : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcClient.ts#L142)

Since v4.0.0
