import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CircleDot,
  PartyPopper,
  Power,
  RotateCcw,
  Scissors,
  ShieldAlert,
  SlidersHorizontal,
  Target,
  Wrench,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/assistance")({
  head: () => ({
    meta: [
      { title: "Yarn Change Assistance — SmartYarn AI" },
      {
        name: "description",
        content:
          "A guided six-step yarn change assistance workflow with progress tracking, simulated safely in software for the SmartYarn AI college project.",
      },
      { property: "og:title", content: "Yarn Change Assistance — SmartYarn AI" },
      {
        property: "og:description",
        content: "Follow the guided six-step yarn change workflow with progress and completion tracking.",
      },
    ],
  }),
  component: AssistancePage,
});

const steps = [
  {
    icon: Power,
    title: "Stop the loom safely",
    detail:
      "Bring the loom to a controlled stop using the machine's own stop control and confirm that all moving parts have come to rest before approaching the warp area.",
  },
  {
    icon: Target,
    title: "Confirm that yarn replacement is required",
    detail:
      "Cross-check the AI detection result with a visual inspection of the yarn. Continue only if replacement is genuinely needed.",
  },
  {
    icon: Scissors,
    title: "Remove the depleted yarn",
    detail:
      "Remove the depleted or damaged yarn following the machine procedure described in the manufacturer's manual.",
  },
  {
    icon: Wrench,
    title: "Position the replacement yarn",
    detail:
      "Mount the new yarn package and route the thread through the guides as specified for your loom model.",
  },
  {
    icon: SlidersHorizontal,
    title: "Verify yarn path and tension",
    detail:
      "Check that the yarn path is correct, free of crossings, and that tension matches the recommended setting for the fabric being woven.",
  },
  {
    icon: CircleDot,
    title: "Resume operation after safety confirmation",
    detail:
      "Confirm the working area is clear, then restart the loom and observe the first cycles for correct weaving.",
  },
];

function AssistancePage() {
  const [current, setCurrent] = useState(0);
  const [done, setDone] = useState(false);

  const completion = done ? 100 : Math.round((current / steps.length) * 100);
  const step = steps[current];

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Module 2</p>
      <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Yarn Change Assistance</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        When the detection module reports <b>Yarn Change Required</b>, this guided workflow keeps the
        operator on track through six simple steps. The sequence is simulated in software — the
        website never commands the machine.
      </p>

      <div className="mt-6 flex items-start gap-3 rounded-xl border border-destructive/35 bg-destructive/10 p-4 text-sm">
        <ShieldAlert className="mt-0.5 size-4 shrink-0 text-destructive" />
        <p>
          <b>Safety note:</b> Follow the powerloom manufacturer's operating procedure and allow only
          trained operators to perform physical yarn replacement.
        </p>
      </div>

      <Card className="mt-8">
        <CardHeader className="gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <CardTitle>
              {done ? "Workflow complete" : `Step ${current + 1} of ${steps.length}`}
            </CardTitle>
            <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
              {completion}% complete
            </span>
          </div>
          <Progress value={completion} />
        </CardHeader>
        <CardContent className="space-y-6">
          {done ? (
            <div className="rounded-xl border border-success/40 bg-success/10 p-8 text-center">
              <PartyPopper className="mx-auto size-8 text-success" />
              <h2 className="mt-4 text-2xl font-semibold">Yarn Change Completed</h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                All six assistance steps were acknowledged. Log the change in your maintenance record
                and run a fresh detection to confirm the new yarn condition.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button
                  onClick={() => {
                    setDone(false);
                    setCurrent(0);
                  }}
                  variant="secondary"
                >
                  <RotateCcw className="mr-1.5 size-4" /> Restart workflow
                </Button>
                <Button asChild>
                  <Link to="/detection">Run new detection</Link>
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="rounded-xl border border-border bg-secondary/40 p-6">
                <span className="grid size-11 place-items-center rounded-lg bg-primary/15 text-primary">
                  <step.icon className="size-5" />
                </span>
                <h2 className="mt-4 text-xl font-semibold">
                  Step {current + 1} — {step.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.detail}</p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <Button
                  variant="outline"
                  onClick={() => setCurrent((c) => Math.max(0, c - 1))}
                  disabled={current === 0}
                >
                  <ArrowLeft className="mr-1.5 size-4" /> Previous
                </Button>
                <Button
                  onClick={() => {
                    if (current === steps.length - 1) setDone(true);
                    else setCurrent((c) => c + 1);
                  }}
                >
                  {current === steps.length - 1 ? "Finish yarn change" : "Next"}
                  <ArrowRight className="ml-1.5 size-4" />
                </Button>
              </div>
            </>
          )}

          <ol className="grid gap-3 sm:grid-cols-2">
            {steps.map((s, i) => {
              const complete = done || i < current;
              const active = !done && i === current;
              return (
                <li
                  key={s.title}
                  className={`flex items-start gap-3 rounded-lg border p-3 text-sm transition-colors ${
                    active
                      ? "border-primary bg-primary/10"
                      : complete
                        ? "border-success/40 bg-success/10"
                        : "border-border bg-card"
                  }`}
                >
                  {complete ? (
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />
                  ) : (
                    <CircleDot
                      className={`mt-0.5 size-4 shrink-0 ${active ? "text-primary" : "text-muted-foreground"}`}
                    />
                  )}
                  <span>
                    <span className="block font-medium">
                      Step {i + 1}: {s.title}
                    </span>
                  </span>
                </li>
              );
            })}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
