import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: { default: 'Tilwen', template: '%s — Tilwen' },
  description: 'Tilwen — a shoppable ethnographic gallery for Moroccan and Amazigh rugs. Each piece is one of a kind.',
  openGraph: { siteName: 'Tilwen', type: 'website' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main style={{ paddingTop: '56px' }}>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
