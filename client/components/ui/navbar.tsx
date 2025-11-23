import { NavLink, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Sheet, SheetTrigger, SheetContent, SheetClose } from "@/components/ui/sheet";
import { Menu, Bot } from "lucide-react";
import { useChat } from "@/components/chatbot/ChatContext";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/missions", label: "Missions" },
  { to: "/planets", label: "Planets" },
  { to: "/data", label: "Data" },
  { to: "/about", label: "About" },
];

export default function Navbar() {
  const { setOpen } = useChat();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/70 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link to="/" className="font-extrabold tracking-tight text-xl">
          <span className="bg-gradient-to-r from-indigo-300 via-fuchsia-300 to-cyan-200 bg-clip-text text-transparent">
            SpaceExplorer
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "relative text-sm font-medium text-white/80 transition hover:text-white",
                  isActive && "text-white",
                )
              }
            >
              <span className="px-1 py-2">
                {item.label}
                <span className="absolute inset-x-1 -bottom-0.5 h-px scale-x-0 bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 opacity-0 transition md:group-hover:scale-x-100 md:group-hover:opacity-100" />
              </span>
            </NavLink>
          ))}
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 px-4 py-2 text-sm font-semibold text-white shadow-glow transition hover:from-indigo-500 hover:via-violet-500 hover:to-fuchsia-500"
          >
            <Bot className="h-4 w-4" /> Chat
          </button>
        </nav>

        {/* Mobile nav */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger aria-label="Open menu" className="inline-flex items-center justify-center rounded-md p-2 text-white/80 hover:text-white">
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent side="right" className="w-80 border-l border-white/10 bg-background/95 backdrop-blur">
              <div className="mt-8 space-y-1">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.to}>
                    <Link to={item.to} className="block rounded-lg px-4 py-3 text-base font-medium text-white/90 hover:bg-white/5">
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
                <button
                  onClick={() => setOpen(true)}
                  className="mt-4 w-full rounded-lg bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 px-4 py-3 text-base font-semibold text-white"
                >
                  Open AI Chat
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
