"use client"

import { motion, animate, useMotionValue } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useLanguage } from "@/context/LanguageContext"
import { useEffect, useState } from "react"

// Function to calculate age
const calculateAge = (birthDate: Date): number => {
  const today = new Date()
  const birth = new Date(birthDate)
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  
  return age
}

// Function to calculate coffee cups (base + 1 per day since startDate)
const calculateCoffeeCups = (startDate: Date, baseCups: number): number => {
  const today = new Date()
  const start = new Date(startDate)
  
  // Calculate the difference in days
  const diffTime = Math.abs(today.getTime() - start.getTime())
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  
  // Return base cups + 1 cup per day
  return baseCups + diffDays
}

// Coffee Cup SVG Component (with gentle float/tilt and soft glow)
const CoffeeCup = () => {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  return (
    <motion.div
      className="relative w-20 h-20 mx-auto mb-4"
      animate={{ y: [0, -2, 0], rotate: [0, -1.2, 0] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          {/* Soft drop shadow */}
          <filter id="cupShadow" x="-20%" y="-20%" width="140%" height="160%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.25" />
          </filter>
          {/* Clay-style gradients */}
          <linearGradient id="mugGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E9E9E9" />
          </linearGradient>
          <radialGradient id="rimGrad" cx="50%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="80%" stopColor="#E6E6E6" stopOpacity="1" />
          </radialGradient>
          <linearGradient id="coffeeGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#8C5A37" />
            <stop offset="100%" stopColor="#5E3A22" />
          </linearGradient>
          <linearGradient id="saucerGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#EDEDED" />
          </linearGradient>
        </defs>

        {/* Saucer (under cup) */}
        <ellipse cx="50" cy="86" rx="34" ry="6" fill="url(#saucerGrad)" filter="url(#cupShadow)" />

        {/* Cup body */}
        <g filter="url(#cupShadow)">
          <path
            d="M22,32 L22,68 Q22,84 38,84 L62,84 Q78,84 78,68 L78,32 Q78,28 74,28 L26,28 Q22,28 22,32 Z"
            fill="url(#mugGrad)"
          />
          {/* Rim */}
          <ellipse cx="50" cy="32" rx="28" ry="7" fill="url(#rimGrad)" />
          {/* Coffee liquid with gentle ripple */}
          <motion.ellipse
            cx="50"
            cy="34"
            rx="25"
            ry="6"
            fill="url(#coffeeGrad)"
            animate={{ ry: [6, 5.4, 6], rx: [25, 24.5, 25] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Inner shadow at top */}
          <ellipse cx="50" cy="30" rx="26" ry="5" fill="#000" opacity="0.06" />
        </g>

        {/* Handle */}
        <g filter="url(#cupShadow)">
          <path
            d="M78,42 C88,42 92,48 92,56 C92,64 88,70 78,70"
            fill="none"
            stroke="#F2F2F2"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M78,45 C85,45 88.5,49 88.5,56 C88.5,63 85,66.5 78,66.5"
            fill="none"
            stroke="#D9D9D9"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>
        {/* Soft glow on saucer */}
        {mounted && (
          <motion.ellipse
            cx="50"
            cy="86"
            rx="22"
            ry="4"
            fill="#9CB7C9"
            opacity={0.08}
            animate={{ opacity: [0.06, 0.14, 0.06], rx: [20, 23, 20] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        
        {/* Animated elements */}
        {mounted && (
          <>
            {/* Subtle steam wisps */}
            {[ -6, 0, 6 ].map((dx, i) => (
              <motion.path
                key={`steam-${i}`}
                d={`M${50 + dx},26 C ${50 + dx},22 ${52 + dx},20 ${54 + dx},18`}
                fill="transparent"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeOpacity="0.5"
                animate={{ opacity: [0, 0.8, 0], y: [0, -10, -16] }}
                transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: "easeOut", delay: i * 0.2 }}
              />
            ))}
          </>
        )}
      </svg>
    </motion.div>
  )
}

// Animated number (counts up when in view)
const AnimatedNumber = ({ value, inView }: { value: number; inView: boolean }) => {
  const mv = useMotionValue(0)
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    const unsub = mv.on("change", (latest) => setDisplay(Math.floor(latest as number)))
    return () => unsub()
  }, [mv])
  useEffect(() => {
    if (!inView) return
    const controls = animate(mv, value, { duration: 1.2, ease: "easeOut" })
    return () => controls.stop()
  }, [inView, value, mv])
  return <>{display.toLocaleString()}</>
}

// Removed 3D implementation to maintain React 19 compatibility without extra deps

// Security Shield Icon (cybersecurity-themed)
const SecurityShieldIcon = () => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <div className="relative w-20 h-20 mx-auto mb-4">
      <motion.svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)]"
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          {/* Clay-style gradients for 3D look */}
          <linearGradient id="shieldGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2B2B2B" />
            <stop offset="50%" stopColor="#1F1F1F" />
            <stop offset="100%" stopColor="#171717" />
          </linearGradient>
          <radialGradient id="highlightGrad" cx="50%" cy="20%" r="60%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Shield base with soft gradient and stroke */}
        <path d="M50 10 L80 22 V46 C80 64 66 78 50 88 C34 78 20 64 20 46 V22 Z" fill="url(#shieldGrad)" stroke="#3A3A3A" strokeWidth="1.5" />
        {/* Gloss highlight */}
        <path d="M50 12 L78 23 V37 C78 49 69 58 50 68 C31 58 22 49 22 37 V23 Z" fill="url(#highlightGrad)" />

        {/* Lock overlay */}
        <rect x="38" y="45" width="24" height="18" rx="4" fill="#9CB7C9" opacity="0.2" />
        <path d="M43 45 v-5 a7 7 0 0 1 14 0 v5" fill="none" stroke="#9CB7C9" strokeWidth="2" />
        <circle cx="50" cy="54" r="2.5" fill="#9CB7C9" />

        {/* Radar ring (static perimeter) */}
        <circle cx="50" cy="50" r="24" fill="none" stroke="#9CB7C9" strokeOpacity="0.18" strokeWidth="2" />

        {mounted && (
          <>
            {/* Pulsing ring */}
            <motion.circle
              cx="50"
              cy="50"
              r="18"
              fill="#9CB7C9"
              opacity="0.08"
              animate={{ r: [16, 24, 16], opacity: [0.12, 0, 0.12] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
            />

            {/* Rotating radar sweep */}
            <motion.g
              style={{ originX: 50, originY: 50 }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
            >
              <path d="M50 50 L74 50 A24 24 0 0 1 50 74 Z" fill="#9CB7C9" opacity="0.14" />
            </motion.g>

            {/* Perimeter scan stroke */}
            <motion.circle
              cx="50"
              cy="50"
              r="24"
              fill="none"
              stroke="#9CB7C9"
              strokeWidth="2"
              strokeDasharray="150 150"
              animate={{ strokeDashoffset: [150, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        )}
      </motion.svg>
    </div>
  )
}

// Learning Icon Component
const LearningIcon = () => {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  return (
    <div className="relative w-20 h-20 mx-auto mb-4">
      <motion.svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)]"
        animate={{ y: [0, -1.5, 0], rotate: [0, -1, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <filter id="bulbShadow" x="-20%" y="-20%" width="140%" height="160%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.25" />
          </filter>
          <linearGradient id="glassGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF"/>
            <stop offset="100%" stopColor="#EDEDED"/>
          </linearGradient>
          <linearGradient id="baseGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#E6E6E6"/>
            <stop offset="100%" stopColor="#CFCFCF"/>
          </linearGradient>
          <radialGradient id="glowGrad" cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor="#FFDE59" stopOpacity="0.35"/>
            <stop offset="100%" stopColor="#FFDE59" stopOpacity="0"/>
          </radialGradient>
        </defs>

        {/* Outer soft glow */}
        {mounted && (
          <motion.circle cx="50" cy="48" r="26" fill="url(#glowGrad)"
            animate={{ opacity: [0.2, 0.45, 0.2], r: [24, 27, 24] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {/* Bulb group with shadow */}
        <g filter="url(#bulbShadow)">
          {/* Glass */}
          <path d="M36,40 C36,27 64,27 64,40 C64,59 60,66 60,74 L40,74 C40,66 36,59 36,40 Z" fill="url(#glassGrad)" stroke="#FFFFFF" strokeWidth="1.8"/>
          {/* Reflection */}
          <path d="M46,30 C46,28 54,28 54,30" fill="none" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" opacity="0.9"/>
          {/* Base */}
          <path d="M39,74 L61,74 L59,82 L41,82 Z" fill="url(#baseGrad)" stroke="#EDEDED" strokeWidth="1"/>
          {/* Stem */}
          <path d="M50,69 L50,74" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"/>
          {/* Filament */}
          {mounted && (
            <motion.path d="M44,60 Q50,46 56,60" fill="none" stroke="#FFDE59" strokeWidth="2"
              animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </g>

        {/* Rays */}
        {mounted && (
          [
            { x1: 50, y1: 24, x2: 50, y2: 14, delay: 0.1 },
            { x1: 35, y1: 32, x2: 27, y2: 26, delay: 0.4 },
            { x1: 65, y1: 32, x2: 73, y2: 26, delay: 0.7 },
            { x1: 32, y1: 48, x2: 22, y2: 48, delay: 1.0 },
            { x1: 68, y1: 48, x2: 78, y2: 48, delay: 1.3 },
            { x1: 35, y1: 64, x2: 27, y2: 70, delay: 1.6 },
            { x1: 65, y1: 64, x2: 73, y2: 70, delay: 1.9 }
          ].map((r, i) => (
            <motion.line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2}
              stroke="#FFDE59" strokeWidth="1.5" strokeLinecap="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.75, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: r.delay }}
            />
          ))
        )}
      </motion.svg>
    </div>
  )
}

// Background particle component with client-side only rendering
const Particles = () => {
  // Use useEffect to render particles only after component mounts on client
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Always render a placeholder div with the same className on server
  if (!mounted) {
    return <div className="absolute inset-0 overflow-hidden pointer-events-none" />
  }
  
  // Pre-generated particle positions to avoid hydration mismatch
  const particles = [
    { id: 1, width: 8, height: 8, left: "15%", top: "20%", yMove: -70, xMove: 15, duration: 15, delay: 2 },
    { id: 2, width: 12, height: 12, left: "25%", top: "50%", yMove: -80, xMove: -10, duration: 18, delay: 5 },
    { id: 3, width: 7, height: 7, left: "40%", top: "30%", yMove: -60, xMove: 5, duration: 12, delay: 1 },
    { id: 4, width: 10, height: 10, left: "60%", top: "70%", yMove: -65, xMove: -8, duration: 14, delay: 4 },
    { id: 5, width: 6, height: 6, left: "75%", top: "40%", yMove: -75, xMove: 12, duration: 16, delay: 3 },
    { id: 6, width: 9, height: 9, left: "85%", top: "60%", yMove: -90, xMove: -15, duration: 20, delay: 0 },
    { id: 7, width: 11, height: 11, left: "10%", top: "80%", yMove: -85, xMove: 20, duration: 17, delay: 7 },
    { id: 8, width: 8, height: 8, left: "30%", top: "65%", yMove: -60, xMove: -5, duration: 13, delay: 8 },
    { id: 9, width: 10, height: 10, left: "50%", top: "15%", yMove: -70, xMove: 10, duration: 15, delay: 6 },
    { id: 10, width: 7, height: 7, left: "70%", top: "25%", yMove: -80, xMove: -12, duration: 19, delay: 9 },
  ]
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-[#9CB7C9]/10"
          style={{
            width: particle.width,
            height: particle.height,
            left: particle.left,
            top: particle.top,
            opacity: 0.3 // Start with a visible value to prevent flash
          }}
          animate={{
            y: [0, particle.yMove],
            x: [0, particle.xMove],
            opacity: [0.3, 0.5, 0]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear",
            delay: particle.delay
          }}
        />
      ))}
    </div>
  )
}

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { t } = useLanguage()
  const birthDate = new Date('1995-06-08')
  const initialAge = calculateAge(birthDate)
  const [age, setAge] = useState<number>(initialAge)
  
  // Calculate initial coffee count to avoid flashing
  const baseCoffeeDate = new Date('2023-01-01')
  const baseCoffeeCount = 1500
  const initialCoffeeCount = calculateCoffeeCups(baseCoffeeDate, baseCoffeeCount)
  const [coffeeCount, setCoffeeCount] = useState<number>(initialCoffeeCount)
  
  const yearsExperience = "5+" // You can adjust this
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // Still set these values on the client side to ensure they're correct,
    // but we've already set initial values to avoid the flash
    setAge(calculateAge(birthDate))
    setCoffeeCount(calculateCoffeeCups(baseCoffeeDate, baseCoffeeCount))
    setIsMounted(true)
    
    // Update coffee count at midnight each day
    const updateCoffeeCountDaily = () => {
      const now = new Date()
      const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
      tomorrow.setHours(0, 0, 0, 0)
      const timeUntilMidnight = tomorrow.getTime() - now.getTime()
      
      const timeout = setTimeout(() => {
        setCoffeeCount(prev => prev + 1)
        // Schedule the next update
        updateCoffeeCountDaily()
      }, timeUntilMidnight)
      
      return () => clearTimeout(timeout)
    }
    
    // Start the daily update cycle
    return updateCoffeeCountDaily()
  }, [birthDate, baseCoffeeDate, baseCoffeeCount])

  return (
    <section id="about" className="w-full py-20 bg-background relative overflow-hidden">
      {/* Particles will only render animations client-side */}
      <Particles />
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#9CB7C9]/5 to-transparent opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }} 
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="w-full mb-16">
            <motion.div 
              className="relative px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-5xl md:text-7xl font-bold text-foreground tracking-tight">
                {t('about.title')}
              </h2>
            </motion.div>
          </div>
          
          <div className="space-y-6 text-foreground/80 dark:text-gray-300">
            <motion.p 
              className="text-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {t('about.description1')}
            </motion.p>
            <motion.p 
              className="text-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {t('about.description2')}
            </motion.p>
            <motion.p 
              className="text-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {t('about.description3')}
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={isMounted ? { y: -5, boxShadow: "0 10px 25px -5px rgba(156, 183, 201, 0.3)" } : {}}
              className="p-8 bg-black text-white dark:bg-[#2A2A2A] rounded-lg border border-[#9CB7C9]/20 hover:border-[#9CB7C9]/50 transition-all duration-300 flex flex-col items-center shadow"
            >
              <SecurityShieldIcon />
              <h3 className="font-bold text-3xl mb-1 text-[#9CB7C9]">
                {yearsExperience}
              </h3>
              <p className="text-foreground/70 dark:text-gray-400">{t('about.cards.yearsExperience')}</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={isMounted ? { y: -5, boxShadow: "0 10px 25px -5px rgba(156, 183, 201, 0.3)" } : {}}
              className="p-8 bg-black text-white dark:bg-[#2A2A2A] rounded-lg border border-[#9CB7C9]/20 hover:border-[#9CB7C9]/50 transition-all duration-300 flex flex-col items-center shadow"
            >
              <LearningIcon />
              <h3 className="font-bold text-3xl mb-1 text-[#9CB7C9]">{age}</h3>
              <p className="text-foreground/70 dark:text-gray-400">{t('about.cards.yearsLearning')}</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={isMounted ? { y: -5, boxShadow: "0 10px 25px -5px rgba(156, 183, 201, 0.3)" } : {}}
              className="p-8 bg-black text-white dark:bg-[#2A2A2A] rounded-lg border border-[#9CB7C9]/20 hover:border-[#9CB7C9]/50 transition-all duration-300 flex flex-col items-center shadow"
            >
              <CoffeeCup />
              <h3 className="font-bold text-3xl mb-1 text-[#9CB7C9]">
                <AnimatedNumber value={coffeeCount} inView={inView} />
              </h3>
              <p className="text-foreground/70 dark:text-gray-400">{t('about.cards.coffeeCount')}</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 