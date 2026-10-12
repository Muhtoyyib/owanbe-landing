import {Check, Loader2} from "lucide-react";

import {Button} from "@/components/ui/button";

interface WaitlistSubmitButtonProps {
  isSubmitting: boolean;
  isSuccess: boolean;
  /** Idle label, e.g. "Join the waitlist". */
  label: string;
  /** Label while the request is in flight, e.g. "Joining…". */
  submittingLabel: string;
  /** Label once joined, e.g. "You're in". */
  successLabel: string;
  /** Layout/spacing only — the `brand` variant owns the visual treatment. */
  className?: string;
}

/** Shared three-state waitlist submit button: idle → spinning → confirmed. */
export function WaitlistSubmitButton({
  isSubmitting,
  isSuccess,
  label,
  submittingLabel,
  successLabel,
  className,
}: WaitlistSubmitButtonProps) {
  return (
    <Button type="submit" variant="brand" size="lg" disabled={isSubmitting || isSuccess} className={className}>
      {isSubmitting ? (
        <>
          <Loader2 className="animate-spin" />
          {submittingLabel}
        </>
      ) : isSuccess ? (
        <>
          <Check />
          {successLabel}
        </>
      ) : (
        label
      )}
    </Button>
  );
}
