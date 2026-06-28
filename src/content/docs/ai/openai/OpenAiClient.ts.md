---
title: OpenAiClient.ts
nav_order: 2
parent: "@effect/ai-openai"
---

## OpenAiClient.ts overview

The `OpenAiClient` module defines the low-level Effect service used by the
OpenAI integration for Responses API and embedding requests. It builds a
configured HTTP client with authentication and OpenAI organization or project
headers, exposes helpers for non-streaming responses, SSE response streams,
WebSocket response streams, and embeddings, and maps transport or decoding
failures into `AiError`.

Since v4.0.0

---

## Exports Grouped by Category

- [Events](#events)
  - [ResponseStreamEvent (type alias)](#responsestreamevent-type-alias)
- [Websocket mode](#websocket-mode)
  - [OpenAiSocket (class)](#openaisocket-class)
  - [layerWebSocketMode](#layerwebsocketmode)
  - [withWebSocketMode](#withwebsocketmode)
- [constructors](#constructors)
  - [make](#make)
- [layers](#layers)
  - [layer](#layer)
  - [layerConfig](#layerconfig)
- [models](#models)
  - [Service (interface)](#service-interface)
- [options](#options)
  - [Options (type alias)](#options-type-alias)
- [services](#services)
  - [OpenAiClient (class)](#openaiclient-class)

---

# Events

## ResponseStreamEvent (type alias)

Response stream event emitted by the OpenAI Responses API.

**Signature**

```ts
type ResponseStreamEvent = typeof OpenAiSchema.ResponseStreamEvent.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiClient.ts#L430)

Since v4.0.0

# Websocket mode

## OpenAiSocket (class)

Service for creating OpenAI response streams over a WebSocket connection.

**When to use**

Use when you need direct access to the WebSocket-backed response streaming
service rather than wrapping an effect with WebSocket mode.

**Details**

`createResponseStream` sends a `response.create` message over the WebSocket
connection and returns an HTTP response together with a stream of
`ResponseStreamEvent` values.

**Gotchas**

WebSocket response streams are serialized to one request at a time by the
shared socket service.

**See**

- `withWebSocketMode` for enabling WebSocket mode for one effect
- `layerWebSocketMode` for providing WebSocket mode through a layer

**Signature**

```ts
declare class OpenAiSocket
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiClient.ts#L457)

Since v4.0.0

## layerWebSocketMode

Uses OpenAI's websocket mode for all responses that use the Layer.

**When to use**

Use to provide WebSocket mode through layer composition for effects that use
OpenAI response streaming.

**Gotchas**

This only works with the following WebSocket constructor layers:

- `NodeSocket.layerWebSocketConstructorWS`
- `BunSocket.layerWebSocketConstructor`

These constructor layers support the non-standard options needed to set the
Authorization header.

**See**

- `withWebSocketMode` for enabling WebSocket mode around a single effect

**Signature**

```ts
declare const layerWebSocketMode: Layer.Layer<
  OpenAiSocket | ResponseIdTracker.ResponseIdTracker,
  never,
  OpenAiClient | Socket.WebSocketConstructor
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiClient.ts#L726)

Since v4.0.0

## withWebSocketMode

Uses OpenAI's WebSocket mode for response streams within the provided effect.

**When to use**

Use to enable WebSocket mode around one effect that creates OpenAI response
streams.

**Gotchas**

This only works with the following WebSocket constructor layers:

- `NodeSocket.layerWebSocketConstructorWS`
- `BunSocket.layerWebSocketConstructor`

These constructor layers support the non-standard options needed to set the
Authorization header.

**See**

- `layerWebSocketMode` for providing WebSocket mode through a layer
- `OpenAiSocket` for direct access to the WebSocket-backed streaming service

**Signature**

```ts
declare const withWebSocketMode: <A, E, R>(
  effect: Effect.Effect<A, E, R>
) => Effect.Effect<
  A,
  E,
  Exclude<R, OpenAiSocket | ResponseIdTracker.ResponseIdTracker> | OpenAiClient | Socket.WebSocketConstructor
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiClient.ts#L689)

Since v4.0.0

# constructors

## make

Creates an OpenAI client service with the given options.

**When to use**

Use when you need the OpenAI client service value inside an effect.

**Details**

The returned service uses the current `HttpClient`, prepends `apiUrl` or
`https://api.openai.com/v1`, adds the bearer token and optional OpenAI
organization/project headers, accepts JSON responses, filters for successful
HTTP statuses, and applies `transformClient` when provided.

**Gotchas**

A scoped `OpenAiConfig.withClientTransform` is applied when request helpers
run, after the `transformClient` option supplied to `make`.

**See**

- `layer` for providing this client from explicit options
- `layerConfig` for loading client settings from `Config`

**Signature**

```ts
declare const make: (options: Options) => Effect.Effect<Service, never, HttpClient.HttpClient>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiClient.ts#L186)

Since v4.0.0

# layers

## layer

Creates a layer for the OpenAI client with the given options.

**When to use**

Use when you already have explicit `Options` values, such as an API key or
custom API URL, and want to provide `OpenAiClient` as a `Layer`.

**See**

- `make` for constructing the client service effectfully
- `layerConfig` for loading client settings from `Config`

**Signature**

```ts
declare const layer: (options: Options) => Layer.Layer<OpenAiClient, never, HttpClient.HttpClient>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiClient.ts#L346)

Since v4.0.0

## layerConfig

Creates a layer for the OpenAI client from provided `Config` values.

**When to use**

Use when you need client settings for OpenAI-compatible APIs to be read from
Effect `Config` values while providing `OpenAiClient` as a `Layer`.

**Details**

Only config values supplied in `options` are loaded. Omitted fields are
passed to `make` as `undefined`, and `transformClient` is forwarded as a
plain option.

**See**

- `make` for constructing the client service effectfully
- `layer` for providing the client from already-resolved options

**Signature**

```ts
declare const layerConfig: (options?: {
  readonly apiKey?: Config.Config<Redacted.Redacted<string> | undefined> | undefined
  readonly apiUrl?: Config.Config<string> | undefined
  readonly organizationId?: Config.Config<Redacted.Redacted<string> | undefined> | undefined
  readonly projectId?: Config.Config<Redacted.Redacted<string> | undefined> | undefined
  readonly transformClient?: ((client: HttpClient.HttpClient) => HttpClient.HttpClient) | undefined
}) => Layer.Layer<OpenAiClient, Config.ConfigError, HttpClient.HttpClient>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiClient.ts#L369)

Since v4.0.0

# models

## Service (interface)

Effect service interface for the handwritten OpenAI client.

**Details**

Provides the configured HTTP client plus helpers for Responses API calls, streaming Responses events, and embeddings. Transport and schema decoding failures are mapped to `AiError`.

**Signature**

```ts
export interface Service {
  /**
   * The transformed HTTP client used by this service.
   */
  readonly client: HttpClient.HttpClient

  /**
   * Create a response using the OpenAI responses endpoint.
   */
  readonly createResponse: (
    options: typeof OpenAiSchema.CreateResponse.Encoded
  ) => Effect.Effect<
    readonly [body: typeof OpenAiSchema.Response.Type, response: HttpClientResponse.HttpClientResponse],
    AiError.AiError
  >

  /**
   * Create a streaming response using the OpenAI responses endpoint.
   */
  readonly createResponseStream: (
    options: Omit<typeof OpenAiSchema.CreateResponse.Encoded, "stream">
  ) => Effect.Effect<
    readonly [
      response: HttpClientResponse.HttpClientResponse,
      stream: Stream.Stream<typeof OpenAiSchema.ResponseStreamEvent.Type, AiError.AiError>
    ],
    AiError.AiError
  >

  /**
   * Create embeddings using the OpenAI embeddings endpoint.
   */
  readonly createEmbedding: (
    options: typeof OpenAiSchema.CreateEmbeddingRequest.Encoded
  ) => Effect.Effect<typeof OpenAiSchema.CreateEmbeddingResponse.Type, AiError.AiError>
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiClient.ts#L53)

Since v4.0.0

# options

## Options (type alias)

Options for configuring the OpenAI client.

**Signature**

```ts
type Options = {
  /**
   * The OpenAI API key.
   */
  readonly apiKey?: Redacted.Redacted<string> | undefined

  /**
   * The base URL for the OpenAI API.
   *
   * @default "https://api.openai.com/v1"
   */
  readonly apiUrl?: string | undefined

  /**
   * Optional organization ID for multi-org accounts.
   */
  readonly organizationId?: Redacted.Redacted<string> | undefined

  /**
   * Optional project ID for project-scoped requests.
   */
  readonly projectId?: Redacted.Redacted<string> | undefined

  /**
   * Optional transformer for the HTTP client.
   */
  readonly transformClient?: ((client: HttpClient.HttpClient) => HttpClient.HttpClient) | undefined
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiClient.ts#L123)

Since v4.0.0

# services

## OpenAiClient (class)

Service tag for the OpenAI client.

**When to use**

Use when accessing or providing the OpenAI client service through Effect's
context.

**See**

- `make` for constructing an OpenAI client effectfully
- `layer` for providing a client from explicit options
- `layerConfig` for providing a client from `Config`

**Signature**

```ts
declare class OpenAiClient
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiClient.ts#L109)

Since v4.0.0
