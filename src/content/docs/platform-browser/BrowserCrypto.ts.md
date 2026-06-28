---
title: BrowserCrypto.ts
nav_order: 1
parent: "@effect/platform-browser"
---

## BrowserCrypto.ts overview

Browser-backed implementation of Effect's Crypto service.

This module provides a `Crypto.Crypto` layer backed by the Web Crypto API.
The `WebCrypto` context reference defaults to `globalThis.crypto`, so
browser programs can use the standard implementation while tests or embedded
runtimes can provide their own `Crypto` object.

Since v1.0.0

---

## Exports Grouped by Category

- [layers](#layers)
  - [layer](#layer)
- [references](#references)
  - [WebCrypto](#webcrypto)

---

# layers

## layer

Layer that directly interfaces with the Web Crypto API.

**When to use**

Use to provide cryptographic randomness, UUID generation, and digest
operations in browser runtimes backed by `globalThis.crypto`.

**Details**

Random bytes are produced with `crypto.getRandomValues`. Digests are computed
with `crypto.subtle.digest` and returned as `Uint8Array` values.

**Gotchas**

The layer dies if the Web Crypto object is unavailable. Digest operations
fail with `PlatformError` when `crypto.subtle.digest` is unavailable or the
browser rejects the digest request.

**Signature**

```ts
declare const layer: Layer.Layer<EffectCrypto.Crypto, never, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/BrowserCrypto.ts#L54)

Since v1.0.0

# references

## WebCrypto

Provides Browser Web Crypto APIs used by the Crypto service implementation.

**When to use**

Use to override the browser `Crypto` object used by the platform crypto
layer.

**Signature**

```ts
declare const WebCrypto: Context.Reference<Crypto>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/BrowserCrypto.ts#L28)

Since v1.0.0
