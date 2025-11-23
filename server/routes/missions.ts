import { Request, Response } from "express";
import { fetchNASAMissions } from "../lib/nasa-api";

export async function handleGetMissions(req: Request, res: Response) {
  try {
    console.log("[API] GET /api/missions - Fetching NASA missions...");
    const nasaMissions = await fetchNASAMissions();
    console.log(`[API] Successfully fetched ${nasaMissions.length} missions`);

    const demoData = nasaMissions.map((mission) => ({
      id: mission.id,
      name: mission.name,
      agency: mission.agency,
      status: mission.status,
      planet: mission.planet,
      launch_date: mission.launchDate,
      completion_date: mission.completionDate || null,
      description: mission.description,
      objectives: mission.objectives,
      dataset_url: mission.datasetUrl,
      image_url: mission.imageUrl || null,
      color: mission.color,
      icon: mission.icon,
    }));

    console.log(`[API] Sending ${demoData.length} missions to client`);
    res.json(demoData);
  } catch (error) {
    console.error("[API] Error fetching missions:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: String(error) });
  }
}

export async function handleSyncMissions(req: Request, res: Response) {
  res.json({
    success: true,
    count: 0,
    message: "Supabase integration removed. Using local hardcoded data.",
  });
}
