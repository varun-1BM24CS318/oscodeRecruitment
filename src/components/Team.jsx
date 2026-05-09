/**
 * Team.jsx
 * 3D circular gallery with wheel-scroll trap AND swipe-to-rotate interaction.
 */

import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import useScrollAnimation from "../hooks/useScrollAnimation";
import TextScramble from "./ui/TextScramble";
import { CircularGallery } from "./ui/circular-gallery";

/* ─── team data ─── */
const teamGalleryItems = [
  {
    common: "Arjun Sharma",
    binomial: "Club President · Full Stack Dev",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    photo: {
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80",
      text: "Final year CSE student passionate about open source and distributed systems.",
      pos: "center top",
      by: "Arjun Sharma",
    },
  },
  {
    common: "Priya Nair",
    binomial: "Vice President · UI/UX Lead",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    photo: {
      url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80",
      text: "Crafting beautiful and accessible user experiences using React and Figma.",
      pos: "center top",
      by: "Priya Nair",
    },
  },
  {
    common: "Rohan Verma",
    binomial: "Backend Lead",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    photo: {
      url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80",
      text: "Node.js & Go enthusiast. Loves building scalable APIs and microservices.",
      pos: "center top",
      by: "Rohan Verma",
    },
  },
  {
    common: "Sneha Iyer",
    binomial: "AI / ML Lead",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    photo: {
      url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&auto=format&fit=crop&q=80",
      text: "Exploring the intersection of deep learning and real-world problem solving.",
      pos: "center top",
      by: "Sneha Iyer",
    },
  },
  {
    common: "Kiran Patel",
    binomial: "DevOps · Cloud Engineer",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    photo: {
      url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&auto=format&fit=crop&q=80",
      text: "Kubernetes, Docker, AWS — automating everything so developers can ship faster.",
      pos: "center top",
      by: "Kiran Patel",
    },
  },
  {
    common: "Ananya Reddy",
    binomial: "Open Source Coordinator",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    photo: {
      url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
      text: "Managing contributions across 10+ OSS projects and mentoring new contributors.",
      pos: "center top",
      by: "Ananya Reddy",
    },
  },
  {
    common: "Vikram Singh",
    binomial: "Mobile Development Lead",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    photo: {
      url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80",
      text: "Flutter & React Native developer. Ships cross-platform apps that feel native.",
      pos: "center top",
      by: "Vikram Singh",
    },
  },
  {
    common: "Divya Menon",
    binomial: "Events · Community Manager",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    photo: {
      url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&auto=format&fit=crop&q=80",
      text: "Organising hackathons, talks and workshops to bring the community together.",
      pos: "center top",
      by: "Divya Menon",
    },
  },
];

const ITEMS          = teamGalleryItems.length;
const DEG_PER_ITEM   = 360 / ITEMS;
const AUTO_SPEED     = 0.025;
const SENSITIVITY    = 0.25;
const FULL_CYCLE     = 360;

