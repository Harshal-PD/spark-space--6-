import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float, Billboard } from "@react-three/drei";
import { useMemo, useRef, useEffect, useState } from "react";
import * as THREE from "three";
import {
  generatePlanetTexture,
  generateGlowTexture,
  generateRingTexture,
} from "@/lib/textures";
import { PLANETS } from "@/data/planets";

function Sun({ boost = false }: { boost?: boolean }) {
  const ref = useRef<THREE.Mesh>(null!);
  const aura = useRef<THREE.Mesh>(null!);
  const flare = useRef<THREE.Mesh>(null!);
  const [map, setMap] = useState<THREE.Texture | null>(null);
  const glowMap = useMemo(() => generateGlowTexture(), []);
  const sunTextureUrl =
    "https://cdn.builder.io/api/v1/image/assets%2F0cc0dbf4af1f4b28baeda2a625a6fb28%2Fe645d2ef91d94bba8e72fa1b80cbd833";

  useEffect(() => {
    let mounted = true;
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");
    loader.load(
      sunTextureUrl,
      (tex) => {
        if (!mounted) return;
        tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
        tex.anisotropy = 4;
        setMap(tex);
      },
      undefined,
      () => {
        if (!mounted) return;
        setMap(generatePlanetTexture("#FDB813", "#FF6B00", 512, 7));
      },
    );
    return () => {
      mounted = false;
    };
  }, []);

  const time = useRef(0);
  useFrame((_, delta) => {
    time.current += delta;
    if (!ref.current) return;
    const speed = boost ? 0.16 : 0.08;
    ref.current.rotation.y += delta * speed;
    const mat = ref.current.material as THREE.MeshStandardMaterial;
    if (mat.map) mat.map.rotation += delta * (boost ? 0.05 : 0.02);
    if (aura.current) {
      aura.current.rotation.y += delta * 0.03;
      const pulse =
        1 + (boost ? 0.06 : 0.03) * Math.sin(time.current * (boost ? 3 : 2));
      aura.current.scale.setScalar(pulse);
    }
  });

  return (
    <group>
      <mesh ref={ref} position={[0, 0, 0]} castShadow receiveShadow>
        <sphereGeometry args={[1.35, 64, 64]} />
        <meshStandardMaterial
          map={map ?? undefined}
          emissive={new THREE.Color("#ff5100")}
          emissiveIntensity={boost ? 1.05 : 0.85}
          metalness={0.08}
          roughness={0.55}
          emissiveMap={map ?? undefined}
        />
      </mesh>
      {/* simple additive aura */}
      <mesh ref={aura}>
        <sphereGeometry args={[1.75, 32, 32]} />
        <meshBasicMaterial
          color="#ff6a00"
          transparent
          opacity={0.38}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <Billboard>
        <mesh ref={flare}>
          <planeGeometry args={[4.5, 4.5]} />
          <meshBasicMaterial
            map={glowMap}
            transparent
            opacity={0.55}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </Billboard>
    </group>
  );
}

