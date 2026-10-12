/**
 * Blog body image. `src` is a public/ path or full URL — there is no media
 * service behind this yet, so commit images with the post or host them
 * somewhere durable.
 */
export function Image({src, alt, caption}: {src: string; alt: string; caption?: string}) {
  return (
    <figure className="overflow-hidden rounded-xl">
      <img src={src} alt={alt} className="w-full object-cover" loading="lazy" />
      {caption ? <figcaption className="mt-2 text-center text-xs text-muted-foreground">{caption}</figcaption> : null}
    </figure>
  );
}
