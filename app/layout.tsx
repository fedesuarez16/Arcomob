import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  // Base para resolver canonicals y URLs de Open Graph relativas.
  metadataBase: new URL('https://www.arcomob.com'),
  title: 'Revestimientos de Madera Alistonados y Lumínicos - Transforma tus Espacios',
  description: 'Revestimientos alistonados de madera y revestimientos con iluminación LED integrada: diseño moderno, instalación rápida y terminaciones premium para hogares y comercios.',
  keywords: [
    'revestimientos lumínicos',
    'revestimientos luminicos',
    'revestimientos con iluminación',
    'revestimientos con iluminacion',
    'revestimientos con luces LED',
    'revestimientos varillados con iluminación',
    'revestimientos varillados con iluminacion',
    'revestimientos varillados',
    'revestimientos con LED integrado',
    'revestimientos iluminados',
    'paneles de madera con luz LED',
    'revestimientos alistonados',
    'paneles alistonados de madera',
    'revestimientos de madera',
    'molduras',
  ],
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ArcoMob',
  url: 'https://www.arcomob.com',
  logo: 'https://www.arcomob.com/media/logo.png',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+54-9-11-6036-7871',
    contactType: 'sales',
    areaServed: 'AR',
    availableLanguage: 'es',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
        <Footer />
        <WhatsAppButton />
        <Analytics />
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=AW-803060047"
        />
        <Script id="gtag-config" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CDCQWD09GZ');
            gtag('config', 'AW-803060047');
          `}
        </Script>
      </body>
    </html>
  )
}
