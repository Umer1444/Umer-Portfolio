"use client"

import { useEffect, useState } from "react"

export function useDebouncedScroll(delay = 100) {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const handleScroll = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setScrollY(window.scrollY)
      }, delay)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(timeoutId)
    }
  }, [delay])

  return scrollY
}
