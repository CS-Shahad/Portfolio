import { useState, type CSSProperties } from "react";
import { CertificationData } from "@/hooks/usePortfolioData";
import { FiAward, FiExternalLink, FiPause, FiPlay } from "react-icons/fi";
import { SectionHeading } from "./SectionHeading";

// The marquee renders the list this many times and moves by one copy per loop.
// Each copy must be at least as wide as the screen gap it has to fill: 4 copies of
// 4 cards (~976px each, ~864px on phones) keep the track seamless on screens up to ~2900px wide.
const MARQUEE_COPIES = 4;

function CertCard({ cert, decorative = false }: { cert: CertificationData; decorative?: boolean }) {
  const content = (
    <>
      {cert.badge_url ? (
        <img
          src={cert.badge_url}
          alt={decorative ? "" : `${cert.title} badge`}
          width={112}
          height={112}
          loading="lazy"
          decoding="async"
          className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 object-contain"
        />
      ) : (
        <div className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-xl bg-muted flex items-center justify-center">
          <FiAward size={40} className="text-muted-foreground" aria-hidden="true" />
        </div>
      )}
      <div className="text-center">
        <h3 className="font-bold text-foreground text-sm leading-tight">{cert.title}</h3>
        <p className="text-slate-600 text-xs mt-1 whitespace-nowrap">{cert.issuer}</p>
        {cert.date && <p className="text-slate-600 text-xs mt-0.5">{cert.date}</p>}
      </div>
      {cert.credential_url && (
        <span className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-slate-600 transition-colors group-hover:text-primary">
          Verify <FiExternalLink size={11} aria-hidden="true" />
          <span className="sr-only">(opens in a new tab)</span>
        </span>
      )}
    </>
  );

  // Same card style as the project cards: white, subtle border, soft shadow, rounded-3xl.
  const cardClass =
    "flex flex-col items-center gap-3 w-[200px] sm:w-[220px] shrink-0 py-5 px-4 sm:py-6 sm:px-5 bg-card rounded-3xl border border-border shadow-sm transition-shadow duration-300";

  if (cert.credential_url) {
    return (
      <a
        href={cert.credential_url}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={decorative ? -1 : undefined}
        className={`group ${cardClass} hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`}
      >
        {content}
      </a>
    );
  }
  return <div className={cardClass}>{content}</div>;
}

export default function Certifications({ data }: { data: CertificationData[] }) {
  const [paused, setPaused] = useState(false);

  return (
    <section id="certifications" className="relative pt-10 pb-6 md:pt-14 md:pb-6 overflow-hidden bg-gradient-to-b from-slate-50 to-background">
      {/* Soft brand-tinted glows; masked so they fade out before the section edges */}
      <div className="cert-tint pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative max-w-6xl mx-auto px-6">
        <SectionHeading title="Certifications & Credentials" />
      </div>

      {/* py-4 leaves room for the card shadows; the mask fades cards out at the left/right edges */}
      <div className="marquee marquee-fade relative flex overflow-x-hidden py-4">
        <div
          className="flex w-max animate-marquee"
          style={{
            "--marquee-copies": MARQUEE_COPIES,
            animationPlayState: paused ? "paused" : undefined,
          } as CSSProperties}
        >
          {Array.from({ length: MARQUEE_COPIES }, (_, copy) => (
            // Only the first copy is exposed to assistive tech; the rest are visual repeats.
            <ul
              key={copy}
              aria-hidden={copy > 0 ? true : undefined}
              className="flex shrink-0 gap-4 pr-4 sm:gap-6 sm:pr-6"
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

      <div className="relative mt-1 flex justify-center">
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/80 px-3 py-1 text-xs font-medium text-slate-600 shadow-sm hover:text-foreground hover:border-primary/40 transition-colors"
        >
          {paused ? <FiPlay size={12} aria-hidden="true" /> : <FiPause size={12} aria-hidden="true" />}
          {paused ? "Play" : "Pause"}
        </button>
      </div>
    </section>
  );
}
