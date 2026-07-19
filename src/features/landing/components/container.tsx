import { cn } from "@/lib/utils"

/**
 * Centered content column. The Figma layout uses a 1440px canvas with 240px
 * side margins → a 960px content width, which maps to max-w-5xl here.
 */
export function Container({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-5xl px-6", className)}
      {...props}
    />
  )
}
