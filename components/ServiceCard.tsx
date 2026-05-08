import Image from 'next/image'
import Link from 'next/link'

interface ServiceCardProps {
  image: string
  alt: string
  title: string
  description: string
  href?: string
  actions?: Array<{
    label: string
    href: string
  }>
  priority?: boolean
}

export default function ServiceCard({ image, alt, title, description, href, actions, priority = false }: ServiceCardProps) {
  const cardHref = href ?? actions?.[0]?.href

  return (
    <div className="group h-full">
      <div className="relative h-[440px] lg:h-[520px] rounded-2xl overflow-hidden ring-1 ring-stone-200 shadow-md hover:shadow-xl transition-shadow duration-300">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          quality={75}
          priority={priority}
          loading={priority ? undefined : 'lazy'}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/10"></div>

        <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-7">
          <div className="space-y-3">
            <h3 className="text-xl lg:text-2xl font-bold text-white leading-tight">
              {cardHref ? (
                <Link
                  href={cardHref}
                  className="before:absolute before:inset-0 before:content-[''] before:rounded-2xl focus:outline-none focus-visible:before:ring-2 focus-visible:before:ring-white"
                  aria-label={`${title} — Ver más`}
                >
                  {title}
                </Link>
              ) : (
                title
              )}
            </h3>
            <p className="text-sm text-stone-200/90 leading-relaxed line-clamp-3">
              {description}
            </p>

            {actions && actions.length > 0 && (
              <div className="relative z-10 flex flex-col gap-2 pt-3">
                {actions.map((action, index) => (
                  <Link
                    key={index}
                    href={action.href}
                    className="bg-white/10 backdrop-blur-md border border-white/25 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-white/20 transition-colors duration-300 flex items-center justify-between"
                  >
                    <span>{action.label}</span>
                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
