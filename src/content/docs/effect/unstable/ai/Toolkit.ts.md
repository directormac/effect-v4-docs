---
title: Toolkit.ts
nav_order: 159
parent: "effect"
---

## Toolkit.ts overview

Groups AI tools together with their handlers.

A toolkit connects `Tool` schemas to the handler functions an application
provides for a language model workflow. It can build a handler context or
layer and execute tool calls by name. Execution validates parameters, runs the
handler, encodes the result, supports preliminary streamed results, and
applies the tool's failure mode.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [empty](#empty)
  - [make](#make)
  - [merge](#merge)
- [models](#models)
  - [HandlerContext (interface)](#handlercontext-interface)
  - [Toolkit (interface)](#toolkit-interface)
  - [WithHandler (interface)](#withhandler-interface)
- [utility types](#utility-types)
  - [Any (interface)](#any-interface)
  - [HandlersFrom (type alias)](#handlersfrom-type-alias)
  - [MergeRecords (type alias)](#mergerecords-type-alias)
  - [MergedTools (type alias)](#mergedtools-type-alias)
  - [SimplifyRecord (type alias)](#simplifyrecord-type-alias)
  - [Tools (type alias)](#tools-type-alias)
  - [ToolsByName (type alias)](#toolsbyname-type-alias)
  - [WithHandlerTools (type alias)](#withhandlertools-type-alias)

---

# constructors

## empty

An empty toolkit with no tools.

**When to use**

Use when you need an empty starting point for building toolkits or a default
toolkit value that can be extended with `merge`.

**Signature**

```ts
declare const empty: Toolkit<{}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Toolkit.ts#L437)

Since v4.0.0

## make

Creates a new toolkit from the specified tools.

**Details**

This is the primary constructor for creating toolkits. It accepts multiple
tools and organizes them into a toolkit that can be provided to AI language
models.

**Example** (Creating a toolkit)

```ts
import { Schema } from "effect"
import { Tool, Toolkit } from "effect/unstable/ai"

const GetCurrentTime = Tool.make("GetCurrentTime", {
  description: "Get the current timestamp",
  success: Schema.Number
})

const GetWeather = Tool.make("get_weather", {
  description: "Get weather information",
  parameters: Schema.Struct({ location: Schema.String }),
  success: Schema.Struct({
    temperature: Schema.Number,
    condition: Schema.String
  })
})

const toolkit = Toolkit.make(GetCurrentTime, GetWeather)
```

**Signature**

```ts
declare const make: <Tools extends ReadonlyArray<Tool.Any>>(...tools: Tools) => Toolkit<ToolsByName<Tools>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Toolkit.ts#L474)

Since v4.0.0

## merge

Merges multiple toolkits into a single toolkit.

**Details**

Combines all tools from the provided toolkits into one unified toolkit.
If there are naming conflicts, tools from later toolkits will override
tools from earlier ones.

**Example** (Merging toolkits)

```ts
import { Schema } from "effect"
import { Tool, Toolkit } from "effect/unstable/ai"

const mathToolkit = Toolkit.make(
  Tool.make("add", { success: Schema.Number }),
  Tool.make("subtract", { success: Schema.Number })
)

const utilityToolkit = Toolkit.make(
  Tool.make("get_time", { success: Schema.Number }),
  Tool.make("get_weather", { success: Schema.String })
)

const combined = Toolkit.merge(mathToolkit, utilityToolkit)
```

**Signature**

```ts
declare const merge: <const Toolkits extends ReadonlyArray<Any>>(
  ...toolkits: Toolkits
) => Toolkit<MergedTools<Toolkits>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Toolkit.ts#L541)

Since v4.0.0

# models

## HandlerContext (interface)

Context provided to tool handlers during execution.

**Signature**

```ts
export interface HandlerContext<Tool extends Tool.Any> {
  /**
   * Emit a preliminary result during long-running tool calls.
   *
   * **Details**
   *
   * Preliminary results are streamed to the caller before the handler completes,
   * enabling real-time progress updates for lengthy operations.
   */
  readonly preliminary: (result: Tool.Success<Tool>) => Effect.Effect<void>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Toolkit.ts#L107)

Since v4.0.0

## Toolkit (interface)

Represents a collection of tools which can be used to enhance the
capabilities of a large language model.

**Example** (Defining AI toolkits)

```ts
import { Schema } from "effect"
import { Tool, Toolkit } from "effect/unstable/ai"

const SearchDocs = Tool.make("SearchDocs", {
  description: "Search project documentation",
  parameters: Schema.Struct({ query: Schema.String }),
  success: Schema.Array(Schema.String)
})

const SummarizeText = Tool.make("SummarizeText", {
  description: "Summarize text",
  parameters: Schema.Struct({ text: Schema.String }),
  success: Schema.String
})

const AiToolkit = Toolkit.make(SearchDocs, SummarizeText)

console.log(Object.keys(AiToolkit.tools))
// ["SearchDocs", "SummarizeText"]
```

**Signature**

```ts
export interface Toolkit<in out Tools extends Record<string, Tool.Any>> extends Effect.Effect<
  WithHandler<Tools>,
  never,
  Tool.HandlersFor<Tools>
> {
  new (_: never): {}

  readonly [TypeId]: typeof TypeId

  /**
   * A record containing all tools in this toolkit.
   */
  readonly tools: Tools

  /**
   * A helper method which can be used for type-safe handler declarations.
   */
  of<Handlers extends HandlersFrom<Tools>>(handlers: Handlers): Handlers

  /**
   * Converts a toolkit into a `Context` containing handlers for each tool
   * in the toolkit.
   */
  toHandlers<Handlers extends HandlersFrom<Tools>, EX = never, RX = never>(
    build: Handlers | Effect.Effect<Handlers, EX, RX>
  ): Effect.Effect<Context.Context<Tool.HandlersFor<Tools>>, EX, RX>

  /**
   * Converts a toolkit into a `Layer` containing handlers for each tool in the
   * toolkit.
   */
  toLayer<Handlers extends HandlersFrom<Tools>, EX = never, RX = never>(
    /**
     * Handler functions or Effect that produces handlers.
     */
    build: Handlers | Effect.Effect<Handlers, EX, RX>
  ): Layer.Layer<Tool.HandlersFor<Tools>, EX, Exclude<RX, Scope.Scope>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Toolkit.ts#L60)

Since v4.0.0

## WithHandler (interface)

A toolkit instance with registered handlers ready for tool execution.

**Signature**

```ts
export interface WithHandler<in out Tools extends Record<string, Tool.Any>> {
  /**
   * The tools available in this toolkit instance.
   */
  readonly tools: Tools

  /**
   * Executes a tool call by name.
   *
   * **Details**
   *
   * Validates the input parameters, executes the corresponding handler, and
   * streams back both the typed result and encoded result. Streaming allows
   * handlers to emit preliminary results before completion.
   */
  readonly handle: <Name extends keyof Tools>(
    /**
     * The name of the tool to execute.
     */
    name: Name,
    /**
     * Parameters to pass to the tool handler.
     */
    params: Tool.Parameters<Tools[Name]>
  ) => Effect.Effect<
    Stream.Stream<Tool.HandlerResult<Tools[Name]>, Tool.HandlerError<Tools[Name]>, Tool.HandlerServices<Tools[Name]>>,
    AiError.AiError
  >
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Toolkit.ts#L179)

Since v4.0.0

# utility types

## Any (interface)

Represents any `Toolkit` instance, used for generic constraints.

**Signature**

```ts
export interface Any {
  readonly [TypeId]: typeof TypeId
  readonly tools: Record<string, Tool.Any>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Toolkit.ts#L125)

Since v4.0.0

## HandlersFrom (type alias)

A utility type that maps tool names to their required handler functions.

**Details**

Handlers can return either the tool's custom failure type, an `AiErrorReason`
(which will be wrapped in `AiError`), or a full `AiError`.

**Signature**

```ts
type HandlersFrom<Tools> = {
  readonly [Name in keyof Tools as Tool.RequiresHandler<Tools[Name]> extends true ? Name : never]: (
    params: Tool.Parameters<Tools[Name]>,
    context: HandlerContext<Tools[Name]>
  ) => Effect.Effect<
    Tool.Success<Tools[Name]>,
    Tool.Failure<Tools[Name]> | AiError.AiError | AiError.AiErrorReason,
    Tool.HandlerServices<Tools[Name]>
  >
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Toolkit.ts#L162)

Since v4.0.0

## MergeRecords (type alias)

A utility type which merges a union of tool records into a single record.

**Signature**

```ts
type MergeRecords<U> = {
  readonly [K in Extract<U extends unknown ? keyof U : never, string>]: Extract<
    U extends Record<K, infer V> ? V : never,
    Tool.Any
  >
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Toolkit.ts#L492)

Since v4.0.0

## MergedTools (type alias)

A utility type which merges the tools from multiple toolkits into a single
record.

**Signature**

```ts
type { [K in keyof MergeRecords<Tools<Toolkits[number]>>]: MergeRecords<Tools<Toolkits[number]>>[K]; } = SimplifyRecord<
  MergeRecords<Tools<Toolkits[number]>>
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Toolkit.ts#L506)

Since v4.0.0

## SimplifyRecord (type alias)

A utility type which flattens a record type for improved IDE display.

**Signature**

```ts
type { [K in keyof T]: T[K]; } = { [K in keyof T]: T[K] } & {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Toolkit.ts#L484)

Since v4.0.0

## Tools (type alias)

A utility type which can be used to extract the tool definitions from a
toolkit.

**Signature**

```ts
type Tools<T> = T extends Toolkit<infer Tools> ? Tools : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Toolkit.ts#L137)

Since v4.0.0

## ToolsByName (type alias)

A utility type which transforms either a record or an array of tools into
a record where keys are tool names and values are the tool instances.

**Signature**

```ts
type ToolsByName<Tools> =
  Tools extends Record<string, Tool.Any>
    ? { readonly [Name in keyof Tools]: Tools[Name] }
    : Tools extends ReadonlyArray<Tool.Any>
      ? { readonly [Tool in Tools[number] as Tool["name"]]: Tool }
      : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Toolkit.ts#L146)

Since v4.0.0

## WithHandlerTools (type alias)

A utility type which can be used to extract the tools from a toolkit with
handlers.

**Signature**

```ts
type WithHandlerTools<T> = T extends WithHandler<infer Tools> ? Tools : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Toolkit.ts#L220)

Since v4.0.0
