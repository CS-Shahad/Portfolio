import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

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
  image_gallery: string[];
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

export interface PersonalInfoData {
  books: string[];
  interests: string[];
}

// Fallback Data
const FALLBACK_ABOUT: AboutData = {
  bio: "I am a Data & AI Professional dedicated to translating vast, complex datasets into precise, actionable strategies. With a foundation in statistical analysis and machine learning, I engineer automation pipelines that streamline operations and build predictive models that forecast business trends. My approach bridges the gap between technical rigor and strategic vision, ensuring every data point serves a clear, impactful purpose.",
  keywords: ["predictive analytics", "automation pipelines", "machine learning", "strategic vision", "data engineering"]
};

const FALLBACK_EXPERIENCE: ExperienceData[] = [
  {
    id: "1",
    role: "Senior Data Scientist",
    company: "TechNova Solutions",
    duration: "2021 - Present",
    achievements: [
      "Architected machine learning models that improved customer retention prediction accuracy by 34%.",
      "Automated ETL pipelines, reducing weekly data processing time from 14 hours to 2 hours.",
      "Led a cross-functional team of 4 data analysts and engineers."
    ]
  },
  {
    id: "2",
    role: "AI Engineer",
    company: "DataSphere AI",
    duration: "2018 - 2021",
    achievements: [
      "Developed an NLP-based sentiment analysis tool for real-time customer feedback monitoring.",
      "Deployed predictive models to production using Docker and Kubernetes.",
      "Optimized query performance by 40% through database indexing and schema redesign."
    ]
  }
];

const FALLBACK_PROJECTS: ProjectData[] = [
  {
    id: "1",
    title: "Customer Churn Predictor",
    description: "A machine learning pipeline that predicts customer churn with 92% accuracy, integrated directly into the CRM.",
    thumbnail_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    tags: ["AI", "Data Analysis"],
    github_url: "https://github.com/",
    overview: "Built an end-to-end predictive model to identify at-risk customers before they cancel their subscriptions.",
    tools_used: ["Python", "scikit-learn", "Pandas", "PostgreSQL", "AWS"],
    image_gallery: [],
    outcome: "Reduced overall churn by 18% in the first quarter of deployment."
  },
  {
    id: "2",
    title: "Automated Financial Reporting",
    description: "An automated pipeline that extracts, transforms, and loads financial data into daily dashboard reports.",
    thumbnail_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    tags: ["Automation", "Data Analysis"],
    github_url: "https://github.com/",
    overview: "Replaced a manual, error-prone weekly reporting process with a fully automated ETL pipeline.",
    tools_used: ["Apache Airflow", "SQL", "Tableau", "Python"],
    image_gallery: [],
    outcome: "Saved the finance team 20+ hours per week and eliminated human data entry errors."
  },
  {
    id: "3",
    title: "NLP Sentiment Analyzer",
    description: "A real-time sentiment analysis engine for processing thousands of daily customer reviews and social media mentions.",
    thumbnail_url: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=800&q=80",
    tags: ["AI"],
    github_url: "https://github.com/",
    overview: "Developed a custom NLP model to categorize textual feedback into actionable product insights.",
    tools_used: ["HuggingFace", "PyTorch", "FastAPI", "React"],
    image_gallery: [],
    outcome: "Enabled product teams to identify and resolve major bugs 3x faster based on user sentiment spikes."
  }
];

const FALLBACK_SKILLS: SkillData[] = [
  { id: "1", name: "Machine Learning", category: "Artificial Intelligence", icon_name: "FiCpu" },
  { id: "2", name: "Deep Learning", category: "Artificial Intelligence", icon_name: "FiLayers" },
  { id: "3", name: "NLP", category: "Artificial Intelligence", icon_name: "FiMessageSquare" },
  { id: "4", name: "ETL Pipelines", category: "Automation", icon_name: "FiRepeat" },
  { id: "5", name: "Airflow", category: "Automation", icon_name: "FiWind" },
  { id: "6", name: "Scripting", category: "Automation", icon_name: "FiTerminal" },
  { id: "7", name: "Statistical Modeling", category: "Data Analysis", icon_name: "FiPieChart" },
  { id: "8", name: "A/B Testing", category: "Data Analysis", icon_name: "FiActivity" },
  { id: "9", name: "Data Visualization", category: "Data Analysis", icon_name: "FiMonitor" },
  { id: "10", name: "Python", category: "Technical Stack", icon_name: "FiCode" },
  { id: "11", name: "SQL", category: "Technical Stack", icon_name: "FiDatabase" },
  { id: "12", name: "AWS", category: "Technical Stack", icon_name: "FiCloud" }
];

const FALLBACK_CERTIFICATIONS: CertificationData[] = [
  { id: "1", title: "AWS Certified Machine Learning", issuer: "Amazon Web Services", badge_url: "" },
  { id: "2", title: "Data Engineering Professional", issuer: "Google Cloud", badge_url: "" },
  { id: "3", title: "Advanced Deep Learning", issuer: "DeepLearning.AI", badge_url: "" },
  { id: "4", title: "Certified Data Scientist", issuer: "Databricks", badge_url: "" },
];

const FALLBACK_PERSONAL_INFO: PersonalInfoData = {
  books: ["Thinking, Fast and Slow by Daniel Kahneman", "The Signal and the Noise by Nate Silver", "Weapons of Math Destruction by Nate Silver"],
  interests: ["Photography", "Specialty Coffee Roasting", "Hiking", "Open Source Contributing"]
};

export function usePortfolioData() {
  const [about, setAbout] = useState<AboutData>(FALLBACK_ABOUT);
  const [experience, setExperience] = useState<ExperienceData[]>(FALLBACK_EXPERIENCE);
  const [projects, setProjects] = useState<ProjectData[]>(FALLBACK_PROJECTS);
  const [skills, setSkills] = useState<SkillData[]>(FALLBACK_SKILLS);
  const [certifications, setCertifications] = useState<CertificationData[]>(FALLBACK_CERTIFICATIONS);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfoData>(FALLBACK_PERSONAL_INFO);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        // Only attempt fetch if URL is somewhat valid (not the placeholder)
        if (import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_URL !== 'https://placeholder.supabase.co') {
          const [aboutRes, expRes, projRes, skillsRes, certRes, personalRes] = await Promise.all([
            supabase.from('about').select('*').limit(1).single(),
            supabase.from('experiences').select('*').order('id'),
            supabase.from('projects').select('*').order('id'),
            supabase.from('skills').select('*').order('id'),
            supabase.from('certifications').select('*').order('id'),
            supabase.from('personal_info').select('*').limit(1).single()
          ]);

          if (aboutRes.data) setAbout(aboutRes.data as AboutData);
          if (expRes.data && expRes.data.length > 0) setExperience(expRes.data as ExperienceData[]);
          if (projRes.data && projRes.data.length > 0) setProjects(projRes.data as ProjectData[]);
          if (skillsRes.data && skillsRes.data.length > 0) setSkills(skillsRes.data as SkillData[]);
          if (certRes.data && certRes.data.length > 0) setCertifications(certRes.data as CertificationData[]);
          if (personalRes.data) setPersonalInfo(personalRes.data as PersonalInfoData);
        }
      } catch (error) {
        console.error('Error fetching data from Supabase, using fallbacks:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { about, experience, projects, skills, certifications, personalInfo, loading };
}
