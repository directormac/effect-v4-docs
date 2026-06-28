---
title: Take.ts
nav_order: 118
parent: "effect"
---

## Take.ts overview

The `Take` module provides the stored representation of one pull result from
a stream-like producer. A `Take<A, E, Done>` is either a non-empty batch of
emitted values, a failed `Exit`, or a successful `Exit` carrying the
completion value.

Since v2.0.0

---

## Exports Grouped by Category

- [converting](#converting)
  - [toPull](#topull)
- [models](#models)
  - [Take (type alias)](#take-type-alias)

---

# converting

## toPull

Converts a `Take` into a `Pull`, succeeding with value batches, failing with
failure exits, and translating successful exits into pull completion.

**When to use**

Use to interpret a stored or transferred `Take` as a `Pull` step while
preserving emitted batches, ordinary failures, and completion values.

**Signature**

```ts
declare const toPull: <A, E, Done>(take: Take<A, E, Done>) => Pull.Pull<NonEmptyReadonlyArray<A>, E, Done>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Take.ts#L43)

Since v4.0.0

# models

## Take (type alias)

Represents one pull result: either a non-empty batch of values, a failure
`Exit`, or a successful `Exit` that signals completion with a `Done` value.

**When to use**

Use to store, transfer, or interpret pull results later while preserving
emitted values, failures, and normal completion.

**See**

- `toPull` for interpreting a `Take` as a `Pull` step

**Signature**

```ts
type Take<A, E, Done> = NonEmptyReadonlyArray<A> | Exit.Exit<Done, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Take.ts#L29)

Since v2.0.0
