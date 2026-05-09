/**
 * ScrollToTop.jsx
 * Fixed bottom-right button with a wave-water fill effect that rises from
 * the bottom proportionally to scroll progress. Clicking scrolls back to top.
 */

import { useState, useEffect, useRef } from "react";

const SIZE = 56; // button diameter px

const ScrollToTop = () => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const animRef = useRef(null);
  const waveOffsetRef = useRef(0);
  const canvasRef = useRef(null);
  const progressRef = useRef(0);

  /* ── Track scroll progress ── */
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const pct = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(pct);
      progressRef.current = pct;
      setVisible(scrollTop > 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Canvas wave animation ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const px = SIZE * dpr;
    canvas.width = px;
    canvas.height = px;
    ctx.scale(dpr, dpr);

    const draw = () => {
      ctx.clearRect(0, 0, SIZE, SIZE);

      const p = progressRef.current;
      // fillY: how high the water is (0% = bottom, 100% = full)
      const fillY = SIZE * (1 - p);
      const waveAmp = 3;            // wave height
      const waveFreq = 0.06;        // wave frequency
      waveOffsetRef.current += 0.04; // animate wave horizontally

      /* ── Clip to circle ── */
      ctx.save();
      ctx.beginPath();
      ctx.arc(SIZE / 2, SIZE / 2, SIZE / 2, 0, Math.PI * 2);
      ctx.clip();

      /* ── Draw water body ── */
      ctx.beginPath();
      // Wavy top edge
      ctx.moveTo(0, fillY);
      for (let x = 0; x <= SIZE; x++) {
        const y =
          fillY +
          Math.sin(x * waveFreq + waveOffsetRef.current) * waveAmp +
          Math.sin(x * waveFreq * 0.7 + waveOffsetRef.current * 1.3) * (waveAmp * 0.5);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(SIZE, SIZE);
      ctx.lineTo(0, SIZE);
      ctx.closePath();

      // White water fill
      ctx.fillStyle = "rgba(255,255,255,0.92)";
      ctx.fill();

      /* ── Subtle shimmer highlight ── */
      ctx.beginPath();
      for (let x = 0; x <= SIZE; x++) {
        const y =
          fillY +
          Math.sin(x * waveFreq + waveOffsetRef.current + 1.5) * waveAmp +
          Math.sin(x * waveFreq * 0.7 + waveOffsetRef.current * 1.3 + 1.0) * (waveAmp * 0.5);
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.lineTo(SIZE, SIZE);
      ctx.lineTo(0, SIZE);
      ctx.closePath();
      ctx.fillStyle = "rgba(255,255,255,0.15)";
      ctx.fill();

      ctx.restore();

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Scroll to top"
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        zIndex: 9000,
        width: `${SIZE}px`,
        height: `${SIZE}px`,
        borderRadius: "50%",
        padding: 0,
        border: "none",
        cursor: "pointer",
        overflow: "hidden",
        background: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(0.6)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
        pointerEvents: visible ? "auto" : "none",
        boxShadow: "0 0 0 2px var(--glass-border), 0 4px 24px rgba(0,0,0,0.2)",
      }}
    >
      {/* Dynamic base */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background: "var(--bg-color)",
          border: "1px solid var(--glass-border)",
        }}
      />

      {/* Wave canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          filter: "invert(var(--theme-invert, 0))", // We can use this to invert the white wave if needed
        }}
      />

      {/* Arrow — color flips based on fill level for readability */}
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        style={{
          position: "relative",
          zIndex: 1,
          stroke: "var(--text-primary)",
          mixBlendMode: "difference", // This makes it readable on any background
          transition: "stroke 0.3s ease",
        }}
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
};

export default ScrollToTop;
