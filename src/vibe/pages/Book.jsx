'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import AnimatedTextBlock from '../components/motion/AnimatedTextBlock'
import AnimatedSection from '../components/motion/AnimatedSection'
import { getAvailableSlots, submitBooking, getActiveEventType } from '@/app/api/bookings/actions'

const DAYS_SHORT = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function toDateStr(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

function formatDate(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })
}

function formatTime(time) {
  const [h, m] = time.split(':').map(Number)
  const suffix = h >= 12 ? 'PM' : 'AM'
  const h12 = h % 12 || 12
  return `${h12}:${String(m).padStart(2, '0')} ${suffix}`
}

const DEFAULT_DURATION = 30
const DEFAULT_MAX_FUTURE_DAYS = 60

export default function Book() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [eventType, setEventType] = useState(null)
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [slots, setSlots] = useState([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ name: '', email: '', notes: '' })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')
  const [emailWarning, setEmailWarning] = useState('')
  const [meetLink, setMeetLink] = useState('')

  useEffect(() => {
    getActiveEventType().then(et => { if (et) setEventType(et) })
  }, [])

  const durationMinutes = eventType?.duration_minutes || DEFAULT_DURATION
  const maxFutureDays = eventType?.max_future_days || DEFAULT_MAX_FUTURE_DAYS

  const maxDate = new Date(today)
  maxDate.setDate(maxDate.getDate() + maxFutureDays)

  const handleDateSelect = useCallback(async (dateStr) => {
    setSelectedDate(dateStr)
    setSelectedTime(null)
    setSlots([])
    setLoadingSlots(true)
    try {
      const available = await getAvailableSlots(dateStr, durationMinutes, eventType?.id)
      setSlots(available || [])
    } catch {
      setSlots([])
    }
    setLoadingSlots(false)
  }, [durationMinutes, eventType])

  const handleTimeSelect = (time) => {
    setSelectedTime(time)
    setStep(2)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required.'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required.'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setSubmitting(true)
    setServerError('')
    setEmailWarning('')

    const fd = new FormData()
    fd.append('date', selectedDate)
    fd.append('time', selectedTime)
    fd.append('duration_minutes', String(durationMinutes))
    fd.append('name', form.name)
    fd.append('email', form.email)
    fd.append('notes', form.notes)
    if (eventType?.id) fd.append('event_type_id', eventType.id)

    const result = await submitBooking(fd)
    setSubmitting(false)

    if (result.error) { setServerError(result.error); return }
    if (result.emailWarning) setEmailWarning(result.emailWarning)
    setMeetLink(result.meetLink || '')
    setStep(3)
  }

  const firstDay = new Date(viewYear, viewMonth, 1).getDay()
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()

  const canGoPrev = new Date(viewYear, viewMonth, 1) > new Date(today.getFullYear(), today.getMonth(), 1)
  const canGoNext = new Date(viewYear, viewMonth + 1, 1) <= maxDate

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
  }

  return (
    <PageTransition>
      {/* Hero */}
      <section style={{
        padding: 'clamp(7rem, 12vw, 10rem) 4rem clamp(4rem, 6vw, 5rem)',
        borderBottom: '1px solid var(--t07)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '-20%', right: '-5%',
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(var(--accent-rgb), 0.06), transparent 60%)',
          pointerEvents: 'none',
        }} />
        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <AnimatedTextBlock style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
            <div style={{ width: '30px', height: '1px', backgroundColor: 'var(--accent)' }} />
            <span style={{ color: 'var(--t28)', fontSize: '0.68rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
              Book a Meeting
            </span>
          </AnimatedTextBlock>

          <AnimatedTextBlock as="h1" delay={0.1} dir="rtl" style={{
            fontFamily: "'Cairo', sans-serif",
            color: 'var(--text)',
            fontWeight: 700,
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            lineHeight: 1.2,
            letterSpacing: '-0.025em',
            textAlign: 'right',
            margin: '0 0 1.5rem 0',
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
          }}>
            احجز معادك دلوقتي.
          </AnimatedTextBlock>

          <AnimatedTextBlock as="p" delay={0.25} dir="rtl" style={{
            fontFamily: "'Cairo', sans-serif",
            color: 'var(--t55)',
            fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)',
            lineHeight: 1.95,
            textAlign: 'right',
            margin: '0 0 3rem 0',
            maxWidth: '600px',
            marginLeft: 'auto',
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
          }}>
            الخطوة الجاية: مكالمة قصيرة ٢٠–٣٠ دقيقة نراجع فيها البريف مع بعض ونحدد أنسب خطوة للبراند.
          </AnimatedTextBlock>
        </div>
      </section>

      {/* Booking UI */}
      <AnimatedSection style={{ padding: '6rem 4rem 8rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>

          {/* Step indicator */}
          {step < 3 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3rem' }}>
              {[
                { n: 1, label: 'Select time' },
                { n: 2, label: 'Your info' },
              ].map(({ n, label }, i) => (
                <div key={n} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{
                      width: '22px', height: '22px', borderRadius: '50%',
                      border: `1px solid ${step === n ? 'var(--accent)' : step > n ? 'var(--accent)' : 'var(--t18)'}`,
                      backgroundColor: step > n ? 'var(--accent)' : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.65rem', color: step > n ? 'var(--bg)' : step === n ? 'var(--accent)' : 'var(--t28)',
                      fontWeight: 600,
                    }}>
                      {step > n ? '✓' : n}
                    </div>
                    <span style={{
                      fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                      color: step === n ? 'var(--text)' : 'var(--t28)',
                    }}>
                      {label}
                    </span>
                  </div>
                  {i === 0 && <div style={{ width: '32px', height: '1px', backgroundColor: 'var(--t18)' }} />}
                </div>
              ))}
            </div>
          )}

          {/* ─── STEP 1: Calendar + Slots ─── */}
          {step === 1 && (
            <div style={{ display: 'flex', gap: '3rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>

              {/* Calendar */}
              <div style={{ flex: '0 0 320px', minWidth: '280px', border: '1px solid var(--t07)', padding: '2rem' }}>
                {/* Month nav */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <button
                    onClick={prevMonth}
                    disabled={!canGoPrev}
                    style={{
                      background: 'none', border: 'none',
                      cursor: canGoPrev ? 'pointer' : 'default',
                      color: canGoPrev ? 'var(--text)' : 'var(--t18)',
                      fontSize: '1rem', padding: '0.25rem 0.5rem', lineHeight: 1,
                    }}
                  >←</button>
                  <span style={{ color: 'var(--text)', fontSize: '0.82rem', letterSpacing: '0.1em', fontWeight: 500 }}>
                    {MONTHS[viewMonth]} {viewYear}
                  </span>
                  <button
                    onClick={nextMonth}
                    disabled={!canGoNext}
                    style={{
                      background: 'none', border: 'none',
                      cursor: canGoNext ? 'pointer' : 'default',
                      color: canGoNext ? 'var(--text)' : 'var(--t18)',
                      fontSize: '1rem', padding: '0.25rem 0.5rem', lineHeight: 1,
                    }}
                  >→</button>
                </div>

                {/* Day headers */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', marginBottom: '0.4rem' }}>
                  {DAYS_SHORT.map(d => (
                    <div key={d} style={{
                      textAlign: 'center', fontSize: '0.62rem',
                      color: 'var(--t28)', letterSpacing: '0.04em', paddingBottom: '0.4rem',
                    }}>
                      {d}
                    </div>
                  ))}
                </div>

                {/* Days */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
                  {Array.from({ length: firstDay }, (_, i) => <div key={`e${i}`} />)}
                  {Array.from({ length: daysInMonth }, (_, i) => {
                    const day = i + 1
                    const dateStr = toDateStr(viewYear, viewMonth, day)
                    const dateObj = new Date(viewYear, viewMonth, day)
                    const isPast = dateObj < today
                    const isFuture = dateObj > maxDate
                    const isDisabled = isPast || isFuture
                    const isSelected = selectedDate === dateStr
                    const isToday = dateObj.getTime() === today.getTime()

                    return (
                      <button
                        key={day}
                        onClick={() => !isDisabled && handleDateSelect(dateStr)}
                        style={{
                          aspectRatio: '1',
                          border: isSelected ? '1px solid var(--accent)' : '1px solid transparent',
                          backgroundColor: isSelected ? 'var(--accent)' : 'transparent',
                          color: isDisabled
                            ? 'var(--t18)'
                            : isSelected ? 'var(--bg)'
                            : isToday ? 'var(--accent)'
                            : 'var(--text)',
                          cursor: isDisabled ? 'default' : 'pointer',
                          fontSize: '0.78rem',
                          fontWeight: isToday ? 600 : 400,
                          transition: 'all 0.15s ease',
                          borderRadius: '2px',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}
                        onMouseEnter={e => {
                          if (!isDisabled && !isSelected) {
                            e.currentTarget.style.backgroundColor = 'var(--t07)'
                            e.currentTarget.style.borderColor = 'var(--t18)'
                          }
                        }}
                        onMouseLeave={e => {
                          if (!isDisabled && !isSelected) {
                            e.currentTarget.style.backgroundColor = 'transparent'
                            e.currentTarget.style.borderColor = 'transparent'
                          }
                        }}
                      >
                        {day}
                      </button>
                    )
                  })}
                </div>

                <p style={{ color: 'var(--t28)', fontSize: '0.62rem', marginTop: '1.5rem', letterSpacing: '0.04em', lineHeight: 1.6 }}>
                  All times in Cairo time (EET/EEST)
                </p>
              </div>

              {/* Slots */}
              <div style={{ flex: '1 1 240px', minWidth: '220px' }}>
                {!selectedDate ? (
                  <p style={{ color: 'var(--t28)', fontSize: '0.8rem', letterSpacing: '0.05em', paddingTop: '0.5rem' }}>
                    ← Pick a date to see available times
                  </p>
                ) : (
                  <div>
                    <p style={{
                      color: 'var(--t40)', fontSize: '0.7rem',
                      letterSpacing: '0.15em', textTransform: 'uppercase',
                      marginBottom: '1.25rem',
                    }}>
                      {formatDate(selectedDate)}
                    </p>

                    {loadingSlots && (
                      <p style={{ color: 'var(--t28)', fontSize: '0.82rem' }}>Loading slots...</p>
                    )}

                    {!loadingSlots && slots.length === 0 && (
                      <p style={{ color: 'var(--t40)', fontSize: '0.85rem', lineHeight: 1.7 }}>
                        No available slots on this day.
                        <br />
                        <span style={{ color: 'var(--t28)', fontSize: '0.78rem' }}>Try a different date.</span>
                      </p>
                    )}

                    {!loadingSlots && slots.length > 0 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {slots.map(slot => (
                          <button
                            key={slot}
                            onClick={() => handleTimeSelect(slot)}
                            style={{
                              padding: '0.8rem 1.5rem',
                              border: '1px solid var(--t18)',
                              backgroundColor: 'transparent',
                              color: 'var(--text)',
                              fontSize: '0.85rem',
                              cursor: 'pointer',
                              textAlign: 'left',
                              transition: 'all 0.2s ease',
                              letterSpacing: '0.04em',
                            }}
                            onMouseEnter={e => {
                              e.currentTarget.style.borderColor = 'var(--accent)'
                              e.currentTarget.style.color = 'var(--accent)'
                              e.currentTarget.style.backgroundColor = 'rgba(var(--accent-rgb), 0.04)'
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.borderColor = 'var(--t18)'
                              e.currentTarget.style.color = 'var(--text)'
                              e.currentTarget.style.backgroundColor = 'transparent'
                            }}
                          >
                            {formatTime(slot)}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ─── STEP 2: Form ─── */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <button
                onClick={() => setStep(1)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--t40)', fontSize: '0.7rem', letterSpacing: '0.1em',
                  textTransform: 'uppercase', padding: 0, marginBottom: '2.5rem',
                  display: 'flex', alignItems: 'center', gap: '0.4rem',
                }}
              >
                ← Back
              </button>

              {/* Booking summary */}
              <div style={{
                border: '1px solid var(--t07)', padding: '1.5rem 2rem',
                marginBottom: '2.5rem', display: 'flex', gap: '2.5rem', flexWrap: 'wrap',
              }}>
                <div>
                  <p style={{ color: 'var(--t28)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 0.3rem' }}>Date</p>
                  <p style={{ color: 'var(--text)', fontSize: '0.88rem', margin: 0 }}>{formatDate(selectedDate)}</p>
                </div>
                <div style={{ width: '1px', backgroundColor: 'var(--t07)', alignSelf: 'stretch' }} />
                <div>
                  <p style={{ color: 'var(--t28)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 0.3rem' }}>Time</p>
                  <p style={{ color: 'var(--text)', fontSize: '0.88rem', margin: 0 }}>{formatTime(selectedTime)} (Cairo)</p>
                </div>
                <div style={{ width: '1px', backgroundColor: 'var(--t07)', alignSelf: 'stretch' }} />
                <div>
                  <p style={{ color: 'var(--t28)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 0.3rem' }}>Duration</p>
                  <p style={{ color: 'var(--text)', fontSize: '0.88rem', margin: 0 }}>{durationMinutes} min</p>
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                noValidate
                style={{ maxWidth: '520px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
              >
                <div>
                  <label className="form-label">
                    Name <span style={{ color: 'var(--accent)', marginLeft: '3px' }}>*</span>
                  </label>
                  <input
                    name="name"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={handleFormChange}
                    className={`form-input${errors.name ? ' error' : ''}`}
                    autoComplete="name"
                  />
                  {errors.name && <p style={{ color: 'rgba(252,100,100,0.8)', fontSize: '0.72rem', marginTop: '0.3rem' }}>{errors.name}</p>}
                </div>

                <div>
                  <label className="form-label">
                    Email <span style={{ color: 'var(--accent)', marginLeft: '3px' }}>*</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleFormChange}
                    className={`form-input${errors.email ? ' error' : ''}`}
                    autoComplete="email"
                  />
                  {errors.email && <p style={{ color: 'rgba(252,100,100,0.8)', fontSize: '0.72rem', marginTop: '0.3rem' }}>{errors.email}</p>}
                </div>

                <div>
                  <label className="form-label">Notes</label>
                  <textarea
                    name="notes"
                    placeholder="Anything you'd like me to know before the call."
                    value={form.notes}
                    onChange={handleFormChange}
                    rows={3}
                    className="form-input form-textarea"
                  />
                </div>

                <div style={{ paddingTop: '0.5rem' }}>
                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                      padding: '1.1rem 2.5rem',
                      backgroundColor: submitting ? 'var(--accent-muted)' : 'var(--btn-bg)',
                      color: 'var(--btn-text)',
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '0.78rem', fontWeight: 600,
                      letterSpacing: '0.22em', textTransform: 'uppercase',
                      border: 'none', cursor: submitting ? 'not-allowed' : 'pointer',
                      transition: 'background-color 0.3s ease, transform 0.2s ease',
                    }}
                    onMouseEnter={e => {
                      if (!submitting) {
                        e.currentTarget.style.backgroundColor = 'var(--btn-hover)'
                        e.currentTarget.style.transform = 'translateY(-2px)'
                      }
                    }}
                    onMouseLeave={e => {
                      if (!submitting) {
                        e.currentTarget.style.backgroundColor = 'var(--btn-bg)'
                        e.currentTarget.style.transform = 'translateY(0)'
                      }
                    }}
                  >
                    {submitting ? 'Confirming...' : 'Confirm Booking ↗'}
                  </button>

                  {serverError && (
                    <p style={{ color: 'rgba(252,100,100,0.85)', fontSize: '0.78rem', marginTop: '0.75rem' }}>
                      {serverError}
                    </p>
                  )}
                </div>
              </form>
            </motion.div>
          )}

          {/* ─── STEP 3: Confirmation ─── */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{ maxWidth: '520px', margin: '0 auto' }}
            >
              <div style={{
                border: '1px solid rgba(var(--accent-rgb), 0.25)',
                padding: '4rem 3rem',
                textAlign: 'center',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.75rem',
              }}>
                <div style={{
                  width: '52px', height: '52px',
                  border: '1px solid var(--accent)', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--accent)', fontSize: '1.3rem',
                }}>
                  ✓
                </div>

                <div>
                  <p style={{ color: 'var(--text)', fontSize: '1.15rem', fontWeight: 500, margin: '0 0 0.5rem' }}>
                    Booking confirmed.
                  </p>
                  <p style={{ color: 'var(--t55)', fontSize: '0.88rem', fontWeight: 300, margin: 0, lineHeight: 1.7 }}>
                    {emailWarning || 'A confirmation email with your Google Meet link is on its way.'}
                  </p>
                </div>

                <div style={{
                  border: '1px solid var(--t07)', padding: '1.25rem 2rem',
                  width: '100%', display: 'flex', flexDirection: 'column', gap: '0.75rem',
                  textAlign: 'left',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                    <span style={{ color: 'var(--t40)' }}>Date</span>
                    <span style={{ color: 'var(--text)' }}>{formatDate(selectedDate)}</span>
                  </div>
                  <div style={{ height: '1px', backgroundColor: 'var(--t07)' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                    <span style={{ color: 'var(--t40)' }}>Time</span>
                    <span style={{ color: 'var(--text)' }}>{formatTime(selectedTime)} (Cairo)</span>
                  </div>
                  <div style={{ height: '1px', backgroundColor: 'var(--t07)' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                    <span style={{ color: 'var(--t40)' }}>Duration</span>
                    <span style={{ color: 'var(--text)' }}>{durationMinutes} min</span>
                  </div>
                  {meetLink && meetLink !== 'Not generated yet' && (
                    <>
                      <div style={{ height: '1px', backgroundColor: 'var(--t07)' }} />
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem' }}>
                        <span style={{ color: 'var(--t40)' }}>Meeting</span>
                        <a
                          href={meetLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: 'var(--accent)', textDecoration: 'none',
                            fontSize: '0.75rem', letterSpacing: '0.1em',
                          }}
                          onMouseEnter={e => { e.currentTarget.style.opacity = '0.7' }}
                          onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
                        >
                          Join Google Meet ↗
                        </a>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </AnimatedSection>
    </PageTransition>
  )
}
