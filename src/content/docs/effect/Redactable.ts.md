---
title: Redactable.ts
nav_order: 85
parent: "effect"
---

## Redactable.ts overview

Context-aware redaction for sensitive values.

The `Redactable` module provides a protocol for objects that need to present
alternative representations of themselves depending on the runtime context.
Typical use cases include masking secrets, tokens, or personal data in logs, traces,
and serialized output.

Since v4.0.0

---

## Exports Grouped by Category

- [destructors](#destructors)
  - [getRedacted](#getredacted)
  - [redact](#redact)
- [guards](#guards)
  - [isRedactable](#isredactable)
- [models](#models)
  - [Redactable (interface)](#redactable-interface)
- [symbols](#symbols)
  - [symbolRedactable](#symbolredactable)

---

# destructors

## getRedacted

Returns the result of calling `[symbolRedactable]` on a value that is
already known to be `Redactable`.

**When to use**

Use when you need to read the redacted representation from a value already
verified as `Redactable`.

**Details**

This function reads the current fiber's `Context` from the global fiber
reference and passes it to the redaction method.

**Gotchas**

If no fiber is active, an empty `Context` is passed to the redaction method.

**See**

- `redact` for the higher-level variant that handles non-redactable values
- `isRedactable` for the type guard to verify before calling this

**Signature**

```ts
declare const getRedacted: (redactable: Redactable) => unknown
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Redactable.ts#L155)

Since v4.0.0

## redact

Returns a redacted value if it implements `Redactable`, otherwise returns it
unchanged.

**When to use**

Use as the general-purpose entry point for redaction when the input may
or may not implement the redaction protocol.

**Details**

This function calls `isRedactable` and, when it returns `true`,
delegates to `getRedacted`.

**Gotchas**

Redaction is not recursive. Nested redactable values inside the returned
object are not automatically redacted.

**See**

- `isRedactable` to check before redacting
- `getRedacted` for the lower-level variant for known redactables

**Signature**

```ts
declare const redact: (u: unknown) => unknown
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Redactable.ts#L127)

Since v3.10.0

# guards

## isRedactable

Type guard that checks whether a value implements the `Redactable`
interface.

**When to use**

Use to narrow an unknown value before calling redaction-specific helpers.

**See**

- `Redactable` for the interface being checked
- `redact` to apply redaction if the value is redactable

**Signature**

```ts
declare const isRedactable: (u: unknown) => u is Redactable
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Redactable.ts#L101)

Since v3.10.0

# models

## Redactable (interface)

Interface for objects that provide context-aware redacted representations.

**When to use**

Use to define classes or objects that hold sensitive data and should present
a sanitized form when inspected or logged.

**Details**

The `[symbolRedactable]` method receives the current fiber's `Context`. If no
fiber is active, an empty `Context` is provided.

**Example** (Masking an API key)

```ts
import { Context, Redactable } from "effect"

class ApiKey {
  constructor(readonly raw: string) {}

  [Redactable.symbolRedactable](_ctx: Context.Context<never>) {
    return this.raw.slice(0, 4) + "..."
  }
}
```

**See**

- `symbolRedactable` for the symbol key to implement
- `redact` to apply redaction to any value
- `isRedactable` for the type guard for this interface

**Signature**

```ts
export interface Redactable {
  readonly [symbolRedactable]: (context: Context.Context<never>) => unknown
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Redactable.ts#L84)

Since v3.10.0

# symbols

## symbolRedactable

Defines the symbol used to identify objects that implement the `Redactable`
protocol.

**When to use**

Use as the property key when implementing the `Redactable` protocol.

**Details**

Add a method under this key to make an object redactable. The method receives
the current `Context` and must return the replacement value. The symbol is
registered globally via `Symbol.for("~effect/Redactable")`, so it is
identical across multiple copies of the library at runtime.

**Example** (Masking an API key)

```ts
import { Context, Redactable } from "effect"

class ApiKey {
  constructor(readonly raw: string) {}

  [Redactable.symbolRedactable](_ctx: Context.Context<never>) {
    return this.raw.slice(0, 4) + "..."
  }
}
```

**See**

- `Redactable` for the interface this symbol belongs to
- `isRedactable` to check whether a value has this symbol

**Signature**

```ts
declare const symbolRedactable: unique symbol
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Redactable.ts#L49)

Since v3.10.0
