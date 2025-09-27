// src/components/ParallaxEffect.jsx
import { useEffect, useMemo, useRef } from "react";
import "../../styles/parallaxeffect.css";

const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
const rand = (a, b) => Math.random() * (b - a) + a;

// Random pool of programming glyphs/symbols/snippets
const GLYPH_POOL = [
  // JS/TS
  "=>", "{}", "[]", "()", "null", "undefined", "??", "?.", "import", "export",
  "async", "await", "class", "new", "return", "yield", "try", "catch", "finally",
  "Promise", "map()", "filter()", "reduce()", "for (..)", "let", "const", "var",
  // Python
  "def", "lambda", "yield", "async def", "await", "with", "None", "self", "len()",
  // C / C++
  "*ptr", "&ref", "->", "::", "template<>", "std::", "nullptr", "#include",
  // Java / Kotlin
  "@Override", "extends", "implements", "interface", "static", "final",
  "public", "private", "protected", "new", "data class",
  // Rust / Go / Swift
  "fn()", "let mut", "match {}", "trait", "impl", "unsafe", "go func", "defer",
  "guard let", "struct", "enum",
  // SQL
  "SELECT *", "JOIN", "WHERE", "GROUP BY", "ORDER BY", "LIMIT",
  // HTML / CSS
  "<div>", "</>", "<img/>", "<section>", ":root", "--var", "@media", "display:flex",
  "grid", "align-items", "justify-content",
  // Shell / misc
  "$ npm run dev", "git commit -m", "curl", "chmod +x", "printf()", "regex /\\w+/",
  "≈", "∑", "::=", "/* */"
];

const pickGlyph = () => GLYPH_POOL[Math.floor(Math.random() * GLYPH_POOL.length)];

