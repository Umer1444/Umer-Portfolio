"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

interface MagneticCursorProps {
  children: React.ReactNode
  className?: string
  strength?: number
}

export default function MagneticCursor({ children, className = "", strength = 0.15 }: MagneticCursorProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Smooth spring config
  const springConfig = { damping: 20, stiffness: 200 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const deltaX = e.clientX - centerX
      const deltaY = e.clientY - centerY

      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
      const maxDistance = Math.max(rect.width, rect.height) * 0.7

      if (distance < maxDistance) {
        const force = (maxDistance - distance) / maxDistance
        x.set(deltaX * strength * force)
        y.set(deltaY * strength * force)
      }
    }

    const handleMouseLeave = () => {
      x.set(0)
      y.set(0)
    }

    element.addEventListener("mousemove", handleMouseMove, { passive: true })
    element.addEventListener("mouseleave", handleMouseLeave, { passive: true })

    return () => {
      element.removeEventListener("mousemove", handleMouseMove)
      element.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [x, y, strength])

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        x: xSpring,
        y: ySpring,
      }}
    >
      {children}
    </motion.div>
  )
}
