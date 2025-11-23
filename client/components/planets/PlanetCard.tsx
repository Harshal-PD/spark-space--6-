import { Link } from "react-router-dom";
import { Planet } from "@/data/planets";

export default function PlanetCard({ planet }: { planet: Planet }) {
  return (
    <Link
      to={`/planets/${planet.slug}`}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-glow ring-1 ring-white/10 backdrop-blur transition-transform duration-300 hover:-translate-y-1 hover:shadow-glow-lg"
      aria-label={`Open ${planet.name} page`}
    >
      <div className="absolute -right-16 -top-16 size-56 rounded-full blur-3xl"
        style={{ background: `radial-gradient(50% 50% at 50% 50%, ${planet.color}55 0%, transparent 70%)` }}
      />

      <div className="relative z-10">
        <div className="mx-auto mb-5 flex h-36 w-36 items-center justify-center rounded-full bg-black/20 ring-1 ring-white/10">
          <div className="relative h-28 w-28 overflow-hidden rounded-full shadow-inner">
            {planet.texture ? (
              <>
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url(${planet.texture})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "saturate(1.05)",
                  }}
                />
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "radial-gradient(90% 90% at 28% 28%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 45%, rgba(0,0,0,0.55) 100%)",
                    boxShadow: `inset -14px -14px 28px #00000066, 0 0 40px ${planet.glow}55`,
                  }}
                />
              </>
            ) : (
              <div
                className="h-full w-full rounded-full"
                style={{
                  background: `radial-gradient(120% 120% at 30% 30%, ${planet.glow} 0%, ${planet.color} 35%, #0b1020 80%)`,
                  boxShadow: `inset -12px -12px 30px #00000066, 0 0 40px ${planet.glow}55`,
                }}
              />
            )}
          </div>
        </div>
        <h3 className="text-lg font-semibold text-white text-center">{planet.name}</h3>
        <p className="mt-1 text-center text-xs text-white/60">Tap to learn more</p>
      </div>

      {/* Hover reveal */}
      <div className="pointer-events-none absolute inset-0 translate-y-4 bg-gradient-to-t from-black/60 via-black/40 to-transparent opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <p className="text-sm text-white/85">{planet.short}</p>
      </div>
    </Link>
  );
}
