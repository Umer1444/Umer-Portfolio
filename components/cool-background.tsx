"use client"

import { motion } from "framer-motion"

export default function CoolBackground() {
  return (
    <div className="fixed inset-0 z-0">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-950/40 to-black dark:from-black dark:via-purple-950/40 dark:to-black light:from-gray-50 light:via-purple-50 light:to-gray-100" />

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.7, 0.4],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 dark:bg-purple-500/30 light:bg-purple-300/20 rounded-full blur-3xl"
        />

        <motion.div
          animate={{
            scale: [1.2, 1, 1.4],
            opacity: [0.5, 0.8, 0.5],
            x: [0, -40, 0],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 3,
          }}
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-violet-600/40 dark:bg-violet-600/40 light:bg-violet-400/25 rounded-full blur-3xl"
        />

        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 6,
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-600/35 dark:bg-indigo-600/35 light:bg-indigo-400/20 rounded-full blur-2xl"
        />

        <motion.div
          animate={{
            scale: [1.1, 1, 1.3],
            opacity: [0.6, 0.3, 0.6],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            delay: 2,
          }}
          className="absolute top-3/4 left-1/6 w-64 h-64 bg-purple-400/25 dark:bg-purple-400/25 light:bg-purple-300/15 rounded-full blur-2xl"
        />
      </div>

      {/* Futuristic grid pattern */}
      <div className="absolute inset-0 opacity-15 dark:opacity-15 light:opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(147, 51, 234, 0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(147, 51, 234, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Diagonal tech grid */}
      <div className="absolute inset-0 opacity-8 dark:opacity-8 light:opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(45deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px),
              linear-gradient(-45deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Animated scanning lines */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400/50 dark:via-purple-400/50 light:via-purple-500/30 to-transparent"
          animate={{
            y: ["-100vh", "100vh"],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-violet-400/30 dark:via-violet-400/30 light:via-violet-500/20 to-transparent"
          animate={{
            y: ["-100vh", "100vh"],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            delay: 4,
          }}
        />
      </div>

      {/* Pulsing energy rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="absolute w-96 h-96 border border-purple-500/15 dark:border-purple-500/15 light:border-purple-400/10 rounded-full"
          animate={{
            scale: [1, 2.2, 1],
            opacity: [0.4, 0, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeOut",
          }}
        />
        <motion.div
          className="absolute w-64 h-64 border border-violet-400/20 dark:border-violet-400/20 light:border-violet-400/12 rounded-full"
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.6, 0, 0.6],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute w-32 h-32 border border-indigo-400/25 dark:border-indigo-400/25 light:border-indigo-400/15 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.7, 0, 0.7],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeOut",
            delay: 2,
          }}
        />
      </div>

      {/* Glowing circuit lines */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/40 dark:via-purple-400/40 light:via-purple-500/25 to-transparent"
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scaleX: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-400/30 dark:via-violet-400/30 light:via-violet-500/20 to-transparent"
          animate={{
            opacity: [0.2, 0.6, 0.2],
            scaleX: [1, 0.9, 1],
          }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute left-1/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-indigo-400/25 dark:via-indigo-400/25 light:via-indigo-500/15 to-transparent"
          animate={{
            opacity: [0.4, 0.7, 0.4],
            scaleY: [0.9, 1.1, 0.9],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute right-1/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-purple-400/30 dark:via-purple-400/30 light:via-purple-500/20 to-transparent"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scaleY: [1, 0.8, 1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 3,
          }}
        />
      </div>

      {/* Floating energy particles */}
      <div className="absolute inset-0">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 3 + 1 + "px",
              height: Math.random() * 3 + 1 + "px",
              backgroundColor: `hsl(${270 + Math.random() * 60}, 70%, ${50 + Math.random() * 30}%)`,
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
            }}
            animate={{
              y: [0, -80, 0],
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Hexagonal tech pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-5 light:opacity-3">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23a855f7' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Holographic overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-500/3 dark:from-purple-500/3 light:from-purple-400/2 via-transparent to-violet-500/3 dark:to-violet-500/3 light:to-violet-400/2"
        animate={{
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Noise texture for depth */}
      <div
        className="absolute inset-0 opacity-8 dark:opacity-8 light:opacity-4"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' fill='%23a855f7'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}
