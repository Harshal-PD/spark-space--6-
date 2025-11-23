import { ExternalLink } from "lucide-react";
import type { Mission } from "@/data/missions";

export default function MissionCard({ mission }: { mission: Mission }) {
  const statusColor = {
    Active: "bg-green-500/20 text-green-300 border-green-500/30",
    Completed: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    Planned: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 transition-all duration-300 hover:border-white/20 hover:shadow-lg hover:shadow-white/10">
      <div
        className="absolute -right-12 -top-12 size-40 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-60"
        style={{ backgroundColor: mission.color + "40" }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <span className="text-3xl">{mission.icon}</span>
            <div>
              <h3 className="text-lg font-bold text-white">{mission.name}</h3>
              <p className="text-sm text-white/60">{mission.agency}</p>
            </div>
          </div>
          <span
            className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${statusColor[mission.status]}`}
          >
            {mission.status}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-xs text-white/70">
            📍 {mission.planet}
          </span>
          <span className="inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-xs text-white/70">
            🚀 {mission.launchDate.split(",")[1]}
          </span>
          {mission.completionDate && (
            <span className="inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-xs text-white/70">
              ✓ {mission.completionDate.split(",")[1]}
            </span>
          )}
        </div>

        <p className="mt-4 text-sm leading-relaxed text-white/80">{mission.description}</p>

        <div className="mt-4">
          <h4 className="mb-2 text-xs font-semibold text-white/70 uppercase tracking-wider">Objectives</h4>
          <ul className="space-y-1">
            {mission.objectives.slice(0, 3).map((obj, i) => (
              <li key={i} className="text-xs text-white/60 flex items-start gap-2">
                <span className="mt-0.5 inline-block h-1 w-1 rounded-full bg-white/40 flex-shrink-0" />
                {obj}
              </li>
            ))}
          </ul>
        </div>

        <a
          href={mission.datasetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600/80 to-fuchsia-600/80 px-4 py-2 text-sm font-semibold text-white transition-all hover:from-indigo-600 hover:to-fuchsia-600"
        >
          View Dataset <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
