/**
 * `vp run blog:preview <path-to-blog-posts-checkout>`
 *
 * Starts the dev server reading posts from a local blog-posts checkout instead
 * of `content/blog`, so a post can be reviewed in the real site shell before
 * it is pushed. Sets OWANBE_BLOG_CONTENT_DIR; see scripts/lib/blog-content-dir.ts.
 */
import {spawn} from "node:child_process";
import path from "node:path";
import {blogContentDirEnvVar} from "./lib/blog-content-dir.ts";

const checkout = process.argv[2];

if (!checkout) {
  console.error(`Usage: vp run blog:preview <path-to-blog-posts-checkout>`);
  console.error(`Example: vp run blog:preview ../blog-posts`);
  process.exit(1);
}

const resolved = path.resolve(process.cwd(), checkout);
console.log(`Previewing blog content from ${resolved}`);
console.log(`Set ${blogContentDirEnvVar} yourself to reuse an already-running dev server.\n`);

const child = spawn("vp", ["dev", "--force"], {
  stdio: "inherit",
  env: {...process.env, [blogContentDirEnvVar]: resolved},
});

child.on("exit", (code) => process.exit(code ?? 0));
