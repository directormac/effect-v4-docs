---
title: AnthropicTool.ts
nav_order: 6
parent: "@effect/ai-anthropic"
---

## AnthropicTool.ts overview

The `AnthropicTool` module defines Anthropic provider tools and the schemas
for their inputs and results. It covers Anthropic-owned tools such as Bash,
Code Execution, Computer Use, Memory, Text Editor, Web Search, Web Fetch, and
Tool Search, which can be attached to Anthropic-backed Effect AI language
model requests.

Since v4.0.0

---

## Exports Grouped by Category

- [Bash](#bash)
  - [Bash_20241022](#bash_20241022)
  - [Bash_20250124](#bash_20250124)
- [Code Execution](#code-execution)
  - [CodeExecutionBashCommand](#codeexecutionbashcommand)
  - [CodeExecutionBashCommand (type alias)](#codeexecutionbashcommand-type-alias)
  - [CodeExecutionProgrammaticToolCall](#codeexecutionprogrammatictoolcall)
  - [CodeExecutionProgrammaticToolCall (type alias)](#codeexecutionprogrammatictoolcall-type-alias)
  - [CodeExecutionTextEditorCreate](#codeexecutiontexteditorcreate)
  - [CodeExecutionTextEditorCreate (type alias)](#codeexecutiontexteditorcreate-type-alias)
  - [CodeExecutionTextEditorStrReplace](#codeexecutiontexteditorstrreplace)
  - [CodeExecutionTextEditorStrReplace (type alias)](#codeexecutiontexteditorstrreplace-type-alias)
  - [CodeExecutionTextEditorView](#codeexecutiontexteditorview)
  - [CodeExecutionTextEditorView (type alias)](#codeexecutiontexteditorview-type-alias)
  - [CodeExecution_20250522](#codeexecution_20250522)
  - [CodeExecution_20250825](#codeexecution_20250825)
  - [CodeExecution_20250825_Parameters](#codeexecution_20250825_parameters)
  - [CodeExecution_20250825_Parameters (type alias)](#codeexecution_20250825_parameters-type-alias)
- [Web Fetch](#web-fetch)
  - [WebFetchCitationsConfig](#webfetchcitationsconfig)
  - [WebFetchCitationsConfig (type alias)](#webfetchcitationsconfig-type-alias)
  - [WebFetchParameters](#webfetchparameters)
  - [WebFetchParameters (type alias)](#webfetchparameters-type-alias)
  - [WebFetch_20250910](#webfetch_20250910)
  - [WebFetch_20250910_Args](#webfetch_20250910_args)
  - [WebFetch_20250910_Args (type alias)](#webfetch_20250910_args-type-alias)
- [Web Search](#web-search)
  - [WebSearchParameters](#websearchparameters)
  - [WebSearchParameters (type alias)](#websearchparameters-type-alias)
  - [WebSearchUserLocation](#websearchuserlocation)
  - [WebSearch_20250305](#websearch_20250305)
  - [WebSearch_20250305_Args](#websearch_20250305_args)
  - [WebSearch_20250305_Args (type alias)](#websearch_20250305_args-type-alias)
- [computer use](#computer-use)
  - [ComputerUseDoubleClickAction](#computerusedoubleclickaction)
  - [ComputerUseDoubleClickAction (type alias)](#computerusedoubleclickaction-type-alias)
  - [ComputerUseHoldKeyAction](#computeruseholdkeyaction)
  - [ComputerUseHoldKeyAction (type alias)](#computeruseholdkeyaction-type-alias)
  - [ComputerUseKeyAction](#computerusekeyaction)
  - [ComputerUseKeyAction (type alias)](#computerusekeyaction-type-alias)
  - [ComputerUseLeftClickAction](#computeruseleftclickaction)
  - [ComputerUseLeftClickAction (type alias)](#computeruseleftclickaction-type-alias)
  - [ComputerUseLeftClickDragAction](#computeruseleftclickdragaction)
  - [ComputerUseLeftClickDragAction (type alias)](#computeruseleftclickdragaction-type-alias)
  - [ComputerUseLeftMouseDownAction](#computeruseleftmousedownaction)
  - [ComputerUseLeftMouseDownAction (type alias)](#computeruseleftmousedownaction-type-alias)
  - [ComputerUseLeftMouseUpAction](#computeruseleftmouseupaction)
  - [ComputerUseLeftMouseUpAction (type alias)](#computeruseleftmouseupaction-type-alias)
  - [ComputerUseMiddleClickAction](#computerusemiddleclickaction)
  - [ComputerUseMiddleClickAction (type alias)](#computerusemiddleclickaction-type-alias)
  - [ComputerUseMouseMoveAction](#computerusemousemoveaction)
  - [ComputerUseMouseMoveAction (type alias)](#computerusemousemoveaction-type-alias)
  - [ComputerUseRightClickAction](#computeruserightclickaction)
  - [ComputerUseRightClickAction (type alias)](#computeruserightclickaction-type-alias)
  - [ComputerUseScreenshotAction](#computerusescreenshotaction)
  - [ComputerUseScreenshotAction (type alias)](#computerusescreenshotaction-type-alias)
  - [ComputerUseScrollAction](#computerusescrollaction)
  - [ComputerUseScrollAction (type alias)](#computerusescrollaction-type-alias)
  - [ComputerUseTripleClickAction](#computerusetripleclickaction)
  - [ComputerUseTripleClickAction (type alias)](#computerusetripleclickaction-type-alias)
  - [ComputerUseWaitAction](#computerusewaitaction)
  - [ComputerUseWaitAction (type alias)](#computerusewaitaction-type-alias)
  - [ComputerUseZoomAction](#computerusezoomaction)
  - [ComputerUseZoomAction (type alias)](#computerusezoomaction-type-alias)
  - [ComputerUse_20241022](#computeruse_20241022)
  - [ComputerUse_20250124](#computeruse_20250124)
  - [ComputerUse_20251124](#computeruse_20251124)
  - [Coordinate](#coordinate)
  - [Coordinate (type alias)](#coordinate-type-alias)
  - [ModifierKey](#modifierkey)
  - [ModifierKey (type alias)](#modifierkey-type-alias)
  - [Region](#region)
  - [Region (type alias)](#region-type-alias)
  - [ScrollDirection](#scrolldirection)
  - [ScrollDirection (type alias)](#scrolldirection-type-alias)
  - [TypeAction](#typeaction)
  - [TypeAction (type alias)](#typeaction-type-alias)
- [memory](#memory)
  - [MemoryCreateCommand](#memorycreatecommand)
  - [MemoryCreateCommand (type alias)](#memorycreatecommand-type-alias)
  - [MemoryDeleteCommand](#memorydeletecommand)
  - [MemoryDeleteCommand (type alias)](#memorydeletecommand-type-alias)
  - [MemoryInsertCommand](#memoryinsertcommand)
  - [MemoryInsertCommand (type alias)](#memoryinsertcommand-type-alias)
  - [MemoryRenameCommand](#memoryrenamecommand)
  - [MemoryRenameCommand (type alias)](#memoryrenamecommand-type-alias)
  - [MemoryStrReplaceCommand](#memorystrreplacecommand)
  - [MemoryStrReplaceCommand (type alias)](#memorystrreplacecommand-type-alias)
  - [MemoryViewCommand](#memoryviewcommand)
  - [MemoryViewCommand (type alias)](#memoryviewcommand-type-alias)
  - [Memory_20250818](#memory_20250818)
  - [ViewRange](#viewrange)
  - [ViewRange (type alias)](#viewrange-type-alias)
- [models](#models)
  - [AnthropicTool (type alias)](#anthropictool-type-alias)
- [text editor](#text-editor)
  - [TextEditorCreateCommand](#texteditorcreatecommand)
  - [TextEditorCreateCommand (type alias)](#texteditorcreatecommand-type-alias)
  - [TextEditorInsertCommand](#texteditorinsertcommand)
  - [TextEditorInsertCommand (type alias)](#texteditorinsertcommand-type-alias)
  - [TextEditorStrReplaceCommand](#texteditorstrreplacecommand)
  - [TextEditorStrReplaceCommand (type alias)](#texteditorstrreplacecommand-type-alias)
  - [TextEditorUndoEditCommand](#texteditorundoeditcommand)
  - [TextEditorUndoEditCommand (type alias)](#texteditorundoeditcommand-type-alias)
  - [TextEditorViewCommand](#texteditorviewcommand)
  - [TextEditorViewCommand (type alias)](#texteditorviewcommand-type-alias)
  - [TextEditor_20241022](#texteditor_20241022)
  - [TextEditor_20250124](#texteditor_20250124)
  - [TextEditor_20250429](#texteditor_20250429)
  - [TextEditor_20250728](#texteditor_20250728)
- [tool search](#tool-search)
  - [ToolSearchBM25Parameters](#toolsearchbm25parameters)
  - [ToolSearchBM25Parameters (type alias)](#toolsearchbm25parameters-type-alias)
  - [ToolSearchBM25_20251119](#toolsearchbm25_20251119)
  - [ToolSearchRegexParameters](#toolsearchregexparameters)
  - [ToolSearchRegexParameters (type alias)](#toolsearchregexparameters-type-alias)
  - [ToolSearchRegex_20251119](#toolsearchregex_20251119)

---

# Bash

## Bash_20241022

Defines the Anthropic Bash tool (2024-10-22 version).

**When to use**

Use when you want the model to execute bash commands with the 2024-10-22
Anthropic computer-use beta.

**Details**

Allows the model to execute bash commands in a sandboxed environment.
Requires the "computer-use-2024-10-22" beta header.

**See**

- `Bash_20250124` for the newer 2025-01-24 version of the bash tool

**Signature**

```ts
declare const Bash_20241022: <Mode extends Tool.FailureMode | undefined = undefined>(args: {
  readonly failureMode?: Mode | undefined
}) => Tool.ProviderDefined<
  "anthropic.bash_20241022",
  "AnthropicBash",
  {
    readonly args: Schema.Void
    readonly parameters: Schema.Struct<{
      readonly command: Schema.String
      readonly restart: Schema.optional<Schema.Boolean>
    }>
    readonly success: Schema.String
    readonly failure: Schema.Never
    readonly failureMode: Mode extends undefined ? "error" : Mode
  },
  true
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L71)

Since v4.0.0

## Bash_20250124

Defines the Anthropic Bash tool (2025-01-24 version).

**When to use**

Use when you want the model to execute bash commands with the 2025-01-24
Anthropic computer-use beta.

**Details**

Allows the model to execute bash commands in a sandboxed environment.
Requires the "computer-use-2025-01-24" beta header.

**See**

- `Bash_20241022` for the older 2024-10-22 version of the bash tool

**Signature**

```ts
declare const Bash_20250124: <Mode extends Tool.FailureMode | undefined = undefined>(args: {
  readonly failureMode?: Mode | undefined
}) => Tool.ProviderDefined<
  "anthropic.bash_20250124",
  "AnthropicBash",
  {
    readonly args: Schema.Void
    readonly parameters: Schema.Struct<{
      readonly command: Schema.String
      readonly restart: Schema.optional<Schema.Boolean>
    }>
    readonly success: Schema.String
    readonly failure: Schema.Never
    readonly failureMode: Mode extends undefined ? "error" : Mode
  },
  true
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L101)

Since v4.0.0

# Code Execution

## CodeExecutionBashCommand

Schema for the `bash_code_execution` input variant of Anthropic Code Execution.

**When to use**

Use when validating or constructing a bash command request for
`CodeExecution_20250522`.

**Details**

The schema requires `type` to be `"bash_code_execution"` and `command` to
contain the bash command sent to Anthropic.

**See**

- `CodeExecution_20250522` for the provider-defined tool that consumes this input variant

**Signature**

```ts
declare const CodeExecutionBashCommand: Schema.Struct<{
  readonly type: Schema.Literal<"bash_code_execution">
  readonly command: Schema.String
}>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L167)

Since v4.0.0

## CodeExecutionBashCommand (type alias)

Input payload for a bash command routed through the Anthropic code execution tool.

**When to use**

Use when representing a provider-executed bash command request for the
2025-05-22 code execution tool.

**Details**

The payload uses `type: "bash_code_execution"` to distinguish bash execution
from programmatic code and text editor operations, and `command` contains the
bash command to run.

**See**

- `CodeExecutionProgrammaticToolCall` for programmatic code execution input
- `CodeExecutionTextEditorView` for viewing files through text editor code execution
- `CodeExecutionTextEditorCreate` for creating files through text editor code execution
- `CodeExecutionTextEditorStrReplace` for replacing text through text editor code execution
- `CodeExecution_20250522` for the provider-defined tool that consumes this payload

**Signature**

```ts
type CodeExecutionBashCommand = typeof CodeExecutionBashCommand.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L197)

Since v4.0.0

## CodeExecutionProgrammaticToolCall

Schema for a code execution request that asks Anthropic to run source code as a programmatic tool call.

**When to use**

Use when constructing or validating a programmatic tool call for the Anthropic
Code Execution tool.

**See**

- `CodeExecution_20250522` for the parent tool definition

**Signature**

```ts
declare const CodeExecutionProgrammaticToolCall: Schema.Struct<{
  readonly type: Schema.Literal<"programmatic-tool-call">
  readonly code: Schema.String
}>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L134)

Since v4.0.0

## CodeExecutionProgrammaticToolCall (type alias)

Input payload for a programmatic code execution tool call, including the source code to execute.

**Signature**

```ts
type CodeExecutionProgrammaticToolCall = typeof CodeExecutionProgrammaticToolCall.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L147)

Since v4.0.0

## CodeExecutionTextEditorCreate

Schema for a text editor code execution request that creates a file at a path.

**When to use**

Use when validating or constructing an Anthropic `text_editor_code_execution`
tool call that should create a file.

**Details**

The request is discriminated by `type: "text_editor_code_execution"` and
`command: "create"`. It requires `path` and accepts optional `file_text`; the
schema allows `file_text` to be omitted, `null`, or a string.

**See**

- `CodeExecution_20250522` for the provider-defined tool that consumes this request
- `CodeExecutionTextEditorView` for the matching view request
- `CodeExecutionTextEditorStrReplace` for the matching replace request

**Signature**

```ts
declare const CodeExecutionTextEditorCreate: Schema.Struct<{
  readonly type: Schema.Literal<"text_editor_code_execution">
  readonly command: Schema.Literal<"create">
  readonly path: Schema.String
  readonly file_text: Schema.optional<Schema.NullOr<Schema.String>>
}>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L274)

Since v4.0.0

## CodeExecutionTextEditorCreate (type alias)

Input payload for creating a file through the text editor code execution tool, optionally including initial file text.

**Signature**

```ts
type CodeExecutionTextEditorCreate = typeof CodeExecutionTextEditorCreate.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L292)

Since v4.0.0

## CodeExecutionTextEditorStrReplace

Schema for a code execution text editor request that replaces one exact string in a file.

**When to use**

Use when validating or constructing the `str_replace` text editor operation
for the 2025-05-22 Anthropic code execution tool.

**Gotchas**

The `old_str` must match the file contents exactly, including whitespace and
indentation, and must identify a single occurrence.

**See**

- `CodeExecutionTextEditorView` for reading file contents before choosing the replacement text
- `CodeExecution_20250522` for the provider-defined tool that consumes this payload

**Signature**

```ts
declare const CodeExecutionTextEditorStrReplace: Schema.Struct<{
  readonly type: Schema.Literal<"text_editor_code_execution">
  readonly command: Schema.Literal<"str_replace">
  readonly path: Schema.String
  readonly old_str: Schema.String
  readonly new_str: Schema.String
}>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L313)

Since v4.0.0

## CodeExecutionTextEditorStrReplace (type alias)

Input payload for replacing text in a file through the text editor code execution tool.

**Signature**

```ts
type CodeExecutionTextEditorStrReplace = typeof CodeExecutionTextEditorStrReplace.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L335)

Since v4.0.0

## CodeExecutionTextEditorView

Schema for a code execution text editor request that views a file by path.

**When to use**

Use when you need the schema for provider-bound code-execution view requests
before distinguishing them from create or replace text-editor commands.

**Details**

The encoded payload uses `type: "text_editor_code_execution"`,
`command: "view"`, and a `path` string.

**See**

- `CodeExecutionTextEditorCreate` for the command that creates a file
- `CodeExecutionTextEditorStrReplace` for the command that replaces text in a file

**Signature**

```ts
declare const CodeExecutionTextEditorView: Schema.Struct<{
  readonly type: Schema.Literal<"text_editor_code_execution">
  readonly command: Schema.Literal<"view">
  readonly path: Schema.String
}>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L218)

Since v4.0.0

## CodeExecutionTextEditorView (type alias)

Input payload for the `view` command of Anthropic's text editor code execution tool.

**When to use**

Use when working at the Anthropic protocol boundary and the code-execution
view request must be distinguished from standalone text-editor view requests.

**Details**

The payload is discriminated by `type: "text_editor_code_execution"` and
`command: "view"`. The `path` field identifies the file to view.

**Gotchas**

This code execution view payload does not include `view_range`; line ranges
are part of the standalone text editor view payload, not this code execution
payload.

**See**

- `CodeExecution_20250522` for the provider-defined code execution tool that includes this payload
- `TextEditorViewCommand` for the standalone text editor view payload

**Signature**

```ts
type CodeExecutionTextEditorView = typeof CodeExecutionTextEditorView.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L251)

Since v4.0.0

## CodeExecution_20250522

Defines the Anthropic Code Execution tool (2025-05-22 version).

**When to use**

Use when you want the model to execute code in a sandboxed environment with
the 2025-05-22 Anthropic code-execution beta.

**Details**

Allows the model to execute code in a sandboxed environment with support
for multiple execution types including programmatic tool calls, bash
execution, and text editor operations.

**See**

- `CodeExecutionProgrammaticToolCall` for the programmatic tool call schema

**Signature**

```ts
declare const CodeExecution_20250522: <Mode extends Tool.FailureMode | undefined = undefined>(
  args: void
) => Tool.ProviderDefined<
  "anthropic.code_execution_20250522",
  "AnthropicCodeExecution",
  {
    readonly args: Schema.Void
    readonly parameters: Schema.Union<
      readonly [
        Schema.Struct<{ readonly type: Schema.Literal<"programmatic-tool-call">; readonly code: Schema.String }>,
        Schema.Struct<{ readonly type: Schema.Literal<"bash_code_execution">; readonly command: Schema.String }>,
        Schema.Struct<{
          readonly type: Schema.Literal<"text_editor_code_execution">
          readonly command: Schema.Literal<"view">
          readonly path: Schema.String
        }>,
        Schema.Struct<{
          readonly type: Schema.Literal<"text_editor_code_execution">
          readonly command: Schema.Literal<"create">
          readonly path: Schema.String
          readonly file_text: Schema.optional<Schema.NullOr<Schema.String>>
        }>,
        Schema.Struct<{
          readonly type: Schema.Literal<"text_editor_code_execution">
          readonly command: Schema.Literal<"str_replace">
          readonly path: Schema.String
          readonly old_str: Schema.String
          readonly new_str: Schema.String
        }>
      ]
    >
    readonly success: Schema.Struct<{
      readonly content: Schema.$Array<
        Schema.Struct<{ readonly file_id: Schema.String; readonly type: Schema.Literal<"code_execution_output"> }>
      >
      readonly return_code: Schema.Number
      readonly stderr: Schema.String
      readonly stdout: Schema.String
      readonly type: Schema.Literal<"code_execution_result">
    }>
    readonly failure: Schema.Struct<{
      readonly error_code: Schema.Literals<
        readonly ["invalid_tool_input", "unavailable", "too_many_requests", "execution_time_exceeded"]
      >
      readonly type: Schema.Literal<"code_execution_tool_result_error">
    }>
    readonly failureMode: Mode extends undefined ? "error" : Mode
  },
  false
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L411)

Since v4.0.0

## CodeExecution_20250825

Defines the Anthropic Code Execution tool (2025-08-25 version).

**When to use**

Use when you want the model to execute code in a sandboxed environment with
the 2025-08-25 Anthropic code-execution beta.

**Details**

Requires the `code-execution-2025-08-25` beta header and uses
`CodeExecution_20250825_Parameters` as its input schema.

**See**

- `CodeExecution_20250522` for the older 2025-05-22 code execution tool
- `CodeExecution_20250825_Parameters` for the input schema consumed by this tool

**Signature**

```ts
declare const CodeExecution_20250825: <Mode extends Tool.FailureMode | undefined = undefined>(
  args: void
) => Tool.ProviderDefined<
  "anthropic.code_execution_20250825",
  "AnthropicCodeExecution",
  {
    readonly args: Schema.Void
    readonly parameters: Schema.Struct<{ readonly code: Schema.String }>
    readonly success: Schema.Union<
      readonly [
        Schema.Struct<{
          readonly content: Schema.$Array<
            Schema.Struct<{ readonly file_id: Schema.String; readonly type: Schema.Literal<"code_execution_output"> }>
          >
          readonly return_code: Schema.Number
          readonly stderr: Schema.String
          readonly stdout: Schema.String
          readonly type: Schema.Literal<"code_execution_result">
        }>,
        Schema.Struct<{
          readonly content: Schema.$Array<
            Schema.Struct<{
              readonly file_id: Schema.String
              readonly type: Schema.Literal<"bash_code_execution_output">
            }>
          >
          readonly return_code: Schema.Number
          readonly stderr: Schema.String
          readonly stdout: Schema.String
          readonly type: Schema.Literal<"bash_code_execution_result">
        }>,
        Schema.Struct<{
          readonly content: Schema.String
          readonly file_type: Schema.Literals<readonly ["text", "image", "pdf"]>
          readonly num_lines: Schema.Union<readonly [Schema.Number, Schema.Null]>
          readonly start_line: Schema.Union<readonly [Schema.Number, Schema.Null]>
          readonly total_lines: Schema.Union<readonly [Schema.Number, Schema.Null]>
          readonly type: Schema.Literal<"text_editor_code_execution_view_result">
        }>,
        Schema.Struct<{
          readonly is_file_update: Schema.Boolean
          readonly type: Schema.Literal<"text_editor_code_execution_create_result">
        }>,
        Schema.Struct<{
          readonly lines: Schema.Union<readonly [Schema.$Array<Schema.String>, Schema.Null]>
          readonly new_lines: Schema.Union<readonly [Schema.Number, Schema.Null]>
          readonly new_start: Schema.Union<readonly [Schema.Number, Schema.Null]>
          readonly old_lines: Schema.Union<readonly [Schema.Number, Schema.Null]>
          readonly old_start: Schema.Union<readonly [Schema.Number, Schema.Null]>
          readonly type: Schema.Literal<"text_editor_code_execution_str_replace_result">
        }>
      ]
    >
    readonly failure: Schema.Union<
      readonly [
        Schema.Struct<{
          readonly error_code: Schema.Literals<
            readonly ["invalid_tool_input", "unavailable", "too_many_requests", "execution_time_exceeded"]
          >
          readonly type: Schema.Literal<"code_execution_tool_result_error">
        }>,
        Schema.Struct<{
          readonly error_code: Schema.Literals<
            readonly [
              "invalid_tool_input",
              "unavailable",
              "too_many_requests",
              "execution_time_exceeded",
              "output_file_too_large"
            ]
          >
          readonly type: Schema.Literal<"bash_code_execution_tool_result_error">
        }>,
        Schema.Struct<{
          readonly error_code: Schema.Literals<
            readonly [
              "invalid_tool_input",
              "unavailable",
              "too_many_requests",
              "execution_time_exceeded",
              "file_not_found"
            ]
          >
          readonly error_message: Schema.Union<readonly [Schema.String, Schema.Null]>
          readonly type: Schema.Literal<"text_editor_code_execution_tool_result_error">
        }>
      ]
    >
    readonly failureMode: Mode extends undefined ? "error" : Mode
  },
  false
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L439)

Since v4.0.0

## CodeExecution_20250825_Parameters

Schema for the 2025-08-25 code execution tool input, containing the code to execute.

**When to use**

Use when you need the schema for code-execution input at the Anthropic
protocol boundary before sending source code to the 2025-08-25 tool.

**See**

- `CodeExecution_20250825` for the provider-defined tool that consumes this schema

**Signature**

```ts
declare const CodeExecution_20250825_Parameters: Schema.Struct<{ readonly code: Schema.String }>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L362)

Since v4.0.0

## CodeExecution_20250825_Parameters (type alias)

Input payload for the 2025-08-25 Anthropic code execution tool.

**When to use**

Use when exposing the 2025-08-25 code-execution payload separately from the
provider tool definition, such as at a transport or persistence boundary.

**Details**

The payload has a single `code` field containing the source code string to
execute.

**See**

- `CodeExecution_20250825` for the provider-defined tool that consumes this payload

**Signature**

```ts
type CodeExecution_20250825_Parameters = typeof CodeExecution_20250825_Parameters.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L386)

Since v4.0.0

# Web Fetch

## WebFetchCitationsConfig

Defines citation configuration for web fetch.

**When to use**

Use when you need to enable or disable citations on web fetch results.

**Details**

The payload contains the `enabled` flag. `citations` is optional on
`WebFetch_20250910_Args`, and citations are disabled by default.

**See**

- `WebFetch_20250910_Args` for the argument schema that consumes this configuration

**Signature**

```ts
declare const WebFetchCitationsConfig: Schema.Struct<{ readonly enabled: Schema.Boolean }>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L2201)

Since v4.0.0

## WebFetchCitationsConfig (type alias)

Configuration payload for enabling or disabling citations on web fetch results.

**When to use**

Use when typing parsed web-fetch citation configuration shared between
request arguments and handler code.

**Details**

The payload contains the `enabled` flag. `citations` is optional on
`WebFetch_20250910_Args`, and citations are disabled by default.

**See**

- `WebFetch_20250910_Args` for the argument schema that consumes this configuration

**Signature**

```ts
type WebFetchCitationsConfig = typeof WebFetchCitationsConfig.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L2225)

Since v4.0.0

## WebFetchParameters

Schema for Claude-supplied web fetch parameters.

**When to use**

Use when validating or constructing the `url` payload consumed by
`WebFetch_20250910`.

**Details**

The payload contains the single `url` parameter for Anthropic web fetch.

**Gotchas**

The URL must be user-provided or from prior search/fetch results. Maximum URL
length is 250 characters.

**See**

- `WebFetch_20250910` for the provider-defined tool that consumes this payload

**Signature**

```ts
declare const WebFetchParameters: Schema.Struct<{ readonly url: Schema.String }>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L2327)

Since v4.0.0

## WebFetchParameters (type alias)

Type of the parameters Claude supplies when invoking the Anthropic web fetch tool.

**When to use**

Use when typing Claude-supplied web-fetch tool parameters after schema
validation, before enforcing URL provenance or length constraints.

**Details**

The payload contains the single `url` parameter for Anthropic web fetch.

**Gotchas**

The URL must be user-provided or from prior search/fetch results. Maximum URL
length is 250 characters.

**Signature**

```ts
type WebFetchParameters = typeof WebFetchParameters.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L2354)

Since v4.0.0

## WebFetch_20250910

Defines the web fetch tool for Claude models.

**When to use**

Use when you want Claude to retrieve the content of a specific web page or
PDF.

**Details**

Allows Claude to retrieve full content from web pages and PDF documents.
This is a server-side tool executed by Anthropic's infrastructure. Selecting
this tool adds the "web-fetch-2025-09-10" beta header.

**See**

- `WebSearch_20250305` for discovering URLs before fetching specific content

**Signature**

```ts
declare const WebFetch_20250910: <Mode extends Tool.FailureMode | undefined = undefined>(args: {
  readonly maxUses?: number | undefined
  readonly allowedDomains?: ReadonlyArray<string> | undefined
  readonly blockedDomains?: ReadonlyArray<string> | undefined
  readonly citations?: Schema.Struct.ReadonlySide<{ readonly enabled: Schema.Boolean }, "Encoded"> | undefined
  readonly maxContentTokens?: number | undefined
}) => Tool.ProviderDefined<
  "anthropic.web_fetch_20250910",
  "AnthropicWebFetch",
  {
    readonly args: Schema.Struct<{
      readonly maxUses: Schema.optional<Schema.Number>
      readonly allowedDomains: Schema.optional<Schema.$Array<Schema.String>>
      readonly blockedDomains: Schema.optional<Schema.$Array<Schema.String>>
      readonly citations: Schema.optional<Schema.Struct<{ readonly enabled: Schema.Boolean }>>
      readonly maxContentTokens: Schema.optional<Schema.Number>
    }>
    readonly parameters: Schema.Struct<{ readonly url: Schema.String }>
    readonly success: Schema.Struct<{
      readonly content: Schema.Struct<{
        readonly citations: Schema.Union<readonly [Schema.Struct<{ readonly enabled: Schema.Boolean }>, Schema.Null]>
        readonly source: Schema.Union<
          readonly [
            Schema.Struct<{
              readonly data: Schema.String
              readonly media_type: Schema.Literal<"application/pdf">
              readonly type: Schema.Literal<"base64">
            }>,
            Schema.Struct<{
              readonly data: Schema.String
              readonly media_type: Schema.Literal<"text/plain">
              readonly type: Schema.Literal<"text">
            }>
          ]
        >
        readonly title: Schema.Union<readonly [Schema.String, Schema.Null]>
        readonly type: Schema.Literal<"document">
      }>
      readonly retrieved_at: Schema.Union<readonly [Schema.String, Schema.Null]>
      readonly type: Schema.Literal<"web_fetch_result">
      readonly url: Schema.String
    }>
    readonly failure: Schema.Struct<{
      readonly error_code: Schema.Literals<
        readonly [
          "invalid_tool_input",
          "url_too_long",
          "url_not_allowed",
          "url_not_accessible",
          "unsupported_content_type",
          "too_many_requests",
          "max_uses_exceeded",
          "unavailable"
        ]
      >
      readonly type: Schema.Literal<"web_fetch_tool_result_error">
    }>
    readonly failureMode: Mode extends undefined ? "error" : Mode
  },
  false
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L2379)

Since v4.0.0

## WebFetch_20250910_Args

Defines configuration arguments for the web fetch tool.

**When to use**

Use when you need to configure `WebFetch_20250910` with usage limits, domain
filters, citations, or content token limits.

**Details**

The payload can set `maxUses`, domain filters, `citations`, and
`maxContentTokens`, which map to Anthropic web fetch request fields.

**Gotchas**

`allowedDomains` and `blockedDomains` are mutually exclusive.
`maxContentTokens` is approximate and does not apply to binary content such
as PDFs.

**See**

- `WebFetch_20250910` for the provider-defined tool that consumes these arguments
- `WebFetchCitationsConfig` for configuring citations

**Signature**

```ts
declare const WebFetch_20250910_Args: Schema.Struct<{
  readonly maxUses: Schema.optional<Schema.Number>
  readonly allowedDomains: Schema.optional<Schema.$Array<Schema.String>>
  readonly blockedDomains: Schema.optional<Schema.$Array<Schema.String>>
  readonly citations: Schema.optional<Schema.Struct<{ readonly enabled: Schema.Boolean }>>
  readonly maxContentTokens: Schema.optional<Schema.Number>
}>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L2256)

Since v4.0.0

## WebFetch_20250910_Args (type alias)

Configuration arguments for the Anthropic web fetch tool, including usage limits, domain filters, citation settings, and token limits.

**When to use**

Use when typing parsed web-fetch tool configuration shared by the
provider-defined tool and request-building code.

**Gotchas**

`allowedDomains` and `blockedDomains` are mutually exclusive.
`maxContentTokens` is approximate and does not apply to binary content such
as PDFs.

**Signature**

```ts
type WebFetch_20250910_Args = typeof WebFetch_20250910_Args.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L2299)

Since v4.0.0

# Web Search

## WebSearchParameters

Schema for Claude-supplied web search tool parameters.

**Details**

The payload contains the generated `query` string and is consumed by
`WebSearch_20250305`.

**See**

- `WebSearch_20250305` for the provider-defined tool that consumes this payload

**Signature**

```ts
declare const WebSearchParameters: Schema.Struct<{ readonly query: Schema.String }>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L2124)

Since v4.0.0

## WebSearchParameters (type alias)

Type of the parameters Claude supplies when invoking the Anthropic web search tool.

**Details**

Contains the generated search query used by `WebSearch_20250305`.

**See**

- `WebSearch_20250305` for the provider-defined tool that consumes this payload

**Signature**

```ts
type WebSearchParameters = typeof WebSearchParameters.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L2142)

Since v4.0.0

## WebSearchUserLocation

Describes user location for localizing search results.

**When to use**

Use when you need to localize search results for location-dependent queries
like weather, local businesses, or events.

**Details**

The schema uses `type: "approximate"` plus optional `city`, `region`,
`country`, and `timezone`. `country` is an ISO 3166-1 alpha-2 code, and
`timezone` is an IANA time zone identifier.

**See**

- `WebSearch_20250305_Args` for the argument schema that consumes this location

**Signature**

```ts
declare const WebSearchUserLocation: Schema.Struct<{
  readonly type: Schema.Literal<"approximate">
  readonly city: Schema.optional<Schema.String>
  readonly region: Schema.optional<Schema.String>
  readonly country: Schema.optional<Schema.String>
  readonly timezone: Schema.optional<Schema.String>
}>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L2023)

Since v4.0.0

## WebSearch_20250305

Defines the web search tool for Claude models.

**When to use**

Use when you want Claude to search the web for real-time information.

**Details**

Enables Claude to search the web for real-time information. This is a
server-side tool executed by Anthropic's infrastructure.
Generally available (no beta header required).

**See**

- `WebFetch_20250910` for retrieving known URLs after discovery

**Signature**

```ts
declare const WebSearch_20250305: <Mode extends Tool.FailureMode | undefined = undefined>(args: {
  readonly maxUses?: number | undefined
  readonly allowedDomains?: ReadonlyArray<string> | undefined
  readonly blockedDomains?: ReadonlyArray<string> | undefined
  readonly userLocation?:
    | {
        readonly type: "approximate"
        readonly region?: string | undefined
        readonly city?: string | undefined
        readonly country?: string | undefined
        readonly timezone?: string | undefined
      }
    | undefined
}) => Tool.ProviderDefined<
  "anthropic.web_search_20250305",
  "AnthropicWebSearch",
  {
    readonly args: Schema.Struct<{
      readonly maxUses: Schema.optional<Schema.Number>
      readonly allowedDomains: Schema.optional<Schema.$Array<Schema.String>>
      readonly blockedDomains: Schema.optional<Schema.$Array<Schema.String>>
      readonly userLocation: Schema.optional<
        Schema.Struct<{
          readonly type: Schema.Literal<"approximate">
          readonly city: Schema.optional<Schema.String>
          readonly region: Schema.optional<Schema.String>
          readonly country: Schema.optional<Schema.String>
          readonly timezone: Schema.optional<Schema.String>
        }>
      >
    }>
    readonly parameters: Schema.Struct<{ readonly query: Schema.String }>
    readonly success: Schema.$Array<
      Schema.Struct<{
        readonly encrypted_content: Schema.String
        readonly page_age: Schema.Union<readonly [Schema.String, Schema.Null]>
        readonly title: Schema.String
        readonly type: Schema.Literal<"web_search_result">
        readonly url: Schema.String
      }>
    >
    readonly failure: Schema.Struct<{
      readonly error_code: Schema.Literals<
        readonly [
          "invalid_tool_input",
          "unavailable",
          "max_uses_exceeded",
          "too_many_requests",
          "query_too_long",
          "request_too_large"
        ]
      >
      readonly type: Schema.Literal<"web_search_tool_result_error">
    }>
    readonly failureMode: Mode extends undefined ? "error" : Mode
  },
  false
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L2166)

Since v4.0.0

## WebSearch_20250305_Args

Defines configuration arguments for the web search tool.

**When to use**

Use when you need to configure `WebSearch_20250305` with search limits,
domain filters, or user location.

**Details**

The payload can set `maxUses`, `allowedDomains`, `blockedDomains`, and
`userLocation`.

**Gotchas**

`allowedDomains` and `blockedDomains` are mutually exclusive.

**See**

- `WebSearch_20250305` for the provider-defined tool that consumes these arguments
- `WebSearchUserLocation` for localizing search results

**Signature**

```ts
declare const WebSearch_20250305_Args: Schema.Struct<{
  readonly maxUses: Schema.optional<Schema.Number>
  readonly allowedDomains: Schema.optional<Schema.$Array<Schema.String>>
  readonly blockedDomains: Schema.optional<Schema.$Array<Schema.String>>
  readonly userLocation: Schema.optional<
    Schema.Struct<{
      readonly type: Schema.Literal<"approximate">
      readonly city: Schema.optional<Schema.String>
      readonly region: Schema.optional<Schema.String>
      readonly country: Schema.optional<Schema.String>
      readonly timezone: Schema.optional<Schema.String>
    }>
  >
}>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L2073)

Since v4.0.0

## WebSearch_20250305_Args (type alias)

Configuration arguments for the Anthropic web search tool, including usage limits, domain filters, and optional user location.

**Gotchas**

`allowedDomains` and `blockedDomains` are mutually exclusive.

**Signature**

```ts
type WebSearch_20250305_Args = typeof WebSearch_20250305_Args.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L2105)

Since v4.0.0

# computer use

## ComputerUseDoubleClickAction

Schema for a computer-use action that performs a double click.

**When to use**

Use to validate or construct an Anthropic computer-use payload for double
clicking at the current mouse position or at a specific screen coordinate.

**Details**

The encoded payload uses `action: "double_click"`. The optional
`coordinate` field supplies the `[x, y]` pixel position; when omitted, the
action uses the current mouse position.

**Gotchas**

The coordinate schema only checks that the value is a two-number tuple. It
does not validate that the point falls within the configured display
dimensions.

**See**

- `ComputerUseLeftClickAction` for performing a single left click

**Signature**

```ts
declare const ComputerUseDoubleClickAction: Schema.Struct<{
  readonly action: Schema.Literal<"double_click">
  readonly coordinate: Schema.optional<Schema.Tuple<readonly [Schema.Number, Schema.Number]>>
}>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L826)

Since v4.0.0

## ComputerUseDoubleClickAction (type alias)

Computer-use action payload for performing a double click, optionally at a specific coordinate.

**Signature**

```ts
type ComputerUseDoubleClickAction = typeof ComputerUseDoubleClickAction.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L840)

Since v4.0.0

## ComputerUseHoldKeyAction

Keeps a key pressed for a specified duration during computer-use execution.

**When to use**

Use to keep a keyboard key depressed for a fixed number of seconds in a
computer-use action sequence.

**Details**

The schema describes objects with `action: "hold_key"`, a `text` field
containing the key to hold, and a `duration` field containing the number of
seconds to hold it.

**Gotchas**

The schema only checks that `duration` is a number; it does not require a
positive value.

**See**

- `ComputerUseKeyAction` for pressing a key or key combination without holding it
- `ComputerUseWaitAction` for pausing between actions without holding a key

**Signature**

```ts
declare const ComputerUseHoldKeyAction: Schema.Struct<{
  readonly action: Schema.Literal<"hold_key">
  readonly text: Schema.String
  readonly duration: Schema.Number
}>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L867)

Since v4.0.0

## ComputerUseHoldKeyAction (type alias)

Computer-use action payload for holding a key for a specified duration.

**When to use**

Use to represent a key that should remain pressed for a measured interval.

**Details**

Set `action` to `"hold_key"`, `text` to the key to hold, and `duration` to
the number of seconds to hold it.

**See**

- `ComputerUseKeyAction` for a single key press or key combination without a hold duration

**Signature**

```ts
type ComputerUseHoldKeyAction = typeof ComputerUseHoldKeyAction.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L895)

Since v4.0.0

## ComputerUseKeyAction

Schema for a computer-use action that presses a key or key combination, such
as `"Return"`, `"ctrl+c"`, or `"ctrl+s"`.

**When to use**

Use when validating or constructing a computer-use action for keyboard
shortcuts or non-text key presses.

**See**

- `TypeAction` for entering ordinary text strings
- `ComputerUseHoldKeyAction` for holding a key for a duration

**Signature**

```ts
declare const ComputerUseKeyAction: Schema.Struct<{
  readonly action: Schema.Literal<"key">
  readonly text: Schema.String
}>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L611)

Since v4.0.0

## ComputerUseKeyAction (type alias)

Computer-use action payload for pressing a key or key combination.

**When to use**

Use when typing parsed computer-use key action payloads after schema
validation, where provider-specific key-name validation is handled outside
TypeScript.

**Details**

The payload uses `action: "key"` and stores the key or key combination to
press in `text`, such as `"Return"`, `"ctrl+c"`, or `"ctrl+s"`.

**Gotchas**

`text` is typed as `string`; the paired schema does not validate
provider-specific key names or key combinations.

**Signature**

```ts
type ComputerUseKeyAction = typeof ComputerUseKeyAction.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L640)

Since v4.0.0

## ComputerUseLeftClickAction

Schema for a computer-use action that performs a left click.

**When to use**

Use to validate or construct an Anthropic computer-use payload for clicking
once at the current mouse position or at a specific screen coordinate.

**Details**

The encoded payload uses `action: "left_click"`. The optional `coordinate`
field supplies the `[x, y]` pixel position; when omitted, the action uses the
current mouse position.

**Gotchas**

The coordinate schema only checks that the value is a two-number tuple. It
does not validate that the point falls within the configured display
dimensions.

**See**

- `ComputerUseDoubleClickAction` for performing a double click
- `ComputerUseMouseMoveAction` for moving the mouse without clicking

**Signature**

```ts
declare const ComputerUseLeftClickAction: Schema.Struct<{
  readonly action: Schema.Literal<"left_click">
  readonly coordinate: Schema.optional<Schema.Tuple<readonly [Schema.Number, Schema.Number]>>
}>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L668)

Since v4.0.0

## ComputerUseLeftClickAction (type alias)

Computer-use action payload for performing a left click, optionally at a specific coordinate.

**Signature**

```ts
type ComputerUseLeftClickAction = typeof ComputerUseLeftClickAction.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L682)

Since v4.0.0

## ComputerUseLeftClickDragAction

Schema for a computer-use action that drags with the left mouse button.

**When to use**

Use to validate or construct an Anthropic computer-use payload for dragging
from one screen coordinate to another in a single action.

**Details**

The encoded payload uses `action: "left_click_drag"` and requires both
`start_coordinate` and `coordinate` as `[x, y]` pixel positions.

**Gotchas**

The coordinate schema only checks that each value is a two-number tuple. It
does not validate that either point falls within the configured display
dimensions.

**See**

- `ComputerUseLeftMouseDownAction` for starting a manual drag sequence
- `ComputerUseLeftMouseUpAction` for ending a manual drag sequence

**Signature**

```ts
declare const ComputerUseLeftClickDragAction: Schema.Struct<{
  readonly action: Schema.Literal<"left_click_drag">
  readonly start_coordinate: Schema.Tuple<readonly [Schema.Number, Schema.Number]>
  readonly coordinate: Schema.Tuple<readonly [Schema.Number, Schema.Number]>
}>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L922)

Since v4.0.0

## ComputerUseLeftClickDragAction (type alias)

Computer-use action payload for dragging from a start coordinate to an end coordinate.

**Signature**

```ts
type ComputerUseLeftClickDragAction = typeof ComputerUseLeftClickDragAction.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L939)

Since v4.0.0

## ComputerUseLeftMouseDownAction

Starts a left mouse button press without releasing it.

**When to use**

Use when constructing a manual click or drag sequence that should press and
hold the left mouse button before a later release.

**Signature**

```ts
declare const ComputerUseLeftMouseDownAction: Schema.Struct<{
  readonly action: Schema.Literal<"left_mouse_down">
  readonly coordinate: Schema.optional<Schema.Tuple<readonly [Schema.Number, Schema.Number]>>
}>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L952)

Since v4.0.0

## ComputerUseLeftMouseDownAction (type alias)

Computer-use action payload for pressing and holding the left mouse button, optionally at a specific coordinate.

**Signature**

```ts
type ComputerUseLeftMouseDownAction = typeof ComputerUseLeftMouseDownAction.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L966)

Since v4.0.0

## ComputerUseLeftMouseUpAction

Releases the left mouse button.

**When to use**

Use when constructing a manual click or drag sequence that should release the
left mouse button after it was previously held down.

**Signature**

```ts
declare const ComputerUseLeftMouseUpAction: Schema.Struct<{
  readonly action: Schema.Literal<"left_mouse_up">
  readonly coordinate: Schema.optional<Schema.Tuple<readonly [Schema.Number, Schema.Number]>>
}>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L979)

Since v4.0.0

## ComputerUseLeftMouseUpAction (type alias)

Computer-use action payload for releasing the left mouse button, optionally at a specific coordinate.

**Signature**

```ts
type ComputerUseLeftMouseUpAction = typeof ComputerUseLeftMouseUpAction.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L993)

Since v4.0.0

## ComputerUseMiddleClickAction

Schema for a computer-use action that performs a middle click.

**When to use**

Use to validate or construct a middle-button click action for Anthropic
computer use, optionally targeting a specific screen coordinate.

**Details**

The payload must use `action: "middle_click"`. When `coordinate` is omitted,
the click occurs at the current mouse position.

**Gotchas**

This action is available in the 2025-01-24 computer-use action set and later;
it is not part of `ComputerUse_20241022`.

**See**

- `ComputerUse_20250124` for the provider-defined tool version that first accepts this action
- `ComputerUseLeftClickAction` for primary-button clicks
- `ComputerUseRightClickAction` for secondary-button clicks

**Signature**

```ts
declare const ComputerUseMiddleClickAction: Schema.Struct<{
  readonly action: Schema.Literal<"middle_click">
  readonly coordinate: Schema.optional<Schema.Tuple<readonly [Schema.Number, Schema.Number]>>
}>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L1020)

Since v4.0.0

## ComputerUseMiddleClickAction (type alias)

Computer-use action payload for performing a middle click, optionally at a specific coordinate.

**Signature**

```ts
type ComputerUseMiddleClickAction = typeof ComputerUseMiddleClickAction.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L1034)

Since v4.0.0

## ComputerUseMouseMoveAction

Schema for a computer-use action that moves the mouse cursor to a required
`[x, y]` screen coordinate.

**When to use**

Use to validate or construct a mouse movement action for an Anthropic
computer-use tool call.

**Details**

The encoded payload has action `"mouse_move"` and a required `coordinate`
field containing the target `[x, y]` pixel position.

**Gotchas**

The coordinate schema only checks that the value is a two-number tuple. It
does not validate that the point falls within the configured display
dimensions.

**Signature**

```ts
declare const ComputerUseMouseMoveAction: Schema.Struct<{
  readonly action: Schema.Literal<"mouse_move">
  readonly coordinate: Schema.Tuple<readonly [Schema.Number, Schema.Number]>
}>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L707)

Since v4.0.0

## ComputerUseMouseMoveAction (type alias)

Computer-use action payload for moving the mouse cursor to a specific coordinate.

**Signature**

```ts
type ComputerUseMouseMoveAction = typeof ComputerUseMouseMoveAction.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L720)

Since v4.0.0

## ComputerUseRightClickAction

Schema for a computer-use action that performs a right click, optionally at a
specific screen coordinate.

**When to use**

Use to validate or construct the `right_click` action for an Anthropic
computer-use tool call.

**Details**

The optional `coordinate` field is an `[x, y]` screen coordinate in pixels.
When omitted, the right click is performed at the current mouse position.

**See**

- `ComputerUse_20250124` for the provider-defined computer-use tool version that introduced this action
- `ComputerUseLeftClickAction` for the corresponding left-click action
- `ComputerUseMiddleClickAction` for the corresponding middle-click action

**Signature**

```ts
declare const ComputerUseRightClickAction: Schema.Struct<{
  readonly action: Schema.Literal<"right_click">
  readonly coordinate: Schema.optional<Schema.Tuple<readonly [Schema.Number, Schema.Number]>>
}>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L1057)

Since v4.0.0

## ComputerUseRightClickAction (type alias)

Computer-use action payload for performing a right click, optionally at a specific coordinate.

**Signature**

```ts
type ComputerUseRightClickAction = typeof ComputerUseRightClickAction.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L1071)

Since v4.0.0

## ComputerUseScreenshotAction

Schema for a computer-use action that requests a screenshot of the current display.

**When to use**

Use to validate or construct a computer-use tool action that asks the handler
to capture the full current display.

**Details**

The payload contains only `action: "screenshot"` and does not include
coordinates or other options.

**See**

- `ComputerUseZoomAction` for requesting a zoomed-in screenshot of a specific screen region with the 2025-11-24 computer-use tool

**Signature**

```ts
declare const ComputerUseScreenshotAction: Schema.Struct<{ readonly action: Schema.Literal<"screenshot"> }>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L740)

Since v4.0.0

## ComputerUseScreenshotAction (type alias)

Computer-use action payload for capturing the current display.

**Signature**

```ts
type ComputerUseScreenshotAction = typeof ComputerUseScreenshotAction.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L749)

Since v4.0.0

## ComputerUseScrollAction

Schema for a computer-use scroll action.

**When to use**

Use when validating or constructing Anthropic computer-use scroll payloads.

**Details**

The encoded payload uses `action: "scroll"`, an optional `coordinate`,
`scroll_direction`, and `scroll_amount`.

**Gotchas**

`coordinate` only checks a two-number tuple, and `scroll_amount` is only
`Schema.Number`.

**See**

- `ComputerUse_20250124` for the tool version that accepts this action
- `ScrollDirection` for the accepted direction literals

**Signature**

```ts
declare const ComputerUseScrollAction: Schema.Struct<{
  readonly action: Schema.Literal<"scroll">
  readonly coordinate: Schema.optional<Schema.Tuple<readonly [Schema.Number, Schema.Number]>>
  readonly scroll_direction: Schema.Literals<readonly ["up", "down", "left", "right"]>
  readonly scroll_amount: Schema.Number
}>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L1096)

Since v4.0.0

## ComputerUseScrollAction (type alias)

Computer-use action payload for scrolling by a specified amount in a specified direction, optionally from a coordinate.

**Signature**

```ts
type ComputerUseScrollAction = typeof ComputerUseScrollAction.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L1118)

Since v4.0.0

## ComputerUseTripleClickAction

Schema for a computer-use triple-click action.

**When to use**

Use when validating or constructing Anthropic computer-use triple-click
payloads at the current pointer position or an optional coordinate.

**Details**

The encoded payload uses `action: "triple_click"` and an optional
`coordinate`.

**Gotchas**

`coordinate` only validates as a two-number tuple and does not check display
bounds.

**See**

- `ComputerUse_20250124` for the tool version that accepts this action
- `ComputerUseDoubleClickAction` for the two-click variant
- `ComputerUseLeftClickAction` for a single left click

**Signature**

```ts
declare const ComputerUseTripleClickAction: Schema.Struct<{
  readonly action: Schema.Literal<"triple_click">
  readonly coordinate: Schema.optional<Schema.Tuple<readonly [Schema.Number, Schema.Number]>>
}>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L1145)

Since v4.0.0

## ComputerUseTripleClickAction (type alias)

Computer-use action payload for performing a triple click, optionally at a specific coordinate.

**Signature**

```ts
type ComputerUseTripleClickAction = typeof ComputerUseTripleClickAction.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L1159)

Since v4.0.0

## ComputerUseWaitAction

Schema for a computer-use wait action.

**When to use**

Use when validating or constructing Anthropic computer-use payloads that pause
between actions.

**Details**

The encoded payload uses `action: "wait"` and a required `duration` in
seconds.

**Gotchas**

`duration` is only `Schema.Number`; it is not constrained to positive or
finite values.

**See**

- `ComputerUseHoldKeyAction` for another duration-based computer-use action
- `ComputerUse_20250124` for the tool version that accepts this action

**Signature**

```ts
declare const ComputerUseWaitAction: Schema.Struct<{
  readonly action: Schema.Literal<"wait">
  readonly duration: Schema.Number
}>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L1185)

Since v4.0.0

## ComputerUseWaitAction (type alias)

Computer-use action payload for pausing for a specified duration.

**Signature**

```ts
type ComputerUseWaitAction = typeof ComputerUseWaitAction.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L1198)

Since v4.0.0

## ComputerUseZoomAction

Zooms into a specific region of the screen at full resolution.

**When to use**

Use when building or validating the 2025-11-24 computer-use action for a
zoom-enabled tool definition.

**Details**

The encoded payload uses `action: "zoom"` and a `region` tuple.

**Gotchas**

Requires `enableZoom: true` in the tool definition. `region` is only a
four-number tuple and does not validate corner ordering or display bounds.

**See**

- `ComputerUse_20251124` for the tool version that accepts this action
- `ComputerUseScreenshotAction` for capturing the full screen instead

**Signature**

```ts
declare const ComputerUseZoomAction: Schema.Struct<{
  readonly action: Schema.Literal<"zoom">
  readonly region: Schema.Tuple<readonly [Schema.Number, Schema.Number, Schema.Number, Schema.Number]>
}>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L1241)

Since v4.0.0

## ComputerUseZoomAction (type alias)

Computer-use action payload for zooming into a specific screen region.

**Gotchas**

The enclosing computer-use tool must be configured with `enableZoom: true`.
`region` is only a four-number tuple and does not validate corner ordering or
display bounds.

**Signature**

```ts
type ComputerUseZoomAction = typeof ComputerUseZoomAction.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L1261)

Since v4.0.0

## ComputerUse_20241022

Defines the deprecated computer-use tool for Claude 3.5 Sonnet v2.

**Details**

Requires the "computer-use-2024-10-22" beta header.
Basic actions only: screenshot, left_click, type, key, mouse_move.

**Signature**

```ts
declare const ComputerUse_20241022: <Mode extends Tool.FailureMode | undefined = undefined>(args: {
  readonly displayWidthPx: number
  readonly displayHeightPx: number
  readonly displayNumber?: number | undefined
  readonly failureMode?: Mode | undefined
}) => Tool.ProviderDefined<
  "anthropic.computer_use_20241022",
  "AnthropicComputerUse",
  {
    readonly args: Schema.Struct<{
      readonly displayWidthPx: Schema.Number
      readonly displayHeightPx: Schema.Number
      readonly displayNumber: Schema.optional<Schema.Number>
    }>
    readonly parameters: Schema.Union<
      readonly [
        Schema.Struct<{ readonly action: Schema.Literal<"key">; readonly text: Schema.String }>,
        Schema.Struct<{
          readonly action: Schema.Literal<"left_click">
          readonly coordinate: Schema.optional<Schema.Tuple<readonly [Schema.Number, Schema.Number]>>
        }>,
        Schema.Struct<{
          readonly action: Schema.Literal<"mouse_move">
          readonly coordinate: Schema.Tuple<readonly [Schema.Number, Schema.Number]>
        }>,
        Schema.Struct<{ readonly action: Schema.Literal<"screenshot"> }>,
        Schema.Struct<{ readonly action: Schema.Literal<"type">; readonly text: Schema.String }>
      ]
    >
    readonly success: Schema.String
    readonly failure: Schema.Never
    readonly failureMode: Mode extends undefined ? "error" : Mode
  },
  true
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L1283)

Since v4.0.0

## ComputerUse_20250124

Defines the computer-use tool for Claude 4 models and Claude Sonnet 3.7.

**When to use**

Use when you need Anthropic computer use for Claude 4 models or Claude
Sonnet 3.7 with the 2025-01-24 action set.

**Details**

Requires the "computer-use-2025-01-24" beta header.
Includes basic actions plus enhanced actions: scroll, left_click_drag,
right_click, middle_click, double_click, triple_click, left_mouse_down,
left_mouse_up, hold_key, wait.

**See**

- `ComputerUse_20241022` for the older basic action set
- `ComputerUse_20251124` for the newer zoom-capable version

**Signature**

```ts
declare const ComputerUse_20250124: <Mode extends Tool.FailureMode | undefined = undefined>(args: {
  readonly displayWidthPx: number
  readonly displayHeightPx: number
  readonly displayNumber?: number | undefined
  readonly failureMode?: Mode | undefined
}) => Tool.ProviderDefined<
  "anthropic.computer_20250124",
  "AnthropicComputerUse",
  {
    readonly args: Schema.Struct<{
      readonly displayWidthPx: Schema.Number
      readonly displayHeightPx: Schema.Number
      readonly displayNumber: Schema.optional<Schema.Number>
    }>
    readonly parameters: Schema.Union<
      readonly [
        Schema.Struct<{ readonly action: Schema.Literal<"key">; readonly text: Schema.String }>,
        Schema.Struct<{
          readonly action: Schema.Literal<"left_click">
          readonly coordinate: Schema.optional<Schema.Tuple<readonly [Schema.Number, Schema.Number]>>
        }>,
        Schema.Struct<{
          readonly action: Schema.Literal<"mouse_move">
          readonly coordinate: Schema.Tuple<readonly [Schema.Number, Schema.Number]>
        }>,
        Schema.Struct<{ readonly action: Schema.Literal<"screenshot"> }>,
        Schema.Struct<{ readonly action: Schema.Literal<"type">; readonly text: Schema.String }>,
        Schema.Struct<{
          readonly action: Schema.Literal<"double_click">
          readonly coordinate: Schema.optional<Schema.Tuple<readonly [Schema.Number, Schema.Number]>>
        }>,
        Schema.Struct<{
          readonly action: Schema.Literal<"hold_key">
          readonly text: Schema.String
          readonly duration: Schema.Number
        }>,
        Schema.Struct<{
          readonly action: Schema.Literal<"left_click_drag">
          readonly start_coordinate: Schema.Tuple<readonly [Schema.Number, Schema.Number]>
          readonly coordinate: Schema.Tuple<readonly [Schema.Number, Schema.Number]>
        }>,
        Schema.Struct<{
          readonly action: Schema.Literal<"left_mouse_down">
          readonly coordinate: Schema.optional<Schema.Tuple<readonly [Schema.Number, Schema.Number]>>
        }>,
        Schema.Struct<{
          readonly action: Schema.Literal<"left_mouse_up">
          readonly coordinate: Schema.optional<Schema.Tuple<readonly [Schema.Number, Schema.Number]>>
        }>,
        Schema.Struct<{
          readonly action: Schema.Literal<"middle_click">
          readonly coordinate: Schema.optional<Schema.Tuple<readonly [Schema.Number, Schema.Number]>>
        }>,
        Schema.Struct<{
          readonly action: Schema.Literal<"right_click">
          readonly coordinate: Schema.optional<Schema.Tuple<readonly [Schema.Number, Schema.Number]>>
        }>,
        Schema.Struct<{
          readonly action: Schema.Literal<"scroll">
          readonly coordinate: Schema.optional<Schema.Tuple<readonly [Schema.Number, Schema.Number]>>
          readonly scroll_direction: Schema.Literals<readonly ["up", "down", "left", "right"]>
          readonly scroll_amount: Schema.Number
        }>,
        Schema.Struct<{
          readonly action: Schema.Literal<"triple_click">
          readonly coordinate: Schema.optional<Schema.Tuple<readonly [Schema.Number, Schema.Number]>>
        }>,
        Schema.Struct<{ readonly action: Schema.Literal<"wait">; readonly duration: Schema.Number }>
      ]
    >
    readonly success: Schema.String
    readonly failure: Schema.Never
    readonly failureMode: Mode extends undefined ? "error" : Mode
  },
  true
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L1314)

Since v4.0.0

## ComputerUse_20251124

Defines the computer-use tool for Claude Opus 4.5 only.

**When to use**

Use when you need Anthropic computer use for Claude Opus 4.5 with the
2025-11-24 action set and zoom-capable screen inspection.

**Details**

Requires the "computer-use-2025-11-24" beta header.
Includes all actions from computer_20250124 plus the zoom action for
detailed screen region inspection.

**Gotchas**

Zoom actions require `enableZoom: true` in args.

**See**

- `ComputerUse_20250124` for the previous action set without zoom
- `ComputerUseZoomAction` for the zoom action payload

**Signature**

```ts
declare const ComputerUse_20251124: <Mode extends Tool.FailureMode | undefined = undefined>(args: {
  readonly displayWidthPx: number
  readonly displayHeightPx: number
  readonly displayNumber?: number | undefined
  readonly enableZoom?: boolean | undefined
  readonly failureMode?: Mode | undefined
}) => Tool.ProviderDefined<
  "anthropic.computer_20251124",
  "AnthropicComputerUse",
  {
    readonly args: Schema.Struct<{
      readonly enableZoom: Schema.optional<Schema.Boolean>
      readonly displayWidthPx: Schema.Number
      readonly displayHeightPx: Schema.Number
      readonly displayNumber: Schema.optional<Schema.Number>
    }>
    readonly parameters: Schema.Union<
      readonly [
        Schema.Struct<{ readonly action: Schema.Literal<"key">; readonly text: Schema.String }>,
        Schema.Struct<{
          readonly action: Schema.Literal<"left_click">
          readonly coordinate: Schema.optional<Schema.Tuple<readonly [Schema.Number, Schema.Number]>>
        }>,
        Schema.Struct<{
          readonly action: Schema.Literal<"mouse_move">
          readonly coordinate: Schema.Tuple<readonly [Schema.Number, Schema.Number]>
        }>,
        Schema.Struct<{ readonly action: Schema.Literal<"screenshot"> }>,
        Schema.Struct<{ readonly action: Schema.Literal<"type">; readonly text: Schema.String }>,
        Schema.Struct<{
          readonly action: Schema.Literal<"double_click">
          readonly coordinate: Schema.optional<Schema.Tuple<readonly [Schema.Number, Schema.Number]>>
        }>,
        Schema.Struct<{
          readonly action: Schema.Literal<"hold_key">
          readonly text: Schema.String
          readonly duration: Schema.Number
        }>,
        Schema.Struct<{
          readonly action: Schema.Literal<"left_click_drag">
          readonly start_coordinate: Schema.Tuple<readonly [Schema.Number, Schema.Number]>
          readonly coordinate: Schema.Tuple<readonly [Schema.Number, Schema.Number]>
        }>,
        Schema.Struct<{
          readonly action: Schema.Literal<"left_mouse_down">
          readonly coordinate: Schema.optional<Schema.Tuple<readonly [Schema.Number, Schema.Number]>>
        }>,
        Schema.Struct<{
          readonly action: Schema.Literal<"left_mouse_up">
          readonly coordinate: Schema.optional<Schema.Tuple<readonly [Schema.Number, Schema.Number]>>
        }>,
        Schema.Struct<{
          readonly action: Schema.Literal<"middle_click">
          readonly coordinate: Schema.optional<Schema.Tuple<readonly [Schema.Number, Schema.Number]>>
        }>,
        Schema.Struct<{
          readonly action: Schema.Literal<"right_click">
          readonly coordinate: Schema.optional<Schema.Tuple<readonly [Schema.Number, Schema.Number]>>
        }>,
        Schema.Struct<{
          readonly action: Schema.Literal<"scroll">
          readonly coordinate: Schema.optional<Schema.Tuple<readonly [Schema.Number, Schema.Number]>>
          readonly scroll_direction: Schema.Literals<readonly ["up", "down", "left", "right"]>
          readonly scroll_amount: Schema.Number
        }>,
        Schema.Struct<{
          readonly action: Schema.Literal<"triple_click">
          readonly coordinate: Schema.optional<Schema.Tuple<readonly [Schema.Number, Schema.Number]>>
        }>,
        Schema.Struct<{ readonly action: Schema.Literal<"wait">; readonly duration: Schema.Number }>,
        Schema.Struct<{
          readonly action: Schema.Literal<"zoom">
          readonly region: Schema.Tuple<readonly [Schema.Number, Schema.Number, Schema.Number, Schema.Number]>
        }>
      ]
    >
    readonly success: Schema.String
    readonly failure: Schema.Never
    readonly failureMode: Mode extends undefined ? "error" : Mode
  },
  true
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L1348)

Since v4.0.0

## Coordinate

Schema for an `[x, y]` screen coordinate in pixels.

**When to use**

Use when validating computer-use action payloads that carry a single screen
position and provider-side bounds checks remain acceptable.

**Details**

This is a two-number tuple used by computer-use actions that accept screen
positions.

**Gotchas**

This schema validates tuple shape only and does not check display bounds.

**Signature**

```ts
declare const Coordinate: Schema.Tuple<readonly [Schema.Number, Schema.Number]>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L486)

Since v4.0.0

## Coordinate (type alias)

An `[x, y]` screen coordinate in pixels.

**Signature**

```ts
type Coordinate = typeof Coordinate.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L493)

Since v4.0.0

## ModifierKey

Schema for modifier key literals.

**Details**

Allowed values are `"alt"`, `"ctrl"`, `"meta"`, and `"shift"`.

**Signature**

```ts
declare const ModifierKey: Schema.Literals<readonly ["alt", "ctrl", "meta", "shift"]>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L551)

Since v4.0.0

## ModifierKey (type alias)

Modifier key literals.

**Details**

Allowed values are `"alt"`, `"ctrl"`, `"meta"`, and `"shift"`.

**Signature**

```ts
type ModifierKey = typeof ModifierKey.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L562)

Since v4.0.0

## Region

Schema for an `[x1, y1, x2, y2]` screen region in pixels.

**When to use**

Use when validating computer-use action payloads that carry a rectangular
screen region and provider-side bounds checks remain acceptable.

**Details**

The tuple represents top-left and bottom-right corners.

**Gotchas**

This schema validates four numbers only and does not check coordinate ordering
or display bounds.

**Signature**

```ts
declare const Region: Schema.Tuple<readonly [Schema.Number, Schema.Number, Schema.Number, Schema.Number]>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L515)

Since v4.0.0

## Region (type alias)

An `[x1, y1, x2, y2]` screen region in pixels, from top-left to bottom-right.

**Signature**

```ts
type Region = typeof Region.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L522)

Since v4.0.0

## ScrollDirection

Schema for scroll direction literals: `"up"`, `"down"`, `"left"`, or `"right"`.

**See**

- `ComputerUseScrollAction` for the action payload that consumes this schema

**Signature**

```ts
declare const ScrollDirection: Schema.Literals<readonly ["up", "down", "left", "right"]>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L532)

Since v4.0.0

## ScrollDirection (type alias)

Direction used by computer-use scroll actions: `"up"`, `"down"`, `"left"`, or `"right"`.

**Signature**

```ts
type ScrollDirection = typeof ScrollDirection.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L539)

Since v4.0.0

## TypeAction

Schema for a computer-use action that enters text.

**When to use**

Use to validate or construct a computer-use action for entering ordinary text
strings.

**Details**

The payload uses `action: "type"` and a `text` string containing the text to
enter.

**See**

- `ComputerUseKeyAction` for key presses and keyboard shortcuts

**Signature**

```ts
declare const TypeAction: Schema.Struct<{ readonly action: Schema.Literal<"type">; readonly text: Schema.String }>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L769)

Since v4.0.0

## TypeAction (type alias)

Computer-use action payload for typing a text string.

**Details**

The payload uses `action: "type"` and a `text` string containing the text to
enter.

**Signature**

```ts
type TypeAction = typeof TypeAction.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L787)

Since v4.0.0

# memory

## MemoryCreateCommand

Schema for the memory tool command that creates a new file at a path.

**Details**

The payload contains `command: "create"` and a `path` string.

**Signature**

```ts
declare const MemoryCreateCommand: Schema.Struct<{
  readonly command: Schema.Literal<"create">
  readonly path: Schema.String
}>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L1413)

Since v4.0.0

## MemoryCreateCommand (type alias)

Memory tool command payload for creating a new file at a path.

**Signature**

```ts
type MemoryCreateCommand = typeof MemoryCreateCommand.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L1426)

Since v4.0.0

## MemoryDeleteCommand

Schema for a memory command that deletes a file or directory.

**Signature**

```ts
declare const MemoryDeleteCommand: Schema.Struct<{
  readonly command: Schema.Literal<"delete">
  readonly path: Schema.String
}>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L1434)

Since v4.0.0

## MemoryDeleteCommand (type alias)

Memory tool command payload for deleting a file or directory at a path.

**Signature**

```ts
type MemoryDeleteCommand = typeof MemoryDeleteCommand.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L1447)

Since v4.0.0

## MemoryInsertCommand

Schema for the memory `insert` command.

**When to use**

Use when validating or constructing `insert` payloads for `Memory_20250818`.

**Details**

The payload is discriminated by `command: "insert"` and requires `path`,
`insert_line`, and `insert_text`.

**See**

- `Memory_20250818` for the provider-defined tool that consumes this command
- `MemoryStrReplaceCommand` for replacing existing text instead

**Signature**

```ts
declare const MemoryInsertCommand: Schema.Struct<{
  readonly command: Schema.Literal<"insert">
  readonly path: Schema.String
  readonly insert_line: Schema.Number
  readonly insert_text: Schema.String
}>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L1467)

Since v4.0.0

## MemoryInsertCommand (type alias)

Memory tool command payload for inserting text at a specific line in a file.

**Signature**

```ts
type MemoryInsertCommand = typeof MemoryInsertCommand.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L1488)

Since v4.0.0

## MemoryRenameCommand

Schema for the memory command that renames or moves a file or directory.

**Details**

The payload uses `command: "rename"` and requires `old_path` as the current
path plus `new_path` as the new destination path.

**Signature**

```ts
declare const MemoryRenameCommand: Schema.Struct<{
  readonly command: Schema.Literal<"rename">
  readonly old_path: Schema.String
  readonly new_path: Schema.String
}>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L1501)

Since v4.0.0

## MemoryRenameCommand (type alias)

Memory tool command payload for renaming or moving a file or directory.

**Signature**

```ts
type MemoryRenameCommand = typeof MemoryRenameCommand.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L1518)

Since v4.0.0

## MemoryStrReplaceCommand

Schema for the memory `str_replace` command.

**When to use**

Use when validating or constructing `str_replace` payloads for
`Memory_20250818`.

**Details**

The payload is discriminated by `command: "str_replace"` and requires `path`,
`old_str`, and `new_str`.

**See**

- `Memory_20250818` for the provider-defined tool that consumes this command

**Signature**

```ts
declare const MemoryStrReplaceCommand: Schema.Struct<{
  readonly command: Schema.Literal<"str_replace">
  readonly path: Schema.String
  readonly old_str: Schema.String
  readonly new_str: Schema.String
}>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L1538)

Since v4.0.0

## MemoryStrReplaceCommand (type alias)

Memory tool command payload for replacing text in a file.

**Signature**

```ts
type MemoryStrReplaceCommand = typeof MemoryStrReplaceCommand.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L1559)

Since v4.0.0

## MemoryViewCommand

Shows directory contents or file contents with optional line ranges.

**Details**

When used on a file, returns file contents optionally limited by `view_range`.
When used on a directory, lists contents.

**Signature**

```ts
declare const MemoryViewCommand: Schema.Struct<{
  readonly command: Schema.Literal<"view">
  readonly path: Schema.String
  readonly view_range: Schema.optional<Schema.Tuple<readonly [Schema.Number, Schema.Number]>>
}>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L1572)

Since v4.0.0

## MemoryViewCommand (type alias)

Memory tool command payload for viewing a file or directory, optionally with a file line range.

**Signature**

```ts
type MemoryViewCommand = typeof MemoryViewCommand.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L1589)

Since v4.0.0

## Memory_20250818

Defines the memory tool for persistent file operations across conversations.

**Details**

Provides commands for creating, viewing, editing, renaming, and deleting
files within the model's memory space.

**Signature**

```ts
declare const Memory_20250818: <Mode extends Tool.FailureMode | undefined = undefined>(
  args: void
) => Tool.ProviderDefined<
  "anthropic.memory_20250818",
  "AnthropicMemory",
  {
    readonly args: Schema.Void
    readonly parameters: Schema.Union<
      readonly [
        Schema.Struct<{ readonly command: Schema.Literal<"create">; readonly path: Schema.String }>,
        Schema.Struct<{ readonly command: Schema.Literal<"delete">; readonly path: Schema.String }>,
        Schema.Struct<{
          readonly command: Schema.Literal<"insert">
          readonly path: Schema.String
          readonly insert_line: Schema.Number
          readonly insert_text: Schema.String
        }>,
        Schema.Struct<{
          readonly command: Schema.Literal<"rename">
          readonly old_path: Schema.String
          readonly new_path: Schema.String
        }>,
        Schema.Struct<{
          readonly command: Schema.Literal<"str_replace">
          readonly path: Schema.String
          readonly old_str: Schema.String
          readonly new_str: Schema.String
        }>,
        Schema.Struct<{
          readonly command: Schema.Literal<"view">
          readonly path: Schema.String
          readonly view_range: Schema.optional<Schema.Tuple<readonly [Schema.Number, Schema.Number]>>
        }>
      ]
    >
    readonly success: Schema.String
    readonly failure: Schema.Never
    readonly failureMode: Mode extends undefined ? "error" : Mode
  },
  false
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L1615)

Since v4.0.0

## ViewRange

Defines a `[start, end]` line range for viewing file contents.

**When to use**

Use when constructing or validating `view_range` for memory or text editor
view commands.

**Details**

Lines are 1-indexed. Use `-1` for end to read to the end of the file. For
example, `[1, 50]` views lines 1-50 and `[100, -1]` views from line 100 to
the end of the file.

**See**

- `MemoryViewCommand` for memory view payloads that use this range
- `TextEditorViewCommand` for text editor view payloads that use this range

**Signature**

```ts
declare const ViewRange: Schema.Tuple<readonly [Schema.Number, Schema.Number]>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L1386)

Since v4.0.0

## ViewRange (type alias)

A `[start, end]` 1-indexed line range for viewing file contents, using `-1` as the end value to read through the end of the file.

**When to use**

Use when typing `view_range` for memory or text editor view commands.

**Signature**

```ts
type ViewRange = typeof ViewRange.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L1397)

Since v4.0.0

# models

## AnthropicTool (type alias)

Union of all Anthropic provider-defined tool definitions exported by this module.

**When to use**

Use when a helper, collection, or option accepts any Anthropic
provider-defined tool value created by this module.

**Details**

The union is built from the return types of the exported constructors,
including Bash, Code Execution, Computer Use, Memory, Text Editor, Tool
Search, Web Fetch, and Web Search tool versions.

**Signature**

```ts
type AnthropicTool =
  | ReturnType<typeof Bash_20241022>
  | ReturnType<typeof Bash_20250124>
  | ReturnType<typeof CodeExecution_20250522>
  | ReturnType<typeof CodeExecution_20250825>
  | ReturnType<typeof ComputerUse_20241022>
  | ReturnType<typeof ComputerUse_20250124>
  | ReturnType<typeof ComputerUse_20251124>
  | ReturnType<typeof Memory_20250818>
  | ReturnType<typeof TextEditor_20241022>
  | ReturnType<typeof TextEditor_20250124>
  | ReturnType<typeof TextEditor_20250429>
  | ReturnType<typeof TextEditor_20250728>
  | ReturnType<typeof ToolSearchRegex_20251119>
  | ReturnType<typeof ToolSearchBM25_20251119>
  | ReturnType<typeof WebFetch_20250910>
  | ReturnType<typeof WebSearch_20250305>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L31)

Since v4.0.0

# text editor

## TextEditorCreateCommand

Create a new file with specified content.

**When to use**

Use when validating or constructing an Anthropic text editor `create`
command.

**Details**

The payload is discriminated by `command: "create"` and requires both `path`
and `file_text`.

**Gotchas**

Fails if the file already exists. Parent directories must exist.

**Signature**

```ts
declare const TextEditorCreateCommand: Schema.Struct<{
  readonly command: Schema.Literal<"create">
  readonly path: Schema.String
  readonly file_text: Schema.String
}>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L1696)

Since v4.0.0

## TextEditorCreateCommand (type alias)

Text editor command payload for creating a new file with the specified content.

**When to use**

Use when typing parsed text-editor create command payloads after schema
validation and before dispatching to Anthropic tool handlers.

**Gotchas**

The command fails if the file already exists or if parent directories are missing.

**Signature**

```ts
type TextEditorCreateCommand = typeof TextEditorCreateCommand.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L1722)

Since v4.0.0

## TextEditorInsertCommand

Inserts text at a specific line number in a file.

**Details**

Inserts the new text after the specified line number. Use `0` to insert at
the beginning of the file; other values are 1-indexed.

**Signature**

```ts
declare const TextEditorInsertCommand: Schema.Struct<{
  readonly command: Schema.Literal<"insert">
  readonly path: Schema.String
  readonly insert_line: Schema.Number
  readonly new_str: Schema.String
}>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L1792)

Since v4.0.0

## TextEditorInsertCommand (type alias)

Text editor command payload for inserting text after a specific line number in a file.

**Signature**

```ts
type TextEditorInsertCommand = typeof TextEditorInsertCommand.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L1813)

Since v4.0.0

## TextEditorStrReplaceCommand

Replaces a specific string in a file with a new string.

**When to use**

Use when validating or constructing standalone Anthropic text editor
`str_replace` commands.

**Details**

The payload uses `command: "str_replace"`, `path`, `old_str`, and `new_str`.
`new_str` may be empty to delete text.

**Gotchas**

The `old_str` must match exactly (including whitespace and indentation)
and must be unique in the file.

**See**

- `TextEditorViewCommand` for reading contents before choosing `old_str`
- `CodeExecutionTextEditorStrReplace` for the code-execution variant

**Signature**

```ts
declare const TextEditorStrReplaceCommand: Schema.Struct<{
  readonly command: Schema.Literal<"str_replace">
  readonly path: Schema.String
  readonly old_str: Schema.String
  readonly new_str: Schema.String
}>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L1748)

Since v4.0.0

## TextEditorStrReplaceCommand (type alias)

Text editor command payload for replacing one exact, unique string in a file.

**When to use**

Use when typing parsed text-editor replace command payloads that must carry
one exact `old_str` match.

**Gotchas**

The `old_str` must match exactly, including whitespace and indentation, and
must be unique in the file.

**Signature**

```ts
type TextEditorStrReplaceCommand = typeof TextEditorStrReplaceCommand.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L1779)

Since v4.0.0

## TextEditorUndoEditCommand

Undoes the last edit made to a file.

**Details**

Reverts the most recent `str_replace`, `insert`, or `create` operation on the
file.

**Gotchas**

This command is available in `text_editor_20241022` and
`text_editor_20250124`, but not in `text_editor_20250429` or
`text_editor_20250728`.

**Signature**

```ts
declare const TextEditorUndoEditCommand: Schema.Struct<{
  readonly command: Schema.Literal<"undo_edit">
  readonly path: Schema.String
}>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L1832)

Since v4.0.0

## TextEditorUndoEditCommand (type alias)

Text editor command payload for undoing the most recent edit to a file.

**Gotchas**

Available for `text_editor_20241022` and `text_editor_20250124`, but not for
`text_editor_20250429` or `text_editor_20250728`.

**Signature**

```ts
type TextEditorUndoEditCommand = typeof TextEditorUndoEditCommand.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L1850)

Since v4.0.0

## TextEditorViewCommand

Reads the contents of a file or lists directory contents.

**When to use**

Use when validating or constructing the standalone Anthropic Text Editor
`view` command.

**Details**

When used on a file, returns the file contents, optionally limited to a line
range. When used on a directory, lists all files and subdirectories.
`view_range` is a 1-indexed `[start, end]` tuple where `-1` means through
the end of the file.

**See**

- `CodeExecutionTextEditorView` for the code-execution variant without `view_range`

**Signature**

```ts
declare const TextEditorViewCommand: Schema.Struct<{
  readonly command: Schema.Literal<"view">
  readonly path: Schema.String
  readonly view_range: Schema.optional<Schema.Tuple<readonly [Schema.Number, Schema.Number]>>
}>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L1651)

Since v4.0.0

## TextEditorViewCommand (type alias)

Text editor command payload for viewing file contents or listing directory contents.

**Details**

`view_range` is a 1-indexed `[start, end]` tuple where `-1` means through
the end of the file.

**Signature**

```ts
type TextEditorViewCommand = typeof TextEditorViewCommand.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L1674)

Since v4.0.0

## TextEditor_20241022

Defines the deprecated text editor tool for Claude 3.5 Sonnet.

**When to use**

Use when you need the 2024-10-22 `str_replace_editor` compatibility path for
Claude 3.5 Sonnet.

**Details**

Requires the "computer-use-2024-10-22" beta header and supports `view`,
`create`, `str_replace`, `insert`, and `undo_edit` commands.

**See**

- `TextEditor_20250124` for the newer `str_replace_editor` version
- `TextEditor_20250728` for the Claude 4 `str_replace_based_edit_tool` line

**Signature**

```ts
declare const TextEditor_20241022: <Mode extends Tool.FailureMode | undefined = undefined>(args: {
  readonly failureMode?: Mode | undefined
}) => Tool.ProviderDefined<
  "anthropic.text_editor_20241022",
  "AnthropicTextEditor",
  {
    readonly args: Schema.Void
    readonly parameters: Schema.Union<
      readonly [
        Schema.Struct<{
          readonly command: Schema.Literal<"view">
          readonly path: Schema.String
          readonly view_range: Schema.optional<Schema.Tuple<readonly [Schema.Number, Schema.Number]>>
        }>,
        Schema.Struct<{
          readonly command: Schema.Literal<"create">
          readonly path: Schema.String
          readonly file_text: Schema.String
        }>,
        Schema.Struct<{
          readonly command: Schema.Literal<"str_replace">
          readonly path: Schema.String
          readonly old_str: Schema.String
          readonly new_str: Schema.String
        }>,
        Schema.Struct<{
          readonly command: Schema.Literal<"insert">
          readonly path: Schema.String
          readonly insert_line: Schema.Number
          readonly new_str: Schema.String
        }>,
        Schema.Struct<{ readonly command: Schema.Literal<"undo_edit">; readonly path: Schema.String }>
      ]
    >
    readonly success: Schema.String
    readonly failure: Schema.Never
    readonly failureMode: Mode extends undefined ? "error" : Mode
  },
  true
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L1902)

Since v4.0.0

## TextEditor_20250124

Defines the text editor tool for deprecated Claude Sonnet 3.7.

**When to use**

Use when you need the 2025-01-24 Claude Sonnet 3.7 text editor tool using
`str_replace_editor`.

**Details**

Requires the "computer-use-2025-01-24" beta header, requires a handler, and
supports `view`, `create`, `str_replace`, `insert`, and `undo_edit` commands.

**See**

- `TextEditor_20241022` for the older `str_replace_editor` version
- `TextEditor_20250429` for the Claude 4 `str_replace_based_edit_tool` line

**Signature**

```ts
declare const TextEditor_20250124: <Mode extends Tool.FailureMode | undefined = undefined>(args: {
  readonly failureMode?: Mode | undefined
}) => Tool.ProviderDefined<
  "anthropic.text_editor_20250124",
  "AnthropicTextEditor",
  {
    readonly args: Schema.Void
    readonly parameters: Schema.Union<
      readonly [
        Schema.Struct<{
          readonly command: Schema.Literal<"view">
          readonly path: Schema.String
          readonly view_range: Schema.optional<Schema.Tuple<readonly [Schema.Number, Schema.Number]>>
        }>,
        Schema.Struct<{
          readonly command: Schema.Literal<"create">
          readonly path: Schema.String
          readonly file_text: Schema.String
        }>,
        Schema.Struct<{
          readonly command: Schema.Literal<"str_replace">
          readonly path: Schema.String
          readonly old_str: Schema.String
          readonly new_str: Schema.String
        }>,
        Schema.Struct<{
          readonly command: Schema.Literal<"insert">
          readonly path: Schema.String
          readonly insert_line: Schema.Number
          readonly new_str: Schema.String
        }>,
        Schema.Struct<{ readonly command: Schema.Literal<"undo_edit">; readonly path: Schema.String }>
      ]
    >
    readonly success: Schema.String
    readonly failure: Schema.Never
    readonly failureMode: Mode extends undefined ? "error" : Mode
  },
  true
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L1930)

Since v4.0.0

## TextEditor_20250429

Defines the text editor tool for Claude 4 models using Anthropic's `str_replace_based_edit_tool`.

**When to use**

Use when you need the 2025-04-29 Claude 4 `str_replace_based_edit_tool`
version.

**Details**

Requires the "computer-use-2025-01-24" beta header.

**Gotchas**

This version does not support the `undo_edit` command.

**See**

- `TextEditor_20250124` for the previous `str_replace_editor` version
- `TextEditor_20250728` for the later Claude 4 text editor version

**Signature**

```ts
declare const TextEditor_20250429: <Mode extends Tool.FailureMode | undefined = undefined>(args: {
  readonly max_characters?: number | undefined
  readonly failureMode?: Mode | undefined
}) => Tool.ProviderDefined<
  "anthropic.text_editor_20250429",
  "AnthropicTextEditor",
  {
    readonly args: Schema.Struct<{ readonly max_characters: Schema.optional<Schema.Number> }>
    readonly parameters: Schema.Union<
      readonly [
        Schema.Struct<{
          readonly command: Schema.Literal<"view">
          readonly path: Schema.String
          readonly view_range: Schema.optional<Schema.Tuple<readonly [Schema.Number, Schema.Number]>>
        }>,
        Schema.Struct<{
          readonly command: Schema.Literal<"create">
          readonly path: Schema.String
          readonly file_text: Schema.String
        }>,
        Schema.Struct<{
          readonly command: Schema.Literal<"str_replace">
          readonly path: Schema.String
          readonly old_str: Schema.String
          readonly new_str: Schema.String
        }>,
        Schema.Struct<{
          readonly command: Schema.Literal<"insert">
          readonly path: Schema.String
          readonly insert_line: Schema.Number
          readonly new_str: Schema.String
        }>
      ]
    >
    readonly success: Schema.String
    readonly failure: Schema.Never
    readonly failureMode: Mode extends undefined ? "error" : Mode
  },
  true
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L1961)

Since v4.0.0

## TextEditor_20250728

Defines the text editor tool for Claude 4 models.

**Details**

Uses Anthropic's `str_replace_based_edit_tool`. `max_characters` can limit
file-view output for this version.

**Gotchas**

This version does not support the `undo_edit` command.

**Signature**

```ts
declare const TextEditor_20250728: <Mode extends Tool.FailureMode | undefined = undefined>(args: {
  readonly max_characters?: number | undefined
  readonly failureMode?: Mode | undefined
}) => Tool.ProviderDefined<
  "anthropic.text_editor_20250728",
  "AnthropicTextEditor",
  {
    readonly args: Schema.Struct<{ readonly max_characters: Schema.optional<Schema.Number> }>
    readonly parameters: Schema.Union<
      readonly [
        Schema.Struct<{
          readonly command: Schema.Literal<"view">
          readonly path: Schema.String
          readonly view_range: Schema.optional<Schema.Tuple<readonly [Schema.Number, Schema.Number]>>
        }>,
        Schema.Struct<{
          readonly command: Schema.Literal<"create">
          readonly path: Schema.String
          readonly file_text: Schema.String
        }>,
        Schema.Struct<{
          readonly command: Schema.Literal<"str_replace">
          readonly path: Schema.String
          readonly old_str: Schema.String
          readonly new_str: Schema.String
        }>,
        Schema.Struct<{
          readonly command: Schema.Literal<"insert">
          readonly path: Schema.String
          readonly insert_line: Schema.Number
          readonly new_str: Schema.String
        }>
      ]
    >
    readonly success: Schema.String
    readonly failure: Schema.Never
    readonly failureMode: Mode extends undefined ? "error" : Mode
  },
  true
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L1986)

Since v4.0.0

# tool search

## ToolSearchBM25Parameters

Defines input parameters for BM25/natural language tool search.

**When to use**

Use when validating or constructing the natural-language query payload for
`ToolSearchBM25_20251119`.

**Details**

The payload contains Claude's natural-language `query`. BM25 searches tool
names, descriptions, argument names, and argument descriptions.

**See**

- `ToolSearchBM25_20251119` for the provider-defined tool that consumes these parameters

**Signature**

```ts
declare const ToolSearchBM25Parameters: Schema.Struct<{ readonly query: Schema.String }>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L2445)

Since v4.0.0

## ToolSearchBM25Parameters (type alias)

Type of the parameters Claude supplies when invoking BM25 natural-language Anthropic tool search.

**Signature**

```ts
type ToolSearchBM25Parameters = typeof ToolSearchBM25Parameters.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L2457)

Since v4.0.0

## ToolSearchBM25_20251119

Defines BM25/natural language tool search for Claude models.

**When to use**

Use when you want Claude to find relevant tools from a natural-language query
instead of a regex pattern.

**Details**

Claude uses natural language queries to search for tools using the
BM25 algorithm. The search is performed against tool names, descriptions,
argument names, and argument descriptions.
Requires the "advanced-tool-use-2025-11-20" beta header.

**See**

- `ToolSearchRegex_20251119` for the regex-pattern alternative

**Signature**

```ts
declare const ToolSearchBM25_20251119: <Mode extends Tool.FailureMode | undefined = undefined>(
  args: void
) => Tool.ProviderDefined<
  "anthropic.tool_search_tool_bm25_20251119",
  "AnthropicToolSearchBM25",
  {
    readonly args: Schema.Void
    readonly parameters: Schema.Struct<{ readonly query: Schema.String }>
    readonly success: Schema.$Array<
      Schema.Struct<{
        readonly cache_control: Schema.optionalKey<
          Schema.Union<
            readonly [
              Schema.Union<
                readonly [
                  Schema.Struct<{
                    readonly ttl: Schema.optionalKey<Schema.Literals<readonly ["5m", "1h"]>>
                    readonly type: Schema.Literal<"ephemeral">
                  }>
                ]
              >,
              Schema.Null
            ]
          >
        >
        readonly tool_name: Schema.String
        readonly type: Schema.Literal<"tool_reference">
      }>
    >
    readonly failure: Schema.Struct<{
      readonly error_code: Schema.Literals<
        readonly ["invalid_tool_input", "unavailable", "too_many_requests", "execution_time_exceeded"]
      >
      readonly error_message: Schema.Union<readonly [Schema.String, Schema.Null]>
      readonly type: Schema.Literal<"tool_search_tool_result_error">
    }>
    readonly failureMode: Mode extends undefined ? "error" : Mode
  },
  false
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L2505)

Since v4.0.0

## ToolSearchRegexParameters

Schema for regex-based tool search input parameters.

**Details**

Claude constructs regex patterns using Python's `re.search()` syntax.
Maximum query length: 200 characters.

**Signature**

```ts
declare const ToolSearchRegexParameters: Schema.Struct<{ readonly query: Schema.String }>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L2408)

Since v4.0.0

## ToolSearchRegexParameters (type alias)

Type of the parameters Claude supplies when invoking regex-based Anthropic tool search.

**Details**

Claude constructs regex patterns using Python's `re.search()` syntax.
Maximum query length: 200 characters.

**Signature**

```ts
type ToolSearchRegexParameters = typeof ToolSearchRegexParameters.Type
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L2425)

Since v4.0.0

## ToolSearchRegex_20251119

Defines regex-based tool search for Claude models.

**Details**

Claude constructs regex patterns using Python's `re.search()` syntax to
find tools. The regex is matched against tool names, descriptions,
argument names, and argument descriptions.
Requires the "advanced-tool-use-2025-11-20" beta header.

**Signature**

```ts
declare const ToolSearchRegex_20251119: <Mode extends Tool.FailureMode | undefined = undefined>(
  args: void
) => Tool.ProviderDefined<
  "anthropic.tool_search_tool_regex_20251119",
  "AnthropicToolSearchRegex",
  {
    readonly args: Schema.Void
    readonly parameters: Schema.Struct<{ readonly query: Schema.String }>
    readonly success: Schema.$Array<
      Schema.Struct<{
        readonly cache_control: Schema.optionalKey<
          Schema.Union<
            readonly [
              Schema.Union<
                readonly [
                  Schema.Struct<{
                    readonly ttl: Schema.optionalKey<Schema.Literals<readonly ["5m", "1h"]>>
                    readonly type: Schema.Literal<"ephemeral">
                  }>
                ]
              >,
              Schema.Null
            ]
          >
        >
        readonly tool_name: Schema.String
        readonly type: Schema.Literal<"tool_reference">
      }>
    >
    readonly failure: Schema.Struct<{
      readonly error_code: Schema.Literals<
        readonly ["invalid_tool_input", "unavailable", "too_many_requests", "execution_time_exceeded"]
      >
      readonly error_message: Schema.Union<readonly [Schema.String, Schema.Null]>
      readonly type: Schema.Literal<"tool_search_tool_result_error">
    }>
    readonly failureMode: Mode extends undefined ? "error" : Mode
  },
  false
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/ai/anthropic/src/AnthropicTool.ts#L2476)

Since v4.0.0
