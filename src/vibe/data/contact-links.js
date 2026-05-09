// TODO: Replace placeholder values with real links before publishing
export const CONTACT_EMAIL = 'hello@hazemabdelbaset.com'
export const LINKEDIN_URL = 'https://linkedin.com/in/hazem-abdelbaset'
export const BEHANCE_URL = 'https://behance.net/hazem-abdelbaset'
export const WHATSAPP_URL = 'https://wa.me/0000000000'
export const CALENDLY_LINK = 'https://calendly.com/your-link'

export const contactLinks = [
  {
    id: 'email',
    label: 'Email',
    description: 'For project inquiries, collaborations, or general questions.',
    href: `mailto:${CONTACT_EMAIL}`,
    buttonText: 'Send email',
    external: false,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    description: 'Best place to connect, follow updates, and start a professional conversation.',
    href: LINKEDIN_URL,
    buttonText: 'Message on LinkedIn',
    external: true,
  },
  {
    id: 'behance',
    label: 'Behance',
    description: 'View selected visual work and project presentations.',
    href: BEHANCE_URL,
    buttonText: 'View Behance',
    external: true,
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    description: 'For quick project questions if you already know what you need.',
    href: WHATSAPP_URL,
    buttonText: 'Send WhatsApp message',
    external: true,
  },
]
