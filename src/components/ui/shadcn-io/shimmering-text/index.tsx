'use client';

import * as React from 'react';
import { type HTMLMotionProps, motion, type Transition } from 'motion/react';

import { cn } from '@/lib/utils';

type ShimmeringTextProps = {
  text: string;
  duration?: number;
  transition?: Transition;
  wave?: boolean;
  color?: string;
  shimmeringColor?: string;
} & Omit<HTMLMotionProps<'span'>, 'children'>;

function ShimmeringText({
  text,
  duration = 1,
  transition,
  wave = false,
  className,
  color = 'var(--color-neutral-500)',
  shimmeringColor = 'var(--color-neutral-300)',
  ...props
}: ShimmeringTextProps) {
  // Split text into words to preserve word boundaries
  const words = text?.split(' ') || [];

  // Calculate total character count for proper delay distribution
  let charCount = 0;

  return (
    <motion.span
      className={cn('relative inline [perspective:500px]', className)}
      style={
        {
          '--shimmering-color': shimmeringColor,
          '--color': color,
          color: 'var(--color)',
        } as React.CSSProperties
      }
      {...props}
    >
      {words.map((word, wordIndex) => {
        const wordStartIndex = charCount;
        return (
          <React.Fragment key={wordIndex}>
            <span className="inline-block whitespace-nowrap">
              {word.split('').map((char, charIndex) => {
                const globalCharIndex = wordStartIndex + charIndex;
                if (charIndex === word.length - 1) {
                  charCount += word.length + 1; // +1 for space
                }
                return (
                  <motion.span
                    key={`${wordIndex}-${charIndex}`}
                    className="inline-block [transform-style:preserve-3d]"
                    initial={{
                      ...(wave
                        ? {
                            scale: 1,
                            rotateY: 0,
                          }
                        : {}),
                      color: 'var(--color)',
                    }}
                    animate={{
                      ...(wave
                        ? {
                            x: [0, 5, 0],
                            y: [0, -5, 0],
                            scale: [1, 1.1, 1],
                            rotateY: [0, 15, 0],
                          }
                        : {}),
                      color: ['var(--color)', 'var(--shimmering-color)', 'var(--color)'],
                    }}
                    transition={{
                      duration,
                      repeat: Infinity,
                      repeatType: 'loop',
                      repeatDelay: text.length * 0.05,
                      delay: (globalCharIndex * duration) / text.length,
                      ease: 'easeInOut',
                      ...transition,
                    }}
                  >
                    {char}
                  </motion.span>
                );
              })}
            </span>
            {wordIndex < words.length - 1 && ' '}
          </React.Fragment>
        );
      })}
    </motion.span>
  );
}

export { ShimmeringText, type ShimmeringTextProps };