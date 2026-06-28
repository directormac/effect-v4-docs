---
title: OpenApi.ts
nav_order: 281
parent: "effect"
---

## OpenApi.ts overview

Generates OpenAPI 3.1 documents from declarative `HttpApi` contracts.

The generator reads API groups, endpoints, schemas, security definitions, and
annotations, then produces an OpenAPI document. This module also provides the
annotations used to shape that output and the TypeScript model for the
OpenAPI objects it generates.

Since v4.0.0

---

## Exports Grouped by Category

- [annotations](#annotations)
  - [Deprecated (class)](#deprecated-class)
  - [Description (class)](#description-class)
  - [Exclude](#exclude)
  - [ExternalDocs (class)](#externaldocs-class)
  - [Format (class)](#format-class)
  - [Identifier (class)](#identifier-class)
  - [License (class)](#license-class)
  - [Override (class)](#override-class)
  - [Servers (class)](#servers-class)
  - [Summary (class)](#summary-class)
  - [Title (class)](#title-class)
  - [Transform (class)](#transform-class)
  - [Version (class)](#version-class)
  - [annotations](#annotations-1)
- [constructors](#constructors)
  - [fromApi](#fromapi)
- [models](#models)
  - [OpenAPIApiKeySecurityScheme (interface)](#openapiapikeysecurityscheme-interface)
  - [OpenAPIComponents (interface)](#openapicomponents-interface)
  - [OpenAPIHTTPSecurityScheme (interface)](#openapihttpsecurityscheme-interface)
  - [OpenAPISecurityRequirement (type alias)](#openapisecurityrequirement-type-alias)
  - [OpenAPISecurityScheme (type alias)](#openapisecurityscheme-type-alias)
  - [OpenAPISpec (interface)](#openapispec-interface)
  - [OpenAPISpecExternalDocs (interface)](#openapispecexternaldocs-interface)
  - [OpenAPISpecInfo (interface)](#openapispecinfo-interface)
  - [OpenAPISpecLicense (interface)](#openapispeclicense-interface)
  - [OpenAPISpecMethodName (type alias)](#openapispecmethodname-type-alias)
  - [OpenAPISpecOperation (interface)](#openapispecoperation-interface)
  - [OpenAPISpecParameter (interface)](#openapispecparameter-interface)
  - [OpenAPISpecPathItem (type alias)](#openapispecpathitem-type-alias)
  - [OpenAPISpecPaths (type alias)](#openapispecpaths-type-alias)
  - [OpenAPISpecRequestBody (interface)](#openapispecrequestbody-interface)
  - [OpenAPISpecResponses (type alias)](#openapispecresponses-type-alias)
  - [OpenAPISpecServer (interface)](#openapispecserver-interface)
  - [OpenAPISpecServerVariable (interface)](#openapispecservervariable-interface)
  - [OpenAPISpecTag (interface)](#openapispectag-interface)
  - [OpenApiSpecContent (type alias)](#openapispeccontent-type-alias)
  - [OpenApiSpecEffectStream (type alias)](#openapispeceffectstream-type-alias)
  - [OpenApiSpecMediaType (interface)](#openapispecmediatype-interface)
  - [OpenApiSpecResponse (interface)](#openapispecresponse-interface)

---

# annotations

## Deprecated (class)

OpenAPI annotation for marking a generated endpoint operation as deprecated.

**Signature**

```ts
declare class Deprecated
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OpenApi.ts#L112)

Since v4.0.0

## Description (class)

OpenAPI annotation for setting generated descriptions on APIs, groups, endpoints, or security schemes.

**Signature**

```ts
declare class Description
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OpenApi.ts#L60)

Since v4.0.0

## Exclude

Annotation that excludes an annotated group or endpoint from the generated
OpenAPI specification.

**When to use**

Use to hide internal, experimental, or otherwise undocumented HTTP API groups
and endpoints from generated OpenAPI output.

**Signature**

```ts
declare const Exclude: Context.Reference<boolean>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OpenApi.ts#L134)

Since v4.0.0

## ExternalDocs (class)

OpenAPI annotation for adding external documentation metadata to groups or endpoints.

**Signature**

```ts
declare class ExternalDocs
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OpenApi.ts#L76)

Since v4.0.0

## Format (class)

OpenAPI annotation for setting the format metadata, such as a bearer token format on security schemes.

**Signature**

```ts
declare class Format
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OpenApi.ts#L96)

Since v4.0.0

## Identifier (class)

OpenAPI annotation for overriding generated identifiers, including operation ids.

**Signature**

```ts
declare class Identifier
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OpenApi.ts#L36)

Since v4.0.0

## License (class)

OpenAPI annotation for setting the generated API license metadata.

**Signature**

```ts
declare class License
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OpenApi.ts#L68)

Since v4.0.0

## Override (class)

OpenAPI annotation for shallowly merging additional fields into a generated OpenAPI object.

**Signature**

```ts
declare class Override
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OpenApi.ts#L120)

Since v4.0.0

## Servers (class)

OpenAPI annotation for setting the generated API server list.

**Signature**

```ts
declare class Servers
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OpenApi.ts#L86)

Since v4.0.0

## Summary (class)

OpenAPI annotation for setting generated summary text.

**Signature**

```ts
declare class Summary
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OpenApi.ts#L104)

Since v4.0.0

## Title (class)

OpenAPI annotation for setting the API title or group tag name.

**Signature**

```ts
declare class Title
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OpenApi.ts#L44)

Since v4.0.0

## Transform (class)

OpenAPI annotation for transforming a generated OpenAPI object.

**Details**

The function is applied during generation to the annotated API, group tag, or
endpoint operation.

**Signature**

```ts
declare class Transform
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OpenApi.ts#L149)

Since v4.0.0

## Version (class)

OpenAPI annotation for setting the generated API version.

**Signature**

```ts
declare class Version
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OpenApi.ts#L52)

Since v4.0.0

## annotations

Builds a `Context` containing OpenAPI annotations from the supplied options.

**Signature**

```ts
declare const annotations: (options: {
  readonly identifier?: string | undefined
  readonly title?: string | undefined
  readonly version?: string | undefined
  readonly description?: string | undefined
  readonly license?: OpenAPISpecLicense | undefined
  readonly summary?: string | undefined
  readonly deprecated?: boolean | undefined
  readonly externalDocs?: OpenAPISpecExternalDocs | undefined
  readonly servers?: ReadonlyArray<OpenAPISpecServer> | undefined
  readonly format?: string | undefined
  readonly override?: Record<string, unknown> | undefined
  readonly exclude?: boolean | undefined
  readonly transform?: ((openApiSpec: Record<string, any>) => Record<string, any>) | undefined
}) => Context.Context<never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OpenApi.ts#L179)

Since v4.0.0

# constructors

## fromApi

Converts an `HttpApi` instance into an OpenAPI Specification object.

**Details**

This function takes an `HttpApi` instance, which defines a structured API,
and generates an OpenAPI Specification (`OpenAPISpec`). The resulting spec
adheres to the OpenAPI 3.1.0 standard and includes detailed metadata such as
paths, operations, security schemes, and components. The function processes
the API's annotations, middleware, groups, and endpoints to build a complete
and accurate representation of the API in OpenAPI format.

The function also deduplicates schemas, applies transformations, and
integrates annotations like descriptions, summaries, external documentation,
and overrides. Cached results are used for better performance when the same
`HttpApi` instance is processed multiple times.

**Signature**

```ts
declare const fromApi: <Id extends string, Groups extends HttpApiGroup.Any>(
  api: HttpApi.HttpApi<Id, Groups>
) => OpenAPISpec
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OpenApi.ts#L249)

Since v4.0.0

# models

## OpenAPIApiKeySecurityScheme (interface)

Generated OpenAPI API key security scheme.

**Signature**

```ts
export interface OpenAPIApiKeySecurityScheme {
  readonly type: "apiKey"
  name: string
  in: "query" | "header" | "cookie"
  description?: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OpenApi.ts#L1055)

Since v4.0.0

## OpenAPIComponents (interface)

Generated OpenAPI components containing shared schemas and security schemes.

**Signature**

```ts
export interface OpenAPIComponents {
  schemas: JsonSchema.Definitions
  securitySchemes: Record<string, OpenAPISecurityScheme>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OpenApi.ts#L1030)

Since v4.0.0

## OpenAPIHTTPSecurityScheme (interface)

Generated OpenAPI HTTP security scheme, such as bearer or basic authentication.

**Signature**

```ts
export interface OpenAPIHTTPSecurityScheme {
  readonly type: "http"
  scheme: "bearer" | "basic" | string
  description?: string
  /* only for scheme: 'bearer' */
  bearerFormat?: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OpenApi.ts#L1041)

Since v4.0.0

## OpenAPISecurityRequirement (type alias)

Generated OpenAPI security requirement, keyed by security scheme name.

**Signature**

```ts
type OpenAPISecurityRequirement = Record<string, Array<string>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OpenApi.ts#L1078)

Since v4.0.0

## OpenAPISecurityScheme (type alias)

Union of security scheme objects emitted in generated OpenAPI components.

**Signature**

```ts
type OpenAPISecurityScheme = OpenAPIHTTPSecurityScheme | OpenAPIApiKeySecurityScheme
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OpenApi.ts#L1068)

Since v4.0.0

## OpenAPISpec (interface)

This model describes the OpenAPI specification (version 3.1.0) returned by
`fromApi`. It is not intended to describe the entire OpenAPI
specification, only the output of `fromApi`.

**Signature**

```ts
export interface OpenAPISpec {
  openapi: "3.1.0"
  info: OpenAPISpecInfo
  paths: OpenAPISpecPaths
  components: OpenAPIComponents
  security: Array<OpenAPISecurityRequirement>
  tags: Array<OpenAPISpecTag>
  servers?: Array<OpenAPISpecServer>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OpenApi.ts#L825)

Since v4.0.0

## OpenAPISpecExternalDocs (interface)

OpenAPI external documentation metadata.

**Signature**

```ts
export interface OpenAPISpecExternalDocs {
  url: string
  description?: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OpenApi.ts#L867)

Since v4.0.0

## OpenAPISpecInfo (interface)

OpenAPI `info` object generated by `fromApi`.

**Signature**

```ts
export interface OpenAPISpecInfo {
  title: string
  version: string
  description?: string
  license?: OpenAPISpecLicense
  summary?: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OpenApi.ts#L841)

Since v4.0.0

## OpenAPISpecLicense (interface)

OpenAPI license metadata used in the generated `info` object.

**Signature**

```ts
export interface OpenAPISpecLicense {
  name: string
  url?: string
  [key: string]: unknown
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OpenApi.ts#L878)

Since v4.0.0

## OpenAPISpecMethodName (type alias)

Lowercase HTTP method names used as keys in generated OpenAPI path items.

**Signature**

```ts
type OpenAPISpecMethodName = "get" | "put" | "post" | "delete" | "options" | "head" | "patch" | "trace"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OpenApi.ts#L922)

Since v4.0.0

## OpenAPISpecOperation (interface)

Generated OpenAPI operation object for an HTTP API endpoint.

**Signature**

```ts
export interface OpenAPISpecOperation {
  operationId: string
  parameters: Array<OpenAPISpecParameter>
  responses: OpenAPISpecResponses
  /** Always contains at least the title annotation or the group identifier */
  tags: NonEmptyArray<string>
  security: Array<OpenAPISecurityRequirement>
  requestBody?: OpenAPISpecRequestBody
  description?: string
  summary?: string
  deprecated?: boolean
  externalDocs?: OpenAPISpecExternalDocs
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OpenApi.ts#L1086)

Since v4.0.0

## OpenAPISpecParameter (interface)

Generated OpenAPI parameter object for path, query, header, or cookie parameters.

**Signature**

```ts
export interface OpenAPISpecParameter {
  name: string
  in: "query" | "header" | "path" | "cookie"
  schema: object
  required: boolean
  description?: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OpenApi.ts#L948)

Since v4.0.0

## OpenAPISpecPathItem (type alias)

Generated OpenAPI path item mapping HTTP methods to operations for a single route path.

**Signature**

```ts
type OpenAPISpecPathItem = {
  [K in OpenAPISpecMethodName]?: OpenAPISpecOperation
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OpenApi.ts#L938)

Since v4.0.0

## OpenAPISpecPaths (type alias)

Generated OpenAPI `paths` object, keyed by route path.

**Signature**

```ts
type OpenAPISpecPaths = Record<string, OpenAPISpecPathItem>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OpenApi.ts#L914)

Since v4.0.0

## OpenAPISpecRequestBody (interface)

Generated OpenAPI request body object for endpoint payloads.

**Signature**

```ts
export interface OpenAPISpecRequestBody {
  content: OpenApiSpecContent
  required: true
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OpenApi.ts#L1019)

Since v4.0.0

## OpenAPISpecResponses (type alias)

Generated OpenAPI responses object, keyed by HTTP status code.

**Signature**

```ts
type OpenAPISpecResponses = Record<number, OpenApiSpecResponse>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OpenApi.ts#L962)

Since v4.0.0

## OpenAPISpecServer (interface)

OpenAPI server object used in the generated `servers` array.

**Signature**

```ts
export interface OpenAPISpecServer {
  url: string
  description?: string
  variables?: Record<string, OpenAPISpecServerVariable>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OpenApi.ts#L890)

Since v4.0.0

## OpenAPISpecServerVariable (interface)

OpenAPI variable definition for templated server URLs.

**Signature**

```ts
export interface OpenAPISpecServerVariable {
  default: string
  enum?: NonEmptyArray<string>
  description?: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OpenApi.ts#L902)

Since v4.0.0

## OpenAPISpecTag (interface)

OpenAPI tag object generated for an HTTP API group.

**Signature**

```ts
export interface OpenAPISpecTag {
  name: string
  description?: string
  externalDocs?: OpenAPISpecExternalDocs
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OpenApi.ts#L855)

Since v4.0.0

## OpenApiSpecContent (type alias)

Generated OpenAPI content object, keyed by media type.

**Signature**

```ts
type OpenApiSpecContent = {
  [K in string]: OpenApiSpecMediaType
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OpenApi.ts#L970)

Since v4.0.0

## OpenApiSpecEffectStream (type alias)

Effect-specific metadata for generated streaming response media types.

**Signature**

```ts
type OpenApiSpecEffectStream =
  | {
      encoding: "sse"
      causeSchema: JsonSchema.JsonSchema
      errorSchema: JsonSchema.JsonSchema
      failureEvent: "effect/httpapi/stream/failure"
    }
  | {
      encoding: "uint8array"
    }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OpenApi.ts#L1002)

Since v4.0.0

## OpenApiSpecMediaType (interface)

Generated OpenAPI media type object containing the JSON Schema for a request or response body.

**Signature**

```ts
export interface OpenApiSpecMediaType {
  schema: JsonSchema.JsonSchema
  "x-effect-stream"?: OpenApiSpecEffectStream
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OpenApi.ts#L991)

Since v4.0.0

## OpenApiSpecResponse (interface)

Generated OpenAPI response object for an endpoint success or error schema.

**Signature**

```ts
export interface OpenApiSpecResponse {
  description: string
  content?: OpenApiSpecContent
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OpenApi.ts#L980)

Since v4.0.0
