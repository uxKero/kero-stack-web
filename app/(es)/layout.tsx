import type { Metadata, Viewport } from 'next';
import { fontClass } from '../fonts';
import { META, OG_IMAGE, SITE_URL } from '../site';
import '../globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: META.es.title,
  description: META.es.description,
  openGraph: { title: META.es.title, description: META.es.description, siteName: 'Kero-stack', type: 'website', locale: 'es_ES', images: [OG_IMAGE] },
  twitter: { card: 'summary_large_image', creator: '@uxKero', images: [OG_IMAGE] },
};

export const viewport: Viewport = {
  themeColor: '#F2F1ED',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={fontClass}>
      <body>{children}</body>
    </html>
  );
}
