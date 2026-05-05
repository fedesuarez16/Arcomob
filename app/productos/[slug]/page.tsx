'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

/** Orden de subcategorías en el catálogo de molduras (sin duplicar Cornisas / Cuadros) */
const moldurasCategoriasOrden = [
  'Zócalos',
  'Contramarcos',
  'Esquineros',
  'Contravidrios',
  'Zocalín',
  
  'Guardasillas',
  'Antepecho',
  'Rinconeros',
  'Cuadros',
  'Listones',
  'Tapacintas',
 'Tapacantos',
  'Cornisas',
  'Balustres',
  'Terminaciones',
  'Pasamanos'
  
  
 
 
] as const

const moldurasCatalogPreviewSrc = '/media/products/molduras01.jpeg'

/** Vista previa de cada subcategoría en la grilla (sin entrada → imagen genérica) */
const moldurasSubcategoriaPreviewSrc: Partial<
  Record<(typeof moldurasCategoriasOrden)[number], string>
> = {
  Cornisas: '/media/molduras/cornisas.png',
  Zócalos: '/media/molduras/zocalo.png',
  Contramarcos: '/media/molduras/contramarcos.png',
  Rinconeros: '/media/molduras/rinconero.png',
  Terminaciones: '/media/molduras/terminaciones.png',
  Cuadros: '/media/molduras/cuadros.png',
  Listones: '/media/molduras/listones.png',
  Antepecho: '/media/molduras/antepechos.png',
  Tapacantos: '/media/molduras/tapacantos.png',
  Esquineros: '/media/molduras/esquineros.png',
  Balustres: '/media/molduras/balustres.png',
  Zocalín: '/media/molduras/zocalin.png',
  Contravidrios: '/media/molduras/contravidrios.png',
  Guardasillas: '/media/molduras/guardasillas.png',
  Tapacintas: '/media/molduras/tapacintas.png',
  Pasamanos: '/media/molduras/pasamanos.png'
}

const moldurasSubcategorias: Record<string, string[]> = {
  Zócalos: ['Zócalos'],
  Contramarcos: ['Contramarcos'],
  Cornisas: ['Cornisas'],
  Rinconeros: ['Rinconeros'],
  Terminaciones: ['Terminaciones'],
  Cuadros: ['Cuadros'],
  Listones: ['Listones'],
  Antepecho: ['Antepecho'],
  Tapacantos: [ 'Tapacantos'],
  Esquineros: ['Esquineros'],
  Balustres: ['Balaustres torneados'],
  Zocalín: ['Zocalín'],
  Contravidrios: ['Contravidrios'],
  Guardasillas: ['Guardasillas'],
  Tapacintas: ['Tapacintas'],
  Pasamanos: ['Pasamanos']
}

/** Una imagen o varias (por ejemplo 3 vistas para Zócalos / Contramarcos / Zocalín). */
type MoldurasCatalogImageEntry = string | string[]

const MOLDURAS_CATALOG_VARIANT_LABELS = ['standar', 'vintage', 'minimaline'] as const

/**
 * Láminas de catálogo por subcategoría + nombre de ítem (igual que en moldurasSubcategorias).
 * Archivos en `public/media/molduras/catalogo/` — convención sugerida: `<tema>Catalogo.png` (ej. esquineroCatalogo.png).
 */
