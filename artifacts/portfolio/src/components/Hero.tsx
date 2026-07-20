import { motion } from "framer-motion";
import { FiArrowDown, FiDownload, FiMail } from "react-icons/fi";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[100dvh] flex flex-col justify-center items-center overflow-hidden px-6 pt-20">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00C8E0]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#E040FB]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center z-10">

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6"
        >
          Turning Complex Data into <br className="hidden md:block" />
          <span className="text-brand-gradient">Intelligent Action.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          I'm <strong className="text-foreground font-semibold">Shahad Al-Matrafi</strong>, an Analytics Engineer specializing in end-to-end data pipelines, BI reporting with Power BI &amp; DAX, and production ML systems — including agentic AI workflows.
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
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background rounded-full font-medium transition-all hover:scale-105 overflow-hidden"
          >
            <div className="absolute inset-0 bg-brand-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center gap-2">
              Contact Me <FiMail />
            </span>
          </a>
          
          <a
            href={`${import.meta.env.BASE_URL}Shahad_AlMatrafi_CV.pdf`}
            download="Shahad_AlMatrafi_CV.pdf"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-foreground rounded-full font-medium border border-border transition-all hover:border-[#7730E8]/30 hover:shadow-lg hover:shadow-[#7730E8]/5 hover:scale-105"
          >
            Download CV <FiDownload className="group-hover:-translate-y-1 transition-transform" />
          </a>
        </motion.div>
      </div>

    </section>
  );
}