---
title: AtomRef.ts
nav_order: 305
parent: "effect"
---

## AtomRef.ts overview

Mutable reactive references for local, in-memory state.

`AtomRef` provides small observable state cells that can be read, updated,
mapped, and subscribed to without going through an `AtomRegistry`. Mutable
refs can also create refs for nested properties. The module also provides a
collection helper that stores item refs and notifies subscribers when items are
inserted, removed, or changed.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [collection](#collection)
  - [make](#make)
- [models](#models)
  - [AtomRef (interface)](#atomref-interface)
  - [Collection (interface)](#collection-interface)
  - [ReadonlyRef (interface)](#readonlyref-interface)
- [type IDs](#type-ids)
  - [TypeId](#typeid)
  - [TypeId (type alias)](#typeid-type-alias)

---

# constructors

## collection

Creates a reactive collection from an iterable of initial item values.

**Details**

Each item is wrapped in an `AtomRef`, and changes to item refs notify the
collection subscribers.

**Signature**

```ts
declare const collection: <A>(items: Iterable<A>) => Collection<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AtomRef.ts#L105)

Since v4.0.0

## make

Creates a mutable reactive reference initialized with the supplied value.

**Signature**

```ts
declare const make: <A>(value: A) => AtomRef<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AtomRef.ts#L92)

Since v4.0.0

# models

## AtomRef (interface)

A mutable reactive reference.

**Details**

It supports replacing the whole value, updating it from the current value, and
creating mutable references to nested properties.

**Signature**

```ts
export interface AtomRef<A> extends ReadonlyRef<A> {
  readonly prop: <K extends keyof A>(prop: K) => AtomRef<A[K]>
  readonly set: (value: A) => AtomRef<A>
  readonly update: (f: (value: A) => A) => AtomRef<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AtomRef.ts#L62)

Since v4.0.0

## Collection (interface)

A reactive collection of mutable item references.

**Details**

The collection can push, insert, and remove item refs, and `toArray` returns the
current raw item values.

**Signature**

```ts
export interface Collection<A> extends ReadonlyRef<ReadonlyArray<AtomRef<A>>> {
  readonly push: (item: A) => Collection<A>
  readonly insertAt: (index: number, item: A) => Collection<A>
  readonly remove: (ref: AtomRef<A>) => Collection<A>
  readonly toArray: () => Array<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AtomRef.ts#L79)

Since v4.0.0

## ReadonlyRef (interface)

A read-only reactive reference.

**Details**

It exposes a stable key, the current value, subscriptions to value changes, and
`map` for creating derived read-only references. Equality and hashing are based
on the current value.

**Signature**

```ts
export interface ReadonlyRef<A> extends Equal.Equal {
  readonly [TypeId]: TypeId
  readonly key: string
  readonly value: A
  readonly subscribe: (f: (a: A) => void) => () => void
  readonly map: <B>(f: (a: A) => B) => ReadonlyRef<B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AtomRef.ts#L43)

Since v4.0.0

# type IDs

## TypeId

The runtime type id used to identify `AtomRef` values.

**Signature**

```ts
declare const TypeId: "~effect/reactivity/AtomRef"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AtomRef.ts#L29)

Since v4.0.0

## TypeId (type alias)

The literal type used to identify `AtomRef` values.

**Signature**

```ts
type TypeId = "~effect/reactivity/AtomRef"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AtomRef.ts#L21)

Since v4.0.0
