'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight2, Copy, ExportSquare, Translate } from 'iconsax-reactjs';
import { COPY, INSTALL, REPO, type Lang } from './content';

type Item = { label: string; hint?: string; icon?: React.ReactNode; run: () => void };

export function ContextMenu({ lang, onLang }: { lang: Lang; onLang: () => void }) {
  const m = COPY[lang].menu;
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [copied, setCopied] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const open = (url: string) => window.open(url, '_blank', 'noopener');

  const groups: { title: string; items: Item[] }[] = [
    {
      title: m.go,
      items: [
        { label: m.top, hint: '1', icon: <ArrowRight2 size={16} />, run: () => go('top') },
        { label: m.method, hint: '2', icon: <ArrowRight2 size={16} />, run: () => go('method') },
        { label: m.taste, hint: '3', icon: <ArrowRight2 size={16} />, run: () => go('taste') },
        { label: m.install, hint: '4', icon: <ArrowRight2 size={16} />, run: () => go('install') },
      ],
    },
    {
      title: m.actions,
      items: [
        {
          label: copied ? m.copied : m.copy,
          hint: 'C',
          icon: <Copy size={16} />,
          run: () => {
            navigator.clipboard?.writeText(INSTALL).catch(() => {});
            setCopied(true);
            setTimeout(() => setCopied(false), 1400);
          },
        },
        { label: m.lang, hint: 'L', icon: <Translate size={16} />, run: onLang },
      ],
    },
    {
      title: m.links,
      items: [
        { label: m.repo, icon: <ExportSquare size={16} />, run: () => open(REPO) },
        { label: m.profile, icon: <ExportSquare size={16} />, run: () => open('https://github.com/uxKero') },
        { label: m.contact, icon: <ExportSquare size={16} />, run: () => open('https://x.com/uxKero') },
      ],
    },
  ];
  const flat = groups.flatMap((g) => g.items);
  const flatRef = useRef(flat);
  flatRef.current = flat;

  useEffect(() => {
    const onMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (e.shiftKey || target.closest('input, textarea, [contenteditable="true"], .dossier')) return;
      e.preventDefault();
      setPos({ x: e.clientX, y: e.clientY });
    };
    document.addEventListener('contextmenu', onMenu);
    return () => document.removeEventListener('contextmenu', onMenu);
  }, []);

  useEffect(() => {
    if (!pos) return;
    const el = box.current;
    if (el) {
      const r = el.getBoundingClientRect();
      const x = Math.min(pos.x, window.innerWidth - r.width - 8);
      const y = Math.min(pos.y, window.innerHeight - r.height - 8);
      if (x !== pos.x || y !== pos.y) setPos({ x, y });
      el.querySelector<HTMLButtonElement>('button')?.focus({ preventScroll: true });
    }
    const close = () => setPos(null);
    const down = (e: PointerEvent) => {
      if (!box.current?.contains(e.target as Node)) close();
    };
    const key = (e: KeyboardEvent) => {
      const buttons = Array.from(box.current?.querySelectorAll<HTMLButtonElement>('button') ?? []);
      const i = buttons.indexOf(document.activeElement as HTMLButtonElement);
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const n = buttons.length;
        buttons[(i + (e.key === 'ArrowDown' ? 1 : -1) + n) % n]?.focus();
      } else {
        const hit = flatRef.current.find((it) => it.hint && it.hint.toLowerCase() === e.key.toLowerCase());
        if (hit) {
          e.preventDefault();
          hit.run();
          close();
        }
      }
    };
    document.addEventListener('pointerdown', down);
    document.addEventListener('keydown', key);
    window.addEventListener('scroll', close, { passive: true });
    window.addEventListener('resize', close);
    return () => {
      document.removeEventListener('pointerdown', down);
      document.removeEventListener('keydown', key);
      window.removeEventListener('scroll', close);
      window.removeEventListener('resize', close);
    };
  }, [pos]);

  if (!pos) return null;

  return (
    <div ref={box} className="ctx" role="menu" style={{ left: pos.x, top: pos.y }}>
      {groups.map((g) => (
        <div key={g.title} className="ctx-group" role="group" aria-label={g.title}>
          <p className="ctx-title">{g.title}</p>
          {g.items.map((it) => (
            <button
              key={it.label}
              type="button"
              role="menuitem"
              className="ctx-item"
              onClick={() => {
                it.run();
                if (it.hint !== 'C') setPos(null);
              }}
            >
              <span className="ctx-icon">{it.icon}</span>
              <span className="ctx-label">{it.label}</span>
              {it.hint && <kbd>{it.hint}</kbd>}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
