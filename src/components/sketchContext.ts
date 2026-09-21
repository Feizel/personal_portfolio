import { createContext, useContext } from "react";

/**
 * Named inks. One pen was enough when the site had marks in two places; now
 * that ink carries the nav and the builds index, a single amber would read as
 * a theme colour rather than as drawing.
 *
 * Each tone is a light/dark pair. They are deliberately not the site's orange:
 * the orange is UI, the ink is annotation, and the two should never be
 * mistaken for each other.
 */
export type InkTone =
  | "default"
  | "amber"
  | "teal"
  | "violet"
  | "rose"
  | "blue";

export const INKS: Record<InkTone, [light: string, dark: string]> = {
  default: ["#1f2937", "#e5e7eb"],
  amber: ["#b45309", "#fbbf24"],
  teal: ["#0f766e", "#2dd4bf"],
  violet: ["#6d28d9", "#a78bfa"],
  rose: ["#be123c", "#fb7185"],
  blue: ["#1d4ed8", "#60a5fa"],
};

export interface SketchState {
  pulse: number;
  loud: boolean;
  toggleLoud: () => void;
  /** The default ink, for marks that do not ask for a colour. */
  ink: string;
  /** Resolves a named tone against the current theme. */
  inkFor: (tone?: InkTone) => string;
  roughness: number;
  /** Frames per second of line jitter. 0 is a still pen. */
  boil: number;
}

export const SketchContext = createContext<SketchState>({
  pulse: 0,
  loud: false,
  toggleLoud: () => {},
  ink: INKS.default[1],
  inkFor: () => INKS.default[1],
  roughness: 0.9,
  boil: 2,
});

export const useSketch = () => useContext(SketchContext);

export const SKETCH_STORAGE_KEY = "sketch-mode";
