import { motion } from "framer-motion";
import { FiDownload, FiMail, FiMapPin } from "react-icons/fi";
import { scrollToSection } from "@/lib/navigation";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[calc(100dvh-4rem)] flex flex-col justify-center items-center overflow-hidden px-6 py-16">
      {/* Background: animated SVG, or a static copy when the user prefers reduced motion */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat motion-reduce:hidden"
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}hero-bg.svg)` }}
      />
      <div
        className="absolute inset-0 hidden bg-cover bg-center bg-no-repeat motion-reduce:block"
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}hero-bg-static.svg)` }}
      />
      {/* Darken for text contrast; the hero ends on a clean edge (a fade to the light About background reads as gray) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />

      <div className="max-w-5xl mx-auto text-center z-10">

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="mb-5 inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-white/70"
        >
          <FiMapPin aria-hidden="true" className="shrink-0" /> Makkah, Saudi Arabia
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-balance text-white mb-6"
        >
          I build the data systems <br className="hidden lg:block" />
          behind <span className="text-brand-gradient">better decisions.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-base md:text-xl text-white/75 max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          I'm <strong className="text-white font-semibold">Shahad Al-Matrafi</strong>, a Data Analyst who builds automated Python pipelines, Power BI reporting for leadership, and machine learning models.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("contact");
            }}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-brand-gradient text-white rounded-full font-medium transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#7730E8]/30"
          >
            Contact Me <FiMail />
          </a>

          <a
            href={`${import.meta.env.BASE_URL}Shahad_AlMatrafi_CV.pdf`}
            download="Shahad_AlMatrafi_CV.pdf"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-full font-medium border border-white/25 transition-all hover:bg-white/20 hover:border-white/40 hover:scale-105"
          >
            Download CV <FiDownload className="group-hover:-translate-y-1 transition-transform" />
          </a>
        </motion.div>
      </div>

    </section>
  );
}