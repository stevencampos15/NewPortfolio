"use client"

import React, { createContext, useContext, useState } from 'react'
import { translations } from '@/i18n/translations'

type Language = 'en' | 'es'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  const t = (key: string) => {
    const keys = key.split('.')
    let value: Record<string, unknown> | string | undefined = translations[language]
    
    for (const k of keys) {
      if (value === undefined || typeof value === 'string') return key
      value = value[k] as Record<string, unknown> | string | undefined
    }
    
    return value as string || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
} 