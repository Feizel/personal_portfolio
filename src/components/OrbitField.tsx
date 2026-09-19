import React, { useEffect, useRef } from "react";

/**
 * The hero's background: a small gravitational system, integrated live.
 *
 * Bodies are placed on near-circular orbits around a central mass and then
 * left alone — their paths are the result of the integration, not a scripted
 * animation, so the field never loops. The pointer adds a second attractor,
 * which bends orbits as it passes and lets them settle again afterwards.
 *
 * It is deliberately quiet: low contrast, no colour beyond a warm ember, and
 * sized so the type always wins. Everything here is guarded — it renders a
 * single static frame under reduced motion, takes no pointer force on touch,
 * and stops entirely when the tab is hidden or the section scrolls away.
 */

interface Body {
  x: number;
  y: number;
  vx: number;
  vy: number;
  mass: number;
  radius: number;
  /** Trail length, in frames. Heavier bodies leave longer streaks. */
  tail: number;
  history: { x: number; y: number }[];
}

const COUNT = 110;
/** Softening constant: keeps the 1/r^2 force finite near the centre. */
const EPSILON = 26;
const CENTRAL_MASS = 1500;
const POINTER_MASS = 900;

interface OrbitFieldProps {
  /**
   * Fired when the reader holds the pointer at the centre of the system long
   * enough to collapse it. The one unlabelled thing on the page.
   */
  onDiscover?: () => void;
}

