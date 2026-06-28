---
title: RegistryContext.ts
nav_order: 3
parent: "@effect/atom-solid"
---

## RegistryContext.ts overview

Solid context and provider for the Atom registry used by Effect Atom hooks.
The registry stores atom values, schedules update work, and cleans up unused
atoms. Sharing one registry through Solid context lets components and
computations in the same owner tree read and write the same atom state.

Since v4.0.0

---

## Exports Grouped by Category

- [context](#context)
  - [RegistryContext](#registrycontext)
  - [RegistryProvider](#registryprovider)

---

# context

## RegistryContext

Provides a Solid context that carries the `AtomRegistry` used by atom hooks in the
current owner tree.

**When to use**

Use when you need to integrate lower-level Solid context APIs, such as custom
providers or hooks, instead of using the default atom hook setup.

**Details**

When no provider is present, the context uses a standalone default registry.

**See**

- `RegistryProvider` for creating and providing a registry for a Solid subtree

**Signature**

```ts
declare const RegistryContext: Context<AtomRegistry.AtomRegistry>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/atom/solid/src/RegistryContext.ts#L32)

Since v4.0.0

## RegistryProvider

Creates an `AtomRegistry` for a Solid subtree, optionally seeding initial atom
values and scheduler settings, and disposes the registry when the owner is
cleaned up.

**When to use**

Use to scope atom state, scheduling, and cleanup to a Solid subtree.

**Details**

The provider creates an `AtomRegistry` with `AtomRegistry.make`, forwards
`initialValues`, `scheduleTask`, `timeoutResolution`, and
`defaultIdleTTL`, and supplies the registry through `RegistryContext`.

**Gotchas**

Provider options are consumed when the registry is created; they are not
reactive updates. A custom `scheduleTask` should return a cancellation
function that is safe to call during Solid cleanup.

**See**

- `RegistryContext` for the context supplied by this provider

**Signature**

```ts
declare const RegistryProvider: (options: {
  readonly children?: JSX.Element | undefined
  readonly initialValues?: Iterable<readonly [Atom.Atom<any>, any]> | undefined
  readonly scheduleTask?: ((f: () => void) => () => void) | undefined
  readonly timeoutResolution?: number | undefined
  readonly defaultIdleTTL?: number | undefined
}) => JSX.Element
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/atom/solid/src/RegistryContext.ts#L60)

Since v4.0.0
