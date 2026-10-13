import {readdir} from "node:fs/promises";
import type {Dirent} from "node:fs";
import path from "node:path";

export interface StaticPrerenderPage {
  path: string;
}

const MDX_EXTENSION = /\.mdx$/u;

async function walkMdxFiles(dir: string): Promise<string[]> {
  let entries: Dirent[];
  try {
    entries = await readdir(dir, {withFileTypes: true});
  } catch {
    // Content dir does not exist yet (e.g. submodule not initialized) —
    // no blog pages to prerender.
    return [];
  }

  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      // Dot-directories (.agents, .github, .git) are repo tooling, not content.
      if (entry.isDirectory()) return entry.name.startsWith(".") ? [] : walkMdxFiles(fullPath);
      return MDX_EXTENSION.test(entry.name) ? [fullPath] : [];
    })
  );
  return files.flat();
}

/**
 * Collects `/blog/<slug>` prerender paths from the content directory.
 *
 * Posts are filed as `<locale>/YYYY/MM/DD/<slug>.mdx`, but the date folders
 * never reach the URL — the slug is the filename alone. This must stay in
 * agreement with `resolveLocaleAndSlug` in `src/lib/blog/source.server.ts`.
 */
export async function collectBlogPrerenderPages({contentDir}: {contentDir: string}): Promise<string[]> {
  const files = await walkMdxFiles(contentDir);
  const slugs = new Set(files.map((file) => path.basename(file).replace(MDX_EXTENSION, "")));
  return [...slugs].filter(Boolean).map((slug) => `/blog/${slug}`);
}

export function toStaticPages(paths: string[]): StaticPrerenderPage[] {
  return paths.map((pagePath) => ({path: pagePath}));
}
