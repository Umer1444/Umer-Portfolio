"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Download, MapPin, Phone, Mail, Sparkles } from "lucide-react"
import MagneticCursor from "@/components/magnetic-cursor"

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  const titles = ["AI Engineer", "Hackathon Champ", "PWA Pioneer", "Full-stack Developer"]

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 })

  const rotateX = useTransform(springY, [-300, 300], [10, -10])
  const rotateY = useTransform(springX, [-300, 300], [-10, 10])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.getElementById("hero")?.getBoundingClientRect()
      if (rect) {
        mouseX.set(e.clientX - rect.left - rect.width / 2)
        mouseY.set(e.clientY - rect.top - rect.height / 2)
      }
    }

    document.addEventListener("mousemove", handleMouseMove)
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  // Fluid typing animation
  useEffect(() => {
    const currentTitle = titles[currentIndex]
    let timeoutId: NodeJS.Timeout

    if (isTyping) {
      if (displayText.length < currentTitle.length) {
        timeoutId = setTimeout(() => {
          setDisplayText(currentTitle.slice(0, displayText.length + 1))
        }, 100)
      } else {
        timeoutId = setTimeout(() => {
          setIsTyping(false)
        }, 2000)
      }
    } else {
      if (displayText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, 50)
      } else {
        setCurrentIndex((prev) => (prev + 1) % titles.length)
        setIsTyping(true)
      }
    }

    return () => clearTimeout(timeoutId)
  }, [displayText, isTyping, currentIndex, titles])

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Magnetic Cards */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl backdrop-blur-sm border border-purple-500/20"
            style={{
              left: `${20 + i * 15}%`,
              top: `${20 + (i % 2) * 40}%`,
              rotateX,
              rotateY,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          {/* Holographic Profile */}
          <MagneticCursor strength={0.2}>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative mx-auto w-32 h-32 mb-6 cursor-pointer"
            >
              <div className="w-full h-full rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 p-1">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-3xl font-bold relative overflow-hidden">
                  <span className="relative z-10">US</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  />
                </div>
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-purple-400/30"
              />
            </motion.div>
          </MagneticCursor>

          {/* Main Title - Medium Size */}
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold relative"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent relative">
              Umer Shaikh
              {/* Digital Shimmer Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                  repeatDelay: 2,
                }}
                style={{
                  background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
                  mixBlendMode: "overlay",
                }}
              />
            </span>
          </motion.h1>

          {/* Typing Animation - Medium Size */}
          <div className="h-12 flex items-center justify-center">
            <motion.h2
              className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-300 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {displayText}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                className="text-purple-400"
              >
                |
              </motion.span>
            </motion.h2>
          </div>

          {/* Description - Medium Size */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            🏆 Avantiea Hackathon Winner 2024 | B.Tech CSE Student at Dr. D.Y. Patil Institute | Building the future
            with AI, PWAs, and cutting-edge web technologies
          </motion.p>

          {/* Contact Info with Magnetic Effect */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-wrap justify-center gap-4 text-sm text-gray-400"
          >
            {[
              { icon: MapPin, text: "Mumbai, India", color: "text-purple-400" },
              { icon: Phone, text: "+91 8591708274", color: "text-green-400" },
              { icon: Mail, text: "umershaikh1444@gmail.com", color: "text-blue-400" },
            ].map((item, index) => (
              <MagneticCursor key={index} strength={0.1}>
                <motion.div
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="flex items-center gap-2 bg-black/20 backdrop-blur-sm rounded-full px-3 py-2 border border-purple-500/20 cursor-pointer"
                >
                  <item.icon className={`w-4 h-4 ${item.color}`} />
                  <span className="text-xs md:text-sm">{item.text}</span>
                </motion.div>
              </MagneticCursor>
            ))}
          </motion.div>

          {/* CTA Buttons - Medium Size */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <MagneticCursor strength={0.15}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="default"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-full relative overflow-hidden group cursor-pointer"
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-pink-500 to-cyan-500 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10 flex items-center gap-2 text-sm md:text-base">
                    <Sparkles className="w-4 h-4" />
                    Let's Build the Future
                  </span>
                </Button>
              </motion.div>
            </MagneticCursor>

            <MagneticCursor strength={0.15}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="default"
                  className="border-purple-500 text-purple-400 hover:bg-purple-500/10 px-6 py-3 rounded-full bg-transparent backdrop-blur-sm cursor-pointer"
                  onClick={() => document.getElementById("resume")?.scrollIntoView({ behavior: "smooth" })}
                >
                  <Download className="w-4 h-4 mr-2" />
                  <span className="text-sm md:text-base">Download Resume</span>
                </Button>
              </motion.div>
            </MagneticCursor>
          </motion.div>

          {/* Social Links - Medium Size */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="flex justify-center space-x-4 pt-6"
          >
            {[
              { icon: Github, href: "https://github.com/Umer1444", label: "GitHub", color: "hover:text-gray-300" },
              {
                icon: Linkedin,
                href: "https://www.linkedin.com/in/umershaikh-ai",
                label: "LinkedIn",
                color: "hover:text-blue-400",
              },
            ].map((social, index) => (
              <MagneticCursor key={index} strength={0.2}>
                <motion.a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5, y: -5 }}
                  className={`p-3 rounded-full bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 transition-colors group ${social.color} cursor-pointer`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-purple-400 group-hover:text-white transition-colors" />
                </motion.a>
              </MagneticCursor>
            ))}
          </motion.div>
        </motion.div>

        {/* Animated Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
            className="flex flex-col items-center gap-2 cursor-pointer"
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          >
            <span className="text-sm text-gray-400">Scroll to explore</span>
            <ArrowDown className="w-5 h-5 text-purple-400" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
