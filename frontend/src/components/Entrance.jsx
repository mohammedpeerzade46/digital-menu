import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EmpireMark from "./EmpireMark";

/**
 * Entrance — cinematic 4-phase entry sequence.
 * Tightened timing (~4.5s total until CTA fully visible).
 */
const Entrance = ({ onOpen }) => {
  const [phase, setPhase] = useState(1);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(2), 300);
    const t2 = setTimeout(() => setPhase(3), 1500);
    const t3 = setTimeout(() => setPhase(4), 2500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div
      data-testid="entrance-scene"
      className="relative z-10 flex min-h-[100dvh] w-full flex-col items-center justify-center px-6 pt-14 pb-10 sm:pt-16 sm:pb-14"
    >
      <AnimatePresence>
        {phase >= 2 && (
          <motion.div
            key="brand"
            initial={{ opacity: 0, y: 8 }}
            animate={{
              opacity: 1,
              y: phase >= 3 ? -44 : 0,
              scale: phase >= 3 ? 0.94 : 1,
            }}
            transition={{ duration: 1.1, ease: [0.2, 0.7, 0.2, 1] }}
            className="flex flex-col items-center text-center"
          >
            <EmpireMark size="xl" tone="gold" subtitle="EMPIRE · FINE DINING · EST 2018" />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.9 }}
              className="mt-6 max-w-md px-2 font-serif text-lg sm:text-2xl italic text-ink-soft leading-snug"
            >
              Welcome. Every dish tells a story —<br className="hidden sm:block" />
              sit slowly, and let it begin.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase >= 3 && (
          <motion.div
            key="book-rise"
            initial={{ opacity: 0, y: 200, rotateX: 18 }}
            animate={{ opacity: 1, y: 0, rotateX: 6 }}
            transition={{ duration: 1.1, ease: [0.16, 0.7, 0.2, 1] }}
            className="mt-6 sm:mt-10"
            style={{ transformStyle: "preserve-3d", perspective: 1600 }}
          >
            <MiniClosedBook />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase >= 4 && (
          <motion.div
            key="invite"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
            className="mt-8 flex flex-col items-center gap-3"
          >
            <button
              data-testid="open-menu-btn"
              onClick={onOpen}
              className="btn-empire"
              aria-label="Open the menu"
            >
              <span>Open Menu</span>
              <span aria-hidden="true" className="text-gold-foil">◈</span>
            </button>
            <span className="mt-1 font-sans text-[9px] tracking-luxe uppercase text-ink-soft">
              Tap to begin
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MiniClosedBook = () => (
  <div
    className="relative"
    style={{ width: "min(64vw, 280px)", height: "min(46vw, 200px)" }}
  >
    <div className="absolute inset-0 rounded-r-[6px] rounded-l-[3px] leather-cover shadow-book">
      <div className="absolute inset-5 flex flex-col items-center justify-center border border-gold/40 rounded-[2px]">
        <span className="font-serif gold-foil text-2xl sm:text-3xl tracking-luxe uppercase">Empire</span>
        <div className="mt-2 h-px w-20 gold-hairline" />
        <span className="mt-2 font-sans text-[9px] tracking-luxe uppercase text-gold-soft">
          Le Menu
        </span>
      </div>
      <div className="absolute left-0 top-0 h-full w-3 bg-black/40 rounded-l-[3px]" />
    </div>
  </div>
);

export default Entrance;
