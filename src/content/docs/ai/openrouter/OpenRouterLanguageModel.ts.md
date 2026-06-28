---
title: OpenRouterLanguageModel.ts
nav_order: 5
parent: "@effect/ai-openrouter"
---

## OpenRouterLanguageModel.ts overview

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
  - [FileAnnotation (type alias)](#fileannotation-type-alias)
  - [ReasoningDetails (type alias)](#reasoningdetails-type-alias)
- [services](#services)
  - [Config (class)](#config-class)

---

# configuration

## withConfigOverride

Provides config overrides for OpenRouter language model operations.

**When to use**

Use to apply OpenRouter request configuration to one effect without changing
the model's default configuration.

**Details**

The overrides are merged with any existing `Config` service for the duration
of the supplied effect. Fields in `overrides` take precedence over existing
config, and the helper supports both pipe form and
`withConfigOverride(effect, overrides)`.

**See**

- `Config` for available OpenRouter request configuration fields

**Signature**

```ts
declare const withConfigOverride: {
  (overrides: typeof Config.Service): <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<A, E, Exclude<R, Config>>
  <A, E, R>(self: Effect.Effect<A, E, R>, overrides: typeof Config.Service): Effect.Effect<A, E, Exclude<R, Config>>
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openrouter/src/OpenRouterLanguageModel.ts#L645)

Since v4.0.0

# constructors

## make

Creates an OpenRouter `LanguageModel` service from a model identifier and
optional request defaults.

**When to use**

Use when you need to construct a `LanguageModel.Service` value backed by
`OpenRouterClient` inside an Effect.

**Details**

The returned effect requires `OpenRouterClient`. Request defaults from the
`config` option are merged with any `Config` service in the context, with
context values taking precedence. The service supports both `generateText`
and `streamText`.

**Gotchas**

Provider-defined tools are not supported by this provider integration;
requests that include them fail with an `InvalidUserInputError`.

**See**

- `layer` for providing the service as a `Layer`
- `model` for creating a model descriptor for `Effect.provide`
- `withConfigOverride` for scoping request defaults around operations

**Signature**

```ts
declare const make: (args_0: {
  readonly model: string
  readonly config?: Omit<typeof Config.Service, "model"> | undefined
}) => Effect.Effect<LanguageModel.Service, never, OpenRouterClient>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openrouter/src/OpenRouterLanguageModel.ts#L541)

Since v4.0.0

## model

Creates an OpenRouter model descriptor that can be provided with
`Effect.provide`.

**When to use**

Use when you want an OpenRouter language model value that carries provider
and model metadata and can be supplied directly to an Effect program.

**Details**

The returned model requires `OpenRouterClient` and provides
`LanguageModel.LanguageModel`.

**See**

- `layer` for creating a `LanguageModel.LanguageModel` layer directly
- `make` for constructing the language model service effectfully
- `withConfigOverride` for scoping OpenRouter request overrides

**Signature**

```ts
declare const model: (
  model: string,
  config?: Omit<typeof Config.Service, "model">
) => AiModel.Model<"openai", LanguageModel.LanguageModel, OpenRouterClient>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openrouter/src/OpenRouterLanguageModel.ts#L507)

Since v4.0.0

# layers

## layer

Creates a layer for the OpenRouter language model.

**When to use**

Use when composing application layers and you want OpenRouter to satisfy
`LanguageModel.LanguageModel` while supplying `OpenRouterClient` from another
layer.

**See**

- `make` for constructing the language model service effectfully
- `model` for creating a model descriptor for `Effect.provide`

**Signature**

```ts
declare const layer: (options: {
  readonly model: string
  readonly config?: Omit<typeof Config.Service, "model"> | undefined
}) => Layer.Layer<LanguageModel.LanguageModel, never, OpenRouterClient>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openrouter/src/OpenRouterLanguageModel.ts#L619)

Since v4.0.0

# models

## FileAnnotation (type alias)

File annotations emitted on OpenRouter assistant messages and exposed in
finish metadata.

**Signature**

```ts
type FileAnnotation = Extract<
  NonNullable<typeof Generated.AssistantMessage.fields.annotations.Type>[number],
  { type: "file" }
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openrouter/src/OpenRouterLanguageModel.ts#L101)

Since v4.0.0

## ReasoningDetails (type alias)

OpenRouter assistant reasoning detail blocks preserved for multi-turn
conversations.

**Signature**

```ts
type ReasoningDetails = Exclude<(typeof Generated.AssistantMessage.Encoded)["reasoning_details"], undefined>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openrouter/src/OpenRouterLanguageModel.ts#L92)

Since v4.0.0

# services

## Config (class)

Context service for OpenRouter language model configuration.

**When to use**

Use to provide scoped OpenRouter chat completion defaults or per-operation
overrides for an OpenRouter language model service.

**See**

- `withConfigOverride` for scoping language model request overrides

**Signature**

```ts
declare class Config
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openrouter/src/OpenRouterLanguageModel.ts#L60)

Since v4.0.0
