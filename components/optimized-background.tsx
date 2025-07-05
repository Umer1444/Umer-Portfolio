"use client"

import { motion } from "framer-motion"
import { useMotion } from "@/components/motion-provider"

export default function OptimizedBackground() {
  const { prefersReducedMotion } = useMotion()

  return (
    <div className="fixed inset-0 z-0">
      {/* Base gradient background - static for performance */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-950/30 to-black" />

      {/* Simplified animated elements only if motion is allowed */}
      {!prefersReducedMotion && (
        <>
          {/* Reduced number of animated orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 15,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute top-1/4 left-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl will-change-transform"
            />

            <motion.div
              animate={{
                scale: [1.1, 1, 1.2],
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{
                duration: 18,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 5,
              }}
              className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-violet-600/25 rounded-full blur-3xl will-change-transform"
            />
          </div>

          {/* Single scanning line instead of multiple */}
          <motion.div
            className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400/30 to-transparent"
            animate={{
              y: ["-100vh", "100vh"],
            }}
            transition={{
              duration: 12,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{ willChange: "transform" }}
          />
        </>
      )}

      {/* Static grid pattern - no animation for performance */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(147, 51, 234, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(147, 51, 234, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Static noise texture */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' fill='%23a855f7'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}
