import { useState } from "react"
import type { FormEvent } from "react"
import { Check, Info, Loader2, Mail, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

import { RoleSelector } from "./role-selector"
import { useWaitlistSignup } from "../hooks/use-waitlist-signup"
import type { WhoYouAre } from "../api/waitlist"

/**
 * The white form card that sits on the purple waitlist section.
 * Submits to POST /api/waitlist.
 */
export function WaitlistFormCard() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState<WhoYouAre | null>(null)
  const { submit, clearError, message, isSubmitting, isSuccess, isError } =
    useWaitlistSignup()

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isSubmitting || isSuccess) return

    // The design asks for a full name but the API only stores `firstName` (and
    // rejects unknown fields), so we send the leading token and let the rest go.
    const firstName = name.trim().split(/\s+/)[0]

    await submit({
      email: email.trim(),
      ...(firstName ? { firstName } : {}),
      ...(role ? { whoYouAre: role } : {}),
    })
  }

  return (
    <div className="w-full max-w-lg rounded-3xl bg-card p-6 shadow-xl md:p-10">
      <div className="flex flex-col gap-3">
        <h3 className="text-strong font-display text-[28px] leading-tight font-normal tracking-wide trim-cap">
          Join the waitlist
        </h3>
        <p className="text-sm text-[#9A9A9F]">
          We'll reach out when your city goes live. No noise, only what matters.
        </p>
      </div>

      <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-7">
        <div className={"space-y-5"}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="waitlist-name">Full name</Label>
            <div className="relative">
              <User className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="waitlist-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                disabled={isSubmitting || isSuccess}
                placeholder="Enter your full name"
                className="h-11 pl-9"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="waitlist-email">Email address</Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="waitlist-email"
                type="email"
                required
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value)
                  clearError()
                }}
                disabled={isSubmitting || isSuccess}
                placeholder="Enter your email address"
                aria-invalid={isError || undefined}
                aria-describedby={message ? "waitlist-status" : undefined}
                className="h-11 pl-9"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label>I am a…</Label>
            <RoleSelector
              value={role}
              onChange={setRole}
              disabled={isSubmitting || isSuccess}
            />
          </div>
        </div>

        <div className={"space-y-3"}>
          <Button
            type="submit"
            size={"lg"}
            disabled={isSubmitting || isSuccess}
            className="w-full bg-brand py-3 text-white hover:bg-brand disabled:opacity-100"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" />
                Reserving your spot…
              </>
            ) : isSuccess ? (
              <>
                <Check />
                You're on the list
              </>
            ) : (
              "Reserve your spot"
            )}
          </Button>

          {message ? (
            <p
              id="waitlist-status"
              role="status"
              aria-live="polite"
              className={cn(
                "text-center text-sm",
                isError ? "text-destructive" : "text-brand"
              )}
            >
              {message}
            </p>
          ) : null}

          <div className="text-soft flex items-center justify-center gap-1.5 text-xs">
            <Info className="size-3.5" />
            <span>
              No spam. We'll only reach out with launch updates and early
              access.
            </span>
          </div>
        </div>
      </form>
    </div>
  )
}
