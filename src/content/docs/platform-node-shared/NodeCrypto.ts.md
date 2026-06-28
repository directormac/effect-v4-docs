---
title: NodeCrypto.ts
nav_order: 4
parent: "@effect/platform-node-shared"
---

## NodeCrypto.ts overview

Node-compatible implementation of Effect's `Crypto` service.

This module builds the service from `node:crypto`, using `randomBytes` for
random data and `createHash` for supported digest algorithms. It exports
`make` as the concrete service value and `layer` for providing it through
Effect context.

Since v1.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [make](#make)
- [layers](#layers)
  - [layer](#layer)

---

# constructors

## make

The default Node.js Crypto service implementation.

**Signature**

```ts
declare const make: EffectCrypto.Crypto
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeCrypto.ts#L49)

Since v1.0.0

# layers

## layer

Layer that provides the Node.js Crypto service implementation.

**Signature**

```ts
declare const layer: Layer.Layer<EffectCrypto.Crypto, never, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeCrypto.ts#L60)

Since v1.0.0
