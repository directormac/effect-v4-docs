---
title: OpenRouterError.ts
nav_order: 4
parent: "@effect/ai-openrouter"
---

## OpenRouterError.ts overview

OpenRouter-specific error metadata fields.

Since v4.0.0

---

## Exports Grouped by Category

- [models](#models)
  - [OpenRouterErrorMetadata (type alias)](#openroutererrormetadata-type-alias)
  - [OpenRouterRateLimitMetadata (type alias)](#openrouterratelimitmetadata-type-alias)

---

# models

## OpenRouterErrorMetadata (type alias)

OpenRouter-specific error metadata fields.

**Signature**

```ts
type OpenRouterErrorMetadata = {
  /**
   * The error code returned by the API.
   */
  readonly errorCode: string | number | null
  /**
   * The error type returned by the API.
   */
  readonly errorType: string | null
  /**
   * The unique request ID for debugging.
   */
  readonly requestId: string | null
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openrouter/src/OpenRouterError.ts#L16)

Since v4.0.0

## OpenRouterRateLimitMetadata (type alias)

OpenRouter-specific rate limit metadata fields.

**Signature**

```ts
type OpenRouterRateLimitMetadata = OpenRouterErrorMetadata & {
  readonly limit: string | null
  readonly remaining: number | null
  readonly resetRequests: string | null
  readonly resetTokens: string | null
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openrouter/src/OpenRouterError.ts#L37)

Since v4.0.0
