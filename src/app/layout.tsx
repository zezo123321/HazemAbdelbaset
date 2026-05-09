import type { Metadata } from 'next';
import { Cairo, Poppins } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import '@/vibe/index.css';
import { SITE } from '@/lib/constants';
import PopupRenderer from '@/components/PopupRenderer';
import { Analytics } from '@vercel/analytics/react';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
  adjustFontFallback: false,
});

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-cairo',
  display: 'swap',
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: 'Hazem Abdelbaset - Brand-led Visual Designer',
  description: 'Hazem Abdelbaset builds visual systems that make brands look clear, consistent, and valuable every time they show up.',
  keywords: [
    'Hazem Abdelbaset',
    'Brand-led visual designer',
    'Visual systems',
    'Brand identity direction',
    'Arabic-first design',
    'مصمم بصري',
    'نظام بصري',
  ],
  authors: [{ name: 'Hazem Abdelbaset' }],
  openGraph: {
    type: 'website',
    url: SITE.url,
    title: 'Hazem Abdelbaset - Brand-led Visual Designer',
    description: 'Hazem Abdelbaset builds visual systems that make brands look clear, consistent, and valuable every time they show up.',
    images: [{ url: '/images/og-preview.png', width: 1200, height: 630, alt: 'Hazem Abdelbaset' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hazem Abdelbaset - Brand-led Visual Designer',
    description: 'Hazem Abdelbaset builds visual systems that make brands look clear, consistent, and valuable every time they show up.',
    images: ['/images/og-preview.png'],
  },
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${cairo.variable}`}>
      <body suppressHydrationWarning>
        <Script
          id="json-ld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Hazem Abdelbaset',
              url: SITE.url,
              image: `${SITE.url}/images/og-preview.png`,
              jobTitle: 'Brand-led Visual Designer',
              description: 'Hazem Abdelbaset builds visual systems that make brands look clear, consistent, and valuable every time they show up.',
              knowsAbout: [
                'Brand Identity',
                'Visual Systems',
                'Editorial Design',
                'Social Media Presence',
                'Creative Direction',
                'Brand Strategy',
              ],
              sameAs: [],
            }),
          }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-X6PE0BH0QF"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-X6PE0BH0QF');
          `}
        </Script>
        {children}
        <PopupRenderer />
        <Analytics />
      </body>
    </html>
  );
}
