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
      className="fixed bottom-4 left-4 z-50 px-4 py-2 rounded-full bg-[#9CB7C9] text-[#1C1C1C] hover:bg-[#8BA5B7] transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {language === 'en' ? 'ES' : 'EN'}
    </motion.button>
  )
} 