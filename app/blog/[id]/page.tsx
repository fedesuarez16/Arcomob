'use client'

import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getBlogPost } from '@/data/blog'

export default function BlogPostPage() {
  const params = useParams()
  const id = params.id as string
  const post = getBlogPost(id)

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-stone-900 mb-4">Artículo no encontrado</h1>
          <Link href="/" className="text-red-600 hover:text-red-700">
            Volver al inicio
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-stone-800 border-b border-stone-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 lg:px-10 xl:px-16">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center group">
              <Image
                src="/media/logo.png"
                alt="ArcoMob Logo"
                width={180}
                height={60}
                className="h-auto w-auto max-w-[150px] sm:max-w-[180px] lg:max-w-[200px]"
                priority
              />
            </Link>

            <div className="hidden md:flex md:items-center md:space-x-8">
              <Link href="/#beneficios" className="text-white hover:text-stone-300 transition-colors duration-200 text-[13px] font-normal tracking-wide">
                Beneficios
              </Link>
              <Link href="/#aplicaciones" className="text-white hover:text-stone-300 transition-colors duration-200 text-[13px] font-normal tracking-wide">
                Aplicaciones
              </Link>
              <Link href="/#proyectos" className="text-white hover:text-stone-300 transition-colors duration-200 text-[13px] font-normal tracking-wide">
                Proyectos
              </Link>
              <Link href="/#contacto" className="text-white hover:text-stone-300 transition-colors duration-200 text-[13px] font-normal tracking-wide">
                Contacto
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative w-full h-[400px] lg:h-[500px]">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
          <div className="container mx-auto px-6 lg:px-10 xl:px-16">
            <div className="mb-4">
              <span className="bg-white/90 backdrop-blur-sm text-stone-900 px-4 py-2 rounded-full text-sm font-semibold">
                {post.category}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-6 text-white/80 text-sm">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="py-12 lg:py-16">
        <div className="container mx-auto px-6 lg:px-10 xl:px-16">
          <div className="max-w-4xl mx-auto">
            <div 
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </article>

      {/* CTA Section */}
      <section className="bg-stone-900 py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-10 xl:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              ¿Listo para Transformar tu Espacio?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Descubre cómo nuestros revestimientos pueden transformar tu proyecto. Solicita una cotización gratuita y recibe asesoramiento profesional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/cotizar"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-stone-900 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Solicitar Presupuesto
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/#proyectos"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-stone-900 transition-all duration-300"
              >
                Ver Proyectos
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
