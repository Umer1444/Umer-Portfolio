"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export default function CursorEffects() {
  const [isVisible, setIsVisible] = useState(false)
  const [isPointer, setIsPointer] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)

  // Ultra-smooth spring animation for robotic precision
  const springConfig = { damping: 20, stiffness: 400, mass: 0.5 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  const updateCursor = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)

      // Enhanced interactive element detection
      const target = e.target as HTMLElement
      const isInteractive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[role='button']") ||
        target.style.cursor === "pointer" ||
        window.getComputedStyle(target).cursor === "pointer"

      setIsPointer(isInteractive)
    },
    [cursorX, cursorY],
  )

  useEffect(() => {
    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)
    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    document.addEventListener("mousemove", updateCursor, { passive: true })
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mouseenter", handleMouseEnter, { passive: true })
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true })

    return () => {
      document.removeEventListener("mousemove", updateCursor)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [updateCursor])

  // Hide on mobile/touch devices
  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0

    if (isMobile || hasTouch) {
      setIsVisible(false)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* 🤖 ROBOTIC OUTER FRAME */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 border-2 border-cyan-400 rounded-sm"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          background: "linear-gradient(45deg, rgba(6, 182, 212, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)",
          boxShadow: `
            0 0 20px rgba(6, 182, 212, 0.4),
            inset 0 0 20px rgba(6, 182, 212, 0.1),
            0 0 0 1px rgba(6, 182, 212, 0.2)
          `,
        }}
        animate={{
          scale: isPointer ? 1.5 : isClicking ? 0.7 : 1,
          rotate: isPointer ? 45 : 0,
          borderColor: isPointer ? "#f59e0b" : isClicking ? "#ef4444" : "#06b6d4",
          borderWidth: isPointer ? 3 : 2,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />

      {/* 🔄 ROTATING SCANNER RING */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-purple-400 rounded-full"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "conic-gradient(from 0deg, transparent 0%, rgba(139, 92, 246, 0.4) 25%, transparent 50%, rgba(6, 182, 212, 0.4) 75%, transparent 100%)",
          borderImage: "linear-gradient(45deg, #8b5cf6, #06b6d4) 1",
        }}
        animate={{
          rotate: 360,
          scale: isPointer ? 1.3 : isClicking ? 0.5 : 1,
        }}
        transition={{
          rotate: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
          scale: { duration: 0.2, ease: "easeOut" },
        }}
      />

      {/* ⚡ CENTRAL NEON DOT */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-cyan-400"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, #06b6d4 0%, #0891b2 100%)",
          boxShadow: `
            0 0 15px rgba(6, 182, 212, 0.8),
            0 0 30px rgba(6, 182, 212, 0.4),
            inset 0 0 10px rgba(255, 255, 255, 0.3)
          `,
        }}
        animate={{
          scale: isPointer ? 0.3 : isClicking ? 2 : [1, 1.3, 1],
          backgroundColor: isPointer ? "#f59e0b" : isClicking ? "#ef4444" : "#06b6d4",
        }}
        transition={{
          scale: isClicking
            ? { duration: 0.1 }
            : {
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              },
          backgroundColor: { duration: 0.2 },
        }}
      />

      {/* 🎯 TARGETING SYSTEM (Hover State) */}
      {isPointer && (
        <motion.div
          className="fixed top-0 left-0"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            translateX: "-50%",
            translateY: "-50%",
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
        >
          {/* Corner brackets */}
          <div className="absolute w-6 h-6 border-l-2 border-t-2 border-amber-400 top-0 left-0 transform -translate-x-3 -translate-y-3" />
          <div className="absolute w-6 h-6 border-r-2 border-t-2 border-amber-400 top-0 right-0 transform translate-x-3 -translate-y-3" />
          <div className="absolute w-6 h-6 border-l-2 border-b-2 border-amber-400 bottom-0 left-0 transform -translate-x-3 translate-y-3" />
          <div className="absolute w-6 h-6 border-r-2 border-b-2 border-amber-400 bottom-0 right-0 transform translate-x-3 translate-y-3" />

          {/* Center crosshair */}
          <div className="absolute w-4 h-0.5 bg-amber-400 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute w-0.5 h-4 bg-amber-400 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </motion.div>
      )}

      {/* 🌟 ROBOTIC GLOW AURA */}
      <motion.div
        className="fixed top-0 left-0 w-20 h-20 rounded-full blur-lg"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          background: isPointer
            ? "radial-gradient(circle, rgba(245, 158, 11, 0.3) 0%, transparent 70%)"
            : isClicking
              ? "radial-gradient(circle, rgba(239, 68, 68, 0.4) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, transparent 70%)",
        }}
        animate={{
          scale: isPointer ? 1.8 : isClicking ? 2.5 : [1, 1.2, 1],
          opacity: isPointer ? 0.9 : isClicking ? 1 : 0.6,
        }}
        transition={{
          scale: isClicking
            ? { duration: 0.2 }
            : {
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              },
          opacity: { duration: 0.3 },
        }}
      />

      {/* 🔬 SCANNING PULSE RINGS */}
      <motion.div
        className="fixed top-0 left-0 w-16 h-16 border border-cyan-300/20 rounded-full"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: [1, 2.5, 1],
          opacity: [0.4, 0, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeOut",
        }}
      />

      <motion.div
        className="fixed top-0 left-0 w-12 h-12 border border-purple-300/20 rounded-full"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: [1, 2, 1],
          opacity: [0.3, 0, 0.3],
        }}
        transition={{
          duration: 2.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeOut",
          delay: 0.5,
        }}
      />

      {/* 💫 TRAILING PARTICLES */}
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 rounded-full bg-cyan-300"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: [0, 1, 0],
          opacity: [0, 0.8, 0],
        }}
        transition={{
          duration: 1,
          repeat: Number.POSITIVE_INFINITY,
          delay: 0.1,
          ease: "easeOut",
        }}
      />

      <motion.div
        className="fixed top-0 left-0 w-1 h-1 rounded-full bg-purple-300"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: [0, 1, 0],
          opacity: [0, 0.6, 0],
        }}
        transition={{
          duration: 1.2,
          repeat: Number.POSITIVE_INFINITY,
          delay: 0.3,
          ease: "easeOut",
        }}
      />
    </div>
  )
}
