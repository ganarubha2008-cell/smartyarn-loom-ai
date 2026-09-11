import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, CheckCircle2, ImagePlus, Loader2, RotateCcw, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

import sampleNormal from "@/assets/sample-normal.jpg";
import sampleWorn from "@/assets/sample-worn.jpg";
import { DemoNotice } from "@/components/demo-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { analyzeYarnImage, saveAnalysis, type YarnAnalysisResult } from "@/lib/yarn-analysis";

export const Route = createFileRoute("/detection")({
  head: () => ({
    meta: [
      { title: "AI Yarn Detection — SmartYarn AI" },
      {
        name: "description",
        content:
          "Upload or drag a yarn image and run the SmartYarn AI demonstration analysis to see whether a yarn change is required, with a confidence score.",
      },
      { property: "og:title", content: "AI Yarn Detection — SmartYarn AI" },
      {
        property: "og:description",
        content: "Run the demo yarn condition analysis and get a status, confidence and recommendation.",
      },
    ],
  }),
  component: DetectionPage,
});

const samples = [
  { src: sampleNormal, label: "Sample A — healthy spool" },
  { src: sampleWorn, label: "Sample B — worn / depleted" },
];

function DetectionPage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [source, setSource] = useState<File | string | null>(null);
  const [imageName, setImageName] = useState("");
  const [analysing, setAnalysing] = useState(false);
  const [result, setResult] = useState<YarnAnalysisResult | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function selectFile(file: File) {
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file (JPG or PNG).");
      return;
    }
    setResult(null);
    setSource(file);
    setImageName(file.name);
    const reader = new FileReader();
    reader.onload = () => setPreview(String(reader.result));
    reader.readAsDataURL(file);
  }

  function selectSample(src: string, label: string) {
    setResult(null);
    setSource(src);
    setPreview(src);
    setImageName(label);
  }

  async function handleAnalyse() {
    if (!source) {
      toast.error("Select or upload a yarn image first.");
      return;
    }
    setAnalysing(true);
    setResult(null);
    try {
      const res = await analyzeYarnImage(source, { imageName });
      setResult(res);
      saveAnalysis(res);
      toast.success(`Analysis complete — ${res.labelText}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Analysis failed. Try another image.");
    } finally {
      setAnalysing(false);
    }
  }

  function reset() {
    setPreview(null);
    setSource(null);
    setImageName("");
    setResult(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  const changeRequired = result?.label === "change_required";

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Module 1</p>
      <h1 className="mt-2 text-3xl font-bold sm:text-4xl">AI Yarn Detection</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Provide a close-up image of the yarn on the loom. The system computes brightness, uniformity
        and fibre-texture indicators, then classifies the yarn as <b>Normal Yarn</b> or{" "}
        <b>Yarn Change Required</b>.
      </p>

      <div className="mt-6">
        <DemoNotice />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Yarn image input</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                const file = e.dataTransfer.files?.[0];
                if (file) selectFile(file);
              }}
              className={`relative overflow-hidden rounded-xl border-2 border-dashed p-6 text-center transition-colors ${
                dragging ? "border-primary bg-primary/10" : "border-border bg-secondary/40"
              }`}
            >
              {preview ? (
                <div className="relative mx-auto max-w-md overflow-hidden rounded-lg">
                  <img
                    src={preview}
                    alt="Selected yarn preview"
                    loading="lazy"
                    className="w-full object-cover"
                  />
                  {analysing && (
                    <>
                      <div className="absolute inset-0 bg-background/40" />
                      <div className="absolute inset-x-0 top-0 h-16 animate-scan bg-primary/25 blur-md" />
                    </>
                  )}
                </div>
              ) : (
                <div className="py-10">
                  <span className="mx-auto grid size-12 place-items-center rounded-full bg-primary/15 text-primary">
                    <ImagePlus className="size-6" />
                  </span>
                  <p className="mt-4 font-medium">Drag and drop a yarn image here</p>
                  <p className="mt-1 text-sm text-muted-foreground">JPG or PNG, or browse below</p>
                </div>
              )}
            </div>

            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) selectFile(file);
              }}
            />

            <div className="flex flex-wrap gap-3">
              <Button variant="secondary" onClick={() => inputRef.current?.click()}>
                <Upload className="mr-1.5 size-4" /> Upload image
              </Button>
              <Button onClick={handleAnalyse} disabled={analysing || !source}>
                {analysing ? (
                  <>
                    <Loader2 className="mr-1.5 size-4 animate-spin" /> Analysing…
                  </>
                ) : (
                  "Analyse Yarn"
                )}
              </Button>
              <Button variant="outline" onClick={reset} disabled={analysing || !preview}>
                <RotateCcw className="mr-1.5 size-4" /> Reset
              </Button>
            </div>

            {imageName && (
              <p className="text-xs text-muted-foreground">
                Selected: <span className="text-foreground">{imageName}</span>
              </p>
            )}

            <div>
              <p className="text-sm font-semibold">Or use a built-in demo sample</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {samples.map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => selectSample(s.src, s.label)}
                    className="group overflow-hidden rounded-lg border border-border text-left transition-colors hover:border-primary"
                  >
                    <img
                      src={s.src}
                      alt={s.label}
                      loading="lazy"
                      width={768}
                      height={768}
                      className="h-28 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <span className="block px-3 py-2 text-xs text-muted-foreground">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Analysis result</CardTitle>
          </CardHeader>
          <CardContent>
            {analysing && (
              <div className="space-y-4 py-8 text-center">
                <Loader2 className="mx-auto size-8 animate-spin text-primary" />
                <p className="font-medium">Analysing yarn surface…</p>
                <p className="text-sm text-muted-foreground">
                  Measuring brightness, uniformity and fibre texture
                </p>
              </div>
            )}

            {!analysing && !result && (
              <p className="py-10 text-center text-sm text-muted-foreground">
                No analysis yet. Choose an image and press <b>Analyse Yarn</b>.
              </p>
            )}

            {!analysing && result && (
              <div className="space-y-5">
                <div
                  className={`rounded-xl border p-5 ${
                    changeRequired
                      ? "border-destructive/40 bg-destructive/10"
                      : "border-success/40 bg-success/10"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {changeRequired ? (
                      <AlertTriangle className="size-5 text-destructive" />
                    ) : (
                      <CheckCircle2 className="size-5 text-success" />
                    )}
                    <p className="font-display text-lg font-semibold">{result.labelText}</p>
                  </div>
                  <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                    Detection status
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Confidence</span>
                    <span className="font-semibold text-primary">{result.confidence}%</span>
                  </div>
                  <Progress value={result.confidence} className="mt-2" />
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  {[
                    { label: "Brightness", value: result.metrics.brightness },
                    { label: "Uniformity", value: result.metrics.uniformity },
                    { label: "Fibre noise", value: result.metrics.fibreNoise },
                  ].map((m) => (
                    <div key={m.label} className="rounded-lg bg-secondary/60 p-3">
                      <p className="font-display text-lg font-semibold">{m.value}</p>
                      <p className="text-[11px] text-muted-foreground">{m.label}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-lg border border-border bg-secondary/40 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Recommendation
                  </p>
                  <p className="mt-1.5 text-sm">{result.recommendation}</p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {changeRequired && (
                    <Button asChild>
                      <Link to="/assistance">Open Yarn Change Assistance</Link>
                    </Button>
                  )}
                  <Button asChild variant="secondary">
                    <Link to="/dashboard">View Dashboard</Link>
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground">
                  Analysis mode: <b className="uppercase">{result.mode}</b> · saved to the local
                  history used by the dashboard.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
