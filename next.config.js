/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Las imágenes de public/media ya están comprimidas y redimensionadas a 1920px
    // en origen, así que no pasan por el optimizador de Vercel (su cuota se agotaba
    // y devolvía 402 en /_next/image). Servimos los archivos tal cual.
    unoptimized: true,
  },
}

module.exports = nextConfig
