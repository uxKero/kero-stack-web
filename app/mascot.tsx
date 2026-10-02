'use client';

import { useEffect, useRef, useState } from 'react';

type Gear = 'none' | 'hat' | 'shades' | 'party';
const GEAR: Gear[] = ['hat', 'shades', 'party'];

const W = 120;

export function Mascot({ cheer }: { cheer: number }) {
  const root = useRef<HTMLDivElement>(null);
  const body = useRef<SVGGElement>(null);
  const eyes = useRef<SVGGElement>(null);
  const legs = useRef<(SVGRectElement | null)[]>([]);
  const lids = useRef<SVGGElement>(null);
  const chute = useRef<SVGGElement>(null);
  const api = useRef<{ hop: () => void }>({ hop: () => {} });
  const [gear, setGear] = useState<Gear>('none');
  const [confetti, setConfetti] = useState(0);
  const gearRef = useRef(setGear);
  gearRef.current = setGear;

  useEffect(() => {
    const el = root.current;
    const host = el?.parentElement;
    if (!el || !host) return;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)');
    let x = host.clientWidth * 0.18;
    let target = x;
    let face = 1;
    let phase = 0;
    let jump = 0;
    let jumpV = 0;
    let squash = 0;
    let look = { x: 0, y: 0 };
    let blinkAt = performance.now() + 2500;
    let last = performance.now();
    let raf = 0;
    let visible = false;
    let leap = false;
    let gearAt = performance.now() + 6000;
    let gearOff = 0;
    let lift = 0;
    type Act =
      | { k: 'ground' }
      | { k: 'crouch'; t0: number }
      | { k: 'air'; t0: number; x0: number; y0: number; vx: number; vy: number; T: number; x1: number; y1: number }
      | { k: 'perch'; until: number }
      | { k: 'para'; vx: number; t0: number };
    let act: Act = { k: 'ground' };

    const floorLift = () => 0;
    const cardTop = () => {
      const card = host.querySelector('.agent.is-on') as HTMLElement | null;
      if (!card) return null;
      const hr = host.getBoundingClientRect();
      const cr = card.getBoundingClientRect();
      const divBottom = el.getBoundingClientRect().bottom + lift;
      return { x: cr.left + cr.width / 2 - hr.left, y: divBottom - 8 - cr.top - 2 };
    };

    const hop = (power = 1) => {
      if (jump > 0.5) return;
      jumpV = 9 * power;
      squash = 0.18;
    };
    api.current.hop = () => hop(1.15);

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height * 0.4);
      const d = Math.hypot(dx, dy) || 1;
      const k = Math.min(1, d / 260);
      look = { x: (dx / d) * 3.2 * k, y: (dy / d) * 2.4 * k };
    };

    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (el.contains(t)) {
        hop(1.2);
        if (act.k === 'para' || act.k === 'air') return;
        gearRef.current((g) => GEAR[(GEAR.indexOf(g as Gear) + 1) % GEAR.length]);
        gearOff = performance.now() + 7000;
        return;
      }
      const r = host.getBoundingClientRect();
      if (t.closest('.agent') && (act.k === 'ground' || act.k === 'perch')) {
        act = { k: 'crouch', t0: performance.now() };
        return;
      }
      if (act.k !== 'ground') return;
      const card = t.closest('.glass, .agents') as HTMLElement | null;
      if (card) {
        const c = card.getBoundingClientRect();
        target = Math.max(W / 2, Math.min(r.width - W / 2, c.left + c.width / 2 - r.left));
        leap = true;
        hop(1);
      } else {
        if (t.closest('button, a, input, [role="tab"]')) return;
        target = Math.max(W / 2, Math.min(r.width - W / 2, e.clientX - r.left));
        leap = false;
      }
      if (still.matches) x = target;
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible) {
        last = now;
        return;
      }
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      let sway = 0;
      let tuck = 0;
      let tilt = 0;
      let stretch = 0;
      const G = 1700;
      if (act.k === 'crouch') {
        const p = (now - act.t0) / 220;
        stretch = -0.22 * Math.sin(Math.min(1, p) * Math.PI * 0.5);
        if (p >= 1) {
          const c = cardTop();
          if (!c) act = { k: 'ground' };
          else {
            const apex = Math.max(lift, c.y) + 150;
            const vy = Math.sqrt(2 * G * (apex - lift));
            const T = vy / G + Math.sqrt((2 * (apex - c.y)) / G);
            act = { k: 'air', t0: now, x0: x, y0: lift, vx: (c.x - x) / T, vy, T, x1: c.x, y1: c.y };
            face = Math.sign(c.x - x) || face;
          }
        }
      } else if (act.k === 'air') {
        const t = Math.min(act.T, (now - act.t0) / 1000);
        x = act.x0 + act.vx * t;
        lift = act.y0 + act.vy * t - 0.5 * G * t * t;
        const v = act.vy - G * t;
        stretch = Math.max(-0.08, Math.min(0.14, v / 7000));
        tilt = Math.max(-14, Math.min(14, (act.vx / 900) * 14 * (v > 0 ? 1 : -0.4)));
        tuck = 6;
        target = x;
        if (t >= act.T) {
          x = act.x1;
          lift = act.y1;
          squash = 0.32;
          act = { k: 'perch', until: now + 1800 };
        }
      } else if (act.k === 'perch') {
        const c = cardTop();
        if (c) {
          x += (c.x - x) * 0.2;
          lift = c.y;
        }
        target = x;
        if (now > act.until) {
          const r = host.getBoundingClientRect();
          const dir = Math.random() < 0.5 ? -1 : 1;
          act = { k: 'para', vx: dir * (40 + Math.random() * 40), t0: now };
          gearRef.current('none');
          gearOff = 0;
          squash = 0.2;
          void r;
        }
      } else if (act.k === 'para') {
        const open = now - act.t0 > 260;
        const tp = (now - act.t0) / 1000;
        if (!open) lift += (260 - tp * 900) * dt;
        else lift = Math.max(0, lift - 70 * dt);
        const hw = host.clientWidth;
        x = Math.max(W / 2, Math.min(hw - W / 2, x + act.vx * dt));
        target = x;
        sway = open ? Math.sin((now - act.t0) / 380) * 9 : 0;
        if (lift <= 0 && open) {
          lift = 0;
          squash = 0.3;
          act = { k: 'ground' };
        }
      }
      void floorLift;
      if (chute.current) {
        const show = act.k === 'para' && now - act.t0 > 200;
        chute.current.setAttribute('opacity', show ? '1' : '0');
        chute.current.setAttribute('transform', show ? `rotate(${sway} 60 40) translate(60 20) scale(1 ${Math.min(1, (now - (act as { t0: number }).t0 - 200) / 260)}) translate(-60 -20)` : '');
      }
      const dist = target - x;
      const walking = act.k === 'ground' && Math.abs(dist) > 2;
      if (walking && leap && jump === 0) hop(0.75);
      if (!walking) leap = false;
      if (act.k !== 'ground') gearAt = Math.max(gearAt, now + 4000);
      if (now > gearAt) {
        gearRef.current(GEAR[Math.floor(Math.random() * GEAR.length)]);
        gearOff = now + 5000 + Math.random() * 3000;
        gearAt = now + 14000 + Math.random() * 8000;
      }
      if (gearOff && now > gearOff) {
        gearRef.current('none');
        gearOff = 0;
      }
      if (walking) {
        face = Math.sign(dist);
        const step = Math.min(Math.abs(dist), (leap ? 260 : 180) * dt);
        x += Math.sign(dist) * step;
        phase += dt * 14;
      } else {
        phase *= 0.9;
      }
      jumpV -= 30 * dt;
      jump = Math.max(0, jump + jumpV * dt * 10);
      if (jump === 0 && jumpV < 0) jumpV = 0;
      squash *= 0.82;

      el.style.transform = `translate(${x - W / 2}px, ${-lift}px) rotate(${sway * 0.4 + tilt * face * 0}deg)`;
      const sh = el.querySelector('.m-shadow');
      if (sh) sh.setAttribute('opacity', act.k === 'ground' && lift <= 1 ? '0.12' : '0');
      const lean = walking ? face * 4 : look.x * 0.8;
      const bob = walking ? Math.abs(Math.sin(phase)) * 2.5 : 0;
      if (body.current)
        body.current.setAttribute(
          'transform',
          `translate(0 ${-jump - bob - tuck * 0.5}) rotate(${lean + tilt} 60 70) translate(60 70) scale(${1 + squash - stretch * 0.6} ${1 - squash + stretch}) translate(-60 -70)`,
        );
      if (eyes.current) eyes.current.setAttribute('transform', `translate(${walking ? face * 2.5 : look.x} ${look.y})`);
      legs.current.forEach((l, i) => {
        if (!l) return;
        const s = walking ? Math.sin(phase + (i % 2 ? Math.PI : 0)) : 0;
        l.setAttribute('transform', `translate(0 ${-jump - Math.max(0, s) * 3 - tuck}) rotate(${s * 14 + (tuck ? (i < 2 ? -18 : 18) : 0)} ${l.x.baseVal.value + 3} 60)`);
      });
      if (lids.current) {
        const blink = now > blinkAt && now < blinkAt + 140;
        if (now > blinkAt + 140) blinkAt = now + 2200 + Math.random() * 3000;
        lids.current.setAttribute('opacity', blink ? '1' : '0');
      }
    };

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);
    host.addEventListener('pointermove', onMove);
    host.addEventListener('click', onClick);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('click', onClick);
    };
  }, []);

  useEffect(() => {
    if (!cheer) return;
    api.current.hop();
    setGear('party');
    setConfetti((c) => c + 1);
    const id = setTimeout(() => setGear('none'), 6000);
    return () => clearTimeout(id);
  }, [cheer]);

  return (
    <div ref={root} className="mascot" aria-hidden="true">
      <svg viewBox="0 -110 120 194" width={W} height={194}>
        <defs>
          <pattern id="m-dots" width="3" height="3" patternUnits="userSpaceOnUse">
            <rect width="1.2" height="1.2" fill="#8f300a" opacity="0.55" />
          </pattern>
          <linearGradient id="m-shade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0.45" stopColor="#fff" />
            <stop offset="1" stopColor="#000" />
          </linearGradient>
          <mask id="m-mask">
            <rect x="0" y="0" width="120" height="100" fill="url(#m-shade)" />
          </mask>
        </defs>
        <ellipse cx="60" cy="80" rx="40" ry="4" fill="#111" opacity="0.12" className="m-shadow" />
        <g ref={chute} opacity="0">
          <path d="M8 -40 Q60 -112 112 -40 Q99 -50 86 -40 Q73 -50 60 -40 Q47 -50 34 -40 Q21 -50 8 -40 Z" fill="#f2541b" />
          <path d="M34 -40 Q47 -100 60 -96 Q73 -100 86 -40 Q73 -50 60 -40 Q47 -50 34 -40 Z" fill="#fff" opacity="0.9" />
          <path d="M8 -40 L14 40 M34 -40 L30 30 M60 -40 L60 14 M86 -40 L90 30 M112 -40 L106 40" stroke="#111" strokeWidth="1" opacity="0.6" />
        </g>
        {[30, 44, 72, 86].map((lx, i) => (
          <rect
            key={lx}
            ref={(r) => {
              legs.current[i] = r;
            }}
            x={lx}
            y="58"
            width="6"
            height="18"
            rx="1.5"
            fill="#c95f3d"
          />
        ))}
        <g ref={body}>
          <rect x="8" y="34" width="14" height="14" rx="2" fill="#d97757" />
          <rect x="98" y="34" width="14" height="14" rx="2" fill="#d97757" />
          <rect x="20" y="14" width="80" height="50" rx="4" fill="#d97757" />
          <rect x="20" y="14" width="80" height="50" rx="4" fill="url(#m-dots)" mask="url(#m-mask)" />
          <rect x="86" y="14" width="14" height="50" rx="4" fill="#b8573a" opacity="0.35" />
          <g ref={eyes}>
            <rect x="44" y="28" width="7" height="13" rx="2.5" fill="#111" />
            <rect x="69" y="28" width="7" height="13" rx="2.5" fill="#111" />
            <rect x="45.5" y="30" width="2.2" height="3" rx="1" fill="#fff" opacity="0.8" />
            <rect x="70.5" y="30" width="2.2" height="3" rx="1" fill="#fff" opacity="0.8" />
            {gear === 'shades' && (
              <g className="gear">
                <rect x="38" y="26" width="18" height="12" rx="3" fill="#111" />
                <rect x="64" y="26" width="18" height="12" rx="3" fill="#111" />
                <rect x="55" y="29" width="10" height="2.5" fill="#111" />
                <rect x="41" y="28" width="6" height="2" rx="1" fill="#fff" opacity="0.5" />
                <rect x="67" y="28" width="6" height="2" rx="1" fill="#fff" opacity="0.5" />
              </g>
            )}
          </g>
          {gear === 'hat' && (
            <g className="gear">
              <rect x="40" y="-16" width="40" height="28" rx="2" fill="#111" />
              <rect x="40" y="4" width="40" height="5" fill="#f2541b" />
              <rect x="30" y="10" width="60" height="6" rx="3" fill="#111" />
            </g>
          )}
          {gear === 'party' && (
            <g className="gear">
              <path d="M60 -26 L44 14 L76 14 Z" fill="#f2541b" />
              <path d="M54 -11 L66 -11 M50 -1 L70 -1 M47 7 L73 7" stroke="#fff" strokeWidth="3" opacity="0.8" />
              <circle cx="60" cy="-27" r="5" fill="#ffd23f" />
            </g>
          )}
          <g ref={lids} opacity="0">
            <rect x="42" y="33" width="11" height="3" rx="1.5" fill="#111" />
            <rect x="67" y="33" width="11" height="3" rx="1.5" fill="#111" />
            <rect x="43" y="27" width="9" height="6" fill="#d97757" />
            <rect x="68" y="27" width="9" height="6" fill="#d97757" />
            <rect x="43" y="36" width="9" height="6" fill="#d97757" />
            <rect x="68" y="36" width="9" height="6" fill="#d97757" />
          </g>
        </g>
      </svg>
      {confetti > 0 && (
        <div className="confetti" key={confetti}>
          {Array.from({ length: 18 }, (_, i) => (
            <i key={i} style={{ '--i': i, '--c': ['#f2541b', '#ffd23f', '#3ddc84', '#38b6ff', '#111'][i % 5] } as React.CSSProperties} />
          ))}
        </div>
      )}
    </div>
  );
}
