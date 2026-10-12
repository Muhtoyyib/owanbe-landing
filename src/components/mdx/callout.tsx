import {cn} from "cn";

type CalloutType = "info" | "warn" | "tip";

const TYPE_STYLES: Record<CalloutType, string> = {
  info: "border-brand/40 bg-brand-lighter text-foreground",
  warn: "border-coral/50 bg-coral/10 text-foreground",
  tip: "border-emerald-500/40 bg-emerald-50 text-foreground",
};

export function Callout({type = "info", children}: {type?: CalloutType; children: React.ReactNode}) {
  return <aside className={cn("rounded-xl border px-5 py-4 text-sm leading-6", TYPE_STYLES[type])}>{children}</aside>;
}
