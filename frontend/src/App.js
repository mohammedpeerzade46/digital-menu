import React, { useState, useEffect } from "react";
import "@/App.css";
import Entrance from "@/components/Entrance";
import MenuBook from "@/components/MenuBook";

/**
 * Empire — Cinematic Digital Menu Experience
 * Stages:
 *   0. entrance  — cinematic 4-phase entry, then user taps "Open Menu"
 *   1. book      — full menu book with pages, filter, search, detail modal
 */
function App() {
  const [stage, setStage] = useState("entrance");

  // Preload key images once entrance renders so book feels instant
  useEffect(() => {
    if (stage === "entrance") {
      const imgs = [
        "https://images.unsplash.com/photo-1663530761401-15eefb544889?crop=entropy&cs=srgb&fm=jpg&w=1200",
      ];
      imgs.forEach((src) => {
        const i = new Image();
        i.src = src;
      });
    }
  }, [stage]);

  return (
    <div className="App relative min-h-[100dvh] w-full bg-[#181615]">
      {stage === "entrance" && <Entrance onOpen={() => setStage("book")} />}
      {stage === "book" && <MenuBook onBackHome={() => setStage("entrance")} />}
    </div>
  );
}

export default App;
