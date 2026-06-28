---
title: McpServer.ts
nav_order: 150
parent: "effect"
---

## McpServer.ts overview

Builds Model Context Protocol (MCP) servers with Effect.

The `McpServer` service stores the tools, resources, resource templates,
prompts, completions, initialized clients, and outgoing notifications exposed
by a server. This module also includes the server runner, custom protocol,
stdio, and HTTP layers, registration helpers, and APIs that let handlers ask
the connected client for structured input or read its advertised
capabilities.

Since v4.0.0

---

## Exports Grouped by Category

- [capabilities](#capabilities)
  - [clientCapabilities](#clientcapabilities)
- [constructors](#constructors)
  - [run](#run)
- [elicitation](#elicitation)
  - [elicit](#elicit)
- [layers](#layers)
  - [layer](#layer)
  - [layerHttp](#layerhttp)
  - [layerStdio](#layerstdio)
- [models](#models)
  - [ResourceCompletions (type alias)](#resourcecompletions-type-alias)
- [prompts](#prompts)
  - [prompt](#prompt)
  - [registerPrompt](#registerprompt)
- [resources](#resources)
  - [registerResource](#registerresource)
  - [resource](#resource)
- [server](#server)
  - [McpServer (class)](#mcpserver-class)
- [tools](#tools)
  - [registerToolkit](#registertoolkit)
  - [toolkit](#toolkit)
- [utility types](#utility-types)
  - [ValidateCompletions (type alias)](#validatecompletions-type-alias)

---

# capabilities

## clientCapabilities

Accesses the current client's capabilities.

**Signature**

```ts
declare const clientCapabilities: Effect.Effect<ClientCapabilities, never, McpServerClient>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpServer.ts#L1220)

Since v4.0.0

# constructors

## run

Runs an MCP server over the current `RpcServer.Protocol`.

**Details**

The server performs initialization and session handling, serves registered
tools, resources, and prompts, and forwards queued server notifications to
initialized clients.

**Signature**

```ts
declare const run: (options: {
  readonly name: string
  readonly version: string
  readonly extensions?: Record<`${string}/${string}`, unknown> | undefined
}) => Effect.Effect<never, never, McpServer | RpcServer.Protocol>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpServer.ts#L358)

Since v4.0.0

# elicitation

## elicit

Collects structured input from the current MCP client and decodes the
accepted response with `schema`.

**Details**

Accepted content is decoded with the supplied schema, declined requests fail
with `ElicitationDeclined`, and canceled requests interrupt the effect.

**Signature**

```ts
declare const elicit: <S extends Schema.ConstraintEncoder<Record<string, unknown>, unknown>>(options: {
  readonly message: string
  readonly schema: S
}) => Effect.Effect<S["Type"], ElicitationDeclined, McpServerClient | S["DecodingServices"]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpServer.ts#L1183)

Since v4.0.0

# layers

## layer

Creates a layer that starts an MCP server over an existing
`RpcServer.Protocol` and provides the `McpServer` and `McpServerClient`
services.

**When to use**

Use when you already have a custom or externally provided
`RpcServer.Protocol` and want to start an MCP server as part of a layer
graph.

**Details**

The returned layer forks `run(options)` in the layer scope and merges
`McpServer.layer`, so registration layers can use the `McpServer` service
while the server is running.

**Gotchas**

Unlike `layerStdio` and `layerHttp`, this layer does not install a concrete
transport. The surrounding layer graph must provide `RpcServer.Protocol`.

**See**

- `run` for the effect form used by this layer
- `layerStdio` for a stdio-backed layer that installs the MCP protocol and NDJSON-RPC serialization
- `layerHttp` for an HTTP-backed layer that registers with `HttpRouter` and installs JSON-RPC serialization

**Signature**

```ts
declare const layer: (options: {
  readonly name: string
  readonly version: string
  readonly extensions?: Record<`${string}/${string}`, unknown> | undefined
}) => Layer.Layer<McpServer | McpServerClient, never, RpcServer.Protocol>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpServer.ts#L560)

Since v4.0.0

## layerHttp

Registers an HTTP POST JSON-RPC route at `options.path` on the current
`HttpRouter`.

**When to use**

Use to expose an MCP server through an existing `HttpRouter`.

**Details**

This layer composes `layer(options)`, `RpcServer.layerProtocolHttp(options)`,
and `RpcSerialization.layerJsonRpc()`.

**See**

- `layerStdio` for exposing the server over stdio
- `layer` for the base MCP server layer without a transport protocol

**Signature**

```ts
declare const layerHttp: (options: {
  readonly name: string
  readonly version: string
  readonly path: HttpRouter.PathInput
  readonly extensions?: Record<`${string}/${string}`, unknown> | undefined
}) => Layer.Layer<McpServer | McpServerClient, never, HttpRouter.HttpRouter>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpServer.ts#L656)

Since v4.0.0

## layerStdio

Runs the McpServer, using stdio for input and output.

**Example** (Running an MCP server over stdio)

```ts
import { Effect, Layer, Logger, Schema } from "effect"
import { NodeRuntime, NodeStdio } from "@effect/platform-node"
import { McpSchema, McpServer } from "effect/unstable/ai"

const idParam = McpSchema.param("id", Schema.Number)

// Define a resource template for a README file
const ReadmeTemplate = McpServer.resource`file://readme/${idParam}`({
  name: "README Template",
  // You can add auto-completion for the ID parameter
  completion: {
    id: (_) => Effect.succeed([1, 2, 3, 4, 5])
  },
  content: Effect.fn(function* (_uri, id) {
    return `# MCP Server Demo - ID: ${id}`
  })
})

// Define a test prompt with parameters
const TestPrompt = McpServer.prompt({
  name: "Test Prompt",
  description: "A test prompt to demonstrate MCP server capabilities",
  parameters: {
    flightNumber: Schema.String
  },
  completion: {
    flightNumber: () => Effect.succeed(["FL123", "FL456", "FL789"])
  },
  content: ({ flightNumber }) => Effect.succeed(`Get the booking details for flight number: ${flightNumber}`)
})

// Merge all the resources and prompts into a single server layer
const ServerLayer = Layer.mergeAll(ReadmeTemplate, TestPrompt).pipe(
  // Provide the MCP server implementation
  Layer.provide(
    McpServer.layerStdio({
      name: "Demo Server",
      version: "1.0.0"
    })
  ),
  Layer.provide(NodeStdio.layer),
  Layer.provide(Layer.succeed(Logger.LogToStderr)(true))
)

Layer.launch(ServerLayer).pipe(NodeRuntime.runMain)
```

**Signature**

```ts
declare const layerStdio: (options: {
  readonly name: string
  readonly version: string
  readonly extensions?: Record<`${string}/${string}`, unknown> | undefined
}) => Layer.Layer<McpServer | McpServerClient, never, Stdio>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpServer.ts#L627)

Since v4.0.0

# models

## ResourceCompletions (type alias)

Completion-handler map for a resource URI template.

**Details**

Each schema interpolation contributes a parameter key, using an explicit
`Param` name when present or `paramN` otherwise, and each handler returns
candidate values for that parameter.

**Signature**

```ts
type ResourceCompletions<Schemas> = {
  readonly [K in Extract<keyof Schemas, `${number}`> as Schemas[K] extends Param<infer Id, infer _S>
    ? Id
    : `param${K}`]: (input: string) => Effect.Effect<Array<Schemas[K]["Type"]>, any, any>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpServer.ts#L785)

Since v4.0.0

# prompts

## prompt

Creates a layer that registers an MCP prompt.

**When to use**

Use to compose prompt registration into an MCP server layer.

**Details**

Parameters are decoded with the supplied schema, completion handlers encode
per-parameter suggestions, and string prompt content is converted into a user
text message.

**See**

- `registerPrompt` for the Effect-level prompt registration API

**Signature**

```ts
declare const prompt: <
  E,
  R,
  Params extends Schema.Struct.Fields = {},
  const Completions extends {
    readonly [K in keyof Params]?: (input: string) => Effect.Effect<Array<Params[K]["Type"]>, any, any>
  } = {}
>(options: {
  readonly name: string
  readonly description?: string | undefined
  readonly parameters?: Params | undefined
  readonly completion?: ValidateCompletions<Completions, Extract<keyof Params, string>> | undefined
  readonly content: (
    params: Schema.Struct.Type<Params>
  ) => Effect.Effect<Array<typeof PromptMessage.Type> | string, E, R>
  readonly annotations?: Context.Context<never> | undefined
}) => Layer.Layer<never, never, Exclude<Schema.Struct.DecodingServices<Params> | R, McpServerClient>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpServer.ts#L1148)

Since v4.0.0

## registerPrompt

Registers an MCP prompt from an Effect program.

**When to use**

Use when you are already inside an Effect program with an `McpServer`
service and need to add a prompt handler directly.

**Details**

Parameters are decoded with the supplied schema, completion handlers encode
per-parameter suggestions, and string prompt content is converted into a user
text message.

**See**

- `prompt` for the layer-based prompt registration wrapper

**Signature**

```ts
declare const registerPrompt: <
  E,
  R,
  Params extends Schema.Struct.Fields = {},
  const Completions extends {
    readonly [K in keyof Params]?: (input: string) => Effect.Effect<Array<Params[K]>, any, any>
  } = {}
>(options: {
  readonly name: string
  readonly description?: string | undefined
  readonly parameters?: Params | undefined
  readonly completion?: ValidateCompletions<Completions, Extract<keyof Params, string>> | undefined
  readonly content: (params: Params) => Effect.Effect<Array<typeof PromptMessage.Type> | string, E, R>
  readonly annotations?: Context.Context<never> | undefined
}) => Effect.Effect<void, never, Exclude<Schema.Struct.DecodingServices<Params> | R, McpServerClient> | McpServer>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpServer.ts#L1041)

Since v4.0.0

# resources

## registerResource

Registers an MCP resource or resource template from an Effect program.

**When to use**

Use when you are already inside an Effect program with an `McpServer`
service and need to add a concrete resource or URI-template resource
directly.

**See**

- `resource` for the layer-based resource registration wrapper

**Signature**

```ts
declare const registerResource: {
  <E, R>(options: {
    readonly uri: string
    readonly name: string
    readonly description?: string | undefined
    readonly mimeType?: string | undefined
    readonly audience?: ReadonlyArray<"user" | "assistant"> | undefined
    readonly priority?: number | undefined
    readonly content: Effect.Effect<typeof ReadResourceResult.Type | string | Uint8Array, E, R>
    readonly annotations?: Context.Context<never> | undefined
  }): Effect.Effect<void, never, Exclude<R, McpServerClient> | McpServer>
  <const Schemas extends ReadonlyArray<Schema.Constraint>>(
    segments: TemplateStringsArray,
    ...schemas: Schemas
  ): <E, R, const Completions extends Partial<ResourceCompletions<Schemas>> = {}>(options: {
    readonly name: string
    readonly description?: string | undefined
    readonly mimeType?: string | undefined
    readonly audience?: ReadonlyArray<"user" | "assistant"> | undefined
    readonly priority?: number | undefined
    readonly completion?: ValidateCompletions<Completions, keyof ResourceCompletions<Schemas>> | undefined
    readonly content: (
      uri: string,
      ...params: { readonly [K in keyof Schemas]: Schemas[K]["Type"] }
    ) => Effect.Effect<typeof ReadResourceResult.Type | string | Uint8Array, E, R>
    readonly annotations?: Context.Context<never> | undefined
  }) => Effect.Effect<
    void,
    never,
    | Exclude<
        | Schemas[number]["DecodingServices"]
        | Schemas[number]["EncodingServices"]
        | R
        | (Completions[keyof Completions] extends (input: string) => infer Ret
            ? Ret extends Effect.Effect<infer _A, infer _E, infer _R>
              ? _R
              : never
            : never),
        McpServerClient
      >
    | McpServer
  >
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpServer.ts#L806)

Since v4.0.0

## resource

Creates a layer that registers an MCP resource or resource template.

**When to use**

Use to compose resource registration into an MCP server layer.

**See**

- `registerResource` for the Effect-level resource registration API

**Signature**

```ts
declare const resource: {
  <E, R>(options: {
    readonly uri: string
    readonly name: string
    readonly description?: string | undefined
    readonly mimeType?: string | undefined
    readonly audience?: ReadonlyArray<"user" | "assistant"> | undefined
    readonly priority?: number | undefined
    readonly content: Effect.Effect<typeof ReadResourceResult.Type | string | Uint8Array, E, R>
  }): Layer.Layer<never, never, Exclude<R, McpServerClient>>
  <const Schemas extends ReadonlyArray<Schema.Constraint>>(
    segments: TemplateStringsArray,
    ...schemas: Schemas
  ): <E, R, const Completions extends Partial<ResourceCompletions<Schemas>> = {}>(options: {
    readonly name: string
    readonly description?: string | undefined
    readonly mimeType?: string | undefined
    readonly audience?: ReadonlyArray<"user" | "assistant"> | undefined
    readonly priority?: number | undefined
    readonly completion?: ValidateCompletions<Completions, keyof ResourceCompletions<Schemas>> | undefined
    readonly content: (
      uri: string,
      ...params: { readonly [K in keyof Schemas]: Schemas[K]["Type"] }
    ) => Effect.Effect<typeof ReadResourceResult.Type | string | Uint8Array, E, R>
  }) => Layer.Layer<
    never,
    never,
    Exclude<
      | R
      | (Completions[keyof Completions] extends (input: string) => infer Ret
          ? Ret extends Effect.Effect<infer _A, infer _E, infer _R>
            ? _R
            : never
          : never),
      McpServerClient
    >
  >
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpServer.ts#L968)

Since v4.0.0

# server

## McpServer (class)

Service that stores and serves an MCP server's registered tools, resources,
prompts, completions, and outgoing notifications.

**Details**

Handlers use this service to register capabilities and resolve incoming MCP
requests.

**Signature**

```ts
declare class McpServer
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpServer.ts#L95)

Since v4.0.0

# tools

## registerToolkit

Registers a `Toolkit` with the `McpServer`.

**Signature**

```ts
declare const registerToolkit: <Tools extends Record<string, Tool.Any>>(
  toolkit: Toolkit.Toolkit<Tools>
) => Effect.Effect<
  void,
  never,
  McpServer | Tool.HandlersFor<Tools> | Exclude<Tool.HandlerServices<Tools>, McpServerClient>
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpServer.ts#L673)

Since v4.0.0

## toolkit

Registers an `AiToolkit` with the `McpServer`.

**Signature**

```ts
declare const toolkit: <Tools extends Record<string, Tool.Any>>(
  toolkit: Toolkit.Toolkit<Tools>
) => Layer.Layer<never, never, Tool.HandlersFor<Tools> | Exclude<Tool.HandlerServices<Tools>, McpServerClient>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpServer.ts#L749)

Since v4.0.0

# utility types

## ValidateCompletions (type alias)

Utility type that validates a completion-handler record against the allowed
parameter keys.

**Signature**

```ts
type ValidateCompletions<Completions, Keys> = Completions & {
  readonly [K in keyof Completions]: K extends Keys ? (input: string) => any : never
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpServer.ts#L767)

Since v4.0.0
