"use client"

import type React from "react"
import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react"
import { getFirestoreClient } from "@/lib/firebase"

export default function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const playAudio = (type: string) => {
    if (typeof window !== "undefined" && (window as any).audioManager) {
      const audioManager = (window as any).audioManager
      switch (type) {
        case "success":
          audioManager.playSuccessSound()
          break
        case "error":
          audioManager.playErrorSound()
          break
        case "click":
          audioManager.playClickSound()
          break
      }
    }
  }

  /* ---------------- FORM SUBMIT ---------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    playAudio("click")
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const db = await getFirestoreClient()
      if (!db) {
        throw new Error("Firestore not available in this environment.")
      }

      // Dynamic import so it's NOT bundled server-side
      const { collection, addDoc, serverTimestamp } = await import("firebase/firestore")

      await addDoc(collection(db, "contacts"), {
        ...formData,
        timestamp: serverTimestamp(),
        status: "new",
      })

      setSubmitStatus("success")
      playAudio("success")
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (err) {
      console.error("Contact form error:", err)
      setSubmitStatus("error")
      playAudio("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  /* ---------------- FORM CHANGE ---------------- */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  /* ---------------- RENDER ---------------- */
  return (
    <section id="contact" className="py-20 relative">
      {/* --- heading --- */}
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Let&apos;s Connect
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Ready to collaborate on your next AI project? Let&apos;s build something amazing together.
          </p>
        </motion.div>

        {/* --- grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* ----------- FORM ----------- */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="bg-black/40 border-purple-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Send a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and I&apos;ll get back to you within 24&nbsp;hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* name / email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-300 mb-2 block">Name&nbsp;*</label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="bg-black/20 border-purple-500/30 text-white placeholder-gray-400 focus:border-purple-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-300 mb-2 block">Email&nbsp;*</label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        className="bg-black/20 border-purple-500/30 text-white placeholder-gray-400 focus:border-purple-500"
                        required
                      />
                    </div>
                  </div>
                  {/* subject */}
                  <div>
                    <label className="text-sm text-gray-300 mb-2 block">Subject&nbsp;*</label>
                    <Input
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Project inquiry, collaboration, etc."
                      className="bg-black/20 border-purple-500/30 text-white placeholder-gray-400 focus:border-purple-500"
                      required
                    />
                  </div>
                  {/* message */}
                  <div>
                    <label className="text-sm text-gray-300 mb-2 block">Message&nbsp;*</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project..."
                      rows={5}
                      className="bg-black/20 border-purple-500/30 text-white placeholder-gray-400 focus:border-purple-500"
                      required
                    />
                  </div>

                  {/* status messages */}
                  {submitStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center space-x-2 text-green-400 bg-green-500/10 p-3 rounded-lg border border-green-500/20"
                    >
                      <CheckCircle className="w-5 h-5" />
                      <span>Message sent successfully! I&apos;ll get back to you soon.</span>
                    </motion.div>
                  )}
                  {submitStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center space-x-2 text-red-400 bg-red-500/10 p-3 rounded-lg border border-red-500/20"
                    >
                      <AlertCircle className="w-5 h-5" />
                      <span>Failed to send message. Please try again or email me directly.</span>
                    </motion.div>
                  )}

                  {/* submit */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                          }}
                          className="w-4 h-4 mr-2"
                        >
                          <Send className="w-full h-full" />
                        </motion.div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* ----------- CONTACT INFO ----------- */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Contact Details */}
            <Card className="bg-black/40 border-purple-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-white">Get in Touch</CardTitle>
                <CardDescription>Feel free to reach out through any of these channels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-purple-500/5 border border-purple-500/10"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 p-2">
                    <Mail className="w-full h-full text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Email</p>
                    <a
                      href="mailto:umershaikh1444@gmail.com"
                      className="text-purple-400 hover:text-purple-300 transition-colors"
                      onClick={() => playAudio("click")}
                    >
                      umershaikh1444@gmail.com
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-green-500/5 border border-green-500/10"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 p-2">
                    <Phone className="w-full h-full text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Phone</p>
                    <a
                      href="tel:+918591708274"
                      className="text-green-400 hover:text-green-300 transition-colors"
                      onClick={() => playAudio("click")}
                    >
                      +91 8591708274
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-orange-500/5 border border-orange-500/10"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 p-2">
                    <MapPin className="w-full h-full text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Location</p>
                    <p className="text-orange-400">Mumbai, India</p>
                  </div>
                </motion.div>
              </CardContent>
            </Card>

            {/* Availability Status */}
            <Card className="bg-gradient-to-r from-green-500/10 to-teal-500/10 border-green-500/30 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-3"
                ></motion.div>
                <h3 className="text-white font-semibold mb-2">Available for Projects</h3>
                <p className="text-gray-300 text-sm">
                  Currently accepting new freelance projects and collaboration opportunities
                </p>
              </CardContent>
            </Card>

            {/* Response Time */}
            <Card className="bg-black/40 border-purple-500/20 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <h3 className="text-white font-semibold mb-2">Quick Response</h3>
                <p className="text-gray-300 text-sm">
                  I typically respond to messages within 24 hours. For urgent inquiries, feel free to call or WhatsApp
                  me directly.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
