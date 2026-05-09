import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      
      // Move small dot instantly
      gsap.to(cursor, {
        x: clientX,
        y: clientY,
        duration: 0.1,
      });

      // Move larger ring with a delay (smooth lag)
      gsap.to(follower, {
        x: clientX,
        y: clientY,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    const onMouseEnter = () => setIsHovering(true);
    const onMouseLeave = () => setIsHovering(false);

    window.addEventListener("mousemove", onMouseMove);

    // Attach listeners to all interactive elements
    const interactiveElements = document.querySelectorAll("button, a, input, textarea, [role='button']");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnter);
      el.addEventListener("mouseleave", onMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnter);
        el.removeEventListener("mouseleave", onMouseLeave);
      });
    };
  }, []);

  useEffect(() => {
    if (isHovering) {
      gsap.to(followerRef.current, {
        scale: 2.5,
        backgroundColor: "rgba(34, 197, 94, 0.1)", // Green-500 with low opacity
        borderColor: "rgba(34, 197, 94, 0.5)",
        duration: 0.3,
      });
      gsap.to(cursorRef.current, {
        scale: 0.5,
        backgroundColor: "#22c55e",
        duration: 0.3,
      });
    } else {
      gsap.to(followerRef.current, {
        scale: 1,
        backgroundColor: "transparent",
        borderColor: "rgba(255, 255, 255, 0.3)",
        duration: 0.3,
      });
      gsap.to(cursorRef.current, {
        scale: 1,
        backgroundColor: "#ffffff",
        duration: 0.3,
      });
    }
  }, [isHovering]);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ transform: "translate(-50%, -50%)" }}
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 border border-white/30 rounded-full pointer-events-none z-[9998] transition-colors"
        style={{ transform: "translate(-50%, -50%)" }}
      />
    </>
  );
};

export default CustomCursor;
