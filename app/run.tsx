'use client';

import { useEffect, useRef, useState } from 'react';
import { Profile } from 'iconsax-reactjs';
import { COPY, FLOWS, SKILL_NAMES, type Lang, type Mode, type StepId } from './content';

const PALETTE: Record<StepId, [string, string, string]> = {
  orchestrate: ['#7fbf2e', '#33760f', '#0f2a08'],
  research: ['#ff7a1a', '#e8230e', '#5b0a12'],
  survey: ['#ffb21a', '#e85d0e', '#5b200a'],
  scope: ['#3ddc84', '#0e8f5a', '#06301f'],
  direct: ['#b06cff', '#5b2bd8', '#1c0b4a'],
  extract: ['#38b6ff', '#1546d8', '#0a1450'],
  systematize: ['#ff3b5c', '#c2102e', '#3d0612'],
  build: ['#2ee6c4', '#0f8fa0', '#062f3a'],
  measure: ['#ffc23f', '#e8771a', '#5a2a06'],
  judge: ['#ff4fd8', '#9b1fd8', '#2a0a4a'],
  record: ['#7aa2ff', '#2b4bdb', '#0b1240'],
};

function Refs({ one }: { one?: boolean }) {
  return (
    <span className={`refs ${one ? 'refs-one' : ''}`} aria-hidden="true">
      <i />
      {!one && <i />}
      {!one && <i />}
    </span>
  );
}

function datum(id: StepId, mode: Mode, lang: Lang): string[] {
  const t = COPY[lang].run;
  switch (id) {
    case 'orchestrate':
      return lang === 'es'
        ? {
            zero: ['3 investigadores en paralelo', 'enlistar después, con la tesis'],
            redesign: ['relevar y extraer en paralelo', '1 revisor al final'],
            reference: ['construir por secciones, 3 en paralelo', 'cada uno en su worktree'],
          }[mode]
        : {
            zero: ['3 researchers in parallel', 'scope after, from the thesis'],
            redesign: ['survey and extract in parallel', '1 reviewer at the end'],
            reference: ['build by section, 3 in parallel', 'each in its own worktree'],
          }[mode];
    case 'research':
      return [t.research.thesis];
    case 'survey':
      return t.survey.found.map((f) => f.text);
    case 'scope':
      return t.scope.rows.map(([c, n]) => `${c}  ${n}`);
    case 'direct':
      return [t.direct.direction];
    case 'extract':
      return ['paper #efe7da · ink #1d1a16', 'accent #b5562b · Georgia 32'];
    case 'systematize':
      return [t.system.file];
    case 'build':
      return t.build.notes.map((n) => `${n.skill} · ${n.text}`);
    case 'measure':
      return ['contrast 1 → fixed', 'focus 14 / 14 · exit 0'];
    case 'judge':
      return [];
    default:
      return [`+ ${t.record.rule}`];
  }
}

type Ctx = CanvasRenderingContext2D;

function rounded(c: Ctx, x: number, y: number, w: number, h: number, r: number) {
  c.beginPath();
  c.roundRect(x, y, w, h, r);
}

function wrap(c: Ctx, text: string, max: number) {
  const words = text.split(' ');
  const lines: string[] = [];
  let line = '';
  for (const w of words) {
    const next = line ? `${line} ${w}` : w;
    if (c.measureText(next).width > max && line) {
      lines.push(line);
      line = w;
    } else line = next;
  }
  if (line) lines.push(line);
  return lines;
}

type CardData = { id: StepId; num: string; total: string; name: string; out: string; chip: string; lines: string[]; vote?: { prompt: string; one: string; two: string; flip: boolean; picked: null | 1 | 2 } };