const moldurasCatalogProductImage: Record<string, Record<string, MoldurasCatalogImageEntry>> = {
  Zócalos: {
    Zócalos: [
      '/media/molduras/catalogo/zocalominimaline.png',
      '/media/molduras/catalogo/zocalostandar.png',
      '/media/molduras/catalogo/zocalostipos.png'
    ]
  },
  Contravidrios: {
    Contravidrios: '/media/molduras/catalogo/contravidriosCatalogo.png'
  },
  Cornisas: {
    Cornisas: '/media/molduras/catalogo/cornisasCatalogo.png'
  },
  Rinconeros: {
    Rinconeros: '/media/molduras/catalogo/rinconerosCatalogo.png'
  },
  Esquineros: {
    Esquineros: '/media/molduras/catalogo/esquineroCatalogo.png'
  },
  Balustres: {
    Balustres: '/media/molduras/catalogo/balustresCatalogo.png'
  },
  Zocalín: {
    Zocalín: [
      '/media/molduras/catalogo/zocalinCatalogo.png',
      '/media/molduras/zocalin.png',
      '/media/molduras/catalogo/zocalinminimaline.png'
    ]
  },
  Guardasillas: {
    Guardasillas: '/media/molduras/catalogo/guardasillasCatalogo.png'
  },
  Tapacantos: {
    Tapacantos: '/media/molduras/catalogo/tapacantosCatalogo.png',
  },
  Pasamanos: {
    Pasamanos: '/media/molduras/catalogo/pasamanosCatalogo.png'
  },
  Listones: {
    Listones: '/media/molduras/catalogo/listonesCatalogo.png'
  },
  Terminaciones: {
    Terminaciones: '/media/molduras/catalogo/terminacionesCatalogo.png'
  },
  Antepecho: {
    Antepecho: '/media/molduras/catalogo/antepechoCatalogo.png'
  },
  Cuadros: {
    Cuadros: '/media/molduras/catalogo/cuadrosCatalogo.png'
  },
  Contramarcos: {
    Contramarcos: [
      '/media/molduras/catalogo/contramarcosCatalogo.png',
      '/media/molduras/catalogo/contramarcosvintage.png',
      '/media/molduras/catalogo/contrmarcosminimaline.png'
    ]
  }
}

function moldurasCatalogImagesList(raw: MoldurasCatalogImageEntry | undefined): string[] {
  if (raw == null) return []
  return Array.isArray(raw) ? raw : [raw]
}

function moldurasProductToLightboxSlides(productName: string, raw: MoldurasCatalogImageEntry): CatalogLightboxSlide[] {
  const list = moldurasCatalogImagesList(raw)
  return list.map((src, i) => {
    const variant =
      list.length === MOLDURAS_CATALOG_VARIANT_LABELS.length
        ? MOLDURAS_CATALOG_VARIANT_LABELS[i]
        : null
    const caption =
      variant != null
        ? `${productName} — ${variant}`
        : list.length > 1
          ? `${productName} — ${i + 1}`
          : productName
    return { src, caption }
  })
}

type CatalogLightboxSlide = { src: string; caption: string }

