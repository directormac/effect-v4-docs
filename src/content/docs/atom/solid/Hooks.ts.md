---
title: Hooks.ts
nav_order: 1
parent: "@effect/atom-solid"
---

## Hooks.ts overview

Solid hooks for using Effect Atoms from components and computations. The
hooks read and write atoms through the current `RegistryContext`, mount atoms
for cleanup, subscribe callbacks, seed initial values, expose `AsyncResult`
atoms as Solid resources, and read values from `AtomRef` references.

Since v4.0.0

---

## Exports Grouped by Category

- [hooks](#hooks)
  - [useAtom](#useatom)
  - [useAtomInitialValues](#useatominitialvalues)
  - [useAtomMount](#useatommount)
  - [useAtomRef](#useatomref)
  - [useAtomRefProp](#useatomrefprop)
  - [useAtomRefPropValue](#useatomrefpropvalue)
  - [useAtomRefresh](#useatomrefresh)
  - [useAtomResource](#useatomresource)
  - [useAtomSet](#useatomset)
  - [useAtomSubscribe](#useatomsubscribe)
  - [useAtomValue](#useatomvalue)

---

# hooks

## useAtom

Returns a Solid accessor for a writable atom together with a setter for
updating it.

**When to use**

Use when a Solid component or computation needs both a reactive accessor for
a writable atom and a write function for that same atom.

**Details**

The setter accepts either a write value or an updater function. For
`AsyncResult` atoms, `promise` and `promiseExit` modes return promises for the
success value or full `Exit`.

**See**

- `useAtomValue` for subscribing to an atom without a setter
- `useAtomSet` for updating a writable atom without subscribing to its value

**Signature**

```ts
declare const useAtom: <R, W, const Mode extends "value" | "promise" | "promiseExit" = never>(
  atom: () => Atom.Writable<R, W>,
  options?: { readonly mode?: ([R] extends [AsyncResult.AsyncResult<any, any>] ? Mode : "value") | undefined }
) => readonly [
  value: Accessor<R>,
  write: "promise" extends Mode
    ? (value: W) => Promise<AsyncResult.AsyncResult.Success<R>>
    : "promiseExit" extends Mode
      ? (value: W) => Promise<Exit.Exit<AsyncResult.AsyncResult.Success<R>, AsyncResult.AsyncResult.Failure<R>>>
      : (value: W | ((value: R) => W)) => void
]
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/atom/solid/src/Hooks.ts#L209)

Since v4.0.0

## useAtomInitialValues

Seeds initial atom values in the current Solid atom registry.

**When to use**

Use to seed atom values from a Solid component after the current registry
already exists.

**Details**

For each atom in the current registry, this hook applies the first value
supplied through the hook. Later calls for the same atom in that registry are
ignored.

**Signature**

```ts
declare const useAtomInitialValues: (initialValues: Iterable<readonly [Atom.Atom<any>, any]>) => void
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/atom/solid/src/Hooks.ts#L39)

Since v4.0.0

## useAtomMount

Mounts an atom in the current Solid registry for the lifetime of the current
Solid computation.

**When to use**

Use to keep an atom mounted from a Solid owner without reading, writing, or
refreshing it.

**Details**

The hook uses the current `RegistryContext`, mounts inside a Solid
computation, and releases the mount through Solid cleanup when the
computation changes or the owner is disposed.

**See**

- `useAtomSet` for mounting a writable atom while returning a setter
- `useAtomRefresh` for mounting an atom while returning a refresh callback

**Signature**

```ts
declare const useAtomMount: <A>(atom: () => Atom.Atom<A>) => void
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/atom/solid/src/Hooks.ts#L142)

Since v4.0.0

## useAtomRef

Subscribes to an atom ref and returns its value as a Solid accessor.

**When to use**

Use when a Solid component or computation should render from an
`AtomRef.ReadonlyRef` directly instead of reading an atom through the current
registry.

**Details**

The hook accepts a thunk for the ref, reads `ref().value`, subscribes with
`ref.subscribe`, and releases the subscription through Solid cleanup when
the selected ref changes or the owner is disposed.

**See**

- `useAtomValue` for reading an `Atom` from the current registry
- `useAtomRefPropValue` for reading a property ref value

**Signature**

```ts
declare const useAtomRef: <A>(ref: () => AtomRef.ReadonlyRef<A>) => Accessor<A>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/atom/solid/src/Hooks.ts#L294)

Since v4.0.0

## useAtomRefProp

Returns a Solid accessor for a property ref derived from an atom ref.

**When to use**

Use to derive an `AtomRef` for one property of an object-shaped atom ref in a
Solid computation.

**Details**

The returned accessor memoizes `ref().prop(prop)`, updating when the source
ref thunk produces a different ref.

**Gotchas**

The `prop` argument is captured as a plain value. Recreate the hook call when
the property key should change.

**See**

- `useAtomRef` for subscribing to an atom ref value
- `useAtomRefPropValue` for subscribing directly to a property value

**Signature**

```ts
declare const useAtomRefProp: <A, K extends keyof A>(
  ref: () => AtomRef.AtomRef<A>,
  prop: K
) => Accessor<AtomRef.AtomRef<A[K]>>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/atom/solid/src/Hooks.ts#L328)

Since v4.0.0

## useAtomRefPropValue

Returns a Solid accessor for the value of a property ref derived from an atom
ref.

**When to use**

Use when a Solid component or computation needs the value of one property
from an object-shaped `AtomRef` without keeping the intermediate property ref.

**Details**

The hook composes `useAtomRefProp(ref, prop)` with `useAtomRef`, returning a
Solid accessor for the selected property value.

**Gotchas**

The `prop` argument is captured as a plain value. Recreate the hook call when
the property key should change.

**See**

- `useAtomRef` for subscribing to a whole atom ref value
- `useAtomRefProp` for returning the property ref directly

**Signature**

```ts
declare const useAtomRefPropValue: <A, K extends keyof A>(ref: () => AtomRef.AtomRef<A>, prop: K) => Accessor<A[K]>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/atom/solid/src/Hooks.ts#L358)

Since v4.0.0

## useAtomRefresh

Mounts an atom and returns a callback that refreshes the current atom.

**Signature**

```ts
declare const useAtomRefresh: <A>(atom: () => Atom.Atom<A>) => () => void
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/atom/solid/src/Hooks.ts#L181)

Since v4.0.0

## useAtomResource

Converts an `AsyncResult` atom into a Solid resource.

**Signature**

```ts
declare const useAtomResource: <A, E>(
  atom: () => Atom.Atom<AsyncResult.AsyncResult<A, E>>,
  options?: ResourceOptions<A> & { readonly suspendOnWaiting?: boolean | undefined }
) => ResourceReturn<A, void>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/atom/solid/src/Hooks.ts#L254)

Since v4.0.0

## useAtomSet

Returns a setter for a writable atom without subscribing to its value.

**Signature**

```ts
declare const useAtomSet: <R, W, Mode extends "value" | "promise" | "promiseExit" = never>(
  atom: () => Atom.Writable<R, W>,
  options?: { readonly mode?: ([R] extends [AsyncResult.AsyncResult<any, any>] ? Mode : "value") | undefined }
) => "promise" extends Mode
  ? (value: W) => Promise<AsyncResult.AsyncResult.Success<R>>
  : "promiseExit" extends Mode
    ? (value: W) => Promise<Exit.Exit<AsyncResult.AsyncResult.Success<R>, AsyncResult.AsyncResult.Failure<R>>>
    : (value: W | ((value: R) => W)) => void
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/atom/solid/src/Hooks.ts#L153)

Since v4.0.0

## useAtomSubscribe

Subscribes a callback to an atom in the current Solid registry.

**Signature**

```ts
declare const useAtomSubscribe: <A>(
  atom: () => Atom.Atom<A>,
  f: (_: A) => void,
  options?: { readonly immediate?: boolean }
) => void
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/atom/solid/src/Hooks.ts#L237)

Since v4.0.0

## useAtomValue

Subscribes to an atom in the current Solid registry and returns its value as
a Solid accessor.

**Signature**

```ts
declare const useAtomValue: {
  <A>(atom: () => Atom.Atom<A>): Accessor<A>
  <A, B>(atom: () => Atom.Atom<A>, f: (_: A) => B): Accessor<B>
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/atom/solid/src/Hooks.ts#L61)

Since v4.0.0
