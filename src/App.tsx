import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import ScrollToTopButton from './components/ScrollToTopButton'
import ScrollToTopOnRoute from './components/ScrollToTopOnRoute'
import Preloader, { LOADER_DURATION_MS } from './components/Preloader'
import Home from './pages/Home'
import Products from './pages/Products'
import Services from './pages/Services'
import Workshops from './pages/Workshops'
import Support from './pages/Support'
import Contact from './pages/Contact'
import Feedback from './pages/Feedback'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/services" element={<Services />} />
        <Route path="/workshops" element={<Workshops />} />
        <Route path="/support" element={<Support />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </AnimatePresence>
  )
}

/**
 * Shows the Nano Spark loading animation on first open and on every route
 * change, then automatically proceeds to the website.
 */
function LoaderOverlay() {
  const location = useLocation()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => setLoading(false), LOADER_DURATION_MS)
    return () => clearTimeout(t)
  }, [location.pathname])

  return <AnimatePresence>{loading && <Preloader key="preloader" />}</AnimatePresence>
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
