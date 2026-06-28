---
title: OpenRouterConfig.ts
nav_order: 3
parent: "@effect/ai-openrouter"
---

## OpenRouterConfig.ts overview

The `OpenRouterConfig` module lets a workflow temporarily customize the HTTP
client used by generated OpenRouter request methods. `OpenRouterClient` reads
this scoped transform when generated client operations execute, so callers can
add middleware or instrumentation without rebuilding the client layer.

Since v4.0.0

---

## Exports Grouped by Category

- [configuration](#configuration)
  - [withClientTransform](#withclienttransform)
- [services](#services)
  - [OpenRouterConfig (class)](#openrouterconfig-class)
- [utils](#utils)
  - [OpenRouterConfig (namespace)](#openrouterconfig-namespace)
    - [Service (interface)](#service-interface)

---

# configuration

## withClientTransform

Provides a scoped transform for the OpenRouter HTTP client used by provider
operations.

**When to use**

Use when you need temporary OpenRouter HTTP client customization for a
single effect or workflow without rebuilding the client layer.

**Details**

Supports both data-first and data-last forms. The transform is stored in the
scoped `OpenRouterConfig` service and read by generated OpenRouter request
operations while running the supplied effect.

**Gotchas**

If a transform is already present in the scoped config, this helper replaces
it. Compose transforms manually when both should apply. Streaming chat
completion requests are sent directly by `OpenRouterClient.make` and do not
read this scoped transform.

**Signature**

```ts
declare const withClientTransform: {
  (transform: (client: HttpClient) => HttpClient): <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<A, E, R>
  <A, E, R>(self: Effect.Effect<A, E, R>, transform: (client: HttpClient) => HttpClient): Effect.Effect<A, E, R>
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openrouter/src/OpenRouterConfig.ts#L86)

Since v4.0.0

# services

## OpenRouterConfig (class)

Context service for scoped OpenRouter provider configuration used by client
operations.

**When to use**

Use as the context service tag when manually providing or reading scoped
OpenRouter provider configuration in an Effect context.

**See**

- `withClientTransform` for scoping an HTTP client transformation

**Signature**

```ts
declare class OpenRouterConfig
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openrouter/src/OpenRouterConfig.ts#L28)

Since v4.0.0

# utils

## OpenRouterConfig (namespace)

Types associated with the `OpenRouterConfig` context service.

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openrouter/src/OpenRouterConfig.ts#L48)

Since v4.0.0

### Service (interface)

Configuration values read by OpenRouter provider operations when resolving
the generated HTTP client.

**Signature**

```ts
export interface Service {
  readonly transformClient?: ((client: HttpClient) => HttpClient) | undefined
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openrouter/src/OpenRouterConfig.ts#L56)

Since v4.0.0
