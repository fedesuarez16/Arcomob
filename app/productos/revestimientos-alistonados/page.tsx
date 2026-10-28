import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

const SITE_URL = 'https://www.arcomob.com'
const PAGE_PATH = '/productos/revestimientos-alistonados'
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`
// Catálogo completo de maderas: hoy vive en la página de revestimientos lumínicos.
const CATALOGO_HREF = '/productos/revestimientos-luminicos'

export const metadata: Metadata = {
  title: 'Revestimiento Alistonado de Madera para Paredes | ArcoMob',
  description:
    'Revestimiento alistonado de madera para paredes interiores y exteriores: pino, eucalipto, cedro, enchapados naturales y MDF. Con o sin LED integrado. Pedí tu presupuesto.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: PAGE_URL,
    siteName: 'ArcoMob',
    title: 'Revestimiento Alistonado de Madera para Paredes | ArcoMob',
    description:
      'Paneles alistonados de madera maciza, enchapada y MDF para interiores y exteriores. Con o sin iluminación LED integrada.',
    images: [{ url: `${SITE_URL}/media/revestimientos/itaubaliving.jpg` }],
  },
}

const materiales = [
  {
    nombre: 'Macizos',
    detalle: 'Pino y eucalipto. Madera maciza con veta marcada y textura natural.',
    imagen: '/media/revestimientos/macizos/pino.jpg',
    alt: 'Revestimiento alistonado de pino macizo',
  },
  {
    nombre: 'Enchapados de madera natural',
    detalle: 'Paraíso, guayubira, roble americano, guatambú, itaúba y freijó.',
    imagen: '/media/revestimientos/paraiso.jpg',
    alt: 'Revestimiento alistonado enchapado en madera de paraíso',
  },
  {
    nombre: 'Especiales',
    detalle: 'Cancharana, cedro, kiri y cambará para proyectos con carácter.',
    imagen: '/media/revestimientos/especiales.jpg',
    alt: 'Revestimiento alistonado de maderas especiales',
  },
  {
    nombre: 'Particulados',
    detalle: 'MDF crudo para pintar y OSB. La opción más versátil en terminaciones.',
    imagen: '/media/revestimientos/mdfcrudo.jpg',
    alt: 'Revestimiento alistonado de MDF crudo para pintar',
  },
  {
    nombre: 'Para exterior',
    detalle: 'Pino impregnado, preparado para fachadas, galerías y quinchos.',
    imagen: '/media/revestimientos/exteriores.jpg',
    alt: 'Revestimiento alistonado de pino impregnado para exterior',
  },
]

const usos = [
  'Paredes de living y respaldos de TV',
  'Respaldos de cama en dormitorios',
  'Recepciones y oficinas',
  'Locales comerciales y gastronómicos',
  'Cielorrasos y techos',
  'Fachadas, galerías y quinchos',
]

const faqs = [
  {
    pregunta: '¿Qué es un revestimiento alistonado?',
    respuesta:
      'Es un revestimiento de pared formado por listones de madera dispuestos en paralelo, con una separación que genera ritmo y profundidad. También se lo conoce como revestimiento varillado o panel ranurado. Aporta calidez, textura y mejora la acústica del ambiente.',
  },
  {
    pregunta: '¿En qué maderas está disponible?',
    respuesta:
      'Trabajamos maderas macizas (pino y eucalipto), enchapados de madera natural (paraíso, guayubira, roble americano, guatambú, itaúba y freijó), maderas especiales (cancharana, cedro, kiri y cambará), particulados (MDF crudo y OSB) y pino impregnado para exterior.',
  },
  {
    pregunta: '¿Se puede usar en exteriores?',
    respuesta:
      'Sí. Para exterior recomendamos pino impregnado, tratado para resistir la humedad y la intemperie. Es ideal para fachadas, galerías y quinchos.',
  },
  {
    pregunta: '¿Cuál es la diferencia entre alistonado y lumínico?',
    respuesta:
      'El revestimiento alistonado tradicional es solo madera. El lumínico suma un canal fresado en el propio panel con perfil de aluminio, difusor y luces LED integradas, para iluminar y decorar en una sola instalación.',
  },
  {
    pregunta: '¿Cómo pido un presupuesto?',
    respuesta:
      'Completá el formulario de cotización con las medidas de la pared, el material que te interesa y si lo querés con o sin LED. También podés escribirnos por WhatsApp y te respondemos con una propuesta a medida.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Revestimientos alistonados', item: PAGE_URL },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.pregunta,
        acceptedAnswer: { '@type': 'Answer', text: faq.respuesta },
      })),
    },
  ],
}

export default function RevestimientosAlistonadosPage() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
              <Link href={CATALOGO_HREF} className="text-white hover:text-stone-300 transition-colors duration-200 text-[13px] font-normal tracking-wide">
                Catálogo
              </Link>
              <Link href="/blog" className="text-white hover:text-stone-300 transition-colors duration-200 text-[13px] font-normal tracking-wide">
                Blog
              </Link>
              <Link href="/#contacto" className="text-white hover:text-stone-300 transition-colors duration-200 text-[13px] font-normal tracking-wide">
                Contacto
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative w-full h-[60vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/media/revestimientos/itaubaliving.jpg"
            alt="Living con revestimiento alistonado de madera en la pared"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
        </div>
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-6 lg:px-10 xl:px-16">
            <div className="max-w-3xl">
              <nav aria-label="Migas de pan" className="text-sm text-gray-300 mb-4">
                <Link href="/" className="hover:text-white">Inicio</Link>
                <span className="mx-2">/</span>
                <span className="text-white">Revestimientos alistonados</span>
              </nav>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Revestimiento Alistonado de Madera
              </h1>
              <p className="text-lg lg:text-xl text-gray-200 mb-8 leading-relaxed">
                Paneles alistonados para paredes interiores y exteriores, en madera maciza, enchapados
                naturales y MDF. Con o sin iluminación LED integrada, a la medida de tu proyecto.
              </p>
              <Link
                href="/cotizar"
                className="inline-flex items-center gap-2 bg-white text-stone-900 px-8 py-4 rounded-full text-base lg:text-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Solicitar Presupuesto
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Qué es */}
      <section className="w-full py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-10 xl:px-16">
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-6">
                ¿Qué es un revestimiento alistonado?
              </h2>
              <p className="text-stone-600 leading-relaxed mb-4">
                El revestimiento alistonado es un sistema de listones de madera colocados en paralelo sobre
                la pared, con una separación entre cada uno que genera ritmo, sombra y profundidad. También
                se lo conoce como revestimiento varillado o panel ranurado.
              </p>
              <p className="text-stone-600 leading-relaxed">
                Es una de las formas más simples de darle calidez y diseño a un ambiente: transforma una
                pared lisa en un punto focal, disimula imperfecciones y mejora la acústica del espacio.
              </p>
            </div>
            <div className="relative h-72 lg:h-96 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/media/usecases/tradicional.jpg"
                alt="Detalle de revestimiento alistonado de madera tradicional"
                fill
                className="object-cover"
                quality={85}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Materiales */}
      <section className="w-full py-16 lg:py-24 bg-stone-50">
        <div className="container mx-auto px-6 lg:px-10 xl:px-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 mb-4 text-center">
              Revestimientos alistonados por material
            </h2>
            <p className="text-stone-600 text-center max-w-2xl mx-auto mb-12">
              Elegí la madera según el ambiente, el presupuesto y la terminación que buscás.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {materiales.map((material) => (
                <div key={material.nombre} className="bg-white rounded-xl overflow-hidden shadow-md border border-stone-200">
                  <div className="relative h-56">
                    <Image src={material.imagen} alt={material.alt} fill className="object-cover" quality={80} />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-stone-900 mb-2">{material.nombre}</h3>
                    <p className="text-sm text-stone-600">{material.detalle}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href={CATALOGO_HREF} className="text-red-600 hover:text-red-700 font-semibold">
                Ver el catálogo completo de maderas →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Usos */}
      <section className="w-full py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-10 xl:px-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-8 text-center">
              ¿Dónde usar un revestimiento alistonado?
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {usos.map((uso) => (
                <li key={uso} className="flex items-center gap-3 bg-stone-50 rounded-lg p-4 border border-stone-200">
                  <span className="w-2 h-2 rounded-full bg-red-600 flex-shrink-0"></span>
                  <span className="text-stone-700">{uso}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Con LED */}
      <section className="w-full py-16 lg:py-24 bg-stone-900">
        <div className="container mx-auto px-6 lg:px-10 xl:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Revestimiento alistonado con iluminación LED
            </h2>
            <p className="text-gray-300 leading-relaxed mb-8">
              ¿Querés ir un paso más allá? Nuestros revestimientos lumínicos integran el LED en un canal
              fresado del propio panel, con perfil de aluminio y difusor: luz continua, sin cables a la vista
              y sin agregar espesor a la pared.
            </p>
            <Link
              href="/productos/revestimientos-luminicos"
              className="inline-flex items-center gap-2 bg-white text-stone-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300"
            >
              Ver revestimientos lumínicos
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-10 xl:px-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-10 text-center">
              Preguntas frecuentes sobre revestimientos alistonados
            </h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details key={faq.pregunta} className="group bg-stone-50 rounded-lg border border-stone-200 p-5">
                  <summary className="cursor-pointer font-semibold text-stone-900 list-none flex justify-between items-center">
                    <h3>{faq.pregunta}</h3>
                    <span className="text-red-600 group-open:rotate-45 transition-transform text-xl">+</span>
                  </summary>
                  <p className="mt-3 text-stone-600 leading-relaxed">{faq.respuesta}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-16 lg:py-24 bg-stone-50">
        <div className="container mx-auto px-6 lg:px-10 xl:px-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-4">
            Cotizá tu revestimiento alistonado
          </h2>
          <p className="text-stone-600 max-w-xl mx-auto mb-8">
            Contanos las medidas de tu pared y el material que te gusta. Te armamos una propuesta a medida.
          </p>
          <Link
            href="/cotizar"
            className="inline-flex items-center gap-2 bg-stone-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-stone-800 transition-all duration-300"
          >
            Solicitar Presupuesto
          </Link>
        </div>
      </section>
    </div>
  )
}
