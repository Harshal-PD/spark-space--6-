import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleGeminiChat } from "./routes/gemini";
import { handleGetMissions, handleSyncMissions } from "./routes/missions";
import { handleGetPlanets, handleSyncPlanets } from "./routes/planets";

export function createServer() {
  const app = express();

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
  app.post("/api/chat/gemini", handleGeminiChat);

  // Missions API routes
  app.get("/api/missions", handleGetMissions);
  app.post("/api/missions/sync", handleSyncMissions);

  // Planets API routes
  app.get("/api/planets", handleGetPlanets);
  app.post("/api/planets/sync", handleSyncPlanets);

  return app;
}
