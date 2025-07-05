import type React from "react"
import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Umer Shaikh - AI Engineer & Full Stack Developer | Hackathon Winner",
  description:
    "Portfolio of Umer Shaikh, AI Engineer and Full Stack Developer. Avantiea Hackathon Winner 2024. Specializing in AI, prompt engineering, and modern web development.",
  keywords:
    "Umer Shaikh, AI Engineer, Full Stack Developer, Hackathon Winner, Prompt Engineering, Next.js, Python, Machine Learning, Mumbai",
  authors: [{ name: "Umer Shaikh" }],
  creator: "Umer Shaikh",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://umershaikh.dev",
    title: "Umer Shaikh - AI Engineer & Full Stack Developer",
    description:
      "Avantiea Hackathon Winner 2024 | AI Engineer specializing in intelligent systems and modern web development",
    siteName: "Umer Shaikh Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Umer Shaikh - AI Engineer & Full Stack Developer",
    description: "Hackathon Winner | AI Engineer | Building the future with intelligent systems",
    creator: "@UmerShaikh1444",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
