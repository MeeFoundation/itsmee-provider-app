import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
export const site = "https://provider.itsmee.org";

// https://astro.build/config
export default defineConfig({
  output: "static",
  integrations: [tailwind()],
  site: site,
});
