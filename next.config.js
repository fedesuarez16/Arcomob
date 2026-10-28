/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Las imágenes de public/media ya están comprimidas y redimensionadas a 1920px
    // en origen, así que no pasan por el optimizador de Vercel (su cuota se agotaba
    // y devolvía 402 en /_next/image). Servimos los archivos tal cual.
    unoptimized: true,
  },
  async redirects() {
    // Los posts del blog antes usaban el id numérico como URL (/blog/4).
    // Redirect permanente para no perder lo que Google ya tenía indexado.
    const legacyBlogIds = {
      1: 'como-instalar-revestimiento-madera-luminoso',
      2: 'ventajas-revestimientos-alistonados',
      3: 'como-elegir-revestimiento-de-madera',
      4: 'revestimientos-luminicos-paneles-alistonados-led',
    }
    return Object.entries(legacyBlogIds).map(([id, slug]) => ({
      source: `/blog/${id}`,
      destination: `/blog/${slug}`,
      permanent: true,
    }))
  },
}

module.exports = nextConfig
