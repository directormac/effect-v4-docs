---
title: Clipboard.ts
nav_order: 10
parent: "@effect/platform-browser"
---

## Clipboard.ts overview

Browser clipboard integration for Effect programs.

This module defines the `Clipboard` service, the `ClipboardError` raised by
failed browser operations, a `make` constructor for custom implementations,
and a browser-backed `layer` that uses `navigator.clipboard`. The service
supports reading and writing text, reading and writing `ClipboardItem`
payloads, writing one `Blob`, and clearing the clipboard.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [make](#make)
- [errors](#errors)
  - [ClipboardError (class)](#clipboarderror-class)
    - [[ErrorTypeId] (property)](#errortypeid-property)
- [layers](#layers)
  - [layer](#layer)
- [models](#models)
  - [Clipboard (interface)](#clipboard-interface)
- [services](#services)
  - [Clipboard](#clipboard)

---

# constructors

## make

Builds a `Clipboard` service from primitive read and write operations, deriving `clear` and `writeBlob` helpers.

**Signature**

```ts
declare const make: (impl: Omit<Clipboard, "clear" | "writeBlob" | typeof TypeId>) => Clipboard
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/Clipboard.ts#L89)

Since v4.0.0

# errors

## ClipboardError (class)

Tagged error raised when a browser clipboard operation fails.

**Signature**

```ts
declare class ClipboardError
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/Clipboard.ts#L60)

Since v4.0.0

### [ErrorTypeId] (property)

**Signature**

```ts
readonly [ErrorTypeId]: "~@effect/platform-browser/Clipboard/ClipboardError"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/Clipboard.ts#L64)

# layers

## layer

Layer that directly interfaces with the browser Clipboard API.

**Signature**

```ts
declare const layer: Layer.Layer<Clipboard, never, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/Clipboard.ts#L105)

Since v4.0.0

# models

## Clipboard (interface)

Defines the service interface for reading from, writing to, and clearing the browser clipboard.

**When to use**

Use when an application needs clipboard operations through an Effect service
so browser failures stay in the error channel.

**Details**

`read` and `write` work with `ClipboardItem` arrays. `readString` and
`writeString` use text, `writeBlob` writes one `Blob`, and `clear` writes an
empty string.

**Gotchas**

Clipboard access generally requires a secure context and may require user
activation, permissions, or a focused document. `ClipboardItem` and non-text
MIME type support varies by browser. Failed browser operations are surfaced
as `ClipboardError`.

**Signature**

```ts
export interface Clipboard {
  readonly [TypeId]: typeof TypeId
  readonly read: Effect.Effect<ClipboardItems, ClipboardError>
  readonly readString: Effect.Effect<string, ClipboardError>
  readonly write: (items: ClipboardItems) => Effect.Effect<void, ClipboardError>
  readonly writeString: (text: string) => Effect.Effect<void, ClipboardError>
  readonly writeBlob: (blob: Blob) => Effect.Effect<void, ClipboardError>
  readonly clear: Effect.Effect<void, ClipboardError>
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/Clipboard.ts#L44)

Since v4.0.0

# services

## Clipboard

Service tag for browser clipboard capabilities.

**When to use**

Use when you need to require or provide clipboard capabilities through
Effect's context.

**See**

- `make` for building a custom clipboard service
- `layer` for providing the browser-backed clipboard service

**Signature**

```ts
declare const Clipboard: Context.Service<Clipboard, Clipboard>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/Clipboard.ts#L81)

Since v4.0.0
