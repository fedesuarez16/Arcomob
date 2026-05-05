import ServiceCard from './ServiceCard'

const services = [
  {
    image: '/media/hero1.jpg',
    alt: 'Revestimientos Alistonados luminicos',
    title: 'Revestimientos Alistonados Luminicos',
    description: 'Obtén un presupuesto preciso: especifica las dimensiones y características de tu proyecto — te proporcionaremos la mejor solución adaptada a tus necesidades.',
    actions: [
      { label: 'Ver catalogo', href: '/productos/revestimientos-luminicos' },
      { label: 'Solicitar Presupuesto', href: '/cotizar' }
    ]
  },
  {
    image: '/media/products/molduras01.jpeg',
    alt: 'Molduras',
    title: 'Molduras',
    description: 'Completa el diseño de tus espacios con nuestras molduras de alta calidad. Perfectas para dar el toque final y profesional a cualquier proyecto de revestimiento.',
    actions: [
      { label: 'Ver Catálogo', href: '/productos/molduras' },
      { label: 'Solicitar Presupuesto', href: '/cotizar' }
    ]
  },
  {
    image: '/media/products/accesorios.png',
    alt: 'Accesorios',
    title: 'Accesorios',
    description: 'Amplía las posibilidades de diseño con nuestra línea completa de accesorios. Desde esquinas hasta terminaciones, todo lo que necesitas para un proyecto perfecto.',
    actions: [
      { label: 'Ver Catálogo', href: '/productos/accesorios' },
      { label: 'Solicitar Presupuesto', href: '/cotizar' }
    ]
  }
]

export default function ServicesSection() {
  return (
    <section className="w-full bg-white py-12 sm:py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
        <div className="mb-8 sm:mb-10 lg:mb-14 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-stone-800 mb-3 sm:mb-4 leading-tight">
            Soluciones Completas de Revestimientos <span className="text-red-600">Alistonados</span>
          </h2>
          <p className="text-base sm:text-lg text-stone-600">
            Desde el diseño hasta la instalación, ofrecemos servicios integrales para transformar tus espacios
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-3">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              image={service.image}
              alt={service.alt}
              title={service.title}
              description={service.description}
              actions={service.actions}
              priority={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
