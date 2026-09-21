import React, { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  DrawablyBadge,
  DrawablyCard,
  DrawablyCircle,
  DrawablyDivider,
  DrawablyHighlight,
  DrawablyUnderline,
} from "drawably/react";
import {
  INKS,
  SketchContext,
  useSketch,
  SKETCH_STORAGE_KEY,
  type InkTone,
  type SketchState,
} from "./sketchContext";

/**
 * The hand-drawn accent layer.
 *
 * The ink is alive by default: every mark keeps a slow line boil, so the page
 * reads as drawn rather than printed. `~` is not the on switch any more — it
 * pushes the pen harder, raising roughness and jitter until the whole site
 * looks sketched in a hurry.
 *
 * Reduced motion still wins outright: the boil drops to zero and the marks sit
 * still, in both states.
 *
 * Only components are exported from this file; the hook and context live in
 * sketchContext.ts so Fast Refresh can keep state across edits.
 */

export const SketchProvider = ({ children }: { children: ReactNode }) => {
  const [loud, setLoud] = useState(false);
  const [pulse, setPulse] = useState(0);
  const [isDark, setIsDark] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setLoud(localStorage.getItem(SKETCH_STORAGE_KEY) === "on");
  }, []);

  useEffect(() => {
    localStorage.setItem(SKETCH_STORAGE_KEY, loud ? "on" : "off");
    document.documentElement.classList.toggle("sketch-loud", loud);
  }, [loud]);

  // `~` anywhere outside a field pushes the pen harder.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "~" && e.key !== "`") return;
      const el = e.target as HTMLElement | null;
      if (el && /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) return;
      if (el?.isContentEditable) return;
      e.preventDefault();
      setLoud((prev) => !prev);
      setPulse((n) => n + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Track the theme class App sets, so ink can follow it.
  useEffect(() => {
    const read = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const read = () => setReducedMotion(mq.matches);
    read();
    mq.addEventListener("change", read);
    return () => mq.removeEventListener("change", read);
  }, []);

  const value = useMemo<SketchState>(
    () => ({
      pulse,
      loud,
      toggleLoud: () => {
        setLoud((prev) => !prev);
        setPulse((n) => n + 1);
      },
      ink: INKS.amber[isDark ? 1 : 0],
      inkFor: (tone: InkTone = "default") => INKS[tone][isDark ? 1 : 0],
      roughness: loud ? 2.1 : 0.9,
      // Alive by default — a slow boil at rest, a fast one when pushed.
      boil: reducedMotion ? 0 : loud ? 6 : 2,
    }),
    [pulse, loud, isDark, reducedMotion],
  );

  return (
    <SketchContext.Provider value={value}>
      {children}
      <SketchToast />
    </SketchContext.Provider>
  );
};

/**
 * Brief confirmation that the ~ key did something.
 *
 * Without it the change is easy to miss whenever no ink is on screen, which
 * reads as a broken shortcut rather than a quiet one.
 */
const SketchToast = () => {
  const { pulse, loud } = useSketch();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (pulse === 0) return;
    setShown(true);
    const timer = setTimeout(() => setShown(false), 1600);
    return () => clearTimeout(timer);
  }, [pulse]);

  return (
    <div
      role="status"
      aria-live="polite"
      hidden={!shown}
      className={`fixed left-1/2 -translate-x-1/2 bottom-28 z-[60] pointer-events-none
        px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
        bg-gray-900/90 dark:bg-white/10 text-white backdrop-blur-xl
        border border-white/10 transition-all duration-300
        ${shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
    >
      {loud ? "Pressing harder" : "Easing off"}
    </div>
  );
};

type MarkProps = {
  children: ReactNode;
  className?: string;
  seed?: number;
  /** Which pen. Omitted marks use the default ink. */
  tone?: InkTone;
};

/** Hand-drawn rule under a phrase. */
export const InkUnderline = ({ children, className, seed, tone }: MarkProps) => {
  const { inkFor, roughness, boil } = useSketch();
  const ink = inkFor(tone);
  return (
    <DrawablyUnderline
      stroke={ink}
      roughness={roughness}
      boil={boil}
      seed={seed}
      className={className}
    >
      {children}
    </DrawablyUnderline>
  );
};

/**
 * Ring around a number worth noticing.
 *
 * Kept to numerals and very short strings — an ellipse stretched around a long
 * phrase reads as a mistake rather than an annotation. Phrases get an underline.
 */
export const InkCircle = ({ children, className, seed, tone }: MarkProps) => {
  const { inkFor, roughness, boil } = useSketch();
  const ink = inkFor(tone);
  return (
    <DrawablyCircle
      stroke={ink}
      roughness={roughness}
      boil={boil}
      seed={seed}
      className={`inline-block mx-2 px-2 ${className ?? ""}`}
    >
      {children}
    </DrawablyCircle>
  );
};

/** Marker pass over a phrase. */
export const InkHighlight = ({ children, className, seed, tone }: MarkProps) => {
  const { inkFor, roughness, boil } = useSketch();
  const ink = inkFor(tone);
  return (
    <DrawablyHighlight
      stroke={ink}
      roughness={roughness}
      boil={boil}
      seed={seed}
      className={className}
    >
      {children}
    </DrawablyHighlight>
  );
};

/** Sketched panel, replacing a gradient box. */
export const InkCard = ({ children, className, seed, tone }: MarkProps) => {
  const { inkFor, roughness, boil } = useSketch();
  const ink = inkFor(tone);
  return (
    <DrawablyCard
      stroke={ink}
      roughness={roughness}
      boil={boil}
      seed={seed}
      className={className}
    >
      {children}
    </DrawablyCard>
  );
};

/** Sketched badge, for a short status word. */
export const InkBadge = ({
  children,
  className,
  seed,
  tone,
  variant = "outline",
}: MarkProps & { variant?: "outline" | "scribble" }) => {
  const { inkFor, roughness, boil } = useSketch();
  return (
    <DrawablyBadge
      stroke={inkFor(tone)}
      roughness={roughness}
      boil={boil}
      seed={seed}
      variant={variant}
      className={className}
    >
      {children}
    </DrawablyBadge>
  );
};

/** Drawn rule, in place of a hairline border. */
export const InkDivider = ({
  className,
  seed,
  tone,
}: Omit<MarkProps, "children">) => {
  const { inkFor, roughness, boil } = useSketch();
  return (
    <DrawablyDivider
      stroke={inkFor(tone)}
      roughness={roughness}
      boil={boil}
      seed={seed}
      className={className}
    />
  );
};