const OrbitField = ({ onDiscover }: OrbitFieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const discover = useRef(onDiscover);
  discover.current = onDiscover;

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(pointer: fine)");

    let width = 0;
    let height = 0;
    let bodies: Body[] = [];
    let raf = 0;
    let running = false;
    let visible = true;

    const pointer = { x: 0, y: 0, active: false };

    /**
     * Holding still near the centre winds the central mass up, which visibly
     * pulls the orbits inward. Hold it through the collapse and the sky opens.
     */
    const DWELL_RADIUS = 78;
    const DWELL_MS = 1150;
    let dwellFor = 0;
    let fired = false;
    let collapse = 0; // 0 at rest, 1 fully collapsed

    const isDark = () => document.documentElement.classList.contains("dark");

    /** Where the central mass sits. Right of centre, clear of the headline. */
    const centre = () => ({
      x: width * (width < 768 ? 0.5 : 0.8),
      y: height * 0.48,
    });

    const seed = () => {
      const { x: cx, y: cy } = centre();
      bodies = Array.from({ length: COUNT }, () => {
        // Spread orbits across the panel, biased outward so the centre stays
        // legible behind the headline.
        const radius = 60 + Math.pow(Math.random(), 0.7) * (Math.min(width, height) * 0.62);
        const angle = Math.random() * Math.PI * 2;
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius * 0.52; // flattened, like a disc

        // Circular-orbit speed for this radius, with a little scatter so the
        // disc has some thickness instead of reading as a single ring.
        const speed = Math.sqrt(CENTRAL_MASS / (radius + EPSILON)) * (0.86 + Math.random() * 0.28);
        const mass = 0.4 + Math.random() * 1.1;

        return {
          x,
          y,
          vx: -Math.sin(angle) * speed,
          vy: Math.cos(angle) * speed * 0.52,
          mass,
          radius: 0.5 + mass * 0.7,
          tail: Math.round(6 + mass * 12),
          history: [],
        };
      });
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const step = (dt: number) => {
      const { x: cx, y: cy } = centre();

      // Track how long the pointer has been parked on the centre.
      if (pointer.active && !fired) {
        const pd = Math.hypot(pointer.x - cx, (pointer.y - cy) * 1.6);
        if (pd < DWELL_RADIUS) {
          dwellFor += dt * 16.67;
          if (dwellFor >= DWELL_MS) {
            fired = true;
            discover.current?.();
          }
        } else {
          dwellFor = Math.max(0, dwellFor - dt * 40);
        }
      } else if (!pointer.active) {
        dwellFor = Math.max(0, dwellFor - dt * 40);
      }
      collapse = Math.min(1, dwellFor / DWELL_MS);

      // The mass grows as the system is held, so the orbits tighten visibly.
      const mass = CENTRAL_MASS * (1 + collapse * 5);

      for (const b of bodies) {
        // Central mass.
        let dx = cx - b.x;
        let dy = (cy - b.y) * 1.9; // matches the flattened disc
        let d2 = dx * dx + dy * dy + EPSILON * EPSILON;
        let inv = mass / (d2 * Math.sqrt(d2));
        b.vx += dx * inv * dt;
        b.vy += dy * inv * dt;

        // The pointer, while it is over the panel.
        if (pointer.active) {
          dx = pointer.x - b.x;
          dy = pointer.y - b.y;
          d2 = dx * dx + dy * dy + EPSILON * EPSILON;
          inv = POINTER_MASS / (d2 * Math.sqrt(d2));
          b.vx += dx * inv * dt;
          b.vy += dy * inv * dt;
        }

        b.x += b.vx * dt;
        b.y += b.vy * dt;

        b.history.push({ x: b.x, y: b.y });
        if (b.history.length > b.tail) b.history.shift();

        // A body thrown clear of the panel is re-seeded rather than chased,
        // so the system keeps its population without a hard boundary.
        const margin = 120;
        if (b.x < -margin || b.x > width + margin || b.y < -margin || b.y > height + margin) {
          const angle = Math.random() * Math.PI * 2;
          const radius = Math.min(width, height) * 0.55;
          b.x = cx + Math.cos(angle) * radius;
          b.y = cy + Math.sin(angle) * radius * 0.52;
          const speed = Math.sqrt(CENTRAL_MASS / (radius + EPSILON));
          b.vx = -Math.sin(angle) * speed;
          b.vy = Math.cos(angle) * speed * 0.52;
          b.history.length = 0;
        }
      }
    };

    const draw = () => {
      const dark = isDark();
      ctx.clearRect(0, 0, width, height);

      for (const b of bodies) {
        const lift = 1 + collapse * 2.2;
        const alpha = (dark ? 0.16 + b.mass * 0.3 : 0.1 + b.mass * 0.18) * lift;

        if (b.history.length > 1) {
          ctx.beginPath();
          ctx.moveTo(b.history[0].x, b.history[0].y);
          for (let i = 1; i < b.history.length; i++) {
            ctx.lineTo(b.history[i].x, b.history[i].y);
          }
          ctx.strokeStyle = dark
            ? `rgba(249, 115, 22, ${alpha * 0.62})`
            : `rgba(120, 113, 108, ${alpha * 0.5})`;
          ctx.lineWidth = b.radius * 0.8;
          ctx.lineCap = "round";
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = dark
          ? `rgba(251, 191, 36, ${alpha + 0.22})`
          : `rgba(68, 64, 60, ${alpha + 0.18})`;
        ctx.fill();
      }
    };

    let last = performance.now();
    const loop = (now: number) => {
      // Clamped so a backgrounded tab cannot resume with a huge timestep and
      // fling the whole system apart.
      const dt = Math.min((now - last) / 16.67, 2.5);
      last = now;
      step(dt);
      draw();
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || calm.matches) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!fine.matches) return;
      const rect = wrap.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active =
        pointer.x >= 0 &&
        pointer.y >= 0 &&
        pointer.x <= rect.width &&
        pointer.y <= rect.height;
      if (!pointer.active) {
        dwellFor = 0;
        fired = false;
      }
    };
    const onPointerLeave = () => {
      pointer.active = false;
      dwellFor = 0;
      fired = false;
    };

    const onVisibility = () => {
      visible = !document.hidden;
      if (visible) start();
      else stop();
    };

    resize();

    if (calm.matches) {
      // One settled frame: the shape of the system, without the motion.
      for (let i = 0; i < 90; i++) step(1);
      draw();
    } else {
      start();
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && visible) start();
        else stop();
      },
      { threshold: 0 },
    );
    observer.observe(wrap);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(wrap);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    wrap.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      wrap.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-auto absolute inset-0 overflow-hidden"
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
};

export default OrbitField;
