---
title: HttpApiScalar.ts
nav_order: 275
parent: "effect"
---

## HttpApiScalar.ts overview

Scalar documentation UI for declarative `HttpApi` contracts.

Use this module to mount a browser-based API reference on an `HttpRouter`
without writing or storing a separate OpenAPI file. The route renders an HTML
page containing the OpenAPI document produced from the supplied `HttpApi` and
boots Scalar in the browser.

Since v4.0.0

---

## Exports Grouped by Category

- [layers](#layers)
  - [layer](#layer)
  - [layerCdn](#layercdn)
- [models](#models)
  - [ScalarConfig (type alias)](#scalarconfig-type-alias)
  - [ScalarThemeId (type alias)](#scalarthemeid-type-alias)

---

# layers

## layer

Mounts a Scalar API reference page for an `HttpApi` using the bundled Scalar script.

**Details**

The route serves the OpenAPI specification generated from the API at the
configured path, defaulting to `/docs`.

**Signature**

```ts
declare const layer: <Id extends string, Groups extends HttpApiGroup.Any>(
  api: HttpApi.HttpApi<Id, Groups>,
  options?: { readonly path?: `/${string}` | undefined; readonly scalar?: ScalarConfig } | undefined
) => Layer.Layer<never, never, HttpRouter.HttpRouter>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiScalar.ts#L218)

Since v4.0.0

## layerCdn

Mounts a Scalar API reference page for an `HttpApi` that loads Scalar from jsDelivr.

**Details**

The route serves the OpenAPI specification generated from the API at the
configured path, defaulting to `/docs`; `version` selects the Scalar package
version loaded from the CDN.

**Signature**

```ts
declare const layerCdn: <Id extends string, Groups extends HttpApiGroup.Any>(
  api: HttpApi.HttpApi<Id, Groups>,
  options?:
    | {
        readonly path?: `/${string}` | undefined
        readonly scalar?: ScalarConfig
        readonly version?: string | undefined
      }
    | undefined
) => Layer.Layer<never, never, HttpRouter.HttpRouter>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiScalar.ts#L249)

Since v4.0.0

# models

## ScalarConfig (type alias)

Configuration passed to the embedded Scalar API reference UI.

**Details**

This configuration follows Scalar's API reference configuration:
https://github.com/scalar/scalar/blob/main/documentation/configuration.md

**Signature**

````ts
type ScalarConfig = {
  /** A string to use one of the color presets */
  theme?: ScalarThemeId
  /** The layout to use for the references */
  layout?: "modern" | "classic"
  /** URL to a request proxy for the API client */
  proxyUrl?: string
  /** Browser JavaScript function expression used by Scalar for documents and test requests */
  customFetch?: string
  /** Whether to show the sidebar */
  showSidebar?: boolean
  /**
   * Whether to show models in the sidebar, search, and content.
   *
   * @default false
   */
  hideModels?: boolean
  /**
   * Whether to show the "Test Request" button.
   *
   * @default false
   */
  hideTestRequestButton?: boolean
  /**
   * Whether to show the sidebar search bar.
   *
   * @default false
   */
  hideSearch?: boolean
  /** Whether dark mode is on or off initially (light mode) */
  darkMode?: boolean
  /** forceDarkModeState makes it always this state no matter what */
  forceDarkModeState?: "dark" | "light"
  /** Whether to show the dark mode toggle */
  hideDarkModeToggle?: boolean
  /**
   * Path to a favicon image.
   *
   * **Example** (Setting a relative favicon)
   *
   * ```ts
   * const favicon = "/favicon.svg"
   * ```
   *
   * @default undefined
   */
  favicon?: string
  /** Custom CSS to be added to the page */
  customCss?: string
  /**
   * Origin used when the OpenAPI document contains relative server URLs and is
   * rendered during SSR.
   *
   * **Details**
   *
   * Browsers can derive the origin from `window.location.origin`; server
   * rendering needs this value supplied explicitly.
   *
   * **Example** (Setting a local server URL)
   *
   * ```ts
   * const baseServerURL = "http://localhost:3000"
   * ```
   *
   * @default undefined
   */
  baseServerURL?: string
  /**
   * Whether Scalar loads its default Inter and JetBrains Mono fonts.
   *
   * **Details**
   *
   * Set this to `false` when supplying custom fonts.
   *
   * @default true
   */
  withDefaultFonts?: boolean
  /**
   * Whether all tags are open by default instead of only the tag matching the
   * current URL.
   *
   * @default false
   */
  defaultOpenAllTags?: boolean
  /**
   * Whether to display the operation ID in the operation reference.
   *
   * @default false
   */
  showOperationId?: boolean
}
````

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiScalar.ts#L52)

Since v4.0.0

## ScalarThemeId (type alias)

Theme preset identifier accepted by the Scalar API reference UI.

**Signature**

```ts
type ScalarThemeId =
  | "alternate"
  | "default"
  | "moon"
  | "purple"
  | "solarized"
  | "bluePlanet"
  | "saturn"
  | "kepler"
  | "mars"
  | "deepSpace"
  | "laserwave"
  | "none"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiScalar.ts#L27)

Since v4.0.0
