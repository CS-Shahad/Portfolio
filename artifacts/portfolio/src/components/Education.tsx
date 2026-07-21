import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { FiAward, FiBookOpen } from "react-icons/fi";

export default function Education() {
  return (
    <section id="education" className="py-24 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <SectionHeading title="Education" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mt-16"
        >
          <div className="relative p-6 md:p-10 bg-card rounded-2xl border border-border shadow-sm group overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-border group-hover:bg-brand-gradient transition-all duration-300" />

            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="flex flex-col md:flex-row items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 md:mt-1">
                  <FiBookOpen className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground">
                    Bachelor of Computer Science
                  </h3>
                  <p className="text-base md:text-lg text-primary font-medium mt-1">
                    Umm Al-Qura University
                  </p>

                  <div className="flex flex-wrap gap-1.5 sm:gap-3 mt-5">
                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 md:px-4 md:py-2 bg-primary/10 rounded-xl">
                      <FiAward className="text-primary shrink-0" size={14} />
                      <span className="text-xs sm:text-sm font-semibold text-primary whitespace-nowrap">GPA 3.81 / 4.00</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 md:px-4 md:py-2 rounded-xl"
                      style={{ background: "linear-gradient(135deg, rgba(0,200,224,0.12), rgba(231,64,251,0.12))" }}
                    >
                      <span className="text-xs sm:text-sm font-semibold whitespace-nowrap" style={{ background: "linear-gradient(90deg, #00C8E0, #7730E8, #E040FB)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                        First Class Honours
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-4 py-1.5 bg-muted text-muted-foreground rounded-full text-sm font-medium whitespace-nowrap self-start shrink-0">
                Sep 2019 – Nov 2023
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
