import {cn} from "cn";

import {BRAND_NAME} from "../data";
import Logo from "@/components/assets/images/logo.svg";

interface BrandLogoProps {
  className?: string;
  /** dark = white text (over the dark hero nav); light = foreground text (footer). */
  tone?: "light" | "dark";
}

export function BrandLogo({className, tone = "light"}: BrandLogoProps) {
  return (
    <span
      className={cn(
        "flex items-center gap-2 font-display text-lg font-semibold",
        tone === "dark" ? "text-white" : "text-foreground",
        className
      )}
    >
      <img src={Logo} alt="" aria-hidden="true" />
      <span className="trim-cap font-display">{BRAND_NAME}</span>
    </span>
  );
}
