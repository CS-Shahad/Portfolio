import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}

export function SectionHeading({ title, subtitle, children }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="mb-16 md:mb-24 text-center"
    >
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground inline-block relative">
        {title}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-brand-gradient rounded-full" />
      </h2>
      {subtitle && (
        <p className="mt-8 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      {children}
    </motion.div>
  );
}
