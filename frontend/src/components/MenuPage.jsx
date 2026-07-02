import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Drumstick, ChevronLeft, ChevronRight } from "lucide-react";
import { VegBadge, DishBadge, Ornament } from "./DishBits";

/**
 * MenuPage — a single category page.
 * Polished for premium feel, correct alignment, and elegant scrolling.
 */
const MenuPage = ({
  category,
  pageNumber,
  totalPages,
  onSelect,
  onNext,
  onPrev,
}) => {
  const isNarrative = category.id === "chefs-welcome";
  const singleItem = !isNarrative && (category.items || []).length === 1;
  const emptyAfterFilter = !isNarrative && !singleItem && (category.items || []).length === 0;

  return (
    <div
      data-testid={`menu-page-${category.id}`}
      className="menu-page relative h-full w-full overflow-hidden"
    >
      {/* Corner ornaments fixed to the page edges */}
      <span className="corner-orn tl z-20" style={{ top: "14px", left: "14px" }} />
      <span className="corner-orn tr z-20" style={{ top: "14px", right: "14px" }} />
      <span className="corner-orn bl z-20" style={{ bottom: "14px", left: "14px" }} />
      <span className="corner-orn br z-20" style={{ bottom: "14px", right: "14px" }} />

      {/* Swipe indicator */}
      {!isNarrative && (
        <div className="absolute top-4 left-0 right-0 flex justify-center z-20 pointer-events-none">
          <div className="flex items-center gap-2 opacity-30">
            <ChevronLeft size={10} className="animate-pulse" />
            <span className="font-sans text-[7px] uppercase tracking-[0.2em] text-ink">Swipe</span>
            <ChevronRight size={10} className="animate-pulse" />
          </div>
        </div>
      )}

      {/* Directional lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(120% 60% at 30% 0%, rgba(255,238,200,0.35), transparent 70%)",
        }}
      />

      <div className="relative z-10 flex h-full w-full flex-col elegant-scroll overflow-y-auto">
        {isNarrative ? (
          <ChefNarrative pageNumber={pageNumber} totalPages={totalPages} onNext={onNext} onPrev={onPrev} />
        ) : (
          <>
            <Header
              category={category}
            />

            {singleItem ? (
              <HeroDish dish={category.items[0]} onSelect={onSelect} />
            ) : emptyAfterFilter ? (
              <EmptyState />
            ) : (
              <DishList items={category.items} onSelect={onSelect} categoryId={category.id} />
            )}

            <PageFoot number={pageNumber} total={totalPages} onNext={onNext} onPrev={onPrev} />
          </>
        )}
      </div>
    </div>
  );
};

// ── Header ───────────────────────────────────────────────────────────
const Header = ({ category }) => (
  <header className="relative px-6 pt-12 pb-4 sm:px-8 sm:pt-14">
    <div className="flex flex-col items-center text-center w-full mt-2">
      <span className="font-sans text-[9px] sm:text-[10px] tracking-luxe uppercase text-ink-soft/80 mb-2">
        {category.kicker || "The Menu"}
      </span>
      <h2 className="font-serif text-[36px] sm:text-[44px] leading-[1.1] text-ink font-medium tracking-tight">
        {category.name}
      </h2>
      {category.intro && (
        <p className="mt-4 max-w-[32ch] mx-auto font-serif italic text-[15px] sm:text-[17px] text-ink-soft leading-[1.4]">
          {category.intro}
        </p>
      )}
      <Ornament className="mt-5 mb-2" />
    </div>
  </header>
);


// ── DishList ─────────────────────────────────────────────────────────
const DishList = ({ items, onSelect, categoryId }) => (
  <ul
    className="flex-1 px-6 sm:px-9 py-2 space-y-6"
    data-testid={`dish-list-${categoryId}`}
  >
    <AnimatePresence initial={false}>
      {items.map((d, i) => (
        <motion.li
          key={d.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ delay: 0.03 * i, duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <DishRow dish={d} onSelect={onSelect} />
        </motion.li>
      ))}
    </AnimatePresence>
  </ul>
);

const DishRow = ({ dish: d, onSelect }) => (
  <button
    data-testid={`dish-${d.id}`}
    onClick={() => onSelect(d)}
    className="group w-full text-left flex items-start gap-3 outline-none"
  >
    <div className="shrink-0 mt-2">
      <VegBadge type={d.type} />
    </div>
    <div className="flex-1 min-w-0 flex flex-col">
      <div className="flex items-end w-full">
        <span className="font-serif text-[19px] sm:text-[21px] leading-[1.2] text-ink transition-colors group-hover:text-gold-deep pr-2">
          {d.name}
        </span>
        <span aria-hidden="true" className="flex-1 dotted-leader text-ink-soft/30 h-[1em] min-w-[16px] relative -top-[5px]" />
        <span className="font-serif text-[18px] sm:text-[20px] text-ink whitespace-nowrap pl-2">
          ₹{d.price}
        </span>
      </div>
      {(d.badge || d.ingredients) && (
        <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 items-baseline">
          {d.badge && (
            <span className="font-sans text-[8.5px] tracking-luxe uppercase text-gold-deep">
              {d.badge}
            </span>
          )}
          {d.ingredients && (
            <span className="font-serif italic text-[13.5px] text-ink-soft/80 line-clamp-2">
              {d.ingredients.join(", ")}
            </span>
          )}
        </div>
      )}
    </div>
  </button>
);

// ── HeroDish (Today's Special) ───────────────────────────────────────
const HeroDish = ({ dish: d, onSelect }) => (
  <div className="flex flex-1 flex-col px-6 sm:px-8 py-2">
    <button
      data-testid={`dish-${d.id}`}
      onClick={() => onSelect(d)}
      className="group relative flex w-full flex-col overflow-hidden rounded-[6px] bg-ivory-light shadow-sm text-left outline-none transition-all hover:shadow-md border border-gold/10"
    >
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "1 / 1" }}>
        <img
          src={d.image}
          alt={d.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        {d.badge && (
          <span className="absolute left-4 top-4 rounded-full border border-gold/40 bg-black/50 px-2.5 py-1.5 font-sans text-[9px] tracking-luxe uppercase text-gold-soft backdrop-blur-md">
            {d.badge}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2.5 px-5 py-5 sm:px-6 sm:py-6">
        <div className="flex items-start gap-2.5">
          <div className="mt-1.5 shrink-0">
            <VegBadge type={d.type} />
          </div>
          <span className="font-serif text-[24px] leading-tight text-ink">
            {d.name}
          </span>
        </div>
        {d.story && (
          <p className="font-serif italic text-[15px] text-ink-soft leading-[1.4] pl-6">
            {d.story}
          </p>
        )}
        <div className="mt-3 flex items-baseline justify-between border-t border-gold/10 pt-3">
          <span className="font-sans text-[9.5px] tracking-luxe uppercase text-gold-deep">
            View details
          </span>
          <span className="font-serif text-[22px] text-ink">₹{d.price}</span>
        </div>
      </div>
    </button>
  </div>
);

// ── EmptyState ───────────────────────────────────────────────────────
const EmptyState = () => (
  <div className="flex flex-1 flex-col items-center justify-center px-8 py-16 text-center">
    <span className="font-serif italic text-[22px] text-ink-soft leading-snug">
      No selections available
      <br />
      in this category.
    </span>
    <Ornament className="mt-6 opacity-60" />
    <span className="mt-6 font-sans text-[9px] tracking-luxe uppercase text-ink-soft/60">
      Try changing your filter
    </span>
  </div>
);

// ── Chef narrative ───────────────────────────────────────────────────
const ChefNarrative = ({ pageNumber, totalPages, onNext, onPrev }) => (
  <div className="flex h-full flex-col px-8 sm:px-10 pt-14 pb-8">
    <div className="flex items-center justify-between">
      <span className="font-sans text-[10px] tracking-luxe uppercase text-ink-soft">
        A Note From the Kitchen
      </span>
    </div>

    <h2 className="mt-8 font-serif text-[42px] sm:text-[48px] leading-[1.05] text-ink font-medium tracking-tight">
      Chef&rsquo;s
      <br />
      Welcome
    </h2>
    <Ornament className="mt-6" align="start" />

    <p className="mt-8 max-w-[32ch] font-serif italic text-[21px] sm:text-[23px] leading-[1.45] text-ink-soft">
      &ldquo;Cooking, for us, is a slow act of attention. We look at what the
      season brings, listen to what it wants to be, and step back.&rdquo;
    </p>

    <p className="mt-6 max-w-[34ch] font-serif text-[16px] sm:text-[17px] leading-relaxed text-ink/90">
      Every plate has been composed with restraint — few ingredients, quiet
      technique, and an insistence on quality. We hope you
      find, in this book, something that tastes like a small, well-kept secret.
    </p>

    <div className="mt-auto pt-10 flex flex-col items-start pb-4">
      <span
        className="font-serif italic text-[28px] text-ink leading-none opacity-90"
        style={{ transform: "rotate(-2deg)" }}
      >
        — Arjun Malhotra
      </span>
      <span className="mt-3 font-sans text-[9px] tracking-luxe uppercase text-ink-soft/80">
        Executive Chef · Empire
      </span>
    </div>
    
    {/* PageFolio for narrative page moved to the bottom like other pages */}
    <div className="absolute bottom-6 left-6 right-6 sm:left-8 sm:right-8 flex items-center justify-between">
      <button onClick={onPrev} disabled={pageNumber <= 1} className="flex items-center justify-start w-12 text-ink-soft/60 hover:text-ink disabled:opacity-0 transition-colors outline-none">
        <ChevronLeft size={13} strokeWidth={1.5} />
      </button>
      <PageFolio number={pageNumber} total={totalPages} />
      <button onClick={onNext} disabled={pageNumber >= totalPages} className="flex items-center justify-end w-12 text-ink-soft/60 hover:text-ink disabled:opacity-0 transition-colors outline-none">
        <ChevronRight size={13} strokeWidth={1.5} />
      </button>
    </div>
  </div>
);

// ── PageFoot & PageFolio ─────────────────────────────────────────────
const PageFoot = ({ number, total, onNext, onPrev }) => (
  <footer className="mt-auto px-6 sm:px-8 pb-6 pt-8 shrink-0">
    <div className="flex items-center justify-between border-t border-gold/15 pt-4">
      <button onClick={onPrev} disabled={number <= 1} className="flex items-center justify-start w-12 text-ink-soft/60 hover:text-ink disabled:opacity-0 transition-colors outline-none" aria-label="Previous Page">
        <ChevronLeft size={14} strokeWidth={1.5} />
      </button>
      
      <PageFolio number={number} total={total} />
      
      <button onClick={onNext} disabled={number >= total} className="flex items-center justify-end w-12 text-ink-soft/60 hover:text-ink disabled:opacity-0 transition-colors outline-none" aria-label="Next Page">
        <ChevronRight size={14} strokeWidth={1.5} />
      </button>
    </div>
  </footer>
);

const PageFolio = ({ number, total }) => (
  <div className="flex items-center gap-2.5 font-serif text-[14px] text-ink-soft/80">
    <span className="h-px w-8 gold-hairline opacity-60" />
    <span className="tracking-widest">{toRoman(number).toLowerCase()}</span>
    <span className="text-ink-soft/40 text-[10px]">♦</span>
    <span className="tracking-widest">{toRoman(total).toLowerCase()}</span>
  </div>
);

const toRoman = (n) => {
  const map = [
    [10, "x"],
    [9, "ix"],
    [5, "v"],
    [4, "iv"],
    [1, "i"],
  ];
  let out = "";
  let v = n;
  for (const [k, s] of map) {
    while (v >= k) {
      out += s;
      v -= k;
    }
  }
  return out.toUpperCase();
};

export default MenuPage;
