---
title: HttpApiSecurity.ts
nav_order: 277
parent: "effect"
---

## HttpApiSecurity.ts overview

Defines security scheme declarations for declarative HTTP APIs.

Security schemes describe where credentials are read from and which credential
type is passed to security middleware. They are consumed by
`HttpApiMiddleware.Service`, `HttpApiBuilder`, generated clients, and OpenAPI
generation, but they do not authenticate requests by themselves.

Since v4.0.0

---

## Exports Grouped by Category

- [annotations](#annotations)
  - [annotate](#annotate)
  - [annotateMerge](#annotatemerge)
- [constructors](#constructors)
  - [apiKey](#apikey)
  - [basic](#basic)
  - [bearer](#bearer)
  - [http](#http)
- [models](#models)
  - [ApiKey (interface)](#apikey-interface)
  - [Basic (interface)](#basic-interface)
  - [Credentials (interface)](#credentials-interface)
  - [Http (interface)](#http-interface)
  - [HttpApiSecurity (type alias)](#httpapisecurity-type-alias)
- [utils](#utils)
  - [HttpApiSecurity (namespace)](#httpapisecurity-namespace)
    - [Proto (interface)](#proto-interface)
    - [Type (type alias)](#type-type-alias)

---

# annotations

## annotate

Adds an OpenAPI annotation value to a security scheme.

**Signature**

```ts
declare const annotate: {
  <I, S>(service: Context.Key<I, S>, value: S): <A extends HttpApiSecurity>(self: A) => A
  <A extends HttpApiSecurity, I, S>(self: A, service: Context.Key<I, S>, value: S): A
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiSecurity.ts#L234)

Since v4.0.0

## annotateMerge

Merges OpenAPI annotations into a security scheme.

**Signature**

```ts
declare const annotateMerge: {
  <I>(annotations: Context.Context<I>): <A extends HttpApiSecurity>(self: A) => A
  <A extends HttpApiSecurity, I>(self: A, annotations: Context.Context<I>): A
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiSecurity.ts#L216)

Since v4.0.0

# constructors

## apiKey

Creates an API key security scheme.

**When to use**

Use to require API key credentials passed through a header, query parameter,
or cookie.

**Details**

Use `HttpApiBuilder.middlewareSecurity` to implement API middleware for this
security scheme.

Use `HttpApiBuilder.securitySetCookie` to set the correct cookie in a
handler. By default, `in` is `"header"`.

**See**

- `bearer` for a Bearer token security scheme
- `basic` for an HTTP Basic security scheme

**Signature**

```ts
declare const apiKey: (options: {
  readonly key: string
  readonly in?: "header" | "query" | "cookie" | undefined
}) => ApiKey
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiSecurity.ts#L177)

Since v4.0.0

## basic

Creates an HTTP Basic authentication security scheme.

**When to use**

Use to require HTTP Basic username/password credentials.

**Details**

Use `HttpApiBuilder.middlewareSecurity` to implement API middleware for this
security scheme.

**See**

- `bearer` for a Bearer token security scheme
- `apiKey` for an API-key security scheme

**Signature**

```ts
declare const basic: Basic
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiSecurity.ts#L205)

Since v4.0.0

## bearer

Creates a Bearer token security scheme.

**When to use**

Use to require `Authorization: Bearer ...` credentials for an HTTP API group
or endpoint.

**Details**

Use `HttpApiBuilder.middlewareSecurity` to implement API middleware for this
security scheme.

**See**

- `apiKey` for an API-key security scheme
- `basic` for an HTTP Basic security scheme

**Signature**

```ts
declare const bearer: Http
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiSecurity.ts#L154)

Since v4.0.0

## http

Creates a Http token security scheme.

**When to use**

Use to require `Authorization: scheme ...` credentials for an HTTP API group
or endpoint.

**Details**

Use `HttpApiBuilder.middlewareSecurity` to implement API middleware for this
security scheme.

**See**

- `apiKey` for an API-key security scheme
- `basic` for an HTTP Basic security scheme

**Signature**

```ts
declare const http: (options: { readonly scheme: string }) => Http
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiSecurity.ts#L126)

Since v4.0.0

# models

## ApiKey (interface)

API key security scheme identifying the key name and whether it is read from a header, query parameter, or cookie.

**Signature**

```ts
export interface ApiKey extends HttpApiSecurity.Proto<Redacted> {
  readonly _tag: "ApiKey"
  readonly in: "header" | "query" | "cookie"
  readonly key: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiSecurity.ts#L74)

Since v4.0.0

## Basic (interface)

HTTP Basic authentication security scheme whose decoded credential is `Credentials`.

**Signature**

```ts
export interface Basic extends HttpApiSecurity.Proto<Credentials> {
  readonly _tag: "Basic"
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiSecurity.ts#L86)

Since v4.0.0

## Credentials (interface)

Decoded credentials for HTTP Basic authentication.

**Signature**

```ts
export interface Credentials {
  readonly username: string
  readonly password: Redacted
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiSecurity.ts#L96)

Since v4.0.0

## Http (interface)

Http token security scheme whose decoded credential is a redacted token.

**Signature**

```ts
export interface Http extends HttpApiSecurity.Proto<Redacted> {
  readonly _tag: "Http"
  readonly scheme: string
  /** @internal */
  readonly schemeLength: number
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiSecurity.ts#L61)

Since v4.0.0

## HttpApiSecurity (type alias)

Union of security schemes supported by the HTTP API OpenAPI model.

**Signature**

```ts
type HttpApiSecurity = Http | ApiKey | Basic
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiSecurity.ts#L25)

Since v4.0.0

# utils

## HttpApiSecurity (namespace)

Helper types for HTTP API security schemes.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiSecurity.ts#L32)

Since v4.0.0

### Proto (interface)

Common prototype for security schemes, carrying the credential type and OpenAPI annotations.

**Signature**

```ts
export interface Proto<out A> extends Pipeable {
  readonly [TypeId]: {
    readonly _A: Covariant<A>
  }
  readonly annotations: Context.Context<never>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiSecurity.ts#L39)

Since v4.0.0

### Type (type alias)

Extracts the credential type produced by a security scheme.

**Signature**

```ts
type Type<A> = A extends Proto<infer Out> ? Out : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiSecurity.ts#L52)

Since v4.0.0
