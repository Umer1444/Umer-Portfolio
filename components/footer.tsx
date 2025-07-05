"use client"

import { motion } from "framer-motion"
import { Terminal, Heart } from "lucide-react"
import { useMotion } from "@/components/motion-provider"

// X (Twitter) Icon Component
const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

export default function Footer() {
  const { prefersReducedMotion } = useMotion()

  return (
    <footer className="py-8 sm:py-12 border-t border-purple-500/20 relative overflow-hidden">
      {/* Animated Wave - Only if motion is enabled */}
      {!prefersReducedMotion && (
        <div className="absolute top-0 left-0 w-full h-1">
          <motion.div
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="h-full w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent"
          />
        </div>
      )}

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Brand */}
          <div>
            <motion.div
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4"
            >
              Umer Shaikh
            </motion.div>
            <p className="text-gray-400 text-sm leading-relaxed">
              AI Engineer & Full-stack Developer passionate about building intelligent systems and innovative solutions.
              Hackathon winner with expertise in modern web technologies.
            </p>
            <div className="flex items-center mt-4 space-x-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Available for freelance projects</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-base sm:text-lg">Quick Links</h3>
            <div className="space-y-2">
              {[
                { name: "About", href: "#about" },
                { name: "Projects", href: "#projects" },
                { name: "Resume", href: "#resume" },
                { name: "Contact", href: "#contact" },
              ].map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  whileHover={prefersReducedMotion ? {} : { x: 5 }}
                  className="block text-gray-400 hover:text-purple-400 transition-colors text-sm"
                  onClick={(e) => {
                    e.preventDefault()
                    const element = document.querySelector(link.href)
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" })
                    }
                  }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Social & Contact - Removed GitHub and LinkedIn */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-base sm:text-lg">Connect</h3>
            <div className="space-y-3">
              <motion.a
                href="https://x.com/UmerShaikh1444"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors"
              >
                <XIcon className="w-5 h-5" />
                <span className="text-sm">X (Twitter)</span>
              </motion.a>
            </div>

            {/* Command Line */}
            <div className="mt-6">
              <div className="bg-black/40 border border-purple-500/20 rounded-lg p-3">
                <div className="flex items-center space-x-2 text-sm">
                  <Terminal className="w-4 h-4 text-green-400" />
                  <span className="text-gray-400">$</span>
                  {!prefersReducedMotion && (
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                      className="text-green-400"
                    >
                      npx umer-portfolio
                    </motion.span>
                  )}
                  {prefersReducedMotion && <span className="text-green-400">npx umer-portfolio</span>}
                </div>
              </div>
              <p className="text-gray-500 text-xs mt-2">Try my portfolio CLI tool</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-purple-500/20 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm flex items-center">
            Made with <Heart className="w-4 h-4 mx-1 text-red-500 animate-pulse" /> by Umer Shaikh
          </p>
          <div className="flex items-center space-x-4">
            <p className="text-gray-500 text-sm">© 2024 Umer Shaikh. All rights reserved.</p>
            {!prefersReducedMotion && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="w-6 h-6 border border-purple-500/30 rounded-full"
              />
            )}
            {prefersReducedMotion && <div className="w-6 h-6 border border-purple-500/30 rounded-full" />}
          </div>
        </div>
      </div>

      {/* Floating Particles - Only if motion is enabled */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-400/20 rounded-full"
              animate={{
                y: [0, -80, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
              style={{
                left: Math.random() * 100 + "%",
                bottom: 0,
              }}
            />
          ))}
        </div>
      )}
    </footer>
  )
}
