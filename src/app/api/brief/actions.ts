'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const DEFAULT_CONTACT_EMAIL = 'info@hazemabdelbaset.studio'
const OWNER_FROM_EMAIL = process.env.OWNER_FROM_EMAIL || 'Hazem Portfolio <info@hazemabdelbaset.studio>'
const CLIENT_FROM_EMAIL = process.env.CLIENT_FROM_EMAIL || 'Hazem Abdelbaset <info@hazemabdelbaset.studio>'

interface BriefData {
  name: string
  email: string
  whatsapp?: string
  brandName: string
  websiteOrSocial?: string
  country?: string
  industry?: string
  serviceNeeded: string
  currentProblem: string
  desiredFeeling?: string
  hasLogo?: string
  references?: string
  timeline?: string
  budget?: string
  notes?: string
}

function buildBriefHtml(data: BriefData): string {
  const row = (label: string, value: string) =>
    value ? `<tr><td style="padding:8px 12px;font-weight:600;background:#f5f0e8;width:200px;vertical-align:top">${label}</td><td style="padding:8px 12px;border-bottom:1px solid #eee">${value}</td></tr>` : ''

  return `
    <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:700px;margin:0 auto">
      <div style="background:#1a1a1a;padding:32px;color:#f5f0e8">
        <h1 style="margin:0;font-size:22px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase">New Project Brief</h1>
        <p style="margin:8px 0 0;color:rgba(245,240,232,0.55);font-size:13px">From ${data.name} — ${data.brandName}</p>
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:14px;line-height:1.6">
        ${row('Name', data.name)}
        ${row('Email', data.email)}
        ${row('WhatsApp', data.whatsapp || '')}
        ${row('Brand', data.brandName)}
        ${row('Website / Social', data.websiteOrSocial || '')}
        ${row('Country', data.country || '')}
        ${row('Industry', data.industry || '')}
        ${row('Service Needed', data.serviceNeeded)}
        ${row('Current Problem', data.currentProblem.replace(/\n/g, '<br>'))}
        ${row('Desired Feeling', data.desiredFeeling || '')}
        ${row('Has Logo?', data.hasLogo || '')}
        ${row('References', data.references || '')}
        ${row('Timeline', data.timeline || '')}
        ${row('Budget', data.budget || '')}
        ${row('Notes', data.notes || '')}
      </table>
      <div style="background:#f5f0e8;padding:16px 24px;font-size:12px;color:#999;text-align:center;margin-top:1px">
        Submitted via hazemabdelbaset.studio
      </div>
    </div>
  `
}

function getOwnerEmails(): string[] {
  return (process.env.CONTACT_EMAIL || DEFAULT_CONTACT_EMAIL)
    .split(',')
    .map((email) => email.trim())
    .filter(Boolean)
}

export async function submitBriefForm(data: BriefData): Promise<{ success?: boolean; error?: string }> {
  if (!data.name || !data.email || !data.brandName || !data.serviceNeeded || !data.currentProblem) {
    return { error: 'Required fields missing.' }
  }

  const ownerEmails = getOwnerEmails()

  try {
    await resend.emails.send({
      from: OWNER_FROM_EMAIL,
      to: ownerEmails,
      subject: `Brief: ${data.name} — ${data.brandName} (${data.serviceNeeded})`,
      html: buildBriefHtml(data),
      replyTo: data.email,
    })

    await resend.emails.send({
      from: CLIENT_FROM_EMAIL,
      to: data.email,
      subject: 'Brief Received — Let\'s Book a Meeting',
      html: `
        <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:500px;margin:0 auto;padding:40px 32px">
          <h2 style="font-size:20px;font-weight:700;margin:0 0 16px">Brief received.</h2>
          <p style="color:#555;line-height:1.7;margin:0 0 12px">Hi ${data.name},</p>
          <p style="color:#555;line-height:1.7;margin:0 0 24px">
            I've received your project brief and I'll review it carefully. You can now book a meeting so we can talk through it together.
          </p>
          <hr style="border:none;border-top:1px solid #eee;margin:24px 0"/>
          <p style="color:#999;font-size:12px;margin:0">Hazem Abdelbaset — Brand-Led Visual Designer</p>
        </div>
      `,
    })
  } catch (err) {
    console.error('[BriefForm] Email send failed:', err)
    return { error: 'Failed to send. Please try again.' }
  }

  return { success: true }
}
