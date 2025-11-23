import { Link } from "react-router-dom";
import { Github, Mail, ExternalLink, Heart } from "lucide-react";

const footerSections = [
  {
    title: "Navigation",
    links: [
      { label: "Home", to: "/" },
      { label: "Missions", to: "/missions" },
      { label: "Planets", to: "/planets" },
      { label: "Data", to: "/data" },
      { label: "About", to: "/about" },
    ],
  },
  {
    title: "Planets",
    links: [
      { label: "Mercury", to: "/planets/mercury" },
      { label: "Venus", to: "/planets/venus" },
      { label: "Earth", to: "/planets/earth" },
      { label: "Mars", to: "/planets/mars" },
      { label: "Jupiter", to: "/planets/jupiter" },
    ],
  },
  {
    title: "More Planets",
    links: [
      { label: "Saturn", to: "/planets/saturn" },
      { label: "Uranus", to: "/planets/uranus" },
      { label: "Neptune", to: "/planets/neptune" },
      { label: "Moon", to: "/planets/moon" },
      { label: "Pluto", to: "/planets/pluto" },
    ],
  },
  {
    title: "Resources",
    links: [
      {
        label: "NASA",
        href: "https://www.nasa.gov",
        external: true,
      },
      {
        label: "ESA",
        href: "https://www.esa.int",
        external: true,
      },
      {
        label: "JAXA",
        href: "https://www.jaxa.jp/en/",
        external: true,
      },
      {
        label: "PDS NASA",
        href: "https://pds.nasa.gov/",
        external: true,
      },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-gradient-to-b from-background to-background/80 py-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(124,58,237,0.08),transparent_50%),radial-gradient(circle_at_100%_100%,rgba(59,130,246,0.08),transparent_50%)]" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="bg-gradient-to-r from-indigo-300 via-fuchsia-300 to-cyan-200 bg-clip-text text-2xl font-extrabold text-transparent">
                SpaceExplorer
              </span>
            </Link>
            <p className="text-sm text-white/60 mb-6">
              Your interactive platform for space exploration, mission tracking, and planetary discovery powered by real NASA and international space agency data.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="mailto:contact@spaceexplorer.com"
                className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigation Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition group"
                      >
                        {link.label}
                        <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition" />
                      </a>
                    ) : (
                      <Link to={link.to} className="text-sm text-white/60 hover:text-white transition">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mb-8" />

        {/* Bottom Section */}
        <div className="grid gap-6 md:grid-cols-3 items-center">
          {/* Credit to Space Agencies */}
          <div>
            <p className="text-xs text-white/50 mb-3 uppercase font-semibold tracking-wider">
              Data Sources
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "NASA",
                "ESA",
                "JAXA",
                "CNSA",
                "Roscosmos",
                "ISRO",
              ].map((agency) => (
                <span
                  key={agency}
                  className="inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-xs text-white/60 border border-white/10"
                >
                  {agency}
                </span>
              ))}
            </div>
          </div>

          {/* Center - Mission Statistics */}
          <div className="text-center">
            <p className="text-xs text-white/50 uppercase font-semibold tracking-wider mb-3">
              Mission Coverage
            </p>
            <div className="flex justify-center gap-6">
              <div>
                <p className="text-xl font-bold text-indigo-300">62+</p>
                <p className="text-xs text-white/60">Missions</p>
              </div>
              <div>
                <p className="text-xl font-bold text-cyan-300">10</p>
                <p className="text-xs text-white/60">Destinations</p>
              </div>
              <div>
                <p className="text-xl font-bold text-fuchsia-300">6</p>
                <p className="text-xs text-white/60">Agencies</p>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="md:text-right">
            <p className="text-xs text-white/60 flex items-center justify-start md:justify-end gap-1 mb-2">
              Made with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> for space enthusiasts
            </p>
            <p className="text-xs text-white/50">
              © 2025 SpaceExplorer. All rights reserved.
            </p>
            <p className="text-xs text-white/50 mt-1">
              Data sourced from NASA, ESA, JAXA, and international space agencies.
            </p>
          </div>
        </div>

        {/* Bottom Border Glow */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
      </div>
    </footer>
  );
}
