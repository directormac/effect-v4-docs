---
title: Tokenizer.ts
nav_order: 157
parent: "effect"
---

## Tokenizer.ts overview

Service for model-specific token counting and prompt truncation. Tokenization
depends on the target provider, model, and encoding rules, so this module
leaves the actual tokenization function to the service implementation.

The `Tokenizer` service can count tokens for raw prompt input and shorten a
prompt to a token limit by keeping the newest messages that fit. This module
defines the service tag, the service interface, and a `make` constructor that
builds a full tokenizer service from a token-counting function.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [make](#make)
- [models](#models)
  - [Service (interface)](#service-interface)
- [services](#services)
  - [Tokenizer (class)](#tokenizer-class)

---

# constructors

## make

Creates a Tokenizer service implementation from tokenization options.

**Details**

This function constructs a complete Tokenizer service by providing a
tokenization function. The service handles both tokenization and
truncation operations using the provided tokenizer.

**Example** (Creating a word tokenizer)

```ts
import { Effect } from "effect"
import { Tokenizer } from "effect/unstable/ai"

// Simple word-based tokenizer
const wordTokenizer = Tokenizer.make({
  tokenize: (prompt) =>
    Effect.succeed(
      prompt.content
        .flatMap((msg) =>
          typeof msg.content === "string"
            ? msg.content.split(" ")
            : msg.content.flatMap((part) => (part.type === "text" ? part.text.split(" ") : []))
        )
        .map((_, index) => index)
    )
})
```

**Signature**

```ts
declare const make: (options: {
  readonly tokenize: (content: Prompt.Prompt) => Effect.Effect<Array<number>, AiError.AiError>
}) => Service
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tokenizer.ts#L139)

Since v4.0.0

# models

## Service (interface)

Tokenizer service interface providing text tokenization and truncation
operations.

**Details**

This interface defines the core operations for converting text to tokens and
managing content length within token limits for AI model compatibility.

**Example** (Implementing a custom tokenizer)

```ts
import { Effect } from "effect"
import { Prompt } from "effect/unstable/ai"
import type { Tokenizer } from "effect/unstable/ai"

const customTokenizer: Tokenizer.Service = {
  tokenize: (input) =>
    Effect.succeed(
      input
        .toString()
        .split(" ")
        .map((_, i) => i)
    ),
  truncate: (input, maxTokens) => Effect.succeed(Prompt.make(input.toString().slice(0, maxTokens * 5)))
}
```

**Signature**

```ts
export interface Service {
  /**
   * Converts text input into an array of token numbers.
   */
  readonly tokenize: (
    /**
     * The text input to tokenize.
     */
    input: Prompt.RawInput
  ) => Effect.Effect<Array<number>, AiError.AiError>
  /**
   * Truncates text input to fit within the specified token limit.
   */
  readonly truncate: (
    /**
     * The text input to truncate.
     */
    input: Prompt.RawInput,
    /**
     * Maximum number of tokens to retain.
     */
    tokens: number
  ) => Effect.Effect<Prompt.Prompt, AiError.AiError>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tokenizer.ts#L79)

Since v4.0.0

# services

## Tokenizer (class)

Service tag for model tokenization services.

**When to use**

Use to access or provide model-specific token counting and prompt truncation
operations.

**Details**

This tag provides access to tokenization functionality throughout your
application, enabling token counting and prompt truncation capabilities.

**Example** (Accessing the Tokenizer service)

```ts
import { Effect } from "effect"
import { Tokenizer } from "effect/unstable/ai"

const useTokenizer = Effect.gen(function* () {
  const tokenizer = yield* Tokenizer.Tokenizer
  const tokens = yield* tokenizer.tokenize("Hello, world!")
  return tokens.length
})
```

**Signature**

```ts
declare class Tokenizer
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tokenizer.ts#L48)

Since v4.0.0
