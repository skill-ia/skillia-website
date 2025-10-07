'use client';


import { motion, type HTMLMotionProps } from 'motion/react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  '',
  {
    variants: {
      variant: {
        default:
          'text-foreground font-black bg-success/20 hover:bg-success hover:text-primary p-4 rounded-xl cursor-pointer',
        primary:
          'p-4 rounded-xl text-primary font-medium text-lg bg-transparent hover:bg-[var(--button-color)] hover:text-foreground transition-all duration-200 cursor-pointer border-1 border-[var(--button-color)] hover:border-transparent hover:shadow-[0_0_20px_8px_rgba(27,249,169,0.1)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

type LiquidButtonProps = HTMLMotionProps<'button'> &
  VariantProps<typeof buttonVariants>;

function LiquidButton({
  className,
  variant,
  ...props
}: LiquidButtonProps) {
  return (
    <motion.button
      className={cn(buttonVariants({ variant, className }))}
      {...props}
    />
  );
}

export { LiquidButton, type LiquidButtonProps };