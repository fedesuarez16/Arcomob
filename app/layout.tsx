import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import Script from 'next/script'
import './globals.css'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Revestimientos Alistonados - Transforma tus Espacios',
  description: 'Revestimientos alistonados de diseño moderno, instalación rápida y terminaciones premium para hogares y comercios.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}
        <Footer />
        <WhatsAppButton />
      </body>
      <GoogleAnalytics gaId="G-CDCQWD09GZ" />
      <Script id="google-ads" strategy="afterInteractive">
        {`gtag('config', 'AW-803060047');`}
      </Script>
    </html>
  )
}
