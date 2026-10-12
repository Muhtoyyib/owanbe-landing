import {motion, type Variants} from "motion/react";

import {cn} from "cn";

import type {VenueCard as VenueCardData} from "../types";

/**
 * Entrance for a single card — springs up + fades in when scrolled into view.
 * `custom` is the card's resting y offset (featured cards sit raised), so the
 * lift survives Motion writing an inline transform (which would otherwise
 * clobber a CSS `-translate-y` class).
 */
const cardVariants: Variants = {
  hidden: (restY: number) => ({opacity: 0, y: restY + 24}),
  visible: (restY: number) => ({
    opacity: 1,
    y: restY,
    transition: {type: "spring", stiffness: 260, damping: 26},
  }),
};

/** A single venue/vendor card in the hero marquee row. Pure presentational. */
export function VenueCard({venue}: {venue: VenueCardData}) {
  const restY = venue.featured ? 0 : 0;
  return (
    <motion.div
      custom={restY}
      variants={cardVariants}
      whileHover={{
        scale: 1.05,
        y: restY - 12,
        transition: {type: "spring", stiffness: 320, damping: 20},
      }}
      className={cn(
        "w-50 shrink-0 cursor-pointer overflow-hidden rounded-2xl bg-white",
        venue.featured ? "shadow-xl h-66" : "shadow-md h-57.5"
      )}
    >
      <img src={venue.image} alt={venue.name} className="aspect-4/3 h-3/4 w-full rounded-t-2xl object-cover" />
      <div className="p-4">
        <p className="font-medium text-left text-strong text-xs">{venue.name}</p>
        <div className="flex items-center justify-between gap-2">
          <span className="text-2xs tracking-wide text-sub uppercase">{venue.location}</span>
          {venue.price ? <span className="font-medium text-coral text-2xs">{venue.price}</span> : null}
        </div>
      </div>
    </motion.div>
  );
}
