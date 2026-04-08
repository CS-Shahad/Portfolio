import { useRef } from "react";
import { CertificationData } from "@/hooks/usePortfolioData";
import { FiAward } from "react-icons/fi";

export default function Certifications({ data }: { data: CertificationData[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollData = [...data, ...data, ...data];

  const pause = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = "paused";
  };
  const play = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = "running";
  };

  return (
    <section className="py-24 overflow-hidden bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <h2 className="text-3xl font-bold">Certifications & Credentials</h2>
        <p className="mt-2 text-white/50 text-sm">Hover to pause</p>
      </div>

      <div
        className="relative flex overflow-x-hidden"
        onMouseEnter={pause}
        onMouseLeave={play}
      >
        <div className="absolute top-0 bottom-0 left-0 w-24 md:w-48 bg-gradient-to-r from-foreground to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 md:w-48 bg-gradient-to-l from-foreground to-transparent z-10 pointer-events-none" />

        <div ref={trackRef} className="flex animate-marquee gap-6 px-6">
          {scrollData.map((cert, idx) => (
            <div
              key={`${cert.id}-${idx}`}
              className="flex flex-col items-center gap-3 min-w-[200px] py-6 px-5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors shrink-0"
            >
              {cert.badge_url ? (
                <div className="w-28 h-28 rounded-xl overflow-hidden bg-white/10 flex items-center justify-center">
                  <img
                    src={cert.badge_url}
                    alt={cert.title}
                    className="w-full h-full object-contain p-1"
                  />
                </div>
              ) : (
                <div className="w-28 h-28 rounded-xl bg-white/10 flex items-center justify-center">
                  <FiAward size={40} className="text-white/40" />
                </div>
              )}
              <div className="text-center">
                <h4 className="font-bold text-white text-sm leading-tight">{cert.title}</h4>
                <p className="text-white/50 text-xs mt-1">{cert.issuer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
