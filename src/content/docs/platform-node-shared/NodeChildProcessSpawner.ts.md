---
title: NodeChildProcessSpawner.ts
nav_order: 2
parent: "@effect/platform-node-shared"
---

## NodeChildProcessSpawner.ts overview

Shared Node.js implementation of the child process spawner service.

This module adapts `node:child_process.spawn` to the Effect
`ChildProcessSpawner` service. Provide `layer` to run `ChildProcess`
commands in Node-compatible runtimes: commands get scoped process handles
with stdin sinks, stdout and stderr streams, exit-code waiting,
interruption-time cleanup, process killing, and custom file-descriptor pipes.

The implementation sits below the command-building API. It validates and
resolves `cwd` through the Effect `FileSystem` and `Path` services,
translates Node errno failures to `PlatformError`, and uses scopes to
terminate referenced children when the owning effect is interrupted or
finalized. Pipelines are flattened by `flattenCommand` and spawned one
process at a time, wiring the selected source stream (`stdout`, `stderr`,
`all`, or `fdN`) to the destination `stdin` or `fdN`.

Since v4.0.0

---

## Exports Grouped by Category

- [layers](#layers)
  - [layer](#layer)
- [models](#models)
  - [FlattenedPipeline (interface)](#flattenedpipeline-interface)
- [transforming](#transforming)
  - [flattenCommand](#flattencommand)

---

# layers

## layer

Layer that provides the `NodeChildProcessSpawner` implementation.

**Signature**

```ts
declare const layer: Layer.Layer<ChildProcessSpawner, never, Path.Path | FileSystem.FileSystem>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeChildProcessSpawner.ts#L647)

Since v4.0.0

# models

## FlattenedPipeline (interface)

Result of flattening a pipeline of commands.

**Signature**

```ts
export interface FlattenedPipeline {
  readonly commands: Arr.NonEmptyReadonlyArray<ChildProcess.StandardCommand>
  readonly pipeOptions: ReadonlyArray<ChildProcess.PipeOptions>
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeChildProcessSpawner.ts#L663)

Since v4.0.0

# transforming

## flattenCommand

Flattens a `Command` into an array of `StandardCommand`s along with pipe
options for each connection.

**Signature**

```ts
declare const flattenCommand: (command: ChildProcess.Command) => FlattenedPipeline
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeChildProcessSpawner.ts#L675)

Since v4.0.0
