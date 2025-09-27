import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TypewriterEffect from "../components/Effects/TypewriterEffect.jsx";
import ParallaxEffect from "../components/Effects/ParallaxEffect.jsx";
import InfoSection from "../components/Homepage/InfoSection.jsx";
import SkillTreeShowcase from "../components/Homepage/SkillTreeShowcase.jsx";
import CTA from "../components/Homepage/CTA.jsx";

export default function Home() {
  const [isRunning, setIsRunning] = useState(false);
  const [terminalText, setTerminalText] = useState("");
  const [showInfo, setShowInfo] = useState(false);

  // Simulate terminal typing
  useEffect(() => {
    if (isRunning) {
      const text = "Starting Codify...";
      let index = 0;

      const interval = setInterval(() => {
        setTerminalText(text.slice(0, index + 1));
        index++;

        if (index >= text.length) {
          clearInterval(interval);
          setTimeout(() => setShowInfo(true), 500);
        }
      }, 60);

      return () => clearInterval(interval);
    } else {
      setTerminalText("");
      setShowInfo(false);
    }
  }, [isRunning]);

  // Quick start handler (kept for future wiring)
  const handleQuickStart = () => {
    alert("Quick Start clicked — replace handleQuickStart with your onboarding flow.");
  };

  return (
    <div className="relative min-h-screen">
      {/* Gradient BG */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />

      {/* Parallax effect above already existent gradient */}
      <div className="absolute inset-0 z-10">
        <ParallaxEffect starCount={450} glyphCount={15} blobCount={5} />
      </div>

      {/* Content above both */}
      <div className="relative z-20 flex flex-col items-center justify-start px-4 py-12">
        {/* Fake code editor window */}
        <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-xl w-full max-w-5xl mb-24">
          {/* Fake editor header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700 rounded-t-lg">
            {/* Left: traffic lights + filename */}
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-red-500 rounded-full"></span>
              <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <p className="ml-4 text-sm text-gray-400 font-mono">App.jsx</p>
            </div>

            {/* Right: Login / Signup */}
            <div className="flex items-center space-x-4">
              <button
                className="bg-black text-green-400 font-mono px-3 py-1 rounded-md shadow hover:bg-gray-900 hover:shadow-lg transition transform hover:scale-105"
                onClick={() => alert("Login clicked")}
              >
                ~/login
              </button>
              <button
                className="bg-black text-blue-400 font-mono px-3 py-1 rounded-md shadow hover:bg-gray-900 hover:shadow-lg transition transform hover:scale-105"
                onClick={() => alert("Signup clicked")}
              >
                ~/signup
              </button>
            </div>
          </div>

          {/* Main content */}
          <div className="p-12 flex flex-col items-center space-y-12">
            {/* Title */}
            <motion.h1
              className="relative text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              Codify
            </motion.h1>

            {/* Typewriter Effect */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
            >
              <TypewriterEffect
                words={[
                  { word: "Learn by doing" },
                  { word: "Build Your Own Projects" },
                  { word: "Create at your own pace" },
                ]}
                typingSpeed={50}
                deletingSpeed={40}
                pauseDuration={200}
                cursorColor="#10B981"
                cursorWidth={2}
                cursorHeight={100}
                textColor="#F9FAFB"
                font={{ fontSize: "32px", variant: "Bold" }}
              />
            </motion.div>

            {/* Terminal-style CTA */}
            <motion.div
              className="bg-black text-green-400 font-mono px-8 py-5 rounded-lg shadow-lg w-full max-w-md text-left text-xl cursor-pointer transition-transform"
              onClick={() => setIsRunning(true)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.03, boxShadow: "0px 0px 20px #10B981" }}
              transition={{ duration: 0.3 }}
            >
              {isRunning ? (
                <span>
                  <span className="text-cyan-400">~/codify$</span> {terminalText}
                  <span className="inline-block w-1 h-6 bg-green-400 ml-1 animate-blink" />
                </span>
              ) : (
                <span>
                  <span className="text-cyan-400">~/codify$</span> npm start
                </span>
              )}
            </motion.div>
          </div>
        </div>

        <AnimatePresence>
          {showInfo && (
            <motion.div
              key="more-info"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full space-y-8"
            >
              <InfoSection />

              {/* SkillTreeShowcase appears directly under the InfoSection */}
              <motion.div
                key="skilltrees"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 18 }}
                transition={{ duration: 0.45, ease: "easeOut", delay: 0.08 }}
              >
                <SkillTreeShowcase />
              </motion.div>

              {/* CTA Section */}
              <motion.div
                key="cta"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }} // stops pulsing
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
              >
                <CTA />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Blink animation */}
        <style>{`
          @keyframes blink {
            0%, 50%, 100% { opacity: 1; transform: scale(1); }
            25%, 75% { opacity: 0; transform: scale(1.2); }
          }
          .animate-blink {
            animation: blink 1s infinite;
          }
        `}</style>
      </div>
    </div>
  );
}
