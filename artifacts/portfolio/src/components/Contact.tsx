import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { FiSend, FiCheckCircle, FiAlertCircle, FiCheck, FiCopy, FiLinkedin, FiMail } from "react-icons/fi";
import { usePortfolioData } from "@/hooks/usePortfolioData";

// Email (copy + mailto) and LinkedIn, shown next to the form
function DirectContact() {
  const { profile } = usePortfolioData();
  const emailRef = useRef<HTMLSpanElement>(null);
  const resetTimer = useRef<number | undefined>(undefined);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "selected">("idle");

  useEffect(() => () => window.clearTimeout(resetTimer.current), []);

  const copyEmail = async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard API unavailable");
      await navigator.clipboard.writeText(profile.email);
      setCopyState("copied");
    } catch {
      // Fallback: select the address so it can be copied with the keyboard
      const node = emailRef.current;
      const selection = window.getSelection();
      if (node && selection) {
        const range = document.createRange();
        range.selectNodeContents(node);
        selection.removeAllRanges();
        selection.addRange(range);
      }
      setCopyState("selected");
    }
    window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => setCopyState("idle"), 2500);
  };

  const smallButton =
    "inline-flex items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground hover:border-primary/50 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

  return (
    <div className="bg-card p-6 rounded-3xl border border-border shadow-sm">
      <h3 className="text-lg font-bold text-foreground">Reach me directly</h3>

      <p className="mt-5 text-xs font-medium uppercase tracking-wider text-slate-600">Email</p>
      <span ref={emailRef} className="mt-1 block break-all text-base font-medium text-foreground">
        {profile.email}
      </span>
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" onClick={copyEmail} className={smallButton}>
          {copyState === "copied" ? <FiCheck aria-hidden="true" /> : <FiCopy aria-hidden="true" />}
          {copyState === "copied" ? "Copied" : "Copy"}
        </button>
        <a href={`mailto:${profile.email}`} className={smallButton}>
          <FiMail aria-hidden="true" /> Send email
        </a>
      </div>
      <p aria-live="polite" className="mt-2 min-h-[1.25rem] text-xs text-slate-600">
        {copyState === "copied" && "Email address copied to the clipboard."}
        {copyState === "selected" && "Address selected. Press Ctrl+C (⌘C on Mac) to copy."}
      </p>

      <div className="mt-4 border-t border-border pt-5">
        <a
          href={profile.linkedin_url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-foreground px-5 py-3 font-semibold text-background transition-all hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary"
        >
          <span className="absolute inset-0 bg-brand-gradient opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <span className="relative z-10 flex items-center gap-2">
            <FiLinkedin aria-hidden="true" /> LinkedIn
          </span>
        </a>
      </div>
    </div>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;
    if (!formspreeEndpoint) {
      setStatus("error");
      setErrorMsg("Contact form isn't configured yet. Please email me directly instead.");
      return;
    }

    try {
      const res = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        throw new Error(`Formspree responded with ${res.status}`);
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again later.");
    }
  };

  return (
    <section id="contact" className="py-16 md:py-20 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <SectionHeading title="Let's build something impactful!" subtitle="Whatever brings you here, I'd love to connect." />

        {/* Form + direct contact side by side on large screens; on smaller screens the contact block comes first */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-6 items-start">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:order-last"
        >
          <DirectContact />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="bg-card p-6 md:p-10 rounded-3xl border border-border shadow-xl relative overflow-hidden"
        >
          {/* Decorative corner */}
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-brand-gradient rounded-full blur-[100px] opacity-20 pointer-events-none" />

          {status === "success" ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                <FiCheckCircle size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
              <p className="text-muted-foreground">Thank you for reaching out. I'll get back to you soon.</p>
              <button 
                onClick={() => setStatus("idle")}
                className="mt-8 px-6 py-2 bg-muted text-muted-foreground rounded-full hover:bg-muted/80 transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground ml-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder="Jane Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground ml-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder="jane@example.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground ml-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                  placeholder="How can I help you?"
                />
              </div>

              {status === "error" && (
                <div className="flex items-center gap-2 text-red-500 text-sm">
                  <FiAlertCircle /> {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="group relative w-full md:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 bg-foreground text-background rounded-xl font-bold transition-all hover:scale-[1.02] overflow-hidden disabled:opacity-70 disabled:hover:scale-100"
              >
                <div className="absolute inset-0 bg-brand-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center gap-2">
                  {status === "submitting" ? "Sending..." : "Send Message"} 
                  {status !== "submitting" && <FiSend className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                </span>
              </button>
            </form>
          )}
        </motion.div>
        </div>
      </div>
    </section>
  );
}
