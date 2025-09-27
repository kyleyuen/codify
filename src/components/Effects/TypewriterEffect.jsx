// src/components/TypewriterEffect.jsx
import React, { useState, useEffect } from "react";

const TypewriterEffect = ({ words, typingSpeed, deletingSpeed, pauseDuration, cursorColor, textColor, font }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (index === words.length) return;
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (deleting ? -1 : 1));
      if (!deleting && subIndex === words[index].word.length) {
        setTimeout(() => setDeleting(true), pauseDuration);
      } else if (deleting && subIndex === 0) {
        setDeleting(false);
        setIndex((prev) => (prev + 1) % words.length);
      }
    }, deleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index]);

  return (
    <h1 style={{ color: textColor, fontSize: font.fontSize, fontWeight: font.variant }}>
      {words[index].word.substring(0, subIndex)}
      <span style={{ color: cursorColor }}>|</span>
    </h1>
  );
};

export default TypewriterEffect;
