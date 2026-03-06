import Image from 'next/image'
import Link from 'next/link'

export default function PortfolioSection() {
  return (
    <section className="w-full relative py-16 lg:py-24">
      {/* Gradient transition from white to stone-900 at the top */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white/50 to-stone-900 h-[200px] lg:h-[250px] pointer-events-none"></div>
      {/* Base background */}
      <div className="absolute inset-0 bg-stone-900"></div>
      
      <div className="container mx-auto px-6 lg:px-10 xl:px-16 relative z-10">

        {/* Grid Layout matching reference image */}
        <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-[auto_1fr_1fr] gap-6 lg:gap-8">

          {/* Top Left - Title & Description */}
          <div className="md:col-start-1 md:row-start-1 flex flex-col justify-center pr-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Nuestros Proyectos de Revestimientos
            </h2>
            <p className="text-base lg:text-lg text-gray-300 leading-relaxed">
              Explora nuestros proyectos seleccionados que demuestran nuestro compromiso con la excelencia en diseño, innovación y satisfacción del cliente.
            </p>
          </div>

          {/* Top Center - Living Moderno */}
          <div className="md:col-start-2 md:row-start-1 relative group cursor-pointer">
            <div className="relative h-full min-h-[220px] lg:min-h-[260px] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/media/usecases/living.png"
                alt="Living Moderno"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-5">
                <h3 className="text-white text-base lg:text-lg font-semibold">Living Moderno</h3>
              </div>
            </div>
          </div>

          {/* Right Column - Tall image spanning 2 rows */}
          <div className="md:col-start-3 md:row-start-1 md:row-span-2 relative group cursor-pointer">
            <div className="relative h-full min-h-[300px] lg:min-h-[540px] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/media/usecases/Gemini_Generated_Image_ib9to0ib9to0ib9t.png"
                alt="Dormitorio Principal"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6">
                <h3 className="text-white text-base lg:text-lg font-semibold">Dormitorio Principal</h3>
              </div>
            </div>
          </div>

          {/* Bottom Left - Tall image spanning 2 rows (starts from row 2) */}
          <div className="md:col-start-1 md:row-start-2 md:row-span-2 relative group cursor-pointer">
            <div className="relative h-full min-h-[300px] lg:min-h-[540px] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/media/usecases/dormitorio.png"
                alt="Oficina Corporativa"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6">
                <h3 className="text-white text-base lg:text-lg font-semibold">Dormitorio Principal</h3>
              </div>
            </div>
          </div>

           {/* Bottom Left - Tall image spanning 2 rows (starts from row 2) */}
           <div className="md:col-start-2 md:row-start-2 md:row-span-2 relative group cursor-pointer">
            <div className="relative h-full min-h-[300px] lg:max-h-[540px] rounded-2xl overflow-hidden shadow-lg">
            <Image
                src="/media/usecases/Gemini_Generated_Image_5w8nql5w8nql5w8n.png"
                alt="Local Comercial"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6">
                <h3 className="text-white text-base lg:text-lg font-semibold">Recepcion</h3>
              </div>
            </div>
          </div>

         

          {/* Bottom Right - CTA Button */}
          <div className="md:col-start-2 md:col-span-2 md:row-start-3 flex items-end justify-end">
            <Link
              href="#proyectos"
              className="inline-flex items-center px-8 py-3.5 border-2 border-white text-white rounded-full font-medium hover:bg-white hover:text-black transition-colors duration-300 text-sm lg:text-base"
            >
              Solicita tu presupuesto
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
