import { useRef, useState } from "react";
import { useParams, Link } from "wouter";
import { usePortfolioData, type ProjectGalleryImage } from "@/hooks/usePortfolioData";
import { motion } from "framer-motion";
import { FiArrowLeft, FiArrowRight, FiGithub, FiExternalLink, FiLock, FiMail, FiMaximize2, FiPlayCircle, FiX } from "react-icons/fi";
import Footer from "@/components/Footer";
import NotFound from "@/pages/not-found";
import { useDocumentTitle } from "@/lib/navigation";
import { projectPageTitle, projectShortTitle } from "@/lib/site";

// Charts and screenshots: shown whole (object-contain on white), click to open a larger view.
// Uses a native <dialog>, which handles Esc and keeps focus inside while open.
function Gallery({ images, projectTitle }: { images: ProjectGalleryImage[]; projectTitle: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const altFor = (img: ProjectGalleryImage, idx: number) => img.description || `${projectTitle} image ${idx + 1}`;

  const open = (idx: number) => {
    setActive(idx);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();
  const current = active === null ? null : images[active];

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {images.map((img, idx) => (
          <figure key={idx} className="rounded-2xl overflow-hidden border border-border bg-card shadow-sm">
            <button
              type="button"
              onClick={() => open(idx)}
              aria-label={`Enlarge: ${altFor(img, idx)}`}
              className="group relative block w-full aspect-[16/10] bg-white cursor-zoom-in focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-primary"
            >
              <img
                src={img.url}
                alt={altFor(img, idx)}
                width={1280}
                height={800}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-contain p-3"
              />
              <span
                aria-hidden="true"
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-foreground/70 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
              >
                <FiMaximize2 size={14} />
              </span>
            </button>
            {img.description && (
              <figcaption className="p-4 border-t border-border text-sm text-muted-foreground leading-relaxed">{img.description}</figcaption>
            )}
          </figure>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setActive(null)}
        // A click on the dialog element itself (not its content) is a click on the backdrop.
        onClick={(e) => e.target === e.currentTarget && close()}
        aria-label={current ? altFor(current, active!) : undefined}
        className="m-auto w-[min(96vw,1100px)] max-h-[92vh] rounded-2xl bg-white p-0 shadow-2xl backdrop:bg-[#0B1530]/80 backdrop:backdrop-blur-sm"
      >
        {current && (
          <figure className="relative px-4 pb-4 pt-14 md:px-6 md:pb-6">
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              autoFocus
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-muted text-foreground hover:bg-border focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary"
            >
              <FiX size={18} />
            </button>
            <img
              src={current.url}
              alt={altFor(current, active!)}
              className="mx-auto block max-h-[74vh] w-auto max-w-full object-contain"
            />
            {current.description && (
              <figcaption className="mt-3 pr-10 text-sm text-muted-foreground">{current.description}</figcaption>
            )}
          </figure>
        )}
      </dialog>
    </>
  );
}

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
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium border border-primary/20">
                      {tag}
                    </span>
                  ))}
                  {project.date && (
                    <span className="text-xs font-medium text-slate-600">{project.date}</span>
                  )}
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
                {project.overview.split(/\n\s*\n/).map((paragraph, i) => (
                  <p key={i}>{paragraph.trim()}</p>
                ))}
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
                <Gallery images={project.image_gallery} projectTitle={project.title} />
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
            {(project.github_url || project.video_url || project.demo_status || project.source_note) && (
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
              {/* Placeholder until a real demo link exists; a video_url takes precedence */}
              {project.demo_status === "coming_soon" && !project.video_url && (
                <div
                  role="link"
                  aria-disabled="true"
                  className="flex items-center gap-3 p-3 rounded-xl border border-dashed border-border bg-muted/40 cursor-not-allowed select-none"
                >
                  <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-muted-foreground opacity-60">
                    <FiPlayCircle size={20} aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span className="font-medium text-muted-foreground opacity-70">Live demo</span>
                      <span className="whitespace-nowrap rounded-full border border-border bg-background px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                        Coming soon
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground opacity-70">Not available yet</div>
                  </div>
                </div>
              )}
              {project.source_note && (
                <p className="flex items-center gap-1.5 text-xs text-slate-600">
                  <FiLock size={12} aria-hidden="true" className="shrink-0" />
                  {project.source_note}
                </p>
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
              <p className="mt-2 text-muted-foreground">I'd love to hear from you.</p>
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
