import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-base font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring [&_svg]:size-4",
  { variants: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      outline: "border border-border bg-transparent text-foreground hover:bg-muted",
      ghost: "text-foreground hover:bg-muted",
    },
    size: { default: "min-h-11 px-5 py-3", sm: "min-h-10 px-4 py-2", icon: "size-11" },
  }, defaultVariants: { variant: "default", size: "default" } },
);

type ButtonProps = React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean };

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
