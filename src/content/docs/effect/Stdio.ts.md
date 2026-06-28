---
title: Stdio.ts
nav_order: 111
parent: "effect"
---

## Stdio.ts overview

Service contract for command-line arguments and standard input, output, and
error output. It lets programs depend on standard I/O through the Effect
environment instead of reading from or writing to global process handles
directly.

The service exposes arguments as an `Effect`, stdout and stderr as `Sink`s
that accept strings or bytes, and stdin as a byte `Stream`. This module also
provides a constructor for service values and a small test layer with
overridable defaults.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [make](#make)
- [layers](#layers)
  - [layerTest](#layertest)
- [models](#models)
  - [Stdio (interface)](#stdio-interface)
- [services](#services)
  - [Stdio](#stdio)
- [type IDs](#type-ids)
  - [TypeId](#typeid)
  - [TypeId (type alias)](#typeid-type-alias)

---

# constructors

## make

Creates a `Stdio` service implementation from the provided fields and
attaches the `Stdio` type identifier.

**When to use**

Use when you need to assemble a concrete `Stdio` service from command-line
arguments and standard I/O implementations.

**Details**

The returned service reuses the supplied fields unchanged and only adds the
`Stdio` type identifier; it does not create a `Layer` or provide defaults.

**See**

- `layerTest` for a test layer with default fields that can be overridden

**Signature**

```ts
declare const make: (options: Omit<Stdio, TypeId>) => Stdio
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stdio.ts#L109)

Since v4.0.0

# layers

## layerTest

Creates a test layer for `Stdio`.

**When to use**

Use to provide deterministic standard I/O in tests while overriding only the
command-line arguments, input stream, or output sinks relevant to the case.

**Details**

Any provided fields override defaults. By default, arguments are empty,
standard output and error are draining sinks, and standard input is an empty
stream.

**See**

- `make` for constructing a `Stdio` service directly without a `Layer` or defaults

**Signature**

```ts
declare const layerTest: (impl: Partial<Stdio>) => Layer.Layer<Stdio>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stdio.ts#L133)

Since v4.0.0

# models

## Stdio (interface)

Defines the service interface for process standard I/O.

**When to use**

Use to depend on command-line arguments and standard I/O through the Effect
environment.

**Details**

The service provides command-line arguments, sinks for standard output and
standard error, and a stream of standard input bytes. I/O operations can fail
with `PlatformError`.

**Signature**

```ts
export interface Stdio {
  readonly [TypeId]: TypeId
  readonly args: Effect.Effect<ReadonlyArray<string>>
  stdout(options?: {
    readonly endOnDone?: boolean | undefined
  }): Sink.Sink<void, string | Uint8Array, never, PlatformError>
  stderr(options?: {
    readonly endOnDone?: boolean | undefined
  }): Sink.Sink<void, string | Uint8Array, never, PlatformError>
  readonly stdin: Stream.Stream<Uint8Array, PlatformError>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stdio.ts#L63)

Since v4.0.0

# services

## Stdio

Service tag for process standard I/O.

**When to use**

Use when you need command-line arguments or standard I/O streams supplied by
an effect's environment.

**See**

- `make` for constructing a `Stdio` service directly
- `layerTest` for a test layer with defaults and overrides

**Signature**

```ts
declare const Stdio: Context.Service<Stdio, Stdio>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stdio.ts#L88)

Since v4.0.0

# type IDs

## TypeId

Runtime identifier stored on `Stdio` service implementations.

**Details**

This marker is part of the runtime representation of `Stdio` service
implementations.

**Signature**

```ts
declare const TypeId: "~effect/Stdio"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stdio.ts#L44)

Since v4.0.0

## TypeId (type alias)

String literal type used as the unique brand for the `Stdio` service.

**When to use**

Use to type the runtime identifier stored on `Stdio` service implementations.

**Signature**

```ts
type TypeId = "~effect/Stdio"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Stdio.ts#L31)

Since v4.0.0
