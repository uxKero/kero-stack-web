import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ARTICLES } from './articles';
import { COPY, type Lang } from './content';
import { Paper } from './sections';
import { OG_IMAGE, PRINCIPLE_SLUGS, SITE_URL, principlePath } from './site';

export const principleParams = () => PRINCIPLE_SLUGS.map((slug) => ({ slug }));

const find = (slug: string) => PRINCIPLE_SLUGS.indexOf(slug);

export function principleMetadata(lang: Lang, slug: string): Metadata {
  const i = find(slug);
  if (i < 0) return {};
  const card = COPY[lang].taste[i];
  const a = ARTICLES[lang][card.scene];
  const title = `${a?.title ?? card.title} · Kero-stack`;
  const description = a?.lede ?? card.body;
  return {
    title,
    description,
    alternates: { canonical: principlePath(lang, i), languages: { en: principlePath('en', i), es: principlePath('es', i), 'x-default': principlePath('en', i) } },
    openGraph: { title, description, type: 'article', images: [OG_IMAGE] },
  };
}

export function PrinciplePage({ lang, slug }: { lang: Lang; slug: string }) {
  const i = find(slug);
  if (i < 0) notFound();
  const card = COPY[lang].taste[i];
  const a = ARTICLES[lang][card.scene];
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: a?.title ?? card.title,
    description: a?.lede ?? card.body,
    inLanguage: lang,
    url: `${SITE_URL}${principlePath(lang, i)}`,
    author: { '@type': 'Person', name: 'uxKero', url: 'https://github.com/uxKero' },
    isPartOf: { '@type': 'SoftwareSourceCode', name: 'Kero-stack', codeRepository: 'https://github.com/uxKero/kero-stack' },
    citation: (a?.sources ?? []).map((s) => ({ '@type': 'CreativeWork', name: s.label, url: s.href, author: s.by, datePublished: String(s.year) })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <Paper lang={lang} index={i} standalone />
    </>
  );
}
