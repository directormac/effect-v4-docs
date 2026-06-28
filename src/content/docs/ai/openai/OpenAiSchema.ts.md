---
title: OpenAiSchema.ts
nav_order: 8
parent: "@effect/ai-openai"
---

## OpenAiSchema.ts overview

The `OpenAiSchema` module defines the request, response, streaming, and
embedding schemas used by the handwritten OpenAI client. These schemas are
the transport boundary for JSON sent to and decoded from the Responses and
embeddings endpoints.

Since v4.0.0

---

## Exports Grouped by Category

- [models](#models)
  - [Annotation (type alias)](#annotation-type-alias)
  - [CreateEmbeddingRequest (type alias)](#createembeddingrequest-type-alias)
  - [CreateEmbeddingResponse (type alias)](#createembeddingresponse-type-alias)
  - [Embedding (type alias)](#embedding-type-alias)
  - [IncludeEnum (type alias)](#includeenum-type-alias)
  - [InputContent (type alias)](#inputcontent-type-alias)
  - [InputItem (type alias)](#inputitem-type-alias)
  - [MessageStatus (type alias)](#messagestatus-type-alias)
  - [ReasoningItem (type alias)](#reasoningitem-type-alias)
  - [Response (type alias)](#response-type-alias)
  - [ResponseStreamEvent (type alias)](#responsestreamevent-type-alias)
  - [ResponseUsage (type alias)](#responseusage-type-alias)
  - [SummaryTextContent (type alias)](#summarytextcontent-type-alias)
  - [TextResponseFormatConfiguration (type alias)](#textresponseformatconfiguration-type-alias)
  - [Tool (type alias)](#tool-type-alias)
  - [ToolChoice (type alias)](#toolchoice-type-alias)
  - [UnknownResponseStreamEvent (type alias)](#unknownresponsestreamevent-type-alias)
- [options](#options)
  - [CreateResponse (type alias)](#createresponse-type-alias)
- [schemas](#schemas)
  - [Annotation](#annotation)
  - [CreateEmbeddingRequest](#createembeddingrequest)
  - [CreateEmbeddingResponse](#createembeddingresponse)
  - [CreateResponse](#createresponse)
  - [Embedding](#embedding)
  - [IncludeEnum](#includeenum)
  - [InputContent](#inputcontent)
  - [InputItem](#inputitem)
  - [MessageStatus](#messagestatus)
  - [ReasoningItem](#reasoningitem)
  - [Response](#response)
  - [ResponseStreamEvent](#responsestreamevent)
  - [ResponseUsage](#responseusage)
  - [SummaryTextContent](#summarytextcontent)
  - [TextResponseFormatConfiguration](#textresponseformatconfiguration)
  - [Tool](#tool)
  - [ToolChoice](#toolchoice)

---

# models

## Annotation (type alias)

Citation or file-path annotation attached to output text content.

**Details**

Accepted annotation variants are `file_citation`, `url_citation`,
`container_file_citation`, and `file_path`.

**Signature**

```ts
type Annotation = typeof Annotation.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiSchema.ts#L232)

Since v4.0.0

## CreateEmbeddingRequest (type alias)

Request payload sent to the OpenAI embeddings endpoint.

**Signature**

```ts
type CreateEmbeddingRequest = typeof CreateEmbeddingRequest.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiSchema.ts#L1231)

Since v4.0.0

## CreateEmbeddingResponse (type alias)

Successful response payload returned by the OpenAI embeddings endpoint.

**When to use**

Use when typing successful OpenAI embeddings responses.

**Details**

Contains embedding items, the model name, optional list marker, and optional
token usage counts.

**Signature**

```ts
type CreateEmbeddingResponse = typeof CreateEmbeddingResponse.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiSchema.ts#L1286)

Since v4.0.0

## Embedding (type alias)

One embedding item returned by the OpenAI embeddings API.

**Details**

Contains the item index and embedding payload. The embedding payload may be a
numeric vector or a string.

**Signature**

```ts
type Embedding = typeof Embedding.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiSchema.ts#L1187)

Since v4.0.0

## IncludeEnum (type alias)

Type of optional `include` values accepted by OpenAI Responses requests.

**Signature**

```ts
type IncludeEnum = typeof IncludeEnum.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiSchema.ts#L49)

Since v4.0.0

## InputContent (type alias)

Content block accepted in OpenAI Responses input messages.

**Details**

Accepted block variants are `input_text`, `input_image`, and `input_file`.

**Signature**

```ts
type InputContent = typeof InputContent.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiSchema.ts#L124)

Since v4.0.0

## InputItem (type alias)

Item shape accepted by an OpenAI Responses request `input` field.

**When to use**

Use when typing structured `CreateResponse.input` array items.

**Details**

Accepted item families include request/output messages, function call and
function call output, reasoning items, item references, shell and local shell
calls and outputs, apply-patch output, and MCP approval responses.

**Signature**

```ts
type InputItem = typeof InputItem.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiSchema.ts#L448)

Since v4.0.0

## MessageStatus (type alias)

Lifecycle status shared by messages, reasoning items, and tool calls.

**Details**

Accepted values are `"in_progress"`, `"completed"`, and `"incomplete"`.

**Signature**

```ts
type MessageStatus = typeof MessageStatus.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiSchema.ts#L74)

Since v4.0.0

## ReasoningItem (type alias)

Reasoning output item containing encrypted content, summaries, and optional reasoning text.

**When to use**

Use when typing OpenAI Responses reasoning items that may be carried into
later request input.

**Details**

Reasoning items represent model reasoning content. `summary` is required,
while `content` and `status` are optional.

**Gotchas**

`encrypted_content` is populated only when `reasoning.encrypted_content` is
requested through `include`.

**Signature**

```ts
type ReasoningItem = typeof ReasoningItem.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiSchema.ts#L315)

Since v4.0.0

## Response (type alias)

OpenAI Responses API response object.

**When to use**

Use when typing non-streaming OpenAI Responses API responses.

**Details**

Response objects include metadata, output items, optional token usage, and
optional incomplete details.

**Signature**

```ts
type Response = typeof Response.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiSchema.ts#L886)

Since v4.0.0

## ResponseStreamEvent (type alias)

Server-sent event shape emitted by OpenAI Responses API streams.

**When to use**

Use when typing events from a streaming OpenAI Responses API request.

**Details**

Includes known response stream events plus a fallback shape for unknown future
event types.

**Signature**

```ts
type ResponseStreamEvent = typeof ResponseStreamEvent.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiSchema.ts#L1144)

Since v4.0.0

## ResponseUsage (type alias)

Token accounting reported on OpenAI Responses API response objects.

**Details**

Includes total input, output, and combined token counts, with provider-specific
token detail fields preserved when present.

**Signature**

```ts
type ResponseUsage = typeof ResponseUsage.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiSchema.ts#L739)

Since v4.0.0

## SummaryTextContent (type alias)

Text content block used for model-provided reasoning summaries.

**Signature**

```ts
type SummaryTextContent = typeof SummaryTextContent.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiSchema.ts#L150)

Since v4.0.0

## TextResponseFormatConfiguration (type alias)

Text output format configuration for plain text, JSON object, or JSON Schema responses.

**Signature**

```ts
type TextResponseFormatConfiguration = typeof TextResponseFormatConfiguration.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiSchema.ts#L628)

Since v4.0.0

## Tool (type alias)

Tool definition that can be supplied to an OpenAI Responses request.

**Signature**

```ts
type Tool = typeof Tool.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiSchema.ts#L521)

Since v4.0.0

## ToolChoice (type alias)

Tool selection mode or named tool choice for a Responses request.

**Details**

Accepted forms are `"none"`, `"auto"`, `"required"`, an allowed-tools set,
a named function or custom tool, or a provider-defined tool choice.

**Signature**

```ts
type ToolChoice = typeof ToolChoice.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiSchema.ts#L586)

Since v4.0.0

## UnknownResponseStreamEvent (type alias)

Fallback event shape for future or provider-specific response stream events.

**Signature**

```ts
type UnknownResponseStreamEvent = {
  readonly type: string
  readonly [key: string]: unknown
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiSchema.ts#L1066)

Since v4.0.0

# options

## CreateResponse (type alias)

Request options used to create an OpenAI Responses API response.

**Signature**

```ts
type CreateResponse = typeof CreateResponse.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiSchema.ts#L703)

Since v4.0.0

# schemas

## Annotation

Schema for citation and file-path annotations attached to output text content.

**Details**

Accepts annotation objects discriminated by `type`: `file_citation`,
`url_citation`, `container_file_citation`, or `file_path`.

**Signature**

```ts
declare const Annotation: Schema.Union<
  readonly [
    Schema.Struct<{
      readonly type: Schema.Literal<"file_citation">
      readonly file_id: Schema.String
      readonly index: Schema.Number
      readonly filename: Schema.String
    }>,
    Schema.Struct<{
      readonly type: Schema.Literal<"url_citation">
      readonly url: Schema.String
      readonly start_index: Schema.Number
      readonly end_index: Schema.Number
      readonly title: Schema.String
    }>,
    Schema.Struct<{
      readonly type: Schema.Literal<"container_file_citation">
      readonly container_id: Schema.String
      readonly file_id: Schema.String
      readonly start_index: Schema.Number
      readonly end_index: Schema.Number
      readonly filename: Schema.String
    }>,
    Schema.Struct<{
      readonly type: Schema.Literal<"file_path">
      readonly file_id: Schema.String
      readonly index: Schema.Number
    }>
  ]
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiSchema.ts#L214)

Since v4.0.0

## CreateEmbeddingRequest

Schema for the request payload sent to the OpenAI embeddings endpoint.

**When to use**

Use when validating or encoding embeddings requests before sending them to
OpenAI, while leaving model-specific limits to the provider.

**Details**

Requires `input` and `model`. `input` may be a string, an array of strings,
a token array, or an array of token arrays. Optional fields configure the
embedding encoding format, requested dimensions, and user identifier.

**Gotchas**

This schema validates the transport shape, but OpenAI still enforces
provider-side constraints such as non-empty input, integer token ids, input
size limits, positive dimensions, and model-specific dimension support.

**Signature**

```ts
declare const CreateEmbeddingRequest: Schema.Struct<{
  readonly input: Schema.Union<
    readonly [
      Schema.String,
      Schema.$Array<Schema.String>,
      Schema.$Array<Schema.Number>,
      Schema.$Array<Schema.$Array<Schema.Number>>
    ]
  >
  readonly model: Schema.String
  readonly encoding_format: Schema.optionalKey<Schema.Literals<readonly ["float", "base64"]>>
  readonly dimensions: Schema.optionalKey<Schema.Number>
  readonly user: Schema.optionalKey<Schema.String>
}>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiSchema.ts#L1212)

Since v4.0.0

## CreateEmbeddingResponse

Schema for a successful response payload returned by the OpenAI embeddings endpoint.

**When to use**

Use when you need to validate embeddings responses at an OpenAI client
boundary before trusting item shapes, especially when numeric and string
embeddings are both allowed.

**Details**

The response contains an array of `Embedding` items, the model name, an
optional `object: "list"` marker, and optional token usage counts for prompt
and total tokens.

**Gotchas**

Each `Embedding` may contain either a numeric vector or a string embedding.
Callers that require numeric vectors must account for string embeddings.

**See**

- `CreateEmbeddingRequest` for the request schema sent to the embeddings endpoint
- `Embedding` for individual embedding items in the response

**Signature**

```ts
declare const CreateEmbeddingResponse: Schema.Struct<{
  readonly data: Schema.$Array<
    Schema.Struct<{
      readonly embedding: Schema.Union<readonly [Schema.$Array<Schema.Number>, Schema.String]>
      readonly index: Schema.Number
      readonly object: Schema.optionalKey<Schema.String>
    }>
  >
  readonly model: Schema.String
  readonly object: Schema.optionalKey<Schema.Literal<"list">>
  readonly usage: Schema.optionalKey<
    Schema.Struct<{ readonly prompt_tokens: Schema.Number; readonly total_tokens: Schema.Number }>
  >
}>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiSchema.ts#L1259)

Since v4.0.0

## CreateResponse

Schema for request options used to create an OpenAI Responses API response.

**When to use**

Use to validate or encode payloads sent to the OpenAI Responses API.

**Details**

Validates the Responses API request payload, including input content, model
selection, instructions, reasoning options, text output format, tools,
`tool_choice`, streaming, storage, response continuation, sampling options,
and optional response fields requested through `include`.

**Gotchas**

When `stream` is `true`, the API returns stream events instead of a single
response object.

**See**

- `Response` for decoded non-streaming response objects
- `ResponseStreamEvent` for decoded streaming event objects

**Signature**

```ts
declare const CreateResponse: Schema.Struct<{
  readonly metadata: Schema.optional<Schema.$Record<Schema.String, Schema.String>>
  readonly top_logprobs: Schema.optional<Schema.Number>
  readonly temperature: Schema.optional<Schema.Number>
  readonly top_p: Schema.optional<Schema.Number>
  readonly user: Schema.optional<Schema.String>
  readonly service_tier: Schema.optional<Schema.String>
  readonly previous_response_id: Schema.optional<Schema.String>
  readonly model: Schema.optional<Schema.String>
  readonly reasoning: Schema.optional<
    Schema.Struct<{
      readonly effort: Schema.optional<Schema.Literals<readonly ["none", "minimal", "low", "medium", "high", "xhigh"]>>
      readonly summary: Schema.optional<Schema.Literals<readonly ["auto", "concise", "detailed"]>>
      readonly generate_summary: Schema.optional<Schema.Literals<readonly ["auto", "concise", "detailed"]>>
    }>
  >
  readonly background: Schema.optional<Schema.Boolean>
  readonly max_output_tokens: Schema.optional<Schema.Number>
  readonly max_tool_calls: Schema.optional<Schema.Number>
  readonly text: Schema.optional<
    Schema.Struct<{
      readonly format: Schema.optional<
        Schema.Union<
          readonly [
            Schema.Struct<{ readonly type: Schema.Literal<"text"> }>,
            Schema.Struct<{
              readonly type: Schema.Literal<"json_schema">
              readonly description: Schema.optionalKey<Schema.String>
              readonly name: Schema.String
              readonly schema: Schema.$Record<Schema.String, Schema.Unknown>
              readonly strict: Schema.optionalKey<Schema.NullOr<Schema.Boolean>>
            }>,
            Schema.Struct<{ readonly type: Schema.Literal<"json_object"> }>
          ]
        >
      >
      readonly verbosity: Schema.optional<Schema.Literals<readonly ["low", "medium", "high"]>>
    }>
  >
  readonly tools: Schema.optional<
    Schema.$Array<
      Schema.Union<
        readonly [
          Schema.Struct<{
            readonly type: Schema.Literal<"function">
            readonly name: Schema.String
            readonly description: Schema.optionalKey<Schema.NullOr<Schema.String>>
            readonly parameters: Schema.optionalKey<Schema.NullOr<Schema.$Record<Schema.String, Schema.Unknown>>>
            readonly strict: Schema.optionalKey<Schema.NullOr<Schema.Boolean>>
          }>,
          Schema.Struct<{
            readonly type: Schema.Literal<"custom">
            readonly name: Schema.String
            readonly description: Schema.optionalKey<Schema.String>
            readonly format: Schema.optionalKey<Schema.Unknown>
          }>,
          Schema.StructWithRest<
            Schema.Struct<{
              readonly type: Schema.Literals<
                readonly [
                  "apply_patch",
                  "code_interpreter",
                  "file_search",
                  "image_generation",
                  "local_shell",
                  "mcp",
                  "shell",
                  "web_search",
                  "web_search_preview"
                ]
              >
            }>,
            readonly [Schema.$Record<Schema.String, Schema.Unknown>]
          >
        ]
      >
    >
  >
  readonly tool_choice: Schema.optional<
    Schema.Union<
      readonly [
        Schema.Literals<readonly ["none", "auto", "required"]>,
        Schema.Struct<{
          readonly type: Schema.Literal<"allowed_tools">
          readonly mode: Schema.Literals<readonly ["auto", "required"]>
          readonly tools: Schema.$Array<Schema.$Record<Schema.String, Schema.Unknown>>
        }>,
        Schema.Struct<{ readonly type: Schema.Literal<"function">; readonly name: Schema.String }>,
        Schema.Struct<{ readonly type: Schema.Literal<"custom">; readonly name: Schema.String }>,
        Schema.StructWithRest<
          Schema.Struct<{
            readonly type: Schema.Literals<
              readonly [
                "apply_patch",
                "code_interpreter",
                "file_search",
                "image_generation",
                "local_shell",
                "mcp",
                "shell",
                "web_search",
                "web_search_preview"
              ]
            >
          }>,
          readonly [Schema.$Record<Schema.String, Schema.Unknown>]
        >
      ]
    >
  >
  readonly truncation: Schema.optional<Schema.Literals<readonly ["auto", "disabled"]>>
  readonly input: Schema.optional<
    Schema.Union<
      readonly [
        Schema.String,
        Schema.$Array<
          Schema.Union<
            readonly [
              Schema.Struct<{
                readonly type: Schema.optionalKey<Schema.Literal<"message">>
                readonly role: Schema.Literals<readonly ["system", "developer", "user", "assistant"]>
                readonly status: Schema.optionalKey<
                  Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>
                >
                readonly content: Schema.Union<
                  readonly [
                    Schema.String,
                    Schema.$Array<
                      Schema.Union<
                        readonly [
                          Schema.Struct<{ readonly type: Schema.Literal<"input_text">; readonly text: Schema.String }>,
                          Schema.Struct<{
                            readonly type: Schema.Literal<"input_image">
                            readonly image_url: Schema.optionalKey<Schema.NullOr<Schema.String>>
                            readonly file_id: Schema.optionalKey<Schema.NullOr<Schema.String>>
                            readonly detail: Schema.optionalKey<
                              Schema.NullOr<Schema.Literals<readonly ["low", "high", "auto"]>>
                            >
                          }>,
                          Schema.Struct<{
                            readonly type: Schema.Literal<"input_file">
                            readonly file_id: Schema.optionalKey<Schema.NullOr<Schema.String>>
                            readonly filename: Schema.optionalKey<Schema.String>
                            readonly file_url: Schema.optionalKey<Schema.String>
                            readonly file_data: Schema.optionalKey<Schema.String>
                          }>
                        ]
                      >
                    >
                  ]
                >
              }>,
              Schema.Struct<{
                readonly id: Schema.String
                readonly type: Schema.Literal<"message">
                readonly role: Schema.Literal<"assistant">
                readonly content: Schema.$Array<
                  Schema.Union<
                    readonly [
                      Schema.Struct<{ readonly type: Schema.Literal<"input_text">; readonly text: Schema.String }>,
                      Schema.Struct<{
                        readonly type: Schema.Literal<"output_text">
                        readonly text: Schema.String
                        readonly annotations: Schema.$Array<
                          Schema.Union<
                            readonly [
                              Schema.Struct<{
                                readonly type: Schema.Literal<"file_citation">
                                readonly file_id: Schema.String
                                readonly index: Schema.Number
                                readonly filename: Schema.String
                              }>,
                              Schema.Struct<{
                                readonly type: Schema.Literal<"url_citation">
                                readonly url: Schema.String
                                readonly start_index: Schema.Number
                                readonly end_index: Schema.Number
                                readonly title: Schema.String
                              }>,
                              Schema.Struct<{
                                readonly type: Schema.Literal<"container_file_citation">
                                readonly container_id: Schema.String
                                readonly file_id: Schema.String
                                readonly start_index: Schema.Number
                                readonly end_index: Schema.Number
                                readonly filename: Schema.String
                              }>,
                              Schema.Struct<{
                                readonly type: Schema.Literal<"file_path">
                                readonly file_id: Schema.String
                                readonly index: Schema.Number
                              }>
                            ]
                          >
                        >
                        readonly logprobs: Schema.optionalKey<Schema.$Array<Schema.Unknown>>
                      }>,
                      Schema.Struct<{ readonly type: Schema.Literal<"text">; readonly text: Schema.String }>,
                      Schema.Struct<{ readonly type: Schema.Literal<"summary_text">; readonly text: Schema.String }>,
                      Schema.Struct<{ readonly type: Schema.Literal<"reasoning_text">; readonly text: Schema.String }>,
                      Schema.Struct<{ readonly type: Schema.Literal<"refusal">; readonly refusal: Schema.String }>,
                      Schema.Struct<{
                        readonly type: Schema.Literal<"input_image">
                        readonly image_url: Schema.optionalKey<Schema.NullOr<Schema.String>>
                        readonly file_id: Schema.optionalKey<Schema.NullOr<Schema.String>>
                        readonly detail: Schema.optionalKey<
                          Schema.NullOr<Schema.Literals<readonly ["low", "high", "auto"]>>
                        >
                      }>,
                      Schema.Struct<{
                        readonly type: Schema.Literal<"computer_screenshot">
                        readonly image_url: Schema.NullOr<Schema.String>
                        readonly file_id: Schema.NullOr<Schema.String>
                      }>,
                      Schema.Struct<{
                        readonly type: Schema.Literal<"input_file">
                        readonly file_id: Schema.optionalKey<Schema.NullOr<Schema.String>>
                        readonly filename: Schema.optionalKey<Schema.String>
                        readonly file_url: Schema.optionalKey<Schema.String>
                        readonly file_data: Schema.optionalKey<Schema.String>
                      }>
                    ]
                  >
                >
                readonly status: Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>
              }>,
              Schema.Struct<{
                readonly id: Schema.optionalKey<Schema.String>
                readonly type: Schema.Literal<"function_call">
                readonly call_id: Schema.String
                readonly name: Schema.String
                readonly arguments: Schema.String
                readonly status: Schema.optionalKey<
                  Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>
                >
              }>,
              Schema.Struct<{
                readonly id: Schema.optionalKey<Schema.NullOr<Schema.String>>
                readonly type: Schema.Literal<"function_call_output">
                readonly call_id: Schema.String
                readonly output: Schema.Union<
                  readonly [
                    Schema.String,
                    Schema.$Array<
                      Schema.Union<
                        readonly [
                          Schema.Struct<{ readonly type: Schema.Literal<"input_text">; readonly text: Schema.String }>,
                          Schema.Struct<{
                            readonly type: Schema.Literal<"input_image">
                            readonly image_url: Schema.optionalKey<Schema.NullOr<Schema.String>>
                            readonly file_id: Schema.optionalKey<Schema.NullOr<Schema.String>>
                            readonly detail: Schema.optionalKey<
                              Schema.NullOr<Schema.Literals<readonly ["low", "high", "auto"]>>
                            >
                          }>,
                          Schema.Struct<{
                            readonly type: Schema.Literal<"input_file">
                            readonly file_id: Schema.optionalKey<Schema.NullOr<Schema.String>>
                            readonly filename: Schema.optionalKey<Schema.String>
                            readonly file_url: Schema.optionalKey<Schema.String>
                            readonly file_data: Schema.optionalKey<Schema.String>
                          }>
                        ]
                      >
                    >
                  ]
                >
                readonly status: Schema.optionalKey<
                  Schema.NullOr<Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>>
                >
              }>,
              Schema.Struct<{
                readonly type: Schema.Literal<"reasoning">
                readonly id: Schema.String
                readonly encrypted_content: Schema.optionalKey<Schema.NullOr<Schema.String>>
                readonly summary: Schema.$Array<
                  Schema.Struct<{ readonly type: Schema.Literal<"summary_text">; readonly text: Schema.String }>
                >
                readonly content: Schema.optionalKey<
                  Schema.$Array<
                    Schema.Struct<{ readonly type: Schema.Literal<"reasoning_text">; readonly text: Schema.String }>
                  >
                >
                readonly status: Schema.optionalKey<
                  Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>
                >
              }>,
              Schema.Struct<{ readonly type: Schema.Literal<"item_reference">; readonly id: Schema.String }>,
              Schema.Struct<{
                readonly id: Schema.optionalKey<Schema.String>
                readonly type: Schema.Literal<"local_shell_call">
                readonly call_id: Schema.String
                readonly action: Schema.Unknown
                readonly status: Schema.optionalKey<
                  Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>
                >
              }>,
              Schema.Struct<{
                readonly id: Schema.optionalKey<Schema.String>
                readonly type: Schema.Literal<"local_shell_call_output">
                readonly call_id: Schema.String
                readonly output: Schema.Unknown
                readonly status: Schema.optionalKey<
                  Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>
                >
              }>,
              Schema.Struct<{
                readonly id: Schema.optionalKey<Schema.String>
                readonly type: Schema.Literal<"shell_call">
                readonly call_id: Schema.String
                readonly action: Schema.Unknown
                readonly status: Schema.optionalKey<
                  Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>
                >
              }>,
              Schema.Struct<{
                readonly id: Schema.optionalKey<Schema.String>
                readonly type: Schema.Literal<"shell_call_output">
                readonly call_id: Schema.String
                readonly output: Schema.Unknown
                readonly status: Schema.optionalKey<
                  Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>
                >
              }>,
              Schema.Struct<{
                readonly id: Schema.optionalKey<Schema.String>
                readonly type: Schema.Literal<"apply_patch_call_output">
                readonly call_id: Schema.String
                readonly status: Schema.optionalKey<
                  Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>
                >
                readonly output: Schema.optionalKey<Schema.Unknown>
              }>,
              Schema.Struct<{
                readonly type: Schema.Literal<"mcp_approval_response">
                readonly approval_request_id: Schema.String
                readonly approve: Schema.Boolean
              }>
            ]
          >
        >
      ]
    >
  >
  readonly include: Schema.optional<
    Schema.$Array<
      Schema.Literals<
        readonly [
          "message.input_image.image_url",
          "reasoning.encrypted_content",
          "message.output_text.logprobs",
          "code_interpreter_call.outputs",
          "web_search_call.action.sources"
        ]
      >
    >
  >
  readonly store: Schema.optional<Schema.Boolean>
  readonly instructions: Schema.optional<Schema.String>
  readonly stream: Schema.optional<Schema.Boolean>
  readonly conversation: Schema.optional<Schema.String>
  readonly modalities: Schema.optional<Schema.$Array<Schema.Literals<readonly ["text", "audio"]>>>
  readonly seed: Schema.optional<Schema.Number>
}>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiSchema.ts#L655)

Since v4.0.0

## Embedding

Schema for one embedding item returned by the OpenAI embeddings API.

**When to use**

Use when validating individual embedding entries at the OpenAI client boundary
before assuming the embedding payload is a numeric vector.

**Details**

An embedding item contains its `index`, optional `object` marker, and an
`embedding` represented either as a numeric vector or as a string.

**Gotchas**

Callers that need numeric vectors must account for string embeddings, such as
base64-encoded embeddings returned for string encoding formats.

**Signature**

```ts
declare const Embedding: Schema.Struct<{
  readonly embedding: Schema.Union<readonly [Schema.$Array<Schema.Number>, Schema.String]>
  readonly index: Schema.Number
  readonly object: Schema.optionalKey<Schema.String>
}>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiSchema.ts#L1167)

Since v4.0.0

## IncludeEnum

Schema for optional `include` values supported by the local handwritten
Responses client schema.

**Details**

These values request additional response fields such as image URLs, encrypted
reasoning content, output logprobs, code interpreter outputs, or web search
sources. This schema enumerates the include values supported by this client
path.

**Signature**

```ts
declare const IncludeEnum: Schema.Literals<
  readonly [
    "message.input_image.image_url",
    "reasoning.encrypted_content",
    "message.output_text.logprobs",
    "code_interpreter_call.outputs",
    "web_search_call.action.sources"
  ]
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiSchema.ts#L35)

Since v4.0.0

## InputContent

Schema for content blocks accepted in OpenAI Responses input messages.

**Details**

Accepted block variants are `input_text`, `input_image`, and `input_file`.

**See**

- `InputItem` for request input item shapes that can contain these content blocks

**Signature**

```ts
declare const InputContent: Schema.Union<
  readonly [
    Schema.Struct<{ readonly type: Schema.Literal<"input_text">; readonly text: Schema.String }>,
    Schema.Struct<{
      readonly type: Schema.Literal<"input_image">
      readonly image_url: Schema.optionalKey<Schema.NullOr<Schema.String>>
      readonly file_id: Schema.optionalKey<Schema.NullOr<Schema.String>>
      readonly detail: Schema.optionalKey<Schema.NullOr<Schema.Literals<readonly ["low", "high", "auto"]>>>
    }>,
    Schema.Struct<{
      readonly type: Schema.Literal<"input_file">
      readonly file_id: Schema.optionalKey<Schema.NullOr<Schema.String>>
      readonly filename: Schema.optionalKey<Schema.String>
      readonly file_url: Schema.optionalKey<Schema.String>
      readonly file_data: Schema.optionalKey<Schema.String>
    }>
  ]
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiSchema.ts#L108)

Since v4.0.0

## InputItem

Schema for item shapes accepted by an OpenAI Responses request `input` field.

**When to use**

Use when validating structured `CreateResponse.input` array items.

**Details**

Accepted item families include request/output messages, function call and
function call output, reasoning items, item references, shell and local shell
calls and outputs, apply-patch output, and MCP approval responses.

**See**

- `CreateResponse` for the request schema that consumes input items
- `InputContent` for content blocks inside message items

**Signature**

```ts
declare const InputItem: Schema.Union<
  readonly [
    Schema.Struct<{
      readonly type: Schema.optionalKey<Schema.Literal<"message">>
      readonly role: Schema.Literals<readonly ["system", "developer", "user", "assistant"]>
      readonly status: Schema.optionalKey<Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>>
      readonly content: Schema.Union<
        readonly [
          Schema.String,
          Schema.$Array<
            Schema.Union<
              readonly [
                Schema.Struct<{ readonly type: Schema.Literal<"input_text">; readonly text: Schema.String }>,
                Schema.Struct<{
                  readonly type: Schema.Literal<"input_image">
                  readonly image_url: Schema.optionalKey<Schema.NullOr<Schema.String>>
                  readonly file_id: Schema.optionalKey<Schema.NullOr<Schema.String>>
                  readonly detail: Schema.optionalKey<Schema.NullOr<Schema.Literals<readonly ["low", "high", "auto"]>>>
                }>,
                Schema.Struct<{
                  readonly type: Schema.Literal<"input_file">
                  readonly file_id: Schema.optionalKey<Schema.NullOr<Schema.String>>
                  readonly filename: Schema.optionalKey<Schema.String>
                  readonly file_url: Schema.optionalKey<Schema.String>
                  readonly file_data: Schema.optionalKey<Schema.String>
                }>
              ]
            >
          >
        ]
      >
    }>,
    Schema.Struct<{
      readonly id: Schema.String
      readonly type: Schema.Literal<"message">
      readonly role: Schema.Literal<"assistant">
      readonly content: Schema.$Array<
        Schema.Union<
          readonly [
            Schema.Struct<{ readonly type: Schema.Literal<"input_text">; readonly text: Schema.String }>,
            Schema.Struct<{
              readonly type: Schema.Literal<"output_text">
              readonly text: Schema.String
              readonly annotations: Schema.$Array<
                Schema.Union<
                  readonly [
                    Schema.Struct<{
                      readonly type: Schema.Literal<"file_citation">
                      readonly file_id: Schema.String
                      readonly index: Schema.Number
                      readonly filename: Schema.String
                    }>,
                    Schema.Struct<{
                      readonly type: Schema.Literal<"url_citation">
                      readonly url: Schema.String
                      readonly start_index: Schema.Number
                      readonly end_index: Schema.Number
                      readonly title: Schema.String
                    }>,
                    Schema.Struct<{
                      readonly type: Schema.Literal<"container_file_citation">
                      readonly container_id: Schema.String
                      readonly file_id: Schema.String
                      readonly start_index: Schema.Number
                      readonly end_index: Schema.Number
                      readonly filename: Schema.String
                    }>,
                    Schema.Struct<{
                      readonly type: Schema.Literal<"file_path">
                      readonly file_id: Schema.String
                      readonly index: Schema.Number
                    }>
                  ]
                >
              >
              readonly logprobs: Schema.optionalKey<Schema.$Array<Schema.Unknown>>
            }>,
            Schema.Struct<{ readonly type: Schema.Literal<"text">; readonly text: Schema.String }>,
            Schema.Struct<{ readonly type: Schema.Literal<"summary_text">; readonly text: Schema.String }>,
            Schema.Struct<{ readonly type: Schema.Literal<"reasoning_text">; readonly text: Schema.String }>,
            Schema.Struct<{ readonly type: Schema.Literal<"refusal">; readonly refusal: Schema.String }>,
            Schema.Struct<{
              readonly type: Schema.Literal<"input_image">
              readonly image_url: Schema.optionalKey<Schema.NullOr<Schema.String>>
              readonly file_id: Schema.optionalKey<Schema.NullOr<Schema.String>>
              readonly detail: Schema.optionalKey<Schema.NullOr<Schema.Literals<readonly ["low", "high", "auto"]>>>
            }>,
            Schema.Struct<{
              readonly type: Schema.Literal<"computer_screenshot">
              readonly image_url: Schema.NullOr<Schema.String>
              readonly file_id: Schema.NullOr<Schema.String>
            }>,
            Schema.Struct<{
              readonly type: Schema.Literal<"input_file">
              readonly file_id: Schema.optionalKey<Schema.NullOr<Schema.String>>
              readonly filename: Schema.optionalKey<Schema.String>
              readonly file_url: Schema.optionalKey<Schema.String>
              readonly file_data: Schema.optionalKey<Schema.String>
            }>
          ]
        >
      >
      readonly status: Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>
    }>,
    Schema.Struct<{
      readonly id: Schema.optionalKey<Schema.String>
      readonly type: Schema.Literal<"function_call">
      readonly call_id: Schema.String
      readonly name: Schema.String
      readonly arguments: Schema.String
      readonly status: Schema.optionalKey<Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>>
    }>,
    Schema.Struct<{
      readonly id: Schema.optionalKey<Schema.NullOr<Schema.String>>
      readonly type: Schema.Literal<"function_call_output">
      readonly call_id: Schema.String
      readonly output: Schema.Union<
        readonly [
          Schema.String,
          Schema.$Array<
            Schema.Union<
              readonly [
                Schema.Struct<{ readonly type: Schema.Literal<"input_text">; readonly text: Schema.String }>,
                Schema.Struct<{
                  readonly type: Schema.Literal<"input_image">
                  readonly image_url: Schema.optionalKey<Schema.NullOr<Schema.String>>
                  readonly file_id: Schema.optionalKey<Schema.NullOr<Schema.String>>
                  readonly detail: Schema.optionalKey<Schema.NullOr<Schema.Literals<readonly ["low", "high", "auto"]>>>
                }>,
                Schema.Struct<{
                  readonly type: Schema.Literal<"input_file">
                  readonly file_id: Schema.optionalKey<Schema.NullOr<Schema.String>>
                  readonly filename: Schema.optionalKey<Schema.String>
                  readonly file_url: Schema.optionalKey<Schema.String>
                  readonly file_data: Schema.optionalKey<Schema.String>
                }>
              ]
            >
          >
        ]
      >
      readonly status: Schema.optionalKey<
        Schema.NullOr<Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>>
      >
    }>,
    Schema.Struct<{
      readonly type: Schema.Literal<"reasoning">
      readonly id: Schema.String
      readonly encrypted_content: Schema.optionalKey<Schema.NullOr<Schema.String>>
      readonly summary: Schema.$Array<
        Schema.Struct<{ readonly type: Schema.Literal<"summary_text">; readonly text: Schema.String }>
      >
      readonly content: Schema.optionalKey<
        Schema.$Array<Schema.Struct<{ readonly type: Schema.Literal<"reasoning_text">; readonly text: Schema.String }>>
      >
      readonly status: Schema.optionalKey<Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>>
    }>,
    Schema.Struct<{ readonly type: Schema.Literal<"item_reference">; readonly id: Schema.String }>,
    Schema.Struct<{
      readonly id: Schema.optionalKey<Schema.String>
      readonly type: Schema.Literal<"local_shell_call">
      readonly call_id: Schema.String
      readonly action: Schema.Unknown
      readonly status: Schema.optionalKey<Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>>
    }>,
    Schema.Struct<{
      readonly id: Schema.optionalKey<Schema.String>
      readonly type: Schema.Literal<"local_shell_call_output">
      readonly call_id: Schema.String
      readonly output: Schema.Unknown
      readonly status: Schema.optionalKey<Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>>
    }>,
    Schema.Struct<{
      readonly id: Schema.optionalKey<Schema.String>
      readonly type: Schema.Literal<"shell_call">
      readonly call_id: Schema.String
      readonly action: Schema.Unknown
      readonly status: Schema.optionalKey<Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>>
    }>,
    Schema.Struct<{
      readonly id: Schema.optionalKey<Schema.String>
      readonly type: Schema.Literal<"shell_call_output">
      readonly call_id: Schema.String
      readonly output: Schema.Unknown
      readonly status: Schema.optionalKey<Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>>
    }>,
    Schema.Struct<{
      readonly id: Schema.optionalKey<Schema.String>
      readonly type: Schema.Literal<"apply_patch_call_output">
      readonly call_id: Schema.String
      readonly status: Schema.optionalKey<Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>>
      readonly output: Schema.optionalKey<Schema.Unknown>
    }>,
    Schema.Struct<{
      readonly type: Schema.Literal<"mcp_approval_response">
      readonly approval_request_id: Schema.String
      readonly approve: Schema.Boolean
    }>
  ]
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiSchema.ts#L417)

Since v4.0.0

## MessageStatus

Schema for lifecycle statuses shared by messages, reasoning items, and tool calls.

**Details**

Accepted values are `"in_progress"`, `"completed"`, and `"incomplete"`.
This item-level status is used by message, reasoning, and tool-call shapes.

**Signature**

```ts
declare const MessageStatus: Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiSchema.ts#L62)

Since v4.0.0

## ReasoningItem

Schema for a reasoning output item containing encrypted content, summaries, and optional reasoning text.

**When to use**

Use when decoding or encoding OpenAI Responses reasoning items that may be
carried into later request input.

**Details**

Reasoning items represent model reasoning content. `summary` is required,
while `content` and `status` are optional.

**Gotchas**

`encrypted_content` is populated only when `reasoning.encrypted_content` is
requested through `include`.

**See**

- `InputItem` for request input items that can carry reasoning items
- `IncludeEnum` for requesting encrypted reasoning content

**Signature**

```ts
declare const ReasoningItem: Schema.Struct<{
  readonly type: Schema.Literal<"reasoning">
  readonly id: Schema.String
  readonly encrypted_content: Schema.optionalKey<Schema.NullOr<Schema.String>>
  readonly summary: Schema.$Array<
    Schema.Struct<{ readonly type: Schema.Literal<"summary_text">; readonly text: Schema.String }>
  >
  readonly content: Schema.optionalKey<
    Schema.$Array<Schema.Struct<{ readonly type: Schema.Literal<"reasoning_text">; readonly text: Schema.String }>>
  >
  readonly status: Schema.optionalKey<Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>>
}>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiSchema.ts#L285)

Since v4.0.0

## Response

Schema for an OpenAI Responses API response object.

**When to use**

Use to decode non-streaming OpenAI Responses API responses.

**Details**

Response objects include the response id, model, creation time, output items,
optional token usage, optional incomplete details, and optional service tier.

**See**

- `CreateResponse` for the request schema that creates responses
- `ResponseUsage` for token accounting on responses
- `ResponseStreamEvent` for streaming response events

**Signature**

```ts
declare const Response: Schema.Struct<{
  readonly id: Schema.String
  readonly object: Schema.optionalKey<Schema.Literal<"response">>
  readonly model: Schema.String
  readonly created_at: Schema.Number
  readonly output: Schema.withDecodingDefault<
    Schema.$Array<
      Schema.Union<
        readonly [
          Schema.Struct<{
            readonly id: Schema.String
            readonly type: Schema.Literal<"apply_patch_call">
            readonly call_id: Schema.String
            readonly operation: Schema.Struct<{
              readonly type: Schema.String
              readonly path: Schema.String
              readonly diff: Schema.optionalKey<Schema.String>
            }>
            readonly status: Schema.optionalKey<Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>>
          }>,
          Schema.Struct<{
            readonly id: Schema.String
            readonly type: Schema.Literal<"code_interpreter_call">
            readonly code: Schema.optionalKey<Schema.String>
            readonly container_id: Schema.String
            readonly outputs: Schema.optionalKey<Schema.$Array<Schema.Unknown>>
            readonly status: Schema.optionalKey<Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>>
          }>,
          Schema.Struct<{
            readonly id: Schema.String
            readonly type: Schema.Literal<"computer_call">
            readonly status: Schema.optionalKey<Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>>
          }>,
          Schema.Struct<{
            readonly id: Schema.String
            readonly type: Schema.Literal<"file_search_call">
            readonly status: Schema.optionalKey<Schema.String>
            readonly queries: Schema.optionalKey<Schema.$Array<Schema.String>>
            readonly results: Schema.optionalKey<Schema.NullOr<Schema.Unknown>>
          }>,
          Schema.Struct<{
            readonly id: Schema.optionalKey<Schema.String>
            readonly type: Schema.Literal<"function_call">
            readonly call_id: Schema.String
            readonly name: Schema.String
            readonly arguments: Schema.String
            readonly status: Schema.optionalKey<Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>>
          }>,
          Schema.Struct<{
            readonly id: Schema.String
            readonly type: Schema.Literal<"image_generation_call">
            readonly result: Schema.optionalKey<Schema.String>
            readonly status: Schema.optionalKey<Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>>
          }>,
          Schema.Struct<{
            readonly id: Schema.optionalKey<Schema.String>
            readonly type: Schema.Literal<"local_shell_call">
            readonly call_id: Schema.String
            readonly action: Schema.Unknown
            readonly status: Schema.optionalKey<Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>>
          }>,
          Schema.Struct<{
            readonly id: Schema.String
            readonly type: Schema.Literal<"mcp_call">
            readonly approval_request_id: Schema.optionalKey<Schema.NullOr<Schema.String>>
            readonly name: Schema.String
            readonly arguments: Schema.Unknown
            readonly output: Schema.optionalKey<Schema.Unknown>
            readonly error: Schema.optionalKey<Schema.Unknown>
            readonly server_label: Schema.optionalKey<Schema.NullOr<Schema.String>>
          }>,
          Schema.Struct<{ readonly id: Schema.String; readonly type: Schema.Literal<"mcp_list_tools"> }>,
          Schema.Struct<{
            readonly id: Schema.String
            readonly type: Schema.Literal<"mcp_approval_request">
            readonly approval_request_id: Schema.optionalKey<Schema.String>
            readonly name: Schema.String
            readonly arguments: Schema.Unknown
          }>,
          Schema.Struct<{
            readonly id: Schema.String
            readonly type: Schema.Literal<"message">
            readonly role: Schema.Literal<"assistant">
            readonly content: Schema.$Array<
              Schema.Union<
                readonly [
                  Schema.Struct<{ readonly type: Schema.Literal<"input_text">; readonly text: Schema.String }>,
                  Schema.Struct<{
                    readonly type: Schema.Literal<"output_text">
                    readonly text: Schema.String
                    readonly annotations: Schema.$Array<
                      Schema.Union<
                        readonly [
                          Schema.Struct<{
                            readonly type: Schema.Literal<"file_citation">
                            readonly file_id: Schema.String
                            readonly index: Schema.Number
                            readonly filename: Schema.String
                          }>,
                          Schema.Struct<{
                            readonly type: Schema.Literal<"url_citation">
                            readonly url: Schema.String
                            readonly start_index: Schema.Number
                            readonly end_index: Schema.Number
                            readonly title: Schema.String
                          }>,
                          Schema.Struct<{
                            readonly type: Schema.Literal<"container_file_citation">
                            readonly container_id: Schema.String
                            readonly file_id: Schema.String
                            readonly start_index: Schema.Number
                            readonly end_index: Schema.Number
                            readonly filename: Schema.String
                          }>,
                          Schema.Struct<{
                            readonly type: Schema.Literal<"file_path">
                            readonly file_id: Schema.String
                            readonly index: Schema.Number
                          }>
                        ]
                      >
                    >
                    readonly logprobs: Schema.optionalKey<Schema.$Array<Schema.Unknown>>
                  }>,
                  Schema.Struct<{ readonly type: Schema.Literal<"text">; readonly text: Schema.String }>,
                  Schema.Struct<{ readonly type: Schema.Literal<"summary_text">; readonly text: Schema.String }>,
                  Schema.Struct<{ readonly type: Schema.Literal<"reasoning_text">; readonly text: Schema.String }>,
                  Schema.Struct<{ readonly type: Schema.Literal<"refusal">; readonly refusal: Schema.String }>,
                  Schema.Struct<{
                    readonly type: Schema.Literal<"input_image">
                    readonly image_url: Schema.optionalKey<Schema.NullOr<Schema.String>>
                    readonly file_id: Schema.optionalKey<Schema.NullOr<Schema.String>>
                    readonly detail: Schema.optionalKey<
                      Schema.NullOr<Schema.Literals<readonly ["low", "high", "auto"]>>
                    >
                  }>,
                  Schema.Struct<{
                    readonly type: Schema.Literal<"computer_screenshot">
                    readonly image_url: Schema.NullOr<Schema.String>
                    readonly file_id: Schema.NullOr<Schema.String>
                  }>,
                  Schema.Struct<{
                    readonly type: Schema.Literal<"input_file">
                    readonly file_id: Schema.optionalKey<Schema.NullOr<Schema.String>>
                    readonly filename: Schema.optionalKey<Schema.String>
                    readonly file_url: Schema.optionalKey<Schema.String>
                    readonly file_data: Schema.optionalKey<Schema.String>
                  }>
                ]
              >
            >
            readonly status: Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>
          }>,
          Schema.Struct<{
            readonly type: Schema.Literal<"reasoning">
            readonly id: Schema.String
            readonly encrypted_content: Schema.optionalKey<Schema.NullOr<Schema.String>>
            readonly summary: Schema.$Array<
              Schema.Struct<{ readonly type: Schema.Literal<"summary_text">; readonly text: Schema.String }>
            >
            readonly content: Schema.optionalKey<
              Schema.$Array<
                Schema.Struct<{ readonly type: Schema.Literal<"reasoning_text">; readonly text: Schema.String }>
              >
            >
            readonly status: Schema.optionalKey<Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>>
          }>,
          Schema.Struct<{
            readonly id: Schema.optionalKey<Schema.String>
            readonly type: Schema.Literal<"shell_call">
            readonly call_id: Schema.String
            readonly action: Schema.Unknown
            readonly status: Schema.optionalKey<Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>>
          }>,
          Schema.Struct<{
            readonly id: Schema.String
            readonly type: Schema.Literal<"web_search_call">
            readonly action: Schema.optionalKey<Schema.Unknown>
            readonly status: Schema.optionalKey<Schema.String>
          }>
        ]
      >
    >,
    never
  >
  readonly usage: Schema.optionalKey<
    Schema.NullOr<
      Schema.StructWithRest<
        Schema.Struct<{
          readonly input_tokens: Schema.Number
          readonly output_tokens: Schema.Number
          readonly total_tokens: Schema.Number
          readonly input_tokens_details: Schema.optionalKey<Schema.Unknown>
          readonly output_tokens_details: Schema.optionalKey<Schema.Unknown>
        }>,
        readonly [Schema.$Record<Schema.String, Schema.Unknown>]
      >
    >
  >
  readonly incomplete_details: Schema.optionalKey<
    Schema.NullOr<
      Schema.Struct<{
        readonly reason: Schema.optionalKey<Schema.Literals<readonly ["max_output_tokens", "content_filter"]>>
      }>
    >
  >
  readonly service_tier: Schema.optionalKey<Schema.String>
}>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiSchema.ts#L852)

Since v4.0.0

## ResponseStreamEvent

Schema for server-sent event shapes emitted by OpenAI Responses API streams.

**When to use**

Use to decode events from a streaming OpenAI Responses API request.

**Details**

Known event variants include response lifecycle events, output item events,
text and reasoning deltas, tool-call deltas, partial image events, and error
events.

**Gotchas**

Future event types decode through the fallback only when their `type` is not
one of the known event types. Malformed known events still fail to decode.

**See**

- `Response` for complete response objects carried by lifecycle events
- `UnknownResponseStreamEvent` for the fallback shape for future event types

**Signature**

```ts
declare const ResponseStreamEvent: Schema.Union<
  readonly [
    Schema.Struct<{
      readonly type: Schema.Literal<"response.created">
      readonly response: Schema.Struct<{
        readonly id: Schema.String
        readonly object: Schema.optionalKey<Schema.Literal<"response">>
        readonly model: Schema.String
        readonly created_at: Schema.Number
        readonly output: Schema.withDecodingDefault<
          Schema.$Array<
            Schema.Union<
              readonly [
                Schema.Struct<{
                  readonly id: Schema.String
                  readonly type: Schema.Literal<"apply_patch_call">
                  readonly call_id: Schema.String
                  readonly operation: Schema.Struct<{
                    readonly type: Schema.String
                    readonly path: Schema.String
                    readonly diff: Schema.optionalKey<Schema.String>
                  }>
                  readonly status: Schema.optionalKey<
                    Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>
                  >
                }>,
                Schema.Struct<{
                  readonly id: Schema.String
                  readonly type: Schema.Literal<"code_interpreter_call">
                  readonly code: Schema.optionalKey<Schema.String>
                  readonly container_id: Schema.String
                  readonly outputs: Schema.optionalKey<Schema.$Array<Schema.Unknown>>
                  readonly status: Schema.optionalKey<
                    Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>
                  >
                }>,
                Schema.Struct<{
                  readonly id: Schema.String
                  readonly type: Schema.Literal<"computer_call">
                  readonly status: Schema.optionalKey<
                    Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>
                  >
                }>,
                Schema.Struct<{
                  readonly id: Schema.String
                  readonly type: Schema.Literal<"file_search_call">
                  readonly status: Schema.optionalKey<Schema.String>
                  readonly queries: Schema.optionalKey<Schema.$Array<Schema.String>>
                  readonly results: Schema.optionalKey<Schema.NullOr<Schema.Unknown>>
                }>,
                Schema.Struct<{
                  readonly id: Schema.optionalKey<Schema.String>
                  readonly type: Schema.Literal<"function_call">
                  readonly call_id: Schema.String
                  readonly name: Schema.String
                  readonly arguments: Schema.String
                  readonly status: Schema.optionalKey<
                    Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>
                  >
                }>,
                Schema.Struct<{
                  readonly id: Schema.String
                  readonly type: Schema.Literal<"image_generation_call">
                  readonly result: Schema.optionalKey<Schema.String>
                  readonly status: Schema.optionalKey<
                    Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>
                  >
                }>,
                Schema.Struct<{
                  readonly id: Schema.optionalKey<Schema.String>
                  readonly type: Schema.Literal<"local_shell_call">
                  readonly call_id: Schema.String
                  readonly action: Schema.Unknown
                  readonly status: Schema.optionalKey<
                    Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>
                  >
                }>,
                Schema.Struct<{
                  readonly id: Schema.String
                  readonly type: Schema.Literal<"mcp_call">
                  readonly approval_request_id: Schema.optionalKey<Schema.NullOr<Schema.String>>
                  readonly name: Schema.String
                  readonly arguments: Schema.Unknown
                  readonly output: Schema.optionalKey<Schema.Unknown>
                  readonly error: Schema.optionalKey<Schema.Unknown>
                  readonly server_label: Schema.optionalKey<Schema.NullOr<Schema.String>>
                }>,
                Schema.Struct<{ readonly id: Schema.String; readonly type: Schema.Literal<"mcp_list_tools"> }>,
                Schema.Struct<{
                  readonly id: Schema.String
                  readonly type: Schema.Literal<"mcp_approval_request">
                  readonly approval_request_id: Schema.optionalKey<Schema.String>
                  readonly name: Schema.String
                  readonly arguments: Schema.Unknown
                }>,
                Schema.Struct<{
                  readonly id: Schema.String
                  readonly type: Schema.Literal<"message">
                  readonly role: Schema.Literal<"assistant">
                  readonly content: Schema.$Array<
                    Schema.Union<
                      readonly [
                        Schema.Struct<{ readonly type: Schema.Literal<"input_text">; readonly text: Schema.String }>,
                        Schema.Struct<{
                          readonly type: Schema.Literal<"output_text">
                          readonly text: Schema.String
                          readonly annotations: Schema.$Array<
                            Schema.Union<
                              readonly [
                                Schema.Struct<{
                                  readonly type: Schema.Literal<"file_citation">
                                  readonly file_id: Schema.String
                                  readonly index: Schema.Number
                                  readonly filename: Schema.String
                                }>,
                                Schema.Struct<{
                                  readonly type: Schema.Literal<"url_citation">
                                  readonly url: Schema.String
                                  readonly start_index: Schema.Number
                                  readonly end_index: Schema.Number
                                  readonly title: Schema.String
                                }>,
                                Schema.Struct<{
                                  readonly type: Schema.Literal<"container_file_citation">
                                  readonly container_id: Schema.String
                                  readonly file_id: Schema.String
                                  readonly start_index: Schema.Number
                                  readonly end_index: Schema.Number
                                  readonly filename: Schema.String
                                }>,
                                Schema.Struct<{
                                  readonly type: Schema.Literal<"file_path">
                                  readonly file_id: Schema.String
                                  readonly index: Schema.Number
                                }>
                              ]
                            >
                          >
                          readonly logprobs: Schema.optionalKey<Schema.$Array<Schema.Unknown>>
                        }>,
                        Schema.Struct<{ readonly type: Schema.Literal<"text">; readonly text: Schema.String }>,
                        Schema.Struct<{ readonly type: Schema.Literal<"summary_text">; readonly text: Schema.String }>,
                        Schema.Struct<{
                          readonly type: Schema.Literal<"reasoning_text">
                          readonly text: Schema.String
                        }>,
                        Schema.Struct<{ readonly type: Schema.Literal<"refusal">; readonly refusal: Schema.String }>,
                        Schema.Struct<{
                          readonly type: Schema.Literal<"input_image">
                          readonly image_url: Schema.optionalKey<Schema.NullOr<Schema.String>>
                          readonly file_id: Schema.optionalKey<Schema.NullOr<Schema.String>>
                          readonly detail: Schema.optionalKey<
                            Schema.NullOr<Schema.Literals<readonly ["low", "high", "auto"]>>
                          >
                        }>,
                        Schema.Struct<{
                          readonly type: Schema.Literal<"computer_screenshot">
                          readonly image_url: Schema.NullOr<Schema.String>
                          readonly file_id: Schema.NullOr<Schema.String>
                        }>,
                        Schema.Struct<{
                          readonly type: Schema.Literal<"input_file">
                          readonly file_id: Schema.optionalKey<Schema.NullOr<Schema.String>>
                          readonly filename: Schema.optionalKey<Schema.String>
                          readonly file_url: Schema.optionalKey<Schema.String>
                          readonly file_data: Schema.optionalKey<Schema.String>
                        }>
                      ]
                    >
                  >
                  readonly status: Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>
                }>,
                Schema.Struct<{
                  readonly type: Schema.Literal<"reasoning">
                  readonly id: Schema.String
                  readonly encrypted_content: Schema.optionalKey<Schema.NullOr<Schema.String>>
                  readonly summary: Schema.$Array<
                    Schema.Struct<{ readonly type: Schema.Literal<"summary_text">; readonly text: Schema.String }>
                  >
                  readonly content: Schema.optionalKey<
                    Schema.$Array<
                      Schema.Struct<{ readonly type: Schema.Literal<"reasoning_text">; readonly text: Schema.String }>
                    >
                  >
                  readonly status: Schema.optionalKey<
                    Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>
                  >
                }>,
                Schema.Struct<{
                  readonly id: Schema.optionalKey<Schema.String>
                  readonly type: Schema.Literal<"shell_call">
                  readonly call_id: Schema.String
                  readonly action: Schema.Unknown
                  readonly status: Schema.optionalKey<
                    Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>
                  >
                }>,
                Schema.Struct<{
                  readonly id: Schema.String
                  readonly type: Schema.Literal<"web_search_call">
                  readonly action: Schema.optionalKey<Schema.Unknown>
                  readonly status: Schema.optionalKey<Schema.String>
                }>
              ]
            >
          >,
          never
        >
        readonly usage: Schema.optionalKey<
          Schema.NullOr<
            Schema.StructWithRest<
              Schema.Struct<{
                readonly input_tokens: Schema.Number
                readonly output_tokens: Schema.Number
                readonly total_tokens: Schema.Number
                readonly input_tokens_details: Schema.optionalKey<Schema.Unknown>
                readonly output_tokens_details: Schema.optionalKey<Schema.Unknown>
              }>,
              readonly [Schema.$Record<Schema.String, Schema.Unknown>]
            >
          >
        >
        readonly incomplete_details: Schema.optionalKey<
          Schema.NullOr<
            Schema.Struct<{
              readonly reason: Schema.optionalKey<Schema.Literals<readonly ["max_output_tokens", "content_filter"]>>
            }>
          >
        >
        readonly service_tier: Schema.optionalKey<Schema.String>
      }>
      readonly sequence_number: Schema.Number
    }>,
    Schema.Struct<{
      readonly type: Schema.Literal<"response.completed">
      readonly response: Schema.Struct<{
        readonly id: Schema.String
        readonly object: Schema.optionalKey<Schema.Literal<"response">>
        readonly model: Schema.String
        readonly created_at: Schema.Number
        readonly output: Schema.withDecodingDefault<
          Schema.$Array<
            Schema.Union<
              readonly [
                Schema.Struct<{
                  readonly id: Schema.String
                  readonly type: Schema.Literal<"apply_patch_call">
                  readonly call_id: Schema.String
                  readonly operation: Schema.Struct<{
                    readonly type: Schema.String
                    readonly path: Schema.String
                    readonly diff: Schema.optionalKey<Schema.String>
                  }>
                  readonly status: Schema.optionalKey<
                    Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>
                  >
                }>,
                Schema.Struct<{
                  readonly id: Schema.String
                  readonly type: Schema.Literal<"code_interpreter_call">
                  readonly code: Schema.optionalKey<Schema.String>
                  readonly container_id: Schema.String
                  readonly outputs: Schema.optionalKey<Schema.$Array<Schema.Unknown>>
                  readonly status: Schema.optionalKey<
                    Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>
                  >
                }>,
                Schema.Struct<{
                  readonly id: Schema.String
                  readonly type: Schema.Literal<"computer_call">
                  readonly status: Schema.optionalKey<
                    Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>
                  >
                }>,
                Schema.Struct<{
                  readonly id: Schema.String
                  readonly type: Schema.Literal<"file_search_call">
                  readonly status: Schema.optionalKey<Schema.String>
                  readonly queries: Schema.optionalKey<Schema.$Array<Schema.String>>
                  readonly results: Schema.optionalKey<Schema.NullOr<Schema.Unknown>>
                }>,
                Schema.Struct<{
                  readonly id: Schema.optionalKey<Schema.String>
                  readonly type: Schema.Literal<"function_call">
                  readonly call_id: Schema.String
                  readonly name: Schema.String
                  readonly arguments: Schema.String
                  readonly status: Schema.optionalKey<
                    Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>
                  >
                }>,
                Schema.Struct<{
                  readonly id: Schema.String
                  readonly type: Schema.Literal<"image_generation_call">
                  readonly result: Schema.optionalKey<Schema.String>
                  readonly status: Schema.optionalKey<
                    Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>
                  >
                }>,
                Schema.Struct<{
                  readonly id: Schema.optionalKey<Schema.String>
                  readonly type: Schema.Literal<"local_shell_call">
                  readonly call_id: Schema.String
                  readonly action: Schema.Unknown
                  readonly status: Schema.optionalKey<
                    Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>
                  >
                }>,
                Schema.Struct<{
                  readonly id: Schema.String
                  readonly type: Schema.Literal<"mcp_call">
                  readonly approval_request_id: Schema.optionalKey<Schema.NullOr<Schema.String>>
                  readonly name: Schema.String
                  readonly arguments: Schema.Unknown
                  readonly output: Schema.optionalKey<Schema.Unknown>
                  readonly error: Schema.optionalKey<Schema.Unknown>
                  readonly server_label: Schema.optionalKey<Schema.NullOr<Schema.String>>
                }>,
                Schema.Struct<{ readonly id: Schema.String; readonly type: Schema.Literal<"mcp_list_tools"> }>,
                Schema.Struct<{
                  readonly id: Schema.String
                  readonly type: Schema.Literal<"mcp_approval_request">
                  readonly approval_request_id: Schema.optionalKey<Schema.String>
                  readonly name: Schema.String
                  readonly arguments: Schema.Unknown
                }>,
                Schema.Struct<{
                  readonly id: Schema.String
                  readonly type: Schema.Literal<"message">
                  readonly role: Schema.Literal<"assistant">
                  readonly content: Schema.$Array<
                    Schema.Union<
                      readonly [
                        Schema.Struct<{ readonly type: Schema.Literal<"input_text">; readonly text: Schema.String }>,
                        Schema.Struct<{
                          readonly type: Schema.Literal<"output_text">
                          readonly text: Schema.String
                          readonly annotations: Schema.$Array<
                            Schema.Union<
                              readonly [
                                Schema.Struct<{
                                  readonly type: Schema.Literal<"file_citation">
                                  readonly file_id: Schema.String
                                  readonly index: Schema.Number
                                  readonly filename: Schema.String
                                }>,
                                Schema.Struct<{
                                  readonly type: Schema.Literal<"url_citation">
                                  readonly url: Schema.String
                                  readonly start_index: Schema.Number
                                  readonly end_index: Schema.Number
                                  readonly title: Schema.String
                                }>,
                                Schema.Struct<{
                                  readonly type: Schema.Literal<"container_file_citation">
                                  readonly container_id: Schema.String
                                  readonly file_id: Schema.String
                                  readonly start_index: Schema.Number
                                  readonly end_index: Schema.Number
                                  readonly filename: Schema.String
                                }>,
                                Schema.Struct<{
                                  readonly type: Schema.Literal<"file_path">
                                  readonly file_id: Schema.String
                                  readonly index: Schema.Number
                                }>
                              ]
                            >
                          >
                          readonly logprobs: Schema.optionalKey<Schema.$Array<Schema.Unknown>>
                        }>,
                        Schema.Struct<{ readonly type: Schema.Literal<"text">; readonly text: Schema.String }>,
                        Schema.Struct<{ readonly type: Schema.Literal<"summary_text">; readonly text: Schema.String }>,
                        Schema.Struct<{
                          readonly type: Schema.Literal<"reasoning_text">
                          readonly text: Schema.String
                        }>,
                        Schema.Struct<{ readonly type: Schema.Literal<"refusal">; readonly refusal: Schema.String }>,
                        Schema.Struct<{
                          readonly type: Schema.Literal<"input_image">
                          readonly image_url: Schema.optionalKey<Schema.NullOr<Schema.String>>
                          readonly file_id: Schema.optionalKey<Schema.NullOr<Schema.String>>
                          readonly detail: Schema.optionalKey<
                            Schema.NullOr<Schema.Literals<readonly ["low", "high", "auto"]>>
                          >
                        }>,
                        Schema.Struct<{
                          readonly type: Schema.Literal<"computer_screenshot">
                          readonly image_url: Schema.NullOr<Schema.String>
                          readonly file_id: Schema.NullOr<Schema.String>
                        }>,
                        Schema.Struct<{
                          readonly type: Schema.Literal<"input_file">
                          readonly file_id: Schema.optionalKey<Schema.NullOr<Schema.String>>
                          readonly filename: Schema.optionalKey<Schema.String>
                          readonly file_url: Schema.optionalKey<Schema.String>
                          readonly file_data: Schema.optionalKey<Schema.String>
                        }>
                      ]
                    >
                  >
                  readonly status: Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>
                }>,
                Schema.Struct<{
                  readonly type: Schema.Literal<"reasoning">
                  readonly id: Schema.String
                  readonly encrypted_content: Schema.optionalKey<Schema.NullOr<Schema.String>>
                  readonly summary: Schema.$Array<
                    Schema.Struct<{ readonly type: Schema.Literal<"summary_text">; readonly text: Schema.String }>
                  >
                  readonly content: Schema.optionalKey<
                    Schema.$Array<
                      Schema.Struct<{ readonly type: Schema.Literal<"reasoning_text">; readonly text: Schema.String }>
                    >
                  >
                  readonly status: Schema.optionalKey<
                    Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>
                  >
                }>,
                Schema.Struct<{
                  readonly id: Schema.optionalKey<Schema.String>
                  readonly type: Schema.Literal<"shell_call">
                  readonly call_id: Schema.String
                  readonly action: Schema.Unknown
                  readonly status: Schema.optionalKey<
                    Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>
                  >
                }>,
                Schema.Struct<{
                  readonly id: Schema.String
                  readonly type: Schema.Literal<"web_search_call">
                  readonly action: Schema.optionalKey<Schema.Unknown>
                  readonly status: Schema.optionalKey<Schema.String>
                }>
              ]
            >
          >,
          never
        >
        readonly usage: Schema.optionalKey<
          Schema.NullOr<
            Schema.StructWithRest<
              Schema.Struct<{
                readonly input_tokens: Schema.Number
                readonly output_tokens: Schema.Number
                readonly total_tokens: Schema.Number
                readonly input_tokens_details: Schema.optionalKey<Schema.Unknown>
                readonly output_tokens_details: Schema.optionalKey<Schema.Unknown>
              }>,
              readonly [Schema.$Record<Schema.String, Schema.Unknown>]
            >
          >
        >
        readonly incomplete_details: Schema.optionalKey<
          Schema.NullOr<
            Schema.Struct<{
              readonly reason: Schema.optionalKey<Schema.Literals<readonly ["max_output_tokens", "content_filter"]>>
            }>
          >
        >
        readonly service_tier: Schema.optionalKey<Schema.String>
      }>
      readonly sequence_number: Schema.Number
    }>,
    Schema.Struct<{
      readonly type: Schema.Literal<"response.incomplete">
      readonly response: Schema.Struct<{
        readonly id: Schema.String
        readonly object: Schema.optionalKey<Schema.Literal<"response">>
        readonly model: Schema.String
        readonly created_at: Schema.Number
        readonly output: Schema.withDecodingDefault<
          Schema.$Array<
            Schema.Union<
              readonly [
                Schema.Struct<{
                  readonly id: Schema.String
                  readonly type: Schema.Literal<"apply_patch_call">
                  readonly call_id: Schema.String
                  readonly operation: Schema.Struct<{
                    readonly type: Schema.String
                    readonly path: Schema.String
                    readonly diff: Schema.optionalKey<Schema.String>
                  }>
                  readonly status: Schema.optionalKey<
                    Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>
                  >
                }>,
                Schema.Struct<{
                  readonly id: Schema.String
                  readonly type: Schema.Literal<"code_interpreter_call">
                  readonly code: Schema.optionalKey<Schema.String>
                  readonly container_id: Schema.String
                  readonly outputs: Schema.optionalKey<Schema.$Array<Schema.Unknown>>
                  readonly status: Schema.optionalKey<
                    Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>
                  >
                }>,
                Schema.Struct<{
                  readonly id: Schema.String
                  readonly type: Schema.Literal<"computer_call">
                  readonly status: Schema.optionalKey<
                    Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>
                  >
                }>,
                Schema.Struct<{
                  readonly id: Schema.String
                  readonly type: Schema.Literal<"file_search_call">
                  readonly status: Schema.optionalKey<Schema.String>
                  readonly queries: Schema.optionalKey<Schema.$Array<Schema.String>>
                  readonly results: Schema.optionalKey<Schema.NullOr<Schema.Unknown>>
                }>,
                Schema.Struct<{
                  readonly id: Schema.optionalKey<Schema.String>
                  readonly type: Schema.Literal<"function_call">
                  readonly call_id: Schema.String
                  readonly name: Schema.String
                  readonly arguments: Schema.String
                  readonly status: Schema.optionalKey<
                    Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>
                  >
                }>,
                Schema.Struct<{
                  readonly id: Schema.String
                  readonly type: Schema.Literal<"image_generation_call">
                  readonly result: Schema.optionalKey<Schema.String>
                  readonly status: Schema.optionalKey<
                    Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>
                  >
                }>,
                Schema.Struct<{
                  readonly id: Schema.optionalKey<Schema.String>
                  readonly type: Schema.Literal<"local_shell_call">
                  readonly call_id: Schema.String
                  readonly action: Schema.Unknown
                  readonly status: Schema.optionalKey<
                    Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>
                  >
                }>,
                Schema.Struct<{
                  readonly id: Schema.String
                  readonly type: Schema.Literal<"mcp_call">
                  readonly approval_request_id: Schema.optionalKey<Schema.NullOr<Schema.String>>
                  readonly name: Schema.String
                  readonly arguments: Schema.Unknown
                  readonly output: Schema.optionalKey<Schema.Unknown>
                  readonly error: Schema.optionalKey<Schema.Unknown>
                  readonly server_label: Schema.optionalKey<Schema.NullOr<Schema.String>>
                }>,
                Schema.Struct<{ readonly id: Schema.String; readonly type: Schema.Literal<"mcp_list_tools"> }>,
                Schema.Struct<{
                  readonly id: Schema.String
                  readonly type: Schema.Literal<"mcp_approval_request">
                  readonly approval_request_id: Schema.optionalKey<Schema.String>
                  readonly name: Schema.String
                  readonly arguments: Schema.Unknown
                }>,
                Schema.Struct<{
                  readonly id: Schema.String
                  readonly type: Schema.Literal<"message">
                  readonly role: Schema.Literal<"assistant">
                  readonly content: Schema.$Array<
                    Schema.Union<
                      readonly [
                        Schema.Struct<{ readonly type: Schema.Literal<"input_text">; readonly text: Schema.String }>,
                        Schema.Struct<{
                          readonly type: Schema.Literal<"output_text">
                          readonly text: Schema.String
                          readonly annotations: Schema.$Array<
                            Schema.Union<
                              readonly [
                                Schema.Struct<{
                                  readonly type: Schema.Literal<"file_citation">
                                  readonly file_id: Schema.String
                                  readonly index: Schema.Number
                                  readonly filename: Schema.String
                                }>,
                                Schema.Struct<{
                                  readonly type: Schema.Literal<"url_citation">
                                  readonly url: Schema.String
                                  readonly start_index: Schema.Number
                                  readonly end_index: Schema.Number
                                  readonly title: Schema.String
                                }>,
                                Schema.Struct<{
                                  readonly type: Schema.Literal<"container_file_citation">
                                  readonly container_id: Schema.String
                                  readonly file_id: Schema.String
                                  readonly start_index: Schema.Number
                                  readonly end_index: Schema.Number
                                  readonly filename: Schema.String
                                }>,
                                Schema.Struct<{
                                  readonly type: Schema.Literal<"file_path">
                                  readonly file_id: Schema.String
                                  readonly index: Schema.Number
                                }>
                              ]
                            >
                          >
                          readonly logprobs: Schema.optionalKey<Schema.$Array<Schema.Unknown>>
                        }>,
                        Schema.Struct<{ readonly type: Schema.Literal<"text">; readonly text: Schema.String }>,
                        Schema.Struct<{ readonly type: Schema.Literal<"summary_text">; readonly text: Schema.String }>,
                        Schema.Struct<{
                          readonly type: Schema.Literal<"reasoning_text">
                          readonly text: Schema.String
                        }>,
                        Schema.Struct<{ readonly type: Schema.Literal<"refusal">; readonly refusal: Schema.String }>,
                        Schema.Struct<{
                          readonly type: Schema.Literal<"input_image">
                          readonly image_url: Schema.optionalKey<Schema.NullOr<Schema.String>>
                          readonly file_id: Schema.optionalKey<Schema.NullOr<Schema.String>>
                          readonly detail: Schema.optionalKey<
                            Schema.NullOr<Schema.Literals<readonly ["low", "high", "auto"]>>
                          >
                        }>,
                        Schema.Struct<{
                          readonly type: Schema.Literal<"computer_screenshot">
                          readonly image_url: Schema.NullOr<Schema.String>
                          readonly file_id: Schema.NullOr<Schema.String>
                        }>,
                        Schema.Struct<{
                          readonly type: Schema.Literal<"input_file">
                          readonly file_id: Schema.optionalKey<Schema.NullOr<Schema.String>>
                          readonly filename: Schema.optionalKey<Schema.String>
                          readonly file_url: Schema.optionalKey<Schema.String>
                          readonly file_data: Schema.optionalKey<Schema.String>
                        }>
                      ]
                    >
                  >
                  readonly status: Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>
                }>,
                Schema.Struct<{
                  readonly type: Schema.Literal<"reasoning">
                  readonly id: Schema.String
                  readonly encrypted_content: Schema.optionalKey<Schema.NullOr<Schema.String>>
                  readonly summary: Schema.$Array<
                    Schema.Struct<{ readonly type: Schema.Literal<"summary_text">; readonly text: Schema.String }>
                  >
                  readonly content: Schema.optionalKey<
                    Schema.$Array<
                      Schema.Struct<{ readonly type: Schema.Literal<"reasoning_text">; readonly text: Schema.String }>
                    >
                  >
                  readonly status: Schema.optionalKey<
                    Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>
                  >
                }>,
                Schema.Struct<{
                  readonly id: Schema.optionalKey<Schema.String>
                  readonly type: Schema.Literal<"shell_call">
                  readonly call_id: Schema.String
                  readonly action: Schema.Unknown
                  readonly status: Schema.optionalKey<
                    Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>
                  >
                }>,
                Schema.Struct<{
                  readonly id: Schema.String
                  readonly type: Schema.Literal<"web_search_call">
                  readonly action: Schema.optionalKey<Schema.Unknown>
                  readonly status: Schema.optionalKey<Schema.String>
                }>
              ]
            >
          >,
          never
        >
        readonly usage: Schema.optionalKey<
          Schema.NullOr<
            Schema.StructWithRest<
              Schema.Struct<{
                readonly input_tokens: Schema.Number
                readonly output_tokens: Schema.Number
                readonly total_tokens: Schema.Number
                readonly input_tokens_details: Schema.optionalKey<Schema.Unknown>
                readonly output_tokens_details: Schema.optionalKey<Schema.Unknown>
              }>,
              readonly [Schema.$Record<Schema.String, Schema.Unknown>]
            >
          >
        >
        readonly incomplete_details: Schema.optionalKey<
          Schema.NullOr<
            Schema.Struct<{
              readonly reason: Schema.optionalKey<Schema.Literals<readonly ["max_output_tokens", "content_filter"]>>
            }>
          >
        >
        readonly service_tier: Schema.optionalKey<Schema.String>
      }>
      readonly sequence_number: Schema.Number
    }>,
    Schema.Struct<{
      readonly type: Schema.Literal<"response.failed">
      readonly response: Schema.Struct<{
        readonly id: Schema.String
        readonly object: Schema.optionalKey<Schema.Literal<"response">>
        readonly model: Schema.String
        readonly created_at: Schema.Number
        readonly output: Schema.withDecodingDefault<
          Schema.$Array<
            Schema.Union<
              readonly [
                Schema.Struct<{
                  readonly id: Schema.String
                  readonly type: Schema.Literal<"apply_patch_call">
                  readonly call_id: Schema.String
                  readonly operation: Schema.Struct<{
                    readonly type: Schema.String
                    readonly path: Schema.String
                    readonly diff: Schema.optionalKey<Schema.String>
                  }>
                  readonly status: Schema.optionalKey<
                    Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>
                  >
                }>,
                Schema.Struct<{
                  readonly id: Schema.String
                  readonly type: Schema.Literal<"code_interpreter_call">
                  readonly code: Schema.optionalKey<Schema.String>
                  readonly container_id: Schema.String
                  readonly outputs: Schema.optionalKey<Schema.$Array<Schema.Unknown>>
                  readonly status: Schema.optionalKey<
                    Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>
                  >
                }>,
                Schema.Struct<{
                  readonly id: Schema.String
                  readonly type: Schema.Literal<"computer_call">
                  readonly status: Schema.optionalKey<
                    Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>
                  >
                }>,
                Schema.Struct<{
                  readonly id: Schema.String
                  readonly type: Schema.Literal<"file_search_call">
                  readonly status: Schema.optionalKey<Schema.String>
                  readonly queries: Schema.optionalKey<Schema.$Array<Schema.String>>
                  readonly results: Schema.optionalKey<Schema.NullOr<Schema.Unknown>>
                }>,
                Schema.Struct<{
                  readonly id: Schema.optionalKey<Schema.String>
                  readonly type: Schema.Literal<"function_call">
                  readonly call_id: Schema.String
                  readonly name: Schema.String
                  readonly arguments: Schema.String
                  readonly status: Schema.optionalKey<
                    Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>
                  >
                }>,
                Schema.Struct<{
                  readonly id: Schema.String
                  readonly type: Schema.Literal<"image_generation_call">
                  readonly result: Schema.optionalKey<Schema.String>
                  readonly status: Schema.optionalKey<
                    Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>
                  >
                }>,
                Schema.Struct<{
                  readonly id: Schema.optionalKey<Schema.String>
                  readonly type: Schema.Literal<"local_shell_call">
                  readonly call_id: Schema.String
                  readonly action: Schema.Unknown
                  readonly status: Schema.optionalKey<
                    Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>
                  >
                }>,
                Schema.Struct<{
                  readonly id: Schema.String
                  readonly type: Schema.Literal<"mcp_call">
                  readonly approval_request_id: Schema.optionalKey<Schema.NullOr<Schema.String>>
                  readonly name: Schema.String
                  readonly arguments: Schema.Unknown
                  readonly output: Schema.optionalKey<Schema.Unknown>
                  readonly error: Schema.optionalKey<Schema.Unknown>
                  readonly server_label: Schema.optionalKey<Schema.NullOr<Schema.String>>
                }>,
                Schema.Struct<{ readonly id: Schema.String; readonly type: Schema.Literal<"mcp_list_tools"> }>,
                Schema.Struct<{
                  readonly id: Schema.String
                  readonly type: Schema.Literal<"mcp_approval_request">
                  readonly approval_request_id: Schema.optionalKey<Schema.String>
                  readonly name: Schema.String
                  readonly arguments: Schema.Unknown
                }>,
                Schema.Struct<{
                  readonly id: Schema.String
                  readonly type: Schema.Literal<"message">
                  readonly role: Schema.Literal<"assistant">
                  readonly content: Schema.$Array<
                    Schema.Union<
                      readonly [
                        Schema.Struct<{ readonly type: Schema.Literal<"input_text">; readonly text: Schema.String }>,
                        Schema.Struct<{
                          readonly type: Schema.Literal<"output_text">
                          readonly text: Schema.String
                          readonly annotations: Schema.$Array<
                            Schema.Union<
                              readonly [
                                Schema.Struct<{
                                  readonly type: Schema.Literal<"file_citation">
                                  readonly file_id: Schema.String
                                  readonly index: Schema.Number
                                  readonly filename: Schema.String
                                }>,
                                Schema.Struct<{
                                  readonly type: Schema.Literal<"url_citation">
                                  readonly url: Schema.String
                                  readonly start_index: Schema.Number
                                  readonly end_index: Schema.Number
                                  readonly title: Schema.String
                                }>,
                                Schema.Struct<{
                                  readonly type: Schema.Literal<"container_file_citation">
                                  readonly container_id: Schema.String
                                  readonly file_id: Schema.String
                                  readonly start_index: Schema.Number
                                  readonly end_index: Schema.Number
                                  readonly filename: Schema.String
                                }>,
                                Schema.Struct<{
                                  readonly type: Schema.Literal<"file_path">
                                  readonly file_id: Schema.String
                                  readonly index: Schema.Number
                                }>
                              ]
                            >
                          >
                          readonly logprobs: Schema.optionalKey<Schema.$Array<Schema.Unknown>>
                        }>,
                        Schema.Struct<{ readonly type: Schema.Literal<"text">; readonly text: Schema.String }>,
                        Schema.Struct<{ readonly type: Schema.Literal<"summary_text">; readonly text: Schema.String }>,
                        Schema.Struct<{
                          readonly type: Schema.Literal<"reasoning_text">
                          readonly text: Schema.String
                        }>,
                        Schema.Struct<{ readonly type: Schema.Literal<"refusal">; readonly refusal: Schema.String }>,
                        Schema.Struct<{
                          readonly type: Schema.Literal<"input_image">
                          readonly image_url: Schema.optionalKey<Schema.NullOr<Schema.String>>
                          readonly file_id: Schema.optionalKey<Schema.NullOr<Schema.String>>
                          readonly detail: Schema.optionalKey<
                            Schema.NullOr<Schema.Literals<readonly ["low", "high", "auto"]>>
                          >
                        }>,
                        Schema.Struct<{
                          readonly type: Schema.Literal<"computer_screenshot">
                          readonly image_url: Schema.NullOr<Schema.String>
                          readonly file_id: Schema.NullOr<Schema.String>
                        }>,
                        Schema.Struct<{
                          readonly type: Schema.Literal<"input_file">
                          readonly file_id: Schema.optionalKey<Schema.NullOr<Schema.String>>
                          readonly filename: Schema.optionalKey<Schema.String>
                          readonly file_url: Schema.optionalKey<Schema.String>
                          readonly file_data: Schema.optionalKey<Schema.String>
                        }>
                      ]
                    >
                  >
                  readonly status: Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>
                }>,
                Schema.Struct<{
                  readonly type: Schema.Literal<"reasoning">
                  readonly id: Schema.String
                  readonly encrypted_content: Schema.optionalKey<Schema.NullOr<Schema.String>>
                  readonly summary: Schema.$Array<
                    Schema.Struct<{ readonly type: Schema.Literal<"summary_text">; readonly text: Schema.String }>
                  >
                  readonly content: Schema.optionalKey<
                    Schema.$Array<
                      Schema.Struct<{ readonly type: Schema.Literal<"reasoning_text">; readonly text: Schema.String }>
                    >
                  >
                  readonly status: Schema.optionalKey<
                    Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>
                  >
                }>,
                Schema.Struct<{
                  readonly id: Schema.optionalKey<Schema.String>
                  readonly type: Schema.Literal<"shell_call">
                  readonly call_id: Schema.String
                  readonly action: Schema.Unknown
                  readonly status: Schema.optionalKey<
                    Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>
                  >
                }>,
                Schema.Struct<{
                  readonly id: Schema.String
                  readonly type: Schema.Literal<"web_search_call">
                  readonly action: Schema.optionalKey<Schema.Unknown>
                  readonly status: Schema.optionalKey<Schema.String>
                }>
              ]
            >
          >,
          never
        >
        readonly usage: Schema.optionalKey<
          Schema.NullOr<
            Schema.StructWithRest<
              Schema.Struct<{
                readonly input_tokens: Schema.Number
                readonly output_tokens: Schema.Number
                readonly total_tokens: Schema.Number
                readonly input_tokens_details: Schema.optionalKey<Schema.Unknown>
                readonly output_tokens_details: Schema.optionalKey<Schema.Unknown>
              }>,
              readonly [Schema.$Record<Schema.String, Schema.Unknown>]
            >
          >
        >
        readonly incomplete_details: Schema.optionalKey<
          Schema.NullOr<
            Schema.Struct<{
              readonly reason: Schema.optionalKey<Schema.Literals<readonly ["max_output_tokens", "content_filter"]>>
            }>
          >
        >
        readonly service_tier: Schema.optionalKey<Schema.String>
      }>
      readonly sequence_number: Schema.Number
    }>,
    Schema.Struct<{
      readonly type: Schema.Literal<"response.output_item.added">
      readonly output_index: Schema.Number
      readonly sequence_number: Schema.Number
      readonly item: Schema.Union<
        readonly [
          Schema.Struct<{
            readonly id: Schema.String
            readonly type: Schema.Literal<"apply_patch_call">
            readonly call_id: Schema.String
            readonly operation: Schema.Struct<{
              readonly type: Schema.String
              readonly path: Schema.String
              readonly diff: Schema.optionalKey<Schema.String>
            }>
            readonly status: Schema.optionalKey<Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>>
          }>,
          Schema.Struct<{
            readonly id: Schema.String
            readonly type: Schema.Literal<"code_interpreter_call">
            readonly code: Schema.optionalKey<Schema.String>
            readonly container_id: Schema.String
            readonly outputs: Schema.optionalKey<Schema.$Array<Schema.Unknown>>
            readonly status: Schema.optionalKey<Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>>
          }>,
          Schema.Struct<{
            readonly id: Schema.String
            readonly type: Schema.Literal<"computer_call">
            readonly status: Schema.optionalKey<Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>>
          }>,
          Schema.Struct<{
            readonly id: Schema.String
            readonly type: Schema.Literal<"file_search_call">
            readonly status: Schema.optionalKey<Schema.String>
            readonly queries: Schema.optionalKey<Schema.$Array<Schema.String>>
            readonly results: Schema.optionalKey<Schema.NullOr<Schema.Unknown>>
          }>,
          Schema.Struct<{
            readonly id: Schema.optionalKey<Schema.String>
            readonly type: Schema.Literal<"function_call">
            readonly call_id: Schema.String
            readonly name: Schema.String
            readonly arguments: Schema.String
            readonly status: Schema.optionalKey<Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>>
          }>,
          Schema.Struct<{
            readonly id: Schema.String
            readonly type: Schema.Literal<"image_generation_call">
            readonly result: Schema.optionalKey<Schema.String>
            readonly status: Schema.optionalKey<Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>>
          }>,
          Schema.Struct<{
            readonly id: Schema.optionalKey<Schema.String>
            readonly type: Schema.Literal<"local_shell_call">
            readonly call_id: Schema.String
            readonly action: Schema.Unknown
            readonly status: Schema.optionalKey<Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>>
          }>,
          Schema.Struct<{
            readonly id: Schema.String
            readonly type: Schema.Literal<"mcp_call">
            readonly approval_request_id: Schema.optionalKey<Schema.NullOr<Schema.String>>
            readonly name: Schema.String
            readonly arguments: Schema.Unknown
            readonly output: Schema.optionalKey<Schema.Unknown>
            readonly error: Schema.optionalKey<Schema.Unknown>
            readonly server_label: Schema.optionalKey<Schema.NullOr<Schema.String>>
          }>,
          Schema.Struct<{ readonly id: Schema.String; readonly type: Schema.Literal<"mcp_list_tools"> }>,
          Schema.Struct<{
            readonly id: Schema.String
            readonly type: Schema.Literal<"mcp_approval_request">
            readonly approval_request_id: Schema.optionalKey<Schema.String>
            readonly name: Schema.String
            readonly arguments: Schema.Unknown
          }>,
          Schema.Struct<{
            readonly id: Schema.String
            readonly type: Schema.Literal<"message">
            readonly role: Schema.Literal<"assistant">
            readonly content: Schema.$Array<
              Schema.Union<
                readonly [
                  Schema.Struct<{ readonly type: Schema.Literal<"input_text">; readonly text: Schema.String }>,
                  Schema.Struct<{
                    readonly type: Schema.Literal<"output_text">
                    readonly text: Schema.String
                    readonly annotations: Schema.$Array<
                      Schema.Union<
                        readonly [
                          Schema.Struct<{
                            readonly type: Schema.Literal<"file_citation">
                            readonly file_id: Schema.String
                            readonly index: Schema.Number
                            readonly filename: Schema.String
                          }>,
                          Schema.Struct<{
                            readonly type: Schema.Literal<"url_citation">
                            readonly url: Schema.String
                            readonly start_index: Schema.Number
                            readonly end_index: Schema.Number
                            readonly title: Schema.String
                          }>,
                          Schema.Struct<{
                            readonly type: Schema.Literal<"container_file_citation">
                            readonly container_id: Schema.String
                            readonly file_id: Schema.String
                            readonly start_index: Schema.Number
                            readonly end_index: Schema.Number
                            readonly filename: Schema.String
                          }>,
                          Schema.Struct<{
                            readonly type: Schema.Literal<"file_path">
                            readonly file_id: Schema.String
                            readonly index: Schema.Number
                          }>
                        ]
                      >
                    >
                    readonly logprobs: Schema.optionalKey<Schema.$Array<Schema.Unknown>>
                  }>,
                  Schema.Struct<{ readonly type: Schema.Literal<"text">; readonly text: Schema.String }>,
                  Schema.Struct<{ readonly type: Schema.Literal<"summary_text">; readonly text: Schema.String }>,
                  Schema.Struct<{ readonly type: Schema.Literal<"reasoning_text">; readonly text: Schema.String }>,
                  Schema.Struct<{ readonly type: Schema.Literal<"refusal">; readonly refusal: Schema.String }>,
                  Schema.Struct<{
                    readonly type: Schema.Literal<"input_image">
                    readonly image_url: Schema.optionalKey<Schema.NullOr<Schema.String>>
                    readonly file_id: Schema.optionalKey<Schema.NullOr<Schema.String>>
                    readonly detail: Schema.optionalKey<
                      Schema.NullOr<Schema.Literals<readonly ["low", "high", "auto"]>>
                    >
                  }>,
                  Schema.Struct<{
                    readonly type: Schema.Literal<"computer_screenshot">
                    readonly image_url: Schema.NullOr<Schema.String>
                    readonly file_id: Schema.NullOr<Schema.String>
                  }>,
                  Schema.Struct<{
                    readonly type: Schema.Literal<"input_file">
                    readonly file_id: Schema.optionalKey<Schema.NullOr<Schema.String>>
                    readonly filename: Schema.optionalKey<Schema.String>
                    readonly file_url: Schema.optionalKey<Schema.String>
                    readonly file_data: Schema.optionalKey<Schema.String>
                  }>
                ]
              >
            >
            readonly status: Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>
          }>,
          Schema.Struct<{
            readonly type: Schema.Literal<"reasoning">
            readonly id: Schema.String
            readonly encrypted_content: Schema.optionalKey<Schema.NullOr<Schema.String>>
            readonly summary: Schema.$Array<
              Schema.Struct<{ readonly type: Schema.Literal<"summary_text">; readonly text: Schema.String }>
            >
            readonly content: Schema.optionalKey<
              Schema.$Array<
                Schema.Struct<{ readonly type: Schema.Literal<"reasoning_text">; readonly text: Schema.String }>
              >
            >
            readonly status: Schema.optionalKey<Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>>
          }>,
          Schema.Struct<{
            readonly id: Schema.optionalKey<Schema.String>
            readonly type: Schema.Literal<"shell_call">
            readonly call_id: Schema.String
            readonly action: Schema.Unknown
            readonly status: Schema.optionalKey<Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>>
          }>,
          Schema.Struct<{
            readonly id: Schema.String
            readonly type: Schema.Literal<"web_search_call">
            readonly action: Schema.optionalKey<Schema.Unknown>
            readonly status: Schema.optionalKey<Schema.String>
          }>
        ]
      >
    }>,
    Schema.Struct<{
      readonly type: Schema.Literal<"response.output_item.done">
      readonly output_index: Schema.Number
      readonly sequence_number: Schema.Number
      readonly item: Schema.Union<
        readonly [
          Schema.Struct<{
            readonly id: Schema.String
            readonly type: Schema.Literal<"apply_patch_call">
            readonly call_id: Schema.String
            readonly operation: Schema.Struct<{
              readonly type: Schema.String
              readonly path: Schema.String
              readonly diff: Schema.optionalKey<Schema.String>
            }>
            readonly status: Schema.optionalKey<Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>>
          }>,
          Schema.Struct<{
            readonly id: Schema.String
            readonly type: Schema.Literal<"code_interpreter_call">
            readonly code: Schema.optionalKey<Schema.String>
            readonly container_id: Schema.String
            readonly outputs: Schema.optionalKey<Schema.$Array<Schema.Unknown>>
            readonly status: Schema.optionalKey<Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>>
          }>,
          Schema.Struct<{
            readonly id: Schema.String
            readonly type: Schema.Literal<"computer_call">
            readonly status: Schema.optionalKey<Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>>
          }>,
          Schema.Struct<{
            readonly id: Schema.String
            readonly type: Schema.Literal<"file_search_call">
            readonly status: Schema.optionalKey<Schema.String>
            readonly queries: Schema.optionalKey<Schema.$Array<Schema.String>>
            readonly results: Schema.optionalKey<Schema.NullOr<Schema.Unknown>>
          }>,
          Schema.Struct<{
            readonly id: Schema.optionalKey<Schema.String>
            readonly type: Schema.Literal<"function_call">
            readonly call_id: Schema.String
            readonly name: Schema.String
            readonly arguments: Schema.String
            readonly status: Schema.optionalKey<Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>>
          }>,
          Schema.Struct<{
            readonly id: Schema.String
            readonly type: Schema.Literal<"image_generation_call">
            readonly result: Schema.optionalKey<Schema.String>
            readonly status: Schema.optionalKey<Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>>
          }>,
          Schema.Struct<{
            readonly id: Schema.optionalKey<Schema.String>
            readonly type: Schema.Literal<"local_shell_call">
            readonly call_id: Schema.String
            readonly action: Schema.Unknown
            readonly status: Schema.optionalKey<Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>>
          }>,
          Schema.Struct<{
            readonly id: Schema.String
            readonly type: Schema.Literal<"mcp_call">
            readonly approval_request_id: Schema.optionalKey<Schema.NullOr<Schema.String>>
            readonly name: Schema.String
            readonly arguments: Schema.Unknown
            readonly output: Schema.optionalKey<Schema.Unknown>
            readonly error: Schema.optionalKey<Schema.Unknown>
            readonly server_label: Schema.optionalKey<Schema.NullOr<Schema.String>>
          }>,
          Schema.Struct<{ readonly id: Schema.String; readonly type: Schema.Literal<"mcp_list_tools"> }>,
          Schema.Struct<{
            readonly id: Schema.String
            readonly type: Schema.Literal<"mcp_approval_request">
            readonly approval_request_id: Schema.optionalKey<Schema.String>
            readonly name: Schema.String
            readonly arguments: Schema.Unknown
          }>,
          Schema.Struct<{
            readonly id: Schema.String
            readonly type: Schema.Literal<"message">
            readonly role: Schema.Literal<"assistant">
            readonly content: Schema.$Array<
              Schema.Union<
                readonly [
                  Schema.Struct<{ readonly type: Schema.Literal<"input_text">; readonly text: Schema.String }>,
                  Schema.Struct<{
                    readonly type: Schema.Literal<"output_text">
                    readonly text: Schema.String
                    readonly annotations: Schema.$Array<
                      Schema.Union<
                        readonly [
                          Schema.Struct<{
                            readonly type: Schema.Literal<"file_citation">
                            readonly file_id: Schema.String
                            readonly index: Schema.Number
                            readonly filename: Schema.String
                          }>,
                          Schema.Struct<{
                            readonly type: Schema.Literal<"url_citation">
                            readonly url: Schema.String
                            readonly start_index: Schema.Number
                            readonly end_index: Schema.Number
                            readonly title: Schema.String
                          }>,
                          Schema.Struct<{
                            readonly type: Schema.Literal<"container_file_citation">
                            readonly container_id: Schema.String
                            readonly file_id: Schema.String
                            readonly start_index: Schema.Number
                            readonly end_index: Schema.Number
                            readonly filename: Schema.String
                          }>,
                          Schema.Struct<{
                            readonly type: Schema.Literal<"file_path">
                            readonly file_id: Schema.String
                            readonly index: Schema.Number
                          }>
                        ]
                      >
                    >
                    readonly logprobs: Schema.optionalKey<Schema.$Array<Schema.Unknown>>
                  }>,
                  Schema.Struct<{ readonly type: Schema.Literal<"text">; readonly text: Schema.String }>,
                  Schema.Struct<{ readonly type: Schema.Literal<"summary_text">; readonly text: Schema.String }>,
                  Schema.Struct<{ readonly type: Schema.Literal<"reasoning_text">; readonly text: Schema.String }>,
                  Schema.Struct<{ readonly type: Schema.Literal<"refusal">; readonly refusal: Schema.String }>,
                  Schema.Struct<{
                    readonly type: Schema.Literal<"input_image">
                    readonly image_url: Schema.optionalKey<Schema.NullOr<Schema.String>>
                    readonly file_id: Schema.optionalKey<Schema.NullOr<Schema.String>>
                    readonly detail: Schema.optionalKey<
                      Schema.NullOr<Schema.Literals<readonly ["low", "high", "auto"]>>
                    >
                  }>,
                  Schema.Struct<{
                    readonly type: Schema.Literal<"computer_screenshot">
                    readonly image_url: Schema.NullOr<Schema.String>
                    readonly file_id: Schema.NullOr<Schema.String>
                  }>,
                  Schema.Struct<{
                    readonly type: Schema.Literal<"input_file">
                    readonly file_id: Schema.optionalKey<Schema.NullOr<Schema.String>>
                    readonly filename: Schema.optionalKey<Schema.String>
                    readonly file_url: Schema.optionalKey<Schema.String>
                    readonly file_data: Schema.optionalKey<Schema.String>
                  }>
                ]
              >
            >
            readonly status: Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>
          }>,
          Schema.Struct<{
            readonly type: Schema.Literal<"reasoning">
            readonly id: Schema.String
            readonly encrypted_content: Schema.optionalKey<Schema.NullOr<Schema.String>>
            readonly summary: Schema.$Array<
              Schema.Struct<{ readonly type: Schema.Literal<"summary_text">; readonly text: Schema.String }>
            >
            readonly content: Schema.optionalKey<
              Schema.$Array<
                Schema.Struct<{ readonly type: Schema.Literal<"reasoning_text">; readonly text: Schema.String }>
              >
            >
            readonly status: Schema.optionalKey<Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>>
          }>,
          Schema.Struct<{
            readonly id: Schema.optionalKey<Schema.String>
            readonly type: Schema.Literal<"shell_call">
            readonly call_id: Schema.String
            readonly action: Schema.Unknown
            readonly status: Schema.optionalKey<Schema.Literals<readonly ["in_progress", "completed", "incomplete"]>>
          }>,
          Schema.Struct<{
            readonly id: Schema.String
            readonly type: Schema.Literal<"web_search_call">
            readonly action: Schema.optionalKey<Schema.Unknown>
            readonly status: Schema.optionalKey<Schema.String>
          }>
        ]
      >
    }>,
    Schema.Struct<{
      readonly type: Schema.Literal<"response.output_text.delta">
      readonly item_id: Schema.String
      readonly output_index: Schema.Number
      readonly content_index: Schema.Number
      readonly delta: Schema.String
      readonly sequence_number: Schema.Number
      readonly logprobs: Schema.optionalKey<Schema.$Array<Schema.Unknown>>
    }>,
    Schema.Struct<{
      readonly type: Schema.Literal<"response.output_text.annotation.added">
      readonly item_id: Schema.String
      readonly output_index: Schema.Number
      readonly content_index: Schema.Number
      readonly annotation_index: Schema.Number
      readonly sequence_number: Schema.Number
      readonly annotation: Schema.Union<
        readonly [
          Schema.Struct<{
            readonly type: Schema.Literal<"file_citation">
            readonly file_id: Schema.String
            readonly index: Schema.Number
            readonly filename: Schema.String
          }>,
          Schema.Struct<{
            readonly type: Schema.Literal<"url_citation">
            readonly url: Schema.String
            readonly start_index: Schema.Number
            readonly end_index: Schema.Number
            readonly title: Schema.String
          }>,
          Schema.Struct<{
            readonly type: Schema.Literal<"container_file_citation">
            readonly container_id: Schema.String
            readonly file_id: Schema.String
            readonly start_index: Schema.Number
            readonly end_index: Schema.Number
            readonly filename: Schema.String
          }>,
          Schema.Struct<{
            readonly type: Schema.Literal<"file_path">
            readonly file_id: Schema.String
            readonly index: Schema.Number
          }>
        ]
      >
    }>,
    Schema.Struct<{
      readonly type: Schema.Literal<"response.reasoning_summary_part.added">
      readonly item_id: Schema.String
      readonly output_index: Schema.Number
      readonly summary_index: Schema.Number
      readonly sequence_number: Schema.Number
      readonly part: Schema.Struct<{ readonly type: Schema.Literal<"summary_text">; readonly text: Schema.String }>
    }>,
    Schema.Struct<{
      readonly type: Schema.Literal<"response.reasoning_summary_part.done">
      readonly item_id: Schema.String
      readonly output_index: Schema.Number
      readonly summary_index: Schema.Number
      readonly sequence_number: Schema.Number
      readonly part: Schema.Struct<{ readonly type: Schema.Literal<"summary_text">; readonly text: Schema.String }>
    }>,
    Schema.Struct<{
      readonly type: Schema.Literal<"response.reasoning_summary_text.delta">
      readonly item_id: Schema.String
      readonly output_index: Schema.Number
      readonly summary_index: Schema.Number
      readonly delta: Schema.String
      readonly sequence_number: Schema.Number
    }>,
    Schema.Struct<{
      readonly type: Schema.Literal<"response.function_call_arguments.delta">
      readonly item_id: Schema.String
      readonly output_index: Schema.Number
      readonly sequence_number: Schema.Number
      readonly delta: Schema.String
    }>,
    Schema.Struct<{
      readonly type: Schema.Literal<"response.function_call_arguments.done">
      readonly item_id: Schema.String
      readonly output_index: Schema.Number
      readonly sequence_number: Schema.Number
      readonly arguments: Schema.String
    }>,
    Schema.Struct<{
      readonly type: Schema.Literal<"response.code_interpreter_call_code.delta">
      readonly item_id: Schema.String
      readonly output_index: Schema.Number
      readonly sequence_number: Schema.Number
      readonly delta: Schema.String
    }>,
    Schema.Struct<{
      readonly type: Schema.Literal<"response.code_interpreter_call_code.done">
      readonly item_id: Schema.String
      readonly output_index: Schema.Number
      readonly sequence_number: Schema.Number
      readonly code: Schema.String
    }>,
    Schema.Struct<{
      readonly type: Schema.Literal<"response.apply_patch_call_operation_diff.delta">
      readonly item_id: Schema.String
      readonly output_index: Schema.Number
      readonly sequence_number: Schema.Number
      readonly delta: Schema.String
    }>,
    Schema.Struct<{
      readonly type: Schema.Literal<"response.apply_patch_call_operation_diff.done">
      readonly item_id: Schema.String
      readonly output_index: Schema.Number
      readonly sequence_number: Schema.Number
      readonly delta: Schema.optionalKey<Schema.String>
    }>,
    Schema.Struct<{
      readonly type: Schema.Literal<"response.image_generation_call.partial_image">
      readonly item_id: Schema.String
      readonly output_index: Schema.Number
      readonly sequence_number: Schema.Number
      readonly partial_image_b64: Schema.String
    }>,
    Schema.Struct<{
      readonly type: Schema.Literal<"error">
      readonly code: Schema.NullOr<Schema.String>
      readonly message: Schema.String
      readonly param: Schema.NullOr<Schema.String>
      readonly sequence_number: Schema.Number
      readonly status: Schema.optionalKey<Schema.Number>
    }>,
    Schema.declare<UnknownResponseStreamEvent, UnknownResponseStreamEvent>
  ]
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiSchema.ts#L1106)

Since v4.0.0

## ResponseUsage

Schema for token accounting reported on OpenAI Responses API response objects.

**Details**

The required counters are `input_tokens`, `output_tokens`, and
`total_tokens`. Provider-specific token detail objects are preserved through
`input_tokens_details`, `output_tokens_details`, and additional fields.

**Signature**

```ts
declare const ResponseUsage: Schema.StructWithRest<
  Schema.Struct<{
    readonly input_tokens: Schema.Number
    readonly output_tokens: Schema.Number
    readonly total_tokens: Schema.Number
    readonly input_tokens_details: Schema.optionalKey<Schema.Unknown>
    readonly output_tokens_details: Schema.optionalKey<Schema.Unknown>
  }>,
  readonly [Schema.$Record<Schema.String, Schema.Unknown>]
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiSchema.ts#L717)

Since v4.0.0

## SummaryTextContent

Schema for a text block containing a model-provided reasoning summary.

**Details**

The decoded shape is `type: "summary_text"` plus `text` containing the
reasoning summary text.

**See**

- `ReasoningItem` for reasoning output items that contain summary text blocks

**Signature**

```ts
declare const SummaryTextContent: Schema.Struct<{
  readonly type: Schema.Literal<"summary_text">
  readonly text: Schema.String
}>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiSchema.ts#L139)

Since v4.0.0

## TextResponseFormatConfiguration

Schema for text output format configuration, including plain text, JSON object, and JSON Schema responses.

**When to use**

Use when validating or encoding the `text.format` setting for a Responses
request, especially when choosing structured JSON Schema output.

**Details**

Accepted variants are `text`, `json_schema`, and `json_object`.

**Gotchas**

`json_object` is the older JSON mode. Prefer `json_schema` for models that
support it.

**See**

- `CreateResponse` for the request schema that consumes text format configuration

**Signature**

```ts
declare const TextResponseFormatConfiguration: Schema.Union<
  readonly [
    Schema.Struct<{ readonly type: Schema.Literal<"text"> }>,
    Schema.Struct<{
      readonly type: Schema.Literal<"json_schema">
      readonly description: Schema.optionalKey<Schema.String>
      readonly name: Schema.String
      readonly schema: Schema.$Record<Schema.String, Schema.Unknown>
      readonly strict: Schema.optionalKey<Schema.NullOr<Schema.Boolean>>
    }>,
    Schema.Struct<{ readonly type: Schema.Literal<"json_object"> }>
  ]
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiSchema.ts#L610)

Since v4.0.0

## Tool

Schema for tool definitions that can be supplied to an OpenAI Responses request.

**When to use**

Use when validating or encoding the `tools` array for a Responses request,
including provider-defined tool records with provider-specific fields.

**Details**

Accepted variants are function tools, custom tools, and provider-defined
OpenAI tools. Provider-defined `type` literals include `apply_patch`,
`code_interpreter`, `file_search`, `image_generation`, `local_shell`, `mcp`,
`shell`, `web_search`, and `web_search_preview`.

**Gotchas**

Provider-defined tools use `Schema.StructWithRest`, so this schema checks the
provider tool `type` and permits additional provider fields rather than fully
validating every provider-specific tool payload.

**See**

- `ToolChoice` for selecting whether and which tools the model may call
- `CreateResponse` for the request schema that consumes tools

**Signature**

```ts
declare const Tool: Schema.Union<
  readonly [
    Schema.Struct<{
      readonly type: Schema.Literal<"function">
      readonly name: Schema.String
      readonly description: Schema.optionalKey<Schema.NullOr<Schema.String>>
      readonly parameters: Schema.optionalKey<Schema.NullOr<Schema.$Record<Schema.String, Schema.Unknown>>>
      readonly strict: Schema.optionalKey<Schema.NullOr<Schema.Boolean>>
    }>,
    Schema.Struct<{
      readonly type: Schema.Literal<"custom">
      readonly name: Schema.String
      readonly description: Schema.optionalKey<Schema.String>
      readonly format: Schema.optionalKey<Schema.Unknown>
    }>,
    Schema.StructWithRest<
      Schema.Struct<{
        readonly type: Schema.Literals<
          readonly [
            "apply_patch",
            "code_interpreter",
            "file_search",
            "image_generation",
            "local_shell",
            "mcp",
            "shell",
            "web_search",
            "web_search_preview"
          ]
        >
      }>,
      readonly [Schema.$Record<Schema.String, Schema.Unknown>]
    >
  ]
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiSchema.ts#L509)

Since v4.0.0

## ToolChoice

Schema for selecting whether and which tools the model may call in a Responses request.

**When to use**

Use when validating or encoding the `tool_choice` field that constrains model
tool use separately from the tool definitions themselves.

**Details**

Accepted forms are `"none"`, `"auto"`, `"required"`, an allowed-tools set,
a named function or custom tool, or a provider-defined tool choice.

**See**

- `Tool` for tool definitions referenced by tool choices
- `CreateResponse` for the request schema that consumes `tool_choice`

**Signature**

```ts
declare const ToolChoice: Schema.Union<
  readonly [
    Schema.Literals<readonly ["none", "auto", "required"]>,
    Schema.Struct<{
      readonly type: Schema.Literal<"allowed_tools">
      readonly mode: Schema.Literals<readonly ["auto", "required"]>
      readonly tools: Schema.$Array<Schema.$Record<Schema.String, Schema.Unknown>>
    }>,
    Schema.Struct<{ readonly type: Schema.Literal<"function">; readonly name: Schema.String }>,
    Schema.Struct<{ readonly type: Schema.Literal<"custom">; readonly name: Schema.String }>,
    Schema.StructWithRest<
      Schema.Struct<{
        readonly type: Schema.Literals<
          readonly [
            "apply_patch",
            "code_interpreter",
            "file_search",
            "image_generation",
            "local_shell",
            "mcp",
            "shell",
            "web_search",
            "web_search_preview"
          ]
        >
      }>,
      readonly [Schema.$Record<Schema.String, Schema.Unknown>]
    >
  ]
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiSchema.ts#L542)

Since v4.0.0
