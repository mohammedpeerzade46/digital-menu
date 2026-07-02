import React from "react";
import { Leaf, Drumstick, Flame, Clock3, Award, Star } from "lucide-react";

/** Small typographic accent bits reused across menu pages */

export const VegBadge = ({ type, className = "" }) => {
  const isVeg = type === "veg";
  const color = isVeg ? "#4A7C3A" : "#8A2A20";
  return (
    <span
      className={`inline-flex h-4 w-4 items-center justify-center rounded-[2px] border ${className}`}
      style={{ borderColor: color }}
      aria-label={isVeg ? "Vegetarian" : "Non-vegetarian"}
      data-testid={`veg-badge-${type}`}
    >
      <span
        className="h-2 w-2 rounded-full"
        style={{ background: color }}
      />
    </span>
  );
};

export const TypePill = ({ type }) => {
  const isVeg = type === "veg";
  const Icon = isVeg ? Leaf : Drumstick;
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border border-paperborder bg-ivory-light px-2.5 py-1 text-[10px] tracking-luxe uppercase text-ink-soft"
      data-testid={`type-pill-${type}`}
    >
      <Icon size={11} className={isVeg ? "text-[#4A7C3A]" : "text-[#8A2A20]"} />
      {isVeg ? "Veg" : "Non-Veg"}
    </span>
  );
};

export const SpiceLevel = ({ level = 0 }) => {
  const total = 3;
  return (
    <span
      className="inline-flex items-center gap-1 text-[10px] tracking-luxe uppercase text-ink-soft"
      aria-label={`Spice level ${level} out of ${total}`}
      data-testid="spice-level"
    >
      {new Array(total).fill(0).map((_, i) => (
        <Flame
          key={i}
          size={11}
          className={i < level ? "text-[#B85C25]" : "text-paperborder"}
          fill={i < level ? "#B85C25" : "none"}
        />
      ))}
      {level === 0 && <span className="ml-1">Mild</span>}
    </span>
  );
};

export const PrepTime = ({ minutes }) => (
  <span
    className="inline-flex items-center gap-1.5 text-[10px] tracking-luxe uppercase text-ink-soft"
    data-testid="prep-time"
  >
    <Clock3 size={11} className="text-ink-soft" />
    {minutes} min
  </span>
);

export const DishBadge = ({ label }) => {
  const isSignature = /signature/i.test(label);
  const Icon = isSignature ? Award : Star;
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border border-gold/50 bg-gold/10 px-2.5 py-1 text-[10px] tracking-luxe uppercase text-gold-deep"
      data-testid="dish-badge"
    >
      <Icon size={11} />
      {label}
    </span>
  );
};

export const Ornament = ({ className = "", align = "center" }) => (
  <div
    className={`flex items-center gap-3 text-gold-deep/70 ${
      align === "start" ? "justify-start" : align === "end" ? "justify-end" : "justify-center"
    } ${className}`}
    aria-hidden="true"
  >
    <span className="h-px w-10 gold-hairline" />
    <span className="font-serif text-lg leading-none">◈</span>
    <span className="h-px w-10 gold-hairline" />
  </div>
);
