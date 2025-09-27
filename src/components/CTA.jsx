// src/components/CTA.jsx
import React from "react";
import { motion } from "framer-motion";

export default function CTA({ className = "" }) {
  return (
    <motion.section
      className={`w-full flex justify-center px-6 py-12 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="w-full max-w-4xl bg-black/70 backdrop-blur-sm border border-gray-800 rounded-lg px-8 py-10 text-center">
        {/* Terminal-style header */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="w-3 h-3 bg-red-500 rounded-full" />
          <span className="w-3 h-3 bg-yellow-500 rounded-full" />
          <span className="w-3 h-3 bg-green-500 rounded-full" />
          <p className="text-sm text-gray-400 font-mono ml-2">join.codify</p>
        </div>

        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-100 font-mono mb-4">
          Ready to start your journey?
        </h2>
        <p className="text-gray-300 font-mono mb-8">
          Sign in or create an account to unlock your full coding experience.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            className="px-6 py-3 bg-green-600 hover:bg-green-500 text-black font-semibold rounded-md transition transform hover:scale-105"
            onClick={() => alert("Sign In clicked")}
          >
            Sign In
          </button>
          <button
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-black font-semibold rounded-md transition transform hover:scale-105"
            onClick={() => alert("Sign Up clicked")}
          >
            Sign Up
          </button>
        </div>
      </div>
    </motion.section>
  );
}
