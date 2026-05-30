import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectData, ProjectPhotoEntry } from "@/hooks/usePortfolioData";
import { SectionHeading } from "./SectionHeading";
import { Link } from "wouter";
import { FiArrowRight, FiGithub, FiImage } from "react-icons/fi";

const FILTERS = ["All", "AI", "Data Analysis", "Automation"];

const INITIAL_COUNT = 3;

export default function Projects({ data, photos = [] }: { data: ProjectData[]; photos?: ProjectPhotoEntry[] }) {
  const [filter, setFilter] = useState("All");
  const [expanded, setExpanded] = useState(false);

  const filteredProjects = filter === "All" 
    ? data 
    : data.filter(p => p.tags.includes(filter));

  const visibleProjects = expanded ? filteredProjects : filteredProjects.slice(0, INITIAL_COUNT);
  const hasMore = filteredProjects.length > INITIAL_COUNT;

  return (
    <section id="projects" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <SectionHeading title="Selected Work" subtitle="A collection of predictive models, automated pipelines, and data-driven solutions." />
        
        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => { setFilter(f); setExpanded(false); }}
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
            {visibleProjects.map((project, idx) => (
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

        {/* See More / See Less */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-10 flex justify-center"
          >
            <button
              onClick={() => setExpanded(!expanded)}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-border bg-background text-foreground font-medium text-sm hover:bg-muted transition-all duration-300 group"
            >
              {expanded ? (
                <>
                  Show Less
                  <motion.span animate={{ rotate: 180 }} className="inline-block">
                    <FiArrowRight className="-rotate-90" size={14} />
                  </motion.span>
                </>
              ) : (
                <>
                  See More Projects ({filteredProjects.length - INITIAL_COUNT} more)
                  <motion.span animate={{ rotate: 0 }} className="inline-block">
                    <FiArrowRight className="rotate-90" size={14} />
                  </motion.span>
                </>
              )}
            </button>
          </motion.div>
        )}

        {/* Photos Section */}
        {photos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="mt-24"
          >
            <div className="flex items-center gap-3 mb-10 justify-center">
              <FiImage className="text-primary" size={20} />
              <h3 className="text-2xl font-bold text-foreground">Project Gallery</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {photos.map((photo, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="group rounded-2xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <img
                      src={photo.url}
                      alt={photo.description}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">{photo.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

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
