/**
 * Navbar.jsx
 * Fixed navigation bar with smooth scroll, mobile hamburger, and scroll-aware background.
 */

import { useState, useEffect } from "react";
import { Button } from "./ui/neon-button";
import Magnetic from "./ui/Magnetic";
import { Sun, Moon } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Team", href: "#team" },
  { label: "Events", href: "#events" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const Navbar = ({ theme, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Add solid background once user scrolls past 60px
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      // Update active section based on scroll position
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll handler
  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`} role="navigation" aria-label="Main navigation">
      <div className="navbar__container">
        {/* Logo */}
        <a href="#home" className="navbar__logo" onClick={(e) => handleNavClick(e, "#home")} aria-label="OSCode Club Home">
          <span className="navbar__logo-bracket">&lt;</span>
          <span className="navbar__logo-text">OSCode</span>
          <span className="navbar__logo-bracket">/&gt;</span>
        </a>

        {/* Desktop Nav Links */}
        <ul className="navbar__links" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`navbar__link ${activeSection === link.href.replace("#", "") ? "navbar__link--active" : ""}`}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <div className="flex items-center gap-4">
          <Magnetic strength={0.3}>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              style={{ color: "var(--text-primary)" }}
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </Magnetic>

          <Magnetic strength={0.2}>
            <Button
              variant="solid"
              className="navbar__cta"
              onClick={(e) => handleNavClick(e, "#contact")}
            >
              Join Club
            </Button>
          </Magnetic>
        </div>

        {/* Hamburger */}
        <button
          className={`navbar__hamburger ${menuOpen ? "navbar__hamburger--open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
          id="hamburger-btn"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile-menu ${menuOpen ? "navbar__mobile-menu--open" : ""}`} aria-hidden={!menuOpen}>
        <ul role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`navbar__mobile-link ${activeSection === link.href.replace("#", "") ? "navbar__mobile-link--active" : ""}`}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <Button variant="solid" className="w-full navbar__mobile-cta mt-4" onClick={(e) => handleNavClick(e, "#contact")}>
              Join Club
            </Button>
          </li>
          <li className="mt-4">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10"
              style={{ color: "var(--text-primary)", borderColor: "var(--glass-border)" }}
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
