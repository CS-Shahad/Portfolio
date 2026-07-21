import { motion } from "framer-motion";
import { AboutData } from "@/hooks/usePortfolioData";
import { SectionHeading } from "./SectionHeading";

export default function About({ data }: { data: AboutData }) {
  // Highlight keywords in bio
  const renderBio = () => {
    if (!data.keywords || data.keywords.length === 0) return data.bio;
    
    let highlightedBio = data.bio;
    data.keywords.forEach(keyword => {
      const regex = new RegExp(`(${keyword})`, 'gi');
      highlightedBio = highlightedBio.replace(regex, '<strong class="text-foreground font-semibold bg-primary/10 px-1 rounded">$1</strong>');
    });
    
    return <div dangerouslySetInnerHTML={{ __html: highlightedBio }} />;
  };

  return (
    <section id="about" className="py-24 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <SectionHeading title="About Me" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mt-12 max-w-4xl mx-auto"
        >
          <div className="prose prose-lg prose-slate dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
            <div className="text-lg md:text-2xl leading-loose text-center">
              {renderBio()}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {data.keywords.map((keyword, idx) => (
              <span key={idx} className="px-4 py-2 bg-background border border-border rounded-full text-sm font-medium shadow-sm hover:border-primary/50 transition-colors">
                {keyword}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
