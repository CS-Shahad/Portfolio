import { motion } from "framer-motion";
import { ExperienceData } from "@/hooks/usePortfolioData";
import { SectionHeading } from "./SectionHeading";
import { FiBriefcase } from "react-icons/fi";

export default function Experience({ data }: { data: ExperienceData[] }) {
  return (
    <section id="experience" className="py-24 px-6 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <SectionHeading title="Experience" />
        
        <div className="mt-16 relative">
          {/* Vertical Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block" />
          
          <div className="space-y-12">
            {data.map((exp, idx) => (
              <motion.div 
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative pl-0 md:pl-24"
              >
                {/* Timeline Dot */}
                <div className="absolute left-[30px] top-1.5 w-3 h-3 bg-primary rounded-full hidden md:block shadow-[0_0_0_6px_var(--color-background)]" />
                
                <div className="p-8 bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-border group-hover:bg-brand-gradient transition-all duration-300" />
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground flex items-center gap-3">
                        <FiBriefcase className="text-primary hidden md:inline-block" /> {exp.role}
                      </h3>
                      <p className="text-lg text-primary font-medium mt-1">{exp.company}</p>
                    </div>
                    <div className="px-4 py-1.5 bg-muted text-muted-foreground rounded-full text-sm font-medium whitespace-nowrap self-start md:self-auto">
                      {exp.duration}
                    </div>
                  </div>
                  
                  <ul className="space-y-3">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-3 text-muted-foreground">
                        <span className="text-primary mt-1.5">•</span>
                        <span className="leading-relaxed">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
