"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useLanguage } from "@/context/LanguageContext"
import { useMemo, useState } from "react"
import { translations } from "@/i18n/translations"
import { ChevronDown } from "lucide-react"
import clsx from "clsx"

// Map textual levels to approximate percentages
const mapLevelToPercent = (level?: string) => {
  if (!level) return 0
  if (level === "Advanced" || level === "Avanzado") return 90
  if (level === "Intermediate" || level === "Intermedio") return 70
  return 40
}

const clampPercent = (value: number) => {
  if (Number.isNaN(value)) return 0
  if (value < 0) return 0
  if (value > 100) return 100
  return value
}

const getCategorySpanClasses = (title: string) => {
  const length = title.length
  if (length >= 28) return "sm:col-span-2 lg:col-span-3"
  if (length >= 22) return "lg:col-span-2"
  return ""
}

const getCategoryMinHeightClass = (title: string) => {
  const length = title.length
  if (length >= 28) return "min-h-16 sm:min-h-20 lg:min-h-28"
  if (length >= 22) return "min-h-14 sm:min-h-16 lg:min-h-24"
  return "min-h-12 sm:min-h-14 lg:min-h-20"
}

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { t, language } = useLanguage()
  const groups = translations[language].skills?.groups as Record<string, { name: string; level?: string; percent?: number }[]>
  const entries = useMemo(() => Object.entries(groups || {}), [groups])
  const [openCategory, setOpenCategory] = useState<string | null>(null)

  const handleToggleCategory = (category: string) => {
    setOpenCategory((prev) => (prev === category ? null : category))
  }

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
          <div className="w-full mb-12">
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

          {/* Category cards grid with single-open accordion */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 grid-flow-dense">
            {entries.map(([category, skills]) => {
              const isOpen = openCategory === category
              const spanClass = getCategorySpanClasses(category)
              const minHClass = getCategoryMinHeightClass(category)
              const sectionId = `skills-section-${category.replace(/\s+/g, '-').toLowerCase()}`
              return (
                <div
                  key={category}
                  className={clsx("rounded-xl border border-[#9CB7C9]/20 bg-card", spanClass, minHClass)}
                >
                  <button
                    type="button"
                    onClick={() => handleToggleCategory(category)}
                    aria-expanded={isOpen}
                    aria-controls={sectionId}
                    className="flex w-full items-center justify-between px-3 py-2 sm:px-4 sm:py-3 text-left text-foreground hover:border-[#9CB7C9]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <span className="text-base sm:text-lg md:text-xl font-semibold truncate pr-4">{category}</span>
                    <ChevronDown className={clsx("h-5 w-5 shrink-0 transition-transform", isOpen && "rotate-180")} aria-hidden="true" />
                  </button>
                  <motion.div
                    id={sectionId}
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                    aria-hidden={!isOpen}
                  >
                    <div className="px-3 pb-3 space-y-3 sm:px-4 sm:pb-4 sm:space-y-4">
                      {skills.map((skill, index) => {
                    const raw = skill.percent ?? mapLevelToPercent(skill.level)
                    const percent = clampPercent(raw)
                    return (
                      <div key={skill.name} className="w-full" aria-label={skill.name}>
                        <div
                              className="relative w-full h-9 sm:h-10 md:h-12 rounded-xl border border-[#9CB7C9]/20 bg-card overflow-hidden"
                          role="progressbar"
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-valuenow={percent}
                          tabIndex={0}
                        >
                          <motion.div
                            aria-hidden="true"
                            initial={{ width: 0 }}
                                animate={inView && isOpen ? { width: `${percent}%` } : { width: 0 }}
                            transition={{ duration: 0.9, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute left-0 top-0 h-full bg-[#9CB7C9]/40"
                          />
                              <div className="relative z-10 flex h-full items-center justify-between px-3">
                                <span className="text-[13px] sm:text-sm font-medium truncate">
                              {skill.name}
                            </span>
                                <span className="text-[11px] sm:text-xs text-muted-foreground">
                              {percent}%
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                      })}
                    </div>
                  </motion.div>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
} 