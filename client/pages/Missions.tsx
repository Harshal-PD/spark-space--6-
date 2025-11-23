import { Rocket, Search, X } from "lucide-react";
import { useState, useMemo } from "react";
import MissionCard from "@/components/missions/MissionCard";
import Reveal from "@/components/ui/reveal";
import { useMissions } from "@/hooks/use-missions";
import { PLANETS } from "@/data/planets";

// Planets to display in the missions section
const TARGET_PLANETS = [
  "Mercury",
  "Venus",
  "Moon",
  "Mars",
  "Jupiter",
  "Saturn",
  
];

export default function Missions() {
  const { data: missions = [], isPending: loading, error } = useMissions();
  const [searchQuery, setSearchQuery] = useState("");

  // Filter missions by search query (planet name)
  const filteredMissions = useMemo(() => {
    if (!searchQuery.trim()) {
      return missions;
    }
    return missions.filter((mission) =>
      mission.planet.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [missions, searchQuery]);

  // Group missions by planet
  const missionsByPlanet = useMemo(() => {
    const grouped: Record<string, typeof missions> = {};

    filteredMissions.forEach((mission) => {
      if (!grouped[mission.planet]) {
        grouped[mission.planet] = [];
      }
      grouped[mission.planet].push(mission);
    });

    return grouped;
  }, [filteredMissions]);

  // Get planets with missions in the target list
  const planetsWithMissions = useMemo(() => {
    return TARGET_PLANETS.filter(
      (planet) => missionsByPlanet[planet]?.length > 0,
    );
  }, [missionsByPlanet]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-white/10 py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.15),transparent_50%)]" />
        <div className="container relative z-10 mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/20 ring-1 ring-indigo-500/30">
              <Rocket className="h-6 w-6 text-indigo-300" />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Space Missions
            </h1>
          </div>
          <p className="max-w-2xl text-lg text-white/70">
            Explore humanity's greatest ventures into space. From the Moon to
            Mars, from Earth orbit to the edge of the solar system.
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="border-b border-white/10 py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl">
            <label className="block mb-3 text-sm font-semibold text-white">
              🔍 Search Missions by Planet
            </label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Search by planet name (e.g., Mars, Jupiter, Moon)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-white placeholder-white/40 transition-all focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-lg bg-white/10 p-1 transition-all hover:bg-white/20"
                >
                  <X className="h-4 w-4 text-white/60" />
                </button>
              )}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {TARGET_PLANETS.map((planet) => (
                <button
                  key={planet}
                  onClick={() => setSearchQuery(planet)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    searchQuery.toLowerCase() === planet.toLowerCase()
                      ? "bg-indigo-600 text-white"
                      : "bg-white/10 text-white/70 hover:bg-white/20"
                  }`}
                >
                  {planet}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-center min-h-96">
              <div className="text-center">
                <div className="inline-flex h-12 w-12 animate-spin rounded-full border 4 border-white/20 border-t-white" />
                <p className="mt-4 text-white/70">Loading missions...</p>
              </div>
            </div>
          </div>
        </section>
      ) : error ? (
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-6">
              <p className="text-red-300">
                Error loading missions: {error?.message}
              </p>
              <p className="mt-2 text-sm text-white/60">
                Please check the server configuration. Make sure the backend is
                running properly at /api/missions.
              </p>
            </div>
          </div>
        </section>
      ) : null}

      {/* Stats Section */}
      {!loading && filteredMissions.length > 0 && (
        <section className="border-b border-white/10 py-12">
          <div className="container mx-auto px-6">
            <div className="grid gap-6 sm:grid-cols-3">
              <Reveal delay={0}>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                  <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-cyan-300">
                    {filteredMissions.length}
                  </p>
                  <p className="mt-1 text-sm text-white/70">Total Missions</p>
                </div>
              </Reveal>
              <Reveal delay={100}>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                  <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
                    {planetsWithMissions.length}
                  </p>
                  <p className="mt-1 text-sm text-white/70">
                    Planets with Missions
                  </p>
                </div>
              </Reveal>
              <Reveal delay={200}>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                  <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                    {
                      filteredMissions.filter((m) => m.status === "Active")
                        .length
                    }
                  </p>
                  <p className="mt-1 text-sm text-white/70">Active Missions</p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* Missions by Planet */}
      {!loading && planetsWithMissions.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="space-y-16">
              {planetsWithMissions.map((planet, planetIndex) => {
                const planetData = PLANETS.find((p) => p.name === planet);
                const planetMissions = missionsByPlanet[planet];

                return (
                  <Reveal key={planet} delay={planetIndex * 100}>
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div
                          className="h-12 w-12 rounded-full"
                          style={{
                            backgroundColor: planetData?.color || "#999",
                            boxShadow: `0 0 24px ${planetData?.glow || "#999"}`,
                          }}
                        />
                        <div>
                          <h2 className="text-3xl font-bold text-white">
                            {planet}
                          </h2>
                          <p className="text-white/60">
                            {planetMissions.length} mission
                            {planetMissions.length !== 1 ? "s" : ""} discovered
                          </p>
                        </div>
                      </div>

                      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {planetMissions.map((mission, i) => (
                          <Reveal key={mission.id} delay={i * 30}>
                            <MissionCard mission={mission} />
                          </Reveal>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {!loading && filteredMissions.length === 0 && !error && (
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <p className="text-white/70">
                {searchQuery
                  ? `No missions found for "${searchQuery}". Try searching for another planet.`
                  : "No missions found. Sync data from NASA API to get started."}
              </p>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
