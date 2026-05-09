/**
 * Team.jsx
 * 3D circular gallery with drag-to-rotate interaction.
 *
 * PERMANENT FIX:
 * - Removed fragile wheel-scroll traps completely. The page scrolls 100% natively.
 * - Gallery uses swipe/drag (Pan) to rotate horizontally. 
 * - Responsive sizing (scales down cards and radius on small screens) prevents cut-offs.
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
const AUTO_SPEED     = 0.025; // Slightly faster for visual appeal

const Team = () => {
  const [headerRef, headerVisible] = useScrollAnimation();
  const sectionRef   = useRef(null);

  const rotRef       = useRef(0);
  const [rotation, setRotation] = useState(0);
  const isDragging   = useRef(false);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* Auto-rotate when user not dragging */
  useEffect(() => {
    let raf;
    const tick = () => {
      if (!isDragging.current) {
        rotRef.current += AUTO_SPEED;
        setRotation(rotRef.current);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  /* Pan (Drag/Swipe) Handlers */
  const handlePanStart = () => {
    isDragging.current = true;
  };

  const handlePan = (event, info) => {
    // info.delta.x is the distance moved horizontally. 
    // We adjust the rotation directly proportional to the swipe distance.
    rotRef.current -= info.delta.x * 0.4;
    setRotation(rotRef.current);
  };

  const handlePanEnd = () => {
    isDragging.current = false;
  };

  const frontIndex = (ITEMS - Math.round((rotation % 360) / DEG_PER_ITEM) % ITEMS) % ITEMS;
  const radius = isMobile ? 220 : 480;

  return (
    <section
      ref={sectionRef}
      // Reverted to standard h-screen. The responsive scaling prevents overflow clipping.
      className="team relative w-full h-screen flex flex-col justify-between py-12 md:py-24 overflow-hidden"
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

        {/* ── 3D Circular Gallery with Drag-to-Rotate ── */}
        <div className="relative flex-1 w-full flex items-center justify-center my-4 overflow-visible">
          <motion.div 
            className="cursor-grab active:cursor-grabbing w-full h-full flex items-center justify-center"
            onPanStart={handlePanStart}
            onPan={handlePan}
            onPanEnd={handlePanEnd}
            // pan-y allows vertical scrolling of the page to work natively, but intercepts horizontal swipes for the carousel
            style={{ touchAction: "pan-y" }} 
          >
            <CircularGallery
              items={teamGalleryItems}
              rotation={rotation}
              radius={radius}
              // Scale down heavily on mobile so cards fit perfectly without being cut off
              className={`w-full h-full transform ${isMobile ? 'scale-[0.65]' : 'scale-[0.85] lg:scale-100'} transition-transform duration-500`}
            />
          </motion.div>
        </div>

        {/* ── Dots + hint ── */}
        <div className="flex-shrink-0 mt-2 px-8 pb-4">
          <div className="flex justify-between max-w-md mx-auto">
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

          <p className="mt-4 text-center text-xs tracking-widest uppercase text-white/40">
            Swipe or drag to rotate
          </p>
        </div>

      </div>
    </section>
  );
};

export default Team;
