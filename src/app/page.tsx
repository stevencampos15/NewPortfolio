import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Projects from '@/components/sections/Projects'
import Certifications from '@/components/sections/Certifications'
import Contact from '@/components/sections/Contact'
import Skills from '@/components/sections/Skills'
import { Timeline } from '@/components/timeline'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <About />
      <Timeline />
      <Skills />
      <Certifications />
      <Projects />
      <Contact />
    </main>
  )
}
