import React from "react";
import { motion } from "framer-motion";

/**
 * EmpireMark — the "Empire" logo mark.
 * Purely typographic + geometric so it can be replaced later.
 */
const EmpireMark = ({ size = "md", tone = "gold", subtitle = "FINE DINING · EST 2018" }) => {
  const scale = {
    sm: { title: "text-2xl", sub: "text-[9px]" },
    md: { title: "text-4xl sm:text-5xl", sub: "text-[10px]" },
    lg: { title: "text-6xl sm:text-7xl", sub: "text-[11px]" },
    xl: { title: "text-7xl sm:text-8xl md:text-9xl", sub: "text-[12px]" },
  }[size] || { title: "text-4xl", sub: "text-[10px]" };

  const titleClass = tone === "gold" ? "gold-foil" : "text-ink";

  return (
    <div className="inline-flex flex-col items-center select-none" data-testid="empire-mark">
      <motion.span
        initial={{ letterSpacing: "0.5em", opacity: 0 }}
        animate={{ letterSpacing: "0.28em", opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.2, 0.7, 0.2, 1] }}
        className={`font-serif ${scale.title} ${titleClass} font-medium leading-none tracking-luxe uppercase`}
      >
        Empire
      </motion.span>
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 0.9, duration: 1.4, ease: [0.2, 0.7, 0.2, 1] }}
        className="mt-3 h-px w-40 origin-center gold-hairline"
      />
      <motion.span
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 1.0 }}
        className={`mt-3 font-sans ${scale.sub} tracking-luxe uppercase text-ink-soft`}
        style={{ color: tone === "light" ? "rgba(246,242,234,0.75)" : undefined }}
      >
        {subtitle}
      </motion.span>
    </div>
  );
};

export default EmpireMark;
