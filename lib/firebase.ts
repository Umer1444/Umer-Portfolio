/**
 * Firebase helper
 *
 * 1.  Always initialises (or re-uses) the Firebase **App**.
 * 2.  Exports a `getFirestoreClient()` function that:
 *     • Runs only in the browser (returns `null` on the server).
 *     • Dynamically imports `firebase/firestore` and returns a memoised
 *       Firestore instance.
 */

import { initializeApp, getApps, getApp } from "firebase/app"
import type { Firestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

// ---------- initialise / reuse the Firebase app ----------
export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig)

// ---------- lazy Firestore getter (client-side only) ----------
let cachedDb: Firestore | null = null

export const getFirestoreClient = async (): Promise<Firestore | null> => {
  if (cachedDb) return cachedDb
  if (typeof window === "undefined") return null // running on the server

  const { getFirestore } = await import("firebase/firestore")
  cachedDb = getFirestore(firebaseApp)
  return cachedDb
}
