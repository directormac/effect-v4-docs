---
title: NodeTerminal.ts
nav_order: 13
parent: "@effect/platform-node-shared"
---

## NodeTerminal.ts overview

Shared Node.js implementation of Effect's `Terminal` service.

`NodeTerminal` adapts Node's `readline` APIs plus the current process
`stdin` and `stdout` streams into `Terminal.Terminal`. The service can
display output, read a line, stream key input, and read terminal dimensions.
`make` manages readline and TTY raw mode in a scope, while `layer` provides
the default service that ends key input on Ctrl+C or Ctrl+D.

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

Creates a scoped process-backed `Terminal` using Node `readline`, enabling
TTY raw mode while in scope and using the supplied predicate to decide when
key input should end.

**Signature**

```ts
declare const make: (
  shouldQuit?: (input: Terminal.UserInput) => boolean
) => Effect.Effect<Terminal.Terminal, never, Scope.Scope>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeTerminal.ts#L32)

Since v4.0.0

# layers

## layer

Provides the default process-backed `Terminal` service, ending key input on
Ctrl+C or Ctrl+D.

**Signature**

```ts
declare const layer: Layer.Layer<Terminal.Terminal, never, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeTerminal.ts#L125)

Since v4.0.0
