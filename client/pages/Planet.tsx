import { useParams, Link } from "react-router-dom";
import { PLANETS } from "@/data/planets";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useMemo, useEffect, useState } from "react";
import { generatePlanetTexture, generateRingTexture } from "@/lib/textures";
import { useMissions } from "@/hooks/use-missions";
import MissionCard from "@/components/missions/MissionCard";
import Reveal from "@/components/ui/reveal";
import { ChevronRight, Info } from "lucide-react";

const PLANET_DETAILS: Record<string, { atmosphere?: string; type: string; gravity: string; dayLength: string; temperature: string; composition: string; discovered: string; discoveredBy: string; funFacts: string[] }> = {
  mercury: {
    type: "Terrestrial",
    atmosphere: "Virtually none",
    gravity: "3.7 m/s²",
    dayLength: "59 Earth days",
    temperature: "-173°C to 427°C",
    composition: "Iron core, rocky silicate mantle",
    discovered: "Ancient times",
    discoveredBy: "Known since ancient times",
    funFacts: [
      "Despite being closest to the Sun, it's not the hottest planet due to its thin atmosphere",
      "One day on Mercury is longer than one year",
      "Mercury has extreme temperature swings between day and night",
      "It has no moons",
      "Named after the Roman messenger god due to its swift motion",
    ],
  },
  venus: {
    type: "Terrestrial",
    atmosphere: "Carbon dioxide with sulfuric acid clouds",
    gravity: "8.87 m/s²",
    dayLength: "243 Earth days (retrograde rotation)",
    temperature: "464°C surface (hottest planet)",
    composition: "Iron core, rocky silicate mantle, dense atmosphere",
    discovered: "Ancient times",
    discoveredBy: "Known since ancient times",
    funFacts: [
      "Venus rotates backward compared to most planets",
      "It has the densest atmosphere of any terrestrial planet",
      "A day on Venus is longer than its year",
      "Named after the Roman goddess of love and beauty",
      "Atmospheric pressure at surface is 92 times that of Earth",
    ],
  },
  earth: {
    type: "Terrestrial",
    atmosphere: "Nitrogen and oxygen with trace gases",
    gravity: "9.81 m/s²",
    dayLength: "24 hours",
    temperature: "-89°C to 58°C",
    composition: "Iron core, rocky mantle, thin crust",
    discovered: "N/A - Our home",
    discoveredBy: "N/A - Our home",
    funFacts: [
      "The only planet known to have life",
      "Approximately 71% of Earth's surface is covered by water",
      "Earth's atmosphere protects us from harmful solar radiation",
      "One billion humans could fit in New York City",
      "Earth is the largest terrestrial planet",
    ],
  },
  mars: {
    type: "Terrestrial",
    atmosphere: "Thin carbon dioxide atmosphere",
    gravity: "3.71 m/s²",
    dayLength: "24.6 hours (similar to Earth)",
    temperature: "-65°C average",
    composition: "Iron core, rocky silicate mantle, rusty surface",
    discovered: "Ancient times",
    discoveredBy: "Known since ancient times",
    funFacts: [
      "Mars is about half the size of Earth",
      "Home to Olympus Mons, the largest volcano in the solar system",
      "Has the largest canyon system: Valles Marineris",
      "Evidence suggests liquid water once flowed on its surface",
      "Its color comes from iron oxide (rust) in the soil",
      "Two small moons: Phobos and Deimos",
    ],
  },
  jupiter: {
    type: "Gas Giant",
    atmosphere: "Hydrogen and helium",
    gravity: "24.79 m/s²",
    dayLength: "10 hours",
    temperature: "-110°C (cloud tops)",
    composition: "Hydrogen, helium, and trace elements",
    discovered: "Ancient times",
    discoveredBy: "Known since ancient times",
    funFacts: [
      "Jupiter is the largest planet in our solar system",
      "Its Great Red Spot is a storm larger than Earth that has raged for at least 300 years",
      "Jupiter has 95+ known moons",
      "Could fit 1,300 Earths inside Jupiter",
      "Has a strong magnetic field and radiation belts",
      "No solid surface - made entirely of gas and liquid",
    ],
  },
  saturn: {
    type: "Gas Giant",
    atmosphere: "Hydrogen and helium",
    gravity: "10.44 m/s²",
    dayLength: "10.7 hours",
    temperature: "-140°C (cloud tops)",
    composition: "Hydrogen, helium, and trace elements",
    discovered: "Ancient times",
    discoveredBy: "Known since ancient times",
    funFacts: [
      "Saturn's rings are made of billions of small ice and rock particles",
      "Saturn has 146+ known moons",
      "Titan, Saturn's largest moon, has a thick atmosphere",
      "Saturn is the least dense planet - it would float in water",
      "The rings are relatively young, only a few hundred million years old",
      "Storms in Saturn's atmosphere can reach speeds of 1,800 km/h",
    ],
  },
  uranus: {
    type: "Ice Giant",
    atmosphere: "Hydrogen, helium, and methane",
    gravity: "8.69 m/s²",
    dayLength: "17 hours",
    temperature: "-195°C (cloud tops)",
    composition: "Water, methane, and ammonia ices with rocky core",
    discovered: "1781",
    discoveredBy: "William Herschel",
    funFacts: [
      "Uranus rotates on its side with an axial tilt of 98 degrees",
      "This unique rotation may be due to a collision with Earth-sized object",
      "It's the coldest planetary atmosphere in the solar system",
      "Has 27 known moons",
      "Appears as a featureless blue-green disk",
      "Has faint rings similar to Jupiter's",
    ],
  },
  neptune: {
    type: "Ice Giant",
    atmosphere: "Hydrogen, helium, and methane",
    gravity: "11.15 m/s²",
    dayLength: "16 hours",
    temperature: "-200°C (cloud tops)",
    composition: "Water, methane, and ammonia ices with rocky core",
    discovered: "1846",
    discoveredBy: "François Arago and Johann Galle",
    funFacts: [
      "Neptune has the strongest winds in the solar system (2,100 km/h)",
      "It's the farthest planet from the Sun",
      "Has 14+ known moons",
      "Great Dark Spot storms have been observed moving across its surface",
      "Its blue color comes from methane in its atmosphere",
      "Takes 165 years to orbit the Sun",
    ],
  },
  moon: {
    type: "Natural Satellite",
    atmosphere: "None (trace exosphere)",
    gravity: "1.62 m/s²",
    dayLength: "29.5 Earth days",
    temperature: "-173°C to 127°C",
    composition: "Rocky body with iron core",
    discovered: "Ancient times",
    discoveredBy: "Known since ancient times",
    funFacts: [
      "The Moon orbits Earth every 27.3 days",
      "It's the fifth-largest moon in the solar system",
      "The same side always faces Earth due to tidal locking",
      "Causes Earth's tides through gravitational pull",
      "About 384,400 km away from Earth",
      "12 humans have walked on the Moon during Apollo missions",
    ],
  },
  pluto: {
    type: "Dwarf Planet",
    atmosphere: "Thin nitrogen, methane, carbon monoxide",
    gravity: "0.62 m/s²",
    dayLength: "6.4 Earth days",
    temperature: "-380°C",
    composition: "Rock and ice",
    discovered: "1930",
    discoveredBy: "Clyde Tombaugh",
    funFacts: [
      "Pluto was reclassified as a dwarf planet in 2006",
      "It has 5 known moons",
      "Charon, Pluto's largest moon, is nearly half its size",
      "Pluto has mountains as high as the Rocky Mountains",
      "A year on Pluto lasts 248 Earth years",
      "New Horizons spacecraft flew by Pluto in 2015, revealing a complex world",
    ],
  },
};

