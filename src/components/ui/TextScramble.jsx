import { useState, useEffect, useCallback } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#________";

const TextScramble = ({ text, delay = 0, duration = 1.5, autostart = true }) => {
  const [displayText, setDisplayText] = useState("");
  const [isScrambling, setIsScrambling] = useState(false);

  const scramble = useCallback(async () => {
    if (isScrambling) return;
    setIsScrambling(true);

    let iteration = 0;
    const maxIterations = text.length;
    
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      iteration += 1 / (duration * 10); // Adjust speed here

      if (iteration >= maxIterations) {
        setDisplayText(text);
        clearInterval(interval);
        setIsScrambling(false);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [text, duration, isScrambling]);

  useEffect(() => {
    if (autostart) {
      const timeout = setTimeout(scramble, delay * 1000);
      return () => clearTimeout(timeout);
    }
  }, [autostart, delay, scramble]);

  return (
    <span 
      className="inline-block font-mono" 
      onMouseEnter={() => !isScrambling && scramble()}
    >
      {displayText || text.replace(/./g, " ")}
    </span>
  );
};

export default TextScramble;
