import React from "react";
import { motion } from "framer-motion";

/**
 * BookCover — the luxury leather-bound cover that opens.
 * The ENTIRE cover surface is clickable (button role) so 3D perspective
 * hit-testing edge cases never block the user from opening the book.
 */
const BookCover = ({ onOpen }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    if (onOpen) onOpen();
  };

  return (
    <motion.div
      data-testid="book-cover"
      role={onOpen ? "button" : undefined}
      tabIndex={onOpen ? 0 : undefined}
      aria-label={onOpen ? "Open the menu" : undefined}
      onClick={onOpen ? handleClick : undefined}
      onKeyDown={
        onOpen
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleClick(e);
              }
            }
          : undefined
      }
      whileHover={onOpen ? { scale: 1.01 } : undefined}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
      className={`relative h-full w-full leather-cover rounded-r-[8px] rounded-l-[3px] overflow-hidden ${onOpen ? "cursor-pointer" : ""}`}
    >
      {/* Inner gold frame */}
      <div className="pointer-events-none absolute inset-6 md:inset-10 border border-gold/40 rounded-[2px] flex flex-col items-center justify-center text-center px-6">
        <span className="font-sans text-[10px] tracking-luxe uppercase text-gold-soft/90">
          The Menu of
        </span>
        <span className="mt-4 font-serif text-5xl sm:text-6xl md:text-7xl uppercase tracking-luxe gold-foil font-medium leading-none">
          Empire
        </span>
        <div className="mt-5 h-px w-40 gold-hairline" />
        <span className="mt-5 font-serif italic text-lg md:text-xl text-gold-soft/90">
          Fine Dining · Est. 2018
        </span>

        <div className="mt-10 h-px w-24 gold-hairline opacity-70" />
        <span className="mt-6 font-sans text-[10px] tracking-luxe uppercase text-gold-soft/70">
          Volume I · Winter Edition
        </span>

        {onOpen && (
          <button
            data-testid="cover-open-btn"
            onClick={handleClick}
            type="button"
            className="pointer-events-auto mt-10 btn-empire relative z-10"
            style={{
              background: "linear-gradient(180deg, rgba(198,166,100,0.16), rgba(198,166,100,0.06))",
              color: "#F1E3B4",
              borderColor: "rgba(198,166,100,0.65)",
            }}
          >
            <span>Open Menu</span>
            <span aria-hidden="true">◈</span>
          </button>
        )}
      </div>

      {/* Corner ornaments (decorative, non-blocking) */}
      <span className="corner-orn tl" style={{ margin: "22px", borderColor: "rgba(198,166,100,0.6)" }} />
      <span className="corner-orn tr" style={{ margin: "22px", borderColor: "rgba(198,166,100,0.6)" }} />
      <span className="corner-orn bl" style={{ margin: "22px", borderColor: "rgba(198,166,100,0.6)" }} />
      <span className="corner-orn br" style={{ margin: "22px", borderColor: "rgba(198,166,100,0.6)" }} />

      {/* Spine */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-4 bg-black/50 rounded-l-[3px]" />
      {/* Light highlight */}
      <div
        className="pointer-events-none absolute inset-y-0 left-8 w-24 opacity-60"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,235,190,0.20), rgba(255,235,190,0) 90%)",
          filter: "blur(6px)",
        }}
      />
    </motion.div>
  );
};

export default BookCover;