function PlanetMesh({ color, glow, size = 1, hasRings = false, textureUrl, ringTextureUrl }: { color: string; glow: string; size?: number; hasRings?: boolean; textureUrl?: string; ringTextureUrl?: string }) {
  const mesh = useRef<THREE.Mesh>(null!);

  // Create a darker shade of the primary color for secondary texture color
  const darkenColor = (hex: string, factor = 0.5) => {
    const num = parseInt(hex.replace("#", ""), 16);
    const r = Math.floor((num >> 16) * factor);
    const g = Math.floor(((num >> 8) & 0xff) * factor);
    const b = Math.floor((num & 0xff) * factor);
    return "#" + [r, g, b].map(x => x.toString(16).padStart(2, "0")).join("");
  };

  const secondaryColor = useMemo(() => darkenColor(color, 0.4), [color]);
  const proceduralMap = useMemo(() => generatePlanetTexture(color, secondaryColor, 1024, size * 13), [color, secondaryColor, size]);
  const proceduralRing = useMemo(() => (hasRings ? generateRingTexture(glow, 1024) : null), [hasRings, glow]);
  const [mapTex, setMapTex] = useState<THREE.Texture | null>(null);
  const [ringTex, setRingTex] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    let mounted = true;
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");
    if (textureUrl) {
      loader.load(
        textureUrl,
        (tex) => {
          if (!mounted) return;
          tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
          tex.anisotropy = 4;
          tex.colorSpace = THREE.SRGBColorSpace;
          setMapTex(tex);
        },
        undefined,
        () => setMapTex(null),
      );
    } else {
      setMapTex(null);
    }
    return () => {
      mounted = false;
    };
  }, [textureUrl]);

  useEffect(() => {
    let mounted = true;
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");
    if (ringTextureUrl && hasRings) {
      loader.load(
        ringTextureUrl,
        (tex) => {
          if (!mounted) return;
          tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
          tex.anisotropy = 4;
          setRingTex(tex);
        },
        undefined,
        () => setRingTex(null),
      );
    } else {
      setRingTex(null);
    }
    return () => {
      mounted = false;
    };
  }, [ringTextureUrl, hasRings]);

  useFrame((_, delta) => {
    if (mesh.current) mesh.current.rotation.y += delta * 0.12;
    if (mesh.current && (mesh.current.material as THREE.MeshStandardMaterial).map) {
      const mat = mesh.current.material as THREE.MeshStandardMaterial;
      if (mat.map) mat.map.rotation += delta * 0.02;
    }
  });
  return (
    <group>
        <mesh ref={mesh}>
          <sphereGeometry args={[1 * size * 0.15, 64, 64]} />
          <meshBasicMaterial map={mapTex ?? proceduralMap} 
          />
        </mesh>
      {hasRings && (ringTex || proceduralRing) && (
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1 * size * 0.23, 0.06 * size, 2, 220]} />
          <meshStandardMaterial map={ringTex ?? proceduralRing ?? undefined} transparent opacity={0.8} color={glow} />
        </mesh>
      )}
    </group>
  );
}

