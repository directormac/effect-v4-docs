---
title: LanguageModel.ts
nav_order: 148
parent: "effect"
---

## LanguageModel.ts overview

Defines the shared service for language model providers.

The `LanguageModel` service lets application code ask for generated text,
streamed text, or structured output without depending on a specific provider.
Requests can include tools, and the service can resolve tool calls while the
model is generating a response. This module contains the service contract,
request and response types, structured-output support, and the constructor
used by provider packages to adapt their own generate and stream functions to
the shared interface.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [make](#make)
- [models](#models)
  - [CodecTransformer (type alias)](#codectransformer-type-alias)
  - [GenerateObjectResponse (class)](#generateobjectresponse-class)
    - [value (property)](#value-property)
  - [GenerateTextResponse (class)](#generatetextresponse-class)
    - [content (property)](#content-property)
  - [Service (interface)](#service-interface)
  - [ToolChoice (type alias)](#toolchoice-type-alias)
- [object generation](#object-generation)
  - [generateObject](#generateobject)
- [options](#options)
  - [GenerateObjectOptions (interface)](#generateobjectoptions-interface)
  - [GenerateTextOptions (interface)](#generatetextoptions-interface)
  - [ProviderOptions (interface)](#provideroptions-interface)
- [services](#services)
  - [LanguageModel (class)](#languagemodel-class)
  - [defaultCodecTransformer](#defaultcodectransformer)
- [text generation](#text-generation)
  - [generateText](#generatetext)
  - [streamText](#streamtext)
- [utility types](#utility-types)
  - [ExtractError (type alias)](#extracterror-type-alias)
  - [ExtractServices (type alias)](#extractservices-type-alias)
  - [ExtractTools (type alias)](#extracttools-type-alias)
  - [ToolkitInput (type alias)](#toolkitinput-type-alias)
  - [ToolkitOption (type alias)](#toolkitoption-type-alias)

---

# constructors

## make

Creates a LanguageModel service from provider-specific text generation and
streaming implementations.

**When to use**

Use when you are implementing a provider adapter and need to expose the
standard language-model service while keeping provider-specific request hooks
behind it.

**Details**

The returned service implements `generateText`, `generateObject`, and
`streamText`. It prepares `ProviderOptions` for each request, including the
normalized prompt, tools, tool choice, response format, tracing span, and
incremental response fields, before calling the supplied provider hook.
Structured object generation uses the `generateText` hook and the configured
`codecTransformer`, or `defaultCodecTransformer` when none is supplied.

**Gotchas**

Provider hooks must return encoded response parts that match the toolkit and
response format prepared in `ProviderOptions`; invalid parts fail decoding as
`AiError.InvalidOutputError`.

**See**

- `Service` for the returned service contract
- `ProviderOptions` for the normalized options passed to provider hooks
- `defaultCodecTransformer` for the default structured-output schema transformer

**Signature**

```ts
declare const make: (params: {
  readonly generateText: (
    options: ProviderOptions
  ) => Effect.Effect<Array<Response.PartEncoded>, AiError.AiError, IdGenerator>
  readonly streamText: (
    options: ProviderOptions
  ) => Stream.Stream<Response.StreamPartEncoded, AiError.AiError, IdGenerator>
  readonly codecTransformer?: CodecTransformer | undefined
}) => Effect.Effect<Service>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/LanguageModel.ts#L748)

Since v4.0.0

# models

## CodecTransformer (type alias)

A function that transforms a `Schema.Codec` into a provider-compatible form for structured output generation.

**Details**

Different language model providers have varying constraints on the JSON
schemas they accept. A `CodecTransformer` rewrites a codec's encoded side to
satisfy those constraints while preserving the decoded type.

**Signature**

```ts
type CodecTransformer = <T, E, RD, RE>(
  schema: Schema.ConstraintCodec<T, E, RD, RE>
) => {
  readonly codec: Schema.ConstraintCodec<T, unknown, RD, RE>
  readonly jsonSchema: JsonSchema.JsonSchema
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/LanguageModel.ts#L194)

Since v4.0.0

## GenerateObjectResponse (class)

Response class for structured object generation operations.

**Example** (Inspecting an object response)

```ts
import { Effect, Schema } from "effect"
import { LanguageModel } from "effect/unstable/ai"

const UserSchema = Schema.Struct({
  name: Schema.String,
  email: Schema.String
})

const program = Effect.gen(function* () {
  const response = yield* LanguageModel.generateObject({
    prompt: "Create user: John Doe, john@example.com",
    schema: UserSchema
  })

  console.log(response.value) // { name: "John Doe", email: "john@example.com" }
  console.log(response.text) // Raw generated text

  return response.value
})
```

**Signature**

```ts
declare class GenerateObjectResponse<Tools, A> {
  constructor(value: A, content: Array<Response.Part<Tools>>)
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/LanguageModel.ts#L473)

Since v4.0.0

### value (property)

The parsed structured object that conforms to the provided schema.

**Signature**

```ts
readonly value: A
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/LanguageModel.ts#L480)

## GenerateTextResponse (class)

Response class for text generation operations, with accessors for extracting text, tool calls, usage information, and other response parts from generated content.

**Example** (Inspecting a text response)

```ts
import { Effect } from "effect"
import { LanguageModel } from "effect/unstable/ai"

const program = Effect.gen(function* () {
  const response = yield* LanguageModel.generateText({
    prompt: "Explain photosynthesis"
  })

  console.log(response.text) // Generated text content
  console.log(response.finishReason) // "stop", "length", etc.
  console.log(response.usage) // Usage information

  return response
})
```

**Signature**

```ts
declare class GenerateTextResponse<Tools> {
  constructor(content: Array<Response.Part<Tools>>)
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/LanguageModel.ts#L357)

Since v4.0.0

### content (property)

**Signature**

```ts
readonly content: Array<Response.Part<Tools>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/LanguageModel.ts#L358)

## Service (interface)

The service interface for language model operations, defining the contract that all language model implementations must fulfill.

**Signature**

```ts
export interface Service {
  /**
   * Generate text using the language model.
   */
  readonly generateText: {
    // No toolkit: force `{}` instead of falling back to `Record<string, Tool.Any>`.
    <Options extends NoExcessProperties<GenerateTextOptionsWithoutToolkit, Options>>(
      options: Options & GenerateTextOptionsWithoutToolkit
    ): Effect.Effect<GenerateTextResponse<{}>, ExtractError<Options>, ExtractServices<Options>>
    // Generic toolkit: preserve caller-supplied `Tools` in helpers like `<Tools>(toolkit: WithHandler<Tools>) => ...`.
    <
      Tools extends Record<string, Tool.Any>,
      Options extends NoExcessProperties<
        GenerateTextOptions<Tools> & { readonly toolkit: ToolkitInput<Tools> },
        Options
      >
    >(
      options: Options & GenerateTextOptions<Tools> & { readonly toolkit: ToolkitInput<Tools> }
    ): Effect.Effect<GenerateTextResponse<Tools>, ExtractError<Options>, ExtractServices<Options>>
    // Toolkit unions: recover distributive `ExtractTools<Options>` inference for `toolkitA | toolkitB` call sites.
    <
      Options extends {
        readonly toolkit: ToolkitOption<any>
      } & NoExcessProperties<GenerateTextOptions<any>, Options>
    >(
      options: Options & GenerateTextOptions<ExtractTools<Options>> & { readonly toolkit: Options["toolkit"] }
    ): Effect.Effect<GenerateTextResponse<ExtractTools<Options>>, ExtractError<Options>, ExtractServices<Options>>
  }

  /**
   * Generate a structured object from a schema using the language model.
   */
  readonly generateObject: <
    ObjectEncoded extends Record<string, any>,
    StructuredOutputSchema extends Schema.Codec<unknown, ObjectEncoded, unknown, unknown>,
    Options extends NoExcessProperties<GenerateObjectOptions<any, StructuredOutputSchema>, Options>,
    Tools extends Record<string, Tool.Any> = {}
  >(
    options: Options & GenerateObjectOptions<Tools, StructuredOutputSchema>
  ) => Effect.Effect<
    GenerateObjectResponse<Tools, StructuredOutputSchema["Type"]>,
    ExtractError<Options>,
    ExtractServices<Options> | StructuredOutputSchema["DecodingServices"]
  >

  /**
   * Generate text using the language model with streaming output.
   */
  readonly streamText: {
    // No toolkit: force `{}` instead of falling back to `Record<string, Tool.Any>`.
    <Options extends NoExcessProperties<GenerateTextOptionsWithoutToolkit, Options>>(
      options: Options & GenerateTextOptionsWithoutToolkit
    ): Stream.Stream<Response.StreamPart<{}>, ExtractError<Options>, ExtractServices<Options>>
    // Generic toolkit: preserve caller-supplied `Tools` in helpers like `<Tools>(toolkit: WithHandler<Tools>) => ...`.
    <
      Tools extends Record<string, Tool.Any>,
      Options extends NoExcessProperties<
        GenerateTextOptions<Tools> & { readonly toolkit: ToolkitInput<Tools> },
        Options
      >
    >(
      options: Options & GenerateTextOptions<Tools> & { readonly toolkit: ToolkitInput<Tools> }
    ): Stream.Stream<Response.StreamPart<Tools>, ExtractError<Options>, ExtractServices<Options>>
    // Toolkit unions: recover distributive `ExtractTools<Options>` inference for `toolkitA | toolkitB` call sites.
    <
      Options extends {
        readonly toolkit: ToolkitOption<any>
      } & NoExcessProperties<GenerateTextOptions<any>, Options>
    >(
      options: Options & GenerateTextOptions<ExtractTools<Options>> & { readonly toolkit: Options["toolkit"] }
    ): Stream.Stream<Response.StreamPart<ExtractTools<Options>>, ExtractError<Options>, ExtractServices<Options>>
  }
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/LanguageModel.ts#L81)

Since v4.0.0

## ToolChoice (type alias)

The tool choice mode for the language model.

- `auto` (default): The model can decide whether or not to call tools, as
  well as which tools to call.
- `required`: The model **must** call a tool but can decide which tool will
  be called.
- `none`: The model **must not** call a tool.
- `{ tool: <tool_name> }`: The model must call the specified tool.
- `{ mode?: "auto" (default) | "required", "oneOf": [<tool-names>] }`: The
  model is restricted to the subset of tools specified by `oneOf`. When
  `mode` is `"auto"` or omitted, the model can decide whether or not a tool
  from the allowed subset of tools can be called. When `mode` is
  `"required"`, the model **must** call one tool from the allowed subset of
  tools.

**Signature**

```ts
type ToolChoice<ToolName> =
  | "auto"
  | "none"
  | "required"
  | {
      readonly tool: ToolName
    }
  | {
      readonly mode?: "auto" | "required"
      readonly oneOf: ReadonlyArray<ToolName>
    }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/LanguageModel.ts#L320)

Since v4.0.0

# object generation

## generateObject

Generates a structured object from a schema using a language model.

**Example** (Generating an object)

```ts
import { Effect, Schema } from "effect"
import { LanguageModel } from "effect/unstable/ai"

const EventSchema = Schema.Struct({
  title: Schema.String,
  date: Schema.String,
  location: Schema.String
})

const program = Effect.gen(function* () {
  const response = yield* LanguageModel.generateObject({
    prompt: "Extract event info: Tech Conference on March 15th in San Francisco",
    schema: EventSchema,
    objectName: "event"
  })

  console.log(response.value)
  // { title: "Tech Conference", date: "March 15th", location: "San Francisco" }

  return response.value
})
```

**Signature**

```ts
declare const generateObject: <
  ObjectEncoded extends Record<string, any>,
  StructuredOutputSchema extends Schema.Codec<unknown, ObjectEncoded, unknown, unknown>,
  Options extends NoExcessProperties<GenerateObjectOptions<any, StructuredOutputSchema>, Options>
>(
  options: Options & GenerateObjectOptions<ExtractTools<Options>, StructuredOutputSchema>
) => Effect.Effect<
  GenerateObjectResponse<ExtractTools<Options>, StructuredOutputSchema["Type"]>,
  ExtractError<Options>,
  ExtractServices<Options> | StructuredOutputSchema["DecodingServices"] | LanguageModel
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/LanguageModel.ts#L1692)

Since v4.0.0

# options

## GenerateObjectOptions (interface)

Configuration options for structured object generation.

**Signature**

```ts
export interface GenerateObjectOptions<
  Tools extends Record<string, Tool.Any>,
  StructuredOutputSchema extends Schema.Top
> extends GenerateTextOptions<Tools> {
  /**
   * The name of the structured output that should be generated. Used by some
   * large language model providers to provide additional guidance to the model.
   */
  readonly objectName?: string | undefined

  /**
   * The schema to be used to specify the structure of the object to generate.
   */
  readonly schema: StructuredOutputSchema
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/LanguageModel.ts#L286)

Since v4.0.0

## GenerateTextOptions (interface)

Configuration options for text generation.

**Signature**

```ts
export interface GenerateTextOptions<Tools extends Record<string, Tool.Any>> {
  /**
   * The prompt input to use to generate text.
   */
  readonly prompt: Prompt.RawInput

  /**
   * A toolkit containing both the tools and the tool call handler to use to
   * augment text generation.
   */
  readonly toolkit?: ToolkitInput<Tools> | undefined

  /**
   * The tool choice mode for the language model.
   * - `auto` (default): The model can decide whether or not to call tools, as
   *   well as which tools to call.
   * - `required`: The model **must** call a tool but can decide which tool will
   *   be called.
   * - `none`: The model **must not** call a tool.
   * - `{ tool: <tool_name> }`: The model must call the specified tool.
   * - `{ mode?: "auto" (default) | "required", "oneOf": [<tool-names>] }`: The
   *   model is restricted to the subset of tools specified by `oneOf`. When
   *   `mode` is `"auto"` or omitted, the model can decide whether or not a tool
   *   from the allowed subset of tools can be called. When `mode` is
   *   `"required"`, the model **must** call one tool from the allowed subset of
   *   tools.
   */
  readonly toolChoice?: ToolChoice<{ [Name in keyof Tools]: Tools[Name]["name"] }[keyof Tools]> | undefined

  /**
   * The concurrency level for resolving tool calls.
   */
  readonly concurrency?: Concurrency | undefined

  /**
   * When set to `true`, tool calls requested by the large language model are not auto-resolved by the framework.
   *
   * **When to use**
   *
   * Use when you want to include tool call definitions from an `AiToolkit`
   * in requests to the large language model, while controlling tool call
   * resolver execution yourself.
   */
  readonly disableToolCallResolution?: boolean | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/LanguageModel.ts#L228)

Since v4.0.0

## ProviderOptions (interface)

Configuration options passed along to language model provider implementations.

**Details**

This interface defines the normalized options that are passed to the
underlying provider implementation, regardless of the specific provider being
used.

**Signature**

```ts
export interface ProviderOptions {
  /**
   * The prompt messages to use to generate text.
   */
  readonly prompt: Prompt.Prompt

  /**
   * The tools that the large language model will have available to provide
   * additional information which can be incorporated into its text generation.
   */
  readonly tools: ReadonlyArray<Tool.Any>

  /**
   * The format the response should be provided in.
   *
   * **Details**
   *
   * If `"text"` is specified, the large language model response is returned as
   * text. If `"json"` is specified, the large language model response is
   * provided as a JSON object that conforms to the shape of the specified schema.
   * The default is `{ type: "text" }`.
   */
  readonly responseFormat:
    | {
        readonly type: "text"
      }
    | {
        readonly type: "json"
        readonly objectName: string
        readonly schema: Schema.Top
      }

  /**
   * The tool choice mode for the language model.
   * - `auto` (default): The model can decide whether or not to call tools, as
   *   well as which tools to call.
   * - `required`: The model **must** call a tool but can decide which tool will
   *   be called.
   * - `none`: The model **must not** call a tool.
   * - `{ tool: <tool_name> }`: The model must call the specified tool.
   * - `{ mode?: "auto" (default) | "required", "oneOf": [<tool-names>] }`: The
   *   model is restricted to the subset of tools specified by `oneOf`. When
   *   `mode` is `"auto"` or omitted, the model can decide whether or not a tool
   *   from the allowed subset of tools can be called. When `mode` is
   *   `"required"`, the model **must** call one tool from the allowed subset of
   *   tools.
   */
  readonly toolChoice: ToolChoice<any>

  /**
   * The span to use to trace interactions with the large language model.
   */
  readonly span: Span

  /**
   * The previous response identifier for incremental provider calls.
   */
  readonly previousResponseId: string | undefined

  /**
   * The prompt reduced to messages not yet seen by the provider.
   */
  readonly incrementalPrompt: Prompt.Prompt | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/LanguageModel.ts#L651)

Since v4.0.0

# services

## LanguageModel (class)

Service tag for AI model services.

**When to use**

Use to access or provide text generation, streaming generation, structured
output, and tool-calling capabilities through the Effect context.

**Example** (Accessing the language model service)

```ts
import { Effect } from "effect"
import { LanguageModel } from "effect/unstable/ai"

const program = Effect.gen(function* () {
  const model = yield* LanguageModel.LanguageModel
  const response = yield* model.generateText({
    prompt: "What is machine learning?"
  })
  return response.text
})
```

**Signature**

```ts
declare class LanguageModel
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/LanguageModel.ts#L71)

Since v4.0.0

## defaultCodecTransformer

The default codec transformer that passes schemas through without
provider-specific rewrites.

**When to use**

Use as the codec transformer for provider implementations when the provider
accepts the JSON Schema generated from an `Effect` Schema codec without
provider-specific rewrites.

**Details**

The transformer returns the original codec, resolves a top-level `$ref`, and
copies schema definitions into `$defs`.

**See**

- `CodecTransformer` for the structured-output transformer contract
- `make` for where this transformer is used as the default

**Signature**

```ts
declare const defaultCodecTransformer: CodecTransformer
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/LanguageModel.ts#L220)

Since v4.0.0

# text generation

## generateText

Generates text using a language model.

**Example** (Generating text with options)

```ts
import { Effect } from "effect"
import { LanguageModel } from "effect/unstable/ai"

const program = Effect.gen(function* () {
  const response = yield* LanguageModel.generateText({
    prompt: "Write a haiku about programming",
    toolChoice: "none"
  })

  console.log(response.text)
  console.log(response.usage.inputTokens.total)

  return response
})
```

**Signature**

```ts
declare const generateText: {
  <Options extends NoExcessProperties<GenerateTextOptionsWithoutToolkit, Options>>(
    options: Options & GenerateTextOptionsWithoutToolkit
  ): Effect.Effect<GenerateTextResponse<{}>, ExtractError<Options>, LanguageModel | ExtractServices<Options>>
  <
    Tools extends Record<string, Tool.Any>,
    Options extends NoExcessProperties<GenerateTextOptions<Tools> & { readonly toolkit: ToolkitInput<Tools> }, Options>
  >(
    options: Options & GenerateTextOptions<Tools> & { readonly toolkit: ToolkitInput<Tools> }
  ): Effect.Effect<GenerateTextResponse<Tools>, ExtractError<Options>, LanguageModel | ExtractServices<Options>>
  <Options extends { readonly toolkit: ToolkitOption<any> } & NoExcessProperties<GenerateTextOptions<any>, Options>>(
    options: Options & GenerateTextOptions<ExtractTools<Options>> & { readonly toolkit: Options["toolkit"] }
  ): Effect.Effect<
    GenerateTextResponse<ExtractTools<Options>>,
    ExtractError<Options>,
    ExtractServices<Options> | LanguageModel
  >
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/LanguageModel.ts#L1615)

Since v4.0.0

## streamText

Generates text using a language model with streaming output.

**Details**

Returns a stream of response parts that are emitted as soon as they are
available from the model, enabling real-time text generation experiences.

**Example** (Streaming text deltas)

```ts
import { Console, Effect, Stream } from "effect"
import { LanguageModel } from "effect/unstable/ai"

const program = LanguageModel.streamText({
  prompt: "Write a story about a space explorer"
}).pipe(
  Stream.runForEach((part) => {
    if (part.type === "text-delta") {
      return Console.log(part.delta)
    }
    return Effect.void
  })
)
```

**Signature**

```ts
declare const streamText: {
  <Options extends NoExcessProperties<GenerateTextOptionsWithoutToolkit, Options>>(
    options: Options & GenerateTextOptionsWithoutToolkit
  ): Stream.Stream<Response.StreamPart<{}>, ExtractError<Options>, ExtractServices<Options> | LanguageModel>
  <
    Tools extends Record<string, Tool.Any>,
    Options extends NoExcessProperties<GenerateTextOptions<Tools> & { readonly toolkit: ToolkitInput<Tools> }, Options>
  >(
    options: Options & GenerateTextOptions<Tools> & { readonly toolkit: ToolkitInput<Tools> }
  ): Stream.Stream<Response.StreamPart<Tools>, ExtractError<Options>, ExtractServices<Options> | LanguageModel>
  <Options extends { readonly toolkit: ToolkitOption<any> } & NoExcessProperties<GenerateTextOptions<any>, Options>>(
    options: Options & GenerateTextOptions<ExtractTools<Options>> & { readonly toolkit: Options["toolkit"] }
  ): Stream.Stream<
    Response.StreamPart<ExtractTools<Options>>,
    ExtractError<Options>,
    ExtractServices<Options> | LanguageModel
  >
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/LanguageModel.ts#L1738)

Since v4.0.0

# utility types

## ExtractError (type alias)

Utility type that extracts the error type from LanguageModel options.

**Details**

Automatically infers the possible error types based on toolkit configuration
and tool call resolution settings.

**Signature**

```ts
type ExtractError<Options> = Options extends {
  readonly disableToolCallResolution: true
  readonly toolkit: infer ToolkitValue
}
  ? ExtractErrorFromToolkitOption<Exclude<ToolkitValue, undefined>, true>
  : Options extends {
        readonly toolkit: infer ToolkitValue
      }
    ? ExtractErrorFromToolkitOption<Exclude<ToolkitValue, undefined>, false>
    : Options extends {
          readonly disableToolCallResolution: true
        }
      ? AiError.AiError
      : AiError.AiError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/LanguageModel.ts#L605)

Since v4.0.0

## ExtractServices (type alias)

Utility type that extracts the context requirements from LanguageModel options.

**Details**

Automatically infers the required services based on the toolkit configuration.

**Signature**

```ts
type ExtractServices<Options> = Options extends {
  readonly disableToolCallResolution: true
}
  ? never
  : Options extends {
        readonly toolkit: infer Toolkit
      }
    ? ExtractServicesFromToolkitOption<Exclude<Toolkit, undefined>>
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/LanguageModel.ts#L627)

Since v4.0.0

## ExtractTools (type alias)

Utility type that extracts the toolset from LanguageModel options.

**Signature**

```ts
type ExtractTools<Options> = Options extends {
  readonly toolkit: infer ToolkitValue
}
  ? ExtractToolsFromToolkitOption<Exclude<ToolkitValue, undefined>>
  : {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/LanguageModel.ts#L551)

Since v4.0.0

## ToolkitInput (type alias)

The supported toolkit input shapes for language model operation options.

**Details**

Unlike `ToolkitOption`, this type does not distribute over unions. It is
intended for call-site assignability, while `ToolkitOption` remains the
distributive helper used for extraction and inference.

**Signature**

```ts
type ToolkitInput<Tools, E, R> =
  | ToolkitOption<Tools, E, R>
  | Toolkit.WithHandler<Tools>
  | Effect.Effect<Toolkit.WithHandler<Tools>, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/LanguageModel.ts#L524)

Since v4.0.0

## ToolkitOption (type alias)

The supported toolkit option shapes for language model operations.

**Signature**

```ts
type ToolkitOption<Tools, E, R> = Tools extends any
  ? Toolkit.WithHandler<Tools> | Effect.Effect<Toolkit.WithHandler<Tools>, E, R>
  : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/LanguageModel.ts#L498)

Since v4.0.0
