---
title: BunServices.ts
nav_order: 14
parent: "@effect/platform-bun"
---

## BunServices.ts overview

Aggregate Bun platform services layer.

This module defines the `BunServices` union and a single `layer` that
provides Bun-backed child process spawning, crypto, filesystem, path, stdio,
and terminal services. Use the layer when a Bun program wants the standard
platform services from one place.

Since v4.0.0

---

## Exports Grouped by Category

- [layers](#layers)
  - [layer](#layer)
- [models](#models)
  - [BunServices (type alias)](#bunservices-type-alias)

---

# layers

## layer

Provides the default Bun implementations for child process spawning,
filesystem, path, stdio, and terminal services.

**Signature**

```ts
declare const layer: Layer.Layer<BunServices, never, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-bun/src/BunServices.ts#L41)

Since v4.0.0

# models

## BunServices (type alias)

The union of core services provided by the Bun platform layer, including child
process spawning, filesystem, path, stdio, and terminal services.

**Signature**

```ts
type BunServices = ChildProcessSpawner | Crypto | FileSystem | Path | Terminal | Stdio
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-bun/src/BunServices.ts#L32)

Since v4.0.0
