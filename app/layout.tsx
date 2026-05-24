import type { Metadata } from 'next'
import { Cormorant_Garamond } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Bookmax — Max out your listing.',
  description:
    'Premium booking optimisation for independent hotels, B&Bs and agriturismi across Europe. Better photos, stronger descriptions, more bookings — in 72 hours.',
  icons: {
    icon: '/favicon.jpeg',
    apple: '/favicon.jpeg',
    shortcut: '/favicon.jpeg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable}`}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>{children}</body>
    </html>
  )
}
