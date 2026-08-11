export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'Services', to: '/services' },
  { label: 'Workshops', to: '/workshops' },
  { label: 'Feedback', to: '/feedback' },
  { label: 'Contact', to: '/contact' },
  { label: 'Support', to: '/support' },
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
    title: 'S. Shanavas',
    tagline: 'Founder & CEO — Nano Spark',
    location: 'Chennai, Tamil Nadu',
  },
  studentsTrained: 550,
  msme: {
    registered: true,
    startupTn: true,
    // TODO: replace with the real Udyam (MSME) registration number once provided
    number: 'MSME Udyam No. — (to be updated)',
  },
  socials: [
    { label: 'Email', href: 'mailto:nanospark46@gmail.com', icon: 'email' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nano-spark-4300a23bb', icon: 'linkedin' },
    { label: 'Instagram', href: 'https://www.instagram.com/nano_spark_', icon: 'instagram' },
    { label: 'YouTube', href: 'https://youtube.com/@nanosparkbytes', icon: 'youtube' },
    { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61592291288490', icon: 'facebook' },
    { label: 'Phone', href: 'tel:+918148774546', icon: 'phone' },
  ],
} as const

export const WHATSAPP_LINK = SITE.whatsapp

/* ------------------------------------------------------------------ */
/*  Founder / About content                                            */
/* ------------------------------------------------------------------ */

export const FOUNDER = {
  name: 'S. Shanavas',
  role: 'Founder & CEO — Nano Spark',
  location: 'Chennai, Tamil Nadu',
  heading: 'ABOUT THE FOUNDER',
  intro: [
    'S. Shanavas is an ECE student, young entrepreneur, technology enthusiast, and innovator with a strong interest in robotics, electronics, embedded systems, IoT, and STEM education.',
    'He founded Nano Spark with a vision to make technology learning more practical, accessible, and innovation-focused for students. The idea comes from a simple belief: students should not only learn technology from textbooks — they should have the opportunity to build, experiment, fail, improve, and create their own solutions.',
    'Through Nano Spark, Shanavas is developing a growing ecosystem that brings together STEM learning kits, robotics and electronics programs, hands-on innovation activities, school STEM lab solutions, and project-based learning.',
    'His focus is on creating learning experiences where students can progress from understanding basic concepts to building working prototypes and eventually solving real-world problems.',
  ],
  approach: ['LEARN', 'BUILD', 'EXPERIMENT', 'DEBUG', 'INNOVATE', 'SOLVE'],
  approachNote:
    'As a student entrepreneur, Shanavas is also focused on understanding the real needs of schools and students, validating Nano Spark\'s products through practical programs, and building sustainable partnerships with educational institutions.',
  visionQuote:
    '“I believe every student has the potential to become an innovator when they are given the right tools, guidance, and opportunity. Nano Spark aims to create that opportunity by making hands-on technology education more accessible and helping students turn their curiosity into real-world innovation.”',
  visionHeading: 'FOUNDER\'S VISION',
  biggerVisionHeading: 'BUILDING TOWARDS A BIGGER VISION',
  biggerVision: [
    'STEM EDUCATION',
    'HANDS-ON PROJECTS',
    'ROBOTICS & TECHNOLOGY',
    'INNOVATION',
    'PROTOTYPE DEVELOPMENT',
    'ENTREPRENEURSHIP',
  ],
}

/* ------------------------------------------------------------------ */
/*  Testimonials (student & parent feedback)                           */
/* ------------------------------------------------------------------ */

export const TESTIMONIALS = [
  {
    text: 'We attended the Nano Spark workshop and gained valuable experience — a great introduction to electronics and circuit building!',
    who: 'Student',
    role: 'Workshop Participant',
  },
  {
    text: 'My child came home excited to build robots. The hands-on approach made technology so much more interesting for them.',
    who: 'Parent',
    role: 'STEM Workshop',
  },
  {
    text: 'The Arduino session was amazing. I programmed my first LED and ultrasonic sensor all by myself in one day.',
    who: 'Student',
    role: 'School Workshop',
  },
  {
    text: 'Nano Spark supports students at every step. Their patience and guidance helped our kids complete real projects.',
    who: 'Parent',
    role: 'School STEM Program',
  },
  {
    text: 'Building my first obstacle-avoiding robot was the best part. I learned how motors, sensors and code all work together.',
    who: 'Student',
    role: 'Robotics Workshop',
  },
  {
    text: 'Great session on IoT — from wiring an ESP32 to seeing live sensor data on a dashboard. Truly practical learning!',
    who: 'Student',
    role: 'IoT Workshop',
  },
]
