---
title: OpenAiTelemetry.ts
nav_order: 7
parent: "@effect/ai-openai-compat"
---

## OpenAiTelemetry.ts overview

The `OpenAiTelemetry` module defines OpenAI-compatible telemetry attributes
and a helper for adding them to a tracing span. It keeps the standard GenAI
telemetry attributes and adds request and response metadata under the
`gen_ai.openai.*` OpenTelemetry namespaces.

Since v4.0.0

---

## Exports Grouped by Category

- [models](#models)
  - [AllAttributes (type alias)](#allattributes-type-alias)
  - [OpenAiTelemetryAttributes (type alias)](#openaitelemetryattributes-type-alias)
  - [RequestAttributes (interface)](#requestattributes-interface)
  - [ResponseAttributes (interface)](#responseattributes-interface)
  - [WellKnownResponseFormat (type alias)](#wellknownresponseformat-type-alias)
  - [WellKnownServiceTier (type alias)](#wellknownservicetier-type-alias)
- [options](#options)
  - [OpenAiTelemetryAttributeOptions (type alias)](#openaitelemetryattributeoptions-type-alias)
- [tracing](#tracing)
  - [addGenAIAnnotations](#addgenaiannotations)

---

# models

## AllAttributes (type alias)

All telemetry attributes which are part of the GenAI specification,
including the OpenAI-specific attributes.

**Signature**

```ts
type AllAttributes = Telemetry.AllAttributes & RequestAttributes & ResponseAttributes
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiTelemetry.ts#L41)

Since v4.0.0

## OpenAiTelemetryAttributes (type alias)

The attributes used to describe telemetry in the context of Generative
Artificial Intelligence (GenAI) Models requests and responses.

**Details**

These attributes follow the OpenTelemetry generative AI semantic
conventions:
https://opentelemetry.io/docs/specs/semconv/attributes-registry/gen-ai/

**Signature**

```ts
type OpenAiTelemetryAttributes = Simplify<
  Telemetry.GenAITelemetryAttributes &
    Telemetry.AttributesWithPrefix<RequestAttributes, "gen_ai.openai.request"> &
    Telemetry.AttributesWithPrefix<ResponseAttributes, "gen_ai.openai.request">
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiTelemetry.ts#L28)

Since v4.0.0

## RequestAttributes (interface)

Telemetry attributes which are part of the GenAI specification and are
namespaced by `gen_ai.openai.request`.

**Signature**

```ts
export interface RequestAttributes {
  /**
   * The response format that is requested.
   */
  readonly responseFormat?: (string & {}) | WellKnownResponseFormat | null | undefined
  /**
   * The service tier requested. May be a specific tier, `default`, or `auto`.
   */
  readonly serviceTier?: (string & {}) | WellKnownServiceTier | null | undefined
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiTelemetry.ts#L50)

Since v4.0.0

## ResponseAttributes (interface)

Telemetry attributes which are part of the GenAI specification and are
namespaced by `gen_ai.openai.response`.

**Signature**

```ts
export interface ResponseAttributes {
  /**
   * The service tier used for the response.
   */
  readonly serviceTier?: string | null | undefined
  /**
   * A fingerprint to track any eventual change in the Generative AI
   * environment.
   */
  readonly systemFingerprint?: string | null | undefined
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiTelemetry.ts#L68)

Since v4.0.0

## WellKnownResponseFormat (type alias)

The `gen_ai.openai.request.response_format` attribute has a list of
well-known values.

**Details**

If one of them applies, then the respective value **MUST** be used;
otherwise, a custom value **MAY** be used.

**Signature**

```ts
type WellKnownResponseFormat = "json_object" | "json_schema" | "text"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiTelemetry.ts#L92)

Since v4.0.0

## WellKnownServiceTier (type alias)

The `gen_ai.openai.request.service_tier` attribute has a list of
well-known values.

**Details**

If one of them applies, then the respective value **MUST** be used;
otherwise, a custom value **MAY** be used.

**Signature**

```ts
type WellKnownServiceTier = "auto" | "default"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiTelemetry.ts#L106)

Since v4.0.0

# options

## OpenAiTelemetryAttributeOptions (type alias)

Options accepted by `addGenAIAnnotations`, combining standard GenAI telemetry
attributes with optional OpenAI-compatible request and response attributes.

**Signature**

```ts
type OpenAiTelemetryAttributeOptions = Telemetry.GenAITelemetryAttributeOptions & {
  openai?:
    | {
        request?: RequestAttributes | undefined
        response?: ResponseAttributes | undefined
      }
    | undefined
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiTelemetry.ts#L115)

Since v4.0.0

# tracing

## addGenAIAnnotations

Applies the specified OpenAI GenAI telemetry attributes to the provided
`Span`.

**When to use**

Use to annotate an OpenAI-compatible model span with standard GenAI telemetry
attributes and OpenAI-specific request or response metadata.

**Details**

Standard GenAI attributes are applied first. When OpenAI request or response
metadata is present, it is written under `gen_ai.openai.request.*` and
`gen_ai.openai.response.*` attributes.

**Gotchas**

Mutates the supplied `Span` in place.

**Signature**

```ts
declare const addGenAIAnnotations: {
  (options: OpenAiTelemetryAttributeOptions): (span: Span) => void
  (span: Span, options: OpenAiTelemetryAttributeOptions): void
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiTelemetry.ts#L151)

Since v4.0.0
