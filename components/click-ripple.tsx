"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Ripple {
  id: number
  x: number
  y: number
}

export default function ClickRipple() {
  const [ripples, setRipples] = useState<Ripple[]>([])

  const playAudio = () => {
    if (typeof window !== "undefined" && (window as any).audioManager) {
      const audioManager = (window as any).audioManager
      audioManager.playClickSound()
    }
  }

  useEffect(() => {
    let rippleId = 0

    const handleClick = (e: MouseEvent) => {
      playAudio()

      // Create multiple ripple effects
      const newRipples: Ripple[] = [
        {
          id: rippleId++,
          x: e.clientX,
          y: e.clientY,
        },
        {
          id: rippleId++,
          x: e.clientX,
          y: e.clientY,
        },
      ]

      setRipples((prev) => [...prev, ...newRipples])

      // Remove ripples after animation
      setTimeout(() => {
        setRipples((prev) => prev.filter((ripple) => !newRipples.some((nr) => nr.id === ripple.id)))
      }, 1500)
    }

    document.addEventListener("click", handleClick)

    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-[9998]">
      <AnimatePresence>
        {ripples.map((ripple, index) => (
          <motion.div
            key={ripple.id}
            className={`absolute rounded-full ${
              index % 2 === 0
                ? "border-2 border-cyan-400/60 bg-cyan-400/5"
                : "border border-purple-400/40 bg-purple-400/5"
            }`}
            style={{
              left: ripple.x,
              top: ripple.y,
              translateX: "-50%",
              translateY: "-50%",
            }}
            initial={{ width: 0, height: 0, opacity: 1 }}
            animate={{
              width: index % 2 === 0 ? 120 : 80,
              height: index % 2 === 0 ? 120 : 80,
              opacity: 0,
              borderWidth: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: index % 2 === 0 ? 1 : 0.8,
              ease: "easeOut",
              delay: index % 2 === 0 ? 0 : 0.1,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
