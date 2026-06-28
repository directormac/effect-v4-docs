---
title: Tracer.ts
nav_order: 125
parent: "effect"
---

## Tracer.ts overview

Defines the low-level tracing model used by Effect.

A span records the lifetime of an operation, including its name, parent,
attributes, links, annotations, sampling decision, kind, and completion
status. The module also defines the tracer service, parent-span context,
external span support, trace propagation settings, and the default in-memory
span implementation.

Since v2.0.0

---

## Exports Grouped by Category

- [constants](#constants)
  - [ParentSpanKey](#parentspankey)
- [constructors](#constructors)
  - [externalSpan](#externalspan)
  - [make](#make)
- [models](#models)
  - [AnySpan (type alias)](#anyspan-type-alias)
  - [EffectPrimitive (interface)](#effectprimitive-interface)
  - [ExternalSpan (interface)](#externalspan-interface)
  - [Span (interface)](#span-interface)
  - [SpanKind (type alias)](#spankind-type-alias)
  - [SpanLink (interface)](#spanlink-interface)
  - [SpanStatus (type alias)](#spanstatus-type-alias)
  - [Tracer (interface)](#tracer-interface)
- [native tracer](#native-tracer)
  - [NativeSpan (class)](#nativespan-class)
    - [end (method)](#end-method)
    - [attribute (method)](#attribute-method)
    - [event (method)](#event-method)
    - [addLinks (method)](#addlinks-method)
    - [\_tag (property)](#_tag-property)
    - [spanId (property)](#spanid-property)
    - [traceId (property)](#traceid-property)
    - [sampled (property)](#sampled-property)
    - [name (property)](#name-property)
    - [parent (property)](#parent-property)
    - [annotations (property)](#annotations-property)
    - [links (property)](#links-property)
    - [startTime (property)](#starttime-property)
    - [kind (property)](#kind-property)
    - [status (property)](#status-property)
    - [attributes (property)](#attributes-property)
    - [events (property)](#events-property)
- [options](#options)
  - [SpanOptions (interface)](#spanoptions-interface)
  - [SpanOptionsNoTrace (interface)](#spanoptionsnotrace-interface)
  - [TraceOptions (interface)](#traceoptions-interface)
- [references](#references)
  - [CurrentTraceLevel](#currenttracelevel)
  - [DisablePropagation](#disablepropagation)
  - [MinimumTraceLevel](#minimumtracelevel)
  - [Tracer](#tracer)
  - [TracerKey](#tracerkey)
- [services](#services)
  - [ParentSpan (class)](#parentspan-class)

---

# constants

## ParentSpanKey

Defines the string key for the parent-span context service.

**When to use**

Use when you need the raw context key for parent span lookup in lower-level
tracing code.

**Example** (Reading the parent span key)

```ts
import { Tracer } from "effect"

// The key used to identify parent spans in the context
console.log(Tracer.ParentSpanKey) // "effect/Tracer/ParentSpan"
```

**Signature**

```ts
declare const ParentSpanKey: "effect/Tracer/ParentSpan"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tracer.ts#L147)

Since v4.0.0

# constructors

## externalSpan

Creates an `ExternalSpan` from trace and span identifiers, defaulting
`sampled` to `true` and annotations to an empty context when they are not
provided.

**Example** (Creating an external span)

```ts
import { Effect, Tracer } from "effect"

// Create an external span from another tracing system
const span = Tracer.externalSpan({
  spanId: "span-abc-123",
  traceId: "trace-xyz-789",
  sampled: true
})

// Use the external span as a parent
const program = Effect.succeed("Hello").pipe(Effect.withSpan("child-operation", { parent: span }))
```

**Signature**

```ts
declare const externalSpan: (options: {
  readonly spanId: string
  readonly traceId: string
  readonly sampled?: boolean | undefined
  readonly annotations?: Context.Context<never> | undefined
}) => ExternalSpan
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tracer.ts#L447)

Since v2.0.0

## make

Creates a `Tracer` value from a tracer implementation object.

**When to use**

Use to create a custom tracing backend value that Effect can use when
creating spans.

**Details**

`make` returns the supplied implementation object unchanged. The object must
satisfy the `Tracer` contract, including a `span` method that returns a
`Span`.

**See**

- `Span` for the span values returned by tracer implementations

**Signature**

```ts
declare const make: (options: Tracer) => Tracer
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tracer.ts#L419)

Since v2.0.0

# models

## AnySpan (type alias)

A span value that can participate in tracing, either an Effect-managed
`Span` or an `ExternalSpan` propagated from another tracing system.

**Example** (Accepting any span)

```ts
import { Effect, Tracer } from "effect"

// Function that accepts any span type
const logSpan = (span: Tracer.AnySpan) => {
  console.log(`Span ID: ${span.spanId}, Trace ID: ${span.traceId}`)
  return Effect.succeed(span)
}

// Works with both Span and ExternalSpan
const externalSpan = Tracer.externalSpan({
  spanId: "span-123",
  traceId: "trace-456"
})
```

**Signature**

```ts
type AnySpan = Span | ExternalSpan
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tracer.ts#L125)

Since v2.0.0

## EffectPrimitive (interface)

A low-level Effect primitive that can be evaluated by a tracer-specific
context for the current fiber.

**Signature**

```ts
export interface EffectPrimitive<X> {
  [evaluate](this: EffectPrimitive<X>, fiber: Fiber<any, any>): X
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tracer.ts#L53)

Since v4.0.0

## ExternalSpan (interface)

Represents a span created outside Effect's tracer, carrying trace and span
identifiers, sampling state, and annotations so it can be used as a parent or
link in Effect tracing.

**Example** (Creating an external span value)

```ts
import { Context } from "effect"
import type { Tracer } from "effect"

// Create an external span from another tracing system
const externalSpan: Tracer.ExternalSpan = {
  _tag: "ExternalSpan",
  spanId: "span-abc-123",
  traceId: "trace-xyz-789",
  sampled: true,
  annotations: Context.empty()
}

console.log(`External span: ${externalSpan.spanId}`)
```

**Signature**

```ts
export interface ExternalSpan {
  readonly _tag: "ExternalSpan"
  readonly spanId: string
  readonly traceId: string
  readonly sampled: boolean
  readonly annotations: Context.Context<never>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tracer.ts#L196)

Since v2.0.0

## Span (interface)

A span created by an Effect tracer. It carries trace identity, parent,
annotations, attributes, links, sampling and kind information, lifecycle
status, and methods to end the span or add attributes, events, and links.

**Example** (Working with spans)

```ts
import { Context, Exit, Option } from "effect"
import type { Tracer } from "effect"

const attributes = new Map<string, unknown>()
const links: Array<Tracer.SpanLink> = []
let status: Tracer.SpanStatus = {
  _tag: "Started",
  startTime: 1_000_000_000n
}

const span: Tracer.Span = {
  _tag: "Span",
  name: "load-user",
  spanId: "span-1",
  traceId: "trace-1",
  parent: Option.none(),
  annotations: Context.empty(),
  get status() {
    return status
  },
  attributes,
  links,
  sampled: true,
  kind: "internal",
  end(endTime, exit) {
    status = { _tag: "Ended", startTime: status.startTime, endTime, exit }
  },
  attribute(key, value) {
    attributes.set(key, value)
  },
  event(name, startTime, eventAttributes = {}) {
    console.log(`${name} at ${startTime} with ${Object.keys(eventAttributes).length} attributes`)
  },
  addLinks(newLinks) {
    links.push(...newLinks)
  }
}

span.attribute("user.id", "123")
span.end(1_500_000_000n, Exit.succeed("user"))

console.log(span.name) // "load-user"
console.log(span.attributes.get("user.id")) // "123"
console.log(span.status._tag) // "Ended"
```

**Signature**

```ts
export interface Span {
  readonly _tag: "Span"
  readonly name: string
  readonly spanId: string
  readonly traceId: string
  readonly parent: Option.Option<AnySpan>
  readonly annotations: Context.Context<never>
  readonly status: SpanStatus
  readonly attributes: ReadonlyMap<string, unknown>
  readonly links: ReadonlyArray<SpanLink>
  readonly sampled: boolean
  readonly kind: SpanKind
  end(endTime: bigint, exit: Exit.Exit<unknown, unknown>): void
  attribute(key: string, value: unknown): void
  event(name: string, startTime: bigint, attributes?: Record<string, unknown>): void
  addLinks(links: ReadonlyArray<SpanLink>): void
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tracer.ts#L349)

Since v2.0.0

## SpanKind (type alias)

OpenTelemetry-style role describing the kind of operation represented by a
span: internal work, server handling, client calls, producing, or consuming.

**Example** (Configuring span kinds)

```ts
import { Effect } from "effect"
import type { Tracer } from "effect"

// Different span kinds for different operations
const serverSpan = Effect.withSpan("handle-request", {
  kind: "server" as Tracer.SpanKind
})

const clientSpan = Effect.withSpan("api-call", {
  kind: "client" as Tracer.SpanKind
})

const internalSpan = Effect.withSpan("internal-process", {
  kind: "internal" as Tracer.SpanKind
})
```

**Signature**

```ts
type SpanKind = "internal" | "server" | "client" | "producer" | "consumer"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tracer.ts#L290)

Since v3.1.0

## SpanLink (interface)

A relationship from one span to another span, with attributes describing the
relationship.

**Example** (Linking spans)

```ts
import { Effect, Tracer } from "effect"

// Create a span link to connect spans
const externalSpan = Tracer.externalSpan({
  spanId: "external-span-123",
  traceId: "trace-456"
})

const link: Tracer.SpanLink = {
  span: externalSpan,
  attributes: { "link.type": "follows-from", service: "external-api" }
}

const program = Effect.succeed("result").pipe(Effect.withSpan("linked-operation", { links: [link] }))
```

**Signature**

```ts
export interface SpanLink {
  readonly span: AnySpan
  readonly attributes: Readonly<Record<string, unknown>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tracer.ts#L395)

Since v2.0.0

## SpanStatus (type alias)

Lifecycle state of a span, where `Started` records the start time and
`Ended` records the start time, end time, and exit value with which the span
completed.

**Example** (Creating span statuses)

```ts
import { Exit } from "effect"
import type { Tracer } from "effect"

const startTime = 1_000_000_000n
const endTime = 1_500_000_000n

const startedStatus: Tracer.SpanStatus = {
  _tag: "Started",
  startTime
}

const endedStatus: Tracer.SpanStatus = {
  _tag: "Ended",
  startTime,
  endTime,
  exit: Exit.succeed("result")
}

console.log(startedStatus._tag) // "Started"
console.log(endedStatus.endTime - endedStatus.startTime) // 500000000n
```

**Signature**

```ts
type SpanStatus =
  | {
      _tag: "Started"
      startTime: bigint
    }
  | {
      _tag: "Ended"
      startTime: bigint
      endTime: bigint
      exit: Exit.Exit<unknown, unknown>
    }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tracer.ts#L90)

Since v2.0.0

## Tracer (interface)

A tracing backend used by Effect to create spans. Custom tracers implement
`span` to allocate a span from the supplied name, parent, annotations,
links, start time, kind, root flag, and sampling decision.

**Signature**

```ts
export interface Tracer {
  span(
    this: Tracer,
    options: {
      readonly name: string
      readonly parent: Option.Option<AnySpan>
      readonly annotations: Context.Context<never>
      readonly links: Array<SpanLink>
      readonly startTime: bigint
      readonly kind: SpanKind
      readonly root: boolean
      readonly sampled: boolean
    }
  ): Span
  readonly context?: (<X>(primitive: EffectPrimitive<X>, fiber: Fiber<any, any>) => X) | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tracer.ts#L28)

Since v2.0.0

# native tracer

## NativeSpan (class)

Default in-memory `Span` implementation used by the native tracer. It
generates span and trace identifiers, stores attributes, events, and links,
and records `Started` or `Ended` status.

**Details**

The constructor initializes the span with `Started` status, inherits the
parent trace id or generates a new one, and always generates a new span id.
Attributes, events, links, and status are then mutated through `Span` methods.

**See**

- `Span` for the interface implemented by native spans

**Signature**

```ts
declare class NativeSpan {
  constructor(options: {
    readonly name: string
    readonly parent: Option.Option<AnySpan>
    readonly annotations: Context.Context<never>
    readonly links: Array<SpanLink>
    readonly startTime: bigint
    readonly kind: SpanKind
    readonly sampled: boolean
  })
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tracer.ts#L608)

Since v4.0.0

### end (method)

**Signature**

```ts
declare const end: (endTime: bigint, exit: Exit.Exit<unknown, unknown>) => void
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tracer.ts#L650)

### attribute (method)

**Signature**

```ts
declare const attribute: (key: string, value: unknown) => void
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tracer.ts#L659)

### event (method)

**Signature**

```ts
declare const event: (name: string, startTime: bigint, attributes?: Record<string, unknown>) => void
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tracer.ts#L663)

### addLinks (method)

**Signature**

```ts
declare const addLinks: (links: ReadonlyArray<SpanLink>) => void
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tracer.ts#L667)

### \_tag (property)

**Signature**

```ts
readonly _tag: "Span"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tracer.ts#L609)

### spanId (property)

**Signature**

```ts
readonly spanId: string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tracer.ts#L610)

### traceId (property)

**Signature**

```ts
readonly traceId: string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tracer.ts#L611)

### sampled (property)

**Signature**

```ts
readonly sampled: boolean
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tracer.ts#L612)

### name (property)

**Signature**

```ts
readonly name: string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tracer.ts#L614)

### parent (property)

**Signature**

```ts
readonly parent: Option.Option<AnySpan>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tracer.ts#L615)

### annotations (property)

**Signature**

```ts
readonly annotations: Context.Context<never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tracer.ts#L616)

### links (property)

**Signature**

```ts
readonly links: Array<SpanLink>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tracer.ts#L617)

### startTime (property)

**Signature**

```ts
readonly startTime: bigint
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tracer.ts#L618)

### kind (property)

**Signature**

```ts
readonly kind: SpanKind
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tracer.ts#L619)

### status (property)

**Signature**

```ts
status: SpanStatus
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tracer.ts#L621)

### attributes (property)

**Signature**

```ts
attributes: Map<string, unknown>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tracer.ts#L622)

### events (property)

**Signature**

```ts
events: Array<[name: string, startTime: bigint, attributes: Record<string, unknown>]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tracer.ts#L623)

# options

## SpanOptions (interface)

Options accepted by span-creating APIs, combining span metadata such as
attributes, links, parent/root selection, kind, sampling, and trace level
with stack trace capture settings.

**Example** (Configuring span options)

```ts
import { Effect } from "effect"
import type { Tracer } from "effect"

// Create an effect with span options
const options: Tracer.SpanOptions = {
  attributes: { "user.id": "123", operation: "data-processing" },
  kind: "internal",
  root: false,
  captureStackTrace: true
}

const program = Effect.succeed("Hello World").pipe(Effect.withSpan("my-operation", options))
```

**Signature**

```ts
export interface SpanOptions extends SpanOptionsNoTrace, TraceOptions {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tracer.ts#L231)

Since v3.1.0

## SpanOptionsNoTrace (interface)

Span creation options that do not control stack trace capture, including
attributes, links, parent or root selection, annotations, span kind,
sampling, and the trace level used for filtering.

**Signature**

```ts
export interface SpanOptionsNoTrace {
  readonly attributes?: Record<string, unknown> | undefined
  readonly links?: ReadonlyArray<SpanLink> | undefined
  readonly parent?: AnySpan | undefined
  readonly root?: boolean | undefined
  readonly annotations?: Context.Context<never> | undefined
  readonly kind?: SpanKind | undefined
  readonly sampled?: boolean | undefined
  readonly level?: LogLevel | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tracer.ts#L241)

Since v4.0.0

## TraceOptions (interface)

Options that control stack trace capture for tracing wrappers.
`captureStackTrace` can disable capture or provide a lazy stack string.

**Signature**

```ts
export interface TraceOptions {
  readonly captureStackTrace?: boolean | LazyArg<string | undefined> | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tracer.ts#L259)

Since v4.0.0

# references

## CurrentTraceLevel

Context reference for controlling the current trace level for dynamic filtering.

**When to use**

Use to set the default trace level for spans in a scope when span options do
not provide `level`.

**Details**

The default value is `"Info"`. Span creation uses `options.level ??
CurrentTraceLevel` before applying `MinimumTraceLevel`.

**See**

- `MinimumTraceLevel` for the threshold that decides whether spans at that level are sampled

**Signature**

```ts
declare const CurrentTraceLevel: Context.Reference<LogLevel>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tracer.ts#L514)

Since v4.0.0

## DisablePropagation

Context reference for disabling trace propagation.

**When to use**

Use to prevent spans in a scope from propagating tracing context.

**Details**

When enabled on fiber or span annotations, new spans are created as
non-propagating no-op spans and disabled spans are skipped when deriving a
parent span.

**Example** (Disabling span propagation)

```ts
import { Effect, Tracer } from "effect"

// Disable span propagation for a specific effect
const program = Effect.gen(function* () {
  yield* Effect.log("This will not propagate parent span")
}).pipe(Effect.provideService(Tracer.DisablePropagation, true))
```

**Signature**

```ts
declare const DisablePropagation: Context.Reference<boolean>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tracer.ts#L491)

Since v3.12.0

## MinimumTraceLevel

Context reference for setting the minimum trace level threshold. Spans and their
descendants below this level will have their sampling decision forced to
false, preventing them from being exported.

**When to use**

Use to set the trace-level threshold that controls whether spans are sampled
by default.

**Details**

The default value is `"All"`. Span creation compares the span level from
`options.level ?? CurrentTraceLevel` against this threshold.

**Gotchas**

Explicit `options.sampled` bypasses threshold computation.

**See**

- `CurrentTraceLevel` for the default span level used when options do not specify one

**Signature**

```ts
declare const MinimumTraceLevel: Context.Reference<LogLevel>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tracer.ts#L543)

Since v4.0.0

## Tracer

Context reference for the active tracer service. By default it uses the
native tracer, which creates `NativeSpan` instances.

**Example** (Accessing the current tracer)

```ts
import { Effect, Tracer } from "effect"

// Access the current tracer from the context
const program = Effect.gen(function* () {
  const tracer = yield* Effect.service(Tracer.Tracer)
  console.log("Using current tracer")
})

// Or use the built-in tracer effect
const tracerEffect = Effect.gen(function* () {
  const tracer = yield* Effect.tracer
  console.log("Current tracer obtained")
})
```

**Signature**

```ts
declare const Tracer: Context.Reference<Tracer>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tracer.ts#L585)

Since v2.0.0

## TracerKey

Defines the string key for the active tracer context reference.

**When to use**

Use when you need the raw context key for active tracer lookup in lower-level
tracing code.

**Signature**

```ts
declare const TracerKey: "effect/Tracer"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tracer.ts#L558)

Since v4.0.0

# services

## ParentSpan (class)

Context service containing the `Span` or `ExternalSpan` to use as the parent
of newly-created child spans.

**Example** (Accessing the parent span)

```ts
import { Effect, Tracer } from "effect"

// Access the parent span from the context
const program = Effect.gen(function* () {
  const parentSpan = yield* Effect.service(Tracer.ParentSpan)
  console.log(`Parent span: ${parentSpan.spanId}`)
})
```

**Signature**

```ts
declare class ParentSpan
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Tracer.ts#L168)

Since v2.0.0
