import { useState } from 'react'
import { motion } from 'framer-motion'
import { submitBriefForm } from '@/app/api/brief/actions'
import AnimatedSection from './motion/AnimatedSection'

const INITIAL_FORM = {
  name: '',
  email: '',
  whatsapp: '',
  brandName: '',
  websiteOrSocial: '',
  country: '',
  industry: '',
  serviceNeeded: '',
  currentProblem: '',
  desiredFeeling: '',
  hasLogo: '',
  references: '',
  timeline: '',
  budget: '',
  notes: '',
}

function Label({ children, required }) {
  return (
    <label className="form-label">
      {children}
      {required && <span style={{ color: 'var(--accent)', marginLeft: '3px' }}>*</span>}
    </label>
  )
}

function Input({ name, type = 'text', placeholder, value, onChange, error }) {
  return (
    <div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`form-input${error ? ' error' : ''}`}
        autoComplete="off"
      />
      {error && (
        <p style={{ color: 'rgba(252,100,100,0.8)', fontSize: '0.72rem', marginTop: '0.3rem', letterSpacing: '0.05em' }}>
          {error}
        </p>
      )}
    </div>
  )
}

function Textarea({ name, placeholder, value, onChange, error, rows = 4 }) {
  return (
    <div>
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        className={`form-input form-textarea${error ? ' error' : ''}`}
      />
      {error && (
        <p style={{ color: 'rgba(252,100,100,0.8)', fontSize: '0.72rem', marginTop: '0.3rem', letterSpacing: '0.05em' }}>
          {error}
        </p>
      )}
    </div>
  )
}

function Select({ name, value, onChange, children, error }) {
  return (
    <div>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`form-input form-select${error ? ' error' : ''}`}
      >
        {children}
      </select>
      {error && (
        <p style={{ color: 'rgba(252,100,100,0.8)', fontSize: '0.72rem', marginTop: '0.3rem', letterSpacing: '0.05em' }}>
          {error}
        </p>
      )}
    </div>
  )
}

function RadioGroup({ name, options, value, onChange, error }) {
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {options.map((option) => (
          <label
            key={option.value}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              cursor: 'pointer',
              color: value === option.value ? 'var(--text)' : 'var(--t55)',
              fontSize: '0.88rem',
              fontWeight: 300,
              transition: 'color 0.2s ease',
            }}
          >
            <span
              style={{
                width: '14px',
                height: '14px',
                border: `1px solid ${value === option.value ? 'var(--accent)' : 'var(--t18)'}`,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'border-color 0.2s ease',
              }}
            >
              {value === option.value && (
                <span
                  style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent)' }}
                />
              )}
            </span>
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              style={{ display: 'none' }}
            />
            {option.label}
          </label>
        ))}
      </div>
      {error && (
        <p style={{ color: 'rgba(252,100,100,0.8)', fontSize: '0.72rem', marginTop: '0.5rem', letterSpacing: '0.05em' }}>
          {error}
        </p>
      )}
    </div>
  )
}

