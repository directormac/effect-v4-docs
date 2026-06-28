---
title: Chat.ts
nav_order: 144
parent: "effect"
---

## Chat.ts overview

Stateful conversation sessions on top of a language model.

A `Chat` keeps `Prompt` history in a `Ref` and reuses it for text generation,
streaming, and structured output. Each generation call combines the current
history with the caller's new prompt, invokes the active language model, and
appends the response parts back into history. Constructors create fresh
sessions, seed sessions from prompts, restore exported history, or connect a
chat to persistence.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [empty](#empty)
  - [fromExport](#fromexport)
  - [fromJson](#fromjson)
  - [fromPrompt](#fromprompt)
  - [layerPersisted](#layerpersisted)
  - [makePersisted](#makepersisted)
- [errors](#errors)
  - [ChatNotFoundError (class)](#chatnotfounderror-class)
- [models](#models)
  - [Persisted (interface)](#persisted-interface)
  - [Service (interface)](#service-interface)
- [services](#services)
  - [Chat (class)](#chat-class)
  - [Persistence (class)](#persistence-class)
- [utils](#utils)
  - [Persistence (namespace)](#persistence-namespace)
    - [Service (interface)](#service-interface-1)

---

# constructors

## empty

Creates a new Chat service with empty conversation history.

**When to use**

Use when you need to start a fresh chat session without initial context or
system prompts.

**Example** (Creating an empty chat)

```ts
import { Effect } from "effect"
import { Chat } from "effect/unstable/ai"

const freshChat = Effect.gen(function* () {
  const chat = yield* Chat.empty

  const response = yield* chat.generateText({
    prompt: "Hello! Can you introduce yourself?"
  })

  console.log(response.content)

  return chat
})
```

**Signature**

```ts
declare const empty: Effect.Effect<Service, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chat.ts#L487)

Since v4.0.0

## fromExport

Creates a Chat service from previously exported chat data.

**Details**

Restores a chat session from structured data that was previously exported
using the `export` method. Useful for persisting and restoring conversation
state.

**Example** (Restoring chat data)

```ts
import { Effect, Ref } from "effect"
import { Chat } from "effect/unstable/ai"

const restoreChat = Effect.gen(function* () {
  const originalChat = yield* Chat.fromPrompt([
    {
      role: "user",
      content: "Which library are we using?"
    },
    {
      role: "assistant",
      content: "The project uses Effect."
    }
  ])

  const exported = yield* originalChat.export
  const restoredChat = yield* Chat.fromExport(exported)
  const restoredHistory = yield* Ref.get(restoredChat.history)

  console.log(restoredHistory.content.map((message) => message.role))
  // ["user", "assistant"]

  const restoredResponse = restoredHistory.content[1]
  if (restoredResponse?.role === "assistant") {
    const restoredText = restoredResponse.content[0]
    if (restoredText?.type === "text") {
      console.log(restoredText.text)
      // "The project uses Effect."
    }
  }
})
```

**Signature**

```ts
declare const fromExport: (data: unknown) => Effect.Effect<Service, Schema.SchemaError>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chat.ts#L602)

Since v4.0.0

## fromJson

Creates a Chat service from previously exported JSON chat data.

**Details**

Restores a chat session from JSON string that was previously exported
using the `exportJson` method. This is the most convenient way to
persist and restore chat sessions to/from storage systems.

**Example** (Restoring chat history from JSON)

```ts
import { Effect } from "effect"
import { Chat } from "effect/unstable/ai"

const restoreFromJson = Effect.gen(function* () {
  // Load JSON from localStorage or file system
  const jsonData = localStorage.getItem("my-chat-backup")
  if (!jsonData) return yield* Chat.empty

  const restoredChat = yield* Chat.fromJson(jsonData)

  // Chat history is now restored
  const response = yield* restoredChat.generateText({
    prompt: "What were we talking about?"
  })

  return response
}).pipe(
  Effect.catchTag("SchemaError", (error) => {
    console.log("Invalid JSON format:", error.message)
    return Chat.empty // Fallback to empty chat
  })
)
```

**Signature**

```ts
declare const fromJson: (data: string) => Effect.Effect<Service, Schema.SchemaError>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chat.ts#L646)

Since v4.0.0

## fromPrompt

Creates a new Chat service from an initial prompt.

**Details**

This is the primary constructor for creating chat instances. It initializes
a new conversation with the provided prompt as the starting context.

**Example** (Creating a chat from a system prompt)

```ts
import { Effect } from "effect"
import { Chat } from "effect/unstable/ai"

const chatWithSystemPrompt = Effect.gen(function* () {
  const chat = yield* Chat.fromPrompt([
    {
      role: "system",
      content: "You are a helpful assistant specialized in mathematics."
    }
  ])

  const response = yield* chat.generateText({
    prompt: "What is 2+2?"
  })

  return response.content
})
```

**Example** (Restoring chat history from a prompt)

```ts
import { Effect } from "effect"
import { Chat } from "effect/unstable/ai"

// Initialize with conversation history
const existingChat = Effect.gen(function* () {
  const chat = yield* Chat.fromPrompt([
    {
      role: "user",
      content: [{ type: "text", text: "What's the weather like?" }]
    },
    {
      role: "assistant",
      content: [{ type: "text", text: "I don't have access to weather data." }]
    },
    {
      role: "user",
      content: [{ type: "text", text: "Can you help me with coding?" }]
    }
  ])

  const response = yield* chat.generateText({
    prompt: "I need help with TypeScript"
  })

  return response
})
```

**Signature**

```ts
declare const fromPrompt: (prompt: Prompt.RawInput) => Effect.Effect<Service, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chat.ts#L551)

Since v4.0.0

## layerPersisted

Creates a `Layer` for a new chat persistence service.

**When to use**

Use to provide `Chat.Persistence` from a configured `BackingPersistence` when
your application needs persisted chat sessions backed by a named store.

**Details**

The provided store identifier will be used to indicate which "store" the
backing persistence should load chats from.

**See**

- `makePersisted` for the effect constructor when building the service directly instead of providing it as a layer

**Signature**

```ts
declare const layerPersisted: (options: {
  readonly storeId: string
}) => Layer.Layer<Persistence, never, BackingPersistence>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chat.ts#L929)

Since v4.0.0

## makePersisted

Creates a new chat persistence service.

**When to use**

Use when you need programmatic persisted chat creation and retrieval backed
by the current `BackingPersistence`.

**Details**

The provided store identifier will be used to indicate which "store" the
backing persistence should load chats from.

**See**

- `layerPersisted` for the `Layer`-based constructor

**Signature**

```ts
declare const makePersisted: (options: {
  readonly storeId: string
}) => Effect.Effect<Persistence.Service, never, Scope | BackingPersistence>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chat.ts#L767)

Since v4.0.0

# errors

## ChatNotFoundError (class)

Represents an error that occurs when attempting to retrieve a persisted `Chat` that
does not exist in the backing persistence store.

**When to use**

Use to represent a missing persisted conversation when lookup by id cannot
find stored history.

**Signature**

```ts
declare class ChatNotFoundError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chat.ts#L667)

Since v4.0.0

# models

## Persisted (interface)

Represents a `Chat` that is backed by persistence.

**Details**

When calling a text generation method (e.g. `generateText`), the previous
chat history as well as the relevent response parts will be saved to the
backing persistence store.

**Signature**

```ts
export interface Persisted extends Service {
  /**
   * The identifier for the chat in the backing persistence store.
   */
  readonly id: string

  /**
   * Saves the current chat history into the backing persistence store.
   */
  readonly save: Effect.Effect<void, AiError.AiError | PersistenceError>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chat.ts#L737)

Since v4.0.0

## Service (interface)

Represents the interface that the `Chat` service provides.

**When to use**

Use as the service contract for code that receives or constructs a stateful
chat session and needs history, export, text generation, streaming, and
structured-output operations.

**See**

- `Chat` for the context tag that provides this service
- `Persisted` for the persistence-backed extension

**Signature**

````ts
export interface Service {
  /**
   * Reference to the chat history.
   *
   * **Details**
   *
   * Provides direct access to the conversation history for advanced use cases
   * like custom history manipulation or inspection.
   *
   * **Example** (Inspecting chat history)
   *
   * ```ts
   * import { Effect, Ref } from "effect"
   * import { Chat } from "effect/unstable/ai"
   *
   * const inspectHistory = Effect.gen(function*() {
   *   const chat = yield* Chat.empty
   *   const currentHistory = yield* Ref.get(chat.history)
   *   console.log("Current conversation:", currentHistory)
   *   return currentHistory
   * })
   * ```
   */
  readonly history: Ref.Ref<Prompt.Prompt>

  /**
   * Exports the chat history into a structured format.
   *
   * **Details**
   *
   * Returns the complete conversation history as a structured object
   * that can be stored, transmitted, or processed by other systems.
   *
   * **Example** (Exporting chat history)
   *
   * ```ts
   * import { Effect } from "effect"
   * import { Chat } from "effect/unstable/ai"
   *
   * const saveChat = Effect.gen(function*() {
   *   const chat = yield* Chat.empty
   *   yield* chat.generateText({ prompt: "Hello!" })
   *
   *   const exportedData = yield* chat.export
   *
   *   // Save to database or file system
   *   return exportedData
   * })
   * ```
   */
  readonly export: Effect.Effect<unknown, AiError.AiError>

  /**
   * Exports the chat history as a JSON string.
   *
   * **Details**
   *
   * Provides a convenient way to serialize the entire conversation
   * for storage or transmission in JSON format.
   *
   * **Example** (Exporting chat history as JSON)
   *
   * ```ts
   * import { Effect } from "effect"
   * import { Chat } from "effect/unstable/ai"
   *
   * const backupChat = Effect.gen(function*() {
   *   const chat = yield* Chat.empty
   *
   *   yield* chat.generateText({ prompt: "Explain photosynthesis" })
   *
   *   const jsonBackup = yield* chat.exportJson
   *
   *   yield* Effect.sync(() => localStorage.setItem("chat-backup", jsonBackup))
   *
   *   return jsonBackup
   * })
   * ```
   */
  readonly exportJson: Effect.Effect<string, AiError.AiError>

  /**
   * Generate text using a language model for the specified prompt.
   *
   * **Details**
   *
   * If a toolkit is specified, the language model will have access to tools
   * for function calling and enhanced capabilities. Both input and output
   * messages are automatically added to the chat history.
   *
   * **Example** (Generating chat responses)
   *
   * ```ts
   * import { Effect } from "effect"
   * import { Chat } from "effect/unstable/ai"
   *
   * const chatWithAI = Effect.gen(function*() {
   *   const chat = yield* Chat.empty
   *
   *   const response1 = yield* chat.generateText({
   *     prompt: "What is the capital of France?"
   *   })
   *
   *   const response2 = yield* chat.generateText({
   *     prompt: "What's the population of that city?"
   *   })
   *
   *   return [response1.content, response2.content]
   * })
   * ```
   */
  readonly generateText: {
    <Options extends NoExcessProperties<LanguageModel.GenerateTextOptions<{}>, Options>>(
      options: Options & { readonly toolkit?: undefined } & LanguageModel.GenerateTextOptions<{}>
    ): Effect.Effect<
      LanguageModel.GenerateTextResponse<{}>,
      LanguageModel.ExtractError<Options>,
      LanguageModel.LanguageModel | LanguageModel.ExtractServices<Options>
    >
    <
      Tools extends Record<string, Tool.Any>,
      Options extends NoExcessProperties<
        LanguageModel.GenerateTextOptions<Tools> & { readonly toolkit: LanguageModel.ToolkitInput<Tools> },
        Options
      >
    >(
      options: Options &
        LanguageModel.GenerateTextOptions<Tools> & {
          readonly toolkit: LanguageModel.ToolkitInput<Tools>
        }
    ): Effect.Effect<
      LanguageModel.GenerateTextResponse<Tools>,
      LanguageModel.ExtractError<Options>,
      LanguageModel.LanguageModel | LanguageModel.ExtractServices<Options>
    >
    <
      Options extends {
        readonly toolkit: LanguageModel.ToolkitOption<any>
      } & NoExcessProperties<LanguageModel.GenerateTextOptions<any>, Options>
    >(
      options: Options &
        LanguageModel.GenerateTextOptions<LanguageModel.ExtractTools<Options>> & {
          readonly toolkit: Options["toolkit"]
        }
    ): Effect.Effect<
      LanguageModel.GenerateTextResponse<LanguageModel.ExtractTools<Options>>,
      LanguageModel.ExtractError<Options>,
      LanguageModel.LanguageModel | LanguageModel.ExtractServices<Options>
    >
  }

  /**
   * Generate text using a language model with streaming output.
   *
   * **Details**
   *
   * Returns a stream of response parts that are emitted as soon as they're
   * available from the model. Supports tool calling and maintains chat history.
   *
   * **Example** (Streaming chat responses)
   *
   * ```ts
   * import { Effect, Stream } from "effect"
   * import { Chat } from "effect/unstable/ai"
   *
   * const streamingChat = Effect.gen(function*() {
   *   const chat = yield* Chat.empty
   *
   *   const stream = yield* chat.streamText({
   *     prompt: "Write a short story about space exploration"
   *   })
   *
   *   yield* Stream.runForEach(stream, (part) =>
   *     part.type === "text-delta"
   *       ? Effect.sync(() => process.stdout.write(part.delta))
   *       : Effect.void)
   * })
   * ```
   */
  readonly streamText: {
    <Options extends NoExcessProperties<LanguageModel.GenerateTextOptions<{}>, Options>>(
      options: Options & { readonly toolkit?: undefined } & LanguageModel.GenerateTextOptions<{}>
    ): Stream.Stream<
      Response.StreamPart<{}>,
      LanguageModel.ExtractError<Options>,
      LanguageModel.LanguageModel | LanguageModel.ExtractServices<Options>
    >
    <
      Tools extends Record<string, Tool.Any>,
      Options extends NoExcessProperties<
        LanguageModel.GenerateTextOptions<Tools> & { readonly toolkit: LanguageModel.ToolkitInput<Tools> },
        Options
      >
    >(
      options: Options &
        LanguageModel.GenerateTextOptions<Tools> & {
          readonly toolkit: LanguageModel.ToolkitInput<Tools>
        }
    ): Stream.Stream<
      Response.StreamPart<Tools>,
      LanguageModel.ExtractError<Options>,
      LanguageModel.LanguageModel | LanguageModel.ExtractServices<Options>
    >
    <
      Options extends {
        readonly toolkit: LanguageModel.ToolkitOption<any>
      } & NoExcessProperties<LanguageModel.GenerateTextOptions<any>, Options>
    >(
      options: Options &
        LanguageModel.GenerateTextOptions<LanguageModel.ExtractTools<Options>> & {
          readonly toolkit: Options["toolkit"]
        }
    ): Stream.Stream<
      Response.StreamPart<LanguageModel.ExtractTools<Options>>,
      LanguageModel.ExtractError<Options>,
      LanguageModel.LanguageModel | LanguageModel.ExtractServices<Options>
    >
  }

  /**
   * Generate a structured object using a language model and schema.
   *
   * **Details**
   *
   * Forces the model to return data that conforms to the specified schema,
   * enabling structured data extraction and type-safe responses. The
   * conversation history is maintained across calls.
   *
   * **Example** (Generating structured objects)
   *
   * ```ts
   * import { Effect, Schema } from "effect"
   * import { Chat } from "effect/unstable/ai"
   *
   * const ContactSchema = Schema.Struct({
   *   name: Schema.String,
   *   email: Schema.String,
   *   phone: Schema.optional(Schema.String)
   * })
   *
   * const extractContact = Effect.gen(function*() {
   *   const chat = yield* Chat.empty
   *
   *   const contact = yield* chat.generateObject({
   *     prompt: "Extract contact info: John Doe, john@example.com, 555-1234",
   *     schema: ContactSchema
   *   })
   *
   *   console.log(contact.object)
   *   // { name: "John Doe", email: "john@example.com", phone: "555-1234" }
   *
   *   return contact.object
   * })
   * ```
   */
  readonly generateObject: <
    ObjectEncoded extends Record<string, any>,
    ObjectSchema extends Schema.Codec<unknown, ObjectEncoded, unknown, unknown>,
    Options extends NoExcessProperties<LanguageModel.GenerateObjectOptions<any, ObjectSchema>, Options>
  >(
    options: Options & LanguageModel.GenerateObjectOptions<LanguageModel.ExtractTools<Options>, ObjectSchema>
  ) => Effect.Effect<
    LanguageModel.GenerateObjectResponse<LanguageModel.ExtractTools<Options>, ObjectSchema["Type"]>,
    LanguageModel.ExtractError<Options>,
    LanguageModel.ExtractServices<Options> | ObjectSchema["DecodingServices"] | LanguageModel.LanguageModel
  >
}
````

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chat.ts#L86)

Since v4.0.0

# services

## Chat (class)

Service tag for stateful AI conversation sessions.

**When to use**

Use to access or provide conversational AI sessions through the Effect
context.

**Details**

This tag provides access to chat functionality throughout your application,
enabling persistent conversational AI interactions with full context
management.

**Example** (Accessing the Chat service)

```ts
import { Effect } from "effect"
import { Chat } from "effect/unstable/ai"

const program = Effect.gen(function* () {
  const chat = yield* Chat.empty
  const response = yield* chat.generateText({
    prompt: "Explain quantum computing in simple terms"
  })
  return response.content
})
```

**Signature**

```ts
declare class Chat
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chat.ts#L67)

Since v4.0.0

## Persistence (class)

Service tag for persistence-backed AI conversation storage.

**When to use**

Use to provide the storage operations needed by persisted conversation
sessions.

**Signature**

```ts
declare class Persistence
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chat.ts#L686)

Since v4.0.0

# utils

## Persistence (namespace)

Namespace containing the service contract for chat persistence.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chat.ts#L695)

Since v4.0.0

### Service (interface)

Represents the backing persistence for a persisted `Chat`. Allows for
creating and retrieving chats that have been saved to a persistence store.

**Signature**

```ts
export interface Service {
  /**
   * Attempts to retrieve the persisted chat from the backing persistence
   * store with the specified chat identifer. If the chat does not exist in
   * the persistence store, a `ChatNotFoundError` will be returned.
   */
  readonly get: (
    chatId: string,
    options?: {
      readonly timeToLive?: Duration.Input | undefined
    }
  ) => Effect.Effect<Persisted, ChatNotFoundError | PersistenceError>

  /**
   * Attempts to retrieve the persisted chat from the backing persistence
   * store with the specified chat identifer. If the chat does not exist in
   * the persistence store, an empty chat will be created, saved, and
   * returned.
   */
  readonly getOrCreate: (
    chatId: string,
    options?: {
      readonly timeToLive?: Duration.Input | undefined
    }
  ) => Effect.Effect<Persisted, AiError.AiError | PersistenceError>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Chat.ts#L703)

Since v4.0.0
