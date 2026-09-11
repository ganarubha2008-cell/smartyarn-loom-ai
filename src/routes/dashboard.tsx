import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, BarChart3, CheckCircle2, Gauge, Layers, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { DemoNotice } from "@/components/demo-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  clearHistory,
  getHistory,
  summarise,
  type YarnAnalysisResult,
} from "@/lib/yarn-analysis";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Analytics Dashboard — SmartYarn AI" },
      {
        name: "description",
        content:
          "Track total yarn analyses, normal versus change-required detections, average confidence and recent history in the SmartYarn AI dashboard.",
      },
      { property: "og:title", content: "Analytics Dashboard — SmartYarn AI" },
      {
        property: "og:description",
        content: "Detection statistics, charts and recent analysis history for the SmartYarn AI demo.",
      },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const [history, setHistory] = useState<YarnAnalysisResult[]>([]);

  useEffect(() => {
    const sync = () => setHistory(getHistory());
    sync();
    window.addEventListener("smartyarn:history", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("smartyarn:history", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const stats = summarise(history);

  const cards = [
    { label: "Total yarn analyses", value: stats.total, icon: Layers, tone: "text-primary" },
    { label: "Normal yarn detections", value: stats.normal, icon: CheckCircle2, tone: "text-success" },
    {
      label: "Yarn change required",
      value: stats.changeRequired,
      icon: AlertTriangle,
      tone: "text-destructive",
    },
    {
      label: "Average confidence",
      value: stats.total ? `${stats.averageConfidence}%` : "—",
      icon: Gauge,
      tone: "text-warning",
    },
  ];

  const pieData = [
    { name: "Normal Yarn", value: stats.normal, fill: "var(--color-success)" },
    { name: "Change Required", value: stats.changeRequired, fill: "var(--color-destructive)" },
  ].filter((d) => d.value > 0);

  const barData = history
    .slice(0, 8)
    .reverse()
    .map((h, i) => ({
      name: `#${i + 1}`,
      confidence: h.confidence,
      fill: h.label === "normal" ? "var(--color-success)" : "var(--color-destructive)",
    }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Module 3</p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Monitoring Dashboard</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Every analysis performed on this device is stored in the browser's local storage and
            summarised here.
          </p>
        </div>
        <div className="flex gap-3">
          <Button asChild>
            <Link to="/detection">New analysis</Link>
          </Button>
          <Button
            variant="outline"
            onClick={() => clearHistory()}
            disabled={history.length === 0}
          >
            <Trash2 className="mr-1.5 size-4" /> Clear history
          </Button>
        </div>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Card key={c.label}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{c.label}</p>
                <c.icon className={`size-5 ${c.tone}`} />
              </div>
              <p className="mt-3 font-display text-3xl font-semibold">{c.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {history.length === 0 ? (
        <Card className="mt-6">
          <CardContent className="py-14 text-center">
            <BarChart3 className="mx-auto size-8 text-muted-foreground" />
            <h2 className="mt-4 text-lg font-semibold">No analyses recorded yet</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              Run the AI detection module — with an uploaded photo or a built-in demo sample — and the
              statistics, charts and history below will populate immediately.
            </p>
            <Button asChild className="mt-6">
              <Link to="/detection">Start AI Detection</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Detection distribution</CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90}>
                      {pieData.map((d) => (
                        <Cell key={d.name} fill={d.fill} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: "var(--color-card)",
                        border: "1px solid var(--color-border)",
                        borderRadius: 8,
                        color: "var(--color-foreground)",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-2 flex justify-center gap-5 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-full bg-success" /> Normal ({stats.normal})
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-full bg-destructive" /> Change required (
                    {stats.changeRequired})
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Confidence of recent analyses</CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData}>
                    <XAxis dataKey="name" stroke="var(--color-muted-foreground)" fontSize={12} />
                    <YAxis domain={[0, 100]} stroke="var(--color-muted-foreground)" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        background: "var(--color-card)",
                        border: "1px solid var(--color-border)",
                        borderRadius: 8,
                        color: "var(--color-foreground)",
                      }}
                    />
                    <Bar dataKey="confidence" radius={[6, 6, 0, 0]}>
                      {barData.map((d, i) => (
                        <Cell key={i} fill={d.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Recent analysis history</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {history.slice(0, 10).map((h) => (
                <div
                  key={h.id}
                  className="flex flex-wrap items-center gap-4 rounded-lg border border-border bg-secondary/40 p-4"
                >
                  <span
                    className={`grid size-9 shrink-0 place-items-center rounded-lg ${
                      h.label === "normal"
                        ? "bg-success/15 text-success"
                        : "bg-destructive/15 text-destructive"
                    }`}
                  >
                    {h.label === "normal" ? (
                      <CheckCircle2 className="size-4" />
                    ) : (
                      <AlertTriangle className="size-4" />
                    )}
                  </span>
                  <div className="min-w-40 flex-1">
                    <p className="font-medium">{h.labelText}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {h.imageName} · {new Date(h.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="w-40">
                    <p className="text-xs text-muted-foreground">Confidence {h.confidence}%</p>
                    <Progress value={h.confidence} className="mt-1.5" />
                  </div>
                  <span className="rounded-full bg-warning/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-warning">
                    {h.mode}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </>
      )}

      <div className="mt-6">
        <DemoNotice />
      </div>
    </div>
  );
}
