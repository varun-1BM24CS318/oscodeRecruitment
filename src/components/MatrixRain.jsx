/**
 * MatrixRain.jsx
 * A high-performance, responsive full-screen canvas digital rain effect.
 * Fades in/out elegantly and overlays the page backgrounds with falling hacker letters.
 */

import { useEffect, useRef } from "react";

const MatrixRain = ({ isActive }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // Set full screen canvas sizing
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Matrix characters (katakana, digits, alphabet)
    const chars = "ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const charArray = chars.split("");

    const fontSize = 15;
    const columns = Math.floor(canvas.width / fontSize) + 1;

    // Track vertical drop position of each column
    const drops = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = Math.floor(Math.random() * -100); // Stagger entry
    }

    const draw = () => {
      // Clear slightly with opacity to create trail/fade effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0f0"; // Bright green rain
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Pick random character
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        
        // Randomize brightness for organic glow depth
        const randomGlow = Math.random();
        if (randomGlow > 0.95) {
          ctx.fillStyle = "#fff"; // Glowing lead raindrop
        } else if (randomGlow > 0.8) {
          ctx.fillStyle = "#39ff14"; // Matrix neon green
        } else {
          ctx.fillStyle = "#008f11"; // Deep code green
        }

        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        // Reset drop back to top once it hits bottom of screen randomly
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none transition-opacity duration-1000"
      style={{
        zIndex: 40,
        opacity: isActive ? 0.35 : 0,
      }}
    />
  );
};

export default MatrixRain;
