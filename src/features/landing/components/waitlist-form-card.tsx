import {useState} from "react";
import type {FormEvent} from "react";

import {WaitlistActions} from "./waitlist-actions";
import {WaitlistCardHeader} from "./waitlist-card-header";
import {WaitlistFields} from "./waitlist-fields";
import {useWaitlistSignup} from "../hooks/use-waitlist-signup";
import type {WhoYouAre} from "../api/waitlist";

/**
 * The white form card that sits on the purple waitlist section.
 * Submits to POST /api/waitlist.
 */
export function WaitlistFormCard() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<WhoYouAre | null>(null);
  const {submit, clearError, message, isSubmitting, isSuccess, isError} = useWaitlistSignup();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting || isSuccess) return;

    // The design asks for a full name but the API only stores `firstName` (and
    // rejects unknown fields), so we send the leading token and let the rest go.
    const firstName = name.trim().split(/\s+/)[0];

    await submit({
      email: email.trim(),
      ...(firstName ? {firstName} : {}),
      ...(role ? {whoYouAre: role} : {}),
    });
  }

  return (
    <div className="w-full max-w-lg rounded-3xl bg-card p-6 shadow-xl md:p-10">
      <WaitlistCardHeader />

      <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-7">
        <WaitlistFields
          name={name}
          email={email}
          role={role}
          disabled={isSubmitting || isSuccess}
          isError={isError}
          hasMessage={Boolean(message)}
          onNameChange={setName}
          onEmailChange={(value) => {
            setEmail(value);
            clearError();
          }}
          onRoleChange={setRole}
        />
        <WaitlistActions isSubmitting={isSubmitting} isSuccess={isSuccess} isError={isError} message={message} />
      </form>
    </div>
  );
}
