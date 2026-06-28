---
title: OtlpResource.ts
nav_order: 287
parent: "effect"
---

## OtlpResource.ts overview

Builds OTLP resource metadata shared by exported telemetry.

An OTLP resource describes the service and other attributes attached to every
exported log, metric, or trace. This module builds resources from explicit
options or OpenTelemetry environment variables and converts JavaScript values
into OTLP attribute values.

Since v4.0.0

---

## Exports Grouped by Category

- [Attributes](#attributes)
  - [entriesToAttributes](#entriestoattributes)
  - [serviceNameUnsafe](#servicenameunsafe)
  - [unknownToAttributeValue](#unknowntoattributevalue)
- [constructors](#constructors)
  - [fromConfig](#fromconfig)
  - [make](#make)
- [models](#models)
  - [AnyValue (interface)](#anyvalue-interface)
  - [ArrayValue (interface)](#arrayvalue-interface)
  - [Fixed64 (type alias)](#fixed64-type-alias)
  - [KeyValue (interface)](#keyvalue-interface)
  - [KeyValueList (interface)](#keyvaluelist-interface)
  - [LongBits (interface)](#longbits-interface)
  - [Resource (interface)](#resource-interface)

---

# Attributes

## entriesToAttributes

Converts key/value entries into OTLP `KeyValue` attributes.

**Signature**

```ts
declare const entriesToAttributes: (entries: Iterable<[string, unknown]>) => Array<KeyValue>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OtlpResource.ts#L155)

Since v4.0.0

## serviceNameUnsafe

Returns the `service.name` attribute from an OTLP resource.

**When to use**

Use when an OTLP resource is known to contain a string `service.name` and
throwing is acceptable if that invariant is broken.

**Gotchas**

Throws if the resource does not contain a string `service.name` attribute.

**Signature**

```ts
declare const serviceNameUnsafe: (resource: Resource) => string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OtlpResource.ts#L139)

Since v4.0.0

## unknownToAttributeValue

Converts an arbitrary JavaScript value into an OTLP `AnyValue`.

**Details**

Arrays are converted recursively, primitive values use their matching OTLP
fields, and unsupported values are formatted as strings.

**Signature**

```ts
declare const unknownToAttributeValue: (value: unknown) => AnyValue
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OtlpResource.ts#L177)

Since v4.0.0

# constructors

## fromConfig

Creates an OTLP resource from explicit options and OpenTelemetry
configuration.

**Details**

`OTEL_RESOURCE_ATTRIBUTES`, `OTEL_SERVICE_NAME`, and
`OTEL_SERVICE_VERSION` override explicit options; missing required
configuration is converted to a defect.

**Signature**

```ts
declare const fromConfig: (
  options?:
    | {
        readonly serviceName?: string | undefined
        readonly serviceVersion?: string | undefined
        readonly attributes?: Record<string, unknown> | undefined
      }
    | undefined
) => Effect.Effect<Resource>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OtlpResource.ts#L82)

Since v4.0.0

## make

Creates an OTLP resource from service metadata and additional attributes.

**Details**

The resource always includes `service.name`, includes `service.version` when
provided, and converts custom attributes into OTLP attribute values.

**Signature**

```ts
declare const make: (options: {
  readonly serviceName: string
  readonly serviceVersion?: string | undefined
  readonly attributes?: Record<string, unknown> | undefined
}) => Resource
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OtlpResource.ts#L40)

Since v4.0.0

# models

## AnyValue (interface)

OTLP `AnyValue` payload for scalar, array, key/value-list, or byte values.

**Signature**

```ts
export interface AnyValue {
  /** AnyValue stringValue */
  stringValue?: string | null
  /** AnyValue boolValue */
  boolValue?: boolean | null
  /** AnyValue intValue */
  intValue?: number | null
  /** AnyValue doubleValue */
  doubleValue?: number | null
  /** AnyValue arrayValue */
  arrayValue?: ArrayValue
  /** AnyValue kvlistValue */
  kvlistValue?: KeyValueList
  /** AnyValue bytesValue */
  bytesValue?: Uint8Array
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OtlpResource.ts#L232)

Since v4.0.0

## ArrayValue (interface)

OTLP array value containing nested `AnyValue` entries.

**Signature**

```ts
export interface ArrayValue {
  /** ArrayValue values */
  values: Array<AnyValue>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OtlpResource.ts#L255)

Since v4.0.0

## Fixed64 (type alias)

Accepted runtime representations for an OTLP/protobuf fixed 64-bit value.

**Signature**

```ts
type Fixed64 = LongBits | string | number
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OtlpResource.ts#L288)

Since v4.0.0

## KeyValue (interface)

An OTLP attribute represented as a string key and typed value.

**Signature**

```ts
export interface KeyValue {
  /** KeyValue key */
  key: string
  /** KeyValue value */
  value: AnyValue
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OtlpResource.ts#L219)

Since v4.0.0

## KeyValueList (interface)

OTLP key/value-list value containing nested attributes.

**Signature**

```ts
export interface KeyValueList {
  /** KeyValueList values */
  values: Array<KeyValue>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OtlpResource.ts#L266)

Since v4.0.0

## LongBits (interface)

Low and high 32-bit parts of a 64-bit integer value.

**Signature**

```ts
export interface LongBits {
  low: number
  high: number
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OtlpResource.ts#L277)

Since v4.0.0

## Resource (interface)

OTLP resource metadata attached to exported logs, metrics, and traces.

**Signature**

```ts
export interface Resource {
  /** Resource attributes */
  attributes: Array<KeyValue>
  /** Resource droppedAttributesCount */
  droppedAttributesCount: number
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OtlpResource.ts#L22)

Since v4.0.0
