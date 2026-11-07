// Types
export interface ProfileData {
  name: string;
  location: string;
  /** Hero intro, shown after "I'm <name>, ". */
  intro: string;
  /** CV file in public/ (linked from the hero's "Download CV" button). */
  cv_file: string;
  github_url: string;
  linkedin_url: string;
  email: string;
}

export interface EducationData {
  degree: string;
  school: string;
  dates: string;
  gpa: string;
  honours: string;
}

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
  /** Optional short timeline shown in the project page header, e.g. "Hackathon Aug 2025 · Rebuilt 2026". */
  date?: string;
  /** Shows a disabled "Live demo — Coming soon" item in the Links card. Remove it once a real `video_url` exists. */
  demo_status?: "coming_soon";
  /** Small note at the bottom of the Links card, e.g. "Source code available on request". */
  source_note?: string;
  /** "grid" (default): two images per row, good for charts. "full": one image per row at full width, good for wide app screenshots. */
  gallery_layout?: "grid" | "full";
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
  /** Shown on its own line under the issuer, e.g. "May 2026". */
  date?: string;
  /** Badge image URL (square images look best; shown at 112×112, never cropped). Leave "" for a placeholder icon. */
  badge_url?: string;
  /** Link to the verified credential. When set, the card becomes a link that opens in a new tab. */
  credential_url?: string;
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
const PROFILE: ProfileData = {
  name: "Shahad Al-Matrafi",
  location: "Saudi Arabia",
  intro: "a Data Analyst who builds automated Python pipelines, Power BI reporting for leadership, and machine learning models.",
  cv_file: "Shahad_AlMatrafi_CV.pdf",
  github_url: "https://github.com/CS-Shahad",
  linkedin_url: "https://linkedin.com/in/shahad-almatrafi-b5193829b",
  email: "shahadalmatrafi5@gmail.com",
};

const EDUCATION: EducationData = {
  degree: "Bachelor of Computer Science",
  school: "Umm Al-Qura University",
  dates: "Sep 2019 – Nov 2023",
  gpa: "GPA 3.81 / 4.00",
  honours: "First Class Honours",
};

const ABOUT: AboutData = {
  bio: "I studied Computer Science at Umm Al-Qura University and graduated with First Class Honours. For my graduation project, I coded a recommendation algorithm from scratch. Today at SSCL, I own analytics across fleet, HR, operations, and budgeting: I replaced manual spreadsheet work with Python pipelines, cut dashboard load time by 29%, and built the reports department heads rely on. I enjoy the full path from messy source data to a report or model someone actually acts on, and I'm now growing deeper into machine learning and data science.",
  keywords: ["Python pipelines", "cut dashboard load time by 29%", "machine learning"]
};

const EXPERIENCE: ExperienceData[] = [
  {
    id: "1",
    role: "Data Analyst",
    company: "Saudi Services Company Limited (SSCL)",
    duration: "Oct 2024 – Present",
    achievements: [
      "Own end-to-end analytics across fleet, HR, operations, and budgeting. For fleet data, designed a multi-source data model with conditional logic and optimized DAX to reconcile vehicle records across separate registries.",
      "Built Python/Pandas pipelines to clean and standardize raw data feeds, replacing manual spreadsheet processing and removing recurring data-entry errors.",
      "Reduced Power BI dashboard load time by 29% by restructuring the underlying data model and rewriting DAX, improving responsiveness across all executive-facing reports.",
      "Designed and deployed 10+ production dashboards across fleet, HR, and operations, replacing ad hoc Excel reporting as the primary reporting layer for department heads.",
      "Engineered a consolidated \"Consumption\" budget pipeline pulling inputs from 60+ departments into a single automated report, eliminating a manual annual forecasting process.",
      "Supervised 5 on-the-job trainees across two cohorts in data analytics, managing task allocation and code reviews for pipeline development."
    ]
  }
];

