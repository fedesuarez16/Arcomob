'use client'

import Image from 'next/image'

export default function ComparisonSection() {
  const tradicionalFeatures = [
    'Estética clásica y atemporal',
    'Instalación probada y confiable',
    'Mantenimiento sencillo',
    'Amplia variedad de acabados',
    'Excelente relación calidad-precio',
    'Ideal para proyectos tradicionales',
    'Durabilidad comprobada'
  ]

  const luminicoFeatures = [
    'Sistema LED integrado',
    'Iluminación ambiental integrada',
    'Instalación rápida y sencilla',
    'Producto innovador y único',
    'Eficiencia energética',
    'Control de intensidad opcional',
    'Ideal para proyectos modernos'
  ]

  return (
    <section className="w-full bg-white py-8 lg:py-12">
      <div className="container mx-auto px-6 lg:px-10 xl:px-16">
        {/* Section Title */}
        <div className="mb-6 lg:mb-8 text-center">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-stone-900 mb-2">
            Revestimiento Tradicional vs Luminoso
          </h2>
          <p className="text-xs lg:text-sm text-stone-600 max-w-2xl mx-auto">
            Descubre las ventajas del revestimiento luminoso frente al tradicional
          </p>
        </div>

        {/* Comparison Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-6 lg:mb-8">
          {/* Traditional Image */}
          <div className="relative rounded-lg overflow-hidden shadow-md border border-stone-200">
            <div className="relative h-48 lg:h-64">
              <Image
                src="/media/usecases/tradicional.png"
                alt="Revestimiento Alistonado Tradicional"
                fill
                className="object-cover object-left"
                quality={85}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-4 bg-stone-900/90 backdrop-blur-sm">
              <h3 className="text-white text-sm lg:text-base font-semibold">
                REVESTIMIENTO ALISTONADO TRADICIONAL
              </h3>
            </div>
          </div>

          {/* Luminous Image */}
          <div className="relative rounded-lg overflow-hidden shadow-md border-2 border-stone-900">
            <div className="relative h-48 lg:h-64">
              <Image
                src="/media/usecases/luminico.png"
                alt="Revestimiento Alistonado Luminoso"
                fill
                className="object-cover object-right"
                quality={85}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-4 bg-stone-900 backdrop-blur-sm">
              <h3 className="text-white text-sm lg:text-base font-semibold">
                REVESTIMIENTO ALISTONADO LUMÍNICO
              </h3>
            </div>
          </div>
        </div>

        {/* Features Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {/* Traditional Column */}
          <div className="bg-white rounded-xl shadow-lg border border-stone-200 p-6 lg:p-8">
            <h3 className="text-xl lg:text-2xl font-bold text-stone-900 mb-6 text-center">
              Revestimiento Tradicional
            </h3>
            <ul className="space-y-3">
              {tradicionalFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-stone-200 flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-stone-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm lg:text-base text-stone-700">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Luminous Column */}
          <div className="bg-stone-900 rounded-xl shadow-lg border-2 border-stone-900 p-6 lg:p-8">
            <h3 className="text-xl lg:text-2xl font-bold text-white mb-6 text-center">
              Revestimiento Luminoso
            </h3>
            <ul className="space-y-3">
              {luminicoFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm lg:text-base text-white">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
