import React, { useState } from "react";
import { motion } from "framer-motion";

const TREES = [
  {
    id: "website",
    title: "Websites",
    desc: "Build responsive websites and landing pages. Start with HTML/CSS and layer in JS & React.",
    skills: ["HTML", "CSS", "JS", "React"],
  },
  {
    id: "game",
    title: "Games",
    desc: "Create browser games and interactive demos — learn loops, animations, and game logic.",
    skills: ["Canvas", "Game Loop", "Events", "Animations", "Physics"],
  },
  {
    id: "python",
    title: "Python",
    desc: "From scripting to small web apps. Learn core programming concepts and deploy simple services.",
    skills: ["Syntax", "Loops", "Functions", "Files", "Flask"],
  },
];

export default function SkillTreeShowcase({ className = "", onSelect = () => {} }) {
  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <div className={`w-full flex justify-center px-6 py-10 ${className}`}>
      <div className="w-full max-w-6xl">
        {/* terminal chrome header */}
        <div className="flex items-center justify-between bg-gray-800 border border-gray-700 rounded-t-lg px-4 py-3 select-none mb-6">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-red-500 rounded-full" />
            <span className="w-3 h-3 bg-yellow-500 rounded-full" />
            <span className="w-3 h-3 bg-green-500 rounded-full" />
          </div>
          <p className="text-sm text-gray-400 font-mono">examples.skilltrees</p>
        </div>

        {/* caption */}
        <p className="text-sm text-gray-400 font-mono mb-4 text-center">
          Click a card to see more info & start your path
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {TREES.map((t) => {
            const isSelected = selectedCard === t.id;

            return (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: isSelected ? 1.05 : selectedCard ? 0.92 : 1,
                  filter: selectedCard && !isSelected ? "brightness(0.6)" : "brightness(1)",
                }}
                whileHover={{
                  scale: isSelected ? 1.08 : selectedCard ? 0.94 : 1.03,
                  filter: selectedCard && !isSelected ? "brightness(0.7)" : "brightness(1.05)",
                }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative rounded-xl border border-gray-800 bg-gradient-to-b from-black/70 to-black/50 px-5 py-6 cursor-pointer shadow-lg"
                onClick={() => setSelectedCard(isSelected ? null : t.id)}
              >
                <h3 className="font-mono text-lg md:text-xl text-gray-100 font-semibold mb-1">{t.title}</h3>
                <p className="text-sm text-gray-300 mb-4 leading-relaxed">{t.desc}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {t.skills.map((s) => (
                    <span
                      key={s}
                      className="inline-flex items-center text-sm font-mono px-3 py-1 rounded-md border border-gray-800 bg-gray-900 text-gray-200"
                    >
                      <span className="mr-2 text-green-400">›</span>
                      {s}
                    </span>
                  ))}
                </div>

                {isSelected && (
                  <motion.div
                    layout
                    initial={{ opacity: 0, maxHeight: 0 }}
                    animate={{ opacity: 1, maxHeight: 400 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="mt-4 overflow-hidden border-t border-gray-700 pt-4"
                  >
                    {t.skills.map((s, idx) => (
                      <div key={idx} className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-200 font-mono">{s}</span>
                        <span className="text-xs text-gray-400 font-mono">est. 30m</span>
                      </div>
                    ))}

                    <button
                      onClick={() => onSelect(t.id)}
                      className="mt-4 w-full py-2 bg-green-600 hover:bg-green-500 text-black font-semibold rounded-md transition"
                    >
                      Start Path
                    </button>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
