'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { ArrowLeft2, ArrowRight, ArrowRight2, ArrowUp, CloseCircle, Copy, ExportSquare, InfoCircle, TickCircle } from 'iconsax-reactjs';
import { AGENT_RULES } from './agents';
import { ARTICLES } from './articles';
import { Example } from './examples';
import { home, principlePath } from './site';
import { Mascot } from './mascot';
import { COPY, INSTALL, type Lang, type Scene } from './content';
import { DIM, Dither, HOT, ON, circle, cycle, ease, line, rect, text, type SceneFn } from './dither';

function useInView<T extends Element>(margin = '0px') {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(true), { rootMargin: margin });
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);
  return [ref, seen] as const;
}

const TASTE: Record<Scene, SceneFn> = {
  state(c, _h, t) {
    const on = Math.floor(t / 1.4) % 4;
    for (let i = 0; i < 4; i++) {
      const y = 12 + i * 21;
      if (i === on) rect(c, 10, y, 80, 15, ON);
      else {
        c.strokeStyle = DIM;
        c.lineWidth = 2;
        c.strokeRect(10, y, 80, 15);
      }
    }
    rect(c, 2, 12 + on * 21, 3, 15, HOT);
    line(c, [[-2, 8 + on * 21], [9, 31 + on * 21]], 2, HOT);
  },
  size(c, _h, t) {
    const k = 0.5 + 0.5 * Math.sin(t * 1.2);
    text(c, 'Aa', 8, 38, 30 + k * 6, ON, 'sans-serif', 700);
    text(c, 'Aa', 62, 34, 9, DIM, 'sans-serif', 700);
    line(c, [[8, 70], [8 + 50, 70]], 2.4, HOT);
    line(c, [[8, 66], [8, 74]], 2.4, HOT);
    line(c, [[58, 66], [58, 74]], 2.4, HOT);
    rect(c, 8, 82, 80, 3, DIM);
    rect(c, 8, 90, 56, 3, DIM);
  },
  digits(c, _h, t) {
    const set = ['081', '386', '150', '742'][Math.floor(t / 1.6) % 4];
    text(c, set, 8, 44, 40, ON, 'sans-serif', 700);
    rect(c, 8, 74, 84, 3, DIM);
    rect(c, 8 + ((t * 30) % 70), 72, 14, 7, HOT);
  },
  effect(c, _h, t) {
    const k = 0.5 + 0.5 * Math.sin(t * 1.1);
    const s = 18 + k * 34;
    rect(c, 50 - s / 2, 40 - s / 2, s, s, ON);
    rect(c, 10, 84, 80, 3, DIM);
    rect(c, 10, 84, 80 * k, 3, ON);
    circle(c, 10 + 80 * k, 85.5, 5.5, HOT);
  },
  disabled(c) {
    rect(c, 10, 14, 80, 17, ON);
    rect(c, 10, 40, 80, 17, ON);
    c.strokeStyle = DIM;
    c.lineWidth = 2;
    c.strokeRect(10, 66, 80, 17);
    rect(c, 18, 72, 9, 7, HOT);
    circle(c, 22.5, 71, 3.2, HOT, 1.6);
    rect(c, 33, 73.5, 40, 3, DIM);
  },
  info(c, _h, t) {
    const k = 0.5 + 0.5 * Math.sin(t * 2);
    circle(c, 50, 44, 20 + k * 3, ON, 3);
    rect(c, 47.5, 40, 5, 16, ON);
    circle(c, 50, 33, 3, ON);
    circle(c, 50, 44, 30 + k * 6, HOT, 1.4);
    rect(c, 14, 86, 72, 3, DIM);
  },
  native(c, _h, t) {
    const open = Math.floor(t / 1.6) % 2 === 1;
    c.strokeStyle = ON;
    c.lineWidth = 2;
    c.strokeRect(10, 14, 56, 16);
    line(c, [[54, 20], [58, 24], [62, 20]], 2, HOT);
    if (open) {
      rect(c, 10, 32, 56, 30, DIM);
      rect(c, 10, 42, 56, 9, HOT);
    }
    rect(c, 84, 14, 4, 72, DIM);
    rect(c, 84, 24 + 30 * (0.5 + 0.5 * Math.sin(t * 0.8)), 4, 20, ON);
    c.strokeRect(10, 72, 12, 12);
    line(c, [[12.5, 78], [15, 81], [20, 74]], 2.2, HOT);
  },
  generic(c, _h, t) {
    const big = Math.floor(t / 1.8) % 4;
    const bx = [0, 1, 0, 1][big];
    const by = [0, 0, 1, 1][big];
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++) {
        const inBig = (i === bx || i === bx + 1) && (j === by || j === by + 1);
        if (inBig) continue;
        c.strokeStyle = DIM;
        c.lineWidth = 1.6;
        c.strokeRect(8 + i * 29, 8 + j * 29, 25, 25);
      }
    rect(c, 8 + bx * 29, 8 + by * 29, 54, 54, ON);
    rect(c, 14 + bx * 29, 50 + by * 29, 22, 5, HOT);
  },
  ornament(c, _h, t) {
    const k = ease(cycle(t, 4) * 1.4);
    c.globalAlpha = 1 - k;
    circle(c, 20, 20, 8, DIM, 2);
    circle(c, 80, 24, 6, DIM);
    line(c, [[10, 80], [30, 70], [20, 90]], 2, DIM);
    line(c, [[70, 82], [90, 72]], 3, DIM);
    rect(c, 76, 60, 10, 10, DIM);
    c.globalAlpha = 1;
    rect(c, 32, 36, 36, 26, ON);
    rect(c, 38, 66, 24, 4, HOT);
  },
  radius(c, _h, t) {
    const k = 0.5 + 0.5 * Math.sin(t * 0.9);
    c.strokeStyle = ON;
    c.lineWidth = 3;
    c.beginPath();
    c.roundRect(10, 10, 80, 80, 24);
    c.stroke();
    c.strokeStyle = HOT;
    c.beginPath();
    c.roundRect(22, 22, 56, 56, 12 * k);
    c.stroke();
    line(c, [[10, 10], [22, 22]], 1.4, DIM);
  },
  space(c, _h, t) {
    const g = 6 + 6 * (0.5 + 0.5 * Math.sin(t * 0.8));
    for (let i = 0; i < 3; i++) {
      const y = 12 + i * (20 + g);
      rect(c, 10, y, 80, 20, i === 1 ? HOT : ON);
    }
  },
  scale(c, _h, t) {
    const steps = [4, 8, 12, 16, 24, 32, 48];
    const on = Math.floor(t / 0.8) % steps.length;
    steps.forEach((v, i) => rect(c, 10, 8 + i * 12, v * 1.6, 7, i === on ? HOT : ON));
  },
  shadow(c, _h, t) {
    const k = 0.5 + 0.5 * Math.sin(t * 0.7);
    for (let i = 0; i < 3; i++) {
      const x = 10 + i * 30;
      const e = 2 + i * 3 + k * 2;
      rect(c, x + e, 40 + e, 22, 22, DIM);
      rect(c, x, 40 - i * 4, 22, 22, ON);
    }
    line(c, [[10, 14], [24, 26]], 2, HOT);
    circle(c, 8, 12, 4, HOT);
  },
  measure(c, _h, t) {
    const w = 46 + 20 * (0.5 + 0.5 * Math.sin(t * 0.6));
    for (let i = 0; i < 6; i++) rect(c, 10, 14 + i * 12, i === 5 ? w * 0.6 : w, 4, ON);
    line(c, [[10, 90], [10 + w, 90]], 2, HOT);
  },
  undo(c, _h, t) {
    const p = cycle(t, 4);
    const gone = p > 0.25 && p < 0.75;
    if (!gone) rect(c, 14, 20, 72, 18, ON);
    rect(c, 14, 46, 72, 18, ON);
    if (gone) {
      rect(c, 10, 74, 80, 16, DIM);
      rect(c, 62, 78, 22, 8, HOT);
    }
  },
  optical(c, _h, t) {
    const k = 0.5 + 0.5 * Math.sin(t * 0.8);
    c.strokeStyle = ON;
    c.lineWidth = 2.4;
    c.beginPath();
    c.arc(50, 50, 34, 0, Math.PI * 2);
    c.stroke();
    const dx = 4 * k;
    c.fillStyle = HOT;
    c.beginPath();
    c.moveTo(38 + dx, 32);
    c.lineTo(66 + dx, 50);
    c.lineTo(38 + dx, 68);
    c.closePath();
    c.fill();
    line(c, [[50, 8], [50, 92]], 1, DIM);
  },
  primary(c, _h, t) {
    const on = Math.floor(t / 1.6) % 3 === 0;
    rect(c, 10, 30, 80, 22, on ? HOT : ON);
    c.strokeStyle = DIM;
    c.lineWidth = 2;
    c.strokeRect(10, 60, 38, 16);
    c.strokeRect(52, 60, 38, 16);
  },
  errors(c, _h, t) {
    c.strokeStyle = HOT;
    c.lineWidth = 2.4;
    c.strokeRect(10, 24, 80, 20);
    rect(c, 14, 31, 40, 5, ON);
    const k = Math.min(1, cycle(t, 3) * 2);
    rect(c, 10, 54, 60 * k, 5, HOT);
    rect(c, 10, 66, 44 * k, 5, DIM);
  },
};

