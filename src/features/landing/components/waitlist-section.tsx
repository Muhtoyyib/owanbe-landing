import { Container } from "./container"
import { SectionHeader } from "./section-header"
import { WaitlistFormCard } from "./waitlist-form-card"

/**
 * Full-width purple waitlist section: heading + centered form card.
 */
export function WaitlistSection() {
  return (
    <section id="waitlist" className="bg-brand py-24">
      <Container>
        <SectionHeader
          tone="dark"
          align="center"
          eyebrow="RESERVE YOUR SPOT"
          title="Claim early access"
          subtitle="Launching first in Lagos, Ibadan, Abuja, and Port Harcourt. Be there from day one."
        />
        <div className="mt-10 flex justify-center">
          <WaitlistFormCard />
        </div>
      </Container>
    </section>
  )
}
