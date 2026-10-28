import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { productSeo } from '@/data/productSeo'
import ProductPageClient from './ProductPageClient'

type Props = { params: { slug: string } }

export function generateStaticParams() {
  return Object.keys(productSeo).map((slug) => ({ slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const seo = productSeo[params.slug]
  if (!seo) return {}

  const path = `/productos/${params.slug}`
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: 'es_AR',
      url: path,
      siteName: 'ArcoMob',
      title: seo.title,
      description: seo.description,
      images: [{ url: seo.image }],
    },
  }
}

export default function ProductPage({ params }: Props) {
  if (!productSeo[params.slug]) notFound()
  return <ProductPageClient />
}
