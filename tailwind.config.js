/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        nsYellow: {
          DEFAULT: '#FFC107',
          dark: '#F7B500',
          light: '#FFD54F',
        },
        nsBlack: '#111111',
        nsWhite: '#FFFFFF',
        nsGray: {
          light: '#F7F7F5',
          medium: '#9CA3AF',
        },
      },
      fontFamily: {
        heading: ['"Baloo 2"', 'cursive', 'system-ui', 'sans-serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #F7B500 0%, #FFD54F 100%)',
      },
      boxShadow: {
        soft: '0 4px 20px rgba(17, 17, 17, 0.08)',
        lift: '0 12px 32px rgba(17, 17, 17, 0.16)',
        glow: '0 0 24px rgba(255, 193, 7, 0.45)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(255, 193, 7, 0.55)' },
          '50%': { boxShadow: '0 0 20px 4px rgba(255, 193, 7, 0.35)' },
        },
      },
      animation: {
        pulseGlow: 'pulseGlow 2.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
