'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

function cx(...parts: Array<string | undefined | false | null>): string {
  return parts.filter(Boolean).join(' ');
}

export interface FlowSectionProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  'aria-label'?: string;
  showDivider?: boolean;
  pinSpacing?: boolean;
  interactiveDuration?: string;
}

export const FlowSection: React.FC<FlowSectionProps> = ({
  id,
  className,
  style = {},
  children,
  'aria-label': ariaLabel,
  showDivider = false,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id={id}
      data-flow-section
      data-pin-spacing={pinSpacing}
      data-interactive-duration={interactiveDuration}
      aria-label={ariaLabel}
      className={cx('relative min-h-screen w-full overflow-hidden', className)}
    >
      <div
        ref={sectionRef}
        data-flow-inner
        className={cx(
          'flow-art-container relative flex min-h-screen w-full flex-col justify-between',
          'will-change-transform',
        )}
        style={{ transformOrigin: 'top center', ...style }}
      >
        <div className="relative flex flex-1 flex-col justify-between w-full h-full">
          {showDivider && (
            <div
              style={{
                height: '1px',
                background: 'linear-gradient(to right, transparent, #4f8ef7, transparent)',
                width: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 10,
              }}
            />
          )}
          {children}
        </div>
      </div>
    </section>
  );
};

export interface FlowArtProps {
  children: React.ReactNode;
  className?: string;
  'aria-label'?: string;
}

const childCount = (children: React.ReactNode) => React.Children.count(children);

const FlowArt: React.FC<FlowArtProps> = ({
  children,
  className,
  'aria-label': ariaLabel = 'Story scroll',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useGSAP(
    () => {
      if (!containerRef.current || reducedMotion) return;

      const sections = Array.from(
        containerRef.current.querySelectorAll<HTMLElement>('[data-flow-section]'),
      );
      if (sections.length === 0) return;

      const triggers: ScrollTrigger[] = [];

      sections.forEach((section, i) => {
        gsap.set(section, { zIndex: i + 1 });

        const inner = section.querySelector<HTMLElement>('.flow-art-container');
        if (!inner) return;

        if (i > 0) {
          // Centered cinematic 3D perspective depth reveal for perfect widescreen scaling
          gsap.set(inner, { 
            transformPerspective: 1200, 
            rotationX: -12, // subtle backward tilt
            scale: 0.88,    // elegant 3D scale down
            opacity: 0.6,   // fade out slightly for depth layering
            transformOrigin: 'top center' 
          });

          const tween = gsap.to(inner, {
            rotationX: 0,
            scale: 1,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'top 20%',
              scrub: true,
            },
          });
          if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
        }

        const pinSpacing = section.getAttribute('data-pin-spacing') === 'true';
        const interactiveDuration = section.getAttribute('data-interactive-duration') || 'bottom top';

        if (i < sections.length - 1 || pinSpacing) {
          triggers.push(
            ScrollTrigger.create({
              trigger: section,
              start: 'bottom bottom',
              end: pinSpacing ? `+=${interactiveDuration}` : 'bottom top',
              pin: true,
              pinSpacing: pinSpacing,
            }),
          );
        }
      });

      ScrollTrigger.refresh();

      return () => {
        triggers.forEach((t) => t.kill());
      };
    },
    { scope: containerRef, dependencies: [childCount(children), reducedMotion] },
  );

  return (
    <div
      ref={containerRef}
      aria-label={ariaLabel}
      className={cx('w-full overflow-x-hidden', className)}
    >
      {children}
    </div>
  );
};

export default FlowArt;
