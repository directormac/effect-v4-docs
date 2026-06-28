---
title: SqlError.ts
nav_order: 334
parent: "effect"
---

## SqlError.ts overview

Defines structured failures for SQL clients and driver integrations.

`SqlError` wraps the different reasons a SQL operation can fail, such as
connection, authentication, authorization, syntax, constraint, or transaction
problems. Each reason keeps the original cause, optional message and
operation metadata, and whether retrying may succeed. This module also
includes schemas, guards, a SQLite error classifier, and the
`ResultLengthMismatch` error used by ordered batched SQL resolvers.

Since v4.0.0

---

## Exports Grouped by Category

- [converting](#converting)
  - [classifySqliteError](#classifysqliteerror)
- [errors](#errors)
  - [AuthenticationError (class)](#authenticationerror-class)
    - [[ReasonTypeId] (property)](#reasontypeid-property)
  - [AuthorizationError (class)](#authorizationerror-class)
    - [[ReasonTypeId] (property)](#reasontypeid-property-1)
  - [ConnectionError (class)](#connectionerror-class)
    - [[ReasonTypeId] (property)](#reasontypeid-property-2)
  - [ConstraintError (class)](#constrainterror-class)
    - [[ReasonTypeId] (property)](#reasontypeid-property-3)
  - [DeadlockError (class)](#deadlockerror-class)
    - [[ReasonTypeId] (property)](#reasontypeid-property-4)
  - [LockTimeoutError (class)](#locktimeouterror-class)
    - [[ReasonTypeId] (property)](#reasontypeid-property-5)
  - [ResultLengthMismatch (class)](#resultlengthmismatch-class)
  - [SerializationError (class)](#serializationerror-class)
    - [[ReasonTypeId] (property)](#reasontypeid-property-6)
  - [SqlError (class)](#sqlerror-class)
    - [[TypeId] (property)](#typeid-property)
    - [cause (property)](#cause-property)
  - [SqlErrorReason (type alias)](#sqlerrorreason-type-alias)
  - [SqlSyntaxError (class)](#sqlsyntaxerror-class)
    - [[ReasonTypeId] (property)](#reasontypeid-property-7)
  - [StatementTimeoutError (class)](#statementtimeouterror-class)
    - [[ReasonTypeId] (property)](#reasontypeid-property-8)
  - [UniqueViolation (class)](#uniqueviolation-class)
    - [[ReasonTypeId] (property)](#reasontypeid-property-9)
  - [UnknownError (class)](#unknownerror-class)
    - [[ReasonTypeId] (property)](#reasontypeid-property-10)
- [guards](#guards)
  - [isSqlError](#issqlerror)
  - [isSqlErrorReason](#issqlerrorreason)
- [schemas](#schemas)
  - [SqlErrorReason](#sqlerrorreason)

---

# converting

## classifySqliteError

Classifies a native SQLite error cause into a `SqlErrorReason` using its
`code` or `errno`, with optional message and operation metadata.

**Signature**

```ts
declare const classifySqliteError: (cause: unknown, { message, operation }?: SqliteClassifyOptions) => SqlErrorReason
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlError.ts#L513)

Since v4.0.0

# errors

## AuthenticationError (class)

SQL error reason for authentication failures such as invalid credentials; not
marked retryable.

**Signature**

```ts
declare class AuthenticationError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlError.ts#L59)

Since v4.0.0

### [ReasonTypeId] (property)

Marks this value as a structured SQL error reason for runtime guards.

**Signature**

```ts
readonly [ReasonTypeId]: "~effect/sql/SqlError/Reason"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlError.ts#L67)

Since v4.0.0

## AuthorizationError (class)

SQL error reason for authorization or permission failures; not marked
retryable.

**Signature**

```ts
declare class AuthorizationError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlError.ts#L86)

Since v4.0.0

### [ReasonTypeId] (property)

Marks this value as a structured SQL error reason for runtime guards.

**Signature**

```ts
readonly [ReasonTypeId]: "~effect/sql/SqlError/Reason"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlError.ts#L94)

Since v4.0.0

## ConnectionError (class)

SQL error reason for connection or open failures; marked retryable.

**Signature**

```ts
declare class ConnectionError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlError.ts#L31)

Since v4.0.0

### [ReasonTypeId] (property)

Marks this value as a structured SQL error reason for runtime guards.

**Signature**

```ts
readonly [ReasonTypeId]: "~effect/sql/SqlError/Reason"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlError.ts#L40)

Since v4.0.0

## ConstraintError (class)

SQL error reason for a non-unique constraint violation; not marked retryable.

**Signature**

```ts
declare class ConstraintError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlError.ts#L172)

Since v4.0.0

### [ReasonTypeId] (property)

Marks this value as a structured SQL error reason for runtime guards.

**Signature**

```ts
readonly [ReasonTypeId]: "~effect/sql/SqlError/Reason"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlError.ts#L181)

Since v4.0.0

## DeadlockError (class)

SQL error reason for a database deadlock; marked retryable.

**Signature**

```ts
declare class DeadlockError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlError.ts#L199)

Since v4.0.0

### [ReasonTypeId] (property)

Marks this value as a structured SQL error reason for runtime guards.

**Signature**

```ts
readonly [ReasonTypeId]: "~effect/sql/SqlError/Reason"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlError.ts#L208)

Since v4.0.0

## LockTimeoutError (class)

SQL error reason for timing out while waiting on a database lock; marked
retryable.

**Signature**

```ts
declare class LockTimeoutError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlError.ts#L254)

Since v4.0.0

### [ReasonTypeId] (property)

Marks this value as a structured SQL error reason for runtime guards.

**Signature**

```ts
readonly [ReasonTypeId]: "~effect/sql/SqlError/Reason"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlError.ts#L263)

Since v4.0.0

## ResultLengthMismatch (class)

Error raised when an ordered batched SQL resolver receives a different number
of result rows than requests.

**Signature**

```ts
declare class ResultLengthMismatch
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlError.ts#L576)

Since v4.0.0

## SerializationError (class)

SQL error reason for a transaction serialization or isolation conflict;
marked retryable.

**Signature**

```ts
declare class SerializationError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlError.ts#L227)

Since v4.0.0

### [ReasonTypeId] (property)

Marks this value as a structured SQL error reason for runtime guards.

**Signature**

```ts
readonly [ReasonTypeId]: "~effect/sql/SqlError/Reason"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlError.ts#L235)

Since v4.0.0

## SqlError (class)

Error wrapper for SQL failures whose `message`, `cause`, and `isRetryable`
values are derived from its `SqlErrorReason`.

**Signature**

```ts
declare class SqlError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlError.ts#L387)

Since v4.0.0

### [TypeId] (property)

Marks this value as the top-level SQL error wrapper for runtime guards.

**Signature**

```ts
readonly [TypeId]: "~effect/sql/SqlError"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlError.ts#L395)

Since v4.0.0

### cause (property)

Exposes the structured SQL reason as the JavaScript error cause.

**Signature**

```ts
readonly cause: ConnectionError | AuthenticationError | AuthorizationError | SqlSyntaxError | UniqueViolation | ConstraintError | DeadlockError | SerializationError | LockTimeoutError | StatementTimeoutError | UnknownError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlError.ts#L402)

Since v4.0.0

## SqlErrorReason (type alias)

Union of structured SQL error reasons, each carrying the original cause plus
optional message and operation metadata.

**Signature**

```ts
type SqlErrorReason =
  | ConnectionError
  | AuthenticationError
  | AuthorizationError
  | SqlSyntaxError
  | UniqueViolation
  | ConstraintError
  | DeadlockError
  | SerializationError
  | LockTimeoutError
  | StatementTimeoutError
  | UnknownError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlError.ts#L335)

Since v4.0.0

## SqlSyntaxError (class)

SQL error reason for invalid SQL syntax; not marked retryable.

**Signature**

```ts
declare class SqlSyntaxError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlError.ts#L112)

Since v4.0.0

### [ReasonTypeId] (property)

Marks this value as a structured SQL error reason for runtime guards.

**Signature**

```ts
readonly [ReasonTypeId]: "~effect/sql/SqlError/Reason"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlError.ts#L121)

Since v4.0.0

## StatementTimeoutError (class)

SQL error reason for a statement or query timeout; marked retryable.

**Signature**

```ts
declare class StatementTimeoutError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlError.ts#L281)

Since v4.0.0

### [ReasonTypeId] (property)

Marks this value as a structured SQL error reason for runtime guards.

**Signature**

```ts
readonly [ReasonTypeId]: "~effect/sql/SqlError/Reason"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlError.ts#L289)

Since v4.0.0

## UniqueViolation (class)

SQL error reason for a unique constraint violation, including the violated
constraint identifier; not marked retryable.

**Signature**

```ts
declare class UniqueViolation
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlError.ts#L145)

Since v4.0.0

### [ReasonTypeId] (property)

Marks this value as a structured SQL error reason for runtime guards.

**Signature**

```ts
readonly [ReasonTypeId]: "~effect/sql/SqlError/Reason"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlError.ts#L154)

Since v4.0.0

## UnknownError (class)

SQL error reason for an unclassified database failure; not marked retryable.

**Signature**

```ts
declare class UnknownError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlError.ts#L307)

Since v4.0.0

### [ReasonTypeId] (property)

Marks this value as a structured SQL error reason for runtime guards.

**Signature**

```ts
readonly [ReasonTypeId]: "~effect/sql/SqlError/Reason"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlError.ts#L316)

Since v4.0.0

# guards

## isSqlError

Returns `true` when a value is a `SqlError`.

**Signature**

```ts
declare const isSqlError: (u: unknown) => u is SqlError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlError.ts#L429)

Since v4.0.0

## isSqlErrorReason

Returns `true` when a value is a `SqlErrorReason`.

**Signature**

```ts
declare const isSqlErrorReason: (u: unknown) => u is SqlErrorReason
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlError.ts#L437)

Since v4.0.0

# schemas

## SqlErrorReason

Schema for encoding and decoding SQL error reasons.

**Signature**

```ts
declare const SqlErrorReason: Schema.Union<
  [
    typeof ConnectionError,
    typeof AuthenticationError,
    typeof AuthorizationError,
    typeof SqlSyntaxError,
    typeof UniqueViolation,
    typeof ConstraintError,
    typeof DeadlockError,
    typeof SerializationError,
    typeof LockTimeoutError,
    typeof StatementTimeoutError,
    typeof UnknownError
  ]
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlError.ts#L354)

Since v4.0.0
