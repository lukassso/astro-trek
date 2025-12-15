import { defineConfig } from "astro/config";
import icon from "astro-icon";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import expressiveCode from "astro-expressive-code";
import { expressiveCodeOptions } from "./src/site.config";
import react from "@astrojs/react";
import netlify from "@astrojs/netlify";
import dotenv from "dotenv";
import sitemap from "@astrojs/sitemap";

dotenv.config();

// https://astro.build/config
export default defineConfig({
  i18n: {
    defaultLocale: "en",
    locales: ["en", "pl"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  site: "https://aigreener.com",
  integrations: [
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date("2024-12-17"),
    }),
    expressiveCode(expressiveCodeOptions),
    icon({
      include: {
        tabler: ["*"],
      },
    }),
    tailwind({
      applyBaseStyles: true,
    }),
    mdx(),
    react(),
  ],
  output: "hybrid",
  adapter: netlify({
    edgeMiddleware: true,
  }),
  vite: {
    optimizeDeps: {
      include: ["isomorphic-fetch"],
    },
    resolve: {
      alias: {
        "node-fetch": "isomorphic-fetch",
      },
    },
    define: {
      global: "globalThis",
    },
  },
});
