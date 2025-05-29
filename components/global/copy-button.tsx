'use client'

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { easeOutExpo } from "@/lib/animation"

interface CopyButtonProps extends React.ComponentProps<'button'> {
  text: string
  children: React.ReactNode
}

export const CopyButton: React.FC<CopyButtonProps> = (props) => {
  const { text, children, className, ...rest } = props

  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = () => {
    if (typeof window === 'undefined') return;

    navigator.clipboard.writeText(text)
    setIsCopied(true)

    setTimeout(() => {
      setIsCopied(false)
    }, 3000)
  }

  return (
    <button
      onClick={handleCopy}
      disabled={isCopied}
      className={`${className} grid-contain cursor-pointer text-left`}
      {...rest}
    >
      <AnimatePresence>
        {isCopied ? (
          <motion.span
            key="copied"
            className="block will-change-transform"
            initial={{ opacity: 0, y:  8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.65, ease: easeOutExpo }}
          >
            Copied
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            className="block will-change-transform"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.65, ease: easeOutExpo }}
          >
            {children}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}