import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BAYER,
  localSiderealTime,
  moonPhase,
  spectralColour,
  SOUTHERN_SKY,
} from "../utils/sky";
import { CloseIcon } from "./icons";

const LINES = [
  "I bought a telescope before I could afford one. Still the best call I've made.",
  "Crux, the Southern Cross. Extend its long axis four and a half times and you are looking due south.",
  "Everything here is older than the light reaching you. Rigil Kentaurus is four years stale. Hadar is three hundred and ninety.",
  "Measure first. Distrust a clean result. Assume the universe is stranger than your model of it.",
];

interface SkyEggProps {
  open: boolean;
  onClose: () => void;
}

/**
 * The sky over Johannesburg, on demand.
 *
 * The whole field turns about the south celestial pole, the way it actually
 * does — sped up from fifteen degrees an hour to something you can watch, but
 * the same motion, and everything rotates together rather than drifting apart.
 *
 * Stars are drawn from real data: apparent magnitude sets both size and
 * brightness on the usual logarithmic curve, spectral class sets colour, and
 * the brightest few carry diffraction spikes the way they do through a real
 * aperture. Nothing here is a white dot with a glow behind it.
 *
 * The named stars are also DOM buttons, repositioned each frame to sit exactly
 * over their drawn counterparts, so the constellation can be tabbed through
 * and read aloud without the canvas having to be accessible.
 */

/** Degrees per second. The real sky turns at 0.00417; this is watchable. */
const TURN_RATE = 0.55;

interface FieldStar {
  /** Position relative to the pole, in polar form, so rotation is free. */
  radius: number;
  angle: number;
  r: number;
  colour: [number, number, number];
  twinkle: number;
  depth: number;
}

