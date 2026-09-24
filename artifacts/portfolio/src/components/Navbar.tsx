import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { FiMenu, FiX } from "react-icons/fi";
import { scrollToSection } from "@/lib/navigation";

const navLinks = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Skills", id: "skills" },
  { label: "Contact", id: "contact" },
];

const BASE = import.meta.env.BASE_URL;

export default function Navbar() {
  const [location, navigate] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>("home");
  const isHome = location === "/";

  // Highlight the section currently crossing the middle of the viewport (home page only).
  useEffect(() => {
    if (!isHome) {
      setActiveSection(null);
      return;
    }
    setActiveSection("home");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -54% 0px" },
    );

    for (const link of navLinks) {
      const element = document.getElementById(link.id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMenuOpen(false);

    if (isHome && scrollToSection(id)) {
      setActiveSection(id);
      return;
    }
    // From another page: go home, and let Home scroll to the hash once it renders.
    navigate(id === "home" ? "/" : `/#${id}`);
  };

  const hrefFor = (id: string) => (id === "home" ? BASE : `${BASE}#${id}`);

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-slate-100 bg-white/95 backdrop-blur-xl shadow-[0_2px_20px_-12px_rgba(0,0,0,0.05)]">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
        <Link href="/" className="group flex items-center gap-3 cursor-pointer">
          <div className="flex h-10 w-10 items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <img
              src={`${BASE}logo-96.webp`}
              alt="Shahad Al-Matrafi logo"
              width={96}
              height={84}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <p className="text-sm font-semibold tracking-wide text-slate-800 transition-colors group-hover:text-slate-950">
              Shahad Al-Matrafi
            </p>
            <p className="text-[11px] font-medium text-slate-600 group-hover:text-purple-700 transition-colors">
              Data & Automation Specialist
            </p>
          </div>
        </Link>

        {/* Desktop links */}
        <nav aria-label="Main" className="hidden items-center gap-6 lg:gap-7 md:flex">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={hrefFor(link.id)}
                onClick={(e) => handleNavClick(e, link.id)}
                aria-current={isActive ? "true" : undefined}
                className={`group relative py-1 text-sm font-medium transition-colors duration-300 ${
                  isActive ? "text-slate-950 font-semibold" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Mobile menu toggle */}
        <button
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((current) => !current)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 md:hidden"
        >
          {menuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen ? (
        <nav
          id="mobile-menu"
          aria-label="Main"
          className="absolute inset-x-0 top-full border-y border-slate-100 bg-white/95 shadow-lg backdrop-blur-md md:hidden animate-in fade-in slide-in-from-top-2 duration-200 motion-reduce:animate-none"
        >
          <div className="space-y-1 px-5 py-3.5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={hrefFor(link.id)}
                  onClick={(e) => handleNavClick(e, link.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`block w-full rounded-xl px-4 py-2.5 text-base font-medium transition-colors duration-200 ${
                    isActive
                      ? "bg-slate-50 text-purple-700 font-semibold"
                      : "text-slate-600 hover:bg-slate-50/60 hover:text-slate-900"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
