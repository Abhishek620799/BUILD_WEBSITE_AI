import { defineConfig } from "vite";

export default defineConfig({
  base: process.env.GITHUB_PAGES === "true" ? "/BUILD_WEBSITE_AI/" : "/"
});
