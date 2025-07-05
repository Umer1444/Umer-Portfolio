"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ExternalLink, Github, Brain, CreditCard, Users, BookOpen, Search, Filter, TrendingUp } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/effect-coverflow"

const projects = [
  {
    id: 1,
    title: "HI AI",
    description:
      "Built a futuristic AI platform with advanced reasoning, image generation, research tools, and multilingual support using full-stack technologies.",
    icon: Brain,
    demo: "https://hi-yh3x.vercel.app/",
    github: "https://github.com/Umer1444/HI",
    tags: ["AI", "Next.js", "TypeScript", "OpenAI", "Full-stack"],
    gradient: "from-purple-500 to-pink-500",
    date: "Jan 2024",
    featured: true,
    category: "Full-stack",
  },
  {
    id: 2,
    title: "Risk Prediction",
    description:
      "Advanced machine learning system for predicting financial and operational risks using sophisticated algorithms and real-time data analysis.",
    icon: TrendingUp,
    demo: "#",
    github: "https://github.com/Umer1444/Risk-Prediction",
    tags: ["Python", "Machine Learning", "Data Science", "Risk Analysis", "Predictive Modeling"],
    gradient: "from-red-500 to-orange-500",
    date: "Nov 2024",
    featured: true,
    category: "AI/ML",
  },
  {
    id: 3,
    title: "Billing System",
    description:
      "Designed a real-time billing platform with invoice management, customer handling, report analysis, and print/download features.",
    icon: CreditCard,
    demo: "https://bill-black-six.vercel.app/",
    github: "https://github.com/Umer1444/Bill",
    tags: ["Next.js", "TypeScript", "Firebase", "Real-time", "Analytics"],
    gradient: "from-blue-500 to-cyan-500",
    date: "Apr 2024",
    featured: true,
    category: "Full-stack",
  },
  {
    id: 4,
    title: "Alumni Connection",
    description:
      "Developed a social platform for alumni networking, login system, event sharing, and communication interface.",
    icon: Users,
    demo: "#",
    github: "https://github.com/Umer1444/alumni",
    tags: ["Next.js", "Firebase", "Social", "Networking", "PWA"],
    gradient: "from-green-500 to-teal-500",
    date: "Aug 2024",
    featured: false,
    category: "Social",
  },
  {
    id: 5,
    title: "Journal App",
    description:
      "Created a personalized journaling app with mood tracking, parallax animations, and private dashboards.",
    icon: BookOpen,
    demo: "https://journal-writing-s61p.vercel.app/",
    github: "https://github.com/Umer1444/journal",
    tags: ["Next.js", "Supabase", "Mood Tracking", "Animations", "PWA"],
    gradient: "from-orange-500 to-red-500",
    date: "Dec 2024",
    featured: true,
    category: "Productivity",
  },
]

const categories = ["All", "Full-stack", "AI/ML", "Social", "Productivity"]

export default function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const ProjectCard = ({ project, index }: { project: (typeof projects)[0]; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateY: 45 }}
      animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      whileHover={{ y: -10, rotateY: 5, scale: 1.02 }}
      className="group perspective-1000 h-full"
    >
      <Card className="bg-black/20 backdrop-blur-xl border border-white/10 hover:border-purple-500/40 transition-all duration-500 h-full transform-gpu relative overflow-hidden">
        {/* Enhanced holographic overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent opacity-0 group-hover:opacity-100"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${project.gradient} p-3 relative shadow-lg`}>
              <project.icon className="w-full h-full text-white drop-shadow-sm" />
              {project.featured && (
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full shadow-lg"
                />
              )}
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-white/10 text-purple-300 border-white/20 backdrop-blur-sm">
                {project.category}
              </Badge>
              <span className="text-sm text-gray-400 font-mono">{project.date}</span>
            </div>
          </div>
          <CardTitle className="text-xl text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 group-hover:bg-clip-text transition-all duration-300">
            {project.title}
          </CardTitle>
          <CardDescription className="text-gray-300 leading-relaxed">{project.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-white/5 text-gray-300 border-white/10 hover:bg-purple-500/20 hover:text-purple-300 transition-all duration-300 text-xs backdrop-blur-sm"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex gap-2 pt-4">
            <Button
              size="sm"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 flex-1 shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
              asChild
            >
              <a href={project.demo} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </a>
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-white/20 text-gray-300 hover:bg-white/10 hover:text-white bg-transparent backdrop-blur-sm transition-all duration-300"
              asChild
            >
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Innovative solutions spanning AI, full-stack development, and intelligent systems
          </p>

          {/* Enhanced Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search projects, technologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-black/20 backdrop-blur-xl border-white/20 text-white placeholder-gray-400 focus:border-purple-500/50 transition-all duration-300"
              />
            </div>
            <div className="flex gap-2 flex-wrap justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                      : "border-white/20 text-gray-300 hover:bg-white/10 bg-transparent backdrop-blur-sm"
                  } transition-all duration-300`}
                >
                  <Filter className="w-3 h-3 mr-1" />
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Projects Display */}
        {isMobile ? (
          // Mobile: Enhanced Swipeable Carousel
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Swiper
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView="auto"
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              pagination={{ clickable: true }}
              navigation={true}
              modules={[EffectCoverflow, Pagination, Navigation]}
              className="project-swiper"
            >
              {filteredProjects.map((project, index) => (
                <SwiperSlide key={project.id} className="!w-80">
                  <ProjectCard project={project} index={index} />
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        ) : (
          // Desktop: Enhanced 3D Grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}

        {filteredProjects.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <p className="text-gray-400 text-lg">No projects found matching your criteria.</p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
