// Types
export interface AboutData {
  bio: string;
  keywords: string[];
}

export interface ExperienceData {
  id: string;
  role: string;
  company: string;
  duration: string;
  achievements: string[];
}

export interface ProjectGalleryImage {
  url: string;
  description: string;
}

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  tags: string[];
  github_url: string;
  overview: string;
  tools_used: string[];
  video_url?: string;
  image_gallery: ProjectGalleryImage[];
  outcome: string;
}

export interface SkillData {
  id: string;
  name: string;
  category: string;
  icon_name: string;
}

export interface CertificationData {
  id: string;
  title: string;
  issuer: string;
  badge_url: string;
}

export interface BookEntry {
  title: string;
  notes: string[];
}

export interface EventEntry {
  id: string;
  title: string;
  description: string;
  date: string;
  photo_url: string;
}

export interface PersonalInfoData {
  books: BookEntry[];
  events: EventEntry[];
}


// Edit the values below to update site content.
const ABOUT: AboutData = {
  bio: "I'm a Data & Automation Specialist who builds end-to-end data pipelines, multi-layer data models using the Kimball methodology, and centralized BI reporting for executives. I work across the full data stack — from Python and SQL automation to DAX and Power Query semantic models — and I build production ML pipelines, including a fraud detection model with 91% F1, plus a recommendation engine built from scratch on association rule mining. I care about pipeline-to-insight ownership: not just visualizing data, but engineering the systems that make it useful.",
  keywords: ["data pipelines", "Kimball methodology", "BI reporting", "ML pipelines", "association rule mining"]
};

const EXPERIENCE: ExperienceData[] = [
  {
    id: "1",
    role: "Data Analyst",
    company: "Saudi Services Company Limited (SSCL)",
    duration: "Oct 2024 – Present",
    achievements: [
      "Own end-to-end analytics for corporate fleet and asset data — designed a multi-source data model with conditional logic and optimized DAX to govern and reconcile vehicle records across disparate registries.",
      "Built Python/Pandas pipelines to clean and standardize raw data feeds, replacing manual spreadsheet processing and removing recurring data-entry errors.",
      "Reduced Power BI dashboard load time by 29% by restructuring the underlying data model and rewriting DAX, improving responsiveness across all executive-facing reports.",
      "Designed and deployed 10+ production dashboards across logistics, HR, and operations, replacing ad hoc Excel reporting as the primary reporting layer for department heads.",
      "Engineered a consolidated \"Consumption\" budget pipeline pulling inputs from 60+ departments into a single automated report, eliminating a manual annual forecasting process.",
      "Supervised 5 on-the-job trainees across two cohorts in data analytics, managing task allocation and code reviews for pipeline development."
    ]
  }
];

const PROJECTS: ProjectData[] = [
  {
    id: "1",
    title: "Co-Thinker — Agentic AI Tutoring Workspace",
    description: "A spatial AI tutoring agent built with React and the Gemini 1.5 Pro API that guides students with hints instead of direct answers.",
    thumbnail_url: `${import.meta.env.BASE_URL}projects/co-thinker.svg`,
    tags: ["AI"],
    github_url: "",
    overview: "Architected a spatial AI tutoring agent using React and the Gemini 1.5 Pro API, with a custom logic layer linking on-screen annotations to document coordinates for context-aware responses. Designed an agentic workflow with a Socratic tutoring pattern — the agent withholds direct answers and instead generates targeted hints, guiding the student's own reasoning.",
    tools_used: ["React", "Gemini 1.5 Pro API", "Agentic Workflows"],
    image_gallery: [],
    outcome: "Delivered a working agentic tutoring prototype that reasons about spatial document context and guides students toward answers instead of just providing them."
  },
  {
    id: "2",
    title: "Fraud Detection — Python ML Pipeline + Power BI",
    description: "A fraud detection pipeline benchmarking 4 ML algorithms on imbalanced transaction data, with predictions surfaced in Power BI.",
    thumbnail_url: `${import.meta.env.BASE_URL}projects/fraud-detection.svg`,
    tags: ["AI", "Data Analysis"],
    github_url: "",
    overview: "Built a full fraud-detection pipeline handling imbalanced transaction data, benchmarking 4 algorithms, and achieving an F1 score of 91% on the best-performing model. Surfaced model predictions and risk scores in a live Power BI dashboard.",
    tools_used: ["Python", "Scikit-learn", "XGBoost", "Power BI"],
    image_gallery: [],
    outcome: "Achieved an F1 score of 91% on the best-performing model, with risk scores surfaced directly to business stakeholders via Power BI."
  },
  {
    id: "3",
    title: "Jayil — Tourism Recommendation Engine",
    description: "A full-stack travel recommendation app powered by a custom association rule mining algorithm coded from scratch.",
    thumbnail_url: `${import.meta.env.BASE_URL}projects/jayil.svg`,
    tags: ["AI", "Automation"],
    github_url: "",
    overview: "Implemented a customized Disjunctive Association Rule Mining algorithm from academic research, coded from scratch without high-level libraries, to model non-traditional item-to-item associations. Re-engineered core data structures to reduce time complexity and accelerate recommendation latency for single- and group-travel itinerary generation. Built the full pipeline end-to-end: Google Maps data extraction (R) → recommendation algorithm (Python) → Flask API → Flutter app with Firebase backend and Mapbox maps.",
    tools_used: ["Python", "R", "Flask", "Association Rule Mining"],
    image_gallery: [],
    outcome: "Delivered a full-stack recommendation engine with a from-scratch algorithm optimized for low-latency itinerary generation. Graduation project, 2023."
  }
];

