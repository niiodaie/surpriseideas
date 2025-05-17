import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  css: {
    postcss: "./postcss.config.js",
  },
  root: ".", // 👈 required for Vercel to find source
  build: {
    outDir: "dist",     // 👈 tells Vercel where to serve from
    emptyOutDir: true,
  },
});
