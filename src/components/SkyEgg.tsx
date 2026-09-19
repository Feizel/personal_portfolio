import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { localSiderealTime, moonPhase, SOUTHERN_SKY } from "../utils/sky";
import { CloseIcon } from "./icons";

const LINES = [
  "I bought a telescope before I could afford one. Still the best call I've made.",
  "Crux, the Southern Cross. Extend its long axis four and a half times and you are looking due south.",
  "Measure first. Distrust a clean result. Assume the universe is stranger than your model of it.",
];

interface SkyEggProps {
  open: boolean;
  onClose: () => void;
}

/**
 * The sky over Johannesburg, on demand.
 *
 * Real local sidereal time, real stars with real names and magnitudes, Crux
 * stroking itself in, parallax from the pointer or the phone's tilt, and a
 * shooting star wherever you click.
 *
 * It is found by holding still at the centre of the hero's orbital field —
 * the one place the page invites you to play with and never labels.
 */
const SkyEgg = ({ open, onClose }: SkyEggProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [lst, setLst] = useState("--:--:--");
  const [line, setLine] = useState(0);
  const [typed, setTyped] = useState("");
  const [hovered, setHovered] = useState<string | null>(null);
  const parallax = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const moon = moonPhase();

  const close = useCallback(() => {
    setLine(0);
    setTyped("");
    setHovered(null);
    onClose();
  }, [onClose]);

  // Sidereal clock.
  useEffect(() => {
    if (!open) return;
    const tick = () => setLst(localSiderealTime().text);
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [open]);

  // Typewriter, one line at a time.
  useEffect(() => {
    if (!open) return;
    const text = LINES[line];
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        setTimeout(() => setLine((l) => (l + 1) % LINES.length), 4200);
      }
    }, 26);
    return () => clearInterval(id);
  }, [open, line]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "unset";
    };
  }, [open, close]);

  // Star field, parallax and meteors.
  useEffect(() => {
    if (!open) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let stars: { x: number; y: number; z: number; r: number; tw: number }[] = [];
    let meteors: { x: number; y: number; vx: number; vy: number; life: number }[] = [];
    let raf = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = Array.from({ length: Math.round((w * h) / 3200) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: 0.3 + Math.random() * 0.7,
        r: 0.3 + Math.random() * 1.1,
        tw: Math.random() * Math.PI * 2,
      }));
    };

    const frame = (t: number) => {
      const p = parallax.current;
      p.x += (p.tx - p.x) * 0.06;
      p.y += (p.ty - p.y) * 0.06;
      ctx.clearRect(0, 0, w, h);

      for (const s of stars) {
        const a = 0.45 + Math.sin(t / 900 + s.tw) * 0.25;
        ctx.beginPath();
        ctx.arc(s.x + p.x * 18 * s.z, s.y + p.y * 18 * s.z, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${a * s.z})`;
        ctx.fill();
      }

      meteors = meteors.filter((m) => m.life > 0);
      for (const m of meteors) {
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - m.vx * 9, m.y - m.vy * 9);
        ctx.strokeStyle = `rgba(255,255,255,${Math.min(1, m.life / 40)})`;
        ctx.lineWidth = 1.4;
        ctx.lineCap = "round";
        ctx.stroke();
        m.x += m.vx;
        m.y += m.vy;
        m.life -= 1;
      }

      raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      parallax.current.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      parallax.current.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onDown = (e: PointerEvent) => {
      const angle = Math.PI * 0.72 + (Math.random() - 0.5) * 0.4;
      meteors.push({
        x: e.clientX,
        y: e.clientY,
        vx: Math.cos(angle) * -7,
        vy: Math.sin(angle) * -7,
        life: 44,
      });
    };

    resize();
    if (calm) {
      // One still frame: the sky, without the twinkle.
      frame(0);
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(frame);
    }

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onDown);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const starById = (id: string) => SOUTHERN_SKY.stars.find((s) => s.id === id)!;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          role="dialog"
          aria-modal="true"
          aria-label="The southern sky over Johannesburg"
          className="fixed inset-0 z-[70] bg-[#04060c]"
        >
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

          {/* Constellation lines, stroked in. */}
          <svg
            className="absolute inset-0 h-full w-full pointer-events-none"
            viewBox="0 0 1 1"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {SOUTHERN_SKY.lines.map(([a, b], i) => {
              const s1 = starById(a);
              const s2 = starById(b);
              return (
                <motion.line
                  key={`${a}-${b}`}
                  x1={s1.x}
                  y1={s1.y}
                  x2={s2.x}
                  y2={s2.y}
                  stroke="rgba(148,180,255,0.5)"
                  strokeWidth={0.0012}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.1, delay: 0.5 + i * 0.35, ease: "easeInOut" }}
                />
              );
            })}
          </svg>

          {/* The named stars. */}
          <div className="absolute inset-0">
            {SOUTHERN_SKY.stars.map((star, i) => {
              const size = Math.max(5, 15 - star.mag * 3);
              return (
                <motion.button
                  key={star.id}
                  type="button"
                  initial={{ opacity: 0, scale: 0.2 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.25 + i * 0.09, duration: 0.7 }}
                  onMouseEnter={() => setHovered(star.id)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(star.id)}
                  onBlur={() => setHovered(null)}
                  aria-label={star.name}
                  className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-white outline-none transition-transform duration-300 hover:scale-150 focus-visible:scale-150"
                  style={{
                    left: `${star.x * 100}%`,
                    top: `${star.y * 100}%`,
                    width: size,
                    height: size,
                    boxShadow: `0 0 ${size * 1.8}px ${size / 2.6}px rgba(190,215,255,0.65)`,
                  }}
                >
                  <span
                    hidden={hovered !== star.id}
                    className="absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap rounded-md bg-black/70 px-2.5 py-1 text-xs font-light text-white/90 backdrop-blur"
                  >
                    {star.name}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Instruments. */}
          <div className="absolute bottom-10 left-6 right-6 sm:left-12 sm:right-auto max-w-xl text-white/80">
            <p className="min-h-[3.5rem] text-sm sm:text-base font-light leading-relaxed">
              {typed}
              <span className="ml-0.5 animate-blink text-orange-400">|</span>
            </p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 font-mono text-[0.7rem] uppercase tracking-widest text-white/45">
              <span>LST {lst}</span>
              <span>26.2041°S 28.0473°E</span>
              <span>
                {moon.name} · {Math.round(moon.illumination * 100)}%
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={close}
            aria-label="Close the sky"
            className="absolute right-6 top-6 rounded-full border border-white/25 p-2.5 text-white/70 transition-colors hover:border-white hover:text-white"
          >
            <CloseIcon size={18} />
          </button>

          <p className="absolute left-1/2 top-6 -translate-x-1/2 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-white/30">
            Click anywhere for a meteor · Esc to return
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SkyEgg;
