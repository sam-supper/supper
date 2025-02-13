'use client'

import { useState, type FC } from "react";
import { motion } from "framer-motion";

export const EnterAnimation: FC = () => {
  const [mounted, setMounted] = useState(false)

  if (mounted) return null;

  return (
    <motion.div
      inert
      initial={{ opacity: 1 }}
      animate={{ 
        opacity: 0,
        transition: { duration: 0.65, delay: 0.15, ease: 'easeInOut', onComplete: () => setMounted(true) }
      }}
      className="fixed inset-0 w-full h-[100lvh] bg-grey-light z-[9999]"
    />
  )

}