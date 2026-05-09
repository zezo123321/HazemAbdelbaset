import { useState, useEffect, useLayoutEffect } from 'react'
import Preloader from '../components/Preloader'
import Hero from '../components/Hero'
import MarqueeStrip from '../components/MarqueeStrip'
import Manifesto from '../components/Manifesto'
import Services from '../components/Services'
import SelectedWork from '../components/SelectedWork'
import Process from '../components/Process'
import About from '../components/About'
import CTASection from '../components/CTASection'
import PageTransition from '../components/PageTransition'

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(true)

  useLayoutEffect(() => {
    if (sessionStorage.getItem('hz_preloader') !== '1') {
      setPreloaderDone(false)
    }
  }, [])

  const handlePreloaderComplete = () => {
    sessionStorage.setItem('hz_preloader', '1')
    setPreloaderDone(true)
  }

  useEffect(() => {
    document.body.style.overflow = preloaderDone ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [preloaderDone])

  return (
    <>
      {!preloaderDone && <Preloader onComplete={handlePreloaderComplete} />}
      <PageTransition>
        <Hero preloaderDone={preloaderDone} />
        <MarqueeStrip />
        <Manifesto />
        <Process />
        <Services />
        <SelectedWork showViewAll />
        <About />
        <CTASection />
      </PageTransition>
    </>
  )
}
