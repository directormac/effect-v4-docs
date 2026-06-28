---
title: Formatter.ts
nav_order: 38
parent: "effect"
---

## Formatter.ts overview

Formats JavaScript values into readable strings.

`format` is intended for logs, diagnostics, and error messages. It handles
primitives, objects, arrays, dates, regular expressions, maps, sets, class
instances, errors, circular references, and redactable values. `formatJson`
wraps JSON formatting with redaction and circular-reference handling, and the
module also includes helpers for property keys, paths, and dates.

Since v4.0.0

---

## Exports Grouped by Category

- [formatting](#formatting)
  - [format](#format)
- [models](#models)
  - [Formatter (interface)](#formatter-interface)
- [serialization](#serialization)
  - [formatJson](#formatjson)

---

# formatting

## format

Converts any JavaScript value into a human-readable string.

**When to use**

Use when you need to format arbitrary JavaScript values for debugging,
logging, or error messages.

**Details**

- Output is **not** valid JSON; use `formatJson` when you need
  parseable JSON.
- Handles `BigInt`, `Symbol`, `Set`, `Map`, `Date`, `RegExp`, and class
  instances that `JSON.stringify` cannot represent.
- Circular references are shown as `"[Circular]"` instead of throwing.
- Primitives: stringified naturally (`null`, `undefined`, `123`, `true`).
  Strings are JSON-quoted.
- Objects with a custom `toString` (not `Object.prototype.toString`):
  `toString()` is called unless `ignoreToString` is `true`.
- Errors with a `cause`: formatted as `"<message> (cause: <cause>)"`.
- Iterables (`Set`, `Map`, etc.): formatted as
  `ClassName([...elements])`.
- Class instances: wrapped as `ClassName({...})`.
- `Redactable` values are automatically redacted.
- Arrays/objects with 0–1 entries are inline; larger ones are
  pretty-printed when `space` is set.
- `space` — indentation unit (number of spaces, or a string like
  `"\t"`). Defaults to `0` (compact).
- `ignoreToString` — skip calling `toString()`. Defaults to `false`.

**Example** (Formatting compact output)

```ts
import { Formatter } from "effect"

console.log(Formatter.format({ a: 1, b: [2, 3] }))
// {"a":1,"b":[2,3]}
```

**Example** (Pretty-printed output)

```ts
import { Formatter } from "effect"

console.log(Formatter.format({ a: 1, b: [2, 3] }, { space: 2 }))
// {
//   "a": 1,
//   "b": [
//     2,
//     3
//   ]
// }
```

**Example** (Handling circular references)

```ts
import { Formatter } from "effect"

const obj: any = { name: "loop" }
obj.self = obj
console.log(Formatter.format(obj))
// {"name":"loop","self":[Circular]}
```

**See**

- `formatJson`
- `Formatter`

**Signature**

```ts
declare const format: (
  input: unknown,
  options?: { readonly space?: number | string | undefined; readonly ignoreToString?: boolean | undefined }
) => string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Formatter.ts#L116)

Since v2.0.0

# models

## Formatter (interface)

A callable interface representing a function that converts a `Value` into a `Format`, which defaults to `string`.

**When to use**

Use when you want to type a formatting or rendering function generically, or when you are building a pipeline that accepts pluggable formatters.

**Details**

This is a pure callable type and carries no runtime implementation. It is contravariant in `Value` and covariant in `Format`.

**Example** (Defining a custom formatter)

```ts
import type { Formatter } from "effect"

const upper: Formatter.Formatter<string> = (s) => s.toUpperCase()

console.log(upper("hello"))
// HELLO
```

**See**

- `format`
- `formatJson`

**Signature**

```ts
export interface Formatter<in Value, out Format = string> {
  (value: Value): Format
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Formatter.ts#L42)

Since v4.0.0

# serialization

## formatJson

Stringifies a value to JSON safely, silently dropping circular references.

**When to use**

Use when you need valid JSON output, unlike `format`, and the input may
contain circular references that should be silently omitted rather than
throwing a `TypeError`.

**Details**

Uses `JSON.stringify` internally with a replacer that tracks the current
object ancestry. Circular references are replaced with `undefined`, which
omits them from object output. `Redactable` values are automatically redacted
before serialization. Values not supported by JSON, such as `BigInt`,
`Symbol`, `undefined`, and functions, follow standard `JSON.stringify`
behavior. The `space` parameter controls indentation and defaults to `0`.

**Example** (Formatting compact JSON)

```ts
import { Formatter } from "effect"

console.log(Formatter.formatJson({ name: "Alice", age: 30 }))
// {"name":"Alice","age":30}
```

**Example** (Handling circular references)

```ts
import { Formatter } from "effect"

const obj: any = { name: "test" }
obj.self = obj
console.log(Formatter.formatJson(obj))
// {"name":"test"}
```

**Example** (Pretty-printed JSON)

```ts
import { Formatter } from "effect"

console.log(Formatter.formatJson({ name: "Alice", age: 30 }, { space: 2 }))
// {
//   "name": "Alice",
//   "age": 30
// }
```

**See**

- `format`
- `Formatter`

**Signature**

```ts
declare const formatJson: (input: unknown, options?: { readonly space?: number | string | undefined }) => string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Formatter.ts#L297)

Since v4.0.0
