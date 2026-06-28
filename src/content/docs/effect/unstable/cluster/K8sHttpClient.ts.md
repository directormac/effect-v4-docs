---
title: K8sHttpClient.ts
nav_order: 188
parent: "effect"
---

## K8sHttpClient.ts overview

HTTP client support for talking to the Kubernetes API from code running
inside a cluster. The module builds a `K8sHttpClient` service on top of the
shared HTTP client, points requests at the in-cluster API endpoint, and uses
the mounted service-account token when one is available.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [makeCreatePod](#makecreatepod)
  - [makeGetPods](#makegetpods)
- [layers](#layers)
  - [layer](#layer)
- [schemas](#schemas)
  - [Pod (class)](#pod-class)
  - [PodStatus (class)](#podstatus-class)
- [services](#services)
  - [K8sHttpClient (class)](#k8shttpclient-class)

---

# constructors

## makeCreatePod

Creates a scoped function that ensures a Kubernetes pod exists and waits until
it is ready.

**Details**

The pod defaults to the `default` namespace and is deleted when the surrounding
scope closes.

**Signature**

```ts
declare const makeCreatePod: Effect.Effect<
  (spec: v1.Pod) => Effect.Effect<PodStatus, never, Scope>,
  never,
  K8sHttpClient
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/K8sHttpClient.ts#L129)

Since v4.0.0

## makeGetPods

Creates a cached effect that fetches running Kubernetes pods.

**Details**

The request can be limited by namespace and label selector, and the result is a
map keyed by pod IP address.

**Signature**

```ts
declare const makeGetPods: (
  options?: { readonly namespace?: string | undefined; readonly labelSelector?: string | undefined } | undefined
) => Effect.Effect<
  Effect.Effect<Map<string, Pod>, HttpClientError.HttpClientError | Schema.SchemaError, never>,
  never,
  K8sHttpClient
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/K8sHttpClient.ts#L80)

Since v4.0.0

# layers

## layer

Layer that configures `K8sHttpClient` for the in-cluster Kubernetes API.

**Details**

It targets `https://kubernetes.default.svc/api`, adds the service-account
bearer token when available, requires successful HTTP statuses, and retries
transient failures.

**Signature**

```ts
declare const layer: Layer.Layer<K8sHttpClient, never, FileSystem.FileSystem | HttpClient.HttpClient>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/K8sHttpClient.ts#L47)

Since v4.0.0

# schemas

## Pod (class)

Schema for Kubernetes Pod values used by cluster helpers.

**Details**

The model exposes readiness helpers derived from the pod status conditions.

**Signature**

```ts
declare class Pod
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/K8sHttpClient.ts#L254)

Since v4.0.0

## PodStatus (class)

Schema for the subset of Kubernetes Pod status used by cluster helpers.

**Signature**

```ts
declare class PodStatus
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/K8sHttpClient.ts#L233)

Since v4.0.0

# services

## K8sHttpClient (class)

Service tag for the HTTP client used to call the Kubernetes API.

**Signature**

```ts
declare class K8sHttpClient
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/K8sHttpClient.ts#L30)

Since v4.0.0
