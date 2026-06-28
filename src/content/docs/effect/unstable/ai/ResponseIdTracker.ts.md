---
title: ResponseIdTracker.ts
nav_order: 155
parent: "effect"
---

## ResponseIdTracker.ts overview

Track provider response IDs for incremental language model calls.

Some providers can continue from a prior response by accepting a
`previousResponseId` plus only the messages added after that response. This
module exposes a small mutable service that remembers which prompt message
objects were included in each provider response and prepares a shorter prompt
when a later call extends the same conversation.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [make](#make)
- [models](#models)
  - [PrepareResult (interface)](#prepareresult-interface)
  - [Service (interface)](#service-interface)
- [services](#services)
  - [ResponseIdTracker (class)](#responseidtracker-class)

---

# constructors

## make

Creates an in-memory `ResponseIdTracker` service.

**Details**

The tracker maps prompt message object identities to provider response IDs.
`prepareUnsafe` returns a previous response ID and the messages after the
latest assistant turn only when the existing prompt prefix is fully tracked;
otherwise it clears the tracked state and returns `Option.none()`.

**Signature**

```ts
declare const make: Effect.Effect<Service, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ResponseIdTracker.ts#L82)

Since v4.0.0

# models

## PrepareResult (interface)

Result returned when a tracked prompt can be sent incrementally.

**Details**

It contains the provider response ID to pass as `previousResponseId` and the
prompt fragment containing only the new messages after the latest assistant
turn.

**Signature**

```ts
export interface PrepareResult {
  readonly previousResponseId: string
  readonly prompt: Prompt.Prompt
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ResponseIdTracker.ts#L29)

Since v4.0.0

## Service (interface)

Mutable service that tracks prompt message object identities by provider
response ID.

**Details**

`markParts` records the prompt messages that produced a response,
`prepareUnsafe` returns a `previousResponseId` plus the untracked suffix when
the prompt prefix is fully recognized, and `clearUnsafe` drops all tracked
state.

**Signature**

```ts
export interface Service {
  clearUnsafe(): void
  markParts(parts: ReadonlyArray<object>, responseId: string): void
  prepareUnsafe(prompt: Prompt.Prompt): Option.Option<PrepareResult>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ResponseIdTracker.ts#L48)

Since v4.0.0

# services

## ResponseIdTracker (class)

Service tag for enabling provider previous-response ID reuse across language
model calls.

**When to use**

Use when you provide a language model with previous-response ID tracking so
later calls can send only new prompt messages together with the provider's
prior response ID.

**Signature**

```ts
declare class ResponseIdTracker
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ResponseIdTracker.ts#L67)

Since v4.0.0
