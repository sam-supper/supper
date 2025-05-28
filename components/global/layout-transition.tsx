"use client";
 
import { useContext, useEffect, useRef, useCallback, useMemo } from "react";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";
import { useLenis } from "lenis/react";

import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { AnimatePresence, motion } from "motion/react";
 
function usePreviousValue<T>(value: T): T | undefined {
  const prevValue = useRef<T | undefined>(undefined);
 
  useEffect(() => {
    prevValue.current = value;
    return () => {
      prevValue.current = undefined;
    };
  });
 
  return prevValue.current;
}
 
function FrozenRouter(props: { children: React.ReactNode }) {
  const context = useContext(LayoutRouterContext);
  const prevContext = usePreviousValue(context) || null;
 
  const url = context?.url;
  const prevUrl = prevContext?.url;
  const segment = useSelectedLayoutSegment();
  const prevSegment = usePreviousValue(segment);
 
  const changed =
    (
      segment !== prevSegment &&
      segment !== undefined &&
      prevSegment !== undefined
    ) || (
      url !== prevUrl &&
      url !== undefined &&
      prevUrl !== undefined
    )
 
  return (
    <LayoutRouterContext.Provider value={changed ? prevContext : context}>
      {props.children}
    </LayoutRouterContext.Provider>
  );
}
 
interface TransitionProps {
  children: React.ReactNode;
  className?: React.ComponentProps<typeof motion.div>["className"];
  style?: React.ComponentProps<typeof motion.div>["style"];
}
 
export function LayoutTransition({
  children,
  className,
  style,
}: TransitionProps) {
  const segment = useSelectedLayoutSegment();
  const lenis = useLenis();
  const pathname = usePathname();

  const key = useMemo(() => {
    return `${segment}-${pathname}`
  }, [segment, pathname])

  const scrollToTop = useCallback(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [lenis])
 
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        className={className}
        style={style}
        key={key}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{
          opacity: 0,
          transition: {
            duration: 0.45,
            ease: 'easeInOut',
            onComplete: scrollToTop
          }
        }}
        transition={{
          duration: 0.45,
          ease: 'easeInOut',
        }}
      >
        <FrozenRouter>{children}</FrozenRouter>
      </motion.div>
    </AnimatePresence>
  );
}