import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PersonalInfoData } from "@/hooks/usePortfolioData";
import { FiChevronDown, FiBookOpen, FiZap, FiImage } from "react-icons/fi";

export default function PersonalInfo({ data }: { data: PersonalInfoData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedBook, setExpandedBook] = useState<number | null>(null);

  return (
    <section className="py-12 px-6 border-t border-border/50 bg-background">
      <div className="max-w-4xl mx-auto">
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
              <div className="pt-12 pb-8 space-y-16">

                {/* Bookshelf */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-xl font-bold text-foreground">
                    <FiBookOpen className="text-primary" /> Bookshelf
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.books.map((book, idx) => (
                      <div key={idx} className="border border-border rounded-2xl overflow-hidden bg-card">
                        <button
                          onClick={() => setExpandedBook(expandedBook === idx ? null : idx)}
                          className="w-full flex items-start justify-between gap-3 p-5 text-left hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-primary mt-0.5 shrink-0">✦</span>
                            <span className="font-medium text-foreground leading-snug">{book.title}</span>
                          </div>
                          {book.notes && book.notes.length > 0 && (
                            <motion.div
                              animate={{ rotate: expandedBook === idx ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                              className="shrink-0 mt-0.5"
                            >
                              <FiChevronDown className="text-muted-foreground" size={16} />
                            </motion.div>
                          )}
                        </button>

                        <AnimatePresence>
                          {expandedBook === idx && book.notes && book.notes.length > 0 && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden"
                            >
                              <ul className="px-5 pb-5 space-y-2 border-t border-border/50 pt-3">
                                {book.notes.map((note, ni) => (
                                  <li key={ni} className="flex items-start gap-2 text-muted-foreground text-sm leading-relaxed">
                                    <span className="text-primary/60 mt-1 shrink-0">–</span>
                                    <span>{note}</span>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Events */}
                {data.events && data.events.length > 0 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 text-xl font-bold text-foreground">
                      <FiZap className="text-accent" /> Hackathons & Competitions
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {data.events.map((event, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: idx * 0.08 }}
                          className="rounded-2xl border border-border overflow-hidden bg-card group"
                        >
                          {event.photo_url ? (
                            <div className="w-full h-44 overflow-hidden bg-muted">
                              <img
                                src={event.photo_url}
                                alt={event.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                          ) : (
                            <div className="w-full h-44 bg-muted flex items-center justify-center">
                              <FiImage size={32} className="text-muted-foreground/40" />
                            </div>
                          )}
                          <div className="p-5">
                            <div className="flex items-start justify-between gap-3">
                              <h4 className="font-bold text-foreground leading-snug">{event.title}</h4>
                              {event.date && (
                                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full whitespace-nowrap shrink-0">
                                  {event.date}
                                </span>
                              )}
                            </div>
                            {event.description && (
                              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{event.description}</p>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
