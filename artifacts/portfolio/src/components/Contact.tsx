import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { FiSend, FiCheckCircle, FiAlertCircle, FiCheck, FiCopy, FiLinkedin } from "react-icons/fi";
import { usePortfolioData } from "@/hooks/usePortfolioData";

// Secondary contact options beside the Send Message button: email (mailto + copy) and LinkedIn
function DirectContact() {
  const { profile } = usePortfolioData();
  const emailRef = useRef<HTMLAnchorElement>(null);
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
    resetTimer.current = window.setTimeout(() => setCopyState("idle"), 2000);
  };

  const iconButton =
    "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-muted hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";
  const tooltip = copyState === "copied" ? "Copied" : copyState === "selected" ? "Press Ctrl+C to copy" : "Copy email";

  return (
    <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-1.5 gap-y-1 text-sm min-w-0">
      <span className="text-slate-500">or</span>
      <a
        ref={emailRef}
        href={`mailto:${profile.email}`}
        className="min-w-0 break-all md:break-normal md:whitespace-nowrap font-medium text-slate-700 underline-offset-4 hover:text-primary hover:underline"
      >
        {profile.email}
      </a>
      <span className="inline-flex items-center">
        <span className="group/copy relative inline-flex">
          <button type="button" onClick={copyEmail} aria-label="Copy email" className={iconButton}>
            {copyState === "copied" ? <FiCheck size={16} aria-hidden="true" /> : <FiCopy size={16} aria-hidden="true" />}
          </button>
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute bottom-full left-1/2 mb-1.5 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs font-medium text-background shadow transition-opacity ${
              copyState === "idle" ? "opacity-0 group-hover/copy:opacity-100 group-focus-within/copy:opacity-100" : "opacity-100"
            }`}
          >
            {tooltip}
          </span>
        </span>
        <a
          href={profile.linkedin_url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          title="LinkedIn"
          className={iconButton}
        >
          <FiLinkedin size={16} aria-hidden="true" />
        </a>
      </span>
      <span aria-live="polite" className="sr-only">
        {copyState === "copied" && "Email address copied to the clipboard."}
        {copyState === "selected" && "Email address selected. Press Ctrl+C, or Command+C on Mac, to copy."}
      </span>
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
      <div className="max-w-4xl mx-auto">
        <SectionHeading title="Let's build something impactful!" subtitle="Whatever brings you here, I'd love to connect." />

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

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="group relative w-full md:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-10 py-4 bg-foreground text-background rounded-xl font-bold transition-all hover:scale-[1.02] overflow-hidden disabled:opacity-70 disabled:hover:scale-100"
                >
                  <div className="absolute inset-0 bg-brand-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center gap-2">
                    {status === "submitting" ? "Sending..." : "Send Message"} 
                    {status !== "submitting" && <FiSend className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                  </span>
                </button>
                <DirectContact />
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
