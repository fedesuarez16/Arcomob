'use client'

import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const blogPosts = {
  1: {
    id: 1,
    image: '/media/usecases/living.png',
    title: 'Cómo Instalar un Revestimiento Luminoso de Forma Sencilla',
    excerpt: 'Guía paso a paso para instalar revestimientos luminosos en tu hogar o negocio. Aprende los secretos de una instalación profesional y sin complicaciones.',
    category: 'Instalación',
    readTime: '5 min lectura',
    date: '15 Ene 2024',
    content: `
      <h2>Introducción</h2>
      <p>Los revestimientos luminosos han revolucionado la forma en que decoramos nuestros espacios. No solo aportan estética moderna, sino que también proporcionan iluminación ambiental integrada. En esta guía completa, te enseñaremos cómo instalar un revestimiento luminoso de forma sencilla y profesional.</p>

      <h2>Preparación del Material</h2>
      <p>Antes de comenzar la instalación, es fundamental tener todos los materiales necesarios:</p>
      <ul>
        <li>Paneles de revestimiento luminoso</li>
        <li>Sistema LED integrado</li>
        <li>Herramientas de medición (nivel, cinta métrica)</li>
        <li>Pegamento especializado o sistema de fijación</li>
        <li>Cableado eléctrico apropiado</li>
        <li>Herramientas básicas (taladro, destornilladores)</li>
      </ul>

      <h2>Paso 1: Medición y Planificación</h2>
      <p>El primer paso es medir cuidadosamente el área donde instalarás el revestimiento. Marca las líneas de referencia usando un nivel para asegurar que todo quede perfectamente alineado. Considera la ubicación de los puntos de conexión eléctrica.</p>

      <h2>Paso 2: Preparación de la Superficie</h2>
      <p>La superficie debe estar limpia, seca y lisa. Si es necesario, aplica una capa de imprimación para mejorar la adherencia. Asegúrate de que la superficie esté libre de humedad y polvo.</p>

      <h2>Paso 3: Instalación de los Paneles</h2>
      <p>Comienza desde una esquina y ve colocando los paneles uno por uno. Utiliza el sistema de fijación recomendado por el fabricante. Verifica constantemente con el nivel que cada panel esté correctamente alineado.</p>

      <h2>Paso 4: Conexión del Sistema LED</h2>
      <p>Una vez instalados los paneles, procede a conectar el sistema LED. Sigue las instrucciones del fabricante para las conexiones eléctricas. Es recomendable contar con un electricista certificado para esta parte si no tienes experiencia.</p>

      <h2>Paso 5: Pruebas Finales</h2>
      <p>Antes de dar por terminada la instalación, prueba el sistema de iluminación. Verifica que todas las conexiones funcionen correctamente y que la iluminación sea uniforme en toda la superficie.</p>

      <h2>Consejos Profesionales</h2>
      <ul>
        <li>Siempre sigue las instrucciones del fabricante</li>
        <li>No escatimes en materiales de calidad</li>
        <li>Si tienes dudas, consulta con un profesional</li>
        <li>Realiza mantenimiento periódico para prolongar la vida útil</li>
      </ul>

      <h2>Conclusión</h2>
      <p>Instalar un revestimiento luminoso puede parecer complicado al principio, pero con la preparación adecuada y siguiendo estos pasos, podrás lograr resultados profesionales. Recuerda que la paciencia y la atención al detalle son clave para una instalación exitosa.</p>
    `
  },
  2: {
    id: 2,
    image: '/media/usecases/dormitorio.png',
    title: 'Ventajas de los Revestimientos Alistonados vs Otras Opciones',
    excerpt: 'Descubre por qué los revestimientos alistonados son la mejor opción para transformar tus espacios. Comparativa detallada con otras alternativas del mercado.',
    category: 'Comparativa',
    readTime: '7 min lectura',
    date: '10 Ene 2024',
    content: `
      <h2>Introducción</h2>
      <p>Cuando se trata de revestir paredes, existen múltiples opciones en el mercado. Los revestimientos alistonados han ganado popularidad por sus características únicas. En este artículo, compararemos los revestimientos alistonados con otras alternativas comunes.</p>

      <h2>Revestimientos Alistonados vs Pintura Tradicional</h2>
      <p>Los revestimientos alistonados ofrecen una estética premium que la pintura tradicional simplemente no puede igualar. Mientras que la pintura requiere múltiples capas y mantenimiento constante, los revestimientos alistonados proporcionan una solución más duradera y visualmente impactante.</p>
      <ul>
        <li><strong>Durabilidad:</strong> Los revestimientos alistonados son más resistentes al desgaste</li>
        <li><strong>Estética:</strong> Textura y profundidad visual superior</li>
        <li><strong>Mantenimiento:</strong> Requieren menos mantenimiento que la pintura</li>
        <li><strong>Instalación:</strong> Proceso más rápido y limpio</li>
      </ul>

      <h2>Revestimientos Alistonados vs Cerámica</h2>
      <p>Comparado con la cerámica tradicional, los revestimientos alistonados ofrecen ventajas significativas en términos de instalación y flexibilidad de diseño.</p>
      <ul>
        <li><strong>Peso:</strong> Más ligeros que la cerámica</li>
        <li><strong>Instalación:</strong> Proceso más rápido y menos complejo</li>
        <li><strong>Diseño:</strong> Mayor variedad de acabados y texturas</li>
        <li><strong>Versatilidad:</strong> Se adaptan mejor a diferentes superficies</li>
      </ul>

      <h2>Revestimientos Alistonados vs Papel Tapiz</h2>
      <p>El papel tapiz puede ser una opción económica, pero los revestimientos alistonados ofrecen beneficios a largo plazo que justifican la inversión.</p>
      <ul>
        <li><strong>Resistencia:</strong> Más resistentes a la humedad y al desgaste</li>
        <li><strong>Limpieza:</strong> Más fáciles de limpiar y mantener</li>
        <li><strong>Durabilidad:</strong> Vida útil significativamente mayor</li>
        <li><strong>Valor:</strong> Aumentan el valor de la propiedad</li>
      </ul>

      <h2>Ventajas Únicas de los Revestimientos Alistonados</h2>
      <h3>Versión Luminosa</h3>
      <p>Los revestimientos alistonados luminosos representan la innovación en su máxima expresión. Integran sistemas LED que proporcionan iluminación ambiental, creando atmósferas únicas y modernas.</p>

      <h3>Instalación Rápida</h3>
      <p>Uno de los mayores beneficios es la velocidad de instalación. Mientras que otras opciones pueden tomar días o semanas, los revestimientos alistonados se instalan en horas.</p>

      <h3>Amplia Variedad</h3>
      <p>Desde acabados tradicionales hasta opciones luminosas modernas, existe un revestimiento alistonado para cada estilo y necesidad.</p>

      <h2>Consideraciones de Costo</h2>
      <p>Si bien el costo inicial puede ser mayor que algunas alternativas, los revestimientos alistonados ofrecen mejor relación costo-beneficio a largo plazo debido a su durabilidad y bajo mantenimiento.</p>

      <h2>Conclusión</h2>
      <p>Los revestimientos alistonados representan la mejor opción cuando buscas calidad, durabilidad y estética superior. Ya sea que elijas la versión tradicional o luminosa, estarás invirtiendo en una solución que transformará tus espacios y perdurará en el tiempo.</p>
    `
  },
  3: {
    id: 3,
    image: '/media/usecases/Gemini_Generated_Image_5w8nql5w8nql5w8n.png',
    title: 'Cómo Elegir el Revestimiento Perfecto para tu Espacio',
    excerpt: 'Consejos profesionales para seleccionar el revestimiento ideal según el tipo de ambiente, estilo decorativo y necesidades específicas de tu proyecto.',
    category: 'Guía',
    readTime: '6 min lectura',
    date: '5 Ene 2024',
    content: `
      <h2>Introducción</h2>
      <p>Elegir el revestimiento adecuado para tu espacio puede ser una decisión abrumadora. Con tantas opciones disponibles, es importante considerar varios factores para tomar la mejor decisión. Esta guía te ayudará a seleccionar el revestimiento perfecto para tu proyecto.</p>

      <h2>Factores Clave a Considerar</h2>
      
      <h3>1. Tipo de Ambiente</h3>
      <p>El tipo de espacio donde instalarás el revestimiento es fundamental:</p>
      <ul>
        <li><strong>Residencial:</strong> Busca opciones que combinen estética y funcionalidad</li>
        <li><strong>Comercial:</strong> Prioriza durabilidad y mantenimiento fácil</li>
        <li><strong>Oficinas:</strong> Considera opciones que mejoren el ambiente laboral</li>
        <li><strong>Hotelería:</strong> Enfócate en crear experiencias memorables</li>
      </ul>

      <h3>2. Estilo Decorativo</h3>
      <p>El revestimiento debe complementar el estilo general de tu espacio:</p>
      <ul>
        <li><strong>Moderno:</strong> Revestimientos luminosos con líneas limpias</li>
        <li><strong>Tradicional:</strong> Revestimientos alistonados clásicos</li>
        <li><strong>Industrial:</strong> Texturas y acabados rústicos</li>
        <li><strong>Minimalista:</strong> Superficies lisas y colores neutros</li>
      </ul>

      <h3>3. Condiciones del Ambiente</h3>
      <p>Considera las condiciones específicas del espacio:</p>
      <ul>
        <li><strong>Humedad:</strong> Algunos espacios requieren materiales resistentes a la humedad</li>
        <li><strong>Tráfico:</strong> Áreas de alto tráfico necesitan materiales más resistentes</li>
        <li><strong>Iluminación:</strong> Evalúa si necesitas iluminación integrada</li>
        <li><strong>Temperatura:</strong> Considera el aislamiento térmico si es necesario</li>
      </ul>

      <h2>Tipos de Revestimientos Disponibles</h2>
      
      <h3>Revestimientos Tradicionales</h3>
      <p>Ideal para proyectos que buscan una estética clásica y probada. Perfectos para espacios residenciales y comerciales tradicionales.</p>

      <h3>Revestimientos Luminosos</h3>
      <p>La opción más innovadora, perfecta para crear ambientes modernos y únicos. Ideal para espacios comerciales, oficinas y áreas de entretenimiento.</p>

      <h3>Molduras</h3>
      <p>Perfectas para terminaciones y detalles decorativos. Disponibles en versiones tradicionales y luminosas.</p>

      <h2>Guía de Selección por Espacio</h2>
      
      <h3>Salas de Estar</h3>
      <p>Para salas de estar, considera revestimientos que creen calidez y comodidad. Los revestimientos luminosos pueden añadir un toque moderno, mientras que los tradicionales ofrecen elegancia atemporal.</p>

      <h3>Dormitorios</h3>
      <p>En dormitorios, busca opciones que promuevan la relajación. Los revestimientos con iluminación suave pueden crear ambientes acogedores.</p>

      <h3>Oficinas</h3>
      <p>Para oficinas, prioriza opciones que mejoren la productividad y el bienestar. Los revestimientos luminosos pueden ayudar a crear ambientes más agradables y profesionales.</p>

      <h3>Locales Comerciales</h3>
      <p>En espacios comerciales, el impacto visual es crucial. Los revestimientos luminosos pueden ayudar a destacar productos y crear experiencias de compra memorables.</p>

      <h2>Consideraciones de Presupuesto</h2>
      <p>El presupuesto es un factor importante, pero recuerda considerar el valor a largo plazo:</p>
      <ul>
        <li>Costo inicial vs costo a largo plazo</li>
        <li>Mantenimiento requerido</li>
        <li>Durabilidad del material</li>
        <li>Valor agregado a la propiedad</li>
      </ul>

      <h2>Consejos Finales</h2>
      <ul>
        <li>Solicita muestras antes de decidir</li>
        <li>Consulta con profesionales</li>
        <li>Considera la iluminación del espacio</li>
        <li>Piensa en el futuro y la versatilidad</li>
        <li>No escatimes en calidad</li>
      </ul>

      <h2>Conclusión</h2>
      <p>Elegir el revestimiento perfecto requiere considerar múltiples factores. Tómate tu tiempo para evaluar tus necesidades específicas y consulta con profesionales si es necesario. Con la elección correcta, transformarás tu espacio en algo verdaderamente especial.</p>
    `
  }
}

export default function BlogPostPage() {
  const params = useParams()
  const id = params.id as string
  const post = blogPosts[parseInt(id) as keyof typeof blogPosts]

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-stone-900 mb-4">Artículo no encontrado</h1>
          <Link href="/" className="text-red-600 hover:text-red-700">
            Volver al inicio
          </Link>
        </div>
      </div>
    )
  }

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

      {/* Hero Image */}
      <div className="relative w-full h-[400px] lg:h-[500px]">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
          <div className="container mx-auto px-6 lg:px-10 xl:px-16">
            <div className="mb-4">
              <span className="bg-white/90 backdrop-blur-sm text-stone-900 px-4 py-2 rounded-full text-sm font-semibold">
                {post.category}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-6 text-white/80 text-sm">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="py-12 lg:py-16">
        <div className="container mx-auto px-6 lg:px-10 xl:px-16">
          <div className="max-w-4xl mx-auto">
            <div 
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </article>

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
