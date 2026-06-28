---
title: IndexedDb.ts
nav_order: 13
parent: "@effect/platform-browser"
---

## IndexedDb.ts overview

Browser IndexedDB primitives and key schemas for Effect applications.

This module is the low-level bridge used by the platform-browser IndexedDB
integration. It provides an `IndexedDb` service around the browser
`indexedDB` factory and `IDBKeyRange` constructor, a `layerWindow` layer for
wiring those primitives from `window`, and schemas for the key shapes accepted
by IndexedDB object stores and indexes.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [layerWindow](#layerwindow)
  - [make](#make)
- [models](#models)
  - [IndexedDb (interface)](#indexeddb-interface)
- [schemas](#schemas)
  - [AutoIncrement](#autoincrement)
  - [IDBValidKey](#idbvalidkey)
- [services](#services)
  - [IndexedDb](#indexeddb)

---

# constructors

## layerWindow

Layer that provides `IndexedDb` from `window.indexedDB` and `window.IDBKeyRange`, failing with a config error when they are unavailable.

**Signature**

```ts
declare const layerWindow: Layer.Layer<IndexedDb, never, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDb.ts#L99)

Since v4.0.0

## make

Creates an `IndexedDb` service from an `IDBFactory` and `IDBKeyRange` constructor.

**Signature**

```ts
declare const make: (impl: Omit<IndexedDb, typeof TypeId>) => IndexedDb
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDb.ts#L91)

Since v4.0.0

# models

## IndexedDb (interface)

Service interface that provides the browser `indexedDB` factory and `IDBKeyRange` constructor.

**Signature**

```ts
export interface IndexedDb {
  readonly [TypeId]: typeof TypeId
  readonly indexedDB: globalThis.IDBFactory
  readonly IDBKeyRange: typeof globalThis.IDBKeyRange
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDb.ts#L25)

Since v4.0.0

# schemas

## AutoIncrement

Schema for auto-incremented IndexedDB keys, accepting integers from 1 through `2 ** 53`.

**When to use**

Use when you need to define numeric key-path fields for `IndexedDbTable`
definitions that use IndexedDB auto-increment keys.

**Details**

The schema accepts integer values from `1` through `2 ** 53`, matching the
range used for generated IndexedDB auto-increment keys.

**See**

- `IDBValidKey` for the broader IndexedDB key schema

**Signature**

```ts
declare const AutoIncrement: Schema.Int
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDb.ts#L77)

Since v4.0.0

## IDBValidKey

Schema for IndexedDB keys: strings, non-NaN numbers, valid dates, buffer sources, or arrays of those flat key values.

**Signature**

```ts
declare const IDBValidKey: Schema.Union<
  readonly [
    Schema.Union<readonly [Schema.String, Schema.Number, Schema.DateValid, Schema.declare<BufferSource, unknown>]>,
    Schema.$Array<
      Schema.Union<readonly [Schema.String, Schema.Number, Schema.DateValid, Schema.declare<BufferSource, unknown>]>
    >
  ]
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDb.ts#L57)

Since v4.0.0

# services

## IndexedDb

Service tag for browser IndexedDB primitives.

**Signature**

```ts
declare const IndexedDb: Context.Service<IndexedDb, IndexedDb>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDb.ts#L37)

Since v4.0.0
