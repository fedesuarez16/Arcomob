'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className=" sticky top-0 z-50 ">
      <nav className="container mx-auto px-6 lg:px-10 xl:px-16">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
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
          </div>

          {/* Desktop Navigation - right side */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link
              href="#beneficios"
              className="text-white/90 hover:text-white transition-colors duration-200 text-[13px] font-normal tracking-wide"
            >
              Beneficios
            </Link>
            <Link
              href="#aplicaciones"
              className="text-white/90 hover:text-white transition-colors duration-200 text-[13px] font-normal tracking-wide"
            >
              Aplicaciones
            </Link>
            <Link
              href="#proyectos"
              className="text-white/90 hover:text-white transition-colors duration-200 text-[13px] font-normal tracking-wide"
            >
              Proyectos
            </Link>
            <Link
              href="#proceso"
              className="text-white/90 hover:text-white transition-colors duration-200 text-[13px] font-normal tracking-wide"
            >
              Proceso
            </Link>
            <Link
              href="#contacto"
              className="text-white/90 hover:text-white transition-colors duration-200 text-[13px] font-normal tracking-wide"
            >
              Contacto
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white/90 hover:text-white focus:outline-none"
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-5 w-5`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-5 w-5`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? 'max-h-96 opacity-100'
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="px-2 pt-2 pb-4 space-y-1 border-t border-gray-200">
            <Link
              href="#beneficios"
              className="block px-3 py-2.5 rounded-md text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Beneficios
            </Link>
            <Link
              href="#aplicaciones"
              className="block px-3 py-2.5 rounded-md text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Aplicaciones
            </Link>
            <Link
              href="#proyectos"
              className="block px-3 py-2.5 rounded-md text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Proyectos
            </Link>
            <Link
              href="#proceso"
              className="block px-3 py-2.5 rounded-md text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Proceso
            </Link>
            <Link
              href="#contacto"
              className="block px-3 py-2.5 rounded-md text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contacto
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
