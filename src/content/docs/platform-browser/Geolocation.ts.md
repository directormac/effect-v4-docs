---
title: Geolocation.ts
nav_order: 11
parent: "@effect/platform-browser"
---

## Geolocation.ts overview

Browser geolocation integration for Effect programs.

This module defines a `Geolocation` service backed by
`navigator.geolocation`. The service can read one current position or stream
watched position updates with a sliding buffer. Browser callback failures are
represented as `GeolocationError` values with `PositionUnavailable`,
`PermissionDenied`, or `Timeout` reasons. The module also provides the
browser-backed layer and a `watchPosition` accessor.

Since v4.0.0

---

## Exports Grouped by Category

- [accessors](#accessors)
  - [watchPosition](#watchposition)
- [errors](#errors)
  - [GeolocationError (class)](#geolocationerror-class)
    - [[ErrorTypeId] (property)](#errortypeid-property)
  - [GeolocationErrorReason (type alias)](#geolocationerrorreason-type-alias)
  - [PermissionDenied (class)](#permissiondenied-class)
  - [PositionUnavailable (class)](#positionunavailable-class)
  - [Timeout (class)](#timeout-class)
- [layers](#layers)
  - [layer](#layer)
- [models](#models)
  - [Geolocation (interface)](#geolocation-interface)
- [services](#services)
  - [Geolocation](#geolocation)

---

# accessors

## watchPosition

Reads geolocation positions from the `Geolocation` service as a stream, with
an optional sliding buffer size.

**Signature**

```ts
declare const watchPosition: (
  options?: (PositionOptions & { readonly bufferSize?: number | undefined }) | undefined
) => Stream.Stream<GeolocationPosition, GeolocationError, Geolocation>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/Geolocation.ts#L223)

Since v4.0.0

# errors

## GeolocationError (class)

Tagged error wrapping a browser geolocation failure reason.

**Signature**

```ts
declare class GeolocationError {
  constructor(props: { readonly reason: GeolocationErrorReason })
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/Geolocation.ts#L85)

Since v4.0.0

### [ErrorTypeId] (property)

**Signature**

```ts
readonly [ErrorTypeId]: "~@effect/platform-browser/Geolocation/GeolocationError"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/Geolocation.ts#L97)

## GeolocationErrorReason (type alias)

Union of browser geolocation error reasons represented by the service.

**Signature**

```ts
type GeolocationErrorReason = PositionUnavailable | PermissionDenied | Timeout
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/Geolocation.ts#L152)

Since v4.0.0

## PermissionDenied (class)

Error reason for the browser geolocation `PERMISSION_DENIED` failure.

**Signature**

```ts
declare class PermissionDenied
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/Geolocation.ts#L124)

Since v4.0.0

## PositionUnavailable (class)

Error reason for the browser geolocation `POSITION_UNAVAILABLE` failure.

**Signature**

```ts
declare class PositionUnavailable
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/Geolocation.ts#L110)

Since v4.0.0

## Timeout (class)

Error reason for the browser geolocation `TIMEOUT` failure.

**Signature**

```ts
declare class Timeout
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/Geolocation.ts#L138)

Since v4.0.0

# layers

## layer

Layer that provides `Geolocation` using `navigator.geolocation`, with watched positions buffered in a sliding queue.

**Signature**

```ts
declare const layer: Layer.Layer<Geolocation, never, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/Geolocation.ts#L199)

Since v4.0.0

# models

## Geolocation (interface)

Defines the service interface for browser geolocation, providing effects for the current position and streams of watched positions.

**When to use**

Use when browser code needs a typed Effect service for one-shot location
reads or streamed location updates.

**Details**

`getCurrentPosition` returns one position effect. `watchPosition` returns a
stream and accepts the browser `PositionOptions` plus an optional sliding
`bufferSize`.

**Gotchas**

Browser permission prompts, denied permissions, timeouts, unavailable
position data, secure-context restrictions, and policy restrictions are
surfaced as `GeolocationError`.

**See**

- `GeolocationError` for represented browser geolocation failures
- `layer` for the browser-backed service implementation

**Signature**

```ts
export interface Geolocation {
  readonly [TypeId]: typeof TypeId
  readonly getCurrentPosition: (
    options?: PositionOptions | undefined
  ) => Effect.Effect<GeolocationPosition, GeolocationError>
  readonly watchPosition: (
    options?:
      | (PositionOptions & {
          readonly bufferSize?: number | undefined
        })
      | undefined
  ) => Stream.Stream<GeolocationPosition, GeolocationError>
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/Geolocation.ts#L50)

Since v4.0.0

# services

## Geolocation

Service tag for browser geolocation capabilities.

**When to use**

Use when you need to access or provide geolocation capabilities through
Effect's context.

**See**

- `layer` for providing the browser-backed geolocation service

**Signature**

```ts
declare const Geolocation: Context.Service<Geolocation, Geolocation>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/Geolocation.ts#L77)

Since v4.0.0
