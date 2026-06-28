---
title: Transferable.ts
nav_order: 341
parent: "effect"
---

## Transferable.ts overview

Marks encoded worker message fields that should move through `postMessage` as
transfer-list entries.

Worker messages still pass through schema encoding and structured clone, but
schemas wrapped with `schema` can also report backing resources such as
`ArrayBuffer`, `ImageData.data.buffer`, or `MessagePort` to a `Collector`.
Worker platforms then pass the collected values as the transfer list for the
same `postMessage` call, avoiding copies for large payloads and ports.

Since v4.0.0

---

## Exports Grouped by Category

- [accessors](#accessors)
  - [addAll](#addall)
- [constructors](#constructors)
  - [makeCollector](#makecollector)
  - [makeCollectorUnsafe](#makecollectorunsafe)
- [getters](#getters)
  - [getterAddAll](#getteraddall)
- [models](#models)
  - [Collector (class)](#collector-class)
- [schemas](#schemas)
  - [ImageData](#imagedata)
  - [MessagePort](#messageport)
  - [Transferable (interface)](#transferable-interface)
  - [Uint8Array](#uint8array)
  - [schema](#schema)

---

# accessors

## addAll

Adds transferables to the current `Collector` when one is present in the
context, and does nothing otherwise.

**Signature**

```ts
declare const addAll: (tranferables: Iterable<globalThis.Transferable>) => Effect.Effect<void>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Transferable.ts#L81)

Since v4.0.0

# constructors

## makeCollector

Effect that creates a fresh `Collector` service for accumulating
transferables.

**Signature**

```ts
declare const makeCollector: Effect.Effect<
  {
    readonly addAll: (_: Iterable<globalThis.Transferable>) => Effect.Effect<void>
    readonly addAllUnsafe: (_: Iterable<globalThis.Transferable>) => void
    readonly read: Effect.Effect<Array<globalThis.Transferable>>
    readonly readUnsafe: () => Array<globalThis.Transferable>
    readonly clearUnsafe: () => Array<globalThis.Transferable>
    readonly clear: Effect.Effect<Array<globalThis.Transferable>>
  },
  never,
  never
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Transferable.ts#L72)

Since v4.0.0

## makeCollectorUnsafe

Creates a mutable `Collector` service directly, exposing unsafe synchronous
methods for reading, adding, and clearing collected transferables.

**Signature**

```ts
declare const makeCollectorUnsafe: () => Collector["Service"]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Transferable.ts#L44)

Since v4.0.0

# getters

## getterAddAll

Creates a schema getter that records transferables derived from a value in
the current `Collector` while passing the value through unchanged.

**Signature**

```ts
declare const getterAddAll: <A>(f: (_: A) => Iterable<globalThis.Transferable>) => SchemaGetter.Getter<A, A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Transferable.ts#L98)

Since v4.0.0

# models

## Collector (class)

Service for collecting `Transferable` objects while encoding worker messages
so they can be passed to `postMessage` transfer lists.

**Signature**

```ts
declare class Collector
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Transferable.ts#L26)

Since v4.0.0

# schemas

## ImageData

Schema for transferring `ImageData` values with their pixel data buffer.

**Signature**

```ts
declare const ImageData: Transferable<Schema.declare<ImageData, ImageData>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Transferable.ts#L166)

Since v4.0.0

## MessagePort

Schema for transferring `MessagePort` values as transferable objects.

**Signature**

```ts
declare const MessagePort: Transferable<Schema.declare<MessagePort, MessagePort>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Transferable.ts#L177)

Since v4.0.0

## Transferable (interface)

Schema wrapper whose encode path can record transferables with a `Collector`
while preserving the wrapped schema's decoded type.

**Signature**

```ts
export interface Transferable<S extends Schema.Top> extends Schema.decodeTo<
  Schema.toType<S["Rebuild"]>,
  S["Rebuild"]
> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Transferable.ts#L117)

Since v4.0.0

## Uint8Array

Schema for transferring `Uint8Array` values with their backing buffer.

**Signature**

```ts
declare const Uint8Array: Transferable<Schema.instanceOf<Uint8Array<ArrayBuffer>, Uint8Array<ArrayBuffer>>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Transferable.ts#L188)

Since v4.0.0

## schema

Wraps a schema so encoding records transferables selected from the encoded
value, enabling worker messages to populate a `postMessage` transfer list.

**Signature**

```ts
declare const schema: {
  <S extends Schema.Top>(f: (_: S["Encoded"]) => Iterable<globalThis.Transferable>): (self: S) => Transferable<S>
  <S extends Schema.Top>(self: S, f: (_: S["Encoded"]) => Iterable<globalThis.Transferable>): Transferable<S>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Transferable.ts#L131)

Since v4.0.0
