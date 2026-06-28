---
title: RegExp.ts
nav_order: 90
parent: "effect"
---

## RegExp.ts overview

Tools for working with JavaScript regular expressions from the Effect module
namespace. The module exposes the native `RegExp` constructor, a guard for
narrowing unknown values, and escaping for literal text that will be embedded
in a pattern.

Reach for `RegExp` when you need to build a regular expression from user or
data-driven text, check whether an unknown value is already a `RegExp`, or
access the native constructor without leaving the Effect namespace.

Since v2.0.0

---

## Exports Grouped by Category

- [RegExp](#regexp)
  - [escape](#escape)
- [constructors](#constructors)
  - [RegExp](#regexp-1)
- [guards](#guards)
  - [isRegExp](#isregexp)

---

# RegExp

## escape

Escapes special characters in a regular expression pattern.

**When to use**

Use to turn literal text into a safe regular expression pattern fragment.

**Example** (Escaping a pattern string)

```ts
import { RegExp } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(RegExp.escape("a*b"), "a\\*b")
```

**Signature**

```ts
declare const escape: (string: string) => string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RegExp.ts#L82)

Since v2.0.0

# constructors

## RegExp

Exposes the JavaScript regular expression constructor from `globalThis`.

**When to use**

Use to construct JavaScript regular expressions through the Effect module
namespace.

**Example** (Creating a regular expression)

```ts
import { RegExp } from "effect"

// Create a regular expression using Effect's RegExp constructor
const pattern = new RegExp.RegExp("hello", "i")

// Test the pattern
console.log(pattern.test("Hello World")) // true
console.log(pattern.test("goodbye")) // false
```

**Signature**

```ts
declare const RegExp: RegExpConstructor
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RegExp.ts#L39)

Since v4.0.0

# guards

## isRegExp

Checks whether a value is a `RegExp`.

**When to use**

Use to validate unknown input before treating it as a regular expression.

**Example** (Checking for regular expressions)

```ts
import { RegExp } from "effect"
import * as assert from "node:assert"

assert.deepStrictEqual(RegExp.isRegExp(/a/), true)
assert.deepStrictEqual(RegExp.isRegExp("a"), false)
```

**Signature**

```ts
declare const isRegExp: (input: unknown) => input is RegExp
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RegExp.ts#L61)

Since v3.9.0
