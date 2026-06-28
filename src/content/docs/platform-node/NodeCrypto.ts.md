---
title: NodeCrypto.ts
nav_order: 6
parent: "@effect/platform-node"
---

## NodeCrypto.ts overview

The `NodeCrypto` module provides the Node.js `Crypto` service layer for
Effect programs. Provide `layer` at the edge of a Node application,
CLI, script, or test to satisfy `effect/Crypto` with Node's `node:crypto`
implementation for secure random bytes, UUID generation, random values, and
SHA digest operations.

This module is the public Node adapter around the shared Node-compatible
implementation. Digest failures are reported as platform errors, and SHA-1
remains available only for interoperability with existing protocols.

Since v1.0.0

---

## Exports Grouped by Category

- [layers](#layers)
  - [layer](#layer)

---

# layers

## layer

Layer that provides the Node.js Crypto service implementation.

**Signature**

```ts
declare const layer: Layer.Layer<Crypto.Crypto, never, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeCrypto.ts#L24)

Since v1.0.0
