import type { Metadata } from 'next';
import './globals.css';
import { getSettings } from '@/lib/content';

const s = getSettings();

export const metadata: Metadata = {
  metadataBase: new URL(s.site_url),
  title: { default: 'Visudha Sathurappan | Product designer', template: '%s | Visudha Sathurappan' },
  icons: { icon: '/favicon.png', apple: '/apple-touch-icon.png' },
  openGraph: { type: 'website', siteName: 'Visudha Sathurappan' },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap"
        />
      </head>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
