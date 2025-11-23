import { useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "./ChatContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { X, Loader2 } from "lucide-react";

export default function ChatWidget() {
  const { open, setOpen, messages, send, sending, clear } = useChat();
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const history = useMemo(() => messages.filter((m) => m.role !== "system"), [messages]);

  if (!open) return null;

  return (
    <div className="fixed bottom-24 right-5 z-[60] w-[min(92vw,28rem)] overflow-hidden rounded-2xl border border-white/10 bg-background/90 text-foreground shadow-2xl backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white">
            ✨
          </span>
          <h3 className="text-sm font-semibold">AI Copilot</h3>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={clear} className="text-xs">Clear</Button>
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close chat">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex max-h-[60vh] flex-col gap-3 overflow-y-auto px-4 py-3">
        {history.length === 0 ? (
          <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-white/70">
            Ask about planets, missions, or astronomy topics. Try: "What are the differences between gas giants and terrestrial planets?"
          </div>
        ) : null}
        {history.map((m, idx) => (
          <div key={idx} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`${
                m.role === "user"
                  ? "bg-gradient-to-br from-indigo-600/90 to-fuchsia-600/90 text-white"
                  : "bg-white/5 text-white/90"
              } max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2 text-sm shadow`}
            >
              {m.content}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <form
        className="grid grid-cols-[1fr_auto] items-end gap-2 border-t border-white/10 p-3"
        onSubmit={async (e) => {
          e.preventDefault();
          const value = input.trim();
          if (!value || sending) return;
          setInput("");
          await send(value);
        }}
      >
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask the AI about space..."
          className="min-h-[44px] max-h-32 resize-y rounded-xl bg-white/5 text-sm placeholder:text-white/40"
        />
        <Button type="submit" className="h-10 px-4">
          {sending ? (
            <span className="inline-flex items-center gap-2 text-sm"><Loader2 className="h-4 w-4 animate-spin" /> Sending</span>
          ) : (
            <span>Send</span>
          )}
        </Button>
      </form>
    </div>
  );
}
