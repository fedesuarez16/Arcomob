import Image from 'next/image'
import Link from 'next/link'

const profileParts = [
  {
    title: 'Cuerpo alistonado de madera',
    description: 'El perfil macizo que da la textura y el ritmo característico del revestimiento alistonado.'
  },
  {
    title: 'Canal fresado para el LED',
    description: 'La ranura mecanizada en el propio panel aloja el perfil de aluminio, sin agregar espesor a la pared.'
  },
  {
    title: 'Perfil de aluminio y difusor',
    description: 'El aluminio disipa el calor del LED y el difusor entrega una línea de luz continua, sin puntos visibles.'
  },
  {
    title: 'Luces LED integradas',
    description: 'Iluminación de bajo consumo en temperatura cálida o neutra, con cableado oculto detrás del revestimiento.'
  }
]

export default function ProfileDetailSection() {
  return (
    <section id="perfil-luminico" className="w-full bg-stone-50 py-16 lg:py-24 scroll-mt-20">
      <div className="container mx-auto px-6 lg:px-10 xl:px-16">
        <div className="mb-10 lg:mb-14 max-w-3xl">
          <span className="inline-block text-xs sm:text-sm font-semibold uppercase tracking-widest text-red-600 mb-3">
            Anatomía del producto
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 mb-4 leading-tight">
            El Perfil de un Revestimiento de Madera <span className="text-red-600">Lumínico</span> por Dentro
          </h2>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            Así se ve un corte de nuestros revestimientos varillados con iluminación: la madera, el canal
            fresado, el perfil de aluminio con difusor y las luces LED forman una sola pieza. Se instala
            una vez y resuelve revestimiento e iluminación al mismo tiempo.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          {/* Detailed product image */}
          <div className="w-full lg:w-[58%]">
            <div className="relative w-full aspect-[16/9] bg-white rounded-2xl overflow-hidden shadow-xl border border-stone-200">
              <Image
                src="/media/products/perfil-luminico-corte.jpg"
                alt="Corte en detalle de un revestimiento con iluminación LED integrada: panel alistonado de madera con perfil de aluminio, difusor y luces LED"
                fill
                className="object-contain p-4 lg:p-6"
                sizes="(max-width: 1024px) 100vw, 58vw"
                quality={95}
              />
            </div>
          </div>

          {/* Breakdown */}
          <div className="w-full lg:w-[42%]">
            <ul className="space-y-5 lg:space-y-6">
              {profileParts.map((part, index) => (
                <li key={part.title} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-base lg:text-lg font-semibold text-stone-900 mb-1">
                      {part.title}
                    </h3>
                    <p className="text-sm lg:text-base text-stone-600 leading-relaxed">
                      {part.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link
                href="/productos/revestimientos-luminicos"
                className="inline-flex items-center justify-center px-6 py-3 bg-stone-900 text-white rounded-lg font-semibold hover:bg-stone-800 transition-all duration-300 shadow-lg"
              >
                Ver Catálogo
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/cotizar"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-stone-900 text-stone-900 rounded-lg font-semibold hover:bg-stone-900 hover:text-white transition-all duration-300"
              >
                Solicitar Presupuesto
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
