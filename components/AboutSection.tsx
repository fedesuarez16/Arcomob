'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'

const statistics = [
  {
    number: 30,
    suffix: '+',
    description: 'Años de Excelencia en Revestimientos'
  },
  {
    number: 500,
    suffix: '+',
    description: 'Proyectos Completados Exitosamente'
  },
  {
    number: 98,
    suffix: '%',
    description: 'Tasa de Retención de Clientes'
  },
  {
    number: 15,
    suffix: '+',
    description: 'Países con Nuestros Proyectos'
  }
]

function CountUp({ end, suffix, duration = 2000, isRed = false }: { end: number, suffix: string, duration?: number, isRed?: boolean }) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            animateCount()
          }
        })
      },
      { threshold: 0.5 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [hasAnimated])

  const animateCount = () => {
    const startTime = Date.now()
    const startValue = 0

    const updateCount = () => {
      const now = Date.now()
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const currentValue = Math.floor(startValue + (end - startValue) * easeOut)
      
      setCount(currentValue)

      if (progress < 1) {
        requestAnimationFrame(updateCount)
      } else {
        setCount(end)
      }
    }

    requestAnimationFrame(updateCount)
  }

  return (
    <div ref={elementRef} className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-2 ${isRed ? 'text-red-600' : 'text-gray-900'}`}>
      {count}{suffix}
    </div>
  )
}

export default function AboutSection() {
  return (
    <section className="w-full bg-white py-16 lg:mb-32 lg:py-24">
      <div className="container mx-auto px-6 lg:px-10 xl:px-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          
          {/* Left Section - About Company */}
          <div className="flex-1 lg:max-w-[50%]">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Sobre la Empresa
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              En ArcoMob, creemos que los revestimientos alistonados son más que solo paneles; 
              se trata de crear ambientes que mejoran la experiencia humana. Transformamos espacios 
              con diseño moderno, calidad superior y atención al detalle.
            </p>
            
            {/* Partner Logos */}
            <div className="flex flex-wrap items-center gap-6 lg:gap-8">
              <div className="text-gray-400 text-xl font-semibold opacity-60">
                CNBC
              </div>
              <div className="text-gray-400 text-lg font-medium opacity-60">
                officernd
              </div>
              <div className="text-gray-400 text-xl font-semibold opacity-60">
                ARCONIC
              </div>
              <div className="text-gray-400 text-xl font-semibold opacity-60">
                CNBC
              </div>
              <div className="text-gray-400 text-lg font-medium opacity-60">
                officernd
              </div>
             
            </div>
          </div>

          {/* Right Section - Statistics */}
          <div className="flex-1 lg:max-w-[50%]">
            <div className="grid grid-cols-2 gap-6 lg:gap-8">
              {statistics.map((stat, index) => (
                <div key={index}>
                  <CountUp 
                    end={stat.number} 
                    suffix={stat.suffix}
                    isRed={index % 2 === 0} // Alterna: primera y tercera son rojas (índices 0 y 2)
                  />
                  <div className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {stat.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
