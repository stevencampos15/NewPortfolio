"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useLanguage } from "@/context/LanguageContext"
import { useEffect, useMemo, useState } from "react"
import { translations } from "@/i18n/translations"

// Map level strings (EN/ES) to bar widths
const levelWidthClass = (level: string) => {
  if (level === "Advanced" || level === "Avanzado") return "w-full"
  if (level === "Intermediate" || level === "Intermedio") return "w-2/3"
  return "w-1/3"
}

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { t, language } = useLanguage()
  const groups = translations[language].skills?.groups as Record<string, { name: string; level: string }[]>

  const categories = useMemo(() => Object.keys(groups || {}), [groups])
  const [activeTab, setActiveTab] = useState<string>(categories[0])

  // Reset tab on language change or when categories change
  useEffect(() => {
    if (!categories.includes(activeTab)) {
      setActiveTab(categories[0])
    }
  }, [language, categories, activeTab])

  const filteredSkills = useMemo(() => (groups?.[activeTab] || []), [groups, activeTab])

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
                      className={`h-full bg-[#9CB7C9] rounded-full ${levelWidthClass(skill.level)}`}
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