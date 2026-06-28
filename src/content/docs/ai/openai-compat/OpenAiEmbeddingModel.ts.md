---
title: OpenAiEmbeddingModel.ts
nav_order: 4
parent: "@effect/ai-openai-compat"
---

## OpenAiEmbeddingModel.ts overview

The `OpenAiEmbeddingModel` module adapts OpenAI-compatible embeddings
endpoints to Effect's embedding model service. It sends embedding requests
through `OpenAiClient`, exposes constructors for layers and `AiModel`
values, supports scoped request configuration overrides, and checks that the
provider returns one numeric vector for each requested input.

Since v4.0.0

---

## Exports Grouped by Category

- [configuration](#configuration)
  - [withConfigOverride](#withconfigoverride)
- [constructors](#constructors)
  - [make](#make)
  - [model](#model)
- [context](#context)
  - [Config (class)](#config-class)
- [layers](#layers)
  - [layer](#layer)
- [models](#models)
  - [Model (type alias)](#model-type-alias)

---

# configuration

## withConfigOverride

Provides scoped request config overrides for OpenAI-compatible embedding model operations.

**When to use**

Use to apply embedding request options to one effect without changing the
model's default configuration.

**Details**

The overrides are merged with any existing `Config` service for the duration
of the supplied effect. Fields in `overrides` take precedence over existing
config, and the helper supports both `effect.pipe(withConfigOverride(overrides))`
and `withConfigOverride(effect, overrides)`.

**See**

- `Config` for available OpenAI-compatible embedding request configuration fields

**Signature**

```ts
declare const withConfigOverride: {
  (overrides: typeof Config.Service): <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<A, E, Exclude<R, Config>>
  <A, E, R>(self: Effect.Effect<A, E, R>, overrides: typeof Config.Service): Effect.Effect<A, E, Exclude<R, Config>>
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiEmbeddingModel.ts#L189)

Since v4.0.0

# constructors

## make

Creates an OpenAI-compatible embedding model service backed by `OpenAiClient`.

**When to use**

Use when you need to build or provide an `EmbeddingModel` service directly
from an existing `OpenAiClient`.

**Details**

The service sends embedding requests through `OpenAiClient.createEmbedding`.
Request config is merged as the selected model, constructor config, then
scoped `Config`, so scoped overrides take precedence. Provider usage
`prompt_tokens` is exposed as `usage.inputTokens`.

**Gotchas**

Provider responses must contain one numeric vector for every requested input
with unique, in-range `index` values; otherwise embedding operations fail with
`AiError.InvalidOutputError`.

**See**

- `model` for the higher-level `AiModel` descriptor that also provides `EmbeddingModel.Dimensions`
- `layer` for providing the service as a `Layer`
- `withConfigOverride` for scoping embedding request overrides

**Signature**

```ts
declare const make: (args_0: {
  readonly model: string
  readonly config?: Omit<typeof Config.Service, "model"> | undefined
}) => Effect.Effect<EmbeddingModel.Service, never, OpenAiClient>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiEmbeddingModel.ts#L128)

Since v4.0.0

## model

Creates an `AiModel` for an OpenAI-compatible embedding model with its configured vector dimensions.

**When to use**

Use to provide an OpenAI-compatible `EmbeddingModel` and its `Dimensions`
service to an Effect program.

**See**

- `layer` for providing only the embedding model service
- `withConfigOverride` for scoped request configuration overrides

**Signature**

```ts
declare const model: (
  model: string,
  options: { readonly dimensions: number; readonly config?: Omit<typeof Config.Service, "model" | "dimensions"> }
) => AiModel.Model<"openai", EmbeddingModel.EmbeddingModel | EmbeddingModel.Dimensions, OpenAiClient>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiEmbeddingModel.ts#L78)

Since v4.0.0

# context

## Config (class)

Context service for OpenAI embedding model configuration.

**When to use**

Use when you need to provide shared default request options for
OpenAI-compatible embedding operations through the Effect context, such as
`dimensions`, `encoding_format`, or `user`.

**Details**

The service stores the embedding request payload without `input`. Requests
combine the selected model, layer or constructor config, and scoped context
config, with scoped context config taking precedence.

**See**

- `withConfigOverride` for scoping embedding request overrides

**Signature**

```ts
declare class Config
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiEmbeddingModel.ts#L49)

Since v4.0.0

# layers

## layer

Creates a layer for an OpenAI-compatible embedding model service.

**When to use**

Use when composing application layers and you want an OpenAI-compatible
embeddings endpoint to satisfy `EmbeddingModel.EmbeddingModel` while
supplying `OpenAiClient` from another layer.

**See**

- `make` for constructing the embedding model service effectfully
- `model` for creating an `AiModel` with configured dimensions

**Signature**

```ts
declare const layer: (options: {
  readonly model: string
  readonly config?: Omit<typeof Config.Service, "model"> | undefined
}) => Layer.Layer<EmbeddingModel.EmbeddingModel, never, OpenAiClient>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiEmbeddingModel.ts#L163)

Since v4.0.0

# models

## Model (type alias)

A model identifier accepted by an OpenAI-compatible embeddings endpoint.

**Signature**

```ts
type Model = string
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiEmbeddingModel.ts#L27)

Since v4.0.0
