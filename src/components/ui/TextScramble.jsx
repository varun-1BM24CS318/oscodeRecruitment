import { useState, useEffect } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#________";

const TextScramble = ({ text, delay = 0, duration = 0.5, autostart = true }) => {
  const [displayText, setDisplayText] = useState("");
  const [isScrambling, setIsScrambling] = useState(false);

  useEffect(() => {
    if (!autostart) return;

    let isMounted = true;
    let interval;
    let timeout;

    timeout = setTimeout(() => {
      if (!isMounted) return;
      setIsScrambling(true);

      let iteration = 0;
      const maxIterations = text.length;

      interval = setInterval(() => {
        if (!isMounted) return;

        setDisplayText(
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

        iteration += 1 / (duration * 10);

        if (iteration >= maxIterations) {
          setDisplayText(text);
          setIsScrambling(false);
          clearInterval(interval);
        }
      }, 20);
    }, delay * 1000);

    return () => {
      isMounted = false;
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, delay, duration, autostart]);

  const handleMouseEnter = () => {
    if (isScrambling) return;
    setIsScrambling(true);

    let iteration = 0;
    const maxIterations = text.length;

    const interval = setInterval(() => {
      setDisplayText(
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

      iteration += 1 / (duration * 10);

      if (iteration >= maxIterations) {
        setDisplayText(text);
        setIsScrambling(false);
        clearInterval(interval);
      }
    }, 20);
  };

  return (
    <span 
      className="inline-block font-mono" 
      onMouseEnter={handleMouseEnter}
    >
      {displayText || text}
    </span>
  );
};

export default TextScramble;
