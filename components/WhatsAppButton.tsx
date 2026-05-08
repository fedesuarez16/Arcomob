import Link from 'next/link'

const WHATSAPP_NUMBER = '5491160367871'
const WHATSAPP_MESSAGE = 'Hola, me gustaría recibir más información sobre ArcoMob.'

export default function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform duration-200 hover:scale-110 hover:bg-[#1EBE5D] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-7 w-7"
        aria-hidden="true"
      >
        <path d="M19.05 4.91A10.05 10.05 0 0 0 12 2C6.5 2 2 6.5 2 12c0 1.76.46 3.45 1.34 4.95L2 22l5.2-1.36A9.92 9.92 0 0 0 12 22c5.5 0 10-4.5 10-10 0-2.68-1.04-5.2-2.95-7.09zM12 20.13a8.13 8.13 0 0 1-4.14-1.13l-.3-.18-3.09.81.83-3.01-.2-.31A8.13 8.13 0 1 1 20.13 12 8.13 8.13 0 0 1 12 20.13zm4.46-6.09c-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2a7.27 7.27 0 0 1-1.34-1.66c-.14-.24 0-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42h-.47a.91.91 0 0 0-.66.31 2.77 2.77 0 0 0-.86 2.06c0 1.21.88 2.39 1 2.55.12.16 1.74 2.66 4.21 3.73.59.25 1.05.4 1.41.51.59.19 1.13.16 1.55.1.47-.07 1.44-.59 1.65-1.16.21-.57.21-1.05.14-1.16-.07-.11-.22-.18-.46-.3z" />
      </svg>
    </Link>
  )
}
