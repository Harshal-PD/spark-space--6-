import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { PLANETS } from "@/data/planets";
import { Search, Filter, TrendingUp, BarChart3, Sparkles, ArrowRight, X } from "lucide-react";
import Reveal from "@/components/ui/reveal";
import { Canvas } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { generatePlanetTexture } from "@/lib/textures";

type PlanetType = "All" | "Terrestrial" | "Gas Giant" | "Ice Giant" | "Dwarf Planet" | "Natural Satellite";

const PLANET_TYPES: Record<string, PlanetType> = {
  mercury: "Terrestrial",
  venus: "Terrestrial",
  earth: "Terrestrial",
  mars: "Terrestrial",
  jupiter: "Gas Giant",
  saturn: "Gas Giant",
  uranus: "Ice Giant",
  neptune: "Ice Giant",
  pluto: "Dwarf Planet",
  moon: "Natural Satellite",
};

function MiniPlanet({ planet, position, scale = 1 }: { planet: typeof PLANETS[0]; position: [number, number, number]; scale?: number }) {
  const mesh = useRef<THREE.Mesh>(null!);
  const texture = useMemo(() => {
    if (planet.texture) return null;
    return generatePlanetTexture(planet.color, planet.glow, 256, planet.size ?? 1);
  }, [planet]);

  useFrame((_, delta) => {
    if (mesh.current) mesh.current.rotation.y += delta * 0.1;
  });

  return (
    <group position={position} scale={scale}>
      <mesh ref={mesh}>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshBasicMaterial map={texture ?? undefined} color={planet.color} />
      </mesh>
    </group>
  );
}

function SolarSystemView({ selectedPlanet, planets }: { selectedPlanet: typeof PLANETS[0] | null; planets: typeof PLANETS }) {
  return (
    <div className="h-[400px] w-full rounded-2xl border border-white/10 bg-black/20 overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <color attach="background" args={["#050816"]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[0, 0, 0]} intensity={2} color="#ffaa00" />
        <Stars radius={50} depth={30} count={1000} factor={2} fade speed={0.5} />
        
        {/* Sun */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.15, 32, 32]} />
          <meshBasicMaterial color="#ffaa00" emissive="#ff6600" />
        </mesh>

        {/* Planets in orbit */}
        {planets.slice(0, 8).map((planet, i) => {
          const distance = 0.8 + i * 0.4;
          const angle = (i / planets.length) * Math.PI * 2;
          const scale = Math.max(0.3, (planet.size ?? 1) * 0.15);
          return (
            <MiniPlanet
              key={planet.slug}
              planet={planet}
              position={[Math.cos(angle) * distance, 0, Math.sin(angle) * distance]}
              scale={scale}
            />
          );
        })}

        <OrbitControls enableZoom={true} enablePan={true} minDistance={3} maxDistance={10} />
      </Canvas>
    </div>
  );
}

