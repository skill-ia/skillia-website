import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva("", {
  variants: {
    variant: {
      default:
        "flex items-center justify-center gap-2 bg-transparent text-foreground/50 font-medium hover:text-foreground hover:bg-foreground/5 px-3 py-2 rounded-xl cursor-pointer transition-all duration-200 supports-[backdrop-filter]:backdrop-blur-sm max-lg:text-xs",
      "default-selected":
        "bg-foreground/10 text-foreground font-medium hover:text-foreground px-3 py-2 rounded-xl cursor-pointer transition-all duration-200 supports-[backdrop-filter]:backdrop-blur-sm max-lg:text-xs",
      outline:
        "bg-transparent border-1 border-border hover:border-[var(--border-focus)] text-foreground/50 font-medium hover:text-foreground px-3 py-2 rounded-xl cursor-pointer transition-all duration-200 supports-[backdrop-filter]:backdrop-blur-sm max-lg:text-xs",
      subtle:
        "bg-transparent flex items-center justify-center text-foreground/50 font-medium hover:text-foreground px-6 py-2 rounded-xl cursor-pointer transition-all duration-200",
      primary:
        "bg-[var(--button-color)] text-foreground font-medium hover:bg-[var(--button-color)]/80 px-6 py-2 rounded-xl cursor-pointer",
      secondary:
        "bg-transparent text-primary/80 font-medium hover:text-primary px-6 py-2 rounded-xl cursor-pointer",
      "main-hero-button":
        "flex p-4 max-sm:w-full items-center justify-center rounded-xl text-background font-medium text-sm lg:text-lg bg-[var(--button-color)] hover:bg-transparent hover:text-foreground transition-all duration-200 cursor-pointer border-1 border-transparent hover:border-[var(--button-color)] lg:mt-6",
      "secondary-hero-button":
        "flex p-4 max-sm:w-full items-center justify-center rounded-xl text-foreground font-medium text-sm lg:text-lg bg-transparent hover:bg-[var(--button-color)] hover:text-background transition-all duration-200 cursor-pointer border-1 border-[var(--button-color)] hover:border-transparent lg:mt-6 gap-2 items-center max-lg:mt-4",
      "navbar-signup":
        "flex p-2 max-sm:w-full items-center justify-center rounded-xl text-background font-medium text-sm lg:text-lg bg-[var(--button-color)] hover:bg-transparent hover:text-foreground transition-all duration-200 cursor-pointer border-1 border-transparent hover:border-[var(--button-color)]",
      "navbar-login":
        "flex p-2 max-sm:w-full items-center justify-center rounded-xl text-foreground font-medium text-sm lg:text-lg bg-transparent hover:bg-[var(--button-color)] hover:text-background transition-all duration-200 cursor-pointer border-1 border-[var(--button-color)] hover:border-transparent gap-2 items-center",
      "open-community-card-button":
        "w-full py-4 px-6 bg-transparent hover:bg-background text-primary hover:text-foreground font-medium text-lg rounded-xl transition-all duration-200 cursor-pointer border-1 border-gray-300 hover:border-transparent hover:shadow-[0_0_20px_8px_rgba(27,249,169,0.1)] flex items-center justify-center gap-2",
      "private-community-card-button":
        "w-full py-4 px-6 bg-transparent hover:bg-[var(--button-color)] text-primary hover:text-foreground font-medium text-lg rounded-xl transition-all duration-200 cursor-pointer border-1 border-[var(--button-color)] hover:border-transparent hover:shadow-[0_0_20px_8px_rgba(27,249,169,0.1)] flex items-center justify-center gap-2",
      "courses-card-button":
        "w-full py-4 px-6 bg-[var(--button-color)] hover:bg-transparent text-foreground hover:text-primary font-medium text-lg rounded-xl transition-all duration-200 cursor-pointer border-1 border-[var(--button-color)] hover:border-[var(--button-color)] hover:shadow-[0_0_20px_8px_rgba(27,249,169,0.1)] flex items-center justify-center gap-2",
      "risk-warning-button":
        "w-full py-4 px-6 bg-[var(--button-color)] hover:bg-transparent text-background hover:text-primary font-medium text-base lg:text-lg rounded-xl transition-all duration-200 cursor-pointer border-1 border-[var(--button-color)] hover:border-[var(--button-color)] flex items-center justify-center gap-2",
    },
  },
  defaultVariants: {
    variant: "subtle",
  },
});

function Button({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
