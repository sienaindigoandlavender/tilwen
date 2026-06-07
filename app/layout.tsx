import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'

const GA_ID = 'G-RSJ2F7NVQ3'

export const metadata: Metadata = {
  title: { default: 'Tilwen', template: '%s — Tilwen' },
  description: 'Tilwen — a shoppable ethnographic gallery for Moroccan and Amazigh rugs. Each piece is one of a kind.',
  openGraph: { siteName: 'Tilwen', type: 'website' },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.svg', type: 'image/svg+xml' },
    ],
  },
  themeColor: '#f9f9f7',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body>
        <Nav />
        <main style={{ paddingTop: '56px' }}>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
