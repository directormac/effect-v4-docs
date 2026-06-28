---
title: OtlpSerialization.ts
nav_order: 288
parent: "effect"
---

## OtlpSerialization.ts overview

Serializes OTLP payloads into HTTP request bodies.

Signal exporters build trace, metric, and log data structures in memory. This
module provides the service that turns those structures into JSON or protobuf
HTTP bodies before they are posted to an OTLP collector.

Since v4.0.0

---

## Exports Grouped by Category

- [layers](#layers)
  - [layerJson](#layerjson)
  - [layerProtobuf](#layerprotobuf)
- [services](#services)
  - [OtlpSerialization (class)](#otlpserialization-class)

---

# layers

## layerJson

Provides `OtlpSerialization` using OTLP/HTTP JSON bodies.

**Signature**

```ts
declare const layerJson: Layer.Layer<OtlpSerialization, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OtlpSerialization.ts#L37)

Since v4.0.0

## layerProtobuf

Provides `OtlpSerialization` using protobuf-encoded OTLP bodies with the
`application/x-protobuf` content type.

**Signature**

```ts
declare const layerProtobuf: Layer.Layer<OtlpSerialization, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OtlpSerialization.ts#L50)

Since v4.0.0

# services

## OtlpSerialization (class)

Service for serializing OTLP traces, metrics, and logs into HTTP request
bodies.

**Signature**

```ts
declare class OtlpSerialization
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OtlpSerialization.ts#L25)

Since v4.0.0
