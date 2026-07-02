import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search } from "lucide-react";
import { CATEGORIES } from "../data/menu";

/**
 * CategoryNav — book-inspired navigation. Slides in from the right like an index card.
 */
const CategoryNav = ({ open, onClose, onPick, currentIndex, filter, onFilterChange, onSearch }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="cat-nav"
          data-testid="category-nav"
          className="fixed inset-0 z-40 flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background: "rgba(42, 38, 36, 0.4)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
            onClick={onClose}
          />
          <motion.aside
            className="relative z-10 h-full w-[92vw] max-w-md flex flex-col overflow-hidden bg-ivory-light shadow-card-lux paper-grain"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 200, damping: 26 }}
          >
            <div className="flex items-center justify-between px-6 pt-8 pb-4">
              <div>
                <h3 className="font-serif text-[28px] text-ink leading-none">Table of Contents</h3>
              </div>
              <button
                data-testid="category-nav-close-btn"
                aria-label="Close navigation"
                onClick={onClose}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-paperborder text-ink-soft hover:bg-sand/60"
              >
                <X size={16} />
              </button>
            </div>

            {/* 1. Search */}
            <div className="px-6 pb-5">
              <button
                onClick={() => {
                  onClose();
                  onSearch();
                }}
                className="flex w-full items-center gap-3 rounded-[6px] border border-paperborder bg-white/40 px-4 py-2.5 text-ink-soft transition hover:bg-white hover:text-ink shadow-sm"
              >
                <Search size={15} />
                <span className="font-serif text-[15px] italic">Search the menu...</span>
              </button>
            </div>

            {/* 2. Veg / Non-Veg Filter */}
            <div className="px-6 pb-6">
              <FilterSelector value={filter} onChange={onFilterChange} />
            </div>

            <div className="mx-6 h-px gold-hairline opacity-60" />

            {/* 3. Category List */}
            <ul className="flex-1 overflow-y-auto elegant-scroll px-6 py-6">
              {CATEGORIES.map((c, i) => {
                const active = i === currentIndex;
                return (
                  <li key={c.id}>
                    <button
                      data-testid={`nav-cat-${c.id}`}
                      onClick={() => onPick(i)}
                      className="group flex w-full items-baseline gap-3 py-3 text-left outline-none"
                    >
                      <span
                        className="font-sans text-[10px] tracking-luxe uppercase w-6"
                        style={{ color: active ? "#A9873F" : "#5C554F" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className="font-serif text-xl leading-tight flex-1 transition-colors group-hover:text-gold-deep"
                        style={{ color: active ? "#A9873F" : "#2A2624" }}
                      >
                        {c.name}
                      </span>
                      <span
                        aria-hidden="true"
                        className="flex-1 dotted-leader h-[1em] text-ink-soft/40"
                      />
                      <span className="font-sans text-[10px] tracking-luxe uppercase text-ink-soft">
                        {c.kicker}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const FilterSelector = ({ value, onChange }) => {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center gap-4">
        <FilterBtn active={value === "all"} onClick={() => onChange("all")} label="All" />
        <FilterBtn active={value === "veg"} onClick={() => onChange("veg")} label="Veg" color="green" />
        <FilterBtn active={value === "nonveg"} onClick={() => onChange("nonveg")} label="Non-Veg" color="red" />
      </div>
    </div>
  );
};

const FilterBtn = ({ active, onClick, label, color }) => {
  return (
    <button
      onClick={onClick}
      className={`group flex items-center gap-1.5 outline-none transition-all ${
        active ? "opacity-100" : "opacity-50 hover:opacity-100"
      }`}
    >
      {/* Indicator Dot */}
      {color ? (
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            color === "green" ? "bg-[#4B6B4E]" : color === "red" ? "bg-[#8B3A3A]" : ""
          } shadow-sm`}
        />
      ) : active ? (
        <span className="w-1.5 h-1.5 rounded-full bg-gold-deep shadow-sm" />
      ) : (
        <span className="w-1.5 h-1.5 rounded-full bg-paperborder" />
      )}
      
      {/* Label */}
      <span
        className={`font-sans text-[10.5px] tracking-luxe uppercase ${
          active ? "text-ink font-medium" : "text-ink-soft"
        }`}
      >
        {label}
      </span>
    </button>
  );
};

export default CategoryNav;
