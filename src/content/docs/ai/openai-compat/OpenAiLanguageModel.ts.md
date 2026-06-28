---
title: OpenAiLanguageModel.ts
nav_order: 6
parent: "@effect/ai-openai-compat"
---

## OpenAiLanguageModel.ts overview

The `OpenAiLanguageModel` module adapts OpenAI-compatible chat completions
providers to Effect AI's `LanguageModel` service. It builds a model service
from a model id, translates prompts, files, tools, structured output schemas,
and provider-specific options into `OpenAiClient` requests, and maps normal
or streaming chat completion results back into Effect AI response content and
metadata.

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

---

# configuration

## withConfigOverride

Provides scoped config overrides for OpenAI-compatible language model operations.

**When to use**

Use to override request configuration for a single language model effect
without changing the defaults supplied to `model`, `make`, or `layer`.

**Details**

Existing `Config` values from the Effect context are merged with `overrides`,
and the override values take precedence.

**See**

- `Config` for the configuration shape

**Signature**

```ts
declare const withConfigOverride: {
  (overrides: typeof Config.Service): <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<A, E, Exclude<R, Config>>
  <A, E, R>(self: Effect.Effect<A, E, R>, overrides: typeof Config.Service): Effect.Effect<A, E, Exclude<R, Config>>
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiLanguageModel.ts#L702)

Since v4.0.0

# constructors

## make

Creates an OpenAI-compatible `LanguageModel` service from a model identifier and optional request defaults.

**When to use**

Use to construct an OpenAI-compatible chat-completions language model service
backed by `OpenAiClient`.

**Details**

The returned effect requires `OpenAiClient`. Request defaults from the
`config` option are merged with any `Config` service in the context, with
context values taking precedence. The service supports both `generateText` and
`streamText`.

**See**

- `layer` for providing the service as a `Layer`
- `model` for creating a model descriptor for `AiModel.provide`

**Signature**

```ts
declare const make: (args_0: {
  readonly model: string
  readonly config?: Omit<typeof Config.Service, "model"> | undefined
}) => Effect.Effect<LanguageModel.Service, never, OpenAiClient>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiLanguageModel.ts#L570)

Since v4.0.0

## model

Creates an OpenAI-compatible model descriptor that can be provided with `Effect.provide`.

**When to use**

Use when you want an OpenAI-compatible language model value that carries
provider and model metadata and can be supplied directly to an Effect program.

**See**

- `layer` for creating a `LanguageModel.LanguageModel` layer directly
- `make` for constructing the language model service effectfully

**Signature**

```ts
declare const model: (
  model: string,
  config?: Omit<typeof Config.Service, "model">
) => AiModel.Model<"openai", LanguageModel.LanguageModel, OpenAiClient>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiLanguageModel.ts#L532)

Since v4.0.0

# context

## Config (class)

Context service for OpenAI language model configuration.

**When to use**

Use as the context service for OpenAI-compatible language model request
configuration, especially when a scoped operation should override the defaults
supplied to `model`, `make`, or `layer`.

**See**

- `withConfigOverride` for scoping language model request overrides

**Signature**

```ts
declare class Config
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiLanguageModel.ts#L77)

Since v4.0.0

# layers

## layer

Creates a layer for the OpenAI-compatible language model.

**When to use**

Use when composing application layers and you want OpenAI-compatible APIs to
satisfy `LanguageModel.LanguageModel` while supplying `OpenAiClient` from
another layer.

**See**

- `make` for constructing the language model service effectfully
- `model` for creating an AI model descriptor

**Signature**

```ts
declare const layer: (options: {
  readonly model: string
  readonly config?: Omit<typeof Config.Service, "model"> | undefined
}) => Layer.Layer<LanguageModel.LanguageModel, never, OpenAiClient>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiLanguageModel.ts#L678)

Since v4.0.0
