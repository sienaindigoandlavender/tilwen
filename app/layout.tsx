import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import { organisationJsonLd, websiteJsonLd, DEFAULT_DESCRIPTION } from '@/lib/seo'
import { CartProvider } from '@/lib/cart-context'

const GA_ID = 'G-RSJ2F7NVQ3'
const BASE = 'https://www.tilwen.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: 'Tilwen — The magic is woven in',
    template: '%s — Tilwen',
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    'Moroccan rugs', 'Amazigh rugs', 'Berber rugs', 'vintage Moroccan rugs',
    'kilim', 'Beni Ourain', 'Azilal rug', 'Zanafi', 'flatweave Morocco',
    'buy Moroccan rug', 'ethnographic gallery rugs', 'Amazigh textiles',
    'handmade Moroccan carpet', 'natural dye rug', 'vintage kilim',
  ],
  authors: [{ name: 'Tilwen', url: BASE }],
  creator: 'Tilwen',
  publisher: 'Tilwen',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: BASE,
    siteName: 'Tilwen',
    title: 'Tilwen — The magic is woven in',
    description: DEFAULT_DESCRIPTION,
    images: [{ url: `${BASE}/og-default.jpg`, width: 1200, height: 630, alt: 'Tilwen — The magic is woven in' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tilwen — The magic is woven in',
    description: DEFAULT_DESCRIPTION,
    images: [`${BASE}/og-default.jpg`],
  },
  alternates: { canonical: BASE },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/apple-touch-icon.svg', type: 'image/svg+xml' }],
  },
  themeColor: '#f9f9f7',
  verification: {
    // google: 'add-verification-token-here',
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* JSON-LD: Organisation + Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {/* Google Analytics */}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="ga-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { page_path: window.location.pathname });
        `}</Script>
      </head>
      <body>
        <CartProvider>
          <Nav />
          <main style={{ paddingTop: '84px' }}>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
