---
title: Redis.ts
nav_order: 298
parent: "effect"
---

## Redis.ts overview

Redis support shared by persistence modules.

This module defines a `Redis` service that can send Redis commands and run
Lua scripts. It does not create a Redis client itself; callers provide a
`send` function from their client or connection pool. The module also
provides helpers for describing Lua scripts, loading them once, and running
them later by their cached Redis id.

Since v4.0.0

---

## Exports Grouped by Category

- [Scripting](#scripting)
  - [Script (interface)](#script-interface)
  - [script](#script)
- [constructors](#constructors)
  - [make](#make)
- [errors](#errors)
  - [RedisError (class)](#rediserror-class)
    - [[ErrorTypeId] (property)](#errortypeid-property)
- [services](#services)
  - [Redis (class)](#redis-class)

---

# Scripting

## Script (interface)

Typed descriptor for a Redis Lua script.

**Details**

It defines the Lua source, parameter-to-argument mapping, Redis key count,
and result type used by `Redis.eval`.

**Signature**

```ts
export interface Script<
  Config extends {
    readonly params: ReadonlyArray<unknown>
    readonly result: unknown
  }
> {
  readonly [ScriptTypeId]: {
    readonly params: Config["params"]
    readonly result: Config["result"]
  }
  readonly lua: string
  readonly params: (...params: Config["params"]) => ReadonlyArray<unknown>
  readonly numberOfKeys: (...params: Config["params"]) => number

  /**
   * Set the return type of the script.
   */
  withReturnType<Result>(): Script<{
    params: Config["params"]
    result: Result
  }>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Redis.ts#L124)

Since v4.0.0

## script

Constructs a typed Redis Lua script descriptor.

**Details**

The result type defaults to `void` and can be refined with
`withReturnType`.

**Signature**

```ts
declare const script: <Params extends ReadonlyArray<any>>(
  f: (...params: Params) => ReadonlyArray<unknown>,
  options: { readonly lua: string; readonly numberOfKeys: number | ((...params: Params) => number) }
) => Script<{ params: Params; result: void }>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Redis.ts#L174)

Since v4.0.0

# constructors

## make

Creates a `Redis` service from a raw command sender.

**Details**

Lua scripts are loaded through `SCRIPT LOAD`, cached, and then invoked with
`EVALSHA`.

**Signature**

```ts
declare const make: (options: {
  readonly send: <A = unknown>(command: string, ...args: ReadonlyArray<string>) => Effect.Effect<A, RedisError>
}) => Effect.Effect<
  {
    readonly send: <A = unknown>(command: string, ...args: ReadonlyArray<string>) => Effect.Effect<A, RedisError>
    readonly eval: <Config extends { readonly params: ReadonlyArray<unknown>; readonly result: unknown }>(
      script: Script<Config>
    ) => (...params: Config["params"]) => Effect.Effect<Config["result"], RedisError>
  },
  never,
  never
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Redis.ts#L48)

Since v4.0.0

# errors

## RedisError (class)

Error raised by Redis command or script execution.

**Signature**

```ts
declare class RedisError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Redis.ts#L98)

Since v4.0.0

### [ErrorTypeId] (property)

Marks this value as a Redis persistence error for runtime guards.

**Signature**

```ts
readonly [ErrorTypeId]: "~effect/persistence/Redis/RedisError"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Redis.ts#L107)

Since v4.0.0

# services

## Redis (class)

Service for sending Redis commands and evaluating cached Lua scripts.

**Signature**

```ts
declare class Redis
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Redis.ts#L26)

Since v4.0.0