function paintCard(card: HTMLCanvasElement, d: CardData, w: number, h: number, dpr: number, font: string) {
  card.width = Math.round(w * dpr);
  card.height = Math.round(h * dpr);
  const c = card.getContext('2d');
  if (!c) return;
  c.setTransform(dpr, 0, 0, dpr, 0, 0);
  c.clearRect(0, 0, w, h);
  c.save();
  rounded(c, 0, 0, w, h, 20);
  c.clip();
  const [c1, c2, c3] = PALETTE[d.id];
  const bg = c.createLinearGradient(0, 0, w * 0.5, h);
  bg.addColorStop(0, c1);
  bg.addColorStop(0.55, c2);
  bg.addColorStop(1, c3);
  c.fillStyle = bg;
  c.fillRect(0, 0, w, h);

  const dir = Number(d.num) % 2 ? 1 : -1;
  for (let i = 0; i < 30; i++) {
    const y = h * (0.12 + ((i * 97.13) % 1) * 0.76);
    const len = w * (0.3 + ((i * 37.7) % 1) * 0.7);
    const x = dir > 0 ? w * 0.3 : w * 0.7 - len;
    const g = c.createLinearGradient(x, 0, x + len, 0);
    g.addColorStop(dir > 0 ? 0 : 1, 'rgba(255,255,255,0)');
    g.addColorStop(dir > 0 ? 1 : 0, `rgba(255,255,255,${0.05 + ((i * 13.1) % 1) * 0.12})`);
    c.fillStyle = g;
    c.fillRect(x, y, len, 1 + ((i * 7.3) % 1) * 4);
  }

  const glyph = document.createElement('canvas');
  glyph.width = card.width;
  glyph.height = card.height;
  const gc = glyph.getContext('2d');
  if (gc) {
    gc.setTransform(dpr, 0, 0, dpr, 0, 0);
    gc.fillStyle = '#07060a';
    gc.textAlign = 'center';
    gc.textBaseline = 'middle';
    gc.font = `700 ${h * 0.6}px ${font}`;
    gc.fillText(d.num, w * 0.52, h * 0.52);
    for (let k = 30; k > 0; k--) {
      c.globalAlpha = 0.045 * (1 - k / 30) + 0.01;
      c.drawImage(glyph, dir * k * w * 0.024, 0, w, h);
    }
    c.globalAlpha = 0.94;
    c.drawImage(glyph, 0, 0, w, h);
    c.globalAlpha = 1;
  }

  const shade = c.createLinearGradient(0, 0, 0, h);
  shade.addColorStop(0, 'rgba(0,0,0,0.42)');
  shade.addColorStop(0.3, 'rgba(0,0,0,0)');
  shade.addColorStop(0.62, 'rgba(0,0,0,0)');
  shade.addColorStop(1, 'rgba(0,0,0,0.6)');
  c.fillStyle = shade;
  c.fillRect(0, 0, w, h);

  const pad = Math.round(w * 0.065);
  c.fillStyle = '#fff';
  c.textBaseline = 'top';
  c.textAlign = 'left';
  const fs = Math.max(15, Math.round(w * 0.042));
  c.font = `500 ${Math.max(14, Math.round(w * 0.036))}px ${font}`;
  const cw = c.measureText(d.chip).width + 22;
  const ch = fs * 1.7;
  c.font = `600 ${fs}px ${font}`;
  const phone = typeof window !== 'undefined' && window.innerWidth <= 720;
  const crowded = phone && pad + c.measureText(d.name).width + 12 > w - pad - cw;
  const ty0 = crowded ? pad + ch : pad;
  c.fillText(d.name, pad, ty0);
  c.fillStyle = 'rgba(255,255,255,0.86)';
  c.font = `400 ${fs}px ${font}`;
  wrap(c, d.out, crowded ? w - pad * 2 : w * 0.56).forEach((l, i) => c.fillText(l, pad, ty0 + fs * 1.3 * (i + 1)));

  c.font = `500 ${Math.max(14, Math.round(w * 0.036))}px ${font}`;
  c.fillStyle = 'rgba(255,255,255,0.22)';
  rounded(c, w - pad - cw, pad - ch * 0.12, cw, ch, ch / 2);
  c.fill();
  c.fillStyle = '#fff';
  c.textBaseline = 'middle';
  c.fillText(d.chip, w - pad - cw + 11, pad - ch * 0.12 + ch / 2);

  c.textBaseline = 'alphabetic';
  if (d.vote) {
    const v = d.vote;
    const tw = (w - pad * 2 - pad * 0.6) / 2;
    const th = tw * 0.82;
    const ty = h - pad - th - w * 0.06;
    c.font = `500 ${Math.round(w * 0.042)}px ${font}`;
    c.fillStyle = '#fff';
    wrap(c, v.prompt, w - pad * 2).forEach((l, i, arr) => c.fillText(l, pad, ty - w * 0.03 - (arr.length - 1 - i) * w * 0.055));
    [0, 1].forEach((k) => {
      const x = pad + k * (tw + pad * 0.6);
      const good = k === 0 ? !v.flip : v.flip;
      c.save();
      rounded(c, x, ty, tw, th, 10);
      c.clip();
      if (good) {
        c.fillStyle = '#efe7da';
        c.fillRect(x, ty, tw, th);
        c.fillStyle = '#1d1a16';
        c.font = `400 ${Math.round(tw * 0.11)}px Georgia, serif`;
        wrap(c, 'High mountain leaves.', tw * 0.84).forEach((l, i) => c.fillText(l, x + tw * 0.08, ty + th * 0.36 + i * tw * 0.13));
        c.fillRect(x + tw * 0.08, ty + th * 0.68, tw * 0.4, th * 0.13);
      } else {
        const g = c.createLinearGradient(x, ty, x + tw, ty + th);
        g.addColorStop(0, '#6d5bf7');
        g.addColorStop(1, '#c45bf0');
        c.fillStyle = g;
        c.fillRect(x, ty, tw, th);
        c.fillStyle = '#fff';
        c.textAlign = 'center';
        c.font = `600 ${Math.round(tw * 0.1)}px ${font}`;
        c.fillText('Elevate your tea', x + tw / 2, ty + th * 0.48);
        rounded(c, x + tw * 0.3, ty + th * 0.62, tw * 0.4, th * 0.14, th);
        c.fill();
        c.textAlign = 'left';
      }
      c.restore();
      if (v.picked === k + 1) {
        c.strokeStyle = '#fff';
        c.lineWidth = 3;
        rounded(c, x - 3, ty - 3, tw + 6, th + 6, 12);
        c.stroke();
      }
      c.fillStyle = '#fff';
      c.font = `500 ${Math.round(w * 0.038)}px ${font}`;
      c.fillText(k === 0 ? v.one : v.two, x, ty + th + w * 0.05);
    });
  } else {
    c.font = `400 ${Math.max(14, Math.round(w * 0.034))}px ${font}`;
    const counter = c.measureText(`${d.num} / ${d.total}`).width;
    c.font = `500 ${fs}px ${font}`;
    c.fillStyle = '#fff';
    let lines = d.lines.flatMap((l) => wrap(c, l, w * 0.74));
    const last = lines[lines.length - 1];
    if (phone && last && pad + c.measureText(last).width + 16 > w - pad - counter) {
      lines = d.lines.flatMap((l) => wrap(c, l, w - pad * 2 - counter - 16));
    }
    lines.forEach((l, i) => c.fillText(l, pad, h - pad - (lines.length - 1 - i) * fs * 1.32));
  }
  c.fillStyle = 'rgba(255,255,255,0.8)';
  c.font = `400 ${Math.max(14, Math.round(w * 0.034))}px ${font}`;
  c.textAlign = 'right';
  c.fillText(`${d.num} / ${d.total}`, w - pad, h - pad);
  c.restore();
}

