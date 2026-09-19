/**
 * Small astronomy helpers. Johannesburg: 26.2041°S, 28.0473°E.
 * Local sidereal time from the standard low-precision formula (Meeus).
 */
export const JHB = { lat: -26.2041, lon: 28.0473 };

export function localSiderealTime(date = new Date(), lon = JHB.lon) {
  const jd = date.getTime() / 86400000 + 2440587.5;
  const d = jd - 2451545.0;
  let gmst = 280.46061837 + 360.98564736629 * d;
  gmst = ((gmst % 360) + 360) % 360;
  const lst = (gmst + lon + 360) % 360;
  const hours = lst / 15;
  const h = Math.floor(hours);
  const m = Math.floor((hours - h) * 60);
  const s = Math.floor(((hours - h) * 60 - m) * 60);
  return {
    deg: lst,
    text: `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`,
  };
}

export interface Star {
  id: string;
  name: string;
  x: number;
  y: number;
  mag: number;
}

/**
 * Crux, the Pointers, and Canopus. Coordinates are relative screen positions
 * (unit square) arranged to match the true sky pattern as seen from the
 * southern hemisphere, with real names and visual magnitudes.
 */
export const SOUTHERN_SKY: { stars: Star[]; lines: [string, string][] } = {
  stars: [
    { id: "acrux", name: "Acrux (α Cru)", x: 0.44, y: 0.66, mag: 0.8 },
    { id: "mimosa", name: "Mimosa (β Cru)", x: 0.35, y: 0.5, mag: 1.3 },
    { id: "gacrux", name: "Gacrux (γ Cru)", x: 0.49, y: 0.36, mag: 1.6 },
    { id: "imai", name: "Imai (δ Cru)", x: 0.57, y: 0.52, mag: 2.8 },
    { id: "ginan", name: "Ginan (ε Cru)", x: 0.51, y: 0.57, mag: 3.6 },
    { id: "rigil", name: "Rigil Kentaurus (α Cen)", x: 0.16, y: 0.62, mag: -0.3 },
    { id: "hadar", name: "Hadar (β Cen)", x: 0.24, y: 0.56, mag: 0.6 },
    { id: "canopus", name: "Canopus (α Car)", x: 0.78, y: 0.3, mag: -0.7 },
  ],
  lines: [
    ["acrux", "gacrux"],
    ["mimosa", "imai"],
    ["rigil", "hadar"],
  ],
};

/**
 * Moon phase from the mean synodic month, anchored to the new moon of
 * 2000-01-06 18:14 UTC. Good to within about a day. Returns phase in [0, 1):
 * 0 new, 0.25 first quarter, 0.5 full.
 */
const SYNODIC = 29.530588853;
const EPOCH_JD = 2451550.26;

export function moonPhase(date = new Date()) {
  const jd = date.getTime() / 86400000 + 2440587.5;
  const age = (((jd - EPOCH_JD) % SYNODIC) + SYNODIC) % SYNODIC;
  const phase = age / SYNODIC;
  const illumination = (1 - Math.cos(2 * Math.PI * phase)) / 2;
  const names: [number, string][] = [
    [0.0339, "New moon"],
    [0.2161, "Waxing crescent"],
    [0.2839, "First quarter"],
    [0.4661, "Waxing gibbous"],
    [0.5339, "Full moon"],
    [0.7161, "Waning gibbous"],
    [0.7839, "Last quarter"],
    [0.9661, "Waning crescent"],
    [1.0001, "New moon"],
  ];
  const name = names.find(([edge]) => phase < edge)![1];
  const daysToFull = ((0.5 - phase + 1) % 1) * SYNODIC;
  return { phase, illumination, name, age, daysToFull };
}
