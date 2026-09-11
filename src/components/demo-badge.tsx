import { Info } from "lucide-react";

export function DemoNotice({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-warning/30 bg-warning/10 p-4 text-sm text-foreground">
      <Info className="mt-0.5 size-4 shrink-0 text-warning" />
      <p>
        {children ?? (
          <>
            <span className="font-semibold">Demo mode:</span> no trained machine-learning model is
            connected. Results come from a labelled demonstration image-analysis routine so the
            project can be evaluated without hardware or an external API.
          </>
        )}
      </p>
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
      )}
      <h2 className="mt-2 text-3xl font-bold sm:text-4xl">{title}</h2>
      {description && <p className="mt-3 text-muted-foreground">{description}</p>}
    </div>
  );
}
