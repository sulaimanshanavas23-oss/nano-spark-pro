export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'Services', to: '/services' },
  { label: 'Workshops', to: '/workshops' },
  { label: 'Support', to: '/support' },
  { label: 'Contact', to: '/contact' },
  { label: 'Feedback', to: '/feedback' },
] as const

export const SITE = {
  name: 'Nano Spark',
  tagline: 'TECHNOLOGY · INNOVATIONS · SOLUTIONS',
  logo: '/images/extlogo.png',
  founderPhoto: '/images/founder.jpeg',
  email: 'nanospark46@gmail.com',
  phoneDisplay: '+91 8148774546',
  phoneTel: '+918148774546',
  whatsapp: 'https://wa.me/918148774546?text=Hi%20Nano%20Spark%2C%20I%27m%20interested%20in%20your%20STEM%20programs.',
  founder: {
    name: 'S. Shanavas',
    role: 'Founder & CEO',
    location: 'Chennai, Tamil Nadu',
  },
  socials: [
    {
      label: 'Email',
      href: 'mailto:nanospark46@gmail.com',
      icon: 'email',
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/nano-spark-4300a23bb',
      icon: 'linkedin',
    },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/nano_spark_',
      icon: 'instagram',
    },
    {
      label: 'YouTube',
      href: 'https://youtube.com/@nanosparkbytes',
      icon: 'youtube',
    },
    {
      label: 'Facebook',
      href: 'https://www.facebook.com/profile.php?id=61592291288490',
      icon: 'facebook',
    },
    {
      label: 'Phone',
      href: 'tel:+918148774546',
      icon: 'phone',
    },
  ],
} as const

export const WHATSAPP_LINK = SITE.whatsapp
