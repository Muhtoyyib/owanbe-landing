import {useState} from "react";

import {WaitlistApiError, joinWaitlist} from "../api/waitlist";
import type {WaitlistSignup} from "../api/waitlist";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Shared submit state for the two waitlist forms (hero + waitlist card) so both
 * get the same pending/success/error behaviour.
 *
 * A 409 ("already on the waitlist") is surfaced as SUCCESS, not an error: the
 * user's intent — be on the list — is satisfied, and telling them off for
 * signing up twice is worse than confirming it.
 */
export function useWaitlistSignup() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function submit(signup: WaitlistSignup) {
    setStatus("submitting");
    setMessage("");

    try {
      const result = await joinWaitlist(signup);
      setStatus("success");
      setMessage(result.message);
      return true;
    } catch (error) {
      if (error instanceof WaitlistApiError && error.alreadyJoined) {
        setStatus("success");
        setMessage("You're already on the list — we'll be in touch soon.");
        return true;
      }

      setStatus("error");
      setMessage(error instanceof WaitlistApiError ? error.message : "Something went wrong. Please try again.");
      return false;
    }
  }

  /** Drops an error back to idle so the helper text clears as the user edits. */
  function clearError() {
    if (status === "error") {
      setStatus("idle");
      setMessage("");
    }
  }

  return {
    submit,
    clearError,
    message,
    status,
    isSubmitting: status === "submitting",
    isSuccess: status === "success",
    isError: status === "error",
  };
}