function Reel({ cards, kRef, onVote, judgeIndex, dealKey }: { cards: CardData[]; kRef: React.MutableRefObject<number>; onVote: (n: 1 | 2) => void; judgeIndex: number; dealKey: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const hits = useRef<{ x: number; y: number; w: number; h: number; n: 1 | 2 }[]>([]);
  const data = useRef(cards);
  data.current = cards;
  const repaint = useRef<() => void>(() => {});
  const deal = useRef<{ start: number; snap: HTMLCanvasElement | null; first: boolean }>({ start: 0, snap: null, first: true });

  useEffect(() => {
    const d = deal.current;
    if (d.first) {
      d.first = false;
      return;
    }
    const canvas = ref.current;
    if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const snap = document.createElement('canvas');
    snap.width = canvas.width;
    snap.height = canvas.height;
    snap.getContext('2d')?.drawImage(canvas, 0, 0);
    d.snap = snap;
    d.start = performance.now();
  }, [dealKey]);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    let raf = 0;
    let shown = -1;
    let W = 0;
    let H = 0;
    let cw = 0;
    let ch = 0;
    let sources: HTMLCanvasElement[] = [];
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const S = Math.min(4, dpr * 2.4);
    const layer = document.createElement('canvas');
    const lctx = layer.getContext('2d');
    if (!lctx) return;

    const build = () => {
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      layer.width = canvas.width;
      layer.height = canvas.height;
      lctx.imageSmoothingEnabled = true;
      lctx.imageSmoothingQuality = 'high';
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ch = Math.min(H * 0.6, 500);
      cw = Math.min(ch * 0.8, W * 0.8);
      ch = cw / 0.8;
      const font = getComputedStyle(canvas).fontFamily;
      sources = data.current.map((d) => {
        const el = document.createElement('canvas');
        paintCard(el, d, cw, ch, S, font);
        return el;
      });
      shown = -1;
    };

    repaint.current = () => {
      const font = getComputedStyle(canvas).fontFamily;
      data.current.forEach((d, i) => {
        const el = sources[i];
        if (!el) return;
        const next = document.createElement('canvas');
        paintCard(next, d, cw, ch, S, font);
        el.width = next.width;
        el.height = next.height;
        el.getContext('2d')?.drawImage(next, 0, 0);
        mirrors.delete(el);
      });
      shown = -1;
    };

    const mirrors = new WeakMap<HTMLCanvasElement, HTMLCanvasElement>();
    const mirrorOf = (src: HTMLCanvasElement) => {
      let m = mirrors.get(src);
      if (!m || m.width !== src.width) {
        m = document.createElement('canvas');
        m.width = src.width;
        m.height = src.height;
        const mc = m.getContext('2d');
        if (mc) {
          mc.translate(m.width, 0);
          mc.scale(-1, 1);
          mc.drawImage(src, 0, 0);
        }
        mirrors.set(src, m);
      }
      return m;
    };

    const draw = () => {
      raf = 0;
      const k = kRef.current;
      const now = performance.now();
      const dl = deal.current;
      const since = now - dl.start;
      const dealing = since < 1500;
      if (!dealing && Math.abs(k - shown) < 0.0005) return;
      shown = dealing ? -1 : k;
      ctx.clearRect(0, 0, W, H);
      const easeOut = (t: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3);
      if (dealing && dl.snap && since < 520) {
        const p = easeOut(since / 520);
        ctx.save();
        ctx.globalAlpha = 1 - p;
        ctx.translate(W / 2, H / 2 + p * 120);
        ctx.rotate(-p * 0.06);
        ctx.scale(1 - 0.18 * p, 1 - 0.18 * p);
        ctx.drawImage(dl.snap, -W / 2, -H / 2, W, H);
        ctx.restore();
      }
      const c = W / 2;
      const gap = Math.max(40, cw * 0.24);
      const space = cw + gap;
      const F = cw / 2 + gap + cw * 0.1;
      const reach = Math.max(1, c - F);
      const smooth = (t: number) => {
        const u = Math.min(1, Math.max(0, t));
        return u * u * u * (u * (u * 6 - 15) + 10);
      };
      const warp = (x: number) => {
        const off = x - c;
        const e = Math.abs(off) - F;
        if (e <= 0) return x;
        const t = e / reach;
        return c + Math.sign(off) * (F + e * (1 + 0.9 * t + 2.2 * t * t));
      };
      const lift = (x: number) => {
        const e = Math.abs(x - c) - F;
        if (e <= 0) return 1;
        return 1 + ((H * 0.97) / ch - 1) * smooth(e / (reach * 0.62));
      };
      const order = sources.map((_, i) => i).sort((a, b) => Math.abs(b - k) - Math.abs(a - k));
      hits.current = [];
      for (const i of order) {
        const src = sources[i];
        let cx = c + (i - k) * space;
        let liftY = 0;
        if (dealing) {
          const rel = Math.abs(i - Math.round(k));
          const p = (since - 220 - rel * 110) / 620;
          if (p <= 0) continue;
          if (p < 1) {
            const e = easeOut(p);
            cx += (1 - e) * W * 0.85;
            liftY = -Math.sin(Math.min(1, p) * Math.PI) * 46;
          }
        }
        if (cx + cw / 2 < -W || cx - cw / 2 > W * 2) continue;
        const left = cx - cw / 2;
        const dk = i - k;
        const turn = dk < 0 ? smooth(Math.min(1, -dk)) : 0;
        const theta = Math.PI * turn;
        const cos = Math.cos(theta);
        const sin = Math.sin(theta);
        const P = cw * 3.2;
        const fu0 = Math.min(cw, Math.max(0, c - F - left));
        const fu1 = Math.min(cw, Math.max(0, c + F - left));
        const flat = fu0 <= 0 && fu1 >= cw && turn < 0.001;
        ctx.save();
        ctx.translate(0, liftY);
        if (flat) {
          ctx.drawImage(src, 0, 0, cw * S, ch * S, left, (H - ch) / 2, cw, ch);
        } else {
          lctx.setTransform(1, 0, 0, 1, 0, 0);
          lctx.globalCompositeOperation = 'source-over';
          lctx.clearRect(0, 0, layer.width, layer.height);
          lctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          const n = Math.ceil(cw);
          const xs: number[] = [];
          const hs: number[] = [];
          for (let q = 0; q <= n; q++) {
            const x0 = (q / n - 0.5) * cw;
            const sc = P / (P + x0 * sin);
            const X = warp(cx + x0 * cos * sc);
            xs.push(X);
            hs.push(ch * sc * lift(X));
          }
          const back = cos < 0;
          const img = back ? mirrorOf(src) : src;
          const sw = (cw / n) * S;
          for (let q = 0; q < n; q++) {
            const xa = Math.min(xs[q], xs[q + 1]);
            const w = Math.abs(xs[q + 1] - xs[q]);
            if (xa + w < -2 || xa > W + 2 || w < 0.01) continue;
            const hh = Math.max(hs[q], hs[q + 1]) + 2;
            const sx = back ? (n - q - 1) * sw : q * sw;
            const parts = Math.max(1, Math.ceil(w / 1.5));
            const pw = w / parts;
            const psw = sw / parts;
            for (let j = 0; j < parts; j++) {
              lctx.drawImage(img, sx + j * psw, 0, psw, ch * S, xa + j * pw - 0.3, (H - hh) / 2, pw + 0.6, hh);
            }
          }
          lctx.globalCompositeOperation = 'destination-in';
          lctx.beginPath();
          xs.forEach((x, q) => (q ? lctx.lineTo(x, (H - hs[q]) / 2) : lctx.moveTo(x, (H - hs[q]) / 2)));
          for (let q = xs.length - 1; q >= 0; q--) lctx.lineTo(xs[q], (H + hs[q]) / 2);
          lctx.closePath();
          lctx.fill();
          lctx.globalCompositeOperation = 'source-over';
          ctx.drawImage(layer, 0, 0, W, H);
        }
        ctx.restore();
        if (i === judgeIndex && Math.abs(i - k) < 0.3) {
          const pad = cw * 0.065;
          const tw = (cw - pad * 2 - pad * 0.6) / 2;
          const th = tw * 0.82;
          const left = cx - cw / 2;
          const top = (H - ch) / 2 + ch - pad - th - cw * 0.06;
          hits.current = [
            { x: left + pad, y: top, w: tw, h: th + cw * 0.06, n: 1 },
            { x: left + pad + tw + pad * 0.6, y: top, w: tw, h: th + cw * 0.06, n: 2 },
          ];
        }
      }
    };

    const loop = () => {
      draw();
      raf = requestAnimationFrame(loop);
    };

    const click = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const hit = hits.current.find((h) => x >= h.x && x <= h.x + h.w && y >= h.y && y <= h.y + h.h);
      if (hit) onVote(hit.n);
    };
    const hover = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      canvas.style.cursor = hits.current.some((h) => x >= h.x && x <= h.x + h.w && y >= h.y && y <= h.y + h.h) ? 'pointer' : '';
    };

    build();
    document.fonts?.ready.then(build);
    raf = requestAnimationFrame(loop);
    const ro = new ResizeObserver(build);
    ro.observe(canvas);
    canvas.addEventListener('click', click);
    canvas.addEventListener('mousemove', hover);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener('click', click);
      canvas.removeEventListener('mousemove', hover);
    };
  }, [cards.length, kRef, onVote, judgeIndex]);

  useEffect(() => {
    repaint.current();
  }, [cards]);

  return <canvas ref={ref} className="reel-canvas" aria-hidden="true" />;
}

