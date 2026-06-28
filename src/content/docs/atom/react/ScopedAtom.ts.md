---
title: ScopedAtom.ts
nav_order: 5
parent: "@effect/atom-react"
---

## ScopedAtom.ts overview

React helpers for creating Atom instances that belong to one component
subtree. `make` returns a scoped atom with a provider, context, and `use`
accessor. Each provider creates its own Atom once, so different subtrees can
use the same scoped atom definition without sharing state.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [make](#make)
- [models](#models)
  - [ScopedAtom (interface)](#scopedatom-interface)
- [type IDs](#type-ids)
  - [TypeId](#typeid)
  - [TypeId (type alias)](#typeid-type-alias)

---

# constructors

## make

Creates a ScopedAtom from a factory function.

**When to use**

Use to create an atom instance that is owned by a React provider and scoped
to a component subtree.

**Details**

The returned scoped atom includes a `Provider`, `Context`, and `use`
accessor. The provider creates the atom once for its lifetime, passing the
`value` prop to the factory when the scoped atom expects input.

**Gotchas**

`use` must run under the matching provider. Changing the provider `value`
prop after mount does not recreate the atom.

**Example** (Creating a scoped atom with input)

```ts
import { make, useAtomValue } from "@effect/atom-react"
import { Atom } from "effect/unstable/reactivity"
import * as React from "react"

const User = make((name: string) => Atom.make(name))

function UserName() {
  const atom = User.use()
  const value = useAtomValue(atom)
  return React.createElement("span", null, value)
}

export function App() {
  return React.createElement(User.Provider, { value: "Ada" }, React.createElement(UserName))
}
```

**Signature**

```ts
declare const make: <A extends Atom.Atom<any>, Input = never>(
  f: (() => A) | ((input: Input) => A)
) => ScopedAtom<A, Input>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/atom/react/src/ScopedAtom.ts#L120)

Since v4.0.0

# models

## ScopedAtom (interface)

Scoped Atom interface with a provider-backed instance.

**Example** (Providing and reading a scoped atom)

```ts
import { make, useAtomValue } from "@effect/atom-react"
import { Atom } from "effect/unstable/reactivity"
import * as React from "react"

const Counter = make(() => Atom.make(0))

function View() {
  const atom = Counter.use()
  const value = useAtomValue(atom)
  return React.createElement("div", null, value)
}

export function App() {
  return React.createElement(Counter.Provider, null, React.createElement(View))
}
```

**Signature**

```ts
export interface ScopedAtom<A extends Atom.Atom<any>, Input = never> {
  readonly [TypeId]: TypeId
  use(): A
  Provider: [Input] extends [never]
    ? React.FC<{ readonly children?: React.ReactNode | undefined }>
    : React.FC<{ readonly children?: React.ReactNode | undefined; readonly value: Input }>
  Context: React.Context<A>
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/atom/react/src/ScopedAtom.ts#L66)

Since v4.0.0

# type IDs

## TypeId

Type identifier for ScopedAtom.

**Details**

Used as the computed property key and marker value stored on `ScopedAtom`
objects.

**Signature**

```ts
declare const TypeId: "~@effect/atom-react/ScopedAtom"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/atom/react/src/ScopedAtom.ts#L38)

Since v4.0.0

## TypeId (type alias)

Literal type used as the `ScopedAtom` type identifier.

**Details**

Used as the computed property key and marker value stored on `ScopedAtom`
objects.

**Signature**

```ts
type TypeId = "~@effect/atom-react/ScopedAtom"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/atom/react/src/ScopedAtom.ts#L25)

Since v4.0.0
