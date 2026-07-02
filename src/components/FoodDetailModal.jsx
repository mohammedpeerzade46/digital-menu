import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { TypePill, SpiceLevel, PrepTime, DishBadge, Ornament } from "./DishBits";

/**
 * FoodDetailModal — luxurious floating card with soft zoom + fade + spring.
 * The menu behind fades/blurs (parent applies blur).
 */
const FoodDetailModal = ({ dish, onClose }) => {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = dish ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [dish, onClose]);

  return (
    <AnimatePresence>
      {dish && (
        <motion.div
          key="modal-root"
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:px-8"
          data-testid="dish-detail-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: "rgba(42, 38, 36, 0.55)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
            data-testid="modal-backdrop"
          />

          {/* Card */}
          <motion.article
            className="relative z-10 flex w-full max-w-2xl flex-col overflow-hidden rounded-[10px] bg-ivory-light shadow-card-lux max-h-[92vh]"
            initial={{ opacity: 0, y: 30, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 180, damping: 22, mass: 0.9 }}
          >
            {/* Close */}
            <button
              data-testid="modal-close-btn"
              onClick={onClose}
              aria-label="Close details"
              className="absolute right-4 top-4 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-ivory/90 text-ink shadow-md transition hover:bg-ivory"
            >
              <X size={16} />
            </button>

            {/* Hero image */}
            <div className="relative w-full aspect-[16/10] overflow-hidden bg-sand">
              <motion.img
                src={dish.image}
                alt={dish.name}
                loading="eager"
                initial={{ scale: 1.08, opacity: 0.4 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.4, ease: [0.16, 0.7, 0.2, 1] }}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              {dish.badge && (
                <div className="absolute bottom-4 left-4">
                  <DishBadge label={dish.badge} />
                </div>
              )}
            </div>

            {/* Body */}
            <div className="relative flex-1 overflow-y-auto elegant-scroll">
              <div className="px-6 py-6 sm:px-8 sm:py-8">
                <div className="flex flex-wrap items-center gap-2">
                  <TypePill type={dish.type} />
                  <SpiceLevel level={dish.spice || 0} />
                  <PrepTime minutes={dish.prep || 12} />
                </div>

                <h3 className="mt-4 font-serif text-3xl sm:text-4xl leading-tight text-ink font-medium">
                  {dish.name}
                </h3>

                {dish.story && (
                  <p className="mt-2 font-serif italic text-lg text-ink-soft leading-snug">
                    {dish.story}
                  </p>
                )}

                <Ornament className="mt-6" />

                <p className="mt-6 font-sans text-[15px] leading-relaxed text-ink">
                  {dish.description}
                </p>

                {dish.ingredients && dish.ingredients.length > 0 && (
                  <div className="mt-6">
                    <span className="font-sans text-[10px] tracking-luxe uppercase text-ink-soft">
                      Ingredients
                    </span>
                    <ul className="mt-3 flex flex-wrap gap-2" data-testid="modal-ingredients">
                      {dish.ingredients.map((ing) => (
                        <li
                          key={ing}
                          className="rounded-full border border-paperborder bg-ivory px-3 py-1 font-sans text-[11px] text-ink-soft"
                        >
                          {ing}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-8 flex items-baseline justify-between border-t border-paperborder pt-6">
                  <span className="font-sans text-[10px] tracking-luxe uppercase text-ink-soft">
                    Price
                  </span>
                  <span className="font-serif text-3xl text-ink" data-testid="modal-price">
                    ₹{dish.price}
                  </span>
                </div>
              </div>
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FoodDetailModal;
