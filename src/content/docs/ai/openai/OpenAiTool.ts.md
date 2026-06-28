---
title: OpenAiTool.ts
nav_order: 10
parent: "@effect/ai-openai"
---

## OpenAiTool.ts overview

The `OpenAiTool` module defines OpenAI provider tools for Effect AI language
model requests. It exposes typed descriptors for tools such as Apply Patch,
Code Interpreter, File Search, Image Generation, MCP, Web Search, and
shell-like local tools, including their provider names, configuration
arguments, call parameters, success schemas, and handler requirements.

Since v4.0.0

---

## Exports Grouped by Category

- [models](#models)
  - [OpenAiTool (type alias)](#openaitool-type-alias)
- [tools](#tools)
  - [ApplyPatch](#applypatch)
  - [CodeInterpreter](#codeinterpreter)
  - [FileSearch](#filesearch)
  - [ImageGeneration](#imagegeneration)
  - [LocalShell](#localshell)
  - [Mcp](#mcp)
  - [Shell](#shell)
  - [WebSearch](#websearch)
  - [WebSearchPreview](#websearchpreview)

---

# models

## OpenAiTool (type alias)

Union of all OpenAI provider-defined tools.

**Signature**

```ts
type OpenAiTool =
  | ReturnType<typeof ApplyPatch>
  | ReturnType<typeof CodeInterpreter>
  | ReturnType<typeof FileSearch>
  | ReturnType<typeof Shell>
  | ReturnType<typeof ImageGeneration>
  | ReturnType<typeof LocalShell>
  | ReturnType<typeof Mcp>
  | ReturnType<typeof WebSearch>
  | ReturnType<typeof WebSearchPreview>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiTool.ts#L20)

Since v4.0.0

# tools

## ApplyPatch

Defines the OpenAI Apply Patch tool that allows the model to apply diffs by creating,
deleting, or updating files. This local tool runs in your environment and
requires a handler to execute file operations.

**When to use**

Use when you want an OpenAI model to request structured file edits as create,
delete, or update operations that your application executes through a local
handler.

**Signature**

```ts
declare const ApplyPatch: <Mode extends Tool.FailureMode | undefined = undefined>(args: {
  readonly failureMode?: Mode | undefined
}) => Tool.ProviderDefined<
  "openai.apply_patch",
  "OpenAiApplyPatch",
  {
    readonly args: Schema.Void
    readonly parameters: Schema.Struct<{
      readonly call_id: Schema.String
      readonly operation: Schema.Union<
        readonly [
          Schema.Struct<{
            readonly type: Schema.Literal<"create_file">
            readonly path: Schema.String
            readonly diff: Schema.String
          }>,
          Schema.Struct<{ readonly type: Schema.Literal<"delete_file">; readonly path: Schema.String }>,
          Schema.Struct<{
            readonly type: Schema.Literal<"update_file">
            readonly path: Schema.String
            readonly diff: Schema.String
          }>
        ]
      >
    }>
    readonly success: Schema.Struct<{
      readonly status: Schema.Literals<readonly ["completed", "failed"]>
      readonly output: Schema.optionalKey<Schema.Union<readonly [Schema.String, Schema.Null]>>
    }>
    readonly failure: Schema.Never
    readonly failureMode: Mode extends undefined ? "error" : Mode
  },
  true
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiTool.ts#L45)

Since v4.0.0

## CodeInterpreter

Defines the OpenAI Code Interpreter tool that allows the model to execute Python code in
a sandboxed environment.

**When to use**

Use to enable OpenAI-hosted Python execution for a model response.

**Details**

The tool is configured with a `container` argument. Successful tool calls
expose `outputs`, which may contain logs or generated images, or `null` when
no outputs are available.

**Signature**

```ts
declare const CodeInterpreter: <Mode extends Tool.FailureMode | undefined = undefined>(args: {
  readonly container:
    | string
    | {
        readonly type: "auto"
        readonly file_ids?: ReadonlyArray<string> | undefined
        readonly memory_limit?: "1g" | "4g" | "16g" | "64g" | null | undefined
        readonly network_policy?:
          | Schema.Struct.ReadonlySide<{ readonly type: Schema.Literal<"disabled"> }, "Encoded">
          | {
              readonly type: "allowlist"
              readonly allowed_domains: ReadonlyArray<string>
              readonly domain_secrets?:
                | ReadonlyArray<
                    Schema.Struct.ReadonlySide<
                      { readonly domain: Schema.String; readonly name: Schema.String; readonly value: Schema.String },
                      "Encoded"
                    >
                  >
                | undefined
            }
          | undefined
      }
}) => Tool.ProviderDefined<
  "openai.code_interpreter",
  "OpenAiCodeInterpreter",
  {
    readonly args: Schema.Struct<{
      readonly container: Schema.Union<
        readonly [
          Schema.String,
          Schema.Struct<{
            readonly type: Schema.Literal<"auto">
            readonly file_ids: Schema.optionalKey<Schema.$Array<Schema.String>>
            readonly memory_limit: Schema.optionalKey<
              Schema.Union<readonly [Schema.Literals<readonly ["1g", "4g", "16g", "64g"]>, Schema.Null]>
            >
            readonly network_policy: Schema.optionalKey<
              Schema.Union<
                readonly [
                  Schema.Struct<{ readonly type: Schema.Literal<"disabled"> }>,
                  Schema.Struct<{
                    readonly type: Schema.Literal<"allowlist">
                    readonly allowed_domains: Schema.$Array<Schema.String>
                    readonly domain_secrets: Schema.optionalKey<
                      Schema.$Array<
                        Schema.Struct<{
                          readonly domain: Schema.String
                          readonly name: Schema.String
                          readonly value: Schema.String
                        }>
                      >
                    >
                  }>
                ]
              >
            >
          }>
        ]
      >
    }>
    readonly parameters: Schema.Struct<{
      readonly code: Schema.Union<readonly [Schema.String, Schema.Null]>
      readonly container_id: Schema.String
    }>
    readonly success: Schema.Struct<{
      readonly outputs: Schema.Union<
        readonly [
          Schema.$Array<
            Schema.Union<
              readonly [
                Schema.Struct<{ readonly type: Schema.Literal<"logs">; readonly logs: Schema.String }>,
                Schema.Struct<{ readonly type: Schema.Literal<"image">; readonly url: Schema.String }>
              ]
            >
          >,
          Schema.Null
        ]
      >
    }>
    readonly failure: Schema.Never
    readonly failureMode: Mode extends undefined ? "error" : Mode
  },
  false
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiTool.ts#L77)

Since v4.0.0

## FileSearch

Defines the OpenAI File Search tool that enables the model to search through uploaded
files and vector stores.

**When to use**

Use to let an OpenAI model search uploaded files through one or more vector
stores.

**Details**

The tool requires `vector_store_ids` and accepts optional `filters`,
`max_num_results`, and `ranking_options`. Successful tool calls expose the
search `status`, generated `queries`, and optional `results`.

**Signature**

```ts
declare const FileSearch: <Mode extends Tool.FailureMode | undefined = undefined>(args: {
  readonly vector_store_ids: ReadonlyArray<string>
  readonly max_num_results?: number | undefined
  readonly ranking_options?:
    | {
        readonly ranker?: "auto" | "default-2024-11-15" | undefined
        readonly score_threshold?: number | undefined
        readonly hybrid_search?:
          | Schema.Struct.ReadonlySide<
              { readonly embedding_weight: Schema.Number; readonly text_weight: Schema.Number },
              "Encoded"
            >
          | undefined
      }
    | undefined
  readonly filters?:
    | Schema.Struct.ReadonlySide<
        {
          readonly type: Schema.Literals<readonly ["eq", "ne", "gt", "gte", "lt", "lte", "in", "nin"]>
          readonly key: Schema.String
          readonly value: Schema.Union<
            readonly [
              Schema.String,
              Schema.Number,
              Schema.Boolean,
              Schema.$Array<Schema.Union<readonly [Schema.String, Schema.Number]>>
            ]
          >
        },
        "Encoded"
      >
    | Schema.Struct.ReadonlySide<
        {
          readonly type: Schema.Literals<readonly ["and", "or"]>
          readonly filters: Schema.$Array<
            Schema.Union<
              readonly [
                Schema.Struct<{
                  readonly type: Schema.Literals<readonly ["eq", "ne", "gt", "gte", "lt", "lte", "in", "nin"]>
                  readonly key: Schema.String
                  readonly value: Schema.Union<
                    readonly [
                      Schema.String,
                      Schema.Number,
                      Schema.Boolean,
                      Schema.$Array<Schema.Union<readonly [Schema.String, Schema.Number]>>
                    ]
                  >
                }>,
                Schema.Unknown
              ]
            >
          >
        },
        "Encoded"
      >
    | null
    | undefined
}) => Tool.ProviderDefined<
  "openai.file_search",
  "OpenAiFileSearch",
  {
    readonly args: Schema.Struct<{
      readonly filters: Schema.optionalKey<
        Schema.Union<
          readonly [
            Schema.Union<
              readonly [
                Schema.Struct<{
                  readonly type: Schema.Literals<readonly ["eq", "ne", "gt", "gte", "lt", "lte", "in", "nin"]>
                  readonly key: Schema.String
                  readonly value: Schema.Union<
                    readonly [
                      Schema.String,
                      Schema.Number,
                      Schema.Boolean,
                      Schema.$Array<Schema.Union<readonly [Schema.String, Schema.Number]>>
                    ]
                  >
                }>,
                Schema.Struct<{
                  readonly type: Schema.Literals<readonly ["and", "or"]>
                  readonly filters: Schema.$Array<
                    Schema.Union<
                      readonly [
                        Schema.Struct<{
                          readonly type: Schema.Literals<readonly ["eq", "ne", "gt", "gte", "lt", "lte", "in", "nin"]>
                          readonly key: Schema.String
                          readonly value: Schema.Union<
                            readonly [
                              Schema.String,
                              Schema.Number,
                              Schema.Boolean,
                              Schema.$Array<Schema.Union<readonly [Schema.String, Schema.Number]>>
                            ]
                          >
                        }>,
                        Schema.Unknown
                      ]
                    >
                  >
                }>
              ]
            >,
            Schema.Null
          ]
        >
      >
      readonly max_num_results: Schema.optionalKey<Schema.Number>
      readonly ranking_options: Schema.optionalKey<
        Schema.Struct<{
          readonly ranker: Schema.optionalKey<Schema.Literals<readonly ["auto", "default-2024-11-15"]>>
          readonly score_threshold: Schema.optionalKey<Schema.Number>
          readonly hybrid_search: Schema.optionalKey<
            Schema.Struct<{ readonly embedding_weight: Schema.Number; readonly text_weight: Schema.Number }>
          >
        }>
      >
      readonly vector_store_ids: Schema.$Array<Schema.String>
    }>
    readonly parameters: Schema.Void
    readonly success: Schema.Struct<{
      readonly status: Schema.Literals<readonly ["in_progress", "searching", "completed", "incomplete", "failed"]>
      readonly queries: Schema.$Array<Schema.String>
      readonly results: Schema.optionalKey<
        Schema.Union<
          readonly [
            Schema.$Array<
              Schema.Struct<{
                readonly file_id: Schema.optionalKey<Schema.String>
                readonly text: Schema.optionalKey<Schema.String>
                readonly filename: Schema.optionalKey<Schema.String>
                readonly attributes: Schema.optionalKey<Schema.Union<readonly [Schema.Struct<{}>, Schema.Null]>>
                readonly score: Schema.optionalKey<Schema.Number>
              }>
            >,
            Schema.Null
          ]
        >
      >
    }>
    readonly failure: Schema.Never
    readonly failureMode: Mode extends undefined ? "error" : Mode
  },
  false
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiTool.ts#L111)

Since v4.0.0

## ImageGeneration

Defines the OpenAI Image Generation tool that enables the model to generate images using
the GPT image models.

**When to use**

Use to enable OpenAI provider-defined image generation through a language
model response.

**Details**

The tool configures the `image_generation` provider tool, including model,
size, quality, output format, moderation, background, input-image options,
and partial image settings. Successful tool calls expose `result` as base64
image data or `null`.

**Signature**

```ts
declare const ImageGeneration: <Mode extends Tool.FailureMode | undefined = undefined>(args: {
  readonly model?: string | undefined
  readonly quality?: "auto" | "low" | "medium" | "high" | undefined
  readonly size?: string | undefined
  readonly output_format?: "png" | "webp" | "jpeg" | undefined
  readonly output_compression?: number | undefined
  readonly moderation?: "auto" | "low" | undefined
  readonly background?: "auto" | "transparent" | "opaque" | undefined
  readonly input_fidelity?: "low" | "high" | null | undefined
  readonly input_image_mask?:
    | { readonly file_id?: string | undefined; readonly image_url?: string | undefined }
    | undefined
  readonly partial_images?: number | undefined
}) => Tool.ProviderDefined<
  "openai.image_generation",
  "OpenAiImageGeneration",
  {
    readonly args: Schema.Struct<{
      readonly background: Schema.optionalKey<Schema.Literals<readonly ["transparent", "opaque", "auto"]>>
      readonly input_fidelity: Schema.optionalKey<
        Schema.Union<readonly [Schema.Literals<readonly ["high", "low"]>, Schema.Null]>
      >
      readonly input_image_mask: Schema.optionalKey<
        Schema.Struct<{
          readonly image_url: Schema.optionalKey<Schema.String>
          readonly file_id: Schema.optionalKey<Schema.String>
        }>
      >
      readonly model: Schema.optionalKey<
        Schema.Union<
          readonly [Schema.String, Schema.Literals<readonly ["gpt-image-1", "gpt-image-1-mini", "gpt-image-1.5"]>]
        >
      >
      readonly moderation: Schema.optionalKey<Schema.Literals<readonly ["auto", "low"]>>
      readonly output_compression: Schema.optionalKey<Schema.Number>
      readonly output_format: Schema.optionalKey<Schema.Literals<readonly ["png", "webp", "jpeg"]>>
      readonly partial_images: Schema.optionalKey<Schema.Number>
      readonly quality: Schema.optionalKey<Schema.Literals<readonly ["low", "medium", "high", "auto"]>>
      readonly size: Schema.optionalKey<
        Schema.Union<
          readonly [Schema.String, Schema.Literals<readonly ["1024x1024", "1024x1536", "1536x1024", "auto"]>]
        >
      >
    }>
    readonly parameters: Schema.Void
    readonly success: Schema.Struct<{ readonly result: Schema.Union<readonly [Schema.String, Schema.Null]> }>
    readonly failure: Schema.Never
    readonly failureMode: Mode extends undefined ? "error" : Mode
  },
  false
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiTool.ts#L147)

Since v4.0.0

## LocalShell

Defines the OpenAI Local Shell tool that enables the model to run a command with a local
shell. This local tool runs in your environment and requires a handler to
execute commands.

**When to use**

Use to let an OpenAI model request local shell commands that your application
executes through a handler.

**Details**

The tool exposes a provider-defined `local_shell` call. It is marked as
handler-required, so applications must provide the command execution policy
and implementation.

**Signature**

```ts
declare const LocalShell: <Mode extends Tool.FailureMode | undefined = undefined>(args: {
  readonly failureMode?: Mode | undefined
}) => Tool.ProviderDefined<
  "openai.local_shell",
  "OpenAiLocalShell",
  {
    readonly args: Schema.Void
    readonly parameters: Schema.Struct<{
      readonly action: Schema.Struct<{
        readonly type: Schema.Literal<"exec">
        readonly command: Schema.$Array<Schema.String>
        readonly timeout_ms: Schema.optionalKey<Schema.Union<readonly [Schema.Number, Schema.Null]>>
        readonly working_directory: Schema.optionalKey<Schema.Union<readonly [Schema.String, Schema.Null]>>
        readonly env: Schema.Struct<{}>
        readonly user: Schema.optionalKey<Schema.Union<readonly [Schema.String, Schema.Null]>>
      }>
    }>
    readonly success: Schema.Struct<{ readonly output: Schema.String }>
    readonly failure: Schema.Never
    readonly failureMode: Mode extends undefined ? "error" : Mode
  },
  true
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiTool.ts#L187)

Since v4.0.0

## Mcp

Defines the OpenAI MCP tool that gives the model access to additional tools via remote
Model Context Protocol (MCP) servers.

**When to use**

Use to let an OpenAI model call tools exposed by a remote MCP server.

**Details**

The tool accepts MCP server configuration such as allowed tools,
authorization, connector id, approval requirements, server metadata, and
server URL. Tool call results include the called tool name, arguments, output,
error, and server label.

**Gotchas**

This schema leaves both `server_url` and `connector_id` optional, but OpenAI
may require a server URL or connector id for a usable MCP tool configuration.

**Signature**

```ts
declare const Mcp: <Mode extends Tool.FailureMode | undefined = undefined>(args: {
  readonly server_label: string
  readonly server_url?: string | undefined
  readonly connector_id?:
    | "connector_dropbox"
    | "connector_gmail"
    | "connector_googlecalendar"
    | "connector_googledrive"
    | "connector_microsoftteams"
    | "connector_outlookcalendar"
    | "connector_outlookemail"
    | "connector_sharepoint"
    | undefined
  readonly authorization?: string | undefined
  readonly server_description?: string | undefined
  readonly allowed_tools?:
    | ReadonlyArray<string>
    | { readonly tool_names?: ReadonlyArray<string> | undefined; readonly read_only?: boolean | undefined }
    | null
    | undefined
  readonly require_approval?:
    | "always"
    | "never"
    | {
        readonly always?:
          | { readonly tool_names?: ReadonlyArray<string> | undefined; readonly read_only?: boolean | undefined }
          | undefined
        readonly never?:
          | { readonly tool_names?: ReadonlyArray<string> | undefined; readonly read_only?: boolean | undefined }
          | undefined
      }
    | null
    | undefined
}) => Tool.ProviderDefined<
  "openai.mcp",
  "OpenAiMcp",
  {
    readonly args: Schema.Struct<{
      readonly allowed_tools: Schema.optionalKey<
        Schema.Union<
          readonly [
            Schema.Union<
              readonly [
                Schema.$Array<Schema.String>,
                Schema.Struct<{
                  readonly tool_names: Schema.optionalKey<Schema.$Array<Schema.String>>
                  readonly read_only: Schema.optionalKey<Schema.Boolean>
                }>
              ]
            >,
            Schema.Null
          ]
        >
      >
      readonly authorization: Schema.optionalKey<Schema.String>
      readonly connector_id: Schema.optionalKey<
        Schema.Literals<
          readonly [
            "connector_dropbox",
            "connector_gmail",
            "connector_googlecalendar",
            "connector_googledrive",
            "connector_microsoftteams",
            "connector_outlookcalendar",
            "connector_outlookemail",
            "connector_sharepoint"
          ]
        >
      >
      readonly require_approval: Schema.optionalKey<
        Schema.Union<
          readonly [
            Schema.Union<
              readonly [
                Schema.Struct<{
                  readonly always: Schema.optionalKey<
                    Schema.Struct<{
                      readonly tool_names: Schema.optionalKey<Schema.$Array<Schema.String>>
                      readonly read_only: Schema.optionalKey<Schema.Boolean>
                    }>
                  >
                  readonly never: Schema.optionalKey<
                    Schema.Struct<{
                      readonly tool_names: Schema.optionalKey<Schema.$Array<Schema.String>>
                      readonly read_only: Schema.optionalKey<Schema.Boolean>
                    }>
                  >
                }>,
                Schema.Literals<readonly ["always", "never"]>
              ]
            >,
            Schema.Null
          ]
        >
      >
      readonly server_description: Schema.optionalKey<Schema.String>
      readonly server_label: Schema.String
      readonly server_url: Schema.optionalKey<Schema.String>
    }>
    readonly parameters: Schema.Unknown
    readonly success: Schema.Struct<{
      readonly type: Schema.Literal<"mcp_call">
      readonly name: Schema.String
      readonly arguments: Schema.String
      readonly output: Schema.optionalKey<Schema.Union<readonly [Schema.String, Schema.Null]>>
      readonly error: Schema.optionalKey<Schema.Union<readonly [Schema.String, Schema.Null]>>
      readonly server_label: Schema.String
    }>
    readonly failure: Schema.Never
    readonly failureMode: Mode extends undefined ? "error" : Mode
  },
  false
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiTool.ts#L223)

Since v4.0.0

## Shell

Defines the OpenAI shell tool for model-requested command execution.

**When to use**

Use to let an OpenAI model request shell commands that your application
executes through a handler.

**Details**

The tool exposes a provider-defined `shell` call. It is marked as
handler-required, so applications must provide the command execution policy
and implementation.

**Signature**

```ts
declare const Shell: <Mode extends Tool.FailureMode | undefined = undefined>(args: {
  readonly failureMode?: Mode | undefined
}) => Tool.ProviderDefined<
  "openai.shell",
  "OpenAiShell",
  {
    readonly args: Schema.Void
    readonly parameters: Schema.Struct<{
      readonly action: Schema.Struct<{
        readonly commands: Schema.$Array<Schema.String>
        readonly timeout_ms: Schema.Union<readonly [Schema.Number, Schema.Null]>
        readonly max_output_length: Schema.Union<readonly [Schema.Number, Schema.Null]>
      }>
    }>
    readonly success: Schema.Struct<{
      readonly output: Schema.$Array<
        Schema.Struct<{
          readonly stdout: Schema.String
          readonly stderr: Schema.String
          readonly outcome: Schema.Union<
            readonly [
              Schema.Struct<{ readonly type: Schema.Literal<"timeout"> }>,
              Schema.Struct<{ readonly type: Schema.Literal<"exit">; readonly exit_code: Schema.Number }>
            ]
          >
          readonly created_by: Schema.optionalKey<Schema.String>
        }>
      >
    }>
    readonly failure: Schema.Never
    readonly failureMode: Mode extends undefined ? "error" : Mode
  },
  true
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiTool.ts#L264)

Since v4.0.0

## WebSearch

Defines the OpenAI Web Search tool that enables the model to search the web for
information.

**When to use**

Use to enable OpenAI provider-defined web search for a model response.

**Details**

The tool accepts optional filters, user location, and search context size.
Successful calls expose the performed search action and status.

**See**

- `WebSearchPreview` for the preview web search provider tool

**Signature**

```ts
declare const WebSearch: <Mode extends Tool.FailureMode | undefined = undefined>(args: {
  readonly filters?: { readonly allowed_domains?: ReadonlyArray<string> | null | undefined } | null | undefined
  readonly user_location?:
    | {
        readonly type?: "approximate" | undefined
        readonly country?: string | null | undefined
        readonly region?: string | null | undefined
        readonly city?: string | null | undefined
        readonly timezone?: string | null | undefined
      }
    | null
    | undefined
  readonly search_context_size?: "low" | "medium" | "high" | undefined
}) => Tool.ProviderDefined<
  "openai.web_search",
  "OpenAiWebSearch",
  {
    readonly args: Schema.Struct<{
      readonly filters: Schema.optionalKey<
        Schema.Union<
          readonly [
            Schema.Struct<{
              readonly allowed_domains: Schema.optionalKey<
                Schema.Union<readonly [Schema.$Array<Schema.String>, Schema.Null]>
              >
            }>,
            Schema.Null
          ]
        >
      >
      readonly user_location: Schema.optionalKey<
        Schema.Union<
          readonly [
            Schema.Struct<{
              readonly type: Schema.optionalKey<Schema.Literal<"approximate">>
              readonly country: Schema.optionalKey<Schema.Union<readonly [Schema.String, Schema.Null]>>
              readonly region: Schema.optionalKey<Schema.Union<readonly [Schema.String, Schema.Null]>>
              readonly city: Schema.optionalKey<Schema.Union<readonly [Schema.String, Schema.Null]>>
              readonly timezone: Schema.optionalKey<Schema.Union<readonly [Schema.String, Schema.Null]>>
            }>,
            Schema.Null
          ]
        >
      >
      readonly search_context_size: Schema.optionalKey<Schema.Literals<readonly ["low", "medium", "high"]>>
    }>
    readonly parameters: Schema.Struct<{
      readonly action: Schema.Union<
        readonly [
          Schema.Struct<{
            readonly type: Schema.Literal<"search">
            readonly query: Schema.optionalKey<Schema.String>
            readonly queries: Schema.optionalKey<Schema.$Array<Schema.String>>
            readonly sources: Schema.optionalKey<
              Schema.$Array<Schema.Struct<{ readonly type: Schema.Literal<"url">; readonly url: Schema.String }>>
            >
          }>,
          Schema.Struct<{
            readonly type: Schema.Literal<"open_page">
            readonly url: Schema.optionalKey<Schema.Union<readonly [Schema.String, Schema.Null]>>
          }>,
          Schema.Struct<{
            readonly type: Schema.Literal<"find_in_page">
            readonly url: Schema.String
            readonly pattern: Schema.String
          }>
        ]
      >
    }>
    readonly success: Schema.Struct<{
      readonly action: Schema.Union<
        readonly [
          Schema.Struct<{
            readonly type: Schema.Literal<"search">
            readonly query: Schema.optionalKey<Schema.String>
            readonly queries: Schema.optionalKey<Schema.$Array<Schema.String>>
            readonly sources: Schema.optionalKey<
              Schema.$Array<Schema.Struct<{ readonly type: Schema.Literal<"url">; readonly url: Schema.String }>>
            >
          }>,
          Schema.Struct<{
            readonly type: Schema.Literal<"open_page">
            readonly url: Schema.optionalKey<Schema.Union<readonly [Schema.String, Schema.Null]>>
          }>,
          Schema.Struct<{
            readonly type: Schema.Literal<"find_in_page">
            readonly url: Schema.String
            readonly pattern: Schema.String
          }>
        ]
      >
      readonly status: Schema.Literals<readonly ["in_progress", "searching", "completed", "failed"]>
    }>
    readonly failure: Schema.Never
    readonly failureMode: Mode extends undefined ? "error" : Mode
  },
  false
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiTool.ts#L295)

Since v4.0.0

## WebSearchPreview

Defines the OpenAI preview Web Search tool for model responses.

**When to use**

Use to enable the preview OpenAI web search provider tool.

**Details**

The preview tool accepts optional user location and search context size, then
exposes the performed search action and status in successful calls.

**See**

- `WebSearch` for the stable web search provider tool

**Signature**

```ts
declare const WebSearchPreview: <Mode extends Tool.FailureMode | undefined = undefined>(args: {
  readonly user_location?:
    | {
        readonly type: "approximate"
        readonly country?: string | null | undefined
        readonly region?: string | null | undefined
        readonly city?: string | null | undefined
        readonly timezone?: string | null | undefined
      }
    | null
    | undefined
  readonly search_context_size?: "low" | "medium" | "high" | undefined
}) => Tool.ProviderDefined<
  "openai.web_search_preview",
  "OpenAiWebSearchPreview",
  {
    readonly args: Schema.Struct<{
      readonly user_location: Schema.optionalKey<
        Schema.Union<
          readonly [
            Schema.Struct<{
              readonly type: Schema.Literal<"approximate">
              readonly country: Schema.optionalKey<Schema.Union<readonly [Schema.String, Schema.Null]>>
              readonly region: Schema.optionalKey<Schema.Union<readonly [Schema.String, Schema.Null]>>
              readonly city: Schema.optionalKey<Schema.Union<readonly [Schema.String, Schema.Null]>>
              readonly timezone: Schema.optionalKey<Schema.Union<readonly [Schema.String, Schema.Null]>>
            }>,
            Schema.Null
          ]
        >
      >
      readonly search_context_size: Schema.optionalKey<Schema.Literals<readonly ["low", "medium", "high"]>>
    }>
    readonly parameters: Schema.Void
    readonly success: Schema.Struct<{
      readonly action: Schema.Union<
        readonly [
          Schema.Struct<{
            readonly type: Schema.Literal<"search">
            readonly query: Schema.optionalKey<Schema.String>
            readonly queries: Schema.optionalKey<Schema.$Array<Schema.String>>
            readonly sources: Schema.optionalKey<
              Schema.$Array<Schema.Struct<{ readonly type: Schema.Literal<"url">; readonly url: Schema.String }>>
            >
          }>,
          Schema.Struct<{
            readonly type: Schema.Literal<"open_page">
            readonly url: Schema.optionalKey<Schema.Union<readonly [Schema.String, Schema.Null]>>
          }>,
          Schema.Struct<{
            readonly type: Schema.Literal<"find_in_page">
            readonly url: Schema.String
            readonly pattern: Schema.String
          }>
        ]
      >
      readonly status: Schema.Literals<readonly ["in_progress", "searching", "completed", "failed"]>
    }>
    readonly failure: Schema.Never
    readonly failureMode: Mode extends undefined ? "error" : Mode
  },
  false
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/openai/src/OpenAiTool.ts#L330)

Since v4.0.0
