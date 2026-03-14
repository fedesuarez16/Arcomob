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

export default function BlogPage() {
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

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-stone-900 to-stone-800 py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-10 xl:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Blog y Guías
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
              Aprende sobre instalación, mantenimiento y las últimas tendencias en revestimientos alistonados
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-10 xl:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 block"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
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
                </div>

                {/* Content */}
                <div className="p-6 lg:p-8">
                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 group-hover:text-stone-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Read More Link */}
                  <div className="inline-flex items-center text-stone-900 font-semibold group-hover:text-stone-600 transition-colors">
                    Leer más
                    <svg
                      className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

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
