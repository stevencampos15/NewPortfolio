"use client"

import { useLanguage } from '@/context/LanguageContext'
import { motion } from 'framer-motion'

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en')
  }

  return (
    <motion.button
      onClick={toggleLanguage}
      aria-label="Toggle language"
      className="fixed bottom-4 left-4 z-50 p-3 rounded-full bg-[#9CB7C9] text-[#1C1C1C] shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="inline-flex items-center justify-center w-5 h-5 text-[11px] font-semibold leading-none tracking-wide select-none">
        {language === 'en' ? 'ES' : 'EN'}
      </span>
    </motion.button>
  )
} 