type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  technologies: readonly string[];
  accent: string;
  live?: string;
  github?: string;
  featured: boolean;
};

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Work", href: "#work" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
] as const;

export const socialLinks = [
  { label: "GitHub", href: "https://github.com/Arjun-Sai-Charan" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/arjun-sai-charan-kotte-2a210b306/",
  },
  { label: "Email", href: "mailto:kottearjunsaicharan@gmail.com" },
] as const;

export const stats = [
  { value: "8.58", label: "CGPA" },
  { value: "3", label: "internships" },
  { value: "2022–26", label: "B.Tech" },
  { value: "AI / RAG", label: "current focus" },
] as const;

export const skillGroups = [
  {
    name: "AI & Systems",
    items: ["Python", "Scikit-Learn", "LLM Pipelines", "RAG", "Data Mining", "Anomaly Detection"],
  },
  {
    name: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion", "UI Design"],
  },
  {
    name: "Backend",
    items: ["FastAPI", "Node.js", "REST APIs", "PostgreSQL", "Socket.io", "Realtime Systems"],
  },
  {
    name: "Workflow",
    items: ["Git", "CI/CD", "Testing", "Product Thinking", "System Design", "Optimization"],
  },
] as const;

export const projects: readonly Project[] = [
  {
    slug: "ai-course-generator",
    title: "AI Course Generator",
    category: "AI / Full Stack",
    description:
      "An AI-powered course generation platform that creates structured learning content using large language models, with a full-stack web interface for generating and exploring courses.",
    technologies: ["Next.js", "React", "OpenAI", "Google Gemini", "PostgreSQL", "Drizzle ORM"],
    accent: "#7cffb2",
    live: "https://ai-course-generator-finalyear.vercel.app/",
    featured: true,
  },
  {
    slug: "network-sentinel",
    title: "Network Sentinel",
    category: "AI / Machine Learning",
    description:
      "A machine learning-based anomaly detection project designed to identify unusual patterns in network-related data.",
    technologies: ["Python", "Scikit-Learn", "Isolation Forest"],
    accent: "#7cffb2",
    github: "https://github.com/Arjun-Sai-Charan/Network-Sentinel",
    featured: true,
  },
  {
    slug: "customer-support-ai",
    title: "Customer Support AI Employee",
    category: "RAG / AI Application",
    description:
      "A RAG-powered Tier-1 customer support assistant that classifies incoming requests, retrieves relevant knowledge-base information, generates grounded responses, and escalates low-confidence queries to a human.",
    technologies: ["Python", "Google Gemini", "RAG", "LlamaIndex", "Chroma", "Sentence Transformers", "Streamlit"],
    accent: "#86a8ff",
    github: "https://github.com/Arjun-Sai-Charan/Customer-Support-AI-Employee-Tier-1-Triage-",
    featured: true,
  },
] as const;

export const journey = [
  {
    year: "2022–2026",
    title: "B.Tech, Computer Science Engineering",
    place: "JNTUA College of Engineering, Pulivendula",
    description: "Completed my B.Tech in Computer Science Engineering, building a foundation in programming, algorithms, databases, software development, and machine learning.",
  },
  {
    year: "2024",
    title: "Cybersecurity Intern",
    place: "Edunet Foundation",
    description: "Gained practical exposure to cybersecurity concepts, security workflows, and problem solving through an internship focused on cybersecurity.",
  },
  {
    year: "2025",
    title: "AI in Marketing Intern",
    place: "IIT Madras",
    description: "Worked on an AI-driven research project analyzing service recovery strategies between competing firms, using AI APIs, Python, data analysis, and visualization to derive insights.",
  },
  {
    year: "2025",
    title: "AI/ML Intern",
    place: "SmartBridge",
    description: "Gained practical experience working with Python, machine learning workflows, data processing, and AI/ML applications during an internship at SmartBridge.",
  },
  {
    year: "Now",
    title: "Building AI-powered applications",
    place: "AI / ML · RAG · Full Stack",
    description: "Currently focused on building practical applications across AI, machine learning, RAG, APIs, and full-stack development while continuing to strengthen my software development skills.",
  },
] as const;
