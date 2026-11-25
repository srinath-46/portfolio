"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Pause, Play, Bot, Compass, X } from "lucide-react";

const AGENT_DEFS = [
  { name: "Scout", color: "#ff3b2f" },
  { name: "Layout", color: "#3b82f6" },
  { name: "Typeset", color: "#10b981" },
  { name: "Motion", color: "#f59e0b" },
  { name: "QA", color: "#06b6d4" },
  { name: "Deploy", color: "#f97316" },
  { name: "Copy", color: "#84cc16" },
  { name: "Lint", color: "#14b8a6" },
  { name: "Index", color: "#eab308" },
  { name: "Render", color: "#38bdf8" },
  { name: "Palette", color: "#fb7185" },
  { name: "Review", color: "#ef4444" },
] as const;

const MAX_CONCURRENT = 6;

interface CursorState {
  id: number;
  name: string;
  color: string;
  x: number;
  y: number;
  startX: number;
  startY: number;
  active: boolean;
  jobIndex: number | null;
}

interface BuildJob {
  el: HTMLElement;
  mode: "type" | "pop" | "wipe";
  order: number;
  phase: "queued" | "glide" | "drag" | "reveal" | "done";
  progress: number;
  cursorId: number | null;
  textNodes: { node: Text; full: string }[];
  wireBoxEl: HTMLDivElement | null;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function easeInOutQuad(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function collectTextNodes(el: HTMLElement): { node: Text; full: string }[] {
  const result: { node: Text; full: string }[] = [];
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  let n: Node | null;
  while ((n = walker.nextNode())) {
    const txt = n as Text;
    if (txt.nodeValue && txt.nodeValue.trim().length > 0) {
      result.push({ node: txt, full: txt.nodeValue });
    }
  }
  return result;
}

export default function AgentOrchestrator() {
  const [agentsEnabled, setAgentsEnabled] = useState<boolean>(true);
  const [paused, setPaused] = useState<boolean>(false);
  const [booting, setBooting] = useState<boolean>(false);
  const [bootPct, setBootPct] = useState<number>(0);
  const [tourActive, setTourActive] = useState<boolean>(false);
  const [cursorCount, setCursorCount] = useState<number>(12);

  const cursorElsRef = useRef<(HTMLDivElement | null)[]>([]);
  const wireLayerRef = useRef<HTMLDivElement | null>(null);
  const pausedRef = useRef<boolean>(false);
  const agentsEnabledRef = useRef<boolean>(true);
  const tourRef = useRef<{
    active: boolean;
    waitingForHero: boolean;
    startedAt: number;
    startY: number;
    targetY: number;
    duration: number;
  }>({
    active: false,
    waitingForHero: false,
    startedAt: 0,
    startY: 0,
    targetY: 0,
    duration: 24000,
  });

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  const revealAllInstant = useCallback(() => {
    document.documentElement.classList.remove("build-mode");
    const els = document.querySelectorAll<HTMLElement>("[data-build]");
    els.forEach((el) => {
      el.classList.remove("is-building");
      el.classList.add("is-built");
      el.style.clipPath = "";
      el.style.transform = "";
      el.style.opacity = "";
    });
    if (wireLayerRef.current) {
      wireLayerRef.current.innerHTML = "";
    }
  }, []);

  const startTour = useCallback(() => {
    try {
      sessionStorage.setItem("portfolio_tour", "1");
    } catch {
      // ignore
    }
    window.location.reload();
  }, []);

  const stopTour = useCallback(() => {
    tourRef.current.active = false;
    tourRef.current.waitingForHero = false;
    setTourActive(false);
  }, []);

  const toggleAgents = useCallback(() => {
    setAgentsEnabled((prev) => {
      const next = !prev;
      agentsEnabledRef.current = next;
      try {
        localStorage.setItem("portfolio_agents", next ? "on" : "off");
      } catch {
        // ignore
      }
      if (!next) {
        revealAllInstant();
        stopTour();
      } else {
        window.location.reload();
      }
      return next;
    });
  }, [revealAllInstant, stopTour]);

  const togglePause = useCallback(() => {
    setPaused((p) => !p);
  }, []);

  useEffect(() => {
    const updateCount = () => {
      setCursorCount(window.innerWidth < 768 ? 6 : 12);
    };
    updateCount();
    window.addEventListener("resize", updateCount);
    return () => window.removeEventListener("resize", updateCount);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("agents");
    let stored: string | null = null;
    try {
      stored = localStorage.getItem("portfolio_agents");
    } catch {
      stored = null;
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const enabled =
      q === "on"
        ? true
        : q === "off"
        ? false
        : stored === "on"
        ? true
        : stored === "off"
        ? false
        : !reduced;

    setAgentsEnabled(enabled);
    agentsEnabledRef.current = enabled;

    let isTourReload = false;
    try {
      if (sessionStorage.getItem("portfolio_tour") === "1") {
        sessionStorage.removeItem("portfolio_tour");
        isTourReload = true;
      }
    } catch {
      isTourReload = false;
    }

    if (!enabled) {
      revealAllInstant();
      if (isTourReload) {
        tourRef.current = {
          active: true,
          waitingForHero: false,
          startedAt: performance.now(),
          startY: 0,
          targetY: Math.max(0, document.documentElement.scrollHeight - window.innerHeight),
          duration: 24000,
        };
        setTourActive(true);
      }
      return;
    }

    document.documentElement.classList.add("build-mode");
    setBooting(true);
    setBootPct(12);

    if (isTourReload) {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      tourRef.current.active = true;
      tourRef.current.waitingForHero = true;
      setTourActive(true);
    }

    const activeCount = window.innerWidth < 768 ? 6 : 12;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const cursors: CursorState[] = AGENT_DEFS.slice(0, activeCount).map((def, i) => ({
      id: i,
      name: def.name,
      color: def.color,
      x: vw * (0.15 + ((i * 19) % 70) / 100),
      y: vh * (0.2 + ((i * 23) % 60) / 100),
      startX: vw * 0.5,
      startY: vh * 0.5,
      active: false,
      jobIndex: null,
    }));

    const buildEls = Array.from(document.querySelectorAll<HTMLElement>("[data-build]"));
    const jobs: BuildJob[] = buildEls.map((el, order) => {
      const modeAttr = el.getAttribute("data-build");
      const mode: "type" | "pop" | "wipe" =
        modeAttr === "type" || modeAttr === "pop" || modeAttr === "wipe" ? modeAttr : "pop";
      const textNodes = mode === "type" ? collectTextNodes(el) : [];
      return {
        el,
        mode,
        order,
        phase: "queued",
        progress: 0,
        cursorId: null,
        textNodes,
        wireBoxEl: null,
      };
    });

    const jobByEl = new Map<HTMLElement, BuildJob>();
    jobs.forEach((j) => jobByEl.set(j.el, j));

    const queue: number[] = [];
    const enqueueJob = (idx: number) => {
      const job = jobs[idx];
      if (job.phase !== "queued") return;
      if (!queue.includes(idx)) {
        queue.push(idx);
        queue.sort((a, b) => a - b);
      }
    };

    const markInstantBuilt = (job: BuildJob) => {
      job.phase = "done";
      job.el.classList.remove("is-building");
      job.el.classList.add("is-built");
      job.el.style.clipPath = "";
      job.el.style.transform = "";
      job.el.style.opacity = "";
      if (job.mode === "type") {
        job.textNodes.forEach((tn) => {
          tn.node.nodeValue = tn.full;
        });
      }
      if (job.wireBoxEl) {
        job.wireBoxEl.remove();
        job.wireBoxEl = null;
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          const job = jobByEl.get(el);
          if (!job || job.phase === "done") continue;

          if (entry.isIntersecting) {
            enqueueJob(job.order);
          } else if (entry.boundingClientRect.bottom < 0) {
            markInstantBuilt(job);
          }
        }
      },
      { threshold: 0.05, rootMargin: "40px 0px 40px 0px" }
    );

    buildEls.forEach((el) => observer.observe(el));

    let bootDone = false;
    const bootStart = performance.now();
    const BOOT_DURATION = 680;
    let rafId = 0;
    let lastTime = performance.now();
    let cursorCursorCycle = 0;

    const createWireBox = (color: string, label: string): HTMLDivElement => {
      const box = document.createElement("div");
      box.style.position = "fixed";
      box.style.pointerEvents = "none";
      box.style.border = "1px solid #3b82f6";
      box.style.background = "rgba(59, 130, 246, 0.06)";
      box.style.zIndex = "55";
      box.style.boxSizing = "border-box";
      box.innerHTML = `
        <span style="position:absolute;top:-3px;left:-3px;width:6px;height:6px;background:#3b82f6;border:1px solid #fff;"></span>
        <span style="position:absolute;top:-3px;right:-3px;width:6px;height:6px;background:#3b82f6;border:1px solid #fff;"></span>
        <span style="position:absolute;bottom:-3px;left:-3px;width:6px;height:6px;background:#3b82f6;border:1px solid #fff;"></span>
        <span style="position:absolute;bottom:-3px;right:-3px;width:6px;height:6px;background:#3b82f6;border:1px solid #fff;"></span>
        <span style="position:absolute;top:-18px;left:0;font-family:var(--font-mono);font-size:10px;line-height:14px;padding:1px 5px;background:#3b82f6;color:#fff;white-space:nowrap;border-radius:2px;">${label}</span>
      `;
      wireLayerRef.current?.appendChild(box);
      return box;
    };

    const tick = (now: number) => {
      const dt = Math.min(48, now - lastTime);
      lastTime = now;

      if (!bootDone) {
        const bp = Math.min(1, (now - bootStart) / BOOT_DURATION);
        setBootPct(Math.round(bp * 100));
        if (bp >= 1) {
          bootDone = true;
          setBooting(false);
          // Seed any elements already in or above viewport
          jobs.forEach((j) => {
            const rect = j.el.getBoundingClientRect();
            if (rect.bottom < 0) {
              markInstantBuilt(j);
            } else if (rect.top < window.innerHeight && rect.bottom > 0) {
              enqueueJob(j.order);
            }
          });
        }
        rafId = requestAnimationFrame(tick);
        return;
      }

      if (!pausedRef.current && agentsEnabledRef.current) {
        // Check if any queued item was scrolled past
        for (let i = queue.length - 1; i >= 0; i--) {
          const j = jobs[queue[i]];
          const r = j.el.getBoundingClientRect();
          if (r.bottom < -20) {
            markInstantBuilt(j);
            queue.splice(i, 1);
          }
        }

        const activeJobs = jobs.filter(
          (j) => j.phase === "glide" || j.phase === "drag" || j.phase === "reveal"
        );

        while (activeJobs.length < MAX_CONCURRENT && queue.length > 0) {
          const nextIdx = queue.shift()!;
          const job = jobs[nextIdx];
          if (job.phase !== "queued") continue;

          // Find next idle cursor
          let chosen: CursorState | null = null;
          for (let k = 0; k < cursors.length; k++) {
            const c = cursors[(cursorCursorCycle + k) % cursors.length];
            if (!c.active) {
              chosen = c;
              cursorCursorCycle = (cursorCursorCycle + k + 1) % cursors.length;
              break;
            }
          }
          if (!chosen) {
            queue.unshift(nextIdx);
            break;
          }

          chosen.active = true;
          chosen.jobIndex = nextIdx;
          chosen.startX = chosen.x;
          chosen.startY = chosen.y;
          job.cursorId = chosen.id;
          job.phase = "glide";
          job.progress = 0;
          activeJobs.push(job);
        }

        // Advance active jobs
        for (const job of jobs) {
          if (job.phase === "queued" || job.phase === "done") continue;
          const cursor = job.cursorId !== null ? cursors[job.cursorId] : null;
          if (!cursor) continue;

          const rect = job.el.getBoundingClientRect();
          const pad = 4;
          const x0 = rect.left - pad;
          const y0 = rect.top - pad;
          const x1 = rect.right + pad;
          const y1 = rect.bottom + pad;

          if (job.phase === "glide") {
            job.progress += dt / 210;
            const t = easeOutCubic(Math.min(1, job.progress));
            cursor.x = cursor.startX + (x0 - cursor.startX) * t;
            cursor.y = cursor.startY + (y0 - cursor.startY) * t;
            if (job.progress >= 1) {
              job.phase = "drag";
              job.progress = 0;
              job.wireBoxEl = createWireBox(cursor.color, `${cursor.name} · ${job.mode}`);
            }
          } else if (job.phase === "drag") {
            job.progress += dt / 170;
            const t = easeOutCubic(Math.min(1, job.progress));
            const cx = x0 + (x1 - x0) * t;
            const cy = y0 + (y1 - y0) * t;
            cursor.x = cx;
            cursor.y = cy;
            if (job.wireBoxEl) {
              job.wireBoxEl.style.left = `${x0}px`;
              job.wireBoxEl.style.top = `${y0}px`;
              job.wireBoxEl.style.width = `${Math.max(8, cx - x0)}px`;
              job.wireBoxEl.style.height = `${Math.max(8, cy - y0)}px`;
            }
            if (job.progress >= 1) {
              job.phase = "reveal";
              job.progress = 0;
              job.el.classList.add("is-building");
              if (job.mode === "type") {
                job.textNodes.forEach((tn) => {
                  tn.node.nodeValue = "";
                });
              } else if (job.mode === "wipe") {
                job.el.style.clipPath = "inset(0 100% 0 0)";
              } else if (job.mode === "pop") {
                job.el.style.opacity = "0";
                job.el.style.transform = "scale(0.94) translateY(8px)";
              }
            }
          } else if (job.phase === "reveal") {
            const dur =
              job.mode === "type"
                ? Math.min(620, Math.max(200, job.textNodes.reduce((s, n) => s + n.full.length, 0) * 9))
                : job.mode === "wipe"
                ? 360
                : 260;
            job.progress += dt / dur;
            const p = Math.min(1, job.progress);
            const e = easeOutCubic(p);

            if (job.wireBoxEl) {
              job.wireBoxEl.style.left = `${x0}px`;
              job.wireBoxEl.style.top = `${y0}px`;
              job.wireBoxEl.style.width = `${Math.max(8, x1 - x0)}px`;
              job.wireBoxEl.style.height = `${Math.max(8, y1 - y0)}px`;
              job.wireBoxEl.style.opacity = String(1 - p * 0.55);
            }

            if (job.mode === "type") {
              const totalChars = job.textNodes.reduce((s, n) => s + n.full.length, 0);
              let remaining = Math.floor(totalChars * p);
              for (const tn of job.textNodes) {
                const take = Math.min(tn.full.length, remaining);
                tn.node.nodeValue = tn.full.slice(0, take);
                remaining -= take;
              }
            } else if (job.mode === "wipe") {
              const right = Math.round((1 - e) * 100);
              job.el.style.clipPath = `inset(0 ${right}% 0 0)`;
            } else if (job.mode === "pop") {
              job.el.style.opacity = String(e);
              job.el.style.transform = `scale(${0.94 + 0.06 * e}) translateY(${(1 - e) * 8}px)`;
            }

            if (p >= 1) {
              markInstantBuilt(job);
              cursor.active = false;
              cursor.jobIndex = null;
            }
          }
        }

        // Gentle idle drift for unused cursors
        for (const c of cursors) {
          if (!c.active) {
            c.x += Math.sin(now * 0.0012 + c.id * 1.7) * 0.35;
            c.y += Math.cos(now * 0.001 + c.id * 1.3) * 0.35;
          }
          const dom = cursorElsRef.current[c.id];
          if (dom) {
            dom.style.transform = `translate3d(${c.x.toFixed(1)}px, ${c.y.toFixed(1)}px, 0)`;
          }
        }
      }

      // Tour Mode auto-scroll inside single rAF loop
      if (tourRef.current.active && !pausedRef.current) {
        if (tourRef.current.waitingForHero) {
          const heroPending = jobs.some(
            (j) => j.el.closest("#hero") && j.phase !== "done"
          );
          if (!heroPending) {
            tourRef.current.waitingForHero = false;
            tourRef.current.startedAt = now;
            tourRef.current.startY = window.scrollY;
            tourRef.current.targetY = Math.max(
              0,
              document.documentElement.scrollHeight - window.innerHeight
            );
          }
        } else {
          const elapsed = now - tourRef.current.startedAt;
          const t = Math.min(1, elapsed / tourRef.current.duration);
          const eased = easeInOutQuad(t);
          const y =
            tourRef.current.startY +
            (tourRef.current.targetY - tourRef.current.startY) * eased;
          window.scrollTo({ top: y, behavior: "instant" as ScrollBehavior });
          if (t >= 1) {
            tourRef.current.active = false;
            setTourActive(false);
          }
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [revealAllInstant]);

  // Stop tour on manual wheel/touch/Esc + keyboard shortcuts (T, A, P)
  useEffect(() => {
    const onManualScrollInterrupt = () => {
      if (tourRef.current.active) {
        stopTour();
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      if (e.key === "Escape" && tourRef.current.active) {
        stopTour();
      } else if (e.key === "t" || e.key === "T") {
        e.preventDefault();
        startTour();
      } else if (e.key === "a" || e.key === "A") {
        e.preventDefault();
        toggleAgents();
      } else if (e.key === "p" || e.key === "P") {
        e.preventDefault();
        togglePause();
      }
    };

    window.addEventListener("wheel", onManualScrollInterrupt, { passive: true });
    window.addEventListener("touchstart", onManualScrollInterrupt, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("wheel", onManualScrollInterrupt);
      window.removeEventListener("touchstart", onManualScrollInterrupt);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [startTour, stopTour, toggleAgents, togglePause]);

  return (
    <>
      {/* Short Boot Loader */}
      {booting && (
        <div
          aria-live="polite"
          className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-[#09090b] px-6"
        >
          <div className="w-full max-w-xs space-y-3">
            <div className="flex items-center justify-between font-mono text-xs tracking-widest text-zinc-400">
              <span>AGENT SWARM INIT</span>
              <span className="text-[#ff3b2f]">{bootPct}%</span>
            </div>
            <div className="h-[2px] w-full overflow-hidden bg-zinc-800">
              <div
                className="h-full bg-[#ff3b2f] transition-[width] duration-75"
                style={{ width: `${bootPct}%` }}
              />
            </div>
            <p className="font-mono text-[11px] text-zinc-500">
              Deploying {cursorCount} build cursors…
            </p>
          </div>
        </div>
      )}

      {/* Wireframe Layer */}
      <div
        ref={wireLayerRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[55] overflow-hidden"
      />

      {/* Robot Cursors */}
      {agentsEnabled && !booting && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[60] overflow-hidden"
        >
          {AGENT_DEFS.slice(0, cursorCount).map((agent, i) => (
            <div
              key={agent.name}
              ref={(el) => {
                cursorElsRef.current[i] = el;
              }}
              className="pointer-events-none fixed left-0 top-0 will-change-transform"
              style={{ opacity: paused ? 0.45 : 1 }}
            >
              {/* Pointer Arrow */}
              <svg
                width="16"
                height="20"
                viewBox="0 0 16 20"
                fill="none"
                className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.65)]"
              >
                <path
                  d="M1 1L14 10.5L7.8 11.6L11.2 18.2L8.6 19.4L5.2 12.8L1 16.4V1Z"
                  fill={agent.color}
                  stroke="#09090b"
                  strokeWidth="1.2"
                />
              </svg>

              {/* Coloured Name Tag with Tiny Robot Head */}
              <div
                className="ml-3 -mt-1 inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 font-mono text-[10px] font-medium text-zinc-950 shadow-md"
                style={{ backgroundColor: agent.color }}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="shrink-0"
                >
                  {/* Pulsing Antenna */}
                  <line
                    x1="8"
                    y1="4"
                    x2="8"
                    y2="1.8"
                    stroke="#09090b"
                    strokeWidth="1.3"
                  />
                  <circle
                    cx="8"
                    cy="1.5"
                    r="1.3"
                    fill="#ffffff"
                    className="robot-antenna"
                  />
                  {/* Robot Head */}
                  <rect
                    x="2.5"
                    y="4.2"
                    width="11"
                    height="9"
                    rx="2.2"
                    fill="#09090b"
                  />
                  {/* Blinking LED Eyes */}
                  <rect
                    x="4.6"
                    y="7.2"
                    width="2.2"
                    height="2.2"
                    rx="0.6"
                    fill={agent.color}
                    className="robot-led"
                  />
                  <rect
                    x="9.2"
                    y="7.2"
                    width="2.2"
                    height="2.2"
                    rx="0.6"
                    fill={agent.color}
                    className="robot-led"
                  />
                </svg>
                <span>{agent.name}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom Controls Dock */}
      <div className="fixed bottom-4 left-1/2 z-[70] -translate-x-1/2">
        <div
          role="toolbar"
          aria-label="Portfolio build and tour controls"
          className="flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-950/95 px-2.5 py-1.5 shadow-2xl"
        >
          <button
            type="button"
            onClick={togglePause}
            disabled={!agentsEnabled && !tourActive}
            title="Pause / Resume (P)"
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-xs text-zinc-200 transition hover:bg-zinc-800 hover:text-white active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3b2f] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {paused ? <Play className="h-3.5 w-3.5 text-[#ff3b2f]" /> : <Pause className="h-3.5 w-3.5" />}
            <span>{paused ? "Resume" : "Pause"}</span>
            <kbd className="hidden rounded bg-zinc-800 px-1 text-[10px] text-zinc-400 sm:inline">
              P
            </kbd>
          </button>

          <span className="h-4 w-px bg-zinc-800" aria-hidden="true" />

          <button
            type="button"
            onClick={toggleAgents}
            aria-pressed={agentsEnabled}
            title="Toggle Agents (A)"
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-xs text-zinc-200 transition hover:bg-zinc-800 hover:text-white active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3b2f] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Bot
              className={`h-3.5 w-3.5 ${
                agentsEnabled ? "text-[#ff3b2f]" : "text-zinc-500"
              }`}
            />
            <span>Agents: {agentsEnabled ? "ON" : "OFF"}</span>
            <kbd className="hidden rounded bg-zinc-800 px-1 text-[10px] text-zinc-400 sm:inline">
              A
            </kbd>
          </button>

          <span className="h-4 w-px bg-zinc-800" aria-hidden="true" />

          {tourActive ? (
            <button
              type="button"
              onClick={stopTour}
              title="Stop Tour (Esc)"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#ff3b2f] px-3 py-1.5 font-mono text-xs font-medium text-white transition hover:bg-[#e5352a] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              <X className="h-3.5 w-3.5" />
              <span>Stop Tour</span>
              <kbd className="hidden rounded bg-black/25 px-1 text-[10px] text-white sm:inline">
                Esc
              </kbd>
            </button>
          ) : (
            <button
              type="button"
              onClick={startTour}
              title="Start Guided Tour (T)"
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-xs text-zinc-200 transition hover:bg-zinc-800 hover:text-white active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3b2f] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Compass className="h-3.5 w-3.5 text-[#ff3b2f]" />
              <span>Tour</span>
              <kbd className="hidden rounded bg-zinc-800 px-1 text-[10px] text-zinc-400 sm:inline">
                T
              </kbd>
            </button>
          )}
        </div>
      </div>
    </>
  );
}
