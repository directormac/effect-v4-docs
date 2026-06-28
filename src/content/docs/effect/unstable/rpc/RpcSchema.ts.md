---
title: RpcSchema.ts
nav_order: 318
parent: "effect"
---

## RpcSchema.ts overview

RPC schema markers and interruption annotations.

This module contains the small pieces of schema metadata that the RPC
declaration, client, server, cluster, and reactivity layers share. It marks
streamed responses and annotates interruptions that came from a remote client
closing or cancelling a request.

Since v4.0.0

---

## Exports Grouped by Category

- [Cause annotations](#cause-annotations)
  - [ClientAbort (class)](#clientabort-class)
- [streams](#streams)
  - [Stream](#stream)
  - [Stream (interface)](#stream-interface)
  - [isStreamSchema](#isstreamschema)

---

# Cause annotations

## ClientAbort (class)

Annotation that marks interruptions that originate from an RPC client
abort.

**Signature**

```ts
declare class ClientAbort
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcSchema.ts#L92)

Since v4.0.0

# streams

## Stream

Creates an RPC stream schema from a stream element success schema and stream
error schema.

**Signature**

```ts
declare const Stream: <A extends Schema.Constraint, E extends Schema.Constraint>(success: A, error: E) => Stream<A, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcSchema.ts#L81)

Since v4.0.0

## Stream (interface)

A schema marker for RPC streaming responses, storing the success element
schema and stream error schema used for encoding and decoding stream chunks.

**Signature**

```ts
export interface Stream<A extends Schema.Constraint, E extends Schema.Constraint> extends Schema.BottomLazy<
  SchemaAST.Declaration,
  Stream<A, E>
> {
  readonly Type: Stream_.Stream<A["Type"], E["Type"]>
  readonly Encoded: Stream_.Stream<A["Encoded"], E["Encoded"]>
  readonly DecodingServices: A["DecodingServices"] | E["DecodingServices"]
  readonly EncodingServices: A["EncodingServices"] | E["EncodingServices"]
  readonly Rebuild: Stream<A, E>
  readonly "~type.make.in": Stream_.Stream<A["Type"], E["Type"]>
  readonly "~type.make": Stream_.Stream<A["Type"], E["Type"]>
  readonly Iso: Stream_.Stream<A["Type"], E["Type"]>
  readonly [StreamSchemaTypeId]: typeof StreamSchemaTypeId
  readonly success: A
  readonly error: E
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcSchema.ts#L53)

Since v4.0.0

## isStreamSchema

Returns `true` when a schema is an RPC stream schema created by
`RpcSchema.Stream`.

**Signature**

```ts
declare const isStreamSchema: (schema: Schema.Constraint) => schema is Stream<Schema.Top, Schema.Top>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcSchema.ts#L29)

Since v4.0.0
