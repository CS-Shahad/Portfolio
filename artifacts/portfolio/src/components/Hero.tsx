import { motion } from "framer-motion";
import { FiDownload, FiMail } from "react-icons/fi";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[100dvh] flex flex-col justify-center items-center overflow-hidden px-6 pt-20">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}hero-bg.svg)` }}
      />
      {/* Gradient overlay: keeps text readable and blends the bottom into the About section */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-[hsl(var(--background))]" />

      <div className="max-w-5xl mx-auto text-center z-10">

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white mb-6"
        >
          Turning Complex Data into <br className="hidden md:block" />
          <span className="text-brand-gradient">Intelligent Action.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-base md:text-xl text-white/75 max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          I'm <strong className="text-white font-semibold">Shahad Al-Matrafi</strong>, a Data &amp; Automation Specialist specializing in end-to-end data pipelines, BI reporting with Power BI &amp; DAX, and production ML systems — including agentic AI workflows.
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
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
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