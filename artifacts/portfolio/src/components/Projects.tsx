import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectData } from "@/hooks/usePortfolioData";
import { SectionHeading } from "./SectionHeading";
import { Link } from "wouter";
import { FiArrowRight, FiGithub } from "react-icons/fi";
import { projectShortTitle } from "@/lib/site";

// Tag filter (All / AI / ...) is hidden while there are only a few projects.
// To re-enable it, add a filter state, filter `data` by `p.tags.includes(filter)`,
// and render one button per entry here above the grid.
const FILTERS = ["All", "AI", "Data Analysis", "Automation"];

const INITIAL_COUNT = 3;

export default function Projects({ data }: { data: ProjectData[] }) {
  const [expanded, setExpanded] = useState(false);

  const visibleProjects = expanded ? data : data.slice(0, INITIAL_COUNT);
  const hasMore = data.length > INITIAL_COUNT;

  return (
    <section id="projects" className="py-16 md:py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <SectionHeading title="Selected Work" subtitle="A collection of predictive models, automated pipelines, and data-driven solutions." />
        
        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {visibleProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                {/* The whole card is one link: full-bleed portrait image, text block over the lower part */}
                <Link
                  href={`/projects/${project.id}`}
                  className="group relative block aspect-[4/5] overflow-hidden rounded-3xl border border-border bg-[#0B1530] shadow-sm transition-shadow duration-300 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <img
                    src={project.thumbnail_url}
                    alt=""
                    width={800}
                    height={1000}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />

                  <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-background/90 backdrop-blur-sm text-foreground rounded-full text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Text block with its own scrim: solid navy behind the text, fading to transparent
                      over the 1.5rem just above the title, so the image's upper part keeps its own colors */}
                  <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-5 pt-6 sm:pb-6 bg-[linear-gradient(to_top,rgb(11_21_48/0.95)_0%,rgb(11_21_48/0.93)_calc(100%_-_1.5rem),rgb(11_21_48/0)_100%)]">
                    <h3 className="text-xl font-bold text-white">{projectShortTitle(project.title)}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/80 line-clamp-4">{project.description}</p>
                    <span className="mt-3 sm:mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white">
                      View Case Study
                      <FiArrowRight aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
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
                  See More Projects ({data.length - INITIAL_COUNT} more)
                  <motion.span animate={{ rotate: 0 }} className="inline-block">
                    <FiArrowRight className="rotate-90" size={14} />
                  </motion.span>
                </>
              )}
            </button>
          </motion.div>
        )}

        {/* GitHub Profile CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 flex justify-center"
        >
          <a
            href="https://github.com/CS-Shahad"
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
