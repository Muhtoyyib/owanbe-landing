import { useEffect, useState } from "react"

import { fetchWaitlistCount } from "../api/waitlist"

/**
 * Live signup total for the hero's social-proof line, or null while loading /
 * if the request fails. Callers fall back to the static WAITLIST_COUNT copy.
 *
 * Fetched in an effect rather than during render so the prerendered HTML keeps
 * the static value and hydration stays stable.
 */
export function useWaitlistCount(): number | null {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    let active = true

    fetchWaitlistCount().then((total) => {
      if (active) setCount(total)
    })

    return () => {
      active = false
    }
  }, [])

  return count
}
