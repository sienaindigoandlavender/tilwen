import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: { default: 'House of Weaves', template: '%s — House of Weaves' },
  description: 'A shoppable ethnographic gallery for Moroccan and Amazigh rugs. Each piece is one of a kind.',
  openGraph: { siteName: 'House of Weaves', type: 'website' },
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
