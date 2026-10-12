import {paraglideVitePlugin} from "@inlang/paraglide-js";
import type {CompilerOptions} from "@inlang/paraglide-js";
import type {PluginOption} from "vite";

export const paraglideOptions = {
  project: "./project.inlang",
  outdir: "./src/paraglide",
  emitTsDeclarations: true,
  strategy: ["url", "cookie", "baseLocale"],
  urlPatterns: [
    {
      pattern: "/:path(.*)?",
      localized: [["en", "/:path(.*)?"]],
    },
  ],
  routeStrategies: [{match: "/api/*", exclude: true}],
} satisfies CompilerOptions;

export function createParaglidePlugin(): PluginOption {
  return paraglideVitePlugin(paraglideOptions);
}
