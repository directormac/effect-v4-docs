---
title: Resource.ts
nav_order: 5
parent: "@effect/opentelemetry"
---

## Resource.ts overview

OpenTelemetry resource service and layers.

An OpenTelemetry resource identifies the process or service that emits spans,
metrics, and logs. This module stores that resource in Effect context and
provides layers for creating it from explicit service metadata, from
`OTEL_SERVICE_NAME` and `OTEL_RESOURCE_ATTRIBUTES`, or as an empty resource.
It also includes `configToAttributes` for turning service metadata into raw
OpenTelemetry attributes.

Since v4.0.0

---

## Exports Grouped by Category

- [configuration](#configuration)
  - [configToAttributes](#configtoattributes)
- [layers](#layers)
  - [layer](#layer)
  - [layerEmpty](#layerempty)
  - [layerFromEnv](#layerfromenv)
- [services](#services)
  - [Resource (class)](#resource-class)

---

# configuration

## configToAttributes

Converts resource configuration into OpenTelemetry attributes, adding service name, optional service version, and telemetry SDK metadata.

**When to use**

Use to turn explicit service metadata into a raw OpenTelemetry attribute map
for lower-level resource construction or merging with environment-derived
attributes via `layerFromEnv`.

**Details**

The returned record copies `attributes` first, then sets `service.name`,
`telemetry.sdk.name`, and `telemetry.sdk.language`. `service.version` is
included only when `serviceVersion` is provided.

**Gotchas**

Custom values for `service.name` and `telemetry.sdk.*` are overwritten by this
helper. An empty `serviceVersion` is treated as absent.

**See**

- `layer` for creating a `Resource` layer from explicit metadata
- `layerFromEnv` for merging attributes with OpenTelemetry environment variables

**Signature**

```ts
declare const configToAttributes: (options: {
  readonly serviceName: string
  readonly serviceVersion?: string
  readonly attributes?: OtelApi.Attributes
}) => Record<string, string>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/opentelemetry/src/Resource.ts#L80)

Since v4.0.0

# layers

## layer

Creates a `Resource` layer from service metadata and additional OpenTelemetry attributes.

**Signature**

```ts
declare const layer: (config: {
  readonly serviceName: string
  readonly serviceVersion?: string
  readonly attributes?: OtelApi.Attributes
}) => Layer.Layer<Resource, never, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/opentelemetry/src/Resource.ts#L44)

Since v4.0.0

## layerEmpty

Layer that provides an empty OpenTelemetry resource.

**Signature**

```ts
declare const layerEmpty: Layer.Layer<Resource, never, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/opentelemetry/src/Resource.ts#L144)

Since v4.0.0

## layerFromEnv

Creates a `Resource` layer from OpenTelemetry environment variables, optionally merging additional attributes.

**Signature**

```ts
declare const layerFromEnv: (additionalAttributes?: OtelApi.Attributes | undefined) => Layer.Layer<Resource>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/opentelemetry/src/Resource.ts#L105)

Since v4.0.0

# services

## Resource (class)

Service tag for OpenTelemetry metadata attached to emitted telemetry.

**When to use**

Use to provide process, service, and deployment metadata that should be
attached to spans, metrics, and logs.

**Signature**

```ts
declare class Resource
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/opentelemetry/src/Resource.ts#L33)

Since v4.0.0
