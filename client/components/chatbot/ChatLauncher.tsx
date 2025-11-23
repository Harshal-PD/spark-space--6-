import { useChat } from "./ChatContext";
import { Bot } from "lucide-react";

export default function ChatLauncher() {
  const { open, setOpen } = useChat();
  return (
    <button
      aria-label="Open AI Chat"
      onClick={() => setOpen(!open)}
      className={
        "fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 text-white shadow-[0_0_0_0_rgba(139,92,246,0.8)] transition-all hover:shadow-[0_0_30px_6px_rgba(217,70,239,0.45)] focus:outline-none focus:ring-2 focus:ring-fuchsia-400/70"
      }
    >
      <Bot className="h-6 w-6 drop-shadow" />
      <span className="absolute -z-10 inset-0 rounded-full blur-xl opacity-60 bg-[radial-gradient(circle_at_30%_30%,rgba(124,58,237,0.6),transparent_40%),radial-gradient(circle_at_70%_70%,rgba(244,63,94,0.5),transparent_45%)]" />
    </button>
  );
}
