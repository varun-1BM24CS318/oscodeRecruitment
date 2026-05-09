import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const Magnetic = ({ children, strength = 0.5 }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = el.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const deltaX = clientX - centerX;
      const deltaY = clientY - centerY;

      // Move the element towards the mouse
      gsap.to(el, {
        x: deltaX * strength,
        y: deltaY * strength,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    const onMouseLeave = () => {
      // Return to original position
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.3)",
      });
    };

    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onMouseLeave);

    return () => {
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [strength]);

  return (
    <div ref={ref} className="inline-block">
      {children}
    </div>
  );
};

export default Magnetic;
