"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Send, Sparkles, User, Zap } from "lucide-react"
import { useMotion } from "@/components/motion-provider"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm Nova, Umer's AI companion. I'm here to help you explore his portfolio and answer any questions! ✨",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { prefersReducedMotion } = useMotion()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const getBotResponse = (input: string): string => {
    const lowerInput = input.toLowerCase()

    if (lowerInput.includes("project") || lowerInput.includes("work")) {
      return "🚀 Umer has created some amazing projects! His HI AI platform showcases advanced reasoning capabilities, the Risk Prediction system uses cutting-edge ML algorithms, and his billing system handles real-time operations beautifully. Each project demonstrates his expertise in different domains!"
    }

    if (lowerInput.includes("risk prediction") || lowerInput.includes("risk")) {
      return "📊 The Risk Prediction project is fascinating! It uses sophisticated machine learning algorithms to analyze financial and operational risks in real-time. Umer built this using Python, advanced data science techniques, and predictive modeling - perfect for enterprise risk management!"
    }

    if (lowerInput.includes("skill") || lowerInput.includes("technology")) {
      return "💻 Umer's tech stack is impressive! He's mastered AI/ML with Python, modern web development with Next.js and TypeScript, and specializes in prompt engineering. He's also skilled in PWA development, making apps that feel truly native!"
    }

    if (lowerInput.includes("contact") || lowerInput.includes("hire")) {
      return "📧 Ready to collaborate? Reach Umer at umershaikh1444@gmail.com or call +91 8591708274. He's actively taking on exciting projects and would love to discuss how he can help bring your ideas to life!"
    }

    if (lowerInput.includes("hackathon") || lowerInput.includes("winner")) {
      return "🏆 Umer's Avantiea Hackathon 2024 victory was incredible! He competed against 500+ participants and won with an innovative AI solution. His ability to build under pressure and think creatively really shines in competitive environments!"
    }

    if (lowerInput.includes("education") || lowerInput.includes("study")) {
      return "🎓 Umer is pursuing B.Tech in Computer Science at Dr. D.Y. Patil Institute (2025-2029). He's also earned certifications from be10X in AI & Prompt Engineering, plus specialized training in stock growth analysis. Always learning and growing!"
    }

    if (lowerInput.includes("ai") || lowerInput.includes("artificial intelligence")) {
      return "🤖 AI is Umer's passion! From his HI AI platform with multilingual support to risk prediction models, he's constantly pushing the boundaries of what's possible with artificial intelligence. He specializes in prompt engineering and building practical AI solutions!"
    }

    return "✨ That's a great question! I'd love to help you learn more about Umer's work. Feel free to explore his projects section, or ask me about his skills, experience, or how to get in touch. What interests you most about his portfolio?"
  }

  return (
    <>
      {/* Floating Chat Button - Optimized for mobile */}
      <motion.div
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50"
        initial={{ scale: 0, rotate: prefersReducedMotion ? 0 : -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          delay: prefersReducedMotion ? 0 : 2,
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 hover:from-purple-500 hover:via-pink-400 hover:to-blue-500 shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 relative overflow-hidden group"
          aria-label="Open chat with Nova"
        >
          {!prefersReducedMotion && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            />
          )}
          <Sparkles className="w-5 h-5 sm:w-7 sm:h-7 relative z-10 group-hover:scale-110 transition-transform duration-300" />
        </Button>

        {/* Notification badge */}
        {!prefersReducedMotion && (
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="absolute -top-1 -right-1 w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg"
          >
            <Zap className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
          </motion.div>
        )}
      </motion.div>

      {/* Chat Window - Mobile Optimized */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed inset-4 sm:bottom-20 sm:right-4 sm:left-auto sm:top-auto sm:w-80 sm:h-96 z-50"
          >
            <Card className="bg-black/90 backdrop-blur-2xl border border-white/20 shadow-2xl h-full flex flex-col overflow-hidden relative">
              {/* Fixed Header with Close Button */}
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 relative z-10 shrink-0">
                <CardTitle className="text-base sm:text-lg text-white flex items-center gap-2">
                  {!prefersReducedMotion && (
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                    </motion.div>
                  )}
                  {prefersReducedMotion && <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />}
                  Nova AI Assistant
                </CardTitle>

                {/* Fixed Close Button - High Z-Index */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300 absolute top-2 right-2 z-50 w-8 h-8 p-0"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </Button>
              </CardHeader>

              {/* Scrollable Content Area */}
              <CardContent className="flex-1 flex flex-col p-3 sm:p-4 overflow-hidden">
                {/* Messages Container with Mobile Optimization */}
                <div
                  className="flex-1 overflow-y-auto space-y-3 mb-4 scrollbar-thin scrollbar-thumb-purple-500/50 pr-2"
                  style={{
                    maxHeight: "calc(80vh - 120px)",
                    overflowY: "auto",
                  }}
                >
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] sm:max-w-[80%] p-2 sm:p-3 rounded-2xl backdrop-blur-sm text-sm ${
                          message.sender === "user"
                            ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                            : "bg-white/10 text-gray-100 border border-white/20"
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {message.sender === "bot" && (
                            <>
                              {!prefersReducedMotion && (
                                <motion.div
                                  animate={{ rotate: [0, 360] }}
                                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                >
                                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mt-0.5 text-purple-400 shrink-0" />
                                </motion.div>
                              )}
                              {prefersReducedMotion && (
                                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mt-0.5 text-purple-400 shrink-0" />
                              )}
                            </>
                          )}
                          {message.sender === "user" && <User className="w-3 h-3 sm:w-4 sm:h-4 mt-0.5 shrink-0" />}
                          <p className="text-xs sm:text-sm leading-relaxed break-words">{message.text}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-white/10 backdrop-blur-sm p-2 sm:p-3 rounded-2xl border border-white/20">
                        <div className="flex items-center gap-2">
                          {!prefersReducedMotion && (
                            <motion.div
                              animate={{ rotate: [0, 360] }}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            >
                              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
                            </motion.div>
                          )}
                          {prefersReducedMotion && <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />}
                          <div className="flex space-x-1">
                            {[0, 1, 2].map((i) => (
                              <motion.div
                                key={i}
                                animate={
                                  prefersReducedMotion
                                    ? {}
                                    : {
                                        scale: [1, 1.5, 1],
                                        opacity: [0.5, 1, 0.5],
                                      }
                                }
                                transition={{
                                  duration: 1,
                                  repeat: Number.POSITIVE_INFINITY,
                                  delay: i * 0.2,
                                }}
                                className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Fixed Input Area */}
                <div className="flex gap-2 shrink-0">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Ask Nova about Umer..."
                    className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-gray-400 focus:border-purple-500/50 transition-all duration-300 text-sm"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-lg transition-all duration-300 shrink-0"
                    size="sm"
                  >
                    <Send className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
