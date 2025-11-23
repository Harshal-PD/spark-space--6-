import * as THREE from "three";

function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  const bigint = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function fractal(x: number, y: number, seed: number) {
  // lightweight pseudo-noise built from sines; fast and deterministic
  let v = 0;
  let amp = 0.5;
  let freq = 0.02;
  for (let i = 0; i < 5; i++) {
    v += amp * (Math.sin((x + seed) * freq) * Math.cos((y - seed) * freq));
    amp *= 0.5;
    freq *= 2.0;
  }
  return (v + 1) / 2; // normalize 0..1
}

export function generatePlanetTexture(primary: string, secondary: string, size = 512, seed = 1) {
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const ctx = c.getContext("2d")!;
  const p = hexToRgb(primary);
  const s = hexToRgb(secondary);
  const imageData = ctx.createImageData(size, size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const n = fractal(x, y, seed);
      const t = 0.3 + 0.7 * n; // more contrast
      const r = Math.round(lerp(p.r, s.r, t));
      const g = Math.round(lerp(p.g, s.g, t));
      const b = Math.round(lerp(p.b, s.b, t));
      const i = (y * size + x) * 4;
      imageData.data[i] = r;
      imageData.data[i + 1] = g;
      imageData.data[i + 2] = b;
      imageData.data[i + 3] = 255;
    }
  }
  ctx.putImageData(imageData, 0, 0);
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 4;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function generateRingTexture(color = "#ffffff", size = 1024) {
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const ctx = c.getContext("2d")!;
  const center = size / 2;
  for (let r = center * 0.3; r < center * 0.48; r++) {
    const alpha = 1 - (r - center * 0.3) / (center * 0.18);
    ctx.strokeStyle = `${color}${Math.max(0, Math.min(255, Math.round(alpha * 160))).toString(16).padStart(2, "0")}`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(center, center, r, 0, Math.PI * 2);
    ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.anisotropy = 4;
  return tex;
}

export function generateGlowTexture(inner = "#ffd15c", mid = "#ff8a00", outer = "#ff2d00", size = 512) {
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, inner);
  g.addColorStop(0.35, mid + "bb");
  g.addColorStop(0.7, outer + "55");
  g.addColorStop(1, "#00000000");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.anisotropy = 4;
  return tex;
}
