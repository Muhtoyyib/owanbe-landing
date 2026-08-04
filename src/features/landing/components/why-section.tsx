import { BENEFITS } from "../data"
import { BenefitCard } from "./benefit-card"
import { Container } from "./container"
import { SectionHeader } from "./section-header"

/** "Why join early" section — benefit grid explaining early-member perks. */
export function WhySection() {
  return (
    <section id="why" className="py-16 md:py-24">
      <Container>
        <SectionHeader
          eyebrow="WHY JOIN EARLY"
          title="Be part of building it"
          subtitle="Early members shape the product, get priority access, and unlock benefits that won't be available at launch."
        />
        <div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-2">
          {BENEFITS.map((benefit) => (
            <BenefitCard key={benefit.id} benefit={benefit} />
          ))}
        </div>
      </Container>
    </section>
  )
}
