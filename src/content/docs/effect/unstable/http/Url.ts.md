---
title: Url.ts
nav_order: 266
parent: "effect"
---

## Url.ts overview

Parses and edits platform `URL` values.

The HTTP modules use the standard `URL` object as their URL representation.
This module adds safe parsing and helpers that return updated copies when
changing credentials, host, path, protocol, query, or hash parts. Query
strings can also be read or updated through `UrlParams`.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [fromString](#fromstring)
- [getters](#getters)
  - [urlParams](#urlparams)
- [modifiers](#modifiers)
  - [modifyUrlParams](#modifyurlparams)
  - [mutate](#mutate)
- [setters](#setters)
  - [setHash](#sethash)
  - [setHost](#sethost)
  - [setHostname](#sethostname)
  - [setHref](#sethref)
  - [setPassword](#setpassword)
  - [setPathname](#setpathname)
  - [setPort](#setport)
  - [setProtocol](#setprotocol)
  - [setSearch](#setsearch)
  - [setUrlParams](#seturlparams)
  - [setUsername](#setusername)

---

# constructors

## fromString

Parses a URL string safely into a `URL` object, returning a `Result` type for
error handling.

**Details**

This function converts a string into a `URL` object, enabling safe URL
parsing with built-in error handling. If the string is invalid or fails to
parse, this function does not throw an error; instead, it wraps the error in
a `IllegalArgumentError` and returns it as the `Failure` value of an
`Result`. The `Success` value contains the successfully parsed `URL`.

An optional `base` parameter can be provided to resolve relative URLs. If
specified, the function interprets the input `url` as relative to this
`base`. This is especially useful when dealing with URLs that might not be
fully qualified.

**Example** (Parsing absolute and relative URLs)

```ts
import { Result } from "effect"
import { Url } from "effect/unstable/http"

// Parse an absolute URL
//
//      ┌─── Result<URL, IllegalArgumentError>
//      ▼
const parsed = Url.fromString("https://example.com/path")

if (Result.isSuccess(parsed)) {
  console.log("Parsed URL:", parsed.success.toString())
} else {
  console.log("Error:", parsed.failure.message)
}
// Output: Parsed URL: https://example.com/path

// Parse a relative URL with a base
const relativeParsed = Url.fromString("/relative-path", "https://example.com")

if (Result.isSuccess(relativeParsed)) {
  console.log("Parsed relative URL:", relativeParsed.success.toString())
} else {
  console.log("Error:", relativeParsed.failure.message)
}
// Output: Parsed relative URL: https://example.com/relative-path
```

**Signature**

```ts
declare const fromString: (
  url: string,
  base?: string | URL | undefined
) => Result.Result<URL, Cause.IllegalArgumentError>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Url.ts#L67)

Since v4.0.0

# getters

## urlParams

Retrieves the query parameters from a URL.

**Details**

This function extracts the query parameters from a `URL` object and returns
them as `UrlParams`. The resulting structure can be easily manipulated or
inspected.

**Example** (Reading query parameters)

```ts
import { Url } from "effect/unstable/http"

const myUrl = new URL("https://example.com?foo=bar")

// Read parameters
const params = Url.urlParams(myUrl)

console.log(params)
// Output: [ [ 'foo', 'bar' ] ]
```

**Signature**

```ts
declare const urlParams: (url: URL) => UrlParams.UrlParams
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Url.ts#L295)

Since v4.0.0

# modifiers

## modifyUrlParams

Reads the query parameters of a URL, modifies them, and updates the URL.

**Details**

This function provides a functional way to interact with query parameters by
reading the current parameters, applying a transformation function, and then
writing the updated parameters back to the URL. It returns a new `URL` object
with the modified parameters, ensuring immutability.

**Example** (Modifying query parameters)

```ts
import { Url, UrlParams } from "effect/unstable/http"

const myUrl = new URL("https://example.com?foo=bar")

const changedUrl = Url.modifyUrlParams(myUrl, UrlParams.append("key", "value"))

console.log(changedUrl.toString())
// Output: https://example.com/?foo=bar&key=value
```

**Signature**

```ts
declare const modifyUrlParams: {
  (f: (urlParams: UrlParams.UrlParams) => UrlParams.UrlParams): (url: URL) => URL
  (url: URL, f: (urlParams: UrlParams.UrlParams) => UrlParams.UrlParams): URL
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Url.ts#L323)

Since v4.0.0

## mutate

Updates a cloned `URL` with a callback, allowing multiple changes at once.

**Example** (Mutating URL credentials)

```ts
import { Url } from "effect/unstable/http"

const myUrl = new URL("https://example.com")

const mutatedUrl = Url.mutate(myUrl, (url) => {
  url.username = "user"
  url.password = "pass"
})

console.log("Mutated:", mutatedUrl.toString())
// Output: Mutated: https://user:pass@example.com/
```

**Signature**

```ts
declare const mutate: { (f: (url: URL) => void): (self: URL) => URL; (self: URL, f: (url: URL) => void): URL }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Url.ts#L98)

Since v4.0.0

# setters

## setHash

Updates the hash fragment of the URL.

**Signature**

```ts
declare const setHash: { (hash: string): (url: URL) => URL; (url: URL, hash: string): URL }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Url.ts#L123)

Since v4.0.0

## setHost

Updates the host (domain and port) of the URL.

**Signature**

```ts
declare const setHost: { (host: string): (url: URL) => URL; (url: URL, host: string): URL }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Url.ts#L134)

Since v4.0.0

## setHostname

Updates the domain of the URL without modifying the port.

**Signature**

```ts
declare const setHostname: { (hostname: string): (url: URL) => URL; (url: URL, hostname: string): URL }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Url.ts#L145)

Since v4.0.0

## setHref

Replaces the entire URL string.

**Signature**

```ts
declare const setHref: { (href: string): (url: URL) => URL; (url: URL, href: string): URL }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Url.ts#L156)

Since v4.0.0

## setPassword

Updates the password used for authentication.

**Signature**

```ts
declare const setPassword: {
  (password: string | Redacted.Redacted): (url: URL) => URL
  (url: URL, password: string | Redacted.Redacted): URL
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Url.ts#L167)

Since v4.0.0

## setPathname

Updates the path of the URL.

**Signature**

```ts
declare const setPathname: { (pathname: string): (url: URL) => URL; (url: URL, pathname: string): URL }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Url.ts#L183)

Since v4.0.0

## setPort

Updates the port of the URL.

**Signature**

```ts
declare const setPort: { (port: string | number): (url: URL) => URL; (url: URL, port: string | number): URL }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Url.ts#L194)

Since v4.0.0

## setProtocol

Updates the protocol (e.g., `http`, `https`).

**Signature**

```ts
declare const setProtocol: { (protocol: string): (url: URL) => URL; (url: URL, protocol: string): URL }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Url.ts#L205)

Since v4.0.0

## setSearch

Updates the query string of the URL.

**Signature**

```ts
declare const setSearch: { (search: string): (url: URL) => URL; (url: URL, search: string): URL }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Url.ts#L216)

Since v4.0.0

## setUrlParams

Updates the query parameters of a URL.

**Details**

This function allows you to set or replace the query parameters of a `URL`
object using the provided `UrlParams`. It creates a new `URL` object with the
updated parameters, leaving the original object unchanged.

**Example** (Replacing query parameters)

```ts
import { Url, UrlParams } from "effect/unstable/http"

const myUrl = new URL("https://example.com?foo=bar")

// Write parameters
const updatedUrl = Url.setUrlParams(myUrl, UrlParams.fromInput([["key", "value"]]))

console.log(updatedUrl.toString())
// Output: https://example.com/?key=value
```

**Signature**

```ts
declare const setUrlParams: {
  (urlParams: UrlParams.UrlParams): (url: URL) => URL
  (url: URL, urlParams: UrlParams.UrlParams): URL
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Url.ts#L261)

Since v4.0.0

## setUsername

Updates the username used for authentication.

**Signature**

```ts
declare const setUsername: { (username: string): (url: URL) => URL; (url: URL, username: string): URL }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Url.ts#L227)

Since v4.0.0
