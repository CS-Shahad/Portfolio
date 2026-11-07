import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { usePortfolioData } from "@/hooks/usePortfolioData";

const socialLinkClass =
  "w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors shadow-sm hover:shadow-md";

export default function Footer() {
  const { profile } = usePortfolioData();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-10 px-6 border-t border-border bg-slate-50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        <div className="flex items-center gap-3">
          <img
            src={`${import.meta.env.BASE_URL}logo-96.webp`}
            alt=""
            width={96}
            height={84}
            loading="lazy"
            decoding="async"
            className="w-8 h-8 object-contain opacity-80"
          />
          <span className="font-bold text-foreground tracking-tight">{profile.name}</span>
        </div>

        <div className="flex items-center gap-4">
          <a href={profile.github_url} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={socialLinkClass}>
            <FiGithub size={20} aria-hidden="true" />
          </a>
          <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={socialLinkClass}>
            <FiLinkedin size={20} aria-hidden="true" />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email" className={socialLinkClass}>
            <FiMail size={20} aria-hidden="true" />
          </a>
        </div>

        {/* The prerendered HTML has the build year; the visitor's clock may be a year later */}
        <div className="text-sm text-muted-foreground" suppressHydrationWarning>
          {`© ${currentYear} ${profile.name}. All rights reserved.`}
        </div>
      </div>
    </footer>
  );
}
