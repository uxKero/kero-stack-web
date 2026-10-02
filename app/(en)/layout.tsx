import type { Metadata, Viewport } from 'next';
import { fontClass } from '../fonts';
import { META, OG_IMAGE, SITE_URL } from '../site';
import '../globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: META.en.title,
  description: META.en.description,
  openGraph: { title: META.en.title, description: META.en.description, siteName: 'Kero-stack', type: 'website', locale: 'en_US', images: [OG_IMAGE] },
  twitter: { card: 'summary_large_image', creator: '@uxKero', images: [OG_IMAGE] },
};

export const viewport: Viewport = {
  themeColor: '#F2F1ED',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontClass}>
      <body>{children}</body>
    </html>
  );
}
