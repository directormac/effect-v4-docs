---
title: AnthropicClient.ts
nav_order: 1
parent: "@effect/ai-anthropic"
---

## AnthropicClient.ts overview

The `AnthropicClient` module defines the low-level Effect service for
Anthropic's Messages API. It builds a generated Anthropic HTTP client with
authentication headers, API version headers, response decoding, and error
mapping, then exposes helpers for regular and streaming message requests.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [make](#make)
- [layers](#layers)
  - [layer](#layer)
  - [layerConfig](#layerconfig)
- [models](#models)
  - [MessageStreamEvent (type alias)](#messagestreamevent-type-alias)
  - [Service (interface)](#service-interface)
- [options](#options)
  - [Options (type alias)](#options-type-alias)
- [services](#services)
  - [AnthropicClient (class)](#anthropicclient-class)

---

# constructors

## make

Creates an Anthropic client service with the given options.

**When to use**

Use when you have explicit configuration values and need an `Effect` that
constructs the Anthropic client service, rather than providing it as a `Layer`.

**Details**

The client handles API key authentication via the `x-api-key` header, API versioning via the `anthropic-version`
header, error mapping to the unified `AiError` type, and request/response transformations via `AnthropicConfig`. It
requires an `HttpClient` in the context.

**See**

- `layer` for providing the client as a `Layer` from explicit options
- `layerConfig` for providing the client as a `Layer` with `Config`-based settings

**Signature**

```ts
declare const make: (options: Options) => Effect.Effect<Service, never, HttpClient.HttpClient>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicClient.ts#L217)

Since v4.0.0

# layers

## layer

Creates a layer for the Anthropic client with the given options.

**When to use**

Use when you already have explicit `Options` values, such as an API key or
custom API URL, and want to provide `AnthropicClient` as a `Layer`.

**See**

- `make` for constructing the client service effectfully
- `layerConfig` for loading client settings from `Config`

**Signature**

```ts
declare const layer: (options: Options) => Layer.Layer<AnthropicClient, never, HttpClient.HttpClient>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicClient.ts#L367)

Since v4.0.0

## layerConfig

Creates a layer for the Anthropic client, loading the requisite configuration
via Effect's `Config` module.

**When to use**

Use when you want to provide the Anthropic client as a `Layer` with
configuration loaded from Effect's `Config` module, such as from environment
variables or a secrets provider.

**See**

- `layer` for providing the client from explicit options instead of `Config`
- `make` for constructing the client service effectfully

**Signature**

```ts
declare const layerConfig: (options?: {
  readonly apiKey?: Config.Config<Redacted.Redacted<string> | undefined> | undefined
  readonly apiUrl?: Config.Config<string> | undefined
  readonly apiVersion?: Config.Config<string> | undefined
  readonly transformClient?: ((client: HttpClient.HttpClient) => HttpClient.HttpClient) | undefined
}) => Layer.Layer<AnthropicClient, Config.ConfigError, HttpClient.HttpClient>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicClient.ts#L386)

Since v4.0.0

# models

## MessageStreamEvent (type alias)

Represents an event received from the Anthropic Messages API during a streaming request.

**Details**

Events include:

- `message_start`: Initial event containing message metadata
- `message_delta`: Incremental updates to the message (e.g., stop reason)
- `message_stop`: Final event indicating the message is complete
- `content_block_start`: Start of a content block
- `content_block_delta`: Incremental content updates (text, tool use, etc.)
- `content_block_stop`: End of a content block
- `error`: Error events with type and message

**Signature**

```ts
type MessageStreamEvent =
  | typeof Generated.BetaMessageStartEvent.Type
  | typeof Generated.BetaMessageDeltaEvent.Type
  | typeof Generated.BetaMessageStopEvent.Type
  | typeof Generated.BetaContentBlockStartEvent.Type
  | typeof Generated.BetaContentBlockDeltaEvent.Type
  | typeof Generated.BetaContentBlockStopEvent.Type
  | typeof Generated.BetaErrorResponse.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicClient.ts#L104)

Since v4.0.0

## Service (interface)

Represents the Anthropic client service with methods for the Messages API, including regular and streaming message
creation.

**Signature**

```ts
export interface Service {
  /**
   * The underlying generated Anthropic client that exposes all API endpoints.
   */
  readonly client: Generated.AnthropicClient

  /**
   * Executes a low-level streaming HTTP request and decodes the Server-Sent Events response using the provided schema.
   */
  readonly streamRequest: <S extends Sse.EventCodec>(
    schema: S
  ) => (
    request: HttpClientRequest.HttpClientRequest
  ) => Stream.Stream<S["Type"], HttpClientError.HttpClientError | Schema.SchemaError | Sse.Retry, S["DecodingServices"]>

  /**
   * Creates a message using the Anthropic Messages API and maps all errors to the unified `AiError` type.
   */
  readonly createMessage: (options: {
    readonly payload: typeof Generated.BetaCreateMessageParams.Encoded
    readonly params?: typeof Generated.BetaMessagesPostParams.Encoded | undefined
  }) => Effect.Effect<
    [body: typeof Generated.BetaMessage.Type, response: HttpClientResponse.HttpClientResponse],
    AiError.AiError
  >

  /**
   * Creates a streaming message using the Anthropic Messages API and maps all errors to the unified `AiError` type.
   *
   * **Details**
   *
   * The returned Effect yields the HTTP response and a stream of events as the model generates its response. The stream
   * automatically terminates when a `message_stop` event is received.
   */
  readonly createMessageStream: (options: {
    readonly payload: Omit<typeof Generated.BetaCreateMessageParams.Encoded, "stream">
    readonly params?: typeof Generated.BetaMessagesPostParams.Encoded | undefined
  }) => Effect.Effect<
    [response: HttpClientResponse.HttpClientResponse, stream: Stream.Stream<MessageStreamEvent, AiError.AiError>],
    AiError.AiError
  >
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicClient.ts#L42)

Since v4.0.0

# options

## Options (type alias)

Configuration for creating an Anthropic client.

**When to use**

Use when the Anthropic client settings are already available as values and
should be passed directly to `make` or `layer`.

**Details**

These options configure the base Anthropic URL, the `x-api-key`
authentication header, the `anthropic-version` header, and an optional
transformation of the underlying `HttpClient`.

**See**

- `make` for constructing an Anthropic client from explicit options
- `layer` for providing an Anthropic client from explicit options
- `layerConfig` for loading Anthropic client settings from `Config`

**Signature**

```ts
type Options = {
  /**
   * The Anthropic API key for authentication. Requests are made without authentication when this is omitted, which is
   * useful for proxied setups or testing.
   */
  readonly apiKey?: Redacted.Redacted<string> | undefined

  /**
   * The base URL for the Anthropic API. Override this to use a proxy or a different API-compatible endpoint.
   *
   * @default "https://api.anthropic.com"
   */
  readonly apiUrl?: string | undefined

  /**
   * The Anthropic API version header value. This controls which version of the API to use.
   *
   * @default "2023-06-01"
   */
  readonly apiVersion?: string | undefined

  /**
   * Optional transformer for the underlying HTTP client, such as middleware, logging, or custom request/response
   * handling.
   */
  readonly transformClient?: ((client: HttpClient.HttpClient) => HttpClient.HttpClient) | undefined
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicClient.ts#L161)

Since v4.0.0

# services

## AnthropicClient (class)

Service tag for the Anthropic client.

**When to use**

Use when accessing or providing the Anthropic client service through Effect's
context.

**See**

- `make` for constructing an Anthropic client effectfully
- `layer` for providing a client from explicit options
- `layerConfig` for providing a client from `Config`

**Signature**

```ts
declare class AnthropicClient
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicClient.ts#L132)

Since v4.0.0
