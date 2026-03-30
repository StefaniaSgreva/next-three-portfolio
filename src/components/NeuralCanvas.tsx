'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// ── configurazione animazione neurale (coordinate fisse) ─────────────────────
const N = 68;
const GOLD_STEP = 7;
const CONNECT_D = 0.8;
const MOUSE_R = 0.9;
const MOUSE_F = 0.0025;
const SPRING = 0.002;
const SPRING_V = 0.0015;
const DAMP = 0.96;
const DAMP_V = 0.02;
const DRIFT_R = 0.15;
const DRIFT_SPD = 0.0008;
const PHI = 1.6180339887;

const C_LILLA = new THREE.Color('#9B8FE8');
const C_GOLD = new THREE.Color('#C9A84C');
const C_GOLD_B = new THREE.Color('#E8C97A');
const C_MIX = new THREE.Color('#BA9B5A');

const PAIRS: [number, number][] = [];
for (let i = 0; i < N; i++)
  for (let j = i + 1; j < N; j++) PAIRS.push([i, j]);

interface P {
  hx: number; hy: number;
  x: number; y: number;
  vx: number; vy: number;
  dp1: number; dp2: number; ds: number;
  sp: number; dm: number;
  ph: number; ps: number;
  gold: boolean;
}

function rnd(a: number, b: number) {
  return a + Math.random() * (b - a);
}

// Componente per rendere lo sfondo trasparente
function BackgroundSetter() {
  const { scene } = useThree();
  useEffect(() => {
    scene.background = null;
  }, [scene]);
  return null;
}

