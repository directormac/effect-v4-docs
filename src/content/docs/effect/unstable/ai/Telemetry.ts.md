---
title: Telemetry.ts
nav_order: 156
parent: "effect"
---

## Telemetry.ts overview

Adds OpenTelemetry GenAI attributes to Effect AI spans.

This module models the `gen_ai.*` attributes used by language model and
embedding providers. It includes attribute types, helpers for writing
non-null attributes onto existing spans, and a `CurrentSpanTransformer`
service for adding custom span annotations from provider options and response
parts.

Since v4.0.0

---

## Exports Grouped by Category

- [annotations](#annotations)
  - [addGenAIAnnotations](#addgenaiannotations)
  - [addSpanAttributes](#addspanattributes)
- [models](#models)
  - [AllAttributes (type alias)](#allattributes-type-alias)
  - [BaseAttributes (interface)](#baseattributes-interface)
  - [GenAITelemetryAttributes (type alias)](#genaitelemetryattributes-type-alias)
  - [OperationAttributes (interface)](#operationattributes-interface)
  - [RequestAttributes (interface)](#requestattributes-interface)
  - [ResponseAttributes (interface)](#responseattributes-interface)
  - [SpanTransformer (interface)](#spantransformer-interface)
  - [TokenAttributes (interface)](#tokenattributes-interface)
  - [UsageAttributes (interface)](#usageattributes-interface)
  - [WellKnownOperationName (type alias)](#wellknownoperationname-type-alias)
  - [WellKnownSystem (type alias)](#wellknownsystem-type-alias)
- [options](#options)
  - [GenAITelemetryAttributeOptions (type alias)](#genaitelemetryattributeoptions-type-alias)
- [services](#services)
  - [CurrentSpanTransformer (class)](#currentspantransformer-class)
- [utility types](#utility-types)
  - [AttributesWithPrefix (type alias)](#attributeswithprefix-type-alias)
  - [FormatAttributeName (type alias)](#formatattributename-type-alias)

---

# annotations

## addGenAIAnnotations

Applies GenAI telemetry attributes to an OpenTelemetry span.

**When to use**

Use when you need to write GenAI request, response, token, or usage
attributes onto an existing OpenTelemetry span.

**Details**

This function adds standardized GenAI attributes to a span following
OpenTelemetry semantic conventions.

**Gotchas**

This function mutates the provided span in-place.

**Example** (Adding GenAI telemetry annotations)

```ts
import { Effect } from "effect"
import { Telemetry } from "effect/unstable/ai"

const directUsage = Effect.gen(function* () {
  const span = yield* Effect.currentSpan

  Telemetry.addGenAIAnnotations(span, {
    system: "openai",
    request: { model: "gpt-4", temperature: 0.7 },
    usage: { inputTokens: 100, outputTokens: 50 }
  })
})
```

**Signature**

```ts
declare const addGenAIAnnotations: {
  (options: GenAITelemetryAttributeOptions): (span: Span) => void
  (span: Span, options: GenAITelemetryAttributeOptions): void
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Telemetry.ts#L449)

Since v4.0.0

## addSpanAttributes

Creates a reusable span-attribute writer for a key prefix and key
transformer.

**Details**

The returned function mutates the supplied span by adding each non-nullish
attribute as `${prefix}.${transformedKey}`.

**Example** (Adding prefixed span attributes)

```ts
import { String } from "effect"
import type { Tracer } from "effect"
import { Telemetry } from "effect/unstable/ai"

const addCustomAttributes = Telemetry.addSpanAttributes("custom.ai", String.camelToSnake)

// Usage with a span
declare const span: Tracer.Span
addCustomAttributes(span, {
  modelName: "gpt-4",
  maxTokens: 1000
})
// Results in attributes: "custom.ai.model_name" and "custom.ai.max_tokens"
```

**Signature**

```ts
declare const addSpanAttributes: (
  keyPrefix: string,
  transformKey: (key: string) => string
) => <Attributes extends Record<string, any>>(span: Span, attributes: Attributes) => void
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Telemetry.ts#L317)

Since v4.0.0

# models

## AllAttributes (type alias)

All telemetry attributes which are part of the GenAI specification.

**Signature**

```ts
type AllAttributes = BaseAttributes &
  OperationAttributes &
  TokenAttributes &
  UsageAttributes &
  RequestAttributes &
  ResponseAttributes
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Telemetry.ts#L49)

Since v4.0.0

## BaseAttributes (interface)

Telemetry attributes which are part of the GenAI specification and are
namespaced by `gen_ai`.

**Signature**

```ts
export interface BaseAttributes {
  /**
   * The Generative AI product as identified by the client or server
   * instrumentation.
   */
  readonly system?: (string & {}) | WellKnownSystem | null | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Telemetry.ts#L64)

Since v4.0.0

## GenAITelemetryAttributes (type alias)

The attributes used to describe telemetry in the context of Generative
Artificial Intelligence (GenAI) models requests and responses.

**Details**

These attributes follow the OpenTelemetry generative AI semantic
conventions:
https://opentelemetry.io/docs/specs/semconv/attributes-registry/gen-ai/

**Signature**

```ts
type GenAITelemetryAttributes = Struct.Simplify<
  AttributesWithPrefix<BaseAttributes, "gen_ai"> &
    AttributesWithPrefix<OperationAttributes, "gen_ai.operation"> &
    AttributesWithPrefix<TokenAttributes, "gen_ai.token"> &
    AttributesWithPrefix<UsageAttributes, "gen_ai.usage"> &
    AttributesWithPrefix<RequestAttributes, "gen_ai.request"> &
    AttributesWithPrefix<ResponseAttributes, "gen_ai.response">
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Telemetry.ts#L34)

Since v4.0.0

## OperationAttributes (interface)

Telemetry attributes which are part of the GenAI specification and are
namespaced by `gen_ai.operation`.

**Signature**

```ts
export interface OperationAttributes {
  readonly name?: (string & {}) | WellKnownOperationName | null | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Telemetry.ts#L79)

Since v4.0.0

## RequestAttributes (interface)

Telemetry attributes which are part of the GenAI specification and are
namespaced by `gen_ai.request`.

**Signature**

```ts
export interface RequestAttributes {
  /**
   * The name of the GenAI model a request is being made to.
   */
  readonly model?: string | null | undefined
  /**
   * The temperature setting for the GenAI request.
   */
  readonly temperature?: number | null | undefined
  /**
   * The temperature setting for the GenAI request.
   */
  readonly topK?: number | null | undefined
  /**
   * The top_k sampling setting for the GenAI request.
   */
  readonly topP?: number | null | undefined
  /**
   * The top_p sampling setting for the GenAI request.
   */
  readonly maxTokens?: number | null | undefined
  /**
   * The encoding formats requested in an embeddings operation, if specified.
   */
  readonly encodingFormats?: ReadonlyArray<string> | null | undefined
  /**
   * List of sequences that the model will use to stop generating further
   * tokens.
   */
  readonly stopSequences?: ReadonlyArray<string> | null | undefined
  /**
   * The frequency penalty setting for the GenAI request.
   */
  readonly frequencyPenalty?: number | null | undefined
  /**
   * The presence penalty setting for the GenAI request.
   */
  readonly presencePenalty?: number | null | undefined
  /**
   * The seed setting for the GenAI request. Requests with same seed value
   * are more likely to return same result.
   */
  readonly seed?: number | null | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Telemetry.ts#L113)

Since v4.0.0

## ResponseAttributes (interface)

Telemetry attributes which are part of the GenAI specification and are
namespaced by `gen_ai.response`.

**Signature**

```ts
export interface ResponseAttributes {
  /**
   * The unique identifier for the completion.
   */
  readonly id?: string | null | undefined
  /**
   * The name of the model that generated the response.
   */
  readonly model?: string | null | undefined
  /**
   * Array of reasons the model stopped generating tokens, corresponding to
   * each generation received.
   */
  readonly finishReasons?: ReadonlyArray<string> | null | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Telemetry.ts#L165)

Since v4.0.0

## SpanTransformer (interface)

A function that can transform OpenTelemetry spans based on AI operation data.

**Details**

Span transformers receive the complete request/response context from AI operations
and can add custom telemetry attributes, metrics, or other observability data.

**Example** (Transforming AI spans)

```ts
import type { Telemetry } from "effect/unstable/ai"

const customTransformer: Telemetry.SpanTransformer = ({ response, span }) => {
  // Add custom attributes based on the response
  const textParts = response.filter((part) => part.type === "text")
  const totalTextLength = textParts.reduce((sum, part) => sum + (part.type === "text" ? part.text.length : 0), 0)
  span.attribute("total_text_length", totalTextLength)
}
```

**Signature**

```ts
export interface SpanTransformer {
  (
    options: ProviderOptions & {
      /**
       * Array of response parts generated by the AI model.
       */
      readonly response: ReadonlyArray<Response.AllParts<any>>
    }
  ): void
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Telemetry.ts#L488)

Since v4.0.0

## TokenAttributes (interface)

Telemetry attributes which are part of the GenAI specification and are
namespaced by `gen_ai.token`.

**Signature**

```ts
export interface TokenAttributes {
  readonly type?: string | null | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Telemetry.ts#L90)

Since v4.0.0

## UsageAttributes (interface)

Telemetry attributes which are part of the GenAI specification and are
namespaced by `gen_ai.usage`.

**Signature**

```ts
export interface UsageAttributes {
  readonly inputTokens?: number | null | undefined
  readonly outputTokens?: number | null | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Telemetry.ts#L101)

Since v4.0.0

## WellKnownOperationName (type alias)

The `gen_ai.operation.name` attribute has the following list of well-known
values.

**Details**

If one of them applies, then the respective value **MUST** be used;
otherwise, a custom value **MAY** be used.

**Signature**

```ts
type WellKnownOperationName = "chat" | "embeddings" | "text_completion"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Telemetry.ts#L193)

Since v4.0.0

## WellKnownSystem (type alias)

The `gen_ai.system` attribute has the following list of well-known values.

**Details**

If one of them applies, then the respective value **MUST** be used;
otherwise, a custom value **MAY** be used.

**Signature**

```ts
type WellKnownSystem =
  | "anthropic"
  | "aws.bedrock"
  | "az.ai.inference"
  | "az.ai.openai"
  | "cohere"
  | "deepseek"
  | "gemini"
  | "groq"
  | "ibm.watsonx.ai"
  | "mistral_ai"
  | "openai"
  | "perplexity"
  | "vertex_ai"
  | "xai"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Telemetry.ts#L206)

Since v4.0.0

# options

## GenAITelemetryAttributeOptions (type alias)

Configuration options for GenAI telemetry attributes.

**Details**

Combines base attributes with optional grouped attributes for comprehensive
telemetry coverage of AI operations.

**Example** (Configuring GenAI telemetry attributes)

```ts
import type { Telemetry } from "effect/unstable/ai"

const telemetryOptions: Telemetry.GenAITelemetryAttributeOptions = {
  system: "openai",
  operation: {
    name: "chat"
  },
  request: {
    model: "gpt-4-turbo",
    temperature: 0.7,
    maxTokens: 2000
  },
  response: {
    id: "chatcmpl-123",
    model: "gpt-4-turbo-2024-04-09",
    finishReasons: ["stop"]
  },
  usage: {
    inputTokens: 50,
    outputTokens: 25
  }
}
```

**Signature**

```ts
type GenAITelemetryAttributeOptions = BaseAttributes & {
  /**
   * Operation-specific attributes (e.g., operation name).
   */
  readonly operation?: OperationAttributes | undefined
  /**
   * Request-specific attributes (e.g., model parameters).
   */
  readonly request?: RequestAttributes | undefined
  /**
   * Response-specific attributes (e.g., response metadata).
   */
  readonly response?: ResponseAttributes | undefined
  /**
   * Token-specific attributes.
   */
  readonly token?: TokenAttributes | undefined
  /**
   * Usage statistics attributes (e.g., token counts).
   */
  readonly usage?: UsageAttributes | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Telemetry.ts#L389)

Since v4.0.0

# services

## CurrentSpanTransformer (class)

Service tag for providing a `SpanTransformer` to large language model
operations.

**When to use**

Use to retrieve or provide the current `SpanTransformer` through context for
language model span annotation.

**See**

- `SpanTransformer` for the transformer contract provided by this service

**Signature**

```ts
declare class CurrentSpanTransformer
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Telemetry.ts#L513)

Since v4.0.0

# utility types

## AttributesWithPrefix (type alias)

Utility type for prefixing attribute names with a namespace.

**Details**

Transforms attribute keys by adding a prefix and formatting them according to
OpenTelemetry conventions (camelCase to snake_case).

**Example** (Prefixing telemetry attributes)

```ts
import type { Telemetry } from "effect/unstable/ai"

type RequestAttrs = {
  modelName: string
  maxTokens: number
}

type PrefixedAttrs = Telemetry.AttributesWithPrefix<RequestAttrs, "gen_ai.request">
// Results in: {
//   "gen_ai.request.model_name": string
//   "gen_ai.request.max_tokens": number
// }
```

**Signature**

```ts
type AttributesWithPrefix<Attributes, Prefix> = {
  [Name in keyof Attributes as `${Prefix}.${FormatAttributeName<Name>}`]: Attributes[Name]
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Telemetry.ts#L253)

Since v4.0.0

## FormatAttributeName (type alias)

Utility type for converting camelCase names to snake_case format.

**Details**

This type recursively transforms string literal types from camelCase to
snake_case, which is the standard format for OpenTelemetry attributes.

**Example** (Formatting attribute names)

```ts
import type { Telemetry } from "effect/unstable/ai"

type Formatted1 = Telemetry.FormatAttributeName<"modelName"> // "model_name"
type Formatted2 = Telemetry.FormatAttributeName<"maxTokens"> // "max_tokens"
type Formatted3 = Telemetry.FormatAttributeName<"temperature"> // "temperature"
```

**Signature**

```ts
type FormatAttributeName<T> = T extends string
  ? T extends `${infer First}${infer Rest}`
    ? `${First extends Uppercase<First> ? "_" : ""}${Lowercase<First>}${FormatAttributeName<Rest>}`
    : T
  : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Telemetry.ts#L278)

Since v4.0.0
