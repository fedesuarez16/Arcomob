'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

/** Orden de subcategorías en el catálogo de molduras (sin duplicar Cornisas / Cuadros) */
const moldurasCategoriasOrden = [
  'Zócalos',
  'Contramarcos',
  'Rinconeros',
  'Terminaciones',
  'Cuadros',
  'Accesorios',
  'Cornisas',
  'Listones',
  'Antepecho',
  'Tapacantos',
  'Esquineros',
  'Balustres',
  'Zocalín'
] as const

const moldurasCatalogPreviewSrc = '/media/products/molduras01.jpeg'

const moldurasSubcategorias: Record<string, string[]> = {
  Zócalos: ['Zócalos'],
  Contramarcos: ['Contra vidrio'],
  Rinconeros: ['Rinconeros'],
  Terminaciones: ['Terminaciones', 'Guardasillas', 'Tapa juntas'],
  Cuadros: [],
  Accesorios: ['Barral Liso', 'Pasamanos', 'Barral Estriado'],
  Cornisas: ['Cornisas'],
  Listones: ['Listones'],
  Antepecho: ['Antepecho'],
  Tapacantos: ['Tapacintas', 'Tapa Cantos'],
  Esquineros: [],
  Balustres: ['Balaustres torneados'],
  Zocalín: ['Zocalín']
}

type RevestimientoItem = {
  /** Nombre base del producto (sin “ - perfil”) */
  name: string
  /** Vista perfil / detalle (visible por defecto) */
  imagenPerfil: string
  /** Vista material / producto (visible al pasar el cursor) */
  imagenProducto: string
  /** Texto breve bajo el título (opcional) */
  description?: string
}

const revestimientosSubcategorias: Record<string, RevestimientoItem[]> = {
  'Enchapados de Madera Natural': [

    {
      name: '',
      imagenPerfil: '/media/revestimientos/enchapado.png',
      imagenProducto: '/media/revestimientos/enchapado.png'
    },
    {
      name: '',
      imagenPerfil: '/media/revestimientos/enchapado1.jpeg',
      imagenProducto: '/media/revestimientos/enchapado1.jpeg'
    }, {
      name: '',
      imagenPerfil: '/media/revestimientos/enchapado2.jpeg',
      imagenProducto: '/media/revestimientos/enchapado2.jpeg'
    }, 
  ],
  'Revestimientos Especiales': [
    {
      name: 'Paraíso',
      imagenPerfil: '/media/revestimientos/especiales.png',
      imagenProducto: '/media/revestimientos/especiales.png'
    },
    {
      name: 'Cedro',
      imagenPerfil: '/media/revestimientos/CEDRO.png',
      imagenProducto: '/media/revestimientos/CEDRO.png'
    },
    {
      name: 'Kiri',
      imagenPerfil: '/media/revestimientos/KIRI.png',
      imagenProducto: '/media/revestimientos/KIRI.png'
    },
    
    
  ],
  'Particulados': [
    {
      name: 'Particulados MDF',
      imagenPerfil: '/media/revestimientos/MDFCRUDOPINTADO.JPEG',
      imagenProducto: '/media/revestimientos/MDFCRUDOPINTADO.JPEG',
    }, 
    {
      name: 'Crudo MDF',
      imagenPerfil: '/media/revestimientos/mdfcrudo.png',
      imagenProducto: '/media/revestimientos/mdfcrudo.png',
    }, 
    {
      name: 'OSB',
      imagenPerfil: '/media/revestimientos/osb.jpeg',
      imagenProducto: '/media/revestimientos/particuladoosb.png',
    }, 

  ],
 
  'Revestimiento para Exterior': [
    {
      name: 'pino impregnado para exteriores',
      imagenPerfil: '/media/revestimientos/pinoimpregnadoexterior.png',
      imagenProducto: '/media/revestimientos/exteriores.png'
    }
  ]
}

const accesoriosProducts = [
  'Zocalín',
  'Inglete',
  'Rosetones'
]

const moldurasLuminosasProducts = [
  'Molum | Garganta Led',
  'Molum | Zócalo Led',
  'Molum | Nariz de escalón Led'
]

