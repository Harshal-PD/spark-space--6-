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
app.post("/api/chat/gemini", async (req, res) => {
  console.log("[Netlify] Incoming /api/chat/gemini headers:", JSON.stringify(req.headers || {}));
  console.log("[Netlify] Incoming /api/chat/gemini rawBodyType:", typeof req.body);
  
  let raw = req.body;
  let messages: any = undefined;

  // If body is a string, try parse it
  if (typeof raw === "string" && raw.trim().length > 0) {
    try {
      const parsed = JSON.parse(raw);
      messages = parsed?.messages ?? parsed?.payload?.messages ?? parsed;
    } catch (err) {
      // raw is a plain string (not JSON), treat as single message
      messages = [{ role: "user", content: raw }];
    }
  }

  // If body is an object, try common shapes
  if (!messages && typeof raw === "object" && raw !== null) {
    // 1) Normal case: { messages: [...] }
    if (Array.isArray(raw.messages)) {
      messages = raw.messages;
    } else if (Array.isArray(raw.payload?.messages)) {
      messages = raw.payload.messages;
    } else if (Array.isArray(raw.data?.messages)) {
      messages = raw.data.messages;
    } else if (Array.isArray(raw)) {
      // body is an actual array
      messages = raw;
    } else {
      // 2) Handle object that has numeric keys like { "0": {...}, "1": {...} }
      const keys = Object.keys(raw);
      const allNumeric = keys.length > 0 && keys.every(k => /^\d+$/.test(k));
      if (allNumeric) {
        // convert to array preserving numeric order
        messages = keys
          .map(k => ({ idx: Number(k), val: raw[k] }))
          .sort((a,b) => a.idx - b.idx)
          .map(x => x.val);
      } else {
        // 3) Maybe the client sent top-level messages object under some other key
        messages = raw.messages ?? raw.payload?.messages ?? raw.data?.messages ?? undefined;
      }
    }
  }

  // If messages is a string (double-encoded), try parse
  if (!Array.isArray(messages) && typeof messages === "string") {
    try {
      const parsed = JSON.parse(messages);
      messages = parsed?.messages ?? parsed;
    } catch (err) {
      // can't parse
    }
  }

  // Final fallback: if req.body itself is an array-like arguments object (rare)
  if (!Array.isArray(messages) && typeof req.body === "object" && req.body !== null && Array.isArray(Object.values(req.body))) {
    const vals = Object.values(req.body);
    const allMsgLike = vals.length > 0 && vals.every(v => v && (v.content || typeof v === "string"));
    if (allMsgLike) messages = vals;
  }

  // Final validation & debug response
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({
      error: "Invalid request: messages array required",
      debug: {
        receivedType: typeof req.body,
        receivedKeys: typeof req.body === "object" && req.body !== null ? Object.keys(req.body) : null,
        note: "Handler tried to find messages in common shapes and numeric-key objects.",
        hint: "Best format: Content-Type: application/json and body JSON.stringify({ messages: [...] })"
      }
    });
  }

  // Normalize each message to { role, content }
  const normalized = messages.map((m: any) => {
    if (typeof m === "string") return { role: "user", content: m };
    if (m?.content) return { role: m.role ?? "user", content: m.content };
    if (m?.text) return { role: m.role ?? "user", content: m.text };
    if (m?.message) return { role: m.role ?? "user", content: m.message };
    // fallback: stringified object
    return { role: m?.role ?? "user", content: JSON.stringify(m) };
  });

  req.body = { messages: normalized };

  // --- existing Gemini logic (unchanged) ---
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("[Netlify] GEMINI_API_KEY not set");
      return res.status(500).json({
        error: "AI service not configured",
        message: "GEMINI_API_KEY environment variable is not set. Please configure it in Netlify dashboard.",
      });
    }

    const { messages } = req.body;
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Invalid request: messages array required" });
    }

    const model = "gemini-2.0-flash";
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
        details: text,
      });
    }

    const data = await response.json();
    const candidate = data?.candidates?.[0];
    const parts: string[] = candidate?.content?.parts?.map((p: any) => p?.text).filter(Boolean) ?? [];
    const text = parts.join("\n");

    console.log("[Netlify] Chat response received");
    return res.json({
      role: "assistant",
      content: text,
      model,
    });
  } catch (error: any) {
    console.error("[Netlify] Chat error:", error);
    return res.status(500).json({
      error: "Failed to contact Gemini API",
      details: error?.message ?? String(error),
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