const SkyEgg = ({ open, onClose }: SkyEggProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [lst, setLst] = useState("--:--:--");
  const [line, setLine] = useState(0);
  const [typed, setTyped] = useState("");
  const [hovered, setHovered] = useState<string | null>(null);
  const moon = moonPhase();

  const close = useCallback(() => {
    setLine(0);
    setTyped("");
    setHovered(null);
    onClose();
  }, [onClose]);

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
        setTimeout(() => setLine((l) => (l + 1) % LINES.length), 5200);
      }
    }, 24);
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
    let pole = { x: 0, y: 0 };
    let field: FieldStar[] = [];
    let meteors: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      max: number;
    }[] = [];
    let raf = 0;
    let turn = 0;
    let started = 0;
    const parallax = { x: 0, y: 0, tx: 0, ty: 0 };

    /** Magnitude to drawn radius, on the logarithmic curve brightness follows. */
    const radiusFor = (mag: number) => Math.max(0.45, 1.9 * Math.pow(2.512, -mag / 6));

    const build = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // The south celestial pole sits below the frame, so the sky wheels
      // across rather than spinning like a pinwheel in the middle of it.
      pole = { x: w * 0.42, y: h * 1.34 };

      const count = Math.round((w * h) / 2400);
      field = Array.from({ length: count }, () => {
        const x = Math.random() * w;
        const y = Math.random() * h * 1.15 - h * 0.08;
        const dx = x - pole.x;
        const dy = y - pole.y;
        // Magnitudes skewed faint, the way a real field is.
        const mag = 1.6 + Math.pow(Math.random(), 0.45) * 5.2;
        const classes = "BAFGKM";
        const spectral = classes[Math.floor(Math.pow(Math.random(), 1.7) * 6)];
        return {
          radius: Math.hypot(dx, dy),
          angle: Math.atan2(dy, dx),
          r: radiusFor(mag),
          colour: spectralColour(spectral),
          twinkle: Math.random() * Math.PI * 2,
          depth: 0.35 + Math.random() * 0.65,
        };
      });
    };

    /** Where a named star sits this frame, after the rotation. */
    const placeNamed = (sx: number, sy: number) => {
      const x0 = sx * w;
      const y0 = sy * h;
      const dx = x0 - pole.x;
      const dy = y0 - pole.y;
      const radius = Math.hypot(dx, dy);
      const angle = Math.atan2(dy, dx) + (turn * Math.PI) / 180;
      return {
        x: pole.x + Math.cos(angle) * radius + parallax.x * 14,
        y: pole.y + Math.sin(angle) * radius + parallax.y * 14,
      };
    };

    /** Four-point spike, the way a bright star flares through an aperture. */
    const spike = (x: number, y: number, len: number, a: number, colour: string) => {
      const grad = ctx.createLinearGradient(x - len, y, x + len, y);
      grad.addColorStop(0, "rgba(255,255,255,0)");
      grad.addColorStop(0.5, colour);
      grad.addColorStop(1, "rgba(255,255,255,0)");
      ctx.strokeStyle = grad;
      ctx.globalAlpha = a;
      ctx.lineWidth = 0.7;
      ctx.beginPath();
      ctx.moveTo(x - len, y);
      ctx.lineTo(x + len, y);
      ctx.moveTo(x, y - len);
      ctx.lineTo(x, y + len);
      ctx.stroke();
      ctx.globalAlpha = 1;
    };

    const drawMilkyWay = () => {
      // A soft band through the field. Crux sits inside it, which is the whole
      // reason the Southern Cross is hard to pick out from a bright city.
      ctx.save();
      ctx.translate(w * 0.5, h * 0.5);
      ctx.rotate((-28 * Math.PI) / 180 + (turn * Math.PI) / 180);
      const band = ctx.createLinearGradient(0, -h * 0.42, 0, h * 0.42);
      band.addColorStop(0, "rgba(120,150,220,0)");
      band.addColorStop(0.42, "rgba(132,158,226,0.055)");
      band.addColorStop(0.5, "rgba(150,172,235,0.075)");
      band.addColorStop(0.58, "rgba(132,158,226,0.055)");
      band.addColorStop(1, "rgba(120,150,220,0)");
      ctx.fillStyle = band;
      ctx.fillRect(-w, -h * 0.42, w * 2, h * 0.84);
      ctx.restore();
    };

    const frame = (now: number) => {
      if (!started) started = now;
      const elapsed = (now - started) / 1000;
      if (!calm) turn = elapsed * TURN_RATE;

      parallax.x += (parallax.tx - parallax.x) * 0.05;
      parallax.y += (parallax.ty - parallax.y) * 0.05;

      ctx.clearRect(0, 0, w, h);
      drawMilkyWay();

      const rad = (turn * Math.PI) / 180;

      for (const s of field) {
        const a = s.angle + rad;
        const x = pole.x + Math.cos(a) * s.radius + parallax.x * 22 * s.depth;
        const y = pole.y + Math.sin(a) * s.radius + parallax.y * 22 * s.depth;
        if (x < -20 || x > w + 20 || y < -20 || y > h + 20) continue;

        const tw = calm ? 1 : 0.72 + Math.sin(now / 780 + s.twinkle) * 0.28;
        const [r, g, b] = s.colour;
        ctx.beginPath();
        ctx.arc(x, y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${0.55 * tw * s.depth})`;
        ctx.fill();
      }

      // The named stars, drawn over the field and tracked by their buttons.
      for (const star of SOUTHERN_SKY.stars) {
        const { x, y } = placeNamed(star.x, star.y);
        const el = starRefs.current[star.id];
        if (el) el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;

        const [r, g, b] = spectralColour(star.spectral);
        const size = radiusFor(star.mag) * 2.1;
        const colour = `rgba(${r},${g},${b},1)`;
        const active = hovered === star.id;

        // Halo, tight rather than a wash.
        const halo = ctx.createRadialGradient(x, y, 0, x, y, size * 7);
        halo.addColorStop(0, `rgba(${r},${g},${b},${active ? 0.5 : 0.32})`);
        halo.addColorStop(0.45, `rgba(${r},${g},${b},0.07)`);
        halo.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(x, y, size * 7, 0, Math.PI * 2);
        ctx.fill();

        if (star.mag < 1.7) spike(x, y, size * (active ? 11 : 8), active ? 0.5 : 0.33, colour);

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = colour;
        ctx.fill();
      }

      // Constellation lines, drawn in over the first couple of seconds.
      const progress = calm ? 1 : Math.min(1, Math.max(0, (elapsed - 0.5) / 1.6));
      if (progress > 0) {
        ctx.lineWidth = 0.7;
        ctx.strokeStyle = "rgba(150,180,255,0.42)";
        for (const [aId, bId] of SOUTHERN_SKY.lines) {
          const s1 = SOUTHERN_SKY.stars.find((s) => s.id === aId)!;
          const s2 = SOUTHERN_SKY.stars.find((s) => s.id === bId)!;
          const p1 = placeNamed(s1.x, s1.y);
          const p2 = placeNamed(s2.x, s2.y);
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(
            p1.x + (p2.x - p1.x) * progress,
            p1.y + (p2.y - p1.y) * progress,
          );
          ctx.stroke();
        }
      }

      meteors = meteors.filter((m) => m.life > 0);
      for (const m of meteors) {
        const fade = m.life / m.max;
        const tail = ctx.createLinearGradient(m.x, m.y, m.x - m.vx * 14, m.y - m.vy * 14);
        tail.addColorStop(0, `rgba(255,255,255,${fade})`);
        tail.addColorStop(1, "rgba(255,255,255,0)");
        ctx.strokeStyle = tail;
        ctx.lineWidth = 1.5;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - m.vx * 14, m.y - m.vy * 14);
        ctx.stroke();
        m.x += m.vx;
        m.y += m.vy;
        m.life -= 1;
      }

      raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      parallax.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      parallax.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onDown = (e: PointerEvent) => {
      const angle = Math.PI * 0.74 + (Math.random() - 0.5) * 0.35;
      const speed = 8 + Math.random() * 5;
      meteors.push({
        x: e.clientX,
        y: e.clientY,
        vx: Math.cos(angle) * -speed,
        vy: Math.sin(angle) * -speed,
        life: 52,
        max: 52,
      });
    };

    build();
    raf = requestAnimationFrame(frame);

    window.addEventListener("resize", build);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", build);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open, hovered]);

  const active = SOUTHERN_SKY.stars.find((s) => s.id === hovered);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-modal="true"
          aria-label="The southern sky over Johannesburg"
          className="fixed inset-0 z-[70] bg-[#03050a]"
        >
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

          {/* Vignette, so the instruments sit on something. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.55) 100%)",
            }}
          />

          {/* Focusable stand-ins, tracked onto the drawn stars each frame. */}
          <div className="absolute inset-0">
            {SOUTHERN_SKY.stars.map((star) => (
              <button
                key={star.id}
                type="button"
                ref={(el) => {
                  starRefs.current[star.id] = el;
                }}
                onMouseEnter={() => setHovered(star.id)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(star.id)}
                onBlur={() => setHovered(null)}
                aria-label={`${star.name}, ${BAYER[star.id]}, magnitude ${star.mag}, ${star.ly} light years`}
                className="absolute left-0 top-0 h-11 w-11 rounded-full outline-none focus-visible:ring-1 focus-visible:ring-white/60"
              />
            ))}
          </div>

          {/* The readout for whichever star is under the pointer. */}
          <motion.div
            initial={false}
            animate={{ opacity: active ? 1 : 0, y: active ? 0 : 6 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="pointer-events-none absolute right-6 top-20 sm:right-12 text-right font-mono"
          >
            <p className="text-sm tracking-[0.18em] text-white/90 uppercase">
              {active?.name}
            </p>
            <p className="mt-1 text-[0.7rem] tracking-[0.18em] text-white/40">
              {active && BAYER[active.id]} · {active?.spectral}
            </p>
            <p className="mt-0.5 text-[0.7rem] tracking-[0.18em] text-white/40">
              mag {active?.mag.toFixed(1)} · {active?.ly} ly
            </p>
          </motion.div>

          {/* Instruments. */}
          <div className="absolute bottom-10 left-6 right-6 sm:left-12 sm:right-12 pointer-events-none">
            <p className="min-h-[3.2em] max-w-2xl font-reader text-[clamp(17px,2.4vw,24px)] italic leading-[1.35] text-white/85">
              {typed}
              <span className="ml-0.5 animate-blink not-italic text-orange-400">
                |
              </span>
            </p>
            <div className="mt-5 flex flex-wrap justify-between gap-x-8 gap-y-1 font-mono text-[11px] uppercase tracking-[0.12em] text-white/45">
              <span>LST {lst}</span>
              <span>26.2041°S 28.0473°E</span>
              <span>
                {moon.name} · {Math.round(moon.illumination * 100)}%
              </span>
              <span className="hidden sm:inline">
                Field rotation ×{Math.round(TURN_RATE / 0.004167)}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={close}
            aria-label="Close the sky"
            className="absolute right-6 top-6 rounded-full border border-white/20 p-2.5 text-white/60 transition-colors hover:border-white/70 hover:text-white"
          >
            <CloseIcon size={18} />
          </button>

          <p className="pointer-events-none absolute left-1/2 top-7 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/25">
            Click for a meteor · Esc to return
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SkyEgg;
