import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[10px] text-sm font-mono ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-[#5E6AD2] text-white h-[44px] px-6 hover:bg-[#5E6AD2]/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-white/08 bg-transparent text-white hover:bg-white/5",
        secondary: "bg-[#0F1011] text-white border border-white/08 hover:bg-white/5",
        ghost: "text-white/50 hover:text-white",
        link: "text-[#5E6AD2] underline-offset-4 hover:underline",
        accent: "bg-[#5E6AD2] text-white hover:bg-[#5E6AD2]/90",
        "accent-outline": "border-2 border-[#5E6AD2] text-[#5E6AD2] bg-transparent hover:bg-[#5E6AD2] hover:text-white",
        hero: "bg-[#5E6AD2] text-white hover:bg-[#5E6AD2]/90 hover:scale-[1.02] active:scale-[0.98] text-base px-8 py-6 h-14 shadow-lg shadow-[#5E6AD2]/0 hover:shadow-[#5E6AD2]/20",
        "hero-secondary": "border border-white/08 text-white bg-transparent hover:bg-white/5 text-base px-8 py-6 h-14",
        nav: "hover:bg-transparent",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        xl: "h-14 px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
