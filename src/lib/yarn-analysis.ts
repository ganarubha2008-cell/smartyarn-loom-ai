/**
 * SmartYarn AI — yarn analysis service (DEMO MODE)
 * -----------------------------------------------------------------------------
 * This module contains the single entry point used by the UI:
 *
 *    analyzeYarnImage(file) -> Promise<YarnAnalysisResult>
 *
 * IMPORTANT (college project honesty note):
 * No trained machine-learning model is running here. The result is produced by
 * a deterministic heuristic that inspects basic image statistics (average
 * brightness, colour spread and edge/texture "noise") drawn on a canvas in the
 * browser. It is clearly labelled DEMO everywhere in the UI.
 *
 * TO PLUG IN A REAL MODEL LATER:
 * Replace the body of `runDemoAnalysis` with a call to your model endpoint,
 * e.g.
 *
 *    const body = new FormData();
 *    body.append("image", file);
 *    const res = await fetch(import.meta.env.VITE_YARN_MODEL_URL, { method: "POST", body });
 *    const data = await res.json(); // { label, confidence }
 *    return { ...data, mode: "model" };
 *
 * The rest of the application (detection page, dashboard, assistance flow)
 * depends only on the YarnAnalysisResult shape below, so nothing else changes.
 */

export type YarnLabel = "normal" | "change_required";

export interface YarnAnalysisResult {
  id: string;
  label: YarnLabel;
  labelText: string;
  confidence: number; // 0 - 100
  recommendation: string;
  metrics: {
    brightness: number;
    uniformity: number;
    fibreNoise: number;
  };
  mode: "demo" | "model";
  imageName: string;
  createdAt: string; // ISO
}

const HISTORY_KEY = "smartyarn.history.v1";
const ANALYSING_DELAY_MS = 1800;

function clamp(value: number, min = 0, max = 100) {
  return Math.min(max, Math.max(min, value));
}

/** Draw the image on a small canvas and compute simple statistics. */
async function readImageStats(source: File | string) {
  const url = typeof source === "string" ? source : URL.createObjectURL(source);

  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.crossOrigin = "anonymous";
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error("Could not read the selected image."));
      el.src = url;
    });

    const size = 96;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas is not available in this browser.");
    ctx.drawImage(img, 0, 0, size, size);
    const { data } = ctx.getImageData(0, 0, size, size);

    const grey: number[] = [];
    let saturationSum = 0;
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i], g = data[i + 1], b = data[i + 2];
      grey.push((r * 0.299 + g * 0.587 + b * 0.114) / 255);
      const max = Math.max(r, g, b), min = Math.min(r, g, b);
      saturationSum += max === 0 ? 0 : (max - min) / max;
    }

    const mean = grey.reduce((a, b) => a + b, 0) / grey.length;
    const variance = grey.reduce((a, b) => a + (b - mean) ** 2, 0) / grey.length;

    // Horizontal gradient magnitude ~ fibre fuzziness / broken-thread texture.
    let edgeSum = 0;
    for (let y = 0; y < size; y++) {
      for (let x = 1; x < size; x++) {
        edgeSum += Math.abs(grey[y * size + x] - grey[y * size + x - 1]);
      }
    }
    const edgeMean = edgeSum / (size * (size - 1));

    return {
      brightness: clamp(mean * 100),
      uniformity: clamp(100 - Math.sqrt(variance) * 260),
      fibreNoise: clamp(edgeMean * 900),
      saturation: clamp((saturationSum / grey.length) * 100),
    };
  } finally {
    if (typeof source !== "string") URL.revokeObjectURL(url);
  }
}

function runDemoAnalysis(stats: Awaited<ReturnType<typeof readImageStats>>) {
  // Heuristic "wear score": fuzzy texture + low uniformity + dull/dark surface
  // are treated as signs of a depleted or damaged yarn.
  const wearScore = clamp(
    stats.fibreNoise * 0.55 + (100 - stats.uniformity) * 0.3 + (100 - stats.brightness) * 0.15,
  );

  const label: YarnLabel = wearScore >= 48 ? "change_required" : "normal";
  const distance = Math.abs(wearScore - 48);
  const confidence = Number(clamp(72 + distance * 0.85, 72, 98.6).toFixed(1));

  return { label, confidence, wearScore };
}

export interface AnalyzeOptions {
  imageName?: string;
  /** Skip the simulated processing delay (used by tests). */
  instant?: boolean;
}

/**
 * Analyse a yarn image and return a classification result.
 * Accepts a File (upload) or a URL/data-URL string (built-in demo samples).
 */
export async function analyzeYarnImage(
  source: File | string,
  options: AnalyzeOptions = {},
): Promise<YarnAnalysisResult> {
  const stats = await readImageStats(source);
  if (!options.instant) {
    await new Promise((resolve) => setTimeout(resolve, ANALYSING_DELAY_MS));
  }

  const { label, confidence } = runDemoAnalysis(stats);

  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    label,
    labelText: label === "normal" ? "Normal Yarn" : "Yarn Change Required",
    confidence,
    recommendation:
      label === "normal"
        ? "Yarn condition looks acceptable. Continue weaving and re-check at the next scheduled inspection."
        : "Depletion / damage indicators detected. Plan a yarn change and open the guided Yarn Change Assistance workflow.",
    metrics: {
      brightness: Math.round(stats.brightness),
      uniformity: Math.round(stats.uniformity),
      fibreNoise: Math.round(stats.fibreNoise),
    },
    mode: "demo",
    imageName: options.imageName ?? (typeof source === "string" ? "demo-sample" : source.name),
    createdAt: new Date().toISOString(),
  };
}

/* --------------------------- local demo history --------------------------- */

export function getHistory(): YarnAnalysisResult[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(HISTORY_KEY);
    const parsed = raw ? (JSON.parse(raw) as YarnAnalysisResult[]) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveAnalysis(result: YarnAnalysisResult): YarnAnalysisResult[] {
  const next = [result, ...getHistory()].slice(0, 50);
  if (typeof window !== "undefined") {
    window.localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event("smartyarn:history"));
  }
  return next;
}

export function clearHistory() {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(HISTORY_KEY);
    window.dispatchEvent(new Event("smartyarn:history"));
  }
}

export interface HistoryStats {
  total: number;
  normal: number;
  changeRequired: number;
  averageConfidence: number;
}

export function summarise(history: YarnAnalysisResult[]): HistoryStats {
  const total = history.length;
  const normal = history.filter((h) => h.label === "normal").length;
  const changeRequired = total - normal;
  const averageConfidence = total
    ? Number((history.reduce((a, h) => a + h.confidence, 0) / total).toFixed(1))
    : 0;
  return { total, normal, changeRequired, averageConfidence };
}
