import type { MetadataRoute } from 'next'
import { blogPosts } from '@/data/blog'
import { productSeo } from '@/data/productSeo'

const SITE_URL = 'https://www.arcomob.com'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/productos/revestimientos-alistonados`, changeFrequency: 'monthly', priority: 0.9 },
    ...Object.keys(productSeo).map((slug) => ({
      url: `${SITE_URL}/productos/${slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    { url: `${SITE_URL}/cotizar`, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${SITE_URL}/blog`, changeFrequency: 'weekly', priority: 0.6 },
    ...blogPosts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
  ]
}
