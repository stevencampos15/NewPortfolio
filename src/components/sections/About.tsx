"use client"

import { motion } from "framer-motion"
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

// Coffee Cup SVG Component
const CoffeeCup = () => {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  return (
    <div className="relative w-20 h-20 mx-auto mb-4">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Cup body */}
        <path
          d="M20,30 L20,70 Q20,85 35,85 L65,85 Q80,85 80,70 L80,30 Q80,30 75,30 L25,30 Q20,30 20,30 Z"
          fill="#FFFFFF"
          stroke="#DDDDDD"
          strokeWidth="2"
        />
        
        {/* Coffee liquid - static version always rendered */}
        <path
          d="M25,35 L75,35 L75,70 Q75,80 65,80 L35,80 Q25,80 25,70 Z"
          fill="#75462E"
        />
        
        {/* Coffee surface - static version always rendered */}
        <ellipse
          cx="50"
          cy="35"
          rx="25"
          ry="5"
          fill="#8C5A37"
        />
        
        {/* Cup handle */}
        <path
          d="M80,40 Q95,40 95,55 Q95,70 80,70"
          fill="transparent"
          stroke="#FFFFFF"
          strokeWidth="5"
          strokeLinecap="round"
        />
        
        {/* Cup rim highlight */}
        <path
          d="M20,30 Q20,25 25,25 L75,25 Q80,25 80,30"
          fill="#EEEEEE"
          stroke="#DDDDDD"
          strokeWidth="1"
        />
        
        {/* Saucer */}
        <ellipse cx="50" cy="85" rx="35" ry="5" fill="#FFFFFF" stroke="#DDDDDD" strokeWidth="1" />
        
        {/* Static steam */}
        <path
          d="M40,20 Q40,15 45,15 Q50,15 50,10"
          fill="transparent" 
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="1,3"
          opacity="0.3"
        />
        <path
          d="M50,20 Q50,10 55,10 Q60,10 60,5"
          fill="transparent" 
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="1,3"
          opacity="0.3"
        />
        <path
          d="M60,20 Q60,15 65,15 Q70,15 70,8"
          fill="transparent" 
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="1,3"
          opacity="0.3"
        />
        
        {/* Add animated elements only after mounting */}
        {mounted && (
          <>
            {/* Animated coffee liquid (sloshing effect) */}
            <motion.path
              d="M25,35 L75,35 L75,70 Q75,80 65,80 L35,80 Q25,80 25,70 Z"
              fill="#75462E"
              opacity="0.9"
              animate={{ 
                d: [
                  "M25,35 L75,35 L75,70 Q75,80 65,80 L35,80 Q25,80 25,70 Z", 
                  "M25,33 L75,37 L75,70 Q75,80 65,80 L35,80 Q25,80 25,70 Z",
                  "M25,37 L75,33 L75,70 Q75,80 65,80 L35,80 Q25,80 25,70 Z",
                  "M25,35 L75,35 L75,70 Q75,80 65,80 L35,80 Q25,80 25,70 Z"
                ]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Animated coffee ripples */}
            <motion.ellipse
              cx="50"
              cy="35"
              rx="25"
              ry="5"
              fill="#8C5A37"
              opacity="0.7"
              animate={{ 
                ry: [5, 3, 5],
                rx: [25, 24, 25]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Animated steam */}
            <motion.path
              d="M40,20 Q40,15 45,15 Q50,15 50,10"
              fill="transparent" 
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="1,3"
              opacity="0.3"
              animate={{ 
                opacity: [0.3, 0.7, 0.3],
                y: [-1, 1, -1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity
              }}
            />
            <motion.path
              d="M50,20 Q50,10 55,10 Q60,10 60,5"
              fill="transparent" 
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="1,3"
              opacity="0.3"
              animate={{ 
                opacity: [0.3, 0.7, 0.3],
                y: [-1, 1, -1]
              }}
              transition={{ 
                duration: 2.5,
                repeat: Infinity,
                delay: 0.5
              }}
            />
            <motion.path
              d="M60,20 Q60,15 65,15 Q70,15 70,8"
              fill="transparent" 
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="1,3"
              opacity="0.3"
              animate={{ 
                opacity: [0.3, 0.7, 0.3],
                y: [-1, 1, -1]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                delay: 1
              }}
            />
          </>
        )}
      </svg>
    </div>
  )
}

// Experience Icon Component
const ExperienceIcon = () => {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  return (
    <div className="relative w-20 h-20 mx-auto mb-4">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Rocket body - static version */}
        <path
          d="M50,20 L60,40 L60,70 Q60,80 50,80 Q40,80 40,70 L40,40 Z"
          fill="#FFFFFF"
          stroke="#DDDDDD"
          strokeWidth="2"
        />
        
        {/* Window - static version */}
        <circle
          cx="50"
          cy="50"
          r="8"
          fill="#9CB7C9"
          opacity="0.7"
        />
        
        {/* Fins - static version */}
        <path 
          d="M40,70 L30,85 L40,80 Z"
          fill="#FFFFFF"
          stroke="#DDDDDD"
          strokeWidth="1"
        />
        <path 
          d="M60,70 L70,85 L60,80 Z"
          fill="#FFFFFF"
          stroke="#DDDDDD"
          strokeWidth="1"
        />
        
        {/* Rocket flames - static version */}
        <path 
          d="M45,80 Q50,95 55,80"
          fill="transparent"
          stroke="#FF6B6B"
          strokeWidth="3"
          strokeLinecap="round"
        />
        
        {/* Add animated elements only after mounting */}
        {mounted && (
          <>
            {/* Animated window */}
            <motion.circle
              cx="50"
              cy="50"
              r="8"
              fill="#9CB7C9"
              opacity="0.7"
              animate={{ 
                opacity: [0.7, 1, 0.7],
                r: [8, 8.5, 8]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Animated rocket body */}
            <motion.g
              animate={{ 
                y: [0, -3, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Main rocket flame */}
              <motion.path
                d="M45,80 Q50,95 55,80"
                fill="transparent"
                stroke="#FF6B6B"
                strokeWidth="3"
                strokeLinecap="round"
                animate={{ 
                  d: [
                    "M45,80 Q50,95 55,80",
                    "M45,80 Q50,100 55,80",
                    "M45,80 Q50,95 55,80"
                  ],
                  stroke: ["#FF6B6B", "#FFA500", "#FF6B6B"]
                }}
                transition={{ 
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Inner flame glow */}
              <motion.path
                d="M47,80 Q50,90 53,80"
                fill="transparent"
                stroke="#FFDD00"
                strokeWidth="2"
                strokeLinecap="round"
                animate={{
                  d: [
                    "M47,80 Q50,90 53,80",
                    "M47,80 Q50,93 53,80",
                    "M47,80 Q50,90 53,80"
                  ],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Small flame particles */}
              <motion.g>
                <motion.circle
                  cx="48"
                  cy="93"
                  r="1"
                  fill="#FFDD00"
                  animate={{
                    opacity: [0, 0.8, 0],
                    y: [0, 10, 20],
                    x: [-2, -4, -6]
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                />
                <motion.circle
                  cx="50"
                  cy="93"
                  r="1"
                  fill="#FFDD00"
                  animate={{
                    opacity: [0, 0.8, 0],
                    y: [0, 12, 24]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: 0.3
                  }}
                />
                <motion.circle
                  cx="52"
                  cy="93"
                  r="1"
                  fill="#FFDD00"
                  animate={{
                    opacity: [0, 0.8, 0],
                    y: [0, 10, 20],
                    x: [2, 4, 6]
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: 0.6
                  }}
                />
              </motion.g>
            </motion.g>
          </>
        )}
      </svg>
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
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Lightbulb stem */}
        <path
          d="M50,70 L50,75"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
        />
        
        {/* Lightbulb base */}
        <path
          d="M40,75 L60,75 L58,82 L42,82 Z"
          fill="#DDDDDD"
          stroke="#FFFFFF"
          strokeWidth="1.5"
        />
        
        {/* Lightbulb glass */}
        <path
          d="M38,40 C38,28 62,28 62,40 C62,60 58,68 58,75 L42,75 C42,68 38,60 38,40 Z"
          fill="#9CB7C950"
          stroke="#FFFFFF"
          strokeWidth="2"
        />
        
        {/* Lightbulb top reflection */}
        <path
          d="M46,32 C46,30 54,30 54,32"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.8"
        />
        
        {/* Add animated elements only after mounting */}
        {mounted && (
          <>
            {/* Animated lightbulb glow - outer */}
            <motion.ellipse
              cx="50"
              cy="50"
              rx="22"
              ry="30"
              fill="#FFDE5920"
              animate={{ 
                opacity: [0.1, 0.3, 0.1],
                rx: [22, 25, 22],
                ry: [30, 33, 30]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Animated lightbulb glow - inner */}
            <motion.ellipse
              cx="50"
              cy="50"
              rx="15"
              ry="22"
              fill="#FFDE5930"
              animate={{ 
                opacity: [0.2, 0.5, 0.2],
                rx: [15, 17, 15],
                ry: [22, 24, 22]
              }}
              transition={{ 
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.2
              }}
            />
            
            {/* Animated filament */}
            <motion.path
              d="M44,60 Q50,45 56,60"
              fill="none"
              stroke="#FFDE59"
              strokeWidth="2"
              strokeLinecap="round"
              animate={{ 
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Light rays */}
            {[
              { x1: 50, y1: 25, x2: 50, y2: 15, delay: 0.1 },
              { x1: 50, y1: 50, x2: 30, y2: 30, delay: 0.4 },
              { x1: 50, y1: 50, x2: 70, y2: 30, delay: 0.7 },
              { x1: 50, y1: 50, x2: 25, y2: 50, delay: 1.0 },
              { x1: 50, y1: 50, x2: 75, y2: 50, delay: 1.3 },
              { x1: 50, y1: 50, x2: 30, y2: 65, delay: 1.6 },
              { x1: 50, y1: 50, x2: 70, y2: 65, delay: 1.9 }
            ].map((ray, i) => (
              <motion.line
                key={`ray-${i}`}
                x1={ray.x1}
                y1={ray.y1}
                x2={ray.x2}
                y2={ray.y2}
                stroke="#FFDE59"
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0, 0.7, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: ray.delay
                }}
              />
            ))}
            
            {/* Light particles */}
            {[
              { cx: 40, cy: 35, size: 4, delay: 0.2 },
              { cx: 60, cy: 35, size: 3, delay: 0.6 },
              { cx: 35, cy: 55, size: 3, delay: 1.0 },
              { cx: 65, cy: 55, size: 4, delay: 1.4 },
              { cx: 50, cy: 30, size: 3, delay: 1.8 }
            ].map((particle, i) => (
              <motion.circle
                key={`particle-${i}`}
                cx={particle.cx}
                cy={particle.cy}
                r={particle.size / 2}
                fill="#FFDE59"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0, 0.8, 0],
                  y: [-2, -particle.size * 2],
                  x: [0, (Math.random() * 4) - 2]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: particle.delay
                }}
              />
            ))}
          </>
        )}
      </svg>
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
              <ExperienceIcon />
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
                {coffeeCount}
              </h3>
              <p className="text-foreground/70 dark:text-gray-400">{t('about.cards.coffeeCount')}</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 