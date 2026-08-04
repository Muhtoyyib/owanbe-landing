import { motion  } from "motion/react"
import type {Variants} from "motion/react";

import { HERO_VENUES } from "../data"
import { useWaitlistCount } from "../hooks/use-waitlist-count"
import { Container } from "./container"
import { HeroWaitlistForm } from "./hero-waitlist-form"
import { VenueCard } from "./venue-card"
import { WaitlistSocialProof } from "./waitlist-social-proof"

/** Staggers the venue cards in one after another when the row enters view. */
const venueRowVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

/** Dark hero: badge, headline, subtitle, waitlist form, social proof, venues. */
export function HeroSection() {
  // Owned here so a successful signup can refresh the figure it sits next to.
  const { state: waitlistCount, refresh: refreshCount } = useWaitlistCount()

  return (
    <section id="hero" className="relative overflow-hidden bg-black pt-28 pb-0 md:pt-36">
      <Container className="flex flex-col items-center space-y-6 text-center md:space-y-7">
        <span className="inline-flex items-center gap-2 rounded-full border-brand bg-brand-light px-4 py-1.5 font-sans text-xs font-normal tracking-wide text-brand uppercase">
          <span className="size-1.5 rounded-full bg-brand" />
          Now accepting early access
        </span>

        <h1 className="max-w-3xl font-display text-5xl leading-tight font-bold text-white trim-cap md:text-6xl lg:text-[64px]">
          Every <span className="text-brand">unforgettable</span> event starts
          here
        </h1>

        <p className="max-w-147.5 text-base text-white/70 md:text-lg">
          Owambe Space is Nigeria's modern platform for discovering, comparing,
          and booking event venues with everything else you need in one place.
        </p>

        <div className="w-full space-y-2">
          <HeroWaitlistForm onJoined={refreshCount} />
          <WaitlistSocialProof count={waitlistCount} />
        </div>

        <motion.div
          variants={venueRowVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-6 flex w-full gap-4 overflow-x-auto px-1 pt-6 pb-12 md:mt-10 md:gap-7 lg:items-center lg:justify-center lg:overflow-x-visible"
        >
          {HERO_VENUES.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
