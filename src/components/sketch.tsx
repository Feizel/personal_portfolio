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
      setLoud((prev) => !prev);
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
      loud,
      toggleLoud: () => setLoud((prev) => !prev),
      ink: isDark ? "#fbbf24" : "#1f2937",
      roughness: loud ? 1.9 : 0.8,
      boil: loud && !reducedMotion ? 4 : 0,
    }),
    [loud, isDark, reducedMotion],
  );

  return (
    <SketchContext.Provider value={value}>{children}</SketchContext.Provider>
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