function NeuralScene() {
  const { size } = useThree();
  const worldH = 6;
  const worldW = (size.width / size.height) * worldH;

  const pts = useMemo<P[]>(
    () =>
      Array.from({ length: N }, (_, i) => {
        const hx = rnd(-worldW / 2, worldW / 2);
        const hy = rnd(-worldH / 2, worldH / 2);
        return {
          hx,
          hy,
          x: hx,
          y: hy,
          vx: rnd(-0.2, 0.2),
          vy: rnd(-0.2, 0.2),
          dp1: rnd(0, Math.PI * 2),
          dp2: rnd(0, Math.PI * 2),
          ds: rnd(DRIFT_SPD * 0.4, DRIFT_SPD) * (Math.random() < 0.5 ? 1 : -1),
          sp: SPRING + rnd(0, SPRING_V),
          dm: DAMP + rnd(0, DAMP_V),
          ph: rnd(0, Math.PI * 2),
          ps: rnd(0.004, 0.013),
          gold: i % GOLD_STEP === 0,
        };
      }),
    [worldW, worldH]
  );

  const mouse = useRef({ wx: 9999, wy: 9999, tx: 9999, ty: 9999 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      const rect = (e.target as HTMLElement).getBoundingClientRect?.() || { left: 0, top: 0, width: size.width, height: size.height };
      const x = ((e.clientX - rect.left) / size.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / size.height) * 2 + 1;
      mouse.current.tx = x * (worldW / 2);
      mouse.current.ty = y * (worldH / 2);
    };
    const leave = () => {
      mouse.current.tx = 9999;
      mouse.current.ty = 9999;
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseleave', leave);
    };
  }, [size, worldW, worldH]);

  const lillaGeo = useRef<THREE.BufferGeometry>(null!);
  const goldGeo = useRef<THREE.BufferGeometry>(null!);
  const edgeGeo = useRef<THREE.BufferGeometry>(null!);

  const lPos = useMemo(() => new Float32Array(N * 3), []);
  const lCol = useMemo(() => new Float32Array(N * 3), []);
  const gPos = useMemo(() => new Float32Array(N * 3), []);
  const gCol = useMemo(() => new Float32Array(N * 3), []);
  const ePos = useMemo(() => new Float32Array(PAIRS.length * 6), []);
  const eCol = useMemo(() => new Float32Array(PAIRS.length * 6), []);

  const counts = useRef({ l: 0, g: 0, e: 0 });

  useFrame(() => {
    const m = mouse.current;
    m.wx += (m.tx - m.wx) * 0.055;
    m.wy += (m.ty - m.wy) * 0.055;

    let li = 0, gi = 0;

    pts.forEach((p) => {
      p.ph += p.ps;
      const pulse = Math.sin(p.ph) * 0.5 + 0.5;

      p.dp1 += p.ds;
      p.dp2 += p.ds * PHI;
      const tx = p.hx + Math.cos(p.dp1) * DRIFT_R;
      const ty = p.hy + Math.sin(p.dp2) * DRIFT_R * 0.6;

      p.vx += (tx - p.x) * p.sp;
      p.vy += (ty - p.y) * p.sp;

      const dx = p.x - m.wx, dy = p.y - m.wy;
      const d2 = dx * dx + dy * dy;
      if (d2 < MOUSE_R * MOUSE_R && d2 > 1e-5) {
        const d = Math.sqrt(d2);
        const f = (1 - d / MOUSE_R) * MOUSE_F;
        p.vx += (dx / d) * f;
        p.vy += (dy / d) * f;
      }

      p.vx *= p.dm;
      p.vy *= p.dm;
      p.x += p.vx;
      p.y += p.vy;

      p.x = Math.min(Math.max(p.x, -worldW / 2), worldW / 2);
      p.y = Math.min(Math.max(p.y, -worldH / 2), worldH / 2);

      if (p.gold) {
        gPos[gi * 3] = p.x;
        gPos[gi * 3 + 1] = p.y;
        gPos[gi * 3 + 2] = 0;
        const r = C_GOLD.r + (C_GOLD_B.r - C_GOLD.r) * pulse * 0.5;
        const g = C_GOLD.g + (C_GOLD_B.g - C_GOLD.g) * pulse * 0.5;
        const b = C_GOLD.b + (C_GOLD_B.b - C_GOLD.b) * pulse * 0.5;
        gCol[gi * 3] = r;
        gCol[gi * 3 + 1] = g;
        gCol[gi * 3 + 2] = b;
        gi++;
      } else {
        lPos[li * 3] = p.x;
        lPos[li * 3 + 1] = p.y;
        lPos[li * 3 + 2] = 0;
        const a = 0.32 + pulse * 0.22;
        lCol[li * 3] = C_LILLA.r * a;
        lCol[li * 3 + 1] = C_LILLA.g * a;
        lCol[li * 3 + 2] = C_LILLA.b * a;
        li++;
      }
    });

    counts.current.l = li;
    counts.current.g = gi;

    let ei = 0;
    PAIRS.forEach(([ai, bi]) => {
      const a = pts[ai], b = pts[bi];
      const dx = a.x - b.x, dy = a.y - b.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d > CONNECT_D) return;

      const prox = 1 - d / CONNECT_D;
      const gg = a.gold && b.gold;
      const ag = a.gold || b.gold;
      const col = gg ? C_GOLD : ag ? C_MIX : C_LILLA;
      const alpha = gg ? prox * 0.88 : ag ? prox * 0.35 : prox * 0.2;

      const base = ei * 6;
      ePos[base] = a.x;
      ePos[base + 1] = a.y;
      ePos[base + 2] = 0;
      ePos[base + 3] = b.x;
      ePos[base + 4] = b.y;
      ePos[base + 5] = 0;
      eCol[base] = col.r * alpha;
      eCol[base + 1] = col.g * alpha;
      eCol[base + 2] = col.b * alpha;
      eCol[base + 3] = col.r * alpha;
      eCol[base + 4] = col.g * alpha;
      eCol[base + 5] = col.b * alpha;
      ei++;
    });
    counts.current.e = ei;

    const flush = (geo: THREE.BufferGeometry, pos: Float32Array, col: Float32Array, count: number) => {
      if (!geo) return;
      const pa = geo.attributes.position as THREE.BufferAttribute;
      const ca = geo.attributes.color as THREE.BufferAttribute;
      pa.set(pos);
      pa.needsUpdate = true;
      ca.set(col);
      ca.needsUpdate = true;
      geo.setDrawRange(0, count);
    };
    flush(lillaGeo.current, lPos, lCol, counts.current.l);
    flush(goldGeo.current, gPos, gCol, counts.current.g);
    flush(edgeGeo.current, ePos, eCol, counts.current.e * 2);
  });

  return (
    <>
      <points>
        <bufferGeometry ref={lillaGeo}>
          <bufferAttribute attach="attributes-position" args={[lPos, 3]} />
          <bufferAttribute attach="attributes-color" args={[lCol, 3]} />
        </bufferGeometry>
        <pointsMaterial vertexColors size={0.04} sizeAttenuation transparent depthWrite={false} />
      </points>
      <points>
        <bufferGeometry ref={goldGeo}>
          <bufferAttribute attach="attributes-position" args={[gPos, 3]} />
          <bufferAttribute attach="attributes-color" args={[gCol, 3]} />
        </bufferGeometry>
        <pointsMaterial vertexColors size={0.08} sizeAttenuation transparent depthWrite={false} />
      </points>
      <lineSegments>
        <bufferGeometry ref={edgeGeo}>
          <bufferAttribute attach="attributes-position" args={[ePos, 3]} />
          <bufferAttribute attach="attributes-color" args={[eCol, 3]} />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent depthWrite={false} />
      </lineSegments>
    </>
  );
}

export default function NeuralCanvas() {
  return (
    <Canvas
      className="absolute inset-0 w-full h-full"
      camera={{ position: [0, 0, 8], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      aria-hidden="true"
    >
        <BackgroundSetter />
        <NeuralScene />
    </Canvas>
  );
}