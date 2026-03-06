'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica de envío del formulario
    console.log('Form submitted:', formData)
  }

  return (
    <section id="contacto" className="w-full bg-stone-900 py-16 lg:py-24">
      <div className="container mx-auto px-6 lg:px-10 xl:px-16">
        {/* Section Title */}
        <div className="mb-12 lg:mb-16 text-center">
          <h2 className="text-3xl text-white sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Contactanos y empeza hoy tu proyecto
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Completa el formulario y nos pondremos en contacto contigo para cotizar tu proyecto
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Image */}
          <div className="hidden lg:block relative h-full min-h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/media/usecases/living.png"
              alt="Contacto"
              fill
              className="object-cover"
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h3 className="text-2xl font-bold text-white mb-2">
                Transforma tu espacio hoy
              </h3>
              <p className="text-gray-200">
                Nuestro equipo de expertos está listo para ayudarte a crear el proyecto de tus sueños
              </p>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 lg:p-10 shadow-xl border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-600 focus:border-transparent transition-all outline-none"
                  placeholder="Juan Pérez"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-600 focus:border-transparent transition-all outline-none"
                  placeholder="juan@ejemplo.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-600 focus:border-transparent transition-all outline-none"
                  placeholder="+54 11 1234-5678"
                />
              </div>

              {/* Company */}
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  Empresa (opcional)
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-600 focus:border-transparent transition-all outline-none"
                  placeholder="Mi Empresa S.A."
                />
              </div>

              {/* Project Type */}
              <div>
                <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de proyecto *
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-600 focus:border-transparent transition-all outline-none bg-white"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="residencial">Residencial</option>
                  <option value="comercial">Comercial</option>
                  <option value="revestimientos">Revestimientos</option>
                  <option value="molduras">Molduras</option>
                  <option value="molduras-luminosas">Molduras Luminosas</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Mensaje *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-600 focus:border-transparent transition-all outline-none resize-none"
                  placeholder="Cuéntanos sobre tu proyecto..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-stone-900 text-white px-6 py-4 rounded-lg font-semibold text-lg hover:bg-stone-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Enviar Consulta
              </button>

              <p className="text-xs text-gray-500 text-center">
                Al enviar este formulario, aceptas que nos pongamos en contacto contigo.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
