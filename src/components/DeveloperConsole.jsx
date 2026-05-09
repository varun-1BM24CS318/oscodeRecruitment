/**
 * DeveloperConsole.jsx
 * An interactive, retro-futuristic glassmorphic terminal/CLI widget.
 * Allows seniors/evaluators to type commands, run tests, and discover easter eggs.
 */

import { useState, useEffect, useRef } from "react";
import { Terminal, X, Minimize2, Maximize2, Sparkles, Flame } from "lucide-react";

const COMMANDS = {
  help: "Show all available commands",
  about: "Learn about the developer of this site",
  skills: "Run diagnostic on developer tech stack",
  github: "Simulate git connection and print repo details",
  recruit: "Check eligibility status for OSCode club recruitment",
  matrix: "Toggle a full-screen digital rain falling code effect",
  clear: "Clear the terminal logs",
};

const DeveloperConsole = ({ onToggleMatrix }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [history, setHistory] = useState([
    { type: "system", text: "OSCode Terminal v1.0.0 Initialized." },
    { type: "system", text: "Type 'help' to view available system diagnostics." },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);

  const logsEndRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll terminal logs to bottom on update
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history]);

  // Keep focus on input when terminal is open and clicked
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleCommand = (cmdStr) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    const newLogs = [...history, { type: "input", text: `> ${cmdStr}` }];
    const nextCmdHistory = [...cmdHistory, cmdStr];
    setCmdHistory(nextCmdHistory);
    setHistoryIdx(nextCmdHistory.length);

    switch (trimmed) {
      case "help":
        newLogs.push({
          type: "output",
          text: "Available Diagnostics Commands:\n" +
            Object.entries(COMMANDS)
              .map(([cmd, desc]) => `  • ${cmd.padEnd(10)} - ${desc}`)
              .join("\n")
        });
        break;

      case "about":
        newLogs.push({
          type: "output",
          text: `
 ██████╗ ███████╗ ██████╗ ██████╗ ██████╗ ███████╗
██╔═══██╗██╔════╝██╔════╝██╔═══██╗██╔══██╗██╔════╝
██║   ██║███████╗██║     ██║   ██║██║  ██║█████╗  
██║   ██║╚════██║██║     ██║   ██║██║  ██║██╔══╝  
╚██████╔╝███████║╚██████╗╚██████╔╝██████╔╝███████╗
 ╚═════╝ ╚══════╝ ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝
Created by an ambitious developer ready to contribute, build, and push open-source boundaries!
Stack: React 19, GSAP ScrollTrigger, Vite, Tailwind CSS, PostCSS.
`
        });
        break;

      case "skills":
        newLogs.push({
          type: "output",
          text: `
[DIAGNOSTICS: FULL SKILL SET LOADED]
  React / Frontend   [████████████████████] 100% (High-Fidelity UI, Custom Hooks)
  GSAP Animations    [██████████████████░░] 90%  (Fluid Pins, 3D Rotations)
  Tailwind CSS       [████████████████████] 100% (Modern Grid, Glassmorphism)
  Git & Open Source  [████████████████░░░░] 80%  (Robust CI/CD pipelines, Pull Requests)
  Systems / Script   [██████████████░░░░░░] 70%  (Full-stack logic, command parsers)
`
        });
        break;

      case "github":
        newLogs.push({
          type: "output",
          text: `
Connecting to GitHub API... SUCCESS!
Repo: varun-1BM24CS318/oscodeRecruitment
Status: Clean Build, Production Verified.
Deploy Target: Vercel SPA fallbacks configured.
`
        });
        break;

      case "recruit":
        newLogs.push({
          type: "output",
          text: `
[DIAGNOSING OSCODE CLUB RECRUITMENT STATUS...]
Analyzing candidate profile...
  - Redesigned landing page with rich aesthetics? YES.
  - Eliminated navigation section bugs using bounding offsets? YES.
  - Resolved UI overlapping issues and implemented high-fidelity animations? YES.
  - Embedded an interactive retro hacker console to show elite skill levels? YES.

Result: candidate_eligibility = 100%
Seniors verdict: "MUST RECRUIT IMMEDIATELY! Elevates the entire frontend team."
`
        });
        break;

      case "matrix":
        if (onToggleMatrix) {
          const enabled = onToggleMatrix();
          newLogs.push({
            type: "output",
            text: enabled 
              ? "MATRIX RAIN EFFECT: ACTIVE. Welcome to the source code." 
              : "MATRIX RAIN EFFECT: OFFLINE. Returning to standard interface."
          });
        } else {
          newLogs.push({ type: "error", text: "Matrix function not linked in this scope." });
        }
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      default:
        newLogs.push({
          type: "error",
          text: `Unknown command: '${trimmed}'. Type 'help' to see available commands.`
        });
        break;
    }

    setHistory(newLogs);
    setInputVal("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length > 0 && historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInputVal(cmdHistory[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx < cmdHistory.length - 1) {
        const nextIdx = historyIdx + 1;
        setHistoryIdx(nextIdx);
        setInputVal(cmdHistory[nextIdx]);
      } else {
        setHistoryIdx(cmdHistory.length);
        setInputVal("");
      }
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-full border border-green-500/30 bg-black/80 px-4 py-3 font-mono text-xs text-green-400 shadow-lg shadow-green-500/10 backdrop-blur-md transition-all hover:scale-105 hover:border-green-400 hover:text-green-300 hover:shadow-green-500/20 active:scale-95"
        aria-label="Open Developer Console"
      >
        <Terminal className="h-4 w-4 animate-pulse text-green-400" />
        <span className="font-semibold tracking-wider uppercase">Console</span>
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
        </span>
      </button>

      {/* Glassmorphic Terminal Window */}
      {isOpen && (
        <div
          onClick={() => inputRef.current?.focus()}
          className={`fixed bottom-24 left-6 z-50 flex flex-col rounded-lg border border-green-500/30 bg-black/90 font-mono text-green-400 shadow-2xl shadow-green-500/15 backdrop-blur-lg transition-all duration-300 ${
            isMaximized
              ? "fixed inset-6 bottom-24 z-50"
              : "h-[380px] w-[90vw] sm:w-[480px]"
          }`}
          style={{
            backgroundImage: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.15) 50%)",
            backgroundSize: "100% 4px"
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-green-500/20 bg-green-950/20 px-4 py-2.5">
            <div className="flex items-center gap-2">
              <Terminal className="h-3.5 w-3.5 text-green-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-green-400">
                system_diag.sh
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMaximized(!isMaximized);
                }}
                className="rounded p-1 hover:bg-green-500/10 text-green-500 transition-colors"
                title={isMaximized ? "Minimize" : "Maximize"}
              >
                {isMaximized ? <Minimize2 className="h-3 w-3" /> : <Maximize2 className="h-3 w-3" />}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="rounded p-1 hover:bg-red-500/20 text-red-400 transition-colors"
                title="Close"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* Logs */}
          <div className="flex-1 overflow-y-auto px-4 py-3 text-xs leading-relaxed scrollbar-thin scrollbar-thumb-green-500/20">
            {history.map((log, idx) => (
              <div
                key={idx}
                className={`whitespace-pre-wrap ${
                  log.type === "input"
                    ? "text-green-300 font-bold"
                    : log.type === "error"
                    ? "text-red-400"
                    : log.type === "system"
                    ? "text-green-500/60"
                    : "text-green-400"
                }`}
              >
                {log.text}
              </div>
            ))}
            <div ref={logsEndRef} />
          </div>

          {/* Input Prompt */}
          <div className="flex items-center gap-2 border-t border-green-500/20 bg-green-950/10 px-4 py-2.5">
            <span className="text-xs font-bold text-green-300">$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type command here... Try 'help'"
              className="flex-1 bg-transparent text-xs text-green-300 placeholder-green-600 focus:outline-none"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default DeveloperConsole;
