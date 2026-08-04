import type { LucideIcon } from "lucide-react"

import type { WhoYouAre } from "./api/waitlist"

/** A featured venue/vendor card shown in the hero marquee row. */
export interface VenueCard {
  id: string
  name: string
  location: string
  /** Formatted price label, e.g. "₦420K". Omitted for non-priced items. */
  price?: string
  image: string
  /** When true the card is visually raised/highlighted (center card). */
  featured?: boolean
}

/** A benefit shown in the "Why join early" grid. */
export interface Benefit {
  id: string
  icon: LucideIcon
  title: string
  description: string
}

/** A single FAQ entry in the accordion. */
export interface FaqItem {
  id: string
  question: string
  answer: string
}

/**
 * A selectable role chip in the waitlist form ("I am a…"). The id is the API's
 * `whoYouAre` enum value, so a typo becomes a compile error rather than a 400.
 */
export interface Role {
  id: WhoYouAre
  label: string
}

/** A navigation link in the header. */
export interface NavLink {
  label: string
  href: string
}
