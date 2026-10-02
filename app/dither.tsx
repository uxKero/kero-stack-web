'use client';

import { useEffect, useRef } from 'react';
import type { Visual } from './content';

const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);
export const ON = '#ffffff';
export const DIM = '#8a8a8a';
export const HOT = '#ff0000';

type Ctx = CanvasRenderingContext2D;
export type SceneFn = (c: Ctx, h: number, t: number) => void;

export const ease = (x: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);
export const cycle = (t: number, len: number) => (t % len) / len;

export const rect = (c: Ctx, x: number, y: number, w: number, h: number, color = ON) => {
  c.fillStyle = color;
  c.fillRect(x, y, w, h);
};

export const line = (c: Ctx, pts: [number, number][], width: number, color = ON) => {
  c.strokeStyle = color;
  c.lineWidth = width;
  c.lineCap = 'round';
  c.lineJoin = 'round';
  c.beginPath();
  pts.forEach(([x, y], i) => (i ? c.lineTo(x, y) : c.moveTo(x, y)));
  c.stroke();
};

export const circle = (c: Ctx, x: number, y: number, r: number, color = ON, stroke = 0) => {
  c.beginPath();
  c.arc(x, y, r, 0, Math.PI * 2);
  if (stroke) {
    c.strokeStyle = color;
    c.lineWidth = stroke;
    c.stroke();
  } else {
    c.fillStyle = color;
    c.fill();
  }
};

export const text = (c: Ctx, s: string, x: number, y: number, size: number, color = ON, font = 'sans-serif', weight = 700) => {
  c.fillStyle = color;
  c.font = `${weight} ${size}px ${font}`;
  c.textBaseline = 'middle';
  c.fillText(s, x, y);
};

