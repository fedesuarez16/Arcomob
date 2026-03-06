'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function CotizarPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    productType: '',
    projectType: '',
    area: '',
    monthlyVolume: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleCheckboxChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: prev[name as keyof typeof prev] === value ? '' : value
    }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Por favor completa este campo requerido.'
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Por favor completa este campo requerido.'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Por favor completa este campo requerido.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Por favor ingresa un email válido.'
    }
    if (!formData.productType) {
      newErrors.productType = 'Por favor selecciona un producto.'
    }
    if (!formData.projectType) {
      newErrors.projectType = 'Por favor selecciona un tipo de proyecto.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const emailBody = `
Nueva solicitud de cotización - ArcoMob

DATOS PERSONALES:
Nombre: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Teléfono: ${formData.phone || 'No especificado'}
Empresa: ${formData.company || 'No especificada'}

DETALLES DE COTIZACIÓN:
Producto: ${formData.productType}
Tipo de proyecto: ${formData.projectType}
Área aproximada: ${formData.area || 'No especificada'} m²
Volumen mensual estimado: ${formData.monthlyVolume || 'No especificado'}

MENSAJE ADICIONAL:
${formData.message || 'Sin mensaje adicional'}
      `.trim()

      console.log('Email a enviar:', emailBody)
      
      setSubmitStatus('success')
      setTimeout(() => {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          company: '',
          productType: '',
          projectType: '',
          area: '',
          monthlyVolume: '',
          message: ''
        })
        setSubmitStatus('idle')
        setErrors({})
      }, 5000)
    } catch (error) {
      console.error('Error al enviar:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-stone-800 border-b border-stone-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 lg:px-10 xl:px-16">
          <div className="flex justify-between items-center h-16">
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

            <div className="hidden md:flex md:items-center md:space-x-8">
              <Link
                href="/#beneficios"
                className="text-white hover:text-stone-900 transition-colors duration-200 text-[13px] font-normal tracking-wide"
              >
                Beneficios
              </Link>
              <Link
                href="/#aplicaciones"
                className="text-white hover:text-stone-900 transition-colors duration-200 text-[13px] font-normal tracking-wide"
              >
                Aplicaciones
              </Link>
              <Link
                href="/#proyectos"
                className="text-white hover:text-stone-900 transition-colors duration-200 text-[13px] font-normal tracking-wide"
              >
                Proyectos
              </Link>
              <Link
                href="/#contacto"
                className="text-white hover:text-stone-900 transition-colors duration-200 text-[13px] font-normal tracking-wide"
              >
                Contacto
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Split Layout */}
      <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)]">
        {/* Left Section - Content */}
        <div className="flex-1 bg-white px-6 lg:px-12 xl:px-16 py-8 lg:py-10 flex flex-col justify-center overflow-y-auto">
          <div className="max-w-2xl">
            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 mb-4 leading-tight">
              Revestimientos Alistonados para Empresas
            </h1>
            
            {/* Sub-headline */}
            <p className="text-base lg:text-lg text-stone-600 mb-8 leading-relaxed">
              Desde startups en crecimiento hasta empresas Fortune 500, ArcoMob potencia proyectos de revestimientos a gran escala con diseño moderno y calidad superior.
            </p>

            {/* Testimonial */}
            <div>
              <div className="text-stone-400 text-xs font-semibold mb-3 uppercase tracking-wider">
                Cliente Destacado
              </div>
              <div className="bg-stone-50 rounded-xl p-5 border-l-4 border-stone-900">
                <p className="text-stone-700 text-sm lg:text-base leading-relaxed italic mb-3">
                  "En nuestro proyecto corporativo, operamos a gran escala con múltiples servicios y plataformas. ArcoMob aprovechó nuestros datos de uso para entregar mejoras medibles, incluyendo menos complicaciones, caminos de resolución más rápidos y flujos de trabajo más eficientes en nuestros equipos."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center">
                    <span className="text-stone-600 font-semibold text-base">JF</span>
                  </div>
                  <div>
                    <div className="font-semibold text-stone-900 text-sm">Juan Fernández</div>
                    <div className="text-xs text-stone-600">Director de Proyectos</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Form with Background Image */}
        <div className="flex-1 relative h-full overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/media/usecases/living.png"
              alt="Background"
              fill
              className="object-cover"
              quality={80}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-stone-900/40 via-stone-900/30 to-stone-900/50"></div>
          </div>

          {/* Form Card */}
          <div className="relative z-10 h-full flex items-center justify-center p-4 lg:p-6 overflow-y-auto">
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl p-6 lg:p-7">
              <h2 className="text-xl lg:text-2xl font-bold text-stone-900 mb-5">
                Solicita tu Presupuesto
              </h2>

              <form onSubmit={handleSubmit} className="space-y-3">
                {/* First Name and Last Name - Two Columns */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="firstName" className="block text-xs font-medium text-stone-700 mb-1.5">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-stone-600 focus:border-transparent transition-all outline-none ${
                        errors.firstName ? 'border-red-500' : 'border-stone-300'
                      }`}
                      placeholder="Juan"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-xs font-medium text-stone-700 mb-1.5">
                      Apellido *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-stone-600 focus:border-transparent transition-all outline-none ${
                        errors.lastName ? 'border-red-500' : 'border-stone-300'
                      }`}
                      placeholder="Pérez"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Email and Phone - Two Columns */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-stone-700 mb-1.5">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-stone-600 focus:border-transparent transition-all outline-none ${
                        errors.email ? 'border-red-500' : 'border-stone-300'
                      }`}
                      placeholder="juan@empresa.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-xs font-medium text-stone-700 mb-1.5">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-600 focus:border-transparent transition-all outline-none"
                      placeholder="+54 11 1234-5678"
                    />
                  </div>
                </div>

                {/* Company - Full Width */}
                <div>
                  <label htmlFor="company" className="block text-xs font-medium text-stone-700 mb-1.5">
                    Empresa
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-600 focus:border-transparent transition-all outline-none"
                    placeholder="Mi Empresa S.A."
                  />
                </div>

                {/* Product Type and Project Type - Two Columns */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="productType" className="block text-xs font-medium text-stone-700 mb-1.5">
                      Producto *
                    </label>
                    <select
                      id="productType"
                      name="productType"
                      value={formData.productType}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-stone-600 focus:border-transparent transition-all outline-none bg-white ${
                        errors.productType ? 'border-red-500' : 'border-stone-300'
                      }`}
                    >
                      <option value="">Selecciona</option>
                      <option value="revestimientos-luminicos">Revestimientos Luminosos</option>
                      <option value="revestimientos-tradicionales">Revestimientos Tradicionales</option>
                      <option value="molduras">Molduras</option>
                      <option value="molduras-luminosas">Molduras Luminosas</option>
                      <option value="accesorios">Accesorios</option>
                    </select>
                    {errors.productType && (
                      <p className="mt-1 text-xs text-red-600">{errors.productType}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="projectType" className="block text-xs font-medium text-stone-700 mb-1.5">
                      Tipo proyecto *
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-stone-600 focus:border-transparent transition-all outline-none bg-white ${
                        errors.projectType ? 'border-red-500' : 'border-stone-300'
                      }`}
                    >
                      <option value="">Selecciona</option>
                      <option value="residencial">Residencial</option>
                      <option value="comercial">Comercial</option>
                      <option value="oficina">Oficina</option>
                      <option value="hoteleria">Hotelería</option>
                      <option value="retail">Retail</option>
                    </select>
                    {errors.projectType && (
                      <p className="mt-1 text-xs text-red-600">{errors.projectType}</p>
                    )}
                  </div>
                </div>

                {/* Area and Monthly Volume - Two Columns */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="area" className="block text-xs font-medium text-stone-700 mb-1.5">
                      Área (m²)
                    </label>
                    <input
                      type="number"
                      id="area"
                      name="area"
                      value={formData.area}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-600 focus:border-transparent transition-all outline-none"
                      placeholder="50"
                    />
                  </div>
                  <div>
                    <label htmlFor="monthlyVolume" className="block text-xs font-medium text-stone-700 mb-1.5">
                      Volumen mensual
                    </label>
                    <select
                      id="monthlyVolume"
                      name="monthlyVolume"
                      value={formData.monthlyVolume}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-600 focus:border-transparent transition-all outline-none bg-white"
                    >
                      <option value="">Selecciona</option>
                      <option value="pequeno">1 - 5 proyectos</option>
                      <option value="mediano">6 - 15 proyectos</option>
                      <option value="grande">16 - 30 proyectos</option>
                      <option value="masivo">Más de 30</option>
                    </select>
                  </div>
                </div>

                {/* Message - Full Width */}
                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-stone-700 mb-1.5">
                    Mensaje adicional
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={2}
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-600 focus:border-transparent transition-all outline-none resize-none"
                    placeholder="Cuéntanos más sobre tu proyecto..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-stone-900 text-white px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-stone-800 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </>
                  ) : (
                    'Enviar Solicitud'
                  )}
                </button>

                {/* Success/Error Messages */}
                {submitStatus === 'success' && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-green-800 text-xs font-medium">
                      ¡Solicitud enviada con éxito! Nos pondremos en contacto contigo pronto.
                    </p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-800 text-xs font-medium">
                      Error al enviar. Por favor, intenta nuevamente.
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
