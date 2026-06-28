---
title: RpcWorker.ts
nav_order: 322
parent: "effect"
---

## RpcWorker.ts overview

Initial messages for worker-backed RPC protocols.

A worker-backed RPC client can send one schema-encoded value before normal RPC
requests are handled. This module defines the `InitialMessage` service, a
helper for encoding that value while collecting transferables, a layer for
providing it to the client protocol, and a decoder for reading it from the
worker server protocol.

Since v4.0.0

---

## Exports Grouped by Category

- [initial message](#initial-message)
  - [InitialMessage (class)](#initialmessage-class)
  - [initialMessage](#initialmessage)
  - [layerInitialMessage](#layerinitialmessage)
  - [makeInitialMessage](#makeinitialmessage)
- [utils](#utils)
  - [InitialMessage (namespace)](#initialmessage-namespace)
    - [Encoded (interface)](#encoded-interface)

---

# initial message

## InitialMessage (class)

Context service that supplies the initial RPC worker message as encoded data
paired with any transferables that should be posted with it.

**Signature**

```ts
declare class InitialMessage
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcWorker.ts#L27)

Since v4.0.0

## initialMessage

Reads the protocol initial message and decodes it with the supplied schema,
failing if no initial message is available or decoding fails.

**Signature**

```ts
declare const initialMessage: <S extends Schema.Constraint>(
  schema: S
) => Effect.Effect<S["Type"], NoSuchElementError | Schema.SchemaError, Protocol | S["DecodingServices"]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcWorker.ts#L111)

Since v4.0.0

## layerInitialMessage

Provides the `InitialMessage` service from a schema and build effect,
capturing the layer context and dying if schema encoding fails.

**Signature**

```ts
declare const layerInitialMessage: <S extends Schema.Constraint, R2>(
  schema: S,
  build: Effect.Effect<S["Type"], never, R2>
) => Layer.Layer<InitialMessage, never, S["EncodingServices"] | R2>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcWorker.ts#L92)

Since v4.0.0

## makeInitialMessage

Runs an effect, encodes its result with the schema's JSON codec, and returns
the encoded value together with collected transferables.

**Signature**

```ts
declare const makeInitialMessage: <S extends Schema.Constraint, E, R2>(
  schema: S,
  effect: Effect.Effect<S["Type"], E, R2>
) => Effect.Effect<
  readonly [data: unknown, transferables: ReadonlyArray<globalThis.Transferable>],
  E | Schema.SchemaError,
  S["EncodingServices"] | R2
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcWorker.ts#L67)

Since v4.0.0

# utils

## InitialMessage (namespace)

Types related to the encoded initial message exchanged with an RPC worker.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcWorker.ts#L42)

Since v4.0.0

### Encoded (interface)

Tagged wire representation of an RPC worker initial message after schema
encoding.

**Signature**

```ts
export interface Encoded {
  readonly _tag: "InitialMessage"
  readonly value: unknown
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcWorker.ts#L50)

Since v4.0.0
