'use client'

import { useEffect, useRef, useState } from 'react'
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
  },
  {
    image: '/media/products/molduras.png',
    alt: 'Molduras Luminosas',
    title: 'Molduras Luminosas',
    description: 'Ilumina tus espacios con estilo. Nuestras molduras luminosas combinan diseño moderno con tecnología LED para crear ambientes únicos y sofisticados.',
    actions: [
      { label: 'Ver Catálogo', href: '/productos/molduras-luminosas' },
      { label: 'Solicitar Presupuesto', href: '/cotizar' }
    ]
  }
]

export default function ServicesSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const scrollSpeed = 1 // pixels per frame
  const scrollInterval = 16 // ~60fps

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    let animationFrameId: number
    let lastTimestamp = 0

    const autoScroll = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp
      const delta = timestamp - lastTimestamp

      if (!isPaused && delta >= scrollInterval) {
        const scrollWidth = scrollContainer.scrollWidth
        const clientWidth = scrollContainer.clientWidth
        const maxScroll = scrollWidth - clientWidth
        
        // Si llegamos al final de las cards duplicadas, resetear instantáneamente al inicio
        if (scrollContainer.scrollLeft >= maxScroll - 1) {
          scrollContainer.scrollLeft = 0
        } else {
          scrollContainer.scrollLeft += scrollSpeed
        }
        
        lastTimestamp = timestamp
      }

      animationFrameId = requestAnimationFrame(autoScroll)
    }

    animationFrameId = requestAnimationFrame(autoScroll)

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [isPaused])

  return (
    <section className="w-full bg-white py-12 sm:py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
        {/* Section Title */}
        <div className="mb-6 sm:mb-8 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-stone-800 mb-3 sm:mb-4">
            Soluciones Completas de Revestimientos <span className="text-red-600 block sm:inline">Alistonados</span> 
          </h2>
          <p className="text-base sm:text-lg text-stone-700 max-w-3xl">
            Desde el diseño hasta la instalación, ofrecemos servicios integrales para transformar tus espacios
          </p>
        </div>

        {/* Services Cards - Horizontal Scroll */}
        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left fade gradient */}
          <div className="absolute left-0 top-0 bottom-4 w-6 sm:w-4 bg-gradient-to-r from-white via-white to-transparent z-10 pointer-events-none"></div>
          
          {/* Right fade gradient */}
          <div className="absolute right-0 top-0 bottom-4 w-6 sm:w-4 bg-gradient-to-l from-white via-white to-transparent z-10 pointer-events-none"></div>
          
          {/* Scrollable container */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-3 sm:gap-4 px-2 sm:px-4 overflow-x-auto pb-4 scrollbar-hide"
            style={{ scrollBehavior: 'auto' }}
          >
            {/* Original cards */}
            {services.map((service, index) => (
              <ServiceCard
                key={`original-${index}`}
                image={service.image}
                alt={service.alt}
                title={service.title}
                description={service.description}
                actions={service.actions}
              />
            ))}
            {/* Duplicated cards for infinite scroll */}
            {services.map((service, index) => (
              <ServiceCard
                key={`duplicate-${index}`}
                image={service.image}
                alt={service.alt}
                title={service.title}
                description={service.description}
                actions={service.actions}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