export default function PlanetPage() {
  const { slug } = useParams();
  const planet = PLANETS.find((p) => p.slug === slug);
  const { data: missions = [] } = useMissions();

  if (!planet) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Planet not found</h1>
          <Link className="mt-4 inline-block rounded-full bg-indigo-600 px-4 py-2 text-white" to="/">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const details = PLANET_DETAILS[slug as keyof typeof PLANET_DETAILS];
  const planetMissions = missions.filter((m) => m.planet === planet.name);
  const otherPlanets = PLANETS.filter((p) => p.slug !== slug);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section with 3D Planet */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 -z-10">
          <Canvas 
            dpr={[1, 2]} 
            camera={{ position: [0, 0, 4], fov: 60 }} 
            style={{ height: 500 }}
            gl={{ 
              antialias: true,
              outputColorSpace: THREE.SRGBColorSpace,
              toneMapping: THREE.NoToneMapping
            }}
          >
            <color attach="background" args={["#050816"]} />
            <ambientLight intensity={0.6} color="#ffffff" />
            <pointLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
            <Stars radius={80} depth={40} count={2500} factor={3} fade speed={0.6} />
            <group>
              <PlanetMesh color={planet.color} glow={planet.glow} size={planet.size} hasRings={planet.hasRings} textureUrl={planet.texture} ringTextureUrl={planet.ringTexture} />
              {/* Show Moon alongside Earth */}
              {planet.slug === "earth" && (() => {
                const moonPlanet = PLANETS.find(p => p.slug === "moon");
                if (!moonPlanet) return null;
                const earthSize = planet.size ?? 1;
                const earthRadius = earthSize * 0.15;
                const moonSize = (moonPlanet.size ?? 0.27) * 0.4; // Make moon 40% of its normal size (smaller)
                // Position moon very close - right next to Earth
                return (
                  <group position={[earthRadius + (moonSize * 0.15) + 0.05, 0, 0]}>
                    <PlanetMesh 
                      color={moonPlanet.color} 
                      glow={moonPlanet.glow} 
                      size={moonSize} 
                      textureUrl={moonPlanet.texture} 
                    />
                  </group>
                );
              })()}
            </group>
            <OrbitControls enablePan={false} enableZoom={false} />
          </Canvas>
        </div>
        <div className="container relative mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <span className="mb-4 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80 backdrop-blur">
              SpaceExplorer · {details?.type}
            </span>
            <h1 className="animate-fade-up bg-gradient-to-r from-indigo-300 via-fuchsia-300 to-cyan-200 bg-clip-text text-5xl font-extrabold text-transparent sm:text-6xl" style={{ animationDelay: "0.05s", animationFillMode: "both" }}>
              {planet.name}
            </h1>
            <p className="mt-6 text-lg text-white/70 max-w-2xl animate-fade-up leading-relaxed" style={{ animationDelay: "0.15s", animationFillMode: "both" }}>
              {planet.description}
            </p>
          </div>
        </div>
      </section>

      {/* Key Facts */}
      <section className="border-b border-white/10 py-16">
        <div className="container mx-auto px-6">
          <h2 className="mb-10 text-3xl font-bold text-white">Key Facts</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {planet.facts.map((fact, i) => (
              <Reveal key={fact.label} delay={i * 50}>
                <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                  <p className="text-sm text-white/60 uppercase tracking-wider font-semibold">{fact.label}</p>
                  <p className="mt-3 text-2xl font-bold text-white">{fact.value}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Physical Characteristics */}
      {details && (
        <section className="border-b border-white/10 py-16">
          <div className="container mx-auto px-6">
            <h2 className="mb-10 text-3xl font-bold text-white">Physical Characteristics</h2>
            <div className="grid gap-8 lg:grid-cols-2">
              <Reveal delay={0}>
                <div className="space-y-6">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                    <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-2">Type</h3>
                    <p className="text-xl text-white font-semibold">{details.type}</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                    <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-2">Temperature</h3>
                    <p className="text-lg text-white font-semibold">{details.temperature}</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                    <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-2">Gravity</h3>
                    <p className="text-lg text-white font-semibold">{details.gravity}</p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <div className="space-y-6">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                    <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-2">Atmosphere</h3>
                    <p className="text-lg text-white font-semibold">{details.atmosphere}</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                    <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-2">Day Length</h3>
                    <p className="text-lg text-white font-semibold">{details.dayLength}</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                    <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-2">Composition</h3>
                    <p className="text-base text-white font-semibold">{details.composition}</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* Discovery & History */}
      {details && (
        <section className="border-b border-white/10 py-16">
          <div className="container mx-auto px-6">
            <h2 className="mb-10 text-3xl font-bold text-white">Discovery & History</h2>
            <Reveal>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">Discovered</h3>
                    <p className="text-2xl font-bold text-white">{details.discovered}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">Discovered By</h3>
                    <p className="text-lg text-white font-semibold">{details.discoveredBy}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Interesting Facts */}
      {details && details.funFacts.length > 0 && (
        <section className="border-b border-white/10 py-16">
          <div className="container mx-auto px-6">
            <h2 className="mb-10 text-3xl font-bold text-white">Interesting Facts</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {details.funFacts.map((fact, i) => (
                <Reveal key={i} delay={i * 50}>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur hover:bg-white/10 transition">
                    <div className="flex gap-4">
                      <Info className="h-6 w-6 text-indigo-300 flex-shrink-0 mt-1" />
                      <p className="text-white/80 leading-relaxed">{fact}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Missions */}
      {planetMissions.length > 0 && (
        <section className="border-b border-white/10 py-16">
          <div className="container mx-auto px-6">
            <h2 className="mb-10 text-3xl font-bold text-white">Missions to {planet.name}</h2>
            <p className="mb-8 text-white/70">{planetMissions.length} missions have been sent to explore {planet.name}</p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {planetMissions.slice(0, 6).map((mission, i) => (
                <Reveal key={mission.id} delay={i * 50}>
                  <MissionCard mission={mission} />
                </Reveal>
              ))}
            </div>
            {planetMissions.length > 6 && (
              <Link
                to="/missions"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-white font-semibold hover:bg-indigo-700 transition"
              >
                View All Missions <ChevronRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </section>
      )}

      {/* Navigation to Other Planets */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="mb-10 text-3xl font-bold text-white">Explore Other Planets</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {otherPlanets.map((p, i) => (
              <Reveal key={p.slug} delay={i * 50}>
                <Link
                  to={`/planets/${p.slug}`}
                  className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-white/20 hover:bg-white/10"
                >
                  <div
                    className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-20 blur-2xl group-hover:opacity-40 transition"
                    style={{ backgroundColor: p.color }}
                  />
                  <div className="relative z-10">
                    <div
                      className="mb-4 h-8 w-8 rounded-full"
                      style={{
                        backgroundColor: p.color,
                        boxShadow: `0 0 16px ${p.glow}`,
                      }}
                    />
                    <h3 className="font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-300 group-hover:via-fuchsia-300 group-hover:to-cyan-200 transition">
                      {p.name}
                    </h3>
                    <p className="mt-2 text-xs text-white/60">{p.short}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Back Button */}
      <section className="border-t border-white/10 py-12">
        <div className="container mx-auto px-6">
          <Link to="/" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 px-6 py-3 text-white font-semibold hover:from-indigo-500 hover:via-violet-500 hover:to-fuchsia-500 transition">
            ← Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}
