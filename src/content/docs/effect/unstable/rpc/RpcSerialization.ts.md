---
title: RpcSerialization.ts
nav_order: 319
parent: "effect"
---

## RpcSerialization.ts overview

Serializes RPC protocol messages for transports.

`RpcSerialization` is the boundary between `RpcMessage` envelopes and the
bytes or strings carried by a transport. This module provides built-in
serializers for JSON, newline-delimited JSON, JSON-RPC 2.0, and MessagePack,
including framed formats that can decode multiple messages from streaming
chunks.

Since v4.0.0

---

## Exports Grouped by Category

- [serialization](#serialization)
  - [Parser (interface)](#parser-interface)
  - [RpcSerialization (class)](#rpcserialization-class)
  - [json](#json)
  - [jsonRpc](#jsonrpc)
  - [layerJson](#layerjson)
  - [layerJsonRpc](#layerjsonrpc)
  - [layerMsgPack](#layermsgpack)
  - [layerNdJsonRpc](#layerndjsonrpc)
  - [layerNdjson](#layerndjson)
  - [makeMsgPack](#makemsgpack)
  - [msgPack](#msgpack)
  - [ndJsonRpc](#ndjsonrpc)
  - [ndjson](#ndjson)

---

# serialization

## Parser (interface)

A stateful parser for an RPC serialization format, able to decode input
chunks into protocol messages and encode messages for transport.

**Signature**

```ts
export interface Parser {
  readonly decode: (data: Uint8Array | string) => ReadonlyArray<unknown>
  readonly encode: (response: unknown) => Uint8Array | string | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcSerialization.ts#L45)

Since v4.0.0

## RpcSerialization (class)

Service that describes how RPC protocol messages are encoded and decoded,
including the content type and whether the serialization format provides
message framing.

**When to use**

Use to provide the serialization boundary shared by RPC clients and servers
for a chosen wire format.

**Signature**

```ts
declare class RpcSerialization
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcSerialization.ts#L32)

Since v4.0.0

## json

JSON RPC serialization for whole message payloads. It does not include
message framing, so it is intended for transports that frame responses
themselves.

**Signature**

```ts
declare const json: { makeUnsafe(): Parser; readonly contentType: string; readonly includesFraming: boolean }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcSerialization.ts#L58)

Since v4.0.0

## jsonRpc

Creates a JSON-RPC 2.0 serialization for RPC protocol messages without
additional message framing.

**Signature**

```ts
declare const jsonRpc: (options?: { readonly contentType?: string | undefined }) => RpcSerialization["Service"]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcSerialization.ts#L123)

Since v4.0.0

## layerJson

RPC serialization layer that uses JSON for serialization.

**When to use**

Use when you have a transport protocol that already provides message framing.

**See**

- `layerNdjson` for transports that need newline-delimited framing

**Signature**

```ts
declare const layerJson: Layer.Layer<RpcSerialization, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcSerialization.ts#L498)

Since v4.0.0

## layerJsonRpc

RPC serialization layer that uses JSON-RPC for serialization.

**Signature**

```ts
declare const layerJsonRpc: (options?: { readonly contentType?: string | undefined }) => Layer.Layer<RpcSerialization>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcSerialization.ts#L520)

Since v4.0.0

## layerMsgPack

RPC serialization layer that uses MessagePack for serialization.

**Details**

MessagePack has a more compact binary format compared to JSON and NDJSON. It
also has better support for binary data.

**Signature**

```ts
declare const layerMsgPack: Layer.Layer<RpcSerialization, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcSerialization.ts#L546)

Since v4.0.0

## layerNdJsonRpc

RPC serialization layer that uses newline-delimited JSON-RPC for
serialization.

**Signature**

```ts
declare const layerNdJsonRpc: (options?: { readonly contentType?: string | undefined }) => Layer.Layer<RpcSerialization>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcSerialization.ts#L531)

Since v4.0.0

## layerNdjson

RPC serialization layer that uses NDJSON for serialization.

**When to use**

Use when you have a transport protocol that does not provide message framing.

**See**

- `layerJson` for transports that already provide message framing

**Signature**

```ts
declare const layerNdjson: Layer.Layer<RpcSerialization, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcSerialization.ts#L512)

Since v4.0.0

## makeMsgPack

Create a MessagePack serialization with custom msgpackr options.

**Signature**

```ts
declare const makeMsgPack: (options?: Msgpackr.Options | undefined) => RpcSerialization["Service"]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcSerialization.ts#L441)

Since v4.0.0

## msgPack

Default MessagePack RPC serialization using record support and built-in
message framing.

**Signature**

```ts
declare const msgPack: { makeUnsafe(): Parser; readonly contentType: string; readonly includesFraming: boolean }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcSerialization.ts#L484)

Since v4.0.0

## ndJsonRpc

Creates a newline-delimited JSON-RPC 2.0 serialization for RPC protocol
messages.

**Signature**

```ts
declare const ndJsonRpc: (options?: { readonly contentType?: string | undefined }) => RpcSerialization["Service"]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcSerialization.ts#L157)

Since v4.0.0

## ndjson

Serializes RPC protocol messages as newline-delimited JSON, framing each message
with a trailing newline.

**Signature**

```ts
declare const ndjson: { makeUnsafe(): Parser; readonly contentType: string; readonly includesFraming: boolean }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcSerialization.ts#L80)

Since v4.0.0
