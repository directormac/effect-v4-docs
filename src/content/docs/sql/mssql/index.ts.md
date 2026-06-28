---
title: index.ts
nav_order: 1
parent: "@effect/sql-mssql"
---

## index.ts overview

Since v4.0.0

---

## Exports Grouped by Category

- [utils](#utils)
  - [MssqlClient (namespace export)](#mssqlclient-namespace-export)
  - [MssqlMigrator (namespace export)](#mssqlmigrator-namespace-export)
  - [MssqlTypes](#mssqltypes)
  - [Parameter (namespace export)](#parameter-namespace-export)
  - [Procedure (namespace export)](#procedure-namespace-export)

---

# utils

## MssqlClient (namespace export)

Re-exports all named exports from the "./MssqlClient.ts" module as `MssqlClient`.

**Signature**

```ts
export * as MssqlClient from "./MssqlClient.ts"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/d1/src/index.ts#L17)

Since v4.0.0

## MssqlMigrator (namespace export)

Re-exports all named exports from the "./MssqlMigrator.ts" module as `MssqlMigrator`.

**Signature**

```ts
export * as MssqlMigrator from "./MssqlMigrator.ts"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/d1/src/index.ts#L22)

Since v4.0.0

## MssqlTypes

**Signature**

```ts
declare const MssqlTypes: {
  TinyInt: DataType
  Bit: DataType
  SmallInt: DataType
  Int: DataType
  SmallDateTime: DataType
  Real: DataType
  Money: DataType
  DateTime: DataType
  Float: DataType
  Decimal: DataType & {
    resolvePrecision: NonNullable<DataType["resolvePrecision"]>
    resolveScale: NonNullable<DataType["resolveScale"]>
  }
  Numeric: DataType & {
    resolveScale: NonNullable<DataType["resolveScale"]>
    resolvePrecision: NonNullable<DataType["resolvePrecision"]>
  }
  SmallMoney: DataType
  BigInt: DataType
  Image: DataType
  Text: DataType
  UniqueIdentifier: DataType
  NText: DataType
  VarBinary: { maximumLength: number } & DataType
  VarChar: { maximumLength: number } & DataType
  Binary: { maximumLength: number } & DataType
  Char: { maximumLength: number } & DataType
  NVarChar: { maximumLength: number } & DataType
  NChar: DataType & { maximumLength: number }
  Xml: DataType
  Time: DataType
  Date: DataType
  DateTime2: DataType & { resolveScale: NonNullable<DataType["resolveScale"]> }
  DateTimeOffset: DataType & { resolveScale: NonNullable<DataType["resolveScale"]> }
  UDT: DataType
  TVP: DataType
  Variant: DataType
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/d1/src/index.ts#L9)

Since v4.0.0

## Parameter (namespace export)

Re-exports all named exports from the "./Parameter.ts" module as `Parameter`.

**Signature**

```ts
export * as Parameter from "./Parameter.ts"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/d1/src/index.ts#L27)

Since v4.0.0

## Procedure (namespace export)

Re-exports all named exports from the "./Procedure.ts" module as `Procedure`.

**Signature**

```ts
export * as Procedure from "./Procedure.ts"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/d1/src/index.ts#L32)

Since v4.0.0
