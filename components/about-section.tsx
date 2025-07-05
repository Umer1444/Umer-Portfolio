"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, GraduationCap, Calendar, MapPin, BookOpen, Brain } from "lucide-react"

const timeline = [
  {
    type: "achievement",
    title: "🏆 Avantiea Hackathon Winner",
    organization: "Avantiea Hackathon 2024",
    location: "Mumbai",
    period: "April 2024",
    description: "Won first place for innovative AI-powered solution, competing against 500+ participants.",
    icon: Trophy,
    color: "from-yellow-500 to-orange-500",
  },
  {
    type: "education",
    title: "B.Tech Computer Science Engineering",
    organization: "Dr. D.Y. Patil Ramrao Adik Institute of Technology",
    location: "Navi Mumbai",
    period: "2025 - 2029",
    description: "Currently pursuing Bachelor's in Computer Science with focus on AI and Machine Learning.",
    icon: GraduationCap,
    color: "from-blue-500 to-cyan-500",
  },
  {
    type: "certification",
    title: "AI & Prompt Engineering Certification",
    organization: "be10X",
    location: "Online",
    period: "December 2024",
    description: "Advanced certification in AI tools mastery and prompt engineering techniques.",
    icon: Brain,
    color: "from-purple-500 to-pink-500",
  },
  {
    type: "certification",
    title: "Stock Growth Analysis Certification",
    organization: "Financial Analytics Institute",
    location: "Online",
    period: "January 2024",
    description: "Comprehensive program in stock market analysis, growth patterns, and investment strategies.",
    icon: BookOpen,
    color: "from-green-500 to-teal-500",
  },
  {
    type: "achievement",
    title: "ROS Navigation Hackathon Participation",
    organization: "Robotics Innovation Challenge",
    location: "Virtual",
    period: "September 2024",
    description: "Participated in advanced robotics hackathon focusing on autonomous navigation systems.",
    icon: Trophy,
    color: "from-cyan-500 to-blue-500",
  },
]

const skills = [
  {
    category: "Programming Languages",
    items: [
      { name: "Python", icon: "🐍" },
      { name: "JavaScript", icon: "🟨" },
      { name: "TypeScript", icon: "🔷" },
      { name: "HTML", icon: "🌐" },
      { name: "CSS", icon: "🎨" },
    ],
  },
  {
    category: "Frameworks & Libraries",
    items: [
      { name: "Next.js", icon: "⚡" },
      { name: "React", icon: "⚛️" },
      { name: "Node.js", icon: "🟢" },
      { name: "Express", icon: "🚀" },
      { name: "Streamlit", icon: "📊" },
    ],
  },
  {
    category: "AI/ML & Data Tools",
    items: [
      { name: "Prompt Engineering", icon: "🧠" },
      { name: "Pandas", icon: "🐼" },
      { name: "NumPy", icon: "🔢" },
      { name: "Matplotlib", icon: "📈" },
      { name: "Seaborn", icon: "📊" },
    ],
  },
  {
    category: "Development & Deployment",
    items: [
      { name: "Vercel", icon: "▲" },
      { name: "Firebase", icon: "🔥" },
      { name: "Git", icon: "📝" },
      { name: "Docker", icon: "🐳" },
      { name: "AWS", icon: "☁️" },
    ],
  },
]

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">About Me</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Enthusiastic and self-driven tech professional with a passion for AI, full-stack development, and solving
            real-world problems through intelligent systems.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {skills.map((skillGroup, index) => (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="bg-black/40 border-purple-500/20 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-300 h-full">
                <CardHeader>
                  <CardTitle className="text-lg text-white">{skillGroup.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-3">
                    {skillGroup.items.map((skill) => (
                      <motion.div
                        key={skill.name}
                        whileHover={{ scale: 1.02, x: 5 }}
                        className="flex items-center space-x-3 text-sm text-gray-300 bg-purple-500/5 rounded-lg px-3 py-2 border border-purple-500/10 hover:border-purple-500/30 hover:text-purple-300 transition-all cursor-default"
                      >
                        <span className="text-lg">{skill.icon}</span>
                        <span className="font-medium">{skill.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-blue-500"></div>

          <div className="space-y-8">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative flex items-start"
              >
                {/* Timeline Dot */}
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className={`absolute left-6 w-4 h-4 rounded-full bg-gradient-to-r ${item.color} border-2 border-black z-10`}
                ></motion.div>

                {/* Content */}
                <div className="ml-16 flex-1">
                  <Card className="bg-black/40 border-purple-500/20 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${item.color}/20`}>
                            <item.icon className={`w-5 h-5 text-white`} />
                          </div>
                          <div>
                            <CardTitle className="text-white">{item.title}</CardTitle>
                            <CardDescription className="text-purple-300">{item.organization}</CardDescription>
                          </div>
                        </div>
                        <div className="text-right text-sm text-gray-400">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {item.period}
                          </div>
                          <div className="flex items-center mt-1">
                            <MapPin className="w-4 h-4 mr-1" />
                            {item.location}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300">{item.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
