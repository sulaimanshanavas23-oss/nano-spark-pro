import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTopOnRoute() {
  const { pathname } = useLocation()

  useEffect(() => {
    const html = document.documentElement
    const prev = html.style.scrollBehavior
    html.style.scrollBehavior = 'auto'
    window.scrollTo(0, 0)
    html.style.scrollBehavior = prev
  }, [pathname])

  return null
}
