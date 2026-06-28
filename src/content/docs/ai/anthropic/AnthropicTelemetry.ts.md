---
title: AnthropicTelemetry.ts
nav_order: 5
parent: "@effect/ai-anthropic"
---

## AnthropicTelemetry.ts overview

The `AnthropicTelemetry` module defines Anthropic-specific telemetry
attributes and a helper for adding them to a tracing span. It keeps the
standard GenAI telemetry attributes and adds request and response metadata
under the `gen_ai.anthropic.*` OpenTelemetry namespaces.

Since v4.0.0

---

## Exports Grouped by Category

- [annotations](#annotations)
  - [addGenAIAnnotations](#addgenaiannotations)
- [models](#models)
  - [AllAttributes (type alias)](#allattributes-type-alias)
  - [AnthropicTelemetryAttributes (type alias)](#anthropictelemetryattributes-type-alias)
  - [RequestAttributes (interface)](#requestattributes-interface)
  - [ResponseAttributes (interface)](#responseattributes-interface)
- [options](#options)
  - [AnthropicTelemetryAttributeOptions (type alias)](#anthropictelemetryattributeoptions-type-alias)

---

# annotations

## addGenAIAnnotations

Applies the specified Anthropic GenAI telemetry attributes to the provided
`Span`.

**When to use**

Use to annotate an Anthropic model span with standard GenAI telemetry
attributes and Anthropic-specific request or response metadata.

**Gotchas**

This method mutates the `Span` in place.

**Signature**

```ts
declare const addGenAIAnnotations: {
  (options: AnthropicTelemetryAttributeOptions): (span: Span) => void
  (span: Span, options: AnthropicTelemetryAttributeOptions): void
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTelemetry.ts#L119)

Since v4.0.0

# models

## AllAttributes (type alias)

All telemetry attributes which are part of the GenAI specification,
including the Anthropic-specific attributes.

**Signature**

```ts
type AllAttributes = Telemetry.AllAttributes & RequestAttributes & ResponseAttributes
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTelemetry.ts#L41)

Since v4.0.0

## AnthropicTelemetryAttributes (type alias)

The attributes used to describe telemetry in the context of Generative
Artificial Intelligence (GenAI) Models requests and responses.

**Details**

These attributes follow the OpenTelemetry generative AI semantic
conventions:
https://opentelemetry.io/docs/specs/semconv/attributes-registry/gen-ai/

**Signature**

```ts
type AnthropicTelemetryAttributes = Simplify<
  Telemetry.GenAITelemetryAttributes &
    Telemetry.AttributesWithPrefix<RequestAttributes, "gen_ai.anthropic.request"> &
    Telemetry.AttributesWithPrefix<ResponseAttributes, "gen_ai.anthropic.response">
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTelemetry.ts#L28)

Since v4.0.0

## RequestAttributes (interface)

Telemetry attributes which are part of the GenAI specification and are
namespaced by `gen_ai.anthropic.request`.

**Signature**

```ts
export interface RequestAttributes {
  /**
   * Whether extended thinking is enabled.
   */
  readonly extendedThinking?: boolean | null | undefined
  /**
   * The budget tokens for extended thinking.
   */
  readonly thinkingBudgetTokens?: number | null | undefined
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTelemetry.ts#L50)

Since v4.0.0

## ResponseAttributes (interface)

Telemetry attributes which are part of the GenAI specification and are
namespaced by `gen_ai.anthropic.response`.

**Signature**

```ts
export interface ResponseAttributes {
  /**
   * The stop reason from the response.
   */
  readonly stopReason?: string | null | undefined
  /**
   * Number of cache creation input tokens.
   */
  readonly cacheCreationInputTokens?: number | null | undefined
  /**
   * Number of cache read input tokens.
   */
  readonly cacheReadInputTokens?: number | null | undefined
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTelemetry.ts#L68)

Since v4.0.0

# options

## AnthropicTelemetryAttributeOptions (type alias)

Options accepted by `addGenAIAnnotations`, combining standard GenAI telemetry attributes with optional Anthropic request and response attributes.

**Signature**

```ts
type AnthropicTelemetryAttributeOptions = Telemetry.GenAITelemetryAttributeOptions & {
  anthropic?:
    | {
        request?: RequestAttributes | undefined
        response?: ResponseAttributes | undefined
      }
    | undefined
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTelemetry.ts#L89)

Since v4.0.0