const products = {
  'revestimientos-luminicos': {
    title: 'Revestimientos Alistonados Luminicos',
    description: 'Transforma tus espacios con nuestros revestimientos alistonados luminosos. Combina la elegancia de la madera con la tecnología LED integrada para crear ambientes únicos y sofisticados.',
    image: '/media/hero1.jpg',
    features: [
      'Sistema LED integrado de alta eficiencia',
      'Instalación rápida y sencilla',
      'Múltiples acabados disponibles',
      'Diseño moderno y versátil',
      'Ideal para interiores y exteriores',
      'Control de intensidad y color opcional'
    ],
    applications: [
      'Living rooms y áreas de estar',
      'Dormitorios principales',
      'Oficinas corporativas',
      'Locales comerciales',
      'Hoteles y restaurantes',
      'Espacios de retail'
    ],
    gallery: [
      '/media/usecases/living.png',
      '/media/usecases/Gemini_Generated_Image_ib9to0ib9to0ib9t.png',
      '/media/usecases/dormitorio.png'
    ]
  },
  'molduras': {
    title: 'Molduras',
    description: 'Completa el diseño de tus espacios con nuestras molduras de alta calidad. Perfectas para dar el toque final y profesional a cualquier proyecto de revestimiento.',
    image: '/media/products/molduras01.jpeg',
    features: [
      'Diseño elegante y minimalista',
      'Fácil instalación',
      'Múltiples perfiles disponibles',
      'Materiales de primera calidad',
      'Acabados personalizables',
      'Durabilidad excepcional'
    ],
    applications: [
      'Terminaciones de revestimientos',
      'Separadores de ambientes',
      'Detalles arquitectónicos',
      'Proyectos residenciales',
      'Espacios comerciales',
      'Renovaciones y remodelaciones'
    ],
    gallery: [
      '/media/usecases/living.png',
      '/media/usecases/Gemini_Generated_Image_5w8nql5w8nql5w8n.png'
    ]
  },
  'accesorios': {
    title: 'Accesorios',
    description: 'Amplía las posibilidades de diseño con nuestra línea completa de accesorios. Desde esquinas hasta terminaciones, todo lo que necesitas para un proyecto perfecto.',
    image: '/media/products/accesorios.png',
    features: [
      'Esquinas y conectores',
      'Terminaciones profesionales',
      'Sistema de fijación oculto',
      'Compatibilidad total',
      'Instalación simplificada',
      'Acabados coordinados'
    ],
    applications: [
      'Esquinas internas y externas',
      'Terminaciones de bordes',
      'Transiciones entre materiales',
      'Detalles arquitectónicos',
      'Proyectos personalizados',
      'Soluciones a medida'
    ],
    gallery: [
      '/media/usecases/Gemini_Generated_Image_vzst4vzst4vzst4v.png'
    ]
  },
  'molduras-luminosas': {
    title: 'Molduras Luminosas',
    description: 'Ilumina tus espacios con estilo. Nuestras molduras luminosas combinan diseño moderno con tecnología LED para crear ambientes únicos y sofisticados.',
    image: '/media/products/molduras.png',
    features: [
      'Iluminación LED integrada',
      'Sistema eléctrico incluido',
      'Control de intensidad',
      'Eficiencia energética',
      'Diseño innovador',
      'Fácil mantenimiento'
    ],
    applications: [
      'Iluminación decorativa',
      'Separadores luminosos',
      'Detalles arquitectónicos',
      'Ambientes modernos',
      'Espacios comerciales',
      'Proyectos de diseño'
    ],
    gallery: [
      '/media/usecases/compariso.png',
      '/media/usecases/Gemini_Generated_Image_vyx0ikvyx0ikvyx0.png'
    ]
  }
}

