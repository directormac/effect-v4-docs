---
title: OpenAiLanguageModel.ts
nav_order: 7
parent: "@effect/ai-openai"
---

## OpenAiLanguageModel.ts overview

The `OpenAiLanguageModel` module provides the OpenAI Responses API
implementation of Effect AI's `LanguageModel` service. It translates Effect
AI prompts, files, tools, structured output requests, reasoning metadata, and
provider options into OpenAI response requests, then converts OpenAI
non-streaming or streaming response results back into Effect AI response
content and metadata.

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

Provides scoped config overrides for OpenAI language model operations.

**When to use**

Use to apply OpenAI Responses API config overrides around one or more
language model operations without changing the defaults passed to `model`,
`make`, or `layer`.

**Details**

The override is dual, so it can be used in pipe form or as
`withConfigOverride(effect, overrides)`. Overrides are merged with any
existing `Config` service in the current context, and the override values take
precedence.

**See**

- `Config` for the scoped configuration service consumed by this function

**Signature**

```ts
declare const withConfigOverride: {
  (overrides: typeof Config.Service): <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<A, E, Exclude<R, Config>>
  <A, E, R>(self: Effect.Effect<A, E, R>, overrides: typeof Config.Service): Effect.Effect<A, E, Exclude<R, Config>>
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiLanguageModel.ts#L729)

Since v4.0.0

# constructors

## make

Creates an OpenAI `LanguageModel` service from a model identifier and
optional request defaults.

**When to use**

Use to construct an OpenAI Responses API language model service backed by
`OpenAiClient`.

**Details**

The returned effect requires `OpenAiClient`. Request defaults from the
`config` option are merged with any `Config` service in the context, with
context values taking precedence. The service supports both `generateText`
and `streamText`.

**See**

- `layer` for providing the service as a `Layer`
- `model` for creating a model descriptor for `Effect.provide`

**Signature**

```ts
declare const make: (args_0: {
  readonly model: (string & {}) | Model
  readonly config?: Omit<typeof Config.Service, "model"> | undefined
}) => Effect.Effect<LanguageModel.Service, never, OpenAiClient>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiLanguageModel.ts#L582)

Since v4.0.0

## model

Creates an OpenAI model descriptor that can be provided with
`Effect.provide`.

**When to use**

Use when you want an OpenAI language model value that carries provider and
model metadata and can be supplied directly to an Effect program.

**See**

- `layer` for creating a `LanguageModel.LanguageModel` layer directly
- `make` for constructing the language model service effectfully

**Signature**

```ts
declare const model: (
  model: (string & {}) | Model,
  config?: Omit<typeof Config.Service, "model">
) => AiModel.Model<"openai", LanguageModel.LanguageModel, OpenAiClient>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiLanguageModel.ts#L543)

Since v4.0.0

# layers

## layer

Creates a layer that provides the OpenAI `LanguageModel.LanguageModel`
service.

**When to use**

Use when composing application layers and you want OpenAI to satisfy
`LanguageModel.LanguageModel` while supplying `OpenAiClient` from another
layer.

**Details**

The `config` option supplies request defaults for the selected model. Scoped
values from `withConfigOverride` are merged when each request is built and
take precedence over these defaults.

**See**

- `make` for constructing the language model service effectfully
- `model` for creating a model descriptor for `Effect.provide`
- `withConfigOverride` for scoped request configuration overrides

**Signature**

```ts
declare const layer: (options: {
  readonly model: (string & {}) | Model
  readonly config?: Omit<typeof Config.Service, "model"> | undefined
}) => Layer.Layer<LanguageModel.LanguageModel, never, OpenAiClient>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiLanguageModel.ts#L702)

Since v4.0.0

# models

## Model (type alias)

OpenAI model identifiers supported by the Responses API language model.

**Signature**

```ts
type Model = typeof ResponseModelIds.Encoded | typeof SharedModelIds.Encoded
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiLanguageModel.ts#L51)

Since v4.0.0

# services

## Config (class)

Context service for OpenAI language model configuration.

**When to use**

Use when you need to provide OpenAI Responses API request defaults through
Effect context for language model operations.

**Details**

Config values are merged with the config object passed to `model`, `make`, or
`layer`, with scoped context values taking precedence.

**See**

- `withConfigOverride` for scoping language model request overrides

**Signature**

```ts
declare class Config
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiLanguageModel.ts#L80)

Since v4.0.0
