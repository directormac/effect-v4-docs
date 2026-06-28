---
title: Parameter.ts
nav_order: 4
parent: "@effect/sql-mssql"
---

## Parameter.ts overview

Typed SQL Server stored procedure parameter metadata.

This module builds `Parameter` values that pair a stored procedure
parameter name with a Tedious `DataType`, Tedious `ParameterOptions`, and a
phantom TypeScript value type. `Procedure.param` and
`Procedure.outputParam` use this metadata, and `MssqlClient.call` forwards it
to Tedious when registering input and output parameters.

**See**

- `make` for constructing parameter metadata directly.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [make](#make)
- [models](#models)
  - [Parameter (interface)](#parameter-interface)
- [type IDs](#type-ids)
  - [TypeId](#typeid)
  - [TypeId (type alias)](#typeid-type-alias)

---

# constructors

## make

Creates typed metadata for a SQL Server stored procedure parameter.

**Signature**

```ts
declare const make: <A>(name: string, type: DataType, options?: ParameterOptions) => Parameter<A>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/d1/src/Parameter.ts#L54)

Since v4.0.0

# models

## Parameter (interface)

Metadata for a SQL Server stored procedure parameter, including its name, Tedious data type, options, and phantom value type.

**Signature**

```ts
export interface Parameter<out A> {
  readonly [TypeId]: (_: never) => A
  readonly _tag: "Parameter"
  readonly name: string
  readonly type: DataType
  readonly options: ParameterOptions
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/d1/src/Parameter.ts#L40)

Since v4.0.0

# type IDs

## TypeId

Runtime type identifier used to mark SQL Server stored procedure parameter metadata.

**Signature**

```ts
declare const TypeId: "~@effect/sql-mssql/Parameter"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/d1/src/Parameter.ts#L24)

Since v4.0.0

## TypeId (type alias)

Type-level identifier used to mark SQL Server stored procedure parameter metadata.

**Signature**

```ts
type TypeId = "~@effect/sql-mssql/Parameter"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/d1/src/Parameter.ts#L32)

Since v4.0.0
