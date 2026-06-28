---
title: EmbeddingModel.ts
nav_order: 145
parent: "effect"
---

## EmbeddingModel.ts overview

Defines the provider-neutral service for text embeddings.

An `EmbeddingModel` turns text into numeric vectors. It supports single-input
embedding and ordered batch embedding, and represents provider failures as
`AiError` values. This module also includes the embedding dimensions service,
request and response models, usage metadata, provider contracts, and a
constructor that adapts a provider batch implementation into the service.
Single `embed` calls can be batched together internally.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [EmbeddingRequest (class)](#embeddingrequest-class)
  - [make](#make)
- [models](#models)
  - [EmbedManyResponse (class)](#embedmanyresponse-class)
  - [EmbedResponse (class)](#embedresponse-class)
  - [EmbeddingUsage (class)](#embeddingusage-class)
  - [ProviderResponse (interface)](#providerresponse-interface)
  - [Service (interface)](#service-interface)
- [options](#options)
  - [ProviderOptions (interface)](#provideroptions-interface)
- [services](#services)
  - [Dimensions (class)](#dimensions-class)
  - [EmbeddingModel (class)](#embeddingmodel-class)

---

# constructors

## EmbeddingRequest (class)

Represents a tagged request used by request resolvers for embedding operations.

**When to use**

Use when you need a typed request for one embedding input while building or
calling a low-level embedding request resolver.

**See**

- `Service` for the resolver-bearing service contract
- `make` for constructing the request resolver from a provider implementation
- `EmbedResponse` for the response produced by this request

**Signature**

```ts
declare class EmbeddingRequest
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EmbeddingModel.ts#L147)

Since v4.0.0

## make

Creates an EmbeddingModel service from a provider embedMany implementation.

**When to use**

Use to adapt a provider's batch embedding implementation into an
`EmbeddingModel.Service` that offers single-input and batch embedding
operations.

**Details**

The returned service builds single-input `embed` calls through a request
resolver, so concurrent `embed` requests can be batched into one provider
`embedMany` call. Direct `embedMany` calls pass the input array to the
provider, while `embedMany([])` returns an empty response without calling the
provider.

**Gotchas**

Provider responses are interpreted positionally and must contain exactly one
result for each requested input. If the provider returns a different number
of results, `embed` and `embedMany` fail with `AiError.InvalidOutputError`.

**See**

- `Service` for the service shape returned by this constructor
- `ProviderOptions` for the input passed to the provider implementation
- `ProviderResponse` for the provider response contract consumed by this constructor

**Signature**

```ts
declare const make: (params: {
  readonly embedMany: (options: ProviderOptions) => Effect.Effect<ProviderResponse, AiError.AiError>
}) => Effect.Effect<Service>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EmbeddingModel.ts#L202)

Since v4.0.0

# models

## EmbedManyResponse (class)

Response for batch embedding requests containing per-input embeddings and usage
metadata.

**Details**

`embeddings` preserves batch order, and `usage` carries token metadata for
the operation.

**See**

- `EmbedResponse` for individual embedding responses
- `EmbeddingUsage` for token usage metadata

**Signature**

```ts
declare class EmbedManyResponse
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EmbeddingModel.ts#L102)

Since v4.0.0

## EmbedResponse (class)

Response for a single embedding request.

**Signature**

```ts
declare class EmbedResponse
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EmbeddingModel.ts#L81)

Since v4.0.0

## EmbeddingUsage (class)

Represents token usage metadata for embedding operations.

**Details**

Contains optional provider-reported `inputTokens`. The value may be
`undefined` when the provider does not report usage or when `embedMany([])`
bypasses the provider.

**Signature**

```ts
declare class EmbeddingUsage
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EmbeddingModel.ts#L69)

Since v4.0.0

## ProviderResponse (interface)

Provider response for batch embedding requests.

**Signature**

```ts
export interface ProviderResponse {
  readonly results: Array<Array<number>>
  readonly usage: {
    readonly inputTokens: number | undefined
  }
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EmbeddingModel.ts#L125)

Since v4.0.0

## Service (interface)

Defines the service interface for embedding operations.

**Signature**

```ts
export interface Service {
  readonly resolver: RequestResolver.RequestResolver<EmbeddingRequest>
  readonly embed: (input: string) => Effect.Effect<EmbedResponse, AiError.AiError>
  readonly embedMany: (input: ReadonlyArray<string>) => Effect.Effect<EmbedManyResponse, AiError.AiError>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EmbeddingModel.ts#L159)

Since v4.0.0

# options

## ProviderOptions (interface)

Provider input options for embedding requests.

**Signature**

```ts
export interface ProviderOptions {
  readonly inputs: ReadonlyArray<string>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EmbeddingModel.ts#L115)

Since v4.0.0

# services

## Dimensions (class)

Service tag that provides the current embedding dimensions.

**When to use**

Use to retrieve or provide the configured embedding vector size through
context.

**See**

- `EmbeddingModel` for the embedding service that uses these dimensions

**Signature**

```ts
declare class Dimensions
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EmbeddingModel.ts#L53)

Since v4.0.0

## EmbeddingModel (class)

Service tag for embedding model operations.

**When to use**

Use to retrieve or provide the embedding model service for an `Effect`
program that embeds text into vectors.

**See**

- `Service` for the service contract provided by this tag
- `make` for constructing an embedding model service from a provider
- `Dimensions` for the current embedding vector size service

**Signature**

```ts
declare class EmbeddingModel
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EmbeddingModel.ts#L36)

Since v4.0.0
