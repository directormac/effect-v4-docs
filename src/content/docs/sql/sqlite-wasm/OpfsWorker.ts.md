---
title: OpfsWorker.ts
nav_order: 2
parent: "@effect/sql-sqlite-wasm"
---

## OpfsWorker.ts overview

Runs the worker side of the browser SQLite WASM client that stores data in
OPFS.

This module opens `@effect/wa-sqlite` with the OPFS access-handle VFS, then
listens on a `MessagePort`-compatible port for the protocol used by
`SqliteClient`. It sends a ready message, executes SQL messages, imports and
exports database bytes, forwards update-hook notifications, and closes when
requested. It is meant to run in a dedicated worker or a `SharedWorker`.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [run](#run)
- [models](#models)
  - [OpfsWorkerConfig (interface)](#opfsworkerconfig-interface)

---

# constructors

## run

Runs the SQLite OPFS worker loop, opening the configured database, posting a ready message, handling query/import/export/update-hook messages, and closing when a close message is received.

**Signature**

```ts
declare const run: (options: OpfsWorkerConfig) => Effect.Effect<void, SqlError>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/do/src/OpfsWorker.ts#L42)

Since v4.0.0

# models

## OpfsWorkerConfig (interface)

Configuration for the SQLite OPFS worker, including the message port used for the client protocol and the OPFS database name to open.

**Signature**

```ts
export interface OpfsWorkerConfig {
  readonly port: EventTarget & Pick<MessagePort, "postMessage" | "close">
  readonly dbName: string
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/do/src/OpfsWorker.ts#L31)

Since v4.0.0
