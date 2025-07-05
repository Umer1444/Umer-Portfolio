"use client"

import { useEffect, useState, lazy, Suspense } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowDown, Download, MapPin, Phone, Mail, Sparkles } from "lucide-react"
import { useMotion } from "@/components/motion-provider"

// Lazy load heavy components
const MagneticCursor = lazy(() => import("@/components/magnetic-cursor"))

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const { prefersReducedMotion } = useMotion()

  const titles = ["AI Engineer", "Hackathon Champ", "PWA Pioneer", "Full-stack Developer"]

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 })

  const rotateX = useTransform(springY, [-300, 300], [5, -5])
  const rotateY = useTransform(springX, [-300, 300], [-5, 5])

  useEffect(() => {
    if (prefersReducedMotion) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.getElementById("hero")?.getBoundingClientRect()
      if (rect) {
        mouseX.set(e.clientX - rect.left - rect.width / 2)
        mouseY.set(e.clientY - rect.top - rect.height / 2)
      }
    }

    document.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY, prefersReducedMotion])

  // Optimized typing animation
  useEffect(() => {
    const currentTitle = titles[currentIndex]
    let timeoutId: NodeJS.Timeout

    if (isTyping) {
      if (displayText.length < currentTitle.length) {
        timeoutId = setTimeout(() => {
          setDisplayText(currentTitle.slice(0, displayText.length + 1))
        }, 120)
      } else {
        timeoutId = setTimeout(() => {
          setIsTyping(false)
        }, 2500)
      }
    } else {
      if (displayText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, 60)
      } else {
        setCurrentIndex((prev) => (prev + 1) % titles.length)
        setIsTyping(true)
      }
    }

    return () => clearTimeout(timeoutId)
  }, [displayText, isTyping, currentIndex, titles])

  const handleScrollToAbout = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleScrollToContact = () => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleScrollToResume = () => {
    const resumeSection = document.getElementById("resume")
    if (resumeSection) {
      resumeSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Simplified floating cards - only if motion is enabled */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-24 h-24 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-xl backdrop-blur-sm border border-purple-500/10"
              style={{
                left: `${30 + i * 20}%`,
                top: `${30 + (i % 2) * 30}%`,
                rotateX: prefersReducedMotion ? 0 : rotateX,
                rotateY: prefersReducedMotion ? 0 : rotateY,
              }}
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 6 + i * 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.1 : 0.8 }}
          className="space-y-6"
        >
          {/* Profile with responsive sizing */}
          <Suspense fallback={<div className="w-32 h-32 mx-auto mb-6 bg-purple-500/20 rounded-full" />}>
            <MagneticCursor strength={prefersReducedMotion ? 0 : 0.1}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: prefersReducedMotion ? 0.1 : 0.6, delay: 0.2 }}
                className="relative mx-auto w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mb-6 cursor-pointer"
              >
                <div className="w-full h-full rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 p-1">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-xl sm:text-2xl md:text-3xl font-bold relative overflow-hidden">
                    <span className="relative z-10">US</span>
                    {!prefersReducedMotion && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      />
                    )}
                  </div>
                </div>
              </motion.div>
            </MagneticCursor>
          </Suspense>

          {/* Responsive main title */}
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: prefersReducedMotion ? 0.1 : 0.6, delay: 0.3 }}
            style={{
              fontSize: "clamp(2rem, 8vw, 4rem)",
            }}
          >
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent relative">
              Umer Shaikh
            </span>
          </motion.h1>

          {/* Responsive typing animation */}
          <div className="h-8 sm:h-10 md:h-12 flex items-center justify-center">
            <motion.h2
              className="font-semibold text-gray-300 font-mono"
              style={{
                fontSize: "clamp(1rem, 4vw, 1.5rem)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: prefersReducedMotion ? 0 : 0.5 }}
            >
              {displayText}
              {!prefersReducedMotion && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                  className="text-purple-400"
                >
                  |
                </motion.span>
              )}
            </motion.h2>
          </div>

          {/* Responsive description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: prefersReducedMotion ? 0 : 0.8 }}
            className="text-gray-400 max-w-3xl mx-auto leading-relaxed px-4"
            style={{
              fontSize: "clamp(0.875rem, 2.5vw, 1.125rem)",
            }}
          >
            🏆 Avantiea Hackathon Winner 2024 | B.Tech CSE Student at Dr. D.Y. Patil Institute | Building the future
            with AI, PWAs, and cutting-edge web technologies
          </motion.p>

          {/* Responsive contact info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: prefersReducedMotion ? 0 : 1 }}
            className="flex flex-wrap justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400 px-4"
          >
            {[
              { icon: MapPin, text: "Mumbai, India", color: "text-purple-400" },
              { icon: Phone, text: "+91 8591708274", color: "text-green-400" },
              { icon: Mail, text: "umershaikh1444@gmail.com", color: "text-blue-400" },
            ].map((item, index) => (
              <Suspense
                key={index}
                fallback={
                  <div className="flex items-center gap-2 bg-black/20 rounded-full px-3 py-2">
                    <item.icon className={`w-3 h-3 sm:w-4 sm:h-4 ${item.color}`} />
                    <span>{item.text}</span>
                  </div>
                }
              >
                <MagneticCursor strength={prefersReducedMotion ? 0 : 0.05}>
                  <motion.div
                    whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -2 }}
                    className="flex items-center gap-2 bg-black/20 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1 sm:py-2 border border-purple-500/20 cursor-pointer"
                  >
                    <item.icon className={`w-3 h-3 sm:w-4 sm:h-4 ${item.color}`} />
                    <span className="hidden sm:inline">{item.text}</span>
                    <span className="sm:hidden">{item.text.split(" ")[0]}</span>
                  </motion.div>
                </MagneticCursor>
              </Suspense>
            ))}
          </motion.div>

          {/* Responsive CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: prefersReducedMotion ? 0 : 1.2 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
          >
            <Suspense
              fallback={
                <Button size="default" className="bg-gradient-to-r from-purple-600 to-blue-600">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Let's Build the Future
                </Button>
              }
            >
              <MagneticCursor strength={prefersReducedMotion ? 0 : 0.1}>
                <motion.div whileHover={prefersReducedMotion ? {} : { scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="default"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full relative overflow-hidden group cursor-pointer w-full sm:w-auto"
                    onClick={handleScrollToContact}
                  >
                    <span className="relative z-10 flex items-center gap-2 text-sm sm:text-base">
                      <Sparkles className="w-4 h-4" />
                      <span className="hidden sm:inline">Let's Build the Future</span>
                      <span className="sm:hidden">Let's Connect</span>
                    </span>
                  </Button>
                </motion.div>
              </MagneticCursor>
            </Suspense>

            <Suspense
              fallback={
                <Button variant="outline" size="default">
                  <Download className="w-4 h-4 mr-2" />
                  Resume
                </Button>
              }
            >
              <MagneticCursor strength={prefersReducedMotion ? 0 : 0.1}>
                <motion.div whileHover={prefersReducedMotion ? {} : { scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="outline"
                    size="default"
                    className="border-purple-500 text-purple-400 hover:bg-purple-500/10 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-transparent backdrop-blur-sm cursor-pointer w-full sm:w-auto"
                    onClick={handleScrollToResume}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    <span className="text-sm sm:text-base">
                      <span className="hidden sm:inline">Download Resume</span>
                      <span className="sm:hidden">Resume</span>
                    </span>
                  </Button>
                </motion.div>
              </MagneticCursor>
            </Suspense>
          </motion.div>
        </motion.div>

        {/* Fixed scroll indicator with bounce animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: prefersReducedMotion ? 0 : 1.6 }}
          className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
            className="flex flex-col items-center gap-2 cursor-pointer group"
            onClick={handleScrollToAbout}
            whileHover={prefersReducedMotion ? {} : { y: -2 }}
          >
            <span className="text-xs sm:text-sm text-gray-400 group-hover:text-purple-400 transition-colors">
              Scroll to explore
            </span>
            <motion.div
              whileHover={prefersReducedMotion ? {} : { y: 2 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 group-hover:text-purple-300 transition-colors" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
