/**
 * Events.jsx
 * Alternating left-right timeline layout on desktop; single column on mobile.
 * Upcoming events get a glowing border highlight.
 */

import { events } from "../data/events";
import useScrollAnimation from "../hooks/useScrollAnimation";
import { Button } from "./ui/neon-button";

const tagColors = {
  Hackathon: { bg: "#ffffff15", border: "#ffffff40", text: "#ffffff" },
  Workshop: { bg: "#ffffff10", border: "#ffffff30", text: "#d1d5db" },
  Talk: { bg: "#ffffff08", border: "#ffffff20", text: "#9ca3af" },
};

/**
 * Single event card with alternating position
 */
const EventCard = ({ event, index }) => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.15 });
  const isLeft = index % 2 === 0;
  const colors = tagColors[event.tag] || tagColors.Talk;

  return (
    <div
      ref={ref}
      className={`events__item ${isLeft ? "events__item--left" : "events__item--right"} ${
        isVisible ? (isLeft ? "fade-left--visible" : "fade-right--visible") : isLeft ? "fade-left" : "fade-right"
      }`}
    >
      {/* Timeline dot */}
      <div className={`events__dot ${event.status === "upcoming" ? "events__dot--upcoming" : ""}`}></div>

      {/* Card */}
      <div className={`glass-card events__card ${event.status === "upcoming" ? "events__card--upcoming" : ""}`}>
        {/* Header */}
        <div className="events__card-header">
          <span
            className="events__tag"
            style={{ background: colors.bg, border: `1px solid ${colors.border}`, color: colors.text }}
          >
            {event.tag}
          </span>
          {event.status === "upcoming" && (
            <span className="events__badge">Upcoming</span>
          )}
        </div>

        <h3 className="events__title">{event.title}</h3>

        {/* Meta */}
        <div className="events__meta">
          <span className="events__meta-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            {event.date}
          </span>
          <span className="events__meta-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
            </svg>
            {event.participants} participants
          </span>
        </div>

        <p className="events__desc">{event.description}</p>

        {event.status === "upcoming" && (
          <Button
            variant="solid"
            className="w-full mt-2 events__register-btn"
            id={`event-register-${event.id}`}
          >
            Register Now
          </Button>
        )}
      </div>
    </div>
  );
};

const Events = () => {
  const [headerRef, headerVisible] = useScrollAnimation();

  return (
    <section className="events section" aria-label="Events section">
      <div className="container">
        {/* Header */}
        <div ref={headerRef} className={`section__header fade-up ${headerVisible ? "fade-up--visible" : ""}`}>
          <span className="section__tag">Community</span>
          <h2 className="section__title">Events & Activities</h2>
          <p className="section__subtitle">
            Hackathons, workshops, and talks — always something to look forward to.
          </p>
        </div>

        {/* Timeline */}
        <div className="events__timeline">
          {/* Center line */}
          <div className="events__timeline-line" aria-hidden="true"></div>

          {events.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
