import type { Metadata } from 'next';
import { Home } from '../home';
import { softwareJsonLd } from '../site';

export const metadata: Metadata = {
  alternates: { canonical: '/', languages: { en: '/', es: '/es', 'x-default': '/' } },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd('en')) }} />
      <Home lang="en" />
    </>
  );
}
