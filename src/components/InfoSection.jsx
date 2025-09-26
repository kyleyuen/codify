import React from "react";
import { motion } from "framer-motion";

export default function InfoSection({ className = "", onClose }) {
  const cardData = [
    {
      title: "Performance",
      desc: "Blazing fast interactive lessons and project tooling.",
    },
    {
      title: "Design",
      desc: "Minimal interface focused on clarity and flow.",
    },
    {
      title: "Build",
      desc: "Ship real projects with modern stacks and best practices.",
    },
  ];

  return (
    <section
      className={`mx-auto max-w-6xl px-6 py-20 text-white ${className}`}
      aria-labelledby="info-heading"
    >
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 id="info-heading" className="text-4xl font-semibold">
            Learn. Build. Ship.
          </h2>
          <p className="mt-2 text-gray-300 max-w-2xl">
            Codify helps you build meaningful projects with a minimal, focused
            experience designed for creators.
          </p>
        </div>

        <div>
          <button
            onClick={onClose}
            className="text-sm text-gray-300 bg-gray-800 px-3 py-2 rounded-md hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cardData.map((c, i) => (
          <motion.article
            key={c.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12, duration: 0.45 }}
            className="bg-gradient-to-br from-gray-800/60 to-black/40 backdrop-blur-md border border-gray-700 p-6 rounded-2xl"
          >
            <h3 className="text-xl font-medium mb-2">{c.title}</h3>
            <p className="text-gray-300">{c.desc}</p>
            <div className="mt-6">
              <button className="text-sm text-cyan-400 hover:underline">Learn more</button>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
