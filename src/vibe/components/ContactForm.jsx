import { useState } from 'react'
import { motion } from 'framer-motion'
import AnimatedSection from './motion/AnimatedSection'

const INITIAL = { name: '', email: '', inquiryType: '', message: '' }

function Field({ label, required, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <label className="form-label">
        {label}
        {required && <span style={{ color: 'var(--accent)', marginLeft: '3px' }}>*</span>}
      </label>
      {children}
    </div>
  )
}

export default function ContactForm() {
  const [form, setForm] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((p) => ({ ...p, [name]: value }))
    setErrors((p) => ({ ...p, [name]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Required.'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required.'
    if (!form.message.trim()) e.message = 'Required.'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    console.log('[Contact Form] Submitted:', form)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          border: '1px solid rgba(var(--accent-rgb), 0.2)',
          padding: '3rem 2rem',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <span style={{ color: 'var(--accent)', fontSize: '1.5rem' }}>✓</span>
        <p style={{ color: 'var(--text)', fontSize: '1rem', fontWeight: 400, margin: 0 }}>Message received.</p>
        <p style={{ color: 'var(--t40)', fontSize: '0.85rem', fontWeight: 300, margin: 0, lineHeight: 1.7 }}>
          I'll get back to you within 1–2 business days.
        </p>
      </motion.div>
    )
  }

  return (
    <AnimatedSection as="div">
      <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
          <Field label="Name" required>
            <input
              name="name"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              className="form-input"
            />
            {errors.name && <span style={{ color: 'rgba(252,100,100,0.8)', fontSize: '0.7rem' }}>{errors.name}</span>}
          </Field>
          <Field label="Email" required>
            <input
              name="email"
              type="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={handleChange}
              className="form-input"
            />
            {errors.email && <span style={{ color: 'rgba(252,100,100,0.8)', fontSize: '0.7rem' }}>{errors.email}</span>}
          </Field>
        </div>

        <Field label="Inquiry type">
          <select
            name="inquiryType"
            value={form.inquiryType}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">Select inquiry type</option>
            <option value="project">Project inquiry</option>
            <option value="collaboration">Collaboration</option>
            <option value="general">General question</option>
            <option value="other">Other</option>
          </select>
        </Field>

        <Field label="Message" required>
          <textarea
            name="message"
            placeholder="What's on your mind?"
            value={form.message}
            onChange={handleChange}
            rows={5}
            className="form-input"
            style={{ resize: 'vertical', minHeight: '120px' }}
          />
          {errors.message && <span style={{ color: 'rgba(252,100,100,0.8)', fontSize: '0.7rem' }}>{errors.message}</span>}
        </Field>

        <button
          type="submit"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.9rem 2rem',
            backgroundColor: 'var(--btn-bg)',
            color: 'var(--btn-text)',
            fontFamily: "'Poppins', sans-serif",
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease, transform 0.2s ease',
            alignSelf: 'flex-start',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--btn-hover)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--btn-bg)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          Send message ↗
        </button>
      </form>
    </AnimatedSection>
  )
}