export default function ParallaxEffect({
  starCount = 450,
  glyphCount = 28,   
  blobCount = 10,   
}) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const rafRef = useRef(0);
  const lastScrollRef = useRef(-1);

  // Prebuild glyphs and blobs
  const glyphs = useMemo(
    () =>
      Array.from({ length: glyphCount }, () => ({
        char: pickGlyph(),
        depth: rand(0.2, 0.95),   
        xVW: rand(6, 94),         
        yVH: rand(-40, 160),      
        rot: rand(-15, 15),
        sizePx: rand(16, 48),
        hue: rand(190, 260),      // cyan to purple color
        driftXPerK: rand(-8, 8),
      })),
    [glyphCount]
  );

  const blobs = useMemo(
    () =>
      Array.from({ length: blobCount }, () => ({
        depth: rand(0.08, 0.5),
        xVW: rand(0, 100),
        yVH: rand(0, 100),
        sizeVH: rand(60, 110),    // BIG
        hue: rand(185, 265),
        sat: rand(60, 85),
        alpha: rand(0.18, 0.32),  // subtle
        blurPx: rand(40, 90),
      })),
    [blobCount]
  );

  // The starry BG, + parallax
  useEffect(() => {
    const c = canvasRef.current;
    const ctx = c.getContext("2d", { alpha: true });
    const dpr = window.devicePixelRatio || 1;

    let needsRedraw = true;
    let lastY = NaN;

    const resize = () => {
      const host = wrapRef.current ?? document.documentElement;
      const { clientWidth: w, clientHeight: h } = host;
      c.width = Math.round(w * dpr);
      c.height = Math.round(h * dpr);
      c.style.width = `${w}px`;
      c.style.height = `${h}px`;

      starsRef.current = Array.from({ length: starCount }, () => ({
        x: Math.random() * c.width,
        y: Math.random() * c.height,
        r: (Math.random() * 1.2 + 0.6) * dpr,
        depth: rand(0.08, 0.5),
        alpha: rand(0.2, 0.9),
      }));
      needsRedraw = true;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrapRef.current ?? document.documentElement);

    const draw = () => {
      const y = window.scrollY;

      if (!needsRedraw && y === lastY) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }
      lastY = y;
      needsRedraw = false;

      const h = c.height;
      ctx.clearRect(0, 0, c.width, h);
      for (const s of starsRef.current) {
        // subtle parallax
        let yy = s.y + y * (1 - s.depth) * 0.4;

        // tile stars vertically to fix scroll issues I encountered
        const TILE = h + 400; 
        for (const off of [-TILE, 0, TILE]) {
          const yk = yy + off;
          if (yk < -100 || yk > h + 100) continue;
          ctx.globalAlpha = s.alpha;
          ctx.beginPath();
          ctx.arc(s.x, yk, s.r, 0, Math.PI * 2);
          ctx.fillStyle = "white";
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [starCount]);

  // added more blobs from og bg and glyphs: immediate paint; blobs are tiled
  useEffect(() => {
    let needsRedraw = true;
    const onResize = () => { needsRedraw = true; };
    window.addEventListener("resize", onResize);

    const tick = () => {
      const y = window.scrollY;
      if (!needsRedraw && y === lastScrollRef.current) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      lastScrollRef.current = y;
      needsRedraw = false;

      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // more blobs tiled 3x vertically so they always flow from edges
      const B_TILE = vh + 800; // bigger tile = slower repeat (less obvious)
      blobs.forEach((b, i) => {
        const baseX = (b.xVW / 100) * vw;
        const baseY = (b.yVH / 100) * vh + y * (1 - b.depth) * 0.35;

        [-1, 0, 1].forEach((k) => {
          const el = document.getElementById(`blob-${i}-${k + 1}`);
          if (!el) return;
          const yy = Math.round(baseY + k * B_TILE);
          el.style.transform = `translate3d(${Math.round(baseX)}px, ${yy}px, 0)`;
          el.style.filter = `blur(${b.blurPx}px)`;
          el.style.background = `radial-gradient(circle at 30% 30%, hsla(${b.hue}, ${Math.round(
            b.sat
          )}%, 60%, ${b.alpha}), hsla(${b.hue + 30}, 70%, 45%, 0))`;
          el.style.width = el.style.height = `${b.sizeVH}vh`;
          el.style.opacity = clamp(0.20 + b.depth * 0.55, 0.18, 0.82);
        });
      });

      //  code symbols
      const G_BUFFER = 200;
      const minY = -G_BUFFER;
      const maxY = vh + G_BUFFER;

      glyphs.forEach((g, i) => {
        const el = document.getElementById(`glyph-${i}`);
        if (!el) return;

        const baseX = (g.xVW / 100) * vw;
        const baseY = (g.yVH / 100) * vh;
        const parallaxY = y * (1 - g.depth);
        const driftX = (y / 1000) * g.driftXPerK;

        let yy = baseY + parallaxY;

        // smooth wrap both ways without changing X (prevents bunching from prev version I had)
        while (yy < minY) yy += (maxY - minY);
        while (yy >= maxY) yy -= (maxY - minY);

        const xx = Math.round(baseX + driftX);
        el.style.transform = `translate3d(${xx}px, ${Math.round(yy)}px, 0) rotate(${g.rot}deg)`;
        el.style.fontSize = `${g.sizePx}px`;
        el.style.color = `hsl(${g.hue}, 85%, ${40 + g.depth * 30}%)`;
        el.style.opacity = clamp(0.32 + g.depth * 0.5, 0.35, 0.95);
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, [blobs, glyphs]);

  return (
    <div ref={wrapRef} className="fx-wrap" aria-hidden="true">
      {/* First layer (stars) */}
      <canvas ref={canvasRef} className="fx-stars" />

      {/* Second layer of glowing blobs (rendered 3x for smoother vertical tiling) */}
      <div className="fx-blobs">
        {blobs.map((_, i) =>
          [-1, 0, 1].map((k) => (
            <div key={`${i}-${k}`} id={`blob-${i}-${k + 1}`} className="fx-blob" />
          ))
        )}
      </div>

      {/* Third layer is code glyphs */}
      <div className="fx-glyphs">
        {glyphs.map((g, i) => (
          <div key={i} id={`glyph-${i}`} className="fx-glyph">
            {g.char}
          </div>
        ))}
      </div>
    </div>
  );
}
