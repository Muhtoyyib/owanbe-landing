/* oxlint-disable jsx-a11y/heading-has-content, jsx-a11y/anchor-has-content, jsx-a11y/alt-text --
   children/alt arrive via the spread props at render time; the linter can't see them. */
import type {MDXComponents} from "mdx/types";
import {Callout, Image} from "@/components/mdx";

/**
 * Components available inside blog MDX bodies, plus styled overrides for the
 * base elements so posts match the site's typography without any per-post
 * markup.
 */
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    h2: (props) => <h2 className="mt-10 font-display text-2xl font-semibold tracking-[-0.02em] text-foreground md:text-3xl" {...props} />,
    h3: (props) => <h3 className="mt-8 font-display text-xl font-semibold text-foreground md:text-2xl" {...props} />,
    p: (props) => <p className="leading-7 text-foreground/80" {...props} />,
    a: (props) => <a className="font-semibold text-brand underline-offset-4 hover:underline" {...props} />,
    ul: (props) => <ul className="list-disc space-y-2 pl-6 leading-7 text-foreground/80" {...props} />,
    ol: (props) => <ol className="list-decimal space-y-2 pl-6 leading-7 text-foreground/80" {...props} />,
    blockquote: (props) => <blockquote className="border-l-2 border-brand pl-5 italic text-muted-foreground" {...props} />,
    code: (props) => <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-sm" {...props} />,
    pre: (props) => <pre className="overflow-x-auto rounded-xl bg-grey p-5 text-sm text-soft" {...props} />,
    img: (props) => <img className="rounded-xl" loading="lazy" {...props} />,
    Callout,
    Image,
    ...components,
  };
}
