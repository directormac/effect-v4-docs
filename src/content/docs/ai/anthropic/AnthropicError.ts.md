---
title: AnthropicError.ts
nav_order: 3
parent: "@effect/ai-anthropic"
---

## AnthropicError.ts overview

Anthropic-specific error metadata fields.

**Details**

Contains the Anthropic error type and request identifier copied from provider
error responses when available. Either field may be `null` when Anthropic
does not include it or the response cannot be decoded.

**See**

- `AnthropicRateLimitMetadata` for rate-limit responses that also include parsed Anthropic rate-limit headers

Since v4.0.0

---

## Exports Grouped by Category

- [models](#models)
  - [AnthropicErrorMetadata (type alias)](#anthropicerrormetadata-type-alias)
  - [AnthropicRateLimitMetadata (type alias)](#anthropicratelimitmetadata-type-alias)

---

# models

## AnthropicErrorMetadata (type alias)

Anthropic-specific error metadata fields.

**Details**

Contains the Anthropic error type and request identifier copied from provider
error responses when available. Either field may be `null` when Anthropic
does not include it or the response cannot be decoded.

**See**

- `AnthropicRateLimitMetadata` for rate-limit responses that also include parsed Anthropic rate-limit headers

**Signature**

```ts
type AnthropicErrorMetadata = {
  /**
   * The Anthropic error type returned by the API.
   */
  readonly errorType: string | null
  /**
   * The unique request ID for debugging with Anthropic support.
   */
  readonly requestId: string | null
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicError.ts#L24)

Since v4.0.0

## AnthropicRateLimitMetadata (type alias)

Anthropic-specific rate limit metadata fields.

**Details**

Extends base error metadata with rate limit-specific information from Anthropic's rate limit headers.

**Signature**

```ts
type AnthropicRateLimitMetadata = AnthropicErrorMetadata & {
  /**
   * Number of requests allowed in the current period.
   */
  readonly requestsLimit: number | null
  /**
   * Number of requests remaining in the current period.
   */
  readonly requestsRemaining: number | null
  /**
   * Time when the request rate limit resets.
   */
  readonly requestsReset: string | null
  /**
   * Number of tokens allowed in the current period.
   */
  readonly tokensLimit: number | null
  /**
   * Number of tokens remaining in the current period.
   */
  readonly tokensRemaining: number | null
  /**
   * Time when the token rate limit resets.
   */
  readonly tokensReset: string | null
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicError.ts#L45)

Since v4.0.0
