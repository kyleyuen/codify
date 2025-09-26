import React from "react";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.06,
    },
  },
};

const card = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function InfoSection({ className = "", onClose }) {
  return (
    <div className = "flex flex-col items-center justify-start px-4 py-12">
        <h1 className = "text-white">TEST</h1>
    </div>
  );
}
