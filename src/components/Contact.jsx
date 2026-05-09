/**
 * Contact.jsx
 * Two-column contact section: club info + social links on left, form on right.
 * Frontend-only form with success toast on submit.
 */

import { useState } from "react";
import useScrollAnimation from "../hooks/useScrollAnimation";
import { Button } from "./ui/neon-button";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com",
    color: "#ffffff",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    color: "#0a66c2",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 23.999 23.227 23.999 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    color: "#e1306c",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: "Discord",
    href: "https://discord.com",
    color: "#5865f2",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
  },
];

/**
 * Toast notification shown after form submit
 */
const Toast = ({ visible, onClose }) => (
  <div className={`toast ${visible ? "toast--visible" : ""}`} role="alert" aria-live="polite">
    <div className="toast__icon">✅</div>
    <div className="toast__text">
      <strong>Message sent!</strong>
      <span>We&apos;ll get back to you within 24 hours.</span>
    </div>
    <button className="toast__close" onClick={onClose} aria-label="Close notification">×</button>
  </div>
);

const Contact = () => {
  const [headerRef, headerVisible] = useScrollAnimation();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Validate form fields
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear error on change
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    // Simulate async submit (no backend)
    setTimeout(() => {
      setSubmitting(false);
      setForm({ name: "", email: "", message: "" });
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
    }, 1000);
  };

  return (
    <section className="contact section" aria-label="Contact section">
      <div className="container">
        {/* Header */}
        <div ref={headerRef} className={`section__header fade-up ${headerVisible ? "fade-up--visible" : ""}`}>
          <span className="section__tag">Get In Touch</span>
          <h2 className="section__title">Contact Us</h2>
          <p className="section__subtitle">
            Have a question, idea, or want to join? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="contact__grid">
          {/* Left: Info */}
          <div className="contact__info">
            <div className="glass-card contact__info-card">
              <h3 className="contact__info-title">Find Us</h3>

              <div className="contact__info-items">
                <div className="contact__info-item">
                  <span className="contact__info-icon">📧</span>
                  <div>
                    <span className="contact__info-label">Email</span>
                    <a href="mailto:oscode@college.edu" className="contact__info-value">
                      oscode@college.edu
                    </a>
                  </div>
                </div>
                <div className="contact__info-item">
                  <span className="contact__info-icon">📍</span>
                  <div>
                    <span className="contact__info-label">Location</span>
                    <span className="contact__info-value">
                      Room 204, CS Block<br />
                      BMSCE, Bengaluru — 560019
                    </span>
                  </div>
                </div>
                <div className="contact__info-item">
                  <span className="contact__info-icon">🕐</span>
                  <div>
                    <span className="contact__info-label">Club Hours</span>
                    <span className="contact__info-value">Mon – Fri, 4 PM – 7 PM</span>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="contact__socials">
                <p className="contact__socials-title">Follow Us</p>
                <div className="contact__socials-grid">
                  {socialLinks.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      className="contact__social-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`OSCode on ${s.name}`}
                      style={{ "--social-color": s.color }}
                    >
                      {s.icon}
                      <span>{s.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="contact__form-wrapper">
            <form
              className="glass-card contact__form"
              onSubmit={handleSubmit}
              noValidate
              id="contact-form"
              aria-label="Contact form"
            >
              <h3 className="contact__form-title">Send a Message</h3>

              {/* Name field */}
              <div className={`contact__field ${errors.name ? "contact__field--error" : ""}`}>
                <label htmlFor="contact-name" className="contact__label">Your Name</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  className="contact__input"
                  placeholder="Arjun Sharma"
                  value={form.name}
                  onChange={handleChange}
                  autoComplete="name"
                  aria-required="true"
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && <span id="name-error" className="contact__error" role="alert">{errors.name}</span>}
              </div>

              {/* Email field */}
              <div className={`contact__field ${errors.email ? "contact__field--error" : ""}`}>
                <label htmlFor="contact-email" className="contact__label">Email Address</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  className="contact__input"
                  placeholder="arjun@college.edu"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                  aria-required="true"
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && <span id="email-error" className="contact__error" role="alert">{errors.email}</span>}
              </div>

              {/* Message field */}
              <div className={`contact__field ${errors.message ? "contact__field--error" : ""}`}>
                <label htmlFor="contact-message" className="contact__label">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  className="contact__textarea"
                  placeholder="I'd love to join OSCode and contribute to..."
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  aria-required="true"
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                {errors.message && <span id="message-error" className="contact__error" role="alert">{errors.message}</span>}
              </div>

              <Button
                type="submit"
                variant="solid"
                className={`w-full contact__submit ${submitting ? "opacity-70 cursor-not-allowed" : ""}`}
                disabled={submitting}
                id="contact-submit-btn"
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="contact__spinner"></span>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Send Message
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </span>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Toast notification */}
      <Toast visible={showToast} onClose={() => setShowToast(false)} />
    </section>
  );
};

export default Contact;
