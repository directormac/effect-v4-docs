---
title: NodeStream.ts
nav_order: 12
parent: "@effect/platform-node-shared"
---

## NodeStream.ts overview

Adapters between Node streams and Effect streams, channels, and readables.

This module is the stream boundary for Node APIs. It wraps `Readable` and
`Duplex` values as Effect `Stream`s and `Channel`s, pipes Effect streams
through Node duplex streams, exposes an Effect `Stream` back to Node as a
`Readable`, and collects readable payloads into strings, array buffers, or
`Uint8Array`s with optional byte limits.

Since v4.0.0

---

## Exports Grouped by Category

- [combinators](#combinators)
  - [pipeThroughDuplex](#pipethroughduplex)
  - [pipeThroughSimple](#pipethroughsimple)
- [constructors](#constructors)
  - [fromDuplex](#fromduplex)
  - [fromReadable](#fromreadable)
  - [fromReadableChannel](#fromreadablechannel)
- [converting](#converting)
  - [toArrayBuffer](#toarraybuffer)
  - [toReadable](#toreadable)
  - [toReadableNever](#toreadablenever)
  - [toString](#tostring)
  - [toUint8Array](#touint8array)

---

# combinators

## pipeThroughDuplex

Pipes an Effect `Stream` through a Node `Duplex`, writing the stream's
chunks to the duplex and emitting chunks read back from it.

**Signature**

```ts
declare const pipeThroughDuplex: {
  <B = Uint8Array<ArrayBufferLike>, E2 = Cause.UnknownError>(options: {
    readonly evaluate: LazyArg<Duplex>
    readonly onError?: (error: unknown) => E2
    readonly chunkSize?: number | undefined
    readonly bufferSize?: number | undefined
    readonly endOnDone?: boolean | undefined
    readonly encoding?: BufferEncoding | undefined
  }): <R, E, A>(self: Stream.Stream<A, E, R>) => Stream.Stream<B, E2 | E, R>
  <R, E, A, B = Uint8Array<ArrayBufferLike>, E2 = Cause.UnknownError>(
    self: Stream.Stream<A, E, R>,
    options: {
      readonly evaluate: LazyArg<Duplex>
      readonly onError?: (error: unknown) => E2
      readonly chunkSize?: number | undefined
      readonly bufferSize?: number | undefined
      readonly endOnDone?: boolean | undefined
      readonly encoding?: BufferEncoding | undefined
    }
  ): Stream.Stream<B, E | E2, R>
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeStream.ts#L124)

Since v4.0.0

## pipeThroughSimple

Pipes a stream of strings or bytes through a Node `Duplex` using default
options and `Cause.UnknownError` for stream failures.

**Signature**

```ts
declare const pipeThroughSimple: {
  (
    duplex: LazyArg<Duplex>
  ): <R, E>(self: Stream.Stream<string | Uint8Array, E, R>) => Stream.Stream<Uint8Array, E | Cause.UnknownError, R>
  <R, E>(
    self: Stream.Stream<string | Uint8Array, E, R>,
    duplex: LazyArg<Duplex>
  ): Stream.Stream<Uint8Array, Cause.UnknownError | E, R>
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeStream.ts#L169)

Since v4.0.0

# constructors

## fromDuplex

Creates a `Channel` over a Node `Duplex`, writing upstream chunks with
backpressure while emitting chunks read from the duplex and optionally ending
the writable side when upstream completes.

**Signature**

```ts
declare const fromDuplex: <
  IE,
  I = Uint8Array<ArrayBufferLike>,
  O = Uint8Array<ArrayBufferLike>,
  E = Cause.UnknownError
>(options: {
  readonly evaluate: LazyArg<Duplex>
  readonly onError?: (error: unknown) => E
  readonly chunkSize?: number | undefined
  readonly bufferSize?: number | undefined
  readonly endOnDone?: boolean | undefined
  readonly encoding?: BufferEncoding | undefined
}) => Channel.Channel<Arr.NonEmptyReadonlyArray<O>, IE | E, void, Arr.NonEmptyReadonlyArray<I>, IE>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeStream.ts#L78)

Since v4.0.0

## fromReadable

Converts a Node readable stream into an Effect `Stream`, reading chunks with
an optional chunk size, mapping stream errors with `onError`, and destroying
the readable on completion unless `closeOnDone` is `false`.

**Signature**

```ts
declare const fromReadable: <A = Uint8Array<ArrayBufferLike>, E = Cause.UnknownError>(options: {
  readonly evaluate: LazyArg<Readable | NodeJS.ReadableStream>
  readonly onError?: (error: unknown) => E
  readonly chunkSize?: number | undefined
  readonly bufferSize?: number | undefined
  readonly closeOnDone?: boolean | undefined
}) => Stream.Stream<A, E>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeStream.ts#L38)

Since v4.0.0

## fromReadableChannel

Creates a `Channel` that pulls chunks from a Node readable stream, mapping
errors with `onError` and destroying the readable on completion unless
`closeOnDone` is `false`.

**Signature**

```ts
declare const fromReadableChannel: <A = Uint8Array<ArrayBufferLike>, E = Cause.UnknownError>(options: {
  readonly evaluate: LazyArg<Readable | NodeJS.ReadableStream>
  readonly onError?: (error: unknown) => E
  readonly chunkSize?: number | undefined
  readonly closeOnDone?: boolean | undefined
}) => Channel.Channel<Arr.NonEmptyReadonlyArray<A>, E>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeStream.ts#L54)

Since v4.0.0

# converting

## toArrayBuffer

Consumes a Node readable stream into an `ArrayBuffer`, failing through
`onError` on stream errors or when `maxBytes` is exceeded and destroying the
stream on interruption or failure.

**Signature**

```ts
declare const toArrayBuffer: <E = Cause.UnknownError>(
  readable: LazyArg<Readable | NodeJS.ReadableStream>,
  options?: { readonly onError?: (error: unknown) => E; readonly maxBytes?: SizeInput | undefined }
) => Effect.Effect<ArrayBuffer, E>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeStream.ts#L270)

Since v4.0.0

## toReadable

Converts an Effect `Stream` into a Node `Readable`, using the caller's
Effect context to run the stream and destroying the readable if the stream
fails.

**Signature**

```ts
declare const toReadable: <E, R>(stream: Stream.Stream<string | Uint8Array, E, R>) => Effect.Effect<Readable, never, R>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeStream.ts#L190)

Since v4.0.0

## toReadableNever

Converts a service-free Effect `Stream` into a Node `Readable` using an
empty Effect context.

**Signature**

```ts
declare const toReadableNever: <E>(stream: Stream.Stream<string | Uint8Array, E, never>) => Readable
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeStream.ts#L203)

Since v4.0.0

## toString

Consumes a Node readable stream into a string using the selected encoding,
failing through `onError` on stream errors or when `maxBytes` is exceeded
and destroying the stream on interruption or failure.

**Signature**

```ts
declare const toString: <E = Cause.UnknownError>(
  readable: LazyArg<Readable | NodeJS.ReadableStream>,
  options?: {
    readonly onError?: (error: unknown) => E
    readonly encoding?: BufferEncoding | undefined
    readonly maxBytes?: SizeInput | undefined
  }
) => Effect.Effect<string, E>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeStream.ts#L217)

Since v4.0.0

## toUint8Array

Consumes a Node readable stream into a `Uint8Array`, using the same error
mapping and `maxBytes` handling as `toArrayBuffer`.

**Signature**

```ts
declare const toUint8Array: <E = Cause.UnknownError>(
  readable: LazyArg<Readable | NodeJS.ReadableStream>,
  options?: { readonly onError?: (error: unknown) => E; readonly maxBytes?: SizeInput | undefined }
) => Effect.Effect<Uint8Array, E>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeStream.ts#L320)

Since v4.0.0
