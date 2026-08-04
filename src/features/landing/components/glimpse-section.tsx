import { Container } from "./container"
import { ProductPreview } from "./product-preview"
import { SectionHeader } from "./section-header"

/** "A look inside" section — mock app-window previews of the product. */
export function GlimpseSection() {
  return (
    <section id="glimpse" className="py-16 md:py-24">
      <Container>
        <SectionHeader
          eyebrow="A LOOK INSIDE"
          title="Built for the way Nigeria celebrates"
          subtitle="Every screen is designed to be fast, clear, and worth coming back to."
        />
        <div className="mt-10 grid gap-6 md:mt-12 md:grid-cols-2">
          <ProductPreview title="Browse" variant="grid" />
          <ProductPreview title="Manage" variant="list" />
        </div>
      </Container>
    </section>
  )
}
