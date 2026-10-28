import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { blogPosts, getBlogPost } from '@/data/blog'
import BlogPostClient from './BlogPostClient'

type Props = { params: { slug: string } }

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getBlogPost(params.slug)
  if (!post) return {}

  const path = `/blog/${post.slug}`
  return {
    title: `${post.title} | ArcoMob`,
    description: post.excerpt,
    alternates: { canonical: path },
    openGraph: {
      type: 'article',
      locale: 'es_AR',
      url: path,
      siteName: 'ArcoMob',
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image }],
    },
  }
}

export default function BlogPostPage({ params }: Props) {
  if (!getBlogPost(params.slug)) notFound()
  return <BlogPostClient />
}
