import type { MetadataRoute } from 'next';
import { PRINCIPLE_SLUGS, SITE_URL, principlePath } from './site';

export default function sitemap(): MetadataRoute.Sitemap {
  const pair = (en: string, es: string): MetadataRoute.Sitemap =>
    [en, es].map((path) => ({ url: `${SITE_URL}${path}`, alternates: { languages: { en: `${SITE_URL}${en}`, es: `${SITE_URL}${es}` } } }));
  return [...pair('/', '/es'), ...PRINCIPLE_SLUGS.flatMap((_, i) => pair(principlePath('en', i), principlePath('es', i)))];
}
