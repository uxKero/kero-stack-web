'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft2, ArrowRight2, Copy, CopySuccess, ExportSquare } from 'iconsax-reactjs';
import { COPY, type Lang } from './content';
import { Dither } from './dither';

const GAP = 18;

export function Deck({ lang, active }: { lang: Lang; active: string }) {
  const t = COPY[lang];
  const cards = t.cards;
  const [pos, setPos] = useState(0);
  const n = cards.length;
  const [dragging, setDragging] = useState(false);
  const [flipped, setFlipped] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [cw, setCw] = useState(220);
  const stage = useRef<HTMLDivElement>(null);
  const drag = useRef({ x: 0, pos: 0, moved: 0, last: 0, v: 0, t: 0, active: false, samples: [] as { x: number; t: number }[] });
  const touched = useRef(0);
  const hovering = useRef(false);
  const onScreen = useRef(true);
  const flippedNow = useRef<string | null>(null);
  flippedNow.current = flipped;

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => (onScreen.current = e.isIntersecting));
    io.observe(el);
    const still = window.matchMedia('(prefers-reduced-motion: reduce)');
    const id = setInterval(() => {
      if (still.matches || hovering.current || !onScreen.current || document.hidden) return;
      if (Date.now() - touched.current < 6000) return;
      if (!flippedNow.current) setPos((p) => Math.round(p) + 1);
    }, 3200);
    return () => {
      clearInterval(id);
      io.disconnect();
    };
  }, []);
  const wheelEnd = useRef<ReturnType<typeof setTimeout>>(undefined);

  const max = cards.length - 1;
  const clamp = (v: number) => v;
  const go = useCallback((i: number) => setPos(Math.round(i)), []);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      const h = e.contentRect.height;
      setCw(Math.round(Math.max(160, Math.min(290, h * 0.62))));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (Date.now() - touched.current < 5000) return;
    const i = cards.findIndex((c) => c.id === active);
    if (i >= 0) {
      setFlipped(null);
      go(i);
    }
  }, [active, cards, go]);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (!(e.target as Element | null)?.closest?.('.card.is-near')) return;
      const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(d) < 1) return;
      e.preventDefault();
      touched.current = Date.now();
      setDragging(true);
      setPos((p) => clamp(p + d / (cw + GAP)));
      clearTimeout(wheelEnd.current);
      wheelEnd.current = setTimeout(() => {
        setDragging(false);
        setPos((p) => Math.round(p));
      }, 140);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cw, max]);

  const down = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    drag.current = { x: e.clientX, pos: Math.round(pos), moved: 0, last: e.clientX, v: 0, t: performance.now(), active: true, samples: [] as { x: number; t: number }[] };
    touched.current = Date.now();
  };

  const move = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d.active || !(e.buttons & 1)) return;
    const dx = e.clientX - d.x;
    d.moved = Math.max(d.moved, Math.abs(dx));
    if (d.moved < 5) return;
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.setPointerCapture(e.pointerId);
      setFlipped(null);
      setDragging(true);
    }
    const now = performance.now();
    d.samples.push({ x: e.clientX, t: now });
    while (d.samples.length > 2 && now - d.samples[0].t > 100) d.samples.shift();
    touched.current = Date.now();
    setPos(d.pos - dx / (cw + GAP));
  };

  const up = () => {
    const d = drag.current;
    if (!d.active) return;
    d.active = false;
    if (d.moved < 5) return;
    const a = d.samples[0];
    const b = d.samples[d.samples.length - 1];
    const v = a && b && b.t > a.t ? (b.x - a.x) / (b.t - a.t) : 0;
    const throwCards = Math.max(-2, Math.min(2, (-v * 220) / (cw + GAP)));
    setDragging(false);
    setPos((p) => Math.round(p + throwCards));
  };

  const click = (i: number, id: string) => {
    if (drag.current.moved > 6) return;
    touched.current = Date.now();
    if (center === i) setFlipped((f) => (f === id ? null : id));
    else {
      setFlipped(null);
      go(Math.round(pos) + ((((i - Math.round(pos)) % n) + n + n / 2) % n) - n / 2);
    }
  };

  const key = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      touched.current = Date.now();
      setFlipped(null);
      go(Math.round(pos) + (e.key === 'ArrowRight' ? 1 : -1));
    }
  };

  const copy = async (id: string, cmd: string) => {
    try {
      await navigator.clipboard.writeText(cmd);
      setCopied(id);
      setTimeout(() => setCopied(null), 1600);
    } catch {}
  };

  const center = ((Math.round(pos) % n) + n) % n;

  return (
    <section className="deck" aria-roledescription="carousel" aria-label={t.deck.title} onKeyDown={key}>
      <div
        ref={stage}
        className={`deck-stage ${dragging ? 'is-dragging' : ''}`}
        style={{ '--cw': `${cw}px` } as React.CSSProperties}
        onPointerEnter={(e) => e.pointerType === 'mouse' && (hovering.current = true)}
        onPointerLeave={() => (hovering.current = false)}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
      >
        {cards.map((c, i) => {
          const d = ((((i - pos) % n) + n + n / 2) % n) - n / 2;
          const a = Math.abs(d);
          const bend = Math.sign(d) * Math.min(62, a * 34);
          const x = Math.sign(d) * (a <= 1 ? a * (cw + GAP) : cw + GAP + (a - 1) * (cw * 0.62 + GAP));
          const z = -Math.min(3, a) * 70;
          const style = {
            transform: `translate3d(calc(-50% + ${x}px), -50%, ${z}px) rotateY(${-bend}deg)`,
            transformOrigin: d > 0 ? 'left center' : 'right center',
            zIndex: 100 - Math.round(a * 10),
            opacity: a > 3.4 ? 0 : 1,
          } as React.CSSProperties;
          const isFlipped = flipped === c.id;
          const isActive = c.id === active;
          return (
            <article key={c.id} className={`card ${c.own ? 'card-own' : ''} ${isActive ? 'is-active' : ''} ${i === center ? 'is-center' : ''} ${a <= 1.2 ? 'is-near' : ''}`} style={style} aria-hidden={a > 2.5}>
              <div className={`card-inner ${isFlipped ? 'is-flipped' : ''}`}>
                <button
                  type="button"
                  className="card-face card-front"
                  onClick={() => click(i, c.id)}
                  aria-label={i === center ? `${c.name}. ${t.deck.flip}` : c.name}
                  tabIndex={a > 2.5 ? -1 : 0}
                >
                  <span className="card-top">
                    <span className="card-by">{c.by}</span>
                    {isActive && <span className="card-live" />}
                  </span>
                  <Dither visual={c.visual} live={a < 2.6} active={isActive} />
                  <span className="card-name">{c.name}</span>
                  <span className="card-line mono">{c.io}</span>
                </button>
                <div className="card-face card-back" aria-hidden={!isFlipped}>
                  <button type="button" className="card-back-hit" onClick={() => click(i, c.id)} aria-label={t.deck.back} tabIndex={isFlipped ? 0 : -1} />
                  <span className="card-name">{c.name}</span>
                  <p className="card-detail">{c.detail}</p>
                  <div className="card-actions">
                    <button type="button" className="card-cmd" onClick={() => copy(c.id, c.install)} tabIndex={isFlipped ? 0 : -1}>
                      <code>{c.install.replace('npx skills add ', '')}</code>
                      {copied === c.id ? <CopySuccess size={18} /> : <Copy size={18} />}
                    </button>
                    <a href={c.href} className="card-link" tabIndex={isFlipped ? 0 : -1} aria-label={`${c.name} GitHub`}>
                      <ExportSquare size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <div className="deck-foot">
        <button type="button" className="round" onClick={() => { touched.current = Date.now(); setFlipped(null); go(Math.round(pos) - 1); }} aria-label={t.deck.prev}>
          <ArrowLeft2 size={18} />
        </button>
        <button type="button" className="round" onClick={() => { touched.current = Date.now(); setFlipped(null); go(Math.round(pos) + 1); }} aria-label={t.deck.next}>
          <ArrowRight2 size={18} />
        </button>
      </div>
    </section>
  );
}
