import {defineConfig, lazyPlugins} from "vite-plus";
import {tanstackStart} from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import mdx from "fumadocs-mdx/vite";
import {createParaglidePlugin} from "./src/lib/paraglide-config.ts";
import {collectBlogPrerenderPages, toStaticPages} from "./scripts/lib/prerender-pages.ts";
import {resolveBlogContentDir} from "./scripts/lib/blog-content-dir.ts";

const blogPaths = await collectBlogPrerenderPages({
  contentDir: resolveBlogContentDir(import.meta.dirname),
});
const staticBlogPages = toStaticPages(blogPaths);

export default defineConfig({
  fmt: {
    printWidth: 140,
    tabWidth: 2,
    useTabs: false,
    semi: true,
    singleQuote: false,
    trailingComma: "es5",
    arrowParens: "always",
    bracketSpacing: false,
    bracketSameLine: false,
    endOfLine: "lf",
    ignorePatterns: ["routeTree.gen.ts"],
  },
  lint: {
    plugins: ["react", "react-perf", "typescript", "jsx-a11y"],
    rules: {
      "react/react-in-jsx-scope": "off",
      "jsx-a11y/prefer-tag-over-role": "off",
      "typescript/no-explicit-any": "warn",
      "typescript/no-restricted-types": [
        "error",
        {
          types: {
            unknown: "Use explicit domain types or UntrustedValue/UntrustedRecord at untrusted boundaries.",
          },
        },
      ],
      "eslint/complexity": ["error", {max: 10}],
      "eslint/max-lines-per-function": ["error", {max: 50, skipComments: true}],
      "eslint/max-lines": ["error", {max: 250, skipBlankLines: true, skipComments: true}],
      "eslint/max-params": ["error", 3],
      "eslint/max-depth": ["error", 3],
      "eslint/max-statements": ["error", 25],
      "eslint/max-classes-per-file": ["error", 1],
      "oxc/branches-sharing-code": "warn",
      "vite-plus/prefer-vite-plus-imports": "error",
      "shadcn/no-restyle": [
        "error",
        {
          contracts: [
            {pattern: "^Popover", allow: ["layout", "spacing", "color", "typography", "shape", "effects", "motion"]},
            // Marketing forms size inputs/buttons/skeletons per design — layout
            // and spacing at the call site are allowed; visual restyling is not.
            {pattern: "^(Input|Button|Skeleton)$", allow: ["layout", "spacing"]},
          ],
        },
      ],
      "shadcn/no-raw-colors": "error",
      "shadcn/no-arbitrary-values": [
        "error",
        {
          // Marketing layouts, hairline borders, and per-element tracking/leading
          // are bespoke by design; transition-*/duration-* pair with tw-animate-css.
          allow: ["layout", "tracking-*", "leading-*", "transition-*", "duration-*"],
        },
      ],
      "shadcn/no-inline-styles": "error",
      "shadcn/require-static-classes": ["error", {ignoreImports: ["@/components/ui/popover"]}],
    },
    // src/components/ui is vendored shadcn-style primitives — that directory is where
    // component styles are owned, so call-site rules don't apply inside it.
    ignorePatterns: ["*.html", "public", "__tests__", "*.test.ts", "*.test.tsx", "*.config.ts", "routeTree.gen.ts", "src/components/ui/**"],
    options: {
      typeAware: true,
      typeCheck: true,
    },
    jsPlugins: [
      {name: "vite-plus", specifier: "vite-plus/oxlint-plugin"},
      {name: "shadcn", specifier: "@shadcn/lint"},
    ],
  },
  staged: {
    // vp check = format + lint + typecheck; the second task restores the related
    // tests (staged is lint-staged, so staged files are appended to string tasks).
    "*.{js,ts,jsx,tsx}": ["vp check --fix", "vp test related --run --reporter=verbose --bail=1"],
    "*.{json,md,yaml,yml,css}": "vp fmt --write",
  },
  plugins: lazyPlugins(async () => [
    createParaglidePlugin(),
    mdx(await import("./source.config.ts")),
    tailwindcss(),
    tanstackStart({
      server: {
        entry: "./server.ts",
      },
      spa: {
        enabled: true,
        prerender: {
          enabled: true,
          crawlLinks: false,
          autoSubfolderIndex: false,
        },
      },
      prerender: {
        enabled: true,
        autoStaticPathsDiscovery: false,
        crawlLinks: false,
        autoSubfolderIndex: false,
        failOnError: false,
      },
      router: {
        quoteStyle: "double",
      },
      pages: [{path: "/"}, {path: "/blog"}, {path: "/robots.txt"}, {path: "/sitemap.xml"}, ...staticBlogPages],
    }),
    react({compiler: true}),
  ]),
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    port: 5177,
  },
});
