'use client'

import { useEffect } from 'react'

type Key = string
type Keys = Key[] | Key

export const useKeyPress = (targetKey: Keys, callback: () => void) => {
  useEffect(() => {
    const upHandler = ({ key }: KeyboardEvent) => {
      if (Array.isArray(targetKey)) {
        if (targetKey.includes(key)) {
          callback()
        }
      } else if (key === targetKey) {
        callback()
      }
    }

    window.addEventListener('keyup', upHandler)

    return () => {
      window.removeEventListener('keyup', upHandler)
    }
  }, [targetKey, callback])
}
