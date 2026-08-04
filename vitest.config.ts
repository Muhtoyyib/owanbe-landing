import { defineConfig } from "vitest/config"
import viteReact from "@vitejs/plugin-react"
import { resolve } from "node:path"

/**
 * Component tests run in jsdom. Kept separate from vite.config.ts so the app
 * build doesn't pull in the TanStack Start / prerender plugins during tests.
 */
export default defineConfig({
  plugins: [viteReact()],
  resolve: { alias: { "@": resolve(__dirname, "./src") } },
  test: {
    environment: "jsdom",
    globals: true,
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
})
