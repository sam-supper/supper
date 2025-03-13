import { useCallback, useEffect, useRef, type FC } from "react";
import { useMouse, useRafLoop, useWindowSize } from 'react-use'

import { clamp } from "@/lib/clamp";
import { lerp } from "@/lib/lerp";
import { easeInOutQuart, easeOutExpo } from "@/lib/animation";

import { AnimatePresence, motion } from "framer-motion";

const BOUNDS_PADDING = {
  x: 20,
  y: 72
};

interface CursorProps {
  text: string;
  hidden?: boolean;
}

export const Cursor: FC<CursorProps> = (props) => {
  const { text, hidden } = props;
  const { width, height } = useWindowSize()
  const cursorRef = useRef<any>(null)
  const cursorPos = useRef({
    current: { x: 0, y: 0 },
    target: { x: 0, y: 0 }
  })
  
  const { docX, docY, elW, elH } = useMouse(cursorRef)

  const setTargetPositions = useCallback(() => {
    const bounds = {
      x: (elW / 2) + BOUNDS_PADDING.x,
      y: ((elH / 2) + BOUNDS_PADDING.y) + window.scrollY
    }

    cursorPos.current.target.x = clamp({ value: docX, min: bounds.x, max: width - bounds.x })
    cursorPos.current.target.y = clamp({ value: docY, min: bounds.y, max: height - bounds.y })
  }, [docX, docY])

  const setCurrentPositions = useCallback(() => {
    const bounds = {
      x: (elW / 2) + BOUNDS_PADDING.x,
      y: ((elH / 2) + BOUNDS_PADDING.y) + window.scrollY
    }

    cursorPos.current.current.x = clamp({ value: docX, min: bounds.x, max: width - bounds.x })
    cursorPos.current.current.y = clamp({ value: docY, min: bounds.y, max: height - bounds.y })
  }, [docX, docY])

  useEffect(() => {
    setTargetPositions()
  }, [docX, docY])

  const [stopLoop, startLoop] = useRafLoop(() => {
    cursorPos.current.current.x = lerp({ start: cursorPos.current.current.x, end: cursorPos.current.target.x, time: 0.25 })
    cursorPos.current.current.y = lerp({ start: cursorPos.current.current.y, end: cursorPos.current.target.y, time: 0.25 })

    if (!cursorRef.current) return

    cursorRef.current.style.transform = `translate3d(${cursorPos.current.current.x - (elW / 2)}px, ${cursorPos.current.current.y - (elH / 2)}px, 0)`
  })

  useEffect(() => {
    if (!hidden) {
      stopLoop()
      requestAnimationFrame(() => {
        setTargetPositions()
        setCurrentPositions()
        startLoop()
      })
    }
  }, [hidden])

  useEffect(() => {
    return () => {
      stopLoop()
    }
  }, [])

  return (
    <motion.div
      ref={cursorRef}
      className="fixed isolate top-0 w-40 left-0 z-[3] pointer-events-none cursor-none text-nav hidden md:grid grid-contain text-center place-items-center text-white mix-blend-difference"
      initial={{ opacity: hidden ? 0 : 1 }}
      animate={{ opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.45, ease: easeOutExpo }}
    >
      <AnimatePresence>
        <motion.div
          key={text}
          className="relative will-change-transform origin-center"
          initial={{ opacity: 0, y: '50%', scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: '-50%', scale: 0.8 }}
          transition={{ duration: 0.35, ease: easeOutExpo }}
        >
          {text}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};
