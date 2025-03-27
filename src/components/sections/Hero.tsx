"use client"

import { motion, useAnimationControls } from "framer-motion"
import { useLanguage } from "@/context/LanguageContext"
import { useEffect, useState } from "react"

// Typing animation component
const TypeAnimation = ({ text, className }: { text: string, className?: string }) => {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  
  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(currentIndex + 1)
      }, 150) // typing speed
      
      return () => clearTimeout(timeout)
    } else {
      // Start cursor blinking after typing is complete
      const interval = setInterval(() => {
        setShowCursor(prev => !prev)
      }, 500) // cursor blink speed
      
      return () => clearInterval(interval)
    }
  }, [currentIndex, text])
  
  return (
    <span className={className}>
      {displayText}
      <span className={`inline-block w-[0.05em] h-[1.2em] ml-2 bg-black dark:bg-white ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}></span>
    </span>
  )
}

export default function Hero() {
  const { t } = useLanguage()
  const controls = useAnimationControls()
  const [typingKey, setTypingKey] = useState(0)
  
  useEffect(() => {
    controls.start({ opacity: 1, y: 0 })
    // Reset typing animation when language changes
    setTypingKey(prev => prev + 1)
  }, [controls, t])

  return (
    <section className="w-full min-h-screen flex flex-col bg-background relative pt-20">
      {/* Hero Content */}
      <div className="flex-1 flex items-center">
        <div className="container mx-auto px-4">
          {/* Main content with side-by-side layout for larger screens */}
          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end mt-16 lg:mt-0">
            {/* Hello text */}
            <div className="w-full lg:w-1/2">
              <motion.h1 
                className="text-[30vw] md:text-[7rem] lg:text-[9rem] xl:text-[11rem] font-bold tracking-tighter text-foreground leading-none"
                initial={{ opacity: 0, y: 30 }}
                animate={controls}
                transition={{ duration: 0.8 }}
              >
                <TypeAnimation 
                  key={typingKey} 
                  text={t('hero.hello')} 
                  className="block" 
                />
              </motion.h1>
            </div>
            
            {/* About text */}
            <motion.div 
              className="w-full lg:w-1/4 flex flex-col items-start lg:items-end mt-10 lg:mt-0 lg:ml-auto mb-[50px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.8 }}
            >
              <p className="text-sm md:text-base text-[#404040] dark:text-[#9a9a9a] font-extralight">
                {t('hero.aboutMe')}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Scroll Arrow */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          y: [0, 10, 0]
        }}
        transition={{ 
          delay: 2.5,
          duration: 2,
          repeat: Infinity,
          repeatType: "loop"
        }}
        onClick={() => window.scrollTo({
          top: window.innerHeight,
          behavior: 'smooth'
        })}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#9CB7C9"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-60 hover:opacity-100 transition-opacity"
        >
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </motion.div>
    </section>
  )
} 