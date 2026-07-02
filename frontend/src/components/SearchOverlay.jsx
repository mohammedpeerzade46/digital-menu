import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { allDishes } from "../data/menu";
import { VegBadge } from "./DishBits";

/**
 * SearchOverlay — elegant expandable search with blur backdrop, instant filtering.
 */
const SearchOverlay = ({ open, onClose, onPick }) => {
  const [q, setQ] = useState("");
  const inputRef = useRef(null);
  const dishes = React.useMemo(() => allDishes(), []);
  const results = React.useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return dishes.slice(0, 8);
    return dishes
      .filter(
        (d) =>
          d.name.toLowerCase().includes(s) ||
          (d.ingredients || []).some((i) => i.toLowerCase().includes(s)) ||
          d.categoryName.toLowerCase().includes(s)
      )
      .slice(0, 12);
  }, [q, dishes]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 220);
      const onKey = (e) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    } else {
      setQ("");
    }
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="search-overlay"
          data-testid="search-overlay"
          className="fixed inset-0 z-40 flex items-start justify-center px-4 pt-16 sm:pt-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background: "rgba(42, 38, 36, 0.35)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
            }}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="relative z-10 w-full max-w-xl"
            initial={{ y: -18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
          >
            <div className="flex items-center gap-3 rounded-full border border-paperborder bg-ivory-light px-4 py-3 shadow-card-lux">
              <Search size={18} className="text-ink-soft" />
              <input
                ref={inputRef}
                type="text"
                data-testid="search-input"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search dishes, ingredients, categories…"
                className="flex-1 bg-transparent font-serif text-lg text-ink placeholder:text-ink-soft/70 focus:outline-none"
                aria-label="Search menu"
              />
              <button
                data-testid="search-close-btn"
                onClick={onClose}
                aria-label="Close search"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-ink-soft hover:bg-sand/60"
              >
                <X size={16} />
              </button>
            </div>

            {/* Results */}
            <div className="mt-3 max-h-[60vh] overflow-y-auto elegant-scroll rounded-[10px] border border-paperborder bg-ivory-light shadow-card-lux">
              {results.length === 0 ? (
                <div className="px-5 py-8 text-center font-serif italic text-ink-soft">
                  Nothing quite matches — try another word.
                </div>
              ) : (
                <ul className="divide-y divide-paperborder" data-testid="search-results">
                  {results.map((d) => (
                    <li key={d.id}>
                      <button
                        data-testid={`search-result-${d.id}`}
                        onClick={() => onPick(d)}
                        className="flex w-full items-center gap-3 px-5 py-3 text-left transition hover:bg-sand/40"
                      >
                        <VegBadge type={d.type} />
                        <div className="min-w-0 flex-1">
                          <div className="font-serif text-lg text-ink truncate">{d.name}</div>
                          <div className="font-sans text-[10px] tracking-luxe uppercase text-ink-soft">
                            {d.categoryName}
                          </div>
                        </div>
                        <span className="font-serif text-lg text-ink">₹{d.price}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;
