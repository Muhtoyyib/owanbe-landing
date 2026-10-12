import path from "node:path";

export const blogContentDirEnvVar = "OWANBE_BLOG_CONTENT_DIR";

/**
 * Where blog posts are read from.
 *
 * Defaults to the `content/blog` directory (a git submodule once the
 * blog-posts repo exists). `vp run blog:preview` points this at a local
 * blog-posts checkout instead, so a post can be reviewed in the real site
 * before it is pushed.
 *
 * Fumadocs resolves a collection `dir` against cwd and derives each entry's
 * `info.path` relative to it, so a directory outside the repo produces exactly
 * the same slugs as the submodule does.
 */
export function resolveBlogContentDir(rootDir: string): string {
  const override = process.env[blogContentDirEnvVar]?.trim();
  return override ? path.resolve(rootDir, override) : path.join(rootDir, "content", "blog");
}

/** True when posts are being read from somewhere other than the default dir. */
export function isBlogContentDirOverridden(): boolean {
  return Boolean(process.env[blogContentDirEnvVar]?.trim());
}
