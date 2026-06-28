---
title: Etag.ts
nav_order: 236
parent: "effect"
---

## Etag.ts overview

HTTP entity tag values and metadata-based generator layers.

ETags are validators for a specific representation of a resource. Servers put
them in `ETag` response headers so clients and intermediaries can revalidate
cached content with `If-None-Match`, or protect writes with preconditions such
as `If-Match`.

Since v4.0.0

---

## Exports Grouped by Category

- [converting](#converting)
  - [toString](#tostring)
- [layers](#layers)
  - [layer](#layer)
  - [layerWeak](#layerweak)
- [models](#models)
  - [Etag (type alias)](#etag-type-alias)
  - [Generator (class)](#generator-class)
  - [Strong (interface)](#strong-interface)
  - [Weak (interface)](#weak-interface)

---

# converting

## toString

Formats an `Etag` as an HTTP header value, including quotes and the `W/` prefix for weak tags.

**Signature**

```ts
declare const toString: (self: Etag) => string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Etag.ts#L62)

Since v4.0.0

# layers

## layer

Layer that provides a `Generator` which produces strong ETags from file size
and modification time metadata.

**When to use**

Use when you need the `Generator` service to produce strong ETags and file
size plus modification time reliably change for every byte-level change.

**Gotchas**

This layer marks metadata-derived tags as strong. If the underlying storage
can update file contents without changing the recorded size or modification
time, those tags can stop representing byte-for-byte identity.

**See**

- `layerWeak` for weak metadata-derived ETags when byte-for-byte identity is not required
- `Generator` for the service provided by this layer

**Signature**

```ts
declare const layer: Layer.Layer<Generator, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Etag.ts#L115)

Since v4.0.0

## layerWeak

Layer that provides a `Generator` which produces weak ETags from file size and modification time metadata.

**Signature**

```ts
declare const layerWeak: Layer.Layer<Generator, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Etag.ts#L132)

Since v4.0.0

# models

## Etag (type alias)

Represents an HTTP entity tag, either weak or strong.

**Signature**

```ts
type Etag = Weak | Strong
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Etag.ts#L24)

Since v4.0.0

## Generator (class)

Service for generating ETags from filesystem file information or Web `File`-like metadata.

**Signature**

```ts
declare class Generator
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Etag.ts#L77)

Since v4.0.0

## Strong (interface)

Strong HTTP entity tag.

**Details**

The `value` is the raw tag value without the surrounding quotes.

**Signature**

```ts
export interface Strong {
  readonly _tag: "Strong"
  readonly value: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Etag.ts#L51)

Since v4.0.0

## Weak (interface)

Weak HTTP entity tag.

**Details**

The `value` is the raw tag value without the surrounding quotes or `W/` prefix.

**Signature**

```ts
export interface Weak {
  readonly _tag: "Weak"
  readonly value: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Etag.ts#L36)

Since v4.0.0
