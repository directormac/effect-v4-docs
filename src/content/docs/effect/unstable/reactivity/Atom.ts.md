---
title: Atom.ts
nav_order: 303
parent: "effect"
---

## Atom.ts overview

Reactive state primitives for values managed by an `AtomRegistry`.

An `Atom` describes how to produce or update one piece of reactive state. The
registry runs atom reads, remembers current values, tracks dependencies
between atoms, starts effects and streams, and cleans up atoms that are no
longer used. This module includes the atom constructors and update helpers
used for cached values, effect-backed values, streams, browser state, stored
values, and server-rendered values.

Since v4.0.0

---

## Exports Grouped by Category

- [Focus](#focus)
  - [makeRefreshOnSignal](#makerefreshonsignal)
  - [refreshOnWindowFocus](#refreshonwindowfocus)
  - [windowFocusSignal](#windowfocussignal)
- [KeyValueStore](#keyvaluestore)
  - [kvs](#kvs)
- [Optimistic](#optimistic)
  - [optimistic](#optimistic-1)
  - [optimisticFn](#optimisticfn)
- [Serializable](#serializable)
  - [Serializable (interface)](#serializable-interface)
  - [isSerializable](#isserializable)
- [ServerValue](#servervalue)
  - [getServerValue](#getservervalue)
  - [withServerValue](#withservervalue)
  - [withServerValueInitial](#withservervalueinitial)
- [batching](#batching)
  - [batch](#batch)
- [combinators](#combinators)
  - [autoDispose](#autodispose)
  - [debounce](#debounce)
  - [initialValue](#initialvalue)
  - [keepAlive](#keepalive)
  - [map](#map)
  - [mapResult](#mapresult)
  - [serializable](#serializable-1)
  - [setIdleTTL](#setidlettl)
  - [setLazy](#setlazy)
  - [swr](#swr)
  - [transform](#transform)
  - [withFallback](#withfallback)
  - [withLabel](#withlabel)
  - [withRefresh](#withrefresh)
- [constructors](#constructors)
  - [context](#context)
  - [family](#family)
  - [fn](#fn)
  - [fnSync](#fnsync)
  - [make](#make)
  - [pull](#pull)
  - [readable](#readable)
  - [subscriptionRef](#subscriptionref)
  - [writable](#writable)
- [context](#context-1)
  - [AtomContext (interface)](#atomcontext-interface)
  - [WriteContext (interface)](#writecontext-interface)
  - [defaultMemoMap](#defaultmemomap)
  - [runtime](#runtime)
- [converting](#converting)
  - [get](#get)
  - [getResult](#getresult)
  - [modify](#modify)
  - [mount](#mount)
  - [refresh](#refresh)
  - [set](#set)
  - [toStream](#tostream)
  - [toStreamResult](#tostreamresult)
  - [update](#update)
- [guards](#guards)
  - [isAtom](#isatom)
- [models](#models)
  - [Atom (interface)](#atom-interface)
  - [AtomResultFn (interface)](#atomresultfn-interface)
  - [AtomRuntime (interface)](#atomruntime-interface)
  - [FnContext (interface)](#fncontext-interface)
  - [PullResult (type alias)](#pullresult-type-alias)
  - [RuntimeFactory (interface)](#runtimefactory-interface)
  - [Writable (interface)](#writable-interface)
- [reactivity](#reactivity)
  - [withReactivity](#withreactivity)
- [refinements](#refinements)
  - [isWritable](#iswritable)
- [search params](#search-params)
  - [searchParam](#searchparam)
- [symbols](#symbols)
  - [Interrupt](#interrupt)
  - [Interrupt (type alias)](#interrupt-type-alias)
  - [Reset](#reset)
  - [Reset (type alias)](#reset-type-alias)
- [type IDs](#type-ids)
  - [SerializableTypeId](#serializabletypeid)
  - [SerializableTypeId (type alias)](#serializabletypeid-type-alias)
  - [ServerValueTypeId](#servervaluetypeid)
  - [TypeId](#typeid)
  - [TypeId (type alias)](#typeid-type-alias)
  - [WritableTypeId](#writabletypeid)
  - [WritableTypeId (type alias)](#writabletypeid-type-alias)
- [utility types](#utility-types)
  - [Failure (type alias)](#failure-type-alias)
  - [PullSuccess (type alias)](#pullsuccess-type-alias)
  - [Success (type alias)](#success-type-alias)
  - [Type (type alias)](#type-type-alias)
  - [WithoutSerializable (type alias)](#withoutserializable-type-alias)

---

# Focus

## makeRefreshOnSignal

Creates a combinator that refreshes an atom whenever the supplied signal atom
changes.

**Details**

The derived atom also subscribes to the source atom so normal source updates are
forwarded to its own value.

**Signature**

```ts
declare const makeRefreshOnSignal: <_>(signal: Atom<_>) => <A extends Atom<any>>(self: A) => WithoutSerializable<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L2068)

Since v4.0.0

## refreshOnWindowFocus

Refreshes an atom whenever `windowFocusSignal` changes.

**Details**

This helper is browser-only because `windowFocusSignal` depends on `window` and
`document.visibilityState`.

**Signature**

```ts
declare const refreshOnWindowFocus: <A extends Atom<any>>(self: A) => WithoutSerializable<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L2087)

Since v4.0.0

## windowFocusSignal

Creates a browser-only signal atom that increments when the document becomes visible.

**Details**

It listens for `visibilitychange` events on `window` and removes the listener
when the atom is disposed.

**Signature**

```ts
declare const windowFocusSignal: Atom<number>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L2042)

Since v4.0.0

# KeyValueStore

## kvs

Creates a writable atom backed by a `KeyValueStore` entry.

**Details**

Values are encoded and decoded with the supplied schema. In sync mode the atom
exposes the decoded value and writes the default value when the key is missing;
in async mode it exposes an `AsyncResult` of the decoded value.

**Signature**

```ts
declare const kvs: <S extends Schema.Codec<any, any>, const Mode extends "sync" | "async" = never>(options: {
  readonly runtime: AtomRuntime<KeyValueStore.KeyValueStore, any>
  readonly key: string
  readonly schema: S
  readonly defaultValue: LazyArg<S["Type"]>
  readonly mode?: Mode | undefined
}) => Writable<"async" extends Mode ? AsyncResult.AsyncResult<S["Type"]> : S["Type"], S["Type"]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L2107)

Since v4.0.0

# Optimistic

## optimistic

Wraps an atom in a writable optimistic atom.

**Details**

Writes accept transition atoms containing `AsyncResult` values. Waiting
successes are shown optimistically while transitions run; when successful
transitions finish, the source atom is refreshed, and failures roll the value
back to the latest source value.

**Signature**

```ts
declare const optimistic: <A>(self: Atom<A>) => Writable<A, Atom<AsyncResult.AsyncResult<A, unknown>>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L1855)

Since v4.0.0

## optimisticFn

Creates an `AtomResultFn` that applies an optimistic update before running the
underlying mutation.

**Details**

The reducer computes the provisional value from the current value and mutation
input. The wrapped function result then completes the transition or updates the
optimistic value through the provided setter callback.

**Signature**

```ts
declare const optimisticFn: {
  <A, W, XA, XE, OW = void>(options: {
    readonly reducer: (current: NoInfer<A>, update: OW) => NoInfer<W>
    readonly fn: AtomResultFn<OW, XA, XE> | ((set: (result: NoInfer<W>) => void) => AtomResultFn<OW, XA, XE>)
  }): (self: Writable<A, Atom<AsyncResult.AsyncResult<W, unknown>>>) => AtomResultFn<OW, XA, XE>
  <A, W, XA, XE, OW = void>(
    self: Writable<A, Atom<AsyncResult.AsyncResult<W, unknown>>>,
    options: {
      readonly reducer: (current: NoInfer<A>, update: OW) => NoInfer<W>
      readonly fn: AtomResultFn<OW, XA, XE> | ((set: (result: NoInfer<W>) => void) => AtomResultFn<OW, XA, XE>)
    }
  ): AtomResultFn<OW, XA, XE>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L1958)

Since v4.0.0

# Serializable

## Serializable (interface)

Serialization metadata attached to an atom.

**Details**

The key identifies the atom in dehydrated state, and the encode/decode
functions convert between the atom value and the schema encoded value.

**Signature**

```ts
export interface Serializable<S extends Schema.Constraint> {
  readonly [SerializableTypeId]: {
    readonly key: string
    readonly encode: (value: S["Type"]) => S["Encoded"]
    readonly decode: (value: S["Encoded"]) => S["Type"]
  }
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L2412)

Since v4.0.0

## isSerializable

Returns `true` when an atom carries `Serializable` metadata.

**Signature**

```ts
declare const isSerializable: (self: Atom<any>) => self is Atom<any> & Serializable<any>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L2426)

Since v4.0.0

# ServerValue

## getServerValue

Reads an atom from a registry, using its server-side read override when one is
present.

**Details**

Nested reads performed by the override are resolved against the same registry.

**Signature**

```ts
declare const getServerValue: {
  (registry: Registry.AtomRegistry): <A>(self: Atom<A>) => A
  <A>(self: Atom<A>, registry: Registry.AtomRegistry): A
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L2511)

Since v4.0.0

## withServerValue

Sets the value of an Atom when read on the server.

**Signature**

```ts
declare const withServerValue: {
  <A extends Atom<any>>(read: (get: <A>(atom: Atom<A>) => A) => Type<A>): (self: A) => A
  <A extends Atom<any>>(self: A, read: (get: <A>(atom: Atom<A>) => A) => Type<A>): A
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L2478)

Since v4.0.0

## withServerValueInitial

Sets an `AsyncResult` atom's server-side value to
`AsyncResult.initial(true)`.

**Signature**

```ts
declare const withServerValueInitial: <A extends Atom<AsyncResult.AsyncResult<any, any>>>(self: A) => A
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L2497)

Since v4.0.0

# batching

## batch

Runs synchronous atom updates as a batch.

**Details**

Stale nodes are rebuilt and listeners are notified after the callback completes,
so dependent updates observe the final batched state.

**Signature**

```ts
declare const batch: (f: () => void) => void
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L2025)

Since v4.0.0

# combinators

## autoDispose

Allows a reactive value to be disposed of when it is not in use.

**Details**

Atoms have this behavior by default, so use this to undo `keepAlive` on a copied atom.

**Signature**

```ts
declare const autoDispose: <A extends Atom<any>>(self: A) => A
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L1482)

Since v4.0.0

## debounce

Creates an atom that publishes source changes only after the source has stopped
changing for the specified duration.

**Details**

The current source value is used immediately, and any pending debounce timer is
cleared when the derived atom is disposed.

**Signature**

```ts
declare const debounce: {
  (duration: Duration.Input): <A extends Atom<any>>(self: A) => WithoutSerializable<A>
  <A extends Atom<any>>(self: A, duration: Duration.Input): WithoutSerializable<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L1693)

Since v4.0.0

## initialValue

Pairs an atom with an initial value for registry initialization.

**When to use**

Use to preload an atom value when constructing or seeding a registry.

**Details**

The returned tuple can be supplied to `AtomRegistry` initial values so the atom
starts with the provided value before it is first rebuilt.

**Signature**

```ts
declare const initialValue: {
  <A>(initialValue: A): (self: Atom<A>) => readonly [Atom<A>, A]
  <A>(self: Atom<A>, initialValue: A): readonly [Atom<A>, A]
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L1546)

Since v4.0.0

## keepAlive

Returns a copy of an atom that remains cached and mounted even when no subscribers are using it.

**Signature**

```ts
declare const keepAlive: <A extends Atom<any>>(self: A) => A
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L1466)

Since v4.0.0

## map

Maps the current value of an atom with a pure function.

**Details**

When the source atom is writable, the returned atom remains writable and keeps
the source atom's write input type.

**Signature**

```ts
declare const map: {
  <R extends Atom<any>, B>(
    f: (_: Type<R>) => B
  ): (self: R) => [R] extends [Writable<infer _, infer RW>] ? Writable<B, RW> : Atom<B>
  <R extends Atom<any>, B>(
    self: R,
    f: (_: Type<R>) => B
  ): [R] extends [Writable<infer _, infer RW>] ? Writable<B, RW> : Atom<B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L1636)

Since v4.0.0

## mapResult

Maps the successful value inside an `AsyncResult` atom.

**Details**

Initial and failure states are preserved, and writable source atoms keep their
original write input type.

**Signature**

```ts
declare const mapResult: {
  <R extends Atom<AsyncResult.AsyncResult<any, any>>, B>(
    f: (_: AsyncResult.AsyncResult.Success<Type<R>>) => B
  ): (
    self: R
  ) => [R] extends [Writable<infer _, infer RW>]
    ? Writable<AsyncResult.AsyncResult<B, AsyncResult.AsyncResult.Failure<Type<R>>>, RW>
    : Atom<AsyncResult.AsyncResult<B, AsyncResult.AsyncResult.Failure<Type<R>>>>
  <R extends Atom<AsyncResult.AsyncResult<any, any>>, B>(
    self: R,
    f: (_: AsyncResult.AsyncResult.Success<Type<R>>) => B
  ): [R] extends [Writable<infer _, infer RW>]
    ? Writable<AsyncResult.AsyncResult<B, AsyncResult.AsyncResult.Failure<Type<R>>>, RW>
    : Atom<AsyncResult.AsyncResult<B, AsyncResult.AsyncResult.Failure<Type<R>>>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L1660)

Since v4.0.0

## serializable

Attaches serialization metadata to an atom using a schema and stable key.

**Details**

The schema is converted to a JSON codec for synchronous encode/decode, and the
key is also used as the atom label when the atom does not already have one.

**Signature**

```ts
declare const serializable: {
  <R extends Atom<any>, S extends Schema.Codec<Type<R>, any>>(options: {
    readonly key: string
    readonly schema: S
  }): (self: R) => R & Serializable<S>
  <R extends Atom<any>, S extends Schema.Codec<Type<R>, any>>(
    self: R,
    options: { readonly key: string; readonly schema: S }
  ): R & Serializable<S>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L2439)

Since v4.0.0

## setIdleTTL

Returns a copy of an atom with an idle time-to-live: finite durations dispose it after inactivity, while an infinite duration keeps it alive.

**Signature**

```ts
declare const setIdleTTL: {
  (duration: Duration.Input): <A extends Atom<any>>(self: A) => A
  <A extends Atom<any>>(self: A, duration: Duration.Input): A
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L212)

Since v4.0.0

## setLazy

Sets whether an atom should be lazy.

**Details**

Lazy atoms defer recomputation while they have no active listeners or active
non-lazy dependents, rebuilding the next time their value is observed.

**Signature**

```ts
declare const setLazy: {
  (lazy: boolean): <A extends Atom<any>>(self: A) => A
  <A extends Atom<any>>(self: A, lazy: boolean): A
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L1499)

Since v4.0.0

## swr

Adds stale-while-revalidate refresh behavior to an async result atom.

**Details**

Automatic revalidation during reads is skipped while the current value is
fresh within `staleTime`. Manual `refresh` calls remain forceful and always
forward to the wrapped atom. Use `revalidateOnMount` to control whether stale data should trigger a
background refresh on first mount. Use `revalidateOnFocus` to control
focus behavior. `true` respects `staleTime` and `"always"` forces refetch.

**Signature**

```ts
declare const swr: {
  (options: {
    readonly staleTime: Duration.Input
    readonly revalidateOnMount?: boolean | undefined
    readonly revalidateOnFocus?: boolean | "always" | undefined
    readonly focusSignal?: Atom<any> | undefined
  }): <R extends Atom<AsyncResult.AsyncResult<any, any>>>(self: R) => WithoutSerializable<R>
  <R extends Atom<AsyncResult.AsyncResult<any, any>>>(
    self: R,
    options: {
      readonly staleTime: Duration.Input
      readonly revalidateOnMount?: boolean | undefined
      readonly revalidateOnFocus?: boolean | "always" | undefined
      readonly focusSignal?: Atom<any> | undefined
    }
  ): WithoutSerializable<R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L1760)

Since v4.0.0

## transform

Creates a derived atom by reading another atom with a custom `AtomContext`
function.

**Details**

If the source is writable, the derived atom keeps the source write input and
forwards writes to the source. `initialValueTarget` controls which atom receives
preloaded initial values for the derived atom.

**Signature**

```ts
declare const transform: {
  <R extends Atom<any>, B>(
    f: (get: AtomContext, atom: R) => B,
    options?: { readonly initialValueTarget?: Atom<B> | undefined }
  ): (self: R) => [R] extends [Writable<infer _, infer RW>] ? Writable<B, RW> : Atom<B>
  <R extends Atom<any>, B>(
    self: R,
    f: (get: AtomContext, atom: R) => B,
    options?: { readonly initialValueTarget?: Atom<B> | undefined }
  ): [R] extends [Writable<infer _, infer RW>] ? Writable<B, RW> : Atom<B>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L1567)

Since v4.0.0

## withFallback

Uses a fallback `AsyncResult` atom while the primary atom is `Initial`, marking the fallback result as waiting until the primary atom produces a non-initial result.

**Signature**

```ts
declare const withFallback: {
  <E2, A2>(
    fallback: Atom<AsyncResult.AsyncResult<A2, E2>>
  ): <R extends Atom<AsyncResult.AsyncResult<any, any>>>(
    self: R
  ) => [R] extends [Writable<infer _, infer RW>]
    ? Writable<
        AsyncResult.AsyncResult<
          AsyncResult.AsyncResult.Success<Type<R>> | A2,
          AsyncResult.AsyncResult.Failure<Type<R>> | E2
        >,
        RW
      >
    : Atom<
        AsyncResult.AsyncResult<
          AsyncResult.AsyncResult.Success<Type<R>> | A2,
          AsyncResult.AsyncResult.Failure<Type<R>> | E2
        >
      >
  <R extends Atom<AsyncResult.AsyncResult<any, any>>, A2, E2>(
    self: R,
    fallback: Atom<AsyncResult.AsyncResult<A2, E2>>
  ): [R] extends [Writable<infer _, infer RW>]
    ? Writable<
        AsyncResult.AsyncResult<
          AsyncResult.AsyncResult.Success<Type<R>> | A2,
          AsyncResult.AsyncResult.Failure<Type<R>> | E2
        >,
        RW
      >
    : Atom<
        AsyncResult.AsyncResult<
          AsyncResult.AsyncResult.Success<Type<R>> | A2,
          AsyncResult.AsyncResult.Failure<Type<R>> | E2
        >
      >
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L1386)

Since v4.0.0

## withLabel

Attaches a diagnostic label to an atom.

**Details**

The label is used for inspection and debugging metadata and does not change the
atom's read or write behavior.

**Signature**

```ts
declare const withLabel: {
  (name: string): <A extends Atom<any>>(self: A) => A
  <A extends Atom<any>>(self: A, name: string): A
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L1519)

Since v4.0.0

## withRefresh

Creates a derived atom that reads the source and schedules a refresh after the
specified duration.

**Details**

The scheduled refresh is canceled when the derived atom's lifetime is disposed.

**Signature**

```ts
declare const withRefresh: {
  (duration: Duration.Input): <A extends Atom<any>>(self: A) => WithoutSerializable<A>
  <A extends Atom<any>>(self: A, duration: Duration.Input): WithoutSerializable<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L1731)

Since v4.0.0

# constructors

## context

Creates a `RuntimeFactory` backed by the supplied `Layer.MemoMap`.

**Signature**

```ts
declare const context: (options: { readonly memoMap: Layer.MemoMap }) => RuntimeFactory
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L724)

Since v4.0.0

## family

Creates a memoized atom factory that returns the same object for the same argument, using weak references for cached values when the platform supports them.

**Signature**

```ts
declare const family: <Arg, T extends object>(f: (arg: Arg) => T) => (arg: Arg) => T
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L1343)

Since v4.0.0

## fn

Creates a writable atom for an `Effect` or `Stream` function; writing an argument starts the computation and exposes its state as an `AsyncResult`.

**Signature**

```ts
declare const fn: {
  <Arg>(): <E, A>(
    fn: (arg: Arg, get: FnContext) => Effect.Effect<A, E, Scope.Scope | AtomRegistry>,
    options?: { readonly initialValue?: A | undefined; readonly concurrent?: boolean | undefined }
  ) => AtomResultFn<Arg, A, E>
  <E, A, Arg = void>(
    fn: (arg: Arg, get: FnContext) => Effect.Effect<A, E, Scope.Scope | AtomRegistry>,
    options?: { readonly initialValue?: A | undefined; readonly concurrent?: boolean | undefined }
  ): AtomResultFn<Arg, A, E>
  <Arg>(): <E, A>(
    fn: (arg: Arg, get: FnContext) => Stream.Stream<A, E, AtomRegistry>,
    options?: { readonly initialValue?: A | undefined; readonly concurrent?: boolean | undefined }
  ) => AtomResultFn<Arg, A, E | Cause.NoSuchElementError>
  <E, A, Arg = void>(
    fn: (arg: Arg, get: FnContext) => Stream.Stream<A, E, AtomRegistry>,
    options?: { readonly initialValue?: A | undefined; readonly concurrent?: boolean | undefined }
  ): AtomResultFn<Arg, A, E | Cause.NoSuchElementError>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L1126)

Since v4.0.0

## fnSync

Creates a writable atom for a synchronous function; writing an argument re-runs the function, returning `Option.none` before the first call unless an initial value is supplied.

**Signature**

```ts
declare const fnSync: {
  <Arg>(): {
    <A>(f: (arg: Arg, get: FnContext) => A): Writable<Option.Option<A>, Arg>
    <A>(f: (arg: Arg, get: FnContext) => A, options: { readonly initialValue: A }): Writable<A, Arg>
  }
  <A, Arg = void>(f: (arg: Arg, get: FnContext) => A): Writable<Option.Option<A>, Arg>
  <A, Arg = void>(f: (arg: Arg, get: FnContext) => A, options: { readonly initialValue: A }): Writable<A, Arg>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L1024)

Since v4.0.0

## make

Creates an atom from a synchronous value or read function, or from an `Effect` or `Stream` whose state is exposed as an `AsyncResult`; plain values create writable state atoms.

**Signature**

```ts
declare const make: {
  <A, E>(
    create: (get: AtomContext) => Effect.Effect<A, E, Scope.Scope | AtomRegistry>,
    options?: { readonly initialValue?: A | undefined; readonly uninterruptible?: boolean | undefined }
  ): Atom<AsyncResult.AsyncResult<A, E>>
  <A, E>(
    effect: Effect.Effect<A, E, Scope.Scope | AtomRegistry>,
    options?: { readonly initialValue?: A; readonly uninterruptible?: boolean | undefined }
  ): Atom<AsyncResult.AsyncResult<A, E>>
  <A, E>(
    create: (get: AtomContext) => Stream.Stream<A, E, AtomRegistry>,
    options?: { readonly initialValue?: A }
  ): Atom<AsyncResult.AsyncResult<A, E | Cause.NoSuchElementError>>
  <A, E>(
    stream: Stream.Stream<A, E, AtomRegistry>,
    options?: { readonly initialValue?: A }
  ): Atom<AsyncResult.AsyncResult<A, E | Cause.NoSuchElementError>>
  <A>(create: (get: AtomContext) => A): Atom<A>
  <A>(initialValue: A): Writable<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L413)

Since v4.0.0

## pull

Creates a writable atom that pulls an initial chunk from a stream and then pulls the next chunk whenever it is written to, accumulating items unless `disableAccumulation` is enabled.

**Signature**

```ts
declare const pull: <A, E>(
  create: ((get: AtomContext) => Stream.Stream<A, E, AtomRegistry>) | Stream.Stream<A, E, AtomRegistry>,
  options?: { readonly disableAccumulation?: boolean | undefined }
) => Writable<PullResult<A, E>, void>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L1244)

Since v4.0.0

## readable

Creates a read-only atom from a read function and an optional custom refresh registration callback.

**Signature**

```ts
declare const readable: <A>(read: (get: AtomContext) => A, refresh?: (f: <A>(atom: Atom<A>) => void) => void) => Atom<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L367)

Since v4.0.0

## subscriptionRef

Creates a writable atom backed by a `SubscriptionRef`, or by an effect that produces one, updating from ref changes and writing atom updates back to the ref.

**Signature**

```ts
declare const subscriptionRef: {
  <A>(ref: SubscriptionRef.SubscriptionRef<A> | ((get: AtomContext) => SubscriptionRef.SubscriptionRef<A>)): Writable<A>
  <A, E>(
    effect:
      | Effect.Effect<SubscriptionRef.SubscriptionRef<A>, E, Scope.Scope | AtomRegistry>
      | ((get: AtomContext) => Effect.Effect<SubscriptionRef.SubscriptionRef<A>, E, Scope.Scope | AtomRegistry>)
  ): Writable<AsyncResult.AsyncResult<A, E>, A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L903)

Since v4.0.0

## writable

Creates a writable atom from read and write functions, with an optional custom refresh registration callback.

**Signature**

```ts
declare const writable: <R, W>(
  read: (get: AtomContext) => R,
  write: (ctx: WriteContext<R>, value: W) => void,
  refresh?: (f: <A>(atom: Atom<A>) => void) => void
) => Writable<R, W>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L385)

Since v4.0.0

# context

## AtomContext (interface)

Context passed to atom read functions for reading dependencies, awaiting `AsyncResult` or `Option` values, managing subscriptions and finalizers, refreshing atoms, and updating writable atoms.

**Signature**

```ts
export interface AtomContext {
  <A>(atom: Atom<A>): A
  get<A>(this: AtomContext, atom: Atom<A>): A
  result<A, E>(
    this: AtomContext,
    atom: Atom<AsyncResult.AsyncResult<A, E>>,
    options?: {
      readonly suspendOnWaiting?: boolean | undefined
    }
  ): Effect.Effect<A, E>
  resultOnce<A, E>(
    this: AtomContext,
    atom: Atom<AsyncResult.AsyncResult<A, E>>,
    options?: {
      readonly suspendOnWaiting?: boolean | undefined
    }
  ): Effect.Effect<A, E>
  once<A>(this: AtomContext, atom: Atom<A>): A
  addFinalizer(this: AtomContext, f: () => void): void
  mount<A>(this: AtomContext, atom: Atom<A>): void
  refresh<A>(this: AtomContext, atom: Atom<A>): void
  refreshSelf(this: AtomContext): void
  self<A>(this: AtomContext): Option.Option<A>
  setSelf<A>(this: AtomContext, a: A): void
  set<R, W>(this: AtomContext, atom: Writable<R, W>, value: W): void
  setResult<A, E, W>(this: AtomContext, atom: Writable<AsyncResult.AsyncResult<A, E>, W>, value: W): Effect.Effect<A, E>
  some<A>(this: AtomContext, atom: Atom<Option.Option<A>>): Effect.Effect<A>
  someOnce<A>(this: AtomContext, atom: Atom<Option.Option<A>>): Effect.Effect<A>
  stream<A>(
    this: AtomContext,
    atom: Atom<A>,
    options?: {
      readonly withoutInitialValue?: boolean
      readonly bufferSize?: number
    }
  ): Stream.Stream<A>
  streamResult<A, E>(
    this: AtomContext,
    atom: Atom<AsyncResult.AsyncResult<A, E>>,
    options?: {
      readonly withoutInitialValue?: boolean
      readonly bufferSize?: number
    }
  ): Stream.Stream<A, E>
  subscribe<A>(
    this: AtomContext,
    atom: Atom<A>,
    f: (_: A) => void,
    options?: {
      readonly immediate?: boolean
    }
  ): void
  readonly registry: Registry.AtomRegistry
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L159)

Since v4.0.0

## WriteContext (interface)

Context passed to writable atom write functions for reading atoms, refreshing or setting the current atom, and writing to other writable atoms.

**Signature**

```ts
export interface WriteContext<A> {
  get<T>(this: WriteContext<A>, atom: Atom<T>): T
  refreshSelf(this: WriteContext<A>): void
  setSelf(this: WriteContext<A>, a: A): void
  set<R, W>(this: WriteContext<A>, atom: Writable<R, W>, value: W): void
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L199)

Since v4.0.0

## defaultMemoMap

Default `Layer.MemoMap` used by the module-level `runtime` factory.

**Signature**

```ts
declare const defaultMemoMap: Layer.MemoMap
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L785)

Since v4.0.0

## runtime

Default `RuntimeFactory` created with `defaultMemoMap`.

**Signature**

```ts
declare const runtime: RuntimeFactory
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L793)

Since v4.0.0

# converting

## get

Reads an atom's current value from the `AtomRegistry` service.

**Signature**

```ts
declare const get: <A>(self: Atom<A>) => Effect.Effect<A, never, AtomRegistry>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L2284)

Since v4.0.0

## getResult

Reads an `AsyncResult` atom as an effect through the `AtomRegistry` service.

**Details**

The effect waits while the result is `Initial`, and also while it is waiting
when `suspendOnWaiting` is enabled. Successes succeed with the value and
failures fail with the result cause.

**Signature**

```ts
declare const getResult: <A, E>(
  self: Atom<AsyncResult.AsyncResult<A, E>>,
  options?: { readonly suspendOnWaiting?: boolean | undefined }
) => Effect.Effect<A, E, AtomRegistry>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L2348)

Since v4.0.0

## modify

Reads a writable atom, computes a return value and next write value, writes the
next value, and returns the computed result.

**Signature**

```ts
declare const modify: {
  <R, W, A>(
    f: (_: R) => [returnValue: A, nextValue: W]
  ): (self: Writable<R, W>) => Effect.Effect<A, never, AtomRegistry>
  <R, W, A>(self: Writable<R, W>, f: (_: R) => [returnValue: A, nextValue: W]): Effect.Effect<A, never, AtomRegistry>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L2294)

Since v4.0.0

## mount

Mounts an atom in the `AtomRegistry` for the lifetime of the current scope.

**Details**

Mounting keeps the atom subscribed with a no-op listener until the scope
finalizer releases it.

**Signature**

```ts
declare const mount: <A>(self: Atom<A>) => Effect.Effect<void, never, AtomRegistry | Scope.Scope>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L2378)

Since v4.0.0

## refresh

Runs a refresh request for an atom through the `AtomRegistry` service.

**When to use**

Use to invalidate and recompute an atom from an Effect that has access to the
active registry.

**Signature**

```ts
declare const refresh: <A>(self: Atom<A>) => Effect.Effect<void, never, AtomRegistry>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L2364)

Since v4.0.0

## set

Writes a value to a writable atom through the `AtomRegistry` service.

**Signature**

```ts
declare const set: {
  <W>(value: W): <R>(self: Writable<R, W>) => Effect.Effect<void, never, AtomRegistry>
  <R, W>(self: Writable<R, W>, value: W): Effect.Effect<void, never, AtomRegistry>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L2311)

Since v4.0.0

## toStream

Converts an atom into a stream using the `AtomRegistry` service.

**Details**

The stream emits the atom's current value immediately and then emits subsequent
changes until the stream scope is closed.

**Signature**

```ts
declare const toStream: <A>(self: Atom<A>) => Stream.Stream<A, never, AtomRegistry>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L2261)

Since v4.0.0

## toStreamResult

Converts an `AsyncResult` atom into a stream using the `AtomRegistry` service.

**Details**

Initial results are skipped, successes are emitted as stream values, and
failures fail the stream with the result cause.

**Signature**

```ts
declare const toStreamResult: <A, E>(self: Atom<AsyncResult.AsyncResult<A, E>>) => Stream.Stream<A, E, AtomRegistry>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L2275)

Since v4.0.0

## update

Updates a writable atom by reading its current value from the registry and
writing the value returned by the update function.

**Signature**

```ts
declare const update: {
  <R, W>(f: (_: R) => W): (self: Writable<R, W>) => Effect.Effect<void, never, AtomRegistry>
  <R, W>(self: Writable<R, W>, f: (_: R) => W): Effect.Effect<void, never, AtomRegistry>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L2327)

Since v4.0.0

# guards

## isAtom

Returns `true` when a value is an `Atom`.

**Signature**

```ts
declare const isAtom: (u: unknown) => u is Atom<any>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L83)

Since v4.0.0

# models

## Atom (interface)

Reactive value read by an `AtomRegistry`, with metadata controlling caching, laziness, refresh behavior, and initial value targeting.

**Signature**

```ts
export interface Atom<A> extends Pipeable, Inspectable.Inspectable {
  readonly [TypeId]: TypeId
  readonly keepAlive: boolean
  readonly lazy: boolean
  readonly read: (get: AtomContext) => A
  readonly refresh?: (f: <A>(atom: Atom<A>) => void) => void
  readonly label?: readonly [name: string, stack: string]
  readonly idleTTL?: number
  readonly initialValueTarget?: Atom<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L66)

Since v4.0.0

## AtomResultFn (interface)

Writable async function atom whose value is an `AsyncResult` and whose writes accept function arguments plus `Reset` and `Interrupt` controls.

**Signature**

```ts
export interface AtomResultFn<Arg, A, E = never> extends Writable<
  AsyncResult.AsyncResult<A, E>,
  Arg | Reset | Interrupt
> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L1074)

Since v4.0.0

## AtomRuntime (interface)

Atom that builds a `Context` from a `Layer` and exposes constructors for atoms, functions, pulls, and subscription refs that run with that context.

**Signature**

```ts
export interface AtomRuntime<R, ER = never> extends Atom<AsyncResult.AsyncResult<Context.Context<R>, ER>> {
  readonly factory: RuntimeFactory

  readonly layer: Atom<Layer.Layer<R, ER>>

  readonly atom: {
    <A, E>(
      create: (get: AtomContext) => Effect.Effect<A, E, Scope.Scope | R | AtomRegistry | Reactivity.Reactivity>,
      options?: {
        readonly initialValue?: A
        readonly uninterruptible?: boolean | undefined
      }
    ): Atom<AsyncResult.AsyncResult<A, E | ER>>
    <A, E>(
      effect: Effect.Effect<A, E, Scope.Scope | R | AtomRegistry | Reactivity.Reactivity>,
      options?: {
        readonly initialValue?: A
        readonly uninterruptible?: boolean | undefined
      }
    ): Atom<AsyncResult.AsyncResult<A, E | ER>>
    <A, E>(
      create: (get: AtomContext) => Stream.Stream<A, E, AtomRegistry | Reactivity.Reactivity | R>,
      options?: {
        readonly initialValue?: A
      }
    ): Atom<AsyncResult.AsyncResult<A, E | ER | Cause.NoSuchElementError>>
    <A, E>(
      stream: Stream.Stream<A, E, AtomRegistry | Reactivity.Reactivity | R>,
      options?: {
        readonly initialValue?: A
      }
    ): Atom<AsyncResult.AsyncResult<A, E | ER | Cause.NoSuchElementError>>
  }

  readonly fn: {
    <Arg>(): {
      <E, A>(
        fn: (arg: Arg, get: FnContext) => Effect.Effect<A, E, Scope.Scope | AtomRegistry | Reactivity.Reactivity | R>,
        options?: {
          readonly initialValue?: A | undefined
          readonly reactivityKeys?: ReadonlyArray<unknown> | ReadonlyRecord<string, ReadonlyArray<unknown>> | undefined
          readonly concurrent?: boolean | undefined
        }
      ): AtomResultFn<Arg, A, E | ER>
      <E, A>(
        fn: (arg: Arg, get: FnContext) => Stream.Stream<A, E, AtomRegistry | Reactivity.Reactivity | R>,
        options?: {
          readonly initialValue?: A | undefined
          readonly reactivityKeys?: ReadonlyArray<unknown> | ReadonlyRecord<string, ReadonlyArray<unknown>> | undefined
          readonly concurrent?: boolean | undefined
        }
      ): AtomResultFn<Arg, A, E | ER | Cause.NoSuchElementError>
    }
    <E, A, Arg = void>(
      fn: (arg: Arg, get: FnContext) => Effect.Effect<A, E, Scope.Scope | AtomRegistry | Reactivity.Reactivity | R>,
      options?: {
        readonly initialValue?: A | undefined
        readonly reactivityKeys?: ReadonlyArray<unknown> | ReadonlyRecord<string, ReadonlyArray<unknown>> | undefined
        readonly concurrent?: boolean | undefined
      }
    ): AtomResultFn<Arg, A, E | ER>
    <E, A, Arg = void>(
      fn: (arg: Arg, get: FnContext) => Stream.Stream<A, E, AtomRegistry | Reactivity.Reactivity | R>,
      options?: {
        readonly initialValue?: A | undefined
        readonly reactivityKeys?: ReadonlyArray<unknown> | ReadonlyRecord<string, ReadonlyArray<unknown>> | undefined
        readonly concurrent?: boolean | undefined
      }
    ): AtomResultFn<Arg, A, E | ER | Cause.NoSuchElementError>
  }

  readonly pull: <A, E>(
    create:
      | ((get: AtomContext) => Stream.Stream<A, E, R | AtomRegistry | Reactivity.Reactivity>)
      | Stream.Stream<A, E, R | AtomRegistry | Reactivity.Reactivity>,
    options?: {
      readonly disableAccumulation?: boolean
      readonly initialValue?: ReadonlyArray<A>
    }
  ) => Writable<PullResult<A, E | ER>, void>

  readonly subscriptionRef: <A, E>(
    create:
      | Effect.Effect<SubscriptionRef.SubscriptionRef<A>, E, Scope.Scope | R | AtomRegistry | Reactivity.Reactivity>
      | ((
          get: AtomContext
        ) => Effect.Effect<
          SubscriptionRef.SubscriptionRef<A>,
          E,
          Scope.Scope | R | AtomRegistry | Reactivity.Reactivity
        >)
  ) => Writable<AsyncResult.AsyncResult<A, E>, A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L613)

Since v4.0.0

## FnContext (interface)

Context passed to `fn` and `fnSync` computations for reading atoms, awaiting results, registering finalizers, refreshing atoms, subscribing to changes, and writing updates.

**Signature**

```ts
export interface FnContext {
  <A>(atom: Atom<A>): A
  result<A, E>(
    this: FnContext,
    atom: Atom<AsyncResult.AsyncResult<A, E>>,
    options?: {
      readonly suspendOnWaiting?: boolean | undefined
    }
  ): Effect.Effect<A, E>
  addFinalizer(this: FnContext, f: () => void): void
  mount<A>(this: FnContext, atom: Atom<A>): void
  refresh<A>(this: FnContext, atom: Atom<A>): void
  self<A>(this: FnContext): Option.Option<A>
  setSelf<A>(this: FnContext, a: A): void
  set<R, W>(this: FnContext, atom: Writable<R, W>, value: W): void
  setResult<A, E, W>(this: FnContext, atom: Writable<AsyncResult.AsyncResult<A, E>, W>, value: W): Effect.Effect<A, E>
  some<A>(this: FnContext, atom: Atom<Option.Option<A>>): Effect.Effect<A>
  stream<A>(
    this: FnContext,
    atom: Atom<A>,
    options?: {
      readonly withoutInitialValue?: boolean
      readonly bufferSize?: number
    }
  ): Stream.Stream<A>
  streamResult<A, E>(
    this: FnContext,
    atom: Atom<AsyncResult.AsyncResult<A, E>>,
    options?: {
      readonly withoutInitialValue?: boolean
      readonly bufferSize?: number
    }
  ): Stream.Stream<A, E>
  subscribe<A>(
    this: FnContext,
    atom: Atom<A>,
    f: (_: A) => void,
    options?: {
      readonly immediate?: boolean
    }
  ): void
  readonly registry: Registry.AtomRegistry
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L991)

Since v4.0.0

## PullResult (type alias)

`AsyncResult` produced by `pull`, containing a non-empty batch of pulled items and a `done` flag, or `NoSuchElementError` when the stream completes without items.

**Signature**

```ts
type PullResult<A, E> = AsyncResult.AsyncResult<
  {
    readonly done: boolean
    readonly items: Arr.NonEmptyArray<A>
  },
  E | Cause.NoSuchElementError
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L1233)

Since v4.0.0

## RuntimeFactory (interface)

Factory for `AtomRuntime` values that share a `Layer.MemoMap` and a set of global layers.

**Signature**

```ts
export interface RuntimeFactory {
  <R, E>(
    create:
      | Layer.Layer<R, E, AtomRegistry | Reactivity.Reactivity>
      | ((get: AtomContext) => Layer.Layer<R, E, AtomRegistry | Reactivity.Reactivity>)
  ): AtomRuntime<R, E>
  readonly memoMap: Layer.MemoMap
  readonly addGlobalLayer: <A, E>(layer: Layer.Layer<A, E, AtomRegistry | Reactivity.Reactivity>) => void

  /**
   * Uses the `Reactivity` service from the runtime to refresh the atom whenever
   * the keys change.
   */
  readonly withReactivity: (
    keys: ReadonlyArray<unknown> | ReadonlyRecord<string, ReadonlyArray<unknown>>
  ) => <A extends Atom<any>>(atom: A) => A
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L700)

Since v4.0.0

## Writable (interface)

Atom that can also be written to, using a `WriteContext` and an input value to update reactive state.

**Signature**

```ts
export interface Writable<R, W = R> extends Atom<R> {
  readonly [WritableTypeId]: WritableTypeId
  readonly write: (ctx: WriteContext<R>, value: W) => void
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L148)

Since v4.0.0

# reactivity

## withReactivity

Returns `Rx.runtime.withReactivity` for refreshing an atom whenever the
keys change in the `Reactivity` service.

**When to use**

Use to refresh an atom whenever one or more invalidation keys change in the
default reactivity runtime.

**Signature**

```ts
declare const withReactivity: (
  keys: ReadonlyArray<unknown> | ReadonlyRecord<string, ReadonlyArray<unknown>>
) => <A extends Atom<any>>(atom: A) => A
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L807)

Since v4.0.0

# refinements

## isWritable

Returns `true` when an atom is writable.

**Signature**

```ts
declare const isWritable: <R, W>(atom: Atom<R>) => atom is Writable<R, W>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L359)

Since v4.0.0

# search params

## searchParam

Creates an atom that reads and writes a URL search parameter.

**Gotchas**

If you pass a schema, it has to be synchronous and have no context.

**Signature**

```ts
declare const searchParam: <S extends Schema.Codec<any, string> = never>(
  name: string,
  options?: { readonly schema?: S | undefined }
) => Writable<[S] extends [never] ? string : Option.Option<S["Type"]>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L2172)

Since v4.0.0

# symbols

## Interrupt

Defines the control symbol that can be written to an `AtomResultFn` to interrupt the current asynchronous computation.

**When to use**

Use when you need an `AtomResultFn` write value that interrupts the currently
running async computation.

**Signature**

```ts
declare const Interrupt: unique symbol
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L1110)

Since v4.0.0

## Interrupt (type alias)

Type of the `Interrupt` control symbol accepted by `AtomResultFn` writes.

**Signature**

```ts
type Interrupt = typeof Interrupt
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L1118)

Since v4.0.0

## Reset

Defines the control symbol that can be written to an `AtomResultFn` to reset it to its initial state.

**When to use**

Use when you need an `AtomResultFn` write value that clears the current async
result and returns it to the initial state.

**Signature**

```ts
declare const Reset: unique symbol
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L1089)

Since v4.0.0

## Reset (type alias)

Type of the `Reset` control symbol accepted by `AtomResultFn` writes.

**Signature**

```ts
type Reset = typeof Reset
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L1097)

Since v4.0.0

# type IDs

## SerializableTypeId

The type id used to mark atoms that carry serialization metadata.

**Signature**

```ts
declare const SerializableTypeId: "~effect-atom/atom/Atom/Serializable"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L2391)

Since v4.0.0

## SerializableTypeId (type alias)

The literal type of the serializable atom marker.

**Signature**

```ts
type SerializableTypeId = "~effect-atom/atom/Atom/Serializable"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L2399)

Since v4.0.0

## ServerValueTypeId

The type id used to mark atoms with a server-side read override.

**Signature**

```ts
declare const ServerValueTypeId: "~effect-atom/atom/Atom/ServerValue"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L2470)

Since v4.0.0

## TypeId

Runtime identifier attached to `Atom` values and used by `isAtom`.

**Signature**

```ts
declare const TypeId: "~effect/reactivity/Atom"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L58)

Since v4.0.0

## TypeId (type alias)

Type-level identifier used to recognize `Atom` values.

**Signature**

```ts
type TypeId = "~effect/reactivity/Atom"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L50)

Since v4.0.0

## WritableTypeId

Runtime identifier attached to writable atoms and used by `isWritable`.

**Signature**

```ts
declare const WritableTypeId: "~effect/reactivity/Atom/Writable"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L132)

Since v4.0.0

## WritableTypeId (type alias)

Type-level identifier used to recognize writable atoms.

**Signature**

```ts
type WritableTypeId = "~effect/reactivity/Atom/Writable"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L140)

Since v4.0.0

# utility types

## Failure (type alias)

Extracts the failure error type from an atom whose value is an `AsyncResult`.

**Signature**

```ts
type Failure<T> = T extends Atom<AsyncResult.AsyncResult<infer _, infer E>> ? E : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L115)

Since v4.0.0

## PullSuccess (type alias)

Extracts the item type from an atom whose value is a `PullResult`.

**Signature**

```ts
type PullSuccess<T> = T extends Atom<PullResult<infer A, infer _>> ? A : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L107)

Since v4.0.0

## Success (type alias)

Extracts the success value type from an atom whose value is an `AsyncResult`.

**Signature**

```ts
type Success<T> = T extends Atom<AsyncResult.AsyncResult<infer A, infer _>> ? A : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L99)

Since v4.0.0

## Type (type alias)

Extracts the value type produced by an `Atom`.

**Signature**

```ts
type Type<T> = T extends Atom<infer A> ? A : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L91)

Since v4.0.0

## WithoutSerializable (type alias)

Returns an atom type without serializable metadata, preserving `Writable` read and write types when the input atom is writable.

**Signature**

```ts
type WithoutSerializable<T> = T extends Writable<infer R, infer W> ? Writable<R, W> : Atom<Type<T>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Atom.ts#L123)

Since v4.0.0
