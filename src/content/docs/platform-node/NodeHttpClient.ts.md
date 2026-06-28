---
title: NodeHttpClient.ts
nav_order: 8
parent: "@effect/platform-node"
---

## NodeHttpClient.ts overview

Node.js implementations of the Effect `HttpClient`.

This module supplies Node runtime backends for the platform-independent
Effect HTTP client API. It re-exports the fetch-based `Fetch`, `RequestInit`,
and `layerFetch` APIs, defines an Undici-backed client with dispatcher
services and request options, and defines a lower-level `node:http` /
`node:https` client with scoped HTTP agent layers.

Since v4.0.0

---

## Exports Grouped by Category

- [Dispatcher](#dispatcher)
  - [Dispatcher (class)](#dispatcher-class)
  - [dispatcherLayerGlobal](#dispatcherlayerglobal)
  - [layerDispatcher](#layerdispatcher)
  - [makeDispatcher](#makedispatcher)
- [HttpAgent](#httpagent)
  - [HttpAgent (class)](#httpagent-class)
  - [layerAgent](#layeragent)
  - [layerAgentOptions](#layeragentoptions)
  - [makeAgent](#makeagent)
- [Undici](#undici)
  - [UndiciOptions](#undicioptions)
  - [layerUndici](#layerundici)
  - [layerUndiciNoDispatcher](#layerundicinodispatcher)
  - [makeUndici](#makeundici)
- [fetch](#fetch)
  - [Fetch](#fetch-1)
  - [RequestInit](#requestinit)
  - [layerFetch](#layerfetch)
- [node:http](#nodehttp)
  - [layerNodeHttp](#layernodehttp)
  - [layerNodeHttpNoAgent](#layernodehttpnoagent)
  - [makeNodeHttp](#makenodehttp)

---

# Dispatcher

## Dispatcher (class)

Service tag for the Undici `Dispatcher` used by the Undici-backed HTTP
client.

**Signature**

```ts
declare class Dispatcher
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeHttpClient.ts#L89)

Since v4.0.0

## dispatcherLayerGlobal

Provides the `Dispatcher` service from Undici's process-global dispatcher,
without creating or owning a new agent.

**Signature**

```ts
declare const dispatcherLayerGlobal: Layer.Layer<Dispatcher, never, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeHttpClient.ts#L120)

Since v4.0.0

## layerDispatcher

Provides the `Dispatcher` service using a scoped Undici `Agent`.

**Signature**

```ts
declare const layerDispatcher: Layer.Layer<Dispatcher, never, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeHttpClient.ts#L111)

Since v4.0.0

## makeDispatcher

Acquires a new Undici `Agent` dispatcher and destroys it when the enclosing
scope is finalized.

**Signature**

```ts
declare const makeDispatcher: Effect.Effect<Undici.Dispatcher, never, Scope.Scope>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeHttpClient.ts#L100)

Since v4.0.0

# HttpAgent

## HttpAgent (class)

Service tag for the paired Node `http` and `https` agents used by the
node:http-backed HTTP client.

**Signature**

```ts
declare class HttpAgent
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeHttpClient.ts#L385)

Since v4.0.0

## layerAgent

Provides the `HttpAgent` service using default scoped Node `http` and
`https` agents.

**Signature**

```ts
declare const layerAgent: Layer.Layer<HttpAgent, never, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeHttpClient.ts#L428)

Since v4.0.0

## layerAgentOptions

Provides the `HttpAgent` service using scoped Node `http` and `https`
agents configured with the supplied options.

**Signature**

```ts
declare const layerAgentOptions: (options?: Https.AgentOptions | undefined) => Layer.Layer<HttpAgent>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeHttpClient.ts#L417)

Since v4.0.0

## makeAgent

Acquires Node `http` and `https` agents with the supplied options and
destroys both agents when the enclosing scope is finalized.

**Signature**

```ts
declare const makeAgent: (options?: Https.AgentOptions) => Effect.Effect<HttpAgent["Service"], never, Scope.Scope>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeHttpClient.ts#L397)

Since v4.0.0

# Undici

## UndiciOptions

Fiber reference containing default Undici request options applied to requests
sent by `makeUndici`.

**Signature**

```ts
declare const UndiciOptions: Context.Reference<Partial<Undici.Dispatcher.RequestOptions<null>>>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeHttpClient.ts#L129)

Since v4.0.0

## layerUndici

Provides an Undici-backed `HttpClient` together with a scoped default
Undici `Agent` dispatcher.

**Signature**

```ts
declare const layerUndici: Layer.Layer<Client.HttpClient, never, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeHttpClient.ts#L372)

Since v4.0.0

## layerUndiciNoDispatcher

Provides an Undici-backed `HttpClient` using the current `Dispatcher`
service.

**Signature**

```ts
declare const layerUndiciNoDispatcher: Layer.Layer<Client.HttpClient, never, Dispatcher>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeHttpClient.ts#L359)

Since v4.0.0

## makeUndici

Creates an `HttpClient` that sends requests through the current Undici
`Dispatcher`, converts Effect HTTP bodies to Undici bodies, and maps
transport and decode failures to `HttpClientError`.

**Signature**

```ts
declare const makeUndici: Effect.Effect<Client.HttpClient, never, Dispatcher>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeHttpClient.ts#L142)

Since v4.0.0

# fetch

## Fetch

Provides a fetch-based HTTP client implementation for Node.js.

**When to use**

Use to access or override the fetch implementation used by the Node
fetch-based HTTP client.

**Signature**

```ts
declare const Fetch: Context.Reference<{
  (input: RequestInfo | URL, init?: RequestInit): Promise<Response>
  (input: string | URL | Request, init?: RequestInit): Promise<Response>
}>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeHttpClient.ts#L57)

Since v4.0.0

## RequestInit

Provides request initialization options accepted by the fetch-based HTTP client.

**When to use**

Use to provide default fetch request options for Node HTTP requests.

**Signature**

```ts
declare const RequestInit: typeof RequestInit
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeHttpClient.ts#L75)

Since v4.0.0

## layerFetch

Layer that provides the fetch-based HTTP client implementation.

**Signature**

```ts
declare const layerFetch: Layer.Layer<Client.HttpClient, never, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeHttpClient.ts#L64)

Since v4.0.0

# node:http

## layerNodeHttp

Provides a node:http-backed `HttpClient` together with default scoped Node
`http` and `https` agents.

**Signature**

```ts
declare const layerNodeHttp: Layer.Layer<Client.HttpClient, never, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeHttpClient.ts#L664)

Since v4.0.0

## layerNodeHttpNoAgent

Provides a node:http-backed `HttpClient` using the current `HttpAgent`
service.

**Signature**

```ts
declare const layerNodeHttpNoAgent: Layer.Layer<Client.HttpClient, never, HttpAgent>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeHttpClient.ts#L651)

Since v4.0.0

## makeNodeHttp

Creates an `HttpClient` backed by Node `http` and `https`, using the
current `HttpAgent`, streaming request bodies, and wrapping Node responses
as `HttpClientResponse` values.

**Signature**

```ts
declare const makeNodeHttp: Effect.Effect<Client.HttpClient, never, HttpAgent>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeHttpClient.ts#L438)

Since v4.0.0
