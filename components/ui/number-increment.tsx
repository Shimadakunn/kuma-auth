'use client';

import { animate, useInView, useMotionValue } from 'framer-motion';
import { useEffect, useRef } from 'react';

import { cn } from '@/lib/utils';

export function NumberIncrement({
  value,
  from = 0,
  direction = 'up',
  delay = 0,
  className,
  decimalPlaces = 0,
}: {
  value: number;
  from?: number;
  direction?: 'up' | 'down';
  className?: string;
  delay?: number; // delay in s
  decimalPlaces?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === 'down' ? value : from);
  const isInView = useInView(ref, { once: true, margin: '0px' });

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = Intl.NumberFormat('en-US', {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
      }).format(direction === 'down' ? value : from);
    }
  }, []);

  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        animate(motionValue, direction === 'down' ? from : value, {
          duration: 10,
          ease: 'linear',
          onUpdate: (latest) => {
            if (ref.current) {
              ref.current.textContent = Intl.NumberFormat('en-US', {
                minimumFractionDigits: decimalPlaces,
                maximumFractionDigits: decimalPlaces,
              }).format(Number(latest.toFixed(decimalPlaces)));
            }
          },
        });
      }, delay * 1000);
    }
  }, [motionValue, isInView, delay, value, direction, from, decimalPlaces]);

  return <span className={cn('', className)} ref={ref} />;
}
