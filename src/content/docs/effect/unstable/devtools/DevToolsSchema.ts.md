---
title: DevToolsSchema.ts
nav_order: 213
parent: "effect"
---

## DevToolsSchema.ts overview

Defines the experimental wire schema used by the Effect devtools protocol.

The module contains the serialized message shapes exchanged between devtools
clients and servers: span snapshots, span events, metric snapshots,
heartbeats, and request/response unions. Use these schemas at protocol
boundaries to encode, decode, or validate custom transports that need to
interoperate with the built-in unstable devtools client and server.

Since v4.0.0

---

## Exports Grouped by Category

- [schemas](#schemas)
  - [Counter](#counter)
  - [Counter (type alias)](#counter-type-alias)
  - [ExternalSpan](#externalspan)
  - [ExternalSpan (interface)](#externalspan-interface)
  - [Frequency](#frequency)
  - [Frequency (type alias)](#frequency-type-alias)
  - [Gauge](#gauge)
  - [Gauge (type alias)](#gauge-type-alias)
  - [Histogram](#histogram)
  - [Histogram (type alias)](#histogram-type-alias)
  - [Metric](#metric)
  - [Metric (type alias)](#metric-type-alias)
  - [MetricLabel](#metriclabel)
  - [MetricLabel (type alias)](#metriclabel-type-alias)
  - [MetricsRequest](#metricsrequest)
  - [MetricsRequest (type alias)](#metricsrequest-type-alias)
  - [MetricsSnapshot](#metricssnapshot)
  - [MetricsSnapshot (type alias)](#metricssnapshot-type-alias)
  - [ParentSpan](#parentspan)
  - [ParentSpan (type alias)](#parentspan-type-alias)
  - [Ping](#ping)
  - [Ping (type alias)](#ping-type-alias)
  - [Pong](#pong)
  - [Pong (type alias)](#pong-type-alias)
  - [Request](#request)
  - [Request (type alias)](#request-type-alias)
  - [Response](#response)
  - [Response (type alias)](#response-type-alias)
  - [Span](#span)
  - [Span (interface)](#span-interface)
  - [SpanEvent](#spanevent)
  - [SpanEvent (type alias)](#spanevent-type-alias)
  - [SpanStatus](#spanstatus)
  - [SpanStatus (type alias)](#spanstatus-type-alias)
  - [SpanStatusEnded](#spanstatusended)
  - [SpanStatusEnded (type alias)](#spanstatusended-type-alias)
  - [SpanStatusStarted](#spanstatusstarted)
  - [SpanStatusStarted (type alias)](#spanstatusstarted-type-alias)
  - [Summary](#summary)
  - [Summary (type alias)](#summary-type-alias)
- [utils](#utils)
  - [Request (namespace)](#request-namespace)
    - [WithoutPing (type alias)](#withoutping-type-alias)
  - [Response (namespace)](#response-namespace)
    - [WithoutPong (type alias)](#withoutpong-type-alias)

---

# schemas

## Counter

Schema for a counter metric snapshot, including the count and whether updates
are incremental.

**Signature**

```ts
declare const Counter: Schema.Struct<{
  readonly id: Schema.String
  readonly type: Schema.tag<"Counter">
  readonly description: Schema.UndefinedOr<Schema.String>
  readonly attributes: Schema.UndefinedOr<Schema.$Record<Schema.String, Schema.String>>
  readonly state: Schema.Struct<{
    readonly count: Schema.Union<readonly [Schema.Number, Schema.BigInt]>
    readonly incremental: Schema.Boolean
  }>
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DevToolsSchema.ts#L280)

Since v4.0.0

## Counter (type alias)

Type of a devtools counter metric snapshot.

**Details**

The state contains the current count and whether the counter reports
incremental updates.

**Signature**

```ts
type Counter = Schema.Schema.Type<typeof Counter>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DevToolsSchema.ts#L299)

Since v4.0.0

## ExternalSpan

Schema for an external parent span context containing span id, trace id, and
sampling flag.

**Signature**

```ts
declare const ExternalSpan: Schema.Codec<ExternalSpan, ExternalSpan, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DevToolsSchema.ts#L107)

Since v4.0.0

## ExternalSpan (interface)

Serialized parent span context for a span created outside the current
devtools span tree.

**Signature**

```ts
export interface ExternalSpan {
  readonly _tag: "ExternalSpan"
  readonly spanId: string
  readonly traceId: string
  readonly sampled: boolean
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DevToolsSchema.ts#L93)

Since v4.0.0

## Frequency

Schema for a devtools frequency metric snapshot.

**Details**

The metric state records occurrence counts by string key.

**Signature**

```ts
declare const Frequency: Schema.Struct<{
  readonly id: Schema.String
  readonly type: Schema.tag<"Frequency">
  readonly description: Schema.UndefinedOr<Schema.String>
  readonly attributes: Schema.UndefinedOr<Schema.$Record<Schema.String, Schema.String>>
  readonly state: Schema.Struct<{ readonly occurrences: Schema.$ReadonlyMap<Schema.String, Schema.Number> }>
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DevToolsSchema.ts#L311)

Since v4.0.0

## Frequency (type alias)

Type of a devtools frequency metric snapshot.

**Details**

The state maps observed string values to occurrence counts.

**Signature**

```ts
type Frequency = Schema.Schema.Type<typeof Frequency>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DevToolsSchema.ts#L328)

Since v4.0.0

## Gauge

Schema for a devtools gauge metric snapshot.

**Details**

The metric state contains the current numeric or bigint value.

**Signature**

```ts
declare const Gauge: Schema.Struct<{
  readonly id: Schema.String
  readonly type: Schema.tag<"Gauge">
  readonly description: Schema.UndefinedOr<Schema.String>
  readonly attributes: Schema.UndefinedOr<Schema.$Record<Schema.String, Schema.String>>
  readonly state: Schema.Struct<{ readonly value: Schema.Union<readonly [Schema.Number, Schema.BigInt]> }>
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DevToolsSchema.ts#L340)

Since v4.0.0

## Gauge (type alias)

Type of a devtools gauge metric snapshot.

**Details**

The state contains the current numeric or bigint value.

**Signature**

```ts
type Gauge = Schema.Schema.Type<typeof Gauge>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DevToolsSchema.ts#L357)

Since v4.0.0

## Histogram

Schema for a devtools histogram metric snapshot.

**Details**

The metric state includes bucket counts plus the total count, minimum,
maximum, and sum.

**Signature**

```ts
declare const Histogram: Schema.Struct<{
  readonly id: Schema.String
  readonly type: Schema.tag<"Histogram">
  readonly description: Schema.UndefinedOr<Schema.String>
  readonly attributes: Schema.UndefinedOr<Schema.$Record<Schema.String, Schema.String>>
  readonly state: Schema.Struct<{
    readonly buckets: Schema.$Array<Schema.Tuple<readonly [Schema.Number, Schema.Number]>>
    readonly count: Schema.Number
    readonly min: Schema.Number
    readonly max: Schema.Number
    readonly sum: Schema.Number
  }>
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DevToolsSchema.ts#L370)

Since v4.0.0

## Histogram (type alias)

Type of a devtools histogram metric snapshot.

**Details**

The state includes bucket counts plus the total count, minimum, maximum, and
sum.

**Signature**

```ts
type Histogram = Schema.Schema.Type<typeof Histogram>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DevToolsSchema.ts#L392)

Since v4.0.0

## Metric

Schema for any devtools metric snapshot.

**Details**

Accepted metric kinds are counters, frequencies, gauges, histograms, and
summaries.

**Signature**

```ts
declare const Metric: Schema.Union<
  readonly [
    Schema.Struct<{
      readonly id: Schema.String
      readonly type: Schema.tag<"Counter">
      readonly description: Schema.UndefinedOr<Schema.String>
      readonly attributes: Schema.UndefinedOr<Schema.$Record<Schema.String, Schema.String>>
      readonly state: Schema.Struct<{
        readonly count: Schema.Union<readonly [Schema.Number, Schema.BigInt]>
        readonly incremental: Schema.Boolean
      }>
    }>,
    Schema.Struct<{
      readonly id: Schema.String
      readonly type: Schema.tag<"Frequency">
      readonly description: Schema.UndefinedOr<Schema.String>
      readonly attributes: Schema.UndefinedOr<Schema.$Record<Schema.String, Schema.String>>
      readonly state: Schema.Struct<{ readonly occurrences: Schema.$ReadonlyMap<Schema.String, Schema.Number> }>
    }>,
    Schema.Struct<{
      readonly id: Schema.String
      readonly type: Schema.tag<"Gauge">
      readonly description: Schema.UndefinedOr<Schema.String>
      readonly attributes: Schema.UndefinedOr<Schema.$Record<Schema.String, Schema.String>>
      readonly state: Schema.Struct<{ readonly value: Schema.Union<readonly [Schema.Number, Schema.BigInt]> }>
    }>,
    Schema.Struct<{
      readonly id: Schema.String
      readonly type: Schema.tag<"Histogram">
      readonly description: Schema.UndefinedOr<Schema.String>
      readonly attributes: Schema.UndefinedOr<Schema.$Record<Schema.String, Schema.String>>
      readonly state: Schema.Struct<{
        readonly buckets: Schema.$Array<Schema.Tuple<readonly [Schema.Number, Schema.Number]>>
        readonly count: Schema.Number
        readonly min: Schema.Number
        readonly max: Schema.Number
        readonly sum: Schema.Number
      }>
    }>,
    Schema.Struct<{
      readonly id: Schema.String
      readonly type: Schema.tag<"Summary">
      readonly description: Schema.UndefinedOr<Schema.String>
      readonly attributes: Schema.UndefinedOr<Schema.$Record<Schema.String, Schema.String>>
      readonly state: Schema.Struct<{
        readonly quantiles: Schema.$Array<Schema.Tuple<readonly [Schema.Number, Schema.UndefinedOr<Schema.Number>]>>
        readonly count: Schema.Number
        readonly min: Schema.Number
        readonly max: Schema.Number
        readonly sum: Schema.Number
      }>
    }>
  ]
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DevToolsSchema.ts#L440)

Since v4.0.0

## Metric (type alias)

Type of any devtools metric snapshot.

**Details**

The union covers counters, frequencies, gauges, histograms, and summaries.

**Signature**

```ts
type Metric = Schema.Schema.Type<typeof Metric>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DevToolsSchema.ts#L452)

Since v4.0.0

## MetricLabel

Schema for a metric label key/value pair in a devtools metrics snapshot.

**Signature**

```ts
declare const MetricLabel: Schema.Struct<{ readonly key: Schema.String; readonly value: Schema.String }>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DevToolsSchema.ts#L251)

Since v4.0.0

## MetricLabel (type alias)

Type of a metric label key/value pair in a devtools metrics snapshot.

**Signature**

```ts
type MetricLabel = Schema.Schema.Type<typeof MetricLabel>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DevToolsSchema.ts#L262)

Since v4.0.0

## MetricsRequest

Schema for a devtools request asking the client to send a metrics snapshot.

**Signature**

```ts
declare const MetricsRequest: Schema.Struct<{ readonly _tag: Schema.tag<"MetricsRequest"> }>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DevToolsSchema.ts#L233)

Since v4.0.0

## MetricsRequest (type alias)

Type of a devtools request asking the client to send a metrics snapshot.

**Signature**

```ts
type MetricsRequest = Schema.Schema.Type<typeof MetricsRequest>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DevToolsSchema.ts#L243)

Since v4.0.0

## MetricsSnapshot

Schema for a devtools protocol message containing the current metric
snapshots.

**Signature**

```ts
declare const MetricsSnapshot: Schema.Struct<{
  readonly _tag: Schema.tag<"MetricsSnapshot">
  readonly metrics: Schema.$Array<
    Schema.Union<
      readonly [
        Schema.Struct<{
          readonly id: Schema.String
          readonly type: Schema.tag<"Counter">
          readonly description: Schema.UndefinedOr<Schema.String>
          readonly attributes: Schema.UndefinedOr<Schema.$Record<Schema.String, Schema.String>>
          readonly state: Schema.Struct<{
            readonly count: Schema.Union<readonly [Schema.Number, Schema.BigInt]>
            readonly incremental: Schema.Boolean
          }>
        }>,
        Schema.Struct<{
          readonly id: Schema.String
          readonly type: Schema.tag<"Frequency">
          readonly description: Schema.UndefinedOr<Schema.String>
          readonly attributes: Schema.UndefinedOr<Schema.$Record<Schema.String, Schema.String>>
          readonly state: Schema.Struct<{ readonly occurrences: Schema.$ReadonlyMap<Schema.String, Schema.Number> }>
        }>,
        Schema.Struct<{
          readonly id: Schema.String
          readonly type: Schema.tag<"Gauge">
          readonly description: Schema.UndefinedOr<Schema.String>
          readonly attributes: Schema.UndefinedOr<Schema.$Record<Schema.String, Schema.String>>
          readonly state: Schema.Struct<{ readonly value: Schema.Union<readonly [Schema.Number, Schema.BigInt]> }>
        }>,
        Schema.Struct<{
          readonly id: Schema.String
          readonly type: Schema.tag<"Histogram">
          readonly description: Schema.UndefinedOr<Schema.String>
          readonly attributes: Schema.UndefinedOr<Schema.$Record<Schema.String, Schema.String>>
          readonly state: Schema.Struct<{
            readonly buckets: Schema.$Array<Schema.Tuple<readonly [Schema.Number, Schema.Number]>>
            readonly count: Schema.Number
            readonly min: Schema.Number
            readonly max: Schema.Number
            readonly sum: Schema.Number
          }>
        }>,
        Schema.Struct<{
          readonly id: Schema.String
          readonly type: Schema.tag<"Summary">
          readonly description: Schema.UndefinedOr<Schema.String>
          readonly attributes: Schema.UndefinedOr<Schema.$Record<Schema.String, Schema.String>>
          readonly state: Schema.Struct<{
            readonly quantiles: Schema.$Array<Schema.Tuple<readonly [Schema.Number, Schema.UndefinedOr<Schema.Number>]>>
            readonly count: Schema.Number
            readonly min: Schema.Number
            readonly max: Schema.Number
            readonly sum: Schema.Number
          }>
        }>
      ]
    >
  >
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DevToolsSchema.ts#L461)

Since v4.0.0

## MetricsSnapshot (type alias)

Type of a devtools protocol message containing the current metric snapshots.

**Signature**

```ts
type MetricsSnapshot = Schema.Schema.Type<typeof MetricsSnapshot>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DevToolsSchema.ts#L472)

Since v4.0.0

## ParentSpan

Schema for a span parent, either a full devtools `Span` payload or an
`ExternalSpan` context.

**Signature**

```ts
declare const ParentSpan: Schema.Union<
  readonly [Schema.Codec<Span, Span, never, never>, Schema.Codec<ExternalSpan, ExternalSpan, never, never>]
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DevToolsSchema.ts#L189)

Since v4.0.0

## ParentSpan (type alias)

Type of a span parent, represented either by a devtools `Span` payload or an
`ExternalSpan` context.

**Signature**

```ts
type ParentSpan = Span | ExternalSpan
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DevToolsSchema.ts#L180)

Since v4.0.0

## Ping

Schema for the devtools heartbeat request sent by the client.

**Signature**

```ts
declare const Ping: Schema.Struct<{ readonly _tag: Schema.tag<"Ping"> }>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DevToolsSchema.ts#L197)

Since v4.0.0

## Ping (type alias)

Type of the devtools heartbeat request sent by the client.

**Signature**

```ts
type Ping = Schema.Schema.Type<typeof Ping>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DevToolsSchema.ts#L207)

Since v4.0.0

## Pong

Schema for the devtools heartbeat response.

**Signature**

```ts
declare const Pong: Schema.Struct<{ readonly _tag: Schema.tag<"Pong"> }>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DevToolsSchema.ts#L215)

Since v4.0.0

## Pong (type alias)

Type of the devtools heartbeat response.

**Signature**

```ts
type Pong = Schema.Schema.Type<typeof Pong>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DevToolsSchema.ts#L225)

Since v4.0.0

## Request

Schema for devtools protocol requests accepted by the server.

**Details**

Requests include heartbeat pings, spans, span events, and metric snapshots.

**Signature**

```ts
declare const Request: Schema.Union<
  readonly [
    Schema.Struct<{ readonly _tag: Schema.tag<"Ping"> }>,
    Schema.Codec<Span, Span, never, never>,
    Schema.Struct<{
      readonly _tag: Schema.tag<"SpanEvent">
      readonly traceId: Schema.String
      readonly spanId: Schema.String
      readonly name: Schema.String
      readonly startTime: Schema.BigInt
      readonly attributes: Schema.UndefinedOr<Schema.$Record<Schema.String, Schema.Any>>
    }>,
    Schema.Struct<{
      readonly _tag: Schema.tag<"MetricsSnapshot">
      readonly metrics: Schema.$Array<
        Schema.Union<
          readonly [
            Schema.Struct<{
              readonly id: Schema.String
              readonly type: Schema.tag<"Counter">
              readonly description: Schema.UndefinedOr<Schema.String>
              readonly attributes: Schema.UndefinedOr<Schema.$Record<Schema.String, Schema.String>>
              readonly state: Schema.Struct<{
                readonly count: Schema.Union<readonly [Schema.Number, Schema.BigInt]>
                readonly incremental: Schema.Boolean
              }>
            }>,
            Schema.Struct<{
              readonly id: Schema.String
              readonly type: Schema.tag<"Frequency">
              readonly description: Schema.UndefinedOr<Schema.String>
              readonly attributes: Schema.UndefinedOr<Schema.$Record<Schema.String, Schema.String>>
              readonly state: Schema.Struct<{ readonly occurrences: Schema.$ReadonlyMap<Schema.String, Schema.Number> }>
            }>,
            Schema.Struct<{
              readonly id: Schema.String
              readonly type: Schema.tag<"Gauge">
              readonly description: Schema.UndefinedOr<Schema.String>
              readonly attributes: Schema.UndefinedOr<Schema.$Record<Schema.String, Schema.String>>
              readonly state: Schema.Struct<{ readonly value: Schema.Union<readonly [Schema.Number, Schema.BigInt]> }>
            }>,
            Schema.Struct<{
              readonly id: Schema.String
              readonly type: Schema.tag<"Histogram">
              readonly description: Schema.UndefinedOr<Schema.String>
              readonly attributes: Schema.UndefinedOr<Schema.$Record<Schema.String, Schema.String>>
              readonly state: Schema.Struct<{
                readonly buckets: Schema.$Array<Schema.Tuple<readonly [Schema.Number, Schema.Number]>>
                readonly count: Schema.Number
                readonly min: Schema.Number
                readonly max: Schema.Number
                readonly sum: Schema.Number
              }>
            }>,
            Schema.Struct<{
              readonly id: Schema.String
              readonly type: Schema.tag<"Summary">
              readonly description: Schema.UndefinedOr<Schema.String>
              readonly attributes: Schema.UndefinedOr<Schema.$Record<Schema.String, Schema.String>>
              readonly state: Schema.Struct<{
                readonly quantiles: Schema.$Array<
                  Schema.Tuple<readonly [Schema.Number, Schema.UndefinedOr<Schema.Number>]>
                >
                readonly count: Schema.Number
                readonly min: Schema.Number
                readonly max: Schema.Number
                readonly sum: Schema.Number
              }>
            }>
          ]
        >
      >
    }>
  ]
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DevToolsSchema.ts#L484)

Since v4.0.0

## Request (type alias)

Type of devtools protocol requests accepted by the server.

**Details**

Requests include heartbeat pings, spans, span events, and metric snapshots.

**Signature**

```ts
type Request = Schema.Schema.Type<typeof Request>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DevToolsSchema.ts#L496)

Since v4.0.0

## Response

Schema for devtools protocol responses sent by the server.

**Details**

Responses include heartbeat pongs and requests for metric snapshots.

**Signature**

```ts
declare const Response: Schema.Union<
  readonly [
    Schema.Struct<{ readonly _tag: Schema.tag<"Pong"> }>,
    Schema.Struct<{ readonly _tag: Schema.tag<"MetricsRequest"> }>
  ]
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DevToolsSchema.ts#L527)

Since v4.0.0

## Response (type alias)

Type of devtools protocol responses sent by the server.

**Details**

Responses include heartbeat pongs and requests for metric snapshots.

**Signature**

```ts
type Response = Schema.Schema.Type<typeof Response>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DevToolsSchema.ts#L539)

Since v4.0.0

## Span

Schema for an Effect span telemetry payload sent to devtools.

**Signature**

```ts
declare const Span: Schema.Codec<Span, Span, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DevToolsSchema.ts#L138)

Since v4.0.0

## Span (interface)

Telemetry payload for an Effect span sent to devtools, including identity,
attributes, status, sampling flag, and optional parent span.

**Signature**

```ts
export interface Span {
  readonly _tag: "Span"
  readonly spanId: string
  readonly traceId: string
  readonly name: string
  readonly sampled: boolean
  readonly attributes: ReadonlyMap<string, unknown>
  readonly status: SpanStatus
  readonly parent: Option.Option<ParentSpan>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DevToolsSchema.ts#L121)

Since v4.0.0

## SpanEvent

Schema for a named event emitted by a span, including trace id, span id,
start time, and optional attributes.

**Signature**

```ts
declare const SpanEvent: Schema.Struct<{
  readonly _tag: Schema.tag<"SpanEvent">
  readonly traceId: Schema.String
  readonly spanId: Schema.String
  readonly name: Schema.String
  readonly startTime: Schema.BigInt
  readonly attributes: Schema.UndefinedOr<Schema.$Record<Schema.String, Schema.Any>>
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DevToolsSchema.ts#L156)

Since v4.0.0

## SpanEvent (type alias)

Type of a named event emitted by a span and sent to devtools.

**Signature**

```ts
type SpanEvent = Schema.Schema.Type<typeof SpanEvent>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DevToolsSchema.ts#L171)

Since v4.0.0

## SpanStatus

Schema for devtools span status, either started or ended.

**Signature**

```ts
declare const SpanStatus: Schema.Union<
  readonly [
    Schema.Struct<{ readonly _tag: Schema.tag<"Started">; readonly startTime: Schema.BigInt }>,
    Schema.Struct<{
      readonly _tag: Schema.tag<"Ended">
      readonly startTime: Schema.BigInt
      readonly endTime: Schema.BigInt
      readonly exit: Schema.decodeTo<
        Schema.Exit<Schema.Unknown, Schema.Unknown, Schema.Unknown>,
        Schema.Exit<Schema.Void, Schema.Defect, Schema.Defect>,
        never,
        never
      >
    }>
  ]
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DevToolsSchema.ts#L76)

Since v4.0.0

## SpanStatus (type alias)

Type of a devtools span status, either started or ended.

**Signature**

```ts
type SpanStatus = Schema.Schema.Type<typeof SpanStatus>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DevToolsSchema.ts#L84)

Since v4.0.0

## SpanStatusEnded

Schema for a span status representing an ended span, including start time,
end time, and encoded exit status. Encoding drops success values with
`Exit.asVoid`.

**Signature**

```ts
declare const SpanStatusEnded: Schema.Struct<{
  readonly _tag: Schema.tag<"Ended">
  readonly startTime: Schema.BigInt
  readonly endTime: Schema.BigInt
  readonly exit: Schema.decodeTo<
    Schema.Exit<Schema.Unknown, Schema.Unknown, Schema.Unknown>,
    Schema.Exit<Schema.Void, Schema.Defect, Schema.Defect>,
    never,
    never
  >
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DevToolsSchema.ts#L46)

Since v4.0.0

## SpanStatusEnded (type alias)

Type of a span status representing an ended span with start time, end time,
and exit status.

**Signature**

```ts
type SpanStatusEnded = Schema.Schema.Type<typeof SpanStatusEnded>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DevToolsSchema.ts#L68)

Since v4.0.0

## SpanStatusStarted

Schema for a span status representing a span that has started but not yet
ended.

**Signature**

```ts
declare const SpanStatusStarted: Schema.Struct<{
  readonly _tag: Schema.tag<"Started">
  readonly startTime: Schema.BigInt
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DevToolsSchema.ts#L25)

Since v4.0.0

## SpanStatusStarted (type alias)

Type of a span status representing a span that has started but not yet ended.

**Signature**

```ts
type SpanStatusStarted = Schema.Schema.Type<typeof SpanStatusStarted>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DevToolsSchema.ts#L36)

Since v4.0.0

## Summary

Schema for a devtools summary metric snapshot.

**Details**

The metric state contains quantile values plus the total count, minimum,
maximum, and sum.

**Signature**

```ts
declare const Summary: Schema.Struct<{
  readonly id: Schema.String
  readonly type: Schema.tag<"Summary">
  readonly description: Schema.UndefinedOr<Schema.String>
  readonly attributes: Schema.UndefinedOr<Schema.$Record<Schema.String, Schema.String>>
  readonly state: Schema.Struct<{
    readonly quantiles: Schema.$Array<Schema.Tuple<readonly [Schema.Number, Schema.UndefinedOr<Schema.Number>]>>
    readonly count: Schema.Number
    readonly min: Schema.Number
    readonly max: Schema.Number
    readonly sum: Schema.Number
  }>
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DevToolsSchema.ts#L405)

Since v4.0.0

## Summary (type alias)

Type of a devtools summary metric snapshot.

**Details**

The state contains quantile values plus the total count, minimum, maximum,
and sum.

**Signature**

```ts
type Summary = Schema.Schema.Type<typeof Summary>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DevToolsSchema.ts#L427)

Since v4.0.0

# utils

## Request (namespace)

Namespace containing helper types for devtools protocol requests.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DevToolsSchema.ts#L503)

Since v4.0.0

### WithoutPing (type alias)

Devtools request messages excluding heartbeat pings.

**Details**

`DevToolsServer` handles `Ping` internally and exposes only these requests
to client handlers.

**Signature**

```ts
type WithoutPing = Exclude<Request, { readonly _tag: "Ping" }>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DevToolsSchema.ts#L514)

Since v4.0.0

## Response (namespace)

Namespace containing helper types for devtools protocol responses.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DevToolsSchema.ts#L546)

Since v4.0.0

### WithoutPong (type alias)

Devtools response messages excluding heartbeat pongs.

**Details**

`DevToolsServer` sends `Pong` internally and accepts only these responses
from client handlers.

**Signature**

```ts
type WithoutPong = Exclude<Response, { readonly _tag: "Pong" }>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DevToolsSchema.ts#L557)

Since v4.0.0
