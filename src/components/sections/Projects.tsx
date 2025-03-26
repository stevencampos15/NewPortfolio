"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { useLanguage } from "@/context/LanguageContext"
import { useState, useEffect } from "react"
import { X, ExternalLink, Github } from "lucide-react"

interface Project {
  title: string;
  description: string;
  detailedDescription?: string;
  image: string;
  tags: string[];
  features?: string[];
  challenges?: string[];
  link: string;
  github: string;
}

const projects: Project[] = [
  {
    title: "Portfolio Website",
    description: "Modern portfolio website built with Next.js and TailwindCSS",
    detailedDescription: "A fully responsive personal portfolio website showcasing my projects, skills, and experience. Built with modern web technologies to provide a seamless user experience across all devices.",
    image: "/images/portfolio.jpg",
    tags: ["Next.js", "React", "TailwindCSS", "Framer Motion"],
    features: [
      "Responsive design for all devices",
      "Interactive animations using Framer Motion",
      "Light and dark mode support",
      "Multilingual support (English and Spanish)",
      "SEO optimized content"
    ],
    challenges: [
      "Implementing smooth animations while maintaining performance",
      "Creating a design that stands out while maintaining professionalism",
      "Ensuring cross-browser compatibility"
    ],
    link: "https://stevencampos.dev",
    github: "https://github.com/stevencampos15/stevencampos15.github.io"
  },
  // Add more projects here
]

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { t } = useLanguage()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  // Fix hydration issues
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Handle escape key press to close the modal
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedProject(null)
      }
    }

    if (selectedProject) {
      document.addEventListener('keydown', handleEsc)
      // Prevent body scrolling when modal is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEsc)
      // Restore body scrolling when modal is closed
      document.body.style.overflow = 'auto'
    }
  }, [selectedProject])

  return (
    <section id="projects" className="w-full py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="w-full mb-16">
            <motion.div 
              className="relative px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-5xl md:text-7xl font-bold text-foreground tracking-tight">
                {t('projects.title')}
              </h2>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => isMounted && setSelectedProject(project)}
                className="bg-black text-white dark:bg-[#2A2A2A] rounded-lg overflow-hidden border border-[#9CB7C9]/20 hover:border-[#9CB7C9]/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer shadow"
              >
                <div className="relative h-48">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-[#9CB7C9]">{project.title}</h3>
                  <p className="text-foreground/80 dark:text-gray-300 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-sm rounded-full bg-[#9CB7C9]/10 text-[#9CB7C9] border border-[#9CB7C9]/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#9CB7C9] hover:text-[#8BA5B7] transition-colors inline-flex items-center gap-1"
                      onClick={(e) => e.stopPropagation()} // Prevent modal from opening when clicking links
                    >
                      {t('projects.viewLive')}
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/70 dark:text-gray-400 hover:text-[#9CB7C9] transition-colors inline-flex items-center gap-1"
                      onClick={(e) => e.stopPropagation()} // Prevent modal from opening when clicking links
                    >
                      {t('projects.viewGithub')}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {isMounted && selectedProject && (
          <motion.div 
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 md:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="bg-black text-white dark:bg-[#2A2A2A] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-lg"
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
              <div className="relative h-64 md:h-80">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
                <button 
                  className="absolute top-4 right-4 bg-black/50 dark:bg-black/50 text-foreground dark:text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                  onClick={() => setSelectedProject(null)}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#9CB7C9]">{selectedProject.title}</h2>
                
                <p className="text-foreground/80 dark:text-gray-300 mb-6 text-lg">
                  {selectedProject.detailedDescription || selectedProject.description}
                </p>
                
                {selectedProject.features && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Key Features</h3>
                    <ul className="list-disc pl-5 text-foreground/80 dark:text-gray-300 space-y-1">
                      {selectedProject.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {selectedProject.challenges && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Challenges & Solutions</h3>
                    <ul className="list-disc pl-5 text-foreground/80 dark:text-gray-300 space-y-1">
                      {selectedProject.challenges.map((challenge, idx) => (
                        <li key={idx}>{challenge}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3 text-foreground">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-sm rounded-full bg-[#9CB7C9]/10 text-[#9CB7C9] border border-[#9CB7C9]/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-4 pt-4 border-t border-[#3A3A3A]">
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-[#9CB7C9] text-[#1C1C1C] rounded-lg hover:bg-[#8BA5B7] transition-colors"
                  >
                    <ExternalLink size={18} />
                    {t('projects.viewLive')}
                  </a>
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-muted dark:bg-[#3A3A3A] text-foreground dark:text-white rounded-lg hover:bg-[#4A4A4A] transition-colors"
                  >
                    <Github size={18} />
                    {t('projects.viewGithub')}
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
} 