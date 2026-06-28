---
title: ChildProcessSpawner.ts
nav_order: 300
parent: "effect"
---

## ChildProcessSpawner.ts overview

Service boundary for starting and controlling child processes.

`ChildProcessSpawner` is the service used by `ChildProcess` commands to start
operating-system processes. A spawner turns a command description into a
handle that can write to stdin, read stdout and stderr, wait for exit, kill
the process, and manage whether the process keeps its parent alive. Platform
backends implement this service, while most application code uses the higher
level `ChildProcess` module.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [ExitCode](#exitcode)
  - [ProcessId](#processid)
  - [makeHandle](#makehandle)
- [models](#models)
  - [ChildProcessHandle (interface)](#childprocesshandle-interface)
  - [ExitCode (type alias)](#exitcode-type-alias)
  - [ProcessId (type alias)](#processid-type-alias)
  - [Reref (type alias)](#reref-type-alias)
  - [make](#make)
- [services](#services)
  - [ChildProcessSpawner (class)](#childprocessspawner-class)

---

# constructors

## ExitCode

Constructs branded child process `ExitCode` values.

**Signature**

```ts
declare const ExitCode: Brand.Constructor<ExitCode>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ChildProcessSpawner.ts#L37)

Since v4.0.0

## ProcessId

Constructs branded child process `ProcessId` values.

**Signature**

```ts
declare const ProcessId: Brand.Constructor<ProcessId>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ChildProcessSpawner.ts#L54)

Since v4.0.0

## makeHandle

Constructs a new `ChildProcessHandle`.

**Signature**

```ts
declare const makeHandle: (params: Omit<ChildProcessHandle, typeof HandleTypeId>) => ChildProcessHandle
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ChildProcessSpawner.ts#L202)

Since v4.0.0

# models

## ChildProcessHandle (interface)

A handle to a running child process.

**Signature**

````ts
export interface ChildProcessHandle {
  readonly [HandleTypeId]: typeof HandleTypeId
  /**
   * The child process process identifier.
   */
  readonly pid: ProcessId
  /**
   * Waits for the child process to exit and returns the `ExitCode` of the
   * command that was run.
   */
  readonly exitCode: Effect.Effect<ExitCode, PlatformError.PlatformError>
  /**
   * Returns `true` if the child process is still running, otherwise returns
   * `false`.
   */
  readonly isRunning: Effect.Effect<boolean, PlatformError.PlatformError>
  /**
   * Kills the child process with the provided signal.
   *
   * **Details**
   *
   * If no signal option is provided, the signal defaults to `SIGTERM`.
   */
  readonly kill: (options?: KillOptions | undefined) => Effect.Effect<void, PlatformError.PlatformError>
  /**
   * The standard input sink for the child process.
   */
  readonly stdin: Sink.Sink<void, Uint8Array, never, PlatformError.PlatformError>
  /**
   * The standard output stream for the child process.
   *
   * **Gotchas**
   *
   * Using this stream alongside `all` may cause interleaving of output and
   * unexpected results.
   */
  readonly stdout: Stream.Stream<Uint8Array, PlatformError.PlatformError>
  /**
   * The standard error stream for the child process.
   *
   * **Gotchas**
   *
   * Using this stream alongside `all` may cause interleaving of output and
   * unexpected results.
   */
  readonly stderr: Stream.Stream<Uint8Array, PlatformError.PlatformError>
  /**
   * A stream which combines and interleaves all messages output by the child
   * process `stdout` and `stderr` streams.
   */
  readonly all: Stream.Stream<Uint8Array, PlatformError.PlatformError>
  /**
   * Get an input `Sink` for writing to a file descriptor configured via
   * `ChildProcessOptions.additionalFds`.
   *
   * **Details**
   *
   * If a file descriptor is accessed that was not configured, returns a drain
   * `Sink`.
   */
  readonly getInputFd: (fd: number) => Sink.Sink<void, Uint8Array, never, PlatformError.PlatformError>
  /**
   * Get an output `Stream` for reading from a file descriptor configured via
   * `ChildProcessOptions.additionalFds`.
   *
   * **Details**
   *
   * If a file descriptor is accessed that was not configured, returns an empty
   * `Stream`.
   */
  readonly getOutputFd: (fd: number) => Stream.Stream<Uint8Array, PlatformError.PlatformError>
  /**
   * Allows the parent process to exit independently of this child process.
   *
   * **Details**
   *
   * Running this `Effect` removes this child process from the parent process's
   * reference count, so the parent process is allowed to exit without waiting
   * for the child process to finish.
   *
   * The returned `Reref` effect adds the child process back into the parent
   * process's reference count when run, restoring the default behavior.
   *
   * **Gotchas**
   *
   * This is the only supported way to re-reference a child process after it
   * has been unrefed.
   *
   * **Example** (Temporarily unreferencing a child process)
   *
   * ```ts
   * import { Effect } from "effect"
   * import { NodeServices } from "@effect/platform-node"
   * import { ChildProcess } from "effect/unstable/process"
   *
   * const program = Effect.gen(function*() {
   *   const handle = yield* ChildProcess.make`./server`
   *   const reref = yield* handle.unref
   *
   *   yield* Effect.sleep("1 second")
   *
   *   yield* reref
   *   return yield* handle.exitCode
   * }).pipe(Effect.scoped, Effect.provide(NodeServices.layer))
   * ```
   */
  readonly unref: Effect.Effect<Reref, PlatformError.PlatformError>
}
````

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ChildProcessSpawner.ts#L79)

Since v4.0.0

## ExitCode (type alias)

Branded number representing the exit code reported by a child process.

**Signature**

```ts
type ExitCode = Brand.Branded<number, "ExitCode">
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ChildProcessSpawner.ts#L29)

Since v4.0.0

## ProcessId (type alias)

Branded number representing the operating system process identifier of a
child process.

**Signature**

```ts
type ProcessId = Brand.Branded<number, "ProcessId">
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ChildProcessSpawner.ts#L46)

Since v4.0.0

## Reref (type alias)

An `Effect` that adds an unrefed child process back into the parent
process's reference count.

**Details**

This value is returned by `ChildProcessHandle.unref` and can be run later to
restore the default behavior where the child process keeps the parent
process alive.

**Signature**

```ts
type Reref = Effect.Effect<void, PlatformError.PlatformError>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ChildProcessSpawner.ts#L69)

Since v4.0.0

## make

Creates a `ChildProcessSpawner` service from a `spawn` function, deriving
helpers for exit codes and output collection from that implementation.

**Signature**

```ts
declare const make: (spawn: ChildProcessSpawner["Service"]["spawn"]) => ChildProcessSpawner["Service"]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ChildProcessSpawner.ts#L212)

Since v4.0.0

# services

## ChildProcessSpawner (class)

Service tag for child process spawning.

**Signature**

```ts
declare class ChildProcessSpawner
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ChildProcessSpawner.ts#L241)

Since v4.0.0
