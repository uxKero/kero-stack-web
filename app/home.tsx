'use client';

import { useEffect, useRef, useState } from 'react';
import { Copy, CopySuccess, InfoCircle, Translate } from 'iconsax-reactjs';
import { COPY, INSTALL, REPO, type Lang } from './content';
import { Run } from './run';
import { Deck } from './deck';
import { ScrollRail } from './scrollrail';
import { ContextMenu } from './contextmenu';
import { Band, Footer, HeroStage, Setup, SharedField, Taste } from './sections';
import { Orca } from './orca';
import { Wordmark } from './wordmark';

const AGENTS = [
  ['Claude Code', '~/.claude/skills/', '.claude/skills/'],
  ['Codex', '~/.agents/skills/', '.agents/skills/'],
  ['Cursor', '~/.cursor/skills/', '.cursor/skills/'],
  ['Grok', '~/.grok/skills/', '.grok/skills/'],
];

function Install({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: PointerEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === 'Escape' : !box.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', close);
    document.addEventListener('keydown', close);
    return () => {
      document.removeEventListener('pointerdown', close);
      document.removeEventListener('keydown', close);
    };
  }, [open]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(INSTALL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  return (
    <div className="install" ref={box}>
      <button type="button" className="command" onClick={copy} aria-label={copied ? t.hero.copied : t.hero.copy}>
        <span className="command-prompt" aria-hidden="true">$</span>
        <code>{INSTALL}</code>
        {copied ? <CopySuccess size={20} /> : <Copy size={20} />}
      </button>
      <button type="button" className="round" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label={t.hero.where}>
        <InfoCircle size={20} />
      </button>
      {open && (
        <div className="popover" role="dialog" aria-label={t.hero.where}>
          <table>
            <thead>
              <tr>
                <th>{t.agents.agent}</th>
                <th>{t.agents.personal}</th>
                <th>{t.agents.project}</th>
              </tr>
            </thead>
            <tbody>
              {AGENTS.map(([a, p, l]) => (
                <tr key={a}>
                  <td>{a}</td>
                  <td><code>{p}</code></td>
                  <td><code>{l}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>{t.agents.note}</p>
        </div>
      )}
    </div>
  );
}

export function Home({ lang }: { lang: Lang }) {
  const t = COPY[lang];

  const toggleLang = () => {
    window.location.href = lang === 'en' ? '/es' : '/';
  };

  return (
    <div className="page">
      <header className="bar">
        <p className="brand">
          <Wordmark />
        </p>
        <nav className="bar-nav">
          <a href={REPO} className="pill">{t.hero.github}</a>
          <button type="button" className="pill" onClick={toggleLang} aria-label={t.langSwitch}>
            <Translate size={18} />
            {lang === 'en' ? 'ES' : 'EN'}
          </button>
        </nav>
      </header>

      <main>
        <section className="hero" id="top" aria-labelledby="hero-title">
          <HeroStage />
          <Deck lang={lang} active="" />
          <h1 id="hero-title" className="hero-claim">
            {t.hero.before} <mark>{t.hero.mark}</mark>
          </h1>
          <div className="hero-install">
            <Install lang={lang} />
          </div>
        </section>

        <Band lang={lang} />

        <section className="method" id="method" aria-labelledby="method-title">
          <Run lang={lang} title={t.sections.run} />
        </section>

        <Orca lang={lang} />

        <Taste lang={lang} />
      </main>

      <div className="tail">
        <SharedField />
        <Setup lang={lang} />
        <Footer lang={lang} />
      </div>
      <ScrollRail top={t.rail.top} bottom={t.rail.bottom} />
      <ContextMenu lang={lang} onLang={toggleLang} />
    </div>
  );
}
