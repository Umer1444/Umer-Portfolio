"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, FileText, Award, Briefcase, Eye } from "lucide-react"
import { useMotion } from "@/components/motion-provider"

export default function ResumeSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { prefersReducedMotion } = useMotion()

  const handleDownloadResume = () => {
    // Create resume content as HTML and convert to PDF-like format
    const resumeContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Umer Shaikh - Resume</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.4; color: #333; }
        .header { text-align: center; margin-bottom: 20px; border-bottom: 2px solid #9333ea; padding-bottom: 15px; }
        .header h1 { margin: 0; color: #9333ea; font-size: 24px; }
        .header p { margin: 5px 0; color: #666; }
        .section { margin: 20px 0; }
        .section h2 { color: #9333ea; border-bottom: 1px solid #9333ea; padding-bottom: 5px; margin-bottom: 10px; }
        .two-column { display: flex; gap: 20px; }
        .left-column { flex: 1; }
        .right-column { flex: 2; }
        .item { margin-bottom: 15px; }
        .item h3 { margin: 0; color: #333; }
        .item .meta { color: #666; font-size: 14px; margin: 2px 0; }
        .skills-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
        .skill-category { margin-bottom: 10px; }
        .skill-category h4 { margin: 0 0 5px 0; color: #9333ea; }
        .skill-list { color: #666; font-size: 14px; }
        ul { margin: 5px 0; padding-left: 20px; }
        .project { margin-bottom: 15px; padding: 10px; border-left: 3px solid #9333ea; }
        .project h3 { margin: 0 0 5px 0; }
        .project .tech { color: #9333ea; font-size: 12px; font-weight: bold; }
        .project .link { color: #0066cc; font-size: 12px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Umer Shaikh</h1>
        <p>Aspiring AI Engineer & Full Stack Developer | Prompt Engineering Specialist</p>
        <p>Skilled in Python, JS & AI Tools</p>
        <p>📍 Mumbai | 📞 +918591708274 | 📧 umershaikh1444@gmail.com</p>
    </div>

    <div class="two-column">
        <div class="left-column">
            <div class="section">
                <h2>Skills</h2>
                <div class="skill-category">
                    <h4>Programming</h4>
                    <p class="skill-list">Python, JavaScript, TypeScript, HTML, CSS</p>
                </div>
                <div class="skill-category">
                    <h4>Frameworks & Libraries</h4>
                    <p class="skill-list">Next.js, Streamlit, scikit-learn, joblib</p>
                </div>
                <div class="skill-category">
                    <h4>AI/ML Tools</h4>
                    <p class="skill-list">Prompt Engineering, AI Tools Mastery, Pandas, NumPy, Matplotlib, Seaborn</p>
                </div>
                <div class="skill-category">
                    <h4>Deployment & Utilities</h4>
                    <p class="skill-list">Version Control (Git)</p>
                </div>
            </div>

            <div class="section">
                <h2>Certifications</h2>
                <div class="item">
                    <h3>AI & Prompt Engineering</h3>
                    <p class="meta">be10X • Dec 2024</p>
                </div>
                <div class="item">
                    <h3>Hackathon Winner</h3>
                    <p class="meta">Avantiea • Apr 2024</p>
                </div>
                <div class="item">
                    <h3>Management Certification</h3>
                    <p class="meta">IIM Calcutta • Jan 2024</p>
                </div>
                <div class="item">
                    <h3>Technical Certification</h3>
                    <p class="meta">IIT Jammu • July 2024</p>
                </div>
            </div>

            <div class="section">
                <h2>Languages</h2>
                <div class="item">
                    <h3>English</h3>
                    <p class="meta">Proficient in reading, writing, and speaking</p>
                </div>
                <div class="item">
                    <h3>Hindi</h3>
                    <p class="meta">Native speaker with full proficiency</p>
                </div>
            </div>
        </div>

        <div class="right-column">
            <div class="section">
                <h2>Professional Summary</h2>
                <p>Enthusiastic and self-driven tech professional currently pursuing B.Tech in Computer Science at Dr. D.Y. Patil Ramrao Adik Institute of Technology (Graduating in 2029), with a strong foundation in software development, artificial intelligence, and prompt engineering. Adept in using AI tools, mastering prompts for LLMs, and building interactive web applications using HTML, CSS, JavaScript, and Python. Demonstrated expertise in data analysis, AI-powered automation, and full-stack development. Passionate about solving real-world problems through intelligent systems, and eager to contribute to innovative teams in the fields of AI, software engineering, and research.</p>
            </div>

            <div class="section">
                <h2>Experience</h2>
                <div class="item">
                    <h3>Full Stack Developer (Freelancer)</h3>
                    <p class="meta">Jan 2023 - Present • Remote</p>
                    <p>Built end-to-end AI-enabled apps and websites using modern stacks. Specialized in integrating real-time databases and deploying prompt-based intelligent systems.</p>
                </div>
            </div>

            <div class="section">
                <h2>Education</h2>
                <div class="item">
                    <h3>B.Tech in Computer Science Engineering</h3>
                    <p class="meta">Dr. D.Y. Patil Ramrao Adik Institute of Technology, Navi Mumbai</p>
                    <p class="meta">Graduation Year: 2029 (Pursuing)</p>
                </div>
                <div class="item">
                    <h3>12th Grade (Science - PCM)</h3>
                    <p class="meta">S D T Kalani College Science Commerce and Arts, Mumbai • 60% • 2024</p>
                </div>
                <div class="item">
                    <h3>10th Grade</h3>
                    <p class="meta">Social Welfare English High School, Mumbai Kalyan • 72% • Mar 2022</p>
                </div>
            </div>

            <div class="section">
                <h2>Featured Projects</h2>
                <div class="project">
                    <h3>HI AI Platform</h3>
                    <p class="meta">Jan 2024</p>
                    <p>Built a futuristic AI platform with advanced reasoning, image generation, research tools, and multilingual support.</p>
                    <p class="tech">Tech: Prompt Engineering, AI Tools</p>
                    <p class="link">🔗 https://hi-yh3x.vercel.app/</p>
                </div>
                <div class="project">
                    <h3>Billing System</h3>
                    <p class="meta">Apr 2024</p>
                    <p>Designed a real-time billing platform with invoice management, customer handling, report analysis, and print/download features.</p>
                    <p class="tech">Tech: Next.js, TypeScript, Firebase</p>
                    <p class="link">🔗 https://bill-black-six.vercel.app/</p>
                </div>
                <div class="project">
                    <h3>Journal App</h3>
                    <p class="meta">Dec 2024</p>
                    <p>Created a personalized journaling app with mood tracking, parallax animations, and private dashboards.</p>
                    <p class="tech">Tech: Next.js, Supabase</p>
                    <p class="link">🔗 https://journal-writing-s61p.vercel.app/</p>
                </div>
                <div class="project">
                    <h3>Alumni Connection Website</h3>
                    <p class="meta">Aug 2024</p>
                    <p>Developed a social platform for alumni networking, login system, event sharing, and communication interface.</p>
                    <p class="tech">Tech: Next.js, Firebase</p>
                </div>
            </div>

            <div class="section">
                <h2>Interests</h2>
                <ul>
                    <li><strong>Software Development:</strong> Frontend and Backend (HTML, CSS, JavaScript, React, Node.js, Express, Python)</li>
                    <li><strong>Sports:</strong> Cricket</li>
                    <li><strong>Data Analytics:</strong> Statistical Analysis, Data Visualization</li>
                </ul>
            </div>
        </div>
    </div>
</body>
</html>
    `

    // Create and download the HTML file
    const blob = new Blob([resumeContent], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "Umer_Shaikh_Resume.html"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    // Also trigger print dialog for PDF conversion
    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(resumeContent)
      printWindow.document.close()
      setTimeout(() => {
        printWindow.print()
      }, 500)
    }
  }

  const handleViewResume = () => {
    // Create a modal or new window to view resume
    const resumeContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Umer Shaikh - Resume</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 20px; line-height: 1.6; color: #333; background: #f8fafc; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #9333ea; padding-bottom: 20px; }
        .header h1 { margin: 0; color: #9333ea; font-size: 28px; font-weight: 700; }
        .header .subtitle { margin: 10px 0; color: #666; font-size: 16px; font-weight: 500; }
        .header .contact { margin: 15px 0; color: #666; font-size: 14px; }
        .section { margin: 25px 0; }
        .section h2 { color: #9333ea; border-bottom: 2px solid #9333ea; padding-bottom: 8px; margin-bottom: 15px; font-size: 20px; }
        .two-column { display: grid; grid-template-columns: 1fr 2fr; gap: 30px; margin-top: 20px; }
        .item { margin-bottom: 20px; }
        .item h3 { margin: 0 0 5px 0; color: #333; font-size: 16px; font-weight: 600; }
        .item .meta { color: #666; font-size: 13px; margin: 3px 0; font-style: italic; }
        .item p { margin: 8px 0; font-size: 14px; }
        .skills-grid { display: grid; gap: 15px; }
        .skill-category { margin-bottom: 15px; }
        .skill-category h4 { margin: 0 0 8px 0; color: #9333ea; font-size: 14px; font-weight: 600; }
        .skill-list { color: #666; font-size: 13px; line-height: 1.4; }
        .project { margin-bottom: 20px; padding: 15px; border-left: 4px solid #9333ea; background: #f8f9ff; border-radius: 0 8px 8px 0; }
        .project h3 { margin: 0 0 8px 0; color: #333; font-size: 16px; }
        .project .tech { color: #9333ea; font-size: 12px; font-weight: 600; margin: 5px 0; }
        .project .link { color: #0066cc; font-size: 12px; text-decoration: none; }
        .project .link:hover { text-decoration: underline; }
        ul { margin: 8px 0; padding-left: 20px; }
        li { margin: 5px 0; font-size: 14px; }
        .summary { background: #f8f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid #9333ea; }
        @media print { body { background: white; } .container { box-shadow: none; } }
        @media (max-width: 768px) { .two-column { grid-template-columns: 1fr; gap: 20px; } .container { padding: 20px; } }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Umer Shaikh</h1>
            <p class="subtitle">Aspiring AI Engineer & Full Stack Developer | Prompt Engineering Specialist</p>
            <p class="subtitle">Skilled in Python, JS & AI Tools</p>
            <p class="contact">📍 Mumbai | 📞 +918591708274 | 📧 umershaikh1444@gmail.com</p>
        </div>

        <div class="section">
            <h2>Professional Summary</h2>
            <div class="summary">
                <p>Enthusiastic and self-driven tech professional currently pursuing B.Tech in Computer Science at Dr. D.Y. Patil Ramrao Adik Institute of Technology (Graduating in 2029), with a strong foundation in software development, artificial intelligence, and prompt engineering. Adept in using AI tools, mastering prompts for LLMs, and building interactive web applications using HTML, CSS, JavaScript, and Python. Demonstrated expertise in data analysis, AI-powered automation, and full-stack development. Passionate about solving real-world problems through intelligent systems, and eager to contribute to innovative teams in the fields of AI, software engineering, and research.</p>
            </div>
        </div>

        <div class="two-column">
            <div class="left-column">
                <div class="section">
                    <h2>Skills</h2>
                    <div class="skills-grid">
                        <div class="skill-category">
                            <h4>Programming Languages</h4>
                            <p class="skill-list">Python, JavaScript, TypeScript, HTML, CSS</p>
                        </div>
                        <div class="skill-category">
                            <h4>Frameworks & Libraries</h4>
                            <p class="skill-list">Next.js, Streamlit, scikit-learn, joblib</p>
                        </div>
                        <div class="skill-category">
                            <h4>AI/ML Tools</h4>
                            <p class="skill-list">Prompt Engineering, AI Tools Mastery, Pandas, NumPy, Matplotlib, Seaborn</p>
                        </div>
                        <div class="skill-category">
                            <h4>Development & Deployment</h4>
                            <p class="skill-list">Version Control (Git), Vercel, Firebase</p>
                        </div>
                    </div>
                </div>

                <div class="section">
                    <h2>Certifications</h2>
                    <div class="item">
                        <h3>🏆 AI & Prompt Engineering</h3>
                        <p class="meta">be10X • December 2024</p>
                    </div>
                    <div class="item">
                        <h3>🏆 Hackathon Winner</h3>
                        <p class="meta">Avantiea • April 2024</p>
                    </div>
                    <div class="item">
                        <h3>🏆 Management Certification</h3>
                        <p class="meta">IIM Calcutta • January 2024</p>
                    </div>
                    <div class="item">
                        <h3>🏆 Technical Certification</h3>
                        <p class="meta">IIT Jammu • July 2024</p>
                    </div>
                </div>

                <div class="section">
                    <h2>Languages</h2>
                    <div class="item">
                        <h3>English</h3>
                        <p class="meta">Proficient in reading, writing, and speaking</p>
                    </div>
                    <div class="item">
                        <h3>Hindi</h3>
                        <p class="meta">Native speaker with full proficiency</p>
                    </div>
                </div>
            </div>

            <div class="right-column">
                <div class="section">
                    <h2>Experience</h2>
                    <div class="item">
                        <h3>Full Stack Developer (Freelancer)</h3>
                        <p class="meta">January 2023 - Present • Remote</p>
                        <p>Built end-to-end AI-enabled apps and websites using modern stacks. Specialized in integrating real-time databases and deploying prompt-based intelligent systems.</p>
                    </div>
                </div>

                <div class="section">
                    <h2>Education</h2>
                    <div class="item">
                        <h3>B.Tech in Computer Science Engineering</h3>
                        <p class="meta">Dr. D.Y. Patil Ramrao Adik Institute of Technology, Navi Mumbai</p>
                        <p class="meta">Graduation Year: 2029 (Currently Pursuing)</p>
                    </div>
                    <div class="item">
                        <h3>12th Grade (Science - PCM)</h3>
                        <p class="meta">S D T Kalani College Science Commerce and Arts, Mumbai • 60% • 2024</p>
                    </div>
                    <div class="item">
                        <h3>10th Grade</h3>
                        <p class="meta">Social Welfare English High School, Mumbai Kalyan • 72% • March 2022</p>
                    </div>
                </div>

                <div class="section">
                    <h2>Featured Projects</h2>
                    <div class="project">
                        <h3>🤖 HI AI Platform</h3>
                        <p class="meta">January 2024</p>
                        <p>Built a futuristic AI platform with advanced reasoning, image generation, research tools, and multilingual support using full-stack technologies.</p>
                        <p class="tech">Tech Stack: Prompt Engineering, AI Tools, Next.js</p>
                        <a href="https://hi-yh3x.vercel.app/" class="link" target="_blank">🔗 https://hi-yh3x.vercel.app/</a>
                    </div>
                    <div class="project">
                        <h3>💳 Billing System</h3>
                        <p class="meta">April 2024</p>
                        <p>Designed a real-time billing platform with invoice management, customer handling, report analysis, and print/download features.</p>
                        <p class="tech">Tech Stack: Next.js, TypeScript, Firebase</p>
                        <a href="https://bill-black-six.vercel.app/" class="link" target="_blank">🔗 https://bill-black-six.vercel.app/</a>
                    </div>
                    <div class="project">
                        <h3>📔 Journal App</h3>
                        <p class="meta">December 2024</p>
                        <p>Created a personalized journaling app with mood tracking, parallax animations, and private dashboards.</p>
                        <p class="tech">Tech Stack: Next.js, Supabase</p>
                        <a href="https://journal-writing-s61p.vercel.app/" class="link" target="_blank">🔗 https://journal-writing-s61p.vercel.app/</a>
                    </div>
                    <div class="project">
                        <h3>👥 Alumni Connection Website</h3>
                        <p class="meta">August 2024</p>
                        <p>Developed a social platform for alumni networking, login system, event sharing, and communication interface.</p>
                        <p class="tech">Tech Stack: Next.js, Firebase</p>
                    </div>
                </div>

                <div class="section">
                    <h2>Interests & Expertise</h2>
                    <ul>
                        <li><strong>Software Development:</strong> Frontend and Backend development using HTML, CSS, JavaScript, React, Node.js, Express, Python</li>
                        <li><strong>Sports:</strong> Cricket enthusiast and active player</li>
                        <li><strong>Data Analytics:</strong> Statistical Analysis, Data Visualization, and Business Intelligence</li>
                        <li><strong>AI Research:</strong> Prompt Engineering, LLM optimization, and AI tool development</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
    `

    const viewWindow = window.open("", "_blank", "width=900,height=700,scrollbars=yes,resizable=yes")
    if (viewWindow) {
      viewWindow.document.write(resumeContent)
      viewWindow.document.close()
      viewWindow.document.title = "Umer Shaikh - Resume"
    }
  }

  return (
    <section id="resume" className="py-12 sm:py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: prefersReducedMotion ? 0.1 : 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Resume</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
            Download my complete resume to learn more about my experience and qualifications
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Resume Download Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: prefersReducedMotion ? 0.1 : 0.8, delay: 0.2 }}
          >
            <Card className="bg-black/40 border-purple-500/20 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-300 h-full">
              <CardHeader className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 p-3 sm:p-4">
                  <FileText className="w-full h-full text-white" />
                </div>
                <CardTitle className="text-xl sm:text-2xl text-white">Professional Resume</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Complete overview of my skills, experience, and achievements
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4 sm:space-y-6">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-center space-x-4 text-xs sm:text-sm text-gray-400">
                    <div className="flex items-center">
                      <Award className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-yellow-400" />
                      <span className="hidden sm:inline">Hackathon Winner</span>
                      <span className="sm:hidden">Winner</span>
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-blue-400" />
                      <span className="hidden sm:inline">Freelancer</span>
                      <span className="sm:hidden">Dev</span>
                    </div>
                  </div>
                  <p className="text-gray-300 text-xs sm:text-sm px-2">
                    Includes detailed information about my education at Dr. D.Y. Patil Institute, certifications from
                    IIM Calcutta & IIT Jammu, and comprehensive project portfolio.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Button
                    size="default"
                    onClick={handleDownloadResume}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 flex-1 text-sm sm:text-base"
                  >
                    <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    <span className="hidden sm:inline">Download Resume PDF</span>
                    <span className="sm:hidden">Download PDF</span>
                  </Button>

                  <Button
                    variant="outline"
                    size="default"
                    onClick={handleViewResume}
                    className="border-purple-500 text-purple-400 hover:bg-purple-500/10 flex-1 text-sm sm:text-base bg-transparent"
                  >
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    <span className="hidden sm:inline">View Resume</span>
                    <span className="sm:hidden">View</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: prefersReducedMotion ? 0.1 : 0.8, delay: 0.4 }}
            className="space-y-4 sm:space-y-6"
          >
            {[
              {
                title: "Education",
                value: "B.Tech CSE",
                subtitle: "Dr. D.Y. Patil Institute (2025-2029)",
                color: "from-blue-500 to-cyan-500",
                icon: "🎓",
              },
              {
                title: "Experience",
                value: "2+ Years",
                subtitle: "Full Stack Development & AI",
                color: "from-green-500 to-teal-500",
                icon: "💼",
              },
              {
                title: "Certifications",
                value: "4+",
                subtitle: "IIM Calcutta, IIT Jammu, be10X",
                color: "from-purple-500 to-pink-500",
                icon: "🏆",
              },
              {
                title: "Projects",
                value: "10+",
                subtitle: "AI, Web Apps, Data Analytics",
                color: "from-orange-500 to-red-500",
                icon: "🚀",
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: prefersReducedMotion ? 0.1 : 0.8, delay: 0.6 + index * 0.1 }}
                whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
              >
                <Card className="bg-black/40 border-purple-500/20 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-300">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-r ${stat.color} p-2 sm:p-3 flex items-center justify-center text-lg sm:text-xl`}
                      >
                        {stat.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-semibold text-white truncate">{stat.title}</h3>
                        <p className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                          {stat.value}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-400 truncate">{stat.subtitle}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Resume Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: prefersReducedMotion ? 0.1 : 0.8, delay: 0.8 }}
          className="mt-8 sm:mt-12"
        >
          <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/30 backdrop-blur-sm">
            <CardContent className="p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 text-center">Resume Highlights</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center">
                <div className="space-y-2">
                  <div className="text-2xl sm:text-3xl font-bold text-purple-400">🏆</div>
                  <p className="text-white font-semibold text-sm sm:text-base">Avantiea Hackathon Winner 2024</p>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl sm:text-3xl font-bold text-blue-400">🤖</div>
                  <p className="text-white font-semibold text-sm sm:text-base">AI & Prompt Engineering Expert</p>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl sm:text-3xl font-bold text-green-400">💻</div>
                  <p className="text-white font-semibold text-sm sm:text-base">Full Stack Developer</p>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl sm:text-3xl font-bold text-orange-400">📊</div>
                  <p className="text-white font-semibold text-sm sm:text-base">Data Analytics Specialist</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
