import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Camera,
  CheckCircle2,
  Cpu,
  Gauge,
  ListChecks,
  ShieldCheck,
  Timer,
  Workflow,
} from "lucide-react";

import heroImage from "@/assets/hero-loom.jpg";
import { DemoNotice, SectionHeading } from "@/components/demo-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SmartYarn AI — AI-Assisted Automatic Yarn Change System" },
      {
        name: "description",
        content:
          "Detect yarn condition from an image and follow a guided six-step yarn change workflow. A safe software demonstration for powerloom weaving.",
      },
      { property: "og:title", content: "SmartYarn AI — AI-Assisted Yarn Change for Powerloom" },
      {
        property: "og:description",
        content:
          "AI-assisted yarn condition detection with a guided yarn change assistance workflow and analytics dashboard.",
      },
    ],
  }),
  component: HomePage,
});

const objectives = [
  {
    icon: Camera,
    title: "Detect yarn condition",
    text: "Analyse a yarn image and classify it as normal or requiring replacement, with a confidence score.",
  },
  {
    icon: Workflow,
    title: "Guide the yarn change",
    text: "Provide a clear six-step assistance workflow so the operator never loses track of the procedure.",
  },
  {
    icon: BarChart3,
    title: "Track production insight",
    text: "Log every analysis locally and summarise detections, trends and average confidence on a dashboard.",
  },
  {
    icon: ShieldCheck,
    title: "Stay safe by design",
    text: "Keep every action inside the software. No machine control, no dangerous instructions.",
  },
];

const benefits = [
  { icon: Timer, title: "Less downtime", text: "Faster decisions on when a yarn actually needs changing." },
  { icon: ListChecks, title: "Fewer mistakes", text: "A step-by-step checklist replaces guesswork for new operators." },
  { icon: Gauge, title: "Consistent quality", text: "Objective condition scoring instead of purely visual judgement." },
  { icon: Cpu, title: "Upgrade ready", text: "The demo analysis can be swapped for a trained ML model API." },
];

function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <img
          src={heroImage}
          alt="Industrial powerloom weaving machine with rows of cyan and white yarn threads"
          width={1600}
          height={912}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:py-32">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Academic project · Demo mode
          </span>
          <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight sm:text-6xl">
            Smart<span className="text-gradient">Yarn</span> AI
          </h1>
          <p className="mt-3 max-w-2xl text-lg font-medium text-primary sm:text-xl">
            AI-Assisted Automatic Yarn Change System for Powerloom
          </p>
          <p className="mt-5 max-w-2xl text-muted-foreground sm:text-lg">
            In powerloom weaving, replacing a depleted or damaged warp yarn is done manually. It is
            slow, needs experience and interrupts production. SmartYarn AI inspects a yarn image,
            reports whether a change is required, and then walks the operator through a safe, guided
            yarn-change workflow — entirely as a software simulation.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/detection">
                Start AI Detection <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link to="/dashboard">View Dashboard</Link>
            </Button>
          </div>

          <div className="mt-14 grid max-w-3xl gap-4 sm:grid-cols-3">
            {[
              { k: "6-step", v: "Guided assistance workflow" },
              { k: "2-class", v: "Normal / change required" },
              { k: "100%", v: "Offline demo, no hardware" },
            ].map((s) => (
              <div key={s.k} className="surface-panel p-4">
                <p className="font-display text-2xl font-semibold text-primary">{s.k}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold">The problem</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                On a powerloom, yarn breakage or depletion is usually noticed only after fabric
                defects appear. The operator must stop the loom, judge the yarn condition by eye and
                perform the replacement manually. This depends heavily on experience, takes time and
                causes avoidable production loss.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold">The proposed solution</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                SmartYarn AI adds an assisted decision layer: an image of the yarn is analysed, a
                status and confidence value are produced, and if a change is required the system
                opens a guided step-by-step assistance workflow with a progress indicator. Every
                analysis is logged so the dashboard can show trends.
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="mt-6">
          <DemoNotice />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <SectionHeading
          eyebrow="Objectives"
          title="What the project sets out to achieve"
          description="Four objectives keep the scope realistic for a college demonstration while still showing an industrial workflow end to end."
        />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {objectives.map((o) => (
            <Card key={o.title} className="transition-transform duration-300 hover:-translate-y-1">
              <CardContent className="pt-6">
                <span className="grid size-10 place-items-center rounded-lg bg-primary/15 text-primary">
                  <o.icon className="size-5" />
                </span>
                <h3 className="mt-4 font-semibold">{o.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{o.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionHeading eyebrow="Benefits" title="Why it matters on the shop floor" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <div key={b.title} className="surface-panel p-5">
              <b.icon className="size-5 text-primary" />
              <h3 className="mt-3 font-semibold">{b.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{b.text}</p>
            </div>
          ))}
        </div>

        <div className="surface-panel mt-10 flex flex-col items-start gap-5 p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-xl font-semibold">Ready to try the demonstration?</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Use a built-in sample image or upload your own yarn photo — no setup required.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/detection">Start AI Detection</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/about">Read project documentation</Link>
            </Button>
          </div>
        </div>

        <p className="mt-8 flex items-start gap-2 text-sm text-muted-foreground">
          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />
          Safety note: follow the powerloom manufacturer's operating procedure and allow only trained
          operators to perform physical yarn replacement. This website is a software simulation only.
        </p>
      </section>
    </>
  );
}
