import { IBM_Plex_Mono, Instrument_Sans, Newsreader } from 'next/font/google';

const sans = Instrument_Sans({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-sans' });
const serif = Newsreader({ subsets: ['latin'], weight: ['400', '500'], style: ['normal', 'italic'], variable: '--font-serif' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

export const fontClass = `${sans.variable} ${serif.variable} ${mono.variable}`;
