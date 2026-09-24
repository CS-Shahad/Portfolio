import { useParams, Link } from "wouter";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { motion } from "framer-motion";
import { FiArrowLeft, FiArrowRight, FiGithub, FiExternalLink, FiMail } from "react-icons/fi";
import Footer from "@/components/Footer";
import NotFound from "@/pages/not-found";
import { useDocumentTitle } from "@/lib/navigation";
import { projectPageTitle, projectShortTitle } from "@/lib/site";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const { projects } = usePortfolioData();

  const index = projects.findIndex(p => p.id === id);
  const project = index === -1 ? undefined : projects[index];
  const prevProject = index > 0 ? projects[index - 1] : undefined;
  const nextProject = index !== -1 && index < projects.length - 1 ? projects[index + 1] : undefined;

  useDocumentTitle(project ? projectPageTitle(project.title) : undefined);

  if (!project) {
    return <NotFound />;
  }

  return (
    <>
      <main className="bg-background">
        {/* Header: the thumbnail is shown in its own frame; a blurred copy only tints the background */}
        <header className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0" aria-hidden="true">
            <img
              src={project.thumbnail_url}
              alt=""
              className="w-full h-full object-cover scale-110 blur-3xl opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/75 to-background" />
          </div>

          <div className="relative max-w-5xl mx-auto px-6 pt-8 pb-12 md:pt-10 md:pb-16">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <FiArrowLeft /> Back to Portfolio
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,380px)] gap-10 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium border border-primary/20">
                      {tag}
                    </span>
                  ))}
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">{project.title}</h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl">{project.description}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="aspect-[4/3] w-full max-w-md lg:max-w-none rounded-2xl overflow-hidden border border-border bg-card shadow-xl"
              >
                <img
                  src={project.thumbnail_url}
                  alt={`${projectShortTitle(project.title)} preview`}
                  width={800}
                  height={600}
                  decoding="async"
                  fetchPriority="high"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </header>

        <div className="max-w-5xl mx-auto px-6 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
          <div className="lg:col-span-2 space-y-10">
            {/* Overview */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-brand-gradient inline-block">Overview</h2>
              <div className="prose prose-slate max-w-none text-muted-foreground text-lg leading-relaxed">
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
                <h2 className="text-2xl font-bold mb-6">Photos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {project.image_gallery.map((img, idx) => (
                    <div key={idx} className="group rounded-2xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="aspect-video w-full overflow-hidden">
                        <img
                          src={img.url}
                          alt={img.description || `${project.title} photo ${idx + 1}`}
                          width={1280}
                          height={720}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      {img.description && (
                        <div className="p-4">
                          <p className="text-sm text-muted-foreground leading-relaxed">{img.description}</p>
                        </div>
                      )}
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
            {(project.github_url || project.video_url) && (
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
            )}
          </motion.div>
        </div>

        {/* Previous / next project */}
        {(prevProject || nextProject) && (
          <nav aria-label="More projects" className="max-w-5xl mx-auto px-6 pb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-border pt-10">
              {prevProject ? (
                <Link
                  href={`/projects/${prevProject.id}`}
                  className="group p-5 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all"
                >
                  <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Previous project
                  </span>
                  <span className="mt-2 block font-semibold text-foreground group-hover:text-primary transition-colors">
                    {projectShortTitle(prevProject.title)}
                  </span>
                </Link>
              ) : <div className="hidden sm:block" />}
              {nextProject && (
                <Link
                  href={`/projects/${nextProject.id}`}
                  className="group p-5 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all sm:text-right"
                >
                  <span className="flex items-center gap-2 sm:justify-end text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Next project <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="mt-2 block font-semibold text-foreground group-hover:text-primary transition-colors">
                    {projectShortTitle(nextProject.title)}
                  </span>
                </Link>
              )}
            </div>
          </nav>
        )}

        {/* Contact CTA */}
        <section className="max-w-5xl mx-auto px-6 pb-16 md:pb-20">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 md:p-10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="pointer-events-none absolute -top-24 -right-24 w-56 h-56 bg-brand-gradient rounded-full blur-[90px] opacity-20" />
            <div className="relative">
              <h2 className="text-xl md:text-2xl font-bold text-foreground">Interested in a project like this?</h2>
              <p className="mt-2 text-muted-foreground">I'm open to new opportunities and collaborations.</p>
            </div>
            <Link
              href="/#contact"
              className="relative inline-flex items-center justify-center gap-2 self-start md:self-auto shrink-0 rounded-full bg-brand-gradient px-7 py-3.5 font-medium text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#7730E8]/30"
            >
              Get in touch <FiMail />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
