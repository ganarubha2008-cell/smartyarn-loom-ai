import { Link } from "@tanstack/react-router";
import { Activity, Github, Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/detection", label: "AI Detection" },
  { to: "/assistance", label: "Yarn Assistance" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/about", label: "About" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="grid size-9 place-items-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/30">
            <Activity className="size-5" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-base font-semibold">SmartYarn AI</span>
            <span className="block text-[11px] tracking-wide text-muted-foreground">
              Powerloom Yarn Intelligence
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "bg-secondary text-primary" }}
            >
              {l.label}
            </Link>
          ))}
          <span className="ml-2 rounded-full bg-warning/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-warning ring-1 ring-warning/30">
            Demo mode
          </span>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setOpen((v) => !v)}
          className="grid size-10 place-items-center rounded-md border border-border text-foreground md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border/70 px-4 pb-4 md:hidden">
          <div className="flex flex-col gap-1 pt-2">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
                activeProps={{ className: "bg-secondary text-primary" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border/70 bg-card/40">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-semibold">SmartYarn AI</h3>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            AI-Assisted Automatic Yarn Change System for Powerloom — a college project software
            demonstration. It does not control any real machine.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Pages
          </h4>
          <ul className="mt-3 space-y-2 text-sm">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Safety
          </h4>
          <p className="mt-3 text-sm text-muted-foreground">
            Follow the powerloom manufacturer's operating procedure and allow only trained operators
            to perform physical yarn replacement.
          </p>
          <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <Github className="size-3.5" /> Built with React, TypeScript & Tailwind CSS
          </p>
        </div>
      </div>
      <div className="border-t border-border/70 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} SmartYarn AI · Academic demonstration project
      </div>
    </footer>
  );
}
