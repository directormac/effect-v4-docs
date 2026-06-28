---
title: IdGenerator.ts
nav_order: 146
parent: "effect"
---

## IdGenerator.ts overview

Provides identifier generation for AI features.

The `IdGenerator` service exposes one operation, `generateId`, which returns
a string inside `Effect`. AI modules use it for values such as tool call ids
and generated response item ids. This module includes the service tag,
service interface, default generator, configurable custom generator, and layer
for providing the service.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [defaultIdGenerator](#defaultidgenerator)
  - [layer](#layer)
  - [make](#make)
- [models](#models)
  - [Service (interface)](#service-interface)
- [options](#options)
  - [MakeOptions (interface)](#makeoptions-interface)
- [services](#services)
  - [IdGenerator (class)](#idgenerator-class)

---

# constructors

## defaultIdGenerator

Default ID generator service implementation.

**Details**

Uses the standard configuration with "id" prefix and generates IDs in the
format "id_XXXXXXXXXXXXXXXX" where X represents random alphanumeric
characters.

**Example** (Generating default IDs)

```ts
import { Effect } from "effect"
import { IdGenerator } from "effect/unstable/ai"

const program = Effect.gen(function* () {
  const id = yield* IdGenerator.defaultIdGenerator.generateId()
  console.log(id) // "id_A7xK9mP2qR5tY8uV"
  return id
})

// Or provide it as a service
const withDefault = program.pipe(Effect.provideService(IdGenerator.IdGenerator, IdGenerator.defaultIdGenerator))
```

**Signature**

```ts
declare const defaultIdGenerator: Service
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/IdGenerator.ts#L187)

Since v4.0.0

## layer

Creates a Layer that provides the IdGenerator service with custom
configuration.

**When to use**

Use when you need to provide ID generation capabilities from validated
configuration.

**Example** (Providing an ID generator layer)

```ts
import { Effect } from "effect"
import { IdGenerator } from "effect/unstable/ai"

// Create a layer for generating AI tool call IDs
const toolCallIdLayer = IdGenerator.layer({
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  prefix: "tool_call",
  separator: "_",
  size: 12
})

const program = Effect.gen(function* () {
  const idGen = yield* IdGenerator.IdGenerator
  const toolCallId = yield* idGen.generateId()
  console.log(toolCallId) // "tool_call_A7XK9MP2QR5T"
  return toolCallId
}).pipe(Effect.provide(toolCallIdLayer))
```

**Signature**

```ts
declare const layer: (options: MakeOptions) => Layer.Layer<IdGenerator, Cause.IllegalArgumentError>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/IdGenerator.ts#L299)

Since v4.0.0

## make

Creates a custom ID generator service with the specified options.

**Details**

Validates the configuration to ensure the separator is not part of the
alphabet, which would cause ambiguity in parsing generated IDs.

**Example** (Creating a custom generator)

```ts
import { Effect } from "effect"
import { IdGenerator } from "effect/unstable/ai"

const program = Effect.gen(function* () {
  // Create a generator for AI assistant message IDs
  const messageIdGen = yield* IdGenerator.make({
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    prefix: "msg",
    separator: "-",
    size: 10
  })

  const messageId = yield* messageIdGen.generateId()
  console.log(messageId) // "msg-A7X9K2M5P8"
  return messageId
})
```

**Example** (Handling invalid generator options)

```ts
import { Effect } from "effect"
import { IdGenerator } from "effect/unstable/ai"

// This will fail with IllegalArgumentError
const invalidConfig = IdGenerator.make({
  alphabet: "ABC123",
  prefix: "test",
  separator: "A", // Error: separator is part of alphabet
  size: 8
})

const program = Effect.gen(function* () {
  const generator = yield* invalidConfig
  return generator
}).pipe(Effect.catch((error) => Effect.succeed(`Configuration error: ${error.message}`)))
```

**Signature**

```ts
declare const make: (
  args_0: MakeOptions
) => Effect.Effect<
  { readonly generateId: () => Effect.Effect<string, never, never> },
  Cause.IllegalArgumentError,
  never
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/IdGenerator.ts#L247)

Since v4.0.0

# models

## Service (interface)

The service interface for ID generation.

**Details**

Defines the contract that all ID generator implementations must fulfill.
The service provides a single method for generating unique identifiers
in an effectful context.

**Example** (Implementing a custom ID generator)

```ts
import { Effect } from "effect"
import type { IdGenerator } from "effect/unstable/ai"

// Custom deterministic implementation
let nextId = 0
const customService: IdGenerator.Service = {
  generateId: () => Effect.sync(() => `custom_${++nextId}`)
}

const program = Effect.gen(function* () {
  const id = yield* customService.generateId()
  console.log(id) // "custom_1"
  return id
})
```

**Signature**

```ts
export interface Service {
  readonly generateId: () => Effect.Effect<string>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/IdGenerator.ts#L84)

Since v4.0.0

# options

## MakeOptions (interface)

Configuration options for creating custom ID generators.

**Example** (Configuring generated IDs)

```ts
import type { IdGenerator } from "effect/unstable/ai"

// Configuration for tool call IDs
const toolCallOptions: IdGenerator.MakeOptions = {
  alphabet: "0123456789ABCDEF",
  prefix: "tool",
  separator: "_",
  size: 8
}

// This will generate IDs like: "tool_A1B2C3D4"
```

**Signature**

```ts
export interface MakeOptions {
  /**
   * The character set to use for generating the random portion of IDs.
   */
  readonly alphabet: string
  /**
   * Optional prefix to prepend to generated IDs.
   */
  readonly prefix?: string | undefined
  /**
   * Character used to separate the prefix from the random portion.
   */
  readonly separator: string
  /**
   * Length of the random portion of the generated ID.
   */
  readonly size: number
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/IdGenerator.ts#L110)

Since v4.0.0

# services

## IdGenerator (class)

Service tag for AI identifier generation services.

**When to use**

Use to access or provide the service that creates identifiers for AI tool
calls and related generated values.

**Details**

This tag is used to provide and access ID generation functionality throughout
the application. It follows Effect's standard service pattern for type-safe
dependency injection.

**Example** (Accessing the ID generator service)

```ts
import { Effect } from "effect"
import { IdGenerator } from "effect/unstable/ai"

const useIdGenerator = Effect.gen(function* () {
  const idGenerator = yield* IdGenerator.IdGenerator
  const newId = yield* idGenerator.generateId()
  return newId
})
```

**Signature**

```ts
declare class IdGenerator
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/IdGenerator.ts#L49)

Since v4.0.0
