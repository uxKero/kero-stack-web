import { COPY, REPO, type Lang } from './content';

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3210').replace(/\/$/, '');

export const OG_IMAGE = {
  url: '/og.png',
  width: 1200,
  height: 630,
  alt: 'Kero-stack: seven open skills for AI agents. Agents build. Nothing ships unmeasured.',
};

export const slugify = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export const PRINCIPLE_SLUGS = COPY.en.taste.map((p) => slugify(p.title));

export const home = (lang: Lang) => (lang === 'es' ? '/es' : '/');
export const principlePath = (lang: Lang, index: number) => `${lang === 'es' ? '/es' : ''}/principles/${PRINCIPLE_SLUGS[index]}`;

export const META = {
  en: {
    title: 'Kero-stack: design and product method skills for AI agents',
    description:
      'Seven open skills that make AI agents research, scope, systematize, build, measure, judge blind and orchestrate a product with a person directing. Install with npx skills add uxKero/kero-stack. MIT.',
  },
  es: {
    title: 'Kero-stack: skills de método de diseño y producto para agentes de IA',
    description:
      'Siete skills abiertas para que los agentes de IA investiguen, enlisten, sistematicen, construyan, midan, juzguen a ciegas y orquesten un producto con una persona dirigiendo. Se instalan con npx skills add uxKero/kero-stack. MIT.',
  },
} as const;

export function softwareJsonLd(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: 'Kero-stack',
    description: META[lang].description,
    codeRepository: REPO,
    license: 'https://opensource.org/licenses/MIT',
    inLanguage: lang,
    author: { '@type': 'Person', name: 'uxKero', url: 'https://github.com/uxKero' },
    url: `${SITE_URL}${home(lang)}`,
  };
}
