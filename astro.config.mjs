import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://khaibuilds.com",
  output: "static",
  i18n: {
    defaultLocale: "en",
    locales: ["en", "vi"],
    routing: { prefixDefaultLocale: false }
  },
  build: { format: "directory" }
});
