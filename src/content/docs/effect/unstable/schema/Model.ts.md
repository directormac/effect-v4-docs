---
title: Model.ts
nav_order: 325
parent: "effect"
---

## Model.ts overview

Defines schema-backed domain models with separate database and JSON shapes.

A model keeps one field declaration as the source of truth and derives
variants for selecting, inserting, updating, and JSON encoding. This is useful
when the database shape is not exactly the same as the public API shape, such
as generated ids, audit timestamps, nullable columns, private fields, or
values that need different encodings at different boundaries. Each generated
variant is its own schema, so callers can validate or encode the shape that
matches the operation they are performing.

Since v4.0.0

---

## Exports Grouped by Category

- [DateTime](#datetime)
  - [Date](#date)
  - [Date (interface)](#date-interface)
  - [DateTimeFromDateWithNow](#datetimefromdatewithnow)
  - [DateTimeFromNumberWithNow](#datetimefromnumberwithnow)
  - [DateTimeInsert](#datetimeinsert)
  - [DateTimeInsert (interface)](#datetimeinsert-interface)
  - [DateTimeInsertFromDate](#datetimeinsertfromdate)
  - [DateTimeInsertFromDate (interface)](#datetimeinsertfromdate-interface)
  - [DateTimeInsertFromNumber](#datetimeinsertfromnumber)
  - [DateTimeInsertFromNumber (interface)](#datetimeinsertfromnumber-interface)
  - [DateTimeUpdate](#datetimeupdate)
  - [DateTimeUpdate (interface)](#datetimeupdate-interface)
  - [DateTimeUpdateFromDate](#datetimeupdatefromdate)
  - [DateTimeUpdateFromDate (interface)](#datetimeupdatefromdate-interface)
  - [DateTimeUpdateFromNumber](#datetimeupdatefromnumber)
  - [DateTimeUpdateFromNumber (interface)](#datetimeupdatefromnumber-interface)
  - [DateTimeWithNow](#datetimewithnow)
  - [DateWithNow](#datewithnow)
- [Uint8Array](#uint8array)
  - [Uint8Array](#uint8array-1)
- [booleans](#booleans)
  - [BooleanSqlite](#booleansqlite)
  - [BooleanSqlite (interface)](#booleansqlite-interface)
- [constructors](#constructors)
  - [Class](#class)
  - [JsonFromString](#jsonfromstring)
  - [Struct](#struct)
  - [Union](#union)
- [extraction](#extraction)
  - [extract](#extract)
- [fields](#fields)
  - [Field](#field)
  - [FieldExcept](#fieldexcept)
  - [FieldOnly](#fieldonly)
  - [fieldEvolve](#fieldevolve)
  - [fields](#fields-1)
- [generated](#generated)
  - [GeneratedByApp](#generatedbyapp)
  - [GeneratedByApp (interface)](#generatedbyapp-interface)
  - [GeneratedByDb](#generatedbydb)
  - [GeneratedByDb (interface)](#generatedbydb-interface)
- [models](#models)
  - [Any (type alias)](#any-type-alias)
  - [JsonFromString (interface)](#jsonfromstring-interface)
  - [VariantsDatabase (type alias)](#variantsdatabase-type-alias)
  - [VariantsJson (type alias)](#variantsjson-type-alias)
- [optional](#optional)
  - [FieldOption](#fieldoption)
  - [FieldOption (interface)](#fieldoption-interface)
  - [optionalOption](#optionaloption)
  - [optionalOption (interface)](#optionaloption-interface)
- [overrideable](#overrideable)
  - [Override](#override)
- [sensitive](#sensitive)
  - [Sensitive](#sensitive-1)
  - [Sensitive (interface)](#sensitive-interface)
- [uuid](#uuid)
  - [UuidV4BytesInsert](#uuidv4bytesinsert)
  - [UuidV4BytesInsert (interface)](#uuidv4bytesinsert-interface)
  - [UuidV4BytesWithGenerate](#uuidv4byteswithgenerate)
  - [UuidV4Insert](#uuidv4insert)
  - [UuidV4Insert (interface)](#uuidv4insert-interface)
  - [UuidV4WithGenerate](#uuidv4withgenerate)
  - [UuidV7Insert](#uuidv7insert)
  - [UuidV7Insert (interface)](#uuidv7insert-interface)
  - [UuidV7WithGenerate](#uuidv7withgenerate)

---

# DateTime

## Date

Schema for a `DateTime.Utc` that is serialized as a date string in the
format `YYYY-MM-DD`.

**Signature**

```ts
declare const Date: Date
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Model.ts#L425)

Since v4.0.0

## Date (interface)

Schema type for a `DateTime.Utc` date-only value encoded as a `YYYY-MM-DD`
string.

**Signature**

```ts
export interface Date extends Schema.decodeTo<Schema.instanceOf<DateTime.Utc>, Schema.String> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Model.ts#L416)

Since v4.0.0

## DateTimeFromDateWithNow

Schema for an overrideable UTC date-time field encoded as a JavaScript `Date`
and defaulted to the current `DateTime.Utc`.

**Signature**

```ts
declare const DateTimeFromDateWithNow: VariantSchema.Overrideable<Schema.DateTimeUtcFromDate>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Model.ts#L461)

Since v4.0.0

## DateTimeFromNumberWithNow

Schema for an overrideable UTC date-time field encoded as milliseconds and
defaulted to the current `DateTime.Utc`.

**Signature**

```ts
declare const DateTimeFromNumberWithNow: VariantSchema.Overrideable<Schema.DateTimeUtcFromMillis>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Model.ts#L472)

Since v4.0.0

## DateTimeInsert

A field that represents a date-time value that is inserted as the current
`DateTime.Utc`. It is serialized as a string for the database.

**Details**

It is omitted from updates and is available for selection.

**Signature**

```ts
declare const DateTimeInsert: DateTimeInsert
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Model.ts#L502)

Since v4.0.0

## DateTimeInsert (interface)

Variant field type for a UTC date-time stored as a string, defaulted to the
current time on insert, available for selection, and omitted from updates.

**Signature**

```ts
export interface DateTimeInsert extends VariantSchema.Field<{
  readonly select: Schema.DateTimeUtcFromString
  readonly insert: VariantSchema.Overrideable<Schema.DateTimeUtcFromString>
  readonly json: Schema.DateTimeUtcFromString
}> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Model.ts#L483)

Since v4.0.0

## DateTimeInsertFromDate

A field that represents a date-time value that is inserted as the current
`DateTime.Utc`. It is serialized as a `Date` for the database.

**Details**

It is omitted from updates and is available for selection.

**Signature**

```ts
declare const DateTimeInsertFromDate: DateTimeInsertFromDate
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Model.ts#L534)

Since v4.0.0

## DateTimeInsertFromDate (interface)

Variant field type for a UTC date-time stored as a JavaScript `Date` in
database variants, encoded as a string for JSON, and defaulted on insert.

**Signature**

```ts
export interface DateTimeInsertFromDate extends VariantSchema.Field<{
  readonly select: Schema.DateTimeUtcFromDate
  readonly insert: VariantSchema.Overrideable<Schema.DateTimeUtcFromDate>
  readonly json: Schema.DateTimeUtcFromString
}> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Model.ts#L515)

Since v4.0.0

## DateTimeInsertFromNumber

A field that represents a date-time value that is inserted as the current
`DateTime.Utc`. It is serialized as a `number`.

**Details**

It is omitted from updates and is available for selection.

**Signature**

```ts
declare const DateTimeInsertFromNumber: DateTimeInsertFromNumber
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Model.ts#L566)

Since v4.0.0

## DateTimeInsertFromNumber (interface)

Variant field type for a UTC date-time encoded as milliseconds and defaulted to
the current time on insert.

**Signature**

```ts
export interface DateTimeInsertFromNumber extends VariantSchema.Field<{
  readonly select: Schema.DateTimeUtcFromMillis
  readonly insert: VariantSchema.Overrideable<Schema.DateTimeUtcFromMillis>
  readonly json: Schema.DateTimeUtcFromMillis
}> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Model.ts#L547)

Since v4.0.0

## DateTimeUpdate

A field that represents a date-time value that is updated as the current
`DateTime.Utc`. It is serialized as a string for the database.

**Details**

It is set to the current `DateTime.Utc` on updates and inserts and is
available for selection.

**Signature**

```ts
declare const DateTimeUpdate: DateTimeUpdate
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Model.ts#L600)

Since v4.0.0

## DateTimeUpdate (interface)

Variant field type for a UTC date-time stored as a string and defaulted to the
current time on both inserts and updates.

**Signature**

```ts
export interface DateTimeUpdate extends VariantSchema.Field<{
  readonly select: Schema.DateTimeUtcFromString
  readonly insert: VariantSchema.Overrideable<Schema.DateTimeUtcFromString>
  readonly update: VariantSchema.Overrideable<Schema.DateTimeUtcFromString>
  readonly json: Schema.DateTimeUtcFromString
}> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Model.ts#L579)

Since v4.0.0

## DateTimeUpdateFromDate

A field that represents a date-time value that is updated as the current
`DateTime.Utc`. It is serialized as a `Date` for the database.

**Details**

It is set to the current `DateTime.Utc` on updates and inserts and is
available for selection.

**Signature**

```ts
declare const DateTimeUpdateFromDate: DateTimeUpdateFromDate
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Model.ts#L636)

Since v4.0.0

## DateTimeUpdateFromDate (interface)

Variant field type for a UTC date-time stored as a JavaScript `Date` in
database variants, encoded as a string for JSON, and defaulted on inserts and
updates.

**Signature**

```ts
export interface DateTimeUpdateFromDate extends VariantSchema.Field<{
  readonly select: Schema.DateTimeUtcFromDate
  readonly insert: VariantSchema.Overrideable<Schema.DateTimeUtcFromDate>
  readonly update: VariantSchema.Overrideable<Schema.DateTimeUtcFromDate>
  readonly json: Schema.DateTimeUtcFromString
}> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Model.ts#L615)

Since v4.0.0

## DateTimeUpdateFromNumber

A field that represents a date-time value that is updated as the current
`DateTime.Utc`. It is serialized as a `number`.

**Details**

It is set to the current `DateTime.Utc` on updates and inserts and is
available for selection.

**Signature**

```ts
declare const DateTimeUpdateFromNumber: DateTimeUpdateFromNumber
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Model.ts#L671)

Since v4.0.0

## DateTimeUpdateFromNumber (interface)

Variant field type for a UTC date-time encoded as milliseconds and defaulted to
the current time on both inserts and updates.

**Signature**

```ts
export interface DateTimeUpdateFromNumber extends VariantSchema.Field<{
  readonly select: Schema.DateTimeUtcFromMillis
  readonly insert: VariantSchema.Overrideable<Schema.DateTimeUtcFromMillis>
  readonly update: VariantSchema.Overrideable<Schema.DateTimeUtcFromMillis>
  readonly json: Schema.DateTimeUtcFromMillis
}> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Model.ts#L650)

Since v4.0.0

## DateTimeWithNow

Schema for an overrideable UTC date-time field encoded as a string and
defaulted to the current `DateTime.Utc`.

**Signature**

```ts
declare const DateTimeWithNow: VariantSchema.Overrideable<Schema.DateTimeUtcFromString>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Model.ts#L450)

Since v4.0.0

## DateWithNow

Schema for an overrideable UTC date-only field whose constructor default is
the current date with the time component removed.

**Signature**

```ts
declare const DateWithNow: VariantSchema.Overrideable<Date>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Model.ts#L439)

Since v4.0.0

# Uint8Array

## Uint8Array

Schema for binary `Uint8Array` values backed by an `ArrayBuffer`.

**Signature**

```ts
declare const Uint8Array: Schema.instanceOf<Uint8Array<ArrayBuffer>, Uint8Array<ArrayBuffer>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Model.ts#L742)

Since v4.0.0

# booleans

## BooleanSqlite

Schema for sqlite booleans that are represented as `0 | 1` in database
variants and `boolean` in JSON variants.

**Signature**

```ts
declare const BooleanSqlite: BooleanSqlite
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Model.ts#L400)

Since v4.0.0

## BooleanSqlite (interface)

Variant field type for SQLite booleans stored as `0 | 1` in database variants
and exposed as `boolean` in JSON variants.

**Signature**

```ts
export interface BooleanSqlite extends VariantSchema.Field<{
  readonly select: Schema.BooleanFromBit
  readonly insert: Schema.BooleanFromBit
  readonly update: Schema.BooleanFromBit
  readonly json: Schema.Boolean
  readonly jsonCreate: Schema.Boolean
  readonly jsonUpdate: Schema.Boolean
}> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Model.ts#L382)

Since v4.0.0

# constructors

## Class

Creates domain model schemas with common database and JSON API variants.

**Example** (Defining a variant model class)

```ts
import { Schema } from "effect"
import { Model } from "effect/unstable/schema"

export const GroupId = Schema.Number.pipe(Schema.brand("GroupId"))

export class Group extends Model.Class<Group>("Group")({
  id: Model.GeneratedByDb(GroupId),
  name: Schema.String,
  createdAt: Model.DateTimeInsertFromDate,
  updatedAt: Model.DateTimeUpdateFromDate
}) {}

// schema used for selects
Group

// schema used for inserts
Group.insert

// schema used for updates
Group.update

// schema used for json api
Group.json
Group.jsonCreate
Group.jsonUpdate

// you can also turn them into classes
class GroupJson extends Schema.Class<GroupJson>("GroupJson")(Group.json) {
  get upperName() {
    return this.name.toUpperCase()
  }
}
```

**Signature**

```ts
declare const Class: <Self = never>(
  identifier: string
) => <const Fields extends VariantSchema.Struct.Fields>(
  fields: Fields &
    VariantSchema.Struct.Validate<Fields, "insert" | "update" | "json" | "jsonCreate" | "jsonUpdate" | "select">,
  annotations?:
    | Schema.Annotations.Declaration<
        Self,
        readonly [Schema.Struct<VariantSchema.ExtractFields<"select", Fields, true>>]
      >
    | undefined
) => [Self] extends [never]
  ? "Missing `Self` generic - use `class Self extends Class<Self>()({ ... })`"
  : VariantSchema.Class<Self, Fields, Schema.Struct<VariantSchema.ExtractFields<"select", Fields, true>>> & {
      readonly insert: Schema.Struct<{
        [K in keyof VariantSchema.ExtractFields<"insert", Fields, false>]: VariantSchema.ExtractFields<
          "insert",
          Fields,
          false
        >[K]
      }>
      readonly update: Schema.Struct<{
        [K in keyof VariantSchema.ExtractFields<"update", Fields, false>]: VariantSchema.ExtractFields<
          "update",
          Fields,
          false
        >[K]
      }>
      readonly json: Schema.Struct<{
        [K in keyof VariantSchema.ExtractFields<"json", Fields, false>]: VariantSchema.ExtractFields<
          "json",
          Fields,
          false
        >[K]
      }>
      readonly jsonCreate: Schema.Struct<{
        [K in keyof VariantSchema.ExtractFields<"jsonCreate", Fields, false>]: VariantSchema.ExtractFields<
          "jsonCreate",
          Fields,
          false
        >[K]
      }>
      readonly jsonUpdate: Schema.Struct<{
        [K in keyof VariantSchema.ExtractFields<"jsonUpdate", Fields, false>]: VariantSchema.ExtractFields<
          "jsonUpdate",
          Fields,
          false
        >[K]
      }>
      readonly select: Schema.Struct<{
        [K in keyof VariantSchema.ExtractFields<"select", Fields, false>]: VariantSchema.ExtractFields<
          "select",
          Fields,
          false
        >[K]
      }>
    }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Model.ts#L115)

Since v4.0.0

## JsonFromString

A field that represents a JSON value stored as text in the database.

**Details**

The "json" variants will use the object schema directly.

**Signature**

```ts
declare const JsonFromString: <S extends Schema.Top>(schema: S) => JsonFromString<S>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Model.ts#L706)

Since v4.0.0

## Struct

Creates a variant struct from model field definitions.

**Signature**

```ts
declare const Struct: <const A extends VariantSchema.Struct.Fields>(
  fields: A & VariantSchema.Struct.Validate<A, "insert" | "update" | "json" | "jsonCreate" | "jsonUpdate" | "select">
) => VariantSchema.Struct<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Model.ts#L158)

Since v4.0.0

## Union

Creates a union over the default and generated variant schemas of multiple
variant structs.

**Signature**

```ts
declare const Union: <const Members extends ReadonlyArray<VariantSchema.Struct<any>>>(
  members: Members
) => VariantSchema.Union<Members> &
  VariantSchema.Union.Variants<Members, "insert" | "update" | "json" | "jsonCreate" | "jsonUpdate" | "select">
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Model.ts#L166)

Since v4.0.0

# extraction

## extract

Extracts a generated variant schema from a model or variant struct.

**Signature**

```ts
declare const extract: {
  <V extends "insert" | "update" | "json" | "jsonCreate" | "jsonUpdate" | "select">(
    variant: V
  ): <A extends VariantSchema.Struct<any>>(self: A) => VariantSchema.Extract<V, A, V extends "select" ? true : false>
  <
    V extends "insert" | "update" | "json" | "jsonCreate" | "jsonUpdate" | "select",
    A extends VariantSchema.Struct<any>
  >(
    self: A,
    variant: V
  ): VariantSchema.Extract<V, A, V extends "select" ? true : false>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Model.ts#L122)

Since v4.0.0

# fields

## Field

Creates a variant field from schemas keyed by variant name.

**Signature**

```ts
declare const Field: <
  const A extends VariantSchema.Field.ConfigWithKeys<
    "insert" | "update" | "json" | "jsonCreate" | "jsonUpdate" | "select"
  >
>(
  config: A & {
    readonly [K in Exclude<keyof A, "insert" | "update" | "json" | "jsonCreate" | "jsonUpdate" | "select">]: never
  }
) => VariantSchema.Field<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Model.ts#L129)

Since v4.0.0

## FieldExcept

Creates a variant field that applies a schema to every variant except the
supplied keys.

**Signature**

```ts
declare const FieldExcept: <
  const Keys extends ReadonlyArray<"insert" | "update" | "json" | "jsonCreate" | "jsonUpdate" | "select">
>(
  keys: Keys
) => <S extends Schema.Top>(
  schema: S
) => VariantSchema.Field<{
  readonly [K in
    | Exclude<"insert", Keys[number]>
    | Exclude<"update", Keys[number]>
    | Exclude<"json", Keys[number]>
    | Exclude<"jsonCreate", Keys[number]>
    | Exclude<"jsonUpdate", Keys[number]>
    | Exclude<"select", Keys[number]>]: S
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Model.ts#L144)

Since v4.0.0

## FieldOnly

Creates a variant field that applies a schema only to the supplied variants.

**Signature**

```ts
declare const FieldOnly: <
  const Keys extends ReadonlyArray<"insert" | "update" | "json" | "jsonCreate" | "jsonUpdate" | "select">
>(
  keys: Keys
) => <S extends Schema.Top>(schema: S) => VariantSchema.Field<{ readonly [K in Keys[number]]: S }>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Model.ts#L151)

Since v4.0.0

## fieldEvolve

Transforms schemas inside a variant field or plain schema by variant name.

**Signature**

```ts
declare const fieldEvolve: {
  <
    Self extends VariantSchema.Field<any> | Schema.Top,
    const Mapping extends Self extends VariantSchema.Field<infer S extends VariantSchema.Field.Config>
      ? { readonly [K in keyof S]?: ((variant: S[K]) => Schema.Top) | undefined }
      : {
          readonly insert?: ((variant: Self) => Schema.Top) | undefined
          readonly update?: ((variant: Self) => Schema.Top) | undefined
          readonly json?: ((variant: Self) => Schema.Top) | undefined
          readonly jsonCreate?: ((variant: Self) => Schema.Top) | undefined
          readonly jsonUpdate?: ((variant: Self) => Schema.Top) | undefined
          readonly select?: ((variant: Self) => Schema.Top) | undefined
        }
  >(
    f: Mapping
  ): (
    self: Self
  ) => VariantSchema.Field<
    Self extends VariantSchema.Field<infer S extends VariantSchema.Field.Config>
      ? {
          readonly [K in keyof S]: K extends keyof Mapping
            ? Mapping[K] extends (arg: any) => any
              ? ReturnType<Mapping[K]>
              : S[K]
            : S[K]
        }
      : {
          readonly insert: "insert" extends keyof Mapping
            ? Mapping[keyof Mapping & "insert"] extends (arg: any) => any
              ? ReturnType<Mapping[keyof Mapping & "insert"]>
              : Self
            : Self
          readonly update: "update" extends keyof Mapping
            ? Mapping[keyof Mapping & "update"] extends (arg: any) => any
              ? ReturnType<Mapping[keyof Mapping & "update"]>
              : Self
            : Self
          readonly json: "json" extends keyof Mapping
            ? Mapping[keyof Mapping & "json"] extends (arg: any) => any
              ? ReturnType<Mapping[keyof Mapping & "json"]>
              : Self
            : Self
          readonly jsonCreate: "jsonCreate" extends keyof Mapping
            ? Mapping[keyof Mapping & "jsonCreate"] extends (arg: any) => any
              ? ReturnType<Mapping[keyof Mapping & "jsonCreate"]>
              : Self
            : Self
          readonly jsonUpdate: "jsonUpdate" extends keyof Mapping
            ? Mapping[keyof Mapping & "jsonUpdate"] extends (arg: any) => any
              ? ReturnType<Mapping[keyof Mapping & "jsonUpdate"]>
              : Self
            : Self
          readonly select: "select" extends keyof Mapping
            ? Mapping[keyof Mapping & "select"] extends (arg: any) => any
              ? ReturnType<Mapping[keyof Mapping & "select"]>
              : Self
            : Self
        }
  >
  <
    Self extends VariantSchema.Field<any> | Schema.Top,
    const Mapping extends Self extends VariantSchema.Field<infer S extends VariantSchema.Field.Config>
      ? { readonly [K in keyof S]?: ((variant: S[K]) => Schema.Top) | undefined }
      : {
          readonly insert?: ((variant: Self) => Schema.Top) | undefined
          readonly update?: ((variant: Self) => Schema.Top) | undefined
          readonly json?: ((variant: Self) => Schema.Top) | undefined
          readonly jsonCreate?: ((variant: Self) => Schema.Top) | undefined
          readonly jsonUpdate?: ((variant: Self) => Schema.Top) | undefined
          readonly select?: ((variant: Self) => Schema.Top) | undefined
        }
  >(
    self: Self,
    f: Mapping
  ): VariantSchema.Field<
    Self extends VariantSchema.Field<infer S extends VariantSchema.Field.Config>
      ? {
          readonly [K in keyof S]: K extends keyof Mapping
            ? Mapping[K] extends (arg: any) => any
              ? ReturnType<Mapping[K]>
              : S[K]
            : S[K]
        }
      : {
          readonly insert: "insert" extends keyof Mapping
            ? Mapping[keyof Mapping & "insert"] extends (arg: any) => any
              ? ReturnType<Mapping[keyof Mapping & "insert"]>
              : Self
            : Self
          readonly update: "update" extends keyof Mapping
            ? Mapping[keyof Mapping & "update"] extends (arg: any) => any
              ? ReturnType<Mapping[keyof Mapping & "update"]>
              : Self
            : Self
          readonly json: "json" extends keyof Mapping
            ? Mapping[keyof Mapping & "json"] extends (arg: any) => any
              ? ReturnType<Mapping[keyof Mapping & "json"]>
              : Self
            : Self
          readonly jsonCreate: "jsonCreate" extends keyof Mapping
            ? Mapping[keyof Mapping & "jsonCreate"] extends (arg: any) => any
              ? ReturnType<Mapping[keyof Mapping & "jsonCreate"]>
              : Self
            : Self
          readonly jsonUpdate: "jsonUpdate" extends keyof Mapping
            ? Mapping[keyof Mapping & "jsonUpdate"] extends (arg: any) => any
              ? ReturnType<Mapping[keyof Mapping & "jsonUpdate"]>
              : Self
            : Self
          readonly select: "select" extends keyof Mapping
            ? Mapping[keyof Mapping & "select"] extends (arg: any) => any
              ? ReturnType<Mapping[keyof Mapping & "select"]>
              : Self
            : Self
        }
  >
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Model.ts#L136)

Since v4.0.0

## fields

Returns the variant field definitions stored on a model or variant struct.

**Signature**

```ts
declare const fields: <A extends VariantSchema.Struct<any>>(self: A) => A[typeof VariantSchema.TypeId]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Model.ts#L175)

Since v4.0.0

# generated

## GeneratedByApp

A field that represents a value generated by the application and present in database
variants and the read JSON variant, but omitted from JSON create and update
variants.

**Signature**

```ts
declare const GeneratedByApp: <S extends Schema.Top>(schema: S) => GeneratedByApp<S>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Model.ts#L257)

Since v4.0.0

## GeneratedByApp (interface)

Variant field type for an application-generated value that is present in
database variants and read JSON, but omitted from JSON create and update
variants.

**Signature**

```ts
export interface GeneratedByApp<S extends Schema.Top> extends VariantSchema.Field<{
  readonly select: S
  readonly insert: S
  readonly update: S
  readonly json: S
}> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Model.ts#L240)

Since v4.0.0

## GeneratedByDb

Creates a variant field for a database-generated column available in read
variants only.

**Details**

The field is included in `select` and `json`, and omitted from `insert`,
`update`, `jsonCreate`, and `jsonUpdate`.

**See**

- `Field` for generated columns that need a custom variant set, such
  as primary keys used in update payloads.

**Signature**

```ts
declare const GeneratedByDb: <S extends Schema.Top>(schema: S) => GeneratedByDb<S>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Model.ts#L224)

Since v4.0.0

## GeneratedByDb (interface)

Variant field type for a database-generated column that is present in read
variants only.

**Details**

The field is included in `select` and `json`, and omitted from `insert`,
`update`, `jsonCreate`, and `jsonUpdate`.

**See**

- `Field` for generated columns that need a custom variant set, such
  as primary keys used in update payloads.

**Signature**

```ts
export interface GeneratedByDb<S extends Schema.Top> extends VariantSchema.Field<{
  readonly select: S
  readonly json: S
}> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Model.ts#L202)

Since v4.0.0

# models

## Any (type alias)

Base shape of a variant model schema, including its fields and the generated
database and JSON variant schemas.

**Signature**

```ts
type Any = Schema.Top & {
  readonly fields: Schema.Struct.Fields
  readonly insert: Schema.Top
  readonly update: Schema.Top
  readonly json: Schema.Top
  readonly jsonCreate: Schema.Top
  readonly jsonUpdate: Schema.Top
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Model.ts#L46)

Since v4.0.0

## JsonFromString (interface)

Variant field type for a JSON value stored as text in database variants and
exposed through the supplied schema in JSON variants.

**Signature**

```ts
export interface JsonFromString<S extends Schema.Top> extends VariantSchema.Field<{
  readonly select: Schema.fromJsonString<S>
  readonly insert: Schema.fromJsonString<S>
  readonly update: Schema.fromJsonString<S>
  readonly json: S
  readonly jsonCreate: S
  readonly jsonUpdate: S
}> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Model.ts#L685)

Since v4.0.0

## VariantsDatabase (type alias)

Database-facing variant names generated for model schemas.

**Signature**

```ts
type VariantsDatabase = "select" | "insert" | "update"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Model.ts#L61)

Since v4.0.0

## VariantsJson (type alias)

JSON API-facing variant names generated for model schemas.

**Signature**

```ts
type VariantsJson = "json" | "jsonCreate" | "jsonUpdate"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Model.ts#L69)

Since v4.0.0

# optional

## FieldOption

Converts a field to one that is optional for all variants.

**Details**

For the database variants, it will accept `null`able values.
For the JSON variants, it will also accept missing keys.

**Signature**

```ts
declare const FieldOption: <Field extends VariantSchema.Field<any> | Schema.Top>(
  self: Field
) => Field extends Schema.Top
  ? FieldOption<Field>
  : Field extends VariantSchema.Field<infer S>
    ? VariantSchema.Field<{
        readonly [K in keyof S]: S[K] extends Schema.Top
          ? K extends VariantsDatabase
            ? Schema.OptionFromNullOr<S[K]>
            : optionalOption<S[K]>
          : never
      }>
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Model.ts#L356)

Since v4.0.0

## FieldOption (interface)

Convert a field to one that is optional for all variants.

**Details**

For the database variants, it will accept `null`able values.
For the JSON variants, it will also accept missing keys.

**Signature**

```ts
export interface FieldOption<S extends Schema.Top> extends VariantSchema.Field<{
  readonly select: Schema.OptionFromNullOr<S>
  readonly insert: Schema.OptionFromNullOr<S>
  readonly update: Schema.OptionFromNullOr<S>
  readonly json: optionalOption<S>
  readonly jsonCreate: optionalOption<S>
  readonly jsonUpdate: optionalOption<S>
}> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Model.ts#L334)

Since v4.0.0

## optionalOption

Creates a schema for optional keys that decodes missing or null encoded values
through `Option` and encodes `Option` values back to optional nullable keys.

**Signature**

```ts
declare const optionalOption: <S extends Schema.Constraint>(schema: S) => optionalOption<S>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Model.ts#L312)

Since v4.0.0

## optionalOption (interface)

Schema type for an optional object key whose encoded value may be missing or
null and whose decoded value is an `Option`.

**Signature**

```ts
export interface optionalOption<S extends Schema.Constraint> extends Schema.decodeTo<
  Schema.Option<Schema.toType<S>>,
  Schema.optionalKey<Schema.NullOr<S>>
> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Model.ts#L301)

Since v4.0.0

# overrideable

## Override

Marks a value as an explicit override for fields that otherwise use an
overrideable default.

**Signature**

```ts
declare const Override: <A>(value: A) => A & Brand<"Override">
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Model.ts#L185)

Since v4.0.0

# sensitive

## Sensitive

A field that represents a sensitive value that should not be exposed in the
JSON variants.

**Signature**

```ts
declare const Sensitive: <S extends Schema.Top>(schema: S) => Sensitive<S>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Model.ts#L287)

Since v4.0.0

## Sensitive (interface)

Variant field type for a sensitive value that is available to database variants
and omitted from all JSON variants.

**Signature**

```ts
export interface Sensitive<S extends Schema.Top> extends VariantSchema.Field<{
  readonly select: S
  readonly insert: S
  readonly update: S
}> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Model.ts#L272)

Since v4.0.0

# uuid

## UuidV4BytesInsert

A field that represents a binary UUID v4 that is generated on inserts.

**Signature**

```ts
declare const UuidV4BytesInsert: <const B extends string>(
  schema: Schema.brand<Schema.instanceOf<Uint8Array<ArrayBuffer>>, B>
) => UuidV4BytesInsert<B>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Model.ts#L764)

Since v4.0.0

## UuidV4BytesInsert (interface)

Variant field type for a branded binary UUID v4 value whose insert variant
generates a UUID by default.

**Signature**

```ts
export interface UuidV4BytesInsert<B extends string> extends VariantSchema.Field<{
  readonly select: Schema.brand<Schema.instanceOf<Uint8Array<ArrayBuffer>>, B>
  readonly insert: Schema.withConstructorDefault<Schema.brand<Schema.instanceOf<Uint8Array<ArrayBuffer>>, B>>
  readonly update: Schema.brand<Schema.instanceOf<Uint8Array<ArrayBuffer>>, B>
  readonly json: Schema.brand<Schema.instanceOf<Uint8Array<ArrayBuffer>>, B>
}> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Model.ts#L727)

Since v4.0.0

## UuidV4BytesWithGenerate

Adds a constructor default that generates a binary UUID v4 for a branded
`Uint8Array` schema.

**Signature**

```ts
declare const UuidV4BytesWithGenerate: <B extends string>(
  schema: Schema.brand<Schema.instanceOf<Uint8Array<ArrayBuffer>>, B>
) => Schema.withConstructorDefault<Schema.brand<Schema.instanceOf<Uint8Array<ArrayBuffer>>, B>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Model.ts#L753)

Since v4.0.0

## UuidV4Insert

A field that represents a string UUID v4 that is generated on inserts.

**Signature**

```ts
declare const UuidV4Insert: <const B extends string>(schema: Schema.brand<Schema.String, B>) => UuidV4Insert<B>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Model.ts#L807)

Since v4.0.0

## UuidV4Insert (interface)

Variant field type for a branded string UUID v4 value whose insert variant
generates a UUID by default.

**Signature**

```ts
export interface UuidV4Insert<B extends string> extends VariantSchema.Field<{
  readonly select: Schema.brand<Schema.String, B>
  readonly insert: Schema.withConstructorDefault<Schema.brand<Schema.String, B>>
  readonly update: Schema.brand<Schema.String, B>
  readonly json: Schema.brand<Schema.String, B>
}> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Model.ts#L781)

Since v4.0.0

## UuidV4WithGenerate

Adds a constructor default that generates a string UUID v4.

**Signature**

```ts
declare const UuidV4WithGenerate: <B extends string>(
  schema: Schema.brand<Schema.String, B>
) => Schema.withConstructorDefault<Schema.brand<Schema.String, B>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Model.ts#L796)

Since v4.0.0

## UuidV7Insert

A field that represents a string UUID v7 that is generated on inserts.

**Signature**

```ts
declare const UuidV7Insert: <const B extends string>(schema: Schema.brand<Schema.String, B>) => UuidV7Insert<B>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Model.ts#L854)

Since v4.0.0

## UuidV7Insert (interface)

Variant field type for a branded string UUID v7 value whose insert variant
generates a UUID by default.

**Signature**

```ts
export interface UuidV7Insert<B extends string> extends VariantSchema.Field<{
  readonly select: Schema.brand<Schema.String, B>
  readonly insert: Schema.withConstructorDefault<Schema.brand<Schema.String, B>>
  readonly update: Schema.brand<Schema.String, B>
  readonly json: Schema.brand<Schema.String, B>
}> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Model.ts#L824)

Since v4.0.0

## UuidV7WithGenerate

Adds a constructor default that generates a string UUID v7.

**Signature**

```ts
declare const UuidV7WithGenerate: <B extends string>(
  schema: Schema.brand<Schema.String, B>
) => Schema.withConstructorDefault<Schema.brand<Schema.String, B>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Model.ts#L839)

Since v4.0.0
