"use client"

import { useEffect, useRef, useState } from "react"

interface AudioManagerProps {
  enabled?: boolean
}

export default function AudioManager({ enabled = true }: AudioManagerProps) {
  const audioContextRef = useRef<AudioContext | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const [volume, setVolume] = useState(0.3)

  useEffect(() => {
    if (!enabled) return

    const initAudioContext = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
        setIsInitialized(true)
      }
    }

    // Initialize on first user interaction
    const handleFirstInteraction = () => {
      initAudioContext()
      document.removeEventListener("click", handleFirstInteraction)
      document.removeEventListener("touchstart", handleFirstInteraction)
    }

    document.addEventListener("click", handleFirstInteraction)
    document.addEventListener("touchstart", handleFirstInteraction)

    return () => {
      document.removeEventListener("click", handleFirstInteraction)
      document.removeEventListener("touchstart", handleFirstInteraction)
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [enabled])

  const playTone = (frequency: number, duration: number, type: OscillatorType = "sine", volumeOverride?: number) => {
    if (!audioContextRef.current || !isInitialized || !enabled) return

    try {
      const oscillator = audioContextRef.current.createOscillator()
      const gainNode = audioContextRef.current.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContextRef.current.destination)

      oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime)
      oscillator.type = type

      const currentVolume = volumeOverride ?? volume
      gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime)
      gainNode.gain.linearRampToValueAtTime(currentVolume, audioContextRef.current.currentTime + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + duration)

      oscillator.start(audioContextRef.current.currentTime)
      oscillator.stop(audioContextRef.current.currentTime + duration)
    } catch (error) {
      console.warn("Audio playback failed:", error)
    }
  }

  // Only click sound - removed all other sounds
  const playClickSound = () => {
    playTone(1200, 0.15, "triangle", 0.2)
  }

  const playSuccessSound = () => {
    // Play a chord progression for success
    setTimeout(() => playTone(523, 0.2, "sine", 0.15), 0) // C
    setTimeout(() => playTone(659, 0.2, "sine", 0.15), 50) // E
    setTimeout(() => playTone(784, 0.2, "sine", 0.15), 100) // G
  }

  const playErrorSound = () => {
    playTone(200, 0.3, "sawtooth", 0.2)
  }

  // Expose audio functions globally
  useEffect(() => {
    if (typeof window !== "undefined") {
      ;(window as any).audioManager = {
        playClickSound,
        playSuccessSound,
        playErrorSound,
        setVolume,
        volume,
      }
    }
  }, [volume, isInitialized])

  return null
}
