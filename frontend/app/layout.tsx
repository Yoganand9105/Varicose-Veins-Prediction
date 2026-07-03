import type { Metadata, Viewport } from 'next'
import { Inter, DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const _dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" })

export const metadata: Metadata = {
  title: 'VeinScan AI - Varicose Vein Detection',
  description: 'AI-powered varicose vein detection system. Upload a leg image and get instant AI-powered analysis for varicose veins with confidence scoring.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#4A7BF7',
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${_inter.variable} ${_dmSans.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
