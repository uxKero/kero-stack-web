'use client';

import { useEffect, useRef } from 'react';

const WORD = 'KERO';

let cache: { key: string; out: { data: Uint8ClampedArray; w: number; s: number }[] } | null = null;

function glyphs(font: string, size: number) {
  const key = `${font}-${size}`;
  if (cache?.key === key) return cache.out;
  const s = 4;
  const out = WORD.split('').map((ch) => {
    const c = document.createElement('canvas');
    c.width = 34 * s;
    c.height = size * s;
    const x = c.getContext('2d', { willReadFrequently: true })!;
    x.fillStyle = '#000';
    x.textAlign = 'center';
    x.textBaseline = 'alphabetic';
    x.font = `700 ${size * s * 1.02}px ${font}`;
    x.fillText(ch, c.width / 2, c.height * 0.94);
    return { data: x.getImageData(0, 0, c.width, c.height).data, w: c.width, s };
  });
  cache = { key, out };
  return out;
}

export function ScrollRail({ top, bottom }: { top: string; bottom: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const words = useRef({ top, bottom });
  words.current = { top, bottom };

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    let raf = 0;
    let dragging = false;
    const DIM = '#a7a39a';
    const HOT = '#f2541b';

    const max = () => Math.max(1, document.documentElement.scrollHeight - window.innerHeight);

    const draw = () => {
      raf = 0;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const pad = 18;
      const line = pad + (window.scrollY / max()) * (h - pad * 2);
      const font = getComputedStyle(canvas).fontFamily;

      const vertical = (text: string, y: number, alignEnd: boolean) => {
        ctx.save();
        ctx.font = `500 13px ${font}`;
        const len = ctx.measureText(text).width;
        const start = alignEnd ? y - len : y;
        for (const [color, clip] of [
          [DIM, null],
          [HOT, line],
        ] as const) {
          ctx.save();
          if (clip !== null) {
            ctx.beginPath();
            ctx.rect(0, 0, w, clip);
            ctx.clip();
          }
          ctx.translate(w / 2, start);
          ctx.rotate(Math.PI / 2);
          ctx.fillStyle = color;
          ctx.textBaseline = 'middle';
          ctx.fillText(text, 0, 0);
          ctx.restore();
        }
        ctx.restore();
      };

      vertical(words.current.top, pad, false);
      vertical(words.current.bottom, h - pad, true);

      const cell = 2;
      const dot = 1.5;
      const letterH = 26;
      const gap = 8;
      const totalH = WORD.length * letterH + (WORD.length - 1) * gap;
      const y0 = Math.round((h - totalH) / 2);
      const g = glyphs(font, letterH);
      const cols = Math.floor(w / cell);
      for (let li = 0; li < WORD.length; li++) {
        const m = g[li];
        const top = y0 + li * (letterH + gap);
        for (let ry = 0; ry < letterH / cell; ry++) {
          const y = top + ry * cell;
          for (let cx = 0; cx < cols; cx++) {
            const a = m.data[(Math.floor(ry * cell * m.s) * m.w + Math.floor(cx * cell * m.s)) * 4 + 3] / 255;
            if (a < 0.5) continue;
            ctx.fillStyle = y < line ? HOT : DIM;
            ctx.fillRect(cx * cell, y, dot, dot);
          }
        }
      }

      ctx.fillStyle = HOT;
      ctx.fillRect(w / 2 - 6, line - 1, 12, 2);
    };

    const queue = () => {
      if (!raf) raf = requestAnimationFrame(draw);
    };

    const seek = (clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (clientY - rect.top - 18) / (rect.height - 36)));
      window.scrollTo({ top: p * max() });
    };

    const down = (e: PointerEvent) => {
      dragging = true;
      canvas.setPointerCapture(e.pointerId);
      seek(e.clientY);
    };
    const move = (e: PointerEvent) => dragging && seek(e.clientY);
    const up = () => (dragging = false);

    draw();
    document.fonts?.ready.then(queue);
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    const ro = new ResizeObserver(queue);
    ro.observe(document.body);
    canvas.addEventListener('pointerdown', down);
    canvas.addEventListener('pointermove', move);
    canvas.addEventListener('pointerup', up);
    canvas.addEventListener('pointercancel', up);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', queue);
      window.removeEventListener('resize', queue);
      ro.disconnect();
      canvas.removeEventListener('pointerdown', down);
      canvas.removeEventListener('pointermove', move);
      canvas.removeEventListener('pointerup', up);
      canvas.removeEventListener('pointercancel', up);
    };
  }, []);

  useEffect(() => {
    window.dispatchEvent(new Event('scroll'));
  }, [top, bottom]);

  return <canvas ref={ref} className="rail-kero" aria-hidden="true" />;
}
