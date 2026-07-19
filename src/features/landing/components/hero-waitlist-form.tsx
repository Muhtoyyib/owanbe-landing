import { useState} from "react"
import type { ChangeEvent } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

/** Inline email capture row for the hero. Front-end only — no backend. */
export function HeroWaitlistForm() {
  const [email, setEmail] = useState("")

  function handleSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-110 flex-col gap-2 sm:flex-row"
    >
      <Input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Enter your email address"
        aria-label="Email address"
        className="h-10 flex-1 rounded-xl border-transparent bg-white px-5 text-foreground placeholder:text-placeholder"
      />
      <Button
        type="submit"
        className="h-10 rounded-xl bg-brand tracking-wide px-6 text-white hover:bg-brand/90"
      >
        Join the waitlist
      </Button>
    </form>
  )
}