const Team = () => {
  const [headerRef, headerVisible] = useScrollAnimation();
  const sectionRef   = useRef(null);
  const galleryContainerRef = useRef(null);

  // Smooth lerping refs
  const targetRotRef = useRef(0);
  const currentRotRef = useRef(0);
  const [rotation, setRotation] = useState(0);

  const consumedRef  = useRef(0);
  const wheelingRef  = useRef(false);
  const wheelTimerRef = useRef(null);
  const isDragging   = useRef(false);

  const [progress, setProgress] = useState(0);
  
  // Responsive layout state
  const [isMobile, setIsMobile] = useState(false);
  const [windowHeight, setWindowHeight] = useState(1000);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setWindowHeight(window.innerHeight);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* Auto-rotate and Buttery Smooth Lerping */
  useEffect(() => {
    let raf;
    const tick = () => {
      if (!wheelingRef.current && !isDragging.current) {
        targetRotRef.current += AUTO_SPEED;
      }
      
      // LERP (Linear Interpolation) for buttery smooth motion
      currentRotRef.current += (targetRotRef.current - currentRotRef.current) * 0.08;
      
      // Only update React state if the visual change is noticeable to save renders
      if (Math.abs(currentRotRef.current - rotation) > 0.1) {
        setRotation(currentRotRef.current);
      }
      
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [rotation]);

  /* Hover-based wheel trap */
  useEffect(() => {
    const handleWheel = (e) => {
      const section = sectionRef.current;
      if (!section) return;
      
      const rect = section.getBoundingClientRect();
      const delta = e.deltaY;

      const isPinned = rect.bottom <= window.innerHeight + 10 && rect.top <= 80;
      if (!isPinned) {
        return; // Let the page scroll natively
      }

      // 🚨 CRITICAL FIX for the "Overlay" bug: 🚨
      // If the next section (Events) is actively sliding up and covering this section,
      // DO NOT trap the scroll. Let the user scroll normally to clear the overlay!
      const eventsSection = document.getElementById("events");
      if (eventsSection) {
        const eventsRect = eventsSection.getBoundingClientRect();
        if (eventsRect.top < window.innerHeight - 10) {
          return; // The overlay is sliding up! Do not trap!
        }
      }

      if (delta > 0) {
        /* scrolling DOWN */
        if (consumedRef.current < FULL_CYCLE) {
          e.preventDefault(); // Trap scroll!
          const add = Math.min(delta * SENSITIVITY, FULL_CYCLE - consumedRef.current);
          consumedRef.current += add;
          targetRotRef.current += add; // Update target for smooth lerp
          setProgress(Math.min(consumedRef.current / FULL_CYCLE, 1));
        }
      } else {
        /* scrolling UP */
        if (consumedRef.current > 0) {
          e.preventDefault(); // Trap scroll!
          const sub = Math.min(Math.abs(delta) * SENSITIVITY, consumedRef.current);
          consumedRef.current -= sub;
          if (consumedRef.current < 0) consumedRef.current = 0;
          targetRotRef.current -= sub; // Update target for smooth lerp
          setProgress(Math.max(consumedRef.current / FULL_CYCLE, 0));
        }
      }

      wheelingRef.current = true;
      clearTimeout(wheelTimerRef.current);
      wheelTimerRef.current = setTimeout(() => {
        wheelingRef.current = false;
      }, 200);
    };

    const galleryEl = galleryContainerRef.current;
    if (galleryEl) {
      galleryEl.addEventListener("wheel", handleWheel, { passive: false });
    }
    
    return () => {
      if (galleryEl) {
        galleryEl.removeEventListener("wheel", handleWheel);
      }
      clearTimeout(wheelTimerRef.current);
    };
  }, []);

  /* Pan (Drag/Swipe) Handlers */
  const handlePanStart = () => {
    isDragging.current = true;
  };

  const handlePan = (event, info) => {
    targetRotRef.current -= info.delta.x * 0.4;
  };

  const handlePanEnd = () => {
    isDragging.current = false;
  };

  const frontIndex = (ITEMS - Math.round((rotation % 360) / DEG_PER_ITEM) % ITEMS) % ITEMS;
  
  // Responsive sizing math so cards NEVER overflow their flex container
  const radius = isMobile ? 220 : 450;
  const dynamicScale = isMobile 
    ? Math.min(0.7, Math.max(0.4, (windowHeight - 250) / 450)) 
    : Math.min(1, Math.max(0.45, (windowHeight - 350) / 450));

  return (
    <section
      ref={sectionRef}
      className="team relative w-full min-h-screen flex flex-col justify-center py-12 md:py-24 overflow-hidden"
      aria-label="Team section"
    >
      <div className="container flex flex-col flex-1 h-full relative z-10 w-full max-w-full px-4">
        
        {/* Section header */}
        <div
          ref={headerRef}
          className={`section__header flex-shrink-0 fade-up ${headerVisible ? "fade-up--visible" : ""}`}
        >
          <span className="section__tag">The People</span>
          <h2 className="section__title">
            <TextScramble text="Meet the Team" autostart={headerVisible} />
          </h2>
          <p className="section__subtitle">
            Passionate developers, designers, and builders who make OSCode what it is.
          </p>
        </div>

        {/* ── 3D Circular Gallery ── */}
        <div 
          ref={galleryContainerRef}
          className="relative flex-1 w-full flex items-center justify-center my-4 overflow-visible"
        >
          <motion.div 
            className="cursor-grab active:cursor-grabbing w-full h-full flex items-center justify-center"
            onPanStart={handlePanStart}
            onPan={handlePan}
            onPanEnd={handlePanEnd}
            style={{ touchAction: "pan-y" }} 
          >
            <CircularGallery
              items={teamGalleryItems}
              rotation={rotation}
              radius={radius}
              className="w-full h-full transform transition-transform duration-100 ease-out"
              style={{ transform: `scale(${dynamicScale})` }}
            />
          </motion.div>
        </div>

        {/* ── Progress bar + hint ── */}
        <div className="flex-shrink-0 mt-2 px-8 pb-4">
          <div className="relative w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-white/50 rounded-full transition-all duration-100"
              style={{ width: `${progress * 100}%` }}
            />
          </div>

          <div className="flex justify-between mt-3 max-w-md mx-auto">
            {teamGalleryItems.map((m, i) => (
              <div key={m.common} className="flex flex-col items-center gap-1">
                <div
                  className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                  style={{
                    background: i === frontIndex ? "#ffffff" : "rgba(255,255,255,0.2)",
                    transform: i === frontIndex ? "scale(1.6)" : "scale(1)",
                  }}
                />
              </div>
            ))}
          </div>

          <p className="mt-4 text-center text-xs tracking-widest uppercase transition-colors duration-300"
            style={{ color: progress >= 1 ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.28)" }}
          >
            {progress >= 1
              ? "All members explored — scroll to continue ↓"
              : "Hover over cards & scroll to rotate"}
          </p>
        </div>

      </div>
    </section>
  );
};

export default Team;
