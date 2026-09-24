import { useEffect } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import PersonalInfo from "@/components/PersonalInfo";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { scrollToSection, useDocumentTitle } from "@/lib/navigation";

export default function Home() {
  const { about, experience, projects, skills, certifications, personalInfo } = usePortfolioData();
  useDocumentTitle();

  // Support links like /Portfolio/#contact (direct loads and navbar clicks from other pages).
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const frame = requestAnimationFrame(() => scrollToSection(id));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <main className="bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      <Hero />
      <About data={about} />
      <Experience data={experience} />
      <Education />
      <Projects data={projects} />
      <Skills data={skills} />
      <Certifications data={certifications} />
      <Contact />
      <PersonalInfo data={personalInfo} />
      <Footer />
    </main>
  );
}
