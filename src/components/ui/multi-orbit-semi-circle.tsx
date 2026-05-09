"use client";
import React, { useState, useEffect } from "react";
import { 
  GitBranch, 
  Terminal, 
  Code, 
  Database, 
  Globe, 
  Cpu, 
  Cloud, 
  PenTool, 
  Server, 
  Monitor,
  Webhook,
  Workflow
} from "lucide-react";

const ICONS = [
  GitBranch,
  Terminal,
  Code,
  Database,
  Globe,
  Cpu,
  Cloud,
  PenTool,
  Server,
  Monitor,
  Webhook,
  Workflow
];

// Replaced generic Tooltip names with actual tool names mapped to icons
const ICON_NAMES = [
  "GitHub",
  "CLI Tools",
  "VS Code",
  "Databases",
  "Web Tech",
  "Hardware",
  "Cloud",
  "Design",
  "Backend",
  "Frontend",
  "APIs",
  "DevOps"
];

interface SemiCircleOrbitProps {
  radius: number;
  centerX: number;
  centerY: number;
  count: number;
  iconSize: number;
}

function SemiCircleOrbit({ radius, centerX, centerY, count, iconSize }: SemiCircleOrbitProps) {
  return (
    <>
      {/* Semi-circle glow background */}
      <div className="absolute inset-0 flex justify-center">
        <div
          className="
            w-[1000px] h-[1000px] rounded-full 
            bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.25),transparent_70%)]
            dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_70%)]
            blur-3xl 
            -mt-40 
            pointer-events-none
          "
          style={{ zIndex: 0 }}
        />
      </div>

      {/* Orbit icons */}
      {Array.from({ length: count }).map((_, index) => {
        const angle = (index / (count - 1)) * 180;
        const x = radius * Math.cos((angle * Math.PI) / 180);
        const y = radius * Math.sin((angle * Math.PI) / 180);
        
        // Use a semi-random but consistent index for varied icon distribution across orbits
        const iconIndex = (index + Math.floor(radius)) % ICONS.length;
        const IconComponent = ICONS[iconIndex];
        const iconName = ICON_NAMES[iconIndex];

        // Tooltip positioning — above or below based on angle
        const tooltipAbove = angle > 90;

        return (
          <div
            key={index}
            className="absolute flex flex-col items-center group"
            style={{
              left: `${centerX + x - iconSize / 2}px`,
              top: `${centerY - y - iconSize / 2}px`,
              zIndex: 5,
            }}
          >
            <div 
              className="flex items-center justify-center rounded-full bg-[#161b22] border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-transform hover:scale-125 hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] cursor-pointer backdrop-blur-md"
              style={{ width: iconSize, height: iconSize }}
            >
              <IconComponent size={iconSize * 0.55} className="text-white opacity-80 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Tooltip */}
            <div
              className={`absolute ${
                tooltipAbove ? "bottom-[calc(100%+12px)]" : "top-[calc(100%+12px)]"
              } opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity w-max rounded-md bg-[#161b22] border border-white/10 px-3 py-1.5 text-xs text-white shadow-xl text-center`}
            >
              {iconName}
            </div>
          </div>
        );
      })}
    </>
  );
}

export default function MultiOrbitSemiCircle() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Use a fallback while mounting to avoid hydration mismatch, though this is purely client-side
  if (size.width === 0) return <div className="min-h-screen" />;

  const baseWidth = Math.min(size.width * 0.85, 800);
  const centerX = baseWidth / 2;
  const centerY = baseWidth * 0.5;

  const iconSize =
    size.width < 480
      ? Math.max(36, baseWidth * 0.08)
      : size.width < 768
      ? Math.max(42, baseWidth * 0.07)
      : Math.max(48, baseWidth * 0.06);

  return (
    <div className="relative flex flex-col items-center text-center z-10 w-full pt-10">
      <div
        className="relative"
        style={{ width: baseWidth, height: baseWidth * 0.55 }}
      >
        <SemiCircleOrbit radius={baseWidth * 0.22} centerX={centerX} centerY={centerY} count={5} iconSize={iconSize * 0.8} />
        <SemiCircleOrbit radius={baseWidth * 0.36} centerX={centerX} centerY={centerY} count={7} iconSize={iconSize * 0.9} />
        <SemiCircleOrbit radius={baseWidth * 0.5} centerX={centerX} centerY={centerY} count={9} iconSize={iconSize} />
      </div>
    </div>
  );
}
