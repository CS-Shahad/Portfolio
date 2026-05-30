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

export default function Home() {
  const { about, experience, projects, skills, certifications, personalInfo, loading } = usePortfolioData();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

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
