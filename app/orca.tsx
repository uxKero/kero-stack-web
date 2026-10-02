import { ExportSquare } from 'iconsax-reactjs';
import { COPY, type Lang } from './content';
import { MARKS } from './marks';

export function Orca({ lang }: { lang: Lang }) {
  const t = COPY[lang].orca;
  const mark = MARKS.orca;

  return (
    <section className="orca" id="orca" aria-labelledby="orca-title">
      <div className="orca-head">
        <div className="orca-name">
          <svg viewBox={mark.viewBox} width={44} height={28} aria-hidden="true">
            <path d={mark.d} fill="currentColor" />
          </svg>
          <h2 id="orca-title">{t.title}</h2>
        </div>
        <div className="orca-copy">
          {t.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <div className="orca-links">
            <a className="orca-get" href="https://onorca.dev">
              {t.open}
              <ExportSquare size={16} />
            </a>
            <a className="orca-by" href="https://github.com/stablyai/orca">
              {t.by}
            </a>
          </div>
        </div>
      </div>
      <figure className="orca-shot">
        <img src="/orca.jpg" width={1998} height={1250} alt={t.alt} loading="lazy" decoding="async" />
      </figure>
    </section>
  );
}
