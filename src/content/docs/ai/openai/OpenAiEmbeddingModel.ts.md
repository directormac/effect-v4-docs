---
title: OpenAiEmbeddingModel.ts
nav_order: 5
parent: "@effect/ai-openai"
---

## OpenAiEmbeddingModel.ts overview

The `OpenAiEmbeddingModel` module provides the OpenAI implementation of
Effect AI's `EmbeddingModel` service. It sends embedding requests through
`OpenAiClient`, exposes constructors for layers and `AiModel` values,
supports scoped request configuration overrides, and checks that OpenAI
returns one numeric vector for each requested input.

Since v4.0.0

---

## Exports Grouped by Category

- [configuration](#configuration)
  - [withConfigOverride](#withconfigoverride)
- [constructors](#constructors)
  - [make](#make)
  - [model](#model)
- [layers](#layers)
  - [layer](#layer)
- [models](#models)
  - [Model (type alias)](#model-type-alias)
- [services](#services)
  - [Config (class)](#config-class)

---

# configuration

## withConfigOverride

Provides config overrides for OpenAI embedding model operations.

**When to use**

Use when you need scoped OpenAI embedding request defaults for a single
effect or workflow without rebuilding the embedding model service.

**Details**

Supports both data-first and data-last forms. Existing scoped config is read
first, then the provided overrides are applied so override fields take
precedence.

**See**

- `Config` for the scoped embedding request configuration service

**Signature**

```ts
declare const withConfigOverride: {
  (overrides: typeof Config.Service): <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<A, E, Exclude<R, Config>>
  <A, E, R>(self: Effect.Effect<A, E, R>, overrides: typeof Config.Service): Effect.Effect<A, E, Exclude<R, Config>>
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiEmbeddingModel.ts#L193)

Since v4.0.0

# constructors

## make

Creates an OpenAI embedding model service.

**When to use**

Use to construct the `EmbeddingModel.Service` effectfully when
`OpenAiClient` is already available in the environment.

**Details**

The `model` option is sent with each embedding request. Constructor `config`
supplies create-embedding request fields other than `model` and `input`, and
scoped overrides from `withConfigOverride` are merged last for each request.

**Gotchas**

The service expects numeric embedding vectors. It fails with
`InvalidOutputError` when the provider returns base64 embeddings,
out-of-range indexes, duplicate indexes, or an unexpected number of
embeddings.

**See**

- `layer` for providing the embedding model service as a layer
- `model` for creating an `AiModel` that also provides dimensions
- `withConfigOverride` for scoped request configuration overrides

**Signature**

```ts
declare const make: (args_0: {
  readonly model: (string & {}) | Model
  readonly config?: Omit<typeof Config.Service, "model"> | undefined
}) => Effect.Effect<EmbeddingModel.Service, never, OpenAiClient>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiEmbeddingModel.ts#L127)

Since v4.0.0

## model

Creates an `AiModel` for an OpenAI embedding model with its configured vector dimensions.

**When to use**

Use to provide an OpenAI `EmbeddingModel` and its `Dimensions` service to an
Effect program.

**See**

- `layer` for providing only the embedding model service
- `withConfigOverride` for scoped request configuration overrides

**Signature**

```ts
declare const model: (
  model: (string & {}) | Model,
  options: { readonly dimensions: number; readonly config?: Omit<typeof Config.Service, "model" | "dimensions"> }
) => AiModel.Model<"openai", EmbeddingModel.EmbeddingModel | EmbeddingModel.Dimensions, OpenAiClient>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiEmbeddingModel.ts#L77)

Since v4.0.0

# layers

## layer

Creates a layer for the OpenAI embedding model.

**When to use**

Use when composing application layers and you want OpenAI to satisfy
`EmbeddingModel.EmbeddingModel` while supplying `OpenAiClient` from another
layer.

**Gotchas**

Use the default floating-point embedding format. The service expects numeric
vectors and fails with `InvalidOutputError` if OpenAI returns base64
embeddings.

**See**

- `make` for constructing the embedding model service effectfully
- `model` for creating an `AiModel` that also provides embedding dimensions

**Signature**

```ts
declare const layer: (options: {
  readonly model: (string & {}) | Model
  readonly config?: Omit<typeof Config.Service, "model"> | undefined
}) => Layer.Layer<EmbeddingModel.EmbeddingModel, never, OpenAiClient>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiEmbeddingModel.ts#L168)

Since v4.0.0

# models

## Model (type alias)

Model identifiers supported by OpenAI's embeddings API.

**Signature**

```ts
type Model = "text-embedding-ada-002" | "text-embedding-3-small" | "text-embedding-3-large"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiEmbeddingModel.ts#L27)

Since v4.0.0

# services

## Config (class)

Context service for OpenAI embedding model configuration.

**When to use**

Use when you need scoped OpenAI request defaults or overrides for embedding
requests from Effect context.

**Details**

The service stores the OpenAI create-embedding request payload without
`input`, carrying options such as `model`, `dimensions`, `encoding_format`,
and `user`.

**See**

- `withConfigOverride` for scoping embedding request overrides

**Signature**

```ts
declare class Config
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiEmbeddingModel.ts#L48)

Since v4.0.0
