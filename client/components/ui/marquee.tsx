import React from "react";
import { cn } from "@/lib/utils";

export function Marquee({ children, className, duration = 30 }: { children: React.ReactNode; className?: string; duration?: number }) {
  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent" />
      <div className="flex w-[200%] animate-marquee whitespace-nowrap" style={{ animationDuration: `${duration}s` }}>
        <div className="flex w-1/2 items-center gap-10 px-6">{children}</div>
        <div className="flex w-1/2 items-center gap-10 px-6" aria-hidden>{children}</div>
      </div>
    </div>
  );
}

export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 shadow-glow ring-1 ring-white/10 backdrop-blur">
      {children}
    </span>
  );
}
