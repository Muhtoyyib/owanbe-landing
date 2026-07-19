import { useState } from "react"
import type { ChangeEvent } from "react"
import { Info, Mail, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { RoleSelector } from "./role-selector"

/**
 * The white form card that sits on the purple waitlist section.
 * Uses local state only — there is no backend wired up yet.
 */
export function WaitlistFormCard() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState<string | null>(null)

  function onSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <div className="w-full max-w-lg rounded-3xl bg-card p-8 shadow-xl md:p-10">
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
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email address"
                className="h-11 pl-9"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label>I am a…</Label>
            <RoleSelector value={role} onChange={setRole} />
          </div>
        </div>

        <div className={"space-y-3"}>
          <Button
            type="submit"
            size={"lg"}
            className="w-full bg-brand py-3 text-white hover:bg-brand"
          >
            Reserve your spot
          </Button>

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
