import serverless from "serverless-http";
import express from "express";
import cors from "cors";

// Static imports so bundlers (Netlify) include these files
import { fetchNASAMissions } from "../../server/lib/nasa-api";
import { PLANETS } from "../../client/data/planets";

const app = express();

app.use((req, _res, next) => {
  try {
    const prefix = "/.netlify/functions/api";
    if (typeof req.url === "string" && req.url.startsWith(prefix)) {
      req.url = req.url.slice(prefix.length) || "/";
    }
  } catch (err) {
    // don't allow this to crash the function
    console.warn("Prefix strip error:", err);
  }
  next();

});

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
// Minimal wrapper for /api/chat/gemini — replace existing handler block with this
app.post("/api/chat/gemini", async (req, res) => {
  // minimal prefix strip (keep if you already added earlier in file)
  const PREFIX = "/.netlify/functions/api";
  if (typeof req.url === "string" && req.url.startsWith(PREFIX)) {
    req.url = req.url.slice(PREFIX.length) || "/";
  }

  // QUICK parse/normalize incoming body into messages array
  const raw = req.body;

  const toArrayFromNumericKeys = (obj: any) => {
    const keys = Object.keys(obj || {});
    if (!keys.length) return null;
    if (!keys.every(k => /^\d+$/.test(k))) return null;
    return keys
      .map(k => ({ i: Number(k), v: obj[k] }))
      .sort((a,b) => a.i - b.i)
      .map(x => x.v);
  };

  let messages: any[] | undefined;

  if (Array.isArray(raw)) {
    messages = raw;
  } else if (raw && typeof raw === "object") {
    messages = raw.messages ?? raw.payload?.messages ?? raw.data?.messages ?? toArrayFromNumericKeys(raw);
  } else if (typeof raw === "string" && raw.trim()) {
    try { 
      const parsed = JSON.parse(raw);
      messages = parsed.messages ?? parsed;
    } catch {
      messages = [{ role: "user", content: raw }];
    }
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({
      error: "Invalid request: messages array required",
      hint: "Send Content-Type: application/json and body JSON.stringify({ messages: [...] })",
    });
  }

  // Normalize each message to { role, content }
  messages = messages.map((m: any) => {
    if (!m) return { role: "user", content: "" };
    if (typeof m === "string") return { role: "user", content: m };
    return { role: m.role ?? "user", content: m.content ?? m.text ?? m.message ?? JSON.stringify(m) };
  });

  // Attach normalized messages and continue with your existing Gemini logic
  req.body = { messages };

  // --- existing Gemini call (kept compact) ---
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "GEMINI_API_KEY not configured" });

    const model = "gemini-2.0-flash";
    const contents = messages.map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const url = `https://generativelanguage.googleapis.com/v1/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents }),
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({ error: "Gemini API error", details: text });
    }

    const data = await response.json();
    const candidate = data?.candidates?.[0];
    const parts: string[] = candidate?.content?.parts?.map((p: any) => p?.text).filter(Boolean) ?? [];
    let text = parts.join("\n");

    // Optional: short-mode truncation if env var set
    if (process.env.SHORT_GEMINI_RESPONSES === "1") {
      // keep only the first sentence (very simple heuristic)
      const dotMatch = text.match(/(.+?[.!?])(\s|$)/);
      if (dotMatch) text = dotMatch[1].trim();
    }

    return res.json({ role: "assistant", content: text, model });
  } catch (err: any) {
    console.error("Gemini call error:", err);
    return res.status(500).json({ error: "Failed to contact Gemini API", details: String(err) });
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
