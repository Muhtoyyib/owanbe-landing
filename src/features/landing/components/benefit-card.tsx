import type {Benefit} from "../types";

interface BenefitCardProps {
  benefit: Benefit;
}

/**
 * Presentational card for a single "why join early" benefit — an icon tile
 * above a title and supporting description on a light gray surface.
 */
export function BenefitCard({benefit}: BenefitCardProps) {
  const Icon = benefit.icon;
  return (
    <div className="rounded-2xl bg-muted p-7 space-y-3">
      <div className="flex size-10 items-center justify-center rounded-lg bg-brand-lighter">
        <Icon className="size-6 text-brand" />
      </div>
      <h3 className="text-lg text-strong font-medium text-foreground">{benefit.title}</h3>
      <p className="text-sm text-muted-foreground">{benefit.description}</p>
    </div>
  );
}
