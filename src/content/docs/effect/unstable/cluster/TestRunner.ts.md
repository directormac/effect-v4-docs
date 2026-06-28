---
title: TestRunner.ts
nav_order: 210
parent: "effect"
---

## TestRunner.ts overview

The `TestRunner` module assembles the smallest cluster runtime useful in
tests: `Sharding` backed by in-memory message storage, in-memory runner
storage, no-op runner transport, and always-healthy runner checks. It lets
code that depends on cluster services exercise registration, shard
coordination, and mailbox persistence without starting RPC servers or
external databases.

Since v4.0.0

---

## Exports Grouped by Category

- [layers](#layers)
  - [layer](#layer)

---

# layers

## layer

Layer that provides an in-memory cluster for testing.

**Details**

`MessageStorage` and `RunnerStorage` are backed by in-memory drivers.

**Signature**

```ts
declare const layer: Layer.Layer<
  Sharding.Sharding | Runners.Runners | MessageStorage.MessageStorage | MessageStorage.MemoryDriver,
  never,
  never
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/TestRunner.ts#L29)

Since v4.0.0
