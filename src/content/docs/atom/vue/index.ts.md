---
title: index.ts
nav_order: 1
parent: "@effect/atom-vue"
---

## index.ts overview

Since v4.0.0

---

## Exports Grouped by Category

- [composables](#composables)
  - [useAtom](#useatom)
  - [useAtomRef](#useatomref)
  - [useAtomSet](#useatomset)
  - [useAtomValue](#useatomvalue)
- [modules](#modules)
  - [AsyncResult (namespace export)](#asyncresult-namespace-export)
  - [Atom (namespace export)](#atom-namespace-export)
  - [AtomRef (namespace export)](#atomref-namespace-export)
  - [AtomRegistry (namespace export)](#atomregistry-namespace-export)
  - [AtomRpc (namespace export)](#atomrpc-namespace-export)
- [re-exports](#re-exports)
  - [AtomHttpApi (namespace export)](#atomhttpapi-namespace-export)
- [registry](#registry)
  - [defaultRegistry](#defaultregistry)
  - [injectRegistry](#injectregistry)
  - [registryKey](#registrykey)

---

# composables

## useAtom

**Signature**

```ts
declare const useAtom: <R, W, Mode extends "value" | "promise" | "promiseExit" = never>(
  atom: () => Atom.Writable<R, W>,
  options?: { readonly mode?: ([R] extends [AsyncResult.AsyncResult<any, any>] ? Mode : "value") | undefined }
) => readonly [
  Readonly<Ref<R>>,
  write: "promise" extends Mode
    ? (value: W) => Promise<AsyncResult.AsyncResult.Success<R>>
    : "promiseExit" extends Mode
      ? (value: W) => Promise<Exit.Exit<AsyncResult.AsyncResult.Success<R>, AsyncResult.AsyncResult.Failure<R>>>
      : (value: W | ((value: R) => W)) => void
]
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/atom/vue/src/index.ts#L85)

Since v4.0.0

## useAtomRef

**Signature**

```ts
declare const useAtomRef: <A>(atomRef: () => AtomRef.ReadonlyRef<A>) => Readonly<Ref<A>>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/atom/vue/src/index.ts#L201)

Since v4.0.0

## useAtomSet

**Signature**

```ts
declare const useAtomSet: <R, W, Mode extends "value" | "promise" | "promiseExit" = never>(
  atom: () => Atom.Writable<R, W>,
  options?: { readonly mode?: ([R] extends [AsyncResult.AsyncResult<any, any>] ? Mode : "value") | undefined }
) => "promise" extends Mode
  ? (
      value: W,
      options?: { readonly signal?: AbortSignal | undefined } | undefined
    ) => Promise<AsyncResult.AsyncResult.Success<R>>
  : "promiseExit" extends Mode
    ? (
        value: W,
        options?: { readonly signal?: AbortSignal | undefined } | undefined
      ) => Promise<Exit.Exit<AsyncResult.AsyncResult.Success<R>, AsyncResult.AsyncResult.Failure<R>>>
    : (value: W | ((value: R) => W)) => void
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/atom/vue/src/index.ts#L162)

Since v4.0.0

## useAtomValue

**Signature**

```ts
declare const useAtomValue: <A>(atom: () => Atom.Atom<A>) => Readonly<Ref<A>>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/atom/vue/src/index.ts#L108)

Since v4.0.0

# modules

## AsyncResult (namespace export)

Re-exports all named exports from the "effect/unstable/reactivity/AsyncResult" module as `AsyncResult`.

**Signature**

```ts
export * as AsyncResult from "effect/unstable/reactivity/AsyncResult"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/atom/vue/src/index.ts#L23)

Since v4.0.0

## Atom (namespace export)

Re-exports all named exports from the "effect/unstable/reactivity/Atom" module as `Atom`.

**Signature**

```ts
export * as Atom from "effect/unstable/reactivity/Atom"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/atom/vue/src/index.ts#L29)

Since v4.0.0

## AtomRef (namespace export)

Re-exports all named exports from the "effect/unstable/reactivity/AtomRef" module as `AtomRef`.

**Signature**

```ts
export * as AtomRef from "effect/unstable/reactivity/AtomRef"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/atom/vue/src/index.ts#L35)

Since v4.0.0

## AtomRegistry (namespace export)

Re-exports all named exports from the "effect/unstable/reactivity/AtomRegistry" module as `AtomRegistry`.

**Signature**

```ts
export * as AtomRegistry from "effect/unstable/reactivity/AtomRegistry"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/atom/vue/src/index.ts#L17)

Since v4.0.0

## AtomRpc (namespace export)

Re-exports all named exports from the "effect/unstable/reactivity/AtomRpc" module as `AtomRpc`.

**Signature**

```ts
export * as AtomRpc from "effect/unstable/reactivity/AtomRpc"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/atom/vue/src/index.ts#L47)

Since v4.0.0

# re-exports

## AtomHttpApi (namespace export)

Re-exports all named exports from the "effect/unstable/reactivity/AtomHttpApi" module as `AtomHttpApi`.

**Signature**

```ts
export * as AtomHttpApi from "effect/unstable/reactivity/AtomHttpApi"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/atom/vue/src/index.ts#L41)

Since v4.0.0

# registry

## defaultRegistry

**Signature**

```ts
declare const defaultRegistry: AtomRegistry.AtomRegistry
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/atom/vue/src/index.ts#L59)

Since v4.0.0

## injectRegistry

**Signature**

```ts
declare const injectRegistry: () => AtomRegistry.AtomRegistry
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/atom/vue/src/index.ts#L65)

Since v4.0.0

## registryKey

**Signature**

```ts
declare const registryKey: InjectionKey<AtomRegistry.AtomRegistry>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/atom/vue/src/index.ts#L53)

Since v4.0.0
