import {defineCollections, defineConfig, frontmatterSchema} from "fumadocs-mdx/config";
import lastModified from "fumadocs-mdx/plugins/last-modified";
import {z} from "zod";
import {resolveBlogContentDir} from "./scripts/lib/blog-content-dir.ts";

const blogSchema = frontmatterSchema
  .omit({description: true})
  .extend({
    author: z.string(),
    date: z.string(),
    image: z.string(),
    category: z.enum(["Planning", "Vendors", "Industry", "Product"]),
    featured: z.boolean().default(false),
    excerpt: z.string(),
  })
  .strict();

export const blog = defineCollections({
  type: "doc",
  dir: resolveBlogContentDir(process.cwd()),
  files: ["**/*.mdx"],
  schema: blogSchema,
  postprocess: {
    includeProcessedMarkdown: true,
  },
});

export default defineConfig({
  plugins: [lastModified()],
  mdxOptions: {},
});