const SKILLS: SkillData[] = [
  { id: "1", name: "Machine Learning", category: "Artificial Intelligence", icon_name: "FiCpu" },
  { id: "2", name: "Agentic AI & LLM Integration", category: "Artificial Intelligence", icon_name: "FiMessageSquare" },
  { id: "3", name: "Recommendation Systems", category: "Artificial Intelligence", icon_name: "FiGitBranch" },
  { id: "4", name: "Feature Engineering", category: "Artificial Intelligence", icon_name: "FiSettings" },
  { id: "5", name: "Power Automate", category: "Automation", icon_name: "FiRepeat" },
  { id: "6", name: "Python/Pandas Pipelines", category: "Automation", icon_name: "FiTerminal" },
  { id: "7", name: "API Integrations", category: "Automation", icon_name: "FiLink" },
  { id: "8", name: "Scheduled Refresh Automation", category: "Automation", icon_name: "FiClock" },
  { id: "9", name: "Data Modeling (Kimball & Star Schema)", category: "Data Analysis", icon_name: "FiLayers" },
  { id: "10", name: "Executive & Centralized Reporting", category: "Data Analysis", icon_name: "FiTrendingUp" },
  { id: "11", name: "Metric Definition", category: "Data Analysis", icon_name: "FiActivity" },
  { id: "12", name: "Python", category: "Technical Stack", icon_name: "FiCode" },
  { id: "13", name: "SQL", category: "Technical Stack", icon_name: "FiDatabase" },
  { id: "14", name: "Power BI", category: "Technical Stack", icon_name: "FiBarChart2" },
  { id: "15", name: "DAX & Power Query (M)", category: "Technical Stack", icon_name: "FiPieChart" },
  { id: "16", name: "Tableau", category: "Technical Stack", icon_name: "FiMonitor" },
  { id: "17", name: "Oracle ERP", category: "Technical Stack", icon_name: "FiCloud" },
  { id: "18", name: "Git & GitHub", category: "Technical Stack", icon_name: "FiGithub" }
];

const CERTIFICATIONS: CertificationData[] = [
  { id: "1", title: "Microsoft Certified: Azure AI Engineer Associate", issuer: "Microsoft · In Progress (95%+)", badge_url: "" },
  { id: "2", title: "DAX in Semantic Models", issuer: "Microsoft Learn · Aug 2025", badge_url: "" },
  { id: "3", title: "Model Data with Power BI", issuer: "Microsoft Learn · Aug 2025", badge_url: "" },
  { id: "4", title: "Google Data Analytics", issuer: "Coursera · Sep 2024", badge_url: "" },
  { id: "5", title: "Machine Learning: AI, Python & R", issuer: "Udemy · Aug 2024", badge_url: "" },
];

const PERSONAL_INFO: PersonalInfoData = {
  books: [],
  events: []
};

export function usePortfolioData() {
  return {
    about: ABOUT,
    experience: EXPERIENCE,
    projects: PROJECTS,
    skills: SKILLS,
    certifications: CERTIFICATIONS,
    personalInfo: PERSONAL_INFO,
  };
}
