---
title: AtomRegistry.ts
nav_order: 306
parent: "effect"
---

## AtomRegistry.ts overview

Stores and runs atoms for one reactive runtime.

An `AtomRegistry` evaluates atoms, caches their current values, tracks
dependencies, applies writes and refreshes, manages subscriptions, and
disposes unused nodes. Each registry is independent, so the same atom can hold
different values in different registries. Serializable atom values can also be
preloaded before the first read.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [make](#make)
- [converting](#converting)
  - [getResult](#getresult)
  - [mount](#mount)
  - [toStream](#tostream)
  - [toStreamResult](#tostreamresult)
- [guards](#guards)
  - [isAtomRegistry](#isatomregistry)
- [layers](#layers)
  - [layer](#layer)
  - [layerOptions](#layeroptions)
- [models](#models)
  - [AtomRegistry (interface)](#atomregistry-interface)
  - [Node (interface)](#node-interface)
- [services](#services)
  - [AtomRegistry](#atomregistry)
- [type IDs](#type-ids)
  - [TypeId](#typeid)
  - [TypeId (type alias)](#typeid-type-alias)

---

# constructors

## make

Creates an `AtomRegistry`.

**Details**

Options can preload initial atom values, provide a custom task scheduler,
configure timeout bucket resolution, and set a default idle time-to-live for
unused atoms.

**Signature**

```ts
declare const make: (
  options?:
    | {
        readonly initialValues?: Iterable<readonly [Atom.Atom<any>, any]> | undefined
        readonly scheduleTask?: ((f: () => void) => () => void) | undefined
        readonly timeoutResolution?: number | undefined
        readonly defaultIdleTTL?: number | undefined
      }
    | undefined
) => AtomRegistry
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AtomRegistry.ts#L117)

Since v4.0.0

# converting

## getResult

Reads an `AsyncResult` atom from this registry as an effect.

**Details**

The effect waits for the result to leave `Initial`, and also waits through
waiting results when `suspendOnWaiting` is enabled.

**Signature**

```ts
declare const getResult: {
  <A, E>(
    atom: Atom.Atom<Result.AsyncResult<A, E>>,
    options?: { readonly suspendOnWaiting?: boolean | undefined }
  ): (self: AtomRegistry) => Effect.Effect<A, E>
  <A, E>(
    self: AtomRegistry,
    atom: Atom.Atom<Result.AsyncResult<A, E>>,
    options?: { readonly suspendOnWaiting?: boolean | undefined }
  ): Effect.Effect<A, E>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AtomRegistry.ts#L254)

Since v4.0.0

## mount

Mounts an atom in this registry for the lifetime of the current scope.

**Details**

The atom is subscribed with a no-op listener and the subscription is released
when the scope finalizer runs.

**Signature**

```ts
declare const mount: {
  <A>(atom: Atom.Atom<A>): (self: AtomRegistry) => Effect.Effect<void, never, Scope.Scope>
  <A>(self: AtomRegistry, atom: Atom.Atom<A>): Effect.Effect<void, never, Scope.Scope>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AtomRegistry.ts#L294)

Since v4.0.0

## toStream

Converts an atom in this registry into a stream.

**Details**

The stream emits the current value immediately, emits subsequent changes, and
unsubscribes from the registry when the stream scope closes.

**Signature**

```ts
declare const toStream: {
  <A>(atom: Atom.Atom<A>): (self: AtomRegistry) => Stream.Stream<A>
  <A>(self: AtomRegistry, atom: Atom.Atom<A>): Stream.Stream<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AtomRegistry.ts#L198)

Since v4.0.0

## toStreamResult

Converts an `AsyncResult` atom in this registry into a stream of successful
values.

**Details**

Initial results are skipped, failures fail the stream with their cause, and
duplicate stream values are dropped with `Stream.changes`.

**Signature**

```ts
declare const toStreamResult: {
  <A, E>(atom: Atom.Atom<Result.AsyncResult<A, E>>): (self: AtomRegistry) => Stream.Stream<A, E>
  <A, E>(self: AtomRegistry, atom: Atom.Atom<Result.AsyncResult<A, E>>): Stream.Stream<A, E>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AtomRegistry.ts#L228)

Since v4.0.0

# guards

## isAtomRegistry

Returns `true` when the value has the `AtomRegistry` type id.

**Signature**

```ts
declare const isAtomRegistry: (u: unknown) => u is AtomRegistry
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AtomRegistry.ts#L50)

Since v4.0.0

# layers

## layer

The default layer that provides a fresh `AtomRegistry`.

**Signature**

```ts
declare const layer: Layer.Layer<AtomRegistry, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AtomRegistry.ts#L181)

Since v4.0.0

## layerOptions

Creates a layer that provides an `AtomRegistry` configured with the supplied
options.

**Details**

The registry is disposed when the layer scope is finalized.

**Signature**

```ts
declare const layerOptions: (options?: {
  readonly initialValues?: Iterable<readonly [Atom.Atom<any>, any]> | undefined
  readonly scheduleTask?: ((f: () => void) => () => void) | undefined
  readonly timeoutResolution?: number | undefined
  readonly defaultIdleTTL?: number | undefined
}) => Layer.Layer<AtomRegistry>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AtomRegistry.ts#L156)

Since v4.0.0

# models

## AtomRegistry (interface)

The runtime registry that stores atom nodes and coordinates reads, writes,
refreshes, subscriptions, and disposal.

**Details**

It also manages scheduler configuration, serializable preloaded values, and node
addition/removal callbacks.

**Signature**

```ts
export interface AtomRegistry {
  readonly [TypeId]: TypeId
  readonly scheduler: Scheduler
  readonly schedulerAsync: Scheduler
  readonly getNodes: () => ReadonlyMap<Atom.Atom<any> | string, Node<any>>
  readonly get: <A>(atom: Atom.Atom<A>) => A
  readonly mount: <A>(atom: Atom.Atom<A>) => () => void
  readonly refresh: <A>(atom: Atom.Atom<A>) => void
  readonly set: <R, W>(atom: Atom.Writable<R, W>, value: W) => void
  readonly setSerializable: (key: string, encoded: unknown) => void
  readonly modify: <R, W, A>(atom: Atom.Writable<R, W>, f: (_: R) => [returnValue: A, nextValue: W]) => A
  readonly update: <R, W>(atom: Atom.Writable<R, W>, f: (_: R) => W) => void
  readonly subscribe: <A>(
    atom: Atom.Atom<A>,
    f: (_: A) => void,
    options?: {
      readonly immediate?: boolean
    }
  ) => () => void
  readonly reset: () => void
  readonly dispose: () => void
  onNodeAdded?: ((node: Node<any>) => void) | undefined
  onNodeRemoved?: ((node: Node<any>) => void) | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AtomRegistry.ts#L64)

Since v4.0.0

## Node (interface)

A registry node for a single atom.

**Details**

Nodes expose the current value, parent and child dependency links, listener set,
and current lifecycle state.

**Signature**

```ts
export interface Node<A> {
  readonly atom: Atom.Atom<A>
  readonly value: () => A
  parents: Array<Node<any>>
  children: Array<Node<any>>
  listeners: Set<() => void>
  currentState(): "uninitialized" | "stale" | "valid" | "removed"
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AtomRegistry.ts#L96)

Since v4.0.0

# services

## AtomRegistry

Service tag for the active atom runtime cache.

**When to use**

Use to access or provide the registry that stores atom values,
dependencies, subscriptions, and disposal state for a reactive lifetime.

**Signature**

```ts
declare const AtomRegistry: Context.Service<AtomRegistry, AtomRegistry>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AtomRegistry.ts#L143)

Since v4.0.0

# type IDs

## TypeId

The runtime type id used to identify `AtomRegistry` services and values.

**Signature**

```ts
declare const TypeId: "~effect/reactivity/AtomRegistry"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AtomRegistry.ts#L42)

Since v4.0.0

## TypeId (type alias)

The literal type used to identify `AtomRegistry` services and values.

**Signature**

```ts
type TypeId = "~effect/reactivity/AtomRegistry"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AtomRegistry.ts#L34)

Since v4.0.0
