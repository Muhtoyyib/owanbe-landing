import { Skeleton } from "@/components/ui/skeleton"

import type { WaitlistCountState } from "../hooks/use-waitlist-count"

/**
 * Below-the-form social proof ("N people already waiting").
 *
 * The number always comes from the API — never a placeholder. Showing static
 * copy first and then swapping in a real figure makes the first number look
 * invented, so instead:
 *   loading     → a skeleton the width of the final line (no layout shift)
 *   unavailable → nothing at all, rather than a number we can't stand behind
 *   ready       → the real count
 *
 * Every branch is the same height so revealing the line never nudges the venue
 * row below it.
 */
export function WaitlistSocialProof({ count }: { count: WaitlistCountState }) {
  if (count.status === "loading") {
    return (
      <div className="flex h-5 items-center justify-center">
        <Skeleton className="h-3.5 w-44 bg-white/15" />
        <span className="sr-only">Loading waitlist count</span>
      </div>
    )
  }

  if (count.status === "unavailable") {
    return <div className="h-5" aria-hidden="true" />
  }

  return (
    <p className="flex h-5 items-center justify-center text-sm text-white">
      <span className="font-medium text-brand">
        {count.total.toLocaleString("en-NG")}
      </span>
      <span>
        &nbsp;{count.total === 1 ? "person" : "people"} already waiting
      </span>
    </p>
  )
}
