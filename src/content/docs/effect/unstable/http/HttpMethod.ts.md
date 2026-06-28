---
title: HttpMethod.ts
nav_order: 247
parent: "effect"
---

## HttpMethod.ts overview

Union of supported uppercase HTTP method literals.

Since v4.0.0

---

## Exports Grouped by Category

- [constants](#constants)
  - [all](#all)
  - [allShort](#allshort)
- [models](#models)
  - [HttpMethod (type alias)](#httpmethod-type-alias)
- [predicates](#predicates)
  - [hasBody](#hasbody)
- [refinements](#refinements)
  - [isHttpMethod](#ishttpmethod)
- [utils](#utils)
  - [HttpMethod (namespace)](#httpmethod-namespace)
    - [NoBody (type alias)](#nobody-type-alias)
    - [WithBody (type alias)](#withbody-type-alias)

---

# constants

## all

Provides a readonly set containing every supported `HttpMethod` literal.

**When to use**

Use when you need to iterate over or test membership against every supported
HTTP method literal.

**Signature**

```ts
declare const all: ReadonlySet<HttpMethod>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpMethod.ts#L71)

Since v4.0.0

## allShort

Provides tuples mapping each supported HTTP method to its short
request-constructor name.

**When to use**

Use when you need the mapping from supported HTTP method literals to their
short request-constructor names.

**Signature**

```ts
declare const allShort: readonly [
  readonly ["GET", "get"],
  readonly ["POST", "post"],
  readonly ["PUT", "put"],
  readonly ["DELETE", "del"],
  readonly ["PATCH", "patch"],
  readonly ["HEAD", "head"],
  readonly ["OPTIONS", "options"],
  readonly ["TRACE", "trace"]
]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpMethod.ts#L94)

Since v4.0.0

# models

## HttpMethod (type alias)

Union of supported uppercase HTTP method literals.

**Signature**

```ts
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS" | "TRACE"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpMethod.ts#L18)

Since v4.0.0

# predicates

## hasBody

Returns `true` when a method can carry a request body and narrows it to `HttpMethod.WithBody`.

**Signature**

```ts
declare const hasBody: (method: HttpMethod) => method is HttpMethod.WithBody
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpMethod.ts#L57)

Since v4.0.0

# refinements

## isHttpMethod

Checks whether a value is a `HttpMethod`.

**Example** (Checking HTTP method values)

```ts
import { HttpMethod } from "effect/unstable/http"

console.log(HttpMethod.isHttpMethod("GET"))
// true
console.log(HttpMethod.isHttpMethod("get"))
// false
console.log(HttpMethod.isHttpMethod(1))
// false
```

**Signature**

```ts
declare const isHttpMethod: (u: unknown) => u is HttpMethod
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpMethod.ts#L124)

Since v4.0.0

# utils

## HttpMethod (namespace)

Namespace containing subtype helpers associated with `HttpMethod`.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpMethod.ts#L33)

Since v4.0.0

### NoBody (type alias)

HTTP methods that this module treats as not carrying a request body.

**Signature**

```ts
type NoBody = "GET" | "HEAD" | "OPTIONS" | "TRACE"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpMethod.ts#L40)

Since v4.0.0

### WithBody (type alias)

HTTP methods that this module treats as capable of carrying a request body.

**Signature**

```ts
type WithBody = Exclude<HttpMethod, NoBody>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpMethod.ts#L48)

Since v4.0.0
