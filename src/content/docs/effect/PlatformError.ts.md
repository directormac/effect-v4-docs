---
title: PlatformError.ts
nav_order: 74
parent: "effect"
---

## PlatformError.ts overview

Normalized errors for platform APIs.

Platform services such as file systems, terminals, and sockets use
`PlatformError` to report host-level failures in a consistent shape. The
wrapper records whether the problem came from an invalid argument or from the
operating system, while preserving useful details such as the module, method,
path, descriptor, description, and original cause when available.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [badArgument](#badargument)
  - [systemError](#systemerror)
- [models](#models)
  - [BadArgument (class)](#badargument-class)
  - [PlatformError (class)](#platformerror-class)
    - [[TypeId] (property)](#typeid-property)
  - [SystemError (class)](#systemerror-class)
  - [SystemErrorTag (type alias)](#systemerrortag-type-alias)

---

# constructors

## badArgument

Creates a `PlatformError` whose reason is a `BadArgument`.

**When to use**

Use to report a platform API rejecting caller input before performing the
underlying operation.

**Signature**

```ts
declare const badArgument: (options: {
  readonly module: string
  readonly method: string
  readonly description?: string | undefined
  readonly cause?: unknown
}) => PlatformError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PlatformError.ts#L216)

Since v4.0.0

## systemError

Creates a `PlatformError` whose reason is a `SystemError`.

**When to use**

Use to adapt an operating-system or platform failure into the normalized
platform error model.

**Signature**

```ts
declare const systemError: (options: {
  readonly _tag: SystemErrorTag
  readonly module: string
  readonly method: string
  readonly description?: string | undefined
  readonly syscall?: string | undefined
  readonly pathOrDescriptor?: string | number | undefined
  readonly cause?: unknown
}) => PlatformError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PlatformError.ts#L195)

Since v4.0.0

# models

## BadArgument (class)

Error data for an invalid argument passed to a platform API.

**When to use**

Use when you need to model caller input rejected before a platform operation
runs, including invalid-argument reason data.

**Details**

The error records the module and method that rejected the argument, with an
optional description and cause. It is usually wrapped in `PlatformError`.

**See**

- `badArgument` for creating a wrapped `PlatformError` whose reason is `BadArgument`
- `SystemError` for failures reported by the host platform or operating system
- `PlatformError` for the wrapper used by most platform APIs

**Signature**

```ts
declare class BadArgument
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PlatformError.ts#L36)

Since v4.0.0

## PlatformError (class)

Tagged error used by platform APIs to report either invalid arguments or
system-level failures.

**When to use**

Use as the shared error type for platform APIs that expose invalid arguments
and host or operating-system failures through a single `Effect` error
channel.

**Details**

The `reason` field contains the underlying `BadArgument` or `SystemError`.
When that reason has a cause, the cause is preserved on the wrapper.

**See**

- `BadArgument` for invalid inputs rejected before an operation runs
- `SystemError` for failures reported by the host platform or operating system
- `badArgument` for creating this wrapper from rejected caller input
- `systemError` for creating this wrapper from a host or operating-system failure

**Signature**

```ts
declare class PlatformError {
  constructor(reason: BadArgument | SystemError)
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PlatformError.ts#L157)

Since v4.0.0

### [TypeId] (property)

Marks this value as a platform error wrapper for runtime guards.

**When to use**

Use to identify `PlatformError` values through their runtime type marker.

**Signature**

```ts
readonly [TypeId]: "~effect/platform/PlatformError"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PlatformError.ts#L177)

Since v4.0.0

## SystemError (class)

Error data for a platform or system operation failure.

**When to use**

Use when you need normalized reason data for a platform or system operation
failure, including the operation details.

**Details**

The error records a normalized `_tag`, the module and method that failed,
and optional details such as the syscall, path or descriptor, description,
and original cause. It is usually wrapped in `PlatformError`.

**See**

- `systemError` for creating the usual `PlatformError` wrapper from this reason data
- `BadArgument` for platform API failures caused by rejected caller input before an operation runs
- `SystemErrorTag` for the normalized tag values stored in `_tag`

**Signature**

```ts
declare class SystemError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PlatformError.ts#L109)

Since v4.0.0

## SystemErrorTag (type alias)

Normalized category for failures reported by platform or system operations.

**When to use**

Use to type or match the normalized `_tag` on `SystemError` values reported
by platform operations.

**Details**

The tags group lower-level platform errors into a stable set such as
`NotFound`, `PermissionDenied`, `TimedOut`, and `Unknown`.

**See**

- `SystemError` for the error data that carries this tag on its `_tag` field
- `systemError` for creating a `PlatformError` from a system failure with one of these tags

**Signature**

```ts
type SystemErrorTag =
  | "AlreadyExists"
  | "BadResource"
  | "Busy"
  | "InvalidData"
  | "NotFound"
  | "PermissionDenied"
  | "TimedOut"
  | "UnexpectedEof"
  | "Unknown"
  | "WouldBlock"
  | "WriteZero"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PlatformError.ts#L75)

Since v4.0.0
