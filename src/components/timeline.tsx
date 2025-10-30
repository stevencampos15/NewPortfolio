"use client"

import { motion } from "framer-motion"
import { Briefcase, GraduationCap } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { timelineDataByLang, TimelineItem } from "@/data/timeline"

export function Timeline() {
  const { t, language } = useLanguage()
  const items: TimelineItem[] = timelineDataByLang[language]

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="w-full mb-12">
          <motion.div 
            className="relative px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-5xl md:text-7xl font-bold text-foreground tracking-tight">
              {t('timeline.title')}
            </h2>
          </motion.div>
          <p className="text-foreground/70 dark:text-gray-400 max-w-2xl mx-auto mt-6 px-4">{t('timeline.description')}</p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Desktop center line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-[#9CB7C9]/20"></div>

          <div className="space-y-12 md:space-y-8">
            {items.map((item: TimelineItem, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex items-start md:items-center"
              >
                {/* Desktop center dot */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-[#2A2A2A] border-2 border-[#9CB7C9] z-10"></div>

                {/* Mobile side line - extends beyond bottom to connect with horizontal line */}
                <div className={`md:hidden absolute top-0 w-0.5 bg-[#9CB7C9]/20 ${index % 2 === 0 ? "right-0" : "left-0"}`} style={{ height: 'calc(100% + 3rem)' }}></div>
                
                {/* Mobile side dot */}
                <div className={`md:hidden absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#2A2A2A] border-2 border-[#9CB7C9] ${index % 2 === 0 ? "right-0 -mr-1.5" : "left-0 -ml-1.5"} z-10`}></div>

                {/* Mobile zigzag connector - horizontal line at bottom connecting to opposite side */}
                {index < items.length - 1 && (
                  <div className={`md:hidden absolute w-full h-0.5 bg-[#9CB7C9]/20 z-0`} style={{ bottom: '-3rem' }}></div>
                )}

                {/* Content */}
                <div className={`w-4/5 md:w-[calc(50%-1rem)] pt-6 md:pt-0 relative z-10 ${
                  index % 2 === 0 
                    ? "ml-0 mr-auto md:mr-auto pr-6 md:pr-8" 
                    : "ml-auto mr-0 md:ml-auto pl-6 md:pl-8"
                }`}>
                  <div className="relative bg-black text-white dark:bg-[#2A2A2A] p-5 md:p-4 rounded-lg border border-[#9CB7C9]/20 shadow">
                    <div className="flex items-center gap-2 text-sm text-[#9CB7C9] mb-2">
                      <span
                        className="text-[#9CB7C9]"
                        aria-label={item.type === 'job' ? 'Job' : 'Education'}
                        title={item.type === 'job' ? 'Job' : 'Education'}
                      >
                        {item.type === 'job' ? (
                          <Briefcase size={16} aria-hidden="true" />
                        ) : (
                          <GraduationCap size={16} aria-hidden="true" />
                        )}
                      </span>
                      <span>{item.date}</span>
                    </div>
                    <h3 className="text-xl md:text-lg font-semibold text-foreground dark:text-white mb-2">{item.title}</h3>
                    <p className="text-foreground/70 dark:text-gray-400 text-base md:text-sm mb-2">{item.description}</p>
                    {item.place && (
                      <div className="text-xs font-semibold text-foreground dark:text-white mb-3">
                        {item.place}
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((skill: string, skillIndex: number) => (
                        <span
                          key={skillIndex}
                          className="text-xs px-2 py-1 rounded-full bg-[#9CB7C9]/10 text-[#9CB7C9] border border-[#9CB7C9]/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

