import { Rocket, Globe, Brain, Database, Zap, Shield } from "lucide-react";
import Reveal from "@/components/ui/reveal";
import { Link } from "react-router-dom";

export default function AboutPage() {
  const features = [
    {
      icon: Rocket,
      title: "Mission Tracking",
      description:
        "Real-time monitoring of NASA missions across the solar system. Track active rovers, orbiters, and space stations with up-to-date status information.",
      color: "from-red-500 to-orange-500",
    },
    {
      icon: Globe,
      title: "Planetary Data",
      description:
        "Comprehensive information about planets, moons, and celestial bodies. Explore physical characteristics, orbital data, and stunning 3D visualizations.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Brain,
      title: "AI Assistance",
      description:
        "Powered by advanced AI, get instant answers to your space exploration questions. Our intelligent assistant provides insights and explanations about missions and celestial bodies.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Database,
      title: "Data Visualization",
      description:
        "Interactive charts and analytics showing mission statistics, planetary comparisons, and space exploration trends with real-time data updates.",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Zap,
      title: "Real-time Updates",
      description:
        "Stay informed with live mission updates, latest discoveries, and breaking space news. Our platform continuously syncs with NASA APIs for the freshest data.",
      color: "from-green-500 to-teal-500",
    },
    {
      icon: Shield,
      title: "Reliable Data",
      description:
        "All data sourced directly from NASA APIs and official space agencies. Verified information you can trust for your space exploration journey.",
      color: "from-indigo-500 to-blue-500",
    },
  ];

  const team = [
    {
      role: "Mission Control",
      description:
        "Navigate through the cosmos with our intuitive interface designed for space enthusiasts, researchers, and explorers of all levels.",
    },
    {
      role: "Data Intelligence",
      description:
        "Leverage comprehensive datasets combining mission telemetry, planetary measurements, and historical space exploration data.",
    },
    {
      role: "AI Guidance",
      description:
        "Experience the future of space exploration with AI-powered insights, recommendations, and educational content at your fingertips.",
    },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-white/10 py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.15),transparent_50%)]" />
        <div className="container relative z-10 mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/20 ring-1 ring-indigo-500/30">
              <Rocket className="h-6 w-6 text-indigo-300" />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              About SpaceExplorer
            </h1>
          </div>
          <p className="max-w-2xl text-lg text-white/70">
            Discover the universe like never before. SpaceExplorer combines cutting-edge NASA data with AI-powered insights to bring space exploration to everyone.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="border-b border-white/10 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <Reveal delay={0}>
              <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-lg text-white/70 leading-relaxed mb-6">
                At SpaceExplorer, we believe that space exploration should be accessible to everyone. Our platform democratizes space data by combining real-time mission information from NASA with powerful AI assistance and beautiful data visualizations.
              </p>
              <p className="text-lg text-white/70 leading-relaxed">
                Whether you're a student learning about the solar system, a researcher analyzing mission data, or simply an enthusiast curious about humanity's ventures into space, SpaceExplorer provides the tools and knowledge you need.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="border-b border-white/10 py-20">
        <div className="container mx-auto px-6">
          <h2 className="mb-12 text-3xl font-bold text-white">Core Features</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <Reveal key={feature.title} delay={i * 50}>
                  <div className="group rounded-2xl border border-white/10 bg-white/5 p-8 transition-all duration-300 hover:border-white/20 hover:bg-white/10 backdrop-blur">
                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${feature.color} mb-4`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="mb-3 text-lg font-semibold text-white">{feature.title}</h3>
                    <p className="text-white/70">{feature.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="border-b border-white/10 py-20">
        <div className="container mx-auto px-6">
          <h2 className="mb-12 text-3xl font-bold text-white">How We Work</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {team.map((item, i) => (
              <Reveal key={item.role} delay={i * 100}>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/20 text-lg font-bold text-indigo-300">
                    {i + 1}
                  </div>
                  <h3 className="mb-3 text-lg font-semibold text-white">{item.role}</h3>
                  <p className="text-white/70">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b border-white/10 py-20">
        <div className="container mx-auto px-6">
          <div className="grid gap-8 sm:grid-cols-3">
            <Reveal delay={0}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur">
                <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
                  8+
                </p>
                <p className="mt-2 text-white/70">Active Missions</p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur">
                <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
                  10+
                </p>
                <p className="mt-2 text-white/70">Planets & Moons</p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur">
                <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                  50-60 %
                </p>
                <p className="mt-2 text-white/70">NASA And External Data</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="border-b border-white/10 py-20">
        <div className="container mx-auto px-6">
          <h2 className="mb-12 text-3xl font-bold text-white">Built With Modern Tech</h2>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <p className="text-white/70 leading-relaxed mb-6">
              SpaceExplorer is built on a modern technology stack including React for dynamic user interfaces, Three.js for stunning 3D visualizations, and integration with NASA APIs for real-time mission data. Our AI assistant is powered by Google's Gemini AI, providing intelligent responses to your space-related questions.
            </p>
            <p className="text-white/70 leading-relaxed">
              The platform is designed for performance, accessibility, and scalability, ensuring that space exploration data is available to everyone, everywhere, at any time.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <Reveal delay={0}>
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/20 p-12 backdrop-blur">
              <h2 className="mb-4 text-3xl font-bold text-white">Ready to Explore?</h2>
              <p className="mb-8 text-lg text-white/70">
                Start your space exploration journey today. Dive into mission data, visualize planetary information, and chat with our AI assistant.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/missions"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 px-6 py-3 font-semibold text-white transition-all hover:from-indigo-500 hover:via-violet-500 hover:to-fuchsia-500"
                >
                  <Rocket className="h-5 w-5" />
                  View Missions
                </Link>
                <Link
                  to="/planets/earth"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition-all hover:border-white/40 hover:bg-white/10"
                >
                  <Globe className="h-5 w-5" />
                  Explore Planets
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