function RuleText({ text }: { text: string }) {
  return (
    <div className="rule-md">
      {text.split('\n').map((line, k) => {
        if (line.startsWith('## ')) return <p key={k} className="rule-h">{line}</p>;
        if (line.startsWith('- ')) return <p key={k} className="rule-li">{line}</p>;
        return <p key={k} className="rule-gap">{line || '\u00a0'}</p>;
      })}
    </div>
  );
}

function morph(update: () => void) {
  const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
  if (!doc.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    update();
    return;
  }
  doc.startViewTransition(() => flushSync(update));
}

function name(i: number | null, on: boolean) {
  if (i === null) return;
  const card = document.querySelector<HTMLElement>(`.taste-card[data-i="${i}"]`);
  const art = card?.querySelector<HTMLElement>('.taste-art');
  if (card) card.style.viewTransitionName = on ? 'p-shell' : '';
  if (art) art.style.viewTransitionName = on ? 'p-art' : '';
}

export function Paper({ lang, index, onIndex, onClose, standalone = false }: { lang: Lang; index: number; onIndex?: (i: number) => void; onClose?: () => void; standalone?: boolean }) {
  const t = COPY[lang];
  const p = t.taste[index];
  const a = ARTICLES[lang][p.scene] ?? { kicker: `Principle ${String(index + 1).padStart(2, '0')}`, title: p.title, lede: p.body, sections: [], rules: { do: [], dont: [] }, sources: [] };
  const agent = AGENT_RULES[p.scene] ?? { rule: `## ${p.title}`, enforcedBy: [] };
  const total = t.taste.length;
  const [copied, setCopied] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const sheet = useRef<HTMLDivElement>(null);

  const go = (d: number) => {
    onIndex?.((index + d + total) % total);
    sheet.current?.scrollTo({ top: 0 });
    setCopied(false);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(agent.rule);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  useEffect(() => {
    if (standalone) return;
    const prev = document.activeElement as HTMLElement | null;
    const scroll = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    closeRef.current?.focus({ preventScroll: true });
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.();
      if (e.key === 'Tab' && sheet.current) {
        const items = sheet.current.querySelectorAll<HTMLElement>('a[href], button');
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', key);
    return () => {
      document.documentElement.style.overflow = scroll;
      document.removeEventListener('keydown', key);
      prev?.focus({ preventScroll: true });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const words = a.title.split(' ');
  const labels = [t.paper.why, t.paper.how, t.paper.edge];

  return (
    <div
      ref={sheet}
      className={`dossier ${standalone ? 'is-standalone' : ''}`}
      role={standalone ? undefined : 'dialog'}
      aria-modal={standalone ? undefined : true}
      aria-labelledby="dossier-title"
      style={standalone ? undefined : { viewTransitionName: 'p-shell' }}
    >
      <div className="dossier-bar">
        <p>
          <span className="wordmark-mark" aria-hidden="true" />
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </p>
        {standalone ? (
          <nav className="dossier-nav">
            <a className="dossier-btn" href={principlePath(lang, (index - 1 + total) % total)} aria-label={t.paper.prev}>
              <ArrowLeft2 size={20} />
            </a>
            <a className="dossier-btn" href={principlePath(lang, (index + 1) % total)} aria-label={t.paper.next}>
              <ArrowRight2 size={20} />
            </a>
            <a className="dossier-btn" href={`${home(lang)}#taste`} aria-label={t.paper.close}>
              <CloseCircle size={20} />
            </a>
          </nav>
        ) : (
          <div className="dossier-nav">
            <button type="button" className="dossier-btn" onClick={() => go(-1)} aria-label={t.paper.prev}>
              <ArrowLeft2 size={20} />
            </button>
            <button type="button" className="dossier-btn" onClick={() => go(1)} aria-label={t.paper.next}>
              <ArrowRight2 size={20} />
            </button>
            <button ref={closeRef} type="button" className="dossier-btn" onClick={onClose} aria-label={t.paper.close}>
              <CloseCircle size={20} />
            </button>
          </div>
        )}
      </div>

      <div className="dossier-page" key={index}>
        <header className="dossier-hero">
          <div className="dossier-head">
            <p className="dossier-kicker">{a.kicker}</p>
            {standalone ? (
              <h1 id="dossier-title">
                {words.map((w, k) => (
                  <Fragment key={k}>
                    <span style={{ '--w': k } as React.CSSProperties}>{w}</span>
                    {k < words.length - 1 ? ' ' : ''}
                  </Fragment>
                ))}
              </h1>
            ) : (
              <h2 id="dossier-title">
                {words.map((w, k) => (
                  <Fragment key={k}>
                    <span style={{ '--w': k } as React.CSSProperties}>{w}</span>
                    {k < words.length - 1 ? ' ' : ''}
                  </Fragment>
                ))}
              </h2>
            )}
            <p className="dossier-lede">{a.lede}</p>
          </div>
          <div className="dossier-art" style={standalone ? undefined : { viewTransitionName: 'p-art' }}>
            <Dither draw={TASTE[p.scene]} iso live cols={120} />
          </div>
        </header>

        <div className="example-band">
          <p className="flat-label">{t.paper.example}</p>
          <Example lang={lang} scene={p.scene} avoid={t.paper.dont} doLabel={t.paper.do} />
        </div>

        <div className="spec-cols">
          {a.sections.map((sec, k) => (
            <section key={sec.heading} className="spec-col" style={{ '--c': k } as React.CSSProperties}>
              <p className="spec-num">{String(k + 1).padStart(2, '0')}</p>
              <h3>{labels[k] ?? sec.heading}</h3>
              {sec.body.map((b) => (
                <p key={b}>{b}</p>
              ))}
            </section>
          ))}
        </div>

        <div className="flat-rules">
          <div>
            <p className="flat-label is-do">✓ {t.paper.do}</p>
            <ul>
              {a.rules.do.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="flat-label is-dont">✕ {t.paper.dont}</p>
            <ul>
              {a.rules.dont.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flat-agent">
          <div className="flat-agent-head">
            <p className="flat-label">{t.paper.agents} · PRINCIPLE.md</p>
            <button type="button" className={`flat-copy ${copied ? 'is-done' : ''}`} onClick={copy}>
              {copied ? <TickCircle size={16} variant="Bold" /> : <Copy size={16} />}
              {copied ? t.paper.copied : t.paper.copy}
            </button>
          </div>
          <RuleText text={agent.rule} />
          <p className="flat-enforce">
            <span>{t.paper.enforced}</span>
            {agent.enforcedBy.map((e) => (
              <span key={e.skill}>
                <b>{e.skill}</b> {e.what}
              </span>
            ))}
          </p>
        </div>

        <div className="flat-sources">
          <p className="flat-label">{t.paper.sources}</p>
          <ol>
            {a.sources.map((src, k) => (
              <li key={src.href}>
                <a href={src.href} target="_blank" rel="noreferrer">
                  <span className="src-n">{String(k + 1).padStart(2, '0')}</span>
                  <span className="src-by">{src.by}</span>
                  <span className="src-title">{src.label.replace(/^NN\/g,\s*/, '')}</span>
                  <span className="src-year">{src.year}</span>
                  <ExportSquare size={16} />
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export function Taste({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  const total = String(t.taste.length).padStart(2, '0');
  const [open, setOpen] = useState<number | null>(null);
  const openRef = useRef<number | null>(null);
  openRef.current = open;

  const show = (i: number) => {
    name(i, true);
    morph(() => {
      name(i, false);
      setOpen(i);
    });
  };

  const hide = () => {
    const i = openRef.current;
    morph(() => {
      setOpen(null);
      name(i, true);
    });
    setTimeout(() => name(i, false), 900);
  };

  return (
    <section className="taste" id="taste" aria-labelledby="taste-title">
      <div className="section-head section-head-dark">
        <h2 id="taste-title">{t.sections.taste}</h2>
        <p>{t.sections.tasteLine}</p>
      </div>
      <ol className="taste-grid">
        {t.taste.map((p, i) => (
          <li key={p.scene}>
            <a
              className="taste-card"
              data-i={i}
              href={principlePath(lang, i)}
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
                e.preventDefault();
                show(i);
              }}
              aria-haspopup="dialog"
            >
              <span className="taste-art">
                <Dither draw={TASTE[p.scene]} iso live cols={92} />
              </span>
              <span className="taste-count">
                {String(i + 1).padStart(2, '0')} / {total}
              </span>
              <span className="taste-title">{p.title}</span>
              <span className="taste-body">{p.body}</span>
              <span className="taste-more">
                {t.paper.read}
                <ArrowRight size={16} />
              </span>
            </a>
          </li>
        ))}
      </ol>
      {open !== null && <Paper lang={lang} index={open} onIndex={setOpen} onClose={hide} />}
    </section>
  );
}

const lum = (rgb: string) => {
  const [r, g, b] = (rgb.match(/[\d.]+/g) ?? ['0', '0', '0']).slice(0, 3).map((v) => {
    const c = Number(v) / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

type Measure = { word: DOMRect; text: DOMRect; size: number; ratio: number };

type WordMeasure = {
  text: DOMRect;
  word: DOMRect;
  label: string;
  size: number;
  baseline: number;
  cap: number;
  xh: number;
  ratio: number;
  letters: number;
};

export function Band({ lang }: { lang: Lang }) {
  const b = COPY[lang].band;
  const [box, seen] = useInView<HTMLElement>('-30% 0px');
  const textRef = useRef<HTMLParagraphElement>(null);
  const [m, setM] = useState<WordMeasure | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const words = [...b.before.split(' '), b.mark, ...b.after.split(' ')];
  const markIndex = b.before.split(' ').length;
  const index = hover ?? markIndex;

  useEffect(() => {
    const el = box.current;
    const p = textRef.current;
    if (!el || !p) return;
    const measure = () => {
      const span = p.querySelectorAll<HTMLElement>('[data-w]')[index];
      if (!span) return;
      const base = el.getBoundingClientRect();
      const rel = (r: DOMRect) => new DOMRect(r.left - base.left, r.top - base.top, r.width, r.height);
      const cs = getComputedStyle(p);
      const c = document.createElement('canvas').getContext('2d');
      if (!c) return;
      c.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
      const fm = c.measureText('Hxg');
      const capH = c.measureText('H').actualBoundingBoxAscent;
      const xH = c.measureText('x').actualBoundingBoxAscent;
      const r = rel(span.getBoundingClientRect());
      const size = parseFloat(cs.fontSize);
      const contentH = fm.fontBoundingBoxAscent + fm.fontBoundingBoxDescent;
      const baseline = r.y + (r.height - contentH) / 2 + fm.fontBoundingBoxAscent;
      const l1 = lum(cs.color);
      const l2 = lum(getComputedStyle(el).backgroundColor);
      setM({
        text: rel(p.getBoundingClientRect()),
        word: r,
        label: words[index].replace(/[.,]/g, ''),
        size,
        baseline,
        cap: capH,
        xh: xH,
        ratio: (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05),
        letters: words[index].replace(/[^\p{L}]/gu, '').length,
      });
    };
    measure();
    document.fonts?.ready.then(measure);
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [box, lang, index]);

  return (
    <section className={`inspect ${seen ? 'is-seen' : ''} ${hover !== null ? 'is-hovering' : ''}`} ref={box} aria-label={`${b.before} ${b.mark} ${b.after}`}>
      <h2 className="inspect-text" ref={textRef as unknown as React.RefObject<HTMLHeadingElement>} onPointerLeave={() => setHover(null)}>
        {words.map((w, k) => (
          <span key={k}>
            <span data-w className={`iw ${k === markIndex ? 'iw-mark' : ''} ${k === index ? 'is-on' : ''}`} onPointerEnter={() => setHover(k)}>
              {w}
            </span>{' '}
          </span>
        ))}
      </h2>
      {m && (
        <div className="inspect-layer" aria-hidden="true">
          <span className="guide guide-h guide-base" style={{ left: m.text.x - 24, top: m.baseline, width: m.text.width + 48 }}>
            <b>baseline</b>
          </span>
          <span className="guide guide-h guide-cap" style={{ left: m.text.x - 24, top: m.baseline - m.cap, width: m.text.width + 48 }}>
            <b>cap {(m.cap / m.size).toFixed(2)}em</b>
          </span>
          <span className="guide guide-h guide-x" style={{ left: m.text.x - 24, top: m.baseline - m.xh, width: m.text.width + 48 }}>
            <b>x {(m.xh / m.size).toFixed(2)}em</b>
          </span>
          <span className="sel" style={{ left: m.word.x - 6, top: m.word.y - 6, width: m.word.width + 12, height: m.word.height + 12 }}>
            <i />
            <i />
            <i />
            <i />
          </span>
          <span className="dim dim-x" style={{ left: m.word.x, top: m.word.y - 34, width: m.word.width }}>
            <em>{Math.round(m.word.width)}px</em>
          </span>
          <span className="dim dim-y" style={{ left: m.word.right + 18, top: m.word.y, height: m.word.height }}>
            <em>{Math.round(m.word.height)}px</em>
          </span>
          <span className="tag tag-size" style={{ left: m.text.x - 8, top: m.text.bottom + 28 }}>
            “{m.label}” · {m.letters} {lang === 'es' ? 'letras' : 'letters'}
          </span>
          <span className="tag tag-mid" style={{ left: m.text.x + 220, top: m.text.bottom + 28 }}>
            {Math.round(m.size)}px · {(m.size / 16).toFixed(2)}rem · 500
          </span>
          <span className="tag tag-contrast" style={{ left: m.text.x + 440, top: m.text.bottom + 28 }}>
            {m.ratio.toFixed(1)}:1 · {m.ratio >= 7 ? 'AAA' : m.ratio >= 4.5 ? 'AA' : 'low'}
          </span>
        </div>
      )}
    </section>
  );
}

function DitherField({ clear = true, strength = 1, from = 0, until = 1 }: { clear?: boolean; strength?: number; from?: number; until?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)');
    const B = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);
    let raf = 0;
    let last = 0;
    let visible = false;
    const draw = (time: number) => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (canvas.width !== Math.round(w * dpr)) {
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const t = time / 1000;
      const cell = 4;
      const dot = 1.6;
      ctx.fillStyle = '#111';
      for (let y = 0; y < h; y += cell) {
        const v = y / h;
        for (let x = 0; x < w; x += cell) {
          const u = x / w;
          const dx = (u - 0.5) * 1.6;
          const dy = v - 1.05;
          const glow = Math.exp(-(dx * dx + dy * dy) * 2.4);
          const wave = 0.04 * Math.sin(u * 9 + t * 0.4) * Math.sin(v * 5 - t * 0.3);
          const band = clear ? Math.exp(-Math.pow((x - w / 2) / Math.max(360, w * 0.26), 6)) : 0;
          const fade = Math.min(1, Math.max(0, (v - from) / 0.12)) * (v > until ? 0 : 1);
          const tone = Math.max(0, glow * 0.62 + wave + v * 0.12 - 0.08) * (1 - band) * strength * fade;
          const bx = (x / cell) & 3;
          const by = (y / cell) & 3;
          if (tone > B[by * 4 + bx]) ctx.fillRect(x, y, dot, dot);
        }
      }
    };
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || still.matches || now - last < 90) return;
      last = now;
      draw(now);
    };
    draw(0);
    raf = requestAnimationFrame(loop);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    const ro = new ResizeObserver(() => draw(performance.now()));
    ro.observe(canvas);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, []);
  return <canvas ref={ref} className="dither-field" aria-hidden="true" />;
}

export function SharedField() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    const host = canvas?.parentElement;
    if (!canvas || !ctx || !host) return;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)');
    const B = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);
    let raf = 0;
    let last = 0;
    let visible = false;
    let holes: DOMRect[] = [];
    let calm: DOMRect | null = null;
    let word: DOMRect | null = null;

    const measure = () => {
      const base = host.getBoundingClientRect();
      const top = host.querySelector('.foot-top')?.getBoundingClientRect();
      calm = top ? new DOMRect(0, top.top - base.top, base.width, top.height) : null;
      const wr = host.querySelector('.dotword')?.getBoundingClientRect();
      word = wr ? new DOMRect(wr.left - base.left, wr.top - base.top, wr.width, wr.height) : null;
      holes = Array.from(host.querySelectorAll('[data-clear], .foot a, .foot p, .setup-note span')).map((el) => {
        const r = el.getBoundingClientRect();
        return new DOMRect(r.left - base.left, r.top - base.top, r.width, r.height);
      });
    };

    const draw = (time: number) => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#111';
      const t = time / 1000;
      const cell = 4;
      const pad = 22;
      for (let y = 0; y < h; y += cell) {
        const v = y / h;
        const rowHoles = holes.filter((r) => y > r.top - pad && y < r.bottom + pad);
        const start = calm ? calm.top - 420 : h;
        const end = calm ? calm.top - 10 : h;
        const f = Math.min(1, Math.max(0, (y - start) / Math.max(1, end - start)));
        const inWord = word ? Math.max(0, 1 - Math.max(word.top - y, y - word.bottom, 0) / 80) : 0;
        const calmK = (1 - f * f * (3 - 2 * f) * 0.62) * (1 - inWord * 0.7);
        for (let x = 0; x < w; x += cell) {
          const u = x / w;
          const side = Math.pow(Math.abs(u - 0.5) * 2, 2.2);
          const flow = Math.sin(u * 7 + v * 5 + t * 0.55) * Math.sin(u * 3 - v * 11 + t * 0.4);
          const wave = 0.07 * flow + 0.03 * Math.sin(v * 22 - t * 0.9 + u * 4);
          let tone = (side * (0.55 + 0.25 * v) + 0.1 * v + wave) * calmK;
          for (const r of rowHoles) {
            const dx = Math.max(r.left - x, 0, x - r.right);
            const dy = Math.max(r.top - y, 0, y - r.bottom);
            const d = Math.hypot(dx, dy);
            if (d < pad) tone *= Math.min(1, Math.max(0, (d - 8) / (pad - 8)));
          }
          if (tone > B[((y / cell) & 3) * 4 + ((x / cell) & 3)]) ctx.fillRect(x, y, 1.6, 1.6);
        }
      }
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || still.matches || now - last < 50) return;
      last = now;
      draw(now);
    };

    measure();
    draw(0);
    raf = requestAnimationFrame(loop);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    const ro = new ResizeObserver(() => {
      measure();
      draw(performance.now());
    });
    ro.observe(host);
    const remeasure = setInterval(measure, 1200);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      clearInterval(remeasure);
    };
  }, []);
  return <canvas ref={ref} className="shared-field" aria-hidden="true" />;
}

const AGENT_DIRS = [
  ['Claude Code', '~/.claude/skills/', '.claude/skills/'],
  ['Codex', '~/.agents/skills/', '.agents/skills/'],
  ['Cursor', '~/.cursor/skills/', '.cursor/skills/'],
];
const SKILLS = ['kero-method', 'kero-research', 'kero-scope', 'kero-system', 'kero-audit', 'kero-blind', 'kero-orchestrate'];

export function Setup({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  const [ref, seen] = useInView<HTMLElement>('-20% 0px');
  const [typed, setTyped] = useState(0);
  const [agent, setAgent] = useState(0);
  const [done, setDone] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!seen) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTyped(INSTALL.length);
      setDone(SKILLS.length);
      return;
    }
    if (typed < INSTALL.length) {
      const id = setTimeout(() => setTyped((n) => n + 1), typed === 0 ? 300 : 32);
      return () => clearTimeout(id);
    }
    if (done < SKILLS.length) {
      const id = setTimeout(() => setDone((n) => n + 1), done === 0 ? 520 : 260);
      return () => clearTimeout(id);
    }
  }, [seen, typed, done]);

  const choose = (i: number) => {
    if (i === agent) return;
    setAgent(i);
    setDone(0);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(INSTALL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  const finished = done >= SKILLS.length;

  return (
    <section className="setup" id="install" ref={ref} aria-labelledby="setup-title">
      <h2 id="setup-title" className="setup-title" data-clear>
        {t.sections.install}
      </h2>

      <div className="glass setup-composer" data-clear>
        <p className="setup-cmd">
          <span className="setup-prompt" aria-hidden="true">$</span>
          {INSTALL.slice(0, typed)}
          {typed < INSTALL.length && <span className="caret caret-light" aria-hidden="true" />}
        </p>
        <button type="button" className="send setup-send" onClick={copy} aria-label={copied ? t.hero.copied : t.hero.copy}>
          {copied ? <TickCircle size={20} /> : <ArrowUp size={20} />}
        </button>
      </div>

      <div className="agents" role="tablist" aria-label={t.agents.agent} data-clear>
        {AGENT_DIRS.map(([name, personal, project], i) => {
          const d = ((i - agent + 4) % 3) - 1;
          return (
            <button
              key={name}
              type="button"
              role="tab"
              aria-selected={d === 0}
              className={`glass agent ${d === 0 ? 'is-on' : ''}`}
              style={{ '--d': d, '--a': Math.abs(d) } as React.CSSProperties}
              onClick={() => choose(i)}
            >
              <span className="agent-name">{name}</span>
              <span className="agent-row">
                <span>{t.agents.personal}</span>
                <span>{personal}</span>
              </span>
              <span className="agent-row">
                <span>{t.agents.project}</span>
                <span>{project}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="glass setup-job" data-clear>
        <div className="setup-job-head">
          <p key={agent} className="setup-job-title">
            {t.setup.job}
            <span className="setup-path">{AGENT_DIRS[agent][1]}</span>
          </p>
          <span className={`setup-pill ${finished ? 'is-done' : ''}`}>
            {finished && <TickCircle size={16} variant="Bold" />}
            {done} / {SKILLS.length}
          </span>
        </div>
        <ul className="setup-skills">
          {SKILLS.map((s, i) => (
            <li key={s} className={i < done ? 'is-done' : ''}>
              {i < done ? <TickCircle size={16} variant="Bold" /> : <span className="setup-dot" />}
              {s}
            </li>
          ))}
        </ul>
      </div>

      <Mascot cheer={finished ? 1 : 0} />
      <p className="setup-note" data-clear>
        <span className={finished ? 'is-on' : ''}>{t.setup.ready}</span>
        <span className="setup-audit">
          <InfoCircle size={16} />
          {t.agents.note}
        </span>
      </p>
    </section>
  );
}

function DotWord({ word }: { word: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    const off = document.createElement('canvas');
    const octx = off.getContext('2d', { willReadFrequently: true });
    if (!canvas || !ctx || !octx) return;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)');
    let raf = 0;
    let last = 0;
    let visible = false;
    let mask: Uint8ClampedArray | null = null;
    let cols = 0;
    let rows = 0;
    let cell = 0;

    const build = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cell = Math.max(3, Math.round(w / 420));
      cols = Math.floor(w / cell);
      rows = Math.floor(h / cell);
      off.width = cols;
      off.height = rows;
      octx.clearRect(0, 0, cols, rows);
      octx.fillStyle = '#fff';
      octx.textBaseline = 'alphabetic';
      let size = rows * 1.1;
      octx.font = `600 ${size}px ${getComputedStyle(canvas).fontFamily}`;
      const measured = octx.measureText(word).width;
      size = (size * cols * 0.98) / measured;
      octx.font = `600 ${size}px ${getComputedStyle(canvas).fontFamily}`;
      octx.fillText(word, cols * 0.01, rows * 0.86);
      mask = octx.getImageData(0, 0, cols, rows).data;
    };

    const draw = (time: number) => {
      if (!mask) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      const t = time / 1000;
      const sweep = ((t * 0.18) % 1.4) - 0.2;
      const dot = Math.max(1.4, cell * 0.55);
      const B = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const a = mask[(y * cols + x) * 4 + 3] / 255;
          if (a < 0.5) continue;
          const u = x / cols;
          const tone = 0.42 + 0.58 * (y / rows) + 0.12 * Math.sin(u * 14 + t * 0.6);
          if (tone <= (B[(y & 3) * 4 + (x & 3)] + 0.5) / 16) continue;
          const near = Math.abs(u - sweep) < 0.03;
          ctx.fillStyle = near ? '#f2541b' : '#111';
          ctx.fillRect(x * cell + (cell - dot) / 2, y * cell + (cell - dot) / 2, dot, dot);
        }
      }
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || still.matches || now - last < 50) return;
      last = now;
      draw(now);
    };

    build();
    draw(0);
    document.fonts?.ready.then(() => {
      build();
      draw(performance.now());
    });
    raf = requestAnimationFrame(loop);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    const ro = new ResizeObserver(() => {
      build();
      draw(performance.now());
    });
    ro.observe(canvas);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, [word]);
  return <canvas ref={ref} className="dotword" aria-hidden="true" />;
}

export function HeroWord({ lines }: { lines: string[] }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    const off = document.createElement('canvas');
    const octx = off.getContext('2d', { willReadFrequently: true });
    if (!canvas || !ctx || !octx) return;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)');
    const B = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
    let raf = 0;
    let last = 0;
    let visible = true;
    let mask: Uint8ClampedArray | null = null;
    let cols = 0;
    let rows = 0;
    const cell = 4;

    const build = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.floor(w / cell);
      rows = Math.floor(h / cell);
      off.width = cols;
      off.height = rows;
      octx.clearRect(0, 0, cols, rows);
      octx.fillStyle = '#fff';
      octx.textBaseline = 'alphabetic';
      const font = getComputedStyle(canvas).fontFamily;
      const slot = rows / lines.length;
      lines.forEach((text, i) => {
        octx.font = `700 100px ${font}`;
        const m = octx.measureText(text);
        const capH = m.actualBoundingBoxAscent;
        const byWidth = (100 * cols * 0.98) / m.width;
        const byHeight = (100 * slot * 0.92) / capH;
        const size = Math.min(byWidth, byHeight);
        octx.font = `700 ${size}px ${font}`;
        const tw = octx.measureText(text).width;
        const asc = octx.measureText(text).actualBoundingBoxAscent;
        octx.fillText(text, (cols - tw) / 2, slot * i + (slot + asc) / 2);
      });
      mask = octx.getImageData(0, 0, cols, rows).data;
    };

    const draw = (time: number) => {
      if (!mask) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      const t = time / 1000;
      const sweep = ((t * 0.12) % 1.4) - 0.2;
      const dot = 1.6;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const a = mask[(y * cols + x) * 4 + 3] / 255;
          if (a < 0.5) continue;
          const u = x / cols;
          const tone = 0.22 + 0.3 * (y / rows) + 0.08 * Math.sin(u * 10 + t * 0.5 + y * 0.02);
          if (tone <= (B[(y & 3) * 4 + (x & 3)] + 0.5) / 16) continue;
          ctx.fillStyle = Math.abs(u - sweep) < 0.025 ? '#f2541b' : '#111';
          ctx.fillRect(x * cell, y * cell, dot, dot);
        }
      }
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || still.matches || now - last < 60) return;
      last = now;
      draw(now);
    };

    build();
    draw(0);
    document.fonts?.ready.then(() => {
      build();
      draw(performance.now());
    });
    raf = requestAnimationFrame(loop);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    const ro = new ResizeObserver(() => {
      build();
      draw(performance.now());
    });
    ro.observe(canvas);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, [lines]);
  return <canvas ref={ref} className="hero-word" aria-hidden="true" />;
}

const HERO_LINES = ['KERO', 'STACK'];

export function HeroStage() {
  return <HeroWord lines={HERO_LINES} />;
}

export function Footer({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  return (
    <footer className="foot">
      <div className="foot-inner">
      <div className="foot-top">
        <div className="foot-lead">
          <p className="wordmark">
            <span className="wordmark-mark" aria-hidden="true" />
            Kero-stack
          </p>
          <p className="foot-line">{t.hero.line}</p>
        </div>
        <nav className="foot-cols">
          {t.links.map((col) => (
            <div key={col.title}>
              <p className="foot-col-title">{col.title}</p>
              <ul>
                {col.items.map((it) => (
                  <li key={it.label}>
                    <a href={it.href}>{it.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <DotWord word="Kero-stack" />
      <p className="foot-legal" data-clear>{t.footer}</p>
      </div>
    </footer>
  );
}
