---
title: NodeSink.ts
nav_order: 8
parent: "@effect/platform-node-shared"
---

## NodeSink.ts overview

Sink adapters for writing Effect chunks into Node writable streams.

`fromWritable` creates a `Sink`, `fromWritableChannel` creates a lower-level
`Channel`, and `pullIntoWritable` writes from an existing pull loop. All
three adapters respect writable-stream backpressure, map writable errors with
the supplied `onError` function, and can end the writable when the upstream
data is done.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [fromWritable](#fromwritable)
  - [fromWritableChannel](#fromwritablechannel)
- [converting](#converting)
  - [pullIntoWritable](#pullintowritable)

---

# constructors

## fromWritable

Creates a `Sink` that writes chunks to a Node writable stream, respecting
backpressure, mapping writable errors with `onError`, and ending the stream
on completion unless `endOnDone` is `false`.

**Signature**

```ts
declare const fromWritable: <E, A = string | Uint8Array<ArrayBufferLike>>(options: {
  readonly evaluate: LazyArg<Writable | NodeJS.WritableStream>
  readonly onError: (error: unknown) => E
  readonly endOnDone?: boolean | undefined
  readonly encoding?: BufferEncoding | undefined
}) => Sink.Sink<void, A, never, E>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeSink.ts#L29)

Since v4.0.0

## fromWritableChannel

Creates a `Channel` that pulls chunks from upstream and writes them to a
Node writable stream, respecting backpressure and optionally ending the
writable when upstream is done.

**Signature**

```ts
declare const fromWritableChannel: <IE, E, A = string | Uint8Array<ArrayBufferLike>>(options: {
  readonly evaluate: LazyArg<Writable | NodeJS.WritableStream>
  readonly onError: (error: unknown) => E
  readonly endOnDone?: boolean | undefined
  readonly encoding?: BufferEncoding | undefined
}) => Channel.Channel<never, IE | E, void, NonEmptyReadonlyArray<A>, IE>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeSink.ts#L47)

Since v4.0.0

# converting

## pullIntoWritable

Writes Effect chunks into a Node writable stream.

**When to use**

Use to implement custom Node stream adapters that already have an upstream
pull and need direct control over a writable stream.

**Details**

The loop waits for `drain` when needed, fails on writable errors, and ends
the writable on upstream completion unless `endOnDone` is `false`.

**Signature**

```ts
declare const pullIntoWritable: <A, IE, E>(options: {
  readonly pull: Pull.Pull<NonEmptyReadonlyArray<A>, IE, unknown>
  readonly writable: Writable
  readonly onError: (error: unknown) => E
  readonly endOnDone?: boolean | undefined
  readonly encoding?: BufferEncoding | undefined
}) => Pull.Pull<never, IE | E, unknown>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeSink.ts#L76)

Since v4.0.0
