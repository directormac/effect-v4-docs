---
title: OpenAiConfig.ts
nav_order: 3
parent: "@effect/ai-openai-compat"
---

## OpenAiConfig.ts overview

The `OpenAiConfig` module lets a workflow temporarily customize the HTTP
client used by OpenAI-compatible request helpers. Model, embedding, and
tool-calling code can use this scoped configuration to add middleware,
instrumentation, or routing without rebuilding the client layer.

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

Provides an HTTP client transform for the supplied effect.

**When to use**

Use to add provider-specific OpenAI-compatible HTTP behavior, such as
headers, retries, instrumentation, or proxy routing.

**Details**

OpenAI-compatible provider services read the transform from the
`OpenAiConfig` context.

**Signature**

```ts
declare const withClientTransform: {
  (transform: (client: HttpClient) => HttpClient): <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<A, E, R>
  <A, E, R>(self: Effect.Effect<A, E, R>, transform: (client: HttpClient) => HttpClient): Effect.Effect<A, E, R>
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiConfig.ts#L77)

Since v4.0.0

# services

## OpenAiConfig (class)

Context service for OpenAI-compatible client configuration in the current
Effect scope.

**When to use**

Use as the context service for scoped OpenAI-compatible client configuration
and HTTP client transforms.

**See**

- `withClientTransform` for scoping an HTTP client transformation

**Signature**

```ts
declare class OpenAiConfig
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiConfig.ts#L28)

Since v4.0.0

# utils

## OpenAiConfig (namespace)

Types associated with the `OpenAiConfig` context service.

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiConfig.ts#L48)

Since v4.0.0

### Service (interface)

Configuration consumed by OpenAI-compatible clients when they build or
resolve the underlying HTTP client.

**Signature**

```ts
export interface Service {
  readonly transformClient?: ((client: HttpClient) => HttpClient) | undefined
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiConfig.ts#L56)

Since v4.0.0
