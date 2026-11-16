import { SiArduino, SiClaude, SiGithub, SiPython, SiScratch, SiTinkercad } from 'react-icons/si'
import { FiCloud } from 'react-icons/fi'
import type { ToolLogoKey } from '../lib/toolsData'

interface ToolLogoProps {
  logo: ToolLogoKey
  size?: number
  className?: string
}

export default function ToolLogo({ logo, size = 28, className }: ToolLogoProps) {
  switch (logo) {
    case 'arduino':
      return <SiArduino size={size} color="#00979D" className={className} aria-label="Arduino" />
    case 'python':
      return <SiPython size={size} color="#3776AB" className={className} aria-label="Python" />
    case 'github':
      return <SiGithub size={size} color="#181717" className={className} aria-label="GitHub" />
    case 'tinkercad':
      return <SiTinkercad size={size} color="#1477D4" className={className} aria-label="Tinkercad" />
    case 'scratch':
      return <SiScratch size={size} color="#F9A02A" className={className} aria-label="Scratch" />
    case 'claude':
      return <SiClaude size={size} color="#D97757" className={className} aria-label="Claude" />
    case 'iot':
      return <FiCloud size={size} color="#2196F3" className={className} aria-label="IoT platform" />
    case 'vscode':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          role="img"
          aria-label="Visual Studio Code"
        >
          <path
            fill="#007ACC"
            d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z"
          />
        </svg>
      )
    case 'wokwi':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          role="img"
          aria-label="Wokwi"
        >
          <rect width="24" height="24" rx="5" fill="#FFFFFF" />
          <path
            d="M4.6 7.6l2.9 8.8 4.5-6.9 4.5 6.9 2.9-8.8"
            fill="none"
            stroke="#111111"
            strokeWidth="2.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'blynk':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          role="img"
          aria-label="Blynk"
        >
          <rect width="24" height="24" rx="6" fill="#23C4B5" />
          <path
            fill="#FFFFFF"
            d="M8.2 5.6h4.3c2.1 0 3.6 1.2 3.6 3.1 0 1.2-.6 2.1-1.6 2.6 1.3.4 2.1 1.4 2.1 2.8 0 2.1-1.6 3.4-3.9 3.4H8.2V5.6Zm4 4.8c1 0 1.6-.5 1.6-1.4 0-.9-.6-1.4-1.6-1.4h-1.8v2.8h1.8Zm.2 5.1c1.1 0 1.7-.5 1.7-1.5s-.6-1.5-1.7-1.5h-2v3h2Z"
          />
        </svg>
      )
    case 'seeed':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          role="img"
          aria-label="Seeed Studio"
        >
          <circle cx="12" cy="12" r="11" fill="#79B928" />
          <path fill="#FFFFFF" d="M12 18.2c0-4.2 2.1-7.4 5.4-8.6-.9 4.3-2.8 7-5.4 8.6Z" />
          <path fill="#FFFFFF" opacity="0.82" d="M12 18.2c0-3.2-1.6-5.6-4.3-6.7 1.1 3.1 2.3 5 4.3 6.7Z" />
        </svg>
      )
    default:
      return null
  }
}
