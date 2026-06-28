---
title: AnthropicLanguageModel.ts
nav_order: 4
parent: "@effect/ai-anthropic"
---

## AnthropicLanguageModel.ts overview

---

## Exports Grouped by Category

- [configuration](#configuration)
  - [Config (class)](#config-class)
  - [withConfigOverride](#withconfigoverride)
- [constructors](#constructors)
  - [make](#make)
  - [model](#model)
- [layers](#layers)
  - [layer](#layer)
- [models](#models)
  - [Model (type alias)](#model-type-alias)
- [tools](#tools)
  - [AnthropicProviderDefinedTool (type alias)](#anthropicproviderdefinedtool-type-alias)
  - [AnthropicUserDefinedTool (type alias)](#anthropicuserdefinedtool-type-alias)

---

# configuration

## Config (class)

Context service for Anthropic language model configuration.

**When to use**

Use when you need scoped Anthropic model request defaults or per-operation
overrides from Effect context.

**Details**

The service stores request fields that are merged into Anthropic Messages API
requests. Scoped configuration overrides defaults supplied to `model`,
`make`, or `layer`.

**Signature**

```ts
declare class Config
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicLanguageModel.ts#L77)

Since v4.0.0

## withConfigOverride

Provides config overrides for Anthropic language model operations.

**When to use**

Use to apply Anthropic request configuration to one effect without changing
the model's default configuration.

**Details**

The overrides are merged with any existing `Config` service for the duration
of the supplied effect. Fields in `overrides` take precedence over existing
config, and the helper supports both `effect.pipe(withConfigOverride(overrides))`
and `withConfigOverride(effect, overrides)`.

**See**

- `Config` for available Anthropic request configuration fields

**Signature**

```ts
declare const withConfigOverride: {
  (overrides: typeof Config.Service): <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<A, E, Exclude<R, Config>>
  <A, E, R>(self: Effect.Effect<A, E, R>, overrides: typeof Config.Service): Effect.Effect<A, E, Exclude<R, Config>>
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicLanguageModel.ts#L790)

Since v4.0.0

# constructors

## make

Creates an Anthropic `LanguageModel` service from a model identifier and optional request defaults.

**When to use**

Use when you need to construct a `LanguageModel.Service` value backed by
`AnthropicClient` inside an Effect.

**Details**

The returned effect requires `AnthropicClient`. Request defaults from the
`config` option are merged with any `Config` service in the context, with
context values taking precedence.

**See**

- `layer` for providing the service as a `Layer`
- `model` for creating a model descriptor for `AiModel.provide`

**Signature**

```ts
declare const make: (args_0: {
  readonly model: (string & {}) | Model
  readonly config?: Omit<typeof Config.Service, "model"> | undefined
}) => Effect.Effect<LanguageModel.Service, never, AnthropicClient>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicLanguageModel.ts#L668)

Since v4.0.0

## model

Creates an Anthropic model descriptor that can be provided with `Effect.provide`.

**When to use**

Use when you want an Anthropic Claude model value that carries provider and
model metadata and can be supplied directly to an Effect program.

**See**

- `layer` for creating a `LanguageModel.LanguageModel` layer directly
- `make` for constructing the language model service effectfully

**Signature**

```ts
declare const model: (
  model: (string & {}) | Model,
  config?: Omit<typeof Config.Service, "model">
) => AiModel.Model<"anthropic", LanguageModel.LanguageModel, AnthropicClient>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicLanguageModel.ts#L642)

Since v4.0.0

# layers

## layer

Creates a layer for the Anthropic language model.

**When to use**

Use when composing application layers and you want Anthropic to satisfy
`LanguageModel.LanguageModel` while supplying `AnthropicClient` from another
layer.

**See**

- `make` for constructing the language model service effectfully
- `model` for creating a model service directly

**Signature**

```ts
declare const layer: (options: {
  readonly model: (string & {}) | Model
  readonly config?: Omit<typeof Config.Service, "model"> | undefined
}) => Layer.Layer<LanguageModel.LanguageModel, never, AnthropicClient>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicLanguageModel.ts#L764)

Since v4.0.0

# models

## Model (type alias)

Known Anthropic Claude model identifiers exposed by the generated Anthropic schema.

**Details**

The Anthropic language model constructors accept `Model` values and custom
string model ids, so this type is best used for autocomplete and type checking
of known Claude ids.

**Signature**

```ts
type Model = typeof Generated.Model.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicLanguageModel.ts#L54)

Since v4.0.0

# tools

## AnthropicProviderDefinedTool (type alias)

Represents a provider-defined tool that can be passed to the Anthropic API.

**Details**

These include Anthropic's built-in tools like computer use, code execution,
web search, and text editing.

**Signature**

```ts
type AnthropicProviderDefinedTool =
  | typeof Generated.BetaBashTool_20241022.Encoded
  | typeof Generated.BetaBashTool_20250124.Encoded
  | typeof Generated.BetaCodeExecutionTool_20250522.Encoded
  | typeof Generated.BetaCodeExecutionTool_20250825.Encoded
  | typeof Generated.BetaComputerUseTool_20241022.Encoded
  | typeof Generated.BetaComputerUseTool_20250124.Encoded
  | typeof Generated.BetaComputerUseTool_20251124.Encoded
  | typeof Generated.BetaMemoryTool_20250818.Encoded
  | typeof Generated.BetaTextEditor_20241022.Encoded
  | typeof Generated.BetaTextEditor_20250124.Encoded
  | typeof Generated.BetaTextEditor_20250429.Encoded
  | typeof Generated.BetaTextEditor_20250728.Encoded
  | typeof Generated.BetaToolSearchToolBM25_20251119.Encoded
  | typeof Generated.BetaToolSearchToolRegex_20251119.Encoded
  | typeof Generated.BetaWebFetchTool_20250910.Encoded
  | typeof Generated.BetaWebSearchTool_20250305.Encoded
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicLanguageModel.ts#L1245)

Since v4.0.0

## AnthropicUserDefinedTool (type alias)

Encoded Anthropic custom tool definition that can be sent in a Messages API request.

**When to use**

Use when you need to type or inspect the provider-specific request payload for
a custom Anthropic tool.

**Details**

This type aliases the encoded `Generated.BetaTool` schema used for Effect
user-defined and dynamic tools after conversion. It contains the tool `name`,
optional `description`, and `input_schema`, plus Anthropic-specific fields
such as `strict` and `cache_control`.

**See**

- `AnthropicProviderDefinedTool` for the request shape used by Anthropic built-in provider tools

**Signature**

```ts
type AnthropicUserDefinedTool = typeof Generated.BetaTool.Encoded
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicLanguageModel.ts#L1232)

Since v4.0.0
