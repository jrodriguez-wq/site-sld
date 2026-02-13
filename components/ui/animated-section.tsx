"use client";

import * as React from "react";
import { useInView } from "react-intersection-observer";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  /** Root margin for intersection (e.g. "0px 0px -80px 0px" to trigger earlier) */
  rootMargin?: string;
  /** Custom variants; default is fade-up */
  variants?: Variants;
  /** Stagger delay for children when using AnimatedSection.Stagger */
  staggerDelay?: number;
}

export const AnimatedSection = ({
  children,
  delay = 0,
  className,
  rootMargin = "0px 0px -60px 0px",
  variants = defaultVariants,
}: AnimatedSectionProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      transition={{ delay: delay * 0.1 }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.03 },
  },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

interface AnimatedStaggerProps {
  children: React.ReactNode;
  className?: string;
  rootMargin?: string;
  itemClass?: string;
}

/** Use with AnimatedSection for viewport-triggered stagger of direct children */
AnimatedSection.Stagger = function AnimatedStagger({
  children,
  className,
  rootMargin = "0px 0px -60px 0px",
  itemClass,
}: AnimatedStaggerProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin,
    threshold: 0.05,
  });

  const items = React.Children.toArray(children);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={staggerContainer}
      className={cn(className)}
    >
      {items.map((child, i) => (
        <motion.div key={i} variants={staggerItem} className={itemClass}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};
