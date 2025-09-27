// src/components/InfoSection.jsx
import React, { useRef, useEffect } from "react";
import {
  motion,
  useAnimation,
  useInView,
  useMotionValue,
  useViewportScroll,
  useTransform,
} from "framer-motion";

/**
 * InfoSection — scroll-activated but persistent
 * - Animates once when the section first enters the viewport
 * - Keeps the panel visible after that (no hiding on exit)
 * - Parallax & progress bar retained
 */

const PANEL_ANIM = {
  hidden: { opacity: 0, y: 18, scale: 0.996 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const HEADING_ANIM = {
  hidden: { opacity: 0, x: -14 },
  show: { opacity: 1, x: 0, transition: { duration: 0.48, ease: "easeOut" } },
};

const LINE_ANIM = {
  hidden: { opacity: 0, y: 14 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: "easeOut", delay: i * 0.08 },
  }),
};

const clamp = (n, a = 0, b = 1) => Math.max(a, Math.min(b, n));

export default function InfoSection({ className = "" }) {
  const features = [
    { title: "Learn by Doing", desc: "Practice in real coding environments." },
    { title: "Project First", desc: "Build meaningful, portfolio-ready projects." },
    { title: "Your Own Pace", desc: "Progress at a tempo that works for you." },
    { title: "Track Progress", desc: "See clear markers of growth over time." },
  ];

  const rootRef = useRef(null);

  // controls for Framer Motion
  const controls = useAnimation();

  // detect first time in view
  const isInView = useInView(rootRef, { margin: "-10% 0px -10% 0px", amount: 0.25 });
  const hasShown = useRef(false); // once true, we never hide again

  // parallax: small vertical offset for depth
  const { scrollY } = useViewportScroll();
  const parallax = useTransform(scrollY, [0, 800], [0, -18]);

  // progress (0..1) for the progress bar; we manage this manually using scroll
  const progress = useMotionValue(0);

  useEffect(() => {
    // Trigger the 'show' animation once when it first enters view.
    if (isInView && !hasShown.current) {
      hasShown.current = true;
      controls.start("show");
    }
    // NOTE: we intentionally do NOT call controls.start("hidden") on exit.
  }, [isInView, controls]);

  useEffect(() => {
    if (!rootRef.current) return;

    const update = () => {
      const el = rootRef.current;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      // Compute visibility: how much of the section is visible in the viewport.
      // Map visible portion to 0..1
      const visible = clamp((vh - rect.top) / (vh + rect.height), 0, 1);
      progress.set(visible);
    };

    // initial update & listener
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const ro = new ResizeObserver(update);
    ro.observe(rootRef.current);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      ro.disconnect();
    };
  }, [progress]);

  return (
    <motion.section
      ref={rootRef}
      style={{ y: parallax }}
      initial="hidden"
      animate={controls}
      className={`w-full flex justify-center px-6 py-16 md:py-20 ${className}`}
      aria-labelledby="codify-info-heading"
    >
      <div className="w-full max-w-5xl">
        {/* Terminal-like chrome */}
        <div className="flex items-center justify-between bg-gray-800 border border-gray-700 rounded-t-lg px-4 py-3 select-none">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-red-500 rounded-full" />
            <span className="w-3 h-3 bg-yellow-500 rounded-full" />
            <span className="w-3 h-3 bg-green-500 rounded-full" />
          </div>
          <p className="text-sm text-gray-400 font-mono">about.codify</p>
        </div>

        {/* Main panel */}
        <motion.div variants={PANEL_ANIM} className="bg-black/65 backdrop-blur-sm border border-gray-800 rounded-b-lg px-12 py-12">
          {/* Header / Command */}
          <motion.div variants={HEADING_ANIM} className="mb-4 text-left">
            <p id="codify-info-heading" className="font-mono text-3xl md:text-4xl text-gray-100 font-semibold tracking-tight">
              ~/why-codify
            </p>
            <p className="mt-1 text-sm md:text-sm text-gray-400 font-mono">cat about.txt</p>
          </motion.div>

          {/* Feature list */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 mt-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                custom={i}
                variants={LINE_ANIM}
                initial="hidden"
                animate={controls}
                className="flex flex-col items-start"
                whileHover={{ translateY: -3 }}
              >
                <div className="flex items-baseline gap-3">
                  <span className="text-green-400 font-mono text-lg">›</span>
                  <span className="text-gray-100 font-mono font-semibold text-lg md:text-xl">{f.title}</span>
                </div>
                <p className="mt-2 text-base md:text-lg text-gray-300 leading-relaxed max-w-prose">{f.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* --- Progress track (subtle) --- */}
          <div className="mt-8 h-1 w-full bg-gray-900 rounded overflow-hidden">
            {/* fill uses motion and MotionValue `progress` mapped to scaleX */}
            <motion.div
              style={{ transformOrigin: "left center", scaleX: progress }}
              className="h-full bg-gradient-to-r from-green-600/80 to-cyan-400/70"
              aria-hidden="true"
            />
          </div>

          {/* Cursor */}
          <div className="mt-8">
            <span
              className="inline-block w-2.5 h-8 bg-green-400 rounded-sm"
              style={{ animation: "codify-blink 1s steps(2, start) infinite" }}
              aria-hidden="true"
            />
          </div>
        </motion.div>
      </div>

      {/* blink keyframes fallback */}
      <style>{`
        @keyframes codify-blink {
          0%, 50%, 100% { opacity: 1; transform: scaleY(1); }
          25%, 75% { opacity: 0; transform: scaleY(1.05); }
        }
      `}</style>
    </motion.section>
  );
}