function OrbitingMoons() {
  const group = useRef<THREE.Group>(null!);
  const positions = useMemo(() => {
    const arr: {
      r: number;
      size: number;
      speed: number;
      tilt: number;
      seed: number;
    }[] = [];
    for (let i = 0; i < 6; i++) {
      arr.push({
        r: 2 + i * 0.35,
        size: 0.06 + Math.random() * 0.12,
        speed: 0.2 + Math.random() * 0.5,
        tilt: Math.random() * Math.PI,
        seed: Math.random() * 100,
      });
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.1;
  });

  return (
    <group ref={group}>
      {positions.map((p, i) => (
        <Float
          key={i}
          speed={p.speed}
          rotationIntensity={0.2}
          floatIntensity={0.3}
        >
          <mesh
            position={[
              p.r * Math.cos(p.tilt + i),
              0.15 * Math.sin(i),
              p.r * Math.sin(p.tilt + i),
            ]}
          >
            <icosahedronGeometry args={[p.size, 0]} />
            <meshStandardMaterial
              map={generatePlanetTexture("#93c5fd", "#7c3aed", 256, p.seed)}
              roughness={0.7}
              metalness={0.2}
              emissive="#7c3aed"
              emissiveIntensity={0.1}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function PlanetBG({
  textureUrl,
  color,
  glow,
  size = 1,
  ringTextureUrl,
  position,
}: {
  textureUrl?: string;
  color: string;
  glow: string;
  size?: number;
  ringTextureUrl?: string;
  position: [number, number, number];
}) {
  const mesh = useRef<THREE.Mesh>(null!);
  const [mapTex, setMapTex] = useState<THREE.Texture | null>(null);
  const [ringTex, setRingTex] = useState<THREE.Texture | null>(null);
  const fallback = useMemo(
    () => generatePlanetTexture(color, glow, 512, (size ?? 1) * 7),
    [color, glow, size],
  );
  const ringFallback = useMemo(
    () => (ringTextureUrl ? generateRingTexture(glow, 1024) : null),
    [ringTextureUrl, glow],
  );

  useEffect(() => {
    let mounted = true;
    if (!textureUrl) {
      setMapTex(null);
      return;
    }
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");
    loader.load(
      textureUrl,
      (tex) => {
        if (!mounted) return;
        tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
        tex.anisotropy = 4;
        tex.colorSpace = THREE.SRGBColorSpace;
        setMapTex(tex);
      },
      undefined,
      () => setMapTex(null),
    );
    return () => {
      mounted = false;
    };
  }, [textureUrl]);

  useEffect(() => {
    let mounted = true;
    if (!ringTextureUrl) {
      setRingTex(null);
      return;
    }
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");
    loader.load(
      ringTextureUrl,
      (tex) => {
        if (!mounted) return;
        tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
        tex.anisotropy = 4;
        tex.colorSpace = THREE.SRGBColorSpace;
        setRingTex(tex);
      },
      undefined,
      () => setRingTex(null),
    );
    return () => {
      mounted = false;
    };
  }, [ringTextureUrl]);

  const base = 0.18;
  const mult = 1.35; // overall size boost
  const radius = (base + 0.14 * Math.log2((size ?? 1) + 1)) * mult;

  return (
    <group position={position}>
      <mesh ref={mesh}>
        <sphereGeometry args={[radius, 48, 48]} />
        <meshBasicMaterial map={mapTex ?? fallback} />
      </mesh>
      {(ringTex || ringFallback) && (
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[radius * 1.6, radius * 0.18, 2, 220]} />
          <meshStandardMaterial
            map={ringTex ?? ringFallback ?? undefined}
            transparent
            opacity={0.75}
            color={glow}
          />
        </mesh>
      )}
    </group>
  );
}

function BackgroundPlanets() {
  const group = useRef<THREE.Group>(null!);
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.03;
  });

  const bodies = useMemo(() => {
    return PLANETS.filter((p) => p.slug !== "moon")
      .map((p, i) => ({
        p,
        r: 2.4 + i * 0.6,
        angle: i * 0.6,
        y: (i % 3) * 0.22 - 0.22,
      }))
      .slice(0, 9);
  }, []);

  return (
    <group ref={group}>
      {bodies.map(({ p, r, angle, y }, i) => (
        <Float
          key={p.slug}
          speed={1 + (i % 3) * 0.3}
          rotationIntensity={0.1}
          floatIntensity={0.15}
        >
          <PlanetBG
            textureUrl={p.texture}
            ringTextureUrl={p.ringTexture}
            color={p.color}
            glow={p.glow}
            size={p.size}
            position={[r * Math.cos(angle), y, r * Math.sin(angle)]}
          />
        </Float>
      ))}
    </group>
  );
}

function DustField() {
  const points = useRef<THREE.Points>(null!);
  const vertices = useMemo(() => {
    const v: number[] = [];
    for (let i = 0; i < 2000; i++) {
      const x = THREE.MathUtils.randFloatSpread(80);
      const y = THREE.MathUtils.randFloatSpread(80);
      const z = THREE.MathUtils.randFloatSpread(80);
      v.push(x, y, z);
    }
    return new Float32Array(v);
  }, []);

  useFrame((_, delta) => {
    if (!points.current) return;
    points.current.rotation.y += delta * 0.01;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={vertices.length / 3}
          array={vertices}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#60a5fa"
        sizeAttenuation
        transparent
        opacity={0.7}
      />
    </points>
  );
}

export default function SpaceBackground({
  hoverBoost = false,
}: {
  hoverBoost?: boolean;
}) {
  const [x, setX] = useState(0);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setX(mq.matches ? 3.8 : 1.4);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <Canvas
      dpr={[1, 2]}
      gl={{
        antialias: true,
        outputColorSpace: THREE.SRGBColorSpace,
        toneMapping: THREE.NoToneMapping,
      }}
      camera={{ position: [0, 0, 6], fov: 60 }}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <color attach="background" args={["#050816"]} />
      <ambientLight intensity={0.5} color="#ffffff" />
      <pointLight position={[6, 6, 6]} intensity={1.5} color="#ff8800" />
      <pointLight position={[-6, -4, -6]} intensity={0.8} color="#ffffff" />
      <Stars
        radius={100}
        depth={50}
        count={4000}
        factor={4}
        saturation={0}
        fade
        speed={0.6}
      />
      <group position={[x, 0, -2]}>
        <Sun boost={hoverBoost} />
        <OrbitingMoons />
        <BackgroundPlanets />
      </group>
      <DustField />
    </Canvas>
  );
}
