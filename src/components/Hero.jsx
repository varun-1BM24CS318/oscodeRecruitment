/**
 * Hero.jsx
 * Full-viewport hero section with a reactive flow-field particle canvas
 * background. Move the mouse to repel particles. Clicking "Join Us" or
 * "View Projects" smooth-scrolls to the relevant section.
 */

import NeuralBackground from "./ui/flow-field-background";
import { Button } from "./ui/neon-button";
import { ArrowRight, GitBranch, Sparkles } from "lucide-react";
import Magnetic from "./ui/Magnetic";

const Hero = () => {
  const handleScroll = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative w-full h-screen overflow-hidden"
      aria-label="Hero section"
    >
      {/* ── Full-bleed particle canvas ── */}
      <div className="absolute inset-0 z-0">
        <NeuralBackground
          color="#ffffff"
          trailOpacity={0.08}
          particleCount={700}
          speed={0.7}
        />
      </div>

      {/* ── Subtle radial vignette so text is readable ── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, rgba(0,0,0,0.75) 100%)",
        }}
      />

      {/* ── Bottom fade: blends hero into the next section ── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
        style={{
          height: "220px",
          background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 40%, #000000 100%)",
        }}
      />

      {/* ── Navbar clearance + centred content ── */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full pt-20 px-6">

        {/* Eye-catcher pill */}
        <div className="flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm text-xs font-medium tracking-widest uppercase text-white/70">
          <Sparkles size={12} className="text-white/50" />
          Open Source · BMSCE
        </div>

        {/* Main headline */}
        <h1
          className="text-center font-extrabold leading-[0.9] tracking-tight text-white"
          style={{ fontSize: "clamp(3rem, 10vw, 7rem)" }}
        >
          Build.{" "}
          <span
            style={{
              background: "linear-gradient(90deg,#fff 0%,#a1a1aa 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Collaborate.
          </span>
          <br />
          Innovate.
        </h1>

        {/* Sub-headline */}
        <p
          className="mt-6 text-center text-white/60 max-w-xl leading-relaxed"
          style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)" }}
        >
          OSCode is BMSCE&apos;s open-source coding community — where curious minds
          build real projects, contribute to the ecosystem, and launch their
          tech careers.
        </p>

        {/* CTA row */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Magnetic strength={0.3}>
            <Button
              variant="solid"
              size="lg"
              onClick={() => handleScroll("#contact")}
              id="hero-join-btn"
              className="flex items-center gap-2 px-8"
            >
              Join Us
              <ArrowRight size={16} />
            </Button>
          </Magnetic>

          <Magnetic strength={0.3}>
            <Button
              variant="ghost"
              size="lg"
              onClick={() => handleScroll("#projects")}
              id="hero-projects-btn"
              className="flex items-center gap-2"
            >
              <GitBranch size={16} />
              View Projects
            </Button>
          </Magnetic>
        </div>

        {/* Stats strip */}
        <div
          className="mt-16 flex flex-wrap justify-center gap-8 border-t border-white/10 pt-8 w-full max-w-2xl"
        >
          {[
            { value: "200+", label: "Members" },
            { value: "30+",  label: "Projects" },
            { value: "50+",  label: "Events" },
            { value: "1k+",  label: "GitHub Stars" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center">
              <span className="text-2xl font-bold text-white">{s.value}</span>
              <span className="text-xs text-white/50 mt-1 tracking-wider uppercase">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <a
        href="#about"
        onClick={(e) => { e.preventDefault(); handleScroll("#about"); }}
        aria-label="Scroll to About section"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white/40 hover:text-white/80 transition-colors animate-bounce"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </a>
    </section>
  );
};

export default Hero;
