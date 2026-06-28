---
title: BrowserStream.ts
nav_order: 7
parent: "@effect/platform-browser"
---

## BrowserStream.ts overview

Browser DOM event streams.

This module provides typed constructors that turn `window.addEventListener`
and `document.addEventListener` events into Effect `Stream` values. Both
helpers accept the usual listener options and an optional stream buffer size.

Since v4.0.0

---

## Exports Grouped by Category

- [streams](#streams)
  - [fromEventListenerDocument](#fromeventlistenerdocument)
  - [fromEventListenerWindow](#fromeventlistenerwindow)

---

# streams

## fromEventListenerDocument

Creates a `Stream` from `document.addEventListener`.

**Details**

By default, the underlying buffer is unbounded in size. You can customize the
buffer size by passing an object as the second argument with the `bufferSize`
field.

**Signature**

```ts
declare const fromEventListenerDocument: <K extends keyof DocumentEventMap>(
  type: K,
  options?:
    | boolean
    | {
        readonly capture?: boolean
        readonly passive?: boolean
        readonly once?: boolean
        readonly bufferSize?: number | undefined
      }
    | undefined
) => Stream.Stream<DocumentEventMap[K], never, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/BrowserStream.ts#L47)

Since v4.0.0

## fromEventListenerWindow

Creates a `Stream` from `window.addEventListener`.

**Details**

By default, the underlying buffer is unbounded in size. You can customize the
buffer size by passing an object as the second argument with the `bufferSize`
field.

**Signature**

```ts
declare const fromEventListenerWindow: <K extends keyof WindowEventMap>(
  type: K,
  options?:
    | boolean
    | {
        readonly capture?: boolean
        readonly passive?: boolean
        readonly once?: boolean
        readonly bufferSize?: number | undefined
      }
    | undefined
) => Stream.Stream<WindowEventMap[K], never, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/BrowserStream.ts#L25)

Since v4.0.0
