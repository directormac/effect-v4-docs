---
title: OpenAiClientGenerated.ts
nav_order: 3
parent: "@effect/ai-openai"
---

## OpenAiClientGenerated.ts overview

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [make](#make)
- [layers](#layers)
  - [layer](#layer)
  - [layerConfig](#layerconfig)
- [options](#options)
  - [Options (type alias)](#options-type-alias)
- [service](#service)
  - [OpenAiClientGenerated (class)](#openaiclientgenerated-class)

---

# constructors

## make

Creates a generated OpenAI client service with the given options.

**Signature**

```ts
declare const make: (options: Options) => Effect.Effect<Generated.OpenAiClient, never, HttpClient.HttpClient>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiClientGenerated.ts#L87)

Since v4.0.0

# layers

## layer

Creates a layer for the generated OpenAI client with the given options.

**Signature**

```ts
declare const layer: (options: Options) => Layer.Layer<OpenAiClientGenerated, never, HttpClient.HttpClient>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiClientGenerated.ts#L143)

Since v4.0.0

## layerConfig

Creates a layer for the generated OpenAI client, loading the requisite
configuration via Effect's `Config` module.

**Signature**

```ts
declare const layerConfig: (options?: {
  readonly apiKey?: Config.Config<Redacted.Redacted<string> | undefined> | undefined
  readonly apiUrl?: Config.Config<string> | undefined
  readonly organizationId?: Config.Config<Redacted.Redacted<string> | undefined> | undefined
  readonly projectId?: Config.Config<Redacted.Redacted<string> | undefined> | undefined
  readonly transformClient?: ((client: HttpClient.HttpClient) => HttpClient.HttpClient) | undefined
}) => Layer.Layer<OpenAiClientGenerated, Config.ConfigError, HttpClient.HttpClient>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiClientGenerated.ts#L153)

Since v4.0.0

# options

## Options (type alias)

Options for configuring the generated OpenAI client.

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

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiClientGenerated.ts#L43)

Since v4.0.0

# service

## OpenAiClientGenerated (class)

Service identifier for the generated OpenAI client.

**Signature**

```ts
declare class OpenAiClientGenerated
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiClientGenerated.ts#L29)

Since v4.0.0
