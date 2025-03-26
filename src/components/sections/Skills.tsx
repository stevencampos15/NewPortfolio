"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useLanguage } from "@/context/LanguageContext"
import { useState } from "react"

const skills = [
  // Frontend
  { name: "React", level: "Advanced", category: "Frontend" },
  { name: "Next.js", level: "Advanced", category: "Frontend" },
  { name: "TailwindCSS", level: "Advanced", category: "Frontend" },
  { name: "HTML/CSS", level: "Advanced", category: "Frontend" },
  { name: "JavaScript", level: "Advanced", category: "Frontend" },
  
  // Backend
  { name: "Node.js", level: "Advanced", category: "Backend" },
  { name: "Express.js", level: "Advanced", category: "Backend" },
  { name: "Python", level: "Intermediate", category: "Backend" },
  { name: "RESTful APIs", level: "Advanced", category: "Backend" },
  { name: "GraphQL", level: "Intermediate", category: "Backend" },
  
  // Database
  { name: "SQL", level: "Advanced", category: "Database" },
  { name: "MongoDB", level: "Intermediate", category: "Database" },
  { name: "PostgreSQL", level: "Advanced", category: "Database" },
  { name: "Redis", level: "Intermediate", category: "Database" },
  
  // DevOps & Tools
  { name: "Git", level: "Advanced", category: "DevOps" },
  { name: "Docker", level: "Intermediate", category: "DevOps" },
  { name: "AWS", level: "Intermediate", category: "DevOps" },
  { name: "CI/CD", level: "Intermediate", category: "DevOps" },
]

// Get unique categories from skills
const categories = Array.from(new Set(skills.map(skill => skill.category)))

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState(categories[0])

  const filteredSkills = skills.filter(skill => skill.category === activeTab)

  return (
    <section id="skills" className="w-full py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="w-full mb-16">
            <motion.div 
              className="relative px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-5xl md:text-7xl font-bold text-foreground tracking-tight">
                {t('skills.title')}
              </h2>
            </motion.div>
          </div>
          
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === category
                    ? 'bg-[#9CB7C9] text-background'
                    : 'bg-muted text-muted-foreground hover:bg-[#9CB7C9]/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Skills Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-6 bg-black text-white dark:bg-[#2A2A2A] rounded-lg border border-[#9CB7C9]/20 hover:border-[#9CB7C9]/40 transition-colors shadow"
              >
                <h3 className="font-bold text-lg mb-2 text-[#9CB7C9]">{skill.name}</h3>
                <div className="mt-2">
                  <div className="h-2 bg-muted rounded-full">
                    <div 
                      className={`h-full bg-[#9CB7C9] rounded-full ${
                        skill.level === "Advanced" ? "w-full" : 
                        skill.level === "Intermediate" ? "w-2/3" : "w-1/3"
                      }`}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{skill.level}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
} 