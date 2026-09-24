import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { CertificationData } from "@/hooks/usePortfolioData";
import { FiAward, FiExternalLink, FiPause, FiPlay } from "react-icons/fi";

// The marquee renders the list this many times so it can loop seamlessly on wide screens.
const MARQUEE_COPIES = 3;

function CertCard({ cert, decorative = false }: { cert: CertificationData; decorative?: boolean }) {
  const content = (
    <>
      <div className="w-28 h-28 rounded-xl bg-white/10 flex items-center justify-center overflow-hidden">
        {cert.badge_url ? (
          <img
            src={cert.badge_url}
            alt={decorative ? "" : `${cert.title} badge`}
            width={112}
            height={112}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain p-2"
          />
        ) : (
          <FiAward size={40} className="text-white/40" aria-hidden="true" />
        )}
      </div>
      <div className="text-center">
        <h3 className="font-bold text-white text-sm leading-tight">{cert.title}</h3>
        <p className="text-white/75 text-xs mt-1">{cert.issuer}</p>
        {cert.credential_url && (
          <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-cyan-300">
            View credential <FiExternalLink size={12} aria-hidden="true" />
          </span>
        )}
      </div>
    </>
  );

  const cardClass =
    "flex flex-col items-center gap-3 w-[220px] shrink-0 py-6 px-5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm transition-colors";

  if (cert.credential_url) {
    return (
      <a
        href={cert.credential_url}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={decorative ? -1 : undefined}
        className={`${cardClass} hover:bg-white/10 hover:border-white/25 focus-visible:outline-2 focus-visible:outline-cyan-300`}
      >
        {content}
      </a>
    );
  }
  return <div className={`${cardClass} hover:bg-white/10`}>{content}</div>;
}

export default function Certifications({ data }: { data: CertificationData[] }) {
  const reduceMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);

  return (
    <section id="certifications" className="py-16 md:py-20 overflow-hidden bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
        <h2 className="text-3xl font-bold">Certifications & Credentials</h2>
        {!reduceMotion && (
          <div className="mt-3 flex items-center justify-center gap-3 text-sm text-white/75">
            <span className="hidden pointer-fine:inline">Hover to pause</span>
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-pressed={paused}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1 text-xs font-medium text-white/85 hover:bg-white/10 transition-colors"
            >
              {paused ? <FiPlay size={12} aria-hidden="true" /> : <FiPause size={12} aria-hidden="true" />}
              {paused ? "Play" : "Pause"}
            </button>
          </div>
        )}
      </div>

      {reduceMotion ? (
        <ul className="max-w-6xl mx-auto px-6 flex flex-wrap justify-center gap-6">
          {data.map((cert) => (
            <li key={cert.id} className="flex">
              <CertCard cert={cert} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="marquee relative flex overflow-x-hidden">
          <div className="absolute top-0 bottom-0 left-0 w-16 md:w-48 bg-gradient-to-r from-foreground to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-16 md:w-48 bg-gradient-to-l from-foreground to-transparent z-10 pointer-events-none" />

          <div
            className="flex w-max animate-marquee"
            style={paused ? { animationPlayState: "paused" } : undefined}
          >
            {Array.from({ length: MARQUEE_COPIES }, (_, copy) => (
              // Only the first copy is exposed to assistive tech; the rest are visual repeats.
              <ul
                key={copy}
                aria-hidden={copy > 0 ? true : undefined}
                className="flex shrink-0 gap-6 pr-6"
              >
                {data.map((cert) => (
                  <li key={cert.id} className="flex">
                    <CertCard cert={cert} decorative={copy > 0} />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
