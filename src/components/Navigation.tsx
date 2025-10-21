"use client"

import { useLanguage } from "@/context/LanguageContext"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"

export default function Navigation() {
  const { t } = useLanguage()
  const { } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Set isMounted to true after component mounts
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Close menu when clicking outside or on a nav link
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (isMenuOpen && !target.closest('.menu-button') && !target.closest('.mobile-menu')) {
        setIsMenuOpen(false)
      }
    }

    // Add background color when scrolling
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10)
    }

    window.addEventListener('click', handleClick)
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('click', handleClick)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isMenuOpen])

  // Close menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isMenuOpen])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const navLinks = [
    { href: "#about", label: t('nav.about') },
    { href: "#timeline", label: t('timeline.title') },
    { href: "#skills", label: t('nav.skills') },
    { href: "#certifications", label: t('certifications.title') },
    { href: "#projects", label: t('nav.projects') },
    { href: "#contact", label: t('nav.contact') }
  ]

  // Base classes that won't change between server and client
  const containerClasses = "fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
  // Conditionally add dynamic classes only on the client side
  const dynamicBgClass = isMounted ? 
    (hasScrolled && !isMenuOpen ? 'bg-background dark:bg-[#1C1C1C] bg-opacity-95 backdrop-blur-sm' : '') : ''

  return (
    <div className={`${containerClasses} ${dynamicBgClass}`}>
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center relative z-20">
          <a href="#" className="text-foreground font-bold text-xl">Steven Campos</a>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            {navLinks.map((link, index) => (
              <a 
                key={index}
                href={link.href} 
                className="text-foreground hover:text-[#9CB7C9] dark:text-white dark:hover:text-[#9CB7C9] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile Burger Menu Button */}
          <button 
            className="md:hidden flex flex-col justify-center items-center menu-button z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-foreground dark:bg-white mb-1.5 transition-all duration-300 ${isMounted && isMenuOpen ? 'transform rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-foreground dark:bg-white mb-1.5 transition-all duration-300 ${isMounted && isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`block w-6 h-0.5 bg-foreground dark:bg-white transition-all duration-300 ${isMounted && isMenuOpen ? 'transform -rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Fullscreen - Only render on client side */}
      {isMounted && (
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden fixed inset-0 bg-background dark:bg-[#1C1C1C] mobile-menu z-10 flex flex-col justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="container mx-auto px-4 py-4 flex flex-col items-center">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    className="text-foreground dark:text-white text-2xl py-6 hover:text-[#9CB7C9] dark:hover:text-[#9CB7C9] transition-colors text-center w-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  )
} 