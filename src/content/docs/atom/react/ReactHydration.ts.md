---
title: ReactHydration.ts
nav_order: 3
parent: "@effect/atom-react"
---

## ReactHydration.ts overview

React helpers for applying dehydrated Effect Atom state to a React subtree.
The `HydrationBoundary` component reads the nearest `RegistryContext`,
hydrates new Atom values before children render, and delays updates for
existing Atom values until after commit so React transitions do not update
the current UI too early.

Since v4.0.0

---

## Exports Grouped by Category

- [components](#components)
  - [HydrationBoundary](#hydrationboundary)
  - [HydrationBoundaryProps (interface)](#hydrationboundaryprops-interface)

---

# components

## HydrationBoundary

Provides a React hydration boundary that loads dehydrated Atom values into
the current Atom registry.

**When to use**

Use to apply dehydrated Atom state to a React subtree that reads from the
nearest `RegistryContext`.

**Details**

New Atom values are hydrated during render so descendants can read them
immediately, while values for existing Atoms are deferred until after commit
so transition data does not update the current UI before React accepts it.

**See**

- `Hydration.dehydrate` for producing dehydrated Atom state
- `Hydration.hydrate` for lower-level non-React hydration

**Signature**

```ts
declare const HydrationBoundary: React.FC<HydrationBoundaryProps>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/atom/react/src/ReactHydration.ts#L48)

Since v4.0.0

## HydrationBoundaryProps (interface)

Props for a boundary that applies dehydrated Atom values to the nearest
`RegistryContext` while rendering its children.

**Signature**

```ts
export interface HydrationBoundaryProps {
  state?: Iterable<Hydration.DehydratedAtom>
  children?: React.ReactNode
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/atom/react/src/ReactHydration.ts#L22)

Since v4.0.0
