import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DrawablyCard,
  DrawablyCircle,
  DrawablyHighlight,
  DrawablyUnderline,
} from "drawably/react";

/**
 * The hand-drawn accent layer.
 *
 * Drawably is used as ink on top of a clean page, never as the page itself —
 * a few marks that look annotated by hand, at a roughness low enough to read
 * as deliberate rather than cartoon.
 *
 * Two knobs live here so every mark stays consistent:
 *   - ink follows the theme, so strokes never sit at 20% contrast in dark mode
 *   - `boil` (the animated line jitter) is off unless the reader opts in, and
 *     is always off when they've asked for reduced motion
 *
 * Sketch mode is the one easter egg: press `~` and the ink gets louder.
 */

interface SketchState {
  /** Bumped on every toggle, so the confirmation can re-announce itself. */
  pulse: number;
  /** Reader has turned the ink up via the `~` key. */
  loud: boolean;
  toggleLoud: () => void;
  /** Stroke colour for the current theme. */
  ink: string;
  roughness: number;
  /** Frames per second of line jitter. 0 is a still pen. */
  boil: number;
}

const SketchContext = createContext<SketchState>({
  pulse: 0,
  loud: false,
  toggleLoud: () => {},
  ink: "#f97316",
  roughness: 0.8,
  boil: 0,
});

export const useSketch = () => useContext(SketchContext);

const STORAGE_KEY = "sketch-mode";

export const SketchProvider = ({ children }: { children: ReactNode }) => {
  const [loud, setLoud] = useState(false);
  const [pulse, setPulse] = useState(0);
  const [isDark, setIsDark] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setLoud(localStorage.getItem(STORAGE_KEY) === "on");
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, loud ? "on" : "off");
    document.documentElement.classList.toggle("sketch-loud", loud);
  }, [loud]);

  // `~` anywhere outside a field turns the ink up.
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
      ink: isDark ? "#fbbf24" : "#1f2937",
      roughness: loud ? 1.9 : 0.8,
      boil: loud && !reducedMotion ? 4 : 0,
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
 * Without it the toggle is silent whenever no ink is on screen, which reads as
 * a broken shortcut rather than a quiet one.
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
      className={`fixed left-1/2 -translate-x-1/2 bottom-8 z-[60] pointer-events-none
        px-4 py-2 rounded-full text-sm font-medium
        bg-gray-900/90 dark:bg-white/10 text-white backdrop-blur-xl
        border border-white/10 transition-all duration-300
        ${shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
    >
      {loud ? "Pen down — sketch mode on" : "Pen up"}
    </div>
  );
};

type MarkProps = { children: ReactNode; className?: string; seed?: number };

/** Hand-drawn rule under a phrase. */
export const InkUnderline = ({ children, className, seed }: MarkProps) => {
  const { ink, roughness, boil } = useSketch();
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
export const InkCircle = ({ children, className, seed }: MarkProps) => {
  const { ink, roughness, boil } = useSketch();
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
export const InkHighlight = ({ children, className, seed }: MarkProps) => {
  const { ink, roughness, boil } = useSketch();
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
export const InkCard = ({ children, className, seed }: MarkProps) => {
  const { ink, roughness, boil } = useSketch();
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
