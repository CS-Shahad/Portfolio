import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectData } from "@/hooks/usePortfolioData";
import { SectionHeading } from "./SectionHeading";
import { Link } from "wouter";
import { FiArrowRight, FiGithub } from "react-icons/fi";

const FILTERS = ["All", "AI", "Data Analysis", "Automation"];

export default function Projects({ data }: { data: ProjectData[] }) {
  const [filter, setFilter] = useState("All");

  const filteredProjects = filter === "All" 
    ? data 
    : data.filter(p => p.tags.includes(filter));

  return (
    <section id="projects" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <SectionHeading title="Selected Work" subtitle="A collection of predictive models, automated pipelines, and data-driven solutions." />
        
        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                filter === f 
                  ? "bg-foreground text-background shadow-md scale-105" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        
        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative flex flex-col bg-card rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Thumbnail */}
                <div className="aspect-[4/3] w-full overflow-hidden relative">
                  <div className="absolute inset-0 bg-foreground/10 group-hover:bg-transparent transition-colors z-10" />
                  <img 
                    src={project.thumbnail_url} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-background/90 backdrop-blur-sm text-foreground rounded-full text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-grow">{project.description}</p>
                  
                  <Link href={`/projects/${project.id}`}>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-foreground group-hover:text-primary transition-colors cursor-pointer w-fit pb-1 border-b border-transparent group-hover:border-primary">
                      View Case Study <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* GitHub Profile CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 flex justify-center"
        >
          <a
            href="https://github.com/shahadmatrafi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-border bg-card text-foreground font-semibold text-sm hover:bg-foreground hover:text-background hover:border-foreground hover:scale-105 hover:shadow-lg transition-all duration-300 group"
          >
            <FiGithub size={18} className="group-hover:rotate-12 transition-transform duration-300" />
            View All Projects on GitHub
            <FiArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
