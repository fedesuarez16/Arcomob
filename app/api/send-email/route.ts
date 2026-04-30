import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export const runtime = 'nodejs'

type CotizacionData = {
  firstName: string
  lastName: string
  email: string
  phone?: string
  company?: string
  productType: string
  projectType: string
  area?: string
  monthlyVolume?: string
  message?: string
}

type ContactoData = {
  name: string
  email: string
  phone: string
  company?: string
  projectType: string
  message: string
}

type Payload =
  | { type: 'cotizacion'; data: CotizacionData }
  | { type: 'contacto'; data: ContactoData }

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const row = (label: string, value?: string) =>
  `<tr><td style="padding:6px 12px;background:#f5f5f4;font-weight:600;">${escapeHtml(label)}</td><td style="padding:6px 12px;">${escapeHtml(value || '—')}</td></tr>`

const buildCotizacionEmail = (d: CotizacionData) => {
  const subject = `Nueva cotización — ${d.firstName} ${d.lastName}`
  const text = [
    'Nueva solicitud de cotización - ArcoMob',
    '',
    'DATOS PERSONALES:',
    `Nombre: ${d.firstName} ${d.lastName}`,
    `Email: ${d.email}`,
    `Teléfono: ${d.phone || 'No especificado'}`,
    `Empresa: ${d.company || 'No especificada'}`,
    '',
    'DETALLES DE COTIZACIÓN:',
    `Producto: ${d.productType}`,
    `Tipo de proyecto: ${d.projectType}`,
    `Área aproximada: ${d.area || 'No especificada'} m²`,
    `Volumen mensual estimado: ${d.monthlyVolume || 'No especificado'}`,
    '',
    'MENSAJE ADICIONAL:',
    d.message || 'Sin mensaje adicional',
  ].join('\n')
  const html = `
    <div style="font-family:Inter,Arial,sans-serif;color:#1c1917;">
      <h2 style="margin:0 0 16px;">Nueva solicitud de cotización</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px;border:1px solid #e7e5e4;">
        ${row('Nombre', `${d.firstName} ${d.lastName}`)}
        ${row('Email', d.email)}
        ${row('Teléfono', d.phone)}
        ${row('Empresa', d.company)}
        ${row('Producto', d.productType)}
        ${row('Tipo de proyecto', d.projectType)}
        ${row('Área (m²)', d.area)}
        ${row('Volumen mensual', d.monthlyVolume)}
        ${row('Mensaje', d.message)}
      </table>
    </div>`
  return { subject, text, html, replyTo: d.email }
}

const buildContactoEmail = (d: ContactoData) => {
  const subject = `Nuevo contacto — ${d.name}`
  const text = [
    'Nueva consulta - ArcoMob',
    '',
    `Nombre: ${d.name}`,
    `Email: ${d.email}`,
    `Teléfono: ${d.phone}`,
    `Empresa: ${d.company || 'No especificada'}`,
    `Tipo de proyecto: ${d.projectType}`,
    '',
    'MENSAJE:',
    d.message,
  ].join('\n')
  const html = `
    <div style="font-family:Inter,Arial,sans-serif;color:#1c1917;">
      <h2 style="margin:0 0 16px;">Nueva consulta de contacto</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px;border:1px solid #e7e5e4;">
        ${row('Nombre', d.name)}
        ${row('Email', d.email)}
        ${row('Teléfono', d.phone)}
        ${row('Empresa', d.company)}
        ${row('Tipo de proyecto', d.projectType)}
        ${row('Mensaje', d.message)}
      </table>
    </div>`
  return { subject, text, html, replyTo: d.email }
}

export async function POST(req: Request) {
  const user = process.env.GMAIL_USER
  const pass = process.env.GMAIL_APP_PASSWORD
  const to = process.env.GMAIL_TO || user

  if (!user || !pass) {
    return NextResponse.json(
      { error: 'Email no configurado. Falta GMAIL_USER o GMAIL_APP_PASSWORD.' },
      { status: 500 },
    )
  }

  let payload: Payload
  try {
    payload = (await req.json()) as Payload
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  const built =
    payload.type === 'cotizacion'
      ? buildCotizacionEmail(payload.data)
      : payload.type === 'contacto'
        ? buildContactoEmail(payload.data)
        : null

  if (!built) {
    return NextResponse.json({ error: 'Tipo de formulario inválido' }, { status: 400 })
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  })

  try {
    await transporter.sendMail({
      from: `ArcoMob Web <${user}>`,
      to,
      replyTo: built.replyTo,
      subject: built.subject,
      text: built.text,
      html: built.html,
    })
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Error enviando email:', error)
    return NextResponse.json({ error: 'No se pudo enviar el email' }, { status: 502 })
  }
}
