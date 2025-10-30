"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { useLanguage } from "@/context/LanguageContext"
import { useState, useEffect, KeyboardEvent as ReactKeyboardEvent } from "react"
import { X, ExternalLink, Github } from "lucide-react"

type LocalizedText = {
  en: string;
  es: string;
}

interface ProjectSection {
  heading: LocalizedText;
  paragraphs?: LocalizedText[];
  bullets?: LocalizedText[];
}

interface Project {
  title: LocalizedText;
  description: LocalizedText;
  image: string;
  tags: string[];
  sections: ProjectSection[];
  link?: string;
  github?: string;
}

const projects: Project[] = [
  {
    title: {
      en: "Restoring Endpoint Visibility – Sophos Central",
      es: "Restauración de la visibilidad de endpoints – Sophos Central"
    },
    description: {
      en: "Restored endpoint visibility in Sophos Central for an international bank; remediated ~200 endpoints and resolved network policy issues.",
      es: "Restauré la visibilidad de endpoints en Sophos Central para un banco internacional; remedié ~200 endpoints y resolví problemas de políticas de red."
    },
    image: "/images/project-2.jpg",
    tags: ["Sophos Central", "Intune", "NAC", "Excel", "Active Directory"],
    sections: [
      {
        heading: { en: "Context", es: "Contexto" },
        paragraphs: [
          {
            en: "While managing cybersecurity operations for an international bank with over 5,000 endpoints across multiple locations, I identified a visibility gap within Sophos Central — several endpoints were not reporting to the console. This meant those systems were not receiving critical security updates, posing a significant attack surface risk.",
            es: "Al gestionar las operaciones de ciberseguridad de un banco internacional con más de 5,000 endpoints distribuidos en múltiples sedes, identifiqué una brecha de visibilidad en Sophos Central: varios endpoints no estaban reportando a la consola. Esto implicaba que esos sistemas no recibían actualizaciones de seguridad críticas, aumentando considerablemente la superficie de ataque."
          }
        ]
      },
      {
        heading: { en: "Investigation", es: "Investigación" },
        paragraphs: [
          {
            en: "To detect the affected endpoints, I correlated data from multiple sources — NAC, Intune, DLP, Active Directory, and Sophos Central — to generate a cross-platform report. This analysis revealed that certain devices appeared in other management consoles but not in Sophos Central.",
            es: "Para detectar los endpoints afectados, correlacioné datos de múltiples fuentes — NAC, Intune, DLP, Active Directory y Sophos Central — para generar un reporte multiplataforma. Este análisis reveló que ciertos dispositivos aparecían en otras consolas de gestión, pero no en Sophos Central."
          },
          {
            en: "Further investigation showed that the NAC policy only verified software installation, not agent communication status. As a result, disconnected endpoints were not quarantined from the network, even though they were not updating their Sophos agents.",
            es: "Una investigación más profunda mostró que la política de NAC solo verificaba la instalación del software, y no el estado de comunicación del agente. Como resultado, los endpoints desconectados no eran puestos en cuarentena de la red, a pesar de que no estaban actualizando sus agentes de Sophos."
          }
        ]
      },
      {
        heading: { en: "Root Cause Analysis", es: "Análisis de causa raíz" },
        paragraphs: [
          {
            en: "Log reviews from affected machines showed that Sophos agents could not reach Sophos Central’s public domains or the internal update cache and message relay servers. Coordination with the network team revealed that recent network policy changes had inadvertently blocked this communication due to bandwidth concerns.",
            es: "La revisión de logs en las máquinas afectadas mostró que los agentes de Sophos no podían alcanzar los dominios públicos de Sophos Central ni los servidores internos de caché de actualizaciones y de relay de mensajes. La coordinación con el equipo de redes reveló que cambios recientes en las políticas de red habían bloqueado inadvertidamente esta comunicación por preocupaciones de ancho de banda."
          }
        ]
      },
      {
        heading: { en: "Solution", es: "Solución" },
        paragraphs: [
          {
            en: "Approximately 200 endpoints across multiple branches required agent remediation. I developed and executed a recovery plan that included:",
            es: "Aproximadamente 200 endpoints en múltiples sucursales requirieron remediación del agente. Desarrollé y ejecuté un plan de recuperación que incluyó:"
          }
        ],
        bullets: [
          {
            en: "Mapping endpoint IPs to physical locations using network segment data to coordinate on-site IT actions.",
            es: "Mapear las IPs de los endpoints a ubicaciones físicas utilizando datos de segmentación de red para coordinar acciones del equipo de TI en sitio."
          },
          {
            en: "Collaborating with the IT team to reinstall and re-register the Sophos agents within a 10-day deadline.",
            es: "Colaborar con el equipo de TI para reinstalar y volver a registrar los agentes de Sophos dentro de un plazo de 10 días."
          },
          {
            en: "Optimizing agent update configurations to reduce bandwidth usage.",
            es: "Optimizar la configuración de actualizaciones del agente para reducir el consumo de ancho de banda."
          },
          {
            en: "Working with the network team to restore access to required Sophos domains and ports for update and policy synchronization.",
            es: "Trabajar con el equipo de redes para restablecer el acceso a los dominios y puertos requeridos de Sophos para sincronización de actualizaciones y políticas."
          }
        ]
      },
      {
        heading: { en: "Outcome", es: "Resultados" },
        paragraphs: [
          {
            en: "After restoring visibility, I successfully redeployed updated security policies, enforced web filtering rules, and identified misuse of corporate devices (e.g., unauthorized video streaming). The project significantly strengthened the organization’s endpoint security posture, improved bandwidth efficiency, and re-established full endpoint compliance and monitoring.",
            es: "Tras restaurar la visibilidad, volví a desplegar políticas de seguridad actualizadas, hice cumplir reglas de filtrado web e identifiqué uso indebido de dispositivos corporativos (por ejemplo, streaming de video no autorizado). El proyecto fortaleció significativamente la postura de seguridad de endpoints de la organización, mejoró la eficiencia del ancho de banda y restableció el cumplimiento y la monitorización completa de los endpoints."
          }
        ]
      }
    ]
  },
  {
    title: {
      en: "Automation of Data Wiping and Policy Enforcement for Corporate Android Devices",
      es: "Automatización de borrado de datos y aplicación de políticas para dispositivos Android corporativos"
    },
    description: {
      en: "Automated daily data wipes and enforced MDM policies on corporate Android phones using VMware Workspace ONE, improving security and compliance.",
      es: "Automaticé borrados diarios de datos y apliqué políticas MDM en teléfonos Android corporativos con VMware Workspace ONE, mejorando seguridad y cumplimiento."
    },
    image: "/images/project-3.jpg",
    tags: ["Workspace ONE", "Android", "MDM", "Automation", "AirWatch"],
    sections: [
      {
        heading: { en: "Context", es: "Contexto" },
        paragraphs: [
          {
            en: "The bank utilized corporate Android phones for customer document collection through WhatsApp Business. At the end of each day, staff members were manually deleting stored files to prevent exposure of sensitive data in case of device loss or theft. Although the institution already used Workspace ONE for tablets, no mobile management policies were applied to smartphones.",
            es: "El banco utilizaba teléfonos Android corporativos para la recolección de documentos de clientes mediante WhatsApp Business. Al final de cada día, el personal eliminaba manualmente los archivos almacenados para evitar la exposición de datos sensibles en caso de pérdida o robo del dispositivo. Aunque la institución ya usaba Workspace ONE para las tabletas, no se aplicaban políticas de gestión móvil a los teléfonos."
          }
        ]
      },
      {
        heading: { en: "Problem", es: "Problema" },
        paragraphs: [
          {
            en: "The manual data deletion process was inefficient, inconsistent, and prone to human error. Additionally, the Android phones lacked centralized policy control and monitoring, preventing visibility into user activity or device compliance.",
            es: "El proceso manual de eliminación de datos era ineficiente, inconsistente y propenso a errores humanos. Además, los teléfonos Android carecían de control y monitoreo centralizado de políticas, lo que impedía la visibilidad de la actividad del usuario o del cumplimiento del dispositivo."
          }
        ]
      },
      {
        heading: { en: "Solution", es: "Solución" },
        paragraphs: [
          {
            en: "To address these gaps, I collaborated with the sales and IT teams to define security and operational requirements, then designed and implemented custom device management profiles in VMware Workspace ONE.",
            es: "Para abordar estas brechas, colaboré con los equipos de ventas y TI para definir requisitos de seguridad y operación, y luego diseñé e implementé perfiles de gestión de dispositivos personalizados en VMware Workspace ONE."
          }
        ],
        bullets: [
          {
            en: "Creating automated workflows to wipe specific data folders daily, eliminating the need for manual file deletion.",
            es: "Crear flujos de trabajo automatizados para borrar diariamente carpetas de datos específicas, eliminando la necesidad de borrado manual."
          },
          {
            en: "Enrolling all Android devices into Workspace ONE and assigning clear ownership for device onboarding and monitoring.",
            es: "Inscribir todos los dispositivos Android en Workspace ONE y asignar propiedad clara para el alta y monitoreo de dispositivos."
          },
          {
            en: "Implementing security and compliance policies to restrict app installations, control browser access, and monitor device status.",
            es: "Implementar políticas de seguridad y cumplimiento para restringir instalaciones de apps, controlar el acceso del navegador y monitorear el estado del dispositivo."
          },
          {
            en: "Configuring automated responses such as remote data wipe and full lockout if a device was flagged as compromised or reported stolen.",
            es: "Configurar respuestas automáticas como borrado remoto de datos y bloqueo total si un dispositivo era marcado como comprometido o reportado como robado."
          }
        ]
      },
      {
        heading: { en: "Outcome", es: "Resultados" },
        paragraphs: [
          {
            en: "The automation improved both efficiency and data security across all branches. Sensitive files were securely deleted without manual intervention, while the IT team gained full visibility and control over corporate devices.",
            es: "La automatización mejoró tanto la eficiencia como la seguridad de los datos en todas las sucursales. Los archivos sensibles se eliminaron de forma segura sin intervención manual, mientras el equipo de TI obtuvo visibilidad y control completos sobre los dispositivos corporativos."
          },
          {
            en: "Additionally, employees were able to continue using the phones off-site with reduced risk, thanks to geolocation tracking and automated policy enforcement. The integration of the AirWatch agent also enabled secure mass distribution of files and links directly from the console.",
            es: "Además, los empleados pudieron seguir utilizando los teléfonos fuera de las instalaciones con menor riesgo, gracias al rastreo de geolocalización y a la aplicación automatizada de políticas. La integración del agente AirWatch también permitió la distribución masiva y segura de archivos y enlaces directamente desde la consola."
          }
        ]
      }
    ]
  },
  {
    title: {
      en: "DGA Domain Incident Response and Containment",
      es: "Respuesta a incidentes y contención ante dominio DGA"
    },
    description: {
      en: "Investigated and contained communications to a malicious DGA domain; isolated endpoint, ran live queries, and enforced blocks across endpoints and firewalls.",
      es: "Investigué y contuve comunicaciones hacia un dominio DGA malicioso; aislé el endpoint, ejecuté consultas en vivo y apliqué bloqueos en endpoints y firewalls."
    },
    image: "/images/project-4.jpg",
    tags: ["Incident Response", "DGA", "Sophos Central", "ExtraHop", "Zscaler ZIA", "Threat Intelligence"],
    sections: [
      {
        heading: { en: "Context", es: "Contexto" },
        paragraphs: [
          {
            en: "An alert was raised by ExtraHop for suspicious communication with a potential DGA (Domain Generation Algorithm) domain within the corporate network. The alert required immediate investigation to determine whether it was a false positive or an active threat.",
            es: "Se generó una alerta de ExtraHop por comunicación sospechosa con un posible dominio DGA (Domain Generation Algorithm) dentro de la red corporativa. La alerta requirió investigación inmediata para determinar si era un falso positivo o una amenaza activa."
          }
        ]
      },
      {
        heading: { en: "Actions Taken", es: "Acciones realizadas" },
        paragraphs: [
          {
            en: "While the investigation was ongoing, I initiated a proactive search using Sophos Central Live Discover to identify all endpoints communicating with the suspicious domain. I discovered one endpoint actively connected and verified that the domain and associated IPs were indeed malicious.",
            es: "Mientras la investigación estaba en curso, inicié una búsqueda proactiva utilizando Sophos Central Live Discover para identificar todos los endpoints que se comunicaban con el dominio sospechoso. Descubrí un endpoint conectado activamente y verifiqué que el dominio y las IP asociadas eran maliciosos."
          },
          {
            en: "Upon confirmation, I:",
            es: "Tras la confirmación, realicé lo siguiente:"
          }
        ],
        bullets: [
          {
            en: "Isolated the compromised endpoint through Sophos Central to prevent lateral movement while maintaining communication with the management console.",
            es: "Aislé el endpoint comprometido mediante Sophos Central para prevenir movimiento lateral, manteniendo la comunicación con la consola de gestión."
          },
          {
            en: "Executed live queries to identify processes, network ports, and data transfer activity linked to the domain.",
            es: "Ejecuté consultas en vivo para identificar procesos, puertos de red y actividad de transferencia de datos vinculados al dominio."
          },
          {
            en: "Collected and analyzed endpoint logs, reviewing prior and current-day activity to determine possible data exfiltration or internal propagation.",
            es: "Recolecté y analicé logs del endpoint, revisando actividad del día y días previos para determinar posible exfiltración de datos o propagación interna."
          },
          {
            en: "Cross-referenced IOCs using tools such as SophosLabs Intelix, Talos Intelligence, and IP/domain reputation databases.",
            es: "Crucé IOCs utilizando herramientas como SophosLabs Intelix, Talos Intelligence y bases de datos de reputación de IPs/dominios."
          },
          {
            en: "Identified related IPs and domains and performed network-wide queries to ensure no additional endpoints were affected.",
            es: "Identifiqué IPs y dominios relacionados y realicé consultas a nivel de red para asegurar que no hubiera más endpoints afectados."
          },
          {
            en: "Implemented blocking rules in both Sophos Central and perimeter firewalls for all known malicious indicators.",
            es: "Implementé reglas de bloqueo tanto en Sophos Central como en los firewalls perimetrales para todos los indicadores maliciosos conocidos."
          }
        ]
      },
      {
        heading: { en: "Outcome", es: "Resultados" },
        paragraphs: [
          {
            en: "The investigation revealed the user’s endpoint had excessive privileges and unauthorized tools (such as Python) that increased exposure risk. Access permissions and application control policies were reviewed and restricted accordingly.",
            es: "La investigación reveló que el endpoint del usuario tenía privilegios excesivos y herramientas no autorizadas (como Python) que aumentaban el riesgo de exposición. Se revisaron y restringieron los permisos de acceso y las políticas de control de aplicaciones."
          },
          {
            en: "Additionally, Zscaler ZIA was implemented to enhance web traffic visibility and strengthen threat detection at the network edge.",
            es: "Además, se implementó Zscaler ZIA para mejorar la visibilidad del tráfico web y fortalecer la detección de amenazas en el perímetro de la red."
          },
          {
            en: "This incident reinforced endpoint visibility practices, improved detection and response workflows, and enhanced the organization’s defense-in-depth posture.",
            es: "Este incidente reforzó las prácticas de visibilidad de endpoints, mejoró los flujos de detección y respuesta, y fortaleció la postura de defensa en profundidad de la organización."
          }
        ]
      }
    ]
  }
]

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { t, language } = useLanguage()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [imageErrorByIndex, setImageErrorByIndex] = useState<Record<number, boolean>>({})

  // Fix hydration issues
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Handle escape key press to close the modal
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedProject(null)
      }
    }

    if (selectedProject) {
      document.addEventListener('keydown', handleEsc)
      // Prevent body scrolling when modal is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEsc)
      // Restore body scrolling when modal is closed
      document.body.style.overflow = 'auto'
    }
  }, [selectedProject])

  const getText = (text: LocalizedText) => text[language]

  const handleCardKeyDown = (
    e: ReactKeyboardEvent<HTMLDivElement>,
    project: Project
  ) => {
    if (!isMounted) return
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setSelectedProject(project)
    }
  }

  return (
    <section id="projects" className="w-full py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="w-full mb-16">
            <motion.div 
              className="relative px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-5xl md:text-7xl font-bold text-foreground tracking-tight">
                {t('projects.title')}
              </h2>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={getText(project.title)}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => isMounted && setSelectedProject(project)}
                className="bg-black text-white dark:bg-[#2A2A2A] rounded-lg overflow-hidden border border-[#9CB7C9]/20 hover:border-[#9CB7C9]/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer shadow"
                role="button"
                tabIndex={0}
                aria-label={`Open project details: ${getText(project.title)}`}
                onKeyDown={(e) => handleCardKeyDown(e, project)}
              >
                <div className="relative h-48">
                  {!imageErrorByIndex[index] && (
                    <Image
                      src={project.image}
                      alt={getText(project.title)}
                      fill
                      className="object-cover"
                      onError={() => setImageErrorByIndex(prev => ({ ...prev, [index]: true }))}
                    />
                  )}
                  {imageErrorByIndex[index] && (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1F2937] to-[#0B1220] flex items-center justify-center">
                      <span className="text-sm text-[#9CB7C9] font-medium">{getText(project.title)}</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-[#9CB7C9]">{getText(project.title)}</h3>
                  <p className="text-foreground/80 dark:text-gray-300 mb-4">
                    {getText(project.description)}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-sm rounded-full bg-[#9CB7C9]/10 text-[#9CB7C9] border border-[#9CB7C9]/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#9CB7C9] hover:text-[#8BA5B7] transition-colors inline-flex items-center gap-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {t('projects.viewLive')}
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground/70 dark:text-gray-400 hover:text-[#9CB7C9] transition-colors inline-flex items-center gap-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {t('projects.viewGithub')}
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {isMounted && selectedProject && (
          <motion.div 
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 md:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            {/* Mobile persistent close button (fixed) */}
            <button
              className="md:hidden fixed top-4 right-4 z-[60] bg-black/60 dark:bg-black/60 text-foreground dark:text-white p-2 rounded-full hover:bg-black/80 transition-colors"
              onClick={(e) => { e.stopPropagation(); setSelectedProject(null) }}
              aria-label="Close project details"
              title="Close"
            >
              <X size={20} />
            </button>
            <motion.div
              className="bg-black text-white dark:bg-[#2A2A2A] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-lg"
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
              <div className="relative h-64 md:h-80">
                <Image
                  src={selectedProject.image}
                  alt={getText(selectedProject.title)}
                  fill
                  className="object-cover"
                />
                <button 
                  className="hidden md:flex absolute top-4 right-4 bg-black/50 dark:bg-black/50 text-foreground dark:text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close project details"
                  title="Close"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#9CB7C9]">{getText(selectedProject.title)}</h2>
                {selectedProject.sections.map((section, idx) => (
                  <div key={idx} className="mb-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">{getText(section.heading)}</h3>
                    {section.paragraphs && section.paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className="text-foreground/80 dark:text-gray-300 mb-4">
                        {getText(p)}
                      </p>
                    ))}
                    {section.bullets && (
                      <ul className="list-disc pl-5 text-foreground/80 dark:text-gray-300 space-y-1">
                        {section.bullets.map((b, bIdx) => (
                          <li key={bIdx}>{getText(b)}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
                
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3 text-foreground">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-sm rounded-full bg-[#9CB7C9]/10 text-[#9CB7C9] border border-[#9CB7C9]/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-4 pt-4 border-t border-[#3A3A3A]">
                  {selectedProject.link && (
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-[#9CB7C9] text-[#1C1C1C] rounded-lg hover:bg-[#8BA5B7] transition-colors"
                    >
                      <ExternalLink size={18} />
                      {t('projects.viewLive')}
                    </a>
                  )}
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-muted dark:bg-[#3A3A3A] text-foreground dark:text-white rounded-lg hover:bg-[#4A4A4A] transition-colors"
                    >
                      <Github size={18} />
                      {t('projects.viewGithub')}
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
} 