---
title: Cookies.ts
nav_order: 235
parent: "effect"
---

## Cookies.ts overview

Models HTTP cookies and cookie collections for requests and responses.

A `Cookie` stores a name, value, encoded value, and standard cookie
attributes. A `Cookies` value is an immutable collection keyed by cookie
name. This module parses request `Cookie` headers, builds response
`Set-Cookie` headers, and provides helpers for adding, removing, merging, and
expiring cookies.

Since v4.0.0

---

## Exports Grouped by Category

- [combinators](#combinators)
  - [expireCookie](#expirecookie)
  - [expireCookieUnsafe](#expirecookieunsafe)
  - [get](#get)
  - [getValue](#getvalue)
  - [merge](#merge)
  - [remove](#remove)
  - [set](#set)
  - [setAll](#setall)
  - [setAllCookie](#setallcookie)
  - [setAllUnsafe](#setallunsafe)
  - [setCookie](#setcookie)
  - [setUnsafe](#setunsafe)
- [constructors](#constructors)
  - [empty](#empty)
  - [fromIterable](#fromiterable)
  - [fromReadonlyRecord](#fromreadonlyrecord)
  - [fromSetCookie](#fromsetcookie)
  - [makeCookie](#makecookie)
  - [makeCookieUnsafe](#makecookieunsafe)
- [cookies](#cookies)
  - [Cookie (interface)](#cookie-interface)
- [decoding](#decoding)
  - [parseHeader](#parseheader)
- [encoding](#encoding)
  - [serializeCookie](#serializecookie)
  - [toCookieHeader](#tocookieheader)
  - [toRecord](#torecord)
  - [toSetCookieHeaders](#tosetcookieheaders)
- [errors](#errors)
  - [CookiesError (class)](#cookieserror-class)
    - [fromReason (static method)](#fromreason-static-method)
    - [[CookieErrorTypeId] (property)](#cookieerrortypeid-property)
  - [CookiesErrorReason (class)](#cookieserrorreason-class)
- [guards](#guards)
  - [isCookie](#iscookie)
- [models](#models)
  - [Cookies (interface)](#cookies-interface)
- [refinements](#refinements)
  - [isCookies](#iscookies)
  - [isEmpty](#isempty)
- [schemas](#schemas)
  - [CookieSchema](#cookieschema)
  - [CookieSchema (interface)](#cookieschema-interface)
  - [CookiesSchema](#cookiesschema)
  - [CookiesSchema (interface)](#cookiesschema-interface)
  - [schemaRecord](#schemarecord)

---

# combinators

## expireCookie

Adds an expired cookie safely with an empty value, `Max-Age=0`, and an epoch `Expires` value.

**Details**

Returns a `CookiesError` in the `Result` failure channel when the name or options are invalid.

**Signature**

```ts
declare const expireCookie: {
  (
    name: string,
    options?: Omit<NonNullable<Cookie["options"]>, "expires" | "maxAge">
  ): (self: Cookies) => Result.Result<Cookies, CookiesError>
  (
    self: Cookies,
    name: string,
    options?: Omit<NonNullable<Cookie["options"]>, "expires" | "maxAge">
  ): Result.Result<Cookies, CookiesError>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cookies.ts#L661)

Since v4.0.0

## expireCookieUnsafe

Adds an expired cookie to a Cookies object, throwing an error if invalid

**Signature**

```ts
declare const expireCookieUnsafe: {
  (name: string, options?: Omit<NonNullable<Cookie["options"]>, "expires" | "maxAge">): (self: Cookies) => Cookies
  (self: Cookies, name: string, options?: Omit<NonNullable<Cookie["options"]>, "expires" | "maxAge">): Cookies
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cookies.ts#L691)

Since v4.0.0

## get

Gets a cookie from a Cookies object safely.

**Signature**

```ts
declare const get: {
  (name: string): (self: Cookies) => Option.Option<Cookie>
  (self: Cookies, name: string): Option.Option<Cookie>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cookies.ts#L566)

Since v4.0.0

## getValue

Gets the decoded value of a cookie by name safely.

**Details**

Returns `Option.none()` when the cookie is not present.

**Signature**

```ts
declare const getValue: {
  (name: string): (self: Cookies) => Option.Option<string>
  (self: Cookies, name: string): Option.Option<string>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cookies.ts#L584)

Since v4.0.0

## merge

Combines two Cookies objects, removing duplicates from the first

**Signature**

```ts
declare const merge: { (that: Cookies): (self: Cookies) => Cookies; (self: Cookies, that: Cookies): Cookies }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cookies.ts#L540)

Since v4.0.0

## remove

Removes a cookie by name

**Signature**

```ts
declare const remove: { (name: string): (self: Cookies) => Cookies; (self: Cookies, name: string): Cookies }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cookies.ts#L555)

Since v4.0.0

## set

Creates and adds a cookie safely by name and value.

**Details**

The cookie fields are validated first; invalid input returns a `CookiesError` in the `Result` failure channel.

**Signature**

```ts
declare const set: {
  (name: string, value: string, options?: Cookie["options"]): (self: Cookies) => Result.Result<Cookies, CookiesError>
  (self: Cookies, name: string, value: string, options?: Cookie["options"]): Result.Result<Cookies, CookiesError>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cookies.ts#L602)

Since v4.0.0

## setAll

Creates and adds multiple cookies safely from name/value/options tuples.

**Details**

If any tuple is invalid, returns the first `CookiesError` and leaves the original collection unchanged.

**Signature**

```ts
declare const setAll: {
  (
    cookies: Iterable<readonly [name: string, value: string, options?: Cookie["options"]]>
  ): (self: Cookies) => Result.Result<Cookies, CookiesError>
  (
    self: Cookies,
    cookies: Iterable<readonly [name: string, value: string, options?: Cookie["options"]]>
  ): Result.Result<Cookies, CookiesError>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cookies.ts#L725)

Since v4.0.0

## setAllCookie

Adds multiple cookies to a Cookies object

**Signature**

```ts
declare const setAllCookie: {
  (cookies: Iterable<Cookie>): (self: Cookies) => Cookies
  (self: Cookies, cookies: Iterable<Cookie>): Cookies
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cookies.ts#L523)

Since v4.0.0

## setAllUnsafe

Adds multiple cookies to a Cookies object, throwing an error if invalid

**Signature**

```ts
declare const setAllUnsafe: {
  (cookies: Iterable<readonly [name: string, value: string, options?: Cookie["options"]]>): (self: Cookies) => Cookies
  (self: Cookies, cookies: Iterable<readonly [name: string, value: string, options?: Cookie["options"]]>): Cookies
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cookies.ts#L757)

Since v4.0.0

## setCookie

Adds a cookie to a Cookies object

**Signature**

```ts
declare const setCookie: { (cookie: Cookie): (self: Cookies) => Cookies; (self: Cookies, cookie: Cookie): Cookies }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cookies.ts#L504)

Since v4.0.0

## setUnsafe

Creates and adds a cookie by name and value, throwing if the cookie fields are invalid.

**Signature**

```ts
declare const setUnsafe: {
  (name: string, value: string, options?: Cookie["options"]): (self: Cookies) => Cookies
  (self: Cookies, name: string, value: string, options?: Cookie["options"]): Cookies
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cookies.ts#L629)

Since v4.0.0

# constructors

## empty

An empty Cookies object

**Signature**

```ts
declare const empty: Cookies
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cookies.ts#L415)

Since v4.0.0

## fromIterable

Create a Cookies object from an Iterable

**Signature**

```ts
declare const fromIterable: (cookies: Iterable<Cookie>) => Cookies
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cookies.ts#L251)

Since v4.0.0

## fromReadonlyRecord

Creates a `Cookies` collection from an existing readonly record of cookies keyed by cookie name.

**Signature**

```ts
declare const fromReadonlyRecord: (cookies: Record.ReadonlyRecord<string, Cookie>) => Cookies
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cookies.ts#L239)

Since v4.0.0

## fromSetCookie

Create a Cookies object from a set of Set-Cookie headers

**Signature**

```ts
declare const fromSetCookie: (headers: Iterable<string> | string) => Cookies
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cookies.ts#L265)

Since v4.0.0

## makeCookie

Creates a cookie, validating the name, encoded value, domain, path, and finite `maxAge`.

**Details**

Returns a `CookiesError` in the `Result` failure channel when validation fails.

**Signature**

```ts
declare const makeCookie: (
  name: string,
  value: string,
  options?: Cookie["options"] | undefined
) => Result.Result<Cookie, CookiesError>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cookies.ts#L451)

Since v4.0.0

## makeCookieUnsafe

Create a new cookie, throwing an error if invalid

**Signature**

```ts
declare const makeCookieUnsafe: (name: string, value: string, options?: Cookie["options"] | undefined) => Cookie
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cookies.ts#L492)

Since v4.0.0

# cookies

## Cookie (interface)

HTTP cookie value with its decoded value, encoded value, and optional cookie
attributes such as domain, path, expiration, security, and same-site settings.

**Signature**

```ts
export interface Cookie extends Inspectable.Inspectable {
  readonly [CookieTypeId]: typeof CookieTypeId
  readonly name: string
  readonly value: string
  readonly valueEncoded: string
  readonly options?:
    | {
        readonly domain?: string | undefined
        readonly expires?: Date | undefined
        readonly maxAge?: Duration.Input | undefined
        readonly path?: string | undefined
        readonly priority?: "low" | "medium" | "high" | undefined
        readonly httpOnly?: boolean | undefined
        readonly secure?: boolean | undefined
        readonly partitioned?: boolean | undefined
        readonly sameSite?: "lax" | "strict" | "none" | undefined
      }
    | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cookies.ts#L106)

Since v4.0.0

# decoding

## parseHeader

Parses a cookie header into a record of key-value pairs

**Details**

Adapted from https://github.com/fastify/fastify-cookie under MIT License

**Signature**

```ts
declare const parseHeader: (header: string) => Record<string, string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cookies.ts#L908)

Since v4.0.0

# encoding

## serializeCookie

Serializes a cookie into a string.

**Details**

Adapted from https://github.com/fastify/fastify-cookie under MIT License

**Signature**

```ts
declare const serializeCookie: (self: Cookie) => string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cookies.ts#L778)

Since v4.0.0

## toCookieHeader

Serializes a `Cookies` object into a Cookie header.

**Signature**

```ts
declare const toCookieHeader: (self: Cookies) => string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cookies.ts#L854)

Since v4.0.0

## toRecord

Converts a `Cookies` collection to a record of decoded cookie values keyed by cookie name.

**Signature**

```ts
declare const toRecord: (self: Cookies) => Record<string, string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cookies.ts#L863)

Since v4.0.0

## toSetCookieHeaders

Serializes a `Cookies` collection into an array of `Set-Cookie` header values.

**Signature**

```ts
declare const toSetCookieHeaders: (self: Cookies) => Array<string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cookies.ts#L896)

Since v4.0.0

# errors

## CookiesError (class)

Error returned when a cookie name, value, domain, path, or max-age option is invalid.

**Details**

Inspect `reason` to determine the specific validation failure.

**Signature**

```ts
declare class CookiesError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cookies.ts#L190)

Since v4.0.0

### fromReason (static method)

Creates a cookie error from a reason tag and optional cause.

**Signature**

```ts
declare const fromReason: (reason: CookiesError["reason"]["_tag"], cause?: unknown) => CookiesError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cookies.ts#L198)

Since v4.0.0

### [CookieErrorTypeId] (property)

Marks this value as a cookie validation error for runtime guards.

**Signature**

```ts
readonly [CookieErrorTypeId]: "~effect/http/Cookies/CookieError"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cookies.ts#L207)

Since v4.0.0

## CookiesErrorReason (class)

Error reason describing why cookie construction failed, such as invalid name,
value, domain, path, or infinite max-age.

**Signature**

```ts
declare class CookiesErrorReason
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cookies.ts#L170)

Since v4.0.0

# guards

## isCookie

Returns `true` when a value is a `Cookie`.

**Signature**

```ts
declare const isCookie: (u: unknown) => u is Cookie
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cookies.ts#L130)

Since v4.0.0

# models

## Cookies (interface)

Immutable collection of HTTP cookies keyed by cookie name.

**Signature**

```ts
export interface Cookies extends Pipeable, Inspectable.Inspectable {
  readonly [TypeId]: typeof TypeId
  readonly cookies: Record.ReadonlyRecord<string, Cookie>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cookies.ts#L41)

Since v4.0.0

# refinements

## isCookies

Returns `true` when a value is a `Cookies` collection.

**Signature**

```ts
declare const isCookies: (u: unknown) => u is Cookies
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cookies.ts#L33)

Since v4.0.0

## isEmpty

Returns `true` when the `Cookies` collection contains no cookies.

**Signature**

```ts
declare const isEmpty: (self: Cookies) => boolean
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cookies.ts#L423)

Since v4.0.0

# schemas

## CookieSchema

Schema for `Cookie` values.

**Signature**

```ts
declare const CookieSchema: CookieSchema
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cookies.ts#L146)

Since v4.0.0

## CookieSchema (interface)

Schema interface for validating `Cookie` values.

**Signature**

```ts
export interface CookieSchema extends Schema.declare<Cookie> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cookies.ts#L138)

Since v4.0.0

## CookiesSchema

Schema for `Cookies` collections.

**Details**

JSON encoding uses `Set-Cookie` header strings, while isomorphic encoding uses
a readonly record of cookie values.

**Signature**

```ts
declare const CookiesSchema: CookiesSchema
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cookies.ts#L65)

Since v4.0.0

## CookiesSchema (interface)

Schema interface for validating and encoding `Cookies` collections.

**Signature**

```ts
export interface CookiesSchema extends Schema.declare<Cookies, Record.ReadonlyRecord<string, Cookie>> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cookies.ts#L52)

Since v4.0.0

## schemaRecord

Schema for transforming `Cookies` into records of decoded string values keyed
by cookie name.

**Signature**

```ts
declare const schemaRecord: Schema.decodeTo<Schema.$Record<Schema.String, Schema.String>, CookiesSchema, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Cookies.ts#L880)

Since v4.0.0