const PROJECTS: ProjectData[] = [
  {
    id: "2",
    title: "Fraud Detection — Machine Learning Pipeline",
    description: "A machine learning model that catches 99.5% of fraud with zero false alarms across 6.3M simulated transactions. Started at the Amad Fintech Hackathon.",
    thumbnail_url: `${import.meta.env.BASE_URL}projects/fraud-detection/cover.webp`,
    tags: ["AI", "Data Analysis"],
    github_url: "https://github.com/CS-Shahad/Fraud_Detection_Model",
    date: "Hackathon Aug 2025 · Rebuilt 2026",
    // Paragraphs are separated by a blank line.
    overview: `Fraud is rare and hard to spot: in PaySim's 6.3 million simulated mobile-money transactions, only 0.13% are fraud, and the rule already in the data catches just 3 of 1,643 fraud cases in the test set.

I built the first version at the Amad Fintech Hackathon in Riyadh (Jul–Aug 2025, sponsored by Alinma Bank and Tuwaiq Academy) as part of a three-person team. I owned the machine learning model, while my teammates designed the monitoring dashboard and covered the financial and compliance side. Our best model, Random Forest, caught 80% of fraud.

In 2026 I rebuilt the model as a tested Python package: a leak-free 60/20/20 split, evaluation on PR-AUC instead of accuracy, thresholds tuned on validation data, and features engineered from how fraud drains account balances.

Because the results were near-perfect, I checked them. An ablation study showed the engineered features drive the gain, and leakage checks found no leakage. Since the data is simulated, real-world performance would be lower.`,
    tools_used: ["Python", "Pandas", "Scikit-learn", "XGBoost", "LightGBM", "pytest"],
    image_gallery: [
      { url: `${import.meta.env.BASE_URL}projects/fraud-detection/fraud-rate-by-type.webp`, description: "Fraud only occurs in TRANSFER and CASH_OUT transactions." },
      { url: `${import.meta.env.BASE_URL}projects/fraud-detection/fraud-rate-by-hour.webp`, description: "Fraud peaks between 3:00 and 6:00, when 40–58% of transactions are fraudulent." },
      { url: `${import.meta.env.BASE_URL}projects/fraud-detection/feature-importance.webp`, description: "What the XGBoost model relies on most." },
      { url: `${import.meta.env.BASE_URL}projects/fraud-detection/precision-recall-curves.webp`, description: "Precision-recall curves of the four models on the test set." },
    ],
    outcome: "XGBoost catches 99.5% of fraud (1,634 of 1,643) with zero false alarms, flagging 99.9% of stolen money on 554,082 unseen test transactions."
  },
  {
    id: "1",
    title: "Nouri — Socratic AI Study Companion",
    description: "An AI study companion that guides students with Socratic hints instead of handing them the answer. Qualified for the Gulf round of the AIREA competition.",
    thumbnail_url: `${import.meta.env.BASE_URL}projects/nouri/cover.webp`,
    tags: ["AI"],
    github_url: "",
    date: "AIREA Aug 2026 · In development",
    demo_status: "coming_soon",
    source_note: "Source code available on request",
    gallery_layout: "full",
    // Paragraphs are separated by a blank line.
    overview: `Students often use AI as a shortcut: they paste a question and copy the answer without thinking. Nouri flips that. Students upload a PDF or a photo of their homework, select the part they're stuck on, and Nouri, a friendly animated character, guides them with questions and hints until they reach the answer themselves.

Nouri sees the selected part and the student's handwriting in the context of the whole page, using Gemini's vision. Hints are graded, from a small nudge to the full steps, and the complete answer is a last step the student chooses. Nouri can also check a handwritten solution, create a similar exercise for practice, and explain a concept, in Arabic or English, by text or voice.

I built it solo for the AIREA International Competition for AI in Education. It scored 9/10 for innovation and creativity and qualified for the Gulf round, with judges noting that its Socratic design "targets cognitive laziness head-on." I'm now developing it toward a public release.`,
    tools_used: ["React", "TypeScript", "Node.js", "Express", "Gemini 2.5 Flash", "KaTeX", "Docker"],
    image_gallery: [
      { url: `${import.meta.env.BASE_URL}projects/nouri/landing.webp`, description: "Nouri's home page: upload a PDF or a photo and start learning." },
      { url: `${import.meta.env.BASE_URL}projects/nouri/hints.webp`, description: "Nouri guides a student through an equation with questions, then checks their handwritten answer." },
      { url: `${import.meta.env.BASE_URL}projects/nouri/explain.webp`, description: "Asking Nouri to explain a whole page in simple steps." },
    ],
    outcome: "Qualified for the Gulf round of AIREA (39/50, with 9/10 for innovation), and grew into a working app with graded hints, solution checking, voice input, and full Arabic and English support."
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
  { id: "1", name: "Machine Learning", category: "Machine Learning & AI", icon_name: "FiCpu" },
  { id: "2", name: "Feature Engineering", category: "Machine Learning & AI", icon_name: "FiSliders" },
  { id: "3", name: "scikit-learn", category: "Machine Learning & AI", icon_name: "FiTarget" },
  { id: "4", name: "XGBoost & LightGBM", category: "Machine Learning & AI", icon_name: "FiGitBranch" },
  { id: "5", name: "Agentic AI & LLM Integration", category: "Machine Learning & AI", icon_name: "FiMessageSquare" },
  { id: "6", name: "Recommendation Systems", category: "Machine Learning & AI", icon_name: "FiStar" },
  { id: "7", name: "Power BI", category: "Data Analysis & BI", icon_name: "FiBarChart2" },
  { id: "8", name: "DAX & Power Query (M)", category: "Data Analysis & BI", icon_name: "FiFilter" },
  { id: "9", name: "Data Modeling (Kimball & Star Schema)", category: "Data Analysis & BI", icon_name: "FiShare2" },
  { id: "10", name: "Executive & Centralized Reporting", category: "Data Analysis & BI", icon_name: "FiFileText" },
  { id: "11", name: "Metric Definition", category: "Data Analysis & BI", icon_name: "FiActivity" },
  { id: "12", name: "Tableau", category: "Data Analysis & BI", icon_name: "FiPieChart" },
  { id: "13", name: "Python/Pandas Pipelines", category: "Automation", icon_name: "FiTerminal" },
  { id: "14", name: "Power Automate", category: "Automation", icon_name: "FiZap" },
  { id: "15", name: "API Integrations", category: "Automation", icon_name: "FiLink" },
  { id: "16", name: "Scheduled Refresh Automation", category: "Automation", icon_name: "FiRefreshCw" },
  { id: "17", name: "Python", category: "Languages & Tools", icon_name: "FiCode" },
  { id: "18", name: "SQL", category: "Languages & Tools", icon_name: "FiDatabase" },
  { id: "19", name: "React & TypeScript", category: "Languages & Tools", icon_name: "FiLayout" },
  { id: "20", name: "Flask", category: "Languages & Tools", icon_name: "FiServer" },
  { id: "21", name: "Docker", category: "Languages & Tools", icon_name: "FiPackage" },
  { id: "22", name: "Oracle ERP", category: "Languages & Tools", icon_name: "FiBriefcase" },
  { id: "23", name: "Git & GitHub", category: "Languages & Tools", icon_name: "FiGithub" },
];

const CERTIFICATIONS: CertificationData[] = [
  {
    id: "1",
    title: "Google Data Analytics",
    issuer: "Google · Coursera",
    date: "Sep 2024",
    badge_url: `${import.meta.env.BASE_URL}certifications/google-data-analytics.webp`,
    credential_url: "https://www.credly.com/badges/1d082f60-991f-4a3d-9d72-859d025e8e0f",
  },
  {
    id: "5",
    title: "Advanced Agentic AI Systems Engineering",
    issuer: "SDAIA Academy",
    date: "Oct 2026",
    badge_url: `${import.meta.env.BASE_URL}certifications/sdaia.webp`,
    credential_url: "https://athkax.sdaia.gov.sa/certificate-verification?type=Event&id=331&certificate=SA26-00219",
  },
  {
    id: "2",
    title: "Power BI & DAX",
    issuer: "Microsoft Learn · 13 modules",
    date: "Sep 2025",
    badge_url: `${import.meta.env.BASE_URL}certifications/microsoft-power-bi.svg`,
    credential_url: "https://learn.microsoft.com/en-us/users/shahadalmatrafi-3421/transcript/dg14gbz54ewlq59",
  },
  {
    id: "3",
    title: "Azure AI Engineer Path",
    issuer: "Microsoft Learn · 23 modules",
    date: "May 2026",
    badge_url: `${import.meta.env.BASE_URL}certifications/microsoft-azure-ai.svg`,
    credential_url: "https://learn.microsoft.com/en-us/users/shahadalmatrafi-3421/transcript/dg14gbz54ewlq59",
  },
  {
    id: "4",
    title: "Machine Learning A-Z",
    issuer: "Udemy",
    date: "Aug 2023",
    badge_url: `${import.meta.env.BASE_URL}certifications/udemy.webp`,
    credential_url: "https://ude.my/UC-84bc2c07-8c35-4754-816d-f38e410844cd",
  },
];

const PERSONAL_INFO: PersonalInfoData = {
  books: [],
  events: []
};

export function usePortfolioData() {
  return {
    profile: PROFILE,
    education: EDUCATION,
    about: ABOUT,
    experience: EXPERIENCE,
    projects: PROJECTS,
    skills: SKILLS,
    certifications: CERTIFICATIONS,
    personalInfo: PERSONAL_INFO,
  };
}
