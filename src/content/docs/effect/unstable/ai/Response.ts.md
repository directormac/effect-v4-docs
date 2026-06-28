---
title: Response.ts
nav_order: 154
parent: "effect"
---

## Response.ts overview

Defines a shared data model for AI model output.

Responses are represented as typed parts so different providers can expose
text, reasoning, tool calls, files, sources, metadata, finish information, and
errors through one shape. The same model is used for complete responses and
streaming responses, where start, delta, and end parts describe content as it
arrives. This module also carries provider metadata and schemas used by tools
that need to validate response parts.

Since v4.0.0

---

## Exports Grouped by Category

- [configuration](#configuration)
  - [DocumentSourcePartMetadata (interface)](#documentsourcepartmetadata-interface)
  - [ErrorPartMetadata (interface)](#errorpartmetadata-interface)
  - [FilePartMetadata (interface)](#filepartmetadata-interface)
  - [FinishPartMetadata (interface)](#finishpartmetadata-interface)
  - [ReasoningDeltaPartMetadata (interface)](#reasoningdeltapartmetadata-interface)
  - [ReasoningEndPartMetadata (interface)](#reasoningendpartmetadata-interface)
  - [ReasoningPartMetadata (interface)](#reasoningpartmetadata-interface)
  - [ReasoningStartPartMetadata (interface)](#reasoningstartpartmetadata-interface)
  - [ResponseMetadataPartMetadata (interface)](#responsemetadatapartmetadata-interface)
  - [TextDeltaPartMetadata (interface)](#textdeltapartmetadata-interface)
  - [TextEndPartMetadata (interface)](#textendpartmetadata-interface)
  - [TextPartMetadata (interface)](#textpartmetadata-interface)
  - [TextStartPartMetadata (interface)](#textstartpartmetadata-interface)
  - [ToolApprovalRequestPartMetadata (interface)](#toolapprovalrequestpartmetadata-interface)
  - [ToolCallPartMetadata (interface)](#toolcallpartmetadata-interface)
  - [ToolParamsDeltaPartMetadata (interface)](#toolparamsdeltapartmetadata-interface)
  - [ToolParamsEndPartMetadata (interface)](#toolparamsendpartmetadata-interface)
  - [ToolParamsStartPartMetadata (interface)](#toolparamsstartpartmetadata-interface)
  - [ToolResultPartMetadata (interface)](#toolresultpartmetadata-interface)
  - [UrlSourcePartMetadata (interface)](#urlsourcepartmetadata-interface)
- [constructors](#constructors)
  - [makePart](#makepart)
  - [toolApprovalRequestPart](#toolapprovalrequestpart)
  - [toolCallPart](#toolcallpart)
  - [toolResultPart](#toolresultpart)
- [guards](#guards)
  - [isPart](#ispart)
- [models](#models)
  - [AllParts (type alias)](#allparts-type-alias)
  - [AllPartsEncoded (type alias)](#allpartsencoded-type-alias)
  - [AnyPart (type alias)](#anypart-type-alias)
  - [AnyPartEncoded (type alias)](#anypartencoded-type-alias)
  - [BasePart (interface)](#basepart-interface)
  - [BasePartEncoded (interface)](#basepartencoded-interface)
  - [BaseToolResult (interface)](#basetoolresult-interface)
  - [DocumentSourcePart (interface)](#documentsourcepart-interface)
  - [DocumentSourcePartEncoded (interface)](#documentsourcepartencoded-interface)
  - [ErrorPart (interface)](#errorpart-interface)
  - [ErrorPartEncoded (interface)](#errorpartencoded-interface)
  - [FilePart (interface)](#filepart-interface)
  - [FilePartEncoded (interface)](#filepartencoded-interface)
  - [FinishPart (interface)](#finishpart-interface)
  - [FinishPartEncoded (interface)](#finishpartencoded-interface)
  - [FinishReason](#finishreason)
  - [FinishReason (type alias)](#finishreason-type-alias)
  - [Part (type alias)](#part-type-alias)
  - [PartEncoded (type alias)](#partencoded-type-alias)
  - [ProviderMetadata (type alias)](#providermetadata-type-alias)
  - [ReasoningDeltaPart (interface)](#reasoningdeltapart-interface)
  - [ReasoningDeltaPartEncoded (interface)](#reasoningdeltapartencoded-interface)
  - [ReasoningEndPart (interface)](#reasoningendpart-interface)
  - [ReasoningEndPartEncoded (interface)](#reasoningendpartencoded-interface)
  - [ReasoningPart (interface)](#reasoningpart-interface)
  - [ReasoningPartEncoded (interface)](#reasoningpartencoded-interface)
  - [ReasoningStartPart (interface)](#reasoningstartpart-interface)
  - [ReasoningStartPartEncoded (interface)](#reasoningstartpartencoded-interface)
  - [ResponseMetadataPart (interface)](#responsemetadatapart-interface)
  - [ResponseMetadataPartEncoded (interface)](#responsemetadatapartencoded-interface)
  - [StreamPart (type alias)](#streampart-type-alias)
  - [StreamPartEncoded (type alias)](#streampartencoded-type-alias)
  - [TextDeltaPart (interface)](#textdeltapart-interface)
  - [TextDeltaPartEncoded (interface)](#textdeltapartencoded-interface)
  - [TextEndPart (interface)](#textendpart-interface)
  - [TextEndPartEncoded (interface)](#textendpartencoded-interface)
  - [TextPart (interface)](#textpart-interface)
  - [TextPartEncoded (interface)](#textpartencoded-interface)
  - [TextStartPart (interface)](#textstartpart-interface)
  - [TextStartPartEncoded (interface)](#textstartpartencoded-interface)
  - [ToolApprovalRequestPart (interface)](#toolapprovalrequestpart-interface)
  - [ToolApprovalRequestPartEncoded (interface)](#toolapprovalrequestpartencoded-interface)
  - [ToolCallPart (interface)](#toolcallpart-interface)
  - [ToolCallPartEncoded (interface)](#toolcallpartencoded-interface)
  - [ToolParamsDeltaPart (interface)](#toolparamsdeltapart-interface)
  - [ToolParamsDeltaPartEncoded (interface)](#toolparamsdeltapartencoded-interface)
  - [ToolParamsEndPart (interface)](#toolparamsendpart-interface)
  - [ToolParamsEndPartEncoded (interface)](#toolparamsendpartencoded-interface)
  - [ToolParamsStartPart (interface)](#toolparamsstartpart-interface)
  - [ToolParamsStartPartEncoded (interface)](#toolparamsstartpartencoded-interface)
  - [ToolResultFailure (interface)](#toolresultfailure-interface)
  - [ToolResultPart (type alias)](#toolresultpart-type-alias)
  - [ToolResultPartEncoded (interface)](#toolresultpartencoded-interface)
  - [ToolResultSuccess (interface)](#toolresultsuccess-interface)
  - [UrlSourcePart (interface)](#urlsourcepart-interface)
  - [UrlSourcePartEncoded (interface)](#urlsourcepartencoded-interface)
  - [Usage (class)](#usage-class)
- [schemas](#schemas)
  - [AllParts](#allparts)
  - [DocumentSourcePart](#documentsourcepart)
  - [ErrorPart](#errorpart)
  - [FilePart](#filepart)
  - [FinishPart](#finishpart)
  - [HttpRequestDetails](#httprequestdetails)
  - [HttpResponseDetails](#httpresponsedetails)
  - [Part](#part)
  - [ProviderMetadata](#providermetadata)
  - [ReasoningDeltaPart](#reasoningdeltapart)
  - [ReasoningEndPart](#reasoningendpart)
  - [ReasoningPart](#reasoningpart)
  - [ReasoningStartPart](#reasoningstartpart)
  - [ResponseMetadataPart](#responsemetadatapart)
  - [StreamPart](#streampart)
  - [TextDeltaPart](#textdeltapart)
  - [TextEndPart](#textendpart)
  - [TextPart](#textpart)
  - [TextStartPart](#textstartpart)
  - [ToolApprovalRequestPart](#toolapprovalrequestpart-1)
  - [ToolCallPart](#toolcallpart-1)
  - [ToolParamsDeltaPart](#toolparamsdeltapart)
  - [ToolParamsEndPart](#toolparamsendpart)
  - [ToolParamsStartPart](#toolparamsstartpart)
  - [ToolResultPart](#toolresultpart-1)
  - [UrlSourcePart](#urlsourcepart)
- [utility types](#utility-types)
  - [ConstructorParams (type alias)](#constructorparams-type-alias)
  - [ToolCallParts (type alias)](#toolcallparts-type-alias)
  - [ToolResultParts (type alias)](#toolresultparts-type-alias)

---

# configuration

## DocumentSourcePartMetadata (interface)

Represents provider-specific metadata that can be associated with a
`DocumentSourcePart` through module augmentation.

**Signature**

```ts
export interface DocumentSourcePartMetadata extends ProviderMetadata {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L1972)

Since v4.0.0

## ErrorPartMetadata (interface)

Represents provider-specific metadata that can be associated with a
`ErrorPart` through module augmentation.

**Signature**

```ts
export interface ErrorPartMetadata extends ProviderMetadata {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L2557)

Since v4.0.0

## FilePartMetadata (interface)

Represents provider-specific metadata that can be associated with a
`FilePart` through module augmentation.

**Signature**

```ts
export interface FilePartMetadata extends ProviderMetadata {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L1874)

Since v4.0.0

## FinishPartMetadata (interface)

Represents provider-specific metadata that can be associated with a
`FinishPart` through module augmentation.

**Signature**

```ts
export interface FinishPartMetadata extends ProviderMetadata {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L2477)

Since v4.0.0

## ReasoningDeltaPartMetadata (interface)

Represents provider-specific metadata that can be associated with a
`ReasoningDeltaPart` through module augmentation.

**Signature**

```ts
export interface ReasoningDeltaPartMetadata extends ProviderMetadata {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L981)

Since v4.0.0

## ReasoningEndPartMetadata (interface)

Represents provider-specific metadata that can be associated with a
`ReasoningEndPart` through module augmentation.

**Signature**

```ts
export interface ReasoningEndPartMetadata extends ProviderMetadata {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L1041)

Since v4.0.0

## ReasoningPartMetadata (interface)

Represents provider-specific metadata that can be associated with a
`ReasoningPart` through module augmentation.

**Signature**

```ts
export interface ReasoningPartMetadata extends ProviderMetadata {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L855)

Since v4.0.0

## ReasoningStartPartMetadata (interface)

Represents provider-specific metadata that can be associated with a
`ReasoningStartPart` through module augmentation.

**Signature**

```ts
export interface ReasoningStartPartMetadata extends ProviderMetadata {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L914)

Since v4.0.0

## ResponseMetadataPartMetadata (interface)

Represents provider-specific metadata that can be associated with a
`ResponseMetadataPart` through module augmentation.

**Signature**

```ts
export interface ResponseMetadataPartMetadata extends ProviderMetadata {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L2265)

Since v4.0.0

## TextDeltaPartMetadata (interface)

Represents provider-specific metadata that can be associated with a
`TextDeltaPart` through module augmentation.

**Signature**

```ts
export interface TextDeltaPartMetadata extends ProviderMetadata {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L724)

Since v4.0.0

## TextEndPartMetadata (interface)

Represents provider-specific metadata that can be associated with a
`TextEndPart` through module augmentation.

**Signature**

```ts
export interface TextEndPartMetadata extends ProviderMetadata {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L784)

Since v4.0.0

## TextPartMetadata (interface)

Represents provider-specific metadata that can be associated with a
`TextPart` through module augmentation.

**Signature**

```ts
export interface TextPartMetadata extends ProviderMetadata {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L598)

Since v4.0.0

## TextStartPartMetadata (interface)

Represents provider-specific metadata that can be associated with a
`TextStartPart` through module augmentation.

**Signature**

```ts
export interface TextStartPartMetadata extends ProviderMetadata {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L657)

Since v4.0.0

## ToolApprovalRequestPartMetadata (interface)

Represents provider-specific metadata that can be associated with a
`ToolApprovalRequestPart` through module augmentation.

**Signature**

```ts
export interface ToolApprovalRequestPartMetadata extends ProviderMetadata {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L1778)

Since v4.0.0

## ToolCallPartMetadata (interface)

Represents provider-specific metadata that can be associated with a
`ToolCallPart` through module augmentation.

**Signature**

```ts
export interface ToolCallPartMetadata extends ProviderMetadata {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L1377)

Since v4.0.0

## ToolParamsDeltaPartMetadata (interface)

Represents provider-specific metadata that can be associated with a
`ToolParamsDeltaPart` through module augmentation.

**Signature**

```ts
export interface ToolParamsDeltaPartMetadata extends ProviderMetadata {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L1200)

Since v4.0.0

## ToolParamsEndPartMetadata (interface)

Represents provider-specific metadata that can be associated with a
`ToolParamsEndPart` through module augmentation.

**Signature**

```ts
export interface ToolParamsEndPartMetadata extends ProviderMetadata {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L1268)

Since v4.0.0

## ToolParamsStartPartMetadata (interface)

Represents provider-specific metadata that can be associated with a
`ToolParamsStartPart` through module augmentation.

**Signature**

```ts
export interface ToolParamsStartPartMetadata extends ProviderMetadata {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L1122)

Since v4.0.0

## ToolResultPartMetadata (interface)

Represents provider-specific metadata that can be associated with a
`ToolResultPart` through module augmentation.

**Signature**

```ts
export interface ToolResultPartMetadata extends ProviderMetadata {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L1590)

Since v4.0.0

## UrlSourcePartMetadata (interface)

Represents provider-specific metadata that can be associated with a
`UrlSourcePart` through module augmentation.

**Signature**

```ts
export interface UrlSourcePartMetadata extends ProviderMetadata {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L2077)

Since v4.0.0

# constructors

## makePart

Creates a new response content part of the specified type.

**Example** (Creating response content parts)

```ts
import { Response } from "effect/unstable/ai"

const textPart = Response.makePart("text", {
  text: "Hello, world!"
})

const toolCallPart = Response.makePart("tool-call", {
  id: "call_123",
  name: "get_weather",
  params: { city: "San Francisco" },
  providerExecuted: false
})
```

**Signature**

```ts
declare const makePart: <const Type extends AnyPart["type"]>(
  type: Type,
  params: Omit<Extract<AnyPart, { type: Type }>, typeof PartTypeId | "type" | "metadata"> & {
    readonly metadata?: Extract<AnyPart, { type: Type }>["metadata"] | undefined
  }
) => Extract<AnyPart, { type: Type }>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L514)

Since v4.0.0

## toolApprovalRequestPart

Constructs a new tool approval request part.

**Signature**

```ts
declare const toolApprovalRequestPart: (params: ConstructorParams<ToolApprovalRequestPart>) => ToolApprovalRequestPart
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L1810)

Since v4.0.0

## toolCallPart

Constructs a new tool call part.

**Signature**

```ts
declare const toolCallPart: <const Name extends string, Params>(
  params: ConstructorParams<ToolCallPart<Name, Params>>
) => ToolCallPart<Name, Params>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L1419)

Since v4.0.0

## toolResultPart

Constructs a new tool result part.

**Signature**

```ts
declare const toolResultPart: <const Params extends ConstructorParams<ToolResultPart<string, unknown, unknown>>>(
  params: Params
) => Params extends {
  readonly name: infer Name extends string
  readonly isFailure: false
  readonly result: infer Success
}
  ? ToolResultPart<Name, Success, never>
  : Params extends {
        readonly name: infer Name extends string
        readonly isFailure: true
        readonly result: infer Failure
      }
    ? ToolResultPart<Name, never, Failure>
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L1697)

Since v4.0.0

# guards

## isPart

Type guard to check if a value is a Response Part.

**Signature**

```ts
declare const isPart: (u: unknown) => u is AnyPart
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L34)

Since v4.0.0

# models

## AllParts (type alias)

Union type for all response parts with tool-specific typing.

**Signature**

```ts
type AllParts<Tools> =
  | TextPart
  | TextStartPart
  | TextDeltaPart
  | TextEndPart
  | ReasoningPart
  | ReasoningStartPart
  | ReasoningDeltaPart
  | ReasoningEndPart
  | ToolParamsStartPart
  | ToolParamsDeltaPart
  | ToolParamsEndPart
  | ToolCallParts<Tools>
  | ToolResultParts<Tools>
  | ToolApprovalRequestPart
  | FilePart
  | DocumentSourcePart
  | UrlSourcePart
  | ResponseMetadataPart
  | FinishPart
  | ErrorPart
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L98)

Since v4.0.0

## AllPartsEncoded (type alias)

Encoded representation of all response parts for serialization.

**Signature**

```ts
type AllPartsEncoded =
  | TextPartEncoded
  | TextStartPartEncoded
  | TextDeltaPartEncoded
  | TextEndPartEncoded
  | ReasoningPartEncoded
  | ReasoningStartPartEncoded
  | ReasoningDeltaPartEncoded
  | ReasoningEndPartEncoded
  | ToolParamsStartPartEncoded
  | ToolParamsDeltaPartEncoded
  | ToolParamsEndPartEncoded
  | ToolCallPartEncoded
  | ToolResultPartEncoded
  | ToolApprovalRequestPartEncoded
  | FilePartEncoded
  | DocumentSourcePartEncoded
  | UrlSourcePartEncoded
  | ResponseMetadataPartEncoded
  | FinishPartEncoded
  | ErrorPartEncoded
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L126)

Since v4.0.0

## AnyPart (type alias)

Union type representing all possible response content parts.

**Signature**

```ts
type AnyPart =
  | TextPart
  | TextStartPart
  | TextDeltaPart
  | TextEndPart
  | ReasoningPart
  | ReasoningStartPart
  | ReasoningDeltaPart
  | ReasoningEndPart
  | ToolParamsStartPart
  | ToolParamsDeltaPart
  | ToolParamsEndPart
  | ToolCallPart<any, any>
  | ToolResultPart<any, any, any>
  | ToolApprovalRequestPart
  | FilePart
  | DocumentSourcePart
  | UrlSourcePart
  | ResponseMetadataPart
  | FinishPart
  | ErrorPart
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L42)

Since v4.0.0

## AnyPartEncoded (type alias)

Encoded representation of all possible response content parts for serialization.

**Signature**

```ts
type AnyPartEncoded =
  | TextPartEncoded
  | TextStartPartEncoded
  | TextDeltaPartEncoded
  | TextEndPartEncoded
  | ReasoningPartEncoded
  | ReasoningStartPartEncoded
  | ReasoningDeltaPartEncoded
  | ReasoningEndPartEncoded
  | ToolParamsStartPartEncoded
  | ToolParamsDeltaPartEncoded
  | ToolParamsEndPartEncoded
  | ToolCallPartEncoded
  | ToolResultPartEncoded
  | ToolApprovalRequestPartEncoded
  | FilePartEncoded
  | DocumentSourcePartEncoded
  | UrlSourcePartEncoded
  | ResponseMetadataPartEncoded
  | FinishPartEncoded
  | ErrorPartEncoded
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L70)

Since v4.0.0

## BasePart (interface)

Base interface for all response content parts, including the type identifier
and optional metadata.

**Signature**

```ts
export interface BasePart<Type extends string, Metadata extends ProviderMetadata> {
  readonly [PartTypeId]: typeof PartTypeId
  /**
   * The type of this response part.
   */
  readonly type: Type
  /**
   * Optional provider-specific metadata for this part.
   */
  readonly metadata: Metadata
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L453)

Since v4.0.0

## BasePartEncoded (interface)

Base interface for encoded response content parts.

**Signature**

```ts
export interface BasePartEncoded<Type extends string, Metadata extends ProviderMetadata> {
  /**
   * The type of this response part.
   */
  readonly type: Type
  /**
   * Optional provider-specific metadata for this part.
   */
  readonly metadata?: Metadata | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L471)

Since v4.0.0

## BaseToolResult (interface)

The base fields of a tool result part.

**Signature**

```ts
export interface BaseToolResult<Name extends string> extends BasePart<"tool-result", ToolResultPartMetadata> {
  /**
   * Unique identifier matching the original tool call.
   */
  readonly id: string
  /**
   * Name of the tool being called, which corresponds to the name of the tool
   * in the `Toolkit` included with the request.
   */
  readonly name: Name
  /**
   * The encoded result for serialization purposes.
   */
  readonly encodedResult: unknown
  /**
   * Whether the tool was executed by the provider (true) or framework (false).
   */
  readonly providerExecuted: boolean
  /**
   * Whether this is a preliminary (intermediate) result.
   *
   * **Details**
   *
   * Preliminary results represent progress updates during streaming tool
   * execution. Only the final result (where `preliminary` is `false` or
   * `undefined`) should be used as the authoritative output.
   *
   * **Gotchas**
   *
   * Only applicable for framework-executed tools during streaming.
   */
  readonly preliminary: boolean
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L1433)

Since v4.0.0

## DocumentSourcePart (interface)

Response part representing a document source reference used in generating the
response.

**Signature**

```ts
export interface DocumentSourcePart extends BasePart<"source", DocumentSourcePartMetadata> {
  /**
   * Type discriminator for document sources.
   */
  readonly sourceType: "document"
  /**
   * Unique identifier for the document.
   */
  readonly id: string
  /**
   * MIME type of the document.
   */
  readonly mediaType: string
  /**
   * Display title of the document.
   */
  readonly title: string
  /**
   * Optional filename of the document.
   */
  readonly fileName?: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L1913)

Since v4.0.0

## DocumentSourcePartEncoded (interface)

Encoded representation of document source parts for serialization.

**Signature**

```ts
export interface DocumentSourcePartEncoded extends BasePartEncoded<"source", DocumentSourcePartMetadata> {
  /**
   * Type discriminator for document sources.
   */
  readonly sourceType: "document"
  /**
   * Unique identifier for the document.
   */
  readonly id: string
  /**
   * MIME type of the document.
   */
  readonly mediaType: string
  /**
   * Display title of the document.
   */
  readonly title: string
  /**
   * Optional filename of the document.
   */
  readonly fileName?: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L1942)

Since v4.0.0

## ErrorPart (interface)

Response part indicating that an error occurred generating the response.

**Example** (Creating an error part)

```ts
import { Response } from "effect/unstable/ai"

const errorPart: Response.ErrorPart = Response.makePart("error", {
  error: new Error("boom")
})
```

**Signature**

```ts
export interface ErrorPart extends BasePart<"error", ErrorPartMetadata> {
  readonly error: unknown
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L2536)

Since v4.0.0

## ErrorPartEncoded (interface)

Encoded representation of error parts for serialization.

**Signature**

```ts
export interface ErrorPartEncoded extends BasePartEncoded<"error", ErrorPartMetadata> {
  readonly error: unknown
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L2546)

Since v4.0.0

## FilePart (interface)

Response part representing a file attachment.

**Details**

Supports various file types including images, documents, and binary data.

**Example** (Creating a file part)

```ts
import { Response } from "effect/unstable/ai"

const imagePart: Response.FilePart = Response.makePart("file", {
  mediaType: "image/jpeg",
  data: new Uint8Array([1, 2, 3])
})
```

**Signature**

```ts
export interface FilePart extends BasePart<"file", FilePartMetadata> {
  /**
   * MIME type of the file (e.g., "image/jpeg", "application/pdf").
   */
  readonly mediaType: string
  /**
   * File data as a byte array.
   */
  readonly data: Uint8Array
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L1839)

Since v4.0.0

## FilePartEncoded (interface)

Encoded representation of file parts for serialization.

**Signature**

```ts
export interface FilePartEncoded extends BasePartEncoded<"file", FilePartMetadata> {
  /**
   * MIME type of the file (e.g., "image/jpeg", "application/pdf").
   */
  readonly mediaType: string
  /**
   * File data as a base64 string.
   */
  readonly data: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L1856)

Since v4.0.0

## FinishPart (interface)

Response part indicating the completion of a response generation.

**Example** (Creating a finish part)

```ts
import { Response } from "effect/unstable/ai"

const finishPart: Response.FinishPart = Response.makePart("finish", {
  reason: "stop",
  usage: new Response.Usage({
    inputTokens: {
      uncached: undefined,
      total: 50,
      cacheRead: undefined,
      cacheWrite: undefined
    },
    outputTokens: {
      total: 25,
      text: undefined,
      reasoning: undefined
    }
  }),
  response: undefined
})
```

**Signature**

```ts
export interface FinishPart extends BasePart<"finish", FinishPartMetadata> {
  /**
   * The reason why the model finished generating the response.
   */
  readonly reason: FinishReason
  /**
   * Token usage statistics for the request.
   */
  readonly usage: Usage
  /**
   * Optional HTTP response details from the AI provider.
   */
  readonly response: typeof HttpResponseDetails.Type | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L2434)

Since v4.0.0

## FinishPartEncoded (interface)

Encoded representation of finish parts for serialization.

**Signature**

```ts
export interface FinishPartEncoded extends BasePartEncoded<"finish", FinishPartMetadata> {
  /**
   * The reason why the model finished generating the response.
   */
  readonly reason: typeof FinishReason.Encoded
  /**
   * Token usage statistics for the request.
   */
  readonly usage: typeof Usage.Encoded
  /**
   * Optional HTTP response details from the AI provider.
   */
  readonly response?: typeof HttpResponseDetails.Encoded | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L2455)

Since v4.0.0

## FinishReason

Represents the reason why a model finished generation of a response.

**Details**

Possible finish reasons:

- `"stop"`: The model generated a stop sequence.
- `"length"`: The model exceeded its token budget.
- `"content-filter"`: The model generated content which violated a content filter.
- `"tool-calls"`: The model triggered a tool call.
- `"error"`: The model encountered an error.
- `"pause"`: The model requested to pause execution.
- `"other"`: The model stopped for a reason not supported by this protocol.
- `"unknown"`: The model did not specify a finish reason.

**Signature**

```ts
declare const FinishReason: Schema.Literals<
  ["stop", "length", "content-filter", "tool-calls", "error", "pause", "other", "unknown"]
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L2317)

Since v4.0.0

## FinishReason (type alias)

Type of the reason why a model stopped generating a response.

**Details**

Values include normal stops, token-limit stops, content filtering,
tool-call pauses, provider errors, and unknown provider-specific finish
reasons.

**Signature**

```ts
type FinishReason = typeof FinishReason.Type
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L2349)

Since v4.0.0

## Part (type alias)

A type for representing non-streaming response parts with tool-specific
typing.

**Signature**

```ts
type Part<Tools> =
  | TextPart
  | ReasoningPart
  | ToolCallParts<Tools>
  | ToolResultParts<Tools>
  | ToolApprovalRequestPart
  | FilePart
  | DocumentSourcePart
  | UrlSourcePart
  | ResponseMetadataPart
  | FinishPart
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L226)

Since v4.0.0

## PartEncoded (type alias)

Encoded representation of non-streaming response parts for serialization.

**Signature**

```ts
type PartEncoded =
  | TextPartEncoded
  | ReasoningPartEncoded
  | ReasoningDeltaPartEncoded
  | ReasoningEndPartEncoded
  | ToolCallPartEncoded
  | ToolResultPartEncoded
  | ToolApprovalRequestPartEncoded
  | FilePartEncoded
  | DocumentSourcePartEncoded
  | UrlSourcePartEncoded
  | ResponseMetadataPartEncoded
  | FinishPartEncoded
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L244)

Since v4.0.0

## ProviderMetadata (type alias)

Type of provider-specific metadata attached to response parts, keyed by
provider-specific names with JSON or `null` values.

**Signature**

```ts
type ProviderMetadata = typeof ProviderMetadata.Type
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L444)

Since v4.0.0

## ReasoningDeltaPart (interface)

Response part containing incremental reasoning content to be added to the
existing chunk of reasoning text with the same unique identifier.

**Signature**

```ts
export interface ReasoningDeltaPart extends BasePart<"reasoning-delta", ReasoningDeltaPartMetadata> {
  /**
   * Unique identifier matching the corresponding reasoning chunk.
   */
  readonly id: string
  /**
   * The incremental reasoning content to add.
   */
  readonly delta: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L946)

Since v4.0.0

## ReasoningDeltaPartEncoded (interface)

Encoded representation of reasoning delta parts for serialization.

**Signature**

```ts
export interface ReasoningDeltaPartEncoded extends BasePartEncoded<"reasoning-delta", ReasoningDeltaPartMetadata> {
  /**
   * Unique identifier matching the corresponding reasoning chunk.
   */
  readonly id: string
  /**
   * The incremental reasoning content to add.
   */
  readonly delta: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L963)

Since v4.0.0

## ReasoningEndPart (interface)

Response part indicating the completion of a streaming reasoning chunk.

**Signature**

```ts
export interface ReasoningEndPart extends BasePart<"reasoning-end", ReasoningEndPartMetadata> {
  /**
   * Unique identifier matching the corresponding reasoning chunk.
   */
  readonly id: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L1014)

Since v4.0.0

## ReasoningEndPartEncoded (interface)

Encoded representation of reasoning end parts for serialization.

**Signature**

```ts
export interface ReasoningEndPartEncoded extends BasePartEncoded<"reasoning-end", ReasoningEndPartMetadata> {
  /**
   * Unique identifier matching the corresponding reasoning chunk.
   */
  readonly id: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L1027)

Since v4.0.0

## ReasoningPart (interface)

Response part carrying provider-supplied reasoning text, such as an exposed
reasoning summary or explanation. Do not assume it contains hidden
chain-of-thought.

**Example** (Creating a reasoning part)

```ts
import { Response } from "effect/unstable/ai"

const reasoningPart: Response.ReasoningPart = Response.makePart("reasoning", {
  text: "Let me think step by step: First I need to analyze the user's question..."
})
```

**Signature**

```ts
export interface ReasoningPart extends BasePart<"reasoning", ReasoningPartMetadata> {
  /**
   * The reasoning or thought process text.
   */
  readonly text: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L828)

Since v4.0.0

## ReasoningPartEncoded (interface)

Encoded representation of reasoning parts for serialization.

**Signature**

```ts
export interface ReasoningPartEncoded extends BasePartEncoded<"reasoning", ReasoningPartMetadata> {
  /**
   * The reasoning or thought process text.
   */
  readonly text: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L841)

Since v4.0.0

## ReasoningStartPart (interface)

Response part indicating the start of streaming reasoning content with a
unique reasoning chunk identifier.

**Signature**

```ts
export interface ReasoningStartPart extends BasePart<"reasoning-start", ReasoningStartPartMetadata> {
  /**
   * Unique identifier for this reasoning chunk.
   */
  readonly id: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L887)

Since v4.0.0

## ReasoningStartPartEncoded (interface)

Encoded representation of reasoning start parts for serialization.

**Signature**

```ts
export interface ReasoningStartPartEncoded extends BasePartEncoded<"reasoning-start", ReasoningStartPartMetadata> {
  /**
   * Unique identifier for this reasoning stream.
   */
  readonly id: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L900)

Since v4.0.0

## ResponseMetadataPart (interface)

Response part containing metadata about the large language model response.

**Example** (Creating a metadata part)

```ts
import { DateTime } from "effect"
import { Response } from "effect/unstable/ai"

const metadataPart: Response.ResponseMetadataPart = Response.makePart("response-metadata", {
  id: "resp_123",
  modelId: "gpt-4",
  timestamp: DateTime.nowUnsafe(),
  request: undefined
})
```

**Signature**

```ts
export interface ResponseMetadataPart extends BasePart<"response-metadata", ResponseMetadataPartMetadata> {
  /**
   * Optional unique identifier for this specific response.
   */
  readonly id: string | undefined
  /**
   * Optional identifier of the AI model that generated the response.
   */
  readonly modelId: string | undefined
  /**
   * Optional timestamp when the response was generated.
   */
  readonly timestamp: DateTime.Utc | undefined
  /**
   * Optional HTTP request details for the request made to the AI provider.
   */
  readonly request: typeof HttpRequestDetails.Type | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L2212)

Since v4.0.0

## ResponseMetadataPartEncoded (interface)

Encoded representation of response metadata parts for serialization.

**Signature**

```ts
export interface ResponseMetadataPartEncoded extends BasePartEncoded<
  "response-metadata",
  ResponseMetadataPartMetadata
> {
  /**
   * Optional unique identifier for this specific response.
   */
  readonly id?: string | undefined
  /**
   * Optional identifier of the AI model that generated the response.
   */
  readonly modelId?: string | undefined
  /**
   * Optional timestamp when the response was generated.
   */
  readonly timestamp?: string | undefined
  /**
   * Optional HTTP request details for the request made to the AI provider.
   */
  readonly request?: typeof HttpRequestDetails.Encoded | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L2237)

Since v4.0.0

## StreamPart (type alias)

A type for representing streaming response parts with tool-specific typing.

**Signature**

```ts
type StreamPart<Tools> =
  | TextStartPart
  | TextDeltaPart
  | TextEndPart
  | ReasoningStartPart
  | ReasoningDeltaPart
  | ReasoningEndPart
  | ToolParamsStartPart
  | ToolParamsDeltaPart
  | ToolParamsEndPart
  | ToolCallParts<Tools>
  | ToolResultParts<Tools>
  | ToolApprovalRequestPart
  | FilePart
  | DocumentSourcePart
  | UrlSourcePart
  | ResponseMetadataPart
  | FinishPart
  | ErrorPart
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L304)

Since v4.0.0

## StreamPartEncoded (type alias)

Encoded representation of streaming response parts for serialization.

**Signature**

```ts
type StreamPartEncoded =
  | TextStartPartEncoded
  | TextDeltaPartEncoded
  | TextEndPartEncoded
  | ReasoningStartPartEncoded
  | ReasoningDeltaPartEncoded
  | ReasoningEndPartEncoded
  | ToolParamsStartPartEncoded
  | ToolParamsDeltaPartEncoded
  | ToolParamsEndPartEncoded
  | ToolCallPartEncoded
  | ToolResultPartEncoded
  | ToolApprovalRequestPartEncoded
  | FilePartEncoded
  | DocumentSourcePartEncoded
  | UrlSourcePartEncoded
  | ResponseMetadataPartEncoded
  | FinishPartEncoded
  | ErrorPartEncoded
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L330)

Since v4.0.0

## TextDeltaPart (interface)

Response part containing incremental text content to be added to the existing
text chunk with the same unique identifier.

**Signature**

```ts
export interface TextDeltaPart extends BasePart<"text-delta", TextDeltaPartMetadata> {
  /**
   * Unique identifier matching the corresponding text chunk.
   */
  readonly id: string
  /**
   * The incremental text content to add.
   */
  readonly delta: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L689)

Since v4.0.0

## TextDeltaPartEncoded (interface)

Encoded representation of text delta parts for serialization.

**Signature**

```ts
export interface TextDeltaPartEncoded extends BasePartEncoded<"text-delta", TextDeltaPartMetadata> {
  /**
   * Unique identifier matching the corresponding text chunk.
   */
  readonly id: string
  /**
   * The incremental text content to add.
   */
  readonly delta: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L706)

Since v4.0.0

## TextEndPart (interface)

Response part indicating the completion of a streaming text chunk.

**Signature**

```ts
export interface TextEndPart extends BasePart<"text-end", TextEndPartMetadata> {
  /**
   * Unique identifier matching the corresponding text chunk.
   */
  readonly id: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L757)

Since v4.0.0

## TextEndPartEncoded (interface)

Encoded representation of text end parts for serialization.

**Signature**

```ts
export interface TextEndPartEncoded extends BasePartEncoded<"text-end", TextEndPartMetadata> {
  /**
   * Unique identifier matching the corresponding text chunk.
   */
  readonly id: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L770)

Since v4.0.0

## TextPart (interface)

Response part representing plain text content.

**Example** (Creating a text part)

```ts
import { Response } from "effect/unstable/ai"

const textPart: Response.TextPart = Response.makePart("text", {
  text: "The answer to your question is 42."
})
```

**Signature**

```ts
export interface TextPart extends BasePart<"text", TextPartMetadata> {
  /**
   * The text content.
   */
  readonly text: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L571)

Since v4.0.0

## TextPartEncoded (interface)

Encoded representation of text parts for serialization.

**Signature**

```ts
export interface TextPartEncoded extends BasePartEncoded<"text", TextPartMetadata> {
  /**
   * The text content.
   */
  readonly text: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L584)

Since v4.0.0

## TextStartPart (interface)

Response part indicating the start of streaming text content with a unique
text chunk identifier.

**Signature**

```ts
export interface TextStartPart extends BasePart<"text-start", TextStartPartMetadata> {
  /**
   * Unique identifier for this text chunk.
   */
  readonly id: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L630)

Since v4.0.0

## TextStartPartEncoded (interface)

Encoded representation of text start parts for serialization.

**Signature**

```ts
export interface TextStartPartEncoded extends BasePartEncoded<"text-start", TextStartPartMetadata> {
  /**
   * Unique identifier for this text chunk.
   */
  readonly id: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L643)

Since v4.0.0

## ToolApprovalRequestPart (interface)

Response part representing a tool approval request.

**Details**

Emitted when a tool requires user approval before execution. The framework
checks the tool's `needsApproval` property and emits this part instead of
executing the tool when approval is required.

**Example** (Creating an approval request part)

```ts
import { Response } from "effect/unstable/ai"

const approvalRequest: Response.ToolApprovalRequestPart = Response.makePart("tool-approval-request", {
  approvalId: "approval_123",
  toolCallId: "call_456"
})
```

**Signature**

```ts
export interface ToolApprovalRequestPart extends BasePart<"tool-approval-request", ToolApprovalRequestPartMetadata> {
  /**
   * Unique identifier for this approval flow.
   */
  readonly approvalId: string
  /**
   * The tool call ID requiring approval.
   */
  readonly toolCallId: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L1741)

Since v4.0.0

## ToolApprovalRequestPartEncoded (interface)

Encoded representation of tool approval request parts for serialization.

**Signature**

```ts
export interface ToolApprovalRequestPartEncoded extends BasePartEncoded<
  "tool-approval-request",
  ToolApprovalRequestPartMetadata
> {
  /**
   * Unique identifier for this approval flow.
   */
  readonly approvalId: string
  /**
   * The tool call ID requiring approval.
   */
  readonly toolCallId: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L1758)

Since v4.0.0

## ToolCallPart (interface)

Response part representing a tool call request.

**Example** (Creating a tool call part)

```ts
import { Schema } from "effect"
import { Response } from "effect/unstable/ai"

const weatherParams = Schema.Struct({
  city: Schema.String,
  units: Schema.optional(Schema.Literals(["celsius", "fahrenheit"]))
})

const toolCallPart: Response.ToolCallPart<
  "get_weather",
  {
    readonly city: string
    readonly units?: "celsius" | "fahrenheit"
  }
> = Response.makePart("tool-call", {
  id: "call_123",
  name: "get_weather",
  params: { city: "San Francisco", units: "celsius" },
  providerExecuted: false
})
```

**Signature**

```ts
export interface ToolCallPart<Name extends string, Params> extends BasePart<"tool-call", ToolCallPartMetadata> {
  /**
   * Unique identifier for this tool call.
   */
  readonly id: string
  /**
   * Name of the tool being called, which corresponds to the name of the tool
   * in the `Toolkit` included with the request.
   */
  readonly name: Name
  /**
   * Parameters to pass to the tool.
   */
  readonly params: Params
  /**
   * Whether the tool was executed by the provider (true) or framework (false).
   */
  readonly providerExecuted: boolean
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L1324)

Since v4.0.0

## ToolCallPartEncoded (interface)

Encoded representation of tool call parts for serialization.

**Signature**

```ts
export interface ToolCallPartEncoded extends BasePartEncoded<"tool-call", ToolCallPartMetadata> {
  /**
   * Unique identifier for this tool call.
   */
  readonly id: string
  /**
   * Name of the tool being called, which corresponds to the name of the tool
   * in the `Toolkit` included with the request.
   */
  readonly name: string
  /**
   * Parameters to pass to the tool.
   */
  readonly params: unknown
  /**
   * Whether the tool was executed by the provider (true) or framework (false).
   */
  readonly providerExecuted?: boolean | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L1350)

Since v4.0.0

## ToolParamsDeltaPart (interface)

Response part containing incremental tool parameter content.

**Details**

Represents a chunk of tool parameters being streamed, containing the
incremental JSON content that forms the tool parameters.

**Signature**

```ts
export interface ToolParamsDeltaPart extends BasePart<"tool-params-delta", ToolParamsDeltaPartMetadata> {
  /**
   * Unique identifier matching the corresponding tool parameter chunk.
   */
  readonly id: string
  /**
   * The incremental parameter content (typically JSON fragment) to add.
   */
  readonly delta: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L1165)

Since v4.0.0

## ToolParamsDeltaPartEncoded (interface)

Encoded representation of tool params delta parts for serialization.

**Signature**

```ts
export interface ToolParamsDeltaPartEncoded extends BasePartEncoded<"tool-params-delta", ToolParamsDeltaPartMetadata> {
  /**
   * Unique identifier matching the corresponding tool parameter chunk.
   */
  readonly id: string
  /**
   * The incremental parameter content (typically JSON fragment) to add.
   */
  readonly delta: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L1182)

Since v4.0.0

## ToolParamsEndPart (interface)

Response part indicating the end of streaming tool parameters.

**Details**

Marks the completion of a tool parameter stream, indicating that all
parameter data has been sent and the tool call is ready to be executed.

**Signature**

```ts
export interface ToolParamsEndPart extends BasePart<"tool-params-end", ToolParamsEndPartMetadata> {
  /**
   * Unique identifier matching the corresponding tool parameter chunk.
   */
  readonly id: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L1241)

Since v4.0.0

## ToolParamsEndPartEncoded (interface)

Encoded representation of tool params end parts for serialization.

**Signature**

```ts
export interface ToolParamsEndPartEncoded extends BasePartEncoded<"tool-params-end", ToolParamsEndPartMetadata> {
  /**
   * Unique identifier matching the corresponding tool parameter stream.
   */
  readonly id: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L1254)

Since v4.0.0

## ToolParamsStartPart (interface)

Response part indicating the start of streaming tool parameters.

**Details**

Marks the beginning of tool parameter streaming with metadata about the tool
call.

**Signature**

```ts
export interface ToolParamsStartPart extends BasePart<"tool-params-start", ToolParamsStartPartMetadata> {
  /**
   * Unique identifier for this tool parameter chunk.
   */
  readonly id: string
  /**
   * Name of the tool being called, which corresponds to the name of the tool
   * in the `Toolkit` included with the request.
   */
  readonly name: string
  /**
   * Whether the tool was executed by the provider (true) or framework (false).
   */
  readonly providerExecuted: boolean
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L1077)

Since v4.0.0

## ToolParamsStartPartEncoded (interface)

Encoded representation of tool params start parts for serialization.

**Signature**

```ts
export interface ToolParamsStartPartEncoded extends BasePartEncoded<"tool-params-start", ToolParamsStartPartMetadata> {
  /**
   * Unique identifier for this tool parameter chunk.
   */
  readonly id: string
  /**
   * Name of the tool being called, which corresponds to the name of the tool
   * in the `Toolkit` included with the request.
   */
  readonly name: string
  /**
   * Whether the tool was executed by the provider (true) or framework (false).
   */
  readonly providerExecuted?: boolean
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L1099)

Since v4.0.0

## ToolResultFailure (interface)

Represents a failed tool call result.

**Signature**

```ts
export interface ToolResultFailure<Name extends string, Failure> extends BaseToolResult<Name> {
  /**
   * The decoded failure returned by the tool execution.
   */
  readonly result: Failure
  /**
   * Whether or not the result of executing the tool call handler was an error.
   */
  readonly isFailure: true
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L1490)

Since v4.0.0

## ToolResultPart (type alias)

Response part representing the result of a tool call.

**Example** (Creating a tool result part)

```ts
import { Response } from "effect/unstable/ai"

interface WeatherData {
  temperature: number
  condition: string
  humidity: number
}

const toolResultPart: Response.ToolResultPart<"get_weather", WeatherData, never> = Response.toolResultPart({
  id: "call_123",
  name: "get_weather",
  isFailure: false,
  result: {
    temperature: 22,
    condition: "sunny",
    humidity: 65
  },
  encodedResult: {
    temperature: 22,
    condition: "sunny",
    humidity: 65
  },
  providerExecuted: false,
  preliminary: false
})
```

**Signature**

```ts
type ToolResultPart<Name, Success, Failure> = ToolResultSuccess<Name, Success> | ToolResultFailure<Name, Failure>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L1541)

Since v4.0.0

## ToolResultPartEncoded (interface)

Encoded representation of tool result parts for serialization.

**Signature**

```ts
export interface ToolResultPartEncoded extends BasePartEncoded<"tool-result", ToolResultPartMetadata> {
  /**
   * Unique identifier matching the original tool call.
   */
  readonly id: string
  /**
   * Name of the tool being called, which corresponds to the name of the tool
   * in the `Toolkit` included with the request.
   */
  readonly name: string
  /**
   * The result returned by the tool execution.
   */
  readonly result: unknown
  /**
   * Whether or not the result of executing the tool call handler was an error.
   */
  readonly isFailure: boolean
  /**
   * Whether the tool was executed by the provider (true) or framework (false).
   */
  readonly providerExecuted?: boolean | undefined
  /**
   * Whether this is a preliminary (intermediate) result.
   *
   * **Gotchas**
   *
   * Only applicable for framework-executed tools during streaming.
   */
  readonly preliminary?: boolean | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L1551)

Since v4.0.0

## ToolResultSuccess (interface)

Represents a successful tool call result.

**Signature**

```ts
export interface ToolResultSuccess<Name extends string, Success> extends BaseToolResult<Name> {
  /**
   * The decoded success returned by the tool execution.
   */
  readonly result: Success
  /**
   * Whether or not the result of executing the tool call handler was an error.
   */
  readonly isFailure: false
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L1473)

Since v4.0.0

## UrlSourcePart (interface)

Response part representing a URL source reference used in generating the
response.

**Signature**

```ts
export interface UrlSourcePart extends BasePart<"source", UrlSourcePartMetadata> {
  /**
   * Type discriminator for URL sources.
   */
  readonly sourceType: "url"
  /**
   * Unique identifier for the URL.
   */
  readonly id: string
  /**
   * The URL that was referenced.
   */
  readonly url: URL
  /**
   * Display title of the URL content.
   */
  readonly title: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L2026)

Since v4.0.0

## UrlSourcePartEncoded (interface)

Encoded representation of URL source parts for serialization.

**Signature**

```ts
export interface UrlSourcePartEncoded extends BasePartEncoded<"source", UrlSourcePartMetadata> {
  /**
   * Type discriminator for URL sources.
   */
  readonly sourceType: "url"
  /**
   * Unique identifier for the URL.
   */
  readonly id: string
  /**
   * The URL that was referenced as a string.
   */
  readonly url: string
  /**
   * Display title of the URL content.
   */
  readonly title: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L2051)

Since v4.0.0

## Usage (class)

Represents usage information for a request to a large language model provider.

**Details**

If the model provider returns additional usage information than what is
specified here, you can generally find that information under the provider
metadata of the finish part of the response.

**Signature**

```ts
declare class Usage
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L2363)

Since v4.0.0

# schemas

## AllParts

Creates a Schema for all response parts based on a toolkit.

**Details**

Generates a schema that includes all possible response parts, with tool call
and tool result parts dynamically created based on the provided toolkit.

**Example** (Building a response parts schema)

```ts
import { Schema } from "effect"
import { Response, Tool, Toolkit } from "effect/unstable/ai"

const myToolkit = Toolkit.make(
  Tool.make("GetWeather", {
    parameters: Schema.Struct({ city: Schema.String }),
    success: Schema.Struct({ temperature: Schema.Number })
  })
)

const allPartsSchema = Response.AllParts(myToolkit)
```

**Signature**

```ts
declare const AllParts: <T extends Toolkit.Any | Toolkit.WithHandler<any>>(
  toolkit: T
) => Schema.Codec<
  AllParts<T extends Toolkit.Any ? Toolkit.Tools<T> : Toolkit.WithHandlerTools<T>>,
  AllPartsEncoded,
  Tool.ResultDecodingServices<Toolkit.Tools<T>[keyof Toolkit.Tools<T>]>,
  Tool.ResultEncodingServices<Toolkit.Tools<T>[keyof Toolkit.Tools<T>]>
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L175)

Since v4.0.0

## DocumentSourcePart

Schema for validation and encoding of document source parts.

**When to use**

Use to validate or encode document source references returned as response
content parts.

**Details**

Validates `type: "source"`, `sourceType: "document"`, required `id`,
`mediaType`, and `title`, optional `fileName`, and the metadata fields
inherited from response parts.

**See**

- `UrlSourcePart` for URL source references
- `DocumentSourcePartEncoded` for the encoded document source representation

**Signature**

```ts
declare const DocumentSourcePart: Schema.Struct<{
  readonly type: Schema.tag<"source">
  readonly sourceType: Schema.tag<"document">
  readonly id: Schema.String
  readonly mediaType: Schema.String
  readonly title: Schema.String
  readonly fileName: Schema.optionalKey<Schema.String>
  readonly "~effect/ai/Content/Part": Schema.withDecodingDefaultKey<Schema.tag<"~effect/ai/Content/Part">>
  readonly metadata: Schema.withDecodingDefault<Schema.$Record<Schema.String, Schema.Codec<Schema.Json>>>
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L1994)

Since v4.0.0

## ErrorPart

Schema for validation and encoding of error parts.

**Details**

Validates and encodes error parts with `type: "error"` and an `error` payload
kept as `unknown`.

**Gotchas**

The decoded `error` value is not guaranteed to be an `Error`; narrow it before
reading `Error`-specific fields.

**Signature**

```ts
declare const ErrorPart: Schema.Struct<{
  readonly type: Schema.tag<"error">
  readonly error: Schema.Unknown
  readonly "~effect/ai/Content/Part": Schema.withDecodingDefaultKey<Schema.tag<"~effect/ai/Content/Part">>
  readonly metadata: Schema.withDecodingDefault<Schema.$Record<Schema.String, Schema.Codec<Schema.Json>>>
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L2575)

Since v4.0.0

## FilePart

Schema for validation and encoding of file parts.

**Details**

Decoded `data` is a `Uint8Array`; encoded `data` is a base64 string through
`Schema.Uint8ArrayFromBase64`.

**Signature**

```ts
declare const FilePart: Schema.Struct<{
  readonly type: Schema.tag<"file">
  readonly mediaType: Schema.String
  readonly data: Schema.Uint8ArrayFromBase64
  readonly "~effect/ai/Content/Part": Schema.withDecodingDefaultKey<Schema.tag<"~effect/ai/Content/Part">>
  readonly metadata: Schema.withDecodingDefault<Schema.$Record<Schema.String, Schema.Codec<Schema.Json>>>
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L1887)

Since v4.0.0

## FinishPart

Schema for finish response parts.

**Details**

Validates `type: "finish"`, `reason` through `FinishReason`, `usage`
through `Usage`, and optional provider HTTP response details.

**Signature**

```ts
declare const FinishPart: Schema.Struct<{
  readonly type: Schema.tag<"finish">
  readonly reason: Schema.Literals<
    ["stop", "length", "content-filter", "tool-calls", "error", "pause", "other", "unknown"]
  >
  readonly usage: typeof Usage
  readonly response: Schema.UndefinedOr<typeof HttpResponseDetails>
  readonly "~effect/ai/Content/Part": Schema.withDecodingDefaultKey<Schema.tag<"~effect/ai/Content/Part">>
  readonly metadata: Schema.withDecodingDefault<Schema.$Record<Schema.String, Schema.Codec<Schema.Json>>>
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L2490)

Since v4.0.0

## HttpRequestDetails

Schema for HTTP request details associated with an AI response.

**Details**

Captures comprehensive information about the HTTP request made to the
AI provider, enabling inspection of request metadata for debugging and
observability purposes.

**Example** (Describing an HTTP request)

```ts
import type { Response } from "effect/unstable/ai"

const requestDetails: typeof Response.HttpRequestDetails.Type = {
  method: "POST",
  url: "https://api.openai.com/v1/responses",
  urlParams: [],
  hash: undefined,
  headers: { "Content-Type": "application/json" }
}
```

**Signature**

```ts
declare const HttpRequestDetails: Schema.Struct<{
  readonly method: Schema.Literals<readonly ["GET", "POST", "PATCH", "PUT", "DELETE", "HEAD", "OPTIONS", "TRACE"]>
  readonly url: Schema.String
  readonly urlParams: Schema.$Array<Schema.Tuple<readonly [Schema.String, Schema.String]>>
  readonly hash: Schema.UndefinedOr<Schema.String>
  readonly headers: Schema.$Record<
    Schema.String,
    Schema.Union<readonly [Schema.String, Schema.Redacted<Schema.String>]>
  >
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L2134)

Since v4.0.0

## HttpResponseDetails

Schema for HTTP response details associated with an AI response.

**Details**

Captures essential information about the HTTP response received from
the AI provider, including status codes and headers for debugging and
observability purposes.

**Example** (Describing an HTTP response)

```ts
import type { Response } from "effect/unstable/ai"

const responseDetails: typeof Response.HttpResponseDetails.Type = {
  status: 200,
  headers: {
    "Content-Type": "application/json",
    "X-Request-Id": "req_abc123"
  }
}
```

**Signature**

```ts
declare const HttpResponseDetails: Schema.Struct<{
  readonly status: Schema.Number
  readonly headers: Schema.$Record<
    Schema.String,
    Schema.Union<readonly [Schema.String, Schema.Redacted<Schema.String>]>
  >
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L2174)

Since v4.0.0

## Part

Creates a Schema for non-streaming response parts based on a toolkit.

**Signature**

```ts
declare const Part: <T extends Toolkit.Any | Toolkit.WithHandler<any>>(
  toolkit: T
) => Schema.Codec<
  Part<T extends Toolkit.Any ? Toolkit.Tools<T> : Toolkit.WithHandlerTools<T>>,
  PartEncoded,
  Tool.ResultDecodingServices<Toolkit.Tools<T>[keyof Toolkit.Tools<T>]>,
  Tool.ResultEncodingServices<Toolkit.Tools<T>[keyof Toolkit.Tools<T>]>
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L264)

Since v4.0.0

## ProviderMetadata

Schema for provider-specific metadata attached to response parts,
represented as a record from provider-specific keys to JSON values or `null`.

**Signature**

```ts
declare const ProviderMetadata: Schema.$Record<
  Schema.String,
  Schema.NullOr<Schema.Codec<Schema.Json, Schema.Json, never, never>>
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L432)

Since v4.0.0

## ReasoningDeltaPart

Schema for validation and encoding of reasoning delta parts.

**Signature**

```ts
declare const ReasoningDeltaPart: Schema.Struct<{
  readonly type: Schema.tag<"reasoning-delta">
  readonly id: Schema.String
  readonly delta: Schema.String
  readonly "~effect/ai/Content/Part": Schema.withDecodingDefaultKey<Schema.tag<"~effect/ai/Content/Part">>
  readonly metadata: Schema.withDecodingDefault<Schema.$Record<Schema.String, Schema.Codec<Schema.Json>>>
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L989)

Since v4.0.0

## ReasoningEndPart

Schema for validation and encoding of reasoning end parts.

**Signature**

```ts
declare const ReasoningEndPart: Schema.Struct<{
  readonly type: Schema.tag<"reasoning-end">
  readonly id: Schema.String
  readonly "~effect/ai/Content/Part": Schema.withDecodingDefaultKey<Schema.tag<"~effect/ai/Content/Part">>
  readonly metadata: Schema.withDecodingDefault<Schema.$Record<Schema.String, Schema.Codec<Schema.Json>>>
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L1049)

Since v4.0.0

## ReasoningPart

Schema for validation and encoding of reasoning parts.

**Signature**

```ts
declare const ReasoningPart: Schema.Struct<{
  readonly type: Schema.tag<"reasoning">
  readonly text: Schema.String
  readonly "~effect/ai/Content/Part": Schema.withDecodingDefaultKey<Schema.tag<"~effect/ai/Content/Part">>
  readonly metadata: Schema.withDecodingDefault<Schema.$Record<Schema.String, Schema.Codec<Schema.Json>>>
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L863)

Since v4.0.0

## ReasoningStartPart

Schema for validation and encoding of reasoning start parts.

**Signature**

```ts
declare const ReasoningStartPart: Schema.Struct<{
  readonly type: Schema.tag<"reasoning-start">
  readonly id: Schema.String
  readonly "~effect/ai/Content/Part": Schema.withDecodingDefaultKey<Schema.tag<"~effect/ai/Content/Part">>
  readonly metadata: Schema.withDecodingDefault<Schema.$Record<Schema.String, Schema.Codec<Schema.Json>>>
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L922)

Since v4.0.0

## ResponseMetadataPart

Schema for validation and encoding of response metadata parts.

**Signature**

```ts
declare const ResponseMetadataPart: Schema.Struct<{
  readonly type: Schema.tag<"response-metadata">
  readonly id: Schema.UndefinedOr<Schema.String>
  readonly modelId: Schema.UndefinedOr<Schema.String>
  readonly timestamp: Schema.UndefinedOr<Schema.DateTimeUtcFromString>
  readonly request: Schema.UndefinedOr<typeof HttpRequestDetails>
  readonly "~effect/ai/Content/Part": Schema.withDecodingDefaultKey<Schema.tag<"~effect/ai/Content/Part">>
  readonly metadata: Schema.withDecodingDefault<Schema.$Record<Schema.String, Schema.Codec<Schema.Json>>>
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L2273)

Since v4.0.0

## StreamPart

Creates a Schema for streaming response parts based on a toolkit.

**Signature**

```ts
declare const StreamPart: <T extends Toolkit.Any | Toolkit.WithHandler<any>>(
  toolkit: T
) => Schema.Codec<
  StreamPart<T extends Toolkit.Any ? Toolkit.Tools<T> : Toolkit.WithHandlerTools<T>>,
  StreamPartEncoded,
  Tool.ResultDecodingServices<Toolkit.Tools<T>[keyof Toolkit.Tools<T>]>,
  Tool.ResultEncodingServices<Toolkit.Tools<T>[keyof Toolkit.Tools<T>]>
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L356)

Since v4.0.0

## TextDeltaPart

Schema for validation and encoding of text delta parts.

**Signature**

```ts
declare const TextDeltaPart: Schema.Struct<{
  readonly type: Schema.tag<"text-delta">
  readonly id: Schema.String
  readonly delta: Schema.String
  readonly "~effect/ai/Content/Part": Schema.withDecodingDefaultKey<Schema.tag<"~effect/ai/Content/Part">>
  readonly metadata: Schema.withDecodingDefault<Schema.$Record<Schema.String, Schema.Codec<Schema.Json>>>
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L732)

Since v4.0.0

## TextEndPart

Schema for validation and encoding of text end parts.

**Signature**

```ts
declare const TextEndPart: Schema.Struct<{
  readonly type: Schema.tag<"text-end">
  readonly id: Schema.String
  readonly "~effect/ai/Content/Part": Schema.withDecodingDefaultKey<Schema.tag<"~effect/ai/Content/Part">>
  readonly metadata: Schema.withDecodingDefault<Schema.$Record<Schema.String, Schema.Codec<Schema.Json>>>
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L792)

Since v4.0.0

## TextPart

Schema for validation and encoding of text parts.

**Signature**

```ts
declare const TextPart: Schema.Struct<{
  readonly type: Schema.tag<"text">
  readonly text: Schema.String
  readonly "~effect/ai/Content/Part": Schema.withDecodingDefaultKey<Schema.tag<"~effect/ai/Content/Part">>
  readonly metadata: Schema.withDecodingDefault<Schema.$Record<Schema.String, Schema.Codec<Schema.Json>>>
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L606)

Since v4.0.0

## TextStartPart

Schema for validation and encoding of text start parts.

**Signature**

```ts
declare const TextStartPart: Schema.Struct<{
  readonly type: Schema.tag<"text-start">
  readonly id: Schema.String
  readonly "~effect/ai/Content/Part": Schema.withDecodingDefaultKey<Schema.tag<"~effect/ai/Content/Part">>
  readonly metadata: Schema.withDecodingDefault<Schema.$Record<Schema.String, Schema.Codec<Schema.Json>>>
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L665)

Since v4.0.0

## ToolApprovalRequestPart

Schema for validation and encoding of tool approval request parts.

**Signature**

```ts
declare const ToolApprovalRequestPart: Schema.Struct<{
  readonly type: Schema.tag<"tool-approval-request">
  readonly approvalId: Schema.String
  readonly toolCallId: Schema.String
  readonly "~effect/ai/Content/Part": Schema.withDecodingDefaultKey<Schema.tag<"~effect/ai/Content/Part">>
  readonly metadata: Schema.withDecodingDefault<Schema.$Record<Schema.String, Schema.Codec<Schema.Json>>>
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L1786)

Since v4.0.0

## ToolCallPart

Creates a Schema for tool call parts with specific tool name and parameters.

**Signature**

```ts
declare const ToolCallPart: <const Name extends string, Params extends Schema.Constraint>(
  name: Name,
  params: Params
) => Schema.Struct<{
  readonly type: Schema.Literal<"tool-call">
  readonly id: Schema.String
  readonly name: Schema.Literal<Name>
  readonly params: Params
  readonly providerExecuted: Schema.withDecodingDefaultKey<Schema.Boolean>
  readonly "~effect/ai/Content/Part": Schema.withDecodingDefaultKey<Schema.tag<"~effect/ai/Content/Part">>
  readonly metadata: Schema.withDecodingDefault<Schema.$Record<Schema.String, Schema.Codec<Schema.Json>>>
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L1385)

Since v4.0.0

## ToolParamsDeltaPart

Schema for validation and encoding of tool params delta parts.

**Signature**

```ts
declare const ToolParamsDeltaPart: Schema.Struct<{
  readonly type: Schema.tag<"tool-params-delta">
  readonly id: Schema.String
  readonly delta: Schema.String
  readonly "~effect/ai/Content/Part": Schema.withDecodingDefaultKey<Schema.tag<"~effect/ai/Content/Part">>
  readonly metadata: Schema.withDecodingDefault<Schema.$Record<Schema.String, Schema.Codec<Schema.Json>>>
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L1208)

Since v4.0.0

## ToolParamsEndPart

Schema for validation and encoding of tool params end parts.

**Signature**

```ts
declare const ToolParamsEndPart: Schema.Struct<{
  readonly type: Schema.tag<"tool-params-end">
  readonly id: Schema.String
  readonly "~effect/ai/Content/Part": Schema.withDecodingDefaultKey<Schema.tag<"~effect/ai/Content/Part">>
  readonly metadata: Schema.withDecodingDefault<Schema.$Record<Schema.String, Schema.Codec<Schema.Json>>>
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L1276)

Since v4.0.0

## ToolParamsStartPart

Schema for validation and encoding of tool params start parts.

**Signature**

```ts
declare const ToolParamsStartPart: Schema.Struct<{
  readonly type: Schema.tag<"tool-params-start">
  readonly id: Schema.String
  readonly name: Schema.String
  readonly providerExecuted: Schema.withDecodingDefaultKey<Schema.Boolean>
  readonly "~effect/ai/Content/Part": Schema.withDecodingDefaultKey<Schema.tag<"~effect/ai/Content/Part">>
  readonly metadata: Schema.withDecodingDefault<Schema.$Record<Schema.String, Schema.Codec<Schema.Json>>>
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L1130)

Since v4.0.0

## ToolResultPart

Creates a Schema for tool result parts with specific tool name and result type.

**Signature**

```ts
declare const ToolResultPart: <
  const Name extends string,
  Success extends Schema.Constraint,
  Failure extends Schema.Constraint
>(
  name: Name,
  success: Success,
  failure: Failure
) => Schema.decodeTo<
  Schema.Struct<{
    readonly "~effect/ai/Content/Part": Schema.Literal<"~effect/ai/Content/Part">
    readonly result: Schema.Union<readonly [Success, Failure]>
    readonly providerExecuted: Schema.Boolean
    readonly metadata: Schema.$Record<Schema.String, Schema.NullOr<Schema.Codec<Schema.Json>>>
    readonly encodedResult: Schema.toEncoded<Schema.Union<readonly [Success, Failure]>>
    readonly preliminary: Schema.Boolean
    readonly id: Schema.String
    readonly type: Schema.Literal<"tool-result">
    readonly isFailure: Schema.Boolean
    readonly name: Schema.Literal<Name>
  }>,
  Schema.Struct<{
    readonly result: Schema.toEncoded<Schema.Union<readonly [Success, Failure]>>
    readonly providerExecuted: Schema.optional<Schema.Boolean>
    readonly metadata: Schema.optional<Schema.$Record<Schema.String, Schema.NullOr<Schema.Codec<Schema.Json>>>>
    readonly preliminary: Schema.optional<Schema.Boolean>
    readonly id: Schema.String
    readonly type: Schema.Literal<"tool-result">
    readonly isFailure: Schema.Boolean
    readonly name: Schema.Literal<Name>
  }>
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L1598)

Since v4.0.0

## UrlSourcePart

Schema for validation and encoding of url source parts.

**Signature**

```ts
declare const UrlSourcePart: Schema.Struct<{
  readonly type: Schema.tag<"source">
  readonly sourceType: Schema.tag<"url">
  readonly id: Schema.String
  readonly url: Schema.URLFromString
  readonly title: Schema.String
  readonly "~effect/ai/Content/Part": Schema.withDecodingDefaultKey<Schema.tag<"~effect/ai/Content/Part">>
  readonly metadata: Schema.withDecodingDefault<Schema.$Record<Schema.String, Schema.Codec<Schema.Json>>>
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L2085)

Since v4.0.0

# utility types

## ConstructorParams (type alias)

A utility type for specifying the parameters required to construct a
specific response part.

**Signature**

```ts
type ConstructorParams<Part> = Omit<Part, typeof PartTypeId | "type" | "sourceType" | "metadata"> & {
  /**
   * Optional provider-specific metadata for this part.
   */
  readonly metadata?: Part["metadata"] | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L542)

Since v4.0.0

## ToolCallParts (type alias)

Utility type that extracts tool call parts from a set of tools.

**Signature**

```ts
type ToolCallParts<Tools> = {
  [Name in keyof Tools]: Name extends string ? ToolCallPart<Name, Tool.Parameters<Tools[Name]>> : never
}[keyof Tools]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L404)

Since v4.0.0

## ToolResultParts (type alias)

Utility type that extracts tool result parts from a set of tools.

**Signature**

```ts
type ToolResultParts<Tools> = {
  [Name in keyof Tools]: Name extends string
    ? ToolResultPart<Name, Tool.Success<Tools[Name]>, Tool.FailureResult<Tools[Name]>>
    : never
}[keyof Tools]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Response.ts#L415)

Since v4.0.0
