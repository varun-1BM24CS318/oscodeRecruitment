/**
 * About.jsx
 * Two-column layout: mission text on the left, animated count-up stats on the right.
 * Uses IntersectionObserver via the useScrollAnimation hook.
 */

import { useEffect, useState } from "react";
import useScrollAnimation from "../hooks/useScrollAnimation";
import TextScramble from "./ui/TextScramble";
import { MagicText } from "./ui/magic-text";

/**
 * CountUp — animates a number from 0 to `target` once `active` is true.
 */
const CountUp = ({ target, suffix = "", duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.5 });

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, target, duration]);

  return (
    <span ref={ref} className="about__stat-number">
      {count}
      {suffix}
    </span>
  );
};

const stats = [
  { label: "Active Members", value: 200, suffix: "+" },
  { label: "Projects Built", value: 30, suffix: "+" },
  { label: "Events Held", value: 50, suffix: "+" },
  { label: "GitHub Stars", value: 1020, suffix: "+" },
];

const values = [
  {
    icon: "🔓",
    title: "Open by Default",
    desc: "Everything we build is open source. We believe in transparency, collaboration, and giving back.",
  },
  {
    icon: "🤝",
    title: "Community First",
    desc: "From first-year beginners to final-year experts — everyone has a place and a voice at OSCode.",
  },
  {
    icon: "🚀",
    title: "Ship Real Things",
    desc: "We don't just learn — we build products used by thousands of real users in our campus and beyond.",
  },
];

const About = () => {
  const [sectionRef, sectionVisible] = useScrollAnimation();
  const [textRef, textVisible] = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="about section" aria-label="About section">
      <div className="container">
        {/* Section header */}
        <div ref={sectionRef} className={`section__header fade-up ${sectionVisible ? "fade-up--visible" : ""}`}>
          <span className="section__tag">Who We Are</span>
          <h2 className="section__title">
            <TextScramble text="About OSCode Club" autostart={sectionVisible} />
          </h2>
          <p className="section__subtitle">
            A community of builders, thinkers, and collaborators — united by a love for open source.
          </p>
        </div>

        <div className="about__grid">
          {/* Left: Text content */}
          <div ref={textRef} className={`about__text fade-left ${textVisible ? "fade-left--visible" : ""}`}>
            <div className="mb-6 -mt-4 text-accent-blue">
              <MagicText text="OSCode Club was founded in 2021 by a group of engineering students who believed that the best way to learn software development is by building things that matter — together." />
            </div>
            <p className="about__body">
              We run workshops, hackathons, speaker sessions, and open-source sprints throughout the year.
              Our members have gone on to contribute to major projects like Linux, VS Code, and React, and
              have secured placements at companies like Google, Zepto, Razorpay, and Microsoft.
            </p>
            <p className="about__body">
              Whether you&apos;re writing your first line of code or shipping your tenth open-source package,
              OSCode is the place where you grow, collaborate, and make an impact.
            </p>

            {/* Values */}
            <div className="about__values">
              {values.map((v) => (
                <div key={v.title} className="about__value">
                  <span className="about__value-icon">{v.icon}</span>
                  <div>
                    <h3 className="about__value-title">{v.title}</h3>
                    <p className="about__value-desc">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Stats */}
          <div className="about__stats-grid">
            {stats.map((stat) => (
              <div key={stat.label} className="glass-card about__stat-card">
                <CountUp target={stat.value} suffix={stat.suffix} />
                <span className="about__stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
