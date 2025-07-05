"use client"

import { useState, useEffect, useRef, type ReactNode } from "react"

interface LazySectionProps {
  children: ReactNode
  fallback?: ReactNode
  rootMargin?: string
}

export default function LazySection({
  children,
  fallback = <div className="h-96 bg-purple-500/5 animate-pulse rounded-lg" />,
  rootMargin = "100px",
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [rootMargin])

  return <div ref={ref}>{isVisible ? children : fallback}</div>
}
