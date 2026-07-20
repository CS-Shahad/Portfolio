import { useState, useEffect } from "react";
import { Link } from "wouter";
import { FiMenu, FiX } from "react-icons/fi";

const navLinks = [
  { label: "Home", id: "home", href: "/" },
  { label: "About", id: "about", href: "/#about" },
  { label: "Projects", id: "projects", href: "/#projects" },
  { label: "Contact", id: "contact", href: "/#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // تأثير لتحديد القسم النشط تلقائياً أثناء نزول المستخدم في الصفحة
  useEffect(() => {
    const handleScrollObserver = () => {
      const scrollPosition = window.scrollY + 120;

      if (scrollPosition < 500) {
        setActiveSection("home");
        return;
      }

      navLinks.forEach((link) => {
        if (link.id === "home") return;
        const element = document.getElementById(link.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScrollObserver);
    return () => window.removeEventListener("scroll", handleScrollObserver);
  }, []);

  const handleScroll = (id: string, href: string) => {
    setMenuOpen(false);
    setActiveSection(id);
    
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = href;
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/70 backdrop-blur-xl transition-all duration-300 shadow-[0_2px_20px_-12px_rgba(0,0,0,0.05)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        
        {/* تم دمج الهيدر الشخصي مع اللوجو الشفاف وتأثير الـ Hover هنا بنجاح */}
        <Link href="/" className="group flex items-center gap-3 cursor-pointer">
          <div className="flex h-10 w-10 items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <img 
              src={`${import.meta.env.BASE_URL}logo.png`} 
              alt="Shahad Al-Matrafi Logo" 
              className="w-full h-full object-contain" 
            />
          </div>
          <div>
            <p className="text-sm font-semibold tracking-wide text-slate-800 transition-colors group-hover:text-slate-950">
              Shahad Al-Matrafi
            </p>
            <p className="text-[11px] font-medium text-slate-400 group-hover:text-purple-500 transition-colors">
              Analytics Engineer
            </p>
          </div>
        </Link>

        {/* روابط الشاشات الكبيرة مع تأثير الخط المتنقل الذكي */}
        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleScroll(link.id, link.href)}
                className={`relative py-1 text-sm font-medium transition-all duration-300 cursor-pointer ${
                  isActive 
                    ? "text-slate-950 font-semibold" 
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {link.label}
                {/* خط برمجى ناعم يظهر تحت الزر النشط يتطابق مع هوية الموقع */}
                <span 
                  className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`} 
                />
              </button>
            );
          })}
        </nav>

        {/* زر المنيو للجوال */}
        <button
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 md:hidden"
        >
          {menuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
        </button>
      </div>

      {/* قائمة الجوال المحدثة بنظام أنيق */}
      {menuOpen ? (
        <div className="border-t border-slate-100 bg-white/95 backdrop-blur-md md:hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="space-y-1 px-5 py-3.5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleScroll(link.id, link.href)}
                  className={`block w-full text-left rounded-xl px-4 py-2.5 text-base font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-slate-50 text-purple-600 font-semibold"
                      : "text-slate-600 hover:bg-slate-50/60 hover:text-slate-900"
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </header>
  );
}