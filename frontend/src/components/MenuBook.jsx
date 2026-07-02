import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  motion,
  AnimatePresence,
} from "framer-motion";
import { Search } from "lucide-react";
import { CATEGORIES } from "../data/menu";
import BookCover from "./BookCover";
import MenuPage from "./MenuPage";
import SearchOverlay from "./SearchOverlay";
import FoodDetailModal from "./FoodDetailModal";
import CategoryNav from "./CategoryNav";

/**
 * MenuBook — mobile-first single-page book.
 */

const swipeConfidence = (offset, velocity) => Math.abs(offset) * velocity;
const SWIPE_THRESHOLD = 3000;

// Simple, foolproof sliding carousel variants to guarantee NO flicker and continuous motion.
const pageVariants = {
  enter: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 1,
    scale: 0.98,
    zIndex: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    zIndex: 5,
  },
  exit: (direction) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 1,
    scale: 0.98,
    zIndex: 0,
  }),
};

const pageTransition = {
  x: { type: "spring", stiffness: 350, damping: 35, mass: 0.8 },
  scale: { type: "spring", stiffness: 350, damping: 35, mass: 0.8 },
  opacity: { duration: 0.2 },
};

const MenuBook = ({ onBackHome }) => {
  const [pageIndex, setPageIndex] = useState(-1);
  const [direction, setDirection] = useState(1);
  const [selectedDish, setSelectedDish] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const total = CATEGORIES.length;
  const isCoverClosed = pageIndex === -1;

  const displayed = useMemo(() => {
    if (filter === "all") return CATEGORIES;
    return CATEGORIES.map((c) => ({
      ...c,
      items: (c.items || []).filter((d) => d.type === filter),
    }));
  }, [filter]);

  const activeCategory = displayed[Math.max(0, pageIndex)];

  const openCover = useCallback(() => {
    setDirection(1);
    setPageIndex(0);
  }, []);

  const goNext = useCallback(() => {
    setDirection(1);
    setPageIndex((p) => (p < 0 ? 0 : Math.min(total - 1, p + 1)));
  }, [total]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setPageIndex((p) => Math.max(-1, p - 1));
  }, []);

  const jumpTo = useCallback(
    (idx) => {
      setDirection(idx > pageIndex ? 1 : -1);
      setPageIndex(idx);
      setNavOpen(false);
    },
    [pageIndex]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (selectedDish || searchOpen || navOpen) return;
      if (e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "/") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev, selectedDish, searchOpen, navOpen]);

  return (
    <div className="relative z-10 flex h-[100dvh] w-full flex-col items-center px-1 sm:px-6 pt-2 pb-2 sm:pt-4 sm:pb-4 overflow-hidden">
      <TopBar
        onSearch={() => setSearchOpen(true)}
        onNav={() => setNavOpen(true)}
      />

      <div
        className="relative flex w-full flex-1 items-center justify-center book-scene select-none mt-2"
        data-testid="menu-book"
      >
        <div
          aria-hidden="true"
          className="absolute -bottom-3 left-1/2 h-6 w-[72%] -translate-x-1/2 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(60,42,20,0.30), rgba(60,42,20,0) 70%)",
            filter: "blur(12px)",
          }}
        />

        {/* Maximize height with h-full and remove limiting max-heights */}
        <div className="relative w-full h-full max-w-[420px] md:max-w-[520px] shadow-book rounded-[8px] overflow-hidden bg-ivory-light">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            {isCoverClosed ? (
              <motion.div
                key="cover"
                className="absolute inset-0"
                initial={{ opacity: 1 }}
                exit={{ rotateY: -160, opacity: 0.85, x: "-20%" }}
                transition={{ duration: 0.7, ease: [0.16, 0.7, 0.2, 1] }}
                style={{ transformOrigin: "left center" }}
              >
                <BookCover onOpen={openCover} />
              </motion.div>
            ) : (
              <SwipePage
                key={pageIndex}
                pageIndex={pageIndex}
                total={total}
                direction={direction}
                onNext={goNext}
                onPrev={goPrev}
              >
                <MenuPage
                  category={activeCategory}
                  pageNumber={pageIndex + 1}
                  totalPages={total}
                  onSelect={setSelectedDish}
                  onNext={goNext}
                  onPrev={goPrev}
                />
              </SwipePage>
            )}
          </AnimatePresence>
        </div>
      </div>

      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onPick={(d) => {
          setSearchOpen(false);
          const idx = CATEGORIES.findIndex((c) => c.id === d.categoryId);
          if (idx >= 0) {
            setDirection(idx > pageIndex ? 1 : -1);
            setPageIndex(idx);
          }
          setTimeout(() => setSelectedDish(d), 380);
        }}
      />
      <CategoryNav
        open={navOpen}
        currentIndex={Math.max(0, pageIndex)}
        onClose={() => setNavOpen(false)}
        onPick={jumpTo}
        filter={filter}
        onFilterChange={setFilter}
        onSearch={() => setSearchOpen(true)}
      />
      <FoodDetailModal dish={selectedDish} onClose={() => setSelectedDish(null)} />
    </div>
  );
};

const TopBar = ({ onSearch, onNav }) => (
  <div className="flex w-full max-w-[520px] items-center justify-between gap-3 pt-1 px-2">
    <div className="w-12">
      <span className="font-serif text-[13px] tracking-luxe uppercase text-ink-soft">
        Empire
      </span>
    </div>

    <button
      onClick={onNav}
      className="flex-1 flex justify-center items-center group outline-none"
      aria-label="Open Menu Navigation"
    >
      <span className="font-serif text-xl sm:text-2xl tracking-[0.2em] text-ink transition-colors group-hover:text-gold-deep">
        MENU
      </span>
    </button>

    <div className="flex items-center justify-end w-12">
      <button
        data-testid="search-open-btn"
        onClick={onSearch}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-paperborder bg-ivory-light/70 text-ink-soft transition hover:bg-ivory-light hover:text-ink"
        aria-label="Open search"
      >
        <Search size={14} />
      </button>
    </div>
  </div>
);

const SwipePage = ({ children, pageIndex, total, direction, onNext, onPrev }) => {
  return (
    <motion.div
      className="absolute inset-0 bg-ivory-light"
      custom={direction}
      variants={pageVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={pageTransition}
      drag="x"
      dragElastic={0.8} // High elastic so it feels like sliding a heavy card
      dragMomentum={false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(_, info) => {
        const c = swipeConfidence(info.offset.x, info.velocity.x);
        if (c < -SWIPE_THRESHOLD && pageIndex < total - 1) onNext();
        else if (c > SWIPE_THRESHOLD && pageIndex > 0) onPrev();
      }}
      data-testid={`swipe-page-${pageIndex}`}
    >
      {children}
    </motion.div>
  );
};

export default MenuBook;

