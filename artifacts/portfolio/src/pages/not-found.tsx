import { Link } from "wouter";
import { motion } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";
import Footer from "@/components/Footer";
import { useDocumentTitle } from "@/lib/navigation";
import { SITE_NAME } from "@/lib/site";

export default function NotFound() {
  useDocumentTitle(`Page Not Found — ${SITE_NAME}`);

  return (
    <>
      <main className="relative flex min-h-[calc(100dvh-4rem)] items-center justify-center overflow-hidden bg-background px-6 py-16 text-center">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-gradient opacity-15 blur-[120px]" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-xl"
        >
          <p className="text-7xl md:text-8xl font-bold tracking-tight text-brand-gradient">404</p>
          <h1 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">This page doesn't exist</h1>
          <p className="mt-3 text-base md:text-lg text-muted-foreground">
            The link may be broken, or the page may have moved. Let's get you back on track.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-gradient px-7 py-3.5 font-medium text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#7730E8]/30"
          >
            <FiArrowLeft /> Back to Portfolio
          </Link>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
