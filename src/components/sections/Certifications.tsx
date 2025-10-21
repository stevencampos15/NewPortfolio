"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useLanguage } from "@/context/LanguageContext"
import { Shield, Server, Globe, Activity, Terminal, Layers, Cpu, Database, Award } from "lucide-react"
import React from "react"

type Certification = {
  title: string
  vendor: string
  date: string
  link?: string
}

const certifications: Certification[] = [
  { title: "Palo Alto Networks Certified Cybersecurity Practitioner", vendor: "PALO ALTO", date: "OCT 2025" },
  { title: "Sophos Central Endpoint Protection Certified Engineer", vendor: "SOPHOS", date: "OCT 2025" },
  { title: "Sophos Detection and Response", vendor: "SOPHOS", date: "OCT 2025" },
  { title: "Network Defense Essentials (NDE)", vendor: "EC-Councill", date: "APR 2024" },
  { title: "Troubleshooting Workspace One UEM", vendor: "VMWARE", date: "FEB 2024" },
  { title: "Certified in Cybersecurity", vendor: "ISC2", date: "JAN 2024" },
  { title: "Arbor Edge Defense", vendor: "NETSCOUT", date: "OCT 2023" },
  { title: "Firewall XG - Engineer", vendor: "SOPHOS", date: "NOV 2023" },
  { title: "Sophos Central Endpoint and Server", vendor: "SOPHOS", date: "SEPT 2023" },
  { title: "CyberSecurity Asset Management", vendor: "QUALYS", date: "AUG 2023" },
  { title: "ETS - TOEIC - 900 Points", vendor: "THE TOEIC PROGRAM", date: "JAN 2021" },
  { title: "Veracode Certified Advisor", vendor: "VERACODE", date: "OCT 2020" },
  { title: "Redhat Accreditation", vendor: "REDHAT RHCSA", date: "JAN 2020" },
  { title: "JAVA", vendor: "ITCA-FEPADE", date: "OCT 2018" },
  { title: "CCNA", vendor: "CISCO", date: "JAN 2014" },
  { title: "IT ESSENTIALS", vendor: "CISCO", date: "JAN 2014" },
]

export default function Certifications() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const { t } = useLanguage()

  const pickIcon = (c: Certification): React.ElementType => {
    const name = c.title.toLowerCase()
    const vendor = c.vendor.toLowerCase()
    if (name.includes("sophos") || vendor.includes("sophos")) return Shield
    if (name.includes("palo alto") || vendor.includes("palo alto")) return Shield
    if (vendor.includes("isc2") || name.includes("cybersecurity")) return Shield
    if (vendor.includes("vmware") || name.includes("workspace one") || name.includes("server")) return Server
    if (vendor.includes("netscout") || name.includes("network") || name.includes("vpn") || name.includes("ccna")) return Globe
    if (vendor.includes("qualys") || name.includes("asset") || name.includes("detection") || name.includes("response")) return Activity
    if (vendor.includes("veracode") || name.includes("waf") || name.includes("f5")) return Layers
    if (vendor.includes("redhat") || name.includes("linux")) return Cpu
    if (name.includes("toeic")) return Award
    if (name.includes("java") || name.includes("it essentials")) return Terminal
    return Award
  }

  return (
    <section id="certifications" className="w-full py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="w-full mb-12">
            <motion.div
              className="relative px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-5xl md:text-7xl font-bold text-foreground tracking-tight">
                {t('certifications.title')}
              </h2>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-3">
            {certifications.map((c) => (
              <motion.div
                key={`${c.title}-${c.date}`}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4 }}
                whileTap={{ rotate: -8, scale: 0.96 }}
                onClick={() => { if (c.link) window.open(c.link, '_blank', 'noopener,noreferrer') }}
                onKeyDown={(e) => { if ((e.key === 'Enter' || e.key === ' ') && c.link) window.open(c.link, '_blank', 'noopener,noreferrer') }}
                role={c.link ? 'link' : undefined}
                tabIndex={0}
                aria-label={c.link ? `${c.title} - open certification` : c.title}
                className={`group relative p-3 md:p-4 bg-black text-white dark:bg-[#2A2A2A] rounded-xl border border-[#9CB7C9]/20 hover:border-transparent transition-all shadow flex flex-col aspect-square ${c.link ? 'cursor-pointer' : 'cursor-default'}`}
              >
                {/* Hover background overlay (persists while hovered) */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-[#9CB7C9] z-0"></div>

                <div className="flex flex-col items-start gap-1.5 mb-1 z-10">
                  <div className="text-[#9CB7C9] group-hover:text-black transition-colors">
                    {React.createElement(pickIcon(c), { size: 24 })}
                  </div>
                  <h3 className="text-sm md:text-base font-semibold text-foreground leading-snug group-hover:text-black transition-colors">
                    {c.title}
                  </h3>
                </div>
                <div className="mt-auto flex items-center justify-between z-10">
                  <p className="text-[10px] md:text-xs text-muted-foreground group-hover:text-black transition-colors">{c.vendor}</p>
                  <div className="text-[10px] md:text-xs text-muted-foreground group-hover:text-black transition-colors">{c.date}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}


