---
title: McpSchema.ts
nav_order: 149
parent: "effect"
---

## McpSchema.ts overview

Defines schemas for Model Context Protocol messages.

MCP clients and servers use these schemas to describe the JSON-RPC requests,
notifications, results, and errors that can cross the protocol boundary. This
module focuses on message shapes: it defines the shared protocol data model,
groups related messages for the RPC layer, and provides helpers for optional
fields and parameter metadata. Transport and server behavior live in other
modules.

Since v4.0.0

---

## Exports Grouped by Category

- [annotations](#annotations)
  - [EnabledWhen (class)](#enabledwhen-class)
- [autocomplete](#autocomplete)
  - [Complete (class)](#complete-class)
  - [CompleteResult (class)](#completeresult-class)
  - [PromptReference (class)](#promptreference-class)
  - [ResourceReference (class)](#resourcereference-class)
- [cancellation](#cancellation)
  - [CancelledNotification (class)](#cancellednotification-class)
- [client](#client)
  - [McpServerClient (class)](#mcpserverclient-class)
- [constants](#constants)
  - [INTERNAL_ERROR_CODE](#internal_error_code)
  - [INVALID_PARAMS_ERROR_CODE](#invalid_params_error_code)
  - [INVALID_REQUEST_ERROR_CODE](#invalid_request_error_code)
  - [METHOD_NOT_FOUND_ERROR_CODE](#method_not_found_error_code)
  - [PARSE_ERROR_CODE](#parse_error_code)
- [elicitation](#elicitation)
  - [Elicit (class)](#elicit-class)
  - [ElicitAcceptResult (class)](#elicitacceptresult-class)
  - [ElicitDeclineResult (class)](#elicitdeclineresult-class)
  - [ElicitResult](#elicitresult)
  - [ElicitationDeclined (class)](#elicitationdeclined-class)
- [errors](#errors)
  - [InternalError (class)](#internalerror-class)
  - [InvalidParams (class)](#invalidparams-class)
  - [InvalidRequest (class)](#invalidrequest-class)
  - [McpError](#mcperror)
  - [MethodNotFound (class)](#methodnotfound-class)
  - [ParseError (class)](#parseerror-class)
- [initialization](#initialization)
  - [Initialize (class)](#initialize-class)
  - [InitializeResult (class)](#initializeresult-class)
  - [InitializedNotification (class)](#initializednotification-class)
- [logging](#logging)
  - [LoggingLevel](#logginglevel)
  - [LoggingLevel (type alias)](#logginglevel-type-alias)
  - [LoggingMessageNotification (class)](#loggingmessagenotification-class)
  - [SetLevel (class)](#setlevel-class)
- [middleware](#middleware)
  - [McpServerClientMiddleware (class)](#mcpserverclientmiddleware-class)
- [models](#models)
  - [Cursor (type alias)](#cursor-type-alias)
  - [ProgressToken (type alias)](#progresstoken-type-alias)
  - [RequestId (type alias)](#requestid-type-alias)
  - [Role (type alias)](#role-type-alias)
  - [optionalWithDefault (interface)](#optionalwithdefault-interface)
- [parameters](#parameters)
  - [Param (interface)](#param-interface)
  - [isParam](#isparam)
  - [param](#param)
- [ping](#ping)
  - [Ping (class)](#ping-class)
- [progress](#progress)
  - [ProgressNotification (class)](#progressnotification-class)
- [protocols](#protocols)
  - [ClientFailureEncoded (type alias)](#clientfailureencoded-type-alias)
  - [ClientNotificationEncoded (type alias)](#clientnotificationencoded-type-alias)
  - [ClientNotificationRpcs (class)](#clientnotificationrpcs-class)
  - [ClientRequestEncoded (type alias)](#clientrequestencoded-type-alias)
  - [ClientRequestRpcs (class)](#clientrequestrpcs-class)
  - [ClientRpcs (class)](#clientrpcs-class)
  - [ClientSuccessEncoded (type alias)](#clientsuccessencoded-type-alias)
  - [FailureEncoded (type alias)](#failureencoded-type-alias)
  - [FromClientEncoded (type alias)](#fromclientencoded-type-alias)
  - [FromServerEncoded (type alias)](#fromserverencoded-type-alias)
  - [GetPrompt (class)](#getprompt-class)
  - [ListPrompts (class)](#listprompts-class)
  - [NotificationEncoded (type alias)](#notificationencoded-type-alias)
  - [PromptListChangedNotification (class)](#promptlistchangednotification-class)
  - [RequestEncoded (type alias)](#requestencoded-type-alias)
  - [ServerFailureEncoded (type alias)](#serverfailureencoded-type-alias)
  - [ServerNotificationEncoded (type alias)](#servernotificationencoded-type-alias)
  - [ServerNotificationRpcs (class)](#servernotificationrpcs-class)
  - [ServerRequestEncoded (type alias)](#serverrequestencoded-type-alias)
  - [ServerRequestRpcs (class)](#serverrequestrpcs-class)
  - [ServerResultEncoded (type alias)](#serverresultencoded-type-alias)
  - [ServerSuccessEncoded (type alias)](#serversuccessencoded-type-alias)
  - [SuccessEncoded (type alias)](#successencoded-type-alias)
- [resources](#resources)
  - [BlobResourceContents (class)](#blobresourcecontents-class)
  - [ListResourceTemplates (class)](#listresourcetemplates-class)
  - [ListResourceTemplatesResult (class)](#listresourcetemplatesresult-class)
  - [ListResources (class)](#listresources-class)
  - [ListResourcesResult (class)](#listresourcesresult-class)
  - [ReadResource (class)](#readresource-class)
  - [ReadResourceResult (class)](#readresourceresult-class)
  - [Resource (class)](#resource-class)
  - [ResourceContents (class)](#resourcecontents-class)
  - [ResourceListChangedNotification (class)](#resourcelistchangednotification-class)
  - [ResourceTemplate (class)](#resourcetemplate-class)
  - [ResourceUpdatedNotification (class)](#resourceupdatednotification-class)
  - [Subscribe (class)](#subscribe-class)
  - [TextResourceContents (class)](#textresourcecontents-class)
  - [Unsubscribe (class)](#unsubscribe-class)
- [roots](#roots)
  - [ListRoots (class)](#listroots-class)
  - [ListRootsResult (class)](#listrootsresult-class)
  - [Root (class)](#root-class)
  - [RootsListChangedNotification (class)](#rootslistchangednotification-class)
- [sampling](#sampling)
  - [CreateMessage (class)](#createmessage-class)
  - [CreateMessageResult (class)](#createmessageresult-class)
  - [ModelHint (class)](#modelhint-class)
  - [ModelPreferences (class)](#modelpreferences-class)
  - [SamplingMessage (class)](#samplingmessage-class)
- [schemas](#schemas)
  - [Annotations (class)](#annotations-class)
  - [AudioContent (class)](#audiocontent-class)
  - [ClientCapabilities (class)](#clientcapabilities-class)
  - [ContentBlock](#contentblock)
  - [Cursor](#cursor)
  - [EmbeddedResource (class)](#embeddedresource-class)
  - [GetPromptResult (class)](#getpromptresult-class)
  - [ImageContent (class)](#imagecontent-class)
  - [Implementation (class)](#implementation-class)
  - [ListPromptsResult (class)](#listpromptsresult-class)
  - [McpErrorBase (class)](#mcperrorbase-class)
  - [NotificationMeta (class)](#notificationmeta-class)
  - [PaginatedRequestMeta (class)](#paginatedrequestmeta-class)
  - [PaginatedResultMeta (class)](#paginatedresultmeta-class)
  - [ProgressToken](#progresstoken)
  - [Prompt (class)](#prompt-class)
  - [PromptArgument (class)](#promptargument-class)
  - [PromptMessage (class)](#promptmessage-class)
  - [RequestId](#requestid)
  - [RequestMeta (class)](#requestmeta-class)
  - [ResourceLink (class)](#resourcelink-class)
  - [ResultMeta (class)](#resultmeta-class)
  - [Role](#role)
  - [ServerCapabilities (class)](#servercapabilities-class)
  - [TextContent (class)](#textcontent-class)
  - [optional](#optional)
  - [optionalWithDefault](#optionalwithdefault)
- [tools](#tools)
  - [CallTool (class)](#calltool-class)
  - [CallToolResult (class)](#calltoolresult-class)
  - [ListTools (class)](#listtools-class)
  - [ListToolsResult (class)](#listtoolsresult-class)
  - [Tool (class)](#tool-class)
  - [ToolAnnotations (class)](#toolannotations-class)
  - [ToolListChangedNotification (class)](#toollistchangednotification-class)

---

# annotations

## EnabledWhen (class)

Annotation to conditionally enable or disable tools based on client
information.

**Signature**

```ts
declare class EnabledWhen
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L2525)

Since v4.0.0

# autocomplete

## Complete (class)

Sent from the client to the server to ask for completion options.

**Signature**

```ts
declare class Complete
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L1926)

Since v4.0.0

## CompleteResult (class)

Schema for the server's response to a completion/complete request.

**Signature**

```ts
declare class CompleteResult
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L1888)

Since v4.0.0

## PromptReference (class)

Schema for a prompt reference used in autocomplete requests.

**Signature**

```ts
declare class PromptReference
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L1873)

Since v4.0.0

## ResourceReference (class)

Schema for a reference to a resource or resource template definition.

**Signature**

```ts
declare class ResourceReference
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L1859)

Since v4.0.0

# cancellation

## CancelledNotification (class)

Sent from either peer to cancel a previously issued request in the same
direction.

**Details**

The payload identifies the request to cancel and may include a
human-readable reason.

**Signature**

```ts
declare class CancelledNotification
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L760)

Since v4.0.0

# client

## McpServerClient (class)

Service available while handling an MCP client request.

**Details**

It exposes the current client id, the client's initialize payload, and a
scoped RPC client for server-initiated requests back to that client.

**Signature**

```ts
declare class McpServerClient
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L2166)

Since v4.0.0

# constants

## INTERNAL_ERROR_CODE

Represents the JSON-RPC error code for internal server errors.

**When to use**

Use when building an MCP/JSON-RPC error response for an unexpected
server-side failure.

**Signature**

```ts
declare const INTERNAL_ERROR_CODE: -32603
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L513)

Since v4.0.0

## INVALID_PARAMS_ERROR_CODE

Represents the JSON-RPC error code for invalid method parameters.

**When to use**

Use when building an MCP/JSON-RPC error response for decoded request
parameters that fail method-specific validation.

**Signature**

```ts
declare const INVALID_PARAMS_ERROR_CODE: -32602
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L501)

Since v4.0.0

## INVALID_REQUEST_ERROR_CODE

Represents the JSON-RPC error code for requests that are not valid request objects.

**When to use**

Use when building an MCP/JSON-RPC error response for a syntactically parsed
request object that fails request-shape validation.

**Signature**

```ts
declare const INVALID_REQUEST_ERROR_CODE: -32600
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L476)

Since v4.0.0

## METHOD_NOT_FOUND_ERROR_CODE

Represents the JSON-RPC error code for requests whose method does not exist or is not
available.

**When to use**

Use when building an MCP/JSON-RPC error response for a request whose
`method` is unknown or unavailable.

**Signature**

```ts
declare const METHOD_NOT_FOUND_ERROR_CODE: -32601
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L489)

Since v4.0.0

## PARSE_ERROR_CODE

Represents the JSON-RPC error code for invalid JSON that could not be parsed.

**When to use**

Use when building an MCP/JSON-RPC error response before a request object is
available because the JSON payload could not be parsed.

**Signature**

```ts
declare const PARSE_ERROR_CODE: -32700
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L525)

Since v4.0.0

# elicitation

## Elicit (class)

Sent from the server asking the client to collect structured input from the
user.

**Details**

The client responds with accepted content, an explicit decline, or a
cancellation.

**Signature**

```ts
declare class Elicit
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L2114)

Since v4.0.0

## ElicitAcceptResult (class)

Schema for an accepted client response to an elicitation request.

**Signature**

```ts
declare class ElicitAcceptResult
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L2054)

Since v4.0.0

## ElicitDeclineResult (class)

Schema for a declined or canceled client response to an elicitation request.

**Signature**

```ts
declare class ElicitDeclineResult
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L2078)

Since v4.0.0

## ElicitResult

Schema for every client response to an elicitation request.

**Signature**

```ts
declare const ElicitResult: Schema.Union<readonly [typeof ElicitAcceptResult, typeof ElicitDeclineResult]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L2097)

Since v4.0.0

## ElicitationDeclined (class)

Error raised when an MCP elicitation request is declined or fails before
accepted content is returned.

**Details**

The error stores the original elicitation request and, when available, the
underlying cause.

**Signature**

```ts
declare class ElicitationDeclined
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L2143)

Since v4.0.0

# errors

## InternalError (class)

Represents an MCP/JSON-RPC error for unexpected internal server failures.

**When to use**

Use to report an unexpected server-side failure while handling a valid
request.

**Details**

Uses the standard JSON-RPC internal error code `-32603` and includes
`InternalError.notImplemented` for unimplemented handlers.

**Signature**

```ts
declare class InternalError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L626)

Since v4.0.0

## InvalidParams (class)

Represents an MCP/JSON-RPC error for invalid method parameters.

**When to use**

Use to report a request whose method parameters do not match the method
schema.

**Details**

Uses the standard JSON-RPC invalid params code `-32602`.

**Signature**

```ts
declare class InvalidParams
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L604)

Since v4.0.0

## InvalidRequest (class)

Represents an MCP/JSON-RPC error for a request object that is not valid.

**When to use**

Use to report a syntactically parsed JSON-RPC request that is not a valid
request object.

**Details**

Uses the standard JSON-RPC invalid request code `-32600`.

**Signature**

```ts
declare class InvalidRequest
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L563)

Since v4.0.0

## McpError

Schema for MCP protocol errors returned in JSON-RPC failure responses,
including standard protocol errors and custom `McpErrorBase` values.

**Signature**

```ts
declare const McpError: Schema.Union<
  readonly [
    typeof ParseError,
    typeof InvalidRequest,
    typeof MethodNotFound,
    typeof InvalidParams,
    typeof InternalError,
    typeof McpErrorBase
  ]
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L641)

Since v4.0.0

## MethodNotFound (class)

Represents an MCP/JSON-RPC error for an unavailable method.

**When to use**

Use to report a JSON-RPC method that does not exist or is not available.

**Details**

Uses the standard JSON-RPC method-not-found code `-32601`.

**Signature**

```ts
declare class MethodNotFound
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L583)

Since v4.0.0

## ParseError (class)

Represents an MCP/JSON-RPC error for invalid JSON that could not be parsed.

**When to use**

Use to report a JSON parse failure before a valid JSON-RPC request object is
available.

**Details**

Uses the standard JSON-RPC parse error code `-32700`.

**Signature**

```ts
declare class ParseError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L542)

Since v4.0.0

# initialization

## Initialize (class)

Sent from the client to the server when it first connects, asking it to begin
initialization.

**Signature**

```ts
declare class Initialize
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L711)

Since v4.0.0

## InitializeResult (class)

Schema for the server's response to an initialize request from the client.

**Signature**

```ts
declare class InitializeResult
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L684)

Since v4.0.0

## InitializedNotification (class)

Sent from the client to the server after initialization has finished.

**Signature**

```ts
declare class InitializedNotification
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L740)

Since v4.0.0

# logging

## LoggingLevel

Schema for log message severity levels, mapped to syslog message severities
as specified in RFC 5424 section 6.2.1:
https://datatracker.ietf.org/doc/html/rfc5424#section-6.2.1.

**Signature**

```ts
declare const LoggingLevel: Schema.Literals<
  ["debug", "info", "notice", "warning", "error", "critical", "alert", "emergency"]
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L1595)

Since v4.0.0

## LoggingLevel (type alias)

Type represented by the MCP logging level schema, mapped to syslog message
severities as specified in RFC 5424 section 6.2.1:
https://datatracker.ietf.org/doc/html/rfc5424#section-6.2.1.

**Signature**

```ts
type LoggingLevel = typeof LoggingLevel.Type
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L1623)

Since v4.0.0

## LoggingMessageNotification (class)

Sent from the server to the client carrying a log message.

**Details**

The notification includes the severity level, optional logger name, and
JSON-serializable log data.

**Signature**

```ts
declare class LoggingMessageNotification
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L1655)

Since v4.0.0

## SetLevel (class)

Sent from the client to the server to enable or adjust logging.

**Signature**

```ts
declare class SetLevel
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L1631)

Since v4.0.0

# middleware

## McpServerClientMiddleware (class)

RPC middleware that provides `McpServerClient` to handlers for initialized
MCP clients.

**Signature**

```ts
declare class McpServerClientMiddleware
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L2183)

Since v4.0.0

# models

## Cursor (type alias)

Type represented by the MCP cursor schema.

**Details**

A cursor is an opaque string token used to continue paginated requests.

**Signature**

```ts
type Cursor = typeof Cursor.Type
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L214)

Since v4.0.0

## ProgressToken (type alias)

Type represented by the MCP progress token schema.

**Signature**

```ts
type ProgressToken = typeof ProgressToken.Type
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L132)

Since v4.0.0

## RequestId (type alias)

Type represented by the JSON-RPC request identifier schema.

**Signature**

```ts
type RequestId = typeof RequestId.Type
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L112)

Since v4.0.0

## Role (type alias)

Type represented by the MCP role schema.

**Details**

Valid roles are `"user"` and `"assistant"`.

**Signature**

```ts
type Role = typeof Role.Type
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L274)

Since v4.0.0

## optionalWithDefault (interface)

Schema type returned by `optionalWithDefault`.

**Details**

It represents an optional struct field that supplies a default value when the
field is absent during decoding or construction.

**Signature**

```ts
export interface optionalWithDefault<
  S extends Schema.Constraint & Schema.WithoutConstructorDefault
> extends Schema.withConstructorDefault<Schema.decodeTo<Schema.toType<Schema.optionalKey<S>>, Schema.optionalKey<S>>> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L38)

Since v4.0.0

# parameters

## Param (interface)

Schema wrapper used for resource URI template parameters.

**Details**

A `Param` behaves like the wrapped schema while carrying the parameter name
used for template compilation and completion lookup.

**Signature**

```ts
export interface Param<Name extends string, S extends Schema.Constraint> extends Schema.BottomLazy<
  S["ast"],
  Param<Name, S>,
  S["~type.parameters"],
  S["~type.mutability"],
  S["~type.optionality"],
  S["~type.constructor.default"],
  S["~encoded.mutability"],
  S["~encoded.optionality"]
> {
  readonly Type: S["Type"]
  readonly Encoded: S["Encoded"]
  readonly DecodingServices: S["DecodingServices"]
  readonly EncodingServices: S["EncodingServices"]
  readonly Rebuild: Param<Name, S>
  readonly "~type.make.in": S["~type.make.in"]
  readonly "~type.make": S["~type.make"]
  readonly Iso: S["Iso"]
  readonly [ParamSchemaTypeId]: typeof ParamSchemaTypeId
  readonly name: Name
  readonly schema: S
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L2480)

Since v4.0.0

## isParam

Returns `true` when a schema was created with `param` and therefore carries
a resource URI template parameter name.

**Signature**

```ts
declare const isParam: (schema: Schema.Constraint) => schema is Param<string, Schema.Top>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L2465)

Since v4.0.0

## param

Creates a parameter for a resource URI template.

**Signature**

```ts
declare const param: <const Name extends string, S extends Schema.Constraint>(name: Name, schema: S) => Param<Name, S>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L2511)

Since v4.0.0

# ping

## Ping (class)

Represents an MCP ping request used to check whether the peer is still alive.

**When to use**

Use to implement client or server liveness checks.

**Details**

The receiver should respond promptly; otherwise the sender may disconnect.

**Signature**

```ts
declare class Ping
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L668)

Since v4.0.0

# progress

## ProgressNotification (class)

Sent from either peer to report progress for a long-running request.

**Signature**

```ts
declare class ProgressNotification
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L788)

Since v4.0.0

# protocols

## ClientFailureEncoded (type alias)

Encoded failure response sent by a client for a server-initiated request.

**Signature**

```ts
type ClientFailureEncoded = FailureEncoded<typeof ServerRequestRpcs>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L2364)

Since v4.0.0

## ClientNotificationEncoded (type alias)

Encoded union of all client-to-server MCP notification messages.

**Signature**

```ts
type ClientNotificationEncoded = NotificationEncoded<typeof ClientNotificationRpcs>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L2340)

Since v4.0.0

## ClientNotificationRpcs (class)

RPC group for notifications that MCP clients send to the server, such as
cancellation, progress, initialization completion, and roots list changes.

**Signature**

```ts
declare class ClientNotificationRpcs
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L2327)

Since v4.0.0

## ClientRequestEncoded (type alias)

Encoded union of all client-to-server MCP request messages.

**Signature**

```ts
type ClientRequestEncoded = RequestEncoded<typeof ClientRequestRpcs>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L2318)

Since v4.0.0

## ClientRequestRpcs (class)

RPC group for requests that MCP clients send to the server.

**Details**

The group includes initialization, resource, prompt, tool, logging,
completion, and ping requests, and installs `McpServerClientMiddleware` for
handlers.

**Signature**

```ts
declare class ClientRequestRpcs
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L2296)

Since v4.0.0

## ClientRpcs (class)

RPC group combining all client-to-server MCP requests and notifications.

**Signature**

```ts
declare class ClientRpcs
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L2348)

Since v4.0.0

## ClientSuccessEncoded (type alias)

Encoded success response sent by a client for a server-initiated request.

**Signature**

```ts
type ClientSuccessEncoded = SuccessEncoded<typeof ServerRequestRpcs>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L2356)

Since v4.0.0

## FailureEncoded (type alias)

Encoded failure response for an RPC in `Group`, containing the original
request id and encoded error.

**Signature**

```ts
type FailureEncoded<Group> =
  RpcGroup.Rpcs<Group> extends infer Rpc
    ? Rpc extends Rpc.Rpc<infer _Tag, infer _Payload, infer _Success, infer _Error, infer _Middleware>
      ? {
          readonly _tag: "Failure"
          readonly id: string | number
          readonly error: _Error["Encoded"]
        }
      : never
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L2268)

Since v4.0.0

## FromClientEncoded (type alias)

Encoded MCP messages accepted from a client by the server protocol: client
requests and client notifications.

**Signature**

```ts
type FromClientEncoded = ClientRequestEncoded | ClientNotificationEncoded
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L2445)

Since v4.0.0

## FromServerEncoded (type alias)

Encoded MCP messages emitted by the server protocol to a client: server
responses and server notifications.

**Signature**

```ts
type FromServerEncoded = ServerResultEncoded | ServerNotificationEncoded
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L2454)

Since v4.0.0

## GetPrompt (class)

Sent from the client to get a prompt provided by the server.

**Signature**

```ts
declare class GetPrompt
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L1353)

Since v4.0.0

## ListPrompts (class)

Sent from the client to request a list of prompts and prompt templates the
server has.

**Signature**

```ts
declare class ListPrompts
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L1324)

Since v4.0.0

## NotificationEncoded (type alias)

Encoded notification message for an RPC in `Group`, including the method and
encoded payload without a request id.

**Signature**

```ts
type NotificationEncoded<Group> =
  RpcGroup.Rpcs<Group> extends infer Rpc
    ? Rpc extends Rpc.Rpc<infer _Tag, infer _Payload, infer _Success, infer _Error, infer _Middleware>
      ? {
          readonly _tag: "Notification"
          readonly method: _Tag
          readonly payload: _Payload["Encoded"]
        }
      : never
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L2222)

Since v4.0.0

## PromptListChangedNotification (class)

Represents a notification that the server's prompt list changed.

**When to use**

Use to notify clients that `prompts/list` should be requested again.

**Details**

Servers may send this notification without a previous client subscription.

**Signature**

```ts
declare class PromptListChangedNotification
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L1384)

Since v4.0.0

## RequestEncoded (type alias)

Encoded JSON-RPC request message for an RPC in `Group`, including the request
id, method, and encoded payload.

**Signature**

```ts
type RequestEncoded<Group> =
  RpcGroup.Rpcs<Group> extends infer Rpc
    ? Rpc extends Rpc.Rpc<infer _Tag, infer _Payload, infer _Success, infer _Error, infer _Middleware>
      ? {
          readonly _tag: "Request"
          readonly id: string | number
          readonly method: _Tag
          readonly payload: _Payload["Encoded"]
        }
      : never
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L2198)

Since v4.0.0

## ServerFailureEncoded (type alias)

Encoded failure response sent by the server for a client-initiated request.

**Signature**

```ts
type ServerFailureEncoded = FailureEncoded<typeof ClientRequestRpcs>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L2428)

Since v4.0.0

## ServerNotificationEncoded (type alias)

Encoded union of all server-to-client MCP notification messages.

**Signature**

```ts
type ServerNotificationEncoded = NotificationEncoded<typeof ServerNotificationRpcs>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L2412)

Since v4.0.0

## ServerNotificationRpcs (class)

RPC group for notifications that an MCP server can send to a client,
including cancellation, progress, logging, and list or resource update
notifications.

**Signature**

```ts
declare class ServerNotificationRpcs
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L2396)

Since v4.0.0

## ServerRequestEncoded (type alias)

Encoded union of all server-to-client MCP request messages.

**Signature**

```ts
type ServerRequestEncoded = RequestEncoded<typeof ServerRequestRpcs>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L2386)

Since v4.0.0

## ServerRequestRpcs (class)

RPC group for requests that an MCP server can send to a client, including
ping, sampling, roots listing, and elicitation.

**Signature**

```ts
declare class ServerRequestRpcs
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L2373)

Since v4.0.0

## ServerResultEncoded (type alias)

Encoded server response to a client request, either success or failure.

**Signature**

```ts
type ServerResultEncoded = ServerSuccessEncoded | ServerFailureEncoded
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L2436)

Since v4.0.0

## ServerSuccessEncoded (type alias)

Encoded success response sent by the server for a client-initiated request.

**Signature**

```ts
type ServerSuccessEncoded = SuccessEncoded<typeof ClientRequestRpcs>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L2420)

Since v4.0.0

## SuccessEncoded (type alias)

Encoded success response for an RPC in `Group`, containing the original
request id and encoded result.

**Signature**

```ts
type SuccessEncoded<Group> =
  RpcGroup.Rpcs<Group> extends infer Rpc
    ? Rpc extends Rpc.Rpc<infer _Tag, infer _Payload, infer _Success, infer _Error, infer _Middleware>
      ? {
          readonly _tag: "Success"
          readonly id: string | number
          readonly result: _Success["Encoded"]
        }
      : never
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L2245)

Since v4.0.0

# resources

## BlobResourceContents (class)

Schema for binary resource contents represented as a `Uint8Array`.

**Signature**

```ts
declare class BlobResourceContents
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L956)

Since v4.0.0

## ListResourceTemplates (class)

Sent from the client to request a list of resource templates the server has.

**Signature**

```ts
declare class ListResourceTemplates
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L1009)

Since v4.0.0

## ListResourceTemplatesResult (class)

Schema for the server's response to a resources/templates/list request from
the client.

**Signature**

```ts
declare class ListResourceTemplatesResult
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L996)

Since v4.0.0

## ListResources (class)

Sent from the client to request a list of resources the server has.

**Signature**

```ts
declare class ListResources
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L983)

Since v4.0.0

## ListResourcesResult (class)

Schema for the server's response to a resources/list request from the client.

**Signature**

```ts
declare class ListResourcesResult
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L970)

Since v4.0.0

## ReadResource (class)

Sent from the client to the server, to read a specific resource URI.

**Signature**

```ts
declare class ReadResource
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L1032)

Since v4.0.0

## ReadResourceResult (class)

Schema for the server's response to a resources/read request from the client.

**Signature**

```ts
declare class ReadResourceResult
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L1021)

Since v4.0.0

## Resource (class)

Schema for a known resource that the server is capable of reading.

**Signature**

```ts
declare class Resource
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L822)

Since v4.0.0

## ResourceContents (class)

Schema for the contents of a specific resource or sub-resource.

**Signature**

```ts
declare class ResourceContents
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L920)

Since v4.0.0

## ResourceListChangedNotification (class)

Represents a notification that the server's resource list changed.

**When to use**

Use to notify clients that `resources/list` should be requested again.

**Details**

Servers may send this notification without a previous client subscription.

**Signature**

```ts
declare class ResourceListChangedNotification
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L1059)

Since v4.0.0

## ResourceTemplate (class)

Schema for a template description of resources available on the server.

**Signature**

```ts
declare class ResourceTemplate
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L874)

Since v4.0.0

## ResourceUpdatedNotification (class)

Sent from the server when a subscribed resource URI has changed.

**Details**

The URI may identify a sub-resource of the resource that the client
originally subscribed to.

**Signature**

```ts
declare class ResourceUpdatedNotification
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L1113)

Since v4.0.0

## Subscribe (class)

Sent from the client to request resources/updated notifications from the
server whenever a particular resource changes.

**Signature**

```ts
declare class Subscribe
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L1070)

Since v4.0.0

## TextResourceContents (class)

Schema for text resource contents represented as a string.

**Signature**

```ts
declare class TextResourceContents
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L941)

Since v4.0.0

## Unsubscribe (class)

Sent from the client to request cancellation of resources/updated
notifications from the server. This should follow a previous
resources/subscribe request.

**Signature**

```ts
declare class Unsubscribe
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L1090)

Since v4.0.0

# roots

## ListRoots (class)

Sent from the server to request a list of root URIs from the client. Roots
allow servers to ask for specific directories or files to operate on. A
common example for roots is providing a set of repositories or directories a
server should operate on.

**Details**

This request is typically used when the server needs to understand the file
system structure or access specific locations that the client has permission
to read from.

**Signature**

```ts
declare class ListRoots
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L2020)

Since v4.0.0

## ListRootsResult (class)

Represents a client response containing the roots available to the server.

**When to use**

Use to return the directories or files that an MCP server may operate on.

**Signature**

```ts
declare class ListRootsResult
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L1999)

Since v4.0.0

## Root (class)

Represents a root directory or file that the server can operate on.

**Signature**

```ts
declare class Root
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L1972)

Since v4.0.0

## RootsListChangedNotification (class)

Represents a notification that the client's root list changed.

**When to use**

Use to tell the server that it should request an updated roots list.

**Details**

Send this when the client adds, removes, or modifies a root.

**Signature**

```ts
declare class RootsListChangedNotification
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L2040)

Since v4.0.0

# sampling

## CreateMessage (class)

Represents a server request for the client to sample an LLM.

**When to use**

Use when you need to request model sampling from an MCP client on behalf of a
server.

**Details**

The client chooses the model and should ask the user to approve the sampling
request before it begins.

**Signature**

```ts
declare class CreateMessage
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L1814)

Since v4.0.0

## CreateMessageResult (class)

Represents a client response to an MCP sampling request.

**When to use**

Use to return the message produced by client-side model sampling.

**Details**

The client should let the user inspect the sampled message before returning
it to the server.

**Signature**

```ts
declare class CreateMessageResult
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L1785)

Since v4.0.0

## ModelHint (class)

Schema for model selection hints.

**Details**

Keys not declared here are currently left unspecified by the spec and are up
to the client to interpret.

**Signature**

```ts
declare class ModelHint
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L1700)

Since v4.0.0

## ModelPreferences (class)

Schema for the server's model selection preferences requested of the client
during sampling.

**Details**

Because LLMs can vary along multiple dimensions, choosing the "best" model is
rarely straightforward. Different models excel in different areas, some are
faster but less capable, others are more capable but more expensive, and so
on. This interface allows servers to express their priorities across multiple
dimensions to help clients make an appropriate selection for their use case.

**Gotchas**

These preferences are always advisory. The client MAY ignore them. It is also
up to the client to decide how to interpret these preferences and how to
balance them against other considerations.

**Signature**

```ts
declare class ModelPreferences
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L1737)

Since v4.0.0

## SamplingMessage (class)

Describes a message issued to or received from an LLM API.

**Signature**

```ts
declare class SamplingMessage
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L1684)

Since v4.0.0

# schemas

## Annotations (class)

Schema for optional client-facing annotations on MCP objects.

**When to use**

Use to describe intended audience and priority metadata for objects shown or
processed by a client.

**Signature**

```ts
declare class Annotations
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L287)

Since v4.0.0

## AudioContent (class)

Represents audio content provided to or from an LLM.

**Signature**

```ts
declare class AudioContent
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L1220)

Since v4.0.0

## ClientCapabilities (class)

Describes capabilities advertised by an MCP client.

**When to use**

Use to describe which optional MCP features a client supports during
initialization.

**Details**

Known capabilities are represented by this schema, but the capability set is
open and clients may define additional capabilities.

**Signature**

```ts
declare class ClientCapabilities
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L333)

Since v4.0.0

## ContentBlock

Schema for MCP content blocks that can appear in prompt messages or tool
results.

**Signature**

```ts
declare const ContentBlock: Schema.Union<
  readonly [typeof TextContent, typeof ImageContent, typeof AudioContent, typeof EmbeddedResource, typeof ResourceLink]
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L1280)

Since v4.0.0

## Cursor

Schema for opaque cursor tokens used in pagination.

**Signature**

```ts
declare const Cursor: Schema.String
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L202)

Since v4.0.0

## EmbeddedResource (class)

Represents resource contents embedded into a prompt or tool call result.

**Details**

It is up to the client how best to render embedded resources for the benefit
of the LLM and/or the user.

**Signature**

```ts
declare class EmbeddedResource
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L1248)

Since v4.0.0

## GetPromptResult (class)

Represents the server response to a prompts/get request from the client.

**Signature**

```ts
declare class GetPromptResult
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L1336)

Since v4.0.0

## ImageContent (class)

Represents image content provided to or from an LLM.

**Signature**

```ts
declare class ImageContent
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L1197)

Since v4.0.0

## Implementation (class)

Describes the name and version of an MCP implementation.

**Signature**

```ts
declare class Implementation
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L311)

Since v4.0.0

## ListPromptsResult (class)

Represents the server response to a prompts/list request from the client.

**Signature**

```ts
declare class ListPromptsResult
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L1310)

Since v4.0.0

## McpErrorBase (class)

Schema for MCP and JSON-RPC error objects.

**Details**

It contains the numeric error `code`, a concise `message`, and optional
sender-defined `data`.

**Signature**

```ts
declare class McpErrorBase
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L446)

Since v4.0.0

## NotificationMeta (class)

Schema for optional MCP notification metadata.

**Details**

The `_meta` field is reserved for protocol, extension, or implementation
metadata attached to a notification.

**Signature**

```ts
declare class NotificationMeta
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L188)

Since v4.0.0

## PaginatedRequestMeta (class)

Schema for MCP request metadata used by paginated requests.

**Details**

It includes the base request metadata fields plus an optional cursor
indicating where the server should continue listing results.

**Signature**

```ts
declare class PaginatedRequestMeta
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L227)

Since v4.0.0

## PaginatedResultMeta (class)

Schema for MCP result metadata returned by paginated operations.

**Details**

It includes the base result metadata fields plus an optional `nextCursor`,
which indicates that more results may be available.

**Signature**

```ts
declare class PaginatedResultMeta
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L247)

Since v4.0.0

## ProgressToken

Schema for MCP progress tokens that associate progress notifications with the
original request.

**Signature**

```ts
declare const ProgressToken: Schema.Union<[Schema.String, Schema.Number]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L121)

Since v4.0.0

## Prompt (class)

Represents a prompt or prompt template that the server offers.

**Signature**

```ts
declare class Prompt
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L1155)

Since v4.0.0

## PromptArgument (class)

Describes an argument that a prompt can accept.

**Signature**

```ts
declare class PromptArgument
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L1133)

Since v4.0.0

## PromptMessage (class)

Describes a message returned as part of a prompt.

**Details**

This is similar to `SamplingMessage`, but also supports the embedding of
resources from the MCP server.

**Signature**

```ts
declare class PromptMessage
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L1299)

Since v4.0.0

## RequestId

Schema for JSON-RPC request identifiers, allowing string or number ids.

**Signature**

```ts
declare const RequestId: Schema.Union<[Schema.String, Schema.Number]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L101)

Since v4.0.0

## RequestMeta (class)

Schema for optional MCP request metadata.

**Details**

Request metadata may include a progress token that asks the receiver to send
out-of-band progress notifications for the request.

**Signature**

```ts
declare class RequestMeta
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L145)

Since v4.0.0

## ResourceLink (class)

Represents a readable resource included in a prompt or tool call result.

**Gotchas**

Resource links returned by tools are not guaranteed to appear in the results
of `resources/list` requests.

**Signature**

```ts
declare class ResourceLink
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L1268)

Since v4.0.0

## ResultMeta (class)

Schema for optional MCP result metadata.

**Details**

The `_meta` field is reserved for protocol, extension, or implementation
metadata attached to a result.

**Signature**

```ts
declare class ResultMeta
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L169)

Since v4.0.0

## Role

Schema for MCP conversation roles, allowing user and assistant.

**Signature**

```ts
declare const Role: Schema.Literals<["user", "assistant"]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L262)

Since v4.0.0

## ServerCapabilities (class)

Describes capabilities advertised by an MCP server.

**When to use**

Use to describe which optional MCP features a server supports during
initialization.

**Details**

Known capabilities are represented by this schema, but the capability set is
open and servers may define additional capabilities.

**Signature**

```ts
declare class ServerCapabilities
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L380)

Since v4.0.0

## TextContent (class)

Represents text content provided to or from an LLM.

**Signature**

```ts
declare class TextContent
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L1179)

Since v4.0.0

## optional

Creates an optional MCP struct-field schema from a required schema.

**Details**

The field may be absent, and explicit `undefined` values are omitted when
encoding.

**Signature**

```ts
declare const optional: <S extends Schema.Constraint>(
  schema: S
) => Schema.decodeTo<Schema.optional<S>, Schema.optionalKey<S>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L81)

Since v4.0.0

## optionalWithDefault

Marks a struct field as optional and supplies `defaultValue` when the field
is absent.

**Details**

The default is used during decoding and as the constructor default for the
schema field.

**Signature**

```ts
declare const optionalWithDefault: <S extends Schema.Constraint & Schema.WithoutConstructorDefault>(
  schema: S,
  defaultValue: () => Schema.optionalKey<S>["Type"]
) => optionalWithDefault<S>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L54)

Since v4.0.0

# tools

## CallTool (class)

Represents a client request to invoke a tool provided by the server.

**When to use**

Use when you need to represent a client request that already knows the tool
name and asks the server to execute it with argument values.

**See**

- `ListTools` for discovering available tools before calling one
- `CallToolResult` for the successful tool-call result shape

**Signature**

```ts
declare class CallTool
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L1552)

Since v4.0.0

## CallToolResult (class)

Schema for the server's response to a tool call.

**Details**

Any errors that originate from the tool SHOULD be reported inside the result
object, with `isError` set to true, _not_ as an MCP protocol-level error
response. Otherwise, the LLM would not be able to see that an error occurred
and self-correct. However, any errors in _finding_ the tool, an error
indicating that the server does not support tool calls, or any other
exceptional conditions, should be reported as an MCP error response.

**Signature**

```ts
declare class CallToolResult
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L1526)

Since v4.0.0

## ListTools (class)

Sent from the client to request a list of tools the server has.

**Signature**

```ts
declare class ListTools
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L1505)

Since v4.0.0

## ListToolsResult (class)

Schema for the server's response to a tools/list request from the client.

**Signature**

```ts
declare class ListToolsResult
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L1492)

Since v4.0.0

## Tool (class)

Schema for the definition of a tool the client can call.

**Signature**

```ts
declare class Tool
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L1455)

Since v4.0.0

## ToolAnnotations (class)

Schema for additional properties describing a tool to clients.

**Details**

NOTE: all properties in ToolAnnotations are **hints**. They are not
guaranteed to provide a faithful description of tool behavior (including
descriptive properties like `title`).

**Gotchas**

Clients should never make tool use decisions based on ToolAnnotations
received from untrusted servers.

**Signature**

```ts
declare class ToolAnnotations
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L1409)

Since v4.0.0

## ToolListChangedNotification (class)

Represents a notification that the server's tool list changed.

**When to use**

Use to notify clients that `tools/list` should be requested again.

**Details**

Servers may send this notification without a previous client subscription.

**Signature**

```ts
declare class ToolListChangedNotification
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/McpSchema.ts#L1579)

Since v4.0.0
