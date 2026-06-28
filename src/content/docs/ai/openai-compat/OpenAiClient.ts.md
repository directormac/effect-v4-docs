---
title: OpenAiClient.ts
nav_order: 2
parent: "@effect/ai-openai-compat"
---

## OpenAiClient.ts overview

The `OpenAiClient` module provides an Effect service for OpenAI-compatible
chat completions and embeddings APIs. It builds on the Effect HTTP client,
adds authentication and OpenAI organization or project headers, and exposes
typed helpers for non-streaming chat completions, streaming chat completions,
and embedding requests.

Since v4.0.0

---

## Exports Grouped by Category

- [configuration](#configuration)
  - [ChatCompletionResponseFormat (type alias)](#chatcompletionresponseformat-type-alias)
  - [ChatCompletionToolChoice (type alias)](#chatcompletiontoolchoice-type-alias)
  - [TextResponseFormatConfiguration (type alias)](#textresponseformatconfiguration-type-alias)
- [constructors](#constructors)
  - [make](#make)
- [layers](#layers)
  - [layer](#layer)
  - [layerConfig](#layerconfig)
- [models](#models)
  - [MessageStatus (type alias)](#messagestatus-type-alias)
  - [Service (interface)](#service-interface)
- [options](#options)
  - [Options (type alias)](#options-type-alias)
- [request](#request)
  - [ChatCompletionContentPart (type alias)](#chatcompletioncontentpart-type-alias)
  - [ChatCompletionRequest (type alias)](#chatcompletionrequest-type-alias)
  - [ChatCompletionRequestMessage (type alias)](#chatcompletionrequestmessage-type-alias)
  - [ChatCompletionRequestToolCall (type alias)](#chatcompletionrequesttoolcall-type-alias)
  - [ChatCompletionTool (type alias)](#chatcompletiontool-type-alias)
  - [CreateEmbeddingRequest (type alias)](#createembeddingrequest-type-alias)
  - [CreateEmbeddingRequestJson (type alias)](#createembeddingrequestjson-type-alias)
  - [CreateResponse (type alias)](#createresponse-type-alias)
  - [CreateResponseRequestJson (type alias)](#createresponserequestjson-type-alias)
  - [InputContent (type alias)](#inputcontent-type-alias)
  - [InputItem (type alias)](#inputitem-type-alias)
  - [Tool (type alias)](#tool-type-alias)
- [response](#response)
  - [Annotation (type alias)](#annotation-type-alias)
  - [ChatCompletionChoice (type alias)](#chatcompletionchoice-type-alias)
  - [ChatCompletionMessage (type alias)](#chatcompletionmessage-type-alias)
  - [ChatCompletionResponse (type alias)](#chatcompletionresponse-type-alias)
  - [ChatCompletionToolCall (type alias)](#chatcompletiontoolcall-type-alias)
  - [ChatCompletionUsage (type alias)](#chatcompletionusage-type-alias)
  - [CreateEmbedding200 (type alias)](#createembedding200-type-alias)
  - [CreateEmbeddingResponse (type alias)](#createembeddingresponse-type-alias)
  - [CreateResponse200 (type alias)](#createresponse200-type-alias)
  - [Embedding (type alias)](#embedding-type-alias)
  - [IncludeEnum (type alias)](#includeenum-type-alias)
  - [ReasoningItem (type alias)](#reasoningitem-type-alias)
  - [Response (type alias)](#response-type-alias)
  - [ResponseUsage (type alias)](#responseusage-type-alias)
  - [SummaryTextContent (type alias)](#summarytextcontent-type-alias)
- [services](#services)
  - [OpenAiClient (class)](#openaiclient-class)
- [streaming](#streaming)
  - [ChatCompletionChunk (type alias)](#chatcompletionchunk-type-alias)
  - [ChatCompletionStreamEvent (type alias)](#chatcompletionstreamevent-type-alias)
  - [CreateResponse200Sse (type alias)](#createresponse200sse-type-alias)
  - [ResponseStreamEvent (type alias)](#responsestreamevent-type-alias)

---

# configuration

## ChatCompletionResponseFormat (type alias)

JSON response format configuration for chat completion requests.

**Signature**

```ts
type ChatCompletionResponseFormat =
  | {
      readonly type: "json_object"
    }
  | {
      readonly type: "json_schema"
      readonly json_schema: {
        readonly name: string
        readonly schema: JsonObject
        readonly description?: string | undefined
        readonly strict?: boolean | undefined
      }
    }
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiClient.ts#L997)

Since v4.0.0

## ChatCompletionToolChoice (type alias)

Controls whether the model may call tools and can force a specific function.

**Signature**

```ts
type ChatCompletionToolChoice =
  | "none"
  | "auto"
  | "required"
  | {
      readonly type: "function"
      readonly function: {
        readonly name: string
      }
    }
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiClient.ts#L981)

Since v4.0.0

## TextResponseFormatConfiguration (type alias)

Text output format configuration for plain text, JSON object, or JSON Schema
responses.

**Signature**

```ts
type TextResponseFormatConfiguration =
  | {
      readonly type: "text"
    }
  | {
      readonly type: "json_schema"
      readonly description?: string | undefined
      readonly name: string
      readonly schema: JsonObject
      readonly strict?: boolean | null | undefined
    }
  | {
      readonly type: "json_object"
    }
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiClient.ts#L621)

Since v4.0.0

# constructors

## make

Constructs an OpenAI-compatible client service from explicit options.

**When to use**

Use when you need the OpenAI-compatible client service value inside an effect.

**Details**

The returned service uses the current `HttpClient`, prepends `apiUrl` or
`https://api.openai.com/v1`, adds authentication and OpenAI
organization/project headers, accepts JSON responses, and applies
`transformClient` when provided.

**Gotchas**

A scoped `OpenAiConfig.withClientTransform` is applied when request helpers
run, after the `transformClient` option supplied to `make`.

**See**

- `layer` for providing this client from explicit options
- `layerConfig` for loading client settings from `Config`

**Signature**

```ts
declare const make: (options: Options) => Effect.Effect<Service, never, HttpClient.HttpClient>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiClient.ts#L131)

Since v4.0.0

# layers

## layer

Creates a layer that provides an OpenAI-compatible client from explicit options.

**When to use**

Use to install `OpenAiClient` in an application layer when the client options
are already available as values rather than loaded from `Config`.

**See**

- `make` for constructing the client service effectfully
- `layerConfig` for loading client settings from `Config`

**Signature**

```ts
declare const layer: (options: Options) => Layer.Layer<OpenAiClient, never, HttpClient.HttpClient>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiClient.ts#L282)

Since v4.0.0

## layerConfig

Creates a layer that loads OpenAI-compatible client settings from `Config`
values before constructing the service.

**When to use**

Use when you need client settings for OpenAI-compatible APIs to be read from
Effect `Config` values while providing `OpenAiClient` as a layer.

**Details**

Only config values supplied in `options` are loaded. Omitted fields are
passed to `make` as `undefined`, and `transformClient` is forwarded as a
plain option.

**See**

- `make` for constructing the client service effectfully
- `layer` for providing the client from already-resolved options

**Signature**

```ts
declare const layerConfig: (options?: {
  readonly apiKey?: Config.Config<Redacted.Redacted<string> | undefined> | undefined
  readonly apiUrl?: Config.Config<string> | undefined
  readonly organizationId?: Config.Config<Redacted.Redacted<string> | undefined> | undefined
  readonly projectId?: Config.Config<Redacted.Redacted<string> | undefined> | undefined
  readonly transformClient?: ((client: HttpClient.HttpClient) => HttpClient.HttpClient) | undefined
}) => Layer.Layer<OpenAiClient, Config.ConfigError, HttpClient.HttpClient>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiClient.ts#L306)

Since v4.0.0

# models

## MessageStatus (type alias)

Lifecycle status shared by message, reasoning, and tool-call items.

**Signature**

```ts
type MessageStatus = "in_progress" | "completed" | "incomplete"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiClient.ts#L357)

Since v4.0.0

## Service (interface)

Effect service interface for OpenAI-compatible chat completions and embeddings.

**Details**

Exposes the configured HTTP client plus helpers for non-streaming chat
completions, streaming chat completions, and embeddings. Transport and
schema decoding failures are mapped to `AiError`.

**Signature**

```ts
export interface Service {
  readonly client: HttpClient.HttpClient
  readonly createResponse: (
    options: CreateResponseRequestJson
  ) => Effect.Effect<[body: CreateResponse200, response: HttpClientResponse.HttpClientResponse], AiError.AiError>
  readonly createResponseStream: (
    options: Omit<CreateResponseRequestJson, "stream" | "stream_options">
  ) => Effect.Effect<
    [response: HttpClientResponse.HttpClientResponse, stream: Stream.Stream<CreateResponse200Sse, AiError.AiError>],
    AiError.AiError
  >
  readonly createEmbedding: (options: CreateEmbeddingRequestJson) => Effect.Effect<CreateEmbedding200, AiError.AiError>
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiClient.ts#L40)

Since v4.0.0

# options

## Options (type alias)

Configuration options used to construct an OpenAI-compatible client.

**Signature**

```ts
type Options = {
  readonly apiKey?: Redacted.Redacted<string> | undefined
  readonly apiUrl?: string | undefined
  readonly organizationId?: Redacted.Redacted<string> | undefined
  readonly projectId?: Redacted.Redacted<string> | undefined
  readonly transformClient?: ((client: HttpClient.HttpClient) => HttpClient.HttpClient) | undefined
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiClient.ts#L93)

Since v4.0.0

# request

## ChatCompletionContentPart (type alias)

Structured content parts accepted in chat completion messages.

**Signature**

```ts
type ChatCompletionContentPart =
  | {
      readonly type: "text"
      readonly text: string
    }
  | {
      readonly type: "image_url"
      readonly image_url: {
        readonly url: string
        readonly detail?: "low" | "high" | "auto" | undefined
      }
    }
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiClient.ts#L917)

Since v4.0.0

## ChatCompletionRequest (type alias)

Request payload for the OpenAI-compatible chat completions endpoint.

**Signature**

```ts
type ChatCompletionRequest = {
  readonly model: string
  readonly messages: ReadonlyArray<ChatCompletionRequestMessage>
  readonly temperature?: number | null | undefined
  readonly top_p?: number | null | undefined
  readonly max_tokens?: number | null | undefined
  readonly user?: string | null | undefined
  readonly seed?: number | undefined
  readonly parallel_tool_calls?: boolean | null | undefined
  readonly response_format?: ChatCompletionResponseFormat | undefined
  readonly tools?: ReadonlyArray<ChatCompletionTool> | undefined
  readonly tool_choice?: ChatCompletionToolChoice | undefined
  readonly service_tier?: string | undefined
  readonly reasoning?: unknown
  readonly stream?: boolean | undefined
  readonly stream_options?:
    | {
        readonly include_usage?: boolean | undefined
      }
    | undefined
  readonly [x: string]: unknown
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiClient.ts#L1016)

Since v4.0.0

## ChatCompletionRequestMessage (type alias)

Message shapes accepted by the chat completions endpoint.

**Signature**

```ts
type ChatCompletionRequestMessage =
  | {
      readonly role: "system" | "developer" | "user" | "assistant"
      readonly content: string | ReadonlyArray<ChatCompletionContentPart> | null
      readonly tool_calls?: ReadonlyArray<ChatCompletionRequestToolCall> | undefined
    }
  | {
      readonly role: "tool"
      readonly tool_call_id: string
      readonly content: string
    }
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiClient.ts#L949)

Since v4.0.0

## ChatCompletionRequestToolCall (type alias)

Tool call data attached to an assistant chat completion message.

**Signature**

```ts
type ChatCompletionRequestToolCall = {
  readonly id: string
  readonly type: "function"
  readonly function: {
    readonly name: string
    readonly arguments: string
  }
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiClient.ts#L935)

Since v4.0.0

## ChatCompletionTool (type alias)

Function tool definition accepted by the chat completions endpoint.

**Signature**

```ts
type ChatCompletionTool = {
  readonly type: "function"
  readonly function: {
    readonly name: string
    readonly description?: string | null | undefined
    readonly parameters?: JsonObject | undefined
    readonly strict?: boolean | undefined
  }
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiClient.ts#L966)

Since v4.0.0

## CreateEmbeddingRequest (type alias)

Request payload for the embeddings endpoint.

**Signature**

```ts
type CreateEmbeddingRequest = {
  readonly input: string | ReadonlyArray<string> | ReadonlyArray<number> | ReadonlyArray<ReadonlyArray<number>>
  readonly model: string
  readonly encoding_format?: "float" | "base64" | undefined
  readonly dimensions?: number | undefined
  readonly user?: string | undefined
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiClient.ts#L873)

Since v4.0.0

## CreateEmbeddingRequestJson (type alias)

JSON request body accepted by the embeddings endpoint.

**Signature**

```ts
type CreateEmbeddingRequestJson = CreateEmbeddingRequest
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiClient.ts#L903)

Since v4.0.0

## CreateResponse (type alias)

Request options for creating a Responses-style response with an
OpenAI-compatible provider.

**Signature**

```ts
type CreateResponse = {
  readonly metadata?: Readonly<Record<string, string>> | null | undefined
  readonly top_logprobs?: number | undefined
  readonly temperature?: number | null | undefined
  readonly top_p?: number | null | undefined
  readonly user?: string | null | undefined
  readonly safety_identifier?: string | null | undefined
  readonly prompt_cache_key?: string | null | undefined
  readonly service_tier?: string | undefined
  readonly prompt_cache_retention?: "in-memory" | "24h" | null | undefined
  readonly previous_response_id?: string | null | undefined
  readonly model?: string | undefined
  readonly reasoning?: unknown
  readonly background?: boolean | null | undefined
  readonly max_output_tokens?: number | null | undefined
  readonly max_tool_calls?: number | null | undefined
  readonly text?:
    | {
        readonly format?: TextResponseFormatConfiguration | undefined
        readonly verbosity?: "low" | "medium" | "high" | null | undefined
      }
    | undefined
  readonly tools?: ReadonlyArray<Tool> | undefined
  readonly tool_choice?: ToolChoice | undefined
  readonly truncation?: "auto" | "disabled" | null | undefined
  readonly input?: string | ReadonlyArray<InputItem> | undefined
  readonly include?: ReadonlyArray<IncludeEnum> | null | undefined
  readonly parallel_tool_calls?: boolean | null | undefined
  readonly store?: boolean | null | undefined
  readonly instructions?: string | null | undefined
  readonly stream?: boolean | null | undefined
  readonly conversation?: string | null | undefined
  readonly modalities?: ReadonlyArray<"text" | "audio"> | undefined
  readonly seed?: number | undefined
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiClient.ts#L643)

Since v4.0.0

## CreateResponseRequestJson (type alias)

JSON request body used by this client when creating a chat completion response.

**Signature**

```ts
type CreateResponseRequestJson = ChatCompletionRequest
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiClient.ts#L1042)

Since v4.0.0

## InputContent (type alias)

Content blocks accepted in input messages.

**Signature**

```ts
type InputContent = InputTextContent | InputImageContent | InputFileContent
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiClient.ts#L385)

Since v4.0.0

## InputItem (type alias)

Item shapes accepted by a Responses-style `input` field.

**Details**

Supports input messages, output messages, tool calls, tool outputs, reasoning
items, custom tool interactions, and item references.

**Signature**

```ts
type InputItem =
  | {
      readonly role: "user" | "assistant" | "system" | "developer"
      readonly content: string | ReadonlyArray<InputContent>
      readonly type?: "message" | undefined
    }
  | {
      readonly type?: "message" | undefined
      readonly role: "user" | "system" | "developer"
      readonly status?: MessageStatus | undefined
      readonly content: ReadonlyArray<InputContent>
    }
  | OutputMessage
  | FunctionCall
  | FunctionCallOutput
  | ReasoningItem
  | CustomToolCallOutput
  | CustomToolCall
  | ItemReference
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiClient.ts#L551)

Since v4.0.0

## Tool (type alias)

Tool definitions that can be supplied to a Responses-style request.

**Signature**

```ts
type Tool = FunctionTool | CustomToolParam
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiClient.ts#L592)

Since v4.0.0

# response

## Annotation (type alias)

Citation and file-path annotations attached to output text content.

**Signature**

```ts
type Annotation = FileCitationAnnotation | UrlCitationAnnotation | ContainerFileCitationAnnotation | FilePathAnnotation
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiClient.ts#L455)

Since v4.0.0

## ChatCompletionChoice (type alias)

Decoded choice object returned by chat completion responses and chunks.

**Signature**

```ts
type ChatCompletionChoice = typeof ChatCompletionChoice.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiClient.ts#L1170)

Since v4.0.0

## ChatCompletionMessage (type alias)

Decoded message object from a non-streaming chat completion choice.

**Signature**

```ts
type ChatCompletionMessage = typeof ChatCompletionMessage.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiClient.ts#L1163)

Since v4.0.0

## ChatCompletionResponse (type alias)

Decoded successful response from the chat completions endpoint.

**Signature**

```ts
type ChatCompletionResponse = typeof ChatCompletionResponse.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiClient.ts#L1184)

Since v4.0.0

## ChatCompletionToolCall (type alias)

Decoded tool-call object from a chat completion response or streaming chunk.

**Signature**

```ts
type ChatCompletionToolCall = typeof ChatCompletionToolCall.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiClient.ts#L1156)

Since v4.0.0

## ChatCompletionUsage (type alias)

Decoded token usage summary returned by chat completions.

**Signature**

```ts
type ChatCompletionUsage = typeof ChatCompletionUsage.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiClient.ts#L1177)

Since v4.0.0

## CreateEmbedding200 (type alias)

Decoded successful embeddings response body.

**Signature**

```ts
type CreateEmbedding200 = CreateEmbeddingResponse
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiClient.ts#L910)

Since v4.0.0

## CreateEmbeddingResponse (type alias)

Successful response payload returned by the embeddings endpoint.

**Signature**

```ts
type CreateEmbeddingResponse = {
  readonly data: ReadonlyArray<Embedding>
  readonly model: string
  readonly object?: "list" | undefined
  readonly usage?:
    | {
        readonly prompt_tokens: number
        readonly total_tokens: number
      }
    | undefined
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiClient.ts#L887)

Since v4.0.0

## CreateResponse200 (type alias)

Decoded successful chat completion response body returned by `createResponse`.

**Signature**

```ts
type CreateResponse200 = ChatCompletionResponse
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiClient.ts#L1049)

Since v4.0.0

## Embedding (type alias)

Represents one embedding item returned by an OpenAI-compatible embeddings API.

**Details**

The embedding can be returned either as a numeric vector or as a base64-encoded
string. The `index` field identifies the input item that produced this
embedding.

**Signature**

```ts
type Embedding = {
  readonly embedding: ReadonlyArray<number> | string
  readonly index: number
  readonly object?: string | undefined
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiClient.ts#L861)

Since v4.0.0

## IncludeEnum (type alias)

Optional response fields that can be requested with the `include` parameter.

**Signature**

```ts
type IncludeEnum = "message.input_image.image_url" | "reasoning.encrypted_content" | "message.output_text.logprobs"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiClient.ts#L346)

Since v4.0.0

## ReasoningItem (type alias)

Reasoning output item containing encrypted reasoning content, summaries, and
optional reasoning text.

**Signature**

```ts
type ReasoningItem = {
  readonly type: "reasoning"
  readonly id: string
  readonly encrypted_content?: string | null | undefined
  readonly summary: ReadonlyArray<SummaryTextContent>
  readonly content?: ReadonlyArray<ReasoningTextContent> | undefined
  readonly status?: MessageStatus | undefined
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiClient.ts#L494)

Since v4.0.0

## Response (type alias)

Responses-style response object returned by compatible providers or embedded
in response stream lifecycle events.

**Signature**

```ts
type Response = {
  readonly id: string
  readonly object?: "response" | undefined
  readonly model: string
  readonly status?: "completed" | "failed" | "in_progress" | "cancelled" | "queued" | "incomplete" | undefined
  readonly created_at: number
  readonly output: ReadonlyArray<OutputItem>
  readonly usage?: ResponseUsage | null | undefined
  readonly incomplete_details?:
    | {
        readonly reason?: "max_output_tokens" | "content_filter" | undefined
      }
    | null
    | undefined
  readonly service_tier?: string | undefined
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiClient.ts#L704)

Since v4.0.0

## ResponseUsage (type alias)

Token accounting reported on Responses-style response objects.

**Signature**

```ts
type ResponseUsage = {
  readonly input_tokens: number
  readonly output_tokens: number
  readonly total_tokens: number
  readonly input_tokens_details?: unknown
  readonly output_tokens_details?: unknown
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiClient.ts#L683)

Since v4.0.0

## SummaryTextContent (type alias)

Text content block used for model-provided reasoning summaries.

**Signature**

```ts
type SummaryTextContent = {
  readonly type: "summary_text"
  readonly text: string
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiClient.ts#L393)

Since v4.0.0

# services

## OpenAiClient (class)

Service tag for the OpenAI-compatible chat completions and embeddings client.

**When to use**

Use when building effects that depend on the low-level OpenAI-compatible
client through context rather than receiving the client as a value.

**Details**

The tagged service is the `Service` interface produced by `make` and provided
by `layer` or `layerConfig`.

**See**

- `Service` for the operations provided by the service
- `make` for constructing the service from explicit options
- `layer` for providing the service from explicit options
- `layerConfig` for loading client settings from `Config`

**Signature**

```ts
declare class OpenAiClient
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiClient.ts#L83)

Since v4.0.0

# streaming

## ChatCompletionChunk (type alias)

Decoded streaming chunk emitted by the chat completions endpoint.

**Signature**

```ts
type ChatCompletionChunk = typeof ChatCompletionChunk.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiClient.ts#L1191)

Since v4.0.0

## ChatCompletionStreamEvent (type alias)

Streaming chat completion event, including decoded chunks and the `[DONE]`
sentinel.

**Signature**

```ts
type ChatCompletionStreamEvent = ChatCompletionChunk | "[DONE]"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiClient.ts#L1199)

Since v4.0.0

## CreateResponse200Sse (type alias)

Decoded server-sent event payload emitted by `createResponseStream`.

**Signature**

```ts
type CreateResponse200Sse = ChatCompletionStreamEvent
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiClient.ts#L1056)

Since v4.0.0

## ResponseStreamEvent (type alias)

Server-sent event shapes emitted by Responses-style response streams.

**Signature**

```ts
type ResponseStreamEvent =
  | ResponseCreatedEvent
  | ResponseCompletedEvent
  | ResponseIncompleteEvent
  | ResponseFailedEvent
  | ResponseOutputItemAddedEvent
  | ResponseOutputItemDoneEvent
  | ResponseTextDeltaEvent
  | ResponseOutputTextAnnotationAddedEvent
  | ResponseFunctionCallArgumentsDeltaEvent
  | ResponseReasoningSummaryPartAddedEvent
  | ResponseReasoningSummaryPartDoneEvent
  | ResponseReasoningSummaryTextDeltaEvent
  | ResponseErrorEvent
  | UnknownResponseStreamEvent
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai-compat/src/OpenAiClient.ts#L833)

Since v4.0.0
