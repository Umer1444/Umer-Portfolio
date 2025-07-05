"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

interface PWAContextType {
  isInstalled: boolean
  isOnline: boolean
  updateAvailable: boolean
}

const PWAContext = createContext<PWAContextType | undefined>(undefined)

export function PWAProvider({ children }: { children: React.ReactNode }) {
  const [isInstalled, setIsInstalled] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const [updateAvailable, setUpdateAvailable] = useState(false)

  useEffect(() => {
    // Check if running as PWA
    const checkInstalled = () => {
      const isStandalone = window.matchMedia("(display-mode: standalone)").matches
      const isInWebAppiOS = (window.navigator as any).standalone === true
      setIsInstalled(isStandalone || isInWebAppiOS)
    }

    // Check online status
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine)
    }

    // Register service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        // use a version query to avoid old cached HTML in preview envs
        .register("/sw.js?v=1")
        .then((registration) => {
          registration.addEventListener("updatefound", () => {
            setUpdateAvailable(true)
          })
        })
        .catch((error) => console.error("SW registration failed:", error))
    }

    checkInstalled()
    updateOnlineStatus()

    window.addEventListener("online", updateOnlineStatus)
    window.addEventListener("offline", updateOnlineStatus)

    return () => {
      window.removeEventListener("online", updateOnlineStatus)
      window.removeEventListener("offline", updateOnlineStatus)
    }
  }, [])

  return <PWAContext.Provider value={{ isInstalled, isOnline, updateAvailable }}>{children}</PWAContext.Provider>
}

export function usePWA() {
  const context = useContext(PWAContext)
  if (!context) {
    throw new Error("usePWA must be used within PWAProvider")
  }
  return context
}
