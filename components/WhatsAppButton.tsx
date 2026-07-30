'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

const WHATSAPP_NUMBER = '5491160367871'
const CONVERSION_ID = 'AW-803060047/ZVDZCJTQm_UBEM_y9v4C'
const AUTO_OPEN_DELAY = 2000
const TYPING_DELAY = 900

const WHATSAPP_OPTIONS = [
  {
    label: 'Revestimientos para exteriores',
    icon: '🏡',
    message: 'Hola! quiero mas informacion acerca de los revestimientos para exteriores.',
  },
  {
    label: 'Revestimientos para interiores',
    icon: '🛋️',
    message: 'Hola quiero saber mas informacion acerca de los revestimientos para interiores.',
  },
  {
    label: 'Molduras',
    icon: '📐',
    message: 'Hola quiero mas informacion acerca de las molduras.',
  },
  {
    label: 'Consulta general',
    icon: '💬',
    message: 'Hola, me gustaría recibir más información sobre ArcoMob.',
  },
]

function trackWhatsAppConversion() {
  const g = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag
  g?.('event', 'conversion', { send_to: CONVERSION_ID })
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19.05 4.91A10.05 10.05 0 0 0 12 2C6.5 2 2 6.5 2 12c0 1.76.46 3.45 1.34 4.95L2 22l5.2-1.36A9.92 9.92 0 0 0 12 22c5.5 0 10-4.5 10-10 0-2.68-1.04-5.2-2.95-7.09zM12 20.13a8.13 8.13 0 0 1-4.14-1.13l-.3-.18-3.09.81.83-3.01-.2-.31A8.13 8.13 0 1 1 20.13 12 8.13 8.13 0 0 1 12 20.13zm4.46-6.09c-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2a7.27 7.27 0 0 1-1.34-1.66c-.14-.24 0-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42h-.47a.91.91 0 0 0-.66.31 2.77 2.77 0 0 0-.86 2.06c0 1.21.88 2.39 1 2.55.12.16 1.74 2.66 4.21 3.73.59.25 1.05.4 1.41.51.59.19 1.13.16 1.55.1.47-.07 1.44-.59 1.65-1.16.21-.57.21-1.05.14-1.16-.07-.11-.22-.18-.46-.3z" />
    </svg>
  )
}

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const close = useCallback(() => {
    setIsOpen(false)
    setHasInteracted(true)
  }, [])

  const toggle = useCallback(() => {
    setHasInteracted(true)
    setIsOpen((prev) => !prev)
  }, [])

  // Se abre solo al cargar la página. El layout del App Router no se
  // desmonta en la navegación interna, así que esto corre una vez por
  // carga real y no en cada Link que toque el usuario.
  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), AUTO_OPEN_DELAY)
    return () => clearTimeout(timer)
  }, [])

  // Simula que del otro lado están escribiendo antes de mostrar las opciones.
  useEffect(() => {
    if (!isOpen || showOptions) return

    const timer = setTimeout(() => setShowOptions(true), TYPING_DELAY)
    return () => clearTimeout(timer)
  }, [isOpen, showOptions])

  useEffect(() => {
    if (!isOpen) return

    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  function handleOptionClick(message: string) {
    trackWhatsAppConversion()
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer'
    )
    setIsOpen(false)
  }

  return (
    <div
      ref={containerRef}
      className="fixed right-4 z-50 flex flex-col items-end sm:right-6"
      style={{ bottom: 'calc(1.25rem + env(safe-area-inset-bottom))' }}
    >
      <div
        id="whatsapp-panel"
        role="dialog"
        aria-label="Chat de WhatsApp con ArcoMob"
        aria-hidden={!isOpen}
        className={`absolute bottom-full right-0 mb-3 w-[19rem] max-w-[calc(100vw_-_2rem)] origin-bottom-right overflow-hidden rounded-2xl bg-white shadow-2xl shadow-black/25 ring-1 ring-black/5 transition-all duration-300 ease-out motion-reduce:transition-none ${
          isOpen
            ? 'visible translate-y-0 scale-100 opacity-100'
            : 'invisible pointer-events-none translate-y-3 scale-95 opacity-0'
        }`}
      >
        <div className="flex items-center gap-3 bg-[#075E54] px-4 py-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white">
            <WhatsAppIcon className="h-6 w-6" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white">ArcoMob</p>
            <p className="flex items-center gap-1.5 text-xs text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-[#25D366]" aria-hidden="true" />
              En línea · respondemos en minutos
            </p>
          </div>
          <button
            type="button"
            aria-label="Cerrar chat"
            onClick={close}
            className="-mr-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="space-y-3 bg-[#ECE5DD] px-4 py-4">
          <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white px-3.5 py-2.5 shadow-sm">
            {showOptions ? (
              <p className="text-sm leading-snug text-gray-800">
                ¡Hola! 👋 Contanos qué estás buscando y te respondemos por WhatsApp.
              </p>
            ) : (
              <span className="flex items-center gap-1 py-1" aria-label="Escribiendo…">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="h-2 w-2 animate-typing-dot rounded-full bg-gray-400 motion-reduce:animate-none"
                    style={{ animationDelay: `${i * 150}ms` }}
                  />
                ))}
              </span>
            )}
          </div>

          <ul className="space-y-2">
            {WHATSAPP_OPTIONS.map((option, index) => (
              <li
                key={option.label}
                className={`transition-all duration-300 ease-out motion-reduce:transition-none ${
                  showOptions ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                }`}
                style={{ transitionDelay: showOptions ? `${index * 70}ms` : '0ms' }}
              >
                <button
                  type="button"
                  tabIndex={isOpen && showOptions ? 0 : -1}
                  onClick={() => handleOptionClick(option.message)}
                  className="flex w-full items-center gap-2.5 rounded-full border border-[#25D366]/30 bg-white px-4 py-2.5 text-left text-sm font-medium text-[#075E54] shadow-sm transition-colors hover:border-[#25D366] hover:bg-[#25D366]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
                >
                  <span aria-hidden="true">{option.icon}</span>
                  <span className="flex-1">{option.label}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 shrink-0 text-[#25D366]"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button
        type="button"
        aria-label={isOpen ? 'Cerrar chat de WhatsApp' : 'Contactar por WhatsApp'}
        aria-expanded={isOpen}
        aria-controls="whatsapp-panel"
        onClick={toggle}
        className="group relative flex h-14 items-center gap-2.5 rounded-full bg-[#25D366] pl-4 pr-4 text-white shadow-lg shadow-black/25 transition-all duration-200 hover:bg-[#1EBE5D] hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 sm:pr-5"
      >
        {!isOpen && !hasInteracted && (
          <span
            className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-60 motion-reduce:animate-none"
            aria-hidden="true"
          />
        )}
        <span className="relative flex items-center gap-2.5">
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="h-6 w-6"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <WhatsAppIcon className="h-7 w-7" />
          )}
          <span className="hidden text-sm font-semibold sm:inline">
            {isOpen ? 'Cerrar' : 'Escribinos'}
          </span>
        </span>
      </button>
    </div>
  )
}
