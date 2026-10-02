'use client';

import { useEffect, useRef, useState } from 'react';
import { CloseCircle } from 'iconsax-reactjs';
import { COPY, type Lang } from './content';

const ANYDESIGN = 'https://github.com/uxKero/anydesign';

export function Notice({ lang }: { lang: Lang }) {
  const t = COPY[lang].notice;
  const [state, setState] = useState<'hidden' | 'in' | 'out'>('hidden');
  const hovered = useRef(false);

  useEffect(() => {
    const show = setTimeout(() => setState('in'), 900);
    return () => clearTimeout(show);
  }, []);

  useEffect(() => {
    if (state !== 'in') return;
    let left = 10000;
    let last = Date.now();
    const id = setInterval(() => {
      const now = Date.now();
      if (!hovered.current) left -= now - last;
      last = now;
      if (left <= 0) setState('out');
    }, 200);
    return () => clearInterval(id);
  }, [state]);

  if (state === 'hidden') return null;

  return (
    <div
      className={`notice ${state === 'out' ? 'is-out' : ''}`}
      role="status"
      onMouseEnter={() => (hovered.current = true)}
      onMouseLeave={() => (hovered.current = false)}
      onAnimationEnd={() => state === 'out' && setState('hidden')}
    >
      <p>
        {t.before}
        <a href={ANYDESIGN}>{t.link}</a>
        {t.after}
      </p>
      <button type="button" onClick={() => setState('out')} aria-label={t.close}>
        <CloseCircle size={20} />
      </button>
    </div>
  );
}
