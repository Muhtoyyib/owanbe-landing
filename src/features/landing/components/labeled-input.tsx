import type {ComponentProps, ReactNode} from "react";

import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";

interface LabeledInputProps extends Omit<ComponentProps<typeof Input>, "id"> {
  id: string;
  label: string;
  /** Leading icon rendered inside the field, e.g. <Mail />. */
  icon: ReactNode;
}

/** Label + icon-annotated input pair used across the waitlist forms. */
export function LabeledInput({id, label, icon, ...inputProps}: LabeledInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground [&_svg]:size-4">{icon}</span>
        <Input id={id} className="h-11 pl-9" {...inputProps} />
      </div>
    </div>
  );
}
