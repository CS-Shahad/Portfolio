import { CertificationData } from "@/hooks/usePortfolioData";
import { FiAward } from "react-icons/fi";

export default function Certifications({ data }: { data: CertificationData[] }) {
  // Duplicate data to ensure smooth infinite scroll if there are few items
  const scrollData = [...data, ...data, ...data];

  return (
    <section className="py-24 overflow-hidden bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <h2 className="text-3xl font-bold">Certifications & Credentials</h2>
      </div>
      
      <div className="relative flex overflow-x-hidden group">
        {/* Left/Right fading gradients */}
        <div className="absolute top-0 bottom-0 left-0 w-24 md:w-64 bg-gradient-to-r from-foreground to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 md:w-64 bg-gradient-to-l from-foreground to-transparent z-10 pointer-events-none" />
        
        <div className="flex animate-marquee hover:[animation-play-state:paused]">
          {scrollData.map((cert, idx) => (
            <div 
              key={`${cert.id}-${idx}`}
              className="flex items-center gap-4 min-w-max mx-4 md:mx-8 py-4 px-8 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm"
            >
              <div className="w-12 h-12 rounded-full bg-brand-gradient flex items-center justify-center text-white shrink-0">
                {cert.badge_url ? (
                  <img src={cert.badge_url} alt={cert.title} className="w-8 h-8 object-contain" />
                ) : (
                  <FiAward size={20} />
                )}
              </div>
              <div>
                <h4 className="font-bold text-white text-lg">{cert.title}</h4>
                <p className="text-white/60 text-sm">{cert.issuer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
