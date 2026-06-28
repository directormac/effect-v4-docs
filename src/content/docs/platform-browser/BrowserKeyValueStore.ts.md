---
title: BrowserKeyValueStore.ts
nav_order: 3
parent: "@effect/platform-browser"
---

## BrowserKeyValueStore.ts overview

Browser-backed `KeyValueStore` layers for client-side Effect programs.

This module provides browser implementations of the unstable persistence
`KeyValueStore` service. Use `layerLocalStorage` for small
origin-scoped values that should survive reloads and browser restarts, use
`layerSessionStorage` for tab / page-session state, and use
`layerIndexedDb` when the store should be asynchronous and backed by
IndexedDB. The IndexedDB layer requires the browser `IndexedDb` service and
accepts an optional database name.

Since v4.0.0

---

## Exports Grouped by Category

- [layers](#layers)
  - [layerIndexedDb](#layerindexeddb)
  - [layerLocalStorage](#layerlocalstorage)
  - [layerSessionStorage](#layersessionstorage)

---

# layers

## layerIndexedDb

Creates a `KeyValueStore` layer backed by IndexedDB.

**When to use**

Use when you need persistent asynchronous IndexedDB storage for a browser
`KeyValueStore` instead of the synchronous Web Storage APIs.

**Details**

The database name defaults to `"effect_key_value_store"`. The layer requires
the `IndexedDb` service and stores string and `Uint8Array` values in the same
backing object store.

**Gotchas**

IndexedDB may be unavailable or blocked by browser settings, private browsing,
quota limits, or restricted contexts. The string and `Uint8Array` accessors do
not coerce values stored with the other representation.

**See**

- `layerLocalStorage` for synchronous persistent Web Storage
- `layerSessionStorage` for synchronous tab-session Web Storage

**Signature**

```ts
declare const layerIndexedDb: (options?: {
  readonly database?: string | undefined
}) => Layer.Layer<KeyValueStore.KeyValueStore, never, IndexedDb>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/BrowserKeyValueStore.ts#L65)

Since v4.0.0

## layerLocalStorage

Creates a `KeyValueStore` layer that uses the browser's `localStorage` API and stores values between browser sessions.

**Signature**

```ts
declare const layerLocalStorage: Layer.Layer<KeyValueStore.KeyValueStore, never, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/BrowserKeyValueStore.ts#L25)

Since v4.0.0

## layerSessionStorage

Creates a `KeyValueStore` layer that uses the browser's `sessionStorage` API and stores values only for the current session.

**Signature**

```ts
declare const layerSessionStorage: Layer.Layer<KeyValueStore.KeyValueStore, never, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/BrowserKeyValueStore.ts#L35)

Since v4.0.0
