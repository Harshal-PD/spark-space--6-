import serverless from "serverless-http";
import express from "express";
import cors from "cors";

// Static imports so bundlers (Netlify) include these files
import { fetchNASAMissions } from "../../server/lib/nasa-api";
import { PLANETS } from "../../client/data/planets";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Missions API
app.get("/api/missions", async (_req, res) => {
  try {
    console.log("[Netlify] GET /api/missions");
    
    const missions = await fetchNASAMissions();
    
    const formatted = missions.map((mission) => ({
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
    
    console.log(`[Netlify] Returning ${formatted.length} missions`);
    res.json(formatted);
  } catch (error) {
    console.error("[Netlify] Error in /api/missions:", error);
    res.status(500).json({ 
      error: "Failed to fetch missions", 
      details: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
  }
});

// Planets API
app.get("/api/planets", async (_req, res) => {
  try {
    console.log("[Netlify] GET /api/planets");
    
    const formatted = PLANETS.map((planet) => ({
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
    
    res.json(formatted);
  } catch (error) {
    console.error("[Netlify] Error in /api/planets:", error);
    res.status(500).json({ 
      error: "Failed to fetch planets", 
      details: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
  }
});

// Chat API
app.post("/api/chat/gemini", async (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("[Netlify] GEMINI_API_KEY not set");
    return res.status(500).json({
      error: "AI service not configured",
      message: "GEMINI_API_KEY environment variable is not set. Please configure it in Netlify dashboard.",
    });
  }

  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Invalid request: messages array required" });
    }

    const model = "gemini-2.0-flash";
    
    // Convert messages to Gemini format
    const contents = messages.map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const url = `https://generativelanguage.googleapis.com/v1/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;

    console.log("[Netlify] POST /api/chat/gemini - Calling Gemini API");

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("[Netlify] Gemini API error:", response.status, text);
      return res.status(response.status).json({ 
        error: "Gemini API error", 
        details: text 
      });
    }

    const data = await response.json();
    const candidate = data?.candidates?.[0];
    const parts: string[] = candidate?.content?.parts?.map((p: any) => p?.text).filter(Boolean) ?? [];
    const text = parts.join("\n");

    console.log("[Netlify] Chat response received");
    res.json({
      role: "assistant",
      content: text,
      model,
    });
  } catch (error: any) {
    console.error("[Netlify] Chat error:", error);
    res.status(500).json({ 
      error: "Failed to contact Gemini API", 
      details: error?.message ?? String(error) 
    });
  }
});

// Sync endpoints (no-op for Netlify)
app.post("/api/missions/sync", (_req, res) => {
  res.json({ success: true, count: 0, message: "Using local data in Netlify" });
});

app.post("/api/planets/sync", (_req, res) => {
  res.json({ success: true, count: 0, message: "Using local data in Netlify" });
});

// Ping endpoint
app.get("/api/ping", (_req, res) => {
  res.json({ message: "pong", timestamp: new Date().toISOString() });
});

export const handler = serverless(app);
