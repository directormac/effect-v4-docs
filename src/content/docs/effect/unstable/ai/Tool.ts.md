---
title: Tool.ts
nav_order: 158
parent: "effect"
---

## Tool.ts overview

Definitions and helpers for tools that AI models can request during a
workflow.

A tool names an operation, describes the parameters it accepts, declares
successful and failed results, and can require approval before execution.
This module supports tools defined by the application, tools built into a
provider, and dynamic tools whose schema is known only at runtime. It also
includes the shared types and conversion helpers needed by language-model
requests, tool handlers, and provider integrations.

Since v4.0.0

---

## Exports Grouped by Category

- [annotations](#annotations)
  - [Destructive](#destructive)
  - [Idempotent](#idempotent)
  - [Meta (class)](#meta-class)
  - [OpenWorld](#openworld)
  - [Readonly](#readonly)
  - [Strict](#strict)
  - [Title (class)](#title-class)
- [constructors](#constructors)
  - [dynamic](#dynamic)
  - [make](#make)
  - [providerDefined](#providerdefined)
- [converting](#converting)
  - [getJsonSchemaFromSchema](#getjsonschemafromschema)
- [getters](#getters)
  - [getDescription](#getdescription)
  - [getJsonSchema](#getjsonschema)
  - [getStrictMode](#getstrictmode)
- [guards](#guards)
  - [isDynamic](#isdynamic)
  - [isProviderDefined](#isproviderdefined)
  - [isUserDefined](#isuserdefined)
- [models](#models)
  - [Dynamic (interface)](#dynamic-interface)
  - [FailureMode (type alias)](#failuremode-type-alias)
  - [Handler (interface)](#handler-interface)
  - [HandlerOutput (type alias)](#handleroutput-type-alias)
  - [HandlerResult (interface)](#handlerresult-interface)
  - [NameMapper (class)](#namemapper-class)
    - [getCustomName (method)](#getcustomname-method)
    - [getProviderName (method)](#getprovidername-method)
    - [#customToProvider (property)](#%23customtoprovider-property)
    - [#providerToCustom (property)](#%23providertocustom-property)
  - [NeedsApproval (type alias)](#needsapproval-type-alias)
  - [NeedsApprovalContext (interface)](#needsapprovalcontext-interface)
  - [NeedsApprovalFunction (type alias)](#needsapprovalfunction-type-alias)
  - [ProviderDefined (interface)](#providerdefined-interface)
  - [Tool (interface)](#tool-interface)
- [schemas](#schemas)
  - [EmptyParams](#emptyparams)
  - [EmptyParams (interface)](#emptyparams-interface)
- [type IDs](#type-ids)
  - [DynamicTypeId](#dynamictypeid)
  - [DynamicTypeId (type alias)](#dynamictypeid-type-alias)
  - [ProviderDefinedTypeId](#providerdefinedtypeid)
  - [ProviderDefinedTypeId (type alias)](#providerdefinedtypeid-type-alias)
  - [TypeId](#typeid)
  - [TypeId (type alias)](#typeid-type-alias)
- [unsafe](#unsafe)
  - [unsafeSecureJsonParse](#unsafesecurejsonparse)
- [utility types](#utility-types)
  - [Any (interface)](#any-interface)
  - [AnyDynamic (interface)](#anydynamic-interface)
  - [AnyProviderDefined (interface)](#anyproviderdefined-interface)
  - [Failure (type alias)](#failure-type-alias)
  - [FailureEncoded (type alias)](#failureencoded-type-alias)
  - [FailureResult (type alias)](#failureresult-type-alias)
  - [FailureResultEncoded (type alias)](#failureresultencoded-type-alias)
  - [HandlerError (type alias)](#handlererror-type-alias)
  - [HandlerServices (type alias)](#handlerservices-type-alias)
  - [HandlersFor (type alias)](#handlersfor-type-alias)
  - [Name (type alias)](#name-type-alias)
  - [Parameters (type alias)](#parameters-type-alias)
  - [ParametersEncoded (type alias)](#parametersencoded-type-alias)
  - [ParametersSchema (type alias)](#parametersschema-type-alias)
  - [RequiresHandler (type alias)](#requireshandler-type-alias)
  - [Result (type alias)](#result-type-alias)
  - [ResultDecodingServices (type alias)](#resultdecodingservices-type-alias)
  - [ResultEncoded (type alias)](#resultencoded-type-alias)
  - [ResultEncodingServices (type alias)](#resultencodingservices-type-alias)
  - [Success (type alias)](#success-type-alias)
  - [SuccessEncoded (type alias)](#successencoded-type-alias)
  - [SuccessSchema (type alias)](#successschema-type-alias)

---

# annotations

## Destructive

Annotation indicating whether a tool may perform destructive operations.

**Details**

This is emitted as the MCP `destructiveHint`; unannotated tools default to
`true`, so annotate safe tools with `false`.

**Example** (Marking a tool as non-destructive)

```ts
import { Tool } from "effect/unstable/ai"

const safeTool = Tool.make("search_database").annotate(Tool.Destructive, false)
```

**Signature**

```ts
declare const Destructive: Context.Reference<boolean>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L1764)

Since v4.0.0

## Idempotent

Annotation indicating whether a tool can be called repeatedly with the same
parameters without changing the result beyond the first call.

**Details**

This is emitted as the MCP `idempotentHint`; unannotated tools default to
`false`.

**Example** (Marking a tool as idempotent)

```ts
import { Tool } from "effect/unstable/ai"

const idempotentTool = Tool.make("get_current_time").annotate(Tool.Idempotent, true)
```

**Signature**

```ts
declare const Idempotent: Context.Reference<boolean>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L1789)

Since v4.0.0

## Meta (class)

Annotation for providing tool metadata for MCP.

**Example** (Annotating MCP metadata)

```ts
import { Tool } from "effect/unstable/ai"

const myCalculatorUi = Tool.make("calculator_ui", {}).annotate(Tool.Meta, {
  ui: { resourceUri: "ui://example/calculator-ui" }
})
```

**Signature**

```ts
declare class Meta
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L1718)

Since v4.0.0

## OpenWorld

Annotation indicating whether a tool may interact with arbitrary external
data or systems.

**Details**

This is emitted as the MCP `openWorldHint`; unannotated tools default to
`true`.

**Example** (Disabling open-world access)

```ts
import { Tool } from "effect/unstable/ai"

const restrictedTool = Tool.make("internal_operation").annotate(Tool.OpenWorld, false)
```

**Signature**

```ts
declare const OpenWorld: Context.Reference<boolean>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L1814)

Since v4.0.0

## Readonly

Annotation indicating whether a tool only reads data without making changes.

**Details**

This is emitted as the MCP `readOnlyHint`; unannotated tools default to
`false`.

**Example** (Marking a tool as read-only)

```ts
import { Tool } from "effect/unstable/ai"

const readOnlyTool = Tool.make("get_user_info").annotate(Tool.Readonly, true)
```

**Signature**

```ts
declare const Readonly: Context.Reference<boolean>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L1740)

Since v4.0.0

## Strict

Annotation controlling whether strict JSON schema mode is enabled for a tool.

**Details**

When `true`, providers that support strict mode will send `strict: true` to
the model API (e.g. OpenAI's Structured Outputs).

When `false`, strict mode is disabled and `strict: false` is sent.

When `undefined` (default), the provider's global configuration determines
the behavior (e.g. `Config.strictJsonSchema` for OpenAI).

**Example** (Disabling strict JSON schema mode)

```ts
import { Tool } from "effect/unstable/ai"

const flexibleTool = Tool.make("search").annotate(Tool.Strict, false)
```

**Signature**

```ts
declare const Strict: Context.Reference<boolean | undefined>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L1843)

Since v4.0.0

## Title (class)

Annotation for providing a human-readable title for tools.

**Example** (Annotating a tool title)

```ts
import { Tool } from "effect/unstable/ai"

const myTool = Tool.make("calculate_tip").annotate(Tool.Title, "Tip Calculator")
```

**Signature**

```ts
declare class Title
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L1701)

Since v4.0.0

# constructors

## dynamic

Creates a dynamic tool that can accept either an Effect Schema or a raw
JSON Schema for its parameters.

**When to use**

Use when you do not know a tool schema at compile time, such as MCP tools
discovered at runtime or tools from external configurations.

**Details**

- When `parameters` is an Effect Schema: full type safety with validation
- When `parameters` is a JSON Schema: handler receives `unknown`, no validation

**Example** (Creating a dynamic tool)

```ts
import { Schema } from "effect"
import { Tool } from "effect/unstable/ai"

// With Effect Schema (typed parameters)
const Calculator = Tool.dynamic("Calculator", {
  parameters: Schema.Struct({
    operation: Schema.Literals(["add", "subtract"]),
    a: Schema.Number,
    b: Schema.Number
  }),
  success: Schema.Number
})

// With JSON Schema (untyped parameters)
const McpTool = Tool.dynamic("McpTool", {
  description: "Tool from MCP server",
  parameters: {
    type: "object",
    properties: { query: { type: "string" } },
    required: ["query"]
  }
})
```

**Signature**

```ts
declare const dynamic: <
  const Name extends string,
  const Options extends {
    readonly description?: string | undefined
    readonly parameters?: Schema.Constraint | JsonSchema.JsonSchema | undefined
    readonly success?: Schema.Constraint | undefined
    readonly failure?: Schema.Constraint | undefined
    readonly failureMode?: FailureMode | undefined
    readonly needsApproval?: NeedsApproval<any> | undefined
  }
>(
  name: Name,
  options?: Options
) => Dynamic<
  Name,
  {
    readonly parameters: Options extends { readonly parameters: infer P }
      ? P extends Schema.Constraint
        ? P
        : P extends JsonSchema.JsonSchema
          ? P
          : typeof Schema.Unknown
      : typeof Schema.Unknown
    readonly success: Options extends { readonly success: infer S extends Schema.Constraint }
      ? S
      : typeof Schema.Unknown
    readonly failure: Options extends { readonly failure: infer F extends Schema.Constraint } ? F : typeof Schema.Never
    readonly failureMode: Options extends { readonly failureMode: infer M extends FailureMode } ? M : "error"
  }
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L1315)

Since v4.0.0

## make

Creates a user-defined tool with the specified name and configuration.

**Details**

This is the primary constructor for creating custom tools that AI models
can call. The tool definition includes parameter validation, success/failure
schemas, and optional service dependencies.

If a tool accepts no parameters but still needs an explicit empty object
schema, use `EmptyParams`.

**Example** (Creating a tool without parameters)

```ts
import { Schema } from "effect"
import { Tool } from "effect/unstable/ai"

// Simple tool with no parameters
const GetCurrentTime = Tool.make("GetCurrentTime", {
  description: "Returns the current timestamp",
  success: Schema.Number
})
```

**Signature**

```ts
declare const make: <
  const Name extends string,
  Parameters extends Schema.Constraint = EmptyParams,
  Success extends Schema.Constraint = Schema.Void,
  Failure extends Schema.Constraint = Schema.Never,
  Mode extends FailureMode | undefined = undefined,
  Dependencies extends Array<Context.Key<any, any> | Context.Key<never, any>> = []
>(
  name: Name,
  options?: {
    readonly description?: string | undefined
    readonly parameters?: Parameters | undefined
    readonly success?: Success | undefined
    readonly failure?: Failure | undefined
    readonly failureMode?: Mode
    readonly dependencies?: Dependencies | undefined
    readonly needsApproval?: NeedsApproval<Parameters> | undefined
  }
) => Tool<
  Name,
  {
    readonly parameters: Parameters
    readonly success: Success
    readonly failure: Failure
    readonly failureMode: Mode extends undefined ? "error" : Mode
  },
  Context.Service.Identifier<Dependencies[number]>
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L1195)

Since v4.0.0

## providerDefined

Creates a provider-defined tool which leverages functionality built into a
large language model provider (e.g. web search, code execution).

**Details**

These tools are executed by the large language model provider rather than
by your application. However, they can optionally require custom handlers
implemented in your application to process provider generated results.

**Example** (Creating a provider-defined tool)

```ts
import { Schema } from "effect"
import { Tool } from "effect/unstable/ai"

// Web search tool provided by OpenAI
const WebSearch = Tool.providerDefined({
  id: "openai.web_search",
  customName: "OpenAiWebSearch",
  providerName: "web_search",
  args: Schema.Struct({
    query: Schema.String
  }),
  success: Schema.Struct({
    results: Schema.Array(
      Schema.Struct({
        title: Schema.String,
        url: Schema.String,
        content: Schema.String
      })
    )
  })
})
```

**Signature**

```ts
declare const providerDefined: <
  const Identifier extends `${string}.${string}`,
  const Name extends string,
  Args extends Schema.Constraint = Schema.Void,
  Parameters extends Schema.Constraint = Schema.Void,
  Success extends Schema.Constraint = Schema.Void,
  Failure extends Schema.Constraint = Schema.Never,
  RequiresHandler extends boolean = false
>(options: {
  readonly id: Identifier
  readonly customName: Name
  readonly providerName: string
  readonly args?: Args | undefined
  readonly requiresHandler?: RequiresHandler | undefined
  readonly parameters?: Parameters | undefined
  readonly success?: Success | undefined
  readonly failure?: Failure | undefined
}) => <Mode extends FailureMode | undefined = undefined>(
  args: RequiresHandler extends true
    ? Struct.Simplify<Args["Encoded"] & { readonly failureMode?: Mode | undefined }>
    : Struct.Simplify<Args["Encoded"]>
) => ProviderDefined<
  Identifier,
  Name,
  {
    readonly args: Args
    readonly parameters: Parameters
    readonly success: Success
    readonly failure: Failure
    readonly failureMode: Mode extends undefined ? "error" : Mode
  },
  RequiresHandler
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L1410)

Since v4.0.0

# converting

## getJsonSchemaFromSchema

Generates a JSON Schema from an Effect `Schema`.

**Details**

If a `CodecTransformer` is supplied, the transformed schema's JSON Schema is
returned. Otherwise, the schema is converted with
`Schema.toJsonSchemaDocument` and any generated definitions are attached as
`$defs`.

**Signature**

```ts
declare const getJsonSchemaFromSchema: <S extends Schema.Constraint>(
  schema: S,
  options?: { readonly transformer?: CodecTransformer }
) => JsonSchema.JsonSchema
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L1669)

Since v4.0.0

# getters

## getDescription

Extracts the description from a tool's metadata.

**Details**

Returns the tool's description if explicitly set, otherwise attempts to
extract it from the parameter schema's AST annotations.

**Example** (Reading a tool description)

```ts
import { Tool } from "effect/unstable/ai"

const myTool = Tool.make("example", {
  description: "This is an example tool"
})

const description = Tool.getDescription(myTool)
console.log(description) // "This is an example tool"
```

**Signature**

```ts
declare const getDescription: <Tool extends Any>(tool: Tool) => string | undefined
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L1596)

Since v4.0.0

## getJsonSchema

Generates a JSON Schema for a tool.

**Details**

This function creates a JSON Schema representation that can be used by
large language models to indicate the structure and type of the parameters
that a given tool call should receive.

May accept an optional `CodecTransformer` which can be used to transform the
tool parameter schema so that the resultant JSON schema for the tool call
parameters are in a format that conforms to any provider-specific constraints.

**Example** (Generating a tool JSON schema)

```ts
import { Schema } from "effect"
import { Tool } from "effect/unstable/ai"

const weatherTool = Tool.make("get_weather", {
  parameters: Schema.Struct({
    location: Schema.String,
    units: Schema.Literals(["celsius", "fahrenheit"])
  })
})

const jsonSchema = Tool.getJsonSchema(weatherTool)
console.log(jsonSchema)
// {
//   type: "object",
//   properties: {
//     location: { type: "string" },
//     units: { type: "string", enum: ["celsius", "fahrenheit"] }
//   },
//   required: ["location", "units"]
// }
```

**Signature**

```ts
declare const getJsonSchema: <Tool extends Any>(
  tool: Tool,
  options?: { readonly transformer?: CodecTransformer }
) => JsonSchema.JsonSchema
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L1647)

Since v4.0.0

## getStrictMode

Returns the strict mode setting for a tool, or `undefined` if not set.

**When to use**

Use to inspect the per-tool strict JSON Schema override attached through
`Tool.Strict`.

**Gotchas**

`undefined` means no per-tool override is set. It is distinct from `false`;
provider or global configuration determines the final behavior.

**See**

- `Strict` for the annotation read by this helper

**Signature**

```ts
declare const getStrictMode: <T extends Any>(tool: T) => boolean | undefined
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L1865)

Since v4.0.0

# guards

## isDynamic

Type guard to check if a value is a dynamic tool.

**Example** (Checking for dynamic tools)

```ts
import { Schema } from "effect"
import { Tool } from "effect/unstable/ai"

const DynamicTool = Tool.dynamic("DynamicTool", {
  parameters: { type: "object", properties: {} }
})

const UserDefinedTool = Tool.make("Calculator", {
  parameters: Schema.Struct({ a: Schema.Number, b: Schema.Number }),
  success: Schema.Number
})

console.log(Tool.isDynamic(DynamicTool)) // true
console.log(Tool.isDynamic(UserDefinedTool)) // false
```

**Signature**

```ts
declare const isDynamic: (u: unknown) => u is Dynamic<string, any>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L631)

Since v4.0.0

## isProviderDefined

Type guard to check if a value is a provider-defined tool.

**Example** (Checking for provider-defined tools)

```ts
import { Schema } from "effect"
import { Tool } from "effect/unstable/ai"

const UserDefinedTool = Tool.make("Calculator", {
  description: "Performs basic arithmetic operations",
  parameters: Schema.Struct({
    operation: Schema.Literals(["add", "subtract", "multiply", "divide"]),
    a: Schema.Number,
    b: Schema.Number
  }),
  success: Schema.Number
})

const ProviderDefinedTool = Tool.providerDefined({
  id: "openai.web_search",
  customName: "OpenAiWebSearch",
  providerName: "web_search",
  args: Schema.Struct({
    query: Schema.String
  }),
  success: Schema.Struct({
    results: Schema.Array(
      Schema.Struct({
        title: Schema.String,
        url: Schema.String,
        snippet: Schema.String
      })
    )
  })
})

console.log(Tool.isProviderDefined(UserDefinedTool)) // false
console.log(Tool.isProviderDefined(ProviderDefinedTool)) // true
```

**Signature**

```ts
declare const isProviderDefined: (u: unknown) => u is ProviderDefined<`${string}.${string}`, string, any>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L602)

Since v4.0.0

## isUserDefined

Type guard to check if a value is a user-defined tool.

**Example** (Checking for user-defined tools)

```ts
import { Schema } from "effect"
import { Tool } from "effect/unstable/ai"

const UserDefinedTool = Tool.make("Calculator", {
  description: "Performs basic arithmetic operations",
  parameters: Schema.Struct({
    operation: Schema.Literals(["add", "subtract", "multiply", "divide"]),
    a: Schema.Number,
    b: Schema.Number
  }),
  success: Schema.Number
})

const ProviderDefinedTool = Tool.providerDefined({
  id: "openai.web_search",
  customName: "OpenAiWebSearch",
  providerName: "web_search",
  args: Schema.Struct({
    query: Schema.String
  }),
  success: Schema.Struct({
    results: Schema.Array(
      Schema.Struct({
        title: Schema.String,
        url: Schema.String,
        snippet: Schema.String
      })
    )
  })
})

console.log(Tool.isUserDefined(UserDefinedTool)) // true
console.log(Tool.isUserDefined(ProviderDefinedTool)) // false
```

**Signature**

```ts
declare const isUserDefined: (u: unknown) => u is Tool<string, any, any>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L557)

Since v4.0.0

# models

## Dynamic (interface)

A dynamic tool is a tool where the schema may not be known at compile time.

**Details**

Dynamic tools support two modes:

- **Effect Schema mode**: Full type safety with validation (like `Tool.make`)
- **JSON Schema mode**: Raw JSON Schema for the model, handler receives `unknown`

This enables scenarios such as MCP tools discovered at runtime, user-defined
functions loaded from external sources, or plugin systems.

**Example** (Defining dynamic tools)

```ts
import { Schema } from "effect"
import { Tool } from "effect/unstable/ai"

// Dynamic tool with Effect Schema (typed)
const Calculator = Tool.dynamic("Calculator", {
  parameters: Schema.Struct({
    operation: Schema.Literals(["add", "subtract"]),
    a: Schema.Number,
    b: Schema.Number
  }),
  success: Schema.Number
})

// Dynamic tool with JSON Schema (untyped parameters)
const McpTool = Tool.dynamic("McpTool", {
  description: "Tool from MCP server",
  parameters: {
    type: "object",
    properties: { query: { type: "string" } },
    required: ["query"]
  }
})
```

**Signature**

```ts
export interface Dynamic<
  out Name extends string,
  out Config extends {
    readonly parameters: Schema.Constraint | JsonSchema.JsonSchema
    readonly success: Schema.Constraint
    readonly failure: Schema.Constraint
    readonly failureMode: FailureMode
  },
  out Requirements = never
> extends Tool<
  Name,
  {
    readonly parameters: Config["parameters"] extends Schema.Constraint ? Config["parameters"] : typeof Schema.Unknown
    readonly success: Config["success"]
    readonly failure: Config["failure"]
    readonly failureMode: Config["failureMode"]
  },
  Requirements
> {
  readonly [DynamicTypeId]: typeof DynamicTypeId

  /**
   * The raw JSON Schema for parameters. Present when `parameters` was provided
   * as a JSON Schema, `undefined` when an Effect Schema was used.
   */
  readonly jsonSchema: Config["parameters"] extends Schema.Constraint ? undefined : JsonSchema.JsonSchema
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L481)

Since v4.0.0

## FailureMode (type alias)

The strategy used for handling errors returned from tool call handler
execution.

**Details**

If set to `"error"` (the default), errors that occur during tool call handler
execution will be returned in the error channel of the calling effect.

If set to `"return"`, errors that occur during tool call handler execution
will be captured and returned as part of the tool call result.

**Signature**

```ts
type FailureMode = "error" | "return"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L116)

Since v4.0.0

## Handler (interface)

Represents an `Tool` that has been implemented within the application.

**Signature**

```ts
export interface Handler<Name extends string> {
  readonly _: unique symbol
  readonly name: Name
  readonly context: Context.Context<never>
  readonly handler: (params: any, ctx: any) => Effect.Effect<any, any>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L933)

Since v4.0.0

## HandlerOutput (type alias)

Tagged union for incremental handler output.

**Details**

When a tool handler returns a `Stream`, each emitted value is tagged as
either:

- `Preliminary`: An intermediate result representing progress
- `Final`: The last result, which is the authoritative output

**Signature**

```ts
type HandlerOutput<Success> =
  | { readonly _tag: "Preliminary"; readonly value: Success }
  | { readonly _tag: "Final"; readonly value: Success }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L982)

Since v4.0.0

## HandlerResult (interface)

Represents the result of calling the handler for a particular `Tool`.

**Signature**

```ts
export interface HandlerResult<Tool extends Any> {
  /**
   * The result of executing the handler for a particular tool.
   */
  readonly result: Result<Tool>
  /**
   * The pre-encoded tool call result of executing the handler for a particular
   * tool as a JSON-serializable value. The encoded result can be incorporated
   * into subsequent requests to the large language model.
   */
  readonly encodedResult: unknown
  /**
   * Whether the result of executing the tool call handler was an error or not.
   */
  readonly isFailure: boolean
  /**
   * Whether this is a preliminary (intermediate) result or the final result.
   * Preliminary results represent progress updates; only the final result
   * should be used as the authoritative output.
   */
  readonly preliminary: boolean
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L946)

Since v4.0.0

## NameMapper (class)

Maps between a provider-defined tool name and the name given to the tool by
the Effect AI SDK.

**Details**

The custom names used by the Effect AI SDK are to allow for toolkits which
contain tools from multiple different providers that would otherwise have
naming conflicts (i.e. `"web_search"`) to instead use custom names (i.e.
`"OpenAiWebSearch"`).

**Signature**

```ts
declare class NameMapper<Tools> {
  constructor(tools: Tools)
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L1518)

Since v4.0.0

### getCustomName (method)

Returns the user-specified tool name that corresponds with the provided
provider-specified tool name.

**Details**

If the provider-specified tool name was not registered with the name mapper,
then the provider-specified tool name is returned.

**Signature**

```ts
declare const getCustomName: (providerName: string) => string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L1554)

### getProviderName (method)

Returns the provider-specified tool name that corresponds with the provided
user-specified tool name.

**Details**

If the user-specified tool name was not registered with the name mapper,
then the user-specified tool name is returned.

**Signature**

```ts
declare const getProviderName: (customName: string) => string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L1567)

### #customToProvider (property)

**Signature**

```ts
readonly #customToProvider: Map<string, string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L1519)

### #providerToCustom (property)

**Signature**

```ts
readonly #providerToCustom: Map<string, string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L1520)

## NeedsApproval (type alias)

Specifies whether user approval is required before executing a tool.

**Details**

Can be:

- `boolean`: Static approval requirement
- `NeedsApprovalFunction`: Dynamic approval based on parameters/context

**Signature**

```ts
type NeedsApproval<Params> = boolean | NeedsApprovalFunction<Params>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L159)

Since v4.0.0

## NeedsApprovalContext (interface)

Context provided to the `needsApproval` function when dynamically
determining if a tool requires user approval.

**Signature**

```ts
export interface NeedsApprovalContext {
  /**
   * The unique identifier of the tool call.
   */
  readonly toolCallId: string
  /**
   * The conversation messages leading up to this tool call.
   */
  readonly messages: ReadonlyArray<Prompt.Message>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L125)

Since v4.0.0

## NeedsApprovalFunction (type alias)

Function type for dynamically determining if a tool requires approval.

**Signature**

```ts
type NeedsApprovalFunction<Params> = (
  params: Params["Type"],
  context: NeedsApprovalContext
) => boolean | Effect.Effect<boolean>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L142)

Since v4.0.0

## ProviderDefined (interface)

A provider-defined tool is a tool which is built into a large language model
provider (e.g. web search, code execution).

**Details**

These tools are executed by the large language model provider rather than
by your application. However, they can optionally require custom handlers
implemented in your application to process provider generated results.

**Example** (Defining a provider-defined web search tool)

```ts
import { Schema } from "effect"
import { Tool } from "effect/unstable/ai"

// Define a web search tool provided by OpenAI
const WebSearch = Tool.providerDefined({
  id: "openai.web_search",
  customName: "OpenAiWebSearch",
  providerName: "web_search",
  args: Schema.Struct({
    query: Schema.String
  }),
  success: Schema.Struct({
    results: Schema.Array(
      Schema.Struct({
        title: Schema.String,
        url: Schema.String,
        snippet: Schema.String
      })
    )
  })
})
```

**Signature**

```ts
export interface ProviderDefined<
  out Identifier extends `${string}.${string}`,
  out Name extends string,
  out Config extends {
    readonly args: Schema.Constraint
    readonly parameters: Schema.Constraint
    readonly success: Schema.Constraint
    readonly failure: Schema.Constraint
    readonly failureMode: FailureMode
  },
  out RequiresHandler extends boolean = false
> extends Tool<
  Name,
  {
    readonly parameters: Config["parameters"]
    readonly success: Config["success"]
    readonly failure: Config["failure"]
    readonly failureMode: Config["failureMode"]
  }
> {
  readonly [ProviderDefinedTypeId]: typeof ProviderDefinedTypeId

  /**
   * the identifier which is used to uniquely identify the provider-defined tool.
   */
  readonly id: Identifier

  /**
   * The arguments passed to the provider-defined tool.
   */
  readonly args: Config["args"]["Encoded"]

  /**
   * A `Schema` representing the arguments provided by the end-user which will
   * be used to configure the behavior of the provider-defined tool.
   */
  readonly argsSchema: Config["args"]

  /**
   * Name of the tool as recognized by the large language model provider.
   */
  readonly providerName: string

  /**
   * If set to `true`, this provider-defined tool will require a user-defined
   * tool call handler to be provided when converting the `Toolkit` containing
   * this tool into a `Layer`.
   */
  readonly requiresHandler: RequiresHandler
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L386)

Since v4.0.0

## Tool (interface)

A user-defined tool that language models can call to perform actions.

**Details**

Tools represent actionable capabilities that large language models can invoke
to extend their functionality beyond text generation. Each tool has a defined
schema for parameters, results, and failures.

**Example** (Defining a weather lookup tool)

```ts
import { Schema } from "effect"
import { Tool } from "effect/unstable/ai"

// Create a weather lookup tool
const GetWeather = Tool.make("GetWeather", {
  description: "Get current weather for a location",
  parameters: Schema.Struct({
    location: Schema.String,
    units: Schema.Literals(["celsius", "fahrenheit"])
  }),
  success: Schema.Struct({
    temperature: Schema.Number,
    condition: Schema.String,
    humidity: Schema.Number
  })
})
```

**Signature**

```ts
export interface Tool<
  out Name extends string,
  out Config extends {
    readonly parameters: Schema.Constraint
    readonly success: Schema.Constraint
    readonly failure: Schema.Constraint
    readonly failureMode: FailureMode
  },
  out Requirements = never
> {
  readonly [TypeId]: {
    readonly _Requirements: Types.Covariant<Requirements>
  }

  /**
   * The tool identifier which is used to uniquely identify the tool.
   */
  readonly id: string

  /**
   * The name of the tool.
   */
  readonly name: Name

  /**
   * The optional description of the tool.
   */
  readonly description?: string | undefined

  /**
   * The strategy used for handling errors returned from tool call handler
   * execution.
   *
   * **Details**
   *
   * If set to `"error"` (the default), errors that occur during tool call
   * handler execution will be returned in the error channel of the calling
   * effect.
   *
   * If set to `"return"`, errors that occur during tool call handler execution
   * will be captured and returned as part of the tool call result.
   */
  readonly failureMode: FailureMode

  /**
   * A `Schema` representing the parameters that a tool must be called with.
   */
  readonly parametersSchema: Config["parameters"]

  /**
   * A `Schema` representing the value that a tool must return when called if
   * the tool call is successful.
   */
  readonly successSchema: Config["success"]

  /**
   * A `Schema` representing the value that a tool must return when called if
   * it fails.
   */
  readonly failureSchema: Config["failure"]

  /**
   * A `Context` containing tool annotations which can store metadata about
   * the tool.
   */
  readonly annotations: Context.Context<never>

  /**
   * Specifies whether user approval is required before executing this tool.
   *
   * **Details**
   *
   * - If `undefined` or `false`, the tool executes immediately.
   * - If `true`, the tool always requires approval.
   * - If a function, it is called with the tool parameters and context to
   *   dynamically determine if approval is needed. The function can return
   *   a boolean or an Effect that resolves to a boolean.
   */
  readonly needsApproval?: boolean | NeedsApprovalFunction<any> | undefined

  /**
   * Adds a _request-level_ dependency which must be provided before the tool
   * call handler can be executed.
   *
   * **Details**
   *
   * This can be useful when you want to enforce that a particular dependency
   * **MUST** be provided to each request to the large language model provider
   * instead of being provided when creating the tool call handler layer.
   */
  addDependency<Identifier, Service>(
    tag: Context.Key<Identifier, Service>
  ): Tool<Name, Config, Identifier | Requirements>

  /**
   * Set the schema to use to validate the result of a tool call when successful.
   */
  setSuccess<SuccessSchema extends Schema.Constraint>(
    schema: SuccessSchema
  ): Tool<
    Name,
    {
      readonly parameters: Config["parameters"]
      readonly success: SuccessSchema
      readonly failure: Config["failure"]
      readonly failureMode: Config["failureMode"]
    },
    Requirements
  >

  /**
   * Set the schema to use to validate the result of a tool call when it fails.
   */
  setFailure<FailureSchema extends Schema.Constraint>(
    schema: FailureSchema
  ): Tool<
    Name,
    {
      readonly parameters: Config["parameters"]
      readonly success: Config["success"]
      readonly failure: FailureSchema
      readonly failureMode: Config["failureMode"]
    },
    Requirements
  >

  /**
   * Set the schema to use to validate the parameters of a tool call.
   */
  setParameters<ParametersSchema extends Schema.Constraint>(
    schema: ParametersSchema
  ): Tool<
    Name,
    {
      readonly parameters: ParametersSchema
      readonly success: Config["success"]
      readonly failure: Config["failure"]
      readonly failureMode: Config["failureMode"]
    },
    Requirements
  >

  /**
   * Add an annotation to the tool.
   */
  annotate<I, S>(tag: Context.Key<I, S>, value: S): Tool<Name, Config, Requirements>

  /**
   * Add many annotations to the tool.
   */
  annotateMerge<I>(context: Context.Context<I>): Tool<Name, Config, Requirements>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L196)

Since v4.0.0

# schemas

## EmptyParams

Schema for tools that accept no parameters.

**When to use**

Use when you need an explicit no-parameter `parameters` schema for a tool.

**Details**

This is `Schema.Record(Schema.String, Schema.Never)`, representing an empty
object parameter shape with no additional properties.

**See**

- `make` for the tool constructor that defaults omitted parameters to this schema

**Signature**

```ts
declare const EmptyParams: EmptyParams
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L2001)

Since v4.0.0

## EmptyParams (interface)

Type of the `EmptyParams` schema used for tools with no parameters.

**Details**

It is a record schema with string keys and `never` values, so the generated
parameter schema accepts an empty object shape with no properties.

**Signature**

```ts
export interface EmptyParams extends Schema.$Record<Schema.String, Schema.Never> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L1982)

Since v4.0.0

# type IDs

## DynamicTypeId

Runtime type identifier carried by dynamic tools.

**Details**

`isDynamic` uses this marker to distinguish tools whose schema may be
provided at runtime from user-defined and provider-defined tools.

**Signature**

```ts
declare const DynamicTypeId: "~effect/ai/Tool/Dynamic"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L87)

Since v4.0.0

## DynamicTypeId (type alias)

Type-level representation of the dynamic tool runtime type identifier.

**Signature**

```ts
type DynamicTypeId = "~effect/ai/Tool/Dynamic"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L95)

Since v4.0.0

## ProviderDefinedTypeId

Runtime type identifier carried by provider-defined tools.

**Details**

`isProviderDefined` uses this marker to distinguish tools that are built into
an AI provider from user-defined and dynamic tools.

**Signature**

```ts
declare const ProviderDefinedTypeId: "~effect/ai/Tool/ProviderDefined"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L65)

Since v4.0.0

## ProviderDefinedTypeId (type alias)

Type-level representation of the provider-defined tool runtime type
identifier.

**Signature**

```ts
type ProviderDefinedTypeId = "~effect/ai/Tool/ProviderDefined"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L74)

Since v4.0.0

## TypeId

Runtime type identifier carried by Effect AI tool values.

**Details**

The tool type guards use this marker, together with more specific markers,
to distinguish user-defined, provider-defined, and dynamic tools.

**Signature**

```ts
declare const TypeId: "~effect/ai/Tool"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L44)

Since v4.0.0

## TypeId (type alias)

Type-level representation of the Effect AI tool runtime type identifier.

**Signature**

```ts
type TypeId = "~effect/ai/Tool"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L52)

Since v4.0.0

# unsafe

## unsafeSecureJsonParse

Parses JSON text while rejecting prototype-pollution keys.

**When to use**

Use when you need a JSON parser that throws for invalid JSON or unsafe
object shapes.

**Gotchas**

Invalid JSON throws through `JSON.parse`. Parsed objects containing an own
`__proto__` property or a dangerous `constructor.prototype` shape throw a
`SyntaxError`.

**Signature**

```ts
declare const unsafeSecureJsonParse: (text: string) => unknown
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L1960)

Since v4.0.0

# utility types

## Any (interface)

A type which represents any `Tool`.

**Signature**

```ts
export interface Any extends Tool<
  any,
  {
    readonly parameters: Schema.Top
    readonly success: Schema.Top
    readonly failure: Schema.Top
    readonly failureMode: FailureMode
  },
  any
> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L643)

Since v4.0.0

## AnyDynamic (interface)

A type which represents any dynamic `Tool`.

**Signature**

```ts
export interface AnyDynamic extends Dynamic<
  any,
  {
    readonly parameters: Schema.Top | JsonSchema.JsonSchema
    readonly success: Schema.Top
    readonly failure: Schema.Top
    readonly failureMode: FailureMode
  },
  any
> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L674)

Since v4.0.0

## AnyProviderDefined (interface)

A type which represents any provider-defined `Tool`.

**Signature**

```ts
export interface AnyProviderDefined extends ProviderDefined<
  any,
  any,
  {
    readonly args: Schema.Top
    readonly parameters: Schema.Top
    readonly success: Schema.Top
    readonly failure: Schema.Top
    readonly failureMode: FailureMode
  },
  any
> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L658)

Since v4.0.0

## Failure (type alias)

A utility type to extract the type of the tool call result when it fails.

**Signature**

```ts
type Failure<T> = T extends Tool<infer _Name, infer _Config, infer _Requirements> ? _Config["failure"]["Type"] : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L791)

Since v4.0.0

## FailureEncoded (type alias)

A utility type to extract the encoded type of the tool call result when
it fails.

**Signature**

```ts
type FailureEncoded<T> =
  T extends Tool<infer _Name, infer _Config, infer _Requirements> ? _Config["failure"]["Encoded"] : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L805)

Since v4.0.0

## FailureResult (type alias)

A utility type for the actual failure value that can appear in tool results.
When `failureMode` is `"return"`, this includes both user-defined failures
and `AiError`.

**Signature**

```ts
type FailureResult<T> =
  T extends Tool<infer _Name, infer _Config, infer _Requirements>
    ? _Config["failureMode"] extends "return"
      ? _Config["failure"]["Type"] | AiError.AiError
      : _Config["failure"]["Type"]
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L820)

Since v4.0.0

## FailureResultEncoded (type alias)

The encoded version of `FailureResult`.

**Signature**

```ts
type FailureResultEncoded<T> =
  T extends Tool<infer _Name, infer _Config, infer _Requirements>
    ? _Config["failureMode"] extends "return"
      ? _Config["failure"]["Encoded"] | AiError.AiErrorEncoded
      : _Config["failure"]["Encoded"]
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L834)

Since v4.0.0

## HandlerError (type alias)

A utility type which represents the possible errors that can be raised by
a tool call's handler.

**Signature**

```ts
type HandlerError<T> =
  T extends Tool<infer _Name, infer _Config, infer _Requirements>
    ? _Config["failureMode"] extends "error"
      ? _Config["failure"]["Type"] | AiError.AiError
      : never
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L993)

Since v4.0.0

## HandlerServices (type alias)

A utility type to extract the requirements of a `Tool` call handler.

**Signature**

```ts
type HandlerServices<T> =
  T extends Tool<infer _Name, infer _Config, infer _Requirements> // Parameters must be decoded when received from a model
    ?
        | _Config["parameters"]["DecodingServices"]
        // A tool call `result`, whether success or failure, is encoded and returned
        // as the `encodedResult` along with the `result`
        | ResultEncodingServices<T>
        // Per-request requirements
        | _Requirements
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L886)

Since v4.0.0

## HandlersFor (type alias)

A utility type to create a union of `Handler` types for all tools in a
record.

**Signature**

```ts
type HandlersFor<Tools> = {
  [Name in keyof Tools]: RequiresHandler<Tools[Name]> extends true ? Handler<Tools[Name]["name"]> : never
}[keyof Tools]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L1008)

Since v4.0.0

## Name (type alias)

A utility type to extract the `Name` type from an `Tool`.

**Signature**

```ts
type Name<T> = T extends Tool<infer _Name, infer _Config, infer _Requirements> ? _Name : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L697)

Since v4.0.0

## Parameters (type alias)

A utility type to extract the type of the tool call parameters.

**Signature**

```ts
type Parameters<T> =
  T extends Tool<infer _Name, infer _Config, infer _Requirements> ? _Config["parameters"]["Type"] : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L710)

Since v4.0.0

## ParametersEncoded (type alias)

A utility type to extract the encoded type of the tool call parameters.

**Signature**

```ts
type ParametersEncoded<T> =
  T extends Tool<infer _Name, infer _Config, infer _Requirements> ? _Config["parameters"]["Encoded"] : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L723)

Since v4.0.0

## ParametersSchema (type alias)

A utility type to extract the schema for the parameters which an `Tool`
must be called with.

**Signature**

```ts
type ParametersSchema<T> =
  T extends Tool<infer _Name, infer _Config, infer _Requirements> ? _Config["parameters"] : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L737)

Since v4.0.0

## RequiresHandler (type alias)

A utility type to determine if the specified tool requires a user-defined
handler to be implemented.

**Signature**

```ts
type RequiresHandler<Tool> =
  Tool extends ProviderDefined<infer _Name, infer _Config, infer _RequiresHandler> ? _RequiresHandler : true
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L1020)

Since v4.0.0

## Result (type alias)

A utility type to extract the type of the tool call result whether it
succeeds or fails.

**Details**

When `failureMode` is `"return"`, the result may also be an `AiError`.

**Signature**

```ts
type Result<T> =
  T extends Tool<infer _Name, infer _Config, infer _Requirements>
    ? _Config["failureMode"] extends "return"
      ? Success<T> | Failure<T> | AiError.AiError
      : Success<T> | Failure<T>
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L853)

Since v4.0.0

## ResultDecodingServices (type alias)

A utility type to extract the requirements needed to decode the result of
a `Tool` call.

**Signature**

```ts
type ResultDecodingServices<T> =
  T extends Tool<infer _Name, infer _Config, infer _Requirements>
    ? _Config["success"]["DecodingServices"] | _Config["failure"]["DecodingServices"]
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L920)

Since v4.0.0

## ResultEncoded (type alias)

A utility type to extract the encoded type of the tool call result whether
it succeeds or fails.

**Details**

When `failureMode` is `"return"`, the result may also be an encoded `AiError`.

**Signature**

```ts
type ResultEncoded<T> =
  T extends Tool<infer _Name, infer _Config, infer _Requirements>
    ? _Config["failureMode"] extends "return"
      ? SuccessEncoded<T> | FailureEncoded<T> | AiError.AiErrorEncoded
      : SuccessEncoded<T> | FailureEncoded<T>
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L872)

Since v4.0.0

## ResultEncodingServices (type alias)

A utility type to extract the requirements needed to encode the result of
a `Tool` call.

**Signature**

```ts
type ResultEncodingServices<T> =
  T extends Tool<infer _Name, infer _Config, infer _Requirements>
    ? _Config["success"]["EncodingServices"] | _Config["failure"]["EncodingServices"]
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L906)

Since v4.0.0

## Success (type alias)

A utility type to extract the type of the tool call result when it succeeds.

**Signature**

```ts
type Success<T> = T extends Tool<infer _Name, infer _Config, infer _Requirements> ? _Config["success"]["Type"] : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L750)

Since v4.0.0

## SuccessEncoded (type alias)

A utility type to extract the encoded type of the tool call result when
it succeeds.

**Signature**

```ts
type SuccessEncoded<T> =
  T extends Tool<infer _Name, infer _Config, infer _Requirements> ? _Config["success"]["Encoded"] : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L764)

Since v4.0.0

## SuccessSchema (type alias)

A utility type to extract the schema for the return type of a tool call when
the tool call succeeds.

**Signature**

```ts
type SuccessSchema<T> = T extends Tool<infer _Name, infer _Config, infer _Requirements> ? _Config["success"] : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tool.ts#L778)

Since v4.0.0
