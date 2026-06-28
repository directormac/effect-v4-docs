---
title: RegistryContext.ts
nav_order: 4
parent: "@effect/atom-react"
---

## RegistryContext.ts overview

React context and provider for the Atom registry used by Effect Atom hooks.
The registry stores atom values, schedules update work, and cleans up unused
atoms. Sharing one registry through React context lets components in the same
subtree read and write the same atom state.

Since v4.0.0

---

## Exports Grouped by Category

- [context](#context)
  - [RegistryContext](#registrycontext)
  - [RegistryProvider](#registryprovider)
  - [scheduleTask](#scheduletask)

---

# context

## RegistryContext

Provides a React context that supplies the `AtomRegistry` used by Atom hooks and
hydration helpers, defaulting to a standalone registry when no provider is
present.

**When to use**

Use to supply an existing `AtomRegistry` through React context when hooks or
hydration helpers need to share registry state that is managed outside
`RegistryProvider`.

**See**

- `RegistryProvider` for creating and providing a registry for a React subtree

**Signature**

```ts
declare const RegistryContext: React.Context<AtomRegistry.AtomRegistry>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/atom/react/src/RegistryContext.ts#L44)

Since v4.0.0

## RegistryProvider

Provides a stable `AtomRegistry` to a React subtree, optionally seeding
initial atom values and overriding registry scheduling or idle settings.

**When to use**

Use to scope atom state, scheduling, and idle cleanup to a React subtree.

**Details**

The provider creates one `AtomRegistry` with `AtomRegistry.make`, passes it
through `RegistryContext.Provider`, and forwards `initialValues`,
`scheduleTask`, `timeoutResolution`, and `defaultIdleTTL` only when that
registry is created.

**Gotchas**

Option changes after the first render do not rebuild the registry. When the
provider unmounts, registry disposal is delayed briefly and canceled if the
provider remounts before the timeout fires.

**See**

- `RegistryContext` for the React context supplied by this provider

**Signature**

```ts
declare const RegistryProvider: (options: {
  readonly children?: React.ReactNode | undefined
  readonly initialValues?: Iterable<readonly [Atom.Atom<any>, any]> | undefined
  readonly scheduleTask?: ((f: () => void) => () => void) | undefined
  readonly timeoutResolution?: number | undefined
  readonly defaultIdleTTL?: number | undefined
}) => React.FunctionComponentElement<React.ProviderProps<AtomRegistry.AtomRegistry>>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/atom/react/src/RegistryContext.ts#L75)

Since v4.0.0

## scheduleTask

Schedules Atom registry work with React's scheduler at low priority and
returns a cancellation function for the scheduled task.

**Signature**

```ts
declare const scheduleTask: (f: () => void) => () => void
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/atom/react/src/RegistryContext.ts#L23)

Since v4.0.0
