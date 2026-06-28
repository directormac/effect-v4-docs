---
title: Hydration.ts
nav_order: 308
parent: "effect"
---

## Hydration.ts overview

Saves and restores serializable atom state.

`dehydrate` reads atoms marked with `Atom.serializable` from an
`AtomRegistry` and returns encoded entries keyed by their serialization keys.
`hydrate` preloads those entries into another registry before the atoms are
read. Initial `AsyncResult` values can be ignored, encoded as values, or
represented by promises that update the target registry once the result is no
longer initial.

Since v4.0.0

---

## Exports Grouped by Category

- [dehydration](#dehydration)
  - [dehydrate](#dehydrate)
  - [toValues](#tovalues)
- [hydration](#hydration)
  - [hydrate](#hydrate)
- [models](#models)
  - [DehydratedAtom (interface)](#dehydratedatom-interface)
  - [DehydratedAtomValue (interface)](#dehydratedatomvalue-interface)

---

# dehydration

## dehydrate

Encodes the serializable atoms currently stored in a registry into dehydrated
state.

**Details**

Only atoms marked with `Atom.serializable` are included. `encodeInitialAs`
controls whether `AsyncResult.Initial` values are ignored, encoded as values, or
represented by promises that resolve when the atom leaves the initial state.

**Signature**

```ts
declare const dehydrate: (
  registry: AtomRegistry.AtomRegistry,
  options?: { readonly encodeInitialAs?: "ignore" | "promise" | "value-only" | undefined }
) => Array<DehydratedAtom>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Hydration.ts#L59)

Since v4.0.0

## toValues

Returns dehydrated state entries as `DehydratedAtomValue` records.

**Signature**

```ts
declare const toValues: (state: ReadonlyArray<DehydratedAtom>) => Array<DehydratedAtomValue>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Hydration.ts#L109)

Since v4.0.0

# hydration

## hydrate

Applies dehydrated atom state to a registry.

**When to use**

Use to preload serialized atom values into a target registry before those
atoms are read.

**Details**

Encoded values are preloaded by serialization key. Entries with a
`resultPromise` update the matching registry node, or preload the resolved value,
when the promise resolves.

**Signature**

```ts
declare const hydrate: (registry: AtomRegistry.AtomRegistry, dehydratedState: Iterable<DehydratedAtom>) => void
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Hydration.ts#L128)

Since v4.0.0

# models

## DehydratedAtom (interface)

Marker interface for entries in a dehydrated atom registry state.

**Signature**

```ts
export interface DehydratedAtom {
  readonly "~effect/reactivity/DehydratedAtom": true
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Hydration.ts#L23)

Since v4.0.0

## DehydratedAtomValue (interface)

A dehydrated serializable atom value.

**Details**

It stores the atom serialization key, encoded value, dehydration timestamp, and
an optional promise used when an `AsyncResult.Initial` value is encoded as a
future non-initial value.

**Signature**

```ts
export interface DehydratedAtomValue extends DehydratedAtom {
  readonly key: string
  readonly value: unknown
  readonly dehydratedAt: number
  readonly resultPromise?: Promise<unknown> | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Hydration.ts#L39)

Since v4.0.0
