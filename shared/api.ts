/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

// Chat types used by the Gemini chatbot
export type ChatRole = "user" | "assistant" | "system";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export interface ChatRequest {
  model?: string;
  messages: ChatMessage[];
}

export interface ChatResponse {
  role: Extract<ChatRole, "assistant">;
  content: string;
  model: string;
}
