---
title: Permissions.ts
nav_order: 18
parent: "@effect/platform-browser"
---

## Permissions.ts overview

Effect service for the browser Permissions API.

This module defines a `Permissions` service backed by
`navigator.permissions`. The service exposes `query`, which returns the
browser `PermissionStatus` for a permission name. Failed browser operations
are represented as `PermissionsError` values with `InvalidStateError` or
`TypeError` reasons, and `layer` provides the browser-backed service.

Since v4.0.0

---

## Exports Grouped by Category

- [errors](#errors)
  - [PermissionsError (class)](#permissionserror-class)
    - [[ErrorTypeId] (property)](#errortypeid-property)
  - [PermissionsErrorReason (type alias)](#permissionserrorreason-type-alias)
  - [PermissionsInvalidStateError (class)](#permissionsinvalidstateerror-class)
  - [PermissionsTypeError (class)](#permissionstypeerror-class)
- [layers](#layers)
  - [layer](#layer)
- [models](#models)
  - [Permissions (interface)](#permissions-interface)
- [services](#services)
  - [Permissions](#permissions)

---

# errors

## PermissionsError (class)

Tagged error wrapping a browser Permissions API failure reason.

**Signature**

```ts
declare class PermissionsError {
  constructor(props: { readonly reason: PermissionsErrorReason })
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/Permissions.ts#L85)

Since v4.0.0

### [ErrorTypeId] (property)

**Signature**

```ts
readonly [ErrorTypeId]: "~@effect/platform-browser/Permissions/PermissionsError"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/Permissions.ts#L95)

## PermissionsErrorReason (type alias)

Union of browser Permissions API error reasons represented by the service.

**Signature**

```ts
type PermissionsErrorReason = PermissionsInvalidStateError | PermissionsTypeError
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/Permissions.ts#L77)

Since v4.0.0

## PermissionsInvalidStateError (class)

Error reason for an `InvalidStateError` raised by the browser Permissions API.

**Signature**

```ts
declare class PermissionsInvalidStateError
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/Permissions.ts#L49)

Since v4.0.0

## PermissionsTypeError (class)

Error reason for a `TypeError` raised by the browser Permissions API.

**Signature**

```ts
declare class PermissionsTypeError
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/Permissions.ts#L63)

Since v4.0.0

# layers

## layer

Provides the `Permissions` service using the browser `navigator.permissions` API.

**When to use**

Use when you need a live browser `Permissions` service backed by the ambient
`navigator.permissions` implementation.

**Details**

`query` delegates to `navigator.permissions.query({ name })` and wraps
rejected browser operations in `PermissionsError`.

**Signature**

```ts
declare const layer: Layer.Layer<Permissions, never, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/Permissions.ts#L131)

Since v4.0.0

# models

## Permissions (interface)

Wrapper on the Permission API (`navigator.permissions`) with methods for
querying status of permissions.

**Signature**

```ts
export interface Permissions {
  readonly [TypeId]: typeof TypeId

  /**
   * Returns the state of a user permission on the global scope.
   */
  readonly query: <Name extends PermissionName>(
    name: Name
  ) => Effect.Effect<
    // `name` is identical to the name passed to Permissions.query
    // https://developer.mozilla.org/en-US/docs/Web/API/PermissionStatus
    Omit<PermissionStatus, "name"> & { name: Name },
    PermissionsError
  >
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/Permissions.ts#L27)

Since v4.0.0

# services

## Permissions

Service tag for browser permission querying.

**When to use**

Use when you need to require or provide browser permission querying through
Effect's context.

**Signature**

```ts
declare const Permissions: Context.Service<Permissions, Permissions>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/Permissions.ts#L113)

Since v4.0.0
