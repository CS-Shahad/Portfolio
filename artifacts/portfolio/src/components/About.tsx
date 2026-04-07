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
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center mt-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="md:col-span-5 relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-muted relative">
              <div className="absolute inset-0 bg-brand-gradient opacity-20 mix-blend-overlay z-10" />
              {/* Replace with actual image of Shahad if available in the future */}
              <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
                <span className="text-sm">Portrait Placeholder</span>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b-4 border-r-4 border-primary rounded-br-3xl" />
            <div className="absolute -top-6 -left-6 w-16 h-16 border-t-4 border-l-4 border-accent rounded-tl-xl" />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-7"
          >
            <div className="prose prose-lg prose-slate dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
              <div className="text-xl md:text-2xl leading-loose">
                {renderBio()}
              </div>
            </div>
            
            <div className="mt-10 flex flex-wrap gap-3">
              {data.keywords.map((keyword, idx) => (
                <span key={idx} className="px-4 py-2 bg-background border border-border rounded-full text-sm font-medium shadow-sm hover:border-primary/50 transition-colors">
                  {keyword}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
