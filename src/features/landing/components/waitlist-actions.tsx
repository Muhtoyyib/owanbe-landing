import {Info} from "lucide-react";

import {cn} from "cn";

import {FormStatus} from "./form-status";
import {WaitlistSubmitButton} from "./waitlist-submit-button";

interface WaitlistActionsProps {
  isSubmitting: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: string | null;
}

/** Submit button, aria-live status line, and the no-spam footnote. */
export function WaitlistActions({isSubmitting, isSuccess, isError, message}: WaitlistActionsProps) {
  return (
    <div className="space-y-3">
      <WaitlistSubmitButton
        isSubmitting={isSubmitting}
        isSuccess={isSuccess}
        label="Reserve your spot"
        submittingLabel="Reserving your spot…"
        successLabel="You're on the list"
        className="w-full py-3"
      />
      <FormStatus
        id="waitlist-status"
        message={message}
        className={cn("text-center text-sm", isError ? "text-destructive" : "text-brand")}
      />
      <div className="text-soft flex items-center justify-center gap-1.5 text-xs">
        <Info className="size-3.5" />
        <span>No spam. We'll only reach out with launch updates and early access.</span>
      </div>
    </div>
  );
}
