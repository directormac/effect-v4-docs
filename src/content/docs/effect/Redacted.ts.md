---
title: Redacted.ts
nav_order: 86
parent: "effect"
---

## Redacted.ts overview

Wraps sensitive values so normal output does not reveal them.

A `Redacted<A>` shows a redacted placeholder in string, JSON, and inspection
output, while still storing the original value for trusted code that needs to
recover it. This helps reduce accidental leaks in logs and diagnostics. This
module includes constructors, runtime checks, value recovery, wiping of stored
values, and comparison helpers that avoid exposing the wrapped value at the
call site.

Since v3.3.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [make](#make)
- [getters](#getters)
  - [value](#value)
- [instances](#instances)
  - [makeEquivalence](#makeequivalence)
- [models](#models)
  - [Redacted (interface)](#redacted-interface)
- [refinements](#refinements)
  - [isRedacted](#isredacted)
- [unsafe](#unsafe)
  - [wipeUnsafe](#wipeunsafe)
- [utils](#utils)
  - [Redacted (namespace)](#redacted-namespace)
    - [Variance (interface)](#variance-interface)
    - [Value (type alias)](#value-type-alias)

---

# constructors

## make

Creates a `Redacted` wrapper for a sensitive value.

**When to use**

Use to wrap a sensitive value so normal string, JSON, and inspection output
is redacted.

**Details**

The wrapper redacts string, JSON, and inspection output to reduce accidental
disclosure. The original value remains retrievable with `Redacted.value`
until the wrapper is wiped or becomes unreachable.

**Example** (Creating a redacted value)

```ts
import { Redacted } from "effect"

const API_KEY = Redacted.make("1234567890")
```

**Signature**

```ts
declare const make: <T>(value: T, options?: { readonly label?: string | undefined }) => Redacted<T>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Redacted.ts#L185)

Since v3.3.0

# getters

## value

Retrieves the original value from a `Redacted` instance. Use this function
with caution, as it exposes the sensitive data.

**When to use**

Use when you need the underlying sensitive value at a trusted boundary.

**Example** (Retrieving a redacted value)

```ts
import { Redacted } from "effect"
import * as assert from "node:assert"

const API_KEY = Redacted.make("1234567890")

assert.equal(Redacted.value(API_KEY), "1234567890")
```

**Signature**

```ts
declare const value: <T>(self: Redacted<T>) => T
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Redacted.ts#L244)

Since v3.3.0

# instances

## makeEquivalence

Generates an equivalence relation for `Redacted<A>` values based on an
equivalence relation for the underlying values `A`. This function is useful
for comparing `Redacted` instances without exposing their contents.

**When to use**

Use when you need to compare wrapped secrets through an approved equality
rule without exposing the underlying values at each comparison site.

**Example** (Comparing redacted values)

```ts
import { Equivalence, Redacted } from "effect"
import * as assert from "node:assert"

const API_KEY1 = Redacted.make("1234567890")
const API_KEY2 = Redacted.make("1-34567890")
const API_KEY3 = Redacted.make("1234567890")

const equivalence = Redacted.makeEquivalence(Equivalence.strictEqual<string>())

assert.equal(equivalence(API_KEY1, API_KEY2), false)
assert.equal(equivalence(API_KEY1, API_KEY3), true)
```

**Signature**

```ts
declare const makeEquivalence: <A>(isEquivalent: Equivalence.Equivalence<A>) => Equivalence.Equivalence<Redacted<A>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Redacted.ts#L313)

Since v4.0.0

# models

## Redacted (interface)

A wrapper for sensitive values whose string, JSON, and inspection output is
redacted.

**When to use**

Use to carry sensitive values while reducing accidental exposure in string,
JSON, and inspection output.

**Gotchas**

The underlying value is still stored in memory and can be recovered with
`Redacted.value` until the wrapper is wiped or becomes unreachable. Use
`Redacted` to reduce accidental disclosure in logs and diagnostics, not as a
cryptographic protection mechanism.

**Example** (Creating redacted values)

```ts
import { Redacted } from "effect"

// Create a redacted value to protect sensitive information
const apiKey = Redacted.make("secret-key")
const userPassword = Redacted.make("user-password")

// TypeScript will infer the types as Redacted<string>
```

**Signature**

```ts
export interface Redacted<out A = string> extends Redacted.Variance<A>, Equal.Equal, Pipeable {
  readonly label: string | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Redacted.ts#L55)

Since v3.3.0

# refinements

## isRedacted

Returns `true` if a value is a `Redacted` wrapper.

**When to use**

Use to validate unknown input and narrow it to `Redacted`.

**Details**

When this function returns `true`, TypeScript narrows the value to
`Redacted<unknown>`.

**Example** (Checking for redacted values)

```ts
import { Redacted } from "effect"

const secret = Redacted.make("my-secret")
const plainString = "not-secret"

console.log(Redacted.isRedacted(secret)) // true
console.log(Redacted.isRedacted(plainString)) // false
```

**Signature**

```ts
declare const isRedacted: (u: unknown) => u is Redacted<unknown>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Redacted.ts#L158)

Since v3.3.0

# unsafe

## wipeUnsafe

Deletes the stored value for a `Redacted` wrapper, making future
`Redacted.value` calls on that wrapper fail.

**When to use**

Use when a `Redacted` wrapper should no longer be able to reveal its stored
value.

**Gotchas**

This unsafe operation does not zero memory and does not affect other
references to the original value. It only removes the value from the
internal redacted registry.

**Example** (Wiping a redacted value)

```ts
import { Redacted } from "effect"
import * as assert from "node:assert"

const API_KEY = Redacted.make("1234567890")

assert.equal(Redacted.value(API_KEY), "1234567890")

Redacted.wipeUnsafe(API_KEY)

assert.throws(() => Redacted.value(API_KEY), new Error("Unable to get redacted value"))
```

**Signature**

```ts
declare const wipeUnsafe: <T>(self: Redacted<T>) => boolean
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Redacted.ts#L282)

Since v4.0.0

# utils

## Redacted (namespace)

Namespace containing type-level members associated with `Redacted` values.

**When to use**

Use to access type-level helpers associated with `Redacted`.

**Example** (Using namespace utilities)

```ts
import { Redacted } from "effect"

// Use the Redacted namespace for type-level operations
const secret = Redacted.make("my-secret")

// The namespace contains utilities for working with Redacted values
const isRedacted = Redacted.isRedacted(secret) // true
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Redacted.ts#L80)

Since v3.3.0

### Variance (interface)

Type-level variance marker for `Redacted`.

**When to use**

Use when defining internals that need to preserve the covariant value type
carried by `Redacted`.

**Details**

This interface records the covariant value type carried by a `Redacted`
value and is not normally referenced directly by users.

**Signature**

```ts
export interface Variance<out A> {
  readonly [TypeId]: {
    readonly _A: Covariant<A>
  }
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Redacted.ts#L97)

Since v3.3.0

### Value (type alias)

Extracts the underlying value type from a `Redacted` type.

**When to use**

Use to infer the sensitive value type from an existing `Redacted` type.

**Example** (Extracting the redacted value type)

```ts
import { Redacted } from "effect"

type ApiKey = Redacted.Redacted<{ readonly token: string }>
type ApiKeyValue = Redacted.Redacted.Value<ApiKey>

const rotate = (value: ApiKeyValue): ApiKeyValue => ({
  token: `${value.token}:rotated`
})

console.log(rotate({ token: "secret" })) // { token: "secret:rotated" }
```

**Signature**

```ts
type Value<T> = [T] extends [Redacted<infer _A>] ? _A : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Redacted.ts#L128)

Since v3.3.0
