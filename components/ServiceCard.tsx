import Image from 'next/image'
import Link from 'next/link'

interface ServiceCardProps {
  image: string
  alt: string
  title: string
  description: string
  actions?: Array<{
    label: string
    href: string
  }>
}

export default function ServiceCard({ image, alt, title, description, actions }: ServiceCardProps) {
  return (
    <div className="flex-shrink-0  w-[320px] sm:w-[380px] lg:w-[420px] group cursor-pointer">
      <div className="relative h-[480px] lg:h-[580px] rounded-2xl overflow-hidden shadow-xl">
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          quality={90}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40"></div>
        
        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-between p-6 lg:p-8">
          {/* Top - Navigation Icon */}
          <div className="flex justify-end">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>

          {/* Bottom - Text and Actions */}
          <div className="space-y-4">
            <h3 className="text-2xl lg:text-3xl font-bold text-red-600 [-webkit-text-stroke:1px_stone-800]">
              {title}
            </h3>
            <p className="text-sm lg:text-base text-gray-200 leading-relaxed">
              {description}
            </p>
            
            {/* Action Buttons */}
            {actions && actions.length > 0 && (
              <div className="flex flex-col gap-2 pt-2">
                {actions.map((action, index) => (
                  <Link
                    key={index}
                    href={action.href}
                    className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-white/20 transition-all duration-300 flex items-center justify-between"
                  >
                    <span>{action.label}</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
