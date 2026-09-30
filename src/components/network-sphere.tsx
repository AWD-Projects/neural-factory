"use client";

import { useEffect, useRef } from "react";

/** PRNG determinista: la esfera se ve igual en cada carga. */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Node3 = { x: number; y: number; z: number; r: number };

/**
 * Motivo de marca: la esfera de nodos del logo de Neural Factory, dibujada
 * en canvas 2D. Gira despacio, lleva unos pocos pulsos de "señal" sobre las
 * aristas y se detiene fuera de pantalla o con prefers-reduced-motion.
 */
export function NetworkSphere({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Se inicia en tiempo ocioso para no competir con la hidratación (LCP/TBT en móvil).
    let cleanup: (() => void) | undefined;
    const boot = () => {
      cleanup = init();
    };
    const w = window as unknown as {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const idle = typeof w.requestIdleCallback === "function";
    const id = idle ? w.requestIdleCallback!(boot, { timeout: 2500 }) : window.setTimeout(boot, 1200);
    return () => {
      if (idle) w.cancelIdleCallback?.(id);
      else window.clearTimeout(id);
      cleanup?.();
    };

    function init(): (() => void) | undefined {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return undefined;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rnd = mulberry32(11);

    // Nodos: espiral de Fibonacci con ruido, algunos nodos grandes como en el logo
    const N = 72;
    const nodes: Node3[] = [];
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const rad = Math.sqrt(1 - y * y);
      const th = i * 2.399963 + rnd() * 0.4;
      const j = 0.9 + rnd() * 0.1;
      nodes.push({
        x: Math.cos(th) * rad * j,
        y: y * j,
        z: Math.sin(th) * rad * j,
        r: rnd() < 0.15 ? 4.4 + rnd() * 2.6 : 1.3 + rnd() * 1.9,
      });
    }

    // Aristas: vecinos más cercanos + algunas cuerdas largas
    const edges: [number, number][] = [];
    const seen = new Set<string>();
    const link = (a: number, b: number) => {
      if (a === b) return;
      const k = a < b ? `${a}-${b}` : `${b}-${a}`;
      if (seen.has(k)) return;
      seen.add(k);
      edges.push([a, b]);
    };
    const d2 = (a: Node3, b: Node3) => (a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2;
    nodes.forEach((n, i) => {
      const near = nodes
        .map((m, j) => ({ j, d: d2(n, m) }))
        .filter((o) => o.j !== i)
        .sort((p, q) => p.d - q.d)
        .slice(0, n.r > 4 ? 4 : 2);
      near.forEach((o) => link(i, o.j));
    });
    for (let k = 0; k < 26; k++) link(Math.floor(rnd() * N), Math.floor(rnd() * N));

    // Pulsos de señal sobre aristas
    const pulses = Array.from({ length: 9 }, () => ({
      e: Math.floor(rnd() * edges.length),
      p: rnd(),
      v: 0.00035 + rnd() * 0.0004,
    }));

    let w = 0;
    let h = 0;
    let dpr = 1;
    const tilt = 0.42;
    const cT = Math.cos(tilt);
    const sT = Math.sin(tilt);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
    };

    const project = (n: Node3, ang: number, R: number, cx: number, cy: number) => {
      const c = Math.cos(ang);
      const s = Math.sin(ang);
      const x1 = n.x * c - n.z * s;
      const z1 = n.x * s + n.z * c;
      const y2 = n.y * cT - z1 * sT;
      const z2 = n.y * sT + z1 * cT;
      const k = 1 / (1 - z2 * 0.22);
      return { x: cx + x1 * R * k, y: cy + y2 * R * k, z: z2, k };
    };

    let last = performance.now();
    let ang = 0.6;

    const draw = (dt: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const R = Math.min(w, h) * 0.44;
      const cx = w / 2;
      const cy = h / 2;
      const P = nodes.map((n) => project(n, ang, R, cx, cy));

      ctx.lineCap = "round";
      for (const [a, b] of edges) {
        const pa = P[a];
        const pb = P[b];
        const depth = (pa.z + pb.z) / 2;
        ctx.strokeStyle = `rgba(255,195,0,${0.1 + 0.42 * ((depth + 1) / 2)})`;
        ctx.lineWidth = 0.7 + 0.7 * ((depth + 1) / 2);
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.stroke();
      }

      for (let i = 0; i < nodes.length; i++) {
        const p = P[i];
        const a = 0.35 + 0.65 * ((p.z + 1) / 2);
        ctx.fillStyle = `rgba(255,195,0,${a})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, nodes[i].r * p.k * (R / 300), 0, Math.PI * 2);
        ctx.fill();
      }

      // Pulsos: puntos claros que viajan por las aristas
      for (const pu of pulses) {
        pu.p += pu.v * dt;
        if (pu.p > 1) {
          pu.p = 0;
          pu.e = Math.floor(rnd() * edges.length);
        }
        const [a, b] = edges[pu.e];
        const x = P[a].x + (P[b].x - P[a].x) * pu.p;
        const y = P[a].y + (P[b].y - P[a].y) * pu.p;
        const z = P[a].z + (P[b].z - P[a].z) * pu.p;
        ctx.fillStyle = `rgba(245,245,245,${0.35 + 0.6 * ((z + 1) / 2)})`;
        ctx.beginPath();
        ctx.arc(x, y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    let raf = 0;
    let visible = true;
    const loop = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      ang += dt * 0.00007;
      draw(dt);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (reduce || raf || !visible || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    resize();
    draw(0);
    start();

    const ro = new ResizeObserver(() => {
      resize();
      draw(0);
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);
    const onVis = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
    }
  }, []);

  return <canvas ref={ref} aria-hidden className={className} />;
}
