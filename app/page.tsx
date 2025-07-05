"use client"

import { useEffect, useRef, lazy, Suspense } from "react"
import HeroSection from "@/components/hero-section"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ChatBot from "@/components/chatbot"
import VisitorCounter from "@/components/visitor-counter"
import OptimizedBackground from "@/components/optimized-background"
import LazySection from "@/components/lazy-section"
import AudioManager from "@/components/audio-manager"
import { ThemeProvider } from "@/components/theme-provider"
import { MotionProvider } from "@/components/motion-provider"
import { PWAProvider } from "@/components/pwa-provider"

// Lazy load heavy components
const ProjectsSection = lazy(() => import("@/components/projects-section"))
const AboutSection = lazy(() => import("@/components/about-section"))
const ContactSection = lazy(() => import("@/components/contact-section"))
const ResumeSection = lazy(() => import("@/components/resume-section"))
const SkillsSection = lazy(() => import("@/components/skills-section"))
const AIPlaygroundSection = lazy(() => import("@/components/ai-playground-section"))
const PWAPrompt = lazy(() => import("@/components/pwa-prompt"))
const CursorEffects = lazy(() => import("@/components/cursor-effects"))
const ParticleCursor = lazy(() => import("@/components/particle-cursor"))
const ClickRipple = lazy(() => import("@/components/click-ripple"))

export default function Home() {
  const lenisRef = useRef<any>(null)

  useEffect(() => {
    const initSmoothScrolling = async () => {
      try {
        const Lenis = (await import("@studio-freight/lenis")).default

        const lenis = new Lenis({
          duration: 1.0,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          direction: "vertical",
          gestureDirection: "vertical",
          smooth: true,
          mouseMultiplier: 0.8,
          smoothTouch: false,
          touchMultiplier: 1.5,
          infinite: false,
          autoResize: true,
          syncTouch: false,
          syncTouchLerp: 0.075,
          touchInertiaMultiplier: 25,
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
              lenis.scrollTo(element, { offset: -80, duration: 1.2 })
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

            {/* Optimized Background */}
            <OptimizedBackground />

            {/* Lazy Load Cursor Effects */}
            <Suspense fallback={null}>
              <CursorEffects />
              <ClickRipple />
              <ParticleCursor />
            </Suspense>

            {/* Subtle overlay for better text readability */}
            <div className="fixed inset-0 bg-black/5 backdrop-blur-[0.5px] z-[1]" />

            <Navigation />

            <Suspense fallback={null}>
              <PWAPrompt />
            </Suspense>

            <VisitorCounter />

            <main className="relative z-10">
              {/* Hero loads immediately */}
              <HeroSection />

              {/* Lazy load other sections */}
              <LazySection fallback={<div className="h-screen bg-purple-500/5 animate-pulse" />}>
                <Suspense fallback={<div className="h-screen bg-purple-500/5 animate-pulse" />}>
                  <AboutSection />
                </Suspense>
              </LazySection>

              <LazySection fallback={<div className="h-screen bg-purple-500/5 animate-pulse" />}>
                <Suspense fallback={<div className="h-screen bg-purple-500/5 animate-pulse" />}>
                  <SkillsSection />
                </Suspense>
              </LazySection>

              <LazySection fallback={<div className="h-screen bg-purple-500/5 animate-pulse" />}>
                <Suspense fallback={<div className="h-screen bg-purple-500/5 animate-pulse" />}>
                  <ProjectsSection />
                </Suspense>
              </LazySection>

              <LazySection fallback={<div className="h-screen bg-purple-500/5 animate-pulse" />}>
                <Suspense fallback={<div className="h-screen bg-purple-500/5 animate-pulse" />}>
                  <AIPlaygroundSection />
                </Suspense>
              </LazySection>

              <LazySection fallback={<div className="h-screen bg-purple-500/5 animate-pulse" />}>
                <Suspense fallback={<div className="h-screen bg-purple-500/5 animate-pulse" />}>
                  <ResumeSection />
                </Suspense>
              </LazySection>

              <LazySection fallback={<div className="h-screen bg-purple-500/5 animate-pulse" />}>
                <Suspense fallback={<div className="h-screen bg-purple-500/5 animate-pulse" />}>
                  <ContactSection />
                </Suspense>
              </LazySection>
            </main>

            <Footer />
            <ChatBot />
          </div>
        </MotionProvider>
      </ThemeProvider>
    </PWAProvider>
  )
}
