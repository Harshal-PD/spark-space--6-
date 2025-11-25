import { Bot, LineChart, Rocket, Search, X } from "lucide-react";
import SpaceBackground from "@/components/space/SpaceBackground";
import { cn } from "@/lib/utils";
import PlanetCard from "@/components/planets/PlanetCard";
import { PLANETS } from "@/data/planets";
import Reveal from "@/components/ui/reveal";
import { Marquee, Badge } from "@/components/ui/marquee";

import { useState, useMemo } from "react";

export default function Index() {
  const [hover, setHover] = useState(false);
  const [planetSearch, setPlanetSearch] = useState("");
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <SpaceBackground hoverBoost={hover} />
          {/* radial vignette overlay */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(124,58,237,0.35),transparent_35%),radial-gradient(circle_at_70%_60%,rgba(59,130,246,0.25),transparent_35%)]" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/0 via-background/20 to-background" />
        </div>

        <div className="relative z-10 h-full">
          <div className="container mx-auto flex h-full items-center px-6">
            <div
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              className="group relative max-w-2xl rounded-[20px] border border-white/10 bg-white/5 p-8 text-left backdrop-blur-sm backdrop-saturate-150 ring-1 ring-white/10 ring-inset shadow-[0_0_8px_rgba(0,0,0,0.14)] transition duration-500 hover:-translate-y-0.5 animate-fade-up"
              style={{ animationDelay: "0s", animationFillMode: "both" }}
            >
              <div className="pointer-events-none absolute -inset-px -z-10 rounded-[20px] bg-gradient-to-br from-indigo-500/15 via-fuchsia-500/15 to-cyan-500/15 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100" />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-px -z-10 rounded-[18px] bg-gradient-to-b from-white/10 to-transparent"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 rounded-[20px] bg-[linear-gradient(110deg,rgba(255,255,255,0)_30%,rgba(255,255,255,0.22)_50%,rgba(255,255,255,0)_70%)] bg-[length:200%_100%] opacity-30 [mask-image:linear-gradient(to_bottom,white,transparent)] animate-shine"
              />
              <span
                className="mb-4 inline-flex items-center rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold tracking-wider text-white/80 animate-fade-up"
                style={{ animationDelay: "0.05s", animationFillMode: "both" }}
              >
                SpaceExplorer
              </span>
              <h1
                className="bg-gradient-to-r from-indigo-300 via-fuchsia-300 to-cyan-200 bg-clip-text text-4xl font-extrabold leading-tight text-transparent sm:text-5xl md:text-6xl animate-fade-up"
                style={{ animationDelay: "0.15s", animationFillMode: "both" }}
              >
                Explore the Universe with AI Assistance
              </h1>
              <p
                className="mt-4 max-w-2xl text-base text-white/80 sm:text-lg animate-fade-up"
                style={{ animationDelay: "0.25s", animationFillMode: "both" }}
              >
                Your interactive platform for planetary missions, space data
                visualization, and chatbot-guided exploration of our solar
                system and beyond.
              </p>
              <a
                href="#features"
                className={cn(
                  "group mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white shadow-glow transition focus:outline-none focus:ring-2 focus:ring-indigo-500/70 animate-fade-up",
                  "bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 hover:from-indigo-500 hover:via-violet-500 hover:to-fuchsia-500",
                )}
                style={{ animationDelay: "0.35s", animationFillMode: "both" }}
              >
                Start Exploring
                <svg
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M10.293 3.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 010-1.414z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Marquee */}
      <section className="relative z-10 border-y border-white/10 bg-background/40 py-10">
        <div className="container mx-auto px-6">
          <p className="mb-6 text-center text-white/60">
            Trusted by explorers and agencies
          </p>
        </div>
        <Marquee duration={28}>
          <Badge>NASA</Badge>
          <Badge>ESA</Badge>
          <Badge>JAXA</Badge>
          <Badge>ISRO</Badge>
          <Badge>CNSA</Badge>
          <Badge>SpaceX</Badge>
          <Badge>Rocket Lab</Badge>
          <Badge>Planet Labs</Badge>
        </Marquee>
      </section>

      {/* Features */}
      <section
        id="features"
        className="relative z-10 bg-gradient-to-b from-background to-background/50 py-24"
      >
        <div className="container mx-auto px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Platform Features
            </h2>
            <p className="mt-3 text-white/60">
              Tools to navigate, analyze, and converse about space in real time.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Reveal delay={0}>
              <FeatureCard
                icon={<Rocket className="text-indigo-300" />}
                title="Mission Tracking"
                description="Follow planetary missions with live updates, trajectories, and milestones across the solar system."
              />
            </Reveal>
            <Reveal delay={100}>
              <FeatureCard
                icon={<LineChart className="text-cyan-300" />}
                title="Data Visualization"
                description="Explore interactive charts and 3D maps powered by real datasets from space agencies and observatories."
              />
            </Reveal>
            <Reveal delay={200}>
              <FeatureCard
                icon={<Bot className="text-fuchsia-300" />}
                title="AI Chat Assistance"
                description="Ask questions and get guided explanations from an AI copilot trained on astronomy and mission briefings."
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Planets */}
      <section id="planets" className="relative z-10 py-20">
        <div className="container mx-auto px-6">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Explore Planets
            </h2>
            <p className="mt-3 text-white/60">
              Hover a planet to preview details. Click to open its page.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-10 flex justify-center">
            <div className="w-full max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  placeholder="Search planets by name..."
                  value={planetSearch}
                  onChange={(e) => setPlanetSearch(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-white placeholder-white/40 transition-all focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
                {planetSearch && (
                  <button
                    onClick={() => setPlanetSearch("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-lg bg-white/10 p-1 transition-all hover:bg-white/20"
                  >
                    <X className="h-4 w-4 text-white/60" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Filtered Planets Grid */}
          <PlanetsGrid searchQuery={planetSearch} />
        </div>
      </section>
    </main>
  );
}

function PlanetsGrid({ searchQuery }: { searchQuery: string }) {
  const filteredPlanets = useMemo(() => {
    if (!searchQuery.trim()) {
      return PLANETS;
    }
    return PLANETS.filter((planet) =>
      planet.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  if (filteredPlanets.length === 0) {
    return (
      <div className="flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 py-12">
        <p className="text-white/60">
          No planets found matching "{searchQuery}". Try a different search
          term.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {filteredPlanets.map((p, i) => (
        <Reveal key={p.slug} delay={i * 60}>
          <PlanetCard planet={p} />
        </Reveal>
      ))}
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-card/80 p-6 shadow-glow transition-transform duration-300 hover:-translate-y-1 hover:shadow-glow-lg">
      <div className="absolute -right-10 -top-10 size-40 rounded-full bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/20 blur-2xl" />
      <div className="relative z-10">
        <div className="mb-4 inline-flex size-11 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10 backdrop-blur group-hover:animate-float">
          <span className="[&_*]:size-5">{icon}</span>
        </div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/70">
          {description}
        </p>
      </div>
    </div>
  );
}
