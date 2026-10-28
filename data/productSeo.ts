/**
 * Metadata SEO por producto. Separada del objeto `products` de ProductPageClient
 * porque ese archivo es 'use client' y no puede exportar datos al server.
 * Cada title apunta a una keyword distinta para no canibalizar
 * /productos/revestimientos-alistonados. Un slug que no esté acá devuelve 404.
 */
export const productSeo: Record<string, { title: string; description: string; image: string }> = {
  'revestimientos-luminicos': {
    title: 'Revestimientos Lumínicos de Madera con LED Integrado | ArcoMob',
    description:
      'Revestimientos alistonados de madera con iluminación LED integrada en el panel. Enchapados naturales, macizos, especiales y MDF. Pedí tu presupuesto a medida.',
    image: '/media/hero1.jpg',
  },
  molduras: {
    title: 'Molduras de Madera: Zócalos, Contramarcos y Cornisas | ArcoMob',
    description:
      'Catálogo de molduras de madera: zócalos, contramarcos, cornisas, esquineros, contravidrios, guardasillas, rinconeros y más. Terminaciones para tu proyecto.',
    image: '/media/products/molduras01.jpeg',
  },
  accesorios: {
    title: 'Accesorios para Revestimientos y Deck | ArcoMob',
    description:
      'Accesorios para revestimientos de madera y deck: roll deck, baldosas deck, esquinas y terminaciones para completar tu proyecto.',
    image: '/media/products/accesorios.jpg',
  },
  'molduras-luminosas': {
    title: 'Molduras Luminosas con LED: Gargantas y Zócalos | ArcoMob',
    description:
      'Molduras luminosas con LED integrado: garganta LED, zócalo LED y nariz de escalón LED. Iluminación decorativa de bajo consumo para tus espacios.',
    image: '/media/products/molduras.jpg',
  },
}
