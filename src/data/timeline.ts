export interface TimelineItem {
  date: string;
  title: string;
  description: string;
  place?: string;
  skills: string[];
  type: 'job' | 'education';
}

export type TimelineDataByLanguage = {
  en: TimelineItem[];
  es: TimelineItem[];
}

export const timelineDataByLang: TimelineDataByLanguage = {
  en: [
    // Most recent to oldest
    {
      date: "APR 2023 - Present",
      title: "Cybersecurity Specialist",
      description: "Provided cybersecurity support for an international banking client, managing and monitoring tools like Sophos Central, Palo Alto, Zscaler, and Symantec DLP. Oversee policy deployment, MDM (Workspace ONE), and perimeter defense with Arbor Edge Defense. Perform data analysis and reporting to strengthen threat visibility, compliance, and network protection.",
      place: "SISAP SA CV",
      skills: ["Cybersecurity", "Firewalls", "DLP", "Zscaler", "MDM", "NetworkSecurity", "IncidentResponse"],
      type: 'job',
    },
    {
      date: "Feb 2022 - APR 2023",
      title: "IT Support Specialist",
      description: "Delivered comprehensive IT support in a Windows-based environment, managing hardware, software, network, and application issues while ensuring secure and reliable operations. Provided VPN and remote access assistance, maintained Active Directory and Office 365 environments, and applied patches to strengthen endpoint protection. Gained solid experience in incident response, system hardening, and user security awareness.",
      place: "The Office Gurus",
      skills: ["ActiveDirectory", "Office365", "VPN", "WindowsSupport", "EndpointSecurity", "IncidentResponse"],
      type: 'job',
    },
    {
      date: "2022",
      title: "Bachelor’s in Information Technology",
      description: "Completed a Bachelor’s degree in Information Technology, gaining a strong foundation in computer systems, networks, programming, cybersecurity and information security principles.",
      place: "Universidad Jose Matias Delgado",
      skills: ["InformationTechnology", "Networking", "SoftwareDevelopment", "CybersecurityFundamentals"],
      type: 'education',
    },
    {
      date: "Sept 2020 - Dec 2021",
      title: "Consultant - Cybersecurity",
      description: "Delivered consultancy and technical support for F5 services, specializing in load balancing and WAF configuration with nginx and F5. Resolved network security and performance issues while enhancing application security and high availability for client environments.",
      place: "Intelector El Salvador, SA",
      skills: ["F5", "WAF", "LoadBalancing", "Nginx", "NetworkSecurity"],
      type: 'job',
    },
    {
      date: "Aug 2017 - Aug 2018",
      title: "Sales Specialist – North American Market",
      description: "While in a sales role, I ensured data privacy and secure handling of client information, enhanced social engineering awareness and communication, and strengthened problem-solving and ethical responsibility when handling sensitive customer data.",
      place: "Focus Services",
      skills: ["DataPrivacy", "SocialEngineeringAwareness", "Communication"],
      type: 'job',
    },
    {
      date: "Aug 2015 – Feb 2016",
      title: "Deputy Technology Manager & Administrative Assistant",
      description: "Developed a secured, web based Student Management and Billing System, implementing authentication, role-based access controls, and input validation to safeguard sensitive academic and financial data. Collaborated with administrative teams to automate workflows and maintain compliance with internal information security policies.",
      place: "UTLA",
      skills: ["Java", "MySQL", "SecureDevelopment", "WebSecurity", "DataIntegrity"],
      type: 'job',
    },
    {
      date: "2013 - 2014",
      title: "Systems Engineering Technician",
      description: "Completed my technical degree in Systems Engineering, where I gained strong foundations in software development, databases, and networking.",
      place: "ITCA-FEPADE",
      skills: ["Java", "SQL", "Networking", "SystemsAnalysis"],
      type: 'education',
    },
  ],
  es: [
    {
      date: "Abr 2023 - Presente",
      title: "Especialista en Ciberseguridad",
      description: "Brindé soporte de ciberseguridad para un cliente bancario internacional, gestionando y monitoreando herramientas como Sophos Central, Palo Alto, Zscaler y Symantec DLP. Supervisé el despliegue de políticas, MDM (Workspace ONE) y la defensa perimetral con Arbor Edge Defense. Realicé análisis de datos y reportes para fortalecer la visibilidad de amenazas, el cumplimiento y la protección de la red.",
      place: "SISAP SA CV",
      skills: ["Ciberseguridad", "Firewalls", "DLP", "Zscaler", "MDM", "Seguridad de Red", "Respuesta a Incidentes"],
      type: 'job',
    },
    {
      date: "Feb 2022 - Abr 2023",
      title: "Especialista de Soporte de TI",
      description: "Brindé soporte integral de TI en un entorno basado en Windows, gestionando incidencias de hardware, software, red y aplicaciones, asegurando operaciones seguras y confiables. Proporcioné asistencia de VPN y acceso remoto, mantuve entornos de Active Directory y Office 365, y apliqué parches para fortalecer la protección de endpoints. Obtuve experiencia en respuesta a incidentes, endurecimiento de sistemas y concienciación de seguridad para usuarios.",
      place: "The Office Gurus",
      skills: ["Active Directory", "Office 365", "VPN", "Soporte Windows", "Seguridad de Endpoints", "Respuesta a Incidentes"],
      type: 'job',
    },
    {
      date: "2022",
      title: "Licenciatura en Tecnología de la Información",
      description: "Completé una licenciatura en Tecnología de la Información, adquiriendo una base sólida en sistemas informáticos, redes, programación, ciberseguridad y principios de seguridad de la información.",
      place: "Universidad José Matías Delgado",
      skills: ["Tecnología de la Información", "Redes", "Desarrollo de Software", "Fundamentos de Ciberseguridad"],
      type: 'education',
    },
    {
      date: "Sept 2020 - Dic 2021",
      title: "Consultor - Ciberseguridad",
      description: "Entregué consultoría y soporte técnico para servicios F5, especializado en balanceo de carga y configuración de WAF con nginx y F5. Resolví problemas de seguridad y rendimiento de red, mejorando la seguridad de aplicaciones y la alta disponibilidad en entornos de clientes.",
      place: "Intelector El Salvador, SA",
      skills: ["F5", "WAF", "Balanceo de Carga", "Nginx", "Seguridad de Red"],
      type: 'job',
    },
    {
      date: "Ago 2017 - Ago 2018",
      title: "Especialista de Ventas – Mercado Norteamericano",
      description: "Aunque en un cargo comercial, aseguré la privacidad y el manejo seguro de la información de clientes, reforzando la conciencia sobre ingeniería social y la comunicación, con mayor capacidad de resolución de problemas y conducta ética al tratar datos sensibles.",
      place: "Focus Services",
      skills: ["Privacidad de Datos", "Concienciación en Ingeniería Social", "Comunicación"],
      type: 'job',
    },
    {
      date: "Ago 2015 – Feb 2016",
      title: "Subgerente de Tecnología y Asistente Administrativo",
      description: "Desarrollé un Sistema de Gestión Estudiantil y Facturación web y seguro, implementando autenticación, controles de acceso basados en roles y validación de entradas para resguardar datos académicos y financieros sensibles. Colaboré con equipos administrativos para automatizar flujos de trabajo y mantener el cumplimiento de políticas internas de seguridad de la información.",
      place: "UTLA",
      skills: ["Java", "MySQL", "Desarrollo Seguro", "Seguridad Web", "Integridad de Datos"],
      type: 'job',
    },
    {
      date: "2013 - 2014",
      title: "Técnico en Ingeniería de Sistemas",
      description: "Completé mi carrera técnica en Ingeniería de Sistemas, donde adquirí bases sólidas en desarrollo de software, bases de datos y redes.",
      place: "ITCA-FEPADE",
      skills: ["Java", "SQL", "Redes", "Análisis de Sistemas"],
      type: 'education',
    },
  ],
}