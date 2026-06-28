---
title: AnthropicConfig.ts
nav_order: 2
parent: "@effect/ai-anthropic"
---

## AnthropicConfig.ts overview

The `AnthropicConfig` module lets a workflow temporarily customize the HTTP
client used by generated Anthropic requests. It is used by
`AnthropicClient` when request helpers run, so code can add middleware,
logging, or other client changes without rebuilding the client layer.

Since v4.0.0

---

## Exports Grouped by Category

- [configuration](#configuration)
  - [withClientTransform](#withclienttransform)
- [services](#services)
  - [AnthropicConfig (class)](#anthropicconfig-class)
- [utils](#utils)
  - [AnthropicConfig (namespace)](#anthropicconfig-namespace)
    - [Service (interface)](#service-interface)

---

# configuration

## withClientTransform

Runs an effect with an `AnthropicConfig` override that transforms the underlying `HttpClient` used by generated Anthropic requests.

**When to use**

Use when you need to apply a temporary `HttpClient` transformation, such as adding middleware or logging, to a
specific scope of an effectful program.

**Signature**

```ts
declare const withClientTransform: {
  (transform: (client: HttpClient) => HttpClient): <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<A, E, R>
  <A, E, R>(self: Effect.Effect<A, E, R>, transform: (client: HttpClient) => HttpClient): Effect.Effect<A, E, R>
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicConfig.ts#L74)

Since v4.0.0

# services

## AnthropicConfig (class)

Service tag for Anthropic client configuration overrides, such as transformations applied to the generated HTTP client.

**When to use**

Use when you need to provide or read Anthropic client configuration through
Effect's context from a layer or integration.

**See**

- `withClientTransform` for scoping an HTTP client transformation

**Signature**

```ts
declare class AnthropicConfig
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicConfig.ts#L27)

Since v4.0.0

# utils

## AnthropicConfig (namespace)

Namespace containing types associated with the `AnthropicConfig` service.

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicConfig.ts#L47)

Since v4.0.0

### Service (interface)

Configuration provided through `AnthropicConfig`.

**Details**

Use `transformClient` to wrap or replace the `HttpClient` used by generated Anthropic API requests.

**Signature**

```ts
export interface Service {
  readonly transformClient?: ((client: HttpClient) => HttpClient) | undefined
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicConfig.ts#L58)

Since v4.0.0
