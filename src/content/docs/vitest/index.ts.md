---
title: index.ts
nav_order: 1
parent: "@effect/vitest"
---

## index.ts overview

Since v4.0.0

---

## Exports Grouped by Category

- [utils](#utils)
  - ["vitest" (namespace export)](#vitest-namespace-export)
  - [API (type alias)](#api-type-alias)
  - [Vitest (namespace)](#vitest-namespace)
    - [TestFunction (interface)](#testfunction-interface)
    - [Test (interface)](#test-interface)
    - [Tester (interface)](#tester-interface)
    - [MethodsNonLive (interface)](#methodsnonlive-interface)
    - [Methods (interface)](#methods-interface)
    - [Arbitraries (type alias)](#arbitraries-type-alias)
  - [addEqualityTesters](#addequalitytesters)
  - [describeWrapped](#describewrapped)
  - [effect](#effect)
  - [flakyTest](#flakytest)
  - [it](#it)
  - [layer](#layer)
  - [live](#live)
  - [makeMethods](#makemethods)
  - [prop](#prop)

---

# utils

## "vitest" (namespace export)

Re-exports all named exports from the "vitest" module.

**Signature**

```ts
export * from "vitest"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/vitest/src/index.ts#L16)

Since v4.0.0

## API (type alias)

**Signature**

```ts
type API = V.TestAPI<{}>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/vitest/src/index.ts#L21)

Since v4.0.0

## Vitest (namespace)

[Source](https://github.com/Effect-TS/effect/tree/main/packages/vitest/src/index.ts#L26)

Since v4.0.0

### TestFunction (interface)

**Signature**

```ts
export interface TestFunction<A, E, R, TestArgs extends Array<any>> {
  (...args: TestArgs): Effect.Effect<A, E, R>
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/vitest/src/index.ts#L30)

Since v4.0.0

### Test (interface)

**Signature**

```ts
export interface Test<R> {
  <A, E>(name: string, self: TestFunction<A, E, R, [V.TestContext]>, timeout?: number | V.TestOptions): void
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/vitest/src/index.ts#L37)

Since v4.0.0

### Tester (interface)

**Signature**

```ts
export interface Tester<R> extends Vitest.Test<R> {
  skip: Vitest.Test<R>
  skipIf: (condition: unknown) => Vitest.Test<R>
  runIf: (condition: unknown) => Vitest.Test<R>
  only: Vitest.Test<R>
  each: <T>(
    cases: ReadonlyArray<T>
  ) => <A, E>(name: string, self: TestFunction<A, E, R, Array<T>>, timeout?: number | V.TestOptions) => void
  fails: Vitest.Test<R>

  /**
   * @since 4.0.0
   */
  prop: <const Arbs extends Arbitraries, A, E>(
    name: string,
    arbitraries: Arbs,
    self: TestFunction<
      A,
      E,
      R,
      [
        {
          [K in keyof Arbs]: Arbs[K] extends FC.Arbitrary<infer T>
            ? T
            : Arbs[K] extends Schema.Schema<infer T>
              ? T
              : never
        },
        V.TestContext
      ]
    >,
    timeout?:
      | number
      | (V.TestOptions & {
          fastCheck?: FC.Parameters<{
            [K in keyof Arbs]: Arbs[K] extends FC.Arbitrary<infer T>
              ? T
              : Arbs[K] extends Schema.Schema<infer T>
                ? T
                : never
          }>
        })
  ) => void
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/vitest/src/index.ts#L55)

Since v4.0.0

### MethodsNonLive (interface)

**Signature**

```ts
export interface MethodsNonLive<R = never> extends API {
  readonly effect: Vitest.Tester<R | Scope.Scope>
  readonly flakyTest: <A, E, R2>(
    self: Effect.Effect<A, E, R2 | Scope.Scope>,
    timeout?: Duration.Input
  ) => Effect.Effect<A, never, R2>
  readonly layer: <R2, E>(
    layer: Layer.Layer<R2, E, R>,
    options?: {
      readonly timeout?: Duration.Input
    }
  ) => {
    (f: (it: Vitest.MethodsNonLive<R | R2>) => void): void
    (name: string, f: (it: Vitest.MethodsNonLive<R | R2>) => void): void
  }

  /**
   * @since 4.0.0
   */
  readonly prop: <const Arbs extends Arbitraries>(
    name: string,
    arbitraries: Arbs,
    self: (
      properties: {
        [K in keyof Arbs]: Arbs[K] extends FC.Arbitrary<infer T>
          ? T
          : Arbs[K] extends Schema.Schema<infer T>
            ? T
            : never
      },
      ctx: V.TestContext
    ) => void,
    timeout?:
      | number
      | (V.TestOptions & {
          fastCheck?: FC.Parameters<{
            [K in keyof Arbs]: Arbs[K] extends FC.Arbitrary<infer T>
              ? T
              : Arbs[K] extends Schema.Schema<infer T>
                ? T
                : never
          }>
        })
  ) => void
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/vitest/src/index.ts#L100)

Since v4.0.0

### Methods (interface)

**Signature**

```ts
export interface Methods<R = never> extends MethodsNonLive<R> {
  readonly live: Vitest.Tester<Scope.Scope | R>
  readonly layer: <R2, E>(
    layer: Layer.Layer<R2, E, R>,
    options?: {
      readonly memoMap?: Layer.MemoMap
      readonly timeout?: Duration.Input
      readonly excludeTestServices?: boolean
    }
  ) => {
    (f: (it: Vitest.MethodsNonLive<R | R2>) => void): void
    (name: string, f: (it: Vitest.MethodsNonLive<R | R2>) => void): void
  }
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/vitest/src/index.ts#L145)

Since v4.0.0

### Arbitraries (type alias)

**Signature**

```ts
type Arbitraries =
  | Array<Schema.Schema<any> | FC.Arbitrary<any>>
  | { [K in string]: Schema.Schema<any> | FC.Arbitrary<any> }
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/vitest/src/index.ts#L48)

Since v4.0.0

## addEqualityTesters

**Signature**

```ts
declare const addEqualityTesters: () => void
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/vitest/src/index.ts#L164)

Since v4.0.0

## describeWrapped

**Signature**

```ts
declare const describeWrapped: (name: string, f: (it: Vitest.Methods) => void) => V.SuiteCollector
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/vitest/src/index.ts#L258)

Since v4.0.0

## effect

**Signature**

```ts
declare const effect: Vitest.Tester<Scope.Scope>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/vitest/src/index.ts#L169)

Since v4.0.0

## flakyTest

**Signature**

```ts
declare const flakyTest: <A, E, R>(
  self: Effect.Effect<A, E, R | Scope.Scope>,
  timeout?: Duration.Input
) => Effect.Effect<A, never, R>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/vitest/src/index.ts#L231)

Since v4.0.0

## it

**Signature**

```ts
declare const it: Vitest.Methods<never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/vitest/src/index.ts#L248)

Since v4.0.0

## layer

Share a `Layer` between multiple tests, optionally wrapping
the tests in a `describe` block if a name is provided.

**Signature**

```ts
declare const layer: <R, E>(
  layer_: Layer.Layer<R, E>,
  options?: {
    readonly memoMap?: Layer.MemoMap
    readonly timeout?: Duration.Input
    readonly excludeTestServices?: boolean
  }
) => {
  (f: (it: Vitest.MethodsNonLive<R>) => void): void
  (name: string, f: (it: Vitest.MethodsNonLive<R>) => void): void
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/vitest/src/index.ts#L216)

Since v4.0.0

```ts
import { expect, layer } from "@effect/vitest"
import { Effect, Layer, Context } from "effect"

class Foo extends Context.Service("Foo")<Foo, "foo">() {
  static Live = Layer.succeed(Foo, "foo")
}

class Bar extends Context.Service("Bar")<Bar, "bar">() {
  static Live = Layer.effect(
    Bar,
    Effect.map(Foo, () => "bar" as const)
  )
}

layer(Foo.Live)("layer", (it) => {
  it.effect("adds context", () =>
    Effect.gen(function* () {
      const foo = yield* Foo
      expect(foo).toEqual("foo")
    })
  )

  it.layer(Bar.Live)("nested", (it) => {
    it.effect("adds context", () =>
      Effect.gen(function* () {
        const foo = yield* Foo
        const bar = yield* Bar
        expect(foo).toEqual("foo")
        expect(bar).toEqual("bar")
      })
    )
  })
})
```

## live

**Signature**

```ts
declare const live: Vitest.Tester<Scope.Scope>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/vitest/src/index.ts#L174)

Since v4.0.0

## makeMethods

**Signature**

```ts
declare const makeMethods: (it: V.TestAPI) => Vitest.Methods
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/vitest/src/index.ts#L253)

Since v4.0.0

## prop

**Signature**

```ts
declare const prop: <const Arbs extends Vitest.Arbitraries>(
  name: string,
  arbitraries: Arbs,
  self: (
    properties: {
      [K in keyof Arbs]: Arbs[K] extends FC.Arbitrary<infer T> ? T : Arbs[K] extends Schema.Schema<infer T> ? T : never
    },
    ctx: V.TestContext
  ) => void,
  timeout?:
    | number
    | (V.TestOptions & {
        fastCheck?: FC.Parameters<{
          [K in keyof Arbs]: Arbs[K] extends FC.Arbitrary<infer T>
            ? T
            : Arbs[K] extends Schema.Schema<infer T>
              ? T
              : never
        }>
      })
) => void
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/vitest/src/index.ts#L239)

Since v4.0.0