export default function Planets() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<PlanetType>("All");
  const [sortBy, setSortBy] = useState<"name" | "size">("name");
  const [viewMode, setViewMode] = useState<"grid" | "solar">("grid");

  const filteredAndSortedPlanets = useMemo(() => {
    let filtered = PLANETS.filter((planet) => {
      const matchesSearch = planet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           planet.short.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === "All" || PLANET_TYPES[planet.slug] === selectedType;
      return matchesSearch && matchesType;
    });

    // Sort planets
    filtered.sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else {
        return (b.size ?? 0) - (a.size ?? 0);
      }
    });

    return filtered;
  }, [searchQuery, selectedType, sortBy]);

  const planetTypes = useMemo(() => {
    const types = new Set<PlanetType>(["All"]);
    PLANETS.forEach((p) => {
      const type = PLANET_TYPES[p.slug];
      if (type) types.add(type);
    });
    return Array.from(types);
  }, []);

  const stats = useMemo(() => {
    const total = PLANETS.length;
    const terrestrial = PLANETS.filter(p => PLANET_TYPES[p.slug] === "Terrestrial").length;
    const gasGiants = PLANETS.filter(p => PLANET_TYPES[p.slug] === "Gas Giant").length;
    const largest = PLANETS.reduce((max, p) => (p.size ?? 0) > (max.size ?? 0) ? p : max, PLANETS[0]);
    return { total, terrestrial, gasGiants, largest };
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-white/10 py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 via-transparent to-fuchsia-500/10" />
        <div className="container relative mx-auto px-6">
          <Reveal>
            <div className="text-center">
              <span className="mb-4 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80 backdrop-blur">
                <Sparkles className="mr-2 h-3 w-3" />
                Solar System Explorer
              </span>
              <h1 className="bg-gradient-to-r from-indigo-300 via-fuchsia-300 to-cyan-200 bg-clip-text text-5xl font-extrabold text-transparent sm:text-6xl">
                Explore All Planets
              </h1>
              <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto">
                Discover detailed information about every planet, moon, and dwarf planet in our solar system. Compare sizes, explore characteristics, and dive deep into each celestial body.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Statistics Cards */}
      <section className="border-b border-white/10 py-12">
        <div className="container mx-auto px-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Reveal delay={0}>
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/60 uppercase tracking-wider font-semibold">Total Bodies</p>
                    <p className="mt-2 text-3xl font-bold text-white">{stats.total}</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-indigo-400" />
                </div>
              </div>
            </Reveal>
            <Reveal delay={50}>
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/60 uppercase tracking-wider font-semibold">Terrestrial</p>
                    <p className="mt-2 text-3xl font-bold text-white">{stats.terrestrial}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-cyan-400" />
                </div>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/60 uppercase tracking-wider font-semibold">Gas Giants</p>
                    <p className="mt-2 text-3xl font-bold text-white">{stats.gasGiants}</p>
                  </div>
                  <Sparkles className="h-8 w-8 text-fuchsia-400" />
                </div>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/60 uppercase tracking-wider font-semibold">Largest</p>
                    <p className="mt-2 text-lg font-bold text-white">{stats.largest.name}</p>
                  </div>
                  <div className="h-8 w-8 rounded-full" style={{ backgroundColor: stats.largest.color }} />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Controls Section */}
      <section className="border-b border-white/10 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  placeholder="Search planets..."
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
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              {/* Type Filter */}
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2">
                <Filter className="h-4 w-4 text-white/60" />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value as PlanetType)}
                  className="bg-transparent text-white outline-none cursor-pointer"
                >
                  {planetTypes.map((type) => (
                    <option key={type} value={type} className="bg-background">
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "name" | "size")}
                  className="bg-transparent text-white outline-none cursor-pointer"
                >
                  <option value="name" className="bg-background">Sort by Name</option>
                  <option value="size" className="bg-background">Sort by Size</option>
                </select>
              </div>

              {/* View Mode */}
              <div className="flex rounded-xl border border-white/10 bg-white/5 overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-4 py-2 text-sm font-medium transition ${
                    viewMode === "grid"
                      ? "bg-indigo-600 text-white"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode("solar")}
                  className={`px-4 py-2 text-sm font-medium transition ${
                    viewMode === "solar"
                      ? "bg-indigo-600 text-white"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  Solar System
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          {viewMode === "solar" ? (
            <Reveal>
              <div className="mb-8">
                <h2 className="mb-4 text-2xl font-bold text-white">Interactive Solar System</h2>
                <p className="text-white/60">Explore the planets in a 3D solar system view. Use your mouse to rotate and zoom.</p>
              </div>
              <SolarSystemView selectedPlanet={null} planets={filteredAndSortedPlanets} />
            </Reveal>
          ) : (
            <>
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">All Planets</h2>
                  <p className="mt-1 text-white/60">
                    {filteredAndSortedPlanets.length} {filteredAndSortedPlanets.length === 1 ? "planet" : "planets"} found
                  </p>
                </div>
              </div>

              {filteredAndSortedPlanets.length === 0 ? (
                <div className="flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 py-12">
                  <p className="text-white/60">No planets found matching your criteria.</p>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredAndSortedPlanets.map((planet, i) => (
                    <Reveal key={planet.slug} delay={i * 50}>
                      <Link
                        to={`/planets/${planet.slug}`}
                        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
                      >
                        <div
                          className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-20 blur-2xl group-hover:opacity-40 transition"
                          style={{ backgroundColor: planet.color }}
                        />
                        <div className="relative z-10">
                          {/* Planet Preview */}
                          <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-black/20 ring-1 ring-white/10">
                            <div className="relative h-20 w-20 overflow-hidden rounded-full">
                              {planet.texture ? (
                                <>
                                  <div
                                    className="absolute inset-0"
                                    style={{
                                      backgroundImage: `url(${planet.texture})`,
                                      backgroundSize: "cover",
                                      backgroundPosition: "center",
                                    }}
                                  />
                                  <div
                                    className="absolute inset-0 rounded-full"
                                    style={{
                                      background: "radial-gradient(90% 90% at 28% 28%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 45%, rgba(0,0,0,0.55) 100%)",
                                      boxShadow: `inset -8px -8px 16px #00000066, 0 0 30px ${planet.glow}55`,
                                    }}
                                  />
                                </>
                              ) : (
                                <div
                                  className="h-full w-full rounded-full"
                                  style={{
                                    background: `radial-gradient(120% 120% at 30% 30%, ${planet.glow} 0%, ${planet.color} 35%, #0b1020 80%)`,
                                    boxShadow: `inset -8px -8px 20px #00000066, 0 0 30px ${planet.glow}55`,
                                  }}
                                />
                              )}
                            </div>
                          </div>

                          {/* Planet Info */}
                          <div className="text-center">
                            <h3 className="text-lg font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-300 group-hover:via-fuchsia-300 group-hover:to-cyan-200 transition">
                              {planet.name}
                            </h3>
                            <p className="mt-1 text-xs text-white/60 uppercase tracking-wider">
                              {PLANET_TYPES[planet.slug] || "Unknown"}
                            </p>
                            <p className="mt-2 text-sm text-white/70 line-clamp-2">{planet.short}</p>
                          </div>

                          {/* Size Indicator */}
                          {planet.size && (
                            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-white/50">
                              <div className="h-1 flex-1 rounded-full bg-white/10">
                                <div
                                  className="h-full rounded-full transition-all"
                                  style={{
                                    width: `${Math.min(100, (planet.size / 11) * 100)}%`,
                                    backgroundColor: planet.color,
                                  }}
                                />
                              </div>
                              <span>Size: {planet.size.toFixed(1)}x</span>
                            </div>
                          )}

                          {/* Arrow */}
                          <div className="mt-4 flex items-center justify-center text-white/40 group-hover:text-white transition">
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </Link>
                    </Reveal>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}

