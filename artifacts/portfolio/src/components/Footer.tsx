import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 px-6 border-t border-border bg-slate-50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain opacity-80" />
          <span className="font-bold text-foreground tracking-tight">Shahad Al-Matrafi</span>
        </div>
        
        <div className="flex items-center gap-4">
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors shadow-sm hover:shadow-md">
            <FiGithub size={20} />
          </a>
          <a href="https://linkedin.com/in/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors shadow-sm hover:shadow-md">
            <FiLinkedin size={20} />
          </a>
          <a href="mailto:contact@example.com" className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors shadow-sm hover:shadow-md">
            <FiMail size={20} />
          </a>
        </div>
        
        <div className="text-sm text-muted-foreground">
          © {currentYear} All rights reserved.
        </div>
      </div>
    </footer>
  );
}