export default function ProductPage() {
  const params = useParams()
  const slug = params.slug as string
  const product = products[slug as keyof typeof products]
  const revestimientosCategorias = Object.keys(revestimientosSubcategorias)
  const [selectedRevestimientoCategoria, setSelectedRevestimientoCategoria] = useState<string | null>(null)
  const [selectedMoldurasCategoria, setSelectedMoldurasCategoria] = useState<string | null>(null)

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-stone-900 mb-4">Producto no encontrado</h1>
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
              <Link
                href="/#beneficios"
                className="text-white hover:text-stone-900 transition-colors duration-200 text-[13px] font-normal tracking-wide"
              >
                Beneficios
              </Link>
              <Link
                href="/#aplicaciones"
                className="text-white hover:text-stone-900 transition-colors duration-200 text-[13px] font-normal tracking-wide"
              >
                Aplicaciones
              </Link>
              <Link
                href="/#proyectos"
                className="text-white hover:text-stone-900 transition-colors duration-200 text-[13px] font-normal tracking-wide"
              >
                Proyectos
              </Link>
              <Link
                href="/#contacto"
                className="text-white hover:text-stone-900 transition-colors duration-200 text-[13px] font-normal tracking-wide"
              >
                Contacto
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={product.image}
            alt={product.title}
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
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {product.title}
              </h1>
              <p className="text-lg lg:text-xl text-gray-200 mb-8 leading-relaxed">
                {product.description}
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

      
      {/* Catalog Section - Molduras */}
      {slug === 'molduras' && (
        <section className="w-full py-16 lg:py-24 bg-stone-50">
          <div className="container mx-auto px-6 lg:px-10 xl:px-16">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 mb-4 text-center">
                Catálogo de Productos
              </h2>
              <p className="text-center text-stone-600 mb-12 text-lg">
                Explora nuestra amplia gama de molduras y terminaciones
              </p>
              {selectedMoldurasCategoria && (
                <div className="mb-6 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setSelectedMoldurasCategoria(null)}
                    className="inline-flex items-center gap-2 bg-white border border-stone-300 text-stone-700 px-5 py-2.5 rounded-full text-sm font-medium hover:bg-stone-100 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Volver a subcategorías
                  </button>
                </div>
              )}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                {!selectedMoldurasCategoria &&
                  moldurasCategoriasOrden.map((categoria) => (
                    <button
                      type="button"
                      key={categoria}
                      onClick={() => setSelectedMoldurasCategoria(categoria)}
                      className="group bg-white rounded-md overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-stone-200 hover:border-stone-300 text-left w-full"
                    >
                      <div className="relative w-[100%] max-w-full mx-auto aspect-square overflow-hidden bg-stone-100">
                        <Image
                          src={moldurasCatalogPreviewSrc}
                          alt={categoria}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          quality={85}
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-sm lg:text-base font-semibold text-stone-900 text-center group-hover:text-red-600 transition-colors duration-300 leading-snug">
                          {categoria}
                        </h3>
                      </div>
                    </button>
                  ))}

                {selectedMoldurasCategoria &&
                  moldurasSubcategorias[selectedMoldurasCategoria]?.map((productName, index) => (
                    <div
                      key={`${productName}-${index}`}
                      className="group bg-white rounded-md overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-stone-200 hover:border-stone-300"
                    >
                      <div className="relative w-[85%] max-w-full mx-auto aspect-square bg-gradient-to-br from-stone-100 to-stone-200 flex items-center justify-center overflow-hidden">
                        <div className="w-full h-full flex items-center justify-center bg-stone-100 group-hover:bg-stone-200 transition-colors duration-300">
                          <svg
                            className="w-16 h-16 text-stone-400 group-hover:text-stone-500 transition-colors duration-300"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                          <svg
                            className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-sm lg:text-base font-semibold text-stone-900 text-center group-hover:text-red-600 transition-colors duration-300">
                          {productName}
                        </h3>
                      </div>
                    </div>
                  ))}
              </div>
              {selectedMoldurasCategoria &&
                (moldurasSubcategorias[selectedMoldurasCategoria]?.length ?? 0) === 0 && (
                  <p className="text-center text-stone-500 mt-8">
                    Esta subcategoría aún no tiene productos cargados.
                  </p>
                )}
            </div>
          </div>
        </section>
      )}

      {/* Catalog Section - Revestimientos Luminicos */}
      {slug === 'revestimientos-luminicos' && (
        <section className="w-full py-16 lg:py-24 bg-stone-50">
          <div className="container mx-auto px-6 lg:px-10 xl:px-16">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 mb-4 text-center">
                Catálogo de Productos
              </h2>
              <p className="text-center text-stone-600 mb-12 text-lg">
                Explora nuestra línea completa de revestimientos alistonados
              </p>
              {selectedRevestimientoCategoria && (
                <div className="mb-6 flex justify-center">
                  <button
                    onClick={() => setSelectedRevestimientoCategoria(null)}
                    className="inline-flex items-center gap-2 bg-white border border-stone-300 text-stone-700 px-5 py-2.5 rounded-full text-sm font-medium hover:bg-stone-100 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Volver a subcategorías
                  </button>
                </div>
              )}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                {!selectedRevestimientoCategoria &&
                  revestimientosCategorias.map((categoria, index) => {
                    const preview = revestimientosSubcategorias[categoria]?.[0]
                    return (
                      <button
                        type="button"
                        key={index}
                        onClick={() => setSelectedRevestimientoCategoria(categoria)}
                        className="group bg-white rounded-md overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-stone-200 hover:border-stone-300 text-left w-full"
                      >
                        <div className="relative w-[100%] max-w-full mx-auto aspect-square overflow-hidden bg-stone-100">
                          {preview ? (
                            <Image
                              src={preview.imagenPerfil}
                              alt={categoria}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                              quality={85}
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-stone-200 text-stone-500 text-xs sm:text-sm p-4 text-center">
                              Contenido próximamente
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="text-sm lg:text-sm font-semibold text-stone-900 text-center group-hover:text-red-600 transition-colors duration-300 leading-snug">
                            {categoria}
                          </h3>
                        </div>
                      </button>
                    )
                  })}

                {selectedRevestimientoCategoria &&
                  revestimientosSubcategorias[selectedRevestimientoCategoria].map((item, index) => {
                    const tieneDosVistas = item.imagenPerfil !== item.imagenProducto
                    return (
                      <div
                        key={index}
                        className="group bg-white rounded-md overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-stone-200 hover:border-stone-300"
                      >
                        <div className="relative w-[100%] max-w-full mx-auto aspect-square overflow-hidden bg-stone-100">
                          {/* Por defecto: perfil; al hover: producto (si hay dos imágenes distintas) */}
                          <Image
                            src={item.imagenPerfil}
                            alt={tieneDosVistas ? `${item.name} - perfil` : item.name}
                            fill
                            className={`object-cover transition-all duration-500 ${
                              tieneDosVistas
                                ? 'opacity-100 scale-100 group-hover:opacity-0 group-hover:scale-105'
                                : 'group-hover:scale-105'
                            }`}
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            quality={85}
                          />
                          {tieneDosVistas && (
                            <Image
                              src={item.imagenProducto}
                              alt={item.name}
                              fill
                              className="object-cover absolute inset-0 transition-all duration-500 opacity-0 scale-100 group-hover:opacity-100 group-hover:scale-105"
                              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                              quality={85}
                            />
                          )}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center pointer-events-none">
                            <svg
                              className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="p-4 relative min-h-[3rem] flex flex-col items-center justify-center gap-2">
                          {tieneDosVistas ? (
                            <>
                              <h3 className="text-sm lg:text-base font-semibold text-stone-900 text-center transition-all duration-300 group-hover:opacity-0">
                                {item.name} - perfil
                              </h3>
                              <h3 className="absolute inset-0 flex items-center justify-center text-sm lg:text-base font-semibold text-red-600 text-center px-4 opacity-0 transition-all duration-300 group-hover:opacity-100">
                                {item.name}
                              </h3>
                            </>
                          ) : (
                            <h3 className="text-sm lg:text-base font-semibold text-stone-900 text-center group-hover:text-red-600 transition-colors duration-300">
                              {item.name}
                            </h3>
                          )}
                          {item.description && (
                            <p className="text-xs sm:text-sm text-stone-600 text-center leading-relaxed max-w-prose">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                    )
                  })}
              </div>
              {selectedRevestimientoCategoria &&
                revestimientosSubcategorias[selectedRevestimientoCategoria].length === 0 && (
                  <p className="text-center text-stone-500 mt-8">
                    Esta subcategoría aún no tiene productos cargados.
                  </p>
                )}
            </div>
          </div>
        </section>
      )}

      {/* Catalog Section - Accesorios */}
      {slug === 'accesorios' && (
        <section className="w-full py-16 lg:py-24 bg-stone-50">
          <div className="container mx-auto px-6 lg:px-10 xl:px-16">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 mb-4 text-center">
                Catálogo de Productos
              </h2>
              <p className="text-center text-stone-600 mb-12 text-lg">
                Accesorios y complementos para completar tu proyecto
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8 max-w-4xl mx-auto">
                {accesoriosProducts.map((productName, index) => (
                  <div
                    key={index}
                    className="group bg-white rounded-md overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-stone-200 hover:border-stone-300"
                  >
                    {/* Image Placeholder */}
                    <div className="relative w-[85%] max-w-full mx-auto aspect-square bg-gradient-to-br from-stone-100 to-stone-200 flex items-center justify-center overflow-hidden">
                      {/* Placeholder icon or image */}
                      <div className="w-full h-full flex items-center justify-center bg-stone-100 group-hover:bg-stone-200 transition-colors duration-300">
                        <svg
                          className="w-16 h-16 text-stone-400 group-hover:text-stone-500 transition-colors duration-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    {/* Product Name */}
                    <div className="p-4">
                      <h3 className="text-base lg:text-lg font-semibold text-stone-900 text-center group-hover:text-red-600 transition-colors duration-300">
                        {productName}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Catalog Section - Molduras Luminosas */}
      {slug === 'molduras-luminosas' && (
        <section className="w-full py-16 lg:py-24 bg-stone-50">
          <div className="container mx-auto px-6 lg:px-10 xl:px-16">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 mb-4 text-center">
                Catálogo de Productos
              </h2>
              <p className="text-center text-stone-600 mb-12 text-lg">
                Molduras con iluminación LED integrada
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8 max-w-4xl mx-auto">
                {moldurasLuminosasProducts.map((productName, index) => (
                  <div
                    key={index}
                    className="group bg-white rounded-md overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-stone-200 hover:border-stone-300"
                  >
                    {/* Image Placeholder */}
                    <div className="relative w-[85%] max-w-full mx-auto aspect-square bg-gradient-to-br from-stone-100 to-stone-200 flex items-center justify-center overflow-hidden">
                      {/* Placeholder icon or image */}
                      <div className="w-full h-full flex items-center justify-center bg-stone-100 group-hover:bg-stone-200 transition-colors duration-300">
                        <svg
                          className="w-16 h-16 text-stone-400 group-hover:text-stone-500 transition-colors duration-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    {/* Product Name */}
                    <div className="p-4">
                      <h3 className="text-base lg:text-lg font-semibold text-stone-900 text-center group-hover:text-red-600 transition-colors duration-300">
                        {productName}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="w-full py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-10 xl:px-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 mb-12 text-center">
              Características Principales
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-6 bg-stone-50 rounded-md border border-stone-200 hover:border-stone-300 transition-colors"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-600 flex items-center justify-center mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-stone-700 text-base lg:text-lg font-medium">
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Applications Section */}
      <section className={`w-full py-16 lg:py-24 ${slug === 'molduras' ? 'bg-white' : 'bg-stone-50'}`}>
        <div className="container mx-auto px-6 lg:px-10 xl:px-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 mb-12 text-center">
              Aplicaciones
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.applications.map((application, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-2 h-2 rounded-full bg-red-600"></div>
                  <p className="text-stone-700 text-base">
                    {application}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      {product.gallery && product.gallery.length > 0 && (
        <section className="w-full py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-6 lg:px-10 xl:px-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 mb-12 text-center">
              Casos de uso
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.gallery.map((image, index) => (
                <div
                  key={index}
                  className="relative h-64 lg:h-80 rounded-md overflow-hidden shadow-lg hover:shadow-xl transition-shadow group cursor-pointer"
                >
                  <Image
                    src={image}
                    alt={`${product.title} - Proyecto ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    quality={85}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="w-full py-16 lg:py-24 bg-stone-900">
        <div className="container mx-auto px-6 lg:px-10 xl:px-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              ¿Listo para transformar tu espacio?
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Solicita tu presupuesto personalizado y descubre cómo nuestros {product.title.toLowerCase()} pueden transformar tu proyecto.
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
      </section>
    </div>
  )
}
