import {useState} from "react";
import type {FormEvent} from "react";

import {Input} from "@/components/ui/input";
import {cn} from "cn";

import {FormStatus} from "./form-status";
import {WaitlistSubmitButton} from "./waitlist-submit-button";
import {useWaitlistSignup} from "../hooks/use-waitlist-signup";

interface HeroWaitlistFormProps {
  /** Called after a successful signup so the count beside it can refresh. */
  onJoined?: () => void;
}

/** Inline email capture row for the hero — posts to POST /api/waitlist. */
export function HeroWaitlistForm({onJoined}: HeroWaitlistFormProps) {
  const [email, setEmail] = useState("");
  const {submit, clearError, message, isSubmitting, isSuccess, isError} = useWaitlistSignup();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting || isSuccess) return;
    if (await submit({email: email.trim()})) onJoined?.();
  }

  return (
    <div className="mx-auto w-4/5 max-w-110 space-y-2">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
        <Input
          type="email"
          variant="hero"
          required
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            clearError();
          }}
          disabled={isSubmitting || isSuccess}
          placeholder="Enter your email address"
          aria-label="Email address"
          aria-invalid={isError || undefined}
          aria-describedby={message ? "hero-waitlist-status" : undefined}
          className="flex-1"
        />
        <WaitlistSubmitButton
          isSubmitting={isSubmitting}
          isSuccess={isSuccess}
          label="Join the waitlist"
          submittingLabel="Joining…"
          successLabel="You're in"
          className="h-10 px-6"
        />
      </form>

      <FormStatus id="hero-waitlist-status" message={message} className={cn("text-sm", isError ? "text-coral" : "text-white")} />
    </div>
  );
}
