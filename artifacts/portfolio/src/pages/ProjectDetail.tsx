import { useParams, Link } from "wouter";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { motion } from "framer-motion";
import { FiArrowLeft, FiGithub, FiExternalLink } from "react-icons/fi";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const { projects, loading } = usePortfolioData();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center px-4">
        <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
        <p className="text-muted-foreground mb-8">The project you're looking for doesn't exist or has been removed.</p>
        <Link href="/">
          <span className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors cursor-pointer">
            <FiArrowLeft /> Back to Portfolio
          </span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header / Hero */}
      <div className="relative h-[50vh] min-h-[400px] flex items-end pb-12 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={project.thumbnail_url} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <Link href="/">
            <span className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 cursor-pointer">
              <FiArrowLeft /> Back to Portfolio
            </span>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag, idx) => (
                <span key={idx} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium border border-primary/20">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{project.title}</h1>
            <p className="text-xl text-muted-foreground max-w-3xl">{project.description}</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          {/* Overview */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-brand-gradient inline-block">Overview</h2>
            <div className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground text-lg leading-relaxed">
              <p>{project.overview}</p>
            </div>
          </motion.section>

          {/* Outcome */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="p-6 md:p-8 bg-card rounded-2xl border border-border shadow-sm relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-brand-gradient" />
            <h2 className="text-2xl font-bold mb-4">The Outcome</h2>
            <p className="text-lg text-foreground font-medium">{project.outcome}</p>
          </motion.section>
          
          {/* Image Gallery */}
          {project.image_gallery && project.image_gallery.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold mb-6">Gallery</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.image_gallery.map((img, idx) => (
                  <div key={idx} className="rounded-xl overflow-hidden border border-border aspect-video">
                    <img src={img} alt={`${project.title} screenshot ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                ))}
              </div>
            </motion.section>
          )}
        </div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-8"
        >
          {/* Tools Used */}
          <div className="p-6 bg-card rounded-2xl border border-border shadow-sm">
            <h3 className="text-lg font-bold mb-4">Tools & Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {project.tools_used.map((tool, idx) => (
                <span key={idx} className="px-3 py-1.5 bg-muted text-muted-foreground rounded-md text-sm font-medium">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="p-6 bg-card rounded-2xl border border-border shadow-sm flex flex-col gap-4">
            <h3 className="text-lg font-bold mb-2">Links</h3>
            {project.github_url && (
              <a 
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-foreground group-hover:text-primary transition-colors">
                  <FiGithub size={20} />
                </div>
                <div>
                  <div className="font-medium text-foreground">Source Code</div>
                  <div className="text-xs text-muted-foreground">View on GitHub</div>
                </div>
              </a>
            )}
            {project.video_url && (
              <a 
                href={project.video_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-foreground group-hover:text-primary transition-colors">
                  <FiExternalLink size={20} />
                </div>
                <div>
                  <div className="font-medium text-foreground">Video Demo</div>
                  <div className="text-xs text-muted-foreground">Watch walkthrough</div>
                </div>
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
