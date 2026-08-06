'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from './Header'
import StatisticsCard from './StatisticsCard'

const backgroundImages = [
  '/media/hero/6.jpg',
  '/media/hero/1.jpg',
  '/media/hero/2.jpg',
  '/media/hero/3.jpg',
  '/media/hero/4.jpg',
  
]

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length)
    }, 4000) // Cambiar cada 3 segundos

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative w-full h-[100vh] sm:h-[110vh] pt-0 overflow-hidden rounded-b-[30px] sm:rounded-b-[50px]">
      {/* Background Images - Carousel */}
      <div className="absolute inset-0 z-0 rounded-b-xl">
        {backgroundImages.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out rounded-b-xl ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={src}
              alt={`Background ${index + 1}`}
              fill
              className="object-cover rounded-b-xl"
              priority={index === 0}
              quality={90}
            />
          </div>
        ))}
        {/* Gradient overlay - from right (transparent) to left (black) */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-800 via-stone-800/20 to-stone-800/0/0 rounded-b-xl"></div>
      </div>
      
      {/* Header positioned over background */}
      <div className="relative z-20">
        <Header />
      </div>
      
      <div className="relative z-10 h-full flex flex-col">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 flex-1 flex flex-col justify-center pb-16 sm:pb-20 lg:pb-24">
          <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6 lg:gap-8 xl:gap-12">
            
            {/* Left side - Content */}
            <div className="flex-1 lg:max-w-[58%] space-y-3 sm:space-y-4 lg:space-y-5">
              {/* Headline */}
              <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-[3rem] xl:text-[3.4rem] font-bold text-white leading-[1.4] sm:leading-[1.35] lg:leading-[1] transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                Revestimientos de Madera que Transforman{' '}
                <span className="text-red-600">Espacios</span>
              </h1>
              
              {/* Description */}
              <p className={`text-sm sm:text-base lg:text-lg text-gray-200 max-w-xl leading-relaxed transition-all duration-1000 ease-out delay-150 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                Revestimientos alistonados y revestimientos con iluminación LED integrada.
                Diseño moderno, instalación rápida y terminaciones premium para hogares y comercios.
              </p>
              
              {/* CTA Button */}
              <div className={`pt-1 sm:pt-2 transition-all duration-1000 ease-out delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <Link
                  href="/cotizar"
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 rounded-full text-xs sm:text-sm lg:text-base font-medium hover:bg-white/20 transition-all duration-300 shadow-lg"
                >
                  Solicitar Presupuesto
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
              
              {/* Statistics Cards */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4 pt-3 sm:pt-4 lg:pt-6 items-stretch">
                <div className={`transition-all duration-1000 ease-out delay-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}>
                  <StatisticsCard
                    icon={
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    }
                    number=""
                    label="Revestimientos Lumínicos"
                    description="Paneles con LED integrado para transformar tus espacios"
                  />
                </div>
                <div className={`transition-all duration-1000 ease-out delay-600 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}>
                  <StatisticsCard
                    icon={
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                    }
                    number=""
                    label="Molduras"
                    description="Terminaciones perfectas para cada proyecto y para cada necesidad"
                  />
                </div>
                <div className={`transition-all duration-1000 ease-out delay-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}>
                  <Link
                    href="#perfil-luminico"
                    className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-lg lg:rounded-xl p-2 lg:p-3 shadow-lg h-full flex flex-col min-h-[100px] sm:min-h-[120px] lg:min-h-[140px] hover:bg-white/20 transition-all duration-300"
                  >
                    <div className="relative flex-1 w-full rounded-md lg:rounded-lg overflow-hidden bg-white">
                      <Image
                        src="/media/products/perfil-luminico-corte.jpg"
                        alt="Corte en detalle de un revestimiento lumínico con LED integrado"
                        fill
                        className="object-contain p-1 transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 1024px) 33vw, 200px"
                        quality={85}
                      />
                    </div>
                    <div className="flex items-center justify-between gap-1 mt-2 flex-shrink-0">
                      <span className="text-[10px] sm:text-xs lg:text-sm text-gray-200 leading-tight font-semibold">
                        Ver el perfil en detalle
                      </span>
                      <svg
                        className="w-3 h-3 lg:w-4 lg:h-4 text-white flex-shrink-0 transform group-hover:translate-y-0.5 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right side - Hero Image */}
            


          </div>
        </div>
      </div>

    </section>
  )
}
