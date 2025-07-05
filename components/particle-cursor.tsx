"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  color: string
  velocity: { x: number; y: number }
  type: "spark" | "glow" | "trail"
}

export default function ParticleCursor() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    let particleId = 0

    const colors = {
      spark: ["#06b6d4", "#8b5cf6", "#f59e0b", "#ef4444", "#10b981"],
      glow: ["#06b6d4", "#8b5cf6", "#f59e0b"],
      trail: ["#06b6d4", "#8b5cf6"],
    }

    const createParticles = (x: number, y: number) => {
      const newParticles: Particle[] = []

      // Create spark particles
      for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * 2 * i) / 8 + Math.random() * 0.5
        const velocity = 3 + Math.random() * 4

        newParticles.push({
          id: particleId++,
          x,
          y,
          size: Math.random() * 3 + 1,
          color: colors.spark[Math.floor(Math.random() * colors.spark.length)],
          type: "spark",
          velocity: {
            x: Math.cos(angle) * velocity,
            y: Math.sin(angle) * velocity,
          },
        })
      }

      // Create glow particles
      for (let i = 0; i < 4; i++) {
        const angle = Math.random() * Math.PI * 2
        const velocity = 1 + Math.random() * 2

        newParticles.push({
          id: particleId++,
          x,
          y,
          size: Math.random() * 6 + 4,
          color: colors.glow[Math.floor(Math.random() * colors.glow.length)],
          type: "glow",
          velocity: {
            x: Math.cos(angle) * velocity,
            y: Math.sin(angle) * velocity,
          },
        })
      }

      // Create trail particles
      for (let i = 0; i < 6; i++) {
        const angle = Math.random() * Math.PI * 2
        const velocity = 0.5 + Math.random() * 1.5

        newParticles.push({
          id: particleId++,
          x,
          y,
          size: Math.random() * 2 + 1,
          color: colors.trail[Math.floor(Math.random() * colors.trail.length)],
          type: "trail",
          velocity: {
            x: Math.cos(angle) * velocity,
            y: Math.sin(angle) * velocity,
          },
        })
      }

      return newParticles
    }

    const handleClick = (e: MouseEvent) => {
      const newParticles = createParticles(e.clientX, e.clientY)

      setParticles((prev) => [...prev, ...newParticles])

      // Remove particles after animation
      setTimeout(() => {
        setParticles((prev) => prev.filter((particle) => !newParticles.some((np) => np.id === particle.id)))
      }, 2000)
    }

    document.addEventListener("click", handleClick)

    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-[9997]">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className={`absolute rounded-full ${
              particle.type === "glow" ? "blur-sm" : particle.type === "trail" ? "blur-[1px]" : ""
            }`}
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              boxShadow:
                particle.type === "spark"
                  ? `0 0 ${particle.size * 2}px ${particle.color}`
                  : particle.type === "glow"
                    ? `0 0 ${particle.size * 3}px ${particle.color}`
                    : `0 0 ${particle.size}px ${particle.color}`,
            }}
            initial={{
              scale: 0,
              x: 0,
              y: 0,
              opacity: 1,
            }}
            animate={{
              scale: particle.type === "spark" ? [0, 1, 0] : particle.type === "glow" ? [0, 1.2, 0] : [0, 1, 0.5, 0],
              x: particle.velocity.x * (particle.type === "spark" ? 60 : particle.type === "glow" ? 40 : 80),
              y:
                particle.velocity.y * (particle.type === "spark" ? 60 : particle.type === "glow" ? 40 : 80) +
                (particle.type === "spark" ? 20 : 10), // Add gravity
              opacity: particle.type === "trail" ? [1, 0.8, 0.4, 0] : [1, 1, 0],
              rotate: particle.type === "spark" ? [0, 180, 360] : 0,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: particle.type === "spark" ? 1.5 : particle.type === "glow" ? 2 : 1.8,
              ease: "easeOut",
              scale: {
                times: particle.type === "trail" ? [0, 0.3, 0.7, 1] : [0, 0.2, 1],
                duration: particle.type === "spark" ? 1.5 : particle.type === "glow" ? 2 : 1.8,
              },
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
