import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PersonalInfoData } from "@/hooks/usePortfolioData";
import { FiChevronDown, FiBookOpen, FiCoffee } from "react-icons/fi";

export default function PersonalInfo({ data }: { data: PersonalInfoData }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-12 px-6 border-t border-border/50 bg-background">
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-center gap-2 py-4 text-muted-foreground hover:text-primary transition-colors font-medium group"
        >
          <span>Know More About Me</span>
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <FiChevronDown className="group-hover:translate-y-1 transition-transform" />
          </motion.div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-12 pb-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Books */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-xl font-bold text-foreground">
                    <FiBookOpen className="text-primary" /> Bookshelf
                  </div>
                  <ul className="space-y-4">
                    {data.books.map((book, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                        <span className="text-primary mt-1 text-sm">✦</span>
                        <span className="leading-relaxed">{book}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Interests */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-xl font-bold text-foreground">
                    <FiCoffee className="text-accent" /> Interests
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {data.interests.map((interest, idx) => (
                      <span key={idx} className="px-4 py-2 bg-muted rounded-xl text-sm font-medium text-foreground">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
