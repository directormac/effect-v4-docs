// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightChangelogs, { makeChangelogsSidebarLinks } from "starlight-changelogs";
import starlightCatppuccin from "@catppuccin/starlight";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      plugins: [
        starlightCatppuccin({
          dark: { flavor: "macchiato", accent: "mauve" },
          light: { flavor: "latte", accent: "mauve" },
        }),
        starlightChangelogs(),
      ],
      expressiveCode: true,
      prerender: true,
      pagefind: true,
      title: "Effect V4 Docs",
      social: [
        { icon: "github", label: "GitHub", href: "https://github.com/effect-TS/effect-smol" },
      ],
      sidebar: [
        {
          label: "changelogs",
          collapsed: true,
          items: [
            ...makeChangelogsSidebarLinks([
              { type: "all", base: "changelog/effect", label: "effect" },
            ]),
          ],
        },
        {
          label: "migration",
          items: [{ autogenerate: { directory: "migration", collapsed: true } }],
        },
        {
          label: "ai-docs",
          items: [{ autogenerate: { directory: "ai-docs", collapsed: true } }],
        },
        {
          label: "guides",
          collapsed: true,
          items: [{ autogenerate: { directory: "guides", collapsed: true } }],
        },
        {
          label: "effect",
          collapsed: true,
          items: [{ autogenerate: { directory: "effect", collapsed: true } }],
        },
        {
          label: "ai",
          collapsed: true,
          items: [{ autogenerate: { directory: "ai", collapsed: true } }],
        },
        {
          label: "atom",
          collapsed: true,
          items: [{ autogenerate: { directory: "atom", collapsed: true } }],
        },
        {
          label: "cookbooks",
          collapsed: true,
          items: [{ autogenerate: { directory: "cookbooks", collapsed: true } }],
        },
        {
          label: "opentelemetry",
          collapsed: true,
          items: [{ autogenerate: { directory: "opentelemetry", collapsed: true } }],
        },
        {
          label: "platform-browser",
          collapsed: true,
          items: [{ autogenerate: { directory: "platform-browser", collapsed: true } }],
        },
        {
          label: "platform-bun",
          collapsed: true,
          items: [{ autogenerate: { directory: "platform-bun", collapsed: true } }],
        },
        {
          label: "platform-node",
          collapsed: true,
          items: [{ autogenerate: { directory: "platform-node", collapsed: true } }],
        },
        {
          label: "platform-node-shared",
          collapsed: true,
          items: [{ autogenerate: { directory: "platform-node-shared", collapsed: true } }],
        },
        {
          label: "sql",
          collapsed: true,
          items: [{ autogenerate: { directory: "sql", collapsed: true } }],
        },
        {
          label: "vitest",
          collapsed: true,
          items: [{ autogenerate: { directory: "vitest", collapsed: true } }],
        },
        {
          label: "LLMS.md",
          link: "/llms",
        },
      ],
    }),
  ],
});
