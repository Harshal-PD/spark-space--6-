import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleGeminiChat } from "./routes/gemini";
import { handleGetMissions, handleSyncMissions } from "./routes/missions";
import { handleGetPlanets, handleSyncPlanets } from "./routes/planets";

export function createServer() {
  const app = express();

  // ---- NETLIFY PREFIX STRIP (important) ----
  // Netlify forwards requests to /.netlify/functions/<fnname>/<splat>.
  // When using a redirect to /.netlify/functions/api/:splat the runtime path becomes
  // "/.netlify/functions/api/..." which doesn't match routes registered as "/api/..."
  // This middleware strips that prefix automatically when running on Netlify.
  if (process.env.NETLIFY) {
    app.use((req, _res, next) => {
      const prefix = "/.netlify/functions/api";
      if (typeof req.url === "string" && req.url.startsWith(prefix)) {
        req.url = req.url.slice(prefix.length) || "/";
      }
      next();
    });
  }
  // -------------------------------------------

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Add some logging for debugging bodies/headers on Netlify
  app.post("/api/chat/gemini", (req, res, next) => {
    if (process.env.NETLIFY) {
      console.log("[Netlify] GEMINI incoming headers:", JSON.stringify(req.headers || {}));
try {
  console.log("[Netlify] GEMINI incoming raw body type:", typeof req.body);
  // print a short preview (avoid huge logs)
  const preview = typeof req.body === "object" ? JSON.stringify(req.body, Object.keys(req.body).slice(0,20)) : String(req.body).slice(0,1000);
  console.log("[Netlify] GEMINI incoming body preview:", preview);
} catch (e) {
  console.log("[Netlify] GEMINI body logging error:", String(e));
}
      console.log("[Netlify] /api/chat/gemini headers:", JSON.stringify(req.headers));
      console.log("[Netlify] /api/chat/gemini body:", JSON.stringify(req.body));
    }
    return handleGeminiChat(req, res, next);
  });

  // Missions API routes
  app.get("/api/missions", handleGetMissions);
  app.post("/api/missions/sync", handleSyncMissions);

  // Planets API routes
  app.get("/api/planets", handleGetPlanets);
  app.post("/api/planets/sync", handleSyncPlanets);

  return app;
}
