---
title: BrowserPersistence.ts
nav_order: 4
parent: "@effect/platform-browser"
---

## BrowserPersistence.ts overview

IndexedDB-backed persistence layers for browser Effect programs.

This module provides a low-level `BackingPersistence` layer and a higher-level
`Persistence` layer that store object values in IndexedDB. Values are stored
by persistence store id and key, and reads check TTL expiration before
returning stored data. The database name can be customized and defaults to
`"effect_persistence"`.

Since v4.0.0

---

## Exports Grouped by Category

- [layers](#layers)
  - [layerBackingIndexedDb](#layerbackingindexeddb)
  - [layerIndexedDb](#layerindexeddb)

---

# layers

## layerBackingIndexedDb

Creates a `BackingPersistence` layer backed by IndexedDB, optionally using the provided database name.

**When to use**

Use when composing persistence manually and the lower-level
`BackingPersistence` service should be backed by browser IndexedDB.

**Details**

The database name defaults to `"effect_persistence"`. Entries are stored by
persistence store id and key in a shared object store, and TTL expiration is
checked when values are read.

**Gotchas**

Opening the database is defected during layer acquisition if IndexedDB is
unavailable or cannot be opened. Store operations report `PersistenceError`
for IndexedDB request, transaction, quota, and structured-clone failures.

**See**

- `layerIndexedDb` for providing the higher-level `Persistence` service

**Signature**

```ts
declare const layerBackingIndexedDb: (options?: {
  readonly database?: string | undefined
}) => Layer.Layer<Persistence.BackingPersistence>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/BrowserPersistence.ts#L44)

Since v4.0.0

## layerIndexedDb

Creates a `Persistence` layer backed by IndexedDB, optionally using the provided database name.

**Signature**

```ts
declare const layerIndexedDb: (options?: {
  readonly database?: string | undefined
}) => Layer.Layer<Persistence.Persistence>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/BrowserPersistence.ts#L79)

Since v4.0.0
