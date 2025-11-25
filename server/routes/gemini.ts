import type { RequestHandler } from "express";
import { z } from "zod";
import type { ChatRequest, ChatResponse, ChatMessage } from "@shared/api";


// --- safeText helper: ensure message content is a plain string for Gemini ---
const safeText = (m: any) => {
  let c = m?.content;

  if (Array.isArray(c)) {
    return c
      .map(x => (x?.content ?? (typeof x === "string" ? x : JSON.stringify(x))))
      .join("\n");
  }

  if (c && typeof c === "object") {
    if (typeof c.content === "string") return c.content;
    return JSON.stringify(c);
  }

  if (typeof c === "string") {
    const t = c.trim();
    if ((t.startsWith("{") && t.endsWith("}")) || (t.startsWith("[") && t.endsWith("]"))) {
      try {
        const parsed = JSON.parse(t);
        if (Array.isArray(parsed)) {
          return parsed.map(x => x?.content ?? (typeof x === "string" ? x : JSON.stringify(x))).join("\n");
        }
        if (parsed && typeof parsed === "object") return parsed.content ?? JSON.stringify(parsed);
      } catch (e) {
        /* not JSON, leave string */
      }
    }
    return c;
  }

  return String(c ?? "");
};
// --- end safeText ---

const ChatSchema = z.object({
  model: z.string().optional(),
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant", "system"]),
        content: z.string().min(1),
      }),
    )
    .min(1),
});

function toGeminiContents(messages: ChatMessage[]) {
  // Gemini expects roles: "user" and "model" only. We fold any system message into the first user turn.
  const contents: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }> = [];
  let systemPreamble = "";
  for (const m of messages) {
    if (m.role === "system") {
      systemPreamble += (systemPreamble ? "\n\n" : "") + m.content;
      continue;
    }
    const role = m.role === "assistant" ? "model" : "user";
    const text = m.role === "user" && systemPreamble ? `${systemPreamble}\n\n${m.content}` : m.content;
    contents.push({ role, parts: [{ text }] });
    if (m.role === "user" && systemPreamble) {
      systemPreamble = ""; // only prepend once to the next user message
    }
  }
  return contents;
}

export const handleGeminiChat: RequestHandler = async (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY environment variable is not set");
    return res.status(500).json({
      error: "AI service not configured",
      message: "The Gemini API key is not set. Please configure GEMINI_API_KEY environment variable."
    });
  }
  let body = req.body;

  // Fix for Netlify: If body is a raw Buffer, convert it to JSON manually
  if (Buffer.isBuffer(body)) {
    try {
      const rawText = body.toString("utf-8");
      body = JSON.parse(rawText);
      console.log("[Gemini] Manually parsed Buffer body");
    } catch (e) {
      console.error("[Gemini] Failed to parse Buffer body:", e);
      // Fallback to original body if parsing fails
    }
  }
  const parsed = ChatSchema.safeParse(body as ChatRequest);
  if (!parsed.success) {
    return res.status(400).json({ 
      error: "Invalid request", 
      details: parsed.error.flatten() 
    });
  }
  

  const { messages: rawMessages, model: modelOverride } = parsed.data;
  const messages = rawMessages as ChatMessage[];
  const model = modelOverride || "gemini-2.5-flash";

  try {
    const contents = messages.map((m: any) => ({
  role: m.role === "assistant" ? "model" : "user",
  parts: [{ text: safeText(m) }],
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

    const data = (await response.json()) as any;
    const candidate = data?.candidates?.[0];
    const parts: string[] = candidate?.content?.parts?.map((p: any) => p?.text).filter(Boolean) ?? [];
    let text = parts.join("\n");
    text = text.replace(/\*\*/g, ""); 
    
    // Optional: If you also want to remove single stars (italics), uncomment the line below:
    text = text.replace(/\*/g, "");

    const payload: ChatResponse = {
      role: "assistant",
      content: text,
      model,
    };

    res.status(200).json(payload);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to contact Gemini API", details: err?.message ?? String(err) });
  }
};
