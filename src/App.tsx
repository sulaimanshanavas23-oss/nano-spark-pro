import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import ScrollToTopButton from './components/ScrollToTopButton'
import ScrollToTopOnRoute from './components/ScrollToTopOnRoute'
import Preloader, { LOADER_DURATION_MS } from './components/Preloader'
import DemoModal from './components/DemoModal'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import Services from './pages/Services'
import Workshops from './pages/Workshops'
import Community from './pages/Community'
import Achievements from './pages/Achievements'
import Careers from './pages/Careers'
import Support from './pages/Support'
import Contact from './pages/Contact'
import Feedback from './pages/Feedback'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/services" element={<Services />} />
        <Route path="/workshops" element={<Workshops />} />
        <Route path="/community" element={<Community />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/support" element={<Support />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </AnimatePresence>
  )
}

/**
 * Loading animation shown ONLY when the site first opens (not on page
 * switching). Once it finishes, the "Book a Free Demo Session" pop-up appears.
 */
function LoaderOverlay() {
  const [loading, setLoading] = useState(true)
  const [showDemo, setShowDemo] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(false)
      setShowDemo(true)
    }, LOADER_DURATION_MS)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <AnimatePresence>{loading && <Preloader key="preloader" />}</AnimatePresence>
      <DemoModal open={showDemo} onClose={() => setShowDemo(false)} />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTopOnRoute />
      <Navbar />
      <AnimatedRoutes />
      <Footer />
      <WhatsAppButton />
      <ScrollToTopButton />
      <LoaderOverlay />
    </BrowserRouter>
  )
}
