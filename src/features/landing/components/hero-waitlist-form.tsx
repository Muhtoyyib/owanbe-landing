import { useState } from "react"
import type { FormEvent } from "react"
import { Check, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

import { useWaitlistSignup } from "../hooks/use-waitlist-signup"

/** Inline email capture row for the hero — posts to POST /api/waitlist. */
export function HeroWaitlistForm() {
  const [email, setEmail] = useState("")
  const { submit, clearError, message, isSubmitting, isSuccess, isError } =
    useWaitlistSignup()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isSubmitting || isSuccess) return
    await submit({ email: email.trim() })
  }

  return (
    <div className="mx-auto w-4/5 max-w-110 space-y-2">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
        <Input
          type="email"
          required
          value={email}
          onChange={(event) => {
            setEmail(event.target.value)
            clearError()
          }}
          disabled={isSubmitting || isSuccess}
          placeholder="Enter your email address"
          aria-label="Email address"
          aria-invalid={isError || undefined}
          aria-describedby={message ? "hero-waitlist-status" : undefined}
          className="h-10 flex-1 rounded-xl border-transparent bg-white px-5 text-foreground placeholder:text-placeholder disabled:opacity-100"
        />
        <Button
          type="submit"
          disabled={isSubmitting || isSuccess}
          className="h-10 rounded-xl bg-brand px-6 tracking-wide text-white hover:bg-brand/90 disabled:opacity-100"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" />
              Joining…
            </>
          ) : isSuccess ? (
            <>
              <Check />
              You're in
            </>
          ) : (
            "Join the waitlist"
          )}
        </Button>
      </form>

      {/* aria-live announces the outcome without stealing focus. Only rendered
          once there is something to say. */}
      {message ? (
        <p
          id="hero-waitlist-status"
          role="status"
          aria-live="polite"
          className={cn("text-sm", isError ? "text-coral" : "text-white")}
        >
          {message}
        </p>
      ) : null}
    </div>
  )
}
