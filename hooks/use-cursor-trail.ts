"use client"

import { useEffect } from "react"

export function useCursorTrail() {
  useEffect(() => {
    const trail: HTMLElement[] = []
    const trailLength = 20

    // Create trail elements
    for (let i = 0; i < trailLength; i++) {
      const dot = document.createElement("div")
      dot.className = "cursor-trail-dot"
      dot.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: linear-gradient(45deg, #a855f7, #3b82f6);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: ${1 - i / trailLength};
        transform: scale(${1 - i / trailLength});
        transition: all 0.1s ease;
      `
      document.body.appendChild(dot)
      trail.push(dot)
    }

    let mouseX = 0
    let mouseY = 0
    let currentIndex = 0

    const updateTrail = () => {
      trail[currentIndex].style.left = mouseX + "px"
      trail[currentIndex].style.top = mouseY + "px"
      currentIndex = (currentIndex + 1) % trailLength
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    document.addEventListener("mousemove", handleMouseMove)
    const interval = setInterval(updateTrail, 50)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      clearInterval(interval)
      trail.forEach((dot) => document.body.removeChild(dot))
    }
  }, [])
}
