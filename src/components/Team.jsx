/**
 * Team.jsx
 * 3D circular gallery with sticky scroll-driven rotation.
 *
 * Uses `position: sticky` to keep the gallery on-screen while scrolling down a 300vh section.
 * - Auto-rotates slowly when idle.
 * - Page scrolling adds momentum to the rotation seamlessly.
 * - Solves the "gap" and "wheel trap" issues entirely.
 */

import { useState, useEffect, useRef } from "react";
import { useScroll, useMotionValueEvent } from "motion/react";
import useScrollAnimation from "../hooks/useScrollAnimation";
import TextScramble from "./ui/TextScramble";
import { CircularGallery } from "./ui/circular-gallery";

/* ─── team data mapped to GalleryItem shape ─── */
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
const AUTO_SPEED     = 0.012; 

const Team = () => {
  const [headerRef, headerVisible] = useScrollAnimation();
  const sectionRef   = useRef(null);

  const rotRef       = useRef(0);
  const [rotation, setRotation] = useState(0);

  // Use framer-motion to track scroll progress over the 300vh section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  const prevScrollRef = useRef(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const delta = latest - prevScrollRef.current;
    prevScrollRef.current = latest;
    // Spin 720 degrees (2 full rotations) over the entire 300vh scroll
    rotRef.current += delta * 720;
    setRotation(rotRef.current);
  });

  /* Auto-rotate constantly when idle */
  useEffect(() => {
    let raf;
    const tick = () => {
      rotRef.current += AUTO_SPEED;
      setRotation(rotRef.current);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  /* which member is currently front-and-centre */
  const frontIndex =
    (ITEMS - Math.round((rotation % 360) / DEG_PER_ITEM) % ITEMS) % ITEMS;

  return (
    <section
      ref={sectionRef}
      className="team relative w-full"
      aria-label="Team section"
      style={{ height: "300vh" }}
    >
      {/* Sticky container stays perfectly fixed to the viewport while scrolling the 300vh */}
      <div className="sticky top-0 w-full h-screen flex flex-col overflow-hidden py-24">
        <div className="container flex flex-col flex-1 h-full relative z-10">
          
          {/* Section header */}
          <div
            ref={headerRef}
            className={`section__header fade-up ${headerVisible ? "fade-up--visible" : ""}`}
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
          <div className="relative flex-1 w-full" style={{ height: "450px", minHeight: "450px" }}>
            <CircularGallery
              items={teamGalleryItems}
              rotation={rotation}
              radius={480}
              className="w-full h-full"
            />
          </div>

          {/* ── Progress bar + hint ── */}
          <div className="mt-4 px-8 pb-4">
            {/* progress track */}
            <div className="relative w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-white/50 rounded-full"
                style={{ width: `${Math.max(0, Math.min(100, scrollYProgress.get() * 100))}%` }}
              />
            </div>

            {/* member dots */}
            <div className="flex justify-between mt-3">
              {teamGalleryItems.map((m, i) => (
                <div
                  key={m.common}
                  className="flex flex-col items-center gap-1"
                >
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

            {/* contextual hint */}
            <p className="mt-3 text-center text-xs tracking-widest uppercase text-white/30">
              Scroll down to rotate · Hover a card for links
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Team;
