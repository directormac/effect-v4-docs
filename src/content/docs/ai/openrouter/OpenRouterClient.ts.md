---
title: OpenRouterClient.ts
nav_order: 2
parent: "@effect/ai-openrouter"
---

## OpenRouterClient.ts overview

The `OpenRouterClient` module provides an Effect service for calling
OpenRouter's chat completions API. It wraps the generated OpenRouter HTTP
client with Effect-native constructors, layers, authentication and optional
site ranking headers, typed errors, and streaming support.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [make](#make)
- [layers](#layers)
  - [layer](#layer)
  - [layerConfig](#layerconfig)
- [models](#models)
  - [ChatStreamingResponseChunkData (type alias)](#chatstreamingresponsechunkdata-type-alias)
  - [Service (interface)](#service-interface)
- [options](#options)
  - [Options (type alias)](#options-type-alias)
- [services](#services)
  - [OpenRouterClient (class)](#openrouterclient-class)

---

# constructors

## make

Creates an OpenRouter client service from explicit options.

**When to use**

Use when you need the OpenRouter client service value inside an effect.

**Details**

The returned service uses the current `HttpClient`, prepends `apiUrl` or
`https://openrouter.ai/api/v1`, adds the bearer token and optional
`HTTP-Referer` and `X-Title` headers, accepts JSON responses, and applies
`transformClient` when provided.

**Gotchas**

Scoped `OpenRouterConfig.withClientTransform` applies to generated client
request methods. Streaming chat completion requests are sent directly by this
module and do not read that scoped transform.

**See**

- `layer` for providing this client from explicit options
- `layerConfig` for loading client settings from `Config`

**Signature**

```ts
declare const make: (options: Options) => Effect.Effect<Service, never, HttpClient.HttpClient>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openrouter/src/OpenRouterClient.ts#L166)

Since v4.0.0

# layers

## layer

Creates a layer for the OpenRouter client with the given options.

**When to use**

Use when you already have the OpenRouter client options in code and want to
provide `OpenRouterClient` as a layer.

**See**

- `make` for constructing the client service effectfully
- `layerConfig` for loading client settings from `Config`

**Signature**

```ts
declare const layer: (options: Options) => Layer.Layer<OpenRouterClient, never, HttpClient.HttpClient>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openrouter/src/OpenRouterClient.ts#L271)

Since v4.0.0

## layerConfig

Creates a layer for the OpenRouter client from provided `Config` values.

**When to use**

Use when you need client settings for OpenRouter to be read from Effect
`Config` values while providing `OpenRouterClient` as a layer.

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
  readonly siteReferrer?: Config.Config<string> | undefined
  readonly siteTitle?: Config.Config<string> | undefined
  readonly transformClient?: ((client: HttpClient.HttpClient) => HttpClient.HttpClient) | undefined
}) => Layer.Layer<OpenRouterClient, Config.ConfigError, HttpClient.HttpClient>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openrouter/src/OpenRouterClient.ts#L294)

Since v4.0.0

# models

## ChatStreamingResponseChunkData (type alias)

Decoded `data` payload from an OpenRouter chat completion streaming chunk.

**Details**

The payload contains streamed choices, model metadata, optional usage, and may
include an OpenRouter error object for a streamed response.

**Signature**

```ts
type ChatStreamingResponseChunkData = typeof Generated.ChatStreamingResponseChunk.fields.data.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openrouter/src/OpenRouterClient.ts#L75)

Since v4.0.0

## Service (interface)

The OpenRouter client service interface.

**Details**

Provides methods for interacting with OpenRouter's Chat Completions API,
including both synchronous and streaming message creation.

**Signature**

```ts
export interface Service {
  readonly client: Generated.OpenRouterClient

  readonly createChatCompletion: (
    options: typeof Generated.ChatGenerationParams.Encoded
  ) => Effect.Effect<
    [body: typeof Generated.SendChatCompletionRequest200.Type, response: HttpClientResponse.HttpClientResponse],
    AiError.AiError
  >

  readonly createChatCompletionStream: (
    options: Omit<typeof Generated.ChatGenerationParams.Encoded, "stream" | "stream_options">
  ) => Effect.Effect<
    [
      response: HttpClientResponse.HttpClientResponse,
      stream: Stream.Stream<ChatStreamingResponseChunkData, AiError.AiError>
    ],
    AiError.AiError
  >
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openrouter/src/OpenRouterClient.ts#L43)

Since v4.0.0

# options

## Options (type alias)

Configuration for creating an OpenRouter client.

**Signature**

```ts
type Options = {
  readonly apiKey?: Redacted.Redacted<string> | undefined

  readonly apiUrl?: string | undefined

  /**
   * Optional URL of your site for rankings on `openrouter.ai`.
   */
  readonly siteReferrer?: string | undefined

  /**
   * Optional title of your site for rankings on `openrouter.ai`.
   */
  readonly siteTitle?: string | undefined

  /**
   * Optional transformer for the underlying HTTP client.
   *
   * **When to use**
   *
   * Use to add middleware, logging, or custom request/response handling.
   */
  readonly transformClient?: ((client: HttpClient.HttpClient) => HttpClient.HttpClient) | undefined
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openrouter/src/OpenRouterClient.ts#L111)

Since v4.0.0

# services

## OpenRouterClient (class)

Service tag for the OpenRouter client.

**When to use**

Use when accessing or providing the OpenRouter client service through
Effect's context.

**See**

- `make` for constructing an OpenRouter client effectfully
- `layer` for providing a client from explicit options
- `layerConfig` for providing a client from `Config`

**Signature**

```ts
declare class OpenRouterClient
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openrouter/src/OpenRouterClient.ts#L96)

Since v4.0.0
