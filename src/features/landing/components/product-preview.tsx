import { Skeleton } from "@/components/ui/skeleton"

interface ProductPreviewProps {
  title: string
  variant?: "grid" | "list"
}

/**
 * Reusable mock "app window" card standing in for a product screenshot. The
 * body is faked with Skeleton blocks so the Glimpse section hints at real UI.
 */
export function ProductPreview({ title, variant = "grid" }: ProductPreviewProps) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b px-5 py-4">
        <span className="font-medium">{title}</span>
        <span className="text-muted-foreground/60">×</span>
      </div>
      <div className="p-5">
        {variant === "grid" ? (
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="flex flex-col gap-2">
                <Skeleton className="aspect-video w-full rounded-lg" />
                <Skeleton className="h-2.5 w-full" />
                <Skeleton className="h-2.5 w-2/3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex items-center gap-3">
                <Skeleton className="size-10 shrink-0 rounded-md" />
                <div className="flex flex-1 flex-col gap-2">
                  <Skeleton className="h-2.5 w-3/4" />
                  <Skeleton className="h-2.5 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center justify-between border-t px-5 py-4">
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-4 rounded-full bg-brand" />
          <span className="size-1.5 rounded-full bg-muted" />
          <span className="size-1.5 rounded-full bg-muted" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-16 rounded-md" />
          <Skeleton className="h-8 w-16 rounded-md" />
        </div>
      </div>
    </div>
  )
}