function FormSection({ title, children }) {
  return (
    <AnimatedSection
      as="div"
      style={{ borderTop: '1px solid var(--t07)', paddingTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}
    >
      <p
        style={{
          color: 'var(--t28)',
          fontSize: '0.65rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          margin: 0,
        }}
      >
        {title}
      </p>
      {children}
    </AnimatedSection>
  )
}

export default function BriefForm() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Your name is required.'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'A valid email is required.'
    if (!form.brandName.trim()) e.brandName = 'Brand name is required.'
    if (!form.serviceNeeded) e.serviceNeeded = 'Please select what you need.'
    if (!form.currentProblem.trim()) e.currentProblem = 'Please describe the current problem.'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      const firstErrorKey = Object.keys(validationErrors)[0]
      document.querySelector(`[name="${firstErrorKey}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    setLoading(true)
    setServerError('')
    const result = await submitBriefForm(form)
    setLoading(false)
    if (result.error) {
      setServerError(result.error)
      return
    }
    window.location.href = '/book'
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          border: '1px solid rgba(var(--accent-rgb), 0.25)',
          padding: '4rem 3rem',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
        }}
      >
        <div
          style={{
            width: '48px',
            height: '48px',
            border: '1px solid var(--accent)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent)',
            fontSize: '1.2rem',
          }}
        >
          ✓
        </div>
        <div>
          <p style={{ color: 'var(--text)', fontSize: '1.1rem', fontWeight: 500, margin: '0 0 0.5rem 0' }}>
            Brief received.
          </p>
          <p style={{ color: 'var(--t55)', fontSize: '0.88rem', fontWeight: 300, margin: 0, lineHeight: 1.7 }}>
            I'll review your brief and get back to you within 1–2 business days.
          </p>
        </div>
        <p
          style={{
            color: 'var(--t28)',
            fontSize: '0.72rem',
            letterSpacing: '0.1em',
            marginTop: '0.5rem',
          }}
        >
          Want to also book a call? Use the meeting link below.
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      <FormSection title="About you">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
          <div>
            <Label required>Name</Label>
            <Input name="name" placeholder="Your full name" value={form.name} onChange={handleChange} error={errors.name} />
          </div>
          <div>
            <Label required>Email</Label>
            <Input name="email" type="email" placeholder="your@email.com" value={form.email} onChange={handleChange} error={errors.email} />
          </div>
        </div>
        <div>
          <Label>WhatsApp number</Label>
          <Input name="whatsapp" type="tel" placeholder="+20 / +966 / ..." value={form.whatsapp} onChange={handleChange} />
        </div>
      </FormSection>

      <FormSection title="About the brand">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
          <div>
            <Label required>Brand / Business name</Label>
            <Input name="brandName" placeholder="Brand name" value={form.brandName} onChange={handleChange} error={errors.brandName} />
          </div>
          <div>
            <Label>Website or social link</Label>
            <Input name="websiteOrSocial" placeholder="instagram.com/yourbrand" value={form.websiteOrSocial} onChange={handleChange} />
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
          <div>
            <Label>Country / Market</Label>
            <Input name="country" placeholder="e.g. Egypt, UAE, Saudi Arabia" value={form.country} onChange={handleChange} />
          </div>
          <div>
            <Label>Industry / Sector</Label>
            <Input name="industry" placeholder="e.g. Healthcare, Fashion, F&B" value={form.industry} onChange={handleChange} />
          </div>
        </div>
      </FormSection>

      <FormSection title="Project needs">
        <div>
          <Label required>What do you need?</Label>
          <RadioGroup
            name="serviceNeeded"
            value={form.serviceNeeded}
            onChange={handleChange}
            error={errors.serviceNeeded}
            options={[
              { value: 'social-media-system', label: 'Social Media System' },
              { value: 'campaign-visuals', label: 'Campaign Visuals' },
              { value: 'brand-identity', label: 'Brand Identity / Refresh' },
              { value: 'not-sure', label: 'Not sure yet' },
            ]}
          />
        </div>
        <div>
          <Label required>What is the current problem?</Label>
          <Textarea
            name="currentProblem"
            placeholder="Describe the visual or brand challenge you're facing. Be direct."
            value={form.currentProblem}
            onChange={handleChange}
            error={errors.currentProblem}
            rows={5}
          />
        </div>
        <div>
          <Label>What do you want the brand to look / feel like?</Label>
          <Textarea
            name="desiredFeeling"
            placeholder="Premium, minimal, bold, warm... references or examples are welcome."
            value={form.desiredFeeling}
            onChange={handleChange}
            rows={3}
          />
        </div>
      </FormSection>

      <FormSection title="Current brand status">
        <div>
          <Label>Do you already have a logo / brand identity?</Label>
          <RadioGroup
            name="hasLogo"
            value={form.hasLogo}
            onChange={handleChange}
            options={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
              { value: 'partially', label: 'Partially' },
            ]}
          />
        </div>
        <div>
          <Label>Any existing visual references or content?</Label>
          <Textarea
            name="references"
            placeholder="Links, descriptions, competitor brands you admire, etc."
            value={form.references}
            onChange={handleChange}
            rows={3}
          />
        </div>
      </FormSection>

      <FormSection title="Timeline & budget">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
          <div>
            <Label>Timeline</Label>
            <Select name="timeline" value={form.timeline} onChange={handleChange}>
              <option value="">Select timeline</option>
              <option value="asap">ASAP</option>
              <option value="this-month">This month</option>
              <option value="1-2-months">1–2 months</option>
              <option value="flexible">Flexible</option>
            </Select>
          </div>
          <div>
            <Label>Budget range (USD)</Label>
            <Select name="budget" value={form.budget} onChange={handleChange}>
              <option value="">Select budget range</option>
              <option value="under-500">Under $500</option>
              <option value="500-1000">$500 – $1,000</option>
              <option value="1000-2500">$1,000 – $2,500</option>
              <option value="2500+">$2,500+</option>
              <option value="not-sure">Not sure yet</option>
            </Select>
          </div>
        </div>
        <div>
          <Label>Extra notes</Label>
          <Textarea
            name="notes"
            placeholder="Anything else I should know before we talk."
            value={form.notes}
            onChange={handleChange}
            rows={3}
          />
        </div>
      </FormSection>

      <div style={{ paddingTop: '1rem' }}>
        <button
          type="submit"
          disabled={loading}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '1.1rem 2.5rem',
            backgroundColor: loading ? 'var(--accent-muted)' : 'var(--btn-bg)',
            color: 'var(--btn-text)',
            fontFamily: "'Poppins', sans-serif",
            fontSize: '0.78rem',
            fontWeight: 600,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.3s ease, transform 0.2s ease',
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.currentTarget.style.backgroundColor = 'var(--btn-hover)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }
          }}
          onMouseLeave={(e) => {
            if (!loading) {
              e.currentTarget.style.backgroundColor = 'var(--btn-bg)'
              e.currentTarget.style.transform = 'translateY(0)'
            }
          }}
        >
          {loading ? 'Sending...' : 'Book Meeting ↗'}
        </button>
        {serverError && (
          <p style={{ color: 'rgba(252,100,100,0.85)', fontSize: '0.78rem', marginTop: '0.75rem' }}>
            {serverError}
          </p>
        )}
        <p
          style={{
            color: 'var(--t28)',
            fontSize: '0.72rem',
            marginTop: '1rem',
            letterSpacing: '0.05em',
            lineHeight: 1.6,
          }}
        >
          Fields marked with * are required.
        </p>
      </div>
    </form>
  )
}