/** Primera lámina de catálogo de una subcategoría (orden de moldurasSubcategorias, luego cualquier clave del mapa). */
function getFirstMoldurasCatalogLightbox(categoria: string): CatalogLightboxSlide[] | null {
  const map = moldurasCatalogProductImage[categoria]
  if (!map) return null
  const order = moldurasSubcategorias[categoria] ?? []
  for (const name of order) {
    const raw = map[name]
    if (raw == null) continue
    const slides = moldurasProductToLightboxSlides(name, raw)
    if (slides.length > 0) return slides
  }
  const entries = Object.entries(map)
  if (entries.length === 0) return null
  const [alt, raw] = entries[0]
  return moldurasProductToLightboxSlides(alt, raw)
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
      name: 'PARAISO',
      imagenPerfil: '/media/revestimientos/enchapados/paraiso/perfil.png',
      imagenProducto: '/media/revestimientos/enchapados/paraiso/detalle.jpeg'
    },
    {
      name: 'GUAYUBIRA',
      imagenPerfil: '/media/revestimientos/guay.jpeg',
      imagenProducto: '/media/revestimientos/enchapados/guayubira/detalle.png'
    },
    {
      name: 'ROBLE AMERICANO',
      imagenPerfil: '/media/revestimientos/enchapados/roble americano/perfil.png',
      imagenProducto: '/media/revestimientos/enchapados/roble americano/detalle.png'
    },
    {
      name: 'GUATAMBU',
      imagenPerfil: '/media/revestimientos/enchapados/guatambu/perfil.png',
      imagenProducto: '/media/revestimientos/enchapados/guatambu/detalle.png'
    },
    {
      name: 'ITAUBA',
      imagenPerfil: '/media/revestimientos/enchapados/itabua/perfil.png',
      imagenProducto: '/media/revestimientos/enchapados/itabua/itauba.png'
    },
  
    {
      name: 'FREIJO',
      imagenPerfil: '/media/revestimientos/freijoenchapado.png',
      imagenProducto: '/media/revestimientos/enchapados/freijo/freijo.png'
    },
   
   
    
  ],
  'Revestimientos Especiales': [
    {
      name: 'Cancharana',
      imagenPerfil: '/media/revestimientos/especiales/cancharanaperfil.png',
      imagenProducto: '/media/revestimientos/especiales/cancharana1.png'
    },
    
    {
      name: 'Cedro',
      imagenPerfil: '/media/revestimientos/CEDRO.png',
      imagenProducto: '/media/revestimientos/especiales/cedro1.png'
    },
    {
      name: 'Kiri',
      imagenPerfil: '/media/revestimientos/especiales/kiri/perfil.png',
      imagenProducto: '/media/revestimientos/especiales/kiri/detalle.png'
    },
    {
      name: 'cambará',
      imagenPerfil: '/media/revestimientos/especiales/cambara.png',
      imagenProducto: '/media/revestimientos/especiales/cambara1.png'
    },
    
   
    
    
  ],
  'Particulados': [
    {
      name: 'Particulados MDF',
      imagenPerfil: '/media/revestimientos/MDFCRUDOPINTADO.jpeg',
      imagenProducto: '/media/revestimientos/MDFCRUDOPINTADO.jpeg',
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
  Macizos: [
    {
      name: 'pino',
      imagenPerfil: '/media/revestimientos/macizos/pino/perfil.png',
      imagenProducto: '/media/revestimientos/macizos/pino/detalle.png'
    },
    {
      name: 'eucalipto',
      imagenPerfil: '/media/revestimientos/macizos/eucalipto/perfil.png',
      imagenProducto: '/media/revestimientos/macizos/eucalipto/detalle.png'
    }

  ],
  'Revestimiento para Exterior': [
    {
      name: 'pino impregnado para exteriores',
      imagenPerfil: '/media/revestimientos/pino impregnado/ChatGPT Image Apr 30, 2026, 02_11_29 AM.png',
      imagenProducto: '/media/revestimientos/pino impregnado/ChatGPT Image Apr 30, 2026, 02_11_29 AM.png'
    }
  ]
}

const accesoriosCatalog: { name: string; image: string }[] = [
  { name: 'Zocalín', image: '/media/molduras/zocalin.png' },
  { name: 'Cuadros', image: '/media/molduras/cuadros.png' },
 
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
  const [catalogImageLightbox, setCatalogImageLightbox] = useState<CatalogLightboxSlide[] | null>(null)
  /** Índice de lámina ampliada con zoom en el lightbox de catálogo (clic para alternar). */
  const [catalogLightboxZoomSlide, setCatalogLightboxZoomSlide] = useState<number | null>(null)

  useEffect(() => {
    setCatalogLightboxZoomSlide(null)
  }, [catalogImageLightbox])

  useEffect(() => {
    if (!catalogImageLightbox) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCatalogImageLightbox(null)
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [catalogImageLightbox])

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
                    onClick={() => {
                      setCatalogImageLightbox(null)
                      setSelectedMoldurasCategoria(null)
                    }}
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
                      onClick={() => {
                        setSelectedMoldurasCategoria(categoria)
                        const light = getFirstMoldurasCatalogLightbox(categoria)
                        if (light) setCatalogImageLightbox(light)
                      }}
                      className="group bg-white rounded-md overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-stone-200 hover:border-stone-300 text-left w-full"
                    >
                      <div className="relative w-[100%] max-w-full mx-auto aspect-[4/3] overflow-hidden bg-stone-100">
                        <Image
                          src={moldurasSubcategoriaPreviewSrc[categoria] ?? moldurasCatalogPreviewSrc}
                          alt={categoria}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          quality={85}
                        />
                      </div>
                      <div className="p-4 bg-stone-100 border-t border-stone-200">
                        <h3 className="text-sm lg:text-base font-bold uppercase tracking-wide text-stone-900 text-center group-hover:text-red-600 transition-colors duration-300 leading-snug">
                          {categoria}
                        </h3>
                      </div>
                    </button>
                  ))}

                {selectedMoldurasCategoria &&
                  moldurasSubcategorias[selectedMoldurasCategoria]?.map((productName, index) => {
                    const productRaw =
                      moldurasCatalogProductImage[selectedMoldurasCategoria]?.[productName]
                    const productImages = moldurasCatalogImagesList(productRaw)
                    return (
                      <div
                        key={`${productName}-${index}`}
                        className="group bg-white rounded-md overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-stone-200 hover:border-stone-300"
                      >
                        <div className="relative w-[85%] max-w-full mx-auto aspect-[4/3] overflow-hidden bg-stone-100">
                          {productImages.length > 0 ? (
                            <button
                              type="button"
                              onClick={() =>
                                setCatalogImageLightbox(
                                  moldurasProductToLightboxSlides(productName, productRaw as MoldurasCatalogImageEntry)
                                )
                              }
                              className="absolute inset-0 flex h-full w-full flex-col text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
                              aria-label={`Ver catálogo: ${productName}`}
                            >
                              <div
                                className={`min-h-0 flex-1 ${
                                  productImages.length > 1
                                    ? 'grid grid-cols-3 gap-0.5 sm:gap-1'
                                    : 'grid grid-cols-1'
                                }`}
                              >
                                {productImages.map((src, imgIndex) => (
                                  <div key={`${src}-${imgIndex}`} className="relative min-h-0 min-w-0">
                                    <Image
                                      src={src}
                                      alt=""
                                      fill
                                      className="object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
                                      sizes={
                                        productImages.length > 1
                                          ? '(max-width: 640px) 30vw, 12vw'
                                          : '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw'
                                      }
                                      quality={90}
                                    />
                                  </div>
                                ))}
                              </div>
                              {productImages.length === MOLDURAS_CATALOG_VARIANT_LABELS.length && (
                                <div className="pointer-events-none grid shrink-0 grid-cols-3 gap-0.5 border-t border-stone-200/90 bg-stone-50/95 py-1 sm:gap-1 sm:py-1.5">
                                  {MOLDURAS_CATALOG_VARIANT_LABELS.map((label) => (
                                    <span
                                      key={label}
                                      className="text-center text-[9px] font-semibold uppercase tracking-wide text-stone-600 sm:text-[10px]"
                                    >
                                      {label}
                                    </span>
                                  ))}
                                </div>
                              )}
                              <div className="pointer-events-none relative z-10 flex shrink-0 justify-center bg-gradient-to-t from-black/75 via-black/30 to-transparent pt-3 pb-2 sm:pt-4">
                                <span className="rounded-full bg-white/95 px-3 py-1 text-[10px] font-semibold text-red-600 shadow-sm sm:px-4 sm:py-1.5 sm:text-xs">
                                  Ver catálogo
                                </span>
                              </div>
                            </button>
                          ) : (
                            <>
                              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-stone-100 to-stone-200 group-hover:from-stone-100 group-hover:to-stone-200">
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
                            </>
                          )}
                        </div>
                        <div className="p-4 bg-stone-100 border-t border-stone-200">
                          <h3 className="text-sm lg:text-base font-bold uppercase tracking-wide text-stone-900 text-center group-hover:text-red-600 transition-colors duration-300">
                            {productName}
                          </h3>
                        </div>
                      </div>
                    )
                  })}
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
                    type="button"
                    onClick={() => {
                      setCatalogImageLightbox(null)
                      setSelectedRevestimientoCategoria(null)
                    }}
                    className="inline-flex items-center gap-2 bg-white border border-stone-300 text-stone-700 px-5 py-2.5 rounded-full text-sm font-medium hover:bg-stone-100 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Volver a subcategorías
                  </button>
                </div>
              )}
            </div>
            {!selectedRevestimientoCategoria && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {revestimientosCategorias.map((categoria, index) => {
                  const preview = revestimientosSubcategorias[categoria]?.[0]
                  return (
                    <button
                      type="button"
                      key={index}
                      onClick={() => setSelectedRevestimientoCategoria(categoria)}
                      className="group relative aspect-[3/4] overflow-hidden rounded-lg shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer border border-stone-200 hover:border-stone-300 text-left w-full bg-stone-100"
                    >
                      {preview ? (
                        <Image
                          src={preview.imagenPerfil}
                          alt={categoria}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          quality={85}
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-stone-200 text-stone-500 text-xs sm:text-sm p-4 text-center">
                          Contenido próximamente
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-500 group-hover:from-black/90" />
                      <div className="absolute inset-x-0 bottom-0 p-5 lg:p-6">
                        <h3 className="text-lg lg:text-2xl font-semibold text-white leading-snug drop-shadow-md transition-colors duration-300 group-hover:text-red-300">
                          {categoria}
                        </h3>
                        <div className="mt-2 h-0.5 w-10 bg-red-600 transition-all duration-500 group-hover:w-20" />
                      </div>
                    </button>
                  )
                })}
              </div>
            )}

            {selectedRevestimientoCategoria && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {revestimientosSubcategorias[selectedRevestimientoCategoria].map((item, index) => {
                    const tieneDosVistas = item.imagenPerfil !== item.imagenProducto
                    const labelAmpliar =
                      item.name?.trim() ||
                      `${selectedRevestimientoCategoria} — ${index + 1}`
                    return (
                      <button
                        type="button"
                        key={index}
                        className="group relative aspect-[3/4] overflow-hidden rounded-lg shadow-md hover:shadow-2xl transition-all duration-500 cursor-zoom-in border border-stone-200 hover:border-stone-300 text-left w-full bg-stone-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
                        onClick={() => {
                          if (tieneDosVistas) {
                            setCatalogImageLightbox([
                              { src: item.imagenPerfil, caption: `${labelAmpliar} — perfil` },
                              { src: item.imagenProducto, caption: `${labelAmpliar} — detalle` }
                            ])
                          } else {
                            setCatalogImageLightbox([
                              { src: item.imagenPerfil, caption: labelAmpliar }
                            ])
                          }
                        }}
                        aria-label={`Ampliar imagen: ${labelAmpliar}`}
                      >
                        <Image
                          src={item.imagenPerfil}
                          alt={tieneDosVistas ? `${item.name} - perfil` : item.name}
                          fill
                          className={`object-cover transition-all duration-700 ${
                            tieneDosVistas
                              ? 'opacity-100 group-hover:opacity-0 group-hover:scale-110'
                              : 'group-hover:scale-110'
                          }`}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          quality={85}
                        />
                        {tieneDosVistas && (
                          <Image
                            src={item.imagenProducto}
                            alt={item.name}
                            fill
                            className="object-cover absolute inset-0 transition-all duration-700 opacity-0 group-hover:opacity-100 group-hover:scale-110"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            quality={85}
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-500 group-hover:from-black/90" />
                        <div className="absolute inset-x-0 bottom-0 p-5 lg:p-6">
                          <h3 className="text-lg lg:text-2xl font-semibold text-white leading-snug drop-shadow-md transition-colors duration-300 group-hover:text-red-300">
                            {item.name}
                          </h3>
                          {item.description && (
                            <p className="mt-1 text-xs sm:text-sm text-white/85 leading-relaxed line-clamp-2">
                              {item.description}
                            </p>
                          )}
                          <div className="mt-2 h-0.5 w-10 bg-red-600 transition-all duration-500 group-hover:w-20" />
                        </div>
                      </button>
                    )
                  })}
                </div>
                {revestimientosSubcategorias[selectedRevestimientoCategoria].length === 0 && (
                  <p className="text-center text-stone-500 mt-8">
                    Esta subcategoría aún no tiene productos cargados.
                  </p>
                )}
              </>
            )}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
                {accesoriosCatalog.map((item, index) => (
                  <div
                    key={index}
                    className="group bg-white rounded-md overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-stone-200 hover:border-stone-300"
                  >
                    <div className="relative w-[85%] max-w-full mx-auto aspect-[4/3] overflow-hidden bg-stone-100">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        quality={90}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 pointer-events-none" />
                    </div>
                    <div className="p-4">
                      <h3 className="text-base lg:text-lg font-semibold text-stone-900 text-center group-hover:text-red-600 transition-colors duration-300">
                        {item.name}
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
                    <div className="relative w-[85%] max-w-full mx-auto aspect-[4/3] bg-gradient-to-br from-stone-100 to-stone-200 flex items-center justify-center overflow-hidden">
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

      {/* Lightbox — catálogo molduras y revestimientos */}
      {catalogImageLightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 sm:p-8"
          onClick={() => setCatalogImageLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Vista ampliada"
        >
          <button
            type="button"
            onClick={() => setCatalogImageLightbox(null)}
            className="absolute top-3 right-3 sm:top-6 sm:right-6 z-[101] rounded-full bg-white/10 hover:bg-white/20 text-white p-2.5 backdrop-blur-sm transition-colors"
            aria-label="Cerrar"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div
            className="mx-auto flex max-h-[90vh] w-full max-w-[min(95vw,1600px)] flex-col gap-4 overflow-y-auto overflow-x-hidden px-2 sm:px-4 lg:flex-row lg:items-start lg:justify-center lg:gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            {catalogImageLightbox.map((slide, slideIndex) => {
              const zoomed = catalogLightboxZoomSlide === slideIndex
              return (
                <figure
                  key={`${slide.src}-${slideIndex}`}
                  className="flex min-h-0 w-full min-w-0 flex-1 flex-col items-center lg:max-w-[50%]"
                >
                  <div
                    role="button"
                    tabIndex={0}
                    aria-label={zoomed ? 'Reducir imagen' : 'Ampliar imagen'}
                    aria-pressed={zoomed}
                    className={`relative h-[min(42vh,520px)] w-full touch-pan-x touch-pan-y transition-shadow duration-200 outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black/50 lg:h-[min(85vh,920px)] lg:max-h-[85vh] ${
                      zoomed
                        ? 'cursor-zoom-out overflow-auto shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]'
                        : 'cursor-zoom-in overflow-hidden'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation()
                      setCatalogLightboxZoomSlide((prev) => (prev === slideIndex ? null : slideIndex))
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        e.stopPropagation()
                        setCatalogLightboxZoomSlide((prev) => (prev === slideIndex ? null : slideIndex))
                      }
                    }}
                    title={zoomed ? 'Clic para reducir' : 'Clic para ampliar'}
                  >
                    <div
                      className={`relative transition-[width,height] duration-200 ease-out ${
                        zoomed ? 'h-[165%] w-[165%] min-h-full min-w-full' : 'h-full w-full'
                      }`}
                    >
                      <Image
                        src={slide.src}
                        alt={slide.caption}
                        fill
                        className="object-contain object-center"
                        sizes="(max-width: 1024px) 95vw, 45vw"
                        quality={95}
                        priority={slideIndex === 0}
                        draggable={false}
                      />
                    </div>
                  </div>
                  <figcaption className="mt-2 max-w-full shrink-0 px-2 text-center text-sm text-white/90">
                    {slide.caption}
                  </figcaption>
                </figure>
              )
            })}
          </div>
        </div>
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
