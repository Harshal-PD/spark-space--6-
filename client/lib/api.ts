import type { Mission } from "@/data/missions";
import type { Planet } from "@/data/planets";

interface MissionResponse {
  id: string;
  name: string;
  agency: string;
  status: "Active" | "Completed" | "Planned";
  planet: string;
  launch_date: string;
  completion_date: string | null;
  description: string;
  objectives: string[];
  dataset_url: string;
  image_url: string | null;
  color: string;
  icon: string;
}

interface PlanetResponse {
  id: string;
  slug: string;
  name: string;
  color: string;
  glow: string;
  short: string;
  description: string;
  facts: { label: string; value: string }[];
  has_rings: boolean;
  size: number | null;
  texture: string | null;
  ring_texture: string | null;
}

export async function fetchMissions(): Promise<Mission[]> {
  const response = await fetch("/api/missions");

  if (!response.ok) {
    throw new Error("Failed to fetch missions");
  }

  const data: MissionResponse[] = await response.json();

  return data.map((mission) => ({
    id: mission.id,
    name: mission.name,
    agency: mission.agency,
    status: mission.status,
    planet: mission.planet,
    launchDate: mission.launch_date,
    completionDate: mission.completion_date || undefined,
    description: mission.description,
    objectives: mission.objectives,
    datasetUrl: mission.dataset_url,
    imageUrl: mission.image_url || undefined,
    color: mission.color,
    icon: mission.icon,
  }));
}

export async function fetchPlanets(): Promise<Planet[]> {
  const response = await fetch("/api/planets");

  if (!response.ok) {
    throw new Error("Failed to fetch planets");
  }

  const data: PlanetResponse[] = await response.json();

  return data.map((planet) => ({
    slug: planet.slug,
    name: planet.name,
    color: planet.color,
    glow: planet.glow,
    short: planet.short,
    description: planet.description,
    facts: planet.facts,
    hasRings: planet.has_rings,
    size: planet.size || undefined,
    texture: planet.texture || undefined,
    ringTexture: planet.ring_texture || undefined,
  }));
}

export async function syncMissions(): Promise<{ success: boolean; count: number }> {
  const response = await fetch("/api/missions/sync", {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Failed to sync missions");
  }

  return response.json();
}

export async function syncPlanets(): Promise<{ success: boolean; count: number }> {
  const response = await fetch("/api/planets/sync", {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Failed to sync planets");
  }

  return response.json();
}
