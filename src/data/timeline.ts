export interface TimelineItem {
  date: string;
  title: string;
  description: string;
  skills: string[];
}

export const timelineData: TimelineItem[] = [
  {
    date: "2013-2014",
    title: "Systems Engineering Technician",
    description: "Completed my technical degree in Systems Engineering, where I gained strong foundations in software development, databases, and networking.",
    skills: ["Java", "SQL", "Networking", "Systems Analysis"],
  },
  {
    date: "2014",
    title: "CCNA Certification",
    description: "Completed the CCNA certification program, learning about network fundamentals, routing, and switching technologies.",
    skills: ["Networking", "Routing", "Switching", "Network Security"],
  },
  {
    date: "2018",
    title: "Java Development Diploma",
    description: "Specialized in Java development, focusing on enterprise applications and modern development practices.",
    skills: ["Java", "Spring", "Enterprise Development", "Design Patterns"],
  },
]; 