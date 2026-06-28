---
title: VariantSchema.ts
nav_order: 326
parent: "effect"
---

## VariantSchema.ts overview

Builds related schemas for named variants from shared field definitions.

`make` fixes the variant names and default variant, then lets callers define
fields that are shared by all variants or specific to some variants. From
those definitions it can create schema classes, unions, extracted struct
schemas, and helpers for changing fields across variants.

Since v4.0.0

---

## Exports Grouped by Category

- [accessors](#accessors)
  - [fields](#fields)
- [constructors](#constructors)
  - [make](#make)
- [extractors](#extractors)
  - [Extract (type alias)](#extract-type-alias)
  - [ExtractFields (type alias)](#extractfields-type-alias)
- [guards](#guards)
  - [isField](#isfield)
  - [isStruct](#isstruct)
- [models](#models)
  - [Class (interface)](#class-interface)
  - [Field (interface)](#field-interface)
  - [Struct (interface)](#struct-interface)
  - [Union (interface)](#union-interface)
- [overrideable](#overrideable)
  - [Override](#override)
  - [Overrideable](#overrideable-1)
  - [Overrideable (interface)](#overrideable-interface)
- [type IDs](#type-ids)
  - [TypeId](#typeid)
- [utils](#utils)
  - [Field (namespace)](#field-namespace)
    - [Any (type alias)](#any-type-alias)
    - [Config (type alias)](#config-type-alias)
    - [ConfigWithKeys (type alias)](#configwithkeys-type-alias)
    - [Fields (type alias)](#fields-type-alias)
  - [Struct (namespace)](#struct-namespace)
    - [Any (type alias)](#any-type-alias-1)
    - [Fields (type alias)](#fields-type-alias-1)
    - [Validate (type alias)](#validate-type-alias)
  - [Union (namespace)](#union-namespace)
    - [Variants (type alias)](#variants-type-alias)

---

# accessors

## fields

Returns the original field definitions stored on a variant schema struct.

**Signature**

```ts
declare const fields: <A extends Struct<any>>(self: A) => A[typeof TypeId]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/VariantSchema.ts#L249)

Since v4.0.0

# constructors

## make

Creates a variant schema toolkit for a fixed set of variant names and a default
variant.

**Signature**

```ts
declare const make: <const Variants extends ReadonlyArray<string>, const Default extends Variants[number]>(options: {
  readonly variants: Variants
  readonly defaultVariant: Default
}) => {
  readonly Struct: <const A extends Struct.Fields>(fields: A & Struct.Validate<A, Variants[number]>) => Struct<A>
  readonly Field: <const A extends Field.ConfigWithKeys<Variants[number]>>(
    config: A & { readonly [K in Exclude<keyof A, Variants[number]>]: never }
  ) => Field<A>
  readonly FieldOnly: <const Keys extends ReadonlyArray<Variants[number]>>(
    keys: Keys
  ) => <S extends Schema.Top>(schema: S) => Field<{ readonly [K in Keys[number]]: S }>
  readonly FieldExcept: <const Keys extends ReadonlyArray<Variants[number]>>(
    keys: Keys
  ) => <S extends Schema.Top>(schema: S) => Field<{ readonly [K in Exclude<Variants[number], Keys[number]>]: S }>
  readonly fieldEvolve: {
    <
      Self extends Field<any> | Schema.Top,
      const Mapping extends Self extends Field<infer S>
        ? { readonly [K in keyof S]?: (variant: S[K]) => Schema.Top }
        : { readonly [K in Variants[number]]?: (variant: Self) => Schema.Top }
    >(
      f: Mapping
    ): (
      self: Self
    ) => Field<
      Self extends Field<infer S>
        ? {
            readonly [K in keyof S]: K extends keyof Mapping
              ? Mapping[K] extends (arg: any) => any
                ? ReturnType<Mapping[K]>
                : S[K]
              : S[K]
          }
        : {
            readonly [K in Variants[number]]: K extends keyof Mapping
              ? Mapping[K] extends (arg: any) => any
                ? ReturnType<Mapping[K]>
                : Self
              : Self
          }
    >
    <
      Self extends Field<any> | Schema.Top,
      const Mapping extends Self extends Field<infer S>
        ? { readonly [K in keyof S]?: (variant: S[K]) => Schema.Top }
        : { readonly [K in Variants[number]]?: (variant: Self) => Schema.Top }
    >(
      self: Self,
      f: Mapping
    ): Field<
      Self extends Field<infer S>
        ? {
            readonly [K in keyof S]: K extends keyof Mapping
              ? Mapping[K] extends (arg: any) => any
                ? ReturnType<Mapping[K]>
                : S[K]
              : S[K]
          }
        : {
            readonly [K in Variants[number]]: K extends keyof Mapping
              ? Mapping[K] extends (arg: any) => any
                ? ReturnType<Mapping[K]>
                : Self
              : Self
          }
    >
  }
  readonly Class: <Self = never>(
    identifier: string
  ) => <const Fields extends Struct.Fields>(
    fields: Fields & Struct.Validate<Fields, Variants[number]>,
    annotations?:
      | Schema.Annotations.Declaration<Self, readonly [Schema.Struct<ExtractFields<Default, Fields, true>>]>
      | undefined
  ) => [Self] extends [never]
    ? MissingSelfGeneric
    : Class<Self, Fields, Schema.Struct<ExtractFields<Default, Fields, true>>> & {
        readonly [V in Variants[number]]: Extract<V, Struct<Fields>>
      }
  readonly Union: <const Members extends ReadonlyArray<Struct<any>>>(
    members: Members
  ) => Union<Members> & Union.Variants<Members, Variants[number]>
  readonly extract: {
    <V extends Variants[number]>(
      variant: V
    ): <A extends Struct<any>>(self: A) => Extract<V, A, V extends Default ? true : false>
    <V extends Variants[number], A extends Struct<any>>(
      self: A,
      variant: V
    ): Extract<V, A, V extends Default ? true : false>
  }
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/VariantSchema.ts#L345)

Since v4.0.0

# extractors

## Extract (type alias)

Computes the schema type produced by extracting a single variant from a variant
schema struct.

**Signature**

```ts
type Extract<V, A, IsDefault> = [A] extends [Struct<infer Fields>]
  ? IsDefault extends true
    ? [A] extends [Schema.Top]
      ? A
      : Schema.Struct<Struct_.Simplify<ExtractFields<V, Fields>>>
    : Schema.Struct<Struct_.Simplify<ExtractFields<V, Fields>>>
  : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/VariantSchema.ts#L192)

Since v4.0.0

## ExtractFields (type alias)

Computes the `Schema.Struct` field map for a variant by selecting matching
field schemas and recursively extracting nested structs.

**Signature**

```ts
type ExtractFields<V, Fields, IsDefault> = {
  readonly [K in keyof Fields as [Fields[K]] extends [Field<infer Config>]
    ? V extends keyof Config
      ? K
      : never
    : K]: [Fields[K]] extends [Struct<infer _>]
    ? Extract<V, Fields[K], IsDefault>
    : [Fields[K]] extends [Field<infer Config>]
      ? [Config[V]] extends [Schema.Top]
        ? Config[V]
        : never
      : [Fields[K]] extends [Schema.Top]
        ? Fields[K]
        : never
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/VariantSchema.ts#L173)

Since v4.0.0

# guards

## isField

Returns `true` when a value is a variant schema field.

**Signature**

```ts
declare const isField: (u: unknown) => u is Field<any>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/VariantSchema.ts#L113)

Since v4.0.0

## isStruct

Returns `true` when a value is a variant schema struct.

**Signature**

```ts
declare const isStruct: (u: unknown) => u is Struct<any>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/VariantSchema.ts#L49)

Since v4.0.0

# models

## Class (interface)

Schema class type returned by variant class constructors, combining the default
variant schema with access to the original variant fields.

**Signature**

```ts
export interface Class<
  Self,
  Fields extends Struct.Fields,
  S extends Schema.Top & {
    readonly fields: Schema.Struct.Fields
  }
>
  extends
    Schema.BottomLazy<
      SchemaAST.Declaration,
      Schema.decodeTo<Schema.declareConstructor<Self, S["Encoded"], readonly [S], S["Iso"]>, S>,
      readonly [S],
      S["~type.mutability"],
      S["~type.optionality"],
      S["~type.constructor.default"],
      S["~encoded.mutability"],
      S["~encoded.optionality"]
    >,
    Struct<Struct_.Simplify<Fields>> {
  readonly Type: Self
  readonly Encoded: S["Encoded"]
  readonly DecodingServices: S["DecodingServices"]
  readonly EncodingServices: S["EncodingServices"]
  readonly "~type.make.in": S["~type.make.in"]
  readonly "~type.make": Self
  readonly Iso: S["Iso"]

  new (
    props: S["~type.make.in"],
    options?:
      | {
          readonly disableChecks?: boolean
        }
      | undefined
  ): S["Type"]

  make<Args extends Array<any>, X>(this: { new (...args: Args): X }, ...args: Args): X

  readonly fields: S["fields"]
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/VariantSchema.ts#L258)

Since v4.0.0

## Field (interface)

Pipeable collection of variant-specific schemas for a single logical field.

**Signature**

```ts
export interface Field<in out A extends Field.Config> extends Pipeable {
  readonly [FieldTypeId]: typeof FieldTypeId
  readonly schemas: A
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/VariantSchema.ts#L102)

Since v4.0.0

## Struct (interface)

Pipeable container of schema fields that can be extracted into per-variant
`Schema.Struct` schemas.

**Signature**

```ts
export interface Struct<in out A extends Field.Fields> extends Pipeable {
  readonly [TypeId]: A
  /** @internal */
  [cacheSymbol]?: Record<string, Schema.Top>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/VariantSchema.ts#L37)

Since v4.0.0

## Union (interface)

Union schema over the default schemas of a list of variant schema structs.

**Signature**

```ts
export interface Union<Members extends ReadonlyArray<Struct<any>>> extends Schema.Union<{
  readonly [K in keyof Members]: [Members[K]] extends [Schema.Top] ? Members[K] : never
}> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/VariantSchema.ts#L309)

Since v4.0.0

# overrideable

## Override

Marks a value as an explicit override for an `Overrideable` schema default.

**Signature**

```ts
declare const Override: <A>(value: A) => A & Brand<"Override">
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/VariantSchema.ts#L522)

Since v4.0.0

## Overrideable

Wraps a schema with an effectful constructor default while allowing explicit
values to be marked with `Override`.

**Signature**

```ts
declare const Overrideable: <S extends Schema.Top & Schema.WithoutConstructorDefault>(
  schema: S,
  options: { readonly defaultValue: Effect.Effect<S["~type.make.in"]> }
) => Overrideable<S>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/VariantSchema.ts#L559)

Since v4.0.0

## Overrideable (interface)

Schema type whose constructor can use an effectful default unless a value is
explicitly branded with `Override`.

**Signature**

```ts
export interface Overrideable<S extends Schema.Top & Schema.WithoutConstructorDefault> extends Schema.BottomLazy<
  S["ast"],
  Overrideable<S>,
  S["~type.parameters"],
  S["~type.mutability"],
  "required",
  "with-default",
  S["~encoded.mutability"],
  S["~encoded.optionality"]
> {
  readonly Type: S["Type"] & Brand<"Override">
  readonly Encoded: S["Encoded"]
  readonly DecodingServices: S["DecodingServices"]
  readonly EncodingServices: S["EncodingServices"]
  readonly "~type.make.in": S["~type.make.in"]
  readonly "~type.make": (S["Type"] & Brand<"Override">) | undefined
  readonly Iso: (S["Type"] & Brand<"Override">) | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/VariantSchema.ts#L531)

Since v4.0.0

# type IDs

## TypeId

Runtime type identifier attached to variant schema structs.

**Signature**

```ts
declare const TypeId: "~effect/schema/VariantSchema"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/VariantSchema.ts#L26)

Since v4.0.0

# utils

## Field (namespace)

Type-level helpers for variant schema fields.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/VariantSchema.ts#L120)

Since v4.0.0

### Any (type alias)

Minimal structural type for any variant schema field.

**Signature**

```ts
type Any = { readonly [FieldTypeId]: typeof FieldTypeId }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/VariantSchema.ts#L127)

Since v4.0.0

### Config (type alias)

Map from variant name to the schema used for a field in that variant.

**Signature**

```ts
type Config = {
  readonly [key: string]: Schema.Top | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/VariantSchema.ts#L135)

Since v4.0.0

### ConfigWithKeys (type alias)

Variant field configuration restricted to an optional subset of the supplied
variant keys.

**Signature**

```ts
type ConfigWithKeys<K> = {
  readonly [P in K]?: Schema.Top
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/VariantSchema.ts#L146)

Since v4.0.0

### Fields (type alias)

Field map whose properties may be schemas, variant fields, nested structs, or
`undefined`.

**Signature**

```ts
type Fields = {
  readonly [key: string]: Schema.Top | Field<any> | Struct<any> | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/VariantSchema.ts#L157)

Since v4.0.0

## Struct (namespace)

Type-level helpers for variant schema structs.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/VariantSchema.ts#L56)

Since v4.0.0

### Any (type alias)

Minimal structural type for any variant schema struct.

**Signature**

```ts
type Any = { readonly [TypeId]: any }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/VariantSchema.ts#L63)

Since v4.0.0

### Fields (type alias)

Field map accepted by a variant struct, where each property may be a schema, a
variant field, a nested struct, or `undefined`.

**Signature**

```ts
type Fields = {
  readonly [key: string]: Schema.Top | Field<any> | Struct<any> | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/VariantSchema.ts#L72)

Since v4.0.0

### Validate (type alias)

Type-level validation that every variant field in a struct only uses variants
from the configured variant set.

**Signature**

```ts
type Validate<A, Variant> = {
  readonly [K in keyof A]: A[K] extends { readonly [TypeId]: infer _ }
    ? Validate<A[K], Variant>
    : A[K] extends Field<infer Config>
      ? [keyof Config] extends [Variant]
        ? {}
        : "field must have valid variants"
      : {}
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/VariantSchema.ts#L87)

Since v4.0.0

## Union (namespace)

Type-level helpers for unions of variant schema structs.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/VariantSchema.ts#L322)

Since v4.0.0

### Variants (type alias)

Computes a union schema for each variant from a list of variant schema structs.

**Signature**

```ts
type Union.Variants<Members, Variants> = {
    readonly [Variant in Variants]: Schema.Union<
      {
        [K in keyof Members]: Extract<Variant, Members[K]>
      }
    >
  }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/VariantSchema.ts#L329)

Since v4.0.0
