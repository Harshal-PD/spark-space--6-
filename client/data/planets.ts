export type Planet = {
  slug: string;
  name: string;
  color: string; // base color hex for material
  glow: string; // glow/accent hex
  short: string; // short hover blurb
  description: string; // longer description for detail page
  facts: { label: string; value: string }[];
  hasRings?: boolean;
  size?: number; // relative 3D size (Earth = 1)
  texture?: string; // URL to equirectangular or photo texture
  ringTexture?: string; // URL to ring texture (if applicable)
};

export const PLANETS: Planet[] = [
  {
    slug: "mercury",
    name: "Mercury",
    color: "#9ca3af",
    glow: "#60a5fa",
    short: "Smallest planet, closest to the Sun with extreme temperature swings.",
    description:
      "Mercury is the smallest and innermost planet in the Solar System. Its surface is cratered like the Moon and it has almost no atmosphere.",
    facts: [
      { label: "Orbital period", value: "88 days" },
      { label: "Mean radius", value: "2,439.7 km" },
      { label: "Day length", value: "59 Earth days" },
    ],
    size: 0.7,
    texture: "https://cdn.builder.io/api/v1/image/assets%2F0cc0dbf4af1f4b28baeda2a625a6fb28%2F26590902ca0e4fc2a0ff7df6f351319d",
  },
  {
    slug: "venus",
    name: "Venus",
    color: "#f59e0b",
    glow: "#f472b6",
    short: "Shrouded in thick clouds with a runaway greenhouse effect.",
    description:
      "Venus is similar in size to Earth but has a thick, toxic atmosphere and surface temperatures hot enough to melt lead.",
    facts: [
      { label: "Orbital period", value: "225 days" },
      { label: "Mean radius", value: "6,051.8 km" },
      { label: "Surface temp", value: "~465°C" },
    ],
    size: 0.95,
    texture: "https://cdn.builder.io/api/v1/image/assets%2F0cc0dbf4af1f4b28baeda2a625a6fb28%2Ffa2d85ddcfa34a4f93b85fa2a3745015",
  },
  {
    slug: "earth",
    name: "Earth",
    color: "#22d3ee",
    glow: "#84cc16",
    short: "Our home world—liquid water oceans and life-supporting atmosphere.",
    description:
      "Earth is the third planet from the Sun and the only place in the universe known to harbor life, with vast oceans and diverse climates.",
    facts: [
      { label: "Orbital period", value: "365.25 days" },
      { label: "Mean radius", value: "6,371 km" },
      { label: "Moons", value: "1 (the Moon)" },
    ],
    size: 1,
    texture: "https://cdn.builder.io/api/v1/image/assets%2F0cc0dbf4af1f4b28baeda2a625a6fb28%2Fc6d54e11258f437db7a1dc0cc0e7781e",
  },
  {
    slug: "mars",
    name: "Mars",
    color: "#ef4444",
    glow: "#f97316",
    short: "The Red Planet—home to Olympus Mons and ancient riverbeds.",
    description:
      "Mars is a cold desert world with a thin atmosphere. Evidence suggests it once had flowing water and perhaps conditions suitable for life.",
    facts: [
      { label: "Orbital period", value: "687 days" },
      { label: "Mean radius", value: "3,389.5 km" },
      { label: "Moons", value: "Phobos & Deimos" },
    ],
    size: 0.53,
    texture: "https://cdn.builder.io/api/v1/image/assets%2F0cc0dbf4af1f4b28baeda2a625a6fb28%2F3143db63a0764512ab6a24e6942593f0",
  },
  {
    slug: "jupiter",
    name: "Jupiter",
    color: "#fbbf24",
    glow: "#60a5fa",
    short: "Giant gas world with the Great Red Spot and dozens of moons.",
    description:
      "Jupiter is the largest planet, a gas giant with powerful storms and a strong magnetic field. Its moons form a miniature solar system.",
    facts: [
      { label: "Orbital period", value: "11.86 years" },
      { label: "Mean radius", value: "69,911 km" },
      { label: "Moons", value: "> 90" },
    ],
    size: 11,
    texture: "https://cdn.builder.io/api/v1/image/assets%2F0cc0dbf4af1f4b28baeda2a625a6fb28%2Faa0f5db6cb8b434a85259a6cd945f669",
  },
  {
    slug: "saturn",
    name: "Saturn",
    color: "#fde68a",
    glow: "#a78bfa",
    short: "Iconic ring system made of ice and rock particles.",
    description:
      "Saturn is a gas giant known for its stunning rings. It has numerous moons, including Titan with a thick atmosphere.",
    facts: [
      { label: "Orbital period", value: "29.46 years" },
      { label: "Mean radius", value: "58,232 km" },
      { label: "Rings", value: "Prominent and complex" },
    ],
    hasRings: true,
    size: 9.1,
    texture: "https://cdn.builder.io/api/v1/image/assets%2F0cc0dbf4af1f4b28baeda2a625a6fb28%2F85fbeb7b5cd741ca9bce110836c431b7",
    ringTexture: "https://cdn.builder.io/api/v1/image/assets%2F0cc0dbf4af1f4b28baeda2a625a6fb28%2F3ad96b7f90c34dd6aeba4ab81a06590c",
  },
  {
    slug: "uranus",
    name: "Uranus",
    color: "#60a5fa",
    glow: "#a7f3d0",
    short: "An ice giant that rotates on its side.",
    description:
      "Uranus is an ice giant with a pale blue color due to methane in its atmosphere and an unusual axial tilt of about 98 degrees.",
    facts: [
      { label: "Orbital period", value: "84 years" },
      { label: "Mean radius", value: "25,362 km" },
      { label: "Moons", value: "27 known" },
    ],
    size: 4,
    texture: "https://cdn.builder.io/api/v1/image/assets%2F0cc0dbf4af1f4b28baeda2a625a6fb28%2F9eb43f2e35e94e088e8b5aa19131d12c",
  },
  {
    slug: "neptune",
    name: "Neptune",
    color: "#3b82f6",
    glow: "#93c5fd",
    short: "Farthest known planet with supersonic winds.",
    description:
      "Neptune is a deep blue ice giant with dynamic weather and the strongest winds in the solar system.",
    facts: [
      { label: "Orbital period", value: "164.8 years" },
      { label: "Mean radius", value: "24,622 km" },
      { label: "Moons", value: "14 known" },
    ],
    size: 3.9,
    texture: "https://cdn.builder.io/api/v1/image/assets%2F0cc0dbf4af1f4b28baeda2a625a6fb28%2Fc5be8f956000442dabf730a1d8302f39",
  },
  {
    slug: "moon",
    name: "Moon",
    color: "#cbd5e1",
    glow: "#93c5fd",
    short: "Earth's natural satellite with a heavily cratered surface.",
    description:
      "The Moon is Earth's only natural satellite. Its synchronous rotation means the same side always faces Earth, and its surface is covered with ancient impact craters.",
    facts: [
      { label: "Orbital period", value: "27.3 days (sidereal)" },
      { label: "Mean radius", value: "1,737.4 km" },
      { label: "Orbits", value: "Earth" },
    ],
    size: 0.27,
    texture: "https://cdn.builder.io/api/v1/image/assets%2F0cc0dbf4af1f4b28baeda2a625a6fb28%2Ff9c43f9660a44962876fdb90714fd886",
  },
  {
    slug: "pluto",
    name: "Pluto",
    color: "#d1bfa3",
    glow: "#a78bfa",
    short: "Dwarf planet in the Kuiper Belt discovered in 1930.",
    description:
      "Pluto is a dwarf planet in the Kuiper Belt. It has a complex geology with icy plains and mountains, and a thin, variable atmosphere.",
    facts: [
      { label: "Orbital period", value: "248 years" },
      { label: "Mean radius", value: "1,188.3 km" },
      { label: "Status", value: "Dwarf planet" },
    ],
    size: 0.186,
  },
];
