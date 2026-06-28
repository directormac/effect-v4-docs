---
title: NodeHttpIncomingMessage.ts
nav_order: 9
parent: "@effect/platform-node"
---

## NodeHttpIncomingMessage.ts overview

Adapter base for exposing Node `http.IncomingMessage` values as Effect HTTP
incoming messages.

Server requests and Node client responses both arrive as Node readable
streams with raw header objects, socket metadata, and one-shot body
consumption. This module's `NodeHttpIncomingMessage` class keeps the original
Node message available while presenting Effect's `HttpIncomingMessage` shape:
typed headers, remote address lookup, stream access, and text, JSON,
URL-encoded, and array-buffer body readers.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [NodeHttpIncomingMessage (class)](#nodehttpincomingmessage-class)
    - [[IncomingMessage.TypeId] (property)](#incomingmessagetypeid-property)
    - [source (property)](#source-property)
    - [onError (property)](#onerror-property)
    - [remoteAddressOverride (property)](#remoteaddressoverride-property)

---

# constructors

## NodeHttpIncomingMessage (class)

Adapts a Node `IncomingMessage` to Effect HTTP incoming messages.

**When to use**

Use to implement Node HTTP request or response adapters that expose the
Effect HTTP incoming-message interface.

**Details**

The adapter exposes headers, remote address, stream access, and cached body
decoders. Subclasses provide the error mapping for unknown Node errors.

**Signature**

```ts
declare class NodeHttpIncomingMessage<E> {
  constructor(
    source: Http.IncomingMessage,
    onError: (error: unknown) => E,
    remoteAddressOverride?: Option.Option<string>
  )
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeHttpIncomingMessage.ts#L41)

Since v4.0.0

### [IncomingMessage.TypeId] (property)

Marks this value as an HTTP incoming message for runtime guards.

**Signature**

```ts
readonly [IncomingMessage.TypeId]: "~effect/http/HttpIncomingMessage"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeHttpIncomingMessage.ts#L49)

Since v4.0.0

### source (property)

**Signature**

```ts
readonly source: Http.IncomingMessage
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeHttpIncomingMessage.ts#L50)

### onError (property)

**Signature**

```ts
readonly onError: (error: unknown) => E
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeHttpIncomingMessage.ts#L51)

### remoteAddressOverride (property)

**Signature**

```ts
readonly remoteAddressOverride: Option.Option<string> | undefined
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeHttpIncomingMessage.ts#L52)
