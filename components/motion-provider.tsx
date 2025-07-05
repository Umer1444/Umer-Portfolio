"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

interface MotionContextType {
  prefersReducedMotion: boolean
  toggleReducedMotion: () => void
}

const MotionContext = createContext<MotionContextType | undefined>(undefined)

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  const toggleReducedMotion = () => {
    setPrefersReducedMotion(!prefersReducedMotion)
    localStorage.setItem("reduced-motion", (!prefersReducedMotion).toString())
  }

  useEffect(() => {
    const saved = localStorage.getItem("reduced-motion")
    if (saved) {
      setPrefersReducedMotion(saved === "true")
    }
  }, [])

  return (
    <MotionContext.Provider value={{ prefersReducedMotion, toggleReducedMotion }}>{children}</MotionContext.Provider>
  )
}

export function useMotion() {
  const context = useContext(MotionContext)
  if (!context) {
    throw new Error("useMotion must be used within MotionProvider")
  }
  return context
}
