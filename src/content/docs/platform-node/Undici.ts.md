---
title: Undici.ts
nav_order: 26
parent: "@effect/platform-node"
---

## Undici.ts overview

Re-export of the Undici HTTP client package used by the Node platform.

This module gives Effect applications a package-local import for Undici
primitives while working with `@effect/platform-node`. Import named Undici
APIs from here when configuring Node HTTP client dispatchers, creating agents
or mock agents, setting the process-global dispatcher, or sharing the same
Undici types with integrations that use the platform HTTP client.

The module does not wrap or reinterpret Undici behavior. It forwards the
installed `undici` named exports and default export, so connection pooling,
dispatcher lifetimes, mocking, aborts, and request options follow Undici's
own semantics.

Since v4.0.0

---

## Exports Grouped by Category

- [Undici](#undici)
  - ["undici" (namespace export)](#undici-namespace-export)

---

# Undici

## "undici" (namespace export)

Re-exports all named exports from the "undici" module.

**Signature**

```ts
export * from "undici"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/Undici.ts#L23)

Since v4.0.0
