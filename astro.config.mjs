// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      expressiveCode: true,
      prerender: true,
      pagefind: true,
      title: "Effect V4 Docs",
      social: [
        { icon: "github", label: "GitHub", href: "https://github.com/effect-TS/effect-smol" },
      ],
      sidebar: [
        {
          label: "migration",
          items: [{ autogenerate: { directory: "migration", collapsed: true } }],
        },
        {
          label: "effect",
          items: [{ autogenerate: { directory: "effect", collapsed: true } }],
        },
        {
          label: "ai",
          items: [{ autogenerate: { directory: "ai", collapsed: true } }],
        },
        {
          label: "atom",
          items: [{ autogenerate: { directory: "atom", collapsed: true } }],
        },
        {
          label: "cookbooks",
          items: [{ autogenerate: { directory: "cookbooks", collapsed: true } }],
        },
        {
          label: "opentelemetry",
          items: [{ autogenerate: { directory: "opentelemetry", collapsed: true } }],
        },
        {
          label: "platform-browser",
          items: [{ autogenerate: { directory: "platform-browser", collapsed: true } }],
        },
        {
          label: "platform-bun",
          items: [{ autogenerate: { directory: "platform-bun", collapsed: true } }],
        },
        {
          label: "platform-node",
          items: [{ autogenerate: { directory: "platform-node", collapsed: true } }],
        },
        {
          label: "platform-node-shared",
          items: [{ autogenerate: { directory: "platform-node-shared", collapsed: true } }],
        },
        {
          label: "platform-node-shared",
          items: [{ autogenerate: { directory: "platform-node-shared", collapsed: true } }],
        },
        {
          label: "sql",
          items: [{ autogenerate: { directory: "sql", collapsed: true } }],
        },
        {
          label: "vitest",
          items: [{ autogenerate: { directory: "vitest", collapsed: true } }],
        },
        {
          label: "LLMS.md",
          link: "/LLMS",
        },
      ],
    }),
  ],
});
