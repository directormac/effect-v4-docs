---
title: ErrorReporter.ts
nav_order: 29
parent: "effect"
---

## ErrorReporter.ts overview

Reports Effect failures to external code.

An `ErrorReporter` receives `Cause` values from `Effect.withErrorReporting`,
manual `report` calls, or built-in reporting boundaries. It forwards each
non-interruption error to a callback, so applications can send failures to
logging, monitoring, or error-tracking systems. This module also includes
layers for installing reporters and symbols for marking errors as ignored or
attaching severity and attributes.

Since v4.0.0

---

## Exports Grouped by Category

- [Reporting](#reporting)
  - [report](#report)
- [annotations](#annotations)
  - [Reportable (interface)](#reportable-interface)
  - [attributes](#attributes)
  - [attributes (type alias)](#attributes-type-alias)
  - [getAttributes](#getattributes)
  - [getSeverity](#getseverity)
  - [ignore](#ignore)
  - [ignore (type alias)](#ignore-type-alias)
  - [isIgnored](#isignored)
  - [severity](#severity)
  - [severity (type alias)](#severity-type-alias)
- [constructors](#constructors)
  - [make](#make)
- [layers](#layers)
  - [layer](#layer)
- [models](#models)
  - [ErrorReporter (interface)](#errorreporter-interface)
- [references](#references)
  - [CurrentErrorReporters](#currenterrorreporters)
- [type IDs](#type-ids)
  - [TypeId](#typeid)
  - [TypeId (type alias)](#typeid-type-alias)

---

# Reporting

## report

Runs all registered error reporters on the current fiber for a `Cause`.

**When to use**

Use to report a failure for observability without failing the current fiber.

**Example** (Reporting a cause manually)

```ts
import { Cause, Effect, ErrorReporter } from "effect"

// Log the cause for monitoring, then continue with a fallback
const program = Effect.gen(function* () {
  const cause = Cause.fail("something went wrong")
  yield* ErrorReporter.report(cause)
  return "fallback value"
})
```

**Signature**

```ts
declare const report: <E>(cause: Cause.Cause<E>) => Effect.Effect<void>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ErrorReporter.ts#L272)

Since v4.0.0

# annotations

## Reportable (interface)

Interface that object errors can implement to control reporting behavior.

**When to use**

Use as the annotation contract for object errors that customize how error
reporting handles them.

**Details**

All three annotation properties are optional: `[ErrorReporter.ignore]`
prevents reporting when set to `true`, `[ErrorReporter.severity]` overrides
the default `"Info"` severity, and `[ErrorReporter.attributes]` adds extra
key/value pairs forwarded to reporters. The global `Error` interface is
augmented with `Reportable`, so these properties are available on `Error`
instances at the type level.

**See**

- `ignore` for the runtime annotation key that suppresses reports
- `severity` for the runtime annotation key that overrides severity
- `attributes` for the runtime annotation key that attaches reporter
  metadata

**Signature**

```ts
export interface Reportable {
  readonly [ignore]?: boolean
  readonly [severity]?: Severity
  readonly [attributes]?: ReadonlyRecord<string, unknown>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ErrorReporter.ts#L303)

Since v4.0.0

## attributes

Defines the runtime property key used to attach extra key/value metadata to an object
error report.

**When to use**

Use to attach domain metadata to object errors so reporter callbacks receive
it with the reported failure.

**Details**

Set `error[ErrorReporter.attributes]` to a record of metadata that should be
forwarded to reporters alongside the error.

**Example** (Setting error attributes)

```ts
import { Data, ErrorReporter } from "effect"

class PaymentError extends Data.TaggedError("PaymentError")<{
  readonly orderId: string
}> {
  readonly [ErrorReporter.attributes] = {
    orderId: this.orderId
  }
}
```

**See**

- `ignore` for suppressing reports for expected object errors
- `severity` for overriding reporter severity
- `getAttributes` for reading the metadata stored under this key
- `Reportable` for the annotation contract recognized on object
  errors

**Signature**

```ts
declare const attributes: "~effect/ErrorReporter/attributes"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ErrorReporter.ts#L512)

Since v4.0.0

## attributes (type alias)

Defines the string property key used to attach extra key/value metadata to an object
error report.

**When to use**

Use to type the property key that attaches metadata to object error reports.

**Details**

Reporters receive these attributes alongside the error, making it easy to
include contextual information such as user IDs, request IDs, or other
domain-specific debugging data.

**Signature**

```ts
type attributes = "~effect/ErrorReporter/attributes"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ErrorReporter.ts#L473)

Since v4.0.0

## getAttributes

Reads the `ErrorReporter.attributes` annotation from an error object,
returning an empty record when unset.

**When to use**

Use to inspect the attributes that reporter callbacks will receive for an
object error.

**Details**

Returns the value stored under `ErrorReporter.attributes`, or the module's
shared empty record when the annotation is absent.

**Gotchas**

The annotation value is returned as-is; this helper does not validate or
clone it.

**See**

- `attributes` for the annotation key used to attach metadata
- `Reportable` for the annotation properties recognized on object errors

**Signature**

```ts
declare const getAttributes: (error: object) => ReadonlyRecord<string, unknown>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ErrorReporter.ts#L539)

Since v4.0.0

## getSeverity

Reads the `ErrorReporter.severity` annotation from an error object,
falling back to `"Info"` when the annotation is unset or invalid.

**When to use**

Use to inspect the severity that reporter callbacks will receive for an
object error.

**See**

- `severity` for the annotation key used to override severity
- `Reportable` for the annotation properties recognized on object errors

**Signature**

```ts
declare const getSeverity: (error: object) => Severity
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ErrorReporter.ts#L449)

Since v4.0.0

## ignore

Defines the runtime property key used to mark an object error as ignored by error
reporting.

**When to use**

Use to suppress reporting for expected object errors, such as HTTP 404
responses.

**Details**

Set `error[ErrorReporter.ignore]` to `true` to prevent the error from being
forwarded to reporters. This is useful for expected failures such as HTTP 404
responses.

**Example** (Marking errors as ignored)

```ts
import { Data, ErrorReporter } from "effect"

class NotFoundError extends Data.TaggedError("NotFoundError")<{}> {
  readonly [ErrorReporter.ignore] = true
}
```

**See**

- `isIgnored` for checking whether a value carries this annotation
- `Reportable` for the annotation contract recognized on object
  errors

**Signature**

```ts
declare const ignore: "~effect/ErrorReporter/ignore"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ErrorReporter.ts#L365)

Since v4.0.0

## ignore (type alias)

Defines the string property key used to mark an object error as ignored by error
reporting.

**When to use**

Use to type the property key that suppresses reporting for expected object
errors.

**Details**

Set this property to `true` on an error class or object error to prevent it
from being forwarded to reporters. This is useful for expected failures such
as HTTP 404 responses.

**Signature**

```ts
type ignore = "~effect/ErrorReporter/ignore"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ErrorReporter.ts#L331)

Since v4.0.0

## isIgnored

Returns `true` if the given value has the `ErrorReporter.ignore` annotation
set to `true`.

**When to use**

Use to check whether an error value is annotated to be skipped before
forwarding it to error reporting code.

**See**

- `ignore` for the annotation key this predicate reads

**Signature**

```ts
declare const isIgnored: (u: unknown) => boolean
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ErrorReporter.ts#L381)

Since v4.0.0

## severity

Defines the runtime property key used to override the severity level of an object error.

**When to use**

Use to annotate object errors with the severity reporter callbacks should
receive.

**Details**

Set `error[ErrorReporter.severity]` to a valid `LogLevel.Severity` value.
Missing or invalid values fall back to `"Info"`.

**Example** (Setting error severity annotations)

```ts
import { Data, ErrorReporter } from "effect"

class DeprecationWarning extends Data.TaggedError("DeprecationWarning")<{}> {
  readonly [ErrorReporter.severity] = "Warn" as const
}
```

**See**

- `getSeverity` for reading the severity stored under this key
- `Reportable` for the annotation contract recognized on object
  errors

**Signature**

```ts
declare const severity: "~effect/ErrorReporter/severity"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ErrorReporter.ts#L432)

Since v4.0.0

## severity (type alias)

Defines the string property key used to override the severity level of an object error.

**When to use**

Use to type the property key that overrides the reporting severity for object
errors.

**Details**

When set to a valid `LogLevel.Severity`, the reporter callback receives this
value as `severity`. Missing or invalid values fall back to `"Info"`.

**Signature**

```ts
type severity = "~effect/ErrorReporter/severity"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ErrorReporter.ts#L400)

Since v4.0.0

# constructors

## make

Creates an `ErrorReporter` from a callback.

**When to use**

Use to define how reported failures are forwarded to a logging, monitoring,
or error-tracking backend.

**Details**

The returned reporter automatically deduplicates causes and individual
errors (the same object is never reported twice), skips interruptions,
and resolves the `ignore`, `severity`, and `attributes` annotations on
each error before invoking your callback.

**Example** (Forwarding errors to the console)

```ts
import { ErrorReporter } from "effect"

// Forward every failure to the console
const consoleReporter = ErrorReporter.make(({ error, severity, attributes }) => {
  console.error(`[${severity}]`, error.message, attributes)
})
```

**See**

- `layer` for registering reporters in the environment
- `report` for manually reporting a `Cause`

**Signature**

```ts
declare const make: (
  report: (options: {
    readonly cause: Cause.Cause<unknown>
    readonly error: Error
    readonly attributes: ReadonlyRecord<string, unknown>
    readonly severity: Severity
    readonly fiber: Fiber.Fiber<unknown, unknown>
    readonly timestamp: bigint
  }) => void
) => ErrorReporter
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ErrorReporter.ts#L119)

Since v4.0.0

# layers

## layer

Creates a `Layer` that registers one or more `ErrorReporter`s.

**When to use**

Use to provide one or more error reporters to effects that perform error
reporting.

**Details**

Reporters can be plain `ErrorReporter` values or effectful
`Effect<ErrorReporter>` values that are resolved when the layer is built. By
default the provided reporters **replace** any previously registered
reporters. Set `mergeWithExisting: true` to add them alongside existing ones.

**Example** (Providing error reporters)

```ts
import { Effect, ErrorReporter } from "effect"

const consoleReporter = ErrorReporter.make(({ error, severity }) => {
  console.error(`[${severity}]`, error.message)
})

const metricsReporter = ErrorReporter.make(({ severity }) => {
  // increment an error counter by severity
})

// Replace all existing reporters
const ReporterLive = ErrorReporter.layer([consoleReporter, metricsReporter])

// Add to existing reporters instead of replacing
const ReporterMerged = ErrorReporter.layer([metricsReporter], { mergeWithExisting: true })

const program = Effect.fail("boom").pipe(Effect.withErrorReporting, Effect.provide(ReporterLive))
```

**See**

- `make` for creating an `ErrorReporter` from a callback
- `CurrentErrorReporters` for low-level access to the current reporters

**Signature**

```ts
declare const layer: <const Reporters extends ReadonlyArray<ErrorReporter | Effect.Effect<ErrorReporter, any, any>>>(
  reporters: Reporters,
  options?: { readonly mergeWithExisting?: boolean | undefined } | undefined
) => Layer.Layer<
  never,
  Reporters extends readonly [] ? never : Effect.Error<Reporters[number]>,
  Exclude<Reporters extends readonly [] ? never : Effect.Services<Reporters[number]>, Scope.Scope>
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ErrorReporter.ts#L223)

Since v4.0.0

# models

## ErrorReporter (interface)

An `ErrorReporter` receives reported failures and forwards them to an
external system such as a logging service or error tracker.

**When to use**

Use as the interface for custom reporters that forward reported Effect
failures to logging, monitoring, or error-tracking systems.

**Details**

Reporting is triggered by `Effect.withErrorReporting`,
`ErrorReporter.report`, or built-in boundaries in the HTTP and RPC server
modules. Use `make` to create a reporter; it handles deduplication
and per-error annotation extraction automatically.

**See**

- `make` for creating an `ErrorReporter` from a callback
- `layer` for registering reporters in the environment
- `report` for manually reporting a `Cause`
- `Effect.withErrorReporting` for reporting failures from an effect

**Signature**

```ts
export interface ErrorReporter {
  readonly [TypeId]: TypeId
  report(options: {
    readonly cause: Cause.Cause<unknown>
    readonly fiber: Fiber.Fiber<unknown, unknown>
    readonly timestamp: bigint
  }): void
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ErrorReporter.ts#L76)

Since v4.0.0

# references

## CurrentErrorReporters

Context reference that holds the set of active error reporters for the
current fiber. Defaults to an empty set (no reporting).

**When to use**

Use when you need to read or replace the current set of error reporters
directly.

**Signature**

```ts
declare const CurrentErrorReporters: Context.Reference<ReadonlySet<ErrorReporter>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ErrorReporter.ts#L169)

Since v4.0.0

# type IDs

## TypeId

Runtime type identifier attached to `ErrorReporter` values.

**Details**

This marker is part of the runtime representation of `ErrorReporter`
implementations. Most code should create reporters with `make` and register
them with `layer`.

**Signature**

```ts
declare const TypeId: "~effect/ErrorReporter"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ErrorReporter.ts#L50)

Since v4.0.0

## TypeId (type alias)

String literal type used as the runtime type identifier for
`ErrorReporter` values.

**When to use**

Use to refer to the runtime type identifier type in low-level integrations.

**Signature**

```ts
type TypeId = "~effect/ErrorReporter"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ErrorReporter.ts#L36)

Since v4.0.0
