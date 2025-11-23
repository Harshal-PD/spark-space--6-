import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ChatMessage, ChatResponse } from "@shared/api";

interface ChatContextValue {
  open: boolean;
  setOpen: (v: boolean) => void;
  sending: boolean;
  messages: ChatMessage[];
  send: (content: string) => Promise<void>;
  clear: () => void;
}

const ChatContext = createContext<ChatContextValue | null>(null);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "system", content: "You are SpaceExplorer's helpful AI copilot. Be concise and friendly. Answer clearly for non-experts, and focus on astronomy, planets, and space missions." },
  ]);

  const clear = useCallback(() => {
    setMessages((prev) => prev.filter((m) => m.role === "system"));
  }, []);

  const send = useCallback(async (content: string) => {
    const userMessage: ChatMessage = { role: "user", content };
    setMessages((prev) => [...prev, userMessage]);
    setSending(true);
    try {
      const res = await fetch("/api/chat/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });
      if (!res.ok) {
        try {
          const errorData = await res.json();
          const errorMessage = errorData.message || errorData.error || "Failed to get response from AI";
          setMessages((prev) => [...prev, { role: "assistant", content: `Sorry, I encountered an error: ${errorMessage}` }]);
        } catch {
          const text = await res.text();
          setMessages((prev) => [...prev, { role: "assistant", content: `Sorry, I encountered an error: ${text || "Unknown error"}` }]);
        }
      } else {
        const data = (await res.json()) as ChatResponse;
        setMessages((prev) => [...prev, { role: data.role, content: data.content }]);
      }
    } catch (e: any) {
      console.error("Chat API error:", e);
      const errorMessage = e?.message ?? String(e);
      let userFriendlyMessage = "I'm having trouble connecting to the AI service. Please try again.";

      if (errorMessage.includes("Failed to fetch")) {
        userFriendlyMessage = "Network error: Unable to reach the AI service. Please check your connection and try again.";
      }

      setMessages((prev) => [...prev, { role: "assistant", content: userFriendlyMessage }]);
    } finally {
      setSending(false);
    }
  }, [messages]);

  const value = useMemo<ChatContextValue>(
    () => ({ open, setOpen, sending, messages, send, clear }),
    [open, sending, messages, send, clear],
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used within ChatProvider");
  return ctx;
}
