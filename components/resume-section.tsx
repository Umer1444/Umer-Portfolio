"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, FileText, Award, Briefcase } from "lucide-react"

export default function ResumeSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const handleDownloadResume = () => {
    // In a real implementation, this would download the actual PDF
    const link = document.createElement("a")
    link.href = "/resume-umer-shaikh.pdf" // Replace with actual resume URL
    link.download = "Umer_Shaikh_Resume.pdf"
    link.click()
  }

  return (
    <section id="resume" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Resume</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Download my complete resume to learn more about my experience and qualifications
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Resume Download Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="bg-black/40 border-purple-500/20 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-300 h-full">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 p-4">
                  <FileText className="w-full h-full text-white" />
                </div>
                <CardTitle className="text-2xl text-white">Professional Resume</CardTitle>
                <CardDescription>Complete overview of my skills, experience, and achievements</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center">
                      <Award className="w-4 h-4 mr-2 text-yellow-400" />
                      Hackathon Winner
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="w-4 h-4 mr-2 text-blue-400" />
                      Freelancer
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Includes detailed information about my education at Dr. D.Y. Patil Institute, certifications from
                    IIM Calcutta & IIT Jammu, and project portfolio.
                  </p>
                </div>
                <Button
                  size="lg"
                  onClick={handleDownloadResume}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 w-full"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Resume PDF
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            {[
              {
                title: "Education",
                value: "B.Tech CSE",
                subtitle: "Dr. D.Y. Patil Institute (2025-2029)",
                color: "from-blue-500 to-cyan-500",
              },
              {
                title: "Experience",
                value: "2+ Years",
                subtitle: "Full Stack Development & AI",
                color: "from-green-500 to-teal-500",
              },
              {
                title: "Certifications",
                value: "4+",
                subtitle: "IIM Calcutta, IIT Jammu, be10X",
                color: "from-purple-500 to-pink-500",
              },
              {
                title: "Projects",
                value: "10+",
                subtitle: "AI, Web Apps, Data Analytics",
                color: "from-orange-500 to-red-500",
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="bg-black/40 border-purple-500/20 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} p-3`}>
                        <div className="w-full h-full bg-white/20 rounded"></div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{stat.title}</h3>
                        <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                          {stat.value}
                        </p>
                        <p className="text-sm text-gray-400">{stat.subtitle}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
