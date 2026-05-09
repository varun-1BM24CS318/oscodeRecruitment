/**
 * useScrollAnimation.js
 * Custom hook that uses IntersectionObserver to trigger CSS animations
 * when elements enter the viewport. Returns a ref to attach to the element
 * and a boolean `isVisible` indicating whether it's in view.
 */

import { useEffect, useRef, useState } from "react";

/**
 * @param {Object} options - IntersectionObserver options
 * @param {number} options.threshold - How much of the element must be visible (0–1)
 * @param {string} options.rootMargin - Margin around the root
 * @param {boolean} options.once - If true, stop observing after first trigger
 */
const useScrollAnimation = (options = {}) => {
  const { threshold = 0.15, rootMargin = "0px", once = true } = options;
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Stop observing once visible (if once = true)
          if (once) {
            observer.unobserve(element);
          }
        } else {
          if (!once) {
            setIsVisible(false);
          }
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [threshold, rootMargin, once]);

  return [ref, isVisible];
};

export default useScrollAnimation;
