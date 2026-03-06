'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from './Header'
import StatisticsCard from './StatisticsCard'

const backgroundImages = [
  '/media/usecases/living.png',
  '/media/Gemini_Generated_Image_j84f1cj84f1cj84f.png',
  '/media/Gemini_Generated_Image_azoikfazoikfazoi.png',
  '/media/Gemini_Generated_Image_58de8j58de8j58de.png'
]

const rotatingWords = ['Espacios', 'Comercios', 'Trabajos', 'Hogares']

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isWordChanging, setIsWordChanging] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length)
    }, 4000) // Cambiar cada 3 segundos

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setIsWordChanging(true)
      setTimeout(() => {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % rotatingWords.length)
        setTimeout(() => {
          setIsWordChanging(false)
        }, 50) // Pequeño delay para que la nueva palabra aparezca desde arriba
      }, 250) // Duración de la animación de salida
    }, 4000) // Cambiar cada 4 segundos

    return () => clearInterval(wordInterval)
  }, [])

  return (
    <section className="relative w-full h-[110vh] pt-0 overflow-hidden  rounded-b-[50px]">
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
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900 via-stone-900/70 to-stone-900/10 rounded-b-xl"></div>
      </div>
      
      {/* Header positioned over background */}
      <div className="relative z-20">
        <Header />
      </div>
      
      <div className="relative z-10 h-full flex flex-col">
        <div className="container mx-auto px-6 lg:px-10 xl:px-16 flex-1 flex flex-col justify-center pb-24">
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8 xl:gap-12">
            
            {/* Left side - Content */}
            <div className="flex-1 lg:max-w-[58%] space-y-4 lg:space-y-5">
              {/* Headline */}
              <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-[3rem] xl:text-[3.4rem] font-bold text-white leading-[1.1] transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                Revestimientos que Transforman{' '}
                <span className="inline-block relative h-[1.2em] overflow-hidden align-top">
                  <span 
                    className={`inline-block text-red-600 transition-all duration-500 ease-in-out ${
                      isWordChanging 
                        ? 'opacity-0 translate-y-full' 
                        : 'opacity-100 translate-y-0'
                    }`}
                    key={currentWordIndex}
                    style={!isWordChanging ? { animation: 'slideInDown 0.5s ease-out' } : {}}
                  >
                    {rotatingWords[currentWordIndex]}
                  </span>
                </span>
              </h1>
              
              {/* Description */}
              <p className={`text-base sm:text-lg lg:text-lg text-gray-200 max-w-xl leading-relaxed transition-all duration-1000 ease-out delay-150 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                Diseño moderno, instalación rápida y terminaciones premium. 
                La combinación perfecta de forma y función para hogares y comercios.
              </p>
              
              {/* CTA Button */}
              <div className={`pt-2 transition-all duration-1000 ease-out delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <Link
                  href="/cotizar"
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 lg:px-8 lg:py-4 rounded-full text-sm lg:text-base font-medium hover:bg-white/20 transition-all duration-300 shadow-lg"
                >
                  Solicitar Presupuesto
                  <svg
                    className="w-4 h-4 lg:w-5 lg:h-5"
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
              <div className="grid grid-cols-3 gap-3 lg:gap-4 pt-4 lg:pt-6">
                <div className={`transition-all duration-1000 ease-out delay-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}>
                  <StatisticsCard
                    icon={
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    }
                    number=""
                    label="Revestimientos"
                    description="Paneles de alta calidad para transformar tus espacios"
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
                  <StatisticsCard
                    icon={
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    }
                    number="30+"
                    label="Más de 30 años de experiencia"
                    description=""
                  />
                </div>
              </div>
            </div>

            {/* Right side - Hero Image */}
            


          </div>
        </div>
      </div>

      {/* Logos Section - Bottom */}
      <div className={`absolute bottom-10 left-0 right-0 z-20 transition-all duration-1000 ease-out delay-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <div className="w-full ">
          <div className="container mx-auto px-6 lg:px-10 xl:px-16 py-6 lg:py-2">
            <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12 xl:gap-16">
              <div className="text-gray-300 text-xl font-semibold opacity-70 hover:opacity-100 transition-opacity duration-300">
                CNBC
              </div>
              <div className="text-gray-300 text-lg font-medium opacity-70 hover:opacity-100 transition-opacity duration-300">
                officernd
              </div>
              <div className="text-gray-300 text-xl font-semibold opacity-70 hover:opacity-100 transition-opacity duration-300">
                ARCONIC
              </div>
              <div className="text-gray-300 text-xl font-semibold opacity-70 hover:opacity-100 transition-opacity duration-300">
                CNBC
              </div>
              <div className="text-gray-300 text-lg font-medium opacity-70 hover:opacity-100 transition-opacity duration-300">
                officernd
              </div>
              <div className="text-gray-300 text-xl font-semibold opacity-70 hover:opacity-100 transition-opacity duration-300">
                ARCONIC
              </div>
              <div className="text-gray-300 text-xl font-semibold opacity-70 hover:opacity-100 transition-opacity duration-300">
                CNBC
              </div>
              <div className="text-gray-300 text-lg font-medium opacity-70 hover:opacity-100 transition-opacity duration-300">
                officernd
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
