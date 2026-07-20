import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { usePortfolioData } from "@/hooks/usePortfolioData";

export default function Home() {
  const { about, experience, projects, skills, certifications } = usePortfolioData();

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
      <Footer />
    </main>
  );
}
