import { createContext, useContext } from "react";

/**
 * Sketch state lives in its own module, apart from the components that read it.
 *
 * Vite's Fast Refresh can only keep a module's state when that module exports
 * components and nothing else. Exporting the `useSketch` hook alongside the
 * ink components invalidated the whole file on every edit, so the hook and the
 * context sit here and `sketch.tsx` exports components only.
 */
export interface SketchState {
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

export const SketchContext = createContext<SketchState>({
  pulse: 0,
  loud: false,
  toggleLoud: () => {},
  ink: "#f97316",
  roughness: 0.9,
  boil: 2,
});

export const useSketch = () => useContext(SketchContext);

export const SKETCH_STORAGE_KEY = "sketch-mode";