const SCENES: Record<Visual, SceneFn> = {
  method(c, h, t) {
    const y = h / 2;
    const xs = [12, 31, 50, 69, 88];
    const p = cycle(t, 6) * 5.6;
    line(c, [[xs[0], y], [xs[4], y]], 2, DIM);
    line(c, [[xs[0], y], [xs[0] + Math.min(4, p) * 19, y]], 2.4);
    xs.forEach((x, i) => {
      const reached = p >= i;
      const current = Math.floor(p) === i;
      circle(c, x, y, current ? 7 : 5.5, current ? HOT : reached ? ON : DIM, reached || current ? 0 : 2);
    });
  },
  research(c, h, t) {
    const widths = [70, 54, 78, 46, 66, 58];
    const x = 14 + 62 * (0.5 - 0.5 * Math.cos(t * 0.7));
    const y = h * 0.35 + h * 0.18 * Math.sin(t * 0.45);
    widths.forEach((w, i) => rect(c, 10, h * 0.14 + i * h * 0.13, w, 3.2, DIM));
    c.save();
    c.beginPath();
    c.arc(x, y, 15, 0, Math.PI * 2);
    c.clip();
    rect(c, 0, 0, 100, h, '#000');
    widths.forEach((w, i) => rect(c, 10, h * 0.14 + i * h * 0.13 - 1.4, w, 6, i === 2 ? HOT : ON));
    c.restore();
    circle(c, x, y, 15, ON, 3);
    line(c, [[x + 11, y + 11], [x + 22, y + 22]], 5);
  },
  scope(c, h, t) {
    const p = cycle(t, 5) * 5;
    for (let i = 0; i < 4; i++) {
      const y = h * 0.16 + i * h * 0.22;
      const done = p > i + 1;
      c.strokeStyle = done ? ON : DIM;
      c.lineWidth = 2;
      c.strokeRect(8, y, 11, 11);
      if (done) line(c, [[10.5, y + 5.5], [13, y + 8.5], [17, y + 2.5]], 2.2, i === 3 ? HOT : ON);
      rect(c, 26, y + 2, 14, 3.5, done ? ON : DIM);
      rect(c, 44, y + 2, 26 + ((i * 17) % 22), 3.5, DIM);
    }
  },
  system(c, h, t) {
    const pulse = Math.floor(cycle(t, 4) * 4);
    ['#ffffff', '#b0b0b0', '#6a6a6a', HOT].forEach((col, i) => {
      const s = pulse === i ? 15 : 13;
      rect(c, 8 + i * 17 - (s - 13) / 2, h * 0.12 - (s - 13) / 2, s, s, col);
    });
    text(c, 'Aa', 6, h * 0.66, 36, ON, 'Georgia, serif', 400);
    [6, 10, 15, 22].forEach((bh, i) => rect(c, 60 + i * 9, h * 0.9 - bh, 6, bh, i === 3 ? HOT : DIM));
  },
  audit(c, h, t) {
    const scan = cycle(t, 4.5) * (h + 10) - 5;
    rect(c, 8, h * 0.08, 84, 6, DIM);
    rect(c, 8, h * 0.22, 54, 10, DIM);
    rect(c, 8, h * 0.4, 84, h * 0.2, DIM);
    rect(c, 8, h * 0.68, 39, h * 0.24, DIM);
    rect(c, 53, h * 0.68, 39, h * 0.24, DIM);
    if (scan > h * 0.68) {
      c.strokeStyle = HOT;
      c.lineWidth = 2.6;
      c.strokeRect(51, h * 0.66, 43, h * 0.28);
    }
    if (scan > h * 0.22) {
      c.strokeStyle = ON;
      c.lineWidth = 2;
      c.strokeRect(6, h * 0.2, 58, 14);
    }
    rect(c, 0, scan, 100, 2.2, ON);
  },
  orchestrate(c, h, t) {
    const hub = { x: 50, y: h * 0.5 };
    const nodes = [0, 1, 2, 3, 4].map((i) => {
      const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
      return { x: 50 + Math.cos(a) * 34, y: h * 0.5 + Math.sin(a) * h * 0.34 };
    });
    const p = cycle(t, 3);
    nodes.forEach((n, i) => {
      line(c, [[hub.x, hub.y], [n.x, n.y]], 1.4, DIM);
      const k = Math.max(0, Math.min(1, p * 2.4 - i * 0.22));
      const q = p < 0.5 ? k : 1 - Math.max(0, Math.min(1, (p - 0.5) * 2.4 - i * 0.22));
      circle(c, hub.x + (n.x - hub.x) * q, hub.y + (n.y - hub.y) * q, 2.6, HOT);
      circle(c, n.x, n.y, 6, ON);
    });
    circle(c, hub.x, hub.y, 9, ON);
  },
  blind(c, h, t) {
    const pick = Math.floor(t / 2.4) % 2;
    [0, 1].forEach((i) => {
      const x = 8 + i * 45;
      const chosen = pick === i;
      c.strokeStyle = chosen ? HOT : DIM;
      c.lineWidth = chosen ? 3 : 2;
      c.strokeRect(x, h * 0.12, 39, h * 0.76);
      text(c, String(i + 1), x + 13, h * 0.5, 26, chosen ? ON : DIM);
    });
  },
  any(c, h, t) {
    const p = ease(cycle(t, 3.5) * 1.6);
    c.strokeStyle = ON;
    c.lineWidth = 2;
    c.strokeRect(6, h * 0.18, 36, h * 0.64);
    rect(c, 10, h * 0.26, 28, 5, DIM);
    rect(c, 10, h * 0.42, 18, 12, DIM);
    rect(c, 30, h * 0.42, 8, 12, HOT);
    line(c, [[47, h / 2], [55, h / 2]], 2.4);
    line(c, [[52, h / 2 - 3.5], [55.5, h / 2], [52, h / 2 + 3.5]], 2.4);
    for (let i = 0; i < 4; i++) {
      if (p * 4 < i + 0.2) continue;
      const y = h * 0.22 + i * h * 0.17;
      rect(c, 62, y, 8, 8, i === 1 ? HOT : i === 3 ? DIM : ON);
      rect(c, 74, y + 2.5, 18 - i * 2, 3, DIM);
    }
  },
  bad(c, h, t) {
    for (let i = 0; i <= 6; i++) rect(c, 8 + i * 14, 4, 0.8, h - 8, '#3a3a3a');
    const p = ease(cycle(t, 4) * 1.5);
    const off = (1 - p) * 9;
    rect(c, 8 + off, h * 0.12, 56, 8, ON);
    rect(c, 8 - off, h * 0.3, 42, 4, DIM);
    rect(c, 8 + off * 0.6, h * 0.5, 28, h * 0.36, DIM);
    rect(c, 36 + 14 - off, h * 0.5, 42, h * 0.36, p > 0.98 ? HOT : DIM);
  },
  motion(c, h, t) {
    const x0 = 10;
    const y0 = h * 0.86;
    const w = 80;
    const hh = h * 0.72;
    line(c, [[x0, h * 0.12], [x0, y0], [x0 + w, y0]], 1.6, DIM);
    const pts: [number, number][] = [];
    for (let i = 0; i <= 30; i++) {
      const u = i / 30;
      pts.push([x0 + u * w, y0 - ease(u) * hh]);
    }
    line(c, pts, 2.4);
    const u = Math.min(1, cycle(t, 2.6) * 1.3);
    circle(c, x0 + u * w, y0 - ease(u) * hh, 5, HOT);
  },
  type(c, h, t) {
    text(c, '“', 6, h * 0.24, 34, DIM, 'Georgia, serif', 400);
    const lines = [64, 52, 70, 40];
    const p = cycle(t, 6) * 4.4;
    lines.forEach((w, i) => {
      const k = Math.max(0, Math.min(1, p - i));
      if (!k) return;
      rect(c, 10, h * 0.44 + i * h * 0.13, w * k, 4, i === 3 ? HOT : ON);
      if (k < 1 && Math.sin(t * 10) > 0) rect(c, 11 + w * k, h * 0.44 + i * h * 0.13 - 2, 1.6, 8, ON);
    });
  },
  search(c, h, t) {
    c.strokeStyle = ON;
    c.lineWidth = 2;
    c.beginPath();
    c.roundRect(6, h * 0.1, 88, 14, 7);
    c.stroke();
    circle(c, 14, h * 0.1 + 7, 3, ON, 1.6);
    const q = Math.min(1, cycle(t, 4) * 1.6);
    rect(c, 22, h * 0.1 + 5.5, 50 * q, 3, ON);
    [0, 1, 2].forEach((i) => {
      if (q < 1 && i > 0) return;
      const y = h * 0.42 + i * h * 0.18;
      rect(c, 8, y, 6, 6, i === 0 ? HOT : DIM);
      rect(c, 18, y + 1, 60 - i * 10, 3.5, i === 0 ? ON : DIM);
    });
  },
};

