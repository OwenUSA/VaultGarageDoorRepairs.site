import type { Metadata } from 'next';
import { Roboto_Condensed, Rubik } from 'next/font/google';
import './globals.css';
import { SkipLink, JsonLd } from '@/components/ui';
import { SiteHeader, SiteFooter } from '@/components/patterns';
import { site } from '@/lib/site';
import { localBusinessSchema, websiteSchema } from '@/lib/schema';

/**
 * Fonts: both families are OFL 1.1 and both are on Google Fonts, confirmed by
 * the Prompt 2 license check — so next/font/google reproduces the target
 * exactly and no substitution is needed.
 *   --font: "Roboto Condensed"  headings, nav, buttons, UI, default
 *   --paragraph-font: "Rubik"   body copy
 * Weights are the measured set: RC 400/500/600/700, Rubik 400/500/600/700.
 */
const robotoCondensed = Roboto_Condensed({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-roboto-condensed',
  display: 'swap',
});

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-rubik',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Garage Door Repair, Installation & Maintenance`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: site.name,
    description: site.description,
    url: site.url,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${robotoCondensed.variable} ${rubik.variable}`}>
      <body>
        <SkipLink />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <JsonLd data={localBusinessSchema()} />
        <JsonLd data={websiteSchema()} />
      </body>
    </html>
  );
}
