---
title: Hooks.ts
nav_order: 1
parent: "@effect/atom-react"
---

## Hooks.ts overview

React hooks for working with Effect atoms from components. The hooks read,
write, mount, refresh, and subscribe to atoms from `RegistryContext`, handle
`AsyncResult` atoms with React Suspense, and expose helpers for reading and
deriving `AtomRef` values.

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
  - [useAtomSet](#useatomset)
  - [useAtomSubscribe](#useatomsubscribe)
  - [useAtomSuspense](#useatomsuspense)
  - [useAtomValue](#useatomvalue)

---

# hooks

## useAtom

Subscribes to a writable atom and returns its current value together with a
setter for updating it.

**When to use**

Use when a React component needs both to render the current value of a
writable atom and update it from the same component.

**See**

- `useAtomValue` for subscribing to an atom without a setter
- `useAtomSet` for updating a writable atom without subscribing to its value

**Signature**

```ts
declare const useAtom: <R, W, const Mode extends "value" | "promise" | "promiseExit" = never>(
  atom: Atom.Writable<R, W>,
  options?: { readonly mode?: ([R] extends [AsyncResult.AsyncResult<any, any>] ? Mode : "value") | undefined }
) => readonly [
  value: R,
  write: "promise" extends Mode
    ? (value: W) => Promise<AsyncResult.AsyncResult.Success<R>>
    : "promiseExit" extends Mode
      ? (value: W) => Promise<Exit.Exit<AsyncResult.AsyncResult.Success<R>, AsyncResult.AsyncResult.Failure<R>>>
      : (value: W | ((value: R) => W)) => void
]
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/atom/react/src/Hooks.ts#L273)

Since v4.0.0

## useAtomInitialValues

Seeds initial atom values in the current React atom registry.

**When to use**

Use to seed atom values from a React component after the current registry
already exists.

**Gotchas**

Each atom is initialized at most once for a given registry by this hook, so
later calls for the same atom in that registry are ignored.

**Signature**

```ts
declare const useAtomInitialValues: (initialValues: Iterable<readonly [Atom.Atom<any>, any]>) => void
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/atom/react/src/Hooks.ts#L78)

Since v4.0.0

## useAtomMount

Mounts an atom in the current React registry for the lifetime of the
component.

**When to use**

Use to keep an atom mounted from a React component without reading, writing,
or refreshing it.

**Details**

The hook uses the current `RegistryContext` and releases the mount through
React effect cleanup when the component unmounts or when the registry or atom
dependency changes.

**See**

- `useAtomSet` for mounting a writable atom while returning a setter
- `useAtomRefresh` for mounting an atom while returning a refresh callback

**Signature**

```ts
declare const useAtomMount: <A>(atom: Atom.Atom<A>) => void
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/atom/react/src/Hooks.ts#L185)

Since v4.0.0

## useAtomRef

Subscribes to an atom ref and returns its latest value.

**When to use**

Use when a React component should render from an `AtomRef.ReadonlyRef`
directly instead of reading an atom through the current registry.

**Details**

The hook subscribes with `ref.subscribe`, triggers re-renders through React
state, and returns the current `ref.value`.

**See**

- `useAtomValue` for reading an `Atom` from the current registry
- `useAtomRefPropValue` for reading a property ref value

**Signature**

```ts
declare const useAtomRef: <A>(ref: AtomRef.ReadonlyRef<A>) => A
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/atom/react/src/Hooks.ts#L426)

Since v4.0.0

## useAtomRefProp

Returns a memoized atom ref for a property of another atom ref.

**When to use**

Use to derive an `AtomRef` for one property of an object-shaped atom ref.

**Details**

The hook memoizes `ref.prop(prop)` for the `[ref, prop]` dependency pair and
returns the property ref so callers can read, set, update, or subscribe to
that nested property.

**See**

- `useAtomRef` for subscribing to an atom ref value
- `useAtomRefPropValue` for subscribing directly to a property value

**Signature**

```ts
declare const useAtomRefProp: <A, K extends keyof A>(ref: AtomRef.AtomRef<A>, prop: K) => AtomRef.AtomRef<A[K]>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/atom/react/src/Hooks.ts#L451)

Since v4.0.0

## useAtomRefPropValue

Subscribes to a property ref derived from an atom ref and returns its current
value.

**When to use**

Use when a React component needs only the current value of one property from
an object-shaped `AtomRef`.

**Details**

The hook composes `useAtomRefProp(ref, prop)` with `useAtomRef`, so the
property ref is memoized for the `[ref, prop]` pair and then subscribed
through `ref.subscribe`.

**See**

- `useAtomRefProp` for returning the property ref directly
- `useAtomRef` for subscribing to a whole atom ref value

**Signature**

```ts
declare const useAtomRefPropValue: <A, K extends keyof A>(ref: AtomRef.AtomRef<A>, prop: K) => A[K]
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/atom/react/src/Hooks.ts#L475)

Since v4.0.0

## useAtomRefresh

Mounts an atom and returns a callback that refreshes it in the current React
registry.

**When to use**

Use to expose a React callback that requests a refresh for an atom without
reading or writing its value.

**Details**

The hook uses the current `RegistryContext`, mounts the atom for the
component lifetime, and returns a callback that calls `registry.refresh`.

**See**

- `useAtomMount` for mounting an atom without returning a refresh callback

**Signature**

```ts
declare const useAtomRefresh: <A>(atom: Atom.Atom<A>) => () => void
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/atom/react/src/Hooks.ts#L250)

Since v4.0.0

## useAtomSet

Mounts a writable atom and returns a setter without subscribing to its value.

**When to use**

Use when a React component needs to update a writable atom without rendering
from that atom's value.

**Details**

The hook mounts the atom and returns a setter. In value mode the setter
accepts a write value or updater function; for `AsyncResult` atoms, `promise`
and `promiseExit` modes return a promise for the success value or full `Exit`.

**See**

- `useAtom` for reading and updating the same writable atom

**Signature**

```ts
declare const useAtomSet: <R, W, Mode extends "value" | "promise" | "promiseExit" = never>(
  atom: Atom.Writable<R, W>,
  options?: { readonly mode?: ([R] extends [AsyncResult.AsyncResult<any, any>] ? Mode : "value") | undefined }
) => "promise" extends Mode
  ? (value: W) => Promise<AsyncResult.AsyncResult.Success<R>>
  : "promiseExit" extends Mode
    ? (value: W) => Promise<Exit.Exit<AsyncResult.AsyncResult.Success<R>, AsyncResult.AsyncResult.Failure<R>>>
    : (value: W | ((value: R) => W)) => void
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/atom/react/src/Hooks.ts#L209)

Since v4.0.0

## useAtomSubscribe

Subscribes a callback to an atom in the current React registry for the
component lifetime.

**When to use**

Use when a React component needs to run a callback for atom changes without
reading the atom value during render.

**Details**

The subscription is installed in a React effect and cleaned up on unmount or
dependency change. When `options.immediate` is enabled, the callback receives
the current value when the effect subscribes.

**See**

- `useAtomValue` for reading an atom value during render instead of running a callback

**Signature**

```ts
declare const useAtomSubscribe: <A>(
  atom: Atom.Atom<A>,
  f: (_: A) => void,
  options?: { readonly immediate?: boolean }
) => void
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/atom/react/src/Hooks.ts#L395)

Since v4.0.0

## useAtomSuspense

Reads an `AsyncResult` atom through React Suspense, suspending while the
result is initial or configured as waiting.

**When to use**

Use when a React component should render only after an `AsyncResult` atom has
left its initial state, with loading delegated to a Suspense boundary.

**Details**

`suspendOnWaiting` defaults to `false`. When `includeFailure` is `true`, a
failure result is returned instead of being thrown.

**Gotchas**

Without `includeFailure`, failure results are thrown with
`Cause.squash(result.cause)`, so callers need an error boundary for failures.

**See**

- `useAtomValue` for reading the raw `AsyncResult` value without Suspense

**Signature**

```ts
declare const useAtomSuspense: <A, E, const IncludeFailure extends boolean = false>(
  atom: Atom.Atom<AsyncResult.AsyncResult<A, E>>,
  options?: { readonly suspendOnWaiting?: boolean | undefined; readonly includeFailure?: IncludeFailure | undefined }
) => AsyncResult.Success<A, E> | (IncludeFailure extends true ? AsyncResult.Failure<A, E> : never)
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/atom/react/src/Hooks.ts#L360)

Since v4.0.0

## useAtomValue

Subscribes to an atom in the current React registry and returns its current
value, optionally mapped through a selector.

**When to use**

Use when a React component needs to render from an atom value without also
returning a setter.

**Details**

When a selector is provided, the hook maps the atom before subscribing so the
component reads the selected value from the current `RegistryContext`.

**See**

- `useAtom` for reading and updating a writable atom from one component
- `useAtomRef` for reading an `AtomRef` directly

**Signature**

```ts
declare const useAtomValue: { <A>(atom: Atom.Atom<A>): A; <A, B>(atom: Atom.Atom<A>, f: (_: A) => B): B }
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/atom/react/src/Hooks.ts#L113)

Since v4.0.0
