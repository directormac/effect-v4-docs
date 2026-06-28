---
title: FastCheck.ts
nav_order: 120
parent: "effect"
---

## FastCheck.ts overview

Re-exports all functionality from the fast-check library, providing access to
property-based testing utilities including arbitraries, property testing,
and random data generation.

Fast-check allows you to write tests by specifying properties that should hold
true for your functions, rather than writing specific test cases. The library
then generates many random inputs to verify these properties.

**Example** (Checking an array reversal property)

```ts
import { FastCheck } from "effect/testing"

// Property: reverse of reverse should equal original
const reverseProp = FastCheck.property(FastCheck.array(FastCheck.integer()), (arr: Array<number>) => {
  const reversed = arr.slice().reverse()
  const doubleReversed = reversed.slice().reverse()
  return JSON.stringify(arr) === JSON.stringify(doubleReversed)
})

// Run the property test
FastCheck.assert(reverseProp)
```

**Example** (Checking string concatenation properties)

```ts
import { FastCheck } from "effect/testing"

// Test string concatenation properties
const concatProp = FastCheck.property(FastCheck.string(), FastCheck.string(), (a: string, b: string) => {
  const result = a + b
  return result.length === a.length + b.length && result.startsWith(a) && result.endsWith(b)
})

FastCheck.assert(concatProp)
```

**Example** (Generating record data for properties)

```ts
import { FastCheck } from "effect/testing"

// Generate random data for testing
const personArbitrary = FastCheck.record({
  name: FastCheck.string({ minLength: 1 }),
  age: FastCheck.integer({ min: 0, max: 120 }),
  email: FastCheck.emailAddress()
})

// Use in property tests
const validPersonProp = FastCheck.property(personArbitrary, (person: { name: string; age: number; email: string }) => {
  return person.name.length > 0 && person.age >= 0 && person.age <= 120 && person.email.includes("@")
})

FastCheck.assert(validPersonProp)
```

Since v3.10.0

---

## Exports Grouped by Category

- [re-exports](#re-exports)
  - ["fast-check" (namespace export)](#fast-check-namespace-export)

---

# re-exports

## "fast-check" (namespace export)

Re-exports all named exports from the "fast-check" module.

**Signature**

```ts
export * from "fast-check"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FastCheck.ts#L89)

Since v3.10.0
