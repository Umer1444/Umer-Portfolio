"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Code, Database, Brain, Smartphone, Cloud, Palette, Terminal, Zap } from "lucide-react"

const skillCategories = [
  {
    title: "Frontend Development",
    icon: Code,
    skills: ["Next.js", "React", "TypeScript", "TailwindCSS", "Framer Motion"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Backend Development",
    icon: Database,
    skills: ["Node.js", "Python", "PostgreSQL", "MongoDB", "Redis"],
    color: "from-green-500 to-teal-500",
  },
  {
    title: "AI & Machine Learning",
    icon: Brain,
    skills: ["OpenAI API", "TensorFlow", "PyTorch", "Pandas", "Scikit-learn"],
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Mobile Development",
    icon: Smartphone,
    skills: ["React Native", "Flutter", "iOS", "Android", "PWA"],
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    skills: ["Vercel", "AWS", "Docker", "GitHub Actions", "Supabase"],
    color: "from-indigo-500 to-purple-500",
  },
  {
    title: "Data Analytics",
    icon: Palette,
    skills: ["Pandas", "Seaborn", "Matplotlib", "Jupyter", "Streamlit"],
    color: "from-yellow-500 to-orange-500",
  },
  {
    title: "Tools & Platforms",
    icon: Terminal,
    skills: ["Git", "VS Code", "Figma", "Postman", "Firebase"],
    color: "from-gray-500 to-slate-500",
  },
  {
    title: "Real-time Systems",
    icon: Zap,
    skills: ["WebSockets", "Socket.io", "WebRTC", "Server-Sent Events"],
    color: "from-pink-500 to-rose-500",
  },
]

export default function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="skills" className="py-20 relative">
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
              Skills & Expertise
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A comprehensive toolkit for building modern, scalable applications
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50, rotateY: 90 }}
              animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                transition: { duration: 0.2 },
              }}
              className="group perspective-1000"
            >
              <div className="bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 h-full hover:border-purple-500/40 transition-all duration-300 transform-gpu">
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} p-2 mb-4 group-hover:scale-110 transition-transform`}
                >
                  <category.icon className="w-full h-full text-white" />
                </div>

                <h3 className="text-lg font-semibold text-white mb-4 group-hover:text-purple-400 transition-colors">
                  {category.title}
                </h3>

                <div className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.1 + skillIndex * 0.05,
                      }}
                      className="text-sm text-gray-400 bg-purple-500/5 rounded-md px-3 py-1 border border-purple-500/10 hover:border-purple-500/30 hover:text-purple-300 transition-all cursor-default"
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating Skills Animation */}
        <div className="mt-16 relative h-32 overflow-hidden">
          <motion.div
            animate={{ x: ["-100%", "100%"] }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="absolute whitespace-nowrap text-6xl font-bold opacity-5 text-purple-500"
          >
            Next.js • TypeScript • Python • AI • React • TailwindCSS • Framer Motion •
          </motion.div>
        </div>
      </div>
    </section>
  )
}
