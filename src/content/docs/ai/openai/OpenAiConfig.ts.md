---
title: OpenAiConfig.ts
nav_order: 4
parent: "@effect/ai-openai"
---

## OpenAiConfig.ts overview

The `OpenAiConfig` module lets a workflow temporarily customize the HTTP
client used by `@effect/ai-openai` request helpers. OpenAI client, language
model, and embedding code read this scoped transform when they execute
provider calls.

Since v4.0.0

---

## Exports Grouped by Category

- [configuration](#configuration)
  - [withClientTransform](#withclienttransform)
- [services](#services)
  - [OpenAiConfig (class)](#openaiconfig-class)
- [utils](#utils)
  - [OpenAiConfig (namespace)](#openaiconfig-namespace)
    - [Service (interface)](#service-interface)

---

# configuration

## withClientTransform

Provides a scoped transform for the OpenAI HTTP client used by provider
operations.

**When to use**

Use when you need temporary OpenAI HTTP client customization for a single
effect or workflow without rebuilding the client layer.

**Details**

Supports both data-first and data-last forms. The transform is stored in the
scoped `OpenAiConfig` service and read by OpenAI provider operations while
running the supplied effect.

**Gotchas**

If a transform is already present in the scoped config, this helper replaces
it. Compose transforms manually when both should apply.

**Signature**

```ts
declare const withClientTransform: {
  (transform: (client: HttpClient) => HttpClient): <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<A, E, R>
  <A, E, R>(self: Effect.Effect<A, E, R>, transform: (client: HttpClient) => HttpClient): Effect.Effect<A, E, R>
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiConfig.ts#L83)

Since v4.0.0

# services

## OpenAiConfig (class)

Context service for scoped OpenAI configuration used by provider operations.

**When to use**

Use to provide scoped OpenAI client configuration, such as an HTTP client
transform, to OpenAI provider operations without passing it through each call.

**See**

- `withClientTransform` for scoping an HTTP client transformation

**Signature**

```ts
declare class OpenAiConfig
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiConfig.ts#L27)

Since v4.0.0

# utils

## OpenAiConfig (namespace)

Types used by the `OpenAiConfig` context service.

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiConfig.ts#L47)

Since v4.0.0

### Service (interface)

Configuration values read by OpenAI provider operations when executing
requests.

**Signature**

```ts
export interface Service {
  readonly transformClient?: ((client: HttpClient) => HttpClient) | undefined
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiConfig.ts#L55)

Since v4.0.0
