import {cva, type VariantProps} from "class-variance-authority";

import {cn} from "cn";

const skeletonVariants = cva("animate-pulse", {
  variants: {
    tone: {
      default: "bg-muted",
      // Skeletons laid over the brand/dark hero surfaces.
      overlay: "bg-white/15",
    },
    shape: {
      line: "rounded-md",
      card: "rounded-lg",
    },
  },
  defaultVariants: {
    tone: "default",
    shape: "line",
  },
});

function Skeleton({className, tone, shape, ...props}: React.ComponentProps<"div"> & VariantProps<typeof skeletonVariants>) {
  return <div data-slot="skeleton" className={cn(skeletonVariants({tone, shape}), className)} {...props} />;
}

export {Skeleton, skeletonVariants};
