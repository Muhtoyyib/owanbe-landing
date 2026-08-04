import { cn } from "@/lib/utils"

import { ROLES } from "../data"
import type { WhoYouAre } from "../api/waitlist"

interface RoleSelectorProps {
  value: WhoYouAre | null
  onChange: (id: WhoYouAre) => void
  disabled?: boolean
}

/**
 * Responsive grid of selectable role chips for the "I am a…" field.
 * Single responsibility: render ROLES and surface the selected id.
 */
export function RoleSelector({
  value,
  onChange,
  disabled,
}: RoleSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {ROLES.map((role) => {
        const selected = value === role.id
        return (
          <button
            key={role.id}
            type="button"
            onClick={() => onChange(role.id)}
            disabled={disabled}
            aria-pressed={selected}
            className={cn(
              "rounded-lg border px-3 py-2.5 text-sm transition disabled:pointer-events-none",
              selected
                ? "border-brand bg-brand-lighter font-medium text-brand"
                : "border-border bg-muted/50 text-muted-foreground hover:bg-muted"
            )}
          >
            {role.label}
          </button>
        )
      })}
    </div>
  )
}
