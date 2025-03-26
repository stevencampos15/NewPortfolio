"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/context/LanguageContext"
import { timelineData, TimelineItem } from "@/data/timeline"

export function Timeline() {
  const { t } = useLanguage()

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

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-[#9CB7C9]/20"></div>

          <div className="space-y-8">
            {timelineData.map((item: TimelineItem, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-[#2A2A2A] border-2 border-[#9CB7C9] z-10"></div>

                {/* Content */}
                <div className={`w-1/2 ${index % 2 === 0 ? "pr-8" : "pl-8"}`}>
                  <div className="bg-black text-white dark:bg-[#2A2A2A] p-4 rounded-lg border border-[#9CB7C9]/20 shadow">
                    <div className="text-sm text-[#9CB7C9] mb-2">{item.date}</div>
                    <h3 className="text-lg font-semibold text-foreground dark:text-white mb-2">{item.title}</h3>
                    <p className="text-foreground/70 dark:text-gray-400 text-sm mb-3">{item.description}</p>
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

