---
title: Prompt.ts
nav_order: 153
parent: "effect"
---

## Prompt.ts overview

Defines prompts sent to AI language models.

A prompt is an ordered list of messages. Messages can use roles such as
system, user, assistant, and tool, and their content can be split into typed
parts such as text, files, reasoning, tool calls, tool results, and approval
messages. This module helps build prompts, combine them, and convert raw
input or response parts into the shared prompt shape.

Since v4.0.0

---

## Exports Grouped by Category

- [combinators](#combinators)
  - [appendSystem](#appendsystem)
  - [concat](#concat)
  - [prependSystem](#prependsystem)
  - [setSystem](#setsystem)
- [constructors](#constructors)
  - [assistantMessage](#assistantmessage)
  - [empty](#empty)
  - [filePart](#filepart)
  - [fromMessages](#frommessages)
  - [fromResponseParts](#fromresponseparts)
  - [make](#make)
  - [makeMessage](#makemessage)
  - [makePart](#makepart)
  - [reasoningPart](#reasoningpart)
  - [systemMessage](#systemmessage)
  - [textPart](#textpart)
  - [toolApprovalRequestPart](#toolapprovalrequestpart)
  - [toolApprovalResponsePart](#toolapprovalresponsepart)
  - [toolCallPart](#toolcallpart)
  - [toolMessage](#toolmessage)
  - [toolResultPart](#toolresultpart)
  - [userMessage](#usermessage)
- [guards](#guards)
  - [isMessage](#ismessage)
  - [isPart](#ispart)
  - [isPrompt](#isprompt)
- [models](#models)
  - [AssistantMessage (interface)](#assistantmessage-interface)
  - [AssistantMessageEncoded (interface)](#assistantmessageencoded-interface)
  - [AssistantMessagePart (type alias)](#assistantmessagepart-type-alias)
  - [AssistantMessagePartEncoded (type alias)](#assistantmessagepartencoded-type-alias)
  - [BaseMessage (interface)](#basemessage-interface)
  - [BaseMessageEncoded (interface)](#basemessageencoded-interface)
  - [BasePart (interface)](#basepart-interface)
  - [BasePartEncoded (interface)](#basepartencoded-interface)
  - [FilePart (interface)](#filepart-interface)
  - [FilePartEncoded (interface)](#filepartencoded-interface)
  - [Message (type alias)](#message-type-alias)
  - [MessageEncoded (type alias)](#messageencoded-type-alias)
  - [Part (type alias)](#part-type-alias)
  - [PartEncoded (type alias)](#partencoded-type-alias)
  - [Prompt (interface)](#prompt-interface)
  - [PromptEncoded (interface)](#promptencoded-interface)
  - [RawInput (type alias)](#rawinput-type-alias)
  - [ReasoningPart (interface)](#reasoningpart-interface)
  - [ReasoningPartEncoded (interface)](#reasoningpartencoded-interface)
  - [SystemMessage (interface)](#systemmessage-interface)
  - [SystemMessageEncoded (interface)](#systemmessageencoded-interface)
  - [TextPart (interface)](#textpart-interface)
  - [TextPartEncoded (interface)](#textpartencoded-interface)
  - [ToolApprovalRequestPart (interface)](#toolapprovalrequestpart-interface)
  - [ToolApprovalRequestPartEncoded (interface)](#toolapprovalrequestpartencoded-interface)
  - [ToolApprovalResponsePart (interface)](#toolapprovalresponsepart-interface)
  - [ToolApprovalResponsePartEncoded (interface)](#toolapprovalresponsepartencoded-interface)
  - [ToolCallPart (interface)](#toolcallpart-interface)
  - [ToolCallPartEncoded (interface)](#toolcallpartencoded-interface)
  - [ToolMessage (interface)](#toolmessage-interface)
  - [ToolMessageEncoded (interface)](#toolmessageencoded-interface)
  - [ToolMessagePart (type alias)](#toolmessagepart-type-alias)
  - [ToolMessagePartEncoded (type alias)](#toolmessagepartencoded-type-alias)
  - [ToolResultPart (interface)](#toolresultpart-interface)
  - [ToolResultPartEncoded (interface)](#toolresultpartencoded-interface)
  - [UserMessage (interface)](#usermessage-interface)
  - [UserMessageEncoded (interface)](#usermessageencoded-interface)
  - [UserMessagePart (type alias)](#usermessagepart-type-alias)
  - [UserMessagePartEncoded (type alias)](#usermessagepartencoded-type-alias)
- [options](#options)
  - [AssistantMessageOptions (interface)](#assistantmessageoptions-interface)
  - [FilePartOptions (interface)](#filepartoptions-interface)
  - [ProviderOptions](#provideroptions)
  - [ProviderOptions (type alias)](#provideroptions-type-alias)
  - [ReasoningPartOptions (interface)](#reasoningpartoptions-interface)
  - [SystemMessageOptions (interface)](#systemmessageoptions-interface)
  - [TextPartOptions (interface)](#textpartoptions-interface)
  - [ToolApprovalRequestPartOptions (interface)](#toolapprovalrequestpartoptions-interface)
  - [ToolApprovalResponsePartOptions (interface)](#toolapprovalresponsepartoptions-interface)
  - [ToolCallPartOptions (interface)](#toolcallpartoptions-interface)
  - [ToolMessageOptions (interface)](#toolmessageoptions-interface)
  - [ToolResultPartOptions (interface)](#toolresultpartoptions-interface)
  - [UserMessageOptions (interface)](#usermessageoptions-interface)
- [schemas](#schemas)
  - [AssistantMessage](#assistantmessage-1)
  - [ContentFromString](#contentfromstring)
  - [FilePart](#filepart-1)
  - [Message](#message)
  - [Prompt](#prompt)
  - [ReasoningPart](#reasoningpart-1)
  - [SystemMessage](#systemmessage-1)
  - [TextPart](#textpart-1)
  - [ToolApprovalRequestPart](#toolapprovalrequestpart-1)
  - [ToolApprovalResponsePart](#toolapprovalresponsepart-1)
  - [ToolCallPart](#toolcallpart-1)
  - [ToolMessage](#toolmessage-1)
  - [ToolResultPart](#toolresultpart-1)
  - [UserMessage](#usermessage-1)
- [utility types](#utility-types)
  - [MessageConstructorParams (type alias)](#messageconstructorparams-type-alias)
  - [PartConstructorParams (type alias)](#partconstructorparams-type-alias)

---

# combinators

## appendSystem

Creates a new prompt with a leading system message. If the prompt already has
a system message, the new message uses the provided content appended to the
first existing system message's content; the original messages remain after
it.

**Example** (Appending system instructions)

```ts
import { Prompt } from "effect/unstable/ai"

const systemPrompt = Prompt.make([
  {
    role: "system",
    content: "You are an expert in programming."
  }
])

const userPrompt = Prompt.make("Hello, world!")

const prompt = Prompt.concat(systemPrompt, userPrompt)

const replaced = Prompt.appendSystem(prompt, " You are a helpful assistant.")
// result content: "You are an expert in programming. You are a helpful assistant."
```

**Signature**

```ts
declare const appendSystem: { (content: string): (self: Prompt) => Prompt; (self: Prompt, content: string): Prompt }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L2217)

Since v4.0.0

## concat

Concatenates a prompt with additional raw input by concatenating messages.

**Details**

The returned prompt contains all messages from the original prompt followed
by the provided raw input, preserving message order.

**Example** (Concatenating prompts)

```ts
import { Prompt } from "effect/unstable/ai"

const systemPrompt = Prompt.make([
  {
    role: "system",
    content: "You are a helpful assistant."
  }
])

const merged = Prompt.concat(systemPrompt, "Hello, world!")
```

**Signature**

```ts
declare const concat: { (input: RawInput): (self: Prompt) => Prompt; (self: Prompt, input: RawInput): Prompt }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L2075)

Since v4.0.0

## prependSystem

Creates a new prompt with a leading system message. If the prompt already has
a system message, the new message uses the provided content prepended to the
first existing system message's content; the original messages remain after
it.

**Example** (Prepending system instructions)

```ts
import { Prompt } from "effect/unstable/ai"

const systemPrompt = Prompt.make([
  {
    role: "system",
    content: "You are an expert in programming."
  }
])

const userPrompt = Prompt.make("Hello, world!")

const prompt = Prompt.concat(systemPrompt, userPrompt)

const replaced = Prompt.prependSystem(prompt, "You are a helpful assistant. ")
// result content: "You are a helpful assistant. You are an expert in programming."
```

**Signature**

```ts
declare const prependSystem: { (content: string): (self: Prompt) => Prompt; (self: Prompt, content: string): Prompt }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L2168)

Since v4.0.0

## setSystem

Creates a new prompt from the specified prompt with the system message set
to the specified text content.

**Gotchas**

This method removes and replaces any previous system message from the
prompt.

**Example** (Replacing system instructions)

```ts
import { Prompt } from "effect/unstable/ai"

const systemPrompt = Prompt.make([
  {
    role: "system",
    content: "You are a helpful assistant."
  }
])

const userPrompt = Prompt.make("Hello, world!")

const prompt = Prompt.concat(systemPrompt, userPrompt)

const replaced = Prompt.setSystem(prompt, "You are an expert in programming")
```

**Signature**

```ts
declare const setSystem: { (content: string): (self: Prompt) => Prompt; (self: Prompt, content: string): Prompt }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L2125)

Since v4.0.0

# constructors

## assistantMessage

Constructs a new assistant message.

**When to use**

Use to add assistant-role prompt history or model responses.

**Details**

This is the role-specific wrapper around `makeMessage("assistant", params)`.

**Signature**

```ts
declare const assistantMessage: (params: MessageConstructorParams<AssistantMessage>) => AssistantMessage
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L1526)

Since v4.0.0

## empty

An empty prompt with no messages.

**Example** (Creating an empty prompt)

```ts
import { Prompt } from "effect/unstable/ai"

const emptyPrompt = Prompt.empty
console.log(emptyPrompt.content) // []
```

**Signature**

```ts
declare const empty: Prompt
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L1822)

Since v4.0.0

## filePart

Constructs a `FilePart` for prompt file attachments.

**When to use**

Use to create the file-attachment part of a prompt from typed file part
parameters.

**See**

- `makePart` for the generic part constructor

**Signature**

```ts
declare const filePart: (params: PartConstructorParams<FilePart>) => FilePart
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L493)

Since v4.0.0

## fromMessages

Creates a Prompt from an array of messages.

**Example** (Creating prompts from messages)

```ts
import { Prompt } from "effect/unstable/ai"

const messages: ReadonlyArray<Prompt.Message> = [
  Prompt.makeMessage("system", {
    content: "You are a coding assistant."
  }),
  Prompt.makeMessage("user", {
    content: [Prompt.makePart("text", { text: "Help me with TypeScript" })]
  })
]

const prompt = Prompt.fromMessages(messages)
```

**Signature**

```ts
declare const fromMessages: (messages: ReadonlyArray<Message>) => Prompt
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L1893)

Since v4.0.0

## fromResponseParts

Creates a `Prompt` from response parts by folding completed text and
reasoning streams into assistant parts, placing tool calls and approval
requests in an assistant message, and placing non-preliminary tool results
in a tool message using their encoded results.

**Example** (Creating prompts from response parts)

```ts
import { Prompt, Response } from "effect/unstable/ai"

const responseParts: ReadonlyArray<Response.AnyPart> = [
  Response.makePart("text", {
    text: "Hello there!"
  }),
  Response.makePart("tool-call", {
    id: "call_1",
    name: "get_time",
    params: {},
    providerExecuted: false
  }),
  Response.makePart("tool-result", {
    id: "call_1",
    name: "get_time",
    isFailure: false,
    result: "10:30 AM",
    encodedResult: "10:30 AM",
    providerExecuted: false,
    preliminary: false
  })
]

const prompt = Prompt.fromResponseParts(responseParts)
// Creates an assistant message with the response content
```

**Signature**

```ts
declare const fromResponseParts: (parts: ReadonlyArray<Response.AnyPart>) => Prompt
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L1934)

Since v4.0.0

## make

Creates a `Prompt` from an input.

**Details**

This is the primary constructor for creating prompts, supporting multiple
input formats for convenience and flexibility.

**Example** (Creating prompts from inputs)

```ts
import { Prompt } from "effect/unstable/ai"

// From string - creates a user message
const textPrompt = Prompt.make("Hello, how are you?")

// From messages array
const structuredPrompt = Prompt.make([
  { role: "system", content: "You are a helpful assistant." },
  { role: "user", content: [{ type: "text", text: "Hi!" }] }
])

// From existing prompt
declare const existingPrompt: Prompt.Prompt
const copiedPrompt = Prompt.make(existingPrompt)
```

**Signature**

```ts
declare const make: (input: RawInput) => Prompt
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L1854)

Since v4.0.0

## makeMessage

Creates a new message with the specified role.

**Example** (Creating messages)

```ts
import { Prompt } from "effect/unstable/ai"

const textPart = Prompt.makePart("text", {
  text: "Hello, world!"
})

const userMessage = Prompt.makeMessage("user", {
  content: [textPart]
})
```

**Signature**

```ts
declare const makeMessage: <const Role extends Message["role"]>(
  role: Role,
  params: Omit<Extract<Message, { role: Role }>, typeof MessageTypeId | "role" | "options"> & {
    readonly options?: Extract<Message, { role: Role }>["options"] | undefined
  }
) => Extract<Message, { role: Role }>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L1030)

Since v4.0.0

## makePart

Creates a new content part of the specified type.

**Example** (Creating content parts)

```ts
import { Prompt } from "effect/unstable/ai"

const textPart = Prompt.makePart("text", {
  text: "Hello, world!"
})

const filePart = Prompt.makePart("file", {
  mediaType: "image/png",
  fileName: "screenshot.png",
  data: new Uint8Array([1, 2, 3])
})
```

**Signature**

```ts
declare const makePart: <const Type extends Part["type"]>(
  type: Type,
  params: Omit<Extract<Part, { type: Type }>, typeof PartTypeId | "type" | "options"> & {
    readonly options?: Extract<Part, { type: Type }>["options"] | undefined
  }
) => Extract<Part, { type: Type }>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L173)

Since v4.0.0

## reasoningPart

Constructs a new reasoning part.

**Signature**

```ts
declare const reasoningPart: (params: PartConstructorParams<ReasoningPart>) => ReasoningPart
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L373)

Since v4.0.0

## systemMessage

Constructs a new system message.

**Signature**

```ts
declare const systemMessage: (params: MessageConstructorParams<SystemMessage>) => SystemMessage
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L1168)

Since v4.0.0

## textPart

Constructs a new text part.

**Signature**

```ts
declare const textPart: (params: PartConstructorParams<TextPart>) => TextPart
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L292)

Since v4.0.0

## toolApprovalRequestPart

Constructs a new tool approval request part.

**Signature**

```ts
declare const toolApprovalRequestPart: (
  params: PartConstructorParams<ToolApprovalRequestPart>
) => ToolApprovalRequestPart
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L945)

Since v4.0.0

## toolApprovalResponsePart

Constructs a new tool approval response part.

**Signature**

```ts
declare const toolApprovalResponsePart: (
  params: PartConstructorParams<ToolApprovalResponsePart>
) => ToolApprovalResponsePart
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L842)

Since v4.0.0

## toolCallPart

Constructs a new tool call part.

**Signature**

```ts
declare const toolCallPart: (params: PartConstructorParams<ToolCallPart>) => ToolCallPart
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L605)

Since v4.0.0

## toolMessage

Constructs a new tool message.

**Signature**

```ts
declare const toolMessage: (params: MessageConstructorParams<ToolMessage>) => ToolMessage
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L1638)

Since v4.0.0

## toolResultPart

Constructs a new tool result part.

**Signature**

```ts
declare const toolResultPart: (params: PartConstructorParams<ToolResultPart>) => ToolResultPart
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L722)

Since v4.0.0

## userMessage

Constructs a new user message.

**Signature**

```ts
declare const userMessage: (params: MessageConstructorParams<UserMessage>) => UserMessage
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L1337)

Since v4.0.0

# guards

## isMessage

Type guard to check if a value is a Message.

**Signature**

```ts
declare const isMessage: (u: unknown) => u is Message
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L961)

Since v4.0.0

## isPart

Type guard to check if a value is a Part.

**Signature**

```ts
declare const isPart: (u: unknown) => u is Part
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L66)

Since v4.0.0

## isPrompt

Type guard to check if a value is a Prompt.

**Signature**

```ts
declare const isPrompt: (u: unknown) => u is Prompt
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L1693)

Since v4.0.0

# models

## AssistantMessage (interface)

Message representing large language model assistant responses.

**Example** (Creating assistant messages)

```ts
import { Prompt } from "effect/unstable/ai"

const assistantMessage: Prompt.AssistantMessage = Prompt.makeMessage("assistant", {
  content: [
    Prompt.makePart("text", {
      text: "I can check the current weather for San Francisco."
    }),
    Prompt.makePart("tool-call", {
      id: "call_123",
      name: "get_weather",
      params: { city: "San Francisco" },
      providerExecuted: false
    }),
    Prompt.makePart("tool-result", {
      id: "call_123",
      name: "get_weather",
      isFailure: false,
      result: {
        temperature: 72,
        condition: "sunny"
      }
    }),
    Prompt.makePart("text", {
      text: "The weather in San Francisco is currently 72°F and sunny."
    })
  ]
})
```

**Signature**

```ts
export interface AssistantMessage extends BaseMessage<"assistant", AssistantMessageOptions> {
  /**
   * Array of content parts that make up the assistant's response.
   */
  readonly content: ReadonlyArray<AssistantMessagePart>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L1385)

Since v4.0.0

## AssistantMessageEncoded (interface)

Encoded representation of assistant messages for serialization.

**Signature**

```ts
export interface AssistantMessageEncoded extends BaseMessageEncoded<"assistant", AssistantMessageOptions> {
  readonly content: string | ReadonlyArray<AssistantMessagePartEncoded>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L1412)

Since v4.0.0

## AssistantMessagePart (type alias)

Union type of content parts allowed in assistant messages.

**Signature**

```ts
type AssistantMessagePart =
  | TextPart
  | FilePart
  | ReasoningPart
  | ToolCallPart
  | ToolResultPart
  | ToolApprovalRequestPart
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L1398)

Since v4.0.0

## AssistantMessagePartEncoded (type alias)

Union type of encoded content parts for assistant messages.

**Signature**

```ts
type AssistantMessagePartEncoded =
  | TextPartEncoded
  | FilePartEncoded
  | ReasoningPartEncoded
  | ToolCallPartEncoded
  | ToolResultPartEncoded
  | ToolApprovalRequestPartEncoded
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L1422)

Since v4.0.0

## BaseMessage (interface)

Base interface for all message types.

**Details**

It provides the common structure shared by all messages, including the role
and provider options.

**Signature**

```ts
export interface BaseMessage<Role extends string, Options extends ProviderOptions> {
  readonly [MessageTypeId]: typeof MessageTypeId
  /**
   * The role of the message participant.
   */
  readonly role: Role
  /**
   * Provider-specific options for this message.
   */
  readonly options: Options
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L974)

Since v4.0.0

## BaseMessageEncoded (interface)

Base interface for encoded message types.

**Signature**

```ts
export interface BaseMessageEncoded<Role extends string, Options extends ProviderOptions> {
  /**
   * The role of the message participant.
   */
  readonly role: Role
  /**
   * Provider-specific options for this message.
   */
  readonly options?: Options | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L992)

Since v4.0.0

## BasePart (interface)

Base interface for all content parts.

**Details**

It provides the common structure shared by all content parts, including the
part type and provider options.

**Signature**

```ts
export interface BasePart<Type extends string, Options extends ProviderOptions> {
  readonly [PartTypeId]: typeof PartTypeId
  /**
   * The type of this content part.
   */
  readonly type: Type
  /**
   * Provider-specific options for this part.
   */
  readonly options: Options
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L115)

Since v4.0.0

## BasePartEncoded (interface)

Base interface for encoded content parts.

**Signature**

```ts
export interface BasePartEncoded<Type extends string, Options extends ProviderOptions> {
  /**
   * The type of this content part.
   */
  readonly type: Type
  /**
   * Provider-specific options for this part.
   */
  readonly options?: Options | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L133)

Since v4.0.0

## FilePart (interface)

Content part representing a file attachment.

**Details**

Files can be provided as base64 data strings, byte arrays, or URLs, and can
represent images, documents, or other binary data.

**Example** (Creating file parts)

```ts
import { Prompt } from "effect/unstable/ai"

const imagePart: Prompt.FilePart = Prompt.makePart("file", {
  mediaType: "image/jpeg",
  fileName: "photo.jpg",
  data: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
})

const documentPart: Prompt.FilePart = Prompt.makePart("file", {
  mediaType: "application/pdf",
  fileName: "report.pdf",
  data: new Uint8Array([1, 2, 3])
})
```

**Signature**

```ts
export interface FilePart extends BasePart<"file", FilePartOptions> {
  /**
   * MIME type of the file (e.g., "image/jpeg", "application/pdf").
   */
  readonly mediaType: string
  /**
   * Optional filename for the file.
   */
  readonly fileName?: string | undefined
  /**
   * File data as base64 string of data, a byte array, or a URL.
   */
  readonly data: string | Uint8Array | URL
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L409)

Since v4.0.0

## FilePartEncoded (interface)

Encoded representation of file parts for serialization.

**Signature**

```ts
export interface FilePartEncoded extends BasePartEncoded<"file", FilePartOptions> {
  /**
   * MIME type of the file (e.g., "image/jpeg", "application/pdf").
   */
  readonly mediaType: string
  /**
   * Optional filename for the file.
   */
  readonly fileName?: string | undefined
  /**
   * File data as base64 string of data, a byte array, or a URL.
   */
  readonly data: string | Uint8Array | URL
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L430)

Since v4.0.0

## Message (type alias)

A type representing all possible message types in a conversation.

**Signature**

```ts
type Message = SystemMessage | UserMessage | AssistantMessage | ToolMessage
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L1650)

Since v4.0.0

## MessageEncoded (type alias)

A type representing all possible encoded message types for serialization.

**Signature**

```ts
type MessageEncoded = SystemMessageEncoded | UserMessageEncoded | AssistantMessageEncoded | ToolMessageEncoded
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L1662)

Since v4.0.0

## Part (type alias)

Union type representing all possible content parts within messages.

**Details**

Parts are the building blocks of message content, supporting text, files,
reasoning, tool calls, tool results, tool approval responses, and tool
approval requests.

**Signature**

```ts
type Part =
  | TextPart
  | ReasoningPart
  | FilePart
  | ToolCallPart
  | ToolResultPart
  | ToolApprovalResponsePart
  | ToolApprovalRequestPart
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L80)

Since v4.0.0

## PartEncoded (type alias)

Encoded representation of a Part.

**Signature**

```ts
type PartEncoded =
  | TextPartEncoded
  | ReasoningPartEncoded
  | FilePartEncoded
  | ToolCallPartEncoded
  | ToolResultPartEncoded
  | ToolApprovalResponsePartEncoded
  | ToolApprovalRequestPartEncoded
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L95)

Since v4.0.0

## Prompt (interface)

A Prompt contains a sequence of messages that form the context of a
conversation with a large language model.

**Signature**

```ts
export interface Prompt extends Pipeable {
  readonly [TypeId]: typeof TypeId
  /**
   * Array of messages that make up the conversation.
   */
  readonly content: ReadonlyArray<Message>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L1702)

Since v4.0.0

## PromptEncoded (interface)

Encoded representation of prompts for serialization.

**Signature**

```ts
export interface PromptEncoded {
  /**
   * Array of messages that make up the conversation.
   */
  readonly content: ReadonlyArray<MessageEncoded>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L1716)

Since v4.0.0

## RawInput (type alias)

Raw input accepted by `make`: a string, an iterable of encoded messages, or
an existing `Prompt`.

**Example** (Accepting raw prompt input)

```ts
import type { Prompt } from "effect/unstable/ai"

// String input - creates a user message
const stringInput: Prompt.RawInput = "Hello, world!"

// Message array input
const messagesInput: Prompt.RawInput = [
  { role: "system", content: "You are helpful." },
  { role: "user", content: [{ type: "text", text: "Hi!" }] }
]

// Existing prompt
declare const existingPrompt: Prompt.Prompt
const promptInput: Prompt.RawInput = existingPrompt
```

**Signature**

```ts
type RawInput = string | Iterable<MessageEncoded> | Prompt
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L1788)

Since v4.0.0

## ReasoningPart (interface)

Content part carrying reasoning text in an assistant message, such as a
provider-supplied reasoning summary or explanation.

**Example** (Creating reasoning parts)

```ts
import { Prompt } from "effect/unstable/ai"

const reasoningPart: Prompt.ReasoningPart = Prompt.makePart("reasoning", {
  text: "Summary: the response compares the requested options by price and availability."
})
```

**Signature**

```ts
export interface ReasoningPart extends BasePart<"reasoning", ReasoningPartOptions> {
  /**
   * The reasoning or thought process text.
   */
  readonly text: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L316)

Since v4.0.0

## ReasoningPartEncoded (interface)

Encoded representation of reasoning parts for serialization.

**Signature**

```ts
export interface ReasoningPartEncoded extends BasePartEncoded<"reasoning", ReasoningPartOptions> {
  /**
   * The reasoning or thought process text.
   */
  readonly text: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L329)

Since v4.0.0

## SystemMessage (interface)

Message representing system instructions or context.

**Example** (Creating system messages)

```ts
import { Prompt } from "effect/unstable/ai"

const systemMessage: Prompt.SystemMessage = Prompt.makeMessage("system", {
  content: "You are a helpful assistant specialized in mathematics. " + "Always show your work step by step."
})
```

**Signature**

```ts
export interface SystemMessage extends BaseMessage<"system", SystemMessageOptions> {
  /**
   * The system instruction or context as plain text.
   */
  readonly content: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L1111)

Since v4.0.0

## SystemMessageEncoded (interface)

Encoded representation of system messages for serialization.

**Signature**

```ts
export interface SystemMessageEncoded extends BaseMessageEncoded<"system", SystemMessageOptions> {
  /**
   * The system instruction or context as plain text.
   */
  readonly content: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L1124)

Since v4.0.0

## TextPart (interface)

Content part representing plain text.

**Details**

Text parts are the basic content type used for textual information in
messages.

**Example** (Creating text parts)

```ts
import { Prompt } from "effect/unstable/ai"

const textPart: Prompt.TextPart = Prompt.makePart("text", {
  text: "Hello, how can I help you today?"
})
```

**Signature**

```ts
export interface TextPart extends BasePart<"text", TextPartOptions> {
  /**
   * The text content.
   */
  readonly text: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L233)

Since v4.0.0

## TextPartEncoded (interface)

Encoded representation of text parts for serialization.

**Signature**

```ts
export interface TextPartEncoded extends BasePartEncoded<"text", TextPartOptions> {
  /**
   * The text content.
   */
  readonly text: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L246)

Since v4.0.0

## ToolApprovalRequestPart (interface)

Content part representing a tool approval request from the framework.

**Details**

Tool approval request parts are stored in assistant messages when a tool
requires user approval before execution. The user responds with a
`ToolApprovalResponsePart` in a tool message.

**Example** (Creating tool approval requests)

```ts
import { Prompt } from "effect/unstable/ai"

const approvalRequest: Prompt.ToolApprovalRequestPart = Prompt.makePart("tool-approval-request", {
  approvalId: "approval_123",
  toolCallId: "call_456"
})
```

**Signature**

```ts
export interface ToolApprovalRequestPart extends BasePart<"tool-approval-request", ToolApprovalRequestPartOptions> {
  /**
   * Unique identifier for this approval flow.
   */
  readonly approvalId: string
  /**
   * The tool call ID requiring approval.
   */
  readonly toolCallId: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L876)

Since v4.0.0

## ToolApprovalRequestPartEncoded (interface)

Encoded representation of tool approval request parts for serialization.

**Signature**

```ts
export interface ToolApprovalRequestPartEncoded extends BasePartEncoded<
  "tool-approval-request",
  ToolApprovalRequestPartOptions
> {
  /**
   * Unique identifier for this approval flow.
   */
  readonly approvalId: string
  /**
   * The tool call ID requiring approval.
   */
  readonly toolCallId: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L893)

Since v4.0.0

## ToolApprovalResponsePart (interface)

Content part representing a user's response to a tool approval request.

**When to use**

Use when tool messages must approve or deny tool execution for tools with the
`needsApproval` property set.

**Example** (Creating tool approval responses)

```ts
import { Prompt } from "effect/unstable/ai"

const approvalResponse: Prompt.ToolApprovalResponsePart = Prompt.makePart("tool-approval-response", {
  approvalId: "approval_123",
  approved: true
})

const denialResponse: Prompt.ToolApprovalResponsePart = Prompt.makePart("tool-approval-response", {
  approvalId: "approval_456",
  approved: false,
  reason: "Operation not allowed"
})
```

**Signature**

```ts
export interface ToolApprovalResponsePart extends BasePart<"tool-approval-response", ToolApprovalResponsePartOptions> {
  /**
   * References the original approval request.
   */
  readonly approvalId: string
  /**
   * User's decision to approve or deny the tool execution.
   */
  readonly approved: boolean
  /**
   * Optional justification for the decision.
   */
  readonly reason?: string | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L763)

Since v4.0.0

## ToolApprovalResponsePartEncoded (interface)

Encoded representation of tool approval response parts for serialization.

**Signature**

```ts
export interface ToolApprovalResponsePartEncoded extends BasePartEncoded<
  "tool-approval-response",
  ToolApprovalResponsePartOptions
> {
  /**
   * References the original approval request.
   */
  readonly approvalId: string
  /**
   * User's decision to approve or deny the tool execution.
   */
  readonly approved: boolean
  /**
   * Optional justification for the decision.
   */
  readonly reason?: string | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L784)

Since v4.0.0

## ToolCallPart (interface)

Content part representing a tool call request.

**Example** (Creating tool call parts)

```ts
import { Prompt } from "effect/unstable/ai"

const toolCallPart: Prompt.ToolCallPart = Prompt.makePart("tool-call", {
  id: "call_123",
  name: "get_weather",
  params: { city: "San Francisco", units: "celsius" },
  providerExecuted: false
})
```

**Signature**

```ts
export interface ToolCallPart extends BasePart<"tool-call", ToolCallPartOptions> {
  /**
   * Unique identifier for this tool call.
   */
  readonly id: string
  /**
   * Name of the tool to invoke.
   */
  readonly name: string
  /**
   * Parameters to pass to the tool.
   */
  readonly params: unknown
  /**
   * Whether the tool was executed by the provider (true) or framework (false).
   */
  readonly providerExecuted: boolean
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L518)

Since v4.0.0

## ToolCallPartEncoded (interface)

Encoded representation of tool call parts for serialization.

**Signature**

```ts
export interface ToolCallPartEncoded extends BasePartEncoded<"tool-call", ToolCallPartOptions> {
  /**
   * Unique identifier for this tool call.
   */
  readonly id: string
  /**
   * Name of the tool to invoke.
   */
  readonly name: string
  /**
   * Parameters to pass to the tool.
   */
  readonly params: unknown
  /**
   * Whether the tool was executed by the provider (true) or framework (false).
   */
  readonly providerExecuted?: boolean | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L543)

Since v4.0.0

## ToolMessage (interface)

Message carrying tool-side content, including tool execution results and
responses to tool approval requests.

**Example** (Creating tool messages)

```ts
import { Prompt } from "effect/unstable/ai"

const toolMessage: Prompt.ToolMessage = Prompt.makeMessage("tool", {
  content: [
    Prompt.makePart("tool-result", {
      id: "call_123",
      name: "search_web",
      isFailure: false,
      result: {
        query: "TypeScript best practices",
        results: [
          { title: "TypeScript Handbook", url: "https://..." },
          { title: "Effective TypeScript", url: "https://..." }
        ]
      }
    })
  ]
})
```

**Signature**

```ts
export interface ToolMessage extends BaseMessage<"tool", ToolMessageOptions> {
  /**
   * Array of tool result parts.
   */
  readonly content: ReadonlyArray<ToolMessagePart>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L1563)

Since v4.0.0

## ToolMessageEncoded (interface)

Encoded representation of tool messages for serialization.

**Signature**

```ts
export interface ToolMessageEncoded extends BaseMessageEncoded<"tool", ToolMessageOptions> {
  /**
   * Array of tool result parts.
   */
  readonly content: ReadonlyArray<ToolMessagePartEncoded>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L1584)

Since v4.0.0

## ToolMessagePart (type alias)

Union type of content parts allowed in tool messages.

**Signature**

```ts
type ToolMessagePart = ToolResultPart | ToolApprovalResponsePart
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L1576)

Since v4.0.0

## ToolMessagePartEncoded (type alias)

Union type of encoded content parts for tool messages.

**Signature**

```ts
type ToolMessagePartEncoded = ToolResultPartEncoded | ToolApprovalResponsePartEncoded
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L1597)

Since v4.0.0

## ToolResultPart (interface)

Content part representing the result of a tool call.

**Example** (Creating tool result parts)

```ts
import { Prompt } from "effect/unstable/ai"

const toolResultPart: Prompt.ToolResultPart = Prompt.makePart("tool-result", {
  id: "call_123",
  name: "get_weather",
  isFailure: false,
  result: {
    temperature: 22,
    condition: "sunny",
    humidity: 65
  }
})
```

**Signature**

```ts
export interface ToolResultPart extends BasePart<"tool-result", ToolResultPartOptions> {
  /**
   * Unique identifier matching the original tool call.
   */
  readonly id: string
  /**
   * Name of the tool that was executed.
   */
  readonly name: string
  /**
   * Whether or not the result of executing the tool call handler was an error.
   */
  readonly isFailure: boolean
  /**
   * The result returned by the tool execution.
   */
  readonly result: unknown
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L635)

Since v4.0.0

## ToolResultPartEncoded (interface)

Encoded representation of tool result parts for serialization.

**Signature**

```ts
export interface ToolResultPartEncoded extends BasePartEncoded<"tool-result", ToolResultPartOptions> {
  /**
   * Unique identifier matching the original tool call.
   */
  readonly id: string
  /**
   * Name of the tool that was executed.
   */
  readonly name: string
  /**
   * Whether or not the result of executing the tool call handler was an error.
   */
  readonly isFailure: boolean
  /**
   * The result returned by the tool execution.
   */
  readonly result: unknown
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L660)

Since v4.0.0

## UserMessage (interface)

Message representing user input or questions.

**Example** (Creating user messages)

```ts
import { Prompt } from "effect/unstable/ai"

const textUserMessage: Prompt.UserMessage = Prompt.makeMessage("user", {
  content: [
    Prompt.makePart("text", {
      text: "Can you analyze this image for me?"
    })
  ]
})

const multimodalUserMessage: Prompt.UserMessage = Prompt.makeMessage("user", {
  content: [
    Prompt.makePart("text", {
      text: "What do you see in this image?"
    }),
    Prompt.makePart("file", {
      mediaType: "image/jpeg",
      fileName: "vacation.jpg",
      data: "data:image/jpeg;base64,..."
    })
  ]
})
```

**Signature**

```ts
export interface UserMessage extends BaseMessage<"user", UserMessageOptions> {
  /**
   * Array of content parts that make up the user's message.
   */
  readonly content: ReadonlyArray<UserMessagePart>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L1208)

Since v4.0.0

## UserMessageEncoded (interface)

Encoded representation of user messages for serialization.

**Signature**

```ts
export interface UserMessageEncoded extends BaseMessageEncoded<"user", UserMessageOptions> {
  /**
   * Array of content parts that make up the user's message.
   */
  readonly content: string | ReadonlyArray<UserMessagePartEncoded>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L1229)

Since v4.0.0

## UserMessagePart (type alias)

Union type of content parts allowed in user messages.

**Signature**

```ts
type UserMessagePart = TextPart | FilePart
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L1221)

Since v4.0.0

## UserMessagePartEncoded (type alias)

Union type of encoded content parts for user messages.

**Signature**

```ts
type UserMessagePartEncoded = TextPartEncoded | FilePartEncoded
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L1242)

Since v4.0.0

# options

## AssistantMessageOptions (interface)

Represents provider-specific options that can be associated with a
`AssistantMessage` through module augmentation.

**Signature**

```ts
export interface AssistantMessageOptions extends ProviderOptions {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L1437)

Since v4.0.0

## FilePartOptions (interface)

Represents provider-specific options that can be associated with a
`FilePart` through module augmentation.

**Signature**

```ts
export interface FilePartOptions extends ProviderOptions {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L452)

Since v4.0.0

## ProviderOptions

Schema for provider-specific options that can be attached to content parts
and messages.

**Details**

Provider-specific options are keyed by provider-specific names, and each
value is JSON or `null`.

**Signature**

```ts
declare const ProviderOptions: Schema.$Record<
  Schema.String,
  Schema.NullOr<Schema.Codec<Schema.Json, Schema.Json, never, never>>
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L40)

Since v4.0.0

## ProviderOptions (type alias)

Type of provider-specific options that can be attached to prompt messages
and content parts.

**Signature**

```ts
type ProviderOptions = typeof ProviderOptions.Type
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L52)

Since v4.0.0

## ReasoningPartOptions (interface)

Represents provider-specific options that can be associated with a
`ReasoningPart` through module augmentation.

**Signature**

```ts
export interface ReasoningPartOptions extends ProviderOptions {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L343)

Since v4.0.0

## SystemMessageOptions (interface)

Represents provider-specific options that can be associated with a
`SystemMessage` through module augmentation.

**Signature**

```ts
export interface SystemMessageOptions extends ProviderOptions {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L1138)

Since v4.0.0

## TextPartOptions (interface)

Represents provider-specific options that can be associated with a
`TextPart` through module augmentation.

**Signature**

```ts
export interface TextPartOptions extends ProviderOptions {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L260)

Since v4.0.0

## ToolApprovalRequestPartOptions (interface)

Represents provider-specific options that can be associated with a
`ToolApprovalRequestPart` through module augmentation.

**Signature**

```ts
export interface ToolApprovalRequestPartOptions extends ProviderOptions {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L913)

Since v4.0.0

## ToolApprovalResponsePartOptions (interface)

Represents provider-specific options that can be associated with a
`ToolApprovalResponsePart` through module augmentation.

**Signature**

```ts
export interface ToolApprovalResponsePartOptions extends ProviderOptions {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L808)

Since v4.0.0

## ToolCallPartOptions (interface)

Represents provider-specific options that can be associated with a
`ToolCallPart` through module augmentation.

**Signature**

```ts
export interface ToolCallPartOptions extends ProviderOptions {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L569)

Since v4.0.0

## ToolMessageOptions (interface)

Represents provider-specific options that can be associated with a
`ToolMessage` through module augmentation.

**Signature**

```ts
export interface ToolMessageOptions extends ProviderOptions {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L1606)

Since v4.0.0

## ToolResultPartOptions (interface)

Represents provider-specific options that can be associated with a
`ToolResultPart` through module augmentation.

**Signature**

```ts
export interface ToolResultPartOptions extends ProviderOptions {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L686)

Since v4.0.0

## UserMessageOptions (interface)

Represents provider-specific options that can be associated with a
`UserMessage` through module augmentation.

**Signature**

```ts
export interface UserMessageOptions extends ProviderOptions {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L1251)

Since v4.0.0

# schemas

## AssistantMessage

Schema for validation and encoding of assistant messages.

**Details**

Assistant content can be a string decoded through `ContentFromString` or an
array of text, file, reasoning, tool-call, tool-result, and
tool-approval-request parts.

**Signature**

```ts
declare const AssistantMessage: Schema.Struct<{
  readonly role: Schema.Literal<"assistant">
  readonly content: Schema.Union<
    readonly [
      Schema.decodeTo<
        Schema.NonEmptyArray<
          Schema.toType<
            Schema.Struct<{
              readonly type: Schema.Literal<"text">
              readonly text: Schema.String
              readonly "~effect/ai/Prompt/Part": Schema.withDecodingDefaultKey<Schema.Literal<"~effect/ai/Prompt/Part">>
              readonly options: Schema.withDecodingDefault<
                Schema.$Record<Schema.String, Schema.NullOr<Schema.Codec<Schema.Json>>>
              >
            }>
          >
        >,
        Schema.String,
        never,
        never
      >,
      Schema.$Array<
        Schema.Union<
          readonly [
            typeof TextPart,
            typeof FilePart,
            typeof ReasoningPart,
            typeof ToolCallPart,
            typeof ToolResultPart,
            typeof ToolApprovalRequestPart
          ]
        >
      >
    ]
  >
  readonly "~effect/ai/Prompt/Message": Schema.withDecodingDefaultKey<Schema.Literal<"~effect/ai/Prompt/Message">>
  readonly options: Schema.withDecodingDefault<Schema.$Record<Schema.String, Schema.NullOr<Schema.Codec<Schema.Json>>>>
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L1451)

Since v4.0.0

## ContentFromString

Schema that decodes a string into content containing a single `TextPart` and,
when encoding, emits the `text` value of the first part.

**Signature**

```ts
declare const ContentFromString: Schema.decodeTo<
  Schema.NonEmptyArray<
    Schema.toType<
      Schema.Struct<{
        readonly type: Schema.Literal<"text">
        readonly text: Schema.String
        readonly "~effect/ai/Prompt/Part": Schema.withDecodingDefaultKey<Schema.Literal<"~effect/ai/Prompt/Part">>
        readonly options: Schema.withDecodingDefault<
          Schema.$Record<Schema.String, Schema.NullOr<Schema.Codec<Schema.Json>>>
        >
      }>
    >
  >,
  Schema.String,
  never,
  never
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L1063)

Since v4.0.0

## FilePart

Schema for validation and encoding of file parts.

**Signature**

```ts
declare const FilePart: Schema.Struct<{
  readonly type: Schema.Literal<"file">
  readonly mediaType: Schema.String
  readonly fileName: Schema.optional<Schema.String>
  readonly data: Schema.Union<readonly [Schema.String, Schema.Uint8Array, Schema.URL]>
  readonly "~effect/ai/Prompt/Part": Schema.withDecodingDefaultKey<Schema.Literal<"~effect/ai/Prompt/Part">>
  readonly options: Schema.withDecodingDefault<Schema.$Record<Schema.String, Schema.NullOr<Schema.Codec<Schema.Json>>>>
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L460)

Since v4.0.0

## Message

Schema for validation and encoding of messages.

**Signature**

```ts
declare const Message: Schema.Codec<Message, MessageEncoded, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L1674)

Since v4.0.0

## Prompt

Schema for AI prompt instances.

**Signature**

```ts
declare const Prompt: Schema.Codec<Prompt, PromptEncoded, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L1734)

Since v4.0.0

## ReasoningPart

Schema for validation and encoding of reasoning parts.

**Signature**

```ts
declare const ReasoningPart: Schema.Struct<{
  readonly type: Schema.Literal<"reasoning">
  readonly text: Schema.String
  readonly "~effect/ai/Prompt/Part": Schema.withDecodingDefaultKey<Schema.Literal<"~effect/ai/Prompt/Part">>
  readonly options: Schema.withDecodingDefault<Schema.$Record<Schema.String, Schema.NullOr<Schema.Codec<Schema.Json>>>>
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L351)

Since v4.0.0

## SystemMessage

Schema for validation and encoding of system messages.

**Signature**

```ts
declare const SystemMessage: Schema.Struct<{
  readonly role: Schema.Literal<"system">
  readonly content: Schema.String
  readonly "~effect/ai/Prompt/Message": Schema.withDecodingDefaultKey<Schema.Literal<"~effect/ai/Prompt/Message">>
  readonly options: Schema.withDecodingDefault<Schema.$Record<Schema.String, Schema.NullOr<Schema.Codec<Schema.Json>>>>
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L1146)

Since v4.0.0

## TextPart

Schema for validation and encoding of text parts.

**Signature**

```ts
declare const TextPart: Schema.Struct<{
  readonly type: Schema.Literal<"text">
  readonly text: Schema.String
  readonly "~effect/ai/Prompt/Part": Schema.withDecodingDefaultKey<Schema.Literal<"~effect/ai/Prompt/Part">>
  readonly options: Schema.withDecodingDefault<Schema.$Record<Schema.String, Schema.NullOr<Schema.Codec<Schema.Json>>>>
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L268)

Since v4.0.0

## ToolApprovalRequestPart

Schema for validation and encoding of tool approval request parts.

**Signature**

```ts
declare const ToolApprovalRequestPart: Schema.Struct<{
  readonly type: Schema.Literal<"tool-approval-request">
  readonly approvalId: Schema.String
  readonly toolCallId: Schema.String
  readonly "~effect/ai/Prompt/Part": Schema.withDecodingDefaultKey<Schema.Literal<"~effect/ai/Prompt/Part">>
  readonly options: Schema.withDecodingDefault<Schema.$Record<Schema.String, Schema.NullOr<Schema.Codec<Schema.Json>>>>
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L921)

Since v4.0.0

## ToolApprovalResponsePart

Schema for validation and encoding of tool approval response parts.

**Signature**

```ts
declare const ToolApprovalResponsePart: Schema.Struct<{
  readonly type: Schema.Literal<"tool-approval-response">
  readonly approvalId: Schema.String
  readonly approved: Schema.Boolean
  readonly reason: Schema.optional<Schema.String>
  readonly "~effect/ai/Prompt/Part": Schema.withDecodingDefaultKey<Schema.Literal<"~effect/ai/Prompt/Part">>
  readonly options: Schema.withDecodingDefault<Schema.$Record<Schema.String, Schema.NullOr<Schema.Codec<Schema.Json>>>>
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L816)

Since v4.0.0

## ToolCallPart

Schema for validation and encoding of tool call parts.

**Signature**

```ts
declare const ToolCallPart: Schema.Struct<{
  readonly type: Schema.Literal<"tool-call">
  readonly id: Schema.String
  readonly name: Schema.String
  readonly params: Schema.Unknown
  readonly providerExecuted: Schema.withDecodingDefault<Schema.Boolean>
  readonly "~effect/ai/Prompt/Part": Schema.withDecodingDefaultKey<Schema.Literal<"~effect/ai/Prompt/Part">>
  readonly options: Schema.withDecodingDefault<Schema.$Record<Schema.String, Schema.NullOr<Schema.Codec<Schema.Json>>>>
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L577)

Since v4.0.0

## ToolMessage

Schema for validation and encoding of tool messages.

**Signature**

```ts
declare const ToolMessage: Schema.Struct<{
  readonly role: Schema.Literal<"tool">
  readonly content: Schema.$Array<Schema.Union<readonly [typeof ToolResultPart, typeof ToolApprovalResponsePart]>>
  readonly "~effect/ai/Prompt/Message": Schema.withDecodingDefaultKey<Schema.Literal<"~effect/ai/Prompt/Message">>
  readonly options: Schema.withDecodingDefault<Schema.$Record<Schema.String, Schema.NullOr<Schema.Codec<Schema.Json>>>>
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L1614)

Since v4.0.0

## ToolResultPart

Schema for validation and encoding of tool result parts.

**Signature**

```ts
declare const ToolResultPart: Schema.Struct<{
  readonly type: Schema.Literal<"tool-result">
  readonly id: Schema.String
  readonly name: Schema.String
  readonly isFailure: Schema.Boolean
  readonly result: Schema.Unknown
  readonly "~effect/ai/Prompt/Part": Schema.withDecodingDefaultKey<Schema.Literal<"~effect/ai/Prompt/Part">>
  readonly options: Schema.withDecodingDefault<Schema.$Record<Schema.String, Schema.NullOr<Schema.Codec<Schema.Json>>>>
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L694)

Since v4.0.0

## UserMessage

Schema for validation and encoding of user messages.

**Signature**

```ts
declare const UserMessage: Schema.Struct<{
  readonly role: Schema.Literal<"user">
  readonly content: Schema.Union<
    readonly [
      Schema.decodeTo<
        Schema.NonEmptyArray<
          Schema.toType<
            Schema.Struct<{
              readonly type: Schema.Literal<"text">
              readonly text: Schema.String
              readonly "~effect/ai/Prompt/Part": Schema.withDecodingDefaultKey<Schema.Literal<"~effect/ai/Prompt/Part">>
              readonly options: Schema.withDecodingDefault<
                Schema.$Record<Schema.String, Schema.NullOr<Schema.Codec<Schema.Json>>>
              >
            }>
          >
        >,
        Schema.String,
        never,
        never
      >,
      Schema.$Array<
        Schema.Union<
          readonly [
            Schema.Struct<{
              readonly type: Schema.Literal<"text">
              readonly text: Schema.String
              readonly "~effect/ai/Prompt/Part": Schema.withDecodingDefaultKey<Schema.Literal<"~effect/ai/Prompt/Part">>
              readonly options: Schema.withDecodingDefault<
                Schema.$Record<Schema.String, Schema.NullOr<Schema.Codec<Schema.Json>>>
              >
            }>,
            Schema.Struct<{
              readonly type: Schema.Literal<"file">
              readonly mediaType: Schema.String
              readonly fileName: Schema.optional<Schema.String>
              readonly data: Schema.Union<readonly [Schema.String, Schema.Uint8Array, Schema.URL]>
              readonly "~effect/ai/Prompt/Part": Schema.withDecodingDefaultKey<Schema.Literal<"~effect/ai/Prompt/Part">>
              readonly options: Schema.withDecodingDefault<
                Schema.$Record<Schema.String, Schema.NullOr<Schema.Codec<Schema.Json>>>
              >
            }>
          ]
        >
      >
    ]
  >
  readonly "~effect/ai/Prompt/Message": Schema.withDecodingDefaultKey<Schema.Literal<"~effect/ai/Prompt/Message">>
  readonly options: Schema.withDecodingDefault<Schema.$Record<Schema.String, Schema.NullOr<Schema.Codec<Schema.Json>>>>
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L1259)

Since v4.0.0

# utility types

## MessageConstructorParams (type alias)

A utility type for specifying the parameters required to construct a
specific message for a prompt.

**Signature**

```ts
type MessageConstructorParams<M> = Omit<M, typeof MessageTypeId | "role" | "options"> & {
  /**
   * Optional provider-specific options for this message.
   */
  readonly options?: Part["options"] | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L1049)

Since v4.0.0

## PartConstructorParams (type alias)

A utility type for specifying the parameters required to construct a
specific part of a prompt.

**Signature**

```ts
type PartConstructorParams<P> = Omit<P, typeof PartTypeId | "type" | "options"> & {
  /**
   * Optional provider-specific options for this part.
   */
  readonly options?: Part["options"] | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Prompt.ts#L201)

Since v4.0.0
