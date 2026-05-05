import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'

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
      </body>
    </html>
  )
}
