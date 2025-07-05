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
import { collection, addDoc, serverTimestamp, doc, deleteDoc } from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID!,
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

// Add a contact entry to Firestore
export async function addContactEntry(data: {
  name: string
  email: string
  phone: string
  message: string
}) {
  const db = await getFirestoreClient()
  if (!db) throw new Error("Firestore not available")
  await addDoc(collection(db, "contacts"), {
    ...data,
    createdAt: serverTimestamp(),
  })
}

// Add a live visitor entry to Firestore
export async function addVisitorEntry(visitor: {
  ip: string
  userAgent: string
  timestamp?: any
}) {
  const db = await getFirestoreClient()
  if (!db) throw new Error("Firestore not available")
  await addDoc(collection(db, "visitors"), {
    ...visitor,
    timestamp: serverTimestamp(),
  })
}

// Remove a fake visitor by document ID
export async function removeVisitor(visitorId: string) {
  const db = await getFirestoreClient()
  if (!db) throw new Error("Firestore not available")
  await deleteDoc(doc(db, "visitors", visitorId))
}

// Get the live visitor count from Firestore
export async function getLiveVisitorCount(): Promise<number> {
  const db = await getFirestoreClient()
  if (!db) throw new Error("Firestore not available")
  const snapshot = await (await import("firebase/firestore")).getCountFromServer(collection(db, "visitors"))
  return snapshot.data().count || 0
}
