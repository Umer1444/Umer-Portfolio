"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Brain, Sparkles, ImageIcon, Search, MessageSquare, Zap } from "lucide-react"

const aiTools = [
  {
    title: "Text Generation",
    description: "Generate creative content with AI",
    icon: MessageSquare,
    color: "from-purple-500 to-pink-500",
    demo: true,
  },
  {
    title: "Image Analysis",
    description: "Analyze and describe images",
    icon: ImageIcon,
    color: "from-blue-500 to-cyan-500",
    demo: false,
  },
  {
    title: "Research Assistant",
    description: "Get AI-powered research help",
    icon: Search,
    color: "from-green-500 to-teal-500",
    demo: false,
  },
  {
    title: "Code Generator",
    description: "Generate code snippets",
    icon: Brain,
    color: "from-orange-500 to-red-500",
    demo: false,
  },
]

export default function AIPlaygroundSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [prompt, setPrompt] = useState("")
  const [response, setResponse] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    // Simulate AI response
    setTimeout(() => {
      setResponse(
        `AI Response: This is a simulated response to "${prompt}". In a real implementation, this would connect to your HI AI platform or other AI services.`,
      )
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <section id="ai-tools" className="py-20 relative">
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
              AI Tools Playground
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Experience the power of AI with interactive demos and tools
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Interactive Demo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="bg-black/40 border-purple-500/20 backdrop-blur-sm h-full">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 p-2">
                    <Sparkles className="w-full h-full text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-white">AI Text Generator</CardTitle>
                    <CardDescription>Try out AI-powered text generation</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">Enter your prompt:</label>
                  <Textarea
                    placeholder="Write a creative story about..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="bg-black/20 border-purple-500/30 text-white placeholder-gray-400"
                    rows={3}
                  />
                </div>
                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim()}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  {isGenerating ? (
                    <>
                      <Zap className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Brain className="w-4 h-4 mr-2" />
                      Generate
                    </>
                  )}
                </Button>
                {response && (
                  <div className="mt-4 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                    <p className="text-gray-300 text-sm">{response}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* AI Tools Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 gap-4"
          >
            {aiTools.map((tool, index) => (
              <motion.div key={tool.title} whileHover={{ scale: 1.05 }} className="group cursor-pointer">
                <Card className="bg-black/40 border-purple-500/20 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-300 h-full">
                  <CardContent className="p-4 text-center">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${tool.color} p-2 mx-auto mb-3`}>
                      <tool.icon className="w-full h-full text-white" />
                    </div>
                    <h3 className="text-white font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-gray-400 text-sm">{tool.description}</p>
                    {tool.demo && (
                      <div className="mt-2">
                        <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                          Interactive
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Link to HI AI Platform */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/30 backdrop-blur-sm">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Experience the Full HI AI Platform</h3>
              <p className="text-gray-300 mb-6">
                Explore advanced AI capabilities including reasoning, image generation, and research support
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                asChild
              >
                <a href="https://hi-yh3x.vercel.app" target="_blank" rel="noopener noreferrer">
                  <Brain className="w-5 h-5 mr-2" />
                  Visit HI AI Platform
                </a>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
