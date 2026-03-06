import Image from 'next/image'
import Link from 'next/link'

const blogPosts = [
  {
    id: 1,
    image: '/media/usecases/living.png',
    title: 'Cómo Instalar un Revestimiento Luminoso de Forma Sencilla',
    excerpt: 'Guía paso a paso para instalar revestimientos luminosos en tu hogar o negocio. Aprende los secretos de una instalación profesional y sin complicaciones.',
    category: 'Instalación',
    readTime: '5 min lectura',
    date: '15 Ene 2024'
  },
  {
    id: 2,
    image: '/media/usecases/dormitorio.png',
    title: 'Ventajas de los Revestimientos Alistonados vs Otras Opciones',
    excerpt: 'Descubre por qué los revestimientos alistonados son la mejor opción para transformar tus espacios. Comparativa detallada con otras alternativas del mercado.',
    category: 'Comparativa',
    readTime: '7 min lectura',
    date: '10 Ene 2024'
  },
  {
    id: 3,
    image: '/media/usecases/Gemini_Generated_Image_5w8nql5w8nql5w8n.png',
    title: 'Cómo Elegir el Revestimiento Perfecto para tu Espacio',
    excerpt: 'Consejos profesionales para seleccionar el revestimiento ideal según el tipo de ambiente, estilo decorativo y necesidades específicas de tu proyecto.',
    category: 'Guía',
    readTime: '6 min lectura',
    date: '5 Ene 2024'
  }
]

export default function BlogSection() {
  return (
    <section className="w-full bg-white py-16 lg:py-24">
      <div className="container mx-auto px-6 lg:px-10 xl:px-16">
        {/* Section Title */}
        <div className="mb-12 lg:mb-16 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Blog y Guías
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Aprende sobre instalación, mantenimiento y las últimas tendencias en revestimientos
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Image */}
              <Link href={`/blog/${post.id}`} className="block relative h-64 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  quality={90}
                />
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-stone-900 px-3 py-1 rounded-full text-xs font-semibold">
                    {post.category}
                  </span>
                </div>
              </Link>

              {/* Content */}
              <div className="p-6 lg:p-8">
                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>

                {/* Title */}
                <Link href={`/blog/${post.id}`}>
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 group-hover:text-stone-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                </Link>

                {/* Excerpt */}
                <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Read More Link */}
                <Link
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center text-stone-900 font-semibold hover:text-stone-600 transition-colors group/link"
                >
                  Leer más
                  <svg
                    className="ml-2 w-5 h-5 transform group-hover/link:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center px-8 py-4 bg-stone-900 text-white rounded-lg font-semibold hover:bg-stone-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Ver Todos los Artículos
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
        </div>
      </div>
    </section>
  )
}
