---
title: utils.ts
nav_order: 2
parent: "@effect/vitest"
---

## utils.ts overview

Provides assertion helpers used by `@effect/vitest` tests.

This module defines small assertion functions built on Node's `assert`,
Vitest's instance checks, and Effect's equality support. The helpers cover
basic equality, thrown errors, defined and undefined values, strings, regular
expressions, class instances, `Option`, `Result`, and `Exit`. Most helpers are
synchronous; `throwsAsync` handles rejected promises.

Since v4.0.0

---

## Exports Grouped by Category

- [testing](#testing)
  - [assertDefined](#assertdefined)
  - [assertEquals](#assertequals)
  - [assertExitFailure](#assertexitfailure)
  - [assertExitSuccess](#assertexitsuccess)
  - [assertFailure](#assertfailure)
  - [assertFalse](#assertfalse)
  - [assertInclude](#assertinclude)
  - [assertInstanceOf](#assertinstanceof)
  - [assertMatch](#assertmatch)
  - [assertNone](#assertnone)
  - [assertSome](#assertsome)
  - [assertSuccess](#assertsuccess)
  - [assertTrue](#asserttrue)
  - [assertUndefined](#assertundefined)
  - [deepStrictEqual](#deepstrictequal)
  - [doesNotThrow](#doesnotthrow)
  - [fail](#fail)
  - [notDeepStrictEqual](#notdeepstrictequal)
  - [strictEqual](#strictequal)
  - [throws](#throws)
  - [throwsAsync](#throwsasync)

---

# testing

## assertDefined

Asserts that `a` is not `undefined`.

**Signature**

```ts
declare const assertDefined: <A>(a: A | undefined, ..._: Array<never>) => asserts a is Exclude<A, undefined>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/vitest/src/utils.ts#L221)

Since v4.0.0

## assertEquals

Asserts that `actual` is equal to `expected` using the `Equal.equals` trait.

**Signature**

```ts
declare const assertEquals: <A>(actual: A, expected: A, message?: string, ..._: Array<never>) => void
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/vitest/src/utils.ts#L71)

Since v4.0.0

## assertExitFailure

Asserts that `exit` is a failure with a cause equal to `expected`.

**Signature**

```ts
declare const assertExitFailure: <A, E>(
  exit: Exit.Exit<A, E>,
  expected: Cause.Cause<E>,
  ..._: Array<never>
) => asserts exit is Exit.Failure<never, E>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/vitest/src/utils.ts#L301)

Since v4.0.0

## assertExitSuccess

Asserts that `exit` is a success with a value equal to `expected`.

**Signature**

```ts
declare const assertExitSuccess: <A, E>(
  exit: Exit.Exit<A, E>,
  expected: A,
  ..._: Array<never>
) => asserts exit is Exit.Success<A, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/vitest/src/utils.ts#L315)

Since v4.0.0

## assertFailure

Asserts that `result` is `Failure` and contains an error equal to `expected`.

**Signature**

```ts
declare const assertFailure: <A, E>(
  result: Result.Result<A, E>,
  expected: E,
  ..._: Array<never>
) => asserts result is Result.Failure<never, E>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/vitest/src/utils.ts#L283)

Since v4.0.0

## assertFalse

Asserts that `self` is `false`.

**Signature**

```ts
declare const assertFalse: (self: boolean, message?: string, ..._: Array<never>) => void
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/vitest/src/utils.ts#L123)

Since v4.0.0

## assertInclude

Asserts that `actual` includes `expected`.

**Signature**

```ts
declare const assertInclude: (actual: string | undefined, expected: string, ..._: Array<never>) => void
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/vitest/src/utils.ts#L133)

Since v4.0.0

## assertInstanceOf

Asserts that `value` is an instance of `constructor`.

**Signature**

```ts
declare const assertInstanceOf: <C extends abstract new (...args: any) => any>(
  value: unknown,
  constructor: C,
  message?: string,
  ..._: Array<never>
) => asserts value is InstanceType<C>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/vitest/src/utils.ts#L98)

Since v4.0.0

## assertMatch

Asserts that `actual` matches `regExp`.

**Signature**

```ts
declare const assertMatch: (actual: string, regExp: RegExp, ..._: Array<never>) => void
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/vitest/src/utils.ts#L147)

Since v4.0.0

## assertNone

Asserts that `option` is `None`.

**Signature**

```ts
declare const assertNone: <A>(option: Option.Option<A>, ..._: Array<never>) => asserts option is Option.None<never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/vitest/src/utils.ts#L211)

Since v4.0.0

## assertSome

Asserts that `option` is `Some` and contains a value equal to `expected`.

**Signature**

```ts
declare const assertSome: <A>(
  option: Option.Option<A>,
  expected: A,
  ..._: Array<never>
) => asserts option is Option.Some<A>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/vitest/src/utils.ts#L251)

Since v4.0.0

## assertSuccess

Asserts that `result` is `Success` and contains a value equal to `expected`.

**Signature**

```ts
declare const assertSuccess: <A, E>(
  result: Result.Result<A, E>,
  expected: A,
  ..._: Array<never>
) => asserts result is Result.Success<A, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/vitest/src/utils.ts#L269)

Since v4.0.0

## assertTrue

Asserts that `self` is `true`.

**Signature**

```ts
declare const assertTrue: (self: unknown, message?: string, ..._: Array<never>) => asserts self
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/vitest/src/utils.ts#L113)

Since v4.0.0

## assertUndefined

Asserts that `a` is `undefined`.

**Signature**

```ts
declare const assertUndefined: <A>(a: A | undefined, ..._: Array<never>) => asserts a is undefined
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/vitest/src/utils.ts#L236)

Since v4.0.0

## deepStrictEqual

Asserts that `actual` is deeply strictly equal to `expected` using Node's `assert.deepStrictEqual`.

**Signature**

```ts
declare const deepStrictEqual: <A>(actual: A, expected: A, message?: string, ..._: Array<never>) => void
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/vitest/src/utils.ts#L41)

Since v4.0.0

## doesNotThrow

Asserts that `thunk` does not throw an error.

**Signature**

```ts
declare const doesNotThrow: (thunk: () => void, message?: string, ..._: Array<never>) => void
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/vitest/src/utils.ts#L84)

Since v4.0.0

## fail

Fails the current test with the provided error message.

**Signature**

```ts
declare const fail: (message: string) => void
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/vitest/src/utils.ts#L31)

Since v4.0.0

## notDeepStrictEqual

Asserts that `actual` is not deeply strictly equal to `expected` using Node's `assert.notDeepStrictEqual`.

**Signature**

```ts
declare const notDeepStrictEqual: <A>(actual: A, expected: A, message?: string, ..._: Array<never>) => void
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/vitest/src/utils.ts#L51)

Since v4.0.0

## strictEqual

Asserts that `actual` is strictly equal to `expected` using Node's `assert.strictEqual`.

**Signature**

```ts
declare const strictEqual: <A>(actual: A, expected: A, message?: string, ..._: Array<never>) => void
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/vitest/src/utils.ts#L61)

Since v4.0.0

## throws

Asserts that `thunk` throws, optionally checking the thrown value against an expected `Error` or validation function.

**Signature**

```ts
declare const throws: (thunk: () => void, error?: Error | ((u: unknown) => undefined), ..._: Array<never>) => void
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/vitest/src/utils.ts#L159)

Since v4.0.0

## throwsAsync

Asserts that `thunk` throws or returns a rejected promise, optionally checking the failure value against an expected `Error` or validation function.

**Signature**

```ts
declare const throwsAsync: (
  thunk: () => Promise<void>,
  error?: Error | ((u: unknown) => undefined),
  ..._: Array<never>
) => Promise<void>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/vitest/src/utils.ts#L182)

Since v4.0.0
