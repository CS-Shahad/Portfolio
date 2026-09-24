import { motion } from "framer-motion";
import { SkillData } from "@/hooks/usePortfolioData";
import { SectionHeading } from "./SectionHeading";
import type { IconType } from "react-icons";
import {
  FiActivity, FiBarChart2, FiClock, FiCloud, FiCode, FiCpu, FiDatabase, FiGitBranch, FiGithub,
  FiLayers, FiLink, FiMessageSquare, FiMonitor, FiPieChart, FiRepeat, FiSettings, FiTerminal, FiTrendingUp,
} from "react-icons/fi";

// Only these icons are bundled. To use a new `icon_name` in usePortfolioData.ts,
// import it from react-icons/fi and add it here.
const ICONS: Record<string, IconType> = {
  FiActivity, FiBarChart2, FiClock, FiCloud, FiCode, FiCpu, FiDatabase, FiGitBranch, FiGithub,
  FiLayers, FiLink, FiMessageSquare, FiMonitor, FiPieChart, FiRepeat, FiSettings, FiTerminal, FiTrendingUp,
};

export default function Skills({ data }: { data: SkillData[] }) {
  // Group skills by category
  const groupedSkills = data.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, SkillData[]>);

  // Icon renderer helper
  const renderIcon = (iconName: string) => {
    const Icon = ICONS[iconName] ?? FiCode;
    return <Icon size={22} aria-hidden="true" />;
  };

  return (
    <section id="skills" className="py-16 md:py-20 px-6 bg-slate-50 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading title="Technical Arsenal" subtitle="The tools and methodologies I use to extract value from data." />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {Object.entries(groupedSkills).map(([category, skills], idx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-card p-6 md:p-7 rounded-3xl border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-bold mb-5 text-foreground pb-4 border-b border-border">{category}</h3>
              <ul className="space-y-4">
                {skills.map(skill => (
                  <li key={skill.id} className="flex items-center gap-4 group">
                    <div className="w-11 h-11 shrink-0 rounded-xl bg-muted flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                      {renderIcon(skill.icon_name)}
                    </div>
                    <span className="font-medium text-foreground">{skill.name}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
