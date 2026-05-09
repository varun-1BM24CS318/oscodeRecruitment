import useScrollAnimation from "../hooks/useScrollAnimation";
import TextScramble from "./ui/TextScramble";
import MultiOrbitSemiCircle from "./ui/multi-orbit-semi-circle";

const TechStack = () => {
  const [headerRef, headerVisible] = useScrollAnimation();

  return (
    <section className="tech-stack section" aria-label="Tech Stack section">
      <div className="container flex flex-col items-center">
        {/* Header */}
        <div 
          ref={headerRef} 
          className={`section__header text-center fade-up ${headerVisible ? "fade-up--visible" : ""}`}
        >
          <span className="section__tag">Tech Stack</span>
          <h2 className="section__title">
            <TextScramble text="Tools We Use" autostart={headerVisible} />
          </h2>
          <p className="section__subtitle max-w-2xl mx-auto">
            From modern frontend frameworks to robust cloud infrastructure, we build with the best open-source technologies available.
          </p>
        </div>

        {/* Orbit Component */}
        <div className="w-full mt-8">
          <MultiOrbitSemiCircle />
        </div>
      </div>
    </section>
  );
};

export default TechStack;
