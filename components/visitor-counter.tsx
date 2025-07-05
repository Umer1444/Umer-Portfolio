"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Eye } from "lucide-react"
import { getFirestoreClient } from "@/lib/firebase"

export default function VisitorCounter() {
  const [visitorCount, setVisitorCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const updateVisitorCount = async () => {
      try {
        const db = await getFirestoreClient()
        if (!db) return

        const { doc, getDoc, setDoc, increment } = await import("firebase/firestore")

        const visitorRef = doc(db, "analytics", "visitors")
        const visitorDoc = await getDoc(visitorRef)

        if (visitorDoc.exists()) {
          const currentCount = visitorDoc.data().count || 0
          setVisitorCount(currentCount + 1)
          await setDoc(visitorRef, { count: increment(1) }, { merge: true })
        } else {
          setVisitorCount(1)
          await setDoc(visitorRef, { count: 1 })
        }
      } catch (error) {
        console.error("Error updating visitor count:", error)
        setVisitorCount(1337) // Fallback number
      } finally {
        setIsLoading(false)
      }
    }

    updateVisitorCount()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed top-20 right-4 z-40 bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-lg px-3 py-2"
    >
      <div className="flex items-center gap-2 text-sm text-gray-300">
        <Eye className="w-4 h-4 text-purple-400" />
        <span>Visitors:</span>
        {isLoading ? (
          <div className="w-8 h-4 bg-purple-500/20 rounded animate-pulse" />
        ) : (
          <motion.span
            key={visitorCount}
            initial={{ scale: 1.2, color: "#a855f7" }}
            animate={{ scale: 1, color: "#d1d5db" }}
            className="font-mono font-bold"
          >
            {visitorCount.toLocaleString()}
          </motion.span>
        )}
      </div>
    </motion.div>
  )
}
