---
title: BunTerminal.ts
nav_order: 20
parent: "@effect/platform-bun"
---

## BunTerminal.ts overview

Bun-backed implementation of Effect's `Terminal` service.

This module reuses the shared Node terminal implementation for Bun. `make`
creates a scoped process-backed `Terminal` service, and `layer` provides the
default terminal service with the standard quit behavior for key input.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [make](#make)
- [layers](#layers)
  - [layer](#layer)

---

# constructors

## make

Creates a scoped `Terminal` service backed by process stdin/stdout, using the
optional predicate to decide when key input should end the input stream.

**Signature**

```ts
declare const make: (shouldQuit?: (input: UserInput) => boolean) => Effect<Terminal, never, Scope>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-bun/src/BunTerminal.ts#L23)

Since v4.0.0

# layers

## layer

Provides the default process-backed `Terminal` service, ending key input on
the default quit keys.

**Signature**

```ts
declare const layer: Layer<Terminal, never, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-bun/src/BunTerminal.ts#L32)

Since v4.0.0
