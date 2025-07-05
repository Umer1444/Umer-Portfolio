"use client"

import { useEffect, useRef } from "react"
import HeroSection from "@/components/hero-section"
import ProjectsSection from "@/components/projects-section"
import AboutSection from "@/components/about-section"
import ContactSection from "@/components/contact-section"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import PWAPrompt from "@/components/pwa-prompt"
import ChatBot from "@/components/chatbot"
import VisitorCounter from "@/components/visitor-counter"
import CoolBackground from "@/components/cool-background"
import CursorEffects from "@/components/cursor-effects"
import ParticleCursor from "@/components/particle-cursor"
import ClickRipple from "@/components/click-ripple"
import AudioManager from "@/components/audio-manager"
import { ThemeProvider } from "@/components/theme-provider"
import { MotionProvider } from "@/components/motion-provider"
import { PWAProvider } from "@/components/pwa-provider"

export default function Home() {
  const lenisRef = useRef<any>(null)

  useEffect(() => {
    const initSmoothScrolling = async () => {
      try {
        const Lenis = (await import("@studio-freight/lenis")).default

        const lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          direction: "vertical",
          gestureDirection: "vertical",
          smooth: true,
          mouseMultiplier: 1,
          smoothTouch: false,
          touchMultiplier: 2,
          infinite: false,
          autoResize: true,
          syncTouch: false,
          syncTouchLerp: 0.075,
          touchInertiaMultiplier: 35,
        })

        lenisRef.current = lenis

        function raf(time: number) {
          lenis.raf(time)
          requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)

        const handleAnchorClick = (e: Event) => {
          const target = e.target as HTMLAnchorElement
          if (target.tagName === "A" && target.getAttribute("href")?.startsWith("#")) {
            e.preventDefault()
            const id = target.getAttribute("href")?.slice(1)
            const element = document.getElementById(id!)
            if (element) {
              lenis.scrollTo(element, { offset: -80, duration: 1.5 })
            }
          }
        }

        document.addEventListener("click", handleAnchorClick)

        return () => {
          document.removeEventListener("click", handleAnchorClick)
          lenis.destroy()
        }
      } catch (error) {
        console.error("Failed to initialize Lenis:", error)
      }
    }

    initSmoothScrolling()
  }, [])

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = "none"

    return () => {
      document.body.style.cursor = "auto"
    }
  }, [])

  return (
    <PWAProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        forcedTheme="dark"
        disableTransitionOnChange={false}
      >
        <MotionProvider>
          <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
            {/* Audio Manager */}
            <AudioManager enabled={true} />

            {/* Futuristic Background */}
            <CoolBackground />

            {/* Optimized Cursor Effects */}
            <CursorEffects />
            <ClickRipple />
            <ParticleCursor />

            {/* Subtle overlay for better text readability */}
            <div className="fixed inset-0 bg-black/10 backdrop-blur-[0.5px] z-[1]" />

            <Navigation />
            <PWAPrompt />
            <VisitorCounter />

            <main className="relative z-10">
              <HeroSection />
              <AboutSection />
              <ProjectsSection />
              <ContactSection />
            </main>

            <Footer />
            <ChatBot />
          </div>
        </MotionProvider>
      </ThemeProvider>
    </PWAProvider>
  )
}
