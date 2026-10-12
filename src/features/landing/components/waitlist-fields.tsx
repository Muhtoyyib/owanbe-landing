import {Mail, User} from "lucide-react";

import {LabeledInput} from "./labeled-input";
import {RoleSelector} from "./role-selector";
import type {WhoYouAre} from "../api/waitlist";

interface WaitlistFieldsProps {
  name: string;
  email: string;
  role: WhoYouAre | null;
  /** true while a request is in flight or after success — inputs lock either way. */
  disabled: boolean;
  isError: boolean;
  hasMessage: boolean;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onRoleChange: (value: WhoYouAre | null) => void;
}

/** The name / email / role field column inside the waitlist card. */
export function WaitlistFields({
  name,
  email,
  role,
  disabled,
  isError,
  hasMessage,
  onNameChange,
  onEmailChange,
  onRoleChange,
}: WaitlistFieldsProps) {
  return (
    <div className="space-y-5">
      <LabeledInput
        id="waitlist-name"
        label="Full name"
        icon={<User />}
        value={name}
        onChange={(event) => onNameChange(event.target.value)}
        disabled={disabled}
        placeholder="Enter your full name"
      />
      <LabeledInput
        id="waitlist-email"
        label="Email address"
        icon={<Mail />}
        type="email"
        required
        value={email}
        onChange={(event) => onEmailChange(event.target.value)}
        disabled={disabled}
        placeholder="Enter your email address"
        aria-invalid={isError || undefined}
        aria-describedby={hasMessage ? "waitlist-status" : undefined}
      />
      <div className="flex flex-col gap-2">
        <span className="text-sm leading-none font-medium">I am a…</span>
        <RoleSelector value={role} onChange={onRoleChange} disabled={disabled} />
      </div>
    </div>
  );
}
