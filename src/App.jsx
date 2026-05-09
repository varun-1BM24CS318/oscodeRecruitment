/**
 * App.jsx
 * Root application component.
 * - SpiralDemo: full-screen splash with fade transition into main site.
 * - Hero: 100vh reactive flow-field particle canvas.
 * - All other sections: wrapped in FlowArt/FlowSection for the
 *   pinned-card "story scroll" reveal effect.
 */

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Team from "./components/Team";
import Events from "./components/Events";
import Projects from "./components/Projects";
import TechStack from "./components/TechStack";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import DeveloperConsole from "./components/DeveloperConsole";
import MatrixRain from "./components/MatrixRain";
import { SpiralDemo } from "./components/ui/demo";
import FlowArt, { FlowSection } from "./components/ui/story-scroll";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMatrixActive, setIsMatrixActive] = useState(false);

  // Lock body scroll while splash screen is active
  useEffect(() => {
    if (showSplash) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showSplash]);

  // Dynamic Tab Title and Hacker Typing Cursor Effect
  useEffect(() => {
    let intervalId;
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Tab is inactive - type out an intriguing invitation
        const message = "OSCode awaits you... 💻 ";
        let index = 0;
        intervalId = setInterval(() => {
          document.title = message.substring(0, index + 1) + "▮";
          index = (index + 1) % message.length;
        }, 300);
      } else {
        // Tab is active - set standard high-fidelity title
        clearInterval(intervalId);
        document.title = "OSCode Club | Build. Collaborate. Innovate.";
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    // Initialize standard title
    document.title = "OSCode Club | Build. Collaborate. Innovate.";

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearInterval(intervalId);
    };
  }, []);

  const handleEnter = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setShowSplash(false);
      window.scrollTo(0, 0);
    }, 1000);
  };

  const toggleMatrix = () => {
    setIsMatrixActive((prev) => !prev);
  };

  return (
    <>
      {/* ── Matrix Rain Canvas Background ── */}
      <MatrixRain isActive={isMatrixActive} />
      {/* ── Splash screen ── */}
      {showSplash && (
        <div
          className={`fixed inset-0 z-[9999] transition-opacity duration-1000 ease-in-out ${
            isTransitioning ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <SpiralDemo onEnter={handleEnter} />
        </div>
      )}

      {/* ── Main site (fades in as splash fades out) ── */}
      <div
        className={`transition-opacity duration-1000 ease-in-out ${
          isTransitioning || !showSplash
            ? "opacity-100"
            : "opacity-0 h-screen overflow-hidden"
        }`}
      >
        <Navbar />

        {/* Hero: full-screen flow-field canvas, sits outside FlowArt */}
        <Hero />

        {/*
          ── Story-scroll wrapper ──
          Each FlowSection pins itself while the next one rotates in.
          Colours stay strictly monochrome to match the OSCode theme.
        */}
        <FlowArt aria-label="OSCode sections">

          {/* ── About ── */}
          <FlowSection
            id="about"
            aria-label="About OSCode"
            style={{
              backgroundColor: "#0d1117",
              color: "#ffffff",
              backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
              backgroundSize: "24px 24px"
            }}
          >
            <About />
          </FlowSection>

          {/* ── Team ── */}
          <FlowSection
            id="team"
            aria-label="Our Team"
            showDivider={true}
            style={{ backgroundColor: "#0a0a0f", color: "#ffffff" }}
          >
            <Team />
          </FlowSection>

          {/* ── Events ── */}
          <FlowSection
            id="events"
            aria-label="Events and Activities"
            showDivider={true}
            style={{
              backgroundColor: "#0d1117",
              color: "#ffffff",
              backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
              backgroundSize: "24px 24px"
            }}
          >
            <Events />
          </FlowSection>

          {/* ── Projects ── */}
          <FlowSection
            id="projects"
            aria-label="Our Projects"
            showDivider={true}
            style={{ backgroundColor: "#0a0a0f", color: "#ffffff" }}
          >
            <Projects />
          </FlowSection>

          {/* ── Tech Stack ── */}
          <FlowSection
            id="tech-stack"
            aria-label="Tech Stack"
            showDivider={true}
            style={{
              backgroundColor: "#0d1117",
              color: "#ffffff",
              backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
              backgroundSize: "24px 24px"
            }}
          >
            <TechStack />
          </FlowSection>

          {/* ── Contact ── */}
          <FlowSection
            id="contact"
            aria-label="Contact Us"
            showDivider={true}
            style={{ backgroundColor: "#0a0a0f", color: "#ffffff" }}
          >
            <Contact />
            <Footer />
          </FlowSection>

        </FlowArt>

      </div>

      {/* ── Fixed floating elements outside scroll-trigger containing blocks ── */}
      <ScrollToTop />
      <DeveloperConsole isMatrixActive={isMatrixActive} onToggleMatrix={toggleMatrix} />
    </>
  );
}

export default App;
