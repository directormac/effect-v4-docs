---
title: Symbol.ts
nav_order: 116
parent: "effect"
---

## Symbol.ts overview

The `Symbol` module contains the runtime predicate for JavaScript primitive
`symbol` values. It is most useful at boundaries where a value is `unknown`
and must be narrowed before it can be used as a symbol key, identifier, or
discriminant.

Since v2.0.0

---

## Exports Grouped by Category

- [guards](#guards)
  - [isSymbol](#issymbol)

---

# guards

## isSymbol

Checks whether a value is a `symbol`.

**When to use**

Use to validate unknown input before treating it as a JavaScript `symbol`.

**Example** (Checking for symbols)

```ts
import { Symbol } from "effect"

console.log(Symbol.isSymbol(globalThis.Symbol.for("a"))) // true
console.log(Symbol.isSymbol("a")) // false
```

**Signature**

```ts
declare const isSymbol: (u: unknown) => u is symbol
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Symbol.ts#L31)

Since v2.0.0
