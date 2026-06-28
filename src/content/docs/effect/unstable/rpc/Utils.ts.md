---
title: Utils.ts
nav_order: 323
parent: "effect"
---

## Utils.ts overview

Helps RPC protocol services buffer messages until their receive loop starts.

Client and server protocol constructors use these helpers to expose a stable
service before the active receiver is installed. Writes made before `run`
starts are buffered with their current `Context`, then replayed once the
receiver is ready.

Since v4.0.0

---

## Exports Grouped by Category

- [services](#services)
  - [withRun](#withrun)
  - [withRunClient](#withrunclient)

---

# services

## withRun

Builds a service with a `run` method that buffers writes until `run` installs
a writer, replays buffered writes with their original contexts, and restores
the previous writer when the run ends.

**Signature**

```ts
declare const withRun: <
  A extends { readonly run: (f: (...args: Array<any>) => Effect.Effect<void>) => Effect.Effect<never> }
>() => <EX, RX>(
  f: (write: Parameters<A["run"]>[0]) => Effect.Effect<Omit<A, "run">, EX, RX>
) => Effect.Effect<A, EX, RX>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Utils.ts#L25)

Since v4.0.0

## withRunClient

Builds an RPC client protocol service that tracks active client IDs and
buffers server responses per client until that client's `run` handler is
installed.

**Signature**

```ts
declare const withRunClient: <EX, RX>(
  f: (
    write: (clientId: number, response: FromServerEncoded) => Effect.Effect<void>,
    clientIds: ReadonlySet<number>
  ) => Effect.Effect<Omit<Protocol["Service"], "run">, EX, RX>
) => Effect.Effect<Protocol["Service"], EX, RX>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Utils.ts#L68)

Since v4.0.0
