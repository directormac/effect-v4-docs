---
title: OpenAiError.ts
nav_order: 6
parent: "@effect/ai-openai"
---

## OpenAiError.ts overview

OpenAI-specific error metadata fields.

Since v4.0.0

---

## Exports Grouped by Category

- [models](#models)
  - [OpenAiErrorMetadata (type alias)](#openaierrormetadata-type-alias)
  - [OpenAiRateLimitMetadata (type alias)](#openairatelimitmetadata-type-alias)

---

# models

## OpenAiErrorMetadata (type alias)

OpenAI-specific error metadata fields.

**Signature**

```ts
type OpenAiErrorMetadata = {
  /**
   * The OpenAI error code returned by the API.
   */
  readonly errorCode: string | null
  /**
   * The OpenAI error type returned by the API.
   */
  readonly errorType: string | null
  /**
   * The unique request ID for debugging with OpenAI support.
   */
  readonly requestId: string | null
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiError.ts#L16)

Since v4.0.0

## OpenAiRateLimitMetadata (type alias)

OpenAI-specific rate limit metadata fields.

**Details**

Extends base error metadata with rate limit specific information from
OpenAI's rate limit headers.

**Signature**

```ts
type OpenAiRateLimitMetadata = OpenAiErrorMetadata & {
  /**
   * The rate limit type (e.g. "requests", "tokens").
   */
  readonly limit: string | null
  /**
   * Number of remaining requests in the current window.
   */
  readonly remaining: number | null
  /**
   * Time until the request rate limit resets.
   */
  readonly resetRequests: string | null
  /**
   * Time until the token rate limit resets.
   */
  readonly resetTokens: string | null
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiError.ts#L42)

Since v4.0.0
