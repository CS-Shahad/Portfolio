import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { AboutData } from "@/hooks/usePortfolioData";
import { SectionHeading } from "./SectionHeading";

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Highlights the first occurrence of each keyword (case-insensitive) as React elements.
function highlightKeywords(text: string, keywords: string[]): ReactNode[] {
  const ranges: { start: number; end: number }[] = [];
  for (const keyword of keywords) {
    if (!keyword) continue;
    const match = new RegExp(escapeRegExp(keyword), "i").exec(text);
    if (!match) continue;
    const start = match.index;
    const end = start + match[0].length;
    if (ranges.some((r) => start < r.end && end > r.start)) continue;
    ranges.push({ start, end });
  }
  ranges.sort((a, b) => a.start - b.start);

  const nodes: ReactNode[] = [];
  let cursor = 0;
  ranges.forEach(({ start, end }, i) => {
    if (start > cursor) nodes.push(text.slice(cursor, start));
    nodes.push(
      <strong key={i} className="text-foreground font-semibold bg-primary/10 px-1 rounded">
        {text.slice(start, end)}
      </strong>,
    );
    cursor = end;
  });
  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
}

export default function About({ data }: { data: AboutData }) {
  return (
    <section id="about" className="py-16 md:py-20 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <SectionHeading title="About Me" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="prose prose-lg prose-slate dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
            <div className="text-lg md:text-2xl leading-relaxed md:leading-loose text-center">
              {highlightKeywords(data.bio, data.keywords ?? [])}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