type Props = { visual?: Visual; draw?: SceneFn; iso?: boolean; live: boolean; active?: boolean; cols?: number };

export function Dither({ visual, draw: custom, iso = false, live, active = false, cols = 40 }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const state = useRef({ live, active });
  state.current = { live, active };

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const off = document.createElement('canvas');
    const octx = off.getContext('2d', { willReadFrequently: true });
    if (!ctx || !octx) return;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)');
    const scene = custom ?? SCENES[visual ?? 'method'];
    let raf = 0;
    let last = 0;
    let visible = true;
    let size = { w: 0, h: 0, cell: 0, rows: 0 };

    const measure = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cell = w / cols;
      const rows = Math.max(1, Math.floor(h / cell));
      off.width = cols;
      off.height = rows;
      size = { w, h, cell, rows };
    };

    const draw = (t: number) => {
      const { w, h, cell, rows } = size;
      if (!w || !h) return;
      octx.setTransform(1, 0, 0, 1, 0, 0);
      octx.fillStyle = '#000';
      octx.fillRect(0, 0, cols, rows);
      const unit = cols / 100;
      octx.setTransform(unit, 0, 0, unit, 0, 0);
      if (iso) {
        const hu = rows / unit;
        octx.transform(0.49, 0.284, -0.49, 0.284, 50, Math.max(0, (hu - 57) / 2));
        scene(octx, 100, t);
      } else scene(octx, rows / unit, t);
      const data = octx.getImageData(0, 0, cols, rows).data;
      const style = getComputedStyle(canvas);
      const ink = style.getPropertyValue('--dot').trim() || '#111';
      const hot = style.getPropertyValue('--dot-hot').trim() || '#f2541b';
      const dot = cell * 0.72;
      const oy = (h - rows * cell) / 2;
      ctx.clearRect(0, 0, w, h);
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4;
          const r = data[i];
          const g = data[i + 1];
          const isHot = r > 120 && g < r * 0.5;
          const lum = Math.max(r, g, data[i + 2]) / 255;
          if (lum <= BAYER[(y % 4) * 4 + (x % 4)]) continue;
          ctx.fillStyle = isHot ? hot : ink;
          ctx.fillRect(x * cell + (cell - dot) / 2, oy + y * cell + (cell - dot) / 2, dot, dot);
        }
      }
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || !state.current.live || still.matches) return;
      if (now - last < 40) return;
      last = now;
      draw(now / 1000);
    };

    measure();
    draw(2.2);
    raf = requestAnimationFrame(loop);
    const ro = new ResizeObserver(() => {
      measure();
      draw(performance.now() / 1000);
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [visual, custom, iso, cols]);

  return <canvas ref={ref} className="dither" aria-hidden="true" />;
}
