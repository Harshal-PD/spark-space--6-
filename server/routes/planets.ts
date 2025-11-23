import { Request, Response } from "express";
import { fetchNASAPlanets } from "../lib/nasa-api";

export async function handleGetPlanets(req: Request, res: Response) {
  try {
    const nasaPlanets = await fetchNASAPlanets();
    const demoData = nasaPlanets.map((planet) => ({
      id: planet.slug,
      slug: planet.slug,
      name: planet.name,
      color: planet.color,
      glow: planet.glow,
      short: planet.short,
      description: planet.description,
      facts: planet.facts,
      has_rings: planet.hasRings || false,
      size: planet.size || null,
      texture: planet.texture || null,
      ring_texture: planet.ringTexture || null,
    }));

    res.json(demoData);
  } catch (error) {
    console.error("Error fetching planets:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function handleSyncPlanets(req: Request, res: Response) {
  res.json({
    success: true,
    count: 0,
    message: "Supabase integration removed. Using local hardcoded data.",
  });
}
