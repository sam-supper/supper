'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function GAListener() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // do not track Sanity Studio if you mount it at /studio
    if (pathname?.startsWith('/studio')) return

    const page_path =
      pathname + (searchParams && searchParams.toString() ? `?${searchParams}` : '')

    // @ts-ignore - gtag is injected by the GA script
    window.gtag?.('event', 'page_view', { page_path })
  }, [pathname, searchParams])

  return null
}
