---
title: Model.ts
nav_order: 151
parent: "effect"
---

## Model.ts overview

Wraps an AI model layer with provider and model metadata.

A `Model` can be used anywhere its underlying `Layer` can be used. It also
provides the current provider name and model name through the Effect context.
This module includes the `Model` interface, the `ProviderName` and
`ModelName` service tags, and the `make` constructor. Models can also capture
their required services from the current context when they need to be used
inside another Effect service.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [make](#make)
- [models](#models)
  - [Model (interface)](#model-interface)
- [services](#services)
  - [ModelName (class)](#modelname-class)
  - [ProviderName (class)](#providername-class)

---

# constructors

## make

Creates a Model from a provider name and a Layer that constructs AI services.

**Example** (Providing model metadata)

```ts
import { Effect } from "effect"
import type { Layer } from "effect"
import { LanguageModel, Model } from "effect/unstable/ai"

declare const bedrockLayer: Layer.Layer<LanguageModel.LanguageModel>

// Model automatically provides ProviderName and ModelName services
const checkProviderAndGenerate = Effect.gen(function* () {
  const provider = yield* Model.ProviderName
  const modelName = yield* Model.ModelName

  console.log(`Generating with: ${provider}/${modelName}`)

  return yield* LanguageModel.generateText({
    prompt: `Hello from ${provider}!`
  })
})

const program = checkProviderAndGenerate.pipe(
  Effect.provide(Model.make("amazon-bedrock", "claude-3-5-haiku", bedrockLayer))
)
// Will log: "Generating with: amazon-bedrock/claude-3-5-haiku"
```

**Signature**

```ts
declare const make: <const Provider extends string, const Name extends string, Provides, Requires>(
  provider: Provider,
  modelName: Name,
  layer: Layer.Layer<Provides, never, Requires>
) => Model<Provider, Provides, Requires>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Model.ts#L141)

Since v4.0.0

# models

## Model (interface)

A Model represents a provider-specific AI service.

**When to use**

Use when you use a Model directly as a Layer to provide a particular model implementation
to an Effect program, or use it as an Effect to "lift" dependencies of the
Model constructor into the parent Effect when you want to use a Model from
within an Effect service.

**Signature**

```ts
export interface Model<in out Provider, in out Provides, in out Requires> extends Layer.Layer<
  Provides | ProviderName | ModelName,
  never,
  Requires
> {
  readonly [TypeId]: typeof TypeId

  /**
   * The provider identifier (e.g., "openai", "anthropic", "amazon-bedrock").
   */
  readonly provider: Provider

  /**
   * Returns a `Layer` with the requirements satisfied, using the current context.
   */
  readonly captureRequirements: Effect.Effect<Layer.Layer<Provides | ProviderName | ModelName>, never, Requires>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Model.ts#L34)

Since v4.0.0

# services

## ModelName (class)

Service tag that provides the current large language model name.

**Details**

This tag is automatically provided by Model instances and can be used to
access the name of the model that is currently in use within a given Effect
program.

**Signature**

```ts
declare class ModelName
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Model.ts#L82)

Since v4.0.0

## ProviderName (class)

Service tag that provides the current large language model provider name.

**Details**

This tag is automatically provided by Model instances and can be used to
access the name of the provider that is currently in use within a given
Effect program.

**Signature**

```ts
declare class ProviderName
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Model.ts#L66)

Since v4.0.0