export function Run({ lang, title }: { lang: Lang; title: string }) {
  const t = COPY[lang].run;
  const [mode, setMode] = useState<Mode>('zero');
  const flow = FLOWS[mode];
  const [active, setActive] = useState(0);
  const [flip, setFlip] = useState(false);
  const [vote, setVote] = useState<null | 1 | 2>(null);
  const box = useRef<HTMLDivElement>(null);
  const indexRef = useRef<HTMLOListElement>(null);
  const [pill, setPill] = useState<{ x: number; w: number; person: boolean } | null>(null);
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    let id: ReturnType<typeof setTimeout>;
    const on = () => {
      setScrolling(true);
      clearTimeout(id);
      id = setTimeout(() => setScrolling(false), 220);
    };
    window.addEventListener('scroll', on, { passive: true });
    return () => {
      window.removeEventListener('scroll', on);
      clearTimeout(id);
    };
  }, []);
  const kRef = useRef(0);

  useEffect(() => {
    setFlip(Math.random() < 0.5);
  }, [mode]);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const run = r.height - window.innerHeight;
      const p = run > 0 ? Math.min(1, Math.max(0, -r.top / run)) : 0;
      const k = p * (flow.length - 1);
      kRef.current = k;
      setActive(Math.round(k));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [flow.length]);

  const jump = (i: number) => {
    const el = box.current;
    if (!el) return;
    const top = window.scrollY + el.getBoundingClientRect().top;
    const run = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (run * i) / (flow.length - 1), behavior: 'smooth' });
  };

  const [tab, setTab] = useState<Mode>('zero');
  const modesRef = useRef<HTMLDivElement>(null);
  const [tabPill, setTabPill] = useState({ x: 0, w: 0 });
  useEffect(() => {
    const el = modesRef.current;
    if (!el) return;
    const measure = () => {
      const b = el.querySelectorAll('button')[['zero', 'redesign', 'reference'].indexOf(tab)] as HTMLElement | undefined;
      if (b) setTabPill({ x: b.offsetLeft - 3, w: b.offsetWidth });
    };
    measure();
    document.fonts?.ready.then(measure);
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [tab, lang]);
  const pick = (m: Mode) => {
    if (m === tab) return;
    setTab(m);
    setMode(m);
    setVote(null);
    const el = box.current;
    if (el && el.getBoundingClientRect().top < 0) window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top });
  };

  const total = String(flow.length).padStart(2, '0');
  const cards: CardData[] = flow.map((sid, i) => {
    const s = t.steps[sid];
    return {
      id: sid,
      num: String(i + 1).padStart(2, '0'),
      total,
      name: s.name,
      out: s.out,
      chip: SKILL_NAMES[s.skills[0]],
      lines: datum(sid, mode, lang),
      vote: sid === 'judge' ? { prompt: vote ? t.judge.reveal((vote === 1) !== flip) : t.judge.prompt, one: t.judge.one, two: t.judge.two, flip, picked: vote } : undefined,
    };
  });
  const cardsKey = JSON.stringify(cards);
  const stable = useRef<{ key: string; cards: CardData[] }>({ key: '', cards });
  if (stable.current.key !== cardsKey) stable.current = { key: cardsKey, cards };
  const voteRef = useRef(vote);
  voteRef.current = vote;
  const onVote = useRef((n: 1 | 2) => {
    if (!voteRef.current) setVote(n);
  }).current;

  const current = flow[Math.min(active, flow.length - 1)];

  useEffect(() => {
    const list = indexRef.current;
    const btn = list?.querySelectorAll('button')[active] as HTMLElement | undefined;
    if (!list || !btn) return;
    const li = btn.parentElement as HTMLElement;
    const measure = () => setPill({ x: li.offsetLeft, w: li.offsetWidth, person: t.steps[flow[active]].who === 'person' });
    measure();
    if (list.scrollWidth > list.clientWidth + 1) {
      list.scrollTo({ left: li.offsetLeft - (list.clientWidth - li.offsetWidth) / 2, behavior: 'smooth' });
    }
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [active, flow, t, lang]);
  const step = t.steps[current];

  return (
    <div className="story" ref={box} style={{ '--n': flow.length } as React.CSSProperties}>
      <div className="story-pin">
        <div className="story-top">
          <h2 id="method-title">{title}</h2>
          <div className="story-controls">
            <div className="modes modes-slide" role="tablist" aria-label={t.label} ref={modesRef}>
              <span className="modes-pill" aria-hidden="true" style={{ transform: `translateX(${tabPill.x}px)`, width: tabPill.w }} />
              {(['zero', 'redesign', 'reference'] as const).map((m) => (
                <button key={m} type="button" role="tab" aria-selected={tab === m} className={tab === m ? 'is-on' : ''} onClick={() => pick(m)}>
                  {t.modes[m]}
                </button>
              ))}
            </div>
            <p className="story-task" key={mode}>
              <Profile size={18} variant="Bold" />
              {t.tasks[mode]}
              {mode !== 'zero' && <Refs one={mode === 'reference'} />}
            </p>
            <p className="story-example">{t.example}</p>
          </div>
        </div>

        <div className="reel-wrap">
        <Reel cards={stable.current.cards} kRef={kRef} onVote={onVote} judgeIndex={flow.indexOf('judge')} dealKey={mode} />
        </div>

        <div className="story-foot">
          <p className={`story-now story-${step.who}`} key={`${mode}-${current}`}>
            <span className="story-who">{step.who === 'person' ? t.who.person : t.who.agent}</span>
            {step.skills.map((k) => (
              <span key={k} className="chip">
                {SKILL_NAMES[k]}
              </span>
            ))}
            {current === 'judge' && !vote && (
              <span className="story-vote">
                <button type="button" onClick={() => onVote(1)}>
                  {t.judge.one}
                </button>
                <button type="button" onClick={() => onVote(2)}>
                  {t.judge.two}
                </button>
              </span>
            )}
          </p>
          <ol className={`story-index ${scrolling ? 'is-scrolling' : ''}`} ref={indexRef}>
            {pill && <span className={`story-pill ${pill.person ? 'is-person' : ''}`} style={{ transform: `translateX(${pill.x}px)`, width: pill.w }} aria-hidden="true" />}
            {flow.map((sid, i) => (
              <li key={sid}>
                <button type="button" className={`${i === active ? 'is-on' : ''} ${i < active ? 'is-past' : ''} idx-${t.steps[sid].who}`} onClick={() => jump(i)} aria-current={i === active ? 'step' : undefined}>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  {t.steps[sid].name}
                </button>
              </li>
            ))}
          </ol>
        </div>

        <ol className="sr-only">
          {flow.map((sid) => (
            <li key={sid}>
              {t.steps[sid].name}: {t.steps[sid].out}. {datum(sid, mode, lang).join('. ')}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
