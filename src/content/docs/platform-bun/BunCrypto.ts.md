---
title: BunCrypto.ts
nav_order: 4
parent: "@effect/platform-bun"
---

## BunCrypto.ts overview

The `BunCrypto` module provides Bun's `Crypto` service layer for Effect
programs. Provide `layer` at the edge of a Bun app, CLI, script, or
test to satisfy `effect/Crypto` with cryptographically secure random bytes,
UUID generation, random values, and SHA digest operations.

This adapter reuses the shared Node-compatible implementation, so randomness
and digest behavior follow Bun's `node:crypto` compatibility layer. SHA-1 is
present for interoperability with existing protocols, not for new
security-sensitive designs.

Since v1.0.0

---

## Exports Grouped by Category

- [layers](#layers)
  - [layer](#layer)

---

# layers

## layer

Layer that provides the Bun Crypto service implementation.

**Signature**

```ts
declare const layer: Layer.Layer<Crypto.Crypto, never, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-bun/src/BunCrypto.ts#L24)

Since v1.0.0
