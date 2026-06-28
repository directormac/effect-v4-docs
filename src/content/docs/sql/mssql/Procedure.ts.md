---
title: Procedure.ts
nav_order: 5
parent: "@effect/sql-mssql"
---

## Procedure.ts overview

Typed metadata builders for Microsoft SQL Server stored procedure calls.

This module defines the `Procedure` values consumed by `MssqlClient.call`.
`make` starts a procedure definition, `param` and `outputParam` add typed
Tedious parameter metadata, `withRows` sets the expected row type, and
`compile` binds input values before execution. The module also defines the
typed result shape for output parameters and returned rows.

Since v4.0.0

---

## Exports Grouped by Category

- [combinators](#combinators)
  - [compile](#compile)
  - [outputParam](#outputparam)
  - [param](#param)
  - [withRows](#withrows)
- [constructors](#constructors)
  - [make](#make)
- [models](#models)
  - [Procedure (interface)](#procedure-interface)
  - [ProcedureWithValues (interface)](#procedurewithvalues-interface)
- [type IDs](#type-ids)
  - [TypeId](#typeid)
  - [TypeId (type alias)](#typeid-type-alias)
- [utils](#utils)
  - [Procedure (namespace)](#procedure-namespace)
    - [Result (interface)](#result-interface)
    - [ParametersRecord (type alias)](#parametersrecord-type-alias)

---

# combinators

## compile

Binds input values to a SQL Server stored procedure definition, producing a value that can be executed with `MssqlClient.call`.

**Signature**

```ts
declare const compile: <
  I extends Record<string, Parameter.Parameter<any>>,
  O extends Record<string, Parameter.Parameter<any>>,
  A
>(
  self: Procedure<I, O, A>
) => (input: Procedure.ParametersRecord<I>) => ProcedureWithValues<I, O, A>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/d1/src/Procedure.ts#L203)

Since v4.0.0

## outputParam

Adds a typed output parameter to a SQL Server stored procedure definition.

**Signature**

```ts
declare const outputParam: <A>() => <N extends string, T extends DataType>(
  name: N,
  type: T,
  options?: ParameterOptions
) => <I extends Record<string, Parameter.Parameter<any>>, O extends Record<string, Parameter.Parameter<any>>>(
  self: Procedure<I, O>
) => Procedure<I, Simplify<O & { [K in N]: Parameter.Parameter<A> }>>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/d1/src/Procedure.ts#L164)

Since v4.0.0

## param

Adds a typed input parameter to a SQL Server stored procedure definition.

**Signature**

```ts
declare const param: <A>() => <N extends string, T extends DataType>(
  name: N,
  type: T,
  options?: ParameterOptions
) => <I extends Record<string, Parameter.Parameter<any>>, O extends Record<string, Parameter.Parameter<any>>>(
  self: Procedure<I, O>
) => Procedure<Simplify<I & { [K in N]: Parameter.Parameter<A> }>, O>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/d1/src/Procedure.ts#L139)

Since v4.0.0

## withRows

Sets the expected row type for a SQL Server stored procedure definition.

**Signature**

```ts
declare const withRows: <A extends object = Row>() => <
  I extends Record<string, Parameter.Parameter<any>>,
  O extends Record<string, Parameter.Parameter<any>>
>(
  self: Procedure<I, O>
) => Procedure<I, O, A>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/d1/src/Procedure.ts#L189)

Since v4.0.0

# constructors

## make

Creates an empty SQL Server stored procedure definition for the given procedure name.

**Signature**

```ts
declare const make: (name: string) => Procedure<{}, {}>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/d1/src/Procedure.ts#L125)

Since v4.0.0

# models

## Procedure (interface)

Pipeable definition of a SQL Server stored procedure, tracking its input parameters, output parameters, and result row type.

**Signature**

```ts
export interface Procedure<
  I extends Record<string, Parameter.Parameter<any>>,
  O extends Record<string, Parameter.Parameter<any>>,
  A = never
> extends Pipeable {
  readonly [TypeId]: {
    readonly _A: Covariant<A>
  }
  readonly _tag: "Procedure"
  readonly name: string
  readonly params: I
  readonly outputParams: O
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/d1/src/Procedure.ts#L43)

Since v4.0.0

## ProcedureWithValues (interface)

Stored procedure definition with concrete input values bound for execution.

**Signature**

```ts
export interface ProcedureWithValues<
  I extends Record<string, Parameter.Parameter<any>>,
  O extends Record<string, Parameter.Parameter<any>>,
  A
> extends Procedure<I, O, A> {
  readonly values: Procedure.ParametersRecord<I>
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/d1/src/Procedure.ts#L63)

Since v4.0.0

# type IDs

## TypeId

Runtime type identifier used to mark SQL Server stored procedure definitions.

**Signature**

```ts
declare const TypeId: "~@effect/sql-mssql/Procedure"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/d1/src/Procedure.ts#L27)

Since v4.0.0

## TypeId (type alias)

Type-level identifier used to mark SQL Server stored procedure definitions.

**Signature**

```ts
type TypeId = "~@effect/sql-mssql/Procedure"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/d1/src/Procedure.ts#L35)

Since v4.0.0

# utils

## Procedure (namespace)

Namespace containing type helpers and result types for SQL Server stored procedures.

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/d1/src/Procedure.ts#L76)

Since v4.0.0

### Result (interface)

Result of a SQL Server stored procedure call, containing typed output parameter values and returned rows.

**Signature**

```ts
export interface Result<O extends Record<string, Parameter.Parameter<any>>, A> {
  readonly output: ParametersRecord<O>
  readonly rows: ReadonlyArray<A>
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/d1/src/Procedure.ts#L98)

Since v4.0.0

### ParametersRecord (type alias)

Maps a record of `Parameter` metadata to the corresponding record of parameter value types.

**Signature**

```ts
type { readonly [K in keyof A]: A[K] extends Parameter.Parameter<infer T> ? T : never; } = & {
      readonly [K in keyof A]: A[K] extends Parameter.Parameter<infer T> ? T
        : never
    }
    & {}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/d1/src/Procedure.ts#L83)

Since v4.0.0
